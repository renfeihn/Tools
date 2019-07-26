define(["jquery", "handlebars"], function($, hb) {
    return {

        load: function($el, scope, handler) {
            app.shelter.show('加载中。。。');
            var ACQTIME = scope.ACQTIME;
			var searchInput = scope.searchInput || '';
            var OPERATE = true;
            var searchString = '';//搜索的值
            var urlData = scope.urlData || {
                search: '*',
                startTime: '1970-01-01 08:00:00',
                endTime: '2018-07-30 16:40:30',
                cate: JSON.stringify({
                    "category": {
                        "cate1": [],
                        "cate2": [],
                        "cate3": []
                    },
                    "app": {
                        "cate1": [],
                        "cate2": [],
                        "cate3": []
                    },
                    "hosts": {
                        "host": ["10.9.3.158"]
                    }
                }),
                logType: 1,
                from: 0,
                total: -1,
                interval: 'year',
                format: 'yyyy',
                aggsTerm: '_head_.hostip',
                currentPath: '/home/aim/camaApp/log/app/20180806/aweb/C016/G1_aweb_C016_2.log',
                host: '10.9.3.168'
            };
            
            
            if (searchInput.indexOf('*') !== -1 
					|| searchInput.indexOf('|') !== -1) {
				searchInput = null;
			}
			
			if (!!searchInput) {
				$("#logSearch", $el).val(searchInput);
				searchString = searchInput;
			}
            
            $('#fileName', $el).text(urlData.currentPath);
            var SIZE = 200; //加载日志的行数,n>0:向后加载n行, n < 0 :向前加载n行;
            var page = {
                start: 0,
                end: 0
            }
            var parentArr = [];
            var currPage = 0;

            function HTMLDecode(text) {
                var temp = document.createElement("div");
                temp.innerHTML = text;
                var output = temp.innerText || temp.textContent;
                temp = null;
                return output;
            }

            function HTMLEncode(html) {
                var temp = document.createElement("div");
                (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
                var output = temp.innerHTML;
                temp = null;
                return output;
            }

            function darwLog(logData, count) {
                var $pageInfo = $('#pageInfo', $el);
                var html = '';
                var $obj = $(".logFileDetail-logContent", $el);
                $obj.html($obj.html().replace(/<span class="keywords">/g,'').replace(/<\/span>/g,''));
                removeElement($obj, count);
                if (count >= 0) {
                    for (var i = 0; i < logData.length; i++) {
                        if (parentArr.indexOf(logData[i].PARENT) >= 0) {
                            html += '<p data-type="0" beforecontent="' + (++page.end) + '" acqTime="' + logData[i].ACQTIME + '">' + HTMLEncode(logData[i].LOG) + '</p>';
                        } else {
                            html += '<p data-type="0" beforecontent="' + (++page.end) + '" acqTime="' + logData[i].ACQTIME + '">' + HTMLEncode(logData[i].LOG) + '</p>';
                        }
                    }
                    if($('.load-more',$el).length == 0){
                        $obj.append(`<p class="load-more"><i class="fa fa-angle-double-down" aria-hidden="true"></i> 点击加载下一页</p>`);
                    }else{
                        $('.load-more',$el).html(`<i class="fa fa-angle-double-down" aria-hidden="true"></i> 点击加载下一页`);
                    }
                    $('.load-more', $el).before(html);
                    if($('.load-less',$el).length == 0){
                        $obj.prepend(`<p class="load-less"><i class="fa fa-angle-double-up" aria-hidden="true"></i> 点击加载上一页</p>`);
                    }else{
                        $('.load-less',$el).html(`<i class="fa fa-angle-double-up" aria-hidden="true"></i> 点击加载上一页`);
                    }
                    if(searchString){
                    	highlightString()
                	}
                } else if (count < 0) {
                	
                    var lenth = logData.length || 0;
                    for (let i = logData.length - 1; i >= 0; i--) {
                        if (parentArr.indexOf(logData[i].PARENT) >= 0) {
                            html = '<p data-type="0" beforecontent="' + (page.start--) + '" acqTime="' + logData[i].ACQTIME + '">' + HTMLEncode(logData[i].LOG) + '</p>' + html;
                        } else {
                            html = '<p data-type="0" beforecontent="' + (page.start--) + '" acqTime="' + logData[i].ACQTIME + '">' + HTMLEncode(logData[i].LOG) + '</p>' + html;
                        }
                    }
                    var $next = $('.load-less', $el).next();
                    
                    if($('.load-more',$el).length == 0){
                        $obj.append(`<p class="load-more"><i class="fa fa-angle-double-down" aria-hidden="true"></i> 点击加载下一页</p>`);
                    }else{
                        $('.load-more',$el).html(`<i class="fa fa-angle-double-down" aria-hidden="true"></i> 点击加载下一页`);
                    }
                    $('.load-less', $el).after(html);
                    if($('.load-less',$el).length == 0){
                        $obj.prepend(`<p class="load-less"><i class="fa fa-angle-double-up" aria-hidden="true"></i> 点击加载上一页</p>`);
                    }else{
                        $('.load-less',$el).html(`<i class="fa fa-angle-double-up" aria-hidden="true"></i> 点击加载上一页`);
                    }
                    // 使上一页展示的更优雅 start
                    $next[0].scrollIntoView(true);
                    var top = $obj.scrollTop();
                    $obj.scrollTop(top-9.5-18);
                    if(searchString){
                    	highlightString()
                	}
                    // 使上一页展示的更优雅 end
//                    $('.currentPage', $pageInfo).text(Math.ceil(page.start / SIZE));
                }
                var len = page.end + '';
                len = len.length;
                $('p', $obj).css('padding-left', '40px');
                app.shelter.hide();
                if (currPage === parseInt($(".totalPage", $el).text())) {
                	$('.load-more', $el).addClass('noMore').html(`已经到底了`);
                }
            }
            
            function highlightString() {
            	var $oldhtml_p;
				if(typeof($oldhtml_p) == 'undefined'){
					$oldhtml_p = $("#logFileDetailContent>p", $el);
				}
				$oldhtml_p.each(function(){
					if ($(this).attr('data-type')) {
						var this_html = $(this).html();
						var newhtml = this_html;
						if (searchString !== '') {
							newhtml = searchByGI(this_html, searchString);
						}
						$(this).html(newhtml);
					}
				})
			};
			
			function searchByGI(oldHtml, inpVal) {
				inpVal = inpVal.replace(/"|'|“|”|’|‘/g,'');
				let allVal = oldHtml.match(new RegExp(inpVal, 'ig'));
				let texts = oldHtml;
				let uuid = app.global.getUniqueId();
				texts = texts.replace(new RegExp(inpVal, 'ig'), uuid);
	            if (allVal) {
	                for (let j = 0; j < allVal.length; j ++) {
	                    texts = texts.replace(uuid, '[*' + j + '*]');
	                    // console.log(allVal[j],'[*' + j + '*]',texts)
	                }
	                for (let i = 0; i < allVal.length; i ++ ) {
	                    texts = texts.replace('[*' + i + '*]', '<span class="keywords">' + allVal[i] + '</span>');
	                }
	            }
	            return texts;
			}
    
            function removeElement($obj, count) {
                var interval = page.end - page.start;
                if (interval > SIZE * 2) {
                    var subcount = interval - SIZE * 2;
                    if (count > 0) {
                        if($('.load-less', $el).length > 0){
//                            $obj.children('p:eq(201)').prevAll().remove();
                        }else{
//                            $obj.children('p:eq(200)').prevAll().remove();
                        }
                        /*$obj.prepend(`<p class="load-less"><i class="fa fa-angle-double-up" aria-hidden="true"></i> 点击加载上一页</p>`);*/
                        page.start += subcount;
                    } else {
//                        $obj.children('p:eq(400)').nextAll().remove();
//                        $obj.append(`<p class="load-more"><i class="fa fa-angle-double-down" aria-hidden="true"></i> 点击加载下一页</p>`);
                        page.end -= subcount;
                    }
                }
            }

            getLogContext(urlData.currentPath, SIZE, urlData.host).then(function(data) {
                if (data) {
                    darwLog(data, SIZE);
                }
            })
            
            $("#logSearch", $el).on("keyup", function(e) {
				if(e.keyCode === 13) {
					$(".logSearchBtn", $el).click();
				}
			});

			$(".logSearchBtn", $el).on("click", function() {
				currPage = 0;
				$('.logFileDetail-logContent', $el).empty();
				page = {
	                start: 0,
	                end: 0
	            }
				searchString = $("#logSearch", $el).val();
				getLogContext(urlData.currentPath, SIZE, urlData.host).then(function(data) {
                    if (data) {
                        darwLog(data, SIZE);
                    }
                })
			});

            /*日志面板设置*/
            $(".logFileDetail-settings", $el).on('click', '.font-small', function(event) {
                event.preventDefault();
                if ($(this).hasClass('disabled')) {
                    return;
                }
                var currentSize = parseInt($(".logFileDetail-logContent", $el).css('font-size'));
                if (currentSize <= 14) {
                    $(this).addClass('disabled');
                }
                $(".logFileDetail-settings .font-bigger", $el).removeClass('disabled');
                $(".logFileDetail-logContent", $el).css({
                    'font-size': (currentSize - 2) + 'px',
                });
            }).on('click', '.font-bigger', function(event) {
                event.preventDefault();
                if ($(this).hasClass('disabled')) {
                    return;
                }
                var currentSize = parseInt($(".logFileDetail-logContent", $el).css('font-size'));
                if (currentSize >= 100) {
                    $(this).addClass('disabled');
                }
                $(".logFileDetail-settings .font-small", $el).removeClass('disabled');
                $(".logFileDetail-logContent", $el).css({
                    'font-size': (currentSize + 2) + 'px',
                });
            }).on('click', '.font-color', function(event) {
                event.preventDefault();
                $(".logFileDetail-logContent", $el).toggleClass('green');
                if ($(this).hasClass('green')) {
                    $(this).attr('title', '黑底绿字');
                } else {
                    $(this).attr('title', '白底黑字');
                }
                $(this).toggleClass('green');
            });

            // 加载更多
            $('.logFileDetail-logContent', $el).on('click', '.load-more', function(){
                var $this = $(this);
                if($this.hasClass("loading") || $this.hasClass("noMore")){
                    return;
                }
                $this.addClass("loading");
                var acqTime = $this.prev().attr('acqTime');
                if (acqTime) {
                    $this.html(`<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> 努力加载中...`);
                    OPERATE = false;
                    getLogContext(urlData.currentPath, SIZE, urlData.host, acqTime).then(function(data) {
                        $this.removeClass("loading");
                        if (data && data.length > 0) {
                            darwLog(data, SIZE);
                        } else {
                            $this.addClass('noMore').html(`已经到底了`);
                        }
                    });
                }
            }).on('click', '.load-less', function(){
                var $this = $(this);
                if($this.hasClass("loading")){
                    return;
                }
                
                $this.addClass("loading");
                var acqTime = parseInt($this.next().attr('acqTime'));
                var beforecontent = $this.next().attr('beforecontent');
                if (acqTime && beforecontent <= "1") {
                    $this.html(`<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> 努力加载中...`);
                    getLogContext(urlData.currentPath, SIZE, urlData.host, -acqTime).then(function(data) {
                        $this.removeClass("loading");
                        if (data && data.length > 0) {
                            darwLog(data, -SIZE);
                        } else {
                            $this.remove();
                        }
                    });
                }
            })

            function getResultIds(urlData) {
                return app.common.ajaxWithAfa({
                    url: 'ESSearchAction_searchId.do',
                    data: urlData
                }).done(function(data) {
                    return $.Deferred().resolve(data);
                })
            }

            function getLogContext(fileName, size, host, acqTime) {
                var resultArr = [];
                var leftIds = null;
                if (currPage !== 0) {
                	leftIds = urlData['leftIds'];
                }
                return app.common.ajaxWithAfa({
                    url: 'ESSearchAction_getContextByFile.do',
                    data: {
                        fileName: fileName,
                        size: size,
                        acqTime: ACQTIME || acqTime,
                        host: host,
                        index: urlData.index,
                        total: urlData.total,
                        search:searchString,
                        leftIds: leftIds,
                    }
                }).then(function(data) {
                	ACQTIME = null;
                    if (data.result && !$.isEmptyObject(data.result)) {
                        var $pageInfo = $('#pageInfo', $el);
                        var result = data.result;
                        if (result.logs && result.logs.length > 0) {
                            resultArr = result.logs;
                        }
                        if (result.count) {
                        	let pageNum = Math.ceil(result.count/size);
                        	urlData.total = result.count;
                        	urlData['leftIds'] = result.leftIds;
                            $('.totalPage', $pageInfo).text(pageNum);
                        }
                        if (result.size) {
                        	$('.size', $pageInfo).text(transforNumber(result.size));
                        }
                        $(".currentPage", $el).text(++currPage);
                        return resultArr;
                    } else {
                         app.shelter.hide();
                         app.alert("未查询到结果");
                    }
                })
            }

            function transforNumber(number) {
                var GB = 1024*1024*1024;
                var MB = 1024*1024;
                var KB = 1024;
                if(number > GB) {
                    return (number/GB).toFixed(2) + ' GB';
                }else if(number > MB) {
                    return (number/MB).toFixed(2) + ' MB';
                }else if(number > KB) {
                    return (number/KB).toFixed(2) + ' KB';
                }else{
                    return number + 'B';
                }
            }
        },

        unload: function(handler) {

        },

        pause: function($el, scope, handler) {

        },

        resume: function($el, scope, handler) {

        }
    };
});