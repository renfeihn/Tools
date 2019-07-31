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
                    data: 'java_id', defaultContent: '-'
                }, {
                    data: 'ip', defaultContent: '-'
                }, {
                    data: 'username', defaultContent: '-'
                }, {
                    data: 'password', defaultContent: '-'
                }],
                'aoColumnDefs': [{
                    "render": function (data, type, row, meta) {
                        if (null != row.java_id && '' != row.java_id) {
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
                    data: {fileName: "javaConfig"}
                });

                Promise.all([p1, p2]).then(res => {
                    var serverObj = res[0].result;
                    var javaObj = res[1].result;

                    if (null != serverObj) {
                        var list = serverObj.list;
                        if (javaObj) {
                            $('#java_path').val(javaObj.java_path);

                            let javaList = javaObj.list;
                            if (javaList.length > 0) {
                                $(list).each(function (i, server) {
                                    $(javaList).each(function (j, java) {
                                        if (server.id == java.server_id) {
                                            list[i].java_id = java.id;
                                        }
                                    });
                                });
                            }
                        }

                        $dataTable.clear();
                        $dataTable.rows.add(list).draw();

                        // 发现值id值不为空，则选中
                        listData = list;
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
                        obj.id = row.java_id;
                        obj.server_id = row.id;
                        list.push(obj)
                    });
                    data.list = list;
                    data.java_path = $('#java_path').val();

                    if (data) {
                        app.common.ajaxWithAfa({
                            url: 'InstallConfigAction_saveFileData.do',
                            data: {
                                fileName: "javaConfig",
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
                var java_id_temp = '';
                if (checked) {
                    // 生成ID 优先查询原list中java_id是否有值，如果有取回来，没有则生成
                    $(listData).each(function (index, row) {
                        if (id == row.id) {
                            java_id_temp = row.java_id;
                        }
                    });

                    if (!java_id_temp) {
                        java_id_temp = app.global.getUniqueId();
                    }
                }
                data.java_id = java_id_temp;
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