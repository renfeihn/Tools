define(["jquery", "handlebars"], function($, hb){
  var cacheIds={};
  return {

    load: function($el, scope, handler) {
    	
    	app.dispatcher3.load({
			"title" : "",
			"moduleId" : 'logResultCheck',
			"section" : 'logSearchDetail',
			"frameRenderTo" : '#searchContents>div:eq(0)',
			"id" : '1',
			"params" : { // 给标签传递参数
				'trueElement':$('#searchContents', $el).children('#tabs1'),
				'parentElement':$el,
				param: scope|| {}
			},
			context: $el
		}).done(function (data) {
			$('#searchContents>div:eq(0)').attr('cacheId','1');
			cacheIds['1']='1';
		});
    
		$('#addTab', $el).click(function(e){
			e.preventDefault();
			var len = $('#searchContents>div', $el).length;
			var index = $(this).index();
			var $li  = $('<li class="active"><a href="#tabs'+(index+1)+'" data-toggle="tab">新增日志搜索页<i class="fa fa-close"></i></a></li>');
			$(this).siblings().removeClass('active');
			
			$li.insertBefore(this);
			
			$('#searchContents>div', $el).removeClass('active');
			$('#searchContents', $el).append('<div id="tabs'+(index+1)+'" class="tab-pane active"></div>');
			app.dispatcher3.load({
				"title" : "",
				"moduleId" : 'logResultCheck',
				"section" : 'logSearchDetail',
				"frameRenderTo" : '#searchContents>div:eq('+ (index) +')',
				"id" : (len + 1),
				"params" : { // 给标签传递参数
					'trueElement':$('#searchContents', $el).children('#tabs'+(index+1)),
					'parentElement':$el
				},
				context: $el
			}).done(function (data) {
				$('#searchContents>div:eq('+ (index) +')').attr('cacheId', len+1);
				cacheIds[len+1] = len+1;
			})
		});
		
		//关闭页签
		$('#searchTabs', $el).on('click', '.fa-close', function(e){
			e.stopPropagation();
			var $parentLi = $(this).parents('li');
			var index = $parentLi.index();
			var cacheId = $(this).parents('.tab-pane').attr('cacheId');
			$parentLi.remove();
			$('#searchContents>div:eq('+ index +')', $el).remove();
			app.dispatcher3.unload(cacheId);
			delete cacheIds[cacheId];
			if($('#searchTabs', $el).find('li').length!=1 && $parentLi.hasClass('active')){
				$('#searchTabs', $el).find('li:eq('+(index-1)+')>a').click();
			}else if($('#searchTabs', $el).find('li').length == 1){
				app.tab.close($('#tabsContainer',$el).find('li.active'));
			}
		});
		
    },

    unload: function(handler) {
    	if(cacheIds && !$.isEmptyObject(cacheIds)){
    		for (var i in cacheIds) {
    			app.dispatcher3.unload(cacheIds[i]);
    		}
    	}
    },

    pause: function($el, scope, handler) {
      
    },

    resume: function($el, scope, handler) {
      
    }
  };
});
