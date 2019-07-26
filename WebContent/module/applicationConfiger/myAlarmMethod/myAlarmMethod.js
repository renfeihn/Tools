define(["jquery"],function(){
	var cache={};
	return {
		
		load:function($el,scope,handler){
			$('section li', $el).on('click', function() {
				var $this = $(this);
				if (!$this.hasClass('active')) {
					var path = $this.attr('skip-address');
					if (!path) {
						return;
					}
					
					cache[path + scope.sysId] = $this;
					
					var $oldActive = $this.siblings('.active');
					if($oldActive.length > 0){
						$oldActive.removeClass('active');
						app.dispatcher2.pause();
					}
					
					var args = path.split('#');
					app.dispatcher2.load({
						"title" : "",
						"moduleId" : args[0],
						"section" : args.slice(1),
						"frameRenderTo" : '#truthAlarmStrategy-box',
						"id" : path + scope.sysId,
						"params" : { // 给标签传递参数
							"sysId" : scope.sysId,
							"sysName": scope.sysName,
							"ip": scope.ip,
							"inst_name": scope.inst_name,
							'inst_status':scope.inst_status
						},
						"context" : $el
					});
					
					$this.addClass('active');
				}
			});
			$('li:first', $el).trigger('click');
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
			var id = $('section li.active' ,$el).attr('skip-address');
			app.dispatcher2.resume(id + scope.sysId);
		}
		
	}
});