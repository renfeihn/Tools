define(["jquery"], function(){
		return {
			load : function($el, scope, handler) {
				
				
				let sourceType = scope.sourceType;
				let sourceName = scope.tr.sourceName;
				let $formEl = $("#step2form", $el);
				let privateFields = [];
				let sourceId = scope.sourceId;
				let sourceMap = {
					'Agent采集': '1',
					'TCP接入': '2',
					'HTTP接入': '2',
					'SNMP服务': '5',
					'UDP服务': '2',
					'JDBC接入': '3',
					'Kafka接入': '4',
					'Syslog接入': '2',
					'Trap接入': '5',
				}
				
				showOrHide();
				//根据分类显示
				function showOrHide(){
					if(sourceType == "Agent采集"){
						$('#addIp',$el).parents('.control-group').removeClass('hide');
					}else if(sourceType == "本地上传"){
						$("#fileInput",$el).parents('.control-group').removeClass('hide');
					}else if(sourceType == "UDP服务" || sourceType == "TCP接入" || sourceType == "HTTP接入"){
						$('#logAddr',$el).parents('.control-group').removeClass('hide');
						$('#sourceAddrList',$el).parents('.control-group').removeClass('hide');
						//隐藏接收级别
						$('.access-level',$el).addClass('hide');
					}else if(sourceType == "服务端上传"){
						$("#pathInput",$el).parents('.control-group').removeClass('hide');
					}else if(sourceType == "JDBC接入"){
						$('#addJDBC', $el).parents('.control-group').removeClass('hide');
						$('#moreConfig', $el).hide();
						CLEANABLE = false;
					}else if(sourceType == "Kafka接入"){
						$('#addKafka', $el).parents('.control-group').removeClass('hide');
						$('#moreConfig', $el).hide();
						CLEANABLE = false;
					}else if(sourceType == "Syslog接入") {
						//隐藏接收级别
						$('.access-level',$el).removeClass('hide');
					}else if(sourceType == "SNMP服务") {
						$('.oid-wrap',$el).removeClass('hide');
					}else if(sourceType == "Trap接入") {
						$('.oid-wrap',$el).addClass('hide');
					}
				}


				$formEl.on('change', 'input[name="version"]', function () {
					
					var val = $(this).val();
					if (val === 'V3') {
						$('.control-group[data-show="version"]', $el).show();
					} else {
						$('.control-group[data-show="version"]', $el).hide();
					}
				})
				
				
				getInfo()
				function getInfo() {
					app.common.ajaxWithAfa({
						url:"LogCfgSourceAction_getSourceNew.do",
						data: {
							sourceType,
							sourceId
						}
					}).done(function(data){
						let logSourceAndAgent = data.result.logSourceAndAgent;
						privateFields = data.result.privateFields;
						if (!logSourceAndAgent) {
							logSourceAndAgent = data.result;
						}
						init(logSourceAndAgent)
					})
				}
				
				function init (logSourceAndAgent) {
					$('div[data-type]', $formEl).addClass('hide');
					$('div[data-type="'+sourceMap[sourceType]+'"]', $formEl).removeClass('hide');
					
					loadApp(function () {
						initData(logSourceAndAgent);
						loadCategory(function (logSourceAndAgent) {
							var $ztree = $.fn.zTree.getZTreeObj("classZtree");
							var treeArr = $ztree.getNodesByParamFuzzy("name",scope.tr.category3,null);
							if(treeArr.length > 0){
								var categoryId = treeArr[0].categoryId
								$("#category", $formEl).attr('cateoryId', categoryId);
								getObjectsByAppAndCateAdd(logSourceAndAgent);
							}
						}, logSourceAndAgent);
					});
				}
				
				function getObjectsByAppAndCateAdd(logSourceAndAgent) {
					let appid = $("#app", $el).val();
					let cate = $('#category', $el).attr('cateoryId');
					if (appid && cate) {
						app.common.ajaxWithAfa({
							url:"LogCfgSourceAction_getObjectsByAppAndCate.do",
							data:{
								appid,
								cate
							}
						}).then(function (data) {
							var result = data.result;
							var html = '',html1 = '',htmlJDBC = '';
							result && result.forEach(function (item) {
								html += `<label class="radio inline">
										<input ${logSourceAndAgent.objectId.indexOf(item.obj_id) !== -1 ? 'checked':''}   type="radio" data-id="${item.obj_id}" data-ip="${item.obj_name}" value="${item.obj_name}" name="ip"><span style="font-size: 14px;">${item.obj_name}</span>
									</label>`;
								html1 += `<label class="radio inline">
									<input ${logSourceAndAgent.objectId.indexOf(item.obj_id) !== -1 ? 'checked':''}   type="checkbox" data-id="${item.obj_id}" data-ip="${item.obj_name}" value="${item.obj_name}" name="ips"><span style="font-size: 14px;">${item.obj_name}</span>
								</label>`;
								htmlJDBC += `<span>
										<label class="radio inline">
											<input ${logSourceAndAgent.objectId.indexOf(item.obj_id) !== -1 ? 'checked':''}   type="radio" style="margin: 5px 0 0 0;" data-id="${item.obj_id}" data-ip="${item.obj_name}" value="${item.obj_name}" name="ip"><span style="font-size: 14px;">${item.obj_name}</span>
											<i style="font-style: normal;font-size: 14px;font-weight: 800;">:</i><input type="text" data-role="port" style="width: 60px;margin-left: 5px;">
										</label>
									</span>`;
							})
							$('#ipConfigList', $el).html(html1);
							$("#ipsList", $el).html(html1);
							$("#ipsListType5", $el).html(html1);
							$('#ipConfigList_kafka', $el).html(html);
							$('#ipConfigList_jdbc', $el).html(htmlJDBC);
						})
					}
				}
				
				function initData(logSourceAndAgent) {
					var tr = scope.tr;
					$("#logName", $formEl).val(tr.sourceName);
					$("#app", $formEl).val(tr.appId);
					$("#category", $formEl).val(`${tr.category1}>${tr.category2}>${tr.category3}`)
					$("#logCoding", $formEl).val(logSourceAndAgent && logSourceAndAgent.logcoding)
					$("#logdir", $formEl).val(logSourceAndAgent.logDirRegex);
					$("#format", $formEl).val(logSourceAndAgent.fileName);
					if (logSourceAndAgent.skipToEnd == '1') {
						$("#skipTo", $formEl).addClass('true')
					} else {
						$("#skipTo", $formEl).removeClass('true')
					}
					$('input[name="deep"]', $formEl).val(logSourceAndAgent.depth);
					$("#fileType", $formEl).val(logSourceAndAgent.fileType);
					$("#fileSize", $formEl).val(logSourceAndAgent.fileSize);
					$("#flushLastSecd", $formEl).val(logSourceAndAgent.flushLastSecd);
					$("#filterFileHours", $formEl).val(logSourceAndAgent.filterFileHours);
					
					if (logSourceAndAgent.isImportant === '是') {
						$("#isImportant", $formEl).addClass('true')
					} else {
						$("#isImportant", $formEl).removeClass('true')
					}
					$('input[value="'+logSourceAndAgent.version+'"]', $formEl).attr('checked', 'checked');
					$('input[value="'+logSourceAndAgent.version+'"]', $formEl).trigger('change');
					$('input[name="community"]', $formEl).val(logSourceAndAgent.community);
					$("#authUser", $formEl).val(logSourceAndAgent.authUser)
					$("#authPasswd", $formEl).val(logSourceAndAgent.authPasswd)
					$("#authProto", $formEl).val(logSourceAndAgent.authProto)
					$("#decProto", $formEl).val(logSourceAndAgent.decProto)
					$("#decKey", $formEl).val(logSourceAndAgent.decKey)
					
					for(let i in logSourceAndAgent){
						if(i == 'orderType'){
							$('div[data-type="'+sourceMap[sourceType]+'"]  [data-role="'+i+'"][value="'+logSourceAndAgent[i]+'"]', $formEl).prop('checked',true);
							continue;
						}
						$('div[data-type="'+sourceMap[sourceType]+'"]  [data-role="'+i+'"]', $formEl).val(logSourceAndAgent[i]);
					}

					if (logSourceAndAgent.levels) {
						for(var i = logSourceAndAgent.levels.length - 1 ; i >= 0  ; i -- ) {
							if (parseInt(logSourceAndAgent.levels[i]) === 1) {
								$("#levels>div:eq("+(logSourceAndAgent.levels.length - 1 - i)+")", $el).addClass('active');
							}
						}
					}

					if(logSourceAndAgent.keyList){
						$('.oid-wrap>.oid-item',$el).remove();
						
						logSourceAndAgent.keyList.forEach((item,index) => {
							let html = `<div class="oid-item">
										<div class="control-group">
											<label class="control-label required">OID描述</label>
											<div class="controls">
												<input type="text" data-role="oid-desc"/>
											</div>
										</div>
										<div class="control-group">
											<label class="control-label required">OID值</label>
											<div class="controls">
												<input type="text" data-role="oid-val"/>
											</div>
										</div>
										<i class="fa fa-trash"></i>
									</div>`;
							$('.oid-wrap>.add-item',$el).before(html);
							let $wrap = $('.oid-wrap>.oid-item:eq('+index+')',$el);
							$wrap.find('[data-role="oid-desc"]').val(item.description);
							$wrap.find('[data-role="oid-val"]').val(item.keyName);
						});
					}

				}
				
				
				
				
				$("#step2form", $el).on('click','#levels div.controls-level-item', function (e) {
					if (!$(this).hasClass('active')) {
						$(this).nextAll().addClass('active');
					}
					$(this).toggleClass('active');
				})
				
				
				// 加载三级分类
				function loadCategory(callback, logSourceAndAgent){
					app.common.ajaxWithAfa({
						url:"EventListAction_getObjectCategory.do"
					}).done(function(data){
						data = data.objectCate;
						var resultSet = convertListToTree(data);
						var settings = {
							view : {
								showLine : false,
							}					
						};
						var $ztree = $.fn.zTree.init($("#classZtree",$el), settings, resultSet);
						callback && callback(logSourceAndAgent);
					})
				}
				
				
				
				function loadIpbyObjectId(id) {
					return app.common.ajaxWithAfa({
						url:"CmdbConfigManagerAction_queryAllCmdbObject.do",
						data:{
							conf_id: id
						}
					}).then(function (data) {
			          return $.Deferred().resolve(data);
			        })
				}
				
				//加载应用系统
				function loadApp(callback){
					app.common.ajaxWithAfa({
						url:"AppConfigAction_getFirstCategoryObjects.do",
						data:{
							levelOneName: '应用群组'
						}
					}).done(function (data) {
						var appList = data.cate1Objects,
							html=''; //必选,不能给空选项
						appList.forEach(function(item, index){
							var tmp = item.objectSummary;
							html += '<option value="'+tmp.objectId+'">'+tmp.objectName+'</option>';
							})
						$('#app',$el).html(html);
						callback && callback();
					});
				}
				
				$el.on('click', '#dirBtn', function(){
					var ip = $('#ipConfigList [name="ip"]', $el).attr("data-ip");
					if(!ip){
						app.alert('请选择IP对象');
					}else{
						var dir = '';
						loadAgentDirByIp(ip, dir).then(function (data) {
							if(data.result && !$.isEmptyObject(data.result)){
								if(data.result.flag == 'false'){
									app.alert(data.result.msg);
								}else{
									var html = '<ul class="ALIR-dirList" data-id="1" style="left: 395px;top: 400px;">';
									for (var item in data.result) {
										var icon = '';
										if(data.result[item] == 'd'){
											icon = '<i class="fa fa-caret-square-o-right fa-fw"></i>';
										}
										html += '<li data-type="'+data.result[item]+'"><span title="'+item+'">'+icon+item+'</span></li>';
									}
									html += '</ul>';
									$('#logdir', $el).nextAll('.ALIR-dirList').remove();
									$('#logdir', $el).after(html);
								}
							}
						})
					}
				}).on('click', '.ALIR-dirList li', function(event) {
					var $ulObj = $('.ALIR-dirList', $el);
					var inputObj = $('#logdir', $el);
					var ip = $('#ipConfigList [name="ip"]', $el).attr("data-ip");
					if($(this).hasClass('active')){
						var $obj = $(this);
						$obj.find('i.fa').toggleClass('fa-caret-square-o-right fa-caret-square-o-down');
						$(this).removeClass('active').next('ul').hide();
						$(this).next('ul').find('.active').click();
						var dir = getDir($obj);
						inputObj.val(dir);
					}else{
						var $obj = $(this);
						$obj.parent().find('li.active').click();
						$obj.addClass('active').find('i.fa').toggleClass('fa-caret-square-o-right fa-caret-square-o-down');
						var dir = getDir($obj);
						inputObj.val(dir);
						if($(this).next('ul').length == 0 && $obj.attr('data-type') == 'd'){
							loadAgentDirByIp(ip,dir).then(function (data) {
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
					event.stopPropagation();
				})
				
				function loadAgentDirByIp(ip, dir) {
					return app.common.ajaxWithAfa({
						url:"AgentManageAction_getAgentDir.do",
						data:{
							agentIp: ip,
							dir: dir
						}
					}).then(function (data) {
						return $.Deferred().resolve(data);
					})
				}
				
				
				//获取页面数据
				function getData(){
					var obj = {};
					var logId = scope.tr.logId;// 日志规则ID
					var logname = scope.tr.logName;// 日志规则名称
					if(!logId){
						app.alert('请选择解析规则');
						return false;
					}
					obj.logId = logId;// 日志规则ID
					obj.logname = logname;// 日志规则ID
					obj.sourceType = sourceType;// 日志源分类
					obj.sourceId = sourceId;// 日志源id
					obj.sourceName = sourceName;// 日志源名
					obj.appName =  scope.tr.appName;// 应用名称
					obj.appId =  scope.tr.appId;// 应用ID

					// 三级分类
					obj.cateoryId = $('#category',$el).attr('cateoryId');
					var category = $('#category',$el).val().split('>');
					obj.category1 = category[0] || undefined;
					obj.category2 = category[1] || undefined;
					obj.category3 = category[2] || undefined;

					if(sourceType == "Agent采集"){
						var hostIp = [],
							logDirRegex = [],
							formatArr = [],
							skipToEnd = [],
							depth = [],
							objectId = [],
							fileType = [],
							flushLastSecd = [],
							isImportant = [],
							fileSize = [],
							filterFileHours = [];
						
						objectId = Array.from($('#ipConfigList [name="ips"]:checked', $el)).map(item => $(item).attr('data-id'));
						hostIp = Array.from($('#ipConfigList [name="ips"]:checked', $el)).map(item => $(item).attr('data-ip'));
						logDirRegex.push($('#logdir', $el).val());
						formatArr.push($('#format', $el).val());
						skipToEnd.push($('#skipTo', $el).hasClass('true')?1:0);
						depth.push($('[name="deep"]:checked', $el).val());
						fileType.push($('#fileType', $el).val());
						fileSize.push($('input[name="fileSize"]', $el).val());
						
						isImportant.push($('#isImportant', $el).hasClass('true')?'是':'否');
						flushLastSecd.push($('[name="flushLastSecd"]', $el).val());
						filterFileHours.push($('[name="filterFileHours"]', $el).val());
						obj.objectId = objectId.join(',');//对象ID
						obj.hostIp = hostIp.join(',');//主机地址
						obj.logDirRegex = logDirRegex.join('###')//日志文件目录
						obj.fileName = formatArr.join('###')//日志文件匹配格式
						obj.skipToEnd = skipToEnd.join(',');
						obj.depth = depth.join(',');
						obj.fileType = fileType.join(',');
						obj.flushLastSecd = flushLastSecd.join(',');
						obj.filterFileHours = filterFileHours.join(',');
						obj.fileSize = fileSize.join(',');
						obj.isImportant = isImportant.join(',');
						obj.logcoding = $('#logCoding',$el).val();
					}else if(sourceType == "本地上传"){
						var fileInput = $('#fileInput', $el).val();
						if(fileInput = '*.*'){
							return obj;
						}
						var inputVal = $('#file', $el).val();
						var val = inputVal.split('\\')[inputVal.split('\\').length-1];
						obj.fileName = val;//文件名
						// 调用解析服务
						$.ajaxFileUpload({
							url:"LogCfgSourceAction_uploadFile.do",//处理文件脚本
							secureuri :false,
							fileElementId :'file',//file控件id
							dataType : 'json',
							timeout: 600000,
							async : false, 
							data:{
								fileName:val,
							},
							success:function(data){
								if (!data.status) {
									app.alert("文件解析失败，请联系管理员！");
									return;
								}else{
									if(data.content.result == 'OK'){
										if((operType == "修改")){
											submit(obj);
										}else if(operType == "继续上传"){
											app.alert('文件上传成功');
											$('#logInfoSlider .close',$parentPageContext).click();
										}
									}else{
										app.alert("文件解析失败，请联系管理员！");
									}
								}
							},
							error : function(request, status, err){
								if (status == "timeout"){
									app.alert("请求超时，请稍后再试！");
				                }
							}
						});
					}else if(sourceType == "UDP服务" || sourceType == "TCP服务" || sourceType == "HTTP服务"){
							obj.serviceInId = $('#logAddr',$el).val();//日志接入地址
							if($('#sourceAddrList>span',$el).length == 1){
								app.alert('请先添加源地址白名单');
								return false;
							}
							var sourceAddr = [];
							$('#sourceAddrList>span',$el).each(function(index,item){
								if($(item).attr('data-val')){
									sourceAddr.push($(item).attr('data-val'));
								}
							});
							obj.serviceAddress = sourceAddr.join(',');//源地址白名单
							
					}else if(sourceType == "服务端上传"){
						var type = $("#pathInput",$el).attr('data-chooseType');
						var pathVal = $("#pathInput",$el).val();
						if(type == 'f'){
							var pathValArr = pathVal.split('/');
							var typeVal =pathValArr.splice(pathValArr.length-1,1)[0];
							pathVal = pathValArr.join('/');
							obj.fileName = typeVal;//文件名
						}else if(type == 'd'){
							obj.fileName = '.*';//目录
						}
						obj.location = pathVal;
					}else if(sourceType == "JDBC接入"){
						var jdbcObj={
							jdbcType:[],
							host: [],
							objectId: [],
							userName:[],
							passwd:[],
							dbName:[],
							tableName:[],
							orderKey:[],
							orderType:[],
							batchSize:[]
						}
						var keyNames = ['jdbcType', 'userName', 'passwd', 'dbName', 'tableName', 'orderKey', 'orderType', 'batchSize'];
						keyNames.forEach(item => {
							let val = $('div[data-type="3"]',$el).find('[data-role="'+item+'"]').val();
							jdbcObj[item].push(val);
						});
						
						jdbcObj['objectId'] = Array.from($('#ipConfigList_jdbc [name="ip"]:checked', $el)).map(item => $(item).attr('data-id'));
						jdbcObj['host'] = Array.from($('#ipConfigList_jdbc [name="ip"]:checked', $el)).map(item => {
							let ip = $(item).attr('data-ip');
							let port = $(item).parent().find('[data-role="port"]').val();
							return ip+':'+port;
						});
						for (var item in jdbcObj) {
							obj[item] = jdbcObj[item].join(',');
						}
						obj['objectId'] = jdbcObj['objectId'].join(',');
					}else if(sourceType == "Kafka接入"){
						var jdbcObj={
							groupId:[],
							topic:[],
							batchSize:[],
							host: [],
							objectId: []
						}
						var keyNames = ['groupId', 'topic', 'batchSize'];
						keyNames.forEach(item => {
							let val = $('div[data-type="4"]',$el).find('[data-role="'+item+'"]').val();
							jdbcObj[item].push(val);
						});
						jdbcObj['objectId'] = Array.from($('#ipConfigList_kafka [name="ip"]:checked', $el)).map(item => $(item).attr('data-id'));
						jdbcObj['host'] = Array.from($('#ipConfigList_kafka [name="ip"]:checked', $el)).map(item => $(item).attr('data-ip'));
						for (var item in jdbcObj) {
							obj[item] = jdbcObj[item].join(',');
						}
					}else if(sourceType == "Syslog接入"){
						let objectIds = [];
						let ips = [];
						$('#ipsList input:checked',$el).each(function(index,item){
							ips.push($(item).attr('data-ip'));
							objectIds.push($(item).attr('data-id'));
						});
						obj.objectId = 	objectIds.join(',');			
						obj.ips = ips.join(',');
						obj['levels'] = [];
						$.each($("#levels>.controls-level-item", $el), function () {
							obj['levels'].unshift($(this).hasClass('active') ? '1' : '0');
						})
						obj['levels'] = obj['levels'].join('');
					}else if(sourceType == "Trap接入"  || sourceType == "SNMP服务"){
						let ips = [];
						let objectIds = [];
						$.each($('#ipsListType5 input[name="ips"]:checked'), function () {
							ips.push($(this).val());
							objectIds.push($(this).attr('data-id'));
						})
						obj['ips'] = ips.join(',');
						obj['objectId'] = objectIds.join(',');
						obj['version'] = $('input[name="version"]:checked', $el).val();
						obj['community'] = $('input[name="community"]', $el).val();
						obj['authUser'] = $('#authUser', $el).val();
						obj['authPasswd'] = $('#authPasswd', $el).val();
						obj['authProto'] = $('#authProto', $el).val();
						obj['decProto'] = $('#decProto', $el).val();
						obj['decKey'] = $('#decKey', $el).val();
						if(sourceType == "SNMP服务"){
							let keyList = [];
							$('.oid-item',$el).each((index,item) => {
								keyList.push({
									description: $('[data-role="oid-desc"]',$(item)).val(),
									keyName: $('[data-role="oid-val"]',$(item)).val()
								});
							});
							obj['keyStringList'] = keyList;
						}
					}
					return obj;
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
				
				
				$("#saveBtn", $el).on('click', function () {
					var data = getData();
					var request = {
						sourceType: sourceType,
						source: JSON.stringify(data),
						privateFields: JSON.stringify(privateFields)
					}
					saveData(request);
				})
				
				function saveData(data) {
					app.common.ajaxWithAfa({
						url:'LogCfgSourceAction_updateLogCfgSourceNew.do',
						data: data
					}).done(function (data) {
						if (data.result) {
							app.alert('保存成功');
							scope.closeEdit()
						}
					})
				}

				//新增OID
			$('#step2form',$el).on('click','.add-item',function(){
				let html = `<div class="oid-item">
								<div class="control-group">
									<label class="control-label required">OID描述</label>
									<div class="controls">
										<input type="text" data-role="oid-desc"/>
									</div>
								</div>
								<div class="control-group">
									<label class="control-label required">OID值</label>
									<div class="controls">
										<input type="text" data-role="oid-val"/>
									</div>
								</div>
								<i class="fa fa-trash"></i>
							</div>`;
				$(this).before(html);
			});
			//删除OID
			$('#step2form',$el).on('click','.oid-item>.fa-trash',function(){
				$(this).parent().remove();
			});

			$("#step2form", $el).on('click','.boolean-switch',function(e){
				e.stopPropagation();
				$(this).toggleClass('true');
			});
				
			},

			unload : function(handler) {
			},

			pause : function($el, scope, handler) {
			},

			resume : function($el, scope, handler) {
			}
		};
	});
