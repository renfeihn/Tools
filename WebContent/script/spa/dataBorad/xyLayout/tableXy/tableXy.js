/**
 * echarts xy 布局管理器
 */
define(['dataTables','util','itemComponent'], function (dataTables, util, ItemComponent) {
	let tableXy = function  (opts = {}) {
		ItemComponent.call(this, opts);
		this.name = "表格";
		this.type = "table";
		this.attrType = ['事件'];
		this.eventList = [{
			name: '行',
			value: 'tr'
		},{
			name: '列',
			value: 'tr td'
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
		this.charts = null;
		this._init(opts);
		opts['option'] = opts.option || {};
		this.config = opts.config || {};
		this.option = $.isEmptyObject(opts.option) ? JSON.parse(dataTables) : opts.option;
	}
	
	tableXy.prototype = {
		_init (opts) {
			this.dom = document.createElement('table');
			this.dom.className = 'xy-table display dataTable table no-footer gfzq';
			this.dom.setAttribute('id','table_'+new Date().getTime());
			this.dom.style.tableLayout = 'auto';
		},
		getDom () {
			return this.charts.context[0].nTableWrapper;
		},
		getConfig () {
			return this.config;
		},
		getOption () {
			return this.option;
		},
		destory () {
			this.charts && this.charts.context[0].nTableWrapper.remove();
		},
		setOption (option) {
			this.charts && this.charts.destroy();
			this.dom.innerHTML = "";
			this.charts = $(this.dom).DataTable(option);
			var config = this.config;
			if (config.tableDatas && config.tableDatas.length) {
				this.addData(config.tableDatas);
			}
			return this.charts;
		},
		addData (datas) {
			this.charts && this.charts.rows.add(datas).draw();
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
				var pos = key.split('-')[0];
				var fun = key.split('-')[1];
				this.delegaEvent(fun, pos ,eventAction[key]);
			})
		},
		delegaEvent (fun, pos, eventList) {
			let that = this;
			$(this.dom).off(fun);
			$(this.dom).on(fun, pos,function(e) {
				e.stopPropagation();
				var data;
				if (pos === 'tr') {
					data = that.charts.row($(this)).data();
				} else if (pos === 'tr td') {
					data = that.charts.row($(this).parents('tr')).data();
				}
				var value = {};
				eventList.forEach(item => {
					var text = data[item.eventField];
					value[item.componentsField] = {
						text: text,
						eventComponents: item.eventComponents
					};
				})
				that.setEventByComponents(value);
			})
		},
	}
	
	util.inherits(tableXy, ItemComponent);
	
	Object.defineProperties(tableXy.prototype, {
		option: {
			get: function () {
				return this.optionOpt || {}
        	},
        	set: function (option) {
        		this.optionOpt = option || JSON.parse(dataTables);
    			this.setOption(option);
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
	
	return tableXy;
	
})