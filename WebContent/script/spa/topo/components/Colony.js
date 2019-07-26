/**
 * 集群组件
 */

define(['d3'], function (d3) {
	
	const emptyString = `<div class="empty-string-colony">试着拖拽节点进来</div>`
	
	// svg 中 通过foreignObject标签进行添加 该标签遵循xhtml协议，所以需要包含在<body xmlns="http://www.w3.org/1999/xhtml"></body>中
		
	let Colony = function (opts = {}) {
		this.children = opts.children || [];
		this.parent = opts.parent;
		this.uuid = opts.uuid;
		this.dom = null;
		this.init();
	}
	Colony.prototype = {
		init () {
			this.dom = document.createElement('div');
			this.dom.setAttribute('class','colony-div-svg');
			this.dom.setAttribute('id',this.uuid);
			this.dom.innerHTML += emptyString;
			this.addEvent();
		},
		addEvent () {
			let that = this;
			$('body').off('dragover', dragover)
			$('body').off('drop', drop)
			$('body').off('dblclick', dblclick)
			$('body').off('dblclick', contextmenu)
			$('body').off('dblclick', closeNode)
			$('body').on('dragover','#'+this.uuid, dragover).on('drop','#'+this.uuid, drop);
			$('body').on('dblclick','#'+this.uuid+'A>span.closeColony-name', dblclick)
			$('body').on('dblclick','#'+this.uuid+'A>span.closeColony', contextmenu)
			$('body').on('dblclick','#'+this.uuid+'>.normal-node>span.closeColony', closeNode)
			
			function dragover(e) {
				e.preventDefault();
				e.stopPropagation();
				that.parent.removeDrop();
			}
			function drop(e) {
				e.stopPropagation();
				e.preventDefault();
				try {
					var cate = JSON.parse(app.dragCate);
					that.addChildren({'id': 'topo_agree_'+cate.id, name: cate.name})
					that.parent.addDrop();
				} catch (e) {
				}
			}
			
			function closeNode (e) {
				e.preventDefault();
				e.stopPropagation();
				var id = $(this).parent().attr('id');
				that.children = that.children.filter(function (item) {
					if (item.id === id) {
						return false;
					}
					return true;
				})
				that.parent.update();
			}
			
			function dblclick (e) {
				e.preventDefault();
				e.stopPropagation();
				that.parent.opts.editColony && that.parent.opts.editColony(that);
			}
			
			function contextmenu (e) {
				e.preventDefault();
				e.stopPropagation();
				that.parent.delNode(that.uuid);
			}
		},
		getInnerHTML () {
			var str = '';
			if (this.children.length === 0) {
				str = emptyString;
			} else {
				this.children.forEach(item => {
					str += `<div class="normal-node" title="${item.name}" id="${item.id}">
								<span class="closeColony">x</span>
								<div class="image-normal-node-bottom"></div>
								<div class="image-normal-node"></div>
								<span class="name">${item.name}</span>
							</div>`
				})
			}
			this.dom.innerHTML = str;
			return `<div class="colony-title" id="${this.uuid+'A'}"><span class="closeColony-name">${this.title}</span><span class="closeColony">x</span></div>`+this.dom.outerHTML;
		},
		addChildren (node) {
			if (!Array.isArray(node)) {
				node = [node];
			}
			this.children.push(...node);
			this.parent.update();
		},
		removeChildren () {
			
		},
		clearChildren () {
			
		},
		destory () {
			
		},
		set title (title) {
			console.log('title, ', title);
			this.name = title;
		},
		get title () {
			return this.name || '点击输入集群名称';
		}
	}
	return Colony;
})