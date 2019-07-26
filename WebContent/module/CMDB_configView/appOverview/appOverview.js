define([],function(){
	var cache = {};
	return {
		load:function($el,scope,handler){
			let appId = scope.appId;
			
			
			$('#manage_page>ul>li',$el).on('click',function(){
				let index = $(this).index();
				$('#manage_page>.tab-content>div:eq('+index+')').addClass('active').siblings().removeClass('active');
				index == 0 ? loadSourcePage() : loadAgentPage();
			});
			
			loadSourcePage();
			function loadSourcePage() {
				if (cache['sourcePage']) {
					app.dispatcher2.unload('sourcePage')
				}
				$('.datasource-st',$el).removeClass('hide').siblings().addClass('hide');
				cache['sourcePage'] = app.dispatcher2.load({
					"moduleId" : "CMDB_configView",
					"section" : "dataSource",
					"frameRenderTo" : '#source_page',
					"id" : "sourcePage",
					 "params" : { // 给标签传递参数
						appId: appId,
						simple: true
					 },
					"context" : $el
				});
			}
			
			function loadAgentPage() {
				if (cache['agentPage']) {
					app.dispatcher2.unload('agentPage')
				}
				$('.agent-st',$el).removeClass('hide').siblings().addClass('hide');
				cache['sourcePage'] = app.dispatcher2.load({
					"moduleId" : "CMDB_configView",
					"section" : "agentManage",
					"frameRenderTo" : '#agent_page',
					"id" : "agentPage",
					 "params" : { // 给标签传递参数
						appId: appId,
						simple: true
					 },
					"context" : $el
				});
			}
			
		},
		
		unload:function(handler){

		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
		
		}
		
	}
});