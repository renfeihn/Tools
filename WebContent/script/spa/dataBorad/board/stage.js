/**
 * 仪表盘组件
 */

define(['util','stageContainer'],
		function (util, StageContainer) {
	
	let Stage = function (opts = {}) {
		StageContainer.call(this, opts);
		this.id = 'stage' + new Date().getTime();
		this.params = opts.params || {};		// 外来传参
		this.isHasParam = ['echarts','table','var'];
		this._init();
	}
	
	let fn = Stage.prototype;
	
	fn.getCurrent = function () {
		var id = this.operateItem;
		var item = this._getItemById(id)[0];
		return item;
	}
	
	
	fn.removeAll = function () {
		this.children = [];
		this.gridster.removeAll();
	}
	
	fn.getEventComponents = function () {
		let lists = this.getListsByArray(this.children);
		lists = lists.map(item => {
			item.rootNode = this.getLeafByParentDashItem(item);
			return item;
		})
		return lists;
	}
	
	/* 获取到所有的子节点 transformArray */
	fn.getListsByArray = function (children) {
		let lists = [];
		children.forEach(item => {
			if (item.type === 'card') {
				let tmp = this.getListsByArray(item.component.children);
				lists.push(...tmp);
			} else {
				lists.push(item.component)
			}
		})
		return lists;
	}
	
	fn.getComponentsByUUid = function (uuid) {
		let lists = this.getListsByArray(this.children);
		return lists.filter(item => {
			return item.uuid === uuid;
		})
	}
	
	fn.refreshParam = function  (param, $item) {
		var type = $item.type;
		if (this.isHasParam.includes(type)) {
			$item.updateParam(param);
		}
	}
	
	fn.setEventList = function (eventList) {
		var comMap = {};
		eventList.forEach(item => {
			if (!comMap[item.eventSourceComponent]) {
				comMap[item.eventSourceComponent] = [];
			}
			comMap[item.eventSourceComponent].push(item);
		})
		console.log(comMap, eventList)
		Object.keys(comMap).forEach(key => {
			var uuid = key;
			var com = this.getComponentsByUUid(uuid);
			if (com && com.length) {
				console.log(com)
				com = com[0];
				com.event = comMap[key];
			}
		})
	}
	
	util.inherits(Stage, StageContainer);
	
	return Stage;
	
})