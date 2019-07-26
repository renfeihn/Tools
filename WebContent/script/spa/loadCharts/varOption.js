/**
 * 
 */

define([], function () {
	var varOption = function () {
		this.type = {
			'1': 'background: var(--color_主题);color: #FFF;font-size: 16px;',
			'2': 'background: var(--color_非主题);color: #000;font-size: 14px;',
		}
	}
	varOption.prototype = {
		init (ele) {
			this.$el = ele;
		},
		draw (type) {
			this.$el.attr('style', this.type[type]);
			return {type: this.type[type]};
		},
		setText (config) {
			this.$el.text(config.text);
		},
	}
	return varOption;
})