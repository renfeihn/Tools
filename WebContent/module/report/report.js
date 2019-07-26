define(['echarts4',"jquery","../logResultCheck/logSearchDetail/logStatisticsView/statisticsEchartsTool","module/logResultCheck/logSearchDetail/logStatisticsView/statisticsEchartsTool",'loadChartsIndex'],
		function(echarts,$,staticEchartsTool,StatisticsEchartsTool,loadChartsIndex){
	
	return {
		
		load:function($el,scope,handler){

            var SelectedReportId =  null;//当前被选中的groupID
			var CacheStatic = {};
			var CacheUlStatic = {};
			var CacheStaticType3 = {};
			var ImageMap = {};
			var colDataGloabelData = [];
			var colDataGloabel = [];
			var formatSqlSearchData = null;
			

			var $dataTable = $("#dataTable", $el).DataTable({
				'pageLength': 20,
				"bAutoWidth": true, // 自动宽度
				'bStateSave': false,
				'searching': true,
				"ordering": false,
				"pagingType": "full_numbers",
				'aoColumnDefs': [{
					"render": function(data, type, row, meta) {
						var result = '';
						switch(data){
							case "day": result = "天";break;
							case "week": result = "周";break;
							case "month": result = "月";break;
							case "year": result = "年";break;
						}
						return result;
					},
					"targets": 1
				},{
                    "render": function(data, type, row, meta) {
                        return `<a style="color: ${data?"var(--color-theme);":"#ccc;pointer-events: none;"}" href="javascript:void(0);">${data?data:0}个</a>`;
                    },
                    "targets": 2
                },{
					"render": function(data, type, row, meta) {
                        // 判断是否为登录用户
                        return isLoginUser(row.username) ? 
                        `<i title="修改" class="fa fa-edit fa-fw"></i>&nbsp;
                         <i title="删除" class="fa fa-trash fa-fw"></i>&nbsp;
                         <i title="复制" class="fa fa-copy fa-fw"></i>` : 
                        `<i title="复制" class="fa fa-copy fa-fw"></i>`;
					},
					"targets": 4
				}],
				columns: [{
                    data: 'reportName',
                    defaultContent: '-'
                },{
                    data: 'frequency',
                    defaultContent: '-'
                },{
					data: 'reportHistoryCount.count',
                    defaultContent: '0'
                },{
                    data: 'username',
					defaultContent: '-'
				},{
					data: null,
					defaultContent: '-'
				}]
			});

			queryReport();

            function isLoginUser(name){
                if(sessionStorage && sessionStorage.getItem("user")){
                    var username = JSON.parse(sessionStorage.getItem("user")).username;
                    return username == name;
                }else{
                    return app.common.ajaxWithAfa({
                        url: "LoginAction_loadNowUser.do"
                    }).done(function(content){
                        return content.userVO.username == name
                    })
                }
            }

			$("#dataTable", $el).on('click', 'tr', function(){
				var rowData = $dataTable.row(this).data();
				SelectedReportId = rowData.reportId;
                $(".report-toolbar span[type],.report-toolbar span[data-role]", $el).removeClass('cannotUse');
				if(rowData){
					$dataTable.rows().nodes().to$().removeClass('selected');
					$(this).addClass('selected');
					$("#reportTitle", $el).text(rowData.reportName);
					showReport(SelectedReportId);
				}
			})

			$("#dataTable tbody", $el).on('click', 'i.fa', function(e){
				e.stopPropagation();
				var rowData = $dataTable.row($(this).closest('tr')).data();
				if(rowData){
					if($(this).hasClass("fa-edit")){
						// 修改
                        $("#addReportModal", $el).modal("show");
                        $("#reportName", $el).val(rowData.reportName);
                        $("#remark", $el).val(rowData.remark);
                        $('input[name="frequency"]', $el).removeAttr('checked');
                        $('#'+rowData.frequency, $el).attr('checked','checked');
                        $("#addReportModal h3", $el).text("修改报表").attr("reportid", rowData.reportId);

					}else if($(this).hasClass("fa-trash")){
						// 删除
						app.confirmDialog({//提示框组件
							sTitle:"是否删除",  //确认框标题         
			                sType:"search",  //模块类型，有normal，success，search，warn，error,默认为normal常规
			                sContent:'是否删除该数据？',  //确认框内容，非必填
			                sBtnConfirm: '确定',  //确认按钮显示内容
			                sBtnCancel: '取消',  //却笑按钮显示内容
			                fnConfirmHandler: function(){
			                	app.common.ajaxWithAfa({
			                		url: "ESReportAction_deleteReport.do",
			                		data: {
			                			"jsonObject": JSON.stringify(rowData)
			                		}
			                	}).done(function(content){
			                		if(content.result){
			                			app.alert("删除成功");
			                			queryReport();
			                		}
			                	})
			                }
						})
					}else{
						// 复制
                        app.common.ajaxWithAfa({
                            url: "ESReportAction_copyReport.do",
                            data: {
                                "reportId": rowData.reportId
                            }
                        }).done(function(content){
                            if(content.result){
                                app.alert("复制成功");
                                queryReport();
                            }
                        })
                        // $("#addReportModal", $el).modal("show");
                        // $("#reportName", $el).val(rowData.reportName);
                        // $("#remark", $el).val(rowData.remark);
                        // $('input[name="frequency"]', $el).removeAttr('checked');
                        // $('#'+rowData.frequency, $el).attr('checked','checked');
                        // $("#addReportModal h3", $el).text("复制报表");
					}
				}
			}).on('click', 'a', function(e){
                e.stopPropagation();
                if(!$(this).hasClass("disabled")){
                    var rowData = $dataTable.row($(this).closest('tr')).data();
                    app.dispatcher.load({
                        title: '查看历史报表-'+rowData.reportName,
                        moduleId: 'report',
                        section: 'reportHistory',
                        id: rowData.reportId,
                        params: {
                            "rowData": rowData
                        },
                       context: $el
                    });
                }
            })
			// 查询报表
			function queryReport(){
				app.common.ajaxWithAfa({
					url: "ESReportAction_getAllReport.do",
				}).done(function(content){
					$dataTable.clear().draw();
					var data = content.result;
                    var yearCount = 0;
                    var monthCount = 0;
                    var weekCount = 0;
                    var dayCount = 0;
                    data.forEach(function(item,index){
                        switch(item.frequency){
                            case "year": yearCount++;break;
                            case "month": monthCount++;break;
                            case "week": weekCount++;break;
                            case "day": dayCount++;break;
                        }
                    });
                    $('#yearCount', $el).text(yearCount);
                    $('#monthCount', $el).text(monthCount);
                    $('#weekCount', $el).text(weekCount);
                    $('#dayCount', $el).text(dayCount);

					$dataTable.rows.add(data).draw();
                    resetReportView();
				})
			}

			// 新增报表
			$(".addBtn", $el).on('click', function(){
				$("#form", $el)[0].reset();
                $("#addReportModal h3", $el).text("新增报表");
				$("#addReportModal", $el).modal("show");
			});

			$("#saveReport", $el).on('click', function(){
				// 表单验证不通过，则不提交
	    			if(!validateData($el)){
	    				return;
	    			}
                var sendData = {
				    "reportName" : $('#reportName', $el).val(),
				    "remark" : $('#remark', $el).val(),
				    "frequency" : $('[name="frequency"]:checked', $el).val(),
                };
                if($.trim(sendData.reportName) == ''){
                    $('#reportName', $el).next().removeClass('hide').text('不能为空');
                    return;
                }else{
                    $('#reportName', $el).next().addClass('hide');
                }
                var url = "ESReportAction_addReport.do";
                if($("#addReportModal h3", $el).text() == "修改报表"){
                    url = "ESReportAction_editReport.do";
                    sendData["reportId"] = $("#addReportModal h3", $el).attr("reportid");
                }
				app.common.ajaxWithAfa({
					url: url,
					data: {
						"jsonObject": JSON.stringify(sendData)
					}
				}).done(function(content){
					if(content.result){
						app.alert("保存成功");
						$("#addReportModal", $el).modal("hide");
						queryReport();
					}else{
						app.alert("保存失败");
					}
				})
			})


			// 查询图表信息
			function getChartsByType(type){
				app.common.ajaxWithAfa({
					url: "DashBoardAction_getAllDashBoard.do",
					data: {
						"echartsType": type
					}
				}).done(function(content){
					//缓存 es的参数数据
					var data = content.result;
					var html = '';
                    for (var i = 0; i< data.length; i++) {
                        CacheUlStatic[data[i].id] = data[i].statistics;
                        if (CacheStatic[data[i].id] != null) {
                            data[i].disabled = true;
                        } else {
                            data[i].disabled = false;
                        }
                        if (data[i].statisticsType === 3) {
                        	CacheStaticType3[data[i].id] = data[i];
                        }
                        ImageMap[data[i].id] = data[i].image;
                        html += `
							<li boradid="${ data[i].id }" 
								class="${ data[i].disabled ? "disabled" : "" }"
							>
								<span>${ data[i].name }</span>
								<i class="fa fa-check"></i>
							</li>
                        `;
                    }
                    $('.report-charts-list', $el).html(html);
                    // $('.report-charts-list', $el).find("li:eq(0)").trigger("click");

                    // $(".cm-item-block", $el).find('span').text(data.length + '个');
				});
			}

			$(".report-toolbar", $el).on('click', 'span[type]', function(){
                if(!SelectedReportId){
                    return;
                }
				getChartsByType($(this).attr("type"));
				$("#addChartsModal", $el).modal("show");
			})

			$('.report-charts-list', $el).on('click', 'li', function(){
				$(this).addClass("selected").siblings().removeClass("selected");
				var id = $(this).attr("boradid");
				$("#previewImg", $el).attr("src", ImageMap[id]);
			})


			var addNewChartToContent = function(){
                var selectedEle = $(".report-charts-list li.selected" ,$el);
                if (selectedEle.length  != 0) {
                    var position = searchCandrop();
                    var name = selectedEle.children("span").text();
                    var boradId = selectedEle.attr("boradid");
                    var image = ImageMap[boradId];
                    var options = CacheUlStatic[boradId];
                    CacheStatic[boradId] = options;
                    var data = {
                        relation: {
                            boardId: boradId,
                            width: 400,
                            height: 300,
                            x: position.x - 200,
                            y: position.y
                        },
                        title: name,
                        image: image
                    };

                    var html = `<div class="instance-item" boardId="${data.relation.boardId}" style="width:${data.relation.width}px;height:${data.relation.height}px;top:${data.relation.y}px; left:${data.relation.x}px;">
							        <div class="instance-item-header">
							            <p class="item-title">${data.title}</p>
							            <div class="edit-group">
							                <a href="javascript:void(0)">
							                    <i class="fa fa-reply"></i>
							                </a>
							                <a href="javascript:void(0)">
							                    <i class="fa fa-trash"></i>
							                </a>
							                <a href="javascript:void(0)" class="download">
							                    <i class="fa fa-download"></i>
							                </a>
							            </div>
							        </div>
							        <div class="charts-item">
										<img src="${data.image}" />
									</div>
							        <div class="instance-item-footer">
							            <span class="resize-arrow"></span>
							        </div>
							    </div>`;
                    $('.report-content', $el).append(html);
                    $("#addChartsModal",$el).modal("hide");
                    if (CacheStaticType3[boradId]) {
                    	CacheStaticType3Set(CacheStaticType3[boradId], boradId);
                    } else {
                    	generatorCharts(boradId);
                    }
                }
            }
			
			function CacheStaticType3Set(item, boradId) {
				var search = item.search;
				var startTime = item.startTime;
				var endTime = item.endTime;
				var cate = JSON.parse(item.mustValue);	
				var logIndexConfig = new loadChartsIndex();
				var logType = 1;
				var size = 10;
				var from = 0;
				var fieldName = JSON.parse(item.fieldName);
				var echartsType1 = item.echartsType;
				var tmpUrlData = {
					cate,
					search,
					startTime,
					endTime,
					logType,
					size,
					from
				}
				app.common.ajaxWithAfa({
					url: 'ESSearchAction_sqlSearchWithAggregationsParse.do',
					data: tmpUrlData
				}).done(function (data) {
					var result = data.result;
					if(result && !$.isEmptyObject(result)){
						initPage(result);
						logIndexConfig.init($('[boardid = '+boradId+']', $el).find(".charts-item")[0],colDataGloabelData);
						reStoreConfig(fieldName, echartsType1, logIndexConfig);
					}
				});
			}
			
			function reStoreConfig(fieldName, echartsType1, logIndexConfig) {
				if (fieldName && fieldName.length !== 0) {
					logIndexConfig.pushAllData(fieldName);
				}
				if (echartsType1) {
					logIndexConfig.changeType(echartsType1+'');
				}
			}

            /**
             *  画布中寻找一块完整的空地（能够完整的容纳图表的大小）
             *  算法待优化
             */
            function  searchCandrop() {
            	// 返回正中间的位置
            	var x = $('.report-content', $el).width()/2;
            	var y = 100;
            	return {
            		x,
            		y
            	};
            }

            $("#addItemCharts",$el).on("click", addNewChartToContent);

            var generatorCharts = function (boradIdArr) {
                if (!boradIdArr || !boradIdArr.length) return;
                if (Object.prototype.toString.call(boradIdArr) != "[object Array]"){
                    boradIdArr = [boradIdArr];
                }
                var curSelected = SelectedReportId;
                getDashBoardData(boradIdArr).then(function(data){
                    var keys = Object.keys(data);
                    console.log(CacheStatic)
                    var aggs = null, paramData = null, options = null, borderEle = null;
                    for (var i = 0; i< keys.length; i++){
                        aggs = data[keys[i]];
                        if(aggs && !$.isEmptyObject(aggs)){
//                        	try {
                        		paramData = JSON.parse(CacheStatic[keys[i]]).paramData;
                        		console.log(paramData)
                                options = getEchartsOptionByParams(aggs, paramData);
                                borderEle = $('[boardid = '+keys[i]+']', $el).find(".charts-item");
                                if (curSelected ===  SelectedReportId){
                                    if(options){
                                        app.echarts.init(borderEle[0]).setOption(options);
                                    }else{
                                        borderEle.html('<span style="color:#999;font-size:12px;font-weight:normal;">暂无数据～</span>');
                                    }
                                }
//							} catch (e) {
								// TODO: handle exception
//							}
                        }else{
                        	app.alert('title', '仪表盘数据获取异常', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                        }
                    }
                });
            }

            $(".report-content", $el).on("mousedown", ".instance-item", function (e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var ele = this;
                var containerWidth = $(".report-content", $el).width();
                var containerHeight = $(".report-content", $el).height();
                var eleWidth = ele.offsetWidth;
                var eleHeight = ele.offsetHeight;
                var padding = 15;
                var maxLeft = containerWidth - eleWidth - padding;
                   /* maxTop = containerHeight - eleHeight - padding;*/
                $(ele).css("cursor", "move");
                var curpos = {
                    left: parseInt($(ele).css("left")),
                    top: parseInt($(ele).css("top")),
                    x: e.pageX,
                    y: e.pageY,
                    width: ele.offsetWidth,
                    height: ele.offsetHeight
                };
                var newpos = {};
                var offsetX = 0, offsetY = 0;
                $(document).on("mousemove", function (e) {
                    offsetX = e.pageX - curpos.x;
                    offsetY = e.pageY - curpos.y;
                    newpos.left = curpos.left + offsetX;
                    newpos.top = curpos.top + offsetY;
                    newpos.x = e.pageX;
                    newpos.y = e.pageY;
                    // var filter = CollisionDetection(ele, newpos.left, newpos.top, curpos.width, curpos.height).filter(function(t){
                    //     return t;
                    // }).length;
                    // if(filter !== 0){
                    //     return;
                    // }
                    if (newpos.left <= padding) {
                        newpos.left = padding;
                    }
                    if (newpos.top <= 100) {
                        newpos.top = 100;
                    }
                    if (newpos.left >= maxLeft) {
                        newpos.left = maxLeft;
                    }
                  /*  if (newpos.top >= maxTop) {
                        newpos.top = maxTop;
                    }*/
                    $(ele).css({
                        left: newpos.left + 'px',
                        top: newpos.top + 'px'
                    });
                    curpos = Object.assign(curpos, newpos);
                });
                $(document).on("mouseup", function (e) {
                    $(ele).css("cursor", "");
                    $(document).off("mousemove");
                    $(document).off("mouseup");
                });
            });

            var getDashBoardData = function(ids) {
	            return app.common.ajaxWithAfa({
	                url: 'DashBoardAction_getDashBoardData.do',
	                data: {
	                    ids: ids
	                }
	            }).then(function(data) {
	                return $.Deferred().resolve(data.result);
	            })
	        }

	        var getEchartsOptionByParams = function(aggs, paramData) {
	            var options = staticEchartsTool.getOption(aggs, paramData);
	            return options;
	        }

            // 缩放事件
	        $(".report-content", $el).on("mousedown", ".resize-arrow", function (e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var ela = $(this).closest(".instance-item")[0];
                
                var footer = this.parentNode;
                var instance = app.echarts.getInstanceByDom($(ela).find(".charts-item")[0]);
                if (!instance) {
                	instance = echarts.getInstanceByDom($(ela).find(".charts-item")[0]);
                }
                var padding = 15;
                var maxWidth = $(".report-content", $el).width() - padding,
                    minWidth = 200,
                    minHeight = 200;
                var curInfo = {
                    x: e.pageX,
                    y: e.pageY,
                    width: ela.offsetWidth,
                    height: ela.offsetHeight,
                    left: parseInt($(ela).css("left")),
                    top: parseInt($(ela).css("top"))
                };
                var offsetX = 0, offsetY = 0;
                var newInfo = {};
                $(footer).css("cursor", "nw-resize");
                $(document).on("mousemove", function (e) {
                    offsetX = e.pageX - curInfo.x;
                    offsetY = e.pageY - curInfo.y;
                    newInfo = {
                        x: e.pageX,
                        y: e.pageY,
                        width: curInfo.width + offsetX,
                        height: curInfo.height + offsetY,
                        left: curInfo.left,
                        top: curInfo.top
                    };
                    // var filter = CollisionDetection(ela, curInfo.left, curInfo.top, newInfo.width, newInfo.height);
                    // var flag = filter.filter(function (t) {
                    //     return t;
                    // }).length;
                    // if (flag !== 0){
                    //     var left = 0, top =0, ele, flag = 0;
                    //     filter.forEach(function(item, index){
                    //         if (!item) return;
                    //         ele = $(".instance-item", $el).eq(index);
                    //         left = parseInt(ele.css("left"));
                    //         top = parseInt(ele.css("top"));
                    //         if (ele.width() + left >= maxWidth - 2 * padding) {
                    //             flag ++;
                    //             return;
                    //         }
                    //         /*Fixed me*/
                    //         $(".instance-item", $el).eq(index).css({
                    //             top: top + offsetY,
                    //             left: left + offsetX
                    //         });
                    //     });
                    // }
                    // if (flag) return;
                    if (newInfo.width <= minWidth) {
                        newInfo.width = minWidth;
                    }
                    if (newInfo.height <= minHeight) {
                        newInfo.height = minHeight;
                    }
                    if (newInfo.width + newInfo.left > maxWidth) {
                        return;
                    }
                   /* if (newInfo.height >= maxHeight) {
                        newInfo.height = maxHeight;
                    }*/
                    $(ela).css({
                        width: newInfo.width,
                        height: newInfo.height
                    });
                    curInfo = Object.assign(curInfo, newInfo);
                    instance && instance.resize();
                });

                $(document).on("mouseup", function (e) {
                    $(footer).css("cursor", "auto");
                    $(document).off("mousemove");
                    $(document).off("mouseup");
                });
            });

            $(".report-toolbar", $el).on("click", '[data-role="save"]', function(){
                var reportId = SelectedReportId;
                if(!SelectedReportId){
                    return;
                }
                var relations = [];
                $(".instance-item", $el).each(function(index, item){
                    relations.push({
                    	"reportId": reportId,
                        "boardId": item.getAttribute("boardid"),
                        "width": item.offsetWidth,
                        "height": item.offsetHeight,
                        "x": item.offsetLeft,
                        "y": item.offsetTop
                    });
                });
                relations = JSON.stringify(relations);
                addReportRelation(relations).then(function (data) {
                    if (data) {
                        app.alert("保存成功！");
                    } else {
                        app.alert("保存失败："+ data.errorMsg);
                    }
                });
            });

            function addReportRelation(relations){
            	return app.common.ajaxWithAfa({
            		url: 'ESReportAction_addReportRelation.do',
            		data: {
            			"jsonObject": relations
            		}
            	})

            }

            function showReport(SelectedReportId){
            	app.common.ajaxWithAfa({
            		url: "ESReportAction_getReportRelationByReportId.do",
            		data: {
            			"jsonObject": JSON.stringify({
            				"reportId": SelectedReportId
            			})
            		}
            	}).done(function(content){

//                    var boradIdArr = [];
//                    boradIdArr = content.result.map(function(item, index){
//                        return item.boardId;
//                    })
                    var tmp1 = content.result.filter(function (item) {
                    	if (item.dashBoard.statisticsType === 3) {
                    		return true;
                    	}
                    	return false;
                    })
                    var tmp2 = content.result.filter(function (item) {
                    	if (item.dashBoard.statisticsType !== 3) {
                    		return true;
                    	}
                    	return false;
                    })
                    tmp2 = tmp2.map(item => {
                    	return item.boardId;
                    })
                    // var finalData = EtlData(data);
                    generatorDashBoard(content.result);
                    // boradIdArr = finalData[1];
                    generatorCharts(tmp2);
                    if (tmp1.length > 0){
                    	tmp1.forEach(item => {
                    		CacheStaticType3Set(item.dashBoard, item.boardId)
                    	})
                    }
            	})
            }

            /**
             * 生成 仪表盘对应的图表
             */
            var generatorDashBoard = function(data){
                var html = '';
                var boradIdData = [];
                data.forEach(function(item, index){
                    var data = {
                        "relation": {
                            "boardId": item.boardId,
                            "width": item.width,
                            "height": item.height,
                            "x": item.x,
                            "y": item.y
                        },
                        "title": item.dashBoard.name,
                        "image": item.dashBoard.image
                    };
                    boradIdData.push(item.boardId);
                    CacheStatic[item.boardId] = item.dashBoard.statistics;
                    
                    html += `<div class="instance-item" boardid="${data.relation.boardId}" style="width:${data.relation.width}px;height:${data.relation.height}px;top:${data.relation.y}px; left:${data.relation.x}px;">
                                <div class="instance-item-header">
                                    <p class="item-title">${data.title}</p>
                                    <div class="edit-group">
                                        <a href="javascript:void(0)">
                                            <i class="fa fa-reply"></i>
                                        </a>
                                        <a href="javascript:void(0)">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                        <a href="javascript:void(0)" class="download">
                                            <i class="fa fa-download"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="charts-item">
                                    <img src="${data.image}" />
                                </div>
                                <div class="instance-item-footer">
                                    <span class="resize-arrow"></span>
                                </div>
                            </div>`;

                });
                Object.keys(CacheStatic).forEach(function(item){
                    item = item - 0;
                    if (!boradIdData.includes(item)){
                         delete CacheStatic[item];
                    }
                });
                $('.report-content .instance-item', $el).remove();
                $('.report-content', $el).append(html);
            }


            $(".report-content",$el).on("click",".fa-trash", function(e){
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var ele = $(this).closest(".instance-item");
                app.confirmDialog({
                    sTitle:"请确认",
                    sType:"search",
                    sContent: '是否删除当前图表？',
                    sBtnConfirm: '确定',
                    sBtnCancel: '取消',
                    fnConfirmHandler: function(){
                        ele.remove();
                    },
                    fnCancelHandler: null
                });
            });
            $(".report-content",$el).on("click",".fa-reply", function(e){
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var ele = $(this).closest(".instance-item");
                var boradId = ele.attr("boardid");
                app.dispatcher.load({
                   title: '日志搜索',
                   moduleId: 'logResultCheck',
                   section: 'logSearchDetail',
                   id: boradId,
                   params: {
                        param:{
                            dashboardId: boradId
                        }
                   },
                   context: $el
                });
            });
            $(".report-content", $el).on("click", ".download", function () {
                var el = $(this).closest(".instance-item")[0];
                var canvas = exportsOneCharts(el);
                var title = $(el).find(".item-title").text();
                var a = document.createElement("a");
                a.setAttribute("download", title);
                a.setAttribute("href", canvas.toDataURL("image/png"));
                a.style.display = "none";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });


            function exportsOneCharts(el) {
                var canvas = document.createElement("canvas");
                var width = el.offsetWidth,
                    height = el.offsetHeight,
                    titleSize = 16,
                    titleHeight = 20,
                    padding = 25;
                var context = canvas.getContext("2d");

                var dpr = window.devicePixelRatio;
                var image = $(el).find("canvas")[0],
                    title = $(el).find(".item-title").text();
                if(image){
                    var imageWidth = image.getAttribute("width"),
                    imageHeight = image.getAttribute("height");
                    canvas.width = width * dpr;
                    canvas.height = height * dpr;
                    context.save();
                    context.fillStyle = "#fff";
                    context.fillRect(0, 0, canvas.width, canvas.height);
                    context.fill();
                    context.restore();
                    context.font = "bold 16px Arial";
                    context.fillText(title, padding, padding);
                    context.drawImage(image, padding, padding + titleHeight, imageWidth, imageHeight);
                }
                return canvas;
            }


            function resetReportView(){
                $(".report-toolbar span[type],.report-toolbar span[data-role]", $el).addClass('cannotUse');
                $("#reportTitle", $el).text("");
                $('.report-content .instance-item', $el).remove();
            }

            $('.report-StatisticCount>div>span', $el).on('click', function(){
                $(this).toggleClass('selected').siblings().removeClass('selected');
                if($(this).hasClass('selected')){
                    $dataTable.column(1)
                        .search($(this).attr("data-match"))
                        .draw();
                }else{
                    $dataTable.column(1)
                        .search('')
                        .draw();
                }
            })
            
          //数据验证
			function validateData(context){
				var validateResult = app.validate.validate({
					$context : context,
					data:  [{
						"id": "reportName",
						"filter": {
							"minLen" : 1,
							'maxLen' : 30,
						},
					}
					],
					correctCallback: function ($ael, correctMsg) {
						$ael.next().addClass('hide');
					},
					errorCallback : function ($ael, errMsg) {
						$ael.next().removeClass('hide').text(errMsg);
					}
				});
				return validateResult.bResult;
			}	
            
            
            function sqlUnity(sqlSearchData) {
				var cols = [];
				var colData = [];
				var data = sqlSearchData[sqlSearchData.fieldName];
				if (data && data.length > 0) {
					var tmp = Object.keys(data[0]).map(item => {
						return {
							data: item.replace(/\./g,'-'),
							title: item.replace(/\./g,'-'),
						}
					})
					colData = data;
					colData = colData.map((item, index) => {
						item.index = index+1;
						for(var key in item) {
							item[key.replace(/\./g,'-')] = item[key];
							if (item[key].name) {
								item[key] = item[key].name;
							}
						}
						return item;
					})
					cols.push(...tmp);
					colDataGloabel = cols;
					colDataGloabel = colDataGloabel.slice(1);
					colDataGloabelData = colData;
				}
			}
			
			

			function initPage(sqlSearchData) {
				if (sqlSearchData.fieldName === 'agg') {
					sqlUnity(sqlSearchData);
					return false;
				}
				let cols = [];
				let colData = [];
				let hasAggregations = false;
				formatSqlSearchData= StatisticsEchartsTool.formatTableData(sqlSearchData);
				if (!hasAggregations) {
					formatSqlSearchData.forEach(item => {
						if (item.hits && Array.isArray(item.hits)) {
							try {
								let data = item.hits;
								let tmp = data[0]._source;
								let flag = false;
								for(var key in tmp) {
									cols.push({
										data: key.replace(/\./g,'-'),
										title: key.replace(/\./g,'-'),
									})
								}
								colData = data.map(item => {
									return item._source;
								});
								colData = colData.map((item, index) => {
									item.index = index+1;
									for(var key in item) {
										item[key.replace(/\./g,'-')] = item[key];
										if (item[key].name !== null && item[key].name !== undefined) {
											item[key] = item[key].name;
										}
									}
									return item;
								})
							} catch (e) {
								console.log(e);
							}
						}
					})
				}
				
				colData = colData.map(data => {
					cols.forEach(item => {
						if (item.data !== 'index' && (data[item.data] === null || data[item.data] === undefined)) {
							data[item.data] = "";
						}
					})
					return data;
				})
				
				colDataGloabel = cols;
				colDataGloabel = colDataGloabel.slice(1);
				colDataGloabelData = colData;
			}
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});