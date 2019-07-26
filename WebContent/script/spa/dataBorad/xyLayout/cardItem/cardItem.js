/**
 * 卡片内部item
 */
define([], function () {
	
	
	var CardItem = function (opts = {}) {
		this.opts =  opts;
		this.config = opts.config || {};
		this.name = '未命名字段';
		this._init();
	}
	CardItem.prototype = {
		_init () {
			this.dom = document.createElement('div');
			this.dom.className = 'carditem-style ';
			this._setInner();
			this._addEvent();
		},
		_addEvent () {
			let that = this;
			$("span.carditem-label", $(this.dom)).attr('contenteditable',true).on('click', function (e) {
				console.log('click');
				e.stopPropagation();
				$(this).trigger('focus');
			}).on('blur', function (e) {
				e.stopPropagation();
				that._setName($(this).text());
			})
		},
		_setConfig (config) {
			this.config = config;
		},
		_setData (data) {
			this.text = data || '';
			this.config.text = data;
			$($(this.dom).find('.carditem-var')[0]).text(data || '无数据');
		},
		_setName (name) {
			this.config.name = name;
			this.name = name;
			$($(this.dom).find('.carditem-label')).text(name);
		},
		hideLabel () {
			$(this.dom).find('.carditem-label').hide();
		},
		showLabel () {
			$(this.dom).find('.carditem-label').show();
		},
		getConfig () {
			return this.config;
		},
		getOption () {
			return {
				text: this.text || '',
				name: this.name
			};
		},
		resize () {
			
		}
	}
	return CardItem;
})