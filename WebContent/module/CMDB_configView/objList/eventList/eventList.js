define(['script/lib/text!./data.json'],function(fakeData){
	return {
		load:function($el,scope,handler){
			var $dataTable = $("#dataTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'pageLength': 10,// 设置表格分页长度
				'columns' 	: [{
					data : 'index', defaultContent : '',
					"render": function(data, type, row, meta) {
						return (meta.row+1);
                    }
				},{
					data : 'eventType', defaultContent : '',
				},{
					data : 'eventChannel', defaultContent : ''
				},{
					data : 'kpiType', defaultContent : '',
				},{
					data : 'appName', defaultContent : ''
				},{
					data : 'eventDesc', defaultContent : ''
				},{
					data : 'recordTime', defaultContent : ''
				},{
					data : 'times', defaultContent : ''
				}]
			});
			
			function timeFormat(str) {
				return str.substr(0,4) + '-' + str.substr(4,2) + '-' + str.substr(6,2) + ' ' + str.substr(8,2) + ':' + str.substr(10,2) + ':' + str.substr(12,2);
			}
			
			
			
			getEventList();
			function getEventList() {
				let event_type = $('.event-type>span.active',$el).attr('data-type');
				let days = $('.event-time>span.active',$el).attr('data-time');
				app.common.ajaxWithAfa({
					url:'CMDBCommonAction_commonService.do',
					data:{
						'servicename': 'cn.com.agree.aim.cmdb.service.common._cmdb_health_manager',
						'method': 'getEvent',
						'requestData': JSON.stringify({
							dmDtId: 49,//scope.dmDtId,
							event_type: event_type,
							days: Number(days),
						})
					},
				}).then(function(content){
					$dataTable.clear();
					$dataTable.rows.add(content.ret.content).draw();
				});
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