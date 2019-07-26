define(["jquery"], function () {
    return {
        load: function ($el, scope, handler) {
            var thisDataTbObj,
                whereMap = {
                    os_type: 'all',
                    agent_status: 'all',
                    ping_status: 'all',
                    telnet_status: 'all',
                    agent_user_status: 'all'
                },
                $agmTb = $('#agmTb', $el),
                $configListModal = $('#configListModal', $el);

            // 弹出框datatable初始化
            $agmTb = $("#agmTb", $el).DataTable({
                'bAutoWidth': false,
                'bPaginate': true, //开关，是否显示分页器
                'pagingType': 'full_numbers',
                'bStateSave': false,
                'bSort': false,//排序
                'searching': true,
                'pageLength': 10,
                'bInfo': true,
                'columns': [{
                    data: null, defaultContent: '-'//checkbox
                },
                    {
                        data: '1', defaultContent: '-'
                    }, {
                        data: '2', defaultContent: '-'
                    }, {
                        data: '3', defaultContent: '-'
                    }, {
                        data: '4', defaultContent: '-',
                    },
                    {
                        data: '5', defaultContent: '-',
                    },
                    {
                        data: '6', defaultContent: '-',
                    },
                    {
                        data: '7', defaultContent: '-',
                    }, {
                        data: '8', defaultContent: '-',
                    }],
                'aoColumnDefs': [   //配置每一列
                    {
                        "render": function (data, type, row, meta) {
                            switch (data) {
                                case 0:
                                    return '<i class="fa fa-cog fa-fw" aria-hidden="true"></i>&nbsp;未启动'
                                    break;
                                case 1:
                                    return '<i class="fa fa-cog fa-fw fa-spin" aria-hidden="true"></i>&nbsp;已启动'
                                    break;
                                default:
                                    break;
                            }
                        },
                        "targets": 4
                    },
                    {
                        "render": function (data, type, row, meta) {
                            if (data == '<i class="agm-green-icon"></i>') {
                                return '<i class="fa fa-circle greenDot" aria-hidden="true"></i>'
                            } else {
                                return '<i class="fa fa-circle redDot" aria-hidden="true"></i>'
                            }
                        },
                        "targets": 5
                    },
                    {
                        "targets": 0,
                        "render": function (data, type, row, meta) {
                            return `<input class="chcbox"  type="checkbox" value="" name="source" />`
                        }

                    },

                    // {
                    // 	"targets": 4,
                    // 	"render": function(data, type, row, meta) {
                    // 		var createTime = new Date(data);
                    // 		// console.log('row',row)
                    // 		return myformatter(createTime);
                    // 	}

                    // }
                ],

			});
			var upIndex=1;
			$infoTable = $("#infoTable", $el).DataTable({
                'bAutoWidth': false,
                'bPaginate': false, //开关，是否显示分页器
                'pagingType': 'full_numbers',
                'bStateSave': false,
                'bSort': false,//排序
                'searching': false,
                'pageLength': 1000000,
                'bInfo': false,
                'columns': [{
                    data: null, defaultContent: ''
                    }, {
                        data: 'fileName', defaultContent: '-'
                    }, {
                        data: 'sourcePath', defaultContent: '-'
                    }, {
                        data: 'aimPath', defaultContent: '-',
                    }, {
                        data: 'upTime', defaultContent: '-',
                    }, {
                        data: 'upStatus', defaultContent: '-'
                    }, {
                        data: 'upInterval', defaultContent: '-',
                    }],
                'aoColumnDefs': [   //配置每一列
                    {
                        "render": function (data, type, row, meta) {
                            
                        },
                        "targets": 0
                    },
                    // {
                    //     "render": function (data, type, row, meta) {
                    //         if (data == '<i class="agm-green-icon"></i>') {
                    //             return '<i class="fa fa-circle greenDot" aria-hidden="true"></i>'
                    //         } else {
                    //             return '<i class="fa fa-circle redDot" aria-hidden="true"></i>'
                    //         }
                    //     },
                    //     "targets": 5
                    // },
                    // {
                    //     "targets": 0,
                    //     "render": function (data, type, row, meta) {
                    //         return `<input class="chcbox"  type="checkbox" value="" name="source" />`
                    //     }

                    // },

                    // {
                    // 	"targets": 4,
                    // 	"render": function(data, type, row, meta) {
                    // 		var createTime = new Date(data);
                    // 		// console.log('row',row)
                    // 		return myformatter(createTime);
                    // 	}

                    // }
                ],

			});

            // 点击tab 页签的事件
            $('#li1',$el).on('click',function () {
                // console.log(' li1 click');
            });
            $('#li2',$el).on('click',function () {
                $('.sourceInfoName').text('--');
                $('.resourceList',$el).empty();
                $('.linkSource', $el).attr('data-ip','');
            });

			var infoObj={};
            // 获取 弹出框 table both
            function getSourcetable() {
                app.common.ajaxWithAfa({
                    url: 'AgentManagerAction_getAgentList.do',
                    data: {whereStr: JSON.stringify(whereMap)}
                }).done(function (content) {
                    $agmTb.clear();
                    content.list.forEach(function (item, index) {

                    });
                    $agmTb.rows.add(content.list).draw();
                })
            }


            // 获取目录
            function getDir($element, ip, dir, fileType) {
                app.common.ajaxWithAfa({
                    url: 'AgentManageAction_getAgentDir.do',
                    data: {
                        "agentIp": ip,
                        "dir": dir
                    }
                }).done(function (content) {
                    // var nullFlag;
                    if (content.result.flag == "false" || $.isEmptyObject(content.result)) {

                        // $('.aimList', $el).html('')
                        if (fileType == 'd' || fileType == '') {  //是文件夹
                            app.alert('', '错误信息：' + content.result.msg, 'warning')
                        } else if (fileType == 'f') {   //是文件
                            if (toPath && toIp) {
                                app.confirmDialog({
                                    sTitle: "提示",  //确认框标题
                                    sType: "search",  //模块类型，有normal，success，search，warn，error,默认为normal常规
                                    sContent: '确定要上传该条信息吗？',
                                    sBtnConfirm: '确定',
                                    sBtnCancel: '取消',
                                    fnConfirmHandler: function () {
                                        var $element;
                                        $('.aimList', $el).find('span').each(function (index, item) {

                                            if ($(item).attr('title') == lastLevel) {

                                                $element = $(item).parent()
                                            }
                                        });
                                        upload($element, fromIp, fromPath, toIp, toPath, fileName)


                                    },  //点击确认按钮触发的回调函数，参数以数组形式写在args那里
                                })
                            } else {
                                app.alert('', '请选择目标文件夹', 'warning')
                            }

                        }
                    }
                    else {
                        var html = '<ul class="PreviewModal-dirList" >';
                        for (var item in content.result) {
                            var icon = '';
                            if (content.result[item] == 'd') {
                                icon = '<i class="fa fa-caret-square-o-right fa-fw"></i>';
                            }
                            html += '<li class="listLi" data-type="' + content.result[item] + '"><span title="' + item + '">' + icon + item + '</span></li>';
                        }
                        html += '</ul>';
                        $element.append(html);
                    }
                })
            }

            //连接 源服务器按钮
            // $('.linkSource', $el).on('click', function () {
            //     var ip = $('.linkSource', $el).attr('data-ip');

            //     var $element = $('.resourceList', $el)
            //     $('.resourceList', $el).html('')
            //     getDir($element, ip, '')
            // })
            //连接 目标服务器按钮
            // $('.linkAim', $el).on('click', function () {
            //     var ip = $('.linkAim', $el).attr('data-ip');

            //     var $element = $('.aimList', $el)
            //     $('.aimList', $el).html('')
            //     getDir($element, ip, '')
            // })

            var fromIp, fromPath, fileName
            //双击目录每一项展开等操作 源服务器
            $('.resourceList', $el).on('dblclick', '.PreviewModal-dirList li', function (e) {
                e.stopPropagation();
                if ($(this).hasClass('active')) {
                    $(this).find('i.fa').toggleClass('fa-caret-square-o-right fa-caret-square-o-down')
                        .end().removeClass('active').children('ul').hide();
                    // $(this).next('ul').find('.active').click();
                } else {
                    $(this).addClass('active').find('i.fa').toggleClass('fa-caret-square-o-right fa-caret-square-o-down')
                        .end().siblings().removeClass('active');
                    var ip = $('.linkSource', $el).attr('data-ip'),
                        fileType = $(this).attr('data-type'),
                        dir,
                        $element = $(this).parent().children('.active')
                    thisFile = $(this).children('span').attr('title'),
                        dirArr = ['/' + thisFile];
                    fromIp = ip;
                    fileName = thisFile
                    $(this).parents(".listLi").each(function (index, item) {
                        dirArr.unshift("/" + $(item).children('span').attr('title'));
					})
					dirArr.unshift('/home')
                    console.log('dirArr', dirArr)
                    var path;
                    dir = dirArr.join('')
                    dirArr.pop()
					fromPath = dirArr.join('')
					console.log("fromPath",fromPath)
					// $('.sourcePath', $el).text('/home'+dir)
					infoObj.sourcePath = dir;
					infoObj.fileName =fileName;
                    getDir($element, ip, dir, fileType);
                }
            });
            //双击展开下一级和选择目标文件夹
            var toPath, toIp, lastLevel
            $('.aimList', $el).on('dblclick', '.PreviewModal-dirList li', function (e) {
                e.stopPropagation()
                if ($(this).hasClass('active')) {
                    $(this).find('i.fa').toggleClass('fa-caret-square-o-right fa-caret-square-o-down')
                        .end().removeClass('active').children('ul').hide();
                    // $(this).next('ul').find('.active').click();
                } else {
                    $(this).addClass('active').find('i.fa').toggleClass('fa-caret-square-o-right fa-caret-square-o-down')
                        .end().siblings().removeClass('active');
                    var ip = toIp = $('.linkAim', $el).attr('data-ip'),
                        dir,
                        $element = $(this).parent().children('.active')
                    lastLevel = thisFile = $(this).children('span').attr('title'),
                        dirArr = ["/" + thisFile]
                    $(this).parents(".listLi").each(function (index, item) {
                        dirArr.unshift("/" + $(item).children('span').attr('title'));
                    })
					dirArr.unshift('/home')
					toPath = dir = dirArr.join('')
					console.log('toPath',toPath)
					// $('.aimPath', $el).text('/home'+toPath)
					infoObj.aimPath = dir
                    getDir($element, ip, dir, '')

                }

            });

			//点击上传加号框
			var $elementupload;
            $('.uploadBox', $el).on("click", function (e) {
                // e.preventDefault()
				// toIp = $('.linkAim', $el).attr('data-ip');
				$('.sourceUpload',$el).trigger('click');
                
                $('.aimList', $el).find('span').each(function (index, item) {
                    if ($(item).attr('title') == lastLevel) {

                       $elementupload = $(item).parent()
                    }
                })

                

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
			//上传按钮
			var upTime;
			 $('.uploadBtn', $el).on('click',function(){
				var arr=[];
				upTime= new Date().getTime();
				infoObj.upTime =  new Date().FormatTime("yyyy-MM-dd HH:mm:ss");  
				
				if(fileName==''){
					app.alert('', '请选择上传文件', 'warning')
					return
				}
				if (toPath && toIp){
					btnUpload($elementupload,fileName);
					$(".uploadBox", $el).children('.fa').removeClass('fa-file').addClass('fa-plus-circle')
					$(".filename", $el).text('请选择');
					$(this).prop('disabled','disabled')
					
					fileName=""
				}else{
					app.alert('', '请选择目标文件夹', 'warning')
				}

				
			 })
            //双击文件上传
            function upload($element, fromIp, fromPath, toIp, toPath, fileName) {
				var endTimes,
				upTime= new Date().getTime();
                app.common.ajaxWithAfa({
                    url: 'ToolsetAction_ac2acUpload.do',
                    data: {
                        'fromIp': fromIp,
                        'fromPath': fromPath,
                        'toIp': toIp,
                        'toPath': toPath,
                        'fileName': fileName
                    }
                }).done(function (content) {
                    if (content.result.state == 1) {
                        app.alert(content.result.msg)
                        $element.children('ul').remove();
						getDir($element, toIp, toPath)
						infoObj.upStatus=content.result.msg;
						infoObj.upTime =  new Date().FormatTime("yyyy-MM-dd HH:mm:ss");  
						endTimes= new Date().getTime();
						
						 if(parseInt((endTimes-upTime)/1000)==0){
							 infoObj.upInterval =1
						 }else{
							infoObj.upInterval =parseInt((endTimes-upTime)/1000);
						 }
						
							var infoobj1 = Object.assign({}, infoObj);
							infoArr.push(infoobj1);
							$infoTable.clear();
							$infoTable.rows.add(infoArr).draw();
                    } else {
                        app.alert(content.result.msg)
                    }

                })
            }

			//监听input
			var fileName='';
            $("#uploadform", $el).off('change','.sourceUpload').on("change",'.sourceUpload', function (e) {
                var e = e || window.event;
                //获取 文件 个数 取消的时候使用
				var files = e.target.files
				console.log(files)
				console.log()
                if (files.length > 0) {
                    // 获取文件名 并显示文件名
					fileName = $(".sourceUpload", $el)[0].files[0].name
					$(".uploadBox", $el).children('.fa').removeClass('fa-plus-circle').addClass('fa-file')
					$(".filename", $el).text(fileName);
					$(".uploadBtn", $el).prop('disabled',false)
					$(".uploadBtn", $el).css('cursor','pointer')
					infoObj.sourcePath = '本地';
					infoObj.fileName =fileName;
                } 
			});


			$(".flieLeft", $el).on('mouseenter','.sourceInfoBox',function(){
				if($(this).children('.sourceInfoName').text()!='--'){
					$(this).addClass('active');
					$(this).find(".fa-times").addClass('active');
				}
				
			});
			$(".flieRight", $el).on('mouseenter','.aimInfoBox',function(){
				if($(this).children('.aimInfoName').text()!='--'){
					$(this).addClass('active');
					$(this).find(".fa-times").addClass('active');
				}
				
			})


			$(".flieLeft", $el).on('mouseleave','.sourceInfoBox',function(){
				$(this).removeClass('active');
				$('.fa-times',$el).removeClass('active');
			})
			$(".flieRight", $el).on('mouseleave','.aimInfoBox',function(){
				$(this).removeClass('active');
				$('.fa-times',$el).removeClass('active');
			})


			//关闭清除已选择的源服务器
			$(".flieLeft", $el).on('click','.fa-times',function(){
				
				$(this).prev('.sourceInfoName').text('--');
				$('.resourceList',$el).empty();
				$('.linkSource', $el).attr('data-ip','');
				$('.sourcePath',$el).empty();
				
				
			})
			//关闭清除已选择的目标服务器
			$(".flieRight", $el).on('click','.fa-times',function(){
				
				$(this).prev('.aimInfoName').text('--');
				$('.aimList',$el).empty();
				$('.linkAim', $el).attr('data-ip','')
				$('.aimPath',$el).empty();
				
			})
			var infoArr=[];
            //点击按钮上传 方法
            function btnUpload($element,fileName) {
                // var filename = $(".sourceUpload", $el)[0].files[0].name
                var endTime;
                $.ajaxFileUpload({
                    url: "ToolsetAction_s2acUpload.do",//处理文件脚本
                    secureuri: false,
                    fileElementId: 'file',//file控件id
                    dataType: 'json',
                    timeout: 600000,
                    async: false,
                    data: {
                        fileName: fileName,
                        toIp: toIp,
                        toPath: toPath
                    },

                    success: function (content) {
						var data = JSON.parse(content)
						console.log('content',content)
						console.log('data',data)
                        if (data.content.result.state == "1") {
							
							endTimes= new Date().getTime();
							console.log(endTimes)
							console.log(upTime)
							app.alert('上传成功！')
                            $element.children('ul').remove();
							getDir($element, toIp, toPath);
							infoObj.upStatus=data.content.result.msg
							// var upInterval;

							// if(parseInt((endTimes-upTime)/1000)==0){
							// 	infoObj.upInterval=1
							// }else{
							// 	console.log('12131415151515')
							// 	debugger;
							// 	infoObj.upInterval=parseInt((endTimes-upTime)/1000)
							// }
							infoObj.upInterval=parseInt((endTimes-upTime)/1000)==0?1:parseInt((endTimes-upTime)/1000)
							// infoObj.upInterval=upInterval
							console.log('ppp',infoObj.upInterval)
							var infoobj2 = Object.assign({}, infoObj);
							infoArr.push(infoobj2);
							$infoTable.clear();
							$infoTable.rows.add(infoArr).draw();

                            
							
							
                        } else {
                            app.alert(data.content.result.msg)
                        }

                    },
                    error: function (request, status, err) {
                        if (status == "timeout") {
                            app.alert("请求超时，请稍后再试！");
                        }
                    }
                });
            }

            //选择配置 源服务器 按钮
            $('.chooseConfig', $el).on('click', function () {
                $('#configListModal', $el).removeClass('hide')
                $('.sureBtn', $el).addClass('saveSourceBtn')
                getSourcetable()

            })
            //选择配置 目标服务器 按钮
            $('.chooseConfigAim', $el).on('click', function () {
                $('#configListModal', $el).removeClass('hide')
                $('.sureBtn', $el).removeClass('saveSourceBtn')
                getSourcetable()
            })
            //确认 按钮
            $('#configListModal', $el).on('click', '.sureBtn', function () {
                if ($(this).hasClass("saveSourceBtn")) {
                    $('#agmTbody', $el).find(':checkbox').each(function (index, item) {
                        if ($(item).is(":checked")) {
                            //数据数组
                            var selectedDatas = sourceservice.getSelectedDatas();
                            $('#configListModal', $el).addClass('hide');
                            $('.sourceInfoName', $el).text(selectedDatas[0][1]);
							$('.linkSource', $el).attr('data-ip', selectedDatas[0][3])
							// var ip = $('.linkSource', $el).attr('data-ip');
							var ip=selectedDatas[0][3]
							var $element = $('.resourceList', $el)
							$('.resourceList', $el).html('')
							getDir($element, ip, '/home')
                        }
                        // else{
                        // 	app.alert('','请选择一项配置信息！','warning')
                        // }
                    })
                } else {
                    $('#agmTbody', $el).find(':checkbox').each(function (index, item) {
                        if ($(item).is(":checked")) {
                            //数据数组
                            var selectedDatas = sourceservice.getSelectedDatas();
                            $('#configListModal', $el).addClass('hide');
                            $('.aimInfoName', $el).text(selectedDatas[0][1]);
							$('.linkAim', $el).attr('data-ip', selectedDatas[0][3])
							var ip= selectedDatas[0][3]
							var $element = $('.aimList', $el)
							$('.aimList', $el).html('')
							getDir($element, ip, '/home')
                        }
                        // else{
                        // 	app.alert('','请选择一项配置信息！','warning')
                        // }
                    })
                }


            })

            //表格列表的封装及 配置
            function multiSelect(options) {
                var $dataTable = options.dataTable,
                    tableSelector = options.tableSelector,
                    checkAllSelector = options.checkAllSelector,
                    context = options.context,
                    defaultDisabled = options.optBtn && options.optBtn.defaultDisabled,//默认禁用按钮
                    change = options.change && options.change,
                    onlySelectedOneEnabled = options.optBtn && options.optBtn.onlySelectedOneEnabled;//仅选一项时，按钮可用

                //默认禁用按钮
                $(defaultDisabled, context).addClass('disabled');

                //全选多选框事件
                $(checkAllSelector, context).click(function (e) {
                    // e.stopPropagation();
                    if ($(this).prop('checked')) {
                        $dataTable.$('input').prop('checked', true);
                        $(defaultDisabled, context).removeClass('disabled');
                        $(onlySelectedOneEnabled, context).addClass('disabled');
                    } else {
                        $dataTable.$('input').prop('checked', false);
                        $(defaultDisabled, context).addClass('disabled');
                    }
                    change && change();
                });

                //点击某行修改对应的多选框，同时更新全选多选框的样式
                $(tableSelector + ' tbody', context).on('click', 'tr', function (e) {
                    // e.stopPropagation();
                    $dataTable.rows().nodes().to$().find('input').prop('checked', false);// 点击某一行，只选中一行，取消其他行选中。
                    if ($(this).find('input').prop('checked') == true) {
                        $(this).find('input').prop('checked', false);
                    } else {
                        $(this).find('input').prop('checked', true);
                    }
                    updateCheckAllBoxStyle();
                });

                //点击某行的多选框时更新全选多选框的样式
                $(tableSelector + ' tbody', context).on('click', 'input', function (e) {
                    e.stopPropagation();
                    updateCheckAllBoxStyle();
                });

                //更新全选多选框样式
                function updateCheckAllBoxStyle() {
                    change && change();
                    var len = $dataTable.$('tr').length;
                    var checkLen = $dataTable.$('input:checked').length;
                    switch (checkLen) {
                        case 0:
                            $(checkAllSelector, context).prop('indeterminate', false).prop('checked', false);
                            $(defaultDisabled, context).addClass('disabled');
                            break;
                        case len:
                            $(checkAllSelector, context).prop('indeterminate', false).prop('checked', true);
                            $(defaultDisabled, context).removeClass('disabled');
                            if (len != 1) {
                                $(onlySelectedOneEnabled, context).addClass('disabled');
                            }
                            break;
                        default:
                            $(checkAllSelector, context).prop('indeterminate', true).prop('checked', false);
                            $(defaultDisabled, context).removeClass('disabled');
                            if (checkLen != 1) {
                                $(onlySelectedOneEnabled, context).addClass('disabled');
                            }
                    }
                }

                //可用mulit实例来调用下面的方法
                return {
                    getSelectedDatas: function () {//获取选中行数据
                        var datas = [];
                        $dataTable.$('input:checked').each(function (i, item) {
                            datas.push($dataTable.rows($(item).parents('tr')).data()[0]);
                        });
                        return datas.length ? datas : null;
                    },
                    getSelectedValues: function (key) {//获取选中行对应键的值
                        var values = [];
                        $dataTable.$('input:checked').each(function (i, item) {
                            values.push($dataTable.rows($(item).parents('tr')).data()[0][key]);
                        });
                        return values.length ? values : null;
                    },
                    setSelectedItems: function (uid, arr) {//选中默认项，uid为各项的标识，arr为选中项对应uid值组成的数组
                        if (!arr) return;
                        var data = $dataTable.rows().data();

                        arr.forEach(function (item, i) {
                            for (var j = 0; j < data.length; j++) {
                                if (data[j][uid] == arr[i]) {
                                    $($dataTable.$('tr')[j]).find('input').prop('checked', true);
                                }
                            }
                        });

                        updateCheckAllBoxStyle();
                    },
                    clear: function () {
                        $dataTable.$('input').prop('checked', false);
                        updateCheckAllBoxStyle();
                    },
                    destroy: function () {
                        $(checkAllSelector, context).off();
                        $(tableSelector + ' tbody', context).off();
                        $dataTable = null;
                        tableSelector = null;
                        checkAllSelector = null;
                        context = null
                        defaultDisabled = null;
                        onlySelectedOneEnabled = null;
                        options = null;
                    }
                }

            }

            //初始化源服务器  配置表格实例
            var sourceservice = multiSelect({
                dataTable: $agmTb,
                tableSelector: '#agmTb',
                checkAllSelector: '',
                // optBtn: {
                // 	defaultDisabled: '#batchDelBtn',
                // },
                context: $el,
                change: function () {
                    // $('.items-number', $el).html(multiSelect.getSelectedDatas()?multiSelect.getSelectedDatas().length:0);
                }
            })
            //获取选中行 的信息
            // var selectedDatas = aimservice.getSelectedDatas();

            //初始化目标服务器  配置表格实例
            // var aimservice = multiSelect({
            // 	dataTable: $datasourceTable,
            // 	tableSelector: '#dataTable-model',
            // 	checkAllSelector: '#allChoose',
            // 	// optBtn: {
            // 	// 	defaultDisabled: '#batchDelBtn',
            // 	// },
            // 	context: $el,
            // 	change: function(){
            // 		// $('.items-number', $el).html(multiSelect.getSelectedDatas()?multiSelect.getSelectedDatas().length:0);
            // 	}
            // })
            //获取选中行 的信息
            // var selectedDatas = aimservice.getSelectedDatas();

            //关闭弹窗
            $('.closeListModal', $el).click(function () {
                $('#configListModal', $el).addClass('hide');
            })

            //控制职能选一个checkbox  &&  判断是否重复 ( 左右选择项不可相同 )
            $('#agmTbody', $el).on('click', ':checkbox', function () {
                $(this).parent().parent().siblings().children('td').children(':checkbox').prop('checked', false)
                var selectedDatas = sourceservice.getSelectedDatas();
                //源
                if ($('.sureBtn', $el).hasClass("saveSourceBtn")) {
                    var selectIp = $('.linkAim', $el).attr('data-ip');
                    if (selectIp == selectedDatas[0][3]) {
                        app.alert('', '提示：源服务器与目标服务器相同！', 'warning')
                        // $('#agmTbody', $el).find(':checked').prop('checked', false)
                        // return ;
                    }
                } else {
                    var selectIp = $('.linkSource', $el).attr('data-ip');
                    if (selectIp == selectedDatas[0][3]) {
                        app.alert('', '提示：源服务器与目标服务器相同！', 'warning')
                        // $('#agmTbody', $el).find(':checked').prop('checked', false)
                        // return ;
                    }
                }
            });
            $('#agmTbody', $el).on('click', 'tr', function () {
                $(this).parent().parent().siblings().children('td').children(':checkbox').prop('checked', false)
                var selectedDatas = sourceservice.getSelectedDatas();
                //源
                if ($('.sureBtn', $el).hasClass("saveSourceBtn")) {
                    var selectIp = $('.linkAim', $el).attr('data-ip');
                    if (selectIp == selectedDatas[0][3]) {
                        app.alert('', '提示：源服务器与目标服务器相同！！', 'warning')
                        // $('#agmTbody', $el).find(':checked').prop('checked', false)
                        // return
                    }
                } else {
                    var selectIp = $('.linkSource', $el).attr('data-ip');
                    if (selectIp == selectedDatas[0][3]) {
                        app.alert('', '提示：源服务器与目标服务器相同！', 'warning')
                        // $('#agmTbody', $el).find(':checked').prop('checked', false)
                        // return
                    }
                }
            })

            //


        },
        unload: function (handler) {
        },
        pause: function ($el, attr, handler) {
        },
        resume: function ($el, attr, handler) {
        }
    };
});
