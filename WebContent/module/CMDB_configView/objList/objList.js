define([],function(){
	return {
		load:function($el,scope,handler){
			
			let modelId = scope.modelId;
			let appId = scope.appId;
			let treeFlag = scope.treeFlag;
			let isDelCate = scope.isDelCate;
			let objId = '';		//选中对象id
			let defId = '';		//选中对象的模型id
			let objInfo = {};	//选中对象的详细信息  传参用
			let detailModel = '';
			let imgs = scope.imgs;
			let currentFamily = scope.currentFamily; //当前节点上游
			let text = currentFamily.reverse().map(item => item.name).join('/');

			$('#appTitle', $el).text(text).attr('title',text);
			
			let columnsObj = {};//字段描述信息，用于动态生成对应的新增/修改modal
			let catesMap = {};  //三级分类
			let passwordIds = [];//存密码框id
			let saveFlag;//saveFlag：true表示新增，false表示修改
			let editCateId;//修改的对象所属分类id
			
			getCatesMap();

			init();
			function init() {
				if(treeFlag == 'cateTree'){
					//分类树
					getObjByCate(modelId);	//根据模型id加载对象
					scope.showAddCategory ? $('.add-category',$el).removeClass('hide') : $('.add-category',$el).addClass('hide');
				}else{
					//app树
					$('.add-category',$el).addClass('hide')
					getObjByAppCate(scope.selectedCate);
				}
				scope.showOperates ? $('.data-operates',$el).removeClass('hide') : $('.data-operates',$el).addClass('hide');
			}
			
			isDelCate?$(".del-category", $el).show():$(".del-category", $el).hide();
			
			
			bindEvents();
			selectorBindEvent();

			function bindEvents() {
				$('#resizeHeight',$el).on('mouseup',function(){
					let topHeight = $('.appConfiger-configer-top',$el).outerHeight() + 'px';
					let bottomHeight = 'calc(100% - '+topHeight+')';
					$('.appConfiger-configer-bottom',$el).css('height',bottomHeight);
				});
				//多页签
				$('#resizeHeight>li',$el).off('click').on('click',function(){
					var path = $(this).attr('skip-add');
					var args = path.split('#');
					var $this = $(this);
					app.dispatcher3.load({
						"moduleId" : args[0],
						"section" : args.slice(1),
						"frameRenderTo" : '.dataManageDetail-content',
						"id" : path,
						 "params" : { // 给标签传递参数
						 	"dmDtId" : objId,
						 	"dmDefId": defId,
						 	"dmDefName": '',
						 	"detailModel": detailModel,
						 	"objName": $('#appConfigInfo>li.checked #l3_cate_name',$el).text(),
						 	"objInfo": objInfo,
						 	"imgs": imgs
						 },
						"context" : $el
					});
					$this.addClass('active').siblings().removeClass('active');
				});
				
				/*弹窗事件*/
				
				$('button.close,button.cancelBtn',$('#addobj',$el)).on('click',function(){
					hideModal();
				});
				$('#addobj>.addobj-mask').on('click',function(){
					hideModal();
				});
				/*弹窗事件结束*/
				
				$('#appSearch').on('keyup',function(e){
					var e = e || window.event,
					keycode = e.which;
					//if(keycode == 13){//回车键事件
					var	searchValue = $.trim($(this).val()).toLowerCase();//搜索框内容
					$('li:not(.addone)', $('#appConfigInfo', $el)).each(function(index,li){
						if($(li).find('p').text().toLowerCase().indexOf(searchValue) != -1){
							$(li).css('display', 'block');
						}else{
							$(li).css('display', 'none');
						}
						
					})
				//}
				});
				$('#appSearch').on('input',function(e){
					if($.trim($(this).val()) == ""){//实现清空时，所有应用显示
						$('li', $('#appConfigInfo', $el)).each(function(index,li){
							$(li).css('display', 'block');							
						})
					}
				});
				
				
				//点击搜索功能
				$(".appConfigerView-appSearch",$el).on("click",function(){
					var	searchValue = $.trim($("#appSearch",$el).val()).toLowerCase();//搜索框内容
					$('li:not(.hide)', $('#appConfigInfo', $el)).each(function(index,li){
						if($(li).find('p').text().toLowerCase().indexOf(searchValue) != -1){
							$(li).css('display', 'block');
						}else{
							$(li).css('display', 'none');
						}
					})
				});
				
				$(".objectList-control",$el).on('click','span.tip-span',function(){
					//$('.objectList-control span',$el).removeClass('objectList-control-selected');
					//$(this).addClass('objectList-control-selected');
					let role = $(this).attr('data-role');
					$('#appConfigInfo>li',$el).addClass('hide');
					if(role == 'all'){
						$('#appConfigInfo>li',$el).removeClass('hide');
					}else{
						let kpi = $(this).attr('data-kpi')
						$('#appConfigInfo>li['+kpi+'='+role+']',$el).removeClass('hide');
					}
					$('.appConfigerView-appSearch',$el).trigger('click');
				});
				
				//选择按状态还是按用途
				$('.type-filter>span',$el).on('click',function(){
					if($(this).hasClass('active')){
						return;
					}
					let type = $(this).attr('data-type');
					$(this).addClass('active').siblings().removeClass('active');
					$('.objectList-control',$el).find('.'+type).removeClass('hide').siblings().addClass('hide');	
					$('.appCount_',$el).trigger('click');
				});
				$('.type-filter>span:eq(0)',$el).trigger('click');
				
				//点击对象，显示对应的详细信息
				$('#appConfigInfo', $el).delegate('li', 'click', function(){
					objInfo = {};
					if($(this).hasClass('addone')){
						addOne();
						return;
					}
					
					objId = $(this).attr('objectid');
					defId = $(this).attr('defid');
					
					objInfo['green'] = $(this).find('.green').length == 0 ? 'gray' : 'green';
					objInfo['open'] = $(this).find('.open').length == 0 ? 'closed' : 'open';
					objInfo['online'] = $(this).find('.online').length == 0 ? 'offline' : 'online';
					objInfo['ip'] = $(this).find('#obj_ip').text();
					objInfo['name'] = $(this).find('#l3_cate_name').text();
					objInfo['cateId'] = $(this).attr('defid');
					objInfo['img'] = $(this).attr('data-img');
						
					if(objInfo['open'] == 'open'){
						$('#objectListStopBtn',$el).removeAttr('disabled').siblings().attr('disabled','disabled');
					}else{
						$('#objectListStopBtn',$el).attr('disabled','disabled').siblings().removeAttr('disabled');
					}
					
					if($(this).siblings('.checked').length){
						var imgUrlCk = $(this).siblings('.checked').css('background-image').slice(0,-14);
						$(this).siblings('.checked').css('background-image', imgUrlCk + '.png")');
					}
					
					$(this).addClass('checked').siblings().removeClass('checked');

					
					//显示对象信息
					showObjectInfo();
				});
				
				
				$("#sliderBlock",$el).dragWidth();
				$("#resizeHeight",$el).dragHeight();
				
				//编辑
				$('#appConfigInfo',$el).on('click','>li i.fa-edit',async function(e){
					e.stopPropagation();
					let cateId =  $(this).parents('li').attr('defid');
					let objId = $(this).parents('li').attr('objectid');
					if(!columnsObj[cateId]){
						await getModelInfo(cateId);
					}
					saveFlag = false;
					editCateId = cateId;
					$('.form-category-select',$el).addClass('hide');
					showForm(cateId);
					showSelectedData(cateId, objId);
					$('#addobj',$el).addClass('show-modal');
				});

				//删除
				$('#appConfigInfo',$el).on('click','>li i.fa-trash',function(e){
					e.stopPropagation();
					let objId = $(this).parents('li').attr('objectid');
					let cateId = $(this).parents('li').attr('defid');
					app.confirmDialog({
						sTitle:"删除",
						sType:"search",
						sContent:'确认删除勾选的数据？',
						sBtnConfirm: '确定',
						sBtnCancel: '取消',
						fnConfirmHandler: function(){
							deleteData(objId,cateId);
						}
					});
				});

				//新增分类
				$('.add-category',$el).on('click',function(){
					$('#addNewModal',$el).modal('show');
				});
				
				//删除分类
				$('.del-category',$el).on('click',function(){
					$('#delNewModal',$el).modal('show');
				});

				$('#addNewModal .confirmBtn',$el).on('click',function(){
					let name = $('#soft_name',$el).val();
					if(!name){
						app.alert('请填写名称');
						return;
					}
					addSoft(name);
				});
				
				$('#delNewModal .confirmBtn',$el).on('click', function(){
					console.log(scope.delCate)
					app.common.ajaxWithAfa({
						url: 'CmdbConfigManagerAction_delSoftware.do',
						data: {
							cateId: scope.delCate
						}
					}).then(function(data) {
						if (data.result) {
							app.alert('删除成功')
							$('#delNewModal',$el).modal('hide');
							window.postMessage({addSoft: true, name: '应用软件'},'*');
						}
					});
				});
				
				
			}
			
			console.log(scope)
			

			function showSelectedData(cateId, objId) {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_getObjInfo.do',
					data: {
						conf_id: cateId,
						objId: objId
					}
				}).then(function(data) {
					data = data.funs;
					editData = data;
					if(!data) return;
					for(var key in data) {//给表单设置选中行的数据
						$('#' + key, $('#addobj form', $el)).val(data[key]);
					}
				});
			}
			
			//新增应用软件
			function addSoft(name) {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_addSoftware.do',
					data: {
						softwareName: name
					}
				}).done(content => {
					if(content.result){
						app.alert('新增成功');
						$('#addNewModal',$el).modal('hide');
						window.postMessage({addSoft: true, name: '应用软件'},'*');
					}
				});
			}

			function hideModal() {
				$('#addobj',$el).removeClass('show-modal');
			}

			//删除对象
			function deleteData(objId,cateId) {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_removeObjs.do',
					data: {
						objIds: objId,
						conf_id: cateId
					}
				}).then(function(data) {
					if(data.funs == 1) {
						app.alert('删除成功');
						getObjByCate(modelId);
					} else {
						app.alert('删除失败');
					}
				});
			}
			
			//根据app下游分类查询对象
			function getObjByAppCate(cate) {
				app.common.ajaxWithAfa({
					url:'CmdbConfigManagerAction_getAppRelaObjects.do',
					data:{appId: appId},
				}).then(function(content){
					let result = content.result;
					if($.isEmptyObject(result)){
						showObj([]);
						return;
					}
					let ret = null;
					if(cate == ''){
						ret = result;
					}else{
						for(let i in result){
							if(i == scope.selectedCate){
								ret = result[i];
								break;
							}
							for(let j in result[i]){
								if(j == scope.selectedCate){
									ret = result[i][j];
									break;
								}
							}
							
						}
					}
					
					let arr = [];
					if(!Array.isArray(ret)){
						arr = loopToArray(ret,[]);
					}else{
						arr = ret;
					}
					arr.forEach(item => {
						item.objectSummary = {
								objectName: item.object_name,
								objectId: item.object_id,
								categoryId: item.cate_id,
								monitorStatus: false
						};
					});
					showObj(arr,'noAdd');
				})
			}
			
			function loopToArray(input,output) {
				let obj = {};
				for(let i in input){
					if(Array.isArray(input[i])){
						output = output.concat(input[i]);
						delete i;
					}else{
						obj = Object.assign({},obj,input[i]);
					}
				}
				if(!$.isEmptyObject(input)){
					return loopToArray(obj,output);
				}else{
					return output;
				}
				
			}
			
			function showObj(data,noAddFlag,showType) {
				let overviewInfo = {
						all: data.length,
						0: 0,
						1: 0,
						2: 0,
						3: 0,
						'开发': 0,
						'测试': 0,
						'生产': 0
				};
				let statusMap = {
						0: '已投产',
						1: '已下线',
						2: '待投产',
						3: '投产中'
				};
			
				if(data && data.length > 0){
					let html = '';
					data.sortChinese('objectSummary.objectName');
					data.forEach(item => {
						let monitorStatus = item.objectSummary.monitorStatus ? '已监控' : '未监控';
						html += '<li class="objectList-os monitor" data-mwshowtype="shape" objectid="'+ item.objectSummary.objectId +'" defid="'+item.objectSummary.categoryId+'" data-status="'+item.objectSummary.monitorStatus+'" data-dmDtPurpose="" data-img="'+item.imgPath+'">\
									<p class="objectList-image-ctn green"></p>\
									<p class="objectList-info-ctn">\
										<span class="selectableText" id="l3_cate_name" title="'+item.objectSummary.objectName+'">'+item.objectSummary.objectName+'</span>\
										<span class="selectableText " id="obj_ip" title="'+item.objectSummary.objectName+'">'+item.objectSummary.objectName+'</span>\
										<span class="objectList-little">\
											<span title="监控状态" class="objectList-shape-monitorShow  open"></span>\
											<span title="监控状态">'+monitorStatus+'</span>\
										</span>\
									</p>\
									<span class="obj-operate-btns"><i class="fa fa-edit"></i><i class="fa fa-trash"></i></span>\
								</li>';
						
					});
					$('#appConfigInfo',$el).html(html);
					if(!noAddFlag){
						$('#appConfigInfo',$el).prepend('<li class="addone"><i class="fa fa-plus"></i></li>');
					}
					$('#appSearch',$el).trigger('keyup');
					$('#appConfigInfo>li.objectList-os:eq(0)',$el).trigger('click');
				}
				if ($("#appSearch", $el).val().trim() !== '') {
					$("#appSearch", $el).trigger('keydown');
				}
				renderFilter(overviewInfo);
			}
			
			function renderFilter(info) {
				for(let i in info){
					$('.objectList-control span[data-role="'+i+'"]',$el).text(info[i]);
				}
			}

			//显示对象信息
			function showObjectInfo(){
				$('#resizeHeight>li.active',$el).trigger('click');
			}
			
			function getModelInfo(id){
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url: 'CmdbConfigManagerAction_queryAllCmdbObject.do',
						async: false,
						data: {conf_id: id}
					}).then(function(data) {
						data = data.funs;
						if(data) {
							if(!columnsObj[id]){
								columnsObj[id] = {};
							}
							columnsObj[id] = data.colunmConfig;
							
							changeValidateMethod(id);
							resolve(data);
						}
					});
				})
			}
			
			function getObjByCate(modelId) {
				app.shelter.show('正在加载,请稍后...');
				let len = currentFamily.length;
				let urls = {
						1: 'AppConfigAction_getFirstCategoryObjects.do',
						2: 'AppConfigAction_getSecondCategoryObjects.do',
						3: 'AppConfigAction_getThirdCategoryObjects.do'
				};
				let outputKey = {
						1: 'cate1Objects',
						2: 'cate2Objects',
						3: 'cate3Objects'
				};
				let params = {
						levelOneName: currentFamily[0] && currentFamily[0]['name'],
						levelTwoName: currentFamily[1] && currentFamily[1]['name'],
						levelThreeName: currentFamily[2] && currentFamily[2]['name']
				}
				app.common.ajaxWithAfa({
					url: urls[len],
					data: params,
				}).then(function(content){
					app.shelter.hide();
					if(content[outputKey[len]].length == 0){
						detailModel = null;
						objId = '';
						defId = '';
						$('#appConfigInfo',$el).html('<li class="addone"><i class="fa fa-plus"></i></li>');
					}
					showObj(content[outputKey[len]]);
				})
			}
		
			
			
			function addOne() {
				$('.form-category-select',$el).removeClass('hide');
				saveFlag = true;
				setTimeout(function() {
					passwordIds.forEach(function(item, i) {
						$('#' + item, $('#configModal form', $el)).prop('type', 'password');
					});
				}, 500);

				renderCateSelector();
				$('#addobj',$el).addClass('show-modal');
			}
			
			function getCatesMap() {
				scope.allCates.forEach(item => {
					if(!catesMap[item.levelOneName]){
						catesMap[item.levelOneName] = {};
					}
					let cate1 = item.levelOneName;
					let cate2 = item.levelTwoName;
					let cate3 = item.levelThreeName;
					if(!catesMap[item.levelOneName][cate2]){
						catesMap[item.levelOneName][cate2] = {};
					}
					if(!catesMap[item.levelOneName][cate2][cate3]){
						catesMap[item.levelOneName][cate2][cate3] = item.categoryId;
					}
				});
			}
			
			function selectorBindEvent() {
				$('#cate1_selector',$el).on('change',function(){
					$('#cate2_selector',$el).html('');
					$('#cate3_selector',$el).html('');
					let val = $(this).find('option:selected').text();
					let cate2 = catesMap[val];
					let cate2Option = '';
					for(let i in cate2){
						cate2Option += `<option value="${i}">${i}</option>`;
					}
					$('#cate2_selector',$el).html(cate2Option).trigger('change');
				});
				$('#cate2_selector',$el).on('change',function(){
					$('#cate3_selector',$el).html('');
					let cate1 = $('#cate1_selector',$el).find('option:selected').text();
					let val = $(this).find('option:selected').text();
					let cate3 = catesMap[cate1][val];
					let cate3Option = '';
					for(let i in cate3){
						cate3Option += `<option value="${i}" data-id="${cate3[i]}">${i}</option>`;
					}
					$('#cate3_selector',$el).html(cate3Option).trigger('change');
				});
				$('#cate3_selector',$el).on('change',async function(){
					let id = $(this).find('option:selected').attr('data-id');
					if(!columnsObj[id]){
						await getModelInfo(id);
					}
					showForm(id);
				});
			}
			
			function renderCateSelector() {
				
				let option1 = '',option2 = '',option3 = '';
				for(let i in catesMap){
					option1 += `<option value="${i}">${i}</option>`;
					let cate2 = catesMap[i];
					for(let j in cate2){
						option2 += `<option value="${j}">${j}</option>`;
						let cate3 = cate2[j];
						for(let k in cate3){
							option3 += `<option value="${k}" data-id="${cate3[k]}">${k}</option>`
						}
					}
				}
				$('#cate1_selector',$el).html(option1);
				$('#cate2_selector',$el).html(option2);
				$('#cate3_selector',$el).html(option3)
				
				currentFamily.forEach((item,index) => {
					$('#cate'+(index + 1)+'_selector',$el).val(item.name).trigger('change');
				});
				console.log(currentFamily);
				
			}
			
			//动态改变modal的表单
			function showForm(id) {
				var formTmp = '';
				passwordIds.length = 0;
				columnsObj[id].forEach(function(item, i) {
					if(item.isshow == 0 && saveFlag) return;
					var require = item.isnull == 0 ? 'required' : '';
					var defaultValue = item.default_values ? item.default_values : '';
					var disabled = (item.default_values || (!saveFlag && item.isupd == 0) ? 'disabled' : '');
					var onlyValue = (item.isonly == 0? '':'data-only');
					var regExp = item.note1?'data-reg="'+item.note1+'"':'';
					

					if(item.texttype == 1) {//文本框
						formTmp += '<div class="control-group">\
										 <label for="'+ item.colname +'" class="control-label '+ require +'">'+ item.coldesc +'</label>\
										 <div class="controls">\
											 <input class="span9" type="text" '+ require +' '+ regExp +' '+ onlyValue +' id="'+ item.colname +'" name="'+ item.colname +'" placeholder="" value="'+ defaultValue +'" '+ disabled +' autocomplete="off"> <span class="help-inline hide"></span>\
										 </div>\
									 </div>';
					} else if(item.texttype == 2) {//下拉框
						formTmp += '<div class="control-group">\
										<label for="'+ item.colname +'" class="control-label '+ require +'">'+ item.coldesc +'</label>\
										<div class="controls">\
											<select id="'+ item.colname +'" name="'+ item.colname +'" value="'+ defaultValue +'" style="width: 204px;" '+ disabled +'>';
						
						var options = item.options.split('|');			
						options.forEach(function(item) {
							var items = item.split(',');
							formTmp += '<option value="'+ items[1] +'">'+ items[0] +'</option>';
						});
						
						formTmp += 	'</select> <span class="help-inline hide"></span></div></div>';
					} else if(item.texttype == 3) {//密码框
						formTmp += '<div class="control-group">\
							 <label for="'+ item.colname +'" class="control-label '+ require +'">'+ item.coldesc +'</label>\
							 <div class="controls">\
								 <input class="span9" type="text" '+ require +' id="'+ item.colname +'" name="'+ item.colname +'" placeholder="" value="'+ defaultValue +'" '+ disabled +' autocomplete="off"> <span class="help-inline hide"></span>\
							 </div>\
						 </div>';
						
						passwordIds.push(item.colname);
					}
				});
				
				$('#addobj #auto_form', $el).html(formTmp);
				$('#addobj #cpu_type', $el).trigger('change');
			}
			
			$('#configModal', $el).on('change', '#cpu_type', function(e){
				if(this.value == 'ssh'){
					$("#cpu_num", $el).val('22')
				}else if(this.value == 'sftp'){
					$("#cpu_num", $el).val('22')
				}else if(this.value == 'ftp'){
					$("#cpu_num", $el).val('21')
				}else {
					$("#cpu_num", $el).val('')
				}
			}).on('keydown', 'input[name="service_ip"]', function (e) {
				if (isValidIP($(this).val())) {
					$(this).siblings('span.help-inline').addClass('hide').text('')
				} else {
					$(this).siblings('span.help-inline').removeClass('hide').text('输入的IP不合符规则')
				}
			})
			
			function isValidIP(ip) {
			    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
			    return reg.test(ip);
			}
			
			function repeatTest(){
				var onlyFields = $('#configModal form', $el).find('[data-only]');
				if(onlyFields.length > 0){
					var isRepeatFlag = false;
					var aoColumns = $dataTable.settings()[0].aoColumns;
					for(let i = 0; i < onlyFields.length; i++){
						var field_name = $(onlyFields[i]).attr('name');
						var field_value = $(onlyFields[i]).val();
						var targetColumn = aoColumns.find(function(item,index){
							return item.data == field_name;
						});
						var idx = targetColumn?targetColumn['idx']:null;
						// 防止不存在列去校验唯一
						if(!idx){
							continue;
						}
						var columnDatas = Array.prototype.slice.call($dataTable.column(idx).data());
						if(!saveFlag && field_value != editData[field_name] && columnDatas.includes(field_value) || saveFlag && columnDatas.includes(field_value)){
							isRepeatFlag = true;
							$(onlyFields[i]).next().removeClass('hide').text("不可重复");
						}else{
							$(onlyFields[i]).next().addClass('hide');
						}
					}
					return isRepeatFlag;
				}else{
					return false;
				}
				
			}

			$('#addObj_confirm', $el).click(function() {
				//if(!validateFn($('#addobj #auto_form', $el))) return;
				// 判重
				if(repeatTest()){
					return;
				}
				$('#addobj #auto_form', $el).find('[disabled]').removeAttr('disabled');
				var data = $('#addobj #auto_form', $el).serializeArray();

				var params = {};
				
				data.forEach(function(item) {
					if($.trim(item.value)) {
						params[item.name] = item.value;
					}
				});

				hideModal();
				saveData(params);
			});
			
			function saveData(data) {
				let conf_id = saveFlag ? $('#cate3_selector>option:selected', $el).attr('data-id') : editCateId;
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_updateCmdbObject.do',
					data: {
						updateData: JSON.stringify(data),
						conf_id: conf_id
					}
				}).then(function(data) {
					data = data.funs;
					if(data == 1) {
						if(saveFlag) {
							app.alert('新增成功');
						} else {
							app.alert('修改成功');
						}
						getObjByCate(modelId);
					} else {
						if(saveFlag) {
							app.alert('新增失败');
						} else {
							app.alert('修改失败');
						}
					}
				});
			}
			
			function changeValidateMethod(id) {
				var data = [];
				columnsObj[id].forEach(function(item, i) {
					if(item.isnull == 0) {
						data.push({
							id: item.colname,
							filter: {
								require: true,
								type: ("note1" in item?"host":"")
							}
						});
					}
				});
				
				validateFn = function(context) {
					var validateResult = app.validate.validate({
						$context : context,
						data: data,
						correctCallback: function ($ele, correctMsg) {
							$ele.next().addClass('hide');
						},
						errorCallback : function ($ele, errMsg) {
							$ele.next().removeClass('hide').text(errMsg);
						}
					});
					return validateResult.bResult;
				}
			}
			
			/*
			 * 数据导入导出
			*/
				/*模版导出*/
				$('#tableModelExcelBtn', $el).click(function() {
					$.ajaxDownload('CmdbConfigManagerAction_getCmdbModule.do',{
						conf_id: defId
					});
				});

				// 数据导出
				$('#tableDataModelExcelBtn', $el).click(function() {
					$.ajaxDownload('CmdbConfigManagerAction_exportCmdbData.do',{
						conf_id: defId
					});
				});

				//数据导入
				$('#excel2table', $el).click(function() {
					$('#file_upload',$el).trigger('click');
				});
				$('#file_upload',$el).on('click',function(e){
					e.stopPropagation();
				});
				$('#file_upload',$el).on('change',function(){
					let fileObj = $('#file_upload', $el)[0].files[0];
					if(fileObj) {
						var form = new FormData();
						form.append('file', fileObj);
						form.append('conf_id', defId);
						var xhr = new XMLHttpRequest();
						xhr.open('post', './CmdbConfigManagerAction_importCmdbData.do', true);
						xhr.onload = function() {
							var data = JSON.parse(xhr.response).content;
							if(data.result == 1) {
								app.alert('导入成功');
								init();
							} else {
								app.alert(data.result);
							}
						}
						
						xhr.send(form);
					} else {
						app.alert('未选择文件');
					}
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