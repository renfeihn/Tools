define([ "jquery" ], function() {

	//echarts对象
	var eEvent,eStatistics;
	
	return {
		load : function($el, scope, handler) {
			eEvent = app.echarts.init($('#eEvent', $el)[0]);
			eStatistics = app.echarts.init($('#eStatistics', $el)[0]);
			var statisticsData = {};
			var param = scope.data;
			var timeSetting = [];
			var serialno;
			var $dataTable = $("#dataTable", $el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'pageLength': 5,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'START_TIME', defaultContent : ''
				},{
					data : 'END_TIME', defaultContent : ''
				},{
					data : 'TASK_NAME', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'ASSIGNEE', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						if(data){
							return new Date(data).Format('yyyy-MM-dd hh:mm:ss');
						}
					},
					"targets": [1,2]
				},{
					"render": function(data, type, row, meta) {
						switch(data) {
							case '0':
								return '草稿';
							case '1':
								return '处理中';
							case '2':
								return '完成';
							case '3':
								return '撤回';
							case '4':
								return '终止';
							case '5':
								return '驳回';

						}
					},
					"targets": 4
				}]
			});
			initPage(param);

			function initPage(param) {
				// 处理解除按钮是否可用
				if(param.dealStatus == "已解除"){
					$('#dispose', $el).addClass('disabled');
				}else{
					$('#dispose', $el).removeClass('disabled');
				}
				// if(param.eventStatus === 0 && (param.itilStatus === '' || param.itilStatus === '待分派')) {
				// } else {
				// }
				if(param.dealMsg){//事件解除
					// var messObj =  JSON.parse(param.dealMsg);
					// if(messObj.deal_user=='system'){
						$("#resolveType",$el).text('自动解除');
						$("#eventMsg",$el).text('').parent().css("display","none");
						$("#resolvePer",$el).text('').css("display","none");
					// }else{
					// 	$("#resolveType",$el).text('手动解除');
					// 	$("#eventMsg",$el).attr('title', messObj.deal_msg).text(messObj.deal_msg);
					// 	$("#resolvePer",$el).text(messObj.deal_user);
					// }
					// $("#resolveTime",$el).text(new Date(messObj.deal_time).Format('yyyy-MM-dd hh:mm:ss'));
				}else{
					$("#resolveType",$el).siblings().text('').end().parent().css("display","none");;
					$("#eventMsg",$el).text('').parent().css("display","none");
				}
				$('#eventStatus', $el).text(param.dealStatus);//处理状态 
				$('#eventId', $el).text(param.eventId);//事件ID 
				$('#stayTime', $el).text(param.eventDuration);//持续时间 
				$('#startDate', $el).text(param.eventStart);//首次发生时间 
				$('#ocrTimes', $el).text(param.tally);//发生次数
				$('#endDate', $el).text(param.eventEnd);//最后发生时间
				if(param.eventDesc){
					$('#eventDecribe', $el).text(param.eventDesc.replace(/(&*amp;)*lt;/gim, '<').replace(/(&*amp;)*gt;/gim, '>'));//事件描述
				}

				if(param.eventType == 0){
					$('#eventType', $el).removeClass().addClass('AMAgentMonitorDetails-error');
				}else if(param.eventType == 1){
					$('#eventType', $el).removeClass().addClass('AMAgentMonitorDetails-warning');
				}else if(param.eventType == 2){
					$('#eventType', $el).removeClass().addClass('AMAgentMonitorDetails-normal');
				}

				$('#eventSource', $el).text('asda');

				$('#eventLevel i', $el).removeClass('AMAgentMonitorDetails-blue');//移除事件级别
				for(var i = 0; i < Number(param.eventLevel); i++){//添加事件级别
					$('#eventLevel i', $el).eq(i).addClass('AMAgentMonitorDetails-blue');
				}
				$('#eventLevelNum', $el).text(param.eventLevel + '级');//事件级数
				if(param.eventDesc){
					var match = param.eventDesc.match(/日志流水\s*【.+】/gm);
					if(match && match.length > 0){
						var tmp = match[0];
//						serialno = tmp.match(/[\da-z]+/gm)[0];
						var ff = tmp.indexOf('【');
						var fl = tmp.indexOf('】');
						if (ff === -1 || fl === -1) {
							return;
						}
						serialno = tmp.substring(ff+1, fl);
					}
					var tmp = param.eventDesc.match(/\[.+]/);
					if (tmp && tmp.length > 0) {
						for(var i = 0 ; i < tmp.length ; i ++ ){
							if (tmp[i].split('到').length === 2) {
								timeSetting = tmp[i].split('到');
							}
						}
					}
				}
				
				
				getSearchParam().then(function (data) {
					var searchInput = data.result.search;
					if(searchInput.split('|').length > 1){
						var tmpText = $.trim(searchInput.split('|')[1]);
						if(/^SELECT/gi.test(tmpText)){
							$(".AMAgentMonitorDetails-layout2", $el).hide();
						}
		    		}
				})
				
			}

			drawEvent();
			function drawEvent() {
				getEcharts('LogWarningAction_getEventTrend.do').then(function (data) {
					var echartsData = {};
					if(data.result && !$.isEmptyObject(data.result)){
						for (var item in data.result) {
							if(echartsData.xline){
								echartsData.xline.push(item);
								echartsData.line1.push(data.result[item]);
							}else{
								echartsData.xline = [item];
								echartsData.line1 = [data.result[item]];
							}
						}
					}

					eEvent.setOption(getOption('单位：次', ['事件'], 'line', echartsData));
				})
			}

			function getEcharts(url) {
				return app.common.ajaxWithAfa({
					url:url,
					data:{
						eventId: param.eventId
					}
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			// echarts类型切换
			$('#eventStatistics', $el).on('click', 'span', function(event) {
				event.preventDefault();
				
				if($(this).hasClass('active')){
					return;
				}
				$(this).addClass('active').siblings().removeClass('active');
				var index = $(this).index();
				if(index == 0){
					eStatistics.setOption(getOption('单位：次', ['事件'], 'bar', statisticsData.host))
				}else{
					eStatistics.setOption(getOption('单位：次', ['事件'], 'bar', statisticsData.app))
				}
				
			});

			drawStatistics();
			function drawStatistics() {
				getEcharts('LogWarningAction_getStatiscs.do').then(function (data) {
					if(data.result && !$.isEmptyObject(data.result)){
						for (var item in data.result) {
							var tmpData = JSON.parse(data.result[item]);
							statisticsData[item] = {};
							for (var tmpI in tmpData) {
								if(statisticsData[item].xline){
									statisticsData[item].xline.push(tmpI);
									statisticsData[item].line1.push(tmpData[tmpI]);
								}else{
									statisticsData[item].xline = [tmpI];
									statisticsData[item].line1 = [tmpData[tmpI]];
								}
							}
						}
					}

					eStatistics.setOption(getOption('单位：次', ['事件'], 'bar', statisticsData.host));
				});
			}
			/**
			 * 获取echartsOption
			 * @param  {string} title '单位：次'
			 * @param  {array} item  ['告警','预警']
			 * @param  {string} type  'line'
			 * @param  {[type]} data  echarts数据
			 * @return {[type]} option      [description]
			 */
			function getOption(title,item,type,data) {
				var lineOption = {
						color: ['#5e63fd','#fc852f'],
						title: {
							show: true,
							text: title,
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
							data:item,
							icon: 'rect',
							itemHeight: 2,
						},
						grid: {
							borderWidth: 0,
							x: 32,
	                        y: 20,
	                        x2: 15,       
	                        y2: 20,
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
								data: data.xline,
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
						series: [/*{
						 	name: '预警',
							type: 'line',
							smooth: true,
							symbol: 'none',
							data: [65,50,20,70,75,70,80]
						}*/]
				};
				if(type == 'bar'){
					lineOption.xAxis = [{
						 data: data.xline,  
						 "offset":0,
						 "axisLine" : {
							 show: true,
							 lineStyle : {
								 color : '#929099',
							 }
						 },
						 "axisLabel":{
							 "show":true,
							 "textStyle":{
								 "align":"center",
							 }
						 },
						 axisTick: {
							show: false,
						 },
					}]
				}
				var index = 0;
				var series = []
				for (var tmp in data) {
					if (tmp != 'xline') {
						if(type == 'bar'){
							series.push({
							 	name: item[index++],
								type: 'bar',
								barGap: '10%',
								barCategoryGap: '10%',
								// barWidth: 30,//柱子宽度
								barMaxWidth: 70,
								data: data[tmp],
								animation:true,
							})
						}else{
							series.push({
							 	name: item[index++],
								type: type,
								smooth: true,
								symbol: 'none',
								data: data[tmp]
							})
						}
					}
				}

				lineOption.series = series;
				return lineOption;
			}

			getEventHistory();
			function getEventHistory() {	
				app.common.ajaxWithAfa({
					url:'LogWarningAction_getEventDealHis.do',
					data:{
						eventId: param.eventId
					}
				}).done(function (data) {
					if(data.result && data.result.length){
						data.result.forEach(function (item, index) {
							item.index = index+1;
						})
						$dataTable.rows.add(data.result).draw();
					}
				})
			}

			initRemarkList();
			function initRemarkList() {
				var localUser = localStorage.getItem('username');
				var html = '';
				var $remarkList = $('#remarkList', $el);
				getRemarkList().then(function (data) {
					data.result.forEach(function (item) {
						html +='<li id="'+item.id+'">' +
									'<p>' +
										'<span>'+item.user+'</span>' +
										'<span>'+item.createTime+'</span>';
						if(item.user == localUser){
							html +='<span class="fa fa-trash-o" title="删除"></span>';
						}
						html +='</p>' +
								'<div>' +
									''+item.comment+'' +
								'</div>' +
							'</li>';
					});
					$remarkList.html(html);
				},function () {
					html = '<li style="text-align:center;">无数据</li>';
					$remarkList.html(html);
				})
			}

			function getRemarkList() {
			 	return app.common.ajaxWithAfa({
					url:'LogWarningAction_getEventComment.do',
					data:{
						eventId: param.eventId
					}
				}).done(function (data) {
					if(data.result && data.result.length){
						return $.Deferred().resolve(data);
					}else{
						return $.Deferred().reject(data);
					}
				})
			}

			$('#remarkList', $el).on('click', '.fa-trash-o', function(event) {
				event.preventDefault();
				var $li = $(this).parents('li');
				var id = $(this).parents('li').attr('id');
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定删除该条备注？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(id){
	                	delRemark(id).then(function (data) {
	                		if(data){
	                			app.alert('备注删除成功');
	                			$li.remove();
	                		}else{
	                			app.alert('title', '备注删除失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
	                		}
	                	})
	                },
	                aArgs: [id]
				});
				
			});

			function delRemark(id) {
				return app.common.ajaxWithAfa({
					url:'LogWarningAction_delComment.do',
					data:{
						id: id
					}
				}).done(function (data) {
					return $.Deferred().resolve(data.result);
				})
			}

			$('#addRemark', $el).on('click', function(event) {
				event.preventDefault();
				var $remarkDetail = $('#remarkDetail', $el);
				if($remarkDetail.val().trim() == ''){
					app.alert('请填写备注内容');
					return;
				}
				addRemark({
					eventId: param.eventId,
					comment: $remarkDetail.val()
				}).then(function (data) {
					if(data){
						app.alert('备注添加成功');
						initRemarkList();
						$remarkDetail.val('');
					}else{
						app.alert('title', '备注添加失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
					}
				})
			});

			function addRemark(urlData) {
				return app.common.ajaxWithAfa({
					url:'LogWarningAction_addComment.do',
					data:urlData
				}).done(function (data) {
					return $.Deferred().resolve(data.result);
				})
			}

			$('#skipToLog', $el).click(function () {
				if(serialno){
					var no = serialno;
					app.common.ajaxWithAfa({
						url:'ESSearchAction_getFormatLog.do',
						data: {
							"serialNo": serialno
						}
					}).done(function (content) {
						app.dispatcher.load({
							"title": "日志明细 - "+no.substring(0, 4)+'...'+no.substr(-4, 4),
							"moduleId": 'logSearch',
							"section": 'logDetail',
							"id": 'search-'+no,
							"params": {
								'serialno': serialno,
								'id': content.result['_id'],
								'fileName': content.result['_source']['_head_.file'],
								'host': content.result['_source']['_head_.hostip'],
								'index': content.result['_index'],
								'routing': content.result['_routing'],
							}
						});
					})
				}else{
					getSearchParam().then(function (data) {
						if(data.result && !$.isEmptyObject(data.result)){
							var startTime = timeSetting.length !== 0 ? timeSetting[0].substring(1, timeSetting[0].length): param.eventStart;
							var endTime = timeSetting.length !== 0 ? timeSetting[1].substring(0, timeSetting[0].length -1): param.eventEnd;
							app.dispatcher.load({
								title: "日志搜索",
								moduleId:"logResultCheck",
								section:"logSearchDetail",
								id:param.triggerId,
								params:{
									param:{
										fromEventMonitorDetails:true,
										param: $.extend(true, {},data.result,{
											startTime:startTime,
											endTime:endTime,
											timeType: 1
										})
									}
								}
							});
						}else{
							app.alert('title', '查看日志失败', app.alertShowType.ERROR);
						}
					})
				}
			});

			function getSearchParam() {
				return app.common.ajaxWithAfa({
					url:'LogWarningAction_getWarnSearchDetail.do',
					data:{
						id:param.triggerId
					}
				}).done(function (data) {
					return $.Deferred().resolve(data.result);
				})
			}
			// 解决按钮事件
			$('#dispose', $el).click(function() {
				if(!$(this).hasClass('disabled')) {
					app.common.ajaxWithAfa({
                		url:'LogWarningAction_ignoreEvent.do',
                		data:{
                			eventId: param.eventId
                		}
                	}).done(function (data) {
                		if(data.result && data.result != ""){
                			app.alert('忽略成功！');
                			$('#dispose', $el).addClass('disabled');
                			// getBaseInfo();
                		}else{
                			app.alert('忽略失败！');
                		}
                	})
					// $('#disposeModal',$el).modal('show');
					// handler.setTimeout(function(){
					// 	$('textarea',$('#disposeModal',$el))[0].select();
					// },500);
				}
				
			});
			
			// 确认解决按钮事件
			$('#confirmBtn',$('#disposeModal',$el)).click(function(){
				var textVal  = $.trim($('textarea',$('#disposeModal',$el)).val())||'';
				$('#disposeModal',$el).modal('hide');
				$.ajax({
					type: 'post',
					url: 'EventRemoveAction_removeEvent.do',
					data: {
						eventId: param.eventId,
						deal_msg: textVal
					},
					success: function(data) {
						if(data.content.rows > 0) {
					        app.common.sendlogHistory("解除事件：事件ID【"+eventId+"】，事件类型【"+scope.eventType+"】，应用【"+scope.appName+"】，对象【"+scope.objName+"】");
							app.alert('解除成功！');
							getBaseInfo();
							var update = {
								source:'appOverview'
							}
							window.postMessage(update,"*");	
						} else {
							app.alert('title', '解除失败！', app.alertShowType.ERROR);
						}
					}
				});
			});
		},
		unload : function(handler) {
			var echartsArr = [eEvent,eStatistics];
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
