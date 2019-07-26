/**
 * cmdb专用jquery插件
 */

(function () {
	$.fn.showDetail = function (opts) {
		let that = this;
		let template = null;
		
		that.on('mouseenter', mouseenter);
		
		function getListItem (opts) {
			return `<div class="showDetail-cmdb-object">
						<div class="showDetail-cmdb-object-container">
							<div class="cmdb-object-title">${opts.title || '分类信息'}</div>
							<div class="cmdb-object-content">
								${opts.list.map(item => {
									return `<div class="cmdb-object-item">
												<span class="item-name">${item.name}</span>
												<span class="item-value">${item.value}</span>
											</div>`
								}).join('')}
							</div>
						</div>
					</div>`
		}
		
		function mouseenter (e) {
			e.stopPropagation();
			opts.showDetailCallBack && (opts = Object.assign({}, opts, opts.showDetailCallBack($(this))));
			template = $(getListItem(opts));
			opts.container.append(template);
			var bbox = $(this).getBbox();
			template.attr('style',`left: ${bbox.left + bbox.width}px;top: ${bbox.top}px;`)
			that.on('mouseout', mouseout);
		}
		
		function mouseout (e) {
			e.stopPropagation();
			if ($(e.target).closest('.showDetail-cmdb-object').length === 0) {
				template.remove();
			}
			that.off('mouseout', mouseout);
		}
		
	}
})(document,window.JQuery);

(function () {
	$.fn.getBbox = function () {
		return $(this)[0].getBoundingClientRect();
	}
})(document,window.JQuery)