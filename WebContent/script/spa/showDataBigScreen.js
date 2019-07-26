/*!
 * Javascript library v3.0
 *
 */

/**
 * [指标数据图表展示]
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author 
 */
( /*<global>*/ function (undefined) {

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
		 * 
		 * selector：图表外部容器
		 * updateTime：数据更新时间间隔
		 * url：数据请求url
		 * initDynamicUrl：  动态点初始化获取历史数据
		 * urlParams:请求参数
		 * updateTime: 数据更新时间
		 * queryFlag： 查询类型（实时/历史/统计）
		 * */
		var chartsCollection = function(options){  
			var legendArr = [];  //获得legend的数组    
			var ___handler = options.handler,
			___$context = options.$context,
			___selector = options.selector,//图表容器
			___updateTime = options.updateTime,//数据更新时间间隔,默认两分钟
			___url = options.url !== undefined ? options.url : './BaseAction_setBaseData.do' ,//未设定默认
		    ___initDynamicUrl = options.initDynamicUrl !== undefined ? options.initDynamicUrl : './BaseAction_setRealTimeData.do' ,
		    ___margin = options.margin || {},
		    ___legend = options.legend||{},
			___urlParams = options.urlParams;//请求参数
			___urlParams['queryFlag'] = ___urlParams['queryFlag'] !== undefined ? ___urlParams['queryFlag'] : "1";//默认为实时;
			var ___radiodisplay = ___urlParams['radiodisplay'] !== undefined ? ___urlParams['radiodisplay'] : "";
			var ___initFlag = true;//是否为初始化，主要是选项按钮的初始化
			var ___echartsObj, ___intervalId;
			var ___connectObj = undefined; //联动对象
			var that = this;
			var colorArray =  [ 
			                   '#13b1f5','#13b1f5','#3d7ad6', '#fa594d', '#ffa602', '#00a8c0',   
			                   '#ba55d3', '#0cbf47', '#cd5c5c', '#ff69b4', '#b8860b',   
			                   '#52e0b0', '#ff8454', '#8b78fd', '#00fa9a', '#ffd800', 
			                   '#6b8e23', '#ff00ff', '#3cb371', '#e8454a', '#30e0e0' 
			                  ];

			
			//DIV
			//实时/日/周/月z-index: 490; 
			var changeStaticsTypeDIV = '<div data-role="changeStaticsTypeCtn" style="float: right;right: 5px;z-index:490;text-align: right;position: relative;" >_now__day__week__month_</div>'; 
			/*class=" bor-sta-type"*/  
			//常量，图表类型，根据数据库配置规定的值进行相应修改
			var ECHARTS_TYPE = {
					LINE: 'line',
					PIE: 'pie'
			};
			var STATE_STATIC ={
					STATIC:"01-2"
			}
			var STATE_DYNAMIC = {//动态点
					STATIC: '02',//固定图例
					DYNAMIC: '03',
					STATIC_2:'02-2',
					DYNAMIC_2:"03-2"
			};
			
			 //theme为可选的主题，内置主题（'macarons', 'infographic'）直接传入名称,可选参数值可查看echarts-all-2.2.7.min.js中的换肤定义每种皮肤
			 /*skin: {
	                BLUE: "blue",
	                DARK: "dark",
	                GRAY: "gray",
	                GREEN: "green",
	                HELIANTHUS: "helianthus",
	                INFOGRAPHIC: "infographic",
	                MACARONS: "macarons",
	                MACARONS2: "macarons2",
	                MINT: "mint",
	                RED: "red",
	                ROMA: "roma",
	                SAKURA: "sakura",
	                SHINE: "shine"
	            }*/
			var echarts_skin = echarts.config.skin.MACARONS;

			//普通的tooltip样式美化
			var setToolCommon = function(params,ticket,callback){
				var legend = legendArr;
				var len =params.length;
				var liStr = '';
				var colorOption = colorArray;
				for(var i=0;i<len;i++){
					var data = params[i].data;
					var seriesName = params[i].seriesName;
					var index = legend.indexOf(seriesName);
					var color = colorOption[ (index + 1)%colorOption.length] ;  
					liStr = liStr+'<li class="tooltip-li">'+
					            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
					            	'<span class="tooltip-name">'+seriesName+'</span>'+
					            	'<span class="tooltip-value">'+data+'</span>'+
				                '</li>';}
				return   '<div class="tooltipCtn">'+
				         '<div class="tooltip-title">'+params[0].name+'</div>'+
				         	'<ul class="tooltip-ul">'+liStr+'</ul>'+
				         '</div>'; };
				         
			//详细的tooltip样式美化 
			var setToolDtl = function (params,ticket,callback) {
				var legend = legendArr;
	            var res = '';
	            var colorOption = colorArray;
	            for (var i = 0, l = params.length; i < l; i++) {
	            	var data = params[i].data;  
					var seriesName = params[i].seriesName;
					var value = params[i].value;  
					var index = legend.indexOf(seriesName);
					var color = colorOption[ (index+1)%colorOption.length] ;
	            	if(params[i].data.tooltipValue){
	            		var ulStr ='<ul>';
	            		for(var j = 0,len = params[i].data.tooltipValue.length;j<len;j++){
	            			ulStr = ulStr+
	            			'<li>'+
	              	           '<span>'+params[i].data.tooltipValue[j][1]+':</span>'+
	              	           '<span>'+params[i].data.tooltipValue[j][0]+'</span>'+
	              	        '</li>'
	            		}
	            		 ulStr = ulStr +'</ul>';  
	            		res = res +'<li class="tooltip-li">'+
				            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
				            	'<span class="tooltip-name">'+seriesName+'</span>'+
				            	'<span class="tooltip-value">'+value+'</span>'+
				            	ulStr+  
                             '</li>';
	            	}else{
	            		res = res +'<li class="tooltip-li">'+
					            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
					            	'<span class="tooltip-name">'+seriesName+'</span>'+
					            	'<span class="tooltip-value">'+data+'</span>'+
	                           '</li>';
	            	}    
	              }; 
		           res = '<div class="tooltipCtn">'+
				         '<div class="tooltip-title">'+params[0].name+'</div>'+
				         	'<ul class="tooltip-ul">'+res+'</ul>'+
				         '</div>';   
	            setTimeout(function (){callback(ticket, res);}, 0);
	            return 'loading';
	        };
	        
			//echarts表格默认初始化参数，可查阅官网API，查找相应配置做修改
			var ___optionConfig = {
					/*xy颠倒折线图*/
					overturnLineOption:{
                        color:colorArray,
                       
						tooltip : {
							 showDelay:20,
							 hideDelay:0,
							 position : function(p) {
		                            // 位置回调
		                            // console.log && console.log(p);
		                            return [p[0] - 40, p[1] - 40];
		                        },  
							zlevel:1,
							z:1, 
							enterable:false, 
							trigger: 'axis',
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
							} ,
							padding:0,
							backgroundColor:'rgba(255,255,255,0)',  
							formatter:setToolCommon
						},
						grid: { // 控制图的大小，
                            x: ___margin.left||'35',
                            y:___margin.top||'20',
                            x2:___margin.right||'55',        
                            y2: ___margin.bottom||'35',     
                            borderWidth:'1'
						},
						legend: {
							show:true,
							x:___legend.x||"center",
							y: ___legend.y||'top',
							data:['-']
						},
						yAxis : [
						         {
						        	 type : 'category',
						        	 boundaryGap : true,
						        	 data : ['-'],
						        	 name:""
						         }
						         ],
						         xAxis : [
						                  {
						                	  type : 'value',
						                	  name:'',
						                	  max:'-',
						                	  
						                  }
						                  ],
						                  series : [
						                            {
						                            	name:'-',
						                            	type:'bar',
						                            	data:['-'],
						                            	symbol:"none",
						                            	barMaxWidth:20,
						                                itemStyle: {
						                                	normal: {
						                                    	/*barBorderColor:'#black',
						                                        barBorderWidth: .5*/
						                                    	/*color:'#13B1F5',*/
						                                    	barBorderRadius:0
						                                        }
						                                    }
						                            }
						                            ]
					},
					/*折线图*/
					lineOption: {
						title: {
							 subtext:'(单位： 笔)',
							 x:	35,
							 y:	-20,
							 subtextStyle:{
								 color:'#ffdc6f'
								 
							 }
						},
						grid : {
							x: '10%',
							y: '10%',
							x2: '0%',
							y2: '15%',
							borderWidth: 0
						},
					    tooltip : {
					        trigger: 'axis'
					    },
					    toolbox: {
					        show : false
					    },
					    calculable : true,
					    xAxis : [
					             {
					            type : 'category',
					            boundaryGap : false,
					            data : ['-'],
					            axisLine:{
						    		   //取消掉轴的标线(放什么轴就取消什么轴)
						    		   show:true
						    	   },
					            splitLine : {
									show : false,
									lineStyle : {
										color : [ '#265DFA' ],
										width : 1,
										type : 'dashed'
									}
								},
								 splitArea:{
						            	show:false,
						                   backgroundColor:'rgba(0,0,0,0)'
						              
						            },
								axisTick:{
									show: false	
								},
					        axisLabel :{
					        	textStyle:{
					        		/*color:'#265DFA',*/
					        		color:'#ffdc6f',//lzy add# 438CE6
					        		align:'right',
					        		fontSize:'14'
					        	} 
									
								}
					        }
					    ],
					    yAxis : [
					        {	
					        	 
					        	axisLine:{
						    		   //取消掉轴的标线(放什么轴就取消什么轴)
						    		   show:false
						    	   },
					            type : 'value',
					            splitLine : {
									show : true,
									lineStyle : {
										color : [ '#265DFA' ],
										width : 1 
									}
								},
								 splitArea:{
						            	show:false,
						                backgroundColor:'rgba(0,0,0,0)'
						              
						            },
								axisLabel :{
						        	textStyle:{
						        		/*color:'#265DFA',*/
						        		color:'#ffdc6f',//lzy add# 438CE6
						        		align:'right',
						        		fontSize:'14'
						        	} 
										
									}
					        }
					    ],
					    series : [  
					        {
					            name:'实时交易量',
					            type:'line',
					            stack: '总量',
					            itemStyle: {normal: {
					            	areaStyle: {type: 'default',color:'#6851D4'},
					            	lineStyle: {color: '#F01024',width:'2'}
					            	}},
					            data:['-'],
					            symbol:'none',  
					            smooth:true
					            }  
					    ]
					},
					/*饼状图*/
					pieOption:{
						color:colorArray,
						title : {
							text: '',
							textStyle: {
								fontSize: 15,
							    fontWeight: 'bolder'
							},
							x:'center'
						},   
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"  
						},
						legend: {
							orient : 'vertical',
							x : 'left',
							y: 'top',  
							data:['-']
						},
						toolbox: {
							show : true,
							orient: 'vertical',
							feature : {
								/*mark : {show: true},*/
								dataView : {show: true, readOnly: false},
								magicType : {
									show: true, 
									type: ['pie', 'funnel'],
									option: {
										funnel: {
											x: '25%',
											width: '50%',
											funnelAlign: 'left',
											max: 1548
										}
									}
								},
								restore : {show: true},
								saveAsImage : {show: true}
							}
						},
						series : [
						          {
						        	  name:'',
						        	  type:'pie',
						        	  radius : '45%',
						        	  center: ['50%', '60%'],
						        	  data:[{value:0, name:'-'}]
						          }
						         ]
					}
			};

			var $echartsCtn = $(___selector, ___$context);
			var $radioDiv = $echartsCtn.prev('[data-role="changeStaticsTypeCtn"]');
			/*初始化图表对象*/
			var initParams = function(){
				//初始化图表
				___echartsObj = echarts.init($echartsCtn[0], echarts_skin);//第二个参数theme为可选的主题，内置主题（'macarons', 'infographic'）直接传入名称
				if(___urlParams.showType === ECHARTS_TYPE.LINE){
					if((___urlParams.state !== STATE_DYNAMIC.STATIC || ___urlParams.state !== STATE_DYNAMIC.DYNAMIC) && ___urlParams['queryFlag']!=='1'){//非动态点添加
						___echartsObj.setOption(deepClone(___optionConfig.lineOption));
					}
				}else if(___urlParams.showType === ECHARTS_TYPE.PIE){
					___echartsObj.setOption(deepClone(___optionConfig.pieOption));
				}
				//初始化选择按钮，以及相关事件绑定，饼状图日周月切换选择
				if(___initFlag && ___urlParams.showType !== ECHARTS_TYPE.PIE){
					if($radioDiv){
						$radioDiv.remove();
					}
					___initFlag = false;
					var radioName = app.global.getUniqueId();
					var innerHTML = "";
					if(___radiodisplay === undefined||___radiodisplay===""){
						innerHTML = '';
					}else if(___radiodisplay === "all"){
						innerHTML = '<button type="button" class="kpi-change-btn blue"  value="realTime" name="_name_">实时</button><button type="button" class="kpi-change-btn" value="day" name="_name_">最近24小时</button><button type="button"  class="kpi-change-btn" value="week" name="_name_">最近七天</button><button type="button" class="kpi-change-btn" value="month" name="_name_">最近三十天</button>';
					}else{  
						if(___radiodisplay.indexOf("now")!==(-1)){
							innerHTML = innerHTML + '<button type="button"  class="kpi-change-btn" value="realTime" name="_name_">实时</button>';
						}
						if(___radiodisplay.indexOf("day")!==(-1)){
							innerHTML = innerHTML + '<button  type="button"  class="kpi-change-btn" value="day" name="_name_">日</button>';
						}
						if(___radiodisplay.indexOf("week")!==(-1)){
							innerHTML = innerHTML + '<button  type="button"  class="kpi-change-btn" value="week" name="_name_">周</button>';
						}  
						if(___radiodisplay.indexOf("month")!==(-1)){
							innerHTML = innerHTML + '<button  type="button"  class="kpi-change-btn" value="month" name="_name_">月</button>';
						}
					} 
					changeStaticsTypeDIV=changeStaticsTypeDIV.replace(/_now__day__week__month_/,innerHTML);
					$echartsCtn.before(changeStaticsTypeDIV.replace(/_name_/g, radioName));       
					//初始化选中单选框  
					if(___urlParams["queryFlag"] === '1'){
						$('[data-role=changeStaticsTypeCtn]>button[value=realTime]', $echartsCtn.parent()).addClass('blue').siblings().removeClass('blue');/*attr('checked', true);attention!*/
					}else{   
						___urlParams["count_type"] !== undefined && $('[data-role=changeStaticsTypeCtn]>button[value='+___urlParams["count_type"]+']', $echartsCtn.parent()).addClass('blue').siblings().removeClass('blue');
					}
					  
					$('[data-role=changeStaticsTypeCtn]', $echartsCtn.parent()).click(function(e){
						 var $elem=$(e.target||window.event.srcElement);  
						if($elem.length!=0&&$elem.attr('data-role')!='changeStaticsTypeCtn'){      
							$elem.addClass('blue').siblings().removeClass('blue');
							var type = $elem.attr('value'); 
							if(type === 'realTime'){  
								___urlParams["queryFlag"]  = '1';
								___urlParams["count_type"] !== undefined && delete ___urlParams["count_type"];
							}else if(type ===  "day"){
								___urlParams["count_type"]  = type;
								___urlParams["queryFlag"]  = '2';
							}else{
								___urlParams["count_type"]  = type;
								___urlParams["queryFlag"]  = '3';
							}
							//更新echarts对象
							updateInnerUrlParams(___urlParams);
							$elem.trigger('changeStaticsClick');
						}
						
					});
				}
			}
			
			var initData = function(){
				if((___urlParams.state === STATE_DYNAMIC.STATIC && ___urlParams["queryFlag"] === '1') || (___urlParams.state === STATE_DYNAMIC.DYNAMIC && ___urlParams["queryFlag"] === '1')){//动态点需先获取历史数据，以初始化图表获取到历史数据
					$.ajax({
						'type': 'post',
						'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
						'url': ___initDynamicUrl,
						'dataType': 'json',
						'data': {"reqParams":JSON.stringify(___urlParams)},
						'success': function (data) {
							if (data && data.status) {
								var chartsData  = data.content.chartsData;
								var isEmyty = $.isEmptyObject(chartsData);
								    if(isEmyty){
								    	chartsData = {
									    	legend: ['实时交易量'],
									    	seriesData: [{ name:'实时交易量',
											            type:'line',
											            stack: '总量',
											            data:[],
											            symbol:'none',  
											            smooth:true}],
									    	showLegend: false,  
									    	xAxis: [],
									    	xAxisName: "汇报时间",
									    	yAxisName: "使用率(%)",
									    } ;
								    }
									
									//lzy 设置实时交易量的线条颜色
									if(chartsData.seriesData&&chartsData.seriesData.length>=0){
										var serDataLen = 10;
										var resDataLen = chartsData.seriesData[0].data.length;
										chartsData.seriesData[0].itemStyle = {normal: {areaStyle: {type: 'default',color:'rgba(80,125,255,0.8)'},lineStyle: {color:'#ffdc6f',//lzy add# 438CE6
							        		width:'2'}}};
										if(resDataLen<serDataLen){
											for(var i= 0,len = serDataLen - resDataLen;i<len;i++ ){
												chartsData.seriesData[0].data.unshift('-');
												chartsData.xAxis.unshift('-');
											}
										}
									}
								
										legendArr = chartsData.legend; 
										___echartsObj.setOption(deepClone(___optionConfig.lineOption));
										___echartsObj.setOption({
											legend: {
												data:chartsData.legend,
												show:chartsData.showLegend
											},
											xAxis:[{
												data:chartsData.xAxis,
												//name:chartsData.xAxisName
											}],
											yAxis:[{
												name:chartsData.yAxisName,
												max:chartsData.yMax
											}],
											series :chartsData.seriesData
										});
									
									var ___updateTimeReal = ___updateTime||chartsData.updateTime||(2*60*1000);
									___intervalId = ___handler.setInterval(loadData,___updateTimeReal);
									$echartsCtn.trigger('dataloaded');//触发dataload事件
									
							}else{
								app.alert('提示', data.errorMsg || '初始化加载错误', app.alertShowType.ERROR);
							}
						}
					});
				}else if((___urlParams.state === STATE_DYNAMIC.STATIC_2 && ___urlParams["queryFlag"] === '1') || (___urlParams.state === STATE_DYNAMIC.DYNAMIC_2 && ___urlParams["queryFlag"] === '1')){
					$.ajax({
						'type': 'post',
						'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
						'url': ___initDynamicUrl,
						'dataType': 'json',
						'data': {"reqParams":JSON.stringify(___urlParams)},
						'success': function (data) {
							if (data && data.status) {
								var chartsData = data.content.chartsData;
								if(!$.isEmptyObject(chartsData)){
									legendArr = chartsData.legend;
									___echartsObj.setOption(deepClone(___optionConfig.overturnLineOption));
									___echartsObj.setOption({
										legend: {
											data:chartsData.legend,
											show:chartsData.showLegend
										},
										yAxis:[{
											data:chartsData.xAxis,
											name:chartsData.xAxisName
										}],
										xAxis:[{
											name:chartsData.yAxisName,
											max:chartsData.yMax
										}],
										series :chartsData.seriesData
									});
									var ___updateTimeReal = ___updateTime||chartsData.updateTime||(2*60*1000);	
									___intervalId = ___handler.setInterval(loadData,___updateTimeReal);
									$echartsCtn.trigger('dataloaded');//触发dataload事件  
								}else{
									___echartsObj&&___echartsObj.clear(); 
									app.nodata.showLoading($echartsCtn);
								}
							}else{
								app.alert('提示', data.errorMsg || '初始化加载错误', app.alertShowType.ERROR);
							}
						}
					});
				}else if(___urlParams.state===STATE_STATIC.STATIC){
					//非动态点
					$.ajax({
						'type': 'post',
						'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
						'url': ___url,
						'dataType': 'json',
						'data': {"reqParams":JSON.stringify(___urlParams)},
						'success': function (data) {
							if (data && data.status) {
								var chartsData = data.content.chartsData;
								if(!$.isEmptyObject(chartsData)){
									legendArr = chartsData.legend;
									___echartsObj.setOption(deepClone(___optionConfig.overturnLineOption));
									___echartsObj.setOption({
										legend: {
											data:chartsData.legend,
											show:chartsData.showLegend
										},
										yAxis:[{
											data:chartsData.xAxis,
											name:chartsData.xAxisName
										}],
										xAxis:[{
											name:chartsData.yAxisName,
											max:chartsData.yMax
										}],
										series :chartsData.seriesData
									});
									//实际，与折线图获取历史数据相同
									var ___updateTimeReal = ___updateTime||chartsData.updateTime||(2*60*1000);
									loadData();
									___intervalId = ___handler.setInterval(loadData,___updateTimeReal);
									$echartsCtn.trigger('dataloaded');//触发dataload事件
								}else{
									___echartsObj&&___echartsObj.clear(); 
									app.nodata.showLoading($echartsCtn);
								}
							}else{
								app.alert('提示', data.errorMsg || '初始化加载错误', app.alertShowType.ERROR);
							}
						}
					});
				}else{//非动态点
					$.ajax({
						'type': 'post',
						'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
						'url': ___url,
						'dataType': 'json',
						'data': {"reqParams":JSON.stringify(___urlParams)},
						'success': function (data) {
							if (data && data.status) {
								var chartsData = data.content.chartsData;
								if(!$.isEmptyObject(chartsData)&&___echartsObj){ 
									legendArr = chartsData.legend;
									___echartsObj.setOption(deepClone(___optionConfig.lineOption));
									___echartsObj.setOption({
										legend: {
											data:chartsData.legend,
											show:chartsData.showLegend
										},
										xAxis:[{
											data:chartsData.xAxis
										//	name:chartsData.xAxisName
										}],
										yAxis:[{
											name:chartsData.yAxisName,
											max:chartsData.yMax
										}],
										series :chartsData.seriesData
									});
									//实际，与折线图获取历史数据相同
									var ___updateTimeReal = ___updateTime||chartsData.updateTime||(2*60*1000);	
									loadData();
									___intervalId = ___handler.setInterval(loadData,___updateTimeReal);
									$echartsCtn.trigger('dataloaded');//触发dataload事件
								}else{
									___echartsObj&&___echartsObj.clear(); 
									app.nodata.showLoading($echartsCtn);
								}
							}else{
								app.alert('提示', data.errorMsg || '初始化加载错误', app.alertShowType.ERROR);
							}
						}
					});
					
				}
				/*$echartsCtn.trigger('dataloaded'); */
			}
			
			/*说明：与后台Action规定好统一传回的数据格式和参数名，现在后台返回的统一参数名为chartsData，后期结合Action进行改动
			data.content的格式类如：{"chartsData":{"legend":["swap使用率","swap进程数"],"seriesData":["39","100"],"title":"动态swap使用率与进程数","xNum":"7"}}
			chartsData中的key根据图表类型的不同，与后台Action商定统一固定的值*/
			//加载数据
			var loadData = function(){
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': ___url,
					'dataType': 'json',
					'data': {"reqParams":JSON.stringify(___urlParams)},
					'success': function (data) {
						if (data && data.status) {
							var chartsData = data.content.chartsData;
						/*	var newdata = chartsData.seriesData[0].data;
							var arraydata = [];
							newdata.forEach(function(key,index,array){
								arraydata.push(parseInt(key)/10000);
								
							});
							chartsData.seriesData[0].data = arraydata;*/
							if(___urlParams.showType === ECHARTS_TYPE.PIE){//饼状图
								legendArr = chartsData.legend;  
								___echartsObj.setOption({
									legend: {
										data:chartsData.legend,
										show:chartsData.showLegend
									},
									series : [
									          {
									        	  name:chartsData.seriesName,
									        	  data:chartsData.seriesData
									          }
									          ]
								});

							}else if(___urlParams.showType === ECHARTS_TYPE.LINE){//折线图
								if((___urlParams.state === STATE_DYNAMIC.STATIC && ___urlParams["queryFlag"] === '1') || (___urlParams.state === STATE_DYNAMIC.DYNAMIC && ___urlParams["queryFlag"] === '1')){//动态点需先获取历史数据，以初始化图表获取到历史数据
									//动态点添加
									//判断数据长度是否达到了dataLen,如果达到则删减队列长度
									var option =  ___echartsObj.getOption();
									
									//初始化完成后添加数据
									var addDatas = [];
									for(var i =0, len = chartsData.seriesData.length; i< len; i++){
										if(i == 0){
											addDatas.push([
					                                         i,        // 系列索引
					                                         chartsData.seriesData[i].data[0], // 新增数据
					                                         false,     // 新增数据是否从队列头部插入
					                                         false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
					                                         new Date().Format('hh:mm')//第一个点添加x轴值即可
					                                     ]);
										}else{
											addDatas.push([
					                                         i,        // 系列索引
					                                         chartsData.seriesData[i].data[0], // 新增数据
					                                         false,     // 新增数据是否从队列头部插入
					                                         false    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
					                                     ]);
										}
									}
									___echartsObj.addData(addDatas);
								
								}else if((___urlParams.state === STATE_DYNAMIC.STATIC_2 && ___urlParams["queryFlag"] === '1') || (___urlParams.state === STATE_DYNAMIC.DYNAMIC_2 && ___urlParams["queryFlag"] === '1')){
									//动态点需先获取历史数据，以初始化图表获取到历史数据
									//动态点添加
									//初始化完成后添加数据
									var addDatas = [];
									for(var i =0, len = chartsData.seriesData.length; i< len; i++){
										if(i == 0){
											addDatas.push([
					                                         i,        // 系列索引
					                                         chartsData.seriesData[i].data[0], // 新增数据
					                                         false,     // 新增数据是否从队列头部插入
					                                         false,     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
					                                         new Date().Format('hh:mm:ss')//第一个点添加x轴值即可
					                                     ]);
										}else{
											addDatas.push([
					                                         i,        // 系列索引
					                                         chartsData.seriesData[i].data[0], // 新增数据
					                                         false,     // 新增数据是否从队列头部插入
					                                         false    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
					                                     ]);
										}
									}
									___echartsObj.addData(addDatas);
								}else if(___urlParams.state===STATE_STATIC.STATIC){
									//非动态点
									legendArr = chartsData.legend;
									___echartsObj.setOption({
										legend: {
											data:chartsData.legend,
											show:chartsData.showLegend
										},
										yAxis:[{
											data:chartsData.xAxis,
											name:chartsData.xAxisName
										}],
										xAxis:[{
											name:chartsData.yAxisName
										}],
										tooltip : {//元生的tooltip
											trigger: 'axis',  
											 formatter: setToolDtl  
										},
										series :chartsData.seriesData
									});
								}else{//非动态点
									legendArr = chartsData.legend;
									___echartsObj.setOption({
										legend: {
											data:chartsData.legend,
											show:chartsData.showLegend
										},
										xAxis:[{
											data:chartsData.xAxis,
										//	name:chartsData.xAxisName
										}],
										yAxis:[{
											name:chartsData.yAxisName
										}],
										tooltip : {  //元生的tooltip
											trigger: 'axis',
											 formatter: setToolDtl
										},
										series :chartsData.seriesData
									});

								}
							}
						$echartsCtn.trigger('dataloaded'); 
						}else{
							app.alert('提示', data.errorMsg || '加载错误', app.alertShowType.ERROR);
						}
					}
				});
			}
			
			/*销毁图表*/
			var dispose = function(){
				$echartsCtn.trigger('dispose');
				___handler.clearInterval(___intervalId);
				___echartsObj && ___echartsObj.dispose && ___echartsObj.dispose();
				___echartsObj =null;
				___intervalId = null;
				//删除切换选项
				$('[data-role=changeStaticsTypeCtn]',$echartsCtn.parent()).length !== 0 && $('[data-role=changeStaticsTypeCtn]',$echartsCtn.parent()).remove();
			}
			
			var innerDispose = function(){
				$echartsCtn.trigger('dispose');
				___handler.clearInterval(___intervalId);
				app.nodata.hideLoading($echartsCtn);
				___echartsObj&&___echartsObj.clear();   
				___intervalId = null;
			}
			/*创建图表*/ 
			var start = function(){
				initParams();//初始化图表对象
				initData();
				$echartsCtn.trigger('start');    
			}
			/*缩放大小*/
			var resize=function(){
				___echartsObj.resize();
			}
			
			var updateUrlParams = function(urlParams){
				___urlParams = urlParams;
				dispose();
				start();
			}
			
			var updateInnerUrlParams = function(urlParams){
				___urlParams = urlParams;
				innerDispose();
				initData();  
			}
			
			//添加监听事件add by liuzhiyong
			var addListener = function(eventType,callback){
				/*var ecConfig = require('echarts_event');
				var a = ecConfig.EVENT.HOVER;*/
				___echartsObj.on('hover', callback);
				
			}
			//获得图表对象
			var getEchartsObj = function(){
				return ___echartsObj;
				
			};
			
			//获得图表对象的jquery容器
			var getEchartsCtn = function(){
				return $echartsCtn;
				
			};
			
			//绑定联动的日月周点击事件
			var bindConnect = function(connectObj){
				 
				//本身的echart
				___connectObj = connectObj;
				/*connectObj.bindConnect(that);   */   
				var selfEchObj = ___echartsObj;
				var $selfCtn =$echartsCtn;
				//连接的showdata对象
				var thatObj = connectObj;
				var thatEchObj = connectObj.getEchartsObj();
				var $thatCtn = connectObj.getEchartsCtn();
				var thatUrlParams = connectObj.getUrlParams();
				//connect 两个echarts对象  
				selfEchObj.connect(thatEchObj);  
				$selfCtn.parent().off('changeStaticsClick').on('changeStaticsClick',function(e){      
					 
					 var $elem=$(e.target||window.event.srcElement);  
					if($elem.length!=0&&$elem.attr('data-role')!='changeStaticsTypeCtn'){      
					//	$elem.addClass('btn-info  base-bgblue').removeClass('btn-link').siblings().removeClass('btn-info  base-bgblue').addClass('btn-link');
						var type = $elem.attr('value'); 
						/*$elem.addClass('blue').siblings().removeClass('blue');*/
						  
						var $btn=$thatCtn.parent().find('button[value='+type+']');
						$btn.addClass('blue').siblings().removeClass('blue');    
						/*var type = $elem.attr('value'); */
						if(type === 'realTime'){
							thatUrlParams["queryFlag"]  = '1';
							thatUrlParams["count_type"] !== undefined && delete thatUrlParams["count_type"];
						}else if(type ===  "day"){
							thatUrlParams["count_type"]  = type;
							thatUrlParams["queryFlag"]  = '2';
						}else{
							thatUrlParams["count_type"]  = type;
							thatUrlParams["queryFlag"]  = '3'; 
						}
						//更新echarts对象
						thatObj.updateInnerUrlParams(thatUrlParams);
					}
					
				
					
				});
			};
			
