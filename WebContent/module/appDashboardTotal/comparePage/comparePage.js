define([], function() {
	return {
		load : function($el, scope, handler) {
			console.log(scope);
			
			let echarts_trade = app.echarts4.init($('#echarts_trade',$el)[0]);
			let echarts_time = app.echarts4.init($('#echarts_time',$el)[0]);
			app.echarts4.connect('group2');
			
			let softMap = app.domain.get('mapping','soft') || {};
			let cateParam = {
        			"category": {
        				"cate1": [],"cate2": [],"cate3": []
        			},
        			"app": {
        				"cate1": [{cateId: scope.cate1}],
        				"cate2": [{cateId: scope.cate2}],
        				"cate3": [{cateId: scope.id}]
        			}
        	};
			const sqlsMap = {
					soft:{
						line: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.objectid = p_id  group by date_histogram(field='start','interval'='1m','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')",
						list: "*|select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.objectid = p_id  group by _head_.sourceid, _head_.hostip, date_histogram(field='start','interval'='1d','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')"
						//list: "*|select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.objectid = p_id  group by date_histogram(field='start','interval'='1d','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')"
					},
					ip:{
						line: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.hostip = p_id  group by date_histogram(field='start','interval'='1m','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')",
						list: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.hostip = p_id  group by _head_.sourceid,_head_.objectid, date_histogram(field='start','interval'='1d','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')"
						//list: "*|select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.hostip = p_id  group by date_histogram(field='start','interval'='1d','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')"
					}, 
					source:{
						line: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.sourceid = p_id  group by date_histogram(field='start','interval'='1m','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')",
						list: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.sourceid = p_id  group by _head_.objectid, _head_.hostip, date_histogram(field='start','interval'='1d','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')"
						//list: "*|select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.sourceid = p_id  group by date_histogram(field='start','interval'='1d','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')"
					},
					file:{
						line: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.file.keyword like '%p_id%'  group by date_histogram(field='start','interval'='1m','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')",
						list: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.file.keyword like '%p_id%'  group by _head_.sourceid,_head_.objectid, _head_.hostip, date_histogram(field='start','interval'='1d','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')"
						//list: "*|select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.file.keyword like '%p_id%'  group by date_histogram(field='start','interval'='1d','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')"
					}
			};
			
			
			let type = scope.type;
			let sqlParam = scope.sqlParam;
			let listSql = sqlsMap[type]['list'];
			let lineSql = sqlsMap[type]['line'];
			
			let days_table = $('#days_table',$el).DataTable({
        		"paging": false,
        		'sort': false,
				'searching'	: false,
				'pageLength': 10,
        		'columns': [{
        			data: 'index',defaultContent: '',title: '序号',
        			render: function(data,type,row,meta){
        				return '<i class="fa fa-square-o check-item"> ' + (meta.row + 1);
        			}
        		},{
        			data: 'soft',defaultContent: '',title: '软件',
        			render: function(data,type,row,meta){
        				return softMap[data] || data;
        			}
        		},{
        			data: 'ip',defaultContent: '',title: 'IP'
        		},{
        			data: 'time',defaultContent: '',title: '日期'
        		},{
        			data: 'count',defaultContent: '',title: '当日交易量',
        			render: function(data,type,row,meta){
        				return data && parseInt(data).toLocaleString();
        			}
        		},{
        			data: 'avgTime',defaultContent: '',title: '平均交易耗时',
        			render: function(data,type,row,meta){
        				let num = '';
        				if(data < 1000){
        					num = Number(data).toFixed(2) + 'ms';
        				}else{
        					num = (Number(data)/1000).toFixed(2);
        					num = num >= 60 ? '<i class="red">'+num+'s</i>' : num + 's';
        				}
        				return num;
        			}
        		},{
        			data: 'maxTime',defaultContent: '',title: '最大交易耗时',
        			render: function(data,type,row,meta){
        				let num = '';
        				if(data < 1000){
        					num = parseInt(data) + 'ms';
        				}else{
        					num = (parseInt(data)/1000).toFixed(2);
        					num = num >= 60 ? '<i class="red">'+num+'s</i>' : num + 's';
        				}
        				return num;
        			}
        		}]
        	});

			
			bindEvents();
			function bindEvents() {
				$('#days_table',$el).on('click','tbody>tr',function(){
					$(this).toggleClass('active');
					let className = $(this).hasClass('active') ? 'fa fa-check-square check-item' : 'fa fa-square-o check-item';
					$(this).find('.check-item').attr('class',className);
					let checked = getChecked();
					checked && drawDaysLine(checked);
				});
			}
			
			
			getList();
			function getList() {
				let e = new Date().Format('yyyy-MM-dd hh:mm:ss');
				let s = new Date(new Date().getTime() - (86400000 * 7)).Format('yyyy-MM-dd 00:00:00');
				getData(listSql,s,e).done(data => {
					let arr = data.result.agg;
					if(arr.length > 0){
						arr = arr.reverse();
						arr.forEach(item => {
							item.soft = item['_head_.sourceid'];
							item.ip = item['_head_.hostip'];
						});
						days_table.rows.add(arr).draw();
						$('#days_table tbody>tr:eq(0) .check-item',$el).trigger('click');
					}
				});
			}
			
//			drawBaseEcharts(echarts_trade,'笔',[{name:'交易量'}],['08:00','09:00','10:00','11:00','12:00'],[{name:'交易量',type:'line',data:[10,20,20,20,30]}]);
//			drawBaseEcharts(echarts_time,'ms',[{name:'耗时'}],['08:00','09:00','10:00','11:00','12:00'],[{name:'耗时',type:'line',data:[10,20,20,20,30]}]);
	
			
			function getChecked() {
				let checked = $('#days_table tr.active',$el);
				if(checked.length == 0){
					return;
				}
				return Array.from(checked).map(item => $(item).find('td:eq(3)').text());
			}
			
			function getOneDayData(startTime) {
				let day = new Date(startTime).Format('yyyy-MM-dd');
				let nowTime = new Date().Format('hh:mm:ss');
				let endTime = day + ' ' + nowTime;
				return new Promise(resolve => {
					getData(lineSql,startTime,endTime).done(data => {
						resolve(data);
					});
				});
			}
			
			function drawDaysLine(checked) {
				let promises = checked.map(item => {
					return getOneDayData(item);
				});
				Promise.all(promises).then(datas => {
					console.log(datas);
					drawLines(datas);
				});
			}
			
			function drawLines(datas) {
				if(datas.length == 0 || datas.every(item => item.result.agg.length == 0)){
					return;
				}
				let maxArr = datas.map((item,index) => item.result.agg.length);
				let max = Math.max(...maxArr);
				let maxIndex = maxArr.findIndex(item => item == max);
				let times = datas[maxIndex].result.agg.map(item => item.time);
				let daysArr = [];
				let countSeries = [],countLegends = [],timeSeries = [],timeLegends = [];
				datas.forEach((item,index) => {
					let dataMap = {};
					let day = item.result.agg[0]['time'] && new Date(item.result.agg[0]['time']).Format('yyyy-MM-dd');
					new Array(times.length).fill('').forEach((item,index) =>{
						let key = new Date(times[index]).Format('hh:mm');
						dataMap[key] = {
								count: '',
								avgTime: '',
								day: day 
						};
					});
					item.result.agg.forEach((it,ind) => {
						let thisTime = new Date(it.time).Format('hh:mm');
						dataMap[thisTime]  && (dataMap[thisTime]['count'] = it.count);
						dataMap[thisTime]  && (dataMap[thisTime]['avgTime'] = it.count);
					});
					daysArr.push(dataMap);
				});
				
				
				daysArr.forEach((m,n) => {
					let countData = Object.values(m).map(mm => mm.count);
					let timeData = Object.values(m).map(mm => mm.avgTime);
					let day = Object.values(m)[0]['day'];
					countSeries.push({
						name: day,
						type: 'line',
						data: countData,
						symbolSize: 0,
					});
					timeSeries.push({
						name: day,
						type: 'line',
						data: timeData,
						symbolSize: 0,
					});
					countLegends.push({
						name: day
					});
					timeLegends.push({
						name: day
					});
				});
				let xData = times.map(item => new Date(item).Format('hh:mm'));
				drawBaseEcharts(echarts_trade,'笔',countLegends,xData,countSeries);
				drawBaseEcharts(echarts_time,'ms',timeLegends,xData,timeSeries);
				
			}
			
			function getData(sql,startTime,endTime) {
        		let today = new Date().Format('yyyyMMdd');
        		sql = sql.replace('todayDate',today).replace('p_id',sqlParam);
        		let p = {
        				search: sql,
        				startTime: startTime,
        				endTime: endTime,
        				cate: JSON.stringify(cateParam),
        				logType: 1,
        				size: 10,
        				from: 0
        		};
        		return sqlSearch(p);
        	}
        	
        	function sqlSearch(urlData) {
    			return app.common.ajaxWithAfa({
    				url:'ESSearchAction_sqlSearchWithAggregationsParse.do',
    				data:urlData
    			}).done(function (data) {
    				var result = data.result;
    				return $.Deferred().resolve(data);
    			})
    		}
			
			function drawBaseEcharts($echarts,unit,legend,xData,series) {
        		//xData = xData.map(item => new Date(item).Format('hh:mm'));
				let option = {
						color: ['#5b62f9', '#fb8229', '#fa594d', '#0bbf46', '#3e7ad6'],//#55a8fd
						legend: {
							show: true,
							right: 0,
							type: 'scroll',
							data: legend
						},
						title: {
							text: '单位: '+unit,
							textStyle: {
								fontweight: 'normal',
								fontSize: '12px'
							}
						},
						tooltip: {
							show: true,
							trigger: 'axis'
						},
					    xAxis: {
					        type: 'category',	
					        boundaryGap: false,
					        axisLabel: {
					        	color: '#5c5a66'
					        },
					        axisLine: {
					        	lineStyle: {
					        		color: '#5c5a66',
					        		width: 2
					        	}
					        },
					        data: xData
					    },
					    yAxis: {
					        type: 'value',
					        splitLine: {
					        	show: true,
					        	lineStyle: {
					        		color: '#ccc',
					        		type: 'solid'
					        	}
					        },
					        axisLine: {
					        	show: false,
					        },
					        axisTick: {
					        	show: false
					        },
					        axisLabel: {
					        	color: '#5c5a66'
					        },
					    },
					    grid: {
					    	top:30,
					    	right: 0,
					    	bottom: 0,
					    	left: 0,
					    	containLabel: true
					    },
					    series: series
					};
				$echarts.clear();
				$echarts.group = 'group2';
				$echarts.setOption(option);
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