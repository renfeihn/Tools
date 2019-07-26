define(['util', 'require', 'container', 'row', 'editorTab'], function(util, require){
	var Container = require('container');
	
    function Panel(opts) {
        opts = opts || {};
        Container.call(this, opts);
	    this.title = opts.title || '标题';
        this.name = "面板";
        this.type = "panel";
        this.hasParent = false;
        this.container = "content";
        this.canAccept = 'all';
        this.identifyType = ['row', 'panel', 'tab'];
        this.attrType = ['字体', '背景'];
        this._init();
    }

    Panel.prototype = {
        _generatorHtml: function () {
            this.$el = document.createElement('section');
            this.$el.className = "panel edit";
            this.$el.style.fontWeight = "normal";
            var styleString = '';
            var that = this;
            Object.keys(this.style).forEach(function(d){
            	styleString += `${d}: ${that.style[d]};`;
            })
            if (this.env !== 'edit') {           
            	styleString+='background: transparent;border-bottom-color: transparent';
            	 this.$el.innerHTML = '<p class="title" style="'+ styleString +'" >'+ this.title +'</p><div class="content"></div>'
            } else{ 	
            	this.$el.style.margin = '8px';
            	this.$el.innerHTML = '<p class="title" contenteditable="true"  style="'+ styleString +'" >'+ this.title +'</p><div class="content"></div>'
            	this.p = this.$el.querySelector(".title");
                this._checkTitle();
            }
        },
        _checkTitle: function() {
            var that = this;
            this.p = this.$el.querySelector(".title");
            this.p.addEventListener("input", function(e) {
            	that.title = this.innerText;
            }, false);
        },
        _render: function(com, position, el, coll) {
            var container = null;
            console.log(this.key)
            //debugger;
            switch (com) {
                case 'row':
                	var Row = require('row');
                    container = new Row({rendering: position, env: this.env, key: this.key});
                    break;
                case 'panel':
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
                    el.querySelector('.' + this.container).append(container.$el);
                    break;
                case 'left':
                    this.$el.querySelector('.' + this.container).insertBefore(container.$el, el);
                    // update node
                    this._updateNode(coll, container.$el);
                    break;
                case 'top':
                    this.$el.querySelector('.' + this.container).insertBefore(container.$el, el);
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
        }
    };

    util.inherits(Panel, Container);

    Object.defineProperties(Panel.prototype, {
        fontFamily: {
            get: function () {
                return this.p.style.fontFamily;
            },

            set: function (value) {
            	this.style.fontFamily = value;
                this.p.style.fontFamily = value;
            }

        },

        fontSize: {
            get: function () {
                return this.p.style.fontSize;
            },
            set: function (value) {
            	this.style.fontSize = value;
                this.p.style.fontSize = value;
            }
        },

        color: {
            get: function () {
                return this.p.style.color;
            },
            set: function (value) {
            	this.style.color = value;
                this.p.style.color = value;
            }
        },

        fontWeight: {
            get: function () {
                return this.p.style.fontWeight;
            },
            set: function (value) {
            	this.style.fontWeight = value;
                this.p.style.fontWeight = value;
            }
        },

        fontStyle:{
            get: function() {
                return this.p.style.fontStyle;
            },
            set: function(value) {
            	this.style.fontStyle = value;
                this.p.style.fontStyle = value;
            }
        },

        textDecoration:{
            get: function() {
                return this.p.style.textDecoration;
            },
            set: function(value) {
            	this.style.textDecoration = value;
                this.p.style.textDecoration = value;
            }
        },

        textShadow: {
            get: function() {
                return  this.p.style.textShadow;
            },
            set: function(value) {
            	this.style.textShadow = value;
                this.p.style.textShadow = value;
            }

        },

        letterSpacing: {
            get: function() {
                return this.p.style.letterSpacing;
            },
            set: function(value) {
            	this.style.letterSpacing = value;
                this.p.style.letterSpacing = value;
            }
        },

        backgroundColor: {
            get: function () {
                return this.p.style.backgroundColor;
            },
            set: function (value) {
            	this.style.backgroundColor = value;
                this.p.style.backgroundColor = value;
            }
        },

        backgroundSize: {
            get: function() {
                return this.p.style.backgroundSize;
            },
            set: function(value) {
            	this.style.backgroundSize = value;
                this.p.style.backgroundSize = value;
            }
        },

        backgroundPosition: {
            get: function() {
                return this.p.style.backgroundPosition;
            },
            set: function(value) {
            	this.style.backgroundPosition = value;
                this.p.style.backgroundPosition = value;
            }
        },

        backgroundRepeat:{
            get: function() {
                return this.p.style.backgroundRepeat;
            },
            set: function(value) {
            	this.style.backgroundRepeat = value;
                this.p.style.backgroundRepeat = value;
            }

        }
    });
   
    return Panel;

});