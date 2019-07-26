define(["jquery"], function() {
		return {
			load : function($el, scope, handler) {
				var $ele = $("#userManage-mol",$el);
				var $newBtn = $('#newBtn',$el),//新建
					$updateBtn = $('#updateBtn',$el),//编辑
					$delBtn = $('#DelBtn',$el),//删除
					updateUserName = "";
				var lineObj,
					$selected,
					username,
					option = "";//新增、修改的标识
				var $userTable = $('#userTable',$el).dataTable({
					'bStateSave': false,
					"bAutoWidth": false,//自动宽度
					"ordering": false,
					'searching' : true,
					"bPaginate":true,
				});
				//用户dateTable
				ajaxTable();
				function ajaxTable(){
					$.ajax({
						"type" : "post",
						"url" : "UserAction_getAllUsers.do",
						"dataType" : "json",
						"success" : function (data){
							if(data.status){
								var	tableData = [];
								lineObj=data.content.users;
								$userTable.fnClearTable();
				 				if(lineObj.length > 0){
									var index = 1;
									for(var i=0;i<lineObj.length;i++){
										var tempLine= [];
										tempLine[0] = index++;
										tempLine[1] = lineObj[i].username || "";
										tempLine[2] = lineObj[i].nickname || "";
										tempLine[3] = lineObj[i].telephone || '';
										tempLine[4] = lineObj[i].mail || '';
										tempLine[5] = lineObj[i].createUser || "";
										tempLine[6] = lineObj[i].createTime || "";
										tempLine[7] = '<button type="button">重置</button>';
										tableData.push(tempLine);
									}
									$userTable.fnAddData(tableData);
									getTreeTable();
								}
							}else{
								showError(data.errorMsg);
							}
						}
					});
				}
				function getTreeTable(){
					$("#userTable tbody").unbind('click');
					$("#userTable tbody").on("click", "tr", function() {
						$(".selected").not(this).removeClass("selected");
						$(this).toggleClass("selected");
						
						$selected = $('tr.selected',$('#userTable',$el));
						if($selected.length > 0){
							updateUserName = $("td:nth-child(2)",$(this)).html();
							$updateBtn.removeClass('disabled');
							$delBtn.removeClass('disabled');
							username = $('td:eq(1)',$selected).text();
						}else{
							$updateBtn.addClass('disabled');
							$delBtn.addClass('disabled');
						}
					}).on("click", "button", function() {
						app.confirmDialog({
							sTitle:"请确认", 
			                sType:"normal", 
			                sContent:'是否重置密码', 
			                sBtnConfirm: '确定',  
			                sBtnCancel: '取消', 
			                fnConfirmHandler: function($this){
			                	var param = lineObj[$('td:eq(0)',$this.closest('tr')).text()-1];
			                	ajaxDeal(param,'UserAction_resetPassword.do')
			                	.done(function(data){
			                		app.alert("重置密码成功！");
			                		ajaxTable();
			                	});
			                }, 
			                fnCancelHandler: function(){},  
			                aArgs: [$(this)]  
						})
					});
				}
				/* 模态框相关操作 */
				 $(function(){
					/* 新增用户 */
					$newBtn.click(function(){
						$("#userManage-mol h3",$el).html("新增用户");
						$("#userManage-mol", $el).modal('show');
						option = 'save';
						$("#userManage-mol #username",$el).attr('disabled',false);
						$('#password', $el).attr('placeholder', '888888').attr('readonly', 'readonly');
						$('#createTime',$el).val(getNowDate());
					});
					//修改用户
					$updateBtn.on('click',function(){
						if(!$(this).hasClass('disabled')){
							$("#userManage-mol h3",$el).html("修改用户");
							$("#passAre",$el).addClass("hide");
							$("#userManage-mol", $el).modal('show');
							option = 'update';
							$("#userManage-mol #username",$el).val(updateUserName).attr('disabled',true);
							$('#password', $el).attr('placeholder', '').removeAttr('readonly');
							putData($('td:eq(0)',$selected).text());
						}
					});
					//删除用户
					$delBtn.on('click',function(){
						if(!$(this).hasClass('disabled')){
							app.confirmDialog({
								sTitle:"请确认",
								sType:"search",
								sContent:'是否确认删除该用户？',
								sBtnConfirm: '确定',  //确认按钮显示内容
				                sBtnCancel: '取消',  //取消按钮显示内容
				                fnConfirmHandler : function(){
									ajaxDeal({username : username},"UserAction_deleteUser.do")
									.done(function(data){
						                app.common.sendlogHistory("删除：用户名【"+username+"】");
										app.alert("用户删除成功！");
		    							ajaxTable();
		    							$updateBtn.addClass('disabled');
		    							$delBtn.addClass('disabled');
									});
								},
								context:$('body')[0],
							});
						}
					});
					$("#close-modal",$ele).click(function(){
						$("#passAre",$el).removeClass("hide");
						/**** 清空表单 ***/
        				$("<input type='reset' style='display:none'>").appendTo($("form",$ele)).trigger("click").remove();
					});
					$ele.click(function(e){
						$target = $(e.target);
						if($target.attr('id') != 'buttion_add'){
							$('span.help-inline',$ele).addClass('hide');
						};
					});
					$('#buttion_add', $ele).click(function(){
            			// 表单验证不通过，则不提交
            			if(!validateData($ele)){
            				return;
            			}
            			var url = '',
            				param = {
    								username : $.trim($("#userManage-mol #username").val()),
    								password : $.trim($('#password',$ele).val()),
    								nickname : $.trim($('#nickname',$ele).val()),
    								telephone : $.trim($('#telephone',$ele).val()),
    								mail : $.trim($('#mail',$ele).val()),
    								createUser : $.trim($('#createuser',$ele).val()),
    								createTime : $.trim($('#createTime',$ele).val()),
        						};
            			if(option == 'save'){
            				//检查用户名是否重复
                			if(!checkUsername($ele)){
                				app.alert("用户名重复!")
                				return;
                			}
            				param.password = '888888';
    						url = 'UserAction_addUser.do';
    					}else if(option == 'update'){
    						url = 'UserAction_updateUser.do';
    						param['oldname'] = username;
    					}
						ajaxDeal(param,url)
						.done(function(data){
							if(option == 'update'){
						       app.common.sendlogHistory("修改：用户名【"+param.username+"】，昵称【"+param.nickname+"】，添加人【"+param.createUser+"】");
							}
							else{
						       app.common.sendlogHistory("新增：用户名【"+param.username+"】，昵称【"+param.nickname+"】，添加人【"+param.createUser+"】");
							}
							app.alert("操作成功！");
							/**** 清空表单 ***/
	        				$("<input type='reset' style='display:none'>").appendTo($("form",$ele)).trigger("click").remove();
							$ele.modal('hide');// 关闭表单
							//context.hide();//关闭表单
							$updateBtn.addClass('disabled');
							$delBtn.addClass('disabled');
							ajaxTable();
						});
        			});
        			$('#buttion_cancel', $ele).click(function(){
        				$("#passAre",$el).removeClass("hide");
        				$ele.modal('hide');
        				/**** 清空表单 ***/
        				$("<input type='reset' style='display:none'>").appendTo($("form",$ele)).trigger("click").remove();
        				
        			});
            			
            			
					
				 })
				/* 模态框完 */
				//body内点击事件，去掉提示框
				function onBodyDown(event) {
					$(".help-inline:not(.hide)").addClass('hide');
					if (!(event.target.id == "menu_pname" || event.target.id == "menudiv_tree" || $(event.target).parents("#menudiv_tree").length>0)) {
						$("#menudiv_tree",$el).fadeOut("fast");
						$("body").unbind("click", onBodyDown);
					}
				}
				//文本框赋值
				function putData(index){
					var menuData = lineObj[index - 1];
					for(var i in menuData){
						$('#' + i,$el).val(menuData[i]);					
					}
					$('#password',$ele).val('');
				}
				//数据验证
				function validateData(context){
					var mail = $('#mail',$ele).val(),
						password = $('#password',$ele).val();
					var data = [{
						"id": "username",
						"filter": {
							"minLen" : 1,
							'maxLen' : 15,
						},
					},{
						"id": "nickname",
						"filter": {
							"require": true,
							'maxLen' : 50,
						},
					},{
						"id": "mail",
						"filter": {
							'type' : "email",
							'maxLen' : 50,
						},
					},{
						"id": "telephone",
						"filter": {
							"type":"mobile",
							'maxLen' : 20,
						},
					}];
					//如果填密码，则校验
					if($.trim(password) != ''){
						data.push({
							"id": "password",
							"filter": {
								"minLen" : 6,
								'maxLen' : 30,
							},
						});
					}
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
				//检查用户名重复
				function checkUsername($ele){
					var name = $('#username', $ele).val();
					for(var i in lineObj){
						if(lineObj[i].username == name){
							return false;
						}
					}
					return true;
				}
				//菜单新增、修改、删除
				function ajaxDeal(param,url){
					var dtd = $.Deferred();
					app.shelter.show("请等待...");
					$.ajax({
						"type" : "post",
						"url" : url,
						"dataType" : "json",
						"data" : param,
						"success" : function (data){
							app.shelter.hide();
							if(data.status){
								dtd.resolve(data.content.list);
							}else{
								showError(data.errorMsg);
							}
						}
					});
					return dtd;
				}
				//显示错误消息
				function showError(errorMsg){
					app.alert('title',errorMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
				}
				//获取当前日期
				function getNowDate(){
					var nowDate = new Date();
					var month = putZero(nowDate.getMonth() + 1),
						day = putZero(nowDate.getDate()),
						hour = putZero(nowDate.getHours()),
						min = putZero(nowDate.getMinutes()),
						sec = putZero(nowDate.getSeconds());
					return nowDate.getFullYear() + '-' + month + '-' + day + '  ' +
							hour + ':' + min + ':' + sec;
				}
				function putZero(num){
					return num < 10 ? '0' + num : num;
				}
			},

			unload : function(handler) {
			},

			pause : function($el, scope, handler) {
			},

			resume : function($el, scope, handler) {
			}
		};
	});