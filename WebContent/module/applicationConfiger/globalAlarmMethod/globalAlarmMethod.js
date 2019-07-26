define([ "jquery" ], function() {
	var reloadTable = null;
	return {
		load : function($el, scope, handler) {
			var Strategy_Id='';//选中行的id
			var $dataTable = $("#dataTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'pageLength':15,
				'columns':[
				{
					data:'index',
				},{
					data:'Strategy_Name',defaultContent:''//策略名称
				},{
					data:'Alert_Type',defaultContent:''//报警类型
				},{
					data:'alert_level',defaultContent:''//报警级别
				},{
					data:'last_time',defaultContent:''//连续时间
				},{
					data:'Alert_Times',defaultContent:''//连续次数
				},{
					data:'stra_type',defaultContent:''//策略类型
				},{
					data:'status',defaultContent:''//状态
				},{
					data:'Strategy_Id',defaultContent:''//id隐藏列
				}],
				'aoColumnDefs':[{
					'render':function(data,type,row,meta){
						if(data==0){
							return '<span class="alarm">告警</span>'
						}else if(data==1){
							return '<span class="warning">预警</span>'
						}else {
							return '<span class="prmot">通知</span>'
						}
					},
					'targets':2
				},{
					'render':function(data,type,row,meta){
						if(data == '联合')
							return '<span class="connect">联合</span>'
						else{
							return "单项";
						}
					},
					'targets':6
				},{
					'render':function(data,type,row,meta){
						if(data=='0')
							return '<span class="boolean-switch false readonly"></span>'
						else{
							return '<span class="boolean-switch true readonly"></span>'
						}
					},
					'targets':7
				},{
					'targets':8,
					'visible':false
				}]
			});
			
			//跳转到某页
			$("#toPage",$el).on("keydown",function(e){
				var e = e || window.event;
				var keycode = e.keycode || e.which;
				var leaf = parseInt($(this).val());
				if(keycode === 13){
					$dataTable.page(leaf-1).draw("page");
				}
			})
			
			//进入页面 禁用删改查按钮
			$('.globalAlarmMethod-buttons .delBtn').addClass('disabled');
			$('.globalAlarmMethod-buttons .editBtn').addClass('disabled');
			$('.globalAlarmMethod-buttons .detailBtn').addClass('disabled');
			
			//选中表格行 解除删改查按钮的禁用
			$('.globalAlarmMethod-table',$el).on('click','tbody>tr',function(){
				var tr = $dataTable.row(this).data();
				Strategy_Id = tr.Strategy_Id;
				if(tr == undefined){
					return;
				}
				$('tr.selected').not(this).removeClass('selected');
				$(this).toggleClass('selected');
				if(!$(this).hasClass('selected')){
					$('.globalAlarmMethod-buttons .delBtn').addClass('disabled');
					$('.globalAlarmMethod-buttons .editBtn').addClass('disabled');
					$('.globalAlarmMethod-buttons .detailBtn').addClass('disabled');
				}else{
					$('.globalAlarmMethod-buttons .delBtn').removeClass('disabled');
					$('.globalAlarmMethod-buttons .editBtn').removeClass('disabled');
					$('.globalAlarmMethod-buttons .detailBtn').removeClass('disabled');
				}
			});
			
			//点击新增按钮跳转到新增页面
			$('.globalAlarmMethod-buttons .addBtn').click(function(){
				if($(this).hasClass('disabled')){
					return;
				}
				app.dispatcher.load({
					title: "报警策略配置新增",
					moduleId:"applicationConfiger",
					section:"alarmStrategyAlert",
					id:"appAlarmAlert",
					params:{
						'Strategy_Id': Strategy_Id,
						'method':'1',
						'oper':'stand'
					}
				});
			});
			
			//点击修改按钮跳转到修改页面
			$('.globalAlarmMethod-buttons .editBtn').click(function(){
				if($(this).hasClass('disabled')){
					return;
				}
				app.dispatcher.load({
					title: "报警策略配置修改",
					moduleId:"applicationConfiger",
					section:"alarmStrategyAlert",
					id:"",
					params:{
						'Strategy_Id': Strategy_Id,
						'method':'2',
						'oper':'stand'
					}
				});
			});
			//点击明细按钮跳转到明细页面
			$('.globalAlarmMethod-buttons .detailBtn').click(function(){
				if($(this).hasClass('disabled')){
					return;
				}
				app.dispatcher.load({
					title: "报警策略配置明细",
					moduleId:"applicationConfiger",
					section:"alarmStrategyAlert",
					id:"appAlarmAlert",
					params:{
						'Strategy_Id': Strategy_Id,
						'method':'4'
					}
				});
			});
			//点击删除按钮
			$('.globalAlarmMethod-buttons .delBtn').click(function(){
				if($(this).hasClass('disabled')){
					return;
				}
				app.confirmDialog({
					sTitle:"请选择...",   
	                sType:"normal",  
	                sContent:'是否删除该条记录', 
	                sBtnConfirm: '确定', 
	                sBtnCancel: '取消',  
	                fnConfirmHandler: function(){
	                	app.shelter.show('正在删除...');
	    				app.common.ajaxWithAfa({
	    					url:'AFARequestAction_callAfaApp.do',
	    					data:{
	    						'appType':'APP_CONF',
	    						'target':'TriggerConf',
	    						'args' : JSON.stringify({
	    							'method':'3',
	    							'triggerParamsMap':{
	    								'Strategy_Id': Strategy_Id
	    							}
	    						})
	    					}
	    				}).done(function(data){
	    					app.shelter.hide();
	    					putTableData();
	    				})
	                }, 
	                fnCancelHandler: function(){return},  
	                aArgs: []
				})
			});
			
			//进入页面直接加载数据
			
			reloadTable = function (){
				app.common.ajaxWithAfa({
					url:'AFARequestAction_callAfaApp.do',
					data:{
						'appType':'APP_CONF',
						'target':'TriggerInfo',
						'args' : JSON.stringify({
							'oper':'stand'
						})
					}
				}).done(function(data){
					var data = data.result.private;
					$dataTable.clear().draw();
					if(data && data.length > 0){
						data.forEach(function(item, index){
							item.index = ++index;
						});
						$dataTable.rows.add(data).draw();
					}
				})
			};
			reloadTable();
			
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
			reloadTable();
		}
	};
});