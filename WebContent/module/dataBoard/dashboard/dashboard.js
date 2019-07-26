define(['util','LogSearch','DataCollect','loadData','agreeColorPicker'],
		function(util, LogSearch, DataCollect, LoadData, agreeColorPicker){
	return {
		load:function($el,scope,handler){
			
			let dateRangeTab = -1;
			let dateRangeFun = null;
			scope.data = scope.data || {};
			/**
			 * 重构 2019-06-14
			 */
			let stage = scope.stage;			// 编辑场景
			let type = scope.data.type;			// 编辑类型
			let bbox = scope.data.bbox;			// 编辑区域大小
			let config = app.selectComponents.config;
			let option = app.selectComponents.option;
			let tableDatas = config.tableDatas || [];
			let tableDragBox = config.tableDragBox || [];
			let urlData = config.urlData || [];
			let xAxisDragBox = config.xAxisDragBox || [];
			let yAxisDragBox = config.yAxisDragBox || [];
			let varDragBox = config.varDragBox || [];
			let renderType = config.renderType || '1';
			var loadData = new LoadData({
				container: $el,
				currentType: type,
				bbox: bbox,
				outerType: type,
				option: option,
				config: config,
				xAxisDragBox: xAxisDragBox,
				yAxisDragBox: yAxisDragBox,
				urlData: urlData,
				tableDragBox: tableDragBox,
				varDragBox: varDragBox,
				tableDatas: tableDatas,
				renderType: renderType,
				saveModal: function (option, config) {
					app.selectComponents.config = config;
					app.selectComponents.option = option;
	            	util.showOrHideEdit($("#showEDitor", scope.p$el),'active');
				}
			});
			
			
			function restoreTitleConfig(config) {
				var urlData = config.urlData;
				if (!urlData) {
					return;
				}
				$('#searchInput', $el).text(urlData.search);
				var dateRangeTab = urlData.dateRangeTab;
				var dateRangeFun = urlData.dateRangeFun;
				if (dateRangeTab === 0) {
					$('#quickRange>li[data-func="'+dateRangeFun+'"]', $el).trigger('click');
				} else {
					
				}
			}
			
			/**
			 * 日志运行
			 */
			$("#searchBtn",$el).click(function(e){
	    		if ($(this).hasClass('disabled')) {
	    			app.alert('当前用户没有查询权限，请联系管理员！')
	    			return;
	    		}
	    		var searchInput = $('#searchInput', $el).text().trim();
	    		if(searchInput == ''){
	    			app.alert("请填写搜索条件。");
	    			return;
	    		}
	    		var date = $('#dateSetectInput', $el).val().trim().split('~');
	    		var startTime = date[0];
	    		var endTime = date[1];
	    		var timeRange = (new Date(endTime) - new Date(startTime))/1000, interval = undefined,format = undefined;
	    		if(timeRange < 0){
	    			app.alert('结束时间应大于起始时间');
	    			return;
	    		}
	    		app.shelter.show('加载中。。。');
	    		var urlData = {
    				'search': searchInput,
    				'startTime': startTime,
    				'endTime': endTime,
    				'cate': getAccessLogSetting(),
    				'logType': 1,
    				'size': 10,
    				'from': 0,
    				'dateRangeTab': dateRangeTab,
    				'dateRangeFun': dateRangeFun
    			}
	    		
	    		if(searchInput.split('|').length > 1){
					var tmpText = $.trim(searchInput.split('|')[1]);
					if(/^SELECT/gi.test(tmpText)){
						loadData.loadDataByParam(urlData);
					} else {
						app.alert('目前只支持sql查询')
					}
	    		} else {
	    			app.alert('目前只支持sql查询')
	    		}
	    	});
			
			function getAccessLogSetting () {
				return scope.getAccessLogSetting;
			}
			
			
			// 日期选择
			$('#dateSetect', $el).on('click', function(event) {
				if($('#dateSetectContent', $el).css('display') == 'none'){
					$('#dateSetectContent', $el).show();
					$('#dateRangeTab>li.active', $el).click();
				}else{
					$('#dataRangeSetectBtn', $el).click();
				}
			});
			
			$(".bi-tabs", $el).on('click', '.bi-tabs-button', function(){// 标签页切换
				var index = $(this).index();
				$(this).addClass("active").siblings().removeClass("active");
				$('.bi-tabs-content', $finebi).children('div:eq('+ index +')').addClass("active").siblings().removeClass("active");
			})
			
			$(".componet-property", $el).on('click', '.bi-expander-bar', function(){// 显隐属性的具体设置
				if($(this).find('.fa-square').length > 0){
					return;
				}
				let $p = $(this).parents('.bi-property-item');
				$(this).children('.bi-expander').find('.fa').toggleClass("fa-angle-down fa-angle-right");
				$(this).next().toggleClass("hide");
				$p.siblings().find('.bi-expander-popup').addClass('hide');
				$p.siblings().find('.bi-expander>i').attr('class','fa fa-angle-right');
			})
			
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
				console.log('click')
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
	    			dateRangeTab = 0;
	    			dateRangeFun = func;
	    		}else{
	    			var sDate = $('[name="daterangepicker_start"]', $el).val();
	    			var eDate = $('[name="daterangepicker_end"]', $el).val();
	    			$('#dateSetect', $el).text(sDate +'~'+ eDate);
	    			$('#dateSetectInput', $el).val(sDate +'~'+ eDate);
	    			$('#quickRange>li.active', $el).removeClass('active');
	    			dateRangeTab = 1;
	    		}
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
			
			//线条颜色选择器
            var configLineColorPicker = new agreeColorPicker(document.querySelector('.colorPicker.textColor'),{
              onconfirm: function() {
                $('.colorPicker.textColor',$el).trigger('change');
              }
            });

            //背景颜色选择器
            var configBgColorPicker = new agreeColorPicker(document.querySelector('.colorPicker.backColor'),{
              onconfirm: function() {
                $('.colorPicker.backColor',$el).trigger('change');
              }
            });
            
            getChangedOption()
            function getChangedOption() {
              const eventType = ['click','change','keyup'];
              eventType.forEach((item) => {
                $(".dashboard-container", $el).on(item,'.componet-property [data-trigger="'+item+'"]',function(e){
                	e.stopPropagation();
                    let $this = $(this);
                    let name = $this.attr('data-name');
                    let category = this.dataset.category;
                    let value = $this.val();
                    if ($(this).hasClass('colorPicker')) {
                    	value = $this.css('background-color');
                    }
                    console.log(app.selectCardItem, value, name)
                    app.selectCardItem[name] = value
                })
              })
            }
            
			restoreTitleConfig(config)
			
		},
		
		unload:function(handler){

		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});