/**
 * [公共方法]
 *
 * @param {[undefined]}
 *            undefined [确保undefined未被重定义]
 * @author lijiancheng@cfischina.com
 */
(/* <global> */
	function(undefined) {

		(function(factory) {
			"use strict";

			// amd module
			if ( typeof define === "function" && define.amd) {
				define(["jquery", "echarts"], factory);
			}
			// global
			else {
				factory();
			}

		})(function($, echarts) {
			"use strict";
			/**
			 * 公共echarts时间集
			 * timeArr=['30m','1h','2h']
			 */
			function echartTimeArr(timeArr,scaleId,params, context, handler, path, within, paramsArr,itemid, refresh, interval,refreshTime){
				var obj={
							'30m':{counttime:'30分钟',datacount:30},
							'1h':{counttime:'1小时',datacount:60},
							'2h':{counttime:'2小时',datacount:120},
							'3h':{counttime:'3小时',datacount:180},
							'6h':{counttime:'6小时',datacount:360},
							'12h':{counttime:'12小时',datacount:720},
							'18h':{counttime:'18小时',datacount:1080},
							'24h':{counttime:'24小时',datacount:1440}
						};
				for(var i=0;i<timeArr.length;i++){
					var option_HTML = "<option value=\""+ obj[timeArr[i]].datacount +"\">"+ obj[timeArr[i]].counttime +"</option>";
		     		$("#"+scaleId,context).append(option_HTML);
				}
				
				var cache = {};
				 commonEcharts(params, context, handler, path, 30, paramsArr, "", refresh, interval,refreshTime).done(function(echarts){
			    	 for(var i in echarts){
			    		 cache[i] = echarts[i];
			    	 }
			     });
			     
				$("#"+scaleId,context).bind("change",function(){
					for(var i in cache){
						handler.clearInterval(cache[i].interval);
						cache[i].dispose();
						delete cache[i];
					}
					
					var count=$(this).children('option:selected').val();
				    return commonEcharts(params, context, handler, path, count, paramsArr, "", refresh, 1,refreshTime).done(function(echarts){
						for(var i=0, len=echarts.length; i < len; i++){
				    		 cache.push(echarts[i]);
				    	 }
					});;
				})
			}

			/**
			 *  公共Echarts，支持时间选择
			 *  @param {object} param
			 *  @example :
			 * 		commonEchartsScale({
			 * 			context : $el,					// 上下文环境
			 * 			handler : handler,				// handler处理器
			 * 			path : 'aa#bb#cc',				// 交易路径
			 * 			scaleId : 'xxx',				// 时间刻度渲染对象ID（可选）
			 * 			within : 60,					// 采样点个数（可选）
			 * 			interval : 1,					// 指定数据源统计频率，支持1,2,5,10,60分钟的统计频率
			 * 			refresh : true,					// 是否刷新
			 * 			echartsCfg : [{					// echarts 配置
			 * 				id : 'yyy',					// echarts对应div
			 * 				queryParam : {				// 获取echarts数据时的查询参数（可选）
			 * 					'agentname' : 'abc'
			 *                  'flag':false
			 * 				},
			 * 				success : function(data){	// echarts添加数据成功后执行的回掉函数（可选）
			 *
			 * 				}
			 * 			}]
			 * 		});
			 */
			var commonEchartsScale = function(param) {
				var context = param.context,
				    handler = param.handler,
				    path = param.path, // 交易路径
				    scaleId = param.scaleId,
				    timeArr=param.timeArr,  //时间力度['3h','6h','24h']
				    within = param.within,
				    refresh = param.refresh || false, // 是否刷新
				    echartsCfg = param.echartsCfg,
				    interval = param.interval || 1,// 间隔
				    refreshTime=param.refreshTime || 60*1000;
				
				// 入参检查
				var checkResult = checkParam();
				if(checkResult !== true){
					$.error('commonEchartsScale 入参异常，请检查！');
					return;
				}
				
				// 将参数转换为原始接口类型
				var params={},
					paramsArr=[];
				for(var i=0,len=echartsCfg.length;i<len;i++){
					var success = echartsCfg[i].success || function(data){};
						
					params[echartsCfg[i].id] = success;
					paramsArr.push(echartsCfg[i].queryParam);
				}
				
				// 不需时间刻度的情况
				if (!scaleId) {
					return commonEcharts(params, context, handler, path, within, paramsArr, "", refresh, interval,refreshTime);
				}else{
					echartTimeArr(timeArr,scaleId,params, context, handler, path, within, paramsArr, "", refresh, interval,refreshTime);
			  }
				
				// 入参检查
				function checkParam(){
					for(var i in [path, context, handler]){
						if(!i){
							return i;
						}
					}
						
					if(!echartsCfg || !(echartsCfg instanceof Object)){
						return echartsCfg;
					}
					
					return true;
				}

			};
			
			/**
			 * ajax请求查询时间下拉框
			 */
			/*function commonEchartsGetTime(timeArr){
				var dtd = $.Deferred();
				$.ajax({
					type : "post",
					url : 'EchartsAction_getAttr.do',
					data : {
						"timeArr" : JSON.stringify(timeArr),
					},
					dataType : "json",
					success : function(data) {
						var datas=data.content.list;
						dtd.resolve(datas);
					}
				});
				return dtd.promise();
			}*/
			
			/**
			 * 公共Echarts生成方法,并且定时刷新数据
			 * @param {Array} targetArr 生成echarts的div ID数组，数组内容为string
			 * @param {Object} $el context
			 * @param {Object} handler 当前模块的handler
			 * @param {string} pagePath 交易路径，以/分隔
			 * @param {int}    within 时间段
			 * @param {Array} queryParamsArr ajax查询参数数组，数组内容为{key:value}
			 * @param {interval} 指定数据源统计频率，支持1,2,5,10,60分钟的统计频率
			 */
			var commonEchartsRefresh = function(params, $el, handler, pagePath, within, queryParamsArr, interval) {
				var refreshTime=60000;
				var interval=1;
				return commonEcharts(params, $el, handler, pagePath, within, queryParamsArr, "", true, interval,refreshTime);
			};
			
			/**
			 * 公共Echarts生成方法
			 * @param {divID:callback,divID2:callback2} targetArr 生成echarts的div ID数组，数组内容为string
			 * @param {Object} $el context
			 * @param {Object} handler 当前模块的handler
			 * @param {string} pagePath 交易路径，以/分隔
			 * @param {int}    within 时间段
			 * @param {Array} queryParamsArr ajax查询参数数组，数组内容为{key:value}
			 * @param {string} itemid 指标id,如果有就送,没有就不送
			 * @param {boolean}  refresh 是否定时刷新数据
			 * @param {interval} 指定数据源统计频率，支持1,2,5,10,60分钟的统计频率
			 */
			var commonEcharts = function(paramsObj, $el, handler, pagePath, within, queryParamsArr, itemid, refresh, interval,refreshTime) {
				var CONSTANT = {
					ERROR_DATA : "后台返回数据异常",
					ERROR_CONF : "页面未配置Echarts"
				};
				var dtd = $.Deferred();
				var echartsMap = new Object();
				var refreshNum = 0;
				var paramObj = new Object();
				var targetArr = Object.keys(paramsObj);

				// 1. 获取echartsid
				var echartsids = undefined;
				$.ajax({
					type : "post",
					url : 'EchartsAction_getPageEcharts.do',
					data : {
						"page_path" : pagePath,
					},
					dataType : "json",
					success : function(data) {
						if (!data.status) {
							app.alert(data.errorMsg);
							return;
						}
						if (!data.content.list) {
							app.alert(CONSTANT.ERROR_DATA);
							return;
						}
						if (data.content.list.length == 0) {
							app.alert(CONSTANT.ERROR_CONF);
							return;
						}
						echartsids = data.content.list;
						//循环获取Option
						for (var i = 0; i < echartsids.length; i++) {
							var temp = echartsids[i];
							paramObj[temp['eid']] = temp['interval'];
							var seqno = temp.seqno;
							getEchartsOption(seqno, temp.eid, queryParamsArr[seqno], itemid, interval);
						}
						controller();
					}
				});
               
				// 2. 根据echartsid， 获取echarts配置数据option
				function getEchartsOption(seqno, echartsid, params, itemid, datainterval) {
					 echartsMap[targetArr[seqno]] = "";
					var echartFlag=true;
					var echartReq={};
					// if(params==undefined){
						// return;
					// }
					if(params!=undefined&&params.flag !=undefined){ //判断是否为时间轴
						echartFlag=params.flag;
						echartReq.agentname=params.agentname;
					}else{
						echartReq=params;
					}
					var data;
					if (itemid == undefined || itemid == "") {
						data = {
							"page_path" : pagePath,
							"echarts_id" : echartsid,
							"his_time" : within,
							"req" : JSON.stringify(echartReq),
							"interval" : datainterval,
							"flag":echartFlag
						};
					} else {
						data = {
							"echarts_id" : echartsid,
							"his_time" : within,
							"tid" : itemid,
							"req" :  JSON.stringify(echartReq),
							"interval" : datainterval,
							"flag":echartFlag
						};
					}
					$.ajax({
						type : "post",
						url : 'EchartsAction_getEchartsOption.do',
						data : data,
						dataType : "json",
						timeout : 10000,
						error : function(request, status, err) {
							if (status == "timeout") {
								app.alert("查询数据超时，请稍后再试！");
							}
						},
						success : function(data) {
							
							if (!data.status) {
								app.alert(data.errorMsg);
								return;
							}
							if (!data.content.option) {
								app.alert(CONSTANT.ERROR_DATA);
								return;
							}

							if ($('#' + targetArr[seqno], $el).length == 0) {
								return;
							}
							//生成Echarts
							var echart = echarts.init($('#'+targetArr[seqno], $el)[0], echarts.config.skin.MACARONS);
							if(echartFlag){
								data.content.option.xAxis[0].axisLabel.interval = function(index, data) {
									var refnum = Math.ceil(refreshNum / targetArr.length);
									var interval_num = Math.floor(within / paramObj[echartsid]);
									for (var i = 0; i <= within / interval_num; i++) {
										if ((within - refnum % within) + interval_num * i == index || (within - refnum % within) - interval_num * i == index) {
											return true;
										}
									}
									return false;
								};
							}/*else{
								
								data.content.option.xAxis[0].axisLabel={
								show : true,
									margin : 3,
									rotate : 30,
								};
							data.content.option.xAxis[0].boundaryGap = 0.1;
							data.content.option.xAxis[0].type ='category';
							}*/
							echart.setOption(data.content.option);
							
							echartsMap[targetArr[seqno]] = (echart);
							
							//定时器刷新数据 getEchartsOption(seqno, echartsid, params, itemid, datainterval)
							if (refresh) {
								if(echartFlag){
									var interval = handler.setInterval(function() {
										refreshNum++;
										getEchartsRefresh(seqno, echartsid, JSON.stringify(echartReq), datainterval);
									}, refreshTime, false);
									echart.interval = interval;
								}else{
									var interval = handler.setInterval(function() {
										refreshNum++;
										getEchartsOptionRefresh(seqno, echartsid,JSON.stringify(echartReq), itemid, datainterval);
									}, refreshTime, false);
									echart.interval = interval;
								}
							}
						}
					});
				}
				
				/**
				 * 非时间轴刷新
				 */
				function getEchartsOptionRefresh(seqno, echartsid, params, itemid, datainterval){
					var data;
					if (itemid == undefined || itemid == "") {
						data = {
							"page_path" : pagePath,
							"echarts_id" : echartsid,
							"his_time" : within,
							"req" : params,
							"interval" : datainterval,
							"flag":false
						};
					} else {
						data = {
							"echarts_id" : echartsid,
							"his_time" : within,
							"tid" : itemid,
							"req" :  params,
							"interval" : datainterval,
							"flag":false
						};
					}
					$.ajax({
						type : "post",
						url : 'EchartsAction_getEchartsOption.do',
						data : data,
						dataType : "json",
						timeout : 10000,
						error : function(request, status, err) {
							if (status == "timeout") {
								app.alert("查询数据超时，请稍后再试！");
							}
						},
						success : function(data) {
							
							if (!data.status) {
								app.alert(data.errorMsg);
								return;
							}
							if (!data.content.option) {
								app.alert(CONSTANT.ERROR_DATA);
								return;
							}

							if ($('#' + targetArr[seqno], $el).length == 0) {
								return;
							}
							
							var echart = echartsMap[targetArr[seqno]];
							echart && echart.setOption(data.content.option);
						}
					})
				}

				// 2. 根据echartsid， 获取echarts刷新数据
				function getEchartsRefresh(seqno, echartsid, params, datainterval) {
					$.ajax({
						type : "post",
						url : 'EchartsAction_getEchartsRefresh.do',
						data : {
							"echarts_id" : echartsid,
							"req" : params,
							"interval" : datainterval
						},
						dataType : "json",
						timeout : 10000,
						error : function(request, status, err) {
							if (status == "timeout") {
								app.alert("查询数据超时，请稍后再试！");
							}
						},
						success : function(data) {
							if (!data.status) {
								app.alert(data.errorMsg);
								return;
							}
							if (!data.content.list) {
								app.alert(CONSTANT.ERROR_DATA);
								return;
							}
							if (data.content.list.length == 0) {
								app.alert(CONSTANT.ERROR_CONF);
								return;
							}
							var echart = echartsMap[targetArr[seqno]];
							var addlist = new Array();
							var templist = data.content.list;
							for (var i = 0; i < templist.length - 1; i++) {
								var alist = new Array();
								alist.push(i);
								alist.push(templist[i]);
								alist.push(false);
								alist.push(false);
								if (i == templist.length - 2) {
									alist.push(templist[templist.length - 1]);
								}
								addlist.push(alist);
							}
							echart && echart.addData(addlist);
							if (paramsObj && paramsObj[targetArr[seqno]]) {
								paramsObj[targetArr[seqno]](templist);
							}
						}
					});
				}

				function controller() {
					setTimeout(function() {
						if (Object.keys(echartsMap).length == targetArr.length) {
							dtd.resolve(echartsMap);
						} else {
							controller();
						}
					}, 200);
				}

				return dtd.promise();
			};
			return {
				commonEcharts : commonEcharts,
				commonEchartsRefresh : commonEchartsRefresh,
				commonEchartsScale : commonEchartsScale
			};

		});

	})();
