define([ "jquery" ], function() {

	//echarts对象
	var searchRateEchart,indexRateEchart,eventEchart;
	return {
		load : function($el, scope, handler) {
			
			var objectId = 600226||scope.objectId;
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
			/*组织折线图数据*/
			function formatLineData(data) {
				var echartsData = {};
				var tmpData = data.content.result.echartsData;
				var times = tmpData.times;
				echartsData.line1 = [];
				/*处理时间*/
				times.forEach(function (item,index) {
					var tmpDate = new Date(item);
					var hours = tmpDate.getHours() > 9 ?tmpDate.getHours():'0'+tmpDate.getHours();
					var minutes = tmpDate.getMinutes() > 9 ?tmpDate.getMinutes():'0'+tmpDate.getMinutes();
					times[index] = hours+":"+minutes;
				});
				for (var i = 0; i < tmpData.datas[0].length; i++) {
					echartsData.line1.push((tmpData.datas[0][i]/tmpData.datas[1][i]).toFixed(2));
				}
				echartsData.time = times;
				data.content.echartsData = echartsData;
				return data;
			}
			//获取指标
			app.common.ajaxWithAfa({
				url  : "CommonMonitorAction_getKeyMetrics.do",
				data:{
					"objectId":'100015',
					'metricNames':['es.cluster.stats."_nodes"."total"','es.cluster.stats."_nodes"."failed"',
					               'es.cluster.stats."indices"."shards"."total"','es.cluster.stats."indices"."count"',
					               'es.cluster.stats."indices"."docs"."count"','es.cluster.stats."indices"."store"."size_in_bytes"']
				}
			}).done(function (data) {
				if(!$.isEmptyObject(data.result)){
					$("#nodecount",$el).text(data.result['es.cluster.stats."_nodes"."total"'].value||'-');
					$("#activenode",$el).text(data.result['es.cluster.stats."_nodes"."failed"'].value||'-');
					$("#shardnum",$el).text(data.result['es.cluster.stats."indices"."shards"."total"'].value||'-');
					$("#indexnum",$el).text(data.result['es.cluster.stats."indices"."count"'].value||'-');
					$("#docnum",$el).text(data.result['es.cluster.stats."indices"."docs"."count"'].value||'-');
					var d = data.result['es.cluster.stats."indices"."store"."size_in_bytes"'].value/1024/1024
					$("#memsize",$el).text(d.toFixed(2));
				}
			});
			fnSearchRate();
			//查询速度
			function fnSearchRate(){
				searchRateEchart = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#searchRate',
					unit	: '/ms',
					items:['查询速度'],
					showCheckbox: true,
					urlParams: $.extend({}, urlParams, {
						metricNames : ['es.indices."_all"."total"."search"."query_total"','es.indices."_all"."total"."search"."query_time_in_millis"']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					}
				}));
				
				searchRateEchart.start();
			}
			fnindexRateEchart()
			// 索引速度
			function fnindexRateEchart(){
				indexRateEchart = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#indexRate',
					unit	: '%',
					items:['索引速度'],
					showCheckbox: true,
					urlParams: $.extend({}, urlParams, {
						metricNames : ['es.indices."_all"."total"."indexing"."index_total"','es.indices."_all"."total"."indexing"."index_time_in_millis"']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					}
				}));
				indexRateEchart.start();
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
			var echarts = [searchRateEchart,indexRateEchart, eventEchart];
			echarts.forEach(function (item) {
				item && item.dispose();
			});
		},
		pause : function($el, attr, handler) {

		},
		resume : function($el, attr, handler) {
			
		}
	};
});