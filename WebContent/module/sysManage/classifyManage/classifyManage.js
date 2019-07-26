define(["jquery"], function() {
		return {
			load : function($el, scope, handler) {
				var bortherNameSet;// 兄弟分类名称集合，校验重名
				var $ele = $("#classifyManage-mol",$el);
				var $newBtn = $('#newBtn',$el),//新建
					$updateBtn = $('#updateBtn',$el),//编辑
					$delBtn = $('#DelBtn',$el);//删除
				var tableData = [],//表格数据
					$table = $('#treeTable',$el),
					$tableBody = $('#treeTable>tbody',$el),
					$treeTable,
					$selected;//选中的行
				var option = "";//新增、修改的标识
				var originalName = "";
				var originalParentId = "";
				var zTree,setting = {
						view : {
							showLine : true,
							showIcon : false,
							dblClickExpand : false
						},
						data : {
							simpleData : {
								enable : true,
								idKey : "mid",
								pIdKey : "pregid",
								rootPId : "0"
							},
						},
						callback : {
							onClick : zTreeOnClick
						}
					};
				//表格树
				ajaxTreeTable();
				function ajaxTreeTable(){
					$.ajax({
						"type" : "post",
						"url" : "ClassifyAction_getClassify.do",
						"dataType" : "json",
						"success" : function (data){
							if(data.status){
								tableData = data.content.lists;
								tableData = app.common.getTreeData({
									data : tableData,
					        		idName : "mid",
					        		pidName : "pregid",
					        		pidVal : "0"
								});
								getTreeTable();
							}else{
								showError(data.errorMsg);
							}
						}
					});
				} 
				
				function getTreeTable(){
					if(tableData.length > 0){
						for(var i = 1; i < tableData.length; i++){
							var row = tableData[i];
							//t = new Date(row.createTime.time).Format("yyyy-MM-dd hh:mm:ss");
							var tbody = '<tr index-val="'+i+'" data-tt-id="'+row.mid+'" data-tt-parent-id="'+row.pregid+'">'+
											'<td>' + row.name + '</td>' +
											'<td>' + row.mid + '</td>' +
											'<td>' + row.seq + '</td>' +
											'<td>' + row.pregid + '</td>' +
											'<td>' + row.createUser + '</td>' +
											'<td>' + row.createTime + '</td>' +
										'</tr>';
							$tableBody.append($(tbody));
						}
					}
					$table.treetable({ expandable: true });
					$("#treeTable tbody",$el).unbind('click');
					$("#treeTable tbody",$el).on("click", "tr", function() {
						$(".selected").not(this).removeClass("selected");
						$(this).toggleClass("selected");
						$selected = $('tr.selected',$table);
						if($selected.length > 0){
							$updateBtn.removeClass('disabled');
							$delBtn.removeClass('disabled');
						}else{
							$updateBtn.addClass('disabled');
							$delBtn.addClass('disabled');
						}
					});
				}
				
				
				/* 模态框相关操作 */
				 $(function(){
					/* 新增菜单 */
					$newBtn.click(function(){
						$("#classifyManage-mol h3", $el).html("新增分类");
						$("#classifyManage-mol", $el).modal('show');
						$(".help-inline:not(.hide)", $el).addClass('hide');
						option = 'save';
						$('#menu_createTime', $el).val(getNowDate());
					});
					//更新菜单
					$updateBtn.on('click',function(){
						if(!$(this).hasClass('disabled')){
							$("#classifyManage-mol h3", $el).html("修改分类");
							$(".help-inline:not(.hide)", $el).addClass('hide');
							$("#classifyManage-mol", $el).modal('show');
							option = 'update';
							putData($selected.attr('index-val'));
							originalName = $('#menu_name', $el).val();
							originalParentId = $("#menu_pregid", $el).val();
						}
					});
					//删除菜单
					$delBtn.on('click',function(){
						if(!$(this).hasClass('disabled')){
							app.confirmDialog({
								sTitle:'请确认',
								sType:"search",
								sContent:'提示：此操作将同时删除该分类下的交易，删除前请备份交易信息！<br>是否确认删除？',
								sBtnConfirm: '确定',  //确认按钮显示内容
				                sBtnCancel: '取消',  //却笑按钮显示内容
								fnConfirmHandler:function(){
									var mid = tableData[$selected.attr('index-val')].mid;
									ajaxDeal({menuId : mid},"ClassifyAction_deleteClassify.do")
									.done(function(data){
						                app.common.sendlogHistory("删除：分类名称【"+tableData[$selected.attr('index-val')].name+"】，分类编号【"+tableData[$selected.attr('index-val')].mid+"】，添加人【"+tableData[$selected.attr('index-val')].createUser+"】");
										app.alert("分类删除成功！");
										$table.treetable('destroy');
		    							$tableBody.children().remove();
		    							ajaxTreeTable();
		    							$updateBtn.addClass('disabled');
		    							$delBtn.addClass('disabled');
									});
								},
								context:$('body')[0],
							});
						}
					});
					
					loadzTree($ele);//上级菜单树
        			//移除错误提示信息
        			// $ele.unbind('click');
        			// $ele.click(function(e){
						// $target = $(e.target);
						// if($target.attr('id') != 'buttion_add'){
							// $('span.help-inline',$ele).addClass('hide');
						// }
					// });
        			//上级分类名称
        			$('#menu_pname', $ele).on('click',function(){
        				$("body").bind("click", onBodyDown);
        				loadzTree($ele)
        				$("#menudiv_tree", $ele).slideDown("fast");
        			});
        			$('#buttion_add', $ele).click(function(){
            			// 表单验证不通过，则不提交
            			if(!validateData($ele)){
            				return;
            			}
            			$("#menu_name", $el).trigger('input');
            			if($(".help-inline:not(.hide)" , $el).length > 0){
            				return;
            			}
            			var url = '',
            				param = {
								name : $.trim($('#menu_name',$ele).val()),
								seq : $.trim($('#menu_seq',$ele).val()),
								pregid : $('#menu_pregid',$ele).val(),	
								menuLevel : $('#menu_menuLevel', $ele).val(),
								path : $('#menu_path',$ele).val()
    						};
    					if(option == 'save'){
    						url = 'ClassifyAction_saveClassify.do';
    						param['createUser'] = $('#menu_createUser',$ele).val();
							param['createTime'] = $('#menu_createTime',$ele).val();
						}else if(option == 'update'){
    						url = 'ClassifyAction_updateClassify.do';
    						param['mid'] = $('#menu_mid',$el).val();
    					}
						ajaxDeal(param,url)
						.done(function(data){
							if(option == 'update'){
						       app.common.sendlogHistory("修改：分类名称【"+param.name+"】，上级分类名称【"+$('#menu_pname',$ele).val()+"】，添加人【"+$('#menu_createUser',$ele).val()+"】");
							}
							else{
						       app.common.sendlogHistory("新增：分类名称【"+param.name+"】，上级分类名称【"+$('#menu_pname',$ele).val()+"】，添加人【"+$('#menu_createUser',$ele).val()+"】");
							}
							app.alert("操作成功！");
							//context.hide();// 关闭表单
							/**** 清空表单 ***/
	        				$("<input type='reset' style='display:none'>").appendTo($("form",$ele)).trigger("click").remove();
	        				//关闭表单
	        				$ele.modal("hide");
							$updateBtn.addClass('disabled');
							$delBtn.addClass('disabled');
							
							$table.treetable('destroy');
							$tableBody.children().remove();
							ajaxTreeTable();
						});
        			});
        			$("#close-modal",$ele).click(function(){
						/**** 清空表单 ***/
        				$("<input type='reset' style='display:none'>").appendTo($("form",$ele)).trigger("click").remove();
					});
        			$('#buttion_cancel', $ele).click(function(){
        				$ele.modal('hide');// 关闭表单
        				//context.hide();// 关闭表单
        				/**** 清空表单 ***/
        				$("<input type='reset' style='display:none'>").appendTo($("form",$ele)).trigger("click").remove();
        			});
      			});
      			$('#buttion_cancel', $ele).click(function(){
      				$ele.modal('hide');
      				/**** 清空表单 ***/
    				$("<input type='reset' style='display:none'>").appendTo($("form",$ele)).trigger("click").remove();
      			});
          	
				 ///////////////////////////////////////////////
				
				//zTree节点单击
				function zTreeOnClick(event,treeId,treeNode,clickFlag){
					var name = treeNode.name,
					pregid = treeNode.mid;
					var children = treeNode.children;
					bortherNameSet = new Set();
					children && children.forEach(function(item, index){
						bortherNameSet.add(item.name);
					})
					$('#menu_pname', $el).val(name);
					$('#menu_pregid', $el).val(pregid);
					$("#menudiv_tree", $el).fadeOut("fast");
					if($("#menu_name", $el).val() != ''){
						$("#menu_name", $el).trigger('input');
					}
				}
				// 加载zTree
				function loadzTree($ele){
					if(tableData.length > 0){
						//生成上级分类
						if(zTree){
							zTree.destroy();
						}
						zTree = $.fn.zTree.init($("#menu_parent_tree",$ele), setting,tableData);
						//删除最后一级
						var treeNodes = zTree.transformToArray(zTree.getNodes());
						for(var i = 0; i < treeNodes.length; i++){
							if(treeNodes[i].level == 3){
								zTree.removeNode(treeNodes[i],false);
							}
						}
					}
				}
				//body内点击事件，去掉提示框
				function onBodyDown(event) {
					// $(".help-inline:not(.hide)").addClass('hide');
					if (!(event.target.id == "menu_pname" || event.target.id == "menudiv_tree" || $(event.target).parents("#menudiv_tree").length>0)) {
						$("#menudiv_tree", $el).fadeOut("fast");
						$("body").unbind("click", onBodyDown);
					}
				}
				//文本框赋值
				function putData(index){
					var menuData = tableData[index];
					for(let i in menuData){
						$('#menu_' + i, $el).val(menuData[i]);
					}
					if(menuData.pregid != 0){//父菜单信息
						for(var i = 0; i < index; i++){
							if(tableData[i].mid == menuData.pregid){
								$('#menu_pname', $el).val(tableData[i].name);
								return;
							}
						}
					}else{
						$('#menu_pname', $el).val("系统菜单");
					}
				}
				//数据验证
				function validateData(context){
					var validateResult = app.validate.validate({
						$context : context,
						data:  [{
							"id": "menu_pname",
							"filter": {
								"require": true,
							},
						},{
							"id": "menu_name",
							"filter": {
								"require": true,
								'maxLen' : 50,
							},
						},{
							"id": "menu_seq",
							"filter": {
								"type" : "numStr",
								'maxLen' : 2,
							},
						}
						],
						correctCallback: function ($ele, correctMsg) {
							$ele.next().addClass('hide');
						},
						errorCallback : function ($ele, errMsg) {
							$ele.next().removeClass('hide').text(errMsg);
						}
					});
					return validateResult.bResult;
				}
				//菜单新增、修改、删除
				function ajaxDeal(param,url){
					app.shelter.show("请等待...");
					var dtd = $.Deferred();
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

				$("#menu_name", $el).on('input', function(){
					var name = this.value;
					var parentClassify = $("#menu_pregid", $el).val();
					if(!parentClassify){
						app.alert('请先选择上级分类');
						$(this).val('');
						$("#menu_pname", $el).click();
						return;
					}
					// 修改成原始数据则不用校验
					if(option == 'update' && originalName == name && originalParentId == parentClassify){
						$(this).next().addClass("hide");
						return;	
					}
					if(bortherNameSet.has(name)){
						$(this).next().text('该分类已存在').removeClass('hide');
					}else{
						$(this).next().addClass("hide");
					}
				})
			},

			unload : function(handler) {
			},

			pause : function($el, scope, handler) {
			},

			resume : function($el, scope, handler) {
			}
		};
	});