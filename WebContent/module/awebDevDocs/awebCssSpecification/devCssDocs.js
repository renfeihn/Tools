define([ "jquery" ], function() {

	return {
		// 模块加载结束后，会触发该方法
		load : function($el, scope, handler) {
            /*常量定义*/
            handler.params={
                options:{
                    items:[{
                        name:'样式文件',
                        subItems:[{
                            name:'Bootstrap',
                            href:'bootstrap',
                            icon:'fa fa-btc'
                        },{
                            name:'通用样式',
                            href:'common',
                            icon:'fa fa-css3'
                        },{
                            name:'字体图标样式',
                            href:'fontAwesome',
                            icon:'fa fa-facebook-official'
                        }]
                    },{
                        name:'布局',
                        subItems:[{
                            name:'CSS整体布局',
                            href:'location',
                            icon:'fa fa-css3'
                        },{
                            name:'页面布局',
                            href:'layout',
                            icon:'fa fa-home'
                        }]
                    },{
                        name:'基本样式',
                        subItems:[{
                        	icon:'fa fa-list-alt',
                            href:'typesetting',
                            name:'排版'
                        },{
                        	icon:'fa fa-asterisk',
                            href:'color',
                            name:'颜色'
                        }]
                    },{
                        name:'组件',
                        subItems:[{
                        	icon:'fa fa-square-o',
                            href:'button',
                            name:'按钮'
                        },{
                            icon:'fa fa-hand-o-up',
                            name:'鼠标悬停',
                            href:'hover'
                        },{
                        	icon:'fa fa-tasks',
                            href:'alert',
                            name:'提示与便签'
                        },{
                        	icon:'fa fa-tag',
                            href:'tabs',
                            name:'标签页Tabs'
                        },{
                            icon:'fa fa-th-list',
                            href:'contentPosition',
                            name:'左右布局DIV'
                        }]
                    },{
                        name:'CSS兼容',
                        subItems:[{
                        	icon:'fa fa-list-ol',
                            href:'nthChild',
                            name:'nth-child()'
                        },{
                        	icon:'fa fa-paint-brush',
                            href:'rgba',
                            name:'rgba()'
                        }]
                    },{
                        name:'JS组件',
                        subItems:[{
                        	icon:'fa fa-tasks',
                            href:'zIndex',
                            name:'z-index层级'
                        }]
                    }],
                    callback:function($ctn,$el) {
                        $('[data-href]', this).click(function () {
                            var href = $(this).attr('data-href');

                            if (href) {
                                app.scrollTop($ctn, $el.find('[data-href="' + href + '"]:first'), 500);
                            }
                        });
                    },
                    args:[$el.parent(),$el],
                    uid:handler.uid
                }
            };


            /*数据加载*/
            $('[data-role="tabsHTML"]',$el).text($('[data-role="tabsTemp"]',$el).html());

            //绑定banner的事件
            app.banner(handler.params.options);

            this.delegateEvents({
                'click a[data-link]':function clickHandler(){
                    var href=$(this).attr('data-link');

                    if(href){
                        app.scrollTop($el.parent(),$el.find('[data-href="'+href+'"]:first'),500);
                    }
                }
            });
		},

		// 模块销毁前触发
		unload : function(handler) {
            app.banner.remove(handler.uid);
		},
		// 暂停
		pause : function($el, attr, handler) {
            app.banner.remove(handler.uid);
		},
		// 恢复
		resume : function($el, attr, handler) {
            app.banner(handler.params.options);
		}

	};
});