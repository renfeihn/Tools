define([],function(){
	return {
		load:function($el,scope,handler){
			getEventList(scope.params.id);
			var $dataTable = $("#dataTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'pageLength': 10,// 设置表格分页长度
				'columns' 	: [{
					data : 'index', defaultContent : '',title: '序号',
					"render": function(data, type, row, meta) {
						return (meta.row+1);
                    }
				},{
					data : 'type', defaultContent : '-',title: '事件类型',
					"render": function(data, type, row, meta) {
						if(data == 0) {
							return '<span class="event-type type0">故障</span>'; //故障
						} else if(data == 1) {
							return '<span class="event-type type1">预警</span>'; //预警
						} else if(data == 2) {
							return '<span class="event-type type2">信息</span>'; //通知
						}
                    }
				},{
					data : 'in_sys_no', defaultContent : '-',title: '事件来源',
					"render": function(data, type, row, meta) {
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
					data : 'summary', defaultContent : '-',title: '事件摘要'
				},{
					data : 'metric', defaultContent : '-',title: '预警规则'
				},{
					data : 'tally', defaultContent : '-',title: '发生次数'
				},{
					data : 'level', defaultContent : '-',title: '级别'
				},{
					data : 'first_time', defaultContent : '-',title: '首次发生时间',
					"render": function(data, type, row, meta) {
						return data && new Date(data).Format('yyyy-MM-dd hh:mm:ss');
					}
				},{
					data : 'last_time', defaultContent : '-',title: '最后发生时间',
					"render": function(data, type, row, meta) {
						return data && new Date(data).Format('yyyy-MM-dd hh:mm:ss');
					}
				}]
			});
			
			function timeFormat(str) {
				return str.substr(0,4) + '-' + str.substr(4,2) + '-' + str.substr(6,2) + ' ' + str.substr(8,2) + ':' + str.substr(10,2) + ':' + str.substr(12,2);
			}
			
			
			
			
			function getEventList(appId) {
				let event_type = $('.event-type>span.active',$el).attr('data-type');
				let days = $('.event-time>span.active',$el).attr('data-time');
				app.common.ajaxWithAfa({
					url:'EventListAction_getEventListByAppId.do?',
					data:{
						app_id: appId
					},
				}).then(function(content){
					$dataTable.clear();
					$dataTable.rows.add(content.ret).draw();
				});
			}
			
			function changeEventType(data) {
				if(data == 0) {
					return '告警'; //故障
				} else if(data == 1) {
					return '预警'; //预警
				} else if(data == 2) {
					return '通知'; //通知
				}
			}
			
			
			bindEvents();
			function bindEvents() {
				$('.event-type>span',$el).on('click',function(){
					$(this).addClass('active').siblings().removeClass('active');
					getEventList();
				});
				$('.event-time>span',$el).on('click',function(){
					$(this).addClass('active').siblings().removeClass('active');
					getEventList();
				});
				$("#dataTable", $el).on('click','tbody>tr',function(){
					let tr = $dataTable.row($(this)).data();
					var eventId = tr.id;
					var objId = tr.app_id;
					var appIds = tr.app_id;
					var serverId = tr.serverId || 0;
	                var appName = scope.appName || '';
	                var eventType = changeEventType(tr.type);
	                var objName = tr.objName || '';
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
			}
			
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});