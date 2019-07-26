define(["jquery","underscore","handlebars"],function($,_,Handlebars){
	var pageId,
	loadPage,
	$$el;
	return {
		
		load:function($el,scope,handler){
			$('#dispacterUl', $el).on('click', 'li', function(event) {
				event.preventDefault();
				if($(this).hasClass('active')){
					return;
				}
				var href = $(this).find('a').attr('data-href');
				loadPage(href);
			});

			loadPage = function(href) {
				pageId && app.dispatcher2.unload(pageId);
				if(href){
					pageId = "categoryManager"+app.global.getUniqueId();
					var section = href.split('#');
			    	app.dispatcher2.load({
						"title" : "",
						"moduleId" : section.shift(),
						"section" : section,
						"frameRenderTo" : '#content',
						"id" : pageId,
						"params" : {
						},
						context: $el
					});
				}
			}

			$('#dispacterUl li:eq(0)', $el).trigger('click').addClass('active');
		},
		
		unload:function(handler){
			pageId && app.dispatcher2.unload(pageId);
		},
		
		pause:function($el,scope,handler){
			app.dispatcher2.pause();
		},
		
		resume:function($el,scope,handler){
			loadPage($('#dispacterUl li.active', $el).find('a').attr('data-href'));
		}
		
	}
});
