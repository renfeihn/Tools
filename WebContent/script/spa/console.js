/*!
 * Javascript library v3.0
 *
 * Date: 2015.02.17
 */

/**
 * [日志记录]
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author lihao01@cfischina.com
 */
( /*<global>*/ function (undefined) {

(function (factory) {
	"use strict";

	//amd module
	if(typeof define === "function" && define.amd) {
		define(factory);
	}
	//global
	else{
		factory();
	}

})(function () {
	"use strict";
	
	/**
	 * [dateFormat 根据格式处理日期]
	 * @param  {[date]}   date [需格式化的日期]
	 * @param  {[string]} fmt  [格式]
	 * @return {[string]}      [格式化后的日期字符串]
	 */
	var dateFormat = function(date, fmt) {
		var o = {
			"yyyy": date.getFullYear(),
			"mm": date.getMonth() + 1,
			"dd": date.getDate(),
			"hh": date.getHours(),
			"mi": date.getMinutes(),
			"ss": date.getSeconds()
		};
		for (var k in o) {
			var regexp = new RegExp(k, "gi");
			if (regexp.test(fmt))
				fmt = fmt.replace(regexp, (o[k] + "").length === 1 ? "0" + o[k] : o[k]);
		}
		if (/ms/gi.test(fmt)) {
			var _ms = date.getMilliseconds();
			fmt = fmt.replace(/ms/gi, ("000" + _ms).substr((_ms + "").length));
		}
		return fmt;
	};
	
	return function (debug) {
		this.log = function (info) {
			//是否允许输出日志及是否存在console
			if (debug && window.console && window.console.log) {
				window.console.log(
						"(" + 
						dateFormat(new Date(), "yyyy-mm-dd hh:mi:ss ms") + 
						") " + info);
			}
		};
	};
	
});
	
})();