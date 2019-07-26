/**
 * topo图插件 d3 v4.x
 */
define(['d3V5','clickNode','script/spa/topo/common/animation.js'], function (d3, ClickNode, animation) {

	let Topology = function  (ele, opts = {}) {
		typeof(ele) == 'string' && (ele = document.getElementById(ele));
		this.ele = ele;
		this.w = ele.scrollWidth;
		this.h = ele.scrollHeight;
		this.markerCollect = null;
		this.linesCollect = null;
		this.nodesCollect = null;
		this.relationCollect = null;
		this.linkDistance = opts.linkDistance || 180;
		this.startX = 100;
		this.nodes = [];
		this.links = [];
		this.scale = 1;
		this.selectNode = null;
		this.opts = opts;
		this.svg = d3.select(ele).append('svg').attr("width", this.w).attr('height', this.h);
		this.maker = 'maker'+new Date().getTime();
		this.clickNode = new ClickNode({topo: this})
		this.init();
	}
	Topology.prototype = {
		init () {
			this.centerLine = this.svg.append('g').attr('class','centerLine');
			this.setTopoContent();
			this.setCenterLine();
			this.setSimulation();
			this.setMarker();
			this.setCircleMarker();
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
			let zoomed = d3.zoom().scaleExtent([.5,2]).on('zoom', function (){
				const transform = d3.event.transform;
				gContent.attr('transform', `scale(${transform.k})`);
			});
			this.svg.call(zoomed);
			this.svg.on("dblclick.zoom", null);
			this.markerCollect = gContent.append('g').attr('class','markerCollect');
			this.relationCollect = gContent.append('g').attr('class','linesCollect');
			this.nodesCollect = gContent.append('g').attr('class','nodesCollect');
			this.linesCollect = this.relationCollect;
		},
		setCenterLine(dis = 0) {
			this.centerLine.selectAll('line').remove();
			this.centerLine.append('line').attr('x1', 0).attr('y1', this.h/2 + dis).attr('x2', this.w).attr('y2', this.h/2 + dis)
			.attr('stroke-width', 1).attr('stroke', '#CFE1F0');
		},
		setCircleMarker () {
			this.markerCollect.append('marker')
			.attr('id', this.maker + '1')
			.attr('markerUnits', 'strokeWidth')//用于确定marker是否进行缩放。取值strokeWidth和userSpaceOnUse，
			.attr('refX', 10)//箭头坐标
			.attr('refY', 2)
			.attr('markerWidth', 8)
			.attr('markerHeight', 8)
			.attr('orient', 'auto')//绘制方向，可设定为：auto（自动确认方向）和 角度值
			.attr('stroke-width', 2)//箭头宽度
			.append('path')
			.attr('d', 'M0,0 L6,3 L0,6 L2,3 L0,0')//箭头的路径
			.attr('fill', '#029ed9')//箭头颜色
		},
		setMarker () {
			this.markerCollect.append('marker')
			.attr('id', this.maker + '2')
			.attr('markerUnits', 'strokeWidth')//用于确定marker是否进行缩放。取值strokeWidth和userSpaceOnUse，
			.attr('refX', 25)//箭头坐标
			.attr('refY', 3)
			.attr('markerWidth', 8)
			.attr('markerHeight', 8)
			.attr('orient', 'auto')//绘制方向，可设定为：auto（自动确认方向）和 角度值
			.attr('stroke-width', 2)//箭头宽度
			.append('path')
			.attr('d', 'M0,0 L6,3 L0,6 L2,3 L0,0')//箭头的路径
			.attr('fill', '#029ed9')//箭头颜色
		},
		setLines () {
			let that = this;
			this.linesCollect.selectAll('line').data(this.links).enter().append('path')
			.attr('class', 'nodelines').attr('id', function (d) {
				return `${d.source.id ? d.source.id : d.source}_${d.target.id ? d.target.id: d.target}`;
			}).attr('stroke-width', 1).attr('fill', 'none').attr('stroke','#1D889A')
			.each(function(d) {
				if (d.source && d.source === d.target || (d.source.id && d.source.id === d.target.id)) {
					d3.select(this).attr('marker-end', (d, i) => {
						return 'url(#'+that.maker + '1'+')'
					})
				} else {
					d3.select(this).attr('marker-end', (d, i) => {
						return 'url(#'+that.maker + '2'+')'
					})
				}
				
			})
		},
		setRelationText () {
			let that = this;
			this.relationCollect.selectAll('g').data(this.links).enter().append('g').attr('class','linetext').each(function(d) {
				let relaG = d3.select(this).append('g');
				relaG.on('mouseover', function (d) {
					if (d.com) {
						d3.select(this).select('rect').attr('height', 36)
						d3.select(this).select('.link-text').attr('opacity','1')
					}
					d3.select(this).select('g.relaDelG').attr('opacity','1')
					if (!d3.event.active) that.simulation.alphaTarget(0.1).restart();
				}).on('mouseout', function (d) {
					if (d.com) {
						d3.select(this).select('rect').attr('height', 18)
						d3.select(this).select('.link-text').attr('opacity','0')
					}
					d3.select(this).select('g.relaDelG').attr('opacity','0')
					if (!d3.event.active) that.simulation.alphaTarget(0.1).restart();
				})
				let relaTextLabel = relaG.append('g').attr('cursor', 'pointer').attr('class', 'relaTextLabel')
				relaTextLabel.append('rect').attr('class','edge-label-relation').attr('height', 18).attr('cursor', 'pointer').attr('rx', 2).attr('ry', 2).attr('width', function (d) {
					return d.relation.length * 20
				}).attr('fill', '#1fd0ca');
				relaTextLabel.append('text').attr('class','link-text-type').attr('fill', '#FFF').attr('cursor', 'pointer').attr('text-anchor', 'middle').text(function (d) {
					return d.relation
				}).attr('x', function (d) {
					return d.relation.length * 20 / 2
				}).attr('y', 13);
				let relaTextG = relaG.append('g').attr('cursor', 'pointer').attr('class', 'relaTextG')
				relaTextG.append('text').attr('class','link-text').attr('opacity','0').attr('fill', '#FFF').attr('text-anchor', 'middle').text(function (d) {
					return d.com;
				})
				if (!that.opts.noDelFun) {
					if (!d.extend) {
						relaG.on('click', function (d) {
							d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
              var source = d.sourceId;
              var target = d.targetId;
              that.opts.removeLinks && that.opts.removeLinks(d, d3.event,  this.getBBox());
							// that.removeLink(source, target, d3.event)
              console.log(d)
						})
						let relaDelG = relaG.append('g').attr('cursor', 'pointer').attr('class', 'relaDelG').attr('opacity','0')
						relaDelG.append('circle').attr('r','6').attr('fill', '#ff5252')
						relaDelG.append('text').attr('class','edge-remove-tag').attr('fill', '#FFF').attr('text-anchor', 'middle').text('-').attr('x', 0).attr('y', 3)
					}
				}
			})
		},
		removeLink (source, target) {
			let links = this.links;
			let nodes = this.nodes;
			let nodesId = [];
			links = links.filter(item => {
				if (item.source.id === source && item.target.id === target) {
					nodesId.push(item.source.id)
					nodesId.push(item.target.id)
					return false;
				}
				return true;
			})
			nodes = nodes.filter(item => {
				if (item.type !== '1' && nodesId.some(id => item.id == id)){
					return false;
				}
				return true;
			})
			this.links = links;
			this.nodes = nodes;
			this.update();
			this.opts.removeLinks && this.opts.removeLinks(source, target);
		},
		setNode () {
			let that = this;
			this.nodesCollect.selectAll('g').data(this.nodes).enter().append('g').attr('class','nodeGroup').attr('fill', '#0083CE').attr('cursor', 'pointer')
				.call(d3.drag().clickDistance(20)
					.on('start', that.dragStart.bind(that))
					.on('drag', that.drag.bind(that))
					.on('end', that.end.bind(that)))
					.on("dblclick", function (d) {
						that.opts.showDetailNode && that.opts.showDetailNode(d);
					}).each(function () {
				let enterG = d3.select(this).append('g');
				enterG.append('title').text(function(d) {
					return d.name;
				})
				enterG.append('circle').attr('r', 20).attr('id', function (d) {
					return d.id;
				})
				enterG.append('image').attr('width', 60).attr('height', 60).attr('transform','translate(-30,-30)').attr('href', function (d) {
					return d.image;
				}).on('click', function (d) {
					if (!!d.expand) {
						d.expand = false;
					} else {
						d.expand = true;
					}
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					d = that.unityChildren(d);
					that.clickNode.setClickNode(d);
					that.clickNode.setSearchNodeEvent({level: 1});
				})
				let enterA = d3.select(this).append('a').attr('target','_top').on('mouseover', function () {
					d3.event.preventDefault();
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					console.log(d3.select(this).select('rect.noderect'))
					d3.select(this).select('rect.noderect').attr('opacity', 0.3)
				}).on('mouseout', function () {
					d3.event.preventDefault();
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					d3.select(this).select('rect.noderect').attr('opacity', 0)
				}).on("click", function (d) {
					d3.event.preventDefault();
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					that.opts.drillDown && that.opts.drillDown(d);
				});;
				enterA.append('text').attr('class','nodetext').text(function (d) {
					return d.name;
				}).attr('stroke','none').attr("fill",'#0083CE').attr('text-anchor', 'middle')
				.attr('y','38')
				
				enterA.append('rect').attr('class','noderect').attr('width', function (d) {
					return d.name.length * 12
				}).attr('height', 21).attr('opacity', 0).attr('rx', 8).attr('y', 23).attr('fill', '#AAADB3');
			})
		},
		click () {
			d3.event.preventDefault();
		},
		getNodeById(id) {
			return this.nodes.filter(item => {
				if (item.id === id) {
					return true;
				}
				return false;
			});
		},
		removeLinkById(id) {
			this.links = this.links.filter(item => {
				return item.id !== id;
			})
		},
		removeNodeById(id) {
			this.nodes = this.nodes.filter(item => {
				return item.id !== id;
			})
		},
		getLinkById (source, target) {
			return this.links.filter(item => {
				if (item.source.id) {
					if (item.source.id === source && item.target.id === target) {
						return true;
					}
				} else {
					if (item.source === source && item.target === target) {
						return true;
					}
				}
				return false;
			});
		},
		updateNodeById (id, config) {
			this.nodes = this.nodes.map(item => {
				if (item.id === id) {
					Object.keys(item).forEach(key => {
						config[key] && (item[key] = config[key])
					})
				}
				return item;
			})
		},
		unityChildren(d) {
			d.children = d.contains;
			d.children = d.children.map(item => {
				item.dmDtId = item.id;
				item.appid = d.appid;
				item.image = d.image;
				return item;
			})
			return d;
		},
		findRelation (id) {
			let links = this.links;
			let tmp = [];
			links.forEach(item => {
				if (item.source.id === id || item.target.id === id) {
					tmp.push(item);
				}
			});
			d3.selectAll('path.nodelines.active').attr('class','nodelines');
			tmp.forEach(item => {
				d3.select(`path[id=${item.source.id}_${item.target.id}]`).attr('class','nodelines active');
			})
		},
		dragStart (d) {
			if (!d3.event.active) this.simulation.alphaTarget(0.1).restart();
			d.fixed = true //偏移后固定不动
			d.fx = d.x;
			d.fy = d.y;
		},
		drag (d) {
	        this.dragRule(d, d3.event);
		},
		dragRule (d, event) {
			var type = parseInt(d.type);
			var fx = event.x;
			var fy = event.y;
			switch(type) {
				case 0:
					if (fy >= this.h/2 - 20) {
						fy = this.h/2 - 20
					}
					break;
				case 1:
					fy = this.h/2;
					break;
				case 2:
					if (fy <= this.h/2 + 20) {
						fy = this.h/2 + 20
					}
					break;
			}
			d.fx = fx;
	        d.fy = fy;
		},
		end (d) {
			if (!d3.event.active) this.simulation.alphaTarget(0);
		},
		ticked () {
			try {
				this.linesCollect.selectAll('path').attr('d', function(d) {
					if (d.source.id === d.target.id) {
						return `M ${d.source.x} ${d.source.y} A20 20 0 1 1 ${d.target.x + 20} ${d.target.y}`
					} else {
						return `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`;
					}
				})
				this.nodesCollect.selectAll('g.nodeGroup').each(function(d) {
					if (d && d.x) {
						d.fx = d.x;
						d.fy = d.y;
					}
			   	});
				this.relationCollect.selectAll('g.relaTextLabel').attr('transform', function (d) {
					var width = d3.select(this).select('rect').attr('width')
					var height = d3.select(this).select('rect').attr('height')
					var x = (d.source.x + d.target.x) / 2 - (width >> 1)
					var y = (d.source.y + d.target.y) / 2 - (height >> 1)
					if (d.source.id === d.target.id) {
						x = d.source.x + 40 - width
					}
					if (d.source.id === d.target.id) { 
						y =  d.source.y - 40 - (height >> 1)
					}
					return `translate(${x}, ${y})`;
				})
				
				this.relationCollect.selectAll('g.relaDelG').attr('transform', function (d) {
					var width = d3.select(this.parentNode).select('rect').attr('width')
					var height = d3.select(this.parentNode).select('rect').attr('height')
					if (d.source.id === d.target.id) {
						return `translate(${d.source.x + parseInt(width) - 10},${d.source.y - 50})`;
					}
					return `translate(${(d.source.x + d.target.x) / 2 + (width >> 1)},${(d.source.y + d.target.y) / 2 - (height >> 1)})`;
				})
				
				this.nodesCollect.selectAll('g.nodeGroup').attr('transform',function(d){
					return `translate(${d.x},${d.y})`;
				})
				this.nodesCollect.selectAll('rect.noderect').attr('x', function () {
					return -d3.select(this).attr('width') >> 1
				})
			} catch (e) {
				this.simulation.alphaTarget(0).stop();
			}
		},
		getSelectNode () {
			return this.selectNode;
		},
		setSelectNode (node) {
			this.selectNode = node
		},
		addNodes (nodes) {
			if (!Array.isArray(nodes)) {
				nodes = [nodes];
			}
			this.nodes = this.nodes.concat(nodes);
		},
		calculation () {
			this.setCenterNode();
		},
		setCenterNode () {
			let tmp = this.nodes.filter(item => {
				if (item.type === '1') {
					item.x = this.w / 2;
					item.y = this.h / 2;
					return true
				}
				return false;
			})
			let topTmp = this.setTopCenterNode();
			let bottomTmp = this.setBottomCenterNode();
			let other = this.isOtherNode();
			this.nodes.splice(0,0);
			this.nodes = [].concat(tmp, topTmp, bottomTmp, other);
			this.nodes = this.nodes.map(item => {
				item.fx = item.x;
				item.fy = item.y;
				return item;
			})
		},
		setTopCenterNode (dis = 0) {
			let tmp = this.nodes.filter(item => {
				if (item.type === '0') {
					item.y = this.h / 2 - this.linkDistance + dis;
					return true
				}
				return false;
			})
			let startX = this.startX;
			if (tmp.length === 1) {
				tmp[0].x = this.w / 2;
			} else if (tmp.length % 2 === 0) {
				for(var i = 0 ; i < tmp.length / 2 ; i ++) {
					tmp[i].x = this.w / 2 - startX * (i + 1)
				}
				for(var i = tmp.length / 2 ; i < tmp.length ; i ++) {
					tmp[i].x = this.w / 2 + startX * (i - tmp.length / 2 + 1)
				}
			} else {
				for(var i = 0 ; i < (tmp.length - 1) / 2 ; i ++) {
					tmp[i].x = this.w / 2 - startX * (i + 1)
				}
				tmp[(tmp.length - 1) / 2].x = this.w / 2;
				for(var i = parseInt(tmp.length / 2) + 1; i < tmp.length ; i ++ ) {
					tmp[i].x = this.w / 2 + startX * (i - Math.ceil(tmp.length / 2) + 1)
				}
			}
			return tmp;
		},
		setBottomCenterNode (dis = 0) {
			let tmp = this.nodes.filter(item => {
				if (item.type === '2') {
					item.y = this.h / 2 + this.linkDistance + dis;
					return true
				}
				return false;
			})
			let startX = this.startX;
			if (tmp.length === 1) {
				tmp[0].x = this.w / 2;
			} else if (tmp.length % 2 === 0) {
				for(var i = 0 ; i < tmp.length / 2 ; i ++) {
					tmp[i].x = this.w / 2 - startX * (i + 1)
				}
				for(var i = tmp.length / 2 ; i < tmp.length ; i ++) {
					tmp[i].x = this.w / 2 + startX * (i - tmp.length / 2 + 1)
				}
			} else {
				for(var i = 0 ; i < (tmp.length - 1) / 2 ; i ++) {
					tmp[i].x = this.w / 2 - startX * (i + 1)
				}
				tmp[(tmp.length - 1) / 2].x = this.w / 2;
				for(var i = parseInt(tmp.length / 2) + 1; i < tmp.length ; i ++ ) {
					tmp[i].x = this.w / 2 + startX * (i - Math.ceil(tmp.length / 2) + 1)
				}
			}
			return tmp;
		},
		removeNode (id) {
			let nodes = this.nodes;
			let links = this.links;
			nodes = nodes.filter(item => {
				if (item.id === id) {
					return false
				}
				return true;
			})
			links = links.filter(item => {
				if (item.source.id === id || item.target.id === id) {
					return false;
				}
				return true;
			})
			

			this.nodes = nodes;
			this.links = links;
			this.update();
		},
		addLinks (links) {
			if (!Array.isArray(links)) {
				links = [links];
			}
			this.links = this.links.concat(links);
		},
		getCenterNode () {
			return this.nodes.filter(function (item) {
				return item.type === '1';
			}) 
		},
		update () {
			try {
				let nodes = this.nodes;
				this.links = this.links.filter(item => {
					if (item.source.id) {
						if (this.nodes.some(node => node.id === item.source.id) && 
								this.nodes.some(node => node.id === item.target.id)) {
							return true;
						}
						return false;
					} else {
						if (this.nodes.some(node => node.id === item.source) && 
								this.nodes.some(node => node.id === item.target)) {
							return true;
						}
						return false;
					}
				})
				let links = this.links;
				this.calculation();
				this.isNotSameNode();
				console.log(this.nodes, this.links);
				this.linesCollect.selectAll('path').remove();
				this.nodesCollect.selectAll('g').remove();
				this.relationCollect.selectAll('.linetext').remove();
				this.setNode();
				this.setLines();
				this.setRelationText();
				this.simulation.nodes(nodes).on('tick', this.ticked.bind(this));
				this.simulation.force("link").links(links);
				this.simulation.alphaTarget(0).restart();
			} catch (e) {
				this.simulation.alphaTarget(0).stop();
			}
		},
		destory () {
			this.nodes.splice(0,0);
			this.links.splice(0,0);
			this.simulation.alphaTarget(0).stop();
			this.update();
		},
		isNotSameNode: function () {
			let topTmp = this.setTopCenterNode();
			let bottomTmp = this.setBottomCenterNode();
			topTmp = topTmp.map(item => {
				if (bottomTmp.some(ii => ii.id === item.id)) {
					this.links.map(link => {
						if ((link.source.id && link.source.id == item.id) || (link.source && link.source == item.id)) {
							if (link.source.id) {
								link.source.id += 'up';
							} else {
								link.source += 'up';
							}
						}
						return link;
					})
					item.id += 'up'
				}
				return item;
			})
			let tmp = this.nodes.filter(item => {
				if (item.type === '1') {
					item.x = this.w / 2;
					item.y = this.h / 2;
					return true
				}
				return false;
			})
//			if (topTmp.length === 0) {
//				bottomTmp = this.setBottomCenterNode(-this.h / 3);
//				this.setCenterLine(-this.h / 3);
//				tmp[0].y += -this.h / 3;
//			}else if (bottomTmp.length === 0) {
//				topTmp = this.setTopCenterNode(this.h / 3);
//				this.setCenterLine(this.h / 3);
//				tmp[0].y += this.h / 3;
//			}
			this.nodes.splice(0,0);
			let other = this.isOtherNode();
			console.log(other)
			this.nodes = [].concat(tmp, topTmp, bottomTmp, other);
			this.nodes = this.nodes.map(item => {
				item.fx = item.x;
				item.fy = item.y;
				return item;
			})
		},
		isOtherNode () {
			var includes = ['0','1','2']
			return this.nodes.filter(item => {
				if (!includes.includes(item.type)) {
					return true
				}
				return false;
			})
		},
		findNodeByCateDefId (cateDefId) {
			return this.nodes.filter(item => {
				if (item.cateDefId == cateDefId) {
					return true;
				}
				return false;
			})[0];
		},
		reNameId(id, appid) {
			return 'node' + id + '_' + appid;
		}
	}
	
	return Topology;
})