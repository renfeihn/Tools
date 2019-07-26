/*
* ! Javascript library v3.0
*
* Date: 2015.02.17
*/

/**
 * [路由] [监听url，根据hash变化决定页面跳转 ]
 *
 * @param {[undefined]}
 *            undefined [undefined]
 * @author lihao01@cfischina.com
 */
(/* <global> */
	function(undefined) {

		(function(factory) {
			"use strict";

			// amd module
			if ( typeof define === "function" && define.amd) {
				define(["jquery", "underscore", "backbone", "handler3"], factory);
			}
			// global
			else {
				factory();
			}

		})(function($, _, Backbone, Handler3) {
			"use strict";

			var Dispatcher3 = function() {
				var dispatcher = this;

				// 考虑到我们业务的复杂度，此处不开启全量缓存，
				// 仅对部分dom元素处理或页面流程极复杂的特殊页面采用缓存策略
				this.cache = {};

				// 存储所有页面模板的文件夹名
				this.modulesPath = "module";

				// 首页模板位置
				// 当hash值匹配为空时，默认进入该模板
				this.loginModule = "login";

				// 存储当前页面模块的handler
				this.currentHandler = undefined;

				// url分隔符
				this.separator = "/";

				// 页面流程配置文件名
				// 所有模块下均应存在此配置文件，用于页面展现和流程控制
				this.mvvmConfName = "mvvm.json";

				// 模板展现位置
				this.fullRenderTo = "#spa-page-full";
				this.frameRenderTo = "#afaPageFrame";

				// 当前模板是否全屏
				this.fullScreen = false;

				// 目前考虑如下error模块
				// |--error
				// |--404
				// |--500
				// |--default
				this.modulePath404 = "module/error/404/";
				require(["script/lib/text!./" + this.modulePath404 + this.mvvmConfName], function(mvvmConf) {
					dispatcher.mvvm404 = mvvmConf;
				});
			};

			Dispatcher3.prototype = {

				constuctor : Dispatcher3,

				/**
				 * 缓存传递给页面的参数
				 */
				cacheParams : function(params) {
					this.params = params;
				},

				/**
				 * [routeModule 当hash变化时触发此方法]
				 *
				 * @param {[string]}
				 *            moduleId []
				 * @param {[string]}
				 *            section []
				 * @param {[string]}
				 *            subSection []
				 * @param {[string]}
				 *            id []
				 */
				/**
				 * 两种接口，第一种是（标题，模块ID[，section[,子section]]） 第二种接口，（options{ title:标题，
				 * String moduleId:模块ID, String section String or Array }）
				 */

				load : function(opt, moduleId, section, subSection) {
					var dtd = $.Deferred();

					var title,
					    tabId,
					    sections = [],
					    modulePath = this.modulesPath + this.separator,
					    mvvmConfPath = "",
					    renderTo = "",
					    handler =
					    undefined,
					    dispatcher = this;

					if ( typeof (opt) === 'object') {
						title = opt.title;
						if (opt.moduleId) {
							sections.push(opt.moduleId);
							if (opt.section) {
								(opt.section instanceof Array) ? ( sections = sections.concat(opt.section)) : sections.push(opt.section);
							}
						}
						tabId = opt.id;
					} else {
						title = opt;
						// 此处不能直接遍历arguments，因为index为3的位置存在args参数
						for (var i = 1; i < 4; i++) {
							// 任意参数为null时，只取该参数之前的路径
							if (arguments[i]) {
								sections.push(arguments[i]);
							} else {
								break;
							}
						}
					}

					// 设置是否为全屏页面
					if (sections.length > 0) {
						modulePath += (sections.join(this.separator) + this.separator);
						renderTo = opt.frameRenderTo || this.frameRenderTo;
						this.fullScreen = false;
					} else {

					}

					mvvmConfPath += (modulePath + this.mvvmConfName);

					var params = this.params;
					// 补充传递参数
					require(["script/lib/text!./" + mvvmConfPath + "?" + new Date().getTime()], function(mvvmConf) {
						if (opt.frameRenderTo) {
							handler = new Handler3(mvvmConf, modulePath, opt.frameRenderTo, $.extend(opt.params, params), opt.context,title);
							handler.cacheId = opt.id;
						} else {
							var containerId = app.tab.open(title, sections.join("-"), tabId);
							try {
								if (containerId) {
									// 根据配置，生成handler
									// handler负责：
									// 维护M层数据、VM层数据页面双向绑定、生成V层
									// 控制页面流转
									// 维护页面template生命周期
									handler = new Handler3(mvvmConf, modulePath, "#" + containerId);
									handler.cacheId = containerId;
								} else {
									return;
								}
							} catch (e) {
								handler = new Handler3(dispatcher.mvvm404, dispatcher.modulePath404, "#" + containerId);
								handler.stepTo(0);
								handler.cacheId = containerId;
							}
						}

						// 此处为handler绑定唯一id，后续handler的日志输出均打印此id，方便追踪同一模块下的日志
						handler.uid = app.global.getUniqueId();

						// 此处增加异步回调解决，当start方法结束后才更新dispatcher的currentHandler
						$.when(handler.load()).done(function() {
							dispatcher.currentHandler = handler;
							// app.shelter.hide();
						}).always(function() {
							dtd.resolve();
						});
					});
					return dtd;
				},

				unload : function(cacheId) {
					var handler = this.cache[cacheId];
					if (handler) {
						handler.unload();
					} else if (this.currentHandler && this.currentHandler.unload) {
						this.currentHandler.unload();
						this.currentHandler = null;
					}

				},

				pause : function() {
					this.currentHandler && this.currentHandler.pause() && (this.cache[this.currentHandler.cacheId] = this.currentHandler);
				},

				resume : function(cacheId) {
					var handler = this.cache[cacheId];

					if (handler) {
						handler.resume();
						this.currentHandler = handler;
						delete this.cache[cacheId];
					} else {
						throw new Error("no cache found!");
					}
				},

				/**
				 * [getContextPath 根据url获取pathname]
				 */
				getContextPath : function() {
					var sPathName = document.location.pathname,
					    i = sPathName.substr(1).indexOf("/");

					return i == -1 ? "/" : sPathName.substr(0, i + 1);
				},

				getCurrentHandler : function() {
					return this.currentHandler;
				}
			};

			return Dispatcher3;

		});

	})();
