define(["jquery"], function () {
    return {
        load: function ($el, scope, handler) {

            var listData;

            var $dataTable = $('#dataTable', $el).DataTable({
                "pagingType": 'full_numbers',
                "paging": false, // 禁止分页
                'searching': true,
                'bSort': false,
                'columns': [{
                    data: 'id',
                }, {
                    data: 'null', defaultContent: ''
                }, {
                    data: 'es_id', defaultContent: '-'
                }, {
                    data: 'ip', defaultContent: '-'
                }, {
                    data: 'username', defaultContent: '-'
                }, {
                    data: 'password', defaultContent: '-'
                }],
                'aoColumnDefs': [{
                    "render": function (data, type, row, meta) {
                        if (null != row.es_id && '' != row.es_id) {
                            return '<input type="checkbox" checked />';
                        } else {
                            return '<input type="checkbox" />';
                        }

                    },
                    "targets": 1
                }]
            });

            loadData();

            /**
             * 加载数据
             */
            function loadData() {
                let p1 = app.common.ajaxWithAfa({
                    url: 'InstallConfigAction_getFileData.do',
                    data: {fileName: "serverConfig"}
                });

                let p2 = app.common.ajaxWithAfa({
                    url: "InstallConfigAction_getFileData.do",
                    data: {fileName: "esConfig"}
                });

                Promise.all([p1, p2]).then(res => {
                    var serverObj = res[0].result;
                    var esObj = res[1].result;

                    if (null != serverObj) {
                        var list = serverObj.list;
                        if (esObj) {
                            $('#cluster_name').val(esObj.cluster_name);
                            $('#http_port').val(esObj.http_port);
                            $('#transport_tcp_port').val(esObj.transport_tcp_port);

                            let esList = esObj.list;
                            if (esList) {
                                $(list).each(function (i, server) {
                                    $(esList).each(function (j, es) {
                                        if (server.id == es.server_id) {
                                            list[i].es_id = es.id;
                                        }
                                    });
                                });
                            }
                        }

                        $dataTable.clear();
                        $dataTable.rows.add(list).draw();

                        listData = JSON.parse(JSON.stringify(list));
                    }

                });
            }

            /**
             * 保存数据
             */
            $('[data-role="saveBtn"]', $el).on('click', function () {
                var selectList = getSelectedDatas();
                var data = {};
                if (selectList.length > 0) {
                    var list = [];
                    $(selectList).each(function (index, row) {
                        var obj = {};
                        obj.id = row.es_id;
                        obj.server_id = row.id;
                        list.push(obj)
                    });
                    data.list = list;
                    data.cluster_name = $('#cluster_name').val();
                    data.http_port = $('#http_port').val();
                    data.transport_tcp_port = $('#transport_tcp_port').val();

                    if (data) {
                        app.common.ajaxWithAfa({
                            url: 'InstallConfigAction_saveFileData.do',
                            data: {
                                fileName: "esConfig",
                                fileContent: JSON.stringify(data)
                            }
                        }).done(function (d) {
                            let result = d.result;
                            if (result) {
                                app.alert('保存成功！');
                                loadData();
                            }
                        });
                    }
                }
            });


            /**
             * checkbox点击事件
             */
            $('#dataTable', $el).on('click', 'input[type="checkbox"]', function (event) {
                var data = $dataTable.row($(this).parents("tr")).data();
                var checked = $(this).is(':checked');
                var id = data.id;
                var es_id_temp = '';

                if (checked) {
                    // 生成ID 优先查询原list中es_id是否有值，如果有取回来，没有则生成
                    $(listData).each(function (index, row) {
                        if (id == row.id) {
                            es_id_temp = row.es_id;
                        }
                    });

                    if (!es_id_temp) {
                        es_id_temp = app.global.getUniqueId();
                    }
                }
                data.es_id = es_id_temp;
                $dataTable.row($(this).parents("tr")).data(data).draw();
            });

            //获取选中行数据
            function getSelectedDatas() {
                var datas = [];
                $dataTable.$('input:checked').each(function (i, item) {
                    datas.push($dataTable.rows($(item).parents('tr')).data()[0]);
                });
                return datas.length ? datas : null;
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