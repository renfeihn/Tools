define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			// 全局变量	
			var selectClass;
			var activeClassData = {};//当前分类数据
			var activeRowData;//当前选中的行数据

			var $addLogClassModal = $('#addLogClassModal',$el);
			var $addLogClassForm = $('form',$addLogClassModal)[0];

			var $logSourceTable = $('#logSourceTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'logName', defaultContent : ''
				},/*{
					data : 'logType', defaultContent : ''
				},*/{
					data : 'logCoding', defaultContent : ''
				},{
					data : 'lineFlag', defaultContent : ''
				},{
					data : null
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						if(data == '0'){
							return '多行模式';
						}else{
							return '单行模式';
						}	
                    },
                    "targets" : 3
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-modify fa fa-edit" title="修改"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
							
                    },
                    "targets" : 4
				}]
			})

			// 事件——日志源信息table
			$('#logSourceTable',$el).on('click', 'tbody span.link-del', function(event) {
				var tr = $logSourceTable.row($(this).parent().parent()).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定删除该条日志源信息？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgAction_delCfgLogInfo.do',
	                		data:{
	                			logId:tr.logId
	                		}
	                	}).done(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert(data.result);
	                			getStatistics();
	                		}
	                	})
	                },
	                aArgs: [tr]
				})
			})
			// 修改
			.on('click', 'tbody span.link-modify', function(event) {
				var tr = $logSourceTable.row($(this).parent().parent()).data();
				// 打开新增修改页面
				showLogInfoConfig(tr);
			})
			.on('click', 'tbody>tr', function(event) {
				event.preventDefault();
				
				activeRowData = $logSourceTable.row($(this)).data();
				if(activeRowData){
					$(this).addClass('selected').siblings().removeClass('selected');

					$('#tableBtnGroup button', $el).removeClass('disabled');
				}
			});

			// 分类列表点击事件
			$('#logTypeList', $el).on('click', 'li', function(event){
				var thisObj = $(this);
				var $li = $('#logInfoListUl>li:last', $el);
				if(!thisObj.hasClass('active') && $('#tabs2', $el).html() != ''){
					$li.find('.flowCM-closeBtn').click();
				}

				thisObj.addClass('active').siblings().removeClass('active');
				activeClassData = {};

				activeClassData["typeName"] = thisObj.text();
				activeClassData["logType"] = thisObj.attr("typeId");

				selectClass = activeClassData;
				$('#title_class',$el).text(activeClassData.typeName);
				getLogByType(activeClassData.logType);

				event.stopPropagation();
			}).on('click', 'button.editClass', function(event) {
				event.preventDefault();
				$("#addLogClassModalTitle", $el).text("修改");
				$('#typeName', $addLogClassModal).next().addClass('hide');
				var tmpData = {};
				tmpData.typeName = $(this).parent().text().trim();
				tmpData.logType = $(this).parent().attr("typeId").trim();

				for (var i in tmpData) {
					if (tmpData.hasOwnProperty(i)) {
						$('#'+i, $addLogClassForm).val(tmpData[i]);
					}
				}
				$('#logClassDel', $addLogClassModal).show();
				$addLogClassModal.modal('show');
				$addLogClassModal.data({logType:tmpData.logType});
				event.stopPropagation();
			});

			// 获取统计数据
			getStatistics();
			function getStatistics() {
				$.ajax({
					url: 'LogCfgAction_getCfgLogStatistics.do',
					type: "POST",
					success: function(data) {
						var result = data.content.result;
						if(result && !$.isEmptyObject(result)){
							$("#typeCount",$el).text(result.logTypeCount == undefined?'-':result.logTypeCount);
							$("#logCount",$el).text(result.logLogCount == undefined?'-':result.logLogCount);
							var ulString = '';
							for (var i = 0; i < result.logTypes.length; i++) {
								ulString+='<li typeId="'+result.logTypes[i].typeId+'">'+result.logTypes[i].typeName+'\
								<button class="fa fa-pencil-square-o editClass"></button></li>';
							}

							$('#logTypeList', $el).html(ulString);
							if(selectClass){
								$('#logTypeList>li[typeid='+selectClass.logType+']', $el).trigger('click').addClass('active');
							}else{
								$('#logTypeList>li:first', $el).trigger('click').addClass('active');
							}
						}
					}
				});
			}
			
			// 获取某个分类下的日志源信息
			function getLogByType(logType) {
				$('#tableBtnGroup button:last-child',$el).addClass('disabled');
				app.common.ajaxWithAfa({
					url:"LogCfgAction_getCfgLogInfoByTypeId.do",
					data:{
						'typeId':logType
					}
				}).done(function (data) {
					$logSourceTable.clear();
					var result = data.result;
					result.forEach(function(item, index){
						item['index'] = ++index;
					})

					$logSourceTable.rows.add(result).draw();
					activeRowData = undefined;
				})
			}

			// 新增采集日志源按钮
			$('#tableBtnGroup',$el).on('click', '#addLogSource', function(event) {
				event.preventDefault();
				showLogInfoConfig();
			})
			// 导入
			.on('click', '#import', function(event) {
				event.preventDefault();
				$('#file',$el).click();
			})
			// 导出
			.on('click', '#export', function(event) {
				event.preventDefault();
				if($(this).hasClass('disabled')){
					return;
				}
				$.ajaxDownload('LogCfgAction_exportFile.do',{logId:activeRowData.logId});
			}).on('change', '[name=file]', function(event) {
				$.ajaxFileUpload({
					url:"LogCfgAction_importFile.do",//处理文件脚本
					secureuri :false,
					fileElementId :'file',//file控件id
					dataType : 'json',
					timeout: 600000,
					success:function(data){
						if (!data || !data.status) {
							app.alert("文件解析失败，请联系管理员！");
						}else{
							if(data.content.result){
								app.alert('导入成功');
								getStatistics();
							}else{
								app.alert("文件解析失败，请联系管理员！");
							}
						}

						$('#file',$('#tableBtnGroup',$el)).remove();
						$('#export', $el).after('<input type="file" id="file" name="file" style="display: none;">');
					},
					error : function(request, status, err){
						if (status == "timeout"){
							app.alert("请求超时，请稍后再试！");
							
		                }
		                $('#file',$('#tableBtnGroup',$el)).remove();
		                $('#export', $el).after('<input type="file" id="file" name="file" style="display: none;">');
					}
				});
			});

			function showLogInfoConfig(data) {
				var $li = $('#logInfoListUl>li:last', $el);
				var title= "新增解析规则";
				if(data){
					title= "修改解析规则";
				}
				app.dispatcher2.load({
					title: "",
					moduleId:"logInfoConfigManage",
					section:'addLogInfoConfig',
					frameRenderTo:'#tabs2',
					id: 'addLogInfoConfig',
					params:{
						data: data,
						parentPageContext: $el,
						activeClass:activeClassData
					},
					context: $el
				});

				$li.show();
				$li.find('a').click();
				$li.find('a>#title').text(title);
			}


			// 页签关闭按钮
			$('.flowCM-closeBtn', $el).on('click', function(event,flag) {
				event.preventDefault();
				var $li = $('#logInfoListUl>li:first>a', $el);
				$li.click();

				app.dispatcher2.unload('addLogInfoConfig');
				$(this).parent().parent().hide();
				if(flag){
					getStatistics();
				}
				event.stopPropagation();
			});

			// 新增分类
			$('#addClassBtn', $el).on('click', function(event) {
				event.preventDefault();
				$("#addLogClassModalTitle", $el).text("新增");
				$('#typeName', $addLogClassModal).next().addClass('hide');
				$addLogClassForm.reset();
				$('#logClassDel', $addLogClassModal).hide();
				$addLogClassModal.modal('show');
				$addLogClassModal.removeData('logType');
			});

			// 分类模态框事件
			$addLogClassModal.on('click', 'button#logClassAdd', function(event) {
				event.preventDefault();
				if($('#typeName', $addLogClassModal).val().trim() == ''){
					$('#typeName', $addLogClassModal).next().text('不能为空').removeClass('hide');
					return;
				}else{
					$('#typeName', $addLogClassModal).next().addClass('hide');
				}
				var method = 'addCfgLogType';
				var data = $addLogClassModal.data();
				if(data && data.logType){
					method = 'updateCfgLogType';
				}
				$addLogClassModal.modal('hide');
				app.common.ajaxWithAfa({
					url:'LogCfgAction_'+method+'.do',
					data:{
						typeName: $('#typeName', $addLogClassModal).val().trim(),
						typeId: data.logType
					}
				}).done(function (data) {
					if(data.result){
						getStatistics();
						app.alert('操作成功！');
					}else{
						app.alert('操作失败，请联系管理员！');
					}
				})
			}).on('click', 'button#logClassDel', function(event) {
				event.preventDefault();
				var data = $addLogClassModal.data();
				app.confirmDialog({//提示框组件
					sTitle:"确认",        
	                sType:"search",
	                sContent:'确认删除改分类',  //确认框内容，非必填
	                sBtnConfirm: '确定',  //确认按钮显示内容
	                sBtnCancel: '取消',  //却笑按钮显示内容
	                fnConfirmHandler: function(){
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgAction_delCfgLogType.do',
	                		data:{
	                			typeId: data.logType
	                		}
	                	}).done(function (data) {
	                		$addLogClassModal.modal('hide');
	                		if(data.result && data.result !=''){
	                			app.alert(data.result);
	                			// selectClass = undefined;
	                			getStatistics();
	                		}else{
	                			app.error('操作失败，请联系管理员！');
	                		}
	                	})
	                },
	                aArgs: []
				})
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
