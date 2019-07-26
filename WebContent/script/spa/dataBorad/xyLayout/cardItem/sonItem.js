/**
 * 子卡片
 */

define(['util','stageContainer'], function (util, StageContainer) {
	
	let SonContent = function () {}
	
	let SonItem = function (opts = {}) {
		StageContainer.call(this, opts);
		this.type = 'card';
		this.eventList = [{
			name: '卡片',
			value: 'card'
		}]
		this.eventListType = [{
			name: '点击',
			value: 'click'
		},{
			name: '双击',
			value: 'dblclick'
		}]
		this.id = opts.uuid || ('sonItem' + new Date().getTime());
		this._init()
		this.option = opts.option;
		this.config = opts.config;
	}
	
	let fn = SonItem.prototype;
	
	require(['sonContent'], function(_SonContent){
		SonContent = _SonContent;
	})
	
	fn.setCardItem = function (config) {
		if (!config.uuid) {
			config.uuid = util.genearteUUid();
		}
		config = Object.assign({}, config, {parent: this}, {edit: this.edit})
		let cardItem = new SonContent(config);
		this.children.push(cardItem);
		this.addItem(cardItem);
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
			cellHeight: 5,
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
	
	fn.getOption = function () {
		return this.option;
	}
	
	fn.getConfig = function () {
		return this.config;
	}
	
	fn.addItem = function (item) {
		this.gridster.addWidget($(item.$el), item.row, item.col, item.sizex, item.sizey);
		$(item.$el).attr('style','position: absolute;');
		this.addActiveClass($(item.$el));
	}
	
	util.inherits(SonItem, StageContainer);
	
	
	Object.defineProperties(SonItem.prototype, {
		option: {
			get: function () {
        		return this.getLists()
        	},
        	set: function (lists) {
        		lists = GridStackUI.Utils.sort(lists);
        		this.setLists(lists);
        	}
        },
        config: {
        	get: function () {
                return {
                	backgroundColor: this.backgroundColor
                }
            },
            set: function (config) {
            	this.configOpt = config;
            	config && Object.keys(config).forEach(key => {
            		this[key] = config[key];
            	})
            }
        },
        backgroundColor: {
        	set: function (backgroundColor) {
        		this.$el.style.backgroundColor = backgroundColor
        	},
        	get: function () {
        		return this.$el.style.backgroundColor;
        	}
        }
	})
	
	return SonItem;
	
})