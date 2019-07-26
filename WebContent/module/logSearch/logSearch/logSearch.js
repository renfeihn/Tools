define(["jquery"],function(){
	var echartsLine = null;
	return {
		
		load:function($el,scope,handler){
			app.common.searchTab.addTabNum();
			$("#searchInpt",$el).focus();
			// 获取搜索历史
			function getSearchrecord() {
				app.common.ajaxWithAfa({
					url:'LogUserSearchAction_queryUserSearchInfoById.do',
				}).done(function (data) {
					var liHtmlString = '';

					if (data.result && data.result.length > 0) {
						for (var i = 0; i < data.result.length && i < 10; i++) {
							liHtmlString += '<li>'+data.result[i].text+'</li>';
						}
					}
					$('#logSearch_searchHistory',$el).html(liHtmlString);
					if(liHtmlString != ''){
						$('.suggestion',$el).show();
					}
				});
			}

			/**
			 * [skipToLogResultCheck description]
			 * @param  {[type]} param [description]
			 * @return {[type]}       [description]
			 */
			function skipToLogResultCheck(param) {
				app.tab.close(true);

				app.dispatcher.load({
					title: "日志搜索",
					moduleId:"logResultCheck",
					section:"",
					id: 'logSearch'+app.global.getUniqueId(),
					params:param
				});
			}

			// 高级搜索链接
			$('#moreSearch',$el).on('click', function(event) {
				event.preventDefault();

				skipToLogResultCheck();
			});
			
			//搜索按钮
			$("#searchBtn",$el).on('click', function(event) {
				event.preventDefault();
				var text = $("#searchInpt",$el).val();
				if (text == '') {
					$("#logSearchArea",$el).css({
						'margin-top':'29vh'
					})
					$('#img1',$el).css('display','block');
					return;
				}

				skipToLogResultCheck({searchInput:text})
			});

			// 搜索历史事件
			$('#logSearch_searchHistory',$el).on('click', 'li', function(event) {
				event.preventDefault();
				event.stopPropagation();
				$("#searchInpt",$el).val($(this).text());
				$("#searchBtn",$el).click();
			});

			// 监听搜索框事件
			$("#searchInpt",$el).on('keyup', function(event) {
				if ($(this).val() == '') {
					getSearchrecord();
				}

				if(event.keyCode == 13){
					$("#searchBtn",$el).click();
				}
			}).on("click",function(e){
				if ($(this).val() == '') {
					getSearchrecord();
				}
			});
			$("#clear-history",$el).on("click",function(e){
				$.ajax({
	        		url 	 : 'LogUserSearchAction_delLogUserSearchById.do',
	      			dataType : "json",
	      			type     : "POST"
	        	}).fail(function(){
	        		app.alert("服务出错,删除失败！");
	        	}).done(function(){
	        		$('.suggestion',$el).hide();
	        	});
			});
			$("#close-history",$el).on("click",function(){
				$('.suggestion',$el).hide();
			});
		},
		
		unload:function(handler){
			app.common.searchTab.removeTabNum();
			echartsLine && echartsLine.dispose();
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});
