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
			define(["jquery", "G2","echarts"], factory);
		}
		//global
		else{
			factory();
		}

	})(function () {
		"use strict";
		
		
		var kpisG2 = function(options){
			var ___handler = options.handler,
			___$context = options.$context,
			___selector = options.selector,//图表容器
			___updateTime = options.updateTime||2*60*1000,//数据更新时间间隔,默认两分钟
			___url = options.url !== undefined ? options.url : './G2KpisAction_main.do' ,//未设定默认
			___urlParams = options.urlParams,//请求参数
			___minValue = options.minValue||0,
			___maxValue = options.maxValue||100,
			___margin = options.margin||[50, 50, 50, 50],
			___legendDist = options.legendDist||'top',
			___mask = options.mask||'HH:MM:ss',
			___timeAlias = options.timeAlias||'时间',
			___valueAlias = options.valueAlias||' ',
			___height = options.height||318,
			___G2Obj, ___intervalId;
			
			G2.Global.colors['cheery'] = ['#13B1F5','blue','yellow'];
			G2.Global.setTheme('cheery');
			var initG2 = function(){
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
								___G2Obj = new G2.Chart({
						             id: ___selector,
						             forceFit:true,
						             height: ___height,//默认高度
						             plotCfg: {
						               margin: ___margin
						             }
						           });
								___G2Obj.source(chartsData, {
							         time: {
								               type: 'time',
								               mask: ___mask,
								               alias: ___timeAlias
								          },
						             value: {
						            	 	type:'linear',
						            	    min: ___minValue, // 设置最小值,默认0
						            	    max: ___maxValue, // 设置最大值,默认100
						            	    alias:___valueAlias
						            	  } 
						           });
						           ___G2Obj.legend(___legendDist);
						           ___G2Obj.line().position('time*value').color('name').shape('smooth').size(1);
						           ___G2Obj.point().position('time*value').color('name').shape('name', ['circle', 'rect', 'diamond']).size(0);
						           ___G2Obj.render();
							}else{
								app.alert("平台无数据");
							}
						}else{
							app.alert('提示', data.errorMsg || '初始化加载错误', app.alertShowType.ERROR);
						}
					}
				});
			}
			
			var changeData = function(){
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
								___G2Obj.changeData(chartsData);
							}else{
								app.alert("平台无数据");
							}
						}else{
							app.alert('提示', data.errorMsg || '初始化加载错误', app.alertShowType.ERROR);
						}
					}
				});
			}
			
			var render = function(){
				___G2Obj.render();
			}
			
			var start = function(){
				initG2();
				___intervalId = ___handler.setInterval(changeData,___updateTime);
			}
			
			var dispose = function(){
				___handler.clearInterval(___intervalId);
				___G2Obj && ___G2Obj.destroy && ___G2Obj.destroy();
				___G2Obj =null;
				___intervalId = null;
			}
			
			//获得图表对象
			var getG2Obj = function(){
				return ___G2Obj;
				
			}
			
			return {
				/*创建图表*/
				start: start,
				/*销毁图表*/
				dispose: dispose,
				getG2Obj:getG2Obj
			}

		}
		
		
		var kpisEcharts = function(options){
			var legendArr;
			var ___handler = options.handler,
			___$context = options.$context,
			___selector = options.selector,//图表容器
			___updateTime = options.updateTime||2*60*1000,//数据更新时间间隔,默认两分钟
			___url = options.url !== undefined ? options.url : './EchartsKpisAction_main.do' ,//未设定默认
			___urlParams = options.urlParams,//请求参数
			___minValue = options.minValue||"",
			___maxValue = options.maxValue||"",
			___margin = options.margin||['20', '10', '35', '35'],
			___xName = options.xName||' ',
			___yName = options.yName||' ',
			___radiodisplay = options.radiodisplay,
			___echartsObj, ___intervalId,
			___colorArray =  [ 
			                   '#13b1f5','#13b1f5','#3d7ad6', '#fa594d', '#ffa602', '#00a8c0',   
			                   '#ba55d3', '#0cbf47', '#cd5c5c', '#ff69b4', '#b8860b',   
			                   '#52e0b0', '#ff8454', '#8b78fd', '#00fa9a', '#ffd800', 
			                   '#6b8e23', '#ff00ff', '#3cb371', '#e8454a', '#30e0e0' 
			                  ];
			
			var echarts_skin = echarts.config.skin.MACARONS;
			var changeStaticsTypeDIV = '<div data-role="changeStaticsTypeCtn" class="kpi-change-btn-grp" >_now__day__week__month_</div>';

			
			var lineOption = {
					color:___colorArray,
					tooltip:{
						trigger:'axis',
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
						},
						padding:0,
						backgroundColor:'rgba(255,255,255,0)',
						formatter:function(params,ticket,callback){
							var len =params.length;
							var liStr = '';  
							var colorOption = ___colorArray;
							for(var i=0;i<len;i++){
								var data = params[i].data;
								var seriesName = params[i].seriesName;
								var index = legendArr.indexOf(seriesName);
								var color = colorOption[ (index + 1)%colorOption.length] ;
								liStr = liStr+'<li class="tooltip-li">'+
								            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
								            	'<span class="tooltip-name">'+seriesName+'</span>'+
								            	'<span class="tooltip-value">'+data+'</span>'+
							                '</li>';
							}
							return   '<div class="tooltipCtn">'+
							         '<div class="tooltip-title">'+params[0].name+'</div>'+
							         	'<ul class="tooltip-ul">'+liStr+'</ul>'+
							         '</div>'; }
					},
					grid:{
						y:___margin[0],
						x2:___margin[1],
						y2:___margin[2],
						x:___margin[3]
					},
					legend:{
						data:['-']
					},
					xAxis:[
					       {
					    	   type:'category',
					    	   boundaryGap : true,
					    	   data : ['-'],
					    	   name:___xName,
					    	   splitLine:{
					    		   show:false,
					    		   lineStyle:{
					    			   color: ['#dadada'],
					    			   width: 1,
					    			   type: 'solid'
					        	   	}
					    	   },
					    	   axisLine:{
					    		   show:true,
					    		   lineStyle:{
					    			   color:'#dadada',
					    			   width:1,
					    			   type:'solid'
					    		   }
					    	   },
					    	   axisTick:{show:false}
					       }
					       ],
				    yAxis:[
				       {
				    	   type:'value',
				    	   name:___yName,
				    	   max:___maxValue,
				    	   splitLine:{
				    		   show:false,
				    		   lineStyle:{
				    			   color:['#dadada'],
				    			   width:1,
				    			   type:'solid'
				    		   }
				    	   },
				    	   axisLine:{
				    		   show:true,
				    		   lineStyle:{
				    			   color:'#dadada',
				    			   width:1,
				    			   type: 'solid'
				    		   },
				    		   axisTick:{show:false}
				    	   }
				       }
				       ],
				    series:[
				            {
				            	name:'',
				            	type:'line',
				            	data:['-'],
				            	symbol:'none',
				            	itemStyle:{
				            		normal:{
				            			color:'#13B1F5',
					            		lineStyle :{
					            			width:1
					            		}
				            		}
				            	}
				            }
				            ]
			};
			
			var $echartsCtn = $(___selector, ___$context);
			var $radioDiv = $echartsCtn.prev('[data-role="changeStaticsTypeCtn"]');
			var initEcharts = function(){
				___echartsObj = echarts.init($echartsCtn[0], echarts_skin);
				___echartsObj.setOption(lineOption);
				if($radioDiv){
					$radioDiv.remove();
				}
				var radioName = app.global.getUniqueId();
				var innerHTML = "";
				if(___radiodisplay === undefined||___radiodisplay===""){
					innerHTML = '';
				}else if(___radiodisplay === "all"){
					innerHTML = '<button type="button"  class="kpi-change-btn blue" value="realTime" name="_name_">实时</button><button type="button" class="btn  btn-mini btn-link" value="day" name="_name_">最近24小时</button><button type="button"  class="kpi-change-btn" value="week" name="_name_">最近七天</button><button type="button" class="kpi-change-btn" value="month" name="_name_">最近三十天</button>';
				}else{  
					if(___radiodisplay.indexOf("now")!==(-1)){
						innerHTML = innerHTML + '<button type="button"  class="kpi-change-btn blue" value="realTime" name="_name_">实时</button>';
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
					}
					
				});
			
			};
			
			var initData = function(){
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
								___echartsObj.setOption(lineOption);
								___echartsObj.setOption({
									legend:{
										data:chartsData.legend
									},
									xAxis:[{
										data:chartsData.xAxis
									}],
									yAxis:[{
										max:chartsData.yMax||___maxValue
									}],
									series:chartsData.seriesData
								});
								___intervalId = ___handler.setInterval(loadData,___updateTime);
								$echartsCtn.trigger('dataloaded');
							}else{
								___echartsObj&&___echartsObj.clear();
								app.nodata.showLoading($echartsCtn);
							}
						}else{
							app.alert('提示', data.errorMsg || '初始化加载错误', app.alertShowType.ERROR);
						}
					}
				});
			};
			
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
							if(!$.isEmptyObject(chartsData)){
								legendArr = chartsData.legend;
								___echartsObj.setOption({
									legend:{
										data:chartsData.legend
									},
									xAxis:[{
										data:chartsData.xAxis
									}],
									yAxis:[{
										max:chartsData.yMax||___maxValue
									}],
									series :chartsData.seriesData
								});
							}else{
								app.nodata.showLoading($echartsCtn);
							}
							$echartsCtn.trigger('dataloaded')
						}else{
							app.alert('提示', data.errorMsg || '初始化加载错误', app.alertShowType.ERROR);
						}
					}
				});
			};
			
			var dispose = function(){
				___handler.clearInterval(___intervalId);
				___echartsObj && ___echartsObj.dispose && ___echartsObj.dispose();
				___echartsObj =null;
				___intervalId = null;
			}
			
			var start = function(){
				initEcharts();
				initData();
			}
			
			var resize=function(){
				___echartsObj.resize();
			}
			
			var getEchartsObj = function(){
				return ___echartsObj;
			}
			
			var innerDispose = function(){
				$echartsCtn.trigger('dispose');
				___handler.clearInterval(___intervalId);
				app.nodata.hideLoading($echartsCtn);
				___echartsObj&&___echartsObj.clear();  
				___intervalId = null;
			}
			
			var updateInnerUrlParams = function(urlParams){
				___urlParams = urlParams;
				innerDispose();
				initData();
			}
			
			return{
				start:start,
				dispose:dispose,
				resize:resize,
				getEchartsObj:getEchartsObj
			}
			
		}
		
		return {
			kpisG2: kpisG2,
			kpisEcharts:kpisEcharts
		}
	});

})();