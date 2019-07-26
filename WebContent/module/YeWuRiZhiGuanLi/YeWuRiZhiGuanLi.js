define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {

			var setting = {
				view: {
					showLine : false,
				},
				callback : {
					onClick : zTreeOnClick,
					beforeExpand: closeOther
				},
			};
			var treeObj = null;

			var objectId = undefined;

			var queryObj = {};

			app.common.ajaxWithAfa({
				url: 'EventListAction_getObjectCategory.do'
			}).done(function(content){
				if(content.objectCate.length > 0){
					var cates = content.objectCate;
					var levelOneNames = [];//一级目录
					for(var i = 0; i < cates.length; i++){
						if(cates[i].levelOneName != "应用群组"){
							levelOneNames.push(cates[i].levelOneName);
						}
					}
					levelOneNames = _.uniq(levelOneNames); //去重

					var treeArr = [];//最终需求的数据结构
					for(var i = 0; i < levelOneNames.length; i++){
						treeArr.push({name : levelOneNames[i]});
						for(var j = 0; j < cates.length; j++){
							if(cates[j].levelOneName == levelOneNames[i]){
								if(!treeArr[i].children){
									treeArr[i].children = [
										{
											name : cates[j].levelTwoName,
											children : []
										}
									];
								}
								if(treeArr[i].children){
									var children = treeArr[i].children;
									var ishas = false;
									for(var k = 0; k < children.length; k++){
										if(children[k].name == cates[j].levelTwoName){
											children[k].children.push({name : cates[j].levelThreeName});
											ishas = true;
										}
									}
									if(!ishas){
										children.push({
											name : cates[j].levelTwoName,
											children : [{name : cates[j].levelThreeName}]
										});
									}					
								}
								
							}
						}
					}
					treeObj = $.fn.zTree.init($('#ztree2', $el), setting, treeArr);
				}
			});


			function zTreeOnClick(event,treeId,treeNode,clickFlag){
				if(treeNode.isParent){
					// 父节点不让设置
					// treeObj.expandAll(false);
					// 展开
					//叶子节点
					return;
				}

				objectId = null;
				$('#appConfigInfo', $el).empty();//清空之前所有应用信息
				$('#appTitle', $el).text(treeNode.name);

				if(treeNode.level == 0){//点击第一级
					var data = {levelOneName : treeNode.name}
					app.shelter.show();
					$.ajax({
						type : "post",
						url : "AppConfigAction_getFirstCategoryObjects.do",
						data : data,
						aimshelter: true,
						dataType : "json",
						success : function(data){
							app.shelter.hide();
							if(data.status){
								showAppInfo(data.content.cate1Objects);
							}							
						}
					});
					if(data.levelOneName == '应用群组'){
						activeShowLogInfoArgs = {querytype:'A1',queryvalue:data.levelOneName};
						activeShowAgentInfoArgs = {querytype:'A1',queryvalue:data.levelOneName};
					}else if(data.levelOneName == '软件'){
						activeShowAgentInfoArgs = {querytype:'F1',queryvalue:data.levelOneName};
						activeShowLogInfoArgs = {querytype:'F1',queryvalue:data.levelOneName};
					}else{
						activeShowLogInfoArgs = {querytype:'Y1',queryvalue:data.levelOneName};
						activeShowAgentInfoArgs = {querytype:'Y1',queryvalue:data.levelOneName};
					}
				}else if(treeNode.level == 1){//点击第二级
					$('#appTitle', $el).text($('#' + treeNode.parentTId + '_span', $el).text() + "/" + treeNode.name);
					var data = {
						levelOneName : $('#' + treeNode.parentTId + '_span', $el).text(),
						levelTwoName : treeNode.name
					};
					app.shelter.show();
					$.ajax({
						type : "post",
						url : "AppConfigAction_getSecondCategoryObjects.do",
						data : data,
						aimshelter: true,
						dataType : "json",
						success : function(data){
							app.shelter.hide();
							if(data.status){
								showAppInfo(data.content.cate2Objects);
							}
						}
					});
					if(data.levelOneName == '应用群组'){
						activeShowLogInfoArgs = {querytype:'A2',queryvalue:data.levelTwoName};
						activeShowAgentInfoArgs = {querytype:'A2',queryvalue:data.levelTwoName};
					}else if(data.levelOneName == '软件'){
						activeShowAgentInfoArgs = {querytype:'F2',queryvalue:data.levelTwoName};
						activeShowLogInfoArgs = {querytype:'F2',queryvalue:data.levelTwoName};
					}else{
						activeShowLogInfoArgs = {querytype:'Y2',queryvalue:data.levelTwoName};
						activeShowAgentInfoArgs = {querytype:'Y2',queryvalue:data.levelTwoName};
					}
				}else if(treeNode.level == 2){//点击第三级
					$('#appTitle', $el).text($('#' + treeNode.parentTId , $el).parent().prev().find('span').eq(1).text() + "/" + $('#' + treeNode.parentTId + '_span', $el).text() + "/" + treeNode.name);
					var data = {
						levelOneName : $('#' + treeNode.parentTId , $el).parent().prev().find('span').eq(1).text(),
						levelTwoName : $('#' + treeNode.parentTId + '_span', $el).text(),
						levelThreeName : treeNode.name
					};
					app.shelter.show();
					$.ajax({
						type : "post",
						url : "AppConfigAction_getThirdCategoryObjects.do",
						data : data,
						aimshelter: true,
						dataType : "json",
						success : function(data){
							app.shelter.hide();
							if(data.status){
								showAppInfo(data.content.cate3Objects);
							}
						}
					});

					if(data.levelOneName == '应用群组'){
						activeShowLogInfoArgs = {querytype:'A3',queryvalue:data.levelThreeName};
						activeShowAgentInfoArgs = {querytype:'A3',queryvalue:data.levelThreeName};
					}else if(data.levelOneName == '软件'){
						activeShowAgentInfoArgs = {querytype:'F3',queryvalue:data.levelThreeName};
						activeShowLogInfoArgs = {querytype:'F3',queryvalue:data.levelThreeName};
					}else{
						activeShowLogInfoArgs = {querytype:'Y3',queryvalue:data.levelThreeName};
						activeShowAgentInfoArgs = {querytype:'Y3',queryvalue:data.levelThreeName};
					}
				}
				activeClassInfo = data;
				$('#resizeHeight li.active', $el).trigger('click');
			}
			
			function closeOther(id,node){
 				 //是不是根节点
 				 if(!node.parentTId){
 					 treeObj.expandAll(false);
 					 return
 				 }
 				 //叶子节点
 				 var parentNode = treeObj.getNodeByTId(node.parentTId);
 				 var findNode = treeObj.getNodesByFilter(filter,false,parentNode);
 				 for(var i=0;i<findNode.length;i++){
 					 if(findNode[i].level == node.level){
 						 treeObj.expandNode(findNode[i],false)
 					 }
 				 }
            	 function filter(n){
 					 return n.open == true
 				 }
            }

            var $dataTable = $('#dataTable', $el).DataTable({
				'searching'	: true,
				'bSort'		: false,
				"scrollCollapse": true,
				'pageLength': 10,
				"pagingType": "full_numbers",
            });
            
            var clickTableRowsHost = null;
            $('#dataTable tbody', $el).on('click', 'tr', function(e){
            	$dataTable.rows()
					.nodes()
					.to$()      // Convert to a jQuery object
					.removeClass('selected');
            	$dataTable.row(this)
            		.nodes()
            		.to$()
            		.addClass('selected');
				objectId = $dataTable
					.row(this)
					.data()[1];
				var rows = $dataTable
				.row(this)
				.data();
				try {
					clickTableRowsHost = rows[2];
				} catch (e) {
					clickTableRowsHost = null;
				}
				app.common.ajaxWithAfa({
					url: 'LogDelManagerAction_getDayNumByHost.do',
					data: {
						"host": clickTableRowsHost,
					}
				}).done(function(content){
					try {
						$("#retention1", $el).val(content.result.dayNum);
					} catch (e) {
						// TODO: handle exception
						$("#retention1", $el).val(1);
					}
					getClearPlanTable();
				});
				app.common.ajaxWithAfa({
					url: 'LogManagementAction_getFileManage.do',
					data: {
						"objId": objectId,
					}
				}).done(function(content){
					if(!$.isEmptyObject(content)){
						$("#objectId", $el).html(`<i class="config-YEWRZ">已配置</i>`);
						$('[data-role="deleteConfig"]', $el).removeClass("hide").attr("id", content.result.id);
						$('#retention', $el).val(content.result.retention);
						$('#strategy', $el).val(content.result.strategy);
						$('#execTime', $el).val(content.result.execTime);
						$('#filePath', $el).val(content.result.filePath);
						$('#fileSuffix', $el).val(content.result.fileSuffix);
						$('#fileDepth', $el).val(content.result.fileDepth);
						$('#backFilePrefix', $el).val(content.result.backFilePrefix);
						$('#bakDir',$el).val(content.result.bakDir);
						$('#isClear',$el).val(content.result.isClear);

						// 查询清理历史
						var executeName = $('#strategy option:selected', $el).text();
						queryObj = {
							"objId": objectId,
							"executeName": executeName,
							"pageSize": 10,
							"pageNum": 1,
						};
						if(!$historyTable){
							loadHisData();
						}else{
							$historyTable.ajax.reload();
						}
					}else{
						$("#objectId", $el).html(`<i class="no-config-YEWRZ">未配置</i>`);
						$('[data-role="deleteConfig"]', $el).addClass("hide");
						// $("#strategyDetails", $el).addClass('hide');
						resetForm();
						queryObj = {
							"objId": objectId,
							"executeName": "",
							"pageSize": 10,
							"pageNum": 1,
						};
						getClearPlanTable();
						if(!$historyTable){
							loadHisData();
						}else{
							$historyTable.ajax.reload();
						}
					}
				})
            });

            //显示应用信息
			function showAppInfo(data){
				if(data){
					$dataTable.clear().draw();
					data.forEach((item, index) => {
						$dataTable.row.add([(index+1),(item.objectSummary.objectId),(item.objectSummary.objectName),(item.objectSummary.categoryId),(item.objectSummary.l1CateName+'>'+item.objectSummary.l2CateName+'>'+item.objectSummary.l3CateName),(item.objectSummary.monitorStatus == true?"监控中":"未监控")]).draw();
					})
				}				
			}

			$('[name="day"]', $el).on('input', function(e){
				if(!/^\+?[1-9][0-9]*$/.test(this.value)){
					this.value = this.value.substring(0, this.value.length - 1);
				}
			});

			$('input[required="required"]', $el).on('blur change', function(){
				if(this.value == ''){
					$(this).parent().find('.help-inline').length == 1?null:$(this).parent().append('<span class="help-inline">不能为空</span>');
				}else{
					$(this).parent().find('.help-inline').length == 1?$(this).parent().find('.help-inline').remove():null;
				}
			});

			var execTimeOption = '';
			for(let i=0; i<24; i++){
				execTimeOption += '<option value="'+ (i<10?'0'+i:i) +':00">'+ (i<10?'0'+i:i) +':00</option>';
			}
			$('#execTime', $el).html(execTimeOption);
			// $('[data-role="executeTime"]', $el).datetimepicker({
			// 	format: 'hh:00',
			// 	minView: 1,
			// 	startView : 1,
			// 	autoclose:1,
			// 	minuteStep:1
			// });

			app.common.ajaxWithAfa({
				url: "DataCleanAction_getDataCleanByDataType.do",
				data: {
					"dataType": 2
				},
			}).done(function(content){
				// console.log('result:  '+JSON.stringify(content.result));
				content.result.forEach(function(item, index){
					// option_file_dict[item.id] = item.cleanName;
					var $option = $('<option value="'+ item.id +'">'+ item.cleanName +'</option>');
					for(let key in item){
						$option[0].dataset[key] = item[key];
					}
					// console.log('dataset:  '+JSON.stringify($option[0].dataset));

					$('#strategy', $el).append($option).trigger('change');
				});
			});

			$('[data-role="resetBtn"]', $el).on('click', function(){
				resetForm();
			});

			function resetForm(){
				$("form", $el)[0].reset();
			}

			// $('#dataTable', $el).on('click', 'input[type="checkbox"]', function(e){
			// 	e.stopPropagation();
			// })

			// $('#checkAll', $el).on('click', function(){
			// 	if($(this).is(':checked')){
			// 		$dataTable.rows()
			// 			.nodes()
			// 			.to$()      // Convert to a jQuery object
			// 			.find('input[type="checkbox"]')
			// 			.attr('checked','checked');
			// 	}else{
			// 		$dataTable.rows()
			// 			.nodes()
			// 			.to$()      // Convert to a jQuery object
			// 			.find('input[type="checkbox"]')
			// 			.removeAttr('checked');
			// 	}
			// })

			$('[data-role="saveBtn"]', $el).on('click', function(){
				if(!objectId){
					app.alert("请选择对象后再保存");
					return;
				}
				$('input', $el).trigger('blur');
				if($el.find('.help-inline').length > 0){
					$el.find('.help-inline').addClass("animated shake");
					setTimeout(() => {
						$el.find('.help-inline').removeClass("animated shake");
					}, 1500);
					return;
				}
				var logManageFile = {
					"retention" : $('#retention', $el).val(),
					"strategy" : $('#strategy', $el).val(),
					"execTime" : $('#execTime', $el).val(),
					"filePath" : $('#filePath', $el).val(),
					"fileSuffix" : $('#fileSuffix', $el).val(),
					"fileDepth" : $('#fileDepth', $el).val(),
					"backFilePrefix" : $('#backFilePrefix', $el).val(),
					"bakDir" : $('#bakDir', $el).val(),
					"isClear" : $('#isClear', $el).val(),
					"objectId" : objectId
				};
				var url = 'LogManagementAction_addFileManage.do';
				if($('#objectId i', $el).text() == "已配置"){
					url = 'LogManagementAction_updateFileManage.do';
					logManageFile["id"] = $('[data-role="deleteConfig"]', $el).attr("id");
				}
				app.shelter.show();
				app.common.ajaxWithAfa({
					url: url,
					data: {
						"param": JSON.stringify(logManageFile)
					}
				}).done(function(content){
					app.shelter.hide();
					if(content.result){
						app.alert('保存成功');
						 $('#dataTable tr.selected', $el).trigger('click');
					}else{
						app.alert('保存失败');
					}
				})
			});
			
			
			$('[data-role="saveBtn1"]', $el).on('click', function(){
				if(!clickTableRowsHost){
					app.alert("请选择主机");
					return;
				}
				var dayNum = $("#retention1", $el).val();
				app.shelter.show();
				app.common.ajaxWithAfa({
					url: 'LogDelManagerAction_addDel.do',
					data: {
						dayNum: parseInt(dayNum),
						host: clickTableRowsHost
					}
				}).done(function(content){
					app.shelter.hide();
					if(content.result){
						app.alert('保存成功');
						getClearPlanTable();
					}else{
						app.alert('保存失败');
					}
				})
			});

			$('[data-role="deleteConfig"]', $el).on('click', function(){
				var $this = $(this);
				app.confirmDialog({//提示框组件
					sTitle:"是否删除",  //确认框标题         
	                sType:"search",  //模块类型，有normal，success，search，warn，error,默认为normal常规
	                sContent:'是否删除该配置？',  //确认框内容，非必填
	                sBtnConfirm: '确定',  //确认按钮显示内容
	                sBtnCancel: '取消',  //却笑按钮显示内容
	                fnConfirmHandler: function(){
	                	app.common.ajaxWithAfa({
	                		url: "LogManagementAction_delFileManage.do",
	                		data: {
	                			"id": $this.attr("id")
	                		}
	                	}).done(function(content){
	                		if(content.result){
	                			app.alert("删除成功");
	                			$('#dataTable tr.selected', $el).trigger('click');
	                		}
	                	})
	                }
				})
			});

			$("#strategy", $el).on('change', function(e){
				if(this.value){
					$("#strategyDetails", $el).removeClass('hide');
					var detailsMap = $(this).find('option:selected')[0].dataset;

					// 赋值
					$("#filePath").val(detailsMap.logSourcePath);
					$("#fileSuffix").val(detailsMap.logFileSuffix);
					$("#backFilePrefix").val(detailsMap.achiveFilePrefix);
					$("#retention").val(detailsMap.achiveDayNum);
					$("#execTime").val(detailsMap.execTime);
					$("#fileDepth").val(detailsMap.recursiveDeep);
					$("#bakDir").val(detailsMap.bakDir);
					$("#isClear").val(detailsMap.isClear);
				}else{
					$("#strategyDetails", $el).addClass('hide');
				}
			});

			$("#strategyDetails", $el).on('click', function(e){
				if($(this).prev().val()){
					var detailsMap = $(this).prev().find('option:selected')[0].dataset;
					// console.log(JSON.stringify(detailsMap));
					if(detailsMap["transType"] == '1'){
						detailsMap["transType"] = 'ftp';
					}else if(detailsMap["transType"] == '2') {
						detailsMap["transType"] = 'sftp';
					}else{
						detailsMap["transType"] = 'scp';
					}
					var $content = $(`<table class="plan-detail-table">
						<tr>
							<td>策略名称</td>
							<td>${detailsMap.cleanName}</td>
						</tr>
						<tr>
							<td>备份类型</td>
							<td>${detailsMap.dataType=='1'?'数据':'文件'}</td>
						</tr>
						<tr>
							<td>备份方式</td>
							<td>${detailsMap.bakType=='1'?'本地文件':'远程服务器'}</td>
						</tr>
						<tr>
							<td>压缩方式</td>
							<td>${detailsMap.packType=='1'?'tar.gz':'tar'}</td>
						</tr>
						<tr>
							<td>备份文件目录</td>
							<td>${detailsMap.bakDir}</td>
						</tr>
						<tr>
							<td>文件传输方式</td>
							<td>${detailsMap.transType}</td>
						</tr>
						<tr>
							<td>是否清理原日志</td>
							<td>${detailsMap.isClear == '0' ? '清理' : '不清理'}</td>
						</tr>
						${detailsMap.bakType == '1'?'':
						`<tr>
							<td>服务器地址</td>
							<td>${detailsMap.address}</td>
						</tr>
						<tr>
							<td>用户名</td>
							<td>${detailsMap.userName}</td>
						</tr>
						<tr>
							<td>密码</td>
							<td>${detailsMap.passwd}</td>
						</tr>`}
					</table>`);

					$(this).popover('destroy').popover({
						'html': true,
						'trigger': 'focus',
						'placement': 'right',
						'title': false,
						'content': $content[0].outerHTML
					}).popover('show');
				};
			});


			$('#categorySearch', $el).on('keyup', function(event) {
				event.preventDefault();
				if(event.keyCode == 13){
					$(this).next().trigger('click');
				}
			});
			$('#categorySearch+i', $el).on('click', function(event){
				event.preventDefault();
				var searchStr = $('#categorySearch', $el).val();
				if(searchStr == ''){
					return;
				}
				var nodes = treeObj.getNodesByParamFuzzy("name", searchStr, null);
				if(nodes.length > 0){
					treeObj.expandAll(false);
					for (var i = 0; i < nodes.length; i++) {
						treeObj.expandNode(nodes[i], true, false, true);
					}
					treeObj.selectNode(nodes[0]);
				}
			});

			function transforNumber(number) {
            	var GB = 1024*1024*1024;
            	var MB = 1024*1024;
            	var KB = 1024;
            	if(number > GB) {
            		return (number/GB).toFixed(2) + ' GB';
            	}else if(number > MB) {
            		return (number/MB).toFixed(2) + ' MB';
            	}else if(number > KB) {
            		return (number/KB).toFixed(2) + ' KB';
            	}else{
            		return number + 'B';
            	}
            }

			var $historyTable = null;
			
			var publicConfig = {
				"bAutoWidth": true, // 自动宽度
				'bStateSave': false,
				'searching': false,
				"ordering": false,
				'pageLength': 5,
				"pagingType": "full_numbers",
			}
			var $historyTable1 = $("#historyTable1", $el).DataTable({
				'searching'	: false,
				'bSort'		: false,
				"scrollCollapse": true,
				'pageLength': 5,
				"pagingType": "full_numbers",
			});
			
			
			function loadHisData(){
				$historyTable = $("#historyTable", $el).DataTable(Object.assign({}, publicConfig, {
					'aoColumnDefs': [{
						"render": function(data, type, row, meta) {
							return data+'ms';
						},
						"targets": 2
					}],
					"serverSide": true,
					"ajax": function(data, callback, settings) {
						queryObj.pageNum = data.length == 0 ? 1 : (data.start / data.length)+1;
						app.common.ajaxWithAfa({
							cache: false, // 禁用缓存
							url: 'LogManagementAction_getLogFileHis.do',
							data: queryObj
						}).done(function(content) {
							var list = content.result.list;
							list.forEach(function(item, index){
								item.index = index+1;
								item.sample_time = new Date(item.sample_time).Format("yyyy-MM-dd hh:mm:ss");
							})
							callback({
								data: list,
								recordsFiltered: content.result.total
							});
						});
					},
					columns: [{
						data: 'index',
						defaultContent: '-'
					},{
						data: 'error_message',
						defaultContent: '-'
					},{
						data: 'execute_duration',
						defaultContent: '-'
					},{
						data: 'sample_time',
						defaultContent: '-'
					}]
				}));
				
				
			}
			
			function getClearPlanTable() {
				app.common.ajaxWithAfa({
					cache: false, // 禁用缓存
					url: 'LogDelManagerAction_getByHost.do',
					data: {
						host: clickTableRowsHost
					}
				}).done(function(content) {
					var list = content.result;
					$historyTable1.clear().draw();
					list.forEach((item, index) => {
						$historyTable1.row.add([(index+1),(item.del_host),(item.comments),(item.stop - item.start),(new Date(item.start).Format("yyyy-MM-dd hh:mm:ss"))]).draw();
					})
				});
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