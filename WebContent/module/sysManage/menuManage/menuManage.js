define(["jquery"], function() {
		return {
			load : function($el, scope, handler) {
				var username;
				var $userRoleTable = $('#userRoleTable',$el).dataTable({
					'bStateSave': false,
					"bAutoWidth": false,//自动宽度
					"ordering": false,
					'searching' : true,
					"bPaginate": false,
					
					'aoColumnDefs' : [
						{
		                    "render": function(data, type, row, meta) {
		                        if(data == 1){
		                        	return '已分配';
		                        }else if(data == 0){
		                        	return '未分配';
		                        }else{
		                        	return '';
		                        }
		                    },
		                    "targets": 3
						},
					],
				});
				//dateTable
				ajaxTable();
				function ajaxTable(){
					$.ajax({
						"type" : "post",
						"url" : "RoleUserAction_getUserAndRoles.do",
						"dataType" : "json",
						"success" : function (data){
							if(data.status){
								var	tableData = [];
								queryData=data.content.roles;
								$userRoleTable.fnClearTable();
								if(queryData.length > 0){
									var index = 1;
									for(var i=0;i<queryData.length;i++){
										var tempLine= [],
											singleData = queryData[i],
											user = singleData[0],
											count = singleData[1];
										tempLine[0] = index++;
										tempLine[1] = user.username || "";
										tempLine[2] = user.nickname || "";
//										tempLine[3] = user.mail || "";
										tempLine[3] = count;
										tableData.push(tempLine);
									}
									$userRoleTable.fnAddData(tableData);
								}
							}else{
								showError(data.errorMsg);
							}
						}
					});
					$.ajax({
						"type" : "post",
						"url" : "RoleManageAction_getAllRoleUsed.do",
						"dataType" : "json",
						"success" : function (data){
							if(data.status){
								var rolesData = data.content.list;
								getTreeTable(rolesData);
							}else{
								showError(data.errorMsg);
							}
						}
					});
				}
				function getTreeTable(rolesData){
					$("#userRoleTable tbody",$el).unbind('click');
					$("#userRoleTable tbody",$el).on("click", "tr", function() {
						$(".selected").not(this).removeClass("selected");
						$(this).addClass("selected");
						$('#buttion_add',$el).removeClass('disabled');
						$("#selecting_div",$el).children().remove();
						$("#selected_div",$el).children().remove();
						
						username = $('td:eq(1)',$(this)).text();
						if(!username){
							return;
						}
						getUserRolesId()
						.done(function(data){
							for(var i = 0; i < rolesData.length; i++){
								var flag = false,
									role = rolesData[i];
								for(var j = 0; j < data.length; j++){
									if(data[j].rid == role.rid ){
										flag = true;
										continue;
									}
								}
								if(flag){
									var tid = $(this).attr('data-main');
									var thisId = "";
									var Temp2 = '<div class="yixuanze" role-name="'+role.name+'" role-id="'+role.rid+'"><span>'+role.name+
												'<img class="jian" src="img/workList/jian.png" /></span></div>';
									$("#selected_div",$el).append(Temp2);
								}else{
									var Temp = '<div class="lis" role-name="'+role.name+'" role-id="'+role.rid+'"><div class="daixuanze">'+
												'<span><img class="jia" src="img/workList/jia.png" />'+
												role.name+'</span></div></div>';
									$("#selecting_div",$el).append(Temp);
								}
								
							}
						});
					});
				}
				function getUserRolesId(){
					var dtd = $.Deferred();
					$.ajax({
						"type" : "post",
						"url" : "RoleUserAction_getRolesByUsername.do",
						"dataType" : "json",
						"data" : {
							username : username,
						},
						"success" : function (data){
							if(data.status){
								dtd.resolve(data.content.list);
							}else{
								showError(data.errorMsg);
							}
						}
					});
					return dtd;
				}
				//列表中移除角色
				$("#selected_div",$el).delegate(".yixuanze","click",function(){
					var rid = $(this).attr('role-id');
					var rname = $(this).find('span').text();
					var Temp = '<div class="lis" role-name="'+rname+'" role-id="'+rid+'"><div class="daixuanze"><span><img class="jia" src="img/workList/jia.png" />'+rname+'</span></div></div>';
					$("#selecting_div",$el).append(Temp);
					$(this).remove();
				});
				//列表中添加角色
				$("#selecting_div",$el).delegate(".lis",'click',function(){
					//判断能否新增数据到被选中的列表行中去
					 var rid = $(this).attr('role-id');
					 var rname = $(this).find('span').text();
					 var Temp2 = '<div role-id="'+rid+'" role-name="'+rname+'" class="yixuanze"><span>'+rname+'<img class="jian" src="img/workList/jian.png" /></span></div>';
					 $("#selected_div",$el).append(Temp2);
					 $(this).remove();
				});
				$('#buttion_add', $el).click(function(){
					if(!$(this).hasClass('disabled')){
						var roleIds = "";
						var roleNames="";
						$("#selected_div",$el).children().each(function(){
							roleIds += $(this).attr('role-id') + ',';
							roleNames += $(this).attr('role-name') + ',';
						});
						var url = 'RoleUserAction_reDistribute.do';
						roleIds = roleIds.substring(0,roleIds.length - 1);
						roleNames = roleNames.substring(0,roleNames.length - 1);
						param = {
								ids : roleIds,
								name : username,
							};
						ajaxDeal(param,url)
						.done(function(data){
						    app.common.sendlogHistory("分配：用户名【"+username+"】，角色名【"+roleNames+"】");
							app.alert("操作成功！");
							ajaxTable();
							$("#selecting_div",$el).children().remove();
							$("#selected_div",$el).children().remove();
						});
						$('#buttion_add', $el).addClass('disabled');
						$("#userRoleTable>tbody>tr",$el).removeClass('selected');
					}
    			});
				function ajaxDeal(param,url){
					var dtd = $.Deferred();
					$.ajax({
						"type" : "post",
						"url" : url,
						"dataType" : "json",
						"shelter" : "正在处理，请稍后",
						"data" : param,
						"success" : function (data){
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
			},

			unload : function(handler) {
			},

			pause : function($el, scope, handler) {
			},

			resume : function($el, scope, handler) {
			}
		};
	});