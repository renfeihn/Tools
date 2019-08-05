/*!
 * Javascript library v3.0
 *
 * Date: 2015.02.17
 */

/**
 * [生成V层]
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
	else{
		factory();
	}

})(function ($, _, Backbone) {
	"use strict";
	
	/**
	 * [V]
	 * @param handler      [当前handler]
	 * @param templatePath [页面模板路径，仅为记录日志]
	 * @param template     [页面模板string]
	 */
	var V = function (handler, templatePath, template, bootstrap) {
		
		var View = Backbone.View.extend({
			
			template: _.template(template), 
			
			//FIXME Hand over this to vm
			events: {
				"click [data-toggle=next]": function () {
					handler.nextStep();
				}, 
				"click [data-toggle=prev]": function () {
					handler.prevStep();
				}
			}, 
			
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
							//handler.log(templatePath + "页面状态由[" + model.previous("status") + "]变更为[" + model.get("status") + "]");
							if(model.get("status") === view.lifeCycle.LOAD) {
								// handler.log(templatePath + "页面加载完成");
							}
							app.common.logHistory(model.get("status"),handler.title);
							//触发监听
							view.trigger(model.get("status"));
							
						});
					}
					
				}))();

				//Bind the callback of module, the params should be an instance of Backbone.Model
				//此处绑定view的load与unload事件，并触发模块中对应方法
				//模块中this对象指向view
				view.on(view.lifeCycle.LOAD, function () {
                    if(bootstrap&&bootstrap.load){
                        bootstrap.load.apply(view, [view.$el.parent(), handler.model.attributes, handler]);
                    }else if(app&&app.alert&&handler&&handler.renderTo&&handler.renderTo.substr) {
                        app.tab.close(handler.renderTo.substr(1));
                    }
				});
				
				//触发此方法时，页面元素以及model均被销毁
				view.on(view.lifeCycle.UNLOAD, function () {
                    if (bootstrap && bootstrap.unload) {
                        bootstrap.unload.apply(view, [handler]);
                    }
                });
				
				//用于暂停页面中可能存在的循环等操作
				view.on(view.lifeCycle.PAUSE, function () {
                    if (bootstrap && bootstrap.pause) {
                        bootstrap.pause.apply(view, [view.$el.parent(), handler.model.attributes, handler]);
                    }
                });
				
				//用于唤醒页面，比如重新获取数据等，重新开始循环等
				view.on(view.lifeCycle.RESUME, function () {
                    if (bootstrap && bootstrap.resume) {
                        bootstrap.resume.apply(view, [view.$el.parent(), handler.model.attributes, handler]);
                    }
                });
				
			}, 
			
			/**
			 * [render]
			 * @return {[Backbone.View]}
			 */
			render: function () {
				
				//原先此处直接使用的this.setElement(this.template());
				//但是这样导致部分事件无法委托，故修改如下
				if (this.$el) this.undelegateEvents();
				this.$el.html(this.template());
				this.el = this.$el[0];
				this.delegateEvents();
				
				return this;
			}, 
			
			unload: function () {
				this.lifeCycle.set("status", this.lifeCycle.UNLOAD);
				
				this.$el&&this.$el.remove();
				this.$el = null;
				this.el = null;
				bootstrap = null;
				
				handler.stopAsyncEvent();
				
				handler.timeouts = [];
				handler.intervals = [];
			}, 
			
			pause: function () {
				this.lifeCycle.set("status", this.lifeCycle.PAUSE);
				
				handler.stopAsyncEvent();
			}, 
			
			resume: function () {
				this.lifeCycle.set("status", this.lifeCycle.RESUME);
				
				handler.startAsyncEvent();
			}
			
		});
		
		return View;
	};
	
	return V;
});
	
})();