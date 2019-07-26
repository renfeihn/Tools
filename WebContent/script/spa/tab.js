/*!
 * Javascript library v3.0
 *
 * Date: 2015.07.30
 */

/**
 * [标签栏]
 *
 * @param {[undefined]} undefined [undefined]
 * @author lijiancheng@cfischina.com
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

    })(function ($) {
        "use strict";

        var Label = function () {
            //选项卡标签移动
            var $mainCtn=$('[data-role="container"]'),
                $tabsContainer=$('#tabsContainer',$mainCtn),
                $tabs=$('#tabs',$tabsContainer),
                $pageCtns=$('#awebPageFrame',$mainCtn),
                moveBtns='#tabsLeft,#tabsRight',
                tabsTemp=$('#tabsTemp').children(':eq(0)')[0].outerHTML,
                closeTimeout,
                windowsList={},
                newWindowsList=[];

            //右键关闭窗口参数
            var contextMenuOption= {
                    FIRST: ['middle','others', 'all'],
                    CURRENT: ['middle','others','all'],
                    LAST: ['middle','others', 'all'],
                    ONLY:['middle'],
                    /*left: {
                     name: '关闭左侧窗口',
                     filter: ':lt(_index_)'
                     },*/
                    middle: {
                        name: '关闭此窗口',
                        filter: ':eq(_index_)'
                    },
                    /*right: {
                     name: '关闭右侧窗口',
                     filter: ':gt(_index_)'
                     },*/
                    others: {
                        name: '关闭其他窗口',
                        filter: ':not(:eq(_index_))'
                    },
                    all: {
                        name: '关闭所有窗口',
                        filter: ''
                    },
                    ctnTemp:'<ul class="dropdown-menu" style="position:fixed;"></ul>',
                    lineTemp:'<li data-filter="_filter_">_name_</li>'
                },
                isContextMenuClick;

            function focusTab($tab, $btn) {
                var widths = 0,
                    totalWidths= 0,
                    $lis = $tab ? $('li:lt(' + ($tab.index() + 1) + ')', $tabs) : $('li', $tabs),
                    $tabBtn = $btn || $('#tabsLeft'),
                    tabsContainerWidth = $('#tabsContainer').innerWidth() - $tabBtn.outerWidth() *3.2,
                    tabsOffsetLeft = parseInt($tabs.css('left'),10);

                //获取tabs总长度
                $lis.each(function (index, elem) {
                    widths += $(elem).outerWidth();
                });

                if($tabs.children().length===$lis.length){
                    totalWidths=widths;
                }else{
                    $tabs.children().each(function(index,elem){
                        totalWidths+= $(elem).outerWidth();
                    });
                }
                
                if(totalWidths<tabsContainerWidth){
                    $(moveBtns,$tabsContainer).addClass('hidden');
                    $(".tabs-left-group",$tabsContainer).css('z-index','0');
                }else{
                    $(moveBtns,$tabsContainer).removeClass('hidden');
                    $(".tabs-left-group",$tabsContainer).css('z-index','2');
                }

                //点击向左/右
                if($btn){
                    if($btn[0].id==='tabsLeft'){
                        tabsOffsetLeft+=tabsContainerWidth;
                    }else{
                        tabsOffsetLeft-=tabsContainerWidth;
                    }
                }else{
                    //如果tab不为空，则指向tab激活那个
                    //否则最后一个
                    tabsOffsetLeft=tabsContainerWidth-widths;
                }

                if(tabsContainerWidth-widths>tabsOffsetLeft){
                    //假如偏右超界
                    tabsOffsetLeft=tabsContainerWidth-widths;
                }else if(tabsOffsetLeft>0){
                    //偏左超界
                    tabsOffsetLeft=tabsOffsetLeft>0?0:tabsOffsetLeft;
                }

                $tabs.animate({'left': tabsOffsetLeft + 'px'}, 500);
            }

            function pausePage($page,$tab){
                if($page&&$page.length) {
                    $page.attr('data-scroll-top',$page.parent().scrollTop());//记录当前页面高度
                    $page.addClass('hide');
                    TweenLite.killTweensOf($page[0]);
                }
                if($tab&&$tab.length) {
                    $tab.addClass('closing');

                    setTimeout(function () {
                        TweenLite.killTweensOf($tab[0]);
                        $tab.remove();
                    }, 500);
                    TweenLite.to($tab[0],.5, {
                        opacity: 0,
                        height: 0,
                        width: 0,
                        padding: 0,
                        y: '-=100%',
                        margin: '-2px',
                        overflow: 'hidden',
                        ease: Quint.easeOut,
                        delay: 0
                    });

                    if($tabs.children(':not(.closing)').length===0){
                        var $tabsFull = $("#tabsFull");
                        app.screen(app.screen.fullScreen.CONTAINER,app.screen.show.SHOW);
                        $tabsFull.attr('title',$tabsFull.attr('data-full-title'));
                        $tabsFull.children().attr('class','fa fa-expand');

                        //如果没有其他tab标签
                        /*TweenLite.to($mainCtn[0],.3,{
                            opacity:0,
                            x:'-=10%',
                            ease:Quint.easeOut,
                            delay:0
                        });
                        setTimeout(function(){
                            $mainCtn.addClass('hidden');
                        },300);*/
                    }
                }
            }

            function activePage($page,tab){
                if($page&&$page.length) {
                    TweenLite.fromTo($page[0], 1, {
                        opacity: 0,
                        ease: Quint.easeOut
                    }, {
                        opacity: 1,
                        ease: Quint.easeOut,
                        delay: 0
                    });
                    $page.parent().scrollTop($page.attr('data-scroll-top') || 0);
                }
                if(tab){
                    TweenLite.fromTo(tab,.5,{
                        opacity:0,
                        y:'100%',
                        ease:Quint.easeOut
                    },{
                        opacity:1,
                        y:'-=100%',
                        ease:Quint.easeOut
                    });
                }
            }

            function clearMainCtnCss(){
                var hasChange=false,
                    timeoutHandler=window.setInterval(function(){
                        if(hasChange) window.clearInterval(timeoutHandler);

                        if($mainCtn.css('transform')){
                            $mainCtn.css({
                                'transform':'',
                                'opacity':''
                            });
                            hasChange=true;
                        }
                    },300);
            }

            function closeTabs(filter){
                var $children,$notActiveChildren,$activeChildren,closeNotActiveHandler;
                if(typeof filter ==='string') {
                    app.shelter.show();

                    $children = $tabs.children(filter);
                    $notActiveChildren = $children.not('.active');
                    $activeChildren = $children.filter('.active');

                    $notActiveChildren.children('.close').trigger('click');


                    if($activeChildren.length){
                        closeNotActiveHandler=setInterval(function(){
                            if(!$tabs.children('.closing').length) {
                                $activeChildren.children('.close').trigger('click');
                                clearInterval(closeNotActiveHandler);
                                isContextMenuClick = false;
                                app.shelter.hide();
                            }
                        },100);
                    }else {
                        isContextMenuClick = false;
                        app.shelter.hide();
                    }
                }
            }
            
            /* 标签页和主菜单联动Start */
            function linkTabsMenu(tabHref,tabTitle){
            	if(tabHref.indexOf("workSpace")>-1){
            		var $this = $("#awebWorkbench");
            		if(!$this.hasClass("aweb-main-menu-bg-click")) {
            			changeMenuCss($this);
            		}
            	}else if(tabHref.indexOf("appAll")>-1 || tabHref.indexOf("monitor")>-1){
            		var $this = $("#awebMonitorManager");
            		if(!$this.hasClass("aweb-main-menu-bg-click")) {
            			changeMenuCss($this);
            		}
            	}else if(tabHref.indexOf("eventContainer")>-1){
            		var $this = $("#awebEvent");
            		if(!$this.hasClass("aweb-main-menu-bg-click")) {
            			changeMenuCss($this);
            		}
            	}else if(tabHref.indexOf("buildingContainer")>-1 && tabTitle=="报表中心"){
            		var $this = $("#awebReport");
            		if(!$this.hasClass("aweb-main-menu-bg-click")) {
            			changeMenuCss($this);
            		}
            	}else if(tabHref.indexOf("buildingContainer")>-1 && tabTitle=="运维工具"){
            		var $this = $("#awebOperation");
            		if(!$this.hasClass("aweb-main-menu-bg-click")) {
            			changeMenuCss($this);
            		}
            	}else if(tabHref.indexOf("ab")>-1){
            		var $this = $("#aweb-monitor-special");
            		if(!$this.hasClass("aweb-main-menu-bg-click")) {
            			changeMenuCss($this);
            		}
            	}else if(tabHref.indexOf("bigScreen")>-1){
            		var $this = $("#awebLargeScreen");
            		if(!$this.hasClass("aweb-main-menu-bg-click")) {
            			changeMenuCss($this);
            		}
            	}else {
            		cleanMenuCss(1);
            	}
            }
            //改变主菜单样式
            function changeMenuCss($this){
            	//删除其他菜单的点击样式
            	cleanMenuCss(1);
    			//为相关菜单加上点击样式
    			$this.addClass("aweb-main-menu-bg-click");
    			$this.children(".aweb-main-menu-triangle").show();
            }
            //清理主菜单样式
            function cleanMenuCss(tabLength){
            	if(tabLength==1){
        			$(".aweb-main-menu").removeClass("aweb-main-menu-bg-click");
        			$(".aweb-main-menu-triangle").hide();
        			$(".aweb-main-menu-sub").hide();
        			$(".aweb-main-menu-sub-triangle").hide();
        		}
            }
            /* 标签页和主菜单联动End */
            
            this.open = function (title, mvvmConfPath,tabId) {
                var dataHref=mvvmConfPath+'Container',
                    $lastTab = $('.active', $tabs),
                    $tab = $tabs.children('[data-href^="' + dataHref + '"]');
                // index;

                //关闭之后可能造成相同的索引index，所以只能设置一个只递增的索引
                windowsList[dataHref]=windowsList[dataHref]?windowsList[dataHref]+1:1;
                // index=windowsList[dataHref];

                $tab=tabId?$tab.filter('[data-tab-id="'+tabId+'"]'):$tab.filter('[title="'+title+'"]');

                //同一个模块，但内容不同的时候
                if ($tab.length<1) {
                    if($mainCtn.hasClass('hidden')){
                        TweenLite.killTweensOf($mainCtn[0]);
                        TweenLite.fromTo($mainCtn.removeClass('hidden')[0],.2,{
                            opacity:0,
                            x:'-10%',
                            y:'+2.5%',
                            ease:Quint.easeOut
                        },{
                            opacity:1,
                            x:'+=10%',
                            y:'-=2.5%',
                            ease:Quint.easeOut,
                            delay:0
                        });

                        clearMainCtnCss();
                    }

                    //设置container ID
                    dataHref+=windowsList[dataHref];

                    //上一个tab移除激活状态
                    $lastTab.removeClass('active');
                    app.dispatcher.pause();


                    //添加到选项卡tabs中
                    $tabs.append(tabsTemp
                        .replace(/\{tabId\}/g, tabId)
                        .replace(/\{href\}/g, dataHref)
                        //.replace(/\{index\}/g,index)
                        .replace(/\{title\}/g, title));

                    //添加到内容容器中
                    pausePage($pageCtns
                        .append('<div id="' + dataHref + '"></div>')
                        .children('#' + $lastTab.attr('data-href')));//隐藏上一个tab
                    activePage($pageCtns.children(':last')[0],$tabs.children(':last'));
                    focusTab(null, null);

                    //返回新建容器的ID
                    return dataHref;
                } else if (!$tab.hasClass('active')) {
                    //如果已经存在，则改变焦点
                    $lastTab.removeClass('active');
                    pausePage($pageCtns.children('#'+$lastTab.attr('data-href')));
                    app.dispatcher.pause();
                    focusTab($tab.addClass('active'), null);
                    activePage($pageCtns.children('#'+$tab.attr('data-href')).removeClass('hide'));
                    $pageCtns.children('#'+$tab.attr('data-href')).length&&app.dispatcher.resume($tab.attr('data-href'));
                }
                //返回不用创建容器的
                return null;
            };
            
            //双击关闭标签 - write by chenweikang  kvikon@gmail.com
        	$("#tabs",$tabsContainer).dblclick(function(event){
        		var $li = $(event.target || window.event.srcElement).closest('li');
        		$li.find('.close').trigger('click');
        		//当全部标签都关闭时，去除主菜单的点击样式-chenweikang
        		cleanMenuCss($("#tabs").children("li").length);
        	})
        	
        	$("#tabs",$tabsContainer).click(function (e) {
                var $tab, $lastTab, $nextTab;
                e = e.target || event.srcElement;
                if (e.className.indexOf('close') >= 0) {
                    //原close函数
                    //关闭tab事件、释放容器html
                    $tab = $(e).closest('li');
                    app.dispatcher.unload($tab.attr('data-href'));
                    pausePage($pageCtns.children('#' + $tab.attr('data-href')),$tab);
                    if ($tab.hasClass('active')) {
                        //激活恢复状态
                        $tab.removeClass('active');
                        $nextTab = $tab.index() ? $tab.prev() : $tab.next();
                        if ($pageCtns.children('#' + $nextTab.attr('data-href')).length) {
                            $nextTab.addClass('active');
                            activePage($pageCtns.children('#' + $nextTab.attr('data-href')).removeClass('hide'));
                            focusTab($nextTab,null);
                            $pageCtns.children('#'+$nextTab.attr('data-href')).length&&app.dispatcher.resume($nextTab.attr('data-href'));
                            //标签页与主菜单联动
                            linkTabsMenu($nextTab.attr("data-href"),$nextTab.attr("title"));
                        }
                    }else{
                        //定位到激活的那个tab那里
                        (!isContextMenuClick)&&focusTab($tab.parent().children('.active'), null);
                    }
                    $('#' + $tab.attr('data-href'), '#awebPageFrame').remove();
                    $('body').css('opacity','');
                    //当全部标签都关闭时，去除主菜单的点击样式-chenweikang
                    cleanMenuCss($("#tabs").children("li").length);
                } else if (e.tagName.match(/^(A|LI)$/) != null) {
                    //原active函数
                    //选中tab
                    $tab = $(e).closest('li');
                    $lastTab = $(this).children('.active');
                    //标签页与主菜单联动
                    linkTabsMenu($tab.attr("data-href"),$tab.attr("title"));
                    if (!$tab.hasClass('active')) {
                        //暂停
                        $lastTab.removeClass('active');
                        pausePage($pageCtns.children('#' + $lastTab.attr('data-href')));
                        app.dispatcher.pause();

                        $tab.addClass('active');
                        activePage($pageCtns.children('#' + $tab.attr('data-href')).removeClass('hide'));
                        focusTab($tab, null);
                        $pageCtns.children('#'+$tab.attr('data-href')).length&&app.dispatcher.resume($tab.attr('data-href'));
                    }
                }
            }).on('contextmenu',function(e){
                var $li=$(e.target || event.srcElement).closest('li'),
                    $menu,
                    html='',lineTemp,
                    index,menuList,menu,length;

                if($li.length) {
                    length = $tabs.children().length;
                    lineTemp = contextMenuOption.lineTemp;
                    switch (index=$li.index()) {
                        case 0:
                            if (length === 1) {
                                menuList = contextMenuOption.ONLY;
                            } else {
                                menuList = contextMenuOption.FIRST;
                            }
                            break;
                        case length - 1:
                            menuList = contextMenuOption.LAST;
                            break;
                        default :
                            menuList = contextMenuOption.CURRENT;
                    }
                    menuList = ([].concat(menuList)).reverse();

                    for (length = menuList.length; (menu = contextMenuOption[menuList[--length]]);) {
                        html += lineTemp.replace('_filter_', menu.filter).replace('_name_', menu.name);
                    }

                    $menu = $('#tabsContextMenu',$mainCtn).html(html.replace(/_index_/g,index));
                    $menu.css(app.scrollTop.position(e, $(window), $menu),0,15).removeClass('hide');
                    $menu.one({
                        'click':function(e) {
                            isContextMenuClick=true;
                            closeTabs($(e.target || event.srcElement).attr('data-filter'));

                            $menu.addClass('hide');
                        },
                        'mouseleave':function(){
                            $menu.addClass('hide');
                        }
                    });
                    $tabs.one('mouseleave',function(e){
                        if(!$(e.relatedTarget).closest('ul').hasClass('tab-content-menu')) {
                            $menu.addClass('hide');
                        }
                    });
                }

                return false;
            });

            //向左或向右
            $(moveBtns,$tabsContainer).click(function () {
                focusTab(null, $(this));
            });
            $('#tabsFull',$tabsContainer).click(function(){
                var $this = $(this),
                    action =  app.screen(app.screen.fullScreen.FULL,app.screen.show.TOGGLE);
                switch(action){
                    case app.screen.show.HIDE:
                        $this.attr('title',$this.attr('data-retract-title'));
                        $this.children().attr('class','fa fa-compress');
                        break;
                    case app.screen.show.SHOW:
                        $this.attr('title',$this.attr('data-full-title'));
                        $this.children().attr('class','fa fa-expand');
                        break;
                }
            });
            app.screen.addResizeHandler({
                uid: app.global.getUniqueId(),
                isGlobal: true,
                timeout: 500,
                callback: function () {
                    focusTab($tabs.children('.active'), null);
                }
            });

            this.close=function(href,id){
                if(!closeTimeout) {
                    var $tab;
                    if (href) {
                        $tabs.children('.active').find('.close').trigger('click');
                    } else if (($tab = $tabs.children('[data-href="' + href + '"]')).length) {
                        app.alert('页面错误',
                            '页面(' + ($tab.attr('title') || '') + ')JS加载错误，请联系开发人员…',
                            app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                        $tab.find('.close').trigger('click');
                    }else if(id&&($tab = $tabs.children('[data-tab-id="' + id + '"]')).length){
                        $tab.find('.close').trigger('click');
                    }
                    closeTimeout = window.setTimeout(function () {
                        closeTimeout = null;//避免短时间内关闭过多tab
                    }, 50);
                }
            };



            //新窗口打开
            this.openNewWindow=function(options){
                if(options.id){
                    newWindowsList.push(options.id);
                    // app.dispatcher.pause();
                    app.dispatcher.load(options);
                }
            };
            this.closeNewWindow=function(lastTabID){
                if(newWindowsList.length){
                    app.dispatcher.unload(newWindowsList.pop());
                    // app.dispatcher.resume(lastTabID);
                }
            };
        };

        Label.prototype = {

            constructor: Label,

            tId: "#asideMenu"
        };

        return Label;
    });

})();