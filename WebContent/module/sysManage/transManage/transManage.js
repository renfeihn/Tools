define(["jquery"], function() {
		return {
			load : function($el, scope, handler) {
				var $ele = $("#transManage-mol",$el);
				var $newBtn = $('#newBtn',$el),//新建
					$updateBtn = $('#updateBtn',$el),//编辑
					$delBtn = $('#DelBtn',$el);//删除
				var tableData;
				var queryData,
					option = "",//新增、修改的标识
					$selected,
					mid,
					clickNode;
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
				var $tradeTable = $('#tradeTable',$el).dataTable({
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
					],
				});
				//dateTable
				ajaxTable();
				function ajaxTable(){
					$.ajax({
						"type" : "post",
						"url" : "TradeAction_getAllTradeList.do",
						"dataType" : "json",
						"success" : function (data){
							if(data.status){
								var	tableData = [];
								queryData = data.content.list;
								$tradeTable.fnClearTable();
								if(queryData.length > 0){
									var index = 1;
									for(var i = 0; i < queryData.length; i++){
										var singleData = queryData[i],
											row = [];
										row[0] = index++;
										row[1] = singleData.name || "";
										row[2] = singleData.path || "";
										row[3] = singleData.prename || "";
										row[4] = singleData.state || "";
										row[5] = singleData.createUser || "";
										row[6] = singleData.createTime || "";
										tableData.push(row);
									}
									$tradeTable.fnAddData(tableData);
									getTreeTable();
								}
							}else{
								showError(data.errorMsg);
							}
						}
					});
				}
				function getTreeTable(){
					$("#tradeTable tbody").unbind('click');
					$("#tradeTable tbody").on("click", "tr", function() {
						$(".selected").not(this).removeClass("selected");
						$(this).toggleClass("selected");
						
						$selected = $('tr.selected',$('#tradeTable',$el));
						if($selected.length > 0){
							$updateBtn.removeClass('disabled');
							$delBtn.removeClass('disabled');
							mid = queryData[$('td:eq(0)',$selected).text() - 1].mid;
						}else{
							$updateBtn.addClass('disabled');
							$delBtn.addClass('disabled');
						}
					});
				}
				
				/* 模态框相关操作 */
				$(function(){
					/* 新增交易 */
					$newBtn.click(function(){
						$("#transManage-mol h3").html("新增交易");
						$("#transManage-mol", $el).modal('show');
						option = 'save';
						clearData();
						$('#trade_createTime').val(getNowDate());
					});
					//修改交易
					$updateBtn.on('click',function(){
						if(!$(this).hasClass('disabled')){
							$("#transManage-mol h3").html("修改交易");
							$("#transManage-mol", $el).modal('show');
							option = 'update';
							putData($('td:eq(0)',$selected).text());
							//$('#trade_createTime').val(getNowDate());
						}
					});
					//删除菜单
					$delBtn.on('click',function(){
						if(!$(this).hasClass('disabled')){
							app.confirmDialog({
								sTitle:'请确认',
								sType:"search",
								sContent:'是否确认删除该交易？',
								sBtnConfirm: '确定',  //确认按钮显示内容
				                sBtnCancel: '取消',  //却笑按钮显示内容
				                fnConfirmHandler:function(){
									ajaxDeal({id : mid},"TradeAction_deleteTrade.do")
									.done(function(data){
										app.common.sendlogHistory("删除：交易名称【"+queryData[$('td:eq(0)',$selected).text() - 1].name+"】，交易路径【"+queryData[$('td:eq(0)',$selected).text() - 1].path+"】");
										app.alert("交易删除成功！");
										ajaxTable();
										$updateBtn.addClass('disabled');
										$delBtn.addClass('disabled');
									});
								},
								context:$('body')[0],
							});
						}
					});
					
					$.ajax({
						"type" : "post",
						"url" : "ClassifyAction_getClassify.do",
						"dataType" : "json",
						"success" : function (data){
							if(data.status){
								tableData = data.content.lists;
								loadzTree(tableData,$ele);//上级菜单树
							}else{
								showError(data.errorMsg);
							}
						}
					});
        			//移除错误提示信息
        			$ele.unbind('click');
        			$ele.click(function(e){
						$target = $(e.target);
						if($target.attr('id') != 'buttion_add'){
							$('span.help-inline',$ele).addClass('hide');
						}
						if($target.attr('class') == 'close'){
							$("<input type='reset' style='display:none'>").appendTo($("form",$ele)).trigger("click").remove();
						}
					});
        			//上级分类名称
        			$('#trade_prename', $ele).on('click',function(){
        				$("body").bind("click", onBodyDown);
        				loadzTree(tableData,$ele);
        				$("#tradediv_tree", $ele).slideDown("fast");
        			});
        			$('#buttion_add', $ele).click(function(){
            			// 表单验证不通过，则不提交
            			if(!validateData($ele)){
            				return;
            			}
            			//名称不能重复
            			if(option == 'save' && !checkName()){
            				return;
            			}
            			var url = '',
            				param = {
    							name : $.trim($('#trade_name',$ele).val()),
    							pregid : $.trim($('#trade_prename',$ele).attr('pid')),
    							path : $.trim($('#trade_path',$ele).val()),	
    							state : $.trim($('#trade_state',$ele).val()),
    							createUser :  $.trim($('#trade_createUser',$ele).val()),
    							createTime :  $.trim($('#trade_createTime',$ele).val()),
    						};
            				
    					var level = '2';
    					if(clickNode){
    						if(clickNode.menuLevel == '1' && clickNode.path == '') level = '1';
    					}else{
    						level = queryData[$('td:eq(0)',$selected).text()-1] && queryData[$('td:eq(0)',$selected).text()-1].menuLevel;
    					}
    					param['menuLevel'] = level;
    					if(option == 'save'){
    						url = 'TradeAction_addTrade.do';
    					}else if(option == 'update'){
    						param["mid"] = mid;
    						url = 'TradeAction_updateTrade.do';
    					}
						ajaxDeal(param,url)
						.done(function(data){
							if(option == 'update'){
						       app.common.sendlogHistory("修改：交易名称【"+param.name+"】，交易路径【"+param.path+"】，交易状态【"+$('#trade_state option:selected',$ele).text()+"】，添加人【"+param.createUser+"】");
							}
							else{
						       app.common.sendlogHistory("新增：交易名称【"+param.name+"】，交易路径【"+param.path+"】，交易状态【"+$('#trade_state option:selected',$ele).text()+"】，添加人【"+param.createUser+"】");
							}
							app.alert("操作成功！");
							//context.hide();// 关闭表单
							/**** 清空表单 ***/
	        				$("<input type='reset' style='display:none'>").appendTo($("form",$ele)).trigger("click").remove();
							$ele.modal("hide");
							ajaxTable();
							$updateBtn.addClass('disabled');
							$delBtn.addClass('disabled');
						});
        			});
        			$('#buttion_cancel', $ele).click(function(){
        				//context.hide();// 关闭表单
        				/**** 清空表单 ***/
        				$("<input type='reset' style='display:none'>").appendTo($("form",$ele)).trigger("click").remove();
        				$ele.modal("hide");
        			});
           		 })
				/* 模态框完 */
				
				
				
				
				
				//zTree节点单击
				function zTreeOnClick(event,treeId,treeNode,clickFlag){
					var name = treeNode.name,
						pregid = treeNode.mid;
					clickNode = treeNode;
					$('#trade_prename').val(name).attr('pid',pregid);
					$("#tradediv_tree").fadeOut("fast");
				}
				// 加载zTree
				function loadzTree(data,$ele){
					if(zTree){
						zTree.destroy();
					}
					zTree = $.fn.zTree.init($("#trade_tree",$ele), setting,data);
				}
				//body内点击事件，去掉提示框
				function onBodyDown(event) {
					$(".help-inline:not(.hide)").addClass('hide');
					if (!(event.target.id == "trade_prename" || event.target.id == "tradediv_tree" || $(event.target).parents("#tradediv_tree").length>0)) {
						$("#tradediv_tree").fadeOut("fast");
						$("body").unbind("click", onBodyDown);
					}
				}
				//文本框赋值
				function putData(index){
					var menuData = queryData[index-1];
					for(var i in menuData){
						$('#trade_' + i).val(menuData[i]);
					}
					$('#trade_prename').attr('pid',menuData.pregid);
				}
				//清除模态框数据
				function clearData(){
					$('#trade_mname',$ele).val('');
					$('#trade_mpath',$ele).val('');
					$('#trade_mstate',$ele).val('1');
				}
				//交易明是否重复
				function checkName(){
					var name = $.trim($('#trade_name', $el).val());
					for(var i in queryData){
						if(queryData[i]["name"] == name){
							showError("交易名称已存在！");
							return false;
						}
					};
					return true;
				}
				//数据验证
				function validateData(context){
					var validateResult = app.validate.validate({
						$context : context,
						data:  [{
							"id": "trade_prename",
							"filter": {
								"require": true,
							},
						},{
							"id": "trade_name",
							"filter": {
								"require": true,
								'maxLen' : 50,
							},
						},{
							"id": "trade_path",
							"filter": {
								"require": true,
								'maxLen' : 200,
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
					var dtd = $.Deferred();
					$.ajax({
						"type" : "post",
						"contentType":'application/x-www-form-urlencoded;charset=utf-8',
						"url" : url,
						"dataType" : "json",
						"shelter" : "正在处理，请稍后。。。",
						"data" :  param,
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
			},

			unload : function(handler) {
			},

			pause : function($el, scope, handler) {
			},

			resume : function($el, scope, handler) {
			}
		};
	});