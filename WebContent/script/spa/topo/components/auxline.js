/**
 * 辅助线
 */
define(['d3'], function (d3) {
	let AuxLine = function (container, opts = {}) {
		this.opts = opts;
		this.container = container;
		this.parent = opts.parent;
		this.lineX = null;
		this.lineY = null;
		this.init();
	}
	AuxLine.prototype = {
		init () {
			this.lineX = this.container.append('line').attr('id', 'A_linex')
			this.lineY = this.container.append('line').attr('id', 'A_liney')
		},
		setLine (pos) {
			this.lineX.attr('class', 'linexy-topo').attr('x1', 0).attr('y1', pos.y).attr('x2', this.parent.w).attr('y2', pos.y)
			this.lineY.attr('class', 'linexy-topo').attr('x1', pos.x).attr('y1', 0).attr('x2', pos.x).attr('y2', this.parent.h)
		},
		destory () {
			this.container.selectAll('line').attr('class', '');
		}
	}
	return AuxLine;
})