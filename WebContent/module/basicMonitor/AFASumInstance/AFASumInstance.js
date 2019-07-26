define([ "jquery","echarts" ], function($,echarts) {
	var eventEchart = null;
	var $dataTable;
	return {
		load : function($el, scope, handler) {	
			var category = scope.category,flag=scope.flag;
			
			var detailLink;//详情url
			
			if(category == 'MySQL') {
				$('#afaInstance-instanceCount', $el).css('background', '#f1f0f5 url("") 30px center no-repeat')
			}
			
			loadBaseInfo();
			
			if(category == '加密机' || category == 'DNS' || category == '负载均衡设备' || category == 'IBM小型机' || category == 'redis' || category == 'db2' || category == 'WAS') {
				$("#afaInstance-instanceCount",$el).css({
					'background-image':'url("img/baseMonitor/encoder.png")',
				});
			} else if(category == '签名服务器') {
				$("#afaInstance-instanceCount",$el).css({
					'background-image':'url("img/baseMonitor/sign-server.png")',
				});
			} else if(category == '采集器') {
				$("#afaInstance-instanceCount",$el).css({
					'background-image':'url("img/baseMonitor/collector.png")',
				});
			} else {
				$("#afaInstance-instanceCount",$el).css({
					'background-image':'url("img/baseMonitor/'+category+'.png")',
				});
			}
			
			//刷新数据
			handler.setInterval(loadBaseInfo, 60000);
			if(flag){
				$("#totalInfo",$el).text(category+"集群汇总");
			}else{
				$("#totalInfo",$el).text(category+"汇总");

			}

			//基本数据信息
			function loadBaseInfo(){
				app.common.ajaxWithAfa({
					url:'CommonMonitorAction_getSumInfoByCate.do',
					data:{
						"category":category
					}
				}).done(function(data){
					// 实例统计
					setInstance(data.result.runData[0]);
					// 加载表格数据
					if(data.result.table_data && data.result.table_data.length > 0){
						$('#appListSec',$el).css({display: 'block'});
						$('#appTabSec',$el).css({display: 'none'});

						$('#appListSec p',$el).html(data.result.table_data[0].title_name);
						loadTableData(data.result.table_data[0]);
						detailLink = data.result.table_data[0].detail_link;
						
						$('#unHealthIns', $el).text(data.result.table_data[0].unHelthInsCount);
						$('#healthIns', $el).text(data.result.table_data[0].helthInsCount);
						$('#insCount', $el).text(data.result.table_data[0].helthInsCount + data.result.table_data[0].unHelthInsCount);
					}else{
						$('#appListSec',$el).css({display: 'none'});
						$('#appTabSec',$el).css({display: 'block'});

						loadTabData(data.result.tabData);
						detailLink = data.result.tabData[0].detail_link;
					}
				});
			}
			
			// 实例统计
			function setInstance(data) {
				var title =[];
				var key = [];
				var unit = [];
				for (item in data['run_title']) {
					if (data['run_title'].hasOwnProperty(item)) {
						key.push(item);
						title.push(data['run_title'][item]['cname']);
						unit.push(data['run_title'][item]['unit'])
					}
				}

				var objList = $('#afaInstance-kpi',$el).children();
				for(var i = 0; i < objList.length; i++){
					$(objList[i]).attr({beforeContext: title[i]});
					$(objList[i]).attr({afterContext: unit[i]});
					objList[i].innerHTML = data['run_value'][key[i]] !== undefined?data['run_value'][key[i]]:'-';
				}
				$('#afaInstance-kpi',$el).parent().prev().html(data.title_name);
			}
			
			//加载表格数据
			function loadTableData(data){
				var columns = [{data:'index'}];
				var thStr = '<th>序号</th>';
				for (item in data['list_title']) {
					if (data['list_title'].hasOwnProperty(item)) {
						var tmpArr = $.trim(data['list_title'][item]).split(':');
						thStr += '<th>'+$.trim(tmpArr[0]).slice(1,-1)+'</th>';
						columns.push({data:$.trim(tmpArr[1]).slice(1,-1),defaultContent:''});
					}
				}

				$('#dataTable thead tr',$el).html(thStr);
				
				if(!$dataTable){
					$dataTable = $("#dataTable", $el).DataTable({
						'bPaginate': true, //开关，是否显示分页器
						'pagingType': 'full_numbers',
						'bStateSave': false,
						'bSort': true,//排序
						'columns':columns
					});
				}
				
				if(!data['list_value'] || $.isEmptyObject(data['list_value'])){
					return;
				}			
				
				data['list_value'].forEach(function(item,index){
					item.index = ++index;
					
					//格式化最后采集时间
					item.sample_time = item.sample_time && new Date(item.sample_time).Format('yyyy-MM-dd hh:mm:ss');
						
					
					if(category == '加密机'){
						item.timems = item.timems ? item.timems + 'ms' : item.timems;
					}
				});
				
				$dataTable.clear();
				$dataTable.rows.add(data['list_value']).draw();
			}
			
			//加载tab数据
			function loadTabData(tabData){
				var ulStr = '<li class="active"><a href="#tabs1" data-href="'+tabData[0].jsp_link+'" data-toggle="tab">'+tabData[0].title_name+'</a></li>';
				var tabTableStr = '<div id="tabs1" class="tab-pane active afaInstance-table">'+
														'<table id="TabDataTable" class="display dataTable table">'+
															'<thead>'+
																'<tr>'+
																	'<th>序号</th>';
				var columns = [{data:'index'}];
				// 表格DOM
				for (item in tabData[0]['list_title']) {
					if (tabData[0]['list_title'].hasOwnProperty(item)) {
						var tmpArr = $.trim(tabData[0]['list_title'][item]).split(':');
						tabTableStr += '<th>'+$.trim(tmpArr[0]).slice(1, -1)+'</th>';
						columns.push({data:$.trim(tmpArr[1]).slice(1, -1),defaultContent:''});
					}
				}
				tabTableStr +='</tr>'+
										'</thead>'+
										'<tbody></tbody>'+
									'</table>'+
								'</div>';
				// tab DOM
				for (var i = 1; i < tabData.length; i++) {
					ulStr += '<li><a href="#tabs'+(i+1)+'" data-href="'+tabData[i].jsp_link+'" data-toggle="tab">'+tabData[i].title_name+'</a></li>'
					tabTableStr += '<div id="tabs'+(i+1)+'" class="tab-pane"></div>'
				}

				$('#appTab',$el).html(ulStr);
				$('#appTabContainer',$el).html(tabTableStr);
				$('#appTab',$el).find('li:eq(0)').trigger('click');
				//初始化表格
				var $TabDataTable = $("#TabDataTable", $el).DataTable({
					'bPaginate': true, //开关，是否显示分页器
					'pagingType': 'full_numbers',
					'bStateSave': false,
					'bSort': false,//排序
					'columns':columns
				});
				if(!tabData[0]['list_value'] || $.isEmptyObject(tabData[0]['list_value'])){
					return;
				}
				tabData[0]['list_value'].forEach(function(item,index){
						item.index = ++index;
				});
				
				$TabDataTable.rows.add(tabData[0]['list_value']).draw();
				

			}
			$('#TabDataTable',$el).on('click','tbody>tr',function(e){
				var tr = $TabDataTable.row(this).data();
				if(tr == undefined){return;}
				var section = detailLink.split('#');
				app.dispatcher.load({
					title: category+"详情-"+tr.object_name,
					moduleId: section.shift(),
					section: section,
					id:"",
					params:{
						objectId: tr.object_id,
						category: category,	
						ipadd: tr.ipadd,
						hostname: tr.hostname,
						port: tr.ip_port,//weblogic所需的参数
						version: tr.model || tr.os_version
					}
				});
			})
			$('#appTab', $el).on('click', 'li', function(event) {
				var href = $(this).children('a').attr('href');
				var section = $(this).children('a').attr('data-href').split('#');
				if (!section) {
					return;
				}
				app.dispatcher2.load({
					title: category,
					moduleId: section.shift(),
					section: section,
					frameRenderTo : href,
					id:href,
					"context" : $el
				});
			});

			$('#dataTable', $el).on('click','tbody>tr',function(e){
				var tr = $dataTable.row(this).data();
				if(tr == undefined){return;}
				var name = ($(this).children("td").eq(1).text());
				var section = detailLink.split('#');
				var title ="";
				if(flag){
					title=category+"集群详情-"+name
				}else{
					title=category+"详情-"+name
				}
				app.dispatcher.load({
					title: title,
					moduleId: section.shift(),
					section: section,
					id:"",
					params:{
						objectId: tr.object_id,
						category: category,
						ipadd: tr.ipadd,
						hostname: tr.hostname,
						name:name,
						version: tr.model || tr.os_version,
						instanceName: tr.db_name,
						status:tr.cluster_status
					}
				});
			});
			
			//通过分类获取查事件所需的参数
			function getParamsBycate(cate){
				var params = {time: 120, interval: 1};
				
				switch(cate){
					case 'aix':
						params.l1CateName = '软件';
						params.l2CateName = '操作系统';
						params.l3CateName = 'aix';
						params.cateId = 300002001;
					case 'DNS':
						params.l1CateName = '网络';
						params.l2CateName = '网络设备';
						params.l3CateName = 'DNS';
						params.cateId = 400001003;
						break;
					case 'linux':
						params.l1CateName = '软件';
						params.l2CateName = '操作系统';
						params.l3CateName = 'linux';
						params.cateId = 300002002;
						break;
					case 'windows':
						params.l1CateName = '软件';
						params.l2CateName = '操作系统';
						params.l3CateName = 'windows';
						params.cateId = 300002003;
						break;
					case 'hpux':
						params.l1CateName = '软件';
						params.l2CateName = '操作系统';
						params.l3CateName = 'hpux';
						params.cateId = 300002006;
						break;
					case 'OracleRAC':
						params.l1CateName = '软件';
						params.l2CateName = '数据库';
						params.l3CateName = 'Oracle';
						params.cateId = 300003001;
						break;
					case 'MySQL':
						params.l1CateName = '软件';
						params.l2CateName = '数据库';
						params.l3CateName = 'MySQL';
						params.cateId = 300003003;
						break;
					case 'weblogic':
						params.l1CateName = '软件';
						params.l2CateName = '中间件';
						params.l3CateName = 'Weblogic';
						params.cateId = 300004001;
						break;
					case 'mq':
						params.l1CateName = '软件';
						params.l2CateName = '中间件';
						params.l3CateName = 'MQ';
						params.cateId = 300004002;
						break;
					case 'tomcat':
						params.l1CateName = '软件';
						params.l2CateName = '中间件';
						params.l3CateName = 'Tomcat';
						params.cateId = 300004003;
						break;
					case 'tuxedo':
						params.l1CateName = '软件';
						params.l2CateName = '中间件';
						params.l3CateName = 'tuxedo';
						params.cateId = 300004009;
						break;
					case '签名服务器':
						params.l1CateName = '安全';
						params.l2CateName = '安全设备';
						params.l3CateName = '签名服务器';
						params.cateId = 700001004;
						break;
					case '加密机':
						params.l1CateName = '安全';
						params.l2CateName = '安全设备';
						params.l3CateName = '加密机';
						params.cateId = 700001003;
						break;
					case '采集器':
						params.l1CateName = '网络';
						params.l2CateName = '网络设备';
						params.l3CateName = '采集器';
						params.cateId = 400001007;
						break;
					case '负载均衡设备':
						params.l1CateName = '网络';
						params.l2CateName = '网络设备';
						params.l3CateName = '负载均衡设备';
						params.cateId = 400001004;
						break;
					case 'IBM小型机':
						params.l1CateName = '硬件';
						params.l2CateName = '物理服务器';
						params.l3CateName = 'IBM小型机';
						params.cateId = 200001001;
						break;
					case 'redis':
						params.l1CateName = '软件';
						params.l2CateName = '数据库';
						params.l3CateName = 'redis';
						params.cateId = 300003007;
						break;
					case 'db2':
						params.l1CateName = '软件';
						params.l2CateName = '数据库';
						params.l3CateName = 'DB2';
						params.cateId = 300003002;
						break;
					case 'WAS':
						params.l1CateName = '软件';
						params.l2CateName = '中间件';
						params.l3CateName = 'WAS';
						params.cateId = 300003004;
						break;
				}
				
				return params;
			}
			
			var cateId = getParamsBycate(category).cateId;
			
			//事件总览
			eventEchart = app.showEcharts({
				handler: handler,
				context: $el,
				selector: '#echarts',
				eType: 'line',
				url: 'CommonMonitorAction_getEventViewEcharts.do',
				unit: '个',
				urlParams: getParamsBycate(category),
				items: ['告警', '预警'],
				beforefn: function(data){
					if(!$.isEmptyObject(data.content)){
						$('#alarmWaringCount', $el).text(data.content.result.alarmWaring);
						$('#warningCount', $el).text(data.content.result.waringCount);
						$('#alarmCount', $el).text(data.content.result.alarmCount);
						$('#todayEvent', $el).text(data.content.result.dayEventCount);
						formatData(data);
					}
				}
			});
			eventEchart.start();
			
			//各类事件数模块点击跳转
			$('.afaInstance-event span', $el).on('click', function(e){
				var title, eType;
				var content = $(this).text();
				var	id = e.target.id;
				
				if(isNaN(content) || parseInt(content) == 0){
					return;
				}
				if(id == 'alarmWaringCount' || id == 'warningCount' || id == 'alarmCount'){
					if(id == 'alarmWaringCount'){
						title = "未解决";
					}else if(id == 'warningCount'){
						title = "预警";
						eType = "WARING";
					}else{
						title = "告警";
						eType = "ALARM";
					}
					
					app.dispatcher.load({
						"title" : "事件列表-" + cateId + title,
						"moduleId" : "eventList",
						"section" : "",
						"id" : "",
						"params" : { // 给标签传递参数
							"cateId" : cateId,
							"eType" : eType,
							"eventClosed": 'FALSE'
						}
					});
				}
			});
			
			//格式化echarts数据
			function formatData(data){
				var eData = {};
				
				eData.time = data.content.result.echarts.times;
				eData.time.forEach(function(item, i){
					eData.time[i] = new Date(item).Format('hh:mm:ss');
				});
				
				data.content.result.echarts.datas.forEach(function(item, i){
					eData['line' + (i + 1)] = item;
				});
				
				data.content = {echartsData: eData};
			}
		},
		unload : function(handler) {
			eventEchart && eventEchart.dispose();
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});