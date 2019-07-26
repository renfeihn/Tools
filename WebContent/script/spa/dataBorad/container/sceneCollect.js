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
	 * 	 scene：场景容器，key-value形式，key为场景sceneType，唯一标识
	 * 
	 */
	
	let sceneCollect = function (opts) {
		this.scene = {};
	}
	
	sceneCollect.prototype = {
		'getScene': function (sceneType) {
			if (this.isHasScene(sceneType)) {
				return this.scene[sceneType];
			}
			return null;
		},
		'setScene': function (scene) {
			this.delScene();
			this.scene[scene.sceneType] = scene;
			return this.scene[scene.sceneType];
		},
		'delScene': function (sceneType) {
			if (this.isHasScene(sceneType)) {
				delete this.scene[sceneType];
			}
		},
		'isHasScene': function (sceneType) {
			return this.scene[sceneType] ? true : false;
		}
	}
	
	return sceneCollect;
})