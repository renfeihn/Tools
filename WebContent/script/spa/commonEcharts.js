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
		
		/**
		 * echarts图表
		 * 参数: options (object): 所有参数都在这个对象里边
		 * options.handler (object): 页面处理器 
		 * options.$el (object): 上下文环境，一般为 $el
		 * options.pagePath (string) 例."app/appConfiger": 页面路径
		 * options.selectorObj (object) 例.{divID: callback, divID2: callback2}: 图表容器选择器及其回调函数		 
		 * options.urlParams (Array) 例.[{interval: int, time: int, key: value},{interval: int, time: int, key: value}]: 
		   给后台的参数，个数跟selectorObj的容器个数相同，并且每个对象中都必须包含
		   interval(数据统计的时间间隔)和time(获取历史数据的时间段)
		   新增rotate表示柱状图很坐标标识的旋转角度，barWidth表示柱状图中柱的宽度
		   formatData是否格式化数据，true的话所有数据保留两位，默认false
		 * options.isRefresh (boolean): 是否动态刷新echarts数据，默认为刷新
		 * options.refreshTime (int): 刷新数据的频率，单位分钟
		 * options.succfn (function) 例.function(data){}: 成功回调函数
		 * */
		var commonEcharts = function(options){
			var _handler = options.handler;
			var _$el = options.$el;
			var _pagePath = options.pagePath;
			var _selectorObj = options.selectorObj;
			var _urlParams = options.urlParams;
			var _isRefresh = options.isRefresh || true;
			var _refreshTime = options.refreshTime || 1;//默认一分钟刷新一次

			var _echartsMap = new Object();//保存所有echarts实例
			var _selectorArr = Object.keys(_selectorObj);//容器ID数组

			var dtd = $.Deferred();

			var _echartsConfigs;//保存页面所有echarts的配置信息
			//通过pagePath获取页面初始配置信息
			function getPageData(){
				$.ajax({
					type: "POST",
					url: "EchartsManageAction_getEchartsPage.do",
					data: {
						"path": _pagePath
					},
					dataType: "json",
					success: function(data){
						if(!data.status){
							app.alert(data.errorMsg);
							return;
						}

						if(data.content.echartsPage.length == 0){
							return;
						}

						_echartsConfigs = data.content.echartsPage;//页面配置信息

						//循环获取echarts的Option
						for(var i = 0; i < _echartsConfigs.length; i++){
							var temp = _echartsConfigs[i];
							getEchartsOption(temp.seqno, temp.eid, temp.etypeId, _urlParams[temp.seqno]);
						}

						//全部echarts图表加载完时，启动延时对象
						var timer = setInterval(function() {
							if (Object.keys(_echartsMap).length == _selectorArr.length && API) {
								dtd.resolve(API);
								clearInterval(timer);
								timer = null;
							} 
						}, 200);
					}
				});
			}

			//根据eid，etypeId获取对应的option配置信息及指标数据
			function getEchartsOption(seqno, eid, etypeId, params){
				$.ajax({
					type: "POST",
					url: "EchartsManageAction_getEchartsConfig.do",
					data: {
						"instanceId": eid,
						"styleId": etypeId,
						"params": JSON.stringify(params)
					},
					dataType: "json",
					success: function(data){
						if(!data.status){
							app.alert(data.errorMsg);
							return;
						}
						if($.isEmptyObject(data.content.echartsStyle) || data.content.echartsInstance.length == 0
							|| $.isEmptyObject(data.content.echartsData)){
							return;
						}
						if($('#' + _selectorArr[seqno], _$el).length == 0){
							return;
						}

						/*****组合数据，生成echarts配置所需的option  start******/
						var eData = data.content.echartsData;
						var eInstance = data.content.echartsInstance;
						var option = data.content.echartsStyle;
						var colors = option.color;
						option.title.text = "单位: " + eInstance[0].unit;//添加图表单位
						option.xAxis[0].data = eData.time;//添加图表时间轴	
						
						if(eInstance[0].unit == "%"){//单位为%时，y轴最大值设为100
							option.yAxis[0].max = 100;
						}
						
						var itemData = new Array();
						var seriesData = new Array();
						
						var items = eData.items;//指标名称集合
						
						if(_urlParams[seqno].formatData){//格式化数据
							for(var i = 0; i < items.length; i++){
								eData["line" + (i+1)] = eData["line"+(i+1)].map(function(item,index){
									var item = Number(item);
									return item.toFixed(2);
								});
							}
						}
						
						switch(eInstance[0].eType){
							case "line":
								getLineData(eData, items, seriesData, itemData);
								break;
							case "linepool":
								getLinepoolData(eData, items, colors, seriesData, itemData);
								break;
							case "bar":
								if(_urlParams[seqno].rotate){
									option.xAxis[0].axisLabel.rotate = _urlParams[seqno].rotate;
								}
								getBarData(seqno, eData, items, seriesData, itemData);
								break;
							case "pie":
								//getPieData();//暂未实现
						}	

						option.series = seriesData;
						option.legend.data = itemData;
						
						/*****组合数据，生成echarts配置所需的option  end******/

						//初始化echarts实例
						var echart = app.echarts.init($('#' + _selectorArr[seqno], _$el)[0]);

						//echarts线条样式
						var etype = eInstance[0].eType;						

						if(etype == "line" || etype == "linepool"){							
							var timeCout = option.xAxis[0].data.length;//X轴时间点个数

							option.xAxis[0].axisLabel.interval = function(index){//设置X轴标点显示间隔
								var num = Math.ceil(eData.time.length / (_urlParams[seqno].xCount || 5));
								var halfnum;
								if(timeCout % (_urlParams[seqno].xCount || 5) == 0 || timeCout % num == 1){
									halfnum = Math.floor(num / 2);
								}else{
									if(timeCout % num == 2){
										halfnum = 0;
									}else{
										halfnum = Math.floor(timeCout % num / 2);
									}
								}
										
								if(index == halfnum){
									return true;
								}else if((index - halfnum) % num == 0){
									return true;
								}		
							}
						} 

						echart.setOption(option);

						//调用回调函数
						var callback = _selectorObj[_selectorArr[seqno]];
						callback && callback(option);	

						_echartsMap[_selectorArr[seqno]] = echart;

						 if(_isRefresh){
						 	if(etype == "line" || etype == "linepool"){//拼接新点
						 		var timer = _handler.setInterval(function(){
						 			getEchartsRefresh(seqno, eid, params, option);
						 		}, _urlParams[seqno].interval*60*1000);
						 		echart.timer = timer;
						 	}else{//整个option更新
								var timer = _handler.setInterval(function(){
									getEchartsOptionRefresh(seqno, eid, etypeId, params, option);
								}, _urlParams[seqno].interval*60*1000);
								echart.timer = timer;
						 	}
						 }
					}
				});
			}
			
			//配置折线图数据
			function getLineData(eData, items, seriesData, itemData){
				for(var i = 0; i < items.length; i++){
					seriesData.push({
						name: items[i],
						type: "line",
						smooth: true,
						symbol: "none",
						data: eData["line" + (i+1)],
						connectNulls: true
					});
					
					itemData.push({
						name: items[i],
						textStyle: {
							fontSize: 12,
							color: '#2b2933',
							fontFamily: '微软雅黑'
						},
						icon: 'line'
					});
				}
			}
			
			//配置折线图(渐变色)数据
			function getLinepoolData(eData, items, colors, seriesData, itemData){
				for(var i = 0; i < items.length; i++){
					seriesData.push({
						name: items[i],
						type: 'line',
						smooth: true,
						symbol: 'none',
						itemStyle: {
						    normal: {
						    	areaStyle: {
						    		color: new app.echarts.graphic.LinearGradient(0,0,0,1,[{
						    			offset: 0, color: colors[i]
						    		},{
						    			offset: 1, color: 'transparent'
						    		}]),
						    		type: 'default'
						    	}
						    }
					    },	
						data: eData['line'+(i+1)],
						connectNulls: true
					});
					
					itemData.push({
						name: items[i],
						textStyle: {
							fontSize: 12,
							color: '#2b2933',
							fontFamily: '微软雅黑'
						},
						icon: 'line'
					});
				}
			}
			
			//配置柱状图信息
			function getBarData(seqno, eData, items, seriesData, itemData){
				for(var i = 0; i < items.length; i++){
					seriesData.push({
					 	name: items[i],
						type: 'bar',
						barGap: '0%',
						barWidth: _urlParams[seqno].barWidth || 25,//柱子宽度
						data: eData['line'+(i+1)],
						markPoint: {
							symbol: 'pin',
							symbolSize: 40,
							label: {
								normal: {
									show: true,
									position: 'inside',
								}
							},
							data: (function(data){
								var res = [];
								for(var i = 0; i < data.length; i++){
									res.push({
										value: data[i],
										xAxis: i,
										yAxis: data[i]
									});
								}
								return res;
							})(eData['line'+(i+1)])
						}
					});
					
					itemData.push({
						name: items[i],
						textStyle: {
							fontSize: 12,
							color: '#2b2933',
							fontFamily: '微软雅黑'
						},
						icon: 'bar'
					});
				}
			}
			
			//配置饼状图信息
			function getPieData(){
				 seriesData.push({
			     	name: "",
			     	type: "pie",
			     	radius: "78%",
			     	data: [
			     	    {value:5, name:"其他"},
			     	    {value:8, name:"卡前置"},
			     	    {value:16, name:"互联网核心"},
			     	    {value:18, name:"网银互联"},
			     	    {value:25, name:"支付系统"},
			     	    {value:28, name:"核心系统"}
			     	],
			     	itemStyle: {
			     		emphasis: {
			     			shadowBlur: 10,
			     			shadowOffsetX: 0,
			     			shadowColor: 'rgba(0,0,0,.5)'
			     		}
			     	},
			     	hoverAnimation: true,
			     	label: {
			     		normal: {
			     			show: true,
			     			formatter: function(p){return p.percent.toFixed(2) + ' %';},
			     			textStyle:{
			     				color: '#fff'
			     			}
			     		}
			     	},
			     	clockwise: false,
			     	labelLine: {
			     		normal: {
			     			show: true,
			     			lineStyle: {
			     				color: '#fff',
			     			}
			     		}
			     	}							    	
			     });
			}

			//刷新折线图数据
			function getEchartsRefresh(seqno, eid, params, option){
				$.ajax({
					type: "POST",
					url: "EchartsManageAction_getEchartsRefresh.do",
					data: {
						"instanceId": eid,
						"params": JSON.stringify(params)
					},
					dataType: "json",
					success: function(data){
						if(!data.status){
							app.alert(data.errorMsg);
							return;
						}
						if(data.content.echartsData && data.content.echartsData.time.length == 0){
							return;
						}
						if(data.content.echartsData.time[0] == option.xAxis[0].data[option.xAxis[0].data.length - 1]){//新点时间跟旧数据的最新点时间一样时，不做处理
							return;
						}

						var data = data.content.echartsData; //{time:[],line1:[],line2:[],...}

						var echart = _echartsMap[_selectorArr[seqno]];

						//更新时间轴
						option.xAxis[0].data.shift();
						option.xAxis[0].data.push(data.time[0]);
						if(_urlParams[seqno].formatData){//格式化数据
							for(var i = 0; i < option.series.length; i++){
								option.series[i].data.shift();
								option.series[i].data.push(Number(data["line" + (i+1)][0]).toFixed(2));
							}
						}else{
							for(var i = 0; i < option.series.length; i++){
								option.series[i].data.shift();
								option.series[i].data.push(data["line" + (i+1)][0]);
							}
						}						

						echart.setOption(option);

						var callback = _selectorObj[_selectorArr[seqno]];						
						callback && callback(option);
					}
				});
			}

			//刷新非折线图数据
			function getEchartsOptionRefresh(seqno, eid, etypeId, params, option){
				$.ajax({
					type: "POST",
					url: "EchartsManageAction_getEchartsConfig.do",
					data: {
						"instanceId": eid,
						"styleId": etypeId,
						"params": JSON.stringify(params)
					},
					dataType: "json",
					success: function(data){
						if(!data.status){
							app.alert(data.errorMsg);
							return;
						}
						if($.isEmptyObject(data.content.echartsStyle) || data.content.echartsInstance.length == 0
							|| $.isEmptyObject(data.content.echartsData)){
							return;
						}

						/*****更新option的数据  start******/
						var eData = data.content.echartsData;
						option.xAxis[0].data = eData.time;//添加图表时间轴
						
						if(_urlParams[seqno].formatData){//格式化数据						
							for(var i = 0; i < eData.items.length; i++){
								eData["line" + (i+1)] = eData["line"+(i+1)].map(function(item,index){
									var item = Number(item);
									return item.toFixed(2);
								});
							}
						}

						for(var i = 0; i < option.series.length; i++){
							option.series[i].data = eData["line" + (i+1)];
						}
						/*****更新option的数据  end******/

						//获取echarts实例
						var echart = _echartsMap[_selectorArr[seqno]];
						echart && echart.setOption(option);

						//调用回调函数
						var callback = _selectorObj[_selectorArr[seqno]];						
						callback && callback(option);							
					}
				});
			}

			getPageData();//自动初始化页面图表信息

			/*********向外部提供的接口 start**********/
			function dispose(){//销毁图表
				for(var i in _selectorArr){
					var echart = _echartsMap[_selectorArr[i]];
					_handler.clearInterval(echart.timer);
					echart.timer = null;

					echart.dispose();
					echart = null;
				}
			}

			function changeAllTime(time){//更改所有图表的时间段
				dispose();
				for(var i in _urlParams){
					_urlParams[i].time = time;
				}
				getPageData();//重新初始化数据
			}

			function changeTime(seqnos, time){//更改指定图表的时间段 (参数seqnos必须为数组)
				if(!(seqnos instanceof Array)){
					throw new Error("changeTime的第一个参数必须为数组");
				}
				for(var i in seqnos){
					if(_echartsMap[_selectorArr[seqnos[i]]]){
						var echart = _echartsMap[_selectorArr[seqnos[i]]];

						_handler.clearInterval(echart.timer);
						echart.timer = null;

						echart.dispose();
						echart = null;						

						_urlParams[seqnos[i]].time = time;

						getEchartsOption(seqnos[i], _echartsConfigs[seqnos[i]].eid, _echartsConfigs[seqnos[i]].etypeId, _urlParams[seqnos[i]]);
					}else{
						app.alert("序号: " + seqnos[i] + "不存在！");
					}
				}
			}

			function changeAllInterval(interval){//更改所有图表的时间间隔
				dispose();
				for(var i in _urlParams){
					_urlParams[i].interval = interval;
				}
				getPageData();//重新初始化数据
			}

			function changeInterval(seqnos, interval){//更改指定图表的时间间隔 (参数seqnos必须是为数组)
				if(!(seqnos instanceof Array)){
					throw new Error("changeInterval的第一个参数必须为数组");
				}
				for(var i in seqnos){
					if(_echartsMap[_selectorArr[seqnos[i]]]){
						var echart = _echartsMap[_selectorArr[seqnos[i]]];

						_handler.clearInterval(echart.timer);
						echart.timer = null;

						echart.dispose();
						echart = null;						

						_urlParams[seqnos[i]].interval = interval;

						getEchartsOption(seqnos[i], _echartsConfigs[seqnos[i]].eid, _echartsConfigs[seqnos[i]].etypeId, _urlParams[seqnos[i]]);
					}else{
						app.alert("序号: " + seqnos[i] + "不存在！");
					}
				}
			}
			
			function changeAllObjectId(objectIds){//更改所有对象id (参数objectIds必须为数组)
				if(!(objectIds instanceof Array)){
					throw new Error("changeAllObjectId的参数必须为数组");
				}
				dispose();
				for(var i in _urlParams){
					_urlParams[i].objectId = objectIds;
				}
				getPageData();//重新初始化数据				
			}
			
			function changeObjectId(seqnos, objectIds){//更改指定图表的对象id (参数seqnos和objectIds必须为数组)
				if(!(seqnos instanceof Array) || !(objectIds instanceof Array)){
					throw new Error("changeObjectId的参数必须都为数组");
				}
				for(var i in seqnos){
					if(_echartsMap[_selectorArr[seqnos[i]]]){
						var echart = _echartsMap[_selectorArr[seqnos[i]]];

						_handler.clearInterval(echart.timer);
						echart.timer = null;

						echart.dispose();
						echart = null;						

						_urlParams[seqnos[i]].objectId = objectIds;

						getEchartsOption(seqnos[i], _echartsConfigs[seqnos[i]].eid, _echartsConfigs[seqnos[i]].etypeId, _urlParams[seqnos[i]]);
					}else{
						app.alert("序号: " + seqnos[i] + "不存在！");
					}
				}
			}

			function bindConnect(connectArr){//绑定联动，connectArr为需要绑定联动的图表序号数组
				var echartsArr = [];
				for(var i in connectArr){
					var seqno = connectArr[i];
					if(_echartsMap[_selectorArr[seqno]]){
						echartsArr.push(_echartsMap[_selectorArr[seqno]]);
					}else{
						app.alert("序号: " + seqno + "不存在！");
						return;
					}					
				}
				app.echarts.connect(echartsArr);
			}

			function getEchartsObjs(){//获取echarts实例对象映射
				return _echartsMap;
			}

			var API = {
				dispose: dispose,
				changeAllTime: changeAllTime,
				changeTime: changeTime,
				changeAllInterval: changeAllInterval,
				changeInterval: changeInterval,
				changeAllObjectId: changeAllObjectId,
				changeObjectId: changeObjectId,
				bindConnect: bindConnect,
				getEchartsObjs: getEchartsObjs
			}

			return dtd.promise();
			/*********向外部提供的接口 end**********/
		}
		
		return {
			commonEcharts: commonEcharts
		}

	});

})();