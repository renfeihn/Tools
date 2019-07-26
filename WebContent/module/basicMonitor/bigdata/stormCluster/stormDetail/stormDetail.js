define([ "jquery" ], function() {

	//echarts对象
	var searchRateEchart,indexRateEchart,eventEchart;
	return {
		load : function($el, scope, handler) {
			
			var objectId = 600232||scope.objectId;
			var cluster_name = scope.name;
			$('#clustername', $el).text(cluster_name);
			$('#status', $el).text(scope.status).attr('data-title',cluster_name);
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
			
			var $dataTable = $("#dataTable", $el).DataTable({
				'bStateSave': false,
				"bAutoWidth": false,//自动宽度
				"ordering": false,
				'searching' : false,
				"bPaginate":true,
				'columns' 	: [{
					data : 'name', defaultContent : ''
				},{
					data : 'owner', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'uptime', defaultContent : ''
				},{
					data : 'workersTotal', defaultContent : ''
				},{
					data : 'tasksTotal', defaultContent : ''
				},{
					data : 'executorsTotal', defaultContent : ''
				},{
					data : 'replicationCount', defaultContent : ''
				},{
					data : 'assignedMemOnHeap', defaultContent : ''
				}],
			});
			
			//获取指标
			app.common.ajaxWithAfa({
				url  : "CommonMonitorAction_getKeyMetrics.do",
				data:{
					"objectId":'600232',
					'metricNames':['storm.cluster."slotsUsed"','storm.cluster."slotsTotal"',
					               'storm.cluster."topologies"','storm.cluster."tasksTotal"','storm.cluster."supervisors"']
				}
			}).done(function (data) {
				if(!$.isEmptyObject(data.result)){
					$("#topologynum",$el).text(data.result['storm.cluster."topologies"'].value||'-');
					$("#supervisornum",$el).text(data.result['storm.cluster."supervisors"'].value||'-');
					$("#tasknum",$el).text(data.result['storm.cluster."tasksTotal"'].value||'-');
					var d = data.result['storm.cluster."slotsUsed"'].value/data.result['storm.cluster."slotsTotal"'].value*100
					$("#slotsuse",$el).text(d.toFixed(2));
				}
			});
			
			
			fninitTable();
			function fninitTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetrics.do",
					data:{
						"objectId":600232,
						'metricNames':['storm.topology."topologies"']
					}
				}).done(function(data){
					addData(data, $dataTable);
				});
			}
			
			$dataTable.on('click','tr>td:eq(0)',function(){
				var id = $dataTable.row($(this).parent()).data().id;
				app.dispatcher.load({
					title: "应用详情-"+$(this).text(),
					moduleId: 'basicMonitor',
					section: ['bigdata','stormCluster','stormAppDetail'],
					id:"",
					params:{
						id: id
					}
				});
				
			})
			/*组织表格数据*/
			function addData(data, $table){
				var result = JSON.parse(data.result['storm.topology."topologies"'].value);
				$table.clear();
				if(result && result.length > 0){
					$table.rows.add(result).draw();
				}
			}			
			
			//各类事件数模块点击跳转
			$('.esClusterDetails-event span', $el).on('click', function(e){
				var title, eType;
				var content = $(this).text();
				var	id = e.target.id;
				
				if(isNaN(content) || parseInt(content) == 0){
					return;
				}
				if(id == 'alarmWaring' || id == 'waringCount' || id == 'alarmCount'){
					if(id == 'alarmWaring'){
						title = "未解决";
					}else if(id == 'waringCount'){
						title = "预警";
						eType = "WARING";
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
		},
		pause : function($el, attr, handler) {

		},
		resume : function($el, attr, handler) {
			
		}
	};
});