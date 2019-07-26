define(["jquery"],function(){
	
	return {
		
		load:function($el,scope,handler){
			
			loadUrl();
			async function loadUrl(){
				var url = 'SysVariableAction_getSysVariableByCon.do';
				var whereEx = JSON.stringify({
					category: 'baseMonitor',
					name: 'storm'
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
			
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){

		}
		
	}
});
