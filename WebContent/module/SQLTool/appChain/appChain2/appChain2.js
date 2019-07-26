define([],function(){
	return {
		load:function($el,scope,handler){
			
			let allApp = [];
			let flag = 'add';
			let appFields = {};
			let appName = {};
			let sourceFields = [];
			let targetFields = [];
			
			getAllApp().done(data => {
				getAllCfg();
			});
			
			let app_table = $('#app_table',$el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'columns':[{
					data:'index',defaultContent:'',title: '序号',
					'render':function(data,type,row,meta){
						return (meta.row + 1);
					}
				},{
					data:'chainName',defaultContent:'',title: '关系'
				},{
					data:'fromAppid',defaultContent:'',title: '上游系统',
					'render':function(data,type,row,meta){
						return appName[data];
					}
				},{
					data:'toAppid',defaultContent:'',title: '下游系统',
					'render':function(data,type,row,meta){
						return appName[data];
					}
				},{
					data:'',defaultContent:'',title: '操作',
					'render':function(data,type,row,meta){
						return `<span class="edit-btn edit" title="编辑"><i class="fa fa-edit"></i></span><span class="edit-btn delete" title="删除"><i class="fa fa-trash"></i></span>`;
					}
				}]
			});
			
			
			
			
			bindEvents();
			function bindEvents() {
				$el.on('click',function(){
					$('.clear-modal',$el).removeClass('show');
				});
				$('.clear-modal',$el).on('click',function(e) {
					e.stopPropagation();
				});
				$('.cancelBtn',$el).on('click',function(){
					$('.clear-modal',$el).removeClass('show');
				});
				
				//新增
				$('#addRelationBtn',$el).on('click',function(e){
					e.stopPropagation();
					flag = 'add';
					renderForm();
					$('.clear-modal',$el).addClass('show').removeClass('uneditable');
				});
				$('#app_table',$el).on('click','tr',function(e){
					e.stopPropagation();
					flag = 'check';
					let data = app_table.row($(this)).data();
					renderForm(data);
					$('.clear-modal',$el).addClass('show uneditable');
				});
				$('.clear-modal',$el).on('click','.field-add',function(){
					let html = renderFieldItem();
					$('.fields-wrap',$el).append(html);
				});
				$('.clear-modal',$el).on('click','.delete',function(){
					$(this).parent().remove();
				});
				
				//修改
				$('#app_table',$el).on('click', '.edit-btn.edit', function(e){
					e.stopPropagation();
					flag = 'edit';
					var data = app_table.row($(this).closest('tr')).data();
					$('#modal',$el).attr('data-id',data.id);
					renderForm(data);
					$('.clear-modal',$el).addClass('show').removeClass('uneditable');
				});
				
				//删除
				$('#app_table',$el).on('click', '.edit-btn.delete', function(e){
					e.stopPropagation();
					var item = app_table.row($(this).closest('tr')).data();
					app.confirmDialog({//提示框组件
						sTitle:"请确认",  //确认框标题         
		                sType:"search",  //模块类型，有normal，success，search，warn，error,默认为normal常规
		                sContent:'您确定要删除该记录吗？',  //确认框内容，非必填
		                sBtnConfirm: '确定',  //确认按钮显示内容
		                sBtnCancel: '取消',  //却笑按钮显示内容
		                fnConfirmHandler: function(){
		                	app.common.ajaxWithAfa({
		    					url: 'LogChainAction_delById.do',
		    					data: {
		    						id: Number(item.id)
		    					},
		    				}).done(function(content) {
		    					if(content.result){
		    						app.alert('删除成功');
		    						getAllCfg();
		    					}
		    				});
		                }
					})
				});
				
				//选择上游系统
				$('#modal',$el).on('change','#source_app',async function(){
					let id = $(this).val();
					if(!id){
						return;
					}
					await getFields(id);
					sourceFields = [...appFields[id]];
					renderFieldsSelect(sourceFields,$('select[name="source_field"]',$el));
				});
				
				//选择下游系统
				$('#modal',$el).on('change','#target_app',async function(){
					let id = $(this).val();
					if(!id){
						return;
					}
					await getFields(id);
					targetFields = [...appFields[id]];
					renderFieldsSelect(targetFields,$('select[name="target_field"]',$el));
				});
				
				//保存
				$('#modal',$el).on('click','.confirmBtn',function(){
					let arr = [];
					$('.field-item',$el).each((index,item) => {
						let fromField = $(item).find('#source_field').val();
						let toField = $(item).find('#target_field').val();
						arr.push({fromField,toField});
					});
					let params = {
							fromAppid: $('#source_app',$el).val(),
							toAppid: $('#target_app',$el).val(),
							chainName: $('#rel_name',$el).val(),
							dtlList: arr
					};
					if(flag == 'edit'){
						params.id = $('#modal',$el).attr('data-id');
					}
					addCfg(params);
				});
			}
			
			//获取应用系统下的字段
			async function getFields(id) {
				let fields = [];
				if(appFields[id]){
					fields = [...appFields[id]];
				}else{
					let data = await ajaxWithAfa({
						url: 'LogChainAction_getStructFieldByAppid.do',
						data: {
							appid: Number(id)
						}
					});
					fields = [...data.result];
					appFields[id] = [...fields];
				}
				
			}
			
			
			
			function renderFieldsSelect(arr,ele,id) {
				let html = '';
				arr.forEach(item => {
					html += `<option value="${item}">${item}</option>`;
				});
				ele.html(html);
				id && ele.val(id);
			}
			
			//查询所有配置
			function getAllCfg() {
				app_table.clear().draw();
				app.common.ajaxWithAfa({
					url: 'LogChainAction_getAll.do',
					data: {},
				}).done(function(content) {
					app_table.rows.add(content.result).draw();
				});
			}
			
			
			//添加配置
			function addCfg(data) {
				app.common.ajaxWithAfa({
					url: 'LogChainAction_addCfg.do',
					data: {
						logChainCfgString: JSON.stringify(data)
					},
				}).done(function(content) {
					if(content.result == 'OK'){
						app.alert('保存成功');
						$('.clear-modal',$el).removeClass('show');
						getAllCfg();
					}
				});
			}
			
			function getAllApp () {
				return app.common.ajaxWithAfa({
					url: 'ESSearchAction_getObjectCategory.do',
					data: {},
				}).done(function(content) {
					var appCate = content.result.app;
					allApp = getCateApp(appCate);
					allApp.forEach(item => {
						appName[item.cateId] = item.cateName;
					});
					renderAppSelect();
					return $.Deferred().resolve(content);
				});
			}
			
			function getCateApp (appCate) {
				var app = [];
				appCate.forEach(item => {
					if (item.childs && item.childs.length > 0) {
						app = app.concat(getCateApp(item.childs))
					} else {
						app.push(item);
					}
				})
				return app;
			}
			
			function renderAppSelect(sid,tid) {
				var h = allApp.map(item => {
					return `<option value="${item.cateId}">${item.cateId}-${item.cateName}</option>`
				});
				h.unshift(`<option value="">请选择</option>`)
				$('#source_app',$el).html(h);
				$('#target_app',$el).html(h);
				
				sid && $('#source_app',$el).val(sid).trigger('change');
				tid && $('#target_app',$el).val(tid).trigger('change');
			}
			
			function renderFieldItems(arr) {
				let html = '';
				if(arr && arr.length > 0){
					arr.forEach(item => {
						html += renderFieldItem();
					});
				}
				return html;
			}
			
			function renderFieldItem() {	
				let sourceHtml = sourceFields.map(item => `<option value="${item}">${item}</option>`).join('');
				let targetHtml = targetFields.map(item => `<option value="${item}">${item}</option>`).join('');
				let fieldItem = `<div class="field-item">
									<i class="delete fa fa-times"></i>
									<div class="control-group">
										<label class="control-label">上游字段</label>
										<div class="controls">
											<select name="source_field" id="source_field">${sourceHtml}</select>
										</div>
									</div>
									<div class="control-group hide">
										<label class="control-label">表达式</label>
										<div class="controls">
											<select name="" id="expression">
												<option value="=">等于</option>
											</select>
										</div>
									</div>
									<div class="control-group">
										<label class="control-label">下游字段</label>
										<div class="controls">
											<select name="target_field" id="target_field">${targetHtml}</select>
										</div>
									</div>
								</div>`;
				
				return fieldItem;
			}
			
			async function renderForm(data) {
				let fieldsHtml = '';
				sourceFields.length = 0;
				targetFields.length = 0;
				let form = `<div class="control-group">
								<label class="control-label">上游应用系统</label>
								<div class="controls">
									<select id="source_app"></select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label">下游应用系统</label>
								<div class="controls">
									<select id="target_app"></select>
								</div>
							</div>
							<div class="control-group">
								<label class="control-label">关系名称</label>
								<div class="controls">
									<input type="text" id="rel_name"/>
								</div>
							</div>
							<div class="fields-wrap">${fieldsHtml}</div>
							<div class="field-add uneditable">新增字段</div>
							<div class="control-group uneditable">
								<div class="controls" style="margin-left: 0;text-align: center;">
									<button type="button" class="cancelBtn">取消</button>
									<button type="button" class="confirmBtn">确认</button>
								</div>
							</div>`;
				$('.clear-modal',$el).html(form);
				if(data){
					renderAppSelect(data.fromAppid,data.toAppid);
					$('#rel_name',$el).val(data.chainName);
					
					await getFields(data.fromAppid);
					await getFields(data.toAppid);
					sourceFields = [...appFields[data.fromAppid]];
					targetFields = [...appFields[data.toAppid]];
					
					let fields = data.dtlList;
					fieldsHtml = renderFieldItems(fields);
					$('.clear-modal .fields-wrap',$el).html(fieldsHtml);
					handler.setTimeout(() => {
						$('.clear-modal .fields-wrap>.field-item',$el).each((index,item) => {
							let sourceSelect = $(item).find('select[name="source_field"]');
							let targetSelect = $(item).find('select[name="target_field"]');
							sourceSelect.val(fields[index]['fromField']);
							targetSelect.val(fields[index]['toField']);
						});
					},300);
							
					if(flag == 'check'){
						$('select,input',$('#modal',$el)).attr('disabled',true);
					}else{
						$('select,input',$('#modal',$el)).removeAttr('disabled');
					}
				}else{
					renderAppSelect();
				}
				
			}
			
			
			/* 公共ajax请求  */
			function ajaxWithAfa (param) {
				return new Promise( (resolve, reject) => {
					app.common.ajaxWithAfa(param).then(function(data){
						resolve(data);
						app.shelter.hide();
					})
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