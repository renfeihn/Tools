/**
 * 右击菜单管理
 */
define([], function () {
	let menu = function (container, opts = {}) {
		this.menuList = [
			{
				name: '删除',
				id: '0'
			},
			{
				name: '清空',
				id: '1'
			},
			{
				name: '编辑',
				id: '2'
			},
			{
				name: '查看事件',
				id: '3'
			},
			{
				name: '刷新频率',
				id: '4'
			}
		]
		this.opts = opts;
		this.container = container;
		this.parent = opts.parent;
		this.delNodeId = null;
		this.dom = document.createElement('ul');
		this.dom.setAttribute('class','topo-menu-ul hide');
		this.init();
	}
	menu.prototype = {
		init () {
			var h = '';
			this.menuList.forEach(item => {
				h += `<li class="topo-menu-li" data-type="${item.type}" data-id="${item.id}">${item.name}</li>`
			})
			$(document.body).append(this.dom);
			this.dom.innerHTML = h;
			this.initEvent();
		},
		initEvent () {
			let that = this;
			this.dom.addEventListener('click', function (e) {
				e.stopPropagation();
				var id = parseInt(e.srcElement.dataset.id);
				that.hideMenu()
				switch(id) {
					case 0:
						that.delNode();
						break;
					case 1:
						that.setEmpty();
						break;
					case 2:
						that.editNode();
						break;
					case 3:
						that.setEvent()
						break;
					case 4:
						that.setInterval()
						break;
				}
			}, false)
			
			$(this.dom).on("mouseenter",">li", function (e) {
				e.stopPropagation();
				var node = that.getChildrens(this.dataset.id);
				if ($(this).find('ul').length !== 0) {
					return;
				}
				if (node.children && node.children.length > 0) {
					var h = '<ul class="children-ul">';
					node.children.forEach(item => {
						h += `<li class="topo-menu-li" data-id="${item.id}">${item.name}</li>`
					})
					h += '</ul>';
					$(this).append(h);
				}
			})
			
			document.querySelector('body').addEventListener('click', function  (e) {
				that.hideMenu();
			})
		},
		setEmpty () {
			this.delNodeId && this.opts.parent && this.opts.parent.emit.trigger('setEmpty', {id:this.delNodeId});
			this.delNodeId = null;
			this.hideMenu();
		},
		delNode () {
			this.delNodeId && this.opts.parent && this.opts.parent.emit.trigger('delItem', {id:this.delNodeId});
			this.delNodeId = null;
			this.hideMenu();
		},
		editNode () {
			this.delNodeId && this.opts.parent && this.opts.parent.emit.trigger('editItem', {id:this.delNodeId});
			this.delNodeId = null;
			this.hideMenu();
		},
		setEvent () {
			this.delNodeId && this.opts.parent && this.opts.parent.emit.trigger('eventItem', {id:this.delNodeId});
			this.delNodeId = null;
			this.hideMenu();
		},
		setInterval () {
			this.delNodeId && this.opts.parent && this.opts.parent.emit.trigger('setInterval', {id:this.delNodeId});
			this.delNodeId = null;
			this.hideMenu();
		},
		getChildrens (id) {
			var menu = this.menuList.filter(item => {
				return item.id === id;
			})
			if (!menu || menu.length === 0) {
				return null
			} else {
				return menu[0];
			}
		},
		setPosition (x, y, id) {
			this.delNodeId = id;
			x = parseInt(x)
			this.dom.setAttribute('class', 'topo-menu-ul')
			if (x + this.minWidth > window.screen.availWidth - 20) {
				x -= this.minWidth;
			}
			this.dom.setAttribute('style',`left: ${x}px;top: ${y}px;`)
		},
		hideMenu () {
			this.dom.setAttribute('class', 'topo-menu-ul hide')
		}
	}
	return menu;
})