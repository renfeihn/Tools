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
					data : 'version_num', defaultContent : ''
				},{
					data : 'version_content', defaultContent : ''
				},{
					data : 'version_time', defaultContent : ''
				},{
					data : 'version_person', defaultContent : ''
				},{
					data : 'op', defaultContent : '',
					'render':function(data,type,row,meta){
						return '<span class="detail">查看明细</span>';
					}
				}]
			});
			
			const data = [{
				version_num: 'v1.0.0',
				version_content: '新增属性:品牌、型号;修改属性:内存->内存(GB);删除属性:光纤卡数量',
				version_time: '2019-04-16 09:32:34',
				version_person: 'admin'
			},{
				version_num: 'v1.0.1',
				version_content: '新增属性:IP、CPU核心数、CPU型号、虚拟core数;修改属性:最大core数->最大虚拟core数;',
				version_time: '2019-04-16 11:15:21',
				version_person: 'admin'
			},{
				version_num: 'v1.0.2',
				version_content: '删除属性:产品号',
				version_time: '2019-04-16 13:55:42',
				version_person: 'admin'
			},{
				version_num: 'v1.0.3',
				version_content: '新增属性:备注',
				version_time: '2019-04-16 19:21:13',
				version_person: 'admin'
			}];
			//$dataTable.rows.add(data).draw();
			
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
			
			
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});