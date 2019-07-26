/*!
 * Javascript library v3.0
 *
 * Date: 2015.02.17
 */

/**
 * [路由转发后，移交给handler处理]
 * @param  {[type]} undefined
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
	
	/**
	 * [Handler]
	 * @param {[string]} module     [json字符串，该json中存储的是url hash对应的页面流程]
	 * @param {[string]} modulePath [模块路径]
	 * @param {[string]} renderTo   [模板展现位置]
	 */
	var Handler2 = function (module, modulePath, renderTo, params, context,title) {
		try{
			//mvvm.json文件为开发人员手动配置，此处校验json格式
			module = JSON.parse(module);
		}catch(e) {
			throw new Error("mvvm.json中的json数据格式有误(" + e.message + ")");
		}
		
		//此处简单校验配置逻辑
		var result = validateModule(module);
		if(result.length > 0) {
			throw new Error(result.join("|"));
		}
		return new Handler2.fn.init(module, modulePath, renderTo, params, context,title);
	};
	
	Handler2.AsyncEvent = function (func, time) {
		this.func = func;
		this.time = time;
		this.windowId = 0;
		this.uniqueId = 0;
		
		this.equals = function (asyncEvent) {
			if (asyncEvent && asyncEvent.uniqueId && asyncEvent.uniqueId != 0)
				return false;
			
			return this.uniqueId === asyncEvent.uniqueId;
		};
	}
	
	Handler2.fn = Handler2.prototype = {
		
		constructor: Handler2, 
		
		/**
		 * [init 初始化handler]
		 * @param {[string]} module     [json中存储的是url hash对应的页面流程]
		 * @param {[string]} modulePath [模块路径]
		 */
		init: function (module, modulePath, renderTo, params, context,title) {

			this.module = module;
			this.modulePath = modulePath;
			
			//记录当前步数
			this.currentStep = 0;
			//记录最大可跳转步数
			//
			this.availableStep = 0;
			
			//基础数据Model
			//当前页面流程所有数据信息均存储在此模块
			//FIXME 此处的Model不应该默认为空，应该有菜单传递过来的参数
			this.model = new (Backbone.Model.extend({}))();
			
			// 补充传递参数
			this.model.attributes = $.extend({},params,this.model.attributes);
			
			//页面template绑定
			this.renderTo = renderTo;
			this.$context = context;
			
			//生成el的方法
			this.viewRender = "render";
			//页面的标题
			this.title = title;
			//当前页面模块
			this.currentView = undefined;
			
			//此处记录handler管理的当前页面中所有异步事件
			this.intervals = [];
			this.timeouts = [];
			
		}, 

		/**
		 * [load 流程开始]
		 * @return {[object]} [异步回调返回]
		 */
		load: function () {
			return this.stepTo(0);
		}, 
		
		/**
		 * [resume 重新载入当前步骤(缓存被载入时调用)]
		 */
		resume: function () {
			this.vm.resume();
		}, 
		
		/**
		 * [pause 暂停当前模块]
		 */
		pause: function () {
			var that = app.dispatcher2.cache[this.cacheId];
			if (that) 
				that = null;

			app.dispatcher2.cache[this.cacheId] = this;
			
			this.vm.pause();
		}, 
		
		/**
		 * [destroy 销毁模块]
		 */
		unload: function () {
			var that = app.dispatcher2.cache[this.cacheId];
			if (that) 
				that = null;
			
			//clear leaks
			this.vm.unload();
		}, 
		
		/**
		 * [nextStep 下一步]
		 * @return {[object]} [异步回调返回]
		 */
		nextStep: function () {
			return this.stepTo(++this.currentStep);
		}, 
		
		/**
		 * [prevStep 上一步]
		 * @return {[object]} [异步回调返回]
		 */
		prevStep: function () {
			return this.stepTo(--this.currentStep);
		}, 
		
		/**
		 * [stepTo 跳转至第step步]
		 * @param  {[integer]} step [步数]
		 * @return {[object]} 		[异步回调返回]
		 */
		stepTo: function (step) {
			var oFlow = this.module.flows[step], 
				oView = this.module.views[oFlow.id], 
				oModel = oFlow.context && this.module.models[oFlow.context], 
				handler = this, 
				dtd = $.Deferred();
			
			//若存在绑定，则根据页面数据更新数据模型
			this.vm && this.vm.sync2m();
			
			//异步载入页面模板以及页面js
			require(["v", "vm", "script/lib/text!./" + this.modulePath + oView.template + "?" + new Date().getTime(), 
					 this.modulePath + oView.js + "?" + new Date().getTime()], function (V, VM, template, bootstrap) {
				//根据模板生成Backbone.View，并为View绑定生命周期
				var view = new (V(handler, oView.template, template, bootstrap))();
				
				//加载页面，触发页面状态监听
				handler.domReady(view);
				
				//页面生成结束，此处为生成或更新vm绑定
				if(handler.vm) {
					handler.vm.bindView(view);
				} else {
					handler.vm = new VM(view, handler.model);
				}
				//根据数据更新页面展现
				handler.vm.sync2v();
				
				//当前页面流程步数
				handler.currentStep = step;

				dtd.resolve();
			});

			return dtd.promise();
		}, 
		
		/**
		 * [domReady 加载dom]
		 * @param  {[object]} view      [Backbone.View 模块view]
		 */
		domReady: function (view) {
			//clear leaks
			if(this.vm && this.vm.getView()) {
				this.vm.getView().unload();
			}
			
			//view为原始状态时，需执行render方法以生成Dom
			if(view.lifeCycle.get("status") === view.lifeCycle.ORIGINAL) {
				//触发Backbone.View的render方法(默认)
				view[this.viewRender].apply(view, []);
			}
			
			//Dom装载
			this.loadPage(view);
			
			//fire the load func
			setTimeout(function () {
				view.lifeCycle.set("status", view.lifeCycle.LOAD);
			}, 0);

			//dom绑定完成，事件触发结束，设置router中currentView为当前view
			this.currentView = view;
		}, 
		
		/**
		 * [loadPage 装载页面模板]
		 * @param  {[object]} view [Backbone.View]
		 */
		loadPage: function (view) {
			var $page = ($.type(view) === "string") ? $(view) : view.$el;

            $page.find('[data-switcher]').bootstrapSwitch('d');

			//FIXME 此处可对所有模块页面添加公共部分，如页头路径等，暂未处理
			$(this.renderTo, this.$context).html($page);
		}, 
		
		/**
		 * [log 记录日志，增加id输出]
		 * @param  {[string]} info [日志内容]
		 */
		log: function (info) {
			app.log("[" + this.uid + "] " + info);
		}, 
		
		setTimeout: function(func, timeout,immediately) {
            if(immediately&&(typeof func === 'function')) func();

			var handler = this, 
				event = new Handler2.AsyncEvent(func, timeout), 
				timeoutId = window.setTimeout.apply(window, [function () {
					func();
					
					handler.removeAsyncEvent(handler.timeouts, event.uniqueId);
				}, timeout]);
			
			event.windowId = timeoutId;
			event.uniqueId = app.global.getUniqueId();
			
			this.timeouts.push(event);
			
			return event.uniqueId;
		}, 
		
		clearTimeout: function (uniqueId) {
            var event = this.getAsyncEvent(this.timeouts, uniqueId);

            if(event) {
                window.clearTimeout.call(window, event.windowId);
                this.removeAsyncEvent(this.timeouts, event.uniqueId);
            }
        },
		
		setInterval: function (func, timespan,immediately) {
            if(immediately&&(typeof func === 'function')) func();

            var event = new Handler2.AsyncEvent(func, timespan),
				intervalId = window.setInterval.apply(window, [func, timespan]);
			
			event.windowId = intervalId;
			event.uniqueId = app.global.getUniqueId();
			
			this.intervals.push(event);
			
			return event.uniqueId;
		}, 
		
		clearInterval: function (uniqueId) {
			var event = this.getAsyncEvent(this.intervals, uniqueId);

            if(event){
                window.clearInterval.call(window, event.windowId);
                this.removeAsyncEvent(this.intervals, event.uniqueId);
            }
		}, 
		
		stopAsyncEvent: function () {
			for (var i in this.intervals) 
				window.clearInterval.call(window, this.intervals[i].windowId);
			
			for (var i in this.timeouts) 
				window.clearTimeout.call(window, this.timeouts[i].windowId);
		}, 
		
		startAsyncEvent: function () {
			for (var i in this.intervals) {
				var event = this.intervals[i];
				
				if(event && event.func && typeof event.func === 'function')
					event.func();
				
				event.windowId = window.setInterval.call(window, event.func, event.time); 
			}
			
			for (var i in this.timeouts) {
				var event = this.timeouts[i], 
				handler = this;
				
				event.windowId = window.setTimeout.call(window, function () {
					event.func();
					
					handler.removeAsyncEvent(handler.timeouts, event.uniqueId);
				}, event.time);
			}
		}, 
		
		removeAsyncEvent: function (arr, uniqueId) {
			for (var i in arr) {
				if (arr[i].uniqueId === uniqueId) {
					arr[i] = null;
					arr.splice(i, 1);
				} 
			}
		}, 
		
		getAsyncEvent: function (arr, uniqueId) {
			for (var i in arr) {
				if (arr[i].uniqueId === uniqueId) {
					return arr[i];
				} 
			}
		}
		
	};
	
	Handler2.fn.init.prototype = Handler2.fn;
	
	/**
	 * [validateModule 校验module]
	 * @param  {[object]} module [json]
	 * @return {[array]}         [errors]
	 */
	var validateModule = function (module) {
		var error = [], 
			flows = module.flows, 
			views = module.views, 
			models = module.models;
		
		if(!module.views) {
			error.push("views必须定义！");
		}
		
		if(!module.models) {
			error.push("models必须定义！");
		}
		
		if(!($.isArray(module.flows) && module.flows.length > 0)) {
			error.push("flows必须为长度大于0的数组！");
		}else {
			$.each(module.flows, function (index, flow) {
				if(!flow.id) {
					error.push("flows中位置为" + index + "的流程需包含关联view的id！");
				}else {
					if(module.views && !module.views[flow.id]) {
						error.push("flows中位置为" + index + "的流程id关联的view未在views中定义！");
					}
				}
				
				if(module.models && flow.context && !module.models[flow.context]) {
					error.push("flows中位置为" + index + "的流程context关联的model未在models中定义！");
				}
			});
		}
		
		return error;
	};
	
	return Handler2;
});
	
})();