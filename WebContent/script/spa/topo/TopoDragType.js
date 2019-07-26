/**
 * drag type 判断
 */

define(['d3V5', 'Colony','script/spa/topo/common/colorMap'], function (d3, Colony,colorMap) {
	
	
	/**
	 * 为了起到效果，所有的元素的位置必须在 step的整数倍上
	 */
	var TopoDragType = function (svg , parent ,opts = {}) {
		this.svg = svg;
		this.parent = parent;
		this.lineBlock = [];
		this.Colony = [];
		this.nodeDis = 30;
		this.step = 20;
		this.move = false;
		this.moveStart = {
			x: 0,
			y: 0
		};
		this.text = [];
		this.linkCurrent = {};
		this.current = {
			offsetX: -1,
			offsetY: -1,
		}
		this.opts = opts;
	}
	TopoDragType.prototype = {
		init () {
			
		},
		dragenter () {
			
		},
		dragover () {
			
		},
		dragleave () {
			
		},
		drop (e) {
			try {
				this.current = {
					offsetX: e.offsetX,
					offsetY: e.offsetY,
				}
				var cate = null;
				if (e.dataTransfer.getData) {
					cate = JSON.parse(e.dataTransfer.getData('cate'))
				} else {
					cate = JSON.parse(e.dataTransfer)
				}
				var uuid = 'A' + app.global.getUniqueId().replace(/-/g,'_');
				var type = parseInt(cate.cate);
				switch(type) {
					case 0:
						this.dropBlock(uuid);
						break;
					case 1:
						cate.id = 'topo_agree_' + cate.id;
						this.dropNode(cate.id, cate);
						break;
					case 2:
						this.dropColony(uuid, cate);
						break;
				}
			} catch (e) {
				console.log(e);
			}
		},
		mousedown (e) {
			this.move = true;
			var id = $(e.target.closest('g.nodeGroup')).attr('id');
			this.linkCurrent['source'] = id;
			var bbox = this.parent.ele.getBoundingClientRect();
			this.moveStart = {
				x: e.x - bbox.left,
				y: e.y - bbox.top
			}
		},
		mousemove (e) {
			if (this.move) {
				var bbox = this.parent.ele.getBoundingClientRect();
				var target = {
					x: e.x - bbox.left - 1,
					y: e.y - bbox.top - 1
				}
				this.createTmpLink(this.moveStart, target);
			}
		},
		createTmpLink (source, target) {
			if ($('path.tempLink').length === 0) {
				this.svg.append('path').attr('class','tempLink').attr('stroke-width', 1).attr('fill', 'none').attr('stroke','#FF8080')
				.attr('marker-end', (d, i) => {
					return 'url(#markerBlue)'
				})
			}
			d3.select('path.tempLink').attr('d', function () {
				return `M ${source.x} ${source.y} L ${target.x} ${target.y}`;
			})
		},
		mouseup (id, name, other) {
			this.move = false;
			this.svg.select('path.tempLink').remove();
			if (id) {
				this.linkCurrent['target'] = id;
				this.linkCurrent['relation'] = name;
				this.linkCurrent['other'] = other;
				other.relId && (this.linkCurrent['relId'] = other.relId);
				this.parent.addLinks(this.linkCurrent);
				this.parent.update();
				this.linkCurrent = {};
			} else {
				this.svg.select('path.tempLink').remove();
			}
		},
		dropBlock () {
			var uuid = 'A' + app.global.getUniqueId().replace(/-/g,'_');
			if (this.lineBlock.length === 0) {
				var y1 = this.parent.h / 2;
				y1 = this.stepRule(y1);
				this.setLine(0, y1, this.parent.w, y1, uuid);
				this.lineBlock.push({
					uuid: uuid,
					x1: 0,
					y1: y1,
					x2: this.parent.w,
					y2: y1
				})
			} else {
				this.getDistance(uuid);
			}
			this.setTextBlock(uuid);
		},
		dropNode (id, cate, type) {
			var minMax = this.calculaionNode();
			var yCenter = (minMax.max.y + minMax.min.y) / 2;
			var rangeNode = this.findRangeNode(minMax);
			var fx = this.stepRule(this.parent.w / 2)
			var fy = this.stepRule(yCenter)
			if (rangeNode.length === 0) {
				this.parent.addNodes({
					id: id,
					dmdefid: cate.dmdefid,
					dmDefId: cate.dmdefid,
					name: cate.name, 
					ename: cate.ename,
					img: cate.img,
					fx: fx, 
					fy: fy,
					x: fx, 
					y: fy,
					type
				})
				this.parent.update()
			} else {
				var xy = this.getCurrentXy(rangeNode);
				var fx = this.stepRule(xy.x)
				var fy = this.stepRule(xy.y)
				this.parent.addNodes({
					id: id,
					dmdefid: cate.dmdefid,
					dmDefId: cate.dmdefid,
					name: cate.name, 
					ename: cate.ename,
					img: cate.img,
					fx,
					fy,
					x: fx,
					y: fy,
					type
				})
				this.parent.update()
			}
		},
		getCurrentXy (rangeNode) {
			rangeNode = rangeNode.reverse();
			var range = {x: -1,y: -1};
			for(var i = 0 ; i < rangeNode.length ; i ++) {
				var tmpIRangeX1 = rangeNode[i].fx + this.parent.circle * 2 + this.nodeDis;
				var tmpIRangeY1 = rangeNode[i].fy + this.parent.circle * 2 + this.nodeDis;
				var tmpIRangeX2 = rangeNode[i].fx - this.parent.circle * 2 - this.nodeDis;
				var tmpIRangeY2 = rangeNode[i].fy - this.parent.circle * 2 - this.nodeDis;
				range = {x: rangeNode[i].fx + this.parent.circle * 2 + this.nodeDis,y: rangeNode[i].fy};
				for(var j = 0 ; j < rangeNode.length ; j ++) {
					if (i !== j) {
						var random = parseInt(Math.random(0,1) * 4) + 1;
						var tmpJRangeX1 = rangeNode[i].fx + this.parent.circle;
						var tmpJRangeY1 = rangeNode[i].fy + this.parent.circle;
						var tmpJRangeX2 = rangeNode[i].fx - this.parent.circle;
						var tmpJRangeY2 = rangeNode[i].fy - this.parent.circle;
						if (tmpIRangeX1 > tmpJRangeX1) {
							range = {
								x: rangeNode[i].fx + this.parent.circle * 2 + this.nodeDis,
								y: rangeNode[i].fy
							}
						} else if (tmpJRangeX2 > tmpIRangeX2) {
							range = {
								x: rangeNode[i].fx - this.parent.circle * 2 - this.nodeDis,
								y: rangeNode[i].fy
							}
						} else if (tmpIRangeY1 > tmpJRangeY1) {
							range = {
								x: rangeNode[i].fx,
								y: rangeNode[i].fy + this.parent.circle * 2 + this.nodeDis
							}
						} else if (tmpJRangeY2 > tmpIRangeY2) {
							range = {
								x: rangeNode[i].fx,
								y: rangeNode[i].fy - this.parent.circle * 2 - this.nodeDis
							}
						}
					}
				}
			}
			return range;
		},
		findRangeNode (minMax) {
			var minY = minMax.min.y;
			var maxY = minMax.max.y;
			var rangeArr = [];
			this.parent.nodes = this.parent.nodes.reverse();
			var nodes = this.parent.nodes;
			for(var i = 0 ; i < nodes.length ; i ++ ) {
				if (nodes[i].fy > minY && nodes[i].fy < maxY) {
					rangeArr.push(nodes[i]);
				}
			}
			return rangeArr;
		},
		calculaionNode () {
			var tmp = this.lineBlock.sort((a, b) => {
				return (a.y1 - this.current.offsetY) - (b.y1 - this.current.offsetY)
			})
			var tmp1 = tmp.filter(item => {
				return ((item.y1 - this.current.offsetY) > 0)
			})
			var min = null;
			var max = null;
			if (tmp1.length === 0) {
				min = tmp[tmp.length - 1];
			} else {
				try {
					min = tmp[this.findIndexByUUid(tmp1[0].uuid) - 1];
				} catch (e) {
				}
				max = tmp1[0]
			}
			if (min === null || min === undefined) {
				min = {y: 0}
			} else {
				min = {y: min.y1}
			}
			if (max === null || max === undefined) {
				max = {y: this.parent.h}
			} else {
				max = {y: max.y1}
			}
			return {min, max};
		},
		updateColonyTitle (uuid, name) {
			if (this.Colony[uuid]) {
				this.Colony[uuid].title = name;
			}
		},
		dropColony (cate) {
			var uuid = 'A' + app.global.getUniqueId().replace(/-/g,'_');
			var parent = this.parent;
			var colony = new Colony({uuid, parent});
			this.Colony[uuid] = colony;
			this.dropNode(uuid, cate, 'colony');
		},
		setColonyNodeType (item) {
			var parent = this.parent;
			var colony = new Colony({uuid:item.id, parent});
			colony.children = item.children || [];
			item.colonyTitle && (colony.title = item.colonyTitle);
			this.Colony[item.id] = colony;
		},
		getDistance (uuid) {
			var lineBlock = JSON.parse(JSON.stringify(this.lineBlock));
			var tmp = lineBlock.sort((a, b) => {
				return Math.abs(a.y1 - this.current.offsetY) - Math.abs(b.y1 - this.current.offsetY)
			})
			var min = tmp[0];
			var index = this.findIndexByUUid(min.uuid);
			if (min.y1 - this.current.offsetY < 0) {
				this.lineBlock = this.lineBlock.slice(0, index + 1).concat({
					uuid,
					x1: 0,
					y1: this.parent.h / 2,
					x2: this.parent.w,
					y2: this.parent.h / 2
				},this.lineBlock.slice(index + 1))
			} else {
				this.lineBlock = this.lineBlock.slice(0, index).concat({
					uuid,
					x1: 0,
					y1: this.parent.h / 2,
					x2: this.parent.w,
					y2: this.parent.h / 2
				}, this.lineBlock.slice(index))
			}
			this.reCalCulLineBlock();
		},
		reCalCulLineBlock() {
			this.parent.centerLine.selectAll('.currentinit').attr('class','').attr('stroke', '#CFE1F0');
			var len = this.lineBlock.length + 1;
			this.lineBlock = this.lineBlock.map((item, index) => {
				var y1 = this.stepRule(this.parent.h / len * (index + 1));
				item.y1 = y1;
				item.y2 = item.y1;
				var hasLine = this.parent.ele.querySelector(`line#${item.uuid}`) ? true : false;
				if (hasLine) {
					this.updateLine(item.x1, item.y1, this.parent.w, item.y2, item.uuid);
				} else {
					this.setLine(item.x1, item.y1, this.parent.w, item.y2, item.uuid);
				}
				return item;
			})
		},
		findIndexByUUid (uuid) {
			var index = -1;
			this.lineBlock.forEach((item, ind) => {
				if (item.uuid === uuid) {
					index = ind;
				}
			})
			return index;
		},
		findTextIndexByUUid (uuid) {
			var index = -1;
			this.text.forEach((item, ind) => {
				if (item.uuid === uuid) {
					index = ind;
				}
			})
			return index;
		},
		setTextBlock (uuid) {
			/**
			 * 数组中存放以当前lineBlock为长度+1的块级文件显示 将第一个定为多出来的那一个,这个的ID为 template_text
			 */
			if (this.findTextIndexByUUid('template_text') === -1) {
				this.text.push({
					id: 'template_text',
					text: '点击添加文字',
					x: -1,
					y: -1
				})
			}
			var lineIndex = this.findIndexByUUid(uuid) + 1;
			if (!this.text[lineIndex] || this.text[lineIndex].id !== uuid) {
				this.text = this.text.slice(0, lineIndex).concat({
					id: uuid,
					x: -1,
					y: -1,
					text: '点击添加文字'
				}, this.text.slice(lineIndex))
			}
			this.setTextArray()
		},
		setTextArray () {
			this.text = this.text.map((item, index) => {
				let pos = null
				if (item.id === 'template_text') {
					var y1 = null;
					if (this.lineBlock.length === 0) {
						y1 = this.parent.h;
					} else {
						y1 = this.lineBlock[0].y1;
					}
					pos = this.calculateTextPos(0, y1, item.text.length)
				} else {
					var min = this.lineBlock[index - 1].y1;
					var max = null;
					if (index > this.lineBlock.length - 1) {
						max = this.parent.h;
					} else {
						max = this.lineBlock[index].y1;
					}
					pos = this.calculateTextPos(parseInt(min), parseInt(max), item.text.length)
				}
				item.x = pos.x;
				item.y = pos.y;
				var hasLine = this.parent.ele.querySelector(`text#${item.id}`) ? true : false;
				if (hasLine) {
					this.updateText(item.id, item.x, item.y, item.text);
				} else {
					this.setText(item.id, item.x, item.y, item.text);
				}
				return item;
			})
		},
		calculateTextPos (min, max, length) {
			var center = (max + min) / 2;
			var y = center - (length / 2) * 15;
			var x = this.parent.w - 20;
			return {
				x, y
			}
		},
		setText (id, x, y, text) {
			let that = this;
			this.parent.centerLine.append('text').attr('id', id).attr('style', 'writing-mode: tb;font-size: 12px;').attr('x', x).attr('y', y).attr('dominant-baseline', 'middle').text(text)
			.attr('cursor', 'pointer')
			.on('click', function () {
				d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
				that.parent.opts.modifyText && that.parent.opts.modifyText(id, d3.select(this).text());
			});
		},
		updateTextById(id, text) {
			this.text = this.text.map(item => {
				if (item.id === id) {
					item.text = text;
				}
				return item;
			})
			var hasLine = this.parent.ele.querySelector(`text#${id}`) ? true : false;
			if (hasLine) {
				this.parent.centerLine.selectAll(`text#${id}`).text(text);
			}
		},
		updateText (id, x, y, text) {
			this.parent.centerLine.selectAll(`text#${id}`).attr('id', id).attr('x', x).attr('y', y).text(text)
		},
		setLine (x1, y1, x2, y2, id) {
			var that = this;
			this.parent.centerLine.append('line').attr('id', id).attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2)
			.attr('stroke-width', 3).attr('stroke', '#CFE1F0').attr('stroke', colorMap.SupLineStroke).attr('class', 'currentinit').attr('cursor', 'pointer')
			.on('contextmenu', function (d) {
				console.log('contextmenu')
//				d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
//				d3.event.preventDefault();
				that.parent.menu.setPosition(d3.event.x, d3.event.y, d3.select(this).attr('id'));
			});
		},
		clearLine () {
			this.lineBlock = [];
			this.text = this.text.slice(0,1);
			this.parent.centerLine.selectAll(`line`).remove();
			this.parent.centerLine.selectAll(`text`).remove();
			this.setTextArray()
		},
		delLine (uuid) {
			this.lineBlock = this.lineBlock.filter((item, ind) => {
				if (item.uuid === uuid) {
					return false
				}
				return true;
			})
			this.text = this.text.filter(item => {
				if (item.id === uuid) {
					return false;
				}
				return true;
			})
			this.parent.centerLine.selectAll(`line#${uuid}`).remove();
			this.parent.centerLine.selectAll(`text#${uuid}`).remove();
			this.setTextArray()
		},
		updateLine(x1, y1, x2, y2, id) {
			this.parent.centerLine.selectAll(`line#${id}`).attr('x1', x1).attr('y1', y1).attr('x2', x2).attr('y2', y2);
		},
		stepRule (pos) {
			if (pos % this.step !== 0) {
				var tmp = pos % this.step;
				pos = tmp > pos / 2 ? (pos + this.step - tmp) : (pos - tmp);
			}
			return pos;
		},
		getContent () {
			return {
				lineBlock: this.lineBlock,
				text: this.text
			}
		}
	}
	
	return TopoDragType;
})