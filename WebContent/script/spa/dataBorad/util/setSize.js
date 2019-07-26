/**
 * 设定行布局尺寸
 */
define(['sizeContent'], function (SizeContent) {
	
	let SetSize = function (opts = {}) {
		this.opts = opts;
		this.marginSize = 20;
	}
	
	SetSize.prototype = {
		setSize (container, sizeStr) {
			if (sizeStr.indexOf(':') !== -1) {
				var allSize = 0;
				var str = sizeStr.split(':').map(item => {
					allSize += parseInt(item);
					return parseInt(item);
				});
				var p = [];
				str.forEach((item, index) => {
					var size = (item/allSize) * 100;
					p.push(this.addContent(Number(size).toFixed(2)));
				})
				Promise.all([...p]).then(content => {
					content.forEach(item => {
						container._addPanel(item);
					})
				})
			}
		},
		addContent (size) {
			return new Promise((resolve, reject) => {
				var content = new SizeContent(this.opts);
				content.setSize(size + '%');
				resolve(content);
			})
		}
	}
	
	return SetSize;
	
})