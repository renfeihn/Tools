define([ "jquery" ], function() {

	//echarts对象
	var  eCpu, eMemory, eJVM,eThread,eQueue,eRejected,eLoad,eSegment,eventEchart;
	return {
		load : function($el, scope, handler) {
			var key = scope.key;
			var ipadd = scope.ip;
			var objectId=scope.objectId||0
			$('#ip', $el).text(ipadd.split(":")[0]);
			$('#port', $el).text(ipadd.split(":")[1]);
			$('#version', $el).text(scope.version).attr("data-title",scope.name);
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
					eType	: 'line',
				},
				urlParams = {
					interval : 1,
					time 	 : 60
				};
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
			app.common.ajaxWithAfa({
				url  : "ESMonitorAction_getNodeMetric.do",
				data:{
					"objId":objectId,
					'node_key':scope.key
				}
			}).done(function (data) {
				if(!$.isEmptyObject(data.result)){
					$("#cpuuse",$el).text(data.result.cpuuse);
					$("#memuse",$el).text(data.result.memuse);
					$("#docs",$el).text(data.result.docs);
				}
			});
			fnCpuMem();
			fnJVM();
			function fnCpuMem(){
				var datas={};
				app.common.ajaxWithAfa({
					async:false,
					url  : "ESMonitorAction_getCpuMemEcharts.do",
					data:{
						"objId":objectId,
						'node_key':scope.key,
						time: 120,
						interval: 1
					}
				}).done(function (data) {
					if(!$.isEmptyObject(data.result)){
						datas = data.result
					}
				});
				var times = formatLineData(datas.time);
				var cpuData = {}, memData = {};
				cpuData.line1 = datas.line1;
				cpuData.time = times;
				memData.line1 = datas.line2;
				memData.time = times;
				// cpu使用率
				eCpu = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eCpu',
					unit	: '%',
					items:['cpu使用率'],
					showCheckbox: true,
					urlParams:urlParams,
					echartsData:cpuData,
				}));
				eCpu.start();
				// 内存使用率
				eMemory = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eMemory',
					unit	: '%',
					items:['内存使用率'],
					showCheckbox: true,
					urlParams:urlParams,
					echartsData:memData,
				}));
				eMemory.start();
			}
			function fnJVM(){
				var datas={};
				eJVM = app.showEcharts($.extend({}, basicEcharts, {
					url:'ESMonitorAction_getJVMEcharts.do',
					selector: '#eJVM',
					unit	: 'MB',
					items:['JVM堆使用大小'],
					showCheckbox: true,
					urlParams: $.extend({}, urlParams, {
						objId:objectId,
						node_key:scope.key
					}),
					beforefn:function (data) {
						//eCpu.changeItems(data.content.result.echartsData.alias);
						var datas = {};
						var result = data.content.result;
						datas.line1 = result.line1;
						datas.time = formatLineData(result.time);
						data.content.echartsData = datas;
					},succfn: function(data){
						if(data.content.result){
							$("#jvmpercent",$el).text(data.content.result.usepercent + '%');
							$("#currentuse",$el).text(data.content.echartsData.line1[data.content.echartsData.line1.length-1] + 'MB' );
							$("#maxuse",$el).text(data.content.result.maxuse + 'MB');
						}	
					},
				}));
				eJVM.start();
			}
			fnThread();
			fnLoadSeg();
			function fnThread(){
				var datas={};
				app.common.ajaxWithAfa({
					async:false,
					url  : "ESMonitorAction_getThreadEcharts.do",
					data:{
						"objId":objectId,
						'node_key':scope.key,
						time: 120,
						interval: 1
					}
				}).done(function (data) {
					if(!$.isEmptyObject(data.result)){
						datas = data.result
					}
				});
				var times = formatLineData(datas.queue.time);
				var threadData = {}, queueData = {},rejectedData = {};
				threadData = datas.threads
				threadData.time = times;
				queueData = datas.queue
				queueData.time = times;
				rejectedData = datas.rejected
				rejectedData.time = times;
				eThread = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eThread',
					unit	: '个',
					items:['bulk','index','flush','search'],
					showCheckbox: true,
					urlParams:urlParams,
					echartsData:threadData,
				}));
				eThread.start();
				
				eQueue = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eQueue',
					unit	: '个',
					items:['bulk','index','flush','search'],
					showCheckbox: true,
					urlParams:urlParams,
					echartsData:queueData,
				}));
				eQueue.start();
				
				eRejected = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eRejected',
					unit	: '个',
					items:['bulk','index','flush','search'],
					showCheckbox: true,
					urlParams:urlParams,
					echartsData:rejectedData,
				}));
				eRejected.start();
			}
			function fnLoadSeg(){
				var datas={};
				app.common.ajaxWithAfa({
					async:false,
					url  : "ESMonitorAction_getLoadEcharts.do",
					data:{
						"objId":objectId,
						'node_key':scope.key,
						time: 120,
						interval: 1
					}
				}).done(function (data) {
					if(!$.isEmptyObject(data.result)){
						datas = data.result
					}
				});
				var times = formatLineData(datas.time);
				var loadData = {}, segData = {};
				loadData.line1 = datas.line1;
				loadData.time = times;
				segData.line1 = datas.line2;
				segData.time = times;
				eLoad = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eLoad',
					unit	: '',
					items:['平均负载'],
					showCheckbox: true,
					urlParams:urlParams,
					echartsData:loadData,
				}));
				eLoad.start();
				eSegment = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eSegment',
					unit	: '个',
					items:['片段数'],
					showCheckbox: true,
					urlParams:urlParams,
					echartsData:segData,
				}));
				eSegment.start();
			}
			//各类事件数模块点击跳转
			$('.MQDetails-event span', $el).on('click', function(e){
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
			var echarts = [eCpu, eMemory, eJVM,eThread,eQueue,eRejected,eLoad,eSegment,eventEchart];
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