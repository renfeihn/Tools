/**
 * 
 */
define(['DataCollect','chartsOption','tableOption','varOption','card'], function (DataCollect, ChartsOption, TableOption, VarOption, Card) {
	let requestAjax = function (opts = {}) {
		this.opts = opts;
		this.url = 'ESSearchAction_sqlSearchWithAggregationsParse.do';
		this.urlData = opts.urlData;
		this.config = opts.config;
		this.dataCollect = new DataCollect();
		this.xAxisDragBox = opts.xAxisDragBox || [];
		this.yAxisDragBox = opts.yAxisDragBox || [];
		this.tableDragBox = opts.tableDragBox || [];
		this.varDragBox = opts.varDragBox || [];
		this.colDataGloabel = [];
		this.chartsOption = new ChartsOption();
		this.tableOption = new TableOption();
		this.varOption = new VarOption();
		this.echartsOption = opts.echartsOption || {};
		this.tablesData = opts.tableOption || {};
		this.varConfig = opts.textConfog || {};
		this.colDataGloabelData = [];
		this.renderType = opts.renderType || '1';
		this.echartsObj = opts.parent.component.charts;
		this.init();
	}
	requestAjax.prototype = {
		init () {
		},
		getData (param) {
			let urlData = JSON.parse(JSON.stringify(this.urlData));
			if (!!param) {
				var str = ' ';
				Object.keys(param).forEach(key => {
					str += key.replace(/-/g,'.') + ' = "' + param[key] + '" and ';
				})
				var whereIndex = urlData.search.indexOf('where');
				var LimitIndex = urlData.search.indexOf('limit');
				var groupByIndex = urlData.search.indexOf('group');
				if (whereIndex !== -1) {
					urlData.search = urlData.search.substring(0, whereIndex + 6) + str + urlData.search.substring(whereIndex + 6);
				} else if (groupByIndex !== -1){
					urlData.search = urlData.search.substring(0, groupByIndex) + ' where ' + str.substring(0, str.length - 5) + ' ' + urlData.search.substring(groupByIndex);
				} else if (LimitIndex !== -1){
					urlData.search = urlData.search.substring(0, LimitIndex) + ' where ' + str.substring(0, str.length - 5) + ' ' + urlData.search.substring(LimitIndex);
				}
			}
			return new Promise((resolve, reject) => {
				this.sqlSearch(urlData).then(data => {
					this.setField(data.result)
					resolve(true)
				}).fail(function (error) {
					reject(false)
				})
			})
		},
		reloadData (param) {
			var urlData = JSON.parse(JSON.stringify(this.urlData));
			urlData = Object.assign({}, urlData, param);
			return new Promise((resolve, reject) => {
				this.sqlSearch(urlData).then(data => {
					this.setField(data.result)
					resolve(true)
				}).fail(function (error) {
					reject(false)
				})
			})
		},
		restore () {
			if (this.opts.type === 'table') {
				this.setTablesData();
			} else if (this.opts.type === 'echarts') {
				this.setEchartsData();
			} else if (this.opts.type === 'card') {
				this.setCardData();
			}
		},
		setCardData () {
			var config = this.config;
			config.forEach(cards => {
				let item = this.opts.card._getItemById(cards.uuid)[0];
				let normal = item.normal;
				var xAxisDragBox = item.xAxisDragBox || [];
				var yAxisDragBox = item.yAxisDragBox || [];
				var tableDragBox = item.tableDragBox || [];
				var tableDatas = item.tableDatas || [];
				var varDragBox = item.varDragBox || [];
				if (normal === 'table') {
					this.setTablesData(item.getComponent(), tableDatas, tableDragBox);
				} else if (normal === 'echarts') {
					this.setEchartsData(item.getComponent(), xAxisDragBox, yAxisDragBox);
				} else if (normal === 'card') {
					var varData = this.findDataByField(varDragBox);
					this.setVarData(varData, item.getComponent());
				}
			})
			var cardData = this.findDataByField(this.varDragBox);
			this.opts.card.setData(cardData, this.varDragBox);
		},
		setVarData (varData, component) {
			var keys = Object.keys(varData);
			if (keys && keys.length) {
				try {
					component._setData(varData[keys[0]][0]);
				} catch (e) {
					component._setData('');
				}
			}
		},
		isEmpty (data, key) {
			if (data.length === 0) {
				return false;
			}
			return true;
		},
		setEchartsData (component, xAxisDragBox, yAxisDragBox) {
			if (component) {
				this.echartsOption = component.getOption();
			}
			var xAxis = this.findDataByField(xAxisDragBox || this.xAxisDragBox);
			var serise = this.findDataByField(yAxisDragBox || this.yAxisDragBox);
			this.dataCollect.setXAxisData(xAxis, this.echartsOption);
			this.dataCollect.setSerise(serise, this.echartsOption);
			this.render(this.renderType, component);
		},
		setTablesData () {
			var tableTable = this.findDataByField(this.tableDragBox);
			this.dataCollect.setTableData(tableTable, this.tablesData);
			delete this.tablesData.aoColumns;
			this.echartsObj = this.opts.parent.setOption(this.tablesData)
			var columns = Object.keys(tableTable);
			var datas = [];
			this.colDataGloabelData.forEach(item => {
				var obj = {}
				columns.forEach(keys => {
					var tmp = JSON.parse('{"'+keys+'":""}');
					tmp[keys] = item[keys] || '';
					obj = Object.assign({}, obj, tmp)
				})
				datas.push(obj);
			})
			this.tableDatas = datas;
			this.echartsObj.rows.add(datas).draw();
		},
		render (renderType, component) {
			this.renderType = renderType;
			this.chartsOption.echartsOption = this.echartsOption;
			if (this.chartsOption) {
				this.echartsOption = this.chartsOption.draw(this.renderType);
				(component || this.echartsObj).setOption(this.echartsOption);
			}
		},
		setField (sqlSearchData) {
			if (sqlSearchData.fieldName === 'agg') {
				this.sqlUnity(sqlSearchData);
			}
		},
		sqlUnity (sqlSearchData) {
			var cols = [{data:'index',"title":"序号"}];
			var colData = [];
			var data = sqlSearchData[sqlSearchData.fieldName];
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
			}
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
		findDataByField (fields) {
			var fieldMap = {};
			fields.forEach(item => {
				fieldMap[item.name] = [];
			})
			this.colDataGloabelData.forEach(items => {
				Object.keys(items).forEach(keys => {
					if (fieldMap[keys]) {
						fieldMap[keys].push(items[keys]);
					}
				})
			})
			return fieldMap;
		}
	}
	
	
	return requestAjax;
})