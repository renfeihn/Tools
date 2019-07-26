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
                'bSort': true,
                'pageLength': 18,
                'columns': [{
                    data: 'index',
                }, {
                    data: 'task_name', defaultcontent: '-'
                }, {
                    data: 'task_description', defaultcontent: '-'
                }, {
                    data: 'exec_params', defaultcontent: '-'
                }, {
                    data: 'status', defaultcontent: '-'
                }, {
                    data: 'exception', defaultcontent: '-'
                }, {
                    data: 'start_time', defaultcontent: '-'
                }, {
                    data: 'end_time', defaultcontent: '-'
                }],
                'aoColumnDefs': [{
                    "render": function (data, type, row, meta) {
                        if (data == 'init') {
                            return `<span class="status-tack status-${data}">初始</span>`;
                        } else if (data == 'running') {
                            return `<span class="status-tack status-${data}">运行</span>`;
                        } else if (data == 'success') {
                            return `<span class="status-tack status-${data}">成功</span>`;
                        } else if (data == 'skipped') {
                            return `<span class="status-tack status-${data}">忽略</span>`;
                        } else if (data == 'error') {
                            return `<span class="status-tack status-${data}">异常</span>`;
                        }
                    },
                    "targets": 4
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
            let allData = [];
            function loadSearchTableData() {
                app.common.ajaxWithAfa({
                    url: 'LogManagementAction_getTaskLogList.do',
                    data: {
                    }
                }).done(function (data) {
                    $searchTable.clear();
                    var result = data.result;
                    result = result.map((item, index) => {
                    	item.index = index+1;
                    	item.exception = item.exception || '-';
                    	item.start_time = new Date(item.start_time).Format('yyyy-MM-dd hh:mm:ss');
                    	item.end_time = new Date(item.end_time).Format('yyyy-MM-dd hh:mm:ss');
                    	return item;
                    })
                    allData = result;
                    $searchTable.rows.add(result).draw();
                })
            }

            $("#back_state", $el).on('change', function () {
            	var val = $(this).val();
            	$searchTable.clear();
            	if (val === '') {
            		$searchTable.rows.add(allData).draw();
            	} else {
            		var data = allData.filter(item => {
            			if (item.status === val) {
            				return true;
            			}
            			return false;
            		})
            		$searchTable.rows.add(data).draw();
            	}
            })
            

        },

        unload: function (handler) {

        },

        pause: function ($el, scope, handler) {

        },

        resume: function ($el, scope, handler) {

        }

    }
});
