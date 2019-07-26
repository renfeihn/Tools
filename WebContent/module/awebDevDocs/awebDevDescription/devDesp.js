define([ "jquery" ], function() {
	return {
		// 模块加载结束后，会触发该方法
		load : function($el, scope, handler) {
            /*全局变量、变量定义*/
            handler.params={
                options:{
                    items:[{
                        name:'开发配置',
                        subItems:[{
                            icon:'fa fa-list',
                            href:'menu',
                            name:'菜单项配置'
                        },{
                            icon:'fa fa-cogs',
                            href:'module',
                            name:'模块配置'
                        },{
                            icon:'fa fa-html5',
                            name:'页面HTML配置',
                            subItems:[{
                                name:'页面HTML配置',
                                href:'pageHtml'
                            },{
                                name:'Web页面结构',
                                href:'structWeb'
                            }]
                        },{
                            icon:'fa fa-file-code-o',
                            name:'页面JS配置',
                            subItems:[{
                                name:'页面JS配置',
                                href:'pageJs'
                            },{
                                name:'JS页面结构',
                                href:'structJS'
                            }]
                        },{
                            icon:'fa fa-file-excel-o',
                            href:'structAndSpring',
                            name:'Struct配置'
                        },{
                            icon:'fa fa-adn',
                            href:'javaClass',
                            name:'Java Action'
                        }]
                    },{
                        name:'高级配置',
                        subItems:[{
                            icon:'fa fa-list',
                            href:'jsAysn',
                            name:'引入JS包'
                        }]
                    },{
                        href:'page',
                        name:'前端编码规范',
                        subItems:[{
                            href:'name',
                            name:'开发模块的命名规范'
                        },{
                            href:'jspPage',
                            name:'HTML编写规范'
                        },{
                            href:'css',
                            name:'CSS编写规范'
                        },{
                            href:'js',
                            name:'JS编写规范'
                        }]
                    }],
                    callback:function($ctn,$el){
                        $('[data-href]',this).click(function(){
                            var href=$(this).attr('data-href');

                            href&&app.scrollTop($ctn, $el.find('[data-href="'+href+'"]:first'), 500);
                        });
                    },
                    args:[$el.parent(),$el],
                    uid:handler.uid
                }
            };


            /*函数定义*/

            /*数据加载*/
            app.banner(handler.params.options);

            var requireMethods;
            require(['module/awebDevDocs/awebDevDescription/test.js'], function (test) {
                requireMethods = test;
            });

            //加载模块样例
            $('[data-role="menuModuleHtml"]',$el).text($('[data-role="menuModuleTemp"]',$el).html());
            $('[data-role="structXml"]',$el).text($('[data-role="structTemp"]',$el).html());
            $('[data-role="springXml"]',$el).text($('[data-role="springTemp"]',$el).html());

            /*监听绑定*/
            this.delegateEvents({
                'click [data-role="jsAysnTestBtn"]':function(){
                    var $this=$(this);
                    if(requireMethods&&requireMethods.mth1){
                        requireMethods.mth1($this.prev().val());
                    }else{
                        app.alert('错误提示','test.js没有加载',app.alertShowType.WARNING);
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