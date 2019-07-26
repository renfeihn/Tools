/*!
 * Javascript library v3.0
 *
 * Date: 2015.10.13
 */

/**
 * [首页网格]
 * @param  {[undefined]} undefined [undefined]
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
	else {
		factory();
	}

})(function ($, _, Backbone) {
	"use strict";
	
	var Grid = function (el, template) {
		this.$el = $(el);
		this.$template = $(template);
		
		this.$template.removeClass("hide");
	};
	
	Grid.V = function (grid, handler, option, template, bootstrap, params, removeEvent) {
		
		var View = Backbone.View.extend({
			
			template: _.template(template), 
			
			/**
			 * [initialize 初始化页面View并绑定生命周期]
			 */
			initialize: function () {
				
				//此处为view添加Backbone.Model
				//用以保存当前view生命周期，并触发各模块创建View时启动的监听
				var view = this;

				view.lifeCycle = new (Backbone.Model.extend({
					ORIGINAL: "original", 
					PAUSE: "pause", 
					LOAD: "load", 
					RESUME: "resume", 
					UNLOAD: "unload", 
					
					defaults: {
						status: "original"
					}, 
					
					initialize: function () {
						this.on("change:status", function (model) {

							//触发监听
							view.trigger(model.get("status"));
							
						});
					}
					
				}))();

				//Bind the callback of module, the params should be an instance of Backbone.Model
				//此处绑定view的load与unload事件，并触发模块中对应方法
				//模块中this对象指向view
				view.on(view.lifeCycle.LOAD, function () {
                    if(bootstrap && bootstrap.load) {
                        bootstrap.load.apply(view, [view.$el.parent(), params, handler]);
                    }
				});
				
				//触发此方法时，页面元素以及model均被销毁
				view.on(view.lifeCycle.UNLOAD, function () {
                    if(bootstrap && bootstrap.unload) {
                        bootstrap.unload.apply(view, [handler]);
                    }
				});
				
				//用于暂停页面中可能存在的循环等操作
				view.on(view.lifeCycle.PAUSE, function () {
                        if(bootstrap && bootstrap.pause) {
                            bootstrap.pause.apply(view, [view.$el.parent(), params, handler]);
                        }
				});
				
				//用于唤醒页面，比如重新获取数据等，重新开始循环等
				view.on(view.lifeCycle.RESUME, function () {
                    if (bootstrap && bootstrap.resume) {
                        bootstrap.resume.apply(view, [view.$el.parent(), params, handler]);
                    }
                });
				
				handler.view = view;
				view.bootstrap = bootstrap;
				grid.handlers.push(handler);
			}, 
			
			/**
			 * [render]
			 * @return {[Backbone.View]}
			 */
			render: function () {
				var view = this;
				
				//原先此处直接使用的this.setElement(this.template());
				//但是这样导致部分事件无法委托，故修改如下
				if (this.$el) this.undelegateEvents();
				
				this.$el.html(grid.$template.clone());
				$("#hm-header-title", this.$el).empty().append(option.title);
				
				$("#hm-header-remove", this.$el).click(function () {
					view.unload();
					
					removeEvent();
				});
				
				$("#hm-body", this.$el).append($(this.template()));
				
				this.el = this.$el[0];
				this.delegateEvents();
				
				return this;
			}, 
			
			/**
			 * [unload view被销毁时调用]
			 * @return {[type]} [description]
			 */
			unload: function () {
				this.lifeCycle.set("status", this.lifeCycle.UNLOAD);
				
				this.$el && this.$el.remove();
				this.$el = null;
				this.el = null;
				bootstrap = null;
				
				handler.stopAsyncEvent();
				
				handler.timeouts = [];
				handler.intervals = [];
			}, 
			
			/**
			 * [pause 当前view暂停时调用]
			 * @return {[type]} [description]
			 */
			pause: function () {
				this.lifeCycle.set("status", this.lifeCycle.PAUSE);

				handler.stopAsyncEvent();
			}, 
			
			/**
			 * [resume 当前view被唤醒时调用]
			 * @return {[type]} [description]
			 */
			resume: function () {
				this.lifeCycle.set("status", this.lifeCycle.RESUME);

				handler.startAsyncEvent();
			}, 
			
			/**
			 * [resize 当前view大小变更时调用]
			 * @return {[type]} [description]
			 */
			resize: function () {
				if (this.bootstrap && this.bootstrap.resize&&this.$el) {
					this.bootstrap.resize.apply(this, [this.$el.parent()]);
                }
			}
			
		});
		
		return View;
	};
	
	Grid.Handler = function () {
		
		this.intervals = [];
		this.timeouts = [];
		
		var AsyncEvent = function (func, time) {
			this.func = func;
			this.time = time;
			this.windowId = 0;
			this.uniqueId = 0;
			
			this.equals = function (asyncEvent) {
				if (asyncEvent && asyncEvent.uniqueId && asyncEvent.uniqueId != 0)
					return false;
				
				return this.uniqueId === asyncEvent.uniqueId;
			};
		};
		
		/**
		 * [setTimeout description]
		 * @param {[type]} func    [description]
		 * @param {[type]} timeout [description]
		 */
		this.setTimeout = function(func, timeout) {
			var handler = this, 
				event = new AsyncEvent(func, timeout), 
				timeoutId = window.setTimeout.apply(window, [function () {
					func();
					
					handler.removeAsyncEvent(handler.timeouts, event.uniqueId);
				}, timeout]);
			
			event.windowId = timeoutId;
			event.uniqueId = app.global.getUniqueId();
			
			this.timeouts.push(event);
			
			return event.uniqueId;
		}; 
		
		/**
		 * [clearTimeout description]
		 * @param  {[type]} uniqueId [description]
		 * @return {[type]}          [description]
		 */
		this.clearTimeout = function (uniqueId) {
			var event = this.getAsyncEvent(this.timeouts, uniqueId);
			
			window.clearTimeout.call(window, event.windowId);
			
			this.removeAsyncEvent(this.timeouts, event.uniqueId);
		};
		
		/**
		 * [setInterval description]
		 * @param {[type]} func     [description]
		 * @param {[type]} timespan [description]
		 */
		this.setInterval = function (func, timespan) {
            var handler = this,
                event = new AsyncEvent(func, timespan),
				intervalId = window.setInterval.apply(window, [func, timespan]);
			
			event.windowId = intervalId;
			event.uniqueId = app.global.getUniqueId();
			
			this.intervals.push(event);
			
			return event.uniqueId;
		};
		
		/**
		 * [clearInterval description]
		 * @param  {[type]} uniqueId [description]
		 * @return {[type]}          [description]
		 */
		this.clearInterval = function (uniqueId) {
			var event = this.getAsyncEvent(this.intervals, uniqueId);
			
			window.clearInterval.call(window, event.windowId);
			
			this.removeAsyncEvent(this.intervals, event.uniqueId);
		}; 
		
		/**
		 * [stopAsyncEvent description]
		 * @return {[type]} [description]
		 */
		this.stopAsyncEvent = function () {
			for (var i in this.intervals) 
				window.clearInterval.call(window, this.intervals[i].windowId);
			
			for (var i in this.timeouts) 
				window.clearTimeout.call(window, this.timeouts[i].windowId);
		};
		
		/**
		 * [startAsyncEvent description]
		 * @return {[type]} [description]
		 */
		this.startAsyncEvent = function () {
			for (var i in this.intervals) {
				var event = this.intervals[i];
				
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
		}; 
		
		/**
		 * [removeAsyncEvent description]
		 * @param  {[type]} arr      [description]
		 * @param  {[type]} uniqueId [description]
		 * @return {[type]}          [description]
		 */
		this.removeAsyncEvent = function (arr, uniqueId) {
			for (var i in arr) {
				if (arr[i].uniqueId === uniqueId) {
					arr[i] = null;
					arr.splice(i, 1);
				} 
			}
		};
		
		/**
		 * [getAsyncEvent description]
		 * @param  {[type]} arr      [description]
		 * @param  {[type]} uniqueId [description]
		 * @return {[type]}          [description]
		 */
		this.getAsyncEvent = function (arr, uniqueId) {
			for (var i in arr) {
				if (arr[i].uniqueId === uniqueId) {
					return arr[i];
				} 
			}
		};
	};
	
	/**
	 * [prototype 网格对象]
	 * @type {Object}
	 */
	Grid.prototype = {
		constructor: Grid, 

		config: function (items) {
			this.items = items;
		}, 
		
		/**
		 * [handlers 网格中所有单元格的handler]
		 * @type {Array}
		 */
		handlers: [], 

		getItem: function (type) {
			return this.items[type];
		}, 
		
		/**
		 * [bind 为某个单元格绑定模块]
		 * @param  {[type]} $target     [单元格对应的jquery对象]
		 * @param  {[type]} option      [初始config时定义的参数]
		 * @param  {[type]} params      [需要传递到模块中的参数]
		 * @param  {[type]} removeEvent [当触发删除事件时的回调方法]
		 * @return {[type]}             []
		 */
		bind: function ($target, option, params, removeEvent) {
			var grid = this;
			
			require(["script/lib/text!./module" + option.path + "/cell.html" + "?" + new Date().getTime(), 
			         "./module" + option.path + "/cell.js" + "?" + new Date().getTime()], function (template, bootstrap) {
				var handler = new Grid.Handler(), 
					view = new (Grid.V(grid, handler, option, template, bootstrap, params, removeEvent))(), 
					$page;
				
				if(view.lifeCycle.get("status") === view.lifeCycle.ORIGINAL) {
					//触发Backbone.View的render方法(默认)
					view.render.apply(view, []);
				}
				
				$page = ($.type(view) === "string") ? $(view) : view.$el;
				$($target).append($page);
				
				setTimeout(function () {
					view.lifeCycle.set("status", view.lifeCycle.LOAD);
				}, 0);
				
			});
		}, 
		
		/**
		 * [pause description]
		 * @return {[type]} [description]
		 */
		pause: function () {
			for(var i = 0; i < this.handlers.length; i++) {
				this.handlers[i].view.pause();
			}
		}, 
		
		/**
		 * [resume description]
		 * @return {[type]} [description]
		 */
		resume: function () {
			for(var i = 0; i < this.handlers.length; i++) {
				this.handlers[i].view.resume();
			}
		}, 
		
		/**
		 * [resize description]
		 * @return {[type]} [description]
		 */
		resize: function () {
			for(var i = 0; i < this.handlers.length; i++) {
				this.handlers[i].view.resize();
			}
		}, 
		
		/**
		 * [destroy description]
		 * @return {[type]} [description]
		 */
		destroy: function () {
			for(var i = 0; i < this.handlers.length; i++) {
				this.handlers[i].view.unload();
			}
		}
	};

	return Grid;
});
	
})();