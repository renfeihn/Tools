/**
 * 数据采集器
 */

define([], function () {
	let DataCollect = function () {
		this.data = {};
	}
	
	DataCollect.prototype = {
		setXAxisData (xAxis, echartsOption) {
			this.clearxAxis(echartsOption)
			var xAxisName = Object.keys(xAxis);
			if (xAxisName.length >= 0) {
				echartsOption.xAxis.data = xAxis[xAxisName[0]];
				echartsOption.xAxis.name = xAxisName[0];
			} else {
				echartsOption.xAxis.data = [];
				echartsOption.xAxis.name = '';
			}
		},
		setSerise (serise, echartsOption) {
			this.clearSeriseData(echartsOption);
			var ss = echartsOption.series;
			var tmp = JSON.parse(JSON.stringify(ss[0]))
			var fields = Object.keys(serise);
			if (fields.length == 0) {
				ss = [{
					data: [],
					name: ''
				}]
			} else {
				fields.forEach((item, index) => {
					var dd = serise[item];
					if (ss.length - 1 < index) {
						ss.push(tmp);
					}
					ss[index].data = dd;
					ss[index].name = item;
				})
			}
		},
		setTableData (data, tablesOption) {
			this.clearTableData(tablesOption, data);
			var fields = Object.keys(data);
			var columns = fields.map(item => {
				var tmp = {};
				tmp.data = item;
				tmp.title = item;
				return tmp;
			});
			tablesOption.columns = columns;
		},
		setVarData (data, config) {
			config = this.clearVarData(config);
			try {
				config['text'] = data[Object.keys(data)[0]][0];
			} catch (e) {
				console.log(e);
			}
			return config;
		},
		clearVarData(config) {
			config.text && (config.text = '');
			return config;
		},
		clearSeriseData(echartsOption) {
			var ss = echartsOption.series;
			ss = ss.map(item => {
				item.data = [];
			})
		},
		clearxAxis(echartsOption) {
			var xx = echartsOption.xAxis;
			xx.data = [];
		},
		clearTableData (tablesOption, data) {
			if (data.length === 0) {
				tablesOption.columns = [{"data": "example", "title": '无数据'}];
			} else {
				tablesOption.columns = [];
			}
		}
	}
	
	return DataCollect;
})