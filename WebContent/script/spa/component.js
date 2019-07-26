/*!
 * Javascript library v3.0
 *
 * Date: 2015.04.02
 */

/**
 *
 * @param {[undefined]}
 *            undefined [确保undefined未被重定义]
 * @author lihao01@cfischina.com
 */
( /* <global> */function (undefined) {

	(function (factory) {
		"use strict";

		// amd module
		if (typeof define === "function" && define.amd) {
			define(["jquery"], factory);
		}
		// global
		else {
			factory();
		}

	})
	(function ($) {
		"use strict";

        if(!$) return ;

        //全屏
        var screen=function() {
            var fullScreen = {
                    LEFT: 'left',
                    FULL: 'full',
                    CONTAINER:'container',
                    MAIN: 'main'
                },
                show = {
                    SHOW: 'removeClass',
                    HIDE: 'addClass',
                    TOGGLE: 'toggleClass'
                },
                resizeHandlerList={},
                globalResizeHandlerList={},
                resizeTimeout;

            function toggleClass($elem,action,className){
                if(action === show.TOGGLE){
                    action = $elem.length?($elem.hasClass(className) ? show.SHOW : show.HIDE) : show.TOGGLE;
                }
                $elem[action](className);
                return action;
            }

            function full(fullScreenType, showType, $context,isWarningDiv) {
                showType = showType || show.TOGGLE;
                //获取浏览器宽度
                var bodyWidth = document.documentElement.clientWidth;

                switch (fullScreenType) {
                    case fullScreen.MAIN:
                        //容器的左侧边栏
                        showType = toggleClass($('.main-left', $context).parent(), showType, 'full');
                    case fullScreen.CONTAINER:
                        //导航栏
                        showType = toggleClass($('body,#tabsContainer'), showType, 'full-container');
                    case fullScreen.FULL:
                        //顶部banner
                        showType=toggleClass($('body,#banner'),showType,'full');
                        //计算标签栏宽度
                        if(showType === 'addClass'){
                        	$("#tabsContainer").css("width", bodyWidth - 0).css('left','0');
                        } else{
                        	$("#tabsContainer").attr('style', '');
                        }
                        if(isWarningDiv){
                            status=toggleClass($('[data-role=container]'),showType,'hide');
                            $('#warningBar')[status]('hide');
                            $('.aweb-alert-msg').toggleClass('aweb-width-full');
                            if($('#minmaximize').hasClass('fa-expand')) {
                            	$('#minmaximize').removeClass('fa-expand');
                            	$('#minmaximize').addClass('fa-compress');
                            } else if($('#minmaximize').hasClass('fa-compress')){
                            	$('#minmaximize').addClass('fa-expand');
                            	$('#minmaximize').removeClass('fa-compress');
                            }
                        }else {
                            if (showType === show.SHOW) {
                                status = $('#showWangingBtn').hasClass('hide') ? show.SHOW : show.HIDE;
                            } else {
                                status = showType
                            }
                            $('#warningBar,#warningDiv')[status]('hide');
                        }
                    case fullScreen.LEFT:
                        //左侧边栏
                        toggleClass($('body,#leftAside,#banner'),showType,'aside-left-out');
                }
                if(fullScreenType){app.contentCtnResize.resize();}
                resize();
                return showType;

            }

            function resize() {
                window.clearTimeout(resizeTimeout);
                resizeTimeout = window.setTimeout(function () {
                    var uid;
                    for (uid in globalResizeHandlerList) {
                        if(uid && globalResizeHandlerList[uid].timeout){
                            window.setTimeout(globalResizeHandlerList[uid].callback,globalResizeHandlerList[uid].timeout);
                        }else{
                            globalResizeHandlerList[uid].callback&&globalResizeHandlerList[uid].callback();
                        }
                    }

                    uid = app.dispatcher.currentHandler && app.dispatcher.currentHandler.uid;
                    if (uid && (uid = resizeHandlerList[uid])) {
                        if (uid.timeout) {
                            window.setTimeout(uid.callback,uid.timeout);
                        } else {
                            uid.callback && uid.callback();
                        }
                    }
                    uid = null;
                }, 100);
            }


            full.fullScreen = fullScreen;
            full.show = show;
            full.addResizeHandler=function(options) {

                if(options&&options.uid&&options.callback){
                    if(options.isGlobal){
                        globalResizeHandlerList[options.uid]= {
                            callback: options.callback,
                            timeout: options.timeout || 0
                        };
                    }else {
                        resizeHandlerList[options.uid] = {
                            callback: options.callback,
                            timeout: options.timeout || 0
                        };
                    }
                }
            };
            full.removeResizeHandler=function(uid,isGlobal){
                if(uid){
                    if(isGlobal){
                        globalResizeHandlerList[uid] = null;
                        delete globalResizeHandlerList[uid];
                    }else{
                        resizeHandlerList[uid] = null;
                        delete resizeHandlerList[uid];
                    }
                }
            };
            full.triggerResizeHandler=function(uid,isGlobal) {
                if(uid) {
                    if (isGlobal) {
                        if(uid=globalResizeHandlerList[uid]){
                            uid.callback&&uid.callback();
                        }
                    } else if(uid=resizeHandlerList[uid]) {
                        uid.callback && uid.callback();
                    }
                    uid=null;
                }
            };

            $(window).resize(resize);


            return full;
        }();

        //遮罩
        var shelter = function () {
            var maskList = [],
                zIndexList=[],
                $mask,
                loadingTemp = '<div id="shelter" class="mask"><div class="maskTitle">_maskTitle_</div><div class="maskPic"></div><div class="maskPicLeft"></div><div class="maskPicCenter"></div><div class="maskPicRight"></div></div>',
                ___MAX_INDEX = 15000,
                timeOutHandler,
                hideTimeoutHandler;
            	var keyboard = true;
            var hideAll = function(){
                window.clearTimeout(timeOutHandler);
                maskList.splice(0,maskList.length);
                if($mask){
                    $mask.fadeOut(200,function(){
                        $mask.remove();
                        $mask=null;
                        app.shelter.lowerZIndex();
                    });
                }
                app.shelter.lowerZIndex();
            };


            //绑定监听
            $(window).on('keyup', function(e){
                var key = e.which || window.event.keyCode;
                //假如key为27 遮罩消失
                if(key === 27) {
                	keyboard && hideAll();
                	//esb隐藏大屏页面
                	var $tab = $('#tabs').find('.active'),
                		href = $tab.attr('data-href');
                	
                	var containerArr = ['bigScreenAllContainer', 'bigScreen_apmSortContainer',
                		             'bigScreen_eventDistributeContainer', 'bigScreen_systemTPSContainer',
                		             'bigScreen_uniMoniPlatformContainer','bigScreen_eventsContainer','bigScreen_JYJKContainer'],
                		selectorArr = [".bigScreen-All-table", ".bigScreenApm-bg", ".bigScreenEvent-bg",
                		               ".bigScreenTps-bg", "#bigScreen_uniMoniPlatform",'.bigScreenEvents_bg','#bigScreenJYJK'];
                	containerArr.forEach(function(item, index){
                		if(href.indexOf(item) > -1){
                			$(selectorArr[index]).fadeOut();
                    		$tab.find('.close').trigger('click');
                		}
                	});
                };
            });


            return {
                show: function (title, immediate) {
                	maskList.push(title);
                    window.clearTimeout(timeOutHandler);
                    timeOutHandler = setTimeout(function(){
                        window.clearTimeout(hideTimeoutHandler);
                        title=title || '请稍候…';
                        if($mask&&$mask.length){
                            $mask.children('.maskTitle').text(title);
                        }else{
                            $mask=$(loadingTemp.replace(/_maskTitle_/,title)).css('z-index',___MAX_INDEX);
                            $('body').append($mask);
                            app.shelter.upperZIndex(___MAX_INDEX+1);
                        }
                        hideTimeoutHandler = setTimeout(function(){
                            app.shelter.hide();
                            app.alert('遮罩超时','服务器无响应。', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                        }, 60*1000);
                    },immediate?0:220);
                },
                hide: function () {
                    window.clearTimeout(timeOutHandler);
                    window.clearTimeout(hideTimeoutHandler);
                    maskList.pop();
                    if(maskList.length&&$mask){
                        $mask.children('.maskTitle').text(maskList[maskList.length-1]);
                    }else if($mask){
                        $mask.fadeOut(200,function(){
                            $mask.remove();
                            $mask=null;
                            app.shelter.lowerZIndex();
                        });
                    }
                },
                hideAll: hideAll,
                upperZIndex: function(alertZIndex,maskZIndex,alertTop,iskeyboard) {
                    var $mask = $('#mask'),
                        $alert = $('#alertList');

                    alertZIndex = alertZIndex === false ? '' : (alertZIndex && parseInt(alertZIndex, 10) || 1052);
                    maskZIndex = maskZIndex && parseInt(maskZIndex, 10) || 505;

                    //备份上次的zIndex
                    zIndexList.push({
                        alertZIndex: $alert.css('zIndex'),
                        maskZIndex: $mask.css('zIndex')
                    });


                    $mask.addClass('mask').css({'z-index': maskZIndex});
                    $alert.css({'z-index': alertZIndex, 'top': alertTop === false ? '' : (alertTop || 0)});

                    $mask = null;
                    $alert = null;
                    keyboard = iskeyboard ? iskeyboard :false; 
                },
                lowerZIndex: function() {

                    //恢复上次的zIndex
                    var $mask = $('#mask'),
                        $alert = $('#alertList'),
                        lastZIndex = zIndexList.length ? zIndexList.pop() : {};

                    if (!parseInt(lastZIndex.maskZIndex, 10)) {//如果上一次没有遮罩的话，则将mask移除
                        $mask.removeClass('mask');
                        $alert.css('top', '');
                    }
                    $mask.css('z-index', lastZIndex.maskZIndex || '');
                    $('#alertList').css('z-index', lastZIndex.alertZIndex || '');

                    lastZIndex = null;//清理内存
                    $mask = null;
                    $alert=null;
                }
            };
        }();
        
        
        var warning = function(){
            var modalTemp = '<div class="modal hide fade" tabindex="0" style="z-index:1064">'+
                '<div class="modal-header"><h4>_title_</h4></div>'+
                '<div class="modal-body"><p class="text-indent">_content_</p></div>' +
                '<div class="modal-footer"><button type="button" data-role="warning" class="modal-btn blue">_positive_</button></div>';

            var defaultOption = {
                title:'警告',
                content:'请选择服务器',
                btnConfirm:"确定",
                confirmHandler:function(){},
                context:this,
                args:[]
            }
            return function(options){
                    options = $.extend({},defaultOption,options);
                    var html = modalTemp.replace(/_title_/,options.title)
                            .replace(/_content_/,options.content)
                            .replace(/_positive_/,options.btnConfirm),
                        $confirm=$(html);


                    $confirm.appendTo('body');
                    $confirm.modal({
                        backdrop: 'static',
                        keyboard: false,
                        show: true
                    });
                    app.shelter.upperZIndex(1061,1060);
                    $confirm.focus();
                    $confirm.on('hidden',function(){
                        app.shelter.lowerZIndex();
                        $(this).off().remove();
                    });

                    $confirm.one('click', 'button',function(){
                        $confirm.modal('hide');
                        $(this).attr('data-role') ==='confirm'?
                            options.confirmHandler.apply(options.context,options.args):{};
                    });
                };
        }();
        //确认
        var confirm = function(){
            var modalTemp = '<div class="modal hide fade"  tabindex="0" style="z-index:1064">' +
                '<div class="modal-header"><h4>_title_</h4></div>' +
                '<div class="modal-body"><p class="text-indent">_content_</p></div>' +
                '<div class="modal-footer"><button type="button" data-role="cancel" class="modal-btn gray" style="margin-right:15px;">_negative_</button><button type="button" data-role="confirm" class="modal-btn blue">_positive_</a></div></div>';

            var defaultOption = {
                title: '确认',                 //确认框标题，非必填
                content: '是否执行该操作',     //确认框内容，非必填
                btnConfirm: '是',             //确认按钮显示内容
                btnCancel: '否',              //却笑按钮显示内容
                confirmHandler: function(){},//点击确认按钮触发的函数，参数以数组形式写在args那里
                cancelHandler: function(){}, //点击取消按钮触发函数，参数写在args那里
                context: this,               //执行函数的上下文
                args: []                     //确认、取消触发函数的参数，以数组形式书写
            };


            return function(options){
                options = $.extend({},defaultOption,options);
                var html = modalTemp.replace(/_title_/,options.title)
                        .replace(/_content_/,options.content)
                        .replace(/_positive_/,options.btnConfirm)
                        .replace(/_negative_/,options.btnCancel),
                    $confirm=$(html);


                $confirm.appendTo('body');
                $confirm.modal({
                    backdrop: 'static',
                    keyboard: false,
                    show: true
                });
                app.shelter.upperZIndex(1061,1060);
                console.log(123123);
                $confirm.focus();
                $confirm.on('hidden',function(){
                    app.shelter.lowerZIndex();
                    $(this).off().remove();
                });

                $confirm.one('click', 'button',function(){
                    $confirm.modal('hide');
                    $(this).attr('data-role') ==='confirm'?
                        options.confirmHandler.apply(options.context,options.args):
                        options.cancelHandler.apply(options.context,options.args);
                });
            };
        }();
        
        //定义新的确认框
        /***
         * @param options {obj}  参数必须是对象形式
         * options.sTitle {string}  确认框的标题
         * options.sType {string}  模块类型，有normal，success，search，warn，error,默认为normal常规
         * options.sContent {string}  确认框内容
         * options.sBtnConfirm {string}  确认按钮显示内容
         * options.sBtnCancel {string}  确认按钮显示内容
         * options.fnConfirmHandler {fn}  点击确认按钮触发的函数，参数以数组形式写在args那里
         * options.fnCancelHandler {fn}  点击取消按钮触发函数，参数写在args那里
         * options.aArgs {array}  确认、取消触发函数的参数，以数组形式书写
         * ***/
        var confirmDialog = (function(){
        	
            var modalTemp = '<div class="modal hide fade" tabindex="0" style="z-index:1064">' +
                '<div class="modal-header confirm-header"><h4 style="margin:5px 0;line-height:26px;"><i class="_type_" style="color:_color_;font-size:26px;position:relative;top:2px;"></i> _title_<i class="close confirm-close" style="margin-top:5px;">&times;</i></h4></div>' +
                '<div class="modal-body"><div>_content_</div></div>' +
                '<div class="modal-footer"><button type="button" data-role="cancel" class="cancelBtn">_negative_</button><button type="button" data-role="confirm" class="confirmBtn">_positive_</a></div></div>';

            var defaultOption = {//默认参数配置
                sTitle: '确认',                 //确认框标题，非必填
                sType: 'normal',          //模块类型，有normal，success，search，warn，error,默认为normal常规
                sContent: '是否执行该操作',     //确认框内容，非必填
                sBtnConfirm: '确定',             //确认按钮显示内容
                sBtnCancel: '取消',              //却笑按钮显示内容
                fnConfirmHandler: function(){},//点击确认按钮触发的函数，参数以数组形式写在args那里
                fnCancelHandler: function(){}, //点击取消按钮触发函数，参数写在args那里
                oContext: this,               //执行函数的上下文
                aArgs: []                     //确认、取消触发函数的参数，以数组形式书写
            };


            return function(options){ 
                options = $.extend({},defaultOption,options);
                var type = options.sType;
                var html;
            	if(type === "success"){
            		 html = modalTemp.replace(/_type_/,"fa fa-check-circle")
            		 			.replace(/_color_/,"#0da8f8");
            	}else if(type === "search"){
            		html = modalTemp.replace(/_type_/,"fa fa-question-circle")
		 						.replace(/_color_/,"#5b62f9");
            	}else if(type === "warn"){
            		html = modalTemp.replace(/_type_/,"fa fa-info-circle")
								.replace(/_color_/,"#f5c000");
            	}else if(type === "error"){
            		html = modalTemp.replace(/_type_/,"fa fa-times-circle")
								.replace(/_color_/,"#f01024");
            	}
            		
            		
            	if(type !== "normal"){
	                html = html.replace(/_title_/,options.sTitle)
	                			.replace(/_content_/,options.sContent)
	                			.replace(/_positive_/,options.sBtnConfirm)
	                			.replace(/_negative_/,options.sBtnCancel);
                }else{
                	html = modalTemp.replace(/_title_/,options.sTitle)
		            			.replace(/_content_/,options.sContent)
		            			.replace(/_positive_/,options.sBtnConfirm)
		            			.replace(/_negative_/,options.sBtnCancel);
                }
                var $confirm=$(html);


                $confirm.appendTo('body');
                $confirm.modal({
                    backdrop: 'static',
                    keyboard: false,
                    show: true
                });
                app.shelter.upperZIndex(1061,1060);
                $confirm.focus();
                $confirm.on('hidden',function(){
                    app.shelter.lowerZIndex();
                    $(this).off().remove();
                });

                $confirm.one('click', 'button, .close',function(){
                    $confirm.modal('hide');
                    $(this).attr('data-role') ==='confirm'?
                        options.fnConfirmHandler.apply(options.oContext,options.aArgs):
                        options.fnCancelHandler.apply(options.oContext,options.aArgs);
                });
            };
        })();

        //顶部导航栏banner
        var banner = function() {
            var $menu = $('#bannerMenu', '#banner'),
                defaultOptions = {
                    items: [],
                    callback: function () {
                    },
                    args: []
                },
                itemOptions = {
                    href: '',
                    icon: '',
                    name: '项目'
                },
                menuTemp = '<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;"><i class="_icon_"></i>_title_</a><ul class="dropdown-menu">',
                itemTemp = '<li><a data-href="_href_"><i class="_icon_"></i>_name_</a></li>',
                uid='resizeBannerUID-'+Math.random()*10000;


            var removeHandler,
                bannerOptions,
                uid;

            //@html String 插入的模板
            //@callback 添加html的处理事件，包括绑定等等；
            var ban = function (options) {
                if (options && $.isArray(options.items)) {
                    uid = options.uid;
                    bannerOptions = $.extend({}, defaultOptions, options);

                    loadData(bannerOptions);
                }
            };

            function loadItems(items){
                var html='';
                for (var mainItem, i = -1; (mainItem = items[++i]);) {
                   // mainItem = $.extend({}, itemOptions, mainItem);
                    if (mainItem.subItems) {
                        html += menuTemp
                            .replace(/_icon_/, mainItem.icon||'')
                            .replace('_title_', mainItem.name||'');
                        html += loadItems( mainItem.subItems)+'</ul></li>';
                    } else {
                        html += itemTemp
                            .replace(/_href_/, mainItem.href)
                            .replace(/_icon_/, mainItem.icon)
                            .replace(/_name_/, mainItem.name);
                    }
                }
                return html;
            }

            function loadData(options) {
                window.clearTimeout(removeHandler);
                if($menu && $menu.children().length){
                    $menu.children().each(function (index, elem) {
                        TweenLite.killTweensOf(elem);
                    });
                }

                $menu.off().empty().html(loadItems(options.items));
                var timeout = .2;
                $menu.children().each(function (index, elem) {
                    TweenLite.fromTo(elem, .5, {
                        x: '-10%',
                        y: '5%',
                        opacity: 0,
                        ease: Quint.easeOut
                    }, {
                        x: '+=10%',
                        y: '-=5%',
                        opacity: 1,
                        ease: Quint.easeOut,
                        delay: timeout
                    });
                    timeout += .045;
                });
                resize();

                options.callback.apply($menu[0], options.args);
            }

            function remove(){
                ban=null;
            }

            function resize() {
                var $banner = $('#banner>.navbar-inner').css('overflow', 'hidden'),
                    $children = $banner.children().removeClass('hide'),
                    $asideMenu = $children.eq(0),
                    $bannerMenu = $children.eq(1),
                    $bannerOprMenu = $children.eq(2),
                    bannerWidth = $banner.innerWidth() - $asideMenu.outerWidth(),
                    bannerOprMenuWidth = $bannerOprMenu.width();

                if (bannerWidth > ($bannerMenu.width() + bannerOprMenuWidth)) {
                    $children.removeClass('hide');
                } else if (bannerWidth > bannerOprMenuWidth) {
                    $bannerMenu.addClass('hide');
                } else {
                    $children.filter(':gt(0)').addClass('hide');
                }

                $banner.css('overflow', '');
                $banner = null, $asideMenu = null, $bannerMenu = null, $bannerOprMenu = null;
            }

            ban.remove = function (id) {
                if (id && uid === id) {
                    var timeout = .2;
                    $menu.children().each(function (index, elem) {
                        TweenLite.fromTo(elem, .2, {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            ease: Quint.easeOut
                        }, {
                            x: '-=10%',
                            y: '-=5%',
                            opacity: 0,
                            ease: Quint.easeOut,
                            delay: timeout
                        });
                        timeout += .045;
                    });

                    removeHandler = window.setTimeout(function () {
                        $menu.empty();
                        remove();
                    }, (timeout * 1000));

                    bannerOptions=null;
                    uid=null;
                }
            };
            ban.refresh = function (items, id) {
                if (uid === id) {
                    bannerOptions.items = items;
                    loadData(bannerOptions);
                }
            };


            //resize监听
            screen.addResizeHandler({
                uid: uid,
                isGlobal: true,
                callback: resize
            });
            $(function(){
                screen.triggerResizeHandler(uid,true);
            });


            return ban;
        }();

        //提示
        var alertClass = function static_alertClass() {
            //消息中心部分
            var $btn = $('#messageCenterShowBtn'),
                $icon = $btn.children('i'),
                _$container = $('#messageCenterContainer'),
                _$list = $('#messageCenterList', _$container),
                ___noRecord = '<li class="no-result">没有新通知</li>';

            //函数
            //清除全部
            function clear() {
                var timeout = .35;
                _$list.children(':not(.no-result)').each(function(index,elem){
                    TweenLite.to(elem,.5,{
                        x: '10%',
                        opacity: 0,
                        ease: Quint.easeOut,
                        delay: timeout
                    });
                    timeout = Math.min(timeout+=.05,1);
                });

                //清空事件alert提示框队列
                __queue&&__queue.splice(0,__queue.length);
                $alertList&&$alertList.find('.alert-close').click();

                window.setTimeout(function(){
                    _$list.html(___noRecord);
                }, timeout*1000);

                $icon.removeClass('fa-bell').addClass('fa-bell-o');
            }
            //清除全部
            $('.page-header .close', _$container).click(clear);
            //清除单个消息的事件
            $(_$list).click(function(e){
                var $elem = $(e.target || window.event.srcElement);
                if($elem.hasClass('close')){
                    TweenLite.to($elem.parent()[0],.8,{x: '50%', height: 0, overflow: 'hidden', opacity: 0, ease: Quint.easeOut});
                    window.setTimeout(function(){
                        $elem.parent().remove();
                        if(!_$list.children().length){
                            _$list.append(___noRecord);
                            $icon.removeClass('fa-bell').addClass('fa-bell-o');
                        }
                    }, 700);

                }
            });


            //初始化
            clear();


            //消息队列部分
            var __queue = [],
                __queueShowLength = Math.max(Math.ceil($(window).height()/100),3),
                $alertList = $('#alertList'),
                $temp = $('#tabsTemp'),
                alertTemp = $temp.length&&$temp.children(':eq(1)').get(0).outerHTML,
                msgTemp = $temp.length&&$temp.children(':eq(2)').get(0).outerHTML,
                _showType = {
                    SUCCESS: 'success',
                    DEFAULT: 'info',
                    ERROR: 'pink',//'error',
                    WARNING: 'warning',
                    PINK: 'pink'
                }, _msgType = {
                    MESSAGE: 'msg',
                    TIPS: 'tips'
                };

            var showInMessageCenter = function (title, msg) {
                    var d = new Date();
                    d = [d.getHours(), d.getMinutes(), d.getSeconds()]
                        .join(':');
                        //.replace(/((^(?!=\d{2}))|((\D)((?!=\d{2})|(\d$))))/g,'$10');
                    if(!msg){
                        msg = title;
                        title = '消息';

                    }

                    //加入消息中心
                    _$list.children('.no-result').remove();

                    _$list.prepend(msgTemp
                        .replace(/\{msg\}/g,msg)
                        .replace(/\{title\}/g,title)
                        .replace(/\{time\}/,d));

                    //改变icon
                    $icon.removeClass('fa-bell-o').addClass('fa-bell');
                },
                addToQueue = function (args) {
                    __queue.push(args);
                },
                delFormQueue = function () {
                    return __queue.shift();
                },
                execAlert = function (title, msg, type) {
                    var $alert=null;

                    //校验样式在_showType中
                    type = type || 'info';
                    type = (type.toUpperCase() in _showType)?type:_showType.DEFAULT;

                    if ($alertList.children().length<__queueShowLength) {
                        //仅有msg一个参数
                        if(!msg){
                            msg = title;
                            title = '消息';
                        }
                        $alert = $alertList
                            .append(alertTemp.replace(/showType/,type).replace(/\{title\}/g,title).replace(/\{content\}/g,msg))
                            .children(':last');

                        //出现
                        setTimeout(function(){
                            $alert.addClass('out');
                        }, 50+Math.random()*50);
                        //隐藏
                        setTimeout(function(){
                            $alert.animate({
                                top: '-1.5em',
                                opacity: 0,
                                height: 0
                            });
                            execNextAlert($alert);
                        }, 5000+Math.random()*1000);
                    } else {
                        addToQueue(arguments);
                    }
                },
                execNextAlert = function($lastElem){
                    setTimeout(function(){
                        if($lastElem){
                            $lastElem.remove();
                        }
                        if(__queue.length){
                            execAlert.apply(this, delFormQueue());
                        }
                    }, 500);
                };


            //关闭按钮
            $alertList.click(function(e){
                e = e.target || window.event.srcElement;
                if(e.className.indexOf('close')>=0){
                    $(e).parent().removeClass('out').animate({
                        height:0
                    });
                    execNextAlert($(e).parent());
                }
            });

            /*详情请见api部分*/
            return {
                showType: _showType,
                msgType: _msgType,
                alert: function (title, msg, showType,msgType) {
                    if (title instanceof Array) {
                        for (var i = -1, alt; alt = title[++i];) {
                            if(alt.length === 4 && alt[3] === _msgType.MESSAGE){
                                showInMessageCenter(alt[0],alt[1]);
                            }else if(alt.length === 3 && alt[2] === _msgType.MESSAGE){
                                showInMessageCenter('消息',alt[0]);
                            }
                            execAlert.apply(this, title[i]);
                        }
                    } else {
                        //加入消息中心
                        if(!msgType && showType === _msgType.MESSAGE){
                            showInMessageCenter(title,msg);
                        }else{
                            if(msgType === _msgType.MESSAGE){
                                showInMessageCenter(title, msg);
                            }
                            execAlert(title, msg, showType);
                        }
                    }
                }
            }
        }();

        //右侧边栏
        var rightAside = function () {
            /*右侧边栏*/
            var $elem = $('#rightAside'),
                $mask = $('#mask'),
                isMasking=false,
                show=function() {
                    //显示
                    $elem.removeClass('collapsed');
                    //出现遮罩
                    if ($('body').children('.modal-backdrop.fade.in').length) {
                        isMasking = true;
                        app.shelter.upperZIndex(false,1060,false);
                    }else{
                        app.shelter.upperZIndex(false,'',false);
                    }
                    $('#alertList').addClass('aside-right');
                    $mask.addClass('mask');
                },
                hide = function () {
                    $elem.addClass('collapsed');
                    //重置表单
                    reset();

                    if(isMasking) {
                        //恢复alert的z-index
                        isMasking=false;
                    }else{
                        //关闭按钮后遮罩取消
                        $mask.removeClass('mask');
                    }
                    app.shelter.lowerZIndex();
                    $('#alertList').removeClass('aside-right');
                },
                reset=function($el){
                    $(':input', $el || $elem).not(':button, :submit, :reset,:radio,:checkbox,:disabled').val('').removeAttr('selected');
                    $(':checked', $el || $elem).not(':disabled').removeAttr('checked');
                };

            $('form',$elem).on('submit', function(){
                return false;
            });
            $('#rightAsideCloseBtn', $elem).click(hide);

            return {
                __$elem: $elem,
                __$mask: $mask,
                __isMasking:isMasking,
                show: show,
                hide: hide,
                reset: reset,
                set: function (title, formHtml, listenHandler) {
                    //初始化
                    $('#rightAsideTitle', this.__$elem).text(title);
                    this.__$elem.children('form').html(formHtml);
                    this.__$elem.children('form').find('[data-inner-switcher]').bootstrapSwitch();
                    listenHandler && listenHandler(this,this.__$elem);

                    return this;
                },
                bootstrapUpload:function(options){
                    /*
                     * option:{
                     *   el: 上传的元素，选择器或jQuery对象
                     *   tips:鼠标移动到当前位置时显示的信息
                     *   canEditName:可以编辑文件名
                     * }
                     *
                     * */

                    var $el = $(options.el), $parent, $next, $title, extensionName='';
                    var html = '';
                   /* var html = '<i class="fa fa-cloud-upload"></i><div class="bootstrap-upload-title"><span></span>'
                        + (options.canEditName?'<input type="text" class="hide text-left"/>&nbsp;<i class="fa fa-edit hide"></i>':'')
                        +'</div>';*/

                    options.tips = options.tips||'点击上传文件';
               //     $el.addClass('bootstrap-upload-input').wrap('<div class="bootstrap-upload"></div>');
                    $parent = $el.parent();

                    $parent.append(html);
                    $next = $el.next();

                    $parent.attr('title', options.tips);

                    $el.css({
                        'height': $next.height(),
                        'width': $next.width(),
                        'left': ($parent.width()-$next.width())/2
                    });


                    //标题绑定事件
                    $title=$parent.children('.bootstrap-upload-title');
                    $title.children('i').click(function(){
                        $title.children('i').addClass('hide');
                        $title.children('input')
                            .removeClass('hide')
                            .val($title.children('span').addClass('hide').text());
                        $title.children('input').focus();
                    });
                    $title.children('input').blur(function(){
                        $title.children('i').removeClass('hide');
                        $title.children('span')
                            .removeClass('hide')
                            .text($(this).addClass('hide').val());
                        $parent.attr('title', $(this).val());
                    });


                    //上传文件改变
                    $parent.change(function(e){
                        var $e=$(e.target);
                        if($e.is('input')) {
                            var name = $e.val(),
                                accept = '(' + ($el.prop('accept') || '').replace(/\s/g, '').split(',').join('|') + ')'.replace(/\./g, '\\\\\\\\.');

                            if (name) {
                                name = name.match(new RegExp('([^\\\\/]+)' + accept + '$','i'));
                                extensionName = name && name[2] || '';
                                name = name && name[1] || '';
                                if(!name){
                                    app.alert('提示',options.tips,app.alertShowType.WARNING);
                                }else{
                                    $title.children('span').text(name);
                                    $title.children('i').removeClass('hide');
                                    $parent.attr('title', name);
                                }
                            } else {
                                $title.children('span').text('');
                                $title.children('i').addClass('hide');
                                $parent.attr('title', options.tips);
                            }
                        }
                    });

                    return {
                        getName: function () {
                            return $title.children('span').text();
                        },
                        getExtensionName: function () {
                            return extensionName;
                        },
                        reset:function() {
                            $parent.children('input').change();
                        },
                        destroy: function () {
                            $parent.children(':not(:input)').remove();
                            $el.unwrap()
                                .removeClass('bootstrap-upload-input')
                                .unbind('change')
                                .val('')
                                .css({
                                    height: '',
                                    width: '',
                                    'margin-left': ''
                                });
                            $el = null, $parent = null, $title = null;
                            for (var p in this) {
                                delete this[p];
                            }
                        }
                    }
                }
            }
        }();

        shelter.show('正在加载页面，请稍候…');

        //全选 单选事件组件
        /*
         *
         * option={
         *   $context
         *   btnSelector
         *   tbodySelector, table body
         *   isDataTable
         *   ___notDisabledNum_cluster  关联集群时不可操作按钮
         *   selectChild //是否选择子设备
         *   deviceType  //设备类型，填了selectChild必须填deviceType
         *   addMethod(list,elem);
         *   getIDMethod(elem)
         *   getNode(list,id)
         * }
         * */
        var SelectComponent = function(options){
            var ___$context = options.$context,
                ___$btn = $(options.btnSelector, ___$context),
                ___$tb = $(options.tbodySelector, ___$context),
                ___list = {},
                ___child = options.selectChild,
                ___type = options.deviceType,
                ___operationButtons=options.operationButtons,
                ___notDisabledNum_cluster = options.notDisabledNum_cluster,
                __add = options.addMethod,
                __id = options.getIDMethod,
                __node = options.getNode,
                _getStatus=options.getStatusMethod,
                __cluster  = options.cluster,
                _add_ = function(elem){
                    __add(___list, elem);
                },
                _add = function(elem){
                    __add(___list, elem);
                    updBtnStyle();
                    return ___list;
                },
                _del = function(elem){
                    var id = typeof(elem) === 'string' ? elem : options.getIDMethod(elem);
                    ___list[id]&&(delete ___list[id]);
                    updBtnStyle();
                    return ___list;
                };


            //已关联集群，不可创建
            if (___operationButtons && ___operationButtons.list) {
                $(___operationButtons.list, ___$context).addClass('disabled');
            }


            //更改全选按钮选中状态
            function updBtnStyle(){
                var $checkbox = $(':checkbox', ___$tb),
                    checkedLength = $checkbox.filter(':checked').length,
                    enableButton;

                switch (checkedLength) {
                    case 0:
                        ___$btn.prop('indeterminate', false).removeAttr('checked');
                        break;
                    case $checkbox.length:
                        ___$btn.prop('indeterminate', false).attr('checked', 'checked');
                        break;
                    default:
                        ___$btn.prop('indeterminate', true).removeAttr('checked');
                }


                //更新操作按钮的样式
                if (___operationButtons && ___operationButtons.list && ___operationButtons.status) {
                    $(___operationButtons.list, ___$context).addClass('disabled');

                    if (checkedLength) {
                        if (enableButton = ___operationButtons.status[_getStatus(___list, options)]) {
                            enableButton = enableButton[checkedLength === 1 ? 0 : 1];
                            if (enableButton) {
                                $(enableButton, ___$context).removeClass('disabled');
                            }
                        }
                    }
                }

                if(__cluster){
                    $(___notDisabledNum_cluster, ___$context).addClass('disabled');
                }
            }

            function selectChildren($e, checked) {
                var execMethod = checked ? 'attr' : 'removeAttr';

                if (!checked) $e.removeAttr('checked');

                $('[data-did^="' + $e.attr('data-did') + '"]', ___$tb).not($e)[execMethod]('disabled', 'disabled')[execMethod]('checked', 'checked');
            }

            function clear(){
                window.setTimeout(function () {
                    ___$btn.removeAttr('checked').change();
                }, 50);

                for(var p in ___list){
                    ___list[p]=null;
                    delete ___list[p];
                }
            }

            //销毁
            function dispose() {
                ___$btn.off();
                ___$tb.off();

                if (options.isDataTable) {
                    $('.dataTables_paginate', ___$context).off();
                    $('.dataTables_filter', ___$context).find(':input').off();
                    $('.dataTables_length',__$context).find('select').off();
                }

                ___$btn = null, ___$tb = null, ___$context = null, ___list = null;

                options=null;
            }

            //绑定监听
            ___$btn.change(function () {

                var checked = this.checked,
                    children,
                    childrenType = [],
                    execMethod = checked ? _add_ : _del;

                if(___type && app.global.device[___type].next){
                    children = app.global.device[___type].next instanceof Array ?
                        app.global.device[___type].next : [app.global.device[___type].next];
                    children.push(___type);
                    $.each(children,function(index, key){
                        key = key.replace(/((lsr|out)([^$]+))/,'$3') || key;
                        childrenType.push('[data-type="'+key.toUpperCase()+'"]');
                    });
                    $(':checkbox', ___$tb).filter(childrenType.join(',')).each(function(index, elem){
                        elem.checked = checked;
                        execMethod(elem);
                        selectChildren($(elem), checked);
                    });
                }else{
                    $(':checkbox', ___$tb).attr('checked', this.checked).each(function (index, elem) {
                        execMethod(elem);
                    });
                }

                updBtnStyle();
            });

            ___$tb.click(function(e) {
                e = e.target || window.event.srcElement;
                if (e.type === 'checkbox') {
                    e.checked ? _add(e) : _del(e);

                    if(___child){
                        selectChildren($(e), e.checked);
                    }

                    updBtnStyle();
                }
            });

            //使用dataTable
            if(options.isDataTable){
                //翻页事件重新统计选中实例按钮的样式
                $('.dataTables_paginate', ___$context).click(function (e) {
                    var $e = e.target || window.event.srcElement;
                    if ($e.hasClass('paginate_button')||$e.parent().hasClass('paginate_button')) {
                        clear();
                    }
                });
                $('.dataTables_filter', ___$context).find(':input').keyup(clear);

                $('.dataTables_length', ___$context).find('select').change(clear);
            }

            return {
                add: _add,
                del: _del,
                list: function(){
                    return $.extend(true, {}, ___list);
                },
                clear:function(){
                    var ids = [];
                    for (var id in ___list) {
                        selectChildren($(__node(___list,id)).find(':checkbox'),false);
                        _del(id);
                        ids.push(id);
                    }
                    updBtnStyle();
                    return ids;
                },
                selectSize : function(){
                    return $(':checkbox:checked', ___$tb).length;
                },
                //销毁
                dispose:dispose
            };
        };
        
      //可拖动的表格
        /*
        * options={
        *   $table://需要拖动的表格
        *   $context://父容器，上下文
        *   isDataTable://是否是dataTable
        *   isSave //是否保存供下次使用
        *   id      //表格的唯一id，isSave为true，则必须为true
        * }
        * */
		var colResizeTable=function(options) {
			//options
			var ___$context = options.$context,
				___$ctn,
				___$tbSampleTb = options.$table,
				___isDataTable = options.isDataTable || false,
				___isSave=options.isSave||false,
				___id='colResizeTable-'+(options.id||___$tbSampleTb.attr('data-role')||___$tbSampleTb.attr('id'));
			//variable
			var ___$moveBlock,
				___lastOffsetLeft,
				___mouseLastOffsetLeft;

			//初始化
			function init() {
				var ctn,
					ctnHtml = [],
					temp = '<div class="col-divider" _style="left:_width_px;height:_height_px"></div>',
					tableProps= $.getCookie(___id),
					colWidths,trWidths,
					colWidth = 0;
				tableProps=tableProps?JSON.parse(tableProps):undefined;

				if(___isSave&&tableProps) {
					colWidths=tableProps.colWidths;
					trWidths=tableProps.trWidths;
					___$tbSampleTb.find('tr:first').children().each(function (index) {
						var $this = $(this);
						$this.css('width', trWidths[index] + 'px');
						ctnHtml.push(temp.replace(/_width_/, colWidths[index]));
					});
				}else{
					___$tbSampleTb.find('tr:first').children().each(function () {
						var $this = $(this);
						$this.css('width', $this.width() + 'px');
						ctnHtml.push(temp.replace(/_width_/, colWidth += $this.outerWidth()));
					});
				}

				ctn = '<div class="col-resize-ctn">' + ctnHtml.join('').replace(/_height_/g, ___$tbSampleTb.height()) + '</div>';
				ctn = ctn.replace(/_style/g, 'style');
				___$tbSampleTb.children('colgroup').remove();

				___$ctn = $(ctn);
				___$ctn.insertBefore(___$tbSampleTb);

				___$tbSampleTb.addClass('col-resize-table').css('width', ___$tbSampleTb.width());
				___$ctn.css({
					'width': ___$tbSampleTb.width(),
					'left': ___$tbSampleTb.css('margin-left'),
					'top': ___$tbSampleTb.offset().top - ___$ctn.offset().top
				});

				if(___isSave&&tableProps) {
					___$tbSampleTb.css('width', tableProps.width);
					___$ctn.css({
						'width':tableProps.width,
						'left': ___$tbSampleTb.css('margin-left')
					});
					updateCtnHeight();
				}

				if(___$tbSampleTb.width()>___$context.width()){
					___$ctn.css({
						'padding':'0 1em'
					});
				}else{
					___$ctn.css({
						'padding':'0'
					});
				}
			}
			//重设高度
			function updateCtnHeight() {
				___$ctn.children().height(___$tbSampleTb.height());
			}
			//重设宽度，并保存
			function updateCtnWidth(resizeWidth,index) {
				var colWidth= 0,children,trWidths=[],colWidths=[],tableProps={};
				if (___$ctn && typeof index === 'number' && typeof resizeWidth === 'number') {
					app.shelter.show('正在重置表格大小，请稍后…');
					resizeWidth = '+='+Math.floor(resizeWidth);
					children=___$ctn.children();

					___$tbSampleTb.css('width',resizeWidth);
					___$tbSampleTb.find('tr:first').children(':eq('+index+')').css('width', resizeWidth);
					setTimeout(function(){
						//重设宽度
						___$tbSampleTb.find('tr:first').children().each(function (index) {
							var $this=$(this);

							children.filter(':eq(' + index + ')').css('left', colWidth+=$this.outerWidth());
							trWidths.push($this.width());
							colWidths.push(colWidth);
						});
						//调整属性 tableProps属性用于保存
						tableProps= {
							width: ___$tbSampleTb.width(),
							left: ___$tbSampleTb.css('margin-left')
						};

						___$ctn.css(tableProps);
						if(tableProps.width>___$context.width()){
							___$ctn.css({
								'padding':'0 1em'
							});
						}else{
							___$ctn.css({
								'padding':'0'
							});
						}
						___$tbSampleTb.css('width',___$ctn.width());
						updateCtnHeight();

						if(___isSave){
							tableProps.colWidths=colWidths;
							tableProps.trWidths=trWidths;
							$.setCookie(___id, JSON.stringify(tableProps));
						}

						app.shelter.hide();
					},30);
				}
			}

			/*绑定事件函数*/
			//鼠标移动
			function moveHandler(e) {
				e.preventDefault();
				if (___$moveBlock) {
					e = e||window.event;
					___$moveBlock.css('left', (e.clientX - ___mouseLastOffsetLeft) > 0 ? (e.clientX - ___mouseLastOffsetLeft) : 0)
				}
				toggleBindMoveHandler();
			}
			//鼠标点开
			function upHandler() {
				if (___$moveBlock) {
					updateCtnWidth(parseInt(___$moveBlock.css('left'),10)-___lastOffsetLeft,___$moveBlock.index());
					___$moveBlock.removeClass('col-divider-dragging');
					___$tbSampleTb.parent().removeClass('col-resizing-table');
					___$moveBlock = null;
				}
				unbindMoveUpHandler();
			}
			//解除绑定 再绑定
			function toggleBindMoveHandler() {
				window.removeEventListener('mousemove', moveHandler, false);
				setTimeout(function () {
					window.addEventListener('mousemove', moveHandler, false);
				}, 30);
			}
			//解除绑定 鼠标在window的事件
			function unbindMoveUpHandler() {
				window.removeEventListener('mousemove', moveHandler, false);
				window.removeEventListener('mouseup', upHandler, false);
			}


			/*加载数据*/
			init();

			/*事件绑定*/
			if (___isDataTable) {//如果是datatable
				$('.dataTables_paginate', ___$context).click(function (e) {
					e = e.target || window.event.srcElement;
					if ($(e).hasClass('paginate_button')) {
						window.setTimeout(updateCtnHeight, 50);
					}
				});
				$('.dataTables_filter', ___$context).find(':input').keyup(updateCtnHeight);
				$('.dataTables_length', ___$context).find('select').on('change', updateCtnHeight);
			}
			___$ctn && ___$ctn.children().on({
				'mousedown': function (e) {
					___$moveBlock = $(this);
					___$moveBlock.addClass('col-divider-dragging');
					___$tbSampleTb.parent().addClass('col-resizing-table');
					___lastOffsetLeft = parseInt(___$moveBlock.css('left'),10);
					___mouseLastOffsetLeft = e.clientX - parseInt(___$moveBlock.css('left'), 10);

					window.addEventListener('mousemove', moveHandler, false);
					window.addEventListener('mouseup', upHandler, false);
				}
			});

			return {
                resize:function(width) {
                    app.shelter.show('正在重置表格大小，请稍后…');
                    setTimeout(function(){
                        var ctnWidth=___$ctn.width(),
                            $children=___$ctn.children(),
                            colWidth= 0, percent,
                            tableProps,trWidths=[],colWidths=[];

                        width=parseFloat(width||___$context.width());

                        if(___$tbSampleTb.css('table-layout')==='fixed'){
                            width=Math.max(width *.93,width-15).toFixed(2);
                            percent = (width / ctnWidth).toFixed(4);

                            ___$tbSampleTb.css({
                                'width':width,
                                'overflow':'hidden'
                            });
                            ___$tbSampleTb.find('tr:first').children().each(function (index) {
                                var $this=$(this);
                                $this.css('width', Math.floor($this.width() * percent)-6);
                            });
                        }else{
                            percent = width / ctnWidth;

                            ___$tbSampleTb.css('width',width);
                            ___$tbSampleTb.find('tr:first').children().each(function (index) {
                                var $this=$(this);
                                $this.css('width', $this.width() * percent);
                            });
                        }


                        ___$tbSampleTb.find('tr:first').children().each(function (index) {
                            var $this=$(this);

                            $children.eq(index).css('left', colWidth+=$this.outerWidth());
                            trWidths.push($this.width());
                            colWidths.push(colWidth);
                        });

                        //调整属性 tableProps属性用于保存
                        tableProps= {
                            width: ___$tbSampleTb.width(),
                            left: ___$tbSampleTb.css('margin-left')
                        };

                        ___$ctn.css(tableProps);
                        if(tableProps.width>___$context.width()){
                            ___$ctn.css({
                                'padding':'0 1em'
                            });
                        }else{
                            ___$ctn.css({
                                'padding':'0'
                            });
                        }
                        ___$tbSampleTb.css('width',___$ctn.width());
                        updateCtnHeight();

                        if(___isSave){
                            tableProps.colWidths=colWidths;
                            tableProps.trWidths=trWidths;
                            $.setCookie(___id, JSON.stringify(tableProps));
                        }

                        app.shelter.hide();

                    },100);
                }
			}
		};
        
        
        /*
         * 可拖动预警块
         * */
        var warningResizeDiv =function () {
            var $body = $('html,body'),
                $warningBar = $('#warningBar',$body).removeClass('hidden'),
                $warningDiv = $('#warningDiv',$body).removeClass('hidden'),
                $container = $('[data-role=container]',$body),
                $banner = $('#leftAside',$body),
                $showWangingBtn = $('#showWangingBtn', $banner),
                $warningContent = $('.aweb-alert-content'),
                ___warningDivInitHeight = 400,
                ___minHeight = 150,
                ___maxHeight,
                ___startClientY,
                ___lastClientY,
                ___$moveBlock,
                ___startWarningHeight,
                ___startContainerHeight;

            //当重置时，调用的函数
            var resizeCallBack={};

            /*初始化高度*/
            function init () {
                var $target, $hideTarget,containerHeight,
                    ___warningDivIsClose=$.getCookie('___warningDivIsClose');


                if(___warningDivIsClose==='true') {
                    $showWangingBtn.removeClass('hide');
                    $warningDiv.addClass('hide');
                    $warningBar.addClass('hide');
                }

                if ($container.hasClass('hide')) {
                    $target = $warningDiv;
                    $hideTarget = $container;
                } else if ($warningDiv.hasClass('hide')) {
                    $target = $container;
                    $hideTarget = $warningDiv;
                } else {
                    ___warningDivInitHeight = $.getCookie('___warningDivInitHeight') || ___warningDivInitHeight;
                    $warningDiv.css('height', ___warningDivInitHeight);
                    $warningContent.css('height', ___warningDivInitHeight);
                    $target = $container;
                    $hideTarget = $warningDiv;
                }

                containerHeight = $(window).innerHeight()
                    - ($banner.hasClass('full') ? 0 : $banner.outerHeight()) - parseFloat($banner.css('margin-bottom'), 10)
                    - ($hideTarget.hasClass('hide') ? 0 : $hideTarget.outerHeight()) - parseFloat($warningDiv.css('margin-bottom'), 10)
                    - ($warningBar.hasClass('hide') ? 0 : $warningBar.outerHeight());

                $target.css('height', containerHeight- ($target.outerHeight() - $target.height()));

                if (!($container.hasClass('hide')||$warningDiv.hasClass('hide'))) {
                    ___maxHeight =$(window).innerHeight()
                        - $banner.outerHeight() - parseFloat($banner.css('margin-bottom'), 10)
                        - parseFloat($warningDiv.css('margin-bottom'), 10);
                       /* - ___minHeight;*/
                }
            }
            function resize(){
                init();
                if(!$container.hasClass('hide')) {
                    setTimeout(resizeCtn, 500);
                }
            }
            /*鼠标移动*/
            function moveHandler (e) {
                var tempHeight;
                if(___$moveBlock) {
                    e = e || event;
                    ___lastClientY = e.clientY - ___startClientY;
                    tempHeight =___startWarningHeight-___lastClientY;

                    if (tempHeight > ___minHeight&& tempHeight<___maxHeight) {
                        $warningDiv.css('height', (___startWarningHeight - ___lastClientY));
                        $container.css('height', ___startContainerHeight + ___lastClientY);
                        $warningContent.css('height', (___startWarningHeight - ___lastClientY));
                    }
                }
            }
            /*鼠标抬起*/
            function upHandler () {
                if(___$moveBlock){
                    $body.removeClass('no-select');

                    ___$moveBlock = null;
                    ___warningDivInitHeight = $warningDiv.height();
                    $.setCookie('___warningDivInitHeight', ___warningDivInitHeight);

                    resizeCtn();
                }
                unbindMoveUpHandler();
            }

            //解除绑定 鼠标在window的事件
            function unbindMoveUpHandler() {
                window.removeEventListener('mousemove', moveHandler, false);
                window.removeEventListener('mouseup', upHandler, false);
            }

            //重置页面框大小
            function resizeCtn() {
                var uid, callback;
                //如果是当前页面，则执行当前页的resize函数
                uid = app.dispatcher.currentHandler&&app.dispatcher.currentHandler.uid;
                if (uid&&(callback = resizeCallBack[uid])) {
                    callback();
                }
            }

            /*加载初始高度*/
            init();

            //鼠标按下
            $warningBar.on({
                'mousedown': function (e) {
                    if(!___$moveBlock){
                        e = e||event;
                        ___startWarningHeight = $warningDiv.height();
                        ___startContainerHeight = $container.height()+20;
                        ___$moveBlock = $(this);
                        ___startClientY = e.clientY;


                        $body.addClass('no-select');

                        window.addEventListener('mousemove', moveHandler, false);
                        window.addEventListener('mouseup', upHandler, false);
                    }
                }
            });
            //预警块放大缩
            $('#minmaximize',$warningDiv).click(function(){
                app.screen(app.screen.fullScreen.FULL,app.screen.show.TOGGLE,null,true);
            });
            //关闭预警块
            $('#closeWarning',$warningDiv).click(function(){
                //设置关闭cookie
                $.setCookie('___warningDivIsClose','true');

                $warningBar.addClass('hide');//注意这里是的确有两次的隐藏
                $warningDiv.addClass('content-warning-hiding');

                TweenLite&&TweenLite.fromTo($warningDiv[0], .35, {
                    opacity:.5,
                    x:'0',
                    y:'0',
                    width:'100%',
                    ease: Quint.easeInOut
                }, {
                    opacity: 0,
                    x: $(window).width() *.4,
                    y: $(window).height() *-.9,
                    width:'40%',
                    ease: Quint.easeInOut,
                    delay:0,
                    onComplete:function() {
                        $warningDiv.addClass('hide').removeClass('content-warning-hiding').removeAttr('style');
                        $showWangingBtn.removeClass('hide');
                        $container.hasClass('hide')?app.screen(app.screen.fullScreen.FULL,app.screen.show.TOGGLE,null,true):resize();
                        $warningBar.addClass('hide');
                    }
                });
            });
            //点开预警块
            $showWangingBtn.click(function(){
                $.setCookie('___warningDivIsClose','false');
                $warningDiv
                    .removeClass('hide').addClass('content-warning-hiding');

                TweenLite&&TweenLite.fromTo($warningDiv[0], .35, {
                    opacity:.5,
                    x: '10%',
                    width:'80%',
                    ease: Quint.easeInOut
                }, {
                    x: '-=10%',
                    y: '+=.5%',
                    opacity: 1,
                    height: $.getCookie('___warningDivInitHeight'),
                    ease: Quint.easeInOut,
                    delay:0,
                    onComplete:function() {
                        $warningDiv.removeClass('content-warning-hiding').removeAttr('style');
                        $warningBar.removeClass('hide');
                        $showWangingBtn.addClass('hide');
                        resize();
                    }
                });
            });

            $(window).resize(resize);

            return {
                add: function (uid, callback) {
                    resizeCallBack[uid] = callback;
                },
                remove: function (uid) {
                    delete resizeCallBack[uid];
                },
                trigger: function (uid) {
                    resizeCallBack[uid] && resizeCallBack[uid]();
                },
                resize:resize
            }
        }();

        

        /*
         * 获取hsl颜色
         * */
        var hsla=function (opt,random) {
            var $elem=$('<div>'),
                targetCSS='background-color',css;

            opt= $.extend(opt,this.defaltOptions);

            $elem.css(targetCSS, 'hsl('+ [(random?Math.floor(Math.random() * 361):opt.h),opt.s,opt.l].join(',')  +')');

            css = $elem.css(targetCSS).toString();

            if (jQuery.support.opacity) {
                return css.replace('rgb', 'rgba').replace(')', ',' + opt.a + ')');
            }
            return css;
        };
        hsla.defaltOptions= {
            h: Math.floor(Math.random() * 361),
            s: '50%',
            l: '50%',
            a: 1
        };

        //滚动到底部
        //$container 带滚动条的容器
        //$content 需要滚动到顶部的内容
        var scrollTop = function($container,$content,speed,marginTop) {
            var cttOffset = $content.offset(),
                ctnOffset = $container.offset();
            if(ctnOffset&&cttOffset) {
                marginTop = marginTop ? parseInt(marginTop) : 0;
                $container.animate({scrollTop: cttOffset.top + $container.scrollTop() - ctnOffset.top - marginTop}, speed || 200);
            }
        };
        scrollTop.position=function(evevnt,$container,$content,fixTop,fixLeft) {
            return {
                top: (($container.height() > $content.height() + evevnt.clientY) ? evevnt.clientY : (evevnt.clientY - $content.height())) - (fixTop || 0),
                left: (($container.width() > $content.width() + evevnt.clientX) ? evevnt.clientX : (evevnt.clientX - $content.width())) - (fixLeft || 0)
            }
        };


        //可键入下拉框
        (function ( $ ) {

            $.fn.editableSelect = function() {
                var $elem;

                this.each(function() {
                    var $wrapper,
                        $select = $(this), $input, $triangle, $list,
                        objID, rightPadding = 15,
                        isFormControl=$select.parent().hasClass('controls');
                    //check if element is a select
                    if ($select.is('select')) {
                        //wrap the original select
                        $select.wrap($('<div/>'));
                        $wrapper = $select.parent().css({display: isFormControl?'block':'inline-block'});

                        //place an input which will represent the editable select
                        $input = $('<input/>').insertBefore($select);

                        //get and remove the original id and value
                        objID = $select.attr('id');
                        $select.removeAttr('id');
                        $input.val($select.val());

                        //add the attributes from the original select
                        $input.attr({
                            autocomplete:'off',
                            alt: $select.attr('alt'),
                            title: $select.attr('title'),
                            'class': $select.attr('class'),
                            name: $select.attr('name'),
                            disabled: $select.attr('disabled'),
                            tabindex: $select.attr('tabindex'),
                            id: objID,
                            placeHolder: $select.children(':disabled').text()
                        });

                        //get the editable css properties from the select
                        $input.css({
                            padding: $select.css('padding'),
                            margin: $select.css('margin'),
                            width: $select.width() - rightPadding + parseInt($select.css('paddingRight')),
                            height: $select.height(),
                            border: $select.css('border'),
                            borderRadius: $select.css('borderRadius'),
                            fontFamily: $select.css('fontFamily'),
                            fontSize: $select.css('fontSize'),
                            background: $select.css('background'),
                            paddingRight: rightPadding
                        });


                        //add the triangle at the right
                        $triangle = $('<div/>').css({
                            height: 0, width: 0,
                            borderLeft: '5px solid transparent',
                            borderRight: '5px solid transparent',
                            borderTop: '7px solid #999',
                            position: 'relative',
                            top: -($input.outerHeight(true) / 2) - (isFormControl?5:7),
                            left: $input.width() + rightPadding - 10,
                            marginBottom: '-7px'
                        }).insertAfter($input);

                        //create the selectable list that will appear when the input gets focus
                        $list = $('<ol class="editable-select-list"/>')
                            .css({
                                display: 'none',
                                listStyleType: 'none',
                                width: $input.outerWidth() - 2,
                                maxHeight:$(window).height()/2,
                                overflow:'auto',
                                padding: 0,
                                margin: 0,
                                border: 'solid 1px #ccc',
                                fontFamily: $input.css('fontFamily'),
                                fontSize: $input.css('fontSize'),
                                background: '#fff',
                                position: 'fixed',
                                zIndex: 1000000
                            })
                            .insertAfter($triangle);


                        //add options
                        $select.children(':not(:disabled)').each(function (index, value) {
                            prepareOption($(value).attr('value'),$(value).text(), $wrapper);
                        });
                        $wrapper.on('mouseleave',function(){
                            $(this).children('ol').hide();
                        });
                        $input
                            .click(function(e){
                                var $this=$(this),
                                    $list=$this.siblings('ol').css('height',''),
                                    isBlock=$this.parent().css('display')==='block',
                                    offsetTop=parseInt($this.offset().top, 10)||0,
                                    top=isBlock?(offsetTop+$this.outerHeight(true)-1):(offsetTop+$this.outerHeight(true)-(parseInt($this.css('margin-bottom'))||0)),
                                    height='';

                                if(!($(window).height() > $list.height() + top)) {
                                    if ((top = offsetTop - $list.height()) < 0) {
                                        height = offsetTop - 10;
                                        top = 10;
                                    }
                                }

                                $list.css({
                                    top: top,
                                    display: 'block',
                                    height:height
                                });
                            })
                            .keyup(function (e) {
                                if (e.which == 13)    $(this).parent().trigger('mouseleave');
                            })
                            .change(function() {
                                var $this = $(this);
                                $this.attr('data-value', $this.val());
                            });
                        $triangle.click(function(){
                            $(this).siblings('input').click();
                        });
                        $list.click(function (e) {
                            //bind click on this option
                            var $e = $(e.target || window.event.srcElement),
                                $this;

                            if ($e.is('li')) {
                                $this=$(this);
                                $this.siblings('input')
                                    .val($e.text())
                                    .trigger('change')//注意顺序
                                    .attr('data-value', $e.attr('data-value'));
                                $this.hide();
                            }
                        });
                        //hide original element
                        $select.css({visibility: 'hidden', display: 'none',position:'absolute'});

                        //save this instance to return it
                        $elem = $input;
                    } else {
                        //not a select
                        return false;
                    }
                });//-end each

                /** public methods **/

                /**
                 * Adds an option to the editable select
                 * @param {String} value - the options value
                 * @returns {void}
                 */
                $elem.addOption = function(value,text) {
                    prepareOption(value,text, $(this).parent());
                };

                /**
                 * Removes a specific option from the editable select
                 * @param {String, Number} value - the value or the index to delete
                 * @returns {void}
                 */
                $elem.removeOption = function(value) {
                    var $this = $(this);
                    if(!value){
                        $this.siblings('ol').children().remove();
                    }else{
                        switch (typeof(value)) {
                            case 'number':
                                $this.siblings('ol').children(':nth(' + value + ')').remove();
                                break;
                            case 'string':
                                $this.siblings('ol').children().each(function (index, optionValue) {
                                    if ($(optionValue).attr('data-value') == value) {
                                        $(optionValue).remove();
                                    }
                                });
                                break;
                        }
                    }
                };


                /*
                *
                * 获取其值 真实值
                * */
                $elem.value=function(){
                  return   $(this).siblings('input').attr('data-value');
                };

                /**
                 * Resets the select to it's original
                 * @returns {void}
                 */
                $elem.restoreSelect = function() {
                    var $wrapper = $(this).parent(),
                        $select = $wrapper.children('select'),
                        objID = $elem.attr('id');

                    $wrapper.off();
                    $wrapper.children(':not(select)').off().remove();
                    $select.unwrap();
                    $wrapper = null;

                    $select.css({visibility: '', display: '',position:''});
                    $select.attr({id: objID});
                    $select = null;
                };

                //return the instance
                return $elem;
            };

            /** private methods **/

            function prepareOption(value,text, $wrapper) {
                text = $.trim(text || value);
                value = $.trim(value || text);
                $('<li data-value="' + value + '" title="' + text + '">' + text + '</li>').appendTo($wrapper.children('ol'));
            }


            var mousewheelHandler,hasWheel=false;
            $(window).on('mousewheel',function(e) {
                if (!hasWheel) {
                    hasWheel = true;
                    var $e = $(e.target || window.event.srcElement);
                    if (!($e.hasClass('editable-select-list') || $e.parent().hasClass('editable-select-list'))) {
                        $('.editable-select-list').hide();
                    }
                }
                window.clearTimeout(mousewheelHandler);
                mousewheelHandler = setTimeout(function () {
                    hasWheel = false;
                }, 100);
            });

        }( jQuery ));

        function multiSelect(options) {
        	var $dataTable = options.dataTable,
        		tableSelector = options.tableSelector,
        		checkAllSelector = options.checkAllSelector,
                isTREnableCheck = "isTREnableCheck" in options?options.isTREnableCheck:true,
        		context = options.context,
                change = options.change && options.change,
        		defaultDisabled = options.optBtn && options.optBtn.defaultDisabled,//默认禁用按钮
        		onlySelectedOneEnabled = options.optBtn && options.optBtn.onlySelectedOneEnabled;//仅选一项时，按钮可用
        	
        	//默认禁用按钮
        	$(defaultDisabled, context).addClass('disabled');
        	
        	//全选多选框事件
        	$(checkAllSelector, context).click(function(e) {
        		console.log($dataTable)
				if($(this).prop('checked')){
					$(tableSelector, context).find('input[type="checkbox"]').prop('checked', true)
//					$dataTable.$('input').prop('checked', true);
					$(defaultDisabled, context).removeClass('disabled');
					$(onlySelectedOneEnabled, context).addClass('disabled');
				} else {
					$(tableSelector, context).find('input[type="checkbox"]').prop('checked', false)
					$(defaultDisabled, context).addClass('disabled');
				}
                change && change();				
			});
			
        	//点击某行修改对应的多选框，同时更新全选多选框的样式
            if(isTREnableCheck){
    			$(tableSelector + ' tbody', context).on('click', 'tr', function(e) {
                    e.stopPropagation();
                    $dataTable.rows().nodes().to$().find('input').prop('checked', false);// 点击某一行，只选中一行，取消其他行选中。
    				if($(this).find('input').prop('checked') == true) {
    					$(this).find('input').prop('checked', false);
    				} else {
    					$(this).find('input').prop('checked', true);
    				}
    				updateCheckAllBoxStyle();
    			});
            }
			
			//点击某行的多选框时更新全选多选框的样式
			$(tableSelector + ' tbody', context).on('click', 'input', function(e) {
				e.stopPropagation();
				updateCheckAllBoxStyle();						
			});
			
			//更新全选多选框样式
            function updateCheckAllBoxStyle() {
                change && change();
                var len = $dataTable.$('tr').length;
                var checkLen = $dataTable.$('input:checked').length;
                switch(checkLen) {
                    case 0:
                        $(checkAllSelector, context).prop('indeterminate', false).prop('checked', false);
                        $(defaultDisabled, context).addClass('disabled');
                        break;
                    case len:
                        $(checkAllSelector, context).prop('indeterminate', false).prop('checked', true);
                        $(defaultDisabled, context).removeClass('disabled');
                        if(len != 1){
                            $(onlySelectedOneEnabled, context).addClass('disabled');
                        }
                        break;
                    default: 
                        $(checkAllSelector, context).prop('indeterminate', true).prop('checked', false);
                        $(defaultDisabled, context).removeClass('disabled');
                        if(checkLen != 1) {
                            $(onlySelectedOneEnabled, context).addClass('disabled');
                        }
                }
            }
			
			return {
				getSelectedDatas: function() {//获取选中行数据
					var datas = [];
					$dataTable.$('input:checked').each(function(i, item) {
						datas.push($dataTable.rows($(item).parents('tr')).data()[0]);
					});
					return datas.length ? datas : null;
				},
				getSelectedValues: function(key) {//获取选中行对应键的值
					var values = [];
					$dataTable.$('input:checked').each(function(i, item) {
						values.push($dataTable.rows($(item).parents('tr')).data()[0][key]);
					});					
					return values.length ? values : null;
				},
				setSelectedItems: function(uid, arr) {//选中默认项，uid为各项的标识，arr为选中项对应uid值组成的数组
					if(!arr) return;
					var data = $dataTable.rows().data();	
					
					arr.forEach(function(item, i) {
						for(var j = 0; j < data.length; j++) {
							if(data[j][uid] == arr[i]) {
								$($dataTable.$('tr')[j]).find('input').prop('checked', true);
							}
						}
					});
					
					updateCheckAllBoxStyle();
				},
				clear: function() {
					$dataTable.$('input').prop('checked', false);
					updateCheckAllBoxStyle();
				},
				destroy: function() {
					$(checkAllSelector, context).off();
					$(tableSelector + ' tbody', context).off();
					$dataTable = null;
	        		tableSelector = null;
	        		checkAllSelector = null;
	        		context = null
	        		defaultDisabled = null;
	        		onlySelectedOneEnabled = null;
	        		options = null;
				}
			}
			
        }
        
        return {
			alert: alertClass.alert,
			showType: alertClass.showType,
			msgType: alertClass.msgType,
            confirm: confirm,
            warning:warning,
            formControl: rightAside,
            shelter: shelter,
            screen: screen,
            banner: banner,
            selectComponent: SelectComponent,
            scrollTop: scrollTop,
            colResizeTable:colResizeTable,
            contentCtnResize:warningResizeDiv,
            hsla: hsla,
            confirmDialog: confirmDialog,
            multiSelect: multiSelect
		};
	});

})();
