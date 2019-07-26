/**
 * 层级显示
 */
define(['d3V5'], function (d3) {
	let levelGrid = function (opts = {}) {
		this.level = [
			{
				name: '应用服务层',
				level: 1
			},
			{
				name: '应用层',
				level: 2
			},
			{
				name: '应用软件层',
				level: 3
			},
			{
				name: '应用系统层',
				level: 4
			},
			{
				name: '应用硬件层',
				level: 5
			},
			{
				name: '应用网络层',
				level: 6
			},
			{
				name: '机房',
				level: 7
			}
		]
		this.opts = opts;
		this.container = opts.parent.levelGrid;
		this.marginLeft = opts.parent.marginLeft;
		this.init();
	}
	
	let fn = levelGrid.prototype;
	
	fn.init = function () {
		this.setRectLine();
	}
	
	fn.getLevel = function () {
		return this.level;
	}
	
	fn.setRectLine = function () {
		this.h = this.opts.parent.h;
		this.w = this.opts.parent.w;
		let len = this.level.length;
		let rectHeight = parseInt((this.h - 30) / len);
		for(let i = 0 ; i < len ; i ++ ) {
			if (i === 0) {
				this.level[i].y = 30;
			}else {
				this.level[i].y = this.level[i-1].height + this.level[i-1].y
			}
			this.level[i].height = rectHeight;
			this.level[i].width = this.w;
			this.level[i].index = i;
			(i%2 !== 0) && (this.level[i].fill = '#F6F6F7');
			(i%2 === 0) && (this.level[i].fill = '#FFF');
		}
		let that = this;
		this.container.selectAll('g').data(this.level).enter().append('g').attr('class','levelGroup').attr('fill', 'transparent')
		.each(function (d) {
			d3.select(this).attr('transform', `translate(${that.marginLeft},${d.y})`).attr('id', 'level' + d.index).attr('fill', d.fill);
			let rect = d3.select(this).append('rect').attr('id', 'level' + d.index).attr('class', 'levelRect').attr('width', d.width).attr('height', d.height)
			let text = d3.select(this).append('text').attr('style', 'writing-mode: tb;font-size: 12px;')
			.attr('fill', 'rgb(0, 131, 206)').text(d.name).attr('x', -20).attr('y', function () {
				let chineseLen = d.name.match(/[\u4E00-\u9FA5\uF900-\uFA2D]/g).length;
				let englishLen = d.name.length - chineseLen;
				return d.height / 2 - (chineseLen * 13 + englishLen * 8) / 2;
			});
		})
	}
	
	fn.updateLine = function () {
		this.h = this.opts.parent.h;
		this.w = this.opts.parent.w;
		let len = this.level.length;
		let rectHeight = parseInt((this.h - 30) / len);
		for(let i = 0 ; i < len ; i ++ ) {
			if (i === 0) {
				this.level[i].y = 30;
			}else {
				this.level[i].y = this.level[i-1].height + this.level[i-1].y
			}
			this.level[i].height = rectHeight;
			this.level[i].width = this.w;
			this.container.select('g#level' + i).attr('transform', `translate(${this.marginLeft},${this.level[i].y})`);
			this.container.select('rect#level' + i).attr('width', this.level[i].width);
		}
	}
	
	return levelGrid
	
	
})