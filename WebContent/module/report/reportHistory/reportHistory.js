define(["jquery","../../logResultCheck/logSearchDetail/logStatisticsView/statisticsEchartsTool",
    "html2canvas","../../report/reportHistory/printArea",],function($, staticEchartsTool, html2canvas){
	
	return {
		
		load:function($el,scope,handler){
			var report = scope.rowData;
			var reportId = report.reportId;
			var listDate = report.reportHistoryCount.listDate;
			var year_selected = '';
			var month_selected = '';
			var day_selected = '';

			$("#reportTitle", $el).text(report.reportName);
			$('#reportName', $el).text(report.reportName);
			$('#frequency', $el).text(frequencyTranslate(report.frequency));
			$('#username', $el).text(report.username);
			$('#reportHistoryCount', $el).text(report.reportHistoryCount.count);
			var yearMap = {};
			listDate.forEach(function(item, index){
				var dateArr = item.split('-');
				if(!(dateArr[0] in yearMap)){
					yearMap[dateArr[0]] = {};
				}
				if(!((dateArr[1]) in yearMap[dateArr[0]])){
					yearMap[dateArr[0]][dateArr[1]] = [];
				}
				yearMap[dateArr[0]][dateArr[1]].push(dateArr[2]);
			});
			for(let year in yearMap){
				$('[data-list="year"]', $el).append(`<li>${year}</li>`);
			}
			$(".report-chooseDate", $el).on('click', '[data-list="year"]>li', function(e){
				e.stopPropagation();
				$(this).addClass('selected').siblings().removeClass('selected');
				year_selected = $(this).text();
				$('[data-list="month"]', $el).empty();
				$('[data-list="day"]', $el).empty();
				for(let month in yearMap[year_selected]){
					$('[data-list="month"]', $el).append(`<li>${month}</li>`);
				}
			})
			$(".report-chooseDate", $el).on('click', '[data-list="month"]>li', function(e){
				e.stopPropagation();
				$(this).addClass('selected').siblings().removeClass('selected');
				month_selected = $(this).text();
				$('[data-list="day"]', $el).empty();
				for(let day of yearMap[year_selected][month_selected]){
					$('[data-list="day"]', $el).append(`<li>${day}</li>`);
				}
			})
			$(".report-chooseDate", $el).on('click', '[data-list="day"]>li', function(e){
				e.stopPropagation();
				$(this).addClass('selected').siblings().removeClass('selected');
				day_selected = $(this).text();
				$(".report-chooseDate", $el).addClass('hide');
				$(document).off('click.reportHis');
				$('#executeTime', $el).val(year_selected+'-'+month_selected+'-'+day_selected).trigger("change");
			})
			

			
			$('#executeTime', $el).on('change', function(){
				showReportByDate(this.value);
			}).on('click', function(e){
				e.stopPropagation();
				$(".report-chooseDate", $el).removeClass('hide');
				$(document).on('click.reportHis', function(){
					$(".report-chooseDate", $el).addClass('hide');
					$(document).off('click.reportHis');
				})
			})

			function showReportByDate(date){
	            app.common.ajaxWithAfa({
	            	url: 'ESReportAction_getReportEXE.do',
	            	data: {
	            		"jsonObject": JSON.stringify({
	            			"reportId": reportId,
	            			"executeTime": date,
	            		}),
	            	}
	            }).done(function(content){
	            	$('.report-content .instance-item', $el).remove();
	            	generatorDashBoard(content.result);
	            })
			}


			function generatorDashBoard(data){
                var html = '';
                data.forEach(function(item, index){
                    if("boardRelationInfo" in item){
                        var data = {
                            "relation": {
                                "boardId": item.boardId,
                                "width": item.boardRelationInfo.width,
                                "height": item.boardRelationInfo.height,
                                "x": item.boardRelationInfo.x,
                                "y": item.boardRelationInfo.y
                            },
                            "title": item.boardRelationInfo.boardName,
                            "image": item.boardRelationInfo.image
                        };
                        html += `<div class="instance-item" boardid="${data.relation.boardId}" style="width:${data.relation.width}px;height:${data.relation.height}px;top:${data.relation.y}px; left:${data.relation.x}px;">
                                    <div class="instance-item-header">
                                        <p class="item-title">${data.title}</p>
                                        <div class="edit-group">
                                            <a href="javascript:void(0)">
                                                <i class="fa fa-reply"></i>
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
                    }

                });
                $('.report-content', $el).append(html);
                generatorCharts(data)
            }

			function generatorCharts(data) {
                var aggs = null,
                	paramData = null,
                	options = null,
                	borderEle = null;
                for (var i = 0; i< data.length; i++){
                    aggs = JSON.parse(data[i].result)[data[i].boardId];

                    if(aggs && !$.isEmptyObject(aggs)){
                    	paramData = JSON.parse(data[i].boardRelationInfo.statistics).paramData;
                    	options = staticEchartsTool.getOption(aggs, paramData);
                        borderEle = $('[boardid="'+ data[i].boardId +'"]', $el).find(".charts-item");
                        if(options){
                            app.echarts.init(borderEle[0]).setOption(options);
                        }else{
                            borderEle.html('<span style="color:#999;font-size:12px;font-weight:normal;">暂无数据～</span>');
                        }
                    }else{
                    	app.alert('title', '仪表盘数据获取异常', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                    }
                }
            }

			function frequencyTranslate(data){
				var result;
				switch(data){
					case "day": result = "天";break;
					case "week": result = "周";break;
					case "month": result = "月";break;
					case "year": result = "年";break;
				}
				return result;
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
                    if (newpos.left <= padding) {
                        newpos.left = padding;
                    }
                    if (newpos.top <= 100) {
                        newpos.top = 100;
                    }
                    if (newpos.left >= maxLeft) {
                        newpos.left = maxLeft;
                    }
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

            // 缩放事件
	        $(".report-content", $el).on("mousedown", ".resize-arrow", function (e) {
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var ela = $(this).closest(".instance-item")[0];
                var footer = this.parentNode;
                var instance = app.echarts.getInstanceByDom($(ela).find(".charts-item")[0]);

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
                    if (newInfo.width <= minWidth) {
                        newInfo.width = minWidth;
                    }
                    if (newInfo.height <= minHeight) {
                        newInfo.height = minHeight;
                    }
                    if (newInfo.width + newInfo.left > maxWidth) {
                        return;
                    }
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

            $(".download-report", $el).on('click', function(){
                app.shelter.show();
                // var style = $('#reportStyle', $el)[0].outerHTML;
                var printDiv = $('.report-content', $el)[0]
                // $('body').append('<iframe name="printReport" style="width: 210mm;height: 297mm;position: absolute;opacity: 0;" frameborder="0"></iframe>');
                // window.frames[0].document.body.innerHTML = style+printDiv;
                // window.frames[0].print();
                // $('[name="printReport"]', $el).remove();
                html2canvas(printDiv).then(function(canvas){
                    app.shelter.hide();
                    var dataUrl = canvas.toDataURL();
                    // var newImg = document.createElement("img");
                    // newImg.src = dataUrl;
                    // $('#printFrame', $el).append(newImg).printArea();//打印img，注意不能直接打印img对象，需要包裹一层div
                    // $('#printFrame', $el).html(''); 
                    var $a = $('<a href="'+ dataUrl +'" download="'+ report.reportName+'_'+ $('#executeTime', $el).val() +'" ></a>');
                    $('#printFrame', $el).append($a);
                    $a[0].click();
                    $('#printFrame', $el).html(''); 
                })

            })
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});