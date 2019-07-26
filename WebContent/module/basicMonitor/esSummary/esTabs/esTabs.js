define(["jquery"],function(){
	var cache = [];
	return {
		
		load:function($el,scope,handler){		
			$('#tabs2 li', $el).on('click', function() {
				var $this = $(this);
				if (!$this.hasClass('active')) {
					var $pageCtn = $('#tabs2-ctn', $el);//页面容器
					var $lastTab = $('li.active', $('#tabs2', $el));
					if(!$this.attr('ctnid')){						
						var ctnid = $this.attr('data-href').split('#').join('-') + 'Ctn';	                    
	                    app.ctnList[ctnid] = app.ctnList[ctnid] ? app.ctnList[ctnid] + 1 : 1;
	                   
	                    ctnid += app.ctnList[ctnid];
	                    $this.attr('ctnid', ctnid);
	                    cache.push(ctnid);	                    
	                    if($lastTab.length > 0){
	                    	$lastTab.removeClass('active');
	                    	app.dispatcher2.pause();
	                        $pageCtn.children('#' + $lastTab.attr('ctnid')).hide();
	                    }
	                    
	                    $this.addClass('active');						
	                    $pageCtn.append('<div id="' + ctnid + '"></div>');
	                    
	                    var firstName = $("#tabs>li.active").find("a").text();
						var secondName = $this.text();
	                    var args = $this.attr('data-href').split('#');
	                    app.dispatcher2.load({
	                    	"title": firstName + '-' + secondName,
							"moduleId" : args[0],
							"section" : args.slice(1),
							"frameRenderTo" : ctnid,
							"params" : scope,
							"context": $el
						});	                    
					}else{						
						if($lastTab.length > 0){
	                    	$lastTab.removeClass('active');	     
	                    	app.dispatcher2.pause($lastTab.attr('ctnid'));
	                        $pageCtn.children('#' + $lastTab.attr('ctnid')).hide();
	                    }
						$this.addClass('active');
						$pageCtn.children('#' + $this.attr('ctnid')).show();
						app.dispatcher2.resume($this.attr('ctnid'));
					}					
				}
			});
			$('#tabs2 li:nth-child(1)', $el).trigger('click');
		},
		
		unload:function(handler){
			for(var key in cache){
				app.dispatcher2.unload(cache[key]);
			}
		},
		
		pause:function($el,scope,handler){
			app.dispatcher2.pause();
		},
		
		resume:function($el,scope,handler){
			var id = $('#tabs2 li.active',$el).attr('ctnid');
			app.dispatcher2.resume(id);
		}
		
	}
});