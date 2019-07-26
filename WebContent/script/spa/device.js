/*!
 * Javascript library v3.0
 *
 * Date: 2015.03.03
 */

/**
 * [设备类型及部分设备参数]
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
	
	var 
	
	//浏览器HTTP请求代理头
	sUserAgent = String(navigator.userAgent).toLowerCase(), 
	//客户端操作系统
	sPlatform = String(navigator.platform).toLowerCase(), 
	
	//windows
	aWins = ["win32", "windows"], 
	//mac
	aMacs = ["mac68k", "macppc", "macintosh", "macintel"], 
	//unix
	sUnix = "x11", 
	//linux
	sLinux = "linux", 
	//android
	sAndroid = "android", 
	//ios iphone
	sIphone = "iphone os", 
	//ios ipad
	sIpad = "ipad", 
	
	/**
	 * [fnInArray jQuery isArray]
	 */
	fnInArray = function (elem, arr, i) {
		var len;

		if ( arr ) {
			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	};

	return (function () {

		var _fnIsWin = function () {
			return fnInArray(sPlatform, aWins) != -1;
		};

		var _fnIsMac = function () {
			return fnInArray(sPlatform, aMacs) != -1;
		};

		var _fnIsUnix = function () {
			return (sPlatform === sUnix) && !this.isWin() && !this.isMac()
		};

		var _fnIsLinux = function () {
			var bLinux = sPlatform.indexOf(sLinux) > -1, 
				bAndroid = sUserAgent.indexOf(sAndroid) > -1;
			return bLinux && !bAndroid;
		};
		
		var _fnIsAndroid = function () {
			var bLinux = sPlatform.indexOf(sLinux) > -1, 
				bAndroid = sUserAgent.indexOf(sAndroid) > -1;
			return bLinux && bAndroid;
		};

		var _fnIsIphone = function () {
			return sUserAgent.indexOf(sIphone) > -1;
		};

		var _fnIsIpad = function () {
			return sUserAgent.indexOf(sIpad) > -1;
		};

		var dev = {
			win: _fnIsWin(), 
			mac: _fnIsMac(), 
			unix: _fnIsUnix(), 
			linux: _fnIsLinux(), 
			android: _fnIsAndroid(), 
			iphone: _fnIsIphone(), 
			ipad: _fnIsIpad(), 
			pc: _fnIsWin() || _fnIsMac() || _fnIsUnix() || _fnIsLinux()
		};
		
		dev.appInv = function (func, args) {
			if((dev.android || dev.iphone || dev.ipad) && func) {
				func.apply({}, args ? args : []);
			}
		};
		
		dev.expInv = function (func, args) {
			if(dev.pc && func) {
				func.apply({}, args ? args : []);
			}
		};
		
		return dev;

	})();
	
});
	
})();