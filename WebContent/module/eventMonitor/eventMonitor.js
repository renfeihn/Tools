define([ "jquery" ], function() {
	
	var eEvent;
	
	return {
		load : function($el, scope, handler) {
			eEvent = app.echarts.init($('#eEvent', $el)[0])
			var urlData = {
				pageSize:10
			};
			var $userModal = $('#userModal', $el);
			$('#eventTime1,#eventTime2', $el).datetimepicker({
				format: 'yyyy-mm-dd hh:ii:00',
				minView: 0,
				keyboardNavigation: false,
				autoclose: 1
			});

			var $dataTable = $("#dataTable", $el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				"serverSide": true,
				'pageLength': 10,
				"ajax": function(data, callback, settings) {
					setUrlData();
					urlData.page = data.length == 0 ? 0 : data.start / data.length;
					queryEvent(urlData).then(function (ajaxdata) {
						var result = ajaxdata.events;
						var content = [],
							elements = 0,
							pages = 0;
						if(result) {
							content = result.content;
							elements = result.totalElements;
						}
						for(var i in content) {
							content[i]['index'] = '<input type="checkbox"/>'+parseInt((data.start++) + 1);
						}
						callback({
							data: content,
							recordsFiltered: elements
						});
					});
				},
				'columns' 	: [{
					data : 'index',
				},{
					data : 'eventType', defaultContent : ''
				},{
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
							case '07':
								return 'asda';
						}
					}
				},{
					data : 'eventTitle', defaultContent : ''
				},{
					data : 'metricName', defaultContent : ''
				},{
					data : 'tally', defaultContent : ''
				},{
					data : 'eventLevel', defaultContent : ''
				},{
					data : 'dealStatus', defaultContent : ''
				},{
					data : 'eventEnd', defaultContent : ''
				},{
					data : null, defaultContent : ''
				}],
				'aoColumnDefs' : [{
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
				},{
					"render": function(data, type, row, meta) {
						var html = '<span class="ignore '+ (row.dealStatus=="已解除"?'disabled':'') +'">忽略</span> ';
							// html += '<span class="ToOrder'+ (!row.itilStatus || row.itilStatus == '待分派'?'':' disabled')+'">转工单</span>';
							// html += '<span class="payAttention">加关注</span>';

						return html;
                    },
                    "targets" : 9
				}]
			});
			var $userTable = $("#userTable", $el).DataTable({
				"paging": false,
				'bAutowidth': true,
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'null', defaultContent : '<i class="fa fa-square-o userSelect"></i>'
				},{
					data : 'index',
				},{
					data: 'username', defaultContent:''
				},{
					data: 'nickname', defaultContent:''
				},{
					data: '', defaultContent:'管理员'
				}]
			})
			
			function setUrlData() {
				urlData.eventType = $('#eventList-eventType', $el).val();
				urlData.dealStatus = $('#eventList-handleStatus', $el).val();

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
			}
			
			$("#ignoreEvent", $el).on("click", function (e) {
				var $tr = $("#dataTable input[type='checkbox']", $el);
				var arr = [];
				$.each($tr, function () {
					var status = $(this).prop('checked');
					if (status) {
						var tr = $dataTable.row($(this).parents('tr')).data();
						arr.push(tr.eventId);
					}
				})
				if (arr.length === 0) {
					return;
				}
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定忽略事件？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(arr){
	                	console.log(arr)
	                	app.common.ajaxWithAfa({
	                		url:'LogWarningAction_ignoreEvent.do',
	                		data:{
	                			eventIds: JSON.stringify(arr)
	                		}
	                	}).done(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert('忽略成功！');
	                			getEventSummary();
	                			$dataTable.ajax.reload();
	                		}else{
	                			app.alert('忽略失败！');
	                		}
	                	})
	                },
	                aArgs: [arr]
				});
			})

			$('#dataTable', $el).on('click', 'tbody>tr', function(){
				var tr = $dataTable.row( this ).data();
				if(tr == undefined){
					return;
				}
				if(tr.eventSource == '07'){
					app.dispatcher.load({
						title: "事件详情 - "+tr.eventId,
						moduleId:"eventMonitor",
						section:["eventMonitorDetails"],
						id:tr.eventId,
						params:{
							data:tr
						}
					});
				}else{
					// dealMsg
					var eventId = tr.eventId;
					var objId = tr.objId;
					var appIds = tr.appIds;
					var serverId = tr.serverId;
	                var appName = tr.appNames;
	                var eventType = changeEventType(tr.eventType);
	                var objName = tr.objName;
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
				}
			}).on('click', 'span.ignore', function(event) {
				event.preventDefault();
				if ($(this).hasClass('disabled')) {
					return;
				}
				var tr = $dataTable.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定忽略该事件？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'LogWarningAction_ignoreEvent.do',
	                		data:{
	                			eventIds: JSON.stringify([tr.eventId])
	                		}
	                	}).done(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert('忽略成功！');
	                			getEventSummary();
	                			$dataTable.ajax.reload();

	                		}else{
	                			app.alert('忽略失败！');
	                		}
	                	})
	                },
	                aArgs: [tr]
				});
				event.stopPropagation();
			}).on('click', 'input[type="checkbox"]', function(event) {
				event.stopPropagation();
				console.log($(this).prop('checked'));
			}).on('click', 'span.ToOrder', function(event) {
				event.preventDefault();
				if ($(this).hasClass('disabled')) {
					event.stopPropagation();
					return;
				}
				var tr = $dataTable.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定将该事件转工单？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'LogWarningAction_sendEventToItil.do',
	                		data:{
	                			eventId: tr.eventId
	                		}
	                	}).done(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert('转工单成功！');
	                			$dataTable.clear().draw();
	                		}else{
	                			app.alert('转工单失败！');
	                		}
	                	})
	                },
	                aArgs: [tr]
				});
				event.stopPropagation();
			}).on('click', 'span.payAttention', function(event) {
				event.preventDefault();
				if ($(this).hasClass('disabled')) {
					event.stopPropagation();
					return;
				}
				var tr = $dataTable.row($(this).parents('tr')).data();
				initUserTable().then(function () {
					initUserModal('加关注', tr);
					$('#selectAll', $userModal).show();
				});
				event.stopPropagation();
			});

			$('#eventQueryBtn', $el).on('click', function(event) {
				event.preventDefault();
				$dataTable.clear().draw();
			});

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
					
					$('#eventQueryBtn', $el).trigger('click');
				}
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

			/**
			 * 事件列表查询
			 * @param  {[type]} urlData ajax参数
			 * @return {[type]} deferred
			 */
			function queryEvent(urlData) {
				return app.common.ajaxWithAfa({
					url: 'ShowUserPrivilegeAction_getEventsByUserPrivilege.do',
					data:urlData
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			function initUserTable() {
				return app.common.ajaxWithAfa({
					url: 'UserAction_getAllUsers.do',
				}).done(function (data) {
					$userTable.clear().draw();
					if(data.users && data.users.length > 0){
						data.users.forEach(function (item, index) {
							item.index = index+1;
						})
						$userTable.rows.add(data.users).draw();
					}
					return $.Deferred().resolve(data);
				})
			}

			function initUserModal(title, data) {
				$('#selectAll', $userModal).addClass('fa-check-square').trigger('click');
				$userModal.modal('show');
			}

			$userModal.on('click', '#selectAll', function(event) {
				event.preventDefault();
				if($(this).hasClass('fa-check-square')){//取消选择
					$(this).addClass('fa-square-o').removeClass('fa-square-o fa-minus-square selected');
					$userModal.find('tbody i').removeClass('fa-check-square selected').addClass('fa-square-o').parents('tr').removeClass('selected');
				}else{
					$userModal.find('tbody i').removeClass('fa-square-o').addClass('fa-check-square selected').parents('tr').addClass('selected');
					$(this).addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
				}
				return;
			}).on('click', '.fa-check-square', function(event) {
				event.preventDefault();
				$(this).removeClass('fa-check-square selected').addClass('fa-square-o');
				$(this).parents('tr').removeClass('selected');
				var trLen = $userModal.find('tbody tr').length;
				var selectedTr = $userModal.find('tbody tr.selected').length;
				var $selectAll = $('#selectAll', $userModal);
				if(selectedTr == trLen){
					$selectAll.addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
				}else if(selectedTr == 0){
					$selectAll.addClass('fa-square-o').removeClass('fa-check-square selected fa-minus-square');
				}else{
					$selectAll.addClass('fa-minus-square selected').removeClass('fa-check-square fa-square-o');
				}
			}).on('click', '.fa-square-o', function(event) {
				event.preventDefault();
				$(this).parents('tr').addClass('selected');
				$(this).addClass('fa-check-square selected').removeClass('fa-square-o');
				var trLen = $userModal.find('tbody tr').length;
				var selectedTr = $userModal.find('tbody tr.selected').length;
				var $selectAll = $('#selectAll', $userModal);
				if(selectedTr == trLen){
					$selectAll.addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
				}else if(selectedTr == 0){
					$selectAll.addClass('fa-square-o').removeClass('fa-check-square selected fa-minus-square');
				}else{
					$selectAll.addClass('fa-minus-square selected').removeClass('fa-check-square fa-square-o');
				}
			}).on('click', '.confirmBtn', function(event) {
				event.preventDefault();
				
				$userModal.modal('hide');
			});

			getEventSummary()
			function getEventSummary() {
				app.common.ajaxWithAfa({
					url: 'LogWarningAction_getEventSummary.do',
				}).done(function (data) {
					if(data.result.statiscs){
						var statiscs = data.result.statiscs;
						$('#totalCount', $el).text(statiscs.total||0);
						$('#totalCount', $el).attr('title', statiscs.total||0)
						$('#onLine', $el).text(statiscs['07']||0);
						var unLine = 0;
						if(statiscs.total){
							if(statiscs['07']){
								unLine = statiscs.total - statiscs['07'];
							}else{
								unLine = statiscs.total;
							}
						}
						$('#unLine', $el).text(unLine);
					}

					if(data.result.kpi){
						var kpi = data.result.kpi;
						for (var item in kpi) {
							$('#'+item, $el).text(kpi[item]||0)
						}
					}
					var option =  getOption('单位：次',['预警'],'bar',getEventData(data.result.trend));
					eEvent.setOption(option);
				})
			}

			function getEventData(data){
				var eventData={};
				var defaultData;
				var hasxline;
				if(data && !$.isEmptyObject(data)){
					for (var item in data) {
						eventData[item] =[];
						if(data[item] && !$.isEmptyObject(data[item])){
							if(!hasxline){
								eventData.xline = [];
								defaultData = [];
							}
							var aData = data[item];
							let datas = sortMap(aData);
							eventData[item] = datas.values;
							eventData.xline = datas.keys;
							defaultData = new Array(datas.keys.length).fill(0);
							hasxline = true;
						}
					}
				}

				if(eventData && !$.isEmptyObject(eventData)){
					if(eventData.xline && eventData.xline.length > 0){
						for (var tmp in eventData) {
							if(eventData[tmp].length == 0){
								eventData[tmp] = defaultData;
							}

							if(eventData[tmp].length < eventData.xline.length){
								var len = eventData.xline.length - eventData[tmp].length;
								for (var i = 0; i < len; i++) {
									eventData[tmp].unshift(0);
								}
							}
						}
					}
				}

				return eventData;
			}

			function sortMap(map) {
				let values = [];
				let keys = Object.keys(map).map(item => new Date().Format('yyyy-MM-dd ') + item).sort((a,b) => {
					return new Date(a).getTime() - new Date(b).getTime();
				}).map(item => {
					let data = item.split(' ')[1];
					values.push(map[data] || 0);
					return new Date(item).Format('hh:mm');
				});
				return {
					keys,values
				}
				
			}
			
			/**
			 * 获取echartsOption
			 * @param  {string} title '单位：次'
			 * @param  {array} item  ['告警','预警']
			 * @param  {string} type  'line'
			 * @param  {[type]} data  echarts数据
			 * @return {[type]} option      [description]
			 */
			function getOption(title,item,type,data) {
				var lineOption = {
						color: ['#5e63fd','#fc852f'],
						title: {
							show: true,
							text: title,
							left: 34,
							top: '-2',
							textStyle: {
								fontSize: 12,
								color: '#a3a2a7',
								fontFamily: '微软雅黑',
								fontWeight: 'normal'
							}
						},
						legend: {
							show: true,
							orient: 'horizontal',
							right: 8,
							top: '-2',
							data:item,
							icon: 'rect',
							itemHeight: 2,
						},
						grid: {
							borderWidth: 0,
							x: 32,
	                        y: 20,
	                        x2: 15,       
	                        y2: 20,
						},
						tooltip: {
							trigger: 'axis'
						},
						xAxis: [
							{
								show: true,
								type: 'category',
								boundaryGap: false,
								axisLabel: {
									show: true,
								},
								splitLine: {show: false},
								axisLine: {
									show: true,
									lineStyle: {
										color: '#929099',//横坐标轴颜色
										width: 2,
										type: 'solid'
									}
								},
								axisTick: {
									show: false,
								},
								data: data.xline,
								splitNumber: 5
							}
						],
						yAxis: [
							{
								type: 'value',
								axisLabel: {
									show: true,
									textStyle:{
										color: '#5c5a66',
										align: 'left',
									},
									margin: 32
								},
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								splitLine: {
									show: true,
								},
								splitNumber: 5
							}
						],
						series: [/*{
						 	name: '预警',
							type: 'line',
							smooth: true,
							symbol: 'none',
							data: [65,50,20,70,75,70,80]
						}*/]
				};
				if(type == 'bar'){
					lineOption.xAxis = [{
						 data: data.xline,  
						 "offset":0,
						 "axisLine" : {
							 show: true,
							 lineStyle : {
								 color : '#929099',
							 }
						 },
						 "axisLabel":{
							 "show":true,
							 "textStyle":{
								 "align":"center",
							 }
						 },
						 axisTick: {
							show: false,
						 },
					}]
				}
				var index = 0;
				var series = []
				for (var tmp in data) {
					if (tmp != 'xline') {
						if(type == 'bar'){
							series.push({
							 	name: item[index++],
								type: 'bar',
								barGap: '10%',
								barCategoryGap: '10%',
								// barWidth: 30,//柱子宽度
								barMaxWidth: 70,
								data: data[tmp],
								animation:true,
							})
						}else{
							series.push({
							 	name: item[index++],
								type: type,
								smooth: true,
								symbol: 'none',
								data: data[tmp]
							})
						}
					}
				}

				lineOption.series = series;
				return lineOption;
			}
			
		},
		unload : function(handler) {
			eEvent && eEvent.dispose();
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});
