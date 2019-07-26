define([ "jquery" ], function() {

	//echarts对象   14图5表
	var ePort,eCurrLinks,eCPUUsed,eMemoryUsed,eLockTime,eLockWaits,edbProperty,
	eFlow,eSQLNum,edbHit,eCursor,eBinlog,eLogWait,edbSize;
	var eventEchart;
	return {
		load : function($el, scope, handler) {
			var objectId = scope.objectId;
			
			app.common.ajaxWithAfa({
				url:'CommonMonitorAction_getMetricProperty.do',
				data:{objectId: objectId}
			}).done(function(data){
				var data = data.result;
				$('#version',$el).text(data.version);
				$('#ip',$el).text(data.ipAdd);
				$('#port',$el).text(data.port);
			});
			
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
			
			//echarts、表格公共配置
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
			pageTable = {
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength': 5,
			};
			
			
			//锁信息
			var $lockInfoTable = $("#lockInfoTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'lock_key', defaultContent : ''
				},{
					data : 'lock_value', defaultContent : ''
				}],
			}));
			
			// userTable
			var $userTable = $("#userTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'user', defaultContent : ''
				},{
					data : 'select_priv', defaultContent : ''
				},{
					data : 'insert_priv', defaultContent : ''
				},{
					data : 'update_priv', defaultContent : ''
				},{
					data : 'delete_priv', defaultContent : ''
				},{
					data : 'create_priv', defaultContent : ''
				},{
					data : 'drop_priv', defaultContent : ''
				},{
					data : 'index_priv', defaultContent : ''
				},{
					data : 'alter_priv', defaultContent : ''
				},{
					data : 'repl_slave_priv', defaultContent : ''
				},{
					data : 'repl_client_priv', defaultContent : ''
				},{
					data : 'create_view_priv', defaultContent : ''
				},{
					data : 'show_view_priv', defaultContent : ''
				}],
			}));
			
			
			//会话明细
			var $converTable = $("#converTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'pid', defaultContent : ''
				},{
					data : 's_user', defaultContent : ''
				},{
					data : 's_host', defaultContent : ''
				},{
					data : 's_schema', defaultContent : ''
				},{
					data : 'cmd_type', defaultContent : ''
				},{
					data : 'time', defaultContent : ''
				},{
					data : 'state', defaultContent : ''
				},{
					data : 'cmd', defaultContent : ''
				}],
			}));
			//数据库
			var $database = $("#database", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'table_schema', defaultContent : ''
				},{
					data : 'size', defaultContent : ''
				}],
			}));
			//数据表
			var $database_table = $("#database_table", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'tableschema', defaultContent : ''
				},{
					data : 'tablename', defaultContent : ''
				},{
					data : 'totallength', defaultContent : ''
				}]
			}));
			//数据加载------------------------------------开始-------------------------------------
			//图
			fnPort();
			fnCPU();
			fnCurrLinks();
			fnLockTime();
			fnLockWaits();
			fnFlow();
			fnSQLNum();
			
			fndbProperty();
			fnFlow();
			fnSQLNum();
			fndbHit();
			fnCursor();
			fnBinlog();
			fnLogWait();
			//表格
			fnUserTable();
			fnConverTable();
			fnDatabaseTable();
			/*fnLockInfoTable();
			
			fnConverTable();*/
			//数据加载------------------------------------结束-------------------------------------
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
			
			//表格数据---------------------------------开始-----------------------------------
			
			//锁信息
			function fnLockInfoTable(){
				app.common.ajaxWithAfa({
					url : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'mysql_lockinfo'}
				}).done(function(data){
					addData(data,$lockInfoTable);
				});
			}
			//用户权限
			function fnUserTable(){
				app.common.ajaxWithAfa({
					url : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'mysql_userinfo'}
				}).done(function(data){
					addData(data,$userTable);
				});
			}
			//会话明细
			function fnConverTable(){
				app.common.ajaxWithAfa({
					url : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'mysql_sessioninfo'}
				}).done(function(data){
					addData(data,$converTable);
				});
			}
			//数据库
			function fnDatabaseTable(){
				app.common.ajaxWithAfa({
					url : "MysqlMonitorAction_getSchemasizeTop5.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data,$database);
				});
			}
			//数据表
			function fnDatabaseTableTable(){
				app.common.ajaxWithAfa({
					url : "MysqlMonitorAction_getTableTop5.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data,$database_table);
				});
			}
			$("#databaseUl li",$el).on('click',function(){
				if(this.className == "active"){
					return;
				}
				var $index = $("#databaseUl li",$el).index(this);
				if($index == 0){
					fnDatabaseTable();
				}else if($index == 1){
					fnDatabaseTableTable();
				}
			});
			function addData(data, $table){
				var result = data.result;
				$table.clear();
				if(result && result.length > 0){
					result.forEach(function(item, index){
						item.index = ++index;
					});
					$table.rows.add(result).draw();
				}
			}
			
			//基础数据
			app.common.ajaxWithAfa({
				url  : "CommonMonitorAction_getMetricInfo2.do",
				data:{
					"objectId":objectId,
					'metricNames':['mysql_pub.Questions','mysql_pub.Com_commit','mysql_pub.uptime','mysql_pub.com_rollback',
					               "mysql_pub.key_reads","mysql_pub.key_read_requests",
					               "mysql_pub.Qcache_hits","mysql_pub.Qcache_inserts",'mysql.connectinfo_runthreadnum',
					               'mysql_pub.handler_read_rnd_next','mysql_pub.handler_read_rnd','mysql_pub.handler_read_first',
					               'mysql_pub.handler_read_next','mysql_pub.handler_read_key','mysql_pub.handler_read_prev'
					               ]
				}
			}).done(function (data) {
				if(!$.isEmptyObject(data.result)){
					var QPS = (data.result['mysql_pub.Questions'].value/data.result['mysql_pub.uptime'].value).toFixed(2);
					var TPS = ((Number(data.result['mysql_pub.Com_commit'].value) + Number(data.result['mysql_pub.com_rollback'].value)) / data.result['mysql_pub.uptime'].value).toFixed(2);
					$("#qps",$el).text(QPS);
					$("#tps",$el).text(TPS);
					var keyBufferRate = ((1-data.result['mysql_pub.key_reads'].value/data.result['mysql_pub.key_read_requests'].value)*100).toFixed(2);
					var queryCacheRate;
					if(Number(data.result['mysql_pub.Qcache_hits'].value) + Number(data.result['mysql_pub.Qcache_inserts'].value) == 0){
						queryCacheRate = 0;
					}else{
						queryCacheRate = (data.result['mysql_pub.Qcache_hits'].value / (Number(data.result['mysql_pub.Qcache_hits'].value) + Number(data.result['mysql_pub.Qcache_inserts'].value))*100).toFixed(2);

					}
					var a = Number(data.result['mysql_pub.handler_read_rnd_next'].value);
					var b = Number(data.result['mysql_pub.handler_read_rnd'].value);
					var c = Number(data.result['mysql_pub.handler_read_first'].value);
					var d = Number(data.result['mysql_pub.handler_read_next'].value);
					var e = Number(data.result['mysql_pub.handler_read_key'].value);
					var f = Number(data.result['mysql_pub.handler_read_prev'].value);
					var allTableScanRate = (a+b)/(a+b+c+d+e+f)*100;
					$("#keyBufferRate",$el).text(keyBufferRate);
					$("#queryCacheRate",$el).text(queryCacheRate);
					$("#curActThreadCount",$el).text(data.result['mysql.connectinfo_runthreadnum'].value);
					$("#allTableScanRate",$el).text(allTableScanRate.toFixed(2));
				}
			});
			
			//端口
			function fnPort(){
				ePort = app.drawEcharts($.extend({}, basicEcharts, {
					selector : '#ePort',
					unit	 : '个',
					items	 : ['ESTABLISHED','CLOSE_WAIT','TIME_WAIT'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['mysql_portinfo.established','mysql_portinfo.close_wait','mysql_portinfo.time_wait','mysql_portinfo.listen']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(data){
						if(data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length){
							var data = data.content.echartsData;
							$('#pEstablished', $el).text(data.line1[data.line1.length-1] + '个');
							$('#pClose', $el).text(data.line2[data.line2.length-1] + '个');
							$('#pTime', $el).text(data.line3[data.line3.length-1] + '个');
							var status = data.line4[data.line4.length-1]
							if(status==1){
								$("#portStatus", $el).text('正常');
							}else{
								$("#portStatus", $el).text('异常');
							}
						}	
					}
				}));
				ePort.start();
			}
			//CPU
			function fnCPU(){
				eCPUUsed = app.drawEcharts($.extend({}, basicEcharts, {
					selector : '#eCPUUsed',
					unit	 : '%',
					items	 : ['cpu使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['mysql_processinfo.pcpu']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
				}));
				eCPUUsed.start();
			}
			//进程资源
			function fnMEM(){
				eMemoryUsed = app.drawEcharts($.extend({}, basicEcharts, {
					selector : '#eMemoryUsed',
					unit	 : '%',
					items	 : ['内存使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['mysql_processinfo.pmem']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
				}));
				eMemoryUsed.start();
			}

			$("#Cpu_Mem li",$el).on('click',function(){
				if(this.className == "active"){
					return;
				}
				var $index = $("#Cpu_Mem li",$el).index(this);
				if($index == 0){
					eMemoryUsed && eMemoryUsed.dispose();
					fnCPU();
				}else if($index == 1){
					eCPUUsed && eCPUUsed.dispose();
					fnMEM();
				}
			});
			//当前连接数
			function fnCurrLinks(){
				eCurrLinks = app.drawEcharts($.extend({}, basicEcharts, {
					selector : '#eCurrLinks',
					unit	 : '个',
					items	 : ['活动线程数', '当前线程数',],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['mysql.connectinfo_runthreadnum', 'mysql.connectinfo_threadnum']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(data){
						if(data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length){
							var data = data.content.echartsData;
							$('#freeLinks', $el).text(data.line1[data.line1.length-1] + '个');
							$('#curThreads', $el).text(data.line2[data.line2.length-1] + '个');
						}	
					}
				}));
				eCurrLinks.start();
			}
			
			
			//锁时间
			function fnLockTime(){
				eLockTime = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eLockTime',
					unit	: 'ms',
					items	: ['锁时间'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ["mysql_pub.lock_time"]
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
				}));
				eLockTime.start();
			}
			
			//锁等待数量
			function fnLockWaits(){
				eLockWaits = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eLockWaits',
					unit	: '个',
					items	: ['锁等待数量'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ["mysql_pub.lock_wait"]
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
				}));
				eLockWaits.start();
			}
			//数据库性能
			function fndbProperty(){
				edbProperty = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#edbProperty',
					unit	: '个/S',
					items	: ['QPS','TPS'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['mysql_pub.Questions','mysql_pub.Com_commit','mysql_pub.uptime','mysql_pub.com_rollback']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
						var line1 =[],line2=[];
						var lines = data.content.echartsData;
						for (var i = 0; i < lines['line1'].length; i++) {
							if(lines['line1'][i] && lines['line3'][i]){
								line1.push(lines['line1'][i]/lines['line3'][i]);
							}else{
								line1.push(0);
							}

							if(lines['line2'][i] && lines['line3'][i] && lines['line4'][i]){
								line2.push((lines['line2'][i] +lines['line4'][i])/lines['line3'][i]);
							}else{
								line2.push(0);
							}
						}
						data.content.echartsData.line1 = line1;
						data.content.echartsData.line2 = line2;

						data.content.currData.line1 = line1[line1.length -1];
						data.content.currData.line2 = line2[line2.length -1];
					},
					succfn:function (data) {
						var line = data.content.currData;
						$('#dbQPS',$el).text(line.line1.toFixed(2)+"个/S");
						$('#dbTPS',$el).text(line.line2.toFixed(2)+"个/S");
					}
				}));
				edbProperty.start();
			}
			//流量
			function fnFlow(){
				eFlow = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eFlow',
					unit	: 'B',
					items	: ['读字节','写字节'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ["mysql_pub.Innodb_data_reads","mysql_pub.Innodb_data_writes"]
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(data){
						if(data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length){
							var data = data.content.echartsData;
							$('#read', $el).text(data.line1[data.line1.length-1] + '字节');
							$('#write', $el).text(data.line2[data.line2.length-1] + '字节');
						}	
					}
				}));
				eFlow.start();
			}
			//SQL次数
			function fnSQLNum(){
				eSQLNum = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eSQLNum',
					unit	: '次',
					items	: ['SELECT次数','UPDATE次数','INSERT次数','DELETE次数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ["mysql_pub.Com_select","mysql_pub.Com_update","mysql_pub.Com_insert","mysql_pub.Com_delete"]
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(data){
						if(data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length){
							var data = data.content.echartsData;
							$('#selects', $el).text(data.line1[data.line1.length-1] + '次');
							$('#updates', $el).text(data.line2[data.line2.length-1] + '次');
							$('#inserts', $el).text(data.line2[data.line2.length-1] + '次');
							$('#deletes', $el).text(data.line2[data.line2.length-1] + '次');
						}	
					}
				}));
				eSQLNum.start();
			}
			//数据库命中率
			function fndbHit(){
				edbHit = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#edbHit',
					unit	: '%',
					items	: ['KEY BUFFER','INNODB BUFFER','QUERY CACHE','THREAD CACHE'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ["mysql_pub.key_reads","mysql_pub.key_read_requests",
						               "mysql_pub.Innodb_buffer_pool_reads","mysql_pub.Innodb_buffer_pool_read_requests",
						               "mysql_pub.Qcache_hits","mysql_pub.Qcache_inserts",
						               "mysql_pub.Threads_created","mysql_pub.Connections"]
					}),
					beforefn:function (data) {
						var tmpData = formatLineData(data);
						var lines = tmpData.content.echartsData;
						var newData1 = [],newData2 = [],newData3 = [],newData4 = [];
						for(var i=0;i<lines['line1'].length;i++){
							if (lines['line1'][i] && lines['line2'][i]) {
								newData1.push((1 - lines['line1'][i]/lines['line2'][i])*100);
							}else{
								newData1.push(0);
							}

							if (lines['line3'][i] && lines['line4'][i]) {
								newData2.push((1 - lines['line3'][i]/lines['line4'][i])*100);
							}else{
								newData2.push(0);
							}
							
							if(lines['line5'][i] && lines['line6'][i]){
								newData3.push((lines['line5'][i]/(lines['line5'][i]+lines['line6'][i]))*100);
							}else{
								newData3.push(0);
							}

							if(lines['line7'][i] && lines['line8'][i]){
								newData4.push((1 - lines['line7'][i]/lines['line8'][i])*100);
							}else{
								newData4.push(0);
							}
						}
						tmpData.content.echartsData.line1 = newData1;
						tmpData.content.echartsData.line2 = newData2;
						tmpData.content.echartsData.line3 = newData3;
						tmpData.content.echartsData.line4 = newData4;

						tmpData.content.currData.line1 = newData1[newData1.length-1];
						tmpData.content.currData.line2 = newData2[newData2.length-1];
						tmpData.content.currData.line3 = newData3[newData3.length-1];
						tmpData.content.currData.line4 = newData4[newData4.length-1];
						data = tmpData;
					},
					succfn: function(data){
						var eData = data.content.currData;
						$('#keyBuffer',$el).text(eData['line1'].toFixed(2));
						$('#innodbBuffer',$el).text(eData['line2'].toFixed(2));
						$('#queryCache',$el).text(eData['line3'].toFixed(2));
						$('#threadCache',$el).text(eData['line4'].toFixed(2));
					}
				}));
				edbHit.start();
			}
			//临时表
			function fnCursor(){
				eCursor = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eCursor',
					unit	: '个',
					items	: ['临时表','临时文件','磁盘上临时表'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ["mysql_pub.Created_tmp_tables","mysql_pub.Created_tmp_files","mysql_pub.Created_tmp_disk_tables"]
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(data){
						if(data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length){
							var data = data.content.echartsData;
							$('#temTable', $el).text(data.line1[data.line1.length-1] + '个');
							$('#temFile', $el).text(data.line2[data.line2.length-1] + '个');
							$('#temDisk', $el).text(data.line2[data.line2.length-1] + '个');
							$('#threadCache', $el).text(data.line2[data.line2.length-1] + '个');
						}	
					}
				}));
				eCursor.start();
			}
			//binlog
			function fnBinlog(){
				eBinlog = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eBinlog',
					unit	: '个',
					items	: ['BINLOG_CACHE_DISK_USE','BINLOG_CACHE_USE'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ["mysql_pub.Binlog_cache_disk_use","mysql_pub.Binlog_cache_use"]
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(data){
						if(data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length){
							var data = data.content.echartsData;
							$('#binlogDisk', $el).text(data.line1[data.line1.length-1] + '个');
							$('#binlog', $el).text(data.line2[data.line2.length-1] + '个');
						}	
					}
				}));
				eBinlog.start();
			}
			//日志等待次数
			function fnLogWait(){
				eLogWait = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eLogWait',
					unit	: '次',
					items	: ['Innodb_log_waits'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['mysql_pub.Innodb_log_waits']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					
				}));
				eLogWait.start();
			}
			
			//li点击切换 echarts加载与清除
			$('#mainUl li', $el).click(function(){
				if($(this).hasClass("active")){
					return;
				}
				var index = $('#mainUl li').index(this);
				if(index == 1){
					fnConverTable();
					fnDatabaseTable();
				}
				else{
					fnUserTable();
				}
			});
			
			
			
			$('#lockUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				var index = $('#lockUl li').index(this);
				if(index == 0){
					eLockWaits && eLockWaits.dispose();
					fnLockTime();
				}else if(index == 1){
					eLockTime && eLockTime.dispose();
					fnLockWaits();
				}
				else{
					eLockTime && eLockTime.dispose();
					eLockTime && eLockTime.dispose();
					fnLockInfoTable();
				}
			});
			
			
			$('#binlogUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				var index = $('#binlogUl li').index(this);
				if(index == 0){
					eLogWait && eLogWait.dispose();
					fnBinlog();
				}else{
					eBinlog && eBinlog.dispose();
					fnLogWait();
				}
			});
			// 显示更多信息
			$('#moreInfo', $el).popover({
				'placement': 'bottom',
				'title': '详细信息',
				'html': true,
				'trigger': 'hover',
				'content': '<div>版本：109022000</div>'+'<div>版本：109022000</div>'+'<div>版本：109022000</div>'
			});
			
			//各类事件数模块点击跳转
			$('.mysqlDetails-event span', $el).on('click', function(e){
				var title, eType;
				var content = $(this).text();
				var	id = e.target.id;
				
				if(isNaN(content) || parseInt(content) == 0){
					return;
				}
				if(id == 'alarmWaring' || id == 'waringCount' || id == 'alarmCount' || id == 'infoCount'){
					if(id == 'alarmWaring'){
						title = "未解决";
					}else if(id == 'waringCount'){
						title = "预警";
						eType = "WARING";
					}else if(id == 'infoCount'){
						title = "通知";
						eType = "INFO";
					}else{
						title = "告警";
						eType = "ALARM";
					}
					
					app.dispatcher.load({
						"title" : "事件列表-" + objectId + title,
						"moduleId" : "eventList",
						"section" : "",
						"id" : "",
						"params" : { // 给标签传递参数
							"objId" : objectId,
							"eType" : eType,
							"eventClosed": 'FALSE'
						}
					});
				}
			});
			
		},
		unload : function(handler) {
			var echartsArr = [ePort,eCurrLinks,eLockTime,eLockWaits,
			                  edbProperty,eFlow,eSQLNum,edbHit,eCursor,eBinlog,eLogWait,edbSize];
			echartsArr.forEach(function(item){
				item && item.dispose();
			});
			handler.stopTapAysn1 && handler.stopTapAysn1();
			handler.stopTapAysn2 && handler.stopTapAysn2();
			eventEchart && eventEchart.dispose();
		},
		pause : function($el, attr, handler) {
			
		},
		resume : function($el, attr, handler) {
			
		}
	};
});