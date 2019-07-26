/*!
 * Javascript library v3.0
 *
 */

/**
 * [指标配置选择]
 * 
 * @param {[undefined]}
 *            undefined [确保undefined未被重定义]
 * @author liyuansheng@agree.com.cn
 */
( /* <global> */ function(undefined) {

	(function(factory) {
		"use strict";
		// amd module
		if(typeof define === "function" && define.amd) {
			define(["jquery"], factory);
		}
		// global
		else {
			factory();
		}
	})
	(function() {
		"use strict";
		var selObj = function(selector, $el, context, scope, handler, flag, saveFun) {
			var $kpiCtn, $kpiTitle, initflag, $preview, $preCtn, preCharts, $noPreview;
			var ___selector = selector,
				___$el = $el,
				___context = context,
				___scope = scope,
				___handler = handler,
				___flag = flag,
				___lableFlag;

			var countArrObj = { app: 0, obj: 0 },
				appArrObj = {},
				objArrObj = {};

			var objTypeInitFlag = false,
				resumeFlag = false,
				nextFlag = false,
				isResume = false;

			var flagJson = {
				MW: '中间件',
				DB: '数据库'
			}

			var mobjId,
				cateId;
			//					初始化模态框，给模态框添加元素
			var initModal = function() {
				var $myModal = $(___selector, ___$el);
				$myModal.empty();
				$.ajax({
					url: "./script/spa/sup//kpisel.html",
					contentType: "application/x-www-form-urlencoded;charset=utf-8;",
					type: "POST",
					async: false,
					dataType: "html",
					success: function(data) {
						var $html = $(data),
							$selModalHeader = $html.filter('#selModalHeader'),
							$selModalBody = $html.filter('#selModalBody'),
							$selModalFooter = $html.filter('#selModalFooter');

						$kpiCtn = $html.filter('[data-role="kpi_ctn"]');
						$kpiTitle = $html.filter('#selKpiTitle');
						$preview = $html.filter('[data-role="preview"]');
						$preCtn = $html.filter('[data-role="preCtn"]');
						$noPreview = $html.filter('[data-role="noPreview"]');

						$myModal.append($selModalHeader);
						$myModal.append($selModalBody);
						$myModal.append($selModalFooter);
						$myModal.append($preCtn);
						setKpiMain();
						initflag = true;
					}
				});
			};
			//模态框恢复
			var app_name;
			var data_eType;
			var resume = function(urlParams, lableFlag) {
				//处理lable恢复时候参数
				if(lableFlag) {
					___lableFlag = true;
				} else {
					___lableFlag = false;
				}
				clearModal();
				resumeFlag = true;
				nextFlag = false;
				var appHtmlArr = new Array(),
					objHtmlArr = new Array();
				if(!$.isEmptyObject(urlParams)) {
					var objectid = /\[\"(.+?)\"\]/.exec(urlParams.params);
					app_name = urlParams.appandservername.split("-")[0];
					$.ajax({
						"type": "POST",
						"url": "EchartsManageAction_getWorkSpaceEidtData.do",
						"async": false,
						"data": { 'instanceId': urlParams.instanceId, "objectId": objectid[1] },
						"success": function(data) {
							if(data.status) {
								//								debugger;
								var data = data.content.EditData,
									app_id = data.appId,
									app_name2 = app_name,
									obj_id = data.objectId,
									objType = data.l2CateName;
								data_eType = data.eType;
								//							    resumeMuliti(app_id,'[data-role="app_Sel"]','#appDiv','#multiApp',appHtmlArr,setObjType);
								$('[data-role="app_Sel"]').val(app_name2);
								$('#multiApp', ___$el).val(app_id);
								addObj2Global(appArrObj, app_id);
								setObjType();
								resumeSel('#ObjTypeSel', objType, setObj);
								isResume = true;
								$("#multiObj").val(obj_id).trigger("change");
								$("#kpiClassifySel").val(data.category).trigger("change");
								$("#kpiCurSel").val(data.metric).trigger("change");

								//						    	debugger;
								//						    	$("#radioTb>tbody>tr").each(function(){
								//						    		/*if($(this).find("td").filter("[value*="+data.eType+"]").length>0){
								//						    			$(this).find("td").eq(0).trigger("click");
								//						    		}*/
								//						    		console.log($(this))
								//						    	})

							}
						}
					});

					//							var kpi_def_id = urlParams.kpi_def_id,
					//							showId = urlParams.showId,
					//							app_id = urlParams.app_idr||urlParams.app_id,
					//							obj_id = urlParams.obj_idr||urlParams.obj_id,
					//							objType = urlParams.objType;
					//							var kpiData = resumeKpiData(kpi_def_id);
					//							resumeMuliti(app_id,'[data-role="app_Sel"]','#appDiv','#multiApp',appHtmlArr,setObjType);
					//							resumeSel('#ObjTypeSel',objType,setObj);
					//							if(objType!="业务监控"){
					//								resumeMuliti(obj_id,'[data-role="obj_Sel"]','#objDiv','#multiObj',objHtmlArr,setMonitorObj);
					//							}
					//							var obj_classify = getArrStrIndex(1,',');
					//							if(obj_classify=='OS'||obj_classify=='TRA'){
					//								resumeSel('#monitorObjSel',kpiData[0],setObjTypeSel);
					//								resumeSel('#objTypeSel',kpiData[1],setKpiClassify);
					//							}else{
					//								setMonitorObj();
					//							}
					//							resumeSel('#kpiClassifySel',kpiData[2],setKpiCur);
					//							isResume = true;
					//							resumeSel('#kpiCurSel',kpiData[3],showKpiTab);
					//							$('#radioTb input',___$el).each(function(){
					//								var value = $(this).val();
					//								if(value.indexOf(showId)!==(-1)){
					//									$(this).parent().click();
					//								}
					//							});
				}
				resumeFlag = false;
			}

			function resumeKpiData(kpi_def_id) {
				var retrundata;
				//						$.ajax({
				//							"type" : "POST",
				//							"url" : "KpiSelectAction_setkpiData.do",
				//							"async":false,
				//							"data" : {'kpi_Def_ID':kpi_def_id},
				//							"success" : function(data) {
				//								if (data.status) {
				//									retrundata = data.content.kpiData[0];
				//								}
				//							}
				//						});
				return retrundata
			}

			function resumeSel(selectorStr, selectHtml, nextFun) {
				var $tempSel = $(selectorStr, ___$el).find('option:contains(' + selectHtml + ')');
				if($tempSel.length == 1) {
					$tempSel.eq(0).attr('selected', true);
				} else if($tempSel.length > 1) {
					$tempSel.each(function() {
						if($(this).html() == selectHtml) {
							$(this).attr('selected', true);
						}
					});
				}
				if(!nextFlag || selectorStr == '#ObjTypeSel') {
					nextFun();
				}
			}

			function resumeMuliti(idArr, clickInp, clickCtn, selectorStr, HtmlArr, nextFun) {
				var $selCtn = $(selectorStr, ___$el);
				for(var i = 0, len = idArr.length; i < len; i++) {
					HtmlArr.push($selCtn.find('[value=' + idArr[i] + ']').html());
				}
				$(clickInp, ___$el).click();
				if(HtmlArr.length) {
					for(var i = 0, len = HtmlArr.length; i < len; i++) {
						var $tempSel = $(clickCtn, ___$el).find('.ms-selectable').find('span:contains(' + HtmlArr[i] + ')');
						if($tempSel.length == 1) {
							$tempSel.eq(0).click();
						} else if($tempSel.length > 1) {
							$tempSel.each(function() {
								if($(this).html() == HtmlArr[i]) {
									$(this).click();
								}
							});
						}
					}
				}
				destroyMulti(selectorStr);
				nextFun();
			}

			function nextHleper(nextFun) {
				if(nextFlag) {
					nextFun();
					if(!resumeFlag) {
						nextFlag = false;
					} else {
						nextFlag = true;
					}
				}
			}
			//模态框启动
			var start = function() {
				clearModal();
				if(!initflag) {
					initModal();
					addSelEvent();
				}
			}
			//					清除模态框，回归初始化状态
			var clearModal = function() {
				destroyMultis(2);
				clearOthers(0);
				for(var key in countArrObj) {
					countArrObj[key] = 0;
				}
				setApp();
			}

			$(___$el).on("change", "#multiObj", function() {
				//						console.log($("option",this).filter("[selected]").text());
				objArrObj = [];
				addObj2Global(objArrObj, $(this).val());
				$('[data-role="obj_Sel"]', ___$el).val($(this).val());
				$('#monitorObjSel ', ___$el).empty();
				$('#monitorObjSel', ___$el).append('<option value=' + $("option", this).filter("[selected]").text() + '>' + $("option", this).filter("[selected]").text() + '</option>');
			})

			//获取参数
			var getAppIds = function() {
				return getJsonValueArr(appArrObj);
			}
			var getObjIds = function() {
				return getJsonValueArr(objArrObj);
			}
			var getAppIdsSer = function() {
				var objIds = getObjIds(),
					appIdsSer = new Array();
				if(objIds && objIds.length) {
					for(var i = 0, len = objIds.length; i < len; i++) {
						var appIdSer = $('#multiObj', ___$el).find('[value="' + objIds[i] + '"]').eq(0).attr('data-value');
						appIdsSer.push(appIdSer);
					}
				}
				return appIdsSer;
			}
			var getRadioData = function() {
				var radioData = $('#radioTb input:checked', ___$el).val();
				if(radioData) {
					return $('#radioTb input:checked', ___$el).val().split(",");
				}
			}
			var getKpiName = function() {
				var kpiName = $('#radioTb input:checked', ___$el).parent().parent().children().eq(4).text();
				if(kpiName.indexOf('-') > -1) {
					kpiName = kpiName.split("-")[0];
				}
				return kpiName;
			}
			var getAppAndObj = function(appArr, objArr) {

				var app = $('[data-role="app_Sel"]', ___$el).val(),
					obj = $('#monitorObjSel', ___$el).val();
				app = $('#multiApp option', ___$el).filter("[value=" + app + "]").text();
				//				app = appobjSplit(app, appArr);
				//						obj = appobjSplit(obj,objArr);
				if(app && obj) {
					return app + "-" + obj;
				} else if(app && !obj) {
					return app;
				} else if(obj && !app) {
					return obj;
				} else {
					return "";
				}
			}
			var saveConfirm = function() {
				var tabshow = $('#radioTb', ___$el).hasClass('hide'),
					app = $('[data-role="app_Sel"]', ___$el).val(),
					obj = $('[data-role="obj_Sel"]', ___$el).val(),
					objClassify = getArrStrIndex(1, ','),
					radioData = getRadioData();
				if(!tabshow && radioData && app && objClassify == "TRA") {
					return true;
				} else if(tabshow || !app || !obj || !radioData) {
					return false;
				} else {
					return true;
				}
			}
			//添加事件绑定
			var addSelEvent = function() {
				//				$(___selector, ___$el).off('mouseover').on('mouseover', function(event) {
				//					var $appDiv = $(event.target || window.event.srcElement).closest('#appDiv'),
				//						$objDiv = $(event.target || window.event.srcElement).closest('#objDiv'),
				//						objClassify = getArrStrIndex(1, ',');
				//					if($appDiv.length == 0 && !($('#multiApp', ___$el).hasClass('hide'))) {
				//						destroyMulti('#multiApp');
				//						if(objTypeInitFlag) {
				//							clearOthers(0);
				//							clearJson.clearSelKpisCtn();
				//							setObjType();
				//						} else {
				//							if(objClassify == "TRA") {
				//								$('[data-role="obj_Sel"]', ___$el).attr('disabled', true);
				//								$('#monitorObjSel', ___$el).empty();
				//								$('#monitorObjSel', ___$el).append('<option value="交易监控">交易监控</option>');
				//								clearOthers(3);
				//								setObjTypeSel();
				//							} else {
				//								clearJson.clearObj();
				//								setObj();
				//							}
				//						}
				//					}
				//					/*if($objDiv.length==0&&!($('#multiObj',___$el).hasClass('hide'))){
				////	                        if($objDiv.length==0){
				//								destroyMulti('');
				//								if(!$('#monitorObjSel',___$el).val()){
				//									setMonitorObj();
				//								}
				//							}*/
				//				});
				___context.delegateEvents({
					'change #multiApp': function() {
						appArrObj = [];
						addObj2Global(appArrObj, $(this).val());
						$('[data-role="app_Sel"]', ___$el).val($(this).val());
						clearOthers(0);
						clearJson.clearSelKpisCtn();
						setObjType();

					},

					'click [data-role="saveBtn"]': function() {
						preCharts && preCharts.dispose();
						saveFun();
					},
					'click #clo_btn': function() {
						preCharts && preCharts.dispose();
					},
					'click #cancel': function() {
						preCharts && preCharts.dispose();
					},
					'click #selKpiChange': function() {
						setKpiMain();
					},
					'click [data-role="app_Sel"]': function() {
						clickApp();
					},
					'click [data-role="obj_Sel"]': function() {
						if($('#ObjTypeSel', ___$el).val()) {
							clickObj();
						} else {
							warning('请选择对象类型');
						}
					},
					'change #ObjTypeSel': function() {
						clearOthers(1);
						setObj();
						clearJson.clearSelKpisCtn();
					},
					'change #multiObj': function() {
						clearOthers(2);
						setMonitorObj();
					},

					'change #monitorObjSel': function() {
						clearOthers(3);
						setObjTypeSel();
					},
					'change #objTypeSel': function() {
						clearOthers(4);
						setKpiClassify();
					},

					'change #kpiClassifySel': function() {
						clearOthers(5);
						setKpiCur();
					},
					'change #kpiCurSel': function() {
						clearOthers(6);
						showKpiTab();
					},
					'click #selKpiInp': function() {
						if(!$('[data-role="obj_Sel"]', ___$el).val() && getArrStrIndex(1, ',') != 'TRA') {
							warning('请先选择对象');
						}
					},
					'keydown #selKpiInp': function(event) {
						if(event.which == 13) {
							search();
							clearJson.clearSelKpisCtn();
							clearJson.clearPerview();
							clearJson.clearKpiTab();
						}
					},
					'click #selKpisCtn': function(event) {
						var $ctn = $(event.target || window.event.srcElement).closest('div');
						if($ctn.hasClass('sel-kpi-ctn')) {
							$(".sel-cur-kpi", ___$el).removeClass('sel-cur-kpi');
							$ctn.addClass('sel-cur-kpi');
							clearJson.clearKpiTab();
							clearJson.clearPerview();
							showKpiTab(true);
						}
					},
					'click #radioTb': function(event) {
						var $td = $(event.target || window.event.srcElement).closest('td');
						if($td) {
							var $target = $td.parent().children().eq(4).find('img');
							if($target.attr('data-role') == 'preview') {
								$('[data-role="preview"]', ___$el).attr('src', './img/kpisel/preview.png');
								$('.sel-perviewed', ___$el).removeClass('sel-perviewed');
								$target.attr('src', './img/kpisel/preview_onclick.png');
								$target.addClass('sel-perviewed');
								$preCtn.removeClass('hide');
								createPre($td);
							} else {
								clearJson.clearPerview();
							}
							$td.parent().children().eq(0).find('input').attr('checked', 'true');
						}
					}
				});
			}
			//应用点击事件
			function clickApp() {
				var $appInput = $('[data-role="app_Sel"]', ___$el),
					$appCtn = $('#appDiv', ___$el),
					$appSel = $('#multiApp', ___$el);
				//				initMulti($appInput, $appCtn, $appSel, 'app', appArrObj, '应用');
			}
			//服务器点击事件
			function clickObj() {
				var $objInput = $('[data-role="obj_Sel"]', ___$el),
					$objCtn = $('#objDiv', ___$el),
					$objSel = $('#multiObj', ___$el);
				//						initMulti($objInput,$objCtn,$objSel,'obj',objArrObj,'对象');
			}
			//初始化多选插件
			function initMulti($inputObj, $limitCtn, $selCtn, countName, global, disableName) {
				$selCtn.removeClass('hide');
				$selCtn.multiSelect({
					selectableHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='请输入搜索内容'>",
					selectionHeader: "<input type='text' class='search-input sel-disabled' autocomplete='off' placeholder='已选择" + disableName + "：" + countArrObj[countName] + "' disabled> ",
					afterInit: function(ms) {
						var that = this,
							$selectableSearch = that.$selectableUl.prev(),
							selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)';

						that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
							.on('keydown', function(e) {
								if(e.which === 40) {
									that.$selectableUl.focus();
									return false;
								}
							});
					},
					afterSelect: function(value) {
						addObj2Global(global, value[0]);
						setMultiInput($inputObj, $limitCtn);
						$('.search-input', $limitCtn).eq(1).attr('placeholder', '已选择' + disableName + '数：' + (++countArrObj[countName]));
						setMonitorObj();
						validateAppFlag();
					},
					afterDeselect: function(value) {
						$('.search-input', $limitCtn).eq(1).attr('placeholder', '已选择' + disableName + '数：' + (--countArrObj[countName]));
						setMultiInput($inputObj, $limitCtn);
						removeObjFromGlobal(global, value[0]);
						setMonitorObj();
						validateAppFlag();
					}
				});
			}
			//判断是否APP之后内容是否初始化标示
			function validateAppFlag() {
				var appIdArr = getJsonValueArr(appArrObj),
					obj_classify = getArrStrIndex(1, ','),
					obj_type = getArrStrIndex(0, ',');
				if(obj_classify && obj_type && !$.isEmptyObject(appIdArr)) {
					if(obj_classify == 'TRA') {
						objTypeInitFlag = false;
					} else {
						//								$.ajax({
						//									"type" : "POST",
						//									"url" : "EchartsManageAction_getMetricCate.do",
						//									"async":false,
						//									"data" : {/*appIdArr:JSON.stringify(appIdArr),obj_type:obj_type,obj_classify:obj_classify*/},
						//									"success" : function(data) {
						//										console.log(data);
						//										if (data.status) {
						//											var objList = data.content.objList,
						//											obj_id = objList.obj_id;
						//											if(obj_id&&obj_id.length&&obj_id.length>0){
						//												objTypeInitFlag = false;
						//											}else{
						//												objTypeInitFlag = true;
						//											}
						//										}else{
						//											objTypeInitFlag = true;
						//										}
						//									}
						//								});
					}
				} else {
					objTypeInitFlag = true;
				}
			}
			//多选插件清除，根据类型判断
			function destroyMulti(multiCtnStr) {
				$(multiCtnStr, ___$el).multiSelect && $(multiCtnStr, ___$el).multiSelect('destroy');
				$(multiCtnStr, ___$el).addClass('hide');
			}

			function destroyMultis(destroyNum) {
				var multiArr = ['', ''];
				for(var i = 0; i < destroyNum; i++) {
					destroyMulti(multiArr[i])
				}
			}
			//把json对象中的key组合成为一个数组
			function getJsonValueArr(json) {
				var returnv = new Array();
				for(var key in json) {
					returnv.push(key);
				}
				return returnv;
			}
			//给全局json添加值
			function addObj2Global(global, value) {
				global[value] = value;
			}
			//给全局json删除值
			function removeObjFromGlobal(global, value) {
				delete global[value];
			}
			//多选input框数据设置
			function setMultiInput($input, $limit) {

				var inputStr = '';
				$('.ms-elem-selectable.ms-selected', $limit).each(function(index) {
					if(index == 0) {
						inputStr += $(this).find('span').eq(0).html();
					} else {
						inputStr += ',' + $(this).find('span').eq(0).html()
					}
				})
				$input.val(inputStr);
			}
			//app初始化
			function setApp() {
				clearJson.clearApp();
				$.ajax({
					"type": "POST",
					"async": false,
					"url": "ShowUserPrivilegeAction_getAppsData.do",
					"data": {},
					"success": function(data) {
						if(data.status) {
							var appList = data.content.appView.appList;
							var $multiApp = $('#multiApp', ___$el);
							for(var i = 0, len = appList.length; i < len; i++) {
								var obj_id = appList[i].appSummary.objectId;
								var c_name = appList[i].appSummary.appName;
								$multiApp.append('<option value="' + obj_id + '">' + c_name + '</option>');
							}
						}
					}
				});
			}
			//对象分类初始化
			function setObjType() {
				var $objTypeSel = $('#ObjTypeSel', ___$el);
				if($('[data-role=app_Sel]', ___$el).val()) {
					$.ajax({
						"type": "POST",
						"url": "EventListAction_getObjectCategory.do",
						"async": false,
						"data": {},
						"success": function(data) {
							if(data.status) {
								var objTypeList = data.content.objectCate,
									optionGrp = {};
								clearJson.clearObjType();
								for(var i = 0, len = objTypeList.length; i < len; i++) {
									if(!(optionGrp[objTypeList[i].levelOneName])) {
										var optgrp = $('<OPTGROUP>', {
											'label': (objTypeList[i].levelOneName)
										});
										$objTypeSel.append(optgrp);
										optionGrp[objTypeList[i].levelOneName] = optgrp;
										if(!objTypeList[i].categoryId) {
											objTypeList[i].categoryId = objTypeList[i].obj.categoryId;
										}
										var option = $('<OPTION>', {
											'value': objTypeList[i].levelOneName + ',' + objTypeList[i].levelTwoName + ',' + objTypeList[i].categoryId,
											'html': objTypeList[i].levelTwoName
										}).appendTo(optionGrp[objTypeList[i].levelOneName]);
									} else {
										if(objTypeList[i].levelTwoName == objTypeList[i - 1].levelTwoName) {
											continue;
										} else {
											var option = $('<OPTION>', {
												'value': objTypeList[i].levelOneName + ',' + objTypeList[i].levelTwoName + ',' + objTypeList[i].categoryId,
												'html': objTypeList[i].levelTwoName
											}).appendTo(optionGrp[objTypeList[i].levelOneName]);
										}
									}
								}

							}
						}
					});
				} else {
					clearJson.clearObjType();
				}
			}
			//对象选择框初始化
			function setObj() {
				var appIdArr = getJsonValueArr(appArrObj),
					levelTwoName = getArrStrIndex(1, ','),
					levelOneName = getArrStrIndex(0, ',');
				if(!levelOneName) { return };
				if(levelOneName == 'TRA') {
					$('[data-role="obj_Sel"]', ___$el).attr('disabled', true);
					$('#monitorObjSel', ___$el).empty();
					$('#monitorObjSel', ___$el).append('<option value="交易监控">交易监控</option>');
					setObjTypeSel();
				} else {
					$('[data-role="obj_Sel"]', ___$el).attr('disabled', false);
					$.ajax({
						"type": "POST",
						"url": "EchartsManageAction_getSecondCategoryObjects.do",
						//								"url" : "EchartsManageActionBean_getThirdCategoryObjects.do",
						"async": false,
						"data": { appIds: appIdArr, levelOneTwoName: [levelOneName + "," + levelTwoName] },
						//								"data" : {appIds:appIdArr,levelOneTwoName:[levelOneName+","+levelTwoName+",X86虚拟机"]},
						"success": function(data) {
							if(data.status) {
								var objList = data.content.cate2Objects;
								if(!objList.length) {
									warning('所选类型无选择对象，请重新选择');
									clearOthers(0);
									clearJson.clearSelKpisCtn();
									setObjType();
								} else {
									for(var i = 0, len = objList.length; i < len; i++) {
										var obj_id = objList[i].obj.objectId;
										var app_id = objList[i].appId;
										var c_name = objList[i].obj.objectName;
										var server_name = objList[i].server.serverName;
										var $mulitObj = $('#multiObj', ___$el);
										if(c_name) {
											if(app_id) {
												if($mulitObj.find('[value="' + obj_id + '"]').length == 0) {
													$mulitObj.append('<option value="' + obj_id + '" data-value="' + obj_id + '">' + c_name + '</option>');
												}
											} else {
												if(server_name) {
													$mulitObj.append('<option value="' + obj_id + '">' + server_name + '__' + c_name + '</option>');
												} else {
													$mulitObj.append('<option value="' + obj_id + '">' + c_name + '</option>');
												}
											}
										}
									}
									//										$('#monitorObjSel',___$el).append('<option value='+$("#multiObj",___$el).val()+'>'+$("option","#multiObj").eq(0).text()+ '</option>');
									//											$("#multiObj",___$el).trigger("change");
								}

								//										

							}
						}
					});
				}
			}
			//监控对象栏初始化
			function setMonitorObj() {
				var obj_classify = getArrStrIndex(1, ','),
					obj_type = getArrStrIndex(0, ',');
				//						var monObj = $('[data-role="obj_Sel"]', ___$el).val();
				var monObj = $('#multiObj option', ___$el).eq(0).text();
				$('#monitorObjSel', ___$el).empty();
				if(monObj) {
					$('#monitorObjSel', ___$el).append('<option value="' + monObj + '">' + monObj + '</option>');
				} else {
					$('#monitorObjSel', ___$el).append('<option value="">--请选择--</option>');
				}

				$('#objTypeSel', ___$el).empty();
				if(obj_classify) {
					$('#objTypeSel', ___$el).append('<option value="' + obj_classify + '">' + obj_classify + '</option>');
				}

				setKpiClassify();
				//						if(obj_classify!='OS'){
				//							$('#monitorObjSel', ___$el).empty();
				//							$('#monitorObjSel', ___$el).append('<option value="'+ flagJson[obj_classify]+ '">'+ flagJson[obj_classify]+ '</option>');
				//							$('#objTypeSel', ___$el).empty();
				//							$('#objTypeSel', ___$el).append('<option value="'+ obj_type+ '">'+ obj_type+ '</option>');
				//							setKpiClassify();
				//						}else if(obj_classify=='TRA'){
				//							$('#monitorObjSel', ___$el).empty();
				//							$('#monitorObjSel', ___$el).append('<option value="交易监控">交易监控</option>');
				//							setObjTypeSel();
				//						}else{
				//							appendOption('#monitorObjSel','KpiSelectAction_setOsMonitorObj.do',null);
				//							nextHleper(setObjTypeSel);
				//						}
			}
			//对象类型初始化
			function setObjTypeSel() {
				var monitorSel = $('#monitorObjSel', ___$el).val(),
					obj_type = getArrStrIndex(0, ',');
				if(monitorSel == '操作系统') {
					$('#objTypeSel', ___$el).empty();
					$('#objTypeSel', ___$el).append('<option value="' + obj_type + '">' + obj_type + '</option>');
					setKpiClassify();
				} else {
					appendOption('#objTypeSel', 'KpiSelectAction_setObjTypeSel.do', { monitorObj: monitorSel });
					nextHleper(setKpiClassify);
				}
			}
			//指标分类初始化
			//需要从得到mobjId和cateId的值
			function setKpiClassify() {
				var monitorSel = $('#monitorObjSel', ___$el).val(),
					//						objTypeSel = $('#objTypeSel', ___$el).val(),
					//						obj_type = getArrStrIndex(0,',');
					mobjIdarr = $("#multiObj", ___$el).val(),
					cateId = getArrStrIndex(2, ',');
				if(mobjIdarr) {
					mobjId = mobjIdarr;
				}
				//				console.log(mobjId, cateId);
				appendOption('#kpiClassifySel', 'AppTriggerConfigAction_queryMetricGroup.do', { mobjId: mobjId, cateId: cateId });
				nextHleper(setKpiCur);
			}
			//指标栏初始化 
			//需要从指标那里得到
			function setKpiCur() {
				var monitorSel = $('#monitorObjSel', ___$el).val(),
					objTypeSel = $('#objTypeSel', ___$el).val(),
					kpiClassify = $('#kpiClassifySel', ___$el).val();
				//						metricCategory = $('#kpiClassifySel',___$el).val();
				appendOption('#kpiCurSel', 'AppTriggerConfigAction_queryMetricOfGroup.do', { metricGroup: kpiClassify }, 1);
				nextHleper(showKpiTab);
			}
			//表格展示
			function showKpiTab(flag) {
				var kpi_Def_ID = $('#kpiCurSel', ___$el).val();
				if(flag) {
					kpi_Def_ID = $('.sel-cur-kpi', ___$el).eq(0).val();
				} else {

				}
				$('#radioTb', ___$el).removeClass('hide');

				$.ajax({
					type: 'post',
					async: 'false',
					url: 'EchartsInsConfAction_findAimCfgEchartPageByMetriName.do',
					data: {
						metriName: kpi_Def_ID
					},
					success: function(data) {
						if(data.status) {
							var data = data.content.aimConfigEchartsInstance;
							var count = 0;
							if(data && data.length) {
								for(var i = 0; i < data.length; i++) {
									count++;
									var value = data[i].inst.id + "," + data[i].inst.eType + "," + data[i].inst.unit;
									$('#radioTb>tbody', ___$el).append('<tr><td><input type="radio" name="classify" value="' + value + '" style="margin-top: -2px;">' + (i + 1) + '</td></tr>');
									$("#radioTb>tbody tr:last", ___$el).append('<td>' + data[i].inst.tName + '</td>');
									$("#radioTb>tbody tr:last", ___$el).append('<td>' + ((data[i].inst.eType == "line" || data[i].inst.eType == "linepool") ? "折线图" : data[i].inst.eType == "bar" ? "柱状图" : "表格") + '</td>');
									$("#radioTb>tbody tr:last", ___$el).append('<td>' + data[i].inst.name + '<input type="hidden" data-role="kpishowname" value=' + data[i].inst.name + ' />' + '</td>');
									var $td;
									if(data[i].inst.eType != "table") {
										$td = $('<td>').append($preview.clone());
									} else {
										$td = $('<td>').append($noPreview.clone());
									}
									$("#radioTb>tbody tr:last", ___$el).append($td);
								}
							}
							//在无lable的情况下提示
							if(count == 0) {
								app.alert('该指标无标签类型展示，请选择其他指标！');
							}
							//避免在resume状态时的重复点击
							if(!isResume) {
								$("#radioTb>tbody td:first", ___$el).click();
							} else {
								isResume = false;
							}
							//							debugger;
							if(data_eType) {
								$('#radioTb input', ___$el).each(function() {
									var value = $(this).val();
									if(value.indexOf(data_eType) !== (-1)) {
										$(this).parent().click();
									}
								});
							}
						}
					}
				});
			}
			//搜索选取和分类选取切换
			function setKpiMain() {
				clearJson.clearPerview();
				if(___flag == 1) {
					$('#selKpiTitle', ___$el).find('h3').html('指标搜索选取');
					$('#selKpiTitle', ___$el).find('span').html('分类选取');
					$('#selKpiSea', ___$el).removeClass('hide');
					$('#selKpiChoose', ___$el).addClass('hide');
					$('#radioTb', ___$el).addClass('hide');
					___flag = 2;
				} else {
					$('#selKpiTitle', ___$el).find('h3').html('指标分类选取');
					$('#selKpiTitle', ___$el).find('span').html('搜索选取');
					$('#selKpiSea', ___$el).addClass('hide');
					$('#selKpiChoose', ___$el).removeClass('hide');
					$('#radioTb', ___$el).addClass('hide');
					___flag = 1;
				}
			}

			function appendOption(selector, url, reqData, flag) {
				nextFlag = false;
				$.ajax({
					"type": "POST",
					"url": url,
					"async": false,
					"data": reqData,
					"success": function(data) {
						if(data.status) {
							var selList;
							if(flag == 1) {
								selList = data.content.data;
							} else {
								selList = data.content.data;
							}

							$(selector, ___$el).empty();
							$(selector, ___$el).append('<option value="">--请选择--</option>');
							if(selList.length == 0 && mobjId && cateId) {
								app.alert('所选项目下无选项，请选择其他选项');
								nextFlag = false;
							} else {
								for(var i = 0, len = selList.length; i < len; i++) {
									if(flag == 1) {
										$(selector, ___$el).append('<option value="' + selList[i].name + '">' + selList[i].displayName + '</option>');
									} else {
										$(selector, ___$el).append('<option value="' + selList[i].metricGroup + '">' + selList[i].metricGroupName + '</option>');
									}
								}
								nextFlag = false;
							}
						}
					}
				});
			}
			//警告框方法
			function warning(warning) {
				app.warning({
					title: '警告',
					content: warning,
					btnConfirm: '确定'
				});
			}
			//获得以splitStr分隔的value值的的index上的字符串
			function getArrStrIndex(index, splitStr) {
				var value = $('#ObjTypeSel', ___$el).val();
				var Arr = value.split(splitStr);
				return Arr[index];
			}
			//批量清除下拉框
			function clearOthers(clearNum) {
				var initArr = ['clearObjType', 'clearObj', 'clearMonitorObj', 'clearObjTypeSel', 'clearKpiClassifySel', 'clearKpiCurSel', 'clearKpiTab', 'clearPerview'];
				for(var i = initArr.length - 1; i >= clearNum; i--) {
					clearJson[initArr[i]]();
				}
			}

			function getTbStr(showType, state) {
				var TbStr;
				var showTypeStr;
				var stateStr;
				if(showType === "line") {
					showTypeStr = "折线图/柱状图";
					if(state === "01") {
						stateStr = "固定图例";
					} else if(state === "02") {
						stateStr = "固定图例动态打点";
					} else if(state === "11") {
						stateStr = "动态图例";
					} else {
						stateStr = "动态图例动态打点";
					}
				} else if(showType === "pie") {
					showTypeStr = "饼状图/漏斗图";
					if(state === "0") {
						stateStr = "固定图例";
					} else {
						stateStr = "动态图例";
					}
				} else if(showType === "lable") {
					showTypeStr = "标签";
					stateStr = "默认模式";
				} else {
					showTypeStr = "表格";
					if(state === "0") {
						stateStr = "前端分页";
					} else {
						stateStr = "服务端分页";
					}
				}
				TbStr = [showTypeStr, stateStr];

				return TbStr;
			}

			function search() {
				$('#selKpisCtn', ___$el).empty();
				var condition = $('#selKpiInp', ___$el).val(),
					obj_classify = getArrStrIndex(1, ','),
					obj_type = getArrStrIndex(0, ',');
				$.ajax({
					"type": "POST",
					"url": 'KpiSelectAction_searchKpi.do',
					"data": { condition: condition, obj_classify: obj_classify, obj_type: obj_type, appIdArr: JSON.stringify(getJsonValueArr(appArrObj)) },
					"success": function(data) {
						if(data.status) {
							var searchData = data.content.searchData;
							if(searchData.length) {
								for(var i = 0, len = searchData.length; i < len; i++) {
									var $kpiCtnC = $kpiCtn.clone().empty();
									$kpiCtnC.val(searchData[i][0]);
									$kpiCtnC.html(searchData[i][1]);
									$('#selKpisCtn', ___$el).append($kpiCtnC);
								}
							} else {
								app.alert("未找到对应指标，请修改查询条件");
							}
						}
					}
				});
			}

			function appobjSplit(str, arr) {
				if(arr.length == 1) {
					return str;
				} else {
					return "";
				}
			}

			function createPre(target) {
				var valStr = target.parent().find('input').val();
				var showname = target.parent().find('td').eq(3).html();
				$('#preTitle', ___$el).html(showname);
				var valArr = valStr.split(',');
				var appIdArr = getJsonValueArr(appArrObj);
				var objIdArr = getJsonValueArr(objArrObj);
				var urlParams;
				if(getArrStrIndex(1, ',') == "OS") {
					urlParams = { "app_id": appIdArr, "kpi_def_id": valArr[0], "server_id": objIdArr, "showType": "line", "state": valArr[2], "showId": valArr[4], "queryFlag": "1", "count_type": "now" };
				} else if(getArrStrIndex(1, ',') == "TRA") {
					urlParams = { "app_id": appIdArr, "kpi_def_id": valArr[0], "showType": "line", "state": valArr[2], "showId": valArr[4], "queryFlag": "1", "count_type": "now" };
				} else {
					urlParams = { "kpi_def_id": valArr[0], "obj_id": objIdArr, "showType": "line", "state": valArr[2], "showId": valArr[4], "queryFlag": "1", "count_type": "now" };
				}
				preCharts && preCharts.dispose();
				var newFlag = false;
				if(valArr[2] == "秒") {
					valArr[2] = "日期"
				}
				preCharts = app.showEcharts({ //业务失败流水echarts图
					handler: handler,
					context: $el,
					selector: '#preChartsCtn',
					eType: valArr[1],
					url: 'EchartsManageAction_getEchartsConfig.do',
					unit: valArr[2],
					urlParams: {
						instanceId: valArr[0],
						styleId: 1,
						params: JSON.stringify({ "time": 60, "interval": 1, "objectId": objIdArr })
					},
					items: ['-'],
					beforefn: function(data) {
						if(data.content.echartsData && data.content.echartsData.items) {
							preCharts.changeItems(data.content.echartsData.items);
						}
					},
					succfn: function(data) {
						if(valArr[2] == '%') {
							preCharts.getEchartsObj().setOption({
								yAxis: [{ max: 100 }]
							});
						}
						if(valArr[2] == "") {
							preCharts.getEchartsObj().setOption({
								yAxis: [{
									type: "value",
									Interval: 1,
									min: 0,
									max: 1,
									splitNumber: 1
								}]
							});
						}
						if(valArr[2] == "日期" && valArr[1] == "bar" && data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length != 0) {
							var min = (function(data) {
								var res = [];
								for(var i = 0; i < data.length; i++) {
									if(data[i] != "0") {
										res.push(new Date(data[i]).getTime());
									}
								}
								return new Date(Math.min.apply(null, res)-2592000000);
							})(data.content.echartsData.line1);
							preCharts.getEchartsObj().setOption({
								xAxis: [{
									axisLabel: {
										rotate: -30,
										interval: 0
									}
								}],
								yAxis: [{
									type: "time",
							     	min: min,
									data: data.content.echartsData.time
								}],
								tooltip: [{
									trigger: "axis",
									formatter: function(params) {
										var res = params[0].name + "</br>";
										var data0 = params[0].data;
										res += params[0].seriesName + ":" + data0;
										return res;
									}

								}],
								series: [{
									//name: data.content.echartsData.items[0],
									type: 'bar',
									barGap: '0%',
									barWidth: 10,
									data:(function(data) {
										var res = [];
										for(var i = 0; i < data.length; i++) {
											if(data[i] == "0") {
												data[i]='-';
											}
											res.push(data[i]);
										}
										return res;
									})( data.content.echartsData.line1),
									markPoint: {
										symbol: 'pin',
										symbolSize: 30,
										label: {
											normal: {
												show: false,
												position: 'inside',
											}
										},
										data: (function(data) {
											var res = [];
											for(var i = 0; i < data.length; i++) {
												res.push({
													value: data[i],
													xAxis: i,
													yAxis: data[i]
												});
											}
											return res;
										})(data)
									}
								}]
							});
							newFlag = true;
						}

						if(valArr[1] != "bar") { return }

						if(newFlag) {
							return;
						} else if(data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length != 0) {
							var data = data.content.echartsData.line1;
							preCharts.getEchartsObj().setOption({
								xAxis: [{
									axisLabel: {
										rotate: -30,
										interval: 0
									}
								}],

								series: [{
									//name: data.content.echartsData.items[0],
									type: 'bar',
									barGap: '0%',
									barWidth: 10,
									data: data,
									markPoint: {
										symbol: 'pin',
										symbolSize: 30,
										label: {
											normal: {
												show: true,
												position: 'inside',
											}
										},
										data: (function(data) {
											var res = [];
											for(var i = 0; i < data.length; i++) {
												res.push({
													value: data[i],
													xAxis: i,
													yAxis: data[i]
												});
											}
											return res;
										})(data)
									}
								}]
							});

							newFlag = true;
						}
					}
				});
				preCharts.start();
			}

			var clearJson = {
				clearApp: function() {
					$('[data-role="app_Sel"]', ___$el).val('');
					$('#multiApp', ___$el).empty();
					$('#multiApp', ___$el).append('<option value="">--请选择--</option>');
					appArrObj = {};
				},
				clearObjType: function() {
					$('#ObjTypeSel', ___$el).empty();
					$('#ObjTypeSel', ___$el).append('<option value="">--请选择--</option>');
				},
				clearObj: function() {
					countArrObj['obj'] = 0;
					$('#multiObj', ___$el).empty();
					$('[data-role="obj_Sel"]', ___$el).val('');
					$('#multiObj', ___$el).append('<option value="">--请选择--</option>');
					objArrObj = {};
				},
				clearMonitorObj: function() {
					$('#monitorObjSel', ___$el).empty();
					$('#monitorObjSel', ___$el).append('<option value="">--请选择--</option>');
				},
				clearObjTypeSel: function() {
					$('#objTypeSel', ___$el).empty();
					$('#objTypeSel', ___$el).append('<option value="">--请选择--</option>');
				},
				clearKpiClassifySel: function() {
					$('#kpiClassifySel', ___$el).empty();
					$('#kpiClassifySel', ___$el).append('<option value="">--请选择--</option>');
				},
				clearKpiCurSel: function() {
					$('#kpiCurSel', ___$el).empty();
					$('#kpiCurSel', ___$el).append('<option value="">--请选择--</option>');
				},
				clearKpiTab: function() {
					$('#radioTb>tbody', ___$el).empty();
					$('#radioTb', ___$el).addClass('hide');
				},
				clearPerview: function() {
					preCharts && preCharts.dispose();
					$('[data-role="preview"]', ___$el).attr('src', './img/kpisel/preview.png');
					$preCtn && $preCtn.addClass('hide');
				},
				clearSelKpisCtn: function() {
					$('#selKpisCtn', ___$el).empty();
				}
			}

			return {
				start: start,
				getAppIds: getAppIds,
				getObjIds: getObjIds,
				getRadioData: getRadioData,
				saveConfirm: saveConfirm,
				getAppAndObj: getAppAndObj,
				getKpiName: getKpiName,
				getAppIdsSer: getAppIdsSer,
				resume: resume
			}
		}

		return {
			selObj: selObj
		}
	});

})();