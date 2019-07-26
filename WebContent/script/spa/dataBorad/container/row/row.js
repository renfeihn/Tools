define(['util', 'require', 'container'], function(util, require){
	var Container = require('container');
    function Row(opts) {
       opts = opts || {};
       Container.call(this, opts);
       this.columns = opts.columns || 1; // default 1
       this.name = "行布局";
       this.type = "row";
       this.hasParent = false;
       this.rendering = opts.rendering;
       this.rowLine = false;
       this.canAccept = 'all';
       this.attrType = ['背景','边距'];
       this.panelChild =  [];
       this.container = 'row-com';

       this._init();
    }

    Row.prototype = {
    	_addPanel (content) {
    		this.panelChild.push(content);
    		this.$el.append(content.$el);
    	},
        _generatorHtml: function () {
            this.$el = document.createElement('div');
            this.$el.className = 'row-com com-1';
            if (this.rendering == 'left') {
                this.$el.innerHTML = '<div class="col-line r"></div><div class="row-line"></div>';
            } else if(this.rendering == 'right') {
                this.$el.innerHTML = '<div class="col-line l"></div><div class="row-line"></div>';
            } else {
                this.$el.innerHTML = '<div class="row-line"></div>';
            }
            this._addEventAdditional();
        },
        _addEventAdditional: function () {
        	if (this.env !== 'edit') return;
            this.$el.addEventListener("mousedown",this._mouseDown.bind(this), false);
            this.$el.addEventListener("click", function(e){
            	
                var classList = e.target.classList;
                if(classList.contains("row-line") || classList.contains("col-line")) {
                    e.stopPropagation();
                    e.preventDefault();
                }
            }, false)
            document.addEventListener("mousemove",this._mouseMove.bind(this), false);
            document.addEventListener("mouseup", this._mouseUp.bind(this), false);
        },
        _render: function(com, position, el, coll){
            var container = null;
            //debugger;
            switch (com) {
                case 'row':
                    container = new Row({rendering: position, env: this.env, key: this.key});
                    break;
                case 'panel':
                	var Panel = require('panel');
                    container = new Panel({rendering: position, env: this.env, key: this.key});
                    break;
                case 'tab':
                	var Tab = require('editorTab');
                    container = new Tab({rendering: position, env: this.env, key: this.key});
                    break;
                default:
                    container = this.createEmpty(position);
                    break;

            }
            switch (position) {
                case 'normal':
                    el.append(container.$el);
                    break;
                case 'left':
                    this.$el.insertBefore(container.$el, el);
                    // update node
                    this._updateNode(coll, container.$el);
                    break;
                case 'top':
                    this.$el.insertBefore(container.$el, el);
                    this._updateRowNode(container.$el);
                    break;
                case 'right':
                    el.after(container.$el);
                    this._updateNode(coll, container.$el);
                    break;
                case 'bottom':
                    el.after(container.$el);
                    this._updateRowNode(container.$el);
                    break;
            }
            this.identifyType.includes(com) && this.add(container);
        },
        _mouseDown: function(e) {
        	e.stopPropagation();
//            if(e.target.className.indexOf('row-line') != -1 && (!this.hasParent || this.parentType == 'tab')) {
            if(e.target.className.indexOf('row-line') != -1) {
                e.stopPropagation();
                e.preventDefault();
                this.rowLine = true;
                this.startY = e.pageY;
                this.node = e.target;
            }
            if (e.target.className.indexOf('col-line') != -1) {
                e.stopPropagation();
                e.preventDefault();
                this.colLine = true;
                this.startX = e.pageX;
                this.node = e.target;
            }
        },
        _mouseMove: function(e) {
        	let currentStage = components.stageCollect.getStage(this.key);
            if (this.rowLine) {
               var node = this.node.parentNode;
              // debugger;
               var offsetY = e.pageY - this.startY;
               var currentHeight = node.style.height;
               currentHeight  = parseInt(currentHeight) ? parseInt(currentHeight) : node.offsetHeight;
               node.style.height = parseInt(currentHeight) + offsetY + 'px';
               this.startY = e.pageY;
            }
            if (this.colLine) {
                var node = this.node.parentNode;
                var needUpdateNode = null;
                var x = 1;
                if (this.node.className.indexOf('r') != -1) {
                    x = 1;
                    needUpdateNode = node.nextSibling;
                } else {
                    x = -1;
                    needUpdateNode = node.previousSibling;
                }
                var offsetX = e.pageX -  this.startX;
                //debugger;
                var totalWidth = offsetX * 100 / currentStage.$el.offsetWidth ;
                x = x * totalWidth;
                var startIndex = node.style.width.indexOf('(');
                var endIndex = node.style.width.indexOf('%');
                var width = node.style.width.substring(startIndex + 1, endIndex);

                var n_startIndex = needUpdateNode.style.width.indexOf('(');
                var n_endIndex = needUpdateNode.style.width.indexOf('%');
                var n_width = needUpdateNode.style.width.substring(n_startIndex + 1, n_endIndex);

                if (parseFloat(width) + x < 5 || parseFloat(n_width) - x < 5) {
                    return;
                }
                var update_width = parseFloat(width) + x;
                var update_n_width = parseFloat(n_width) - x;

                node.style.width = 'calc('+ update_width + '% - 16px)';
                needUpdateNode.style.width = 'calc('+ update_n_width + '% - 16px)';
                this.startX = e.pageX;
            }
        },
        _mouseUp: function(e) {
        	let currentStage = components.stageCollect.getStage(this.key);
            e.preventDefault();
            if (this.rowLine || this.colLine) {
            	currentStage && this.resizeChildren(currentStage.children);
            }
            this.rowLine = false;
            this.colLine = false;
        },
        _updateWidth: function(element) {
			let width = element.style.width;
			if(!width.includes('calc') || !width.includes('-')){
				return;
			}
			let calc = width.split('-')[0];
			let margin = parseInt(element.style.marginLeft) + parseInt(element.style.marginRight);
			let updateWidth = calc + '- ' + margin + 'px' + ')';
			element.style.width = updateWidth;
		},
		_updateHeight: function(element) {
			let height = element.style.height;
			if(!height.includes('calc')){
				return;
			}
			let calc = height.split('-')[0];
			let margin = parseInt(element.style.marginTop) + parseInt(element.style.marginBottom);
			let updateHeight = calc + '- ' + margin + 'px' + ')';
			element.style.height = updateHeight;
		},
    }

    util.inherits(Row, Container);
    
    
    Object.defineProperties(Row.prototype, {
    	backgroundColor: {
            get: function () {
                return this.$el.style.backgroundColor;
            },
            set: function (value) {
                this.$el.style.backgroundColor = value;
            }
        },
        marginTop: {
            get: function () {
                return parseInt(this.$el.style.marginTop) || '';
            },
            set: function (value) {
                this.$el.style.marginTop = value;
                this._updateHeight(this.$el);
            }
        },
        marginBottom: {
            get: function () {
                return parseInt(this.$el.style.marginBottom) || '';
            },
            set: function (value) {
                this.$el.style.marginBottom = value;
                this._updateHeight(this.$el);
            }
        },
        marginLeft: {
            get: function () {
                return parseInt(this.$el.style.marginLeft) || '';
            },
            set: function (value) {
                this.$el.style.marginLeft = value;
                this._updateWidth(this.$el);
            }
        },
        marginRight: {
            get: function () {
                return parseInt(this.$el.style.marginRight) || '';
            },
            set: function (value) {
                this.$el.style.marginRight = value;
                this._updateWidth(this.$el);
            }
        }
        
    })
    
    return Row;
});