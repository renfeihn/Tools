define([], function() {
	
	
	return {
		load: function($el, scope, handler) {
			
			function getCfgLogInfo(){
				app.tab.openNewWindow({
					title: '',
					moduleId: 'addLogPrivate2',
					section: "",
					id: 'addLogPrivate2',
					frameRenderTo: $('#addLogPrivate', $el),
					params: {
						scope
					}
				});
			}
			getCfgLogInfo();
		},
		unload: function(handler) {
			console.log('unload')
			app.tab.closeNewWindow()
		},
		pause: function($el, attr, handler) {},
		resume: function($el, attr, handler) {}
	};
});
