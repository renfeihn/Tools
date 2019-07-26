/**
 * echarts xy 布局管理器
 */
define(['echarts', 'lineCharts','util','itemComponent'], 
		function (echarts, lineCharts, util, ItemComponent) {
	let echartsXy = function  (opts = {}) {
		ItemComponent.call(this, opts);
		this.name = "图表";
		this.attrType = ['事件'];
		this.type = 'echarts';
		this.eventList = [{
			name: '图形',
			value: 'charts'
		}]
		this.eventListType = [{
			name: '点击',
			value: 'click'
		},{
			name: '双击',
			value: 'dblclick'
		}]
		this.charts = null;
		this._init();
		this.option = opts.option || JSON.parse(lineCharts);
		this.config = opts.config || {};
	}
	
	echartsXy.prototype = {
		_init () {
			this.dom = document.createElement('div');
			this.dom.className = 'xy-echarts';
			!this.charts && (this.charts = echarts.init(this.dom));
		},
		getDom () {
			return this.dom;
		},
		getInfo () {
			return {
				type: this.type,
				config: this.config
			}
		},
		destory () {
			this.charts && this.charts.dispose();
			this.dom.remove();
		},
		resize () {
			this.charts && this.charts.resize();
		},
		setOption () {
			this.charts && this.charts.clear();
			this.charts && this.charts.setOption(this.option);
		},
		getConfig () {
			return this.config;
		},
		getOption () {
			return this.option;
		},
		addEvenList (eventList) {
			if (!eventList) {return}
			var eventAction = {};
			eventList && eventList.forEach(item => {
				if (!eventAction[item.eventAction]) {
					eventAction[item.eventAction] = [];
				}
				eventAction[item.eventAction].push(item);
			})
			this.addInsertEvent(eventAction);
		},
		addInsertEvent (eventAction) {
			Object.keys(eventAction).forEach(key => {
				var fun = key.split('-')[1];
				this.delegaEvent(fun ,eventAction[key]);
			})
		},
		delegaEvent (fun, eventList) {
			let that = this;
			this.charts.off(fun);
			this.charts.on(fun, function(data) {
				var seriesName = data.seriesName;
				var text = data.value;
				var value = {};
				eventList.forEach(item => {
					if (item.eventField === seriesName) {
						value[item.componentsField] = {
							text: text,
							eventComponents: item.eventComponents
						};
					}
				})
				that.setEventByComponents(value);
			})
		},
	}
	
	util.inherits(echartsXy, ItemComponent);
	
	Object.defineProperties(echartsXy.prototype, {
		option: {
			get: function () {
				return this.optionOpt || {}
        	},
        	set: function (option) {
        		this.optionOpt = option;
    			this.setOption();
        	}
        },
        config: {
        	get: function () {
        		var config = this.configOpt || {};
    			config = Object.assign(config, {
    				uuid: this.uuid,
    				event: this.event,
    				inter: this.inter
    			})
    			return config;
            },
            set: function (config) {
            	this.configOpt = config;
            	Object.keys(config).forEach(item => {
    				this[item] = config[item];
    			})
            	this.setAjax();
            }
        },
        event: {
        	get: function () {
        		return this.eventConfig;
            },
            set: function (event) {
            	this.eventConfig = event;
            	this.addEvenList(event);
            }
        },
        inter: {
        	get: function () {
        		return this.interval;
        	},
        	set: function (inter) {
        		this.interval = inter;
        		this.setInterval(inter)
        	}
        }
	})
	
	return echartsXy;
	
})