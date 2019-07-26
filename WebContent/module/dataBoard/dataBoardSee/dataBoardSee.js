define(['stage','util','EventMiddle', 'tool'],function(Stage, util, EventMiddle, Tool){
	var cache = {};
	
	function keydown (e) {
		if (e.keyCode === 27) {
			app.tab.close('dataBoard-dataBoardSeeContainer1');
		}
	}
	
	return {
		load:function($el,scope,handler){
			
			
			var stage = new Stage({
				container: $("#dataBoard", $el)[0],
				$el,
				edit: false
			})
			
			$(document.body).on('keydown', keydown);
			
			/*
			 * 工具部分 结束
			 * */
			
			var id = scope.dashboardId;
			var name = scope.name;
			$("#name", $el).val(name);
			setTimeout(function () {
				findPanel(id);
			}, 500)
			
			async function findPanel(panelId) {
				var url = 'PanelChartAction_getAllByWhereEx.do';
				var whereEx = JSON.stringify({
					panelId
				});
				var ret = await ajaxWithAfa(url, {whereEx});
				var lists = ret.result;
				lists.forEach(opts => {
					stage.addItem(JSON.parse(opts.config));
				})
			}
			
			function ajaxWithAfa(url, data){
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: url,
						data: data
					}).done(function(content) {
						resolve(content);
					})
				});
			}
			
		},
		
		unload:function(handler){
			$(document.body).off('keydown',keydown);
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});