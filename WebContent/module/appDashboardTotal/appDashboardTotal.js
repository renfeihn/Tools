define([],function(){
	var echartsObjects = {};
	return {
		load:function($el,scope,handler){
			
			bindEvents();

			var time = 60;
			function init(){
				$.when(getObjectCategory(),getFlows(),getKpi()).done((data1,data2,data3) => {
					displayApp2(data1,data3);
					initEcharts(data2);
				});
			}
			init();

			function getKpi(){
				var sql = `*|select avg(duration) as avgDuration, count(*) as count from applog-* group by _head_.appid order by avgDuration desc`;
				return app.common.ajaxWithAfa({
					url: 'ESSearchAction_sqlSearchWithAggregationsParse.do',
					data: {
						'search': sql,
						'startTime': new Date(new Date().getTime()-time*1000).Format('yyyy-MM-dd hh:mm:ss'),
						'endTime': new Date().Format('yyyy-MM-dd hh:mm:ss'),
					}
				})
			}
			
			function bindEvents() {
				$('.jihe-danxuan', $el).on('click', 'span', function(){
					if(!$(this).hasClass('selected')){
						$(this).addClass('selected').siblings().removeClass('selected');
						time = this.dataset.value;
						init();
					}
				});
				$('.objects-content',$el).on('click','.cate3-item',function(){
					let $this = $(this);
					let name = $this.find('.app-name').text();
					let id = $this.attr('data-id');
					let type = $this.parents('.ul-wrap').hasClass('apps-wrap') ? 'app' : 'sys';
					app.dispatcher.load({
						"title": "应用性能-" + name,
						"moduleId" : "appDashboardTotal",
						"section" : "dashboardDetails",
						"id" : id,
						 "params" : { // 给标签传递参数
						 	id: id,
						 	name: name,
						 	type: 'app',
						 	cate1: $this.attr('data-cate1'),
						 	cate2: $this.attr('data-cate2')
						 },
						 "context" : $el
						});
				});
				
				$('#search_text',$el).on('keyup',function(){
					let val = $(this).val().toLowerCase();
					$('#app_list',$el).find('.cate3-item').each((index,item) => {
						let name = $(item).find('.cate3-text').text().toLowerCase();
						if(name.includes(val)){
							$(item).removeClass('hide');
						}else{
							$(item).addClass('hide');
						}
					});
				});	
			}
			
			
			function getFlows() {
				return app.common.ajaxWithAfa({
					url: "LogStaticsAction_getAppIps.do",
					data: {
						statisticstype: 2,
						intervalMinute: 10,
						intervalSecond: 5
					}
				}).done(function(data) {
					return $.Deferred().resolve();
				});
			}
			
			function initEcharts(echartsData) {
				if($('#app_list>div',$el).length == 0){
					return;
				}
				echartsObjects = {};
				$('#app_list>div',$el).each((index,item) => {
					let appid = $(item).attr('data-id');
					if(!('echarts'+appid in echartsObjects)) {
						let data = echartsData['result'][appid];
						if(!data || data.length == 0){
							data = [{recordtime:'',dataips: 0},{recordtime:'',dataips: 0}]
						}
						let xData = data.map(item => item.recordtime);
						let yData = data.map(item => item.dataips);
						echartsObjects['echarts'+appid] = app.echarts4.init($('.echarts-dom', $el).eq(index)[0]);
						drawEcharts(echartsObjects['echarts'+appid],xData,yData);
					}
				});
				
			}
			
			function drawEcharts($echarts,xData,yData) {
				let option = {
					grid: {
						containLabel: false,
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						show: true,
						borderWidth: 1,
						borderColor: '#ccc'
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
		        data: xData
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
					series: [{
						data: yData,
						type: 'line',
						symbol: 'none',
						sampling: 'average',
						itemStyle: {
							normal: {
								color: '#55a8fd'
							}
						},
						lineStyle: {
							color: '#59aafa'
						},
						areaStyle: {
              normal: {
                color: new app.echarts4.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#cce5fe'
                }, {
                    offset: 1,
                    color: '#cce5fe'
                }])
              }
          	},
					}]
				};
				$echarts.setOption(option);
			}
			
			//应用  资产
			function getObjectCategory(){
				return app.common.ajaxWithAfa({
					url: "ESSearchAction_getObjectCategory.do",
				})
			}

			// 显示APP
			function displayApp(data, sortData){
				let result = data.result;
				if($.isEmptyObject(result)){
					return;
				}
				
				let app = result.app;
				let cates = {};
				app.forEach(item => {
					if(item.childs && item.childs.length > 0){
						let cate2 = item.childs;
						cate2.forEach(item2 => {
							if(item2.childs && item2.childs.length > 0){
								let cate3 = item2.childs;
								cate3.forEach(item3 => {
									cates[item3.cateId] = ({cate1Id: item.cateId,cate2Id: item2.cateId,cate3Id: item3.cateId,cateName: item3.cateName});
								});
							}
							
						});
					}
				});
				let appHtml = '';
				sortData.result.agg.forEach((item) => {
					let thisItem = cates[item['_head_.appid']];
					appHtml += `<div class="cate3-item" data-id="${thisItem.cate3Id}" data-cate2="${thisItem.cate2Id}" data-cate1="${thisItem.cate1Id}" title="${thisItem.cateName}">
						<div class="app-name">${thisItem.cateName}</div>		
						<div class="echarts-dom"></div>
						<div class="app-kpi">
							<span data-title="耗时">${item.avgDuration?parseInt(item.avgDuration):'-'}</span>
							<i></i>
							<span data-title="TPS">${item.count?parseInt(item.count):'-'}</span>
						</div>
					</div>`;
				})
				$('#app_list',$el).html(appHtml);
			}
			function displayApp2(data, sortData){
				let result = data.result;
				if($.isEmptyObject(result)){
					return;
				}
				
				let app = result.app;
				let cates = [];
				app.forEach(item => {
					if(item.childs && item.childs.length > 0){
						let cate2 = item.childs;
						cate2.forEach(item2 => {
							if(item2.childs && item2.childs.length > 0){
								let cate3 = item2.childs;
								cate3.forEach(item3 => {
									cates.push({cate1Id: item.cateId,cate2Id: item2.cateId,cate3Id: item3.cateId,cateName: item3.cateName});
								});
							}
							
						});
					}
				});
				let kpiObject = {};
				sortData.result.agg.forEach((item) => {
					kpiObject[item['_head_.appid']] = item;
				})
				let appHtml = '';
				cates.sortChinese('cateName');
				cates.forEach((item) => {
					appHtml += `<div class="cate3-item" data-id="${item.cate3Id}" data-cate2="${item.cate2Id}" data-cate1="${item.cate1Id}" title="${item.cateName}">
						<div class="app-name">${item.cateName}</div>		
						<div class="echarts-dom"></div>
						<div class="app-kpi">
							<span data-title="耗时">${kpiObject[item.cate3Id]?parseInt(kpiObject[item.cate3Id].avgDuration):'-'}</span>
							<i></i>
							<span data-title="TPS">${kpiObject[item.cate3Id]?parseInt(kpiObject[item.cate3Id].count):'-'}</span>
						</div>
					</div>`;
				})
				$('#app_list',$el).html(appHtml);
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
