/*!
 * Javascript library v3.0
 *
 * Date: 2015.02.17
 */

/**
 * [全局配置参数，所有可配置选项均在此js中]
 * @param  {[undefined]} undefined
 * @author lihao01@cfischina.com
 */
( /*<global>*/ function (undefined) {

(function (factory) {
	"use strict";

	//amd module
	if(typeof define === "function" && define.amd) {
		define(["jquery", "underscore", "backbone"], factory);
	}
	//global
	else{
		factory();
	}

})(function ($, _, Backbone) {
	"use strict";
	
	var remoteAddr = window.location.host, 
		remoteIp = remoteAddr.split(":")[0];
	
	return Backbone.Model.extend({
		
		defaults: {

			//app文件类型
			//值可选["app", "server"]
			//分表代表静态文件存储在app本地或从服务端加载
			appType: "app", 

			//当前版本号
			//若服务端版本号较高，且appType为本地app模式，则提示用户下载更新
			version: 0.1, 

			//是否输出debug日志
			//web控制台及android logcat可见
			debug: true, 

			//socketio服务端url地址
			socketUrl: "http://" + remoteIp + ":18081/"



		}, 
		
		initialize: function () {
			
			//版本有更新时，此处应下载新安装包
			this.on("change:version", function (model) {
				app.log("Download the newest version now?");
			});
		}, 
		
		getCookie: function (name) {
			if (document.cookie.length > 0) {
				var start = document.cookie.indexOf(name + "="), 
					end;
				if (start != -1){
					start = start + name.length + 1;
					end = document.cookie.indexOf(";", start);
					if (end == -1) {
						end = document.cookie.length;
					} 
					return document.cookie.substring(start, end);
				} 
			}
			return "";
		}, 

		/**
		 * [getUniqueId 获取唯一id]
		 */
		getUniqueId: function () {
			var sId = "",
				i = 24;
			for (; i--;) {
				sId += Math.floor(Math.random() * 16.0).toString(16).toUpperCase();
				if (i == 4) {
					sId += "-";
				}
			}
			return sId;
		}
	});
});
	
})();