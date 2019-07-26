define([ "jquery" ], function() {
	
	var eEvent;
	
	return {
		load : function($el, scope, handler) {
			eEvent = app.echarts.init($('#eEvent',$el)[0]);
			eTps = app.echarts.init($('#eTps',$el)[0]);
			eSS = app.echarts.init($('#eSS',$el)[0]);
			var $dataTable = $('#dataTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'name', defaultContent : ''
				},{
					data : 'search', defaultContent : ''
				},{
					data : 'conditions', defaultContent : ''
				},{
					data : 'isOpen', defaultContent : ''
				},{
					data : 'planType', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<i class="fa fa-cog fa-spin" style="color:#22ac38"></i>已启动';
						}else if( data == '2'){
							return '<i class="fa fa-cog"></i>未启动';
						}
                    },
                    "targets" : ''
				}]
			});
			var statisticstype = scope.data.statisticstype;
			var name = scope.data.name;
			$('#version', $el).text(name);
			$('#ip', $el).text(scope.data.datasize);
			$('#windowsCount', $el).text(scope.data.dataips);

			getCommonStatics()
			function getCommonStatics() {
				app.common.ajaxWithAfa({
					url:"LogStaticsAction_getAppStaticsSummary.do",
					data:{
						statisticstype: statisticstype,
						keyName: name
					}
				}).done(function (data) {
					if(data.result && !$.isEmptyObject(data.result)){
						$('#linuxCount', $el).text(data.result.hostCount);
						$('#aixCount', $el).text(data.result.sourceCount);
					}
				})
			}
			drawEvent();
			function drawEvent() {
				app.common.ajaxWithAfa({
					url:'LogWarningAction_getWarnMonitor.do',
					data:{
						interval:60
					}
				}).done(function (data) {
					var result = data.result,
					waringCount,
					echartsData={
						xline:[],
						line1:[],
						line2:[]
					};
					if(result && !$.isEmptyObject(result)){
						$('#warningCountTotal', $el).text(result.todayEvent||0);
						$('#touchRoleCount', $el).text(result.touchWarn||0);
						if(result.event && result.event.length > 0){
							var len = result.event.length;
							result.event.forEach(function (item, index) {
								echartsData.xline.push(item.time.substring(0,5));
								echartsData.line1.push(item.count);
								echartsData.line2.push(0);
								if(len == index+1){
									waringCount = item.count;
								}
							})
						}
					}
					// eEvent.setOption(getLineOption('单位：次', ['预警','告警'], echartsData));
					$('#eventNum', $el).text(result.todayEvent||'-');
					$('#waringCount', $el).text(waringCount||'-');
				})
			}
			eEvent.setOption(getLineOption('单位：次', ['指标异常'], {
				xline:['20:30','20:38','20:46','20:54','21:02','21:10','21:18','21:26'],
				line1:[0, 0, 0, 0, 1, 0, 0, 0]
			}));

			eTps.setOption(getLineOption('单位：个', ['TPS'], {
				xline:['20:30','20:38','20:46','20:54','21:02','21:10','21:18','21:26'],
				line1:[100, 234, 430, 134, 455, 488, 257, 345]
			}));
			eSS.setOption(getLineOption('', ['平均耗时','5s以上个数','10s以上个数','30s以上个数'], {
				xline:['20:30','20:38','20:46','20:54','21:02','21:10','21:18','21:26'],
				line1:[1200, 1400, 5000, 924, 1330, 6000, 880, 1280],
				line2:[0, 0, 1, 0, 0, 1, 0, 0],
				line3:[0, 0, 0, 0, 0, 0, 0, 0],
				line4:[0, 0, 0, 0, 0, 0, 0, 0]

			}));

			$('.filterBtn', $el).on('click', 'span', function(event) {
				event.preventDefault();
				if ($(this).hasClass('active')) {
					return;
				}
				$(this).addClass('active').siblings().removeClass('active');
			});
			/**
			 * 获取echartsLineOption
			 * @param  {string} title '单位：次'
			 * @param  {array} item  ['告警','预警']
			 * @param  {[type]} data  echarts数据
			 * @return {[type]} option      [description]
			 */
			function getLineOption(title,item,data) {
				var lineOption = {
						color: ['#5b62f9', '#fb8229', '#fa594d', '#0bbf46', '#3e7ad6'],
						title: {
							show: true,
							text: title,
							left: 34,
							top: '-2',
							textStyle: {
								fontSize: 12,
								color: '#a3a2a7',
								fontFamily: '微软雅黑',
								fontWeight: 'normal'
							}
						},
						legend: {
							show: true,
							orient: 'horizontal',
							right: 8,
							top: '-2',
							data:item,
							icon: 'rect',
							itemHeight: 2,
						},
						grid: {
							borderWidth: 0,
							x: 32,
	                        y: 20,
	                        x2: 15,       
	                        y2: 20
						},
						tooltip: {
							trigger: 'axis'
						},
						xAxis: [
							{
								show: true,
								type: 'category',
								boundaryGap: false,
								axisLabel: {
									show: true,
								},
								splitLine: {show: false},
								axisLine: {
									show: true,
									lineStyle: {
										color: '#929099',//横坐标轴颜色
										width: 2,
										type: 'solid'
									}
								},
								axisTick: {
									show: false,
								},
								data: data.xline,
								splitNumber: 5
							}
						],
						yAxis: [
							{
								type: 'value',
								axisLabel: {
									show: true,
									textStyle:{
										color: '#5c5a66',
										align: 'left',
									},
									margin: 32
								},
								axisLine: {
									show: false
								},
								axisTick: {
									show: false
								},
								splitLine: {
									show: true,
								},
								splitNumber: 5
							}
						],
						series: []
				};
				var index = 0;
				var series = []
				for (var tmp in data) {
					if (tmp != 'xline') {
						series.push({
						 	name: item[index++],
							type: 'line',
							smooth: true,
							symbol: 'none',
							data: data[tmp]
						})
					}
				}
				lineOption.series = series;
				return lineOption;
			}
		},
		unload : function(handler) {
			eEvent && eEvent.dispose();
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});
