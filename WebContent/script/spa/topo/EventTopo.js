/**
 * 应用事件拓扑
 */
define(['d3V5','clickNode','AuxLine', 'Invented' ,'script/spa/topo/common/colorMap', 'script/spa/topo/common/appOperate', 'script/spa/topo/common/levelGrid'], 
		function (d3, ClickNode, AuxLine, Invented, colorMap, AppOperate, LevelGrid){
	let defaultBottom = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAABpCAYAAABf9DMoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0I2NkEyMzU1RjcyMTFFOTkwRTk5QjhBQUFBNURDRjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0I2NkEyMzY1RjcyMTFFOTkwRTk5QjhBQUFBNURDRjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQjY2QTIzMzVGNzIxMUU5OTBFOTlCOEFBQUE1RENGNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQjY2QTIzNDVGNzIxMUU5OTBFOTlCOEFBQUE1RENGNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpAQ4aMAAAniSURBVHja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';
	let defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0I1N0ZCQTA1Rjc5MTFFOTkwRTk5QjhBQUFBNURDRjQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0I1N0ZCQTE1Rjc5MTFFOTkwRTk5QjhBQUFBNURDRjQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQjU3RkI5RTVGNzkxMUU5OTBFOTlCOEFBQUE1RENGNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQjU3RkI5RjVGNzkxMUU5OTBFOTlCOEFBQUE1RENGNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpWMVoEAAB1pSURBVHja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';
	let defaultEventBottom = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAABpCAYAAABf9DMoAAAACXBIWXMAAAsTAAALEwEAmpwYAAAG1mlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA0LTI1VDE5OjM3OjM5KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNC0yNlQxMDowNTozNiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNC0yNlQxMDowNTozNiswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjMWVjMWU1ZC01MTc5LTQzZWYtYmVhNC01NjI5OWNlMzY1NTEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1MjI5NmRlNi0zOGFmLTYwNGMtYWViMS1jMTEwY2I1ZjYxMWUiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDQjY2QTIzNjVGNzIxMUU5OTBFOTlCOEFBQUE1RENGNCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNCNjZBMjMzNUY3MjExRTk5MEU5OUI4QUFBQTVEQ0Y0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNCNjZBMjM0NUY3MjExRTk5MEU5OUI4QUFBQTVEQ0Y0Ii8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmNiMmIyM2RhLTA2ZmUtNDg1Mi05OWUzLWJmYjVhZjlmMjgxNSIgc3RFdnQ6d2hlbj0iMjAxOS0wNC0yNlQxMDowNTozNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMxZWMxZTVkLTUxNzktNDNlZi1iZWE0LTU2Mjk5Y2UzNjU1MSIgc3RFdnQ6d2hlbj0iMjAxOS0wNC0yNlQxMDowNTozNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNr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';
	
	
	let EventTopo = function (ele, opts = {}) {
		typeof(ele) == 'string' && (ele = document.getElementById(ele));
		this.opts = opts;
		this.ele = ele;
		this.key = 'event';
		this.w = ele.scrollWidth;
		this.h = ele.scrollHeight;
		this.linkDistance = 100;
		this.makerName = 'maker'+new Date().getTime();
		this.svg = d3.select(ele).append('svg').attr("width", this.w).attr('height', this.h);
		this.nodes = [];
		this.links = [];
		this.scale = 1;
		this.init();
		this.marginLeft = 40;
		this.appOperate = new AppOperate({parent: this});
		this.levelGridOperate = new LevelGrid({parent: this});
		this.invented = new Invented({parent: this});
		this.auxLine = new AuxLine(this.auxlineNode, {parent: this});
		this.clickNode = new ClickNode({topo: this})
	}
	
	let fn = EventTopo.prototype;
	
	/**
	 * 初始化操作
	 */
	fn.init = function () {
		/* 初始化背景栅格配置 */
//		this.networdGrid = this.svg.append('g').attr('class','networdGrid');
		this.levelGrid = this.svg.append('g').attr('class','levelGrid');
		/* 应用矩形容器 */
		this.appRectGRrid = this.svg.append('g').attr('class','appRectGRrid');
		/* 应用分层容器 */
		this.inventNode = this.svg.append('g').attr('class','inventNode');
		/* 对齐线 */
		this.auxlineNode = this.svg.append('g').attr('class','auxlineNode');
		
		this.setTopoContent();	/* 初始化容器 */
		this.setSimulation();	/* 初始化d3力学对象 */
//		this.setNetwordGrid();	/* 初始化网格 */
		this.setMarker()		/* 初始化箭头 */
	}
	
	fn.getKeyClass = function (className) {
		return this.key + '-' + className;
	}
	
	fn.updateLine = function () {
		this.levelGridOperate.updateLine();
	}
	
	fn.deleteRect = function (appids) {
		appids.forEach(item => {
			this.appOperate.deleteRect(item + '');
		})
	}
	
	/**
	 * 获取到当前选择app列表
	 */
	fn.getSelectApp = function () {
		return this.appOperate.children.map(item => {
			return item.appid
		});
	}
	
	/**
	 * 初始化容器
	 * 外部力学容器 
	 */
	fn.setTopoContent = function () {
		let gContent = this.svg.append('g').attr('class', this.getKeyClass('outer'));
		/* 节点容器 */
		this.nodesCollect = gContent.append('g').attr('class','nodesCollect');
		/* 连线容器 */
		this.relationCollect = gContent.append('g').attr('class','linesCollect');
		this.linesCollect = this.relationCollect;
		/* 箭头容器 */
		this.markerCollect = gContent.append('g').attr('class','markerCollect');
		/* 缩放 */
		let zoomed = d3.zoom().scaleExtent([.1,2]).on('zoom', e => {
			const transform = d3.event.transform;
			this.transform = transform;
			gContent.attr("transform", transform);
		});
//		this.svg.call(zoomed);
		this.svg.on("dblclick.zoom", null);
	}
	
	/**
	 * 箭头
	 */
	fn.setMarker = function () {
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
	}
	
	/**
	 * 初始力学对象
	 */
	fn.setSimulation = function () {
		this.simulation = d3.forceSimulation().force('collide', d3.forceCollide(0))
			.alphaTarget(0)
			.force("charge", null)
			.force('link', d3.forceLink().id(function (d) {
				return d.id;
			}).strength(0.1)) .force('center', d3.forceCenter(this.w/2, this.h/2));
	}
	
	/**
	 * 设置网格背景
	 */
	fn.setNetwordGrid = function () {
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
	}
	
	/**
	 * 添加应用块
	 */
	fn.addRect = function (appid, appName) {
		this.appOperate.addRect(appid, appName);
	}
	
	/**
	 * 节点添加
	 */
	fn.addNodes = function (nodes) {
		if (!Array.isArray(nodes)) {
			nodes = [nodes];
		}
		nodes.forEach(item => {
			!this.isSameNode(item) && (this.nodes.push(item));
		})
	}
	
	/**
	 * 节点更新
	 */
	fn.updateNodes = function (nodes) {
		this.nodes = this.nodes.map(item =>  {
			let node = nodes.filter(it => {
				return it.id === item.id;
			})
			if (node && node.length) {
				node = node[0];
				Object.keys(node).forEach(key => {
					item[key] && (item[key] = node[key]);
				})
			}
			return item;
		})
		this.update();
	}
	
	/**
	 * 节点连线添加
	 */
	fn.addLinks = function (links) {
		if (!Array.isArray(links)) {
			links = [links];
		}
		links.forEach(item => {
			!this.isSameLink(item) && (this.links.push(item));
		})
	}
	
	/**
	 * 渲染节点
	 */
	fn.setNode = function  () {
		let that = this;
		this.nodesCollect.selectAll('g').data(this.nodes).enter().append('g')
		.on("click", that.click.bind(that))
		.call(d3.drag().clickDistance(20).on('start', that.dragStart.bind(that))
		.on('drag', that.drag.bind(that)).on('end', that.end.bind(that))).each(function (d) {
			d3.select(this).attr('class', 'nodeGroup').attr('cursor', 'pointer');
			d3.select(this).attr('id', d.id).attr('dmdefid',d.dmDefId).attr('name',d.name).attr('ename',d.ename);
			let enterG = d3.select(this).append('g');
			enterG.append('title').text(function(d) {
				return d.name;
			})
			
			enterG.append('image').attr('width', 60).attr('height', 60).attr('transform','translate(-30,-20)').attr('href', function (d) {
				return that.defaultBottom;
			})
			let foreign = enterG.append('foreignObject').attr('width', 80).attr('height', 80).attr('transform','translate(-40,-40)');
			foreign.html('<div class="topo-div-image" style="background-image: url('+d.img.replace(/\\/, '/')+')"></div>');
			let enterA = d3.select(this).append('a').attr('target','_top');
			let width = (function () {
				var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
				var match = d.name.match(reg);
				var chineses = match ? match.join('').length : 0;
				var english = d.name.length - chineses;
				return english * 8 + chineses * 13;
			})()
			enterA.append('rect').attr('class','noderect').attr('width', width).attr('height', 18).attr('opacity', 1).attr('fill', '#FFF')
			.attr('stroke', function () {
				return '#1EA1EC';	//'#1EA1EC'
			}).attr('y', 20)
			enterA.append('text').attr('class','nodetext').text(function (d) {
				return d.name;
			}).attr('stroke','none').attr("fill",function () {
				return '#1EA1EC';	//'#1EA1EC'
			}).attr('text-anchor', 'middle').attr('y','34').attr('style','font-size: 12px;');
			that.setEventNumber(d.event_num, enterA, width);
		})
	}
	
	fn.setEventNumber = function (number, enterA, width) {
		if (number !== undefined && number !== null && number !== 0) {
			enterA.append('circle').attr('fill', 'red').attr('cx', width/2).attr('r',6).attr('cy', 20)
			enterA.append('text').attr('fill','#FFF').attr('x', width/2 - 3).text(number).attr('y', 24).attr('style','font-size: 12px;');
			enterA.select('rect.noderect').attr('stroke','red');
			enterA.select('text.nodetext').attr('fill','red');
		}
	}
	
	/**
	 * 渲染连线
	 */
	fn.setLines = function () {
		let that = this;
		this.linesCollect.selectAll('line').data(this.links).enter().append('path')
		.attr('stroke-width', colorMap.StrokeWidth).attr('stroke', function (d) {
			return that.isHasEventLine(d)
		}).attr('id', function (d) {
			return `line_${d.source.id ? d.source.id : d.source}_${d.target.id ? d.target.id: d.target}`;
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
	}
	
	fn.isHasEventLine = function (d) {
		var source = d.source.id ? d.source.id :  d.source;
		var target = d.target.id ? d.target.id : d.target;
		var sourceNode = this.getNodeById(source)[0];
		var targetNode = this.getNodeById(target)[0];
		if (sourceNode.event_num && sourceNode.event_num > 0 
				&& targetNode.event_num && targetNode.event_num > 0) {
			return 'red';
		} else {
			return colorMap.relateLineGray;
		}
	}
	
	/**
	 * 渲染连线文字
	 */
	fn.setRelationText = function () {
		let that = this;
		this.relationCollect.selectAll('g').data(this.links).enter().append('g').attr('class','linetext').each(function(d) {
			let relaG = d3.select(this).attr('id', d.id).append('g');
			relaG.append('rect').attr('id', 'rect' + d.index).attr('class','edge-label-relation').attr('height', 18).attr('cursor', 'pointer').attr('rx', 2).attr('ry', 2).attr('width', function (d) {
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

			relaDelG.append('circle').attr('r','6').attr('fill', '#ff5252')
			relaDelG.append('text').attr('class','edge-remove-tag').attr('fill', '#FFF').attr('text-anchor', 'middle').text('-').attr('x', 0).attr('y', 3)
		})
	}
	
	fn.relationTextShowOrHide = function (appid, seeTag) {
		this.links.forEach(item => {
			if (item.appid == appid) {
				seeTag ? this.relationCollect.select('g#'+item.id).attr('class','edge-label-relation') : this.relationCollect.select('g#'+item.id).attr('class','edge-label-relation hide')
			}
		})
	}
	
	fn.showOrHideAllRelation = function (seeTag)  {
		this.appOperate.children.forEach(item => {
			this.relationTextShowOrHide(item.appid, seeTag);
		})
	}
	
	/**
	 * 是否节点重复
	 */
	fn.isSameNode = function (node) {
		return this.nodes.some((item => {
			return item.id === node.id;
		}))
	}
	
	/**
	 * 是否连线重复
	 */
	fn.isSameLink = function (link) {
		return this.links.some((item => {
			return item.id === link.id;
		}))
	}
	
	/**
	 * 更新区域
	 */
	fn.update = function () {
		let nodes = this.nodes;
		let links = this.links;
		this.linesCollect.selectAll('path').remove();
		this.nodesCollect.selectAll('g').remove();
		this.relationCollect.selectAll('.linetext').remove();
		this.setNode();
		this.setLines();
		this.setRelationText();
		this.simulation.nodes(nodes).on('tick', this.ticked.bind(this));
		this.simulation.force("link").links(links);
		this.simulation.alphaTarget(0).restart();
	}
	
	/**
	 * 桢更新
	 */
	fn.ticked = function () {
		let that = this;
		this.linesCollect.selectAll('path').attr('d', function(d) {
			if (d.source.id === d.target.id) {
				return `M ${d.source.x} ${d.source.y} A20 20 0 1 1 ${d.target.x + 20} ${d.target.y}`
			} else {
				if (d.same) {
					var sourceNode = that.findById(that.nodes, d.source.id);
					var targetNode = that.findById(that.nodes, d.target.id);
					var centerUpPos = {
						x: (targetNode.x + sourceNode.x) / 2,
						y: (targetNode.y + sourceNode.y) / 2
					}
					var len1 = 200 * Math.sin(90);
					var len2 = 200 * Math.cos(90);
					var q = {
						x: centerUpPos.x + len2,
						y: centerUpPos.y + len1
					}
					if (d.direct !== 0) {
						q = {
							x: centerUpPos.x - len2,
							y: centerUpPos.y - len1
						}
					}
					return `M ${d.source.x} ${d.source.y} Q ${q.x} ${q.y} ${d.target.x} ${d.target.y}`;
				}
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
			}else if (d.same) {
				var _bezier = that.findPointByBsizer(d);
				return _bezier.x - (width >> 1);
			}
			return (d.source.x + d.target.x) / 2 - (width >> 1)
		}).attr('y', function (d) {
			var height = d3.select(this).attr('height')
			if (d.source.id === d.target.id) { 
				return d.source.y - 40 - (height >> 1)
			}else if (d.same) {
				var _bezier = that.findPointByBsizer(d);
				return _bezier.y - 12
			}
			return (d.source.y + d.target.y) / 2 - (height >> 1)
		})
		this.relationCollect.selectAll('.link-text-type').attr('x', function (d) {
			var width = d3.select(this.parentNode).select('rect').attr('width')
			if (d.source.id === d.target.id) {
				return d.source.x - (width >> 1) + 22 + 15
			}else if (d.same) {
				var _bezier = that.findPointByBsizer(d);
				return _bezier.x - (width >> 1) + 22
			}
			return (d.source.x + d.target.x) / 2 - (width >> 1) + 22
		}).attr('y', function (d) {
			var height = d3.select(this.parentNode).select('rect').attr('height')
			if (d.source.id === d.target.id) { 
				return d.source.y - 40 - (height >> 1) +  14
			}else if (d.same) {
				var _bezier = that.findPointByBsizer(d);
				return _bezier.y + 2
			}
			return (d.source.y + d.target.y) / 2 - (height >> 1) + 14
		})
		
		this.relationCollect.selectAll('g.relaDelG').attr('transform', function (d) {
			var width = d3.select(this.parentNode).select('rect').attr('width')
			var height = d3.select(this.parentNode).select('rect').attr('height')
			if (d.source.id === d.target.id) {
				return `translate(${d.source.x + parseInt(width) - 10},${d.source.y - 50})`;
			}else if (d.same) {
				var _bezier = that.findPointByBsizer(d);
				return `translate(${_bezier.x + parseInt(width >> 1)}, ${_bezier.y - 10})`
			}
			return `translate(${(d.source.x + d.target.x) / 2 + (width >> 1)},${(d.source.y + d.target.y) / 2 - (height >> 1)})`;
		})
		
		this.nodesCollect.selectAll('g.nodeGroup').attr('transform',function(d){
			return `translate(${d.x},${d.y})`;
		})
		this.nodesCollect.selectAll('rect.noderect').attr('x', function () {
			return -d3.select(this).attr('width') >> 1
		})
	}
	
	fn.findPointByBsizer = function(d) {
		let that = this;
		var sourceNode = this.findById(this.nodes, d.source.id);
		var targetNode = this.findById(this.nodes, d.target.id);
		var centerUpPos = {
			x: (targetNode.x + sourceNode.x) / 2,
			y: (targetNode.y + sourceNode.y) / 2
		}
		var len1 = 200 * Math.sin(90);
		var len2 = 200 * Math.cos(90);
		var q = {
			x: centerUpPos.x + len2,
			y: centerUpPos.y + len1
		}
		if (d.direct !== 0) {
			q = {
				x: centerUpPos.x - len2,
				y: centerUpPos.y - len1
			}
		}
		var _start_point = {
			x: d.source.x,
			y: d.source.y
		}
		var _end_point = {
			x: d.target.x,
			y: d.target.y
		}
		var _bezier=new SquareBezier(_start_point,q,_end_point);
		return _bezier.getPoint(0.5);
	},
	
	/**
	 * 拖拽事件
	 */
	fn.dragStart = function (d) {
		this.invented.init({
			type: 'circle',
			circle: 15,
			container: this.inventNode
		});
		this.invented.createInvente();
		this.invented.setXy({x: d.x, y: d.y});
	}
	
	fn.drag = function(d) {
        this.dragRule(d, d3.event);
        this.invented.setXy({x: d3.event.x, y: d3.event.y}, d.type);
        this.simulation.alphaTarget(0.1).restart();
	},
	fn.dragRule = function (d, event) {
		var fx = event.x;
		var fy = event.y;
		d.fx = fx;
        d.fy = fy;
	},
	fn.end = function (d) {
		var offsetX = d.fx - this.invented.current.x;
		var offsetY = d.fy - this.invented.current.y;
		d.fx = this.invented.current.x;
        d.fy = this.invented.current.y;
        this.invented && this.invented.destory();
		this.simulation.alphaTarget(0);
	}
	fn.click = function(d) {
		this.opts.clickNode && this.opts.clickNode({node: d, relation: this.getUpDownNode(d)});
//		if (!!d.expand) {
//			d.expand = false;
//		} else {
//			d.expand = true;
//		}
//		d3.event.sourceEvent && d3.event.sourceEvent.stopPropagation();
//		d = this.unityChildren(d);
//		this.clickNode.setClickNode(d);
//		this.clickNode.setSearchNodeEvent({level: 1});
	}
	fn.getLinkById = function(source, target) {
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
	}
	fn.updateNodeById = function (id, config) {
		this.nodes = this.nodes.map(item => {
			if (item.id === id) {
				Object.keys(item).forEach(key => {
					config[key] && (item[key] = config[key])
				})
			}
			return item;
		})
	}
	fn.unityChildren = function (d) {
		d.children = d.contains;
		d.children = d.children.map(item => {
			item.dmDtId = item.id;
			item.appid = d.appid;
			return item;
		})
		return d;
	}
	fn.reNameId = function (id, appid) {
		return 'node' + id + '_' + appid;
	}
	fn.getNodeById = function (id) {
		return this.nodes.filter(item => {
			if (item.id === id) {
				return true;
			}
			return false;
		});
	}
	fn.removeLinkById = function (id) {
		this.links = this.links.filter(item => {
			return item.id !== id;
		})
	}
	fn.removeNodeById = function (id) {
		this.nodes = this.nodes.filter(item => {
			return item.id !== id;
		})
	}
	fn.removeLinkByAppId = function (appid) {
		this.links = this.links.filter(item => {
			return item.appid !== appid;
		})
	}
	fn.removeLinkByType = function (type) {
		this.links = this.links.filter(item => {
			return item.type !== type;
		})
	}
	fn.removeNodeByAppId = function (appid) {
		this.nodes = this.nodes.filter(item => {
			return item.appid !== appid;
		})
	}
	fn.getUpDownNode = function (node) {
		let up = [], down = [], relation = [];
		this.links.forEach(item => {
			if (item.source.id === node.id) {
				down.push(this.getNodeById(item.target.id)[0])
				relation.push(item);
			} else if (item.target.id === node.id) {
				up.push(this.getNodeById(item.source.id)[0])
				relation.push(item);
			}
		})
		return {
			up,down,relation
		}
//		return Array.prototype.concat.call(up, down, node);
	}
	
	var SquareBezier = function(start_point,crt_point,end_point){
	    var p_start={x:0,y:0};
	    var p_end={x:0,y:0};
	    p_start=start_point;
	    p_end=end_point;
	    var p_crt1=crt_point;
	    /**
	     * 计算公式：
	     *            | 1  0  0|  |P0|
	     * [1 t t*t ] |-2  2  0|  |P1|
	     *            |1  -2  1|  |P2|
	     * **/
	    this.getPoint=function(t){
	      var _matrix1=[1,t,t*t];
	      var _matrix2=[ [1,0,0] ,[-2,2,0] ,[1,-2,1]
	      ];
	      var _matrix3=[ [p_start.x,p_start.y] ,[p_crt1.x,p_crt1.y] ,[p_end.x,p_end.y]
	      ];
	      var _matrix_tmp=[ _matrix1[0]*_matrix2[0][0]+_matrix1[1]*_matrix2[1][0]+_matrix1[2]*_matrix2[2][0] ,_matrix1[0]*_matrix2[0][1]+_matrix1[1]*_matrix2[1][1]+_matrix1[2]*_matrix2[2][1],_matrix1[0]*_matrix2[0][2]+_matrix1[1]*_matrix2[1][2]+_matrix1[2]*_matrix2[2][2]
	      ];
	      var _matrix_final=[ _matrix_tmp[0]*_matrix3[0][0]+_matrix_tmp[1]*_matrix3[1][0]+_matrix_tmp[2]*_matrix3[2][0],_matrix_tmp[0]*_matrix3[0][1]+_matrix_tmp[1]*_matrix3[1][1]+_matrix_tmp[2]*_matrix3[2][1]
	      ];
	      var _res_point={
	        x:_matrix_final[0],y:_matrix_final[1]
	      };
	      return _res_point;
	    };
	};
	
	return EventTopo;
})