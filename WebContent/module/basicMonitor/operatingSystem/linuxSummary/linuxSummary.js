define([ "jquery" ], function() {
	
	var eEvent;
	
	return {
		load : function($el, scope, handler) {
			var $dataTable = $("#dataTable", $el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : null
				},{
					data : 'index',
				},{
					data : 'instanceName', defaultContent : ''
				},{
					data : 'version', defaultContent : ''
				},{
					data : 'healthValue', defaultContent : ''
				},{
					data : 'swap.value', defaultContent : ''
				},{
					data : 'cpu.value', defaultContent : ''
				},{
					data : 'mem.value', defaultContent : ''
				},{
					data : 'disk.value', defaultContent : ''
				},{
					data : 'net.value', defaultContent : ''
				},{
					data : 'ip', defaultContent : ''
				},{
					data : 'appName', defaultContent : ''
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
					title: "操作系统-" + tr.instanceName,
					moduleId:"basicMonitor",
					section:["operatingSystem","linuxSummary","LinuxTabs"],
					id:"",
					params:{
						'logicalId':tr.objectId,
					}
				});
			});
			
			app.common.ajaxWithAfa({
				url  : "LINUXSummaryAction_getLinuxSummaryInfo.do",
			}).done(function(data){
				//实例状态、关键KPI
				var base = data.linuxSummaryBaseInfo;
				if(!base && $.isEmptyObject(base)){
					return;
				}
				for(var i in base){
					$('#' + i, $el).text(base[i]);
				}
				//事件数
				var event = base.event;
				if(!event && $.isEmptyObject(event)){
					return;
				}
				for(var i in event){
					$('#' + i, $el).text(event[i]);
				}
				//表格
				var mertrics = base.osInstance;
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
				url		 : 'LINUXSummaryAction_getEventViewEcharts.do',
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