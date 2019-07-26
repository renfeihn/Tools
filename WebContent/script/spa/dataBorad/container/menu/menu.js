define([], function(){
    function Menu(opts) {
        this.wrap = "body";
        this.stageType = opts.stageType;
        this._init();
        this.identifyType = ['row', 'panel', 'tab'];
        this.hasShow = false;
    }

    Menu.prototype = {
        _init: function(){
          this._generatorHtml();
        },
        _generatorHtml: function(){
            this.$el = document.createElement('div');
            this.$el.className = "contextMenu hide";
            this.$el.innerHTML = `
            	<ul>
            		<li class="item" type="remove">删除</li>
            		<li class="item" type="remove">拆分单元格</li>
            		<li class="item" type="compare">合并单元格</li>
            	</ul>`;
            document.body.appendChild(this.$el);
            this._addEvent();
        },
        show: function(position){
            this.hasShow = true;
            this.$el.style.cssText = "left:"+position.x+"px; top: "+position.y+"px";
            this.$el.className = "contextMenu";
        },
        hide: function(){
            this.hasShow = false;
            this.$el.className = "contextMenu hide";
        },
        _addEvent: function(){
           var that = this;
           var currentStage = components.stageCollect.getStage(this.stageType);
           this.$el.addEventListener("click", function(e){
               if (e.target.className.indexOf("item") != -1) {
                   var type = e.target.getAttribute("type");
                   switch (type) {
                       case 'remove':
                           if (!that.identifyType.includes(components.contextMenu.type)) {
                        	   currentStage && currentStage.destory(components.contextMenu.uuid);
                           }
                           components.contextMenu.destory();
                           break;
                   }
                   that.hide();
               }

           }, false);

           document.addEventListener("click", function(e){
               that.hide();
           }, false)
        }
    }

    return Menu;
});