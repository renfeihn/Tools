define([ "jquery", 'd3'], function($, d3) {
	var getTopoList = null;
	return {
		load : function($el, scope, handler) {
						
			 var nodes = {}, // x : obj
			     nodeIdMap = {}, // id : obj
			     edges = {}, // src : obj
				 edgeIdMap = {}; // id : obj
			var count = 0, // 第几列
			finalArr = []; // 最终生成的线条遍历数组
			
			const DEFAULT_SCALE = 1;	//默认缩放
			const ZOOM = 0.1;	//缩放最小单位
			let scale = 1;	//缩放缓存
			let eventObj = {};
			let cates = {};
			let hasAjaxApps = [];
			let finished = true;
			

			getCates().then(res => {
				getTopo();
			});
			
			
			
			$('.svg-wrap',$el).on('click','svg',function(e){
//				console.log(e);
				let element = e.target.parentElement;
				if(!['text','path'].includes(e.target.nodeName)){
					return;
				}
				if($(element).find('.event-num').length > 0){
					let appId = $(element).attr('id');
					let appName = $(element).find('text:eq(0)').text();
					app.dispatcher.load({
						"title": "事件列表-"+appName,
						"moduleId" : "CDMB_AppRel",
						"section" : "CMDB_eventList",
						"id" : "CMDB_eventList"+appId,
						"params" : {
							appId: appId,
							appName: appName
						}
					});
				}
			});
			
			
			function svgAddAnimation() {
				 $('.svg-wrap svg>g>g',$el).each(function() {
				     $this = $(this);
				     var _class = $this.attr('class');
				     var id = $this.attr('id');
				     if (_class == 'edge') { // edge
				         var arr = id.split('_');
				         if (arr.length > 3) { // category
				             return;
				         }
				         var src = arr[0],
				             target = arr[2],
				             edge = {
				                 id: id,
				                 src: src,
				                 target: target
				             };
				         if (!edges[src]) {
				             edges[src] = [edge];
				         } else {
				             edges[src].push(edge);
				         }
				         edgeIdMap[id] = edge;
				         $this.attr('class', 'edge dash'); // 为edge添加动画类
				     } else { // node
				         var $text_1 = $('text:first', $this);
				         if (id.indexOf('_category') == -1) { // category
				             var x = $text_1.attr('x'),
				                 y = $text_1.attr('y'),
				                 node = {
				                     id: id,
				                     x: x,
				                     y: y,
				                     $el: $this
				                 };
				             if (!nodes[x]) {
				                 nodes[x] = [node];
				             } else {
				                 nodes[x].push(node);
				             }
				             nodeIdMap[id] = node;
				         }
				     }
				 });
				 
				 startAnimation();

				 function startAnimation() {
				     $('.dash>path',$el).animate({
				         strokeDashoffset: 500
				     }, {
				         duration: 30000,
				         easing: 'linear',
				         complete: function() {
				             $(this).css("stroke-dashoffset", 1000);
				         }
				     });
				 }

				 function startSlowAnimation() {
				     $('.slow>path',$el).animate({
				         strokeDashoffset: 900
				     }, {
				         duration: 30000,
				         easing: 'linear',
				         complete: function() {
				             $(this).css("stroke-dashoffset", 1000);
				         }
				     });
				 }

				$.each(nodes, function(key, val) {
					$.each(val, function(i, obj) {
						var lineArr = edges[obj.id];
						lineArr instanceof Array && $.each(lineArr, function(index, lineObj) {
							var nextId = lineObj.target;
							var next = nodeIdMap[nextId];
							finalArr.push({
								src: obj,
								L1: lineObj.id,
								L2: next.id,
								target: next
							});
						});
					});
				});
				
				// 数组排序算法
				function finalArrSort(a, b) {
					var src_subx = parseInt(a.src.x, 10) - parseInt(b.src.x, 10),
						src_suby = parseInt(a.src.y, 10) - parseInt(b.src.y, 10),
						target_suby = parseInt(a.target.y, 10) - parseInt(b.target.y, 10);
					if (src_subx !== 0) {
						return src_subx;
					} else {
						if (a.src.id == b.src.id) {
							return target_suby;
						}
						return src_suby;
					}
				}
				finalArr.sort(finalArrSort);

				 var teme = setInterval(function() {
				     startAnimation();
				     startSlowAnimation();
				 }, 30000);

				 var colors = ["green", "green", "red", "green", "green", "orange", "green", "green"];
				 
				 //获得随机的颜色
				 function getRodomColor() {
					 //return colors[Math.floor(Math.random() * colors.length)]
					 return '#4169E1';
				 }

				 function changeForm(L1, L2) {
					 //随机赋予需要变化的元素颜色值
					 var colorInterval = setInterval(function() {
						 var color = getRodomColor();
						 $('#' + L1)
							 .find("path")
							 .attr('stroke-width', 5)
							 .attr('stroke-dasharray', '0.1,8')
							 .attr('stroke-linecap', 'round');
						 $('#' + L2)
							 .find("path")
							 .attr('stroke-width', 5)
							 .attr('stroke-dasharray', '0.1,8')
							 .attr('stroke-linecap', 'round');
					 }, 10);
					 return colorInterval;
				 }
				
				 function changeColor(L1, L2) {
					 var color = getRodomColor();
					 // 改变线条颜色
					 $('#' + L1).find("path")
						 .css('stroke', color)
						 .attr('stroke-width', 1)
						 .attr('stroke-dasharray', '5')
						 .attr('stroke-linecap', null);
					 $('#' + L2).find("path")
						 .css('stroke', color)
						 .attr('stroke-width', 1)
						 .attr('stroke-dasharray', '5')
						 .attr('stroke-linecap', null);
					 // 改变箭头颜色
					 $('#' + L1).find('polygon')
						 .css('fill', color)
						 .css('stroke', color);
					 $('#' + L2).find('polygon')
						 .css('fill', color)
						 .css('stroke', color);
					 // 针对每种颜色特殊处理
					 if (color == 'orange') {
						 // 减速
						 $('#' + L1 + '>path').stop(true, true);
						 $('#' + L2 + '>path').stop(true, true);
						 $('#' + L1).attr('class', 'edge slow');
						 $('#' + L2).attr('class', 'edge slow');
						 startSlowAnimation();
						 $('#' + L1).find('title').text('缓慢');
						 $('#' + L2).find('title').text('缓慢');
					 } else if (color == 'red') {
						 // 停止
						 $('#' + L1 + '>path').stop(true, true);
						 $('#' + L2 + '>path').stop(true, true);
						 $('#' + L1).attr('class', 'edge');
						 $('#' + L2).attr('class', 'edge');
						 $('#' + L1).find('title').text('阻塞');
						 $('#' + L2).find('title').text('阻塞');
					 } else {
						 $('#' + L1).find('title').text('正常');
						 $('#' + L2).find('title').text('正常');
					 }
				 }
				
				 var index = 0;

				 function iterator(interval) {
					finished = false;
					 var len = finalArr.length;
					 if (index < len) {
						 clearInterval(interval);
						 interval = changeForm(finalArr[index].L1);
					 } else {
						 clearInterval(interval);
						 finished = true;
						 return;
					 }
					 setTimeout(function() {
						 let source_cate3 = finalArr[index].src.id;
						 let mid_cate3 = finalArr[index].L1.split('_edge_')[1];
						 let target_cate3 = finalArr[index].target.id;
						 //let ajaxArr = [source_cate3,mid_cate3,target_cate3];
						 let ajaxArr = [];
						 !hasAjaxApps.includes(source_cate3) && hasAjaxApps.push(source_cate3) && ajaxArr.push(source_cate3);
						 !hasAjaxApps.includes(mid_cate3) && hasAjaxApps.push(mid_cate3) && ajaxArr.push(mid_cate3);
						 !hasAjaxApps.includes(target_cate3) && hasAjaxApps.push(target_cate3) && ajaxArr.push(target_cate3);

						 let promiseArr = ajaxArr.map(item => getData(item));
						 //console.log(hasAjaxApps,ajaxArr);
						 Promise.all(promiseArr).then(res => {
							changeColor(finalArr[index].L1);
							index++;
							iterator(interval);
						 });
						 
					 }, 2000);
				 }
				

				 $('.btn-refresh',$el).on('click',function(){
					 if(!finished){
						app.alert('正在处理,请稍后再试');
						return;
					 }
					 index = 0;
					 hasAjaxApps.length = 0;
					 iterator();
				 });
				 $('.btn-refresh',$el).trigger('click');
				 
			}



			
			function setSvg() {
				let w = $('.svg-wrap',$el).width();
				let h = $('.svg-wrap',$el).height();
				$('.svg-wrap>svg',$el).attr('width',w+'px').attr('height',h+'px').attr('transform',`scale(${DEFAULT_SCALE})`);
				
				//后台生成的svg被固定的位置    为了展示效果poc写死了属性
				//$('.svg-wrap>svg>g',$el).attr('transform','scale(0.7) rotate(0) translate(-80,420)');
				
				$('.apprel-page .size-zoom-topo>i',$el).on('click',function(){
					let id = $(this).attr('data-id');
					switch(id){
						case '12':
							reset();
							break;
						case '3':
							zoomOut();
							break;
						case '4':
							zoomIn();
							break;
					}
				});
			}
			
			function setEvents() {
    			$('.svg-wrap>svg>g>g.node',$el).each((index,item) => {
    				$(item).find('path').length > 0 && $(item).find('path').attr('stroke','#4169E1');
    				let text = $(item).find('text:not(.event-num)');
    				let id = $(item).attr('id');
    				let txt = text.text();
    				if(eventObj[id]){
    					let w = $(item).find('path')[0].getBoundingClientRect().width;
    					let h = $(item).find('path')[0].getBoundingClientRect().height;
    					let x = Number(text.attr('x')) + w/4;
    					let y = Number(text.attr('y')) - h/4 - 3;
						
						let x_num = (eventObj[id]+ '').length * 2;
    					let event = `<circle cx="${x}" cy="${y}" r="6" fill="red" x="0" y="-0"></circle>
		    						<text class="event-num" x="${x-x_num}" y="${y+3}" fill="#fff" font-size="8.00">${eventObj[id]}</text>`;
    					$(item).append(event);
    					$(item).find('path').attr('stroke','red');
    				}
    			});
    			$('.svg-wrap',$el).html($('.svg-wrap',$el).html());
			}
			
			function zoomIn() {
				scale = scale - ZOOM;
				$('.svg-wrap>svg',$el).attr(`transform`,`scale(${scale})`);
			}
			
			function zoomOut() {
				scale = scale + ZOOM;
				$('.svg-wrap>svg',$el).attr(`transform`,`scale(${scale})`);
			}
			
			function reset() {
				scale = DEFAULT_SCALE;
				$('.svg-wrap>svg',$el).attr(`transform`,`scale(${DEFAULT_SCALE})`);
			}
			
			function getTopo() {

				app.common.ajaxWithAfa({
					url:'CmdbConfigManagerAction_getAppSvgInfo.do',
					data:{},
				}).then(function(data){
					if(data.result){
						let result = typeof(data.result) == 'string' ? JSON.parse(data.result) : data.result;
						let html = result.svg;

						getEvents().then(res => {
							
							$('.svg-wrap',$el).html(html);
							setSvg();
							setEvents();
							svgAddAnimation();
							addEventSvg();
						});

					}
				})

				
			}
			
			
			function addEventSvg() {
				var svg = d3.select($('.svg-wrap',$el).find('svg')[0]);
				var gContent = svg.select('g#graph0');
				let zoomed = d3.zoom().scaleExtent([.1,2]).on('zoom', function (e){
					const transform = d3.event.transform;
					gContent.attr("transform", transform);
				});
				svg.call(zoomed);
			}

			function getEvents() {
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url:'EventListAction_getAppEventNum.do',
						data:{},
					}).then(function(data){
						if(data.ret){
							eventObj = data.ret;
							resolve(data);
						}
					});
				})
			}
			
			function getCates() {
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url:'ESSearchAction_getObjectCategory.do',
						data:{},
					}).then(function(data){
						if(data.result){
							let app = data.result.app;
							app.forEach(item1 => {
								item1.childs.forEach(item2 => {
									item2.childs.forEach(item3 => {
										if(!cates[item3.cateId]) {
											cates[item3.cateId] = {};
										}
										cates[item3.cateId]['cate1'] = item1.cateId;
										cates[item3.cateId]['cate2'] = item2.cateId;
									});
								});
							});
							resolve(data);
						}
					});
				})
			}

			function getParams(cate1,cate2,cate3) {
				let today = new Date().Format('yyyyMMdd');
				let params = {
					search: `*|select count(*) as count, avg(duration) as avgTime, max(duration) as maxTime from applog-${today}  limit 1000`,
					startTime: new Date().Format('yyyy-MM-dd 00:00:00'),
					endTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
					cate: JSON.stringify({
						"category": {
							"cate1": [],"cate2": [],"cate3": []
						},
						"app": {
							"cate1": [{cateId: cate1}],
							"cate2": [{cateId: cate2}],
							"cate3": [{cateId: cate3}]
						}
					}),
					logType: 1
				};
				return params;
			}

			function sqlSearch(urlData,appId) {
    			return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url:'ESSearchAction_sqlSearchWithAggregationsParse.do',
						data:urlData
					}).done(function (data) {
						let obj = data.result.agg[0];
						let count = parseInt(obj.count) || 0;
						let avg = obj.avgTime == 'NaN' ? 0 : obj.avgTime;
						let node = $('.svg-wrap>svg',$el).find('.node[id="'+appId+'"]');
						if(avg > 100){
							node.find('path').attr('fill','rgba(251, 130, 41, 0.5)');
							if(avg > 1000){
								node.find('path').attr('fill','rgba(255, 21, 25, 0.5)');
							}
						}
						avg = avg > 1000 ? (parseInt(avg/1000) + 's') : (parseInt(avg) + 'ms');
						
						node.find('text:eq(1)').text(count+'笔/'+avg);
						resolve(data);
					}).fail(data => {
						reject();
					})
				})
			}
			
			function getData(appId) {
				let cate1 = cates[appId]['cate1'];
				let cate2 = cates[appId]['cate2'];
				let p = getParams(cate1,cate2,appId);
				return sqlSearch(p,appId);
			}
	
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
			
		}
	};
});