define(["jquery","viewBuilder","diyFormEvents"],function($,viewBuilder,diyFormEvents){
	return {
		
		load:function($el,scope,handler){
//			$el.css({
//				'padding': '5px 0 0 0',
//				'overflow': 'auto'
//			})
			
			
			let dmDefId = scope.dmDefId;
			let dmDtId = scope.dmDtId;
			bindEvents();
			
			if(!dmDefId && !dmDtId){
				$('.detail-content>div',$el).empty();
				return;
			}
			
			var $dataTable = $('#dataTable', $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'bStateSave': false,
				'bSort': false,//排序
				'pageLength': 10,
				'columns': [
					{data: 'index', defaultContent:'-'},
					{data: 'fieldDefName', defaultContent:'-'},
					{data: 'fieldDefEname', defaultContent:'-'},
					{data: 'fieldDefType', defaultContent:'-'},
					{data: 'fieldDataLen', defaultContent:'-'},
					{data: 'fieldDataDiscover', defaultContent:'-'},
					{data: 'fieldDataItem', defaultContent:'-'},
					{data: 'fieldDataUnits', defaultContent:'-'},
					{data: 'fieldComponentType', defaultContent:'-'},
					{data: 'fieldIsMust', defaultContent:'-'},
					{data: 'fieldIsPk', defaultContent:'-'},
					{data: 'fieldStatus', defaultContent:'-'},
					{data: 'fieldDtValue', defaultContent:'-'},
					{data: 'modifyDate', defaultContent:'-'}
				],
				'aoColumnDefs': [{
                    "render": function(data, type, row, meta) {
                    	return (meta.row + 1);
                    },
                    "targets" : 0
				},{
                    "render": function(data, type, row, meta) {
                    	var bool = data == 0?'false': 'true';
                    	return '<span class="boolean-switch '+bool+'" readonly></span>';
                    },
                    "targets" : 5
				},{
                    "render": function(data, type, row, meta) {
                    	var bool = data == 0?'false': 'true';
                    	return '<span class="boolean-switch '+bool+'" readonly></span>';
                    },
                    "targets" : 9
				},{
                    "render": function(data, type, row, meta) {
                    	var bool = data == 1?'true': 'false';
                    	return '<span class="boolean-switch '+bool+'" readonly></span>';
                    },
                    "targets" : 10
				},{
                    "render": function(data, type, row, meta) {
                    	var text = data == 1?'启用': '停用';
                    	return text;
                    },
                    "targets" : 11
				}]
			});
			
			
			renderForm();
			function renderForm() {
				$.when(
						app.common.ajaxWithAfa({
							url:'CMDBCommonAction_commonService.do',
							data:{
								'servicename':'cn.com.agree.aim.cmdb.service.modelmanage._cmdb_model_define_manager',
								'method':'cate_view_query',
								'requestData':JSON.stringify({
									'cateDefId': dmDefId,
									'onLine': true
								})
							},
						}),
						app.common.ajaxWithAfa({
							url:'CMDBCommonAction_commonService.do',
							data:{
								'servicename':'cn.com.agree.aim.cmdb.service.datamanage._cmdb_model_data_manager',
								'method':'dm_dt_detail_query',
								'requestData':JSON.stringify({
									'dmDtId': dmDtId
								})
							},
						}),
						app.common.ajaxWithAfa({
							url:'CMDBCommonAction_commonService.do',
							data:{
								'servicename':'cn.com.agree.aim.cmdb.service.modelmanage._cmdb_field_define_manager',
								'method':'queryFields',
								'requestData':JSON.stringify({
									'fieldDefOwnerId': dmDefId
								})
							},
						}),
					)
					.then(function(content1,content2,content3){
						
						var formData = {
							...content2.ret,
						}
						JSON.parse(content2.ret.dm_dt_fields).forEach((item) => {
							formData[item.fieldDtEname] = item.fieldDtValue;
						});
						
						content3.ret.forEach(item => {
							let ename = item.fieldDefEname;
							if(formData[ename]){
								item.fieldDtValue = formData[ename];
							}
						});
						viewBuilder.build({
							formDef: content1.ret.fields,
							formLayout: ''
						}, formData).done(function(html){
							$('.dataManagerDetail-container',$el).empty().html(html);
							$('#updateForm .form-wrap',$el).html(html);
							$('#updateForm .form-wrap',$el).find('.disabled').removeClass('disabled');
							$('.dataManagerDetail-container,#updateForm .form-wrap',$el).find('.source-cate-info').remove();
							
							content1.ret.fields.forEach((item,index)=>{
								diyFormEvents.BindEvents(item,$('#updateForm .form-wrap',$el),$el);
							});
						});
						$dataTable.rows.add(content3.ret).draw();
						
					});
			}
			
			
			
			
			function saveData(value,dmDtEname,dmDtName,dmDtStatus,dmDtPurpose){
				app.common.ajaxWithCmdb({
					data:{
						'servicename':'cn.com.agree.aim.cmdb.service.datamanage._cmdb_model_data_manager',
						'method':'dm_dt_add',
						'requestData':JSON.stringify({
							'dmDefId': dmDefId,
							'dmDtId': dmDtId,
							'dmDtStatus': dmDtStatus,
							'dmDtPurpose': dmDtPurpose,
							'dmDtEname': dmDtEname,
							'dmDtName': dmDtName,
							'dmDtFieldJson': value
						})
					}
				}).then(function(data){
					if(data.ret){
						app.alert("修改成功");
						renderForm();
					}
				})
			}	

			function bindEvents(){
				$('.detail-wrap .viewtype-wrap>span').on('click',function(){
					$(this).addClass('active').siblings().removeClass('active');
					let i = $('.detail-wrap .viewtype-wrap>span.active').index();
					$('.detail-content>div:eq('+i+')',$el).removeClass('hide').siblings().addClass('hide');
				});
				$('.edit-btn',$el).on('click',function(){
					$('#updateForm',$el).modal('show');
				});
				$('#updateForm .confirmBtn',$el).on('click',function(){
					//修改对象属性
				
            		var data = app.common.getFormData($(".form-wrap form",$el));
					if(!data){
						app.alert('title','输入数据有误，请检查后提交',app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
						return false;
					}
					var value = [];
					for(var key in data){
						value.push({
							'key':key,
							'value':data[key]
						});
					}
					saveData(value,data.dmDtEname,data.dmDtName,data.dmDtStatus,data.dmDtPurpose);
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