define(["jquery"],function(){
	
	return {
		
		load:function($el,scope,handler){

			loadInfo();
			loadUrl();

			async function loadUrl(){
				var url = 'SysVariableAction_getSysVariableByCon.do';
				var whereEx = JSON.stringify({
					category: 'baseMonitor',
					name: 'es'
				});
				var ret = await ajaxWithAfa(url, {whereEx});
				console.log(ret);
				try {
					var src = ret.result[0].val;
					createIframe(src);
				} catch (e) {
				}
			}

			
			function createIframe (src) {
				var iframe;
				try{  
					iframe = document.createElement('<iframe name="ifr"></iframe>');  
				} catch(e) { 
				    iframe = document.createElement('iframe');  
				    iframe.name = 'ifr';  
				}
				iframe.src = src;
				$("#iframeContainer", $el).append(iframe);
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

			function loadInfo() {
				app.dispatcher.load({
					title: 'ES监控',
					moduleId: "basicMonitor",
					section: "AFASumInstance",
					id: "AFASumInstanceES",
					frameRenderTo: '.es-dispather-container',
					params: {
						category: 'elasticsearch'
					}
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
