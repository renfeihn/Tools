define(["jquery","handlebars"],function($,hb){
	var echartsObj ={
		eWarning:null
	},
	echartsInterval;
	return {
		load:function($el,scope,handler){
			var warningRoleIds=[];
			var warningRoleNames=[];
			var totalEchartsInterval;

			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			function loadSearchTableData() {
				$('.logWarningMonitor-noData', $el).hide();
				return app.common.ajaxWithAfa({
					url:'LogWarningAction_getAllWarning.do'
				}).done(function (data) {
					var result = data.result,
					htmlString = '';
					warningRoleIds = [];
					if(result && result.length > 0){
						result.forEach(function (item, index) {
							var iString;
							if(item.isOpen == 1){
								iString = '<i class="fa fa-cog fa-spin" style="color:#22ac38"></i>';
							}else if(item.isOpen == 2){
								iString = '<i class="fa fa-cog"></i>';
							}

							htmlString += '<li><span>'+(index+1)+'</span><span><i class=></i> '+iString+item.name+'</span><span>-</span><span>-</span></li>';
							warningRoleIds.push(item.id);
							warningRoleNames.push(item.name);
						})
						$('#warnRoleCount', $el).text(result.length || 0);
						$('#roleList', $el).html(htmlString);
					}else{
						$('.logWarningMonitor-noData', $el).show();
					}
					return $.Deferred().resolve(data);
				})
			}
			loadSearchTableData().then(function (data) {
				var option = getBarOption(warningRoleNames,{
					xline:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
					line1:[{value:3,itemStyle:{normal:{color:'#f1f0f5'},emphasis:{color:'#f1f0f5'}}},1,1,2,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1],
					line2:[1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1],
					line3:[1,1,1,1,1,1,1,1,1,7,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					line4:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1],
					line5:[1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1]
				});

				echartsObj.eRoleEcharts = app.echarts.init($('#eRoleEcharts',$el)[0]);
				echartsObj.eRoleEcharts.setOption(option);
			})

			function drawEcharts(ids) {
				app.common.ajaxWithAfa({
					url:'LogWarningAction_getWarnDetail.do',
					data:{
						ids:ids
					}
				}).done(function (data) {
					if(data.result && !$.isEmptyObject(data.result)){
						for (var item in data.result) {
							var eData = data.result[item];
							var echartsData ={
								xline:[],
								line1:[]
							}
							for (var tmp in eData) {
							 	echartsData.xline.push(tmp);
							 	echartsData.line1.push(eData[tmp]);
							}
							// var option = getBarOption(['统计结果'],echartsData);
							var option = getBarLineOption(['统计结果'],echartsData);
							if(item == warningRoleIds[0]){
								option.xAxis[0].position='top';
								option.xAxis[0].axisLine.show=true;
								option.xAxis[0].axisLabel.show=true;
								option.xAxis[0].axisTick.show=true;
								option.xAxis[0].axisTick.inside=true;
								option.xAxis[0].axisLine.onZero=false;
								option.grid.y2=5;
								option.grid.y=0;
							}
							echartsObj[item].setOption(option);
						}
					}
				})
			}

			$('.span-eWarning-time', $el).on('click', 'span', function(event) {
				event.preventDefault();
				if($(this).hasClass('active')){
					return;
				}
				$(this).addClass('active').siblings().removeClass('active');
				// 获取echarts数据
				var interval = $(this).attr('data-interval');
				if(interval){
					totalEchartsInterval = interval*60;
					getTotalEchartsData(totalEchartsInterval);
				}
			});
			$('.span-eWarning-time span[data-interval="1"]', $el).trigger('click');

			function getTotalEchartsData(interval) {
				app.common.ajaxWithAfa({
					url:'LogWarningAction_getWarnMonitor.do',
					data:{
						interval:interval
					}
				}).done(function (data) {
					if(!echartsObj.eWarning){
						echartsObj.eWarning = app.echarts.init($('#eWarning', $el)[0])
					}
					var result = data.result,
					echartsData={
						xline:[],
						line1:[]
					};
					if(result && !$.isEmptyObject(result)){
						$('#warningCountTotal', $el).text(result.todayEvent||0);
						$('#touchRoleCount', $el).text(result.touchWarn||0);
						if(result.event && result.event.length > 0){
							result.event.forEach(function (item) {
								echartsData.xline.push(item.time);
								echartsData.line1.push(item.count);
							})
						}
					}
					echartsObj.eWarning.setOption(getLineOption('单位：次', ['预警'], echartsData));
				})
			}
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
							x: 40,
	                        y: 25,
	                        x2: 30,
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

			/**
			 * 获取echartsBarOption
			 * @param  {string} title '单位：次'
			 * @param  {array} item  ['告警','预警']
			 * @param  {string} type  'line'
			 * @param  {[type]} data  echarts数据
			 * @return {[type]} option      [description]
			 */
			function getBarOption(item,data) {
				var lineOption = {
						color: ['#cdceec'],
						title: {
							show: false
						},
						legend: {
							show: false,
						},
						axisPointer: {
					        link: {
					            xAxisIndex: 'all'
					        }
					    },
						grid: [],
						tooltip: {
							trigger: 'axis',
							confine: true
						},
						xAxis: [],
						yAxis: [],
						series: []
				};
				var height = 70 *item.length;
				var erverHeight = (height - 10*(item.length - 1))/item.length
				var index = 0;
				var series = [],
					grid = [],
					yAxis = [],
					xAxis = [];
				for (var tmp in data) {
					if (tmp != 'xline') {
						yAxis.push({
							type: 'value',
							axisLabel: {
								show: true,
								textStyle:{
									color: '#5c5a66',
									align: 'right',
									"fontSize":10
								},
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: false,
							},
							splitNumber: 2,
							gridIndex: index,
						})
						if(tmp == 'line1'){
							xAxis.push({
								type:'category',
								data: data.xline,  
								"offset":0,
								"axisLine" : {
									show: true,
									lineStyle : {
										color : '#929099',
									},
									onZero:false
								},
								"axisLabel":{
									"show":true,
									"textStyle":{
										"align":"center",
									}
								},
								position: 'top',
								axisTick: {
									show: false,
									inside:true,
								},
								nameGap:0,
								gridIndex: index
							})
							grid.push({
								show:false,
								top: 0,
					            bottom: height - erverHeight*(index+1)+ 10*(index+1),
					            left: 0,
					            right: 0,
		                        height: erverHeight,
		                        containLabel :true,
		                        borderWidth: 0
							})
						}else{
							xAxis.push({
								type:'category',
								data: data.xline,
								"offset":0,
								"axisLine" : {
									show: false,
								},
								"axisLabel":{
									"show":false
								},
								axisTick: {
									show: false,
								},
								nameGap:0,
								gridIndex: index,
								show: false
							})
							grid.push({
								show:false,
								top: 0+70*index + 5*index,
					            bottom: height-70*(index+1)-15,
					            left: 0,
					            right: 0,
		                        height: erverHeight,
		                        containLabel :true,
		                        borderWidth: 0
							})
						}

						series.push({
						 	name: item[index],
							type: 'bar',
							barCategoryGap: 1,
							data: data[tmp],
							animation:true,
							yAxisIndex: index,
							xAxisIndex: index,
						})
						index++;
					}
				}

				lineOption.series = series;
				lineOption.grid = grid;
				lineOption.xAxis = xAxis;
				lineOption.yAxis = yAxis;
				return lineOption;
			}
		},
		
		unload:function(handler){
			for (var item in echartsObj) {
				echartsObj[item] && echartsObj[item].dispose();
			}
			echartsInterval && handler.clearInterval(echartsInterval);
		},
		
		pause:function($el,scope,handler){

		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});
