define(["jquery"], function() {
  var nowPage, $dataTable;
  return {
    load: function($el, scope, handler) {
    	var $selectSendObj,//点击的发送对象按钮
    		roleSelectComponent,
    		userSelectComponent;
    	
    	var unsaveSendUserList;//未保存的发送用户列表
		var itemSourceMap = {
			1: '业务预警',
			2: '关键字预警',
			3: '自监控预警',
		};
		
    	$dataTable = $("#dataTable", $el).DataTable({
	        'bPaginate': true, //开关，是否显示分页器
	        'pagingType': 'full_numbers',
	        "ordering": false,
	        'pageLength': 15,
	        "searching": true,
	        "stateSave": true,
	        'columns': [{
	        	data: 'gid',
	        	render: function(data, type, row, meta) {
	        		return '<input type="checkbox" id="' + row.id + '" data-gid="'+row.gid+'" />'
	        	}
	        }, {
	        	data: 'item_source',defaultContent: '-',
	        	render: function(data, type, row, meta) {
	        		return itemSourceMap[data];
	        	}
	        }, {
	        	data: 'trigger_name',defaultContent: '-'//触发器名称
	        }, {
	        	data: 'display_name',defaultContent: '-',//指标
				render: function(data, type, row, meta) {
					if(row.category_name && data){
						return row.category_name+'_'+data;
					}else{
						return '-';
					}
				}
	        }, {
	        	data: 'name',defaultContent: '-'//指标英文名称
	        }, {
	        	data: 'alarmMeName',defaultContent: '-'//报警策略名称
	        }, {
	        	data: 'event_type',defaultContent: '-',//事件类型
	        	render: function(data, type, row, meta) {
	        		if(data == 0) {
	        			return '故障';
	        		} else if(data == 1) {
	        			return '预警';
	        		}else{
	        			return '信息';
	        		}
	        	}
	        }, {
	        	data: 'msgcontent', defaultContent: '-',//消息模板
	        }, {
	        	data: 'enabled',defaultContent: '-',//是否启动
	        	render: function(data) {
	        		if(data) {
	        			return '已启动';
	        		}else{
	        			return '未启动';
	        		}
	        	}
	        }, {
	        	data: 'messStatus',defaultContent: '-',//是否发送短信
	        	render: function(data) {
	        		if(data == 1){
	        			return '是';
	        		}else{
	        			return '否'
	        		}
	        	}
	        }, {
	        	data: '',defaultContent: '-',//是否启动
	        	render: function(data) {
	    			return '<a style="text-decoration:underline;color:#5b62f9;cursor: pointer;">发送对象</a>';
	        	}
	        }]
    	});
	      
	    //角色信息列表
	    var $roleTable = $('#appConfigAlarmStrategyRoleTb', $el).DataTable({
			'bPaginate': true, //开关，是否显示分页器
	        'pagingType': 'full_numbers',
	        "ordering": false,
	        'autoWidth': false,
	        'pageLength': 5,
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
		
		//用户信息列表
		var $userTable = $('#appConfigAlarmStrategyUserTb', $el).DataTable({
			'bPaginate': true, //开关，是否显示分页器
	        'pagingType': 'full_numbers',
	        "ordering": false,
	        'autoWidth': false,
	        'pageLength': 11,
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
		//角色分组列表
		var $roleGroupTable = $('#groupRole', $el).DataTable({
			'bPaginate': false, //开关，是否显示分页器
	        'pagingType': 'full_numbers',
	        "ordering": false,
	        'pageLength': 5,
	        "searching": false,
	        'scrollY':'150px',
	        'columns': [{
	        	data: 'name',defaultContent: '-',//
	        }, {
	        	data: 'gid',defaultContent: '-'//
	        }]
		});
		//短信启停列表
		var $startOrStopTable = $('#startOrStopTable', $el).DataTable({
			'bPaginate': false, //开关，是否显示分页器
			'pagingType': 'full_numbers',
			"ordering": false,
			'pageLength': 5,
			"searching": true,
			'scrollY':'150px',
			'columns': [{
				data: '',defaultContent: '-',//状态
				render: function(data, type, row, meta) {
					if(row.state==false){
						return '未保存'
					}else
						return '已保存'
	        	}
			}, {
				data: 'appName',defaultContent: '-'//应用名称
			}, {
				data: 'objNames',defaultContent: '-'//对象
			}, {
				data: 'time_scope',defaultContent: '-'//不发送短信时间
			}, {
				data: '',defaultContent: '-',//操作
				render: function(data, type, row, meta) {
	        		return '<a style="color: red;">删除</a>'
	        	}
			}]
		});
      
		var checkboxAll = app.multiSelect({
			dataTable: $dataTable,
			tableSelector: '#dataTable',
			checkAllSelector: '#checkboxAll',
			optBtn: {
				defaultDisabled: '#assign,#assignObject,#assignAll,#edit,#del,#startOrStop',
				onlySelectedOneEnabled: '#edit,#del,#startOrStop'
			},
			context: $el
		});  

		function getTableData() {
			$dataTable.clear().draw();
			app.shelter.show('正在加载数据，请稍等...');
			app.common.ajaxWithAfa({
				url: "MonitorCfgManagerAction_queryAllAlarmConfig.do",
				data:{
					// app_id:0,
					// obj_id:0,
					// metype:0
				}
			}).done(function(data) {
		  		app.shelter.hide();
		  		var result = data.cfgList;
		  		if(result && result.length > 0){
		  			$dataTable.rows.add(result).draw();
		  		}
		  	});
		}	      
      
      
		$("#refresh", $el).click(function() {
			var $t = $(this);
			$t.addClass('fa-spin');
			handler.setTimeout(function(){$t.removeClass('fa-spin')},1000);
			checkboxAll.clear();
			getTableData();
		}).click();

		//跳转到某页
		$("#toPage", $el).on("keydown", function(e) {
	        var e = e || window.event;
	        var keycode = e.keycode || e.which;
	        var leaf = parseInt($(this).val());
	        if(keycode === 13) {
	          $dataTable.page(leaf - 1).draw("page");
	        }
		})

		//启动
		$("#assignObject", $el).click(function() {
			if(!$(this).hasClass("disabled")) {
	    		var parms = 1;
	    		var message = "启动";
	    		stopOrStartTriggerFn(parms,message);
	    	}
		});
      
      //停止
      $("#assignAll", $el).click(function() {
    	  if(!$(this).hasClass("disabled")) { 
    		  var parms = 0;
    		  var message = "停止";
    		  stopOrStartTriggerFn(parms,message);
    	  }
      });

      function stopOrStartTriggerFn(parms,message) {
    	  var ids = checkboxAll.getSelectedValues('id');
    	  app.shelter.show('正在执行'+message+'操作，请稍等...');
    	  app.common.ajaxWithAfa({
    		  url  : "MonitorCfgManagerAction_stopOrStartTrigger.do",
    		  data:{
    			  triggerIds: ids,
    			  option: parms
    		  }
    	  }).done(function(data){
    		  app.shelter.hide();
    		  if(data.funs > 0){
    			  app.alert(message+'成功');
    			  $("#refresh", $el).click();
    		  }else{
				 app.alert('title', '操作失败');
    		  }
    	  });
      }
      
      $('#edit', $el).addClass('disabled');
      $('#del', $el).addClass('disabled');
      $('#startOrStop', $el).addClass('disabled');

      //点击发送对象
      $('#dataTable tbody', $el).on('click', 'a', function(e) {
    	  e.stopPropagation();
    	  var tr = $dataTable.row($(this).parents('tr')).data();
    	  $selectSendObj = $(this);
    	  
    	  getNoticeBytrigger_id(tr['id'], tr['event_type']);
      });
      
      //通过ID查询报警策略信息 初始化发送用户列表
		function getNoticeBytrigger_id(trigger_id, event_type){
			if(trigger_id){
				app.common.ajaxWithAfa({
					url  : "MonitorCfgManagerAction_queryAllUserAndRole.do",
					data:{
						'triggerId':trigger_id,
						'event_type':event_type
					}
				}).done(function(data){
					if(data && data.funs && data.funs.length>0){
						var notice_user_list = data.funs.map(function(fun,index){return fun.userid});
						unsaveSendUserList = notice_user_list;
						userSelectComponent.setSelectedItems('userid', unsaveSendUserList);
					}
					
					$('#userTabs li:first-child a', $el).trigger('click');
			    	$userTable.page(0).draw(false);
					
					$('#userRoleListTemp',$el).modal('show');
				});
			}
		}

      //点击新增按钮跳转到新增页面
      $('#add', $el).click(function() {
    	  var $this = $(this);

    	  if($this.hasClass('disabled')) {
    		  return;
    	  }
    	  app.dispatcher.load({
    		  title: "标准策略管理 - 新增报警策略配置",
    		  moduleId: "applicationConfiger",
    		  section: "alarmStrategyAlert", //alarmStrategyAlert
    		  params: {
    			  "isModify": false,
    		  }
    	  });
      });

      // 点击修改按钮跳转到修改页面
      $('#edit', $el).click(function() {
    	  if($(this).hasClass('disabled')) {
    		  return;
    	  }
    	  var gid = checkboxAll.getSelectedDatas()[0]["gid"];
    	  if(!gid){
    		  app.alert('策略ID不存在，不能修改');
    		  return;
    	  }
    	  app.dispatcher.load({
    		  title: "标准策略管理 -"+checkboxAll.getSelectedDatas()[0]['trigger_name']+"- 报警策略配置修改",
    		  moduleId: "applicationConfiger",
    		  section: "alarmStrategyAlert",
    		  params: {
    			  'gid': gid,
    			  'isModify': true,
    		  }
    	  });		        
      });
      
      $('#dataTable tbody', $el).on('dblclick', 'tr', function(e) {
    	  e.stopPropagation();
    	  var rowData = $dataTable.row($dataTable.$(this)).data();
    	  if(!rowData) return;
    	  
    	  var gid = rowData.gid;
    	  if(!gid){
    		  app.alert('策略ID不存在，不能修改');
    		  return;
    	  }
    	  app.dispatcher.load({
    		  title: "标准策略管理 -"+rowData['trigger_name']+"- 报警策略配置修改",
    		  moduleId: "applicationConfiger",
    		  section: "alarmStrategyAlert",
    		  params: {
    			  'gid': gid,
    			  'isModify': true,
    		  }
    	  });    	  
      });

      // 点击删除按钮
      $('#del', $el).click(function() {
    	  if($(this).hasClass('disabled')) {
    		  return;
    	  }
    	  $("#delModal", $el).modal("show");
      });

      // 确认删除
      $("#confirm", $("#delModal", $el)).click(function() {
    	  app.shelter.show('正在删除...');
    	  app.common.ajaxWithAfa({
    		  url: 'MonitorCfgManagerAction_updateMonitorCfg.do',
    		  data: {
    			  'flag': 2, //1 新增 2 删除  0修改
    			  'triggerId': checkboxAll.getSelectedDatas()[0]["id"]
    		  }
    	  }).done(function(data) {
    		  app.shelter.hide();
    		  $("#delModal", $el).modal("hide");
    		  if(data.result ) {
    			  app.alert('删除成功');
    			  $("#refresh", $el).click();
    		  }else{
    			  app.alert('删除失败');
    		  }
    	  });
      });
      
//    获得启停模态窗中的应用下拉框
      function getAllApp(){
    	  app.common.ajaxWithAfa({
    		  url: "ShowUserPrivilegeAction_getAppsData.do",
    		  //data : data,
    	  }).done(function(data) {
    		  $("#eventList-appName", $el).empty();
    		  var data_list = data.appView.appList;
    		  var html = '<option value="-1">--请选择--</option>';
    		  for(var i = 0; i < data_list.length; i++) {
    			  html += '<option value="' + data_list[i].appSummary.objectId + '">' + data_list[i].appSummary.appName + '</option>';
    		  }
    		  $('#startOrStopChooseApp',$('#startOrStopModal',$el)).html(html).comboSelect();
    		  //$('#startOrStopChooseApp',$('#startOrStopModal',$el)).on('change');
    		  $("#selecting_div,#selected_div",$el).empty();
    	  });
      }
      function getConfigerTable(){
    	  $startOrStopTable.clear().draw();
    	  app.common.ajaxWithAfa({
    		  url  : "MonitorCfgManagerAction_queryTriggerFilterObjs.do",
    		  data:{
    			  triggerId:checkboxAll.getSelectedDatas()[0]['id'],
    		  }
    	  }).done(function(data){
    		  var data = data.funs;
    		  if(data && data.length){
    			  $startOrStopTable.rows.add(data).draw();
    		  }
    	  });
      }
      $('#startTime1,#startTime2,#startTime3,#endTime1,#endTime2,#endTime3',$('#startOrStopModal',$el)).clockpicker({
    	  autoclose: true,
      });
   // 点击短信起停按钮
      $('#startOrStop', $el).click(function() {
    	  if($(this).hasClass('disabled')) {
    		  return;
    	  }
    	  getAllApp();
    	  getConfigerTable();
    	  for(var item in checkboxAll.getSelectedDatas()[0]){
    		  $('.startOrStopDetail #'+item,$('#startOrStopModal',$el)).text(checkboxAll.getSelectedDatas()[0][item]).attr('title',checkboxAll.getSelectedDatas()[0][item]);
    	  }
    	  if(checkboxAll.getSelectedDatas()[0].messStatus==1){
    		  $('#sendMessage',$('#startOrStopModal',$el)).addClass('true')
    		  $('#sendMessage',$('#startOrStopModal',$el)).parent().parent().parent().find('input[data-time]').val('').removeAttr('disabled');
    		  $('#saveTr',$('#startOrStopModal',$el)).removeAttr('disabled');
    	  }else{
    		  $('#sendMessage',$('#startOrStopModal',$el)).removeClass('true')
    		  $('#sendMessage',$('#startOrStopModal',$el)).parent().parent().parent().find('input[data-time]').val('').attr('disabled','disabled');
    		  $('#saveTr',$('#startOrStopModal',$el)).attr('disabled','disabled');
    	  }
    	  $('#startOrStopModal',$el).modal('show');
      });
      
      var rowData;
//      应用下拉框change
      $('#startOrStopChooseApp',$('#startOrStopModal',$el)).on('change',function(){
    	  if($(this).val()==''){
    		  $("#selecting_div",$el).empty();
    		  $("#selected_div",$el).empty();
    	  }
    	  app.common.ajaxWithAfa({
    		  url  : "MonitorCfgManagerAction_queryAllObjsByCate.do",
    		  data:{
    			  triggerId:checkboxAll.getSelectedDatas()[0]['id'],
				  app_id: $(this).val()
    		  }
    	  }).done(function(data){
    		  if(!rowData) {
    			  $startOrStopTable.$('tr.selected').removeClass('selected');
    		  }
    		  var Temp2='',Temp='',funs= data.funs;
    		  
    		  funs.forEach(function(role,index){
    			  if(rowData) {
    				  var objIds = rowData.objIds.split('#');
    				  var flag = false;
    				  for(var i = 0; i < objIds.length; i++) {
    					  if(objIds[i] == role.obj_id){
    	    				  Temp2 += '<div class="yixuanze" role-name="'+role.obj_name+'" role-id="'+role.obj_id+'"><span>'+role.obj_name+'<img class="jian" src="img/workList/jian.png" /></span></div>';
    	    				  flag = true;
    	    				  break;
    	    			  }
    				  }
    				  if(!flag) {
	    				  Temp += '<div class="lis" role-name="'+role.obj_name+'" role-id="'+role.obj_id+'"><div class="daixuanze"><span><img class="jia" src="img/workList/jia.png" />'+role.obj_name+'</span></div></div>';
    				  }
    			  } else {
    				  Temp += '<div class="lis" role-name="'+role.obj_name+'" role-id="'+role.obj_id+'"><div class="daixuanze"><span><img class="jia" src="img/workList/jia.png" />'+role.obj_name+'</span></div></div>';
    			  }
    		  });
    		  
    		  $("#selecting_div",$el).empty().append(Temp);
    		  $("#selected_div",$el).empty().append(Temp2);
    		  rowData = null;
    	  });
      });
      
      $('#sendMessage',$('#startOrStopModal',$el)).on('click',function(){
    	  if($(this).hasClass('true')){
    		  $(this).parent().parent().parent().find('input[data-time]').val('').attr('disabled','disabled');
    		  $('#saveTr',$('#startOrStopModal',$el)).attr('disabled','disabled');
    	  }else{
    		  $(this).parent().parent().parent().find('input[data-time]').val('').removeAttr('disabled');
    		  $('#saveTr',$('#startOrStopModal',$el)).removeAttr('disabled');
    	  }
      });
      
      //列表中移除对象
      $("#selected_div",$('#startOrStopModal',$el)).delegate(".yixuanze","click",function(){
    	  var rid = $(this).attr('role-id');
    	  var rname = $(this).find('span').text();
    	  var Temp = '<div class="lis" role-name="'+rname+'" role-id="'+rid+'"><div class="daixuanze"><span><img class="jia" src="img/workList/jia.png" />'+rname+'</span></div></div>';
    	  $("#selecting_div",$el).append(Temp);
    	  $(this).remove();
      });
      
      //列表中添加对象
      $("#selecting_div",$('#startOrStopModal',$el)).delegate(".lis",'click',function(){
    	  //判断能否新增数据到被选中的列表行中去
    	  var rid = $(this).attr('role-id');
    	  var rname = $(this).find('span').text();
    	  var Temp2 = '<div role-id="'+rid+'" role-name="'+rname+'" class="yixuanze"><span>'+rname+'<img class="jian" src="img/workList/jian.png" /></span></div>';
    	  $("#selected_div",$el).append(Temp2);
    	  $(this).remove();
      });
      
      //启停模态窗确认按钮
      $('#confirm',$('#startOrStopModal',$el)).click(function(){
    	  var obj = {};
    	  var sendMessBtn = $('#sendMessage',$('#startOrStopModal',$el)).hasClass('true')?1:0;
    	  $('#startOrStopTable',$('#startOrStopModal',$el)).find('tbody>tr').get().forEach(function(item,index){
    		  var tr = $startOrStopTable.row($(item)).data();
    		  if($.isEmptyObject(tr)){
    			  return ;
    		  }
    		  obj[tr.appId] = {
    				  "objIds": tr.objIds,
    				  "time_scope":tr.time_scope
    		  }
    	  });
    	  app.common.ajaxWithAfa({
    		  url  : "MonitorCfgManagerAction_addFiterToTrigger.do",
    		  data:{
    			  'triggerId': checkboxAll.getSelectedDatas()[0]['id'],
    			  'messStatus': sendMessBtn,
    			  'fiter': JSON.stringify({
					  "messfiter":obj
					})
    		  }
    	  }).done(function(data){
    		  if(data.addFiterToTrigger){
    			  app.alert('保存成功');
    			  $("#refresh", $el).click();
    			  $('#startOrStopModal',$el).modal('hide');
    		  }else {
    			  app.alert('保存失败');
    		  }
    	  });
      });
      
//      重置
      $('#reset',$('#startOrStopModal',$el)).click(function(){
    	  resetConfig();
      });
//      新增
      $('#saveTr',$('#startOrStopModal',$el)).click(function(){
    	  var appName = $('#startOrStopChooseApp option:selected',$('#startOrStopModal',$el)).text();
    	  var appId = $('#startOrStopChooseApp',$('#startOrStopModal',$el)).val();
    	  if(appId=='-1'){
    		  app.alert('请选择应用');
    		  return;
    	  }
    	  var objNames = $("#selected_div",$el).children().get().map(function(item,index){
    		  return $(item).attr('role-name');
    	  }).join(',');

    	  var objIds = $("#selected_div",$el).children().get().map(function(item,index){
    		  return $(item).attr('role-id');
    	  }).join('#');
    	  
    	  if(objIds==''){
    		  app.alert('请选择应用对象');
    		  return;
    	  }
    	  var startTime1 = $('#startTime1',$('#startOrStopModal',$el)).val();
    	  var startTime2 = $('#startTime2',$('#startOrStopModal',$el)).val();
    	  var startTime3 = $('#startTime3',$('#startOrStopModal',$el)).val();
    	  var endTime1 = $('#endTime1',$('#startOrStopModal',$el)).val();
    	  var endTime2 = $('#endTime2',$('#startOrStopModal',$el)).val();
    	  var endTime3 = $('#endTime3',$('#startOrStopModal',$el)).val();
    	  var time=[];
    	  if(startTime1!='' ^ endTime1!='') {
    		  app.alert('选择时间段1没填写完整');
    		  return;
    	  }else if(startTime2!='' ^ endTime2!='') {
    		  app.alert('选择时间段2没填写完整');
    		  return;
    	  }else if(startTime3!='' ^ endTime3!='') {
    		  app.alert('选择时间段3没填写完整');
    		  return;
    	  }
    	  if(startTime1!='' && endTime1!='' ) {
    		  if(startTime1<endTime1){
    			  time.push(startTime1+'-'+endTime1);
    		  }else{
        		  app.alert('时间段1起始时间应小于结束时间');
        		  return;
        	  }
    	  }
    	  if(startTime2!='' && endTime2!='' ) {
    		  if(startTime2<endTime2){
    			  time.push(startTime2+'-'+endTime2);
    		  }else{
    			  app.alert('时间段2起始时间应小于结束时间');
    			  return;
    		  }
    	  }
    	  if(startTime3!='' && endTime3!='' ) {
    		  if(startTime3<endTime3){
    			  time.push(startTime3+'-'+endTime3);
    		  }else{
    			  app.alert('时间段3起始时间应小于结束时间');
    			  return;
    		  }
    	  }
    	  //先删除原应用id数据，再插入表格
    	  $('#startOrStopTable',$('#startOrStopModal',$el)).find('tbody>tr').get().forEach(function(item,index){
    		  var tr = $startOrStopTable.row($(item)).data();
    		  if(!$.isEmptyObject(tr)&&tr.appId == appId){
    			  $(item).find('a').click();
    		  }
    	  });
    	  
    	  var tbData = $startOrStopTable.data();
    	  tbData.unshift({
    		  'appId':appId,
    		  'appName':appName,
    		  'objIds':objIds,
    		  'objNames':objNames,
    		  'time_scope':time.join('#'),
    		  'state':false
    	  });
    	  
    	  $startOrStopTable.clear().rows.add(tbData).draw();
    	  
    	  resetConfig();
      });
      function resetConfig(){
    	  $('#startOrStopChooseApp',$('#startOrStopModal',$el)).val('-1').change();
    	  $('#sendMessage',$('#startOrStopModal',$el)).parent().parent().parent().find('input[data-time]').val('');
      }
      //启停模态窗搜索按钮
      $('#search',$('#startOrStopModal',$el)).on('blur',function(){
    	  var val = $.trim($(this).val());
    	  $('#selecting_div',$('#startOrStopModal',$el)).find('div.lis span').removeAttr('style');
    	  if(val==''){
    		  return;
    	  }
    	  $('#selecting_div',$('#startOrStopModal',$el)).find('div.lis').each(function(index,item){
    		  if($(item).attr('role-name').indexOf(val)!=-1){
    			  $(item).find('span').css({
    				  'background-color':'yellow',
    				  'color':'#000'
    			  }).end().prependTo('#selecting_div');
    		  }
    	  });
      }).keyup(function(){
    	  var val = $.trim($(this).val());
    	  if(val==''){
    		  $('#selecting_div',$('#startOrStopModal',$el)).find('div.lis span').removeAttr('style');
    	  }
      });
      $('#startOrStopModal',$el).keydown(function(event){
    	  if(event.keyCode == 13){
    		  $('#search',$('#startOrStopModal',$el)).blur();
    	  }
      });
      
    //启停模态窗点击表格行
      $('#startOrStopTable',$('#startOrStopModal',$el)).on('click','tbody>tr',function(){
    	  if($(this).children('td').hasClass('dataTables_empty')) {
    		  return false;
    	  }

    	  $('tr.selected', $el).not(this).removeClass('selected');
    	  $(this).toggleClass('selected');
    	  $('#startOrStopChooseApp', $('#startOrStopModal',$el)).val('-1');
    	  $('.combo-input', $('#startOrStopModal',$el)).val('--请选择--');
    	  $("#selecting_div",$el).empty();
		  $("#selected_div",$el).empty();
    	  $('#sendMessage',$('#startOrStopModal',$el)).parent().parent().parent().find('input[data-time]').val('');
    	  
    	  if($(this).hasClass('selected')){
    		  var tr = $startOrStopTable.row($(this)).data();
    		  rowData = tr;
    		  $('#startOrStopChooseApp',$('#startOrStopModal',$el)).val(tr.appId).change();
    		  tr['time_scope'].split('#').forEach(function(item,index){
    			  var time = item.split('-');
    			  if(index==0){
    				  $('#startTime1',$('#startOrStopModal',$el)).val(time[0]);
    		    	  $('#endTime1',$('#startOrStopModal',$el)).val(time[1]);
    			  }else if(index == 1){
    				  $('#startTime2',$('#startOrStopModal',$el)).val(time[0]);
    				  $('#endTime2',$('#startOrStopModal',$el)).val(time[1]);
    			  }else if(index == 2){
    				  $('#startTime3',$('#startOrStopModal',$el)).val(time[0]);
    				  $('#endTime3',$('#startOrStopModal',$el)).val(time[1]);
    			  }
    		  });
    	  }
      });
      
      $('#startOrStopTable',$('#startOrStopModal',$el)).on('click','a',function(e){
    	  e.stopPropagation();
    	  $startOrStopTable.row( $(this).parents('tr')).remove().draw();
      }); 
      
      initUserTable();
      function initUserTable(){
			getRoleGroupTableData();
			getRoleOrUserTableData($userTable);
		}
		
		function getRoleGroupTableData() {
			$roleGroupTable.clear().draw();
			app.common.ajaxWithAfa({
				url: "MonitorCfgManagerAction_queryAllGroup.do",
			}).done(function(data) {
				var result = data.funs;
				if(result && result.length > 0){
					$roleGroupTable.rows.add(result).draw();
				}
			});
		}
		
		function changeUnsaveSendUserList() {
			if(roleSelectComponent) {
				var userids = roleSelectComponent.getSelectedValues('userid');

				var unselectedUserids = [];//未选中的用户id列表
				$roleTable.$('input:not(:checked)').each(function(i, item) {
					unselectedUserids.push($roleTable.rows($(item).parents('tr')).data()[0].userid);
				});
				if(unselectedUserids.length && unsaveSendUserList) {
					for(var i = 0; i < unsaveSendUserList.length; i++) {
						var flag = false;
						for(var j = 0; j < unselectedUserids.length; j++) {
							if(unsaveSendUserList[i] == unselectedUserids[j]) {
								unsaveSendUserList.splice(i, 1);
								flag = true;
								break;
							}
						}
						flag && --i;
					}
				}
				
				if(unsaveSendUserList) {
					if(userids) {
						unsaveSendUserList = _.uniq(unsaveSendUserList.concat(userids));
					}						
				} else {
					unsaveSendUserList = userids;
				}
			}
		}
		
		$('#groupRole',$el).on('click','tbody>tr',function(){
			var tr = $roleGroupTable.row(this).data();
			$(this).addClass('selected').siblings().removeClass('selected');
			var gid = tr.gid;
			
			changeUnsaveSendUserList();		
			
			roleSelectComponent && roleSelectComponent.clear();
			getRoleOrUserTableData($roleTable,gid);
		});
		
		function getRoleOrUserTableData($table,gid) {
			$table.clear().draw();
			app.common.ajaxWithAfa({
				url: "MonitorCfgManagerAction_queryAllUserAndRole.do",
				data:{
					'gid':gid
				}
			}).done(function(data) {
				var result = data.funs;
				if(result && result.length > 0){
					$table.rows.add(result).draw();
					if(gid){
						!roleSelectComponent && initRoleSelect();
						roleSelectComponent.setSelectedItems('userid', unsaveSendUserList);
					}else{
						//初始化多选插件
						!userSelectComponent && initUserSelect();
					}
				}
				else{
					!userSelectComponent && initUserSelect();
				}
			});
		}
		
		function initRoleSelect(){
			//角色列表
			roleSelectComponent = app.multiSelect({
				dataTable: $roleTable,
        		tableSelector: '#appConfigAlarmStrategyRoleTb',
        		checkAllSelector: '#appConfigAlarmStrategyRoleSelAllBtn',
        		context: $el
			});
		}
		
		function initUserSelect(){
			//用户列表
			userSelectComponent = app.multiSelect({
				dataTable: $userTable,
        		tableSelector: '#appConfigAlarmStrategyUserTb',
        		checkAllSelector: '#appConfigAlarmStrategyUserSelAllBtn',
        		context: $el
			});
		}
		
		//分组和用户列表切换
		$('#userTabs li', $el).click(function() {
			var index = $(this).index();
			if(index == 0) {
				unsaveSendUserList = userSelectComponent.getSelectedValues('userid');
				
				roleSelectComponent && roleSelectComponent.clear();
				roleSelectComponent && roleSelectComponent.setSelectedItems('userid', unsaveSendUserList);
			} else {
				changeUnsaveSendUserList();					
				userSelectComponent.clear();
				userSelectComponent.setSelectedItems('userid', unsaveSendUserList);
			}
		});
		
		//发送对象模态窗保存按钮
		$('#userRoleListTemp',$el).on('click','#confirm',function(){		
			var index = $('#userTabs li.active', $el).index();
			if(index == 0 && roleSelectComponent) {
				changeUnsaveSendUserList();
			} else {
				unsaveSendUserList = userSelectComponent.getSelectedValues('userid');
			}
			
			var id = $dataTable.row($selectSendObj.parents('tr')).data().id;
			app.common.ajaxWithAfa({
				url: "MonitorCfgManagerAction_reSetAllUser.do",
				data:{
					'triggerId': id,
					'userIds': unsaveSendUserList
				}
			}).done(function(data) {
				if(data && data.funs && data.funs>0){
					app.alert('修改发送用户成功');
					$('#userRoleListTemp',$el).modal('hide');
					$("#refresh", $el).click();
				}
			});
			
			unsaveSendUserList = null;
			roleSelectComponent && roleSelectComponent.clear();
			userSelectComponent.clear();
		});
      
    },
    unload: function(handler) {
    	
    },
    pause: function($el, attr, handler) {
    	nowPage = $dataTable.page();
    },
    resume: function($el, attr, handler) {
    	$('.truthAlarmStrategy-buttons .delBtn', $el).addClass('disabled');
    	$('.truthAlarmStrategy-buttons .editBtn', $el).addClass('disabled');
    	$('#assign', $el).addClass('disabled');
    	$('#assignObject', $el).addClass('disabled');
    	$('#assignAll', $el).addClass('disabled');
    	$('#startOrStop', $el).addClass('disabled');
    	$("#refresh", $el).click();
    	$dataTable.page(nowPage).draw(false);
    }
  };
}); 