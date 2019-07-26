define(["jquery"],function(){
	var logInfoSliderObj = null;
	var clearConfigContentObj = null;
	var dataOutputObj = null;
	var uploadObj = null;
	return {
		
		load:function($el,scope,handler){
			var objectId,
				objectName,
				serviceIp,
				categoryId,
				applicationName;
			var activeIndex = 0,
				activeShowLogInfoArgs,
				activeShowAgentInfoArgs;
			var modifyIndex = -1;
			var activeTr = null;

			var activeClassInfo;//选中的三级分类
			var imgMap = {
				"生产应用系统": "appgroup/appgroup-production.png",
				"非生产应用系统": "appgroup/appgroup-noProduction.png",
				"中间件": "software/software-middleware.png",
				"数据库": "software/software-db.png",
				"应用程序": "software/software-app.png",
				"其他软件": "software/software-other.png",
				"物理服务器": "server/server-physics.png",
				"逻辑服务器": "server/server-logic.png",
				"配置": "network/net-config.png",
				"网络设备": "network/net-netconfig.png",
				"线路": "network/net-circuit.png",
				"物理组件": "network/net-physics.png",
				"磁盘阵列": "storage/storage-disk.png",
				"存储交换机": "storage/storage-interchanger.png",
				"备份设备": "storage/storage-backups.png",
				"UPS": "environmental/environmental-ups.png",
				"机柜": "environmental/environmental-cabinet.png",
				"配电柜": "environmental/environmental-electricBox.png",
				"空调": "environmental/environmental-airCondition.png",
				"发电机": "environmental/environmental-dynamo.png",
				"安全设备": "safety/safety-safety.png",
				"策略": "safety/safety-strategy.png",
				"用户": "safety/safety-user.png"
			};
			var $logInfoTable = $('#logInfoTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'pageLength': 8,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sourceName', defaultContent : ''//日志信息名称
				},{
					data : 'appName', defaultContent : ''//应用系统
				},{
					data : 'category1', defaultContent : ''//三级分类
				},{
					data : 'sourceType', defaultContent : ''//日志来源
				// },{
				// 	data : 'logName', defaultContent : ''//解析规则
				},{
					data : 'hostIp', defaultContent : ''//IP个数
				// },{
				// 	data : 'collectionCumulant', defaultContent : ''//采集日志量(MB)
				},{
					data : 'runStatus', defaultContent : ''//采集状态
				},{
					data : '', defaultContent : ''//操作
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						var category ='';
						if(row.category1){
							category += row.category1;
						}

						if(row.category2){
							category += '>'+row.category2;
						}

						if(row.category3){
							category += '>'+row.category3;
						}
						return category;
					},
					"targets" : 3
				},{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<p style="width: 15px;margin: 0;float: left;"><i class="fa fa-cog fa-spin" style="color: #22AC38"></i></p>|暂停<span class="link-stop fa fa-pause-circle-o" style="font-size:14px;" title="暂停"></span>';
						}else{
							return '<p style="width: 15px;margin: 0;float: left;"><i class="fa fa-cog" style="color:#aeadb3;"></i></p>|启动<span class="link-stop fa fa-play-circle-o" style="font-size:14px;" title="启动"></span>';
						}
						
					},
					"targets" : 6
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-monitor fa fa-tv" title="监控"></span><span class="link-modify fa fa-edit" title="修改" style="display:none;"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
                    },
                    "targets" : 7
				}]
			});

			var $agentTable = $('#agentTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'pageLength': 8,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'host_name', defaultContent : ''//日志信息名称
				},{
					data : 'os_type', defaultContent : ''//应用系统
				},{
					data : 'ip', defaultContent : ''//三级分类
				},{
					data : 'agent_status', defaultContent : ''//日志来源
				},{
					data : 'install_user', defaultContent : ''//解析规则
				},{
					data : '', defaultContent : ''//操作
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<i class="fa fa-cog fa-spin" style="color: #22AC38"></i>已启动';
						}else{
							return '<i class="fa fa-cog" style="color:#aeadb3;"></i>挂起';
						}
					},
					"targets" : 4
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-monitor fa fa-tv" title="监控"></span><span class="link-modify fa fa-edit" title="修改" style="display:none;"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
					},
					"targets" : 6
				}]
			});

			$('#appConfigInfo', $el).empty();
			
			var appId = scope.sysId;
			var ztreeId = ztreeIds.getId();
			$('.ztree', $el).attr('id', ztreeId);
			var setting = {
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
			//初始化左侧总分类数据
			initAllCategories();		
			
			//点击空白使弹框隐藏
			$el.click(function(e){
				if($(e.target).closest($('#logInfoSlider', $el)).length == 0 ){
					$('#logInfoSlider .close', $el).trigger('click');
				}
				$('#addLogInfo', $el).popover('hide');

				if($(e.target).closest($('#agentInfoSlider', $el)).length == 0 ){
					$('#agentInfoSlider .close', $el).trigger('click');
				}
			});

			//应用点击事件，显示对应的详细信息
			$('#appConfigInfo', $el).delegate('li', 'click', function(){
				if($(this).hasClass('checked')){return}
				objectId = $(this).attr('objectid');
				objectName = $(this).children('p').attr('title');
				
				if($(this).siblings('.checked').length){
					// var imgUrlCk = $(this).siblings('.checked').css('background-image').slice(0,-14);
					// $(this).siblings('.checked').css('background-image', imgUrlCk + '.png")');
				}
				
				// var imgUrl = $(this).css('background-image').slice(0,-6);
				// $(this).css('background-image', imgUrl + '-checked.png")');//背景图变成选中时对应的图
				
				$(this).addClass('checked').siblings().removeClass('checked');
				$('#appCtn', $el).empty().append($(this).clone().css('margin', '0'));

				if(activeClassInfo.levelOneName == '应用群组' ){
					activeShowLogInfoArgs = {querytype:'AA',queryvalue:objectId};
					// activeShowAgentInfoArgs = {querytype:'AA',queryvalue:objectId};
				}else if(activeClassInfo.levelOneName == '软件' ){
					// activeShowAgentInfoArgs = {querytype:'FF',queryvalue:objectId};
					activeShowLogInfoArgs = {querytype:'FF',queryvalue:objectId};
				}else{
					activeShowLogInfoArgs = {querytype:'YY',queryvalue:objectId};
					// activeShowAgentInfoArgs = {querytype:'YY',queryvalue:objectId};
				}
				$('#resizeHeight li.active', $el).trigger('click');
			});
/*日志信息start*/
			/**
			 *  加载日志信息
			 *  querytype取值: A1 - 应用一级分类 A2 - 应用二级分类 A3 - 应用三级分类 
			 *  AA - 应用系统编号 F1 - 软件一级分类 F2 - 软件二级分类 F3 - 软件三级分类 
			 *  FF - 软件对象编号 Y1 - 资产一级分类 Y2 - 资产二级分类 Y3 - 资产三级分类 
			 *  YY - 资产编号
			 */
			function showLogInfo(querytype, queryvalue, pageIndex) {
				activeShowLogInfoArgs = {querytype:querytype,queryvalue:queryvalue};
				var urlData = {
					queryvalue:queryvalue,
					querytype:querytype
				};
	            app.shelter.show();
				app.common.ajaxWithAfa({
					url:'LogCfgSourceAction_getSouceListByCfg.do',
					data:urlData
				}).done(function (data) {
	            	app.shelter.hide();
					$logInfoTable.clear();
					if(data.result && data.result.length > 0){
						data.result.forEach(function (item, index) {
							item.index = index+1;
						})
						$logInfoTable.rows.add(data.result).draw();
						if (pageIndex && (pageIndex >= data.result.length / 8)) {
							$logInfoTable.page(pageIndex - 1).draw( false );
						} else if (pageIndex){
							$logInfoTable.page(pageIndex).draw( false );
						}
					}else{
						$logInfoTable.draw();
					}
				})
			}

			// 事件——日志信息
			$('#logInfoTable',$el).on('click', 'tbody span.link-del', function(event) {//删除
				var tr = $logInfoTable.row($(this).parents('tr')).data();
				var pageIndex = $logInfoTable.page();
				var row = $(this).parents('tr');
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定删除日志源“'+ tr.sourceName +'”吗？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.shelter.show();
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgSourceAction_delCfgLogSource.do',
	                		data:{
	                			sourceId:tr.sourceId
	                		}
	                	}).done(function (data) {
	                		app.shelter.hide();
                			app.alert(data.result);
                			var tmp = activeShowLogInfoArgs;
                			if (data.result.indexOf('成功') !== -1) {
                    			showLogInfo(tmp.querytype, tmp.queryvalue, pageIndex)
                			}
	                	});
	                },
	                aArgs: [tr]
				});
				event.stopPropagation();
			}).on('click', 'tbody span.link-modify', function(event) {// 修改
				var tr = $logInfoTable.row($(this).parents('tr')).data();
				activeTr = tr;
				modifyIndex = $logInfoTable.page();
				showLogInfoConfig('修改',tr.sourceId, tr.sourceType, tr.appId);
				//showDataOutput(tr);
				//showUpload(tr.sourceType,tr.sourceId);
				event.stopPropagation();
			}).on('click', 'tbody span.link-stop', function(event) {// 暂停
				var $thisTr = $(this).parents('tr');
				var rowData = $logInfoTable.row($thisTr).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定'+(rowData.runStatus=="0"?'启动':'暂停')+'该条日志源信息？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	rowData.runStatus = rowData.runStatus=="0"?'1':'0';
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgSourceAction_updateRunStatus.do',
	                		data:{
	                			sourceId: rowData.sourceId,
	                			runStatus: rowData.runStatus
	                		}
	                	}).done(function (data) {
                			app.alert(data.result);
                			var tmp = activeShowLogInfoArgs;
                			// showLogInfo(tmp.querytype, tmp.queryvalue);
                			// 不刷新表格，只修改行数据
                			$logInfoTable.row($thisTr).data(rowData);
	                	});
	                },
	                aArgs: [rowData]
				});
				event.stopPropagation();
			}).on('click', '.appConfigView-popover li', function(event) {
				event.preventDefault();
				showLogInfoConfig('新增', undefined, $(this).attr('data-name'), objectId);
				$('#addLogInfo', $el).popover('hide');
				event.stopPropagation();
			}).on('click', '#addLogInfo', function(event) {
				event.preventDefault();
				event.stopPropagation();
			}).on('click', '.link-monitor', function(event) {
				var tr = $logInfoTable.row($(this).parents('tr')).data();
				app.dispatcher.load({
				   title: '应用总览',
				   moduleId: 'logCollectTrafficMonitor',
				   section: 'appTotal',
				   id: tr.sourceId,
				   params: {
				       keyId: tr.appName,
				       statisticstype:'2'
				   },
				   context: $el
				});
				event.stopPropagation();
			}).on('click', 'tbody tr', function (event) {
				var $trObj = $(this);
				if($(this).hasClass('active')){
					$('#logInfoSlider .close', $el).trigger('click');
					$trObj.removeClass('active');
				}else if($(this).siblings('.active').length > 0){
					$('#logInfoSlider .close', $el).trigger('click');
					handler.setTimeout(function() {
						$trObj.find('.link-modify').trigger('click');
					}, 500);
					$trObj.toggleClass('active');
				}else{
					$trObj.find('.link-modify').trigger('click');
					$trObj.toggleClass('active');
				}
				event.stopPropagation();
			});
			
			$('#addLogInfo', $el).on('click', function(event) {
				event.preventDefault();
				event.stopPropagation();
			});
			
			$('#addLogInfo', $el).popover({
			  	trigger: 'click',
			  	placement: 'bottom',
			  	html: true,
			  	container:'table#logInfoTable',
			  	content: '<ul class="appConfigView-popover">\
						<li data-name="Agent采集">Agent采集</li>\
						<li data-name="TCP服务">TCP服务</li>\
						<li data-name="HTTP服务">HTTP服务</li>\
						<li data-name="SNMP服务">SNMP服务</li>\
						<li data-name="UDP服务">UDP服务</li>\
						<li data-name="JDBC接入">JDBC接入</li>\
						<li data-name="Kafka接入">Kafka接入</li></ul>'
			})
			$('#refresh', $el).on('click', function(event) {
				event.preventDefault();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定刷新日志源吗？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(){
	                	app.shelter.show();
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgSourceAction_refresh.do',
	                		data:{
	                		}
	                	}).done(function (data) {
	                		app.shelter.hide();
                			app.alert("刷新完成");
                			var tmp = activeShowLogInfoArgs;
                			showLogInfo(tmp.querytype, tmp.queryvalue)
	                	});
	                },
				});
				event.stopPropagation();
			});
			$('#stopAll', $el).on('click', function(event) {
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定暂停日志源吗？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tmp){
	                	app.shelter.show();
	                	var tmp = activeShowLogInfoArgs;
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgSourceAction_stopAll.do',
	                		data:{
	                			queryvalue:tmp.queryvalue,
	                			querytype: tmp.querytype
	                		}
	                	}).done(function (data) {
	                		app.shelter.hide();
	                		if(true == data.result){
	                			app.alert("暂停成功");
	                		}else{
	                			app.alert(data.result);
	                		}
                			var tmp = activeShowLogInfoArgs;
                			showLogInfo(tmp.querytype, tmp.queryvalue)
	                	});
	                },
				});
				event.stopPropagation();
			});
			$('#startAll', $el).on('click', function(event) {
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定启动日志源吗？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tmp){
	                	app.shelter.show();
	                	var tmp = activeShowLogInfoArgs;
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgSourceAction_startAll.do',
	                		data:{
	                			queryvalue:tmp.queryvalue,
	                			querytype: tmp.querytype
	                		}
	                	}).done(function (data) {
	                		app.shelter.hide();
	                		if(true == data.result){
	                			app.alert("启动成功");
	                		}else{
	                			app.alert(data.result);
	                		}
                			var tmp = activeShowLogInfoArgs;
                			showLogInfo(tmp.querytype, tmp.queryvalue)
	                	});
	                },
				});
				event.stopPropagation();
			});
			
			$("#sliderBlock",$el).dragWidth();
			$("#resizeHeight",$el).dragHeight();

			// 展示日志源详情
			function showLogInfoConfig(type, sourceId, sourceType, objectId){
				// if(!objectId){
				// 	$('[href="#clearConfigContent"]', $el).parent().hide();
				// }
				$('#logInfoSlider .nav>li:eq(0)', $el).click();
				$('#logInfoSlider', $el).addClass('active').data({'objectId':objectId})/*.find('#logInfoSliderTitle').text(type)*/;
				logInfoSliderObj = app.dispatcher2.load({
					title: "",
					moduleId:"logInfoConfig",
					section:'addLogInfoResource',
					frameRenderTo:'#logInfoSliderContent',
					id: 'logInfoSlider',
					params:{
						sourceType:sourceType,
						sourceId:sourceId,
						operType:type,
						parentPageContext:$el
					},
					context: $el
				});
			}

			/**
			 * 加载清理备份界面
			 * @param  {[type]} objectId [description]
			 * @return {[type]}          [description]
			 */
			function showClearConfig(objectId) {
				clearConfigContentObj = app.dispatcher2.load({
					title: "",
					moduleId:"clear",
					section:'clearApplication',
					frameRenderTo:'#clearConfigContent',
					id: 'clearConfig',
					params:{
						appId:objectId
					},
					context: $el
				});
			}
			
			/**
			 * 加载数据输出界面
			 * @param  {[type]} objectId [description]
			 * @return {[type]}          [description]
			 */
			function showDataOutput(info) {
				dataOutputObj = app.dispatcher2.load({
					title: "",
					moduleId:"logInfoConfig",
					section:'dataOutput',
					frameRenderTo:'#dataOutputContent',
					id: 'dataOutputId',
					params:{
						info: info
					},
					context: $el
				});
			}
			
			/**
			 * 加载手工上传界面
			 * @param  {[type]} objectId [description]
			 * @return {[type]}          [description]
			 */
			function showUpload(sourceType,sourceId) {
				uploadObj = app.dispatcher2.load({
					title: "",
					moduleId:"logInfoConfig",
					section:'manualUpload',
					frameRenderTo:'#uploadContent',
					id: 'uploadId',
					params:{
						sourceType:sourceType,
						sourceId:sourceId,
					},
					context: $el
				});
			}

			$('#logInfoSlider', $el).on('click', function(event) {
				event.preventDefault();
				event.stopPropagation();
			}).on('click', '.close', function(event, isRefreshData) {
				event.preventDefault();
				$('#logInfoSlider', $el).removeClass('active');
				logInfoSliderObj && app.dispatcher2.unload('logInfoSlider');
				clearConfigContentObj && app.dispatcher2.unload('clearConfig');
				dataOutputObj && app.dispatcher2.unload('dataOutputId');
				uploadObj && app.dispatcher2.unload('uploadId');
				logInfoSliderObj = null;
				clearConfigContentObj = null;
				dataOutputObj = null;
				uploadObj = null;
				// 关闭后是否更新日志信息
				if(isRefreshData){
					if (modifyIndex === -1) {
						return;
					}
					var tmp = activeShowLogInfoArgs;
                		showLogInfo(tmp.querytype, tmp.queryvalue, modifyIndex)
				}
				$('#logInfoSlider', $el).removeData();
				$('#logInfoTable tbody tr',$el).removeClass('active');
				event.stopPropagation();
			}).on('click', '.nav>li', function(event) {
				event.preventDefault();
				if($(this).hasClass('active')){
					return;
				}
				var id = $(this).find('a').attr('href');
				$(id, $el).addClass('active').siblings().removeClass('active');
				$(this).addClass('active').siblings().removeClass('active');

				var index = $(this).index();
				if(index == 1 && !dataOutputObj){
//					var data = $('#logInfoSlider', $el).data();
//					showClearConfig(data.objectId);
					showDataOutput(activeTr);
				}else if(index == 2 && !uploadObj){
					showUpload(activeTr.sourceType,activeTr.sourceId);
				}
			})


