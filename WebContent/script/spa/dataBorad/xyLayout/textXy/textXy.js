/**
 * 图标xy布局组件
 */
define([], function () {
	let textXy = function (opts) {
		this.name = "文本框";
		this.container = opts.container;
		this.type = "text";
		this.opts = opts;
		this.uuid = opts.uuid || new Date().getTime();
		this.stageType = opts.stageType;
		this.dataFilterType = 'normal';
		this._init(opts);
		this.option = opts.option || '';
		this.config = opts.config || {};
	}
	textXy.prototype = {
		_init(opts) {
			this.dom = document.createElement('div');
			this.dom.className = 'xy-text';
		},
		getConfig () {
			return this.config;
		},
		getOption () {
			return this.option;
		},
		set config (config) {
			this.configOpt = config;
			Object.keys(config).forEach(item => {
				this[item] = config[item];
			})
		},
		get config () {
			var config = this.configOpt || {};
			config = Object.assign(config, {
				color: this.color,
				InnerText: this.InnerText,
				fontSize: this.fontSize,
				writingMode: this.writingMode,
				backgroundColor: this.backgroundColor
			})
			return config;
		},
		set option (option) {
			this.dom.innerText = option;
			this.optionOpt = option;
		},
		get option () {
			return this.optionOpt || ''
		},
		resize () {
		},
		destory () {
			this.dom.remove();
		},
		set color (color) {
			this.dom.style.color = color;
		},
		get color () {
			return this.dom.style.color;
		},
		set writingMode(writingMode) {
			this.dom.style.writingMode = writingMode;
		},
		get writingMode() {
			return this.dom.style.writingMode;
		},
		set fontFamily (fontFamily) {
			this.dom.style.fontFamily = `${fontFamily}`;
		},
		get fontFamily () {
			return this.dom.style.fontFamily;
		},
		set fontSize (fontSize) {
			this.dom.style.fontSize = `${fontSize}px`;
		},
		get fontSize () {
			return this.dom.style.fontSize ? parseInt(this.dom.style.fontSize) : 14;
		},
		set fontWeight (fontWeight) {
			this.dom.style.fontWeight = `${fontWeight}`;
		},
		get fontWeight () {
			return this.dom.style.fontWeight;
		},
		set fontStyle (fontStyle) {
			this.dom.style.fontStyle = `${fontStyle}`;
		},
		set textDecoration (textDecoration) {
			this.dom.style.textDecoration = `${textDecoration}`;
		},
		get textDecoration () {
			return this.dom.style.textDecoration;
		},
		get fontStyle () {
			return this.dom.style.fontStyle;
		},
		set textDecoration (textDecoration) {
			this.dom.style.textDecoration = `${textDecoration}`;
		},
		get textDecoration () {
			return this.dom.style.textDecoration;
		},
		set letterSpacing (letterSpacing) {
			this.dom.style.letterSpacing = `${letterSpacing}`;
		},
		get letterSpacing () {
			return this.dom.style.letterSpacing ? parseInt(this.dom.style.letterSpacing) : 0;
		},
		set color (color) {
			this.dom.style.color = color
		},
		get color () {
			return this.dom.style.color;
		},
		set backgroundColor (backgroundColor) {
			this.dom.style.backgroundColor = backgroundColor
		},
		get backgroundColor () {
			return this.dom.style.backgroundColor;
		},
		set InnerText (innerText) {
			this.dom.innerText = innerText
		},
		get InnerText () {
			return this.dom.innerText;
		},
		set LineHeight (lineHeight) {
			this.dom.style.lineHeight = `${lineHeight}px`;
		},
		get LineHeight () {
			return this.dom.style.lineHeight;
		},
		set TextAlign (textAlign) {
			this.dom.style.textAlign = `${textAlign}`;
		},
		get TextAlign () {
			return this.dom.style.textAlign;
		},
		
	}
	return textXy;
});