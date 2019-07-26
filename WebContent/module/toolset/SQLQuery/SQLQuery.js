define(["jquery", "handlebars", "codemirror/lib/codemirror", "codemirror/mode/sql/sql",
    "codemirror/addon/hint/show-hint", "codemirror/addon/hint/sql-hint"], function ($, hb, CodeMirror) {

    var hotkey;

    return {
        load: function ($el, scope, handler) {

            hotkey = function (e) {
                var a = e.keyCode;
                if ((a == 82) && (e.ctrlKey)) {
                    e.preventDefault();
                    $('#runSqlBtn', $el).trigger('click');
                }
            };

            $("#defaultRsNum", $el).on("blur", function () {
                if ($(this).val() === "") {
                    $(this).val(20);
                }
            });

            var tableTips = {};
            var tableObjs = {};
            var testSucc = false;
            var PASSWORD;
            // var formSQLBook;
            var $sqlEdit;
            // 添加的数据源的连接名
            var noRepeat_project = new Set();

            $sqlEdit = CodeMirror.fromTextArea($('#sqlText', $el)[0], {
                mode: "text/x-sql",
                readOnly: false,
                styleActiveLine: true,
                lineNumbers: true,
                extraKeys: getExtraKeys(),
            });
            initSQLExcute(scope.text || '');

            // 数据库类型 URL
            var tipMap = {
                DB2: "jdbc:db2://127.0.0.1:6789/dbName",
                Mysql: "jdbc:mysql://127.0.0.1:3306/dbName",
                Oracle: "jdbc:oracle:thin:@127.0.0.1:1521:ORCL"
            };

            // setValue
            var $databaseTable = $('#databaseTable', $el).DataTable({
                'searching': false,
                'bPaginate': false, // 开关，是否显示分页器
                'bSort': false,
                'bAutoWidth': false,
                'pageLength': 5,
                // "fnDrawCallback" : function(){
                //     this.api().column(0).nodes().each(function(cell, i) {
                //         cell.innerHTML =  i + 1;
                //     });
                // },
                'columns': [{
                    data: 'index', defaultContent: ''
                }, {
                    data: 'project', defaultContent: ''
                }, {
                    data: 'dbName', defaultContent: ''
                }, {
                    data: 'dbType', defaultContent: ''
                }, {
                    data: 'url', defaultContent: ''
                }, {
                    data: 'user', defaultContent: ''
                }, {
                    data: 'password', defaultContent: ''
                }, {
                    data: 'isUse', defaultContent: ''
                }],
                'aoColumnDefs': [{
                    "render": function (data, type, row, meta) {
                        return '<span class="link-edit fa fa-edit" title="编辑"></span>';
                    },
                    "targets": 7
                }, {
                    'render': function (data, type, row, meta) {
                        return '<i class="fa fa-square-o"></i>'
                    },
                    'targets': 8
                }]
            });

            function initSQLExcute(text) {
                clearResultContent();
                $('#SQLHistoryList', $el).html('<li><span style="flex:1; text-align:center;">无数据</span></li>');
                text = text || '';
                $sqlEdit.getDoc().setValue(text);
                // loadDatabaseTableData();
            }

            var uri = $(location).attr("href");
            if (uri.indexOf("localhost") >= 0) {
                // 为方便测试，添加初始数据
                loadDatabaseTableData();
            }

            // 数据源弹出层
            var $serverModal = $('#serverModal', $el);

            // 增加数据源按钮
            $('#addDatabaseBtn', $el).on('click', function (event) {
                event.preventDefault();
                $serverModal.modal('show');
                initserverModal();

            });

            var editFlag = false;
            // 初始化模态框
            function initserverModal(tr) {
                $serverModal.find('form')[0].reset();
                $('.help-inline', $el).addClass('hide');
                $('[name="dbType"]', $serverModal).trigger('change');
                if (tr) {
                    editFlag = true;
                    $('#myModalLabel', $el).text("修改数据源");
                    for (var item in tr) {
                        if (tr.hasOwnProperty(item)) {
                            $('[name="' + item + '"]', $serverModal).val(tr[item]);
                        }
                    }
                } else {
                    editFlag = false;
                    $('#myModalLabel', $el).text("新增数据源");
                    var newIndex = $databaseTable.data().length + 1;
                    $('[name="index"]', $serverModal).val(newIndex);
                }
            }


            // 添加数据源校验窗口
            function validation() {
                $('[required]', $el).each(function () {
                    if ($(this).val().trim() == '') {
                        $(this).next().text('不能为空').removeClass('hide');
                    } else if ($(this).val().trim() != '') {
                        $(this).next().addClass('hide');
                    }
                });

                var $project = $('[name="project"]', $el);
                var project = $('[name="project"]', $el).val();
                if (!project) {
                    $project.next().removeClass('hide').text('不能为空');
                } else if (editFlag && project != activeTrData.project && noRepeat_project.has(project) || !editFlag && noRepeat_project.has(project)) {
                    $project.next().removeClass('hide').text('已存在的系统名');
                } else {
                    $project.next().addClass('hide');
                }

                if ($('.help-inline', $el).not('.hide').length > 0) {
                    return false;
                } else {
                    return true;
                }
            }

            // 数据源修改
            function modify(urlParam) {
                var index = urlParam.index;
                $databaseTable.row(index - 1).data(urlParam).draw();
                editFlag = false;
                return true;
            }

            // 数据源新增
            function add(urlParam) {
                $databaseTable.row.add(urlParam).draw();
                editFlag = false;
                return true;
            }

            // 预警模态框事件
            $serverModal.on('click', '.confirmBtn', function (event) {
                // var id = $serverModal.attr('index');
                if (!validation()) {
                    return;
                }
                var formData = app.common.serializeObject($serverModal.find('form'));
                if (editFlag) {
                    // console.log(formData);
                    if (modify(formData)) {
                        app.alert('修改成功！');
                    } else {
                        app.alert('修改失败！');
                    }
                    $serverModal.modal('hide');
                } else {
                    // formData.index = $serverModal.data().length;
                    if (add(formData)) {
                        app.alert('新增成功！');
                        // loadSearchTableData();
                        // $serverModal.modal('hide');
                    } else {
                        app.alert('新增失败！');
                    }
                    $serverModal.modal('hide');

                }
            }).on('change', '[name="dbType"]', function (event) {
                event.preventDefault();
                var val = $(this).val();
                $('[name="url"]', $serverModal).val(tipMap[val]);
            }).on('click', '.linktest', function (event) {
                event.preventDefault();
                if (!validation()) {
                    return;
                }
                var formData = app.common.serializeObject($serverModal.find('form'));
                if (!formData.password) {
                    $('[name="password"]', $el).next().text('请填写密码').removeClass('hide');
                    return;
                } else {
                    $('[name="password"]', $el).next().addClass('hide');
                }
                test(formData).then(function (data) {
                    if (data.result) {
                        app.alert('连接成功！');
                        testSucc = true;
                    } else {
                        app.alert('连接失败！');
                    }
                })
            }).on('blur input change', '[name="project"]', function () {
                if (this.value && editFlag && noRepeat_project.has(this.value) || this.value && !editFlag && noRepeat_project.has(this.value)) {
                    $(this).next().removeClass('hide').text('已存在的系统名');
                } else if (!this.value) {
                    $(this).next().removeClass('hide').text('不能为空');
                } else {
                    $(this).next().addClass('hide');
                }
            });

            /**
             * 加载数据库数据
             * @return {[type]} [description]
             */
            function loadDatabaseTableData() {
                $databaseTable && $databaseTable.clear().draw();
                // 初始化数据
                var data = '[{"index":"1","project":"aim_log_2_0","dbName":"aim_log_2_0","dbType":"Mysql",' +
                    '"url":"jdbc:mysql://10.9.3.132:3306/aim_log_2_0","user":"aim_log_2_0","password":"aim_log_2_0"},{"index":"2","project":"aim_log_2_0","dbName":"aim_log_2_0","dbType":"Mysql",' +
                    '"url":"jdbc:mysql://10.9.3.132:3306/aim_log_2_0","user":"aim_log_2_0","password":"aim_log_2_0"}]';
                $databaseTable.rows.add(JSON.parse(data)).draw();
                // app.common.ajaxWithAfa({
                //     url: 'DbManagerAction_getManagers.do'
                // }).done(function (data) {
                //     $databaseTable.clear();
                //
                //     var result = data.result;
                //     if (result && result.length > 0) {
                //         result.forEach(function (item, index) {
                //             item.index = index + 1;
                //         })
                //         $databaseTable.rows.add(result).draw();
                //     } else {
                //         $databaseTable.rows.add([]).draw();
                //     }
                // })
            };

            // 修改数据
            $('#databaseTable', $el).on('click', '.link-edit', function (event) {//编辑
                event.stopPropagation();
                var tr = $databaseTable.row($(this).parents('tr')).data();
                $serverModal.modal('show');
                activeTrData = tr;
                initserverModal(tr);
            });

            $('#databaseTable', $el).on('click', '.fa', function (event) {
                event.preventDefault();
                if (!$(this).hasClass('fa-check-square')) {
                    var $this = $(this);
                    var tr = $('#databaseTable', $el).find('tr.selected');
                    if (tr && tr.length > 0 && PASSWORD) {
                        app.confirmDialog({
                            sTitle: "确认",
                            sType: "search",
                            sContent: '已存在数据库连接,确定切换数据库？',
                            sBtnConfirm: '确定',
                            sBtnCancel: '取消',
                            fnConfirmHandler: function () {
                                $('#databaseTable', $el).find('.fa-check-square').removeClass('fa-check-square');
                                $('#databaseTable', $el).find('tr.selected').removeClass('selected');
                                $this.addClass('fa-check-square');
                                var tr = $this.parents('tr');
                                tr.addClass('selected');
                                var data = $databaseTable.row(tr).data();
                                $('#databaseTable', $el).trigger('checkChange', data);
                                $('#linkDatabase', $el).trigger('click');
                                app.alert('切换数据库成功');
                            },
                            aArgs: []
                        });
                    } else {
                        $('#databaseTable', $el).find('.fa-check-square').removeClass('fa-check-square');
                        $('#databaseTable', $el).find('tr.selected').removeClass('selected');
                        $this.addClass('fa-check-square');
                        var tr = $(this).parents('tr');
                        tr.addClass('selected');
                        var data = $databaseTable.row(tr).data();
                        $('#databaseTable', $el).trigger('checkChange', data);
                        $('#linkDatabase', $el).removeClass('linking linked');
                    }

                }
                event.stopPropagation();
            })/*.on('checkChange', function (event, val) {
             $('#SQLHistoryList', $el).html('<li><span style="flex:1; text-align:center;">无数据</span></li>');
             clearResultContent();
             tableTips = {};
             if (val) {
             getSqlExecuteHis(val.id);
             // getSqlBooks(val.id);
             }
             })*/.on('click', 'tr', function (event) {
                event.preventDefault();
                $(this).find('i.fa').trigger('click');
            });

            $('#linkDatabase', $el).on('click', function (event) {
                event.preventDefault();
                if ($(this).hasClass('linked')) {
                    $(this).removeClass('linking linked').find('.linkText').text('连接数据库');
                    PASSWORD = undefined;
                    // 移除表名
                    $(".left ul").empty();
                } else {
                    var tr = $('#databaseTable', $el).find('tr.selected');
                    if (tr.length < 1) {
                        app.alert('请选择数据库！');
                        return;
                    }
                    $('#passwordSQL', $el).val('');
                    // 方便测试，上线时删除
                    if (uri.indexOf("localhost") >= 0) {
                        $('#passwordSQL', $el).val('aim_log_2_0');
                    }
                    $('#passwordmodal', $el).modal('show');
                    $('#passwordSQL', $el).focus();
                }

            });

            $('#passwordmodal', $el).on('keyup', '#passwordSQL', function (event) {
                if (event.keyCode == 13) {
                    $('#passwordmodal', $el).find('.confirmBtn').trigger('click');
                }
            }).on('click', '.confirmBtn', function (event) {
                event.preventDefault();
                var password = $('#passwordSQL', $el).val();
                if (password == '') {
                    app.alert('请填写密码!');
                    $('#passwordSQL', $el).focus();
                    return;
                }
                $('#passwordmodal', $el).modal('hide');
                $('#linkDatabase', $el).addClass('linking');
                var tr = $('#databaseTable', $el).find('tr.selected');
                trData = $databaseTable.row(tr).data();
                trData.password = password;
                test(trData, password).then(function (data) {
                    if (data.result) {
                        $('#linkDatabase', $el).removeClass('linking').addClass('linked').find('.linkText').text('断开数据库连接');
                        app.alert('连接数据库成功');
                        PASSWORD = password;
                        getDbTables(trData, password);
                        // getSqlExecuteHis(trData.id);
                        // getSqlBooks(trData.id);
                        // formSQLBook = null;
                    } else {
                        $('#linkDatabase', $el).removeClass('linking linked');
                        app.alert('连接数据库失败，请检查相关信息。');
                    }
                });
            });

            // 测试数据库连接
            function test(urlParam, password) {
                return app.common.ajaxWithAfa({
                    url: 'DbManagerAction_testConnection.do',
                    data: {
                        manager: JSON.stringify(urlParam),
                        passwd: urlParam.password
                    }
                }).done(function (data) {
                    return $.Deferred().resolve(data);
                })
            }

            // 获取用户下所有表名
            function getDbTables(trData, password) {
                app.common.ajaxWithAfa({
                    url: 'ToolsetAction_getToolsetDbTables.do',
                    data: {
                        manager: JSON.stringify(trData),
                        passwd: password
                    }
                }).done(function (data) {
                    if (data.result && data.result.length > 0) {
                        data.result.forEach(function (item) {
                            tableTips[item] = [];
                            // 拼接表名
                            $(".left ul").append('<li style="cursor:pointer;" > <span title="' + item + '">' + item + '</span></li>');
                        })
                    } else {
                        tableTips = {};
                    }
                })
            }

            //SQL区域清空按钮点击事件
            $('#clearSqlBtn', $el).on('click', function (event) {
                $sqlEdit.getDoc().setValue("");
                $('#runSqlResultUl', $el).empty();
                $('#runSqlResultTab', $el).empty();
                $('#runSqlResult', $el).hide();
            });

            $(document).on('keydown.runSqlBtn', function (e) {
                hotkey(e);
            });

            //SQL运行按钮点击事件
            $('#runSqlBtn', $el).on('click', function (event) {
                event.preventDefault();
                var $self = $(this);
                if ($self.find('i').hasClass('fa-spinner')) {
                    return;
                }
                var tr = $('#databaseTable', $el).find('tr.selected');
                if (tr.length < 1) {
                    app.alert('请选择数据库！');
                    return;
                }
                // 选中行数据
                var trData = $databaseTable.row(tr).data();
                var selectionObj = window.getSelection();
                var selectedText = selectionObj.toString();
                var sqlText = '';
                if (selectedText) {
                    sqlText = selectedText;
                } else {
                    sqlText = $.trim($sqlEdit.getDoc().getValue());
                }

                if (sqlText == '') {
                    app.alert('请填写SQL！');
                    return;
                }
                if (!PASSWORD) {
                    app.alert('请先连接数据库');
                    return;
                }
                if (verificationSql(sqlText)) {
                    app.alert('sql语句不能包含update／delete／create／drop关键字 ');
                    return;
                }
                $self.find('i').toggleClass('fa-spinner fa-spin');
                clearResultContent();
                executeSQl(trData, sqlText).then(function (data) {
                    if (data.result && data.result.length > 0) {
                        initContent(data.result);
                        $('#runSqlResult', $el).show();
                    } else {
                        app.alert("无满足条件记录");
                    }
                    $self.find('i').removeClass('fa-spinner fa-spin');
                    // sql执行历史需要用cookie实现 待完善
                    // console.log(sqlText);
                    getSqlExecuteHis(sqlText);
                }, function () {
                    $self.find('i').removeClass('fa-spinner fa-spin');
                })
            });

            //保存按钮点击事件
            $('#saveSqlBtn', $el).on('click', function (event) {
                event.preventDefault();
                var tr = $('#databaseTable', $el).find('tr.selected');
                if (tr.length < 1) {
                    app.alert('请选择数据库！');
                    return;
                }
                var sqlText = $.trim($sqlEdit.getDoc().getValue());
                if (sqlText == '') {
                    app.alert('请填写SQL！');
                    return;
                }
                if (!PASSWORD) {
                    app.alert('请先连接数据库');
                    return;
                }
                if (verificationSql(sqlText)) {
                    app.alert('sql语句不能包含update／delete／create／drop关键字');
                    return;
                }
                // if (!formSQLBook) {
                //     $('#title', $el).val('');
                //     $('#dbBookModal', $el).modal('show');
                //     $('#title', $el).focus();
                // } else {
                //     var urlParam = formSQLBook;
                //     urlParam.executeSql = sqlText;
                //     updateDbBook(urlParam).then(function (data) {
                //         if (data.result) {
                //             app.alert('修改成功！');
                //             getSqlBooks(urlParam.dbId);
                //         } else {
                //             app.alert('修改失败！');
                //         }
                //     })
                // }

            });

            //另存为按钮点击事件
            // $('#saveAsBtn', $el).on('click', function (event) {
            //     event.preventDefault();
            //     var tr = $('#databaseTable', $el).find('tr.selected');
            //     if (tr.length < 1) {
            //         app.alert('请选择数据库！');
            //         return;
            //     }
            //     var sqlText = $.trim($sqlEdit.getDoc().getValue());
            //
            //     if (sqlText == '') {
            //         app.alert('请填写SQL！');
            //         return;
            //     }
            //     if (!PASSWORD) {
            //         app.alert('请先连接数据库');
            //         return;
            //     }
            //     if (verificationSql(sqlText)) {
            //         app.alert('sql语句不能包含update／delete／create／drop关键字');
            //         return;
            //     }
            //     $('#title', $el).val('');
            //     $('#dbBookModal', $el).modal('show');
            //     $('#title', $el).focus();
            // });

            $('#dbBookModal', $el).on('keyup', '#title', function (event) {
                if (event.keyCode == 13) {
                    $('#dbBookModal', $el).find('.confirmBtn').trigger('click');
                }
            }).on('click', '.confirmBtn', function (event) {
                event.preventDefault();
                var title = $('#title', $el).val();
                if (title == '') {
                    app.alert('请填写标签名');
                    $('#title', $el).focus();
                    return;
                }
                $('#dbBookModal', $el).modal('hide');
                var tr = $('#databaseTable', $el).find('tr.selected');
                trData = $databaseTable.row(tr).data();

                var urlParam = new Object();
                urlParam.dbId = trData.id;
                urlParam.title = title;
                urlParam.executeSql = $.trim($sqlEdit.getDoc().getValue());
                // addDbBook(urlParam).then(function (data) {
                //     if (data.result) {
                //         app.alert('添加成功！');
                //         getSqlBooks(urlParam.dbId);
                //     } else {
                //         app.alert('添加失败！');
                //     }
                //     $serverModal.modal('hide');
                // })
            });

            function verificationSql(sql) {
                return /(delete)|(update)|(create)|(drop)/gim.test(sql);
            }

            // 到处excel
            $('#runSqlResultTab', $el).on('click', '.exportExecuteData', function (event) {
                event.preventDefault();
                var tr = $('#databaseTable', $el).find('tr.selected');
                var id = $databaseTable.row(tr).data().id;
                var sqlText = $(this).siblings('.sql').text().trim();
                $.ajaxDownload('DbManagerAction_downExcel.do', {
                    id: id,
                    sql: sqlText,
                    passwd: PASSWORD
                });
            });

            $('#runSqlResultTab', $el).on('click', '.exportInsertExecuteData', function (event) {
                event.preventDefault();
                var tr = $('#databaseTable', $el).find('tr.selected');
                var id = $databaseTable.row(tr).data().id;
                var sqlText = $(this).siblings('.sql').text().trim();
                $.ajaxDownload('DbManagerAction_downInsert.do', {
                    id: id,
                    sql: sqlText,
                    passwd: PASSWORD
                });
            });

            function initContent(list) {
                var index = 0;
                var liString = '';
                var cntentString = '';
                if (list && list.length > 0) {
                    list.forEach(function (item, index) {
                        index = index + 1;
                        liString = '<li><a href="#sqlExecuteRes' + index + '" data-toggle="tab">结果' + index + '</a></li>';
                        cntentString = '<div id="sqlExecuteRes' + index + '" class="tab-pane">' +
                            '<p class="title" style="position: absolute; margin: 0; height: 25px;line-height: 25px; padding-left: 10px;box-sizing: border-box;margin-top: -5px;display: flex;justify-content: space-between;">' +
                            '<span class="sql" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;flex: auto;" title="' + item.sql + '">' + item.sql + '</span>' +
                            '<span style="font-size: 12px;font-weight: normal;margin-left: 20px;white-space: nowrap;flex: none;">共匹配到 <i class="total" >' + item.total + '</i> 条记录，耗时 <i class="duration">' + item.duration + 'ms</i></span>' +
                            // '<button type="button" class="confirmBtn pull-right exportExecuteData" style="line-height: 25px;height: 25px;flex:none;margin-left:20px;"><i class="fa fa-download"></i>导出excel</button>' +
                            // '<button type="button" class="confirmBtn pull-right exportInsertExecuteData" style="line-height: 25px;height: 25px;flex:none;margin-left:4px;"><i class="fa fa-download"></i>导出Insert SQL</button>' +
                            '</p>' +
                            '<div style=" overflow: auto;margin-top: 30px;">' +
                            '<table id="sqlResultTable' + index + '" class="display dataTable table" style="user-select: text; table-layout:fixed ; cursor: text">' +
                            '<thead>' +
                            '<tr><th style="text-align: center;">无满足条件的记录</th></tr>' +
                            '</thead>' +
                            '<tbody></tbody>' +
                            ' </table>' +
                            '</div>' +
                            '</div>';
                        $('#runSqlResultUl', $el).append(liString);
                        $('#runSqlResultTab', $el).append(cntentString);
                        if (item.queryResult.length > 0) {
                            createTable('sqlResultTable' + index, item.queryResult, item.columes);
                        }

                    });
                    $('#runSqlResultUl li:eq(0)>a', $el).trigger('click');
                }
            }

            function createTable(tableId, list, columes) {
                var trHtml = '';
                var coloum = [];
                for (var i = 0; i < columes.length; i++) {
                    trHtml += '<th>' + columes[i] + '</th>'
                    coloum.push({
                        data: columes[i],
                        defaultContent: ''
                    })
                }
                $('#' + tableId + ' thead>tr', $el).html(trHtml);

                $sqlResultTable = $('#' + tableId, $el).DataTable({
                    'searching': false,
                    'bPaginate': true, // 开关，是否显示分页器
                    'bSort': false,
                    'bAutoWidth': false,
                    'bpageLength': 5,
                    'columns': coloum
                });
                $sqlResultTable.rows.add(list).draw();
                tableObjs[tableId] = $sqlResultTable;
            }

            function clearResultContent() {
                if (tableObjs && !$.isEmptyObject(tableObjs)) {
                    for (var item in tableObjs) {
                        tableObjs[item] && tableObjs[item].destroy();
                        delete tableObjs[item];
                    }
                }
                $('#runSqlResultUl', $el).empty();
                $('#runSqlResultTab', $el).empty();
                $('#runSqlResult', $el).hide();
            }

            /**
             * 执行SQL
             * @param  {[type]} id  数据库ID
             * @param  {[type]} sql sql文本
             * @return {[type]}     [description]
             */
            function executeSQl(trData, sql) {
                var defaultRsNum = parseInt($("#defaultRsNum", $el).val());
                return app.common.ajaxWithAfa({
                    url: 'ToolsetAction_executeSQL.do',
                    data: {
                        manager: JSON.stringify(trData),
                        sql: sql,
                        passwd: trData.password,
                        pageNum: defaultRsNum
                    }
                }).done(function (data) {
                    return $.Deferred().resolve(data);
                })
            }


            function sortIndex(sqlArr) {
                //先根据执行次数排序
                function sortTimes(a, b) {
                    return b.times - a.times
                }

                sqlArr.sort(sortTimes);

                var index = 0;
                for (var i = 0; i < sqlArr.length; i++) {
                    var hist = sqlArr[i];
                    index++;
                    hist.index = index;
                }
                return sqlArr;
            }

            function loadSqlExecuteHis() {
                var sqls = localStorage.getItem('sqls');
                if (sqls) {
                    var sqlArr = JSON.parse(sqls);
                    // console.log("load sqls: " + sqls);
                    sqlArr = sortIndex(sqlArr);
                    var sqls = localStorage.setItem('sqls', JSON.stringify(sqlArr));

                    // 刷新表格
                    // 清除原表格内容
                    $sqlHisDataTable.data().clear();
                    $sqlHisDataTable.rows.add(sqlArr).draw();
                } else {
                    $sqlHisDataTable.data().clear();
                }
            }

            /**
             * 根据数据库ID查询sql执行历史
             * @param  {[type]} id [description]
             * @return {[type]}    [description]
             */
            function getSqlExecuteHis(sqlText) {
                // 如果有新的sql，加入cookie
                var sqlArr = new Array();
                var sqls = localStorage.getItem('sqls');
                // console.log('sqls: ' + sqls);
                var num = 0;
                var index = 0;
                if (sqls) {
                    sqlArr = JSON.parse(sqls);
                    for (var i = 0; i < sqlArr.length; i++) {
                        var hist = sqlArr[i];
                        hist.index++;
                        if (sqlText.toUpperCase() == hist.executeSql.toUpperCase()) {
                            num++;
                            hist.times++;
                            hist.lastExecuteTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
                        }
                    }
                }

                if (num == 0) {
                    var hist = new Object();
                    hist.index++;
                    hist.executeSql = sqlText;
                    hist.times = 1;
                    hist.lastExecuteTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
                    sqlArr.push(hist);
                }
                sqls = JSON.stringify(sqlArr);
                // console.log('--: ' + sqls);
                localStorage.setItem('sqls', sqls);

                loadSqlExecuteHis();
            }

            /**
             * 根据sqlId删除sql历史
             * @param  {[type]} id [description]
             * @return {[type]}    [description]
             */
            function delSQLExecuteHis(index) {
                // 如果有新的sql，加入cookie
                var sqlArr = new Array();
                var sqls = localStorage.getItem('sqls');
                // console.log('sqls: ' + sqls);
                var newIndex = 0;
                if (sqls) {
                    sqlArr = JSON.parse(sqls);
                    for (var i = 0; i < sqlArr.length; i++) {
                        var hist = sqlArr[i];
                        if (index == hist.index) {
                            newIndex = i;
                        }
                    }
                }

                sqlArr.splice(newIndex, 1);
                // console.log('new sqlArr: ' + sqlArr);
                sqls = JSON.stringify(sqlArr);
                localStorage.setItem('sqls', sqls);

                // 刷新表格
                loadSqlExecuteHis();
                return true;
            }


            /**
             * 删除所有的sql历史
             * @param  {[type]} id [description]
             * @return {[type]}    [description]
             */
            function delAllSQLExecuteHis() {
                localStorage.removeItem('sqls');

                // 刷新表格
                loadSqlExecuteHis();
                return true;
            }


            // 点击SQL历史页签
            $('#SQLHistoryId', $el).on('click', function (event) {
                loadSqlExecuteHis();
            });

            //清空SQL历史按钮点击事件
            $('#SQLHisAllCleanBtn', $el).on('click', function (event) {
                event.preventDefault();
                app.confirmDialog({
                    sTitle: "确认",
                    sType: "search",
                    sContent: '确定清空SQL历史记录？',
                    sBtnConfirm: '确定',
                    sBtnCancel: '取消',
                    fnConfirmHandler: function () {
                        if (delAllSQLExecuteHis()) {
                            app.alert('删除成功！');
                            // getSqlExecuteHis(dbId);
                        } else {
                            app.alert('删除记录失败！');
                        }
                    },
                    aArgs: []
                });
            });

            // SQL历史事件绑定
            $('#sqlHisDataTable tbody', $el).on('click', '.fa-trash', function (event) {
                event.preventDefault();
                var rowData = $sqlHisDataTable.row($(this).closest("tr")).data();
                var id = rowData.index;
                // console.log('要删除的ID： ' + id);
                app.confirmDialog({
                    sTitle: "确认",
                    sType: "search",
                    sContent: '确定删除该条SQL记录？',
                    sBtnConfirm: '确定',
                    sBtnCancel: '取消',
                    fnConfirmHandler: function () {
                        if (delSQLExecuteHis(id)) {
                            app.alert('删除成功！');
                        } else {
                            app.alert('删除记录失败！');
                        }
                    },
                    aArgs: []
                });
                event.stopPropagation();
            }).on('click', 'tr', function (event) {
                event.preventDefault();
                var rowData = $sqlHisDataTable.row(this).data();
                var executeSql = rowData.executeSql;
                $('#addToEditmodal', $el).modal('show');
                $('#addToEditmodal', $el).data({
                    sql: executeSql
                })
            });

            $('#addToEditmodal', $el).on('click', '.cancel', function (event) {
                event.preventDefault();
                var sql = $('#addToEditmodal', $el).data().sql;
                var text = $.trim($sqlEdit.getDoc().getValue());
                if (text != '') {
                    $sqlEdit.getDoc().setValue(text + '\n\n' + sql);
                } else {
                    $sqlEdit.getDoc().setValue(sql);
                }
                $('#addToEditmodal', $el).modal('hide');
                $('#SQLTab li:eq(0)>a', $el).click();
                $sqlEdit.refresh();
            }).on('click', '.confirmBtn', function (event) {
                event.preventDefault();
                var sql = $('#addToEditmodal', $el).data().sql;
                $sqlEdit.getDoc().setValue(sql);
                $('#SQLTab li:eq(0)>a', $el).click();
                $('#addToEditmodal', $el).modal('hide');
                $('#SQLTab li:eq(0)>a', $el).click();
                $sqlEdit.refresh();
            });

            function completeAfter(cm, pred) {
                var cur = cm.getCursor();
                if (!pred || pred()) setTimeout(function () {
                    if (!cm.state.completionActive) {
                        cm.showHint({
                            completeSingle: false,
                            tables: tableTips
                        });
                    }
                }, 100);
                return CodeMirror.Pass;
            }

            function getExtraKeys() {
                return {
                    "'a'": completeAfter,
                    "'A'": completeAfter,
                    "'b'": completeAfter,
                    "'B'": completeAfter,
                    "'c'": completeAfter,
                    "'C'": completeAfter,
                    "'d'": completeAfter,
                    "'D'": completeAfter,
                    "'e'": completeAfter,
                    "'E'": completeAfter,
                    "'f'": completeAfter,
                    "'F'": completeAfter,
                    "'g'": completeAfter,
                    "'G'": completeAfter,
                    "'h'": completeAfter,
                    "'H'": completeAfter,
                    "'i'": completeAfter,
                    "'I'": completeAfter,
                    "'g'": completeAfter,
                    "'G'": completeAfter,
                    "'k'": completeAfter,
                    "'K'": completeAfter,
                    "'l'": completeAfter,
                    "'L'": completeAfter,
                    "'m'": completeAfter,
                    "'M'": completeAfter,
                    "'n'": completeAfter,
                    "'N'": completeAfter,
                    "'o'": completeAfter,
                    "'O'": completeAfter,
                    "'p'": completeAfter,
                    "'P'": completeAfter,
                    "'q'": completeAfter,
                    "'Q'": completeAfter,
                    "'r'": completeAfter,
                    "'R'": completeAfter,
                    "'s'": completeAfter,
                    "'S'": completeAfter,
                    "'t'": completeAfter,
                    "'T'": completeAfter,
                    "'u'": completeAfter,
                    "'U'": completeAfter,
                    "'v'": completeAfter,
                    "'V'": completeAfter,
                    "'w'": completeAfter,
                    "'W'": completeAfter,
                    "'x'": completeAfter,
                    "'X'": completeAfter,
                    "'y'": completeAfter,
                    "'Y": completeAfter,
                    "'z'": completeAfter,
                    "'Z'": completeAfter,
                    "'.'": completeAfter,
                    "'_'": completeAfter,
                    "'-'": completeAfter,
                    "' '": completeAfter,
                    // "Ctrl": "autocomplete",
                    // "Cmd": "autocomplete"
                };
            }

            var $sqlHisDataTable = $('#sqlHisDataTable', $el).DataTable({
                'searching': true,
                'bPaginate': false, // 开关，是否显示分页器
                'bSort': false,
                'bAutoWidth': false,
                'pageLength': 10,
                'columns': [{
                    data: 'index', defaultContent: '-'
                }, {
                    data: 'executeSql', defaultContent: '-'
                }, {
                    data: 'times', defaultContent: '-'
                }, {
                    data: 'lastExecuteTime', defaultContent: '-'
                }, {
                    data: null, defaultContent: '-'
                }],
                'aoColumnDefs': [{
                    'render': function (data, type, row, meta) {
                        return '<i class="fa fa-trash"></i>'
                    },
                    'targets': 4
                }]
            });

            // /**
            //  * 根据数据库ID查询sql书签
            //  * @param  {[long]} id [数据库连接ID]
            //  * @return {[type]}    [description]
            //  */
            // function getSqlBooks(id) {
            //     app.common.ajaxWithAfa({
            //         url: 'DbManagerAction_getDbBooks.do',
            //         data: {
            //             id: id
            //         }
            //     }).done(function (data) {
            //         var result = data.result;
            //         $sqlBookDataTable.clear().draw();
            //         if (result && result.length > 0) {
            //             $sqlBookDataTable.rows.add(result).draw();
            //         }
            //     })
            // };

            /**
             * 根据sqlId删除sql标签
             * @param  {[type]} id [description]
             * @return {[type]}    [description]
             */
            // function delDbBook(id) {
            //     return app.common.ajaxWithAfa({
            //         url: 'DbManagerAction_delDbBook.do',
            //         data: {
            //             bookId: id
            //         }
            //     }).done(function (data) {
            //         return $.Deferred().resolve(data);
            //     })
            // }

            /**
             * 添加SQL标签
             * @param  {[type]} urlParam [description]
             * @return {[type]}    [description]
             */
            // function addDbBook(urlParam) {
            //     return app.common.ajaxWithAfa({
            //         url: 'DbManagerAction_addDbBook.do',
            //         data: {
            //             dbBook: JSON.stringify(urlParam)
            //         }
            //     }).done(function (data) {
            //         return $.Deferred().resolve(data);
            //     })
            // }

            /**
             * 修改SQL标签
             * @param  {[type]} urlParam [description]
             * @return {[type]}    [description]
             */
            // function updateDbBook(urlParam) {
            //     return app.common.ajaxWithAfa({
            //         url: 'DbManagerAction_updateDbBook.do',
            //         data: {
            //             dbBook: JSON.stringify(urlParam)
            //         }
            //     }).done(function (data) {
            //         return $.Deferred().resolve(data);
            //     })
            // }

            // var $sqlBookDataTable = $('#sqlBookDataTable', $el).DataTable({
            //     'searching': true,
            //     'bPaginate': true, // 开关，是否显示分页器
            //     'bSort': false,
            //     'bAutoWidth': false,
            //     'pageLength': 10,
            //     'columns': [{
            //         data: 'title', defaultContent: '-'
            //     }, {
            //         data: 'executeSql', defaultContent: '-'
            //     }, {
            //         data: null, defaultContent: '-'
            //     }],
            //     'aoColumnDefs': [{
            //         'render': function (data, type, row, meta) {
            //             return '<i class="fa fa-trash"></i>'
            //         },
            //         'targets': 2
            //     }]
            // });
            //
            // // SQL书签事件绑定
            // $('#sqlBookDataTable tbody', $el).on('click', '.fa-trash', function (event) {
            //     event.preventDefault();
            //     var rowData = $sqlBookDataTable.row($(this).closest("tr")).data();
            //     var id = rowData.id;
            //     var dbId = rowData.dbId;
            //     app.confirmDialog({
            //         sTitle: "确认",
            //         sType: "search",
            //         sContent: '确定删除该标签？',
            //         sBtnConfirm: '确定',
            //         sBtnCancel: '取消',
            //         fnConfirmHandler: function () {
            //             delDbBook(id).then(function (data) {
            //                 if (data.result && data.result != "") {
            //                     app.alert('删除成功！');
            //                     getSqlBooks(dbId);
            //                 } else {
            //                     app.alert('删除记录失败！');
            //                 }
            //             })
            //         },
            //         aArgs: []
            //     });
            //     event.stopPropagation();
            // }).on('click', 'tr', function (event) {
            //     event.preventDefault();
            //     var rowData = $sqlBookDataTable.row(this).data();
            //     var executeSql = rowData.executeSql;
            //     $('#addToEditmodal', $el).modal('show');
            //     $('#addToEditmodal', $el).data({
            //         sql: executeSql
            //     });
            //     formSQLBook = rowData;
            // });
        },

        unload: function (handler) {
            $(document).off('keydown.runSqlBtn');
        },

        pause: function ($el, scope, handler) {
            $(document).off('keydown.runSqlBtn');
        },

        resume: function ($el, scope, handler) {
            $(document).off('keydown.runSqlBtn');
        }
    };
});
