/**
 * 查询节点子节点
 */
define([], function () {
	var SearchNode = function (opts) {
		this.opts = opts;
		this.round = opts.round;
		this.node = opts.node;
		this.nodeSize = 100;
		this.topo = opts.topo;
		this.animation = opts.animation;
		this.linkDistance = opts.linkDistance;
	}
	
	SearchNode.prototype = {
		findDirection () {
			var x = this.node.x;
			var y = this.node.y;
			var x1 = x - this.linkDistance;
			var x2 = x + this.linkDistance;
			var y1 = y - this.linkDistance;
			var y2 = y + this.linkDistance;
			if (y2 < this.round.y2){
				return 3;
			} else if (x1 > this.round.x1) {
				return 0;
			} else if (x2 < this.round.x2){
				return 1;
			} else if (y1 > this.round.y1){
				return 2;
			} else {
				this.linkDistance -= 10;
				this.findDirection();
			}
		},
		setDirectCalPos () {
			var d = this.node;
			var len = this.calWidth(d) * (this.nodeSize + 20);
			// var len = d.children.length * (this.nodeSize + 20);
			var direction = this.findDirection();
			var lineXy = {x: d.x,y: d.y - this.linkDistance};
			var lineTopXy = {x: d.x - len / 2,y: d.y - this.linkDistance};
			var lineBottomXy = {x: d.x + len / 2,y: d.y - this.linkDistance};
			if (direction === 0) {
				lineXy = {x: d.x - this.linkDistance,y: d.y}
				lineTopXy = {x: d.x - this.linkDistance,y: d.y - len / 2};
				lineBottomXy = {x: d.x - this.linkDistance,y: d.y + len / 2};
			} else if (direction === 1) {
				lineXy = {x: d.x + this.linkDistance,y: d.y}
				lineTopXy = {x: d.x + this.linkDistance,y: d.y - len / 2};
				lineBottomXy = {x: d.x + this.linkDistance,y: d.y + len / 2};
			} else if (direction === 3) {
				lineXy = {x: d.x,y: d.y + this.linkDistance};
				lineTopXy = {x: d.x - len / 2,y: d.y + this.linkDistance};
				lineBottomXy = {x: d.x + len / 2,y: d.y + this.linkDistance};
			}
			d.children = this.setDis(d.children, direction <= 1 ? 0 : 1, lineTopXy, lineBottomXy, lineXy);
		},
		setDirectCalPos1 () {
			var d = this.node;
			var len = d.parent.length * (this.nodeSize + 20);
			var direction = this.findDirection();
			var lineXy = {x: d.x,y: d.y + this.linkDistance};
			var lineTopXy = {x: d.x - len / 2,y: d.y + this.linkDistance};
			var lineBottomXy = {x: d.x + len / 2,y: d.y + this.linkDistance};
			if (direction === 0) {
				lineXy = {x: d.x + this.linkDistance,y: d.y}
				lineTopXy = {x: d.x + this.linkDistance,y: d.y - len / 2};
				lineBottomXy = {x: d.x + this.linkDistance,y: d.y + len / 2};
			} else if (direction === 1) {
				lineXy = {x: d.x - this.linkDistance,y: d.y}
				lineTopXy = {x: d.x - this.linkDistance,y: d.y - len / 2};
				lineBottomXy = {x: d.x - this.linkDistance,y: d.y + len / 2};
			} else if (direction === 3) {
				lineXy = {x: d.x,y: d.y - this.linkDistance};
				lineTopXy = {x: d.x - len / 2,y: d.y - this.linkDistance};
				lineBottomXy = {x: d.x + len / 2,y: d.y - this.linkDistance};
			}
			d.parent = this.setDis(d.parent, direction <= 1 ? 0 : 1, lineTopXy, lineBottomXy);
		},
		setDis (children, type, lineTopXy, lineBottomXy, lineXy) {
			if (type === 0) {	// 将y轴等分
				var topY = lineTopXy.y;
				var bottomY = lineBottomXy.y;
				for(var i = 0 ; i < children.length ; i ++ ) {
					if (i === 0) {
						children[i].y = topY + this.nodeSize / 2 + 10;
					} else {
						children[i].y = children[i - 1].y + 20 + this.nodeSize;
					}
					children[i].x = lineTopXy.x;
				}
			} else if (type === 1) {		// 将x轴等分
        var LeftX = lineTopXy.x;
        var bottomX = lineBottomXy.x;
        if (children.length === 1) {
          children[0].x = lineXy.x
          children[0].y = lineXy.y
        } else {
          for(var i = 0 ; i < children.length ; i ++ ) {
            if (i === 0) {
              children[i].x = LeftX + this.nodeSize / 2 + 10;
            } else if (i === children.length - 1) {
              children[i].x = bottomX - this.nodeSize / 2 - 10;
            } else {
              var length = this.calWidth(children[i-1]) + this.calWidth(children[i])
              children[i].x = children[i - 1].x + (this.nodeSize + 20) * length / 2;
            }
            children[i].y = lineTopXy.y;
          }
        }
			}
			return children;
		},

    calWidth(node){
      var childrenAry = node.children;
      if (childrenAry === undefined || childrenAry && childrenAry.length === 0) {
        return 1;
      } else {
        var width = 0;
        var len = childrenAry.length;
        for (var i = 0; i < len; i++) {
          if (childrenAry[i].children === undefined || childrenAry[i].children.length <= 0) {
            continue;
          }
          width += this.calWidth(childrenAry[i]) - 1;
        }
        width += len;
        return width;
      }
    },

		removeNodeTemplate () {
			var topo = this.topo;
			var children = this.node.children;
			var that = this;
			var links = this.node.links;
			links.forEach(item => {
				topo.removeLinkById(item.relId);
			})
			topo.update();
			children.forEach(item => {
				var ana = new this.animation();
				ana.init({config: {
					x: item.x,
					y: item.y,
					id: item.id
				}, onChange: function (d) {
					var targetX = d.target.target.x;
					var targetY = d.target.target.y;
					topo.nodesCollect.select(`g#${item.id}`).attr('transform',function () {
						return `translate(${targetX},${targetY})`;
					})
					topo.updateNodeById(item.id, {
						fx: targetX,
						fy: targetY,
					}, true);
				}, onComplete: function () {
				   var id = this.id;
				   topo.removeNodeById(id);
				} ,interTime: 1000 * 1, target: {
					x: that.node.fx,
					y: that.node.fy,
				}});
				ana.Tween();
			})
			
		},
		addNodeToTopoTemplate () {
			return new Promise((resolve, reject) => {
				var topo = this.topo;
				var children = this.node.children;
				children = children.map(item => {
					item.target = {
						x: item.x,
						y: item.y
					}
					item.x = this.node.x;
					item.y = this.node.y;
					return item;
				})
				
				var that = this;
				topo.addNodes(children);
				console.log(children)
				var links = children.map(child => {
					return {
						source: that.node.id,
						target: child.id,
						relation: child.relName,
						relId: child.relId,
						other: child
					}
				})
				links = links.filter(item => {
					if (topo.getLinkById(item.source, item.target).length > 0) {
						return false;
					}
					return true;
				})
        var existNode = this.node.existNode
        var otherLinks = existNode.map(child => {
          return {
            source: that.node.id,
            target: child.id,
            relation: child.relName,
            relId: child.relId,
            other: child
          }
        })
        otherLinks = otherLinks.filter(item => {
          if (topo.getLinkById(item.source, item.target).length > 0) {
          return false;
          }
          return true;
        })

          var NodeIndex = 0;
          this.node.links = links.concat(otherLinks);
			    topo.addLinks(links);
			    topo.update();
			    
				children.forEach(item => {
					var ana = new this.animation();
					ana.init({config: {
						x: item.x,
						y: item.y
					}, onChange: function (d) {
						var targetX = d.target.target.x;
						var targetY = d.target.target.y;
						topo.nodesCollect.select(`g#${item.id}`).attr('transform',function () {
							return `translate(${targetX},${targetY})`;
						})
						topo.updateNodeById(item.id, {
							fx: targetX,
							fy: targetY,
						}, true);
					}, onComplete: function () {
						NodeIndex++;
						if (NodeIndex === children.length) {
							// clearTimeout(timer);
							resolve(children);
						}
					} ,interTime: 1000 * 1, target: item.target});
					ana.Tween();
				})
				// var timer = setTimeout(function () {
				// 	reject('error');
				// }, (children.length + 1) * 1000);
			})
			
		},
		addNodeToTopoTemplate1 () {
			return new Promise((resolve, reject) => {
				var topo = this.topo;
				var children = this.node.parent;
				children = children.map(item => {
					item.target = {
						x: item.x,
						y: item.y
					}
					item.x = this.node.x;
					item.y = this.node.y;
					return item;
				})
				
				var that = this;
				topo.addNodes(children);
				var links = children.map(child => {
					return {
						source: child.id,
						target: that.node.id,
						relation: child.relName,
						relId: child.relId,
						other: child
					}
				})
				links = links.filter(item => {
					if (topo.getLinkById(item.source, item.target).length > 0) {
						return false;
					}
					return true;
				})
				var NodeIndex = 1;
				this.node.links = links;
			    topo.addLinks(links);
			    topo.update();
			    
				children.forEach(item => {
					var ana = new this.animation();
					ana.init({config: {
						x: item.x,
						y: item.y
					}, onChange: function (d) {
						var targetX = d.target.target.x;
						var targetY = d.target.target.y;
						topo.nodesCollect.select(`g#${item.id}`).attr('transform',function () {
							return `translate(${targetX},${targetY})`;
						})
						topo.updateNodeById(item.id, {
							fx: targetX,
							fy: targetY,
						}, true);
					}, onComplete: function () {
						NodeIndex++;
						if (NodeIndex === children.length) {
							clearTimeout(timer);
							resolve(children);
						}
					} ,interTime: 1000 * 1, target: item.target});
					ana.Tween();
				})
				var timer = setTimeout(function () {
					reject('error');
				}, (children.length + 1) * 1000);
			})
			
		},
		ajaxWithAfa (data) {
			return new Promise( (resolve, reject) => {
				app.common.ajaxWithAfa({
					url:'CMDBCommonAction_commonService.do',
					data:data
				}).then(function(data){
					resolve(data.ret);
					app.shelter.hide();
				})
			})
		},
		addNodeEventToTopoTemplate () {
			return new Promise((resolve, reject) => {
				var topo = this.topo;
				var children = this.node.children;
				children = children.map(item => {
					item.target = {
						x: item.x,
						y: item.y
					}
					item.x = this.node.x;
					item.y = this.node.y;
					return item;
				})
				
				var that = this;
				topo.addNodes(children);
				var links = children.map(child => {
					return {
						source: that.node.id,
						target: child.id,
						relation: '归属',
						id: 'link' + child.appid + that.node.id + child.id
					}
				})
				links = links.filter(item => {
					if (topo.getLinkById(item.source, item.target).length > 0) {
						return false;
					}
					return true;
				})
				var NodeIndex = 1;
				this.node.links = links;
			    topo.addLinks(links);
			    console.log(topo.links)
			    topo.update();
			    
				children.forEach(item => {
					var ana = new this.animation();
					ana.init({config: {
						x: item.x,
						y: item.y
					}, onChange: function (d) {
						var targetX = d.target.target.x;
						var targetY = d.target.target.y;
						topo.nodesCollect.select(`g#${item.id}`).attr('transform',function () {
							return `translate(${targetX},${targetY})`;
						})
						topo.updateNodeById(item.id, {
							fx: targetX,
							fy: targetY,
						}, true);
					}, onComplete: function () {
						NodeIndex++;
						if (NodeIndex === children.length) {
							clearTimeout(timer);
							resolve(children);
						}
					} ,interTime: 1000 * 1, target: item.target});
					ana.Tween();
				})
				var timer = setTimeout(function () {
					reject('error');
				}, (children.length + 1) * 1000);
			})
		},
		removeEventNodeTemplate () {
			var topo = this.topo;
			var children = this.node.children;
			var that = this;
			var links = this.node.links;
			links.forEach(item => {
				topo.removeLinkById(item.id);
			})
			topo.update();
			children.forEach(item => {
				var ana = new this.animation();
				ana.init({config: {
					x: item.x,
					y: item.y,
					id: item.id
				}, onChange: function (d) {
					var targetX = d.target.target.x;
					var targetY = d.target.target.y;
					topo.nodesCollect.select(`g#${item.id}`).attr('transform',function () {
						return `translate(${targetX},${targetY})`;
					})
					topo.updateNodeById(item.id, {
						fx: targetX,
						fy: targetY,
					}, true);
				}, onComplete: function () {
				   var id = this.id;
				   topo.removeNodeById(id);
				   topo.update();
				} ,interTime: 1000 * 1, target: {
					x: that.node.fx,
					y: that.node.fy,
				}});
				ana.Tween();
			})
			
		},
	}
	
	return SearchNode;
	
	
})