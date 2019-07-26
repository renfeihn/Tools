(function(undefined){
	(function(factory){
		"use strict";

		//amd module
		if (typeof define === "function" && define.amd) {
			define(["jquery", "viewBuilder"], factory);
		}
		//global
		else {
			factory();
		}

	})(function($, viewBuilder){
		"use strict";

		var BindEvents = function(ztreeNode, $delegationEle, $el){
			var events_main_id = ztreeNode.id; // 事件主体id,绑定在谁身上的
			var events_content = ztreeNode.events; // 事件内容
			// 避免重复绑定，解绑
			$delegationEle.off('.'+events_main_id);
			// 绑定
			for(var events_type in events_content){
				var actionArr = events_content[events_type].actions;
				actionArr.forEach(function(action, index){
					$delegationEle.on(events_type+'.'+events_main_id, '#'+events_main_id, function(){
						var conditionArr = action.condition;// 条件
						var if_result = true; // 如果没有条件 直接为true
						conditionArr.forEach(function(condition, index_i){
							var controlValue = $('#'+condition.control_condition, $delegationEle).val();
							var compare = switchText2Symbol(condition.compare);
							var targetValue = condition.target_value;
							if(index_i == 0){
								if_result = eval('controlValue'+compare+'targetValue');
							} else {
								var relation = switchText2Symbol(condition.relation);
								if_result = eval('if_result'+relation+'controlValue'+compare+'targetValue');
							}
						})
						if(if_result){
							switch (action.actionType){
								case '1':
									var methodName = action.funcName;
									var inArgs_arr = action.inArgs;
									var outArgs_arr = action.outArgs;
									var sendAgrs = {};
									inArgs_arr.forEach(function(item, index){
										sendAgrs[item.key] = $('#'+item.value, $delegationEle).val();
									});
									$.ajax({
										type: 'POST',
										url: 'FunctionAction_invokeService.do',
										data: {
											'methodName': action.funcName,
											'args': JSON.stringify(sendAgrs)
										},
										success: function(data){
											if(data.status){
												var result = data.content.ret || {};
												outArgs_arr.forEach(function(item, index){
													if (item.way == 'value') {
														$('#'+item.value, $delegationEle).val(result[item.key]);
													}else{
														$('#'+item.value, $delegationEle).html(result[item.key]);
													}
												});
											}
										}
									});
									break;

								case '2':
									if(action.disabled == '1'){
										$('#'+action.targetControls, $delegationEle).attr('disabled','disabled');
									}else{
										$('#'+action.targetControls, $delegationEle).removeAttr('disabled');
									}
									if(action.readonly == '1'){
										$('#'+action.targetControls, $delegationEle).attr('readonly','readonly');
									}else{
										$('#'+action.targetControls, $delegationEle).removeAttr('readonly');
									}
									if(action.require == '1'){
										$('#'+action.targetControls, $delegationEle).attr('require','require');
									}else{
										$('#'+action.targetControls, $delegationEle).removeAttr('require');
									}
									$('#'+action.targetControls, $delegationEle).val(action.value);
									break;

								case '3':
									$('#'+action.targetControls, $delegationEle).trigger(targetEvents);
									break;
							}
						}
					});
				});
			}


			// 根据控件自身的属性配置而产生的事件
			var props = ztreeNode.props;
			var control_type = props.controlsName;
			var regexp_str = {
				'整数': "^-?\\d+$",
				'必输': ".+"
			};
			switch (control_type) {
				case '单行文本':
				case '多行文本':
				case '下拉菜单':
				case '数字':
					$delegationEle.on('blur'+'.'+events_main_id, '#'+events_main_id, function(){
						var value = $(this).val();
						if(props['required'] && props['required'] != '否'){
							if(!regExpTest(regexp_str['必输'], value)){
								// 不合法
								var helpInline = $(this).prev();
								if(helpInline.length == 0){
									$(this).before('<span class="help-inline">不能为空</span>');
								}else{
									helpInline.text('不能为空');
								}
								return;
							}
						}

						if(props['regexp'] && value){
							if(!regExpTest(props['regexp'], value)){
								// 不合法
								var helpInline = $(this).prev();
								if(helpInline.length == 0){
									$(this).before('<span class="help-inline">您的输入不符合'+ props['validate'] +'校验规则</span>');
								}else{
									helpInline.text('您的输入不符合'+ props['validate'] +'校验规则');
								}
								return;
							}
						}

						if(props['maxlength']){
							if(value.length > props['maxlength']){
								// 不合法
								var helpInline = $(this).prev();
								if(helpInline.length == 0){
									$(this).before('<span class="help-inline">您输入的内容不合法</span>');
								}else{
									helpInline.text('您输入的内容不合法');
								}
								return;
							}
						}

						if(props['minlength']){
							if(value.length < props['minlength']){
								// 不合法
								var helpInline = $(this).prev();
								if(helpInline.length == 0){
									$(this).before('<span class="help-inline">您输入的内容不合法</span>');
								}else{
									helpInline.text('您输入的内容不合法');
								}
								return;
							}
						}

						if(props['data-numbertype'] && props['data-numbertype'] == '整数' && value){
							var clear_value = value;
							if(props['data-unit']){
								var reg_unit = new RegExp(props['data-unit'], 'g');
								clear_value = value.replace(reg_unit, '');
							}
							if(!regExpTest(regexp_str['整数'], clear_value)){
								// 不合法
								var helpInline = $(this).prev();
								if(helpInline.length == 0){
									$(this).before('<span class="help-inline">您输入的内容不合法</span>');
								}else{
									helpInline.text('您输入的内容不合法');
								}
								return;
							}
						}

						if(props['data-numbertype'] && props['data-numbertype'] == '小数' && value){
							var decimalLength = props['data-decimal'];
							// 如果有单位 去掉单位 再判断是否合法
							var clear_value = value;
							if(props['data-unit']){
								var reg_unit = new RegExp(props['data-unit'], 'g');
								clear_value = value.replace(reg_unit, '');
							}
							if(!regExpTest("^-?[1-9]\\d*\\.[0-9]{"+ decimalLength +"}$", clear_value)){
								// 不合法
								var helpInline = $(this).prev();
								if(helpInline.length == 0){
									$(this).before('<span class="help-inline">您输入的内容不合法</span>');
								}else{
									helpInline.text('您输入的内容不合法');
								}
								return;
							}
						}

						if(props['data-min']){
							if(Number(value) < Number(props['data-min'])){
								// 不合法
								var helpInline = $(this).prev();
								if(helpInline.length == 0){
									$(this).before('<span class="help-inline">您输入的内容不合法</span>');
								}else{
									helpInline.text('您输入的内容不合法');
								}
								return;
							}
						}

						if(props['data-max']){
							if(Number(value) > Number(props['data-max'])){
								// 不合法
								var helpInline = $(this).prev();
								if(helpInline.length == 0){
									$(this).before('<span class="help-inline">您输入的内容不合法</span>');
								}else{
									helpInline.text('您输入的内容不合法');
								}
								return;
							}
						}

						// 合法
						var helpInline = $(this).prev();
						if(helpInline && helpInline.hasClass('help-inline')){
							helpInline.remove();
						}

						if(props['data-unit'] && value != '' ){
							var reg_unit = new RegExp(props['data-unit'], 'g');
							$(this).val(value.replace(reg_unit, '') + props['data-unit']);
						}
					});

					$delegationEle.on('focus'+'.'+events_main_id, '#'+events_main_id, function(){
						var value = $(this).val();
						if(props['data-unit'] && value != '' ){
							var reg_unit = new RegExp(props['data-unit'], 'g');
							$(this).val(value.replace(reg_unit, ''));
						}
					});
					break;
					
				case '图片':
					$delegationEle.on('click'+'.'+events_main_id, '#'+events_main_id, function(){
						var $this = $(this);
						var fileInput = $this.parent().find('input[type="file"]');
						if(fileInput.length == 0){
							$this.after('<input class="hide" accept="image/*" type="file" name="file" id="file"/>');
							fileInput = $this.parent().find('input[type="file"]');
						}
						$(fileInput[0]).on('change', function(){
							app.shelter.show();
							var $this_input = $(this);
							$.ajaxFileUpload({
								'fileElementId': $this_input,    //需要上传的文件域的ID，即<input type="file">的ID。
								'url': 'FormFileAction_uploadImg.do', //后台方法的路径
								'type': 'post',   //当要提交自定义参数时，这个参数要设置成post
								'dataType': 'json',   //服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断。
								'secureuri': false,   //是否启用安全提交，默认为false。
								'async' : true,   //是否是异步
								success: function(data) {   //提交成功后自动执行的处理函数，参数data就是服务器返回的数据。
									app.shelter.hide();
									var ul = $this.parent().find('ul.pictrue-list');
									if(ul.length == 0){
										$this.after('<ul class="pictrue-list"></ul>');
										ul = $this.parent().find('ul.pictrue-list');
										$(ul[0]).on('click', '.fa-times', function(){
											$(this).parent().remove();
										});
									}
									$(ul[0]).append('<li data-filename="'+ data.content.result.fileName +'" data-path="'+ data.content.result.path +'" data-size="'+ data.content.result.size +'"><img src="'+ data.content.result.thumbnail +'" alt="" /><i class="fa fa-times"></i></li>');

								},
								error: function(data, status, e) {  //提交失败自动执行的处理函数。
									app.shelter.hide();
									console.error(e);
								}
							});
						});
						$(fileInput[0]).trigger('click');
					});
					break;

				case '附件':
					$delegationEle.on('click'+'.'+events_main_id, '#'+events_main_id, function(){
						var $this = $(this);
						var fileInput = $this.parent().find('input[type="file"]');
						if(fileInput.length == 0){
							$this.after('<input class="hide" type="file" name="file" id="file"/>');
							fileInput = $this.parent().find('input[type="file"]');
						}
						$(fileInput[0]).on('change', function(){
							app.shelter.show();
							var $this_input = $(this);
							$.ajaxFileUpload({
								'fileElementId': $this_input,    //需要上传的文件域的ID，即<input type="file">的ID。
								'url': 'FormFileAction_upload.do', //后台方法的路径
								'type': 'post',   //当要提交自定义参数时，这个参数要设置成post
								'dataType': 'json',   //服务器返回的数据类型。可以为xml,script,json,html。如果不填写，jQuery会自动判断。
								'secureuri': false,   //是否启用安全提交，默认为false。
								'async' : true,   //是否是异步
								success: function(data) {   //提交成功后自动执行的处理函数，参数data就是服务器返回的数据。
									app.shelter.hide();
									var ul = $this.parent().find('ul.file-list');
									if(ul.length == 0){
										$this.after('<ul class="file-list"></ul>');
										ul = $this.parent().find('ul.file-list');
										$(ul[0]).on('click', '.fa-times', function(){
											$(this).parent().parent().remove();
										});
									}
									$(ul[0]).append('<li><span title="文件名称：'+ data.content.result.fileName +'">'+ data.content.result.fileName +'</span><span title="文件路径：'+ data.content.result.path +'">'+ data.content.result.path +'</span><span>'+ data.content.result.size +'</span><span><i class="fa fa-times"></i></span></li>')
								},
								error: function(data, status, e) {  //提交失败自动执行的处理函数。
									app.shelter.hide();
									console.error(e);
								}
							});
						});
						$(fileInput[0]).trigger('click');
					});
					break;

				case '级联选择':
					var selects = $delegationEle.find('#'+events_main_id).find('select[id]');
					selects.each(function(index, element){
						$(element).on('change', function(e,defaultValue){
							var this_value = $(this).val();
							selects.each(function(i, e){
								if(i>index){
									$(e).empty();
									if((i-index) == 1 && this_value){
										$.ajax({
											url:'CMDBCommonAction_commonService.do', 
											type:'POST',
											data:{
												'servicename':'cn.com.agree.aim.cmdb.page.service.common._cmdb_dict_manager',
												'method':'dict_query',
												'requestData':JSON.stringify({
													'dictDefEname':this_value
												})
											},
											success: function(data) {
												var options = data.content.ret;
												$(e).empty().append('<option value=""></option>');
												options.forEach(function(item, index){
													$(e).append('<option value="'+item.dictValue+'">'+item.dictValueDesc+'</option>');
												});
												if(defaultValue){
													$(e).val(defaultValue);
												}
											}
										});
									}
								}
							});
						}).on('blur',function(){
							var value = $(this).val();
							if(props['required']){
								if(!regExpTest(regexp_str['必输'], value)){
									// 不合法
									var helpInline = $(this).prev();
									if(helpInline.length == 0){
										$(this).before('<span class="help-inline">不能为空</span>');
									}else{
										helpInline.text('不能为空');
									}
									return;
								}
							}
							// 合法
							var helpInline = $(this).prev();
							if(helpInline && helpInline.hasClass('help-inline')){
								helpInline.remove();
							}
						});
					});
					break;

				case '日期时间':
					if(props['dateformat']){
						var dateformat = props['dateformat'];
					}
					if(props['dateonly']){
						var minView = 'month';
					}
					$delegationEle.find('#'+events_main_id).datetimepicker({
						format: dateformat || 'yyyy-mm-dd hh:ii:00',
						minView: minView || 'hour',
						autoclose: true,
						todayHighlight: true
					}).on('hide'+'.diyform', function(ev){
						$delegationEle.find('#'+events_main_id).trigger('blur');
					});

					$delegationEle.on('blur'+'.'+events_main_id, '#'+events_main_id, function(){
						var value = $(this).val();
						if(props['required']){
							if(!regExpTest(regexp_str['必输'], value)){
								// 不合法
								var helpInline = $(this).prev();
								if(helpInline.length == 0){
									$(this).before('<span class="help-inline">不能为空</span>');
								}else{
									helpInline.text('不能为空');
								}
								return;
							}
						}
						// 合法
						var helpInline = $(this).prev();
						if(helpInline && helpInline.hasClass('help-inline')){
							helpInline.remove();
						}
					});
					break;
				case '多选':
					if(props['required']){
						$delegationEle.on('click'+'.'+events_main_id, '#'+events_main_id, function(e){
							e.stopPropagation();
							var $this = $(this);
							if(props['required']){
								if($(this).find('input[type="checkbox"]:checked').length == 0){
									// 不合法
									var helpInline = $this.find('.help-inline');
									if(helpInline.length == 0){
										$this.prepend('<span class="help-inline">至少勾选一项</span>');
									}else{
										helpInline.text('至少勾选一项');
									}
									return;
								}
							}
							// 合法
							var helpInline = $this.find('.help-inline');
							if(helpInline && helpInline.hasClass('help-inline')){
								helpInline.remove();
							}
						});
					}
					break;

				case '表格':
					$delegationEle.on('click'+'.'+events_main_id, '#'+events_main_id+'>.addBtn', function(e){
						var $form2table = $('<div class="diyform-form2table"></div>');
						var fakeTableThead = $delegationEle.find('#'+events_main_id+' .fake-table-thead');
						var fakeTableTbody = $delegationEle.find('#'+events_main_id+' .fake-table-tbody');
						var tableFormName = $delegationEle.find('#'+events_main_id).attr('data-form-source');
						var $this = $(this);

						$.ajax({
							url: 'FormAction_getAimConfigForm.do',
							type: "POST",
							data: {
								'formName': tableFormName
							},
							success: function(data){
								var result = data.content.result;
								var form_def = result['form_def']?JSON.parse(result.form_def):[];
								var form_layout = result['form_layout']?result['form_layout']:'';
								viewBuilder.build({
									'formDef': form_def,
									'formLayout': form_layout
								}).done(function(html){
									// 渲染表单内容
									$form2table.html(html);
									form_def.forEach(function(item,index){
										BindEvents(item, $form2table, $el);
									});
									$form2table.append('<div class="modal-footer"><button type="button" class="cancelBtn">取消</button><button type="button" class="confirmBtn">完成</button></div>')
									$form2table.on('click', '.confirmBtn', function(){
										var tableFormData = app.common.getFormData($('form', $form2table));
										if(tableFormData){
											var rowData = '';
											fakeTableThead.find('span').each(function(index, th){
												var fieldid = $(this).attr('data-fieldid');
												rowData += '<span>'+ tableFormData[fieldid] +'</span>';
											});
											fakeTableTbody.append('<div>'+ rowData +'</div>');
											$form2table.remove();
											$delegationEle.closest('.modal').css('pointer-events', 'auto');
										}else{
											app.alert('表单中有不合法的输入，请修改');
											return;
										}
									});
									$form2table.on('click', '.cancelBtn', function(){
										$form2table.remove();
										$delegationEle.closest('.modal').css('pointer-events', 'auto');
									});
									$('body').append($form2table);
									$delegationEle.closest('.modal').css('pointer-events', 'none');
								})
							}
						});
					});
					$delegationEle.on('click'+'.'+events_main_id, '#'+events_main_id+'>.delBtn', function(e){
						
					});
					$delegationEle.on('click'+'.'+events_main_id, '#'+events_main_id+'>table>tbody>tr', function(e){

					});
					break;
			}
		}

		function switchText2Symbol(compare){
			var symbol = '';
			switch (compare){
				case '大于':
				symbol = '>';
				break;

				case '等于':
				symbol = '==';
				break;

				case '小于':
				symbol = '<';
				break;

				case '不等于':
				symbol = '!=';
				break;

				case '或者':
				symbol = '||';
				break;

				case '且':
				symbol = '&&';
				break;
			}
			return symbol;
		}

		function regExpTest(exp, value){
			var r = new RegExp(exp);
			return r.test(value);
		}

		return {
			'BindEvents': BindEvents
		};
	})
})()