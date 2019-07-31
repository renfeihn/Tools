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
                    data: 'kafka_id', defaultContent: '-'
                }, {
                    data: 'ip', defaultContent: '-'
                }, {
                    data: 'username', defaultContent: '-'
                }, {
                    data: 'password', defaultContent: '-'
                }],
                'aoColumnDefs': [{
                    "render": function (data, type, row, meta) {
                        if (null != row.kafka_id && '' != row.kafka_id) {
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
                // 服务器
                let p1 = app.common.ajaxWithAfa({
                    url: 'InstallConfigAction_getFileData.do',
                    data: {fileName: "serverConfig"}
                });

                // kafka
                let p2 = app.common.ajaxWithAfa({
                    url: "InstallConfigAction_getFileData.do",
                    data: {fileName: "kafkaConfig"}
                });

                // zk
                let p3 = app.common.ajaxWithAfa({
                    url: "InstallConfigAction_getFileData.do",
                    data: {fileName: "zookeeperConfig"}
                });

                Promise.all([p1, p2, p3]).then(res => {
                    // console.log(JSON.stringify(res));
                    var serverObj = res[0].result;
                    var kafkaObj = res[1].result;
                    var zkObj = res[2].result;

                    if (null != serverObj) {
                        var list = serverObj.list;
                        var zkList = zkObj.list;
                        if (kafkaObj) {
                            $('#home_path').val(kafkaObj.home_path);
                            $('#listeners_prot').val(kafkaObj.listeners_prot);
                            $('#kafka_home').val(kafkaObj.kafka_home);

                            let kafkaList = kafkaObj.list;
                            if (kafkaList.length > 0) {
                                $(list).each(function (i, server) {
                                    $(kafkaList).each(function (j, kafka) {
                                        if (server.id == kafka.server_id) {
                                            list[i].kafka_id = kafka.id;
                                        }
                                    });
                                });
                            }

                            // kafka 配置中关联的zk
                            let zkIds = kafkaObj.zkIds;
                            var html = '';
                            if (zkList) {
                                $(zkList).each(function (i, zk) {
                                    var checked = false;
                                    $(zkIds).each(function (j, id) {
                                        if (zk.id == id) {
                                            checked = true;
                                        }
                                    });
                                    var append = '';

                                    // 获取zk的服务器IP
                                    if (checked) {
                                        append = '<input name="zk" type="checkbox" value="' + zk.id + '" checked/>';
                                    } else {
                                        append = '<input name="zk" type="checkbox" value="' + zk.id + '" />';
                                    }

                                    let server = getObjById(list, zk.id);
                                    append = append + '' + server.ip;

                                    html = html + append;
                                });
                            }

                            $('#zkSpanId').html(html);
                        }

                        $dataTable.clear();
                        $dataTable.rows.add(list).draw();

                        listData = JSON.parse(JSON.stringify(list));
                    }

                });
            }

            function getObjById(list, id) {
                var object;
                $(list).each(function (index, obj) {
                    if (obj.id == id) {
                        object = obj;
                    }
                });
                return object;
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
                        obj.id = row.kafka_id;
                        obj.server_id = row.id;
                        list.push(obj)
                    });
                    data.list = list;

                    var zkIds = [];
                    $('input[name="zk"]:checked').each(function(){
                        zkIds.push($(this).val());
                    });

                    console.log(zkIds);

                    data.zkIds = zkIds;
                    data.listeners_prot = $('#listeners_prot').val();
                    data.kafka_home = $('#kafka_home').val();

                    if (data) {
                        app.common.ajaxWithAfa({
                            url: 'InstallConfigAction_saveFileData.do',
                            data: {
                                fileName: "kafkaConfig",
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
                var kafka_id_temp = '';

                if (checked) {
                    // 生成ID 优先查询原list中kafka_id是否有值，如果有取回来，没有则生成
                    $(listData).each(function (index, row) {
                        if (id == row.id) {
                            kafka_id_temp = row.kafka_id;
                        }
                    });

                    if (!kafka_id_temp) {
                        kafka_id_temp = app.global.getUniqueId();
                    }
                }
                data.kafka_id = kafka_id_temp;
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