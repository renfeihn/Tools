define(["jquery", "./echarts.min.js"], function($, echarts) {
	var globalTimer;
	return {		
		load:function($el,scope,handler){
			/*app.nodata.showLoading($('#objCtn', $el));*/
			/*app.nodata.showLoading($('#kpiPanel', $el));*/
			//app.nodata.showLoading($('#kpiData', $el));
			
			var ztreeId = 'ztree' + app.global.getUniqueId();//动态生成唯一的ztreeId
			$('.ztree', $el).attr('id', ztreeId);
			
		
			var cate = {
				cate1: null,
				cate2: null,
				cate3: null
			}
			var ztreeObj;
			var settings = {
				view: {
					showLine : false,
					expandSpeed:"normal"
				},
				callback : {
					onClick : zTreeOnClick,
					beforeExpand:closeOther
				}
			};
			
			function closeOther(id,node){
           	 var aa = $.fn.zTree.getZTreeObj(ztreeId);
				 //是不是根节点
				 if(!node.parentTId){
					 aa.expandAll(false);
					 return
				 }
				 //叶子节点
				 var parentNode = aa.getNodeByTId(node.parentTId);
				 var findNode = aa.getNodesByFilter(filter,false,parentNode);
				 for(var i=0;i<findNode.length;i++){
					 if(findNode[i].level == node.level){
						 aa.expandNode(findNode[i],false)
					 }
				 }
				 function filter(n){
					 return n.open == true
				 }
           }
		/*	var settings = {
				view: {
					showLine : false,
					fontCss: getFont
				},
				data: {
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "pId",
					}
				},
				callback: {
					onClick: onclick,
				}
			};*/
			
			//加载ztree
			/*app.nodata.showAwebLoading($('.monitorManage-left', $el), '加载中', false, {'top': '50%'});*/
			getZtreeData();
			
			function getFont(treeId, node) {
				return node.font ? node.font : {};
			}
			
			/*function onclick(event, treeId, treeNode) {
				if(treeNode.level == 0) {
					var appId = treeNode.app_id;
					$('#objCtn', $el).html('');
					app.nodata.showLoading($('#objCtn', $el));
					clearCurTimeEcharts();
					clearTrainEcharts();
					app.common.ajaxWithAfa({
						url: "AFARequestAction_callAfaAppGf.do",
						data: {
							'appType': 'POC',
							'target': 'Getkpis',
							"args": JSON.stringify({
								appId: Number(appId)
							})
						}
					}).then(function(data) {
						if(data.result.public_rsp.errorcode === '000000') {
							kpiList = data.result.private_rsp.kpiList;
							if(kpiList) {
								showKpiList(kpiList);
							}
						}
					});
				} else {
					$('#kpiCtn', $el).html('');
					$('#searchObj', $el).val('');//清空对象搜索框内容
					getObjList(getParams(treeNode));
				}
			}*/
			
			
			function zTreeOnClick(event,treeId,treeNode,clickFlag){
				$('#appConfigInfo', $el).empty();//清空之前所有应用信息
				$('#appTitle', $el).text(treeNode.name);

				if(treeNode.level == 0){//点击第一级
					var data = {levelOneName : treeNode.name}
					/*if(appId){
						data.appId = appId;
					}*/
					clearCurTimeEcharts();
					clearTrainEcharts();
					
					$.ajax({
						type : "post",
						url : "AppConfigAction_getFirstCategoryObjects.do",
						data : data,
						aimshelter: true,
						dataType : "json",
						success : function(data){
							if(data.status){
								// showAppInfo(data.content.cate1Objects);
								showObjList(data.content.cate1Objects);
							}							
						}
					});
					if(data.levelOneName == '应用群组'){
						activeShowLogInfoArgs = {querytype:'A1',queryvalue:data.levelOneName};
						activeShowAgentInfoArgs = {querytype:'A1',queryvalue:data.levelOneName};
					}else if(data.levelOneName == '软件'){
						activeShowAgentInfoArgs = {querytype:'F1',queryvalue:data.levelOneName};
						activeShowLogInfoArgs = {querytype:'F1',queryvalue:data.levelOneName};
					}else{
						activeShowLogInfoArgs = {querytype:'Y1',queryvalue:data.levelOneName};
						activeShowAgentInfoArgs = {querytype:'Y1',queryvalue:data.levelOneName};
					}
				}else if(treeNode.level == 1){//点击第二级
					$('#appTitle', $el).text($('#' + treeNode.parentTId + '_span', $el).text() + "/" + treeNode.name);
					var data = {
						levelOneName : $('#' + treeNode.parentTId + '_span', $el).text(),
						levelTwoName : treeNode.name
					}
					/*if(appId){
						data.appId = appId;
					}*/
					$.ajax({
						type : "post",
						url : "AppConfigAction_getSecondCategoryObjects.do",
						data : data,
						aimshelter: true,
						dataType : "json",
						success : function(data){
							if(data.status){
								//showAppInfo(data.content.cate2Objects);
								showObjList(data.content.cate2Objects);
							}
						}
					});
					if(data.levelOneName == '应用群组'){
						activeShowLogInfoArgs = {querytype:'A2',queryvalue:data.levelTwoName};
						activeShowAgentInfoArgs = {querytype:'A2',queryvalue:data.levelTwoName};
					}else if(data.levelOneName == '软件'){
						activeShowAgentInfoArgs = {querytype:'F2',queryvalue:data.levelTwoName};
						activeShowLogInfoArgs = {querytype:'F2',queryvalue:data.levelTwoName};
					}else{
						activeShowLogInfoArgs = {querytype:'Y2',queryvalue:data.levelTwoName};
						activeShowAgentInfoArgs = {querytype:'Y2',queryvalue:data.levelTwoName};
					}
				}else if(treeNode.level == 2){//点击第三级
					$('#appTitle', $el).text($('#' + treeNode.parentTId , $el).parent().prev().find('span').eq(1).text() + "/" + $('#' + treeNode.parentTId + '_span', $el).text() + "/" + treeNode.name);
					var data = {
						levelOneName : $('#' + treeNode.parentTId , $el).parent().prev().find('span').eq(1).text(),
						levelTwoName : $('#' + treeNode.parentTId + '_span', $el).text(),
						levelThreeName : treeNode.name
					}
					/*if(appId){
						data.appId = appId;
					}*/
					$.ajax({
						type : "post",
						url : "AppConfigAction_getThirdCategoryObjects.do",
						data : data,
						aimshelter: true,
						dataType : "json",
						success : function(data){
							if(data.status){
								// showAppInfo(data.content.cate3Objects);
								showObjList(data.content.cate3Objects);
							}
						}
					});

					if(data.levelOneName == '应用群组'){
						activeShowLogInfoArgs = {querytype:'A3',queryvalue:data.levelThreeName};
						activeShowAgentInfoArgs = {querytype:'A3',queryvalue:data.levelThreeName};
					}else if(data.levelOneName == '软件'){
						activeShowAgentInfoArgs = {querytype:'F3',queryvalue:data.levelThreeName};
						activeShowLogInfoArgs = {querytype:'F3',queryvalue:data.levelThreeName};
					}else{
						activeShowLogInfoArgs = {querytype:'Y3',queryvalue:data.levelThreeName};
						activeShowAgentInfoArgs = {querytype:'Y3',queryvalue:data.levelThreeName};
					}
				}
				activeClassInfo = data;
				$('#resizeHeight li.active', $el).trigger('click');
				
				$("#monitor-mask",$el).removeClass("hide");
				$("#kpiCtn",$el).children("li").removeClass("active");
			}
			
			
		
			function getParams(treeNode) {
				var params = {
					view_type: '1',
					moniflag: '-1'
				};
				params.app_id = treeNode.app_id;
				params.obj_type = treeNode.obj_type;
				if(treeNode.obj_class) {
					params.obj_class = treeNode.obj_class;
				}
				
				return params;
			}
			
			var objList;
			//获取对象列表
			function getObjList(params) {
				/*app.nodata.hideLoading($('#objCtn', $el));
				app.nodata.showAwebLoading($('#objCtn', $el), '加载中', false, {'top': '30%'});*/
				app.common.ajaxWithAfa({
					url: "AppConfigAction_qryObjList.do",
					data: {
						'appType': 'APPCONF',
						'target': 'ObjList',
						"args": JSON.stringify(params)
					}
				}).then(function(data) {
				/*	app.nodata.clearLoading($('#objCtn', $el));*/
					objList = data.result.resultList;
					if(objList) {
						showObjList(objList);
					} else {
						/*app.nodata.showLoading($('#objCtn', $el));*/
					}
				});
			}
			
			//展示对象列表
			function showObjList(data) {
				$('#objNum', $el).text(data.length);
				var tmp = '';
				data.forEach(function(item, i) {
					tmp += '<div class="obj" data-item="'+JSON.stringify(item).replace(/"/g,"'")+'" data-id="'+ item.objectSummary.objectId +'" title="'+ item.objectSummary.objectName +'" '+ (i < 6 ? 'style="margin-top: 0"' : '') +'>\
								'+ item.objectSummary.objectName +'<br>\
							</div>';
				});
				// '+ (item.manage_ip ? item.manage_ip.split(',')[0] : '0.0.0.0') +'\
				
				$('#objCtn', $el).html(tmp);
				/*if(!tmp) {
					app.nodata.showLoading($('#objCtn', $el));
				}*/
			}
			
			//获取应用数据
			function getZtreeData() {
				app.common.ajaxWithAfa({
					url: "EventListAction_getObjectCategory.do"
					/*url: "AFARequestAction_callAfaAppGf.do",
					data: {
						'appType': 'APPCONF',
						'target': 'AppLevelOfUser',
						"args": JSON.stringify({})
					}*/
				}).then(function(data) {
					var cates = data.objectCate;
					initZNodes(cates);
					/*if(data && data.result && data.result.public_rsp && data.result.public_rsp.errorcode === '000000') {
						var data = data.result.private_rsp.result;
						if(data) {
							app.nodata.clearLoading($('.monitorManage-left', $el));
							if(data.length>0) {
								app.nodata.hideLoading($('.monitorManage-left', $el));
								initZNodes(data);
							} else {
								app.nodata.showLoading($('.monitorManage-left', $el));
							}
						} else {
							app.alert('后台交易无返回数据，请联系运维人员');
						}
					} else {
						app.alert('后台交易异常，请联系运维人员');
					}*/
				});
			}
			
			//生成ztree
			function initZNodes(data) {
				$('#appNum', $el).text(data.length);
				
				var zNodes = getNodesData(data);
				
				ztreeObj = $.fn.zTree.init($("#" + ztreeId, $el), settings, zNodes);
				
				addSearchEvent();
			}
			
			function getNodesData(data) {
				//var zNodes = [];
				var cates = data;
				var levelOneNames = [];//一级目录
				for(var i = 0; i < cates.length; i++){
					levelOneNames.push(cates[i].levelOneName);
				}
				levelOneNames = _.uniq(levelOneNames); //去重

				var treeArr = [];//最终需求的数据结构
				for(var i = 0; i < levelOneNames.length; i++){
					treeArr.push({name : levelOneNames[i]});
					for(var j = 0; j < cates.length; j++){
						if(cates[j].levelOneName == levelOneNames[i]){
							if(!treeArr[i].children){
								treeArr[i].children = [
									{
										name : cates[j].levelTwoName,
										children : []
									}
								];
							}
							if(treeArr[i].children){
								var children = treeArr[i].children;
								var ishas = false;
								for(var k = 0; k < children.length; k++){
									if(children[k].name == cates[j].levelTwoName){
										children[k].children.push({name : cates[j].levelThreeName});
										ishas = true;
									}
								}
								if(!ishas){
									children.push({
										name : cates[j].levelTwoName,
										children : [{name : cates[j].levelThreeName}]
									});
								}					
							}
							
						}
					}
				}
				/*$.each(data, function(index, obj) {
					if(obj && obj.leve2) {
						// 一级菜单
						zNodes.push({
							id : obj.app_id,
							name: obj.c_name + '(' + obj.obj_num + ')',
							font: obj.status == "false" ? {'color': 'red'} : {'color': 'black'}, 
							app_id: obj.app_id,
							app_cname : obj.c_name,
							nocheck: false
						});
					
						$.each(obj.leve2, function(i, obj2) {
							if(obj2) {
								zNodes.push({
									id: obj.app_id + '_' + i,
									name: (obj2.c_name==='4'?'操作系统':obj2.c_name==='5'?'中间件':obj2.c_name==='7'?'数据库':obj2.c_name==='8'?'应用程序':'')+'('+obj2.obj_num+')',
									font: obj2.status == "false" ? {'color': 'red'} : {'color': 'black'}, 
									pId: obj.app_id,
									app_id: obj.app_id,
									obj_type: obj2.c_name,
									app_cname: obj.c_name
								});
								
								if(obj2.leve3) {
									$.each(obj2.leve3, function(j, obj3) {
										zNodes.push({
											id: obj.app_id + '_' + i + '_' + j,
											name: obj3.c_name + '(' + obj3.obj_num + ')', 
											font: obj3.status == "false" ? {'color': 'red'} : {'color': 'black'},
											pId: obj.app_id + '_' + i,
											app_id: obj.app_id,
											obj_type: obj2.c_name,
											obj_class: [obj3.c_name],
											app_cname: obj.c_name
										});
									});
								}
							}
						});
					}
				});*/
				
				return treeArr;
			}
			
			function addSearchEvent() {
				var nodes = ztreeObj.getNodes();
				var timer;
				$('#searchApp', $el).off().on('input', function(e) {
					timer && clearTimeout(timer);
					
					var value = $.trim($(this).val());

					timer = setTimeout(function() {
						var selectedNodes = [];
						if(!value) {
							ztreeObj.showNodes(nodes);
						} else {
							nodes.forEach(function(item, i) {
								if(item.name.indexOf(value) == -1) {
									selectedNodes.push(item);
								}
							});
							ztreeObj.showNodes(nodes);
							ztreeObj.hideNodes(selectedNodes);
						}
					}, 500);
				});
			}
			
			getFields();
			
			function getFields() {
				app.common.ajaxWithAfa({
					url: "ESSearchAction_getFields.do",
					// data: urlData
				}).done(function(data) {
					var data = data.result;

					if(data && data.length>0){
						showKpiList(data);
					}	
				})
			}
			
			
			
			var timer;
			//搜索对象
			$('#searchObj', $el).on('input', function(e) {
				if(!objList || objList.length == 0) return;
				
				timer && clearTimeout(timer);
				
				var value = $.trim($(this).val()).toLowerCase();
				
				timer = setTimeout(function() {
					var afterFilterList = [];
					objList.forEach(function(item, i) {
						if(item.e_name.toLowerCase().indexOf(value) != -1) {
							afterFilterList.push(item);
						}
					});
					
					showObjList(afterFilterList);
				}, 500);
			});
			
			//对象点击事件
			$('#objCtn', $el).on('click', '.obj', function(e) {
				if($(this).hasClass('active')) return;
				
				$(this).addClass('active').siblings('.active').removeClass('active');
				
				clearCurTimeEcharts();
				clearTrainEcharts();
				
				$("#monitor-mask",$el).addClass("hide");
				
				var itemType = $(this).attr("data-item");
				itemType = itemType.replace(/'/g, "\"");
				var objectssummary = JSON.parse(itemType).objectSummary;
				cate.cate1 = objectssummary.l1CateName;
				cate.cate2 = objectssummary.l2CateName;
				cate.cate3 = objectssummary.l3CateName;
				
				//获取指标数据
				// getKpiData($(this).attr('data-type'));
			});
			
			//缩放功能
			/*$('#changeSize', $el).click(function(e) {
				$('#kpiData', $el).toggleClass('large');
				
				handler.setTimeout(function() {//动画结束后再缩放
					eCurTime && eCurTime.resize();
					eTrain && eTrain.resize();
					eObjList.forEach(function(item, i) {
						item.resize();
					});
				}, 300);
			});*/
			
			var timer2;
			//搜索指标
			$('#searchKpi', $el).on('input', function(e) {
				if(!kpiList || kpiList.length == 0) return;
				
				timer2 && clearTimeout(timer2);
				
				var value = $.trim($(this).val()).toLowerCase();
				
				timer2 = setTimeout(function() {
					var afterFilterList = [];
					kpiList.forEach(function(item, i) {
						if(item.KPI_CLASS_5.toLowerCase().indexOf(value) != -1) {
							afterFilterList.push(item);
						}
					});
					
					showKpiList(afterFilterList);
				}, 500);
			});
			
			var params;
			//指标事件
			$('#kpiCtn', $el).on('click', 'li', function(e) {
				if($(this).hasClass('active')) return;

				$(this).addClass('active').siblings('.active').removeClass('active');
				
				var params = JSON.parse($(this).attr('data-kpi'));
				
				/*var data = JSON.parse($(this).attr('data-kpi'));
				var objId = $('#objCtn .obj.active', $el).attr('data-id');
				if(!objId) {
					objId = data.POC_KPIDEFID;
				}*/
//				params = {
//					objId: '251951',
//					devtype: 'websphere',
//					kpi: '287',
//					metricId: '4508',
//					limitFlag: 0,
//					min_rate: '0.9',
//					max_rate: '1.0',
//					futureMin: '120'//预测时间
//				}
			/*	params = {
					objId: objId,
					devtype: data.POC_DEVTYPE,
					kpi: data.POC_KPIDEFID,
					metricId: data.POC_METRICID,
					limitFlag: 0,
					min_rate: '0.9',
					max_rate: '1.0',
					futureMin: '120'//预测时间
				}*/
				getCurTimeData(params);
				// getTrainData(params);
			});
			
			//实时数据刷新
			var time = 360;//360s
			//refreshTime();
			//刷新时间
			function refreshTime() {
				globalTimer = setTimeout(function() {
					if(time > 0) {
						time--;
						$('#residueTime', $el).text(formatTime(time));
						refreshTime();
					} else {
						//请求新数据
						time = 360;
						$('#residueTime', $el).text('6min 0s');
						refreshTime();
					}
				}, 1000);
			}
			
			function formatTime(time) {
				return parseInt(time / 60) + 'min ' + (time % 60) + 's';
 			}
			
			//设置振幅
			$('#amplitudeBtn', $el).click(function(e) {
				$(this).toggleClass('active');
				resetAmplitude();
			});
			
			var isSetupAmplitude = false;//是否设置振幅
			var amplitude = {};//存设置的振幅
			//振幅确认事件
			$('#amplitudeConfirm', $el).click(function(e) {
				var min = $('#min', $el).val();
				var max = $('#max', $el).val();	
				if(!/^\d+$/.test(max) || !/^\d+$/.test(min)) {
					app.alert('振幅不能为空或非整数类型', null, 'pink');
					return;
				}
				if(Number(min) > Number(max)) {
					app.alert('下限不能大于上限', null, 'pink');
					return;
				}
				isSetupAmplitude = true;
				amplitude.min = min;
				amplitude.max = max;
				$('#amplitudeBtn', $el).removeClass('active');
			});
			
			//振幅取消事件
			$('#amplitudeCancel', $el).click(function(e) {
				$('#amplitudeBtn', $el).removeClass('active');
				resetAmplitude();
			});
			
			function resetAmplitude() {
				if(isSetupAmplitude) {
					$('#min', $el).val(amplitude.min);
					$('#max', $el).val(amplitude.max);
				} else {
					$('#min', $el).val('');
					$('#max', $el).val('');
				}
			}
			
			//设置振幅阻止点击冒泡事件
			$('.monitorManage-amplitude-panel', $el).click(function(e) {
				e.stopPropagation();
			});
			
			var isTest = false;
			//测试
			$('#testBtn', $el).click(function(e) {
				if(!params) return;
				if(isSetupAmplitude) {
					if(params.data) {
						delete params.data;
					}
					params.min_rate = String(amplitude.min / 100);
					params.max_rate = String(amplitude.max / 100);
					isTest = true;
					getTrainData(params);
				} else {
					app.alert('请先设置振幅');
				}
			});
			
			//训练
			$('#trainBtn', $el).click(function(e) {
				if(!params) return;
				trainData(eData);
			});
			
			//训练数据
			function trainData(data) {
				clearTrainEcharts();
				/*app.nodata.showAwebLoading($('#tabs2', $el), '加载中', false, {'top': '30%'});*/
				params.data = data;
				app.common.ajaxWithAfa({
					url: "AFARequestAction_callAfaAppGf.do",
					data: {
						'appType': 'POC',
						'target': 'TrainData',
						"args": JSON.stringify(params)
					}
				}).then(function(data) {
				/*	app.nodata.clearLoading($('#tabs2', $el));*/
					if(data.result.public_rsp.errorcode === "000000") {
						eData = data.result.private_rsp.result;
						showTrainEcharts(eData);
						app.alert('训练成功');
					}
				});
			}
			
			//展示区间列表按钮
			$('#listBtn', $el).click(function(e) {				
				if($(this).hasClass('active')) {
					$('#echartsCtn', $el).removeClass('show-list');
				} else {
					$('#echartsCtn', $el).addClass('show-list');
				}
				
				$(this).toggleClass('active');
				
				eTrain && eTrain.resize();
			});
			
			//区间列表
			var listTable = $('#listTable', $el).DataTable({
				paging: true,
				sDom:'<"top"f<"clear">>t<"bottom"ilp<"clear">>',
				bInfo: false, //开关，是否显示表格的一些信息
				searching: false,
				ordering: false,
				lengthChange: false,
				pageLength: 7,
				columns: [{
					data: 'time',
					defaultContent: ''
				},{
					data: 'value',
					defaultContent: ''
				}]
			});
			
			$('#closeList', $el).click(function(e) {
				$('#listBtn', $el).removeClass('active');
				$('#echartsCtn', $el).removeClass('show-list');
				eTrain.resize();
			});
			
			//将该区域标为正常
			$('#toNormalBtn', $el).click(function(e) {
				for(var i = eRange.min; i <= eRange.max; i++) {
					eData.status[i] = '0';
				}
				showTrainEcharts(eData);
			});
			
			//将该区域标为异常
			$('#toInnormalBtn', $el).click(function(e) {
				for(var i = eRange.min; i <= eRange.max; i++) {
					eData.status[i] = '1';
				}
				showTrainEcharts(eData);
			});
			
			//关联分析
			$('#relationBtn', $el).click(function(e) {
				if($(this).hasClass('active')) {
					$('#echartsCtn', $el).removeClass('show-relation-echarts');
				} else {
					if(eObjList) {
						eObjList.forEach(function(item) {
							item.dispose();
							item = null;
						});
						eObjList.length = 0;
					}
					$('#relactionEchartsCtn', $el).html('');
					/*app.nodata.hideLoading($('.relation-echarts-ctn', $el));*/
					/*app.nodata.showAwebLoading($('#relactionEchartsCtn', $el), '加载中', false, {'top': '80px'});*/
					
					$('#echartsCtn', $el).addClass('show-relation-echarts');
					var objId = $('#objCtn .obj.active', $el).attr('data-id');
					if(!objId) {
						objId = JSON.parse($('#kpiCtn li.active', $el).attr('data-kpi')).POC_KPIDEFID;
					}
					var startTime = String(eData.times[eRange.min]).replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1/$2/$3 $4:$5:$6');
					var endTime = String(eData.times[eRange.max]).replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1/$2/$3 $4:$5:$6');
					getRelationData(Number(objId), startTime, endTime);
				}
				
				$(this).toggleClass('active');
				
				eTrain && eTrain.resize();
			});
			
			//关闭关联
			$('#closeRelation', $el).click(function(e) {
				$('#relationBtn', $el).removeClass('active');
				$('#echartsCtn', $el).removeClass('show-relation-echarts');
				eTrain.resize();
			});
			
			//获取关联分析数据
			function getRelationData(objId, startTime, endTime) {
				app.common.ajaxWithAfa({
					url: "AFARequestAction_callAfaAppGf.do",
					data: {
						'appType': 'POC',
						'target': 'UnionKpi',
						"args": JSON.stringify({
							obj_id: objId,
							startTime: startTime,
							endTime: endTime
						})
					}
				}).then(function(data) {	
					if(data.result.public_rsp.errorcode == '000000') {
						data = data.result.private_rsp;
						showRelationEcharts(data);
					} else {
						$('#relactionEchartsCtn', $el).html('');
						app.nodata.showLoading($('.relation-echarts-ctn', $el));
					}
				});
			}
			
			var eObjList = [];//存关联的所有echarts对象
			//展示关联图
			function showRelationEcharts(data) {
				var tmp = '';
				var index = 0;
				for(var key in data) {
					tmp += '<div id="echarts'+ (index++) +'" class="monitorManage-kpi-echarts"></div>';
				}
				
				$('#relactionEchartsCtn', $el).html(tmp);
				
				index = 0;
				for(var key in data) {
					eObjList[index] = echarts.init($('#echarts' + index)[0]);
					eObjList[index].setOption(getRelationOption(data[key][0].kpi_class_5, data[key][0].value[0], data[key][0].value[1]));
					var markData = [];
					data[key][0].value[2].forEach(function(item, i) {
						if(item == 1) {
							markData.push({
								coord: [i, data[key][0].value[1][i]]
							});
						}
					});
					eObjList[index].setOption({
						series: [{
							markPoint: {
								symbol: 'circle',
								label: {
									show: false
								},
								symbolSize: 4,
								silent: false,
								itemStyle: {
									color: 'red'
								},
								data: markData,
								animation: false
							}
						}]
					});
					index++;
				}
			}
			
			var kpiList;
			//获取指标数据
			function getKpiData(cate) {
				app.common.ajaxWithAfa({
					url: "AFARequestAction_callAfaAppGf.do",
					data: {
						'appType': 'POC',
						'target': 'Getkpis',
						"args": JSON.stringify({
							category: cate
						})
					}
				}).then(function(data) {
					if(data.result.public_rsp.errorcode === '000000') {
						kpiList = data.result.private_rsp.kpiList;
						if(kpiList) {
							showKpiList(kpiList);
						}
					}
				});
			}
			
			function showKpiList(data) {
			/*	app.nodata.hideLoading($('#kpiPanel', $el));*/
				$('#kpiNum', $el).text(data.length);
				var tmp = '';
				data.forEach(function(item, i) {
					tmp += '<li data-kpi=\''+ JSON.stringify(item) +'\' data-type="'+item.type+'"  title="'+ item.name +'">'+ item.name +'</li>';
				});
				
				$('#kpiCtn', $el).html(tmp);
				if(!tmp) {
					app.nodata.showLoading($('#kpiPanel', $el));
				}
			}
			
			var eCurTime = echarts.init($('#eCurTime')[0]);
			eCurTime.setOption(getOption());
			function clearCurTimeEcharts() {
				if(eCurTime) {
					eCurTime.clear();
					eCurTime.setOption(getOption());
					$('#curTime', $el).text('-');
					$('#curValue', $el).text('-');
					$('#icon', $el).addClass('normal').removeClass('innormal');
					$('#forecastCtn', $el).html('<li><div>预测时间</div><div>值</div></li>');
				}
			}
			
			//获取实时数据
			function getCurTimeData(params) {
				clearCurTimeEcharts();
				var fileName = params.name;
				
				var interval = $("#timeRange",$el).val();
				
				var timeObj = getTimeObj(interval);
				
				app.common.ajaxWithAfa({
					url: "ESSearchAction_sqlStatistics.do",
					data: {
						search: '*',
						startTime: timeObj.start,
						endTime: timeObj.end,
						cate:{"category":{"cate1":[cate.cate1],"cate2":[cate.cate2],"cate3":[cate.cate3]},"app":{"cate1":[cate.cate1],"cate2":[cate.cate2],"cate3":[cate.cate3]}},
						logType: 1,
						sql: "select "+fileName +" from applog-* where 1=1 GROUP BY date_histogram(field='start','interval'='"+interval+"')"
					}
				}).then(function(data) {
					$("#curTime", $el).text(timeObj.end);
					//showCurTimeData(data.result.aggs.buckets);
					showCurTimeEcharts(data.result.aggs.buckets);
				});
			}
			
			function getTimeObj(interval) {
				var timeObj = {
					start: null,
					end: null
				};
				var nowTime = window.performance.now() + window.performance.timing.navigationStart;
				var startSeconds = null;
				
				switch(interval) {
					case 'month':
						startSeconds = nowTime - 30 * 24 * 60 * 60 * 1000;
						timeObj.start = new Date(startSeconds).Format("yyyy-MM-dd hh:mm:ss");
						break;
					case 'week':
						startSeconds = nowTime - 7 * 24 * 60 * 60 * 1000;
						timeObj.start = new Date(startSeconds).Format("yyyy-MM-dd hh:mm:ss");
						break;
					case 'day':
						startSeconds = nowTime -  24 * 60 * 60 * 1000;
						timeObj.start = new Date(startSeconds).Format("yyyy-MM-dd hh:mm:ss");
						break;
					default:
						break;
				}
				timeObj.end = new Date(nowTime).Format("yyyy-MM-dd hh:mm:ss");	
				
				return timeObj;
			}
			
			
			function showCurTimeData(data) {
				$('#curTime', $el).text(data.realtimes[data.realtimes.length - 1].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1/$2/$3 $4:$5:$6'));
				$('#curValue', $el).text(data.realvals[data.realvals.length - 1]);
				
				var innormals = data.anormalPoint;
				if(!innormals || $.isEmptyObject(innormals)) {
					$('#icon', $el).addClass('normal').removeClass('innormal');
					$('#forecastCtn', $el).html('<li><div>预测时间</div><div>值</div></li><li><div style="width: 290px; box-sizing: border-box; padding-left: 40px">无风险点</div></li>');
				} else {
					$('#icon', $el).addClass('innormal').removeClass('normal');
					var tmp = '<li><div>预测时间</div><div>值</div></li>';
					for(var time in innormals) {
						tmp += '<li><div>'+ time.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1/$2/$3 $4:$5:$6') +'</div><div>'+ innormals[time] +'</div></li>';
					}
					$('#forecastCtn', $el).html(tmp);
				}
			}
			
			function showCurTimeEcharts(data) {
				// debugger;
				var times = data.map(function(item){
					return item.key_as_string;
				});
				var realVals = data.map(function(item) {
					return item.doc_count;
				})
				var forecastVals = [];
				/*var realtimes = data.realtimes.sort();
				var times = realtimes.concat(data.times);
				times = times.map(function(item) {
					return String(item).replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1/$2/$3 $4:$5:$6');
				});
				
				var forecastVals = data.values;
				data.realtimes.forEach(function(item, i) {//补空数据
					if(i != 0) {
						forecastVals.unshift(null);
					} else {
						forecastVals.unshift(data.realvals[data.realvals.length - 1]);
					}					
				});
				
				var realVals = data.realvals;
				data.times.forEach(function() {//补空数据
					realVals.push(null);
				});*/
				
				
				
				eCurTime.setOption({
					xAxis: {
						data: times
					},
					dataZoom: [{
						start: 0,
						end: 100
					}],
					series: [{
						name: '实时数据',
						data: realVals
					}, {
						name:'预测数据',
				        type:'line',
				        smooth:true,
				        symbol: 'none',
				        sampling: 'max',
				        itemStyle: {
				            normal: {
				                color: 'rgba(166, 166, 166, 1)'
				            }
				        },
				        lineStyle: {
				        	type: 'dotted'
				        },
				        areaStyle: {
				            normal: {
				                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                    offset: 0,
				                    color: 'rgba(166, 166, 166, 0.8)'
				                }, {
				                    offset: 1,
				                    color: 'rgba(166, 166, 166, 0)'
				                }])
				            }
				        },
				        data: forecastVals
					}]
				});
			}
			
			var eTrain = echarts.init($('#eTrain')[0]);
			eTrain.setOption(getOption());	
			eTrain.on('brush', brush);//选区域事件
			
			function clearTrainEcharts() {
				if(eTrain) {
					eTrain.clear();
					eTrain.setOption(getOption());
					$('.monitorManage-echarts-ctn', $el).removeClass('show-relation-echarts').removeClass('show-list');
					$('#relationBtn', $el).removeClass('active');
					$('#listBtn', $el).removeClass('active');
					eTrain && eTrain.resize();
					$('.selected-area-btn', $el).addClass('hide');
					$('.init-btn', $el).removeClass('hide');
				}
			}
			
			var eRange = {};
			var eList = [];
			function brush(params) {
				if(params.command || params.areas.length == 0) {//取消选中区域
					$('.monitorManage-button-panel.selected-area-btn', $el).addClass('hide');
					$('.monitorManage-button-panel.init-btn', $el).removeClass('hide');
					listTable.clear().draw();
					return;
				} else {//选择echarts一块区域
					$('.monitorManage-button-panel.selected-area-btn', $el).removeClass('hide');
					$('.monitorManage-button-panel.init-btn', $el).addClass('hide');
				}
				listTable.clear();
				var range = params.areas[0].coordRange;
				var offset = params.areas[0].__rangeOffset.offset;

				var min = range[0];
				var max = range[1];

				if(offset[0] < 0) {
					min = range[0] + 1;
				}
				if(offset[1] > 0) {
					max = range[1] - 1;
				}
				
				eRange.min = min;
				eRange.max = max;

				eList.length = 0;
				for(var i = min; i <= max; i++) {
					eList.push({
						time: eData.times[i].replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1/$2/$3 $4:$5:$6'),
						value: eData.values[i]
					});
				}
				listTable.rows.add(eList).draw();
			}

			var eData;
			//获取训练echart图数据
			function getTrainData(params) {
				clearTrainEcharts();
				/*app.nodata.showAwebLoading($('#tabs2', $el), '加载中', false, {'top': '30%'});*/
				app.common.ajaxWithAfa({
					url: "AFARequestAction_callAfaAppGf.do",
					data: {
						'appType': 'POC',
						'target': 'GetMarkedData',
						"args": JSON.stringify(params)
					}
				}).then(function(data) {
					app.nodata.clearLoading($('#tabs2', $el));
					if(data.result.public_rsp.errorcode === "000000") {
						eData = data.result.private_rsp.result;
						if(isTest) {
							app.alert('测试成功');
							isTest = false;
						}
						showTrainEcharts(eData);
					}
				});
			}
			
			function showTrainEcharts(data) {
				var times = data.times.map(function(item) {
					return item.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1/$2/$3 $4:$5:$6');
				});
				eTrain.setOption({
					xAxis: {
						data: times
					},
					series: [{
						data: data.values
					}]
				});
				
				var markData = [];
				data.status.forEach(function(item, i) {
					if(item == 1) {
						markData.push({
							coord: [i, data.values[i]]
						});
					}
				});
				eTrain.setOption({
					series: [{
						markPoint: {
							symbol: 'circle',
							label: {
								show: false
							},
							symbolSize: 4,
							silent: false,
							itemStyle: {
								color: 'red'
							},
							data: markData,
							animation: false
						}
					}]
				});
			}
			
			function getOption() {
				var option = {
					tooltip: {
					    trigger: 'axis',
//					    position: function (pt) {
//					        return [pt[0], '10%'];
//					    }
					},
					brush: {
					    toolbox: ['lineX', 'clear'],
					    xAxisIndex: 0
					},
					toolbox: {
						right: 255,
						top: 0
					},
					grid: {
						top: 40,
						left: 60,
						right: 20,
						bottom: 70
					},
					xAxis: {
					    type: 'category',
					    boundaryGap: false,
					    data: []
					},
					yAxis: {
					    type: 'value',
					    boundaryGap: [0, '20%']
					},
					dataZoom: [{
					    type: 'slider',
//					    startValue: 0,
//					    endValue: 10000,
					    start: 0,
					    end: 10,
//					    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
//					    handleSize: '80%',
//					    handleStyle: {
//					        color: '#fff',
//					        shadowBlur: 3,
//					        shadowColor: 'rgba(0, 0, 0, 0.6)',
//					        shadowOffsetX: 2,
//					        shadowOffsetY: 2
//					    }
					}],
					series: [
					    {
					        name:'数据',
					        type:'line',
					        smooth:true,
					        symbol: 'none',
					        sampling: 'max',
					        itemStyle: {
					            normal: {
					                color: 'rgba(41, 166, 230, 1)'
					            }
					        },
//					        lineStyle: {
//					        	type: 'dotted'
//					        },
					        areaStyle: {
					            normal: {
					                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                    offset: 0,
					                    color: 'rgba(41, 166, 230, 0.8)'
					                }, {
					                    offset: 1,
					                    color: 'rgba(41, 166, 230, 0)'
					                }])
					            }
					        },
					        data: []
					    }
					]
				};
				
				return option;
			}
			
			//关联分析echarts图的配置
			function getRelationOption(title, times, datas) {
				var option = {
					tooltip: {
					    trigger: 'axis',
//					    position: function (pt) {
//					        return [pt[0], '10%'];
//					    }
					},
					title: {
						text: title,
						left: 45,
						top: 0,
						textStyle: {
							color: '#333',
							fontWeight: 'normal',
							fontSize: 14
						}
					},
					grid: {
						top: 35,
						left: 50,
						right: 20,
						bottom: 20
					},
					xAxis: {
					    type: 'category',
					    boundaryGap: false,
					    data: times
					},
					yAxis: {
					    type: 'value',
					    boundaryGap: [0, '20%']
					},
					series: [
					    {
					        name:'数据',
					        type:'line',
					        smooth:true,
					        symbol: 'none',
					        sampling: 'max',
					        itemStyle: {
					            normal: {
					                color: 'rgba(41, 166, 230, 1)'
					            }
					        },
					        areaStyle: {
					            normal: {
					                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                    offset: 0,
					                    color: 'rgba(41, 166, 230, 0.8)'
					                }, {
					                    offset: 1,
					                    color: 'rgba(41, 166, 230, 0)'
					                }])
					            }
					        },
					        data: datas
					    }
					]
				};
				
				return option;
			}
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}	
	}
});
