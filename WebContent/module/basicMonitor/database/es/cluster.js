define([ "jquery" ], function() {
	var globalEcharts = {};
	var refreshClock;
	
	return {
		load : function($el, scope, handler,options) {

			//fake	
			new HealthCon({
				id:"health",
				stopPoint: 100,
				context:$el
			});
			let dataTable = $('#dataTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching': true,
				'bSort': false,
				'pageLength': 10,
				'columns': [{
					data: 'name',defaultContent: ''
				},{
					data: 'status',defaultContent: ''
				},{
					data: 'nodeNum',defaultContent: ''
				},{
					data: 'dataNode',defaultContent: ''
				},{
					data: 'activeP',defaultContent: ''
				},{
					data: 'activeZP',defaultContent: ''
				},{
					data: 'unP',defaultContent: ''
				},{
					data: 'activePP',defaultContent: ''
				},{
					data: 'task',defaultContent: ''
				},{
					data: 'file',defaultContent: ''
				},{
					data: 'mem',defaultContent: ''
				},{
					data: 'rate',defaultContent: ''
				}]
			});
			let fakeData = [{"name": "79_es_cluster","status":"正常","nodeNum":'3',"dataNode":"3","activeP":"20","activeZP":"32%","unP":"0","activePP":"43%","task":"0","file":"51232","mem":"0.00","rate":"314"}];
			dataTable.rows.add(fakeData).draw();

			let queryEcharts = app.echarts4.init($('#searchRateChart',$el)[0]);
			let indexEcharts = app.echarts4.init($('#indexRateChart',$el)[0]);
			let xData = new Array(25).fill('').map((item,index) => {
				let time = new Date().getTime() - (5 * 60 * 1000 * (index + 1));
				return new Date(time).Format('hh:mm');
			}).reverse();
			let series1 = [{
				name: '查询速度',
				type: 'line',
				data: [425,461,437,446,480,412,476,455,433,421,457,433,419,418,436,444,490,515,518,539,469,479,459,532,541]
			}];
			let series2 = [{
				name: '索引速度',
				type: 'line',
				data: [625,661,637,666,680,612,676,655,633,621,657,633,619,618,636,666,690,515,518,539,669,679,659,532,561]
			}];
			drawBaseEcharts(queryEcharts,'个',[{name:'查询速度'}],xData,series1);
			drawBaseEcharts(indexEcharts,'个',[{name:'索引速度'}],xData,series2);

			function drawBaseEcharts($echarts,unit,legend,xData,series) {
				let option = {
						color: ['#5b62f9', '#fb8229', '#fa594d', '#0bbf46', '#3e7ad6'],//#55a8fd
						legend: {
							show: true,
							right: 0,
							type: 'scroll',
							data: legend
						},
						title: {
							text: '单位: '+unit,
							textStyle: {
								fontweight: 'normal',
								fontSize: '12px'
							}
						},
						tooltip: {
							show: true,
							trigger: 'axis'
						},
					    xAxis: {
					        type: 'category',	
					        boundaryGap: false,
					        axisLabel: {
					        	color: '#5c5a66'
					        },
					        axisLine: {
					        	lineStyle: {
					        		color: '#5c5a66',
					        		width: 2
					        	}
					        },
					        data: xData
					    },
					    yAxis: {
					        type: 'value',
					        splitLine: {
					        	show: true,
					        	lineStyle: {
					        		color: '#ccc',
					        		type: 'solid'
					        	}
					        },
					        axisLine: {
					        	show: false,
					        },
					        axisTick: {
					        	show: false
					        },
					        axisLabel: {
					        	color: '#5c5a66'
					        },
					    },
					    grid: {
					    	top:30,
					    	right: 0,
					    	bottom: 0,
					    	left: 0,
					    	containLabel: true
					    },
					    series: series
					};
				$echarts.group = 'group1';
				$echarts.setOption(option);
			}
			return;

			var midData = scope.midData;
		    $('[data-role="version"]', $el).text(midData.Version);
//			实例状态统计统计
			healty_valueFn();
			refreshClock = handler.setInterval(healty_valueFn,2000*60,true);
			function healty_valueFn(){
				$("[data-role=esclusterHealthNum]",$el).text(midData.healty_value);
				//状态度展示
				if(midData.healty_value<=30){
					$('[data-role="finehealthimg"]',$el).css({"background-image":"url('img/health/healty-orange.png')"});
					$('#esclusterPieActive1',$el).attr("class","bar1");
	            	$('#esclusterPieActive',$el).attr("class","finebar30");
				}
				if(midData.healty_value>30 && midData.healty_value<=80){
					$('[data-role="finehealthimg"]',$el).css({"background-image":"url('img/health/healty-blue.png')"});
					$('#esclusterPieActive1',$el).attr("class","bar2");
	            	$('#esclusterPieActive',$el).attr("class","bar60");
				}
				if(midData.healty_value>80 && midData.healty_value<=100){
					$('[data-role="finehealthimg"]',$el).css({"background-image":"url('img/health/healty-green.png')"});
					$('#esclusterPieActive1',$el).attr("class","bar3");
	            	$('#esclusterPieActive',$el).attr("class","bar80");				
				}
			}
			
			//中间件基本信息	
			//loadBaseInfo();			
			function loadBaseInfo(){
				app.common.ajaxWithAfa({
					//async:false,
						data : {
							'appType' : 'VISUAL',
							'target' : 'SingleTableCRUD',
							'args':JSON.stringify({
							OperType:'select',
							Table_Name:'aim_cmdb_cluster',
							Key_Name:["App_Name", "Monitor_Flag"], 
							Where_Condition:['Cluster_ID',"=",String(midData.Cluster_ID)]
						})
							}	
				}).done(function(data){
					if(data != null){
						var info = data.info.private_rsp;
						var appName = info.app_name['0'];//应用名
						midData.appName = appName;
						var monitorStatus = info.monitor_flag['0'] + '';//监控状态
						$("[data-role=app_name]",$el).text(appName);
						if(monitorStatus=='0'){
							monitorStatus = '未监控';
    					}else if(monitorStatus=='1'){
    						monitorStatus = '活动';
    					}else if(monitorStatus=='2'){
    						monitorStatus = '停止';
    					}
						$("[data-role=monitor_status]",$el).text(monitorStatus || "未知").removeClass().addClass('base-bggreen escluster-info-status');
					}
				});
			}
			
			//中间件报警
			//MiddleWarm();
			function MiddleWarm(){
				/*为页面设值*/
				$('[data-role=totalNum]',$el).text(midData.nohandle_num);
				$('[data-role=dayHand]',$el).text(midData.day_handle_num);
				$('[data-role=warnNoHand]',$el).text(midData.warn_nohandle_num);
				$("[data-role=warnHand]",$el).text(midData.warn_handle_num);
				$("[data-role=preHand]",$el).text(midData.pre_handle_num);
				$("[data-role=preNoHand]",$el).text(midData.pre_nohandle_num);
				//当天日期
				var startdate = new Date().Format('yyyyMMdd') +'000000';
				//未解决
				if(midData.nohandle_num>0){
					$('.escluster-info-warning-unsolve-total',$el).css(({"cursor":"pointer"}));
					$('.escluster-info-warning-unsolve-total',$el).click(function(){
						var exportEventData = {'event_status':['0','1'],'notequ_field_list':["event_type"],"event_type":"0",'device_id':midData.serverId,'obj_id':midData.objId,"app_id":midData.appId,'obj_type':'27'};
						app.domain.exports("kpEvent",{'exportEventData':exportEventData});
						app.dispatcher.load.apply(app.dispatcher,
									[ "应用-中间件未解决理事件" ].concat([ 'event']));
			    	 });
				}
				//已解决
				if(midData.day_handle_num>0){
					$('.escluster-info-warning-solve-total',$el).css(({"cursor":"pointer"}));
					$('.escluster-info-warning-solve-total',$el).click(function(){
						var exportEventData = {'event_status':['2','3'],'startdate':startdate,'notequ_field_list':["event_type"],"event_type":"0",'device_id':midData.serverId,'obj_id':midData.objId,"app_id":midData.appId,'obj_type':'27'};
						app.domain.exports("kpEvent",{'exportEventData':exportEventData,'number':midData.day_handle_num});
						app.dispatcher.load.apply(app.dispatcher,
									[ "应用-中间件已解决理事件" ].concat([ 'event']));
			    	 });
				}
				//告警未解决
				if(midData.warn_nohandle_num>0){
					$('#escluster-click-warnon',$el).css(({"cursor":"pointer"}));
					$('#escluster-click-warnon',$el).click(function(){
						var exportEventData = {'event_status':['0','1'],"event_type":"2",'device_id':midData.serverId,'obj_id':midData.objId,"app_id":midData.appId,'obj_type':'27'};
						app.domain.exports("kpEvent",{'exportEventData':exportEventData});
						app.dispatcher.load.apply(app.dispatcher,
									[ "应用-中间件告警未解决事件" ].concat([ 'event']));
			    	 });
				}
				//预警未解决
				if(midData.pre_nohandle_num>0){
					$('.escluster-info-warning-unsolve-warning',$el).css(({"cursor":"pointer"}));
					$('.escluster-info-warning-unsolve-warning',$el).click(function(){
						var exportEventData = {'event_status':['0','1'],"event_type":"1",'device_id':midData.serverId,'obj_id':midData.objId,"app_id":midData.appId,'obj_type':'27'};
						app.domain.exports("kpEvent",{'exportEventData':exportEventData});
						app.dispatcher.load.apply(app.dispatcher,
									[ "应用-中间件预警未解决理事件" ].concat([ 'event']));
			    	 });
				}
				//告警当天已解决
				if(midData.warn_handle_num>0){
					$('#escluster-click-warnhandle',$el).css(({"cursor":"pointer"}));
					$('#escluster-click-warnhandle',$el).click(function(){
						var exportEventData = {'event_status':['2','3'],'startdate':startdate,"event_type":"2",'device_id':midData.serverId,'obj_id':midData.objId,"app_id":midData.appId,'obj_type':'27'};
						app.domain.exports("kpEvent",{'exportEventData':exportEventData});
						app.dispatcher.load.apply(app.dispatcher,
									[ "应用-中间件告警当天已解决理事件" ].concat([ 'event']));
			    	 });
				}
				//预警当天已解决
				if(midData.pre_handle_num>0){
					$('.escluster-info-warning-solve-warning',$el).css(({"cursor":"pointer"}));
					$('.escluster-info-warning-solve-warning',$el).click(function(){
						var exportEventData = {'event_status':['2','3'],'startdate':startdate,"event_type":"1",'device_id':midData.serverId,'obj_id':midData.objId,"app_id":midData.appId,'obj_type':'27'};
						app.domain.exports("kpEvent",{'exportEventData':exportEventData});
						app.dispatcher.load.apply(app.dispatcher,
									[ "应用-中间件预警当天已解决理事件" ].concat([ 'event']));
			    	 });
				}
			}
			
			var tableKeys = ["CLUSTER_NAME","CLUSTER_STATUS","NUMBER_OF_NODES",
			   	          'NUMBER_OF_DATA_NODES','ACTIVE_SHARDS', 'ACTIVE_PRIMARY_SHARDS',
				          'UNASSIGNED_SHARDS', 'ACTIVE_SHARDS_PERCENT_AS_NUMBER', 'NUMBER_OF_PENDING_TASKS',
				          'DOCS_COUNT', 'STORE_COUNT', 'SEARCHRATE'];
			app.common.ajaxWithAfa({
				url: 'AFARequestAction_callAfaAppGf.do',
				data:{
					"appType": "VISUAL",
                	"target": "QryEsClusterInfo",
                	"args": JSON.stringify({
                		"cluster_id": String(midData.Cluster_ID)
                	})
				}	
			}).done(function(data){
				//绘制表格
				var rawData = data.result.private_rsp;
				var tr = $('<tr>');
				for (var i = 0; i < tableKeys.length; ++i){
					tr.append('<td>' + rawData[tableKeys[i]] + '</td>');
				}
				$('#dataTable tbody', $el).html(tr);
				//关键KPI统计
				$('[data-role="segments_count"]', $el).text(rawData['SHARDS_TOTAL']);
				$('[data-role="indices_count"]', $el).text(rawData['INDICES_COUNT']);
				$('[data-role="docs_count"]', $el).text(rawData['DOCS_COUNT']);
				$('[data-role="store_count"]', $el).text(rawData['STORE_COUNT'] + 'M');
				
				//集群基本信息
				$('[data-role="cluster_name"]', $el).text(rawData['CLUSTER_NAME']);
				$('[data-role="server_name"]', $el).text(rawData['SERVER_NAME']);
				if(/^[a-zA-Z]+$/.test(rawData['CLUSTER_STATUS'])){
					$('[data-role="esclusterStatus"]', $el).css('background', rawData['CLUSTER_STATUS']);
				}
				else{
					$('[data-role="esclusterStatus"]', $el).text(rawData['CLUSTER_STATUS']);
				}
			});
			
			//图表
			//ESEcharts();
			function ESEcharts(){
//				消息流入速率
				var esSearchRateCharts = new app.showData.chartsCollection({
					$context: $el, //作用域
					handler: handler, //spa应用的handler
					selector: "#searchRateChart",//图表外部容器
					url:"./BaseAction_setBaseData.do",//请求连接
					urlParams:{
//						"app_id": appId,
						"obj_id": midData.Cluster_ID,//"73847315"
						"queryFlag" : "1",//查询的接口序号，实时为1（默认），历史为2，统计为3
						"count_type" : "now",
						"radiodisplay" : "now|day",//now、day、week、month可以多个传入，中间用|分隔，用于控制日周月实时切换按钮显示
						"kpi_def_id": "139239",
//						"partion_id":"13",
//						"server_id": [serverId],
						"showType": "line",
						"state": "02",
						"showId": "0625bd44-999d-49db-8676-075492aa53d4",//与后台交互数据
					},
					eventmod:'es',
				});
				var esIndexRateCharts = new app.showData.chartsCollection({
					$context: $el, //作用域
					handler: handler, //spa应用的handler
					selector: "#indexRateChart",//图表外部容器
					url:"./BaseAction_setBaseData.do",//请求连接
					urlParams:{
//						"app_id": appId,
						"obj_id": midData.Cluster_ID,//"73847315"
						"queryFlag" : "1",//查询的接口序号，实时为1（默认），历史为2，统计为3
						"count_type" : "now",
						"radiodisplay" : "now|day",//now、day、week、month可以多个传入，中间用|分隔，用于控制日周月实时切换按钮显示
						"kpi_def_id": "139239",
//						"partion_id":"13",
//						"server_id": [serverId],
						"showType": "line",
						"state": "02",
						"showId": "f7846b70-9bbd-4d88-b896-8e046aede7c0",//与后台交互数据
					},
					eventmod:'es',
				});
				esSearchRateCharts.start();//对象启动方法
				esIndexRateCharts.start();
				
			}

			



		},
		unload : function(handler) {
			
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});