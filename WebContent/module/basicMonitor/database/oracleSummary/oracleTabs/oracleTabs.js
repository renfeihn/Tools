define(["jquery"],function(){
	// 公共变量，用于保存生成的handler的cacheId
	var cache = []; 

	return {
		
		load:function($el,scope,handler){
			
			$('#tabApp', $el).on('click', 'li', function() {
				var $this = $(this);
				if (!$this.hasClass('active')) {
					var path = $this.attr('data-address');
					if (!path) {
						return;
					}
					
					cache.push(path + scope.logicalId);
					
					var $oldActive = $this.siblings('.active');
					if($oldActive.length > 0){
						$oldActive.removeClass('active');
						app.dispatcher2.pause();
					}
					
					var args = path.split('#'),
						title = $("#tabApp li.active a", $el).text();
					
					app.dispatcher2.load({
						"title" : title + scope.logicalId,
						"moduleId" : args[0],
						"section" : args.slice(1),
						"frameRenderTo" : '#view',
						"id" : path + scope.logicalId,
						"params" : scope,
						"context" : $el
					});
					
					$this.addClass('active');
					
				}
			});
			
			$('li:first', $el).trigger('click');
		},
		
		unload:function(handler){
			cache.forEach(function(e){
				e && app.dispatcher2.unload(e);
			});
			cache = [];
		},
		
		pause:function($el,scope,handler){
			app.dispatcher2.pause();
		},
		
		resume:function($el,scope,handler){
			app.dispatcher2.resume($('section li.active' ,$el).attr('data-address') + scope.logicalId);
		}
		
	}
});