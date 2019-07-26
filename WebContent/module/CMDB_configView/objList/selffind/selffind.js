define([],function(){
	return {
		load:function($el,scope,handler){
			var $dataTable = $("#dataTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'pageLength': 10,// 设置表格分页长度
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'fieldName', defaultContent : ''
				},{
					data : 'fieldLastValue', defaultContent : ''
				},{
					data : 'fieldDtValue', defaultContent : ''
				},{
					data : 'modifyDate', defaultContent : ''
				}],
				'aoColumnDefs' : [{
                    "render": function(data, type, row, meta) {
                    	return (meta.row+1);
                    },
                    "targets" : 0
				}]
			});
			
			getList();
			function getList() {
				app.common.ajaxWithAfa({
					url:'CMDBCommonAction_commonService.do',
					data:{
						'servicename': 'cn.com.agree.aim.cmdb.service.datamanage._cmdb_model_data_version_manager',
						'method': 'dm_dt_his_discover',
						'requestData': JSON.stringify({
							dmDtId: 49,//scope.dmDtId,
						})
					},
				}).then(function(content){
					$dataTable.clear();
					$dataTable.rows.add(content.ret.content).draw();
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