/**
 * Created by lijianceng@cfischina.com on 2015/8/5 0005.
 */
define([ "jquery" ], function() {
    return {
        // 模块加载结束后，会触发该方法
        load : function($el, scope, handler) {
            /*局部常量*/
            var fileUpload;
            /*全局变量*/
            handler.params={
                options:{
                    items:[{
                        name:'概述',
                        subItems:[{
                            icon:'fa fa-circle-o-notch',
                            href:'cycle',
                            name:'循环闭包化'
                        },{
                            icon:'fa fa-gears',
                            href:'component',
                            name:'组件基本操作'
                        }]
                    },{
                        name:'全局',
                        subItems:[{
                            icon:'fa fa-soccer-ball-o',
                            href:'global',
                            name:'全局参数Global'
                        },{
                            icon:'fa fa-file-text',
                            href:'handler',
                            name:'页面参数Handler'
                        },{
                            icon:'fa fa-share-alt',
                            href:'domain',
                            name:'跨页传参Domain'
                        },{
                            icon:'fa fa-expand',
                            name:'窗口事件',
                            subItems:[{
                                href:'screen',
                                name:'全屏',
                                icon:'fa fa-arrows-alt'
                            },{
                                href:'screenResize',
                                name:'窗口大小监听',
                                icon:'fa fa-bullhorn'
                            }]
                        },{
                            icon:'fa fa-barcode',
                            href:'shelter',
                            name:'遮罩'
                        },{
                            icon:'fa fa-level-up',
                            href:'scrollTop',
                            name:'滚动到顶部'
                        }]
                    },{
                        name:'菜单',
                        subItems:[{
                            icon:'fa fa-table',
                            href:'dispatcher',
                            name:'标签页Dispatcher'
                        },{
                            icon:'fa fa-list-ul',
                            href:'banner',
                            name:'顶部导航栏'
                        },{
                            icon:'fa fa-folder',
                            href:'tabs',
                            name:'标签栏'
                        }]
                    },{
                        name:'提示',
                        subItems:[{
                            icon:'fa fa-bullseye',
                            href:'confirm',
                            name:'确认框'
                        },{
                            icon:'fa fa-bell',
                            href:'alert',
                            name:'提示栏'
                        }]
                    },{
                        name:'表单',
                        subItems:[{
                            icon:'fa fa-table',
                            href:'validate',
                            name:'表单校验'
                        },{
                            icon:'fa fa-list-alt',
                            href:'formControl',
                            name:'表单控制'
                        },{
                            icon:'fa fa-cloud-upload',
                            href:'bootstrapUpload',
                            name:'文件上传'
                        },{
                            icon:'fa fa-clock-o',
                            href:'bootstrapDatetimePicker',
                            name:'时间选择器'
                        },{
                            icon:'fa fa-check-square-o',
                            href:'selectComponent',
                            name:'多选/选择组件'
                        },{
                            icon:'fa fa-edit',
                            href:'editableSelect',
                            name:'可编辑下拉框'
                        }]
                    },{
                        name:'表格',
                        subItems:[{
                            icon:'fa fa-table',
                            href:'dataTable',
                            name:'dataTable'
                        },{
                            icon:'fa fa-hand-o-up',
                            href:'tdClick',
                            name:'可点击表格'
                        }]
                    },{
                        name:'图形',
                        subItems:[{
                            icon:'fa fa-pie-chart',
                            href:'echart',
                            name:'Echart'
                        },{
                            icon:'fa fa-sitemap',
                            href:'jOrgChart',
                            name:'拓扑图'
                        }]
                    },{
                        name:'数据',
                        subItems:[{
                            icon:'fa fa-database',
                            href:'taffy',
                            name:'JS数据库Taffy'
                        }]
                    }],
                    callback:function($ctn,$el){
                        $('[data-href]',this).click(function(){
                            var href=$(this).attr('data-href');

                            if(href) {
                                app.scrollTop($ctn, $el.find('[data-href="' + href + '"]:first'), 500);
                            }
                        });
                    },
                    args:[$el.parent(),$el],
                    uid:handler.uid
                }
            };

            //加载数据
            $('[data-role="bootstrapUploadCtt"]',$el).text($('[data-role="bootstrapUploadTemp"]',$el).html());
            $('[data-role="formControlCtt"]',$el).text($('[data-role="formControlTemp"]',$el).html());
            $('[data-role="jOrgChartListSample"]',$el).text($('[data-role="jOrgChartListTemp"]',$el).html());
            $('[data-role="bootstrapDatetimePickerHTMLCtt"]',$el).text($('[data-role="bootstrapDatetimePickerHTML"]',$el).html());

            $('#datetimePickerExample',$el).datetimepicker({
                format: 'yyyy-mm-dd hh:ii:ssZ'
            });

            //绑定监听
            this.delegateEvents({
                'click [data-role^=alert]':function(){
                    switch($(this).attr('data-role')){
                        case 'alertDefault':
                            app.alert('hello world!');
                            break;
                        case 'alertTitle':
                            app.alert('title','hello world!');
                            break;
                        case 'alertShowType':
                            app.alert('title','hello world!',app.alertShowType.SUCCESS);
                            break;
                        case 'alertMsgType':
                            app.alert('title','hello world!',app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
                            break;
                        case 'alertMsgTypeOnly':
                            app.alert('title','hello world!',app.alertMsgType.MESSAGE);
                            break;
                    }
                },
                'click [data-role^=screen]':function(){
                    var screen=app.screen,
                        fullScreen=screen.fullScreen,
                        show=screen.show;
                    switch ($(this).attr('data-role')){
                        case 'screenToggle':
                            screen(fullScreen.LEFT);
                            break;
                        case 'screenHide':
                            screen(fullScreen.FULL,show.HIDE);
                            break;
                        case 'screenShow':
                            screen(fullScreen.CONTAINER,show.SHOW);
                            break;
                        case 'screenContext':
                            screen(fullScreen.MAIN,show.TOGGLE,$el);
                            break;
                    }
                },
                'click [data-role=confirm]':function(){
                    app.confirm({
                        title:'确认',
                        content:'是否确认执行改操作？',
                        btnConfirm:'是',
                        btnCancel:'否',
                        confirmHandler:function(h){app.alert(h)},
                        cancelHandler:function(h,g){app.alert(g)},
                        context:$('body')[0],
                        args:['是','否']
                    });
                },
                'click [data-role^=shelter]':function(){
                    app.shelter.show('显示遮罩显示的内容');
//                    handler.setTimeout(function(){
//                        app.shelter.show('演示遮罩60秒后将调用app.shelter.hide()隐藏遮罩');
//                    }, 2000);

                    handler.setTimeout(function(){
                        app.shelter.hideAll();
                    }, 60000);
                },
                'click [data-role^=formControl]':function(){
                    switch($(this).attr('data-role')) {
                        case 'formControlShow':
                            app.formControl.set('表单标题', $('[data-role="formControlTemp"]', $el).html(), function (context, $form) {
                                //提交按钮事件绑定
                                $('#formControlSmtBtn',$form).click(function(){
                                    //提交信息的校验
                                    var validateResult = app.validate.validate({
                                        $context: $form,
                                        data: [{
                                            id: 'formControlInput',
                                            msg: '请在这里数据数据',//如果此处不填的话，将使用默认的错误提示信息
                                            filter: {
                                                require: true
                                            }
                                        }, {
                                            id: 'formControlTextarea',
                                            filter: {
                                                require: true
                                            }
                                        }],
                                        /*
                                         * 输入错误的返回
                                         * $el   输入框的jQuery对象
                                         * errMsg    错误信息
                                         * */
                                        errorCallback: function ($el, errMsg) {
                                            $el.closest('.control-group').addClass('error');
                                            $el.next().removeClass('hide').text(errMsg);
                                        },
                                        /*
                                         * 输入正确的返回
                                         * $el   输入框的jQuery对象
                                         * correctMsg    正确信息
                                         * */
                                        correctCallback: function ($el, correctMsg) {
                                            $el.closest('.control-group').removeClass('error');
                                            $el.next().addClass('hide');
                                        }
                                    });
                                });

                                //context.hide(); 隐藏
                            }).show();
                            break;
                    }
                },
                'click [data-role^=bootstrapUpload]':function(){
                    switch($(this).attr('data-role')){
                        case 'bootstrapUploadAdd':
                            !fileUpload&&(fileUpload=app.formControl.bootstrapUpload({
                                el:$('#uploadFileID',$el),
                                tips:'只能选择txt文件',
                                canEditName:true
                            }));
                            break;
                        case 'bootstrapUploadName':
                            app.alert(fileUpload&&fileUpload.getName&&fileUpload.getName()||'文件上传控件为空');
                            break;
                        case 'bootstrapUploadExtensionName':
                            app.alert(fileUpload&&fileUpload.getExtensionName&&fileUpload.getExtensionName()||'文件上传控件为空');
                            break;
                        case 'bootstrapUploadRemove':
                            fileUpload&&fileUpload.destroy&&fileUpload.destroy();
                            fileUpload=null;
                            break;
                    }
                }
            });

            //绑定banner的事件
            app.banner(handler.params.options);
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