define(["jquery","handlebars"],function($,hb){
	var performInterval;
	var echartsInterval;
	var ePerform;
	var timeOutObj;
	var childTableIterval;
	return {
		load:function($el,scope,handler){
			var templates={};//模版
			// echarts参数
			var echartsUrlParam={
				statisticstype:'1',
				keyid: [scope.params.name],
				timeModel: 1
			};
			
			var echartsUrlParamTable = {
				statisticstype : 1,
				timeInterval: 5,
				startNumber: 0
			}
			// 预编译模板
			$('script[type="text/x-handlebars-template"]', $el).each(function (index, element) {
				var $this = $(this);
				templates[$this.attr('id')] = hb.compile($this.html());
			});

			getTotalData();//获取统计数据
			initEcharts();//初始化echarts

			$('#tableContent', $el).on('click', '#performName li', function(event) {
				var keyId = $(this).attr('item');
				var statisticstype = echartsUrlParamTable.statisticstype;
				var id = $(this).index();
				app.dispatcher.load({
				   title: '应用总览',
				   moduleId: 'logCollectTrafficMonitor',
				   section: 'appTotal',
				   id: id,
				   params: {
				       keyId: keyId,
				       statisticstype:statisticstype
				   },
				   context: $el
				});
			});

			$('#tableChildContent', $el).on('click', '#performName li', function(event) {
				var keyId = $(this).attr('item');
				var statisticstype = echartsUrlParamTable.statisticstype;
				var id = $(this).index();
				app.dispatcher.load({
				   title: '应用总览',
				   moduleId: 'logCollectTrafficMonitor',
				   section: 'appTotal',
				   id: id,
				   params: {
				       keyId: keyId,
				       statisticstype:'1'
				   },
				   context: $el
				});
			});
			
			function getEchartsData(){
				app.common.ajaxWithAfa({
					url:'LogStaticsAction_getMonInputStatics.do',
					data: echartsUrlParam
				}).done(function (data) {
					if(data.result && !$.isEmptyObject(data.result)){
						var series = [],xData = [],lineData  = [];
						data.result.all = data.result.all.splice(1,data.result.all.length - 2);
						if(xData.length == 0){
							for(var value of data.result["all"]){
								xData.push(new Date(value.recordtime).Format('hh:mm:ss'));
							}
						}

						// lineData.push({
						// 	name: 'all',
						// 	textStyle: {
						// 		fontSize: 12,
						// 		color: '#2b2933',
						// 		fontFamily: '微软雅黑'
						// 	},
						// 	icon: 'line'
						// })

						// var seriseDataTmp = [];
						// for(var value of data.result["all"]){
						// 	seriseDataTmp.push(value.dataips);
						// }
						
						// series.push({
						// 	name: 'all',
						// 	type: 'line',
						// 	smooth: true,
						// 	symbol: 'none',
						// 	data: seriseDataTmp,
						// 	markPoint: {
				        //         data: [
				        //             {type: 'max', name: '最大值'},
				        //             {type: 'min', name: '最小值'}
				        //         ]
				        //     }
						// });
						
						
						
						for(var item in data.result){
							if(item == 'all'){
								continue;
							}
							/*if(xData.length == 0){
								for(var value of data.result[item]){
									xData.push(new Date(value.recordtime).Format('hh:mm:ss'));
								}
							}*/
							lineData.push({
								name: item,
								textStyle: {
									fontSize: 12,
									color: '#2b2933',
									fontFamily: '微软雅黑'
								},
								icon: 'line'
							})

							var seriseData = [];
							for(var value of data.result[item]){
								seriseData.push(value.dataips);
							}
							series.push({
							 	name: item,
								type: 'line',
								smooth: true,
								symbol: 'none',
								data: seriseData,
								markPoint: {
					                data: [
					                    {type: 'max', name: '最大值'},
					                    {type: 'min', name: '最小值'}
					                ]
					            }
							});
						}
						var option = ePerform.getOption();
						option.xAxis[0].data = xData;
						option.series = series;
						option.legend[0].data = lineData;
						ePerform.setOption(option);
					}
				});
			}
			
			
			
			var GlobelIndex = 0,flagIndex = true;	//默认开始时 从第三个开始添加 时间
			var timer = handler.setInterval(function(){
				if(GlobelIndex >= 1){
					flagIndex = false;
				}
				getTableData(false,echartsUrlParamTable, $('#tableContent', $el));
				if(flagIndex){
					GlobelIndex ++ ;
				}
			},5000);
			
			function clear(){
				GlobelIndex = 0;
				flagIndex = true;
				getTableData(true, echartsUrlParamTable, $('#tableContent', $el));
				$(".logCollectTM-center>.logCollectTM-perform",$('#tableContent', $el)).remove();
				$(".logCollectTM-right>.logCollectTM-ul-Data",$('#tableContent', $el)).remove();
				$("#timeline", $('#tableContent', $el)).empty();
				$("#performName", $('#tableContent', $el)).empty();
				clearChild();
				timer && handler.clearInterval(timer);
				timer = handler.setInterval(function(){
					if(GlobelIndex >= 1){
						flagIndex = false;
					}
					getTableData(false,echartsUrlParamTable, $('#tableContent', $el));
					if(flagIndex){
						GlobelIndex ++ ;
					}
				},5000);
			}
			
			// $("#statisticstype",$el).on("change",function(){
			// 	var value = $(this).find("option:selected").attr("value");
			// 	echartsUrlParamTable.statisticstype = value;
			// 	clear();
			// 	echartsUrlParam.keyid = [];
			// 	initEcharts();
			// 	echartTimer && handler.clearInterval(echartTimer);
			// 	echartTimer = handler.setInterval(function(){
			// 		getEchartsData();
			// 		getTotalData()
			// 	},5000)
			// });
			// 筛选框事件
			$('#keyName', $el).on('keypress', function(event) {
				if(event.keyCode == 13){
					echartsUrlParam.queryStr = $(this).val();
					echartsUrlParamTable.queryStr = $(this).val();
					clear();
					echartsUrlParam.keyid = [scope.params.name];
					initEcharts();
					echartTimer && handler.clearInterval(echartTimer);
					echartTimer = handler.setInterval(function(){
						getEchartsData();
						getTotalData()
					},5000)
				}
			});
			
			getTableData(true, echartsUrlParamTable, $('#tableContent', $el));
			function getTableData(flag, echartsUrlParamTable, $parentel,url, callback){
				var requestUrl = 'LogStaticsAction_getMonInputByKeyIdsByAppid.do';
				var isShowInput = true;
				if(url){
					requestUrl = url;
					isShowInput = false;
				}else {
					echartsUrlParamTable.statisticstype = 2;
					echartsUrlParamTable.singleKeyid = scope.params.id;
				}
				app.common.ajaxWithAfa({
					url:requestUrl,
					data: echartsUrlParamTable
				}).done(function (data) {
					var data = data.result;
					if($.isEmptyObject(data)){
						return;
					}
					unityData(data,flag, $parentel, isShowInput);
					var $performDetial = $('.logCollectTM-performDetial', $el);
					if(url){
						$performDetial.show();
						var tmpTop = $($performDetial[0]).position().top;
						$('#tableChildContentWapper', $el).css('top', tmpTop+'px').show();
						var height = $parentel.outerHeight(true);
						$performDetial.css('height',height+'px');
					}

					var $element = $('.logCollectTM-center', $parentel);
					var scrollLeft = $element.scrollLeft();
					var scrollWidth = $element[0].scrollWidth;
					var initWidth = $element.width();
					
					if(scrollLeft == 0 && scrollWidth >= initWidth){
						scrollLeft = scrollWidth;
					}
					var scrollSize = scrollWidth-initWidth;
					if(scrollLeft+21 >= scrollSize){
						$element.scrollLeft(scrollLeft+20);
					}

					callback && callback();
				});
			}
			
			//数据处理
			function unityData(data,flag,$parentObj,isShowInput){
				var performName = [],
					time = '',
					logCollectTMTime = [],
					logCollectTMData = [];
					console.log(data);
				for(var key in data){
					//获取到当前所有的系统
					data[key].keyname && performName.push(data[key].keyname);
					time = data[key].ips ? new Date(data[key].ips[0]["recordtime"]).Format('hh:mm:ss') : "";
					var obj = {
						'keyname': data[key].keyname,
						'dataips': data[key].ips ? data[key].ips[0]["dataips"] : ""
					};
					var dataObj = {
						'keyname': data[key].keyname,
						'dataips': data[key].dataips,
						'datasize': data[key].datasize
					}
					logCollectTMTime.push(obj);
					logCollectTMData.push(dataObj);
				}

				setPerformListHTML(performName,flag, $parentObj,isShowInput);
				setTimeLine(time, $parentObj);
				setlogCollectTMTimeHHH(logCollectTMTime, $parentObj);
				setlogCollectTMHTMLData(logCollectTMData, $parentObj);
			}
			
			//设置采集速率和采集量
			function setlogCollectTMHTMLData(logCollectTMData, $el){
				var logCollectTMCenter = $(".logCollectTM-right>.logCollectTM-ul-Data",$el);
				for(var i = 0 ; i < logCollectTMCenter.length ; i ++ ){
					var dataID = $(logCollectTMCenter[i]).attr("data-id");
					for(var value of logCollectTMData){
						if(value.keyname == dataID){
							setLogData($(logCollectTMCenter[i]),value);
							break;
						}
					}
				}
			}
			
			function setLogData(obj,data){
				obj.find("span:nth-child(1)").text(data.dataips||'0.00');
				obj.find("span:nth-child(2)").text(data.datasize?(data.datasize/1024).toFixed(2):'0.00');
			}
			
			//设置当前系统的动态图
			function setlogCollectTMTimeHHH(logCollectTMTime, $el){
				var logCollectTMCenter = $(".logCollectTM-center>.logCollectTM-perform",$el);
				for(var i = 0 ; i < logCollectTMCenter.length ; i ++ ){
					var dataID = $(logCollectTMCenter[i]).attr("data-id");
					for(var value of logCollectTMTime){
						if(value.keyname == dataID){
							setProgress($(logCollectTMCenter[i]),parseInt(value.dataips));
							break;
						}
					}
				}
			}
			function setProgress(obj,data){
				var className = '';
				if(data === 0){
					className = 'level0';
				}else if(data <= 30){
					className = 'level100';
				}else if(data <= 100){
					className = 'level500';
				}else if(data <= 500){
					className = 'level2000';
				}else if(data <= 1000){
					className = 'level100';
				}else if(data <= 2000){
					className = 'level10000-1';
				}else if(data > 2000) {
					className = 'levelhigh';
				}
				obj.append('<li><span class="'+className+'"></span></li>');
			}
			
			//设置timeline
			function setTimeLine(time,$el){
				if(flagIndex){
					$("#timeline",$el).append("<span></span>");
				}else{
					var lastlogCollectTMTime = $("#timeline>span.logCollectTM-time:last",$el).index();
					var lastSpan = $("#timeline>span:last",$el).index();
					if(lastSpan == 1){
						$("#timeline",$el).append('<span class="logCollectTM-time" beforeContent="'+time+'"></span>');
					}else if(lastSpan - lastlogCollectTMTime < 5){
						$("#timeline",$el).append("<span></span>");
					}else{
						$("#timeline",$el).append('<span class="logCollectTM-time" beforeContent="'+time+'"></span>');
					}
				}
				//查到当前最后一个 类为logCollectTM-time的span,查到当前最后一个span的index相减 小于5 添加不显示时间，若大于等于5 则 添加显示时间
			}
			
			//设置左侧的系统名称
			function setPerformListHTML(performName,flag, $el, isShowInput) {
				if(performName.length == 0){
					return;
				}
				var html = '',performListHTML = '',speadAndCountHTML = '';
				for(var i = 0 ; i < performName.length ; i ++ ){
					if(flag){
						html += '<li item="'+performName[i]+'" title="'+performName[i]+'">\
									<span style="visibility:'+(isShowInput?'visiable':'hidden')+';"><input type="checkbox"></span>\
									<span>'+performName[i]+'</span>\
								</li>';
					
						performListHTML += '<ul class="logCollectTM-perform" data-id="'+performName[i]+'"></ul>';
						speadAndCountHTML += '<ul class="logCollectTM-ul logCollectTM-ul-Data" data-id="'+performName[i]+'">\
													<li>\
														<span>321</span>\
														<span>321</span>\
													</li>\
												</ul>';
					}
				}
				
				if(flag){
					$("#performName",$el).html(html);
					$(".logCollectTM-center",$el).append(performListHTML);
					$(".logCollectTM-right",$el).append(speadAndCountHTML);
				}
			}
			$("#performName",$('#tableContent', $el)).on("click","input[type='checkbox']",function(e){
				e.stopPropagation();
			});
			$("#performName",$('#tableContent', $el)).on("change","input[type='checkbox']",function(e){
				var keyID = [scope.params.name];
				$("#performName input[type='checkbox']:checked",$('#tableContent', $el)).each((index,item) => {
					var keyId = $($(item).parent().siblings()[0]).text();
					keyID.push(keyId);
				});
				echartsUrlParam.keyid=keyID;
				initEcharts();
				echartTimer && handler.clearInterval(echartTimer);
				echartTimer = handler.setInterval(function(){
					getEchartsData();
					getTotalData()
				},5000)
				e.stopPropagation();
			});

			/**
			 * 初始化echarts
			 * @type {[type]}
			 */
			
			function initEcharts() {
				ePerform && ePerform.dispose();
				ePerform = app.echarts.init($('#ePerform', $el)[0]);
				var option = {
					color: ['#5b62f9', '#fb8229', '#fa594d', '#0bbf46', '#3e7ad6'],
					title: {
						show: true,
						text: '单位: kb/s',
						left: 34,
						top: 15,
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
						top: 15
					},
					grid: {
						borderWidth: 0,
						x: 10,
                        y: 50,
                        x2: 30,       
                        y2: 50,
                        containLabel :true
					},
					tooltip: {
						trigger: 'axis',
						confine:true
					},
					dataZoom:[{
		                start: 0,
		                end: 100,
		                bottom: 10
			        }],
					xAxis: [
						{
							show: true,
							type: 'category',
							boundaryGap: false,
							axisLabel: {
								show: true,
								margin: 6,
								textStyle: {
									color: '#5c5a66'
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
							data: []
						}
					],
					yAxis: [
						{
							type: 'value',
							offset:0,
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
								show: true
							}
						}
					],
					series: []
				}
				ePerform.setOption(option);
				getEchartsData();
			}
			
			$(".span-ePerform-time>span",$el).on("click",function(){
				var dataID = $(this).attr("data-id");
				$(".span-ePerform-time>span",$el).removeClass("active");
				$(this).addClass("active");
				echartsUrlParam.timeModel = dataID;
				getEchartsData();
			});
			
			
			var echartTimer = handler.setInterval(function(){
				getEchartsData();
				getTotalData()
			},5000)
			
			$(".span-ePerform-time>span:last",$el).trigger("click");

			/**
			 * 获取统计数据
			 * @return {undefined} 
			 */
			function getTotalData() {
				app.common.ajaxWithAfa({
					url: 'LogStaticsAction_logCollectionStaticsByAppID.do',
					data: {
						singleKeyid: scope.params.id
					}
				}).done(function (data) {
					if(data.result && !$.isEmptyObject(data.result)){
						for (var item in data.result) {
							var val = data.result[item];
							if(val != undefined && val !== ''){
								if(item == 'logDataToTalSize'){
									if(val > 1048576){
										$('#'+item, $el).text((val/1048576).toFixed(2));
										$('#'+item, $el).attr('afterContent','GB');
									}else if(val > 1024){
										$('#'+item, $el).text((val/1024).toFixed(2));
										$('#'+item, $el).attr('afterContent','MB');
									}else{
										$('#'+item, $el).text(val);
										$('#'+item, $el).attr('afterContent','KB');
									}
								}else if(item == 'currentLogDataIps'){
									$('#'+item, $el).text((val/1).toFixed(2));
								}else{
									$('#'+item, $el).text(val);
								}
							}
						}
					}
				});
			}

			$('#tableContent', $el).on('click', '.logCollectTM-perform', function(event) {
				var len = $(this).next('.logCollectTM-performDetial').length;
				if(echartsUrlParamTable.statisticstype == 2 && len == 0){
					clearChild();
					var strHtml = '<div class="logCollectTM-performDetial" style=""></div>';
					$(this).after(strHtml);
					var index = $(this).index();
					$('#performName>li', $('#tableContent', $el)).eq(index-1).after(strHtml);
					$('.logCollectTM-right>ul', $('#tableContent', $el)).eq(index).after(strHtml);

					var urlParam = $.extend(true, {}, echartsUrlParamTable)
					urlParam.appName = $(this).attr('data-id');
					var offsetWidth = ($('li', $(this)).length-1) * 20;
					getTableData(true, urlParam, $('#tableChildContent', $el),'LogStaticsAction_getMonInputByApp.do', function(){
						$('#tableChildContent', $el).find('ul.logCollectTM-perform[data-id]').css('padding-left', offsetWidth + 'px');
					});
					childTableIterval = handler.setInterval(function() {
						getTableData(false, urlParam, $('#tableChildContent', $el),'LogStaticsAction_getMonInputByApp.do');

					}, 5000)
				}
				if($('#tableChildContentWapper', $el).css('display') == 'block'){
					clearChild();
				}
			});

			// $('#tableChildContent', $el).on('click', '.logCollectTM-tableChildContentClose', function(event) {
			// 	clearChild();
			// });
			
			function clearChild() {
				childTableIterval && handler.clearInterval(childTableIterval);
				var $Obj = $('#tableChildContentWapper', $el);
				$Obj.hide();
				$(".logCollectTM-center>.logCollectTM-perform",$Obj).remove();
				$(".logCollectTM-right>.logCollectTM-ul-Data",$Obj).remove();
				$("#timeline", $Obj).empty();
				$("#performName", $Obj).empty();

				$('.logCollectTM-performDetial',$el).remove();
			}

			// 视图选择
			$('.logCollectTrafficMonitor-radio', $el).on('click', 'span', function(){
				$(this).addClass('active').siblings().removeClass('active')
				var value = $(this).attr('value');
				echartsUrlParamTable.statisticstype = value;
				clear();
				echartsUrlParam.keyid =  [scope.params.name];
				initEcharts();
				echartTimer && handler.clearInterval(echartTimer);
				echartTimer = handler.setInterval(function(){
					getEchartsData();
					getTotalData()
				},5000)
			})

			// 排序
			$('#sort', $el).change(function(){
				var value = $(this).val();
				if(value){
					echartsUrlParamTable.topSize = 10;
					echartsUrlParamTable.sortType = 1;
					echartsUrlParamTable.orderField = value;
				}else{
					delete echartsUrlParamTable.topSize;
					delete echartsUrlParamTable.sortType;
					delete echartsUrlParamTable.orderField;
				}
				clear();
				echartsUrlParam.keyid =  [scope.params.name];
				initEcharts();
				echartTimer && handler.clearInterval(echartTimer);
				echartTimer = handler.setInterval(function(){
					getEchartsData();
					getTotalData()
				},5000)
			})


			// 同步滚动
			$('#scollMainTarget', $el).scroll(function(){
				$('#scollChildTarget', $el).scrollLeft($(this).scrollLeft());
			})
		},
		
		unload:function(handler){
			performInterval && handler.clearInterval(performInterval);
			echartsInterval && handler.clearInterval(echartsInterval);
			timeOutObj && handler.clearTimeout(timeOutObj);
			childTableIterval && handler.clearInterval(childTableIterval);
			ePerform && ePerform.dispose();
		},
		
		pause:function($el,scope,handler){

		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});
