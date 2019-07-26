define(["jquery", "handlebars", "codemirror/lib/codemirror", "codemirror/mode/sql/sql", "codemirror/addon/hint/show-hint", "codemirror/addon/hint/sql-hint"], function($, hb, CodeMirror){
    
    var hotkey;
    
    return {
        load: function($el, scope, handler) {

            hotkey = function (e) {
                var a = e.keyCode; 
                if((a == 82)&&(e.ctrlKey)) { 
                    e.preventDefault();
                    $('#runSqlBtn', $el).trigger('click');
                }
            }
            
            $("#defaultRsNum", $el).on("blur", function () {
            	if ($(this).val() === "") {
            		$(this).val(20);
            	}
            })

            var tableTips={};
            var tableObjs={};
            var PASSWORD;
            var formSQLBook;
            var $sqlEdit;
            $sqlEdit = CodeMirror.fromTextArea($('#sqlText', $el)[0], {
                mode:  "text/x-sql",
                readOnly: false,
                styleActiveLine: true,
                lineNumbers:true,
                extraKeys: getExtraKeys(),
            });
            initSQLExcute(scope.text||'');
            
            // setValue
            var $databaseTable = $('#databaseTable', $el).DataTable({
                'searching': true,
                'bPaginate': true, // 开关，是否显示分页器
                'bSort': false,
                'bAutoWidth': false,
                'pageLength':5,
                'columns':[{
                    data: '',defaultContent:''
                },{
                    data: 'project',defaultContent:''
                },{
                    data: 'dbName',defaultContent:''
                },{
                    data: 'dbType',defaultContent:''
                },{
                    data: 'url',defaultContent:''
                }],
                'aoColumnDefs': [{
                    'render':function(data,type,row,meta){
                        return '<i class="fa fa-square-o"></i>'
                    },
                    'targets': 0
                }]
            });

            function initSQLExcute(text) {
                clearResultContent();
                $('#SQLHistoryList', $el).html('<li><span style="flex:1; text-align:center;">无数据</span></li>');
                text = text ||'';
                $sqlEdit.getDoc().setValue(text);
                loadDatabaseTableData();
            }
            /**
             * 加载数据库数据
             * @return {[type]} [description]
             */
            function loadDatabaseTableData() {
                $databaseTable && $databaseTable.clear().draw();
                app.common.ajaxWithAfa({
                    url:'DbManagerAction_getManagers.do'
                }).done(function (data) {
                    $databaseTable.clear();

                    var result = data.result;
                    if(result && result.length > 0){
                        result.forEach(function (item, index) {
                            item.index = index+1;
                        })
                        $databaseTable.rows.add(result).draw();
                    }else {
                    	$databaseTable.rows.add([]).draw();
                    }
                })
            }

            $('#databaseTable', $el).on('click', '.fa', function(event) {
                event.preventDefault();
                if(!$(this).hasClass('fa-check-square')){
                    var $this = $(this);
                    var tr = $('#databaseTable', $el).find('tr.selected');
                    if(tr && tr.length > 0 && PASSWORD){
                        app.confirmDialog({
                            sTitle:"确认",       
                            sType:"search",
                            sContent:'已存在数据库连接,确定切换数据库？',
                            sBtnConfirm: '确定',
                            sBtnCancel: '取消',
                            fnConfirmHandler: function(){
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
                    }else{
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
            }).on('checkChange', function(event, val) {
                $('#SQLHistoryList', $el).html('<li><span style="flex:1; text-align:center;">无数据</span></li>');
                clearResultContent();
                tableTips={};
                if(val){
                    getSqlExecuteHis(val.id);
                    getSqlBooks(val.id);
                }
            }).on('click', 'tr', function(event) {
                event.preventDefault();
                $(this).find('.fa').trigger('click');
            });

            $('#linkDatabase', $el).on('click', function(event) {
                event.preventDefault();
                if($(this).hasClass('linked')){
                    $(this).removeClass('linking linked').find('.linkText').text('连接数据库');
                    PASSWORD = undefined;
                }else{
                   var tr = $('#databaseTable', $el).find('tr.selected');
                   if(tr.length < 1){
                       app.alert('请选择数据库！');
                       return;
                   }
                   $('#passwordSQL', $el).val('');
                   $('#passwordmodal', $el).modal('show');
                   $('#passwordSQL', $el).focus(); 
                }
                
            });

            $('#passwordmodal', $el).on('keyup', '#passwordSQL', function(event) {
                if(event.keyCode == 13){
                    $('#passwordmodal', $el).find('.confirmBtn').trigger('click');
                }
            }).on('click', '.confirmBtn', function(event) {
                event.preventDefault();
                var password = $('#passwordSQL', $el).val();
                if(password == ''){
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
                    if(data.result){
                        $('#linkDatabase', $el).removeClass('linking').addClass('linked').find('.linkText').text('断开数据库连接');
                         app.alert('连接数据库成功');
                         PASSWORD = password;
                         getDbTables(trData.id, password);
                         getSqlExecuteHis(trData.id);
                         getSqlBooks(trData.id);
                         formSQLBook = null;
                    }else{
                        $('#linkDatabase', $el).removeClass('linking linked');
                        app.alert('连接数据库失败，请检查相关信息。');
                    }
                });
            });

            function test(urlParam, password) {
                return app.common.ajaxWithAfa({
                    url:'DbManagerAction_testConnection.do',
                    data:{
                        manager: JSON.stringify(urlParam),
                        passwd: urlParam.password
                    }
                }).done(function (data) {
                    return $.Deferred().resolve(data);
                })
            }

            function getDbTables(id, password) {
                app.common.ajaxWithAfa({
                    url:'DbManagerAction_getDbTables.do',
                    data:{
                        id: id,
                        passwd: password
                    }
                }).done(function (data) {
                    if(data.result && data.result.length > 0){
                        data.result.forEach(function (item) {
                            tableTips[item] = [];
                        })
                    }else{
                        tableTips = {};
                    }
                })
            }

            $(document).on('keydown.runSqlBtn', function(e){
                hotkey(e);
            });
            
            //SQL运行按钮点击事件
            $('#runSqlBtn', $el).on('click', function(event) {
                event.preventDefault();
                var $self = $(this);
                if($self.find('i').hasClass('fa-spinner')){
                    return;
                }
                var tr = $('#databaseTable', $el).find('tr.selected');
                if(tr.length < 1){
                    app.alert('请选择数据库！');
                    return;
                }
                var id = $databaseTable.row(tr).data().id;
                var selectionObj = window.getSelection();
                var selectedText = selectionObj.toString();
                var sqlText = '';
                if(selectedText){
                    sqlText = selectedText;
                }else{
                    sqlText = $.trim($sqlEdit.getDoc().getValue());
                }

                if(sqlText == ''){
                    app.alert('请填写SQL！');
                    return;
                }
                if(!PASSWORD){
                    app.alert('请先连接数据库');
                    return;
                }
                if(verificationSql(sqlText)){
                    app.alert('sql语句不能包含update／delete／create／drop关键字 ');
                    return;
                }
                $self.find('i').toggleClass('fa-spinner fa-spin');
                clearResultContent();
                executeSQl(id, sqlText).then(function (data) {
                    if(data.result && data.result.length > 0){
                        initContent(data.result);
                        $('#runSqlResult', $el).show();
                    }else{
                        app.alert("无满足条件记录");
                    }
                    $self.find('i').removeClass('fa-spinner fa-spin');
                    getSqlExecuteHis(id);
                }, function () {
                    $self.find('i').removeClass('fa-spinner fa-spin');
                })
            });
            
            //保存按钮点击事件
            $('#saveSqlBtn', $el).on('click', function(event) {
            		event.preventDefault();
                var tr = $('#databaseTable', $el).find('tr.selected');
                if(tr.length < 1){
                    app.alert('请选择数据库！');
                    return;
                }
                var sqlText = $.trim($sqlEdit.getDoc().getValue());
                if(sqlText == ''){
                    app.alert('请填写SQL！');
                    return;
                }
                if(!PASSWORD){
                    app.alert('请先连接数据库');
                    return;
                }
                if(verificationSql(sqlText)){
                    app.alert('sql语句不能包含update／delete／create／drop关键字');
                    return;
                }
                if(!formSQLBook){
	                	$('#title', $el).val('');
	                	$('#dbBookModal', $el).modal('show');
	                	$('#title', $el).focus(); 
                }else{
                		var urlParam = formSQLBook;
                		urlParam.executeSql = sqlText;
                		updateDbBook(urlParam).then(function (data) {
                			if(data.result){
                				app.alert('修改成功！');
                				getSqlBooks(urlParam.dbId);
                			}else{
                				app.alert('修改失败！');
                			}
                    })
                }
                
            });
            
            //另存为按钮点击事件
            $('#saveAsBtn', $el).on('click', function(event) {
            	    event.preventDefault();
                var tr = $('#databaseTable', $el).find('tr.selected');
                if(tr.length < 1){
                    app.alert('请选择数据库！');
                    return;
                }
                var sqlText = $.trim($sqlEdit.getDoc().getValue());

                if(sqlText == ''){
                    app.alert('请填写SQL！');
                    return;
                }
                if(!PASSWORD){
                    app.alert('请先连接数据库');
                    return;
                }
                if(verificationSql(sqlText)){
                    app.alert('sql语句不能包含update／delete／create／drop关键字');
                    return;
                }
                $('#title', $el).val('');
                $('#dbBookModal', $el).modal('show');
                $('#title', $el).focus(); 
            });
            
            $('#dbBookModal', $el).on('keyup', '#title', function(event) {
                if(event.keyCode == 13){
                    $('#dbBookModal', $el).find('.confirmBtn').trigger('click');
                }
            }).on('click', '.confirmBtn', function(event) {
                event.preventDefault();
                var title = $('#title', $el).val();
                if(title == ''){
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
                addDbBook(urlParam).then(function (data) {
                		if(data.result){
						app.alert('添加成功！');
						getSqlBooks(urlParam.dbId);
					}else{
						app.alert('添加失败！');
					}
					$serverModal.modal('hide');	
                })
            });
            
            function verificationSql(sql) {
                return /(delete)|(update)|(create)|(drop)/gim.test(sql);
            }

            $('#runSqlResultTab', $el).on('click', '.exportExecuteData', function(event) {
                event.preventDefault();
                var tr = $('#databaseTable', $el).find('tr.selected');
                var id = $databaseTable.row(tr).data().id;
                var sqlText = $(this).siblings('.sql').text().trim();
                $.ajaxDownload('DbManagerAction_downExcel.do',{
                    id: id,
                    sql:sqlText,
                    passwd: PASSWORD
                });
            });
            
            $('#runSqlResultTab', $el).on('click', '.exportInsertExecuteData', function(event) {
                event.preventDefault();
                var tr = $('#databaseTable', $el).find('tr.selected');
                var id = $databaseTable.row(tr).data().id;
                var sqlText = $(this).siblings('.sql').text().trim();
                $.ajaxDownload('DbManagerAction_downInsert.do',{
                    id: id,
                    sql:sqlText,
                    passwd: PASSWORD
                });
            });

            function initContent(list) {
                var index = 0;
                var liString ='';
                var cntentString ='';
                if(list && list.length > 0){
                    list.forEach(function (item, index) {
                        index = index+1;
                        liString = '<li><a href="#sqlExecuteRes'+index+'" data-toggle="tab">结果'+index+'</a></li>';
                        cntentString = '<div id="sqlExecuteRes'+index+'" class="tab-pane">'+
                                            '<p class="title" style="position: absolute; margin: 0; height: 25px;line-height: 25px; padding-left: 10px;width: calc(100% - 80px);box-sizing: border-box;margin-top: -5px;display: flex;justify-content: space-between;">'+
                                                '<span class="sql" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;flex: auto;" title="'+ item.sql +'">'+item.sql+'</span>'+
                                                '<span style="font-size: 12px;font-weight: normal;margin-left: 20px;white-space: nowrap;flex: none;">共匹配到 <i class="total" >'+item.total+'</i> 条记录，耗时 <i class="duration">'+item.duration+'ms</i></span>'+
                                                '<button type="button" class="confirmBtn pull-right exportExecuteData" style="line-height: 25px;height: 25px;flex:none;margin-left:20px;"><i class="fa fa-download"></i>导出excel</button>'+
                                                '<button type="button" class="confirmBtn pull-right exportInsertExecuteData" style="line-height: 25px;height: 25px;flex:none;margin-left:4px;"><i class="fa fa-download"></i>导出Insert SQL</button>'+
                                            '</p>'+
                                            '<div style="width: 100%; overflow: auto;margin-top: 30px;">'+
                                                '<table id="sqlResultTable'+index+'" class="display dataTable table" style="user-select: text; cursor: text">'+
                                                    '<thead>'+
                                                        '<tr><th style="text-align: center;">无满足条件的记录</th></tr>'+
                                                    '</thead>'+
                                                    '<tbody></tbody>'+
                                               ' </table>'+
                                            '</div>'+
                                        '</div>';
                        $('#runSqlResultUl', $el).append(liString);
                        $('#runSqlResultTab', $el).append(cntentString);
                        if(item.queryResult.length > 0){
                          createTable('sqlResultTable'+index, item.queryResult, item.columes);  
                        }
                        
                    })
                    $('#runSqlResultUl li:eq(0)>a', $el).trigger('click');
                }
            }

            function createTable(tableId, list, columes) {
                var trHtml = '';
                var coloum = [];
                for(var i=0; i<columes.length; i++){
                		trHtml +='<th>'+columes[i]+'</th>'
                		coloum.push({
                          data:columes[i],
                          defaultContent:''
                     })
                }
                $('#'+tableId+' thead>tr', $el).html(trHtml);

                $sqlResultTable = $('#'+tableId, $el).DataTable({
                    'searching': false,
                    'bPaginate': true, // 开关，是否显示分页器
                    'bSort': false,
                    'bAutoWidth': false,
                    'bpageLength':5,
                    'columns':coloum
                });
                $sqlResultTable.rows.add(list).draw();
                tableObjs[tableId] = $sqlResultTable;
            }

            function clearResultContent() {
                if(tableObjs && !$.isEmptyObject(tableObjs)){
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
            function executeSQl(id,sql) {
            	var defaultRsNum = parseInt($("#defaultRsNum", $el).val());
                return app.common.ajaxWithAfa({
                    url:'DbManagerAction_executeSQL.do',
                    data:{
                        id:id,
                        sql:sql,
                        passwd:PASSWORD,
                        defaultRsNum: defaultRsNum
                    }
                }).done(function (data) {
                    return $.Deferred().resolve(data);
                })
            }

            /**
             * 根据数据库ID查询sql执行历史
             * @param  {[type]} id [description]
             * @return {[type]}    [description]
             */
            function getSqlExecuteHis(id) {
                app.common.ajaxWithAfa({
                    url:'DbManagerAction_getExecuteHis.do',
                    data:{
                        id:id
                    }
                }).done(function (data) {
                    var result = data.result;
                    $sqlHisDataTable.clear().draw();
                    if(result && result.length > 0){
                        $sqlHisDataTable.rows.add(result).draw();
                    }
                })
            }

            /**
             * 根据sqlId删除sql历史
             * @param  {[type]} id [description]
             * @return {[type]}    [description]
             */
            function delSQLExecuteHis(id) {
                return app.common.ajaxWithAfa({
                    url:'DbManagerAction_delExecuteHis.do',
                    data:{
                        id:id
                    }
                }).done(function (data) {
                    return $.Deferred().resolve(data);
                })
            }
            /**
             * 删除所有的sql历史
             * @param  {[type]} id [description]
             * @return {[type]}    [description]
             */
            function delAllSQLExecuteHis(id) {
                return app.common.ajaxWithAfa({
                    url:'DbManagerAction_delAllExecuteHis.do',
                    data:{
                        id:id
                    }
                }).done(function (data) {
                    return $.Deferred().resolve(data);
                })
            }
            
            //清空SQL历史按钮点击事件
            $('#SQLHisAllCleanBtn', $el).on('click', function(event) {
            	    event.preventDefault();
            	    var tr = $('#databaseTable', $el).find('tr.selected');
                if(tr.length < 1){
                    app.alert('请选择数据库！');
                    return;
                }
                if(!PASSWORD){
                    app.alert('请先连接数据库');
                    return;
                }
                var dbId = $databaseTable.row(tr).data().id;
                app.confirmDialog({
                    sTitle:"确认",       
                    sType:"search",
                    sContent:'确定清空SQL历史记录？',
                    sBtnConfirm: '确定',
                    sBtnCancel: '取消',
                    fnConfirmHandler: function(){
                    		delAllSQLExecuteHis(dbId).then(function (data) {
                            if(data.result && data.result != ""){
                                app.alert('删除成功！');
                                getSqlExecuteHis(dbId);
                            }else{
                                app.alert('删除记录失败！');
                            }
                        })
                    },
                    aArgs: []
                });
            });
            
            // SQL历史事件绑定
            $('#sqlHisDataTable tbody', $el).on('click', '.fa-trash', function(event) {
                event.preventDefault();
                var rowData = $sqlHisDataTable.row($(this).closest("tr")).data();
                var id = rowData.id;
                var dbId = rowData.dbId;
                app.confirmDialog({
                    sTitle:"确认",       
                    sType:"search",
                    sContent:'确定删除该条SQL记录？',
                    sBtnConfirm: '确定',
                    sBtnCancel: '取消',
                    fnConfirmHandler: function(){
                        delSQLExecuteHis(id).then(function (data) {
                            if(data.result && data.result != ""){
                                app.alert('删除成功！');
                                getSqlExecuteHis(dbId);
                            }else{
                                app.alert('删除记录失败！');
                            }
                        })
                    },
                    aArgs: []
                });
                event.stopPropagation();
            }).on('click', 'tr', function(event) {
                event.preventDefault();
                var rowData = $sqlHisDataTable.row(this).data();
                var executeSql = rowData.executeSql;
                $('#addToEditmodal', $el).modal('show');
                $('#addToEditmodal', $el).data({
                    sql:executeSql
                })
            });

            $('#addToEditmodal', $el).on('click', '.cancel', function(event) {
                event.preventDefault();
                var sql = $('#addToEditmodal', $el).data().sql;
                var text = $.trim($sqlEdit.getDoc().getValue());
                if(text !=''){
                    $sqlEdit.getDoc().setValue(text+'\n\n'+sql);
                }else{
                   $sqlEdit.getDoc().setValue(sql);
                }
                $('#addToEditmodal', $el).modal('hide');
                $('#SQLTab li:eq(0)>a', $el).click();
                $sqlEdit.refresh();
            }).on('click', '.confirmBtn', function(event) {
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
                if (!pred || pred()) setTimeout(function() {
                    if (!cm.state.completionActive){
                        cm.showHint({
                            completeSingle: false,
                            tables:tableTips
                        });
                    }
                }, 100);
                return CodeMirror.Pass;
            }

            function getExtraKeys() {
                return {
                    "'a'":completeAfter,
                    "'A'":completeAfter,
                    "'b'":completeAfter,
                    "'B'":completeAfter,
                    "'c'":completeAfter,
                    "'C'":completeAfter,
                    "'d'":completeAfter,
                    "'D'":completeAfter,
                    "'e'":completeAfter,
                    "'E'":completeAfter,
                    "'f'":completeAfter,
                    "'F'":completeAfter,
                    "'g'":completeAfter,
                    "'G'":completeAfter,
                    "'h'":completeAfter,
                    "'H'":completeAfter,
                    "'i'":completeAfter,
                    "'I'":completeAfter,
                    "'g'":completeAfter,
                    "'G'":completeAfter,
                    "'k'":completeAfter,
                    "'K'":completeAfter,
                    "'l'":completeAfter,
                    "'L'":completeAfter,
                    "'m'":completeAfter,
                    "'M'":completeAfter,
                    "'n'":completeAfter,
                    "'N'":completeAfter,
                    "'o'":completeAfter,
                    "'O'":completeAfter,
                    "'p'":completeAfter,
                    "'P'":completeAfter,
                    "'q'":completeAfter,
                    "'Q'":completeAfter,
                    "'r'":completeAfter,
                    "'R'":completeAfter,
                    "'s'":completeAfter,
                    "'S'":completeAfter,
                    "'t'":completeAfter,
                    "'T'":completeAfter,
                    "'u'":completeAfter,
                    "'U'":completeAfter,
                    "'v'":completeAfter,
                    "'V'":completeAfter,
                    "'w'":completeAfter,
                    "'W'":completeAfter,
                    "'x'":completeAfter,
                    "'X'":completeAfter,
                    "'y'":completeAfter,
                    "'Y":completeAfter,
                    "'z'":completeAfter,
                    "'Z'":completeAfter,
                    "'.'":completeAfter,
                    "'_'":completeAfter,
                    "'-'":completeAfter,
                    "' '":completeAfter,
                    // "Ctrl": "autocomplete",
                    // "Cmd": "autocomplete"
                };
            }

            var $sqlHisDataTable = $('#sqlHisDataTable', $el).DataTable({
                'searching': true,
                'bPaginate': true, // 开关，是否显示分页器
                'bSort': false,
                'bAutoWidth': false,
                'pageLength': 10,
                'columns':[{
                    data: 'executeSql',defaultContent:'-'
                },{
                    data: 'times',defaultContent:'-'
                },{
                    data: 'lastExecuteTime',defaultContent:'-'
                },{
                    data: null ,defaultContent:'-'
                }],
                'aoColumnDefs': [{
                    'render':function(data,type,row,meta){
                        return '<i class="fa fa-trash"></i>'
                    },
                    'targets': 3
                }]
            });
            
            /**
             * 根据数据库ID查询sql书签
             * @param  {[long]} id [数据库连接ID]
             * @return {[type]}    [description]
             */
            function getSqlBooks(id) {
                app.common.ajaxWithAfa({
                    url:'DbManagerAction_getDbBooks.do',
                    data:{
                        id:id
                    }
                }).done(function (data) {
                    var result = data.result;
                    $sqlBookDataTable.clear().draw();
                    if(result && result.length > 0){
                        $sqlBookDataTable.rows.add(result).draw();
                    }
                })
            };
            
            /**
             * 根据sqlId删除sql标签
             * @param  {[type]} id [description]
             * @return {[type]}    [description]
             */
            function delDbBook(id) {
                return app.common.ajaxWithAfa({
                    url:'DbManagerAction_delDbBook.do',
                    data:{
                    		bookId:id
                    }
                }).done(function (data) {
                    return $.Deferred().resolve(data);
                })
            }
            
            /**
             * 添加SQL标签
             * @param  {[type]} urlParam [description]
             * @return {[type]}    [description]
             */
            function addDbBook(urlParam) {
                return app.common.ajaxWithAfa({
                    url:'DbManagerAction_addDbBook.do',
                    data:{
                    		dbBook: JSON.stringify(urlParam)
                    }
                }).done(function (data) {
                    return $.Deferred().resolve(data);
                })
            }
            /**
             * 修改SQL标签
             * @param  {[type]} urlParam [description]
             * @return {[type]}    [description]
             */
            function updateDbBook(urlParam) {
                return app.common.ajaxWithAfa({
                    url:'DbManagerAction_updateDbBook.do',
                    data:{
                    		dbBook: JSON.stringify(urlParam)
                    }
                }).done(function (data) {
                    return $.Deferred().resolve(data);
                })
            }
            
            var $sqlBookDataTable = $('#sqlBookDataTable', $el).DataTable({
                'searching': true,
                'bPaginate': true, // 开关，是否显示分页器
                'bSort': false,
                'bAutoWidth': false,
                'pageLength': 10,
                'columns':[{
                    data: 'title',defaultContent:'-'
                },{
                    data: 'executeSql',defaultContent:'-'
                },{
                    data: null ,defaultContent:'-'
                }],
                'aoColumnDefs': [{
                    'render':function(data,type,row,meta){
                        return '<i class="fa fa-trash"></i>'
                    },
                    'targets': 2	
                }]
            });
            
            // SQL书签事件绑定
            $('#sqlBookDataTable tbody', $el).on('click', '.fa-trash', function(event) {
                event.preventDefault();
                var rowData = $sqlBookDataTable.row($(this).closest("tr")).data();
                var id = rowData.id;
                var dbId = rowData.dbId;
                app.confirmDialog({
                    sTitle:"确认",       
                    sType:"search",
                    sContent:'确定删除该标签？',
                    sBtnConfirm: '确定',
                    sBtnCancel: '取消',
                    fnConfirmHandler: function(){
                    		delDbBook(id).then(function (data) {
                            if(data.result && data.result != ""){
                                app.alert('删除成功！');
                                getSqlBooks(dbId);
                            }else{
                                app.alert('删除记录失败！');
                            }
                        })
                    },
                    aArgs: []
                });
                event.stopPropagation();
            }).on('click', 'tr', function(event) {
                event.preventDefault();
                var rowData = $sqlBookDataTable.row(this).data();
                var executeSql = rowData.executeSql;
                $('#addToEditmodal', $el).modal('show');
                $('#addToEditmodal', $el).data({
                    sql:executeSql
                });
                formSQLBook = rowData;
            });
        },

        unload: function(handler) {
        		$(document).off('keydown.runSqlBtn');
        },

        pause: function($el, scope, handler) {
            $(document).off('keydown.runSqlBtn');
        },

        resume: function($el, scope, handler) {
            $(document).off('keydown.runSqlBtn');
        }
    };
});
