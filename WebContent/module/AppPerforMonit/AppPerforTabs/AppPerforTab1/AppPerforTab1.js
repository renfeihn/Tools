define(["jquery",'echarts4'], function($, echarts) {
	return {
		load : function($el, scope, handler) {
			var appName = app.domain.get('AppPerforMonit', 'appName');
			var avg = app.domain.get('AppPerforMonit', 'avg');
			var count = app.domain.get('AppPerforMonit', 'count');
			var tps = app.domain.get('AppPerforMonit', 'tps');

			$('.AppPerforTab1-appName', $el).html(appName);
			$('.AppPerforTab1-avg', $el).html(avg);
			$('.AppPerforTab1-count', $el).html(count);
			$('.AppPerforTab1-tps', $el).html(tps);
			// $('.AppPerforTab1-appName', $el).html(appName);

			var $treeTable = $('#treeTable', $el);

			var echartsObj = {};

			function ajaxWithAfa(url,data){
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: url,
						data: data
					}).done(function(content){
						resolve(content.result);
					})
				});
			}

			// 初始化echarts
			$('.echarts-app-kpi', $el).each(function(){
				echartsObj[this.id] = echarts.init(this);
			});

			function initEcharts(id, datetime, value, unit){
				var option = {
					grid: {
						left: 0,
						bottom: 0,
						right: 5,
						top: 30,
						containLabel: true
					},
					tooltip: {
						show: true,
						trigger: 'axis'
					},
				    xAxis: {
				        data: datetime,
				        axisLabel: {
				            textStyle: {
				            }
				        },
				        axisTick: {
				            show: false
				        },
				        axisLine: {
				            show: false
				        },
				        z: 10
				    },
				    yAxis: {
				    	name: '单位：'+ unit,
				        axisLine: {
				            show: false
				        },
				        axisTick: {
				            show: false
				        },
				        axisLabel: {
				            textStyle: {
				                color: '#999'
				            }
				        }
				    },
				    series: [
				        {
				            type: 'line',
				            itemStyle: {
				                normal: {
				                    color: '#55a8fd',
				                },
				            },
				            data: value
				        }
				    ]
				}
				echartsObj[id].setOption(option);
			}

			$('.capsule-select', $el).on('click', 'a', function(){
				$(this).addClass('selected').siblings().removeClass('selected');
				statisEchars();
			})

			// 获取echarts数据
			async function statisEchars() {
				var endtime = await ajaxWithAfa(`ESSearchAction_getNowTime.do`);
				var starttime = endtime - parseInt($('.capsule-select a.selected', $el).attr('data-value'))*60000;
				var cate = JSON.stringify({"app":{"cate3":[{"cateName":appName}]}});
				var startTime = new Date(starttime).Format('yyyy-MM-dd hh:mm:ss');
				var endTime = new Date(endtime).Format('yyyy-MM-dd hh:mm:ss');
				$.when(
					app.common.ajaxWithAfa({url: `AppStatisticAction_statisEchars.do`, data: {'field': 'avg(duration)','cate': cate,'startTime': startTime,'endTime': endTime}}),
					app.common.ajaxWithAfa({url: `AppStatisticAction_statisEchars.do`, data: {'field': 'count(*)','cate': cate,'startTime': startTime,'endTime': endTime}}),
					// ajaxWithAfa(`AppStatisticAction_statisEchars.do`, {'field': '','cate': cate,'startTime': startTime,'endTime': endTime})
				).done(function(content_avg,content_count){
					// TPS
					// var result_tps = await ;
					var buckets_avg = content_avg.result.aggs.buckets;
					var buckets_count = content_count.result.aggs.buckets;
					// var buckets_tps = result_tps.aggs.buckets;

					var datetime_avg = buckets_avg.map(function(item,index){
						return new Date(item.key).Format('hh:mm');
					})
					var value_avg = buckets_avg.map(function(item,index){
						return parseInt(item['AVG(duration)'].value);
					})
						
					var datetime_count = buckets_count.map(function(item,index){
						return new Date(item.key).Format('hh:mm');
					})
					var value_count = buckets_count.map(function(item,index){
						return item['COUNT(*)'].value;
					})

					// var datetime_tps = buckets_tps.map(function(item,index){
					// 	return new Date(item.key).Format('hh:mm');
					// })
					// var value_tps = buckets_tps.map(function(item,index){
					// 	return item.count.value;
					// })

					initEcharts('avg', datetime_avg, value_avg, '毫秒');
					initEcharts('count', datetime_count, value_count, '笔');
					// initEcharts('tps', datetime_tps, value_tps);
					
				})
			}

			$('[data-toggle="tab"]', $el).on('shown', function(){
				$('.echarts-app-kpi', $el).each(function(){
					echartsObj[this.id].resize();
				});
			})

			async function getHostInfo(){
				var tbody_HTML = "";
				var treetable_data = [];
				var time = await ajaxWithAfa(`ESSearchAction_getNowTime.do`);
				var result = await ajaxWithAfa(
					'AppStatisticAction_statisBasic.do',
					{
						'type': 2,
						'startTime': new Date(time).Format('yyyy-MM-dd 00:00:00'),
						'endTime': new Date(time).Format('yyyy-MM-dd hh:mm:ss'),
						'cate': JSON.stringify({
							"app": {
								"cate3":[{
									"cateName": appName
								}]
							}
						})
					}
				)
				var buckets = result.aggs.buckets;
				for(let i=0; i<buckets.length; i++){
					let item = buckets[i];
					let result2 = await ajaxWithAfa(
						'AppStatisticAction_statisBasic.do',
						{
							'type': 3,
							'startTime': new Date(time).Format('yyyy-MM-dd 00:00:00'),
							'endTime': new Date(time).Format('yyyy-MM-dd hh:mm:ss'),
							'cate': JSON.stringify({
								"app": {
									"cate3": [{
										"cateName": appName,
									}],
								},
								"hosts":{
									"host": [item.key]
								}
							})
						}
					)
					let buckets2 = result2.aggs.buckets;
					let instance = [];
					for(let j=0; j<buckets2.length; j++){
						let item = buckets2[j];
						instance.push({
							'key': item.key,
							'avg': parseInt(item.avg.value),
							'count': parseInt(item.count.value)
						})
					}
					treetable_data.push({
						'key': item.key,
						'avg': parseInt(item.avg.value),
						'count': parseInt(item.count.value),
						'instance':instance
					});
				}

				treetable_data.forEach((item) => {
					var i=0;
					tbody_HTML += `
						<tr index-val="${++i}" data-tt-id="${item.key}" data-tt-parent-id="1">
							<td>${item.key}</td>
							<td>${item.count}</td>
							<td>${item.avg}ms</td>
							<td>-</td>
							<td>-</td>
						</tr>`;
					item['instance'].forEach((item2) => {
						tbody_HTML += `
						<tr index-val="${++i}" data-tt-id="${item2.key}" data-tt-parent-id="${item.key}">
							<td>${item2.key}</td>
							<td>${item2.count}</td>
							<td>${item2.avg}ms</td>
							<td>-</td>
							<td>-</td>
						</tr>`;
					})

				})
				$('tbody', $treeTable).html(tbody_HTML);
				// 初始化主机表格
				$treeTable.treetable({ expandable: true });
				// 主机个数
				$('.AppPerforTab1-hostNum', $el).html(treetable_data.length + '个')
			}

			statisEchars();
			getHostInfo();
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});