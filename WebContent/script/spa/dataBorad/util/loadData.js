/**
 * 数据请求层
 * 
 * opts 参数说明
 * 
 * urlData: 请求参数（日志中包含 search， startTime， endTime， cate， logType， size， from）
 * currentType: 当前组件类型（目前包含 echartsXy， tableXy， card）
 * outerType：点击编辑时，进行组件的类型
 * config：组件配置
 * 
 */

define(['echartsXy', 'tableXy', 'card', 'supLoadData', 'chartsOption', 'DataCollect'], 
		function (echartsXy, tableXy, card, SupLoadData, ChartsOption, DataCollect) {
	
	let componentsMap = {
		'echarts': echartsXy,
		'table': tableXy,
		'card': card
	}
	
	let loadData = function (opts = {}) {
		this.opts = opts;
		this.loaderType = ['var']
		this.url = 'ESSearchAction_sqlSearchWithAggregationsParse.do';
		this.urlData = opts.urlData || {};
		this.currentType = opts.currentType || {};
		this.outerType = opts.outerType || {};
		this.config = opts.config || {};			
		this.option = opts.option || {};
		this.container = opts.container || null;
		this.xAxisDragBox = opts.xAxisDragBox;
		this.yAxisDragBox = opts.yAxisDragBox;
		this.tableDragBox = opts.tableDragBox;
		this.varDragBox = opts.varDragBox;
		this.renderType = opts.renderType || '1';
		this.tableDatas = opts.tableDatas;
		this.component = null;
		this.chartsOption = new ChartsOption();
		this.dataCollect = new DataCollect();
		this._init();
	}
	
	loadData.prototype = {
		_init () {
			!this.container || (this.supLoadData = new SupLoadData(this.container, Object.assign({}, this.opts, {parent: this})));
			this._restoreComponent(this.config);
			this.supLoadData && this._setEvent();
		},
		_setEvent () {
			window.addEventListener('message', e => {
            	var data = e.data;
            	if (!!data.cardSelect) {
            		this.tmpComponent = app.selectCardItem;
            		this.supLoadData._setFieldCollect(this.tmpComponent.config);
            		this.supLoadData._setUrlDataContent(this.tmpComponent.config)
            		this.supLoadData._operateDom('card');
            	} else if (!!data.selectText) {
            		this.supLoadData.showTextNameModal()
            	}
            });
		},
		_restoreComponent (config = {}) {
			this.config = config;
			opts = Object.assign({}, config, {container: $(document.body)[0]})
			this.component = new componentsMap[this.currentType](opts);
			this.supLoadData && this.supLoadData.appendComponentContent(this.component.getDom()).then(data => {
				if (this.outerType === 'card') {
					this.component._initDrag();
				}
				this._isLoadData();
			});
		},
		_isLoadData () {
			$.isEmptyObject(this.urlData) || this.loadDataByParam().then(data => {
				
			})
			this._restoreOption(this.option);
		},
		_restoreOption (option) {
			this.component.config = this.config;
			this.component.option = option;
			this.component && this.component.resize()
		},
		setCardItem (itemConfig) {
			this.component.setCardItem(itemConfig);
		},
		setData (xAxisDragBox, yAxisDragBox, tableDragBox, tableDatas, varDragBox) {
			this.xAxisDragBox = xAxisDragBox || [];
			this.yAxisDragBox = yAxisDragBox || [];
			this.tableDragBox = tableDragBox || [];
			this.tableDatas = tableDatas || [];
			this.varDragBox = varDragBox || [];
			if (this.outerType === 'table') {
				this.setTablesData();
			} else if (this.outerType === 'echarts') {
				this.setEchartsData();
			} else if (this.outerType === 'card') {
				this.setCardData();
			}
		},
		setTablesData (component) {
			this.config = (component || this.component).getOption();
			delete this.config.aoColumns;
			var tableTable = this.findDataByField(this.tableDragBox);
			this.dataCollect.setTableData(tableTable, this.config);
			var columns = Object.keys(tableTable);
			var datas = [];
			this.colDataGloabelData.forEach(item => {
				var obj = {}
				columns.forEach(col => {
					var filter = this.findReName(col, 'tableDragBox');
					var keys = filter.rename;
					var name = filter.name;
					var tmp = JSON.parse('{"'+keys+'":""}');
					if (item[name] === 'NaN') {
						tmp[keys] = '0';
					} else {
						tmp[keys] = item[name] || '0';
					}
					obj = Object.assign({}, obj, tmp)
				})
				datas.push(obj);
			})
			this.tableDatas = datas;
			(component || this.component).setOption(this.config);
			(component || this.component).addData(datas);
		},
		findReName (keys, key) {
			/* 先判断是否有rename */
			let filter = this[key].filter(item => {
				return item.rename === keys;
			})
			if (!!filter.length) {
				return {
					rename: filter[0].rename,
					name: filter[0].name
				}
			} else {
				return {
					rename: keys,
					name: keys
				}
			}
		},
		setEchartsData (component) {
			this.chartsOption.echartsOption = (component || this.component).getOption();
			this.echartsOption = this.chartsOption.echartsOption;
			var xAxis = this.findDataByField(this.xAxisDragBox);
			var serise = this.findDataByField(this.yAxisDragBox);
			this.dataCollect.setXAxisData(xAxis, this.echartsOption);
			this.dataCollect.setSerise(serise, this.echartsOption);
			this.config = this.echartsOption;
			this.render(this.renderType, component);
		},
		setCardData () {
			var xAxisDragBox = this.xAxisDragBox || [];
			var yAxisDragBox = this.yAxisDragBox || [];
			var tableDragBox = this.tableDragBox || [];
			var tableDatas = this.tableDatas || [];
			var varDragBox = this.varDragBox || [];
			if (this.loaderType.includes(this.tmpComponent.type)) {
				var varData = this.findDataByField(this.varDragBox);
				this.tmpComponent.varDragBox = varDragBox;
				this.setVarData(varData, this.tmpComponent);
			} else if (this.tmpComponent.normal === 'table') {
				this.tmpComponent.tableDragBox = tableDragBox;
				this.tmpComponent.tableDatas = tableDatas;
				this.setTablesData(this.tmpComponent.getComponent());
			} else if (this.tmpComponent.normal === 'echarts') {
				this.tmpComponent.xAxisDragBox = xAxisDragBox;
				this.tmpComponent.yAxisDragBox = yAxisDragBox;
				this.setEchartsData(this.tmpComponent.getComponent());
			}
		},
		setVarData (varData, component) {
			var keys = Object.keys(varData);
			var config = this.getConfig();
			if (keys && keys.length) {
				try {
					component.option = varData[keys[0]][0];
				} catch (e) {
					component.option = '';
				}
			}
			component.config = config;
		},
		setType (type) {
			this.component.setCardItem({type});
		},
		render (renderType, component) {
			this.chartsOption.echartsOption = (component || this.component).getOption();
			this.renderType = renderType;
			if (this.chartsOption) {
				this.echartsOption = this.chartsOption.draw(renderType);
				(component || this.component).setOption(this.echartsOption);
			}
		},
		findDataByField (fields) {
			var fieldMap = {};
			fields.forEach(item => {
				fieldMap[item.name] = [];
			})
			this.colDataGloabelData.forEach(items => {
				Object.keys(items).forEach(keys => {
					if (fieldMap[keys]) {
						fieldMap[keys].push(items[keys] === 'NaN' ? '0': items[keys]);
					}
				})
			})
			var keys = Object.keys(fieldMap);
			fields.forEach(item => {
				if (keys.includes(item.name) && item.rename) {
					fieldMap[item.rename] = fieldMap[item.name];
					delete fieldMap[item.name];
				}
			})
			return fieldMap;
		},
		loadDataByParam (param = {}) {
			var urlData = this.urlData
			urlData = Object.assign({}, urlData, param);
			this.urlData = urlData;
			return new Promise((resolve, reject) => {
				this.reloadData(urlData).then(data => {
					resolve(true);
				})
			})
		},
		setField (sqlSearchData) {
			if (sqlSearchData.fieldName === 'agg') {
				this.sqlUnity(sqlSearchData);
				this.supLoadData && this.supLoadData.setKPIList(this.colDataGloabel || [])
			}
		},
		/* 日志sql数据处理 */
		sqlUnity (sqlSearchData) {
			var cols = [{data:'index',"title":"序号"}];
			var colData = [];
			var data = sqlSearchData[sqlSearchData.fieldName];
			this.colDataGloabel = [];
			this.colDataGloabelData = [];
			this.colDataAll = [];
			if (data && data.length > 0) {
				var tmp = Object.keys(data[0]).map(item => {
					return {
						data: item.replace(/\./g,'-'),
						title: item.replace(/\./g,'-'),
					}
				})
				colData = data;
				colData = colData.map((item, index) => {
					item.index = index+1;
					for(var key in item) {
						item[key.replace(/\./g,'-')] = item[key];
						if (item[key].name) {
							item[key] = item[key].name;
						}
					}
					return item;
				})
				cols.push(...tmp);
				colData = data;
				colData = colData.map((item, index) => {
					item.index = index+1;
					for(var key in item) {
						item[key] = item[key];
						if (item[key].name) {
							item[key] = item[key].name;
						}
					}
					return item;
				})
				this.colDataGloabel = cols;
				this.colDataGloabel = this.colDataGloabel.slice(1);
				this.colDataGloabelData = colData;
				this.colDataAll = colData;
			}
		},
		reloadData (urlData) {
			return new Promise((resolve, reject) => {
				this.sqlSearch(urlData).then(data => {
					this.setField(data.result)
					resolve(true)
				}).fail(function (error) {
					reject(false)
				})
			})
		},
		sqlSearch(urlData) {
			return app.common.ajaxWithAfa({
				url: this.url,
				data: urlData
			}).done(function (data) {
				var result = data.result;
				app.shelter.hide();
				return $.Deferred().resolve(data);
			})
		},
		getOption () {
			if (this.outerType === 'card') {
				return this.component.getLists();
			}
			return this.component.getOption();
		},
		getConfig () {
			var config = {
				xAxisDragBox: this.xAxisDragBox,
				yAxisDragBox: this.yAxisDragBox,
				tableDragBox: this.tableDragBox,
				varDragBox: this.varDragBox,
				tableDatas: this.tableDatas,
				urlData: this.urlData,
				renderType: this.renderType
			}
			var configComs = this.component.getConfig();
			return Object.assign({},configComs || {}, config)
		},
		saveModal (option, config) {
			this.opts.saveModal && this.opts.saveModal(option, config)
		}
	}
	
	return loadData;
	
})