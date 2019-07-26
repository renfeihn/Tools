/**
 * 	组件包含器
 */
define([], function () {
	let defaultBox = function (opts) {
		this.type = "default-box";
		this.parent = opts.parent;
		this.stageType = opts.stageType;
		this.identifyType = ['row', 'panel', 'tab'];
		this.current = {
			width: 0,
			height: 0,
			x: 0,
			y: 0
		};
		this._init();
	}
	
	defaultBox.prototype = {
		_init() {
			this.dom = document.createElement('div');
			this.dom.className = 'default-box';
			this.dom.style = 'margin: 8px;width: calc(100% - 16px);height: calc(100% - 16px);';
//			this.right = document.createElement('div');	// 右拖拽容器
//			this.right.setAttribute('class','resize-ceil right-resize');
//			this.bottom = document.createElement('div');	// 下拖拽容器
//			this.bottom.setAttribute('class','resize-ceil bottom-resize');
//			this.resize = document.createElement('div');	// 右下拖拽容器
//			this.resize.setAttribute('class','resize-ceil resize-btn');
//			this.dom.appendChild(this.right);
//			this.dom.appendChild(this.bottom);
//			this.dom.appendChild(this.resize);
//			this._addEvent()
		},
		_addEvent() {
			this.dom.addEventListener('mousedown', _mousedown, false);
			let ele = this.dom;
			let that = this;
			let currentStage = components.stageCollect.getStage(this.stageType);
			function _mousedown (e) {
				e = e || window.event;
				e.stopPropagation && e.stopPropagation();
				that.current.x = e.clientX;
				that.current.y = e.clientY;
				that.current.width = ele.offsetWidth;
				that.current.height = ele.offsetHeight;
				that._setDragType(that.type);
				that.type = that.getType(e.target.className);
				if (!that.type) {
					return;
				}
				document.addEventListener('mousemove', _mousemove, false);
				document.addEventListener('mouseup', _mouseup, false);
			}
			function _mousemove (e) {
				e = e || window.event;
				e.stopPropagation && e.stopPropagation();
				let clientX = e.clientX;
				let clientY = e.clientY;
				let rect = that.getParentNodeRect();
				if (clientX <= rect.parentLeft) {
					clientX = rect.parentLeft
				} else if (clientX >= rect.parentRight) {
					clientX = rect.parentRight
				}
				if (clientY <= rect.parentTop) {
					clientY = rect.parentTop
				} else if (clientY >= rect.parentBottom) {
					clientY = rect.parentBottom
				}
				let offsetX = clientX - that.current.x;
                let offsetY = clientY - that.current.y;
                let type = that.type;
                switch(type) {
	                case 'right':
	                	that.mouseRight(offsetX);
	                	break;
	                case 'bottom':
	                	that.mouseBottom(offsetY);
	                	break;
	                case 'resize':
	                	that.resizeBtn(offsetX, offsetY)
	                	break;
	            }
                that.current.x = clientX;
                that.current.y = clientY;
                that.current.width = parseInt(ele.style.width);
                that.current.height = parseInt(ele.style.height);
                that.resizeChildren(currentStage.children);
			}
			
			function _mouseup (e) {
				e = e || window.event;
				e.stopPropagation && e.stopPropagation();
				document.removeEventListener('mousemove', _mousemove, false);
				document.removeEventListener('mouseup', _mouseup, false);
				that.removeClassName(that.right, 'active');
				that.removeClassName(that.bottom, 'active');
				that.removeClassName(that.resize, 'active');
			}
		},
		resizeChildren: function(compo) {
            //var compo = components.stage.children;
            for (var i = 0; i < compo.length; i++) {
                if (!this.identifyType.includes(compo[i].type)){
                   compo[i].resize && compo[i].resize();
                } else {
                    compo[i].children.length && this.resizeChildren(compo[i].children);
                }
            }
        },
		getType: function (className) {
			if (className.indexOf('right-resize') !== -1) {
				return 'right'
			} else if (className.indexOf('bottom-resize') !== -1) {
				return 'bottom'
			} else if (className.indexOf('resize-btn') !== -1) {
				return 'resize'
			}
			return null;
		},
		removeClassName: function (ele, className) {
			let elClassName = ele.className;
			if (elClassName.indexOf(className) !== -1) {
				ele.className = elClassName.replace(className, '').trim();
			}
		},
		addClassName: function (ele, className) {
			let elClassName = ele.className;
			if (elClassName.indexOf(className) === -1) {
				ele.className += ` ${className}`;
			}
		},
		mouseBottom: function (offset) {
			let ele = this.dom;
			ele.style.width = `${this.current.width}px`;
			ele.style.height = `${this.current.height + offset}px`;
		},
		mouseRight: function (offset) {
			let ele = this.dom;
			ele.style.width = `${this.current.width + offset}px`;
			ele.style.height = `${this.current.height}px`;
		},
		resizeBtn: function (offsetX, offsetY) {
			let ele = this.dom;
			ele.style.width = `${this.current.width + offsetX}px`;
			ele.style.height = `${this.current.height + offsetY}px`;
		},
		getParentNodeRect: function () {
			let parentLeft = this.dom.parentNode.getBoundingClientRect().left;
			let parentTop = this.dom.parentNode.getBoundingClientRect().top;
			let parentRight = this.dom.parentNode.getBoundingClientRect().left + this.dom.parentNode.offsetWidth;
			let parentBottom = this.dom.parentNode.getBoundingClientRect().top + this.dom.parentNode.offsetHeight;
			return {
				parentLeft,
				parentTop,
				parentRight,
				parentBottom
			}
		},
		_setDragType: function (type) {
			switch(type) {
				case 'drag':
					break;
				case 'right':
					this.addClassName(this.right, 'active');
					this.removeClassName(this.bottom, 'active');
					this.removeClassName(this.resize, 'active');
					break;
				case 'bottom':
					this.addClassName(this.bottom, 'active');
					this.removeClassName(this.right, 'active');
					this.removeClassName(this.resize, 'active');
					break;
				case 'resize':
					this.addClassName(this.resize, 'active');
					this.removeClassName(this.right, 'active');
					this.removeClassName(this.bottom, 'active');
					break;
			}
		},
	}
	return defaultBox;
});