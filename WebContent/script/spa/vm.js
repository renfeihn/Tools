/*!
 * Javascript library v3.0
 *
 * Date: 2015.02.17
 */

/**
 * [生成VM层]
 * 
 * @param {[undefined]}
 *            undefined [undefined]
 * @author lihao01@cfischina.com
 */
( /* <global> */function(undefined) {

	(function(factory) {
		"use strict";

		// amd module
		if (typeof define === "function" && define.amd) {
			define([ "jquery", "underscore", "backbone" ], factory);
		}
		// global
		else {
			factory();
		}

	})(function($, _, Backbone) {
		"use strict";

		/**
		 * [VM]
		 * 
		 * @param view
		 *            [独立view]
		 * @param model
		 *            [公共model]
		 */
		var VM = function(view, model) {
			var vm = this;
			
			/**
			 * [sync2m 同步数据至公共model] FXIME 此处缺少格式校验
			 * 是否应考虑每个页面模块对应一个VM，并将VM中独立的M同步更新至公共M
			 * 当前实现中各个流程页面共用一个M层，并且仅有一个VM对其进行关联管理
			 */
			this.sync2m = function() {
				view.$el.find("[data-toggle=text]").each(function() {
					model.set($(this).attr("id"), $(this).val());
				});
			};

			/**
			 * [sync2v 同步公共model中数据至页面展现]
			 */
			this.sync2v = function() {
				view.$el.find("[data-echo=value],[data-echo=html]").each(function() {
					if ($(this).attr("data-echo") === "value") {
						$(this).val(model.get($(this).attr("id")));
					} else {
						$(this).html(model.get($(this).attr("id")));
					}
				});
			};

			/**
			 * [bindView 为当前vm重新绑定view]
			 * 
			 * @param {[Backbone.View]}
			 *            currView
			 */
			this.bindView = function(currView) {
				view = currView;
			};
			
			this.getView = function () {
				return view;
			};
			
			this.unload = function () {
				model = null;
				view.unload();
			};
			
			this.pause = function () {
				view.pause();
			};
			
			this.resume = function () {
				view.resume();
			};

			// FIXME 此处应提供多种方法进行页面元素和数据的关联绑定
		};
		return VM;
	});

})();