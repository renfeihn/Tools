/**
 * 非主题卡片
 */
define(['util','cardItem'], function (util, cardItem) {
	
	function getInnerHTML (name, $name) {
		return `<span class="carditem-label">${name}</span>
				<span class="carditem-var">${$name}</span>`;
	}
	
	let themeCard = function (opts) {
		cardItem.call(this, opts);
		this._init();
	}
	
	themeCard.prototype = {
		_setInner () {
			this.dom.innerHTML = getInnerHTML('未命名标题', '$' + window.variable ++ );
		}
	}
	
	util.inherits(themeCard, cardItem);
	
//	Object.defineProperties(themeCard.prototype, {
//		title: {
//			get: function () {
//                return 'title';
//            },
//            set: function (value) {
//                this.titleTheme = value;
//            }
//		}
//	})
	
	return themeCard
})