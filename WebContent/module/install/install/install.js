define(["jquery"], function () {
    return {
        load: function ($el, scope, handler) {

			// 文件传输工具
            $('#installId', $el).on('click', function () {
                app.common.ajaxWithAfa({
                    url: 'InstallConfigAction_install.do'
                }).done(function (d) {
                    let result = d.result;
                    if (result) {
                        app.alert('文件生成完成！');
                    }
                });
            });


        },
        unload: function (handler) {

        },
        pause: function ($el, attr, handler) {

        },
        resume: function ($el, attr, handler) {

        }
    };
});
