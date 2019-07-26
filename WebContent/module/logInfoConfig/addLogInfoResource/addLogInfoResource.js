define(["jquery"], function(){
		return {
			load : function($el, scope, handler) {
				var sourceType = scope.sourceType;
				var sourceId = scope.sourceId;
				var operType = scope.operType;//标识新增 修改 继续上传
				var $parentPageContext = scope.parentPageContext;
				var isRuleChange = true;//解析规则改变
				var CLEANABLE = true;
				// 树配置
				var settings = {
					view : {
						showLine : false,
					},					
					callback : {
						onClick:clickList
					}
				}
				AppSystemString='',//应用系统
				AppReleConfig={
					keyListString:''
				};//应用关系配置信息

				// 预警配置
				var WarningConfig={
					WarningLevel:'<option value="0">预警</option><option value="1">告警</option>'
				},
				ipConfigListHtml;
				
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
					var category3 = category[category.length - 1];
					var analyType = $('#analyClass option[typeName="'+category3+'"]', $el).attr('value');
					$('#analyClass', $el).val(analyType).trigger('change');
					$('#category', $el).val(category.join('>'));
					var cateoryId = treeNode.categoryId;
					$('#category', $el).attr('cateoryId', cateoryId);
					loadIpbyObjectId(cateoryId).then(function (data) {
						var html= '';
						if(data.funs && data.funs.object_list && data.funs.object_list.length > 0){
							html = '<ul tabindex="0" class="ALIR-ipList">';
							var list = data.funs.object_list;
							list.forEach(function (item) {
								html += '<li data-id="'+item.object_id+'" data-ip="'+item.service_ip+'">'+item.service_ip+'</li>';
							})
							html += '</ul>';
						}
						ipConfigListHtml = html;
					})
				}

				$el.click(function(e){
					if($(e.target).closest($('#category', $el).parent()).length == 0){
						$('#categoryContent', $el).slideUp();
					}

					if($(e.target).closest($('.ALIR-ipWapper', $el)).length == 0){
						$('.ALIR-ipList',$el).hide();
					}

					if($(e.target).closest($('.ALIR-dirWapper', $el)).length == 0){
						$('.ALIR-dirList',$el).hide();
					}
				});

				showOrHide();
				//根据分类显示
				function showOrHide(){
					if(sourceType == "Agent采集"){
						$('#addIp',$el).parents('.control-group').removeClass('hide');
					}else if(sourceType == "本地上传"){
						$("#fileInput",$el).parents('.control-group').removeClass('hide');
					}else if(sourceType == "UDP服务" || sourceType == "TCP服务" || sourceType == "HTTP服务" || sourceType == "SNMP服务"){
						$('#logAddr',$el).parents('.control-group').removeClass('hide');
						$('#sourceAddrList',$el).parents('.control-group').removeClass('hide');
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
					}
				}
				if(operType=="修改" || operType=="继续上传"){//修改/继续上传 前查询
					$('.addLogInfoResource-public', $el).next('button').hide();
					app.common.ajaxWithAfa({
						url:"LogCfgSourceAction_getSource.do",
						data:{
							sourceType: sourceType,
							sourceId: sourceId
						}
					}).done(function (data) {
						var result = data.result,html='';
						if($.isEmptyObject(result)){
							return;
						}
						$('#logName',$el).val(result.sourceName).attr('disabled','disabled');//日志配置名称
						loadApp(function(){
							$('#app',$el).val(result.appId).attr('disabled','disabled');//所属应用系统
						});
						var category = '';
						if(result.category1){
							category += result.category1;
						}
						if(result.category2){
							category += '>'+result.category2;
						}
						if(result.category3){
							category += '>'+result.category3;
						}
						$('#category', $el).val(category).attr('disabled', 'diaabled');//日志对象资产分类
						$('#category', $el).attr('cateoryId', result.cateoryId);
						loadIpbyObjectId(result.cateoryId).then(function (data) {
							var html= '';
							if(data.funs && data.funs.object_list && data.funs.object_list.length > 0){
								html = '<ul tabindex="0" class="ALIR-ipList">';
								var list = data.funs.object_list;
								list.forEach(function (item) {
									html += '<li data-id="'+item.object_id+'" data-ip="'+item.service_ip+'">'+item.service_ip+'</li>';
								})
								html += '</ul>';
							}
							ipConfigListHtml = html;
						})
						loadClass(function(){
							$('#analyClass',$el).val(result.logTypeId).attr('disabled','disabled');//解析规则分类
						});
						getRule(result.logTypeId,function(){//解析规则
							$('#analyRule',$el).find('span').get().forEach(function(item,index){
								if($(item).attr('data-id')==result.logId){
									$(item).addClass('active');
								}
							});
							//$('#analyRule>span',$el).attr('disabled','disabled');
						});
						
						if(sourceType == "Agent采集"){
							result.hostIp.split(',').forEach(function(item,index){//来源主机ip
								var toEnd = 1;
								if(result.skipToEnd){
									toEnd = result.skipToEnd.split(',')[index];
								}
								var depth = 0;
								if(result.depth){
									depth = result.depth.split(',')[index];
								}
								var fileType = "TEXT";
								if(result.fileType){
								    fileType = result.fileType.split(',')[index];
								}
								var flushLastSecd = "-1";
								if(result.flushLastSecd){
								    flushLastSecd = result.flushLastSecd.split(',')[index];
								}
								var filterFileHours = "24";
								if(result.filterFileHours){
								    filterFileHours = result.filterFileHours.split(',')[index];
								}
								var fileSize = result.fileSize || 256;
								var isImportant = result.isImportant || '是';
								
								// html+='<li><span>'+result.hostIp.split(',')[index]+'</span><span>'+result.logDirRegex.split('###')[index]+'</span><span>'+result.fileName.split('###')[index]+'</span><span data="'+toEnd+'">'+(toEnd == '0'?'是':'否')+'</span><span>'+depth+'</span><span><button type="button" class="modifyIp fa fa-edit" title="修改"></button><button type="button" class="removeIp fa fa-trash-o" title="删除"></button></span></li>';
								html+='<li>\
										<span data-id="'+result.objectId.split(',')[index]+'">'+result.hostIp.split(',')[index]+'</span>\
										<span>'+result.logDirRegex.split('###')[index]+'</span>\
										<span>'+result.fileName.split('###')[index]+'</span>\
										<span data="'+toEnd+'">'+(toEnd == '0'?'是':'否')+'</span>\
										<span>'+depth+'</span>\
										<span data="'+fileType+'">'+fileType+'</span>\
										<span>'+ (isImportant || '是') +'</span>\
										<span>'+ (fileSize || 256) +'</span>\
										<span>'+flushLastSecd+'</span>\
										<span>'+filterFileHours+'</span>\
										<span><button type="button" class="modifyIp fa fa-edit" title="修改"></button></span>\
									</li>';
							});
							$('#ipContent',$el).empty().html(html);
						}else if(sourceType == "本地上传"){
							if(operType=="继续上传"){
								$('#fileInput',$el).val('');
							}else if(operType=="修改"){
								$('#fileInput',$el).val('*.*');
							}
						}else if(sourceType == "UDP服务" || sourceType == "TCP服务" || sourceType == "HTTP服务" || sourceType == "SNMP服务"){
							loadLogAddr(function(){
								$('#logAddr',$el).val(result.serviceInId);//日志接入地址
							});
							var html = result.serviceAddress.split(',').map(function(item,index){
								return '<span data-val="'+item+'">'+item+'<i class="deleteSource">&times;</i></span>';
							}).join('');
							$('#sourceAddrList',$el).empty().append(html+'<span id="addSource">+</span>');//源地址白名单
						}else if(sourceType == "服务端上传"){
							$("#pathInput",$el).val(result.location+'/'+result.fileName);
							$("#pathInput",$el).attr('data-chooseType','f');
						}else if(sourceType == "JDBC接入"){
							if(result.host){
								result.host.split(',').forEach(function(item,index){//来源主机ip
									html+='<li>'+
									'<span>'+result.jdbcType.split(',')[index]+'</span>'+
									'<span>'+result.host.split(',')[index]+'</span>'+
									'<span>'+result.userName.split(',')[index]+'</span>'+
									'<span>'+result.passwd.split(',')[index]+'</span>'+
									'<span>'+result.dbName.split(',')[index]+'</span>'+
									'<span>'+result.tableName.split(',')[index]+'</span>'+
									'<span>'+result.orderKey.split(',')[index]+'</span>'+
									'<span>'+result.orderType.split(',')[index]+'</span>'+
									'<span>'+result.batchSize.split(',')[index]+'</span>'+
									'<span><button type="button" class="modifyJDBC fa fa-edit" title="修改"></button>'+
									'</span></li>';
									// '<button type="button" class="removeJDBC fa fa-trash-o" title="删除"></button></span></li>';
								});
								$('#JDBCContent',$el).empty().html(html);
							}
						}else if(sourceType == "Kafka接入"){
							if(result.host){
								result.host.split(';').forEach(function(item,index){//来源主机ip
									html+='<li>'+
									'<span>'+result.host.split(';')[index]+'</span>'+
									'<span>'+result.groupId.split(';')[index]+'</span>'+
									'<span>'+result.topic.split(';')[index]+'</span>'+
									'<span>'+result.batchSize.split(';')[index]+'</span>'+
									'<span><button type="button" class="modifyJDBC fa fa-edit" title="修改"></button>'+
									'</span></li>';
									// '<button type="button" class="removeJDBC fa fa-trash-o" title="删除"></button></span></li>';
								});
								$('#kafkaContent',$el).empty().html(html);
							}
						}

						initAppReleConfigList(result);
						initDesensitizationList(result);
						initKeyWord(result);
						// initWarningList(result);
					});
				}else if(operType == "新增"){
					loadApp();
					loadClass();
					loadCategory();
					$('#addIp',$el).click();
					if(sourceType == "Agent采集"){
					}else if(sourceType == "本地上传"){
					}else if(sourceType == "UDP服务" || sourceType == "TCP服务" || sourceType == "HTTP服务" || sourceType == "SNMP服务"){
						loadLogAddr();//日志接入地址
					}else if(sourceType == "服务端上传"){
					}
				}
				//加载解析规则分类
				function loadClass(callback){
					app.common.ajaxWithAfa({
						url:"LogCfgAction_getCfgLogStatistics.do",
					}).done(function (data) {
						var logTypes = data.result.logTypes,html='';
						logTypes.forEach(function(item, index){
							html += '<option value="'+item.typeId+'" typeName="'+item.typeName+'">'+item.typeName+'</option>';
						});
						$('#analyClass',$el).html(html);
						if(callback){
							callback();
						}else{
							$('#analyClass',$el).change();
						}
					});
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
							// html='<option></option>';
							html=''; //必选,不能给空选项
						appList.forEach(function(item, index){
							var tmp = item.objectSummary;
							html += '<option value="'+tmp.objectId+'">'+tmp.objectName+'</option>';
							})
						$('#app',$el).html(html);
						callback && callback();
					});
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

				//日志接入地址
				function loadLogAddr(callback){
					app.common.ajaxWithAfa({
						url:"LogCfgSourceAction_getServices.do",
						data:{
							'sourceType':sourceType
						}
					}).done(function (data) {
						var result = data.result,html='';
						result.forEach(function(item, index){
							html += '<option value="'+item.id+'">'+item.address+'</option>';
						})
						$('#logAddr',$el).html(html);
						callback && callback();
					});
				}

				/**
				 * 获取关键字列表
				 * @param  {} logId 解析规则id
				 * @return {[type]}       [description]
				 */
				function getKeyList(logId) {
					app.common.ajaxWithAfa({
						url:'LogCfgAction_getCfgLogFields.do',
						data:{
							logId: logId
						}
					}).done(function (data) {
						if(data.result && data.result.public && data.result.public.length>0){
							var tmpStr = '<ul tabindex="0" class="keyFieldList">';
							data.result.public.forEach(function (item) {
								tmpStr += '<li>'+item+'</li>';
							})
							tmpStr += '</ul>';
							AppReleConfig.keyListString = tmpStr;
						}
					});
				}
				/**
				 * 初始化应用间关联配置
				 * @return {[type]} [description]
				 */
				function initAppReleConfigList(data) {
					var htmStr = '';
					var relappids = data.relappids,
						relappnames = data.relappnames,
						relsourceids = data.relsourceids,
						relsourcenames = data.relsourcenames,
						relways = data.relways,
						relfields = data.relfields;

					if(relappids && relappids.length > 0){
						for (var i = 0; i < relappids.length; i++) {
							htmStr += '<li>\
									<span data-id="'+relappids[i]+'">'+relappnames[i]+'</span>\
									<span data-id="'+relsourceids[i]+'">'+relsourcenames[i]+'</span>\
									<span data-id='+relways[i]+'>'+(relways[i] == '0'?'全局流水':'自定义')+'</span>\
									<span>'+relfields[i]+'</span>\
									<span class="remove">&times;</span></li>';
						}
					}
					
					$('#appReleConfigList',$el).html(htmStr);
				}

				/**
				 * 初始化预警配置
				 * @return {[type]} [description]
				 */
				function initWarningList(data) {
					var htmStr = '';
					var eventkeywords = data.eventkeywords,
						eventlevels = data.eventlevels;

					if(eventkeywords && eventkeywords.length > 0){
						for (var i = 0; i < eventkeywords.length; i++) {
							htmStr += '<li>\
									<span>'+eventkeywords[i]+'</span>\
									<span>'+eventlevels[i]+'</span>\
									<span class="remove">&times;</span></li>';
						}
					}
					
					$('#warningList',$el).html(htmStr);
				}

				/**
				 * 初始化关键字定义
				 * @param  {[type]} data [description]
				 * @return {[type]}      [description]
				 */
				function initKeyWord(data) {
					var htmStr = '';
					var relation = data.relation;

					if(relation && !$.isEmptyObject(relation)){
						for (var item in relation) {
							if (relation.hasOwnProperty(item)) {
								htmStr += '<li>\
										<span>'+item+'</span>\
										<span>'+relation[item]+'</span>\
										<span><button class="modifyApp fa fa-edit" title="编辑"></button><button class="appCancel fa fa-trash-o" title="删除"></button></span></li>';
							}
						}
					}
					
					$('#appReleConfigList',$el).html(htmStr);
				}
				/**
				 * 初始化脱敏规则配置
				 * @return {[type]} [description]
				 */
				function initDesensitizationList(data) {
					var htmStr = '';
					var unSensitivity = data.unSensitivity;
					
					if(unSensitivity && !$.isEmptyObject(unSensitivity)){
						for (var i in unSensitivity) {
							htmStr += '<li>\
									<span>'+i+'</span>\
									<span title="'+unSensitivity[i]+'">'+unSensitivity[i]+'</span>\
									<span class="remove"><button class="modifyApp fa fa-edit" title="编辑"></button><button class="appCancel fa fa-trash-o" title="删除"></button></span></li>';
						}
					}
					
					$('#desensitizationList',$el).html(htmStr);
				}

				// 三级分类选择
				$('#category', $el).on('click', function(event) {
					event.preventDefault();
					if($(this).attr('disabled') == 'disabled'){
						return;
					}
					$(this).next().slideDown('400');
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

				//解析规则标志
				$('#analyFlag',$el).click(function(){
					if(!$(this).hasClass('true')){
						$('#analyClass,#analyRule',$el).parents('div.control-group').show();
					}else{
						$('#analyClass,#analyRule',$el).parents('div.control-group').hide();
					}
				});

				//切换解析规则分类
				$('#analyClass',$el).change(function(){
					var val = $(this).val();
					getRule(val);
				});
				
				//根据分类id查询解析规则
				function getRule(val,callback){
					app.common.ajaxWithAfa({
						url:"LogCfgAction_getCfgLogInfoByTypeId.do",
						data:{
							typeId:val
						}
					}).done(function (data) {
						var result = data.result,html="";
						result.forEach(function(item, index){
							html += '<span data-id="'+item.logId+'" title="'+item.logName+'">'+item.logName+'</span>';
						});
						$('#analyRule',$el).html(html);
						callback && callback();
					});
				}
				
				//选择解析规则
				$('#analyRule',$el).on('click','span',function(){
					if($(this).attr('disabled')=='disabled'){
						return;
					}
					if($(this).hasClass('active')){
						$(this).removeClass('active');
					}else {
						$(this).addClass('active').siblings().removeClass('active');
					}
					isRuleChange = true;
				});
				$('#analyRule',$el).on('dblclick','span',function(){
				    var analyType = $('#analyClass', $el).val();
				    var logId = $(this).attr('data-id');
		            app.dispatcher.load({
		                "title": "解析规则 - "+$(this).text(),
		                "moduleId": 'logInfoConfigManage',
		                "section": '',
		                "id": 'logInfoConfigManage-'+logId,
		                "params": {
		                    analyType: analyType,
		                    logId: logId
		                }
		            });
		        });
				
				//点击添加ip行
				$('#addIp',$el).click(function(){
					if($('#ipContent',$el).find('input').length){
						app.alert('请先保存');
						return;
					}
					$('#ipContent',$el).append(`
					<li>
						<span class="ALIR-ipWapper"><input class="ALIR-ip" type="text" placeholder="选择对象" readonly/></span>
						<span class="ALIR-dirWapper"><input class="ALIR-dir" type="text" placeholder="输入日志路径" style="padding-right: 50px;"/><button class="ALIR-dirBtn">浏览</button></span>
						<span><input type="text" placeholder="输入文件匹配格式"/></span>
						<span><select name="" id=""><option value="0">是</option><option value="1">否</option></select></span>
						<span><input type="number" min="0" class="deep" placeholder="0表示不限制，1表示当前路径"/></span>
						<span><select name="fileType" id="fileType"><option value="TEXT">TEXT</option><option value="BIN">BIN</option></select></span>
						<span><select name="" class="isImportant" id=""><option value="是">是</option><option value="否">否</option></select></span>
						<span><input type="number" min="0" class="fileSize" placeholder="单位(个)" value="256"/></span>
						<span><input type="number" min="-1" class="flushLastSecd" placeholder="单位(秒)" value="-1"/></span>
						<span><input type="number" min="-1" class="filterFileHours" value="24"/></span>
						<span>
							<button type="button" class="saveIp fa fa-save" title="保存"></button>
							<button type="button" class="removeIp fa fa-reply" title="取消"></button>
						</span>
					</li>`);
				});
				
				//点击保存ip行
				$('#ipContent',$el).on('click','.saveIp',function(){
					var tr = $(this).parents('li');
					var ip = $.trim($(tr.find('input')[0]).val());
					var objectId = $.trim($(tr.find('input')[0]).attr('data-id'));
					var addr = $.trim($(tr.find('input')[1]).val());
					var format = $.trim($(tr.find('input')[2]).val());
					var skipToEnd = $.trim($(tr.find('select')[0]).val());
					var deep = parseInt($.trim($(tr.find('input')[3]).val())||0);
					var fileType = $.trim($(tr.find('select')[1]).val());
					var isImportant = $.trim($(tr.find('select')[2]).val() || '是');
					var fileSize = parseInt($.trim($(tr.find('input')[4]).val())||256);
					var flushLastSecd = parseInt($.trim($(tr.find('input')[5]).val())||-1);
					var filterFileHours = parseInt($.trim($(tr.find('input')[6]).val())||24);

					if(ip=='' || addr=='' || format==''|| deep === '' ){
						app.alert('请填写完整信息后保存');
						return;
					}
					if(filterFileHours < -1){
						app.alert('过期时间必须大于等于-1');
						return;
					}
					var flag = false;//当前信息是否已存在标识
					$('#ipContent',$el).find('li').get().forEach(function(item,index){
						var ipOld = $.trim($(item).find('span:eq(0)').text());
						var logDir = $.trim($(item).find('span:eq(1)').text());
						var formatOld = $.trim($(item).find('span:eq(2)').text());
						if((ipOld+logDir+formatOld) == (ip+addr+format)){
							app.alert('此信息已存在');
							flag = true;	
							return;
						}
					});
					if(flag){
						return;
					}
					var newTrHtml = `<span data-id="${objectId}">${ip}</span>
										<span title="${addr}">${addr}</span>
										<span>${format}</span>
										<span data="${skipToEnd}">${skipToEnd == '0'?'是':'否'}</span>
										<span>${deep}</span>
										<span data="${fileType}">${fileType}</span>
										<span>${isImportant}</span>
										<span>${fileSize}</span>
										<span>${flushLastSecd}</span>
										<span>${filterFileHours}</span>
										`;
					if(operType == '新增'){
						tr.empty().html(`${newTrHtml}
										<span>
											<button type="button" class="modifyIp fa fa-edit" title="修改"></button>
											<button type="button" class="removeIp fa fa-trash-o" title="删除"></button>
										</span>`);
					}else{
						tr.empty().html(`${newTrHtml}
										<span>
											<button type="button" class="modifyIp fa fa-edit" title="修改"></button>
										</span>`);
					}
				}).on('keyup focus', '.ALIR-ip', function(event) {
					var cateoryId = $('#category', $el).attr('cateoryId');
					if(!cateoryId || cateoryId == ''){
						app.alert('请选择所属应用系统');
					}else{
						if(!ipConfigListHtml){
							app.alert('当前资产分类下无数据');
						}else{
							if($(this).next().length){//删除多余应用系统选项
								$(this).next().remove();
							}
							$(this).after(ipConfigListHtml);
						}
					}
				}).on('click', '.ALIR-ipList li', function(event) {
					var $inputObj = $(this).parent().prev();
					$inputObj.val($(this).text())
						.attr('data-ip', $(this).attr("data-ip"))
						.attr('data-id', $(this).attr('data-id'));
					$(this).parent().remove();
				}).on('click', '.ALIR-dirBtn', function(event) {
					event.preventDefault();
					var ip = $('.ALIR-ip', $el).attr("data-ip").trim();
					if(!ip){
						app.alert('请填写对象');
					}else if($('.ALIR-dirList', $el).length > 0){
						$('.ALIR-dirList', $el).slideDown();
					}else{
						var $dirBtn = $('.ALIR-dirBtn');
						var dir = '';
						loadAgentDirByIp(ip,dir).then(function (data) {
							if(data.result && !$.isEmptyObject(data.result)){
								if(data.result.flag == 'false'){
									app.alert(data.result.msg);
								}else{
									var html = '<ul class="ALIR-dirList" data-id="1">';
									for (var item in data.result) {
										var icon = '';
										if(data.result[item] == 'd'){
											icon = '<i class="fa fa-caret-square-o-right fa-fw"></i>';
										}
										html += '<li data-type="'+data.result[item]+'"><span title="'+item+'">'+icon+item+'</span></li>';
									}
									html += '</ul>';
									$dirBtn.after(html);
								}
							}
						})
					}
				}).on('click', '.ALIR-dirList li', function(event) {
					var $ulObj = $('.ALIR-dirList', $el);
					var inputObj = $('.ALIR-dir', $el);
					var ip = $('.ALIR-ip', $el).attr('data-ip');
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
				//删除ip行
				.on('click','.removeIp',function(){
					if($(this).attr('modify')){
						var tr = $(this).parents('li');
						var data = tr.data();
						if(operType == '新增'){
							tr.html('<span data-id="'+data.objectId+'">'+data.ip+'</span><span title="'+data.addr+'">'+data.addr+'</span><span>'+data.format+'</span><span data="'+data.skipToEnd+'">'+(data.skipToEnd == '0'?'是':'否')+'</span><span>'+data.deep+'</span><span data="'+data.fileType+'">'+data.fileType+'</span><span>'+data.isImportant+'</span><span>'+data.fileSize+'</span><span>'+data.flushLastSecd+'</span><span>'+data.filterFileHours+'</span><span><button type="button" class="modifyIp fa fa-edit" title="修改"></button><button type="button" class="removeIp fa fa-trash-o" title="删除"></button></span>');
						}else{
							tr.html('<span data-id="'+data.objectId+'">'+data.ip+'</span><span title="'+data.addr+'">'+data.addr+'</span><span>'+data.format+'</span><span data="'+data.skipToEnd+'">'+(data.skipToEnd == '0'?'是':'否')+'</span><span>'+data.deep+'</span><span data="'+data.fileType+'">'+data.fileType+'</span><span>'+data.isImportant+'</span><span>'+data.fileSize+'</span><span>'+data.flushLastSecd+'</span><span>'+data.filterFileHours+'</span><span><button type="button" class="modifyIp fa fa-edit" title="修改"></button></span>');
						}
						tr.removeData();
					}else{
						$(this).parents('li').remove();
					}
				})
				// 修改
				.on('click', '.modifyIp', function(event) {
					event.preventDefault();
					var tr = $(this).parents('li');
					var spans = tr.find('span');
					console.log(spans);
					var ip =  $.trim($(spans[0]).text());
					var objectId =  $.trim($(spans[0]).attr('data-id'));
					var addr = $.trim($(spans[1]).text());
					var format = $.trim($(spans[2]).text());
					var skipToEnd = $.trim($(spans[3]).attr('data'));
					var deep = $.trim($(spans[4]).text());
					var fileType = $.trim($(spans[5]).attr('data'));
					var isImportant = $.trim($(spans[6]).text());
					var fileSize = $.trim($(spans[7]).text());
					var flushLastSecd = $.trim($(spans[8]).text());
					var filterFileHours = $.trim($(spans[9]).text());
					tr.html('<span class="ALIR-ipWapper"><input data-id="'+objectId+'" class="ALIR-ip" type="text" placeholder="选择对象" readonly/></span>\
							<span class="ALIR-dirWapper"><input class="ALIR-dir" type="text" placeholder="输入日志路径" style="padding-right: 50px;"/><button class="ALIR-dirBtn">浏览</button></span>\
							<span><input type="text" class="format" placeholder="输入文件匹配格式"/></span>\
							<span><select name="skipToEnd" id="skipToEnd"><option value="0">是</option><option value="1">否</option></select></span>\
							<span><input type="number" min="0" class="deep" placeholder="0表示不限制，1表示当前路径"/></span>\
							<span><select name="fileType" id="fileType"><option value="TEXT">TEXT</option><option value="BIN">BIN</option></select></span>\
							<span><select class="isImportant"><option value="是">是</option><option value="否">否</option></select></span>\
							<span><input type="number" min="0" class="fileSize" placeholder="单位(个)" value="256"/></span>\
							<span><input type="number" min="-1" class="flushLastSecd" placeholder="单位(秒)"/></span>\
							<span><input type="number" min="-1" class="filterFileHours"/></span>\
							<span><button type="button" class="saveIp fa fa-save" title="保存"></button><button type="button" title="取消" class="removeIp fa fa-reply" modify="true"></button></span>');
					tr.find('.ALIR-ip').val(ip);
					tr.find('.ALIR-dir').val(addr);
					tr.find('.format').val(format);
					tr.find('#skipToEnd').val(skipToEnd);
					tr.find('.deep').val(deep);
					tr.find('#fileType').val(fileType);
					tr.find('.isImportant').val(isImportant);
					tr.find('.fileSize').val(fileSize);
					tr.find('.flushLastSecd').val(flushLastSecd);
					tr.find('.filterFileHours').val(filterFileHours);
					tr.data({
						ip:ip,
						objectId:objectId,
						addr:addr,
						format:format,
						skipToEnd:skipToEnd,
						deep:deep,
						fileType:fileType,
						flushLastSecd:flushLastSecd,
						filterFileHours:filterFileHours,
						fileSize: fileSize,
						isImportant: isImportant
					});
				});
/*JDBC表配置start*/
				$('#addJDBC', $el).on('click', function(event) {
					event.preventDefault();
					if($('#JDBCContent',$el).find('input').length){
						app.alert('请先保存');
						return;
					}
					var urStr= '<li><span><select><option value="Oracle">Oracle</option><option value="Mysql">Mysql</option><option value="SQLServer">SQLServer</option></select></span>' +
						'<span><input type="text" placeholder="10.9.2.3:3306"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><select><option value="desc">desc</option><option value="aes">aes</option></select></span>' +
						'<span><input type="number" min="0" max="500"></span>' +
						'<span>' +
							'<button type="button" class="saveJDBC fa fa-save" title="保存"></button>' +
							'<button type="button" class="removeJDBC fa fa-times" title="取消"></button>' +
						'</span>' +
					'</li>';
					$('#JDBCContent',$el).append(urStr);
				});

				$('#JDBCContent',$el).on('click', '.saveJDBC',function(event) {
					event.preventDefault();
					var tr = $(this).parents('li');
					var spans = $(this).parent().siblings();
					var rowData = {};
					spans.each(function(index, el) {
						rowData[index] = $(this).children().val().trim();
					});
					var flag = true;
					for (var item in rowData) {
						if(rowData[item] == ''){
							flag = false;
						}
					}
					if(!flag){
						app.alert('请填写JDBC接入配置');
						return;
					}
					if(rowData[8]< 0 || rowData[8]>500){
						app.alert('批读取大小应在0-500之间');
						return;
					}
					if(operType == '新增'){
						var removehtml = '<button type="button" class="removeJDBC fa fa-trash-o" title="删除"></button>';
					}else{
						var removehtml = '';
					}
					var urStr= '<span>'+rowData[0]+'</span>' +
						'<span>'+rowData[1]+'</span>' +
						'<span>'+rowData[2]+'</span>' +
						'<span>'+rowData[3]+'</span>' +
						'<span>'+rowData[4]+'</span>' +
						'<span>'+rowData[5]+'</span>' +
						'<span>'+rowData[6]+'</span>' +
						'<span>'+rowData[7]+'</span>' +
						'<span>'+rowData[8]+'</span>' +
						'<span>' +
							'<button type="button" class="modifyJDBC fa fa-edit" title="修改"></button>'+
							removehtml+
						'</span>';
					tr.html(urStr);
				}).on('click', '.removeJDBC', function(event) {
					event.preventDefault();
					var tr = $(this).parents('li');
					var rowData = tr.data();
					if(rowData && !$.isEmptyObject(rowData)){
						app.confirmDialog({
							sTitle:"确认",       
			                sType:"search",
			                sContent:'确定取消修改该条配置？',
			                sBtnConfirm: '确定',
			                sBtnCancel: '取消',
			                fnConfirmHandler: function(){
			                	if(operType == '新增'){
			                		var removehtml = '<button type="button" class="removeJDBC fa fa-trash-o" title="删除"></button>';
			                	}else{
			                		var removehtml = '';
			                	}
			                	var urStr= '<span>'+rowData[0]+'</span>' +
			                		'<span>'+rowData[1]+'</span>' +
			                		'<span>'+rowData[2]+'</span>' +
			                		'<span>'+rowData[3]+'</span>' +
			                		'<span>'+rowData[4]+'</span>' +
			                		'<span>'+rowData[5]+'</span>' +
			                		'<span>'+rowData[6]+'</span>' +
			                		'<span>'+rowData[7]+'</span>' +
			                		'<span>'+rowData[8]+'</span>' +
			                		'<span>' +
			                			'<button type="button" class="modifyJDBC fa fa-edit" title="修改"></button>'+
			                			removehtml+
			                		'</span>';
			                	tr.html(urStr);
			                	tr.removeData();
			                },
			                aArgs: []
						});
					}else{
						app.confirmDialog({
							sTitle:"确认",       
			                sType:"search",
			                sContent:'确定删除该条配置？',
			                sBtnConfirm: '确定',
			                sBtnCancel: '取消',
			                fnConfirmHandler: function(){
			                	tr.remove();
			                },
			                aArgs: []
						});
					}
				}).on('click', '.modifyJDBC', function(event) {
					event.preventDefault();
					var tr = $(this).parents('li');
					var spans = $(this).parent().siblings();
					var rowData = {};
					spans.each(function(index, el) {
						rowData[index] = $(this).text().trim();
					});
					var urStr = '<span><select><option value="Oracle">Oracle</option><option value="Mysql">Mysql</option><option value="SQLServer">SQLServer</option></select></span>' +
						'<span><input type="text" placeholder="10.9.2.3:3306"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><select><option value="desc">desc</option><option value="aes">aes</option></select></span>' +
						'<span><input type="number" min="0" max="500"></span>' +
						'<span>' +
							'<button type="button" class="saveJDBC fa fa-save" title="保存"></button>' +
							'<button type="button" class="removeJDBC fa fa-times" title="取消"></button>' +
						'</span>';
					tr.html(urStr);
					tr.find('span').each(function(index, el) {
						if(index < 9){
							$(this).children().val(rowData[index]);
						}
					});
					tr.data(rowData);
				});

/*JDBC表配置end*/
/*Kafka配置start*/
				$('#addKafka', $el).on('click', function(event) {
					event.preventDefault();
					if($('#kafkaContent',$el).find('input').length){
						app.alert('请先保存');
						return;
					}
					var urStr= '<li>'+
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="number"></span>' +
						'<span>' +
							'<button type="button" class="saveKafka fa fa-save" title="保存"></button>' +
							'<button type="button" class="removeKafka fa fa-times" title="取消"></button>' +
						'</span>' +
					'</li>';
					$('#kafkaContent',$el).append(urStr);
				});

				$('#kafkaContent',$el).on('click', '.saveKafka',function(event) {
					event.preventDefault();
					var tr = $(this).parents('li');
					var spans = $(this).parent().siblings();
					var rowData = {};
					spans.each(function(index, el) {
						rowData[index] = $(this).children().val().trim();
					});
					var flag = true;
					for (var item in rowData) {
						if(rowData[item] == ''){
							flag = false;
						}
					}
					if(!flag){
						app.alert('请填写kafka接入配置');
						return;
					}
					if(operType == '新增'){
						var removehtml = '<button type="button" class="removeKafka fa fa-trash-o" title="删除"></button>';
					}else{
						var removehtml = '';
					}
					var urStr= '<span>'+rowData[0]+'</span>' +
						'<span>'+rowData[1]+'</span>' +
						'<span>'+rowData[2]+'</span>' +
						'<span>'+rowData[3]+'</span>' +
						'<span>' +
							'<button type="button" class="modifyKafka fa fa-edit" title="修改"></button>'+
							removehtml+
						'</span>';
					tr.html(urStr);
				}).on('click', '.removeKafka', function(event) {
					event.preventDefault();
					var tr = $(this).parents('li');
					var rowData = tr.data();
					if(rowData && !$.isEmptyObject(rowData)){
						if(operType == '新增'){
							var removehtml = '<button type="button" class="removeKafka fa fa-trash-o" title="删除"></button>';
						}else{
							var removehtml = '';
						}
						var urStr= '<span>'+rowData[0]+'</span>' +
							'<span>'+rowData[1]+'</span>' +
							'<span>'+rowData[2]+'</span>' +
							'<span>'+rowData[3]+'</span>' +
							'<span>' +
								'<button type="button" class="modifyKafka fa fa-edit" title="修改"></button>'+
								removehtml+
							'</span>';
						tr.html(urStr);
						tr.removeData();
					}else{
						$(this).parents('li').remove();
					}
				}).on('click', '.modifyKafka', function(event) {
					event.preventDefault();
					var tr = $(this).parents('li');
					var spans = $(this).parent().siblings();
					var rowData = {};
					spans.each(function(index, el) {
						rowData[index] = $(this).text().trim();
					});
					var urStr = '<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="text"></span>' +
						'<span><input type="number"></span>' +
						'<span>' +
							'<button type="button" class="saveKafka fa fa-save" title="保存"></button>' +
							'<button type="button" class="removeKafka fa fa-times" title="取消"></button>' +
						'</span>';
					tr.html(urStr);
					tr.find('span').each(function(index, el) {
						if(index < 4){
							$(this).children().val(rowData[index]);
						}
					});
					tr.data(rowData);
				});

/*Kafka配置end*/
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
				
				//点击保存按钮
				$('#confirmBtn',$el).click(function(){
					if($(this).hasClass('disabled')){
						return;
					}
					$(this).addClass('disabled');
					app.shelter.show();
					var obj = getData(),text='';
					if(!obj){
						$(this).removeClass('disabled');
						app.shelter.hide();
						return;
					}
					console.log(obj);
					submit(obj);
				});

				//上传数据
				function submit(obj){
					if(operType=="修改"){//修改
						url = "LogCfgSourceAction_updateLogCfgSource.do";
						text = "修改";
					}else if(operType=="新增"){//新增
						url = "LogCfgSourceAction_addCfgLogSource.do"
						text = "新增";
					}
					app.common.ajaxWithAfa({
						url: url,
						data: {
							source : JSON.stringify(obj),
							sourceType : sourceType
						}
					}).done(function (data) {
						if(data.result){
							if(CLEANABLE){
								var btns = $('.clearBtn.true', $el);
								if(btns.length > 0){
									submitCleanData(btns, text);
								}else{
									app.alert(text+'成功');
									$('#logInfoSlider .close',$parentPageContext).trigger('click',true);
								}
								/*for (var item in cleanData) {
									if(item.indexOf(activeCleanIds) < 0){
										deleteCleanData(cleanData[item].id);
									}
								}*/
							}else{
								app.alert(text+'成功');
								$('#logInfoSlider .close',$parentPageContext).trigger('click',true);
							}
						}else{
							app.alert(text+'失败');
						}
						app.shelter.hide();
						$('#confirmBtn',$el).removeClass('disabled');
					});
				}

				//失去焦点校验名称是否重复
				$('#logName',$el).blur(function(){
					var sourceName = $.trim($('#logName',$el).val());// 日志源名
					app.common.ajaxWithAfa({
						url: 'LogCfgSourceAction_judgmentSourceName.do',
						data: {
							sourceName : sourceName
						}
					}).done(function (data) {
						if(!data.result){
							$('#logName',$el).next().removeClass('hide');
						}else{
							$('#logName',$el).next().addClass('hide');
						}
					});
				}).focus(function(){
					$('#logName',$el).next().addClass('hide');
				})

				// 高级配置
				$('#moreConfig', $el).on('click', function(event) {
					event.preventDefault();
					var $moreConfigContent = $('#moreConfigContent', $el);

					if ($(this).hasClass('open')) {
						$(this).removeClass('open');
						$moreConfigContent.slideUp();

					}else{
						$(this).addClass('open');
						$moreConfigContent.slideDown();
					}
				});

				// 应用间关联配置
				$('#appReleConfig', $el).on('click', '#addAppRConfig', function(event) {
					var logId = $('#analyRule',$el).find('span.active').attr('data-id');
					if(!logId){
						app.alert('请选择解析规则');
						return;
					}
					if(isRuleChange){
						getKeyList(logId);
						isRuleChange = false;
					}
					
					var $appReleConfigList = $('#appReleConfigList', $el),
						btn = $appReleConfigList.find('input'),
						htmlStr='';
						if(btn.length>0){
							app.alert('请先保存');
						}else{
							htmlStr = '<li>\
								<span><input type="text" /></span>\
								<span class="keyExpressionWarp"><input type="text" class="keyExpression"/></span>\
								<span><button class="appSave fa fa-save" title="保存"></button><button class="appCancel fa fa-times" title="取消"></button></span></li>';
						}
						
					$appReleConfigList.append(htmlStr);
				})
				// 删除
				.on('click', '.remove', function(event) {
					$(this).parent().remove();
				})
				// 保存
				.on('click', '.appSave', function(event) {
					event.preventDefault();
					var spans = $(this).parent().siblings('span');
					var input = $(spans[0]).find('input');
					if(input.length>0 && $(input).val() == ''){
						app.alert('请定义描述');
						return;
					}
					var input2 = $(spans[1]).find('input');
					if(input2.length>0 && $(input2).val() == ''){
						app.alert('请定义表达式');
						return;
					}

					$(spans[0]).html($(spans[0]).find('input').val());
					$(spans[1]).html($(spans[1]).find('input').val());
					$('.keyFieldList', $el).remove();

					$(this).parent().html('<button class="modifyApp fa fa-edit" title="编辑"></button><button class="appCancel fa fa-trash-o" title="删除"></button>')
				})
				// 编辑
				.on('click', '.modifyApp', function(event) {
					event.preventDefault();
					var $li = $(this).parent().parent(); 
					var spans = $(this).parent().siblings('span');
					var data = {
						dec:$(spans[0]).text().trim(),
						exp:$(spans[1]).text().trim()
					}
					$li.html('<span><input type="text" /></span>\
								<span class="keyExpressionWarp"><input type="text" class="keyExpression"/></span>\
								<span><button class="appSave fa fa-save" title="保存"></button><button class="appCancel fa fa-times" title="取消"></button></span>');
					var input = $li.find('input');
					$(input[0]).val(data.dec);
					$(input[1]).val(data.exp);
					$li.data(data);
				})
				// 取消
				.on('click', '.appCancel', function(event) {
					event.preventDefault();
					var $li = $(this).parent().parent(); 
					var data = $li.data();
					$li.removeData();
					if(!$.isEmptyObject(data)){
						$li.html('<span></span>\
									<span class="keyExpressionWarp"></span>\
									<span><button class="modifyApp fa fa-edit" title="编辑"></button><button class="appCancel fa fa-trash-o" title="删除"></button></span>');
						var spans = $li.find('span');
						$(spans[0]).text(data.dec);
						$(spans[1]).text(data.exp);
					}else{
						$(this).parent().parent().remove();
					}
				})
				.on('keypress', '.keyExpression', function(event) {
					if(event.key == '$'){
						if($(this).next('.keyFieldList').length > 0){
							$(this).next().slideDown();
						}else{
							$(this).after(AppReleConfig.keyListString);
						}
					}
				})
				.on('keydown', '.keyExpression', function(event) {
					if(event.keyCode == 40){
						var tmpObj = $(this).next('.keyFieldList');
						if(tmpObj.length > 0){
							if(tmpObj.css('dispay') == 'none'){
								tmpObj.slideDown();
							}
							$(this).next().focus();
							$('li:eq(0)', tmpObj).addClass('active');
						}
						
					}
				})
				.on('keyup', '.keyExpression', function(event) {
					if(event.keyCode == 8){
						var value = $(this).val();
						var arr =  value.split(' ');
						var item = $.trim(arr.pop());
						$(this).val(arr.join(' '));
						item = item.replace(/\$|;/g,'');
						$(this).next().append('<li>'+item+'</li>');
					}
				})
				.on('click', '.keyFieldList>li', function(event) {
					var field = $(this).text();

					var inputObj = $(this).parent().prev(); 

					inputObj.val(inputObj.val()+field+'; ');
					inputObj.focus();
					
					$(this).parent().slideUp();
					$(this).remove();
				}).on('keyup', '.keyFieldList', function(event) {
					var len = $(this).children('li').length;
					var obj = $('li.active', $(this));
					if(event.keyCode == 40){
						if(obj && obj.index() < len-1){
							obj.removeClass('active').next().addClass('active');
						}else{
							obj.removeClass('active');
							$('li:eq(0)', $(this)).addClass('active');
						}
					}else if(event.keyCode == 38){
						if(obj && obj.index() == 0){
							obj.removeClass('active');
							$('li:last', $(this)).addClass('active');
						}else{
							obj.removeClass('active').prev().addClass('active');
						}
					}else if(event.keyCode == 13){
						obj.click();
					}
				});

				// 预警配置
				$('#warningConfig', $el).on('click', '#addWarning', function(event) {
					var $warningList = $('#warningList', $el),
						btn = $warningList.find('select'),
						htmlStr='';
						if(btn.length>0){
							app.alert('请先保存');
						}else{
							htmlStr = '<li>\
								<span><input type="text" /></span>\
								<span><select>'+WarningConfig.WarningLevel+'</select></span>\
								<span><button class="appSave">保存</button><button class="appCancel">取消</button></span></li>';
						}
						
					$warningList.append(htmlStr);
				})
				// 删除
				.on('click', '.remove', function(event) {
					$(this).parent().remove();
				})
				// 保存
				.on('click', '.appSave', function(event) {
					event.preventDefault();
					var spans = $(this).parent().siblings('span');
					var input = $(spans[0]).find('input');
					if(input.length>0 && $(input).val() == ''){
						app.alert('请定义预警关键字');
						return;
					}

					$(spans[0]).html($(spans[0]).find('input').val());
					var span2 = $(spans[1]).find('option:selected');
					$(spans[1]).html(span2.text()).attr('data-id', span2.attr('value'));

					$(this).parent().addClass('remove').html('&times;');
				})
				// 取消
				.on('click', '.appCancel', function(event) {
					event.preventDefault();
					$(this).parent().parent().remove();
				})

				// 脱敏配置
				$('#desensitizationConfig', $el).on('click', '#addDesensitization', function(event) {
					var $desensitizationList = $('#desensitizationList', $el),
						btn = $desensitizationList.find('input'),
						htmlStr='';
						if(btn.length>0){
							app.alert('请先保存');
						}else{
							htmlStr = '<li>\
								<span><input type="text" /></span>\
								<span><input type="text" /></span>\
								<span><button class="appSave fa fa-save" title="保存"></button><button class="appCancel fa fa-times" title="取消"></button></span></li>';
						}
						
					$desensitizationList.append(htmlStr);
				})
				// 删除
				.on('click', '.remove', function(event) {
					$(this).parent().remove();
				})
				// 保存
				.on('click', '.appSave', function(event) {
					event.preventDefault();
					var spans = $(this).parent().siblings('span');
					var input = $(spans[0]).find('input');
					if(input.length>0 && $(input).val() == ''){
						app.alert('请定义脱敏规则名称');
						return;
					}

					input = $(spans[1]).find('input');
					if(input.length>0 && $(input).val() == ''){
						app.alert('请定义脱敏规则表达式');
						return;
					}

					$(spans[0]).html($(spans[0]).find('input').val());
					$(spans[1]).html($(spans[1]).find('input').val());

					$(this).parent().addClass('remove').html('<button class="modifyApp fa fa-edit" title="编辑"></button><button class="appCancel fa fa-trash-o" title="删除"></button>');
				})
				// 编辑
				.on('click', '.modifyApp', function(event) {
					event.preventDefault();
					var $li = $(this).parent().parent(); 
					var spans = $(this).parent().siblings('span');
					var data = {
						dec:$(spans[0]).text().trim(),
						exp:$(spans[1]).text().trim()
					}
					$li.html('<span><input type="text" /></span>\
								<span><input type="text"/></span>\
								<span><button class="appSave fa fa-save" title="保存"></button><button class="appCancel fa fa-times" title="取消"></button></span>');
					var input = $li.find('input');
					$(input[0]).val(data.dec);
					$(input[1]).val(data.exp);
					$li.data(data);
				})
				// 取消
				.on('click', '.appCancel', function(event) {
					event.preventDefault();
					var $li = $(this).parent().parent(); 
					var data = $li.data();
					$li.removeData();
					if(!$.isEmptyObject(data)){
						$li.html('<span></span>\
									<span></span>\
									<span><button class="modifyApp fa fa-edit" title="编辑"></button><button class="appCancel fa fa-trash-o" title="删除"></button></span>');
						var spans = $li.find('span');
						$(spans[0]).text(data.dec);
						$(spans[1]).text(data.exp);
					}else{
						$(this).parent().parent().remove();
					}
				})

				//获取页面数据
				function getData(){
					var obj = {};
					var sourceName = $.trim($('#logName',$el).val());// 日志源名
					if(sourceName==''){
						app.alert('日志配置名称不能为空');
						return false;
					}else if(!$('#logName',$el).next().hasClass('hide')){
						app.alert('日志配置名称重复，请修改');
						$('#logName',$el).focus();
						return false;
					}
					// if($("#analyFlag",$el).hasClass('true')){//解析规则标志为true
						var logId = $('#analyRule',$el).find('span.active').attr('data-id');// 日志规则ID
						var logname = $('#analyRule',$el).find('span.active').text();// 日志规则名称
						if(!logId){
							app.alert('请选择解析规则');
							return false;
						}
						obj.logId = logId;// 日志规则ID
						obj.logname = logname;// 日志规则ID
					// }
					obj.sourceType = sourceType;// 日志源分类
					obj.sourceId = sourceId;// 日志源id
					obj.sourceName = sourceName;// 日志源名
					obj.appName =  $('#app',$el).find('option:selected').text();// 应用名称
					obj.appId =  $('#app',$el).val();// 应用ID

					// 三级分类
					obj.cateoryId = $('#category',$el).attr('cateoryId');
					var category = $('#category',$el).val().split('>');
					obj.category1 = category[0] || undefined;
					obj.category2 = category[1] || undefined;
					obj.category3 = category[2] || undefined;
					if(CLEANABLE){
						var rolenames=[],//权限名称
							sourceroles=[]//权限ID
							;

						$('#logPermission>span',$el).each(function(index,item){
							if($(item).attr('data-val')){
								sourceroles.push($(item).attr('data-val'));
								rolenames.push($(item).attr('data-name'));
							}
						});
						if(rolenames.length > 0){
							rolenames = rolenames.join(',');
							sourceroles = sourceroles.join(',');
							obj.rolenames = rolenames;
							obj.sourceroles = sourceroles;
						}

						var appReleConfigList = $('#appReleConfigList li', $el);
						if(appReleConfigList.find('input').length > 0){
							app.alert('请先保存关键字定义');
							return false;
						}

						if(appReleConfigList.length > 0){
							var relation = {};
							appReleConfigList.get().forEach(function (item) {
								relation[$(item).find('span:eq(0)').text()] = $(item).find('span:eq(1)').text();
							})
							obj.relation = relation;
						}
					}

					// 预警
					/*var warningList = $('#warningList li', $el);
					if(warningList.find('select').length > 0){
						app.alert('请先保存预警配置');
						return false;
					}

					if(warningList.length > 0){
						var eventkeywords=[],//事件关键字列表
							eventlevels=[];//事件级别列表

						warningList.get().forEach(function (item) {
							eventkeywords.push($(item).find('span:eq(0)').text());
							eventlevels.push($(item).find('span:eq(1)').text());
						})

						obj.eventkeywords = eventkeywords;
						obj.eventlevels = eventlevels;
					}*/

					// 脱敏
					/*var desensitizationList = $('#desensitizationList li', $el);
					if(desensitizationList.find('select').length > 0){
						app.alert('请先保存脱敏规则配置');
						return false;
					}

					if(desensitizationList.length > 0){
						var unSensitivity = {};//脱敏规则配置
						desensitizationList.get().forEach(function (item) {
							unSensitivity[$(item).find('span:eq(0)').text()] = $(item).find('span:eq(1)').text();
						})
						obj.unSensitivity = unSensitivity;
					}*/

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
						if($('#ipContent',$el).find('input').length){
							app.alert('请先保存来源对象');
							return false;
						}else if(!$('#ipContent',$el).find('li').length){
							app.alert('请先添加来源对象');
							return false;
						}
						$('#ipContent',$el).find('li').get().forEach(function(item,index){
							var $span0 = $(item).find('span:eq(0)');
							var ip = $.trim($span0.text());
							var id = $.trim($span0.attr('data-id'));
							var logDir = $.trim($(item).find('span:eq(1)').text());
							var format = $.trim($(item).find('span:eq(2)').text());
							var skipTo = $.trim($(item).find('span:eq(3)').attr('data'));
							var deep = $.trim($(item).find('span:eq(4)').text());
							var type = $.trim($(item).find('span:eq(5)').attr('data'));
							var isimport = $.trim($(item).find('span:eq(6)').text());
							var number = $.trim($(item).find('span:eq(7)').text());
							var secd = $.trim($(item).find('span:eq(8)').text());
							var expirt = $.trim($(item).find('span:eq(9)').text());
							objectId.push(id);
							hostIp.push(ip);
							logDirRegex.push(logDir);
							formatArr.push(format);
							skipToEnd.push(skipTo);
							depth.push(deep);
							fileType.push(type);
							fileSize.push(number);
							isImportant.push(isimport);
							flushLastSecd.push(secd);
							filterFileHours.push(expirt);
						});
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
					}else if(sourceType == "UDP服务" || sourceType == "TCP服务" || sourceType == "HTTP服务" || sourceType == "SNMP服务"){
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
							host:[],
							userName:[],
							passwd:[],
							dbName:[],
							tableName:[],
							orderKey:[],
							orderType:[],
							batchSize:[]
						}
						var keyNames = ['jdbcType', 'host', 'userName', 'passwd', 'dbName', 'tableName', 'orderKey', 'orderType', 'batchSize'];
						if($('#JDBCContent',$el).find('input').length){
							app.alert('请先保存JDBC配置');
							return false;
						}else if(!$('#JDBCContent',$el).find('li').length){
							app.alert('请先添加JDBC配置');
							return false;
						}
						$('#JDBCContent',$el).find('li').each(function(index, el) {
							var spans = $(this).find('span');
							spans.each(function(index, el) {
								if(index < 9){
									jdbcObj[keyNames[index]].push($(this).text().trim());
								}
							});
						});
						for (var item in jdbcObj) {
							obj[item] = jdbcObj[item].join(',');
						}
					}else if(sourceType == "Kafka接入"){
						var jdbcObj={
							host:[],
							groupId:[],
							topic:[],
							batchSize:[]
						}
						var keyNames = ['host', 'groupId', 'topic', 'batchSize'];
						if($('#kafkaContent',$el).find('input').length){
							app.alert('请先保存kafka配置');
							return false;
						}else if(!$('#kafkaContent',$el).find('li').length){
							app.alert('请先添加kafka配置');
							return false;
						}
						$('#kafkaContent',$el).find('li').each(function(index, el) {
							var spans = $(this).find('span');
							spans.each(function(index, el) {
								if(index < 4){
									jdbcObj[keyNames[index]].push($(this).text().trim());
								}
							});
						});
						for (var item in jdbcObj) {
							obj[item] = jdbcObj[item].join(',');
						}
					}
					return obj;
				}
				
				// 取消结构化配置事件
				$('#cancelBtn',$el).on('click', function(event) {
					event.preventDefault();
					$('#logInfoSlider .close',$parentPageContext).click();
				});
				
				// 获取页面统计数据
				function getStatistics() {
					var index = $('#logTypeList>li.active', $parentPageContext).index();
					app.common.ajaxWithAfa({
						url:"LogCfgSourceAction_getLogSourceStatistics.do",
					}).done(function (data) {
						var result = data.result,html='';
						if(result && !$.isEmptyObject(result)){
							$("#typeCount",$parentPageContext).text(result.souurceTypeCount == undefined?'-':result.souurceTypeCount);//源分类数
							$("#logCount",$parentPageContext).text(result.logCount == undefined?'-':result.logCount);//日志数
							$("#logRunCount",$parentPageContext).text(result.serverCount == undefined?'-':result.serverCount);//服务器数
							$("#logStopCount",$parentPageContext).text(result.applicationCount == undefined?'-':result.applicationCount);//应用系统数
							for(var key in result.sources){
								html += '<li data-name="'+key+'">'+key+'('+result.sources[key]+')</li>';
							}
							$('#logTypeList',$parentPageContext).empty().html(html);
							$('#logTypeList>li:eq('+index+')', $parentPageContext).trigger('click');
						}
					})
				}
				//点击浏览
				$('#scan',$el).click(function(){
					$(this).next().click();
				});
				$('#file', $el).on('change',function(event) {
					var val = $(this).val();
					$('#fileInput',$el).val(val);
				});
				
				//添加源地址白名单
				$('#sourceAddrList',$el).on('click','#addSource',function(){
					$(this).before('<input type="text" id="newSource">');
					$('#newSource',$el).focus();
				});
				//添加源地址白名单输入框失去焦点保存
				$('#addSource',$el).parents('.control-group').on('blur','#newSource',function(){
					var val = $.trim($(this).val());
					if(val ==''){
						$(this).remove();
						return;
					}
					$(this).replaceWith('<span data-val="'+val+'">'+val+'<i class="deleteSource">&times;</i></span>')
				}).on('click','.deleteSource',function(){//删除
					$(this).parent().remove();
				});
				
				//日志文件路径选择 点击浏览
				$('#pathScan',$el).click(function(){
					$('#myModalLabel>span',$('#modal',$el)).text('/');
					$("#modal",$el).modal('show');
					getPath('',function(html){
						$("#pathList",$('#modal',$el)).empty().append(html);
					});
				});
				//点击路径加载下级文件路径
				$('#pathList',$('#modal',$el)).on('click',"li",function(e){
					e.stopPropagation();
					var $this = $(e.target).closest('span');
					$('.confirmBtn',$('#modal',$el)).attr('data-chooseType',$this.attr('data-type'));//标识选择的是目录还是文件
					var path = '/'+$this.parents('li').get().map(function(item,index){
						return $(item).children('span').text();
					}).reverse().join('/');
					$('#myModalLabel>span',$('#modal',$el)).text(path);
					
					if($this.parent().hasClass('active')){//当前已选中
						$('#pathList',$('#modal',$el)).find('li.active').removeClass('active').find('i.fa-caret-square-o-down').toggleClass('fa-caret-square-o-down fa-caret-square-o-right');
						$this.parents('li').children('span').find('i').removeClass('fa-caret-square-o-right').addClass('fa-caret-square-o-down').end()
						$this.parent('li').addClass('active');
						$this.next().toggle();//展开或收起
						return;
					}else if($this.next().length){//当前未选择但曾经选择过
						$('#pathList',$('#modal',$el)).find('li.active').removeClass('active').find('i.fa-caret-square-o-down').toggleClass('fa-caret-square-o-down fa-caret-square-o-right');
						$this.parents('li').children('span').find('i').removeClass('fa-caret-square-o-right').addClass('fa-caret-square-o-down').end();
						$this.parent('li').addClass('active');
						$this.next().show();//展开
						return;
					}
					$('#pathList',$('#modal',$el)).find('li.active').removeClass('active').find('i.fa-caret-square-o-down').toggleClass('fa-caret-square-o-down fa-caret-square-o-right');
					$this.parents('li').children('span').find('i').removeClass('fa-caret-square-o-right').addClass('fa-caret-square-o-down').end();
					$this.parent('li').addClass('active');
					getPath(path,function(html){
						var HTML = "<ul>"+html+'</ul>';
						$this.nextAll().remove().end().after(HTML);
					});
				});
				function getPath(path,callback){
					app.common.ajaxWithAfa({
						url:"LogCfgSourceAction_getHostDirs.do",
						data: {
							dir:path
						}
					}).done(function (data) {
						var data = data.result,html="";
						if(!$.isEmptyObject(data)){
							for(var dir in data){
								html+='<li><span title="'+dir+'" data-type="'+data[dir]+'"><i class="fa fa-caret-square-o-right fa-fw"></i>'+dir+'</span></li>';
							}
							callback && callback(html);
						}
					});
				}
				//保存日志文件路径
				$('.confirmBtn',$('#modal',$el)).click(function(){
					var val = $('#myModalLabel>span',$('#modal',$el)).text();
					$("#pathInput",$el).val(val).attr('data-chooseType',$(this).attr('data-chooseType'));;
				});

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
			},

			unload : function(handler) {
			},

			pause : function($el, scope, handler) {
			},

			resume : function($el, scope, handler) {
			}
		};
	});
