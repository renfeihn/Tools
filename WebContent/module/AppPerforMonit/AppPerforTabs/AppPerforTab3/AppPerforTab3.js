define(["jquery",'echarts4'], function($,echarts) {
	return {
		load : function($el, scope, handler) {

			var appName = app.domain.get('AppPerforMonit', 'appName');
			var result = [];
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
			var echartsObj = {};
			echartsObj['duration'] = echarts.init($('#duration', $el)[0]);
			function drawEcharts(id, data){
				var option = {
					grid: {
						left: 20,
						bottom: 20,
						right: 40,
						top: 60,
						containLabel: true
					},
					title: {
						left: 'center',
						top: 10,
						text: data.title,
					},
					tooltip: {
						show: true,
						trigger: 'item'
					},
				    yAxis: {
				    	type: 'category',
				        data: data.name,
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
				        },
				    },
				    xAxis: {
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
				            type: 'bar',
				            barWidth: '50%',
				            itemStyle: {
				                normal: {
				                    color: '#55a8fd',
				                },
				            },
				            data: data.value
				        }
				    ]
				}
				echartsObj[id].setOption(option);
				echartsObj[id].on('dblclick', function(event){
					var data;
					result.some(function(item,index){
						if(item._source["_head_.logsn"] == event.name){
							data = item;
							return true;
						}else{
							return false;
						}
					})
					var no = data._source['_head_.logsn'];
					app.dispatcher.load({
						"title": "日志明细 - "+no.substring(0, 4)+'...'+no.substr(-4, 4),
						"moduleId": 'logSearch',
						"section": 'logDetail',
						"id": 'search-'+no,
						"params": {
							serialno: data._source['_head_.logsn'],
							data: data._source,
							id: data['_id'],
							'host': data._source['_head_.hostip'],
							'index': data['_index'],
							'fileName': data._source['_head_.file']
						}
					});
				})
			}

			async function statisTops() {
				var time = await ajaxWithAfa(`ESSearchAction_getNowTime.do`);
				var cate = JSON.stringify({"app":{"cate3":[{"cateName":appName}]}});
				var startTime = new Date(time).Format('yyyy-MM-dd 00:00:00');
				var endTime = new Date(time).Format('yyyy-MM-dd hh:mm:ss');
				var top = 10;
				var orderType = 'desc';
				var field = 'duration';
				result = await ajaxWithAfa('AppStatisticAction_statisTops.do',{field,orderType,top,cate,startTime,endTime});
				var map = {value:[],name:[]};
				result.reverse();
				result.forEach(function(item,index){
					map.value.push(item._source["duration"]);
					map.name.push(item._source["_head_.logsn"]);
				})
				drawEcharts('duration', {
					title: 	'交易耗时TOP10',
					value: 	map.value,
					name: 	map.name,
				});
			}


			statisTops();
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});