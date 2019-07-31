define(["jquery"], function () {
    return {
        load: function ($el, scope, handler) {


            var listData;

            var $dataTable = $('#dataTable', $el).DataTable({
                "pagingType": 'full_numbers',
                'searching': true,
                'bSort': false,
                'columns': [{
                    data: 'id',
                }, {
                    data: 'null', defaultContent: ''
                }, {
                    data: 'zookeeper_id', defaultContent: '-'
                }, {
                    data: 'ip', defaultContent: '-'
                }, {
                    data: 'username', defaultContent: '-'
                }, {
                    data: 'password', defaultContent: '-'
                }],
                'aoColumnDefs': [{
                    "render": function (data, type, row, meta) {
                        if (null != row.zookeeper_id && '' != row.zookeeper_id) {
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
                    data: {fileName: "zookeeperConfig"}
                });

                Promise.all([p1, p2]).then(res => {
                    var serverObj = res[0].result;
                    var zookeeperObj = res[1].result;

                    if (null != serverObj) {
                        var list = serverObj.list;
                        if (zookeeperObj) {
                            $('#dataDir').val(zookeeperObj.dataDir);
                            $('#dataLogDir').val(zookeeperObj.dataLogDir);
                            $('#clientPort').val(zookeeperObj.clientPort);

                            let zookeeperList = zookeeperObj.list;
                            if (zookeeperList.length > 0) {
                                $(list).each(function (i, server) {
                                    $(zookeeperList).each(function (j, zookeeper) {
                                        if (server.id == zookeeper.server_id) {
                                            list[i].zookeeper_id = zookeeper.id;
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
                console.log(JSON.stringify(selectList));
                var data = {};
                if (selectList.length > 0) {
                    var list = [];
                    $(selectList).each(function (index, row) {
                        var obj = {};
                        obj.id = row.zookeeper_id;
                        obj.server_id = row.id;
                        list.push(obj)
                    });
                    data.list = list;
                    data.dataDir = $('#dataDir').val();
                    data.dataLogDir = $('#dataLogDir').val();
                    data.clientPort = $('#clientPort').val();

                    if (data) {
                        app.common.ajaxWithAfa({
                            url: 'InstallConfigAction_saveFileData.do',
                            data: {
                                fileName: "zookeeperConfig",
                                fileContent: JSON.stringify(data)
                            }
                        }).done(function (d) {
                            let result = d.result;
                            if (result) {
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
                var zookeeper_id_temp = '';
                if (checked) {
                    // 生成ID 优先查询原list中zookeeper_id是否有值，如果有取回来，没有则生成
                    $(listData).each(function (index, row) {
                        if (id == row.id) {
                            zookeeper_id_temp = row.zookeeper_id;
                        }
                    });

                    if (!zookeeper_id_temp) {
                        zookeeper_id_temp = app.global.getUniqueId();
                    }
                }
                data.zookeeper_id = zookeeper_id_temp;
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