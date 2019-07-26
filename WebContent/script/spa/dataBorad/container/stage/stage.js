
/*
 *
 */
define(['util', 'require', 'container', 'row', 'echartsXy', 'tableXy'], function(util, require){
	
	var Container = require("container");
	var Row = require("row");
	var echartsXy = require("echartsXy");
	var tableXy = require("tableXy");
	
	function Stage(opts) {
		opts = opts || {};
		opts.key = util.genearteUUid();
		Container.call(this, opts);
		this.name = "交易容器";
		this.canAccept = 'container';
		this.html = '<div id="stageContainer" class="stage edit"></div>';
		this.type = 'Stage';
		this.opts = opts;
		this.wrap = this.opts.wrap;
		this.content = this.opts.content;
		this.attrType = ['背景'];
		this.container = 'stage';
		this._init();
	}


	Stage.prototype = {
        _generatorHtml: function () {
            var warp = $(this.wrap, this.content)[0];
            warp.innerHTML = this.html;
            this.$el = $("#stageContainer", $(this.content))[0];
            this.$el.style.backgroundColor = "#F0F2F5";
		},
		_render: function (com, position, el, coll) {
			var container = null;
        	switch (com) {
				case 'row':
					container = new Row({rendering: position, env: this.env, key: this.key});
					break;
				case 'panel':
					container = new Panel({env: this.env, key: this.key});
					break;
				case 'tab':
					container = new Tab({env: this.env, key: this.key});
					break;
				default:
					alert('原子组件不能放在交易组件上!');
					return;

            }
            switch (position) {
				case 'normal':
                    el.append(container.$el);
					break;
				case 'left':
					this.$el.insertBefore(container.$el, el);
					this._updateNode(coll, container.$el);
					break;
				case 'top':
					this.$el.insertBefore(container.$el, el);
					break;
				case 'right':
					el.after(container.$el);
					this._updateNode(coll, container.$el);
					break;
				case 'bottom':
					el.after(container.$el);
					break;
            }

            this.add(container);
		},
		_showEmpty: function () {
			//this.$el.innerHTML = this.emptyContent;
		},
		saveComponentsInfo: function() {
        	var list = this.children;
            var result = this.findContainer(list);
            return result;
		},
        findContainer: function(containerArr) {
            var result = [];
            for (let i = 0; i < containerArr.length; i++) {
                var attr = {};
                attr.type = containerArr[i].type;
                attr.cssText = containerArr[i].$el.style.cssText;
                attr.rendering = containerArr[i].rendering;
                attr.style = containerArr[i].style;
	            attr.title = containerArr[i].title;
                var bbox = containerArr[i].$el.getBoundingClientRect();
                attr.x = bbox.left;
                attr.y = bbox.top;
                attr.uuid = containerArr[i].uuid;
                // 获得类型 获得行间样式  获得渲染方式
                if (this.identifyType.includes(attr.type)) {
                	if (attr.type == "tab") {
                		attr.tabs = [];
                		for (let ii = 0; ii < containerArr[i].tabs.length; ii++) {
                			attr.tabs.push({
                				name: containerArr[i].tabs[ii].name,
                				children: this.findContainer(containerArr[i].tabs[ii].children)
                			});
                		}
                	} else if (containerArr[i].children) {
                        attr.children = this.findContainer(containerArr[i].children);
                    }
                } else {
                	attr.children = this.findComponentsOther(containerArr[i]);
                }
                result.push(attr);
            }

            // 将元素排序
            result = result.sort(function(a, b) {
                if (b.y != a.y) {
                    return a.y - b.y;
                }else {
                    return a.x - b.x;
                }
            });
            return result;
		},
		// 获取除了当前布局组件之外其他的组件
		findComponentsOther: function (component) {
			return [component.getComponents()];
		},
		restoreComponentsInfo: function(componentsInfo, ele){
        	var that = this;
            var list = this.restore(componentsInfo, ele || this.$el);
            if (list.length) {
                list.forEach(function(item){
                    that.add(item, !ele ? false : true);
                });
                if (ele) {
                	that.notifyAll(list[0]);
                } else {
                	that.notifyAll();
                }
                
            }
		},
		notifyAll: function(list) {
			var component = this;
			this.findSingerNotify(list || component, list ? true : false);
		},
		findSingerNotify: function(component, tag) {
        	var list = component.children;
        	if (!list) {
        		return;
        	}
			for (var i = list.length - 1; i >= 0; i--) {
				if (list[i].tips) {
					this.notify(list[i].el, component, list[i].children, tag);
					list.splice(i, 1);
				} else {
					if (list[i].type == "tab") {
						for (var j = 0; j < list[i].tabs.length; j++) {
							this.findSingerNotify(list[i].tabs[j]);
						}		
					} else {
						list[i].children && list[i].children.length && this.findSingerNotify(list[i]);
					}
				}
			}
		},
        restore: function(list, ele) {
            var type = null;
            var container = null;
            var conArr = [];
            if (!list) return conArr;
            for (var i = 0; i < list.length; i++) {
                type = list[i].type;
                switch (type) {
                    case 'row':
                        container = new Row({rendering: list[i].rendering, env: this.env, key: this.key});
                        break;
                    case 'panel':
                        container = new Panel({rendering: list[i].rendering, style: list[i].style, title: list[i].title, env: this.env, key: this.key});
                        break;
                    case 'tab':
                        container = new Tab({rendering: list[i].rendering, env: this.env, tabs: list[i].tabs, key: this.key});
                        break;
					default:
						container = this.createEmpty(list[i].rendering, true);
						break;
                }
                container.uuid = list[i].uuid;
                container.$el.style.cssText = list[i].cssText;
                ele.append(container.$el);
                if (this.identifyType.includes(type) && list[i].children && list[i].children.length) {
                    var el = container.$el.querySelector('.'+container.container) || container.$el;
                    container.children = this.restore(list[i].children, el);
                }
                if (type == "tab") {
                	//debugger;
                	for (var j = 0; j < list[i].tabs.length; j++) {
                		var tabel = container.$el.querySelectorAll("." + container.container)[j];
                		container.tabs[j].children = this.restore(list[i].tabs[j].children, tabel);
                	}
                }
                if (this.identifyType.includes(type)) {
                    conArr.push(container);
				} else {
					conArr.push({el: container.$el, tips: true, children: list[i].children});
				}
            }

            return conArr;
		}
	}

	util.inherits(Stage, Container);
	
	Object.defineProperties(Stage.prototype, {
    	backgroundColor: {
            get: function () {
                return this.$el.style.backgroundColor;
            },
            set: function (value) {
                this.$el.style.backgroundColor = value;
            }
        }
    })
	
	return Stage;
	
});