/*日志信息end*/
/*代理信息start*/
			/**
			 *  加载代理信息
			 *  querytype取值: A1 - 应用一级分类 A2 - 应用二级分类 A3 - 应用三级分类 
			 *  AA - 应用系统编号 F1 - 软件一级分类 F2 - 软件二级分类 F3 - 软件三级分类 
			 *  FF - 软件对象编号 Y1 - 资产一级分类 Y2 - 资产二级分类 Y3 - 资产三级分类 
			 *  YY - 资产编号
			 */
			// function showAgentInfo(querytype, queryvalue) {
			// 	var urlData = {
			// 		queryValue:queryvalue,
			// 		queryType:querytype
			// 	};
				
			// 	app.common.ajaxWithAfa({
			// 		url:'AgentManagerAction_getAgentListByCmdb.do',
			// 		data:urlData
			// 	}).done(function (data) {
			// 		$agentTable.clear();
			// 		if(data.list && data.list.length > 0){
			// 			data.list.forEach(function (item, index) {
			// 				item.index = index+1;
			// 			})
			// 			$agentTable.rows.add(data.list).draw();
			// 		}else{
			// 			$agentTable.draw();
			// 		}
			// 	})
			// }
			// $('#addAgentInfo', $el).on('click', function(event) {
			// 	event.preventDefault();
			// 	showAgentInfoConfig('新增');
			// 	event.stopPropagation();
			// });
			// $('#agentTable',$el).on('click', 'tbody span.link-del', function(event) {//删除
			// 	var tr = $agentTable.row($(this).parents('tr')).data();
			// 	deleteAgent(tr.ip);
			// 	event.stopPropagation();
			// }).on('click', 'tbody span.link-monitor', function(event) {//监控
			// 	var tr = $agentTable.row($(this).parents('tr')).data();
			// 	loadAgentMonitor(tr);
			// 	event.stopPropagation();
			// }).on('click', 'tbody span.link-modify', function(event) {// 修改
			// 	var tr = $agentTable.row($(this).parents('tr')).data();
			// 	showAgentInfoConfig('修改',tr.ip);
			// 	event.stopPropagation();
			// }).on('click', 'tbody tr', function (event) {
			// 	var $trObj = $(this);

			// 	if($(this).hasClass('active')){
			// 		$('#agentInfoSlider .close', $el).trigger('click');
			// 		$trObj.removeClass('active');
			// 	}else if($(this).siblings('.active').length > 0){
			// 		$('#agentInfoSlider .close', $el).trigger('click');
			// 		handler.setTimeout(function() {
			// 			$trObj.find('.link-modify').trigger('click');
			// 		}, 500);
			// 		$trObj.toggleClass('active');
			// 	}else{
			// 		$trObj.find('.link-modify').trigger('click');
			// 		$trObj.toggleClass('active');
			// 	}
				
			// 	event.stopPropagation();
			// });

			//代理信息管理-事件
			// $('#agentInfoSlider', $el).on('click', function(event) {
			// 	event.preventDefault();
			// 	event.stopPropagation();
			// }).on('click', '.close, .cancelBtn', function(event, isRefreshData) {
			// 	event.preventDefault();
			// 	$('#agentInfoSlider', $el).removeClass('active');
			// 	$('#agentTable tbody tr',$el).removeClass('active');
			// 	// 关闭后是否更新代理信息
			// 	if(isRefreshData){
			// 		var tmp = activeShowAgentInfoArgs;
   //              	showAgentInfo(tmp.querytype, tmp.queryvalue);
			// 	}
			// 	event.stopPropagation();
			// }).on('click', '.confirmBtn', function(event) {
			// 	event.preventDefault();
			// 	var judge;
			// 	if($('#agentInfoSliderTitle', $el).text() == '新增'){
			// 		judge = true;
			// 	}
			// 	var params = app.common.serializeObject($('#agentInfoSlider', $el).find('form'));
			// 	params.id = $('#agentInfoSlider', $el).attr('objectId')||params.id;
			// 	if(validate($('.appConfigerView-agentForm', $el))) {
			// 		if(judge) {
			// 			saveToAdd(params);
			// 		} else {
			// 			saveToEdit(params);
			// 		}
			// 	}
			// }).on('change', '#ip', function(event) {
			// 	event.preventDefault();
			// 	var ip = $.trim($(this).val());
			// 	getHostAndOsByIp(ip);
			// }).on('change', '#protocol', function(event) {
			// 	event.preventDefault();
			// 	var $agentInfoSlider = $('#agentInfoSlider', $el);
			// 	var value = $(this).val();
			// 	if(value == "ssh") {
			// 		$("#port", $agentInfoSlider).val(22);
			// 	} else {
			// 		$("#port", $agentInfoSlider).val(23);
			// 	}
			// });

			// function loadAgentMonitor(tr) {
			// 	app.dispatcher.load({
			// 		title: "代理监控详情",
			// 		moduleId:"agentMonitor",
			// 		section:["agentMonitorDetails"],
			// 		id:tr.ip,
			// 		params:{
			// 			data:tr
			// 		}
			// 	});
			// }
			function getHostAndOsByIp(ip) {
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_checkAgentAndGetServerByIp.do",
					data: {
						ip: ip,
					}
				}).done(function(data) {
					var result = data.result;
					var $agentInfoSlider= $('#agentInfoSlider', $el);
					if(result.flag) {
						if(result.server) {
							$("#host_name", $el).val(result.server.serverName);
							$("#os_type", $el).val(result.server.model);
							$agentInfoSlider.attr('objectId', result.server.objectId);
						} else {
							app.alert(result.msg);
						}
					} else {
						app.alert(result.msg)
					}

				});
			}

			// function showAgentInfoConfig(type, ip){
			// 	var $agentInfoSlider = $('#agentInfoSlider', $el);
			// 	$agentInfoSlider.find('form')[0].reset();
			// 	$agentInfoSlider.removeAttr('objectId');
			// 	if(ip){
			// 		editAgent(ip);
			// 	}
			// 	$agentInfoSlider.addClass('active').find('#agentInfoSliderTitle').text(type);
			// 	$("#protocol", $agentInfoSlider).trigger("change");
				
			// }

			function editAgent(ip) {
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_getAgentByIp.do",
					data: {
						ip: ip
					}

				}).done(function(data) {
					setModalInfo(data.result[0]);
				});
			}

			function setModalInfo(result) {
				for(var i in result) {
					$("[name='" + i + "']", $('#agentInfoSlider', $el)).val(result[i])
				}
			}

			function deleteAgent(ip) {
				app.confirmDialog({
					sTitle: "请确认",
					sType: "search",
					sContent: '是否确认删除？',
					sBtnConfirm: '确定',
					sBtnCancel: '取消',
					fnConfirmHandler: function() {
						app.common.ajaxWithAfa({
							url: "AgentManagerAction_deleteAgentByIp.do",
							data: {
								ip: ip,
							}
						}).done(function() {
							app.alert("删除成功");
							$('#agentInfoSlider .close', $el).trigger('click', true);
						});
					},
				});
			}

			// 表单数据验证
			function validate($content) {
				// 此代码只做简单的必输校验
				$('[required]', $content).each(function(){
					if($(this).val().trim() == '' && !$(this).next().hasClass("help-inline")){
						$(this).after('<span class="help-inline">不能为空</span>');
					}else if($(this).val().trim() != '' && $(this).next().hasClass("help-inline")){
						$(this).next().remove();
					}
				})
				if($('.help-inline', $content).length > 0){
					return false;
				}else{
					return true;
				}
				// var validateResult = app.validate.validate({
				// 	$context: $('#agentInfoSlider', $el),
				// 	data: [{
				// 		"id": "ip",
				// 		"filter": {
				// 			"require": true
				// 		},
				// 	}, {
				// 		"id": "os_type",
				// 		"filter": {
				// 			"require": true
				// 		},
				// 	}, {
				// 		"id": "host_name",
				// 		"filter": {
				// 			"require": true,
				// 		},
				// 	}, {
				// 		"id": "install_user",
				// 		"filter": {
				// 			"require": true
				// 		},
				// 	}, {
				// 		"id": "agent_user_pwd",
				// 		"filter": {
				// 			"require": true,
				// 		},
				// 	}, {
				// 		"id": "protocol",
				// 		"filter": {
				// 			"require": true
				// 		},
				// 	}, {
				// 		"id": "port",
				// 		"filter": {
				// 			"require": true
				// 		},
				// 	}],
				// 	correctCallback: function($ele, correctMsg) {
				// 		$ele.next().next().addClass('hide');
				// 	},
				// 	errorCallback: function($ele, errMsg) {
				// 		$ele.next().next().removeClass('hide').text(errMsg);
				// 	}
				// });
				// return validateResult.bResult;
			}

			//新增的提交
			function saveToAdd(params) {
				app.shelter.show();
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_saveAgent.do",
					data: {
						dataStr: JSON.stringify(params)
					}
				}).done(function(data) {
					app.shelter.hide();
					app.alert("增加成功");
					$('#agentInfoSlider .close', $el).trigger('click', true);
				});

			}

			//修改的提交
			function saveToEdit(params) {
				var sendJson = {
					protocol: params.protocol,
					port: params.port,
					agent_user_pwd: params.agent_user_pwd,
					install_user: params.install_user
				}
				app.shelter.show();
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_modifyAgent.do",
					data: {
						dataStr: JSON.stringify(sendJson),
						ip: params.ip
					}
				}).done(function(data) {
					app.shelter.hide();
					app.alert("修改成功");
					$('#agentInfoSlider .close', $el).trigger('click', true);
				});
			}
