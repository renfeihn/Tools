define([ "jquery" ], function() {
	var cache={};
	var cacheArr = {};
	return {
		load : function($el, scope, handler) {
			
			$('#ul_nav',$el).on('click','>li',function(){
				var $this = $(this);
				var $index = $(this).index();
				var path = $this.attr('data-skip');
				var frame = $this.find('a').attr('href');
				if (!path) {
					return;
				}
                app.dispatcher2.pause();// 暂停
                if(!cache[path]){
                    cache[path] = $this;
                    var args = path.split('#');
                    var $this = $(this);
                    cacheArr[$index] = app.dispatcher2.load({
                        "moduleId" : args[0],
                        "section" : args.slice(1),
                        "frameRenderTo" : frame,
                        "id" : path,
                        "params" : { 
                            params: scope
                         },
                        "context" : $el
                    });
                }else{
                    app.dispatcher2.resume(path);
                }
                            
				$this.addClass('active').siblings().removeClass('active');
				$('.appchain-page>.tab-content>div:eq('+$index+')',$el).addClass('active').siblings().removeClass('active');
			});
			$('#ul_nav>li:eq(0)',$el).trigger('click');

		},
		unload : function(handler) {
			for(var cacheId in cache){
				app.dispatcher2.unload(cacheId);
			}
		},
		pause : function($el, attr, handler) {
			app.dispatcher2.pause();
		},
		resume : function($el, attr, handler) {
			var id = $('#ul_nav>li.active' ,$el).attr('data-skip');
			app.dispatcher2.resume(id);
		}
	};
});
