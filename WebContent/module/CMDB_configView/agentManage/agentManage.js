define([], function () {
	let cache = {};
	let refreshTimer = null;
	return {
		load: function ($el, scope, handler) {

			scope.simple ? $('.agent-manage-page',$el).addClass('simple') : $('.agent-manage-page',$el).removeClass('simple');
			console.log(scope);
			let appId = scope.appId;
			let agentList = [];
			let activeData = null;
			let ipUpdateMap = {};
			const opTypeMap = {
				AGENT_INSTALL: '代理安装',
				PING: '代理刷新',
				START_AGENT: '代理启动',
				STOP_AGENT: '代理挂起',
				RESTART_AGENT: '代理重启',
				UPDATE_AGENT: '代理更新'
			};

			let shelter = {
				init($ele) {
					let html = `<div class="agent-shelter">
									<div class="agent-shelter-text">
										<div class="animation-wrap"><span></span><span></span><span></span></div>
										<div class="text-val"></div>
									</div>
								</div>`;
					$ele.append(html);
				},
				show(info) {
					$('.agent-shelter .text-val', $el).text(info);
					$('.agent-shelter', $el).addClass('show');
				},
				hide() {
					$('.agent-shelter', $el).removeClass('show');
				}
			};
			shelter.init($('.agent-manage',$el));


			let $agentTable = $('#agentTable', $el).DataTable({
				"pagingType": 'full_numbers',
				'searching': true,
				'bSort': false,
				'pageLength': 10,
				'dom': 'tlpf',
				"bLengthChange": true,
				"aLengthMenu": [5, 10, 15, 20, 25, 50, 100],
				'columns': [{
					data: null,
					defaultContent: '',
					'render': function (data, type, row, meta) {
						return `<input type="checkbox" data-ip="${row.ip}">`;
					}
				}, {
					data: 'appNames',
					defaultContent: ''
				}, {
					data: 'host_name',
					defaultContent: ''
				}, {
					data: 'os_type',
					defaultContent: ''
				}, {
					data: 'ip',
					defaultContent: ''
				}, {
					data: 'instal_status',
					defaultContent: '',
					"render": function (data, type, row, meta) {
						return row['install_user'] ? '已安装' : '未安装';
					}
				}, {
					data: 'agent_status',
					defaultContent: '',
					"render": function (data, type, row, meta) {
						switch (Number(data)) {
							case 0:
								return '<i class="fa fa-cog" style="color:#aeadb3;"></i>离线';
								break;
							case 1:
								return '<i class="fa fa-cog fa-spin" style="color: #22AC38"></i>在线';
								break;
							case 2:
								return '<i class="fa fa-cog" style="color:#aeadb3;"></i>挂起';
						}
					}
				}, {
					data: 'ping_status',
					defaultContent: '',
					"render": function (data, type, row, meta) {
						if(data == undefined){
							return `<span style="color: #d2a110;">未知</span>`;
						}else if(data === true){
							return `<span style="color: #3cca42;">连通</span>`;
						}else if(data === false){
							return `<span style="color: #FF5722;">中断</span>`;
						}
					}
				}, {
					data: 'install_user',
					defaultContent: ''
				}, {
					data: 'protocol',
					defaultContent: ''
				}, {
					data: 'port',
					defaultContent: ''
				}, {
					data: 'updateTime',
					defaultContent: '',
					"render": function (data, type, row, meta) {
						if (!data) {
							return '<i class="fa fa-refresh fa-spin" style="color: #22AC38"></i>';
						} else {
							return data;
						}
					}
				}],
			});


			let multiSelect = app.multiSelect({
				dataTable: $agentTable,
				tableSelector: '#agentTable',
				checkAllSelector: '[data-role="checkAllBtn"]',
				isTREnableCheck: false, // tr不可点击选中
				optBtn: {
					defaultDisabled: '',
					onlySelectedOneEnabled: ''
				},
				context: $el,
				change: function () {
					let num = multiSelect.getSelectedDatas() ? multiSelect.getSelectedDatas().length : 0;
					$('#selectedNumber', $el).html(num);
					if (num == 0) {
						$('#agent_add,#agend_refresh,#agent_start,#agent_pause,#agent_restart,#agent_update', $el).addClass('disabled');
						return;
					}
					renderBtn();
				}
			});

			$('#agent_add,#agend_refresh,#agent_start,#agent_pause,#agent_restart,#agent_update', $el).addClass('disabled');

			function getCheckedTr() {
				let checked = [];
				$('#agentTable tbody>tr', $el).each((index, item) => {
					if ($(item).find('input:checked').length > 0) {
						checked.push($(item));
					}
				});
				return checked;
			}

			function getCheckedData(field) {
				let checkedTr = getCheckedTr();
				let data = [];
				checkedTr.forEach(item => {
					data.push($agentTable.row(item).data()[field]);
				});
				return data;
			}

			function renderBtn() {
				let agentStatus = getCheckedData('agent_status');
				let pingStatus = getCheckedData('ping_status');

				if (pingStatus.includes(undefined) || pingStatus.includes(false)) {
					//ping不通
					$('#agent_add,#agent_start,#agent_pause,#agent_restart,#agent_update', $el).addClass('disabled');
					$('#agend_refresh', $el).removeClass('disabled');
				} else {
					//ping通
					$('#agent_add,#agend_refresh,#agent_start,#agent_pause,#agent_restart,#agent_update', $el).removeClass('disabled');
					agentStatus.includes(0) && $('#agent_pause,#agent_restart', $el).addClass('disabled');
					agentStatus.includes(1) && $('#agent_start', $el).addClass('disabled');
					agentStatus.includes(2) && $('#agent_pause,#agent_restart', $el).addClass('disabled');
				}
			}


			getAgentList().then(res => {
				agentList = res.list;
				autoRefresh();
			});


			function autoRefresh() {
				let ips = agentList.map(item => item.ip);
				//自动执行第一页 前十条
				ips.length = ips.length > 10 ? 10 : ips.length;
				excuteShell(ips, 'PING');
			}

			refreshTimer = handler.setInterval(() => {
				autoRefresh();
			},60*1000*5);

			function getAgentList(date, opType) {
				let whereMap = {
					app_id: appId,
					os_type: 'all',
					agent_status: 'all',
					ping_status: 'all',
					telnet_status: 'all',
					agent_user_status: 'all'
				};
				$agentTable.clear().draw();
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url: 'AgentManagerAction_getAgentListSimple.do',
						data: {
							whereStr: JSON.stringify(whereMap)
						}
					}).then(function (data) {
						if (data.list.length == 0) {
							return;
						}
						let running = stopped = paused = 0;
						data.list.forEach(item => {
							item.agent_status == 0 && stopped++;
							item.agent_status == 1 && running++;
							item.agent_status == 2 && paused++;
							item.updateTime = ipUpdateMap[item.ip];
						});
						//if(date && opType == 'PING'){
						$('#agent_total',$('.appoverview-content')).text(data.list.length);
						$('#agent_running',$('.appoverview-content')).text(running);
						$('#agent_stopped',$('.appoverview-content')).text(stopped);
						$('#agent_paused',$('.appoverview-content')).text(paused);
						$agentTable.rows.add(data.list).draw();
						//}
						resolve(data);
					});
				});
			}

			bindEvents();

			function bindEvents() {

				$('.agentSlider', $el).on('click', function (e) {
					e.stopPropagation();
				});

				//关闭
				$('.agentSlider .close', $el).on('click', function () {
					$('.agentSlider', $el).removeClass('active');
				});
				//选择代理
				$('#agentTable', $el).on('click', 'tbody>tr', function (e) {
					e.stopPropagation();
					let $trObj = $(this);
					activeData = $agentTable.row($trObj).data();
					if ($(this).hasClass('active')) {
						$('#agentSlider .close', $el).trigger('click');
						$trObj.removeClass('active');
					} else if ($(this).siblings('.active').length > 0) {
						$('#agentSlider .close', $el).trigger('click');
						handler.setTimeout(function () {
							showAgentInfoConfig('check', activeData);
							$('#agentSlider>ul>li:eq(1)', $el).removeClass('hide');
						}, 500);
						$trObj.toggleClass('active');
					} else {
						showAgentInfoConfig('check', activeData);
						$('#agentSlider>ul>li:eq(1)', $el).removeClass('hide');
						$trObj.toggleClass('active');
					}
					$trObj.siblings().removeClass('active');
					$('#agentSlider .nav>li:eq(2)', $el).addClass('hide').siblings('li').removeClass('hide');
					$('#agentSlider .nav>li:eq(0)', $el).addClass('active').siblings('li').removeClass('active');
					event.stopPropagation();
				});
				//标签页点击
				$('#agentSlider>ul>li', $el).on('click', function (e) {
					e.stopPropagation();
					let index = $(this).index();
					$(this).addClass('active').siblings().removeClass('active');
					$('#agentSlider>.tab-content>div:eq(' + index + ')', $el).addClass('active').siblings().removeClass('active');
					if (index == 0) {
						showAgentInfoConfig('check', activeData);
					} else if (index == 1) {
						showAgentHistory();
					}
				});
				//新增代理
				$('#agent_add', $el).on('click', function (e) {
					e.stopPropagation();
					showAgentInfoConfig('add');
					$('#agentSlider>ul>li:eq(1)', $el).addClass('hide');
				});

				$('.addtableRowBtn', $el).on('click', function (e) {
					e.stopPropagation();
					if ($(this).hasClass('disabled')) {
						return;
					}
					let role = $(this).attr('data-role');
					let desc = $(this).text();
					let ips = getCheckedData('ip');
					beginOper(ips, role, desc);
				});

			}


			function beginOper(ips, opType, opTypeChinese) {
				$('#agentSlider .nav>li:eq(2)', $el).removeClass('hide').siblings('li').addClass('hide');
				$('#agentSlider', $el).addClass('active').attr('data-type', opType);
				showAgentExcute(ips, opType, opTypeChinese);
			}


			function excuteShell(ips, opType, type) {
				$.ajax({
					type: "post",
					url: "AgentManageAction_shellCall.do",
					data: {
						ip: ips,
						opType: opType
					},
					dataType: "json",
					success: function (data) {
						//shelter.hide();
						if (data.status) {
							var content = data.content;
							if (content.status == 'T') {
								app.alert('提示', opType + '操作成功！', app.alertShowType.SUCCESS);
							} else {
								app.alert('提示', content.msg, app.alertShowType.ERROR);
							}

							if (opType == 'PING') {
								ips.map(item => ipUpdateMap[item] = content.Date);

							}
							getAgentList(content.Date, opType);
						}
					},
					error: function (data) {
						//shelter.hide();
						getAgentList();
						app.alert('提示', content.msg, app.alertShowType.ERROR);
					}
				});
			}


			//代理基本信息
			function showAgentInfoConfig(flag, data) {
				$('#agentSlider .nav>li:eq(0)', $el).addClass('active').siblings().removeClass('active');
				$('#agentSlider .tab-content>div:eq(0)', $el).addClass('active').siblings().removeClass('active');
				$('#agentSlider', $el).addClass('active');
				cache['agentBaseInfo'] && app.dispatcher2.unload('agentBaseInfo');
				cache['agentBaseInfo'] = app.dispatcher2.load({
					title: "",
					moduleId: "CMDB_configView",
					section: ["agentManage", "agentInfo"],
					frameRenderTo: '#agentBaseInfo',
					id: 'agentBaseInfo',
					params: {
						flag: flag,
						info: data
					},
					context: $el
				});
			}

			//代理检测历史
			function showAgentHistory() {
				cache['agentHistory'] && app.dispatcher2.unload('agentHistory');
				cache['agentHistory'] = app.dispatcher2.load({
					title: "",
					moduleId: "CMDB_configView",
					section: ["agentManage", "agentHistory"],
					frameRenderTo: '#agentHistory',
					id: 'agentHistory',
					params: {
						ip: activeData.ip
					},
					context: $el
				});
			}

			//代理安装
			function showAgentExcute(ips, opType, opTypeChinese) {
				$('#agentSlider .nav>li:eq(2)', $el).addClass('active').siblings().removeClass('active');
				$('#agentSlider .tab-content>div:eq(2)', $el).addClass('active').siblings().removeClass('active');
				cache['agentExcute'] && app.dispatcher2.unload('agentExcute');
				cache['agentExcute'] = app.dispatcher2.load({
					title: "",
					moduleId: "CMDB_configView",
					section: ["agentManage", "agentExcute"],
					frameRenderTo: '#agentExcute',
					id: 'agentExcute',
					params: {
						ips: ips,
						opType: opType
					},
					context: $el
				});
			}

			// 增加 条件筛选
			$('#instal_status,#ping_status', $el).on('change', function () {
				$agentTable.column(5).search($('#instal_status', $el).val());
				$agentTable.column(7).search($('#ping_status', $el).val());
				$agentTable.draw();
			});
			$('#agent_status', $el).on('change', function () {
				let val = $(this).val();
				let arr = agentList.filter(item => item.agent_status == val);
				console.log(arr);
				$agentTable.clear();
				$agentTable.rows.add(arr).draw();
			});
			




		},
		unload: function (handler) {
			for (let i in cache) {
				cache[i] && app.dispatcher2.unload(i);
				cache[i] = null;
			}
			handler.clearInterval(refreshTimer);
			refreshTimer = null;
		},
		pause: function ($el, attr, handler) {

		},
		resume: function ($el, attr, handler) {}
	};
});