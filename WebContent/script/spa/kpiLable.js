/*!
 * Javascript library v3.0
 *
 */

/**
 * 指标LABLE插件
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author 
 */
( /*<global>*/ function (undefined) {

	(function (factory) {
		"use strict";
		//amd module
		if(typeof define === "function" && define.amd) {
			define(["jquery"], factory);
		}
		//global
		else{
			factory();
		}

	})(function () {
		"use strict";
		
		var kpiLable = function(options){
			options = $.extend({
				url:'BaseAction_setBaseData.do'
			} , options);
			
			var ___options = options,//选项对象
			___selector = ___options.selector,//添加到的dom对象jq选择器
			___$context = ___options.$context,//插件内选择器的作用域
			___handler = ___options.handler,//页面的handler对象
			___intervalId,//定时器id
			___params = ___options.urlParams,//请求数据参数
			___appendFlag = ___options.appendFlag||false,
			$lable;
			//根据创建kpilable的dom对象
			var createLable = function(){
				//$lable = 
				var temp = '<div class="kpi-lable-ctn">'+
								'<div class="kpi-lable-title">无数据</div>'+
								'<div class="kpi-lable-name">无数据</div>'+
								'<div class="kpi-lable-value">-</div>'+
							'</div>';
				$lable = $(temp);
			}
			
			//往kpilable的dom对象中填充数据
			var updateLable = function(data,initFlag){
				var invild = ': ';
				!$lable&&createLable();
				if(initFlag){
					$lable.find('.kpi-lable-title').text(data.kpiObj);
					$lable.find('.kpi-lable-name').text(data.kpiName);
				}
				$lable.find('.kpi-lable-value').text(data.kpiValue);
			}
			
			var appendLable = function(selector){
				var thisSelector = selector||___options.selector;
				$(thisSelector,___$context).append($lable);
			}
			
			var lableInterval = function(updateTime){
				var thisUpdateTime = ___options.updateTime||updateTime||'120000';
				___intervalId = ___handler.setInterval(loadData,thisUpdateTime);
			}
			
			
			var loadData = function(initFlag){
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': ___options.url,
					'dataType': 'json',
					'data': {"reqParams":JSON.stringify(___params)},
					'success': function (data) {
						if (data && data.status) {
							var kpiData = data.content.chartsData;
							updateLable(kpiData,initFlag);
							if(initFlag){
								if(___appendFlag){
									appendLable();
								}
								lableInterval(kpiData.updateTime);
							}
						}else{
							app.alert('提示', data.errorMsg || '初始化加载错误', app.alertShowType.ERROR);
						}
					}
				});
			}
			
			var getLable$ = function(){
				createLable();
				return $lable;
			}
			
			var start = function(){
				loadData(true);
			}
			
			var dispose = function(){
				___handler.clearInterval(___intervalId);
				$lable.off('mouseout').off('mouseleave');
				$lable.remove();
				___intervalId = null;
			}
			
			return {
				start:start,
				dispose:dispose,
				getLable$:getLable$,
				appendLable:appendLable
			}
		}
		
		return {
			kpiLable:kpiLable
		}
	});

})();