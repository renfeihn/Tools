define(["jquery"], function () {
    return {
        load: function ($el, scope, handler) {

			// 文件传输工具
            $('#sqlfileId', $el).on('click', function () {
                app.dispatcher.load({
                    "title": "文件传输工具",
                    "moduleId": 'toolset',
                    "section": 'fileService',  // module下的子模块，多层访问，使用数组[1，2，3] 代表第一层，第二层，第三层
                    "id": 'fileService' + new Date().getTime(),
                    "params": {
                        mode: 'create'
                    }
                });
            });


            // 打开JDBC查询工具
            $('#sqlQueryId', $el).on('click', function () {
                app.dispatcher.load({
                    "title": "数据库安全查询工具",
                    "moduleId": 'dataQueryTool',
                    "section": '',  // module下的子模块，多层访问，使用数组[1，2，3] 代表第一层，第二层，第三层
                    "id": 'dataQueryTool' + new Date().getTime(),
                    "params": {
                        mode: 'create'
                    }
                });
            });

            // 打开SQL工具
            $('#sqlToolId', $el).on('click', function () {
                app.dispatcher.load({
                    "title": "SQL圈",
                    "moduleId": 'SQLTool',
                    "section": '',  // module下的子模块，多层访问，使用数组[1，2，3] 代表第一层，第二层，第三层
                    "id": 'SQLTool' + new Date().getTime(),
                    "params": {
                        mode: 'create'
                    }
                });
            });

            // 打开文件编辑工具
            $('#fileEditId', $el).on('click', function () {
                app.dispatcher.load({
                    "title": "配置文件编辑",
                    "moduleId": 'toolset',
                    "section": 'configManage',  // module下的子模块，多层访问，使用数组[1，2，3] 代表第一层，第二层，第三层
                    "id": 'configManage' + new Date().getTime(),
                    "params": {
                        mode: 'create'
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
