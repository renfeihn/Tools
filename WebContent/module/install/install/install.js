define(["jquery"], function () {
    return {
        load: function ($el, scope, handler) {

            clearLog();
            // 清空文件内容
            function clearLog() {
                app.common.ajaxWithAfa({
                    url: 'InstallConfigAction_clearLog.do',
                }).done(function (d) {
                });
            }

            /**
             * 读取生成日志内容
             */
            handler.setInterval(function () {
                app.common.ajaxWithAfa({
                    url: 'InstallConfigAction_getInstallLog.do',
                }).done(function (d) {
                    let result = d.result;
                    $('#logId', $el).html(result);
                });
            }, 2 * 1000);

            /**
             * 调起后台生成安装文件方法
             */
            $('[data-role="saveBtn"]', $el).on('click', function () {
                $('#logId', $el).html('');
                var fileName = '';
                $('input[type="checkbox"]:checked', $el).each(function () {
                    fileName = fileName + '_' + $(this).val();
                });

                var outFilePath = $('#outFilePath', $el).val();
                app.common.ajaxWithAfa({
                    url: 'InstallConfigAction_install.do',
                    data: {
                        fileName: fileName,
                        outFilePath: outFilePath
                    }
                }).done(function (d) {
                    let result = d.result;
                    if (result) {
                        app.alert('开始生成安装文件！');
                    }
                });
            });

            /**
             * 全选
             */
            $('[data-role="checkBtn"]', $el).on('click', function () {
                $('input[type="checkbox"]', $el).attr('checked', true);
            });


        },
        unload: function (handler) {

        },
        pause: function ($el, scope, handler) {

        },
        resume: function ($el, scope, handler) {
        }
    }
});