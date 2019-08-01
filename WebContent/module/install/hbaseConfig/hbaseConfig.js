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
                    data: 'hbase_id', defaultContent: '-'
                }, {
                    data: 'ip', defaultContent: '-'
                }, {
                    data: 'is_master', defaultContent: '-'
                }, {
                    data: 'hadoop_nn', defaultContent: '-'
                }, {
                    data: 'hadoop_jn', defaultContent: '-'
                }, {
                    data: 'hadoop_rm', defaultContent: '-'
                }, {
                    data: 'hadoop_dn', defaultContent: '-'
                }, {
                    data: 'hbase_ha', defaultContent: '-'
                }, {
                    data: 'hbase_rs', defaultContent: '-'
                }],
                'aoColumnDefs': [{
                    "render": function (data, type, row, meta) {
                        if (null != row.hbase_id && '' != row.hbase_id) {
                            return '<input name="server" type="checkbox" checked />';
                        } else {
                            return '<input name="server" type="checkbox" />';
                        }
                    },
                    "targets": 1
                }, {
                    "render": function (data, type, row, meta) {
                        if (data) {
                            return '<input name="is_master" type="checkbox" checked />';
                        } else {
                            return '<input name="is_master" type="checkbox" />';
                        }
                    },
                    "targets": 4
                }, {
                    "render": function (data, type, row, meta) {
                        if (data) {
                            return '<input name="hadoop_nn" type="checkbox" checked />';
                        } else {
                            return '<input name="hadoop_nn" type="checkbox" />';
                        }
                    },
                    "targets": 5
                }, {
                    "render": function (data, type, row, meta) {
                        if (data) {
                            return '<input name="hadoop_jn" type="checkbox" checked />';
                        } else {
                            return '<input name="hadoop_jn" type="checkbox" />';
                        }
                    },
                    "targets": 6
                }, {
                    "render": function (data, type, row, meta) {
                        if (data) {
                            return '<input name="hadoop_rm" type="checkbox" checked />';
                        } else {
                            return '<input name="hadoop_rm" type="checkbox" />';
                        }
                    },
                    "targets": 7
                }, {
                    "render": function (data, type, row, meta) {
                        if (data) {
                            return '<input name="hadoop_dn" type="checkbox" checked />';
                        } else {
                            return '<input name="hadoop_dn" type="checkbox" />';
                        }
                    },
                    "targets": 8
                }, {
                    "render": function (data, type, row, meta) {
                        if (data) {
                            return '<input name="hbase_ha" type="checkbox" checked />';
                        } else {
                            return '<input name="hbase_ha" type="checkbox" />';
                        }
                    },
                    "targets": 9
                }, {
                    "render": function (data, type, row, meta) {
                        if (data) {
                            return '<input name="hbase_rs" type="checkbox" checked />';
                        } else {
                            return '<input name="hbase_rs" type="checkbox" />';
                        }
                    },
                    "targets": 10
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

                // hbase
                let p2 = app.common.ajaxWithAfa({
                    url: "InstallConfigAction_getFileData.do",
                    data: {fileName: "hbaseConfig"}
                });

                // zk
                let p3 = app.common.ajaxWithAfa({
                    url: "InstallConfigAction_getFileData.do",
                    data: {fileName: "zookeeperConfig"}
                });

                Promise.all([p1, p2, p3]).then(res => {
                    // console.log(JSON.stringify(res));
                    var serverObj = res[0].result;
                    var hbaseObj = res[1].result;
                    var zkObj = res[2].result;

                    if (null != serverObj) {
                        var list = serverObj.list;
                        var zkList = zkObj.list;
                        if (hbaseObj) {
                            $('#hadoop_home').val(hbaseObj.hadoop_home);
                            $('#fs_defaultFS').val(hbaseObj.fs_defaultFS);
                            $('#namenode_rpc_port').val(hbaseObj.namenode_rpc_port);
                            $('#namenode_http_port').val(hbaseObj.namenode_http_port);
                            $('#journalnode_share_port').val(hbaseObj.journalnode_share_port);
                            $('#yarn_resourcemanager_cluster_id').val(hbaseObj.yarn_resourcemanager_cluster_id);
                            $('#yarn_resourcemanager_webapp_address').val(hbaseObj.yarn_resourcemanager_webapp_address);

                            let hbaseList = hbaseObj.list;
                            // console.log(JSON.stringify(hbaseList));
                            if (hbaseList.length > 0) {
                                $(list).each(function (i, server) {
                                    $(hbaseList).each(function (j, hbase) {
                                        if (server.id == hbase.server_id) {
                                            list[i].hbase_id = hbase.id;

                                            // console.log(hbase.is_master);
                                            list[i].is_master = hbase.is_master;
                                            list[i].hadoop_nn = hbase.hadoop_nn;
                                            list[i].hadoop_jn = hbase.hadoop_jn;
                                            list[i].hadoop_rm = hbase.hadoop_rm;
                                            list[i].hadoop_dn = hbase.hadoop_dn;
                                            list[i].hbase_ha = hbase.hbase_ha;
                                            list[i].hbase_rs = hbase.hbase_rs;
                                        }
                                    });
                                });
                            }
                        }

                        // hbase 配置中关联的zk
                        var html = '';
                        if (zkList) {
                            $(zkList).each(function (i, zk) {
                                var checked = false;

                                if (hbaseObj) {
                                    let zkIds = hbaseObj.zkIds;
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

                                let server = getObjById(list, zk.id);
                                append = append + '' + server.ip;

                                html = html + append;
                            });
                        }

                        // console.log(html);
                        $('#hbaseZkId').html(html);

                        // console.log(JSON.stringify(list));
                        // 加载table数据
                        $dataTable.clear();
                        $dataTable.rows.add(list).draw();

                        // 将数据临时保存
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
                // 选中的服务器
                var selectList = getSelectedDatas('server');
                // 是否主节点
                var is_master_selectList = getSelectedDatas('is_master');
                // hadoop_NameNode
                var hadoop_nn_selectList = getSelectedDatas('hadoop_nn');
                // hadoop_JournalNode
                var hadoop_jn_selectList = getSelectedDatas('hadoop_jn');
                // hadoop_ResourceManager
                var hadoop_rm_selectList = getSelectedDatas('hadoop_rm');
                // hadoop_DataNode
                var hadoop_dn_selectList = getSelectedDatas('hadoop_dn');
                // hbase_HA
                var hbase_ha_selectList = getSelectedDatas('hbase_ha');
                // hbase_RegionServers
                var hbase_rs_selectList = getSelectedDatas('hbase_rs');

                var data = {};
                if (selectList.length > 0) {
                    var list = [];
                    $(selectList).each(function (index, row) {
                        var obj = {};
                        obj.id = row.hbase_id;
                        obj.server_id = row.id;

                        obj.is_master = false;
                        obj.hadoop_nn = false;
                        obj.hadoop_jn = false;
                        obj.hadoop_rm = false;
                        obj.hadoop_dn = false;
                        obj.hbase_ha = false;
                        obj.hbase_rs = false;

                        // is_master
                        if (is_master_selectList) {
                            $(is_master_selectList).each(function (i, o) {
                                if (row.hbase_id == o.hbase_id) {
                                    obj.is_master = true;
                                }
                            })
                        }

                        // hadoop_nn
                        if (hadoop_nn_selectList) {
                            $(hadoop_nn_selectList).each(function (i, o) {
                                if (row.hbase_id == o.hbase_id) {
                                    obj.hadoop_nn = true;
                                }
                            })
                        }

                        // hadoop_jn
                        if (hadoop_jn_selectList) {
                            $(hadoop_jn_selectList).each(function (i, o) {
                                if (row.hbase_id == o.hbase_id) {
                                    obj.hadoop_jn = true;
                                }
                            })
                        }

                        // hadoop_rm
                        if (hadoop_rm_selectList) {
                            $(hadoop_rm_selectList).each(function (i, o) {
                                if (row.hbase_id == o.hbase_id) {
                                    obj.hadoop_rm = true;
                                }
                            })
                        }

                        // hadoop_dn
                        if (hadoop_dn_selectList) {
                            $(hadoop_dn_selectList).each(function (i, o) {
                                if (row.hbase_id == o.hbase_id) {
                                    obj.hadoop_dn = true;
                                }
                            })
                        }

                        // hbase_ha
                        if (hbase_ha_selectList) {
                            $(hbase_ha_selectList).each(function (i, o) {
                                if (row.hbase_id == o.hbase_id) {
                                    obj.hbase_ha = true;
                                }
                            })
                        }

                        // hbase_rs
                        if (hbase_rs_selectList) {
                            $(hbase_rs_selectList).each(function (i, o) {
                                if (row.hbase_id == o.hbase_id) {
                                    obj.hbase_rs = true;
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

                    data.hadoop_home = $('#hadoop_home').val();
                    data.fs_defaultFS = $('#fs_defaultFS').val();
                    data.namenode_rpc_port = $('#namenode_rpc_port').val();
                    data.namenode_http_port = $('#namenode_http_port').val();
                    data.journalnode_share_port = $('#journalnode_share_port').val();
                    data.yarn_resourcemanager_cluster_id = $('#yarn_resourcemanager_cluster_id').val();
                    data.yarn_resourcemanager_webapp_address = $('#yarn_resourcemanager_webapp_address').val();

                    console.log('hbase: ' + JSON.stringify(data));
                    // if (data) {
                    //     app.common.ajaxWithAfa({
                    //         url: 'InstallConfigAction_saveFileData.do',
                    //         data: {
                    //             fileName: "hbaseConfig",
                    //             fileContent: JSON.stringify(data)
                    //         }
                    //     }).done(function (d) {
                    //         let result = d.result;
                    //         if (result) {
                    //             loadData();
                    //         }
                    //     });
                    // }
                }
            });


            /**
             * 主节点选择点击事件
             */
            $('#dataTable', $el).on('click', 'input[name="is_master"]', function () {
                var row = $dataTable.rows($(this).parents('tr')).data()[0];
                // console.log(JSON.stringify(row));
                if (row.hbase_id) {
                    $(this).parent().parent().siblings().children('td').children('input[name="is_master"]').prop('checked', false)
                } else {
                    $(this).prop('checked', false);
                    app.alert('只能选择安装的服务器中！');
                }
            });

            /**
             * hadoop_NameNode 选择点击事件
             */
            $('#dataTable', $el).on('click', 'input[name="hadoop_nn"]', function () {
                var row = $dataTable.rows($(this).parents('tr')).data()[0];
                // console.log(JSON.stringify(row));
                if (!row.hbase_id) {
                    $(this).prop('checked', false);
                    app.alert('只能选择安装的服务器中！');
                }
            });

            /**
             * hadoop_JournalNode 选择点击事件
             */
            $('#dataTable', $el).on('click', 'input[name="hadoop_jn"]', function () {
                var row = $dataTable.rows($(this).parents('tr')).data()[0];
                // console.log(JSON.stringify(row));
                if (!row.hbase_id) {
                    $(this).prop('checked', false);
                    app.alert('只能选择安装的服务器中！');
                }
            });

            /**
             * hadoop_ResourceManager 选择点击事件
             */
            $('#dataTable', $el).on('click', 'input[name="hadoop_rm"]', function () {
                var row = $dataTable.rows($(this).parents('tr')).data()[0];
                // console.log(JSON.stringify(row));
                if (!row.hbase_id) {
                    $(this).prop('checked', false);
                    app.alert('只能选择安装的服务器中！');
                }
            });

            /**
             * hadoop_DataNode 选择点击事件
             */
            $('#dataTable', $el).on('click', 'input[name="hadoop_dn"]', function () {
                var row = $dataTable.rows($(this).parents('tr')).data()[0];
                // console.log(JSON.stringify(row));
                if (!row.hbase_id) {
                    $(this).prop('checked', false);
                    app.alert('只能选择安装的服务器中！');
                }
            });

            /**
             * hbase_HA 选择点击事件
             */
            $('#dataTable', $el).on('click', 'input[name="hbase_ha"]', function () {
                var row = $dataTable.rows($(this).parents('tr')).data()[0];
                // console.log(JSON.stringify(row));
                if (!row.hbase_id) {
                    $(this).prop('checked', false);
                    app.alert('只能选择安装的服务器中！');
                }
            });

            /**
             * hbase_RegionServers 选择点击事件
             */
            $('#dataTable', $el).on('click', 'input[name="hbase_rs"]', function () {
                var row = $dataTable.rows($(this).parents('tr')).data()[0];
                // console.log(JSON.stringify(row));
                if (!row.hbase_id) {
                    $(this).prop('checked', false);
                    app.alert('只能选择安装的服务器中！');
                }
            });

            /**
             * server checkbox点击事件
             */
            $('#dataTable', $el).on('click', 'input[name="server"]', function (event) {
                var data = $dataTable.row($(this).parents("tr")).data();
                var checked = $(this).is(':checked');
                var id = data.id;
                var hbase_id_temp = '';

                if (checked) {
                    // 生成ID 优先查询原list中hbase_id是否有值，如果有取回来，没有则生成
                    $(listData).each(function (index, row) {
                        if (id == row.id) {
                            hbase_id_temp = row.hbase_id;
                        }
                    });

                    if (!hbase_id_temp) {
                        hbase_id_temp = app.global.getUniqueId();
                    }
                }
                data.hbase_id = hbase_id_temp;
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