/*        	var showLoading = function($ctn){
        		$('.nodata-ctn',$ctn).remove();
        		$ctn.css("position:relative");
        		var html = '<div class="nodata-ctn"><img src="./img/echarts/nodata.png"></div>';
        		$ctn.prepend(html)
        	}
        	var hideLoading = function($ctn){
        		$('.nodata-ctn',$ctn).remove();
        	}*/
			
			return {
				
				/*绑定联动的日月周点击事件*/
				bindConnect: bindConnect,
				/*修改参数*/
				updateUrlParams: updateUrlParams,
				updateInnerUrlParams:updateInnerUrlParams,  
				/*获取参数*/
				getUrlParams: function(){
					return ___urlParams;
				},
				/*创建图表*/
				start: start,
				/*销毁图表*/
				dispose: dispose,
				/*缩放大小*/
				resize:resize,
				addListener:addListener,
				getEchartsCtn:getEchartsCtn,
				getEchartsObj:getEchartsObj,
			}
		}
		
		
		/*datatable普通表格
		 * 
		 * selector：图表容器
		 * url：数据请求url
		 * urlParams:请求参数
		 * */
		var tableCollection = function(options){
			var ___handler = options.handler,
			___$context = options.$context,
			___urlParams = options.urlParams,
			___url = options.url !== undefined ? options.url : './BaseAction_setBaseData.do' ,//未设定默认
			___initDynamicUrl = options.initDynamicUrl !== undefined ?options.initDynamicUrl:'./BaseAction_setRealTimeData.do',
			___selector = options.selector,
			___thHeight = options.thHeight,
			___Table, ___notInitFlag = true,//表格对象未初始化标识
			___intervalId,___updateTime = options.updateTime,
			___iDisplayLength = options.iDisplayLength||10,
			___bInfo = options.bInfo!==undefined?options.bInfo:false,
			___bFilter = options.bFilter!==undefined?options.bFilter:true,
			___bLengthChange = options.bLengthChange!==undefined?options.bLengthChange:true,
			___sDomFlag = options.sDomFlag,
			___extraOptions = options.extraOptions,
			___updateTimeReal,
			___contextHeight;
			if(___thHeight!==undefined&&___thHeight!==""){

				___contextHeight = $(___selector,___$context).height()-___thHeight;
			}else{
				___contextHeight = "";
			}
			var TABLE_TYPE ={
					NORMAL: '0',
					PAGE: '1'
			}
			
			var ___optionConfig = {
					/*非分页表格初始化参数*/
					tbOption:{
						'sScrollY':___contextHeight,
						'bScrollCollapse':false,//x滚动条始终贴底
						'sScrollX':'110%',
						'sScrollXInner':'disable',
						'bAutoWidth':false,//是否自动计算表格各列宽度，默认true
						'bFilter' : ___bFilter, // 过滤功能，默认true
						'bInfo': ___bInfo,//开关，是否显示表格的一些信息
						'bLengthChange':___bLengthChange,//开关，是否显示一个每页长度的选择条（需要分页器支持），默认true
						'bPaginate':true,//开关，是否显示（使用）分页器，默认true
						"bSort": false,//是否可排序，默认true
						'bStateSave': false,//开关，是否打开客户端状态记录功能，这个数据是记录在cookies中的，打开了这个记录后，即使刷新一次页面，或重新打开浏览器，之前的状态都是保存下来的，默认false
		                'bDestroy': true,//用于当要在同一个元素上执行新的dataTable绑定时，将之前的那个数据对象清除掉，换以新的对象设置，默认false
		                'iDisplayLength':___iDisplayLength,//用于指定一屏显示的条数，需开启分页器，默认为10
		                'iDisplayStart': 0,//用于指定从哪一条数据开始显示到表格中去，默认为0
		                //'aLengthMenu':[10, 25, 50, 100],//为选择每页的条目数，默认为[10, 25, 50, 100]
		                //…………等其他属性参数，可写入配置库中，个性化表格，添加需个性化的属性，在初始化参数时从配置库中获取修改即可
		                "fnDrawCallback":function(){
							$(___selector+' tbody tr td',___$context).each( function() {
								this.setAttribute( 'title', this.innerHTML );
							} );
							$(___selector+' thead tr th',___$context).each( function() {
								this.setAttribute( 'title', this.innerHTML );
							} );
						},
		                'aoColumns':[]
					},
					/*分页表格初始化参数*/
					tbOptionPage: {
						'sScrollY':'100px',
						'sScrollX':'',
						'sScrollXInner':'disable',
						'sAjaxSource': ___url,//指定要从哪个URL获取数据
						'bAutoWidth':true,//是否自动计算表格各列宽度，默认true
						'bFilter' : true, // 过滤功能，默认true
						'bLengthChange':true,//开关，是否显示一个每页长度的选择条（需要分页器支持），默认true
						'bPaginate':true,//开关，是否显示（使用）分页器，默认true
						"bSort": false,//是否可排序，默认true
						'bInfo': false,//开关，是否显示表格的一些信息
						'bStateSave': false,//开关，是否打开客户端状态记录功能，这个数据是记录在cookies中的，打开了这个记录后，即使刷新一次页面，或重新打开浏览器，之前的状态都是保存下来的，默认false
		                'bDestroy': true,//用于当要在同一个元素上执行新的dataTable绑定时，将之前的那个数据对象清除掉，换以新的对象设置，默认false
		                'iDisplayLength':10,//用于指定一屏显示的条数，需开启分页器，默认为10
		                'iDisplayStart': 0,//用于指定从哪一条数据开始显示到表格中去，默认为0
		                'aLengthMenu':[10, 25, 50, 100],//为选择每页的条目数，默认为[10, 25, 50, 100]
		                //…………等其他属性参数
						"fnDrawCallback":function(){//在每次table被draw完后调用
							$(___selector+' tbody tr td',___$context).each( function() {
								this.setAttribute( 'title', this.innerHTML );
							} );
							$(___selector+' thead tr th',___$context).each( function() {
								this.setAttribute( 'title', this.innerHTML );
							} );
						},
						'bServerSide': true,//指定从服务器端获取数据
						'fnServerData': function (sSource, aoData, fnCallback) {//与后台交互获取数据的处理函数
							//获取参数
							var sEcho;
							for (var i = 0; i < aoData.length; i++) {//aoData中可获取到页面大小等参数值，如需知道aoData中存放了哪些数据，console.log(aoData)打印出来查看即可
								var obj = aoData[i];
								if(obj.name === "sEcho"){
									sEcho = obj.value;
								}
								if (obj.name === "iDisplayStart" || obj.name === "iDisplayLength"){
									var value = obj.value;
									___urlParams[obj.name] = value;
								}
							}
							$.ajax({
								'type': 'post',
								'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
								'url': sSource,
								'dataType': 'json',
								'data': {"reqParams":JSON.stringify(___urlParams)},
								'success': function (data) {
									if(data.status){
										var chartsData = data.content.chartsData;
										if(chartsData){
											var result ={};
											result.iTotalRecords = chartsData.totalRecords;
											result.iTotalDisplayRecords = chartsData.totalRecords;
											result.sEcho = sEcho;
											result.aaData = chartsData.tableData;
											fnCallback(result); //服务器端返回的对象的resp部分是要求的格式
										}
									}else{
										fnCallback({'aaData': []});
										app.alert('提示', data.errorMsg || '加载错误', app.alertShowType.ERROR);
									}
								}, error: function () {
									fnCallback({'aaData': []});
								}
							});
						},
						"aoColumns": []
				
					}
			
			}
			
			/*说明：与后台Action规定好统一传回的数据格式和参数名，现在后台返回的统一参数名为chartsData，后期结合Action进行改动
			data.content的格式类如：{"chartsData":{"legend":["swap使用率","swap进程数"],"seriesData":["39","100"],"title":"动态swap使用率与进程数","xNum":"7"}}
			chartsData中的key根据图表类型的不同，与后台Action商定统一固定的值*/
			/*非分页加载数据*/
			var loadData = function(){
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': ___url,
					'dataType': 'json',
					'data': {"reqParams":JSON.stringify(___urlParams)},
					shelter: '正在加载数据，请稍侯…',
					'success': function (data) {
						if (data && data.status) {
							var chartsData = data.content.chartsData;
							if(chartsData){
								//未初始化datatable对象，从后台获取到的数据进行初始化
								if(___notInitFlag){
									var option = deepClone(___optionConfig.tbOption)
									if(___sDomFlag&&___sDomFlag==="1"){
										option.sDom = 't<"bottom"ilp><"clear">'
									}else if(___sDomFlag){
										option.sDom = ___sDomFlag;
									}
									if(___extraOptions){
										for(var key in ___extraOptions){
											option[key] = ___extraOptions[key];
										}
									}
									option.aoColumns = chartsData.aoColumns;
									___Table = $('[data-role=showTb]', $(___selector, ___$context)).dataTable(option);
									___notInitFlag = false;
								}
								var tableData = chartsData.tableData;
								___Table.fnClearTable();
								if(tableData&&tableData.length &&tableData.length!==0){
									___Table.fnAddData(tableData);
								}
							}
						}else{
							app.alert('提示', data.errorMsg || '加载错误', app.alertShowType.ERROR);
						}
					}
				});
			}
			
			/*说明：与后台Action规定好统一传回的数据格式和参数名，现在后台返回的统一参数名为chartsData，后期结合Action进行改动
			data.content的格式类如：{"chartsData":{"legend":["swap使用率","swap进程数"],"seriesData":["39","100"],"title":"动态swap使用率与进程数","xNum":"7"}}
			chartsData中的key根据图表类型的不同，与后台Action商定统一固定的值*/
			/*分页加载数据*/
			var loadPageData = function(){
				//加载datatable初始化数据，
				___urlParams.iDisplayStart = 0;
				___urlParams.iDisplayLength = 0;
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': ___url,
					'dataType': 'json',
					'data': {"reqParams":JSON.stringify(___urlParams)},
					shelter: '正在加载数据，请稍侯…',
					'success': function (data) {
						if (data && data.status) {
							var chartsData = data.content.chartsData;
							if(chartsData){
								if(___notInitFlag){//未初始化
									//初始化datatable对象
									var option = deepClone(___optionConfig.tbOptionPage)
									option.aoColumns = chartsData.aoColumns;
									___Table = $('[data-role=showTb]', $(___selector, ___$context)).dataTable(option);
									___notInitFlag = false;
								}
							}
						}else{
							app.alert('提示', data.errorMsg || '加载错误', app.alertShowType.ERROR);
						}
					}
				});
			}
			
			
			var createTable = function(){
				$(___selector, ___$context).append('<div><table data-role="showTb" class="display dataTable table" style="width: 100%;"></table></div>');
				if(___urlParams.state === TABLE_TYPE.NORMAL){//普通表格
					loadData();
					___intervalId = ___handler.setInterval(loadData,___updateTimeReal);
				}else if(___urlParams.state === TABLE_TYPE.PAGE){//分页表格
					loadPageData();
				}
			}
			
			/*创建表格*/
			var start = function(){
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': ___url,
					'dataType': 'json',
					'data': {"reqParams":JSON.stringify(___urlParams)},
					'success': function (data) {
						if (data && data.status) {
							var chartsData = data.content.chartsData;
							if(chartsData){
								var title = chartsData.title !==undefined?chartsData.title:"";
								//实际，与折线图获取历史数据相同
								___updateTimeReal = ___updateTime||chartsData.updateTime||(2*60*1000);
								//___updateTime = chartsData.updateTime !== undefined ? chartsData.updateTime : ___updateTime;
								createTable();
							}
							
						}else{
							app.alert('提示', data.errorMsg || '初始化加载错误', app.alertShowType.ERROR);
						}
					}
				});
			}
			
			var resizetb = function(){
				$(___selector, ___$context).empty();
				setUrlParams(___urlParams);
			}
			
			/*销毁表格*/
			var dispose = function(){
				
				___Table && ___Table.fnDestroy && ___Table.fnDestroy(), ___Table = null;
				___intervalId !== null &&___handler.clearInterval(___intervalId);
				___intervalId = null;
				//$(___selector, ___$context).empty();
				___notInitFlag = true;
			}
			/*修改请求参数*/
			var setUrlParams = function(urlParams){
				dispose();
				___urlParams = urlParams;
				start();
			}
			/*获取请求参数*/
			var getUrlParams = function(){
				return ___urlParams
			}
			
			return {
				resizetb:resizetb,
				start:start,
				dispose: dispose,
				setUrlParams:setUrlParams,
				getUrlParams:getUrlParams
			}
		}

		return {
			chartsCollection: chartsCollection,
			tableCollection: tableCollection
		}

	});

})();