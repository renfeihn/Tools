/**
 * topo图插件 d3 v4.x
 */
define(['d3V5', 'TopoDragType', 'Invented', 'Menu', 'AuxLine', 'CreateTemplateRect','script/spa/topo/common/colorMap','script/spa/topo/common/animation.js'], 
		function (d3, TopoDragType, Invented, Menu, AuxLine, CreateTemplateRect, colorMap, animation) {
	let Topology = function  (ele, opts = {}) {
		typeof(ele) == 'string' && (ele = document.getElementById(ele));
		this.ele = ele;
		this.w = ele.scrollWidth;
		this.h = ele.scrollHeight;
		this.markerCollect = null;
		this.linesCollect = null;
		this.nodesCollect = null;
		this.relationCollect = null;
		this.sourceDef = null;	//源节点所属模型
		this.targetDef = null;	//目的节点所属模型
		this.linkDistance = opts.linkDistance || 180;
		this.startX = 150;
		this.circle = 20;
		this.nodes = [];
		this.links = [];
		this.scale = 1;
		this.moveTag = false;
		this.showCentextMenu = true;
		this.defaultBottom = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAABpCAYAAABf9DMoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0I2NkEyMzU1RjcyMTFFOTkwRTk5QjhBQUFBNURDRjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0I2NkEyMzY1RjcyMTFFOTkwRTk5QjhBQUFBNURDRjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQjY2QTIzMzVGNzIxMUU5OTBFOTlCOEFBQUE1RENGNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQjY2QTIzNDVGNzIxMUU5OTBFOTlCOEFBQUE1RENGNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpAQ4aMAAAniSURBVHja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';
		this.defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0I1N0ZCQTA1Rjc5MTFFOTkwRTk5QjhBQUFBNURDRjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0I1N0ZCQTE1Rjc5MTFFOTkwRTk5QjhBQUFBNURDRjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQjU3RkI5RTVGNzkxMUU5OTBFOTlCOEFBQUE1RENGNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQjU3RkI5RjVGNzkxMUU5OTBFOTlCOEFBQUE1RENGNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpWMVoEAAB1pSURBVHja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';
		this.selectNode = null;
		this.opts = opts;
		this.menu = new Menu(ele, {parent: this});
		this.svg = d3.select(ele).append('svg').attr("width", this.w).attr('height', this.h);
		this.makerName = 'maker'+new Date().getTime();
		this.init();
	}
	Topology.prototype = {
		init () {
			this.networdGrid = this.svg.append('g').attr('class','networdGrid');
			this.setTopoContent();
			this.setSimulation();
			this.setMarker();
			this.setCircleMarker();
			this.invented = new Invented({parent: this});
			this.createTmp = new CreateTemplateRect(this.rectTmp, {parent: this});
			this.auxLine = new AuxLine(this.auxlineNode, {parent: this});
			this.dragType = new TopoDragType(this.svg, this);
			this.setNetwordGrid();
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
			let gContent = this.svg.append('g').attr('class', 'outerG');
			
			this.rectTmp = gContent.append('g').attr('class','rectTmp');
			this.inventNode = gContent.append('g').attr('class','inventNode');
			this.auxlineNode = gContent.append('g').attr('class','auxlineNode');
			this.centerLine = gContent.append('g').attr('class','centerLine');
			this.markerCollect = gContent.append('g').attr('class','markerCollect');
			this.relationCollect = gContent.append('g').attr('class','linesCollect');
			this.nodesCollect = gContent.append('g').attr('class','nodesCollect');
			this.linesCollect = this.relationCollect;
//			let zoomed = d3.zoom().scaleExtent([.1,2]).on('zoom', function (e){
//				const transform = d3.event.transform;
//				that.scale = transform.k;
//				gContent.attr("transform", d3.event.transform);
//				//gContent.attr('transform', `scale(${transform.k})`).attr('transform-origin', `${transform.x}px ${transform.y}px 0`);
//			});
//			this.svg.call(zoomed);
			this.svg.on("dblclick.zoom", null);
			if (!this.opts.noEvent) {
				this.svg.on("dragenter", function () {
					d3.event.preventDefault();
					that.dragType && that.dragType.dragenter()
				}).on("dragover", function () {
					d3.event.preventDefault();
					that.dragType && that.dragType.dragover()
				}).on("dragleave", function () {
					d3.event.preventDefault();
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					that.dragType && that.dragType.dragleave()
				}).on("mousemove", that.mousemove.bind(that))
				.on('mouseup', function () {
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					that.dragType.move = false;
					that.createTmp.clearRect();
					that.moveTag = false;
					that.svg.select('path.tempLink').remove();
				}).on('contextmenu', function () {
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					d3.event.preventDefault();
				})
				.on('mousedown', function () {
					if (that.moveTag) {
						return false;
					}
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					d3.event.preventDefault();
					if (d3.event.button === 2) {
						that.createTmp.startRect({x: d3.event.offsetX, y: d3.event.offsetY})
					}
					that.createTmp.clearSelectNode();
					that.centerLine.selectAll('.currentinit').attr('class','').attr('stroke', '#CFE1F0');
				})
				this.addDrop();
			}
		},
		addDrop () {
			let that = this;
			this.svg.on("drop", function () {
				d3.event.preventDefault();
				d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
				that.dropFun(d3.event);
			})
		},
		dropFun (e, node) {
			if (!e) {
				e = {};
				e['offsetX'] = 0;
				e['offsetY'] = 0;
				e['dataTransfer'] = JSON.stringify(node);
			}
			this.dragType && this.dragType.drop(e)
			this.opts.dropNode && this.opts.dropNode(e);
			this.opts.dropFn && this.opts.dropFn(e);
		},
		removeDrop () {
			this.svg.on("drop", null);
		},
		setMarker () {
			this.markerCollect.append('marker')
			.attr('id', this.makerName)
			.attr('markerUnits', 'strokeWidth')//用于确定marker是否进行缩放。取值strokeWidth和userSpaceOnUse，
			.attr('refX', 40)//箭头坐标
			.attr('refY', 3)
			.attr('markerWidth', 8)
			.attr('markerHeight', 8)
			.attr('orient', 'auto')//绘制方向，可设定为：auto（自动确认方向）和 角度值
			.attr('stroke-width', 2)//箭头宽度
			.append('path')
			.attr('d', 'M0,0 L6,3 L0,6 L2,3 L0,0')//箭头的路径
			.attr('fill', '#029ed9')//箭头颜色
		},
		setCircleMarker () {
			this.markerCollect.append('marker')
			.attr('id', 'markerCircle')
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
		setLines () {
			let that = this;
			this.linesCollect.selectAll('line').data(this.links).enter().append('path')
			.attr('stroke-width', colorMap.StrokeWidth).attr('stroke', colorMap.RelateLineFill).attr('id', function (d) {
				return `${d.source.id ? d.source.id : d.source}_${d.target.id ? d.target.id: d.target}`;
			}).each(function(d) {
				if (d.source && d.source === d.target || (d.source.id && d.source.id === d.target.id)) {
					d3.select(this).attr('marker-end', (d, i) => {
						return 'url(#'+that.makerName+')'
					})
				} else {
					d3.select(this).attr('marker-end', (d, i) => {
						return 'url(#'+that.makerName+')'
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
				relaG.append('rect').attr('id', 'rect' + (d.relId || d.index)).attr('class','edge-label-relation').attr('height', 18).attr('cursor', 'pointer').attr('rx', 2).attr('ry', 2).attr('width', function (d) {
					return (d.relation.length * 18) < 40 ? 40 :d.relation.length * 18
				}).attr('fill', colorMap.RelateRectFill)
				relaG.append('text').attr('class','link-text-type').attr('fill', '#FFF').attr('cursor', 'pointer').attr('text-anchor', 'middle').text(function (d) {
					return d.relation
				}).attr('fill', colorMap.RelateTextFill)
				let relaTextG = relaG.append('g').attr('cursor', 'pointer').attr('class', 'relaTextG')
				relaTextG.append('text').attr('class','link-text').attr('opacity','0').attr('fill', '#FFF').attr('text-anchor', 'middle').text(function (d) {
					return d.com;
				})
				let relaDelG = relaG.append('g').attr('cursor', 'pointer').attr('class', 'relaDelG').attr('opacity','0')
				.on('click', function (d)  {
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					var source = d.source.id;
					var target = d.target.id;
					that.removeLink(source, target)
				})
				relaDelG.append('circle').attr('r','6').attr('fill', '#ff5252')
				relaDelG.append('text').attr('class','edge-remove-tag').attr('fill', '#FFF').attr('text-anchor', 'middle').text('-').attr('x', 0).attr('y', 3)
			})
		},
		setNode () {
			let that = this;
			this.nodesCollect.selectAll('g').data(this.nodes).enter().append('g').attr('class','nodeGroup')
				.on("click", that.click.bind(that))
				.on("mouseover", that.mouseoverNode.bind(that))
				.on("mouseout", that.mouseoutNode.bind(that))
				.on("contextmenu", that.contextmenu.bind(that))
				.on("dblclick", that.dblclick.bind(that))
				.call(d3.drag().clickDistance(20)
					.on('start', that.dragStart.bind(that))
					.on('drag', that.drag.bind(that))
					.on('end', that.end.bind(that))).each(function (d) {
				
				if (!!d.expend) {
					d3.select(this).attr('class','nodeGroup expandNoed');
				}
				d3.select(this).attr('id', d.id).attr('dmdefid',d.dmdefid).attr('name',d.name).attr('ename',d.ename);
				if (d.type === 'colony') {
					that.setColonyNode(d, this);
				} else {
					let enterG = d3.select(this).append('g');
					enterG.append('title').text(function(d) {
						return d.name;
					});
					enterG.append('circle').attr('r', that.circle).attr('id', function (d) {
						return d.id;
					}).attr('fill', 'none');
					
					enterG.append('image').attr('width', 60).attr('height', 60).attr('transform','translate(-30,-20)').attr('href', function (d) {
						return that.defaultBottom;
					})
					enterG.append('image').attr('width', 80).attr('height', 80).attr('transform','translate(-40,-40)').attr('href', function (d) {
						if(d.img){
							return d.img;
						}
						return that.defaultImg;
					})
					let enterA = d3.select(this).append('a').attr('target','_top');
					enterA.append('rect').attr('class','noderect').attr('width', function (d) {
						var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
						var match = d.name.match(reg);
						var chineses = match ? match.join('').length : 0;
						var english = d.name.length - chineses;
						return english * 8 + chineses * 13;
					}).attr('height', 18).attr('opacity', 1).attr('fill', '#FFF').attr('stroke', '#1EA1EC').attr('y', 20)
					enterA.append('text').attr('class','nodetext').text(function (d) {
						return d.name;
					}).attr('stroke','none').attr("fill",'#1EA1EC').attr('text-anchor', 'middle').attr('y','34').attr('style','font-size: 12px;');
				}
			})
			if (!this.opts.noRelationLink) {
				this.nodesCollect.selectAll('g.nodeGroup')
				.on("mousedown", that.mousedown.bind(that))
				.on("mouseup", that.mouseup.bind(that))
			}
		},
		dblclick (d) {
			d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
			d3.event.preventDefault();
			if (d.type !== 'colony') {
				this.opts.dblclick && this.opts.dblclick(d);
			}
		},
		mouseoverNode (d) {
			var up = this.findUpWater(d.id);
			var down = this.findDownWater(d.id);
			up.nodes.forEach(item => {
				this.svg.select('circle#'+item.id).attr('class', 'activeSelectNodeHover')
			})
			up.links.forEach(item => {
				this.svg.select('path#'+item.id).attr('class', 'activeSelectLineHover')
			})
			up.links.forEach(item => {
				this.svg.select('rect#rect'+item.relId || item.index).attr('class', 'edge-label-relation activeSelectLineHover')
			})
			down.nodes.forEach(item => {
				this.svg.select('circle#'+item.id).attr('class', 'activeSelectNodeHover')
			})
			down.links.forEach(item => {
				this.svg.select('path#'+item.id).attr('class', 'activeSelectLineHover')
			})
			down.links.forEach(item => {
				this.svg.select('rect#rect'+(item.relId || item.index)).attr('class', 'edge-label-relation activeSelectLineHover')
			})
		},
		mouseoutNode () {
			this.svg.selectAll('circle.activeSelectNodeHover').attr('class', '');
			this.svg.selectAll('path.activeSelectNodeHover').attr('class', '');
			this.relationCollect.selectAll('rect.activeSelectLineHover').attr('class', 'edge-label-relation');
		},
		findUpWater (id) {
			var nodeId = [];
			var links = this.links.filter(item => {
				if (item.target.id === id) {
					nodeId.push(item.source.id)
					return true;
				}
				return false;
			})
			var set = new Set(nodeId);
			nodeId = Array.from(set);
			var nodes = this.nodes.filter(item => {
				if (nodeId.includes(item.id)) {
					return true;
				}
				return false;
			})
			return {
				links,
				nodes
			}
		},
		findDownWater (id) {
			var nodeId = [];
			var links = this.links.filter(item => {
				if (item.source.id === id) {
					nodeId.push(item.target.id)
					return true;
				}
				return false;
			})
			var set = new Set(nodeId);
			nodeId = Array.from(set);
			var nodes = this.nodes.filter(item => {
				if (nodeId.includes(item.id)) {
					return true;
				}
				return false;
			})
			return {
				links,
				nodes
			}
		},
		setColonyNode (d, current) {
			var id = d.id;
			var obj = this.dragType.Colony[id];
			var children = obj.children;
			if (!children) {
				children = [];
			}
			var height = children.length === 0 ? 100 : Math.ceil(children.length / 5) * 100;
			height += 20;
			var width = 110;
			if (children.length >= 5) {
				width = 5 * width;
			} else if (children.length === 0) {
				width = 100;
			} else {
				width = Math.ceil(children.length % 5) * width;
			}
			if (width > 500) {
				width = 500;
			}
			var foreignObject = d3.select(current).append('foreignObject').attr('width', width).attr('height', height).attr('transform',`translate(-${width>>1},-20)`);
			foreignObject.html(`<body xmlns="http://www.w3.org/1999/xhtml">${obj.getInnerHTML()}</body>`)
		},
		click (d) {
			if (!!d.expend) {
				d.expend = false;
			} else {
				d.expend = true;
			}
			d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
			this.opts.clickNode && this.opts.clickNode(d, animation)
		},
		contextmenu (d) {
			d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
			d3.event.preventDefault();
			this.showCentextMenu && this.menu.setPosition(d3.event.x, d3.event.y, d.id);
		},
		mousedown () {
			this.showCentextMenu = true;
			this.moveTag = true;
			d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
			d3.event.preventDefault();
			if (d3.event.button === 2) {
				let closest = $(d3.event.target.closest('g.nodeGroup'));
				this.sourceDef = {
						id: closest.attr('id'),
						dmdefid: closest.attr('dmdefid'),
						name: closest.attr('name'),
						ename: closest.attr('ename'),
				};
				this.dragType.mousedown(d3.event);
			}
		},
		mousemove () {
			d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
			d3.event.preventDefault();
			this.dragType.mousemove(d3.event);
			this.createTmp.setRect({x: d3.event.offsetX, y: d3.event.offsetY});
		},
		mouseup () {
			this.moveTag = false;
			d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
			d3.event.preventDefault();
			if (d3.event.button === 2) {
				let closest = $(d3.event.target.closest('g.nodeGroup'));
				this.targetDef = {
						id: closest.attr('id'),
						dmdefid: closest.attr('dmdefid'),
						name: closest.attr('name'),
						ename: closest.attr('ename'),
				};
				if(this.sourceDef.id == this.targetDef.id){
					return;
				}
				this.showCentextMenu = false;
				this.opts.addRelationModal && this.opts.addRelationModal($(d3.event.target.closest('g.nodeGroup')).attr('id'),this.sourceDef,this.targetDef);
			} else {
				this.svg.select('path.tempLink').remove();
			}
		},
		getSelectNodeById () {
			var id = [];
			this.nodes.forEach(item => {
				if (this.nodesCollect.select(`g#${item.id}`).attr('class').indexOf('selectNodeRect') !== -1) {
					id.push(item.id);
				}
			})
			return id;
		},
		dragStart (d) {
			d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
			if (d.type !== 'colony') {
				this.invented.init({
					type: 'circle',
					circle: 20,
					container: this.inventNode
				});
				this.invented.createInvente();
				this.invented.setXy({x: d.x, y: d.y});
			} else {
				var ff = this.nodesCollect.select(`g#${d.id}`).select('foreignObject');
				var w = ff.attr('width')
				var h = ff.attr('height');
				this.invented.init({
					type: 'rect',
					width: w,
					height: h,
					container: this.inventNode
				});
				this.invented.createInvente();
				this.invented.setXy({x: d.x, y: d.y}, d.type, 1);
			}
			this.simulation.alphaTarget(0.1).restart();
			d.fixed = true //偏移后固定不动
			d.fx = d.x;
			d.fy = d.y;
		},
		drag (d) {
			d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
	        this.dragRule(d, d3.event);
	        this.invented.setXy({x: d3.event.x, y: d3.event.y}, d.type);
	        this.simulation.alphaTarget(0.1).restart();
		},
		dragRule (d, event) {
			
			var fx = event.x;
			var fy = event.y;
			var offsetX = d.fx - fx;
			var offsetY = d.fy - fy;
			var nodesSelect = this.getSelectNodeById();
			this.nodes = this.nodes.map(item => {
				if(nodesSelect.includes(item.id)) {
					item.fx -= offsetX;
					item.fy -= offsetY;
				}
				return item;
			})
			d.fx = fx;
	        d.fy = fy;
		},
		end (d) {
			d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
			if (d.type !== 'colony') {
				var offsetX = d.fx - this.invented.current.x;
				var offsetY = d.fy - this.invented.current.y;
				var nodesSelect = this.getSelectNodeById();
				this.nodes = this.nodes.map(item => {
					if(nodesSelect.includes(item.id)) {
						item.fx -= offsetX;
						item.fy -= offsetY;
					}
					return item;
				})
				d.fx = this.invented.current.x;
		        d.fy = this.invented.current.y;
			} else {
				var ff = this.nodesCollect.select(`g#${d.id}`).select('foreignObject');
				var w = ff.attr('width')
				var h = ff.attr('height');
				d.fx = this.dragType.stepRule(this.invented.current.x + w / 2);
			}
	        this.invented && this.invented.destory();
			this.simulation.alphaTarget(0);
		},
		ticked () {
			let that = this;
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
			this.relationCollect.selectAll('rect').attr('x', function (d) {
				var width = d3.select(this).attr('width')
				if (d.source.id === d.target.id) {
					return d.source.x + 40 - width
				}
				return (d.source.x + d.target.x) / 2 - (width >> 1)
			}).attr('y', function (d) {
				var height = d3.select(this).attr('height')
				if (d.source.id === d.target.id) { 
					return d.source.y - 40 - (height >> 1)
				}
				return (d.source.y + d.target.y) / 2 - (height >> 1)
			})
			this.relationCollect.selectAll('.link-text-type').attr('x', function (d) {
				var width = d3.select(this.parentNode).select('rect').attr('width')
				if (d.source.id === d.target.id) {
					return d.source.x - (width >> 1) + 22 + 15
				}
				return (d.source.x + d.target.x) / 2 - (width >> 1) + 22
			}).attr('y', function (d) {
				var height = d3.select(this.parentNode).select('rect').attr('height')
				if (d.source.id === d.target.id) { 
					return d.source.y - 40 - (height >> 1) +  14
				}
				return (d.source.y + d.target.y) / 2 - (height >> 1) + 14
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
			if (nodes.length === 1) {
				var tag = this.nodes.some((item => {
					return item.id === nodes[0].id;
				}))
				if (!tag) {
					this.nodes = this.nodes.concat(nodes);
				}
			} else {
				this.nodes = this.nodes.concat(nodes);
			}
			this.nodes.forEach(item => {
				if (item.type === 'colony') {
					this.dragType.setColonyNodeType(item)
				}
				return item;
			})
		},
		getNodeName (id) {
			var name = '';
			this.nodes.forEach(item => {
				if (item.id === id) {
					name = item.name;
				}
			})
			return name;
		},
		modifyNodeName (id, name) {
			this.nodes = this.nodes.map(item => {
				if (item.id === id) {
					item.name = name;
				}
				return item;
			})
			this.update();
		},
		delNode (id) {
			this.nodes = this.nodes.filter(item => {
				if (item.id === id) {
					return false;
				}
				return true;
			})
			this.links = this.links.filter(item => {
				if (item.source.id === id || item.target.id === id) {
					return false;
				}
				return true;
			})
			this.update();
			this.opts.delNodeFn && this.opts.delNodeFn();
		},
		removeLink (source, target) {
			let links = this.links;
			links = links.filter(item => {
				if (item.source.id === source && item.target.id === target) {
					return false;
				}
				return true;
			})
			this.links = links;
			this.update();
		},
		removeLinkById (relId) {
			let links = this.links;
			links = links.filter(item => {
				if (item.relId === relId) {
					return false;
				}
				return true;
			})
			this.links = links;
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
		removeNodeById (id) {
			let nodes = this.nodes;
			nodes = nodes.filter(item => {
				if (item.id === id) {
					return false
				}
				return true;
			})
			this.nodes = nodes;
			this.update();
		},
		addLinks (links) {
			if (!Array.isArray(links)) {
				links = [links];
			}
			links.forEach(link => {
				var tag = this.links.some((item => {
					if (!item.relId) {
						return false;
					}
					if (item.source.id) {
						return item.source.id === link.source.id && item.target.id === link.target.id
					}
					return item.source === link.source && item.target === link.target
				}))
				if (!tag) {
					this.links = this.links.concat([link]);
				}
			})
			this.links = this.links.map((item, index) => {
				item.index = index + 1;
				return item;
			})
			console.log(this.links)
		},
		update () {
			let nodes = this.nodes;
			let links = this.links;
			let linkDistance = this.linkDistance;
			this.linesCollect.selectAll('path').remove();
			this.nodesCollect.selectAll('g').remove();
			this.relationCollect.selectAll('.linetext').remove();
			
			this.setNode();
			this.setLines();
			this.setRelationText();
			this.simulation.nodes(nodes).on('tick', this.ticked.bind(this));
			this.simulation.force("link").links(links);
			this.simulation.alphaTarget(0).restart();
		},
		destory () {
			this.nodes.length = 0;
			this.links.length = 0;
			this.dragType.clearLine();
			this.update();
		},
		triggerZoom (zoom) {
			if (zoom > 2) {
				zoom = 2;
			} else if (zoom < 1){
				zoom = 1;
			}
			this.scale = zoom;
			this.svg.select('g.outerG').attr('transform', `scale(${zoom})`).attr('transform-origin', 'center center')
		},
		getSelectNode () {
			return this.nodes.filter(item => {
				if (item.select) {
					return true;
				}
				return false;
			})
		},
		leftAlign () {
			// 找到最左边的节点
			var node = this.getSelectNode();
			if (node.length === 1 || node.length === 0) {
				return;
			}
			node = node.sort(function (a, b) {
				return a.fx - b.fx;
			})
			var minLeft = node[0].fx;
			this.nodes = this.nodes.map(item => {
				if (item.select) {
					item.x = minLeft;
					item.fx = minLeft;
				}
				return item;
			})
			this.update();
		},
		centerAlign () {
			var node = this.getSelectNode();
			if (node.length === 1 || node.length === 0) {
				return;
			}
			this.nodes = this.nodes.map(item => {
				if (item.select) {
					item.x = this.dragType.stepRule(this.w/2);
					item.fx = this.dragType.stepRule(this.w/2);
				}
				return item;
			})
			this.update();
		},
		rightAlign () {
			var node = this.getSelectNode();
			if (node.length === 1 || node.length === 0) {
				return;
			}
			node = node.sort(function (a, b) {
				return b.fx - a.fx;
			})
			var maxLeft = node[0].fx;
			this.nodes = this.nodes.map(item => {
				if (item.select) {
					item.x = maxLeft;
					item.fx = maxLeft;
				}
				return item;
			})
		},
		topAlign () {
			var node = this.getSelectNode();
			if (node.length === 1 || node.length === 0) {
				return;
			}
			node = node.sort(function (a, b) {
				return a.fy - b.fy;
			})
			var minTop = node[0].fy;
			this.nodes = this.nodes.map(item => {
				if (item.select) {
					item.y = minTop;
					item.fy = minTop;
				}
				return item;
			})
			this.update();
		},
		bottomAlign () {
			var node = this.getSelectNode();
			if (node.length === 1 || node.length === 0) {
				return;
			}
			node = node.sort(function (a, b) {
				return b.fy - a.fy;
			})
			var maxTop = node[0].fy;
			this.nodes = this.nodes.map(item => {
				if (item.select) {
					item.y = maxTop;
					item.fy = maxTop;
				}
				return item;
			})
			this.update();
		},
		rowAvgAlign () {
			var node = this.getSelectNode();
			if (node.length === 1 || node.length === 0) {
				return;
			}
			node = node.sort(function (a, b) {
				return b.fx - a.fx;
			})
			var maxLeft = node[0].fx;
			var minLeft = node[node.length - 1].fx;
			var centerWidth = (maxLeft - minLeft) / (node.length - 1);
			node = node.reverse().map((item, index) => {
				if (index !== 0) {
					item.fx = (node[index - 1].fx + centerWidth);
				}
				return item;
			})
			this.nodes = this.nodes.map(item => {
				try {
					var nodeTmp = this.findById(node, item.id);
					item.fx = nodeTmp.fx;
				} catch (e) {
				}
				return  item;
			})
			this.update();
		},
		colsAvgAlign () {
			var node = this.getSelectNode();
			if (node.length === 1 || node.length === 0) {
				return;
			}
			node = node.sort(function (a, b) {
				return b.fy - a.fy;
			})
			var maxTop = node[0].fy;
			var minTop = node[node.length - 1].fy;
			var centerHeight = (maxTop - minTop) / (node.length - 1);
			node = node.reverse().map((item, index) => {
				if (index !== 0) {
					item.fy = (node[index - 1].fy + centerHeight);
				}
				return item;
			})
			this.nodes = this.nodes.map(item => {
				try {
					var nodeTmp = this.findById(node, item.id);
					item.fy = nodeTmp.fy;
				} catch (e) {
				}
				return  item;
			})
			this.update();
		},
		findById (nodes, id) {
			return nodes.filter(item => {
				return item.id === id;
			})[0];
		},
		setNetwordGrid () {
			this.networdGrid.selectAll('line').remove();
			var index = 0;
			for(var i = 0 ; i < this.w ; i ++ ) {
				if (i % 5 === 0) {
					var line = this.networdGrid.append('line').attr('x1', i).attr('y1', 0).attr('x2', i).attr('y2', this.h).attr('class', 'netword-grid-line')
					if (index ++ % 4 === 0) {
						line.attr('class', 'netword-grid-line weight-line').attr('stroke', colorMap.LineWeightStroke)
					} else {
						line.attr('stroke', colorMap.LineNoramlStroke)
					}
				}
			}
			index = 0;
			for(var i = 0 ; i < this.h ; i ++ ) {
				if (i % 5 === 0) {
					var line = this.networdGrid.append('line').attr('x1', 0).attr('y1', i).attr('x2', this.w).attr('y2', i).attr('class', 'netword-grid-line')
					if (index ++ % 4 === 0) {
						line.attr('class', 'netword-grid-line weight-line').attr('stroke', colorMap.LineWeightStroke)
					} else {
						line.attr('stroke', colorMap.LineNoramlStroke)
					}
				}
			}
		},
		resize (tag, width) {
			this.w = this.ele.scrollWidth;
			if(!tag) {
				this.w -= width || 200
			}
			this.svg.attr("width", this.w).attr('height', this.h);
			this.setNetwordGrid();
			this.dragType.reCalCulLineBlock();
			this.dragType.setTextArray();
		},
		getContent () {
			return Object.assign ({}, {
				nodes: this.nodes.map(item => {
					if (item.type === 'colony') {
						item.children = this.dragType.Colony[item.id].children;
						item.colonyTitle = this.dragType.Colony[item.id].title;
					}
					return item;
				}),
				links: this.links,
			}, this.dragType.getContent())
		},
		restore() {
			this.update();
			this.dragType.reCalCulLineBlock()
			this.dragType.setTextArray()
			this.centerLine.selectAll('.currentinit').attr('class','').attr('stroke', '#CFE1F0');
		},
		reNameId (id) {
			return 'topo_agree_'+id;
		},
		getNodeIdByNumber (id) {
			return parseInt(id.replace(/topo_agree_/g, ''))
		},
		updateNodeById (id, config, tag) {
			this.nodes = this.nodes.map(item => {
				if (item.id === id) {
					Object.keys(item).forEach(key => {
						config[key] && (item[key] = config[key])
					})
				}
				return item;
			})
			if (!!tag) {
				
			} else {
				this.update();
			}
		},
		getNodeById (id) {
			return this.nodes.filter(item => {
				if (item.id === id) {
					return true;
				}
				return false;
			});
		},
		setNodePosition (id, round) {
			var node = this.getNodeById(id);
			if (node.length === 0) {
				return;
			}
			if (round === 1) {
				return this.findByUp(node[0]);
			} else {
				return this.findByDown(node[0]);
			}
		},
		findByUp (node) {
			var fx = node.fx;
			var fy = node.fy;
			var upCenterPos = {
				x: fx,
				y: fy + this.linkDistance
			}
			return this.findLine(upCenterPos)
		},
		findByDown (node) {
			var fx = node.fx;
			var fy = node.fy;
			var downCenterPos = {
				x: fx,
				y: fy - this.linkDistance
			}
			return this.findLine(downCenterPos)
		},
		findLine (pos) {
			var tag = true;
			var dis = 30;
			var pp = {};
			var leftOrRight = 1;
			while (tag) {
				var x1 = pos.x - this.circle;
				var x2 = pos.x + this.circle;
				var y1 = pos.y + this.circle;
				var y2 = pos.y - this.circle;
				var flag = this.nodes.every(item =>{
					if (item.fy > y1 || item.fy < y1) {
						return true;
					} else if (item.fy > y2 || item.fy < y2) {
						return true;
					} else if (x1 < item.fy - this.circle - dis && x2 < item.fy - this.circle - dis) {
						return true;
					} else if (x1 > item.fy + this.circle + dis && x2 > item.fy + this.circle + dis) {
						return true;
					}
					return false;
				})
				if (flag) {
					pp = {
						fx: pos.x,
						fy: pos.y
					}
					tag = false;
				} else {
					if (leftOrRight > 0) {
						leftOrRight = -leftOrRight;
					} else {
						leftOrRight = Math.abs(leftOrRight) + 1;
					}
					pos.x += dis * leftOrRight;
				}
			}
			return pp;
		}
	}
	
	return Topology;
})