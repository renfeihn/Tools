define(["jquery"],function(){
	return {
		load:function($el,scope,handler){
			//事件列表table
			$dataTable = $("#dataTable", $el).DataTable({
				/*'bPaginate': true,*/
				'pageLength': 10,
				"bAutoWidth": true, // 自动宽度
				'bStateSave': false,
				'searching': false,
				"ordering": false,
				"pagingType": "full_numbers",
				"serverSide": true,
				"ajax": function(data, callback, settings) {
					var page = data.length == 0 ? 0 : data.start / data.length;
					app.common.ajaxWithAfa({
						cache: false, // 禁用缓存
						url: 'ShowUserPrivilegeAction_getEventsByUserPrivilege.do',
						data :{
							'pageSize':'10',
							'eventType':'ALARM_WARING',
							'dealStatus':'DEALING',
							'eventStatus':'NEW',
							'itilStatus':'ALL',
							'page':page,
						}
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

			//获取应用KPI数据
			app.common.ajaxWithAfa({
				cache : false, // 禁用缓存
				url:'CommonMonitorAction_getMonitorData.do',
			}).done(function(data){
				var data = data.result;
				Object.keys(data).forEach((item,index)=>{
					Object.keys(data[item]).forEach((i,index)=>{
						var $obj = $('#'+item+'-'+i,$el);
						if(i == 'cateId'){
							$obj.attr('data-id',data[item]['cateId']);
							return
						}else if(i == 'status'){
							$obj.addClass(data[item]['status']);
							$('#'+item+'-clusterStatus',$el).text(data[item]['status']=='yellow'?'异常':'正常');
							return
						}
						if($obj.length){
							$obj.text(data[item][i]).attr('title',data[item][i]);
						}
					});
				});
			});

			//获取afa应用KPI数据
			app.common.ajaxWithAfa({
				cache : false, // 禁用缓存
				url:'LogStaticsAction_logCollectionStatics.do',
			}).done(function(data){
				var data = data.result;
				$('#currentLogDataIps',$el).text(data.currentLogDataIps).attr('title',data.currentLogDataIps);
				$('#logDataToTalSize',$el).text(data.logDataToTalSize).attr('title',data.logDataToTalSize);
			});


			//应用KPI页签点击
			$(".squareBtn",$el).on('click',function(){
				var index = $(this).index();
				$(this).addClass('active').siblings().removeClass('active');
				if(index == 0){
					$(this).parent().next().show().next().hide();
				}else{
					$(this).parent().next().hide().next().show();
				}
			}).find('span:eq(0)').click();

			// //topu图点击跳转事件列表
			// $("#topu",$el).on('click','span',function(){
			// 	// var obj = {};
   //  //         	obj.appId = -1;
   //  //         	obj.dStatus = 'DEALING';

			// 	app.dispatcher.load({
   //              	title: '事件列表',
   //              	moduleId: 'eventList',
   //              	section: '',
   //              	// params: obj,
   //              	context: $el
   //              });
			// });	

			//应用实例数量跳转至实例汇总页面
			$(".skipPage",$el).on('click',function(){
				var title = $(this).parent().prev().text();
				var category,section;
				if(title=="AFA运行平台"){
					category = 'afa';
				}else if(title=="KAFKA"){
					category = 'kafka';
					section = 'basicMonitor#bigdata#kafkaCluster#kafkaClusterTabs';
				}else if(title=="STORM"){
					category = 'storm';
					section = 'basicMonitor#bigdata#stormCluster#stormTabs';
				}else if(title=="ELASTICSEARCH"){
					category = 'elasticsearch';
					section = 'basicMonitor#bigdata#esCluster#esClusterTabs';
				}else if(title=="ZOOKEEPER"){
					category = 'zookeeper';
				}
				if(title!="ZOOKEEPER"){
					section = section.split('#');
					app.dispatcher.load({
	                	title: title+'详情',
	                	moduleId: section.shift(),
	                	section: section,
	                	params: {
	                		'category': category,
	                		'flag':'cluster'
	                	},
	                	context: $el
	                });
				}else if(title=="ZOOKEEPER"){
					app.dispatcher.load({
	                	title: title+'监控',
	                	moduleId: 'basicMonitor',
	                	section: 'AFASumInstance',
	                	params: {
	                		'category': category,
	                		'flag':'cluster'
	                	},
	                	context: $el
	                });
				}
			});

			//查看事件详情
			$("#dataTable", $el).on('click', '.lookpath', function(e) { 
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
				var rowData = $dataTable.row($tr).data();
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

			eEvent = app.drawEcharts({
				handler	 : handler,
				context	 : $el,
				selector : '#eEvent',
				eType	 : 'line',
				url		 : 'CommonMonitorAction_getEventViewEcharts.do',
				unit	 : '个',
				items	 : ['预警', '告警'],
				urlParams: {
					time:120,
					interval:1,
					l1CateName:'软件',
					l2CateName:'大数据'
				}
			});
			eEvent.start();
		},
		unload:function(handler){
			
		},
		pause:function($el,scope,handler){
			
		},
		resume:function($el,scope,handler){
			
		}
	}
});