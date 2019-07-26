/**
 * 右击菜单管理
 */
define([], function () {
	let menu = function (container, opts = {}) {
		this.menuList = [
			{
				name: '删除节点',
				id: '0'
			},
			{
				name: '删除区域线',
				id: '2'
			},
			{
				name: '清空区域线',
				id: '3'
			},
			/*{
				name: '向上钻取',
				id: '4',
				type: 'up',
				children: [
					{
						name: '向上一层',
						id: '41',
					},
					{
						name: '向上两层',
						id: '42',
					},
					{
						name: '向上三层',
						id: '43',
					},
					{
						name: '向上四层',
						id: '44',
					}
				]
			},*/
			/*{
				name: '向下钻取',
				id: '5',
				type: 'down',
				children: [
					{
						name: '向下一层',
						id: '51',
					},
					{
						name: '向下两层',
						id: '52',
					},
					{
						name: '向下三层',
						id: '53',
					},
					{
						name: '向下四层',
						id: '54',
					}
				]
			}*/
		]
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
			this.container.append(this.dom);
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
						that.editNodeName();
						break;
					case 2:
						that.delLine()
						break;
					case 3:
						that.clearLine()
						break;
					default:
						var pId = $(e.srcElement).parents('li').attr('data-id');
						var reg = new RegExp(pId ,'g');
						var level = (id + '').replace(reg, '');
						var type = $(e.srcElement).parents('li').attr('data-type');
						that.parent.opts.findChildrenSearch && that.parent.opts.findChildrenSearch(that.delNodeId, {level, type});
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
			}, false)
		},
		delNode () {
			this.delNodeId && this.parent.delNode(this.delNodeId);
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
		seeUpWater () {
			
		},
		seeDownWater () {
			
		},
		editNodeName () {
			this.delNodeId && this.parent.opts.renameNode && this.parent.opts.renameNode(this.delNodeId);
		},
		clearLine () {
			this.parent.dragType.clearLine();
			this.hideMenu();
		},
		delLine () {
			this.delNodeId && this.parent.dragType.delLine(this.delNodeId);
		},
		setPosition (x, y, id) {
			this.delNodeId = id;
			this.dom.setAttribute('class', 'topo-menu-ul')
			this.dom.setAttribute('style',`left: ${x}px;top: ${y}px;`)
		},
		hideMenu () {
			this.dom.setAttribute('class', 'topo-menu-ul hide')
		}
	}
	return menu;
})