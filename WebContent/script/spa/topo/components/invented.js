/**
 * 拖拽虚拟节点
 */

define(['d3'], function (d3) {
	let Invented = function (opts = {}) {
		this.current = {x: 0, y: 0};
		this.opts = opts;
		this.step = 20;
	}
	Invented.prototype = {
		init (opts) {
			this.type = opts.type || 'div';
			this.r = opts.circle;
			this.optsX = opts;
			this.container = opts.container;
		},
		createInvente () {
			this.dom = null;
			switch(this.type) {
				case 'div':
					this.dom = document.createElement('div');
					break;
				case 'circle':
					this.container.select('circle.svg-topo-invented') && this.container.select('circle.svg-topo-invented').remove();
					this.dom = this.container.append('circle').attr('r', this.r).attr('class','svg-topo-invented').attr('fill', 'rgba(30,161,236,.3)')
					break;
				case 'rect':
					this.container.select('circle.svg-topo-invented') && this.container.select('circle.svg-topo-invented').remove();
					this.dom = this.container.append('rect').attr('width', this.optsX.width).attr('height', this.optsX.height).attr('class','svg-topo-invented').attr('fill', 'rgba(30,161,236,.3)')
					break;
			}
		},
		setXy (pos, type, tag) {
			if (type && type === 'colony') {
				pos.x -= this.optsX.width/2;
			}
			if (Math.abs(pos.x - this.current.x) > this.step) {
				this.current['x'] += this.setValue(pos.x - this.current.x);
				this.container.attr('transform', `translate(${this.current['x']}, ${this.current.y})`);
			}
			if (Math.abs(pos.y - this.current.y) > this.step) {
				this.current['y'] += this.setValue(pos.y - this.current.y);
				this.container.attr('transform', `translate(${this.current.x}, ${this.current['y']})`);
			}
			if (type && type === 'colony') {
				this.opts.parent.auxLine.setLine({x: this.current.x + this.optsX.width/2, y: this.current.y});
			} else {
				this.opts.parent.auxLine.setLine(this.current);
			}
		},
		setValue (value) {
			value =  value - value % this.step;
			return value;
		},
		destory() {
			this.opts.parent.auxLine && this.opts.parent.auxLine.destory();
			this.container.select('.svg-topo-invented') && this.container.select('.svg-topo-invented').remove();
		}
	}
	return Invented;
});