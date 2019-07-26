define([ "jquery" ], function() {

	//echarts对象
	var  eConnection, eIORatio, eIOWait,eCreation,eClose,eventEchart;
	return {
		load : function($el, scope, handler) {
			var key = scope.key;
			//var ipadd = scope.ip;
			var objectId=600228||scope.objectId
			$('#ip', $el).text('-');
			$('#port', $el).text('-');
			$('#version', $el).text(scope.name);
			$('#type', $el).text(scope.type);
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
					url:'CommonMonitorAction_getMetricEchart.do',
					eType	: 'line',
				},
				urlParams = {
					objectId:objectId,
					interval : 1,
					time 	 : 60
				};
			/*组织折线图数据*/
			function formatLineData(data) {
				var echartsData = {};
				var tmpData = data.content.result.echartsData;
				var times = tmpData.times;
				var items =[];
				/*处理时间*/
				times.forEach(function (item,index) {
					var tmpDate = new Date(item);
					var hours = tmpDate.getHours() > 9 ?tmpDate.getHours():'0'+tmpDate.getHours();
					var minutes = tmpDate.getMinutes() > 9 ?tmpDate.getMinutes():'0'+tmpDate.getMinutes();
					times[index] = hours+":"+minutes;
				});
				for (var i = 0; i < tmpData.datas.length; i++) {
					echartsData['line'+(i+1)] = tmpData.datas[i];
				}
				echartsData.time = times;
				data.content.echartsData = echartsData;
				return data;
			}
			app.common.ajaxWithAfa({
				url  : "CommonMonitorAction_getKeyMetrics.do",
				data:{
					"objectId":objectId,
					'metricNames':['kafka."'+key+'"."connection-count"','kafka."'+key+'"."io-ratio"',
					               'kafka."'+key+'"."io-wait-ratio"','kafka."'+key+'"."network-io-rate"']
				}
			}).done(function (data) {
				if(!$.isEmptyObject(data.result)){
					$("#ccount",$el).text(data.result['kafka."'+key+'"."connection-count"'].value+"个");
					$("#io-ratio",$el).text(data.result['kafka."'+key+'"."io-ratio"'].value+"%");
					$("#io-wait-ratio",$el).text(data.result['kafka."'+key+'"."io-wait-ratio"'].value+"%");
					$('#network-io-rate', $el).text(data.result['kafka."'+key+'"."network-io-rate"'].value+"%");
				}
			});
		 	fnConnection();
			function fnConnection(){
				eConnection = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eConnection',
					unit	: '个',
					items:['连接数'],
					showCheckbox: true,
					urlParams: $.extend({}, urlParams, {
						metricNames:['kafka."'+key+'"."connection-count"']
					}),
					beforefn:function (data) {
						formatLineData(data);
					}
				}));
				eConnection.start();
			}
			fnIORatio()
			function fnIORatio(){
				eIORatio = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eIORatio',
					unit	: '%',
					items:['IO使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['kafka."'+key+'"."io-ratio"']
					}),
					beforefn:function (data) {
						formatLineData(data);
					}
				}));
				eIORatio.start();
			}
			fnIOWaitRatio()
			function fnIOWaitRatio(){
				eIOWait = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eIOWait',
					unit	: '%',
					items:['IO等待率'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['kafka."'+key+'"."io-wait-ratio"']
					}),
					beforefn:function (data) {
						formatLineData(data);
					}
				}));
				eIOWait.start();
			}
			
			fnCreation()//eCreation,eClose
			function fnCreation(){
				eCreation = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eCreation',
					unit	: '%',
					items:['连接创建率'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['kafka."'+key+'"."connection-creation-rate"']
					}),
					beforefn:function (data) {
						formatLineData(data);
					}
				}));
				eCreation.start();
			}
			fnClose()
			function fnClose(){
				eClose = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eClose',
					unit	: '%',
					items:['连接丢失率'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['kafka."'+key+'"."connection-close-rate"']
					}),
					beforefn:function (data) {
						formatLineData(data);
					}
				}));
				eClose.start();
			}
			//各类事件数模块点击跳转
			$('.kafkaDetails-event span', $el).on('click', function(e){
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
			var echarts = [eConnection, eIORatio, eIOWait,eCreation,eClose,eventEchart];
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