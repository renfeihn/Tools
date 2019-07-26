/*!
 * Javascript library v3.0
 * 使用说明：
 * 			var eventFloatTip = new app.eventFloatTip.eventFloatTip({   
				handler:handler,
				$context:$el,
				selector:'.sysstart-module',//图表容器
				datalist:[{"name":"事件类型：","value":"2"},{"name":"事件渠道：","value":"1"},
	        	             {"name":'指标类型：',"value":"1"},{"name":"系统名称：","value":"1"}]
			});
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
		
		var eventFloatTip = function(options){
			var ___handler = options.handler,
				___$context = options.$context,
				___selector = options.selector,
				___datalist = options.datalist,
				___eventEl = options.eventEl;
				;
			
			var  $healtyCtn = $(___selector,___$context),
				 $echChart,$echChart1,$echChart2 
				 ;
			 
			
		var loadTip = function(){
			/*通过ajax获取html模板*/
			$.ajax({
				url:'./module/plugin/eventTip.html',
				contentType:"application/x-www-form-urlencoded;charset=utf-8;",
				type:"POST",
				async:false,
				dataType:"html",
				success:function(data){
					var $a = $(data);
					$echChart = $($a[2]); 
					$echChart1  = $($a[4]);
					$echChart2  = $($a[6]);
				}
			});
			if(___datalist!=null&&___datalist!='undefined'){
				if(___eventEl!=null&&___eventEl!='undefined'){
					$healtyCtn.append($echChart2);
				}
				$healtyCtn.append($echChart);
				$healtyCtn.append($echChart1);
				$.each(___datalist, function(index,val) {
					var list = '<tr>'+
					'<td class="table-td1">'+val.name+'</td>'+
					'<td class="table-td2">'+val.value+'</td>'+'</tr>';
					$("[data-role=tabledetail]",$echChart1).append(list);
				});
			}
			 
			
			
			/***事件信息悬浮框 START*/
			var floatEvent = $("#eventImg",$echChart);
			var floatClose = $("#floatClose",$echChart);
			var iconClose = $("#iconClose",$echChart);
			/*鼠标移入移出改变删除按钮颜色样式操作*/
 			$('#iconClose',$echChart).mouseover(function(){
 			$('#iconClose',$echChart).removeClass('icon-white');
				$('#iconClose',$echChart).addClass('icon-gray');
			});
			$('#iconClose',$echChart).mouseout(function(){
				$('#iconClose',$echChart).addClass('icon-white');
				$('#iconClose',$echChart).removeClass('icon-gray');
			});
			/*鼠标移入移出显示隐藏关闭按钮*/
			 $echChart.mouseover(function(){
				$('#iconClose',$echChart).removeClass('hide');
			});
			  $echChart.mouseout(function(){
				$('#iconClose',$echChart).addClass('hide');
			});
			$("#eventImg",$echChart).click(function(){
				$echChart1.removeClass('hide');
				 $echChart.addClass('hide');
			});
			$("#floatClose",$echChart1).click(function(){
				 $echChart1.addClass('hide');
				 $echChart.removeClass('hide');
			});
			iconClose.click(function(){
				 $echChart.addClass('hide');
			});
			/***事件信息悬浮框 END*/
			/**事件详情缩略框start**/
			 $('#minEventDetail',$echChart2).click(function(){ debugger; 
				 $('[data-role="eventDtlTemp"]' , ___eventEl).modal('show');
				/*var eventid = $('.eventdetail-float',$echChart2).data("id");
				$('.body-autoHeight',$echChart2).css("overflow-x","hidden");
				
				$('#Id',$eventEl).val(eventid);
				$eventEl.eventDetails('loadChart',$eventEl);
				$eventEl.eventDetails('relatedSys',$eventEl); */
				 
			});
		    $('#minflag',$echChart2).click(function(){
		    	if($('#minEventDetail',$echChart2).css('display')=='block'){
		    		$('#minEventDetail',$echChart2).css('display','none');
		        	$(this).css({'right':'10px','bottom':'10px'});
		    	}else{
		    		$('#minEventDetail',$echChart2).css('display','block');
		        	$(this).css({'right':'256px','bottom':'188px'});
		    	}
			}); 
			/**事件详情缩略框end**/
			
			
		};
		/*提供获取单个展示对象接口*/
		var getchart = function(){
			return $($echChart);
		}
		loadTip();
		return{
			getchart:getchart
		}
		}
		
		
		return {
			eventFloatTip:eventFloatTip
			
		}
		
	});

})();