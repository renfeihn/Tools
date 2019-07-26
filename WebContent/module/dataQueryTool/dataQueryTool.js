define([],function(){
	var cache={};
	var cacheArr = {};
	return {
		load:function($el,scope,handler){
			$('#page_ul>li',$el).on('click',function(){
				var $this = $(this);
				var $index = $(this).index();
				var path = $this.attr('data-skip');
				if (!path) {
					return;
				}
				if(!cache[path]){
					cache[path] = $this;
				}
				
				var args = path.split('#');
				var $this = $(this);
				cacheArr[$index] = app.dispatcher2.load({
					"moduleId" : args[0],
					"section" : args.slice(1),
					"frameRenderTo" : '#sqlToolContent',
					"id" : path,
					"params" : { // 给标签传递参数
					 },
					"context" : $el
				});
				
				$this.addClass('active').siblings().removeClass('active');
			});
			$('#page_ul>li:eq(0)',$el).trigger('click');
		},
		
		unload:function(handler){
			for(var cacheId in cache){
				app.dispatcher2.unload(cacheId);
			}
		},
		
		pause:function($el,scope,handler){
			app.dispatcher2.pause();
		},
		
		resume:function($el,scope,handler){
			var id = $('#page_ul>li.active' ,$el).attr('data-skip');
			app.dispatcher2.resume(id);
		}
		
	}
});