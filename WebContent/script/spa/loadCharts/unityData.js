/**
 * echarts 数据处理方法
 */
define([], function () {
	return {
		unityDataByLog (data) {
			var keyMap = {};
			data && data.forEach(item => {
				Object.keys(item).map(key => {
					!keyMap[key] ? (keyMap[key] = [item[key]]): keyMap[key].push(item[key]);
				})
			})
			return keyMap;
		},
		getxAxisData(xAxis, echartsOption) {
			this.clearxAxis(echartsOption)
			var field = xAxis.field;
			var data = xAxis.data;
			var xx = [];
			field.forEach(item => {
				xx = data[item.value];
			})
			echartsOption.xAxis.data = xx;
		},
		getSerise(serise, echartsOption) {
			this.clearSeriseData(echartsOption);
			var ss = echartsOption.series;
			var tmp = JSON.parse(JSON.stringify(ss[0]))
			var field = serise.field;
			var data = serise.data;
			field.forEach((item, index) => {
				var dd = data[item.value];
				if (ss.length - 1 < index) {
					ss.push(tmp);
				}
				ss[index].data = dd;
				ss[index].name = item.name;
			});
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
		}
	}
})