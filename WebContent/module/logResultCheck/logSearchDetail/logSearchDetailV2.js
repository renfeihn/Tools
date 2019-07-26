define(["jquery", "handlebars"], function($, hb){
	var echarts_bar = null; 
	var OPERABLE = true;
	var logStatisticsViewObj = null;//统计页dispacter返回
	var sqlSearchStatisticsViewObj = null;
	var resizeId = app.global.getUniqueId();
  return {
    load: function($el, scope, handler) {
    	var dashboardId = scope.param && scope.param.dashboardId;
    	var searchText = scope.param && scope.param.searchText;//个人首页搜索条件
    	var searchTime = scope.param && scope.param.searchTime;//个人首页搜索条件
    	var fileTableData = [];
    	var sqlSearchFlag = false;
    	var isKeyWordSearch = true;
    	var fieldName = null;
    	var echartsType = 1;
//    		dashboardId = 100029;
    	var	urlData={},//查询参数
	 		clickEchartsDate = '',//点击echarts柱状图保存日期（以便深层点击时传参使用）
	 		Fields = {},//记录字段
	 		choosedFields = [],//已选字段
	 		isSqlSearch,
	 		isQuickFilter,
	 		sqlSearchData;//
	 	var logStatisticsViewConfig;//统计也配置信息
	 	var sourceIdArr = [];
	 	var dataBordName = null;
	 	var clickSearch = true;
	 	var hideData=['index','_head_.eventsize','_routing','_head_.eid','_id','_head_.acqtime','_head_.level','_head_.type','__context__','__struct__','logjoin'],
	 		showData=['_head_.appname', '_head_.hostip', '_head_.category1', '_head_.category2', '_head_.category3'];
	 	var commandList = [];
	 	
		var tipsMap={};
		var fieldNameMap = [];
		var fieldOrContent = false;	// true 为字段 false为 正文
		var scrollY = 'calc(100vh - 240px)';
    	var $logTable = null;
    	
    	var $warningModal = $('#warningModal', $el),//预警模态框
    		eventModel;
    	var sourceIds; //日志源IDs
    	var $fileTable;
    	var fieldCurrent = [];
    	var firstChange = false;
    	var lastSort = null;
    	var firstSort = null;
    	var oldData = null;
    	var ShowBtnflag = false;
    	
    	
    	function setSort (datas) {
    		if (datas.length === 0) {
    			return;
    		}
    		lastSort = datas[datas.length - 1].sort;
    		firstSort = datas[0].sort;
    	}
    	
    	$el.on("click", '#logTable_paginate>a', function () {
    		var id = $(this).attr('id');
    		if (id === 'logTable_last') {
    			ShowBtnflag = true;
    			$("#logTable_previous,#logTable_next", $el).hide();
    		} else {
    			ShowBtnflag = false;
    			$("#logTable_previous,#logTable_next", $el).show();
    		}
    	})
    	
    	initTable();
    	function initTable () {
    		$logTable && $logTable.destroy();
    		$logTable = $("#logTable", $el).DataTable({
        		"scrollY": scrollY,
        		"scrollX": true,
    			'pagingType': 'full_numbers',
    			'searching': false,
    			'bPaginate': true, // 开关，是否显示分页器
    			'bStateSave': false,
    			'bSort': false,// 排序
    			'pageLength': 10,
    			"serverSide": true,
    			'bAutoWidth': false,
    			"ajax": function(data, callback, settings) {
    				urlData.from = data.length == 0 ? 0 : data.start;
    				tmpUrlData = $.extend(true, {}, urlData);
    				if(!tmpUrlData.search){
    					return;
    				}
    				var tmpArr = tmpUrlData.search.split('|');
    				if (isSqlSearch){
    					tmpUrlData.search = $.trim(tmpArr[0]);
    				}
    				if (isKeyWordSearch) {
    					if (data.start === 0) {		// 首页
    						tmpUrlData.sort && (delete tmpUrlData.sort)
    					} else if (oldData && (data.start + data.length > oldData['dataLen'])) {	// 尾页
    						tmpUrlData.sort && (delete tmpUrlData.sort)
    					} else if (oldData && oldData.start > data.start) {  //上一页
    						tmpUrlData['sort'] = firstSort;
    					} else if (oldData && oldData.start < data.start) {	 //下一页
    						tmpUrlData['sort'] = lastSort;
    					}
    				}
    				oldData = data;
    				app.common.ajaxWithAfa({
    					url: "ESSearchAction_search.do",
    					data: tmpUrlData
    				}).done(function(mdata) {
    					$('[field-role]', $('#tabs11', $el)).remove();
    					var datas = mdata.result && mdata.result.result || [];
    					var elements = mdata.result && mdata.result.total || 0;
    					sourceIds = mdata.result && mdata.result.trees && mdata.result.trees.sourceids||[];
    					sqlSearchFlag = true;
    					oldData['dataLen'] = mdata.result.total;
    					setSort(datas);
    					if(sourceIds.length > 0 && !NOTREFRESHFIELDS){
    						if (sourceIdArr.length === 0) {
    							sourceIdArr = [].concat(sourceIds);
    							var tmpArr = [];
    							sourceIdArr.forEach(function (item) {
    								if(item.sourceid){
    									tmpArr.push(parseInt(item.sourceid));
    								}
    							})
    							getFields(tmpArr).then(function (data) {
    								setLogSearchView(datas,elements,callback,mdata);
    							})
    						} else {
    							setLogSearchView(datas,elements,callback,mdata);
    							app.shelter.hide()
    						}
//    						if(tmpArr.length > 0 && $('#logUsed span', $el).length == 0 && $('#logChoosed span[data]', $el).length == 0){
//    							getFields(tmpArr).then(function (data) {
//    								setLogSearchView(datas,elements,callback,mdata);
//    							})
//    						}else{
//    							setLogSearchView(datas,elements,callback,mdata);
//    						}
    					}else{
    						app.shelter.hide()
    						setLogSearchView(datas,elements,callback,mdata);
    					}
    					
//    					setTimeout(function () {
//    						let spanData = $("#logChoosed>span[data]", $el);
//    						Array.prototype.forEach.call(spanData, function (item){
//    							console.log(item.getAttribute('data'))
//    							addField(item.getAttribute('data'))
//    						});
//    					}, 200)
    					
    				});	
    			},
    			"fnDrawCallback": function(s) {
    				addLogTableColoums(choosedFields);
    				$("#logTable", $el).find('tr').removeAttr('title');
    				$("#logTable tbody tr td", $el)[0].scrollIntoView({block: "start"});
    				if (!ShowBtnflag) {
    					$("#logTable_previous,#logTable_next", $el).show();
    				} else {
    					$("#logTable_previous,#logTable_next", $el).hide();
    				}
    			},
    			'columns':[{
    				data: 'index',defaultContent:'',sWidth:"60"
    			},{
    				data: '',defaultContent:'',sWidth:"100"
    			},{
    				data: 'start',defaultContent:'',sWidth:"90"
    			},{
    				data: '__context__',defaultContent:'',sWidth:"80%"
    			}],
    			'aoColumnDefs': [{
    				'render':function(data,type,row,meta){
    					return '<i title="分享" class="fa fa-share-alt" style="margin-left: 6px;"></i>'+
    							'<div class="log-Share"><i class="fa fa-envelope-o" title="邮件"></i><i class="fa fa-weixin" style="margin-left: 6px;" title="微信"></i><i class="fa fa-qq" style="margin-left: 6px;" title="腾讯通"></i></div>';
    				},
    				'targets': 1
    			},{
    				'render':function(data,type,row,meta){
    					var timeStr = row['start'];
    					if(!timeStr || timeStr == ''){
    						return '-';
    					}else{
    						return new Date(timeStr).Format('yyyy-MM-dd hh:mm:ss');
    					}
    				},
    				'targets': 2
    			},{
    				'render':function(data, type, row, meta){
    					var html = '<p><i class="fa fa-caret-right spread"></i>';
    					if(!$.isEmptyObject(row)){
    						var showHtml = '';
    						var hideHtml = '';
    						for (var key in row) {
    							if(hideData.indexOf(key) < 0 && showData.indexOf(key)>=0){
    								showHtml += '<span><span class="field">'+key+'</span> = <span>'+row[key]+'</span></span>';
    							}else if(key == '__struct__' && !$.isEmptyObject(row[key])){
    								for(var i in row[key]){
    									if(hideData.indexOf('__struct__.'+key) < 0 && showData.indexOf('__struct__.'+key)>=0){
    										showHtml += '<span><span class="field">__struct__.'+i+'</span> = <span>'+row[key][i]+'</span></span>';
    									}else if(hideData.indexOf('__struct__.'+key) < 0){
    										hideHtml += '<span><span class="field">__struct__.'+i+'</span><span>'+row[key][i]+'</span></span>';
    									}
    								}
    							}else if(hideData.indexOf(key) < 0){
    								if(key == '_head_.file'){
    									hideHtml += '<span><span class="field">'+key+'<a href="#">查看文件</a></span><span>'+row[key]+'</span></span>';
    								}else{
    									if(key == 'sysdate'||key=='start'||key=='stop'||key=='_head_.filetime'){//处理时间格式
    										hideHtml += '<span><span class="field">'+key+'</span><span>'+new Date(row[key]).Format('yyyy-MM-dd hh:mm:ss')+'</span></span>';
    									}else{
    										hideHtml += '<span><span class="field">'+key+'</span><span>'+row[key]+'</span></span>';
    										
    									}
    								}
    							}
    						}
    						html += showHtml;
    					}
    					html+= '</p><p>'+hideHtml+'</p>';
    					if(data && data instanceof Array){
    						html+='<div class="logContext" data-target="#content-menu" data-toggle="context">';
    						var len = data.length;
    						for (var i = 0; i < 10 && i < len; i++) {
    							if(data[i] && data[i].LOG){
    								data[i].LOG = data[i].LOG.replace(/<!--/g,'&lt;!--').replace(/↵/g,"<br>");
//    								data[i].LOG = setSelect(data[i].LOG);
    								html += '<p data-parent="'+data[i].PARENT+'" data-ACQTIME="'+data[i].ACQTIME+'" ACQTIME="'+data[i].ACQTIME+'" LOGTIME="'+data[i].LOGTIME+'"><span class="showContext" title="日志上下文查看"></span><span class="logText">'+data[i].LOG+'</span></p>';
    							}
    						}
    						
    						html+="</div>";
    						if(data.length>=10){
    							html+='<div class="opeate"><a class="more">查看更多</a><a class="up" style="display:none;">收起</a></div>';
    						}
    					}else{
    						html+= '<div class="logContext"><p><span class="showContext"  title="日志上下文查看"></span><sapn class="logText">'+(data||'')+'</p></sapn></div>';
    					}
    					return html;
    				},
    				'targets': 3
    			}]
    		});
    	}
    	
    	function setSelect (str) {
    		var str1 = str.split('<span style="background:#fffe54">');
    		str1 = str1.map(strTmp1 => {
    			var str11 = strTmp1.split('</span>');
    			str11 = str11.map(item => {
    				var tmp = item.replace(/<!--/g,'&lt;!--').replace(/↵/g,"<br>").split('<br>');
    				tmp = tmp.map(strTmp => {
    					return strTmp.replace(/<\?/g,'&lt;?').replace(/</g,'&lt;').replace(/<\//g,'&lt;/')
    				})
    				tmp = tmp.join('<br>');
    				return tmp;
    			})
    			str11 = str11.join('</span>');
    			return str11;
    				
    		})
    		return str1.join('<span style="background:#fffe54">')
    	}

    	function setLogSearchView(datas,elements,callback,mdata) {
    		if (isSqlSearch) {
    			loadSqlSearchStatisticsView()
    		}
    		if(datas && datas.length > 0) {
    			datas.forEach(function(items, index){
    				items.index = urlData.from+index + 1;
    			});
    			$('.logSearchDetail-logInfo',$el).removeClass('noData');
    			$('[view-role="fileView"]', $el).hide().prev().show();
    			$('#reStructData', $el).show();
    			$('#dataService', $el).show();
    			if(dashboardId){
    				$('.logSearchDetail-logInfo li>a',$el).eq(1).trigger('click');
    				dashboardId = undefined;
    			}else if(!isSqlSearch){
    				$('.logSearchDetail-logInfo li>a',$el).eq(0).click();
    			}
    			$('.logSearchDetail-viewChange i:first', $el).addClass('active')
    			.siblings().removeClass('active').attr('loadAble','true');
    		}else {
    			if (!isSqlSearch){
    				$('.dataTables_paginate', $el).eq(0).removeClass('logSearchDetails-paginate');
    				$('.logSearchDetail-logInfo',$el).addClass('noData');
    				$('[view-role]', $el).hide();
    				app.shelter.hide();
    				app.alert('无满足条件的记录');
    			}
    		}
    		if(!isQuickFilter && mdata.result){
    			if (!$('#quickSearchHide',$el).hasClass('fa-chevron-right')) {
    				getAggsApp()
    			}
    		}else{
    			isQuickFilter = false;
    		}
    		app.shelter.hide();
    		$('#logCount', $el).text(formatLogCount(elements));
    		callback({
    			data: datas,
    			recordsFiltered: elements
    		});
    	}
    	
    	/**
    	 * 精简模式与普通模式进行切换
    	 */
    	$("#modalShow", $el).on("click", function (e) {
    		e.stopPropagation();
    		var id = parseInt(this.dataset.id);
    		switch(id) {
	    		case 0:
	    			$(this).attr('data-id', '1').attr('title','切换至精简模式');
	    			showOther()
	    			break;
	    		case 1:
	    			$(this).attr('data-id', '0').attr('title','切换至普通模式');
	    			closeOther()
	    			break;
    		}
    	})
    	
    	function closeOther() {
    		$(".logSearchDetail-echartsContent", $el).css('height', '0');
    		$(".logSearchDetail-logInfo", $el).css('height', '100%');
    		scrollY = 'calc(100vh - 240px)';
    		$('#logTabHide',$el).addClass('hide');
    		//$('#fieldContentFyc',$el).addClass('move');
    		$('#logTabHide',$el).trigger("click");
    		$('li[data-id="sourceNoKeyWord"]', $el).hide();
    		$('div[view-role="tableView"]>ul>li:eq(0)>a', $el).trigger("click");
    		setTimeout(function  () {
//    			$logTable.clear()
//    			initTable();
//        		$logTable.draw();
    		}, 201)
    	}
    	
    	function showOther() {
    		$(".logSearchDetail-echartsContent", $el).css('height', '100px');
    		$(".logSearchDetail-logInfo", $el).css('height', 'calc(100% - 98px)');
    		$('#logTabHide',$el).removeClass('hide');
    		$('#logTabHide',$el).trigger("click");
    		$('li[data-id="sourceNoKeyWord"]', $el).show();
    		scrollY = 'calc(100vh - 340px)';
    		setTimeout(function  () {
    			echarts_bar = app.echarts.init($("#logEcharts", $el)[0]);//echarts初始化
        		initEventCharts()
        		var date = $('#dateSetectInput', $el).val().trim().split('~');
        		var startTime = date[0];
        		var endTime = date[1];
        		var timeRange = (new Date(endTime) - new Date(startTime))/1000;
        		!firstChange && showCharts(timeRange)
        		firstChange = true;
//        		$logTable.clear()
//        		initTable();
//        		$logTable.draw();
    		}, 201)
    	}
    	
    	function getModalShow() {
    		var id = $("#modalShow", $el).attr('data-id');
    		return parseInt(id);
    	}

    	$("#toPage", $el).on("keydown",function(e){
    		var e = e || window.event;
    		var keycode = e.keycode || e.which;
    		var leaf = parseInt($(this).val());
    		var settings = $logTable.settings();
    		if(leaf <= 0){
    			return;
    		}
    		if(keycode === 13){
    			$logTable.page(leaf-1).draw("page");
    		}
    	})

    	function formatLogCount(num) {
			var num = (num || 0).toString(), result = '';  
		    while (num.length > 3) {  
		        result = ' , ' + num.slice(-3) + result;  
		        num = num.slice(0, num.length - 3);  
		    }  
		    if (num) { result = num + result; }
		    return result;
    	}

    	function addResizeHandler(){
	    	app.screen.addResizeHandler({
	    		uid: resizeId,
	    		timeout: 500,
	    		isGlobal: true,
	    		callback: function(){
	    			var ths = $('#logTable thead th', $el);
					if(ths.length > 4){
						$('#logTable thead', $el).attr({
							'style': 'visibility:collapse;'
						});
					}
					$('.logSearchDetail-logInfo li>a',$el).eq(0).click();
					$('.logSearchDetail-viewChange i:first', $el).addClass('active')
					.siblings().removeClass('active');
					NOTREFRESHFIELDS = true;
					$logTable.draw(false);
					echarts_bar && echarts_bar.resize();
	    		},
	    	});
    	}
    	addResizeHandler();
//    	//关键字搜索
//    	$("#searchKeyWord",$el).click(function (e, notRefreshFields, isQuickSearch , notResetUrlData) {
//    		isKeyWordSearch = true;
//    		$("#searchBtn",$el).trigger('click', [undefined, undefined, undefined, true]);
//    	})true,false,true
    	//点击搜索
    	
    	function logOperationBean(params) {
    		var param = {
    			type: 1,
    			appids: getAppIdsRecord().join(','),
    			param: params
    		}
    		app.common.recordLogOperete({logOperationBean: JSON.stringify(param)});
    	}
    	
    	$("#searchBtn",$el).click(function(e, notRefreshFields, isQuickSearch , notResetUrlData, keyWordCheck){
    		if ($(this).hasClass('disabled')) {
    			app.alert('当前用户没有查询权限，请联系管理员！')
    			return;
    		}
    		ShowBtnflag = false;
    		fieldCurrent = [];
    		sourceIdArr = [];
    		sqlSearchFlag = false;
    		clickSearch = true;
    		isSqlSearch = false;
    		firstChange = false;
    		if (typeof(notRefreshFields) == "undefined") {
    			notRefreshFields = false;
    		}
    		if($('#modalShow',$el).attr('data-id') == 1){
    			$('#logTabHide',$el).trigger("click");
    			$('#logChoosed',$el).parent().parent().removeClass('move');
    			$('li[data-id="sourceNoKeyWord"]', $el).show();
    		} else {
    			$('li[data-id="sourceNoKeyWord"]', $el).hide();
    		}
    		var searchInput = $('#searchInput', $el).text().trim();
    		if(searchInput == ''){
    			app.alert("请填写搜索条件。");
    			return;
    		}
    		if(!searchTime){//新建搜索传时间时 不触发，默认采用传进来的时间搜索
    			$('#dataRangeSetectBtn', $el).click();
    		}
    		var date = $('#dateSetectInput', $el).val().trim().split('~');
    		var startTime = date[0];
    		var endTime = date[1];
    		var timeRange = (new Date(endTime) - new Date(startTime))/1000, interval = undefined,format = undefined;
    		if(timeRange < 0){
    			app.alert('结束时间应大于起始时间');
    			return;
    		}
    		app.shelter.show('加载中。。。');
    		var logType = $('#accessLog',$el).attr('data-val');
    		if(!notResetUrlData){
    			urlData = {
    				'search': searchInput,
    				'startTime': startTime,
    				'endTime': endTime,
    				'cate': getAccessLogSetting(),
    				'appIds': getAppId(),
    				'logType':logType,
    				'size': 10,
    				'from': 0
    			}
    		}else{
    			urlData.startTime = startTime;
    			urlData.endTime = endTime;
    			urlData.size = 10;
    			$('.logSearchDetail-viewChange i:first', $el).addClass('active')
    			.siblings().removeClass('active');
    		}
    		logOperationBean(urlData);
    		
    		if(!isQuickSearch){
    			$('#quickSearchs>span', $el).removeClass('active');
    		}
	    	logStatisticsViewObj && app.dispatcher2.unload('logStatisticsView');
    		logStatisticsViewObj = null;
    		
    		sqlSearchStatisticsViewObj && app.dispatcher2.unload('sqlSearch');
    		sqlSearchStatisticsViewObj = null;
    		$('#sqlSearchList>span', $el).removeClass('active');
    		sourceIds = null;
    		echarts_bar && echarts_bar.clear();
    		$('#logEchartsLable', $el).css('visibility', 'hidden');
    		$('#logEchartsLable>span:first', $el).addClass('active').siblings().removeClass('active');
    		$('#reStructData', $el).hide();
    		$('#dataService', $el).hide();
    		// 包含' | ',sqlSearch接口
    		if(searchInput.split('|').length > 1){
    			$('li[data-id="sourceNoKeyWord"]', $el).show();
    			var firstIndex = searchInput.indexOf('|');
    			var searchTmp = searchInput.substring(0, firstIndex);
    			if (searchTmp.trim() === "") {
    				searchInput = '*' + searchInput.substring(firstIndex)
    			}
    			$('#sqlSearch', $el).show().siblings().hide();
				sqlSearchData = undefined;
				isSqlSearch = true;
				var tmpText = $.trim(searchInput.split('|')[1]);
				if(/^SELECT/gi.test(tmpText)){
					sqlSearch(urlData).then(function (data) {
						if(data.result && !$.isEmptyObject(data.result)){
							getNormalSearchData(timeRange, notRefreshFields);
						}
					});
				}else{
					splSearch(urlData).then(function (data) {
						if(data.result && !$.isEmptyObject(data.result)){
							getNormalSearchData(timeRange, notRefreshFields);
						}
					});
				}
    		}else{
    			$('#normalSearch', $el).show().siblings().hide();
    			getNormalSearchData(timeRange, notRefreshFields);
    		}
    		
    	});
    	
    	function getFieldId () {
    		return app.common.ajaxWithAfa({
				url: "ESSearchAction_search.do",
				data: tmpUrlData
			}).done(function(mdata) {
				return $.Deferred().resolve(mdata);
			});
    	}

    	function getNormalSearchData(timeRange, notRefreshFields) {
    		if(!notRefreshFields){
				choosedFields = [];
//				Fields = {};
				NOTREFRESHFIELDS = false;
			}else{
				NOTREFRESHFIELDS = true;
			}
    		/* 是sql查询或者spl查询 */
    		if (isSqlSearch) {
    			loadSqlSearchStatisticsView();
    		} else {
    			$logTable.clear().draw();
    		}
    		
    		if (getModalShow()) {
    			showCharts(timeRange)
    		}
    	}
    	
    	function showCharts (timeRange) {
    		if(timeRange > 3600*24*366){
    			interval = 'year';
    			format = "yyyy";
    		}else if(timeRange >= 3600*24*32){
    			interval = 'month';
    			format = "yyyy-MM";
    		}else if(timeRange >= 3600*24){
    			interval = 'day';
    			format = "yyyy-MM-dd";
    		}else if(timeRange >= 3600){
    			interval = 'hour';
    			format = "yyyy-MM-dd hh";
    		}else if(timeRange >= 60){
    			interval = 'minute';
    			format = "yyyy-MM-dd hh:mm";
    		}else if(timeRange >= 1){
    			interval = 'second';
    			format = "yyyy-MM-dd hh:mm:ss";
    		}
    		initEchartsData($.extend(urlData,{'interval':interval,"format":format,'aggsTerm':'start'}));
    	}

    	$('.logSearchDetail-dateRangeChooseBtn', $el).on('click', function(event) {
    		$('#dataRangeSetectBtn', $el).click();
    	});
    	$('#dataRangeSetectBtn', $el).on('click', function(event) {
    		var index = $('#dateRangeTab>li.active',$el).index();
    		if(!index){
    			var func = $('#quickRange>li.active', $el).attr('data-func');
    			var timeInterval = $('#quickRange>li.active', $el).text();
    			if(func){
    				var dates = getQuickTimeAndDate(func);
    				$('#dateSetect', $el).text(timeInterval+'内');
    				$('#dateSetectInput', $el).val(dates.sDate +'~'+ dates.eDate);
    			}
    		}else{
    			var sDate, eDate;
    			if (isEchartsRefresh && $("#dateSetect", $el).text().indexOf('~') !== -1) {
    				isEchartsRefresh = false
    				sDate = $("#dateSetect", $el).text().split('~')[0];
        			eDate = $("#dateSetect", $el).text().split('~')[1];
    			} else {
    				sDate = $('[name="daterangepicker_start"]', $el).val();
        			eDate = $('[name="daterangepicker_end"]', $el).val();
    			}
    			$('#dateSetect', $el).text(sDate +'~'+ eDate);
    			$('#dateSetectInput', $el).val(sDate +'~'+ eDate);
    			$('#quickRange>li.active', $el).removeClass('active');
    			if ($("#dateSetect", $el).text().indexOf('~') !== -1) {
    				$('#dateRangeTab>li:eq(1)', $el).data('daterangepicker').setStartDate(sDate)
        			$('#dateRangeTab>li:eq(1)', $el).data('daterangepicker').setEndDate(eDate)
        			
    			}
    		}
    		$(this).parent().parent().hide();
    		event.stopPropagation();
    	});

    	/**
		 * 初始化
		 */
		(function() {
			$('#reStructData', $el).hide();
			$('#dataService', $el).hide();
			$('#quickRange>li:eq(0)',$el).addClass('active'); // 当日
			$('#dataRangeSetectBtn', $el).click();
			getQuickSearchs('1',function(data){
				var html = "";
				if(data && data.length){
					data.forEach(function(item,index){
						html += '<span data-id="'+item.id+'"><i class="fa fa-search"></i>'+item.searchName+'</span>';
					});
					$('#quickSearchs', $el).html(html).parent().show();
					$('#addQuickSearch',$el).hide();
					if(data.length<10){
						$('#downQuickPage',$el).addClass('disabled').attr('data-val', '2');
					}else{
						$('#downQuickPage',$el).removeClass('disabled').attr('data-val', '2');
					}
					$('#upQuickPage',$el).addClass('disabled').attr('data-val', '1');
				}else{
					$('#quickSearchs', $el).parent().hide();
					$('#addQuickSearch',$el).show();
				}
			});
			// if(!scope.param||!scope.param.logSettingHtml){// 带参数的搜索跳转 (带三级分类搜索条件代码的  不重新加载三级分类条件)
				// getObjectCategory();
			// }
			$.when(getSPLTips(),getFieldsTips(),getObjectCategory()).done(function () {
				// 带参数的搜索跳转
				if(scope.param && scope.param.searchInput){
					$('#dateSetectInput',$el).val(searchTime);
					$('#dateSetect',$el).text(searchTime);
					$('#searchInput',$el).text(scope.param.searchInput);
					$('#logSetting',$el).html(scope.param.logSettingHtml);
					$("#searchBtn",$el).click();
				}else if(scope.param && scope.param.quickSearchId){//快速搜索跳转
					getQuickDetail(scope.param.quickSearchId);
					addTimes(scope.param.quickSearchId);
				}else if(dashboardId){// 仪表盘跳转
					getDetailByDashboardId();
				}else if(scope.param && scope.param.fromEventMonitorDetails){
					initSearchByParam(scope.param.param);
					$("#searchBtn",$el).trigger('click',[false,true]);
				}else if(searchText){
					$('#searchInput',$el).text(searchText);
					$("#searchBtn",$el).click();
				}
			});
		})();

		function formatSearchString(string){
			if(string.length <= 0 || string.indexOf('|') < -1){
				return string;
			}

			var arr = string.split('|');
			var childArr;
			for (var i = 1; i < arr.length; i++) {
				childArr = $.trim(arr[i]).split(' ');
				if(!/^(<span)/.test($.trim(childArr[0])) && commandList.indexOf($.trim(childArr[0])) > -1){
					childArr[0]= ' <span class="LSD-command" style="color:var(--color-theme);">'+childArr[0]+'</span>';
					arr[i] = childArr.join(' ');
				}
			}

			return arr.join(' |') + ' ';
		}

		/**
		 * 设置搜索参数
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		function initSearchByParam(data) {
			$('#searchInput',$el).html($.trim(formatSearchString(data.search)));//查询条件

			$('#assetObject, #appSystem', $el).find('h5,span').removeClass('active');

			if(data.logType == '0'){//1 可访问日志 0 有条件日志
				var mustValue = JSON.parse(data.category);//三级分类 JSON
				setAccessLogSetting(mustValue);
			}
			$('#accessLogUl',$el).trigger('logChange');
			if(data.timeType == 0){//0:自动匹配 1:固定值 2:当天 3:本周 4:本月 5:今年
				var times = new Date();
				var start = new Date(times.getTime() - data.intervalTime).Format('yyyy-MM-dd hh:mm:ss');
				var end = times.Format('yyyy-MM-dd hh:mm:ss');
				$('#dateSetect', $el).text(start +'~'+ end);
				$('#dateSetectInput', $el).val(start +'~'+ end);

			}else if(data.timeType == 1){
				var start = new Date(data.startTime).Format('yyyy-MM-dd hh:mm:ss');
				var end = new Date(data.endTime).Format('yyyy-MM-dd hh:mm:ss');
				$('#dateSetect', $el).text(start +'~'+ end);
				$('#dateSetectInput', $el).val(start +'~'+ end);
			}else if(data.timeType == 2){
				var start = new Date().Format('yyyy-MM-dd 00:00:00');
				var end = new Date().Format('yyyy-MM-dd hh:mm:ss');
				$('#dateSetect', $el).text("当天");
				$('#dateSetectInput', $el).val(start +'~'+ end);
			}else if(data.timeType == 3){
				var times = new Date();
				var week_head = new Date(times.getTime());
				var day = times.getDay();// 今天的星期
				if(day > 0){
					week_head.setDate(times.getDate() - day + 1);
				}else{
					week_head.setDate(times.getDate() - 6);
				}
				var start = week_head.Format("yyyy-MM-dd 00:00:00");
				var end = times.Format("yyyy-MM-dd hh:mm:ss");
				$('#dateSetect', $el).text("本周");
				$('#dateSetectInput', $el).val(start +'~'+ end);
			}else if(data.timeType == 4){
				var start = new Date().Format('yyyy-MM-01 00:00:00');
				var end = new Date().Format('yyyy-MM-dd hh:mm:ss');
				$('#dateSetect', $el).text("本月");
				$('#dateSetectInput', $el).val(start +'~'+ end);

			}else if(data.timeType == 5){
				var start = new Date().Format('yyyy-01-01 00:00:00');
				var end = new Date().Format('yyyy-MM-dd hh:mm:ss');
				$('#dateSetect', $el).text("今年");
				$('#dateSetectInput', $el).val(start +'~'+ end);

			}
			$('#quickRange>li', $el).removeClass('active');
		}

		/**
		 * 获取搜索提示
		 * @return {[type]} [description]
		 */
		function getSPLTips(module) {
			return app.common.ajaxWithAfa({
				url:'WordAction_getWord.do',
				data:{
				}
			}).done(function (data) {
				if(data.result && data.result.length > 0){
					data.result.forEach(function(item) {
						commandList.push(item.word);
						tipsMap[item.word] = item;
					})
				}
				return $.Deferred().resolve(data);
			})
		}

		/**
		 * 获取字段提示
		 * @return {[type]} [description]
		 */
		function getFieldsTips() {
			return app.common.ajaxWithAfa({
				url:'WordAction_getStructWords.do',
				data:{
				}
			}).done(function (data) {
				if(data.result && data.result.length > 0){
					data.result.forEach(function(item) {
						commandList.push(item.name);
						item.module = 'field';
						tipsMap[item.name] = item;
					})
				}
				return $.Deferred().resolve(data);
			})
		}
		
		/**
		 * 根据仪表盘id获取数据
		 * @return {[type]}             [description]
		 */
		function getDetailByDashboardId() {
			app.common.ajaxWithAfa({
				url:'DashBoardAction_getDashBoardById.do',
				data:{
					id:dashboardId
				}
			}).done(function (data) {
				if(data.result && !$.isEmptyObject(data.result)){
					var resultData = data.result;
					resultData.category = resultData.mustValue;
					initSearchByParam(resultData);
					
					if(resultData.statistics && resultData.statistics != ""){
						logStatisticsViewConfig = JSON.parse(resultData.statistics);
					}
					if (resultData.fieldName) {
						fieldName = JSON.parse(resultData.fieldName);
					}
					dataBordName = resultData.name;
					echartsType = resultData.echartsType;
					$('#searchBtn',$el).click();
				}else{
					dashboardId = undefined;
				}
			})
		}
		// 显示快速筛选树
		function showTree(data) {
			var treeHtml = '';
			if(data && !$.isEmptyObject(data)){
				treeHtml +='<div>\
								<p><i class="fa fa-folder" style="color:#5d5a66;"></i>应用系统</p>\
								<div>'
				data['应用系统'].forEach(function (item) {
					treeHtml += '<span appId="'+item.appId+'">'+item.appName+'</span>';
				})
				treeHtml +='</div>';
//				treeHtml +='</div></div>';

//				for (var p in data) {
//					if (data.hasOwnProperty(p) && p != '应用系统' && p != 'sourceids') {
//						treeHtml +='<div>\
//										<p><i class="fa fa-folder" style="color:#5d5a66;"></i>'+p+'</p>\
//										<div>'
//						data[p].forEach(function (item) {
//							treeHtml += '<span cate1="'+item.cate1+'" cate2="'+item.cate2+'" cate3="'+item.cate3+'" >'+item.cate3+'</span>';
//						})
//						
//						treeHtml += '</div></div>';
//					}
//				}
			}
			$('#quickChooseContent', $el).html(treeHtml);
		}

		//获取三级分类
		function getObjectCategory(){
			return app.common.ajaxWithAfa({
				url: "ESSearchAction_getObjectCategory.do",
			}).done(function(data) {
				var data = data.result,
					appSystemData = data.app,
					assetObjectData = data.sys;
				if (!isHasCate3App(appSystemData)) {
					$("#searchBtn", $el).addClass('disabled');
					$("#searchKeyWord", $el).addClass('disabled');
				}
				putObjectData(appSystemData,'appSystem',true);
				putObjectData(assetObjectData,'assetObject');
				return $.Deferred().resolve();
			});
		}
		
		function isHasCate3App (appSystemData) {
			try {
				var cate2 = appSystemData[0].childs;
				if (!cate2 || cate2.length === 0) {
					return false;
				}
				var child = [];
				cate2.forEach(item => {
					child = child.concat(item.childs);
				})
				if (child.length === 0) {
					return false;
				}
				return true;
			} catch (e) {
				return false
			}
		}
		
		
		
		function putObjectData(appSystemData,id,tag){
			appSystemHtml = '<div>\
				<button type="button" class="resetCategory">重置</button>\
				<button type="button" class="closeCategory">关闭</button>\
				<button type="button" class="light confirmCategory">确定</button>\
			</div><div style="max-height: 63vh;overflow-y: auto; position: relative;margin-bottom:40px !important;">';
			if(appSystemData.length>0){
				appSystemData.sortChinese('cateName');
				appSystemData.forEach(function(first,index){
					appSystemHtml += "<div class='logSearchDetail-accessLogList'><h5 data-role='cate1' data-id='"+first.cateId+"' data-name='"+first.cateName+"'>"+ first.cateName+'</h5>';
					if(first.childs.length>0){
						first.childs.sortChinese('cateName');
						first.childs.forEach(function(second,twoIndex){
							appSystemHtml += '<div><span data-role="cate2" data-id="'+second.cateId+'" data-name="'+second.cateName+'">'+second.cateName+'</span>';
							if(second.childs.length>0){
								appSystemHtml += '<p>';
								second.childs.sortChinese('cateName');
								second.childs.forEach(function(third,twoIndex){
									appSystemHtml += '<span data-role="cate3" data-id="'+third.cateId+'" data-name="'+third.cateName+'">'+third.cateName+'</span>';
								})
								appSystemHtml += '</p>';
							}
							appSystemHtml += '</div>';
						})
					}
					appSystemHtml += "</div>";
				})
			}
			appSystemHtml += "</div>";
			$('#'+id,$el).html(appSystemHtml);
//			if (tag) {
//				$('#'+id+' h5',$el).trigger('click');
//				$('#'+id+' button.confirmCategory', $el).trigger('click');
//				$el.trigger('click');
//			}
		}

		function setAccessLogSetting(category) {
			var appSystem = $('#appSystem',$el);
			var assetObject = $('#assetObject',$el);
			category.app.cate1.forEach(function (item) {
				$('[data-id='+item.cateId+']',appSystem).addClass('active');
			})
			category.app.cate2.forEach(function (item) {
				$('[data-id='+item.cateId+']',appSystem).addClass('active');
			})
			category.app.cate3.forEach(function (item) {
				$('[data-id='+item.cateId+']',appSystem).addClass('active');
			})

			category.category.cate1.forEach(function (item) {
				$('[data-id='+item.cateId+']',assetObject).addClass('active');
			})
			category.category.cate2.forEach(function (item) {
				$('[data-id='+item.cateId+']',assetObject).addClass('active');
			})
			category.category.cate3.forEach(function (item) {
				$('[data-id='+item.cateId+']',assetObject).addClass('active');
			})

			if(appSystem.find('span.active,h5.active').length){//应用系统
				$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
			}
			if(assetObject.find('span.active,h5.active').length){//资产对象
				$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
			}
		}

		function getAccessLogSetting() {
			var cate1App = [],cate2App = [],cate3App = [],
			cate1AppTmp = [],cate2AppTmp = [],cate3AppTmp = [],
			cate1 = [],cate2 = [],cate3 = [],
			appId = [];
			$('#appSystem .active[data-role=cate1]', $el).each(function () {
				cate1App.push({cateId:$(this).attr('data-id')});
			})
			$('#appSystem .active[data-role=cate2]', $el).each(function () {
				cate2App.push({cateId:$(this).attr('data-id')});
			})
			$('#appSystem .active[data-role=cate3]', $el).each(function () {
				cate3App.push({cateId:$(this).attr('data-id')});
			})
			
			$('#assetObject .active[data-role=cate1]', $el).each(function () {
				cate1.push({cateId:$(this).attr('data-id'),cateName: $(this).attr('data-name')});
			})
			$('#assetObject .active[data-role=cate2]', $el).each(function () {
				cate2.push({cateId:$(this).attr('data-id'),cateName: $(this).attr('data-name')});
			})
			$('#assetObject .active[data-role=cate3]', $el).each(function () {
				cate3.push({cateId:$(this).attr('data-id'),cateName: $(this).attr('data-name')});
			})
			
			/**
			 * 如果当前用户没有选择应用系统，那就默认上送全部的应用系统
			 * 江西银行需求 2019-03-06
			 * 修改人：范永超
			 */
			$('#appSystem *[data-role=cate1]', $el).each(function () {
				cate1AppTmp.push({cateId:$(this).attr('data-id')});
			})
			$('#appSystem *[data-role=cate2]', $el).each(function () {
				cate2AppTmp.push({cateId:$(this).attr('data-id')});
			})
			$('#appSystem *[data-role=cate3]', $el).each(function () {
				cate3AppTmp.push({cateId:$(this).attr('data-id')});
			})
			if (cate3App.length === 0 ) {
				cate1App = cate1AppTmp;
				cate2App = cate2AppTmp;
				cate3App = cate3AppTmp;
			}
			
			return JSON.stringify({
				category:{cate1:cate1,cate2:cate2,cate3:cate3},
				app:{cate1:cate1App,cate2:cate2App,cate3:cate3App}
			});
		}

		function getAppId() {
			appId = [];
			$('#appSystem .active[data-role=cate3]', $el).each(function () {
				appId.push($(this).attr('data-id'));
			})
			return appId;
		}
		
		function getAppIdsRecord() {
			appId = [];
			$('#appSystem .active[data-role=cate3]', $el).each(function () {
				appId.push($(this).attr('data-id'));
			})
			if (!appId.length) {
				$('#appSystem *[data-role=cate3]', $el).each(function () {
					appId.push($(this).attr('data-id'));
				})
			}
			return appId;
		}

		//查看所有快速查询列表
		function getQuickSearchs(pageNum,callback) {
			app.common.ajaxWithAfa({
				url: "ESSearchAction_getQuickSearchs.do",
				data:{
					'top': 10,
					'pageNum':pageNum
				}
			}).done(function(data) {
				var data = data.result;
				callback && callback(data);
			});
		}

		//模态查看框所有快速查询列表
		function getModalQuickSearchs() {
			app.common.ajaxWithAfa({
				url: "ESSearchAction_getQuickSearchs.do",
			}).done(function(data) {
				var data = data.result,html="";
				if(data && data.length){
					data.forEach(function(item,index){
						html += '<option value="'+item.id+'">'+item.searchName+'</option>';
					});
					$('#searchNameList', $el).html(html);
				}
			});
		}
		
		//快速查询列表点击上一页下一页
		$('#upQuickPage,#downQuickPage',$el).click(function(){
			var val = parseInt($(this).attr('data-val'));
			var flag = $(this).hasClass('disabled');
			var $self = $(this);
			var index = $(this).index();
			if(!flag){
				getQuickSearchs(val,function(data){
					var html = "";
					if(data && data.length){
						data.forEach(function(item,index){
							html += '<span data-id="'+item.id+'"><i class="fa fa-search"></i>'+item.searchName+'</span>';
						});
						$('#quickSearchs', $el).html(html);

						$('#upQuickPage',$el).attr('data-val',val-1);
						$('#downQuickPage',$el).attr('data-val',val+1);
						if(val == 1){
							$('#upQuickPage',$el).addClass('disabled');
							$('#downQuickPage',$el).removeClass('disabled');
						}else{
							$('#upQuickPage',$el).removeClass('disabled');
						}
						if(data.length<10){
							$('#downQuickPage',$el).addClass('disabled');
						}

					}else{
						$self.addClass('disabled');
					}
				});
			}
		});
		
		//点击快速查询
		$('#quickSearchs', $el).on('click','span',function(e){
			if($(this).hasClass('active')){
				return;
			}
			$(this).addClass('active').siblings().removeClass('active');
			var quickSearchId = $(this).attr('data-id');
			getQuickDetail(quickSearchId);
			addTimes(quickSearchId);
		});

		$('#quickChooseContent', $el).on('click', 'span', function(event) {
			$(this).toggleClass('active');
			var appId = $(this).attr('appId');
			if(appId){
				$('[data-id='+appId+']', $('#appSystem ', $el)).trigger('click');
			}else{
				var cate1 = $(this).attr('cate1');
				var cate2 = $(this).attr('cate2');
				var cate3 = $(this).attr('cate3');

				var $cate2Obj = $('[data-name='+cate1+']', $('#assetObject', $el)).siblings();
				var $cate3Obj = $('[data-name='+cate2+']', $cate2Obj).next();
				var $obj = $('[data-name='+cate3+']', $cate3Obj);
				$obj.trigger('click');
			}
			isQuickFilter = true;
			$('#searchBtn', $el).click();
		});
		
		//快速查询次数加一（后台需要 无需处理）
		function addTimes(quickSearchId){
			$.ajax({
				url: 'ESSearchAction_updateQuickSearchTime.do',
				type: 'POST',
				dataType: 'json',
				data: {
					quickSearchId : quickSearchId 
				}
			});
		}
		//获取快速查询信息
		function getQuickDetail(quickSearchId){
			app.common.ajaxWithAfa({
				url: "ESSearchAction_getQuickSearch.do",
				data: {
					quickSearchId : quickSearchId 
				}
			}).done(function(data) {
				var resultData = data.result;
				resultData.search = resultData.searchCondition;
				initSearchByParam(resultData);
				$('#searchBtn',$el).trigger('click',[false,true]);
			});
		}
		//点击新增快速查询
		$('#addQuickSearch',$el).click(function(){
			$('#quickSearchModal',$el).modal('show');
			$('#myModalLabel',$('#quickSearchModal',$el)).text('快速查询');
			$('#addOrCover',$('#quickSearchModal',$el)).attr('disabled','disabled');
			resetQuickModal();
		});
		//另存为快速搜索
		$('#saveAsQuick',$el).click(function(e){
			e.stopPropagation();
			$('#quickSearchModal',$el).modal('show');
			$('#myModalLabel',$('#quickSearchModal',$el)).text('另存为快速查询');
			$('#addOrCover',$('#quickSearchModal',$el)).removeAttr('disabled');
			resetQuickModal();
		});
		function resetQuickModal(){
			$('#searchName',$('#quickSearchModal',$el)).val('');
			$('#searchArea',$('#quickSearchModal',$el)).val($.trim($('#searchInput',$el).text()));
			$('#quickSearchModal',$el).find('#addOrCover').val('1').change();
			$('[name="timeType"]',$('#quickSearchModal',$el)).removeAttr('checked');
			if($('#chooseTimeRange',$el).val() == '自定义'){
				$('[name="timeType"]',$('#quickSearchModal',$el)).eq('1').attr('checked','checked').end().attr('disabled','disabled');
			}else{
				$('[name="timeType"]',$('#quickSearchModal',$el)).removeAttr('disabled','disabled');
			}
		}
		//快速查询模态框事件
		$('#quickSearchModal',$el).on('click',function(e){
			e.stopPropagation();
		}).on('change','#addOrCover',function(){//操作类型
			if($(this).val()==1){
				$('#searchName',$('#quickSearchModal',$el)).parents('.control-group').removeClass('hide');
				$('#searchNameList',$('#quickSearchModal',$el)).parents('.control-group').addClass('hide');
			}else{
				$('#searchName',$('#quickSearchModal',$el)).parents('.control-group').addClass('hide');
				$('#searchNameList',$('#quickSearchModal',$el)).parents('.control-group').removeClass('hide');
				getModalQuickSearchs();
			}
		}).on('click','.confirmBtn',function(){//确认按钮
			var url = "",text = "";
			var obj = getQuickData();
			if(!obj){
				return;
			}
			var addOrCover = $('#addOrCover',$('#quickSearchModal',$el)).val();//1 新建快速搜索  2 覆盖原有快速查询
			if(addOrCover == 1){
				url = 'ESSearchAction_addQuickSearchs.do';
				text = '新建快速搜索';
			}else{
				url = 'ESSearchAction_updateQuickSearchs.do';
				text = '覆盖原有快速查询';
			}
			submitData(url,obj,text);
		});

		//获取保存快速查询数据
		function getQuickData(){
			var obj = {};
			var searchCondition = $.trim($('#searchInput',$el).text());//查询条件
			obj.searchCondition = searchCondition;
			var addOrCover = $('#addOrCover',$('#quickSearchModal',$el)).val();//1 新建快速搜索  2 覆盖原有快速查询
			if(addOrCover == 1){
				var searchName = $.trim($('#searchName',$('#quickSearchModal',$el)).val());//搜索名称
				if(searchName == ''){
					app.alert('请输入搜索名称');
					return false;
				}
				obj.searchName = searchName;
			}else{
				var id = $.trim($('#searchNameList',$('#quickSearchModal',$el)).val());//搜索名称
				obj.id = id;
			}
			var logType = $('#accessLog',$el).attr('data-val');//1 可访问日志 0 有条件日志
			obj.logType = logType;
			if(logType == '0'){
				obj.category = getAccessLogSetting();
				obj.appIds = getAppId();
			}
			var timeType = $('[name=timeType]:checked',$('#quickSearchModal',$el)).val(); //0:自动匹配 1:固定值
			if(!timeType){
				app.alert('请选择时间筛选条件');
				return false;
			}else if(timeType== 0){
				var timeInterval = $('#quickRange>li.active', $el).text().trim();
				//2:当天 3:本周 4:本月 5:今年
				if("当天" == timeInterval){
					timeType = 2;
				}else if("本周" == timeInterval){
					timeType = 3;
				}else if("本月" == timeInterval){
					timeType = 4;
				}else if("今年" == timeInterval){
					timeType = 5;
				}else{
					var timeArr = $('#dateSetectInput', $el).val().trim().split('~');
					var intervalTime = new Date(timeArr[1]).getTime() - new Date(timeArr[0]).getTime();
					obj.intervalTime = intervalTime;
				}
			}else if(timeType== 1){
				var timeArr = $('#dateSetectInput', $el).val().trim().split('~');
				obj.startTime = timeArr[0];
				obj.endTime = timeArr[1];
			}
			obj.timeType = timeType;
			return obj;
		}
		
		//提交数据
		function submitData(url,obj,text){
			app.common.ajaxWithAfa({
				url: url,
				data : {
					'quickSearch':JSON.stringify(obj)
				}
			}).done(function(data) {
				if(data.result){
					app.alert(text+'成功');
					$('#quickSearchModal',$el).modal('hide');
					// 刷新快速搜索
					getQuickSearchs('1',function(data){
						var html = "";
						if(data && data.length){
							data.forEach(function(item,index){
								html += '<span data-id="'+item.id+'"><i class="fa fa-search"></i>'+item.searchName+'</span>';
							});
							$('#quickSearchs', $el).html(html).parent().show();
							$('#addQuickSearch',$el).hide();
							if(data.length<10){
								$('#downQuickPage',$el).addClass('disabled').attr('data-val', '2');
							}else{
								$('#downQuickPage',$el).removeClass('disabled').attr('data-val', '2');
							}
							$('#upQuickPage',$el).addClass('disabled').attr('data-val', '1');
						}else{
							$('#quickSearchs', $el).parent().hide();
							$('#addQuickSearch',$el).show();
						}
					});
				}else{
					app.alert(text+'失败');
				}
			});
		}
		
		function getLogText(index,host,fileName,parent, ACQTIME, size, search) {
			return app.common.ajaxWithAfa({
				url:'ESSearchAction_getContextByParent.do',
				data:{
					parent:parent,
					acqTime:ACQTIME,
					size:size,
					search:search,
					index: index,
					host: host,
					fileName: fileName
				}
			}).done(function (data) {
				return $.Deferred().resolve(data);
			})
		}

		function isInView($parentObj, $obj) {
			var top = $obj[0].offsetTop;
			var height = $obj.height();
			var sTop = $parentObj.scrollTop();
			var pHeight = $parentObj.height();
			if(top+height < sTop ||  top > sTop+pHeight){
				return false;
			}

			return true;
		}

		//查询日志表格事件
		$("#logTable", $el).on('page.dt', function() {
	        app.shelter.show('加载中。。。');
	    }).on('click', 'tr', function(event) {
	    	event.preventDefault();
	    	var topPre = $(this).offset().top - this.clientHeight - 50;
	    	if(!$(this).hasClass('selected')){
	    		$(this).addClass('selected');
	    		var tt = $(this).siblings('tr.selected')
	    		tt.trigger('removeSelect');
	    		var $parentObj = $(this).parents('.dataTables_scrollBody');
	    		if(!isInView($parentObj,$(this))){
					this.scrollIntoView({block: "start"});
					$parentObj.scrollTop($parentObj.scrollTop() - topPre);
	    		};

	    		/*if($parentObj.scrollTop() + $parentObj.height() >= $parentObj[0].scrollHeight){
	    			$parentObj.scrollTop($parentObj.scrollTop() - topPre - 30);
	    		}*/
	    	}
	    }).on('removeSelect', 'tr', function(event) {
	    	event.preventDefault();
	    	$(this).removeClass('selected');
	    	$(this).find('p.change').removeClass('change');
	    	$(this).find('i.fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-right');
	    	$(this).find('.logContext').removeClass('change');
	    	$(this).find('.context-load').remove();
	    	$(this).find('.up').hide();
	    }).on('click','.spread',function(){//展开收起内容第一行
			$(this).parent().toggleClass('change');
			$(this).toggleClass('active');
		}).on('click','.more',function(){
			var $self = $(this);
			$self.append('<i class="fa fa-spinner fa-spin"></i>');
			$Obj = $(this).parent().prev();
			$Obj.addClass('change');
			var row_data =$logTable.row($(this).closest('tr')).data();
			var index = row_data["_index"];
			var host = row_data["_head_.hostip"];
			var fileName = row_data["_head_.file"];

			var lastItem = $('p:last-child',$Obj);
//			var PARENT = lastItem.attr('data-parent');
			var PARENT = row_data["_head_.pid"];
			var ACQTIME = lastItem.attr('data-ACQTIME');

			getLogText(index,host,fileName,PARENT, ACQTIME, 100, urlData.search).then(function (data) {
				if(data.result && data.result.length > 0){
					var tmpHtml = '';
					var len = data.result.length;
					for (var i = 0; i < data.result.length; i++) {
						var tmpObj = data.result[i];
						if (tmpObj && tmpObj.LOG) {
							tmpHtml += '<p class="context-load" data-parent="'+tmpObj.PARENT+'" data-ACQTIME="'+tmpObj.ACQTIME+'" ACQTIME="'+tmpObj.ACQTIME+'" LOGTIME="'+tmpObj.LOGTIME+'"><span class="showContext" title="日志上下文查看"></span><sapn class="logText">'+tmpObj.LOG+'</sapn></p>';
						}
					}
					$Obj.append(tmpHtml);
					$self.next().show();
				}else{
					$self.hide().next().show();
				}
				$self.find('i').remove();
			}, function () {
				$self.find('i').remove();
			});
		}).on('click', '.up', function(event) {
			event.preventDefault();
			$Obj = $(this).parent().prev();
			$Obj.find('.context-load').remove();
			$Obj.removeClass('change');
			$(this).hide().prev().show();
			$(this).parents('tr').find('td')[0].scrollIntoView({block: "start"});
		})
		// 日志上下文
		.on('click', '.showContext', function(event) {
			event.preventDefault();
			var data =$logTable.row($(this).parents('tr')).data(),
			$showLogContext = $('#showLogContext', $el);
			$showLogContext.find('.disabled').removeClass('disabled');
			if(!data['_head_.file'] || data['_head_.file'] == ''){
				app.alert('该类日志不支持查看上下文！');
				return;
			}
			$('#logPath', $showLogContext).text(data['_head_.file']||'-');
			var time = $(this).parent().attr('ACQTIME');
			var logtext = $(this).next().text();
			var logtime = $(this).parent().attr('LOGTIME');
			var parent = data._id;

			$showLogContext.removeData();
			$showLogContext.data({
				parent: parent,
				fileName:data['_head_.file'],
				host:data['_head_.hostip'],
				index: data['_index']
			});

			$('#logContextDetailList', $el).html('<li class="loading" style="display:flex;align-items: center;justify-content: center;font-size:30px; height:calc(100vh - 182px);"><i class="fa fa-spinner fa-pulse"></i></li>');
			$showLogContext.removeClass('active').addClass('active');
			ininLogContextDetail({
				postambleTime:time,
				preambleTime:time,
				fileName:data['_head_.file'],
				logtext:logtext,
				logtime:logtime,
				parent: parent,
				host:data['_head_.hostip'],
				index:data['_index']
			}).then(function (data) {
				
			})
			event.stopPropagation();
		})
		// 日志原文
		.on('click', '.fa-file-text-o', function(event) {
			var tr = $logTable.row($(this).parent().parent()).data();
			var ACQTIME = null;
			try {
				ACQTIME = -tr.__context__[0].ACQTIME
			} catch (e) {
			}
			var searchInput = $('#searchInput', $el).html().trim();
			$(this).css('color','#541b8a');
			var no = tr['_head_.pid'];
//			console.log(tr, 'tr')
			var pid = tr['_head_.pid'];
			var appid = tr['_head_.appid'];
			var logsn = pid.replace(new RegExp(appid, 'g'), '');
			tr['_head_.logsn'] = logsn;
			logOperation({
				serialno:tr['_head_.pid'],
				data:tr,
				id:tr['_head_.pid'],
				'host': tr['_head_.hostip'],
				'index': tr['_index'],
				'fileName': tr['_head_.file'],
				'logFlowInfo':tr
			}, tr, 2)
			app.dispatcher.load({
				"title": "日志明细 - "+no.substring(0, 4)+'...'+no.substr(-4, 4),
				"moduleId": 'logSearch',
				"section": 'logDetail',
				"id": 'search-'+logsn,
				"params": {
					serialno:tr['_head_.pid'],
					data:tr,
					id:tr['_head_.pid'],
					'host': tr['_head_.hostip'],
					'index': tr['_index'],
					'fileName': tr['_head_.file'],
					'logFlowInfo':tr,
					'ACQTIME': ACQTIME,
					'searchInput': searchInput
				}
			});
			
		})
		// 日志链路
		.on('click', '.fa-bar-chart,.fa-podcast',function (event) {
			var tr = $logTable.row($(this).parent().parent()).data();
			$(this).css('color','#541b8a');
			var type = $(this).hasClass('fa-bar-chart') ? 'zn' : 'jz';
			var typeName = type == 'zn' ? '智能' : '精准';
			var no = tr['_head_.logsn'];
			var appid = tr['_head_.appid'];
			var pid = tr['_head_.pid'];
			var logsn = pid.replace(new RegExp(appid, 'g'), '');
			tr['_head_.logsn'] = logsn;
			app.dispatcher.load({
				"title": typeName+"链路 -" + tr._index,
				"moduleId": 'logFlow',
				"section": '',
				"id": 'flow-'+logsn+type,
				"params": {
					'logFlowInfo':tr,
					'type': type
				}
			});
		}).on('click', '.fa-download', function(event) {
			var tr = $logTable.row($(this).parent().parent()).data();
			$(this).parents('tbody').find('.log-Down').removeClass('active');
			$(this).siblings('.log-Down').addClass('active');
			event.stopPropagation();
		}).on('click', '.fa-share-alt', function(event) {
			var tr = $logTable.row($(this).parent().parent()).data();
			$(this).parents('tbody').find('.log-Share').removeClass('active');
			$(this).siblings('.log-Share').addClass('active');
			event.stopPropagation();
		})
		.on('click', 'span.field', function(event) {
			event.preventDefault();
			fieldOrContent = true;
			var name = $(this).text().trim();
			name = name.replace(/查看文件/g, '');
			var val = $(this).next().text().trim();
			var text = name+'="'+val+'"';
			addTableMiniModal(text, event.clientY, event.clientX);
			event.stopPropagation();
		}).on('mouseover', 'span.field', function(event) {
			event.preventDefault();
			if(!$(this).context.nextSibling){
				$(this).parent().addClass('h');
			}else{
				$(this).addClass('h');
			}
			event.stopPropagation()
		}).on('mouseout', 'span.field',function(event) {
			event.preventDefault();
			$(this).removeClass('h');
		}).on('click', 'span.field a', function(event) {
			event.preventDefault();
			var tr = $logTable.row($(this).parents('tr')).data();
			var tmpData={}
			$.extend(true, tmpData, urlData, {
				currentPath:tr['_head_.file'],
				host:tr['_head_.hostip'],
				fileName:tr['_head_.file'],
				index:tr['_index'],
			});
			loadLogFileDetail(tmpData);
			event.stopPropagation();
		}).on('dblclick', '.logContext', function(event) {
			event.preventDefault();
			$(this).css('color','#541b8a');
			$(this).parents('tr').find('.fa-file-text-o').trigger('click');
		}).on('mouseover', '.logText span', function(event) {
			event.preventDefault();
			fieldOrContent = false;
			if(!$(this).context.nextSibling){
				$(this).parent().addClass('h');
			}else{
				$(this).addClass('h');
			}
			event.stopPropagation();
		}).on('mouseout', '.logText span', function(event) {
			event.preventDefault();
			$(this).removeClass('h');
		}).on('click', '.logText span.h', function(event) {
			event.preventDefault();
			fieldOrContent = false;
			var text = $(this).text();
			$("#content-menu", $el).removeClass("open");
			addTableMiniModal(text, event.clientY, event.clientX);
			$(this).addClass('a');
			event.stopPropagation();
		}).on('click', '.logContext', function(event) {
			event.preventDefault();
			var text = getSelectText();
			text = $.trim(text);
			if(text){
				$("#content-menu", $el).removeClass("open");
				addTableMiniModal(text, event.clientY, event.clientX);
				event.stopPropagation();
			}else{
				removeTableMiniModal();
			}
			
		}).on('mousedown', '.logContext', function(event) {
			var text = getSelectText();
			text = $.trim(text);
			if(!text){
				removeTableMiniModal();
			}
			
			if(text && $('.logSearchDetail-miniModal', $el).css('display') != 'none'){
				removeTableMiniModal();
			}
		});

		function addTableMiniModal(text,top,left) {
			removeTableMiniModal();
			var miniModal = '<div class="logSearchDetail-miniModal">\
								<div class="modalContent">'+text+'</div>\
								<div class="modalFooter">\
									<span class="newSearch">新建搜索</span>\
									<span class="addToSearch">添加到搜索</span>\
									<span class="copyText">复制</span>\
								</div>\
							</div>';
			$("#logTable tbody", $el).append(miniModal);
			var modalh = $('.logSearchDetail-miniModal', $el).height();
			var modalw = $('.logSearchDetail-miniModal', $el).width();
			var h = $('body').height();
			var w = $('body').width();
			if(top >= h - modalh){
				top = top - modalh - 10;
			}else{
				top = top + 10;
			}

			if(left >= w - modalw){
				left = left - modalw;
			}

			$('.logSearchDetail-miniModal', $el).css({
				top:top,
				left:left
			})
		}

		function removeTableMiniModal() {
			$('.logText span.a').removeClass('a');
			$('.logSearchDetail-miniModal', $el).remove();
		}

		function newLogSearch(param) {
			app.dispatcher.load({
				title: "日志搜索",
				moduleId:"logResultCheck",
				section:"",
				id: 'logSearch'+app.global.getUniqueId(),
				params:param
			});
		}

		$("#logTable", $el).on('click', '.logSearchDetail-miniModal .newSearch', function(event) {
			event.preventDefault();
			var text = $(this).parents('.logSearchDetail-miniModal').find('.modalContent').text().trim();
			removeTableMiniModal();
			newLogSearch({searchInput:text,searchTime:$("#dateSetectInput",$el).val(),logSettingHtml:$("#logSetting",$el).html()});
		}).on('click', '.logSearchDetail-miniModal .addToSearch', function(event) {
			event.preventDefault();
			var text = $(this).parents('.logSearchDetail-miniModal').find('.modalContent').text().trim();
			if(!fieldOrContent && text.includes("=")){
				text = text.split("=")[1];
			}
			var html = $('#searchInput', $el).html().trim();
			if(html){
				if (fieldOrContent) {
					$('#searchInput', $el).html(html+' ; '+text);
				} else {
					$('#searchInput', $el).html(html+' AND '+text);
				}
			}else{
				$('#searchInput', $el).html(text);
			}
			$("#searchBtn",$el).click();
		}).on('click', '.logSearchDetail-miniModal .copyText', function(event) {
			event.preventDefault();
			var text = $(this).parents('.logSearchDetail-miniModal').find('.modalContent').text().trim();
			try{
				var successful = document.execCommand('copy');
				var msg = successful ? '成功复制到剪贴板' : '该浏览器不支持点击复制到剪贴板';
				console.log(msg);
			} catch (err) {
				alert('该浏览器不支持点击复制到剪贴板');
			}
			removeTableMiniModal();
		});

		$("#logTable", $el).on('click', '.log-Share .fa-envelope-o', function(event) {
			event.preventDefault();
			var tr = $logTable.row($(this).parents('tr')).data();
			initEmailModal(tr);
		}).on('click', '.log-Share .fa-weixin', function(event) {
			event.preventDefault();
			app.alert('暂不支持该功能');
		}).on('click', '.log-Share .fa-qq', function(event) {
			event.preventDefault();
			app.alert('暂不支持该功能');
		});
		
		$("#logTable", $el).on('click', '.log-Down .fa-file-word-o', function(event) {
			event.preventDefault();
			var tr = $logTable.row($(this).closest('tr')).data();
			$.ajaxDownload(
				'ESSearchAction_downLogDoc.do',
				{
					parent:tr['_head_.pid'],
					routing:tr['_routing'],
					index:tr['_index'],
					serialNo:tr['_head_.logsn'],
					host: tr['_head_.hostip'],
					fileName: tr['_head_.file'],
				}
			);
			logOperation({}, tr, 12)
		}).on('click', '.log-Down .fa-file-text', function(event) {
			event.preventDefault();
			var tr = $logTable.row($(this).closest('tr')).data();
			$.ajaxDownload(
				'ESSearchAction_downLogTxt.do',
				{
					parent:tr['_head_.pid'],
					routing:tr['_routing'],
					index:tr['_index'],
					serialNo:tr['_head_.logsn'],
					host: tr['_head_.hostip'],
					fileName: tr['_head_.file'],
				}
			);
			logOperation({}, tr, 11)
		});
		
		function logOperation(param, rowData, type) {
    		var param = {
    			type: type,
    			hostip: rowData['_head_.hostip'],
    			file: rowData['_head_.file'],
    			pid: rowData['_head_.pid'],
    			category1: rowData['_head_.category1'],
    			category2: rowData['_head_.category2'],
    			category3: rowData['_head_.category3'],
    			appids: rowData['_head_.appid'],
    			param: param
    		}
    		app.common.recordLogOperete({logOperationBean: JSON.stringify(param)});
    	}
		

		//可访问日志相关点击事件
		$('.logSearchDetail-accessLogContent',$el).on('click',function(e){
			$('#dateSetectContent', $el).hide();
			e.stopPropagation();
		}).on('click','#accessLog',function(){//可访问日志点击显示列表选项
			$('#accessLogUl',$el).toggle().find('li.active').removeClass('active');
			$('#accessLogUl',$el).trigger('logChange');
			$('#assetObject',$el).hide();
			$('#appSystem',$el).hide();
		}).on('click','#accessLogUl>li',function(){//点击显示隐藏右侧三级分类块
			var index = $(this).index();
			$(this).siblings().removeClass('active');
			$(this).toggleClass('active');
			/*if(index == 0){
				$('#accessLogUl',$el).hide();
				$('#accessLogUl',$el).trigger('logChange');
				$('#accessLog',$el).attr('data-val','1').html('可访问日志<i class="fa fa-sort-down"></i>');
				$('#assetObject',$el).hide();
				$('#appSystem',$el).hide();
				$('#assetObject, #appSystem', $el).find('h5.active,span.active').removeClass('active');
			}else*/ if(index == 0){
				if($(this).hasClass('active')){
					$('#appSystem',$el).toggle();
				}else{
					$('#appSystem',$el).hide();
				}
				$('#assetObject',$el).hide();
			}else if(index == 1){
				if($(this).hasClass('active')){
					$('#assetObject',$el).toggle();
				}else{
					$('#assetObject',$el).hide();
				}
				$('#appSystem',$el).hide();
			}
		}).on('click','span,h5',function(){//选中三级分类
			if($(this).hasClass('disabled')){
				return;
			}
			$(this).toggleClass('active');
			saveCategory($(this));
		}).on('click','.closeCategory',function(){//关闭
			$(this).parent().parent().hide();
		}).on('click','.resetCategory',function(){//重置
			$(this).parent().parent().find('h5.active,span.active').removeClass('active');

			if($('#appSystem',$el).find('span.active,h5.active').length){//应用系统
				$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
			}else{
				$('#accessLogUl>li:eq(0)',$el).removeClass('choosed');
			}

			if($('#assetObject',$el).find('span.active,h5.active').length){//资产对象
				$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
			}else{
				$('#accessLogUl>li:eq(1)',$el).removeClass('choosed');
			}
		}).on('click','.confirmCategory',function(){//确定
			$(this).parent().parent().hide();
		}).on('logChange', '#accessLogUl', function(event) {
			var $obj = $(this).parent();
			if($obj.find('.active[data-role]').length >0){
				var length = $('.active[data-role=cate3]', $obj).length;
				$('#accessLog',$el).attr('data-val','0').html('有条件的日志（'+length+'）<i class="fa fa-sort-down"></i>');
			}else{
				$('#accessLog',$el).attr('data-val','1').html('可访问日志<i class="fa fa-sort-down"></i>');
			}
		});

		function saveCategory($this){ 
			var $parent = $this.parent();
			var dataRole = $this.attr('data-role');
			var active = $this.hasClass('active');
			if(dataRole == 'cate1'){
				if(active){
					$('[data-role=cate2],[data-role=cate3]', $parent).addClass('active');
				}else{
					$('[data-role=cate2],[data-role=cate3]', $parent).removeClass('active');
				}
			}else if(dataRole == 'cate2'){
				var parent = $this.parent().parent();
				if(active){
					$('[data-role=cate3]', $parent).addClass('active');
					parent.find('[data-role=cate1]').addClass('active');
				}else{
					 $('[data-role=cate3]', $parent).removeClass('active');
					 if(!parent.find('.active[data-role=cate2]').length){
					 	parent.find('[data-role=cate1]').removeClass('active');
					 }
				}
			}else if(dataRole == 'cate3'){
				var cate2 = $this.parent().prev();
				if(active){
					cate2.addClass('active');
					cate2.parent().siblings('h5').addClass('active');
				}else{
					if(!$this.siblings('.active[data-role=cate3]').length){
						cate2.removeClass('active');
					}

					if(!cate2.parent().parent().find('.active[data-role=cate3]').length){
						cate2.parent().siblings('h5').removeClass('active');
					}
				}
			}

			if($('#appSystem',$el).find('span.active,h5.active').length){//应用系统
				$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
			}else{
				$('#accessLogUl>li:eq(0)',$el).removeClass('choosed');
			}

			if($('#assetObject',$el).find('span.active,h5.active').length){//资产对象
				$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
			}else{
				$('#accessLogUl>li:eq(1)',$el).removeClass('choosed');
			}
		}
		
		//点击空白使弹框隐藏
		$el.click(function(e){
			$('#accessLogUl',$el).hide();//隐藏可访问日志
			$('#accessLogUl',$el).trigger('logChange');
			$('#assetObject',$el).hide();
			$('#appSystem',$el).hide();

			if($(e.target).closest($('#dateSetectWarp', $el)).length == 0 && !$(e.target).is("th,i,tr") && $(e.target).closest($('.daterangepicker', $el)).length == 0){
				$('#dateSetectContent', $el).hide();
			}

			$('.logSearchDetail-suggestion',$el).hide();
			if(e.target != $('#searchInput', $el)[0]){
				$('.logSearchDetail-commandTip', $el).hide().find('.commandExplanation').hide();
			}

			if($(e.target).closest($('#showLogContext', $el)).length == 0){
				$('#showLogContext', $el).removeClass('active');
			}
			
			if($(e.target).closest($('.reStructDataModal-roleSelectContent', $el)).length == 0){
				$('.reStructDataModal-roleSelectContent', $el).hide();
				$('.selectRole', $('#reStructDataModal', $el)).removeClass('active');
			}
			if($(e.target).closest($('.log-Share', $el)).length == 0){
				$('.log-Share').removeClass('active');
			}
			if($(e.target).closest($('.log-Down', $el)).length == 0){
				$('.log-Down').removeClass('active');
			}
			if($(e.target).closest($('.logSearchDetail-miniModal', $el)).length == 0){
				removeTableMiniModal();
			}
		});
		
		//下拉框选择后换算时间
		function getQuickTimeAndDate(name){
			// timeFlag
			var now;
			app.common.ajaxWithAfa({
				url: "ESSearchAction_getNowTime.do",
				async: false
			}).done(function(content){
				now = new Date(content.result);
			});
			var time_func = {
				"thisDay":(function(now){
					return {
						sDate:now.Format("yyyy-MM-dd 00:00:00"),
						eDate:now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"thisWeek":(function(now){
					var week_head = new Date(now.getTime());
					var day = now.getDay();// 今天的星期
					if(day > 0){
						week_head.setDate(now.getDate() - day + 1);
					}else{
						week_head.setDate(now.getDate() - 6);
					}
					return {
						sDate: week_head.Format("yyyy-MM-dd 00:00:00"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"thisMonth":(function(now){
					return {
						sDate: now.Format("yyyy-MM-01 00:00:00"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"thisYear":(function(now){
					return {
						sDate: now.Format("yyyy-01-01 00:00:00"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"oneHour":(function(now){
					var time = now.getTime() - 60 * 60 * 1000;
					return {
						sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"twelveHour":(function(now){
					var time = now.getTime() - 12 * 60 * 60 * 1000;
					return {
						sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"oneDay":(function(now){
					var time = now.getTime() - 24 * 60 * 60 * 1000;
					return {
						sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"oneWeek":(function(now){
					var time = now.getTime() - 7 * 24 * 60 * 60 * 1000;
					return {
						sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"halfMonth":(function(now){
					var time = now.getTime() - 15 * 24 * 60 * 60 * 1000;
					return {
						sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"oneMonth":(function(now){
					var time = now.getTime() - 30 * 24 * 60 * 60 * 1000;
					return {
						sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"threeMonth":(function(now){
					var time = now.getTime() - 90 * 24 * 60 * 60 * 1000;
					return {
						sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now),
				"allTime":(function(now){
					var time = 0;
					return {
						sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
						eDate: now.Format("yyyy-MM-dd hh:mm:ss")
					}
				})(now)
			};
			return time_func[name];
		}

		// 搜索历史事件
		$('#logSearch_searchHistory',$el).on('click', 'li', function(event) {
			event.preventDefault();
			event.stopPropagation();
			$('.logSearchDetail-suggestion',$el).hide();
			$("#searchInput",$el).text($(this).text()).focus();
		});

		// 搜索输入框事件
		$("#searchInput", $el).on('keyup', function(event) {
			if ($(this).text() == '') {
				if($(this).next().find('.logSearchDetail-suggestion').css('display') == 'none'){
					getSearchrecord();
				}
			}else{
				$('.logSearchDetail-suggestion',$el).hide();
			}
		}).on("click",function(e){
			if ($(this).text() == '') {
				if($(this).next().find('.logSearchDetail-suggestion').css('display') == 'none'){
					getSearchrecord();
				}
			}
		}).on('keyup click', function(event) {
			var top = $(this).height();
			$('.logSearchDetail-searchTips', $el).css('top', (top+1)+'px');
			var end = getPointPositon();
			var text = $(this).html();

			var preText = $.trim(text.substring(0, end));
			var nextText = $.trim(text.substring(end));

			var wordArr = preText.split(' ');
			if(wordArr && wordArr.length > 0){
				var lastWord = wordArr.pop();
			}

			if(event.keyCode == 40){
				return;
			}
			if(event.keyCode == 32){
				$('.logSearchDetail-commandTip', $el).hide().find('.commandExplanation').hide();
				return;
			}
			if(/\|$/g.test(preText) && !(/^(<span )/g.test(nextText))){
				$('#commandTipList', $el).empty();
				var htmlStr = ininCommandList('SPL');
				if(htmlStr){
					$('#commandTipList', $el).html(htmlStr).find('li:eq(0)').addClass('active').trigger('selectChange');
					$('.logSearchDetail-commandTip', $el).show();
				}else{
					$('.logSearchDetail-commandTip', $el).hide().find('.commandExplanation').hide();
				}
			}else if(lastWord && lastWord != ''){
				var htmlStr = ininCommandList('all', lastWord);
				if(htmlStr){
					$('#commandTipList', $el).html(htmlStr).find('li:eq(0)').addClass('active').trigger('selectChange');
					$('.logSearchDetail-commandTip', $el).show();
				}else{
					$('.logSearchDetail-commandTip', $el).hide().find('.commandExplanation').hide();
				}
			}else{
				$('.logSearchDetail-commandTip', $el).hide().find('.commandExplanation').hide();
			}
			$('.LSD-command', $(this)).each(function () {
				if(commandList.indexOf($(this).text()) < 0){
					$(this).remove();
				}
			})
		}).on('keydown', function(event) {
			if(event.keyCode == 40){
				var tmpObj = $(this).next().find('.logSearchDetail-commandTip');
				if(tmpObj.length > 0){
					if(tmpObj.css('dispay') == 'none'){
						tmpObj.show();
					}
					tmpObj.focus();
				}
			}
			if(event.keyCode == 13){
				event.preventDefault();
				if($('.logSearchDetail-commandTip', $el).css('display') == 'none'){
					$("#searchBtn",$el).click();
				}else{
					var tmpObj = $(this).next().find('.logSearchDetail-commandTip');
					if(tmpObj.css('display') == 'block'){
						tmpObj.focus().find('li.active').click();
					}
				}
				event.stopPropagation();
			}
		}).on('paste', function(event) {
			event.preventDefault();
			var pastedtext;
			if (window.clipboarddata && window.clipboarddata.getdata) {//ie
	    		pastedtext = window.clipboarddata.getdata('text');
	  		} else {
	    		pastedtext = event.originalEvent.clipboardData.getData('text');
	  		}
			if (window.getSelection) {
		        var selecter = window.getSelection();
		        var selectStr = selecter.toString();
		        if (selectStr.trim != "") {
		            var rang = selecter.getRangeAt(0);
		            var temp = $('<t>'+selectStr+'</t>');
		            rang.surroundContents(temp[0]);
		        }
		    } else if (document.selection) {//ie
		        var selecter = document.selection.createRange();
		        selecter.select();
		        var selectStr = selecter.text;
		        selecter.pasteHTML('<t>'+selectStr+'</t>');
		    }
		    $(this).find('t').after('<b>'+$.trim(formatSearchString(pastedtext))+'</b>');
		    $(this).find('t').remove();
		    var html = $(this).html().trim();

		    $(this).html( html.replace(/<\/*b>/gmi,''));
			removeToEnd($(this));
		});

		function ininCommandList(type,text) {
			var htmStr = '';
			commandList.forEach(function (item) {
				var tmp = tipsMap[item];
				if(tmp){
					if(type =='SPL' && tmp.module != 'head' && tmp.module != 'field'){
						htmStr +='<li>'+(tmp.word||tmp.name)+'</li>';
					}else if(text != ''){
						if(tmp.word && tmp.word.indexOf(text) >= 0){
							htmStr +='<li>'+tmp.word+'</li>';
						}else if(tmp.name && tmp.name.indexOf(text) >= 0){
							htmStr +='<li>'+tmp.name+'</li>';
						}
					}
				}
			})
			return htmStr;
		}

		function removeToEnd($obj) {
			var obj = $obj[0];
			if (window.getSelection) {//ie11 10 9 ff safari
		        obj.focus(); //解决ff不获取焦点无法定位问题
		        var range = window.getSelection();//创建range
		        range.selectAllChildren(obj);//range 选择obj下所有子内容
		        range.collapseToEnd();//光标移至最后
		    }
		    else if (document.selection) {//ie10 9 8 7 6 5
		        var range = document.selection.createRange();//创建选择对象
		        range.moveToElementText(obj);//range定位到obj
		        range.collapse(false);//光标移至最后
		        range.select();
		    }
		}

		function getPointPositon() {
			if (window.getSelection) {
		        var range = window.getSelection().getRangeAt(0);//创建range
		    }
		    else if (document.selection) {
		        var range = document.selection.createRange();//创建选择对象
		    }
		    var end = range.commonAncestorContainer.textContent.substring(0,range.endOffset).replace(/</g,'&lt;').replace(/>/g,'&gt;').length;
		    var preElement = range.endContainer;
		    while(preElement.previousSibling){
		    	if(preElement.previousSibling.outerHTML){
		    		end += preElement.previousSibling.outerHTML.length;
		    	}else{
		    		var text = preElement.previousSibling.textContent;
		    		text = text.replace(/</g,'&lt;').replace(/>/g,'&gt;');
		    		end += text.length;
		    	}
		    	preElement = preElement.previousSibling;
		    }
		    return end;
		}

		function initCommandExplanation(obj) {
			var htmlStr = '';
			if(obj.module != 'head' && obj.module != 'field'){
				htmlStr ='<p style="font-size: 14px;font-weight: bold;">指令</p>'+
						'<p class="lable" style="color: var(--color-theme);">'+obj.word+'</p>' +
						'<p class="context">'+obj.explanation+'</p>' +
						'<p class="lable">示例:</p>' +
						'<p class="context">'+obj.example+'</p>';
			}else{
				htmlStr ='<p style="font-size: 14px;font-weight: bold;">字段</p>'+
						'<p class="lable" style="color: var(--color-theme);">'+(obj.word||obj.name)+'</p>' +
						'<p class="context">'+"字段说明："+(obj.explanation||obj.desc)+'</p>';
				if(obj.type != undefined){
					htmlStr = htmlStr + '<p class="context">'+("字段类型：" +obj.type )+'</p>';
				}
				if(obj.source != undefined){
					htmlStr = htmlStr + '<p class="context">'+("字段来源：" +obj.source)+'</p>';
				}
			}
			if(htmlStr == ''){
				$('.commandExplanation', $el).empty().hide();
			}else{
				$('.commandExplanation', $el).empty().html(htmlStr).show();
			}
		}
		// 命令提示事件
		$('.logSearchDetail-commandTip', $el).on('click', '.logSearchDetail-commandTipList>li', function(event) {
			var inputObj = $("#searchInput", $el);
			var end = getPointPositon();
			var text = inputObj.html().trim();
			var preText = text.substring(0, end);
			var nextText = $.trim(text.substring(end));
			var commandText = $(this).text().trim();
			var wordArr = preText.split(' ');
			if(wordArr && wordArr.length > 0){
				var tmpWord = wordArr[wordArr.length -1];
				if(tmpWord!='' && commandText.indexOf(tmpWord)>=0){
					wordArr.pop();
					preText = wordArr.join(' ');
				}
			}
			var tmp = tipsMap[commandText];
			if(tmp.module != 'head' && tmp.module != 'field'){
				inputObj.html(preText + ' <span class="LSD-command" style="color:var(--color-theme);">'+commandText+'</span> '+ nextText+' ');
			}else{
				inputObj.html(preText +commandText+nextText+' ');
			}
			inputObj.focus();
			removeToEnd(inputObj);
			$(this).removeClass('active');
			$('.logSearchDetail-commandTip', $el).hide().find('.commandExplanation').hide();
		}).on('keyup', function(event) {
			var len = $(this).find('.logSearchDetail-commandTipList').children('li').length;
			var obj = $('li.active', $(this));
			if(event.keyCode == 40){
				if(obj && obj.index() < len-1){
					obj.removeClass('active').next().addClass('active');
				}else{
					obj.removeClass('active');
					$('li:eq(0)', $(this)).addClass('active');
				}
				$('li.active', $(this))[0].scrollIntoView(false);
			}else if(event.keyCode == 38){
				if(obj && obj.index() == 0){
					obj.removeClass('active');
					$('li:last', $(this)).addClass('active');
				}else{
					obj.removeClass('active').prev().addClass('active');
				}
				$('li.active', $(this))[0].scrollIntoView(false);
			}else if(event.keyCode == 13){
				obj.click();
			}
			$(this).find('li.active').trigger('selectChange');
		}).on('mouseenter', 'li', function(event) {
			$(this).trigger('selectChange');
		}).on('mouseleave', '.logSearchDetail-commandTipList', function(event) {
			event.preventDefault();
			$(this).find('li.active').trigger('selectChange');
		}).on('click', '.commandExplanation', function(event) {
			event.preventDefault();
			event.stopPropagation();
		}).on('selectChange', 'li', function(event) {
			event.preventDefault();
			var commandText = $(this).text().trim();
			var tmp = tipsMap[commandText];
			initCommandExplanation(tmp);
		});

		// 清空搜索历史
		$("#clear-history",$el).on("click",function(e){
			$.ajax({
        		url 	 : 'LogUserSearchAction_delLogUserSearchById.do',
      			dataType : "json",
      			type     : "POST"
        	}).fail(function(){
        		app.alert("服务出错,删除失败！");
        	}).done(function(){
        		$('.logSearchDetail-suggestion',$el).hide();
        	});
		});

		// 关闭搜索
		$("#close-history",$el).on("click",function(){
			$('.logSearchDetail-suggestion',$el).hide();
		});
		
		// 获取搜索历史
		function getSearchrecord() {
			app.common.ajaxWithAfa({
				url:'LogUserSearchAction_queryUserSearchInfoById.do',
			}).done(function (data) {
				var liHtmlString = '';

				if (data.result && data.result.length > 0) {
					for (var i = 0; i < data.result.length && i < 10; i++) {
						liHtmlString += '<li>'+data.result[i].text+'</li>';
					}
				}
				$('#logSearch_searchHistory',$el).html(liHtmlString);
				if(liHtmlString != ''){
					$('.logSearchDetail-suggestion',$el).show();
				}
			});
		}

		/**
		 * sqlSearch方式查询
		 * @param  {object} urlData url参数
		 * @return {undefined}
		 */
//		function sqlSearch(urlData) {
//			return app.common.ajaxWithAfa({
//				url:'ESSearchAction_sqlSearch.do',
//				data:urlData
//			}).done(function (data) {
//				var result = data.result;
//				if(result && !$.isEmptyObject(result)){
//					sqlSearchData = result;
//					loadSqlSearchStatisticsView();
//					$('.logSearchDetail-logInfo',$el).removeClass('noData');
//					$('.logSearchDetail-logInfo li>a',$el).eq(1).trigger('click');
//					$('#sqlSearchList>span:first').trigger('click').addClass('active');
//				}else{
//					$('.dataTables_paginate', $el).eq(0).removeClass('logSearchDetails-paginate');
//					$('.logSearchDetail-logInfo',$el).addClass('noData');
//					$('[view-role]', $el).hide();
//				}
//				app.shelter.hide();
//				return $.Deferred().resolve(data);
//			})
//		}
		
		function sqlSearch(urlData) {
			return app.common.ajaxWithAfa({
				url:'ESSearchAction_sqlSearchWithAggregationsParse.do',
				data:urlData
			}).done(function (data) {
				var result = data.result;
				app.shelter.hide();
				if(result && !$.isEmptyObject(result)){
					sqlSearchData = result;
//					loadSqlSearchStatisticsView();
					$('.logSearchDetail-logInfo',$el).removeClass('noData');
					$('.logSearchDetail-logInfo li>a',$el).eq(1).trigger('click');
					$('#sqlSearchList>span:first').trigger('click').addClass('active');
				}else{
					$('.dataTables_paginate', $el).eq(0).removeClass('logSearchDetails-paginate');
					$('.logSearchDetail-logInfo',$el).addClass('noData');
					$('[view-role]', $el).hide();
				}
				return $.Deferred().resolve(data);
			})
		}

		function splSearch(urlData) {
			return app.common.ajaxWithAfa({
				url:'ESSearchAction_SPLStatistics.do',
				data:urlData
			}).done(function (data) {
				var result = data.result;
				if(result && !$.isEmptyObject(result)){
					sqlSearchData = result;
//					loadSplSearchStatisticsView();
					$('.logSearchDetail-logInfo',$el).removeClass('noData');
					$('.logSearchDetail-logInfo li>a',$el).eq(1).trigger('click');
					$('#sqlSearchList>span:first', $el).trigger('click').addClass('active');
				}else{
					$('.dataTables_paginate', $el).eq(0).removeClass('logSearchDetails-paginate');
					$('.logSearchDetail-logInfo',$el).addClass('noData');
					$('[view-role]', $el).hide();
				}
				app.shelter.hide();
				return $.Deferred().resolve(data);
			})
		}

		//查看所有的可用字段
		function getFields(sourceIds) {
			$('#logUsed', $el).empty();
			app.shelter.hide()
			Fields = {};
			return app.common.ajaxWithAfa({
				url: "ESSearchAction_getFields.do",
				data: {
					sourceIds:sourceIds
				}
			}).done(function(data) {
				var data = data.result,html="";

				if(data && data.length>0){
					fieldNameMap = data;
					data.forEach(function (item) {
						if(item.type && item.name.indexOf('__context__') < 0){
							if(!Fields.hasOwnProperty(item.type)){
								Fields[item.type]=[{name:item.name,value:item.name,desc:item.desc}];
							}else{
								Fields[item.type].push({name:item.name,value:item.name,desc:item.desc});
							}
						}
						
						if(/*item.name != 'logjoin' &&*/ item.name != 'start' && item.name.indexOf('__context__') < 0 && item.name != '__struct__'){
							html += '<span data="'+item.name+'" title="'+item.desc+'"><span>'+item.type+'</span><span>'+item.name+'</span><span class="addChoose" title="选择字段">+</span></span>';
						}
					})
				}

				$('#logChoosed', $el).html('<span title="时间"><span>D</span><span>start</span></span>');
				$('#logUsed', $el).html(html);
				return $.Deferred().resolve(data);
			})
		}

		/**
		 * 添加日志表格列
		 * @param {array} coloums 列标识数组
		 */
		function addLogTableColoums(coloums) {
			if(coloums.length <= 0){
				return;
			}
			var logData = $logTable.data();

			var thHtml = '',
			thHtmlHidden = '',
			tbodyHtml = [],
			width,
			$theadObj = $('#logTable_wrapper .dataTables_scrollHead thead>tr',$el),
			$theadHiddenObj = $('#logTable>thead',$el),
			$trObjs = $('#logTable>tbody>tr',$el);

			width = '150px';
			coloums.map(function(elem) {
				thHtml += '<th field-role="'+elem+'" style="width:'+width+' !important;">'+elem+'</th>';

				thHtmlHidden += '<th field-role="'+elem+'" style="width:'+width+' !important; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; height: 0px;" class="sorting_disabled" rowspan="1" colspan="1">\
									<div class="dataTables_sizing" style="height:0;overflow:hidden;">\
									'+elem+'</div></th>';
			})

			for (var i = 0; i < logData.length; i++) {
				var tmpHtml = '';

				coloums.map(function(elem) {
					if(elem.indexOf('__struct__') < 0){
						var text = logData[i][elem] == undefined?'-':logData[i][elem];
						tmpHtml += '<td title="'+text+'" field-role="'+elem+'">'+text+'</td>';
					}else{
						var tmpitem = elem.split('.')[1];
						var text = logData[i]['__struct__'][tmpitem] == undefined?'-':logData[i]['__struct__'][tmpitem];
						tmpHtml += '<td title="'+text+'" field-role="'+elem+'">'+text+'</td>';
					}
					
				})
				tbodyHtml.push(tmpHtml);
			}

			/*$('th:last',$theadObj).before(thHtml);
			$('th:last',$theadHiddenObj).before(thHtmlHidden);

			$trObjs.each(function(index, el) {
				$('td:last', $(this)).before(tbodyHtml[index]);
			});*/
			$('th:last',$theadObj).after(thHtml);
			$('th:last',$theadHiddenObj).after(thHtmlHidden);

			$trObjs.each(function(index, el) {
				$('td:last', $(this)).after(tbodyHtml[index]);
			});
		}
		
		//组织top5数据
		function initTop5(data) {
			if (!data.length) {
				var str ='<div class="quickSearch-popularTop5">\
							<p style="text-align: center;">无记录</p>\
						</div';
			}else{
				var str = '<div class="quickSearch-popularTop5">\
						<p>TOP5 <span><i title="统计" class="fa fa-share-square-o"'+(isSqlSearch?'style="display:none;"':'')+'></i><i title="收起" class="fa fa-sort-up"></i></span></p>\
						<ul class="quickSearch-popularTop5List">';
				for (var i = 0; i < data.length; i++) {
					var tmpstr = 'right:-55px;';
					if(parseInt(data[i].percent) > 70){
						tmpstr = 'right: 40px;';
					}
					str += '<li>\
								<div class="count" title="'+(data[i].value||'-')+'">'+(data[i].value||'-')+'</div>\
								<div class="line">\
									<div class="blue" style="width: '+(data[i].percent||0)+'%">\
										<span class="quickSearch-icon" style="'+tmpstr+'"> '+(data[i].percent||'-')+'% </span>\
									</div>\
								</div>\
							</li>';
				}
				str += '</ul></div>';
			}

			return str;
		}

		// 日志统计切换
		$('.logSearchDetail-logInfo',$el).on('click', 'ul>li>a', function(event) {
			if($(this).hasClass('disabled') || $(this).hasClass('active')){
				return false;
			}
			var index = $(this).parent().index();
			if(!isSqlSearch && index && !logStatisticsViewObj){
				// 加载统计视图
		    	logStatisticsViewObj = app.dispatcher2.load({
					"title" : "",
					"moduleId" : 'logResultCheck',
					"section" : ['logSearchDetail','logStatisticsView'],
					"frameRenderTo" : '#normalSearch',
					"id" : 'logStatisticsView',
					"params" : { // 给标签传递参数
						Fields:Fields,
						urlData:urlData,
						$parentEl: $el,
						logStatisticsViewConfig:logStatisticsViewConfig
					},
					context: $el
				});

				logStatisticsViewConfig = undefined;
			}else if(index){
				$(this).trigger('echartsResize');
			}else if(index == 0){
				if(isSqlSearch && !sqlSearchFlag){
					app.shelter.show('正在加载数据');
					$logTable.clear().draw();
//					NOTREFRESHFIELDS = true;
				}
//				getFields(tmpArr).then(function (data) {
//					setLogSearchView(datas,elements,callback,mdata);
//				})
				/*var ths = $('#logTable thead th', $el);
				if(ths.length > 4){
					$('#logTable thead', $el).attr({
						'style': 'visibility:collapse;'
					});
				}*/
			}
		});
		
		function addField (field) {
			var field = $(this).parent().attr('data');
			choosedFields.push(field);
			addLogTableColoums([field]);
			$('.dataTables_scrollBody', $el).scrollLeft($('#logTable', $el).width());
		}
		
		//可用字段点击
		$('#logUsed',$el).on('click','>span',function(){
			if($(this).hasClass('active')){
				return;
			}

			$('.quickSearch-popularTop5',$el).remove();
			$(this).addClass('active').siblings().removeClass('active');
			var thisobj = $(this);
			var fieldName = thisobj.attr('data');
			var str = '<div class="quickSearch-popularTop5"><i class="fa fa-circle-o-notch fa-spin" style="color:#5164d7;"></i></div>';
			
			thisobj.after(str);
			app.common.ajaxWithAfa({
				url : 'ESSearchAction_getPopularTop.do',
				data: $.extend({}, urlData, {'fieldName':fieldName})
			}).done(function (data){
				$('.quickSearch-popularTop5',$el).remove();
				thisobj.after(initTop5(data.result));
			})
			
		}).on('click', '.addChoose', function(event) {
			console.log('addChoose')
			$(this).attr('title', '移除').addClass('close').removeClass('addChoose').html('&times;');
			var thisItem = $(this).parent().html();
			var field = $(this).parent().attr('data');
			var title = $(this).parent().attr('title');
			choosedFields.push(field);

			$(this).parent().next('.quickSearch-popularTop5').remove();
			$(this).parent().remove();
			$('#logChoosed',$el).append('<span data="'+field+'" title="'+title+'">'+thisItem+'</span>');
			// 数据处理
			addLogTableColoums([field]);
			$('.dataTables_scrollBody', $el).scrollLeft($('#logTable', $el).width());
			event.stopPropagation();
		}).on('click', '.fa-share-square-o', function(event) {
	    	logStatisticsViewObj && app.dispatcher2.unload('logStatisticsView');
    		logStatisticsViewObj = null;
    		var field = $('#logUsed>span.active', $el).attr('data');
    		logStatisticsViewConfig = {
    			paramData:{
    				typeValue:'数值分类统计',
    				echartsType:'bar',
    				fields:[field],
    				top:5
    			}
    		}
    		$('.logSearchDetail-logInfo li>a',$el).eq(1).trigger('click');
		}).on('click', '.fa-sort-up', function(event) {
			$('.quickSearch-popularTop5', $el).remove();
			$('#logUsed>span.active', $el).removeClass('active');
		});
		
		//已选字段点击删除
		$('#logChoosed',$el).on('click','span.close',function(e){
			$(this).attr('title', '选择字段').addClass('addChoose').removeClass('close').html('+');
			var thisItem = $(this).parent().html();
			var field = $(this).parent().attr('data');
			var title = $(this).parent().attr('title');
			var index = choosedFields.indexOf(field);
			choosedFields.splice(index,1);
			
			// 从表格中移除改列
			$('[field-role="'+field+'"]', $('#tabs11', $el)).remove();
			$(this).parent().remove();
			$('#logUsed',$el).append('<span data="'+field+'" title="'+title+'">'+thisItem+'</span>');
		});
		
		//左侧快速搜索收起展开
		$('#quickSearchHide',$el).on('click',function(e){
			$('.logSearchDetail-left',$el).toggleClass('move');
			$(this).toggleClass('fa-chevron-left fa-chevron-right');
			if ($(this).hasClass('fa-chevron-right')) {
				$(this).attr('title',"展开");
				$('.logSSSV-echarts', $el).css('width', 'calc(100vw - 345px)');
			}else{
				$(this).attr('title',"隐藏");
				$('.logSSSV-echarts', $el).css('width', 'calc(100vw - 545px)');
				if (clickSearch) {
					getAggsApp()
				}
			}
			$(this).trigger('echartsResize');
			handler.setTimeout(function(){ 
				echarts_bar.resize();
			},1010);
		});
		
		
		function getAggsApp () {
			var date = $('#dateSetectInput', $el).val().trim().split('~');
    		var startTime = date[0];
    		var endTime = date[1];
    		var cate = getAccessLogSetting();
    		var search = $('#searchInput', $el).text().trim();
			app.common.ajaxWithAfa({
				url:'ESSearchAction_aggsApp.do',
				data: {search, startTime, endTime, cate}
			}).done(function (data) {
				showTree(data.result);
				clickSearch = false;
			})
			
		}

		//日志页签收起展开
		$('#logTabHide',$el).click(function(e){
			$('#logChoosed',$el).parent().parent().toggleClass('move');
			$(this).toggleClass('fa-chevron-left fa-chevron-right');
			NOTREFRESHFIELDS = true;
			//$logTable.draw(false);
			if (getModalShow() && fieldCurrent.length === 0) {
				getFieldsTmp();
			}
			/*var obj = $('#logTableWarp', $el);
			if($(this).hasClass('fa-chevron-left')){
				obj.css('width', 'calc(100% - 200px)');
			}else{
				obj.css('width', '100%');
			}
			handler.setTimeout(function() {
				
				$('.dataTables_scrollHeadInner', obj).css('width', obj.width()+'px');
				$('.dataTables_scrollBody', obj).css('width', obj.width()+'px');
				$('.dataTables_scrollHead', obj).css('width', obj.width()+'px');
				$('table', obj).css('width', obj.width()+'px');
			}, 300);*/
		});
		
		function getFieldsTmp() {
			var tmpUrlData = $.extend(true, {}, urlData);
			tmpUrlData.search = $('#searchInput', $el).text().trim();
			if(!tmpUrlData.search){
				return;
			}
			var tmpArr = tmpUrlData.search.split('|');
			if (isSqlSearch){
				tmpUrlData.search = $.trim(tmpArr[0]);
			}
			tmpUrlData['from'] = 0;
			tmpUrlData['size'] = 0;
			delete tmpUrlData.interval;
			delete tmpUrlData.format;
			delete tmpUrlData.aggsTerm;
			app.common.ajaxWithAfa({
				url: "ESSearchAction_search.do",
				data: tmpUrlData
			}).done(function(mdata) {
				var tmp = [];
				try {
					var data = mdata.result.trees.sourceids;
					tmp = data.map(item => {
						return item.sourceid;
					})
				} catch (e) {
					tmp = [];
				}
				fieldCurrent = tmp;
//				if (tmp && tmp.length > 0) {
				getFields(tmp)
//				} 
			});
		}

		// echarts收起展开
		$('#echartsHide',$el).on('click', function(e){
			$('.logSearchDetail-echartsContent',$el).toggleClass('move');
			$('.logSearchDetail-logInfo',$el).toggleClass('move');
			$(this).toggleClass('fa-chevron-up fa-chevron-down');
			if($(this).hasClass('fa-chevron-up')){
				$('.dataTables_scrollBody',$el).css('height', 'calc(100vh - 340px)');
			}else{
				$('.dataTables_scrollBody',$el).css('height', 'calc(100vh - 245px)');
			}
			$(this).trigger('echartsResize');
		});

		// echarts类型切换
		$('#logEchartsLable', $el).on('click', 'span', function(event) {
			event.preventDefault();
			
			if($(this).hasClass('active')){
				return;
			}
			$(this).addClass('active').siblings().removeClass('active');

			urlData.aggsTerm = $(this).attr('data');
			// 刷新echarts
			echarts_bar && echarts_bar.clear();
			initEchartsData(urlData);
		});
		
		//echarts
		var isEchartsRefresh = false;
		function initEventCharts () {
			echarts_bar && echarts_bar.off('click');
			echarts_bar && echarts_bar.on('click', function (e) {
				if(urlData.aggsTerm != 'start'){
					return;
				}
				

	    	    var dateName = e.name;
	    	    var startTime,
	    	    	endTime;
	    	    if(dateName && dateName.indexOf('-') == -1){
					startTime = dateName+'-01-01 00:00:00';
					endTime = dateName+'-12-31 00:00:00';
				}else if(dateName && dateName.indexOf('-') >= 0 && dateName.split('-').length == 2){
					startTime = dateName+'-01 00:00:00';
					endTime = dateName+'-31 00:00:00';
				}else if(dateName && /^\d{4}-\d{2}-\d{2}$/.test(dateName)){
					startTime = dateName+' 00:00:00';
					endTime = dateName+' 23:59:59';
				}else if(dateName && /^\d{4}-\d{2}-\d{2} \d{2}$/.test(dateName)){
					startTime = dateName+':00:00';
					endTime = dateName+':59:59';
				}else if(dateName && /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateName)){
					startTime = dateName+':00';
					endTime = dateName+':59';
				}else{
					return;
				}

				if(startTime && endTime){
					isEchartsRefresh = true;
					$('#dateSetect', $el).text(startTime +'~'+ endTime);
					$('#dateSetectInput', $el).val(startTime +'~'+ endTime);
					$('#quickRange>li', $el).removeClass('active');
				}

	    	    $("#searchBtn",$el).trigger('click', [true,false,true]);
	    	});
		}

		function initEchartsData(url_data) {
			getEchartsData(url_data).then(function(data) {
				var obj = {data:[],title:[]}
				if (data.result && data.result != '') {
					var data = JSON.parse(data.result);
					
					var resultArr =	data.aggregations ? data.aggregations.grade_term.buckets : [];
					if(resultArr.length > 0) {
						for (var i = 0; i < resultArr.length; i++) {
							obj['data'].push(resultArr[i].doc_count);
							if(url_data.aggsTerm == 'start'){
								var dateObj = new Date(resultArr[i].key_as_string).Format(url_data.format);
								obj['title'].push(dateObj);
							}else{
								obj['title'].push(resultArr[i].key);
							}
							
						}
						$('#logEchartsLable', $el).css('visibility', 'visible');
						drawBar(echarts_bar,obj);
						
						/**
						 * 重新打开列
						 */
						
					}
				}
			})
    	}

    	function getEchartsData(url_data) {
    		var tmpUrlData = $.extend(true, {}, url_data);
    		var searchInput = url_data.search;
    		if(searchInput.split('|').length > 1){
    			tmpUrlData.search = $.trim(searchInput.split('|')[0]);
    		}

    		return app.common.ajaxWithAfa({
				url: "ESSearchAction_getDocCountEchars.do",
				data: tmpUrlData
			}).done(function(data) {
				return $.Deferred().resolve(data);
			})
    	}

		function drawBar($echarts,obj){
			 var option3= {
			 		tooltip: {
						trigger: 'axis',
						confine: true
					},
					 series : [{
						 data : obj.data,  
						 type:'bar',
						 name: '日志事件',
						/* barMaxWidth: 20,*/
						 barGap:'30%',
						 smooth:true,
						 itemStyle: {
							 normal: {
								 // color: '#5266d7'
								 color: '#55a8fd'
							 }
						 },
						 animation:true,
					 }],
					 xAxis : [{
						 data: obj.title,  
						 "offset":0,
						 "axisLine" : {
							 show: true,
							 lineStyle : {
								 color : '#929099',
							 }
						 },
						 "axisLabel":{
							 "show":true,
							 "textStyle":{
								 "color":"#676570",
								 "align":"center",
								 "fontSize":10
							 }
						 }
					 }],
					 yAxis : [{
						 "type":"value",
						 "offset": 0,
						 "axisLine":{
							 "show":false,
							 lineStyle : {
								 color : '#929099',
							 }
						 },
						 "axisLabel":{
							 "show":true,
							 "textStyle":{
								 "color":"#676570",
								 "align":"right",
								 "fontSize":10,
							 }
						 },
						 "axisTick": {            // 坐标轴小标记
					        show: false,       // 属性show控制显示与否，默认不显示
					     },
						 "splitLine" : {
							 show : true,
							 lineStyle : {
								 color : '#eee',
								 width: 0.5
							 }
						 },
						 splitNumber: 2
					 }],
					 grid:{
						 show:false,
						 x: 10,
						 x2: 0,
						 y: 10,
						 y2: 0,
						 borderWidth:0,
						 containLabel :true 
					 },
					 legend: {
						 "show": false,
					 },
					 title : {
						 "show": false,
						 "text": '单位：MS',
					 },
					 color:'#496cdf'
			 };
			 $echarts.setOption(option3);
		}

		function getAllEventModel() {
			return app.common.ajaxWithAfa({
				url:'LogWarningAction_getAllEventModel.do'
			}).done(function (data) {

				return $.Deferred().resolve(data)
			})
		}
		// 存为预警
		$('#saveAsWarn', $el).on('click', function(event) {
			if($('#searchInput',$el).text() == ''){
				app.alert('请先输入搜索条件');
				return;
			}
			app.dispatcher.load({
				"title" : "另存为预警",
				"moduleId" : 'applicationConfiger',
				"section" : 'alarmStrategyAlert',
				"id" : 'alarmStrategyAlert',
				"params" : {
					sql: $('#searchInput',$el).text()
				}
			});
			// eventModel = undefined;
			// getAllEventModel().then(function (data) {
			// 	if(data.result && data.result.length > 0){
			// 		eventModel = {
			// 			'0':{
			// 				name:'自定义',
			// 				content:''
			// 			}
			// 		};
			// 		data.result.forEach(function (item) {
			// 			eventModel[item.id] = {
			// 				name: item.name,
			// 				content: item.content
			// 			}
			// 		})
			// 	}

			// 	$warningModal.modal('show');
			// 	initWarningModal();
			// })
		});
		// 预警模态框事件
		$warningModal.on('click', '.confirmBtn', function(event) {
			app.common.ajaxWithAfa({
				url:'LogWarningAction_addWarning.do',
				data:{
					warning: JSON.stringify(getWarningModalData())
				}
			}).done(function (data) {
				if(data.result){
					app.alert('保存成功');
				}else{
					app.alert('保存失败');
				}
				$warningModal.modal('hide');
			})
		}).on('change', 'select[name="planType"]', function(event) {
			var value = $(this).val();
			if(value == 1){
				$('#planCondition', $warningModal).show();
			}else{
				$('#planCondition', $warningModal).hide();
			}
		}).on('change', 'select[name="conditions"]', function(event) {
			var value = $(this).val();
			if(value == 5 || value == 6){
				$('#conditionsUser', $warningModal).show();
				$('#conditionsNormal', $warningModal).hide();
			}else{
				$('#conditionsUser', $warningModal).hide();
				$('#conditionsNormal', $warningModal).show();
			}
		}).on('change', 'select[name="scheduleType"]', function(event) {
			var value = $(this).val();
			$(this).parent().parent().next().children().hide();
			if(value == 1){
				$('#minute', $warningModal).show();
			}else if(value == 2){
				$('#time', $warningModal).show();
			}else if(value == 3){
				$('#day', $warningModal).show();
				$('#time', $warningModal).show();
			}else if(value == 4){
				$('#date', $warningModal).show();
				$('#time', $warningModal).show();
			}
		}).on('change', '#modelSelect', function(event) {
			var value = $(this).val();
			$('[name=eventModel]', $warningModal).val(eventModel[value].content);
		});

		// 初始化预警模态框
		function initWarningModal() {
			$warningModal.find('form')[0].reset();
			$('#planCondition', $warningModal).show();

			$('#conditionsUser',$warningModal).hide();
			$('#conditionsNormal',$warningModal).show();

			$('#minute', $warningModal).show();

			$('#search', $warningModal).val($('#searchInput',$el).text());

			if(eventModel){
				var tmpHtml = '';
				for (var item in eventModel) {
					tmpHtml += '<option value="'+item+'">'+eventModel[item].name+'</option>'
				}
				$('#modelSelect', $el).html(tmpHtml).trigger('change');
			}
			var searchInput = $('#searchInput', $el).text().trim();
			$("select[name='conditions']>option", $el).addClass('hide');
			if(searchInput.split('|').length > 1){
				var tmpText = $.trim(searchInput.split('|')[1]);
				if(/^SELECT/gi.test(tmpText)){
					$("select[name='conditions']>option[data-type='sqlSearch']", $el).removeClass('hide');
					$("select[name='conditions']", $el).val('6');
					$("select[name='conditions']", $el).trigger('change');
				}
    		} else {
    			$("select[name='conditions']>option:not([data-type='sqlSearch'])", $el).removeClass('hide');
    		}
    			
		}
		/**
		 * 获取预警模态框数据
		 */
		function getWarningModalData() {
			var paramData = app.common.serializeObject($warningModal.find('form'));
			if(paramData.planType == 1){
				var interval = ['00','00','00'];
				if(paramData.scheduleType == 1){
					interval[2] = $('#minute', $warningModal).find('select').val();
				}else if(paramData.scheduleType == 2){
					interval[1] = $('#time', $warningModal).find('select').val();
				}else if(paramData.scheduleType == 3){
					interval[0] = $('#day', $warningModal).find('select').val();
					interval[1] = $('#time', $warningModal).find('select').val();
				}else if(paramData.scheduleType == 4){
					interval[0] = $('#date', $warningModal).find('select').val();
					interval[1] = $('#time', $warningModal).find('select').val();
				}
				paramData.intervalTime = interval.join();
			}else{
				paramData.scheduleType = undefined;
			}
			paramData.isOpen = $('#isOpen',$warningModal).hasClass('true')?1:2;

			if(paramData.conditions == 5 || paramData.conditions == 6){
				paramData.customize = $('#conditionsUser', $warningModal).find('input').val();
				paramData.result = undefined;
				paramData.compare = undefined;
			}
			
    		paramData.logType = $('#accessLog',$el).attr('data-val');

    		if(paramData.logType == '0'){
    			paramData.mustValue = getAccessLogSetting();
    			paramData.appIds = getAppId();
    		}
    		paramData.search = $('#search', $warningModal).val();
			return paramData;
		}

		// 绑定日历
		initCallate();
		var daterange;
		function initCallate () {
			daterange = $('#dateRangeTab>li:eq(1)', $el).daterangepicker({
			    "timePicker": true,
			    "timePicker24Hour": true,
			    "timePickerSeconds": true,
			    /*"autoApply": true,*/
			    "parentEl": $el,
			    "locale": {
			        "direction": "ltr",
			        "format": "YYYY-MM-DD HH:mm:ss",
			        "separator": " - ",
			        "applyLabel": "确定",
			        "cancelLabel": "取消",
			        "fromLabel": "起始时间",
			        "toLabel": "结束时间",
			        "customRangeLabel": "自定义",
			        "daysOfWeek": ["日","一","二","三","四","五","六"],
			        "monthNames": ['一月', '二月', '三月', '四月', '五月', '六月',
	                  '七月', '八月', '九月', '十月', '十一月', '十二月'],
			        "firstDay": 1
			    },
//			    "startDate": moment(new Date(sDate)),
//			    "endDate": moment(new Date(eDate)),
			    /*"maxDate": new Date(),*/
			    "applyClass": "confirmBtn",
			    "cancelClass": "btn-default hide"
			}, function(start, end, label) {
			});
			
		}
		$('#dateRangeTab>li:eq(1)', $el).on('show.daterangepicker',function(ev, picker) {
			$('.daterangepicker', $el).css({
				'margin-top': '-39px',
    			'margin-left': '-1px'
			})
		});
		$('#dateRangeTab>li:eq(1)', $el).on('apply.daterangepicker',function(ev, picker) {
			$('#dataRangeSetectBtn', $el).click();
		});
		// 日期选择
		$('#dateSetect', $el).on('click', function(event) {
			if($('#dateSetectContent', $el).css('display') == 'none'){
				$('#dateSetectContent', $el).show();
				$('#dateRangeTab>li.active', $el).click();
			}else{
				$('#dataRangeSetectBtn', $el).click();
			}
		});
		// 点击ul,隐藏日期选择
		$('#dateRangeTab', $el).on('click', function(event) {
			if(event.target == this){
				$('#dateSetectContent', $el).hide();
			}
		});
		// 快速选择事件
		$('#quickRange', $el).on('click', 'li', function(event) {
			if(!$(this).hasClass('active')){
				$(this).addClass('active').siblings().removeClass('active');
			}
			$('#dataRangeSetectBtn', $el).click();
		});

		function loadSqlSearchStatisticsView() {
			if(!sqlSearchStatisticsViewObj){
				// 加载统计视图
		    	sqlSearchStatisticsViewObj = app.dispatcher2.load({
					"title" : "",
					"moduleId" : 'logResultCheck',
					"section" : ['logSearchDetail','sqlSearchStatisticsView'],
					"frameRenderTo" : '#sqlSearch',
					"id" : 'sqlSearch',
					"params" : { // 给标签传递参数
						sqlSearchData:sqlSearchData,
						urlData:urlData,
						$parentEl: $el,
						logStatisticsViewConfig:logStatisticsViewConfig,
						searchType: 'sql',
						fieldNameMap: fieldNameMap,
						fieldName: fieldName,
						dashboardId: dashboardId,
						dataBordName: dataBordName,
						echartsType: echartsType,
						appids: getAppIdsRecord().join(',')
					},
					context: $el
				});
				logStatisticsViewConfig = undefined;
			}
		}

		function loadSplSearchStatisticsView() {
			if(!sqlSearchStatisticsViewObj){
				// 加载统计视图
		    	sqlSearchStatisticsViewObj = app.dispatcher2.load({
					"title" : "",
					"moduleId" : 'logResultCheck',
					"section" : ['logSearchDetail','sqlSearchStatisticsView'],
					"frameRenderTo" : '#sqlSearch',
					"id" : 'sqlSearch',
					"params" : { // 给标签传递参数
						sqlSearchData:sqlSearchData,
						urlData:urlData,
						$parentEl: $el,
						logStatisticsViewConfig:logStatisticsViewConfig,
						searchType: 'spl'
					},
					context: $el
				});
				logStatisticsViewConfig = undefined;
			}
		}

/**************************分割线***************************/
		$('.logSearchDetail-viewChange', $el).on('click', 'i', function(event) {
			event.preventDefault();
			if ($(this).hasClass('active')) {
				return;
			}
			$(this).addClass('active').siblings().removeClass('active');
			if($('.logSearchDetail-logInfo',$el).hasClass('noData')){
				return;
			}
			var index = $(this).index();
			if(index){
				if($(this).attr('loadAble') == 'true'){
					getFileTableData(urlData);
					getHosts(urlData);
					$(this).removeAttr('loadAble');
				}
				$('[view-role="tableView"]', $el).hide().next().show();
			}else{
				$('[view-role="tableView"]', $el).show().next().hide();
			}
		});
		// 文件视图展示类型切换
		$('.fileViewType', $el).on('click', 'i', function(event) {
			event.preventDefault();
			if($(this).hasClass('active')){
				return;
			}
			var index = $(this).index();
			if(index){
				$('.filePictureView', $el).show().siblings().hide();
			}else{
				$('.filePictureView', $el).hide().siblings().show();
			}
			$(this).addClass('active').siblings().removeClass('active');
		});

		function getFileTableData(urlData) {
			app.shelter.show('加载中。。。');
			if($fileTable){
				$fileTable.clear().draw();
			}else{
				$fileTable = $("#fileTable", $el).DataTable({
					'searching': true,
					'bPaginate': true, // 开关，是否显示分页器
					'pageLength': 10,
					'bSort': false,
					'bAutoWidth': false,
					'columns':[{
						data: 'i',defaultContent:''
					},{
						data: 'ip',defaultContent:''
					},{
						data: 'index',defaultContent:''
					},{
						data: 'file',defaultContent:''
					},{
						data: 'size',defaultContent:''
					},{
						data: 'time',defaultContent:''
					}],
					'aoColumnDefs': [{
						"render": function(data, type, row, meta) {
							var date = data.split("-")[1];
							return date.substr(0,4)+'-'+date.substr(4,2)+'-'+date.substr(6,2);
						},
						"targets": 2
					}]
				});
			}
			app.common.ajaxWithAfa({
				url:'ESSearchAction_statisLogFile.do',
				data:urlData
			}).done(function (data) {
				if(data.result && data.result.length > 0){
					data.result.forEach(function (item, index) {
						item.i = index+1;
						item.size = transforNumber(item.size);
					})
					$fileTable.rows.add(data.result).draw();
					fileTableData = data.result;
				}
				app.shelter.hide();
				$('.fileViewType>i:eq(0)', $el).trigger('click');
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

		$("#fileTable", $el).on('click','tr', function(event) {
			event.preventDefault();
			var data = $fileTable.row($(this)).data();
			if(!data){
				return;
			}
			var tmpData={}
			$.extend(true, tmpData, urlData, {
				currentPath:data.file,
				host:data.ip,
				index: data.index,
				fileName: data.file
			});
			loadLogFileDetail(tmpData);
		});
		// 文件列表事件
		$('#fileViewList', $el).on('dblclick', '.fileViewItem', function(event) {
			event.preventDefault();
			if(!OPERABLE){
				return;
			}
			OPERABLE = false;
			if($(this).attr('data-type') == 'file'){
				var tmpData={};
				var currentPath = $(this).attr('data-path').slice(0,-1);
				var host = $('#fileViewNav', $el).find('[data-host]').attr('data-host');
				$.extend(true, tmpData, urlData, {
					currentPath:currentPath,
					host:host
				});
				var index = null;
				try {
					index = fileTableData[0].index;
					tmpData['index'] = index;
					loadLogFileDetail(tmpData);
					OPERABLE = true;
				} catch (e) {
					
				}
				return;
			}
			var name = $(this).attr('title');
			urlData.currentPath = $(this).attr('data-path');
			if($(this).attr('data-type') == 'host'){
				var cate = JSON.parse(urlData.cate);
				cate.hosts = {
					host:[$(this).attr('data-host')]
				};
				urlData.cate = JSON.stringify(cate);

				getSearchFileView(urlData, name, cate.hosts.host[0]);
			}else{
				getSearchFileView(urlData, name);
			}
			event.stopPropagation();
		}).on('click', '.fileViewItem', function(event) {
			event.preventDefault();
			if($(this).hasClass('active')){
				return;
			}
			$(this).addClass('active').siblings().removeClass('active');
		});

		// 文件导航事件
		$('#fileViewNav', $el).on('click', 'span', function(event) {
			event.preventDefault();
			if($(this).hasClass('active') || !OPERABLE){
				return;
			}
			$(this).addClass('active');
			OPERABLE = false;
			urlData.currentPath = $(this).attr('data-path');
			if(urlData.currentPath == '/'){
				var cate = JSON.parse(urlData.cate);
				delete cate.hosts;
				urlData.cate = JSON.stringify(cate);
				urlData.currentPath = undefined;
				getHosts(urlData);
			}else{
				if(!urlData.currentPath){
					urlData.currentPath = '/';
				}
				getSearchFileView(urlData);
			}

			$(this).nextAll().remove();

		});

		function loadLogFileDetail(urlData) {
			app.dispatcher.load({
				"title" : "文件查看",
				"moduleId" : 'logResultCheck',
				"section" : 'logFileDetail',
				"id" : 'logFileDetail'+app.global.getUniqueId(),
				"params" : { // 给标签传递参数
					urlData: urlData
				}
			});
		}
		/**
		 * 获取主机列表
		 * @param  {[type]} urlData [description]
		 * @return {[type]}         [description]
		 */
		function getHosts(urlData) {
			app.shelter.show('加载中。。。');
			delete urlData.size;
			urlData.aggsTerm = '_head_.hostip';
			getEchartsData(urlData).then(function (data) {
				if (data.result && data.result != '') {
					var jsonData = JSON.parse(data.result),
					buckets = jsonData.aggregations.grade_term.buckets,
					itemData = [];
					if(buckets && buckets.length > 0){
						buckets.forEach(function (item) {
							itemData.push({
								name:item.key,
								type:'host',
								path:'/',
								host:item.key
							})
						})
						showFileViewItem(itemData);
					}
					$('#fileViewNav', $el).html('<span class="active" data-path="/">全部</span>');
				}else{
					app.alert('title', '获取主机失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
				}
				app.shelter.hide();
				OPERABLE = true;
			})
		}

		/**
		 * 获取文件列表
		 * @param  {[type]} urlData [description]
		 * @param  {[type]} name    [description]
		 * @param  {[type]} host    [description]
		 * @return {[type]}         [description]
		 */
		function getSearchFileView(urlData, name, host) {
			app.shelter.show('加载中。。。');
			app.common.ajaxWithAfa({
				url:'ESSearchAction_searchFileView.do',
				data:urlData
			}).done(function (data) {
				var path = urlData.currentPath;
				var result = data.result,
				resultData = [];
				if(result && !$.isEmptyObject(result)){
					if(result.folders && result.folders.length > 0){
						result.folders.forEach(function (item) {
							resultData.push({
								name:item,
								type:'folder',
								path:path+item+'/',
							});
						})
					}

					if(result.files && result.files.length > 0){
						result.files.forEach(function (item) {
							resultData.push({
								name:item,
								type:'file',
								path:path+item+'/',
							});
						})
					}
				}else{
					app.alert('title', '获取文件失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
				}
				showFileViewItem(resultData);
				if(name){
					$('#fileViewNav span', $el).removeClass('active');
					if(host){
						$('#fileViewNav', $el).append('<span class="active" data-host="'+host+'">'+name+'</span>');
					}else{
						$('#fileViewNav', $el).append('<span class="active" data-path="'+urlData.currentPath+'">'+name+'</span>');
					}
				}
				app.shelter.hide();
				OPERABLE = true;
			})
		}

		/**
		 * 展示文件列表
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		function showFileViewItem(data){
			var htmlString = '',
			typeClass;
			if(data && data.length > 0){
				data.forEach(function (item) {
					if(item.type == 'host'){
						typeClass = 'fa-desktop';
					}else if(item.type == 'folder'){
						typeClass = 'fa-folder-open-o';
					}else if(item.type == 'file'){
						typeClass = 'fa-file-text-o';
					}

					var tmpName = item.name;
					if(tmpName.length > 10){
						tmpName = tmpName.substr(0, 3)+'...'+tmpName.substr(-7, 7);
					}

					htmlString +='<li class="fileViewItem" data-host="'+item.host+'" data-type="'+item.type+'" data-path="'+item.path+'" title="'+item.name+'">' +
						'<div class="fileViewItemImg"><i class="fa '+typeClass+'"></i></div>' +
						'<div class="fileViewItemName">'+tmpName+'</div>' +
					'</li>';
				})
			}
			$('#fileViewList', $el).html(htmlString);
		}


/*日志上下文查看start*/
		$('#showLogContext', $el).on('click', '.logContextDetail-close', function(event) {
			event.preventDefault();
			$(this).parents('#showLogContext').removeClass('active');
		}).on('click', '.loadUp', function(event) {
			event.preventDefault();
			if ($(this).hasClass('disabled')) {
				return false;
			}
			$(this).addClass('disabled');
			var data = $(this).parents('#showLogContext').data(),
			$li = $('#logContextDetailList>li:eq(0)', $el),
			preambleTime = $li.attr('ACQTIME'),
			index = $($li.find('span')[0]).text();
			$li.before('<li class="loadingUp" style="display:flex;align-items: center;justify-content: center;"><i class="fa fa-spinner fa-pulse"></i></li>');
			$li.prev()[0].scrollIntoView({block: "end"});
			handler.setTimeout(function() {
				ininLogContextDetail({
                    index: data.index,
                    host:data.host,
                    fileName:data.fileName,
                    parent:data.parent,
                    preambleTime:preambleTime
				},index);
			}, 500);
		}).on('click', '.loadDown', function(event) {
			event.preventDefault();
			if ($(this).hasClass('disabled')) {
				return false;
			}
			$(this).addClass('disabled');
			var data = $(this).parents('#showLogContext').data(),
			$li = $('#logContextDetailList>li:last', $el),
			postambleTime = $li.attr('ACQTIME'),
			index = $($li.find('span')[0]).text();
			$li.after('<li class="loadingDown" style="display:flex;align-items: center;justify-content: center;"><i class="fa fa-spinner fa-pulse"></i></li>')
			$li.next()[0].scrollIntoView({block: "start"});
			handler.setTimeout(function() {
				ininLogContextDetail({
                    index: data.index,
                    host:data.host,
                    fileName:data.fileName,
                    parent:data.parent,
                    postambleTime:postambleTime
				},index);
			}, 500)
		});

		/**
		 * 填充日志上下文
		 * @param  {[type]} param url参数
		 * @param  {[type]} flag  小于0:前20行,大于0:后20行,默认：前后各20行
		 * @return {[type]}       [description]
		 */
		function ininLogContextDetail(param, flag) {
			return app.common.ajaxWithAfa({
				url:'ESSearchAction_getLogContext.do',
				data:{
					preambleTime:param.preambleTime,
					postambleTime:param.postambleTime,
					// logName:param.logName,
					host:param.host,
					fileName:param.fileName,
					index:param.index
				}
			}).done(function (data) {
				var preHtml='',
				nextHtml='',
				currentHtml='',
				preIndex = flag||0
				nextIndex = flag||0;
				if(data.result && !$.isEmptyObject(data.result)){
					var postamble = data.result.__postamble__||[];
					var preamble = data.result.__preamble__||[];
					for (var i = 0; i < postamble.length; i++) {
						var iHtml = '<i class="fa fa-circle" style="color:gray;"></i>';
						if(postamble[i].PARENT == param.parent){
							iHtml = '<i class="fa fa-circle" style="color:green;"></i>'
						}
						nextHtml +='<li ACQTIME="'+postamble[i].ACQTIME+'" FILE="'+postamble[i].FILE+'"><span>'+(++nextIndex)+'</span><span>'+iHtml+'</span><span>'+(new Date(postamble[i].LOGTIME).Format("yyyy-MM-dd hh:mm:ss.S"))+'</span><span>'+postamble[i].LOG+'</span></li>';
					}
					if(!flag){
						currentHtml = '<li class="active"><span>0</span><span><i class="fa fa-star" style="color:red;"></i></span><span>'+(new Date(Number(param.logtime)).Format("yyyy-MM-dd hh:mm:ss.S"))+'</span><span>'+param.logtext+'</span></li>';
					}
					var len = preamble.length;
					var preIndexArray = [];
					for (let i = 0; i < len; i++) {
						preIndexArray.push(--preIndex);
					}
					preIndexArray.reverse();
					for (var i = 0; i < len; i++) {
						var iHtml = '<i class="fa fa-circle" style="color:gray;"></i>';
						if(preamble[i].PARENT == param.parent){
							iHtml = '<i class="fa fa-circle" style="color:green;"></i>';
						}
						preHtml +='<li ACQTIME="'+preamble[i].ACQTIME+'" FILE="'+preamble[i].FILE+'"><span>'+(preIndexArray[i])+'</span><span>'+iHtml+'</span><span>'+(new Date(preamble[i].LOGTIME).Format("yyyy-MM-dd hh:mm:ss.S"))+'</span><span>'+preamble[i].LOG+'</span></li>';
					}
					if(flag > 0){
						$('#logContextDetailList>li:last', $el).remove();
						$('.loadDown', $el).removeClass('disabled');
					}else if(flag < 0){
						$('#logContextDetailList>li:eq(0)', $el).remove();
						$('.loadUp', $el).removeClass('disabled');
					}

					if(!flag){
						$('#logContextDetailList', $el).html(currentHtml).prepend(preHtml).append(nextHtml);
						$('#logContextDetailList>li.active', $el)[0].scrollIntoView({block: "start",behavior: "smooth"});
					}else{
						$('#logContextDetailList', $el).prepend(preHtml).append(nextHtml);
					}
				}else{
					if(flag > 0){
						$('.loadDown', $el).addClass('disabled');
						$('#logContextDetailList .loadingDown', $el).remove();
					}else if(flag < 0){
						
						$('#logContextDetailList .loadingUp', $el).remove();
						$('.loadUp', $el).addClass('disabled');
					}else{
						$('.loadDown,.loadUp', $el).addClass('disabled');
						$('#logContextDetailList .loadingUp', $el).html('暂无数据');
					}
				}
				return $.Deferred().resolve(data);
			})
		}
/*日志上下文查看end*/
/*二次结构化start*/
		var $logSourceTable = $("#logSourceTable", $el).DataTable({
			'searching': true,
			'bPaginate': false, // 开关，是否显示分页器
			'bSort': false,
			'bAutoWidth': false,
			'columns':[{
				data: 'selected',defaultContent:''
			},{
				data: 'sourceId',defaultContent:''
			},{
				data: 'sourceName',defaultContent:''
			},{
				data: 'appName',defaultContent:''
			},{
				data: '',defaultContent:''
			},{
				data: 'collectionCumulant',defaultContent:''
			},{
				data: 'logName',defaultContent:''
			}],
			'aoColumnDefs': [{
				'render':function(data,type,row,meta){
					if(data == true){
						return '<i class="fa fa-check-square selected"></i>';
					}else{
						return '<i class="fa fa-square-o"></i>';
					}
				},
				'targets': 0
			},{
				'render':function(data,type,row,meta){
					return ''+row.category1+'>'+row.category2+'>'+row.category3;
				},
				'targets': 4
			},{
				'render':function(data,type,row,meta){
					if(data < 1024){
						return data+'B';
					}else if(data < 1024*1024){
						return (data/1024).toFixed(2)+'KB';
					}else if(data < 1024*1024*1024){
						return (data/1024/1024).toFixed(2)+'MB';
					}else if(data < 1024*1024*1024*1024){
						return (data/1024/1024/1024).toFixed(2)+'GB';
					}else if(data < 1024*1024*1024*1024*1024){
						return (data/1024/1024/1024/1024).toFixed(2)+'TB';
					}
				},
				'targets': 5
			},{
				'render':function(data,type,row,meta){
					return '<span class="selectRole" logId="'+row.logId+'">'+data+'</span>';
				},
				'targets': 6
			}]
		})

		$('#reStructData', $el).on('click', function(event) {
			event.preventDefault();
			if(urlData && !$.isEmptyObject(urlData)){
				initReStructDataModal();
			}else{
				app.alert('请先进行搜索');
			}
		});

		$('#reStructDataModal', $el).on('click', '#selectAll', function(event) {
			event.preventDefault();
			var $reStructDataModal = $('#reStructDataModal', $el);
			if($(this).hasClass('fa-check-square')){//取消选择
				$(this).addClass('fa-square-o').removeClass('fa-square-o fa-minus-square selected');
				$reStructDataModal.find('tbody i.fa-check-square').trigger('click');
			}else{
				$reStructDataModal.find('tbody i.fa-square-o').trigger('click');
				$(this).addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
			}
			$("#logSourceTable .fa", $el).trigger('roleSelected');
			return;
		}).on('click', '.fa-check-square', function(event) {
			event.preventDefault();
			var $reStructDataModal = $('#reStructDataModal', $el);
			$(this).removeClass('fa-check-square selected').addClass('fa-square-o');
			$(this).parents('tr').removeClass('selected');
			var data = $logSourceTable.row($(this).parents('tr')).data();
			if(data.selected){
				data.selected = undefined;
			}
			$logSourceTable.row($(this).parents('tr')).data(data).draw();
			var trLen = $reStructDataModal.find('tbody tr').length;
			var selectedTr = $reStructDataModal.find('tbody tr.selected').length;
			var $selectAll = $('#selectAll', $reStructDataModal);
			if(selectedTr == trLen){
				$selectAll.addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
			}else if(selectedTr == 0){
				$selectAll.addClass('fa-square-o').removeClass('fa-check-square selected fa-minus-square');
			}else{
				$selectAll.addClass('fa-minus-square selected').removeClass('fa-check-square fa-square-o');
			}
			$("#logSourceTable .fa", $el).trigger('roleSelected');
		}).on('click', '.fa-square-o', function(event) {
			event.preventDefault();
			var $reStructDataModal = $('#reStructDataModal', $el);
			$(this).parents('tr').addClass('selected');
			$(this).addClass('fa-check-square selected').removeClass('fa-square-o');
			var data = $logSourceTable.row($(this).parents('tr')).data();
			data.selected = true;
			$logSourceTable.row($(this).parents('tr')).data(data).draw();
			var trLen = $reStructDataModal.find('tbody tr').length;
			var selectedTr = $reStructDataModal.find('tbody tr.selected').length;
			var $selectAll = $('#selectAll', $reStructDataModal);
			if(selectedTr == trLen){
				$selectAll.addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
			}else if(selectedTr == 0){
				$selectAll.addClass('fa-square-o').removeClass('fa-check-square selected fa-minus-square');
			}else{
				$selectAll.addClass('fa-minus-square selected').removeClass('fa-check-square fa-square-o');
			}
			$("#logSourceTable .fa", $el).trigger('roleSelected');
		}).on('roleSelected', '.fa', function(event) {
			event.preventDefault();
			var size = 0;
			var trs = $("#logSourceTable tbody>tr.selected", $el);
			if(trs && trs.length > 0){
				for (var i = trs.length - 1; i >= 0; i--) {
					var tmp = $logSourceTable.row($(trs[i])).data().collectionCumulant;
					if(tmp){
						size += parseInt(tmp);
					}
				}
			} 
			var resultStr;
			if(size < 1024){
				resultStr = size+'B';
			}else if(size < 1024*1024){
				resultStr = (size/1024).toFixed(2)+'KB';
			}else if(size < 1024*1024*1024){
				resultStr = (size/1024/1024).toFixed(2)+'MB';
			}else if(size < 1024*1024*1024*1024){
				resultStr = (size/1024/1024/1024).toFixed(2)+'GB';
			}else if(size < 1024*1024*1024*1024*1024){
				resultStr = (size/1024/1024/1024/1024).toFixed(2)+'TB';
			}
			$('[name="dataSize"]', $('#reStructDataModal', $el)).val(resultStr).attr('size', size);
		})
		// 选择解析规则
		.on('click', '.selectRole', function(event) {
			if($(this).hasClass('active')){
				return;
			}

			$('.selectRole', $('#reStructDataModal', $el)).removeClass('active');
			$(this).addClass('active');
			var id = $(this).attr('logId');
			$('.roleSelectItems span', $el).removeClass('active');
			$('.roleSelectItems span[logId="'+id+'"]', $el).addClass('active');

			$('.reStructDataModal-roleSelectContent', $el).show();
			var top = $(this).position().top+ 30 - $('.reStructDataModal-roleSelectContent', $el).height()/2;
			$('.reStructDataModal-roleSelectContent', $el).css('top', top+'px');
			event.stopPropagation();
		})
		// 解析规则改变
		.on('RoleChange', '.selectRole', function(event, logId, logName) {
			var tr = $(this).parents('tr');
			var data = $logSourceTable.row($(this).parents('tr')).data();
			data.logId = logId;
			data.logName = logName;
			$logSourceTable.row($(this).parents('tr')).data(data).draw();
			tr.find('.selectRole').addClass('active');
		})
		// 解析规则选择
		.on('click', '.role', function(event) {
			event.preventDefault();
			if($(this).hasClass('active')){
				return;
			}

			$('.roleSelectItems span', $el).removeClass('active');
			$(this).addClass('active');
			var id = $(this).attr('logId');
			$('.selectRole.active', $('#reStructDataModal', $el)).text($(this).text()).attr('logId', id).trigger('RoleChange',[id, $(this).text()]);
		})
		// 关闭解析规则选择
		.on('click', '.roleSelectContent-close', function(event) {
			event.preventDefault();
			$('.reStructDataModal-roleSelectContent', $el).hide();
			$('.selectRole', $('#reStructDataModal', $el)).removeClass('active');
		})
		// 任务提交
		.on('click', '.confirmBtn', function(event) {
			var data = formatReStructDataModalData();
			if(data){
				submitReStructDataModalData(data).then(function (data) {
					if(data.result){
						app.alert('操作成功');
					}else{
						app.alert('title', '操作失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
					}
					$('#reStructDataModal', $el).modal('hide');
				})
			}
		})
		// 任务管理
		.on('click', '.taskBtn', function(event) {
			event.preventDefault();
			$('#reStructDataModal', $el).modal('hide');
			app.dispatcher.load({
				"title": "结构化任务管理",
				"moduleId": 'logReformatTaskManager',
				"section": '',
				"id": '',
				"params": {
				}
			})
		});

		/**
		 * 提交二次结构化任务
		 * @param  {[type]} urlData [description]
		 * @return {[type]}         [description]
		 */
		function submitReStructDataModalData(urlData) {
			return app.common.ajaxWithAfa({
				url:'LogCfgTaskAction_addLogTask.do',
				data: urlData
			}).done(function (data) {
				return $.Deferred().resolve(data);
			})
		}

		/**
		 * 打包二次结构化模态框数据
		 * @return {[type]} [description]
		 */
		function formatReStructDataModalData() {
			var data = {};
			var keys=['taskDesc','taskCond','startTime','endTime', 'dataSize'];
			var structSelected = [];
			var trs = $("#logSourceTable tbody>tr.selected", $el);
			if(trs && trs.length > 0){
				for (var i = trs.length - 1; i >= 0; i--) {
					var tmpData = $logSourceTable.row($(trs[i])).data();
					tmpData.dataSize = tmpData.collectionCumulant;
					structSelected.push(tmpData);
				}
			}
			if($('[name="taskDesc"]', $('#reStructDataModal', $el)).val() == ''){
				app.alert('请填写数据描述');
				return false;
			}
			if(structSelected.length <= 0){
				app.alert('请选择数据源');
				return false;
			}
			for (var i = keys.length - 1; i >= 0; i--) {
				var tmp = $('[name="'+keys[i]+'"]', $('#reStructDataModal', $el)).val();
				data[keys[i]] = tmp;
			}
			data.dataSize = $('[name="dataSize"]', $('#reStructDataModal', $el)).attr('size');
			data.sources = JSON.stringify(structSelected);
			data.category = urlData.cate;
			return data;
		}

		/**
		 * 初始化二次结构化模态框
		 * @return {[type]} [description]
		 */
		function initReStructDataModal() {
			var $reStructDataModal = $('#reStructDataModal', $el);
			$reStructDataModal.find('form')[0].reset();
			$('#selectAll', $reStructDataModal).removeClass('fa-check-square selected fa-minus-square').addClass('fa-square-o');
			$logSourceTable.clear().draw();

			for (var item in urlData) {
				$('#reStruct-'+item, $reStructDataModal).val(urlData[item]);
			}

			$reStructDataModal.modal('show');
			if(sourceIds && sourceIds.length > 0){
				getSourcesBySourceIds(sourceIds).then(function (data) {
					$logSourceTable.clear();
					if(data.result && data.result.length > 0){
						$logSourceTable.rows.add(data.result).draw();
					}	
				});
			}

			getLogTypes().then(function (data) {
				var result = data.result;
				for (var i = 0; i < result.logTypes.length; i++) {
					var typeId = result.logTypes[i].typeId;
					getLogByType(typeId);
				}
			});

			getTaskSeq().then(function (data) {
				if(data && data.result){
					$('#taskNo', $reStructDataModal).val(data.result);
				}
			})
		}

		/**
		 * 获取二次结构化任务排队序号
		 * @return {[type]} [description]
		 */
		function getTaskSeq() {
			return app.common.ajaxWithAfa({
				url:'LogCfgTaskAction_getTaskSeq.do',
				data:{
					sourceids:JSON.stringify(sourceIds)
				}
			}).done(function (data) {
				return $.Deferred().resolve(data);
			})
		}

		/**
		 * 根据日志源IDs获取日志源信息
		 * @param  {[type]} sourceIds [description]
		 * @return {[type]}           [description]
		 */
		function getSourcesBySourceIds(sourceIds) {
			return app.common.ajaxWithAfa({
				url:'LogCfgSourceAction_getSourcesBySourceIds.do',
				data:{
					sourceids:JSON.stringify(sourceIds)
				}
			}).done(function (data) {
				return $.Deferred().resolve(data);
			})
		}

		/**
		 * 使用统计接口获取日志源IDs
		 * @return {[type]} [description]
		 */
		function getSourceIds() {
		 	return app.common.ajaxWithAfa({
		 		url:'ESSearchAction_sqlStatistics.do',
		 		data:$.extend(true, {},urlData,{
		 			sql:'select _head_.sourceid as _head_.sourceid from applog-* where 1=1 group by _head_.sourceid'
		 		})
		 		
		 	}).done(function (data) {
		 		return $.Deferred().resolve(data);
		 	});
		}

		/**
		 * 获取解析规则类型
		 * @return {[type]} [description]
		 */
		function getLogTypes() {
			return app.common.ajaxWithAfa({
				url: 'LogCfgAction_getCfgLogStatistics.do'
			}).done(function (data) {
				var result = data.result;
				if(result && !$.isEmptyObject(result)){
					var ulString = '<span class="roleSelectContent-close">x</span>';
					for (var i = 0; i < result.logTypes.length; i++) {
						ulString+='<li typeId="'+result.logTypes[i].typeId+'"><p>'+result.logTypes[i].typeName+'</p><div class="roleSelectItems"></div></li>';
					}
					$('#roleSelectContent', $el).html(ulString);
					$.Deferred().resolve(data);
				}
			})
		}

		/**
		 * 根据解析规则类型获取解析规则
		 * @param  {[type]} logType [description]
		 * @return {[type]}         [description]
		 */
		function getLogByType(logType) {
			return app.common.ajaxWithAfa({
				url:"LogCfgAction_getCfgLogInfoByTypeId.do",
				data:{
					'typeId':logType
				}
			}).done(function (data) {
				var result = data.result;
				var html = '';
				if(result && result.length>0){
					for (var i = 0; i < result.length; i++) {
						html += '<span class="role" logId="'+result[i].logId+'">'+result[i].logName+'</span>';
					}
					$('[typeId="'+logType+'"]>.roleSelectItems', $('#roleSelectContent', $el)).html(html);
				}
			})
		}
/*二次结构化end*/
/*数据服务start*/
		var $DS_logSourceTable = $("#dataService_logSourceTable", $el).DataTable({
			'searching': true,
			'bPaginate': false, // 开关，是否显示分页器
			'bSort': false,
			'bAutoWidth': false,
			'columns':[{
				data: '',defaultContent:''
			},{
				data: 'sourceId',defaultContent:''
			},{
				data: 'sourceName',defaultContent:''
			},{
				data: 'appName',defaultContent:''
			},{
				data: '',defaultContent:''
			},{
				data: 'collectionCumulant',defaultContent:''
			}],
			'aoColumnDefs': [{
				'render':function(data,type,row,meta){
					return '<i class="fa fa-square-o"></i>'
				},
				'targets': 0
			},{
				'render':function(data,type,row,meta){
					return ''+row.category1+'>'+row.category2+'>'+row.category3;
				},
				'targets': 4
			},{
				'render':function(data,type,row,meta){
					if(data < 1024){
						return data+'B';
					}else if(data < 1024*1024){
						return (data/1024).toFixed(2)+'KB';
					}else if(data < 1024*1024*1024){
						return (data/1024/1024).toFixed(2)+'MB';
					}else if(data < 1024*1024*1024*1024){
						return (data/1024/1024/1024).toFixed(2)+'GB';
					}else if(data < 1024*1024*1024*1024*1024){
						return (data/1024/1024/1024/1024).toFixed(2)+'TB';
					}
				},
				'targets': 5
			}]
		})

		$('#dataService', $el).on('click', function(event) {
			event.preventDefault();
			if(urlData && !$.isEmptyObject(urlData)){
				initDataServiceModal();
			}else{
				app.alert('请先进行搜索');
			}
		});
		/**
		 * 初始化二次结构化模态框
		 * @return {[type]} [description]
		 */
		function initDataServiceModal() {
			var $dataServiceModal = $('#dataServiceModal', $el);
			$dataServiceModal.find('form')[0].reset();
			$('#selectAll', $dataServiceModal).removeClass('fa-check-square selected fa-minus-square').addClass('fa-square-o');
			$DS_logSourceTable.clear().draw();

			for (var item in urlData) {
				$('[name="'+item+'"]', $dataServiceModal).val(urlData[item]);
			}

			$dataServiceModal.modal('show');
			if(sourceIds && sourceIds.length > 0){
				getSourcesBySourceIds(sourceIds).then(function (data) {
					$DS_logSourceTable.clear();
					if(data.result && data.result.length > 0){
						$DS_logSourceTable.rows.add(data.result).draw();
					}
				});
			}
		}

		$('#dataServiceModal', $el).on('click', '#selectAll', function(event) {
			event.preventDefault();
			var $dataServiceModal = $('#dataServiceModal', $el);
			if($(this).hasClass('fa-check-square')){//取消选择
				$(this).addClass('fa-square-o').removeClass('fa-square-o fa-minus-square selected');
				$dataServiceModal.find('tbody i').removeClass('fa-check-square selected').addClass('fa-square-o').parents('tr').removeClass('selected');
			}else{
				$dataServiceModal.find('tbody i').removeClass('fa-square-o').addClass('fa-check-square selected').parents('tr').addClass('selected');
				$(this).addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
			}
			$("#dataService_logSourceTable .fa", $el).trigger('roleSelected');
			return;
		}).on('click', '.fa-check-square', function(event) {
			event.preventDefault();
			var $dataServiceModal = $('#dataServiceModal', $el);
			$(this).removeClass('fa-check-square selected').addClass('fa-square-o');
			$(this).parents('tr').removeClass('selected');
			var trLen = $dataServiceModal.find('tbody tr').length;
			var selectedTr = $dataServiceModal.find('tbody tr.selected').length;
			var $selectAll = $('#selectAll', $dataServiceModal);
			if(selectedTr == trLen){
				$selectAll.addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
			}else if(selectedTr == 0){
				$selectAll.addClass('fa-square-o').removeClass('fa-check-square selected fa-minus-square');
			}else{
				$selectAll.addClass('fa-minus-square selected').removeClass('fa-check-square fa-square-o');
			}
			$("#dataService_logSourceTable .fa", $el).trigger('roleSelected');
		}).on('click', '.fa-square-o', function(event) {
			event.preventDefault();
			var $dataServiceModal = $('#dataServiceModal', $el);
			$(this).parents('tr').addClass('selected');
			$(this).addClass('fa-check-square selected').removeClass('fa-square-o');
			var trLen = $dataServiceModal.find('tbody tr').length;
			var selectedTr = $dataServiceModal.find('tbody tr.selected').length;
			var $selectAll = $('#selectAll', $dataServiceModal);
			if(selectedTr == trLen){
				$selectAll.addClass('fa-check-square selected').removeClass('fa-square-o fa-minus-square');
			}else if(selectedTr == 0){
				$selectAll.addClass('fa-square-o').removeClass('fa-check-square selected fa-minus-square');
			}else{
				$selectAll.addClass('fa-minus-square selected').removeClass('fa-check-square fa-square-o');
			}
			$("#dataService_logSourceTable .fa", $el).trigger('roleSelected');
		}).on('roleSelected', '.fa', function(event) {
			event.preventDefault();
			var size = 0;
			var trs = $("#dataService_logSourceTable tbody>tr.selected", $el);
			if(trs && trs.length > 0){
				for (var i = trs.length - 1; i >= 0; i--) {
					var tmp = $DS_logSourceTable.row($(trs[i])).data().collectionCumulant;
					if(tmp){
						size += parseInt(tmp);
					}
				}
			}
			var resultStr;
			if(size < 1024){
				resultStr = size+'B';
			}else if(size < 1024*1024){
				resultStr = (size/1024).toFixed(2)+'KB';
			}else if(size < 1024*1024*1024){
				resultStr = (size/1024/1024).toFixed(2)+'MB';
			}else if(size < 1024*1024*1024*1024){
				resultStr = (size/1024/1024/1024).toFixed(2)+'GB';
			}else if(size < 1024*1024*1024*1024*1024){
				resultStr = (size/1024/1024/1024/1024).toFixed(2)+'TB';
			}
			$('[name="forwardSize"]', $('#dataServiceModal', $el)).val(resultStr).attr('size', size);
		})
		// 任务提交
		.on('click', '.confirmBtn', function(event) {
			var data = formatDataServiceModalData();
			if(data){
				submitDataServiceModalData(data).then(function (data) {
					if(data.result){
						app.alert('操作成功');
					}else{
						app.alert('title', '操作失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
					}
					$('#dataServiceModal', $el).modal('hide');
				})
			}
		})
		// 任务管理
		.on('click', '.taskBtn', function(event) {
			event.preventDefault();
			$('#dataServiceModal', $el).modal('hide');
			app.dispatcher.load({
				"title": "数据任务管理",
				"moduleId": 'logForwardTaskManager',
				"section": '',
				"id": '',
				"params": {
				}
			})
		});

		function submitDataServiceModalData(paramData) {
			return app.common.ajaxWithAfa({
				url:'DataForwardAction_addDateForward.do',
				data:paramData
			}).done(function (data) {
				return $.Deferred().resolve(data);
			})
		}

		function formatDataServiceModalData() {
			var data = {},
				$dataServiceModal = $('#dataServiceModal', $el);
			var dataForwardStrKey = ['dataDesc','search','timeType','forwardSize','includeStruct','forwardType'],
				forwardToKey = ['topicName','retentionDays','address','port'],
				structSelected = [],
				dataForwardStr = {},
				forwardTo = {},
				formData = app.common.serializeObject($dataServiceModal.find('form')),
				includeStruct;
			var trs = $("#dataService_logSourceTable tbody>tr.selected", $el);
			if(trs && trs.length > 0){
				for (var i = trs.length - 1; i >= 0; i--) {
					var tmpData = $DS_logSourceTable.row($(trs[i])).data();
					structSelected.push(tmpData.sourceId);
				}
			}
			if(!validateDSData()){
				app.alert('请填写必须项');
				return false;
			}
			if(structSelected.length <= 0){
				app.alert('请选择数据源');
				return false;
			}
			var checkboxObj = $('[data-name="includeStruct"][checked]', $dataServiceModal);
			if(checkboxObj && checkboxObj.length < 0){
				app.alert('请选择转发数据');
			}else if(checkboxObj && checkboxObj.length == 1){
				includeStruct = $(checkboxObj[0]).attr('value');
			}else if(checkboxObj && checkboxObj.length == 2){
				includeStruct = 3;
			}
			for (var i = dataForwardStrKey.length - 1; i >= 0; i--) {
				dataForwardStr[dataForwardStrKey[i]] = formData[dataForwardStrKey[i]];
			}
			for (var i = dataForwardStrKey.length - 1; i >= 0; i--) {
				forwardTo[forwardToKey[i]] = formData[forwardToKey[i]];
			}
			dataForwardStr.forwardSize = $('[name="forwardSize"]', $dataServiceModal).attr('size');
			dataForwardStr.sources = structSelected.join(',');
			dataForwardStr.startTime = urlData.startTime;
			dataForwardStr.endTime = urlData.endTime;
			dataForwardStr.cate = urlData.cate;
			dataForwardStr.includeStruct = includeStruct;

			data.dataForwardStr = JSON.stringify(dataForwardStr);
			data.forwardTo = JSON.stringify(forwardTo);
			return data;
		}

		function validateDSData() {
			var validateResult = app.validate.validate({
				$context: $('#dataServiceModal', $el),
				data: [{
					"id": "ds_dataDesc",
					"filter": {
						"require": true
					},
				}, {
					"id": "ds_topicName",
					"filter": {
						"require": true
					},
				}, {
					"id": "ds_retentionDays",
					"filter": {
						"require": true,
					},
				}, {
					"id": "ds_address",
					"filter": {
						"require": true
					},
				}, {
					"id": "ds_port",
					"filter": {
						"require": true,
					},
				}]
			});
			return validateResult.bResult;
		}

/*数据服务end*/
/*SQL执行start*/
	function getSelectText() {
		var text;
		if(document.selection) {
		        text = document.selection.createRange();
		    } else {
		        text = document.getSelection();
		}
		return text.toString();
	}
	$('#runSql', $el).on('click', function(event) {
		event.preventDefault();
		var text = getSelectText();
		openSQLExecute(text);
	});
	
	$('#copySelect', $el).on('click', function(event) {
		event.preventDefault();
		var text = getSelectText();
		console.log(text);
		const input = document.createElement('input');
		input.setAttribute('readonly', 'readonly');
	    document.body.appendChild(input);
	    input.setAttribute('value', text);
	    input.select();
	    if (document.execCommand('copy')) {
	        document.execCommand('copy');
	        console.log(text, 'copy')
	    }
	    document.body.removeChild(input);
	});

	function openSQLExecute(text) {
		app.dispatcher.load({
			"title": "SQL执行",
			"moduleId": 'SQLexecute',
			"section": '',
			"id": 'SQLexecute'+app.global.getUniqueId(),
			"params": {
				'text':text
			}
		});
	}
/*SQL执行end*/
/*邮件发送start*/
	function initEmailModal(tr) {
		var $obj = $('#sendEmailModal', $el);
		$obj.data({tr:tr});
		$obj.modal('show');
		$obj.find('form')[0].reset();
		var theme = '[日志分析平台]  '+(tr['_head_.appname']||'')+'@'+(tr['_head_.hostip']||'')+'  日志';
		$('[name="subject"]', $obj).val(theme);
		var start = '';
		var timeStr = tr['start'];
		if(timeStr != ''){
			start = new Date(timeStr).Format('yyyy-MM-dd hh:mm:ss');
		}
		var text = '您好!\n'+
					'\t日志信息如下：'+
					'\n\t\t系统：'+(tr['_head_.appname']||'')+
					'\n\t\t主机：'+(tr['_head_.hostip']||'')+
					'\n\t\t一级分类：'+(tr['_head_.category1']||'')+
					'\n\t\t二级分类：'+(tr['_head_.category2']||'')+
					'\n\t\t三级分类：'+(tr['_head_.category3']||'')+
					'\n\t\t日志源名称：'+(tr['_head_.sourcename']||'')+
					'\n\t\t时间：'+(start)+
					'\n\t\t日志目录：'+(tr['_head_.file']||'');
		$('[name="content"]', $obj).val(text);
		getUser();
	}

	$('#sendEmailModal', $el).on('click', function(event) {
		if($(event.target).closest($('.userList', $el)).length == 0){
			$('.userList', $(this)).removeClass('active');
		}
	}).on('input', '[name="receive"]', function(event) {
		var text = $(this).val().trim();
		var strArr = [];
		text = text.split(';');
		if(text && text.length >0){
			for (var i = 0; i < text.length; i++) {
				if(/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(text[i])){
					var tmpArr = text[i].split('@');
					strArr.push(tmpArr[0]);
				}
			}
		}

		var $obj = $('[name="content"]', $('#sendEmailModal', $el));
		var rescive = $obj.attr('data-rescive');
		var textarea = $obj.val();
		if(strArr && strArr.length > 0){
			if(rescive && rescive != ''){
				textarea = textarea.replace(rescive+':\n','');
			}
			$obj.val(strArr.join(',')+':\n'+textarea);
			$obj.attr('data-rescive', strArr.join(','));
		}else{
			if(rescive && rescive != ''){
				textarea = textarea.replace(rescive+':\n','');
			}
			$obj.val(textarea);
			$obj.removeAttr('data-rescive');
		}
		
	}).on('click', '.showList', function(event) {
		event.preventDefault();
		$(this).siblings('.userList').toggleClass('active');
		event.stopPropagation();
	}).on('click', '.userList li', function(event) {
		event.preventDefault();
		var $obj = $(this).parent().siblings('input');
		var value = $obj.val();
		var email = $(this).find('span:eq(1)').text();
		if($(this).hasClass('selected')){
			$(this).removeClass('selected');
			var regEx = new RegExp(email+';', 'g');
			value = value.replace(regEx,'');
			$obj.val(value);
		}else{
			$(this).addClass('selected');
			$obj.val(value + email+';');
		}
		$obj.trigger('input');
	}).on('click', '.confirmBtn', function(event) {
		event.preventDefault();
		var $self = $(this);
		if($self.find('.fa').length > 0){
			return;
		}
		$self.append('<i class="fa fa-spinner fa-spin" style="margin-left: 5px;"></i>');
		var $obj = $('#sendEmailModal', $el);
		var data = $obj.data();
		var param = app.common.serializeObject($obj.find('form'));
		var mail = {};
		if(param.receive == ''){
			app.alert('请填写收件人');
			$self.find('.fa').remove();
			return;
		}
		for (var item in param) {
			if(item == 'receive'|| item == 'cc'){
				var result = [];
				var tmp = param[item].split(';');
				for (var i = 0; i < tmp.length; i++) {
					if(tmp[i] != ''){
						result.push(tmp[i]);
					}
				}
				mail[item] = result;
			}else if(item == 'attach'){
				mail[item] = param[item]||false;
			}else{
				mail[item] = param[item];
			}
		}
		sendMail(data.tr,mail).then(function (data) {
			$self.find('.fa').remove();
			if(data.result){
				app.alert('邮件发送成功');
			}else{
				app.alert('邮件发送失败');
			}
			$obj.modal('hide');
		},function () {
			$self.find('.fa').remove();
		})
	});

	function getUser() {
		app.common.ajaxWithAfa({
			url:'UserAction_getAllUsers.do'
		}).done(function (data) {
			if(data.users && data.users.length > 0){
				drawUserList(data.users);
			}
		})
	}
	function drawUserList(list) {
		var  $sendEmailModal = $('#sendEmailModal', $el)
		var html='';
		for (var i = 0; i < list.length; i++) {
			if(list[i].mail && list[i].mail != ""){
				html += '<li><span>'+list[i].username+'</span><span>'+list[i].mail+'</span></li>';
			}
		}
		$('.userList', $sendEmailModal).html(html);
	}
	function sendMail(tr,mail) {
		return app.common.ajaxWithAfa({
			url:'ESSearchAction_sendMail.do',
			data:{
				parent:tr['_head_.pid'],
				routing:tr['_routing'],
				index:tr['_index'],
				serialNo:tr['_head_.logsn'],
				mail:JSON.stringify(mail),
				host: tr['_head_.hostip'],
				fileName: tr['_head_.file']
			}
		}).done(function (data) {
			return $.Deferred().resolve(data);
		})
	}
/*邮件发送end*/
	
		//创建sql工具
		$('#createSQL',$el).on('click',function(){
			let sql = $('#searchInput',$el).text();
			let sqlContext;
			if((sql.includes('* |') || sql.includes('*|')) && sql.includes('select') && sql.includes('from')){
				sqlContext = sql;
			}
			app.dispatcher.load({
				"title": "创建SQL",
				"moduleId": 'SQLTool',
				"section": 'SQLDetail',
				"id": 'SQLDetail' + new Date().getTime(),
				"params": {
					mode: 'create',
					sqlContext: sqlContext,
				}
			});
		});

		//选中行 划窗
		$('#logTable', $el).on('click', 'tr', function(){
			var rowData = $logTable.row(this).data();
			app.domain.exports('queryTrade', {});
			console.log(rowData);
			if(rowData){
				$(this).addClass('selected').siblings().removeClass('selected');
				$('.queryTrade-view', $el).removeClass('hide');
				rowData['_source'] = {
					start: rowData['start'],
					duration: null
				};
				rowData['id'] = rowData['_head_.pid'];
				rowData['_id'] = rowData['_head_.pid'];
				rowData['serialno'] = rowData['_head_.pid'];
				var appid = rowData['_head_.appid'];
				var logsn = rowData['_head_.pid'].replace(new RegExp(appid, 'g'), '');
				rowData['_head_.logsn'] = logsn;
				rowData['_routing'] = rowData['id'];
				for(let i in rowData){
					if(i.includes('_head_')){
						rowData['_source'][i] = rowData[i];
					}
				}
				app.domain.exports('queryTrade', {rowData});
				// 打开第一个页签
				// app.tab.closeNewWindow(lastID);
				openTabs($('[data-path].active', $el).data('path') || 'fields');
			}
		});

		$('[data-path]', $el).on('click', function(){
			if(!$(this).hasClass('active')){
				$(this).addClass('active').siblings().removeClass('active');
				// app.tab.closeNewWindow(lastID);
				openTabs($(this).data('path'));
			}
		})

		$('.queryTrade-view-close,.queryTrade-mask', $el).on('click', function(){
			$('.queryTrade-view', $el).addClass('hide');
		})
		function openTabs(tabName){
			$('[data-name="'+ tabName +'"]', $el).addClass('active').siblings().removeClass('active');
			app.tab.openNewWindow({
				title: tabName,
				moduleId: 'queryTrade',
				section: [tabName],
				id: app.global.getUniqueId(),
				frameRenderTo: $('#rightDetailsView', $el)
			});
		}
	
    },

    unload: function(handler) {
    	echarts_bar && echarts_bar.dispose();
    	logStatisticsViewObj && app.dispatcher2.unload('logStatisticsView');
    	sqlSearchStatisticsViewObj && app.dispatcher2.unload('sqlSearchStatisticsView');
    	OPERABLE = null;
    	app.screen.removeResizeHandler(resizeId, true);
    	resizeId = null;
    },

    pause: function($el, scope, handler) {
      
    },

    resume: function($el, scope, handler) {
      
    }
  };
});
