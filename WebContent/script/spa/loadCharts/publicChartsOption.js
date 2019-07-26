/**
 * echarts 初始 config
 */
define([], function () {
	var config = {
		color:["#2196f3","#009688","#a1afc5","#673ab7","#00bcd4","#ffeb3b","#5fa962","#795548","#649887","#460cad"],
		title: {
			show: true,
			text: '单位: ',
			left: 'left',
			textStyle: {
				fontSize: 12,
				color: '#a3a2a7',
				fontWeight: 'normal'
			}
		},
	    grid: {
	      borderWidth: 0,
	      left: 40,
	      right: 10,
	      top: 25,
	      bottom: 20
	    },
	    backgroundColor: 'transparent',
	    legend:{
	    	show: true,
	    	x:'right',
	    	orient:'horizontal'
	    },
	    xAxis: {
	    	show: true,
			type: 'category',
			boundaryGap: false,
	        data: [],
	        axisLine: {
				show: true,
				lineStyle: {
					color: '#929099',//横坐标轴颜色
					width: 1,
					type: 'solid'
				}
			},
	        axisLabel: {
				show: true,
				margin: 6,
				rotate: '0',
				textStyle: {
					color: '#5c5a66'
				},
				interval: 0
			},
	        splitLine: {
	        	show: false,
				lineStyle: {
					color: '#5c5a66',
					type: 'solid',
					width: 1,
				}
	        },
	        axisTick: {
				show: true,
				inside: true,
				lineStyle: {
					color: '#929099',//横坐标点颜色
					width: 1,
					type: 'solid'
				}
			}
	    },
	    tooltip: {
	    	show: true,
			trigger: 'axis'
		},
		radar: null,
	    yAxis: {
	    	type: 'value',
	    	show: true,
			axisLabel: {
				show: true,
				rotate: '0',
				textStyle:{
					color: '#5c5a66',
					align: 'left',
				},
				margin: 35
			},
			axisLine: {
				show: true,
				lineStyle: {
					color: '#929099',
					width: 1,
					type: 'solid'
				}
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false,
				lineStyle: {
					color: '#5c5a66',
					type: 'solid',
					width: 1,
				}
			}
	    },
	    series: [{
	        data: [],
	        type: 'line',
	        name: "",
	        smooth: true,
			symbolSize: 5,
	        label:{
	        	show: false
	        },
	        itemStyle:{
	        	
	        },
	        lineStyle: {
	          color: '#5b62f9',
	          width: "1"
	        },
	        left: 'center',
	        width: '50%'
	    }]
	}
	
	return JSON.parse(JSON.stringify(config));
})