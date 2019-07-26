define([],function(){
	
	return {
		
		load:function($el,scope,handler){
			console.log(scope);
			let fieldsMap = {
					s_field: [],
					func: ['String','int','Date'],
					t_field: []
			};
			let datasourceType = {
					1: 'mysql',
					2: 'oracle',
					3: 'kafka'
			};
			let flag = '';
			let connectFlag = false;
			
			let output_table = $('#output_table',$el).DataTable({
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
					data:'name',defaultContent:'',title: '日志源名称',
					'render':function(data,type,row,meta){
						return scope.info.sourceName;
					}
				},{
					data:'dbType',defaultContent:'',title: '数据源类型',
					'render':function(data,type,row,meta){
						return datasourceType[data];
					}
				},{
					data:'dbDatasourceName',defaultContent:'',title: '数据源名称'
				},{
					data:'taskName',defaultContent:'',title: '任务名称'
				},{
					data:'createTime',defaultContent:'',title: '创建时间'
				},{
					data:'',defaultContent:'',title: '操作',
					'render':function(data,type,row,meta){
						return '<span class="check-result">执行结果</span>';
					}
				}]
			});
		
			
			getTaskList();
			getESFields();
			bindModalEvents();
			bindTableEvents();
			
			
			
			function bindTableEvents() {
				$('#output_table',$el).on('click','tbody>tr',function(){
					let data = output_table.row($(this)).data();
					connectFlag = true;
					flag = 'edit';
					$('#modal',$el).addClass('show');
					$('.index-wrap>.index-item:eq(0)',$el).trigger('click');
					renderForm(data);
				});
				$('#output_table',$el).on('click','.check-result',function(e){
					e.stopPropagation();
					let taskId = output_table.row($(this).closest('tr')).data().id;
					console.log('taskId',taskId);
					app.domain.exports('dataOutputResult',{
						taskId: taskId
					});
					app.dispatcher3.load({
						title: "执行结果",
						moduleId:"logInfoConfig",
						section: ['dataOutput','dataOutputResult'],
						id: 'dataOutputResult',
						params:{
							taskId: taskId
						},
						context: $el
					});
				});
			}
			
			
			function bindModalEvents() {
				$('#modal',$el).on('click',function(e){
					e.stopPropagation();
				});
				$('#add_btn',$el).on('click',function(){
					flag = 'add';
					connectFlag = false;
					$('#modal',$el).addClass('show');
					$('.index-wrap>.index-item:eq(0)',$el).trigger('click');
					if($('.table-body>.body-item',$el).length == 0){
						$('.addone',$el).trigger('click');
					}
				});
				$('.modal-mask,.modal-close,.cancelBtn',$el).on('click',function(){
					$('#modal',$el).removeClass('show');
				});
				//上一步下一步
				$('.index-wrap',$el).on('click','.index-item',function(){
					let i = $(this).index() - 1;
					if(!connectFlag && i != 0){
						return;
					}
					let total = $('.index-wrap>.index-item',$el).length - 1;
					let process = (i / total) * 100 + '%';
					let role = $(this).attr('data-role');
					$('.index-process',$el).css('width',process);
					$(this).addClass('active').siblings().removeClass('active');
					$('.step-items-wrap>div[data-role="'+role+'"]',$el).removeClass('hide').siblings().addClass('hide');
					renderBtns();
				});
				
				//上一步下一步
				$('.step-btns>button',$el).on('click',function(){
					if($(this).hasClass('disabled')){
						return;
					}
					let active = $('.index-wrap>.index-item.active',$el);
					let className = $(this).attr('class');
					let actionBtn = className == 'btn-prev' ? active.prev() : active.next();
					actionBtn && actionBtn.trigger('click');
				});
				
				//数据源类型切换
				$('input[name="datasource"]',$el).on('change',function(){
					let checked = $('input[name="datasource"]:checked',$el);
					let type = checked.attr('data-type');
					if(type == '3'){ //kafka
						$('.database-name',$el).text('topic');
						$('.tablename-item',$el).addClass('hide');
					}else{
						$('.database-name',$el).text('数据库名称');
						$('.tablename-item',$el).removeClass('hide');
					}
				});
				
				//功能提示
				$('.filter-functions',$el).on('mouseenter','span',function(){
					let tips = $(this).attr('data-tips');
					$('.filter-tips',$el).text(tips);
				});
				$('.filter-functions',$el).on('mouseleave','span',function(){
					let tips = $('.filter-tips',$el).attr('data-tips');
					$('.filter-tips',$el).text(tips);
				});
				
				//新增一条
				$('.addone',$el).on('click',function(){
					let newItem = `<div class="body-item">
										<span data-role="s_field"><span>选择</span><i class="fa fa-caret-down"></i></span>
										<span data-role="func"><span>选择</span><i class="fa fa-caret-down"></i></span>
										<span data-role="t_field"><span>选择</span><i class="fa fa-caret-down"></i></span>
										<i class="fa fa-times item-delete"></i>
									</div>`;
					$('.table-body',$el).append(newItem);
				});
				
				//删除一条
				$('.table-body',$el).on('click','.body-item i.item-delete',function(){
					$(this).parent().remove();
				});
				
				//选择源字段
				$('.table-body',$el).on('click','span[data-role]',function(e){
					e.stopPropagation();
					let role = $(this).attr('data-role');
					$('.field-select',$el).remove();
					let hideBar = role == 'func' ? true : false;
					let text = $(this).find('>span').text();
					appendSelect(fieldsMap[role],$(this),text,hideBar);
				});
				
				$('.table-body',$el).on('click','.fields-ul>li',function(e){
					e.stopPropagation();
					let $p = $(this).parents('.field-select');
					let role = $p.closest('[data-role]').attr('data-role');
//					if(role == 's_field'){
//						$(this).toggleClass('active');
//					}else{
//						$(this).addClass('active').siblings().removeClass('active');
//					}
					$(this).addClass('active').siblings().removeClass('active');
					let str = Array.from($('li.active',$p)).map(item => $(item).text()).join(',');
					!str && (str = '选择');
					$p.parent().find('>span').text(str);
					$p.remove();
				});
				
				$('#modal',$el).on('click',function(e){
					if($('.field-select',$el).length > 0){
						$('.field-select',$el).remove();
					}
				});
				$('#modal',$el).on('click','.field-select',function(e){
					e.stopPropagation();
				});
				
				//执行周期
				$('.excute-circle>span',$el).on('click',function(){
					$(this).addClass('active').siblings().removeClass('active');
				});
				
				//测试连接
				$('.connect-test',$el).on('click',function(){
					testConnect();
				});
				
				//保存
				$('#modal',$el).on('click','.confirmBtn',function(){
					let params = getParams();
					addTask(params);
				});
				
			}
			
			function renderBtns() {
				let length = $('.index-wrap>.index-item',$el).length;
				let active = $('.index-wrap>.index-item.active',$el).index() - 1;
				$('.step-btns>button',$el).removeClass('disabled');
				$('.modal-footer',$el).addClass('hide');
				if(active == 0){
					$('.btn-prev',$el).addClass('disabled');
					connectFlag ? $('.btn-next',$el).removeClass('disabled') : $('.btn-next',$el).addClass('disabled');
				}else if(active == length - 1){
					$('.btn-next',$el).addClass('disabled');
					$('.modal-footer',$el).removeClass('hide');
				}
			}
			
			function appendSelect(arr,ele,text,hideBar) {
				let txt = text.split(',');
				let hide = hideBar ? 'hide' : 'hide';
				let fields = arr.map(item => {
					let active = txt.includes(item) ? 'active' : '';
					return `<li class="${active}">${item}</li>`
				}).join('');
				let html = `<div class="field-select">
								<p class="${hide}"><i class="fa fa-check-square"></i><input type="text" /></p>
								<ul class="fields-ul">${fields}</ul>
							</div>`;
				ele.append(html);
			}
			
			//测试连接
			function testConnect() {
				app.common.ajaxWithAfa({
            		url:'EtlTargetDatasourceAction_testDBSrouceConnect.do',
            		data:{
            			targetDatasource: JSON.stringify({
            				id: scope.info.appId,
            				db_type: $('input[name="datasource"]:checked',$el).attr('data-type'),
    						db_name: $('input[data-field="dbName"]',$el).val(),
    						db_connect_url: $('input[data-field="dbConnectUrl"]',$el).val(),
    						db_database: $('input[data-field="dbDatabase"]',$el).val(),
    						db_user: $('input[data-field="dbUser"]',$el).val(),
    						db_pswd: $('input[data-field="dbPswd"]',$el).val(),
            			})
						
            		}
            	}).done(function (data) {
            		if(data.result){
            			connectFlag = true;
            			app.alert('连接成功');
            			getTableFields();
            			renderBtns();
            		}
            	})
			}
			
			//es字段
			function getESFields() {
				fieldsMap['s_field'].length = 0;
				app.common.ajaxWithAfa({
            		url:'EtlTaskFieldMappingAction_getESFiledList.do',
            		data:{
            			systemId: Number(scope.info.sourceId)
            		}
            	}).done(function (data) {
            		if(data.result.length == 0){
            			return;
            		}
            		data.result.forEach(item => {
            			item.splitFields.forEach(it => {
            				fieldsMap['s_field'].push(it.fieldKey);
            			});
            		});
            	})
			}
			
			//数据表字段
			function getTableFields() {
				fieldsMap['t_field'].length = 0;
				app.common.ajaxWithAfa({
            		url:'EtlTaskFieldMappingAction_getDatasourceFiledList.do',
            		data:{
            			targetDatasource: JSON.stringify({
            				id: scope.info.appId,
            				db_type: $('input[name="datasource"]:checked',$el).attr('data-type'),
    						db_name: $('input[data-field="dbName"]',$el).val(),
    						db_connect_url: $('input[data-field="dbConnectUrl"]',$el).val(),
    						db_database: $('input[data-field="dbDatabase"]',$el).val(),
    						db_user: $('input[data-field="dbUser"]',$el).val(),
    						db_pswd: $('input[data-field="dbPswd"]',$el).val(),
            			}),
            			tableName: $('input[data-field="dbTableName"]',$el).val()
            		}
            	}).done(function (data) {
            		let arr = data.result;
            		arr.forEach(item => {
            			fieldsMap['t_field'].push(item);
            		});
            	})
			}
			
			//参数
			function getParams() {
				let fieldsMap = [];
				$('.table-body>.body-item',$el).each((index,item) => {
					let source_filed = $(item).find('span[data-role="s_field"]>span').text();
					let target_filed = $(item).find('span[data-role="t_field"]>span').text();
					let filedTpype = $(item).find('span[data-role="func"]>span').text();
					filedTpype = filedTpype == 'int' ? 'String' : filedTpype;
					fieldsMap.push({source_filed,target_filed,filedTpype});
				});
				let p = {
						task: JSON.stringify({
							id: scope.info.appId,
							datasource_id: scope.info.sourceId,
							task_name: $('input[data-field="taskName"]',$el).val(),
							db_type: $('input[name="datasource"]:checked',$el).attr('data-type'),
							db_datasource_name: $('input[data-field="dbDatabase"]',$el).val(),
							db_table_name: $('input[data-field="dbTableName"]',$el).val(),
							targetDatasource: {
								id: scope.info.appId,
								db_type: $('input[name="datasource"]:checked',$el).attr('data-type'),
								db_name: $('input[data-field="db_name"]',$el).val(),
								db_connect_url: $('input[data-field="dbConnectUrl"]',$el).val(),
								db_database: $('input[data-field="dbDatabase"]',$el).val(),
								db_user: $('input[data-field="dbUser"]',$el).val(),
								db_pswd: $('input[data-field="dbPswd"]',$el).val(),
							},
							fieldMapping: fieldsMap
						}),
						frequency: Number($('.excute-circle>span.active',$el).attr('data-circle'))
				};
				return p;
			}
			
			//查询任务列表
			function getTaskList() {
				output_table.clear().draw();
				app.common.ajaxWithAfa({
            		url:'EtlTaskAction_queryAllTaskList.do',
            		data:{
            			datasourceId: scope.info.sourceId
            		}
            	}).done(function (data) {
            		output_table.rows.add(data.result).draw();
            	})
			}
			
			//新增任务
			function addTask(params) {
				app.common.ajaxWithAfa({
            		url:'EtlTaskAction_createTask.do',
            		data: params
            	}).done(function (data) {
            		if(data.result){
            			app.alert('保存成功');
            			$('#modal',$el).removeClass('show');
            			getTaskList();
            		}
            	})
			}
			
			
			function renderFieldsList(type) {
				
			}
			
			function renderForm(data) {
				$('input[data-type="'+data.dbType+'"]',$el).attr('checked',true);
				$('input[data-field="dbTableName"]',$el).val(data.dbTableName);
				$('input[data-field="taskName"]',$el).val(data.taskName);
				if(data.targetDatasource){
					for(let i in data.targetDatasource) {
						$('[data-field="'+i+'"]',$el).val(data.targetDatasource[i]);
					}
				}
				$('.table-body',$el).html('');
				if(data.fieldMapping && data.fieldMapping.length > 0){
					let html = '';
					data.fieldMapping.forEach(item => {
						let source = item.source_filed || '选择';
						let func = item.filedTpype || '选择';
						let target = item.target_filed || '选择';
						html += `<div class="body-item">
									<span data-role="s_field"><span>${source}</span><i class="fa fa-caret-down"></i></span>
									<span data-role="func"><span>${func}</span><i class="fa fa-caret-down"></i></span>
									<span data-role="t_field"><span>${target}</span><i class="fa fa-caret-down"></i></span>
									<i class="fa fa-times item-delete"></i>
								</div>`;
					});
					$('.table-body',$el).html(html);
				}
				
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