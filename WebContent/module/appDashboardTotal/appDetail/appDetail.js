define([], function() {
	return {
		load : function($el, scope, handler) {
			console.log(scope);
			let appId = scope.id;
			let timeSp = 10800000; //默认三小时间隔
			let interval = 1;	//默认分割 1min
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
			let softMap = app.domain.get('mapping','soft') || {};
			let listData = [];
			
			const sqlsMap = {
					soft:{
						group: '_head_.objectid',
						countTop: "*| select count(*) as count from applog-todayDate where _head_.type='B' group by  _head_.objectid, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5",
						timeTop: "*| select avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.objectid, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5",
						list: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.objectid, _head_.hostip order by count desc",
						dispather: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.objectid = 'p_item' group by _head_.objectid, _head_.hostip order by count desc"
					},
					ip:{
						group: '_head_.hostip',
						countTop: "*| select count(*) as count from applog-todayDate where _head_.type='B' group by  _head_.hostip, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5",
						timeTop: "*| select avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.hostip, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5",
						list: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.hostip, _head_.objectid order by count desc",
						dispather: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.hostip = 'p_item' group by _head_.hostip, _head_.objectid order by count desc"
					},
					source:{
						group: '_head_.sourceid',
						countTop: "*| select count(*) as count from applog-todayDate where _head_.type='B' group by  _head_.sourceid, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5",
						timeTop: "*| select avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.sourceid, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5",
						list: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B'  group by _head_.sourceid,_head_.objectid, _head_.hostip order by count desc",
						dispather: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.sourceid = 'p_item' group by _head_.sourceid,_head_.objectid, _head_.hostip order by count desc"
					},
					file:{
						group: '_head_.file.keyword',
						countTop: "*| select count(*) as count from applog-todayDate where _head_.type='B' group by  _head_.file.keyword, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5",
						timeTop: "*| select avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.file.keyword, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5",
						list: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B'  group by _head_.file.keyword，_head_.objectid, _head_.hostip order by count desc",
						dispather: "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' and _head_.file.keyword = 'p_item' group by _head_.file.keyword，_head_.objectid, _head_.hostip order by count desc"
					}
			};
			let countTop = sqlsMap[scope.typeEname]['countTop'];
			let timeTop = sqlsMap[scope.typeEname]['timeTop'];
			let listSql = sqlsMap[scope.typeEname]['list'];
			let groupBy = sqlsMap[scope.typeEname]['group'];
			let dispatherSql =  sqlsMap[scope.typeEname]['dispather'];
			
			
			let echarts_trade = app.echarts4.init($('#echarts_trade',$el)[0]);
			let columns = [{
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
				data: 'file',defaultContent: '',title: '文件',visible: scope.typeEname == 'file' ? true : false,
				render: function(data,type,row,meta){
					return row['_head_.file.keyword'];
				}
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
			},{
				data: '',defaultContent: '',title: '操作',
				render: function(data,type,row,meta){
					return '<span class="check-trade">查看交易</span>';
				}
			}];
			let list_table = $('#list_table',$el).DataTable({
        		"paging": true,
        		'sort': true,
				'searching'	: false,
				'pageLength': 10,
        		'columns': columns
        	});
			
		
			
			bindEvents();
			init();
			
			function init() {
				$('.app-name',$el).text(scope.name);
				$('.page-type',$el).attr('data-role',scope.type).text(scope.num);
				getList();
				getCountTop();
			}
			
			
			
			
			
			//交易量top
			function getCountTop() {
				getData(countTop).done(data => {
					drawTopEcharts(data.result.agg,groupBy,'count',echarts_trade,'笔');
				});
			}
			
			//耗时TOP
			function getTimeTop() {
				getData(timeTop).done(data => {
					drawTopEcharts(data.result.agg,groupBy,'avgTime',echarts_trade,'ms');
				});
			}
			
			//表格
			function getList() {
				list_table.clear().draw();
				listData.length = 0;
				getData(listSql).done(data => {
					let arr = data.result.agg;
					if(arr.length > 0){
						listData = arr;
						let ipArr = [],softArr = [];
						arr.forEach(item => {
							item.soft = item['_head_.objectid'];
							item.ip = item['_head_.hostip'];
							!ipArr.includes(item['_head_.hostip']) && ipArr.push(item['_head_.hostip']);
							!softArr.includes(item['_head_.objectid']) && softArr.push(item['_head_.objectid']);
						});
						list_table.rows.add(arr).draw();
						renderSelector(ipArr,softArr);
					}
					
				});
			}
			
			
			function renderSelector(ipArr,softArr) {
				let ipOptions = `<option value="">全部</option>`,softOptions = `<option value="">全部</option>`;
				ipArr.forEach(item => {ipOptions += `<option value="${item}">${item}</option>`;});
				softArr.forEach(item => {softOptions += `<option value="${item}">${item}</option>`;});
				$('#ip_selector',$el).html(ipOptions);
				$('#soft_selector',$el).html(softOptions);
			}
			
			
			
			function bindEvents() {
				$('#trade_ul>li',$el).on('click',function(){
					let index = $(this).index();
					index == 0 ? getCountTop() : getTimeTop();
				});
				
				//跳转详情
        		$el.on('click',function(){
        			$('.slide-modal',$el).removeClass('show');
        		});
        		$('.slide-modal',$el).on('click',function(e){
        			e.stopPropagation();
        		});
				$('#list_table',$el).on('click','tbody>tr',function(e){
					e.stopPropagation();
					if($(this).hasClass('active')){
						return;
					}
					$(this).addClass('active').siblings().removeClass('active');
					$('.slide-modal',$el).addClass('show');
					let data = list_table.row($(this)).data();
					let dataTypeMap = {
							soft: '_head_.objectid',
							ip: '_head_.hostip',
							source: '_head_.sourceid',
							file: '_head_.file.keyword'
					};
					let dataType = dataTypeMap[scope.typeEname];
					let param = data[dataType];
					if(scope.typeEname == 'file' && param.includes('/')){
						let sp = param.split('/');
						param = sp[sp.length - 1];
					}
					showComparePage(param);
				}).on('click','.check-item',function(e){
					e.stopPropagation();
					let className = $(this).hasClass('fa-check-square') ? 'fa fa-square-o check-item' : 'fa fa-check-square check-item checked';
					$(this).attr('class',className);
					renderCompareBtn();
				});
				
				//查看交易
				$('#list_table',$el).on('click','.check-trade',function(){
					let data = list_table.row($(this).closest('tr')).data()[groupBy];
					let today = new Date().Format('yyyyMMdd');
					let sql = dispatherSql.replace('p_item',data).replace('todayDate',today);
					app.dispatcher.load({
						title: "日志搜索",
						moduleId:"logResultCheck",
						section:'logSearchDetail',
						id: 'logSearchDetail' + new Date().getTime(),
						params:{
							param:{
								searchText: sql
							}
						},
						context: $el
					});
				});

				$('#ip_selector',$el).on('change',function(){
					let ip = $(this).val();
					let soft = $('#soft_selector',$el).val();
					let arr = listData.filter(item => { item.ip == ip && item.soft == soft});
					list_table.rows.add(arr).draw();
				});
				$('#soft_selector',$el).on('change',function(){
					let soft = $(this).val();
					let ip = $('#ip_selector',$el).val();
					let arr = listData.filter(item => { item.ip == ip && item.soft == soft});
					list_table.rows.add(arr).draw();
				});
				
			}
			
			function renderCompareBtn() {
				let checked = $('#list_table',$el).find('.checked').length;
				checked < 2 ? $('.btn-compare',$el).addClass('disabled') : $('.btn-compare',$el).removeClass('disabled');
			}
			
			function showComparePage(p) {
				app.dispatcher.load({
					title: "",
					moduleId:"appDashboardTotal",
					section:"comparePage",
					id:'comparePage'+app.global.getUniqueId(),
					frameRenderTo : '.slide-content',
					params:{
						type: scope.typeEname,
						sqlParam: p,
						cate1: scope.cate1,
						cate2: scope.cate2,
						cate3: scope.id
					}
				});
			}
			
			
			
			function getData(sql) {
        		let time = new Date().getTime();
        		let today = new Date(time).Format('yyyyMMdd');
        		let endTime = new Date(time).Format('yyyy-MM-dd hh:mm:ss');		
        		let startGetTime = time - timeSp;
        		let startTime = new Date(startGetTime).Format('yyyy-MM-dd hh:mm:ss');
        		sql = sql.replace('todayDate',today).replace('p_interval',interval+'m');
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
        	
        	//top5 echarts
        	function drawTopEcharts(datas,xKey,yKey,$echarts,unit) {
        		if(datas && datas.length > 0){
        			let datasMap = {},xData = [];
        			datas.forEach(item => {
        				if(!datasMap[item[xKey]]){
        					datasMap[item[xKey]] = [];
        				}
        				!xData.includes(item.time) && xData.push(item.time);
        				datasMap[item[xKey]].push(item[yKey]);
        			});
        			
        			let legend = [],series = [];
        			for(let i in datasMap){
        				legend.push({name: i});
        				series.push({
        					data: datasMap[i],
        					type: 'line',
        					name: i,
        					symbolSize: 0
        				});
        			}
        			drawBaseEcharts($echarts,unit,legend,xData,series);
        		}
        	}
			
        	function drawBaseEcharts($echarts,unit,legend,xData,series) {
        		xData = xData.map(item => new Date(item).Format('hh:mm'));
				let option = {
						color: ['#5b62f9', '#fb8229', '#fa594d', '#0bbf46', '#3e7ad6'],//#55a8fd
						legend: {
							show: true,
							right: 0,
							width: '90%',
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