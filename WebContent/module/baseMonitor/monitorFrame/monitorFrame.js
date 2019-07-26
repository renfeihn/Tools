define(["jquery"],function(){
	
	return {
		
		load:function($el,scope,handler){
			$('.monitor-frame>p',$el).text(scope.type + '监控');
			$('#monitor_frmae',$el).attr('src',scope.src);
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){

		}
		
	}
});
