/*!
 * Javascript library v3.0
 *
 */

/**
 * [无数据遮罩]
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
		

    	var showLoading = function($ctn){
    		$('.nodata-ctn',$ctn)&&$('.nodata-ctn',$ctn).remove();
    		if($ctn.css('position')!=="relative"&&$ctn.css('position')!=="absolute"){
    			$ctn.css({position:"relative"});
    		}
    		var html = '<div class="nodata-ctn"><img src="./img/echarts/nodata.png"></div>';
    		$ctn.prepend(html);
    	}
    	var hideLoading = function($ctn){
    		$('.nodata-ctn',$ctn)&&$('.nodata-ctn',$ctn).remove();
    	}
		
		return {
			showLoading: showLoading,
			hideLoading:hideLoading
		}
	});

})();