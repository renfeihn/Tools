define([ "jquery" ], function() {
	var globalEcharts = {};
	var refreshClock;
	var showeventObj = {};
	return {
		load : function($el, scope, handler,options) {
			//取出全局变量
			scope.midData = {
					Cluster_ID: app.domain.get('appAll', 'Cluster_ID'),
					objId: app.domain.get('appAll', 'objId'),
					appId: app.domain.get('appAll', 'appId'),
					serverId: app.domain.get('appAll', 'serverId'),
					healty_value: app.domain.get('appAll', 'healty_value'),
					warn_nohandle_num: app.domain.get('appAll', 'warn_nohandle_num'),//告警未处理事件数
					warn_handle_num: app.domain.get('appAll', 'warn_handle_num'),//告警已处理事件数
					pre_nohandle_num: app.domain.get('appAll', 'pre_nohandle_num'),//预警未处理事件数
					pre_handle_num: app.domain.get('appAll', 'pre_handle_num'),//预警已处理事件数
					day_handle_num: app.domain.get('appAll', 'day_handle_num'),//当天已处理事件总数 
					nohandle_num: app.domain.get('appAll', 'nohandle_num'),//总未处理事件数
					Version: app.domain.get('appAll', 'Version')//版本号
				}
				app.domain.clearScope('appAll');
			
			var context = this;
			$("#eventTab a", $el).click(function(e) {
				e.preventDefault();
				$(this).tab("show");
				$(this).parent().siblings().removeClass("underLine");
				$(this).parent().siblings().css("color", "#999");
				$(this).parent().addClass("underLine");
				$(this).parent().css("color", "#666");
				var href = $(this).attr('href').replace('#', '');
				showTab(href + '.jsp', href + '.js');
			});
			
			
			function showTab(htmlUrl, jsUrl) {
				var tabRootDir = "./module/basicMonitor/database/es/";
				$.ajax({
					url: tabRootDir + htmlUrl,
					contentType: "application/x-www-form-urlencoded;charset=utf-8;",
					type: "POST",
					async: false,
					dataType: "html",
					success: function(data) {
						$("#escluster-module-content", $el).empty();
						$("#escluster-module-content", $el).append(data);
						require([tabRootDir + jsUrl], function(obj) {
							showeventObj = obj;
							obj.load($('#escluster-module-content'), scope, handler, context);
						});
					}
				});
			}
			
			$("#eventTab li:first-child>a", $el).click();
			
			
		},
		unload : function(handler) {
			
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});