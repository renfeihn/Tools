define(["jquery"], function() {
	var $eventTable;
	return {
		load: function($el, scope, handler) {
			var objCates;
			var cateId = $.trim(scope.cateId);//分类
			var appId = $.trim(scope.appId);//应用
			var objId = $.trim(scope.objId);//对象
			var eType = scope.eType, //事件类型必传
				dStatus = scope.dStatus;//处理状态
			var iStatus = scope.iStatus;//工单状态
			var eventClosed = scope.eventClosed;
			
			$el.css({'overflow': 'visible', 'padding-bottom': '1px'});
			$('.eventList-jumpPage', $el).css({ 'position': 'static', 'margin-top': '4px' });
			
			//时间
			$('#eventTime1,#eventTime2', $el).datetimepicker({
				format: 'yyyy-mm-dd hh:ii:00',
				minView: 0,
				keyboardNavigation: false,
				autoclose: 1
			});
			
			var zTree, settings = {
				view: {
					showLine: false,
				},
				data: {
					simpleData: {
						enable: true,
						idKey: "path",
						pIdKey: "parentPath",
					},
				},
				callback: {
					onClick: zTreeOnClick,
					beforeExpand : closeOther
				}
			};
			function closeOther(id, node) {
				var aa = $.fn.zTree.getZTreeObj('eventList-objTypeZtree');
				// 是不是根节点
				if (!node.parentTId) {
					aa.expandAll(false);
					return
				}
				// 叶子节点
				var parentNode = aa.getNodeByTId(node.parentTId);
				var findNode = aa.getNodesByFilter(filter, false, parentNode);
				for (var i = 0; i < findNode.length; i++) {
					if (findNode[i].level == node.level) {
						aa.expandNode(findNode[i], false)
					}
				}
				function filter(n) {
					return n.open == true
				}
			}

			var urlData = {};

			urlData.pageSize = 15;
			urlData.eventType = 'ALARM_WARING'; //全部事件类型
			urlData.dealStatus = ''; //全部
			urlData.eventStatus = undefined; //触发
			urlData.eventClosed = eventClosed;//事件是否关闭
			
			//默认按最后发生时间倒序
			urlData.propertys = JSON.stringify(["eventEnd"]);
			urlData.direction = JSON.stringify(["desc"]);

			if(cateId || appId || objId) {
				$('.eventList-before-div', $el).hide();
				$('.eventList-before-div', $el).next().find('table').css('margin-top', '0');
				if(appId) {
					if(appId == "-1") {
						urlData.eventStatus = undefined;
						urlData.eventType = eType ? eType : 'ALARM_WARING';
						urlData.dealStatus = dStatus ? dStatus : 'DEALING';
					} else {
						urlData.appIds = [appId];
						urlData.eventStatus = undefined;
						urlData.eventType = eType ? eType : 'ALARM_WARING';
						urlData.dealStatus = dStatus ? dStatus : 'DEALING';
					}

				}
				if(cateId) {
					if(cateId == -1){
						delete urlData.cmdbCateIds;
					}else{
						urlData.cmdbCateIds = [cateId];
					}
					urlData.eventStatus = undefined;
					urlData.dealStatus = dStatus ? dStatus : 'DEALING';
					urlData.eventType = eType ? eType : "ALARM_WARING";
				}
				if(objId) {
					urlData.objIds = [objId];
					urlData.eventStatus = undefined;
					urlData.dealStatus = dStatus ? dStatus : "DEALING";
					urlData.eventType = eType ? eType : "ALARM_WARING";
				}
			}

			app.shelter.show();
			//获取表格数据
			function getEventTableData(data) {
				//接口修改，如果查全部，cmdbCateIds不传
				if(cateId == -1 || !cateId) {
					delete urlData.cmdbCateIds;
				}				

				$eventTable = $("#eventTable", $el).DataTable({
					/*'bPaginate': true,*/
					'pageLength': 15,
					"bAutoWidth": true, // 自动宽度
					'bStateSave': false,
					'searching': false,
					"ordering": false,
					'aoColumnDefs': [{
						"render": function(data, type, row, meta) {
							if(data == 0) {
								return '<span class="event-type error"></span>'; //故障
							} else if(data == 1) {
								return '<span class="event-type warning"></span>'; //预警
							} else if(data == 2) {
								return '<span class="event-type notice"></span>'; //通知
							}
						},
						"targets": 1
					}, {
						"render": function(data, type, row, meta) {
							if(data == 0) {
								return '待处理';
							} else if(data == 1) {
								return '处理中';
							} else if(data == 2) {
								return '已处理';
							}
						},
						"targets": 6
					}, {
						"targets": 12,
						"render": function(data, type, row, meta) {
							return '<span class="lookpath" eventid="' + data + '"></span>';
						}

					}, {
						"targets": 3,
						"render": function(data, type, row, meta) {
							if(data) {
								return data[0];
							} else {
								return '-';
							}

						}

					}, {
						"targets": 13,
						"visible": false
					}],
					"pagingType": "full_numbers",
					"serverSide": true,
					"ajax": function(data, callback, settings) {
						urlData.page = data.length == 0 ? 0 : data.start / data.length;
						app.common.ajaxWithAfa({
							cache: false, // 禁用缓存
							url: 'ShowUserPrivilegeAction_getEventsByUserPrivilege.do',
							data: urlData
							/*data :{
								conditions:JSON.stringify(conditions),
								page:data.length == 0 ? 0 : data.start/data.length,
								pageCount:15
							}*/
						}).done(function(result) {
							app.shelter.hide();
							$('.eventList-jumpPage', $el).css({ 'position': 'absolute', 'margin-top': '-24px' });
							result = result.events;
							var content = [],
								elements = 0,
								pages = 0;
							if(result) {
								content = result.content;
								elements = result.totalElements;
							}
							for(var i in content) {
								content[i]['index'] = (data.start++) + 1;
							}
							callback({
								data: content,
								recordsFiltered: elements
							});
						});
					},
					columns: [{ //序号
							data: 'index',
							defaultContent: '-'
						}, { //事件类型
							data: 'eventType',
							defaultContent: '-'
						}, { //事件来源
							data: 'eventSource',
							defaultContent: '-',
							render: function(data, type, row, meta) {
								switch(data){
									case '00':
										return 'aim';
									case '01':
										return 'mocha';
									case '02':
										return '天旦';
									case '03':
										return '虚拟化';
									case '04':
										return '备份系统';
									case '05':
										return '网络';
									case '06':
										return 'OEM';
								}
							}
						}, { //应用名称
							data: 'appNames',
							defaultContent: '-'
						}, { //对象名称
							data: 'objName',
							defaultContent: '-'
						}, { //事件摘要
							data: 'eventTitle',
							defaultContent: '-'
						}, { //事件状态
							data: 'eventStatus',
							defaultContent: '-'
						}, { //工单状态
							data: 'itilStatus',
							defaultContent: '-'
						}, { //处理状态
							data: 'dealStatus',
							defaultContent: '-'
						}, { //发生次数
							data: 'tally',
							defaultContent: '-'
						}, { //首发时间
							data: 'eventStart',
							defaultContent: '-'
						}, { //最后时间
							data: 'eventEnd',
							defaultContent: '-'
						}, { //事件路径
							data: 'eventId',
							defaultContent: '-'
						}, {
							data: 'objId',
							defaultContent: '-'
						}
					]
				});
			}

			//初始化应用名称下拉框
			app.common.ajaxWithAfa({
				url: "ShowUserPrivilegeAction_getAppsData.do",
				//data : data,
			}).done(function(data) {
				$("#eventList-appName", $el).empty();
				var data_list = data.appView.appList;
				var html = '<option value="-1">全部应用</option>';
				for(var i = 0; i < data_list.length; i++) {
					html += '<option value="' + data_list[i].appSummary.objectId + '">' + data_list[i].appSummary.appName + '</option>';
				}
				$("#eventList-appName", $el).html(html).comboSelect();
			});
			
			initAllCategories();
			//初始化对象类型下拉框
			function initAllCategories() {
				$.ajax({
					type: "post",
					url: "EventListAction_getObjectCategory.do",
					dataType: "json",
					success: function(data) {
						if(data.status) {
							var cates = data.content.objectCate;
							if(cates && cates.length) {
								var levelOneNames = []; //一级目录
								for(var i = 0; i < cates.length; i++) {
									levelOneNames.push(cates[i].levelOneName);
								}
								levelOneNames = _.uniq(levelOneNames); //去重

								var treeArr = []; //最终需求的数据结构
								for(var i = 0; i < levelOneNames.length; i++) {
									treeArr.push({ name: levelOneNames[i] });
									for(var j = 0; j < cates.length; j++) {
										if(cates[j].levelOneName == levelOneNames[i]) {
											if(!treeArr[i].children) {
												treeArr[i].children = [{
													name: cates[j].levelTwoName,
													children: []
												}];
											}
											if(treeArr[i].children) {
												var children = treeArr[i].children;
												var ishas = false;
												for(var k = 0; k < children.length; k++) {
													if(children[k].name == cates[j].levelTwoName) {
														children[k].children.push({ name: cates[j].levelThreeName });
														ishas = true;
													}
												}
												if(!ishas) {
													children.push({
														name: cates[j].levelTwoName,
														children: [{ name: cates[j].levelThreeName }]
													});
												}
											}

										}
									}
								}
								treeArr.unshift({ name: '全部对象' });
								/******处理数据 end*******/
								ztreeObj = $.fn.zTree.init($("#eventList-objTypeZtree", $el), settings, treeArr);

//								$("#eventQueryBtn", $el).on("click");
								getEventTableData(cates);

								objCates = cates;
							}
						}
					}
				});
			}
			
			//搜索
			$("#searchInput", $el).on("keydown", function(e) {
				var e = e || window.event;
				var keycode = e.keycode || e.which;							
				var keyword = $.trim($(this).val());
				
				if(keycode === 13) {					
					if(!keyword){
						delete urlData.keyword;
					}else{
						urlData.keyword = keyword;
					}
					
					$eventTable.draw();
				}
			});
			
			//清空搜索框时的事件
			$("#searchInput", $el).on("keyup", function(e) {
				var e = e || window.event;
				var keycode = e.keycode || e.which;	
				var keyword = $.trim($(this).val());
				
				if(!keyword){
					delete urlData.keyword;
					$eventTable.draw();
				}
			});
			
			//清除时间
			$('#clearTime1', $el).click(function(e){
				$('#eventTime1', $el).val('');
			});
			$('#clearTime2', $el).click(function(e){
				$('#eventTime2', $el).val('');
			});

			//控制对象类型下的下拉框
			$('#eventList-objType', $el).click(function(event) {
				event.stopPropagation();
				$("#eventList-objTypeZtree", $el).slideToggle();
				//$("#eventList-objTypeZtree",$el).css('display','block');
			});

			$("#obj_classify_select", $el).click(function() {
				$("#obj_classify").css("display", "block");
			});

			//z-tree点击事件
			function zTreeOnClick(event, treeId, treeNode, clickFlag) {
				//var appId = 70371;
				var cmdbCateIds = treeNode.name;
				$('#eventList-objType', $el).val(cmdbCateIds);
				$("#eventList-objTypeZtree", $el).css('display', 'none');
				getEventData();
				var ids = [];
				objCates.forEach(function(item, index) {
					if(item.levelOneName == cmdbCateIds || item.levelTwoName == cmdbCateIds || item.levelThreeName == cmdbCateIds) {
						ids.push(item.categoryId);
					}
				});
			}

			$("#eventList-objTypeZtree", $el).click(function(e) {
				e.stopPropagation();
			});

			$(document).click(function(e) {
				$("#eventList-objTypeZtree", $el).fadeOut();
			});

			$("select", $el).on("change", getEventData);

			function getEventData() {
				//事件来源
				if($('#eventSource', $el).val() != "-1"){
					urlData.platform = $('#eventSource', $el).val();
				}else{
					delete urlData.platform;
				}
				
				if($("#eventList-appName", $el).val() != "-1") {					
					urlData.appIds = [$("#eventList-appName", $el).val()];
				}
				else{
					delete urlData.appIds;
				}

				var objName = $('#eventList-objType', $el).val();
//				var ids = [];
				if(objName == '全部对象') {
					delete urlData.cmdbCateIds;
//					ids = -1;
				} else {
					var ids = [];
					objCates.forEach(function(item, index) {
						if(item.levelOneName == objName || item.levelTwoName == objName || item.levelThreeName == objName) {
							ids.push(item.categoryId);
						}
					});
					urlData.cmdbCateIds = ids;
				}
				
				//时间
				urlData.eventStartDate = $.trim($('#eventTime1', $el).val());
				urlData.eventEndDate = $.trim($('#eventTime2', $el).val());
				if(urlData.eventEndDate!='' && urlData.eventStartDate!="" && urlData.eventEndDate<urlData.eventStartDate) {
					app.alert('结束时间应大于起始时间！');
					return;
				}else if(urlData.eventEndDate==''){
					delete urlData.eventEndDate;
				}else if(urlData.eventStartDate==''){
					delete urlData.eventStartDate;
				}


				urlData.eventType = $("#eventList-eventType", $el).val();
				urlData.dealStatus = $("#eventList-handleStatus", $el).val();
				//urlData.eventStatus = $('#eventStatus', $el).val();//触发

				$eventTable.draw();
			}

			$("#toPage", $el).on("keydown", function(e) {
				var e = e || window.event;
				var keycode = e.keycode || e.which;
				var leaf = parseInt($(this).val());
				if(isNaN(leaf) || leaf < 1) { return } //页面小于1时不做处理
				if(keycode === 13) {
					$eventTable.page(leaf - 1).draw("page");
				}
			})
			$("#eventQueryBtn", $el).on("click", function() {
				getEventData();
			});

			$("#eventTable", $el).on('click', '.lookpath,tbody>tr', function(e) { //查看事件详情
				e.stopPropagation();
				var $t = $(this),
					$tr, eventId;
				if($t.hasClass('lookpath')) { //span
					$tr = $t.closest('tr');
					eventId = $t.attr('eventid');
				} else { //tr
					$tr = $t;
					eventId = $t.find('.lookpath').attr('eventid');
				}
				var rowIndex = $eventTable.row($tr).index(),
				
					rowData = $eventTable.row($tr).data();
//					console.log(rowIndex,rowData);
				if(rowData.length == 0) {
					return
				}
				var objId = rowData.objId;
				var appIds = rowData.appIds;
				var serverId = rowData.serverId;
                var appName = rowData.appNames;
                var eventType = changeEventType(rowData.eventType);
                var objName = rowData.objName;
				app.dispatcher.load({ //跳转到事件详情页
					title: '事件详情 - ' + eventId,
					moduleId: 'eventList',
					section: 'eventInfo',
					params: {
						eventId: eventId,
						objId: objId,
						appIds: appIds,
						serverId: serverId,
						appName: appName,
						eventType: eventType,
						objName: objName
					}
				});
			});
			
			function changeEventType(data) {
				if(data == 0) {
					return '告警'; //故障
				} else if(data == 1) {
					return '预警'; //预警
				} else if(data == 2) {
					return '通知'; //通知
				}
			}
			
			
			var $detailTable = $('#eventType', $el).DataTable({
				'pageLength': 10,
				'sort': false,
				'searching': false,
				'autoWidth': false,
				'columns': [{
					data: 'index'
				},{
					data: 'eventType',
					defaultContent: '',
					render: function(data) {
						if(data == 0) {
							return '<span class="event-type error"></span>'; //故障
						} else if(data == 1) {
							return '<span class="event-type warning"></span>'; //预警
						} else if(data == 2) {
							return '<span class="event-type notice"></span>'; //通知
						}
					}
				},{
					data: 'in_sys_no',
					defaultContent: '',
					render: function(data, type, row, meta) {
						switch(data){
							case '00':
								return 'aim';
							case '01':
								return 'mocha';
							case '02':
								return '天旦';
							case '03':
								return '虚拟化';
							case '04':
								return '存储';
							case '05':
								return '网络';
							case '06':
								return 'OEM';
						}
					}
				},{
					data: 'app_name',
					defaultContent: ''
				},{
					data: 'obj_name',
					defaultContent: ''
				},{
					data: 'description',
					defaultContent: ''
				},{
					data: 'last_time',
					defaultContent: '',
					render: function(data) {
						return data && new Date(data).Format('yyyy-MM-dd hh:mm:ss');
					}
				}]
			});
			
			//发生次数事件
			$('#eventTable tbody').on('click', 'tr td:nth-child(10)', function(e) {
				e.stopPropagation();
				var eventId = $eventTable.row($(this).parent()).data().eventId;
				var eventType = $eventTable.row($(this).parent()).data().eventType;
				var count = $eventTable.row($(this).parent()).data().tally;
				$('#eventModal', $el).modal('show');
				getEventDetailData(eventId, eventType, count);				
			});
			
			//获取事件详情列表
			function getEventDetailData(id, type, count) {
				app.shelter.show('请稍等...');
				$detailTable.clear().draw();
				app.common.ajaxWithAfa({
					url: 'ShowUserPrivilegeAction_getEventDetailById.do',
					data: {
						eventId: id
					}
				}).then(function(data) {
					app.shelter.hide();
					data = data.results;
					if(data && data.length) {
						data.forEach(function(item, i) {
							item.index = ++i;
							item.eventType = type;
						});
						$detailTable.rows.add(data).draw();
						
						if(data.length > count) {
							$eventTable.draw();
						}
					}
				});
			}
			
			//excel导出事件
			$('#excelBtn', $el).click(function() {
				var params = {};
				for(var key in urlData){
					params[key] = urlData[key];
				}
				params.propertys = '["eventStart"]';
				params.direction = '["asc"]';
				app.common.ajaxWithAfa({
					url: 'ShowUserPrivilegeAction_exportExcel.do',
					data: params
				}).then(function(data){
					downloadFile(data.file);
				});
			});
			
			function downloadFile(file) {
				var iframe = $('<iframe style="display: none"></iframe>');
				$(document.body).append(iframe);
				iframe.attr('src', '/download/' + file);
			}
			
			//事件列表每隔一分钟刷新一次
			handler.setInterval(function(){
				$eventTable.draw();
			}, 60000);			
		},
		unload: function(handler) {},
		pause: function($el, attr, handler) {},
		resume: function($el, attr, handler) {
			
		}
	};
});