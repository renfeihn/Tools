define([ "jquery" ], function() {
	var $effect_Day=null,
		$start_time=null,
		$end_time=null,
		userSelectComponent,
		roleSelectComponent;
	return {
		load : function($el, scope, handler) {			
			var textAreaPosition,
				$clickTextArea,
				$selectSendObj,//选择发送用户按钮,点击弹出角色用户列表弹出模态窗
				$selectSendObjModal = $('#appConfigAlarmStrategyUserRoleListTemp', $el),// 角色用户列表弹出模态窗
				$tableAddCtn = $('.appConfigAlarmStrategy-kpi-addCtn', $el),//配置表格中的初始行
				$noticeStrategyCtn = $('.appConfigAlarmStrategy-notice', $el),//通知配置块
				$eaWarnStrategyCtn = $('.appConfigAlarmStrategy-eaWarn', $el),//预警配置块
				$warnStrategyCtn = $('.appConfigAlarmStrategy-warn', $el),//告警配置块
				$kpiSelect = $('[data-role="monitorKpi"]', $el),//表格中监控指标
				$kpiSubAll = $('[data-role="kpiSub"]', $el),//表格中指标项列表
				$kpiVarCtn = $('.appConfigAlarmStrategy-warn-ctn-var-ctn', $el),//替换变量最外层div
				$noticeEl = $('.appConfigAlarmStrategy-notice-ctn', $el),//通知配置信息块
				$eaWarnEl = $('.appConfigAlarmStrategy-eaWarn-ctn', $el),//预警配置信息块
				$warnEl = $('.appConfigAlarmStrategy-warn-ctn', $el),//告警配置信息块
				app_id = scope.app_id,
				obj_id = scope.obj_id,
				alter_id = scope.gid,//标志策略id
				isModify = scope.isModify;//标志是否为策略修改
			
			var unsaveSendUserList;//未保存的发送用户列表
			
			//角色信息列表
			$roleTable = $('#appConfigAlarmStrategyRoleTb', $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
		        'pagingType': 'full_numbers',
		        "ordering": false,
		        "autoWidth": false,
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
			$userTable = $('#appConfigAlarmStrategyUserTb', $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
		        'pagingType': 'full_numbers',
		        "autoWidth": false,
		        "ordering": false,
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
			$roleGroupTable = $('#groupRole', $el).DataTable({
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
			//时间控件初始化
		    $('#startDate', $el).datetimepicker({
		        step:5,  
//			        maxTime:true, 
//			        maxDate:new Date(),
		        format: 'Y-m-d',
		        timepicker: false,
		        parentID: $('#startDate', $el).parent()
		    })
		    $('#endDate', $el).datetimepicker({
		        step:5  ,  
//			        maxTime:true, //设置时间间隔为5分钟
//			        maxDate:new Date(),
		        format: 'Y-m-d',
		        timepicker: false,
		        parentID: $('#endDate', $el).parent()
		    })
		    
		    $('#startTime', $el).datetimepicker({
		        step:5,  
//			        maxTime:true, 
//			        maxDate:new Date(),
		        datepicker: false,
		        format: 'H:i',
		        parentID: $('#startTime', $el).parent()
		    })
		    $('#endTime', $el).datetimepicker({
		        step:5  ,  
//			        maxTime:true, //设置时间间隔为5分钟
//			        maxDate:new Date(),
		        format: 'H:i',
		        datepicker: false,
		        parentID: $('#endTime', $el).parent()
		    })
		    
		    $("#editstate", $el).bootstrapSwitch({
		            'state': true
	        });
		    
			$('[data-role=isSendRecMsg]', $el).bootstrapSwitch({
				'state': true
			});
			$('[data-role=isRecoverable]', $el).bootstrapSwitch({
				'state': true
			});
		    
		    $('[data-role=alertMethod]', $el).click(function(e){
				var $this = $(this);
				
				if(!$this.hasClass('appConfigAlarmStrategy-base-ctn-items-select-hover')){
					$this.children('div').show();
					$this.addClass('appConfigAlarmStrategy-base-ctn-items-select-hover');
					
					if($this.index()=='0'){
						$noticeStrategyCtn.fadeIn();
					}else if($this.index()=='1'){
						$eaWarnStrategyCtn.fadeIn();
					}else if($this.index()=='2'){
						$warnStrategyCtn.fadeIn();
					}
				}else {
					$this.children('div').hide();
					$this.removeClass('appConfigAlarmStrategy-base-ctn-items-select-hover');
					
					if($this.index()=='0'){
						$noticeStrategyCtn.fadeOut();
					}else if($this.index()=='1'){
						$eaWarnStrategyCtn.fadeOut();
					}else if($this.index()=='2'){
						$warnStrategyCtn.fadeOut();
					}
				}
			});
			
			$('.appConfigAlarmStrategy-base-ctn-items-select', $('.appConfigAlarmStrategy-base-ctn-time-items',$el)).click(function(e){
				var $this = $(this);
				
				if(!$this.hasClass('appConfigAlarmStrategy-base-ctn-items-select-hover')){
					$this.children('div').show();
					$this.addClass('appConfigAlarmStrategy-base-ctn-items-select-hover');
				}else {
					$this.children('div').hide();
					$this.removeClass('appConfigAlarmStrategy-base-ctn-items-select-hover');
				}
			});
			
			//选择配置表格中的监控指标，初始化指标项
			$el.on('change','[data-role=monitorKpi]',function(){
				var $this = $(this),
					$parentCtn = $this.parents('tr'),//当前行
					$kpiSubSelect = $('[data-role="kpiSub"]', $parentCtn);//指标项
				//监控指标改变后，指标项、阀值、与或表达式、条件都重新制空
				$('[data-role="monitorKpi"]', $parentCtn).not($this).val($this.val());
				$('[data-role="kpiSub"]', $parentCtn).val('');
				$('[data-role="condition"]', $parentCtn).empty().append('<option>--请选择--</option>').val('');
				$('[data-role="threshold"]', $parentCtn).val('');
				$('[data-role="rmeid"]', $parentCtn).empty().append('<option>--请选择--</option>').val('');
				$('[data-role="recoverValue"]', $parentCtn).val('');
				$('[data-role="andOr"]', $parentCtn).val('');
				
				if($this.val()&&$this.val()!='--请选择--'){
					
					app.common.ajaxWithAfa({
						"url": "MonitorCfgManagerAction_queryAllMetricItem.do",
						"data": {
							'metricKind':$this.val()
						},
					}).done(function(data){
						if(data && data.metricItems){
							var metricKinds = data.metricItems;
							$kpiSubSelect.empty().append('<option>--请选择--</option>');
							
							for(var i=0; i<metricKinds.length; i++){
								$kpiSubSelect.append('<option data-item="'+metricKinds[i]['item']+'" data-mitId="'+metricKinds[i]['id']+'" value="'+metricKinds[i]['id']+'">'+metricKinds[i]['display_name']+'</option>');
							}
							//初始化可搜索下拉框
							$kpiSubSelect.siblings('.tinyselect').remove();
							$kpiSubSelect.tinyselect();
							
							updateVarCtn($kpiSubSelect);
						}
					});
					
				}else if($this.val()=='--请选择--'){
					$kpiSubSelect.empty().append('<option>--请选择--</option>');
				}
			});
	
			//选择配置表格中的监控指标项，初始化条件表达式
			$el.on('change','[data-role=kpiSub]',function(){
				var $this = $(this),
					$parentCtn = $this.parents('tr'),//当前行
					$condition = $('[data-role="condition"]', $parentCtn),//当前行条件表达式
					$rmeid = $('[data-role="rmeid"]', $parentCtn);//自动恢复表达式
				if($this.val()&&$this.val()!='--请选择--'){
					initCondition($this.val(),$condition);
					initCondition($this.val(),$rmeid);
				}else{
					$condition.empty().append('<option>--请选择--</option>');
				}
			});			
			
			//点击公共“变量”事件
			$el.on('click','.appConfigAlarmStrategy-warn-var-item',function(){
				if($clickTextArea){
					var $this = $(this),
						dataItem = $this.attr('data-item'),
						dataMitid = $this.attr('data-mitid'),
						thisValue = $this.text(),
						thisSelStart = $clickTextArea[0].selectionStart,
						thisSelEnd = $clickTextArea[0].selectionEnd;
					
					if(thisSelStart>=0){
						var content = $clickTextArea.val();
						$clickTextArea.val(content.substring(0, thisSelStart)+thisValue+content.substring(thisSelEnd));
					}
				}else{
					app.alert('请选择需要替换的文本！');
				}
			});

			//点击信息配置，确定$clickTextArea
			$('#appConfigAlarmStrategyWarnMsg, #appConfigAlarmStrategyRecMsg, #appConfigAlarmStrategyAdvice', $el).click(function(){
				var $this = $(this);
				$clickTextArea = $(this);
			});
			
			this.delegateEvents({
				//按时段报警
				'click [data-role=timeAlert]':function(){
					var $this = $(this),
						$sMask = $('.appConfigAlarmStrategy-time-mask', $el);//时段为否时显示遮罩
					$this.index()==1?$sMask.fadeIn():$sMask.fadeOut();
				},
				//复制配置信息btn
			    'click [data-role=configCopyBtn]':function(){
			    	var $this = $(this),
				    	noticeCtn = '.appConfigAlarmStrategy-notice-ctn',
				    	eaWarnCtn = '.appConfigAlarmStrategy-eaWarn-ctn',
				    	warnCtn = '.appConfigAlarmStrategy-warn-ctn',
				    	eSendObj = '#appConfigAlarmStrategyObjEmailUser',
				    	mSendObj = '#appConfigAlarmStrategyObjMsgUser',
				    	$thisCtn,
				    	$thatCtn;
			    	if($this.attr('id')=='appConfigAlarmStrategyNoticeCopyBtn'){
			    		$thisCtn=$(noticeCtn, $el);
			    		$thatCtn=$(eaWarnCtn, $el);
			    	}else if($this.attr('id')=='appConfigAlarmStrategyEaWarnCopyBtn'){
			    		$thisCtn=$(eaWarnCtn, $el);
			    		$thatCtn=$(warnCtn, $el);
			    	}else if($this.attr('id')=='appConfigAlarmStrategyWarnCopyBtn'){
			    		$thisCtn=$(warnCtn, $el); 
			    		$thatCtn=$(eaWarnCtn, $el); 
			    	}
			    	//1. 基本策略配置
			    	$('[data-role=alertType]', $thisCtn).val($('[data-role=alertType]', $thatCtn).val()).trigger('change');
			    	$('[data-role=contintCount]', $thisCtn).val($('[data-role=contintCount]', $thatCtn).val());
			    	$('[data-role=alertLevel]', $thisCtn).eq($('[data-role=alertLevel]:checked', $thatCtn).index()).attr('checked','checked');//报警级别
			    	$('[data-role=isContinueAlarm]', $thisCtn).bootstrapSwitch('state', $('[data-role=isContinueAlarm]', $thatCtn).bootstrapSwitch('state'));
			    	$('[data-role=isSendRecMsg]', $thisCtn).bootstrapSwitch('state', $('[data-role=isSendRecMsg]', $thatCtn).bootstrapSwitch('state'));
			    	//2. 策略发送对象
			    	$.each($('.appConfigAlarmStrategy-stragedy-obj', $thatCtn), function(index, sObj){
			    		var sIx = $(sObj).index();
			    		if($(sObj).hasClass('appConfigAlarmStrategy-stragedy-obj-clicked')){
				    		$('.appConfigAlarmStrategy-stragedy-obj', $thisCtn).eq(sIx).addClass('appConfigAlarmStrategy-stragedy-obj-clicked');
				    		$('.appConfigAlarmStrategy-msg-userList', $thisCtn).eq(sIx).fadeIn();
				    	}else {
				    		$('.appConfigAlarmStrategy-stragedy-obj', $thisCtn).eq(sIx).removeClass('appConfigAlarmStrategy-stragedy-obj-clicked');
				    		$('.appConfigAlarmStrategy-msg-userList', $thisCtn).eq(sIx).fadeOut();
				    	}
			    	});
			    	$(eSendObj, $thisCtn).attr('data-senduser', $(eSendObj, $thatCtn).attr('data-senduser'));
			    	$(mSendObj, $thisCtn).attr('data-senduser', $(mSendObj, $thatCtn).attr('data-senduser'));
			    	
			    	//3. 策略表达式
			    	var $thisTable = $('.appConfigAlarmStrategy-kpi-table', $thisCtn),
			    		$thatTable = $('.appConfigAlarmStrategy-kpi-table', $thatCtn);
			    	
			    	$thisTable.empty().append($thatTable.children('table').clone(true));
			    	
			    	var $thisTrs = $thisTable.find('tbody').find('tr'),
			    		$thatTrs = $thatTable.find('tbody').find('tr');
			    	
			    	//删除function_id
			    	$thisTrs&&$thisTrs.removeAttr('data-functionId');
			    	
			    	if($thisTrs.length==0){
			    		var $thisMKpi = $('[data-role=monitorKpi]', $thisTable),
							$thisKSub = $('[data-role=kpiSub]', $thisTable);
			    		
			    		//更新tinyselect
						$thisMKpi.siblings('.tinyselect').remove();
						$thisMKpi.tinyselect();
			    	}else {
			    		//初始化数据
				    	for(var i=0; i< $thisTrs.length; i++){
				    		var $thisMKpi = $('[data-role=monitorKpi]', $($thisTrs[i])),
								$thisKSub = $('[data-role=kpiSub]', $($thisTrs[i])),
								$thisCond = $('[data-role=condition]', $($thisTrs[i])),
								$thisRmeid = $('[data-role=rmeid]', $($thisTrs[i])),
								$thisAOr = $('[data-role=andOr]', $($thisTrs[i])),
								$thatMKpi = $('[data-role=monitorKpi]', $($thatTrs[i])),
								$thatKSub = $('[data-role=kpiSub]', $($thatTrs[i])),
								$thatCond = $('[data-role=condition]', $($thatTrs[i])),
								$thatRmeid = $('[data-role=rmeid]', $($thatTrs[i])),
								$thatAOr = $('[data-role=andOr]', $($thatTrs[i]));
				    		
				    		$thisMKpi.val($thatMKpi.val());
				    		$thisKSub.val($thatKSub.val());
							$thisCond.val($thatCond.val());
							$thisRmeid.val($thatRmeid.val());
							$thisAOr.val($thatAOr.val()+'');
							//更新tinyselect
							$thisMKpi.siblings('.tinyselect').remove();
							$thisMKpi.tinyselect();
							$thisKSub.siblings('.tinyselect').remove();
							$thisKSub.tinyselect();
				    	}
			    	}
			    },
				//预警周期
				'click .appConfigAlarmStrategy-base-ctn-items-right-cycle':function(e){
					var $this = $(this),
					hover = 'appConfigAlarmStrategy-base-ctn-items-right-cycle-hover';
					
					if(!$this.hasClass(hover)){
						$this.addClass(hover);
						$this.siblings().removeClass(hover);
					}
					
					var $weekSelect = $this.parents('.appConfigAlarmStrategy-base-ctn-time-items').next(),
					$timeSelect = $weekSelect.next(),
					$weekNoSelect = $timeSelect.next();
					
					if($this.index()==0){
						$weekSelect.show();
						$timeSelect.hide();
						$weekNoSelect.hide();
						$('.appConfigAlarmStrategy-base-ctn-items-select',$weekSelect).css('cursor','pointer');
					}else if($this.index()==1){
						$weekNoSelect.hide();
						$weekSelect.hide();
						$timeSelect.show();
					}else if($this.index()==2){
						$weekNoSelect.show();
						$weekSelect.hide();
						$timeSelect.hide();
					}else if($this.index()==3||$this.index()==4){
						$weekSelect.hide();
						$timeSelect.hide();
						$weekNoSelect.show();
					}
					
				},
				
				'click .appConfigAlarmStrategy-base-time-panel td':function(){
					var $this = $(this);
					
					hover = 'appConfigAlarmStrategy-base-time-panel-td-hover';
					if(!$this.hasClass(hover)){
						$this.addClass(hover)
					}else{
						$this.removeClass(hover)
					}
					
					var $allTd = $('.appConfigAlarmStrategy-base-time-panel td.appConfigAlarmStrategy-base-time-panel-td-hover', $el),
					timeSelect = [];
					
					$.each($allTd, function(index, td){
						timeSelect.push($(td).text());
					});
					
					var timeStr = timeSelect.join(',');
					
					if(timeStr.indexOf(',最后一天')>0){
						timeStr = 'L,'+timeStr.replace(',最后一天','');
					}
					
					if(timeStr.indexOf('最后一天')==0){
						timeStr = 'L';
					}
					
					$('#timeSelect', $el).val(timeStr);
				},
				
				'click #timeSelectPanelClearBtn':function(){
					var $this = $(this);
					$('.appConfigAlarmStrategy-base-time-panel td.appConfigAlarmStrategy-base-time-panel-td-hover', $el).removeClass('appConfigAlarmStrategy-base-time-panel-td-hover');
					$('#timeSelect', $el).val('');
				},
				
				'click #timeSelect':function(){
					var $this = $(this);
					$this.next().show();
				},
				
				'change [data-role=alertType]':function(){
					var $this = $(this),
						$next = $('[data-role=contintCount]',$this.parents('.appConfigAlarmStrategy-freq-type').next());//连续触发次数输入框
						$tit = $('.appConfigAlarmStrategy-base-ctn-items-tit',$this.parents('.appConfigAlarmStrategy-freq-type').next());//连续触发次数/时间
					if($this.val()=='oneTime'||$this.val()=='oneDay'){
						$next.val(1).attr('disabled', 'disabled');
						$tit.text('连续触发次数');
					}else if($this.val()=='duration_times'){
						$next.removeAttr('disabled').val('');
						$tit.text('连续触发次数');
					}else if($this.val()=='duration_time'){
						$next.removeAttr('disabled').val('');
						$tit.text('连续触发时间');
					}
				},
				
				'click .appConfigAlarmStrategy-ctn':function(e){
					var $this = $(this),
						$elem=$(e.target||window.event.srcElement),
						$div=$elem.closest('div'),
						elId = $elem.attr('id'),
						elClass = $elem.attr('class');
						
					if(elId!='timeSelect'&&elId!='timeSelectPanelClearBtn'&&!$div.hasClass('appConfigAlarmStrategy-base-time-panel')&&(elId!='timeSelect'||elId!='timeSelectPanel')){
						$('#timeSelectPanel',$el).hide();
					}
				},
				
				//发送对象按钮点击事件
				'click .appConfigAlarmStrategy-stragedy-obj':function(){
					var $this = $(this);
					if($this.index()!=2 && $this.index()!=0){
						if(!$this.hasClass('appConfigAlarmStrategy-stragedy-obj-clicked')){
							$this.addClass('appConfigAlarmStrategy-stragedy-obj-clicked');
							if($this.index()==0){
								$('#appConfigAlarmStrategyObjEmailUser', $this.parents('.appConfigAlarmStrategy-msg')).fadeIn();
							}else if($this.index()==1){
								$('#appConfigAlarmStrategyObjMsgUser', $this.parents('.appConfigAlarmStrategy-msg')).fadeIn();
							}
						}else{
							$this.removeClass('appConfigAlarmStrategy-stragedy-obj-clicked');
							if($this.index()==0){
								$('#appConfigAlarmStrategyObjEmailUser', $this.parents('.appConfigAlarmStrategy-msg')).fadeOut();
							}else if($this.index()==1){
								$('#appConfigAlarmStrategyObjMsgUser', $this.parents('.appConfigAlarmStrategy-msg')).fadeOut();
							}
						}
					}
				},
				
				//选择发送用户
				'click .appConfigAlarmStrategy-msg-userList':function(){
					var $this = $(this),
						$modal = $selectSendObjModal;
					if($this.attr('id')=='appConfigAlarmStrategyObjEmailUser'){
						$modal.find('h3').text('选择邮件发送用户');
					}else if($this.attr('id')=='appConfigAlarmStrategyObjMsgUser'){
						$modal.find('h3').text('选择短信发送用户');
					}
					
					//$('[href=#tab1]', $modal).trigger('click');
					
					$selectSendObj = $this;
					//初始化已选项
					initTableSelectedData($this, $modal);
					$('[href=#tab1]', $modal).trigger('click');
					$userTable.page(0).draw(false);
					
					$modal.modal('show');
				},
				
				//保存页面
				'click #appConfigAlarmStrategyConfirm':function(){
					var allData = {},
						checkResult = false,
						$this = $(this),
						$bCtn = $('.appConfigAlarmStrategy-submit', $el);
					
					
					// 1.收集参数，做基本非空判断
					allData = colletFormData();
					
					//策略分组
					var roleid = $('#groupInput', $el).attr('data-ids');
					if(roleid) {
						allData.roleid = roleid;
					} else {
						app.alert('请先选择策略分组');
						return;
					}
					
					// 2. 对条件表达式进行逻辑判断
//					checkResult = checkConditions();
					
					// 3.提交数据
					if(saveFlag){
						var target,
							successMsg;
						if(scope.app_id){
							allData['app_id'] = scope.app_id;
						}
						if(scope.obj_id){
							allData['obj_id'] = scope.obj_id;
						}
						
						if($('#tagkvs', $el).val().trim()) {//标签列
							allData.tagkvs = $('#tagkvs', $el).val().trim();
						}
						
						if(isModify){
							allData['flag'] = 0;//flag   1 新增 2 删除  0修改
							allData['gid']=alter_id;
							target = "UpdateAlert";
							successMsg = '修改报警策略成功！';
						}else {
							allData['flag'] = 1;//flag   1 新增 2 删除  0修改
							target = "SaveConfig_trigger";
							successMsg = '新增报警策略成功！';
						}
						allData['trigger_list'] = JSON.stringify(allData['trigger_list']);
						app.shelter.show('正在保存策略，请稍候…');
						app.common.ajaxWithAfa({
							"url": "MonitorCfgManagerAction_updateMonitorCfg.do",
							"data": allData,
						}).done(function(data){
							app.shelter.hide();
							if(data.result == 1){
								app.alert('title', successMsg, app.alertShowType.SUCCESS);
								$('.active',$('#tabs')).find('.close').trigger('click');
							}
						});
					} else {
						saveFlag = true;//重置为可保存状态
					}
				},
				
				'click #appConfigAlarmStrategyCanc':function(){
					app.confirm({
						title:'取消策略配置',
						content:'是否取消策略配置？',
						btnConfirm:'是',
						btnCancel:'否',
						confirmHandler:function(h){
							$('.active',$('#tabs')).find('.close').trigger('click');
						},
						cancelHandler:function(h,g){
							
						},
						context:$('body')[0],
						args:['是','否']
					});
				},
				/*
				'click #appConfigAlarmStrategyUserTb':function(e){
					var $elem=$(e.target||window.event.srcElement),
					$input= $elem.closest('input'),
					$table = $(this);
					
					if($input&&$input.attr('id')!='appConfigAlarmStrategyUserSelAllBtn'){
						var userId = $input.attr('id'),
						allIds = $table.attr('data-selectUser')?$table.attr('data-selectUser').split(','):[],
						newAllIds = [];
						
						if($.inArray(userId,allIds)<0&&$input.attr('checked')=='checked'){
							allIds.push(userId);
						}else if($.inArray(userId,allIds)>=0&&$input.attr('checked')!='checked'){
							$.each(allIds, function(index, id){
								if(id!=userId){
									newAllIds.push(id);
								}
							});
						}
						
						$table.attr('data-selectUser', newAllIds.length>0?newAllIds:allIds);
					}
				},
				*/
				//保存选择角色
				'click #appConfigAlarmStrategyUserConfirm':function(){
					var index = $('#userTabs li.active', $el).index();
					if(index == 0 && roleSelectComponent) {
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
						
					} else {
						unsaveSendUserList = userSelectComponent.getSelectedValues('userid');
					}

					$selectSendObj.attr('data-senduser', unsaveSendUserList);
					unsaveSendUserList = null;
					
					clearSendTables();
				},
				//配置表格中点击添加按钮
				'click .appConfigAlarmStrategy-addTr':function(){
					var $this = $(this),
						$addTrCtn = $this.parent().prev();
					
					if($addTrCtn.css('display')=='none'){
						$addTrCtn.show();
					}else{
						$('[data-role=appConfigAlarmStrategySaveTr]',$addTrCtn).trigger('click');
						$addTrCtn.show();
					}
				},
				//配置表格中取消行
				'click .appConfigAlarmStrategy-cancTr':function(){
					return;
					var $this = $(this);
					$this.parents('tr').hide();
				},
				
				//配置表格中保存行
				'click [data-role="appConfigAlarmStrategySaveTr"]':function(){
					var $this = $(this),
						$parent = $this.parents('tr'),
	//					$appConfigAlarmStrategyKpiAddTrCtn = $('#appConfigAlarmStrategyKpiAddTrCtn', $el),
						$appConfigAlarmStrategyKpiAddTrCtn = $parent,
						//获取所有保存按钮
	//					$saveTr = $('[data-role="appConfigAlarmStrategySaveTr"]', $el),
						$saveTr = $this,
						$monitorKpi = $('[data-role="monitorKpi"]', $parent),
						$kpiSub = $('[data-role="kpiSub"]', $parent),
						$condition = $('[data-role="condition"]', $parent),
						$threshold = $('[data-role="threshold"]', $parent),
						$rmeid = $('[data-role="rmeid"]', $parent),
						$recoverValue = $('[data-role="recoverValue"]', $parent),
						$andOr = $('[data-role="andOr"]', $parent),
						html = '',
						kpi = $monitorKpi.find('option:selected').text(),
						kpiSub = $kpiSub.find('option:selected').text(),
						cond = $condition.find('option:selected').text(),
						threshold = $threshold.val(),
						rmeid = $rmeid.text(),
						recoverValue = $recoverValue.val(),
						andOr = $andOr.find('option:selected').text();
					
					if(!kpi||$.trim(kpi)=='--请选择--'){
						app.alert('请选择指标分类');
					}else if(!kpiSub||$.trim(kpiSub)=='--请选择--'){
						app.alert('请选择指标细项');
					}else if(!cond||$.trim(cond)=='--请选择--'){
						app.alert('请选择条件表达式');
					}else if(!threshold||$.trim(threshold)==''||$.trim(threshold)=='请输入阀值'){
						app.alert('请输入条件阀值');
					}else {
						/* 1. 填充内容到表格中  */
						//分别追加到其他类型报警容器中。
						$.each($saveTr, function(index, savTr){
							var $savTrParent = $(savTr).parents('tr'),
								html = '';
							html = '<tr data-functionId="'+$parent.attr('data-functionId')+'" class="appConfigAlarmStrategy-kpi-table-tr">';
							html += '<td>'+($savTrParent.index()+1)+'</td>';
							html += '<td>'+$monitorKpi[0].outerHTML+'</td>';
							html += '<td>'+$kpiSub[0].outerHTML+'</td>';
							html += '<td>'+$condition[0].outerHTML+'</td>';
							html += '<td style="position: relative;">'+$threshold[0].outerHTML+'<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>'+'</td>';
							html += '<td>'+$rmeid[0].outerHTML+'</td>';
							html += '<td style="position: relative;">'+$recoverValue[0].outerHTML+'<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>'+'</td>';
							html += '<td>'+$andOr[0].outerHTML+'</td>';
							html += '<td>'+'<i class="fa fa-trash"></i>'+'</td>';
							html += '</tr>';
							
							$savTrParent.before(html);
							
							//更新序号
							$savTrParent.children('td:first-child').text($savTrParent.index()+1);
							
							//更新选择内容
							var $tr = $savTrParent.prev();
							$('[data-role="monitorKpi"]', $tr).val($monitorKpi.val()).tinyselect();
							$('[data-role="kpiSub"]', $tr).val($kpiSub.val()).tinyselect();
							$('[data-role="condition"]', $tr).val($condition.val());
							$('[data-role="threshold"]', $tr).val(threshold);
							$('[data-role="rmeid"]', $tr).val($rmeid.val());
							$('[data-role="recoverValue"]', $tr).val(recoverValue);
							$('[data-role="andOr"]', $tr).val($andOr.val());
							
							$savTrParent.hide();
						});
						
						/* 2. 将指标细项增加到可替换变量框中 */
						updateVarCtn($kpiSub);
					}
					
				}
			});
			
			//绑定删除按钮事件
			$('.appConfigAlarmStrategy-kpi-table', $el).on('click','.fa-trash',function(){
				var $this = $(this),
					$trArr = $this.parents('tbody').children('tr').not($this.parents('tr')).not($('.appConfigAlarmStrategy-addTr', $el).parent());
//				uuid = $this.parents('tr').attr('data-uuid');
//				$('[data-uuid="'+uuid+'"]', $el).remove();
				if($this.parents('tbody').children('tr.appConfigAlarmStrategy-kpi-table-tr').length == 1){
					app.alert('仅有一条配置数据，不能删除');
					return;
				}
				$this.parents('tr').remove();
				
				$.each($trArr, function(index, tr){
					$(tr).children('td:first-child').text($(tr).index()+1);
				})
				//更新变量框
				updateVarCtnGl();
			});
			
			initPage();
			
			//页面数据初始化
			function initPage(){
				//初始化发送用户列表
				initUserTable();
				//是否是修改策略，如果是，则不执行缺省初始化操作
				if(!isModify){
					//默认展示预警策略配置
					$('#alarmStrategyEaWarn', $el).trigger('click');
				}
				
				//初始化指标选择参数
				initKPI();
				//初始化条件表达式
//				initCondition();
				
				//初始化公共变量
				initCommonVar()

				//初始化页面radio，防止多标签打开时冲突问题
				initRadios();
			}
			
			//初始化指标选择参数
			function initKPI(){
				app.common.ajaxWithAfa({
					"url": "MonitorCfgManagerAction_queryAllMetricKind.do",
				}).done(function(data){
					var metricKinds = data.metricKinds;
					$.each($kpiSelect, function(index, kpi){
						for(var i=0; i<metricKinds.length; i++){
							var metricKind = metricKinds[i];
							$(kpi).append('<option value="'+metricKind['category']+'">'+metricKind['category']+'('+metricKind['category_name']+')'+'</option>');
						}
					});
					//初始化tinyselect插件
					$kpiSelect.tinyselect();
				});
			};
			
			//初始化公共变量
			function initCommonVar(){
				app.common.ajaxWithAfa({
					"url": "MonitorCfgManagerAction_queryPublicItem.do",
				}).done(function(data){
					var metricKinds = data.funs;
					for(var i=0,html=''; i<metricKinds.length; i++){
						var metricKind = metricKinds[i];
						html+='<span class="appConfigAlarmStrategy-warn-var-item">'+metricKind.name+'</span>';
					}
					$('.appConfigAlarmStrategy-common-var',$el).html(html);
				});
			};
			
			//根据指标项id初始化条件表达式
			function initCondition(mid,$condition,conVal){
				var argsData = {};
				argsData['dict_key'] = 'MATH_ARI';
				argsData['mid'] = mid;
				app.common.ajaxWithAfa({
					"url": "MonitorCfgManagerAction_queryAllFunName.do",
					"data": argsData,
				}).done(function(data){
					if(data && data.funs){
						var funs = data.funs,html='<option>--请选择--</option>';
						for(var i=0; i<funs.length; i++){
							var fun = funs[i];
							html += '<option value="'+fun['id']+'">'+fun['func_name']/*fun['func']*/+'</option>'
						}
						$condition.html(html);
						
						if(conVal){//修改时候给条件表达式赋值
							$condition.val(conVal);
						}
					}
				});
			}
			
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
			$('#groupRole',$el).on('click','tbody>tr',function(){
				if($(this).hasClass('selected')) return;
				var tr = $roleGroupTable.row(this).data();
				$(this).addClass('selected').siblings().removeClass('selected');
				var gid = tr.gid;
				
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
//						$table.columns.adjust().draw();
						if(gid){
							!roleSelectComponent && initRoleSelect();
							roleSelectComponent.setSelectedItems('userid', unsaveSendUserList);
						}else{
							//初始化多选插件
							!userSelectComponent && initUserSelect();
						}
					}else{
						!userSelectComponent && initUserSelect();
					}
				});
			}
			function initRoleSelect() {				
				roleSelectComponent = app.multiSelect({
					dataTable: $roleTable,
	        		tableSelector: '#appConfigAlarmStrategyRoleTb',
	        		checkAllSelector: '#appConfigAlarmStrategyRoleSelAllBtn',
	        		context: $el
				});
			}
			function initUserSelect() {				
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
					
					userSelectComponent.clear();
					userSelectComponent.setSelectedItems('userid', unsaveSendUserList);
				}
			});
			
			function initRadios(){
				var $radios = $('[type=radio]', $el),
				uuid = app.global.getUniqueId();
				
				$.each($radios, function(index, radio){
					$(radio).attr('name', $(radio).attr('name')+'_'+uuid);
				});
			}
			
			function clearSendTables(){
				userSelectComponent && userSelectComponent.clear();
				roleSelectComponent && roleSelectComponent.clear();
				$selectSendObjModal.modal('hide');
			}
			
			//初始化已选择用户、角色
			function initTableSelectedData($tableCtn, $modal){
				var sendUserInfo = $tableCtn.attr('data-senduser'),
					sendUserInfoArr = [];
				userSelectComponent.clear();
				roleSelectComponent && roleSelectComponent.clear();
				unsaveSendUserList = null;
				if(sendUserInfo){
					sendUserInfoArr = $.trim(sendUserInfo.split(','))== '' ? null : sendUserInfo.split(',');
					if(sendUserInfoArr) {
						unsaveSendUserList = sendUserInfoArr;
						userSelectComponent.setSelectedItems('userid', sendUserInfoArr);
						roleSelectComponent && roleSelectComponent.setSelectedItems('userid', sendUserInfoArr);
					}
				}
			}
			
			var saveFlag = true;
			//收集页面所有参数，并返回json对象
			function colletFormData(){
				var jsonObj = {};
				
				//基本策略配置信息
				var jBaseObj = colletBasicStrategyForm();
				if(jBaseObj){
					$.extend(jsonObj, jBaseObj);
				}else {
					saveFlag = false;
					return
				}
				
				
				//生效时段信息
				var jEffectTimeObj = colletEffectTimeForm();
				if(jEffectTimeObj){
					$.extend(jsonObj, jEffectTimeObj);
				}else {
					saveFlag = false;
					return
				}
				
				
				//通知、预警、告警配置信息
				var jConfigObj = colletConfigForm();
				if(jConfigObj&&jConfigObj.trigger_list.length>0){
					$.extend(jsonObj, jConfigObj);
				}else {
					saveFlag = false;
					return
				}
				
				
				//信息配置信息
				var jInfoObj = colletInfoForm();
				if(jInfoObj){
					$.extend(jsonObj, jInfoObj);
				}else {
					saveFlag = false;
					return
				}
				
				return jsonObj;
			};
			
			//收集基本策略配置信息
			function colletBasicStrategyForm(){
				var jsonObj = {},
					alertName = $('[data-role=strategyName]', $el).val(),
					alertSound = $('[data-role=noticeVoice]:checked', $el).index(),
					status = $('#editstate', $el).bootstrapSwitch('state') == true ? "1" : "0";//策略状态
				
				if(!alertName||$.trim(alertName)==''){
					app.alert('请输入：策略名称');
					saveFlag = false;
					return
				}
				
				if(obj_id){
					jsonObj['obj_id'] = obj_id;
//					jsonObj['exe_id'] = exe_id;
				}else{
					jsonObj['obj_id'] = "0";
				}
				
				//是否是修改策略操作
				if(isModify){
					jsonObj['alter_id'] = alter_id;
				}
				
				jsonObj['app_id'] = app_id?app_id:'0';
				jsonObj['alert_name'] = alertName;
				jsonObj['alert_sound'] = alertSound;
				jsonObj['status'] = status;
				
				return jsonObj;
			}
			//收集生效时段信息
			function colletEffectTimeForm(){
				var timeAlert = $('[data-role=timeAlert]:checked', $el).index(),//是否按时段报警
					vaild_start_data = $('#startDate', $el).val().split('-').join(''),
					vaild_end_data = $('#endDate', $el).val().split('-').join(''),
					eaWarnCycle = $('.appConfigAlarmStrategy-base-ctn-items-right-cycle.appConfigAlarmStrategy-base-ctn-items-right-cycle-hover', $el).index(),
					weekSelect = [],
					daySelect,
					filter_type,
					filter_data,
					vaild_start_time = $('#startTime', $el).val().split(':').join('')+'00',
					vaild_end_time = $('#endTime', $el).val().split(':').join('')+'00',
					jsonObj = {};
				
				if(timeAlert=='0'){
					if(eaWarnCycle==0){
						var $weekSelect = $('[data-role=weekSelect].appConfigAlarmStrategy-base-ctn-items-select-hover', $el);
						filter_type = 'W';
						if($weekSelect){
							$.each($weekSelect, function(index, week){
								weekSelect.push($(week).index());
							});
						}
						filter_data = weekSelect.join(',');
					} else if(eaWarnCycle==1){
						filter_type = 'M';
						daySelect = $('[data-role=daySelect]', $el).val();
						filter_data = daySelect;
					}else if(eaWarnCycle==2){
						filter_type = 'D';
						filter_data = '';
					}else if(eaWarnCycle==3){
						filter_type = 'K';
						filter_data = '';
					}else if(eaWarnCycle==4){
						filter_type = 'H';
						filter_data = '';
					}
					
					//其他时间段设置
					
					if(!vaild_start_data||$.trim(vaild_start_data)==''){
						app.alert('请填写：开始生效日期！');
						saveFlag = false;
						return
					}else if(!vaild_end_data||$.trim(vaild_end_data)==''){
						app.alert('请填写：结束生效日期！');
						saveFlag = false;
						return
					}else if(!filter_type||$.trim(filter_type)==''){
						app.alert('请选择：预警周期！');
						saveFlag = false;
						return
					}else if(!filter_data||filter_data==''){
						if(filter_type=='星期'||filter_type=='月份'){
							app.alert('请选择星期信息！');
							saveFlag = false;
							return
						}
					}else if(!vaild_start_time||$.trim(vaild_start_time)==''){
						app.alert('请填写：开始生效时间！');
						saveFlag = false;
						return
					}else if(!vaild_end_time||$.trim(vaild_end_time)==''){
						app.alert('请填写：结束生效时间！');
						saveFlag = false;
						return
					}
					
					//返回结果
					jsonObj['vaild_start_data'] = parseInt(vaild_start_data);
					jsonObj['vaild_end_data'] = parseInt(vaild_end_data);
					jsonObj['vaild_start_time'] = parseInt(vaild_start_time);
					jsonObj['vaild_end_time'] = parseInt(vaild_end_time);
					jsonObj['filter_type'] = filter_type;
					jsonObj['filter_data'] = filter_data;
				}
				jsonObj['vaild_time_flag'] = timeAlert==1?'0':'1';
				
				return jsonObj;
			}
			//收集通知配置信息
			function colletConfigForm(){
				var $alertMethod = $('[data-role=alertMethod].appConfigAlarmStrategy-base-ctn-items-select-hover', $el),//选中的报警方式
					alertMethod = [],//选中的报警方式的index
					trigger_list = [],
					returnFlag = true;
				
				//获取已选择的报警类型
				$.each($alertMethod, function(index, method){
					alertMethod.push($(method).index());
				});
				
				//获取所选择报警配置的数据
				if(alertMethod.length>0){
					$.each(alertMethod, function(j, mthod){
						var config_trigger = {},//存报警类型 触发次数等表格外信息
							alert_type,//报警方式
							trigger_type,
							alert_times_type,//报警类型
							alert_times,//连续触发次数、时间
							notify_type,
							isRecoverable,//是否自动恢复
							is_send_recover,//发送恢复信息
							config_notice = [],//存消息发送对象信息
							notice_type,
							alert_level,//事件级别
							notice_send_type,//发送对象：邮件 短信 微信
							notice_user_list,
							notice_role_list,
							trigger_function = [],//存监控指标 指标项等表格内信息
							$infoCtn,//配置块
							alarmTypeMsg;
						//确定父容器
						if(mthod==0){
							$infoCtn = $noticeEl;
							alert_type = 2;
							alarmTypeMsg = '通知配置';
						}else if(mthod==1){
							$infoCtn = $eaWarnEl;
							alert_type = 1;
							alarmTypeMsg = '预警配置';
						}else if(mthod==2){
							$infoCtn = $warnEl;
							alert_type = 0;
							alarmTypeMsg = '告警配置';
						}
						//获取父容器内信息
						if($infoCtn){
							//trigger_function  报警条件
							var $triggerTrs = $('tbody', $infoCtn).children('tr').not('#appConfigAlarmStrategyKpiAddTrCtn').not('tr:last-child');
							if(!$triggerTrs||$triggerTrs.length<=0){
								app.alert('请创建：表达式条件！');
								saveFlag = false;
								return;
							}
							$.each($triggerTrs, function(index, tr){
								var function_index = $(tr).children(':eq(0)').text(),//行序号
									kpi_id = $(tr).children(':eq(1)').children().find('option:selected').val(),//指标id
									kpi_name = $(tr).children(':eq(1)').children().find('option:selected').text(),//指标名
									mid = $(tr).children(':eq(2)').children().find('option:selected').attr('data-mitid'),//指标项id
									mname = $(tr).children(':eq(2)').children().find('option:selected').text(),//指标项
									symbol = $(tr).children(':eq(3)').children().find('option:selected').val(),//条件表达式
									threshold = $(tr).children(':eq(4)').children().val(),//条件阀值
									rmeid = $(tr).children(':eq(5)').children().find('option:selected').val(),//恢复表达式
									recoverValue = $(tr).children(':eq(6)').children().val(),//恢复阀值
									join_exp = $(tr).children(':eq(7)').children().val(),//与或
									triggerObj = {};//存报警条件当前行
									
									function_id = $(tr).attr('data-functionId');
								
								if(!kpi_name||kpi_name=='--请选择--'){
									app.alert('请选择：['+alarmTypeMsg+']第'+function_index+'行的[监控指标]！');
									returnFlag = false;
									saveFlag = false;
									return;
								}else if(!mid||mid=='--请选择--'){
									app.alert('请选择：['+alarmTypeMsg+']第'+function_index+'行的[指标细项]！');
									returnFlag = false;
									saveFlag = false;
									return;
								}else if(!symbol||symbol=='--请选择--'){
									app.alert('请选择：['+alarmTypeMsg+']第'+function_index+'行的[条件表达式]！');
									returnFlag = false;
									saveFlag = false;
									return;
								}else if(!threshold){
									app.alert('请填写：['+alarmTypeMsg+']第'+function_index+'行的[条件阀值]！');
									returnFlag = false;
									saveFlag = false;
									return;
								}else if((rmeid=='--请选择--'&&recoverValue)||(!recoverValue&&rmeid!="--请选择--")){
									if(recoverValue){
										app.alert('请选择：['+alarmTypeMsg+']第'+function_index+'行的[恢复表达式]！');
									}else if(!recoverValue){
										app.alert('请填写：['+alarmTypeMsg+']第'+function_index+'行的[恢复阀值]！');
									}
									returnFlag = false;
									saveFlag = false;
									return;
								}else if(!join_exp||join_exp=='--请选择--'){
									if(function_index!=($('#appConfigAlarmStrategyKpiAddTrCtn', $infoCtn).index())){
										app.alert('请选择：['+alarmTypeMsg+']第'+function_index+'行的[与或]！');
										returnFlag = false;
										saveFlag = false;
										return;
									}
								}else if(join_exp!='--请选择--'&&function_index==($('#appConfigAlarmStrategyKpiAddTrCtn', $infoCtn).index())){
									app.alert('['+alarmTypeMsg+']第'+function_index+'行的[与或]请追加表达式！');
									returnFlag = false;
									saveFlag = false;
									return;
								}
								
								function_id && (triggerObj['function_id'] = parseInt(function_id));
								triggerObj['function_index'] = parseInt(function_index);
//								triggerObj['cmd_id'] = parseInt(cmd_id);
								triggerObj['kpi_id'] = parseInt(kpi_id);
								triggerObj['kpi_name'] = kpi_name;
								triggerObj['mid'] = parseInt(mid);
								triggerObj['mname'] = mname;
								triggerObj['symbol'] = symbol;
								triggerObj['threshold'] = threshold;
								if(rmeid != '--请选择--' ){
									triggerObj['rmeid'] = rmeid;
									triggerObj['recover_value'] = recoverValue;
								}
								triggerObj['join_exp'] = (join_exp=='--请选择--'?'':join_exp);
								
								trigger_function.push(triggerObj);
							});
							
							//config_trigger 报警触发器配置
//							$('[data-role="expression"]:checked', $infoCtn).index();
							trigger_id = $infoCtn.parent().attr('data-triggerId');
							alert_times_type = $('[data-role="alertType"]', $infoCtn).val();//报警类型
							alert_times = $('[data-role="contintCount"]', $infoCtn).val();//连续触发次数
							alert_level = $('[data-role="alertLevel"]:checked', $infoCtn).index();//事件级别
							isRecoverable = $('[data-role="isRecoverable"]', $infoCtn).bootstrapSwitch('state') == true ? "1" : "0";//是否自动恢复
							is_send_recover = $('[data-role="isSendRecMsg"]', $infoCtn).bootstrapSwitch('state') == true ? "1" : "0";//发送恢复信息
							
							if(!alert_times_type||alert_times_type=='--请选择--'){
								app.alert('请选择：['+alarmTypeMsg+']报警类型！');
								saveFlag = false;
								return;
							}
							if(!alert_times||$.trim(alert_times)==''){
								app.alert('请输入：['+alarmTypeMsg+']连续触发次数/时间！');
								saveFlag = false;
								return;
							}
							
							config_trigger['trigger_id'] = parseInt(trigger_id);
							config_trigger['alert_times_type'] = alert_times_type;
							config_trigger['alert_times'] = parseInt(alert_times);
							config_trigger['alert_level'] = parseInt(alert_level+1);
							config_trigger['isRecoverable'] = parseInt(isRecoverable);
							config_trigger['is_send_recover'] = parseInt(is_send_recover);
							config_trigger['trigger_type'] = 0;
							config_trigger['alert_type'] = alert_type;
							//config_notice  通知配置
							//notify_type
							var $selectedObj = $('[data-role="sendObj"].appConfigAlarmStrategy-stragedy-obj-clicked', $infoCtn);//发送对象
							notice_send_type = [];
							if($selectedObj){
								$.each($selectedObj, function(index, obj){
									notice_send_type.push($(obj).index()==0?'1':$(obj).index()==1?'0':$(obj).index()==2?'2':'3');
								});
							}
							
							//通知类型
							config_trigger['notify_type'] = notice_send_type.sort().join(',').replace('0','短信').replace('1','邮件').replace('2','微信').replace('3','客户端');
							
							if(notice_send_type.length>0){
								$.each(notice_send_type, function(index, type){
									var configNoticeObj = {},
										eSendUser = $('#appConfigAlarmStrategyObjEmailUser', $infoCtn).attr('data-senduser'),
										mSendUser = $('#appConfigAlarmStrategyObjMsgUser', $infoCtn).attr('data-senduser');
									
									if(type=='1'){//邮件
										notice_user_list = eSendUser ? eSendUser.split(',') : [];
										configNoticeObj['notice_id'] = $('[data-role=sendObj]', $infoCtn).eq(0).attr('data-noticeId');
									}else if(type=='0'){//短信
										notice_user_list = mSendUser ? mSendUser.split(',') : [];
										configNoticeObj['notice_id'] = $('[data-role=sendObj]', $infoCtn).eq(1).attr('data-noticeId');
									}
									
//									if(!notice_user_list&&!notice_role_list){
//										app.alert('请选择：'+alarmTypeMsg+'['+(type=='0'?'短信':'邮件')+']发送用户！');
//										returnFlag = false;
//									}
									
									configNoticeObj['notice_type'] = 0;
									configNoticeObj['notice_send_type'] = type;
									configNoticeObj['notice_user_list'] = notice_user_list.join(',');
									
									config_notice.push(configNoticeObj);
								});
							}
//							else{
//								app.alert('请选择：['+alarmTypeMsg+']发送对象！');
//								return;
//							}
						}
						trigger_list.push({'config_trigger':config_trigger, 'config_notice': config_notice, 'trigger_function':trigger_function});
					});
					if(!returnFlag){
						saveFlag = false;
						return;
					}else{
						return {'trigger_list':trigger_list};
					}
				}else {
					app.alert('请选择：报警方式！');
					saveFlag = false;
					return;
				}
			}
			//收集信息配置信息
			function colletInfoForm(){
				var alertMessage = $('#appConfigAlarmStrategyWarnMsg', $el).val(),//报警信息
					recoverMessage = $('#appConfigAlarmStrategyRecMsg', $el).val(),//恢复信息
					resoleAdvise = $('#appConfigAlarmStrategyAdvice', $el).val(),//故障处理建议
					jsonObj = {};
				
				if(!alertMessage||$.trim(alertMessage)==''){
					app.alert('请填写：报警信息！');
					saveFlag = false;
					return
				}/*else if(!recoverMessage||$.trim(recoverMessage)==''){
					app.alert('请填写：恢复信息！');
					return
				}*/
				
				jsonObj['alert_message'] = alertMessage;
				recoverMessage&&(jsonObj['recover_message'] = recoverMessage);
				resoleAdvise&&(jsonObj['resole_advise'] = resoleAdvise);
				
				return jsonObj;
			}
			
			//校验条件表达式是否正确
			function checkConditions(){
				var checkResult = false,
					checkCtn = [],
					$alertMethod = $('[data-role=alertMethod].appConfigAlarmStrategy-base-ctn-items-select-hover', $el);
				
				// 1. 遍历所有已选择的报警类型的表达式内容
				$.each($alertMethod, function(index, method){
					checkCtn.push($(method).index());
				});
				if(checkCtn.length>0){
					$.each(checkCtn, function(i, mthod){
						var $ctn,
						kpiSubCtn = [];
						
						//确定父容器
						if(mthod==0){
							$ctn = $noticeEl;
						}else if(mthod==1){
							$ctn = $eaWarnEl;
						}else if(mthod==2){
							$ctn = $warnEl;
						}
						
						$('[data-role=kpiSub]', $ctn)&&$.each($('[data-role=kpiSub]', $ctn), function(){
							
						})
					});
				}
				
				
				return checkResult;
			}
			
			getGroupData();
			//获取可选分组数据
			function getGroupData() {
				app.common.ajaxWithAfa({
					url: 'RoleManageAction_getAllRole.do',
					async: false
				}).then(function(data) {
					data = data.list;
					if(data) {
						var liTmp = '';
						data.forEach(function(item, i) {
							liTmp += '<li data-id="'+ item.rid +'">'+ item.name +'</li>';
						});
						$('#groupCtn', $el).html(liTmp);
					}
				});
			}
			
			//如果是修改模式，则初始化数据
			if(isModify){
				initModifyData();

				//初始化公共变量
				initCommonVar()
			}

			function initModifyData(){
				//通过ID查询报警策略信息
				getalterByID(alter_id);
			}
			
			$('#groupInput', $el).click(function(e){
				e.stopPropagation();
				if($('#groupCtn', $el).hasClass('hide')) {
					$('#groupCtn', $el).removeClass('hide');
				} else {
					$('#groupCtn', $el).addClass('hide');
				}
			});
			
			$('#groupCtn', $el).on('click', 'li', function(e) {
				e.stopPropagation();
				$(this).toggleClass('selected');
				changeGroupValues();
			});
			
			//修改所选分组输入框的值
			function changeGroupValues() {
				var ids = '';
				var names = '';
				$('#groupCtn li', $el).each(function(i, item) {
					if($(item).hasClass('selected')) {
						if(!ids) {
							ids += $(item).attr('data-id');
						} else {
							ids += ',' + $(item).attr('data-id');
						}
						
						if(!names) {
							names += $(item).text();
						} else {
							names += ', ' + $(item).text();
						}
					}
				});
				
				$('#groupInput', $el).val(names).attr('data-ids', ids);
			}
			
			//按照已选分组id，选择分组
			function selectGroup(ids) {
				for(var i = 0; i < ids.length; i++) {
					$('#groupCtn li', $el).each(function(j, item) {
						if($(item).attr('data-id') == ids[i]) {
							$(item).addClass('selected');
						}
					});
				}
				
				changeGroupValues();
			}
			
			$el.click(function() {
				$('#groupCtn', $el).addClass('hide');
			});

			//通过ID查询报警策略信息
			function getalterByID(alterId){
				var parmsData = {};
				parmsData['gid'] = alterId;
				if(scope.kpi_id){
					parmsData['executor_id'] = scope.kpi_id;
				}
				if(alterId){
					app.common.ajaxWithAfa({
						url  : "MonitorCfgManagerAction_queryTriggerInfo.do",
						data:parmsData
					}).done(function(data){
						if(data && data.funs && data.funs.length>0){
							var private_rsp = data.funs[0],
								trigger_name = private_rsp.trigger_name,//策略名称
								alert_sound = private_rsp.alert_sound,//提示音
								enabled = private_rsp.enabled,//策略状态
								vaild_time_flag = private_rsp.vaild_time_flag,//生效时段
								alert_message = private_rsp.content,//报警信息
								recover_message = private_rsp.recover_content,//恢复信息
								deal_content = private_rsp.deal_content,//故障处理建议
								filter_data = private_rsp.filter_data,
								filter_type = private_rsp.filter_type,
								vaild_end_data = private_rsp.vaild_end_data,
								vaild_end_time = private_rsp.vaild_end_time,
								vaild_start_data = private_rsp.vaild_start_data,
								vaild_start_time = private_rsp.vaild_start_time;
							
							var roleid = private_rsp.roleid;//策略分组id
							
							selectGroup(roleid.split(','));
							
							$('#tagkvs', $el).val(private_rsp.tagkvs);//标签列
						
							//1. 初始化基本策略配置
							$('[data-role=strategyName]', $el).val(trigger_name);//策略名称
							$('[data-role=noticeVoice]', $el).eq(alert_sound).attr('checked','checked');//提示音
							$('[data-role=editstate]', $el).bootstrapSwitch('state', enabled=='1'?true:false);//策略状态
							//2. 初始化生效时段
							if(vaild_time_flag=='1'){
								$('[data-role=timeAlert]', $el).eq(0).trigger('click');
								$('#startDate', $el).val(formateDate(vaild_start_data, 'date'));
								$('#endDate', $el).val(formateDate(vaild_end_data, 'date'));
								$('#startTime', $el).val(formateDate(vaild_start_time, 'time'));
								$('#endTime', $el).val(formateDate(vaild_end_time, 'time'));
								filter_type[0]&&$('.appConfigAlarmStrategy-base-ctn-items-right-cycle', $el).eq(filter_type[0]=='W'?0:filter_type[0]=='M'?1:filter_type[0]=='D'?2:filter_type[0]=='K'?3:4).trigger('click');
								if(filter_type[0]=='W'){
									filter_data[0]&&(filterData = filter_data[0].split(','));
									if(filterData&&filterData.length>0){
										$.each(filterData, function(index, data){
											$('[data-role=weekSelect]', $el).eq(parseInt(data)).trigger('click');
										});
									}
								}else if(filter_type[0]=='M'){
									$('[data-role=daySelect]', $el).val(filter_data);
								}
							}
							//4. 初始化信息配置
							$('#appConfigAlarmStrategyWarnMsg', $el).val(alert_message);//报警信息
							$('#appConfigAlarmStrategyRecMsg', $el).val(recover_message&&recover_message);//恢复信息
							$('#appConfigAlarmStrategyAdvice', $el).val(deal_content&&deal_content);//故障处理建议
						}
						//3. 初始化通知、预警、告警配置
						var funs = data.funs;
						funs.forEach(function(fun,index){
							var event_type = fun.event_type;//报警方式 0告警 1预警 2通知
							var trigger_id = fun.id;//报警方式 0告警 1预警 2通知
							getTriggerByalter_id(trigger_id,event_type);
						});
					});
				}
			}
			
			//通过ID查询策略信息 初始化通知、预警、告警配置
			function getTriggerByalter_id(trigger_id,event_type){
				var $curSel,//报警方式
					$curCtn;//配置表格块
				if(event_type=='2'){
					$curSel = $('[data-role=alertMethod]', $el).eq(0);//报警方式 通知 按钮
					$curCtn = $noticeStrategyCtn;//通知配置块
				}else if(event_type=='1'){
					$curSel = $('[data-role=alertMethod]', $el).eq(1);//报警方式  预警 按钮
					$curCtn = $eaWarnStrategyCtn;//预警配置块
				}else if(event_type=='0'){
					$curSel = $('[data-role=alertMethod]', $el).eq(2);//报警方式 告警 按钮
					$curCtn = $warnStrategyCtn;//告警配置块
				}
				//1. 展示策略配置
				$curSel.trigger('click');
				
				//初始化发送用户列表
				getNoticeBytrigger_id(trigger_id, event_type, $curCtn);
				
				app.common.ajaxWithAfa({
					url  : "MonitorCfgManagerAction_queryAlertCfgInfo.do",
					data:{
						'triggerId':trigger_id,
						'event_type':event_type
					}
				}).done(function(data){
					var private_rsp = data.funs[0];
					var alert_times = private_rsp.alertValue,//连续触发次数
						alert_times_type = private_rsp.alert_times_type,//报警类型
						is_send_recover = private_rsp.recove_send,//发送恢复信息
						isRecoverable = private_rsp.recoverable,//是否自动恢复
						event_level = private_rsp.event_level,//事件级别
						funid = private_rsp.funid,//条件表达式
						func_name = private_rsp.func_name,//条件表达式
						threshold_value = private_rsp.threshold_value,//条件阀值
						rmeid = private_rsp.rmeid,//自动恢复表达式
						rmeid_name = private_rsp.rfunc_name,//自动恢复表达式
						recover_value = private_rsp.recover_value,//自动恢复阀值
						category = private_rsp.category,//指标
						mid = private_rsp.mid,//指标项
						display_name = private_rsp.display_name,//指标项
						trigger_id = private_rsp.trigger_id;
					//保存trigger_id
					$curCtn.attr('data-triggerId', trigger_id);
					//2. 初始化基本策略信息
					$('[data-role=alertType]', $curCtn).val(alert_times_type).trigger('change');//报警类型
					$('[data-role=contintCount]', $curCtn).val(alert_times);//连续触发次数
					//					$('[data-role=isContinueAlarm]', $curCtn).bootstrapSwitch('state', false);
					$('[data-role=isRecoverable]', $curCtn).bootstrapSwitch('state', isRecoverable);//是否自动恢复
					$('[data-role=isSendRecMsg]', $curCtn).bootstrapSwitch('state', is_send_recover);//发送恢复信息
					$('[data-role=alertLevel]', $curCtn).eq(event_level-1).attr('checked','checked');//报警级别
					//4. 初始化条件表达式
					var $addTr = $('#appConfigAlarmStrategyKpiAddTrCtn', $curCtn),
						$mKpi = $('[data-role=monitorKpi]', $curCtn),
						$kSub = $('[data-role=kpiSub]', $curCtn),
						$cond = $('[data-role=condition]', $curCtn),
						$thres = $('[data-role=threshold]', $curCtn),
						$rmeid = $('[data-role=rmeid]', $curCtn),
						$recoverValue = $('[data-role=recoverValue]', $curCtn),
						$aOr = $('[data-role=andOr]', $curCtn);
					//触发保存按钮
//					$mKpi.parents('tr').attr('data-functionId', function_id);
					$mKpi.val(category);//指标
					//初始化tinyselect插件
					$mKpi.siblings('.tinyselect').remove();
					$mKpi.tinyselect();
					$kSub.empty().append('<option>--请选择--</option>').append('<option data-kpiId="'+mid+'" data-mitId="'+mid+'" value="'+mid+'">'+display_name+'</option>').val(mid);
					$cond.empty().append('<option>--请选择--</option>').append('<option data-kpiId="'+funid+'" data-mitId="'+funid+'" value="'+funid+'">'+func_name+'</option>').val(mid);//条件表达式
					$cond.val(funid);//条件表达式
					$thres.val(threshold_value);//条件阀值
					$rmeid.empty().append('<option>--请选择--</option>').append('<option data-kpiId="'+rmeid+'" data-mitId="'+rmeid+'" value="'+rmeid+'">'+rmeid_name+'</option>').val(mid);//条件表达式
					$rmeid.val(rmeid);//自动恢复表达式
					$recoverValue.val(recover_value);//恢复阀值
//					$aOr.val($.trim(join_exp).toLocaleLowerCase()+'');//与或表达式
					$('[data-role=appConfigAlarmStrategySaveTr]', $curCtn).trigger('click');
//					$mKpi.parents('tr').removeAttr('data-functionId');						
				});
				
				//6. 更新表格子选项为多选下拉框
				var updateHandler = window.setTimeout(function(){
					updateHandler = null;
					updateKpiSub();
				}, 1000);
			}
			
			//通过ID查询报警策略信息 初始化发送用户列表
			function getNoticeBytrigger_id(trigger_id, event_type, $pCtn){
				var args = {};
				if(trigger_id){
					args['triggerId'] = trigger_id;
					args['event_type'] = event_type;
					
					var $curSel = $('[data-role=sendObj]', $pCtn).eq(1),//发送对象 短信按钮
						$curSelTarget = $('#appConfigAlarmStrategyObjMsgUser', $pCtn);//选择短信发送用户按钮
					
					
					app.common.ajaxWithAfa({
						url  : "MonitorCfgManagerAction_queryAllUserAndRole.do",
						data: args
					}).done(function(data){
						if(data && data.funs && data.funs.length>0){
							$curSel.attr('data-noticeId', 'notice_id').trigger('click');
							var notice_user_list = data.funs.map(function(fun,index){return fun.userid}).join(',');
							$curSelTarget.attr('data-senduser', notice_user_list);//用户列表
						}
					});
				}
			}

			//时间转换
			function formateDate(date, dateType){
				var dateT=new String(date), y, m, d, h, minute, second, result;
				if(dateType=='date'){
					y = dateT.substring(0,4);
			        m = dateT.substring(4,6);  
			        d = dateT.substring(6,8);
			        
			        result = y + '-' + m + '-' + d;
				}else if(dateType=='time'){
					if(dateT.length==5){
						h = '0'+dateT.substring(0,1);
					}else{
						h = dateT.substring(0,2);
					}
			        minute = dateT.substring(2,4);
			        second = dateT.substring(4,6);
					
			        result = h+':'+minute/*+':'+second*/;
				}
		        
		        return result;
			}
			
			
			/* 2. 将指标细项增加到可替换变量框中 */
			function updateVarCtn($kpiSub){
				var $monitorKpi = $kpiSub.parent().prev().children(),
					kpiId = $monitorKpi.val(),
					$kpiVarCtn = $('.appConfigAlarmStrategy-warn-ctn-var-ctn', $el),
					varItemClass = 'appConfigAlarmStrategy-warn-var',
					$varItems = $kpiVarCtn.children('.'+varItemClass),
					kpiArr = [],
					divHtml = '';
				
				if($varItems&&$varItems.length>0){
					$.each($varItems, function(index, vItem){
						kpiArr.push($(vItem).attr('data-kpiId'));
					});
				}
				if((kpiArr.length>0&&$.inArray(kpiId,kpiArr)<0)||kpiArr.length==0){
					app.common.ajaxWithAfa({
						"url": "MonitorCfgManagerAction_queryPrivateItem.do",
						"data": {
							metricKind:kpiId
						},
					}).done(function(data){
						if(data && data.funs){
							var divHtml = '';
							var $options = data.funs;
							var $kpiVar = $kpiVarCtn.find('[data-kpiId="'+kpiId+'"]');
							if($kpiVar){
								$kpiVar.remove();
							}
							divHtml += '<div class="'+varItemClass+'" data-kpiId="'+kpiId+'">';
							$.each($options, function(index, op){
								if(index!=0){
									divHtml += '<span class="'+varItemClass+'-item'+'" title="'+$monitorKpi.find('option:selected').text()+'">'+op.result_cn+'</span>';
								}
							});
							divHtml += '</div>';
							//将指标细项追加到可替换变量中
							$kpiVarCtn.append(divHtml);
						}
					});
				}
			}
			
			//根据所有指标项更新变量框
			function updateVarCtnGl(){
				var $kpiSubArr = $('[data-role=kpiSub]', $('.appConfigAlarmStrategy-kpi-table-tr'));
				//清空常用变量
				$kpiVarCtn.empty();
				//遍历所有kpiSub
				$.each($kpiSubArr, function(index, kpiSub){
					updateVarCtn($(kpiSub));
				});
			}
			
			function updateKpiSub(){
				var $kpiSub = $('[data-role=kpiSub]', $('.appConfigAlarmStrategy-kpi-table-tr', $el)),
					varItemClass = 'appConfigAlarmStrategy-warn-var',
					$kpiSel = $('[data-role=monitorKpi]', $('.appConfigAlarmStrategy-kpi-addCtn', $el));
					
				//清空常用变量
				$kpiVarCtn.empty();
				
				$.each($kpiSub, function(index, sub){
					var kpiId = $(sub).parents('td').prev().find('option:selected').val(), //指标值
						$monitorKpi = $(sub).parents('td').prev().find('select'),//指标
						$con = $(sub).parents('td').next().find('select'),//条件表达式
						$rmeid = $(sub).parents('td').next().next().next().find('select'),//自动恢复表达式
						subVal = $(sub).val(),//指标项值
						conVal = $con.find('option:selected').val(),//条件表达式值
						rmeid = $rmeid.find('option:selected').val(),//自动恢复表达式值
						argsData = {};
					
					if(kpiId){
						argsData['metricKind'] = kpiId;
						app.common.ajaxWithAfa({
							"url": "MonitorCfgManagerAction_queryAllMetricItem.do",
							"data": argsData,
						}).done(function(data){
							if(data && data.metricItems){
								var metricKinds = data.metricItems;
								$(sub).empty().append('<option>--请选择--</option>');
								
								for(var i=0; i<metricKinds.length; i++){
									$(sub).append('<option data-item="'+metricKinds[i]['item']+'" data-mitId="'+metricKinds[i]['id']+'" value="'+metricKinds[i]['id']+'">'+metricKinds[i]['display_name']+'</option>');
								}
								$(sub).val(subVal);
								initCondition(subVal,$con,conVal);
								initCondition(subVal,$rmeid,rmeid);
								//初始化可搜索下拉框
								$(sub).siblings('.tinyselect').remove();
								$(sub).tinyselect();
								/* 2. 将指标细项增加到可替换变量框中 */
								updateVarCtn($(sub));
							}
						});
					}				
				});
				
				$kpiSel.val('');
				$kpiSel.trigger('change');
				$kpiSel.siblings('.tinyselect').remove();
				$kpiSel.tinyselect();
			}
			
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
			
		}
	};
});