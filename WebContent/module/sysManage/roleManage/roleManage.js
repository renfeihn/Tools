define(["jquery"], function() {
		return {
			load : function($el, scope, handler) {
				var roleNameSet;
				var changeVal='0';
				var $ele = $("#roleManage-mol",$el);
				var $newBtn = $('#newBtn',$el),//新建
					$updateBtn = $('#updateBtn',$el),//编辑
					$delBtn = $('#DelBtn',$el),//删除
					$privBtn = $('#PrivBtn',$el),//权限维护
					$SysBtn = $('#SysBtn',$el),//应用详情
					$selCul = $("#selectedColumnUl", $el);
				var queryData,
					option = "";//新增、修改的标识
				var rid,
				    rname,
				    roleName,
					tableData,
					roleId;
				var $treeTable = $('#treeTable',$el),
					$tableBody = $('#treeTable>tbody',$el),
					$clickNode;
				var $roleTable=$('#roleTable',$el).dataTable({
					'bStateSave': false,
					"bAutoWidth": false,//自动宽度
					"ordering": false,
					'searching' : true,
					"bPaginate":true,
					'aoColumnDefs' : [
							{
						      "render": function(data, type, row, meta) {
						               if(data == '1'){
						                    return '已启用';
						                    }else{
						                    return '未启用';
						                        }
						                 },
						                    "targets": 4
							},
							{
								"render": function(data, type, row, meta) {
						               if(data == '1'){
						                    return "<div class='privilege_add'>已添加<div>";
						                    
						                    }else{
						                    return "<div class='privilege_notadd'>未添加<div>";
						         
						                        }
						                 },
						                    "targets": 5
							}
							],
				});
				
				$("#name, #descp", $el).on('keydown', function (e) {
					let text = $(this).val();
					let id = $(this).attr('id');
					if (id === 'name') {
						if (text.length > 64) {
							$(this).val(text.substring(0,64));
						}
					}
					if (id === 'descp') {
						if (text.length > 100) {
							$(this).val(text.substring(0,100));
						}
					}
				})

				ajaxRoleTable();
				function ajaxRoleTable(){
					$.ajax({
						"type" : "post",
						"url" : "RoleManageAction_getAllRole.do",
						"dataType" : "json",
						"success" : function (data){
							if(data.status){
								var	tableData = [];
								roleNameSet = new Set();// 修改名称判重使用的集合
								queryData = data.content.list;
								$roleTable.fnClearTable();
								if(queryData.length > 0){
									var index = 1;
									for(var i = 0; i < queryData.length; i++){
										var singleData = queryData[i],
											row = [];
										//处理日期
										var date = singleData.createTime;
										if(!date || $.isEmptyObject(date)){
											date = "";
										}else{
											date = new Date(date).Format("yyyy-MM-dd hh:mm:ss");
										}
										row[0] = index++;
										row[1] = singleData.rid;
										row[2] = singleData.name;
										row[3] = singleData.descp;
										row[4] = singleData.state;
										row[5] = singleData.status;
										row[6] = singleData.createUser;
										row[7] = date;
										tableData.push(row);
										roleNameSet.add(singleData.name);
									}
									$roleTable.fnAddData(tableData);
									getRoleTable();
								}
							}else{
								showError(data.errorMsg);
							}
						}
					});
				}
				
				
				function getRoleTable(){
					roleName = $roleTable.api().column(2).data();
					$("#roleTable tbody", $el).unbind('click');
					$("#roleTable tbody", $el).on("click", "tr", function() {
						$(".selected", $el).not(this).removeClass("selected");
						$(this).toggleClass("selected");
						
						$selected = $('tr.selected',$('#roleTable',$el));
						if($selected.length > 0){
							$updateBtn.removeClass('disabled');
							$delBtn.removeClass('disabled');
							$privBtn.removeClass('disabled');
							$SysBtn.removeClass('disabled');
							rid = queryData[$('td:eq(0)',$selected).text() - 1].rid;
							rname = queryData[$('td:eq(0)',$selected).text() - 1].name;
						}else{
							$updateBtn.addClass('disabled');
							$delBtn.addClass('disabled');
							$privBtn.addClass('disabled');
							$SysBtn.addClass('disabled');
						}
					});
				}
				
				//表格树勾选事件
				$('#treeTable', $el).delegate('i','click',function(e){
					var $this = $(this),
						$tr = $this.closest('tr'),
						cls = $this.hasClass('checked_i') ? 'fa fa-circle-thin' : 'fa fa-check-circle checked_i';
					$clickNode = $this;
					$this.removeClass().addClass(cls);
					
					changeChildClass($tr);
					if($tr.attr('data-tt-parent-id') != changeVal)
						changeParentClass($tr);
					
					if(!$('#treeTable i', $el).hasClass('checked_i')){
						$("#selectAll", $el).text('全选');
					}
					bindEvent();
				});
				//递归修改父节点
				function changeParentClass($node){
					var pid = $node.attr('data-tt-parent-id'),
						$bro = $treeTable.find('tr[data-tt-parent-id='+pid+']'),
						lenc = $('i.fa.fa-check-circle.checked_i',$bro).length,//当前层级选中数
						lenUn = $('i.fa.fa-circle-thin',$bro).length,//当前层级未选中数
						len = $bro.length,//当前层级元素个数
						pclass;
					var $parent = $node.prevAll('tr[data-tt-id='+pid+']');
					if(lenUn == len){
						pclass = 'fa fa-circle-thin';
					}else if(lenc == len){
						pclass = 'fa fa-check-circle checked_i';
					}else{
						pclass = 'fa fa-dot-circle-o';
					}
					$('i',$parent).removeClass().addClass(pclass);
					if($parent.attr('data-tt-parent-id') == changeVal) return;
					changeParentClass($parent);
				}
				//递归修改子节点
				function changeChildClass($node){
					var id = $node.attr('data-tt-id'),
						$child = $treeTable.find('tr[data-tt-parent-id='+id+']');
					if(!$child) return;
					
					$('i',$child).removeClass().addClass($clickNode.attr('class'));
					$child.each(function(){
						changeChildClass($(this));
					});
				}
				// 添加配置项弹框
				$('#PrivBtn',$el).click(function (){
					changeVal = '1';
					$treeTable.treetable('destroy');
					$tableBody.children().remove();
	                $("#selectAll", $el).text('全选');
	                 $("#div1 span",$el).text("所有权限");
	                $("#div2 span",$el).text("已添加权限");  
					if(!$(this).hasClass('disabled')){
					 	$.ajax({
							type : "post",
							url : "ClassifyAction_getAllMenu.do",
							dataType : "json",
							data : {
								roleId : rid
							},
							shelter : '正在加载...',
							success : function(data) {
								if(data.status){
									var ownTrans = data.content.ownList;
									tableData = data.content.lists,
									tableData = app.common.getTreeData({
										data : tableData,
						        		idName : "mid",
						        		pidName : "pregid",
						        		pidVal : "0"
									});
									if(tableData.length > 0){
										var tr = '';
										for(var i = 1; i < tableData.length; i++){
											var row = tableData[i];
											tr += '<tr data-flag="'+(row.menuFlag == '1' ? 'cf' : 'ts')+'" data-tt-id="'+row.mid+'" data-tt-parent-id="'+row.pregid+'">'+
													'<td>' + row.name + '</td>' +
													'<td>' + (row.menuFlag == '1' ? '分类' : '交易') + '</td>' +
													'<td style="text-align: left;">'+
														'<i class="fa fa-circle-thin" style="margin: 0;font-size: 18px;color: #22ac38;"></i></td>' +
												'</tr>';
										}
										$tableBody.append($(tr));
									}
									$treeTable.treetable({ expandable: true ,});
									clickOwnTrans(ownTrans);
									showPercent();
								}else{
									showError(data.errorMsg);
								}
							}
						});
						$('#addPrviModal',$el).modal().find('.close').removeClass('hide');
					}
				});
				
				// 添加
				$('#SysBtn',$el).click(function (){
					changeVal='0';
					$treeTable.treetable('destroy');
					$tableBody.children().remove();
	                $("#selectAll", $el).text('全选');
	                $("#div1 span",$el).text("所有应用");
	                $("#div2 span",$el).text("已添加应用");              
					if(!$(this).hasClass('disabled')){
					 	$.ajax({
							type : "post",
							url : "DataRoleAction_getAllMenu.do",
							dataType : "json",
							data : {
								roleId : rid
							},
							shelter : '正在加载...',
							success : function(data) {
								if(data.status){
									var ownTrans = data.content.ownList;
									tableData = data.content.lists;
									if(tableData.length > 0){
										var tr = '';
										var tjson = [];
										var tbjson = [];
										var d=0,f=0;
										for(var i = 0; i < tableData.length; i++){
											var row = tableData[i];
											if(row.groupId == 0){
												tjson[d++] = row;
											}else{
												tbjson[f++] = row;
											}
										}
										for(var j = 0;j<tjson.length;j++){
											var rowa = tjson[j];
												tr += '<tr data-flag="'+(rowa.menuFlag == '1' ? 'cf' : 'ts')+'" data-tt-id="'+rowa.objectId+'" data-tt-parent-id="'+rowa.groupId+'">'+
														'<td>' + rowa.objectName + '</td>' +
														'<td>' + (rowa.menuFlag == '1' ? '分类' : '应用') + '</td>' +
														'<td style="text-align: left;">'+
														'<i class="fa fa-circle-thin" style="margin: 0;font-size: 18px;color: #22ac38;"></i></td>' +
														'</tr>';
											for(var k = 0;k<tbjson.length;k++){
												var ro = tbjson[k];
												
												if(ro.groupId == j+1){
													tr += '<tr data-flag="'+(ro.menuFlag == '1' ? 'cf' : 'ts')+'" data-tt-id="'+ro.objectId+'" data-tt-parent-id="'+ro.groupId+'">'+
														'<td>' + ro.objectName + '</td>' +
														'<td>' + (ro.menuFlag == '1' ? '分类' : '应用') + '</td>' +
														'<td style="text-align: left;">'+
														'<i class="fa fa-circle-thin" style="margin: 0;font-size: 18px;color: #22ac38;"></i></td>' +
														'</tr>';
												}
											}
										}
//										
										$tableBody.append($(tr));
									}
									$treeTable.treetable({ expandable: true ,});
									clickOwnTransform(ownTrans);
									showPercent();
								}else{
									showError(data.errorMsg);
								}
							}
						});
						$('#addPrviModal',$el).modal().find('.close').removeClass('hide');
					}
				});
				
				
				//加载数据后出发点击事件
				function clickOwnTrans(data){
					$selCul.empty();
					if(!data){
						return;
					}
					for(var i in data){
						var $tr = $("[data-tt-id='"+data[i].mid+"']", $tableBody);
						$('i', $tr).click();
					}
				}
				//应用详情配置
				function clickOwnTransform(data){
					$selCul.empty();
					if(!data){
						return;
					}
					for(var i in data){
						var $tr = $("[data-tt-id='"+data[i].objectId+"']", $tableBody);
						$('i', $tr).click();
					}
				}
				//显示分类下的交易数
				function showPercent(){
					var $cls = $treeTable.find('tr[data-flag=cf]');
					$cls.each(function(){
						var $t = $(this),arr;
						arr = getTransCount($t);
						$('span',$t.children(':last')).remove();
						$t.children(':last').append('<span>'+arr[0]+'/'+arr[1]+'</span>');
					});
				}
				function getTransCount($node){
					var arr = [0,0],
						id = $node.attr('data-tt-id'),
						$child = $node.nextAll('[data-tt-parent-id='+id+']');
					$child.each(function(){
						var arr1 = [0,0];
						if($(this).attr('data-flag') == 'ts'){//当前层级交易数
							arr[1]++;
							if($('i',$(this)).attr('class') == 'fa fa-check-circle checked_i')  arr[0]++;
						}else{//下级交易数
							if($(this).attr('data-flag') == 'cf'){
								arr1 = getTransCount($(this));
							}
						}
						arr[0] += arr1[0];
						arr[1] += arr1[1];
					});
					return arr;
				}
				//勾选后添加交易至右侧
				 function bindEvent(){
					var pathName = '',
					 	 $trans = $treeTable.find('tr[data-flag=ts]'),
					 	 $ckTrans = $('i.fa.fa-check-circle.checked_i',$trans).closest('tr');
					 $selCul.empty();
					 
					$ckTrans.each(function(){
						var $t = $(this),
							id = $t.attr('data-tt-id'),
							name = $t.children(':eq(0)').text(),
							ppath = $t.attr('data-tt-parent-id') == changeVal ? "" : getPathName($t);
							if(changeVal == '1'){
								 $selCul.append('<li id="li_'+ id +'" style="display: flex;border: 1px solid #c7c6cc;margin-bottom: 1px;"><div style="width: 55%;">'+ ppath +'</div>'+
						 	'<div style="width: 40%;border-left:1px solid #ccc;padding-left:10px">'+ name +'</div></li>');
							}else if(changeVal == '0'){
								 $selCul.append('<li id="li_'+ id +'" style="display: flex;border: 1px solid #c7c6cc;margin-bottom: 1px;"><div style="width: 25%;">'+ ppath +'</div>'+
						 	'<div style="width: 70%;border-left:1px solid #ccc;padding-left:10px">'+ name +'</div></li>');
							}
						
					 });
					 showPercent();
				 }
				//路径名称
				function getPathName($node){
					var pid = $node.attr('data-tt-parent-id'),
						$parent = $node.prevAll('tr[data-tt-id='+pid+']'),
						ppath = $parent.children(':eq(0)').text();
					if($parent.attr('data-tt-parent-id') == changeVal){
						return ppath;
					}else{
						return getPathName($parent) + ' > ' + ppath;
					}
				}
				// 全选事件绑定
				$("#selectAll", $el).click(function (){
					var cl;
					if($(this).text() == '全选'){
						cl = 'fa fa-check-circle checked_i';				
						$(this).text('全取消');
					}else{
						cl = 'fa fa-circle-thin';
						$(this).text('全选');
					}
					$('i',$tableBody.children()).removeClass().addClass(cl);
					bindEvent();
				});
				/* 模态框相关操作 */
				 $(function(){
					/* 新增用户 */
					$newBtn.click(function(){
						$("#roleManage-mol h3", $el).html("新增角色");
						$("#roleManage-mol", $el).modal('show');
						option = 'save';
						$('form', $ele)[0].reset();
						$('#createTime', $el).val(getNowDate());
					});
					//修改用户
					$updateBtn.on('click',function(){
						if(!$(this).hasClass('disabled')){
							$("#roleManage-mol h3", $el).html("修改角色");
							$("#roleManage-mol", $el).modal('show');
							option = 'update';
							$('#state', $el).attr('disabled',false);
							putData($('td:eq(0)',$selected).text());
							roleNameSet.delete($('#name', $el).val());
						}
					});
					//删除菜单
					$delBtn.on('click',function(){
						if(!$(this).hasClass('disabled')){
							app.confirmDialog({
								sTitle:'请确认',
								sType:"search",
								sContent:'提示：删除角色后，已拥有该角色的用户将同时删除该角色信息！<br>是否确认删除？',
								sBtnConfirm: '确定',  //确认按钮显示内容
				                sBtnCancel: '取消',  //却笑按钮显示内容
				                fnConfirmHandler: function(){
									ajaxDeal({rid : rid},"RoleManageAction_toDelRole.do")
									.done(function(data){
										app.common.sendlogHistory("删除：角色名【"+rname+"】");
										app.alert("角色删除成功！");
										ajaxRoleTable();
										$('div .btn-group-a',$el).children().not(':first').addClass('disabled');
									});
								},
								context:$('body')[0],
							});
						}
					});
					$ele.click(function(e){
						$target = $(e.target);
						if($target.attr('id') != 'buttion_add'){
							$('span.help-inline',$ele).addClass('hide');
						};
					});
					$('#buttion_add', $ele).click(function(){
						// 表单验证不通过，则不提交
	        			if(!validateData($el)){
	        				return;
	        			}
	        			var url = '',
	        				param = {
								name : $.trim($('#name',$el).val()),
								descp : $.trim($('#descp',$el).val()),
								state : $.trim($('#state',$el).val()),
								createUser : $.trim($('#createUser',$el).val()),
								createTime : $.trim($('#createTime',$el).val()),
							};
	        			if(!checkUsername(param.name) && option == 'save'){
	        				app.alert("请不要设置重复的角色名!")
	        				return
	        			}
	        			if(roleNameSet.has(param.name) && option == 'update' ){
	        				app.alert("请不要设置重复的角色名!")
	        				return
	        			}
						var _rolestate=$('#state option:selected',$el).text();
						if(option == 'save'){
							url = 'RoleManageAction_toSaveRole.do';
						}else if(option == 'update'){
							url = 'RoleManageAction_toEditRole.do';
							param.rid = rid;
						}
						ajaxDeal(param,url)
						.done(function(data){
							if(option == 'update'){
						       app.common.sendlogHistory("修改：角色名【"+param.name+"】，角色状态【"+_rolestate+"】，添加人【"+param.createUser+"】");
							}
							else{
						       app.common.sendlogHistory("新增：角色名【"+param.name+"】，角色状态【"+_rolestate+"】，添加人【"+param.createUser+"】");
							}
							app.alert("操作成功！");
							$ele.modal('hide');// 关闭表单
							ajaxRoleTable();
						});
           			
       			});
       			$('#buttion_cancel', $ele).click(function(){
       				$ele.modal('hide');
       			});
           		})
           		
           		$("#name",$el).on("blur",function(){
           			var nameVal = $(this).val();
           			var scName = stripscript($.trim(nameVal));
           			if(scName.flag){
           				app.alert("角色名含有特殊字符,不建议使用，系统已过滤掉特殊字符！");
           				$(this).val(scName.rs)
           			}
           		})
				 ///////////////////////////////////////////////
				
			
				$('#saveBtn',$el).click(function(){
					var $cis = $('i.fa.fa-check-circle.checked_i', $treeTable),
						$dis = $('i.fa.fa-dot-circle-o', $treeTable),
						$tis = $('i.fa.fa-circle-thin', $treeTable),
						mids = '';
					$cis.each(function(){
						mids += $(this).closest('tr').attr('data-tt-id') + ",";
					});
					$dis.each(function(){
						mids += $(this).closest('tr').attr('data-tt-id') + ",";
					});
					$tis.each(function(){
						var $tr = $(this).closest('tr');
						if($tr.attr('data-flag') == "cf"){
							mids += $(this).closest('tr').attr('data-tt-id') + ",";
						}
					});
					if(changeVal == '1' ){
					mids += tableData[0].mid;
					$.ajax({
						"type" : "post",
						"url" : "RoleManageAction_updatePriv.do",
						"dataType" : "json",
						"data" : {
							rid : rid,
							mids : mids,
						},
						shelter : '正在处理，请稍后...',
						"success" : function (data){
							if(data.status){
								app.common.sendlogHistory("添加菜单维护权限：角色名【"+rname+"】");
								ajaxRoleTable();
								app.alert('更新数据成功！');
								$('#addPrviModal',$el).modal('hide');
							}else{
								showError(data.errorMsg);
							}
						}
					});
					//应用系统的按钮
					}else if(changeVal == '0'){
//						mids += tableData[0].mid;
//					console.log(mids);
					$.ajax({
						"type" : "post",
						"url" : "DataRoleAction_updatePriv.do",
						"dataType" : "json",
						"data" : {
							rid : rid,
							objIds : mids,
						},
						shelter : '正在处理，请稍后...',
						"success" : function (data){
							if(data.status){
								app.common.sendlogHistory("添加数据维护权限：角色名【"+rname+"】");
								ajaxRoleTable();
								app.alert('更新数据成功！');
								$('#addPrviModal',$el).modal('hide');
							}else{
								showError(data.errorMsg);
							}
						}
					});
					}
//					
				});
				$('#cancelBtn', $el).click(function(){
    				$('#addPrviModal',$el).modal('hide');
    			});
				//文本框赋值
    			function putData(index){
					var menuData = queryData[index-1];
					for(var i in menuData){
						$('#' + i, $el).val(menuData[i]);
					}
				}
    			//检查用户名重复
				function checkUsername(name){
					for(var i in roleName){
						if(roleName[i] == name){
							return false;
						}
					}
					return true;
				}
				//数据验证
				function validateData(context){
					var validateResult = app.validate.validate({
						$context : context,
						data:  [{
							"id": "name",
							"filter": {
								"minLen" : 1,
								'maxLen' : 15,
							},
						},{
							"id": "descp",
							"filter": {
								'minLen' : 1,
								'maxLen' : 80
							},
						}
						],
						correctCallback: function ($ael, correctMsg) {
							$ael.next().addClass('hide');
						},
						errorCallback : function ($ael, errMsg) {
							$ael.next().removeClass('hide').text(errMsg);
						}
					});
					return validateResult.bResult;
				}	
				
				//菜单新增、修改、删除
				function ajaxDeal(param,url){
					var dtd = $.Deferred();
					$.ajax({
						"type" : "post",
						"url" : url,
						"dataType" : "json",
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
				
				
				//过滤特殊字符
				function stripscript(s) {
					var flag = false;
					var str = s;
					var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}《》【】‘；：”“'。，、？]") 
					var rs = ""; 
					for (var i = 0; i < s.length; i++) { 
						rs = rs+s.substr(i, 1).replace(pattern, ''); 
					}
					if(str != rs){
						flag = true;
					}
				return {rs:rs,flag:flag}; 
				} 
				
				/*var $left = $('#div1',$el),
					$mb = $('.modal-body',$('#addPrviModal',$el));
				$mb.scroll(function() {
					var scrollTop = $left.offset().top;
					if($left.height() + scrollTop < 465){
						//$left.css('position', 'fixed');
					}else{
						//$left.css('position', 'absolute');
					}
				});*/
				
			},

			unload : function(handler) {
			},

			pause : function($el, scope, handler) {
			},

			resume : function($el, scope, handler) {
			}
		};
	});
