/**
 * loadCharts 入口文件
 * 
 * 数据传递进来之后，做处理
 */
define(['dataPool','unityData','chartsOption'], function (dataPool, unityData, chartsOption) {
	
	var chartsIndex = function (opts) {
		this.ele = null;		// echarts dom 容器
		this.data = [];		// echarts 数据
		this.config = {};	// echarts 配置
		this.type = '1';		// echarts 类型 line：type=1 bar：type=2 pie：type=3 scatter: type=4 area: type=5
		this.allData = {};
		this.dataPool = new dataPool();
		this.chartsOption = new chartsOption();
		this.charts = null;
	}
	
	chartsIndex.prototype = {
		init(ele, data) {
			this.ele = ele;
			this.charts = this.chartsOption.init(this.ele);
			this.unityData(data);
		},
		_setOption () {
			var xAxis = this.dataPool.getTypeData('0');
			var serise = this.dataPool.getTypeData('1');
			console.log(xAxis)
			var echartsOption = this.chartsOption.echartsOption;
			unityData.getxAxisData(xAxis, echartsOption);
			unityData.getSerise(serise, echartsOption);
			var option = this.chartsOption.draw(this.type);
			this.charts && this.charts.setOption(option);
		},
		changeType (type) {
			this.type = type;
			this._setOption();
		},
		clear() {
			this.charts && this.charts.clear && this.charts.clear();
		},
		dispose() {
			this.charts && this.charts.dispose && this.charts.dispose();
		},
		error (e) {
			console.error(e);
			app.alert('数据错误，请重试！');
		},
		unityData (data) {
			this.allData = unityData.unityDataByLog(data);
		},
		pushData (param) {
			var data = this.allData[param.value];
			this.dataPool.push(param, data);
			this._setOption();
		},
		pushAllData (array){
			array.forEach(param => {
				var data = this.allData[param.value];
				this.dataPool.push(param, data);
			})
			this._setOption();
		},
		removeData (param) {
			this.dataPool.remove(param);
			this._setOption();
		}
	}
	
	return chartsIndex;
}) 