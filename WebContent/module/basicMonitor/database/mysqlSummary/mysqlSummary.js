define([ "jquery" ], function() {
	
	var eEvent;
	
	return {
		load : function($el, scope, handler) {
			
			var $dataTable = $("#dataTable", $el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'instanceName', defaultContent : ''
				},{
					data : 'category', defaultContent : ''
				},{
					data : 'qps', defaultContent : ''
				},{
					data : 'tps', defaultContent : ''
				},{
					data : 'connNum', defaultContent : ''
				},{
					data : 'uptime', defaultContent : ''
				},{
					data : 'cpuPct', defaultContent : ''
				},{
					data : 'memPct', defaultContent : ''
				},{
					data : 'service_ip', defaultContent : ''
				},{
					data : 'appName', defaultContent : ''
				},{
					data : 'processMemory', defaultContent : ''
				},{
					data : 'ip', defaultContent : ''
				},{
					data : 'appName', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
                    	if(data>80){
                    		return  "<span class='greenCircle'></span>"+data;
                    	}
                    	else if(data>60 && data<80){
                    		return  "<span class='yellowCircle'></span>"+data;
                    	}else{
                    		return  "<span class='redCircle'></span>"+data;
                    	}
                    },
                    "targets" : 3
				}]
			});
			
			$('#dataTable', $el).on('click', 'tbody>tr', function(){
				var tr = $dataTable.row( this ).data();
				/*if(tr == undefined){
					return;
				}*/
				//FIXME 参数传递未确定
				app.dispatcher.load({
					title: "MySQL详情-"/* + tr.appName*/,
					moduleId:"basicMonitor",
					section: ["database","mysqlSummary","mysqlTabs"],
					id:"",
					params:{
						/*'objectId':tr.objectId,*/
					}
				});
			});
			//mysql统计、关键KPI
			app.common.ajaxWithAfa({
				url  : "MysqlTwoLevelSummaryAction_getMysqlTwoLevelSummaryBaseInfo.do"
			}).done(function(data){
				//WAS统计
				var base = data.mysqlTwoLevelSummaryBaseInfo;
				if(!base && isEmptyObject(base)){
					return;
				}
				for(var i in base){
					$('#' + i, $el).text(base[i]);
				}
				
				var event = base.event;
				if(!event && isEmptyObject(event)){
					return;
				}
				for(var i in event){
					$('#' + i, $el).text(event[i]);
				}
				//表格
				var mertrics = base.mysqlInstance;
				if(mertrics && mertrics.length > 0){
					mertrics.forEach(function(item, index){
						item.index = ++index;
					});
					$dataTable.rows.add(mertrics).draw();
				}
			});
			
				
			eEvent = app.drawEcharts({
				handler	 : handler,
				context	 : $el,
				selector : '#eEvent',
				eType	 : 'line',
				url		 : 'MysqlTwoLevelSummaryAction_getEventViewEcharts.do',
				unit	 : '个',
				items	 : ['预警', '告警'],
				urlParams: {
					interval : 1,
					time 	 : 10
				}
			});
			eEvent.start();
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