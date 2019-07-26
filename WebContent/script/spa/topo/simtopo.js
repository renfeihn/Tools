/**
 * 简单拓扑
 */
define(['d3'], function (d3) {
	let SimTopo = function (ele, opts = {}) {
		typeof(ele) == 'string' && (ele = document.getElementById(ele));
		this.ele = ele;
		this.w = ele.scrollWidth;
		this.h = ele.scrollHeight;
		this.opts = opts;
		this.nodes = [];
		this.linkDistance = opts.linkDistance || 180;
		this.svg = d3.select(ele).append('svg').attr("width", this.w).attr('height', this.h);
		this.init();
	}
	
	SimTopo.prototype = {
		init () {
			this.setTopoContent();
			this.setSimulation();
			this.setMarker();
		},
		setSimulation () {
			this.simulation = d3.forceSimulation().force('collide', d3.forceCollide(0))
										.alphaTarget(0)
										.force("charge", null)
										.force('link', d3.forceLink().id(function (d) {
											return d.id;
										}).strength(0.1))
										.force('center', d3.forceCenter(this.w/2, this.h/2));
		},
		setTopoContent () {
			let that = this;
			let gContent = this.svg.append('g').attr('transform-origin', `center center 0`);
			this.svg.on("dblclick.zoom", null);
			this.markerCollect = gContent.append('g').attr('class','markerCollect');
			this.relationCollect = gContent.append('g').attr('class','linesCollect');
			this.nodesCollect = gContent.append('g').attr('class','nodesCollect');
			this.linesCollect = this.relationCollect;
		},
		setCenterPath (nodePos, round) {
			var centerG = this.relationCollect.append('g');
			var x1 = this.w/2;
			var x2 = this.w/2;
			var y1 = 5;
			var y2 = nodePos.y;
			if (round !== 0) {
				y1 = nodePos.y;
				y2 = this.h - 5;
			}
			centerG.append('line').attr('x1', x1).attr('x2', x2)
			.attr('y1', y1).attr('y2', y2).attr('stroke-width', 1)
			.attr('stroke', '#0083CE').attr('marker-end', 'url(#markerBlue)');
			if (round !== 0) { 
				centerG.select('line').attr('marker-end', 'url(#markerBlue1)')
			}
		},
		setMarker () {
//			this.markerCollect.append('marker')
//			.attr('id', 'markerBlue')
//			.attr('markerUnits', 'strokeWidth')//用于确定marker是否进行缩放。取值strokeWidth和userSpaceOnUse，
//			.attr('refX', 28) //箭头坐标
//			.attr('refY', 4)
//			.attr('markerWidth', 8)
//			.attr('markerHeight', 8)
//			.attr('orient', 'auto')//绘制方向，可设定为：auto（自动确认方向）和 角度值
//			.attr('stroke-width', 2)//箭头宽度
//			.append('path')
//			.attr('d', 'M0,0 L8,4 L0,8 L2,4 L0,0')//箭头的路径
//			.attr('fill', '#029ed9')//箭头颜色
			let position = {
					up: {
						x: 5,
						orient: '90deg'
					},
					down: {
						x: -67,
						orient: '270deg'
					}
					
			};
			let direction = this.opts.direction;
			this.markerCollect.append('marker')
			.attr('id', 'markerBlue1')
			.attr('markerUnits', 'strokeWidth')//用于确定marker是否进行缩放。取值strokeWidth和userSpaceOnUse，
			.attr('refX', position[direction]['x']) //箭头坐标
			.attr('refY', 4)
			.attr('markerWidth', 8)
			.attr('markerHeight', 8)
			.attr('orient', position[direction]['orient'])//绘制方向，可设定为：auto（自动确认方向）和 角度值
			.attr('stroke-width', 2)//箭头宽度
			.append('path')
			.attr('d', 'M0,0 L8,4 L0,8 L2,4 L0,0')//箭头的路径
			.attr('fill', '#029ed9')//箭头颜色
		},
		addNodes (nodes) {
			if (!Array.isArray(nodes)) {
				nodes = [nodes];
			}
			this.nodes = this.nodes.concat(nodes);
		},
		setNode () {
			this.nodesCollect.selectAll('g').data(this.nodes).enter().append('g').attr('class','nodeGroup').
			attr('fill', '#0083CE').each(function () {
				let enterG = d3.select(this).append('g');
				enterG.append('title').text(function(d) {
					return d.name;
				})
				enterG.append('circle').attr('r', 20).attr('id', function (d) {
					return d.id;
				})
				enterG.append('image').attr('width', 60).attr('height', 60).attr('transform','translate(-30,-30)').attr('href', function (d) {
					return d.image;
				})
				let enterA = d3.select(this).append('a').attr('target','_top');
				enterA.append('text').attr('class','nodetext').text(function (d) {
					return d.name;
				}).attr('stroke','none').attr("fill",'#0083CE').attr('text-anchor', 'middle').attr('y','48');
				enterA.append('rect').attr('class','noderect').attr('width', function (d) {
					return d.name.length * 12
				}).attr('height', 21).attr('opacity', 0).attr('rx', 8).attr('y', 33).on('mouseover', function () {
					d3.select(this).attr('opacity', 0.3)
				}).on('mouseout', function () {
					d3.select(this).attr('opacity', 0)
				})
			})
		},
		ticked() {
			this.nodesCollect.selectAll('g.nodeGroup').each(function(d) {
				if (d && d.x) {
					d.fx = d.x;
					d.fy = d.y;
				}
		   	});
			this.nodesCollect.selectAll('g.nodeGroup').attr('transform',function(d){
				return `translate(${d.x},${d.y})`;
			})
			this.nodesCollect.selectAll('rect.noderect').attr('x', function () {
				return -d3.select(this).attr('width') >> 1
			})
		},
		update () {
			let nodes = this.nodes;
			let links = this.links;
			this.nodesCollect.selectAll('g').remove();
			this.setNodePos();
			this.setNode();
			this.simulation.nodes(nodes).on('tick', this.ticked.bind(this));
			this.simulation.alphaTarget(0).restart();
		},
		setNodePos () {
			var round = this.opts.round;
			var x = this.w / 2;
			var y = this.h - 50
			if (round !== 0) {
				y = 50;
			}
			this.setCenterPath({x, y}, round);
			this.nodes = this.nodes.map(item => {
				item.x = x;
				item.y = y;
				item.fx = x;
				item.fy = y;
				return item;
			})
		},
		destory () {
			this.nodes.splice(0,0);
			this.simulation().alphaTarget(0).stop();
			this.update();
		}
	}
	
	return SimTopo;
})