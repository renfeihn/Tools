define(['buss'],function(Buss){
	var timerMap = {
			collectTimer: null,
			countTimer: null,
			timeTimer: null,
			flowTimer: null,
			tradeApm: null
	};
    return {
        
        load:function($el,scope,handler){
          	//let buss = new Buss($("#layout", $el)[0]);
          	
          	//findPanel(100270);
          	async function findPanel(id) {
				var url = 'PanelChartAction_getAllByWhereEx.do';
				var whereEx = JSON.stringify({
					id
				});
				var ret = await ajaxWithAfa(url, {whereEx});
				var lists = ret.result;
				console.log(lists)
//				buss.addItem(JSON.parse(lists[0].config))
			}
          	
          	function ajaxWithAfa(url, data){
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: url,
						data: data
					}).done(function(content) {
						resolve(content);
					})
				});
			}
          	
          	
        	let params = scope.params;
        	//let echarts_event = app.echarts4.init($('#echarts_event',$el)[0]);
        	let echarts_count = app.echarts4.init($('#echarts_count',$el)[0]);
        	let echarts_time = app.echarts4.init($('#echarts_time',$el)[0]);
        	//let echarts_flow = app.echarts4.init($('#echarts_flow',$el)[0]);
        	
        	let echarts_app = app.echarts4.init($('#echarts_app',$el)[0]);
        	let echarts_ip = app.echarts4.init($('#echarts_ip',$el)[0]);
        	let echarts_source = app.echarts4.init($('#echarts_source',$el)[0]);
        	let echarts_file = app.echarts4.init($('#echarts_file',$el)[0]);
        	
        	app.echarts4.connect('group1');
        	
        	let cateParam = {
        			"category": {
        				"cate1": [],"cate2": [],"cate3": []
        			},
        			"app": {
        				"cate1": [{cateId: params.cate1}],
        				"cate2": [{cateId: params.cate2}],
        				"cate3": [{cateId: params.id}]
        			}
        	};
        	let sourceMap = {};
        	let softMap = {};
        	//let timeArr = [600000,1800000,3600000,21600000,43200000];
        	let timeSp = 10800000;
        	let interval = 1;
        	let refreshTimer = 60000;
        	
        	const countSql = "*| select count(*) from applog-todayDate where _head_.type='B' group by date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')";
        	const timeSql = "*| select avg(duration) from applog-todayDate where _head_.type='B' group by date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')";
        	const countRefreshSql = "*| select count(*) from applog-todayDate where _head_.type='B'";
        	const timeRefreshSql = "*| select avg(duration) from applog-todayDate where _head_.type='B'";
        	
        	const objNum = "*| select count(distinct(_head_.objectid)) as objNum,count(distinct(_head_.hostip)) as ipNum,count(distinct(_head_.sourceid)) as sourceNum,count(distinct(_head_.file.keyword)) as fileNum from applog-todayDate where _head_.type='B'";
        	
        	const appTop = "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.objectid order by count desc limit 5"; 
        	const ipTop = "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.hostip order by count desc limit 5";
        	const sourceTop = "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.sourceid order by count desc limit 5";
        	const fileTop = "*| select count(*) as count, max(duration) as maxTime, avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.file.keyword order by count desc limit 5";
        	
        	const appTopLine = "*|select avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.objectid, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5";
        	const ipTopLine = "*|select avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.hostip, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5";
        	const sourceTopLine = "*|select avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.sourceid, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5";
        	const fileTopLine = "*|select avg(duration) as avgTime from applog-todayDate where _head_.type='B' group by _head_.file.keyword, date_histogram(field='start','interval'=p_interval,'format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5";
        	
        	
        	let todayCount = [],yesterdayCount = [],todayTime = [],yesterdayTime = [];
        	let countSum = 0,avgTime = 0;
        	let yesterdayCountSum = 0,yesterdayAvgTime = 0;

        	
        	//应用软件
        	let app_table = $('#app_table',$el).DataTable({
        		"paging": false,
        		'sort': false,
				'searching'	: false,
				'pageLength': 5,
        		'columns': getColumn('软件程序')
        	});
        	
        	//ip
        	let ip_table = $('#ip_table',$el).DataTable({
        		"paging": false,
        		'sort': false,
				'searching'	: false,
        		'columns': getColumn('IP主机')
        	});
        	
        	//日志源
        	let source_table = $('#source_table',$el).DataTable({
        		"paging": false,
        		'sort': false,
				'searching'	: false,
        		'columns': getColumn('数据源')
        	});
        	
        	//日志文件
        	let file_table = $('#file_table',$el).DataTable({
        		"paging": false,
        		'sort': false,
				'searching'	: false,
        		'columns': getColumn('日志文件')
        	});
        	
        	getAppMap();
        	getAllSource();
        	init();
        	bindEvents();
        	
        	//采集信息文字
        	$('.app-name',$el).text(params.name);
    		renderCollection(params.id);
    		
    		//采集流量
    		getFlows();
    		timerMap.flowTimer = handler.setInterval(() => {
    			getFlows();
    		},60000)
        	
        	function init() {

    			for(let i in timerMap){
    				timerMap[i] && handler.clearInterval(timerMap[i]);
    				timerMap[i] = null;
    			}
    			
    			todayCount = [];yesterdayCount = [];todayTime = [];yesterdayTime = [];
            	countSum = 0;avgTime = 0;
            	yesterdayCountSum = 0;yesterdayAvgTime = 0;
    			
    			
        		//已监控对象
        		getSum(objNum).done(data => {
        			let agg = data.result.agg;
        			if(agg.length > 0){
        				for(let i in agg[0]){
        					$('.'+i,$el).text(parseInt(agg[0][i]));
        				}
        			}
        		});
        		  		
        		//当日总交易量
        		getTodayCountSum();
        		
        		//平均耗时
        		getTodayTime();
        		
        		//交易趋势
        		drawTradeCount();
        		
        		//耗时趋势
        		drawTradeTime();
        		
        		
        		drawAppTopTable();
        		drawIpTopTable();
        		drawSourceTopTable();
        		drawFileTopTable();
        		
        		drawAppTopEcharts();
        		drawIpTopEcharts();
        		drawSourceTopEcharts();
        		drawFileTopEcharts();
        		
        		timerMap.tradeApm = handler.setInterval(() => {
        			drawTradeCount();
        			drawTradeTime();
        			
        			getTodayCountSum();
        			getTodayTime();
        			
        			drawAppTopTable();
            		drawIpTopTable();
            		drawSourceTopTable();
            		drawFileTopTable();
            		
            		drawAppTopEcharts();
            		drawIpTopEcharts();
            		drawSourceTopEcharts();
            		drawFileTopEcharts();
        		},refreshTimer);	
        	}
    		

        	function bindEvents() {
        		
        		//选择时间周期
        		$('.time-circle>span',$el).on('click',function(){
        			$(this).addClass('active').siblings().removeClass('active');
        			let activeTime = Number($(this).attr('data-time'));
        			let interval = Number($(this).attr('data-interval'));
        			let nowTime = new Date().getTime();
        			let thisZeroTime = new Date(new Date().Format('yyyy-MM-dd 00:00:00')).getTime();
        			timeSp = nowTime - thisZeroTime > activeTime ? activeTime : (nowTime - thisZeroTime);
        			refreshTimer = 60000 * interval;
        			init();
        		});
        		
        		//表格 echarts 切换
        		$('.title-operate>span',$el).on('click',function(){
        			if($(this).hasClass('active')){
        				return;
        			}
        			$(this).addClass('active').siblings().removeClass('active');
        			let type = $(this).attr('data-type');
        			let $p = $(this).closest('section');
        			$('div[data-type="'+type+'"]',$p).addClass('show').siblings().removeClass('show');
        		});
        		
        		//跳转详情
        		$el.on('click',function(){
        			$('.slide-modal',$el).removeClass('show');
        		});
        		$('.slide-modal',$el).on('click',function(e){
        			e.stopPropagation();
        		});
        		$('.btn-detail',$el).on('click',function(e){
        			e.stopPropagation();
        			
        			if($(this).hasClass('trade-compare')){
        				$('.slide-modal',$el).addClass('show');
        				app.dispatcher.load({
        					title: "",
        					moduleId:"appDashboardTotal",
        					section:"comparePage",
        					id:'comparePage'+app.global.getUniqueId(),
        					frameRenderTo : '.slide-content',
        					params:{
        						
        					}
        				});
        			}else{
        				let data = $(this).attr('data-type').split('-');
        				app.dispatcher.load({
        					title: params.name+'-'+data[0]+"-详情",
        					moduleId:"appDashboardTotal",
        					section:"appDetail",
        					id:'appDetail'+app.global.getUniqueId(),
        					params:{
        						id: params.id,
        						name: params.name,
        						type: data[0],
        						typeEname: $(this).attr('data-ename'),
        						num: $('.'+data[1],$el).text(),
        						cate1: params.cate1,
        						cate2: params.cate2
        					}
        				});
        				
        			}
        		});
        	}
        	
        	
        	function getColumn(name) {
        		let column = [{
        			data: 'index',defaultContent: '',title: '序号',
        			render: function(data,type,row,meta){
        				return (meta.row + 1);
        			}
        		},{
        			data: 'name',defaultContent: '',title: name,
        			render: function(data,type,row,meta){
        				return softMap[data] || data;
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
        		}];
        		return column;
        	}
        	
        	
        	//昨日同比
        	function compareData(today,yesterday,className) {
        		if(today == 'NaN' || yesterday == 'NaN'){
        			$('.'+className,$el).html('-');
        			return;
        		}else if(yesterday == 0){
        			$('.'+className,$el).html(today+'% <i class="${flag}"></i>');
        			return;
        		}
        		
        		let sp = today - yesterday;
        		let flag = sp > 0 ? 'up' : 'down';
        		let rate = (Math.abs(today - yesterday)/yesterday * 100).toFixed(2) + '%';
        		let html = rate == 'NaN%' ? '' : (rate + `<i class="${flag}"></i>`);
        		$('.'+className,$el).html(html);	
        	}
        	
        	
        	//应用程序映射
        	function getAppMap() {
        		return new Promise(resolve => {
        			app.common.ajaxWithAfa({
        				url: 'LogStaticsAction_getAppIdMapping.do',
        				data: {}
        			}).done(function (data) {
        				softMap = JSON.parse(JSON.stringify(data.result));
        				app.domain.exports('mapping',{
        					soft: softMap
        				});
        				resolve(data);
        			});
        		});
    		}
        	
        	//日志源映射
        	function getAllSource() {
        		return new Promise(resolve => {
        			app.common.ajaxWithAfa({
        				url: 'LogCfgSourceAction_getSouceListByCfg.do',
        				data: {
        					queryvalue: '应用群组',
        					querytype: 'A1'
        				}
        			}).done(function (data) {
        				data.result.forEach(item => {
        					sourceMap[item.sourceId] = item.sourceName;
        				});
        				resolve(data);
        			});
        		});
        	}
        	
        	
        	//当日总交易量  昨日同比
        	function getTodayCountSum(){
        		getSum(countSql).done(data => {
        			let arr = data.result.agg;
        			arr.forEach(item => {
        				countSum += Number(item['COUNT(*)']);
        			});
        			$('span[data-role="当日总交易量"]',$el).text(countSum.toLocaleString());
        			
        			//昨日交易总量
            		getSum(countSql,true).done(data => {
            			let arr = data.result.agg;
            			arr.forEach(item => {
            				yesterdayCountSum += Number(item['COUNT(*)']);
            			});
            			compareData(countSum,yesterdayCountSum,'compare-count');
            		});
        			
        		});
        	}
        	
        	//平均耗时 昨日同比
        	function getTodayTime() {
        		getSum(timeSql).done(data => {
        			let arr = data.result.agg;
        			if(arr.length == 0){
        				return
        			}
        			let totalTime = 0;
        			arr.forEach(item => {
        				let time = item['AVG(duration)'] == 'NaN' ? 0 : Number(item['AVG(duration)']);
        				totalTime += time;
        			});
        			avgTime = (totalTime/arr.length).toFixed(2);
        			let avgTimeText = avgTime > 1000 ? (avgTime/1000).toFixed(2) + 's' : avgTime + 'ms';
        			avgTime > 60000 ? $('span[data-role="当日平均耗时"]',$el).addClass('red') : $('span[data-role="当日平均耗时"]',$el).removeClass('red');
        			$('span[data-role="当日平均耗时"]',$el).text(avgTimeText);
        			
        			getSum(timeSql,true).done(data => {
            			let arr = data.result.agg;
            			let totalTime = 0;
            			arr.forEach(item => {
            				let time = item['AVG(duration)'] == 'NaN' ? 0 : Number(item['AVG(duration)']);
            				totalTime += time;
            			});
            			yesterdayAvgTime = (totalTime/arr.length).toFixed(2);
            			compareData(avgTime,yesterdayAvgTime,'compare-time');
            		});
        			
        		});
        	}
        	
        	//交易量趋势
        	function drawTradeCount() {
        		drawEcharts({
            		sql: countSql,
            		refreshSql: countRefreshSql,
            		kpi: 'COUNT(*)',
            		names: ['今日交易量','昨日交易量'],
            		unit: '笔',
            		title: '实时交易量',
            		echartsObj: echarts_count,
            		timer: 'countTimer',
            		todayData: todayCount,
            		yesterdayData: yesterdayCount,
//            		refreshFn: function(data){
//            			countSum += Number(data.today);
//            			yesterdayCountSum += Number(data.yesterday);
//            			$('span[data-role="当日总交易量"]',$el).text(countSum);
//            			compareData(countSum,yesterdayCountSum,'compare-count');
//            		}
            	});
        	}
        	
        	function drawTradeTime() {
        		drawEcharts({
            		sql: timeSql,
            		refreshSql: timeRefreshSql,
            		kpi: 'AVG(duration)',
            		names: ['今日耗时','昨日耗时'],
            		unit: 'ms',
            		title: '1分钟平均耗时',
            		echartsObj: echarts_time,
            		timer: 'timeTimer',
            		todayData: todayTime,
            		yesterdayData: yesterdayTime,
//            		refreshFn: function(data){
//            			let date = new Date();
//            			let now = new Date(date.Format('yyyy-MM-dd hh:mm:00')).getTime();
//            			let zero = new Date(date.Format('yyyy-MM-dd 00:00:00')).getTime();
//            			let times = (now - zero)/60000;
//            			avgTime = ((times - 1) * avgTime + Number(data.today))/times;
//            			yesterdayAvgTime = ((times - 1) * yesterdayAvgTime + Number(data.yesterday))/times;
//            			let avgTimeText = avgTime > 1000 ? (avgTime/1000).toFixed(2) + 's' : avgTime.toFixed(2) + 'ms';
//            			avgTime > 60000 ? $('span[data-role="当日平均耗时"]',$el).addClass('red') : $('span[data-role="当日平均耗时"]',$el).removeClass('red');
//            			$('span[data-role="当日平均耗时"]',$el).text(avgTimeText);
//            			compareData(avgTime,yesterdayAvgTime,'compare-time');
//            		}
            	});
        	}
        	
        	//appTop5 table
        	function drawAppTopTable() {
        		app_table.clear().draw();
        		getData(appTop,'today').done(data => {
        			let arr = data.result.agg;
        			if(arr.length > 0){
        				arr.map(item => item.name = item['_head_.objectid']);
        				app_table.rows.add(arr).draw();
        			}
        		});
        	}
        	
        	//appTop5 echarts
        	function drawAppTopEcharts() {
        		getData(appTopLine,'today').done(data => {
        			drawTopEcharts(data.result.agg,'_head_.objectid','avgTime',echarts_app);
        		});
        	}
        	
        	
        	//ipTop5 table
        	function drawIpTopTable() {
        		ip_table.clear().draw();
        		getData(ipTop,'today').done(data => {
        			let arr = data.result.agg;
        			if(arr.length > 0){
        				arr.map(item => item.name = item['_head_.hostip']);
        				ip_table.rows.add(arr).draw();
        			}
        		});
        	}
        	
        	//ipTop5 echarts
        	function drawIpTopEcharts() {
        		getData(ipTopLine,'today').done(data => {
        			drawTopEcharts(data.result.agg,'_head_.hostip','avgTime',echarts_ip);
        		});
        	}
        	
        	
        	//sourceTop5 table
        	function drawSourceTopTable() {
        		source_table.clear().draw();
        		getData(sourceTop,'today').done(data => {
        			let arr = data.result.agg;
        			if(arr.length > 0){
        				arr.map(item => item.name = sourceMap[item['_head_.sourceid']]);
        				source_table.rows.add(arr).draw();
        			}
        		});
        	}
        	
        	//sourceTop5 echarts
        	function drawSourceTopEcharts() {
        		getData(sourceTopLine,'today').done(data => {
        			drawTopEcharts(data.result.agg,'_head_.sourceid','avgTime',echarts_source);
        		});
        	}

        	
        	//fileTop5 table
        	function drawFileTopTable() {
        		file_table.clear().draw();
        		getData(fileTop,'today').done(data => {
        			let arr = data.result.agg;
        			if(arr.length > 0){
        				arr.map(item => item.name = item['_head_.file.keyword']);
        				file_table.rows.add(arr).draw();
        			}
        		});
        	}
        	
        	//fileTop5 echarts
        	function drawFileTopEcharts() {
        		getData(fileTopLine,'today').done(data => {
        			drawTopEcharts(data.result.agg,'_head_.file.keyword','avgTime',echarts_file);
        		});
        	}
        	
        	
        	function getSum(sql,yesterday) {
        		let date = new Date();
        		if(yesterday){
        			date = new Date(date.getTime() - 86400000);
        		}
        		let today = date.Format('yyyyMMdd');
        		let startTime = date.Format('yyyy-MM-dd 00:00:00');
        		let endTime = date.Format('yyyy-MM-dd hh:mm:ss');
        		sql = sql.replace('todayDate',today).replace('p_appId',params.id).replace('p_interval',interval+'m');
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
        	
        	function renderCollection(id) {
        		getCollection(id);
        		timerMap.collectTimer = handler.setInterval(() => {
        			getCollection(id);
        		},60000);
        	}
        	
        	//采集信息
        	function getCollection(id) {
        		app.common.ajaxWithAfa({
    				url: 'LogStaticsAction_getMonInputByKeyIds.do',
    				data: {
    					statisticstype: 2,
    					timeInterval: 5,
    					startNumber: 0,
    				}
    			}).done(function (data) {
    				var result = data.result;
    				let info = result.filter(item => item.keyid == params.id);
    				//$('.data-speed',$el).text(info[0]['dataips'] + 'kb/s');
    				$('.data-size',$el).text((Number(info[0]['datasize'])/1024).toFixed(2) + 'MB');
    			})
        	}
        	
        	//top5 echarts
        	function drawTopEcharts(datas,xKey,yKey,$echarts) {
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
        			
        			
        			drawBaseEcharts($echarts,'ms',legend,xData,series);
        		}
        	}
        	
        	//昨日双曲线
        	function drawEcharts(params) {
        		$.when(getData(params.sql,'today'),getData(params.sql,'yesterday')).done((data1,data2) => {
        			let today = data1.result.agg;
        			let yesterday = data2.result.agg;
        			let kpi = params.kpi;
        			let base = today.length >= yesterday.length ? today : yesterday;
        			let baseText = today.length >= yesterday.length ? 'today' : 'yesterday';
        			let xData = [];
        			let fixed = params.title == '实时交易量' ? 0 : 2;
        			base.forEach((item,index) => {
        				xData.push(item['time']);
        				if(baseText == 'today'){
        					let todayArr = item[kpi] ? Number(item[kpi]).toFixed(fixed) : '';
        					let yesterdayArr = yesterday[index] ? Number(yesterday[index][kpi]).toFixed(fixed) : '';
        					params.todayData.push(todayArr);
        					params.yesterdayData.push(yesterdayArr);
        				}else{
        					let yesterdayArr = item[kpi] ? Number(item[kpi]).toFixed(fixed) : '';
        					let todayArr = today[index] ? Number(today[index][kpi]).toFixed(fixed) : '';
        					params.todayData.push(todayArr);
        					params.yesterdayData.push(yesterdayArr);
        				}
        			});
        			
        			let legend = [{name: params.names[0]},{name: params.names[1]}];
        			let yData = [{
				        data: params.todayData,type: 'line',name: params.names[0],symbolSize: 0
				    },{
				        data: params.yesterdayData,type: 'line',name: params.names[1],symbolSize: 0
				    }];
        			
        			let nowData = Number(params.todayData[params.todayData.length - 1]);

        			$('span[data-role="'+params.title+'"]',$el).text(nowData.toFixed(fixed));
        			if(params.title == '1分钟平均耗时'){
        				let avgTimeText = nowData > 1000 ? (nowData/1000).toFixed(2) + 's' : nowData.toFixed(2) + 'ms';
        				nowData > 60000 ? $('span[data-role="1分钟平均耗时"]',$el).addClass('red') : $('span[data-role="当日平均耗时"]',$el).removeClass('red');
        				$('span[data-role="'+params.title+'"]',$el).text(avgTimeText);
        			}
        			drawBaseEcharts(params.echartsObj,params.unit,legend,xData,yData);
        			
        			
//        			timerMap[params.timer] = handler.setInterval(() => { 
//        				refreshEcharts(params,legend,xData,yData);
//        			},refreshTimer);
        			
        		});
        	}
        	
        	
        	function refreshEcharts(params,legend,xData,yData) {
        		$.when(getData(params.refreshSql,'today','refresh'),getData(params.refreshSql,'yesterday','refresh')).done((data1,data2) => {
        			let today = data1.result.agg;
        			let yesterday = data2.result.agg;
        			let kpi = params.kpi;
        			let time = xData[xData.length - 1];
        			let getTime = new Date(time).getTime() + 60000;
        			let fixed = params.title == '实时交易量' ? 0 : 2;
        			let todayThisMinute = today[0] && Number(today[0][kpi]).toFixed(fixed);
        			let yesterdayThisMinute = yesterday[0] && Number(yesterday[0][kpi]).toFixed(fixed);
        			xData.push(new Date(getTime).Format('yyyy-MM-dd hh:mm:ss'));
        			yData[0].data.push(todayThisMinute);
        			yData[1].data.push(yesterdayThisMinute);
        			
        			if(xData.length > 120){
        				xData.shift();
        				yData[0].data.shift();
        				yData[1].data.shift();
        			}
        			$('span[data-role="'+params.title+'"]',$el).text(todayThisMinute);
        			if(params.title == '1分钟平均耗时'){
        				let avgTimeText = todayThisMinute > 1000 ? (todayThisMinute/1000).toFixed(2) + 's' : Number(todayThisMinute).toFixed(2) + 'ms';
        				todayThisMinute > 60000 ? $('span[data-role="1分钟平均耗时"]',$el).addClass('red') : $('span[data-role="当日平均耗时"]',$el).removeClass('red');
        				$('span[data-role="'+params.title+'"]',$el).text(avgTimeText);
        			}
        			drawBaseEcharts(params.echartsObj,params.unit,legend,xData,yData);
        			params.refreshFn && params.refreshFn({today: todayThisMinute,yesterday: yesterdayThisMinute});
        		});
        	}
        	
        	
        	function getData(sql,day,refresh) {
        		let time;
        		if(day == 'today'){
        			time = new Date().getTime();
        		}else{
        			time = new Date().getTime() - 86400000;
        		}
        		let today = new Date(time).Format('yyyyMMdd');
        		let endTime = new Date(time).Format('yyyy-MM-dd hh:mm:ss');
        		let before = refresh ? 60000 : timeSp;		
        		let startGetTime = time - before;
        		let startTime = new Date(startGetTime).Format('yyyy-MM-dd hh:mm:ss');
        		sql = sql.replace('todayDate',today).replace('p_appId',params.id).replace('p_interval',interval+'m');
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
        	
        	function getFlows() {
				return app.common.ajaxWithAfa({
					url: "LogStaticsAction_getAppIps.do",
					data: {
						singleKeyid: params.id,
						statisticstype: 2,
						intervalMinute: 60,
						intervalSecond: 60
					}
				}).done(function(data) {
					let arr = data.result[params.id];
					if(arr && arr.length > 0){
//						let xData = arr.map(item => item.recordtime);
						let yData = arr.map(item => item.dataips);
//						let series = [{data: yData,type: 'line',name: '采集速度',symbolSize: 0}]
//						drawBaseEcharts(echarts_flow,'KB/S',[{name: '采集速度'}],xData,series);
						$('.data-speed',$el).text(yData[yData.length - 1] + 'kb/s');
					}
				});
			}
        	
        	function drawBaseEcharts($echarts,unit,legend,xData,series) {
        		xData = xData.map(item => new Date(item).Format('hh:mm'));
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
				$echarts.group = 'group1';
				$echarts.setOption(option);
			}
        	
		},
		
		unload:function(handler){
			for(let i in timerMap){
				handler.clearInterval(timerMap[i]);
				timerMap[i] = null;
			}
        },
        
        pause:function($el,scope,handler){
        	
		},
		
		resume:function($el,scope,handler){
       
		}
		
	}
});
