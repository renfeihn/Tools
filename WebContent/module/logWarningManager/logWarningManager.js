define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			var $warningModal = $('#warningModal',$el);
			var activeTrData,
			eventModel;
			//agent采集Table
			var $searchTable = $('#searchTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'name', defaultContent : ''
				},{
					data : 'search', defaultContent : ''
				},{
					data : 'conditions', defaultContent : ''
				},{
					data : 'isOpen', defaultContent : ''
				},{
					data : 'planType', defaultContent : ''
				},{
					data : 'warnType', defaultContent : ''
				},{
					data : '', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						if(data == '5' || data == '6'){
							return row.customize;
						}else if(data == '1'){
							return '结果数';
						}else if(data == '2'){
							return '主机数';
						}else if(data == '3'){
							return '应用数';
						}else if(data == '4'){
							return '日志源数';
						}
                    },
                    "targets" : 3
				},{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<i class="fa fa-cog fa-spin" style="color:var(--color-success)"></i>已启动';
						}else if( data == '2'){
							return '<i class="fa fa-cog"></i>未启动';
						}
                    },
                    "targets" : 4
				},{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '计划';
						}else if(data == '2'){
							return '定时';
						}
                    },
                    "targets" : 5
				},{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<i class="fa fa-comment-o" style="color:var(--color-theme);"></i>短信';
						}else if(data == '2'){
							return '<i class="fa fa-envelope-o" style="color:var(--color-theme);"></i>邮件';
						}
                    },
                    "targets" : 6
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-edit fa fa-edit" title="编辑"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
                    },
                    "targets" : 7
				}]
			});
			
			loadSearchTableData();
			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			function loadSearchTableData() {
				app.common.ajaxWithAfa({
					url:'LogWarningAction_getAllWarning.do'
				}).done(function (data) {
					$searchTable.clear();

					var result = data.result;
					if(result && result.length > 0){
						result.forEach(function (item, index) {
							item.index = index+1;
						})
					}
					$searchTable.rows.add(result).draw(false);
				})
			}
			
			$('#searchTable',$el).on('click', 'tbody span.link-del', function(event) {//删除
				var tr = $searchTable.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定删除该条记录？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'LogWarningAction_delWarningById.do',
	                		data:{
	                			id: tr.id
	                		}
	                	}).done(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert('删除成功！');
	                			loadSearchTableData();
	                		}else{
	                			app.alert('删除记录失败！');
	                		}
	                	})
	                },
	                aArgs: [tr]
				});
			}).on('click', 'tbody span.link-edit', function(event) {//编辑
				var tr = $searchTable.row($(this).parents('tr')).data();
				activeTrData = tr;
				getAllEventModel().then(function (data) {
					if(data.result && data.result.length > 0){
						eventModel = {
							'0':{
								name:'自定义',
								content:''
							}
						};
						data.result.forEach(function (item) {
							eventModel[item.id] = {
								name: item.name,
								content: item.content
							}
						})
					}

					$warningModal.modal('show');
					initWarningModal(tr);
				})
				
			});

			function getAllEventModel() {
				return app.common.ajaxWithAfa({
					url:'LogWarningAction_getAllEventModel.do'
				}).done(function (data) {

					return $.Deferred().resolve(data)
				})
			}

			// 预警模态框事件
			$warningModal.on('click', '.confirmBtn', function(event) {
				var id = $warningModal.attr('data-id');
				app.common.ajaxWithAfa({
					url:'LogWarningAction_updateWarning.do',
					data:{
						warning: JSON.stringify($.extend(getWarningModalData(), {id:id,mustValue:activeTrData.mustValue}))
					}
				}).done(function (data) {
					if(data.result){
						app.alert('修改成功！');
						loadSearchTableData();
					}else{
						app.alert('修改失败！');
					}
					$warningModal.modal('hide');
				})
			}).on('change', 'select[name="planType"]', function(event) {
				var value = $(this).val();
				if(value == 1){
					$('#planCondition', $warningModal).show();
				}else{
					$('#planCondition', $warningModal).hide();
				}
			}).on('change', 'select[name="conditions"]', function(event) {
				var value = $(this).val();
				if(value == 5 || value == 6){
					$('#conditionsUser', $warningModal).show();
					$('#conditionsNormal', $warningModal).hide();
				}else{
					$('#conditionsUser', $warningModal).hide();
					$('#conditionsNormal', $warningModal).show();
				}
			}).on('change', 'select[name="scheduleType"]', function(event) {
				var value = $(this).val();
				$(this).parent().parent().next().children().hide();
				if(value == 1){
					$('#minute', $warningModal).show();
				}else if(value == 2){
					$('#time', $warningModal).show();
				}else if(value == 3){
					$('#day', $warningModal).show();
					$('#time', $warningModal).show();
				}else if(value == 4){
					$('#date', $warningModal).show();
					$('#time', $warningModal).show();
				}
			}).on('change', '#modelSelect', function(event) {
				var value = $(this).val();
				$('[name=eventModel]', $warningModal).val(eventModel[value].content);
			});

			// 初始化预警模态框
			function initWarningModal(tr) {
				$warningModal.attr('data-id', tr.id);
				$warningModal.find('form')[0].reset();

				if(eventModel){
					var tmpHtml = '';
					for (var item in eventModel) {
						tmpHtml += '<option value="'+item+'">'+eventModel[item].name+'</option>'
					}
					$('#modelSelect', $el).html(tmpHtml).trigger('change');
				}
				
				var searchInput = tr.search;
				$("select[name='conditions']>option", $warningModal).addClass('hide');
				if(searchInput.split('|').length > 1){
					var tmpText = $.trim(searchInput.split('|')[1]);
					if(/^SELECT/gi.test(tmpText)){
						$("select[name='conditions']>option[data-type='sqlSearch']", $warningModal).removeClass('hide');
						$("select[name='conditions']", $el).val('6');
						$("select[name='conditions']", $el).trigger('change');
					}
	    		} else {
	    			$("select[name='conditions']>option:not([data-type='noSqlSearch'])", $warningModal).removeClass('hide');
	    		}
				

				for (var item in tr) {
					if (tr.hasOwnProperty(item)) {
						$('#'+item, $warningModal).val(tr[item]);
					}
				}
				if(tr.isOpen == 2){
					$('#isOpen', $warningModal).removeClass('true');
				}else{
					$('#isOpen', $warningModal).addClass('true');
				}

				$('#conditions', $warningModal).trigger('change');
				$('#planType', $warningModal).trigger('change');
				if(tr.planType == 1){
					$('#scheduleType', $warningModal).trigger('change');
					var intrval = tr.intervalTime.split(',');
					if(tr.scheduleType == 1){
						$('#minute', $warningModal).find('select').val(intrval[2]);
					}else if(tr.scheduleType == 2){
						$('#time', $warningModal).find('select').val(intrval[1]);
					}else if(tr.scheduleType == 3){
						$('#day', $warningModal).find('select').val(intrval[0]);
						$('#time', $warningModal).find('select').val(intrval[1]);
					}else if(tr.scheduleType == 4){
						$('#date', $warningModal).find('select').val(intrval[0]);
						$('#time', $warningModal).find('select').val(intrval[1]);
					}
				}
				
				

			}
			/**
			 * 获取预警模态框数据
			 */
			function getWarningModalData() {
				var paramData = app.common.serializeObject($warningModal.find('form'));
				if(paramData.planType == 1){
					var interval = ['00','00','00'];
					if(paramData.scheduleType == 1){
						interval[2] = $('#minute', $warningModal).find('select').val();
					}else if(paramData.scheduleType == 2){
						interval[1] = $('#time', $warningModal).find('select').val();
					}else if(paramData.scheduleType == 3){
						interval[0] = $('#day', $warningModal).find('select').val();
						interval[1] = $('#time', $warningModal).find('select').val();
					}else if(paramData.scheduleType == 4){
						interval[0] = $('#date', $warningModal).find('select').val();
						interval[1] = $('#time', $warningModal).find('select').val();
					}
					paramData.intervalTime = interval.join(',');
				}else{
					paramData.scheduleType = undefined;
				}
				paramData.isOpen = $('#isOpen',$warningModal).hasClass('true')?1:2;

				if(paramData.conditions == 5 || paramData.conditions == 6){
					paramData.customize = $('#conditionsUser', $warningModal).find('input').val();
					paramData.result = undefined;
					paramData.compare = undefined;
				}
	    		paramData.search = $('#search', $warningModal).val();
				return paramData;
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
