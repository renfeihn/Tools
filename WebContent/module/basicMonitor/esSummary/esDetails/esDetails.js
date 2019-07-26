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
					'metricNames':["es_clusterinfo.cluster_status","es_clusterinfo.docs_count","es_clusterinfo.indices_count","es_clusterinfo.active_shards_percent_as_number"]
				}
			}).done(function(data){
				//基础配置
				$('#mode', $el).text(data.result['es_clusterinfo.cluster_status'].value !== undefined?data.result['es_clusterinfo.cluster_status'].value:'-');//cpu
				$('#keyhit', $el).text(data.result['es_clusterinfo.docs_count'].value !== undefined?data.result['es_clusterinfo.docs_count'].value:'-');//内存
				$('#keynum', $el).text(data.result['es_clusterinfo.indices_count'].value !== undefined?data.result['es_clusterinfo.indices_count'].value:'-');//堆内存
				$('#clientnum', $el).text(data.result['es_clusterinfo.active_shards_percent_as_number'].value !== undefined?data.result['es_clusterinfo.active_shards_percent_as_number'].value:'-');//磁盘
			});
			
			//复制信息
			//fnCopyTable();
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
			//fnPersistTable();
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

			/*组织折线图数据*/
			function formatLineDataDif(data,$echarts) {
				var echartsData = {};
				var currData ={}; 
				var tmpData = data.content.result.line;
				var times = tmpData.times;
				var items =[];
				/*处理时间*/
				times = times.map(item => new Date(item).Format('hh:mm'));
				for (var i = 0; i < tmpData.datas.length; i++) {
					echartsData['line'+(i+1)] = tmpData.datas[i];
					currData['line'+(i+1)] = tmpData.datas[i][tmpData.datas[i].length - 1];
				}
				echartsData.time = times;
				data.content.echartsData = echartsData;
				data.content.currData = currData;
				tmpData.alias.forEach(function(item,index){
					if (item.split(',').length > 1) {
						items.push(item.split(',')[1]);
					}else{
						items.push(item);
					}
				})
				$echarts.changeItems(items);
				return data;
			}

			fnEMemory();
			// 内存使用率
			function fnEMemory(){
				eMemory = app.drawEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#eMemory',
					eType	 : 'line',
					url		 : 'CommonMonitorAction_getMetricEcharts.do',
					unit	 : '%',
					urlParams: {
						interval : 1,
						time 	 : 60,
						'objectId' : objectId,
						'metricName' : 'es_node_performance.mem_used',	
						'echarts_type': 1
					},
					beforefn:function (data) {
						if(data.content.result.line.alias.length == 0){
							eMemory && eMemory.dispose();
							//$("#eButtons",$el).css({display: 'none'});
						}
						data = formatLineDataDif(data,eMemory);
					}
				});
				eMemory.start();
			}	

			fneCPU();
			// CPU
			function fneCPU(){
				eCPU = app.drawEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#eCPU',
					eType	 : 'line',
					url		 : 'CommonMonitorAction_getMetricEcharts.do',
					unit	 : '%',
					urlParams: {
						interval : 1,
						time 	 : 60,
						'objectId' : objectId,
						'metricName' : 'es_node_performance.cpu_used',	
						'echarts_type': 1
					},
					beforefn:function (data) {
						if(data.content.result.line.alias.length == 0){
							eCPU && eCPU.dispose();
							//$("#eButtons",$el).css({display: 'none'});
						}
						data = formatLineDataDif(data,eCPU);
					}
				});
				eCPU.start();
			}

			fneClients();
			// 负载
			function fneClients(){
				eClients = app.drawEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#eClients',
					eType	 : 'line',
					url		 : 'CommonMonitorAction_getMetricEcharts.do',
					unit	 : '%',
					urlParams: {
						interval : 1,
						time 	 : 60,
						'objectId' : objectId,
						'metricName' : 'es_node_performance.load_1m',
						'echarts_type': 1
					},
					beforefn:function (data) {
						if(data.content.result.line.alias.length == 0){
							eClients && eClients.dispose();
							//$("#eButtons",$el).css({display: 'none'});
						}
						data = formatLineDataDif(data,eClients);
					}
				});
				eClients.start();
			}
			fneCommands();
			//索引速率
			function fneCommands(){
				eCommands = app.drawEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#eCommands',
					eType	 : 'line',
					url		 : 'CommonMonitorAction_getMetricEcharts.do',
					unit	 : '个',
					urlParams: {
						interval : 1,
						time 	 : 60,
						'objectId' : objectId,
						'metricName' : 'es_indexinfo.index_total',
						'echarts_type': 1
					},
					beforefn:function (data) {
						if(data.content.result.line.alias.length == 0){
							eCommands && eCommands.dispose();
							//$("#eButtons",$el).css({display: 'none'});
						}
						data = formatLineDataDif(data,eCommands);
					}
				});
				eCommands.start();
			}
			fnEKeyHit();
			// 堆内存
			function fnEKeyHit(){
				eKeyHit = app.drawEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#eKeyHit',
					eType	 : 'line',
					url		 : 'CommonMonitorAction_getMetricEcharts.do',
					unit	 : '%',
					urlParams: {
						interval : 1,
						time 	 : 60,
						'objectId' : objectId,
						'metricName' : 'es_node_performance.heap_used',
						'echarts_type': 1
					},
					beforefn:function (data) {
						if(data.content.result.line.alias.length == 0){
							eKeyHit && eKeyHit.dispose();
							//$("#eButtons",$el).css({display: 'none'});
						}
						data = formatLineDataDif(data,eKeyHit);
					}
				});
				eKeyHit.start();
			}	

			fnEKeyCount();
			// 查询速率
			function fnEKeyCount(){
				eKeyCount = app.drawEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#eKeyCount',
					eType	 : 'line',
					url		 : 'CommonMonitorAction_getMetricEcharts.do',
					unit	 : '个',
					urlParams: {
						interval : 1,
						time 	 : 60,
						'objectId' : objectId,
						'metricName' : 'es_indexinfo.query_total',
						'echarts_type': 1
					},
					beforefn:function (data) {
						if(data.content.result.line.alias.length == 0){
							eKeyCount && eKeyCount.dispose();
							//$("#eButtons",$el).css({display: 'none'});
						}
						data = formatLineDataDif(data,eKeyCount);
					}
				});
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