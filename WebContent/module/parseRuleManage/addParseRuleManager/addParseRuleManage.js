define(["jquery", "handlebars", "module/logInfoConfigManage/addLogInfoConfig/splitConfiger", "codemirror/lib/codemirror", "codemirror/mode/python/python", "codemirror/mode/groovy/groovy"], function($, hb, SplitConfiger,CodeMirror){
	return {
		load : function($el, scope, handler) {
			var rowData = scope.data || {};//父页面传参
			var logId = rowData.logId != undefined?undefined:rowData.logId;
			var tabsId = scope.data.id;
			
			var publicFieldsData = [
				{ fieldKey:'_date_',fieldName:'日志日期',dataSource:'1',fieldRegex:'',fieldDefault:''},
				{ fieldKey:'_time_',fieldName:'日志行时间戳',dataSource:'2',fieldRegex:'',fieldDefault:''},
				{ fieldKey:'_level_',fieldName:'日志行级别',dataSource:'2',fieldRegex:'',fieldDefault:''},
				{ fieldKey:'_code_',fieldName:'交易代码',dataSource:'2',fieldRegex:'',fieldDefault:''},
				{ fieldKey:'_errorCode_',fieldName:'交易返回码',dataSource:'2',fieldRegex:'',fieldDefault:''},
				{ fieldKey:'_flag_',fieldName:'成功标志',dataSource:'2',fieldRegex:'',fieldDefault:''},
				{ fieldKey:'_serial_',fieldName:'日志流水',dataSource:'2',fieldRegex:'',fieldDefault:''},
				{ fieldKey:'__logstart__',fieldName:'日志开始标识',dataSource:'2',fieldRegex:'',fieldDefault:''},
				{ fieldKey:'__logend__',fieldName:'日志结束标志',dataSource:'2',fieldRegex:'',fieldDefault:''}
			];

			var mouseDownPosition = {};
			var logExample;//日志内容样例
			var logExampleText;//日志内容样例文本
			var selectedText = '';//选中的日志文本
			var methodList = [];//个性化数结构所有函数方法
			var currentFiled = {};//当前编辑的字段
			var scriptName = 'regex';//脚本类型 regex/groovy/python
			var splitFlag = '0';
			var logEventRegex = '';
			var dataExample = '';
			var isAddFields = 1;//个性化数据弹框编辑状态 1-新增 2-修改 3-删除
			var isJavaFun = false;
			let allCates = [];
			let ztreeObj = null,
			fielddataArr = null;

			var publicDataSource = {
				'0':'',
				'1':'日志目录',
				'2':'日志内容'
			};

			var reqData = {
				'cfgLogInfo':{
					'logId': logId
				},
				'publicFields': publicFieldsData.concat()
			};
			
			let $previewModalTable = $('#previewModalTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'pageLength': 9,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'agentName', defaultContent : ''
				},{
					data : 'ip', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<i class="fa fa-cog fa-spin" style="color: #22AC38"></i>运行中';
						}else{
							return '<i class="fa fa-cog"></i>未启动';
						}
					},
					"targets" : 3
				}]
			});
			let $serverLogPreviewModal = $('#serverLogPreviewModal', $el);

			// 获取页面数据
			function getPageData() {
				app.common.ajaxWithAfa({
					url: 'LogCfgAction_getCfgLogInfoById.do',
					data: {
						logId: rowData.logId
					}
				}).done(function (data) {
					if (data.result) {
						reqData.publicFields = data.result.publicFields || publicFieldsData.concat();
						for (var i in data.result) {
							if (data.result.hasOwnProperty(i) && i != 'privateFields' && i != 'publicFields') {
								reqData.cfgLogInfo[i] = data.result[i];
							}
						}
						if(data.result.publicFields && data.result.publicFields.length>0){
							reqData.publicFields = data.result.publicFields;
							if (reqData.publicFields !== publicFieldsData.length) {
								var publicsh = publicFieldsData.map((item, index) => {
									var index = reqData.publicFields.findIndex(req => req.fieldKey === item.fieldKey);
									if (index !== -1) {
										item = reqData.publicFields[index];
									}
									return item;
								})
								reqData.publicFields = publicsh;
							}
						}else{
							reqData.publicFields = publicFieldsData.concat();
						}
						if(reqData.cfgLogInfo && reqData.cfgLogInfo.lineFlag == '1'){
							reqData.publicFields.splice(6,3);
						}else if(reqData.cfgLogInfo && reqData.cfgLogInfo.mulitiLineType == '0'){
							reqData.publicFields.splice(7,2);
						}else if(reqData.cfgLogInfo && reqData.cfgLogInfo.mulitiLineType == '1'){
							reqData.publicFields.splice(6,1);
						}
						initPage(data.result);
					}
				})
			}

			//  初始化页面数据
			function initPage(info) {
				for (var item in reqData.cfgLogInfo) {
					if (reqData.cfgLogInfo.hasOwnProperty(item)) {
						if(item == "logEventRegex" && reqData.cfgLogInfo[item]){
							$('#'+item,$('#structConfig_form',$el)).val(reqData.cfgLogInfo[item].replace(/([&|&*amp;])*lt;/gim, '<').replace(/([&|&*amp;])*gt;/gim, '>'));
						}else{
							$('#'+item,$('#structConfig_form',$el)).val(reqData.cfgLogInfo[item]);
						}
					}
				}
				
				logEventRegex = reqData.cfgLogInfo['logEventRegex'];
				dataExample = reqData.cfgLogInfo['dataExample'];

				if(reqData.cfgLogInfo.lineFlag == '1'){
					$('#lineFlag',$el).addClass('true').parent().parent().next().hide();
				}else{
					$('#lineFlag',$el).removeClass('true').parent().parent().next().show();
				}

				if(reqData.cfgLogInfo.compress && reqData.cfgLogInfo.compress == '1'){
					$('#compress',$el).addClass('true');
				}else{
					$('#compress',$el).removeClass('true');
				}

				$('#dataExample', $('#structConfig_form',$el)).html(reqData.cfgLogInfo.dataExample);

				refreshPublicStruct(reqData.publicFields);
				let cate = allCates.filter(item => item.categoryId == info.objectid)[0];
				cate && $('#category',$el).val(cate.levelOneName + '>' + cate.levelTwoName + '>' + cate.levelThreeName);
				
//				refreshStructKey(reqData.privateFields);
			}

			//日志内容样例-浏览(上传文件)
			$('#logExample_upload', $el).on('click', function(event) {
				event.stopPropagation();
				event.preventDefault();
				$(this).next().click();
			});

			$('#logExampleDiv', $el).on('change', '.logExample-file',function(event) {
				var files = $(this)[0].files;
				var type = $('#logCoding',$el).val() || undefined;
				handleFiles(files,type);
			});
			
			//服务器日志预览
			$('#serverLogPreview', $el).on('click', function(event) {
				event.stopPropagation();
				event.preventDefault();
				getAgentInfo().then(function (data) {
					$('.PreviewModal-right', $el).empty();
					$serverLogPreviewModal.modal('show');
					$('#previewModalTable tbody>tr:eq(0)', $serverLogPreviewModal).click();
				})
			});

			// 获取代理信息
			function getAgentInfo() {
				$previewModalTable.clear();
				return app.common.ajaxWithAfa({
					url:'AgentManagerAction_getAgentList.do',
					data:{
						whereStr: JSON.stringify({"os_type":"all","agent_status":"all","ping_status":"all","telnet_status":"all","agent_user_status":"all"})
					}
				}).done(function (data) {
					if(data.list && data.list.length>0){
						var tableData = [];
						data.list.forEach(function (item, index) {
							tableData.push({
								index: index+1,
								ip:item[3],
								status:item[4],
								agentName:item[1]
							})
						})

						$previewModalTable.rows.add(tableData).draw();
					}
					return $.Deferred().resolve();
				})
			}

			// 获取目录信息
			function loadAgentDirByIp(ip, dir) {
				return app.common.ajaxWithAfa({
					url:"AgentManageAction_getAgentDir.do",
					data:{
						agentIp:ip,
						dir: dir
					}
				}).then(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			// 服务器日志模态框事件
			$serverLogPreviewModal.on('click', 'tr', function(event) {
				event.stopPropagation();
				event.preventDefault();
				if($(this).hasClass('selected')){
					return;
				}
				$(this).addClass('selected').siblings().removeClass('selected');
				$('.PreviewModal-right', $el).empty();
				var tr = $previewModalTable.row($(this)).data();
				if(!tr.status){
					return;
				}
				serverLogPreviewData = {
					ip:tr.ip,
					dir:''
				}
				loadAgentDirByIp(tr.ip,'').then(function (data) {
					if(data.result && !$.isEmptyObject(data.result)){
						if(data.result.flag == 'false'){
							app.alert(data.result.msg);
						}else{
							var html = '<ul class="PreviewModal-dirList" data-id="1">';
							for (var item in data.result) {
								var icon = '';
								if(data.result[item] == 'd'){
									icon = '<i class="fa fa-caret-square-o-right fa-fw"></i>';
								}

								html += '<li data-type="'+data.result[item]+'"><span title="'+item+'">'+icon+item+'</span></li>';
							}
							html += '</ul>';
							$('.PreviewModal-right', $el).html(html);
						}
					}
				})
			}).on('click', '.PreviewModal-dirList li', function(event) {
				event.stopPropagation();
				if($(this).hasClass('active')){
					var $obj = $(this);
					$obj.find('i.fa').toggleClass('fa-caret-square-o-right fa-caret-square-o-down');
					$(this).removeClass('active').next('ul').hide();
					$(this).next('ul').find('.active').click();
				}else{
					var $obj = $(this);
					$obj.parent().find('li.active').click();
					$obj.addClass('active').find('i.fa').toggleClass('fa-caret-square-o-right fa-caret-square-o-down');
					var dir = getDir($obj);
					serverLogPreviewData.dir = dir;
					if($(this).next('ul').length == 0 && $obj.attr('data-type') == 'd'){
						loadAgentDirByIp(serverLogPreviewData.ip,dir).then(function (data) {
							if(data.result && !$.isEmptyObject(data.result)){
								if(data.result.flag == 'false'){
									app.alert(data.result.msg);
								}else{
									var html = '<ul>';
									for (var item in data.result) {
										var icon = '';
										if(data.result[item] == 'd'){
											icon = '<i class="fa fa-caret-square-o-right fa-fw"></i>';
										}

										html += '<li data-type="'+data.result[item]+'"><span title="'+item+'">'+icon+item+'</span></li>';
									}
									html += '</ul>';
									$obj.after(html);
								}
							}
						})
					}else{
						$obj.next('ul').show();
					}
				}
			}).on('click', '#logAdd', function(event) {
				event.stopPropagation();
				event.preventDefault();
				var dirList = $('.PreviewModal-dirList li.active',$el);
				var isFile = false;
				if(dirList.length > 0){
					for (var i = 0; i < dirList.length; i++) {
						if($(dirList[i]).attr('data-type') == 'f'){
							isFile = true;
							break;
						}
					}
				}
				if(!isFile){
					app.alert('请选择到文件');
					return;
				}
				getLogByIpAndLogName(serverLogPreviewData.ip,serverLogPreviewData.dir).then(function (data) {
					if(data.result && data.result.contents != undefined){
						$('#dataExample', $el).html(data.result.contents);
					}else{
						app.alert('获取日志失败');
					}
					$serverLogPreviewModal.modal('hide');
				})
			});

			// 获取日志文件
			function getLogByIpAndLogName(agentIp, filename) {
				return app.common.ajaxWithAfa({
					url:"AgentManageAction_getFileContents.do",
					data:{
						agentIp:agentIp,
						filename: filename
					}
				}).then(function (data) {
					return $.Deferred().resolve(data);
				})
			}
			// 获取目录
			function getDir($currentObj) {
				var dir = '';
				var id = $currentObj.attr('data-id');

				if($currentObj.hasClass('active')){
					dir = '/'+$currentObj.text();
				}
				$currentObj = $currentObj.parent();
				id = $currentObj.attr('data-id');

				while(!id){
					dir = '/'+$currentObj.prev().text()+dir;
					$currentObj = $currentObj.parent();
					id = $currentObj.attr('data-id');
				}
				return dir;
			}
			
			// 读取文件
			function handleFiles(files,type) {
				if (files.length) {
					var file = files[0];
					var reader = new FileReader();

					if (/text\//.test(file.type)) {
						reader.onload = function() {
								$('#dataExample', $el).text(this.result);
								$('.logExample-file',$el).remove();
								$('#logExample_upload', $el).after('<input type="file" name="file" class="logExample-file" style="display: none;">');
						}
						reader.readAsText(file, type);
					}else{
						app.alert('请选择文本文件！');
					}
				}
			}

			function loadIpbyObjectId(id) {
				return app.common.ajaxWithAfa({
					url:"CmdbConfigManagerAction_queryAllCmdbObject.do",
					data:{
						conf_id:id
					}
				}).then(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			// 日志模式
			$('#lineFlag', $el).on('click', function(event) {
				event.stopPropagation();
				if($(this).hasClass('true')){
					$(this).removeClass('true');
					$(this).parent().parent().next().show();
					$('#mulitiLineType',$el).trigger('change');
				}else{
					$(this).addClass('true');
					$(this).parent().parent().next().hide();
					reqData.publicFields.splice(6, reqData.publicFields.length - 6);
					refreshPublicStruct(reqData.publicFields);
				}
			});

			// 多行匹配方式
				$('#mulitiLineType',$el).on('change',function(event) {
					var value = $(this).val();
					if(value == '0'){
						reqData.publicFields.splice(6, 3, publicFieldsData[6]);
					}else{
						reqData.publicFields.splice(6, 3, publicFieldsData[7],publicFieldsData[8]);
					}
					refreshPublicStruct(reqData.publicFields);
				});

			// 刷新公共结构化数据
			function refreshPublicStruct(data) {
				var publicHtmlString = '';
				for (var i = 0; i < data.length; i++) {
					publicHtmlString += `
						<li dataId="${i}">
							<div class="field-layout">
								<span>${data[i].fieldKey}</span>
								<span>${data[i].fieldName}</span>
								<span>
									<select class="select-css">
										<option value="1" ${data[i].dataSource=='1'?'selected="selected"':''}>日志目录</option>
										<option value="2" ${data[i].dataSource=='2'?'selected="selected"':''}>日志内容</option>
									</select>
								</span>
								<span><input type="text" placeholder="数据值匹配表达式" value='${unityData(data[i].fieldRegex) || ''}'/></span>
								<span><input type="text" placeholder="默认值" value='${unityData(data[i].fieldDefault) || ''}'/></span>
								${(["日志日期","日志行时间戳"].includes(data[i].fieldName)?`<span><input type="text" placeholder="格式" value="${data[i].format ? data[i].format: ""}"/></span>`:"")}
							</div>
						</li>`;
				}
//				publicHtmlString = loadOther(publicHtmlString, data);
				$('#structConfig_public', $el).html(publicHtmlString);
			}
			
			function unityData (data) {
				if (data) {
					data = data.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&apos;').replace(/"/g,'&quot;');
					return data
				}
				return null;
			}

//			function loadOther(publicHtmlString, data) {
//				var newData = data.map(item => {
//					return  item.fieldKey;
//				})
//				publicFieldsData.forEach((item, index) => {
//					if (!newData.includes(item.fieldKey)) {
//						publicHtmlString += `<li dataId="${index}">
//							<div class="field-layout">
//								<span>${item.fieldKey}</span>
//								<span>${item.fieldName}</span>
//								<span>
//									<select class="select-css">
//										<option value="1" ${item.dataSource=='1'?'selected="selected"':''}>日志目录</option>
//										<option value="2" ${item.dataSource=='2'?'selected="selected"':''}>日志内容</option>
//									</select>
//								</span>
//								<span><input type="text" placeholder="数据值匹配表达式" value="${item.fieldRegex || ''}"/></span>
//								<span><input type="text" placeholder="默认值" value="${item.fieldDefault || ''}"/></span>
//								<span>${(["日志日期","日志行时间戳"].includes(item.fieldName)?`<input type="text" placeholder="格式" value="${(item.format?item.format:'')}"/>`:"")}</span>
//							</div>
//						</li>`;
//					}
//				})
//				return publicHtmlString;
//			}

			// 日志内容样例-事件
			$('#dataExample',$el).on('mouseup', function(event) {
				event.preventDefault();
				
				var text;
				if(document.selection) {
						text = document.selection.createRange();
					} else {
						text = document.getSelection();
				}

				var t = text.baseOffset;
				if(text.toString() == ''){
					return;
				}
				showBox(text,event.offsetX,event.offsetY);
			}).on('mousedown', function(event) {

				mouseDownPosition.x = event.offsetX;
				mouseDownPosition.y = event.offsetY;
			}).on('click', function(event) {
				event.stopPropagation();
				event.preventDefault();
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
					$('#tipBox', $el).hide();
					// $('#dataExample', $el).html(logExample);
					// logExample = undefined;
					if (document.selection) { 
						document.selection.empty(); 
					} else if (window.getSelection) { 
						window.getSelection().removeAllRanges(); 
					}
				}else{
					if($('#tipBox', $el).css('display') == 'block'){
						$(this).addClass('active');
					}

					$(this).parent().removeClass('error');
				}
				event.stopPropagation();
			});
			
			// 三级分类树点击事件
			function clickList(event,treeId,treeNode,clickFlag) {
				event.stopPropagation();
				var node = treeNode;
				var level = treeNode.level;
				if(level < 2){
					var $ztree = $.fn.zTree.getZTreeObj("classZtree");
					$ztree.expandNode(node, true, false, true);
					return;
				}
				// $('#category', $el).dropdown('toggle');
				$('[data-toggle="dropdown"]', $el).dropdown();
				var category = [];
				while(node){
					category.unshift(node.name);
						node = node.getParentNode();
				}
				var category3 = category[category.length - 1];
				var analyType = $('#analyClass option[typeName="'+category3+'"]', $el).attr('value');
				$('#analyClass', $el).val(analyType).trigger('change');
				$('#category', $el).val(category.join('>'));
				var cateoryId = treeNode.categoryId;
				$('#objectid', $el).val(cateoryId);
				$('[data-toggle="dropdown"]', $el).closest('.open').removeClass('open');
				// loadIpbyObjectId(cateoryId).then(function (data) {
				// 	var html= '';
				// 	if(data.funs && data.funs.object_list && data.funs.object_list.length > 0){
				// 		html = '<ul tabindex="0" class="ALIR-ipList">';
				// 		var list = data.funs.object_list;
				// 		list.forEach(function (item) {
				// 			html += '<li data-id="'+item.object_id+'" data-ip="'+item.service_ip+'">'+item.service_ip+'</li>';
				// 		})
				// 		html += '</ul>';
				// 	}
				// 	ipConfigListHtml = html;
				// })
			}

			// 加载三级分类
			function loadCategory(){
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url:"EventListAction_getObjectCategory.do"
					}).done(function(data){
						allCates = data.objectCate;
						data = data.objectCate;
						var resultSet = convertListToTree(data);
						var settings = {
							view : {
								showLine : false,
							},					
							callback : {
								onClick: clickList
							}
						};
						var $ztree = $.fn.zTree.init($("#classZtree",$el), settings, resultSet);
						$ztree.selectNode(resultSet[0]);
						resolve(data);
					})
				})
			}

			// 格式化为树数据
			function convertListToTree(cates){
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
										children[k].children.push({name : cates[j].levelThreeName,categoryId: cates[j].categoryId});
										ishas = true;
									}
								}
								if(!ishas){
									children.push({
										name : cates[j].levelTwoName,
										children : [{name : cates[j].levelThreeName,categoryId: cates[j].categoryId}]
									});
								}					
							}
							
						}
					}
				}
				return treeArr;
			}

			$("#nodeSearch",$el).on("keyup",function(e){
				if(e.keyCode == 13){
					var $ztree = $.fn.zTree.getZTreeObj("classZtree");
					var val = $(this).val();
					var treeArr = $ztree.getNodesByParamFuzzy("name",val,null);
					if(treeArr.length > 0){
						$ztree.expandAll(false);
						$ztree.expandNode(treeArr[0].getParentNode(),true,false,true);
						$ztree.selectNode(treeArr[0]);
					}else{
						app.alert('无匹配的分类');
					}
				}
			});

			// 关闭默认事件
			$('.dropdown-menu', $el).on('click', function(e){
				e.stopPropagation();
			})


			// 取消
			$('#cancelBtn', $el).on('click', function(e){
				e.stopPropagation();
				handler.prevStep();
			})

			loadCategory().then(res => {
				if(rowData.logId != undefined){
					getPageData();
				}else{
					reqData.publicFields.splice(7,2);
					refreshPublicStruct(reqData.publicFields);
				}
			});

			
			//选择文本
			function showBox(data,x,y) {
				var $tipBox = $('#tipBox', $el);
				var $logExample = $('#dataExample',$el);
				var text = data.toString();
				selectedText = text;
				
				var test = text.split('\n');

				if(test.length >= 2 && test[1] != ''){
					$logExample.removeClass('active');

					app.alert('请选择单行数据！');

					if (document.selection) { 
						document.selection.empty(); 
					} else if (window.getSelection) { 
						window.getSelection().removeAllRanges(); 
					} 
					return;
				}

				/*var rng = data.getRangeAt(0);
				if(!logExample){
					logExample = $('#dataExample',$el).html();
					logExampleText = $('#dataExample',$el).text();
				}
				var preText = logExampleText.slice(0,rng.startOffset);
				var nextText = logExampleText.slice(rng.endOffset);
				$logExample.html('<span></span><span class="selected"></span><span></span>');
				var spans = $('span',$logExample);
				$(spans[0]).text(preText);
				$(spans[1]).text(text);
				$(spans[2]).text(nextText);*/
				var offset = $logExample.offset();
				
				var len = (mouseDownPosition.x - x)/2;
				var top = mouseDownPosition.y > y?mouseDownPosition.y:y;
				/*$tipBox.css({
					top: (top + 20)+'px',
					left: (x+len - 40)+'px',
					'z-index':2
				});*/
				$tipBox.css({
					top: (top + 20)+'px',
					left: (x+len + 30)+'px',
					'z-index':2
				});

				// $("#text", $tipBox).text(text);

				$tipBox.show();
				/*$('#lineDesc',$tipBox).focus();
				$tipBox.attr('flag', 'value');*/
			}

			// 弹窗事件绑定
			$('#tipBox', $el).on('click', 'ul>li', function(event) {
				event.preventDefault();
				event.stopPropagation();
				$('#tipBox', $el).hide();
				var index = $("#tipBox ul li").index($(this));
				initEditStructKeyModal(index);
			});

			$el.on('click',function(e){
				$('.structConfig-tab3-closeBtn',$el).trigger('click');
			});

			$('#structConfig-tab3',$el).on('click',function(e){
				e.stopPropagation();
			});

			/**
				* 初始化编辑私有数据模态框
				*
				* @param data 初始化数据
				*/
				function initEditStructKeyModal(index, fieldData) {
					ztreeObj && ztreeObj.destroy();
					$('#structConfig-tab3', $el).removeData().addClass('active');//清除保存在节点上的数据
					$('#fieldKey', $el).autocomplete({
						source: fielddataArr,
						focus: function( event, ui ) {
							return false;
						},
						select: function( event, ui ) {
							if(ui.item){
								$('#fieldKey', $el).val(ui.item.name);
								$('#fieldDesc', $el).val(ui.item.desc);
								$('#fieldType', $el).val(ui.item.type);
								return false;
							}
						},
						minLength:0
					}).focus(function(){
		                $(this).autocomplete("search");
		                return false;
		            })

					var currentStr = '';
					currentStr += '<li>\
						<span>' + (currentFiled.fieldKey || '') + '</span>\
						<span>' + (currentFiled.fieldDesc || '') + '</span>\
						<span>' + (currentFiled.fieldType || '') + '</span>\
						</li>';
					var zNodes = [
						{ 
							sId : 1,
							name: '正则表达式', 
							pId : 0,
							scriptName: 'regex',
							splitFlag: 0
						},{
							sId : 2,
							name: '函数', 
							pId : 0,
							scriptName: 'func'
						},/*{
							sId : 3,
							name: 'java', 
							pId : 2,
							isParent: true,
							scriptName: 'java'
						},{
							sId : 4,
							name: 'python', 
							pId : 2,
							isParent: true
						},*/{
							sId : 5,
							name: '代码编辑', 
							pId : 0,
							scriptName: 'code'
						}
					];
					
					var zTree,settings = {
						view : {
							showLine : false,
						},
						data : {
							simpleData : {
								enable : true,
								idKey : "sId",
								pIdKey : "pId",
							},
						},
						callback:{
							onClick: onTreeClick
						}
					};

					getMethod(1, function(methods) {
						var javaMethods = methods;
						getMethod(2, function(methods) {
							zNodes = zNodes.concat(javaMethods, methods);
							ztreeObj = $.fn.zTree.init($("#structKeyTree", $el), settings, zNodes);
							if(fieldData && fieldData.splitMethod){
								var tmptreeArr = ztreeObj.getNodeByParam("sId",fieldData.splitMethod,null);
								ztreeObj.expandNode(tmptreeArr.getParentNode(),true,false,true);
			                    ztreeObj.selectNode(tmptreeArr);
			                    if(fieldData.splitParam){
			                    	var inputVal = JSON.parse(fieldData.splitParam);
			                    	onTreeClick({},{},tmptreeArr,{},inputVal);
			                    }else{
			                    	onTreeClick({},{},tmptreeArr,{},true);
			                    }
							}else{
								var tmptreeArr = ztreeObj.getNodeByParam("sId",index+1,null);
								ztreeObj.expandNode(tmptreeArr.getParentNode(),true,false,true);
			                    ztreeObj.selectNode(tmptreeArr);
								onTreeClick({},{},tmptreeArr,{});
							}
						})
					})
				}
				
				function onTreeClick(event, treeId, treeNode,clickFlag,inputParam) {
					isJavaFun = false;
					$('li', $("#structKeyTree", $el)).removeClass('activeli');
					$('#'+treeNode.tId, $("#structKeyTree", $el)).addClass('activeli');

					$('#inParams-list-content', $el).hide();
					$('#script-region', $el).attr('contenteditable', "plaintext-only").empty();
					$('#preview-content', $el).empty();
					scriptName = treeNode.scriptName;
					splitFlag = treeNode.splitFlag;
					if(treeNode.scriptName && treeNode.scriptName == 'groovy'){
						$('#inParams-list-content', $el).show();
						$('#script-region', $el).attr('contenteditable', "none").empty();
						scriptName = treeNode.scriptName;
						splitFlag = treeNode.splitFlag;
						isJavaFun = true;
						var methodId = treeNode.methodId;
						getMethodParams(methodId).then(function () {
							if(inputParam && inputParam.length>0){
								$('input.paramVal', $el).each(function(index, el) {
									$(this).val(inputParam[index])
								});
							}
						})
					}else if(treeNode.scriptName && treeNode.scriptName == 'code'){
						scriptName = 'groovy';
						splitFlag = 3;
					}else if(treeNode.scriptName && treeNode.scriptName == 'regex' && selectedText){
						getAnalysisRegex();
						selectedText = undefined;
					}else if(treeNode.scriptName &&(treeNode.scriptName == 'func'|| treeNode.scriptName == 'java')){
						scriptName = 'groovy';
						splitFlag = 3;
					}
					if(inputParam){
						var ids = $('#structConfig-tab3', $el).data();
						if(ids.hasOwnProperty('parentId')){
							var fieldData = reqData.privateFields[ids.parentId].splitFields[ids.currentId];
							var script = fieldData.fieldScript.replace(/</gm,'&lt;').replace(/>/gm,'&gt;');
							$('#script-region', $el).html(script);
						}
					}
				};


				/**
				* 获取字符串转正则结果
				*/
				function getAnalysisRegex() {
					return app.common.ajaxWithAfa({
						url:'LogCfgAction_analysisRegex.do',
						data:{
							str: selectedText
						}
					}).done(function(data) {
						$('#script-region', $el).text(data.result);
						return $.Deferred().resolve();
					})
				}
				
				/**
				* 获取函数方法列表
				* @param methodType java:1  python:2
				*/
				function getMethod(type, callback) {
					var methods = [];
					app.common.ajaxWithAfa({
						url:'LogCfgAction_getMethod.do',
						data:{
							methodType: type
						}
					}).done(function(data) {
						var result = data.result;
						
						for(var i = 0; i < result.length; i++) {
							methods.push({
								methodId: result[i].id,
								sId: Number(type.toString() + '0' + i.toString()),
								name: result[i].methodDes,
								pId: type + 1,
								scriptName:type == '1'?'groovy':'python',
								splitFlag:type == '1'? 3 : 2
							})
						}
						
						callback(methods);
					})
				}
				
				/**
				 * 获取方法参数
				 * @param methodId 方法id
				 */
				function getMethodParams(methodId) {
					return app.common.ajaxWithAfa({
						url:'LogCfgAction_getMethodParams.do',
						data:{
							methodId: methodId
						}
					}).done(function(data) {
						var result = data.result;
						var inParamList = [];
						var inParams = '';
						for(var i = 0; i < result.length; i++) {
							if(result[i].isOutParam == 2) {
								inParamList.push(result[i]);
							}
						}
						
						for(var i = 0; i < inParamList.length; i++) {
							inParams += '<li>\
								<span>' + inParamList[i].paramName + '</span>\
								<span>' + inParamList[i].paramDes + '</span>\
								<span>' + inParamList[i].paramType + '</span>\
								<span>' + (i > 0 ? '<input type="text" class="paramVal">': '') + '</span>\
								</li>';
						}
						
						var methodId = inParamList[0].methodId;
						$('#inParams-list-content', $el).attr('data-method-id', methodId).html(inParams);
						return $.Deferred().resolve();
					})
				}
				
				/**
				 * 获取函数表达式
				 * @return
				 */
				function getFieldScript(methodId, values) {
					return app.common.ajaxWithAfa({
						url:'LogCfgAction_getFieldScript.do',
						data:{
							methodId: methodId,
							values: values
						}
					}).done(function(data) {
						$('#script-region', $el).text(data.result.replace(/([&|&*amp;])*lt;/gim, '<').replace(/([&|&*amp;])*gt;/gim, '>'));
						return $.Deferred().resolve(data);
					})
				}
				
				/**
				 * 获取字段拆分
				 * @param scriptName
				 * @param script
				 * @param str
				 * @return
				 */
				function getMatch(scriptName, script, str, logEventRegex) {
					app.common.ajaxWithAfa({
						url:'LogCfgAction_getMatch.do',
						data:{
							scriptName: scriptName,
							script: script,
							str: str,
							logEventRegex: logEventRegex || '',
						}
					}).done(function(data) {
						var result = data.result;
						var dataExample = str.replace(/</gm,'&lt').replace(/>/gm, '&gt');
						var newData = '';
						var end = 0;
						
						if(result && result.length) {
							for(var i = 0; i < result.length; i++) {
								end = dataExample.indexOf(result[i]);
								newData += dataExample.substring(0, end) + '<span class="hightLight">' + result[i] + '</span>';
								dataExample = dataExample.substring(end + result[i].length);
								
								if(i == (result.length - 1)) {
									newData += dataExample;
								}
							}
						} else {
							app.alert('暂无匹配结果');
						}

						$('#preview-content', $el).html(newData);
						let parentTop = $('#preview-content', $el).offset().top;
						let thisTop = $('#preview-content .hightLight', $el).offset().top;
						$('#preview-content', $el).scrollTop(thisTop - parentTop);
					})
				}

				// 关闭窗口
				$('#structConfig-tab3', $el).on('click', '.structConfig-tab3-closeBtn', function(event) {
					event.stopPropagation();
					$('#structConfig-tab3', $el).removeClass('active');
				}).on('click', '#pre-analyze',function(event, notAnalyze, callback) {
					event.stopPropagation();
					event.preventDefault();
					if(splitFlag == '3' && isJavaFun) {
						var methodId = $('#inParams-list-content').attr('data-method-id');
						var paramVal = [];
						var verify = true;
						$('#inParams-list input.paramVal', $el).each(function() {
							if($(this).val() == '') {
								verify = false;
								app.alert('请填写函数参数');
							} else {
								paramVal.push($(this).val());						
							}
						});
						
						// 首先获取表达式，然后进行预解析
						verify && getFieldScript(methodId, paramVal).then(function (data) {
							if(!notAnalyze){
								getMatch(scriptName, data.result, $('#dataExample', $el).text(), $('#logEventRegex' , $el).val());
							}

							callback && callback();
						})
					} else {
						// 校验脚本中的值，直接预解析
						if($('#script-region', $el).text() != '') {
							var script = $('#script-region').text();
							if(!notAnalyze){
								getMatch(scriptName, script, $('#dataExample', $el).text(), $('#logEventRegex' , $el).val());
							}
							callback && callback();
						} else {
							app.alert('请填写执行脚本');
						}
					}
				})
				

			// 获取结构化配置数据
			function getCfgData() {
				var data = app.common.serializeObject($('#structConfig_form', $el));
				data['lineFlag'] = $('#lineFlag',$el).hasClass('true')?'1':'0';
				
				if(data.lineFlag == '1'){
					delete data.mulitiLineType;
				}
				data.dataExample = $('#dataExample',$el).text();
				return data;
			}

			// 保存结构化配置
			function addCfgLogStruct() {
				// 公共数据
				$('#structConfig_public', $el).children().each(function(){
					var $spanGroup = $(this).find('span');
					var index = $(this).attr('dataId');
					reqData.publicFields[index].dataSource = $spanGroup.eq(2).children().val();
					reqData.publicFields[index].fieldRegex = $spanGroup.eq(3).children().val();
					reqData.publicFields[index].fieldDefault = $spanGroup.eq(4).children().val();
					if(["日志日期","日志行时间戳"].includes($spanGroup.eq(1).text())){
						reqData.publicFields[index].format = $spanGroup.eq(5).children().val();
					}
				})
				
				var publicFields = [];
				reqData.publicFields.forEach(item => {
					if (item.fieldRegex !== '') {
						publicFields.push(item);
					}
				})
				
				reqData.publicFields = publicFields;

				$.extend(reqData.cfgLogInfo, getCfgData());
				app.common.ajaxWithAfa({
					url:'LogCfgAction_addCfgLogInfoNew.do',
					data:{
						cfgLogInfo: JSON.stringify(reqData.cfgLogInfo),
						publicFields: JSON.stringify(reqData.publicFields)
					}
				}).done(function (data) {
					if (data.result == 'OK') {
						app.alert('操作成功！');
						app.tab.close(null, tabsId);
//						handler.prevStep();
					}else{
						app.error('保存操作失败,请查看日志！');
					}
				})
			}

			// 保存
			$('#saveData', $el).on('click', function(){
				event.stopPropagation();
				event.preventDefault();
				var flag = 0;
				// 处理内容样例;未处理
				if($('#dataExample',$el).html() == ""){
					$('#dataExample',$el).parent().addClass('error');
					flag = 1;
				}

				if(!validatePageData() || flag){
					// $('#logExample_upload', $el).text('上传日志');
					return;
				}
				addCfgLogStruct();
			})

			function validatePageData() {
				var validateResult = app.validate.validate({
					$context : $('#structConfig_form',$el),
					data:[{
						"id":"logName",
						"filter":{
							"require":true,
						}
					},{
						"id":"logEventRegex",
						"filter":{
							"require":true,
						}
					},{
						"id":"objectid",
						"filter":{
							"require":true,
						}
					}],
					errorCallback: function ($element, errMsg) {
						if(!$element.next().hasClass('help-inline')){
							$element.after(`<span class="help-inline">${errMsg}</span>`);
						}else{
							$element.next().removeClass('hide');
						}
			    }
				});
				return validateResult.bResult;
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