/**
 * 统计echarts工具
 */
(function (undefined) {

	(function (factory) {
		"use strict";
		//amd module
		if(typeof define === "function" && define.amd) {
			define(["jquery", "echarts","echartsWordcloud"], factory);
		}
		//global
		else{
			factory();
		}

	})(function () {

			/**
			 * 外部方法 获取Option配置
			 * @param  {[type]} data 接口返回的result
			 * @param  {[type]} paramData   [description]
			 * @return {[type]}             [description]
			 */
			function getOption(data,paramData) {
				if(data && !$.isEmptyObject(data)){
					var resultData = data;
					if(resultData.aggs){
						if(paramData.typeValue == '数值百分比统计'){
							var echartsData = resultData.aggs?resultData.aggs.values:{};
						}else{
							var echartsData = resultData.aggs?resultData.aggs.buckets:[];
						}
						if(paramData && !$.isEmptyObject(paramData)){
							return __getOption(echartsData,paramData);
						}else{
							app.alert('配置数据不合理');
							return;
						}
					}else if(__isObject(resultData)){
						var tabledata = formatTableData(resultData);
						return __getOption(__sql_formatEchartsData(tabledata, paramData), paramData);
					}else if($.isArray(resultData)){
						var formatEchartsData = __sql_formatEchartsData(resultData, paramData);
						console.log(formatEchartsData)
						return __getOption(formatEchartsData, paramData);
					}
				}
			}

			/**
			 * 组织echartOption
			 * @param  {[type]} echartsData [description]
			 * @param  {[type]} paramData   [description]
			 * @return {[type]}             [description]
			 */
			function __getOption(echartsData,paramData) {
				if(paramData.echartsType != 'map' && !paramData.notRequireFormat){
					var data = __formatEchartsData(echartsData,paramData);
				}else{
					var data = echartsData;
				}
				var option;

				if(paramData.echartsType == 'line'){
					option = $.extend(true, {},echartsOption.commonOption,echartsOption['line']);
					var legend = [];
					var series = [];
					if(!data){
						// app.alert("无数据");
						return false;
					}
					for (var line in data.sData) {
					 	if (data.sData.hasOwnProperty(line)) {
					 		legend.push(line);
					 		series.push({
							 	name: line,
								type: 'line',
								smooth: true,
								symbol: 'none',
								data: data.sData[line]
							})
					 	}
					}

					var count = data.xline && data.xline.length;
					if(!count){
						// app.alert('无数据');
						return false;
					}else{
						option.xAxis[0].data = data.xline;
					}
					if(count > 200){
						var end = parseInt(500/count*100);
						option.dataZoom = [{
							type:'inside',
							end: end,
				        },{
							type:'slider',
			                show: true,
			                start: 0,
			                end: end,
			                right:0
				        }];
				        option.grid.y2 = 60;
					}
					option.series = series.concat();
					option.title.text = '单位: 次';
					option.legend.data = legend;
					return option;
				}else if(paramData.echartsType == 'linepool'){
					option = $.extend(true, {},echartsOption.commonOption,echartsOption['line']);
					var legend = [];
					var series = [];
					if(!data){
						// app.alert("无数据");
						return false;
					}
					for (var line in data.sData) {
					 	if (data.sData.hasOwnProperty(line)) {
					 		legend.push(line);
					 		series.push({
							 	name: line,
								type: 'line',
								smooth: true,
								symbol: 'none',
								data: data.sData[line],
								areaStyle:{
									normal:{
										opacity: 0.5
									}
								}
							})
					 	}
					}

					var count = data.xline && data.xline.length;
					if(!count){
						// app.alert('无数据');
						return false;
					}else{
						option.xAxis[0].data = data.xline;
					}
					if(count > 200){
						var end = parseInt(500/count*100);
						option.dataZoom = [{
							type:'inside',
							end: end,
				        },{
							type:'slider',
			                show: true,
			                start: 0,
			                end: end,
			                right:0
				        }];
				        option.grid.y2 = 60;
					}
					option.series = series.concat();
					option.title.text = '单位: 次';
					option.legend.data = legend;
					return option;
				}else if(paramData.echartsType == 'bar'){
					option = $.extend(true, {},echartsOption.commonOption,echartsOption['bar']);
					var legend = [];
					var series = [];
					if(!data){
						// app.alert("无数据");
						return false;
					}
					for (var line in data.sData) {
					 	if (data.sData.hasOwnProperty(line)) {
					 		legend.push(line);
						 	series.push({
							 	name: line,
							 	barMaxWidth: 20,
							 	smooth:true,
							 	barGap:'30%',
								type: 'bar',
								data: data.sData[line]
							})
					 	}
					}
					var count = legend.length * data.sData[line].length;
					var count = data.xline && data.xline.length;
					if(!count){
						// app.alert('无数据');
						var count = data.xline && data.xline.length;
					}else{
						option.xAxis[0].data = data.xline;
					}
					if(count > 50){
						var end = parseInt(50/count*100);
						option.dataZoom = [{
							type:'inside',
							end: end,
				        },{
							type:'slider',
			                show: true,
			                start: 0,
			                end: end,
			                right:0
				        }];
				        option.grid.y2 = 60;
					}
					
					option.series = series.concat();
					option.title.text = '单位: 次';
					option.legend.data = legend;
					return option;
				}else if(paramData.echartsType == 'bar2'){
					option = $.extend(true, {},echartsOption.commonOption,echartsOption['bar2']);
					var legend = [];
					var series = [];
					if(!data){
						// app.alert("无数据");
						return false;
					}
					for (var line in data.sData) {
					 	if (data.sData.hasOwnProperty(line)) {
					 		legend.push(line);
						 	series.push({
							 	name: line,
							 	barMaxWidth: 20,
							 	smooth:true,
							 	barGap:'30%',
								type: 'bar',
								data: data.sData[line]
							})
					 	}
					}
					var count = legend.length * data.sData[line].length;
					var count = data.xline && data.xline.length;
					if(!count){
						// app.alert('无数据');
						return false;
					}else{
						option.yAxis[0].data = data.xline;
					}
					if(count > 30){
						var end = parseInt(30/count*100);
						option.dataZoom = [{
							type:'inside',
							yAxisIndex: 0,
							end: end,
				        },{
							type:'slider',
			                show: true,
			                start: 0,
			                end: end,
			                yAxisIndex: 0,
			                right:0
				        }];
				        option.grid.x2 = 60;
					}
					
					option.series = series.concat();
					option.title.text = '单位: 次';
					option.legend.data = legend;
					return option;
				}else if(paramData.echartsType == 'scatter'){
					option = $.extend(true, {},echartsOption.commonOption,echartsOption['bar']);
					var legend = [];
					var series = [];
					if(!data){
						// app.alert("无数据");
						return false;
					}

					for (var item in data.sData) {
				 		legend.push(item);
				 		series.push({
				 			name: item,
						 	symbolSize: 20,
						 	data: data.sData[item],
						 	type: 'scatter'
						})
					}
			 		
					var count = data.xline && data.xline.length;
					if(!count){
						// app.alert('无数据');
						return false;
					}else{
						option.xAxis[0].data = data.xline;
					}
					if(count > 200){
						var end = parseInt(500/count*100);
						option.dataZoom = [{
			                show: true,
			                start: 0,
			                end: end
				        }];
				        option.grid.y2 = 60;
					}
					option.series = series.concat();
					option.title.text = '单位: 次';
					option.legend.data = legend;
					return option;
				}else if(paramData.echartsType == 'scatter2'){
					option = $.extend(true, {},echartsOption.commonOption,echartsOption['bar']);
					var legend = [];
					var series = [];
					if(!data){
						// app.alert("无数据");
						return false;
					}

					for (var item in data.sData) {
				 		legend.push(item);
				 		series.push({
				 			name: item,
						 	data: data.sData[item],
						 	type: 'scatter',
						 	symbolSize: function (data) {
						 	    return 10 + ( Math.sqrt(data[1])/100);
						 	}
						})
					}

					var count = data.xline && data.xline.length;
					if(!count){
						// app.alert('无数据');
						return false;
					}else{
						option.xAxis[0].data = data.xline;
					}
					if(count > 200){
						var end = parseInt(500/count*100);
						option.dataZoom = [{
			                show: true,
			                start: 0,
			                end: end
				        }];
				        option.grid.y2 = 60;
					}
					option.series = series.concat();
					option.title.text = '单位: 次';
					option.legend.data = legend;
					return option;
				}else if(paramData.echartsType == 'num'){
					option = $.extend(true, {},echartsOption.commonOption,echartsOption['num']);
					var legend = [];
					var series = [];
					if(!data){
						// app.alert("无数据");
						return false;
					}
					
			 		/*legend.push(paramData.fields[0]);*/
			 		series.push({
			 			name:'统计结果',
					 	type: 'wordCloud',
				 	    gridSize: 20,
				 	    sizeRange: [12, 20],
				 	    rotationRange: [0, 0],
				 	    shape: 'circle',
				 	    textStyle : {
	 	    				normal : {
	 	    					color : function() {
	 	    						return 'rgb('
	 	    								+ [ Math.round(Math.random() * 256),
	 	    										Math.round(Math.random() * 256),
	 	    										Math.round(Math.random() * 256) ]
	 	    										.join(',') + ')';
	 	    					}
	 	    				},
	 	    				emphasis : {
	 	    					
	 	    				}
	 	    			},
				 	    data:data.sData,
					})
					option.series = series.concat();
					option.title.text = '';
					option.legend.data = legend;
					return option;
				}else if(paramData.echartsType == 'pie'){
					option = $.extend(true, {},echartsOption.commonOption,echartsOption['pie']);
					var legend = [];
					var series = [];
					if(!data){
						// app.alert("无数据");
						return false;
					}
					data.sData.forEach(function (item) {
						legend.push(item.name)
					})

					option.series =[{
						name: paramData.fields[0],
			            type: 'pie',
			            radius : ['40%','60%'],
			            center: ['40%', '55%'],
			            minAngle: 10,
			            data:data.sData,
			            selectedMode: "single",
			            label: {
			            	show: true,
			            	formatter: '{b}\n{d}%'
			            },
					}]
					option.legend.orient = 'vertical';
					option.legend.data = legend;

					return option;
				}else if(paramData.echartsType == 'map'){
					$.ajax({
						url: 'script/lib/echarts/mapJSON/china.json',
						type: 'GET',
						dataType: 'json',
						async: false,
						success:function (chinaJson) {
							app.echarts.registerMap('china', chinaJson);
							option = {
								geo: {
									map: 'china',
							        roam: true,
							        label: {
							            normal: {
							                show: true,
							                textStyle: {
							                    color: 'rgba(0,0,0,0.4)'
							                }
							            }
							        },
							        itemStyle: {
							            normal:{
							                borderColor: 'rgba(0, 0, 0, 0.2)'
							            },
							            emphasis:{
							                areaColor: null,
							                shadowOffsetX: 0,
							                shadowOffsetY: 0,
							                shadowBlur: 20,
							                borderWidth: 0,
							                shadowColor: 'rgba(0, 0, 0, 0.5)'
							            }
							        },
							        zoom: 1.0
								},
								series: [{
									name: '弱',
									type: 'scatter',
									coordinateSystem: 'geo',
									symbolSize: 3,
									large: true,
									itemStyle: {
										normal: {
											shadowBlur: 5,
											shadowColor: 'rgba(3, 12, 197, 0.9)',
											color: 'rgba(3, 12, 197, 0.9)'
										}
									},
									data: []
								}]
							}
						}
					});
					return option;
				}
			}

			/**
			 * 格式化echarts数据(search)
			 * @param  {[type]} echartsData [description]
			 * @param  {[type]} paramData   [description]
			 * @return {[type]}             [description]
			 */
			function __formatEchartsData(echartsData,paramData) {
				if(!echartsData || echartsData.length == 0){
					return;
				}
				var xline;
				var data;
				if(paramData.typeValue == '数值百分比统计'){
					data = [];
					for (var d in echartsData) {
						if (echartsData.hasOwnProperty(d)) {
							data.push({
								name:d,
								value:echartsData[d]
							})
						}
					}

					return {sData:data};
				}

				if(paramData.echartsType == 'pie'){
					data = [];
					echartsData.forEach(function (item) {
						data.push({
							name:item.key,
							value:item.doc_count
						})
					})
					return {sData:data};
				}
				if(echartsData && echartsData.length>0){
					xline = [];
					data = {};
					echartsData.forEach(function (item) {
						var timeStarp = '';
						if(item.key_as_string){
							timeStarp = new Date(item.key_as_string).getTime();
//							xline.push(new Date(item.key_as_string).Format('yyyy-MM-dd hh:mm:ss'));
						}else{
							timeStarp = new Date(item.key).getTime();
//							xline.push(item.key);
						}
						timeStarp += 8 * 60 * 60 * 1000;
						
						if(paramData.typeValue == '时间分区统计'){
							xline = [item.from_as_string+' - '+item.to_as_string];
						} else if (paramData.typeValue == '数值分类统计') {
							xline.push(item.key)
						} else {
							xline.push(new Date(timeStarp).Format('yyyy-MM-dd hh:mm:ss'));
						}

						if(paramData.fields.length > 1){
							paramData.fields.map(function(elem) {
								if(data[elem]){
									data[elem].push(item[elem].value);
								}else{
									data[elem] = [item[elem].value];
								}
							})
						}else{
							if(paramData.statisticalMethods){
								if(data[paramData.fields[0]]){
									data[paramData.fields[0]].push(item[paramData.statisticalMethods].value);
								}else{
									data[paramData.fields[0]] = [item[paramData.statisticalMethods].value];
								}
							}else{
								if(data[paramData.fields[0]]){
									data[paramData.fields[0]].push(item.doc_count);
								}else{
									data[paramData.fields[0]] = [item.doc_count];
								}
							}
						}
						
					})
				}
				console.log(xline)
				return {xline:xline,sData:data};
			}

			/**
			 * 组织echarts数据(sqlSearch)
			 * @param  {[type]} sqlSearchDataParam [description]
			 * @return {[type]}               [description]
			 */
			function __sql_formatEchartsData(sqlSearchDataParam,paramData) {
				var sqlSearchData = $.extend(true, [], sqlSearchDataParam);
				sqlSearchData.forEach(function (item) {
					for (var i in item) {
						if (item.hasOwnProperty(i) && i != 'xlineName' && i != item.xlineName) {
							if(paramData.selectFields.indexOf(i) < 0){
								delete item[i]
							}
						}
					}
				})
				var xline;
				var data;
				if(sqlSearchData.length && sqlSearchData.length > 0){
					data = [];
					if(paramData.echartsType == 'pie' || paramData.echartsType == 'num'){
						sqlSearchData.forEach(function(item,index) {
							for (var i in item) {
								if (item.hasOwnProperty(i) && i != 'index' && i != 'xlineName' && i != item.xlineName) {
									if(item.xlineName){
										data.push({name:item[item.xlineName]+'@'+i,value:item[i]})
									}else{
										data.push({name:i,value:item[i]})
									}
								}
							}
						})
						return {sData:data};
					}else if(paramData.echartsType == 'scatter' || paramData.echartsType == 'scatter2'){
						xline = [];
						data = {};
						sqlSearchData.forEach(function(item,index) {
							var xPoint = item[item.xlineName] || '-';
							xline.push(xPoint);
							for (var i in item) {
								if (item.hasOwnProperty(i) && i != 'index' && i != 'xlineName' && i != item.xlineName) {
									if(data[i]){
										data[i].push([xPoint,item[i]]);
									}else{
										data[i] = [[xPoint,item[i]]];
									}
								}
							}
						})
						return {xline:xline,sData:data};
					}else{
						xline = [];
						data = {};
						sqlSearchData.forEach(function(item,index) {
							xline.push(item[item.xlineName]|| '-');
							for (var i in item) {
								if (item.hasOwnProperty(i) && i != 'index' && i != 'xlineName' && i != item.xlineName) {
									if(data[i]){
										data[i].push(item[i]);
									}else{
										data[i] = [item[i]];
									}
								}
							}
						})
						return {xline:xline,sData:data};
					}
					
				}
			}

			function __isObject(obj) {
				if(Object.prototype.toString.call(obj) == '[object Object]'){
					return true;
				}else{
					return false;
				}
			}

			/**
			 * 格式化表格数据
			 * @param  {[type]} sqlSearchData [description]
			 * @return {[type]}               [description]
			 */
			function formatTableData(sqlSearchData) {
				var formatSqlSearchData = [];
				for (var item in sqlSearchData) {
					var tmpObj={};
					if(__isObject(sqlSearchData[item])){
						var itemArr= item.split('^^^');
						if(!tmpObj[itemArr[0]]){
							tmpObj[itemArr[0]] = itemArr[1];
							tmpObj.xlineName = itemArr[0];
						}
						for (var itemC in sqlSearchData[item]) {
							if(__isObject(sqlSearchData[item][itemC])){
								var childObj = sqlSearchData[item][itemC];
								for (var i in childObj) {
									tmpObj[itemC+'@'+i] = childObj[i];
								}
							}else{
								tmpObj[itemC] = sqlSearchData[item][itemC];
							}
						}
						formatSqlSearchData.push(tmpObj);
					}else{
						for (var j in sqlSearchData) {
							tmpObj[j] = sqlSearchData[j];
						}
						formatSqlSearchData.push(tmpObj);

						return formatSqlSearchData;
					}
				}
				return formatSqlSearchData;
			}

			/**
			 * echarts配置
			 * @type {Object}
			 */
			var echartsOption = {
				commonOption:{
					color: ['#4cb2fa','#ff9140','#5265d7','#4c5797','#1aca92', '#3e456e'],
					tooltip: {
						trigger: 'axis',
						confine: true
					},
					title: {
						show: true,
						text: '',
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
						type: 'scroll'
					},
				},
				'line':{
					legend: {
						show: true,
						orient: 'horizontal',
						right: 8,
						top: '-2',
						icon: 'rect',
						itemHeight: 2,
					},
					grid: {
						borderWidth: 0,
						x: 30,
                        y: 25,
                        x2: 60,       
                        y2: 0,
                        containLabel :true 
					},
					toolbox: {
				        feature: {
				            dataZoom: {
				                yAxisIndex: 'none'
				            },
				            restore: {}
				        },
				        left: 90,
				        top: -5
				    },
					xAxis: [
						{
							show: true,
							type: 'category',
							boundaryGap: false,
							axisLabel: {
								show: true,
								margin: 6,
								align: 'center',
								textStyle: {
									color: '#5c5a66',
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
							offset: 0,
							axisLabel: {
								show: true,
								textStyle:{
									color: '#5c5a66',
									align: 'right',
								}
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
							splitNumber: 7
						}
					],
					series: []
				},
				'bar':{
					grid: {
						borderWidth: 0,
						x: 10,
                        y: 25,
                        x2: 10,       
                        y2: 0,
                        containLabel :true 
					},
					xAxis: [
						{
							show: true,
							type: 'category', 
							axisLine : {
								show: true,
								lineStyle : {
									color : '#929099',
								}
							},
							axisLabel:{
								show:true,
								textStyle:{
									color:"#5c5a66",
									align:"center"
								}
							},
							data: ['-']
						}
					],
					yAxis: [
						{
							type: 'value',
							offset: 0,
							axisLabel: {
								show: true,
								textStyle:{
									color: '#5c5a66',
									align: 'right',
								}
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
							splitNumber: 7
						}
					],
					series: []
				},
				'bar2':{
					grid: {
						borderWidth: 0,
						x: 10,
                        y: 25,
                        x2: 10,       
                        y2: 0,
                        containLabel :true 
					},
					yAxis: [
						{
							show: true,
							type: 'category', 
							offset:0,
							axisLine : {
								show: false,
								lineStyle : {
									color : '#929099',
								}
							},
							axisLabel:{
								show:true,
								textStyle:{
									color:"#5c5a66",
									align:"right"
								}
							},
							data: ['-']
						}
					],
					xAxis: [
						{
							type: 'value',
							offset:0,
							axisLabel: {
								show: true,
								textStyle:{
									color: '#5c5a66',
									align: 'center',
								},
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
							}
						}
					],
					series: []
				},
				'pie': {
					tooltip: {
				        trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)"
				    },
					series: []
				},
				'num': {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c}"
					},
					series: []
				}   
			}
		return {
			getOption:getOption,
			formatTableData:formatTableData
		};
	});

})();
