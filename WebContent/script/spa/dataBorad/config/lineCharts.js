/**
 * 折线图配置
 */
define([], function(base) {
	"use strict";
	
	/*时间格式化*/
	Date.prototype.Format = function (fmt) { //
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
	
	const option = {
		color:["#2196f3","#009688","#a1afc5","#673ab7","#00bcd4","#ffeb3b","#5fa962","#795548","#649887","#460cad"],
		title: {
			show: true,
			text: '单位: ',
			left: 'left',
			textStyle: {
				fontSize: 12,
				color: '#a3a2a7',
				fontFamily: '微软雅黑',
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
				interval: true
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
	        name: "图例1",
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
	};
	
	
	return JSON.stringify(option);
});

