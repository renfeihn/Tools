define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			var $reStructDataModal = $('#reStructDataModal',$el),
				urlData={
					cate: {"category":{"cate1":[],"cate2":[],"cate3":[]},"app":{"cate1":[],"cate2":[],"cate3":[]}},
					logType: 1,
					size: 10,
					from: 0
				},
				OPERATE;

			var $searchTable = $('#searchTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'taskDesc', defaultContent : ''
				},{
					data : 'taskCond', defaultContent : ''
				},{
					data : 'startTime', defaultContent : ''
				},{
					data : 'endTime', defaultContent : ''
				},{
					data : 'taskStatus',defaultContent : ''
				},{
					data : 'taskPer', defaultContent : ''
				},{
					data : 'dataSize', defaultContent : ''
				}/*,{
					data : '', defaultContent : ''
				}*/,{
					data : 'taskSeq', defaultContent : ''
				},{
					data : '', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						if(data != undefined){
							switch(data) {
								case '0':
									return '<i class="fa fa-users" style="color:#4494fc;"></i>排队';
								case '1':
									return '<i class="fa fa-spinner fa-pulse" style="color:#22ac38;"></i>处理中';
								case '2':
									return '<i class="fa fa-check-circle" style="color:#22ac38;"></i>处理完成';
								case '3':
									return '<i class="fa fa-circle" style="color:#919099;"></i>已取消';
								case '4':
									return '<i class="fa fa-times-circle" style="color:#e55a47;"></i>执行失败';
							}
						}
                    },
                    "targets" : 5
				},{
				'render':function(data,type,row,meta){
						if(data < 100){
							return '<div class="LRTM-process active"><div style="width: '+data+'%;"></div><span>'+data+'%</span></div>';
						}else if(data >= 100){
							return '<div class="LRTM-process"><div style="width: 100%;"></div><span>100%</span></div>';
						}else{
							return '<div class="LRTM-process"><div style="width: 0%;"></div><span>0%</span></div>';
						}
					},
					'targets': 6
				},{
				'render':function(data,type,row,meta){
						if(data < 1024){
							return data+'B';
						}else if(data < 1024*1024){
							return (data/1024).toFixed(2)+'KB';
						}else if(data < 1024*1024*1024){
							return (data/1024/1024).toFixed(2)+'MB';
						}else if(data < 1024*1024*1024*1024){
							return (data/1024/1024/1024).toFixed(2)+'GB';
						}else if(data < 1024*1024*1024*1024*1024){
							return (data/1024/1024/1024/1024).toFixed(2)+'TB';
						}
					},
					'targets': 7
				},{
					"render": function(data, type, row, meta) {
						var toFirstString = '',
							cancelString = '',
							editString = '';
						if(row.taskStatus == '0' && row.taskSeq != '1'){
							toFirstString = '<span class="link-first fa fa-arrow-up" title="顶至首位"></span>';
						}

						if(row.taskStatus == '0'){
							cancelString = '<span class="link-del fa fa-times" title="取消任务"></span>';
						}

						if(row.taskStatus != '1' && row.taskStatus != '2'){
							editString = '<span class="link-edit fa fa-edit" title="编辑任务"></span>';
						}

						return '<span class="link-vi fa fa-file-text-o" title="查看任务"></span>'+editString+cancelString+toFirstString;
                    },
                    "targets" : 9
                    // 
				}]
			});

			var $logSourceTable = $("#logSourceTable", $el).DataTable({
				'searching': true,
				'bPaginate': false, // 开关，是否显示分页器
				'bSort': false,
				'columns':[{
					data: '',defaultContent:''
				},{
					data: 'sourceId',defaultContent:''
				},{
					data: 'sourceName',defaultContent:''
				},{
					data: 'appName',defaultContent:''
				},{
					data: '',defaultContent:''
				},{
					data: 'collectionCumulant',defaultContent:''
				},{
					data: 'logName',defaultContent:''
				}],
				'aoColumnDefs': [{
					'render':function(data,type,row,meta){
						return '<i class="fa fa-square-o"></i>'
					},
					'targets': 0
				},{
					'render':function(data,type,row,meta){
						return ''+row.category1+'>'+row.category2+'>'+row.category3;
					},
					'targets': 4
				},{
					'render':function(data,type,row,meta){
						if(data < 1024){
							return data+'B';
						}else if(data < 1024*1024){
							return (data/1024).toFixed(2)+'KB';
						}else if(data < 1024*1024*1024){
							return (data/1024/1024).toFixed(2)+'MB';
						}else if(data < 1024*1024*1024*1024){
							return (data/1024/1024/1024).toFixed(2)+'GB';
						}else if(data < 1024*1024*1024*1024*1024){
							return (data/1024/1024/1024/1024).toFixed(2)+'TB';
						}
					},
					'targets': 5
				},{
					'render':function(data,type,row,meta){
						return '<span class="selectRole" logId="'+row.logId+'">'+data+'</span>';
					},
					'targets': 6
				}]
			})
			
			$('.LRFTM-btns', $el).on('click', '.confirmBtn', function(event) {
				event.preventDefault();
				var $btn = $(this);
				if($btn.hasClass('operate')){
					return;
				}
				$btn.addClass('operate').find('i').addClass('fa-spin');
				handler.setTimeout(function() {
					loadSearchTableData().then(function (data) {
						$btn.removeClass('operate').find('i').removeClass('fa-spin');
					})
				}, 500);
				
			});

			loadSearchTableData();
			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			function loadSearchTableData() {
				return app.common.ajaxWithAfa({
					url:'LogCfgTaskAction_listLogTasks.do'
				}).done(function (data) {
					$searchTable.clear();

					var result = data.result;
					if(result && result.length > 0){
						result.forEach(function (item, index) {
							item.index = index+1;
						})
					}
					$searchTable.rows.add(result).draw(false);

					return $.Deferred().resolve(data);
				})
			}
			
			$('#searchTable',$el).on('click', 'tbody span.link-del', function(event) {//取消
				var tr = $searchTable.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定取消该条任务？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgTaskAction_cancelTask.do',
	                		data:{
	                			taskId: tr.taskId
	                		}
	                	}).done(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert('取消任务成功！');
	                			loadSearchTableData();
	                		}else{
	                			app.alert('取消任务失败！');
	                		}
	                	})
	                },
	                aArgs: [tr]
				});
			}).on('click', 'tbody span.link-vi', function(event) {// 查看
				var tr = $searchTable.row($(this).parents('tr')).data();
				urlData.search = tr.taskCond;
				urlData.startTime = tr.startTime;
				urlData.endTime = tr.endTime;
				$('[name="taskDesc"]', $reStructDataModal).attr('disabled', 'disabled');
				$('#viBtn', $reStructDataModal).show().siblings().hide();
				OPERATE = false;
				initReStructDataModal(urlData, tr);
			}).on('click', 'tbody span.link-edit', function(event) {//编辑
				$reStructDataModal.removeData();
				var tr = $searchTable.row($(this).parents('tr')).data();
				urlData.search = tr.taskCond;
				urlData.startTime = tr.startTime;
				urlData.endTime = tr.endTime;
				$('[name="taskDesc"]', $reStructDataModal).removeAttr('disabled');
				$('#editBtn', $reStructDataModal).show().siblings().hide();
				OPERATE = true;
				initReStructDataModal(urlData, tr);
				$reStructDataModal.data(tr);
			}).on('click', '.link-first', function(event) {//顶至首位
				event.preventDefault();
				var tr = $searchTable.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定将该条任务顶至首位？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgTaskAction_putTaskToTop.do',
	                		data:{
	                			taskId: tr.taskId
	                		}
	                	}).done(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert('操作成功！');
	                			loadSearchTableData();
	                		}else{
	                			app.alert('操作失败！');
	                		}
	                	})
	                },
	                aArgs: [tr]
				});
			});

			$el.on('click', function(event) {
				event.preventDefault();
				if($(event.target).closest($('#roleSelectContent', $el)).length == 0){
					$('#roleSelectContent', $el).hide();
					$('.selectRole', $('#reStructDataModal', $el)).removeClass('active');
				}
			});

			$reStructDataModal.on('click', '#selectAll', function(event) {
				event.preventDefault();
				if(!OPERATE){
					return;
				}
				if($(this).hasClass('fa-check-square')){//取消选择
					$(this).addClass('fa-square-o').removeClass('fa-square-o fa-minus-square selected');
					$reStructDataModal.find('tbody i').removeClass('fa-check-square selected').addClass('fa-square-o').parents('tr').removeClass('selected');
				}else{
					$reStructDataModal.find('tbody i').removeClass('fa-square-o').addClass('fa-check-square selected').parents('tr').addClass('selected');
					$(this).addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
				}
				$("#logSourceTable .fa", $el).trigger('roleSelected');
				return;
			}).on('click', '.fa-check-square', function(event) {
				event.preventDefault();
				if(!OPERATE){
					return;
				}
				$(this).removeClass('fa-check-square selected').addClass('fa-square-o');
				$(this).parents('tr').removeClass('selected');
				var trLen = $reStructDataModal.find('tbody tr').length;
				var selectedTr = $reStructDataModal.find('tbody tr.selected').length;
				var $selectAll = $('#selectAll', $reStructDataModal);
				if(selectedTr == trLen){
					$selectAll.addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
				}else if(selectedTr == 0){
					$selectAll.addClass('fa-square-o').removeClass('fa-check-square selected fa-minus-square');
				}else{
					$selectAll.addClass('fa-minus-square selected').removeClass('fa-check-square fa-square-o');
				}
				$("#logSourceTable .fa", $el).trigger('roleSelected');
			}).on('click', '.fa-square-o', function(event) {
				event.preventDefault();
				if(!OPERATE){
					return;
				}
				$(this).parents('tr').addClass('selected');
				$(this).addClass('fa-check-square selected').removeClass('fa-square-o');
				var trLen = $reStructDataModal.find('tbody tr').length;
				var selectedTr = $reStructDataModal.find('tbody tr.selected').length;
				var $selectAll = $('#selectAll', $reStructDataModal);
				if(selectedTr == trLen){
					$selectAll.addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
				}else if(selectedTr == 0){
					$selectAll.addClass('fa-square-o').removeClass('fa-check-square selected fa-minus-square');
				}else{
					$selectAll.addClass('fa-minus-square selected').removeClass('fa-check-square fa-square-o');
				}
				$("#logSourceTable .fa", $el).trigger('roleSelected');
			}).on('roleSelected', '.fa', function(event) {
				event.preventDefault();
				var size = 0;
				var trs = $("#logSourceTable tbody>tr.selected", $el);
				if(trs && trs.length > 0){
					for (var i = trs.length - 1; i >= 0; i--) {
						var tmp = $logSourceTable.row($(trs[i])).data().collectionCumulant;
						if(tmp){
							size += parseInt(tmp);
						}
					}
				} 
				var resultStr;
				if(size < 1024){
					resultStr = size+'B';
				}else if(size < 1024*1024){
					resultStr = (size/1024).toFixed(2)+'KB';
				}else if(size < 1024*1024*1024){
					resultStr = (size/1024/1024).toFixed(2)+'MB';
				}else if(size < 1024*1024*1024*1024){
					resultStr = (size/1024/1024/1024).toFixed(2)+'GB';
				}else if(size < 1024*1024*1024*1024*1024){
					resultStr = (size/1024/1024/1024/1024).toFixed(2)+'TB';
				}
				$('[name="dataSize"]', $('#reStructDataModal', $el)).val(resultStr).attr('size', size);
			})
			// 选择解析规则
			.on('click', '.selectRole', function(event) {
				if($(this).hasClass('active') || !OPERATE){
					return;
				}

				$('.selectRole', $reStructDataModal).removeClass('active');
				$(this).addClass('active');
				var id = $(this).attr('logId');
				$('.roleSelectItems span', $el).removeClass('active');
				$('.roleSelectItems span[logId="'+id+'"]', $el).addClass('active');

				$('#roleSelectContent', $el).show();
				var top = $(this).position().top+ 30 - $('#roleSelectContent', $el).height()/2;
				$('#roleSelectContent', $el).css('top', top+'px');
				event.stopPropagation();
			})
			// 解析规则改变
			.on('RoleChange', '.selectRole', function(event, logId, logName) {
				var tr = $(this).parents('tr');
				var data = $logSourceTable.row($(this).parents('tr')).data();
				data.logId = logId;
				data.logName = logName;
				$logSourceTable.row($(this).parents('tr')).data(data).draw();
				tr.find('.selectRole').addClass('active');
			})
			// 解析规则选择
			.on('click', '.role', function(event) {
				event.preventDefault();
				if($(this).hasClass('active')){
					return;
				}

				$('.roleSelectItems span', $el).removeClass('active');
				$(this).addClass('active');
				var id = $(this).attr('logId');
				$('.selectRole.active', $reStructDataModal).html($(this).text()).attr('logId', id).trigger('RoleChange',[id, $(this).text()])
			})
			// 关闭解析规则选择
			.on('click', '.roleSelectContent-close', function(event) {
				event.preventDefault();
				$('#roleSelectContent', $el).hide();
				$('.selectRole', $reStructDataModal).removeClass('active');
			})
			// 任务提交
			.on('click', '.confirmBtn', function(event) {
				var oldData = $reStructDataModal.data();
				var data = formatReStructDataModalData();
				if(data){
					data.taskId = oldData.taskId;
					data.taskSeq = oldData.taskSeq;
					submitReStructDataModalData(data).then(function (data) {
						if(data.result){
							app.alert('操作成功');
							loadSearchTableData();
						}else{
							app.alert('title', '操作失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
						}
						$reStructDataModal.modal('hide');
					})
				}
			});

			/**
			 * 提交二次结构化任务
			 * @param  {[type]} urlData [description]
			 * @return {[type]}         [description]
			 */
			function submitReStructDataModalData(urlData) {
				return app.common.ajaxWithAfa({
					url:'LogCfgTaskAction_updateTask.do',
					data: urlData
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			/**
			 * 打包二次结构化模态框数据
			 * @return {[type]} [description]
			 */
			function formatReStructDataModalData() {
				var data = {};
				var keys=['taskDesc','taskCond','startTime','endTime', 'dataSize'];
				var structSelected = [];
				var trs = $("#logSourceTable tbody>tr.selected", $el);
				if(trs && trs.length > 0){
					for (var i = trs.length - 1; i >= 0; i--) {
						structSelected.push($logSourceTable.row($(trs[i])).data());
					}
				}
				if($('[name="taskDesc"]', $reStructDataModal).val() == ''){
					app.alert('请填写数据描述');
					return false;
				}
				if(structSelected.length <= 0){
					app.alert('请选择数据源');
					return false;
				}
				for (var i = keys.length - 1; i >= 0; i--) {
					var tmp = $('[name="'+keys[i]+'"]', $reStructDataModal).val();
					data[keys[i]] = tmp;
				}
				data.dataSize = $('[name="dataSize"]', $('#reStructDataModal', $el)).attr('size');
				data.sourceList = JSON.stringify(structSelected);
				return data;
			}

			/**
			 * 初始化二次结构化模态框
			 * @return {[type]} [description]
			 */
			function initReStructDataModal(urlData, trData) {
				$reStructDataModal.find('form')[0].reset();
				$('#selectAll', $reStructDataModal).removeClass('fa-check-square selected fa-minus-square').addClass('fa-square-o');
				$logSourceTable.clear().draw();
				for (var item in trData) {
					if(item == 'dataSize'){
						var size = trData[item];
						var resultStr = '';
						if(size < 1024){
							resultStr = size+'B';
						}else if(size < 1024*1024){
							resultStr = (size/1024).toFixed(2)+'KB';
						}else if(size < 1024*1024*1024){
							resultStr = (size/1024/1024).toFixed(2)+'MB';
						}else if(size < 1024*1024*1024*1024){
							resultStr = (size/1024/1024/1024).toFixed(2)+'GB';
						}else if(size < 1024*1024*1024*1024*1024){
							resultStr = (size/1024/1024/1024/1024).toFixed(2)+'TB';
						}
						$('[name="dataSize"]', $reStructDataModal).attr('size',size).val(resultStr);
					}else{
						$('[name="'+item+'"]', $reStructDataModal).val(trData[item]);
					}
				}

				$reStructDataModal.modal('show');
				getDataByTaskId(trData.taskId).then(function (data) {
					if(data.result && data.result.sourceList && data.result.sourceList.length > 0){
						$logSourceTable.rows.add(data.result.sourceList).draw();
					}
				});
				
				getLogTypes().then(function (data) {
					var result = data.result;
					for (var i = 0; i < result.logTypes.length; i++) {
						var typeId = result.logTypes[i].typeId;
						getLogByType(typeId);
					}
				});
			}

			function getDataByTaskId(taskId) {
				return app.common.ajaxWithAfa({
					url:'LogCfgTaskAction_viewTask.do',
					data:{
						taskId:taskId
					}
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}
			/**
			 * 获取二次结构化任务排队序号
			 * @return {[type]} [description]
			 */
			function getTaskSeq(sourceIds) {
				return app.common.ajaxWithAfa({
					url:'LogCfgTaskAction_getTaskSeq.do'
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			/**
			 * 根据日志源IDs获取日志源信息
			 * @param  {[type]} sourceIds [description]
			 * @return {[type]}           [description]
			 */
			function getSourcesBySourceIds(sourceIds) {
				app.common.ajaxWithAfa({
					url:'LogCfgSourceAction_getSourcesBySourceIds.do',
					data:{
						sourceids:JSON.stringify(sourceIds)
					}
				}).done(function (data) {
					$logSourceTable.clear();
					if(data.result && data.result.length > 0){
						$logSourceTable.rows.add(data.result).draw();
					}
				})
			}

			/**
			 * 使用统计接口获取日志源IDs
			 * @return {[type]} [description]
			 */
			function getSourceIds() {
			 	return app.common.ajaxWithAfa({
			 		url:'ESSearchAction_sqlStatistics.do',
			 		data:$.extend(true, {},urlData,{
			 			sql:'select _head_.sourceid as _head_.sourceid from applog-* where 1=1 group by _head_.sourceid'
			 		})
			 		
			 	}).done(function (data) {
			 		return $.Deferred().resolve(data);
			 	});
			}

			/**
			 * 获取解析规则类型
			 * @return {[type]} [description]
			 */
			function getLogTypes() {
				return app.common.ajaxWithAfa({
					url: 'LogCfgAction_getCfgLogStatistics.do'
				}).done(function (data) {
					var result = data.result;
					if(result && !$.isEmptyObject(result)){
						var ulString = '<span class="roleSelectContent-close">x</span>';
						for (var i = 0; i < result.logTypes.length; i++) {
							ulString+='<li typeId="'+result.logTypes[i].typeId+'"><p>'+result.logTypes[i].typeName+'</p><div class="roleSelectItems"></div></li>';
						}
						$('#roleSelectContent', $el).html(ulString);
						$.Deferred().resolve(data);
					}
				})
			}

			/**
			 * 根据解析规则类型获取解析规则
			 * @param  {[type]} logType [description]
			 * @return {[type]}         [description]
			 */
			function getLogByType(logType) {
				return app.common.ajaxWithAfa({
					url:"LogCfgAction_getCfgLogInfoByTypeId.do",
					data:{
						'typeId':logType
					}
				}).done(function (data) {
					var result = data.result;
					var html = '';
					if(result && result.length>0){
						for (var i = 0; i < result.length; i++) {
							html += '<span class="role" logId="'+result[i].logId+'">'+result[i].logName+'</span>';
						}
						$('[typeId="'+logType+'"]>.roleSelectItems', $('#roleSelectContent', $el)).html(html);
					}
				})
			}
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){

		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});
