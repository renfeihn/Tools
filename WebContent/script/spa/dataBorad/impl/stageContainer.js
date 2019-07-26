/**
 * 公共类 拖拽容器
 */


define(['require','util','EventEmitter','Menu','componentTimer','GridStackUI','gridstack'], 
		function (require, util, EventEmitter,  Menu, ComponentTimer) {
	
	let DashItem = function () {};
	
	let stageContainer = function(opts = {}) {
		this.container = opts.container;
		this.opts = opts;
		this.edit = opts.edit !== undefined ? opts.edit:true;
		this.children = [];
		this.menu = new Menu(opts.container, {parent: this});		/* 菜单操作 */
		this.emit = new EventEmitter();								/* 发布订阅者模式 */
	}
	
	let fn = stageContainer.prototype;
	require(['dashItem'], function(_DashItem){
		DashItem = _DashItem;
	})
	
	/**
	 * 初始化
	 */
	fn._init = function () {
		this.$el = document.createElement('div');
		this.$el.className = this.id;
		this.$el.setAttribute('id', this.id);
		this.$el.innerHTML = '<div class="grid-stack" style="position: relative;"></div>';
		this.container.appendChild(this.$el);
		this._initDrag();
		this._initEmit();
		this._initEvent();
	}
	
	/**
	 * 初始化容器
	 */
	fn._initDrag = function () {
		let that = this;
		let $gridster = $("#"+this.id + '>div', $(this.container));
		this.gridster = $gridster.gridstack({
			verticalMargin: 5,
			animate: true,
			width: 24,
			cellHeight: 10,
			float: true,
			disableDrag: !this.edit,
			disableResize: !this.edit,
			resizable: {
				handles: 'all'
			}
		}).data('gridstack');
		$gridster.on('gsresizestop', this.resizeStop.bind(this));
		$gridster.on('dragstop', this.dragStop.bind(this));
		$gridster.on('change', this.change.bind(this));
		
	}
	
	fn.destory = function () {
		this.gridster && this.gridster.destroy && this.gridster.destroy()
		let lists = this.getListsByArray(this.children);
		lists.forEach(item => {
			item.clearInterval && item.clearInterval();
		})
	}
	
	fn.resizeStop = function (e, ui) {
		e.stopPropagation();
		if (!ui) {
			return;
		}
		var id = ui.id;
		var dataset = ui.dataset;
		this.setChildrenConfig(id, dataset);
		this._resizeItem(id);
	}
	
	fn.dragStop = function(e, ui) {
		e.stopPropagation();
		var id = ui.id;
		var dataset = ui.dataset;
		this.setChildrenConfig(id, dataset);
	}
	
	fn.change = function (e, uis) {
		e.stopPropagation();
		uis && uis.forEach(item => {
			var ui = item.el[0];
			if (ui) {
				var id = ui.id;
				var dataset = ui.dataset;
				this.setChildrenConfig(id, dataset);
			}
		})
	}
	
	/* 修改属性配置 */
	fn.setChildrenConfig = function(id, dataset) {
		this.children = this.children.map(item => {
			if (item.uuid === id) {
				item.row = parseInt(dataset.gsX);
				item.col = parseInt(dataset.gsY);
				item.sizex = parseInt(dataset.gsWidth);
				item.sizey = parseInt(dataset.gsHeight);
			}
			return item;
		})
	}
	
	
	/* 添加容器 */
	fn.addItem = function (opts = {}) {
		let config = JSON.parse(JSON.stringify(opts));
		let uuid = opts.uuid || util.genearteUUid();
		config = Object.assign({params: this.params}, config, {parent: this, container: this.container,uuid}, {edit: this.edit});
		var item = new DashItem(config);
		this.children.push(item);
		this.gridster.addWidget($(item.$el), item.row, item.col, item.sizex, item.sizey, true);
		this.addActiveClass($(item.$el));
	}
	
	fn.addActiveClass = function () {
		
	}
	
	
	fn._initEmit = function () {
		
		/**
		 * 选择组件类型出发事件
		 */
		let that = this;
		this.emit.on('selectType', function (e) {
			that.operateItem = e.uuid;
			var data = {
				type: e.type,
				bbox: e.bbox
			}
			util.showOrHideEdit($("#showEDitor", that.opts.$el),'active', data);
		})
		/**
		 * 组件操作
		 */
		this.emit.on('operateItem', function (e) {
			that.operateItem = e.id;
			that.menu.setPosition(e.pageX, e.pageY, e.id);
		})
		/**
		 * 删除
		 */
		this.emit.on('delItem', function (e) {	
			that.operateItem = e.id;
			that._removeItem(e.id);
		})
		/**
		 * 编辑
		 */
		this.emit.on('editItem', function (e) {
			that.operateItem = e.id;
			var item = that._getItemById(e.id)[0];
			var Bbox = that._getBbox($(item.$el).find('.content')[0]);
			var bbox = {
				width: Bbox.width,
				height: Bbox.height,
			}
			if (item) {
				app.selectComponents = item.component;
				var data = {
					type: item.component.type,
					bbox: bbox
				}
				util.showOrHideEdit($("#showEDitor", that.opts.$el),'active', data);
			}
		})
		/**
		 * 查看事件
		 */
		this.emit.on('eventItem', function (e) {
			that.operateItem = e.id;
			that._eventItem(e.id);
		})
		/**
		 * 清空
		 */
		this.emit.on('setEmpty', function (e) {
			that.operateItem = e.id;
			that._setEmpty(e.id);
		})
		/**
		 * 刷新频率
		 */
		this.emit.on('setInterval', function (e) {
			that.operateItem = e.id;
			that._setInterval(e.id);
		})
		
	}
	
	/* 查看事件 */
	fn._eventItem = function (id) {
		var item = this._getItemById(id)[0];
		if (item) {
			app.currentEvent = item;
			window.postMessage({eventConfig: true}, '*')
		}
	}
	
	fn.getEventAction = function (item) {
		var eventList = item.eventList;
		var eventListType = item.eventListType;
		var eventAction = [];
		eventList.forEach(item => {
			eventListType.forEach(type => {
				eventAction.push({
					name: item.name + type.name,
					value: item.value + '-' + type.value
				})
			})
		})
		return eventAction;
	}
	
	fn.getEventField = function (uuid) {
		let lists = this.getListsByArray(this.children);
		lists = lists.filter(item => {
			return item.uuid === uuid;
		})
		if (lists && lists.length) {
			return lists[0];
		}
		return null;
	}
	
	/* 刷新频率 */
	fn._setInterval = function (id) {
		var item = this._getItemById(id)[0];
		if (item) {
			app.currentInterval = item;
			window.postMessage(Object.assign({}, {showInterval: true}), '*')
		}
	}
	
	/* 删除 */
	fn._removeItem = function (id) {
		var item = this._getItemById(id)[0];
		if (item) {
			item.delComponents();
			this.gridster.removeWidget($(item.$el));
			this.children = this.children.filter(item => {
			  return item.uuid !== id;
			})
		}
	}
	
	fn.destory = function () {
		this.gridster.destroy();
		this.$el.remove();
	}
	
	
	/* 清空 */
	fn._setEmpty = function (id) {
		var item = this._getItemById(id)[0];
		item.delComponents();
	}
	
	fn._getItemById = function (uuid) {
		return this.children.filter(item => {
			return item.uuid === uuid;
		})
	}
	
	/* 获取到配置  */
	fn.getLists = function () {
		var lists = [];
		this.children.forEach(item => {
			lists.push(item.getConfig());
		})
		lists = GridStackUI.Utils.sort(lists);
		return lists;
	}
	
	
	/* 设置配置 */
	fn.setLists = function (lists) {
		this.gridster && this.gridster.removeAll();
		this.children = [];
		lists.forEach(item => {
			if (this.type === 'card') {
				this.setCardItem(item);
			} else {
				this.addItem(item);
			}
		})
	}
	
	fn._getBbox = function(dom) {
		return dom.getBoundingClientRect();
    }
	
	/* 公共resize函数 */
	fn.resize = function() {
		this.children.forEach(item => {
			item.resize();
		})
	}
	
	fn._resizeItem = function (id) {
		var item = this._getItemById(id)[0];
		item.resize();
	}
	
	fn.getOption = function () {
		return {};
	}
	
	/**
	 * 查询到组件的最父类节点dashItem
	 */
	fn.getLeafByParentDashItem = function (base) {
		if (!base)  return null; 
		if (base instanceof DashItem) {
			return base;
		}
		if (!base.opts)  return null; 
		return this.getLeafByParentDashItem(base.opts.parent);
	}
	
	fn._initEvent = function () {
		let that = this;
		$(this.$el).on('click', function () {
			app.selectCardItem = that;
			$(".components-active").removeClass('components-active')
			$(this).addClass('components-active');
			window.postMessage({cardSelect: true}, '*');
		})
	}
	
	return stageContainer;
	
})
