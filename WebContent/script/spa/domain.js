/*!
 * Javascript library v3.0
 *
 * Date: 2015.04.03
 */

/**
 * FIXME 该对象中可添加默认域，首页的导出等可直接导入到默认域中；
 * FIXME 若导出的为方法，提供直接执行该方法的接口；
 * [页面间数据共享]
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author lihao01@cfischina.com
 */
( /*<global>*/ function (undefined) {

    (function (factory) {
        "use strict";

        //amd module
        if (typeof define === "function" && define.amd) {
            define(["jquery"], factory);
        }
        //global
        else {
            factory();
        }

    })(function ($) {
        "use strict";

        var domain = {
            /**
             * [session 初始化session存储字段]
             * @type {Object}
             */
            session: {},

            /**
             * [scope 页面间数据交互存储域]
             * @type {Object}
             */
            scope: {},

            /**
             * [exports 导出数据到全局共享域]
             * @param  {[type]} namespace        [命名空间]
             * @param  {[type]} datas        [字段json]
             */
            exports: function (namespace, datas) {
                if (!domain.scope[namespace]) {
                    domain.scope[namespace] = {};
                }

                if (datas) {
                    for (var name in datas) {
                        //修复缓存数据时，可能修改原先数据的bug
                        //清除缓存数据时，可能清除原先数据的bug
                        if (typeof datas[name] === 'string') {
                            //字符串
                            domain.scope[namespace][name] = '' + datas[name];
                        } else if ($.isArray(datas[name])) {
                            //数组
                            domain.scope[namespace][name] = [].concat(datas[name]);
                        } else if (typeof datas[name] === 'object') {
                            //对象
                            domain.scope[namespace][name] = $.extend(true, {}, datas[name]);
                        } else {
                            //函数
                            domain.scope[namespace][name] = datas[name];
                        }
                    }
                }
            },

            /**
             * [clearScope 根据id清除全局共享域中的数据]
             * @param  {[type]} namespace [命名空间]
             */
            clearScope: function (namespace) {
                if (domain.scope[namespace]) {
                    delete domain.scope[namespace];
                }
            },

            /**
             * [get 获取共享域中数据]
             * @param  {[type]} namespace  [命名空间]
             * @param  {[type]} name       [字段名]
             */
            get: function (namespace, name) {
                if (domain.scope[namespace]) {
                    return domain.scope[namespace][name];
                }
            },

            /**
             * [getSessionId 获取sessionId]
             */
            getSessionId: function () {
                // $.ajax({
                //     "method": "post",
                //     "async": false,
                //     "url": "SessionSyncAction_sessionId.do?random=" + new Date().getTime(),
                //     "success": function (data) {
                //         domain.sessionId = data.content.sessionId;
                //     }
                // });
            },
            /**
			 * [exportMenuParam 导出数据到全局共享域]
			 * @param  {[type]} datas   	    [字段json]
			 */
			exportMenuParam: function (datas) {
				var namespace = "menu";
				if(!domain.scope[namespace]) {
					domain.scope[namespace] = {};
				}

				if(datas) {
					for(var name in datas) {

						domain.scope[namespace][name] = datas[name];
					}
				}
			},
			/**
			 * [getScope 获取并清除全局共享域中的数据]
			 * @param  {[type]} namespace [命名空间]
			 */
			getMenuParam: function () {
				var namespace = "menu";
				if(domain.scope[namespace]) {
					var value = $.extend(true, {}, domain.scope[namespace]);
					delete domain.scope[namespace];
					return value;
				}
			}

        };

        return domain;
    });

})();