/**
 * 图标xy布局组件
 */
define([], function () {
	let iconXy = function (opts) {
		this.name = "图片";
		this.$el = opts.$el;
		this.opts = opts;
		this.uuid = opts.uuid || new Date().getTime();
		this.type = "img";
		this._init(opts);
	}
	iconXy.prototype = {
		_init(opts) {
			this.dom = document.createElement('div');
			this.dom.className = 'xy-img';
			Object.keys(opts).forEach(key => {
				this[key] = opts[key];
			})
		},
		getConfig: function () {
			return {
				backgroundImage: this.backgroundImage,
				backgroundPosition: this.backgroundPosition,
				backgroundSize: this.backgroundSize,
				backgroundRepeat: this.backgroundRepeat,
				uuid: this.uuid
			}
		},
		destory () {
			this.dom.remove();
		},
		resize () {
			
		},
		getConfig () {
			return this.config;
		},
		getOption () {
			return this.option;
		},
		set config (config) {
			this.configOpt = config;
		},
		get config () {
			return this.configOpt || {};
		},
		set option (option) {
			this.optionOpt = option;
		},
		get option () {
			return this.optionOpt || {}
		},
		set backgroundImage (backgroundImage) {
			if (backgroundImage === "") {
				return;
			}
			if (backgroundImage.indexOf('url') !== -1) {
				this.dom.style.backgroundImage = `${backgroundImage}`;
			} else {
				this.dom.style.backgroundImage = `url(${backgroundImage})`;
			}
		},
		get backgroundImage () {
			return this.dom.style.backgroundImage || "";
		},
		set backgroundPosition (backgroundPosition) {
			this.dom.style.backgroundPosition = backgroundPosition;
		},
		get backgroundPosition () {
			return this.dom.style.backgroundPosition;
		},
		set backgroundSize (backgroundSize) {
			this.dom.style.backgroundSize = backgroundSize;
		},
		get backgroundSize () {
			return this.dom.style.backgroundSize;
		},
		set backgroundRepeat (backgroundRepeat) {
			this.dom.style.backgroundRepeat = backgroundRepeat;
		},
		get backgroundRepeat () {
			return this.dom.style.backgroundRepeat;
		},
		set width (width) {
			return this.$el.style.width = width;
		},
		get width () {
			return this.$el.offsetWidth
		},
		set height (height) {
			return this.$el.style.height = height;
		},
		get height () {
			return this.$el.offsetHeight
		},
		set left (left) {
			return this.$el.style.left = left;
		},
		get left () {
			return this.$el.offsetLeft
		},
		set top (top) {
			return this.$el.style.top = top;
		},
		get top () {
			return this.$el.offsetTop
		},
	}
	return iconXy;
});