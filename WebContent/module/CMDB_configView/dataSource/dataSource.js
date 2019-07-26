define([], function() {
	var logInfoSliderObj = null;
	var clearConfigContentObj = null;
	var dataOutputObj = null;
	var uploadObj = null;
	var selfField = null;
	return {
		load : function($el, scope, handler) {
			
			let appId = scope.appId || 'all';

			var activeTr;

			var logSourceTotalNum = 0;
			var runningNumber = 0;

			scope.simple ? $('.datasource-page',$el).addClass('simple') : $('.datasource-page',$el).removeClass('simple');

			var $logInfoTable = $('#logInfoTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'pageLength': 10,
				"autoWidth": false,
				'columns' 	: [{
					data : null, defaultContent : '<input type="checkbox">'
				},{
					data : 'sourceName', defaultContent : ''//日志信息名称
				},{
					data : 'appName', defaultContent : ''//应用系统
				},{
					data : 'category1', defaultContent : ''//三级分类
				},{
					data : 'sourceType', defaultContent : ''//日志来源
				},{
					data : 'hostIp', defaultContent : ''//IP个数
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
						return `<span class="auto-width">${data}</span>`
					},
					"targets" : 5
				},{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<p style="width: 15px;margin: 0;float: left;"><i class="fa fa-cog fa-spin" style="color: #22AC38"></i></p>|运行中';
						}else{
							return '<p style="width: 15px;margin: 0;float: left;"><i class="fa fa-cog" style="color:#aeadb3;"></i></p>|已暂停';
						}
					},
					"targets" : 6
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-monitor fa fa-tv" title="监控"></span></span>';
          },
          "targets" : 7
				}]
			});

			var multiSelect = app.multiSelect({
				dataTable: $logInfoTable,
				tableSelector: '#logInfoTable',
				checkAllSelector: '[data-role="checkAllBtn"]',
				isTREnableCheck: false,// tr不可点击选中
				optBtn: {
					defaultDisabled: '#stopAll,#startAll,#deleteLogInfo',
					//onlySelectedOneEnabled: '#stopAll,#startAll,#deleteLogInfo'
				},
				context: $el,
				change: function(){
					$('#selectedNumber', $el).html(multiSelect.getSelectedDatas()?multiSelect.getSelectedDatas().length:0);
				}
			});
			
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
			
			function closeEdit() {
				$('#logInfoSlider .close', $el).trigger('click');
			}

