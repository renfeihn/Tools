/**
 * ztree 树节点点击弹窗
 */

define([],function () {
	let ztreeRight = function  (container, opts = {}) {
		this.list = {};
		this.container = container;
		this.init();
	}
	
	ztreeRight.prototype = {
		init () {
			this.dom = document.createElement('div');
			this.dom.setAttribute('class', 'ztree-modal-right hide');
			this.content = document.createElement('div');
			this.content.setAttribute('class', 'ztree-modal-righ-list');
			this.dom.append(this.content);
			this.container.append(this.dom);
		},
		initEvent () {
			this.dom.addEventListener('click', function (e){
				e.stopPropagation();
			}, false)
		},
		setPosition (x, y) {
			this.dom.setAttribute('class', 'ztree-modal-right');
			this.dom.setAttribute('style', `left: ${x}px;top: ${y}px;`)
		},
		hideModal () {
			this.dom.setAttribute('class', 'ztree-modal-right hide');
		},
		setList (id) {
			this.getList(id);
		},
		async getList (id) {
			var result = await this.getPromise(id);
			var h = '';
			result.forEach(item => {
				h += this.getItem(item);
			})
			this.content.innerHTML = h;
		},
		getPromise (id) {
			return new Promise((resolve, reject) => {
				setTimeout(function () {
					resolve([{name: '应用系统',id: '1'},{name: '核心系统',id: '2'},{name: '中间系统',id: '3'}])
				}, 500)
			})
		},
		getItem (item) {
			return `<div draggable="true" class="ztree-modal-righ-item" data-id="${item.id}" data-name="${item.name}" data-cate="1">
					</div>`
		}
	}
	
	return ztreeRight;
})