/**
 * echarts 配置总览
 */
define(['publicChartsOption','echarts4'], function (publicChartsOption, echarts) {
	var chartsOption = function () {
		this.echartsOption = JSON.parse(JSON.stringify(publicChartsOption));
	}
	chartsOption.prototype = {
		init (ele) {
			var chartsObj = echarts.init(ele);
			chartsObj.setOption(this.echartsOption);
			return chartsObj;
		},
		draw (type) {
			var echartsOption = this.echartsOption;
			switch (type) {
				case '1':
					this.drawPartitionLine(echartsOption);
					break;
				case '2':
					this.drawPartitionbar(echartsOption);
					break;
				case '3':
					this.drawPie(echartsOption);
					break;
				case '4':
					this.drawScatter(echartsOption);
					break;
				case '5':
					this.drawArea(echartsOption);
					break;
				case '6':
					this.drawCombination(echartsOption);
					break;
				case '8':
					this.drawRadar(echartsOption);
					break;
				case '9':
					this.drawPartitionbar(echartsOption);
					break;
				case '10':
					this.drawRose(echartsOption);
					break;
				case '11':
					this.drawPileBar(echartsOption);
					break;
				case '12':
					this.drawFunnel(echartsOption);
					break;
			}
			if(type == '9'){
				//横向柱状图特殊处理
				echartsOption.xAxis.type = 'value';
				echartsOption.yAxis.type = 'category';
				echartsOption.yAxis.data = JSON.parse(JSON.stringify(echartsOption.xAxis.data));
			}else{
				echartsOption.xAxis.type = 'category';
				echartsOption.yAxis.type = 'value';
				echartsOption.yAxis.data = null;
			}
			return echartsOption;
		},
		drawPie(echartsOption) {
			echartsOption.xAxis.show = false;
			echartsOption.yAxis.show = false;
			echartsOption.radar = {};
			echartsOption.tooltip.trigger = 'item';
			console.log(echartsOption)
			echartsOption.series.forEach((item,index) => {
				item.type = 'pie';
				item.areaStyle = null;
				item.roseType = null;
				item.radius = ['50%', '70%'];
				item.label = {show:true};
				item.label.normal = {
						formatter: '{b} {d}%'
				};
				item.pieData = item.lineData.map((item,index) => {
					let obj = {};
					let key = echartsOption.xAxis.data[index];
					obj['name'] = key;
					obj['value'] = item;
					obj['itemStyle'] = {
							color: echartsOption.color[parseInt(Math.random(0,1)*10)]
					};
					return obj;
				});
				item.data = item.pieData;
			});
		},
		drawScatter(echartsOption) {
			echartsOption.xAxis.show = true;
			echartsOption.yAxis.show = true;
			echartsOption.tooltip.trigger = 'axis';
			echartsOption.xAxis.boundaryGap = false;
			echartsOption.radar = {};
			echartsOption.series.forEach(item => {
				item.type = 'scatter';
				item.areaStyle = null;
				item.symbolSize = 15;
				item.stack = null;
				if(item.data[0] && item.data[0].value){
					item.lineData = item.lineData.filter(item => {
						return item || item == 0 || item == '';
					});
					item.data = item.lineData;
				}
			});
		},
		drawPartitionLine(echartsOption) {
			echartsOption.xAxis.show = true;
			echartsOption.yAxis.show = true;
			echartsOption.tooltip.trigger = 'axis';
			echartsOption.xAxis.boundaryGap = false;
			echartsOption.radar = {};
			echartsOption.series.forEach((item,index) => {
				item.type = 'line';
				item.stack = null;
				item.areaStyle = null;
				item.lineData = item.data;
				if(item.data[0] && item.data[0].value){
					item.lineData = item.lineData.filter(item => {
						return item || item == 0 || item == '';
					});
					item.data = item.lineData;
				}
			});
		},
		drawPartitionbar(echartsOption) {
			echartsOption.xAxis.show = true;
			echartsOption.yAxis.show = true;
			echartsOption.tooltip.trigger = 'axis';
			echartsOption.xAxis.boundaryGap = true;
			echartsOption.radar = {};
			echartsOption.series.forEach(item => {
				item.type = 'bar';
				item.stack = null;
				item.areaStyle = null;
				if(item.data[0] && item.data[0].value){
					item.lineData = item.lineData.filter(item => {
						return item || item == 0 || item == '';
					});
					item.data = item.lineData;
				}
			});
		},
		drawArea(echartsOption) {
			echartsOption.xAxis.show = true;
			echartsOption.yAxis.show = true;
			echartsOption.tooltip.trigger = 'axis';
			echartsOption.xAxis.boundaryGap = false;
			echartsOption.radar = {};
			echartsOption.series.forEach(item => {
				item.type = 'line';
				item.areaStyle = {};
				item.stack = null;
				item.symbolSize = 5;
				if(item.data && item.data[0].value){
					item.lineData = item.lineData.filter(item => {
						return item || item == 0 || item == '';
					});
					item.data = item.lineData;
				}
			});
		},
		drawCombination (echartsOption) {
			echartsOption.xAxis.show = true;
			echartsOption.yAxis.show = true;
			echartsOption.tooltip.trigger = 'axis';
			echartsOption.radar = {};
			echartsOption.series.forEach((item,index) => {
				item.stack = null;
				item.symbolSize = 5;
				if(item.data[0].value){
					item.lineData = item.lineData.filter(item => {
						return item || item == 0 || item == '';
					});
					item.data = item.lineData;
				}
			});
		},
		drawRadar (echartsOption) {
			let arrs = [];
			let radarData = echartsOption.series.map((item,index) => {
				arrs = arrs.concat(item.lineData);
				let color = (item.itemStyle && item.itemStyle.color) || echartsOption.color[index];
				return {
					'name':item.name,
					'value':item.lineData,
					'itemStyle':{color:color},
					'lineStyle':{color:color}
				};
			});
			echartsOption.xAxis.show = false;
			echartsOption.yAxis.show = false;
			echartsOption.tooltip.trigger = 'item';
			echartsOption.series.length = 1;
			echartsOption.series[0].type = 'radar';
			echartsOption.series[0].data = radarData;
			echartsOption.series[0].symbolSize = 0;
			echartsOption.series[0].areaStyle = null;
			arrs = arrs.filter(item => {
				return item != undefined
			});
			let max = Math.max(...arrs);
			echartsOption.radar = {
		        name: {
		            textStyle: {
		                color: '#fff',
		                backgroundColor: '#999',
		                borderRadius: 3,
		                padding: [3, 5]
		           }
		        },
		        indicator: echartsOption.xAxis.data.map(item => {
		        	return {'name':item,'max':max}
		        })
		    };	
		},
		drawRose (echartsOption) {
			echartsOption.xAxis.show = false;
			echartsOption.yAxis.show = false;
			echartsOption.radar = null;
			echartsOption.tooltip.trigger = 'item';
			echartsOption.series.forEach((item,index) => {
				item.type = 'pie';
				item.roseType = 'radius';
				item.areaStyle = null;
				item.radius = ['0%', '70%'];
				item.label = {show:true};
				item.label.normal = {
						formatter: '{b} {d}%'
				};
				item.data = item.lineData.map((item,index) => {
					let obj = {};
					let key = echartsOption.xAxis.data[index];
					obj['name'] = key;
					obj['value'] = item;
					obj['itemStyle'] = {
							color: echartsOption.color[index]
					};
					return obj;
				})
			});
		},
		drawPileBar (echartsOption) {
			echartsOption.xAxis.show = true;
			echartsOption.yAxis.show = true;
			echartsOption.tooltip.trigger = 'axis';
			echartsOption.xAxis.boundaryGap = true;
			echartsOption.radar = {};
			echartsOption.series.forEach(item => {
				item.type = 'bar';
				item.stack = 'all';
				item.areaStyle = null;
				if(item.data[0].value){
					item.lineData = item.lineData.filter(item => {
						return item || item == 0 || item == '';
					});
					item.data = item.lineData;
				}
			});
		},
		drawFunnel (echartsOption) {
			echartsOption.xAxis.show = false;
			echartsOption.yAxis.show = false;
			echartsOption.tooltip.trigger = 'item';
			echartsOption.radar = {};
			echartsOption.series.forEach((item,index) => {
				item.type = 'funnel';
				item.areaStyle = null;
				item.label = {show:true};
				item.data = item.lineData.map((item,index) => {
					let obj = {};
					let key = echartsOption.xAxis.data[index];
					obj['name'] = key;
					obj['value'] = item;
					obj['itemStyle'] = {
							color: echartsOption.color[index]
					};
					return obj;
				})
			});
		}
		
	}
	
	return chartsOption;
}) 