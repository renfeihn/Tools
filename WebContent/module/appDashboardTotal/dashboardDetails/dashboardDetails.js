define(['stage'],function(Stage){
	var cache={};
	var cacheArr = {};
    return {
        
        load:function($el,scope,handler){
        	let stageMap = {};
        	let cate = {
        			"category": {
        				"cate1": [],"cate2": [],"cate3": []
        			},
        			"app": {
        				"cate1": [{cateId: scope.cate1}],
        				"cate2": [{cateId: scope.cate2}],
        				"cate3": [{cateId: scope.id}]
        			}
        	};
        	
        	init();
        	
        	function init() {
        		getPanels();
        		bindEvents();
        	}
        	
        	//获取仪表盘
        	function getPanels() {
        		app.common.ajaxWithAfa({
					url:'PanelAction_queryByAppId.do',
					data: {
						appId: scope.id
					}
				}).done(function (data) {
					if(data.result.length > 0){
						data.result.forEach(item => {
							if (item) {
								let navHtml = `<li data-skip="stage" data-stageId="${item.id}"><a href="#stage_${item.id}" data-toggle="tab">${item.name}</a></li>`;
								let contentHtml = `<div id="stage_${item.id}" class="tab-pane panel-wrap"></div>`;
								$('.dashboadrd-detail>ul>.add-page',$el).before(navHtml);
								$('.dashboadrd-detail>.tab-content',$el).append(contentHtml);
							}
						});
					}
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
        	
        	async function findPanel(panelId) {
				var url = 'PanelChartAction_getAllByWhereEx.do';
				var whereEx = JSON.stringify({
					panelId
				});
				var ret = await ajaxWithAfa(url, {whereEx});
				var lists = ret.result;
				lists.forEach(opts => {
					stageMap[panelId].addItem(JSON.parse(opts.config));
				})
				setTimeout(function () {
					setParam(stageMap[panelId])
				},1000)
			}
        	
        	function setParam(stage) {
        		var $items = stage.getListsByArray(stage.children);
        		$items && $items.forEach(item => {
        			stage.refreshParam({cate: JSON.stringify(cate)}, item);
        		})
        	}
        	
        	function initAppPage() {
        		app.dispatcher2.load({
					"moduleId" : "appDashboardTotal",
					"section" : "appDashboardHome", 
					"frameRenderTo" : '#tabs1',
					"id" : "appDashboard",
					 "params" : { 
						name: scope.name,
						id: scope.id,
						cate1: scope.cate1,
						cate2: scope.cate2
					 },
					"context" : $el
				});
        	}
        	       	
        	function bindEvents() {
        		
        		$('#ul_nav',$el).on('click','>li',function(){
    				var $this = $(this);
    				var $index = $(this).index();
    				var path = $this.attr('data-skip');
    				var frame = $this.find('a').attr('href');
    				if (!path) {
    					return;
    				}
    				$this.addClass('active').siblings().removeClass('active');
    				$('.dashboadrd-detail>.tab-content>div:eq('+$index+')',$el).addClass('active').siblings().removeClass('active');
    				if(path == 'stage'){
    					let stageId = $(this).attr('data-stageId');
    					if(stageMap[stageId]){
    						return;
    					}
    					stageMap[stageId] = new Stage({
							container: $("#stage_"+stageId,$el)[0],
							edit: false,
							params: {cate: JSON.stringify(cate)}
						})
    					findPanel(stageId);
    				}else{
    					app.dispatcher2.pause();// 暂停
                        if(!cache[path]){
                            cache[path] = $this;
                            var args = path.split('#');
                            var $this = $(this);
                            cacheArr[$index] = app.dispatcher2.load({
                                "moduleId" : args[0],
                                "section" : args.slice(1),
                                "frameRenderTo" : frame,
                                "id" : path,
                                "params" : { 
                                    params: scope
                                 },
                                "context" : $el
                            });
                        }else{
                        	app.dispatcher2.resume(path);
                        }
    				}           
    				
    			});
    			$('#ul_nav>li:eq(0)',$el).trigger('click');
        		
        		$('.dashboadrd-detail',$el).on('click','.add-page',function(){
        			app.dispatcher2.load({
        				"title": "新建仪表盘",
                        "moduleId" : "dataBoard",
                        "section" : "dataList",
                        "id" : "dataList",
                        "params" : { 
                            
                         },
                        "context" : $el
                    });
//        			let index = $('#ul_nav',$el).children().length;
//        			let $newLi = `<li><a href="#tabs${index}" data-toggle="tab">新建${index}</a></li>`;
//        			$(this).before($newLi);
//        			$('.tab-content',$el).append(`<div id="tabs${index}" class="tab-pane">${index}</div>`);
//        			$('#ul_nav>li:last>a',$el).trigger('click');
//        			loadDashboard(index, 'dataBoard', $(`#tabs${index}`, $el), {appId: scope.id})
        		});
        		
        		function loadDashboard (index, path, frame, params) {
        			cache[path] = index;
                    var args = path.split('#');
                    var frameId = app.global.getUniqueId();
                    cacheArr[index] = app.dispatcher2.load({
                        "moduleId" : args[0],
                        "section" : args.slice(1),
                        "frameRenderTo" : frame,
                        "id" : frameId,
                        "params" : { 
                            params
                         },
                        "context" : $el
                    });
        		}
        	}

		},
		
		unload:function(handler){
			for(var cacheId in cache){
				app.dispatcher2.unload(cacheId);
			}
        },
        
        pause:function($el,scope,handler){
        	app.dispatcher2.pause();
		},
		
		resume:function($el,scope,handler){
			var id = $('#ul_nav>li.active' ,$el).attr('data-skip');
			app.dispatcher2.resume(id);
		}
		
	}
});
