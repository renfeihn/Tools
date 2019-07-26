define(["jquery"],function(){
	return {
		load:function($el,scope,handler){
			var dmDefId = scope.dmDefId;
			var dmDtId = scope.dmDtId;
			var $dataTable = $("#dataTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'pageLength': 10,// 设置表格分页长度
				'columns' 	: [{
					data : 'index', defaultContent : '',
					'render':function(data,type,row,meta){
						return (meta.row+1);
					},
				},{
					data : 'versionBatchNo', defaultContent : ''
				},{
					data : 'versionChange', defaultContent : ''
				},{
					data : 'versionDate', defaultContent : ''
				},{
					data : 'versionUser', defaultContent : ''
				},{
					data : 'op', defaultContent : '',
					'render':function(data,type,row,meta){
						return '<span class="detail">查看明细</span>';
					}
				}]
			});

			
			
			$("#dataTable", $el).on('click','.detail',function(){
				let vId = $dataTable.row($(this).parents('tr')).data().version_num;
				app.dispatcher.load({
					"moduleId" : "CMDB_version",
					"title": "版本信息",
					"id" : "CMDB_version",
					 "params" : { // 给标签传递参数
					 	"dmDtId" : dmDtId,
					 	"dmDefId" : dmDefId,
					 	"versionId": vId,
					 	"objInfo": scope.objInfo,
					 	"objName": scope.objName
					 },
				});
			});
			
			getDataVersion();
			function getDataVersion() {
				app.common.ajaxWithCmdb({
					data:{
						'servicename':'cn.com.agree.aim.cmdb.service.datamanage._cmdb_model_data_version_manager',
						'method':'dm_dt_versions_query',
						'requestData':JSON.stringify({
							'versionObjid': dmDtId,
						})
					}
				}).then(function(data){
					$dataTable.clear();
					$dataTable.rows.add(data.ret).draw();
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