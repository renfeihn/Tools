define(['echarts4',"jquery", "underscore","./DashBoradService","handlebars"
	,"module/logResultCheck/logSearchDetail/logStatisticsView/statisticsEchartsTool",'loadChartsIndex'],
	function(echarts,$, _, api,Handlebars,StatisticsEchartsTool,loadChartsIndex){

    return {
        
        load:function($el,scope,handler){

            //当前被选中的groupID
            var SelectedGroupId =  null;
            var colDataGloabelData = [];
			var colDataGloabel = [];
			var formatSqlSearchData = null;

            var scopegroupId = app.domain.get('groupId', 'groupId');
            if(scopegroupId){
                SelectedGroupId = scopegroupId;
            }

            //cache static
            var CacheStatic = {};
            // cache ulstatic
            var CacheUlStatic = {};
            
            var CacheStaticType3 = {};
		    /**
             *   列表无数据时候
             */
            function listNoData(flag) {
                var ele = $(".db-list-nodata",$el);
                if (flag) {
                    ele.css("display","block");
                } else{
                    var isShow = true;
                    ele.css("display","none");
                    var $li = $(".db-list-items",$el).children("li");
                    for (var i =0; i< $li.length; i++) {
                        if($($li[i]).css("display") !== "none") {
                            isShow = false;
                        }
                    }
                    if (isShow) {
                        ele.css("display","block");
                    } else{
                        ele.css("display","none");
                    }
                }
            }
            /**
             * 根据仪表盘信息生成 仪表盘列表
             */
            var generatorDashBoradList = function(data) {
                var i = 0, length = data.length,
                    temp = $("#db-list-tpl", $el).html();
                if (length == 0) {
                    listNoData(true);
                    $(".db-list-items",$el).empty();
                    return;
                }
                if (SelectedGroupId === null) {
                    SelectedGroupId = data[0].groupId;
                }
                for (;i < length; i++) {
                    if (SelectedGroupId == data[i].groupId) {
                        data[i].Selected = true;
                    } else {
                        delete data[i].Selected;
                    }
                }
                var template = Handlebars.compile(temp);
                var html = template(data);
                $(".db-list-items",$el).html(html);
                listNoData(false);
                showGroupDashBorad(SelectedGroupId);
            }
            /**
             * 仪表盘列表点击后的函数回调
             */
            var dashBoradClick = function (e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                if ($(this).hasClass("selected")) return;
                SelectedGroupId = $(this).attr("groupId");
                $(this).addClass("selected").siblings().removeClass("selected");
                showGroupDashBorad(SelectedGroupId);
            }
            /**
             * 显示对应分组的图表
             */
            var showGroupDashBorad = function (groupId) {
                var isIndex = $(".db-list-item.selected",$el).attr('isIndex');
                if(isIndex == '1'){
                    $('#addFirstPage', $el).addClass('disabled');
                }else{
                    $('#addFirstPage', $el).removeClass('disabled');
                }
                var text = $(".db-list-item.selected",$el).children("span").text();
                $(".db-content-header-title",$el).text(text);
                api.getDashBoardByGroupId(groupId).then(function(data){
                    var boradIdArr = [];
                    var finalData = EtlData(data);
                    generatorDashBoard(finalData[0]);
                    boradIdArr = finalData[1];
                    return $.Deferred().resolve(boradIdArr, finalData[0])
                }).then(function(boradIdArr,items){
                	var tmp = [];
                	var itemsTmp = [];
                	items.forEach(item => {
                		if (item.item.statisticsType !== 3) {
                			tmp.push(item.item.id)
                		} else {
                			itemsTmp.push(item.item);
                		}
                	})
                    generatorCharts(tmp);
                	if (itemsTmp && itemsTmp.length !== 0) {
                		itemsTmp.forEach(item => {
                    		CacheStaticType3Set(item, item.id)
                    	})
                	}
                });
            }
            /**
             *  生成echarts图表
             */
             var generatorCharts = function (boradIdArr) {
                if (!boradIdArr || !boradIdArr.length) return;
                if (Object.prototype.toString.call(boradIdArr) != "[object Array]"){
                    boradIdArr = [boradIdArr];
                }
                var curSelected = SelectedGroupId;
                api.getDashBoardData(boradIdArr).then(function(data){
                    var keys = Object.keys(data);
                    var aggs = null, paramData = null, options = null, borderEle = null;
                    for (var i = 0; i< keys.length; i++){
                        aggs = data[keys[i]];
                        if(aggs && !$.isEmptyObject(aggs)){
                        		paramData = JSON.parse(CacheStatic[keys[i]]).paramData;
                            options = api.getEchartsOptionByParams(aggs, paramData);
                            borderEle = $('[boardid = '+keys[i]+']', $el).find(".charts-item");
                            if (curSelected ===  SelectedGroupId){
                                if(options){
                                    app.echarts.init(borderEle[0]).setOption(options);
                                }else{
                                    borderEle.html('<span style="color:#999;font-size:12px;font-weight:normal;">暂无数据～</span>');
                                }
                            }
                        }else{
                        		app.alert('title', '仪表盘数据获取异常', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                        }
                    }
                });
            }

            /**
             * 切片数据 生成所需要的数据 返回
             */
            var EtlData = function(data){
                var finalData = [], htmlData = [], boradIdData = [];
                for (var i = 0; i < data.length; i++) {
                    htmlData.push({
                    	image: data[i].dashBoard.image,
                        relation: data[i].relation,
                        title: data[i].dashBoard.name,
                        item: data[i].dashBoard
                    });
                    boradIdData.push(data[i].relation.boardId);
                    CacheStatic[data[i].relation.boardId] = data[i].dashBoard.statistics;
                }
                Object.keys(CacheStatic).forEach(function(item){
                    item = item - 0;
                    if (!boradIdData.includes(item)){
                         delete CacheStatic[item];
                    }
                });
                finalData = [htmlData, boradIdData];
                return finalData;
            }
            /**
             * 生成 仪表盘对应的图表
             */
            var generatorDashBoard = function(data){
                var temp = $("#dashBoradItem", $el).html();
                var template = Handlebars.compile(temp);
                var html = template(data);
                $(".db-content-main", $el).html(html);
            }
            /**
             * 点击保存为首页的回调
             */
            var addFirstPageCallBack = function (e) {
                var $addFirstPage = $('#addFirstPage',$el);
                if($addFirstPage.hasClass('disabled')){
                    return;
                }
                var groupId= SelectedGroupId;
                api.addFirstPage(groupId).then(function(data){
                    if(data){
                        app.alert('设置成功');
                        $addFirstPage.addClass('disabled')
                    }else{
                        app.alert('设置失败');
                    }
                })
            }
            /**
             * 点击添加图表后的回调
             */
            var addChartBtnCallBack = function(e){
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var type = $(".cm-item-l.selected");
                if (!type.length) {
                    type = null;
                } else {
                    type = type.attr("type");
                }
                $("#modal",$el).modal("show");
                queryUlList(type);
            }
            /**
             * 查询工作表
             * @param echartsType
             */
            var queryUlList = function(echartsType) {
                api.getAllDashBoard(echartsType).then(function (data) {
                    //缓存 es的参数数据
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
                    }
                    $(".cm-item-block", $el).find('span').text(data.length + '个');
                    var temp = $("#preViewChart" ,$el).html();
                    var template = Handlebars.compile(temp);
                    var html = template(data);
                    $(".cm-item-ul", $el).html(html);
                });
            }
            /**
             * 新增按钮点击后的回调
             */
            var addNewChartToContent = function(){
                var selectedEle = $(".cm-radio.selected" ,$el);
                if (selectedEle.length  != 0) {
                    var position = searchCandrop();
                    var name = selectedEle.prev().children("span").text();
                    var boradId = selectedEle.closest("li").attr("boradid");
                    var image = selectedEle.next().children().attr("src");
                    var options = CacheUlStatic[boradId];
                    CacheStatic[boradId] = options;
                    var data = [{
                        relation: {
                            boardId: boradId,
                            width: 200,
                            height: 200,
                            x: position.x,
                            y: position.y
                        },
                        title: name,
                        image: image
                    }];
                    var temp = $("#dashBoradItem",$el).html();
                    var template = Handlebars.compile(temp);
                    var html = template(data);
                    $(".db-content-main",$el).append(html);
                    $("#modal",$el).modal("hide");
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
               var x1 = 0, x2 = $(".db-content-main",$el).width(),
                   y1 = 0, y2 = Number.POSITIVE_INFINITY;
               var arr = [];
               var index = null;
               var nWidth = 200;
               var padding = 20;
               var minLeft = Number.POSITIVE_INFINITY, minTop = Number.POSITIVE_INFINITY,
                   maxBottom = 0;
               var curLeft =  null, curTop = null, curWidth = null, curHeight = null;
               $(".instance-item", $(".db-content-main",$el)).each(function (index, item) {
                   curLeft = parseInt($(item).css("left"));
                   curTop = parseInt($(item).css("top"));
                   curWidth = item.offsetWidth;
                   curHeight = item.offsetHeight;
                  if (minLeft > curLeft) {
                      minLeft = curLeft;
                  }
                  if (minTop > curTop) {
                      minTop = curTop;
                  }
                  if (maxBottom < curTop + curHeight){
                      maxBottom = curTop + curHeight;
                  }
                   arr.push({
                       left: curLeft,
                       top: curTop,
                       right: curLeft + curWidth,
                       bottom: curTop + curHeight
                    });
               });
               if (minLeft > nWidth + padding && minTop > nWidth + padding) {
                    return {x: x1, y: y1};
               }
               return {
                   x:0, y: maxBottom + padding
               }
            }

            $("#sname, #annotation", $el).on('keydown', function (e) {
				let text = $(this).val();
				let id = $(this).attr('id');
				if (id === 'sname') {
					if (text.length > 50) {
						$(this).val(text.substring(0,50));
					}
				}
				if (id === 'annotation') {
					if (text.length > 100) {
						$(this).val(text.substring(0,100));
					}
				}
			})
            
            var addDashBoradItem = function(e) {
                e = e || window.event;
                var groupName = $("#sname",$el).val(),
                    remark = $("#annotation",$el).val();
                if($.trim(groupName) == ''){
                    $("#sname",$el).next().removeClass('hide').text("不能为空");
                    return;
                }else if($.trim(groupName).length > 15){
                    $("#sname",$el).next().removeClass('hide').text("名称不能超过30个字符");
                    return;
                }else{
                    $("#sname",$el).next().addClass('hide');
                }
                if ($("#modal2",$el).attr("type") === "add") {
                    api.addDashBoardGroup(groupName, remark).then(function(data){
                        if (data) {
                            app.alert("新增仪表盘分组成功！");
                            $("#modal2", $el).modal('hide');
                            api.getDashBoardGroups().then(generatorDashBoradList);
                        } else{
                            app.alert("失败！" + data.errorMsg);
                        }
                    }).then(function(){
                        $("#sname",$el).val("");
                        $("#annotation",$el).val("");
                    });
                } else {
                    api.updateGroupName(SelectedGroupId,groupName,remark).then(function(data){
                        if (data) {
                            app.alert("修改成功！");
                            $("#modal2", $el).modal('hide');
                            api.getDashBoardGroups().then(generatorDashBoradList);
                        } else {
                            app.alert("失败！" + data.errorMsg);
                        }
                    }).then(function(){
                        $("#sname",$el).val("");
                        $("#annotation",$el).val("");
                    });
                }

            }
            
            api.getDashBoardGroups().then(generatorDashBoradList).then(function(){
                showGroupDashBorad(SelectedGroupId);
            });
            $(".db-content-main", $el).on("mousedown", ".instance-item", function (e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var ele = this;
                var containerWidth = $(".db-content-main", $el).width();
                var containerHeight = $(".db-content-main", $el).height();
                var eleWidth = $(ele).width();
                var eleHeight = $(ele).height();
                var padding = 22;
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
                    var filter = CollisionDetection(ele, newpos.left, newpos.top, curpos.width, curpos.height).filter(function(t){
                        return t;
                    }).length;
                    if(filter !== 0){
                        return;
                    }
                    if (newpos.left <= padding) {
                        newpos.left = padding;
                    }
                    if (newpos.top <= 0) {
                        newpos.top = 0;
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


            $(".db-content-main", $el).on("mousedown", ".resize-arrow", function (e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var ela = $(this).closest(".instance-item")[0];
                var footer = this.parentNode;
                var instance = app.echarts.getInstanceByDom($(ela).find(".charts-item")[0]);
                if (!instance) {
                	instance = echarts.getInstanceByDom($(ela).find(".charts-item")[0]);
                }

                var padding = 22;
                var maxWidth = $(".db-content-main", $el).width() + padding,
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
                    var filter = CollisionDetection(ela, curInfo.left, curInfo.top, newInfo.width, newInfo.height);
                    var flag = filter.filter(function (t) {
                        return t;
                    }).length;
                    if (flag !== 0){
                        var left = 0, top =0, ele, flag = 0;
                        filter.forEach(function(item, index){
                            if (!item) return;
                            ele = $(".instance-item", $el).eq(index);
                            left = parseInt(ele.css("left"));
                            top = parseInt(ele.css("top"));
                            if (ele.width() + left >= maxWidth - 2 * padding) {
                                flag ++;
                                return;
                            }
                            /*Fixed me*/
                            $(".instance-item", $el).eq(index).css({
                                top: top + offsetY,
                                left: left + offsetX
                            });
                        });
                    }
                    if (flag) return;
                    if (newInfo.width <= minWidth) {
                        newInfo.width = minWidth;
                    }
                    if (newInfo.height <= minHeight) {
                        newInfo.height = minHeight;
                    }
                    if (newInfo.width + newInfo.left >= maxWidth) {
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

            $("#addFirstPage", $el).on('click',addFirstPageCallBack);

            $("#addCharts",$el).on("click", addChartBtnCallBack);
            $("#addDashBorad",$el).on("click", function () {
                $("#modal2",$el).attr("type", "add");
                $("#modal2",$el).find("h3").text("新建仪表盘");
                $("#sname", $el).val("");
                $("#annotation",$el).val("");
                $("#modal2",$el).modal("show");
            });
            $(".db-list-items",$el).on("click", ".db-list-item", dashBoradClick);
            
            $(".db-list-edit", $el).on("click","li", function (e) {
               e.preventDefault();
               e.stopPropagation();
               var type = $(this).attr("type");
               switch (type){
                   case "edit":
                       var groupName = null, remark = null;
                       $(".db-list-items",$el).children("li").each(function (index, item) {
                           if( $(item).attr("groupId") == SelectedGroupId) {
                                groupName = $(item).find(".overflowDisplay1").text();
                                remark = $(item).find(".overflowDisplay3").text();
                           }
                       });
                       $("#sname", $el).val(groupName);
                       $("#annotation",$el).val(remark);
                       $("#modal2",$el).attr("type", "edit");
                       $("#modal2",$el).find("h3").text("修改仪表盘");
                       $("#modal2",$el).modal("show");
                       break;
                   case "remove":
                        app.confirmDialog({
                            sTitle:"确认",       
                            sType:"search",
                            sContent:'确定删除仪表盘分组？',
                            sBtnConfirm: '确定',
                            sBtnCancel: '取消',
                            fnConfirmHandler: function(){
                                api.delGroupById(SelectedGroupId).then(function(data){
                                    if (data) {
                                        app.alert("删除仪表盘分组成功！");
                                        SelectedGroupId = null;
                                        api.getDashBoardGroups().then(generatorDashBoradList);
                                    } else {
                                        app.alert("删除仪表盘分组失败" + data.errorMsg);
                                    }

                                });
                            },
                            aArgs: []
                        });
                       break;
                   case "copy":
                        var groupName = null, remark = null;
                        $(".db-list-items",$el).children("li").each(function (index, item) {
                            if( $(item).attr("groupId") == SelectedGroupId) {
                                 groupName = $(item).find(".overflowDisplay1").text();
                                 remark = $(item).find(".overflowDisplay3").text();
                            }
                        });
                       api.copyDashBoardGroup(SelectedGroupId, groupName+'的副本', remark).then(function (data) {
                           if(data){
                                app.alert("复制仪表盘分组成功！");
                                api.getDashBoardGroups().then(generatorDashBoradList);
                           }else{
                                app.alert("复制仪表盘分组失败" + data.errorMsg);
                           }
                       })
                       break;
                   default:
                       app.alert("未知的类型.");
               }
                $(".db-list-edit", $el).css("display","none");
            });
            
            $("#dbSearch",$el).on("input", _.debounce(function(){
                var val = $(this).val();
                var dblist = $(".db-list-item", $el);
                var itemValue = '';
                dblist.each(function(index, item) {
                   itemValue = $(item).children("span").text();
                   if (itemValue.match(val)) {
                       $(item).css("display", "");
                   } else {
                       $(item).css("display", "none");
                   }
                });
                listNoData();
            },500));

            $(".db-content-main", $el).on("click", ".download", function () {
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

            $("#addNewGroup", $el).on("click", addDashBoradItem);

            $("#dbListResize",$el).on("click", function(e) {
                $(".db-list",$el).toggleClass("pickUp");
            });

            $("#addItemCharts",$el).on("click", addNewChartToContent);

            $(".cm-item-content",$el).on("click",".cm-item-l", function(){
                if($(this).hasClass("selected")){
                    return;
                }
                $(".cm-item-block",$el).find("input").val("");
                $(this).addClass("selected").siblings().removeClass("selected");
                var type = $(this).attr("type");
                queryUlList(type);
            });
            $(".cm-item-block input",$el).on("input", _.debounce(function(){
                var val = $(this).val();
                var itemValue = '';
                var index = 0;
                $(".cm-item-ul",$el).children('li').each(function (i, item) {
                    itemValue = $(item).children().eq(0).find("span").text();
                    if (itemValue.match(val)){
                        index ++;
                        $(item).css("display","");
                    } else {
                        $(item).css("display","none");
                    }
                });
                $(".cm-item-block", $el).find("span").text(index + '个');
            }, 500));

            $(".db-list-items",$el).on("click",".item-ellipsis", function(e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var y = $(this).parent()[0].offsetTop + 25;
                $(".db-list-edit",$el).css({
                    display: "block",
                    top: y
                });
            });

            $(".cm-item-ul", $el).on("click", ".cm-radio", function(e) {
                if ($(this).hasClass("disabled") || $(this).hasClass("selected")) {
                    return;
                }
                $(".cm-radio",$el).removeClass("selected");
                $(this).addClass("selected");
            });

            $(".db-content-main",$el).on("click",".fa-trash", function(e){
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var ele = $(this).closest(".instance-item");
                app.confirmDialog({
                    sTitle:"",
                    sType:"warn",
                    sContent: '是否删除当前图表？',
                    sBtnConfirm: '确定',
                    sBtnCancel: '取消',
                    fnConfirmHandler: function(){
                        ele.remove();
                    },
                    fnCancelHandler: null
                });
            });
            $(".db-content-main",$el).on("click",".fa-reply", function(e){
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
         
            $("#canelBtn", $el).on("click", function () {
                app.confirmDialog({
                    sTitle:"是否取消当前仪表盘的编辑",
                    sType:"warn",
                    sContent: '取消将会重置当前仪表盘，是否继续？',
                    sBtnConfirm: '确定',
                    sBtnCancel: '取消',
                    fnConfirmHandler: function(){
                        showGroupDashBorad(SelectedGroupId);
                    },
                    fnCancelHandler: null
                });
            });

            $("#saveBtn", $el).on("click", function(){
                var groupId = SelectedGroupId;
                var relations = [];
                $(".instance-item", $el).each(function(index, item){
                    relations.push({
                        boardId: item.getAttribute("boardid"),
                        width: item.offsetWidth,
                        height: item.offsetHeight,
                        x: item.offsetLeft,
                        y: item.offsetTop
                    });
                });
                relations = JSON.stringify(relations);
                api.addDashBoardRelation(groupId, relations).then(function (data) {
                    if (data) {
                        app.alert("保存成功！");
                    } else {
                        app.alert("保存失败："+ data.errorMsg);
                    }
                });
            });

            $("#exportCharts",$el).on("click", exportAllCharts);

            $(document).on("click", function(){
                $(".db-list-edit",$el).css("display", "none");
            });
            /**
             * 导出指定图表
             */
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
             // 导出所有的图表
             function exportAllCharts() {
                var $container = $(".db-content-main",$el);
                var padding  = 22;
                var header = 56;
                var width = $container.width(), height = $container.height(), scrollHeight = $container.scrollTop();
                var title = $(".db-content-header-title").text();
                var canvas = document.createElement("canvas");
                var context = canvas.getContext('2d');
                var dpr = window.devicePixelRatio;
                    canvas.width = width * dpr;
                    canvas.height = (header + height + scrollHeight) * dpr;
                var instanceCharts = $(".instance-item", $container);
                context.save();
                context.fillStyle = "#F5F5FA";
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.fill();
                context.restore();
                context.font = "bold 16px Arial";
                context.fillText(title, padding, padding);
                var itemX = null, itemY = null, image = null;
                for(var i = 0; i< instanceCharts.length; i++){
                    itemX = instanceCharts[i].offsetLeft * dpr;
                    itemY = instanceCharts[i].offsetTop * dpr;
                    image = exportsOneCharts(instanceCharts[i]);
                    context.drawImage(image, itemX , itemY + header, image.width, image.height);
                }
                 var a = document.createElement("a");
                 a.setAttribute("download", title);
                 a.setAttribute("href", canvas.toDataURL("image/png"));
                 a.style.display = "none";
                 document.body.appendChild(a);
                 a.click();
                 document.body.removeChild(a);

             }

            /**
             * 碰撞检测
             *
             */
            function CollisionDetection(el,willX, willY, willWidth, willHeight) {
                var allInstance = $(".instance-item", $el);
                var dragBoradId = $(el).attr("boardid");
                var item = null;
                var flag = [];
                for (var i = 0; i < allInstance.length; i++) {
                    item = allInstance[i];
                    if (dragBoradId != $(item).attr("boardid")) {
                        if ( (willX + willWidth < item.offsetLeft || willX > item.offsetLeft + item.offsetWidth ) || (willY + willHeight < item.offsetTop || willY > item.offsetTop + item.offsetHeight)) {
                            flag.push(false);
                        } else {
                            flag.push(true);
                        }
                    } else {
                        flag.push(false);
                    }
                }
                return flag;
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
			app.domain.clearScope('groupId');
        },
        
        pause:function($el,scope,handler){
            app.domain.clearScope('groupId');
		},
		
		resume:function($el,scope,handler){
            var domainGroupId = app.domain.get('groupId', 'groupId');
			if(domainGroupId){
                $(".db-list-items", $el).find('[groupid="'+ domainGroupId +'"]').trigger('click');
            }

		}
		
	}
});
