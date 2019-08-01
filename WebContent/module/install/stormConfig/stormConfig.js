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
                    data: 'storm_id', defaultContent: '-'
                }, {
                    data: 'ip', defaultContent: '-'
                }, {
                    data: 'username', defaultContent: '-'
                }, {
                    data: 'password', defaultContent: '-'
                }, {
                    data: 'exec_asda', defaultContent: '-'
                }],
                'aoColumnDefs': [{
                    "render": function (data, type, row, meta) {
                        if (null != row.storm_id && '' != row.storm_id) {
                            return '<input name="server" type="checkbox" checked />';
                        } else {
                            return '<input name="server" type="checkbox" />';
                        }

                    },
                    "targets": 1
                }, {
                    "render": function (data, type, row, meta) {
                        if (data) {
                            return '<input name="asda" type="checkbox" checked />';
                        } else {
                            return '<input name="asda" type="checkbox" />';
                        }

                    },
                    "targets": 6
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

                // storm
                let p2 = app.common.ajaxWithAfa({
                    url: "InstallConfigAction_getFileData.do",
                    data: {fileName: "stormConfig"}
                });

                // zk
                let p3 = app.common.ajaxWithAfa({
                    url: "InstallConfigAction_getFileData.do",
                    data: {fileName: "zookeeperConfig"}
                });

                Promise.all([p1, p2, p3]).then(res => {
                    // console.log(JSON.stringify(res));
                    var serverObj = res[0].result;
                    var stormObj = res[1].result;
                    var zkObj = res[2].result;

                    if (null != serverObj) {
                        var list = serverObj.list;
                        var zkList = zkObj.list;
                        if (stormObj) {
                            $('#storm_zookeeper_root').val(stormObj.storm_zookeeper_root);
                            $('#transactional_zookeeper_root').val(stormObj.transactional_zookeeper_root);
                            // $('#storm_local_dir').val(stormObj.storm_local_dir);
                            // $('#storm_log_dir').val(stormObj.storm_log_dir);

                            $('#storm_home').val(stormObj.storm_home);
                            $('#ui_port').val(stormObj.ui_port);
                            $('#logviewer_port').val(stormObj.logviewer_port);

                            $('#topology_name').val(stormObj.topology_name);
                            $('#redis_sentinel_ip_port').val(stormObj.redis_sentinel_ip_port);
                            $('#afa_urls').val(stormObj.afa_urls);

                            let stormList = stormObj.list;
                            if (stormList) {
                                $(list).each(function (i, server) {
                                    $(stormList).each(function (j, storm) {
                                        if (server.id == storm.server_id) {
                                            list[i].storm_id = storm.id;
                                            list[i].exec_asda = storm.exec_asda;
                                        }
                                    });
                                });
                            }
                        }

                        // storm 配置中关联的zk
                        let zkIds = stormObj.zkIds;
                        var html = '';
                        if (zkList) {
                            $(zkList).each(function (i, zk) {
                                var checked = false;
                                if (zkIds) {
                                    $(zkIds).each(function (j, id) {
                                        if (zk.id == id) {
                                            checked = true;
                                        }
                                    });
                                }
                                var append = '';

                                // 获取zk的服务器IP
                                if (checked) {
                                    append = '<input name="zk" type="checkbox" value="' + zk.id + '" checked/>';
                                } else {
                                    append = '<input name="zk" type="checkbox" value="' + zk.id + '" />';
                                }

                                let server = getObjById(list, zk.server_id);
                                append = append + '' + server.ip;

                                html = html + append;
                            });
                        }

                        // console.log(html);

                        $('#stormZkId').html(html);

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
                var selectList = getSelectedDatas('server');
                var asda_selectList = getSelectedDatas('asda');
                var data = {};
                if (selectList.length > 0) {
                    var list = [];
                    $(selectList).each(function (index, row) {
                        var obj = {};
                        obj.id = row.storm_id;
                        obj.server_id = row.id;

                        // 拓扑
                        if (asda_selectList) {
                            $(asda_selectList).each(function (i, o) {
                                if (row.storm_id == o.storm_id) {
                                    obj.exec_asda = true;
                                }
                            })
                        }

                        list.push(obj)
                    });
                    data.list = list;

                    var zkIds = [];
                    $('input[name="zk"]:checked', $el).each(function () {
                        zkIds.push($(this).val());
                    });

                    // console.log(zkIds);
                    data.zkIds = zkIds;
                    data.storm_zookeeper_root = $('#storm_zookeeper_root').val();
                    data.transactional_zookeeper_root = $('#transactional_zookeeper_root').val();

                    // data.storm_local_dir = $('#storm_local_dir').val();
                    // data.storm_log_dir = $('#storm_log_dir').val();
                    data.storm_home = $('#storm_home').val();
                    data.ui_port = $('#ui_port').val();
                    data.logviewer_port = $('#logviewer_port').val();
                    data.topology_name = $('#topology_name').val();
                    data.redis_sentinel_ip_port = $('#redis_sentinel_ip_port').val();
                    data.afa_urls = $('#afa_urls').val();

                    // console.log('storm: ' + JSON.stringify(data));

                    if (data) {
                        app.common.ajaxWithAfa({
                            url: 'InstallConfigAction_saveFileData.do',
                            data: {
                                fileName: "stormConfig",
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
             * 拓扑选择点击事件
             */
            $('#dataTable', $el).on('click', 'input[name="asda"]', function () {
                var row = $dataTable.rows($(this).parents('tr')).data()[0];
                // console.log(JSON.stringify(row));
                if (row.storm_id) {
                    $(this).parent().parent().siblings().children('td').children('input[name="asda"]').prop('checked', false)
                } else {
                    $(this).prop('checked', false);
                    app.alert('拓扑只能安装在选中的storm服务器中！');
                }

            });

            /**
             * server checkbox点击事件
             */
            $('#dataTable', $el).on('click', 'input[name="server"]', function () {
                var data = $dataTable.row($(this).parents("tr")).data();
                var checked = $(this).is(':checked');
                var id = data.id;
                var storm_id_temp = '';

                if (checked) {
                    // 生成ID 优先查询原list中storm_id是否有值，如果有取回来，没有则生成
                    $(listData).each(function (index, row) {
                        if (id == row.id) {
                            storm_id_temp = row.storm_id;
                        }
                    });

                    if (!storm_id_temp) {
                        storm_id_temp = app.global.getUniqueId();
                    }
                }
                data.storm_id = storm_id_temp;
                $dataTable.row($(this).parents("tr")).data(data).draw();
            });

            //获取选中行数据
            function getSelectedDatas(name) {
                var datas = [];
                $dataTable.$('input[name="' + name + '"]:checked').each(function (i, item) {
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