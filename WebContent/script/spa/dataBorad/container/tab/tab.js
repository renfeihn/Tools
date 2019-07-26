define(['util', 'require', 'container', 'panel'], function(util, require){
	var Container = require("container");
	
    function Tab(opts) {
       opts = opts || {};
       Container.call(this, opts);
       this.name = "选项卡";
       this.tabs =  opts.tabs || [{name: "tabs1", children:[]}];
       this.type = "tab";
       this.canAccept = "all";
       this.hasParent = false;
       this.container = 'tab-pane';
       this.activeIndex = 0;

       this.attrType = ['字体', '背景'];
       this._init();
    }

    Tab.prototype = {
        _generatorHtml: function(){
            this.$el = document.createElement("section");
            this.$el.className = "panel com-tab";
            this.$el.cssText = "margin:-20px -20px 0;";
            var headerStr = '<ul class="nav nav-tabs nav-underLine">';
            var bodyStr = '<div class="tab-content" style="height:calc(100% - 40px)">';
            var that = this;
            this.tabs.forEach(function(item, index){
            	var uuid = util.genearteUUid();
            	var clsName = '';
            	if (index == 0) {
            		clsName = 'active';
            	}
            	if (that.env !== 'edit') {
            		headerStr += '<li class="'+clsName+'"><a href="#'+uuid+'" data-toggle="tab">'+item.name+'</a></li>';
            		bodyStr += '<div class="tab-pane '+clsName+'" style="padding: 0;" id="'+uuid+'"></div>';
            	} else {
            		headerStr += '<li class="'+clsName+'"><a href="#'+uuid+'" data-toggle="tab" contenteditable="true">'+item.name+'</a></li>';
            		bodyStr += '<div class="tab-pane '+clsName+'" style="height: 100%;" id="'+uuid+'"></div>';
            	}
            });
            if (this.env !== 'edit') {
            	headerStr += '</ul>';
                bodyStr += '</div>';
                this.$el.innerHTML = headerStr + bodyStr;
            } else{
            	headerStr += '<li class="plusLi"><a class="plus" href="javascript:void 0"><i class="fa fa-plus"></i></a></li></ul>';
                bodyStr += '</div>';
                this.$el.innerHTML = headerStr + bodyStr;
            	this.psEvent();
            }
        },
        psEvent: function(){
            var that = this;
            this.$el.addEventListener('click', function(e) {
                if (e.target.className.indexOf('plus') != -1) {
                    that.addTab('新增tab页');
                }
                if (e.target.className.indexOf('fa-close') != -1) {
                    var index =  $(e.target).parent().index();
                    that.removeTab(index);
                }
                if (e.target.getAttribute("data-toggle") == 'tab') {
                	 var index =  $(e.target).parent().index();
                	 that.activeIndex = index;
                }
            }, false);

            this.$el.addEventListener('input', function(e) {
                if (e.target.getAttribute('data-toggle') == 'tab') {
                    var index = $(e.target).parent().index();
                    that.tabs[index].name = e.target.innerText;
                }
            }, false);
        },
        _render: function (com, position, el, coll) {
            var container = null;
            var activeTab = this.$el.querySelectorAll("." + this.container)[this.activeIndex];
            console.log(this.key)
            //debugger;
            switch (com) {
                case 'row':
                	var Row = require('row');
                    container = new Row({rendering: position, env: this.env, key: this.key});
                    break;
                case 'panel':
                	var Panel = require("panel");
                    container = new Panel({rendering: position, env: this.env, key: this.key});
                    break;
                case 'tab':
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
                	activeTab.insertBefore(container.$el, el);
                    // update node
                    this._updateNode(coll, container.$el);
                    break;
                case 'top':
                	activeTab.insertBefore(container.$el, el);
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

            this.identifyType.includes(com) && this.add.call(this, container);
            console.log(this)
        },

        addTab: function (tabName) {
            this.tabs.push({
                name: tabName,
                children: []
            });
            var uuid = util.genearteUUid();
            var oli = document.createElement('li');
            oli.className = "active tabs-add";
            oli.innerHTML = '<a href="#'+uuid+'" data-toggle="tab" contenteditable="true">'+tabName+'</a><i class="fa fa-close"></i>';
            var licoll = this.$el.querySelectorAll('li:not(.plusLi)');
            var divcoll = this.$el.querySelectorAll('.tab-pane');
            Array.prototype.forEach.call(licoll, function(item, index){
                if (index == 0) {
                    item.className = '';
                } else {
                    item.className = 'tabs-add';
                }
            });
            Array.prototype.forEach.call(divcoll, function(item){
                item.className = 'tab-pane';
            });
            this.activeIndex = divcoll.length;
            this.$el.querySelector(".plusLi").before(oli);
            var oDiv = document.createElement("div");
            oDiv.className = 'tab-pane active';
            oDiv.setAttribute("id", uuid);
            oDiv.setAttribute("style", "height: 100%;")
            this.$el.querySelector(".tab-content").appendChild(oDiv);
        },
        removeTab: function (index) {
            this.tabs.splice(index, 1);
            var licoll = this.$el.querySelectorAll('li:not(.plusLi)');
            var divcoll = this.$el.querySelectorAll('.tab-pane');
            
            Array.prototype.some.call(licoll, function (item, i) {
               if (index == i) {
                   if (item.className.indexOf('active') != -1) {
                       licoll[0].className = 'active';
                   }
                   item.remove();
                   return true;
               }
            });

            Array.prototype.some.call(divcoll, function (item, i) {
                if (index == i) {
                    if (item.className.indexOf('active') != -1) {
                        divcoll[0].className = 'tab-pane active';
                    }
                    item.remove();
                    return true;
                }
            });

        },
        modifyTabName: function (index, tabName) {
           this.tabs[index].name = tabName;
           this.$el.querySelectorAll('[data-toggle="tab"]')[index].innerText = tabName;
        }
    };

    util.inherits(Tab, Container);
   
    return Tab;
});