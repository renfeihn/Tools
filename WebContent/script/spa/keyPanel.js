/*
 *  
 *  2016/8/13 14:33 made by liuzhiyong
 */

!function($) {

	"use strict";
	var KeyPanel = function(element, options) {
		this.options = options;
		this.element = ''; 
		this.$element = $(element);
		this.echartObj = {};		// echart对象
		this.$kpDigCtn ={};
		this.eveChaOption = {};
		this.colorArray =  [ 
			                   '#13b1f5','#13b1f5','#3d7ad6', '#fa594d', '#ffa602', '#00a8c0',   
			                   '#ba55d3', '#0cbf47', '#cd5c5c', '#ff69b4', '#b8860b',   
			                   '#52e0b0', '#ff8454', '#8b78fd', '#00fa9a', '#ffd800', 
			                   '#6b8e23', '#ff00ff', '#3cb371', '#e8454a', '#30e0e0' 
			                  ];
	};

	KeyPanel.prototype = {
		constructor : KeyPanel,
		init : function() {
			var startTime = new Date().getTime();//测试性能的开始时间
			var that = this, 
				$elem = this.$element, 
				baseData = that.options.baseData;
			
				if (!$elem.children().length) {
					$.ajax({
						url:'./module/plugin/keyPanel.html',
						contentType:"application/x-www-form-urlencoded;charset=utf-8;",
						type:"POST",
						async:false,
						dataType:"html",
						success:function(data){
							 that.element = data;
							 $elem.append(data);
						}
					});
					
				// 如果elemCss存在则this.$element添加css
				$elem.addClass('kp-container').css(that.options.elemCss);
				that.$kpDigCtn = $('.kp-dig-ctn',$elem);	
				//生成标题和副标题
				that.$mainTitle = $('[data-role=mainTitle]',$elem);	
				that.$subTitle = $('[data-role=subTitle]',$elem);
				that.$chartCtn = $('[data-role=chartCtn]',$elem);
				that.options.title.mainTitle&& that.$mainTitle.text(that.options.title.mainTitle);
				that.options.title.subTitle&& that.$subTitle.text('——'+ that.options.title.subTitle);
				// 生成右侧信息面板
				for(var name in baseData){
					that['$'+name] =  $('[data-role='+name+']',$elem);	
					that['$'+name].text(baseData[name]); 
				}
				// 2.显示指标图表
				if (that.options.type == "key") {
					// 绘制echart图表
					that.createChart();
					// 监听start事件 
					that.$chartCtn.parent().on('start', function() {
						
						
						if(that.options.lineType=='area'){
							console.info("start");
							that.echartObj.getEchartsObj().setOption({tooltip : {
								trigger : 'axis',
								padding:0,
								backgroundColor:'rgba(255,255,255,0)',  
								formatter:function(params,ticket,callback){
									var legend = this.getOption().legend.data;
									that.$item1Value.text(params[0].data);   
									that.$item4Value.text(params[0].name);  
									var len =params.length;
									var liStr = '';
									var colorOption = that.colorArray;
									for(var i=0;i<len;i++){
										var data = params[i].data;
										var seriesName = params[i].seriesName;
										var index = legend.indexOf(seriesName);
										var color = colorOption[ (index + 1)%colorOption.length] ;  
										    liStr =liStr + '<li class="tooltip-li">'+
										            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
										            	'<span class="tooltip-name">'+that.options.baseData.item1Name+'</span>'+
										            	'<span class="tooltip-value">'+data+'</span>'+
									                '</li>';
									}
									return   '<div class="tooltipCtn">'+
									         '<div class="tooltip-title">'+params[0].name+'</div>'+
									         	'<ul class="tooltip-ul">'+liStr+'</ul>'+
									         '</div>'; }
							},
							series : [
							             {
							                 smooth:true,
							                 itemStyle: {normal: {areaStyle: {type: 'default'}}}
							                  
							             }
							             ] 
							});
						}else{
							that.echartObj.getEchartsObj().setOption({tooltip : {
								trigger : 'axis',
								padding:0,
								backgroundColor:'rgba(255,255,255,0)',  
								formatter:function(params,ticket,callback){
									var legend = this.getOption().legend.data;
									that.$item1Value.text(params[0].data);   
									that.$item4Value.text(params[0].name);  
									var len =params.length;
									var liStr = '';
									var colorOption = that.colorArray;
									for(var i=0;i<len;i++){
										var data = params[i].data;
										var seriesName = params[i].seriesName;
										var index = legend.indexOf(seriesName);
										var color = colorOption[ (index + 1)%colorOption.length] ;  
										    liStr =liStr + '<li class="tooltip-li">'+
										            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
										            	'<span class="tooltip-name">'+that.options.baseData.item1Name+'</span>'+
										            	'<span class="tooltip-value">'+data+'</span>'+
									                '</li>';
									}
									return   '<div class="tooltipCtn">'+
									         '<div class="tooltip-title">'+params[0].name+'</div>'+
									         	'<ul class="tooltip-ul">'+liStr+'</ul>'+
									         '</div>'; }
							}});
						}
						
						
						var echartObjIns = that.echartObj.getEchartsObj();
						var option = echartObjIns.getOption();
						var len = option.series[0].data.length;
						var latedata = option.series[0].data[len - 1];
						var time = option.xAxis[0].data[len - 1];
						that.$item1Value.text(latedata );
						that.$item4Value.text(time);  
					});  
					
					// 监听 dataloaded 事件
					that.$chartCtn.parent().on('dataloaded', function() {
						
						if(that.options.lineType=='area'){
							console.info("dataloaded");   
							that.echartObj.getEchartsObj().setOption({tooltip : {
								trigger : 'axis',
								padding:0,
								backgroundColor:'rgba(255,255,255,0)',  
								formatter:function(params,ticket,callback){
									var legend = this.getOption().legend.data;
									that.$item1Value.text(params[0].data);   
									that.$item4Value.text(params[0].name);  
									var len =params.length;
									var liStr = '';
									var colorOption = that.colorArray;
									for(var i=0;i<len;i++){
										var data = params[i].data;
										var seriesName = params[i].seriesName;
										var index = legend.indexOf(seriesName);
										var color = colorOption[ (index + 1)%colorOption.length] ;  
										    liStr =liStr + '<li class="tooltip-li">'+
										            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
										            	'<span class="tooltip-name">'+that.options.baseData.item1Name+'</span>'+
										            	'<span class="tooltip-value">'+data+'</span>'+
									                '</li>';
									}
									return   '<div class="tooltipCtn">'+
									         '<div class="tooltip-title">'+params[0].name+'</div>'+
									         	'<ul class="tooltip-ul">'+liStr+'</ul>'+
									         '</div>'; }
							},
							series : [
							             {
							                 smooth:true,
							                 itemStyle: {normal: {areaStyle: {type: 'default'}}}
							                  
							             }
							             ] 
							});
						}else{
							that.echartObj.getEchartsObj().setOption({tooltip : {
								trigger : 'axis',
								padding:0,
								backgroundColor:'rgba(255,255,255,0)',  
								formatter:function(params,ticket,callback){
									var legend = this.getOption().legend.data;
									that.$item1Value.text(params[0].data);   
									that.$item4Value.text(params[0].name);  
									var len =params.length;
									var liStr = '';
									var colorOption = that.colorArray;
									for(var i=0;i<len;i++){
										var data = params[i].data;
										var seriesName = params[i].seriesName;
										var index = legend.indexOf(seriesName);
										var color = colorOption[ (index + 1)%colorOption.length] ;  
										    liStr =liStr + '<li class="tooltip-li">'+
										            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
										            	'<span class="tooltip-name">'+that.options.baseData.item1Name+'</span>'+
										            	'<span class="tooltip-value">'+data+'</span>'+
									                '</li>';
									}
									return   '<div class="tooltipCtn">'+
									         '<div class="tooltip-title">'+params[0].name+'</div>'+
									         	'<ul class="tooltip-ul">'+liStr+'</ul>'+
									         '</div>'; }
							}});
						}
						
						
						var echartObjIns = that.echartObj.getEchartsObj();
						var option = echartObjIns.getOption();
						var len = option.series[0].data.length;
						var latedata = option.series[0].data[len - 1];
						var time = option.xAxis[0].data[len - 1];
						that.$item1Value.text(latedata );
						that.$item4Value.text(time);  
					});
				}
				// 初始化事件
				else if (that.options.type == "event") {  
					// 创建事件图表。
					that.createEventChart();
					that.$kpDigCtn.removeClass().addClass('kp-dig-eveCtn'); 
					that.$item1Name.removeClass().addClass('kp-dig-item-eveItem1Name');
					that.$item1Value.removeClass().addClass('kp-dig-item-eveItem1Value');
					that.$item4Name.removeClass().addClass('kp-dig-item-eveItem4Name');
					that.$item4Value.removeClass().addClass('kp-dig-item-eveItem4Value');  
					that.$item1Value.parent().removeClass().addClass('kp-dig-item-eveCtn1');
					that.$item4Value.parent().removeClass().addClass('kp-dig-item-eveCtn4');
					//删除第二和第三项的配置
					that.$item2Value.parent().remove();
					that.$item3Value.parent().remove();
				}

			}
			;
			var endTime = new Date().getTime();
			var usedTime = endTime - startTime;
			/*console.info("keyPanel用时:" + usedTime + '毫秒');*/
		},
		// 3.绘制指标echart图表
		createChart : function() {
			var that = this;
			if (that.options && that.options.chartOption) {
				that.echartObj = app.showData.chartsCollection(that.options.chartOption);//getEchartsObj
				that.echartObj.start();
				//设置tooltip    
		
					that.echartObj.getEchartsObj().setOption({tooltip : {
						trigger : 'axis',
						padding:0,
						backgroundColor:'rgba(255,255,255,0)',  
						formatter:function(params,ticket,callback){
							
							that.$item1Value.text(params[0].data);   
							that.$item4Value.text(params[0].name);  
							var len =params.length;
							var liStr = '';
							var colorOption = that.colorArray;
							for(var i=0;i<len;i++){  
								var data = params[i].data;
								var seriesName = params[i].seriesName;
								var color = colorOption[ (i + 1)%colorOption.length] ;
								    liStr = liStr + '<li class="tooltip-li">'+
								            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
								            	'<span class="tooltip-name">'+that.options.baseData.item1Name+'</span>'+
								            	'<span class="tooltip-value">'+data+'</span>'+
							                '</li>';  
							}
							return   '<div class="tooltipCtn">'+
							         '<div class="tooltip-title">'+params[0].name+'</div>'+
							         	'<ul class="tooltip-ul">'+liStr+'</ul>'+
							         '</div>'; }
					}});
					
			
				
				that.echartObj.addListener('hover', function(param) {
					that.$item1Value.text(param.value);
					that.$item4Value.text(param.name);
				});
			}
		},
		createEventChart : function() {  
			var that = this;
			var seriesName = "报警数";  
			var dataUrl = that.options.url || './EventAction_getEventData.do';
			    //测试代码start
			    if(that.options.event.type=="abs_load"){
			    	$('.kp-tip', that.$element).remove();
			    	seriesName = '当前均负荷';    
			    }
			    //测试代码end
			    that.echartObj = echarts.init(that.$chartCtn[0],echarts.config.skin.MACARONS);
			    that.eveChaOption = {
					grid : { 
						x : '35',
						y : '20',
						x2 : '10',
						y2 : '35',
						borderWidth : '0'
					},
					tooltip : {
						showDelay:20,
					    hideDelay:0,
						trigger : 'axis',
						padding:0,
						backgroundColor:'rgba(255,255,255,0)',  
						formatter:function(params,ticket,callback){
							that.$item1Value.text(params[0].data);   
							that.$item4Value.text(String(params[0].name).replace('时',":00"));  
							var len =params.length;
							var liStr = '';
							for(var i=0;i<len;i++){
								var data = params[i].data;
								var seriesName = params[i].seriesName;
								var color = params[i].series.itemStyle.normal.lineStyle.color||params[i].series.itemStyle.normal.color;
								    liStr = '<li class="tooltip-li">'+
								            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
								            	'<span class="tooltip-name">'+seriesName+'</span>'+
								            	'<span class="tooltip-value">'+data+'</span>'+
							                '</li>';
							}
							return   '<div class="tooltipCtn">'+
							         '<div class="tooltip-title">'+String(params[0].name).replace('时',":00")+'</div>'+
							         	'<ul class="tooltip-ul">'+liStr+'</ul>'+
							         '</div>'; 
						},
						axisPointer:{
						    type: 'line',
						    lineStyle: {
						        color: '#666',  
						        width: 1,
						        type: 'solid'
						    },
						    crossStyle: {
						        color: '#000',
						        width: 1, 
						        type: 'dashed'
						    },
						    shadowStyle: {
						        color: '000',
						        width: 'auto',
						        type: 'default'
						    }
						}     
					},  
					calculable : false,
					xAxis : [ {
						type : 'category',
						boundaryGap : false,
						data : ['-'],
						splitLine : {
							show : true,
							lineStyle : {
								color : [ '#f0f0f0' ],
								width : 1,
								type : 'solid'
							}
						},
						axisLine : {
							show : true,
							lineStyle : {
								color : '#dadada',
								width : 1,
								type : 'solid'
							}
						},  
						axisTick : {
							show : false
						}
					} ],
					yAxis : [ { 
						type : 'value',
						axisLabel : {
							formatter : '{value}'
						},
						splitLine : {
							show : true,
							lineStyle : {
								color : [ '#dadada' ],
								width : 1,
								type : 'solid'
							}
						},
						axisLine : {
							show : true,
							lineStyle : {
								color : '#dadada',
								width : 1,
								type : 'solid'
							}
						},
						axisTick : {
							show : false
						}
					} ],
					series : [
								{
									name : seriesName ,  
									symbol : "none",
									type : 'line',
									data : ['-'],
									smooth : true,
									itemStyle : {
										normal : {
											lineStyle : {
												width : 0,   
												color:'#32bcc7'
											},
											areaStyle : {
												type : 'default',
												color : 'rgba(39,213,227,0.6)' 
											}
										}
									},
									lineStyle : {
										width : 0
									}
								}
							  ]
				};
			
			function loadEventData() {
				
						$.ajax({
							'type' : 'post',
							'contentType' : 'application/x-www-form-urlencoded;charset=utf-8',
							'url' : dataUrl,
							'dataType' : 'json',
							'shelter' : '正在加载，请稍侯…',  
							'data' : {
								"event_type" : that.options.event.type,
								"app_id" : that.options.event.appId,
								"server_id" : that.options.event.serverId,
							},
							'success' : function(data) {
								if (data.status) {
									if (data.content.info) {
										var data = data.content.info;
										//每小时的事件统计数
										var eventCountHour = data.event_count_hour;
										var len = eventCountHour.length;
										//展示时间
										var showTime = data.show_time;
										
										if (len == 0) {
											that.$item1Value.text("暂无数据").css("fontSize", '16px');
											that.$item2Value.text("暂无数据");
											that.$item3Value.text("暂无数据");
											that.$item4Value.text("暂无数据");
											return;
										}
										
										that.echartObj.setOption({
											xAxis:[{data:showTime}],  
											series:[{data:eventCountHour}]   
										}); 
											that.$item1Value.text(eventCountHour[len-1]);
											var timeValue = String(showTime[len-1]).replace('时',':00');
										    that.$item4Value.text(timeValue);
									}
								} else {
									app.alert(data.errorMsg);
								}
							},
							'error' : function(xhr, status, errMsg) {
								app.alert('错误' + status, errMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
							}
						});  
			};     
			
			that.echartObj.setOption(that.eveChaOption);
			loadEventData();    
		},
		//更细插件数据
		refresh : function() {
			this.destroy();
			this.$element.keyPanel(this.options);
		},
		//销毁插件
		destroy : function() {
			this.$element.empty();
			this.$element.removeData('keypanel');
		},
		//绑定多图联动
		bindConnect:function($keyPanel){
			
			var that = this;/*that.echartObj.getEchartsObj()*/
			var thisEchartObj = that.echartObj;		//获得本身的showdata对象
			var thatEchartObj = $keyPanel.data('keypanel').echartObj;
			thisEchartObj.bindConnect(thatEchartObj);
			thatEchartObj.bindConnect(thisEchartObj);     
		}
	};

	$.fn.keyPanel = function() {
		var option = arguments[0], args = arguments;
		return this.each(function() {
			var $this = $(this), 
			data = $this.data('keypanel'), 
			options = $.extend(true, {}, $.fn.keyPanel.defaults, $this.data(),typeof option === 'object' && option);
			if (!data) {
				$this.data('keypanel', (data = new KeyPanel(this, options)));
			}
			if (typeof option === 'string') {
				data[option](args[1]);
			} else {
				data.init();
			}
		});
	};

	$.fn.keyPanel.defaults = {
		elemCss : {},
		type : 'key',
		chartType:'',
		title : {
			'maiTitle' : '',
			'subTitle' : ''
		},
		baseData : {
			item1Name : '',
			item1Value : '',
			item2Name : '',
			item2Value : '',
			item3Name : '',
			item3Value : '',
			item4Name : '',
			item4Value : ''
		},
		chartOption : {
			$context : "",
			handler : "",
			selector : '[data-role=chartCtn]',
			updateTime : "",
			urlParams : {
				"radiodisplay" : "now|day|week|month"
			},
		},
		event : {
			type : "app", // 事件类型 app,server,all
			pageName : '',
			handler : "",
			serverId : '',
			appId : ''
		}
	};

	$.fn.keyPanel.Constructor = KeyPanel;

}(window.jQuery);
