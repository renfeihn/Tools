/**
 * 原子组件请求参数
 */
define(['DataCollect','chartsOption','util'], function (DataCollect,ChartsOption, util) {
	
	let DashItem = function () {};
	
	var now = new Date();
	var time_func = {
		"thisDay":(function(now){
			return {
				sDate:now.Format("yyyy-MM-dd 00:00:00"),
				eDate:now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"thisWeek":(function(now){
			var week_head = new Date(now.getTime());
			var day = now.getDay();// 今天的星期
			if(day > 0){
				week_head.setDate(now.getDate() - day + 1);
			}else{
				week_head.setDate(now.getDate() - 6);
			}
			return {
				sDate: week_head.Format("yyyy-MM-dd 00:00:00"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"thisMonth":(function(now){
			return {
				sDate: now.Format("yyyy-MM-01 00:00:00"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"thisYear":(function(now){
			return {
				sDate: now.Format("yyyy-01-01 00:00:00"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"oneHour":(function(now){
			var time = now.getTime() - 60 * 60 * 1000;
			return {
				sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"twelveHour":(function(now){
			var time = now.getTime() - 12 * 60 * 60 * 1000;
			return {
				sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"oneDay":(function(now){
			var time = now.getTime() - 24 * 60 * 60 * 1000;
			return {
				sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"oneWeek":(function(now){
			var time = now.getTime() - 7 * 24 * 60 * 60 * 1000;
			return {
				sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"halfMonth":(function(now){
			var time = now.getTime() - 15 * 24 * 60 * 60 * 1000;
			return {
				sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"oneMonth":(function(now){
			var time = now.getTime() - 30 * 24 * 60 * 60 * 1000;
			return {
				sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"threeMonth":(function(now){
			var time = now.getTime() - 90 * 24 * 60 * 60 * 1000;
			return {
				sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now),
		"allTime":(function(now){
			var time = 0;
			return {
				sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
				eDate: now.Format("yyyy-MM-dd hh:mm:ss")
			}
		})(now)
	};
	
	let ItemComponent = function (opts = {}) {
		this.url = 'ESSearchAction_sqlSearchWithAggregationsParse.do';
		this.params = opts.params;
		this.opts = opts;
		this.uuid = opts.uuid || util.genearteUUid();
		this.chartsOption = new ChartsOption();
		this.dataCollect = new DataCollect();
	}
	
	let fn = ItemComponent.prototype;
	
	require(['dashItem'], function(_DashItem){
		DashItem = _DashItem;
	})
	
	fn.setAjax = function (params) {
		let param = $.isEmptyObject(this.params) ? null : this.params;
		let config = this.config;
		if (!config.urlData) {
			return;
		}
		let urlData = JSON.parse(JSON.stringify(config.urlData));
		this.renderType = config.renderType;
		urlData = Object.assign({}, urlData, param);
		if (!param && urlData.dateRangeTab == 0) {
			var time = time_func[urlData.dateRangeFun];
			urlData.startTime = time.sDate;
			urlData.endTime = time.eDate;
		}
		if (params) {
			urlData = Object.assign({}, urlData, params);
		}	
		return new Promise((resolve, reject) => {
			this.sqlSearch(urlData).then(data => {
				this.setField(data.result)
				resolve(true)
			}).fail(function (error) {
				reject(false)
			})
		})
	}
	
	fn.sqlSearch = function (urlData) {
		return app.common.ajaxWithAfa({
			url: this.url,
			data: urlData
		}).done(function (data) {
			var result = data.result;
			app.shelter.hide();
			return $.Deferred().resolve(data);
		})
	}
	
	fn.setField = function (sqlSearchData) {
		if (sqlSearchData.fieldName === 'agg') {
			this.sqlUnity(sqlSearchData);
		}
		this.setData()
	}
	
	fn.sqlUnity = function(sqlSearchData) {
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
		} else {
			this.colDataGloabel = [];
			this.colDataGloabelData = [];
		}
	}
	
	fn.setData = function () {
		if (this.type === 'table') {
			this.setTablesData();
		} else if (this.type === 'echarts') {
			this.setEchartsData();
		} else if (this.type === 'var') {
			this.setVarData();
		}
	}
	
	fn.setVarData = function () {
		let config = this.config;
		var varBox = this.findDataByField(config.varDragBox || []);
		let valuesKey = Object.keys(varBox);
		if (valuesKey && valuesKey.length) {
			try {
				this.option = varBox[valuesKey[0]][0];	
			} catch (e) {
				this.option = '-';
			}
		} else {
			this.option = '-';
		}
	}
	
	fn.setTablesData = function () {
		var config = this.config;
		var tableTable = this.findDataByField(config.tableDragBox || []);
		var columns = Object.keys(tableTable);
		var datas = [];
		this.colDataGloabelData && this.colDataGloabelData.forEach(item => {
			var obj = {}
			columns.forEach(keys => {
				var tmp = JSON.parse('{"'+keys+'":""}');
				tmp[keys] = item[keys] || '';
				obj = Object.assign({}, obj, tmp)
			})
			datas.push(obj);
		})
		this.addData(datas);
	}
	
	fn.getEventField = function () {
		let config = this.config;
		if (this.type === 'table') {
			return Array.prototype.concat.call(config.tableDragBox)
		} else if (this.type === 'echarts') {
			return Array.prototype.concat.call(config.xAxisDragBox, config.yAxisDragBox)
		} else if (this.type === 'var') {
			return Array.prototype.concat.call(config.varDragBox)
		}
	}
	
	fn.setEchartsData = function () {
		var echartsOption = this.option;
		let config = this.config;
		var xAxis = this.findDataByField(config.xAxisDragBox || []);
		var serise = this.findDataByField(config.yAxisDragBox || []);
		this.dataCollect.setXAxisData(xAxis, echartsOption);
		this.dataCollect.setSerise(serise, echartsOption);
		this.render(echartsOption);
	}
	
	fn.render = function (echartsOption) {
		this.chartsOption.echartsOption = echartsOption;
		if (this.chartsOption) {
			var echartsOption = this.chartsOption.draw(this.renderType);
			this.option = echartsOption;
		}
	}
	
	fn.findDataByField = function (fields) {
		var fieldMap = {};
		fields.forEach(item => {
			fieldMap[item.name] = [];
		})
		this.colDataGloabelData && this.colDataGloabelData.forEach(items => {
			Object.keys(items).forEach(keys => {
				if (fieldMap[keys]) {
					fieldMap[keys].push(items[keys]);
				}
			})
		})
		return fieldMap;
	}
	
	fn.updateParam = function (param, mapParam) {
		var config = this.config;
		if (!config.urlData) {
			return;
		}
		var urlData = JSON.parse(JSON.stringify(config.urlData));
		if (!!mapParam && mapParam.length) {
			var str = ' ';
			mapParam.forEach(item => {
				str += item.field.replace(/-/g,'.') + ' = "' + item.text + '" and ';
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
		} else {
			urlData = Object.assign(urlData, param);
		}
		this.setAjax(urlData);
	}
	
	fn.getLeafByParentDashItem = function (base) {
		if (!base)  return null; 
		if (base instanceof DashItem) {
			return base;
		}
		if (!base.opts)  return null; 
		return this.getLeafByParentDashItem(base.opts.parent);
	}
	
	
	fn.setEventByComponents = function (values) {
		var coms = {};
		Object.keys(values).forEach(field => {
			if (!coms[values[field].eventComponents]) {
				coms[values[field].eventComponents] = [];
			}
			coms[values[field].eventComponents].push({
				field: field,
				text: values[field].text
			})
		})
		let dashItem = this.getLeafByParentDashItem(this);
		if (!dashItem) {
			return;
		}
		let stage = dashItem.opts.parent;
		Object.keys(coms).forEach(uuid => {
			var components = stage.getComponentsByUUid(uuid);
			if (components && components.length) {
				components = components[0];
				components.updateParam(null, coms[uuid]);
			}
		})
	}
	
	fn.setInterval = function (inter) {
		if (Number.isNaN(parseInt(inter)) || parseInt(inter) === 0) {
			this.clearInterval()
			return;
		}
		this.timer = setInterval(() => {
			console.log('refresh,', this.uuid);
			this.setAjax()
		},inter * 1000);
	}
	
	fn.clearInterval = function () {
		this.timer && clearInterval(this.timer);
	}
	
	return ItemComponent;
	
})