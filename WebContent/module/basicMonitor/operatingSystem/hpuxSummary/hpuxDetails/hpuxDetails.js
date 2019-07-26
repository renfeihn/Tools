define([ "jquery" ], function() {
	var cpuEchart,
		neicunEchart,
		diskEchart,
		pagingEchart,
		netCardEchart,
		fileEchart;
	var timerId;
	return {
		load : function($el, scope, handler) {
			var objectId = scope.objectId;
			var basicEcharts = {
				handler	: handler,
				context	: $el,
				eType	: 'line',
				url		: 'CommonMonitorAction_getEachart.do'
			},
			urlParams = {
				objectId: objectId,
				interval : 1,
				time 	 : 60
			};
			var $progressTable = $("#progressTable", $el).DataTable({
				'bPaginate': false, //开关，是否显示分页器
				'bStateSave': false,
				'searching': false,
				'bSort': false,//排序
				'columns' 	: [{
					data : 'index',
				},{
					data : 'pid', defaultContent : ''
				},{
					data : 'user', defaultContent : ''
				},{
					data : 'stat', defaultContent : ''
				},{
					data : 'cpu_pct', defaultContent : ''
				},{
					data : 'mem_pct', defaultContent : ''
				},{
					data : 'command', defaultContent : ''
				}]
			});
			// 进程top5
			app.common.ajaxWithAfa({
				url:"CommonMonitorAction_getKeyMetric2.do",
				data:{objectId:objectId,
					metricName:'os_processes',
					'whereEx':'{"cpu_pct":"desc","mem_pct":"desc"}',
					top:5}
			}).done(function(data){
				var data = data.result;
				if(data && data.length){
					data.forEach(function(item,index){
						item.index=++index;
					})
					$progressTable.rows.add(data).draw();
				}
			});
			//总进程数
			app.common.ajaxWithAfa({
				url:"CommonMonitorAction_getMetricCount.do",
				data:{objectId:objectId,
					resultSet:'os_processes'}
			}).done(function(data){
				$(".linuxDetails-totalProgress",$el).html(data.result||'-');
			});
			
			//僵尸进程数
			app.common.ajaxWithAfa({
				url:"CommonMonitorAction_getMetricCount.do",
				data:{objectId:objectId,
					resultSet:'os_processes',
					'whereEx':'{"stat":" like \'%Z%\'"}'
				}
			}).done(function(data){
				$(".linuxDetails-zombieProgress",$el).html(data.result||'-');
			});
			
			getData();
			//获取基本信息
			function getData(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getMetricInfo2.do",
					data:{
						"objectId":objectId,
						'metricNames':['os.cpu.pcpu','os.mem.mem_used_pct','os.disk.busy_pct','os.net.tkps']
					}
				}).done(function (data) {
					if(!$.isEmptyObject(data.result)){
						$('#cpu', $el).text(data.result['os.cpu.pcpu'].value !== undefined?data.result['os.cpu.pcpu'].value.toFixed(2):'-');//cpu
						$('#nc', $el).text(data.result['os.mem.mem_used_pct'].value !== undefined?data.result['os.mem.mem_used_pct'].value.toFixed(2):'-');//内存使用率 
						$('#disk', $el).text(data.result['os.disk.busy_pct'].value !== undefined?data.result['os.disk.busy_pct'].value.toFixed(2) :'-');//磁盘使用率 
						$('#net', $el).text(data.result['os.net.tkps'].value !== undefined?data.result['os.net.tkps'].value.toFixed(2):'-');//网络流量	
					}
				});	
			}
			/*组织折线图数据*/
			function formatLineData(data) {
				var echartsData = {};
				var currData ={}; 
				var tmpData = data.content.result.echartsData;
				var times = tmpData.times;
				/*处理时间*/
				times.forEach(function (item,index) {
					var tmpDate = new Date(item);
					var hours = tmpDate.getHours() > 9 ?tmpDate.getHours():'0'+tmpDate.getHours();
					var minutes = tmpDate.getMinutes() > 9 ?tmpDate.getMinutes():'0'+tmpDate.getMinutes();
					times[index] = hours+":"+minutes;
				});
				for (var i = 0; i < tmpData.datas.length; i++) {
					echartsData['line'+(i+1)] = tmpData.datas[i];
					currData['line'+(i+1)] = tmpData.datas[i][tmpData.datas[i].length - 1];
				}
				echartsData.time = times;
				data.content.echartsData = echartsData;
				data.content.currData = currData;

				return data;
			}
			// cpu
			fnCpuEchart();
			function fnCpuEchart(){
				cpuEchart = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#cpuEchart',
					unit	: '%',
					items:['system','user','waiting'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['os.cpu.pcpu_sys','os.cpu.pcpu_user','os.cpu.cpu_iowait']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(data){
						if(data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length){
							var data = data.content.echartsData;
							$('#system', $el).text(data.line1[data.line1.length-1] + '%');
							$('#user', $el).text(data.line2[data.line2.length-1] + '%');
							$('#waiting', $el).text(data.line3[data.line3.length-1] + '%');
						}	
					}
				}));
				cpuEchart.start();
			}

			// 内存使用率
			fnNeicunEchart();
			function fnNeicunEchart(){
				neicunEchart = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#neicunEchart',
					unit	: '%',
					items:['内存使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['os.mem.mem_used_pct']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn:function (data) {
						getNeicunData();
					}
				}));
				neicunEchart.start();
			}			
			
			//获取内存使用率数据
			function getNeicunData(){
				var memUsed = 0,
						memFree = 0,
						xnmemUsed = 0,
						xnmemFree = 0;

				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getMetricInfo2.do",
					data:{
						"objectId":objectId,
						'metricNames':['os.mem.mem_used','os.mem.mem_free','os.mem.swap_used','os.mem.swap_free']
					}
				}).done(function (data) {
					if(!$.isEmptyObject(data.result)){
						memUsed = (data.result['os.mem.mem_used'].value/1024).toFixed(2);
						memFree = (data.result['os.mem.mem_free'].value/1024).toFixed(2);
						xnmemUsed = (data.result['os.mem.swap_used'].value/1024).toFixed(2);
						xnmemFree = (data.result['os.mem.swap_free'].value/1024).toFixed(2);
						if(parseInt(memFree) == 0 && parseInt(memUsed) == 0 && parseInt(xnmemFree) == 0 && parseInt(xnmemUsed) == 0){
							$('#memUsed', $el).width('0%').text('0GB');//已用物理内存
							$('#memFree', $el).width('0%').text('0GB');//未使用物理内存
							$('#xnmemUsed', $el).width('0%').text('0GB');//已用虚拟内存
							$('#xnmemFree', $el).width('0%').text('0GB');//未使用虚拟内存
						}else{
							var allMem = parseFloat(memFree) + parseFloat(memUsed) + parseFloat(xnmemFree) + parseFloat(xnmemUsed);//总内存
							$('#memUsed', $el).width((parseFloat(memUsed) / allMem)*100 + '%').text(parseFloat(memUsed)? memUsed : ' ');//已用物理内存
							$('#memFree', $el).width((parseFloat(memFree) / allMem)*100 + '%').text(parseFloat(memFree)? memFree : ' ');//未使用物理内存
							$('#xnmemUsed', $el).width((parseFloat(xnmemUsed) / allMem)*100 + '%').text(parseFloat(xnmemUsed)?  xnmemUsed : ' ');//已用虚拟内存
							$('#xnmemFree', $el).width((parseFloat(xnmemFree) / allMem)*100 + '%').text(parseFloat(xnmemFree)?  xnmemFree : ' ');//未使用虚拟内存
						}	
					}
				});
			}
			
			$('[href=#tabs2]', $el).click(function(){
				var timerId1 = setInterval(function(){
					if($('#tabs2', $el).hasClass('active')){
						showPagingEchart();
						clearInterval(timerId1);
						timerId1 = null;
					}
				},0);				
			});		
			
			//显示paging echarts图
			/*showPagingEchart();*/
			function showPagingEchart(){
				if(!showPagingEchart.firstEnter){//第一次进入才加载
					pagingEchart = app.drawEcharts($.extend({}, basicEcharts, {
						selector: '#pagingEchart',
						unit	: 'KB',
						items:['in','out'],
						urlParams: $.extend({}, urlParams, {
							metricNames : ['os_swap.swapped_in','os_swap.swapped_out']
						}),
						beforefn:function (data) {
							data = formatLineData(data);
						}
					}));
					pagingEchart.start();					
					showPagingEchart.firstEnter = true;
				}
			}
			
			$.ajax({//获取网卡数据
				type: 'post',
				url: 'CommonMonitorAction_getMetricTags.do',
				data: {
					objectId: objectId,
					metricName : 'os.net.read_kps'
				},
				success: function(data){
					if(data.status){
						if(data.content.result && data.content.result != 0){
							showNetCtn(data.content.result);
						}
					}
				}
			});
			
			//展示网卡容器
			function showNetCtn(data){
				var liTemp = "";
				var divTemp = "";
				for(var i in data){
					if(i == 0){
						liTemp += '<li class="active"><a href="#'+data[i]+'" data-toggle="tab">'+data[i]+'</a></li>';
						divTemp += '<div id="'+data[i]+'" class="tab-pane active">\
										<div class="linuxDetails-layout">\
											<div id="'+(data[i] + 'Echart')+'" style="width: calc(100% - 122px);height: 224px;"></div>\
											<div style="width: 102px;margin-left: 20px;flex: none">\
												<span class="linuxDetails-netIn">-</span>\
												<span class="linuxDetails-netOut">-</span>\
											</div>\
										</div>\
									</div>';	
					}else{
						liTemp += '<li><a href="#'+data[i]+'" data-toggle="tab">'+data[i]+'</a></li>';
						divTemp += '<div id="'+data[i]+'" class="tab-pane">\
										<div class="linuxDetails-layout">\
											<div id="'+(data[i] + 'Echart')+'" style="width: calc(100% - 122px);height: 224px;"></div>\
											<div style="width: 102px;margin-left: 20px;flex: none">\
												<span class="linuxDetails-netIn">-</span>\
												<span class="linuxDetails-netOut">-</span>\
											</div>\
										</div>\
									</div>';	
					}								
				}
				$('#tab', $el).append(liTemp);
				$('#container', $el).append(divTemp);
				
				netCardEchart = app.showEcharts({//网卡
					handler: handler,
					context: $el,
					selector: '#' + data[0] + 'Echart',
					eType: 'line',
					url: 'CommonMonitorAction_getEachart2.do',
					unit: 'kbps',
					items:['in','out'],
					urlParams: {
						time:60,
						interval: 1,
						objectId: objectId,
						tagvs: data[0],
						metricNames:['os.net.read_kps','os.net.write_kps']
					},
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(res){
						if(res && res.content && res.content.echartsData && res.content.echartsData.line1 && res.content.echartsData.line1.length){
							var eData = res.content.echartsData;
							$('#' + data[0], $el).find('.linuxDetails-netIn').text(eData.line1[eData.line1.length - 1] + 'kbps');
							$('#' + data[0], $el).find('.linuxDetails-netOut').text(eData.line2[eData.line2.length - 1] + 'kbps');
						}
					}
				});
				netCardEchart.start();
			}
			
			$('#tab', $el).on('click', 'li', function(){
				if($(this).hasClass('active')){return}
				var netCard = $(this).find('a').attr('href').slice(1);
				var timerId2 = setInterval(function(){
					if($('#' + netCard, $el).hasClass('active')){
						netCardEchart && netCardEchart.dispose();
						netCardEchart = app.showEcharts({//网卡
							handler: handler,
							context: $el,
							selector: '#' + netCard + 'Echart',
							eType: 'line',
							url: 'CommonMonitorAction_getEachart2.do',
							unit: 'kbps',
							items:['in','out'],
							urlParams: {
								time:60,
								interval: 1,
								objectId: objectId,
								tagvs: netCard,
								metricNames:['os.net.read_kps','os.net.write_kps']
							},
							beforefn:function (data) {
								data = formatLineData(data);
							},
							succfn: function(data){
								if(data && data.content && data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length){
									var eData = data.content.echartsData;
									$('#' + netCard, $el).find('.linuxDetails-netIn').text(eData.line1[eData.line1.length - 1] + 'kbps');
									$('#' + netCard, $el).find('.linuxDetails-netOut').text(eData.line2[eData.line2.length - 1] + 'kbps');
								}
							}
						});
						netCardEchart.start();
						clearInterval(timerId2);
						timerId2 = null;
					}	
				},0);			
			});

			//获取磁盘数据
			$.ajax({
				type: 'post',
				url: 'CommonMonitorAction_getMetricTags.do',
				data: {
					objectId: objectId,
					metricName:'os.disk.busy_pct'
				},
				success: function(data){
					if(data.status){
						if(data.content.result && data.content.result.length != 0){
							showDiskCtn(data.content.result);
						}
					}
				}
			});
			
			//展示磁盘容器
			function showDiskCtn(data){
				var liTemp = "";
				var divTemp = "";
				for(var i in data){
					if(i == 0){
						liTemp += '<li class="active"><a href="#'+data[i]+'" data-toggle="tab">'+data[i]+'</a></li>';
						divTemp += '<div id="'+data[i]+'" class="tab-pane active">\
										<div class="linuxDetails-layout">\
											<div id="'+(data[i] + 'Echart')+'" style="width: calc(100% - 122px);height: 224px;"></div>\
											<div style="width: 102px;margin-left: 20px;flex: none">\
												<span class="linuxDetails-diskIO">-</span>\
												<span class="linuxDetails-diskIn">-</span>\
												<span class="linuxDetails-diskOut">-</span>\
											</div>\
										</div>\
									</div>';	
					}else{
						liTemp += '<li><a href="#'+data[i]+'" data-toggle="tab">'+data[i]+'</a></li>';
						divTemp += '<div id="'+data[i]+'" class="tab-pane">\
										<div class="linuxDetails-layout">\
											<div id="'+(data[i] + 'Echart')+'" style="width: calc(100% - 122px);height: 224px;"></div>\
											<div style="width: 102px;margin-left: 20px;flex: none">\
												<span class="linuxDetails-diskIO">-</span>\
												<span class="linuxDetails-diskIn">-</span>\
												<span class="linuxDetails-diskOut">-</span>\
											</div>\
										</div>\
									</div>';	
					}								
				}
				$('#diskTab', $el).append(liTemp);
				$('#diskContainer', $el).append(divTemp);
				dickEchart = app.drawEcharts({//硬盘
					handler: handler,
					context: $el,
					selector: '#' + data[0] + 'Echart',
					eType: 'line',
					url: 'CommonMonitorAction_getEachart2.do',
					unit: 'kbps',
					items:['in','out'],
					urlParams: {
						time:60,
						interval: 1,
						objectId: objectId,
						tagvs: data[0],
						metricNames : ['os.disk.kB_reads','os.disk.kB_wrtns','os.disk.busy_pct']
					},
					beforefn: function(data){
						data = formatLineData(data);
					},
					succfn: function(res){
						if(res && res.content && res.content.echartsData && res.content.echartsData.line1 && res.content.echartsData.line1.length){
							var eData = res.content.echartsData;
							$('#' + data[0], $el).find('.linuxDetails-diskIO').text(eData.line3[eData.line3.length - 1] + '%');
							$('#' + data[0], $el).find('.linuxDetails-diskIn').text(eData.line1[eData.line1.length - 1] + 'kbps');
							$('#' + data[0], $el).find('.linuxDetails-diskOut').text(eData.line2[eData.line2.length - 1] + 'kbps');
						}
					}
				});
				dickEchart.start();	
			}
			
			$('#diskTab', $el).on('click', 'li', function(){
				if($(this).hasClass('active')){return}
				var disk = $(this).find('a').attr('href').slice(1);
				var timerId3 = setInterval(function(){
					if($('#' + disk, $el).hasClass('active')){
						diskEchart && dickEchart.dispose();
						dickEchart = app.drawEcharts({//硬盘
							handler: handler,
							context: $el,
							selector: '#' + disk + 'Echart',
							eType: 'line',
							url: 'CommonMonitorAction_getEachart2.do',
							unit: '%',
							items:['in','out'],
							urlParams: {
								time:60,
								interval: 1,
								objectId: objectId,
								tagvs: disk,
								metricNames : ['os.disk.kB_reads','os.disk.kB_wrtns','os.disk.busy_pct']
							},
							beforefn: function(data){
								data = formatLineData(data);
							},
							succfn: function(data){
								if(data && data.content && data.content.echartsData && data.content.echartsData.line1 && data.content.echartsData.line1.length){
									var eData = data.content.echartsData;
									$('#' + disk, $el).find('.linuxDetails-diskIO').text(eData.line3[eData.line3.length - 1] + '%');
									$('#' + disk, $el).find('.linuxDetails-diskIn').text(eData.line1[eData.line1.length - 1] + 'kbps');
									$('#' + disk, $el).find('.linuxDetails-diskOut').text(eData.line2[eData.line2.length - 1] + 'kbps');
								}
							}
						});
						dickEchart.start();
						clearInterval(timerId3);
						timerId3 = null;
					}
				},0);				
			});

			fileEchart = app.showEcharts({//文件系统列表图
				handler: handler,
				context: $el,
				selector: '#fileEchart',
				eType: 'bar',
				url: 'CommonMonitorAction_getMetricEcharts.do',
				unit: '%',
				items:['文件系统使用率'],
				margin: {left: 40, top: 25, right: 10, bottom: 36},
				urlParams: {
					time:60,
					interval: 1,
					objectId: objectId,
					metricName:'os.fs.used_pct',
					echarts_type:2
				},
				beforefn:function (data) {
					var echartsData = {};
					var currData ={}; 
					var tmpData = data.content.result.line;
					var time = [];
					echartsData.line1 = tmpData.datas;
					currData.line1 = echartsData.line1[echartsData.line1.length - 1];
					tmpData.alias.forEach(function(item,index){
						time.push(item.split(',')[1]);
					})
					echartsData.time = time;
					data.content.echartsData = echartsData;
					data.content.currData = currData;
				}
			});
			fileEchart.start();
			//timerId = handler.setInterval(getData,60000);
			
			// 显示更多信息
			app.common.ajaxWithAfa({
				url:'CommonMonitorAction_getMetricProperty.do',
				data:{objectId: objectId}
			}).done(function(data){
				var data = data.result;
				var detail_content='';
				var infoData = {};
				for(var i = 0;i<data.length;i++){
					str ='<div class="more-info-content"> <span>'+data[i].column_name+' :</span><span>'+data[i].column_value+'</span></div>'
					detail_content+=str;
					infoData[data[i].column_code] = data[i].column_value;
				}
				$('#version',$el).text(infoData.version == undefined?'-':infoData.version);
				$('#ip',$el).text(infoData.server_ip == undefined?'-':infoData.server_ip);
				$('#port',$el).text(infoData.server_port == undefined?'-':infoData.server_port);
				// 显示更多信息
				$('#moreInfo', $el).popover({
					'placement': 'bottom',
					'title': '详细信息',
					'html': true,
					'trigger': 'hover',
					'content': detail_content
				});
			});
		},
		unload : function(handler) {
			cpuEchart.dispose();
			neicunEchart.dispose();
			diskEchart && diskEchart.dispose();
			pagingEchart && pagingEchart.dispose && pagingEchart.dispose();
			netCardEchart && netCardEchart.dispose && netCardEchart.dispose();
			fileEchart && fileEchart.dispose();
		},
		pause : function($el, attr, handler) {
			app.dispatcher2.pause();
		},
		resume : function($el, attr, handler) {
		}
	};
});