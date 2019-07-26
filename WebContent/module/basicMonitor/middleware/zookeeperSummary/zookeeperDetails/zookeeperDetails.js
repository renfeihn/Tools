define([ "jquery" ], function() {

	//echarts对象
	var eMemory,eCPU,eConnections,ePacket,eWatch_path,eWatch;
	var echarts = [eMemory,eCPU,eConnections,eWatch_path,eWatch,ePacket];
	return {
		load : function($el, scope, handler) {
			
			var objectId = 100000||scope.objectId;
			var basicEcharts = {
					handler	: handler,
					context	: $el,
					eType	: 'line',
					url		: 'CommonMonitorAction_getEachart.do'
				},
				urlParams = {
					objectId : objectId,
					interval : 1,
					time 	 : 60
				}
				
			
			// 连接信息
			var $connectTable = $('#connectTable',$el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'ip', defaultContent : ''
				},{
					data : 'portnum', defaultContent : ''
				},{
					data : 'queued', defaultContent : ''
				},{
					data : 'received', defaultContent : ''
				},{
					data : 'sent', defaultContent : ''
				},{
					data : 'sid', defaultContent : ''
				},{
					data : 'est', defaultContent : ''
				},{
					data : 'lresp', defaultContent : ''
				}],
				'aoColumnDefs' : [{
                    "render": function(data, type, row, meta) {
                    	if(data!=undefined){
                    		return  FormatData(parseInt(data))
                    	}
                    },
                    "targets" : 7
				},{
					 "render": function(data, type, row, meta) {
						 if(data!=undefined){
	                    		return  FormatData(parseInt(data))
	                    }
	              },
	               "targets" : 8	
				}]
			});
			//时间格式化
			function FormatData(time){
				//debugger;
				var tmp = 1505273491183;
				var tmpDate = new Date(tmp);
				var month = tmpDate.getMonth() + 1>9 ?tmpDate.getMonth()+ 1:'0'+(tmpDate.getMonth()+ 1); 
		        var day = tmpDate.getDate() >9 ?tmpDate.getDate():'0'+tmpDate.getDate();  
				var hours = tmpDate.getHours() > 9 ?tmpDate.getHours():'0'+tmpDate.getHours();
				var minutes = tmpDate.getMinutes() > 9 ?tmpDate.getMinutes():'0'+tmpDate.getMinutes();
				var seconds = tmpDate.getSeconds() > 9 ?tmpDate.getSeconds():'0'+tmpDate.getSeconds();
				var parseTime = tmpDate.getFullYear()+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds
				return  parseTime;
				
			}
			$("#connectTable", $el).on('click','tr',function () {
				var tr = $connectTable.row( this ).data();
				if(tr == undefined){
					return;
				}
				$(this).addClass('selected').siblings().removeClass('selected');
				var rowIndex = tr.index-1;
				$(".selected_SanJiao",$el).css("margin-top",(40+rowIndex*26)+"px").css("display","block");
				if(tr.sid!=undefined){
					getSessionData(tr.sid);
				}
			});
			
			function getSessionData(sid){
				var map = {};
				map['sid'] = sid;
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetricCondition.do",
					data : {whereEx:JSON.stringify(map),
							objectId : objectId,
							resultSet :"zookeeper_session"}
				}).done(function(data){
					$("#path",$el).html("");
					var s="";
					var lists = data.result;
					for(var i=0;i<lists.length;i++){
						s+="<tr><td width='30%'>"+(i+1)+"</td><td width='50%'>"+lists[i].path+"</td></tr>";
					}
					$("#path",$el).html(s);
				});
			}
			//指标-基本信息
			app.common.ajaxWithAfa({
				url  : "CommonMonitorAction_getMetricInfo2.do",
				data:{
					"objectId":objectId,
					'metricNames':["zookeeper_serverinfo.znode_count","zookeeper_serverinfo.state","zookeeper_serverinfo.connections","zookeeper_serverinfo.followers"]
				}
			}).done(function(data){
				//基础配置
				$('#role', $el).text(data.result['zookeeper_serverinfo.state'].value !== undefined?data.result['zookeeper_serverinfo.state'].value:'-');
				$('#connections', $el).text(data.result['zookeeper_serverinfo.connections'].value !== undefined?data.result['zookeeper_serverinfo.connections'].value:'-');
				$('#followers', $el).text(data.result['zookeeper_serverinfo.followers'].value !== undefined?data.result['zookeeper_serverinfo.followers'].value:'-');
				$('#znodes', $el).text(data.result['zookeeper_serverinfo.znode_count'].value !== undefined?data.result['zookeeper_serverinfo.znode_count'].value:'-');
			});
			//连接信息
			fnconnectTable();
			function fnconnectTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'zookeeper_connection'}
				}).done(function(data){
					addData(data, $connectTable);
				});
			}
			/*组织表格数据*/
			function addData(data, $table){
				var result = data.result;
				$table.clear();
				if(result && result.length > 0){
					result.forEach(function(item,index){
						item.index = ++index;
					})
					$table.rows.add(result).draw();
				}
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
		 	fnEMemory();
			// 内存使用率
			function fnEMemory(){
				eMemory = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eMemory',
					unit	: '%',
					items:['内存使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['zookeeper_processinfo.pmem']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					}
				}));	
				eMemory.start();
			}	

			fneCPU();
			// CPU
			function fneCPU(){
				eCPU = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eCPU',
					unit	: '%',
					items:['CPU使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['zookeeper_processinfo.pcpu']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					}
				}));	
				eCPU.start();
			}

			fneConnections();
			// watch patch连接数量
			function fneConnections(){
				eConnections = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eConnections',
					unit	: '个',
					items:['watch patch 数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['zookeeper_wchs.connections']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					}
				}));	
				eConnections.start();
			}
			fneWatch_path();
			// follower
			function fneWatch_path(){
				eWatch_path = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eWatch_path',
					unit	: '个',
					items:['watch path数量'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['zookeeper_wchs.pathnum']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(data){
						
					}
				}));	
				eWatch_path.start();
			}	
			 fneWatch();
			function fneWatch(){
				eWatch = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eWatch',
					unit	: '个',
					items:['watch数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['zookeeper_wchs.watchernum']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					}
				}));	
				eWatch.start();
			}	
		 	fnePacket();
			function fnePacket(){
				ePacket = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#ePacket',
					unit	: '个',
					items:['received','sent'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['zookeeper_serverinfo.received','zookeeper_serverinfo.sent']
					}),
					beforefn:function (data) {
						data = formatLineData(data);
					},
					succfn: function(data){
						/*var data = data.content.echartsData;
						$('#keyhit',$el).text(data.line1[data.line1.length-1]);*/
					}
				}));	
				ePacket.start();
			}	
			
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
			echarts.forEach(function (item) {
				item && item.dispose();
			});
		},
		pause : function($el, attr, handler) {
			app.dispatcher2.pause();
		},
		resume : function($el, attr, handler) {
			
		}
	};
});