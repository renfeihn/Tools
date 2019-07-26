/*
 *  所有容器组件的父容器
 */
define(['util','defaultBox'], function(util,defaultBox){
	var key = util.genearteUUid();	
    function Container(opts) {
        this.canAccept = null; // can accept which type components please override this attribute when extend this component
        this.$el = null;       //

        this.type = 'Container';
        this.children = [];
        this.uuid = util.genearteUUid();
        
        this.key = opts.key;	// 场景集成器中唯一标识
        this.opts = opts || {};
        this.attr = this.opts.attr || {};
        this.style = this.opts.style || {};
        
        this.env = opts.env;

        this.container = null;
        this.highLight = false;

        this.identifyType = ['row', 'panel', 'tab'];

        this.recordX = null;
        this.recordY = null;

        this._comSelected = false;
    }

    Container.prototype = {
        _init: function () {
          this._generatorHtml();
          this._addEvent();
        },
        _generatorHtml: function(){
            // need override
        },
        _addEvent: function() {
        	if (this.env !== 'edit') return 
            this.$el.addEventListener('contextmenu', this._contextMenu.bind(this), false);
            //this.$el.addEventListener('click', this._Click.bind(this), false);
            this.$el.addEventListener('mousedown', this._selected.bind(this), false);
            this.$el.addEventListener('dragenter', this._dragEnter.bind(this), false);
            this.$el.addEventListener('dragover', this._dragOver.bind(this), false);
            this.$el.addEventListener('dragleave', this._dragLeave.bind(this), false);
            this.$el.addEventListener('drop', this._drop.bind(this), false);
        },
        _contextMenu: function (e) {
            e.stopPropagation();
            e.preventDefault();
            if(this.type === "Stage") {
                return;
            }
            var position = {x: e.pageX, y: e.pageY};
            components.menu.show(position);
            components.contextMenu = this;
        },
        _selected: function (e) {
        	e.stopPropagation();
            var that = this;
            this._comSelected = !this._comSelected;
            if (components.select) {
                components.select._comSelected = false;
            }
            window.postMessage({selectComponent: that._comSelected}, '*');
            components.select = that;
        },
        _dragEnter: function (e) {
           e.stopPropagation();
           e.preventDefault();

           var ele = this.$el.querySelector(this.container) || this.$el;
           ele.classList.add('highLight');
        },
        _dragLeave: function (e) {
           e.stopPropagation();
           e.preventDefault();

           var ele = this.$el.querySelector(this.container) || this.$el;
           ele.classList.remove('highLight');
        },
        _dragOver: function (e) {
           e.stopPropagation();

           e.preventDefault();

           // var x = e.pageX, y = e.pageY;
           //
           // if (this.recordX == x && y == this.recordY) return;
           //
           // this.recordX = x;
           // this.recordY = y;




        },
        _drop: function(e) {

           e.stopPropagation();

           var ele = this.$el.querySelector(this.container) || this.$el;

           ele.classList.remove('highLight');

           var com = e.dataTransfer.getData('components');
           
           var info = null;
           var coll = [];
           
           if (this.type == 'tab') {
        	   info = this._insertTabPosition(e);
        	   info.el = this._findTabInsertNode(info);
        	   coll = this.findTabNeedUpdate(info);
           } else {
        	   info = this._insertPosition(e);

               info.el =  this._findInsertNode(info);

               coll = this.findNeedUpdate(info);
           }
           
          

           //debugger;

           this._render(com, info.position, info.el, coll);

        },
        _insertTabPosition: function(e){
        	// 获得activeTab
            if (!this.tabs[this.activeIndex].children.length){
            	return {position: 'normal', el: this.$el.querySelectorAll('.' + this.container)[this.activeIndex]};
            }
            
            var x = e.pageX, y = e.pageY;
            
            var hasSortChildren = this.tabs[this.activeIndex].children.sort(function(a, b){
                var abox = a.$el.getBoundingClientRect();
                var bbox = b.$el.getBoundingClientRect();
                if (abox.top != bbox.top) {
                    return abox.top - bbox.top;
                }

                return abox.x - bbox.x;
            });
            
            var len = hasSortChildren.length;

            for (var i = 0; i < len; i++) {
                var bbox = hasSortChildren[i].$el.getBoundingClientRect();
                var left = bbox.left, top = bbox.top, right = bbox.right, bottom = bbox.bottom;

                if (y < top) {
                    return {position: 'top', el: hasSortChildren[i].$el};
                }

                if (x < left && y < bottom) {
                    return {position: 'left', el: hasSortChildren[i].$el};
                }

                if (x > right && y < bottom) {
                	var index = i;
                	for(var j = i; j < len; j++) {
                		var nextBbox = hasSortChildren[i].$el.getBoundingClientRect();
                		var nextRight = nextBbox.right, nextBottom = nextBbox.bottom;
                		if (x > nextRight && y < nextBottom) {
                			index = j;
                		}
                	}
                    return {position: 'right', el: hasSortChildren[index].$el};
                }
            }

            return {position: 'bottom', el: hasSortChildren[len - 1].$el};
        	
        },
        _findTabInsertNode: function(info){
        	 if (info.position == 'left' || info.position == 'right' || info.position == 'normal') {
                 return info.el;
             }
        	 var tabChildren = this.tabs[this.activeIndex].children;
             var node = this.tabs[this.activeIndex].children[0].$el;
             var reference = node.getBoundingClientRect().left;
             var el_top = info.el.getBoundingClientRect().top;
             for (var i = 1; i < tabChildren.length; i++) {
                  var bbox = tabChildren[i].$el.getBoundingClientRect();
                  var top = bbox.top, left = bbox.left;
                  if (el_top == top) {
                       if (info.position == 'top') {
                           if (left < reference) {
                               reference = left;
                               node = tabChildren[i].$el;
                           }
                       } else {
                           if (left > reference) {
                               reference = left;
                               node = tabChildren[i].$el;
                           }
                       }
                  }
             }

             return node;
        },
        _insertPosition: function(e){
            //debugger;
            if (!this.children.length) {
                return {position: 'normal', el: this.$el};
            }

            var x = e.pageX, y = e.pageY;

            var hasSortChildren = this.children.sort(function(a, b){
                var abox = a.$el.getBoundingClientRect();
                var bbox = b.$el.getBoundingClientRect();
                if (abox.top != bbox.top) {
                    return abox.top - bbox.top;
                }

                return abox.x - bbox.x;
            });

            var len = hasSortChildren.length;
            
            for (var i = 0; i < len; i++) {
                var bbox = hasSortChildren[i].$el.getBoundingClientRect();
                var left = bbox.left, top = bbox.top, right = bbox.right, bottom = bbox.bottom;

                if (y < top) {
                    return {position: 'top', el: hasSortChildren[i].$el};
                }

                if (x < left && y < bottom) {
                    return {position: 'left', el: hasSortChildren[i].$el};
                }

                if (x > right && y < bottom) {
                	var index = i;
                	for(var j = i; j < len; j++) {
                		var nextBbox = hasSortChildren[i].$el.getBoundingClientRect();
                		var nextRight = nextBbox.right, nextBottom = nextBbox.bottom;
                		if (x > nextRight && y < nextBottom) {
                			index = j;
                			break;
                		}
                	}
                    return {position: 'right', el: hasSortChildren[index].$el};
                }
            }
            return {position: 'bottom', el: hasSortChildren[len - 1].$el};

        },
        findTabNeedUpdate: function(info){
        	 if (info.position == 'top' || info.position == 'bottom' || info.position == 'normal') {
                 return null;
             }
             var coll = [];
             var el = info.el;
             var el_bbox = el.getBoundingClientRect();
             var el_top = el_bbox.top;
             var tabChildren = this.tabs[this.activeIndex].children;

             for (var i = 0; i < tabChildren.length; i++) {
                 var bbox = tabChildren[i].$el.getBoundingClientRect();
                 var top = bbox.top;

                 if (el_top == top) {
                      coll.push(tabChildren[i].$el);
                 }
             }

             return coll;
        },
        findNeedUpdate: function(info) {
           if (info.position == 'top' || info.position == 'bottom' || info.position == 'normal') {
               return null;
           }
           var coll = [];
           var el = info.el;
           var el_bbox = el.getBoundingClientRect();
           var el_top = el_bbox.top;

           for (var i = 0; i < this.children.length; i++) {
               var bbox = this.children[i].$el.getBoundingClientRect();
               var top = bbox.top;

               if (el_top == top) {
                    coll.push(this.children[i].$el);
               }
           }

           return coll;

        },
        _findInsertNode: function(info){
          if (info.position == 'left' || info.position == 'right' || info.position == 'normal') {
              return info.el;
          }
          var node = this.children[0].$el;
          var reference = this.children[0].$el.getBoundingClientRect().left;
          var el_top = info.el.getBoundingClientRect().top;
          for (var i = 1; i < this.children.length; i++) {
               var bbox = this.children[i].$el.getBoundingClientRect();
               var top = bbox.top, left = bbox.left;
               if (el_top == top) {
                    if (info.position == 'top') {
                        if (left < reference) {
                            reference = left;
                            node = this.children[i].$el;
                        }
                    } else {
//                        if (left > reference) {
//                            reference = left;
//                            node = this.children[i].$el;
//                        }
                    	reference = left;
                    	node = this.children[i].$el;
                    }
               }
          }

          return node;
        },
        _updateNode: function(coll, el) {
            var len = coll.length + 1;

           // var count = coll.length * 2;

            var pect = 100 / len;

            for (var i = 0; i < coll.length; i++) {
                coll[i].style.margin = '8px';
                coll[i].style.width = 'calc('+pect+'% - 16px)';
            }

            el.style.margin = '8px';
            el.style.width = 'calc('+pect+'% - 16px)';
            el.style.height = coll[0].style.height;
            // var pect = 100 / len;

            // for (var i = 0; i < coll.length; i++){
            //     coll[i].style.width = pect + '%';
            // }
            // el.style.width = pect + '%';
            // el.style.height = coll[0].style.height;
        },
        _updateRowNode: function(el){
        	var node = this.children;
        	if (this.type == "tab") {
        		node = this.tabs[this.activeIndex].children;
        	}
            // clustering
            var count = 1;
            var cate = {};
            for (var i = 0; i < node.length; i++) {
                if (el === node[i].$el){
                    count = 0;
                }
                var bbox = node[i].$el.getBoundingClientRect();
                var top = bbox.top;
                cate[top] = true;
            }
            var len = Object.keys(cate).length + count;
            var pect = 100 / len;
            for (var j = 0; j < node.length ; j++) {
            	node[j].$el.style.height ='calc('+pect+'% - 16px)';
            	node[j].$el.style.margin = '8px';
            }
            el.style.height = 'calc('+pect+'% - 16px)';
            el.style.margin = '8px';
        },
        _dropInChildren: function(e) {
           // var currentChildren = this.children;
            var currentChildren = components.statusManager.selectedContainer.children;
            var currentPosition = {x: e.pageX, y: e.pageY};
            var position = null;
            var el = null;
            for (var i = 0; i < currentChildren.length; i++) {
               var node = currentChildren[i].$el.getBoundingClientRect();
               var left = node.left, right = node.right, top = node.top, bottom = node.bottom;
               // fixed
                if (currentPosition.x > left && currentPosition.x < right && currentPosition.y > top && currentPosition.y < bottom) {
                    position = this._dropInContainer(e, currentChildren[i].$el);
                    el = currentChildren[i].$el;
                    break;
                }
            }

            return {position: position, el: el};
        },
        _dropInContainer: function(e, el) {
            var position = null;
            var bbox = el.getBoundingClientRect();
            var left = bbox.left, right = bbox.right, top = bbox.top, bottom = bbox.bottom;
            var width = el.offsetWidth, height = el.offsetHeight;
            var x = e.pageX, y = e.pageY;
            var ol = x - left < (width >> 1), ot = y - top < (height >> 1);
            var pl = 0, hl = 0;
            if (ol && ot) {
                // left top
                // calc pect
                pl = (x - left) / width;
                hl = (y - top) / height;
                position = pl - hl > 0 ? 'top' : 'left';
            } else if (ol && !ot) {
                // left bottom
                pl = (x - left) / width;
                hl = (bottom - y) / height;
                position = pl - hl > 0 ?  'bottom': 'left';
            } else if (!ol && ot) {
                // right top
                pl = (right - x) / width;
                hl = (y - top) / height;
                position = pl - hl > 0 ? 'top' : 'right';
            } else {
                // right bottom
                pl = (right - x) / width;
                hl = (bottom - y) / height;
                position = pl - hl > 0 ? 'bottom' : 'right';
            }

            return position;
        },
        createEmpty: function (rendering, flag) {
            let node = new defaultBox({parent: this, stageType: this.key});
            if (!flag) {
                this.notify(node.dom);
            }
            return {$el: node.dom};
        },
        notify: function(node, container, children, tag) {
            container = container ? container : this;
            let key = this.key;
            let stage = components.stageCollect.getStage(key);
            if (stage.scene) {
            	stage.scene.shareContainer({
                    el: node,
                    container: container,
                    children: children,
                    key: key,
                    tag: tag
                });
            }
        },
        _Click: function(e) {
            e.preventDefault();
            if (components.menu.hasShow) {
                return;
            }
            if(this.type == 'Stage' || e.target.className.indexOf(this.container) != -1){
                e.stopPropagation();
                this.dblEl = e.target;
                if (this.type == 'Stage') {
                    this.dblEl = this.$el;
                }
                this.highLight ? this.deChoose(this.dblEl) : this.choose(this.dblEl);
                this.highLight = !this.highLight;
            }
        },
        choose: function (target) {
            if (components.statusManager._hasSelected) {
                util.removeClass(components.statusManager.selectedContainer.dblEl, "highLight");
                components.statusManager.selectedContainer.highLight = false;
            }
            components.statusManager.setContainerStatus(this, true);
            util.addClass(target, "highLight");
        },
        deChoose: function (target) {
            components.statusManager.setContainerStatus(null, false);
            util.removeClass(target, "highLight");
        },
        getStyle: function () {
            return this.style;
        },
        getAttr: function () {
            return this.attr;
        },
        add: function (item, tag) {
            // if (item.type !== this.canAccept) {
            //     throw new Error({msg: '当前容器无法防止该类型'});
            // }
        	if (!tag) {
        		if (!item.uuid) {
                    item.uuid = util.genearteUUid();
                }
                if (this.type !== 'Stage') {
                    item.hasParent = true;
                    item.parentType = this.type;
                }
                if (this.type == 'tab') {
                	this.tabs[this.activeIndex].children.push(item);
                } else{
                	this.children.push(item);
                }
        	}
            let currentStage = components.stageCollect.getStage(this.key);
            this.resizeChildren(currentStage.children);
        },
        remove: function (uuid) {
        	let currentStage = components.stageCollect.getStage(this.key);
            var list = currentStage.children;
            var index = 0;
            this.findNodeAndRemove(uuid, list, index);
            if (!list.length) {
            	currentStage._showEmpty();
            }
            this.resizeChildren(list);
        },
        resizeChildren: function(compo) {
            //var compo = components.stage.children;
            for (var i = 0; i < compo.length; i++) {
                if (!this.identifyType.includes(compo[i].type)){
                   compo[i].resize && compo[i].resize();
                } else {
                	if (compo[i].type  === "tab") {
                		for(var j = 0 ; j < compo[i].tabs.length; j ++ ) {
                			compo[i].tabs[j].children.length && this.resizeChildren(compo[i].tabs[j].children);
                		}
                	} else {
                		compo[i].children.length && this.resizeChildren(compo[i].children);
                	}
                }
            }
        },
        findNodeAndRemove: function(uuid, nodeList, index){
            index++;
           // console.log(nodeList,'******', uuid);
            for(var i = 0; i < nodeList.length; i++){
                if (nodeList[i].uuid == uuid) {
                    var top = nodeList[i].$el.getBoundingClientRect().top;
                    this.finishingNode([].concat(nodeList), i, top, index);
                    var node = nodeList.splice(i, 1)[0];
                    if (this.identifyType.includes(node.type)) {
                        node.clear();
                        node.$el.remove();
                    }
                    break;
                } else {
                	if (nodeList[i].type == 'tab') {
                		for (var j = 0; j < nodeList[i].tabs.length; j++) {
                			this.findNodeAndRemove(uuid, nodeList[i].tabs[j].children, index);
                		}
                	} else{
                		 nodeList[i].children && this.findNodeAndRemove(uuid, nodeList[i].children, index);
                	}
                   
                }
            }
        },
        finishingNode: function(arr, index, r_top, iflg) {
           var needUpdateNode = [];
           var cate = {};
           for (var i = 0; i < arr.length; i++) {
              if (i == index) {
                  continue;
              }
              var top = arr[i].$el.getBoundingClientRect().top;
              cate[top] = true;
              if (top == r_top) {
                  needUpdateNode.push(arr[i].$el);
              }
           }
           var len = needUpdateNode.length;
           var pect = 100 / len;

           needUpdateNode.forEach(function(item) {
               item.style.width = 'calc('+pect+'% - 16px)';
           });

           if (iflg >=2) {
               var r_len= Object.keys(cate).length;
               var r_pect = 100 / r_len;
               arr.forEach(function(item) {
                   item.$el.style.height = 'calc('+r_pect+'% - 16px)';;
               });
           }

        },
        clear: function () {
            this.children.length = 0;
            if (this.type === "Stage") {
                this._showEmpty();
            }
        },
        destory: function (uuid) {
            uuid = uuid ? uuid : this.uuid;

            this.remove(uuid);

        }
    }

    return Container;
});