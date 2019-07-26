define(["jquery"], function($) {
	return {
		load : function($el, scope, handler) {
			var dmDefId = scope.dmDefId;
			var dmDtId = scope.dmDtId;
			console.log(scope);
			let allRels = [];
			let relation_tab = $('#relation_tab',$el).DataTable({
        		"pagingType": 'full_numbers',
        		'sort': false,
				'searching'	: true,
        		'columns': [{
        			data: 'index',defaultContent: '',title: '序号',
        			render: function(data,type,row,meta){
        				return (meta.row + 1);
        			}
        		},{
        			data: 'source_id',defaultContent: '',title: '源对象ID'
        		},{
        			data: 'source_name',defaultContent: '',title: '源对象名称'
        		},{
        			data: 'relation_name_zh',defaultContent: '',title: '关系类型'
        		},{
        			data: 'target_id',defaultContent: '',title: '目标对象ID'
        		},{
        			data: 'target_name',defaultContent: '',title: '目标对象名称'
        		},{
        			data: '',defaultContent: '',title: '操作',
        			render: function(data,type,row,meta){
        				return `<span class="btn-delete">删除</span>`;
        			}
        		}]
        	});
			
			
			getRelations();
			function getRelations() {
				allRels.length = 0;
				relation_tab.clear().draw();
				app.common.ajaxWithAfa({
					url:'CmdbConfigManagerAction_getObjRelData.do',
					data:{objId: dmDtId}, //100045
				}).then(function(content){
					allRels = content.result;
					relation_tab.rows.add(allRels).draw();
					renderSelector(allRels);
				});
			}
			
			
			function renderSelector(arr) {
				if(arr.length == 0){
					return;
				}
				let html = `<option value="">全部</option>`;
				let relType = [];
				arr.forEach(item => {
					if(!relType.includes(item.relation_type)){
						relType.push(item.relation_type);
						html += `<option value="${item.relation_type}">${item.relation_name_zh}</option>`;
					}		
				});
				$('#rel_type',$el).html(html);
				
			}
			
			function loadAddRelation() {
				let type = $('#addRelation #myModalLabel>span.active',$el).attr('data-type');
				let field = type == 1 ? 'target_id' : 'source_id';
				let otherField = type == 1 ? 'source_id' : 'target_id';
				let hasRelation = [];
				if(allRels.length > 0){
					allRels.forEach(item => {
						if(item[field] == dmDtId){
							hasRelation.push(item[otherField]);
						}
					});
				}
				
				app.dispatcher.load({
					"moduleId" : "CMDB_configView",
					"section" : ["objList","addRelation"],
					"frameRenderTo" : '#relation_wrap',
					"id" : "relation_wrap",
					"params" : {
						type: Number(type),
						node: {
							name: scope.objName,
							ename: scope.objName,
							id: scope.dmDtId,
							image: scope.objInfo.img,
							dmDefId: dmDefId
						},
						hasRelation: hasRelation
					}
				});
			}
			
			
			function hideModal() {
				$('#addRelation',$el).removeClass('show-modal');
			}
			
			bindEvents();
			function bindEvents() {
				
				$('#addRelation #myModalLabel>span',$el).on('click',function(){
					if($(this).hasClass('active')){
						return;
					}
					$(this).addClass('active').siblings().removeClass('active');
					loadAddRelation();
				});
				
				$('button.close,button.cancelBtn,.addRelation-mask',$('#addRelation',$el)).on('click',function(){
					hideModal();
				});
				
				$('.editBtn',$el).on('click',function(){
					$('#addRelation',$el).addClass('show-modal');
					loadAddRelation();
				});
				
				$('#rel_direction',$el).on('change',function(){
					relation_tab.clear().draw();
					let val = $(this).val();
					if(!val){
						relation_tab.rows.add(allRels).draw();
						return;
					}
					let arr = allRels.filter(item => {
						let field = val == '1' ? 'target_id' : val == '2' ? 'source_id' : '';
						return item[field] == dmDtId;
					});
					relation_tab.rows.add(arr).draw();
				});
				
				$('#rel_type',$el).on('change',function(){
					relation_tab.clear().draw();
					let val = $(this).val();
					if(!val){
						relation_tab.rows.add(allRels).draw();
						return;
					}
					let arr = allRels.filter(item => item.relation_type == val);
					relation_tab.rows.add(arr).draw();
				});
				
				$('#relation_tab',$el).on('click','.btn-delete',function(){
					let id = relation_tab.row($(this).closest('tr')).data().record_id;
					app.confirmDialog({
						sTitle:"确认",       
		                sType:"search",
		                sContent:'确定删除该条关系？',
		                sBtnConfirm: '确定',
		                sBtnCancel: '取消',
		                fnConfirmHandler: function(){
		                	app.common.ajaxWithAfa({
		                		url:'CmdbConfigManagerAction_delObjRela.do',
		                		data:{
		                			record_id: id
		                		}
		                	}).done(function (data) {
		                		if(data.result){
		                			app.alert("删除成功");
		                			getRelations();
		                		}   
		                	});
		                },
					});
				});
				
				window.addEventListener("message", function(e){
					if(e.data == 'add-success'){
						getRelations();
					}
				}, false);
				
			}
			
			
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});