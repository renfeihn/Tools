define(["jquery"], function() {
		return {
			load : function($el, scope, handler) {
				
				var $resetBtn = $("#resetBtn",$el);
				var userName = null;
				
				var $resetPassword = $('#resetPassword',$el).dataTable({
					'bStateSave': false,
					"bAutoWidth": false,//自动宽度
					"ordering": false,
					'searching' : true,
					"bPaginate":true,
				});	
				
				(function ajaxTable(){
					$.ajax({
						"type" : "post",
						"url" : "UserAction_getAllUsers.do",
						"dataType" : "json",
						"success" : function (data){
							if(data.status){
								var	tableData = [];
								lineObj=data.content.users;
								$resetPassword.fnClearTable();
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
										tableData.push(tempLine);
									}
									$resetPassword.fnAddData(tableData);
									getTreeTable();
								}
							}else{
								app.alert('title',errorMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
							}
						}
					});
				})();
				
				function getTreeTable(){
					$("#resetPassword tbody").unbind('click');
					$("#resetPassword tbody").on("click", "tr", function() {
						$(".selected").not(this).removeClass("selected");
						$(this).toggleClass("selected");
						
						$selected = $('tr.selected',$('#resetPassword',$el));
						if($selected.length > 0){
							$resetBtn.removeClass('disabled');
							$resetBtn.attr('disabled',false);
							userName = $('td:eq(1)',$selected).text();
						}else{
							$resetBtn.attr('disabled',true);
							$resetBtn.addClass('disabled');
						}
					});
				}
				
				$resetBtn.on("click",function(){
					app.confirmDialog({//提示框组件
						sTitle:"是否重置密码",  //确认框标题         
		                sType:"normal",  //模块类型，有normal，success，search，warn，error,默认为normal常规
		                sContent:'点击确认后，密码将会重置为初始默认密码！默认密码888888',  //确认框内容，非必填
		                sBtnConfirm: '确定',  //确认按钮显示内容
		                sBtnCancel: '取消',  //却笑按钮显示内容
		                fnConfirmHandler: resetPassword,
		                fnCancelHandler: function(){app.alert("取消" + arguments[0])},  //点击取消按钮触发回调函数，参数写在args那里
		                aArgs: ['密码重置']                     //确认、取消触发函数的参数，以数组形式书写
					})
				})
				
				function resetPassword(){
					$.ajax({
						"type" : "post",
						"url" : "UserAction_resetPwd.do",
						"dataType" : "json",
						"data":{
							username:userName
						},
						"success" : function (data){
							if(data.status){
								app.alert("密码重置成功！")
							}	
						}
					});
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