/*日志信息start*/
			init();
			function init(){
				objectId = appId;
				if(appId == 'all'){
					showLogInfo('A1','应用群组');
					return;
				}
				showLogInfo('AA', appId);
			}
			
			window.addEventListener('message',function(e){
				if(e.data == 'dataSourceSaveSuccess'){
					init();
				}
			});

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
					
					logSourceTotalNum = data.result.length;
					runningNumber = 0;
					if(data.result && data.result.length > 0){
						data.result.forEach(function (item, index) {
							item.index = index+1;
							if(item.runStatus=="1"){
								runningNumber++;
							}
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
					$('#logSourceTotalNum',$('.appoverview-content')).html(logSourceTotalNum);
					$('#runningNumber',$('.appoverview-content')).html(runningNumber);
					$('#stopNumbber',$('.appoverview-content')).html(logSourceTotalNum - runningNumber);
				})
			}

			function deleteSource(sourceId) {
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url:'LogCfgSourceAction_delCfgLogSource.do',
						data:{
							sourceId: sourceId
						}
					}).done(function (data) {
						app.alert(data.result);
						resolve(data);
					});
				});
			}

			$('#deleteLogInfo', $el).on('click', function(){
				if(!$(this).hasClass('disabled')){
					var rowData = $logInfoTable.row($('#logInfoTable tbody input:checked', $el).closest('tr')).data();
					app.confirmDialog({
						sTitle:"确认", 
						sType:"search",
						sContent:'确定删除日志源“'+ rowData.sourceName +'”吗？',
						sBtnConfirm: '确定',
						sBtnCancel: '取消',
						fnConfirmHandler: function(){
							
							let ids = multiSelect.getSelectedDatas().map(item => item.sourceId);
							let deletes = ids.map(item => {
								return deleteSource(item);
							});
							Promise.all(deletes).then(res => {
								app.shelter.hide();
								var tmp = activeShowLogInfoArgs;
								showLogInfo(tmp.querytype, tmp.queryvalue);
							})
						},
					});
				}
			})

			// 事件——日志信息
			$('#logInfoTable',$el).on('click', 'tbody span.link-del', function(event) {//删除
				
			}).on('click', 'tbody span.link-modify', function(event) {// 修改
				var tr = $logInfoTable.row($(this).parents('tr')).data();
				activeTr = tr;
				modifyIndex = $logInfoTable.page();
				showLogInfoConfig('修改',tr.sourceId, tr.sourceType, tr.appId, tr);
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
				var tr = $logInfoTable.row(this).data();
				activeTr = tr;

				if($(this).hasClass('active')){
					$('#logInfoSlider .close', $el).trigger('click');
					$trObj.removeClass('active');
				}else if($(this).siblings('.active').length > 0){
					$('#logInfoSlider .close', $el).trigger('click');
					handler.setTimeout(function() {
						showLogInfoConfig('修改',tr.sourceId, tr.sourceType, tr.appId, tr);
					}, 500);
					$trObj.toggleClass('active');
				}else{
					showLogInfoConfig('修改',tr.sourceId, tr.sourceType, tr.appId, tr);
					$trObj.toggleClass('active');
				}
				event.stopPropagation();
			});
			
			$('#addLogInfo', $el).on('click', function(event) {
				// event.preventDefault();
				// event.stopPropagation();
				$('#addLogSource_modal', $el).modal('show');
				$('#addLogSourceFrame', $el).empty();
				app.domain.exports('privateFields', {
					data: undefined
				})
				app.tab.openNewWindow({
					title: 'addLogSource',
					moduleId: 'CMDB_configView',
					section: ['dataSource', 'addLogSource'],
					id: app.global.getUniqueId(),
					frameRenderTo: $('#addLogSourceFrame', $el),
					params: {
						appId: scope.appId || null
					}
				});
			});
			
			// $('#addLogInfo', $el).popover({
			//   	trigger: 'click',
			//   	placement: 'bottom',
			//   	html: true,
			//   	container:'table#logInfoTable',
			//   	content: '<ul class="appConfigView-popover">\
			// 			<li data-name="Agent采集">Agent采集</li>\
			// 			<li data-name="TCP服务">TCP服务</li>\
			// 			<li data-name="HTTP服务">HTTP服务</li>\
			// 			<li data-name="SNMP服务">SNMP服务</li>\
			// 			<li data-name="UDP服务">UDP服务</li>\
			// 			<li data-name="JDBC接入">JDBC接入</li>\
			// 			<li data-name="Kafka接入">Kafka接入</li></ul>'
			// })
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
				let ids = multiSelect.getSelectedDatas().map(item => item.sourceId);
				let stops = ids.map(item => {
					return startOrStop(item,'0');
				});
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定暂停日志源吗？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tmp){
						app.shelter.show();
						Promise.all(stops).then(res => {
							app.alert('暂停成功');
							app.shelter.hide();
							init();
						});
	                	// var tmp = activeShowLogInfoArgs;
	                	// app.common.ajaxWithAfa({
	                	// 	url:'LogCfgSourceAction_stopAll.do',
	                	// 	data:{
	                	// 		queryvalue:tmp.queryvalue,
	                	// 		querytype: tmp.querytype
	                	// 	}
	                	// }).done(function (data) {
	                	// 	app.shelter.hide();
	                	// 	if(true == data.result){
	                	// 		app.alert("暂停成功");
	                	// 	}else{
	                	// 		app.alert(data.result);
	                	// 	}
                		// 	var tmp = activeShowLogInfoArgs;
                		// 	showLogInfo(tmp.querytype, tmp.queryvalue)
	                	// });
	                },
				});
				event.stopPropagation();
			});
			$('#startAll', $el).on('click', function(event) {
				let ids = multiSelect.getSelectedDatas().map(item => item.sourceId);
				let stops = ids.map(item => {
					return startOrStop(item,'1');
				});
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定启动日志源吗？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tmp){
						app.shelter.show();
						Promise.all(stops).then(res => {
							app.alert('启动成功');
							app.shelter.hide();
							init();
						});
	                	// var tmp = activeShowLogInfoArgs;
	                	// app.common.ajaxWithAfa({
	                	// 	url:'LogCfgSourceAction_startAll.do',
	                	// 	data:{
	                	// 		queryvalue:tmp.queryvalue,
	                	// 		querytype: tmp.querytype
	                	// 	}
	                	// }).done(function (data) {
	                	// 	app.shelter.hide();
	                	// 	if(true == data.result){
	                	// 		app.alert("启动成功");
	                	// 	}else{
	                	// 		app.alert(data.result);
	                	// 	}
                		// 	var tmp = activeShowLogInfoArgs;
                		// 	showLogInfo(tmp.querytype, tmp.queryvalue)
	                	// });
	                },
				});
				event.stopPropagation();
			});
			

			// 展示日志源详情
			function showLogInfoConfig(type, sourceId, sourceType, objectId,tr){
				$('#logInfoSlider .nav>li:eq(0)', $el).click();
				$('#logInfoSlider', $el).addClass('active').data({'objectId':objectId})/*.find('#logInfoSliderTitle').text(type)*/;
				logInfoSliderObj = app.dispatcher2.load({
					title: "",
					moduleId:"logInfoConfig",
					section:'addLogInfoResourceNew',
					frameRenderTo:'#logInfoSliderContent',
					id: 'logInfoSlider',
					params:{
						sourceType:sourceType,
						sourceId:sourceId,
						operType:type,
						tr: tr,
						parentPageContext:$el,
						closeEdit: closeEdit
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
				//event.preventDefault();
				event.stopPropagation();
			}).on('click', '.close', function(event, isRefreshData) {
				event.preventDefault();
				$('#logInfoSlider', $el).removeClass('active');
				logInfoSliderObj && app.dispatcher2.unload('logInfoSlider');
				clearConfigContentObj && app.dispatcher2.unload('clearConfig');
				dataOutputObj && app.dispatcher2.unload('dataOutputId');
				uploadObj && app.dispatcher2.unload('uploadId');
				selfField && app.dispatcher2.unload('showSelfField');
				logInfoSliderObj = null;
				clearConfigContentObj = null;
				dataOutputObj = null;
				uploadObj = null;
				selfField = null;
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
				if (index == 1 && !selfField) {
					showSelfField(activeTr);
				} else if(index == 2 && !dataOutputObj){
					showDataOutput(activeTr);
				}else if(index == 3 && !uploadObj){
					showUpload(activeTr.sourceType,activeTr.sourceId);
				}
			})
			
			function showSelfField (activeTr) {
				selfField = app.dispatcher2.load({
					title: "",
					moduleId:"logInfoConfig",
					section:'showSelfField',
					frameRenderTo:'#selfField',
					id: 'showSelfField',
					params:{
						activeTr: activeTr,
						closeEdit: closeEdit
					},
					context: $el
				});
			}


/*日志信息end*/

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

			// 2019-06-26修改
			// 增加 条件筛选
			$('#sourceType, #runStatus', $el).on('change', function(){
				$logInfoTable.column(4).search($('#sourceType', $el).val());
				$logInfoTable.column(6).search($('#runStatus', $el).val());
				$logInfoTable.draw();
			})

			// 点击空白隐藏
			$(document).on('click', function(e){
//				if($(e.target).closest('tr').length == 0){
//					$('#logInfoSlider .close', $el).trigger('click');
//				}
			});

			function startOrStop(sourceId,runStatus) {
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url:'LogCfgSourceAction_updateRunStatus.do',
						data:{
							sourceId: sourceId,
							runStatus: runStatus
						}
					}).done(function (data) {
						
						resolve(data);
					});
				})
			}
			
		},
		unload : function(handler) {
			logInfoSliderObj && app.dispatcher2.unload('logInfoSlider');
			clearConfigContentObj && app.dispatcher2.unload('clearConfig');
			dataOutputObj && app.dispatcher2.unload('dataOutputId');
			uploadObj && app.dispatcher2.unload('uploadId');
			selfField && app.dispatcher2.unload('showSelfField');
			logInfoSliderObj = null;
			clearConfigContentObj = null;
			dataOutputObj = null;
			uploadObj = null;
			selfField = null;
		},
		pause : function($el, attr, handler) {

		},
		resume : function($el, attr, handler) {
		}
	};
});