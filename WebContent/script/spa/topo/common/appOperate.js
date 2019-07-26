/**
 * 应用矩形框选择器
 */
define(['d3V5','script/spa/topo/common/supOperate'], function (d3, SupOperate) {
	
	function ajaxWithAfa(data){
		return new Promise((resolve,reject)=>{
			app.common.ajaxWithAfa({
				url: 'CMDBCommonAction_commonService.do',
				data: data
			}).done(function(content) {
				resolve(content.ret);
			})
		});
	}
	
	let appOperate = function (opts = {}) {
		this.parent = opts.parent;
		this.minWidth = 300;
		this.current = {x: 0};
		this.nodeDis = 10;
		this.nodeSize = 40;
		this.startX = 80;
		this.tempRect = null;
		this.children = [];
		this.dragItem = null;
		this.marginLeft = 40;
		this.init();
	}
	
	let fn = appOperate.prototype;
	
	fn.init = function () {
		 this.container = this.parent.appRectGRrid;
		 this.supOperate = new SupOperate();
		 this.marginLeft = this.parent.marginLeft;
	}
	
	fn.addNodes = function (nodes) {
		this.parent.addNodes(nodes);
	}
	
	fn.addLinks = function (links) {
		this.parent.addLinks(links);
		this.parent.update();
	}
	
	fn.removeLinkByType = function (type) {
		this.parent.removeLinkByType(type);
		this.parent.update();
	}
	
	fn.removeNodeByAppId = function (appid) {
		this.parent.removeNodeByAppId(appid);
	}
	
	fn.removeLinkByAppId = function (appid) {
		this.parent.removeLinkByAppId(appid);
	}
	
	/* 获取线条 */
	fn.getLineLevel = function () {
		return this.parent.levelGridOperate.getLevel()
	}
	
	/* 将节点坐标对齐 */
	fn.setValue = function (value) {
		return this.parent.invented.setValue(value);
	}
	
	/* 更新节点 */
	fn.updateNodes = function (nodes) {
		this.parent.updateNodes(nodes);
	}
	
	fn.addRect = async function (appid, appName) {
		/* 判断是否拥有该appid */
		if (this.isSameAppid(appid)) {
			return;
		}
		/* 动画效果先搁置 直接变换尺寸 */
		/* 第一步 计算当前是否还有空间摆放矩形块 */
		let result = this.isHasSpace();
		/* 第二步 位置摆放 默认最后摆放，可拖动调整次序 并且充满当前容器 */
		let width = result ? this.minWidth : this.calculate();
		/* 第三步 放置矩形块 */
		this.setRect(width, appName, null, appid);
		/* 第四步 渲染节点 */
		var servicename = "cn.com.agree.aim.cmdb.service.datamanage._cmdb_app_manager";
		var method = "getApp7LevelTopo";
		var requestData = JSON.stringify({app_id: appid});
		var ret = await ajaxWithAfa({servicename, method, requestData});
		this.render(ret, appid);
		this.updateChildrenNode(appid);
//		this.findLevelByApp();		/* 查询层级关系 */
	}
	
	fn.isSameAppid = function (appid) {
		return this.children.some(function (item) {
			return  item.appid == appid;
		})
	}
	
	fn.setRect = function (width, appName, posX, appid, nodes = [], ids) {
		let that = this;
		let x = posX !== null ? posX:this.getMaxX().x;
		let maxWidth = this.getMaxX().width;
		let id = ids || ('rect' + new Date().getTime());
		!(posX !== null) && (x += maxWidth);
		let itemG = this.container.append('g').attr('class', 'itemG').attr('id', id).attr('appid', appid);
		itemG.attr('transform', `translate(${x},0)`);
		this.children.push({ id, x: parseInt(x), width: parseInt(width), appid, nodes: nodes});
		itemG.append('rect').attr('class', 'app-rect').attr('id', id).attr('width', width ).attr('height', this.h);
		itemG.append('rect').attr('class', 'app-text-rect').attr('width', parseInt(width) - 2).attr('height', 30).attr('x', 2);
		itemG.append('image').attr('href', 'img/cmdb_icon/see.png').attr('width', 12).attr('height', 12)
				.attr('x', 12).attr('y', 8).attr('cursor','pointer').on('click', function () {
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					var href = d3.select(this).attr('href');
					if (href.indexOf('nosee') !== -1) {
						d3.select(this).attr('href','img/cmdb_icon/see.png');
						that.seeWatch(appid, true);
					} else {
						d3.select(this).attr('href','img/cmdb_icon/nosee.png');
						that.seeWatch(appid, false);
					}
				});
		itemG.append('circle').attr('class', 'app-text-close').attr('cx', width - 20).attr('cy', 13).attr('r', 6).attr('fill', '#C5C6CB');
		itemG.append('text').attr('class', 'app-text-close').attr('x', width - 22).text('x')
				.attr('title', '关闭').attr('y', 16).attr('cursor', 'pointer').attr('width', 30).on('click', function () {
					d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
					that.deleteRect(appid);
				})
		itemG.append('text').attr('class', 'app-text').attr('id', id).text(appName).attr('y', 20).attr('text-anchor', 'middle').attr('x', this.calculTextWidth(0, width, appName));
		this.setRectEvent(itemG);
	}
	
	fn.seeWatch = function  (appid, seeTag) {
		 this.parent.relationTextShowOrHide(appid, seeTag);
	}
	
	fn.findLevelByApp = async function () {
		/* 删除掉之前的关系 */
		var type = 'app-link';
		this.removeLinkByType(type);
		var appids = this.children.map(item => {
			return item.appid
		})
		if (appids && appids.length == 1) {
			return;
		}
		var servicename = "cn.com.agree.aim.cmdb.service.datamanage._cmdb_app_manager";
		var method = "getServiceRelaByApp";
		var requestData = JSON.stringify({app_ids: appids.join(',')});
		var ret = await ajaxWithAfa({servicename, method, requestData});
		var links = ret.links;
		links = links.map(item => {
			item.source = 'node' + item.source_id  + '_' + item.source_app_id;
			item.target = 'node' + item.target_id  + '_' + item.target_app_id;
			item.id = 'link' + item.source + item.target + item.target_app_id + item.source_app_id;
			item.relation = item.link_name || '无关系';
			item.type = type;
			return item;
		})
		this.addLinks(links);
	}
	
	fn.deleteRect = function (appid) {
		var item = this.children.filter(item => {
			return item.appid == appid
		})
		if (item && item.length) {
			item = item[0];
			let id = item.id;
			this.removeItemById(id);
			this.removeNodeByAppId(appid);
			this.removeLinkByAppId(appid);
			this.container.select('g#'+id).remove();
			this.getCalculate()
			this.updateChildrenNode(-1);
		}
	}
	
	fn.updateChildrenNode = function (appid) {
		for(var i = 0 ; i < this.children.length ; i ++ ) {
			let item = this.children[i];
			if (item.appid != appid && item.nodes) {
				let nodes = item.nodes;
				let newNodes = [];
				for(let i = 1 ; i < 8 ; i ++ ){
					var levelNodes = this.findNodesByLevel(nodes, i);
					var calPosNode = this.calculatePos(levelNodes, item.appid, i);
					newNodes.push(...calPosNode);
				}
				item.nodes = newNodes;
				this.updateNodes(newNodes);
			}
		}
	}
	
	fn.createTmp = function (appName, x, width, id, appid) {
		let itemG = this.container.append('g').attr('class', 'itemG').attr('id', id).attr('appid', appid);
		itemG.attr('transform', `translate(${x},0)`);
		itemG.append('rect').attr('class', 'app-rect').attr('id', id).attr('width', width).attr('height', this.h)
		itemG.append('rect').attr('class', 'app-text-rect').attr('width', width);
		itemG.append('text').attr('class', 'app-text').attr('id', id).text(appName).attr('y', 20).attr('text-anchor', 'middle').attr('x', this.calculTextWidth(0, width, appName));
		return itemG;
	}
	
	fn.createSupTmp = function (x, width) {
		let itemG = this.container.append('g').attr('class', 'itemG');
		itemG.attr('transform', `translate(${x},0)`);
		itemG.append('rect').attr('class', 'app-rect-sup').attr('width', width).attr('height', this.h)
		return itemG;
	}
	
	/* 设置svg拖拽事件 */
	fn.setRectEvent = function (itemG) {
		itemG.select('rect.app-text-rect')
		.call(d3.drag().clickDistance(20).on('start', this.dragStart.bind(this, itemG)).on('drag', this.drag.bind(this, itemG))
		.on('end', this.end.bind(this, itemG)));
	}
	
	fn.getTransform = function (d) {
		try {
			return d.attr('transform').split('(')[1].split(',')[0]
		} catch (e) {
			return null;
		}
	}
	
	/* 拖拽开始，1、移除掉原来的元素，2、将占位元素根据位置进行填充 */
	fn.dragStart = function (d) {
		this.current = d3.event;
		var posX = this.getTransform(d);
		let itemRect = d.select('rect.app-rect');
		let itemText = d.select('text.app-text');
		let id = d.attr('id');
		let appid = d.attr('appid');
		let text = itemText.text();
		let width = itemRect.attr('width');
		let tmpSupRect = this.createSupTmp(posX, width);
		this.tempRect = this.createTmp(text, posX, width, d.attr('id'), appid);
		this.supOperate.setContainer(tmpSupRect, width);
		this.supOperate.updateContainer(posX);
		this.dragItem = this.removeItemById(id);
		d.remove();
	}
	
	fn.drag = function (d) {
		var fx = d3.event.sourceEvent.x;
		var offsetX = fx - this.current.sourceEvent.x;
		var posX = this.getTransform(this.tempRect);
		if (posX) {
			offsetX = parseInt(posX) + parseInt(offsetX);
			this.tempRect.attr('transform', `translate(${offsetX},0)`);
			this.opreateOtherChild(offsetX)
		}
		this.current = d3.event;
	}
	
	fn.opreateOtherChild = function (offsetX) {
		for(let i = this.children.length - 1 ; i >= 0; i --) {
			let item = this.children[i];
			let w = parseInt(this.supOperate.w);
			if (i === 0 && item.x > offsetX) {									/* 首部添加 */
				this.supOperate.updateContainer(0);
				this.moveChildren(this.marginLeft, w);
			} else if (i === this.children.length - 1 && item.x < offsetX) {	/* 挪动到尾部  */
				this.supOperate.updateContainer(parseInt(item.width) + parseInt(item.x));
				this.moveChildren(this.children.length, w);
			} else if (item.x < offsetX){										/* 判断如果当前拖动位置大于从大往小第一个起点坐标  */
				this.supOperate.updateContainer(parseInt(item.width) + parseInt(item.x));
				this.moveChildren(i+1, w);
				break;
			}
		}
	}
	
	fn.moveChildren = function (ind, w) {
		for(let i = 0 ; i < this.children.length; i ++) {
			if (ind === 0 && i === 0) {
				this.children[i].x = w;
			} else if (ind !== 0 && i === 0) {
				this.children[i].x = this.marginLeft;
			} else if (i === ind) {
				this.children[i].x = this.children[i - 1].x + this.children[i-1].width;
				this.children[i].x = this.children[i].x + w;
			} else if (i < ind || i > ind) {
				this.children[i].x = parseInt(this.children[i-1].x) + parseInt(this.children[i-1].width);
			}
		}
		this.children.forEach(item => {
			this.container.select('g#'+item.id).attr('transform', `translate(${item.x},0)`);
		})
	}
	
	fn.end = function (d) {
		let itemG = this.tempRect;
		let id = itemG.attr('id');
		let appid = itemG.attr('appid');
		let itemRect = itemG.select('rect#'+id);
		let width = itemRect.attr('width');
		let itemText = itemG.select('text#'+id);
		let appName = itemText.text();
		let posX = this.supOperate.offsetX;
		this.setRect(width, appName, posX, appid, this.dragItem[0].nodes, this.dragItem[0].id);
		itemG.remove();
		this.updateChildren();
		this.supOperate.destory();
		this.updateChildrenNode(-1);
	}
	
	fn.calculTextWidth = function (x1, x2, text) {
		return (x2 - x1) / 2;
	}
	
	fn.findIndexById = function (id) {
		return this.children.findIndex(function () {
			return item.id === id;
		})
	}
	
	fn.removeItemById = function (id) {
		return this.children.splice(this.children.findIndex(item => item.id === id), 1);
	}
	
	/* 最大X */
	fn.getMaxX = function () {
		if (this.children.length) {
			return this.children[this.children.length - 1];
		}
		return {x: this.marginLeft, width: 0};
	}
	
	/* 计算矩形宽度 */
	fn.calculate = function () {
		this.children.sort(function (a, b) {
			return a.x - b.x;
		});
		if (this.children.length) {
			let width = parseInt((this.w - this.marginLeft) / (this.children.length + 1));
			this.updateRect(width)
			return width;
		}
		return parseInt(this.w - this.marginLeft);
	}
	
	/* 得到矩形宽度 */
	fn.getCalculate = function () {
		this.children.sort(function (a, b) {
			return a.x - b.x;
		});
		if (this.children.length) {
			let width = parseInt((this.w - this.marginLeft) / (this.children.length));
			this.updateRect(width)
		}
	}
	
	/* 更新其他矩形 */
	fn.updateRect = function (width) {
		for(let i = 0 ; i < this.children.length ; i ++) {
			let itemG = this.container.select('g#'+this.children[i].id);
			let itemRect = itemG.select('rect#'+this.children[i].id);
			let itemText = itemG.select('text#'+this.children[i].id);
			let itemRectText = itemG.select('rect.app-text-rect');
			let itemCircle = itemG.select('circle.app-text-close');
			let itemCloseText = itemG.select('text.app-text-close');
			let itemImage = itemG.select('image');
			let text = itemText.attr('text');
			itemRect.attr('width', width);
			itemRectText.attr('width', width);
			itemText.attr('x', this.calculTextWidth(0, width, text))
			itemCloseText.attr('x', width - 22);
			itemCircle.attr('cx', width - 20);
			this.children[i].width = width;
			if (i > 0) {
				this.children[i].x = parseInt(this.children[i - 1].width) + parseInt(this.children[i - 1].x);
			} else {
				this.children[i].x = this.marginLeft
			}
			itemG.attr('transform', `translate(${this.children[i].x},0)`);
		}
		
	}
	
	fn.updateChildren = function (id, param) {
		this.children = this.children.map(item => {
			if (item.id === id) {
				Object.keys(param).forEach(key => {
					item[key] && (item[key] = param[key]);
				})
			}
			return item;
		})
		this.children.sort(function (a, b) {
			return parseInt(a.x) - parseInt(b.x);
		})
	}
	
	fn.isHasSpace = function () {
		this.w = this.parent.w;
		this.h = this.parent.h;
		this.allLen = (this.children.length + 1) * this.minWidth;
		if (this.allLen > this.w) {
			/* 当前空间没有位置摆放，需要扩展父容器 */
			this.expandParent();
			return true
		}
		return false;
	}
	
	fn.expandParent = function () {
		this.parent.w += this.minWidth;
		this.parent.svg.attr('width', this.parent.w);
		this.updateLine();
	}
	
	fn.updateLine = function () {
		this.parent.updateLine();
	}
	
	fn.render = function (ret, appid) {
		let nodes = ret.nodes;
		let links = ret.links;
		let module = ret.module;
		let childItem = this.children.filter(item => {
			return item.appid === appid;
		})
		if (childItem && childItem.length) {
			childItem = childItem[0];
			childItem['nodes'] = [];
		} else {
			return;
		}
		nodes = nodes.map(item => {
			item.nodeId = item.id;
			item.id = 'node' + item.id + '_' + appid;
			item.appid = appid;
			item.img = module[item.cate]
			return item;
		})
		for(let i = 1 ; i < 8 ; i ++ ){
			var levelNodes = this.findNodesByLevel(nodes, i);
			var calPosNode = this.calculatePos(levelNodes, appid, i);
			childItem['nodes'].push(...calPosNode);
			this.addNodes(calPosNode);
		}
		links = links.map(item => {
			item.source = 'node' + item.source_id + '_' + appid;
			item.target = 'node' + item.target_id + '_' + appid;
			item.id = 'link' + appid + item.source + item.target;
			item.relation = item.link_name || '无关系';
			item.appid = appid;
			return item;
		})
		this.addLinks(links);
	}
	
	fn.findNodesByLevel = function (nodes, level) {
		return nodes.filter(item => {
			return parseInt(item.level) === parseInt(level);
		})
	}
	
	fn.calculatePos = function (nodes, appid, le) {
		let children = this.children;
		let levels = this.getLineLevel();
		let child = children.filter(item => {
			return item.appid === appid;
		})
		let level = levels.filter(item => {
			return item.level == le;
		})
		if (child.length && level.length) {
			child = child[0];
			level = level[0];
			let x1 = parseInt(child.x);
			let x2 = parseInt(child.x) + parseInt(child.width)
			let y1 = parseInt(level.y);
			let y2 = parseInt(level.y) + parseInt(level.height);
			let centerX = (x1 + x2) / 2;
			let centerY = (y1 + y2) / 2;
			this.startX = parseInt((x2 - x1) / 15) < 80 ? 80 : parseInt((x2 - x1) / 15);
			if (le == '1') {
				nodes = this.yTypePst(nodes, centerX, centerY)
			} else {
				nodes = this.xTypePos(nodes, centerX, centerY);
			}
			nodes = nodes.map(item => {
				item['fy'] = this.setValue(item['fy']);
				item['fx'] = this.setValue(item['fx']);
				return item;
			})
			return nodes;
		}
		return [];
	}
	
	/* 两排摆放 */
	fn.yTypePst = function (nodes, centerX, centerY) {
		let startX = this.startX;
		let tmp = nodes;
		if (tmp.length === 1) {
			tmp[0].fx = centerX;
			tmp[0].fy = centerY;
		} else if (tmp.length % 2 === 0) {
			let node1 = tmp.slice(0,tmp.length / 2);
			let node2 = tmp.slice(tmp.length / 2, tmp.length);
			tmp = [];
			node1 = this.xTypePos(node1, centerX, centerY - 30)
			node2 = this.xTypePos(node2, centerX, centerY + 30)
			tmp.push(...node1);
			tmp.push(...node2);
		} else {
			let node1 = tmp.slice(0,(tmp.length - 1) / 2);
			let node2 = tmp.slice((tmp.length - 1) / 2 + 1, tmp.length);
			let node3 = tmp[(tmp.length - 1) / 2];
			node1 = this.xTypePos(node1, centerX, centerY - 30)
			node2 = this.xTypePos(node2, centerX, centerY + 30)
			node3.fx = centerX;
			node3.fy = centerY;
			tmp = []
			tmp.push(...node1);
			tmp.push(...node2);
			tmp.push(node3);
		}
		return tmp;
	}
	
	/* 横向均分摆放 */
	fn.xTypePos =  function (nodes, centerX, centerY) {
		let startX = this.startX;
		let tmp = nodes;
		tmp = tmp.map(item => {
			item['fy'] = centerY;
			return item;
		})
		if (tmp.length === 1) {
			tmp[0].fx = centerX;
		} else if (tmp.length % 2 === 0) {
			for(var i = 0 ; i < tmp.length / 2 ; i ++) {
				tmp[i].fx = centerX - startX * (i + 1)
			}
			for(var i = tmp.length / 2 ; i < tmp.length ; i ++) {
				tmp[i].fx = centerX + startX * (i - tmp.length / 2 + 1)
			}
		} else {
			for(var i = 0 ; i < (tmp.length - 1) / 2 ; i ++) {
				tmp[i].fx = centerX - startX * (i + 1)
			}
			tmp[(tmp.length - 1) / 2].fx = centerX;
			for(var i = parseInt(tmp.length / 2) + 1; i < tmp.length ; i ++ ) {
				tmp[i].fx = centerX + startX * (i - Math.ceil(tmp.length / 2) + 1)
			}
		}
		return tmp;
	}
	
	return appOperate;
})