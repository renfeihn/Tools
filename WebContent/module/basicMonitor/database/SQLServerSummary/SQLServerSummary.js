define([ "jquery" ], function() {
	
	var eEvent;
	
	return {
		load : function($el, scope, handler) {
			var $dataTable = $("#dataTable", $el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'searching' : true,
				'columns' 	: [{
					data : null
				},{
					data : 'index',
				},{
					data : 'dbName', defaultContent : ''
				},{
					data : 'ip', defaultContent : ''
				},{
					data : 'healthValue', defaultContent : ''
				},{
					data : 'waitLock', defaultContent : ''
				},{
					data : 'transaction', defaultContent : ''
				},{
					data : 'request', defaultContent : ''
				}],
				'aoColumnDefs' : [{
                    "render": function(data, type, row, meta) {
                    	return '<input type="checkbox" />';
                    },
                    "targets" : 0
				}]
			});
			
			$('#dataTable', $el).on('click', 'tbody>tr', function(){
				var tr = $dataTable.row( this ).data();
				if(tr == undefined){
					return;
				}
				//FIXME 参数传递未确定
				app.dispatcher.load({
					title: "SQL Server明细-" + tr.dbName,
					moduleId:"basicMonitor",
					section: ["database","SQLServerSummary","SQLServerDetails"],
					id:"",
					params:{
						'objectId':tr.objectId,
					}
				});
			});
			
			app.common.ajaxWithAfa({
				url  : "SqlServerOverviewAction_getSqlServerBaseInfo.do",
			}).done(function(data){
				//实例状态、关键KPI、事件
				var base = data.result;
				if(!base && $.isEmptyObject(base)){
					return;
				}
				for(var i in base){
					$('#' + i, $el).text(base[i]);
				}
				//表格
				var mertrics = base.sqlServer;
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
				url		 : 'SqlServerOverviewAction_getEventViewEcharts.do',
				unit	 : '个',
				items	 : ['预警', '告警'],
				urlParams: {
					interval : 1,
					time 	 : 60
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