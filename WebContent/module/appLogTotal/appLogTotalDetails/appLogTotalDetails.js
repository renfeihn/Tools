define([ "jquery" ], function() {

	//echarts对象
	var eEvent,eCpu,eMem;
	
	return {
		load : function($el, scope, handler) {
			var urlData={
				search:'*',
				startTime: '2018-05-22 10:27:32',
				endTime: '2018-05-29 10:27:32',
				interval:'day',
				cate: JSON.stringify({"category":{"cate1":[],"cate2":[],"cate3":[]},"app":{"cate1":[],"cate2":[],"cate3":[]}})
			}
			var lineOption = {
					color: ['#5e63fd','#fc852f'],
					title: {
						show: true,
						text: '单位: %',
						left: 34,
						top: '-2',
						textStyle: {
							fontSize: 12,
							color: '#a3a2a7',
							fontFamily: '微软雅黑',
							fontWeight: 'normal'
						}
					},
					legend: {
						show: true,
						orient: 'horizontal',
						right: 8,
						top: '-2',
						data:['预警','告警'],
						icon: 'rect',
						itemHeight: 2,
					},
					grid: {
						borderWidth: 0,
						x: 32,
                        y: 20,
                        x2: 15,
                        y2: 20
					},
					tooltip: {
						trigger: 'axis'
					},
					xAxis: [
						{
							show: true,
							type: 'category',
							boundaryGap: false,
							axisLabel: {
								show: true,
							},
							splitLine: {show: false},
							axisLine: {
								show: true,
								lineStyle: {
									color: '#929099',//横坐标轴颜色
									width: 2,
									type: 'solid'
								}
							},
							axisTick: {
								show: false,
							},
							data: [1,2,3,4,5,6,7],
							splitNumber: 5
						}
					],
					yAxis: [
						{
							type: 'value',
							axisLabel: {
								show: true,
								textStyle:{
									color: '#5c5a66',
									align: 'left',
								},
								margin: 32
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
							},
							splitNumber: 5
						}
					],
					series: [{
					 	name: '预警',
						type: 'line',
						smooth: true,
						symbol: 'none',
						data: [65,50,20,70,75,70,80]
					},{
					 	name: '告警',
						type: 'line',
						smooth: true,
						symbol: 'none',
						data: [2,10,5,10,10,20,30]
					}]
			};

			drawEvent();
			function drawEvent() {
				time = new Date().getTime() - 360000;
				eEvent && eEvent.dispose();
				eEvent = app.echarts.init($('#eEvent',$el)[0]);
				var timeArr = [];
				var line1 =[];
				var line2 =[];
				for (var i = 0; i < 7; i++) {
					timeArr.push(new Date(time).Format('hh:mm'));
					time += 60000;
					line1.push(0);
					line2.push(0);
				}
				var lineOp = $.extend(true, {}, lineOption);
				lineOp.series[0].data = line1.concat();
				lineOp.series[1].data = line2.concat();
				lineOp.xAxis[0].data = timeArr;
				lineOp.title.text = '单位：个';
				var waringCount = line1.pop();
				$('#waringCount',$el).text(waringCount);
				var alarmCount = line2.pop();
				$('#alarmCount',$el).text(alarmCount);
				$('#dayEventCount',$el).text((waringCount+alarmCount)*5);
				eEvent.setOption(lineOp);
			}

			getHosts(urlData);

			$('#fileViewList', $el).on('dblclick', '.fileViewItem', function(event) {
				event.preventDefault();
				if(!OPERABLE){
					return;
				}
				OPERABLE = false;
				if($(this).attr('data-type') == 'file'){
					urlData.currentPath = $(this).attr('data-path').slice(0,-1);
					$("#searchBtn",$el).trigger('click',[false,false,true]);
					OPERABLE = true;
					return;
				}
				var name = $(this).attr('title');
				urlData.currentPath = $(this).attr('data-path');
				if($(this).attr('data-type') == 'host'){
					var cate = JSON.parse(urlData.cate);
					cate.hosts = {
						host:[$(this).attr('data-host')]
					};
					urlData.cate = JSON.stringify(cate);

					getSearchFileView(urlData, name, cate.hosts.host[0]);
				}else{
					getSearchFileView(urlData, name);
				}
				event.stopPropagation();
			}).on('click', '.fileViewItem', function(event) {
				event.preventDefault();
				if($(this).hasClass('active')){
					return;
				}
				$(this).addClass('active').siblings().removeClass('active');
			});

			$('#fileViewNav', $el).on('click', 'span', function(event) {
				event.preventDefault();
				if($(this).hasClass('active') || !OPERABLE){
					return;
				}
				$(this).addClass('active');
				OPERABLE = false;
				urlData.currentPath = $(this).attr('data-path');
				if(urlData.currentPath == '/'){
					var cate = JSON.parse(urlData.cate);
					delete cate.hosts;
					urlData.cate = JSON.stringify(cate);
					urlData.currentPath = undefined;
					getHosts(urlData);
				}else{
					if(!urlData.currentPath){
						urlData.currentPath = '/';
					}
					getSearchFileView(urlData);
				}

				$(this).nextAll().remove();

			});
	    	function getEchartsData(url_data) {
	    		var tmpUrlData = $.extend(true, {}, url_data);
	    		var searchInput = url_data.search;
	    		if(searchInput.split('|').length > 1){
	    			tmpUrlData.search = $.trim(searchInput.split('|')[0]);
	    		}

	    		return app.common.ajaxWithAfa({
					url: "ESSearchAction_getDocCountEchars.do",
					data: tmpUrlData
				}).done(function(data) {
					return $.Deferred().resolve(data);
				})
	    	}
			function getHosts(urlData) {
				app.shelter.show('加载中。。。');
				delete urlData.size;
				urlData.aggsTerm = '_head_.hostip';
				getEchartsData(urlData).then(function (data) {
					if (data.result && data.result != '') {
						var jsonData = JSON.parse(data.result),
						buckets = jsonData.aggregations.grade_term.buckets,
						itemData = [];
						if(buckets && buckets.length > 0){
							buckets.forEach(function (item) {
								itemData.push({
									name:item.key,
									type:'host',
									path:'/',
									host:item.key
								})
							})
							showFileViewItem(itemData);
						}
						$('#fileViewNav', $el).html('<span class="active" data-path="/">全部</span>');
					}else{
						app.alert('title', '获取主机失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
					}
					app.shelter.hide();
					OPERABLE = true;
				})
			}

			function getSearchFileView(urlData, name, host) {
				app.shelter.show('加载中。。。');
				app.common.ajaxWithAfa({
					url:'ESSearchAction_searchFileView.do',
					data:urlData
				}).done(function (data) {
					var path = urlData.currentPath;
					var result = data.result,
					resultData = [];
					if(result && !$.isEmptyObject(result)){
						if(result.folders && result.folders.length > 0){
							result.folders.forEach(function (item) {
								resultData.push({
									name:item,
									type:'folder',
									path:path+item+'/',
								});
							})
						}

						if(result.files && result.files.length > 0){
							result.files.forEach(function (item) {
								resultData.push({
									name:item,
									type:'file',
									path:path+item+'/',
								});
							})
						}
					}else{
						app.alert('title', '获取文件失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
					}
					showFileViewItem(resultData);
					if(name){
						$('#fileViewNav span', $el).removeClass('active');
						if(host){
							$('#fileViewNav', $el).append('<span class="active" data-host="'+host+'">'+name+'</span>');
						}else{
							$('#fileViewNav', $el).append('<span class="active" data-path="'+urlData.currentPath+'">'+name+'</span>');
						}
					}
					app.shelter.hide();
					OPERABLE = true;
				})
			}

			function showFileViewItem(data){
				var htmlString = '',
				typeClass;
				if(data && data.length > 0){
					data.forEach(function (item) {
						if(item.type == 'host'){
							typeClass = 'fa-desktop';
						}else if(item.type == 'folder'){
							typeClass = 'fa-folder-open-o';
						}else if(item.type == 'file'){
							typeClass = 'fa-file-text-o';
						}

						var tmpName = item.name;
						if(tmpName.length > 10){
							tmpName = tmpName.substr(0, 3)+'...'+tmpName.substr(-7, 7);
						}

						htmlString +='<li class="fileViewItem" data-host="'+item.host+'" data-type="'+item.type+'" data-path="'+item.path+'" title="'+item.name+'">' +
							'<div class="fa fa-television fileViewItemImg"><i class="fa '+typeClass+'"></i></div>' +
							'<div class="fileViewItemName">'+tmpName+'</div>' +
						'</li>';
					})
				}
				$('#fileViewList', $el).html(htmlString);
			}
		},
		unload : function(handler) {
			var echartsArr = [eEvent,eCpu,eMem];
			echartsArr.forEach(function(item){
				item && item.dispose();
			});
		},
		pause : function($el, attr, handler) {
			
		},
		resume : function($el, attr, handler) {
			
		}
	};
});
