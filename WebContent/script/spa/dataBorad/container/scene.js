/**
 * 场景编辑器
 * create-date: 2018-11-20
 * modify-time: 
 * author: 
 */
define(['echartsXy','tableXy'], function (echartsXy, tableXy) {
	
	/**
	 * 场景编辑器
	 * 属性：
	 * 
	 * 	1、sceneType：布局唯一标识
	 * 	2、current：当前需要实例化的对象
	 * 	3、$el：场景容器
	 * 	4、selected：当前选择组件
	 * 	5、component：场景组件
	 */
	
	let scene = function (opts) {
		this.sceneType = opts.sceneType;
		this.current = {};
		this.$el = opts.$el;
		this.select = null;
		this.componet = [];
		this._init();
	}
	
	scene.prototype = {
		'_init': function () {
			window.addEventListener('message', this._message.bind(this));
		},
		'shareContainer': function (ShareContainer) {
			let parent = ShareContainer.container;
			let outer = ShareContainer.el;
			let children = ShareContainer.children;		// 当前容器下只会有一个自己的对象
			let child = children ? children[0] : null;
			let tag = ShareContainer.tag;
			let key = ShareContainer.key;
			this._initxyCeil(parent, outer, child, key)
			this.current = null;
		},
		'_message': function (e) {
			if (e.data.uuid) {			// 通知删除元素
				this.deleteCom(e.data.uuid);
			}
		},
		'deleteCom': function (uuid) {
			this.componet = this.componet.filter(item => {
				return item.uuid !== uuid;
			})
			this.select = null;
		},
		'_initxyCeil': function (parent, outer, children, key, tag) {
			let obj = null;
			let type = children ? children.type : components.componentsType;
			let env = parent.env;
			let stageType = key;
			if (!stageType) {
				return;
			}
			let restore = false;
			if (env === "edit") {
				restore = true;
			}
			switch(type) {
				case 'echartsXy':
					obj = new echartsXy({$el: outer, renderType: 1, stageType: stageType, restore: restore, env: env});
					break;
				case 'tableXy':
					obj = new tableXy({$el: outer, renderType: 1, stageType: stageType, restore: restore, env: env});
					break;
			}
			if (!obj) return;
			if (parent && parent.type && parent.type === "tab" && !tag) {
				parent.tabs[parent.activeIndex].children.push(obj);
			}
			if (!tag) {
				parent.children.push(obj);
			}
			if (type === "tableXy") {
				outer.append(obj.charts.context[0].nTableWrapper);
			} else {
				outer.append(obj.dom);
			}
			if (children) {
				if(children.OptionConfig){
					children.OptionConfig = JSON.parse(JSON.stringify(children.OptionConfig),function(k,v){
						  if(v.indexOf && v.indexOf('function') > -1){
							     return eval("(function(){return "+v+" })()")
							  }
							  return v;
							});
				}
				for(var key in children) {
					obj[key] = children[key];
				}
			}
			this.select = obj;
			this.componet.push(obj);
			setTimeout( ()=> {
				obj.resize && obj.resize();
				this.resizeComponents();
			},10)
		},
		'resizeComponents': function () {
			this.componet.forEach(item => {
				item.resize && item.resize();
			})
		},
		'getSelect': function () {
			return this.select;
		},
		'find': function (id, treeNode) {
			let node = null;
			for(let i = 0 ; i < treeNode.length ; i ++ ) {
				if (treeNode[i].id === id) {
					node = treeNode[i];
					return node;
				} else {
					if (treeNode[i].children && treeNode[i].children.length > 0) {
						node = this.find(id, treeNode[i].children);
						if (node) {
							return node;
						};
					}
				}
			}
			return node;
		}
	}
	
	return scene;
})