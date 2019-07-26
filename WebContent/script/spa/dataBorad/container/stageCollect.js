/**
 * 场景集成器
 * create-date: 2018-11-20
 * modify-time: 
 * author: 
 */
define([], function () {
	
	/**
	 * 场景编辑器
	 * 属性：
	 * 	 stage：场景容器，key-value形式，key为场景stageType，唯一标识
	 * 
	 */
	
	let stageCollect = function (opts) {
		this.stage = {};
		this.latestType = null;
	}
	
	stageCollect.prototype = {
		'getStage': function (key) {
			if (this.isHasStage(key)) {
				this.latestType = key;
				return this.stage[key];
			}
			return null;
		},
		'getLatest': function () {
			if (this.latestType) {
				return this.getStage(this.latestType)
			}
			return null;
		},
		'setStage': function (stage) {
			console.log(stage.key);
			this.delStage();
			this.latestType = stage.key;
			this.stage[stage.key] = stage;
			return this.stage[stage.key];
		},
		'delStage': function (key) {
			this.latestType = null;
			if (this.isHasStage(key)) {
				delete this.stage[key];
			}
		},
		'isHasStage': function (key) {
			return this.stage[key] ? true : false;
		}
	}
	
	return stageCollect;
})