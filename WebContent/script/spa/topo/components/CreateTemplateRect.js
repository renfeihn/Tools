/**
 * 创建选中矩形
 */
define([], function () {
	let CreateTemplateRect = function (container, opts = {}) {
		this.container = container;
		this.start = {x: 0, y: 0};
		this.rect = null;
		this.move = false;
		this.opts = opts;
		this.init();
	}
	
	CreateTemplateRect.prototype = {
		init () {
			this.rect = this.container.append('rect')
		},
		startRect (pos) {
			this.move = true;
			this.start = pos;
			var transform = this.opts.parent.transform;
			if (transform) {
				this.start.x -= transform.x;
				this.start.y -= transform.y;
				this.start.x *= 1/transform.k;
				this.start.y *= 1/transform.k;
			}
			this.rect.attr('class', 'showRect');
		},
		setRect (pos) {
			if (!this.move) {
				return;
			}
			var transform = this.opts.parent.transform;
			if (transform) {
				pos.x -= transform.x;
				pos.y -= transform.y;
				pos.x *= 1/transform.k;
				pos.y *= 1/transform.k;
			}
			var x = 0;
			var y = 0;
			var width = 0;
			var height = 0;
			if (pos.x <= this.start.x) {
				x = pos.x;
			} else {
				x = this.start.x;
			}
			width = Math.abs(this.start.x - pos.x);
			if (pos.y <= this.start.y) {
				y = pos.y;
			} else {
				y = this.start.y;
			}
			height = Math.abs(this.start.y - pos.y);
			this.rect.attr('width', width).attr('height', height).attr('x', x).attr('y', y)
			this.setSelectNode(x, y, x+width, y+height);
		},
		setSelectNode (x1, y1, x2, y2) {
			let nodes = this.opts.parent.nodes;
			this.opts.parent.nodes = nodes.map (item => {
				var className = this.opts.parent.nodesCollect.select(`g#${item.id}`).attr('class');
				if (item.fx >= x1 && item.fx <= x2 && item.fy >= y1 && item.fy <= y2) {
					if (className.indexOf('selectNodeRect') === -1) {
						className += ' selectNodeRect';
					}
					item.select = true;
				} else {
					if (className.indexOf('selectNodeRect') !== -1) {
						className = className.replace(/selectNodeRect/g,'');
					}
					item.select = false;
				}
				this.opts.parent.nodesCollect.select(`g#${item.id}`).attr('class',className);
				return item;
			})
		},
		clearSelectNode () {
			this.opts.parent.nodesCollect.selectAll(`g.selectNodeRect`).attr('class','nodeGroup');
			this.opts.parent.nodes = this.opts.parent.nodes.map(item => {
				item.select = false;
				return item;
			})
		},
		clearRect () {
			this.move = false;
			this.rect.attr('class', '').attr('width', '0').attr('height', '0')
		}
	}
	
	return CreateTemplateRect;
})