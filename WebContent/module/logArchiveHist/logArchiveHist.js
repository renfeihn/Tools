define(["jquery"], function () {

    return {
        load: function ($el, scope, handler) {
            var activeTrData;
            var dataLen;
            var fieldNames;
            //agent采集Table
            var $searchTable = $('#searchTable', $el).DataTable({
                'paging': true,
                "pagingType": 'full_numbers',
                'searching': true,
                'bSort': false,
                'columns': [{
                    data: 'index',
                }, {
                    data: 'object_id', defaultContent: '-'
                }, {
                    data: 'source_ip', defaultContent: '-'
                }, {
                    data: 'data_type', defaultContent: '-'
                }, {
                    data: 'trans_type', defaultContent: '-'
                }, {
                    data: 'back_server_ip', defaultContent: '-'
                }, {
                    data: 'back_file_path', defaultContent: '-'
                }, {
                    data: 'back_file_name', defaultContent: '-'
                }, {
                    data: 'back_file_size', defaultContent: '-'
                }, {
                    data: 'create_time', defaultContent: '-'
                }, {
                    data: 'back_state', defaultContent: '-'
                }, {
                    data: 'back_duration', defaultContent: '-'
                }, {
                    data: 'clean_state', defaultContent: '-'
                }, {
                    data: 'clean_duration', defaultContent: '-'
                }, {
                    data: 'remark', defaultContent: ''
                }],
                'aoColumnDefs': [{
                    "render": function (data, type, row, meta) {
                        if (data == 1) {
                            return "存储归档";
                        } else if (data == 2) {
                            return "文件归档";
                        }
                    },
                    "targets": 3
                }, {
                    "render": function (data, type, row, meta) {
                        if (data == 1) {
                            return "FTP";
                        } else if (data == 2) {
                            return "SFTP";
                        } else if (data == 3) {
                            return "SCP";
                        }
                    },
                    "targets": 4
                }, {
                    "render": function (data, type, row, meta) {
                        return data && new Date(data).Format('yyyy-MM-dd hh:mm:ss');
                    },
                    "targets": 9
                }, {
                    "render": function (data, type, row, meta) {
                        if (data == '0') {
                            return "失败";
                        } else if (data == '1') {
                            return "成功";
                        } else {
                            return "-";
                        }
                    },
                    "targets": 10
                }, {
                    "render": function (data, type, row, meta) {
                        if (data == '0') {
                            return "失败";
                        } else if (data == '1') {
                            return "成功";
                        } else {
                            return "-";
                        }
                    },
                    "targets": 12
                }]
            });

            $('#start_time', $el).datetimepicker({
                autoclose: true,
                format: 'yyyy-mm-dd hh:ii:ss'
            }).val(new Date().Format('yyyy-MM-dd 00:00:00'));
            $('#end_time', $el).datetimepicker({
                autoclose: true,
                format: 'yyyy-mm-dd hh:ii:ss'
            }).val(new Date().Format('yyyy-MM-dd hh:mm:ss'));

            loadSearchTableData();
            /**
             * 加载table数据
             * @return {undefined}
             */
            function loadSearchTableData() {
                app.common.ajaxWithAfa({
                    url: 'LogManagementAction_getLogArchiveHists.do',
                    data: {
                        startTime: $('#start_time', $el).val(),
                        endTime: $('#end_time', $el).val(),
                        backState: $('#back_state option:selected').val().trim() || '',
                        cleanState: $('#clean_state option:selected').val().trim() || ''
                    }
                }).done(function (data) {
                    $searchTable.clear();
                    var result = data.result;
                    dataLen = result.length;
                    if (result && dataLen > 0) {
                        result.forEach(function (item, index) {
                            item.index = index + 1;
                            if(item.source_ip == undefined || item.source_ip == null){
                                item.source_ip = '';
                            }
                            if(item.back_duration == undefined || item.back_duration == null){
                                item.back_duration = '';
                            }
                            if(item.clean_duration == undefined || item.clean_duration == null){
                                item.clean_duration = '';
                            }
                            if(item.back_file_size == undefined || item.back_file_size == null){
                                item.back_file_size = '';
                            }
                        })
                    }
                    $searchTable.rows.add(result).draw();
                })
            }


            $(".query-btn", $el).on("click", function () {
                $searchTable.data().clear();

                loadSearchTableData();

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
