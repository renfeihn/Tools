define(["jquery", "echarts"], function ($, echarts) {


    return {
        load: function ($el, scope, handler) {

            // 公共参数
            var instanceInfo = {};
            var instanceIds;
            var instanceIp;
            // 点击编辑后台返回的历史ID
            var fileHistId;
            // 操作历史dataTable配置
            var PATH = '';
            var $dataTable = $("#dataTable_data", $el).DataTable({
                'bPaginate': true, // 开关，是否显示分页器
                'pagingType': 'full_numbers',
                'bStateSave': false,
                'bSort': false,// 排序
                'searching': false,  // 搜索框是否显示
                'pageLength': 10,// 设置表格分页长度
                'columns': [{
                    data: 'index',// 序号
                }, {
                    data: 'cateId', defaultContent: '-'
                }, {
                    data: 'objectId', defaultContent: '-'
                }, {
                    data: 'nodePath', defaultContent: '-'
                }, {
                    data: 'nodeName', defaultContent: '-'
                }, {
                    data: 'createBy', defaultContent: '-'
                }, {
                    data: 'remark', defaultContent: '-'
                }, {
                    data: 'createTime', defaultContent: '-'
                }, {
                    data: 'state', defaultContent: '-'
                }, {
                    data: 'content', defaultContent: '-'
                }, {
                    data: 'contentPrev', defaultContent: '-'
                }, {
                    data: 'rev', defaultContent: '-'
                }],

                'aoColumnDefs': [
                    {
                        'render': function (data, type, row, meta) {
                            if (data == "1") {
                                return '编辑中';
                            } else if (data == "2") {
                                return '已取消';

                            } else if (data == "3") {
                                return '修改成功';

                            } else if (data == "4") {
                                return '修改失败';

                            } else if (data == "5") {
                                return '已还原';

                            }
                            // if (data == "1") {
                            //     return '<span class="AFAInfoDetails-succ" ><i class="fa fa-circle"  style="color:#22AC38;font-size: 12px;"></i>成功</span>';// 成功
                            // } else {
                            //     return '<span class="AFAInfoDetails-succ" ><i class="fa fa-circle"  style="color:#FF3341;font-size: 12px;"></i>失败</span>';// 失败
                            // }
                        },
                        'targets': 8
                    },
                    {
                        'render': function (data, type, row, meta) {
                            if (row.state == '3') {
                                return '回退';
                            }
                        },
                        'targets': 11
                    }

                ]

            });
            // 实例的基础配置信息表格
            // var $dataTableBase = $("#dataTable_base", $el).DataTable({
            //     'bPaginate': false, // 开关，是否显示分页器
            //     'pagingType': 'full_numbers',
            //     'bStateSave': false,
            //     'bSort': false,// 排序
            //     'searching': false,  // 搜索框是否显示
            //     'pageLength': 20,// 设置表格分页长度
            //     'columns': [{
            //         data: 'index',// 序号
            //     }, {
            //         data: '1', defaultContent: '-'	// 名称
            //     }, {
            //         data: '2', defaultContent: '-'
            //     }, {
            //         data: '3', defaultContent: '-'
            //     }, {
            //         data: '4', defaultContent: '-'
            //     }],
            //     'aoColumnDefs': [   //配置每一列
            //         {
            //             "render": function (data, type, row, meta) {
            //                 switch (data) {
            //                     case 0:
            //                         return '<i class="fa fa-cog fa-fw" aria-hidden="true"></i>&nbsp;未启动'
            //                         break;
            //                     case 1:
            //                         return '<i class="fa fa-cog fa-fw fa-spin" aria-hidden="true"></i>&nbsp;已启动'
            //                         break;
            //                     default:
            //                         break;
            //                 }
            //             },
            //             "targets": 4
            //         },
            //     ],
            //
            // });


            // 加载多级分类数据
            let catesMap = {};
            getCatesMap();
            function getCatesMap() {
                app.common.ajaxWithAfa({
                    url: 'EventListAction_getObjectCategory.do',
                    data: {},
                }).then(function (data) {
                    var cates = data.objectCate;
                    cates.forEach(item => {
                        if (!catesMap[item.levelOneName]) {
                            catesMap[item.levelOneName] = {};
                        }
                        let cate1 = item.levelOneName;
                        let cate2 = item.levelTwoName;
                        let cate3 = item.levelThreeName;
                        if (!catesMap[item.levelOneName][cate2]) {
                            catesMap[item.levelOneName][cate2] = {};
                        }
                        if (!catesMap[item.levelOneName][cate2][cate3]) {
                            catesMap[item.levelOneName][cate2][cate3] = item.categoryId;
                        }
                    });

                    selectorBindEvent();

                    renderCateSelector();
                });
            };

            function renderCateSelector() {
                let option1 = '';
                for (let i in catesMap) {
                    option1 += `<option value="${i}">${i}</option>`;
                }
                $('#cate1_selector', $el).html(option1).val('软件').trigger('change');

                $('#cate2_selector', $el).html();
                $('#cate3_selector', $el).html();
            };

            // 级联绑定事件
            function selectorBindEvent() {
                $('#cate1_selector', $el).on('change', function () {
                    $('#cate2_selector', $el).html('');
                    $('#cate3_selector', $el).html('');
                    let val = $(this).find('option:selected').text();
                    let cate2 = catesMap[val];
                    let cate2Option = '';
                    for (let i in cate2) {
                        cate2Option += `<option value="${i}">${i}</option>`;
                    }
                    $('#cate2_selector', $el).html(cate2Option).trigger('change');
                });
                $('#cate2_selector', $el).on('change', function () {
                    $('#cate3_selector', $el).html('');
                    let cate1 = $('#cate1_selector', $el).find('option:selected').text();
                    let val = $(this).find('option:selected').text();
                    let cate3 = catesMap[cate1][val];
                    let cate3Option = '';
                    for (let i in cate3) {
                        cate3Option += `<option value="${cate3[i]}">${i}</option>`;
                    }
                    $('#cate3_selector', $el).html(cate3Option).trigger('change');
                });
                $('#cate3_selector', $el).on('change', async function () {
                    let id = $(this).val();
                    getObjByCate();
                });
            };

            // 选择三级分类获取实例
            function getObjByCate() {
                app.common.ajaxWithAfa({
                    url: 'AppConfigAction_getThirdCategoryObjects.do',
                    data: {
                        levelOneName: $('#cate1_selector', $el).find('option:selected').text(),
                        levelTwoName: $('#cate2_selector', $el).find('option:selected').text(),
                        levelThreeName: $('#cate3_selector', $el).find('option:selected').text()
                    },
                }).then(function (content) {
                    var list = content.cate3Objects;
                    $('#instanceUlId').empty();
                    if (null != list && list.length > 0) {
                        list.forEach(function (item, index) {
                            // console.log('实例： '+JSON.stringify(item));
                            var id = item.objectSummary.categoryId + '_' + item.objectSummary.objectId;
                            $('#instanceUlId').append('<li id="' + id + '">' + item.objectSummary.objectName + '</li>');
                        })
                    }
                });
            };

            // 根据选择软件类型 获取配置列表 生成树
            // $('#softwareId', $el).on('change', function () {
            //     var type = this.value;
            //     getFilePath();
            // });
            // 插入表格数据
            // loadTableData("history");

            // 选择ABS列表或者选择AFA列表
            // $('input[type="radio"]', $el).on('change', function (e) {
            //     var val = $('input[type="radio"]:checked', $el).val();
            //     if (val == 'ABS') {
            //         $('#fileUl', $el).removeClass('hide').siblings('ul').addClass('hide');
            //         $('#title', $el).text("ABS文件管理");
            //     } else if (val == "AFA") {
            //         $('#fileUl', $el).addClass('hide').siblings('ul').removeClass('hide');
            //         $('#title', $el).text("AFA文件管理");
            //     }
            //     //去掉已选实例
            //     $('.checkedBox', $el).find('li').each(function () {
            //         if ($(this).text().indexOf(val) == -1) {
            //             $('.checkedBox', $el).empty();
            //             $('#showModal>span', $el).text('(' + $('.checkedBox>li', $el).length + ')');
            //         }
            //     });
            //     $('.textContainer', $el).empty();
            //     getFilePath();
            //
            // });


            // 点击实例弹出文件树
            $('#instanceUlId', $el).on('click', 'li', function () {
                instanceIds = $(this).attr('id');
                var ids = instanceIds.split('_');
                app.common.ajaxWithAfa({
                    url: 'CmdbConfigManagerAction_getObjInfo.do',
                    data: {
                        conf_id: ids[0],
                        objId: ids[1]
                    }
                }).then(function (data) {
                    instanceInfo = data.funs;
                    // console.log('instanceInfo: ' + JSON.stringify(instanceInfo));

                    instanceIp = instanceInfo.service_ip;
                    // console.log('instanceIp: ' + instanceIp);

                    var checkedIns = '<li class="checkedIns on">' + instanceIp + '</li>';
                    // for (var i = 0, length = instance_arr.length; i < length; i++) {
                    //     checkedIns += '<li class="checkedIns">' + instance_arr[i][1] + '<i class="fa fa-remove removeIns"></i></li>'
                    // }
                    // $('#showModal>span', $el).text('(' + instance_arr.length + ')');
                    // console.log(checkedIns);
                    $('#slides', $el).removeClass('hide').find('.checkedBox').html(checkedIns);
                });

                // console.log($(this).text());
                // console.log($('#cate3_selector', $el).find('option:selected').text());
                getFilePath($('#cate3_selector', $el).find('option:selected').text());
            });
            //
            // //操作方式选择
            // var opType = '';
            // $('#op_type', $el).click(function () {
            //     $(this).find('span').toggleClass('hide');
            // });
            // $('#op_type', $el).mouseleave(function () {
            //     $(this).find('span').addClass('hide');
            // });
            // $('#op_type>span', $el).click(function () {
            //     var text = $(this).text();
            //     $('#op_type', $el).removeClass('btn-tip');
            //     $('#operts', $el).text(text);
            //     if (text == '单独操作') {
            //         opType = 'singleOP';
            //     } else if (text == '批量操作') {
            //         opType = 'totalOP';
            //     }
            // });

            //打开实例窗口
            // $("#showModal", $el).click(function () {
            //     var treeType = $('.ztree:not(.hide)', $el).attr('data-type');
            //     $('#myModalLabel').text(treeType + '实例列表');
            //     if (opType == 'totalOP') {
            //         $('#isChangeAll', $el).css('visibility', 'visible');
            //     } else if (opType == 'singleOP') {
            //         $('#isChangeAll', $el).css('visibility', 'hidden');
            //     } else {
            //         app.alert('请选择操作方式');
            //         return;
            //     }
            //
            //     $("#modal", $el).modal('show');
            //
            //     var $isChangeAll = $("#isChangeAll", $el);
            //     var val = $('input[type="radio"]:checked', $el).val();
            //     if (val.indexOf('ABS') >= 0) {
            //         var options = {
            //             'appType': 'APP_AB3',
            //             'target': 'ABS_ServInstList',
            //             'args': JSON.stringify({
            //                 'platform_name': 'ABS'
            //             })
            //         };
            //         // loadTableData("baseConfig",options);
            //         getServerTable();
            //     } else if (val.indexOf('AFA') >= 0) {
            //         var options = {
            //             'appType': 'APP_AB3',
            //             'target': 'ABS_ServInstList',
            //             'args': JSON.stringify({
            //                 'platform_name': 'AFA'
            //             })
            //         };
            //         // loadTableData("baseConfig",options);
            //         getServerTable();
            //     }
            //     if ($isChangeAll.hasClass("fa-check")) {
            //         $isChangeAll.removeClass('fa-check');
            //     };
            //
            // });


            //表格实例选择
            $('#dataTable_data tbody', $el).on('click', 'i', function (e) {
                var $that = $(this, $el);
                if ($that.hasClass("fa-check")) {
                    $that.removeClass("fa-check");
                } else {
                    $that.addClass("fa-check");
                }
            });

            // 选择实例弹窗
            // $("#confmBtn", $el).on("click", function () {
            //     var selected = $("#dataTable_base tbody .fa-check", $el),
            //         ParentSelect = selected.parent().parent(),
            //         instance_arr = [],
            //         instance_name = [];
            //     ParentSelect.each(function () {
            //         var $t = $(this, $el);
            //         var tr = $dataTableBase.row($t).data();
            //         instance_name.push(tr[3]);
            //         // console.log(instance_name);
            //         instance_arr.push(tr);
            //     });
            //     if (instance_arr.length > 0) {
            //         $('#showModal', $el).removeClass('btn-tip');
            //     }
            //
            //     //选中实例标签
            //     var checkedIns = '';
            //     for (var i = 0, length = instance_arr.length; i < length; i++) {
            //         checkedIns += '<li class="checkedIns">' + instance_arr[i][1] + '<i class="fa fa-remove removeIns"></i></li>'
            //     }
            //     // $('#showModal>span', $el).text('(' + instance_arr.length + ')');
            //     $('#slides', $el).removeClass('hide').find('.checkedBox').html(checkedIns);
            //
            //     //控制分页按钮显隐
            //     var ulWidth = parseInt($('.checkedBox', $el).css('width')),
            //         boxWidth = parseInt($('.slideBox', $el).css('width'));
            //     if (ulWidth > boxWidth) {
            //         $('#slideToLeft,#slideToRight', $el).removeClass('hide');
            //     }
            //
            //     var val = $("input[type='radio']:checked", $el).val();
            //
            //     $("#showModal", $el).data('instance', instance_arr);
            //     $("#showModal", $el).data('instname', instance_name);
            //
            //     var treeObj = $.fn.zTree.getZTreeObj("fileUl");
            //
            //
            //     // if (val == "ABS") {
            //     //     var treeObj = $.fn.zTree.getZTreeObj("fileUl");
            //     // } else {
            //     //     var treeObj = $.fn.zTree.getZTreeObj("fileAFA");
            //     // }
            //     var sNodes = treeObj.getSelectedNodes();
            //
            //     $('.slideBox .checkedBox>li:first-child', $el).trigger('click');
            // });


            // 批量管理按钮置
            // canUse();
            // function canUse() {
            //     var len = $('#dataTable_base tbody i.fa-check', $el).length,
            //         $confmBtn = $("#confmBtn", $el);
            //     if (len > 0) {
            //         // 将批量关系按钮置为可用
            //         $confmBtn.attr("data-dismiss", "modal");
            //         $confmBtn.removeClass("disabled");
            //         $confmBtn.addClass("confmBtn");
            //     } else {
            //         // 将批量关系按钮置为不可用
            //         $confmBtn.attr("data-dismiss", "no");
            //         $confmBtn.addClass("disabled");
            //         $confmBtn.removeClass("confmBtn");
            //     }
            //
            // }


            //
            // // 全选按钮是否选中
            // function isAll() {
            //     var len = $('#dataTable_base tbody i:not(".fa-check")', $el).length;
            //     if (len > 0) {
            //         $('.all-select', $el).removeClass('fa-check');
            //     } else {
            //         $('.all-select', $el).addClass('fa-check');
            //     }
            // }

            //已选实例窗口操作
            //左滑
            $('#slideToLeft', $el).on('click', function () {
                var ulOffset = $('.checkedBox', $el).offset().left,
                    boxOffset = $('.slideBox', $el).offset().left;
                if ((ulOffset - boxOffset) != 0) {
                    $('.checkedBox', $el).offset({
                        left: ulOffset + 500
                    });
                }
            });

            //右滑
            $('#slideToRight', $el).on('click', function () {
                var ulOffset = $('.checkedBox', $el).offset().left,
                    boxOffset = $('.slideBox', $el).offset().left;
                $('.checkedBox', $el).offset({
                    left: ulOffset - 500
                });

            });


            //点击编辑
            var saveLog;
            $("#editBtn", $el).click(function () {

                if ($('.checkedBox li', $el).length == 0) {
                    app.alert('当前无可编辑的文件');
                    return;
                }

                var logId = $('.checkedIns.on', $el).text(),
                    logContent = $('#log_' + strConv(logId), $el).text();

                // console.log(logContent);
                if (!logContent || logContent == '') {
                    app.alert('当前无可编辑的文件');
                }

                var $curr_tree = $('.ztree:not(.hide)', $el);
                var fileName = curr_file = $('a.curSelectedNode', $curr_tree).attr('title');

                // 请求后台服务判断是否可以修改
                $.ajax({
                    async: true,
                    type: "POST",
                    url: 'ToolsetAction_editFile.do',
                    dataType: "json",
                    shelter: '正在登录服务器，请稍候…',
                    data: {
                        'instanceIds': instanceIds,
                        'fromPath': getTreeFileAllPath(),
                        'fileName': fileName,
                        'content': logContent
                    },
                    success: function (data) {
                        var datas = data.content;
                        // console.log(datas);
                        if (datas && datas != '') {
                            result = datas.result;
                            if (result.state == 1) {
                                // 当前页面存放保存的hist id： result.msg
                                fileHistId = result.msg;
                                //操作方式控制
                                $('#log_' + strConv(logId), $el).replaceWith('<textarea class="textBox" id="fileInfos_' + strConv(logId) + '">' + logContent + '</textarea>');

                                if (window.sessionStorage) {
                                    window.sessionStorage.setItem('info', logContent);
                                } else {
                                    saveLog = logContent;
                                }

                                if (!logContent || logContent == '') {
                                    app.alert('当前无可编辑的文件');
                                }

                                $('.singleAbc-codeButton', $el).removeClass('hide');
                            } else {
                                app.alert(result.msg);
                                return;
                            }
                        }
                    }

                });

            });


            //取消编辑
            $('#cancelBtn', $el).click(function () {
                // 请求后台服务取消修改
                $.ajax({
                    async: true,
                    type: "POST",
                    url: 'ToolsetAction_cancelEditFile.do',
                    dataType: "json",
                    shelter: '正在请求服务器，请稍候…',
                    data: {
                        'fileHistId': fileHistId
                    },
                    success: function (data) {
                        var datas = data.content;
                        // console.log(datas);
                        if (datas && datas != '') {
                            result = datas.result;
                            if (result.state == 1) {
                                // 当前页面存放保存的hist id清空
                                fileHistId = '';
                                var inst_name = $('.checkedIns.on', $el).text();
                                console.log(inst_name);

                                if (window.sessionStorage) {
                                    var file_info = window.sessionStorage.getItem('info');
                                } else {
                                    var file_info = saveLog;
                                }

                                if (file_info && file_info != '') {
                                    // $('.textContainer', $el).append('<div class="textBox" id="log_' + strConv(inst_name) + '"></div>');
                                    // $('#log_' + strConv(inst_name), $el).html('').text(file_content);
                                    // file_info = 'fdafdafd3432efdsfdsa';
                                    $('textarea#fileInfos_' + strConv(inst_name), $el).replaceWith('<div class="textBox" id="log_' + strConv(inst_name) + '"></div>');
                                    $('#log_' + strConv(inst_name), $el).html('').text(file_info);
                                    $('.singleAbc-codeButton', $el).addClass('hide');
                                }

                            } else {
                                app.alert(result.msg);
                                return;
                            }
                        }
                    }

                });
            });

            // 文件修改保存
            $('#save', $el).on('click', function (e) {
                var fileContent = [],

                    inst_name = [],
                    path = '',
                    $insts = $('.checkedBox li', $el),
                    instance = $('.checkedBox li.on', $el).text();


                fileContent.push($('#fileInfos_' + strConv(instance) + '', $el).val());
                inst_name.push($('.checkedBox li.on', $el).text());

                if (inst_name && inst_name.length > 0 && fileContent && fileContent.length > 0) {
                    var $curr_tree = $('.ztree:not(.hide)', $el),
                        curr_file = $('a.curSelectedNode', $curr_tree).attr('title'),
                        curr_sFile = $('a.curSelectedNode', $curr_tree).parent().parent().prev('a').attr('title');

                    $.ajax({
                        async: true,
                        type: "POST",
                        url: 'ToolsetAction_writeFile.do',
                        dataType: "json",
                        shelter: '正在请求服务器，请稍候…',
                        data: {
                            'toIp': inst_name,
                            'toPath': curr_sFile,
                            'fileName': curr_file,
                            'content': fileContent
                        },
                        success: function (data) {
                            var datas = data.content;
                            if (datas && datas != '') {
                                result = datas.result;
                                if (!$.isEmptyObject(datas) && !$.isEmptyObject(result)) {
                                    if (result.state == '1') {
                                        succInit(inst_name, fileContent);
                                    }
                                } else {
                                    app.alert('稍后再试')
                                }
                            }
                        }

                    });

                } else {
                    app.alert('请选择实例和操作方式');
                }

            });


            //修改成功
            function succInit(inst_name, fileContent) {
                app.alert('修改成功');
                $('.singleAbc-codeButton', $el).addClass('hide');
                if (opType == 'singleOP') {
                    $('.textContainer', $el).find('#fileInfos_' + strConv(inst_name[0])).remove();
                    $('.textContainer', $el).append('<div class="textBox" id="log_' + strConv(inst_name[0]) + '">' + fileContent[0] + '</div>');
                } else if (opType == 'totalOP') {
                    $('.textContainer', $el).find('#fileInfos_all').remove();
                    $('.textContainer', $el).append('<div class="textBox" id="log_' + strConv(inst_name[0]) + '">' + fileContent[0] + '</div>');
                }
            }

            // 点击比较按钮
            $('#compareId', $el).on('click', function (e) {
                var selected = $("#dataTable_data tbody .fa-check", $el),
                    ParentSelect = selected.parent().parent(),
                    histArr = [];
                contentArr = [];


                ParentSelect.each(function () {
                    var $t = $(this, $el);
                    var tr = $dataTable.row($t).data();
                    contentArr.push(tr.contentPrev);
                    histArr.push(tr);
                });

                if (histArr.length == 0) {
                    app.alert("至少选中一条");
                } else if (histArr.length == 1) {
                    app.confirmDialog({//提示框组件
                        sTitle: "请确认",  //确认框标题
                        sType: "warn",  //模块类型，有normal，success，search，warn，error,默认为normal常规
                        sContent: '您确定与当前编辑区文本进行比较吗？',  //确认框内容，非必填
                        sBtnConfirm: '确定',  //确认按钮显示内容
                        sBtnCancel: '取消',  //却笑按钮显示内容
                        fnConfirmHandler: function () {
                            var inst_name = $('.checkedBox .checkedIns', $el).text();

                            var file_content;
                            if ($('.textContainer', $el).find('#fileInfos_' + strConv(inst_name)).length < 1) {
                                console.log(1);
                                file_content = $('#log_' + strConv(inst_name), $el).text();
                            } else {
                                console.log(2);
                                file_content = $('#fileInfos_' + strConv(inst_name) + '', $el).val();
                            }


                            $("#leftId", $el).html('').text(file_content);
                            $("#rightId", $el).html('').text(contentArr[0]);

                            CompareTxt(document.getElementById('leftId'), document.getElementById('rightId'));
                            $("#modal", $el).modal('show');
                        }
                    })
                } else if (histArr.length == 2) {
                    $("#leftId", $el).html('').text(contentArr[1]);
                    $("#rightId", $el).html('').text(contentArr[0]);

                    CompareTxt(document.getElementById('leftId'), document.getElementById('rightId'));
                    $("#modal", $el).modal('show');
                } else {
                    app.alert("最多选中两条比较");
                }

            });


            Date.prototype.FormatTime = function (fmt) {
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "H+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            };

            // 配置文件接口
            var zTree, settings = {
                view: {
                    showLine: false,
                    expandSpeed: "normal"
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                    },
                },
                callback: {
                    onClick: zTreeOnClick
                }
            };

            // 获取配置列表 生成树
            function getFilePath(type) {
                getLogTreeData(type);
            }


            // 配置文件点击事件
            var treeClick = '';

            function zTreeOnClick(event, treeId, treeNode, clickFlag) {
                if (!treeNode.pId) {
                    return;
                }
                var path = treeNode.path;// curSelectedNode
                var name = treeNode.name_all;
                var size = treeNode.size;
                var val = $("input[type='radio']:checked", $el).val();
                // var logObj = fileObj[val];
                var $tree_ul = $('[data-type="' + val + '"]', $el);

                $tree_ul.removeClass('active');
                readFile();
                loadHist();
                treeClick = 'yes';
            }

            // 界面加载操作历史
            function loadHist() {
                $dataTable.data().clear().draw();
                var $curr_tree = $('.ztree:not(.hide)', $el);
                var curr_fileName = $('a.curSelectedNode', $curr_tree).attr('title');
                app.shelter.show('正在加载配置文件，请稍等...');
                app.common.ajaxWithAfa({
                    url: 'ToolsetAction_getFileHists.do',
                    data: {
                        "instanceIds": instanceIds,// 分类ID+实例ID
                        "fromPath": getTreeFileAllPath(),
                        "fileName": curr_fileName,
                    }
                }).done(function (data) {
                    app.shelter.hide();
                    data = data.result;
                    if (data.state == 0) {
                        app.alert(data.msg);
                        return;
                    }

                    var list = data.data;
                    // console.log(list);
                    if (list && list != '') {
                        jQuery.each(list, function (i, item) {
                            item.index = '<i class="fa currently" aria-hidden="true"></i> ' + (i + 1);
                        });

                        $dataTable.rows.add(list).draw();
                    }
                });
            }


            //获取配置文件
            function readFile() {
                var inst_name = $('.checkedBox .checkedIns', $el).text();
                var $curr_tree = $('.ztree:not(.hide)', $el);
                var curr_fileName = $('a.curSelectedNode', $curr_tree).attr('title');

                // console.log("inst_name: " + inst_name);
                // console.log("curr_filePath: " + curr_filePath);
                // console.log("curr_fileName: " + curr_fileName);
                if (inst_name && curr_fileName) {
                    getFile(inst_name, getTreeFileAllPath(), curr_fileName);
                }
            }


            function getTreeFileAllPath() {
                var $curr_tree = $('.ztree:not(.hide)', $el);
                var pathArr = [];
                getTreeFilePath($('a.curSelectedNode', $curr_tree).parent().parent(), pathArr);
                // console.log('新路径：' + pathArr.reverse());
                var curr_filePath = '';
                if (pathArr.length > 0) {
                    for (var i = pathArr.length - 1; i >= 0; i--) {
                        curr_filePath += '/';
                        curr_filePath += pathArr[i];
                    }
                }

                return curr_filePath;
            }

            /**
             * 功能说明：获取选中节点目录
             * @param obj
             * @param pathArr
             * @returns {*|jQuery}
             */
            function getTreeFilePath(obj, pathArr) {
                if ($(obj).attr('id') == 'fileUl') {
                    return path;
                } else {
                    var path = $(obj).prev('a').attr('title');
                    pathArr.push(path);
                    getTreeFilePath($(obj).parent().parent(), pathArr);
                }
            }

            //获取配置文件
            function getFile(inst_name, path, name) {
                // console.log('path: ' + path);
                // console.log('name: ' + name);
                app.shelter.show('正在加载配置文件，请稍等...');
                app.common.ajaxWithAfa({
                    url: 'ToolsetAction_getFileContent.do',
                    data: {
                        "instanceIds": instanceIds,// 分类ID+实例ID
                        "fromPath": path,
                        "fileName": name,
                    }
                }).done(function (data) {
                    app.shelter.hide();
                    // console.log(data);
                    data = data.result;
                    if (data.state == 0) {
                        app.alert(data.msg);
                        return;
                    }

                    var file_content = data.content;
                    // console.log(file_content);
                    if (file_content && file_content != '') {
                        //logObj[name] =  file_content;

                        if ($('.textContainer', $el).find('#log_' + strConv(inst_name)).length < 1) {
                            $('.textContainer', $el).append('<div class="textBox" id="log_' + strConv(inst_name) + '"></div>');
                            $('#log_' + strConv(inst_name), $el).html('').text(file_content);
                        } else {
                            $('#log_' + strConv(inst_name), $el).html('').text(file_content);
                        }
                        $('#log_' + strConv(inst_name), $el).removeClass('hide').siblings().addClass('hide');

                    } else {
                        app.alert('目前没有内容可以显示');
                        $('.textContainer', $el).find('#log_' + strConv(inst_name)).remove();
                        $('.textContainer', $el).append('<div class="textBox" id="log_' + strConv(inst_name) + '"></div>');
                        $('#log_' + strConv(inst_name), $el).html('').text('');
                        $('#log_' + strConv(inst_name), $el).removeClass('hide').siblings().addClass('hide');
                    }
                })
            }

            // 由于jqury ID 不能还有.故将IP：10.10.10.10 转成成 10_10_10_10
            function strConv(str) {
                return str.replace(/./g, "_");
            }

            //表格插入数据
            // function loadTableData(whichTable, options) {
            //     $dataTableBase.data().clear();
            //
            //     var $option = $.extend({
            //         'appType': 'APP_AB3',
            //         'target': 'ABS_ServHistList',
            //         'args': JSON.stringify({
            //             'type': '1'
            //         })
            //     }, options);
            //     app.common.ajaxWithAfa({
            //         url: 'AFAReqAction_callAfaApp3.do',
            //         data: $option
            //     }).done(function (data) {
            //         if (whichTable == "history") {
            //             $dataTable.clear().draw();
            //             var tableData = data.result.private;
            //
            //             var len = tableData.length;
            //             if (tableData && len > 0) {
            //                 tableData.forEach(function (item, index) {
            //                     item.index = index + 1;
            //                 });
            //                 $dataTable.rows.add(tableData).draw();
            //             }
            //         } else if (whichTable == "baseConfig") {
            //             $dataTableBase.clear().draw();
            //             var tableData = data.result.private;
            //             var len = tableData.length;
            //             if (tableData && len > 0) {
            //
            //                 $('#showModal', $el).data('path', tableData[0].path)
            //
            //                 tableData.forEach(function (item, index) {
            //                     item.index = '<i class="fa currently" aria-hidden="true"></i> ' + (index + 1);
            //                 });
            //                 $dataTableBase.rows.add(tableData).draw();
            //             }
            //         }
            //     });
            // };


            //生成配置文件树
            function getLogTreeData(type) {
                app.common.ajaxWithAfa({
                    url: 'ToolsetAction_getConfTreeList.do',
                    data: {
                        // 'nodeAttr': 'aim'
                        'nodeAttr': type
                    }
                }).done(function (data) {
                    var data = data.result;
                    var list = data.trees;
                    var zNodes = [];
                    var id = 1;

                    for (var i in list) {
                        var item = list[i];
                        // console.log(item);
                        if (item.nodeType == '1') {
                            zNodes.push({
                                id: item.nodeId,
                                name: item.nodeName,
                                pId: item.nodeSuper,
                                path: item.nodePath,
                                size: 0,
                                name_all: ""
                            });
                        } else if (item.nodeType == '2') {
                            var name_size = item.nodePath.split('/');
                            zNodes.push({
                                id: item.nodeId,
                                name: item.nodeName,
                                pId: item.nodeSuper,
                                path: item.nodePath,
                                size: name_size[1],
                                name_all: name_size[0]
                            });
                        }
                    }

                    var $tree_ul = $('#fileUl', $el);
                    // var $tree_ul = $('[data-type="' + val + '"]', $el);
                    ztreeObj = $.fn.zTree.init($tree_ul, settings, zNodes);
                    $tree_ul.show();
                    var treeObj = $.fn.zTree.getZTreeObj("fileUl");

                    var nodes = treeObj.getNodes();
                    if (nodes.length > 0) {
                        treeObj.expandNode(nodes[0], true, false, false);
                    }
                })
            }

            // 输入数字，跳转到对应的某一个dataTable表
            function toJumpPage(inputId, $dataTable) {
                $(inputId, $el).on("keydown", function (e) {
                    var e = e || window.event;
                    var keycode = e.keycode || e.which;
                    var leaf = parseInt($(this).val());
                    if (keycode === 13) {
                        $dataTable.page(leaf - 1).draw("page");
                    }
                });
            };
            toJumpPage("#HistoPage", $dataTable);
            // toJumpPage("#BasetoPage", $dataTableBase);
        },
        unload: function (handler) {

        },
        pause: function ($el, attr, handler) {
            $.fn.zTree.destroy($('#fileUl', $el));
        },
        resume: function ($el, attr, handler) {
            // $.fn.zTree.init($('#fileUl', $el), setting, treeData);
        }
    };
});