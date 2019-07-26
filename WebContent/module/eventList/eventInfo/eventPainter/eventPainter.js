define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			var eventId = scope.eventId;
			
			var option = {
					title:{
						text : '事件-' + eventId
					},
					tooltip:{
						trigger: 'axis',
						axisPointer:{
							type: 'shadow'
						},
						formatter: function(params){
							var tar = params[1];
							return tar.name + '<br/>' + tar.seriesName + ':' + tar.value;
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						type: 'time',
						position: 'top'
					}],
					yAxis:[{
						type: 'category',
						slitLine: {show: false},
						data: ['-'],
						
					}],
					series:[
					    {
					    	name: '辅助',
					    	type: 'bar',
					    	stack: '总量',
					    	itemStyle:{
					    		normal:{
					    			barBorderColor: 'rgba(0,0,0,0)',
					    			color: 'rgba(0,0,0,0)'
					    		},
					    		emphasis:{
					    			barBorderColor: 'rgba(0,0,0,0)',
					    			color: 'rgba(0,0,0,0)'
					    		}
					    	},
					    	data: ["-"]
					    },
					    {
					    	name: '时间',
					    	type: 'bar',
					    	stack: '总量',
					    	label:{
					    		normal: {
					    			show: true,
					    			position: 'inside'
					    		}
					    	},
					    	data: ["-"]
					    }
					]
							
			}
			var echartObj;
			getEchart(1);
			$('#interval', $el).on('change', function(){
				getEchart($(this).val());
			});
			
			function getEchart(interval) {
				app.common.ajaxWithAfa({
					url: 'EventDetailAction_getEventSeries.do',
					data: {
						eventId: eventId,
						interval: interval * 60
					}
				}).then(function(data){
					var data = data.events;
					var metricNames = [];
					var startTimes = [];
					var endTimes = [];
					for(var i = 0; i < data.length; i++){
						var nm = data[i].metricName;
						nm = data[i].eventId +" "+nm;
						if (data[i].eventId==eventId){
							nm = ">> "+nm;
						}
						metricNames.unshift(nm);
						startTimes.unshift(data[i].eventStart);
						endTimes.unshift(data[i].eventEnd);
					}
					if(metricNames.length<4){
						$('#eventChart', $el).css('height', metricNames.length*100+"px");
					}else{
						$('#eventChart', $el).css('height', metricNames.length*65+"px");
					}
					$('#eventChart', $el).css('height', '560px');
					echartObj = app.echarts.init($('#eventChart', $el)[0]);
					echartObj.setOption(option);
					echartObj.setOption({
						yAxis: [{
							data: metricNames
						}],
						series: [{
							data: startTimes
						},{
							data: endTimes
						}]
					});
				});
			}
		},
		unload : function(handler) {
			
		},
		pause : function($el, scope, handler) {
		},
		resume : function($el, scope, handler) {
		}
	};
});