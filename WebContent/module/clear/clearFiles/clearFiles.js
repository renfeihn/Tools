define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {

			var $templateForm = $('#formTemplate', $el).clone().removeAttr("id");// 表单
			var $container = $('.clear-file-container', $el);// 容器
			var $addBtn = $('#add_new_item_button', $el);// 新增按钮
			var $emptyTip = $('<h3 class="text-center">暂无策略</h3>');

			$('#formTemplate', $el).remove();

			app.common.ajaxWithAfa({
				url: "DataCleanAction_getDataCleanByDataType.do",
				data: {
					"dataType": 2
				},
			}).done(function(content) {
				if(content.result && content.result.length > 0){
					content.result.forEach(function(item, index){
						var newForm = $templateForm.clone();
						$container.append(newForm);
						newForm.attr("data-id", item.id);
						$('#cleanName', newForm).val(item.cleanName);
						$('#bakType', newForm).val(item.bakType).trigger("change");
						$('#packType', newForm).val(item.packType);
						$('#bakDir', newForm).val(item.bakDir);
						$('#transType', newForm).val(item.transType);
						$('#address', newForm).val(item.address);
						$('#userName', newForm).val(item.userName);
						$('#passwd', newForm).val(item.passwd);
						$('#save', newForm).addClass("hide");
					})
				}else if(content.result.length == 0){
					$container.html($emptyTip);
				}
			});

			// 新增
			$addBtn.on('click', function(){
				$emptyTip.remove();
				var $newForm = $templateForm.clone().addClass("editing");
				$container.append($newForm);
				$newForm.find('#edit').addClass('hide');
				$newForm.on('click', '#delete', function(){
					if($newForm.attr("data-id")){
						return;
					}
					$newForm.remove();
					if($container.find('form').length == 0){
						$container.html($emptyTip);
					}
				}).on('click', '#save', function(){
					if(validate($newForm) && !$newForm.attr("data-id")){
						var inputs = $newForm.find('.control-group:not(.hide)').find('select,input');
						var sendData = {
							"dataType": 2
						};
						inputs.each(function(){
							sendData[$(this).attr('id')] = $(this).val();
						})
						app.common.ajaxWithAfa({
							url: "DataCleanAction_addDataClean.do",
							data: {
								"dataCleanStr": JSON.stringify(sendData)
							},
						}).done(function(content) {
							if(content.result){
								app.alert("保存成功");
								// 加上后台返回的id
								$newForm.attr("data-id", content.result);
								$newForm.removeClass("editing");
								$newForm.find("#save").addClass("hide");
								$newForm.find("#edit").removeClass("hide");
							}else{
								app.alert("保存失败");
							}
						});
					}

				})

			})

			function validate($newForm){
				var inputs = $newForm.find('.control-group:not(.hide)').find('input[required]');
				var flag = true;
				for(let i=0; i<inputs.length; i++){
					if($(inputs[i]).val() == ''){
						flag = false;
						if(!$(inputs[i]).next().hasClass('help-inline')){
							$(inputs[i]).after('<span class="help-inline">不能为空</span>')
						}
					}else{
						if($(inputs[i]).next().hasClass('help-inline')){
							$(inputs[i]).next().remove();
						}
					}
				}
				return flag;
			}

			// 表单公共事件
			$container.on('change', '#bakType', function(){
				if(this.value == "1"){
					$(this).closest("form").find("#transType").closest(".control-group").addClass('hide');
					$(this).closest("form").find("#address").closest(".control-group").addClass('hide');
					$(this).closest("form").find("#userName").closest(".control-group").addClass('hide');
					$(this).closest("form").find("#passwd").closest(".control-group").addClass('hide');
				}else{
					$(this).closest("form").find("#transType").closest(".control-group").removeClass('hide');
					$(this).closest("form").find("#address").closest(".control-group").removeClass('hide');
					$(this).closest("form").find("#userName").closest(".control-group").removeClass('hide');
					$(this).closest("form").find("#passwd").closest(".control-group").removeClass('hide');
				}
			}).on('click', '#delete', function(){
				var $thisForm = $(this).closest("form");
				var id = $thisForm.attr("data-id");
				if(!id){
					return;
				}
				app.confirmDialog({//提示框组件
					sTitle:"请确认",  //确认框标题         
	                sType:"search",  //模块类型，有normal，success，search，warn，error,默认为normal常规
	                sContent:'您确定要删除该记录吗？',  //确认框内容，非必填
	                sBtnConfirm: '确定',  //确认按钮显示内容
	                sBtnCancel: '取消',  //却笑按钮显示内容
	                fnConfirmHandler: function(){
	                	app.common.ajaxWithAfa({
							url: "DataCleanAction_delDataClean.do",
							data: {
								"id": id
							},
						}).done(function(content) {
							if(content.result){
								app.alert("删除成功");
								$thisForm.remove();
								if($container.find('form').length == 0){
									$container.html($emptyTip);
								}
							}else{
								app.alert("删除失败");
							}
						});
	                }
				})
			}).on('click', '#edit', function(){
				var $thisForm = $(this).closest("form");
				var id = $thisForm.attr("data-id");
				if(!id){
					return;
				}
				$thisForm.addClass("editing");
				$thisForm.find("#edit").addClass("hide");
				$thisForm.find("#save").removeClass("hide");
			}).on('click', '#save', function(){
				var $thisForm = $(this).closest("form");
				var id = $thisForm.attr("data-id");
				if(!id){
					return;
				}
				if(validate($thisForm)){
					var inputs = $thisForm.find('.control-group:not(.hide)').find('select,input');
					var sendData = {
						"dataType": 2,
						"id": id
					};
					inputs.each(function(){
						sendData[$(this).attr('id')] = $(this).val();
					})
					app.common.ajaxWithAfa({
						url: "DataCleanAction_updataDataClean.do",
						data: {
							"dataCleanStr": JSON.stringify(sendData)
						},
					}).done(function(content) {
						if(content.result){
							app.alert("保存成功");
							$thisForm.removeClass("editing");
							$thisForm.find("#save").addClass("hide");
							$thisForm.find("#edit").removeClass("hide");
						}else{
							app.alert("保存失败");
						}
					});
				}
			}).on('blur', '#address', function(){
				var reg = eval($(this).attr("data-reg"));
				if(this.value){
					if(!reg.test(this.value)){
						if($(this).next().hasClass("help-inline")){
							$(this).next().html("您的输入不合法");
						}else{
							$(this).after('<span class="help-inline">您的输入不合法</span>')
						}
					}else if(reg.test(this.value)){
						if($(this).next().hasClass("help-inline")){
							$(this).next().remove();
						}
					}
				}else{
					if($(this).next().hasClass("help-inline")){
						$(this).next().html("不能为空");
					}else{
						$(this).after('<span class="help-inline">不能为空</span>')
					}
				}
			}).on('blur', 'input[required]:not(#address)', function(){
				if(this.value == ''){
					if($(this).next().hasClass("help-inline")){
						$(this).next().html("不能为空");
					}else{
						$(this).after('<span class="help-inline">不能为空</span>')
					}
				}else {
					if($(this).next().hasClass("help-inline")){
						$(this).next().remove();
					}
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