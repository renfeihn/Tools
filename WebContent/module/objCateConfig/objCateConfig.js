define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {	
			var columnsObj;//字段描述信息，用于动态生成对应的新增/修改modal
			var validateFn;//验证数据的函数
			var multiSelect;//多选对象
			var passwordIds = [];//存密码框id
			
			var $dataTable = $('#dataTable', $el).DataTable({
				'ordering': false,
				'searching': true,
				'pageLength': 5,
				'paging': true,
				'pagingType': 'full_numbers',
				//'scrollX': true
			});
			
			var $objTable = $('#objTable', $el).DataTable({
				'ordering': false,
				'searching': false,
				'pageLength': 8,
				'paging': true,
				'columns': [{
					data: 'object_id',
					defaultContent: ''
				},{
					data: 'object_name',
					defaultContent: ''
				}]
			});

			var editData = null;
			
			getResources();
			
			function getResources(id,name) {//不传id获取资源分类，传id获取资源类型
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_queryAlllevelCmdbConfig.do',
					data: {pid: id}
				}).then(function(data) {
					data = data.funs;
					if(data) {
						var liTmp = '';
						data.forEach(function(item, i) {
							var removeBtn = (id && name == "软件" && item.note == '1')?'<i class="resource-type-remove-btn fa fa-minus-circle"></i>':'';
							liTmp +=   `<li cate-id="${item.cmdb_cate_id}" data-id="${item.id}" style="background-image: url(${item.logo_path})">
											${removeBtn}
											<span>${item.cate_name}</span>
										</li>`;
						});
						
						if(id) {
							if(name == "软件"){
								liTmp += `<div class="resource-type-add-btn"></div>`;
							}
							$('#resourceTypeCtn', $el).html(liTmp);
							$('#resourceTypeCtn li', $el).eq(0).trigger('click');
						} else {
							$('#resourceCateCtn', $el).html(liTmp);
							$('#resourceCateCtn li', $el).eq(0).trigger('click');
						}
					}
				});
			}
			
			//动态改变关联分类数据
			function getRelativeCates() {
				var liTmp = '';
				$('#resourceCateCtn li:not(.active)', $el).each(function(i, item) {
					liTmp += '<li cate-id="'+ $(item).attr('cate-id') +'">'+ $(item).text() +'</li>';
				});
				
				$('#relativeCates', $el).html(liTmp);
			}
			
			$('#resourceCateCtn', $el).on('click', 'li', function() {
				if($(this).hasClass('active')) return;
				$(this).addClass('active').siblings().removeClass('active');
				
				getRelativeCates();
				
				var id = $(this).attr('data-id');
				var name = $('span', $(this)).text();
				getResources(id,name);
			});
			
			$('#resourceTypeCtn', $el).on('click', 'li', function() {
				if($(this).hasClass('active') || $(this).hasClass('resource-type-temp')) return;
				$(this).addClass('active').siblings().removeClass('active');
				var id = $(this).attr('data-id');
				getTableData(id);

			}).on('click', '.resource-type-add-btn', function(){
				$(this).addClass('hide');
				$(this).before(`<li class="resource-type-temp" style="background-image: url(img/baseMonitor/software-app.png);">
									<i class="resource-type-ok-btn fa fa-check-circle"></i>
									<i class="resource-type-remove-btn fa fa-minus-circle"></i>
									<input type="text" id="softwareName" placeholder="输入资源名称" class="resource-softwareName"/>
								</li>`);
				$('#softwareName', $el).focus();
				
			}).on('click', '.resource-type-ok-btn', function(){
				var softwareName = $('#softwareName', $el).val().trim();
				if("" == softwareName){
					app.alert("请输入资源名称");
					return;
				}else if(softwareNameRepeatTest(softwareName)){
					app.alert("该资源类型名称已存在");
					return;
				}else{
					app.common.ajaxWithAfa({
						url: 'CmdbConfigManagerAction_addSoftware.do',
						data: {
							'softwareName': softwareName
						}
					}).done(function(content){
						if(content.result){
							app.alert('新增成功')
							getResources();
						}else{
							app.alert('新增失败')
						}
					})
				}

			}).on('click', '.resource-type-remove-btn', function(){
				if($(this).parent().hasClass('resource-type-temp')){
					$(this).parent().remove();
					$('.resource-type-add-btn', $el).removeClass('hide');
				}else{
					var cateId = $(this).parent().attr('cate-id');
					var softwareName = $(this).next().text();
					app.confirmDialog({
						sTitle:"删除",
						sType:"search",
						sContent:'是否确认删除名为“'+ softwareName +'”的资源类型？',
						sBtnConfirm: '确定',
						sBtnCancel: '取消',
						fnConfirmHandler: function(){
							app.shelter.show();
							app.common.ajaxWithAfa({
								url: 'CmdbConfigManagerAction_delSoftware.do',
								data: {
									'cateId': cateId
								}
							}).done(function(content){
								app.shelter.hide();
								if(content.result){
									app.alert('删除成功');
									getResources();
								}
							})
						}
					});
				}

			});

			function softwareNameRepeatTest(name){
				var allSoftwareName = [];
				$('#resourceTypeCtn li[cate-id]', $el).each(function(){
					allSoftwareName.push($('span', $(this)).text()); 
				});
				return allSoftwareName.includes(name);
			}

			function getTableData(id){
				$dataTable && $dataTable.clear().draw();
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_queryAllCmdbObject.do',
					async: false,
					data: {conf_id: id}
				}).then(function(data) {
					data = data.funs;
					if(data) {
						var thTmp = '<th width="4%"><input id="checkAllBtn" type="checkbox"/></th>';
						data.columns && data.columns.forEach(function(item, i) {
							thTmp += '<th>'+ item +'</th>';
						});
						$('#dataTable thead tr', $el).html(thTmp);
						
						columnsObj = data.colunmConfig;
						
						newDataTable(data.columns_en);
						
						$dataTable.rows.add(data.object_list).draw();
					}
				});
			}
			
			function newDataTable(data) {
				multiSelect && multiSelect.destroy();
				$dataTable && $dataTable.destroy();
				
				var columns = [{
					data: '',
					render: function(a, b, c, d){
						return '<input  data-index="'+ d.row +'" type="checkbox"/>'
					}
				}];
				data && data.forEach(function(item, i) {
					columns.push({
						data: item,
						defaultContent: ''
					});
				});
				
				$dataTable = $('#dataTable', $el).DataTable({
					'ordering': false,
					'searching': true,
					'pageLength': 5,
					'paging': true,
					'pagingType': 'full_numbers',
					//'scrollX': true,
					'columns': columns
				});
				
				multiSelect = app.multiSelect({
					dataTable: $dataTable,
					tableSelector: '#dataTable',
					checkAllSelector: '#checkAllBtn',
					optBtn: {
						defaultDisabled: '#updateBtn, #delBtn, #relativeBtn',
						onlySelectedOneEnabled: '#updateBtn'
					},
					context: $el
				});
			}
			
			var saveFlag;//saveFlag：true表示新增，false表示修改
			$('#newBtn', $el).click(function() {
				if(!columnsObj) return;
				$('#modalTile', $el).text('新增');
				saveFlag = true;
				showForm();
				setTimeout(function() {
					passwordIds.forEach(function(item, i) {
						$('#' + item, $('#configModal form', $el)).prop('type', 'password');
					});
				}, 500);
				
				changeValidateMethod();
				$('#configModal', $el).modal('show');
			});
			
			$('#updateBtn', $el).click(function() {
				if(!columnsObj || $(this).hasClass('disabled')) return;
				$('#modalTile', $el).text('修改');
				saveFlag = false;
				showForm();
				passwordIds.forEach(function(item, i) {
					$('#' + item, $('#configModal form', $el)).prop('type', 'password');
				});
				
				changeValidateMethod();
				
				var objId = multiSelect.getSelectedValues('object_id')[0];
				var cateId = $('#resourceTypeCtn li.active', $el).attr('data-id');
				showSelectedData(cateId, objId);
			});
			
			$('#delBtn', $el).click(function() {
				if($(this).hasClass('disabled')) return;
				
				app.confirmDialog({
					sTitle:"删除",
					sType:"search",
					sContent:'确认删除勾选的数据？',
					sBtnConfirm: '确定',
					sBtnCancel: '取消',
					fnConfirmHandler: function(){
						deleteData();
					}
				});
			});
			
			$('#relativeBtn', $el).click(function(e) {
				e.stopPropagation();
				if($(this).hasClass('disabled')) return;
				
				$('#relativeCates', $el).toggleClass('hide');
			});
			
			$el.click(function(e) {
				$('#relativeCates', $el).addClass('hide');
			});
			
			var sourceCateId;
			var targetCateId;
			var sourceObjIds;
			$('#relativeCates', $el).on('click', 'li', function(e) {
				sourceCateId = $('#resourceCateCtn li.active').attr('cate-id');
				targetCateId = $(this).attr('cate-id');
				sourceObjIds = multiSelect.getSelectedValues('object_id');
				
				$objTable.clear().rows.add(multiSelect.getSelectedDatas()).draw();
				getRelativeData();
			});	
			
			$('#relativeModal .confirmBtn', $el).click(function() {
				saveRelativeData();
			});
			
			function getRelativeData() {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_getRelation.do',
					data: {
						soruce_objIds: sourceObjIds,
						soruce_cateId: sourceCateId,
						target_cateId: targetCateId
					}
				}).then(function(data) {
					var relationObjs = data.funs.relationObjs;
					var unrelationObjs = data.funs.noRelationObjs;
					if(relationObjs) {
						var liTmp = '';
						relationObjs.forEach(function(item, i) {
							liTmp += '<li obj-id="'+ item.objId +'">'+ item.objName +'</li>';
						});
						$('#relativeCtn', $el).html(liTmp);
					}
					if(unrelationObjs) {
						var liTmp = '';
						unrelationObjs.forEach(function(item, i) {
							liTmp += '<li obj-id="'+ item.objId +'">'+ item.objName +'</li>';
						});
						$('#unrelativeCtn', $el).html(liTmp);
					}
					
					$('#relativeSearch', $el).val('');
					$('#unrelativeSearch', $el).val('');
					$('#relativeModal', $el).modal('show');
				});
			}
			
			function saveRelativeData() {
				var targetObjIds = [];
				$('#relativeCtn li', $el).each(function(i, item) {
					targetObjIds.push($(item).attr('obj-id'));
				});
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_setRelation.do',
					data: {
						soruce_objIds: sourceObjIds,
						soruce_cateId: sourceCateId,
						target_objIds: targetObjIds,
						target_cateId: targetCateId
					}
				}).then(function(data) {
					data = data.funs;
					if(data == 1) {
						app.alert('保存成功');
					} else {
						app.alert('保存失败');
					}
				});
			}
			
			function showSelectedData(cateId, objId) {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_getObjInfo.do',
					data: {
						conf_id: cateId,
						objId: objId
					}
				}).then(function(data) {
					data = data.funs;
					editData = data;
					if(!data) return;
					for(var key in data) {//给表单设置选中行的数据
						$('#' + key, $('#configModal form', $el)).val(data[key]);
					}
					
					
					$('#configModal', $el).modal('show');
				});
			}
			
			//动态改变modal的表单
			function showForm() {
				var formTmp = '';
				passwordIds.length = 0;
				columnsObj.forEach(function(item, i) {
					if(item.isshow == 0 && saveFlag) return;
					var require = item.isnull == 0 ? 'required' : '';
					var defaultValue = item.default_values ? item.default_values : '';
					var disabled = (item.default_values || (!saveFlag && item.isupd == 0) ? 'disabled' : '');
					var onlyValue = (item.isonly == 0? '':'data-only');
					var regExp = item.note1?'data-reg="'+item.note1+'"':'';
					

					if(item.texttype == 1) {//文本框
						formTmp += '<div class="control-group">\
										 <label for="'+ item.colname +'" class="control-label '+ require +'">'+ item.coldesc +'</label>\
										 <div class="controls">\
											 <input class="span9" type="text" '+ require +' '+ regExp +' '+ onlyValue +' id="'+ item.colname +'" name="'+ item.colname +'" placeholder="" value="'+ defaultValue +'" '+ disabled +' autocomplete="off"> <span class="help-inline hide"></span>\
										 </div>\
									 </div>';
					} else if(item.texttype == 2) {//下拉框
						formTmp += '<div class="control-group">\
										<label for="'+ item.colname +'" class="control-label '+ require +'">'+ item.coldesc +'</label>\
										<div class="controls">\
											<select id="'+ item.colname +'" name="'+ item.colname +'" value="'+ defaultValue +'" style="width: 204px;" '+ disabled +'>';
						
						var options = item.options.split('|');			
						options.forEach(function(item) {
							var items = item.split(',');
							formTmp += '<option value="'+ items[1] +'">'+ items[0] +'</option>';
						});
						
						formTmp += 	'</select> <span class="help-inline hide"></span></div></div>';
					} else if(item.texttype == 3) {//密码框
						formTmp += '<div class="control-group">\
							 <label for="'+ item.colname +'" class="control-label '+ require +'">'+ item.coldesc +'</label>\
							 <div class="controls">\
								 <input class="span9" type="text" '+ require +' id="'+ item.colname +'" name="'+ item.colname +'" placeholder="" value="'+ defaultValue +'" '+ disabled +' autocomplete="off"> <span class="help-inline hide"></span>\
							 </div>\
						 </div>';
						
						passwordIds.push(item.colname);
					}
				});
				
				$('#configModal form', $el).html(formTmp);
				$('#configModal #cpu_type', $el).trigger('change');
			}

			$('#configModal', $el).on('change', '#cpu_type', function(e){
				if(this.value == 'ssh'){
					$("#cpu_num", $el).val('22')
				}else if(this.value == 'sftp'){
					$("#cpu_num", $el).val('22')
				}else if(this.value == 'ftp'){
					$("#cpu_num", $el).val('21')
				}else {
					$("#cpu_num", $el).val('')
				}
			}).on('keydown', 'input[name="service_ip"]', function (e) {
				if (isValidIP($(this).val())) {
					$(this).siblings('span.help-inline').addClass('hide').text('')
				} else {
					$(this).siblings('span.help-inline').removeClass('hide').text('输入的IP不合符规则')
				}
			})
			
			function isValidIP(ip) {
			    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
			    return reg.test(ip);
			}
			
			function repeatTest(){
				var onlyFields = $('#configModal form', $el).find('[data-only]');
				if(onlyFields.length > 0){
					var isRepeatFlag = false;
					var aoColumns = $dataTable.settings()[0].aoColumns;
					for(let i = 0; i < onlyFields.length; i++){
						var field_name = $(onlyFields[i]).attr('name');
						var field_value = $(onlyFields[i]).val();
						var targetColumn = aoColumns.find(function(item,index){
							return item.data == field_name;
						});
						var idx = targetColumn?targetColumn['idx']:null;
						// 防止不存在列去校验唯一
						if(!idx){
							continue;
						}
						var columnDatas = Array.prototype.slice.call($dataTable.column(idx).data());
						if(!saveFlag && field_value != editData[field_name] && columnDatas.includes(field_value) || saveFlag && columnDatas.includes(field_value)){
							isRepeatFlag = true;
							$(onlyFields[i]).next().removeClass('hide').text("不可重复");
						}else{
							$(onlyFields[i]).next().addClass('hide');
						}
					}
					return isRepeatFlag;
				}else{
					return false;
				}
				
			}

			$('#configModal .confirmBtn', $el).click(function() {
				if(!validateFn($('#configModal form', $el))) return;
				// 判重
				if(repeatTest()){
					return;
				}
				$('#configModal form', $el).find('[disabled]').removeAttr('disabled');
				var data = $('#configModal form', $el).serializeArray();

				var params = {};
				
				data.forEach(function(item) {
					if($.trim(item.value)) {
						params[item.name] = item.value;
					}
				});

				$('#configModal', $el).modal('hide');
				
				saveData(params);
			});
			
			function saveData(data) {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_updateCmdbObject.do',
					data: {
						updateData: JSON.stringify(data),
						conf_id: $('#resourceTypeCtn li.active', $el).attr('data-id')
					}
				}).then(function(data) {
					data = data.funs;
					if(data == 1) {
						if(saveFlag) {
							app.alert('新增成功');
						} else {
							app.alert('修改成功');
						}
						getTableData($('#resourceTypeCtn li.active', $el).attr('data-id'));
					} else {
						if(saveFlag) {
							app.alert('新增失败');
						} else {
							app.alert('修改失败');
						}
					}
				});
			}
			
			function deleteData() {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_removeObjs.do',
					data: {
						objIds: multiSelect.getSelectedValues('object_id'),
						conf_id: $('#resourceTypeCtn li.active', $el).attr('data-id')
					}
				}).then(function(data) {
					if(data.funs == 1) {
						app.alert('删除成功');
						getTableData($('#resourceTypeCtn li.active', $el).attr('data-id'));
					} else {
						app.alert('删除失败');
					}
				});
			}
			
			function changeValidateMethod() {
				var data = [];
				columnsObj.forEach(function(item, i) {
					if(item.isnull == 0) {
						data.push({
							id: item.colname,
							filter: {
								require: true,
								type: ("note1" in item?"host":"")
							}
						});
					}
				});
				
				validateFn = function(context) {
					var validateResult = app.validate.validate({
						$context : context,
						data: data,
						correctCallback: function ($ele, correctMsg) {
							$ele.next().addClass('hide');
						},
						errorCallback : function ($ele, errMsg) {
							$ele.next().removeClass('hide').text(errMsg);
						}
					});
					return validateResult.bResult;
				}
			}
			
			//已选关联对象
			$('#relativeCtn', $el).on('dblclick', 'li', function(e) {
				if($('#unrelativeSearch', $el).val().trim()) {
					$('#unrelativeSearch', $el).val('');
					$('#unrelativeCtn li', $el).each(function(i, item) {
						$(item).show();
					});
				}
				$(this).remove();
				$('#unrelativeCtn', $el).append(this);
			});
			
			//待选关联对象
			$('#unrelativeCtn', $el).on('dblclick', 'li', function(e) {	
				if($('#relativeSearch', $el).val().trim()) {
					$('#relativeSearch', $el).val('');
					$('#relativeCtn li', $el).each(function(i, item) {
						$(item).show();
					});
				}
				$(this).remove();
				$('#relativeCtn', $el).append(this);
			});
			
			//关联对象搜索
			$('#relativeSearch, #unrelativeSearch', $el).keyup(function(e) {
				var keycode = e.which;
				var value = $(this).val().trim();
				if(keycode == 13 || keycode == 8) {					
					$(this).next('ul').find('li').each(function(i, item) {
						if($(item).text().indexOf(value) > -1) {
							$(item).show();
						} else {
							$(item).hide();
						}
					});
				}
			});
			
			$('#outputExcelBtn', $el).click(function() {
				$.ajaxDownload('CmdbConfigManagerAction_exportCmdbData.do',{
					conf_id: $('#resourceTypeCtn li.active').attr('data-id')
				});
				/*app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_exportCmdbData.do',
					data: {
						conf_id: $('#resourceTypeCtn li.active').attr('data-id')
					}
				}).then(function(data){
					downloadFile(data.file);
				});*/
			});
			
			$('#outputTmpBtn', $el).click(function() {
				$.ajaxDownload('CmdbConfigManagerAction_getCmdbModule.do',{
					conf_id: $('#resourceTypeCtn li.active').attr('data-id')
				});
				/*app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_getCmdbModule.do',
					data: {
						conf_id: $('#resourceTypeCtn li.active').attr('data-id')
					}
				}).then(function(data){
					downloadFile(data.file);
				});*/
			});
			
			function downloadFile(file) {
				var iframe = $('<iframe style="display: none"></iframe>');
				$(document.body).append(iframe);
				iframe.attr('src', '/download/' + file);
			}
			
			$('#inputBtn', $el).click(function() {
				var fileObj = $('#file', $el)[0].files[0];
				if(fileObj) {
					var form = new FormData();
					form.append('file', fileObj);
					form.append('conf_id', $('#resourceTypeCtn li.active', $el).attr('data-id'));
					var xhr = new XMLHttpRequest();
					xhr.open('post', './CmdbConfigManagerAction_importCmdbData.do', true);
					xhr.onload = function() {
						var data = JSON.parse(xhr.response).content;
						if(data.result == 1) {
							app.alert('导入成功');
							getTableData($('#resourceTypeCtn li.active', $el).attr('data-id'));
						} else {
							app.alert(data.result);
						}
					}
					
					xhr.send(form);
				} else {
					app.alert('未选择文件');
				}
			});
		},
		unload : function(handler) {

		},
		pause : function($el, attr, handler) {
			
		},
		resume : function($el, attr, handler) {
			
		}
	};
});
