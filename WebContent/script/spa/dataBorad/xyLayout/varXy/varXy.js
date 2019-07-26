/**
 * 图标xy布局组件
 */
define(['util','itemComponent'], function (util, ItemComponent) {
	if (!window.variable) {
		window.variable = 0;
	}
	window.variable ++;
	let varXy = function (opts = {}) {
		ItemComponent.call(this, opts);
		this.name = "变量";
		this.type = "var";
		this.attrType = ["字体","尺寸位置","事件",'数据扩展'];
		this.eventList = [{
			name: '整体',
			value: 'row'
		}]
		this.eventListType = [{
			name: '点击',
			value: 'click'
		},{
			name: '双击',
			value: 'dblclick'
		},{
			name: '鼠标移入',
			value: 'hover'
		}]
		this.variable = '$' + window.variable ++ ;
		this._init(opts);
		this.config = opts.config || {};
		this.option = opts.option || this.variable;
	}
	varXy.prototype = {
		_init(opts) {
			this.dom = document.createElement('div');
			this.dom.innerHTML = this.variable;
			this.dom.className = 'var-style';
			this.dom.setAttribute('data-variable-name', this.variable);
			this.dom.style.textAlign = "center";
			Object.keys(opts).forEach(key => {
				this[key] = opts[key];
			})
		},
		getConfig () {
			return this.config;
		},
		getOption () {
			return this.option;
		},
		destory () {
			this.dom.remove();
		},
		resize () {
			
		},
		addEvenList (eventList) {
			if (!eventList) {return}
			var eventAction = {};
			eventList.forEach(item => {
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
	
	
	util.inherits(varXy, ItemComponent);
	
	
	Object.defineProperties(varXy.prototype, {
		option: {
			get: function () {
				return this.optionOpt || this.variable;
        	},
        	set: function (option) {
        		this.dom.innerText = option || '';
    			this.optionOpt = option;
        	}
        },
        config: {
        	get: function () {
        		var config = this.configOpt || {};
    			config = Object.assign(config, {
    				color: this.color,
    				InnerText: this.InnerText,
    				fontSize: this.fontSize,
    				writingMode: this.writingMode,
    				backgroundColor: this.backgroundColor,
    				uuid: this.uuid,
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
        color: {
        	set: function (color) {
        		this.dom.style.color = color
        	},
        	get: function () {
        		return this.dom.style.color;
        	}
        },
        writingMode: {
        	set: function (writingMode) {
        		this.dom.style.writingMode = writingMode
        	},
        	get: function () {
        		return this.dom.style.writingMode;
        	}
        },
        fontSize: {
        	set: function (fontSize) {
        		this.dom.style.fontSize = `${fontSize}px`;
        	},
        	get: function () {
        		return parseInt(this.dom.style.fontSize);
        	}
        },
        backgroundColor: {
        	set: function (backgroundColor) {
        		this.dom.style.backgroundColor = backgroundColor
        	},
        	get: function () {
        		return this.dom.style.backgroundColor;
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
	
	return varXy;
});