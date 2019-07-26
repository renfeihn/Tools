define([ "jquery" ], function() {
	
	var eEvent;
	
	return {
		load : function($el, scope, handler) {
			var lineOption = {
					color: ['#5e63fd','#fc852f'],
					title: {
						show: false,
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
							max: 100,
							min: 0,
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
			var $dataTable = $("#dataTable", $el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'id', defaultContent : ''
				},{
					data : 'os_type', defaultContent : ''
				},{
					data : 'ip', defaultContent : ''
				},{
					data : 'host_name', defaultContent : ''
				},{
					data : 'processnum', defaultContent : ''
				},{
					data : 'pcpu', defaultContent : ''
				},{
					data : 'pmem', defaultContent : ''
				},{
					data : 'record_time', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						if(data){
							return new Date(data).Format('yyyy-MM-dd hh:mm:ss');
						}else{
							return '-';
						}
                    },
                    "targets" : 8
				}]
			});
			
			$('#dataTable', $el).on('click', 'tbody>tr', function(){
				var tr = $dataTable.row( this ).data();
				if(tr == undefined){
					return;
				}

				app.dispatcher.load({
					title: "代理监控详情",
					moduleId:"agentMonitor",
					section:["agentMonitorDetails"],
					id:"",
					params:{
						data:tr
					}
				});
			});

			/**
			 * 查询代理信息
			 * @param  {[type]} argument [description]
			 * @return {[type]}          [description]
			 */
			queryAgent();
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
					/*line1.push(parseInt(Math.random()*10));
					line2.push(parseInt(Math.random()*10));*/
					line1.push(0);
					line2.push(0);
				}
				var lineOp = $.extend(true, {}, lineOption);
				lineOp.series[0].data = line1.concat();
				lineOp.series[1].data = line2.concat();
				lineOp.xAxis[0].data = timeArr;
				var waringCount = line1.pop();
				$('#waringCount',$el).text(waringCount);
				var alarmCount = line2.pop();
				$('#alarmCount',$el).text(alarmCount);
				$('#eventNum',$el).text((waringCount+alarmCount)*3);
				eEvent.setOption(lineOp);
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