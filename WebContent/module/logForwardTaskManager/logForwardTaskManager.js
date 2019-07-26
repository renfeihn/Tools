define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			var $dataServiceModal = $('#dataServiceModal', $el),
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
					data : 'dataDesc', defaultContent : ''
				},{
					data : 'search', defaultContent : ''
				},{
					data : 'startTime', defaultContent : ''
				},{
					data : 'endTime', defaultContent : ''
				},{
					data : 'forwardStatus',defaultContent : ''
				},{
					data : 'forwardType', defaultContent : ''
				},{
					data : 'forwardSize', defaultContent : ''
				},/*{
					data : '', defaultContent : ''
				},*/{
					data : 'adress', defaultContent : ''
				}/*,{
					data : '', defaultContent : ''
				}*/],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						if(data != undefined){
							return new Date(data).Format('yyyy-MM-dd hh:mm:ss');
						}
                    },
                    "targets" : [3, 4]
				},{
					"render": function(data, type, row, meta) {
						if(data != undefined){
							switch(data) {
								case 0:
									return '<i class="fa fa-users" style="color:#4494fc;"></i>未转发';
								case 1:
									return '<i class="fa fa-spinner fa-pulse" style="color:#22ac38;"></i>转发中';
								case 2:
									return '<i class="fa fa-check-circle" style="color:#22ac38;"></i>处理完成';
							}
						}
                    },
                    "targets" : 5
				},{
				'render':function(data,type,row,meta){
						if(data == '1'){
							return 'kafka消息队列';
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
					'render':function(data,type,row,meta) {
						if(row.forwardTo && row.forwardTo != ''){
							var tmp = JSON.parse(row.forwardTo);
							if(tmp.address){
								return tmp.address;
							}else{
								return '';
							}
							
						}
					},
					'targets': 8
				}/*,{
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
				}*/]
			});

			var $DS_logSourceTable = $("#dataService_logSourceTable", $el).DataTable({
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
				}]
			})
			
			$('.LFTM-btns', $el).on('click', '.confirmBtn', function(event) {
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
					url:'DataForwardAction_getAllDataForward.do'
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
	                		url:'DataForwardAction_delDateForward.do',
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
				$('[name="taskDesc"]', $dataServiceModal).attr('disabled', 'disabled');
				$('#viBtn', $dataServiceModal).show().siblings().hide();
				OPERATE = false;
				initDataServiceModal(urlData, tr);
			}).on('click', 'tbody span.link-edit', function(event) {//编辑
				$dataServiceModal.removeData();
				var tr = $searchTable.row($(this).parents('tr')).data();
				urlData.search = tr.taskCond;
				urlData.startTime = tr.startTime;
				urlData.endTime = tr.endTime;
				$('[name="taskDesc"]', $dataServiceModal).removeAttr('disabled');
				$('#editBtn', $dataServiceModal).show().siblings().hide();
				OPERATE = true;
				initDataServiceModal(urlData, tr);
				$dataServiceModal.data(tr);
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
	                		url:'DataForwardAction_putTaskToTop.do',
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


			$dataServiceModal.on('click', '#selectAll', function(event) {
				event.preventDefault();
				if($(this).hasClass('fa-check-square')){//取消选择
					$(this).addClass('fa-square-o').removeClass('fa-square-o fa-minus-square selected');
					$dataServiceModal.find('tbody i').removeClass('fa-check-square selected').addClass('fa-square-o').parents('tr').removeClass('selected');
				}else{
					$dataServiceModal.find('tbody i').removeClass('fa-square-o').addClass('fa-check-square selected').parents('tr').addClass('selected');
					$(this).addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
				}
				$("#dataService_logSourceTable .fa", $el).trigger('roleSelected');
				return;
			}).on('click', '.fa-check-square', function(event) {
				event.preventDefault();
				$(this).removeClass('fa-check-square selected').addClass('fa-square-o');
				$(this).parents('tr').removeClass('selected');
				var trLen = $dataServiceModal.find('tbody tr').length;
				var selectedTr = $dataServiceModal.find('tbody tr.selected').length;
				var $selectAll = $('#selectAll', $dataServiceModal);
				if(selectedTr == trLen){
					$selectAll.addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
				}else if(selectedTr == 0){
					$selectAll.addClass('fa-square-o').removeClass('fa-check-square selected fa-minus-square');
				}else{
					$selectAll.addClass('fa-minus-square selected').removeClass('fa-check-square fa-square-o');
				}
				$("#dataService_logSourceTable .fa", $el).trigger('roleSelected');
			}).on('click', '.fa-square-o', function(event) {
				event.preventDefault();
				$(this).parents('tr').addClass('selected');
				$(this).addClass('fa-check-square selected').removeClass('fa-square-o');
				var trLen = $dataServiceModal.find('tbody tr').length;
				var selectedTr = $dataServiceModal.find('tbody tr.selected').length;
				var $selectAll = $('#selectAll', $dataServiceModal);
				if(selectedTr == trLen){
					$selectAll.addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
				}else if(selectedTr == 0){
					$selectAll.addClass('fa-square-o').removeClass('fa-check-square selected fa-minus-square');
				}else{
					$selectAll.addClass('fa-minus-square selected').removeClass('fa-check-square fa-square-o');
				}
				$("#dataService_logSourceTable .fa", $el).trigger('roleSelected');
			}).on('roleSelected', '.fa', function(event) {
				event.preventDefault();
				var size = 0;
				var trs = $("#dataService_logSourceTable tbody>tr.selected", $el);
				if(trs && trs.length > 0){
					for (var i = trs.length - 1; i >= 0; i--) {
						var tmp = $DS_logSourceTable.row($(trs[i])).data().collectionCumulant;
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
				$('[name="forwardSize"]', dataServiceModal).val(resultStr).attr('size', size);
			})
			// 任务提交
			.on('click', '.confirmBtn', function(event) {
				var data = formatDataServiceModalData();
				if(data){
					submitDataServiceModalData(data).then(function (data) {
						if(data.result){
							app.alert('操作成功');
						}else{
							app.alert('title', '操作失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
						}
						dataServiceModal.modal('hide');
					})
				}
			});

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

			function submitDataServiceModalData(paramData) {
				return app.common.ajaxWithAfa({
					url:'DataForwardAction_updateDateForward.do',
					data:paramData
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			function formatDataServiceModalData() {
				var data = {},
					$dataServiceModal = $('#dataServiceModal', $el);
				var dataForwardStrKey = ['dataDesc','search','timeType','forwardSize','includeStruct','forwardType'],
					forwardToKey = ['topicName','retentionDays','address','port'],
					structSelected = [],
					dataForwardStr = {},
					forwardTo = {},
					formData = app.common.serializeObject($dataServiceModal.find('form'));
				var trs = $("#dataService_logSourceTable tbody>tr.selected", $el);
				if(trs && trs.length > 0){
					for (var i = trs.length - 1; i >= 0; i--) {
						var tmpData = $DS_logSourceTable.row($(trs[i])).data();
						structSelected.push(tmpData.sourceId);
					}
				}
				if(!validateDSData()){
					app.alert('请填写必须项');
					return false;
				}
				if(structSelected.length <= 0){
					app.alert('请选择数据源');
					return false;
				}
				for (var i = dataForwardStrKey.length - 1; i >= 0; i--) {
					dataForwardStr[dataForwardStrKey[i]] = formData[dataForwardStrKey[i]];
				}
				for (var i = dataForwardStrKey.length - 1; i >= 0; i--) {
					forwardTo[forwardToKey[i]] = formData[forwardToKey[i]];
				}
				dataForwardStr.forwardSize = $('[name="forwardSize"]', $dataServiceModal).attr('size');
				dataForwardStr.sources = structSelected.join(',');

				data.dataForwardStr = JSON.stringify(dataForwardStr);
				data.forwardTo = JSON.stringify(forwardTo);
				return data;
			}

			function validateDSData() {
				var validateResult = app.validate.validate({
					$context: $('#dataServiceModal', $el),
					data: [{
						"id": "ds_dataDesc",
						"filter": {
							"require": true
						},
					}, {
						"id": "ds_topicName",
						"filter": {
							"require": true
						},
					}, {
						"id": "ds_retentionDays",
						"filter": {
							"require": true,
						},
					}, {
						"id": "ds_address",
						"filter": {
							"require": true
						},
					}, {
						"id": "ds_port",
						"filter": {
							"require": true,
						},
					}]
				});
				return validateResult.bResult;
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
