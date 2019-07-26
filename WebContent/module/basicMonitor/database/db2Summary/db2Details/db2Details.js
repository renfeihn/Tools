define([ "jquery" ], function() {	
	var eventEchart, portEchart, processEchart, eAverWaitTime, eLockNum, eAppLockWait, eLockUpTime, eLockUpgrade;
	return {
		load : function($el, scope, handler) {
			var objectId = scope.objectId;
			
			//基本信息
			app.common.ajaxWithAfa({
				url:'CommonMonitorAction_getMetricProperty.do',
				data:{objectId: objectId}
			}).done(function(data){
				data = data.result;
				$('#version',$el).text(data.version);
				$('#ip',$el).text(data.ipAdd);
				$('#port',$el).text(data.port);
			});
			
			getInstanceInfo();
			
			//实例汇总
			function getInstanceInfo() {
				app.common.ajaxWithAfa({
					url:'CommonMonitorAction_getMetricInfo2.do',
					data:{
						objectId: objectId,
						metricNames: [
						    'db2_portinfo.LISTEN',
						    'db2_portinfo.established',
						    'db2_tablespace.PERCENT_USED',
						    'db2_logspace.USED_ActiveLog_PERCENT',
						    'db2_lock_wait_time_count.LOCK_WAIT_COUNT',
						    'db2_package_cache.pkg_hit_ratio'
					    ]
					}
				}).done(function(data){
					data = data.result;
					$('#portStatus', $el).text(data['db2_portinfo.LISTEN'].value == 1 ? '正常' : '异常');
					$('#connetCount', $el).text(data['db2_portinfo.established'].value);
					$('#tableUsed', $el).text(data['db2_tablespace.PERCENT_USED'].value);
					$('#dailyUsed', $el).text(data['db2_logspace.USED_ActiveLog_PERCENT'].value);
					$('#lockCount', $el).text(data['db2_lock_wait_time_count.LOCK_WAIT_COUNT'].value);
					$('#hitRate', $el).text(data['db2_package_cache.pkg_hit_ratio'].value);
				});
			}
			
			function updatePageData() {
				getInstanceInfo();
				getTableData($spaceTable, 'db2_tablespace');
				getTableData($longSqlTable, 'db2_activelogused');
				getTableData($workTable, 'db2_dbmenyused');
				getTop5TableData();
				getTableData($heapLockTable, 'db2_heapandlock');
				getTableData($longLockTable, 'db2_longtimelocktable');
			}
			
			handler.setInterval(updatePageData, 60000);
			
			//事件总览
			eventEchart = app.showEcharts({
				handler: handler,
				context: $el,
				selector: '#eEvent',
				eType: 'line',
				url: 'CommonMonitorAction_getEventCount.do',
				unit: '个',
				urlParams: {
					objectId: objectId,
					time: 120,
					interval: 1
				},
				items: ['告警', '预警'],
				beforefn: function(data){
					for(var key in data.content.result){
						$('#' + key, $el).text(data.content.result[key]);
					}
					var event = data.content.result;
					$('#infoCount', $el).text(event.alarmWaring-event.alarmCount-event.waringCount); 
					formatEventData(data);
				}
			});
			eventEchart.start();
			
			//格式化事件echarts数据
			function formatEventData(data){
				var eData = {};
				
				eData.time = data.content.result.echarts.times;
				eData.time.forEach(function(item, i){
					eData.time[i] = new Date(item).Format('hh:mm:ss');
				});
				
				data.content.result.echarts.datas.forEach(function(item, i){
					eData['line' + (i + 1)] = item;
				});
				
				data.content = {echartsData: eData};
			}
			
			portEchart = app.showEcharts({
				handler	: handler,
				context	: $el,
				eType	: 'line',
				xCount: 4,
				url		: 'CommonMonitorAction_getEachart.do',
				selector: '#echart-port',
				unit	: '个',
				items	: ['ESTABLISHED','CLOSE_WAIT','TIME_WAIT'],
				urlParams: {
					interval : 1,
					time 	 : 60,
					objectId : objectId,
					metricNames:['db2_portinfo.established', 'db2_portinfo.close_wait', 'db2_portinfo.time_wait', 'db2_portinfo.LISTEN']
				},
				beforefn:function (data) {
					data = formatLineData(data);
				},
				succfn: function(data){
					var currData = data.content.currData;
					showItems('db2Details-portSpan', [currData.line4?'正常':'异常', currData.line1+'个', currData.line2+'个', currData.line3+'个']);
				}
			});
			portEchart.start();
			
			processEchart = app.showEcharts({
				handler	: handler,
				context	: $el,
				eType	: 'line',
				xCount: 4,
				url		: 'CommonMonitorAction_getEachart.do',
				selector: '#echart-processResources',
				unit	: '%',
				items	: ['进程占用CPU使用率','进程占用内存使用率'],
				urlParams: {
					interval : 1,
					time 	 : 60,
					objectId : objectId,
					metricNames:['db2_processinfo.proc_cpurate', 'db2_processinfo.proc_memoryused', 'db2_processinfo.CUR_PROC_COUNT']
				},
				beforefn:function (data) {
					data = formatLineData(data);
				},
				succfn: function(data){
					console.log(data)
					var currData = data.content.currData;

					if($.isEmptyObject(currData)){
						return;
					}else{
						showItems('db2Details-processResources',[currData.line3+'个', currData.line1.toFixed(2)+'%', currData.line2.toFixed(2)+'%']);
					}
				}
			});
			processEchart.start();
			
			hitRateEchart = app.showEcharts({
				handler	: handler,
				context	: $el,
				eType	: 'line',
				xCount: 4,
				url		: 'CommonMonitorAction_getEachart.do',
				selector: '#hitRateEchart',
				unit	: '%',
				items	: ['packagecache命中率'],
				urlParams: {
					interval : 1,
					time 	 : 60,
					objectId : objectId,
					metricNames:['db2_package_cache.pkg_hit_ratio']
				},
				beforefn:function (data) {
					data = formatLineData(data);
				}
			});
			hitRateEchart.start();
			
			function formatLineData(data) {
				var echartsData = {};
				var currData ={}; 
				var tmpData = data.content.result.echartsData;
				var times = tmpData.times;
				/*处理时间*/
				times.forEach(function (item,index) {
					var tmpDate = new Date(item);
					var hours = tmpDate.getHours() > 9 ?tmpDate.getHours():'0'+tmpDate.getHours();
					var minutes = tmpDate.getMinutes() > 9 ?tmpDate.getMinutes():'0'+tmpDate.getMinutes();
					times[index] = hours+":"+minutes;
				});
				for (var i = 0; i < tmpData.datas.length; i++) {
					echartsData['line'+(i+1)] = tmpData.datas[i];
					currData['line'+(i+1)] = tmpData.datas[i][tmpData.datas[i].length - 1];
				}
				echartsData.time = times;
				data.content.echartsData = echartsData;
				data.content.currData = currData;

				return data;
			}
			
			function showItems(id, data) {
				var ele = $('#'+id,$el).children();
				for (var i = 0; i < ele.length; i++) {
					if(String(data[i]).indexOf('undefined') > -1) {
						ele[i].innerHTML = '-';
					} else {
						ele[i].innerHTML = data[i];
					}
				}
			}
			
			//表空间信息
			var $spaceTable = $('#spaceTable',$el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'autoWidth': false,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'dbpartitionnum', defaultContent : ''
				},{
					data : 'id', defaultContent : ''
				},{
					data : 'tbspc_name', defaultContent : ''
				},{
					data : 'page_size_kb', defaultContent : ''
				},{
					data : 'total_pages', defaultContent : ''
				},{
					data : '', defaultContent : ''
				},{
					data : 'free_pages', defaultContent : ''
				},{
					data : 'tablespace_state', defaultContent : ''
				},{
					data : 'tbsp_using_auto_storage', defaultContent : ''
				}],
				'aoColumnDefs' : [{
                    "render": function(data, type, row, meta) {
                        	return '<span>'+row.used_pages+'</span><span>'+row.percent_used+'</span><span style="background-size:'+row.percent_used+'px 2px"></span>';
                    },
                    "targets" : 6
				},{
                    "render": function(data, type, row, meta) {
                    	if(data == "NORMAL")
                    		return '<span class="green"></span>'+"正常";
                    	else 
                    		return '<span class="red"></span>'+"异常";
                    },
                "targets" : 8
				}]
			});
			
			getTableData($spaceTable, 'db2_tablespace');
			
			function getTableData($table, resultSet) {
				app.common.ajaxWithAfa({
					url: 'CommonMonitorAction_getKeyMetric.do',
					data: {
						objectId: objectId,
						resultSet: resultSet
					}
				}).then(function(data) {
					$table.clear().draw();
					data = data.result;
					data.forEach(function(item, i) {
						item.index = ++i;
					});
					$table.rows.add(data).draw();
//					var datas = [];
//					for(var i = 0; i < 10; i++) {
//						datas.push({index: i + 1});
//					}
//					$workTable.rows.add(datas).draw();
				});
			}
			
			//sql表
			$longSqlTable = $('#longSqlTable',$el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 6,
				'autoWidth': false,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'agent_id', defaultContent : ''
				},{
					data : 'stmt_text', defaultContent : ''
				},{
					data : 'uow_log_space_used', defaultContent : ''
				},{
					data : 'rows_read', defaultContent : ''
				},{
					data : 'rows_written', defaultContent : ''
				},{
					data : 'stmt_start', defaultContent : ''
				},{
					data : 'currenttime', defaultContent : ''
				},{
					data : 'stmt_type', defaultContent : ''
				},{
					data : 'stmt_operation', defaultContent : ''
				},{
					data : 'creator', defaultContent : ''
				},{
					data : 'package_name', defaultContent : ''
				},{
					data : 'section_number', defaultContent : ''
				}]
			});
			
			getTableData($longSqlTable, 'db2_activelogused');
			
			var $workTable = $('#workTable', $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'autoWidth': false,
				'columns': [{
					data: 'index'
				},{
					data: 'db_name',
					defaultContent: ''
				},{
					data: 'config_size',
					defaultContent: ''
				},{
					data: 'cur_size',
					defaultContent: ''
				},{
					data: 'mem_used_rate',
					defaultContent: ''
				}]
			});
			
			getTableData($workTable, 'db2_dbmenyused');
			
			var $top5Table = $('#top5Table', $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'autoWidth': false,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'tblschema', defaultContent : ''
				},{
					data : 'tblname', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'compression', defaultContent : ''
				},{
					data : 'stats_time', defaultContent : ''
				},{
					data : 'rows', defaultContent : ''
				},{
					data : 'tablespacename', defaultContent : ''
				},{
					data : 'tablesize', defaultContent : ''
				}]
			});
			
			getTop5TableData();
			
			function getTop5TableData() {
				 app.common.ajaxWithAfa({
					 url: 'CommonMonitorAction_getKeyMetric2.do',
					 data: {
						 objectId: objectId,
						 metricName: 'db2_allTblRecordMsg',
						 whereEx: JSON.stringify({"ROWS":"desc"}),
						 top: 5
					 }
				 }).then(function(data) {
					 $top5Table.clear().draw();
					 data = data.result;
					 data.forEach(function(item, i) {
						item.index = ++i; 
					 });
					 $top5Table.rows.add(data).draw();
				 });				 
			}
			
			eAverWaitTime = app.showEcharts({
				handler	: handler,
				context	: $el,
				eType	: 'line',
				xCount: 4,
				url		: 'CommonMonitorAction_getEachart.do',
				selector: '#eAverWaitTime',
				unit	: '秒',
				items	: ['平均锁等待时间'],
				urlParams: {
					interval : 1,
					time 	 : 60,
					objectId : objectId,
					metricNames:['db2_avg_waitting_time_s.AVG_WAITTING_TIME_S']
				},
				beforefn:function (data) {
					data = formatLineData(data);
				}
			});
			eAverWaitTime.start();
			
			eLockNum = app.showEcharts({
				handler	: handler,
				context	: $el,
				eType	: 'line',
				xCount: 4,
				url		: 'CommonMonitorAction_getEachart.do',
				selector: '#eLockNum',
				unit	: '个',
				items	: ['死锁回滚数量'],
				urlParams: {
					interval : 1,
					time 	 : 60,
					objectId : objectId,
					metricNames:['db2_deadlockrollback.deadlock_rollbacks_total']
				},
				beforefn:function (data) {
					data = formatLineData(data);
				}
			});
			eLockNum.start();
			
			eAppLockWait = app.showEcharts({
				handler	: handler,
				context	: $el,
				eType	: 'line',
				xCount: 4,
				url		: 'CommonMonitorAction_getEachart.do',
				selector: '#eAppLockWait',
				unit	: '%',
				items	: ['应用锁等待百分比'],
				urlParams: {
					interval : 1,
					time 	 : 60,
					objectId : objectId,
					metricNames:['db2_snaplockwait.SNAPLOCKWAIT	']
				},
				beforefn:function (data) {
					data = formatLineData(data);
				}
			});
			eAppLockWait.start();
			
			eLockUpTime = app.showEcharts({
				handler	: handler,
				context	: $el,
				eType	: 'line',
				xCount: 4,
				url		: 'CommonMonitorAction_getEachart.do',
				selector: '#eLockUpTime',
				unit	: '个',
				items	: ['应用锁超时数量'],
				urlParams: {
					interval : 1,
					time 	 : 60,
					objectId : objectId,
					metricNames:['db2_locktimeout.lock_timeouts_total']
				},
				beforefn:function (data) {
					data = formatLineData(data);
				}
			});
			eLockUpTime.start();
			
			eLockUpgrade = app.showEcharts({
				handler	: handler,
				context	: $el,
				eType	: 'line',
				xCount: 4,
				url		: 'CommonMonitorAction_getEachart.do',
				selector: '#eLockUpgrade',
				unit	: '个',
				items	: ['锁升级'],
				urlParams: {
					interval : 1,
					time 	 : 60,
					objectId : objectId,
					metricNames:['db2_heapandlock.LOCK_ESCALS']
				},
				beforefn:function (data) {
					data = formatLineData(data);
				}
			});
			eLockUpgrade.start();
			
			var $heapLockTable = $('#heapLockTable', $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'autoWidth': false,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'db_name', defaultContent : ''
				},{
					data : 'deadlocks', defaultContent : ''
				},{
					data : 'lock_escals', defaultContent : ''
				},{
					data : 'sort_overflows', defaultContent : ''
				}]
			});
			
			getTableData($heapLockTable, 'db2_heapandlock');
			
			var $longLockTable = $('#longLockTable', $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'autoWidth': false,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'agent_id', defaultContent : ''
				},{
					data : 'appl_status', defaultContent : ''
				},{
					data : 'uow_start_time', defaultContent : ''
				},{
					data : 'appl_name', defaultContent : ''
				},{
					data : 'tabname', defaultContent : ''
				},{
					data : 'lock_object_type', defaultContent : ''
				},{
					data : 'lock_mode', defaultContent : ''
				}]
			});
			
			getTableData($longLockTable, 'db2_longtimelocktable');
		},
		unload : function(handler) {
			var echarts = [eventEchart, portEchart, processEchart, eAverWaitTime, eLockNum, eAppLockWait, eLockUpTime, eLockUpgrade];
			echarts.forEach(function(item, i) {
				item && item.dispose();
			});
		},
		pause : function($el, attr, handler) {
			
		},
		resume : function($el, attr, handler) {
			
		}
	};
});