/**
 * 点击节点事件
 */
define(['script/spa/topo/components/SearchNode','script/spa/topo/common/animation'], function (SearchNode, animation) {
	var clickNode = function (opts = {}) {
		this.status = false;
		this.levelIndex = -1;
		this.childrenLength = 1;
		this.opts = opts;
	}
	clickNode.prototype = {
		setClickNode (node){
			this.levelIndex = 1;
			this.opts.node = node;
		},
		setSearchNode (param, again) {
			let that = this;
			return new Promise(async function (resolve, reject) {
				if (!!that.status) {
					app.alert('正在执行上次操作，请稍后！');
					return;
				}
				that.search = new SearchNode({
					round: {
						x1: 0,
						y1: 0,
						x2: that.opts.topo.w,
						y2: that.opts.topo.h
					},
					linkDistance: that.opts.topo.linkDistance,
					node: that.opts.node,
					topo: that.opts.topo,
					animation: animation,
				})
				if (that.opts.node.expend) {
					
				} else {
					that.opts.topo.updateNodeById(that.opts.node.id, {expend: true});
					var children = [];
					if (!again) {
						var servicename = 'cn.com.agree.aim.cmdb.service.datamanage._cmdb_relation_data_manager';
						var method = 'dm_dt_top';
						var requestData = JSON.stringify({
							dmDtId: that.opts.topo.getNodeIdByNumber(that.opts.node.id),
							deep: parseInt(param.level),
							direction: param.type
						});
						var ret = await that.ajaxWithAfa({servicename,method,requestData});
						children = ret;
					} else {
						children = that.opts.node.children || [];
					}
					children = children.map(item => {
						item.id = that.opts.topo.reNameId(item.dmDtId, item.appid);
						item.name = item.name;
						item.fx = that.opts.node.fx;
						item.fy = that.opts.node.fy;
						item.x = that.opts.node.x;
						item.y = that.opts.node.y;
						item.pid = that.opts.node.id;
						return item;
					})
		          var existNode = children.filter(item => {
		            if (that.opts.topo.getNodeById(item.id).length === 0) {
		              return false;
		            }
		            return true;
		          })
//		          children = children.filter(item => {
//		            if (that.opts.topo.getNodeById(item.id).length !== 0) {
//		              return false;
//		            }
//		            return true;
//		          })
		          that.search.node.children = children;
		          that.search.node.existNode = existNode;
				  that.search.setDirectCalPos();
		          that.search.addNodeToTopoTemplate().then(children => {
		            if (children.length === 0) {
		            that.levelIndex++;
		          } else {
		            var p = [];
		            children.forEach(item => {
		              that.opts.node = that.opts.topo.getNodeById(item.id)[0];
		              p.push(that.setSearchNode(param, true))
		            })
		            that.queue(p).then(data=>{
		              that.levelIndex++;
		            })
		          }
		         });
				}
			})
		},
    // 构建队列
    queue(arr) {
      var res = []
      var sequence = Promise.resolve();
      arr.forEach(function (item) {
        sequence = sequence.then(item).then(data=>{
          res.push(data);
          return res
        })
      })
      return sequence
    },
		setSearchNode1 (param, again) {
			let that = this;
			return new Promise(async function (resolve, reject) {
				if (!!that.status) {
					app.alert('正在执行上次操作，请稍后！');
					return;
				}
				that.search = new SearchNode({
					round: {
						x1: 0,
						y1: 0,
						x2: that.opts.topo.w,
						y2: that.opts.topo.h
					},
					linkDistance: that.opts.topo.linkDistance,
					node: that.opts.node,
					topo: that.opts.topo,
					animation: animation,
				})
				if (that.opts.node.expend) {
					
				} else {
					that.opts.topo.updateNodeById(that.opts.node.id, {expend: true});
					var children = [];
					if (!again) {
						var servicename = 'cn.com.agree.aim.cmdb.service.datamanage._cmdb_relation_data_manager';
						var method = 'dm_dt_top';
						var requestData = JSON.stringify({
							dmDtId: that.opts.topo.getNodeIdByNumber(that.opts.node.id),
							deep: parseInt(param.level),
							direction: param.type
						});
						var ret = await that.ajaxWithAfa({servicename,method,requestData});
						children = ret;
					} else {
						children = that.opts.node.parent || [];
					}
					console.log('parent')
					children = children.map(item => {
						item.id = that.opts.topo.reNameId(item.dmDtId);
						item.name = item.name;
						item.fx = that.opts.node.fx;
						item.fy = that.opts.node.fy;
						item.x = that.opts.node.x;
						item.y = that.opts.node.y;
						item.pid = that.opts.node.id;
						return item;
					})
					children = children.filter(item => {
						if (that.opts.topo.getNodeById(item.id).length !== 0) {
							return false;
						}
						return true;
					})
					that.search.node.parent = children;
					that.search.setDirectCalPos1();
					that.search.addNodeToTopoTemplate1().then(children => {
						if (that.levelIndex >= parseInt(param.level)) {
							
						} else {
							if (children.length === 0) {
								that.levelIndex++;
							}
							var p = [];
							children.forEach(item => {
								that.opts.node = that.opts.topo.getNodeById(item.id)[0];
								p.push(that.setSearchNode(param, true))
							})
							Promise.all(p).then(function () {
								that.levelIndex++;
							})
						}
					});
				}
			})
		},
		triggerClickNode (id, container) {
			var event = document.createEvent('SVGEvents');
			event.initEvent('click',true,true);
			container.querySelector('g#'+id).dispatchEvent(event);
		},
		setSearchNodeEvent(param){
			let that = this;
			return new Promise(function (resolve, reject) {
				that.search = new SearchNode({
					round: {
						x1: 0,
						y1: 0,
						x2: that.opts.topo.w,
						y2: that.opts.topo.h
					},
					linkDistance: that.opts.topo.linkDistance,
					node: that.opts.node,
					topo: that.opts.topo,
					animation: animation,
				})
				console.log(that.opts.node)
				if (!that.opts.node.expand) {
					that.search.removeEventNodeTemplate()
				} else {
					children = that.opts.node.children || [];
					children = children.map(item => {
						item.id = that.opts.topo.reNameId(item.dmDtId, item.appid);
						item.name = item.name;
						item.fx = that.opts.node.fx;
						item.fy = that.opts.node.fy;
						item.x = that.opts.node.x;
						item.y = that.opts.node.y;
						item.pid = that.opts.node.id;
						return item;
					})
					children = children.filter(item => {
						if (that.opts.topo.getNodeById(item.id).length !== 0) {
							return false;
						}
						return true;
					})
					that.search.node.children = children;
					that.search.setDirectCalPos();
					that.search.addNodeEventToTopoTemplate().then(children => {
						if (that.levelIndex >= parseInt(param.level)) {
							
						} else {
							if (children.length === 0) {
								that.levelIndex++;
							}
							var p = [];
							children.forEach(item => {
								that.opts.node = that.opts.topo.getNodeById(item.id)[0];
								p.push(that.setSearchNode(param, true))
							})
							Promise.all(p).then(function () {
								that.levelIndex++;
							})
						}
					});
				}
			});
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
		}
	}
	return clickNode;
})