/*代理信息end*/

			//左侧配置总览点击事件
			function zTreeOnClick(event,treeId,treeNode,clickFlag){
				objectId = null;
				$('#appConfigInfo', $el).empty();//清空之前所有应用信息
				$('#appTitle', $el).text(treeNode.name);

				if(treeNode.level == 0){//点击第一级
					var data = {levelOneName : treeNode.name}
					if(appId){
						data.appId = appId;
					}
					$.ajax({
						type : "post",
						url : "AppConfigAction_getFirstCategoryObjects.do",
						data : data,
						aimshelter: true,
						dataType : "json",
						success : function(data){
							if(data.status){
								showAppInfo(data.content.cate1Objects);
							}							
						}
					});
					if(data.levelOneName == '应用群组'){
						activeShowLogInfoArgs = {querytype:'A1',queryvalue:data.levelOneName};
						// activeShowAgentInfoArgs = {querytype:'A1',queryvalue:data.levelOneName};
					}else if(data.levelOneName == '软件'){
						// activeShowAgentInfoArgs = {querytype:'F1',queryvalue:data.levelOneName};
						activeShowLogInfoArgs = {querytype:'F1',queryvalue:data.levelOneName};
					}else{
						activeShowLogInfoArgs = {querytype:'Y1',queryvalue:data.levelOneName};
						// activeShowAgentInfoArgs = {querytype:'Y1',queryvalue:data.levelOneName};
					}
				}else if(treeNode.level == 1){//点击第二级
					$('#appTitle', $el).text($('#' + treeNode.parentTId + '_span', $el).text() + "/" + treeNode.name);
					var data = {
						levelOneName : $('#' + treeNode.parentTId + '_span', $el).text(),
						levelTwoName : treeNode.name
					}
					if(appId){
						data.appId = appId;
					}
					$.ajax({
						type : "post",
						url : "AppConfigAction_getSecondCategoryObjects.do",
						data : data,
						aimshelter: true,
						dataType : "json",
						success : function(data){
							if(data.status){
								showAppInfo(data.content.cate2Objects);
							}
						}
					});
					if(data.levelOneName == '应用群组'){
						activeShowLogInfoArgs = {querytype:'A2',queryvalue:data.levelTwoName};
						// activeShowAgentInfoArgs = {querytype:'A2',queryvalue:data.levelTwoName};
					}else if(data.levelOneName == '软件'){
						// activeShowAgentInfoArgs = {querytype:'F2',queryvalue:data.levelTwoName};
						activeShowLogInfoArgs = {querytype:'F2',queryvalue:data.levelTwoName};
					}else{
						activeShowLogInfoArgs = {querytype:'Y2',queryvalue:data.levelTwoName};
						// activeShowAgentInfoArgs = {querytype:'Y2',queryvalue:data.levelTwoName};
					}
				}else if(treeNode.level == 2){//点击第三级
					$('#appTitle', $el).text($('#' + treeNode.parentTId , $el).parent().prev().find('span').eq(1).text() + "/" + $('#' + treeNode.parentTId + '_span', $el).text() + "/" + treeNode.name);
					var data = {
						levelOneName : $('#' + treeNode.parentTId , $el).parent().prev().find('span').eq(1).text(),
						levelTwoName : $('#' + treeNode.parentTId + '_span', $el).text(),
						levelThreeName : treeNode.name
					}
					if(appId){
						data.appId = appId;
					}
					$.ajax({
						type : "post",
						url : "AppConfigAction_getThirdCategoryObjects.do",
						data : data,
						aimshelter: true,
						dataType : "json",
						success : function(data){
							if(data.status){
								showAppInfo(data.content.cate3Objects);
							}
						}
					});

					if(data.levelOneName == '应用群组'){
						activeShowLogInfoArgs = {querytype:'A3',queryvalue:data.levelThreeName};
						// activeShowAgentInfoArgs = {querytype:'A3',queryvalue:data.levelThreeName};
					}else if(data.levelOneName == '软件'){
						// activeShowAgentInfoArgs = {querytype:'F3',queryvalue:data.levelThreeName};
						activeShowLogInfoArgs = {querytype:'F3',queryvalue:data.levelThreeName};
					}else{
						activeShowLogInfoArgs = {querytype:'Y3',queryvalue:data.levelThreeName};
						// activeShowAgentInfoArgs = {querytype:'Y3',queryvalue:data.levelThreeName};
					}
				}
				activeClassInfo = data;
				$('#resizeHeight li.active', $el).trigger('click');
			}

			//显示应用信息
			function showAppInfo(data){
				if(data){
					var liTemp = "";
					var data = data.sort(function(a, b){return a.healthDegree - b.healthDegree});//以健康度排序
					$('.appCount_',$el).html(data.length);
					for(var i = 0; i < data.length; i++){
						var temp = data[i],
							healthValue = temp.healthDegree,
							dataObj = temp.objectSummary,
							imgUrl = temp.imgPath;
						if(healthValue >= 80){
							liTemp += '<li style="background-image:url('+ imgUrl +'); background-position:center 10px;background-size: 60px; background-repeat:no-repeat;" class="appConfiger-appGreen" objectid="'+ dataObj.objectId +'"><p title="'+ dataObj.objectName +'">' + dataObj.objectName + '</p></li>';
						}else if(healthValue >= 60){
							liTemp += '<li style="background-image:url('+ imgUrl +'); background-position:center 10px;background-size: 60px; background-repeat:no-repeat;" class="appConfiger-appYellow" objectid="'+ dataObj.objectId +'"><p title="'+ dataObj.objectName +'">' + dataObj.objectName + '</p></li>';
						}else{
							liTemp += '<li style="background-image:url('+ imgUrl +'); background-position:center 10px;background-size: 60px; background-repeat:no-repeat;" class="appConfiger-appRed" objectid="'+ dataObj.objectId +'"><p title="'+ dataObj.objectName +'">' + dataObj.objectName + '</p></li>';
						}
						
					}

					$('#appConfigInfo', $el).append(liTemp);
				}				
			}

			// 日志tab切换
			$('#resizeHeight', $el).on('click', 'li', function(event) {
				event.preventDefault();
				var index = $('#resizeHeight li',$el).index($(this));
				switch(index) {
					case 0:
						var tmp = activeShowLogInfoArgs;
						showLogInfo(tmp.querytype, tmp.queryvalue);
						break;
					case 1:
						// var tmp = activeShowAgentInfoArgs;
						// showAgentInfo(tmp.querytype, tmp.queryvalue)
						break;
					case 2:
						app.alert('3');
						break;
				}
			});

			//初始化左侧总分类数据
			function initAllCategories(){
				$.ajax({
					type : "post",
					url : (function() {
						if(appId) {
							return "AppConfigAction_getAllCategories.do";
						} else {
							return "EventListAction_getObjectCategory.do";
						}
					})(),
					dataType : "json",
					success : function(data){
						if(data.status){
							if(appId) {
								var cates = data.content.cates;
							} else {
								var cates = data.content.objectCate;
							}							
							if(cates && cates.length){
								$('#allCategory', $el).text(cates.length);
								/******处理数据 start*******/
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
								/******处理数据 end*******/
								var treeObj = $.fn.zTree.init($('#' + ztreeId, $el), setting, treeArr);
								$('#'+ ztreeId +'_1_a', $el).trigger('click');
							}							
						}
					}
				});
			}
			
			this.delegateEvents({
				"keydown #appSearch" : function(e){//搜索功能
					var e = e || window.event,
						keycode = e.which;
					var count = 0;
					if(keycode == 13){//回车键事件
						var	searchValue = $.trim($(this).val()).toLowerCase();//搜索框内容
						$('li', $('#appConfigInfo', $el)).each(function(index,li){
							if($(li).find('p').text().toLowerCase().indexOf(searchValue) != -1){
								$(li).css('display', 'block');
								count++;
							}else{
								$(li).css('display', 'none');
							}
							
						})
						$('.appCount_',$el).html(count);
					}
				},
				
				"input #appSearch" : function(){
					if($.trim($(this).val()) == ""){//实现清空时，所有应用显示
						$('li', $('#appConfigInfo', $el)).each(function(index,li){
							$(li).css('display', 'block');							
						});
						$('.appCount_',$el).html($('li', $('#appConfigInfo', $el)).length);
					}
				},
				
			});

			//点击搜索功能
			$(".appConfigerView-appSearch", $el).on("click",function(){
				var	searchValue = $.trim($("#appSearch",$el).val()).toLowerCase();//搜索框内容
				$('li', $('#appConfigInfo', $el)).each(function(index,li){
					if($(li).find('p').text().toLowerCase().indexOf(searchValue) != -1){
						$(li).css('display', 'block');
					}else{
						$(li).css('display', 'none');
					}
				})
			})

			// 资产对象事件搜索事件
			$('.categorySearchBtn', $el).on('click', function(event) {
				event.preventDefault();
				var searchStr = $('#categorySearch', $el).val();
				if(searchStr == ''){
					return;
				}

				var ztreeObj = $.fn.zTree.getZTreeObj(ztreeId);

				var nodes = ztreeObj.getNodesByParamFuzzy("name", searchStr, null);
				if(nodes.length > 0){
					for (var i = 0; i < nodes.length; i++) {
						ztreeObj.expandNode(nodes[i], true, false, true);
					}
					ztreeObj.selectNode(nodes[0]);
				}else{
					ztreeObj.expandAll(false);// 折叠全部
				}
			});
			$('#categorySearch', $el).on('keyup', function(event) {
				event.preventDefault();
				if(event.keyCode == 13){
					$('.categorySearchBtn', $el).trigger('click');
				}
			});
		},
		
		unload:function(handler){
			$('#addLogInfo').popover('destroy');
			logInfoSliderObj && app.dispatcher2.unload('logInfoSlider');
			clearConfigContentObj && app.dispatcher2.unload('clearConfig');
			dataOutputObj && app.dispatcher2.unload('dataOutputId');
			uploadObj && app.dispatcher2.unload('uploadId');
			logInfoSliderObj = null;
			clearConfigContentObj = null;
			dataOutputObj = null;
			uploadObj = null;
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){

		}
		
	}
});
