define(["jquery"],function($){
	return {
		load:function($el,scope,handler){
			//用户信息列表
			var $dataTable = $('#dataTable', $el).DataTable({
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
		        },{
		        	data: 'role_a_tel',defaultContent: '-'//
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
			var EditFlag = false;
			var selectedObj = app.multiSelect({
				dataTable: $dataTable,
        		tableSelector: '#dataTable',
        		checkAllSelector: '#checkBoxAll',
        		optBtn: {
        			defaultDisabled: '#edit, #del',
        			onlySelectedOneEnabled: '#edit'
        		},
        		context: $el
			});
			
			getTableData();
			function getTableData() {
				$dataTable.clear().draw();
				selectedObj.clear();
				app.common.ajaxWithAfa({
					url: "MonitorCfgManagerAction_queryAllUserAndRole.do",
				}).done(function(data) {
					var result = data.funs;
					if(result && result.length > 0){
						$dataTable.rows.add(result).draw();
					}
				});
			}
			//获取模态窗分组下拉框
			getGroupTableData();
			function getGroupTableData() {
				var html = '';
				app.common.ajaxWithAfa({
					url: "MonitorCfgManagerAction_queryAllGroup.do",
				}).done(function(data) {
					var result = data.funs;
					if(result && result.length > 0){
						for(var i = 0; i<result.length; i++){
							html += '<span data-gid='+result[i].gid+'>'+result[i].name+'</span>';
						}
						$('#userManageSelect',$('#modal',$el)).html(html);
					}
				});
			}
			//获取模态窗角色下拉框
			getRoleData();
			function getRoleData() {
				var html = '<option value="-1">--请选择--</option>';
				app.common.ajaxWithAfa({
					url: "MonitorCfgManagerAction_queryAllRole.do",
				}).done(function(data) {
					var result = data.funs;
					if(result && result.length > 0){
						for(var i = 0; i < result.length; i++){
							html += '<option value="'+result[i].roleid+'">'+result[i].name+'</option>';
						}
						$('#roleId',$('#modal',$el)).html(html);
					}
				});
			}
			
			//点击新增按钮跳转到新增页面
		      $('#add', $el).click(function() {
		    	  var $this = $(this);
		    	  if($this.hasClass('disabled')) {
		    		  return;
		    	  }
		    	  $('#myModalLabel', $el).text('新增用户');
		    	  EditFlag = false;
		    	  $('[data-skip=info]',$('#modal',$el)).val('');
		    	  $('#userManageSelect>span',$('#modal',$el)).each(function(index,item){
	    			  $(item).removeClass('active');
				  });
		    	  $('#modal',$el).modal('show');
		      });
		      
		      //确认按钮
		      $('.confirmBtn',$('#modal',$el)).click(function(){
		    	  var obj = {},url,message;
		    	  if(!validateData()){
		    		  return;
		    	  }
		    	  $('[data-skip=info]',$('#modal',$el)).each(function(index,item){
		    		  obj[$(item).attr('id')] = $(item).val();
		    	  });
		    	  if($.trim($('#gids',$('#modal',$el)).val())){
		    		  obj['gids'] =  $('#userManageSelect>span.active',$('#modal',$el)).get().map(function(item,index){
		    			  return $(item).attr('data-gid');
		    		  });
		    	  }
		    	  if(EditFlag){
		    		  obj['userId'] = selectedObj.getSelectedValues("userid");
		    		  url = 'MessSendConfigAction_updateUser.do';
		    		  message = '修改';
		    	  }else{
		    		  url = 'MessSendConfigAction_addUser.do';
		    		  message = '新增';
		    	  }
		    	  submit(url,obj,message);
		      });
		      
		      function submit(url,obj,message){
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
		      }
		      
		      function validateData(){
					var validateResult = app.validate.validate({
						$context : $("#modal", $el),
						data:[{
							"id":"username",
							"filter":{
								"require":true,
								"type":"string",
							}
						},{
							"id":"telPhone",
							"filter":{
								"require":true,
								"maxLen":64,
								"type":"integer",
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
		        $('#myModalLabel', $el).text('修改用户');
		        $('[data-skip=info]',$('#modal',$el)).val('');
	    		$('#userManageSelect>span',$('#modal',$el)).each(function(index,item){
	    			  $(item).removeClass('active');
			    });
		        $('#modal',$el).modal('show');
		        EditFlag = true; 
		        app.common.ajaxWithAfa({
		    		  url: 'MessSendConfigAction_queryUserInfo.do',
		    		  data: {
		    			  'userId': selectedObj.getSelectedValues("userid")
		    		  }
		    	  }).done(function(data) {
		    		  for(var key in data.result){
		    			  $('#'+key,$('#modal',$el)).val(data.result[key]);
		    		  }
		    		  $('#gids',$('#modal',$el)).val(data.result.groups.map(function(item,index){return item.gname}).join(','));
		    		  $('#userManageSelect>span',$('#modal',$el)).each(function(index,item){
		    			  var gids = [];
		    			 // gids.push('software','virtualization');
		    		      gids=data.result.groups.map(function(a,index){return a.gid});
		    		      console.log(gids);
		    			  var gid = $(item).attr('data-gid');
		    			  console.log($.inArray('virtualization',gids)) 
				    		 if($.inArray(gid,gids) != -1){
				    			 $(item).addClass('active');
				    		 }
				    	  });
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
		    		  sBtnConfirm: '确定',  
		    		  sBtnCancel: '取消',  
		    		  fnConfirmHandler: function(){
		    			  app.shelter.show('正在删除...');
				    	  app.common.ajaxWithAfa({
				    		  url: 'MessSendConfigAction_delUser.do',
				    		  data: {
				    			  'userId': selectedObj.getSelectedValues("userid")
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
		      
		      //模态窗选择组点击事件
		      $('#gids',$('#modal',$el)).click(function(e){
		    	  e.stopPropagation();
		    	  $('#userManageSelect',$('#modal',$el)).show();
		      });
		      $('#modal',$el).click(function(){
		    	  $('#userManageSelect',$('#modal',$el)).hide();
		      });
		      $('#modal',$el).on('click','#userManageSelect>span',function(e){
		    	  e.stopPropagation();
		    	  $(this).toggleClass('active');
		    	  var result = [];
		    	  $('#userManageSelect>span.active',$('#modal',$el)).each(function(index,item){
		    		 result.push($(item).text());
		    	  });
		    	  $('#gids',$('#modal',$el)).val(result.join(','));
		      });

		},
		
		unload:function(handler){

		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});