define([ "jquery" ], function() {
	var cache = {};
	var eventDetailEchart = {};
	return {
		load : function($el, scope, handler) {
//			$('#eventModal', $el).modal('show');
//			$('#eventModal', $el).modal('hide');
			var eventId = scope.eventId;
			var objId = scope.objId;
			var appIds = scope.appIds;
			app.shelter.show("数据加载中........");
			//相关应用下所有事件列表
			var $appTable = $('#appTable', $el).DataTable({
				'bStateSave': false,
				'bSort': false,
				'searching': false,
				'scrollY': '160px',
				'scrollCollapse': true,
				'paging': false,
				'scrollX': false,
				'columns': [{//序号
					data : 'index',
					defaultContent : ''
				},{//事件类型
					data : 'eventType',
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
					data : 'appNames',
					defaultContent : '',
					render: function(data, type, row, meta){
						if(data){
							return data[0];
						}else{
							return '';
						}
						
					}
				},{//对象名称
					data : 'objName',
					defaultContent : ''
				},{//事件摘要
					data : 'eventTitle',
					defaultContent : '-'
				},{//事件状态
					data : 'eventStatus',
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
				},{//工单状态
					data : 'itilStatus',
					defaultContent : '-'
				},{//处理状态
					data : 'dealStatus',
					defaultContent : '-'
				},{//发生次数
					data : 'tally',
					defaultContent : '-'
				},{//首发时间
					data : 'eventStart',
					defaultContent : '-'
				},{//最后时间
					data : 'eventEnd',
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
					app.shelter.hide()
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
					var data = data.events.content;
					if(data && data.length){
						var curNum;
						for(var i = 0; i < data.length; i++){
							data[i].index = i+1;
							if(upArr.length){
								upArr.forEach(function(item, index){
									if(item == data[i].eventId){
										data[i].index = (i+1) + '<span class="fa fa-arrow-circle-up" style="margin-left: 5px; font-size: 16px; vertical-align: middle; color: #0AC1B2;"></span>';
									}
								});
							}
							if(downArr.length){
								downArr.forEach(function(item, index){
									if(item == data[i].eventId){
										data[i].index = (i+1) + '<span class="fa fa-arrow-circle-down" style="margin-left: 5px; font-size: 16px; vertical-align: middle; color: #0AC1B2;"></span>';
									}
								});
							}
							if(data[i].eventId == eventId){
								data[i].index = (i+1) + '<span class="fa fa-arrow-circle-right" style="margin-left: 5px; font-size: 16px; vertical-align: middle; color: #0AC1B2;"></span>';
								curNum = i;
							}
								
							$appTable.row.add(data[i]);
						}
						if(curNum){
							$appTable.draw().$('tr').eq(curNum)[0].scrollIntoView();
						}else{
							$appTable.draw();
						}
						app.shelter.hide();
					}
				});
			}			
			
			//关联事件表
			var $eventRelTable = $('#eventRelTable', $el).DataTable({
				'bStateSave': false,
				'bSort': false,
				'searching': false,
				'scrollY': '160px',
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
					defaultContent : ''
				},{//对象名称
					data : 'mobjName',
					defaultContent : ''
				},{//事件摘要
					data : 'summary',
					defaultContent : '-'
				},/*{//事件状态
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
				},{//工单状态
					data : 'itilStatus',
					defaultContent : '-'
				},{//处理状态
					data : 'dealStatus',
					defaultContent : '-'
				},{//发生次数
					data : 'tally',
					defaultContent : '-'
				},*/{//首发时间
					data : 'firstTime',
					defaultContent : '-'
				}/*,{//最后时间
					data : 'lastTime',
					defaultContent : '-'
				}*/]
			});
			
			//事件现场还原里的表格
			var $gatherTable = $("#gatherTable", $el).dataTable({
				'bStateSave': false,
				'bSort': false,
				'searching': false,
				'pageLength': 5,
				'scrollY': '190px',
				'scrollCollapse': true,
				'paging': false,
				'scrollX': false
			});
			
			var eventCount = 0;
			//获取关联列表跟推论结果数据
			app.common.ajaxWithAfa({
				url: "RelationAnalysAction_getRelatedEvents.do",
				aimshelter: '加载数据中。。。',
				data: {
					eventId: eventId,
					appIds: appIds
				}
			}).then(function(data){
				$('#reason', $el).html(data.conclusion);
				var eventList = data.eventList;
				if(eventList && eventList.length){
					var upflag = true;
					var curIndex;
					var upArr = [];
					var downArr = [];
					var index = 1;
					eventCount = eventList.length;
					for(var i = 0; i < eventList.length; i++){
						eventList[i].index = index;
						if(!upflag){
							downArr.push(eventList[i].id);
						}
						if(eventList[i].id == eventId){
							upflag = false;
							curIndex = i;
							continue;
							index--;
						}
						if(upflag){
							upArr.push(eventList[i].id);
						}
						index++;
						$eventRelTable.row.add(eventList[i]);
					}
					
					$eventRelTable.draw();
					
					getEventNum(upArr, downArr);
				}else{
					app.alert('无关联事件！');
				}
			});
			
			//关联事件列表行点击事件
			$('#eventRelTable', $el).on('click', 'tr', function(e){
				var $this = $(this);
				if($this.hasClass('selected') || $this.find('td').eq(0).hasClass('dataTables_empty')){return}
				$eventRelTable.$('tr').removeClass('selected');
				$this.addClass('selected');
//				var rowData = $eventRelTable.row(this).data();
//				eventId = rowData.id;
//				objId = rowData.mobjId;
				//getEventRestoreTag();
			});
			
			getEventRestoreTag('allEventEchart');
			//获取事件现场还原页签
			function getEventRestoreTag(selector){
				$.ajax({
					type: 'post',
					url: 'EventDetailAction_getEventMetrics.do',
					data: {eventId: eventId},
					success: function(data){
						if(data.status){						
							var data = data.content.eventMetric;
							if(data && data.length){
								var liTemp = '';
								data.forEach(function(item, index){				
									liTemp += '<li ctn="'+selector+'" name="'+item.name+'" time="'+item.time+'" value="'+item.value+'" unit="'+item.unit+'">\
											        <a data-toggle="tab" class="eventDetails-tabs-a">'+item.displayName+'</a>\
											   </li>';						
								});
								$('#eventTabs', $el).html(liTemp);
								$('#eventTabs', $el).find('li').eq(0).trigger('click').addClass('active');
							}else{//清空数据
								app.alert('无相关数据！');
							}
						}
					}
				});
			}
			
			//事件现场还原页签点击事件
			$('#eventTabs', $el).on('click', 'li', function(){
				var $this = $(this);
				if($this.hasClass('active')){return}
				var name = $this.attr('name'),
					time = $this.attr('time').substr(-8, 5),
					value = $this.attr('value'),
					unit = $this.attr('unit');
				var ctn = $this.attr('ctn');
				$gatherTable.fnClearTable();
				eventDetailEchart[ctn] && eventDetailEchart[ctn].dispose();
				eventDetailEchart[ctn] = app.showEcharts({
					handler: handler,
					context: $el,
					selector: ('#' + ctn),
					eType: 'line',
					url: 'EventDetailAction_eventMetricTimeline.do',
					unit: unit,
					urlParams: {
						metricName: name,
						objectId: objId,
						eventId: eventId
					},
					items: [],
					isRefresh: false,
					beforefn: function(data){
						var data = data.content.echartsData;
						if(data && data.items && data.items.length){
							eventDetailEchart[ctn].changeItems(data.items);
							var tableData = [];
							if(data.line1 && data.line1.length){
								for(var i in data.line1){
									if(data.line1[i] != parseInt(data.line1[i])){
										data.line1[i] = Number(data.line1[i]).toFixed(2);
									}
									rowData = [Number(i)+1, data.line1[i] + unit, data.time[i]];
									tableData.push(rowData);
								}
								$gatherTable.fnAddData(tableData);
							}
						}
					},
					succfn: function(data){
						if(unit == '%'){
							eventDetailEchart[ctn].getEchartsObj().setOption({
								yAxis: [{max: 100}],
							});								
						}
						var option = eventDetailEchart[ctn].getEchartsObj().getOption();
						option.series[0].markLine = {
							lineStyle: {
								normal: {
									type: 'solid',
									width: 1,
									color: '#ff0000'
								}
							},
							silent: true,
							label: {
								normal: {
									show: false
								}
							},
							data: [
							    {xAxis: time},
							    {yAxis: value}
							],
							symbol: 'none'
						}
						eventDetailEchart[ctn].getEchartsObj().setOption(option);
					}
				});
				eventDetailEchart[ctn].start();
			});
			
			$('#tableModal', $el).html($('#tabbleTemp', $el).html());
			
			$('.eventDetails-add', $el).click(function(){
				if(eventCount > 2){
					$('#eventModal', $el).modal('show').attr('data-id', $(this).find('.itemEchart').attr('id'));
				}else{
					app.alert('无关联对象！');
				}				
			});
			
			$('#eventModal .close, [data-role="cancel"]', $el).click(function(){
				$('#eventModal', $el).modal('hide');
			});
			
			$('[data-role="confirm"]', $el).click(function(){
				if(!$('#eventRelTable tr', $el).hasClass('selected')){
					app.alert('请选择一行！');
					return;
				}
				$('#eventRelTable tr', $el).each(function(index, item){
					if($(item).hasClass('selected')){
						var rowData = $eventRelTable.row(item).data();
						eventId = rowData.id;
						objId = rowData.mobjId;
						$('#'+$('#eventModal', $el).attr('data-id'), $el).parent().parent().off();
						$('#'+$('#eventModal', $el).attr('data-id'), $el).parent().parent().css('background',"none")
						$('#'+$('#eventModal', $el).attr('data-id'), $el).parent().css('display', 'block');
						getEventRestoreTag($('#eventModal', $el).attr('data-id'));
						$('#eventModal', $el).modal('hide');
					}
				})
			});
			$('.closeEchart', $el).click(function(e){
				e.stopPropagation();
				var id = $(this).parent().next().attr('id');
				eventDetailEchart[id] && eventDetailEchart[id].dispose();
				$(this).parent().parent().css('display', 'none');
				$(this).parent().parent().parent().css('background', '#f7f7fa url("img/eventDetails/add.png") center no-repeat');
				$('.eventDetails-add', $el).off().click(function(){
					$('#eventModal', $el).modal('show').attr('data-id', $(this).find('.itemEchart').attr('id'));
				});
			});
			
			setDataFromDetail();
			function setDataFromDetail() {
				var data = {};
				data.eventId = app.domain.get("eventDetailToRelative", "eventId");
				data.eventLevel = app.domain.get("eventDetailToRelative", "eventLevel");
				data.eventDuration = app.domain.get("eventDetailToRelative", "eventDuration");
				data.tally = app.domain.get("eventDetailToRelative", "tally");
				data.eventStart = app.domain.get("eventDetailToRelative", "eventStart");
				data.eventEnd = app.domain.get("eventDetailToRelative", "eventEnd");
				data.eventDesc = app.domain.get("eventDetailToRelative", "eventDesc");
				
				$('#eventId', $el).text(data.eventId);//事件ID
				//var stayTime = (new Date(data.eventEnd).getTime() - new Date(data.eventStart).getTime()) / 1000 + 's'
				$('#stayTime', $el).text(data.eventDuration);//持续时间
				$('#startDate', $el).attr('title', data.eventStart).text(data.eventStart);//首发时间
				
				$('#eventLevel i', $el).removeClass('eventDetails-blue');//移除事件级别
				for(var i = 0; i < Number(data.eventLevel); i++){//添加事件级别
					$('#eventLevel i', $el).eq(i).addClass('eventDetails-blue');
				}
				$('#eventLevelNum', $el).text(data.eventLevel + '级');//事件级数
				
				$('#ocrTimes', $el).text(data.tally);//发生次数
				$('#endDate', $el).attr('title', data.eventEnd).text(data.eventEnd);//最后时间
				
				$('#eventDecribe', $el).text(data.eventDesc); //事件描述
			}
		},
		unload : function(handler) {
			for(var key in eventDetailEchart){
				eventDetailEchart[key] && eventDetailEchart[key].dispose();
			}			
		},
		pause : function($el, scope, handler) {
		},
		resume : function($el, scope, handler) {
		}
	};
});