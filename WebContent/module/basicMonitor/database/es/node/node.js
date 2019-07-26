define([ "jquery" ], function() {
	var globalEcharts = {};
	var refreshClock;
	
	return {
		load : function($el, scope, handler,options) {
			var objId = scope.objId, 	
			appId = scope.appId,
			serverId = scope.serverId,
			nodeInfo = scope.nodeInfo;
			
			//中间件信息
			$('[data-role="name"]', $el).text(nodeInfo.name);
			$('[data-role="appName"]', $el).text(scope.appName);
			$('[data-role="version"]', $el).text(nodeInfo.version);
			$('[data-role="nodeIp"]', $el).text(nodeInfo.ip + ':' + nodeInfo.port);
			
			//关键KPI
			$('[data-role="cpu"]', $el).text(nodeInfo.cpuuse + '%');
			$('[data-role="mem"]', $el).text(nodeInfo.memuse + '%');
			$('[data-role="docs"]', $el).text(nodeInfo.docs);
			$('[data-role="nodeType"]', $el).text(nodeInfo.role);
			
			//健康度 事件数 
			getHealth();
			function getHealth(){
				app.common.ajaxWithAfa({
					data:{
						'appType':'VISUAL',
						'target' : 'QryDBorMWHealthy',
						'args':JSON.stringify({
							'obj_id':String(objId),
							'qry_flag':'1',
							'server_id':serverId,
							'app_id':Number(appId)
						})						
					}						
				}).done(function(data){
					if(data != null){
						var info = data.info.private_rsp;
						jiqun_value = info.healty_value['0'];
						$("[data-role=esclusterHealthNum]",$el).text(jiqun_value);
						//实例健康信息展示
						if(jiqun_value<=30){
							$('[data-role="finehealthimg"]',$el).css({"background-image":"url('img/health/healty-orange.png')"});
							$('#esclusterPieActive1',$el).attr("class","bar1");
			            	$('#esclusterPieActive',$el).attr("class","finebar30");
						}
						if(jiqun_value>30 && jiqun_value<=80){
							$('[data-role="finehealthimg"]',$el).css({"background-image":"url('img/health/healty-blue.png')"});
							$('#esclusterPieActive1',$el).attr("class","bar2");
			            	$('#esclusterPieActive',$el).attr("class","bar60");
						}
						if(jiqun_value>80 && jiqun_value<=100){
							$('[data-role="finehealthimg"]',$el).css({"background-image":"url('img/health/healty-green.png')"});
							$('#esclusterPieActive1',$el).attr("class","bar3");
			            	$('#esclusterPieActive',$el).attr("class","bar80");
							
						}
						var nohandle_num = info.nohandle_num['0'];//未处理事件总数
						var warn_nohandle_num = info.warn_nohandle_num['0'];//告警未处理事件数
					    var warn_handle_num = info.warn_handle_num['0'];//告警已处理事件数
					    var pre_nohandle_num = info.pre_nohandle_num['0'];//预警未处理事件数
					    var pre_handle_num = info.pre_handle_num['0'];//预警已处理事件数
					    var day_handle_num = info.day_handle_num['0'];//当天已处理事件总数 
//						/*为页面设值*/
						$('[data-role=totalNum]',$el).text(nohandle_num);
						$('[data-role=dayHand]',$el).text(day_handle_num);
						$('[data-role=warnNoHand]',$el).text(warn_nohandle_num);
						$("[data-role=warnHand]",$el).text(warn_handle_num);
						$("[data-role=preHand]",$el).text(pre_handle_num);
						$("[data-role=preNoHand]",$el).text(pre_nohandle_num);
					    
					}
				})
			}
			
			//监控状态
			loadBaseInfo()
			function loadBaseInfo(){
				app.common.ajaxWithAfa({
					//async:false,
						data : {
							'appType' : 'VISUAL',
							'target' : 'SingleTableCRUD',
							'args':JSON.stringify({
							OperType:'select',
							Table_Name:'aim_cmdb_middleware',
							Key_Name:["Monitor_Flag",], 
							Where_Condition:['MW_ID',"=",String(nodeInfo.obj_id)]
						})
					}	
				}).done(function(data){
					if(data != null){
						var info = data.info.private_rsp;
						var monitorStatus = info.monitor_flag['0'];//监控状态
						var esStatus = '';//监控状态
						if(monitorStatus=='0'){
							esStatus = '未监控';
    					}else if(monitorStatus=='1'){
    						esStatus = '活动';
    					}else if(monitorStatus=='2'){
    						esStatus = '停止';
    					}
						$("[data-role=esclusterStatus]",$el).text(esStatus || "未知").removeClass().addClass('base-bggreen escluster-info-status');
					}
				});
			}
			var lastupdate = null;
			loadJVMInfo()
			function loadJVMInfo(){
				if(lastupdate != null && new Date().getTime() - lastupdate.getTime() < 60000){
					return;
				}
				lastupdate = new Date();
				app.common.ajaxWithAfa({
					//async:false,
						data : {
							'appType' : 'VISUAL',
							'target' : 'SingleTableCRUD',
							'args':JSON.stringify({
							OperType:'select',
							Table_Name:'aim_es_node_baseinfo_reports',
							Key_Name:["jvmuse", "maxuse", "jvmusesize"], 
							Where_Condition:['obj_id',"=",String(nodeInfo.obj_id)]
						})
					}	
				}).done(function(data){
					if(data != null){
						var info = data.info.private_rsp;
						$("#jvmUsage", $el).text(info.jvmuse[0]);
						$("#jvmMax", $el).text(info.maxuse[0]);
						$("#jvmCurrent", $el).text(info.jvmusesize[0]);
					}
				});
			}
			$('.jvm-box', $el).on('mouseenter', loadJVMInfo);
			
			$(".eventTab a", $el).click(function(e) {
				e.preventDefault();
				$(this).tab("show");
				$(this).parent().siblings().removeClass("underLine");
				$(this).parent().siblings().css("color", "#999");
				$(this).parent().addClass("underLine");
				$(this).parent().css("color", "#666");
			});

			//图表
			ESEcharts();
			function ESEcharts(){
//				消息流入速率
				var esCpuUseCharts = new app.showData.chartsCollection({
					$context: $el, //作用域
					handler: handler, //spa应用的handler
					selector: "#cpuuseChart",//图表外部容器
					url:"./BaseAction_setBaseData.do",//请求连接
					urlParams:{
//						"app_id": appId,
						"obj_id": nodeInfo.obj_id,//"73847315"
						"queryFlag" : "1",//查询的接口序号，实时为1（默认），历史为2，统计为3
						"count_type" : "now",
						"radiodisplay" : "now|day",//now、day、week、month可以多个传入，中间用|分隔，用于控制日周月实时切换按钮显示
						"kpi_def_id": "139240",
//						"partion_id":"13",
//						"server_id": [serverId],
						"showType": "line",
						"state": "02",
						"showId": "30b01f9c-4b48-4a78-a77e-e093feb51af9",//与后台交互数据
					},
					eventmod:'es',
				});
				var esMemUseCharts = new app.showData.chartsCollection({
					$context: $el, //作用域
					handler: handler, //spa应用的handler
					selector: "#memuseChart",//图表外部容器
					url:"./BaseAction_setBaseData.do",//请求连接
					urlParams:{
//						"app_id": appId,
						"obj_id": nodeInfo.obj_id,//"73847315"
						"queryFlag" : "1",//查询的接口序号，实时为1（默认），历史为2，统计为3
						"count_type" : "now",
						"radiodisplay" : "now|day",//now、day、week、month可以多个传入，中间用|分隔，用于控制日周月实时切换按钮显示
						"kpi_def_id": "139240",
//						"partion_id":"13",
//						"server_id": [serverId],
						"showType": "line",
						"state": "02",
						"showId": "e1c876fb-3e73-4303-a9a5-99d23bc5daf9",//与后台交互数据
					},
					eventmod:'es',
				});
				var esJVMSizeCharts = new app.showData.chartsCollection({
					$context: $el, //作用域
					handler: handler, //spa应用的handler
					selector: "#jvmSizeChart",//图表外部容器
					url:"./BaseAction_setBaseData.do",//请求连接
					urlParams:{
//						"app_id": appId,
						"obj_id": nodeInfo.obj_id,//"73847315"
						"queryFlag" : "1",//查询的接口序号，实时为1（默认），历史为2，统计为3
						"count_type" : "now",
						"radiodisplay" : "now|day",//now、day、week、month可以多个传入，中间用|分隔，用于控制日周月实时切换按钮显示
						"kpi_def_id": "139240",
//						"partion_id":"13",
//						"server_id": [serverId],
						"showType": "line",
						"state": "02",
						"showId": "3307e765-b5bc-47d8-8303-aa4dbc93e049",//与后台交互数据
					},
					eventmod:'es',
				});
				var esThreadCharts = new app.showData.chartsCollection({
					$context: $el, //作用域
					handler: handler, //spa应用的handler
					selector: "#threadChart",//图表外部容器
					url:"./BaseAction_setBaseData.do",//请求连接
					urlParams:{
//						"app_id": appId,
						"obj_id": nodeInfo.obj_id,//"73847315"
						"queryFlag" : "1",//查询的接口序号，实时为1（默认），历史为2，统计为3
						"count_type" : "now",
						"radiodisplay" : "now|day",//now、day、week、month可以多个传入，中间用|分隔，用于控制日周月实时切换按钮显示
						"kpi_def_id": "139240",
//						"partion_id":"13",
//						"server_id": [serverId],
						"showType": "line",
						"state": "03",
						"showId": "d56fc412-be7e-42e4-9eb7-f877b731af72",//与后台交互数据
					},
					eventmod:'es',
				});
				var esLineThreadCharts = new app.showData.chartsCollection({
					$context: $el, //作用域
					handler: handler, //spa应用的handler
					selector: "#linethreadChart",//图表外部容器
					url:"./BaseAction_setBaseData.do",//请求连接
					urlParams:{
//						"app_id": appId,
						"obj_id": nodeInfo.obj_id,//"73847315"
						"queryFlag" : "1",//查询的接口序号，实时为1（默认），历史为2，统计为3
						"count_type" : "now",
						"radiodisplay" : "now|day",//now、day、week、month可以多个传入，中间用|分隔，用于控制日周月实时切换按钮显示
						"kpi_def_id": "139240",
//						"partion_id":"13",
//						"server_id": [serverId],
						"showType": "line",
						"state": "03",
						"showId": "cb86cb30-a7e0-412b-8e7d-866dcafd764d",//与后台交互数据
					},
					eventmod:'es',
				});
				var esRefuseThreadCharts = new app.showData.chartsCollection({
					$context: $el, //作用域
					handler: handler, //spa应用的handler
					selector: "#refusethreadChart",//图表外部容器
					url:"./BaseAction_setBaseData.do",//请求连接
					urlParams:{
//						"app_id": appId,
						"obj_id": nodeInfo.obj_id,//"73847315"
						"queryFlag" : "1",//查询的接口序号，实时为1（默认），历史为2，统计为3
						"count_type" : "now",
						"radiodisplay" : "now|day",//now、day、week、month可以多个传入，中间用|分隔，用于控制日周月实时切换按钮显示
						"kpi_def_id": "139240",
//						"partion_id":"13",
//						"server_id": [serverId],
						"showType": "line",
						"state": "03",
						"showId": "86cb4f33-ca60-4ff9-85d1-460f508a7608",//与后台交互数据
					},
					eventmod:'es',
				});
				var esBalanceCharts = new app.showData.chartsCollection({
					$context: $el, //作用域
					handler: handler, //spa应用的handler
					selector: "#balanceChart",//图表外部容器
					url:"./BaseAction_setBaseData.do",//请求连接
					urlParams:{
//						"app_id": appId,
						"obj_id": nodeInfo.obj_id,//"73847315"
						"queryFlag" : "1",//查询的接口序号，实时为1（默认），历史为2，统计为3
						"count_type" : "now",
						"radiodisplay" : "now|day",//now、day、week、month可以多个传入，中间用|分隔，用于控制日周月实时切换按钮显示
						"kpi_def_id": "139240",
//						"partion_id":"13",
//						"server_id": [serverId],
						"showType": "line",
						"state": "02",
						"showId": "27d31d59-58f2-4387-8aec-f20867388aa5",//与后台交互数据
					},
					eventmod:'es',
				});
				var esSegmentCharts = new app.showData.chartsCollection({
					$context: $el, //作用域
					handler: handler, //spa应用的handler
					selector: "#segmentChart",//图表外部容器
					url:"./BaseAction_setBaseData.do",//请求连接
					urlParams:{
//						"app_id": appId,
						"obj_id": nodeInfo.obj_id,//"73847315"
						"queryFlag" : "1",//查询的接口序号，实时为1（默认），历史为2，统计为3
						"count_type" : "now",
						"radiodisplay" : "now|day",//now、day、week、month可以多个传入，中间用|分隔，用于控制日周月实时切换按钮显示
						"kpi_def_id": "139240",
//						"partion_id":"13",
//						"server_id": [serverId],
						"showType": "line",
						"state": "02",
						"showId": "670f7278-2d15-4f36-97ca-9b6169627b4e",//与后台交互数据
					},
					eventmod:'es',
				});
				esCpuUseCharts.start();//对象启动方法
				esMemUseCharts.start();
				esJVMSizeCharts.start();
				esThreadCharts.start();
				esLineThreadCharts.start();
				esRefuseThreadCharts.start();
				esBalanceCharts.start();
				esSegmentCharts.start();
				$('.mq-pool-ctn .tab-content>.tab-pane:first-child', $el).siblings().removeClass('active');
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