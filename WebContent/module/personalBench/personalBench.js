define(["jquery", "underscore",
	"../DashBorad/DashBoradService","handlebars",'echarts4',"module/logResultCheck/logSearchDetail/logStatisticsView/statisticsEchartsTool",'loadChartsIndex'],function($, _, api,Handlebars,echarts,StatisticsEchartsTool,loadChartsIndex){
	var echartsDom_obj = {};
	var user = JSON.parse(sessionStorage.getItem('user'));
	var username = user.nickname + " - "+ user.username;
	return {
		load : function($el, scope, handler) {
			var EventArr;
			var colDataGloabel = [];
			var colDataGloabelData = [];
			$el.css({
				"height": "100%",
				"overflow": "auto",
				"background-color": "#ebf0f5"
			});

			var $searchTable = $('#searchTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'groupName', defaultContent : ''//名称
				},{
					data : 'remark', defaultContent : ''//说明
				},{
					data : 'count', defaultContent : ''//组建个数
				},{
					data : 'isIndex', defaultContent : ''//是否是首页
				},{
					data : '', defaultContent : ''//操作
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						if(data == '0'){
							return '否';
						}else if( data == '1'){
							return '是';
						}
                    },
                    "targets" : 4
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-search fa fa-share" title="查看详情"></span>';
                    },
                    "targets" : 5
				}]
			});

			baseData();
			function baseData(){
				app.common.ajaxWithAfa({
					url  : 'LogStaticsAction_logCollectionStatics.do',
				}).done(function(data){
					var data = data.result;
					$('#ipNum', $el).text(data.ipNum);
					if(data.currentLogDataIps){
						data.currentLogDataIps = new Number(data.currentLogDataIps).toFixed(2);
					}
					var logDataToTalSize = data.logDataToTalSize && ((data.logDataToTalSize/1024/1024).toFixed(2));
					$('#currentLogDataIps', $el).empty().append(data.currentLogDataIps+'<span style="font-size: 12px;">kb/s</span>');
					$('#logDataToTalSize', $el).empty().append(logDataToTalSize + '<span style="font-size: 12px;">GB</span>');
					$('#runSource', $el).empty().append(data.runSource+'<span style="font-size: 12px;color: initial;">/'+(data.stopSource+data.runSource)+'</span>');
				});
			}

			getPreLoginTime();
			function getPreLoginTime() {
				$('#name',$el).text(username||'-');
				app.common.ajaxWithAfa({
					url:'LoginAction_loadNowUser.do'
				}).done(function (data) {
					if(data.userVO && !$.isEmptyObject(data.userVO)){
						$('#lastLoginTime', $el).text(data.userVO.loginTime||'-');
					}
				})
			}
			QuickSearch();
			function QuickSearch(){
				app.common.ajaxWithAfa({
					url  : 'ESSearchAction_getQuickSearchs.do',
					data:{
						top: 10,
						pageNum: 1
					}
				}).done(function(data){
					var data = data.result,
						html="";
					if(data.length>0){
						html = data.map(function(item,index){
							return '<div class="checkSearch-item" data-id="'+item.id+'">\
										<span class="item-name">'+item.searchName+'</span>\
										<a href="javascript:void(0);" class="search-link">搜索</a>\
									</div>'
						}).join('');
					}
					$('#checkSearchList', $el).empty().append(html);
				});
			}

			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			loadSearchTableData();
			function loadSearchTableData() {
				app.common.ajaxWithAfa({
					url:'DashBoardAction_getDashBoard.do'
				}).done(function (data) {
					$searchTable.clear().draw();

					var result = data.result;
					if(result && result.length > 0){
						result.forEach(function (item, index) {
							item.index = index+1;
						})
					}
					$searchTable.rows.add(result).draw();
				})
			}

			$('#checkSearchList', $el).on('click', '.search-link', function(event) {
				var id = $(this).parents('.checkSearch-item').attr('data-id');
				if(id){
					loadSearchPage(id)
				}
			});
			function loadSearchPage(id) {
				app.dispatcher.load({
					title: "日志搜索",
					moduleId:"logResultCheck",
					section:'logSearchDetail',
					id: 'logSearchDetail'+id,
					params:{
						param:{
							quickSearchId:id
						}
					},
					context: $el
				});
			}
			// 详情
			$('#searchTable',$el).on('click', 'tbody span.link-search', function(event) {
				var tr = $searchTable.row($(this).parents('tr')).data();
				loadDashBorad(tr);
			});

			$('[data-href]', $el).on('click', function(event) {
				var index = $(this).index(),
					title = $(this).attr('data-title').trim(),
					href = $(this).attr('data-href').trim(),
					section = href.split('#'),
					moduleId = section.pop();
				let menu = $("#tabs>li");
				Array.prototype.forEach.call(menu, function (item) {
					if ($(item).attr("data-href").indexOf(href) !== -1) {
						$($(item).find('button')).trigger('click');
					}
				})
				app.dispatcher.load({
					title: title,
					moduleId:moduleId,
					section:section,
					id: moduleId+index+index,
					context: $el
				});
			});

			function loadDashBorad(tr) {
				app.domain.exports("groupId",{
					'groupId': tr.groupId
				})
				app.dispatcher.load({
					title: "仪表盘",
					moduleId:"DashBorad",
					section:'',
					id: tr.id,
					context: $el
				});
			}

			var CacheStatic = {};
			//获取echarts基础数据
			getEcharts();
			function getEcharts(){
				app.common.ajaxWithAfa({
					url:"DashBoardAction_getIndexDashBoard.do",
				}).done(function(data){
					var result = data.result,
						boradIdArr = [];
	                var finalData = EtlData(result),
	                	items = finalData[0],
	                	boradIdArr = finalData[1];
	                generatorDashBoard(finalData[0]);
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
						logIndexConfig.init($('[boardid = '+boradId+']', $el).find(".index-charts-item")[0],colDataGloabelData);
						(colDataGloabelData.length > 0) && reStoreConfig(fieldName, echartsType1, logIndexConfig);
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
            *  生成echarts图表
            */
            var generatorCharts = function (boradIdArr) {
                if (!boradIdArr || !boradIdArr.length) return;
                if (Object.prototype.toString.call(boradIdArr) != "[object Array]"){
                    boradIdArr = [boradIdArr];
                }

                api.getDashBoardData(boradIdArr).then(function(data){
                   	var keys = Object.keys(data);
                   	var aggs = null, paramData = null, options = null, borderEle = null;
                    for (var i = 0; i< keys.length; i++){
                        aggs = data[keys[i]];
                        paramData = JSON.parse(CacheStatic[keys[i]]).paramData;
                        options = api.getEchartsOptionByParams(aggs, paramData);
                        options.legend.show = false;
                        borderEle = $('[boardid = '+keys[i]+']', $el).find(".index-charts-item");
                        if(options){
                           app.echarts.init(borderEle[0]).setOption(options); 
                        }else{
                            borderEle.html('<span style="color:#999;font-size:12px;font-weight:normal;">暂无数据～</span>');
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
             * 生成 仪表盘对应的图表容器
             */
            var generatorDashBoard = function(data){
                var temp = $("#dashBoradItem", $el).html();
                var template = Handlebars.compile(temp);
                var html = template(data);
                $(".index-content-main", $el).html(html);
                var height = $('.index-content-main',$el).outerHeight();
                $('#eventContent',$el).css('max-height',(height-340)+'px');
            }

            //点击按钮跳转日志搜索
            $(".index-content-main",$el).on("click","i.fa-reply", function(e){
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var ele = $(this).closest(".index-instance-item");
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


			var availWidth = window.screen.availWidth;
			var pageSize;//保存轮播图每页个数

			if(availWidth > 1680){
				pageSize = 8;
			}else{
				pageSize = 6;
			}

			var $carousel = $('.carousel').carousel({
				'interval': false	// 轮播自动切换周期: 1000 毫秒，false 不切换
			});

			$('#more',$el).click(function(){
				app.dispatcher.load({
					title: "采集流量监控",
					moduleId:"logCollectTrafficMonitor",
					section:'',
					context: $el
				});
			});
			var queryObj = {
				"statisticstype": 1,
				"pageNum": 1,
				"orderField": "datasize",
			}
			$('[name="type"]',$el).change(function(){
				queryObj.statisticstype = parseInt($('[name="type"]:checked').val());
				statisMonInput(queryObj);
				baseData();
			});

			$('[name="orderField"]',$el).change(function(){
				queryObj.orderField = $('[name="orderField"]:checked',$el).val();
				statisMonInput(queryObj);
				baseData();
			});
			
			// 初始调用
			statisMonInput(queryObj);

			function statisMonInput(queryObj){
				$("#carouselCtn",$el).parent().loading("show");
				app.common.ajaxWithAfa({
					url:"LogStaticsAction_statisMonInput.do",
					data:{
						'statisticstype': queryObj.statisticstype,
						'pageSize':pageSize,
						'pageNum': queryObj.pageNum,
						'orderField': queryObj.orderField
					}
				}).done(function(data){
					$("#carouselCtn",$el).parent().loading("hide");
					try {
						var result = data.result;
						var html = '';
						for(var j = 0;j<result.total;j++){
							html += `<div class="echarts-block">
										<div class="sys-name">二代超级网银系统</div>
										<div>
											<div style="float: left;width: 100px;">
												<div class="big-number">3091</div>
												<div style="font-size: 12px;margin-bottom: 4px;">当前速率</div>
												<div style="font-size: 14px;color: #55a8fd;"><span>217</span>kb/s</div>
											</div>
											<div class="echarts-dom"></div>
										</div>
									</div>`
						}
						$("#carouselCtn",$el).html(html);
						$("#carouselSize",$el).text('总数：'+result.total);
					} catch (e) {
						$("#carouselCtn",$el).empty();
					}

	                initCarouselEcharts(result.array);
				});
			}

			function dealSize(data){
				var dealData,unit;
				if (parseInt(data) === 0) {
					return {
						dealData:"0",
						unit:"GB"
					}
				}
				if(data < 1024){
					dealData = data;
					unit = 'KB';
				}else if(data < 1024*1024){
					dealData = (data/1024).toFixed(2);
					unit = 'MB';
				}else if(data < 1024*1024*1024){
					dealData = (data/1024/1024).toFixed(2);
					unit = 'GB';
				}else if(data < 1024*1024*1024*1024){
					dealData = (data/1024/1024/1024).toFixed(2);
					unit = 'TB';
				}
				return {
					dealData:dealData,
					unit:unit
				}
			}

			function initCarouselEcharts(result){
				var $item = $("#carouselCtn",$el);
				$('.echarts-block', $item).each(function(index, ele){
					var blockData = result[index];

					$('.sys-name', $(ele)).text(blockData.name);
					$('.big-number', $(ele)).empty().append(dealSize(blockData.dataSize).dealData+'<small style="font-size: 12px;">'+dealSize(blockData.dataSize).unit+'</small>');
					$('span', $(ele)).text(blockData.dataIps);

					echartsDom_obj[index] = echarts.init($('.echarts-dom',$(ele))[0]);
					var xAxis_date = [];
					var series_data = [];
					blockData.ips.forEach(function(eitem,eindex){
						xAxis_date.push(eitem.time);
						series_data.push(eitem.ips);
					});
					var option = {
						tooltip: {
							show:false,
					        trigger: 'axis',
					        position: function (pt) {
					            return [pt[0], '10%'];
					        }
					    },
						grid: {
							containLabel: false,
							left: 0,
							right: 0,
							top: 0,
							bottom: 0
						},
						xAxis: {
					        type: 'category',
					        boundaryGap: false,
					        axisLine: {
					        	show: false
					        },
					        axisTick: {
					        	show: false
					        },
					        axisLabel: {
					        	show: false
					        },
					        splitLine: {
					        	show: true,
					        	lineStyle: {
					        		color: '#b8bbcc',
					        		type: 'dashed'
					        	}
					        },
					        data: xAxis_date
					    },
					    yAxis: {
					        type: 'value',
					        axisLine: {
					        	show: false
					        },
					        axisTick: {
					        	show: false
					        },
					        axisLabel: {
					        	show: false
					        },
					        splitLine: {
					        	show: true,
					        	lineStyle: {
					        		color: '#b8bbcc',
					        		type: 'dashed'
					        	}
					        },
					        boundaryGap: [0, '100%']
					    },
						series: [
					        {
					            name:'速率',
					            type:'line',
					            // smooth:true,
					            symbol: 'none',
					            sampling: 'average',
					            itemStyle: {
					                normal: {
					                    color: '#55a8fd'
					                }
					            },
					            areaStyle: {
					                normal: {
					                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                        offset: 0,
					                        color: '#cce5fe'
					                    }, {
					                        offset: 1,
					                        color: '#cce5fe'
					                    }])
					                }
					            },
					            data: series_data
					        }
					    ]
					};
					echartsDom_obj[index].setOption(option);
				});
			}

            $('#eventCtn',$el).on('click', '.events-item', function(event) {
            	event.preventDefault();
            	var index = $(this).index();
            	var eventSource = $(this).attr('data-eventSource').trim();
            	if(!eventSource){
            		return;
            	}

            	var tr = getEventInfo(index);
            	if(!tr || $.isEmptyObject(tr)){
            		return;
            	}

				if(eventSource == '07'){
					app.dispatcher.load({
						title: "事件详情 - "+tr.eventId,
						moduleId:"eventMonitor",
						section:["eventMonitorDetails"],
						id:tr.eventId,
						params:{
							data:tr
						}
					});
				}else{
					app.dispatcher.load({ //跳转到事件详情页
						title: '事件详情 - ' + tr.eventId,
						moduleId: 'eventList',
						section: 'eventInfo',
						params: {
							eventId: tr.eventId,
							objId: tr.objId,
							appIds: tr.appIds,
							serverId: tr.serverId,
							appName: tr.appName,
							eventType: changeEventType(tr.eventType),
							objName: tr.objName
						}
					});
				}
            });

            function getEventInfo(index) {
            	var tr = EventArr[index];
            	result = {}
            	if(tr){
            		result.eventId = tr.id;
					result.objId = tr.mobjId;
					result.appIds = tr.appId;
					result.serverId = tr.deviceId;
	                result.appName = tr.appName;
	                result.eventType = tr.otype;
	                result.objName = tr.agent;
	                result.eventStatus = tr.inSysNo;
	                result.itilStatus = tr.itilStatus;
	                result.dealMsg = tr.dealMsg;
	                result.eventDuration = tr.eventDuration;
	                result.eventStart = tr.firstTime;
	                result.eventEnd = tr.lastTime;
	                result.eventDesc = tr.description;
	                result.eventLevel = tr.level;
	                result.tally = tr.tally;
            	}
                return result;
            }

            function changeEventType(data) {
				if(data == 0) {
					return '告警'; //故障
				} else if(data == 1) {
					return '预警'; //预警
				} else if(data == 2) {
					return '通知'; //通知
				}
			}
            //获得事件列表
            getEventList();
            function getEventList(){
            	app.common.ajaxWithAfa({
					url:"ShowUserPrivilegeAction_latestEvent.do",
				}).done(function(data){
					var result = data.result;
					var unDealHtml = '';
					unDealHtml = result.unHand.reduce(function(sum, item, index){
						var type = "";
						switch(item.level){
							case "1":
								type = "普通";
								break;
							case "2":
							case "3":
								type = "紧急";
								break;
							case "4":
							case "5":
								type = "严重";
								break;
						}
						return sum += 	`<div class="events-item" data-eventSource="${item.inSysNo}">
											<div>
												<span data-status="${type}" class="events-item-title">${item.id}</span>
												<span class="pull-right" title="${item.recordTime}">${item.recordTime}</span>
											</div>
											<div class="events-item-body" title="${item.summary}">${item.summary}</div>
										</div>`
					},'');
					$('#eventCtn',$el).empty().append(unDealHtml);

					$('#dayWaringUnclosed',$el).text(result.normal);//普通
					$('#dayAlarmUnclosed',$el).text(result.serious);//严重
					$('#urgencyHand',$el).text(result.emergency);//紧急
				});
            	
            	
            	
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

			handler.setInterval(function(){
				baseData();
				getEcharts();
				getEventList();
				statisMonInput(queryObj);
			},60000);
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});
