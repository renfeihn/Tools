define([ "jquery" ], function() {

	//echarts对象
	var ePort,	//端口
		eResponseTime,	//响应
		eResponseCount,	//响应
		eTrafficStatistics,		//流量统计
		eThread,		//线程池
		eSession,		//会话统计
		eJvm,//JVM
		eCpu,//cpu
		eGC,//GC
		eProcessResources;
	
	return {
		load : function($el, scope, handler) {
			
			var objectId = scope.objectId || 70123;
			//echarts公共配置
			var basicEcharts = {
				handler	: handler,
				context	: $el,
				eType	: 'line',
				xCount: 4,
				url		: 'CommonMonitorAction_getEachart.do',
			},
			urlParams = {
				interval : 1,
				time 	 : 60,
				objectId : objectId
			},
			pageTable = {
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength': 5,
			},
			nonePageTable = {
				"paging"	: false,
				'searching'	: false,
				'bSort'		: false,
			};
			
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

			// 表空间信息
			var $sessionInfo = $("#dataTable-sessionInfo", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'activeSessions', defaultContent : ''
				},{
					data : 'sessionCounter', defaultContent : ''
				},{
					data : 'maxActiveSessions', defaultContent : ''
				},{
					data : 'rejectedSessions', defaultContent : ''
				},{
					data : 'processingTime', defaultContent : ''
				},{
					data : 'expiredSessions', defaultContent : ''
				},{
					data : 'sessionMaxAliveTime', defaultContent : ''
				},{
					data : 'sessionAverageAliveTime', defaultContent : ''
				}]
			}));
			var $jspInfo = $("#dataTable-jspInfo", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'JSPS_UNLOADED', defaultContent : ''
				},{
					data : 'JSPS_RELOADED', defaultContent : ''
				}]
			}));
			var $urlInfo = $("#dataTable-urlInfo", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'urlName', defaultContent : ''
				},{
					data : 'processingTime', defaultContent : ''
				},{
					data : 'maxTime', defaultContent : ''
				},{
					data : 'requestCount', defaultContent : ''
				},{
					data : 'errorCount', defaultContent : ''
				},{
					data : 'loadTime', defaultContent : ''
				},{
					data : 'classLoadTime', defaultContent : ''
				}]
			}));
			//指标
			app.common.ajaxWithAfa({
				url  : "CommonMonitorAction_getMetricInfo2.do",
				data:{
					"objectId":objectId,
					'metricNames':['tomcat_appsessioninfo.actv_session','tomcat_requestinfo.request_count','tomcat_requestinfo.proce_time','tomcat_threadinfo.busy_threadcount','tomcat_threadinfo.cur_threadcount']
				}
			}).done(function (data) {
				if(!$.isEmptyObject(data.result)){
					var actv_session = data.result['tomcat_appsessioninfo.actv_session'].value;
					var req_count = data.result['tomcat_requestinfo.request_count'].value;
					var res_time = data.result['tomcat_requestinfo.proce_time'].value;
					var busy_threadcount = data.result['tomcat_threadinfo.busy_threadcount'].value;
					var threadcount = data.result['tomcat_threadinfo.cur_threadcount'].value;
					var threadUsePrc;
					if (busy_threadcount && threadcount) {
						threadUsePrc = ((busy_threadcount/threadcount)*100).toFixed(2);
					}else{
						threadUsePrc = 0;
					}
					showItems('tomcatDetails-appSummary',[actv_session+'个',req_count+'个',res_time+'S',threadUsePrc+'%']);
				}
			});
			function showItems(id,data) {
				var ele = $('#'+id,$el).children();
				for (var i = 0; i < ele.length; i++) {					
					if(String(data[i]).indexOf('undefined') > -1) {
						ele[i].innerHTML = '-';
					} else {
						ele[i].innerHTML = data[i];
					}
				}
			}

			//echarts图
			/*组织折线图数据*/
			function formatLineData(eObj,data) {
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
			// 端口
			function fnEPort(){
				ePort = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#echart-port',
					unit	: '个',
					items	: ['ESTABLISHED','CLOSE_WAIT','TIME_WAIT'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['tomcat_portinfo.established','tomcat_portinfo.close_wait','tomcat_portinfo.time_wait','tomcat_portinfo.listen']
					}),
					beforefn:function (data) {
						data = formatLineData(ePort,data);
					},
					succfn: function(data){
						var currData = data.content.currData;
						showItems('tomcatDetails-portSpan',[currData.line4?'正常':'异常',currData.line1+'个',currData.line2+'个',currData.line3+'个']);
					}
				}));
				ePort.start();
			}
			// 进程资源
			function fnEProcessResources(){
				eProcessResources = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#echart-processResources',
					unit	: '%',
					items	: ['进程占用CPU使用率','进程占用内存使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['tomcat_proc.num','tomcat_proc.pcpu','tomcat_proc.pmem']
					}),
					beforefn:function (data) {
						data = formatLineData(eProcessResources,data);
						var tmpData = data.content.echartsData;
						var line3 = tmpData.line1;
						tmpData.line1 = tmpData.line2;
						tmpData.line2 = tmpData.line3;
						tmpData.line3 = line3;
						data.content.echartsData = tmpData;
						data.content.currData ={'line1':tmpData.line1[tmpData.line1.length -1],
												'line2':tmpData.line2[tmpData.line2.length -1],
												'line3':tmpData.line3[tmpData.line3.length -1]}
					},
					succfn: function(data){
						var currData = data.content.currData;
						showItems('tomcatDetails-processResources',[currData.line3+'个',currData.line1.toFixed(2)+'%',currData.line2.toFixed(2)+'%']);
					}
				}));
				eProcessResources.start();
			}
			// jvm
			function fnEJvm(){
				eJvm = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#echart-jvm',
					unit	: 'MB',
					items	: ['已使用JVM内存','JVM总内存'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['tomcat_jvminfo.jvm_memoryused','tomcat_jvminfo.jvm_memorytotal']
					}),
					beforefn:function (data) {
						data = formatLineData(eJvm,data);
					},
					succfn: function(data){
						var currData = data.content.currData;
						var runtime;
						app.common.ajaxWithAfa({
							url  : "CommonMonitorAction_getMetricInfo.do",
							data:{
								"objectId":objectId,
								'metricName':'tomcat_jvminfo.runtime'
								}
						}).done(function (data) {
							if(!$.isEmptyObject(data.result)){
								runtime = data.result['tomcat_jvminfo.runtime'].value.split('.')[0];
								showItems('tomcatDetails-JVM',[runtime,currData.line2+'MB',currData.line1+'MB']);
							}
						});
					}
				}));
				eJvm.start();
			}
			// cpu
			function fnECpu(){
				eCpu = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#echart-cpu',
					unit	: '%',
					items	: ['CPU使用情况'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['tomcat_jvminfo.cpurate']
					}),
					beforefn:function (data) {
						data = formatLineData(eCpu,data);
					}
				}));
				eCpu.start();
			}
			// GC
			function fnEGC(){
				eCpu = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#echart-GC',
					unit	: 'ms',
					items	: ['GC时间','GC耗时'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['tomcat_jvminfo.gc_time','tomcat_jvminfo.gc_count']
					}),
					beforefn:function (data) {
						data = formatLineData(eCpu,data);
					}
				}));
				eCpu.start();
			}
			// 请求响应
			function fnEResponseTime(){
				eResponseTime = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#echart-response-time',
					unit	: ' ',
					items	: ['Max processing time','Processing time'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['tomcat_requestinfo.max_proce_time',
												'tomcat_requestinfo.proce_time',
												]
					}),
					beforefn:function (data) {
						data = formatLineData(eResponseTime,data);
					},
					succfn: function(data){
						var currData = data.content.currData;
						showItems('tomcatDetails-responseSpan-time',[currData.line1+'S',currData.line2+'S']);
					}
				}));
				eResponseTime.start();
			}
			// 请求响应
			function fnEResponseCount(){
				eResponseCount = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#echart-response-count',
					unit	: ' ',
					items	: ['Request count','Error count'],
					urlParams: $.extend({}, urlParams, {
						metricNames:[
									'tomcat_requestinfo.request_count',
									'tomcat_requestinfo.error_count'
									]
					}),
					beforefn:function (data) {
						data = formatLineData(eResponseCount,data);
					},
					succfn: function(data){
						var currData = data.content.currData;
						showItems('tomcatDetails-responseSpan-count',[currData.line1+'个',currData.line2+'个']);
					}
				}));
				eResponseCount.start();
			}
			// 流量统计
			function fnETrafficStatistics(){
				eTrafficStatistics = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#echart-trafficStatistics',
					unit	: 'MB',
					items	: ['发送字节数','接受字节数'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['tomcat_requestinfo.bytes_send','tomcat_requestinfo.bytes_received']
					}),
					beforefn:function (data) {
						data = formatLineData(eTrafficStatistics,data);
					},
					succfn: function(data){
						var currData = data.content.currData;
						showItems('tomcatDetails-trafficStatistics',[currData.line1+'MB',currData.line2+'MB']);
					}
				}));
				eTrafficStatistics.start();
			}
			// 线程池
			function fnEThread(){
				eThread = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#echart-thread',
					unit	: '个',
					items	: ['活动线程数','当前线程数'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['tomcat_threadinfo.busy_threadcount',
													'tomcat_threadinfo.cur_threadcount',
													'tomcat_threadinfo_max_thread'
												]
					}),
					beforefn:function (data) {
						data = formatLineData(eThread,data);
					},
					succfn: function(data){
						var currData = data.content.currData;
						showItems('tomcatDetails-threadSpan',[currData.line2+'个',currData.line1+'个',currData.line3+'个']);
					}
				}));
				eThread.start();
			}
			// 会话统计
			function fnESession(){
				eSession = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#echart-session',
					unit	: '个',
					items	: ['活动会话数','会话数'],
					urlParams: $.extend({}, urlParams, {
						metricNames:['tomcat_appsessioninfo.actv_session',
													'tomcat_appsessioninfo.session_count','tomcat_appsessioninfo.max_actv_session']
					}),
					beforefn:function (data) {
						data = formatLineData(eSession,data);
					},
					succfn: function(data){
						var currData = data.content.currData;
						showItems('tomcatDetails-sessionSpan',[currData.line1+'个',currData.line2+'个',currData.line3+'个']);
					}
				}));
				eSession.start();
			}
			// 获取应用列表
			app.common.ajaxWithAfa({
				url:'TomcatMonitorAction_getAppTable.do',
				data:{
					objId: objectId
				}
			}).done(function (data) {
				data = data.result;
				var appListStr = '';
				data.forEach(function (item,index) {
					appListStr += '<li appName="'+item+'"><a href="#'+item+'" data-toggle="tab">'+item+'</a></li>'
				})
				$('#tomcatDetails-appList').html(appListStr);
				$("#tomcatDetails-appList li:first",$el).trigger('click').addClass('active');
			});
			
			// datatable
			function fnTSessionInfo(appName){
				app.common.ajaxWithAfa({
					url  : "TomcatMonitorAction_getJspSessionUriList.do",
					data : {
						objId : objectId,
						appname: appName
					}
				}).done(function(data){
					addData(data.result.session, $sessionInfo);
					addData(data.result.jsp, $jspInfo);
					addData(data.result.url, $urlInfo);
				});
				
				bindToPageEvent("ToPage-sessionInfo");
				bindToPageEvent("ToPage-jspInfo");
				bindToPageEvent("ToPage-urlInfo");
			}

			function addData(data, $table){
				$table.clear().draw();
				if(data && data.length > 0){
					data.forEach(function(item, index){
						item.index = ++index;
					});
					$table.rows.add(data).draw();
				}
			}
			function bindToPageEvent(id) {
				$("#"+id,$el).on("keydown",function(e){
					var e = e || window.event;
					var keycode = e.keycode || e.which;
					var leaf = parseInt($(this).val());
					if(keycode === 13){
						$dataTable.api().page(leaf-1).draw("page");
					}
				})
			}

			// 应用列表
			$("#tomcatDetails-appList",$el).delegate('li', 'click', function(event) {
				if (this.className == 'active') {
					return;
				}
				fnTSessionInfo($(this).attr('appName'));
			});

			//数据加载------------------------------------开始-------------------------------------
			//图
			fnEPort();
			fnEProcessResources();
			fnEResponseTime();
			fnEResponseCount();
			fnETrafficStatistics();
			fnEThread();
			fnESession();
			fnEJvm();
			fnECpu();
			fnEGC();
			//数据加载------------------------------------结束-------------------------------------
			// 显示更多信息
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
			var echartsArr = [
			  ePort,eResponseTime,eResponseCount,eTrafficStatistics,eThread,eSession,eJvm,eCpu,eProcessResources,eGC
			];
			echartsArr.forEach(function(item){
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