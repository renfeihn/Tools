define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {

			// 获取传入的appId
			var appId = scope.appId?scope.appId:'1002';// 1002 测试数据
			var $form = $('.clearApplication-div form', $el);

			$('#executeTime', $el).datetimepicker({
				format: 'hh:ii',
				minView:0,
				startView : 1,
				autoclose:1,
				minuteStep:1
			});

			var option_data_dict = {};
			var option_file_dict = {};

			var dataCleanSchedule = null;
			$('#dataBakId, #fileBakId', $el).on('change', function(event) {
				var value = $(this).val(),
					$obj = $(this).next('.plan-detail');
				if(value){
					$obj.removeClass('hide');
				}else{
					$obj.addClass('hide');
				}
			});
			$.when(
				app.common.ajaxWithAfa({
					url: "DataCleanAction_getDataCleanByDataType.do",
					data: {
						"dataType": 1
					},
				}),
				app.common.ajaxWithAfa({
					url: "DataCleanAction_getDataCleanByDataType.do",
					data: {
						"dataType": 2
					},
				}),
				app.common.ajaxWithAfa({
					url: "DataCleanAction_getDataCleanScheduleByAppId.do",
					data: {
						"appId": appId
					},
				})
			)
			.done(function(content1, content2, content3){
				// 数据 备份策略名称 下拉字典
				content1.result.forEach(function(item, index){
					option_data_dict[item.id] = item.cleanName;
					var $option = $('<option value="'+ item.id +'">'+ item.cleanName +'</option>');
					for(let key in item){
						$option[0].dataset[key] = item[key];
					}
					$('#dataBakId', $el).append($option).trigger('change');
				});

				// 文件 备份策略名称 下拉字典
				content2.result.forEach(function(item, index){
					option_file_dict[item.id] = item.cleanName;
					var $option = $('<option value="'+ item.id +'">'+ item.cleanName +'</option>');
					for(let key in item){
						$option[0].dataset[key] = item[key];
					}
					$('#fileBakId', $el).append($option).trigger('change');
				});

				if(content3.result && content3.result.length == 1){
					var data = content3.result[0];
					dataCleanSchedule = data;
					$form.attr('id', data['id']);
					$('#dataCleanType', $form).addClass(data['dataCleanType']==1?'true':'').prev().html(data['dataCleanType']==1?'是':'否');
					$('#fileCleanType', $form).addClass(data['fileCleanType']==1?'true':'').prev().html(data['fileCleanType']==1?'是':'否');
					$('#dataBakId', $form).val(data['dataBakId']).trigger('change').prev().html(data['dataBakId']?option_data_dict[data['dataBakId']]:'不备份');
					$('#fileBakId', $form).val(data['fileBakId']).trigger('change').prev().html(data['fileBakId']?option_file_dict[data['fileBakId']]:'不备份');
					$('#retentionDays', $form).val(data['retentionDays']).prev().html(data['retentionDays']);
					$('#executeTime', $form).val(data['executeTime']).prev().html(data['executeTime']);
				}else{
					$form.find('[id]').removeClass('hide');
					$form.find('[id]').prev().addClass('hide');
					$('[data-role="edit"]', $el).attr('data-role', 'save').html('<i class="fa fa-check"></i>&nbsp;保存');
				}

			})

			$form.on('click', '[data-role="boolean-switch"]', function(){
				$(this).toggleClass('true');
			}).on('click', 'button[data-role="edit"]', function(){

				$form.find('[id]').each(function(){
					$(this).removeClass('hide').prev().addClass('hide');
				})
				$(this).attr('data-role', 'save').html('<i class="fa fa-check"></i>&nbsp;保存');
				$('[data-role="cancel"]', $el).removeClass('hide');

			}).on('click', 'button[data-role="cancel"]', function(){
				$('.help-inline', $form).remove();
				$('#dataCleanType', $form).attr('class', dataCleanSchedule['dataCleanType']==1?'true':'');
				$('#fileCleanType', $form).attr('class', dataCleanSchedule['fileCleanType']==1?'true':'');
				$('#dataBakId', $form).val(dataCleanSchedule['dataBakId']).trigger('change');
				$('#fileBakId', $form).val(dataCleanSchedule['fileBakId']).trigger('change');
				$('#retentionDays', $form).val(dataCleanSchedule['retentionDays']);
				$('#executeTime', $form).val(dataCleanSchedule['executeTime']);
				$form.find('[id]').addClass('hide');
				$form.find('[id]').prev().removeClass('hide');
				$('[data-role="save"]', $el).attr('data-role', 'edit').html('<i class="fa fa-edit"></i>&nbsp;编辑');
				$(this).addClass('hide');

			}).on('click', 'button[data-role="save"]', function(){
				var flag = true;
				$('input', $form).each(function(){
					if($(this).val() == ''){
						flag = false;
						if(!$(this).next().hasClass('help-inline')){
							$(this).after('<span class="help-inline">不能为空</span>')
						}
					}else{
						if($(this).next().hasClass('help-inline')){
							$(this).next().remove();
						}
					}
				})
				if(!flag){
					return;
				}

				var scheduleStr = {};
				if($form.attr('id')){
					var url = "DataCleanAction_updateDataCleanSchedule.do";
					scheduleStr['id'] = $form.attr('id');
				}else{
					var url = "DataCleanAction_addDataCleanSchedule.do"
				}
				scheduleStr['appId'] = appId;

				scheduleStr['dataCleanType'] = getSwitchValue('#dataCleanType');
				scheduleStr['dataBakId'] = $('#dataBakId', $el).val();
				scheduleStr['fileCleanType'] = getSwitchValue('#fileCleanType');
				scheduleStr['fileBakId'] = $('#fileBakId', $el).val();

				scheduleStr['retentionDays'] = $('#retentionDays', $el).val();
				scheduleStr['executeTime'] = $('#executeTime', $el).val();

				app.common.ajaxWithAfa({
					url: url,
					data: {
						'scheduleStr': JSON.stringify(scheduleStr)
					}
				}).done(function(content) {
					if(content.result){
						app.alert("保存成功")
						if(url == "DataCleanAction_addDataCleanSchedule.do"){
							$form.attr('id', content.result);
							scheduleStr['id'] = content.result;
						}
						dataCleanSchedule = scheduleStr;
						$('#dataCleanType', $form).prev().html(scheduleStr['dataCleanType']==1?'是':'否');
						$('#fileCleanType', $form).prev().html(scheduleStr['fileCleanType']==1?'是':'否');
						$('#dataBakId', $form).prev().html(scheduleStr['dataBakId']?option_data_dict[scheduleStr['dataBakId']]:'不备份');
						$('#fileBakId', $form).prev().html(scheduleStr['fileBakId']?option_file_dict[scheduleStr['fileBakId']]:'不备份');
						$('#retentionDays', $form).prev().html(scheduleStr['retentionDays']);
						$('#executeTime', $form).prev().html(scheduleStr['executeTime']);

						$form.find('[id]').addClass('hide');
						$form.find('[id]').prev().removeClass('hide');
						$('[data-role="save"]', $el).attr('data-role', 'edit').html('<i class="fa fa-edit"></i>&nbsp;编辑');
						$('[data-role="cancel"]', $el).addClass('hide');
					}else{
						app.alert("保存失败")
					}
				})
			}).on('click', '.plan-detail', function(e){
				e.stopPropagation();
				if($(this).prev().val()){
					var detailsMap = $(this).prev().find('option:selected')[0].dataset;
					console.log(detailsMap);
					var $content = $(`<table class="plan-detail-table">
						<tr>
							<td>策略名称</td>
							<td data-name="cleanName"></td>
						</tr>
						<tr>
							<td>备份类型</td>
							<td data-name="dataType"></td>
						</tr>
						<tr>
							<td>备份方式</td>
							<td data-name="bakType"></td>
						</tr>
						<tr>
							<td>压缩方式</td>
							<td data-name="packType"></td>
						</tr>
						<tr>
							<td>备份文件目录</td>
							<td data-name="bakDir"></td>
						</tr>
						<tr>
							<td>文件传输方式</td>
							<td data-name="transType"></td>
						</tr>
						<tr>
							<td>服务器地址</td>
							<td data-name="address"></td>
						</tr>
						<tr>
							<td>用户名</td>
							<td data-name="userName"></td>
						</tr>
						<tr>
							<td>密码</td>
							<td data-name="passwd"></td>
						</tr>
					</table>`);
					$content.find('[data-name]').each(function(){
						var name = $(this).attr('data-name');
						if(name in detailsMap){
							switch (name){
								case 'dataType': 
									$(this).html(detailsMap[name]=='1'?'数据':'文件');
									break;
								case 'bakType':
									$(this).html(detailsMap[name]=='1'?'本地文件':'远程服务器');
									break;
								case 'packType':
									$(this).html(detailsMap[name]=='1'?'tar.gz':'tar');
									break;
								case 'transType':
									if(detailsMap[name]=='1'){
										$(this).html('ftp');
									}else if(detailsMap[name]=='2') {
										$(this).html('sftp');
									}else{
										$(this).html('scp');
									}
									break;
								default:
									$(this).html(detailsMap[name]);
									break;
							}
						}else{
							$(this).closest('tr').addClass('hide')
						}
					});
					$(this).popover('destroy').popover({
						'html': true,
						'trigger': 'focus',
						'placement': 'right',
						'title': false,
						'content': $content[0].outerHTML
					}).popover('show');
				}
			});

			$el.on('click', function(){
				$('.plan-detail', $el).popover('hide');
			})

			var $dataTable = $("#dataTable",$el).DataTable({
				'searching': false,
				"ordering": false,
				'columns': [{
					data: 'index',
					defaultContent: '-'
				},{
					data: 'cleanType',
					defaultContent: '-'
				},{
					data: 'beforSize',
					defaultContent: '-'
				},{
					data: 'afterSize',
					defaultContent: '-'
				},{
					data: 'executeTime',
					defaultContent: '-'
				}],
				'aoColumnDefs':[{
					'render':function(data,type,row,meta){
						if(data== '1'){
							return '数据'
						}else if(data == '2'){
							return '文件'
						}
					},
					'targets':1
				}]
			});

			app.common.ajaxWithAfa({
				url: "DataCleanAction_getDataCleanHisByAppId.do",
				data: {
					'appId': appId
				}
			}).done(function(content){
				content.result.forEach(function(item, index){
					item['index'] = index+1;
				})
				$dataTable.rows.add(content.result).draw();
			});

			function getSwitchValue(cleanType){
				if($(cleanType, $el).hasClass('true')){
					return 1;
				}else{
					return 0;
				}
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
