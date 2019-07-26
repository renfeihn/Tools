/**
 * 数据缓存池
 */
define([], function () {
	var dataPool = function () {
		this.dataMap = [];
		this.data = {};
	}
	dataPool.prototype = {
		init () {
			this.dataMap = [];
			this.data = {};
		},
		push (param, data) {
			this.dataMap.push(param);
			this.data[param.value] = data;
		},
		getTypeData(type) {
			var tmp = this.dataMap.filter(item => {
				if (item.type && item.type === type) {
					return true;
				}
				return false;
			})
			var tmpobj = {};
			tmp.forEach(item => {
				if (this.data[item.value]) {
					tmpobj[item.value] = this.data[item.value];
				}
			})
			return {
				field: tmp,
				data: tmpobj
			}
		},
		remove(param) {
			var ind = -1;
			this.dataMap.forEach((item, index) => {
				if (item.value === param.value) {
					ind = index;
				}
			})
			if (ind !== -1) {
				this.dataMap.splice(ind, 1);
				delete this.data[param.value];
			}
		},
		clear() {
			this.init();
		}
	}
	
	return dataPool;
})