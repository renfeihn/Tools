define([ "jquery" ], function() {

	//echarts对象
	var messageInRateEchart,BytesEchart,eventEchart;
	return {
		load : function($el, scope, handler) {
			
			var objectId = 0||scope.objectId;
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
				},
				urlParams = {
					objectId : objectId,
					interval : 1,
					time 	 : 60
				}
			/*组织折线图数据*/
			function formatLineData(times) {
				/*处理时间*/
				times.forEach(function (item,index) {
					var tmpDate = new Date(item);
					var hours = tmpDate.getHours() > 9 ?tmpDate.getHours():'0'+tmpDate.getHours();
					var minutes = tmpDate.getMinutes() > 9 ?tmpDate.getMinutes():'0'+tmpDate.getMinutes();
					times[index] = hours+":"+minutes;
				});
				return times;
			}
			//获取指标
			app.common.ajaxWithAfa({
				url  : "KafkaMonitorAction_getKPIDetail.do",
				data:{
					"objId":'0',
				}
			}).done(function (data) {
				if(!$.isEmptyObject(data.result)){
					$("#nodecount",$el).text(data.result.nodeCount);
					$("#consumernum",$el).text(data.result.consumerCount);
					$("#producernum",$el).text(data.result.producerCount);
					$("#topicnum",$el).text(data.result.topicCount);
					$("#controllernum",$el).text(data.result.controllerCount);
				}
			});
			fnGetEcharts();
			//查询速度
			function fnGetEcharts(){
				var datas={};
				app.common.ajaxWithAfa({
					async:false,
					url  : "KafkaMonitorAction_getMessageEcharts.do",
					data:{
						"objId":0,
						time: 60,
						interval: 1
					}
				}).done(function (data) {
					if(!$.isEmptyObject(data.result)){
						datas = data.result
					}
				});
				var times = formatLineData(datas.time);
				var mData = {}, bData = {};
				mData.line1 = datas.line1;
				mData.time = times;
				bData.line1 = datas.line2;
				bData.line2 = datas.line3;
				bData.time = times;
				// message
				messageInRateEchart = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#messageInRate',
					unit	: '/s',
					items:['消息流入'],
					showCheckbox: true,
					urlParams:urlParams,
					echartsData:mData,
				}));
				messageInRateEchart.start();
				// byte
				BytesEchart = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#BytesRate',
					unit	: '/s',
					items:['字节流入','字节流出'],
					showCheckbox: true,
					urlParams:urlParams,
					echartsData:bData,
				}));
				BytesEchart.start();
			}
			
			
			//各类事件数模块点击跳转
			$('.kafkaClusterDetails-event span', $el).on('click', function(e){
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
			var echarts = [messageInRateEchart,BytesEchart, eventEchart];
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