define(["jquery"],function(){
	
	return {
		
		load:function($el,scope,handler){
			
			let taskId = app.domain.get('dataOutputResult','taskId');
			
			let result_table = $('#result_table',$el).DataTable({
        		"pagingType": 'full_numbers',
        		'sort': false,
				'searching'	: false,
        		'columns': [{
        			data: 'index',defaultContent: '',title: '序号',
        			render: function(data,type,row,meta){
        				return (meta.row + 1);
        			}
        		},{
        			data: 'esStartTime',defaultContent: '',title: 'esStartTime'
        		},{
        			data: 'esEndTime',defaultContent: '',title: 'esEndTime'
        		},{
        			data: 'result',defaultContent: '',title: '结果'
        		}]
        	});  
			
			getResult();
			//查询任务执行结果
			function getResult() {
				result_table.clear().draw();
				app.common.ajaxWithAfa({
            		url:'EtlTaskAction_queryTaskRunningLogList.do',
            		data: {
            			taskId: taskId
            		}
            	}).done(function (data) {
            		if(data.result){
            			result_table.rows.add(data.result).draw();
            		}
            	})
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