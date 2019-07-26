define([ "jquery","vis",'range'], function($, vis) {
	
	var flag = false;
	return {
		load : function($el, scope, handler) {
			
			var eventId = scope.eventId;
			var platform = scope.platform;
			var eventClassify = '';
			var eventObjName = '';
			var eventAppNames = '';
			var typeMap = {
				'0':'event-rel-red',
				'1':'event-rel-yellow',
				'2':'event-rel-green'
			}

			var objId = scope.objId;
			var appIds = scope.appIds;
			var serverId = scope.serverId;
			var tableData = [];

			//相关应用下所有事件列表
			var $appTable = $('#appTable', $el).DataTable({
				'bStateSave': false,
				'bSort': false,
				'searching': false,
				'scrollY': '320px', // 行高32px
				'scrollCollapse': true,
				'paging': false,
				'scrollX': false,
				'columns': [{//序号
					data : 'index',
					defaultContent : ''
				},{//事件类型
					data : 'type',
					defaultContent : '',
					render: function(data, type, row, meta) {
						if(data == 0){
							return '<span class="event-type error"></span>';//故障
						}else if(data == 1){
							return '<span class="event-type warning"></span>';//预警
						}else if(data == 2){
							return '<span class="event-type notice"></span>';//通知
						}
					}
				},{//应用名称
					data : 'appName',
					defaultContent : '',
				},{//对象名称
					data : 'dmDtName',
					defaultContent : ''
				},{//事件摘要
					data : 'description',
					defaultContent : '-'
				},{//事件状态
					data : 'status',
					defaultContent : '-',
					render: function(data, type, row, meta) {
						if(data == 0){
							return '待处理';
						}else if(data == 1){
							return '处理中';
						}else if(data == 2){
							return '已处理';
						}
					}
				},{//发生次数
					data : 'tally',
					defaultContent : '-'
				},{//首发时间
					data : 'firstTime',
					defaultContent : '-'
				},{//最后时间
					data : 'lastTime',
					defaultContent : '-'
				}]
			});

			var eventNum = 0;
			function getEventNum(upArr, downArr){
				app.common.ajaxWithAfa({
					url: 'EventListAction_getEventData.do',
					data: {
						appIds: appIds,
						pageSize: 1,
						eventType: 'ALARM_WARING',
						itilStatus: 'ALL',
						cmdbCateIds: -1,
						page:0
					}
				}).then(function(data){
					eventNum = data.events.totalElements;
					if(eventNum){
						getApptableData(eventNum, upArr, downArr);
					}else{
						app.alert('无关联事件!');
					}
					
				});
			}		
			
			getEventList();
			async function getEventList () {
				console.log(scope)
				app.common.ajaxWithAfa({
					url: 'ShowUserPrivilegeAction_getEventTopo.do',
					data: {
						dmDtId: scope.appIds[0]
					}
				}).then(function(ret){
					ret = ret.events;
					var tableData = ret.events.map((item, index) => {
						item['index'] = index + 1;
						return item;
					})
					$appTable.rows.add(tableData).draw();
					initTimeLine(ret.events, ret.group);
				});
				
			}
			
			
			function getApptableData(eventNum, upArr, downArr){
				app.common.ajaxWithAfa({
					url: 'EventListAction_getEventData.do',
					data: {
						appIds: appIds,
						pageSize: eventNum,
						eventType: 'ALARM_WARING',
						itilStatus: 'ALL',
						cmdbCateIds: -1,
						page:0
					}
				}).then(function(data){
				});
			}	
			
			function ajaxWithAfa(data){
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: 'CMDBCommonAction_commonService.do',
						data: data
					}).done(function(content) {
						resolve(content.ret);
					})
				});
			}

