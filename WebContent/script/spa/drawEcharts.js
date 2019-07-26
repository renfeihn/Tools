/**
 * [指标数据图表展示]
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author cailiangmu
 */
(function (undefined) {

	(function (factory) {
		"use strict";
		//amd module
		if(typeof define === "function" && define.amd) {
			define(["jquery", "echarts"], factory);
		}
		//global
		else{
			factory();
		}

	})(function () {
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
		
		/*深度拷贝*/
		var deepClone = function(obj){
			function _clone(obj){
                var newObj;
                if (typeof obj === 'string') {
                    //字符串
                    newObj = '' + obj;
                } else if ($.isArray(obj)) {
                    //数组
                    newObj = $.map(obj, function (elem) {
                        return _clone(elem);
                    });
                } else if (typeof obj === 'object') {
                    //对象
                    newObj = {};
                    for (var name in obj) {
                        if (obj[name] instanceof Function) {
                            newObj[name] = obj[name];
                        } else {
                            newObj[name] = _clone(obj[name]);
                        }
                    }
                } else {
                    newObj = obj;
                }

                return newObj;
            }

            return _clone(obj);
		}
		
		
		/*echarts图表
		 * 参数: options {object}: 所有参数都在这个对象里边
		 * options.handler {object}: 页面处理器 
		 * options.context {obj}: 上下文环境，一般为 $el
		 * options.selector {string}: 图表容器选择器
		 * options.eType {string}: echarts图的类型，目前只支持 "bar"、"line"、"pie"、"linepool"
		 * options.url {string}: 数据请求url
		 * options.margin {object}: echarts图的外边距,一般使用默认值就行，不需要传
		 * options.unit {string}: 需要显示的单位
		 * options.urlParams {object}: 请求所需的参数
		 * options.items {array}: echarts指标数组,例如["内存","线程"]
		 * options.colors {array}: echarts图表线条颜色, 如['#d978df','#89kdj3'], 有默认值
		 * options.xCount {number}: x轴显示的点数，默认显示5个点
		 * */
		var drawEcharts = function(options){
			var ___handler = options.handler,
			___context = options.context,
			___selector = options.selector,//图表容器
			___eType = options.eType,//echarts图的类型，目前只支持 "bar"、"line"、"pie"、"linepool"
			___url = options.url,//获取echarts数据的连接
		    ___margin = options.margin || {left: 40, top: 25, right: 10, bottom: 20},//echarts图的外边距,一般使用默认值就行，不需要传
		    ___unit = options.unit,//需要显示的单位
			___urlParams = options.urlParams,//请求参数
			___interval = ___urlParams.interval || 1,//请求数据中每两个数据点之间的间隔时间，单位为分钟，默认为1分钟
		    ___items = options.items,//echarts指标数组,例如["内存","线程"]
		    ___colors = options.colors || ['#5b62f9', '#fb8229', '#fa594d', '#0bbf46', '#3e7ad6'],//echarts图表线条颜色, 如['#d978df','#89kdj3'], 有默认值
		    ___xCount = options.xCount || 5,//x轴显示的点数，默认显示5个点
		    ___yMargin = options.yMargin || 32,//y轴数据离轴之间的距离，默认32
		    ___succfn = options.succfn,//请求成功的回调函数
		    ___beforefn = options.beforefn,
		    ___barWidth = options.barWidth || 25,
		    ___isRefresh = options.isRefresh == false ? false : true,//是否刷新，默认刷新
		    ___zeroFlag = options.zeroFlag || false,//x轴是否一直都是从当天0点开始，默认否
		    ___TimeScope = options.timeScope || false,
		    ___TimeParam = options.timeUnit;
		   
		    var ___freshTime = options.freshTime;//图表刷新时间，单位为秒

		    //___newUrl = options.newUrl;//获取最新点数据的url

			var ___timerId;//定时器id

			var $echartsCtn = $(___selector, ___context);
			var ___echartsObj = app.echarts.init($echartsCtn[0]);//初始化图表对象

			if(___TimeScope){
				var selectStr = '<select style="position: absolute;right: 0;top: -10%;width: 72px;border-color: #eee;'+
			    				'z-index: 55555;padding-right: 0; margin: 0;height: 20px;color: #fff; background-color: #5b62f9;">'+
			    				'<option value="30">30分钟</option><option value="60">1小时</option><option value="180">3小时</option><option value="360">6小时</option><option value="720">12小时</option><option value="1440">24小时</option></select>';
				$echartsCtn.append(selectStr);
				___urlParams[___TimeParam] = 30;
				$echartsCtn.children("select").on("change",function(){
					___urlParams[___TimeParam] = $(this).val() ;
//					dispose();
					___handler.clearInterval(___timerId);
					___timerId = null;
					start();
				});
			}
				
			var ___echartsOldData;//缓存图表的旧数据
	        
			//echarts表格默认初始化参数，可查阅官网API，查找相应配置做修改
			var ___optionConfig = {
				//折线图配置
				lineOption: {
					color: ___colors,
					title: {
						show: true,
						text: '单位: ' + ___unit,
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
						top: '-2'
					},
					grid: {
						borderWidth: 0,
						x: ___margin.left,
                        y: ___margin.top,
                        x2: ___margin.right,       
                        y2: ___margin.bottom
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
								margin: 6,
								textStyle: {
									color: '#5c5a66',
									//fontSize: 13
								}
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
								show: true,
								inside: true,
								lineStyle: {
									color: '#929099',//横坐标点颜色
									width: 2,
									type: 'solid'
								}
							},
							data: ['-']
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
								margin: ___yMargin
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
								// lineStyle: {
								// 	color: 'rgba(23,66,129,.9)',//表中横线颜色
								// 	type: 'solid'
								// }
							}
							/*max: 140,
							splitNumber: 7*/
						}
					],
					series: [
						//{data: ['-']}
					]
				},

				//柱状图配置
				barOption: {
					color: ___colors,
					title: {
						show: true,
						text: '单位: ' + ___unit,
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
						top: '-2'
					},
					grid: {
						borderWidth: 0,
						x: ___margin.left,
                        y: ___margin.top,
                        x2: ___margin.right,       
                        y2: ___margin.bottom
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: [
						{
							show: true,
							type: 'category',
							boundaryGap: true,
							axisLabel: {
								show: true,
								margin: 6,
								textStyle: {
									color: '#5c5a66',
									//fontSize: 13
								}
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
								inside: true,
								lineStyle: {
									color: '#929099',//横坐标点颜色
									width: 2,
									type: 'solid'
								}
							},
							data: ['-']
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
								margin: ___yMargin
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
								// lineStyle: {
								// 	color: 'rgba(23,66,129,.9)',//表中横线颜色
								// 	type: 'solid'
								// }
							}
							/*max: 140,
							splitNumber: 7*/
						}
					],
					series: [
					    //{data: ['-']}
					]
				},

				//饼状图配置
				pieOption: {
					color: ___colors,
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					series: [
					    //{data: ['-']}
					]
				}
			};
			
			//初始化数据
			var initData = function(){
				$.ajax({
						'type': 'post',
						'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
						'url': ___url,
						'dataType': 'json',
						'data': ___urlParams,
						'success': function (data) {
							if(data && data.status){
								___beforefn && ___beforefn(data);
								
								//if(!$.isEmptyObject(data.content.echartsData)){
								showData(data.content.echartsData);
								//}
								
								___succfn && ___succfn(data);//回调函数

								___echartsOldData = data;
							}	
						}
				});
			}
			
			//展示图表数据
			var showData = function(data){
				//echarts配置中legend所需的data
				var lineData = [],
	        		barData = [];
				for(var i = 0; i < ___items.length; i++){
					lineData.push({
						name: ___items[i],
						textStyle: {
							fontSize: 12,
							color: '#2b2933',
							fontFamily: '微软雅黑'
						},
						icon: 'line'
					});
					
					barData.push({
						name: ___items[i],
						textStyle: {
							fontSize: 12,
							color: '#2b2933',
							fontFamily: '微软雅黑'
						},
						icon: 'bar'
					});
				}
				
				if(___eType === 'line'){
					___echartsObj && ___echartsObj.setOption(deepClone(___optionConfig.lineOption));
					var seriesData = [];
					
					if($.isEmptyObject(data)){//没有数据时所做的处理
						for(var i = 0; i < ___items.length; i++){
							seriesData.push({
							 	name: ___items[i],
								type: 'line',
								smooth: true,
								symbol: 'none',
								data: ['-']
							});
						}
						
						___echartsObj && ___echartsObj.setOption({
							legend: {data: lineData},
							series: seriesData
						});
						
						return;
					}
					
					for(var i = 0; i < ___items.length; i++){
						var formateData = data['line'+(i+1)] && data['line'+(i+1)].map(function(item,index){
							if(!item || typeof Number(item).toFixed != "function") return item;
							return Number(item).toFixed(2);
						});
						seriesData.push({
						 	name: ___items[i],
							type: 'line',
							smooth: true,
							symbol: 'none',
							data: formateData,
							connectNulls: true
						});
					}
					___echartsObj && ___echartsObj.setOption({
						legend: {data: lineData},
						xAxis: [
							{
								data: data.time,
								axisLabel: {
									interval: function(index){
										if(!data.line1) return;
										var num = Math.ceil(data.line1.length / ___xCount);
										var halfnum;
										if(data.line1.length % ___xCount == 0 || data.line1.length % num == 1){
											halfnum = Math.floor(num / 2);
										}else{
											if(data.line1.length % num == 2){
												halfnum = 0;
											}else{
												halfnum = Math.floor(data.line1.length % num / 2);
											}
										}
										
										if(index == halfnum){
											return true;
										}else if((index - halfnum) % num == 0){
											return true;
										}										
									}
								}
							}
						],
						series: seriesData
					});
					if(___isRefresh){
						if(___freshTime){
							___timerId = ___handler.setInterval(refreshData, ___freshTime*1000);
						}else{
							___timerId = ___handler.setInterval(refreshData, ___interval*60*1000);
						}						
					}
				}else if(___eType === 'linepool'){
					___echartsObj && ___echartsObj.setOption(deepClone(___optionConfig.lineOption));
					
					var seriesData = [];
					
					if($.isEmptyObject(data)){//没有数据时所做的处理
						for(var i = 0; i < ___items.length; i++){
							seriesData.push({
							 	name: ___items[i],
								type: 'line',
								smooth: true,
								symbol: 'none',
							    itemStyle: {
							    	normal: {
							    		areaStyle: {
							    			color: new app.echarts.graphic.LinearGradient(0,0,0,1,[{
							    				offset: 0, color: ___colors[i]
							    			},{
							    				offset: 1, color: 'transparent'
							    			}]),
							    			type: 'default'
							    		}
							    	}
							    },	
								data:['-']
							});
						}
						
						___echartsObj && ___echartsObj.setOption({
							legend: {data: lineData},
							series: seriesData
						});
						
						return;
					}
					
					for(var i = 0; i < ___items.length; i++){
						var formateData = data['line'+(i+1)] && data['line'+(i+1)].map(function(item,index){
							if(!item || typeof Number(item).toFixed != "function") return item;
							return Number(item).toFixed(2);
						});
						seriesData.push({
						 	name: ___items[i],
							type: 'line',
							smooth: true,
							symbol: 'none',
						    itemStyle: {
						    	normal: {
						    		areaStyle: {
						    			color: new app.echarts.graphic.LinearGradient(0,0,0,1,[{
						    				offset: 0, color: ___colors[i]
						    			},{
						    				offset: 1, color: 'transparent'
						    			}]),
						    			type: 'default'
						    		}
						    	}
						    },	
							data: formateData,
							connectNulls: true
						});
					}
					
					___echartsObj && ___echartsObj.setOption({
						legend: {data: lineData},
						xAxis: [
							{
								data: data.time,
								axisLabel: {
									interval: function(index){
										if(!data.line1) return;
										var num = Math.ceil(data.line1.length / ___xCount);
										var halfnum;
										if(data.line1.length % ___xCount == 0 || data.line1.length % num == 1){
											halfnum = Math.floor(num / 2);
										}else{
											if(data.line1.length % num == 2){
												halfnum = 0;
											}else{
												halfnum = Math.floor(data.line1.length % num / 2);
											}
										}
										
										if(index == halfnum){
											return true;
										}else if((index - halfnum) % num == 0){
											return true;
										}										
									}
								}
							}
						],
						series: seriesData
					});
					
					if(___isRefresh){
						if(___freshTime){
							___timerId = ___handler.setInterval(refreshData, ___freshTime*1000);
						}else{
							___timerId = ___handler.setInterval(refreshData, ___interval*60*1000);
						}
					}
				}else if(___eType === 'bar'){					
					___echartsObj && ___echartsObj.setOption(deepClone(___optionConfig.barOption));
					
					var seriesData = [];
					
					if($.isEmptyObject(data)){//没有数据时所做的处理
						for(var i = 0; i < ___items.length; i++){
							seriesData.push({
							 	name: ___items[i],
								type: 'bar',
								barGap: '0%',
								barWidth: ___barWidth,//柱子宽度
								data: ['-']
							});
						}
						
						___echartsObj && ___echartsObj.setOption({
							legend: {data: lineData},
							series: seriesData
						});
						
						return;
					}
					
					for(var i = 0; i < ___items.length; i++){
						var formateData = data['line'+(i+1)] && data['line'+(i+1)].map(function(item,index){
							if(!item || typeof Number(item).toFixed != "function") return item;
							return Number(item).toFixed(2);
						});
						seriesData.push({
						 	name: ___items[i],
							type: 'bar',
							barGap: '0%',
							barWidth: ___barWidth,//柱子宽度
							data: formateData
						});
					}
					
					___echartsObj && ___echartsObj.setOption({
						legend: {data: barData},
						xAxis: [{data: data.time}],
						series: seriesData
					});
					
					if(___isRefresh){
						if(___freshTime){
							___timerId = ___handler.setInterval(refreshData, ___freshTime*1000);
						}else{
							___timerId = ___handler.setInterval(refreshData, ___interval*60*1000);
						}
					}
				}else if(___eType === 'pie'){
					___echartsObj && ___echartsObj.setOption(deepClone(___optionConfig.pieOption));
					___echartsObj && ___echartsObj.setOption({
						series: [
							// {
						 //    	name: "xx",
						 //    	type: "pie",
						 //    	radius: "80%",
						 //    	data: [
						 //    	    {value:5, name:"其他"},
						 //    	    {value:8, name:"卡前置"},
						 //    	    {value:16, name:"互联网核心"},
						 //    	    {value:18, name:"网银互联"},
						 //    	    {value:25, name:"支付系统"},
						 //    	    {value:28, name:"核心系统"}
						 //    	],
						 //    	itemStyle: {
						 //    		emphasis: {
						 //    			shadowBlur: 10,
						 //    			shadowOffsetX: 0,
						 //    			shadowColor: 'rgba(0,0,0,.5)'
						 //    		}
						 //    	},
						 //    	hoverAnimation: true,
						 //    	label: {
						 //    		normal: {
						 //    			show: true,
						 //    			formatter: function(p){return p.percent.toFixed(2) + ' %';},
						 //    			textStyle:{
						 //    				color: '#fff'
						 //    			}
						 //    		}
						 //    	},
						 //    	clockwise: false,
						 //    	labelLine: {
						 //    		normal: {
						 //    			show: true,
						 //    			lineStyle: {
						 //    				color: '#fff',
						 //    			}
						 //    		}
						 //    	}
						 //    }
						]
					});
					
					if(___isRefresh){
						if(___freshTime){
							___timerId = ___handler.setInterval(refreshData, ___freshTime*1000);
						}else{
							___timerId = ___handler.setInterval(refreshData, ___interval*60*1000);
						}
					}
				}
			}

			//刷新数据
			var refreshData = function(){
				___urlParams.flag = 1;
				$.ajax({
						'type': 'post',
						'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
						'url': ___url,
						'dataType': 'json',
						'data': ___urlParams,
						'success': function (data) {
							if(data && data.status){	
								___beforefn && ___beforefn(data);	
								var oldData = data;
								var data = data.content.echartsData;
								
								var eData = ___echartsOldData.content.echartsData;

								if(___eType === 'line'){
									if(eData.time[eData.time.length - 1] == data.time[0]){//最新点数据跟就数据相同时不做处理
										return;
									}
									if(!___zeroFlag){//非从零点开始的必须移除最前的那个时间点
										eData.time.shift();
									}									
									eData.time.push(data.time[0]);
									
									var seriesData = [];
									for(var i = 0; i < ___items.length; i++){
										if(!___zeroFlag){//非从零点开始的必须移除最前的那个数据点
											eData['line'+(i+1)] && eData['line'+(i+1)].shift();
										}										
										eData['line'+(i+1)] && eData['line'+(i+1)].push(data['line'+(i+1)][0]);
										
										var formateData = eData['line'+(i+1)] && eData['line'+(i+1)].map(function(item,index){
											if(!item || typeof Number(item).toFixed != "function") return item;
											return Number(item).toFixed(2);
										});
										seriesData.push({
										 	name: ___items[i],
											type: 'line',
											smooth: true,
											symbol: 'none',
											data: formateData,
											connectNulls: true
										});
									}
									
									___echartsObj && ___echartsObj.setOption({
										xAxis: [{data: eData.time,}],
										series: seriesData
									});
								}else if(___eType === 'linepool'){
									if(eData.time[eData.time.length - 1] == data.time[0]){//最新点数据跟就数据相同时不做处理
										return;
									}
									if(!___zeroFlag){//非从零点开始的必须移除最前的那个时间点
										eData.time.shift();
									}
									eData.time.push(data.time[0]);
									
									var seriesData = [];
									for(var i = 0; i < ___items.length; i++){
										if(!___zeroFlag){//非从零点开始的必须移除最前的那个数据点
											eData['line'+(i+1)] && eData['line'+(i+1)].shift();
										}
										eData['line'+(i+1)] && eData['line'+(i+1)].push(data['line'+(i+1)][0]);
										var formateData = eData['line'+(i+1)] && eData['line'+(i+1)].map(function(item,index){
											if(!item || typeof Number(item).toFixed != "function") return item;
											return Number(item).toFixed(2);
										});
										seriesData.push({
										 	name: ___items[i],
											type: 'line',
											smooth: true,
											symbol: 'none',
										    itemStyle: {
										    	normal: {
										    		areaStyle: {
										    			color: new app.echarts.graphic.LinearGradient(0,0,0,1,[{
										    				offset: 0, color: ___colors[i]
										    			},{
										    				offset: 1, color: 'transparent'
										    			}]),
										    			type: 'default'
										    		}
										    	}
										    },	
											data: formateData,
											connectNulls: true
										});
									}
									
									___echartsObj && ___echartsObj.setOption({
										xAxis: [{data: eData.time}],
										series: seriesData
									});
								}else if(___eType === 'bar'){
									var seriesData = [];
									
									for(var i = 0; i < ___items.length; i++){
										var formateData = data['line'+(i+1)] && data['line'+(i+1)].map(function(item,index){
											if(!item || typeof Number(item).toFixed != "function") return item;
											return Number(item).toFixed(2);
										});
										seriesData.push({
										 	name: ___items[i],
											type: 'bar',
											barGap: '0%',
											barWidth: ___barWidth,//柱子宽度
											data: formateData
										});
									}
									
									___echartsObj && ___echartsObj.setOption({
										xAxis: [{data: data.time}],
										series: seriesData
									});
								}else if(___eType === 'pie'){
									___echartsObj && ___echartsObj.setOption(deepClone(___optionConfig.pieOption));
									___echartsObj && ___echartsObj.setOption({
										series: [
											// {
										 //    	name: "xx",
										 //    	type: "pie",
										 //    	radius: "80%",
										 //    	data: [
										 //    	    {value:5, name:"其他"},
										 //    	    {value:8, name:"卡前置"},
										 //    	    {value:16, name:"互联网核心"},
										 //    	    {value:18, name:"网银互联"},
										 //    	    {value:25, name:"支付系统"},
										 //    	    {value:28, name:"核心系统"}
										 //    	],
										 //    	itemStyle: {
										 //    		emphasis: {
										 //    			shadowBlur: 10,
										 //    			shadowOffsetX: 0,
										 //    			shadowColor: 'rgba(0,0,0,.5)'
										 //    		}
										 //    	},
										 //    	hoverAnimation: true,
										 //    	label: {
										 //    		normal: {
										 //    			show: true,
										 //    			formatter: function(p){return p.percent.toFixed(2) + ' %';},
										 //    			textStyle:{
										 //    				color: '#fff'
										 //    			}
										 //    		}
										 //    	},
										 //    	clockwise: false,
										 //    	labelLine: {
										 //    		normal: {
										 //    			show: true,
										 //    			lineStyle: {
										 //    				color: '#fff',
										 //    			}
										 //    		}
										 //    	}
										 //    }
										]
									});
								}
								___succfn && ___succfn(oldData);//回调函数
							}	
						}
				});
			}

			/*销毁图表*/
			var dispose = function(){
				
				var interval = setInterval(function(){
					if(___timerId){
						___handler.clearInterval(___timerId);
						___timerId = null;
						clearInterval(interval);
						interval = null;
					}
				},10);
				
				___echartsObj && ___echartsObj.dispose && ___echartsObj.dispose();
				___echartsObj = null;
				
			}

			/*创建图表*/ 
			var start = function(){
				initData();   
			}

			/*缩放大小*/
			var resize=function(){
				___echartsObj.resize();
			}
			
			var updateUrlParams = function(urlParams){
				___urlParams = urlParams;
//				dispose();
				___handler.clearInterval(___timerId);
				___timerId = null;
				start();
			}

			//获得图表对象
			var getEchartsObj = function(){
				return ___echartsObj;		
			}
			
			//获得图表对象的jquery容器
			var getEchartsCtn = function(){
				return $echartsCtn;
				
			}
			
			//绑定联动
			var bindConnect = function(connectObj){
				var selfEchObj = ___echartsObj;
				var thatEchObj = connectObj.getEchartsObj();
				app.echarts.connect(selfEchObj, thatEchObj); 
			}
			
			//获取参数
			var getUrlParams = function(){
				return ___urlParams;
			}
			
			var changeItems = function(items){
				___items = items;
			}
			
			return {				
				/*绑定联动的日月周点击事件*/
				bindConnect: bindConnect,
				/*修改参数*/
				updateUrlParams: updateUrlParams,
				/*获取参数*/
				getUrlParams: getUrlParams,
				/*创建图表*/
				start: start,
				/*销毁图表*/
				dispose: dispose,
				/*缩放大小*/
				resize:resize,
				getEchartsCtn:getEchartsCtn,
				getEchartsObj:getEchartsObj,
				changeItems: changeItems
			}
		}

		return {
			drawEcharts: drawEcharts
		}

	});

})();