define([ "jquery" ], function() {
	
	var eEvent;
	
	return {
		load : function($el, scope, handler) {
			eEvent = app.echarts.init($('#eEvent',$el)[0]);
			drawEvent();
			function drawEvent() {
				app.common.ajaxWithAfa({
					url:'LogWarningAction_getWarnMonitor.do',
					data:{
						interval:60
					}
				}).done(function (data) {
					var result = data.result,
					waringCount,
					echartsData={
						xline:[],
						line1:[],
						line2:[]
					};
					if(result && !$.isEmptyObject(result)){
						$('#warningCountTotal', $el).text(result.todayEvent||0);
						$('#touchRoleCount', $el).text(result.touchWarn||0);
						if(result.event && result.event.length > 0){
							var len = result.event.length;
							result.event.forEach(function (item, index) {
								echartsData.xline.push(item.time.substring(0,5));
								echartsData.line1.push(item.count);
								echartsData.line2.push(0);
								if(len == index+1){
									waringCount = item.count;
								}
							})
						}
					}
					eEvent.setOption(getLineOption('单位：次', ['预警','告警'], echartsData));
					$('#eventNum', $el).text(result.todayEvent||'-');
					$('#waringCount', $el).text(waringCount||'-');
				})
			}
			/**
			 * 查询代理信息
			 * @param  {[type]} argument [description]
			 * @return {[type]}          [description]
			 */
			function queryAgent() {
				$.ajax({
					url: 'AgentManagerAction_getAgentOSList.do',
					type: 'post',
					dataType: 'json',
					success:function (data) {
						$dataTable.clear();
						var resultData = data.content.list;
						var len = resultData.length;
						var online = 0;
						var systemMap = {};
						
						if(resultData && len>0){
							resultData.forEach(function (item,index) {
								item.index = index+1;
								if(item.processnum && item.processnum > 0){
									online++;
								}
								var system = item.os_type.toUpperCase();
								if(systemMap[system]){
									systemMap[system].push(item);
								}else{
									systemMap[system] = [item];
								}
							})
						}
						$dataTable.rows.add(resultData).draw();
						$('#totalCount', $el).text(len);
						$('#onLine', $el).text(online);
						$('#unLine', $el).text(len - online);

						$('#aixCount', $el).text(systemMap.AIX?systemMap.AIX.length:0);
						$('#linuxCount', $el).text(systemMap.LINUX?systemMap.LINUX.length:0);
						$('#windowsCount', $el).text(systemMap.WINDOWS?systemMap.WINDOWS.length:0);
						$('#javaCount', $el).text(systemMap.JAVA?systemMap.JAVA.length:0);
						$('#pythonCount', $el).text(systemMap.PYTHON?systemMap.PYTHON.length:0);
						$('#zabbixCount', $el).text(systemMap.ZABBIX?systemMap.ZABBIX.length:0);

					}
				})
			}

			

			getAppList();
			function getAppList() {
				app.common.ajaxWithAfa({
					url:'LogStaticsAction_getMonInputByKeyIds.do',
					data: {
						statisticstype: 2,
						timeInterval: 5,
						startNumber: 0
					}
				}).done(function (data) {
					var html = '';
					var result = data.result;
					if(result && result.length > 0){
						result.forEach(function (item, index) {
							if(index == 2){
								html += '<tr data-tt-id="'+item.keyid+'" name="'+item.keyname+'" data-tt-branch="true" statisticstype="2">'+
											'<td>'+item.keyid+'</td>'+
											'<td>'+item.keyname+'</td>'+
											'<td>测试</td>'+
											'<td>1</td>'+
											'<td><i class="fa fa-cog fa-spin" style="color: #22AC38"></i>采集中</td>'+
											'<td>Agent采集</td>'+
											'<td class="dataips">2M/S</td>'+
											'<td class="datasize">18.13G</td>'+
											'<td>1795</td>'+
											'<td>92%</td>'+
											'<td>3020ms</td>'+
											'<td>2018-06-06 00:14:35</td>'+
											'<td>'+item.ips[0].recordtime+'</td>'+
										'</tr>';
							}else{
								html += '<tr data-tt-id="'+item.keyid+'" name="'+item.keyname+'" data-tt-branch="true" statisticstype="2">'+
											'<td>'+item.keyid+'</td>'+
											'<td>'+item.keyname+'</td>'+
											'<td>测试</td>'+
											'<td>2</td>'+
											'<td><i class="fa fa-cog"></i>未采集</td>'+
											'<td>Agent采集</td>'+
											'<td class="dataips">'+item.ips[0].dataips+'</td>'+
											'<td class="datasize">'+item.datasize+'</td>'+
											'<td>-</td>'+
											'<td>-</td>'+
											'<td>-</td>'+
											'<td>2018-06-06 20:14:35</td>'+
											'<td>'+item.ips[0].recordtime+'</td>'+
										'</tr>';
							}
						})
					}

					$("#treeTable>tbody", $el).html(html);
					$("#treeTable", $el).treetable({
						expanderTemplate:'<i class="fa fa-plus-square-o" style="cursor:pointer;"></i>', 
						stringExpand:'展开',
						indent: 5,
						expandable: true,
						onNodeCollapse:function () {
							var node = this;
							node.indenter.find('i').toggleClass('fa-plus-square-o fa-minus-square-o').attr('title', 'Expand');
						},
						onNodeExpand:function () {
							var node = this;
							node.indenter.find('i').toggleClass('fa-plus-square-o fa-minus-square-o').attr('title', 'Collapse');
							var childSize = $("#treeTable", $el).find("[data-tt-parent-id='" + node.id + "']").length;
							if (childSize > 0) { 
								 return; 
							}
							var name = node.row.attr('name');
							getIpsByApp(name).then(function (data) {
								var html = '';
								if(data.result && data.result.length > 0){
									data.result.forEach(function (item) {
										html+='<tr data-tt-id="'+item.keyid+'" data-tt-parent-id="'+ node.id +'" name="'+item.keyname+'" data-tt-branch="false" statisticstype="1">'+
													'<td>'+item.keyid+'</td>'+
													'<td>'+item.keyname+'</td>'+
													'<td>测试</td>'+
													'<td>1</td>'+
													'<td><i class="fa fa-cog"></i>未采集</td>'+
													'<td>Agent采集</td>'+
													'<td class="dataips">'+item.ips[0].dataips+'</td>'+
													'<td class="datasize">'+item.datasize+'</td>'+
													'<td>-</td>'+
													'<td>-</td>'+
													'<td>-</td>'+
													'<td>2018-06-06 20:14:35</td>'+
													'<td>'+item.ips[0].recordtime+'</td>'+
												'</tr>';
									});
									$("#treeTable", $el).treetable("loadBranch", node, html);// 插入子节点
								}
								
							})
						}
					});
				})
			}
			function getIpsByApp(name) {
				return app.common.ajaxWithAfa({
					url:'LogStaticsAction_getMonInputByApp.do',
					data:{
						statisticstype: 2,
						timeInterval: 5,
						startNumber: 0,
						appName: name
					}
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			$("#treeTable", $el).on('click', 'tbody>tr', function(event) {
				event.preventDefault();
				if($(event.target).closest($('.indenter',$el)).length != 0){
					return;
				}

				var name = $(this).attr('name');
				var statisticstype = $(this).attr('statisticstype');
				var datasize = $(this).find('.datasize').text();
				var dataips = $(this).find('.dataips').text();
				onTreeTableSelect({
					name:name,
					dataips:dataips,
					datasize:datasize,
					statisticstype:statisticstype
				});
			});

			function onTreeTableSelect(data) {
				app.dispatcher.load({
					title: "应用日志详情",
					moduleId:"appLogTotal",
					section:["appMainView"],
					id:"",
					params:{
						data:data
					}
				})
			}

			/**
			 * 获取echartsLineOption
			 * @param  {string} title '单位：次'
			 * @param  {array} item  ['告警','预警']
			 * @param  {[type]} data  echarts数据
			 * @return {[type]} option      [description]
			 */
			function getLineOption(title,item,data) {
				var lineOption = {
						color: ['#5b62f9', '#fb8229', '#fa594d', '#0bbf46', '#3e7ad6'],
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
						series: []
				};
				var index = 0;
				var series = []
				for (var tmp in data) {
					if (tmp != 'xline') {
						series.push({
						 	name: item[index++],
							type: 'line',
							smooth: true,
							symbol: 'none',
							data: data[tmp]
						})
					}
				}
				lineOption.series = series;
				return lineOption;
			}
		},
		unload : function(handler) {
			eEvent && eEvent.dispose();
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});