//			var eventCount = 0;
//			//获取关联列表跟推论结果数据
//			app.common.ajaxWithAfa({
//				url: "RelationAnalysAction_getRelatedEvents.do",
//				aimshelter: '加载数据中。。。',
//				data: {
//					eventId: eventId,
//					appIds: appIds
//				}
//			}).then(function(data){
//				$('#reason', $el).html(data.conclusion);
//				var eventList = data.eventList;
//				if(eventList && eventList.length){
//					var upflag = true;
//					var curIndex;
//					var upArr = [];
//					var downArr = [];
//					var index = 1;
//					eventCount = eventList.length;
//					for(var i = 0; i < eventList.length; i++){
//						eventList[i].index = index;
//						if(!upflag){
//							downArr.push(eventList[i].id);
//						}
//						if(eventList[i].id == eventId){
//							upflag = false;
//							curIndex = i;
//							continue;
//							index--;
//						}
//						if(upflag){
//							upArr.push(eventList[i].id);
//						}
//						index++;
//					}
//					
//					
//					getEventNum(upArr, downArr);
//				}else{
//					app.alert('无关联事件！');
//				}
//			});


			function initTimeLine(events, group) {
					var groups = new vis.DataSet(group.map(item => {
						item.content = item.dm_dt_name;
						item.id = item.dm_dt_id;
						return item;
					})),
					container = $('#evenRelTiemLine1',$el)[0];
					events = setEventList(events);
					console.log(events)
					var forMatEvents = [];
					var maxDate = 0;
					for(var i = 0 , len = events.length ; i < len ; i ++){
						var itemI = events[i],
						itemObjI = {
								content:itemI.description,
								start: new Date(itemI.firstTime).Format('yyyy-MM-dd hh:mm:ss'),
								end: new Date(itemI.lastTime).Format('yyyy-MM-dd hh:mm:ss'),
								className: typeMap[itemI.type],
								id:itemI.id+"_"+itemI.group,
								group:itemI.group,
						};
						forMatEvents.push(itemObjI);
						maxDate = Math.max(maxDate, new Date(itemI.lastTime).getTime())
					}
					var items = new vis.DataSet(forMatEvents);

			       	var timeline;
			       	console.log(forMatEvents, groups);
					$('a[data-toggle="tab"]', $el).on('shown', function (e) {
						if(!timeline){
							timeline = new vis.Timeline(container, items, groups, {});
						}
					})
//				}
			}
			
			function setEventList (events) {
				var newEvents = [];
				events.forEach(item => {
					var appids = item.app_id.split('|');
					appids.forEach(app => {
						var newItem = JSON.parse(JSON.stringify(item))
						newItem.group = app;
						newEvents.push(newItem);
					})
				})
				return newEvents;
			}
			
			$('.radio-group', $el).on('click','span', function(){
				$(this).addClass('selected').siblings().removeClass('selected');
				filterData($(this).index())
			})

			function filterData(condition){

				var filterData = [];
				var curNum = 0;
				$appTable.clear().draw();
				app.shelter.show();
				handler.setTimeout(function(){
					tableData.each(function(d, i){
						switch (condition){
							case 0:
								if(d.eventId == eventId){
									d.index = (i+1) + '<span class="fa fa-arrow-circle-right" style="margin-left: 5px; font-size: 16px; vertical-align: middle; color: #0AC1B2;"></span>';
									curNum = i;
								}
								filterData.push(d);
								break;
							case 1:
								// 同类事件
								if(d.eventTitle.indexOf(eventClassify) != -1){
									if(d.eventId == eventId){
										d.index = (i+1) + '<span class="fa fa-arrow-circle-right" style="margin-left: 5px; font-size: 16px; vertical-align: middle; color: #0AC1B2;"></span>';
										curNum = i;
									}
									filterData.push(d);
								}
								break;
							case 2:
								// 同对象事件
								if(d.objName == eventObjName){
									if(d.eventId == eventId){
										d.index = (i+1) + '<span class="fa fa-arrow-circle-right" style="margin-left: 5px; font-size: 16px; vertical-align: middle; color: #0AC1B2;"></span>';
										curNum = i;
									}
									filterData.push(d);
								}
								break;
							case 3:
								// 同应用事件
								if(d.appNames[0] == eventAppNames){
									if(d.eventId == eventId){
										d.index = (i+1) + '<span class="fa fa-arrow-circle-right" style="margin-left: 5px; font-size: 16px; vertical-align: middle; color: #0AC1B2;"></span>';
										curNum = i;
									}
									filterData.push(d);
								}
								break;
							case 4:
								// 同服务事件
								if(d.serverId == serverId){
									if(d.eventId == eventId){
										d.index = (i+1) + '<span class="fa fa-arrow-circle-right" style="margin-left: 5px; font-size: 16px; vertical-align: middle; color: #0AC1B2;"></span>';
										curNum = i;
									}
									filterData.push(d);
								}
								break;
						}
					})
					app.shelter.hide();
					$appTable.rows.add(filterData).draw();
					app.shelter.hide();
					$appTable.draw().$('tr').eq(curNum)[0].scrollIntoView({
						'behavior': 'smooth',
					});
					$('#totalrows', $el).text(filterData.length);
				},300);
			}

			// 范围选择器 初始化
			var scale = [];
			for(var i=0; i<24; i++){
				scale.push(i);
			}
			$('.range-slider', $el).jRange({
				from: 0,
				to: 23,
				step: 1,
				scale: scale,
				format: '%s点',
				width: '100%',
				showLabels: true,
				isRange : true,
				ondragend: ondragend,
				onbarclicked: ondragend
			});

			// 范围选择后事件
			function ondragend(value){
				console.log(value);
			}
			function onbarclicked (value) {
				console.log(value);
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