/**
 * 仪表盘工具
 */

define([], function () {
	
	let tool = function (container, opts = {}) {
		this.opts = opts;
		this.container = container;
		this.$selectCateMenu = $("#selectCateMenu", this.container);
		this.$selectCateLevel2Show = $("#selectCateLevel2Show", this.container);
		this.$dateSetectWarp = $("#dateSetectWarp", this.container);
		this._init();
	}
	
	tool.prototype = { 
		_init () {
			this._addEvent();
		},
		_addEvent () {
			let that = this;
			this.$selectCateMenu.on("click", 'div[data-id]', function (e) {
				e.stopPropagation();
				var id = this.dataset.id;
				var domBbox = that.getBbox(that.$selectCateLevel2Show[0]);
				var bbox = that.getBbox(this);
				$(that.$selectCateLevel2Show.find('>div>div')).hide();
				$("#"+id, that.container).show();
				that.$selectCateLevel2Show.attr('style', `left: ${bbox.left - 600}px;top: ${bbox.top}px;`);
			})
			$(document.body).on("click", function (e) {
				that.$selectCateMenu.hide()
				that.$selectCateLevel2Show.hide();
			})
		},
		getBbox (dom) {
			return dom.getBoundingClientRect();
		},
		showCateMenu ($btn) {
			var bbox = this.getBbox($btn[0]);
			this.$selectCateMenu.attr('style', `left: ${bbox.left}px;top: ${bbox.top + bbox.height}px;`);
		},
		hide() {
			this.$selectCateMenu.hide()
			this.$selectCateLevel2Show.hide()
		},
		showTimeMenu ($btn) {
			var bbox = this.getBbox($btn[0]);
			this.$dateSetectWarp.attr('style', `left: ${bbox.left}px;top: ${bbox.top + bbox.height}px;`);
		}
		
	}
	
	return tool;
	
})