define(["jquery"],function($){
	var getUserTableData;
	return {
		load:function($el,scope,handler){
			var userTableSelectedObj,//资源组短信配置 用户信息列表
				EditFlag = false,//标志是否是修改分组
				allSystemArr;//所有系统数组
			//角色分组列表
			var $dataTable = $('#dataTable', $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
		        'pagingType': 'full_numbers',
		        "ordering": false,
		        'pageLength': 15,
		        "searching": false,
		        'columns': [{
		        	data: 'name',defaultContent: '-'
		        }, {
		        	data: 'gid',defaultContent: '-'
		        }, {
		        	data: 'status',defaultContent: '-',
		        	render: function(data, type, row, meta) {
		        		if(data == 1){
		        			return '<span class="boolean-switch true readonly"></span>';
		        		}else{
		        			return '<span class="boolean-switch false readonly"></span>';
		        		}
	        		}
		        }]
	      });
			
			//组已配置短信发送人员列表
		      var $roleTable = $('#roleTable', $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
		        'pagingType': 'full_numbers',
		        "ordering": false,
		        'pageLength': 10,
		        "searching": false,
		        'columns': [
//                {
//		        	data: 'userid',
//		        	render: function(data, type, row, meta) {
//		        		return '<input type="checkbox" id="' + data +'" />'
//		        	}
//		        }, 
		        {
		        	data: 'userid',defaultContent: '-',//
		        }, {
		        	data: 'role_a',defaultContent: '-'//
		        }, {
		        	data: 'roles',defaultContent: '-',//
		      		render: function(data, type, row, meta) {
		      			return data.map(function(item,index){return item.rname}).join(',');
			        	}
		        }, {
		        	data: 'groups',defaultContent: '-',//
		        	render: function(data, type, row, meta) {
		        		return data.map(function(item,index){return item.gname}).join(',');
		        	}
		        }]
			});
		      
		    //资源组短信配置 用户信息列表
			var $userTable = $('#userTable', $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
		        'pagingType': 'full_numbers',
		        "ordering": false,
		        'pageLength': 10,
		        "searching": true,
		        'columns': [{
		        	data: 'userid',
		        	render: function(data, type, row, meta) {
		        		return '<input type="checkbox" id="' + data +'" />'
		        	}
		        }, {
		        	data: 'userid',defaultContent: '-',//
		        }, {
		        	data: 'role_a',defaultContent: '-'//
		        }, {
		        	data: 'roles',defaultContent: '-',//
		        	render: function(data, type, row, meta) {
		        		return data.map(function(item,index){return item.rname}).join(',');
		        	}
		        }, {
		        	data: 'groups',defaultContent: '-',//
		        	render: function(data, type, row, meta) {
		        		return data.map(function(item,index){return item.gname}).join(',');
		        	}
		        }]
			});
			
			userTableSelectedObj = app.multiSelect({
				dataTable: $userTable,
				tableSelector: '#userTable',
				checkAllSelector: '#userSelAllBtn',
				optBtn: {
					defaultDisabled: '',
					onlySelectedOneEnabled: ''
				},
				context: $el
			});
			
			//分组列表
			getTableData();
			function getTableData() {
				$dataTable.clear().draw();
				app.common.ajaxWithAfa({
					url: "MonitorCfgManagerAction_queryAllGroup.do",
				}).done(function(data) {
					var result = data.funs;
					if(result && result.length > 0){
						$dataTable.rows.add(result).draw();
						 $('#dataTable',$el).find('tbody>tr:eq(0)').click();
					}
				});
			}
			
			//资源组短信配置 用户信息列表			
			getUserTableData = function() {
				$userTable.clear().draw();
				app.common.ajaxWithAfa({
					url: "MonitorCfgManagerAction_queryAllUserAndRole.do",
				}).done(function(data) {
					var result = data.funs;
					$('#allMessPerson',$("#userTableModal",$el)).text(result.length);
					if(result && result.length > 0){
						$userTable.rows.add(result).draw();
					}
				});
			}
			
			getUserTableData();
			
			//应用短信配置 应用列表
			getsystemData();
			function getsystemData() {
				$userTable.clear().draw();
				app.common.ajaxWithAfa({
					url: "MessSendConfigAction_queryAllApp.do",
				}).done(function(data) {
					if(data && data.result){
						allSystemArr = data.result;
					}
				});
			}
			
			//点击新增按钮跳转到新增页面
		      $('#add', $el).click(function() {
		    	  var $this = $(this);
		    	  if($this.hasClass('disabled')) {
		    		  return;
		    	  }
		    	  $('#myModalLabel', $el).text('新增分组');
		    	  EditFlag = false;
		    	  $('[data-skip=info]',$('#modal',$el)).val('');
		    	  $('#gid',$('#modal',$el)).removeAttr('disabled','disabled');
		    	  $('#modal',$el).modal('show');
		      });
		      
		      //新增修改组确认按钮
		      $('.confirmBtn',$('#modal',$el)).click(function(){
		    	  var obj = {},url,message;
		    	  if(!validateData()){
		    		  return;
		    	  }
		    	  $('[data-skip=info]',$('#modal',$el)).each(function(index,item){
		    		  obj[$(item).attr('id')] = $(item).val();
		    	  });
		    	  if(EditFlag){
		    		  url = 'MessSendConfigAction_updateGroup.do';
		    		  message = '修改';
		    	  }else{
		    		  url = 'MessSendConfigAction_addGroup.do';
		    		  message = '新增';
		    	  }
		    	  app.shelter.show('正在'+message+'，请稍等...');
		    	  app.common.ajaxWithAfa({
		    		  url: url,
		    		  data: obj
		    	  }).done(function(data) {
		    		  app.shelter.hide();
		    		  if(data.result) {
		    			  app.alert(message+'成功');
		    			  $('#modal',$el).modal('hide');
		    			  getTableData();
		    		  }else{
		    			  app.alert(message+'失败');
		    		  }
		    	  });
		      });
		      

		      function validateData(){
		    	  var validateResult = app.validate.validate({
		    		  $context : $("#modal", $el),
		    		  data:[{
		    			  "id":"gname",
		    			  "filter":{
		    				  "require":true,
		    				  "type":"string",
		    			  }
		    		  },{
		    			  "id":"gid",
		    			  "filter":{
		    				  "require":true,
		    				  "maxLen":64,
		    				  "type":"string",
		    			  }
		    		  }],
		    		  correctCallback:function($ele,correctMsg){
		    			  $ele.next().addClass('hide');
		    		  },
		    		  errorCallback:function($ele,errMsg){
		    			  $ele.next().removeClass('hide').text(errMsg);
		    		  }

		    	  });
		    	  return validateResult.bResult;
		      }
		      
		      // 点击修改按钮跳转到修改页面
		      $('#edit', $el).click(function() {
		        if($(this).hasClass('disabled')) {
		          return;
		        }
		        $('#myModalLabel', $el).text('修改分组');
		        $('[data-skip=info]',$('#modal',$el)).val('');
		        $('#modal',$el).modal('show');
		        EditFlag = true;
		        app.common.ajaxWithAfa({
		    		  url: 'MessSendConfigAction_queryGroup.do',
		    		  data: {
		    			  'gid': $dataTable.row($('#dataTable tr.selected')).data().gid
		    		  }
		    	  }).done(function(data) {
		    		  var result = data.result[0];
	    			  $('#gname',$('#modal',$el)).val(result['name']);
	    			  $('#platform',$('#modal',$el)).val(result['category']);
	    			  $('#gid',$('#modal',$el)).val(result['gid']).attr('disabled','disabled');
		    	  });
		      });

		      // 点击删除按钮
		      $('#del', $el).click(function() {
		    	  if($(this).hasClass('disabled')) {
		    		  return;
		    	  }
		    	  app.confirmDialog({
		    		  sTitle:"常规提示模块",     
		    		  sType:"normal",  
		    		  sContent:'是否确认删除？',  
		    		  sBtnConfirm: '确定',  //确认按钮显示内容
		    		  sBtnCancel: '取消',  //取消按钮显示内容
		    		  fnConfirmHandler: function(){
		    			  app.shelter.show('正在删除...');
				    	  app.common.ajaxWithAfa({
				    		  url: 'MessSendConfigAction_delGroup.do',
				    		  data: {
				    			  'gid': $dataTable.row($('#dataTable tr.selected')).data().gid
				    		  }
				    	  }).done(function(data) {
				    		  app.shelter.hide();
				    		  if(data.result) {
				    			  app.alert('删除成功');
				    			  getTableData();
				    		  }else{
				    			  app.alert('删除失败');
				    		  }
				    	  });
		    		  },  
		    		  fnCancelHandler: function(){},  
		    	  });
		      });
		      
		      //点击组列表项刷新用户列表
		      $('#dataTable',$el).on('click','tbody>tr',function(){
					var tr = $dataTable.row(this).data(),
						gid = tr.gid;
					$(this).addClass('selected').siblings().removeClass('selected');
					$('#systemBtn',$el).addClass('disabled');
					getRoleOrUserTableData(gid);
					if($('#dataTable tr.selected',$el).length){
						$('.groupManage-buttons',$el).find('button').not('.add').removeClass('disabled')
					}else{
						$('.groupManage-buttons',$el).find('button').not('.add').addClass('disabled','disabled');
					}
		      });
		      
		      $('#dataTable',$el).on('click','span',function(e){
		    	  e.stopPropagation();
		    	  var tr = $dataTable.row($(this).parents('tr')).data(),
		    	  	  flag,message;
		    	  if(tr.status==1){
		    		  flag = 0;
		    		  message='停止';
		    	  }else{
		    		  flag = 1;
		    		  message='启动';
		    	  }
		    	  app.confirmDialog({
						sTitle:"请选择",  
		                sType:"normal", 
		                sContent:'是否确认'+message+'短信?',  
		                sBtnConfirm: '确定',
		                sBtnCancel: '取消', 
		                fnConfirmHandler: function(){
		                	app.common.ajaxWithAfa({
		                		url: "MessSendConfigAction_groupSendOrStop.do",
		                		data:{
		                			'gid':tr.gid,
		                			'flag':flag
		                		}
		                	}).done(function(data) {
		                		var result = data.result;
		                		if(result){
		                			app.alert('短信'+message+'成功');
		                			getTableData();
		                		}else{
		                			app.alert('短信'+message+'失败');
		                		}
		                	});
		                }, 
		                fnCancelHandler: function(){}, 
		                aArgs: ['提示框']                
		    	  })
		      });
		      
		      //根据组id获得已选择短信配置的用户列表 
				function getRoleOrUserTableData(gid,callback) {
					$roleTable.clear().draw();
					app.common.ajaxWithAfa({
						url: "MonitorCfgManagerAction_queryAllUserAndRole.do",
						data:{
							'gid':gid
						}
					}).done(function(data) {
						var result = data.funs;
						if(result && result.length > 0){
							$roleTable.rows.add(result).draw();
						}
						callback && callback(result);
					});
				}
				
				//资源组短信配置按钮
				$('#confirm',$el).click(function(){
					if($(this).hasClass('disabled')){
						return;
					}
					
					userTableSelectedObj.clear();
					$userTable.page(0).draw(false);
					var gid = $dataTable.row($('#dataTable tr.selected',$el)).data().gid;
					$("#userTableModal",$el).modal('show');
					getRoleOrUserTableData(gid,function(result){
						$('#messPerson',$("#userTableModal",$el)).text(result.length);
						if(result && result.length > 0){
							var data = result.map(function(item,index){
								return item.userid;
							});
							userTableSelectedObj.setSelectedItems('userid', data);
						}
					});
				});
				
				$('#userTable', $el).on('click', '#userSelAllBtn, tr', function(e) {
					if(userTableSelectedObj.getSelectedDatas()) {
						$('#messPerson',$("#userTableModal",$el)).text(userTableSelectedObj.getSelectedDatas().length);
					} else {
						$('#messPerson',$("#userTableModal",$el)).text('0');
					}					
				});
				
				//资源组短信配置确认按钮
				 $('.confirmBtn',$('#userTableModal',$el)).click(function(){
					 var groupId = $dataTable.row($('#dataTable tr.selected')).data().gid;
					 var roleIdArr = userTableSelectedObj.getSelectedValues('userid');
					 app.shelter.show('正在提交，请稍等...');
					 app.common.ajaxWithAfa({
						 url: "MessSendConfigAction_setGroupUsers.do",
						 data:{
							 'gid':groupId,
							 'userIds':roleIdArr
						 }
					 }).done(function(data) {
						 app.shelter.hide();
						 if(data.result) {
							 app.alert('修改组人员成功');
							 $('#userTableModal',$el).modal('hide');
							 getRoleOrUserTableData(groupId);
						 }else{
							 app.alert('修改组人员失败');
						 }
					 });
				 });
				 
				 //组已配置短信发送人员列表点击行控制应用短信配置按钮   只有在选择系统组时 选择用户  应用短信配置按钮才可用
				 $("#roleTable",$el).on('click','tbody>tr',function(){
					 $(this).toggleClass('selected').siblings().removeClass('selected');
					 var length = $('#roleTable tr.selected',$el).length;
					 if($dataTable.row($('#dataTable tr.selected')).data().gid=='application' && length==1){
						 $('#systemBtn',$el).removeClass('disabled');
						 $('#multSelect',$('#sysTableModal',$el)).val('');
						 app.common.ajaxWithAfa({
							 url: "MessSendConfigAction_queryUserAppInfo.do",
							 data:{
								 'userId':$roleTable.row($('tr.selected',$('#roleTable'))).data().userid
							 }
						 }).done(function(data) {
							 var html = [],Temp2='',Temp='';
							 if(data.result) {
								 var selectSystem = data.result;
								 var unSelectSystem = allSystemArr.filter(function(item,index){
									 	var flag = true;
									 	selectSystem.forEach(function(ele,index){
									 		if(ele.object_id==item.object_id){
									 			flag = false;
									 		}
									 	})
									 	if(flag){
									 		return item;
									 	}
								 });
								 selectSystem.forEach(function(role,index){
									 Temp2 += '<div class="yixuanze" role-name="'+role.app_name+'" role-id="'+role.object_id+'"><span>'+role.app_name+'<img class="jian" src="img/workList/jian.png" /></span></div>';
								 });
								 unSelectSystem.forEach(function(role,index){
									 Temp += '<div class="lis" role-name="'+role.app_name+'" role-id="'+role.object_id+'"><div class="daixuanze">'+'<span><img class="jia" src="img/workList/jia.png" />'+role.app_name+'</span></div></div>';
								 });
								 
								 $("#selected_div",$el).empty().append(Temp2);
								 $("#selecting_div",$el).empty().append(Temp);
							 }
						 });
					 }else{
						 $('#systemBtn',$el).addClass('disabled');
					 }
				 });
				 
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
					
				 //应用短信配置按钮
				 $('#systemBtn',$el).click(function(){
					 if($(this).hasClass('disabled')){
						 return;
					 }
					 $('#sysTableModal',$el).modal('show')
					 						.find('#search').val('').end()
					 						.find('#selecting_div>div.lis span').removeAttr('style');
				 });
				 
				//应用短信配置确认按钮
				 $('.confirmBtn',$('#sysTableModal',$el)).click(function(){
					 var userId = $roleTable.row($('tr.selected',$('#roleTable'))).data().userid,
				 		appIds = $("#selected_div",$el).children().get().map(function(item,index){
							return $(item).attr('role-id');
						});
					 	app.common.ajaxWithAfa({
							 url: "MessSendConfigAction_setUserApp.do",
							 data:{
								 'userId':userId,
								 'appIds':appIds
							 }
						 }).done(function(data) {
							 if(data.result) {
								 app.alert('应用操作成功');
								 $('#sysTableModal',$el).modal('hide');
								 getTableData();
							 }else{
								 app.alert('应用操作失败');
							 }
						 });
				 });
				 
				 //应用短信配置模态窗搜索按钮
				 $('#search',$('#sysTableModal',$el)).on('blur',function(){
					 var val = $.trim($(this).val());
					 $('#selecting_div',$('#sysTableModal',$el)).find('div.lis span').removeAttr('style');
					 if(val==''){
						 return;
					 }
					 $('#selecting_div',$('#sysTableModal',$el)).find('div.lis').each(function(index,item){
						 if($(item).attr('role-name').indexOf(val)!=-1){
							 $(item).find('span').css({
								 'background-color':'red',
								 'color':'#fff'
							 }).end().prependTo('#selecting_div');
						 }
					 });
				 }).keyup(function(){
					 var val = $.trim($(this).val());
					 if(val==''){
						 $('#selecting_div',$('#sysTableModal',$el)).find('div.lis span').removeAttr('style');
					 }
				 });
				 $('#sysTableModal',$el).keydown(function(event){
					 if(event.keyCode == 13){
						 $('#search',$('#sysTableModal',$el)).blur();
					 }
				 });
		},
		
		unload:function(handler){

		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			getUserTableData();
		}
		
	}
});