define(['stage','util','tool'],
	function(Stage, util, Tool){
	var cache = {}
    return {
        
        load:function($el,scope,handler){
        	let scopedashboardId = scope.dashboardId;

        	let tool = new Tool($el, {})
        	let appName = {};
        	var $eventModal = $("#eventModal", $el);
			var $intervalModal = $("#intervalModal", $el)
        	let dashBoard = function () {
        		this.$noData = $(".db-list-nodata", $el);
        		this.$list = $(".db-list-items", $el);
        		this.$dashName = $("#dashName", $el);
        		this.$dbListResize = $("#dbListResize", $el);
        		this.$addFirstPage = $("#addFirstPage", $el);
        		this.$addCharts = $("#addCharts", $el);
        		this.$exportCharts = $("#exportCharts", $el);
        		this.$addDashBorad = $("#addDashBorad", $el);
        		this.$addNewGroup = $("#addNewGroup", $el);
        		this.$addItem = $("#addItem", $el);
        		this.$bindAppModal = $("#bindAppModal", $el);
        		this.$backBtn = $("#backBtn", $el);
        		this.$menuTopo = $("#menuTopo", $el);
        		this.current = {};
        		this.init();
        	}
        	
        	let fn = dashBoard.prototype;
        	
        	fn.init = function () {
        		this.getDashList();
        		this.addEvent();
        		this.initStage();
        	}
        	
        	fn.initStage = function () {
        		this.stage = new Stage({
    				container: $("#dataBoard", $el)[0],
    				$el,
    				edit: false
    			})
        	}
        	
        	fn.getDashList = async function () {
        		let url = 'PanelAction_getAll.do';
        		let data = {};
        		let ret = await ajaxWithAfa(url, data);
        		let result = ret.result;
        		if (!result || !result.length) {
        			this.$noData.show();
        			return;
        		}
        		this.$noData.hide();
        		result = result.map(item => {
        			return `<li class="db-list-item" data-name="${item.name}" data-id="${item.id}">
        						<i class="fa fa-dashboard"></i>&nbsp;&nbsp;
					            <span>${item.name}</span>
					            <i class="fa fa-ellipsis-v item-ellipsis"></i>
					            <div class="item-tooltip">
					                <div class="item-tooltip-item">
					                    <span>名称:</span>
					                    <span class="overflowDisplay1">${item.name}</span>
					                </div>
					                <div class="item-tooltip-item">
					                    <span>注释:</span>
					                    <span class="overflowDisplay3"></span>
					                </div>
					            </div>
					         <li>`
        		})
        		this.$list.html(result);
        		
        		setTimeout( () => {
        			if (scopedashboardId) {
        				$('.db-list-item[data-id="'+scopedashboardId+'"]', this.$list).trigger('click');
        			}
        			scopedashboardId = null;
        		}, 500);
        	}
        	
        	fn.addEvent = function () {
        		let that = this;
        		this.$list.on('click', '.db-list-item', function (e) {
        			var panelId = this.dataset.id;
        			var name = this.dataset.name;
        			$(this).addClass('selected').siblings().removeClass('selected');
        			that.loadDashBoard(panelId);
        			that.$dashName.text(name);
        			that.setBtnDisable();
        			that.current = {
    					panelId,
    					name
        			}
        		}).on('click', '.item-ellipsis' ,function (e) {
        			e.stopPropagation();
        			var panelId = $(this).parents('.db-list-item').attr('data-id');
        			console.log(panelId)
        			that.delId = parseInt(panelId);
        			var pageX = e.pageX;
        			var pageY = e.pageY;
        			that.$menuTopo.show().attr('style', `left: ${pageX}px;top: ${pageY}px;`);
        		})
        		
        		this.$menuTopo.on('click','li', function (e) {
        			e.stopPropagation();
        			let id = parseInt(this.dataset.id);
        			that.$menuTopo.hide()
        			if (!that.delId) {
        				return;
        			}
        			switch(id) {
	        			case 0:
	        				that.delDash(that.delId);
	        				break;
        			}
        			that.delId = null;
        		})
        		
        		$(document.body).on('click', function (){
        			that.$menuTopo.hide();
        		})
        		
        		
        		this.$dbListResize.on("click", function(e) {
                    $(".db-list",$el).toggleClass("pickUp");
                });
        		this.$addCharts.on('click', function (e) {
        			that.saveEdit();
        			$(this).hide();
        			that.operate(false)
        			that.$addFirstPage.show();
        			that.$exportCharts.show();
        			that.$addItem.hide();
        			that.$backBtn.hide();
        		})
        		/*
        		 * 编辑
        		 * */
        		this.$exportCharts.on('click', function (e) {
        			that.operate(true)
        			$(this).hide();
        			that.$addCharts.show();
        			that.$addItem.show();
        			that.$addFirstPage.hide();
        			that.$backBtn.show();
        			that.loadDashBoard(that.current.panelId);
        		})
        		/**
        		 * 新增
        		 */
        		this.$addDashBorad.on('click', function () {
        			$("#modal2",$el).modal("show");
        		})
        		/**
        		 * 新增
        		 */
        		this.$addNewGroup.on('click', function () {
        			var groupName = $("#sname",$el).val();
        			that.addPanel(groupName)
        		})
        		/**
        		 * 新增组件
        		 */
        		this.$addItem.on('click', function () {
        			that.stage.addItem()
        		})
        		
        		/**
        		 * 发布交易
        		 */
        		this.$addFirstPage.on('click', function () {
        			that.$bindAppModal.modal('show');
        		})
        		/**
        		 * 返回
        		 */
        		this.$backBtn.on('click', function () {
        			that.operate(false)
        			that.$list.find('.db-list-item:eq(0)').trigger('click');
        		})
        		
        		/**
        		 * 发布弹窗
        		 */
        		let $appModal = this.$bindAppModal;
        		this.$bindAppModal.on("click",'.confirmBtn' ,async function () {
        			var $index = $("#tabsUrl>li.active", $el).index();
        			if ($index === 0) {
//        				var url = 'PanelAction_uploadPage.do';
//        				var panelBean = {
//    						path: "dataBoard#dataBoardSee",
//        					name: "我的仪表盘",
//        					id: that.current.panelId
//        				};
//        				var ret = await ajaxWithAfa(url, panelBean);
//        				if (ret.result) {
//        					app.alert('发布成功！');
//        				}
        				var url = 'PanelAction_addDashBoardPannel.do';
        				var panelBean = {
        					name: that.current.name,
        					id: parseInt(that.current.panelId),
        					path: '-'
        				};
        				var ret = await ajaxWithAfa(url, panelBean);
        				if (ret.result) {
        					app.alert('发布成功！');
        				}
        			} else {
        				if($('.apps-wrap>span.active',$el).length == 0){
        					app.alert('请选择需要绑定的应用系统');
        					return;
        				}
        				let panelId = Number($appModal.attr('data-panel-id'));
        				let relationList = Array.from($('.apps-wrap>span:not(.check-all).active',$el)).map(item => {
        					return{
        						sourceId: Number($(item).attr('data-id')),
        						panelId: that.current.panelId,
        						appBoradName: $('#panel_name',$appModal).val()
        					}
        				});
        				let params = {
    						relations: JSON.stringify(relationList),
    						panelId: that.current.panelId
        				};
        				
        				that.bindApp(params);
        			}
        			that.$bindAppModal.modal('hide');
        		})
        	}
        	
        	fn.delDash = async function (id) {
        		var url = 'PanelAction_delById.do';
				var ret = await ajaxWithAfa(url, {id});
				if (ret.result) {
					app.alert('删除成功');
					this.getDashList();
				}
        	}
        	
        	fn.bindApp = function(params) {
        		app.common.ajaxWithAfa({
					url:'PanelAction_addRelation.do',
					data: params
				}).done(function (data) {
					if(data.result){
						app.alert('发布到应用成功');
					}
				})
        	}
        	
        	fn.addPanel = async function (groupName) {
        		var url = 'PanelAction_add.do';
				var panelBean = JSON.stringify({
					name: groupName,
				});
				var ret = await ajaxWithAfa(url, {panelBean});
				if (ret.result) {
					app.alert('保存成功！');
					$("#modal2",$el).modal('hide');
					this.getDashList();
				}
        	}
        	
        	fn.operate = function  (edit) {
        		this.edit = edit;
        		this.stage && this.stage.destory();
        		this.stage = new Stage({
    				container: $("#dataBoard", $el)[0],
    				$el,
    				edit: edit
    			})
        	}
        	
        	fn.setParam = function (param) {
        		var $items = this.stage.getListsByArray(this.stage.children);
        		$items && $items.forEach(item => {
        			this.stage.refreshParam(param, item);
        		})
        	}
        	
        	fn.saveEdit = function () {
        		var dashboard = this.stage.getLists();
        		this.savePanel(dashboard);
        	}
        	
        	fn.savePanel = async function (dashboard) {
        		var url = 'PanelAction_add.do';
				var panList = dashboard.map(item => {
					item.config = JSON.stringify(item);
					item.name = item.name;
					item.objectId = '1';
					item.pic = '1';
					item.status = '0';
					item.type = item.type || 'echarts';
					return item;
				})
				var panelBean = JSON.stringify({
					name: this.current.name,
					objectId: '1',
					status: '0',
					id: parseInt(this.current.panelId),
					panList
				});
				var ret = await ajaxWithAfa(url, {panelBean});
				if (ret.result) {
					app.alert('保存成功！');
					$(this.$list.find('li.db-list-item.selected')).trigger('click');
				}
        	}
        	
        	fn.setBtnDisable = function () {
        		this.$addFirstPage.show();
        		this.$addCharts.hide();
        		this.$exportCharts.show();
        		this.$addItem.hide();
        		this.$backBtn.hide();
        	}
        	
        	fn.loadDashBoard = async function (panelId) {
        		if (!panelId) {
        			return;
        		}
        		let url = 'PanelChartAction_getAllByWhereEx.do';
        		let whereEx = JSON.stringify({
					panelId
				});
        		let ret = await ajaxWithAfa(url, {whereEx});
        		var lists = ret.result;
        		this.stage.removeAll();
				lists.forEach(opts => {
					this.stage.addItem(JSON.parse(opts.config));
				})
        	}
        	
        	let dash = new dashBoard();
        	
        	
        	function ajaxWithAfa(url, data){
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: url,
						data: data
					}).done(function(content) {
						resolve(content);
					})
				});
			}
        	
        	$("#closeContent", $el).on("click", function () {
            	util.showOrHideEdit($("#showEDitor", $el),'active');
            	if (cache['showContent']) {
                	app.dispatcher3.unload('showContent');
                }
            })
            
            function getEventItem (event = {}) {
        		var stage = dash.stage;
            	var clicktype = event.eventType || '0';
            	var $item = $("#copyItem", $el).clone().removeClass('copy').removeClass('hide').removeAttr('id');
            	$item.find('input[data-clicktype="'+clicktype+'"]').prop('checked','checked');
            	var eventComponents = stage.getEventComponents(app.currentEvent);
            	var eventSourceComponent = stage.getListsByArray([app.currentEvent]);
            	var $eventSourceComponent = $($item.find('select[name="eventSourceComponent"]')[0]);
            	var $eventComponents = $($item.find('select[name="eventComponents"]')[0]);
            	
            	var h = eventSourceComponent.map(item => {
            		return `<option value="${item.uuid}">${item.name}</option>`;
            	})
            	$eventSourceComponent.html(h);
            	
            	var h = eventComponents.map(item => {
            		let name = (item.rootNode ? item.rootNode.name + '-' : '') + item.name;
            		return `<option value="${item.uuid}">${name}</option>`;
            	})
            	$eventComponents.html(h);
            	
            	if (event.eventSourceComponent) {
            		$eventSourceComponent.val(event.eventSourceComponent);
            	}
            	if (event.eventComponents) {
            		$eventComponents.val(event.eventComponents);
            	}
            	return $item;
            }
            
            $eventModal.on("click", '#addEventList',  function (e, event) {
            	e.stopPropagation();
            	var $item = getEventItem(event);
            	$(this).before($item);
            	addEvent($item, event);
            }).on('click', '.confirmBtn', function (e) {
            	e.stopPropagation();
            	var $formList = $(".form-list:not(.copy)", $eventModal);
            	var eventList = [];
            	$.each($formList, function () {
            		var $item = $(this);
            		var eventType = $('input[name="eventType"]:checked', $item).attr('data-clicktype');
            		var eventAction = $('select[name="eventAction"]', $item).val();
            		var eventField = $('select[name="eventField"]', $item).val();
            		var panelList = $('select[name="panelList"]', $item).val();
            		var eventSourceComponent = $('select[name="eventSourceComponent"]', $item).val();
            		var eventComponents = $('select[name="eventComponents"]', $item).val();
            		var componentsField = $('select[name="componentsField"]', $item).val();
            		eventList.push({
            			eventType,
            			eventAction,
            			eventField,
            			panelList,
            			eventSourceComponent,
            			eventComponents,
            			componentsField
            		})
            	})
            	dash.stage.setEventList(eventList);
            })
            
            $intervalModal.on('click', '.confirmBtn', function (e) {
            	let componentTimer = $("#componentTimer", $el).val();
            	let stage = dash.stage;
            	let interSourceComponent = stage.getListsByArray([app.currentInterval]);
        		if (interSourceComponent && interSourceComponent.length) {
        			interSourceComponent[0].inter = componentTimer;
        		}
            })
            
            function addEvent ($item, event = {}) {
            	var stage = dash.stage;
            	$($item.find('select[name="eventSourceComponent"]')).on('change', function (e) {
            		var uuid = $(this).val();
            		var itemComponent = stage.getEventField(uuid);
            		var field = itemComponent.getEventField();
            		var h = field.map(item => {
            			return `<option value="${item.name}">${item.name}</option>`;
            		})
            		$($item.find('select[name="eventField"]')).html(h);
            		var eventAction = stage.getEventAction(itemComponent);
            		var h = eventAction.map(item => {
            			return `<option value="${item.value}">${item.name}</option>`;
            		})
            		$($item.find('select[name="eventAction"]')).html(h);
            		if (event.eventAction) {
            			$($item.find('select[name="eventAction"]')).val(event.eventAction);
            		}
            	})
            	
            	$($item.find('input[name="eventType"]')).on('change', function (e) {
            		var clicktype = this.dataset.clicktype;
            		if (clicktype === '0') {
            			$($item.find('select[name="panelList"]')[0]).parents('.mulit-controls').addClass('hide');
            		} else {
            			$($item.find('select[name="panelList"]')[0]).parents('.mulit-controls').removeClass('hide');
            		}
            	})
            	$($item.find('select[name="eventComponents"]')).on('change', function (e) {
            		var uuid = $(this).val();
            		var field = stage.getEventField(uuid).getEventField();
            		var h = field.map(item => {
            			return `<option value="${item.name}">${item.name}</option>`;
            		})
            		$($item.find('select[name="componentsField"]')).html(h);
            		if (event.componentsField) {
            			$($item.find('select[name="componentsField"]')).val(event.componentsField);
            		}
            	})
            	$($item.find('.delete-event-item')).on('click', function (e) {
            		$(this).parent().remove();
            	})
            	$($item.find('select[name="eventSourceComponent"]')).trigger('change');
            	$($item.find('select[name="eventComponents"]')).trigger('change');
            	$($item.find('input[name="eventType"]:checked')).trigger('change');
            }
            
            window.addEventListener('message', function (e) {
            	var data = e.data;
            	if (!!data.showmodal) {
            		if (cache['showContent']) {
                    	app.dispatcher3.unload('showContent');
                    }
                    cache['showContent'] = app.dispatcher3.load({
            			"moduleId" : 'dataBoard',
            			"section" : 'dashboard',
            			"frameRenderTo" : '#showContent',
            			"id" : 'showContent',
            			"params" : { // 给标签传递参数
            				data,
            				p$el: $el,
            				stage: dashBoard.stage,
            				getAccessLogSetting: getAccessLogSetting()
            			},
            			context: $el
                    })
            	} else if (!!data.eventConfig) {
            		if (!!app.currentEvent) {
            			$eventModal.modal('show');
            			restoreEvent()
            		}
            	} else if (!!data.showInterval) {
            		$intervalModal.modal('show');
            		restoreInterval();
            	}
            })
            
            function restoreEvent () {
        		$("#eventList", $eventModal).find('.form-list:not(.copy)').remove();
        		let stage = dash.stage;
        		let coms = stage.getListsByArray([app.currentEvent]);
        		coms.forEach(item => {
        			let event = item.event;
        			event && event.forEach(item => {
        				$("#addEventList", $eventModal).trigger('click', item);
        			})
        		})
        	}
        	
        	function restoreInterval () {
        		let stage = dash.stage;
        		let interSourceComponent = stage.getListsByArray([app.currentInterval]);
        		if (interSourceComponent && interSourceComponent.length) {
        			let inter = interSourceComponent[0].inter;
        			if (!!inter) {
        				$("#componentTimer", $el).val(inter);
        			}
        		}
        	}
            
            //获取三级分类
            getObjectCategory();
			function getObjectCategory(){
				return app.common.ajaxWithAfa({
					url: "ESSearchAction_getObjectCategory.do",
				}).done(function(data) {
					var data = data.result,
						appSystemData = data.app,
						assetObjectData = data.sys;
					if (!isHasCate3App(appSystemData)) {
						$("#searchBtn", $el).addClass('disabled');
						$("#searchKeyWord", $el).addClass('disabled');
					}
					putObjectData(appSystemData,'appSystem',true);
					putObjectData(assetObjectData,'assetObject');
					return $.Deferred().resolve();
				});
			}
			
			function putObjectData(appSystemData,id,tag){
				appSystemHtml = '<div>\
					<button type="button" class="resetCategory">重置</button>\
					<button type="button" class="closeCategory">关闭</button>\
					<button type="button" class="light confirmCategory">确定</button>\
				</div><div style="max-height: 63vh;overflow-y: auto; position: relative;margin-bottom:40px !important;">';
				if(appSystemData.length>0){
					appSystemData.forEach(function(first,index){
						appSystemHtml += "<div class='components-log-accessLogList'><h5 data-role='cate1' data-id='"+first.cateId+"' data-name='"+first.cateName+"'>"+ first.cateName+'</h5>';
						if(first.childs.length>0){
							first.childs.forEach(function(second,twoIndex){
								appSystemHtml += '<div><span data-role="cate2" data-id="'+second.cateId+'" data-name="'+second.cateName+'">'+second.cateName+'</span>';
								if(second.childs.length>0){
									appSystemHtml += '<p>';
									second.childs.forEach(function(third,twoIndex){
										appSystemHtml += '<span data-role="cate3" data-id="'+third.cateId+'" data-name="'+third.cateName+'">'+third.cateName+'</span>';
									})
									appSystemHtml += '</p>';
								}
								appSystemHtml += '</div>';
							})
						}
						appSystemHtml += "</div>";
					})
				}
				appSystemHtml += "</div>";
				$('#'+id,$el).html(appSystemHtml);
			}
			
			function isHasCate3App (appSystemData) {
				try {
					var cate2 = appSystemData[0].childs;
					if (!cate2 || cate2.length === 0) {
						return false;
					}
					var child = [];
					cate2.forEach(item => {
						child = child.concat(item.childs);
					})
					if (child.length === 0) {
						return false;
					}
					return true;
				} catch (e) {
					return false
				}
			}
			
			function getCateApp (appCate) {
				var app = [];
				appCate.forEach(item => {
					if (item.childs && item.childs.length > 0) {
						app = app.concat(getCateApp(item.childs))
					} else {
						app.push(item);
					}
				})
				return app;
			}
            
            /*
			 * 工具部分
			 * */
			$("#selectCate", $el).on("click", function (e) {
				e.stopPropagation();
				tool.showCateMenu($(this));
			})
			$("#selectCateDown", $el).on("click", function (e) {
				e.stopPropagation();
				$("#selectCate", $el).trigger('click');
			})
            
            function getAccessLogSetting() {
				var cate1App = [],cate2App = [],cate3App = [],
				cate1AppTmp = [],cate2AppTmp = [],cate3AppTmp = [],
				cate1 = [],cate2 = [],cate3 = [],
				appId = [];
				$('#appSystem .active[data-role=cate1]', $el).each(function () {
					cate1App.push({cateId:$(this).attr('data-id')});
				})
				$('#appSystem .active[data-role=cate2]', $el).each(function () {
					cate2App.push({cateId:$(this).attr('data-id')});
				})
				$('#appSystem .active[data-role=cate3]', $el).each(function () {
					cate3App.push({cateId:$(this).attr('data-id')});
				})
				
				$('#assetObject .active[data-role=cate1]', $el).each(function () {
					cate1.push({cateId:$(this).attr('data-id'),cateName: $(this).attr('data-name')});
				})
				$('#assetObject .active[data-role=cate2]', $el).each(function () {
					cate2.push({cateId:$(this).attr('data-id'),cateName: $(this).attr('data-name')});
				})
				$('#assetObject .active[data-role=cate3]', $el).each(function () {
					cate3.push({cateId:$(this).attr('data-id'),cateName: $(this).attr('data-name')});
				})
				
				/**
				 * 如果当前用户没有选择应用系统，那就默认上送全部的应用系统
				 * 江西银行需求 2019-03-06
				 * 修改人：范永超
				 */
				$('#appSystem *[data-role=cate1]', $el).each(function () {
					cate1AppTmp.push({cateId:$(this).attr('data-id')});
				})
				$('#appSystem *[data-role=cate2]', $el).each(function () {
					cate2AppTmp.push({cateId:$(this).attr('data-id')});
				})
				$('#appSystem *[data-role=cate3]', $el).each(function () {
					cate3AppTmp.push({cateId:$(this).attr('data-id')});
				})
				if (cate3App.length === 0 ) {
					cate1App = cate1AppTmp;
					cate2App = cate2AppTmp;
					cate3App = cate3AppTmp;
				}
				
				return JSON.stringify({
					category:{cate1:cate1,cate2:cate2,cate3:cate3},
					app:{cate1:cate1App,cate2:cate2App,cate3:cate3App}
				});
			}
			
			//可访问日志相关点击事件
			$('.components-log-container',$el).on('click',function(e){
				$('#dateSetectContent', $el).hide();
				e.stopPropagation();
			}).on('click','span,h5',function(){//选中三级分类
				if($(this).hasClass('disabled')){
					return;
				}
				$(this).toggleClass('active');
				saveCategory($(this));
			}).on('click','.closeCategory',function(){//关闭
				$(this).parent().parent().hide();
			}).on('click','.resetCategory',function(){//重置
				$(this).parent().parent().find('h5.active,span.active').removeClass('active');

				if($('#appSystem',$el).find('span.active,h5.active').length){//应用系统
					$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
				}else{
					$('#accessLogUl>li:eq(0)',$el).removeClass('choosed');
				}

				if($('#assetObject',$el).find('span.active,h5.active').length){//资产对象
					$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
				}else{
					$('#accessLogUl>li:eq(1)',$el).removeClass('choosed');
				}
			}).on('click','.confirmCategory',function(){//确定
				$(".components-log-container", $el).hide();
				var date = $('#dateSetectInput', $el).val().trim().split('~');
	    		var startTime = date[0];
	    		var endTime = date[1];
	    		dash && dash.setParam({
	    			cate: getAccessLogSetting(),
	    			startTime: startTime,
	    			endTime: endTime
	    		})
			})
			
			function saveCategory($this){ 
				var $parent = $this.parent();
				var dataRole = $this.attr('data-role');
				var active = $this.hasClass('active');
				if(dataRole == 'cate1'){
					if(active){
						$('[data-role=cate2],[data-role=cate3]', $parent).addClass('active');
					}else{
						$('[data-role=cate2],[data-role=cate3]', $parent).removeClass('active');
					}
				}else if(dataRole == 'cate2'){
					var parent = $this.parent().parent();
					if(active){
						$('[data-role=cate3]', $parent).addClass('active');
						parent.find('[data-role=cate1]').addClass('active');
					}else{
						 $('[data-role=cate3]', $parent).removeClass('active');
						 if(!parent.find('.active[data-role=cate2]').length){
						 	parent.find('[data-role=cate1]').removeClass('active');
						 }
					}
				}else if(dataRole == 'cate3'){
					var cate2 = $this.parent().prev();
					if(active){
						cate2.addClass('active');
						cate2.parent().siblings('h5').addClass('active');
					}else{
						if(!$this.siblings('.active[data-role=cate3]').length){
							cate2.removeClass('active');
						}

						if(!cate2.parent().parent().find('.active[data-role=cate3]').length){
							cate2.parent().siblings('h5').removeClass('active');
						}
					}
				}

				if($('#appSystem',$el).find('span.active,h5.active').length){//应用系统
					$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
				}else{
					$('#accessLogUl>li:eq(0)',$el).removeClass('choosed');
				}

				if($('#assetObject',$el).find('span.active,h5.active').length){//资产对象
					$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
				}else{
					$('#accessLogUl>li:eq(1)',$el).removeClass('choosed');
				}
			}
			
			$el.on("click", function (e) {
				if($(e.target).closest($('#dateSetectWarp', $el)).length == 0 && !$(e.target).is("th,i,tr") && $(e.target).closest($('.daterangepicker', $el)).length == 0){
					$('#dateSetectContent', $el).hide();
				}
			})
			
        	
        	// 日期选择
			$('#dateSetect', $el).on('click', function(event) {
				if($('#dateSetectContent', $el).css('display') == 'none'){
					$('#dateSetectContent', $el).show();
					$('#dateRangeTab>li.active', $el).click();
				}else{
					$('#dataRangeSetectBtn', $el).click();
				}
			});
			
			$('#dateRangeTab>li:eq(1)', $el).daterangepicker({
			    "timePicker": true,
			    "timePicker24Hour": true,
			    "timePickerSeconds": true,
			    "autoApply": true,
			    "parentEl": $el,
			    "locale": {
			        "direction": "ltr",
			        "format": "YYYY-MM-DD HH:mm:ss",
			        "separator": " - ",
			        "applyLabel": "确定",
			        "cancelLabel": "取消",
			        "fromLabel": "起始时间",
			        "toLabel": "结束时间",
			        "customRangeLabel": "自定义",
			        "daysOfWeek": ["日","一","二","三","四","五","六"],
			        "monthNames": ['一月', '二月', '三月', '四月', '五月', '六月',
	                  '七月', '八月', '九月', '十月', '十一月', '十二月'],
			        "firstDay": 1
			    },
			    "applyClass": "confirmBtn",
			    "cancelClass": "btn-default hide"
			}, function(start, end, label) {
			});
			
			$('#dateRangeTab>li:eq(1)', $el).on('show.daterangepicker',function(ev, picker) {
				ev.stopPropagation();
				$('.daterangepicker', $el).css({
					'margin-top': '-39px',
	    			'margin-left': '-12px'
				})
			});
			
			$('#dateRangeTab>li:eq(1)', $el).on('apply.daterangepicker',function(ev, picker) {
				ev.stopPropagation();
				$('#dataRangeSetectBtn', $el).click();
			});
			
			$('#quickRange', $el).on('click', 'li', function(event) {
				event.stopPropagation();
				if(!$(this).hasClass('active')){
					$(this).addClass('active').siblings().removeClass('active');
				}
				$('#dataRangeSetectBtn', $el).click();
			});
			
			
			$('#dataRangeSetectBtn', $el).on('click', function(event) {
	    		var index = $('#dateRangeTab>li.active',$el).index();
	    		if(!index){
	    			var func = $('#quickRange>li.active', $el).attr('data-func');
	    			var timeInterval = $('#quickRange>li.active', $el).text();
	    			if(func){
	    				var dates = getQuickTimeAndDate(func);
	    				$('#dateSetect', $el).text(timeInterval+'内');
	    				$('#dateSetectInput', $el).val(dates.sDate +'~'+ dates.eDate);
	    			}
	    		}else{
	    			var sDate = $('[name="daterangepicker_start"]', $el).val();
	    			var eDate = $('[name="daterangepicker_end"]', $el).val();
	    			$('#dateSetect', $el).text(sDate +'~'+ eDate);
	    			$('#dateSetectInput', $el).val(sDate +'~'+ eDate);
	    			$('#quickRange>li.active', $el).removeClass('active');
	    		}
	    		$(this).parents('.components-times-dateRangeChooseContent').hide();
	    		var date = $('#dateSetectInput', $el).val().trim().split('~');
	    		var startTime = date[0];
	    		var endTime = date[1];
	    		dash && dash.setParam({
	    			startTime,
	    			endTime,
	    			cate: getAccessLogSetting(),
	    		})
	    		event.stopPropagation();
	    	});
			
			$('#quickRange>li:eq(0)', $el).trigger('click');
			
			//下拉框选择后换算时间
			function getQuickTimeAndDate(name){
				// timeFlag
				var now;
				app.common.ajaxWithAfa({
					url: "ESSearchAction_getNowTime.do",
					async: false
				}).done(function(content){
					now = new Date(content.result);
				});
				var time_func = {
					"thisDay":(function(now){
						return {
							sDate:now.Format("yyyy-MM-dd 00:00:00"),
							eDate:now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"thisWeek":(function(now){
						var week_head = new Date(now.getTime());
						var day = now.getDay();// 今天的星期
						if(day > 0){
							week_head.setDate(now.getDate() - day + 1);
						}else{
							week_head.setDate(now.getDate() - 6);
						}
						return {
							sDate: week_head.Format("yyyy-MM-dd 00:00:00"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"thisMonth":(function(now){
						return {
							sDate: now.Format("yyyy-MM-01 00:00:00"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"thisYear":(function(now){
						return {
							sDate: now.Format("yyyy-01-01 00:00:00"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"oneHour":(function(now){
						var time = now.getTime() - 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"twelveHour":(function(now){
						var time = now.getTime() - 12 * 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"oneDay":(function(now){
						var time = now.getTime() - 24 * 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"oneWeek":(function(now){
						var time = now.getTime() - 7 * 24 * 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"halfMonth":(function(now){
						var time = now.getTime() - 15 * 24 * 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"oneMonth":(function(now){
						var time = now.getTime() - 30 * 24 * 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"threeMonth":(function(now){
						var time = now.getTime() - 90 * 24 * 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now),
					"allTime":(function(now){
						var time = 0;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(now)
				};
				return time_func[name];
			}
			
			$('.apps-wrap',$el).on('click','>span',function(){
				$(this).toggleClass('active');
				if($(this).hasClass('check-all')){
					if($(this).text() == '全选'){
						$(this).text('全不选');
						$('.apps-wrap>span',$el).addClass('active');
					}else{
						$(this).text('全选');
						$('.apps-wrap>span',$el).removeClass('active');
					}
				}
			});
			
			getAllApp();
			function getAllApp () {
				return app.common.ajaxWithAfa({
					url: 'ESSearchAction_getObjectCategory.do',
					data: {},
				}).done(function(content) {
					var appCate = content.result.app;
					let allApp = getCateApp(appCate);
					let html = `<span class="check-all">全选</span>`;
					allApp.forEach(item => {
						appName[item.cateId] = item.cateName;
						html += `<span data-id="${item.cateId}">${item.cateName}</span>`;
					});
					$('.apps-wrap',$el).html(html);
					return $.Deferred().resolve(content);
				});
			}
        	
        	
//        	
//            //当前被选中的groupID
//            var SelectedGroupId =  null;
//            var colDataGloabelData = [];
//			var colDataGloabel = [];
//			var formatSqlSearchData = null;
//
//            var scopegroupId = app.domain.get('groupId', 'groupId');
//            if(scopegroupId){
//                SelectedGroupId = scopegroupId;
//            }
//
//            //cache static
//            var CacheStatic = {};
//            // cache ulstatic
//            var CacheUlStatic = {};
//            
//            var CacheStaticType3 = {};
//		    /**
//             *   列表无数据时候
//             */
//            function listNoData(flag) {
//                var ele = $(".db-list-nodata",$el);
//                if (flag) {
//                    ele.css("display","block");
//                } else{
//                    var isShow = true;
//                    ele.css("display","none");
//                    var $li = $(".db-list-items",$el).children("li");
//                    for (var i =0; i< $li.length; i++) {
//                        if($($li[i]).css("display") !== "none") {
//                            isShow = false;
//                        }
//                    }
//                    if (isShow) {
//                        ele.css("display","block");
//                    } else{
//                        ele.css("display","none");
//                    }
//                }
//            }
//            /**
//             * 根据仪表盘信息生成 仪表盘列表
//             */
//            var generatorDashBoradList = function(data) {
//                var i = 0, length = data.length,
//                    temp = $("#db-list-tpl", $el).html();
//                if (length == 0) {
//                    listNoData(true);
//                    $(".db-list-items",$el).empty();
//                    return;
//                }
//                if (SelectedGroupId === null) {
//                    SelectedGroupId = data[0].groupId;
//                }
//                for (;i < length; i++) {
//                    if (SelectedGroupId == data[i].groupId) {
//                        data[i].Selected = true;
//                    } else {
//                        delete data[i].Selected;
//                    }
//                }
//                var template = Handlebars.compile(temp);
//                var html = template(data);
//                $(".db-list-items",$el).html(html);
//                listNoData(false);
//                showGroupDashBorad(SelectedGroupId);
//            }
//            /**
//             * 仪表盘列表点击后的函数回调
//             */
//            var dashBoradClick = function (e) {
//                e = e || window.event;
//                e.stopPropagation();
//                e.preventDefault();
//                if ($(this).hasClass("selected")) return;
//                SelectedGroupId = $(this).attr("groupId");
//                $(this).addClass("selected").siblings().removeClass("selected");
//                showGroupDashBorad(SelectedGroupId);
//            }
//            /**
//             * 显示对应分组的图表
//             */
//            var showGroupDashBorad = function (groupId) {
//                var isIndex = $(".db-list-item.selected",$el).attr('isIndex');
//                if(isIndex == '1'){
//                    $('#addFirstPage', $el).addClass('disabled');
//                }else{
//                    $('#addFirstPage', $el).removeClass('disabled');
//                }
//                var text = $(".db-list-item.selected",$el).children("span").text();
//                $(".db-content-header-title",$el).text(text);
//                api.getDashBoardByGroupId(groupId).then(function(data){
//                    var boradIdArr = [];
//                    var finalData = EtlData(data);
//                    generatorDashBoard(finalData[0]);
//                    boradIdArr = finalData[1];
//                    return $.Deferred().resolve(boradIdArr, finalData[0])
//                }).then(function(boradIdArr,items){
//                	var tmp = [];
//                	var itemsTmp = [];
//                	items.forEach(item => {
//                		if (item.item.statisticsType !== 3) {
//                			tmp.push(item.item.id)
//                		} else {
//                			itemsTmp.push(item.item);
//                		}
//                	})
//                    generatorCharts(tmp);
//                	if (itemsTmp && itemsTmp.length !== 0) {
//                		itemsTmp.forEach(item => {
//                    		CacheStaticType3Set(item, item.id)
//                    	})
//                	}
//                });
//            }
//            /**
//             *  生成echarts图表
//             */
//             var generatorCharts = function (boradIdArr) {
//                if (!boradIdArr || !boradIdArr.length) return;
//                if (Object.prototype.toString.call(boradIdArr) != "[object Array]"){
//                    boradIdArr = [boradIdArr];
//                }
//                var curSelected = SelectedGroupId;
//                api.getDashBoardData(boradIdArr).then(function(data){
//                    var keys = Object.keys(data);
//                    var aggs = null, paramData = null, options = null, borderEle = null;
//                    for (var i = 0; i< keys.length; i++){
//                        aggs = data[keys[i]];
//                        if(aggs && !$.isEmptyObject(aggs)){
//                        		paramData = JSON.parse(CacheStatic[keys[i]]).paramData;
//                            options = api.getEchartsOptionByParams(aggs, paramData);
//                            borderEle = $('[boardid = '+keys[i]+']', $el).find(".charts-item");
//                            if (curSelected ===  SelectedGroupId){
//                                if(options){
//                                    app.echarts.init(borderEle[0]).setOption(options);
//                                }else{
//                                    borderEle.html('<span style="color:#999;font-size:12px;font-weight:normal;">暂无数据～</span>');
//                                }
//                            }
//                        }else{
//                        		app.alert('title', '仪表盘数据获取异常', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
//                        }
//                    }
//                });
//            }
//
//            /**
//             * 切片数据 生成所需要的数据 返回
//             */
//            var EtlData = function(data){
//                var finalData = [], htmlData = [], boradIdData = [];
//                for (var i = 0; i < data.length; i++) {
//                    htmlData.push({
//                    	image: data[i].dashBoard.image,
//                        relation: data[i].relation,
//                        title: data[i].dashBoard.name,
//                        item: data[i].dashBoard
//                    });
//                    boradIdData.push(data[i].relation.boardId);
//                    CacheStatic[data[i].relation.boardId] = data[i].dashBoard.statistics;
//                }
//                Object.keys(CacheStatic).forEach(function(item){
//                    item = item - 0;
//                    if (!boradIdData.includes(item)){
//                         delete CacheStatic[item];
//                    }
//                });
//                finalData = [htmlData, boradIdData];
//                return finalData;
//            }
//            /**
//             * 生成 仪表盘对应的图表
//             */
//            var generatorDashBoard = function(data){
//                var temp = $("#dashBoradItem", $el).html();
//                var template = Handlebars.compile(temp);
//                var html = template(data);
//                $(".db-content-main", $el).html(html);
//            }
//            /**
//             * 点击保存为首页的回调
//             */
//            var addFirstPageCallBack = function (e) {
//                var $addFirstPage = $('#addFirstPage',$el);
//                if($addFirstPage.hasClass('disabled')){
//                    return;
//                }
//                var groupId= SelectedGroupId;
//                api.addFirstPage(groupId).then(function(data){
//                    if(data){
//                        app.alert('设置成功');
//                        $addFirstPage.addClass('disabled')
//                    }else{
//                        app.alert('设置失败');
//                    }
//                })
//            }
//            /**
//             * 点击添加图表后的回调
//             */
//            var addChartBtnCallBack = function(e){
//                e = e || window.event;
//                e.stopPropagation();
//                e.preventDefault();
//                var type = $(".cm-item-l.selected");
//                if (!type.length) {
//                    type = null;
//                } else {
//                    type = type.attr("type");
//                }
//                $("#modal",$el).modal("show");
//                queryUlList(type);
//            }
//            /**
//             * 查询工作表
//             * @param echartsType
//             */
//            var queryUlList = function(echartsType) {
//                api.getAllDashBoard(echartsType).then(function (data) {
//                    //缓存 es的参数数据
//                    for (var i = 0; i< data.length; i++) {
//                        CacheUlStatic[data[i].id] = data[i].statistics;
//                        if (CacheStatic[data[i].id] != null) {
//                            data[i].disabled = true;
//                        } else {
//                            data[i].disabled = false;
//                        }
//                        if (data[i].statisticsType === 3) {
//                        	CacheStaticType3[data[i].id] = data[i];
//                        }
//                    }
//                    $(".cm-item-block", $el).find('span').text(data.length + '个');
//                    var temp = $("#preViewChart" ,$el).html();
//                    var template = Handlebars.compile(temp);
//                    var html = template(data);
//                    $(".cm-item-ul", $el).html(html);
//                });
//            }
//            /**
//             * 新增按钮点击后的回调
//             */
//            var addNewChartToContent = function(){
//                var selectedEle = $(".cm-radio.selected" ,$el);
//                if (selectedEle.length  != 0) {
//                    var position = searchCandrop();
//                    var name = selectedEle.prev().children("span").text();
//                    var boradId = selectedEle.closest("li").attr("boradid");
//                    var image = selectedEle.next().children().attr("src");
//                    var options = CacheUlStatic[boradId];
//                    CacheStatic[boradId] = options;
//                    var data = [{
//                        relation: {
//                            boardId: boradId,
//                            width: 200,
//                            height: 200,
//                            x: position.x,
//                            y: position.y
//                        },
//                        title: name,
//                        image: image
//                    }];
//                    var temp = $("#dashBoradItem",$el).html();
//                    var template = Handlebars.compile(temp);
//                    var html = template(data);
//                    $(".db-content-main",$el).append(html);
//                    $("#modal",$el).modal("hide");
//                    if (CacheStaticType3[boradId]) {
//                    	CacheStaticType3Set(CacheStaticType3[boradId], boradId);
//                    } else {
//                    	generatorCharts(boradId);
//                    }
//                }
//            }
//            
//            function CacheStaticType3Set(item, boradId) {
//				var search = item.search;
//				var startTime = item.startTime;
//				var endTime = item.endTime;
//				var cate = JSON.parse(item.mustValue);	
//				var logIndexConfig = new loadChartsIndex();
//				var logType = 1;
//				var size = 10;
//				var from = 0;
//				var fieldName = JSON.parse(item.fieldName);
//				var echartsType1 = item.echartsType;
//				var tmpUrlData = {
//					cate,
//					search,
//					startTime,
//					endTime,
//					logType,
//					size,
//					from
//				}
//				app.common.ajaxWithAfa({
//					url: 'ESSearchAction_sqlSearchWithAggregationsParse.do',
//					data: tmpUrlData
//				}).done(function (data) {
//					var result = data.result;
//					if(result && !$.isEmptyObject(result)){
//						initPage(result);
//						logIndexConfig.init($('[boardid = '+boradId+']', $el).find(".charts-item")[0],colDataGloabelData);
//						reStoreConfig(fieldName, echartsType1, logIndexConfig);
//					}
//				});
//			}
//			
//			function reStoreConfig(fieldName, echartsType1, logIndexConfig) {
//				if (fieldName && fieldName.length !== 0) {
//					logIndexConfig.pushAllData(fieldName);
//				}
//				if (echartsType1) {
//					logIndexConfig.changeType(echartsType1+'');
//				}
//			}
//
//            /**
//             *  画布中寻找一块完整的空地（能够完整的容纳图表的大小）
//             *  算法待优化
//             */
//            function  searchCandrop() {
//               var x1 = 0, x2 = $(".db-content-main",$el).width(),
//                   y1 = 0, y2 = Number.POSITIVE_INFINITY;
//               var arr = [];
//               var index = null;
//               var nWidth = 200;
//               var padding = 20;
//               var minLeft = Number.POSITIVE_INFINITY, minTop = Number.POSITIVE_INFINITY,
//                   maxBottom = 0;
//               var curLeft =  null, curTop = null, curWidth = null, curHeight = null;
//               $(".instance-item", $(".db-content-main",$el)).each(function (index, item) {
//                   curLeft = parseInt($(item).css("left"));
//                   curTop = parseInt($(item).css("top"));
//                   curWidth = item.offsetWidth;
//                   curHeight = item.offsetHeight;
//                  if (minLeft > curLeft) {
//                      minLeft = curLeft;
//                  }
//                  if (minTop > curTop) {
//                      minTop = curTop;
//                  }
//                  if (maxBottom < curTop + curHeight){
//                      maxBottom = curTop + curHeight;
//                  }
//                   arr.push({
//                       left: curLeft,
//                       top: curTop,
//                       right: curLeft + curWidth,
//                       bottom: curTop + curHeight
//                    });
//               });
//               if (minLeft > nWidth + padding && minTop > nWidth + padding) {
//                    return {x: x1, y: y1};
//               }
//               return {
//                   x:0, y: maxBottom + padding
//               }
//            }
//
//            $("#sname, #annotation", $el).on('keydown', function (e) {
//				let text = $(this).val();
//				let id = $(this).attr('id');
//				if (id === 'sname') {
//					if (text.length > 50) {
//						$(this).val(text.substring(0,50));
//					}
//				}
//				if (id === 'annotation') {
//					if (text.length > 100) {
//						$(this).val(text.substring(0,100));
//					}
//				}
//			})
//            
//            var addDashBoradItem = function(e) {
//                e = e || window.event;
//                var groupName = $("#sname",$el).val(),
//                    remark = $("#annotation",$el).val();
//                if($.trim(groupName) == ''){
//                    $("#sname",$el).next().removeClass('hide').text("不能为空");
//                    return;
//                }else if($.trim(groupName).length > 15){
//                    $("#sname",$el).next().removeClass('hide').text("名称不能超过30个字符");
//                    return;
//                }else{
//                    $("#sname",$el).next().addClass('hide');
//                }
//                if ($("#modal2",$el).attr("type") === "add") {
//                    api.addDashBoardGroup(groupName, remark).then(function(data){
//                        if (data) {
//                            app.alert("新增仪表盘分组成功！");
//                            $("#modal2", $el).modal('hide');
//                            api.getDashBoardGroups().then(generatorDashBoradList);
//                        } else{
//                            app.alert("失败！" + data.errorMsg);
//                        }
//                    }).then(function(){
//                        $("#sname",$el).val("");
//                        $("#annotation",$el).val("");
//                    });
//                } else {
//                    api.updateGroupName(SelectedGroupId,groupName,remark).then(function(data){
//                        if (data) {
//                            app.alert("修改成功！");
//                            $("#modal2", $el).modal('hide');
//                            api.getDashBoardGroups().then(generatorDashBoradList);
//                        } else {
//                            app.alert("失败！" + data.errorMsg);
//                        }
//                    }).then(function(){
//                        $("#sname",$el).val("");
//                        $("#annotation",$el).val("");
//                    });
//                }
//
//            }
//            
//            api.getDashBoardGroups().then(generatorDashBoradList).then(function(){
//                showGroupDashBorad(SelectedGroupId);
//            });
//            $(".db-content-main", $el).on("mousedown", ".instance-item", function (e) {
//                e = e || window.event;
//                e.stopPropagation();
//                e.preventDefault();
//                var ele = this;
//                var containerWidth = $(".db-content-main", $el).width();
//                var containerHeight = $(".db-content-main", $el).height();
//                var eleWidth = $(ele).width();
//                var eleHeight = $(ele).height();
//                var padding = 22;
//                var maxLeft = containerWidth - eleWidth - padding;
//                   /* maxTop = containerHeight - eleHeight - padding;*/
//                $(ele).css("cursor", "move");
//                var curpos = {
//                    left: parseInt($(ele).css("left")),
//                    top: parseInt($(ele).css("top")),
//                    x: e.pageX,
//                    y: e.pageY,
//                    width: ele.offsetWidth,
//                    height: ele.offsetHeight
//                };
//                var newpos = {};
//                var offsetX = 0, offsetY = 0;
//                $(document).on("mousemove", function (e) {
//                    offsetX = e.pageX - curpos.x;
//                    offsetY = e.pageY - curpos.y;
//                    newpos.left = curpos.left + offsetX;
//                    newpos.top = curpos.top + offsetY;
//                    newpos.x = e.pageX;
//                    newpos.y = e.pageY;
//                    var filter = CollisionDetection(ele, newpos.left, newpos.top, curpos.width, curpos.height).filter(function(t){
//                        return t;
//                    }).length;
//                    if(filter !== 0){
//                        return;
//                    }
//                    if (newpos.left <= padding) {
//                        newpos.left = padding;
//                    }
//                    if (newpos.top <= 0) {
//                        newpos.top = 0;
//                    }
//                    if (newpos.left >= maxLeft) {
//                        newpos.left = maxLeft;
//                    }
//                  /*  if (newpos.top >= maxTop) {
//                        newpos.top = maxTop;
//                    }*/
//                    $(ele).css({
//                        left: newpos.left + 'px',
//                        top: newpos.top + 'px'
//                    });
//                    curpos = Object.assign(curpos, newpos);
//                });
//                $(document).on("mouseup", function (e) {
//                    $(ele).css("cursor", "");
//                    $(document).off("mousemove");
//                    $(document).off("mouseup");
//                });
//            });
//
//
//            $(".db-content-main", $el).on("mousedown", ".resize-arrow", function (e) {
//                e = e || window.event;
//                e.stopPropagation();
//                e.preventDefault();
//                var ela = $(this).closest(".instance-item")[0];
//                var footer = this.parentNode;
//                var instance = app.echarts.getInstanceByDom($(ela).find(".charts-item")[0]);
//                if (!instance) {
//                	instance = echarts.getInstanceByDom($(ela).find(".charts-item")[0]);
//                }
//
//                var padding = 22;
//                var maxWidth = $(".db-content-main", $el).width() + padding,
//                    minWidth = 200,
//                    minHeight = 200;
//                var curInfo = {
//                    x: e.pageX,
//                    y: e.pageY,
//                    width: ela.offsetWidth,
//                    height: ela.offsetHeight,
//                    left: parseInt($(ela).css("left")),
//                    top: parseInt($(ela).css("top"))
//                };
//                var offsetX = 0, offsetY = 0;
//                var newInfo = {};
//                $(footer).css("cursor", "nw-resize");
//                $(document).on("mousemove", function (e) {
//                    offsetX = e.pageX - curInfo.x;
//                    offsetY = e.pageY - curInfo.y;
//                    newInfo = {
//                        x: e.pageX,
//                        y: e.pageY,
//                        width: curInfo.width + offsetX,
//                        height: curInfo.height + offsetY,
//                        left: curInfo.left,
//                        top: curInfo.top
//                    };
//                    var filter = CollisionDetection(ela, curInfo.left, curInfo.top, newInfo.width, newInfo.height);
//                    var flag = filter.filter(function (t) {
//                        return t;
//                    }).length;
//                    if (flag !== 0){
//                        var left = 0, top =0, ele, flag = 0;
//                        filter.forEach(function(item, index){
//                            if (!item) return;
//                            ele = $(".instance-item", $el).eq(index);
//                            left = parseInt(ele.css("left"));
//                            top = parseInt(ele.css("top"));
//                            if (ele.width() + left >= maxWidth - 2 * padding) {
//                                flag ++;
//                                return;
//                            }
//                            /*Fixed me*/
//                            $(".instance-item", $el).eq(index).css({
//                                top: top + offsetY,
//                                left: left + offsetX
//                            });
//                        });
//                    }
//                    if (flag) return;
//                    if (newInfo.width <= minWidth) {
//                        newInfo.width = minWidth;
//                    }
//                    if (newInfo.height <= minHeight) {
//                        newInfo.height = minHeight;
//                    }
//                    if (newInfo.width + newInfo.left >= maxWidth) {
//                        return;
//                    }
//                   /* if (newInfo.height >= maxHeight) {
//                        newInfo.height = maxHeight;
//                    }*/
//                    $(ela).css({
//                        width: newInfo.width,
//                        height: newInfo.height
//                    });
//                    curInfo = Object.assign(curInfo, newInfo);
//                    instance && instance.resize();
//                });
//
//                $(document).on("mouseup", function (e) {
//                    $(footer).css("cursor", "auto");
//                    $(document).off("mousemove");
//                    $(document).off("mouseup");
//                });
//            });
//
//            $("#addFirstPage", $el).on('click',addFirstPageCallBack);
//
//            $("#addCharts",$el).on("click", addChartBtnCallBack);
//            $("#addDashBorad",$el).on("click", function () {
//                $("#modal2",$el).attr("type", "add");
//                $("#modal2",$el).find("h3").text("新建仪表盘");
//                $("#sname", $el).val("");
//                $("#annotation",$el).val("");
//                $("#modal2",$el).modal("show");
//            });
//            $(".db-list-items",$el).on("click", ".db-list-item", dashBoradClick);
//            
//            $(".db-list-edit", $el).on("click","li", function (e) {
//               e.preventDefault();
//               e.stopPropagation();
//               var type = $(this).attr("type");
//               switch (type){
//                   case "edit":
//                       var groupName = null, remark = null;
//                       $(".db-list-items",$el).children("li").each(function (index, item) {
//                           if( $(item).attr("groupId") == SelectedGroupId) {
//                                groupName = $(item).find(".overflowDisplay1").text();
//                                remark = $(item).find(".overflowDisplay3").text();
//                           }
//                       });
//                       $("#sname", $el).val(groupName);
//                       $("#annotation",$el).val(remark);
//                       $("#modal2",$el).attr("type", "edit");
//                       $("#modal2",$el).find("h3").text("修改仪表盘");
//                       $("#modal2",$el).modal("show");
//                       break;
//                   case "remove":
//                        app.confirmDialog({
//                            sTitle:"确认",       
//                            sType:"search",
//                            sContent:'确定删除仪表盘分组？',
//                            sBtnConfirm: '确定',
//                            sBtnCancel: '取消',
//                            fnConfirmHandler: function(){
//                                api.delGroupById(SelectedGroupId).then(function(data){
//                                    if (data) {
//                                        app.alert("删除仪表盘分组成功！");
//                                        SelectedGroupId = null;
//                                        api.getDashBoardGroups().then(generatorDashBoradList);
//                                    } else {
//                                        app.alert("删除仪表盘分组失败" + data.errorMsg);
//                                    }
//
//                                });
//                            },
//                            aArgs: []
//                        });
//                       break;
//                   case "copy":
//                        var groupName = null, remark = null;
//                        $(".db-list-items",$el).children("li").each(function (index, item) {
//                            if( $(item).attr("groupId") == SelectedGroupId) {
//                                 groupName = $(item).find(".overflowDisplay1").text();
//                                 remark = $(item).find(".overflowDisplay3").text();
//                            }
//                        });
//                       api.copyDashBoardGroup(SelectedGroupId, groupName+'的副本', remark).then(function (data) {
//                           if(data){
//                                app.alert("复制仪表盘分组成功！");
//                                api.getDashBoardGroups().then(generatorDashBoradList);
//                           }else{
//                                app.alert("复制仪表盘分组失败" + data.errorMsg);
//                           }
//                       })
//                       break;
//                   default:
//                       app.alert("未知的类型.");
//               }
//                $(".db-list-edit", $el).css("display","none");
//            });
//            
//            $("#dbSearch",$el).on("input", _.debounce(function(){
//                var val = $(this).val();
//                var dblist = $(".db-list-item", $el);
//                var itemValue = '';
//                dblist.each(function(index, item) {
//                   itemValue = $(item).children("span").text();
//                   if (itemValue.match(val)) {
//                       $(item).css("display", "");
//                   } else {
//                       $(item).css("display", "none");
//                   }
//                });
//                listNoData();
//            },500));
//
//            $(".db-content-main", $el).on("click", ".download", function () {
//                var el = $(this).closest(".instance-item")[0];
//                var canvas = exportsOneCharts(el);
//                var title = $(el).find(".item-title").text();
//                var a = document.createElement("a");
//                a.setAttribute("download", title);
//                a.setAttribute("href", canvas.toDataURL("image/png"));
//                a.style.display = "none";
//                document.body.appendChild(a);
//                a.click();
//                document.body.removeChild(a);
//            });
//
//            $("#addNewGroup", $el).on("click", addDashBoradItem);
//
//            $("#dbListResize",$el).on("click", function(e) {
//                $(".db-list",$el).toggleClass("pickUp");
//            });
//
//            $("#addItemCharts",$el).on("click", addNewChartToContent);
//
//            $(".cm-item-content",$el).on("click",".cm-item-l", function(){
//                if($(this).hasClass("selected")){
//                    return;
//                }
//                $(".cm-item-block",$el).find("input").val("");
//                $(this).addClass("selected").siblings().removeClass("selected");
//                var type = $(this).attr("type");
//                queryUlList(type);
//            });
//            $(".cm-item-block input",$el).on("input", _.debounce(function(){
//                var val = $(this).val();
//                var itemValue = '';
//                var index = 0;
//                $(".cm-item-ul",$el).children('li').each(function (i, item) {
//                    itemValue = $(item).children().eq(0).find("span").text();
//                    if (itemValue.match(val)){
//                        index ++;
//                        $(item).css("display","");
//                    } else {
//                        $(item).css("display","none");
//                    }
//                });
//                $(".cm-item-block", $el).find("span").text(index + '个');
//            }, 500));
//
//            $(".db-list-items",$el).on("click",".item-ellipsis", function(e) {
//                e = e || window.event;
//                e.stopPropagation();
//                e.preventDefault();
//                var y = $(this).parent()[0].offsetTop + 25;
//                $(".db-list-edit",$el).css({
//                    display: "block",
//                    top: y
//                });
//            });
//
//            $(".cm-item-ul", $el).on("click", ".cm-radio", function(e) {
//                if ($(this).hasClass("disabled") || $(this).hasClass("selected")) {
//                    return;
//                }
//                $(".cm-radio",$el).removeClass("selected");
//                $(this).addClass("selected");
//            });
//
//            $(".db-content-main",$el).on("click",".fa-trash", function(e){
//                e = e || window.event;
//                e.stopPropagation();
//                e.preventDefault();
//                var ele = $(this).closest(".instance-item");
//                app.confirmDialog({
//                    sTitle:"",
//                    sType:"warn",
//                    sContent: '是否删除当前图表？',
//                    sBtnConfirm: '确定',
//                    sBtnCancel: '取消',
//                    fnConfirmHandler: function(){
//                        ele.remove();
//                    },
//                    fnCancelHandler: null
//                });
//            });
//            $(".db-content-main",$el).on("click",".fa-reply", function(e){
//                e = e || window.event;
//                e.stopPropagation();
//                e.preventDefault();
//                var ele = $(this).closest(".instance-item");
//                var boradId = ele.attr("boardid");
//                app.dispatcher.load({
//                   title: '日志搜索',
//                   moduleId: 'logResultCheck',
//                   section: 'logSearchDetail',
//                   id: boradId,
//                   params: {
//                        param:{
//                            dashboardId: boradId
//                        }
//                   },
//                   context: $el
////                });
//            });
//         
//            $("#canelBtn", $el).on("click", function () {
//                app.confirmDialog({
//                    sTitle:"是否取消当前仪表盘的编辑",
//                    sType:"warn",
//                    sContent: '取消将会重置当前仪表盘，是否继续？',
//                    sBtnConfirm: '确定',
//                    sBtnCancel: '取消',
//                    fnConfirmHandler: function(){
//                        showGroupDashBorad(SelectedGroupId);
//                    },
//                    fnCancelHandler: null
//                });
//            });
//
//            $("#saveBtn", $el).on("click", function(){
//                var groupId = SelectedGroupId;
//                var relations = [];
//                $(".instance-item", $el).each(function(index, item){
//                    relations.push({
//                        boardId: item.getAttribute("boardid"),
//                        width: item.offsetWidth,
//                        height: item.offsetHeight,
//                        x: item.offsetLeft,
//                        y: item.offsetTop
//                    });
//                });
//                relations = JSON.stringify(relations);
//                api.addDashBoardRelation(groupId, relations).then(function (data) {
//                    if (data) {
//                        app.alert("保存成功！");
//                    } else {
//                        app.alert("保存失败："+ data.errorMsg);
//                    }
//                });
//            });
//
//            $("#exportCharts",$el).on("click", exportAllCharts);
//
//            $(document).on("click", function(){
//                $(".db-list-edit",$el).css("display", "none");
//            });
//            /**
//             * 导出指定图表
//             */
//             function exportsOneCharts(el) {
//                var canvas = document.createElement("canvas");
//                var width = el.offsetWidth,
//                    height = el.offsetHeight,
//                    titleSize = 16,
//                    titleHeight = 20,
//                    padding = 25;
//                var context = canvas.getContext("2d");
//
//                var dpr = window.devicePixelRatio;
//                var image = $(el).find("canvas")[0],
//                    title = $(el).find(".item-title").text();
//                if(image){
//                    var imageWidth = image.getAttribute("width"),
//                    imageHeight = image.getAttribute("height");
//                    canvas.width = width * dpr;
//                    canvas.height = height * dpr;
//                    context.save();
//                    context.fillStyle = "#fff";
//                    context.fillRect(0, 0, canvas.width, canvas.height);
//                    context.fill();
//                    context.restore();
//                    context.font = "bold 16px Arial";
//                    context.fillText(title, padding, padding);
//                    context.drawImage(image, padding, padding + titleHeight, imageWidth, imageHeight);
//                }
//                return canvas;
//             }
//             // 导出所有的图表
//             function exportAllCharts() {
//                var $container = $(".db-content-main",$el);
//                var padding  = 22;
//                var header = 56;
//                var width = $container.width(), height = $container.height(), scrollHeight = $container.scrollTop();
//                var title = $(".db-content-header-title").text();
//                var canvas = document.createElement("canvas");
//                var context = canvas.getContext('2d');
//                var dpr = window.devicePixelRatio;
//                    canvas.width = width * dpr;
//                    canvas.height = (header + height + scrollHeight) * dpr;
//                var instanceCharts = $(".instance-item", $container);
//                context.save();
//                context.fillStyle = "#F5F5FA";
//                context.fillRect(0, 0, canvas.width, canvas.height);
//                context.fill();
//                context.restore();
//                context.font = "bold 16px Arial";
//                context.fillText(title, padding, padding);
//                var itemX = null, itemY = null, image = null;
//                for(var i = 0; i< instanceCharts.length; i++){
//                    itemX = instanceCharts[i].offsetLeft * dpr;
//                    itemY = instanceCharts[i].offsetTop * dpr;
//                    image = exportsOneCharts(instanceCharts[i]);
//                    context.drawImage(image, itemX , itemY + header, image.width, image.height);
//                }
//                 var a = document.createElement("a");
//                 a.setAttribute("download", title);
//                 a.setAttribute("href", canvas.toDataURL("image/png"));
//                 a.style.display = "none";
//                 document.body.appendChild(a);
//                 a.click();
//                 document.body.removeChild(a);
//
//             }
//
//            /**
//             * 碰撞检测
//             *
//             */
//            function CollisionDetection(el,willX, willY, willWidth, willHeight) {
//                var allInstance = $(".instance-item", $el);
//                var dragBoradId = $(el).attr("boardid");
//                var item = null;
//                var flag = [];
//                for (var i = 0; i < allInstance.length; i++) {
//                    item = allInstance[i];
//                    if (dragBoradId != $(item).attr("boardid")) {
//                        if ( (willX + willWidth < item.offsetLeft || willX > item.offsetLeft + item.offsetWidth ) || (willY + willHeight < item.offsetTop || willY > item.offsetTop + item.offsetHeight)) {
//                            flag.push(false);
//                        } else {
//                            flag.push(true);
//                        }
//                    } else {
//                        flag.push(false);
//                    }
//                }
//                return flag;
//            }
//            
//            function sqlUnity(sqlSearchData) {
//				var cols = [];
//				var colData = [];
//				var data = sqlSearchData[sqlSearchData.fieldName];
//				if (data && data.length > 0) {
//					var tmp = Object.keys(data[0]).map(item => {
//						return {
//							data: item.replace(/\./g,'-'),
//							title: item.replace(/\./g,'-'),
//						}
//					})
//					colData = data;
//					colData = colData.map((item, index) => {
//						item.index = index+1;
//						for(var key in item) {
//							item[key.replace(/\./g,'-')] = item[key];
//							if (item[key].name) {
//								item[key] = item[key].name;
//							}
//						}
//						return item;
//					})
//					cols.push(...tmp);
//					colDataGloabel = cols;
//					colDataGloabel = colDataGloabel.slice(1);
//					colDataGloabelData = colData;
//				}
//			}
//            
//            function initPage(sqlSearchData) {
//				if (sqlSearchData.fieldName === 'agg') {
//					sqlUnity(sqlSearchData);
//					return false;
//				}
//				let cols = [];
//				let colData = [];
//				let hasAggregations = false;
//				formatSqlSearchData= StatisticsEchartsTool.formatTableData(sqlSearchData);
//				if (!hasAggregations) {
//					formatSqlSearchData.forEach(item => {
//						if (item.hits && Array.isArray(item.hits)) {
//							try {
//								let data = item.hits;
//								let tmp = data[0]._source;
//								let flag = false;
//								for(var key in tmp) {
//									cols.push({
//										data: key.replace(/\./g,'-'),
//										title: key.replace(/\./g,'-'),
//									})
//								}
//								colData = data.map(item => {
//									return item._source;
//								});
//								colData = colData.map((item, index) => {
//									item.index = index+1;
//									for(var key in item) {
//										item[key.replace(/\./g,'-')] = item[key];
//										if (item[key].name !== null && item[key].name !== undefined) {
//											item[key] = item[key].name;
//										}
//									}
//									return item;
//								})
//							} catch (e) {
//								console.log(e);
//							}
//						}
//					})
//				}
//				
//				colData = colData.map(data => {
//					cols.forEach(item => {
//						if (item.data !== 'index' && (data[item.data] === null || data[item.data] === undefined)) {
//							data[item.data] = "";
//						}
//					})
//					return data;
//				})
//				
//				colDataGloabel = cols;
//				colDataGloabel = colDataGloabel.slice(1);
//				colDataGloabelData = colData;
//			}

		},
		
		unload:function(handler){
			app.domain.clearScope('groupId');
        },
        
        pause:function($el,scope,handler){
            app.domain.clearScope('groupId');
		},
		
		resume:function($el,scope,handler){
            var domainGroupId = app.domain.get('groupId', 'groupId');
			if(domainGroupId){
                $(".db-list-items", $el).find('[groupid="'+ domainGroupId +'"]').trigger('click');
            }

		}
		
	}
});
