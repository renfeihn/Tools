define([ "jquery" ], function() {
	var putTableData;
	return {
		load : function($el, scope, handler) {
			var strategy_id = '';//选中行id
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
					data:'strategy_name',defaultContent:''//策略名称
				},{
					data:'alert_type',defaultContent:''//报警类型
				},{
					data:'alert_level',defaultContent:''//报警级别
				},{
					data:'last_time',defaultContent:''//连续时间
				},{
					data:'alert_times',defaultContent:''//连续次数
				},{
					data:'stra_type',defaultContent:''//策略类型
				},{
					data:'status',defaultContent:''//状态
				},{
					data:'strategy_id',defaultContent:''//id隐藏列
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
							return '<span class="boolean-switch readonly"></span>'
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
			$('.myAlarmStrategy-buttons .delBtn',$el).addClass('disabled');
			$('.myAlarmStrategy-buttons .editBtn',$el).addClass('disabled');
			$('.myAlarmStrategy-buttons .detailBtn',$el).addClass('disabled');
			
			//选中表格行 解除删改查按钮的禁用
			$('.myAlarmStrategy-table',$el).on('click','tbody>tr',function(){
				var tr = $dataTable.row(this).data();
				strategy_id = tr.strategy_id;
				if(tr == undefined){
					return;
				}
				$('tr.selected',$el).not(this).removeClass('selected');
				$(this).addClass('selected');
				if(!$(this).hasClass('selected')){
					$('.myAlarmStrategy-buttons .delBtn',$el).addClass('disabled');
					$('.myAlarmStrategy-buttons .editBtn',$el).addClass('disabled');
					$('.myAlarmStrategy-buttons .detailBtn',$el).addClass('disabled');
				}else{
					$('.myAlarmStrategy-buttons .delBtn',$el).removeClass('disabled');
					$('.myAlarmStrategy-buttons .editBtn',$el).removeClass('disabled');
					$('.myAlarmStrategy-buttons .detailBtn',$el).removeClass('disabled');
				}
			});
			
			//点击修改按钮跳转到修改页面
			$('.myAlarmStrategy-buttons .editBtn',$el).click(function(){
				if($(this).hasClass('disabled')){
					return;
				}
				app.dispatcher.load({
					title: "报警策略配置修改",
					moduleId:"applicationConfiger",
					section:"alarmStrategyAlert",
					id:"appAlarmAlertEdit",
					params:{
						'strategy_id': strategy_id,
						'method':'2',
						'oper':'user'
					}
				});
			});
			//点击明细按钮跳转到明细页面
			$('.myAlarmStrategy-buttons .detailBtn',$el).click(function(){
				if($(this).hasClass('disabled')){
					return;
				}
				app.dispatcher.load({
					title: "报警策略配置明细",
					moduleId:"applicationConfiger",
					section:"alarmStrategyAlert",
					id:"",
					params:{
						'strategy_id': strategy_id,
						'method':'4',
						'oper':'user'
					}
				});
			});
			//点击删除按钮
			$('.myAlarmStrategy-buttons .delBtn',$el).click(function(){
				if($(this).hasClass('disabled')){
					return;
				}
				app.confirmDialog({
					sTitle:"询问提示",   
	                sType:"normal",  
	                sContent:'确定要删除选中数据吗？', 
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
	    							'oper':'user',
	    							'triggerParamsMap':{
	    								'strategy_id': strategy_id
	    							}
	    						})
	    					}
	    				}).done(function(data){
	    					app.shelter.hide();
	    					putTableData();
	    					if(data.result.public.errorcode=="000000"){
	    						app.alert('删除成功');
	    					}
	    				})
	                }, 
	                fnCancelHandler: function(){return},  
	                aArgs: []
				})
			});
			//获取表格数据
			putTableData=function (){
				app.common.ajaxWithAfa({ 
					url:'AFARequestAction_callAfaApp.do',
					data:{
						'appType':'APP_CONF',
						'target':'TriggerInfo',
						'args' : JSON.stringify({
							'oper':'user',
						})
					}
				}).done(function(data){
					var result =  data.result.private;
					$dataTable.clear().draw();
					if(result && result.length > 0){
						result.forEach(function(item, index){
							item.index = ++index;
						});
						$dataTable.rows.add(result).draw();
					}
				});
			}
			putTableData();
			
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
			putTableData();
			$('.myAlarmStrategy-buttons .delBtn',$el).addClass('disabled');
			$('.myAlarmStrategy-buttons .editBtn',$el).addClass('disabled');
			$('.myAlarmStrategy-buttons .detailBtn',$el).addClass('disabled');
		}
	};
});