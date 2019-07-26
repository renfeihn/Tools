define(["jquery", "handlebars", "module/logInfoConfigManage/addLogInfoConfig/splitConfiger", "codemirror/lib/codemirror", "codemirror/mode/python/python", "codemirror/mode/groovy/groovy"], function($, hb, SplitConfiger,CodeMirror){
		var splitConfig;//拆分配置
		var $parentPageContext;
		return {

			load : function($el, scope, handler) {
				
				var getCfgLogInfoObject = {};
				var logName = [];
				var logSourceAndAgent = null;
				var rowData = scope.data||{};//父页面传参
				var logId = rowData.logId != undefined?undefined:rowData.logId;
				$parentPageContext = $el;
				var publicDataSource = {
					'0':'',
					'1':'日志目录',
					'2':'日志内容'
				};
				var publicFieldsData = [
						{logId:logId,fieldKey:'_date_',fieldName:'日志日期',dataSource:'1',fieldRegex:'',fieldDefault:''},
						{logId:logId,fieldKey:'_time_',fieldName:'日志行时间戳',dataSource:'2',fieldRegex:'',fieldDefault:''},
						{logId:logId,fieldKey:'_level_',fieldName:'日志行级别',dataSource:'2',fieldRegex:'',fieldDefault:''},
						{logId:logId,fieldKey:'_serial_',fieldName:'日志流水',dataSource:'2',fieldRegex:'',fieldDefault:''},
						{logId:logId,fieldKey:'__logstart__',fieldName:'日志开始标识',dataSource:'2',fieldRegex:'',fieldDefault:''},
						{logId:logId,fieldKey:'__logend__',fieldName:'日志结束标志',dataSource:'2',fieldRegex:'',fieldDefault:''}
					]
				var reqData = {
						cfgLogInfo:{
							logId:logId
						},
						privateFields:[],
						publicFields:publicFieldsData.concat()
					};//页面数据
				
				var sourceId = scope.scope.activeTr.sourceId;
				var sourceType = scope.scope.activeTr.sourceType;
				
				function loadApp (cate) {
					app.common.ajaxWithAfa({
						url: "LogCfgAction_getCfgLogInfoByCate.do",
						data: {
							cate
						}
					}).done(function (data) {
						data.result.forEach((item,index)=>{
							getCfgLogInfoObject[item.logId] = item;
							logName.push({
								logId: item.logId,
								logName: item.logName
							})
						})
						setPages()
					})
				}
				
				loadInfo();
				function loadInfo() {
					app.common.ajaxWithAfa({
						url:"LogCfgSourceAction_getSourceNew.do",
						data: {
							sourceType,
							sourceId
						}
					}).done(function(data){
						let privateFields = data.result.privateFields;
						logSourceAndAgent = data.result.logSourceAndAgent;
						let fields = [];
						privateFields && privateFields.forEach(item => {
							fields.push({
								splitFields: [item],
								splitFlag: 0
							})
						})
						var cateoryId = data.result.logSourceAndAgent ? data.result.logSourceAndAgent.cateoryId : data.result.cateoryId ? data.result.cateoryId : null;
						if (cateoryId) {
							loadApp(cateoryId);
						}
						reqData.privateFields = fields;
						refreshStructKey(fields);
					})
				}
				
				function refreshStructKey(data) {
					
					var splitFields = [];
					
					for (var i = 0; i < data.length; i++) {
						if (data[i].splitFields.length) {
							for (var j = 0; j < data[i].splitFields.length; j++) {
								data[i].splitFields[j].splitFlag = data[i].splitFlag;
								data[i].splitFields[j].parentId = i;
								data[i].splitFields[j].currentId = j;
								splitFields.push(data[i].splitFields[j]);
							}
						}
					}
					  
					var htmlStr = '';
					
					if(splitFields.length <= 0){
						htmlStr = '<li><span style="width: 100%;">无数据</span></li>';
					} else {
						for (var i = 0; i < splitFields.length; i++) {
							var splitTypeStr = '';
							if (splitFields[i].splitFlag == '0') {
								splitTypeStr +=	'<span class="splitType" type="regex">\
											<img src="img/logInfoConfigManage/regex.png">\
										</span>';
							} else if (splitFields[i].splitFlag == '1') {
								splitTypeStr +=	'<span class="splitType" type="afe">\
											<img src="img/logInfoConfigManage/agree.png">\
										</span>';
							} else if (splitFields[i].splitFlag == '2') {
								splitTypeStr +=	'<span class="splitType" type="python">\
											<img src="img/logInfoConfigManage/python.png">\
										</span>';
							} else if (splitFields[i].splitFlag == '3') {
								splitTypeStr +=	'<span class="splitType" type="java">\
											<img src="img/logInfoConfigManage/java.png">\
										</span>';
							}
							
							htmlStr += '<li data-id="'+splitFields[i].structId+'" data-parent-id="'+splitFields[i].parentId+'" data-current-id="'+splitFields[i].currentId+'" data-split-flag="'+(splitFields[i].splitFlag || '')+'">\
										<span class="fieldKey">' + (splitFields[i].fieldKey || '') + '</span>\
										<span class="fieldDesc">' + (splitFields[i].fieldDesc || '') + '</span>\
										<span class="fieldType">' + (splitFields[i].fieldType || '') + '</span>\
										'+splitTypeStr+'\
										<span class="structConfig-quote">\
											<i class="fa fa-bell-o" style="font-size: 16px; margin-top: 6px; cursor:pointer;'+(splitFields[i].fieldCheck?'color:#5a62f9;':'')+'"></i>\
										</span>\
										<span class="structConfig-modify" title="编辑">\
										<i class="fa fa-pencil-square-o" style="font-size: 16px; margin-top: 6px;"></i>\
										</span></li>';
						}
					}
					
					$('#structConfig_private', $el).html(htmlStr);
				}
				
				
				
				function setPages(){
					console.log(logName)
					var h = logName.map(item => {
						return `<option value="${item.logId}">${item.logName}</option>`;
					})
					$("#selectApps", $el).html(h);
					$("#selectApps", $el).val(scope.scope.activeTr.logId);
					$("#selectApps", $el).tinyselect();
					

					$("#selectApps", $el).on('change', function  () {
						var val = $(this).val();
						var dataExample = getCfgLogInfoObject[val].dataExample;
						$("#dataExample", $el).empty();
						if(dataExample){
							$("#dataExample", $el).html(dataExample);
						}
					})
					
					$("#selectApps", $el).trigger('change');
					
					
					
						
					var templates = {};//模版
					var $structKeyModal = $('#structKeyModal',$el);
					var $editStructKeyModal = $('#structConfig-tab3',$el);
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
					var $previewModalTable = $('#previewModalTable',$el).DataTable({
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
					}),
					$serverLogPreviewModal = $('#serverLogPreviewModal', $el),
					serverLogPreviewData,
					ztreeObj;
					var fieldNames,
					fielddataArr;
					var waningFieldMapping;

					if(rowData.logId != undefined){
						getPageData();
					}else{
						reqData.publicFields.splice(4,2);
						refreshPublicStruct(reqData.publicFields);
					}
					

					$('#lineFlag', $el).on('click', function(event) {
						if($(this).hasClass('true')){
							$(this).removeClass('true');
							$(this).parent().parent().next().show();
							$('#mulitiLineType',$el).trigger('change');
						}else{
							$(this).addClass('true');
							$(this).parent().parent().next().hide();

							reqData.publicFields.splice(3,reqData.publicFields.length - 3);
							refreshPublicStruct(reqData.publicFields);
						}

						return false;
					});
					/**
					 * 获取字段信息
					 * @return {[type]} [description]
					 */
					getFieldData();
					function getFieldData() {
						app.common.ajaxWithAfa({
							url:'FieldDictionaryAction_getAll.do'
						}).done(function (data) {
							var result = data.result;
							fieldNames = [];
							fielddataArr = [];
							if(result && result.length > 0){
								result.forEach(function (item, index) {
									fielddataArr.push({
										desc:item.fieldDesc,
										value:item.fieldName+':'+item.fieldDesc,
										name:item.fieldName,
										type:item.fieldType
									});
									fieldNames.push(item.fieldName);
								})
							}
						})
					}

					// 刷新公共结构化数据
					function refreshPublicStruct(data) {
						var publicHtmlString = '';
						for (var i = 0; i < data.length; i++) {
							publicHtmlString +='<li dataId="'+i+'"><span>'+data[i].fieldKey+'</span>\
								<span>'+data[i].fieldName+'</span>\
								<span>'+publicDataSource[data[i].dataSource]+'</span>\
								<span>'+$('<div/>').text(data[i].fieldRegex).html()+'</span>\
								<span>'+$('<div/>').text(data[i].fieldDefault).html()+'</span>\
								<span>'+(["日志日期","日志行时间戳"].includes(data[i].fieldName)?(data[i].format?data[i].format:''):"")+'</span>\
								<span class="structConfig-modify" title="编辑">\
									<i class="fa fa-pencil-square-o" style="font-size: 16px; margin-top: 6px;"></i>\
								</span></li>';
						}

						$('#structConfig_public', $el).html(publicHtmlString);
					}

					// 获取页面数据
					function getPageData() {
						app.common.ajaxWithAfa({
							url: 'LogCfgAction_getCfgLogInfoById.do',
							data: {
								logId:rowData.logId
							}
						}).done(function (data) {
							if (data.result) {
								reqData.privateFields = data.result.privateFields || [];
								reqData.publicFields = data.result.publicFields || publicFieldsData.concat();

								for (var i in data.result) {
									if (data.result.hasOwnProperty(i) && i != 'privateFields' && i != 'publicFields') {
										reqData.cfgLogInfo[i] = data.result[i];
									}
								}

								if(data.result.publicFields && data.result.publicFields.length>0){
									reqData.publicFields = data.result.publicFields;
								}else{
									reqData.publicFields = publicFieldsData.concat();
									if(reqData.cfgLogInfo.lineFlag == '1'){
										reqData.publicFields.splice(3,3);
									}else if(reqData.cfgLogInfo.mulitiLineType == '0'){
										reqData.publicFields.splice(4,2);
									}else if(reqData.cfgLogInfo.mulitiLineType == '1'){
										reqData.publicFields.splice(3,1);
									}
								}

								initPage();
							}
						})
					}

					//  初始化页面数据
					function initPage() {
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
						refreshStructKey(reqData.privateFields);
					}

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

					//日志内容样例-浏览(上传文件)
					$('#logExample_upload', $el).on('click', function(event) {
						event.preventDefault();
						$(this).next().click();
					});
					$('#logExampleDiv', $el).on('change', '.logExample-file',function(event) {
						var files = $(this)[0].files;
						var type = $('#logCoding',$el).val() || undefined;
						handleFiles(files,type);
					});
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

					$('#serverLogPreview', $el).on('click', function(event) {
						event.preventDefault();
						getAgentInfo().then(function (data) {
							$('.PreviewModal-right', $el).empty();
							$serverLogPreviewModal.modal('show');
							$('#previewModalTable tbody>tr:eq(0)', $serverLogPreviewModal).click();
						})
					});

					// 服务器日志模态框事件
					$serverLogPreviewModal.on('click', 'tr', function(event) {
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

					// 多行匹配方式
					$('#mulitiLineType',$el).on('change',function(event) {
						var value = $(this).val();
						if(value == '0'){
							reqData.publicFields.splice(3,2,publicFieldsData[3]);
						}else{
							reqData.publicFields.splice(3,1,publicFieldsData[4],publicFieldsData[5]);
						}
						refreshPublicStruct(reqData.publicFields);
					});

					// 点击其他区域隐藏弹窗
					$parentPageContext.on('click', function(event) {
						if($(event.target).closest($('#tipBox', $el)).length == 0 && event.target != $('#dataExample',$el)[0]){
							$('#tipBox', $el).hide();
							// $('#dataExample', $el).html(logExample);
							// logExample = undefined;
							$('#dataExample', $el).removeClass('active');
						}
						if($(event.target).closest($('#structConfig-tab3, #tipBox', $el)).length == 0 &&
							event.target != $('#addFieldsBtn',$el)[0] && !$(event.target).hasClass('fa-pencil-square-o')){
							$('.structConfig-tab3-closeBtn', $('#structConfig-tab3', $el)).trigger('click');
						}
					});

					// 显示操作框-弹窗
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
					$('#tipBox', $el).on('click', '#tipBoxAddBtn', function(event) {
						event.preventDefault();

						var $tipBox = $('#tipBox', $el);
						var tmpObj = {};
						tmpObj.structDes = $('#lineDesc', $tipBox).val();
						tmpObj.lineRegex = '';
						tmpObj.dataRegex = '';
						tmpObj.splitFlag = $('#splitFlag', $tipBox).val();

						reqData.privateFields.push(tmpObj);
						$el.click();

						refreshStructKey(reqData.privateFields);

						$(".structKeyList li>span.splitType:last").click();
					}).on('click', 'ul>li', function(event) {
						event.preventDefault();
						$el.click();
						var index = $(this).index();
						// 打开新增标签
						$('#addFieldsBtn', $el).trigger('click', [index,selectedText]);
					});
					// 公共数据操作
					$('#structConfig_public').on('click', 'li>span .fa-pencil-square-o', function(event) {
						$(this).removeClass('fa-pencil-square-o').addClass('fa-save').attr('title', '保存');
						$li = $(this).parent().parent();

						var desc = $li.children('span')[1];
						var dataSource = $li.children('span')[2];
						var RegEx = $li.children('span')[3];
						var FidDft = $li.children('span')[4];

						if(["日志日期","日志行时间戳"].includes($(desc).text())){
							var Format = $li.children('span')[5];
						}


						var dataSourceValue = $(dataSource).html();
						var option = '';
						for (var i in publicDataSource) {
							option += '<option value="'+i+'">'+publicDataSource[i]+'</option>';
							if(publicDataSource[i] == dataSourceValue){
								dataSourceValue = i;
							}
						}
						var RegExVal = $(RegEx).text();
						var FidDftVal = $(FidDft).text();
						if(["日志日期","日志行时间戳"].includes($(desc).text())){
							var FormatVal = $(Format).text();
						}
						$(dataSource).html('<select>'+option+'</select>');
						$(dataSource).find('select').val(dataSourceValue);
						$(RegEx).html('<input type="text"/>').find('input').val(RegExVal);
						$(FidDft).html('<input type="text"/>').find('input').val(FidDftVal);
						if(["日志日期","日志行时间戳"].includes($(desc).text())){
							$(Format).html('<input type="text"/>').find('input').val(FormatVal);
						}
						
					}).on('click', 'li>span .fa-save', function(event) {
						$(this).removeClass('fa-save').addClass('fa-pencil-square-o').attr('title', '编辑');
						$li = $(this).parent().parent();
						var desc = $li.children('span')[1];
						var dataSource = $li.children('span')[2];
						var RegEx = $li.children('span')[3];
						var FidDft = $li.children('span')[4];
						if(["日志日期","日志行时间戳"].includes($(desc).text())){
							var Format = $li.children('span')[5];
						}
						
						var dataSourceValue = $(dataSource).find('select').val();
						$(dataSource).html(publicDataSource[dataSourceValue]);
						$(RegEx).text($(RegEx).find('input').val());
						$(FidDft).text($(FidDft).find('input').val());
						if(["日志日期","日志行时间戳"].includes($(desc).text())){
							$(Format).text($(Format).find('input').val());
						}

						// 刷新公共数据
						var index = $li.attr('dataId');
						reqData.publicFields[index].fieldRegex = $(RegEx).html();
						reqData.publicFields[index].fieldDefault = $(FidDft).html();
						reqData.publicFields[index].dataSource = dataSourceValue;
						if(["日志日期","日志行时间戳"].includes($(desc).text())){
							reqData.publicFields[index].format = $(Format).html();
						}
					});
					
					// 新增私有数据
					$('#addstructKey', $el).on('click', function(event) {
						event.preventDefault();
						initStructKeyModal();
					});
					
					// 新增个性数据字段
					$('#addFieldsBtn', $el).on('click', function(event, index, text) {
						event.preventDefault();
						var index = index || 0;
						isAddFields = 1;
						if(!text){
							selectedText = undefined;
						}
						initEditStructKeyModal(index);
						$('input#fieldKey', $el).val('');
						$('input#fieldDesc', $el).val('');
						$('#fieldType', $el).val('');
						$('#script-region', $el).text('');
						$('#preview-content', $el).empty();
						$('#delete-fields', $el).hide();
					});
					
					// 编辑私有数据操作
					$('#structConfig_private', $el).on('click', 'li>span .fa-pencil-square-o', function(event) {
						var $li = $(this).parent().parent();
						var current = 0;
						splitFlag = $li.attr('data-split-flag') || '';
						if(splitFlag != 0){
							current = 2;
						}
						var currentId = $li.attr('data-current-id'),
							parentId = $li.attr('data-parent-id');
						var fieldData = reqData.privateFields[parentId].splitFields[currentId];
						initEditStructKeyModal(current, fieldData);
						$('#structConfig-tab3', $el).data({
							currentId:currentId,
							parentId:parentId
						})
						$('input#fieldKey', $el).val(fieldData.fieldKey);
						$('input#fieldDesc', $el).val(fieldData.fieldDesc);
						$('#fieldType', $el).val(fieldData.fieldType);
						$('#delete-fields', $el).show();
						isAddFields = 2;
					}).on('click', '.structConfig-quote .fa-bell-o', function(event) {
						event.preventDefault();
						var $li = $(this).parent().parent();
						var currentId = $li.attr('data-current-id'),
							parentId = $li.attr('data-parent-id');
						var fieldData = reqData.privateFields[parentId].splitFields[currentId];
						getWaningField().then(function (data) {
							$('#warningModal',$el).data({
								currentId:currentId,
								parentId:parentId
							}).modal('show').find('form')[0].reset();
							waningFieldMapping = {
								'-1':fieldData.checkValue
							};
							var tmpHtml = '<option value="-1"></option>';
							var id = null;
							if(data.result && data.result.length){
								data.result.forEach(function (item) {
									if (item.warnValue === fieldData.checkValue) {
										id = item.id;
									}
									tmpHtml += '<option value="'+item.id+'">'+item.name+'</option>';
									waningFieldMapping[item.id] = item.warnValue;
								})
								$('#waningFieldList', $('#warningModal',$el)).html(tmpHtml);
							}
							if (id) {
								$("#waningFieldList", $('#warningModal',$el)).val(id)
							}
							if (fieldData.timeInterval) {
								$('#timeInterval', $('#warningModal',$el)).val(fieldData.timeInterval)
							}
							if(fieldData.fieldCheck){
								$('#fieldCheck', $('#warningModal',$el)).val(fieldData.fieldCheck).trigger('change', fieldData.checkValue);
								$('.delbtn',$('#warningModal',$el)).show();
							}else{
								$('#fieldCheck', $('#warningModal',$el)).trigger('change');
								$('.delbtn',$('#warningModal',$el)).hide();
							}
						})
					}).on('click', '.structConfig-unSensitivity', function(event) {
						event.preventDefault();
						var $li = $(this).parent();
						var currentId = $li.attr('data-current-id'),
							parentId = $li.attr('data-parent-id');
						var fieldData = reqData.privateFields[parentId].splitFields[currentId];
						$('#unSensitivityModal',$el).data({
							currentId:currentId,
							parentId:parentId
						}).modal('show').find('form')[0].reset();
						if(fieldData.unSensitivity){
							$('[name="character"]', $('#unSensitivityModal',$el)).val(fieldData.unSensitivity);
						}
					});
					
					function getWaningField	() {
						return app.common.ajaxWithAfa({
							url:'LogWarningFieldAction_getAllWarningFields.do'
						}).done(function (data) {
							return $.Deferred().resolve(data);
						})
					}

					// 关闭窗口
					$('#structConfig-tab3', $el).on('click', '.structConfig-tab3-closeBtn', function(event) {
						$('#structConfig-tab3', $el).removeClass('active');
						$("#mask", $el).removeClass('mask').attr('style','z-index: auto;');
					})
					// 删除当前字段
					.on('click', '#delete-fields',function(event) {
						event.preventDefault();
						// 如果是编辑状态-需要删除
						if(isAddFields == 2) {
							isAddFields = 3;
							savePrivate();
							refreshStructKey(reqData.privateFields);
						}
						
						$('.structConfig-tab3-closeBtn', $el).trigger('click');
					})
					// 预解析
					.on('click', '#pre-analyze',function(event, notAnalyze, callback) {
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
					// 确定
					.on('click', '#inParams-save', function(event) {
						if($('#script-region').val() == ''){
							$('#pre-analyze', $el).trigger('click',[true,function () {
								if(savePrivate()) {
									refreshStructKey(reqData.privateFields);
									$('.structConfig-tab3-closeBtn').trigger('click');
									app.domain.exports('privateFields', {
										data: reqData.privateFields
									})
								}
							}]);
						}
					});
					
					/**
					* 确定保存字段
					*/
					function savePrivate() {
						// 校验非空
						if(isAddFields == 1 || isAddFields == 2){
							if($('input#fieldKey', $el).val() == '') {
								app.alert("请填写必须项！");
								return false;
							} else if($('input#fieldDesc', $el).val() == '') {
								app.alert("请填写必须项！");
								return false;
							} else if($('#fieldType', $el).val() == '') {
								app.alert("请填写必须项！");
								return false;
							} else if($('#script-region', $el).text() == '') {
								app.alert("请填写必须项！");
								return false;
							}

							/*if(fieldNames.indexOf($('input#fieldKey', $el).val().trim()) < 0){
								app.alert("该字段名称不存在");
								return false;
							}*/
						}

						var node = ztreeObj.getSelectedNodes();
						var field = $('#structConfig-tab3', $el).data();
						var inputVal;
						$('input.paramVal', $el).each(function(index, el) {
							if(inputVal){
								inputVal.push($(this).val());
							}else{
								inputVal = [$(this).val()]
							}
						});
						if(inputVal){
							inputVal = JSON.stringify(inputVal);
						}
						if(isAddFields == 1) {
							addFieldToPrivate(node,inputVal);
						} else if(isAddFields == 2) {
							var oldFieldData = reqData.privateFields[field.parentId].splitFields[field.currentId];
							if(splitFlag == oldFieldData.splitFlag){
								oldFieldData = $.extend(true, oldFieldData, {
									fieldKey : $('input#fieldKey', $el).val(),
									fieldDesc : $('input#fieldDesc', $el).val(),
									fieldType : $('#fieldType', $el).val(),
									fieldScript : $('#script-region', $el).text(),
									splitParam:inputVal,
									splitFlag : splitFlag,
									splitMethod : node[0].sId
								});
							}else{
								reqData.privateFields[field.parentId].splitFields.splice(field.currentId, 1);//删除原数据
								addFieldToPrivate(node,inputVal);
							}
						} else if(isAddFields == 3) {
							reqData.privateFields[field.parentId].splitFields.splice(field.currentId, 1);
						}
						return true;
					}

					/**
					 * 新增字段到个性化数据
					 */
					function addFieldToPrivate(selectTreeNodes, inputVal){
						var parentId;
						for (var i = 0; i < reqData.privateFields.length; i++) {
							if(reqData.privateFields[i].splitFlag == splitFlag){
								parentId = i;
								break;
							}
						}
						if(parentId != undefined){
							reqData.privateFields[parentId].splitFields.push({
								fieldKey: $('input#fieldKey', $el).val(),
								fieldDesc: $('input#fieldDesc', $el).val(),
				                fieldType: $('#fieldType', $el).val(),
				                fieldScript: $('#script-region', $el).text(),
				                isLink: 0,
				                splitMethod: selectTreeNodes[0].sId,
				                splitFlag: splitFlag,
				                splitParam:inputVal
							});
						}else{
							reqData.privateFields.push({
								splitFlag:splitFlag,
								splitFields:[
									{
										fieldKey: $('input#fieldKey', $el).val(),
										fieldDesc: $('input#fieldDesc', $el).val(),
						                fieldType: $('#fieldType', $el).val(),
						                fieldScript: $('#script-region', $el).text(),
						                isLink: 0,
						                splitMethod: selectTreeNodes[0].sId,
						                splitFlag: splitFlag,
						                splitParam:inputVal
									}
								]
							})
						}	
					}
					
					/**
					* 初始化编辑私有数据模态框
					*
					* @param data 初始化数据
					*/
					function initEditStructKeyModal(index, fieldData) {
						if(fieldData){
							$('.structConfig-slideBlockTitle', $('#structConfig-tab3', $el)).text('编辑字段');
						}else{
							$('.structConfig-slideBlockTitle', $('#structConfig-tab3', $el)).text('新增字段');
						}
						ztreeObj && ztreeObj.destroy();
						$('#structConfig-tab3', $el).removeData().addClass('active');//清除保存在节点上的数据
						$("#mask", $el).addClass('mask').attr('style','z-index: 501');
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
							},{
								sId : 6,
								name: 'JSON', 
								pId : 0,
								scriptName: 'regex',
								splitFlag: 0
							},{
								sId : 7,
								name: 'XML', 
								pId : 0,
								scriptName: 'regex',
								splitFlag: 0
							},{
								sId : 8,
								name: '分隔符', 
								pId : 0,
								scriptName: 'regex',
								splitFlag: 0
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
						$("#jsonOrXml", $el).hide();
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
							getAnalysisRegex().then(function () {
								if (treeNode.name == "XML") {
									$("#script-region", $el).text('$.xml(null)')
									$("#jsonOrXml", $el).show();
									$(".xml", $el).show();
									$(".json", $el).hide();
								} else if (treeNode.name == "JSON") {
									$("#script-region", $el).text('$.json(null)')
									$("#jsonOrXml", $el).show();
									$(".xml", $el).hide();
									$(".json", $el).show();
								}
							});
							selectedText = undefined;
						}else if(treeNode.scriptName &&(treeNode.scriptName == 'func'|| treeNode.scriptName == 'java')){
							scriptName = 'groovy';
							splitFlag = 3;
						}else if(treeNode.scriptName && treeNode.scriptName == 'regex' && !selectedText){
							if (treeNode.name == "XML") {
								$("#script-region", $el).text('$.xml(null)')
								$("#jsonOrXml", $el).show();
								$(".xml", $el).show();
								$(".json", $el).hide();
							} else if (treeNode.name == "JSON") {
								$("#script-region", $el).text('$.json(null)')
								$("#jsonOrXml", $el).show();
								$(".xml", $el).hide();
								$(".json", $el).show();
							}
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

					/**
					* 初始化私有数据模态框
					*
					* @param data 初始化数据
					*/
					function initStructKeyModal(index,data) {
						$structKeyModal.find('form')[0].reset();
						$structKeyModal.find('.control-group').removeClass('error');
						if(index != undefined){
							$('.modal-footer>button:first',$structKeyModal).show();

							$structKeyModal.attr('data-id', index);
							data = reqData.privateFields[index];
							
						}else{
							$structKeyModal.removeAttr('data-id');
							$('.modal-footer>button:first',$structKeyModal).hide();
						}
						if(data){
							for (var item in data) {
								if (data.hasOwnProperty(item)) {
									$("[name=" + item + "]").val(data[item]);
								}
							}
						}

						$structKeyModal.modal('show');
					}

					// 私有数据模态框事件
					$structKeyModal.on('click', '#structKeyModalAdd', function(event) {
						event.preventDefault();
						var index = $structKeyModal.attr('data-id');
						var tmpObj = {};
						tmpObj = app.common.serializeObject($($structKeyModal.find('form')[0]));
						if(!validatePrvModalData()){
							app.alert("请填写必须项！");
							return;
						}
						if (index == undefined) {
							tmpObj.logId = rowData.id;
							tmpObj.fieldCount = 0;
							tmpObj.splitFields = [];
							reqData.privateFields.push(tmpObj);

							refreshStructKey(reqData.privateFields);
							$structKeyModal.modal('hide');
							app.alert('操作成功！');
						}else{
							if(tmpObj.splitFlag != reqData.privateFields[index].splitFlag && reqData.privateFields[index].splitFields.length > 0){
								app.confirmDialog({
									sTitle:"确认",       
					                sType:"search",
					                sContent:'该条数据“拆分方式”已变化,修改后已配置的字段会丢失，确认修改？',
					                sBtnConfirm: '确定',
					                sBtnCancel: '取消',
					                fnConfirmHandler: function(oldData,newData){
					                	tmpObj.fieldCount = 0;
					                	tmpObj.splitFields = [];
					                	$.extend(oldData, tmpObj);

					                	refreshStructKey(reqData.privateFields);
					                	$structKeyModal.modal('hide');
					                	app.alert('操作成功！');
					                },
					                aArgs: [reqData.privateFields[index],tmpObj]
								})
							}else{
								$.extend(reqData.privateFields[index], tmpObj);

								refreshStructKey(reqData.privateFields);
								$structKeyModal.modal('hide');
								app.alert('操作成功！');
							}
						}
					})
					// 删除
					.on('click', '#structKeyModalDel', function(event) {
						var index = $structKeyModal.attr('data-id');
						app.confirmDialog({
							sTitle:"确认",       
			                sType:"search",
			                sContent:'确定删除该条数据？',
			                sBtnConfirm: '确定',
			                sBtnCancel: '取消',
			                fnConfirmHandler: function(index){
			                	reqData.privateFields.splice(index,1);
			                	refreshStructKey(reqData.privateFields);
			                	app.alert('数据删除成功！');
			                },
			                aArgs: [index]
						})
					});

					// 刷新私有数据
					


					// 可视化配置
					$("#structKeyList").on('click', 'li>span.splitType', function(event) {
						event.preventDefault();
						var type = $(this).attr('type');
						var index = $(this).parent().attr('id');

						if(type == 'afe'){
							initAFE($('#AFEBody',$el), index);
						}else if(type == 'java'){
							initJava($('#AFEBody',$el), index);
						}else if(type == 'python'){
							initPython($('#AFEBody',$el), index);
						}else if(type == 'regex'){
							initRegEx($('#AFEBody',$el), index);
						}
						$('#AFE',$el).attr('data-index', index);
						$('#AFE',$el).modal('show');
						/*$('#AFE',$el).css('top', '80px');
						$('#AFE',$el).draggable( "option", "disabled", true );//禁止拖拽*/
					})
					// 修改
					.on('click', 'li>span.structConfig-modify', function(event) {
						event.preventDefault();
						var index = $(this).parent().attr('id');
						initStructKeyModal(index);
					})
					// 展开详细字段
					.on('click', '.structConfig-expand', function(event) {
						event.preventDefault();
						var parent = $(this).parent();
						if($(this).hasClass('active')){
							$(this).removeClass('active');
							parent.next().slideUp('400',function () {
								parent.removeClass('active');
							});
						}else{
							parent.next().slideDown('400');
							$(this).addClass('active');
							parent.addClass('active');
						}
					})
					// 统计开关 
					.on('click', '.boolean-switch', function(event) {
						event.preventDefault();
						var $li = $(this).parent().parent();
						var i = $li.attr('parentId');
						var j = $li.attr('currentId');

						if($(this).hasClass('true')){
							$(this).removeClass('true');
							reqData.privateFields[i].splitFields[j].isLink = 0;
						}else{
							$(this).addClass('true');
							reqData.privateFields[i].splitFields[j].isLink = 1;
						}
						return false;
					});
					
					// 个性化字段统计开关
					$("#structConfig_private").on('click', '.boolean-switch', function(event) {
						event.preventDefault();
						var $li = $(this).parent().parent();
						var i = $li.attr('data-parent-id');
						var j = $li.attr('data-current-id');

						if($(this).hasClass('true')){
							$(this).removeClass('true');
							reqData.privateFields[i].splitFields[j].isLink = 0;
						}else{
							$(this).addClass('true');
							reqData.privateFields[i].splitFields[j].isLink = 1;
						}
						return false;
					});

					// 保存结构化配置事件
					$('#addCfgLogStruct',$el).on('click', function(event) {
						event.preventDefault();
						
						var splitFields = [];
						reqData.privateFields.forEach(item => {
							splitFields.push(...item.splitFields)
						})
						
						
						var request = {
							sourceType: scope.scope.activeTr.sourceType,
							source: JSON.stringify(logSourceAndAgent),
							privateFields: JSON.stringify(splitFields)
						}
						saveUnityData(request)
					});
					
					
					function saveUnityData(data) {
						app.common.ajaxWithAfa({
							url:'LogCfgSourceAction_updateLogCfgSourceNew.do',
							data:data
						}).done(function (data) {
							if (data.result) {
								app.alert('保存成功');
								scope.scope.closeEdit()
							}
						})
					}
					

					// 取消结构化配置事件
					$('#cancelLogStruct',$el).on('click', function(event) {
						event.preventDefault();

						$('#logInfoListUl>li.active .flowCM-closeBtn',$parentPageContext).click();
					});

					// 保存结构化配置
					function addCfgLogStruct() {
						$('#structConfig_public .fa-save').click();
						$.extend(reqData.cfgLogInfo, getCfgData());
						app.common.ajaxWithAfa({
							url:'LogCfgAction_addCfgLogInfo.do',
							data:{
								cfgLogInfo: JSON.stringify(reqData.cfgLogInfo),
								privateFields: JSON.stringify(reqData.privateFields),
								publicFields: JSON.stringify(reqData.publicFields)
							}
						}).done(function (data) {
							if (data.result == 'OK') {
								app.alert('操作成功！');
								$('#logInfoListUl>li.active .flowCM-closeBtn',$parentPageContext).trigger('click','save');
							}else{
								app.error('保存操作失败,请查看日志！');
							}
						})
					}

					$('#warningModal',$el).on('click', '.confirmBtn', function(event) {
						event.preventDefault();
						var $warningModal = $('#warningModal',$el),
						field = $warningModal.data();
						var checkValue;
						var fieldCheck = $('#fieldCheck', $warningModal).val();
						var timeInterval = $('#timeInterval', $warningModal).val();

						if(fieldCheck !=2){
							checkValue = $('#checkValue', $warningModal).val().trim();
						}else{
							checkValue = $('#checkExpress', $warningModal).val().trim();
						}
						if(!checkValue){
							app.alert('请填必输项。');
							return;
						}
						var fieldData = reqData.privateFields[field.parentId].splitFields[field.currentId];
						fieldData.fieldCheck = fieldCheck;
						fieldData.checkValue = checkValue;
						fieldData.timeInterval = timeInterval;
						refreshStructKey(reqData.privateFields);
						$warningModal.modal('hide').removeData();
					}).on('change', '#fieldCheck', function(event, data) {
						event.preventDefault();
						var $warningModal = $('#warningModal',$el);
						var fieldCheck= $(this).val();
						var $parent = $(this).parent().parent().parent();
						if(fieldCheck != 2){
							$parent.next().show().next().hide();
							if(data){
								$('#checkValue', $warningModal).val(data);
							}
						}else{
							$parent.next().hide().next().show();
							if(data){
								var $checkExpress= $('#checkExpress', $warningModal);
								// 转义
								$checkExpress.after('<span style="display:none"></span>');
								var next = $checkExpress.next();
								next.html(data);
								var text = next.text();next.remove();

								$checkExpress.text($.trim(text));
							}
						}
					}).on('change', '#waningFieldList', function(event) {
						event.preventDefault();
						var $warningModal = $('#warningModal',$el);
						var waningField = $(this).val();
						var ddd = waningFieldMapping[waningField];
						$('#checkValue', $warningModal).val(waningFieldMapping[waningField]);
					}).on('click', '.delbtn', function(event) {
						event.preventDefault();
						var $warningModal = $('#warningModal',$el),
						field = $warningModal.data();

						var fieldData = reqData.privateFields[field.parentId].splitFields[field.currentId];
						fieldData.fieldCheck = undefined;
						fieldData.checkValue = undefined;
						refreshStructKey(reqData.privateFields);
						$warningModal.modal('hide').removeData();
					});

					$('#unSensitivityModal',$el).on('click', '.confirmBtn', function(event) {
						event.preventDefault();
						var $unSensitivityModal = $('#unSensitivityModal',$el),
						field = $unSensitivityModal.data();

						var unSensitivity = $('[name="character"]', $unSensitivityModal).val();
						if(!unSensitivity){
							app.alert('请填写替换字符串');
							return;
						}
						var fieldData = reqData.privateFields[field.parentId].splitFields[field.currentId];
						fieldData.unSensitivity = unSensitivity;
						refreshStructKey(reqData.privateFields);
						$unSensitivityModal.modal('hide').removeData();
					}).on('click', '.delbtn', function(event) {
						event.preventDefault();
						var $unSensitivityModal = $('#unSensitivityModal',$el),
						field = $unSensitivityModal.data();

						var fieldData = reqData.privateFields[field.parentId].splitFields[field.currentId];
						fieldData.unSensitivity = undefined;
						refreshStructKey(reqData.privateFields);
						$unSensitivityModal.modal('hide').removeData();
					});
					/*另存为模版start*/
					$('#saveAsTemplate', $el).on('click', function(event) {
						event.preventDefault();
						var flag = 0;
						// 处理内容样例;未处理
						if($('#dataExample',$el).html() == ""){
							$('#dataExample',$el).parent().addClass('error');
							flag = 1;
						}

						if(!validatePageData() || flag){
							app.alert('请填写必须项！');
							$('#logExample_upload', $el).text('浏览');
							return;
						}

						initTemplateModal();
					});

					function initTemplateModal() {
						loadCategory();
						$('#saveAsTemplateModal', $el).modal('show');
					}

					$('#saveAsTemplateModal', $el).on('click', function(e){
						if($(e.target).closest($('#category', $el).parent()).length == 0){
							$('#categoryContent', $el).slideUp();
						}
					}).on('click', '.confirmBtn', function(event) { //确定
						event.preventDefault();
						var logName = $('#templateLogName', $el).val().trim();
						var typeName = $('#saveAsTemplateType', $el).val().trim();
						if(typeName == '' || logName == ''){
							app.alert('请填写必须项');
						}
						debugger
						var typeId = $('#saveAsTemplateType', $el).attr('typeId');
						var resultData = $.extend({}, reqData);
//						var tmpData = getCfgData();
//						tmpData.logName = logName;
						if(typeId){
							tmpData.typeId = typeId;
							$.extend(resultData.cfgLogInfo, tmpData);
							resultData.cfgLogInfo.logId = undefined;
							saveAsTemplate(resultData);
						}else{
							addType(typeName).then(function (data) {
								if(data.result){
									tmpData.typeId = data.result;
									$('#logTypeList', $parentPageContext).append('<li typeId="'+data.result+'">'+typeName+'\<button class="fa fa-pencil-square-o editClass"></button></li>');
									$.extend(resultData.cfgLogInfo, tmpData);
									resultData.cfgLogInfo.logId = undefined;
									saveAsTemplate(resultData);
								}
							})
						}
					});

					$('#category', $el).on('click', function(event) {
						event.preventDefault();
						$(this).next().slideDown('400');
						event.stopPropagation();
					});

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

					var settings = {
						view : {
							showLine : false,
						},					
						callback : {
							onClick:clickList
						}
					}
					// 三级分类树点击事件
					function clickList(event,treeId,treeNode,clickFlag) {
						var node = treeNode;
						var level = treeNode.level;
						if(level < 2){
							var $ztree = $.fn.zTree.getZTreeObj("classZtree");
							$ztree.expandNode(node, true, false, true);
							return;
						}
						$("#categoryContent", $el).slideUp('400');
						var category = [];
						while(node){
							category.unshift(node.name);
						  	node = node.getParentNode();
						}
						var selectName = category[category.length-1];
						var types = getTypes();
						if(types && types[selectName]){
							$('#saveAsTemplateType', $el).val(selectName).attr('typeId', types[selectName]);
						}else{
							$('#saveAsTemplateType', $el).val(selectName);
						}

						$('#category', $el).val(category.join('>'));
					}

					// 加载三级分类
					function loadCategory(){
						app.common.ajaxWithAfa({
							url:"EventListAction_getObjectCategory.do"
						}).done(function(data){
							data = data.objectCate;
							var resultSet = convertListToTree(data);
							var $ztree = $.fn.zTree.init($("#classZtree",$el),settings, resultSet);

							$ztree.selectNode(resultSet[0]);
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

						return treeArr;
					}

					function getTypes() {
						var logTypes = {};
						$('#logTypeList li', $parentPageContext).each(function(index, el) {
							var name = $(this).text().trim();
							var type = $(this).attr('typeId').trim();
							logTypes[name] = type;
						});

						return logTypes;
					}

					function addType(typeName) {
						return app.common.ajaxWithAfa({
							url:'LogCfgAction_addCfgLogType.do',
							data:{
								typeName: typeName
							}
						}).done(function (data) {
							return $.Deferred().resolve(data);
						})
					}

					function saveAsTemplate(reqData) {
						console.log(reqData)
						return;
						app.common.ajaxWithAfa({
							url:'LogCfgAction_addCfgLogInfo.do',
							data:{
								cfgLogInfo: JSON.stringify(reqData.cfgLogInfo),
								privateFields: JSON.stringify(reqData.privateFields),
								publicFields: JSON.stringify(reqData.publicFields)
							}
						}).done(function (data) {
							if (data.result == 'OK') {
								app.alert('操作成功！');
								$('#saveAsTemplateModal', $el).modal('hide');
							}else{
								app.error('保存操作失败,请查看日志！');
							}
						})
					}
					/*另存为模版end*/

					// 获取结构化配置数据
					function getCfgData() {
						var data = app.common.serializeObject($('#structConfig_form', $el));
						data['lineFlag'] = $('#lineFlag',$el).hasClass('true')?'1':'0';
						data['compress'] = $('#compress',$el).hasClass('true')?'1':'0';
						
						if(data.lineFlag == '1'){
							data.mulitiLineType = undefined;
						}
						data.dataExample = $('#dataExample',$el).text();
//						data.typeName = scope.activeClass.typeName;
//						var typeId = scope.activeClass.logType;
						
						if(typeId != undefined){
							data.typeId = parseInt(typeId);
						}
						return data;
					}

					// afe界面
					/**
					 * @param  {object}
					 * @param  {string}
					 * @return {undefined}
					 */
					function initAFE($el, index) {
						var option = {
							$el: $el,
							type:'afe',
							data:reqData.privateFields[index]
						}
						if(splitConfig){
							splitConfig.setData(option);
						}else{
							splitConfig = new SplitConfiger(option);
						}

					}

					// java界面
					function initJava($el, index) {
						var option = {
							$el: $el,
							type:'java',
							data:reqData.privateFields[index]
						}

						if(splitConfig){
							splitConfig.setData(option);
						}else{
							splitConfig = new SplitConfiger(option);
						}
					}

					// python界面
					function initPython($el, index) {
						var option = {
							$el: $el,
							type:'python',
							data:reqData.privateFields[index]
						}

						if(splitConfig){
							splitConfig.setData(option);
						}else{
							splitConfig = new SplitConfiger(option);
						}
					}

					// 正则表达式界面
					function initRegEx($el, index) {
						var option = {
							$el: $el,
							type:'regex',
							data:reqData.privateFields[index]
						}
						
						if(splitConfig){
							splitConfig.setData(option);
						}else{
							splitConfig = new SplitConfiger(option);
						}
					}

					$('#AFE',$el).on('click', '.confirmBtn', function(event) {
						event.preventDefault();
						var index = $(this).parent().parent().attr('data-index');
						var data = splitConfig.packgeData();//打包数据

						$.extend(reqData.privateFields[index], data);

						refreshStructKey(reqData.privateFields);
						$('#'+index,$('#structKeyList', $el)).find('.structConfig-expand').click();
					});

					function validatePrvModalData(){
						var validateResult = app.validate.validate({
							$context : $('#structKeyModal',$el),
							data:[{
								"id":"lineDescModal",
								"filter":{
									"require":true,
								}
							},{
								"id":"lineRegx",
								"filter":{
									"require":true,
								}
							},{
								"id":"dataRegx",
								"filter":{
									"require":true,
								}
							}]
						});
						return validateResult.bResult;
					}
					
					function validatePageData() {
						var validateResult = app.validate.validate({
							$context : $('#structConfig_form',$el),
							data:[{
								"id":"logName",
								"filter":{
									"require":true,
								}
							},{
								"id":"dirExample",
								"filter":{
									"require":true,
								}
							},{
								"id":"logEventRegex",
								"filter":{
									"require":true,
								}
							}]
						});
						return validateResult.bResult;
					}
				}
			},

			unload : function(handler) {
				splitConfig && splitConfig.dispose();
			},

			pause : function($el, scope, handler) {
			},

			resume : function($el, scope, handler) {
			}
		};
	});
