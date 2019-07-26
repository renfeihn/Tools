define(['stage','util','EventMiddle', 'tool'],function(Stage, util, EventMiddle, Tool){
	var cache = {};
	return {
		load:function($el,scope,handler){
			var stage = new Stage({
				container: $("#dataBoard", $el)[0],
				$el,
				edit: true
			})
			var $eventList = $("#eventList", $el);
			var $saveDashModal = $("#saveDashModal", $el);
			var $copyItem = $("#copyItem", $el);
			var $eventModal = $("#eventModal", $el);
			var $intervalModal = $("#intervalModal", $el)
			var eventMiddle = new EventMiddle($("#eventContainer", $el), {
				
			});
			var tool = new Tool($el, {})
			
			
			/*
			 * 工具部分
			 * */
			$("#selectCate", $el).on("click", function (e) {
				e.stopPropagation();
				tool.showCateMenu($(this));
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
			// 点击ul,隐藏日期选择
			$('#dateRangeTab', $el).on('click', function(event) {
				if(event.target == this){
					$('#dateSetectContent', $el).hide();
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
				$('.daterangepicker', $el).css({
					'margin-top': '-39px',
	    			'margin-left': '-1px'
				})
			});
			
			$('#dateRangeTab>li:eq(1)', $el).on('apply.daterangepicker',function(ev, picker) {
				$('#dataRangeSetectBtn', $el).click();
			});
			
			$('#quickRange', $el).on('click', 'li', function(event) {
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
//	    		stage.updateParam({
//	    			startTime: $('#dateSetectInput', $el).val().split('~')[0],
//	    			endTime: $('#dateSetectInput', $el).val().split('~')[1],
//	    		})
	    		$(this).parent().parent().hide();
	    		event.stopPropagation();
	    	});
			
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
			
			getObjectCategory().then(function () {
				
			})
			
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
			
			//获取三级分类
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
			
			function getAppId() {
				appId = [];
				$('#appSystem .active[data-role=cate3]', $el).each(function () {
					appId.push($(this).attr('data-id'));
				})
				return appId;
			}
			
			$('.components-log-accessLogContent',$el).on('click','span,h5',function(e){//选中三级分类
				e.stopPropagation();
				if($(this).hasClass('disabled')){
					return;
				}
				$(this).toggleClass('active');
				saveCategory($(this));
			}).on("click", '.confirmCategory' ,function (e) {
				e.stopPropagation();
				var appIds = getAppId();
				var cate = getAccessLogSetting();
				stage.updateParam({
					appIds,
					cate
				});
				tool.hide();
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
			
			/*
			 * 工具部分 结束
			 * */
			
			var id = scope.dashboardId;
			var name = scope.name;
			$("#name", $el).val(name);
			setTimeout(function () {
				findPanel(id);
			}, 500)
//			function loadStroge() {
//				var dashboard = JSON.parse(localStorage.getItem('dashboard'));
//				dashboard.forEach(item => {
//					stage.addItem(item);
//				})
//			}
			
			async function findPanel(panelId) {
				var url = 'PanelChartAction_getAllByWhereEx.do';
				var whereEx = JSON.stringify({
					panelId
				});
				var ret = await ajaxWithAfa(url, {whereEx});
				var lists = ret.result;
				lists.forEach(opts => {
					stage.addItem(JSON.parse(opts.config));
				})
			}
			
			
			$("#addComponents", $el).on("click", function (e, opts) {
				e.stopPropagation();
				stage.addItem();
			})
			
			$("#saveComponents", $el).on("click", function (e) {
				e.stopPropagation();
				$saveDashModal.modal('show');
				var dashboard = stage.getLists();
				localStorage.setItem('dashboard', JSON.stringify(dashboard));
			})
			
			$saveDashModal.on("click", '.confirmBtn', function (e) {
				var dashboard = stage.getLists();
				var name = $("#name", $saveDashModal).val();
				if (name.trim() !== '') {
					savePanel(dashboard, name);
				}
			})
			async function savePanel(dashboard, name) {
				var url = 'PanelAction_add.do';
				var panList = dashboard.map(item => {
					item.config = JSON.stringify(item);
					item.name = item.name;
					item.pic = '';
					item.type = item.type || 'echarts';
					return item;
				})
				var panelBean = JSON.stringify({
					name: name,
					objectId: '100071',
					status: '1',
					id: scope.dashboardId,
					panList
				});
				var ret = await ajaxWithAfa(url, {panelBean});
				if (ret.result) {
					app.alert('保存成功！');
				}
			}
			
            $("#closeContent", $el).on("click", function () {
            	util.showOrHideEdit($("#showEDitor", $el),'active');
            	if (cache['showContent']) {
                	app.dispatcher3.unload('showContent');
                }
            })
            
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
            				stage,
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
            
            /**
             * 定时器部分
             */
            $(".confirmBtn", $intervalModal).on('click', function (e) {
            	var timer = $("#componentTimer", $intervalModal).val().trim();
            	if (timer === '') {
            		timer = 0;
            	}
            	timer = parseInt(timer);
            	stage.setTimer(timer);
            })
            
            function restoreInterval() {
            	var timer = stage.getRefresh();
            	$("#componentTimer", $intervalModal).val(timer);
            }
            
            /**
             * 事件部分
             */
            
            function restoreEvent () {
            	$("#eventList", $eventModal).find('.form-list:not(.copy)').remove();
            	var eventList = stage.getCurrentEventList();
            	eventList.forEach(event => {
            		$("#addEventList", $eventModal).trigger('click', event);
            	})
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
            		var eventComponents = $('select[name="eventComponents"]', $item).val();
            		var componentsField = $('select[name="componentsField"]', $item).val();
            		eventList.push({
            			eventType,
            			eventAction,
            			eventField,
            			panelList,
            			eventComponents,
            			componentsField
            		})
            	})
            	stage.setEventList(eventList);
            })
            
            function getEventItem (event = {}) {
            	var clicktype = event.eventType || '0';
            	var $item = $("#copyItem", $el).clone().removeClass('copy').removeClass('hide').removeAttr('id');
            	$item.find('input[data-clicktype="'+clicktype+'"]').prop('checked','checked');
            	/*$($item.find('select[name="panelList"]')[0]).parents('.mulit-controls').addClass('hide');*/
            	var eventAction = stage.getEventAction();
            	var eventField = stage.getEventField();
            	var eventComponents = stage.getEventComponents();
            	var $eventAction = $($item.find('select[name="eventAction"]')[0]);
            	var $eventField = $($item.find('select[name="eventField"]')[0]);
            	var $eventComponents = $($item.find('select[name="eventComponents"]')[0]);
            	var h = eventAction.map(item => {
            		return `<option value="${item.value}">${item.name}</option>`;
            	})
            	$eventAction.html(h);
            	var h = eventField.map(item => {
            		return `<option value="${item.name}">${item.name}</option>`;
            	})
            	$eventField.html(h);
            	var h = eventComponents.map(item => {
            		return `<option value="${item.uuid}">${item.name}</option>`;
            	})
            	$eventComponents.html(h);
            	if (event.eventAction) {
            		$eventAction.val(event.eventAction);
            	}
            	if (event.eventComponents) {
            		$eventComponents.val(event.eventComponents);
            	}
            	return $item;
            }
            
            function addEvent ($item, event = {}) {
            	$($item.find('input[name="eventType"]')).on('change', function (e) {
            		var clicktype = this.dataset.clicktype;
            		console.log('change', clicktype);
            		if (clicktype === '0') {
            			$($item.find('select[name="panelList"]')[0]).parents('.mulit-controls').addClass('hide');
            		} else {
            			$($item.find('select[name="panelList"]')[0]).parents('.mulit-controls').removeClass('hide');
            		}
            	})
            	$($item.find('select[name="eventComponents"]')).on('change', function (e) {
            		var uuid = $(this).val();
            		var field = stage.getEventField(uuid);
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
            	$($item.find('select[name="eventComponents"]')).trigger('change');
            	$($item.find('input[name="eventType"]:checked')).trigger('change');
            }
            
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
            
		},
		
		unload:function(handler){

		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});