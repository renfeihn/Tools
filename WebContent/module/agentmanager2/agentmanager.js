define(["jquery"], function() {
	return {
		load: function($el, scope, handler) {
			var thisDataTbObj,
				judge,
				localFileName,
				$agmAgentCt = $('#agmAgentCtt', $el),
				$modal = $("#modal", $el),
				$modalFrom = $("#modalForm", $el),
				$modalFile = $("#modalFile", $el),
				whereMap = {
					os_type: 'all',
					agent_status: 'all',
					ping_status: 'all',
					telnet_status: 'all',
					agent_user_status: 'all'
				};

			function initDataTable() {
				thisDataTbObj = $('#agmTb', $el).DataTable({
					'bPaginate': true, //开关，是否显示分页器
					'bStateSave': false,
					'aoColumnDefs': [
						{ bSortable: false, aTargets: [0, 5] },
						{
							targets: 4,
							render: function(data) {
								switch(Number(data)) {
									case 0:
										return '<i class="fa fa-cog" style="color:#aeadb3;"></i>未启动';
										break;
									case 1:
										return '<i class="fa fa-cog fa-spin" style="color: #22AC38"></i>已启动';
										break;
									case 2:
										return '<i class="fa fa-cog" style="color:#aeadb3;"></i>挂起';
								}

							}
						},
						{ //格式化最后更新时间
							targets: 12,
							render: function(data) {
								return data && new Date(data).Format('yyyy-MM-dd hh:mm:ss');
							}
						}
					],
					'aaSorting': [
						[2, 'desc']
					],
					'searching': true,
					'bSort': true, //排序
					// 'scrollY': 500,
					// 'scrollX': true,
					'pageLength': 15,
					'drawCallback': function() {
						$('[name="agmChk"]', $el).attr('checked', false);
						$('.agm-agent-ctt', $el).each(function() {
							var $this = $(this),
								ip = $this.attr('id');
							$('input#' + ip, $el).attr('checked', true);
						})
						var $agmChk = $('[name="agmChk"]', $el);
						var isCheckedInput = $("[name=agmChk]", $el).filter(function() {
							return $(this).is(":checked");
						});
						if($agmChk.length && $agmChk.length == isCheckedInput.length) {
							handler.setTimeout(function() {
								$("#agmSelAll", $el).attr("checked", true);
							}, 0)
						}
					}
				});
				drawDataTables();
			}
			initDataTable();

			function drawDataTables(reflashWhole) {
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': 'AgentManagerAction_getAgentList.do',
					'async': true,
					'dataType': 'json',
					'data': { whereStr: JSON.stringify(whereMap) },
					'success': function(data) {
						if(data && data.status) {
							var list = data.content.list;
							thisDataTbObj && thisDataTbObj.clear();
							if(reflashWhole) {
								thisDataTbObj.rows.add(list).draw();
							} else {
								thisDataTbObj.rows.add(list).draw(false);
							}
							$('.agm-agent-ctt', $el).each(function() {
								var $this = $(this),
									ip = $this.attr('id');
								$('input#' + ip, $el).attr('checked', true);
							})
						}
					}
				});
			}

			initOs();

			function initOs() {
				$("[data-name='os_type']", $el).empty();
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_getOsTypeList.do",
				}).done(function(data) {
					var result = data.OsType;
					if(result.length > 0) {
						var txt = '<option value="all">全部</option>';
						result.forEach(function(item) {
							txt += '<option value="' + item + '">' + item + '</option>';
						})
						$("[data-name='os_type']", $el).append(txt);
					}
				});
			}

			function setAgentChk($event) {
				var ip = $event.attr('id'),
					flag = $event.attr('checked');
				if(flag) {
					if(!$('#' + ip + '.agm-agent-ctt').length) {
						$agmAgentCt.append('<div class="agm-agent-ctt" id="' + ip + '">' + ip.split('-').join('.') + '	<div class="spinner agm-stop"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div></div></div>');
					}
				} else {
					var $target = $('#' + ip + '.agm-agent-ctt');
					if($target.length) $target.remove();
				}
			}

			//代理更新的函数
			function updateAgent(opType, id) {
				var $btn = $('#' + id, $el);
				if($btn.hasClass('agm-disalbe')) {
					app.alert('已锁定其它操作，请重置操作后再选择！');
				} else {
					$('.agm-oper-btns', $el).addClass('hide');
					if($('.agm-agent-ctt', $el).length) {
						$('.agm-radio-hasInserver', $modalFile).remove();
						$("[name='whichType']", $modalFile).eq(1).attr("checked", true);
						$("[name='whichType']", $modalFile).eq(1).trigger("change");
						app.common.ajaxWithAfa({
							url: "AgentManagerAction_getAgentTarList.do",
						}).done(function(data) {
							if(data.agentTarList && data.agentTarList.length > 0) {
								var txt = "";
								var list = data.agentTarList;
								for(var i = 0; i < list.length; i++) {
									//						    	list[i]=JSON.parse(list[i]);
									txt += '<div class="agm-radio-hasInserver"><span><input type="radio" name="filename" value="' + list[i].fileName + '" checked="checked"></span><span>' + list[i].fileName + '</span><span>' + list[i].fileSize + '</span><span>' + list[i].time + '</span></div> '
								}
								$(".agm-serverContent", $modalFile).append(txt);
								$(".agm-radio-hasInserver:first input", $modalFile).attr("checked", "true")
							} else {
								app.alert("无代理文件，请选择本地文件上传");
							}
							$modalFile.modal("show");
						});

					} else {
						app.alert('未选择任何服务器，请选择！');
					}
				}

			}

			function beginOper(opType, id, opTypeChinese) {
				var $btn = $('#' + id, $el);
				if($btn.hasClass('agm-disalbe')) {
					app.alert('已锁定其它操作，请重置操作后再选择！');
				} else {
					$('.agm-oper-btns', $el).addClass('hide');
					if($('.agm-agent-ctt', $el).length) {
						app.confirm({
							title: '确认',
							content: '确定执行此项操作么?',
							btnCancel: '否',
							btnConfirm: '是',
							confirmHandler: function() {
								var ips = [];
								$('.agm-agent-ctt', $el).each(function() {
									var $this = $(this),
										ip = $this.attr('id').split('-').join('.');
									ips.push(ip);
									$this.find('.spinner').removeClass('agm-stop');
								});
								app.shelter.show("正在执行,请稍等...");
								$.ajax({
									type: "post",
									url: "AgentManageAction_shellCall.do",
									data: { ip: ips, opType: opType },
									dataType: "json",
									success: function(data) {
										app.shelter.hide();
										if(data.status) {
											var content = data.content;
											if(content.status == 'T') {
												app.alert('提示', opType + '操作成功！', app.alertShowType.SUCCESS);
											} else {
												app.alert('提示', content.msg, app.alertShowType.ERROR);
											}
											var stats = content.stats;
											$('.agm-agent-ctt', $el).each(function() {
												var $this = $(this);
												$this.find('.spinner').remove();
												var ip = $this.attr('id').split('-').join('.');
												var icon = '<i class="agm-green-icon"></i>';
												if(stats && stats["0"] && (stats["0"].indexOf(ip) != -1)) {
													icon = '<i class="agm-red-icon"></i>';
												} else if(stats && stats["2"] && (stats["2"].indexOf(ip) != -1)) {
													icon = '<i class="agm-yellow-icon"></i>';
												}
												$this.append(icon);
											});
											if(content.opStats) {
												var txt = '<li><div><p>操作:<span>' + opTypeChinese + '---' + content.Date + '</span></p><ul class="agmOptionInfoList-ul"><li ><span>Ip</span><span>状态</span><span>返回信息</span></li></ul><ul>';
												var opStats = content.opStats;
												opStats["0"].forEach(function(item) {
													txt += '<li title="ip：' + item.ip + ';&#10状态：失败;&#10返回信息：' + item.msg + '"><span>' + item.ip + '</span><span class="age-red">失败</span><span><span>' + item.msg + '</span></span></li>'
												});
												opStats["1"].forEach(function(item) {
													txt += '<li title="ip：' + item.ip + ';&#10状态：成功;&#10返回信息：' + item.msg + '"><span>' + item.ip + '</span><span class="age-green">成功</span><span><span>' + item.msg + '</span></span></li>'
												});
												txt += "</ul></div></li>"
												$("#agmOptionInfoList", $el).prepend(txt);
												$("#agmOptionInfoList", $el).animate({ scrollTop: 0 });
											}

										}
										drawDataTables();
										$('#agmOp', $el).removeClass('agm-disable');
										$('#agmClear', $el).removeClass('agm-disable');
									},
									error: function(data) {
										app.shelter.hide();
										var content = data.content;
										$('.agm-agent-ctt', $el).each(function() {
											var $this = $(this);
											$this.find('.spinner').remove();
											$this.append('<i class="agm-red-icon"></i>');
										});
										drawDataTables();
										app.alert('提示', content.msg, app.alertShowType.ERROR);
									}
								});
							}
						});
					} else {
						app.alert('未选择任何服务器，请选择！');
					}
				}
			}

			this.delegateEvents({
				'change #agmTbody': function(evnet) {
					var $event = $(event.target || window.event.srcElement).closest('input');
					if($event.attr('name') == 'agmChk') {
						setAgentChk($event)
						var isCheckedInput = $(".agm-agent-ctt", $el);
						if(isCheckedInput.length > 0) {
							$("#editBtn", $el).removeClass("disabled");
							$("#delBtn", $el).removeClass("disabled");
							$("#watchBtn", $el).removeClass("disabled");
							if(isCheckedInput.length > 1){
								$("#editBtn", $el).addClass("disabled");
								$("#watchBtn", $el).addClass("disabled");
							}else{
								$("#editBtn", $el).removeClass("disabled");
								$("#watchBtn", $el).removeClass("disabled");
							} 
						} else {
							$("#editBtn", $el).addClass("disabled");
							$("#delBtn", $el).addClass("disabled");
							$("#watchBtn", $el).addClass("disabled");
						}

					}
				},
				'click #agmSelAll': function() {
					if($('#agmSelAll').attr('checked')) {
						$('[name="agmChk"]', $el).attr('checked', true);
						$('[name="agmChk"]', $el).each(function() {
							setAgentChk($(this))
						});

					} else {
						$('[name="agmChk"]', $el).attr('checked', false);
						$('[name="agmChk"]', $el).each(function() {
							setAgentChk($(this))
						});

					}
					var isCheckedInput = isCheckedInput = $(".agm-agent-ctt", $el);
					if(isCheckedInput.length > 0) {
						$("#editBtn", $el).removeClass("disabled");
						$("#delBtn", $el).removeClass("disabled");
						$("#watchBtn", $el).removeClass("disabled");
						if(isCheckedInput.length > 1) {
							$("#editBtn", $el).addClass("disabled");
							$("#watchBtn", $el).addClass("disabled");
						}
					} else {
						$("#editBtn", $el).addClass("disabled");
						$("#watchBtn", $el).addClass("disabled");
						$("#delBtn", $el).addClass("disabled");
					}
				},
				'click #agmTb_wrapper': function(event) {
					var $event = $(event.target || window.event.srcElement).closest('a');
					if($event.hasClass('paginate_button') && !$event.hasClass('current')) {
						$('#agmSelAll').attr('checked', false);
					}
				},
				'click #agmOp': function() {
					if(!$('#agmOp', $el).hasClass('agm-disable')) {
						$('.agm-oper-btns', $el).toggleClass('hide');
					}
				},
				'click #agmClear': function() {
					if(!$('#agmClear', $el).hasClass('agm-disable')) {
						drawDataTables(true);
						$('.agm-btn', $el).removeClass('agm-disalbe');
						$('#agmAgentCtt', $el).empty();
						$('#agmOptionInfoList', $el).empty();
						$("#editBtn", $el).addClass("disabled");
						$("#watchBtn", $el).addClass("disabled");
						$("#delBtn", $el).addClass("disabled");
						//						$("#agmOptionInfoList",$el).empty();
						$('input', $el).attr('checked', false);
					}
				},
				'click #agmPing': function() {
					beginOper('PING', 'agmPing', 'PING');
				},
				'click #agmTel': function() {
					beginOper('TELNET_TEST', 'agmTel', '');
				},
				'click #agmUser': function() {
					beginOper('USER_DETECTION', 'agmUser');
				},
				'click #agmIns': function() {
					beginOper('AGENT_INSTALL', 'agmIns');
				},
				'click #agmSta': function() {
					beginOper('START_AGENT', 'agmSta', '唤醒代理');
				},
				'click #agmStop': function() {
					beginOper('STOP_AGENT', 'agmStop', '挂起代理');
				},
				'click #agmStatus': function() {
					beginOper('AGENT_STATUS', 'agmStatus', '状态检测');
				},
				'click #agmShutdown': function() {
					beginOper('SHUTDOWN_AGENT', 'agmShutdown', '代理停止');
				},
				'click #agmUpdt': function() {
					updateAgent('UPDATE_AGENT', 'agmUpdt', '代理更新');
				},
				'click #agmRestart': function() {
					beginOper('RESTART_AGENT', 'agmRestart', '重启代理');
				},
				'change .agm-sels>span>select': function(event) {
					var $event = $(event.target || window.event.srcElement).closest('select');
					if($event.length) {
						whereMap[$event.data('name')] = $event.val();
						drawDataTables(true);
					}
				},
				'click .agm-sels>span>button': function(event) {
					var $event = $(event.target || window.event.srcElement).closest('button');
					if($event.length) {
						var optionName = $event.data('name');
						var isCheckedInput = $(".agm-agent-ctt", $el);
						if(optionName == "addNewAgent") {
							judge = true;
							$modal.find(".modal-header>h3").text("新增");
							addNewAgent();
						} else if(optionName == "editAgent") {
							if(isCheckedInput.length > 1) {
								app.alert("只支持修改一个选项")
								return false;
							}
							if(!$event.hasClass("disabled")) {
								judge = false;
								editAgent(isCheckedInput.attr("id").split("-").join("."));
								$modal.find(".modal-header>h3").text("修改");
							}
						} else if(optionName == "deleteAgent") {
							if(!$event.hasClass("disabled")) {
								deleteAgent();
							}
						} else if(optionName == "monitorAgent") {
							if(!$event.hasClass("disabled")) {
								var tr = thisDataTbObj.row($('[name="agmChk"]:checked', $el).closest('tr')).data();
								var rowData = {
									"host_name": tr[1],
									"os_type": tr[2],
									"ip": tr[3],
									"id": tr[13],
								}
								loadAgentMonitor(rowData);
							}
						}
					}
				}

			})

			//add and edit By lhs20180309
			$("#agmAgentCtt", $el).on("click", ".agm-agent-ctt", function() {
				var id = $(this).attr("id");
				$(this).remove();
				$('[name="agmChk"]', $el).filter('[id="' + id + '"]').attr("checked", false);
				var isCheckedInput = isCheckedInput = $(".agm-agent-ctt", $el);
				if(isCheckedInput.length > 0) {
					$("#editBtn", $el).removeClass("disabled");
					$("#watchBtn", $el).removeClass("disabled");
					$("#delBtn", $el).removeClass("disabled");
					if(isCheckedInput.length > 1) {
						$("#editBtn", $el).addClass("disabled");
						$("#watchBtn", $el).addClass("disabled");
					}
				} else {
					$("#editBtn", $el).addClass("disabled");
					$("#watchBtn", $el).addClass("disabled");
					$("#delBtn", $el).addClass("disabled");
				}
			})

			//ip 搜索
			$("[data-name='agent-searchIp']", $el).on('input propertychange', function() {
				var value = $("[data-name=agent-searchIp]", $el).val();
				thisDataTbObj.column(3).search(value).draw();
			})

			//根据iP获取主机名和操作系统
			$("#ip", $el).on("change", function() {
				var ip = $.trim($(this).val());
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_checkAgentAndGetServerByIp.do",
					data: {
						ip: ip,
					}
				}).done(function(data) {
					var result = data.result;
					if(result.flag) {
						if(result.server) {
							$("#host_name", $el).val(result.server.serverName);
							$("#os_type", $el).val(result.server.model);
							if("otherIp" in result.server){
								$("#install_user", $el).val(result.server.otherIp);
								$("#agent_user_pwd", $el).val(result.server.wwpn);
							}else{
								app.alert("在“资源管理”中配置代理后，可根据IP自动回显【代理安装用户】和【密码】");
							}
							$modal.attr('objectId', result.server.objectId);
						} else {
							app.alert(result.msg);
						}
					} else {
						app.alert(result.msg)
					}

				});
			})

			//协议与端口
			$("#protocol", $el).on("change", function() {
				var value = $(this).val();
				if(value == "ssh") {
					$("#port", $el).val(22);
				} else {
					$("#port", $el).val(23)
				}
			})

			//新增
			function addNewAgent() {
				$modalFrom[0].reset();
				$("#protocol", $el).trigger("change");
				$modal.modal("show");
				$modal.removeAttr('objectId');
			}

			//编辑
			function editAgent(ip) {
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_getAgentByIp.do",
					data: {
						ip: ip
					}

				}).done(function(data) {
					setModalInfo(data.result[0]);
					$modal.modal("show");
				});
			}

			function setModalInfo(result) {
				// $("#ip", $el).attr("readonly", true);
				for(var i in result) {
					$("[name='" + i + "']", $el).val(result[i])
				}
			}

			//删除
			function deleteAgent() {
				var isCheckedInput = $(".agm-agent-ctt", $el);
				var ipArr = [];
				isCheckedInput.each(function() {
					ipArr.push($(this).attr("id").split("-").join("."));
				})

				app.confirmDialog({
					sTitle: "请确认",
					sType: "search",
					sContent: '是否确认删除IP为“'+ ipArr.join(',') +'”的代理吗？',
					sBtnConfirm: '确定',
					sBtnCancel: '取消',
					fnConfirmHandler: function() {
						app.common.ajaxWithAfa({
							url: "AgentManagerAction_deleteAgentByIp.do",
							data: {
								ip: ipArr.join(","),
							}
						}).done(function() {
							$("#agmClear", $el).trigger("click");
							app.alert("删除成功");
							$("#editBtn", $el).addClass("disabled");
							$("#watchBtn", $el).addClass("disabled");							
							$("#delBtn", $el).addClass("disabled");
						});
					},
				});
			}

			$("#save", $modal).on("click", function(e) {
				e.stopPropagation();
				var params = app.common.serializeObject($modalFrom);
				params.id = $modal.attr('objectId')||params.id;
				if(validate()) {
					if(judge) {
						saveToAdd(params);
					} else {
						saveToEdit(params);
					}
				}
			});

			// 表单数据验证
			function validate() {
				var validateResult = app.validate.validate({
					$context: $modal,
					data: [{
						"id": "ip",
						"filter": {
							"require": true
						},
					}, {
						"id": "os_type",
						"filter": {
							"require": true
						},
					}, {
						"id": "host_name",
						"filter": {
							"require": true,
						},
					}, {
						"id": "install_user",
						"filter": {
							"require": true
						},
					}, {
						"id": "agent_user_pwd",
						"filter": {
							"require": true,
						},
					}, {
						"id": "protocol",
						"filter": {
							"require": true
						},
					}, {
						"id": "port",
						"filter": {
							"require": true
						},
					}],
					correctCallback: function($ele, correctMsg) {
						$ele.next().next().addClass('hide');
					},
					errorCallback: function($ele, errMsg) {
						$ele.next().next().removeClass('hide').text(errMsg);
					}
				});
				return validateResult.bResult;
			}

			//新增的提交
			function saveToAdd(params) {
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_saveAgent.do",
					data: {
						dataStr: JSON.stringify(params)
					}
				}).done(function(data) {
					app.alert("增加成功");
					$modal.modal("hide");
					$("#agmClear", $el).trigger("click");
					$("#editBtn", $el).addClass("disabled");
					$("#watchBtn", $el).addClass("disabled");
					$("#delBtn", $el).addClass("disabled");
					
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
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_modifyAgent.do",
					data: {
						dataStr: JSON.stringify(sendJson),
						ip: params.ip
					}
				}).done(function(data) {
					$("#agmClear", $el).trigger("click");
					app.alert("修改成功");
					$("#editBtn", $el).addClass("disabled");
					$("#watchBtn", $el).addClass("disabled");
					$("#delBtn", $el).addClass("disabled");
					$modal.modal("hide");
				});
			}

			/*代理更新文件的操作*/
			//选择文件
			$(".agm-addFile", $el).on("change", '#agenfile', function() {
				var file = $(this)[0].files;
				if(file.length) {
					var fileName = file[0].name;
					var fileSize = file[0].size;
					$(".agm-fileName", $el).text(fileName);
					$(".agm-fileSize", $el).text(fileSize);
				} else {
					$(".agm-fileName", $el).text("尚未选择文件");
					$(".agm-fileSize", $el).text("尚未选择文件");
				}
				localFileName = "";
			})

			//字节换算
			function byteToSize(bytes) {
				if(bytes === 0) return "0 B";
				var k = 1024;
				var size = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
				var i = Math.floor(Math.log(bytes) / Math.log(k));
				return(bytes / Math.pow(k, i)).toPrecision(3) + "" + size[i];
			}

			//选择本地文件还是服务器的文件
			$("[name='whichType']", $modalFile).on("change", function() {
				var value = $(this).val();
				if(value == "local") {
					$(".agm-localContent", $modalFile).show();
					$(".agm-serverContent", $modalFile).hide();
				} else {
					$(".agm-localContent", $modalFile).hide();
					$(".agm-serverContent", $modalFile).show();
				}
			})

			//代理更新选择文件
			$("#save", $modalFile).on("click", function(e) {
				e.stopPropagation();
				var fileName;
				var $whichType = $("input[name='whichType']:checked", $el).val();
				var opType = "UPDATE_AGENT";
				var opTypeChinese = "代理更新";
				if($whichType == "local") {
					fileName = localFileName;
					if(fileName == "" || fileName == undefined) {
						app.alert("请先上传文件");
						return;
					}
				} else {
					fileName = $("input[name='filename']:checked", $el).val();
				}
				var ips = [];
				$('.agm-agent-ctt', $el).each(function() {
					var $this = $(this),
						ip = $this.attr('id').split('-').join('.');
					ips.push(ip);
					$this.find('.spinner').removeClass('agm-stop');
				});
				$modalFile.modal("hide");
				app.shelter.show("正在执行,请稍等...");
				$.ajax({
					type: "post",
					url: "AgentManageAction_shellCall.do",
					data: {
						ip: ips,
						opType: "UPDATE_AGENT",
						filename: fileName
					},
					dataType: "json",
					success: function(data) {
						app.shelter.hide();
						if(data.status) {
							var content = data.content;
							if(content.status == 'T') {
								app.alert('提示', opType + '操作成功！', app.alertShowType.SUCCESS);
							} else {
								app.alert('提示', content.msg, app.alertShowType.ERROR);
							}
							var stats = content.stats;
							$('.agm-agent-ctt', $el).each(function() {
								var $this = $(this);
								$this.find('.spinner').remove();
								var ip = $this.attr('id').split('-').join('.');
								var icon = '<i class="agm-green-icon"></i>';
								if(stats && stats["0"] && (stats["0"].indexOf(ip) != -1)) {
									icon = '<i class="agm-red-icon"></i>';
								} else if(stats && stats["2"] && (stats["2"].indexOf(ip) != -1)) {
									icon = '<i class="agm-yellow-icon"></i>';
								}
								$this.append(icon);
							});
							if(content.opStats) {
								var txt = '<li><div><p>操作:<span>' + opTypeChinese + '---' + content.Date + '</span></p><ul class="agmOptionInfoList-ul"><li ><span>Ip</span><span>状态</span><span>返回信息</span></li></ul><ul>';
								var opStats = content.opStats;
								opStats["0"].forEach(function(item) {
									txt += '<li title="ip：' + item.ip + ';&#10状态：失败;&#10返回信息：' + item.msg + '"><span>' + item.ip + '</span><span class="age-red">失败</span><span><span>' + item.msg + '</span></span></li>'
								});
								opStats["1"].forEach(function(item) {
									txt += '<li title="ip：' + item.ip + ';&#10状态：成功;&#10返回信息：' + item.msg + '"><span>' + item.ip + '</span><span class="age-green">成功</span><span><span>' + item.msg + '</span></span></li>'
								});
								txt += "</ul></div></li>"
								$("#agmOptionInfoList", $el).prepend(txt);
								$("#agmOptionInfoList", $el).animate({ scrollTop: 0 });
							}

						}
						drawDataTables();
						$('#agmOp', $el).removeClass('agm-disable');
						$('#agmClear', $el).removeClass('agm-disable');
					},
					error: function(data) {
						app.shelter.hide();
						var content = data.content;
						$('.agm-agent-ctt', $el).each(function() {
							var $this = $(this);
							$this.find('.spinner').remove();
							$this.append('<i class="agm-red-icon"></i>');
						});
						drawDataTables();
						app.alert('提示', content.msg, app.alertShowType.ERROR);
					}
				});
			})

			//提交本地文件
			$("#agm-uploadFile", $modalFile).on("click", function(e) {
				e.stopPropagation();
				var fileId = $('input[type="file"]').attr('id');
				var files = $('input[type="file"]')[0].files;
				var acceptFileTypes = /(\.|\/)(tar|jar|zip|aar)$/i;
				if(files.length <= 0) {
					app.alert("请先选择要上传的文件");
					return;
				}
				if(!acceptFileTypes.test(files[0].name)) {
					app.alert("请上传tar/jar/zip/aar格式的压缩文件");
					return;
				}
				app.shelter.show("正在上传文件");
				//上传文件到服务器
				$.ajaxFileUpload({
					url: "AgentManagerAction_uploadAgentFile.do", //处理文件脚本
					secureuri: false,
					fileElementId: fileId, //file控件id
					dataType: 'json',
					timeout: 30000,
					data: {
						timeout: 2000
					},
					async: false,
					success: function(data) {
						app.shelter.hide();
						if(!data.status) {
							app.alert("文件上传失败，请联系管理员！");
							return;
						}
						localFileName = data.content.fileName;
						app.alert("文件上传成功！");
					},
					error: function(request, status, err) {
						app.shelter.hide();
						if(status == "timeout") {
							app.alert("请求超时，请稍后再试！");

						}
					}
				});

			});

			// 取消按钮
			$("#cancel", $modal).on("click", function() {
				$modal.modal("hide");
			});

			$("#cancel", $modalFile).on("click", function() {
				$modalFile.modal("hide");
			});

			/*// 模态框关闭事件，无论是取消按钮还是右上角关闭按钮，都清空表单，初始化页面modal
			$modal.on("hide.bs.modal", function() {
				$(".help-inline", $el).addClass("hide");
				$("#ip", $el).removeAttr("readonly");
				$("<input type='reset' style='display:none'>").appendTo($("form", $modal)).trigger("click").remove();
			});*/

			$modalFile.on("hide.bs.modal", function() {
				$(".agm-fileName", $el).text("尚未选择文件");
				$(".agm-fileSize", $el).text('尚未选择文件');
				localFileName = "";
				var file = $("#agenfile");
				file.after(file.clone().val(""));
				file.remove();
			});

			function loadAgentMonitor(tr) {
				app.dispatcher.load({
					title: "代理监控详情",
					moduleId:"agentMonitor",
					section:["agentMonitorDetails"],
					id: tr.ip,
					params:{
						data: tr
					}
				});
			}
		},
		unload: function(handler) {},
		pause: function($el, attr, handler) {},
		resume: function($el, attr, handler) {}
	};
});
