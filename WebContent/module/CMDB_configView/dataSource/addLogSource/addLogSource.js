define(['./splitConfiger.js'], function (splitConfiger) {

	return {

		load: function ($el, scope, handler) {

			var sendData = {};
			var sourceType,sourceId,CLEANABLE;

			var $nextStepButton = $('#nextStep', $el);
			var $prevStepButton = $('#prevStep', $el);

			var curStep = 0;

			var operType = '新增';

			var formType = {};
			$('div[data-type]', $el).each(function(){
				formType[this.dataset.type] = $(this).clone(true);
			});
			$('div[data-type]', $el).remove();

			// 显示默认状态的图标
			function displayDefaultIconStatus(){
				$('.logSource-type-layout [data-value]', $el).each(function(index){
					if($(this).children('img').length == 0){
						$(this).prepend(`<img src="img/addLogSource/icon${index * 2 + 1}.png"/>`);
					}else{
						$(this).children('img').attr('src', `img/addLogSource/icon${index * 2 + 1}.png`);
					}
				})
			}
			displayDefaultIconStatus();

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
			
			$("#step", $el).on('click','#levels div.controls-level-item', function (e) {
				if (!$(this).hasClass('active')) {
					$(this).nextAll().addClass('active');
				}
				$(this).toggleClass('active');
			})

			var clickInterval = 0;
			$('.logSource-type-layout', $el).on('click', '[data-value]', function(){
				displayDefaultIconStatus();
				var index = $(this).index();
				$(this).children('img').attr('src', `img/addLogSource/icon${index * 2}.png`);
				var type = this.dataset.formType;
				$('div[data-type]', $el).remove();
				$('#step2form', $el).append(formType[type].clone(true));
				$nextStepButton.removeClass('disabled');
				sourceType = this.dataset.value;
				showOrHide();

				if(clickInterval == 1){
					// 双击事件
					nextStep();
				}
				clickInterval = 1;
				setTimeout(()=>{
					clickInterval = 0;
				},200)
			})

			function stepEvent_1(){
				nextStep();
			}

			function stepEvent_2(){
				var validateResult = app.validate.validate({
					$context : $('#step2form',$el),
					data:[{
						"id":"logName",
						"filter":{
							"require":true,
						}
					},{
						"id":"logdir",
						"filter":{
							"require":true,
						}
					},{
						"id":"category",
						"filter":{
							"require":true,
						}
					},{
						"id":"format",
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
				if(validateResult.bResult){
					nextStep();
				}
			}
			function stepEvent_3(){
				nextStep();
			}

			function stepEvent_4(){
				// 保存
				app.shelter.show();
				var obj = getData(),
						text='';
				if(!obj){
					$(this).removeClass('disabled');
					app.shelter.hide();
					return;
				}
				console.log(obj);
				submit(obj);
			}

			function stepEvent_5(){
				$('#addLogSource_modal').modal('hide');
			}

			function sendPrivateData(sourceId){
//				var datas = app.domain.get('privateFields', 'data');
//				var splitFields = [];
//				datas.forEach(item => {
//					splitFields.push(...item.splitFields)
//				})
//				app.common.ajaxWithAfa({
//					url: 'LogCfgSourceAction_addPrivateFieldsNew.do',
//					data: {
//						sourceId,
//						privateFields : JSON.stringify(splitFields)
//					}
//				}).done(function (content) {
					nextStep();
//				})
			}
			//上传数据
			function submit(obj){
				if(operType=="修改"){//修改
					url = "LogCfgSourceAction_updateLogCfgSource.do";
					text = "修改";
				}else if(operType=="新增"){//新增
					url = "LogCfgSourceAction_addCfgLogSourceNew.do"
					text = "新增";
				}
				var datas = app.domain.get('privateFields', 'data')
				var splitFields = [];
				datas && datas.forEach(item => {
					splitFields.push(...item.splitFields)
				})
				app.common.ajaxWithAfa({
					url: url,
					data: {
						source : JSON.stringify(obj),
						sourceType : sourceType,
						privateFields : JSON.stringify(splitFields)
					}
				}).done(function (data) {
					if(data.result){
						if(CLEANABLE){
							var btns = $('.clearBtn.true', $el);
							if(btns.length > 0){
								submitCleanData(btns, text);
							}else{
								window.postMessage('dataSourceSaveSuccess','*');
								app.alert(text+'成功');
							}
						}else{
							window.postMessage('dataSourceSaveSuccess','*');
							app.alert(text+'成功');
						}
						sendPrivateData(data.result);
					}else{
						app.alert(text+'失败');
					}
					app.shelter.hide();
					$('#confirmBtn',$el).removeClass('disabled');
				});
			}

			$nextStepButton.on('click', function(){
				if($(this).hasClass('disabled')){
					return;
				}
				switch(curStep){
					case 0: stepEvent_1();break;
					case 1: stepEvent_2();break;
					case 2: stepEvent_3();break;
					case 3: stepEvent_4();break;
					case 4: stepEvent_5();break;
				}
			})

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

			//获取页面数据
			function getData(){
				var obj = {};
				var sourceName = $.trim($('#logName',$el).val());// 日志源名
				var logId = $('#analyRule',$el).val();// 日志规则ID
				var logname = $('#analyRule',$el).find('option:selected').text();// 日志规则名称
				if(!logId){
					app.alert('请选择解析规则');
					return false;
				}
				obj.logId = logId;// 日志规则ID
				obj.logname = logname;// 日志规则ID
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
					hostIp= Array.from($('#ipConfigList [name="ips"]:checked', $el)).map(item => $(item).attr('data-ip'));
					logDirRegex.push($('#logdir', $el).val());
					formatArr.push($('#format', $el).val());
					skipToEnd.push($('#skipTo', $el).hasClass('true')?1:0);
					depth.push($('[name="deep"]:checked', $el).val());
					fileType.push($('#fileType', $el).val());
					fileSize.push($('[name="fileSize"]', $el).val());
					isImportant.push($('#isImportant', $el).hasClass('true')?'是':'否');

					flushLastSecd.push($('[name="flushLastSecd"]', $el).val());
					filterFileHours.push($('[name="filterFileHours"]', $el).val());
					obj.objectId = objectId.join(',');//对象ID
					obj.hostIp = hostIp.join(',');//主机地址
					obj.logDirRegex = logDirRegex.join('###')//日志文件目录
					obj.fileName = formatArr.join('###')//日志文件匹配格式
					obj.logcoding = $('#logCoding',$el).val();
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
				}else if(sourceType == "UDP服务" || sourceType == "TCP接入" || sourceType == "HTTP接入"){
						let objectIds = [];
						let ips = [];
						$('#ipsList input:checked',$el).each(function(index,item){
							ips.push($(item).attr('data-ip'));
							objectIds.push($(item).attr('data-id'));
						});
						obj['logcoding'] = $("#logCoding", $el).val();	
						obj.objectId = 	objectIds.join(',');			
						obj.ips = ips.join(',');
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
					obj['logcoding'] = $("#logCoding", $el).val();
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
			
			$el.on('change', 'input[name="version"]', function () {
				var val = $(this).val();
				if (val === 'V3') {
					$('.control-group[data-show="version"]', $el).show();
				} else {
					$('.control-group[data-show="version"]', $el).hide();
				}
			})

			$prevStepButton.on('click', function(){
				if(curStep == 0){
					$('#addLogSource_modal').modal('hide');
				}else{
					prevStep();
				}
			})

			$el.on('click', '#dirBtn', function(){
				var ip = $('#ipConfigList [name="ips"]:checked:eq(0)', $el).attr("data-ip");
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
				var ip = $('#ipConfigList [name="ips"]:checked:eq(0)', $el).attr("data-ip");
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

			$el.click(function(e){
				if($(e.target).closest($('.ALIR-dirList', $el)).length == 0){
					$('.ALIR-dirList',$el).hide();
				}
			})

			function nextStep() {
				$('.step-progress', $el).children().eq(curStep).addClass('finish').removeClass('active').next().addClass('active').removeClass('finish');
				$('.step-content', $el).children().addClass('hide').eq(curStep+1).removeClass('hide');
				curStep++;
				stepChange();
			}

			function prevStep() {
				$('.step-progress', $el).children().eq(curStep).removeClass('active').prev().addClass('active').removeClass('finish');
				$('.step-content', $el).children().addClass('hide').eq(curStep-1).removeClass('hide');
				curStep--;
				stepChange();
			}

			function stepChange(){
				if(curStep>0){
					$prevStepButton.text('上一步');
				}else{
					$prevStepButton.text('取消');
				}
				if(curStep == 4){
					$prevStepButton.addClass('hide');
					$nextStepButton.text('完成');
				}else{
					$prevStepButton.removeClass('hide');
					$nextStepButton.text('下一步');
				}
			}

			var getCfgLogInfoObject = {};
			function getCfgLogInfo(cate){
				app.common.ajaxWithAfa({
					url: "LogCfgAction_getCfgLogInfoByCate.do",
					data: {
						cate
					}
				}).done(function (data) {
					data.result.sortChinese('logName');
					$('#analyRule', $el).siblings().remove();
					$('#analyRule', $el).html(data.result.reduce((sum,item,index)=>{
						getCfgLogInfoObject[item.logId] = item;
						return sum += `<option value="${item.logId}">${item.logName}</option>`;
					},''));
					$('#analyRule', $el).tinyselect();
					$('#analyRule', $el).val($('#analyRule>option:eq(0)', $el).attr('value')).trigger('change');
				})
			}
			
			
			function unityData (data) {
				if (data) {
					data = data.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&apos;').replace(/"/g,'&quot;');
					return data
				}
				return null;
			}

			$('#analyRule', $el).on('change', function(){
				$('#dataExample1', $el).html(getCfgLogInfoObject[this.value].dataExample);
				var publicFields = getCfgLogInfoObject[this.value].publicFields;
				$('#structConfig_public1', $el).html(publicFields.reduce((sum,item,index)=>{
					return sum += `<li>
						<div class="field-layout">
							<span>${item.fieldKey}</span>
							<span>${item.fieldName}</span>
							<span>${item.dataSource==1?'日志目录':'日志内容'}</span>
							<span>${unityData(item.fieldRegex) || '-'}</span>
							<span>${unityData(item.fieldDefault) || '-'}</span>
							<span>${unityData(item.format) || '-'}</span>
						</div>
					</li>`
				},''));
				/**
				 * 私有化字段配置 开始
				 */
				app.tab.openNewWindow({
					title: '',
					moduleId: 'addLogPrivate',
					section: "",
					id: app.global.getUniqueId(),
					frameRenderTo: $('#addLogPrivate', $el),
					params: {
						logContent: getCfgLogInfoObject[this.value].dataExample,
					}
				});
			})

			// 三级分类树点击事件
			function clickList(event,treeId,treeNode,clickFlag) {
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
				$('#category', $el).attr('cateoryId', cateoryId);
				getObjectsByAppAndCateAdd();
				showCate(category.join('>'))
				$('#step2form .open', $el).removeClass('open');
			}
			
			function showCate(val) {
				let cate = $('#category', $el).attr('cateoryId');
				getCfgLogInfo(cate);
				$("#tmplateApp", $el).val(val);
			}
			
			$("#app", $el).on('change', function (e) {
				getObjectsByAppAndCateAdd();
			})
			
			function getObjectsByAppAndCateAdd() {
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
									<input type="radio" data-id="${item.obj_id}" data-ip="${item.obj_name}" value="${item.obj_name}" name="ip"><span style="font-size: 14px;">${item.obj_name}</span>
								</label>`;
							html1 += `<label class="radio inline">
								<input type="checkbox" data-id="${item.obj_id}" data-ip="${item.obj_name}" value="${item.obj_name}" name="ips"><span style="font-size: 14px;">${item.obj_name}</span>
							</label>`;
							htmlJDBC += `<span>
									<label class="radio inline">
										<input type="radio" style="margin: 5px 0 0 0;" data-id="${item.obj_id}" data-ip="${item.obj_name}" value="${item.obj_name}" name="ip"><span style="font-size: 14px;">${item.obj_name}</span>
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
					appList.sortChinese('objectSummary.objectName');
					appList.forEach(function(item, index){
						var tmp = item.objectSummary;
						html += '<option value="'+tmp.objectId+'">'+tmp.objectName+'</option>';
						})
					$('#app',$el).html(html);
					scope.appId && $('#app',$el).val(scope.appId);
					$('#app',$el).tinyselect();
					scope.appId && (scope.appId != 'all') && $('#app',$el).siblings('.tinyselect').addClass('disabled');
					callback && callback();
				});
			}
			loadApp();
			// 加载三级分类
			function loadCategory(){
				app.common.ajaxWithAfa({
					url:"EventListAction_getObjectCategory.do"
				}).done(function(data){
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
				})
			}
			loadCategory();

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
			
			

			// 第四步 日志内容样例-事件
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

			// 点击其他区域隐藏弹窗
			$el.on('click', function(event) {
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
				var offset = $logExample.offset();
				
				var len = (x - mouseDownPosition.x)/2;
				var top = mouseDownPosition.y > y?mouseDownPosition.y:y;
				$tipBox.css({
					top: (top + 20)+'px',
					left: (mouseDownPosition.x + len - 75)+'px',
					'z-index':2
				});
				$tipBox.show();
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
				var index = $("#tipBox ul li").index($(this));
				// 打开新增标签
				$('#addFieldsBtn', $el).trigger('click', [index,selectedText]);
			});


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
				console.log(e);
			});


		},

		unload: function (handler) {

		},

		pause: function ($el, scope, handler) {

		},

		resume: function ($el, scope, handler) {

		}

	}
});