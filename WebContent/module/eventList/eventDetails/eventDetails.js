define([ "jquery" ], function() {
	var itemEchart,
		eventDetailEchart;
	return {
		load : function($el, scope, handler) {
			var eventId = scope.eventId;
			var objId = scope.objId;
			//var serverId;
			
			var $gatherTable = $("#gatherTable", $el).dataTable({//事件现场还原里的表格
				/*'bPaginate': false,
				'pagingType': 'full_numbers',*/
				'bStateSave': false,
				'bSort': false,
				'searching': false,
				'pageLength': 5,
				'scrollY': '190px',
				'scrollCollapse': true,
				'paging': false,
				'scrollX': false
			});
			
			var $dataTable1 = $("#dataTable1", $el).dataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'searching':false
			});
			$dataTable1.api().page.len(7).draw();// 设置表格分页长度
			
			var $dataTable2 = $("#dataTable2", $el).dataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'searching':false
			});
			$dataTable2.api().page.len(7).draw();// 设置表格分页长度
			
			var $dataTable3 = $("#dataTable3", $el).dataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'searching':false
			});
			$dataTable3.api().page.len(7).draw();// 设置表格分页长度
			
			var $dataTable4 = $("#dataTable4", $el).dataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'searching':false
			});
			$dataTable4.api().page.len(7).draw();// 设置表格分页长度
			
			var $dataTable5 = $("#dataTable5", $el).dataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'searching':false
			});
			$dataTable5.api().page.len(8).draw();// 设置表格分页长度

			
			getBaseInfo();
			//获取事件基本信息和监控源信息
			function getBaseInfo(){
				$.ajax({
					type : "post",
					url : "EventDetailAction_getEventDetailsByEventId.do",
					data : {eventId: eventId},
					dataType : "json",
					success : function(data){
						if(data.status){							
							if(data.content && data.content.eventInfoDsp){
								var data = data.content.eventInfoDsp;
								$('#eventName', $el).text(data.appNames && data.appNames[0]);
								
								if(data.eventStatus == 0){
									$('#eventStatus', $el).text('待处理');//处理状态 
								}else if(data.eventStatus == 1){
									$('#eventStatus', $el).text('处理中');//处理状态 
								}else if(data.eventStatus == 2){
									$('#eventStatus', $el).text('已处理');//处理状态 
								}							
								
								if(data.eventType == 0){
									$('#eventType', $el).removeClass().addClass('eventDetails-error');
								}else if(data.eventType == 1){
									$('#eventType', $el).removeClass().addClass('eventDetails-warning');
								}else if(data.eventType == 2){
									$('#eventType', $el).removeClass().addClass('eventDetails-normal');
								}
								
								$('#eventId', $el).text(data.eventId);//事件ID
								//var stayTime = (new Date(data.eventEnd).getTime() - new Date(data.eventStart).getTime()) / 1000 + 's'
								$('#stayTime', $el).text(data.eventDuration);//持续时间
								$('#startDate', $el).attr('title', data.eventStart).text(data.eventStart);//首发时间
								
								$('#eventLevel i', $el).removeClass('eventDetails-blue');//移除事件级别
								for(var i = 0; i < Number(data.eventLevel); i++){//添加事件级别
									$('#eventLevel i', $el).eq(i).addClass('eventDetails-blue');
								}
								$('#eventLevelNum', $el).text(data.eventLevel + '级');//事件级数
								
								$('#ocrTimes', $el).text(data.tally);//发生次数
								$('#endDate', $el).attr('title', data.eventEnd).text(data.eventEnd);//最后时间
								
								/***************暂无数据******************/
								$('#eventDecribe', $el).text(data.eventDesc);//事件描述
								$('#objectID', $el).text(data.objId);//对象id
								$('#objectType', $el).text(data.objCate3);//对象类型
								//$('#deployIP', $el).text(data.serverIp);//部署IP
								$('#objectName', $el).text(data.objName).attr('title', data.objName);//对象名称
								
								//serverId = data.serverId;
							}							
						}
					}
				});
				
				$.ajax({//获取模态框指标下拉框数据
					type: "post",
					url: "EventDetailAction_getMetrics.do",
					dataType: "json",
					data: {objectId: objId},
					success: function(data){
						if(data.status){
							var data = data.content.metrics;
							if(data && !$.isEmptyObject(data)){
								var optionTemp = "";
								for(var key in data){
									optionTemp += '<option value="'+data[key]+'">'+key+'</option>';
								}
								$('#itemSelt', $el).append(optionTemp);
							}
						}
					}
				});
			}
			
			$('#itemModal', $el).on('click', function(e){//隐藏指标模态框
				var e = e || window.event;
				var target = e.target || e.srcElement;
				if($(target).hasClass('close') || $(target).attr('data-role') == 'cancel' || $(target).attr('data-role') == 'confirm'){
					$(this).modal('hide');
				}
			});
			
			$('#echartCtn', $el).on('click', '.eventDetails-echarts:not(.active)', function(){
				$('#itemModal', $el).modal('show');//显示指标模态框
				$(this).addClass('selected').siblings().removeClass('selected');
			});
			
			var idName = 'echart';
			$('#itemModal [data-role=confirm]', $el).click(function(){//指标模态框中的确认按钮
				var serverId = $('#ipSelt', $el).val();
				if(!$('#itemSelt', $el).val() || serverId != 0 && !serverId){return}
				idName = idName + 1;
				$('#echartCtn .eventDetails-echarts.selected', $el)
					.find('.eTitle').text($('#itemSelt :selected', $el).text());//标题
				$('#echartCtn .eventDetails-echarts.selected', $el)
					.find('.itemEchart').attr('id', idName);
				
				$('#echartCtn .eventDetails-echarts.selected', $el)
					.css({'background': 'none', 'cursor': 'default'})
					.addClass('active')
					.children('.echartCtn').show();
				
				itemEchart = app.showEcharts({
					handler: handler,
					context: $('#echartCtn .eventDetails-echarts.selected', $el),
					selector: '#' + idName,
					eType: 'linepool',
					url: 'EventDetailAction_metricTimeline.do',
					unit: '%',
					urlParams: {
						metricName: $('#itemSelt', $el).val(),
						objectId: serverId,
						interval: 1,
						startDate: new Date(new Date().getTime() - 1*60*59*1000).Format('yyyy-MM-dd hh:mm:ss'),
						endDate: new Date().Format('yyyy-MM-dd hh:mm:ss')
					},
					items: [$('#itemSelt :selected', $el).text()],
					isRefresh: false,
//					beforefn: function(data){
//						if(data.content.echartsData && data.content.echartsData.items){
//							tpsEchart.changeItems(data.content.echartsData.items);
//						}		
//					},
					succfn: function(data){
						itemEchart.getEchartsObj().setOption({
							yAxis: [{max: 100}],
							legend: {
								show: false
							}
						});				
					}
				});
				itemEchart.start();
			});
			
			$('#echartCtn', $el).on('click', '.closeEchart', function(){//echarts容器的关闭按钮 
				$(this).parent().parent().parent()
					.css('background', '#f7f7fa url(img/eventDetails/add.png) center no-repeat')
					.css('cursor', 'pointer')
					.removeClass('active')
					.removeClass('selected');
				$(this).parent().parent().hide();
			});
			
			$('#echartCtn', $el).on('mouseover', '.eventDetails-add:not(.active)', 
				function(){
					$(this).css('background', '#f7f7fa url(img/eventDetails/add-blue.png) center no-repeat');
				}
			);
			
			$('#echartCtn', $el).on('mouseout', '.eventDetails-add:not(.active)',
				function(){
					$(this).css('background', '#f7f7fa url(img/eventDetails/add.png) center no-repeat');
				}
			);
			
			initEventTableData();
			//事件表格数据
			function initEventTableData(){
				$.ajax({//同期对象
					type: 'post',
					url: 'EventDetailAction_getSimilarEvents.do',
					data: {
						eventId: eventId,
						similar: 'CONCURRENT_OBJECT'
					},
					success: function(data){
						if(data.status && data.content.pageInfo && data.content.pageInfo.content && data.content.pageInfo.content.length){
							var tableData = getTableData(data.content.pageInfo.content);
							$dataTable1.fnClearTable();
							$dataTable1.fnAddData(tableData);
						}
					}
				});				
			}
			
			var sameSeveFlag = true;
			var sameAppFlag = true;
			var connectAppFlag = true;
			$('#sameTimeTabs ul', $el).on('click', 'li', function(){
				if($(this).hasClass('active')){return}
				if($(this).children('a').text() == '同服务器'){
					if(sameSeveFlag){
						$.ajax({//同期服务器
							type: 'post',
							url: 'EventDetailAction_getSimilarEvents.do',
							data: {
								eventId: eventId,
								similar: 'CONCURRENT_SERVER'
							},
							success: function(data){
								if(data.status && data.content.pageInfo && data.content.pageInfo.content && data.content.pageInfo.content.length){
									var tableData = getTableData(data.content.pageInfo.content);
									$dataTable2.fnClearTable();
									$dataTable2.fnAddData(tableData);
								}
							}
						});
						sameSeveFlag = false;
					}
					
				}else if($(this).children('a').text() == '同应用'){
					if(sameAppFlag){
						$.ajax({//同期应用
							type: 'post',
							url: 'EventDetailAction_getSimilarEvents.do',
							data: {
								eventId: eventId,
								similar: 'CONCURRENT_APPLICTION'
							},
							success: function(data){
								if(data.status && data.content.pageInfo && data.content.pageInfo.content && data.content.pageInfo.content.length){
									var tableData = getTableData(data.content.pageInfo.content);
									$dataTable3.fnClearTable();
									$dataTable3.fnAddData(tableData);
								}
							}
						});
						sameAppFlag = false;
					}					
				}else if($(this).children('a').text() == '接入应用系统'){
					if(connectAppFlag){
						$.ajax({//同期接入应用系统
							type: 'post',
							url: 'EventDetailAction_getSimilarEvents.do',
							data: {
								eventId: eventId,
								similar: 'CONCURRENT_CONSUMER'
							},
							success: function(data){
								if(data.status && data.content.pageInfo && data.content.pageInfo.content && data.content.pageInfo.content.length){
									var tableData = getTableData(data.content.pageInfo.content);
									$dataTable4.fnClearTable();
									$dataTable4.fnAddData(tableData);
								}
							}
						});
						connectAppFlag = false;
					}					
				}
			});
			
			var sameEventFlag = true;
			$('[href=#sameEventTabs]', $el).click(function(){
				if(sameEventFlag){
					$.ajax({//同类事件历史
						type: 'post',
						url: 'EventDetailAction_getSimilarEvents.do',
						data: {
							eventId: eventId,
							similar: 'EVENT_HISTORY'
						},
						success: function(data){
							if(data.status && data.content.pageInfo && data.content.pageInfo.content && data.content.pageInfo.content.length){
								var tableData = getTableData(data.content.pageInfo.content);
								$dataTable5.fnClearTable();
								$dataTable5.fnAddData(tableData);
							}
						}
					});
					sameEventFlag = false;
				}				
			});
			
			//获取表格数据
			function getTableData(data){
				var tableData = [];
				data.forEach(function(item, index){
					var rowData = [index+1, item.eventId || '-'];
					
					if(item.eventType == 0){
						rowData.push('<span class="error"></span>');//故障
					}else if(item.eventType == 1){
						rowData.push('<span class="warning"></span>');//预警
					}else if(item.eventType == 2){
						rowData.push('<span class="prompt"></span>');//通知
					}else{
						rowData.push('-');
					}
					
					if(item.eventStatus == 0){
						rowData.push('待处理');
					}else if(item.eventStatus == 1){
						rowData.push('处理中');
					}else if(item.eventStatus == 2){
						rowData.push('已处理');
					}else{
						rowData.push('-');
					}
					
					rowData.push(item.eventLevel || '-');
					rowData.push(item.tally == 0 ? 0 : item.tally ? item.tally : '-');
					rowData.push(item.eventStart || '-');
					rowData.push(item.eventEnd || '-');
					rowData.push(item.eventDuration || '-');//持续时间
					rowData.push('-');//处理人
					rowData.push('-');//处理时间
					
					tableData.push(rowData);
				});
				return tableData;
			}
			
			$.ajax({//事件现场还原页签
				type: 'post',
				url: 'EventDetailAction_getEventMetrics.do',
				data: {eventId: eventId},
				success: function(data){
					if(data.status){						
						var data = data.content.eventMetric;
						if(data && data.length){
							var liTemp = '';
							data.forEach(function(item, index){				
								liTemp += '<li name="'+item.name+'" time="'+item.time+'" value="'+item.value+'" unit="'+item.unit+'">\
										        <a data-toggle="tab" class="eventDetails-tabs-a">'+item.displayName+'</a>\
										   </li>';						
							});
							$('#eventTabs', $el).html(liTemp);
							$('#eventTabs', $el).find('li').eq(0).trigger('click').addClass('active');
						}
					}
				}
			});
			
			$('#eventTabs', $el).on('click', 'li', function(){//事件现场还原页签
				var $this = $(this);
				if($this.hasClass('active')){return}
				var name = $this.attr('name'),
					time = $this.attr('time').substr(-8, 5),
					value = $this.attr('value'),
					unit = $this.attr('unit');
				$gatherTable.fnClearTable();
				eventDetailEchart && eventDetailEchart.dispose();
				eventDetailEchart = app.showEcharts({
					handler: handler,
					context: $el,
					selector: '#allEventEchart',
					eType: 'line',
					url: 'EventDetailAction_eventMetricTimeline.do',
					unit: unit,
					urlParams: {
						metricName: name,
						objectId: objId,
						eventId: eventId
					},
					items: [],
					isRefresh: false,
					beforefn: function(data){
						var data = data.content.echartsData;
						if(data && data.items && data.items.length){
							eventDetailEchart.changeItems(data.items);
							var tableData = [];
							if(data.line1 && data.line1.length){
								for(var i in data.line1){
									if(data.line1[i] != parseInt(data.line1[i])){
										data.line1[i] = Number(data.line1[i]).toFixed(2);
									}
									rowData = [Number(i)+1, data.line1[i] + unit, data.time[i]];
									tableData.push(rowData);
								}
								$gatherTable.fnAddData(tableData);
							}
						}
					},
					succfn: function(data){
						if(unit == '%'){
							eventDetailEchart.getEchartsObj().setOption({
								yAxis: [{max: 100}],
							});								
						}
						var option = eventDetailEchart.getEchartsObj().getOption();
						option.series[0].markLine = {
							lineStyle: {
								normal: {
									type: 'solid',
									width: 1,
									color: '#ff0000'
								}
							},
							silent: true,
							label: {
								normal: {
									show: false
								}
							},
							data: [
							    {xAxis: time},
							    {yAxis: value}
							],
							symbol: 'none'
						}
						eventDetailEchart.getEchartsObj().setOption(option);
					}
				});
				eventDetailEchart.start();
			});
			
			$.ajax({//获取IP
				type: 'post',
				url: 'EventDetailAction_getIps.do',
				data: {objId: objId},
				dataType: 'json',
				success: function(data){
					if(data.status){						
						var ips = data.content.ips;
						if(ips && ips.length){
							var optionTemp = '';
							ips.forEach(function(item, index){
								if(item.ip){
									optionTemp += '<option value="'+item.objId+'">'+item.ip+'</option>'
								}								
							});
							ips.forEach(function(item, index){
								if(item.ip){
									$('#deployIP', $el).text(item.ip);//部署IP
									return;
								}								
							});							
						}
						$('#ipSelt', $el).html(optionTemp);
					}
				}
			});
			
		},
		unload : function(handler) {
			itemEchart && itemEchart.dispose && itemEchart.dispose();
			eventDetailEchart && eventDetailEchart.dispose();
		},
		pause : function($el, scope, handler) {
		},
		resume : function($el, scope, handler) {
		}
	};
});