define([],function(){
	return {
		load:function($el,scope,handler){
			
			const operMap = {
					PING: 'PING',
					START_AGENT: '代理启动',
					STOP_AGENT: '代理挂起',
					RESTART_AGENT: '代理重启',
					UPDATE_AGENT: '代理更新',
					AGENT_INSTALL: '代理安装',
					AGENT_STATUS: '代理检测'
			};
			
			let his_table = $('#his_table',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'pageLength': 10,
				'columns' 	: [{
					data : 'index', defaultContent : '',title: '序号',
					"render": function(data, type, row, meta) {
						return (meta.row + 1);
					}
				},{
					data : 'oper', defaultContent : '',title: '操作类型',
					"render": function(data, type, row, meta) {
						return operMap[data];
					}
				},{
					data : 'oper_time', defaultContent : '',title: '执行时间',
					"render": function(data, type, row, meta) {
						return data && new Date(data).Format('yyyy-MM-dd hh:mm:ss');
					}
				},{
					data : 'result', defaultContent : '',title: '执行结果',
					"render": function(data, type, row, meta) {
						if(data == '成功'){
							return `<i class="fa fa-circle" style="transform: scale(.6);color: #4fbd54;"></i>成功`;
						}else{
							return `<i class="fa fa-circle" style="transform: scale(.6);color: #F44336;"></i>失败`;
						}
					}
				}]
			});
			
			getHis(scope.ip);
			function getHis(ip) {
				his_table.clear().draw();
				app.common.ajaxWithAfa({
					url: 'AgentManagerAction_getIpOperHis.do',
					data: {ip: ip}
				}).then(function(data) {
					if(data.list.length == 0){
						return;
					}
					his_table.rows.add(data.list).draw();
				});
			}
			
			
			$('#oper_type,#oper_result', $el).on('change', function(){
				his_table.column(1).search($('#oper_type', $el).val());
				his_table.column(3).search($('#oper_result', $el).val());
				his_table.draw();
			})
			
		},
		
		unload:function(handler){

		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});