define([ "jquery" ], function() {

	//echarts对象
	var eMemory,eCPU,eClients,eKeyHit,eKeyCount,eCommands,eventEchart;
	return {
		load : function($el, scope, handler) {
			
			var objectId = scope.objectId;
			var basicEcharts = {
					handler	: handler,
					context	: $el,
					eType	: 'line',
					url		: 'CommonMonitorAction_getEachart.do'
				},
				urlParams = {
					objectId : objectId,
					interval : 1,
					time 	 : 60
				},
				baseTable = {	
					'bAutoWidth' : true,
					'bPaginate' : true,
					'pagingType' : 'full_numbers',
					'searching' : false,
					'bSort' : false,
					'pageLength' :5,
				}
			
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
			
			// 复制信息
			var $copyTable = $('#copyTable',$el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'role', defaultContent : ''
				},{
					data : 'master_link_status', defaultContent : ''
				},{
					data : 'master_link_down_since_seconds', defaultContent : ''
				},{
					data : 'master_last_io_seconds', defaultContent : ''
				},{
					data : 'slave_lag', defaultContent : ''
				},{
					data : 'slave_read_only', defaultContent : ''
				},{
					data : 'connected_slaves', defaultContent : ''
				},{
					data : 'repl_backlog_active', defaultContent : ''
				},{
					data : 'repl_backlog_size', defaultContent : ''
				}]
			});
			
			// 持久化信息
			var $persistTable = $('#persistTable',$el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'loading', defaultContent : ''
				},{
					data : 'rdb_bgsave_in_progress', defaultContent : ''
				},{
					data : 'rdb_last_bgsave_status', defaultContent : ''
				},{
					data : 'rdb_last_bgsave_time_sec', defaultContent : ''
				},{
					data : 'rdb_current_bgsave_time_sec', defaultContent : ''
				},{
					data : 'aof_enabled', defaultContent : ''
				},{
					data : 'aof_rewrite_in_progress', defaultContent : ''
				},{
					data : 'aof_last_bgrewrite_status', defaultContent : ''
				}]
			});

			
			//指标-基本信息
			app.common.ajaxWithAfa({
				url  : "CommonMonitorAction_getMetricInfo2.do",
				data:{
					"objectId":objectId,
					'metricNames':["redis_clients.connected_clients","redis_server.uptime_in_days","redis_replic.role"]
				}
			}).done(function(data){
				//基础配置
				$('#mode', $el).text(data.result['redis_replic.role'].value !== undefined?data.result['redis_replic.role'].value:'-');//内存使用率 
				$('#clientnum', $el).text(data.result['redis_clients.connected_clients'].value !== undefined?data.result['redis_clients.connected_clients'].value:'-');//网络流量
			});
			
			//复制信息
			fnCopyTable();
			function fnCopyTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'redis_replic'}
				}).done(function(data){
					addData(data, $copyTable);
				});
			}
			//复制信息
			fnPersistTable();
			function fnPersistTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'redis_persist'}
				}).done(function(data){
					addData(data, $persistTable);
				});
			}
			/*组织表格数据*/
			function addData(data, $table){
				var result = data.result;
				$table.clear();
				if(result && result.length > 0){
					result.forEach(function(item,index){
						item.index = ++index;
					})
					$table.rows.add(result).draw();
				}
			}
			/*组织折线图数据*/
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

			fnEMemory();
			// 内存使用率
			function fnEMemory(){
				eMemory = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eMemory',
					unit	: 'MB',
					items:['used','rss'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['redis_mem.used_memory','redis_mem.used_memory_rss']
					}),
					beforefn:function (data) {
						var tmpData = formatLineData(data);
						var lines = tmpData.content.echartsData;
						var newData1 = [],newData2 = []
						for(var i=0;i<lines['line1'].length;i++){
							if (lines['line1'][i] && lines['line2'][i]) {
								newData1.push((lines['line1'][i]/1024/1024).toFixed(2));
								newData2.push((lines['line2'][i]/1024/1024).toFixed(2));
							}
						}
						tmpData.content.echartsData.line1 = newData1;
						tmpData.content.echartsData.line2 = newData2;
						tmpData.content.currData.line1 = newData1[newData1.length-1];
						tmpData.content.currData.line2 = newData2[newData2.length-1];
						data = tmpData;
					}
				}));	
				eMemory.start();
			}	

			fneCPU();
			// CPU
			function fneCPU(){
				eCPU = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eCPU',
					unit	: '秒',
					items:['sys','user'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['redis_cpu.used_cpu_sys','redis_cpu.used_cpu_user']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					}
				}));	
				eCPU.start();
			}

			fneClients();
			// 客户端连接数量
			function fneClients(){
				eClients = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eClients',
					unit	: '个',
					items:['客户端连接数量'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['redis_clients.connected_clients']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					}
				}));	
				eClients.start();
			}
			fneCommands();
			//处理的命令数
			function fneCommands(){
				eCommands = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eCommands',
					unit	: '个',
					items:['处理的命令数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['redis_stats.total_commands_processed']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					}
				}));	
				eCommands.start();
			}
			fnEKeyHit();
			// 键命中率
			function fnEKeyHit(){
				eKeyHit = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eKeyHit',
					unit	: '%',
					items:['键命中率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['redis_stats.keyspace_hits','redis_stats.keyspace_misses']
					}),
					beforefn:function (data) {
						var tmpData = formatLineData(data);
						var lines = tmpData.content.echartsData;
						var newData1 = []
						for(var i=0;i<lines['line1'].length;i++){
							if(lines['line1'][i]==0){
								newData1.push(100);
							}else if (lines['line1'][i] && lines['line2'][i]) {
								newData1.push((1 - lines['line2'][i]/lines['line1'][i])*100);
							}else{
								newData1.push(0);
							}
						}
						tmpData.content.echartsData.line1 = newData1;
						tmpData.content.currData.line1 = newData1[newData1.length-1];
						data = tmpData;
					},
					succfn: function(data){
						var data = data.content.echartsData;
						$('#keyhit',$el).text(Number(data.line1[data.line1.length-1]).toFixed(2));
					}
				}));	
				eKeyHit.start();
			}	

			fnEKeyCount();
			// 键个数
			function fnEKeyCount(){
				eKeyCount = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eKeyCount',
					unit	: '个',
					items:['键个数'],
					
					urlParams: $.extend({}, urlParams, {
						metricNames : ['redis_keyspace.keynum']
					}),
					url:'CommonMonitorAction_getEchartSumValue.do',
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(data){
						var data = data.content.echartsData;
						$('#keynum',$el).text(data.line1[data.line1.length-1]);
					}
				}));	
				eKeyCount.start();
			}	
			
			app.common.ajaxWithAfa({
				url:'CommonMonitorAction_getMetricProperty.do',
				data:{objectId: objectId}
			}).done(function(data){
				var data = data.result;
//				var detail_content='';
//				var infoData = {};
//				for(var i = 0;i<data.length;i++){
//					str ='<div class="more-info-content"> <span>'+data[i].column_name+' :</span><span>'+data[i].column_value+'</span></div>'
//					detail_content+=str;
//					infoData[data[i].column_code] = data[i].column_value;
//				}
				$('#version',$el).text(data.version);
				$('#ip',$el).text(data.ipAdd);
				$('#port',$el).text(data.port);
				// 显示更多信息
//				$('#moreInfo', $el).popover({
//					'placement': 'bottom',
//					'title': '详细信息',
//					'html': true,
//					'trigger': 'hover',
//					'content': detail_content
//				});
			});
		},
		unload : function(handler) {
			var echarts = [eMemory,eCPU,eClients,eKeyHit,eKeyCount,eCommands,eventEchart];
			echarts.forEach(function (item) {
				item && item.dispose();
			});
		},
		pause : function($el, attr, handler) {
			app.dispatcher2.pause();
		},
		resume : function($el, attr, handler) {
			
		}
	};
});