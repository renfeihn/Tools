define([],function(){
	
	return {
		load:function($el,scope,handler){
			
			
			bindEvents();
			getObjectCategory().done(() => {
				collection();
			});
			
			
			handler.setInterval(() => {
				collection();
			},5000);
			
			
			function bindEvents() {
				$('.type-wrap>span',$el).on('click',function(){
					$(this).addClass('active').siblings().removeClass('active');
					let index = $(this).index();
					$('.objects-content>div:eq('+index+')',$el).removeClass('hide').siblings().addClass('hide');
				});
				
				$('.objects-content',$el).on('click','.cate1-name',function(){
					$(this).next('.cate2-wrap').toggleClass('hide');
				});
				
				$('.objects-content',$el).on('click','.cate3-item',function(){
					let name = $(this).find('.cate3-text').text();
					let id = $(this).find('.cate3-name').attr('data-id');
					let type = $(this).parents('.ul-wrap').hasClass('apps-wrap') ? 'app' : 'sys';
					app.dispatcher.load({
						"title": "应用性能-" + name,
						"moduleId" : "dashboardTotal",
						"section" : "dashboardDetails",
						"id" : id,
						 "params" : { // 给标签传递参数
							 id: id,
							 type: type
						 },
						"context" : $el
					});
				});
				
				$('#search_text',$el).on('keyup',function(){
					let val = $(this).val().toLowerCase();
					if(!val){
						$('.objects-content>div:not(.hide)',$el).find('.cate1-item').removeClass('hide');
						$('.objects-content>div:not(.hide)',$el).find('.cate3-item').removeClass('hide');
						return;
					}
					$('.objects-content>div:not(.hide)',$el).find('.cate3-item').each((index,item) => {
						let name = $(item).find('.cate3-text').text().toLowerCase();
						if(name.includes(val)){
							$(item).removeClass('hide');
						}else{
							$(item).addClass('hide');
						}
					});
					
					$('.objects-content>div:not(.hide)',$el).find('.cate1-item').each((index,item) => {
						if($(item).find('.cate3-item:not(.hide)').length == 0){
							$(item).addClass('hide');
						}else{
							$(item).removeClass('hide');
						}
					});

				});
				
			}
			
			//递归找到第三级
			function findChild(arr) {
				arr
			} 
			
			//应用  资产
			function getObjectCategory(){
				return app.common.ajaxWithAfa({
					url: "ESSearchAction_getObjectCategory.do",
				}).done(function(data) {
					
					let result = data.result;
					if($.isEmptyObject(result)){
						return;
					}
					
					let app = result.app;
					let appHtml = '';
					app.forEach(item => {
						if(item.childs && item.childs.length > 0){
							let cate2 = item.childs;
							cate2.forEach(item2 => {
								if(item2.childs && item2.childs.length > 0){
									let cate3 = item2.childs;
									cate3.forEach(item3 => {
										appHtml += `<li class="cate3-item" data-id="${item3.cateId}" title="采集速度  0.00KB/s\n采集量  0.00MB">
														<span class="collect-info">
															<span class="collect-speed">0.00KB/S</span>
															<span class="collect-count">0.00MB</span>
														</span>
														<span class="cate3-name">
															<span class="cate3-text">${item3.cateName}</span>
														</span>
													</li>`;
									});
								}
								
							});
						}
					});
					$('.app',$el).html(appHtml);
					
					
//					for(let i in result){
//						if(i == 'app'){
//							continue;
//						}
//						let arr = result[i];
//						let html = '';
//						let collectHide = i == 'app' ? '' : 'hide';
//						let title = i == 'app' ? '采集速度  0.00KB/s\n采集量  0.00MB' : '';
//						if(arr.length > 0){
//							arr.forEach(item => {
//								html += `<li class="cate1-item" data-id="${item.cateId}">
//											<span class="cate1-name">${item.cateName}<i class="fa fa-caret-down"></i></span>`;
//								if(item.childs && item.childs.length > 0){
//									html += `<ul class="cate2-wrap">`;
//									let cate2Arr = item.childs;
//									cate2Arr.forEach(item2 => {
//										html += `<li class="cate2-item" data-id="${item2.cateId}">
//													<span class="cate2-name">
//														<span class="cate2-text">${item2.cateName}</span>
//													</span>`;
//										if(item2.childs && item2.childs.length > 0){
//											html += `<ul class="cate3-wrap">`;
//											let cate3Arr = item2.childs;
//											cate3Arr.forEach(item3 => {
//												html += `<li class="cate3-item" data-id="${item3.cateId}" title="${title}">
//															<span class="collect-info ${collectHide}">
//																<span class="collect-speed">0.00KB/S</span>
//																<span class="collect-count">0.00MB</span>
//															</span>
//															<span class="cate3-name">
//																<span class="cate3-text">${item3.cateName}</span>
//															</span>
//														</li>`;
//											});
//											html += `</ul>`;
//										}else{
//											html += `</li>`;
//										}
//									});
//									html += `</ul>`;
//								}
//								html += `</li>`;
//							});
//						}
//						$('.objects-content .'+i+'',$el).html(html);
//					}
					return $.Deferred().resolve();
				});
			}
			
			function collection() {
				app.common.ajaxWithAfa({
					url: 'LogStaticsAction_getMonInputByKeyIds.do',
					data: {
						statisticstype: 2,
						timeInterval: 5,
						startNumber: 0
					}
				}).done(function (data) {
					let result = data.result;
					result.forEach(item => {
						let element = $('.app',$el).find('.cate3-item[data-id="'+item.keyid+'"]');
						let speed = Number(item.ips[0].dataips).toFixed(2) + 'KB/S';
						let count = (Number(item.datasize)/1024).toFixed(2) + 'MB';
						$('.collect-speed',element).text(speed);
						$('.collect-count',element).text(count);
						element.attr('title','采集速度 ' + speed + '\n' + '采集量 ' + count);
					});
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
