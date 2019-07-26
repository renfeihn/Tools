define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			console.log("load");
			// console.log(scope);
			var intervalTimer = null;
			var refreshFlag = true;
			var sql = `*|select * from applog-* `;
			var newSql = sql;
			$('#refreshFlag', $el).on('click', function(event){
				event.stopPropagation()
				$(this).toggleClass('true');
				refreshFlag = $(this).hasClass('true');
				// if(refreshFlag){
				// 	reqData();
				// }
			})
			
			$("#tradeAnalyseList", $el).on('click', '.tradeAnalyse-list-item span.link', function (e) {
				var tr = $(this).parents('.tradeAnalyse-list-item').data().item;
				tr['index'] = 'appdtl-' + new Date().Format('yyyyMMdd');
				tr['id'] = tr['_head_.appid'] + tr['_head_.logsn'];
				tr['serialno'] = tr['id'];
				tr['_index'] = tr['index']
				var name = $(this).text();
				app.dispatcher.load({
					"title": "日志明细 - " + name,
					"moduleId": 'logSearch',
					"section": 'logDetail',
					"id": 'search-'+tr['_head_.logsn'],
					"params": {
						serialno:tr['_head_.pid'],
						data:tr,
						id:tr['id'],
						'host': tr['_head_.hostip'],
						'index': tr['index'],
						'serialno': tr['_head_.pid'],
						'fileName': tr['_head_.file'],
						'logFlowInfo':tr,
						'serialno': tr['id']
					}
				});
			})

			$('#keywords', $el).on('keyup', function(e){
				if(e.keycode == 13){
					newQuery();
				}
			}).on('blur', function(){
				newQuery();
			});

			$('#duration', $el).on('change', function(){
				newQuery();
			})


			function newQuery(){
				let keywords = $('#keywords', $el).val();
				let duration = $('#duration', $el).val();
				newSql = sql;
				if(duration.split('-').length > 1){
					newSql = sql + `and duration >= ${duration.split('-')[0]} and duration < ${duration.split('-')[1]} `;
				}else{
					newSql = sql + `and duration >= ${duration} `;
				}
				if(keywords){
					newSql = sql + `and nested(__context__.__log__) = '${keywords}' `;
				}
				handler.clearInterval(intervalTimer);
				$('#tradeAnalyseList', $el).empty();
				reqData();
			}

			// app.dispatcher.load({
			// 	title: "代理监控详情",
			// 	moduleId:"agentMonitor",
			// 	section:["agentMonitorDetails"],
			// 	id:"",
			// 	params:{
			// 		data:tr
			// 	}
			// });
			var url = "";
			// var ws = new WebSocket(url);

			function reqData(){
				var curTime = new Date();
				var starttime = new Date(curTime.getTime()-(1000*30)).Format('yyyy-MM-dd hh:mm:ss');
				var endtime = curTime.Format('yyyy-MM-dd hh:mm:ss')
				app.common.ajaxWithAfa({
					url: 'ESSearchAction_sqlSearchWithAggregationsParse.do',
					data: {
						search: newSql,
						startTime: starttime,
						endTime: endtime,
					},
				}).done(function(content){
					if(content.result.agg.length > 0){
						var time = (1000*30) / content.result.agg.length;
						var index = 0;

						intervalTimer = handler.setInterval(() => {
							if(index < content.result.agg.length){
								let item = content.result.agg[index];
								if(refreshFlag){
									var $item = $(`<div class="tradeAnalyse-list-item">
											<div><span class="link" data-appid="${item['_head_.appid']}" data-logsn="${item['_head_.logsn']}">${item['_head_.logsn']}</span></div>
											<div>${item['_head_.appname']}</div>
											<div>${new Date(item['start']).Format('yyyy-MM-dd hh:mm:ss')}</div>
											<div>${new Date(item['stop']).Format('yyyy-MM-dd hh:mm:ss')}</div>
											<div>${item['_head_.hostip']}</div>
											<div>${item['duration']}ms</div>
										</div>`)
									$('#tradeAnalyseList', $el).append($item);
									$item.data({
										item: item
									});
									if($('#tradeAnalyseList', $el).children().length > 15){
										$('#tradeAnalyseList>.tradeAnalyse-list-item:first', $el).remove();
									}
								}
								index++;
							}else{
								handler.clearInterval(intervalTimer);
								reqData();
							}
						}, time)
					}
				})
			}
			
			reqData();
		},
		unload : function(handler) {

		},
		pause : function($el, attr, handler) {

		},
		resume : function($el, attr, handler) {
		}
	};
});