define([],function(){
	return {
		load:function($el,scope,handler){
			console.log(scope);
			let $modalFrom = $('#modalForm',$el); 
			let judge;
			
			if(scope.flag == 'add'){
				$('.operate-wrap',$el).addClass('hide');
				judge = true;
			}else if(scope.flag == 'check'){
				judge = false;
				$('.operate-wrap',$el).removeClass('hide');
				$('.btn-wrap',$el).addClass('hide');
				$('input,select',$modalFrom).attr('disabled',true);
				renderForm(scope.info);
			}
			
			
			bindEvents();
			function bindEvents() {
				//激活编辑
				$('.editBtn',$el).on('click',function(e){
					e.stopPropagation();
					$('input,select',$modalFrom).removeAttr('disabled');
					$('.btn-wrap',$el).removeClass('hide');
				});
				
				//取消
				$('.cancelBtn',$el).on('click',function(){
					$('#agentSlider').removeClass('active');
				});

				//根据iP获取主机名和操作系统
				$("#ip", $el).on("change", function() {
					var ip = $.trim($(this).val());
					app.common.ajaxWithAfa({
						url: "AgentManagerAction_checkAgentAndGetServerByIp.do",
						data: {
							ip: ip,
						}
					}).done(function(data) {
						var result = data.result;
						if(result.flag) {
							if(result.server) {
								$("#host_name", $el).val(result.server.serverName);
								$("#os_type", $el).val(result.server.model);
								if("otherIp" in result.server){
									$("#install_user", $el).val(result.server.otherIp);
									$("#agent_user_pwd", $el).val(result.server.wwpn);
								}else{
									app.alert("在“资源管理”中配置代理后，可根据IP自动回显【代理安装用户】和【密码】");
								}
								$modal.attr('objectId', result.server.objectId);
							} else {
								app.alert(result.msg);
							}
						} else {
							app.alert(result.msg)
						}

					});
				});
				
				
				$(".confirmBtn", $el).on("click", function(e) {
					e.stopPropagation();
					var params = app.common.serializeObject($modalFrom);
					params.id = $modalFrom.attr('objectId')|| params.id;
					if(validate()) {
						if(judge) {
							saveToAdd(params);
						} else {
							saveToEdit(params);
						}
					}
				});
				
			}
			
			function renderForm(data) {
				for(let i in data){
					$('[name="'+i+'"]',$el).val(data[i]);
				}
			}
			
			
			// 表单数据验证
			function validate() {
				var validateResult = app.validate.validate({
					$context: $modalFrom,
					data: [{
						"id": "ip",
						"filter": {
							"require": true
						},
					}, {
						"id": "os_type",
						"filter": {
							"require": true
						},
					}, {
						"id": "host_name",
						"filter": {
							"require": true,
						},
					}, {
						"id": "install_user",
						"filter": {
							"require": true
						},
					}, {
						"id": "agent_user_pwd",
						"filter": {
							"require": true,
						},
					}, {
						"id": "protocol",
						"filter": {
							"require": true
						},
					}, {
						"id": "port",
						"filter": {
							"require": true
						},
					}],
					correctCallback: function($ele, correctMsg) {
						$ele.next().next().addClass('hide');
					},
					errorCallback: function($ele, errMsg) {
						$ele.next().next().removeClass('hide').text(errMsg);
					}
				});
				return validateResult.bResult;
			}
			
			//新增的提交
			function saveToAdd(params) {
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_saveAgent.do",
					data: {
						dataStr: JSON.stringify(params)
					}
				}).done(function(data) {
					app.alert("增加成功");
				});

			}

			//修改的提交
			function saveToEdit(params) {
				var sendJson = {
					protocol: params.protocol,
					port: params.port,
					agent_user_pwd: params.agent_user_pwd,
					install_user: params.install_user
				}
				app.common.ajaxWithAfa({
					url: "AgentManagerAction_modifyAgent.do",
					data: {
						dataStr: JSON.stringify(sendJson),
						ip: params.ip
					}
				}).done(function(data) {
					app.alert("修改成功");
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