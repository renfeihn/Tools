/**
 * 占位块
 */
define([], function () {
	let supOperate = function () {
		this.offsetX = null;
	}
	
	let fn = supOperate.prototype;
	
	fn.init = function () {
		
	}
	
	fn.setContainer = function ($item, width) {
		this.$item = $item;
		this.w = width;
	}
	
	fn.updateContainer = function (offsetX) {
		this.offsetX = offsetX;
		this.$item.attr('transform', `translate(${offsetX},0)`);
	}
	
	fn.destory = function () {
		this.$item.remove();
	}
	
	return supOperate;
	
})