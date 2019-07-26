define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			var rowData = app.domain.get('queryTrade', 'rowData');
			var $timeLine = $('#timeLine', $el),
					$linkList = $('#linkList', $el);

			var linkData = null;

			var ajaxUrl = {
				'a': 'LogRelationAction_getLogLinks.do',
				'b': 'LogChainAction_getLogChain.do'
			};

			var appId = rowData['_source']['_head_.appid'];
			var start = new Date(rowData['_source']['start']).Format('yyyy-MM-dd hh:mm:ss');
			var logsn = rowData['_source']['_head_.logsn'];
			function TimeFormat(time){
				if(time < 1000){
					return time + 'ms';
				}else if(time < 60000){
					return (time/1000).toFixed(1) + 's';
				} else {
					return (time/60000).toFixed(1) + 'min';
				}
			}
			function getLinkData(){
				app.shelter.show();
				app.common.ajaxWithAfa({
					url: ajaxUrl[$('[name="linkType"]:checked', $el).val()],
					data: {
						params: JSON.stringify({appId,start,logsn})
					},
				}).done(function(content){
					app.shelter.hide();
					if(content.result){
						render(content.result[0]);
						linkData = content.result[0];
					}
				})
			}

			function render(linkdata){
				// 清除
				$timeLine.empty();
				$linkList.empty();

				var timeLine_html = '';
				for(let i=0; i<5; i++){
					timeLine_html += i!=0?`<div><span>${TimeFormat((i*(rowData['_source'].duration/4)).toFixed(1))}</span></div>`:'<div></div>';
				}
				$timeLine.html(timeLine_html);
				$linkList.html(linkdata.reduce((sum,item,index)=>{
					return sum += `<tr>
						<td style="padding: 0 10px;"><span class="look-details">${item['_source']['_head_.sourcename']}</span></td>
						<td><div>
								<div class="bar-duration" style="background-color: rgba(64, 147, 199, 0.${index+1});width: ${(item['_source']['duration'] / rowData['_source'].duration * 100).toFixed(3)}%;margin-left: ${getLeft(item['_source']['start'])}%;">${item['_source']['duration']}ms : ${item['_source']['_struct_.serviceMethod'] || '-'}</div>
						</div></td>
					</tr>`;
				},''));
			}

			function getLeft(thisStart){
				return ((new Date(thisStart).getTime() - new Date(rowData['_source'].start).getTime())/rowData['_source'].duration*100).toFixed(3);
			}

			getLinkData();

			$('[name="linkType"]', $el).on('change', function(){
				getLinkData();
			})

			$('#linkList', $el).on('click', '.look-details', function(){
				let logsns = [];
				for(var i =0;i<linkData.length;i++){
					logsns[i] = {
						'logsn': linkData[i]._source['_head_.logsn'],
						'appname': linkData[i]._source['_head_.appname'],
						'keywords': linkData[i].keywords && linkData[i].keywords.join(","),
						'_index': linkData[i]._index,
						'_routing': linkData[i]._routing,
						'id': linkData[i]._id
					}
				}
				var title = $(this).html() + new Date(rowData['_source']['start']).Format('yyyy-MM-dd hh:mm:ss.S');
			 	app.dispatcher.load({
			 		"title": "日志明细-"+title,
			 		"moduleId": 'logSearch',
			 		"section": 'logDetail',
			 		"id": app.global.getUniqueId(),
			 		"params": {
			 			'serialno': logsn,
			 			'logsns': logsns,
						'id': rowData['_id'],
						'host': rowData['_source']['_head_.hostip'],
						'index': rowData['_index'],
						'fileName': rowData['_source']['_head_.file']
			 		}
			 	});
			})
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});