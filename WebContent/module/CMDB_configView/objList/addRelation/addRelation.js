define(['simtopo'],function(SimTopo){
	
	var app$el = null;
	
	return {
		
		load:function($el,scope,handler){
			var type = scope.type;
			var node = scope.node;
			var textGloabel = scope.text;
			var isModal = 1;
			console.log(scope);
			$("span.current-modal-text", $el).text(textGloabel);
			
			var $showDetail = $("#showDetail", $el);
			var $showDetail1 = $("#showRelaType", $el);
			var $showDetail2 = $("#showRelaTypeRule", $el);
			var $triangleUp = $("#triangleUp", $el);
			var $content = $(".ant-modal-body", $el);
			var $warpContent = $("#wrap1");
			var allNode = [];
			if (type === 1) {
				//给该节点添加下游关系
				$content.removeClass('bottom').addClass('top')
				$warpContent = $("#wrap2");
			} else {
				$content.removeClass('top').addClass('bottom')
			}
			
			let dmDefId = scope.node.dmDefId;
			let allRels = [];
			
			init();
			async function init () {
				let direction = type == 1 ? 'down' : 'up';
				let simtopo = new SimTopo($("#svgPointer", $el)[0], {round: type,direction: direction})
				simtopo.addNodes(node)
				simtopo.update()
				await getAllRelations()
				queryRelationModal()
				//queryRelation();
				
			}
			
			
			function getBoundingClientRect (ele) {
				return ele.getBoundingClientRect();
			}
			
			$(document).on("click", function (e) {
				$showDetail.attr('style','display: none');
				$showDetail1.attr('style','display: none');
				$showDetail2.attr('style','display: none');
			})
			
			app$el = $("#containerRelaEdit", $el);
			$("#containerRelaEdit", $el).delegate(".selected-nodes-wrap", "click", function (e) {
				e.stopPropagation();
				var bbox = getBoundingClientRect($(this)[0]);
				$(".ant-popover", $el).attr('style','display: none;');
				$showDetail.attr('style', `left: ${bbox.left}px;top: ${bbox.top + bbox.height}px;width: ${bbox.width}px;`);
			}).delegate("#typeRela", "click", function (e) {
				e.stopPropagation();
				var bbox = getBoundingClientRect($(this).parents('.select-wrap')[0]);
				$(".ant-popover", $el).attr('style','display: none;')
				$showDetail1.attr('style', `left: ${bbox.left}px;top: ${bbox.top + bbox.height}px;width: ${bbox.width}px;`);
				if ($(this).val().trim() === '') {
					$($showDetail1.find('h2[data-type="1"]')).trigger("click");
				} else {
					var id = this.dataset.relaid;
					var relflag = this.dataset.relflag;
					$($showDetail1.find('h2[data-type="'+relflag+'"]')).trigger("click");
					$showDetail1.find('li').removeClass('active');
					$('li[data-id="'+id+'"]', $showDetail1).addClass('active');
				}
			}).delegate("#typeRelaRule", "click", function (e) {
				e.stopPropagation();
				var bbox = getBoundingClientRect($(this).parents('.select-wrap')[0]);
				$(".ant-popover", $el).attr('style','display: none;')
				$showDetail2.attr('style', `left: ${bbox.left}px;top: ${bbox.top + bbox.height}px;width: ${bbox.width}px;`);
			}).delegate(".clearfix>li", "click", function (e) {
				e.stopPropagation();
				$(".prompt", $el).show();
				var text = $($(this).find('span.hide')[0]).text();
				$("p#infoNNN", $el).text(text);
				var bbox = getBoundingClientRect($(this)[0]);
				$triangleUp.attr('style', `left: ${bbox.left + (bbox.width >> 1) - 4}px;top: ${bbox.top + bbox.height + 6}px;`);
				var title = $(this).attr('title');
				$("#showRelaTypeRule li.active", $el).removeClass('active');
				$(this).addClass('active');
				$("#typeRelaRule", $el).val($(this).attr('title')).attr('data-id', this.dataset.id);
				setDisabledBtn();
				$showDetail2.attr('style','display: none');
			}).delegate("#relaType>h2","click", function(e) {
				e.stopPropagation();
				if ($(this).hasClass('active')) {
					return;
				} 
				$(this).addClass('active').siblings().removeClass('active');
				var type = parseInt(this.dataset.type);
				$("#showRelaType .content", $el).hide();
				if (type === 1) {
					$("#content1").show();
				} else if (type === 0){
					$("#content2").show();
				}
			}).delegate("#showRelaType li", "click", function (e) {
				e.stopPropagation();
				if ($(this).hasClass('rela-add-item')) {
					return;
				}
				if($(this).hasClass('rela-add')) {
					setInput();
					return;
				}
				$("#showRelaType li.active", $el).removeClass('active');
				$(this).addClass('active');
				$("#typeRela", $el).val($(this).attr('title')).attr('data-relaId', this.dataset.id).attr('data-relflag', this.dataset.relflag).attr('data-name', this.dataset.name).attr('data-ename', this.dataset.ename);
				setDisabledBtn();
				$showDetail1.attr('style','display: none');
			}).delegate("#showDetail li", "click", function (e) {
				e.stopPropagation();
				if ($(this).hasClass('disabled')) {
					return;
				}
				let id = $(this).attr('data-id');
				if ($(this).hasClass('active')) {
					$(this).removeClass('active');
					//setNodeEnable(this.dataset.id);
					removeObjFromList(id);
				} else {
					$(this).addClass('active');
					//setNodeDisable(this.dataset.id);
					let cate1 = $(this).attr('data-cate1');
					let cate2 = $(this).attr('data-cate2');
					let cate3 = $(this).attr('title');
					getObjList(id,cate1,cate2,cate3);
				}
				setSelectNode();
			}).delegate(".ant-btn-primary", "click", function (e) {
				saveRelation();
			}).delegate(".ant-btn-ghost", "click", function (e) {
				scope.closeModal && scope.closeModal();
			}).delegate(".select-container .content", "click", function (e) {
				e.stopPropagation();
				$($(this).find('input')).trigger('blur');
			}).delegate(".select-container .content li[data-relFlag='0'] i", "click", function (e) {
				e.stopPropagation();
				var relId = $(this).parents('li').attr('data-id');
				deleteRealByZero($(this).parents('li'), relId);
			}).delegate(".ant-popover input.ant-input-lg, .add-item-input input","click", function (e) {
				e.stopPropagation();
				$(this).trigger('focus');
			}).delegate(".ant-popover input.ant-input-lg","keyup", function (e) {
				e.stopPropagation();
				var val = $(this).val().trim();
				if (val !== '') {
					var $content = $(this).parents('.ant-popover-inner-content').find('.content');
					$.each($content, function () {
						if (!$(this).attr('style') || $(this).attr('style').indexOf('none') === -1) {
							var $li = $(this).find("li:not(.rela-add)");
							$.each($li, function () {
								if ($(this).attr('title').indexOf(val) !== -1)  {
									$(this).removeClass('hide')
								} else{
									$(this).addClass('hide')
								}
							})
						}
					})
				} else {
					$(".ant-popover-inner-content .content li", $el).removeClass('hide');
				}
			})
			
			async function deleteRealByZero (item, relDefId) {
				var servicename = 'cn.com.agree.aim.cmdb.service.modelmanage._cmdb_relation_define_manager';
				var method = 'rel_del';
				var sendData = {};
				sendData['relDefId'] = relDefId;
				var requestData = JSON.stringify(sendData);
				var ret = await ajaxWithAfa({servicename, method, requestData});
				if (ret) {
					app.alert('删除成功!');
					$(item).remove();
				}
			}
			
			function setInput () {
				var $item = $(`<li title="add-item" class="rela-add-item" style="margin-right: 10px;">
									<div class="add-item-input">
										<p class="trancate">新增关系</p>
										<input type="text" value="关系新增" />
									</div>
									<div class="add-item-opearte">
										<span class="fa fa-check" data-id="0" style="color: green;"></span>&nbsp;&nbsp;
										<span class="fa fa-times" data-id="1" style="color: red;"></span>
									</div>
							</li>`)
				$("#content2 ul", $el).append($item);
				$($item).on('click', '.add-item-opearte>span' ,async function (e) {
					e.stopPropagation();
					var id = parseInt(this.dataset.id);
					var val = $($item.find('input')).val();
					if (id === 0 && val !== '') {
						var servicename = 'cn.com.agree.aim.cmdb.service.modelmanage._cmdb_relation_define_manager';
						var method = 'rel_add';
						var sendData = {};
						sendData['relDefDesc'] = val;
						sendData['relDefName'] = app.global.getUniqueId();
						var requestData = JSON.stringify(sendData);
						var ret = await ajaxWithAfa({servicename, method, requestData});
						if (ret) {
							app.alert('新增成功!');
							$item.attr('title', val).attr('data-name', val).attr('data-ename', sendData['relDefName']).attr('data-relFlag', '0').attr('data-id', ret);
							$($($item).find('p')).html(val+'&nbsp;&nbsp;<i title="删除" class="fa fa-times"></i>&nbsp;');
							$item.attr('class', '');
							$(this).parents('.add-item-opearte').remove();
							$item.find('input').remove();
						}
					} else {
						$item.remove();
					}
				})
			}
			
			
			function setNodeDisable (id) {
				var son = findSon(id);
				var parent = findParent(id);
				var disabled = son.concat(parent);
				allNode = allNode.map(item => {
					if (item.cate_def_id !== id && disabled.some(dis => dis == item.cate_def_id)) {
						item['tmpDis'] = true;
						$($showDetail.find('li[data-id="'+item.cate_def_id+'"]')).addClass('disabled');
					}
					return item;
				})
			}
			
			function setNodeEnable (id) {
				var son = findSon(id);
				var parent = findParent(id);
				var enable = son.concat(parent);
				allNode = allNode.map(item => {
					if (item.cate_def_id !== id && enable.some(dis => dis == item.cate_def_id)) {
						item['tmpDis'] = false;
						if (item.flag === 1) {
							$($showDetail.find('li[data-id="'+item.cate_def_id+'"]')).removeClass('disabled');
						}
					}
					return item;
				})
			}
			
			function findSon(id) {
				var son = [];
				for(var i = 0 ; i < allNode.length ; i ++ ){
					if (allNode[i].cate_def_p_id == id) {
						son.push(allNode[i].cate_def_id);
						son.concat(findSon(allNode[i].cate_def_id));
					}
				}
				return son;
			}
			
			function findParent(id) {
				var parent = [];
				for(var i = 0 ; i < allNode.length ; i ++ ){
					if (allNode[i].id == id && id !== -1) {
						son.push(id);
						son.concat(findSon(allNode[i].cate_def_p_id));
					}
				}
				return parent;
			}
			
			function setSelectNode () {
				var $liActive = $("#showDetail li.active", $el);
				if ($liActive.length === 0) {
					$(".notice", $warpContent).show();
					$(".selected-nodes-content", $warpContent).hide();
				} else {
					$(".notice", $warpContent).hide();
					$(".selected-nodes-content", $warpContent).show();
				}
				var h = '';
				$.each($liActive, function () {
					h += `<div data-name="${$(this).attr('title')}" data-id="${this.dataset.id}" class="selected-nodes-item">
							<span class="text-no-wrap">${$(this).attr('title')}</span>
							<i class="fa fa-times"></i>
						</div>`;
				});
				console.log($warpContent);
				$($warpContent.find('.selected-nodes-content'), $el).html(h);
				//setDisabledBtn();
			}
			
			function setDisabledBtn() {
				if ($warpContent.find('.selected-nodes-item').length === 0) {
					$(".ant-btn-primary", $el).attr('disabled', 'disabled')
				} else if ($("#typeRela", $el).val().trim() === "") {
					$(".ant-btn-primary", $el).attr('disabled', 'disabled')
				} else if ($("#typeRelaRule", $el).val().trim() === "") {
					$(".ant-btn-primary", $el).attr('disabled', 'disabled')
				} else {
					$(".ant-btn-primary", $el).removeAttr('disabled')
				}
			}
			
			async function queryRelationModal(){
				var url = 'EventListAction_getObjectCategory.do';
				var param = {};
				var result = await ajaxWithAfa(url,param);
				
				let thisField = type == 1 ? 'target_cate_id' : 'source_cate_id';
				let otherField = type == 1 ? 'source_cate_id' : 'target_cate_id';

				let hasRelCates = [];
				allRels.forEach(item => {
					if(item[thisField] == dmDefId){
						hasRelCates.push(item[otherField]);
					}
				});
				
				allNode = JSON.parse(JSON.stringify(result.objectCate));
				var h = result.objectCate.map(item => {
					let disabled = hasRelCates.includes(item.categoryId) ? '' : 'disabled';
					return `<li class="${disabled}" title="${item.levelThreeName}" data-id="${item.categoryId}" data-cate2="${item.levelTwoName}" data-cate1="${item.levelOneName}" style="margin-right: 10px;">
					<div>
						<p class="trancate">${item.levelThreeName}</p>
					</div>
				</li>`
					
				}).join('');
				$($showDetail.find('.content>ul')[0]).html(h);
			}
			
			async function queryRelation() {
				var servicename = 'cn.com.agree.aim.cmdb.service.modelmanage._cmdb_relation_define_manager';
				var method = 'rel_query';
				var requestData = JSON.stringify({});
				var ret = await ajaxWithAfa({servicename, method, requestData});
				var h = '';
				var h2 = `<li title="新增" class="rela-add" style="margin-right: 10px;">
								<div class="rela-add">
									<p class="trancate"><i class="fa fa-plus"></i>&nbsp;&nbsp;新增</p>
								</div>
							</li>`;
				ret.forEach(item => {
					var tmp = `<li data-name="${item.relDefDesc}" data-ename="${item.relDefName}" data-relFlag="${item.relFlag ? '1': '0'}" title="${item.relDefDesc}" data-id="${item.relDefId}" style="margin-right: 10px;">
									<div>
										<p class="trancate">${item.relDefDesc}&nbsp;&nbsp;<i title="删除" class="fa fa-times"></i>&nbsp;</p>
									</div>
								</li>`
					if (item.relFlag) {
						h += tmp;
					} else {
						h2 += tmp;
					}
				})
				$("#content1>ul", $el).html(h);
				$("#content2>ul", $el).html(h2);
			}
			
			async function saveRelation() {
				var nodeList = [];
				var $list = $(".selected-nodes-content>div.selected-nodes-item", $warpContent);
				$.each($list, function () {
					var code = this.dataset.id;
					var name = this.dataset.name;
					var ename = this.dataset.ename;
					nodeList.push({code, name, ename})
				})
				var cate_id = node.id;
				var rel_id = $("#typeRela", $el).attr('data-relaid');
				var rel_type = $("#typeRelaRule", $el).attr('data-id');
				var up_down_flag = type;
				var cate_ename = node.ename;
				var rel_def_name = $("#typeRela", $el).attr('data-name')
				var rel_def_ename = $("#typeRela", $el).attr('data-ename')
				var servicename = 'cn.com.agree.aim.cmdb.service.modelmanage._cmdb_model_relation_define_manager';
				var method = 'dm_rel_add_batch';
				var requestData = JSON.stringify({nodeList, cate_ename, cate_id, rel_id, rel_def_name, rel_def_ename, rel_type, up_down_flag});
				var ret = await ajaxWithAfa({servicename, method, requestData});
				if (ret) {
					app.alert('新增成功！');
				}
				scope.closeModal && scope.closeModal();
			}
			
			
			function ajaxWithAfa(url,data){
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: url,
						data: data
					}).done(function(content) {
						resolve(content);
					})
				});
			}
			
			/*
			日志平台新增
			*/
			//删除已选三级分类
			$('.selected-nodes-content',$el).on('click','i.fa-times',function(e){
				e.stopPropagation();
				let id = $(this).parent().attr('data-id');
				$('#showDetail .content>ul>li[data-id="'+id+'"]',$el).removeClass('active');
				$(this).parent().remove();
				removeObjFromList(id);
			});
			//选择对象
			$('.selected-list',$el).on('click','>li',function(){
				$(this).toggleClass('active');
				let className = $(this).hasClass('active') ? 'fa fa-check-square' : 'fa fa-square-o';
				$(this).find('.fa').attr('class',className);
				renderText();
			});
			//全选对象
			$('#select_all',$el).on('click',function(){
				if($(this).hasClass('fa-check-square')){
					$(this).attr('class','fa fa-square-o');
					$('.selected-list>li',$el).removeClass('active');
				}else{
					$(this).attr('class','fa fa-check-square');
					$('.selected-list>li',$el).addClass('active');
				}
			});
			//搜索对象
			$('#obj_search',$el).on('keyup',function(){
				let val = $(this).val();
				$('.selected-list>li',$el).each((index,item) => {
					let name = $(item).find('.obj-name').text();
					name.includes(val) ? $(item).removeClass('hide') : $(item).addClass('hide');
				});
			});
			//保存
			$('#add_confrim',$el).on('click',function(){
				let selected = $('.selected-list>li.active',$el);
				let arr = [];
				selected.each((index,item) => {
					let $item = $(item);
					arr.push({
						id: $item.attr('data-objid'),
						relaid: $item.attr('data-relid'),
						relation_name_en: $item.attr('data-relename')
						
					});
				});
				if(arr.length == 0){
					app.alert('请选择对象');
					return;
				}
				let upFlag = type == 1 ? 2 : 1;
				let params = {
						upFlag: parseInt(upFlag),
						objId: node.id,
						nodeList: JSON.stringify(arr)
				};
				addObjRelation(params);
			});
			
			$el.on('click',function(){
				('.selected-list',$el).find('.baseinfo-wrap').remove();
			});
			
			$('#cancel_btn',$el).on('click',function(){
				$('#addRelation').removeClass('show-modal');
			});
			
			
			//查看对象明细
			$('.selected-list',$el).on('click','.obj-name',function(e){
				e.stopPropagation();
				let $li = $(this).parents('li');
				let objId = $li.attr('data-objid');
				$('.selected-list',$el).find('.baseinfo-wrap').remove();
				getBaseInfo(objId,$(this));
			});

			function getBaseInfo(id,$ele) {
				app.common.ajaxWithAfa({
					url:'AppConfigAction_getObjectDetail.do',
					data:{objId: id},
				}).then(function(content){
					let ret = content;
					renderBaseinfo(ret,$ele);
				});
			}
			
			function isObjectFn (o) {
				return Object.prototype.toString.call(o) === '[object Object]';
			}
			
			function renderBaseinfo(content,$ele) {
				let obj = content.obj;
				let count = 0;
				let html = ``;
				for(let i in obj){
					if(!isObjectFn(obj[i])){
						let value = obj[i];
						let label = obj['fieldLabels'][i];
						html += `<li><span class="label-text">${label}</span><span class="value-text">${value}</span></li>`;
					}
				}
				$ele.parent().append(`<ul class="baseinfo-wrap">${html}</ul>`);
			}
			
			async function getAllRelations() {
				allRels.length = 0;
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: 'CmdbConfigManagerAction_updateTopoCate.do',
						data: {flag: 0}
					}).done(function(content) {
						allRels = content.funs;
						resolve(content);
					})
				});
			}
			
			function getObjList(id,cate1,cate2,cate3) {
				getObject(cate1,cate2,cate3).then(res => {
					let arr = res.cate3Objects;
					addObjToList(arr);
				});	
			}
	
			function addObjToList(arr) {
				if(arr.length == 0){
					return;
				}
				let thisField = type == 1 ? 'target_cate_id' : 'source_cate_id';
				let otherField = type == 1 ? 'source_cate_id' : 'target_cate_id';
			
				let rel = allRels.filter(item => {
					return item[thisField] == dmDefId && item[otherField] == arr[0]['objectSummary']['categoryId'];
				});

				let relId = rel[0] && rel[0].id || '';
				let relName = rel[0] && rel[0].relation_name_zh || '';
				let relEname = rel[0] && rel[0].relation_name_en || '';
				let html = '';
				
				arr.forEach(item => {
					let actived = scope.hasRelation.includes(item.objectSummary.objectId) ? 'active' : '';
					let fa = actived ? 'fa fa-check-square' : 'fa fa-square-o';
					html += `<li class="${actived}" data-cateid="${item.objectSummary.categoryId}" data-objid="${item.objectSummary.objectId}" data-relid="${relId}" data-relename="${relEname}">
								<span><i class="${fa}"></i></span>
								<span><span class="obj-name">${item.objectSummary.objectName}</span></span>
								<span>${item.objectSummary.l1CateName}>${item.objectSummary.l2CateName}>${item.objectSummary.l3CateName}</span>
								<span class="relation-name">${relName}</span>
							</li>`;
				});
				$('.selected-list',$el).append(html);
				renderText();
			}

			function removeObjFromList(id) {
				$('.selected-list>li[data-cateid="'+id+'"]',$el).remove();
				renderText();
			}
			
			function renderText() {
				let actived = $('.selected-list>li.active',$el).length;
				$('.total-num',$el).text($('.selected-list>li',$el).length);
				$('.selected-num',$el).text(actived);
				actived > 0 ? $('#add_confrim',$el).removeAttr('disabled') : $('#add_confrim',$el).attr('disabled',true);
				
			}
			
			function getObject(levelOneName,levelTwoName,levelThreeName) {
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: 'AppConfigAction_getThirdCategoryObjects.do',
						data: {
							levelOneName: levelOneName,
							levelTwoName: levelTwoName,
							levelThreeName: levelThreeName
						}
					}).done(function(content) {
						resolve(content);
					})
				});	
			}
			
			function addObjRelation(params) {
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: 'CmdbConfigManagerAction_addObjRela.do',
						data: params
					}).done(function(content) {
						if(content.result){
							app.alert('保存成功');
							window.postMessage('add-success');
						}
						resolve(content);
						$('#addRelation').removeClass('show-modal');
					})
				});
			}
			
			
			
		},
		
		unload:function(handler){
			app$el && app$el.off('click').off('keydown').off('blur').off('focus');
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});