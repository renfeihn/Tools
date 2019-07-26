/*!
 * Javascript library v3.0
 * 使用说明：
 * 		
 *
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
		/*amd module*/		
		if(typeof define === "function" && define.amd) {
			define(["jquery"], factory);
		}
		/*global*/		
		else{
			factory();
		}

	})(function () {
		"use strict";
		
		var healtyshow = function(options){
			var ___handler = options.handler,
				___$context = options.$context,
				___selector = options.selector,//图表容器
				___bigorsmall = options.bigorsmall,//大小图标(1-》大;0-》小)
				___titlename = options.titlename,
				___liked = options.liked,
				___healty = options.healty,
				___isfavorite = options.isfavorite !== undefined ? options.isfavorite: "true",/*是否显示收藏按钮(true->收藏,false->不收藏),默认为显示收藏*/						
				___isgotodetail = options.isgotodetail !== undefined ? options.isgotodetail: "true",//是否能跳转到详情页面,如果为true,必须传___loadpath,___loadRegion,___loadExports
				___loadpath = options.loadpath,//跳转到详情页面参数
				___loadRegion = options.loadRegion !== undefined ? options.loadRegion:" ",//暴露参数命名空间
				___loadExports = options.loadExports !== undefined ? options.loadExports:" ",//暴露参数
						
				___isshowdetail =  options.isshowdetail !== undefined ? options.isshowdetail:"flase",//是否显示健康度详情
				___showdetailFlag   = options.showdetailFlag, //1-》初始化时显示 0-》初始化时不显示
				___detailData = options.detailData,//如果 "___isshowdetail" 为true,才设置此值,格式为{'nohand':nohandle_num,'app':app1,'middle':middle,'system':sys,'database':db,'other':other,'today_hand':day_handle_num,'today_total':total_num};
				
				___favoriteType = options.favoriteType,  //关注类型--》必须传(应用-》'app',组-》'group')
				___appid = options.appid !==undefined ? options.appid:" ";//如果___favoriteType 传入的为app才传
				;
			
			var $echartsList=[],
				$healtyCtn = $(___selector,___$context),
				$echChart
				;
			
			
		var loadhealty = function(){
			/*通过ajax获取html模板*/
			$.ajax({
				url:'./module/plugin/healtyShow.html',
				contentType:"application/x-www-form-urlencoded;charset=utf-8;",
				type:"POST",
				async:false,
				dataType:"html",
				success:function(data){
					var $a = $(data);
					if(___bigorsmall=='1'){
						$echChart = $a[2];
					}
					if(___bigorsmall=='0'){
						$echChart = $a[4];
					}
					
				}
			});
			/*大图展示*/
			var addBigTem = function(){
				$healtyCtn.append($echChart);
				 
					$('[data-role=appallHead]',$echChart).text(___titlename);
					$('[data-role=healtyNum]',$echChart).text(___healty);
					/*当需要显示详细信息时设值*/
					if(___isshowdetail=='true'){
						$('[data-role=appallNohand]',$echChart).text(___detailData['nohand']);
						$('[data-role=appallApp]',$echChart).text(___detailData['app']);
						$('[data-role=appallMiddle]',$echChart).text(___detailData['middle']);
						$('[data-role=appallSystem]',$echChart).text(___detailData['system']);
						$('[data-role=appallSql]',$echChart).text(___detailData['database']);
						$('[data-role=appallElse]',$echChart).text(___detailData['other']);
						$('[data-role=appallHand]',$echChart).text(___detailData['today_hand']);
						$('[data-role=appallAll]',$echChart).text(___detailData['today_total']);
					}
			};
			/*小图展示*/
			var addsmallTem = function(){
				$healtyCtn.append($echChart);
				$('[data-role=appallSlName]',$echChart).text(___titlename);
				$('[data-role=appallSmallFine]',$echChart).text(___healty);
			}
			/*大图展示,设值展示样式*/
			var freshBigTem = function(){
				if(___healty<=30){
            		$('[data-role="appallFig"]',$echChart).css({"background-image":"url('img/health/healty-orange.png')"});
            		$('#healtyRorate1',$echChart).attr("class","bar1");
                	$('#healtyRorate',$echChart).attr("class","finebar30");
            	}  
            	if(___healty>30&&___healty<80){
            		$('[data-role="appallFig"]',$echChart).css({"background-image":"url('img/health/healty-blue.png')"});
            		$('#healtyRorate1',$echChart).attr("class","bar2");
                	$('#healtyRorate',$echChart).attr("class","bar60");
            	}
            	if(___healty>=80 && ___healty<=100){
            		$('[data-role="appallFig"]',$echChart).css({"background-image":"url('img/health/healty-green.png')"});
            		$('#healtyRorate1',$echChart).attr("class","bar3");
                	$('#healtyRorate',$echChart).attr("class","bar80");
            	}
				
				if(___isfavorite == "false"){
					$('[data-role=appallLiked]',$echChart).hide();
				}
				
				if(___isgotodetail == "true"){
					$('[data-role="appallFig"]',$echChart).css({"cursor": "pointer"});
					$('[data-role="appallFig"]',$echChart).click(function(){
						app.dispatcher.load(___loadpath);
						app.domain.exports(___loadRegion , ___loadExports);
					});
				}
				
				if(___isshowdetail == "true"){
					if(___showdetailFlag == '1'){
						$('#healtyshow',$echChart).show();
					}
					  $('.gotoevent',$echChart).hover(function(){
                      	if($('.gotobaseevent',this).text()>0){
                      		 $(this).addClass("ALL-health-hover");	
                      	}
                      });
                      $('.gotoevent',$echChart).click(function(){
                      	if($('.gotobaseevent',this).text()>0){ 
                      		var com = $(this).attr("data-config");
                      		var gototitle = $('.gototitle',this).text();
                      		var number = $('.gotobaseevent',this).text();
                      		if(com=="ALL"){
                      			if(___favoriteType == 'app'){
                          			var exportEventData = {"app_id":___appid,"app_c_name":___titlename,'event_status':['0','1'],"notequ_field_list":["event_type"],"event_type":['0']};
                      			}
                      			if(___favoriteType == 'group'){
                        			var exportEventData = {"app_supportgroup":___titlename,'event_status':['0','1'],"event_type":['0'],"notequ_field_list":["event_type"]};
                      			}
                      		}
                      		else if(com=="OTHER"){
                      			if(___favoriteType == 'app'){
                      				var exportEventData = {"app_id":___appid,"app_c_name":___titlename,'event_status':['0','1'],"notequ_field_list":["componenttype","event_type"],"componenttype":['APPLICATION','MIDDLEWARE','OS','DB'],"event_type":['0']};
                      			}
                      			if(___favoriteType == 'group'){
                        			var exportEventData = {"app_supportgroup":___titlename,'event_status':['0','1'],"event_type":['0'],"notequ_field_list":["componenttype","event_type"],"componenttype":['APPLICATION','MIDDLEWARE','OS','DB']};
                      			}
                      		}
                      		else if(com=="DayHand"){
                      			var startdate = new Date().Format('yyyyMMdd') +'000000';
                      			if(___favoriteType == 'app'){
                              		var exportEventData = {"app_id":___appid,"app_c_name":___titlename,'event_status':['2','3'],"startdate":startdate,"event_type":['0'],"notequ_field_list":["event_type"],"number":$('.gotobaseevent',this).text()};
                              		
                      			}
                      			if(___favoriteType == 'group'){
                            		var exportEventData = {"app_supportgroup":___titlename,'event_status':['2','3'],"startdate":startdate,"event_type":['0'],"notequ_field_list":["event_type"],"number":$('.gotobaseevent',this).text()};
                      			}
                      		}else if(com=="DayAll"){
                      			var startdate = new Date().Format('yyyyMMdd') +'000000';
                      			if(___favoriteType == 'group'){
                            		var exportEventData = {"app_supportgroup":___titlename,'event_status':['0','1','2','3'],"startdate":startdate,"event_type":['0'],"notequ_field_list":["event_type"],"number":$('.gotobaseevent',this).text()};
                      			}
                      			if(___favoriteType == 'app'){
                              		var exportEventData = {"app_id":___appid,"app_c_name":___titlename,'event_status':['0','1','2','3'],"startdate":startdate,"event_type":['0'],"notequ_field_list":["event_type"],"number":$('.gotobaseevent',this).text()};
                      			}
                      		}
                      		else{
                      			if(___favoriteType == 'app'){
                          			var exportEventData = {"app_id":___appid,"app_c_name":___titlename,'event_status':['0','1'],"componenttype":com,"event_type":['0'],"notequ_field_list":["event_type"]};
                      			}
                      			if(___favoriteType == 'group'){
                        			var exportEventData = {"app_supportgroup":___titlename,'event_status':['0','1'],"componenttype":com,"event_type":['0'],"notequ_field_list":["event_type"]};
                      			}
                      		}
                      		
                      		app.domain.exports("kpEvent",{'exportEventData':exportEventData,"number":number}); 
                          	app.dispatcher.load.apply(app.dispatcher,
                          			[___titlename+'-'+gototitle.substring(0,gototitle.length-1)+"-事件管理"].concat([ 'event' ]));  	
                      	}
                      }); 
                      
                      if(___showdetailFlag == '0'){
      					$('.health-content',$echChart).mouseover(function(){
      						/*$('',$echChart).css({"position":"absolute"});*/
      						$('#healtyshow',$echChart).show();
      					});
      					$('.health-content',$echChart).mouseout(function(){
      						$('#healtyshow',$echChart).hide();
      					});
      					
      				}
					
				}
				
				if(___isfavorite == 'true'){
					if(___liked=="true"){
                		$('[data-role="appallLiked"]',$echChart).css({'color':function(){
                			return '#fa594d'
                		}});	
                	}else{
                		$('[data-role="appallLiked"]',$echChart).css({'color':function(){
                			return '#E5E5E5'
                		}});
                	}
					
				}
				
				if(___favoriteType == "app"){
					$("[data-role=appallHead]",$echChart).dblclick(function(){
						var temtip = $(this).attr("data-tip");
						if(temtip=='1'){
							$(this).attr("data-tip",'2').text(___appid).addClass("selectableText");
						}
						if(temtip=='2'){
							$(this).attr("data-tip",'1').text(___titlename).removeClass("selectableText");
							
						}
					});
					
				}
				
			};
			/*小图展示设值展示样式*/
			var freshsmallTem =  function(){
				if(___healty<=30){
					$('[data-role="appallSlImg"]',$echChart).attr("src","img/health/cha.png");
            	}  
            	if(___healty>30&&___healty<80){
            		$('[data-role="appallSlImg"]',$echChart).attr("src","img/health/liang.png");
            	}
            	if(___healty>=80 && ___healty<=100){
            		$('[data-role="appallSlImg"]',$echChart).attr("src","img/health/you.png");
            	}
            	
            	if(___isfavorite == 'true'){
					if(___liked=="true"){
                		$('#appallLiked',$echChart).css({'color':function(){
                			return '#fa594d'
                		}});	
                	}else{
                		$('#appallLiked',$echChart).css({'color':function(){
                			return '#E5E5E5'
                		}});
                	}
					
				}
            	
            	if(___isgotodetail == "true"){
            		$('[data-role="gotoSystem"]',$echChart).css({"cursor":"pointer"});
					$('[data-role="gotoSystem"]',$echChart).click(function(){
						app.dispatcher.load(___loadpath);
						app.domain.exports(___loadRegion , ___loadExports);
					});
				}
            	if(___favoriteType =="app"){
            		$("[data-role=appallSlName]",$echChart).dblclick(function(){
            			var temtip = $(this).attr("data-tip");
            			if(temtip=='1'){
            				$(this).attr("data-tip",'2').text(___appid).addClass("selectableText");
            			}
            			if(temtip=='2'){
            				$(this).attr("data-tip",'1').text(___titlename).removeClass("selectableText");
            				
            			}
            		});
            		
            	}
            	
				
			}
			/*根据大图小图展示标识,调用不同方法展示*/
			if(___bigorsmall=='1'){
				addBigTem();
				freshBigTem();
			}
			if(___bigorsmall=='0'){
				addsmallTem();
				freshsmallTem();
			}
		};
		/*提供获取单个展示对象接口*/
		var getchart = function(){
			return $($echChart);
		}
		/*提供关注按钮对象获取接口*/
		var getfavorite = function(){
			var fa = $($("#appallLiked",$echChart)); 
			return fa;
		}
	
		var getCss = function(){
			var fa = $($(".health",$echChart)); 
			return fa;
			
		}
		loadhealty();
		return{
			getchart:getchart,
			getfavorite:getfavorite,
			getCss:getCss
			
		}
		}
		
		
		return {
			healtyshow:healtyshow
			
		}
		
	});

})();