define(["jquery"], function($) {
	var $el_id;
	return {
		load : function($el, scope, handler) {

			$el_id = $el[0].id;

			var isOpen = {};

			$('[data-toggle="tab"]', $el).on('shown', function(event){
				var index = $(event.target).parent().index();
				if(!(index in isOpen)){
					isOpen[index] = true;
					openNewWindow({
						title: $(event.target).text(),
						section: event.target.dataset.section.split('#'),
						frameRenderTo: $('.tab-content', $el).children().eq(index),
					})
				}
			});

			function openNewWindow(option){
				app.tab.openNewWindow({
					title: option.title,
					moduleId: 'AppPerforMonit',
					section: option.section,
					id: app.global.getUniqueId(),//唯一的id
					frameRenderTo: option.frameRenderTo,
					lastTabID: $el_id
				});
			}

			$('[href="#tabs1"]', $el).trigger('shown');

			// app.tab.openNewWindow({
			// 	title:'应用仪表盘',
			// 	moduleId: 'AppPerforMonit',
			// 	section: ['AppPerforTabs','AppPerforTab2'],
			// 	id: 'AppPerforTab2' + app.global.getUniqueId(),//唯一的id
			// 	frameRenderTo: $("#tabs2", $el)
			// });

			// app.tab.openNewWindow({
			// 	title:'应用交易分析',
			// 	moduleId: 'AppPerforMonit',
			// 	section: ['AppPerforTabs','AppPerforTab3'],
			// 	id: 'AppPerforTab3' + app.global.getUniqueId(),//唯一的id
			// 	frameRenderTo: $("#tabs3", $el)
			// });
		},
		unload : function(handler) {
			// 关闭引用页面，可以关闭定时器等
			// app.tab.closeNewWindow($el_id);
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});