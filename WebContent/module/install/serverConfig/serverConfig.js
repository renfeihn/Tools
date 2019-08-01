define(["jquery"], function () {

    return {
        load: function ($el, scope, handler) {
            var $serverModal = $('#serverModal', $el);
            var activeTrData;
            //agent采集Table
            var $searchTable = $('#searchTable', $el).DataTable({
                "pagingType": 'full_numbers',
                'searching': true,
                'bSort': false,
                'columns': [{
                    data: 'index',
                }, {
                    data: 'id', defaultContent: '-'
                }, {
                    data: 'ip', defaultContent: '-'
                }, {
                    data: 'username', defaultContent: '-'
                }, {
                    data: 'password', defaultContent: '-'
                }],
                'aoColumnDefs': [{
                    "render": function (data, type, row, meta) {
                        return '<span class="link-edit fa fa-edit" title="修改"></span> | <span class="link-delete fa fa-edit" title="删除"></span>';
                    },
                    "targets": 5
                }]
            });

            loadSearchTableData();
            /**
             * 加载table数据
             * @return {undefined}
             */
            function loadSearchTableData() {
                app.common.ajaxWithAfa({
                    url: 'InstallConfigAction_getFileData.do',
                    data: {fileName: "serverConfig"}
                }).done(function (data) {
                    $searchTable.clear();

                    var result = data.result.list;
                    // console.log(data);
                    if (result && result.length > 0) {
                        result.forEach(function (item, index) {
                            item.index = index + 1;
                        })
                    }
                    $searchTable.rows.add(result).draw();
                })
            }

            //编辑
            $('#searchTable', $el).on('click', 'tbody span.link-edit', function (event) {
                var tr = $searchTable.row($(this).parents('tr')).data();
                $serverModal.modal('show');
                activeTrData = tr;
                initserverModal(tr);
            });

            // 删除
            $('#searchTable', $el).on('click', 'tbody span.link-delete', function (event) {
                var tr = $searchTable.row($(this).parents('tr')).data();
                var id = tr.id;

                app.common.ajaxWithAfa({
                    url: 'InstallConfigAction_deleteServerConfigById.do',
                    data: {
                        id: id
                    }
                }).done(function (data) {
                    if (data.result) {
                        app.alert('成功！');
                        loadSearchTableData();
                    } else {
                        app.alert('失败！');
                    }
                })
            });

            // 新增
            $('#addDatabaseBtn', $el).on('click', function () {
                // var tr = $searchTable.row($(this).parents('tr')).data();
                $serverModal.modal('show');
                initserverModal();
            });

            // 预警模态框事件
            $serverModal.on('click', '.confirmBtn', function (event) {
                var id = $serverModal.attr('data-id');
                console.log('id: ' + id);
                if (!id) {
                    id = app.global.getUniqueId();
                }
                if ($('#ip', $serverModal).val().trim() === "") {
                    app.alert('请填写IP！');
                    return;
                }

                var server = {
                    id: id,
                    ip: $('#ip', $serverModal).val(),
                    username: $('#username', $serverModal).val(),
                    password: $('#password', $serverModal).val()
                };

                app.common.ajaxWithAfa({
                    url: 'InstallConfigAction_margeServerConfig.do',
                    data: {
                        fileContent: JSON.stringify(server)
                    }
                }).done(function (data) {
                    if (data.result) {
                        app.alert('成功！');
                        loadSearchTableData();
                    } else {
                        app.alert('失败！');
                    }
                    $serverModal.modal('hide');
                })
            });

            // 初始化模态框
            function initserverModal(tr) {
                $serverModal.find('form')[0].reset();
                if (tr) {
                    $serverModal.attr('data-id', tr.id);

                    for (var item in tr) {
                        if (tr.hasOwnProperty(item)) {
                            $('#' + item, $serverModal).val(tr[item]);
                        }
                    }
                }
            }
        },

        unload: function (handler) {

        },

        pause: function ($el, scope, handler) {

        },

        resume: function ($el, scope, handler) {

        }

    }
});
