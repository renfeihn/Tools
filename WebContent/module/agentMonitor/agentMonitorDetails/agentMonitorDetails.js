define([ "jquery" ], function() {

	//echarts对象
	var eEvent,eCpu,eMem;
	
	return {
		load : function($el, scope, handler) {
			var param = scope.data;
			$('#version', $el).attr('beforeContent', param.os_type).text('');
			$('#ip', $el).text(param.ip||'-');
			$('#agentName', $el).text(param.host_name||'-');
			$('#keyBufferRate', $el).text((param.processnum||0)+'个');
			if(param.record_time){
				$('#queryCacheRate', $el).text(new Date(param.record_time).Format('yyyy-MM-dd hh:mm:ss'));
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
					/*line1.push(parseInt(2+Math.random()*2));
					line2.push(parseInt(Math.random()*2));*/
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

			function drawCpu(line1, timeArr) {
				eCpu && eCpu.dispose();
				eCpu = app.echarts.init($('#eCpu',$el)[0]);
				var lineOp = $.extend(true, {}, lineOption);
				lineOp.series[0].name = 'cpu';
				lineOp.legend.data = ['cpu'];
				lineOp.series[0].data = line1;
				lineOp.series.pop();
				lineOp.xAxis[0].data = timeArr;
				lineOp.title.text = '单位：%';
				lineOp.yAxis[0].max = 100;
				if(line1 && line1.length>0){
					var cpu = line1[line1.length - 1];
					$('#cpu',$el).text(cpu+'%');
				}else{
					$('#cpu',$el).text('- %');
				}
				
				eCpu.setOption(lineOp);
			}

			function drawMem(line1, timeArr) {
				eMem && eMem.dispose();
				eMem = app.echarts.init($('#eMem',$el)[0]);
				var lineOp = $.extend(true, {}, lineOption);
				lineOp.series[0].name = 'mem';
				lineOp.legend.data = ['mem'];
				lineOp.series[0].data = line1;
				lineOp.series.pop();
				lineOp.xAxis[0].data = timeArr;
				lineOp.title.text = '单位：%';
				lineOp.yAxis[0].max = 100;
				if(line1 && line1.length>0){
					var mem = line1[line1.length - 1];
					$('#mem',$el).text(mem+'%');
				}else{
					$('#mem',$el).text('- %');
				}
				eMem.setOption(lineOp);
			}

			$el.click(function(e){
				if($(e.target).closest($('#dateSetectWarp', $el)).length == 0 && !$(e.target).is("th,i,tr") && $(e.target).closest($('.daterangepicker', $el)).length == 0){
					$('#dateSetectContent', $el).hide();
				}
			});
			//下拉框选择后换算时间
			function getQuickTimeAndDate(name){
				var time_func = {
					"today":(function(){
						var now = new Date();
						return {
							sDate:now.Format("yyyy-MM-dd") + " 00:00:00",
							eDate:now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(),
					"oneMinute":(function(){
						var now = new Date();
						var time = now.getTime() - 1 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(),
					"fiveMinute":(function(){
						var now = new Date();
						var time = now.getTime() - 5 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(),
					"fifteenMinute":(function(){
						var now = new Date();
						var time = now.getTime() - 15 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(),
					"oneHour":(function(){
						var now = new Date();
						var time = now.getTime() - 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(),
					"fourHour":(function(){
						var now = new Date();
						var time = now.getTime() - 4 * 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(),
					"twelveHour":(function(){
						var now = new Date();
						var time = now.getTime() - 12 * 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(),
					"oneDay":(function(){
						var now = new Date();
						var time = now.getTime() - 24 * 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})(),
					"oneWeek":(function(){
						var now = new Date();
						var time = now.getTime() - 7 * 24 * 60 * 60 * 1000;
						return {
							sDate: new Date(time).Format("yyyy-MM-dd hh:mm:ss"),
							eDate: now.Format("yyyy-MM-dd hh:mm:ss")
						}
					})()
				};
				return  time_func[name];
			}

			$('.AMAgentMonitorDetails-dateRangeChooseBtn', $el).on('click', function(event) {
				$('#dataRangeSetectBtn', $el).click();
			});
			$('#dataRangeSetectBtn', $el).on('click', function(event) {
				var index = $('#dateRangeTab>li.active',$el).index();
				if(!index){
					var func = $('#quickRange>li.active', $el).attr('data-func');
					var timeInterval = $('#quickRange>li.active', $el).text();
					if(func){
						var dates = getQuickTimeAndDate(func);
						$('#dateSetect', $el).text(timeInterval+'内');
						$('#dateSetectInput', $el).val(dates.sDate +'~'+ dates.eDate);
						getEcharts({id:param.id,start_time:dates.sDate,end_time:dates.eDate});
					}
				}else{
					var sDate = $('[name="daterangepicker_start"]', $el).val();
					var eDate = $('[name="daterangepicker_end"]', $el).val();
					$('#dateSetect', $el).text(sDate +'~'+ eDate);
					$('#dateSetectInput', $el).val(sDate +'~'+ eDate);
					$('#quickRange>li.active', $el).removeClass('active');
					getEcharts({id:param.id,start_time:sDate,end_time:eDate});
				}
				$(this).parent().parent().hide();
				event.stopPropagation();
			});
			$('#quickRange', $el).on('click', 'li', function(event) {
				if(!$(this).hasClass('active')){
					$(this).addClass('active').siblings().removeClass('active');
				}
				$('#dataRangeSetectBtn', $el).click();
			});
			$('#quickRange li:eq(3)', $el).trigger('click');
			// 绑定日历
			$('#dateRangeTab>li:eq(1)', $el).daterangepicker({
			    "timePicker": true,
			    "timePicker24Hour": true,
			    "timePickerSeconds": true,
			    "autoApply": true,
			    "parentEl": $el,
			    "locale": {
			        "direction": "ltr",
			        "format": "YYYY-MM-DD HH:mm:ss",
			        "separator": " - ",
			        "applyLabel": "确定",
			        "cancelLabel": "取消",
			        "fromLabel": "起始时间",
			        "toLabel": "结束时间",
			        "customRangeLabel": "自定义",
			        "daysOfWeek": ["日","一","二","三","四","五","六"],
			        "monthNames": ['一月', '二月', '三月', '四月', '五月', '六月',
	                  '七月', '八月', '九月', '十月', '十一月', '十二月'],
			        "firstDay": 1
			    },
			    /*"startDate": "03/22/2018",
			    "endDate": "03/28/2018",*/
			    "maxDate": new Date(),
			    "applyClass": "confirmBtn",
			    "cancelClass": "btn-default hide"
			}, function(start, end, label) {
				/*$('#dateSetect', $el).text(start.format('YYYY-MM-DD HH:mm:ss') +'~'+ end.format('YYYY-MM-DD HH:mm:ss'));
				$('#dateSetectInput', $el).val(start.format('YYYY-MM-DD HH:mm:ss') +'~'+ end.format('YYYY-MM-DD HH:mm:ss'));
				$('#dataRangeSetectBtn', $el).click();*/
			});
			$('#dateRangeTab>li:eq(1)', $el).on('apply.daterangepicker',function(ev, picker) {
				$('#dataRangeSetectBtn', $el).click();
			});
			$('#dateRangeTab>li:eq(1)', $el).on('show.daterangepicker',function(ev, picker) {
				$('.daterangepicker', $el).css({
					'margin-top': '-40px',
	    			'margin-left': '-11px'
				})
				$('.range_inputs', $el).css('text-align','right');
			});
			// 日期选择
			$('#dateSetect', $el).on('click', function(event) {
				if($('#dateSetectContent', $el).css('display') == 'none'){
					$('#dateSetectContent', $el).show();
					$('#dateRangeTab>li.active', $el).click();
				}else{
					$('#dataRangeSetectBtn', $el).click();
				}
			});
			// 点击ul,隐藏日期选择
			$('#dateRangeTab', $el).on('click', function(event) {
				if(event.target == this){
					$('#dateSetectContent', $el).hide();
				}
			});

			function getEcharts(data) {
				app.common.ajaxWithAfa({
					url:'AgentManagerAction_getAgentOS.do',
					data:data
				}).done(function (data) {
					if(data.list && data.list.length > 0){
						var eData = forMatEchartsData(data.list);
						drawMem(eData.pmem, eData.time);
						drawCpu(eData.pcpu, eData.time);
					}else{
						drawMem([], []);
						drawCpu([], []);
					}
				})
			}

			function forMatEchartsData(data){
				var pcpu = [];
				var pmem = [];
				var time = [];

				data.forEach(function (item) {
					pcpu.push(item.pcpu);
					pmem.push(item.pmem);
					var tmpTime = '0';
					if(item.record_time){
						tmpTime = new Date(item.record_time).Format('yyyy-MM-dd hh:mm:ss');
					}
					time.push(tmpTime);
				})
				return {
					pcpu:pcpu,
					pmem:pmem,
					time:time
				}
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