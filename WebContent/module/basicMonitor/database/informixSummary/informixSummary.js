define([ "jquery" ], function() {
	
	var eEvent;
	
	return {
		load : function($el, scope, handler) {
			var $dataTable = $("#dataTable", $el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'insName', defaultContent : ''//实例名称
				},{
					data : 'healthValue', defaultContent : ''//健康度
				},{
					data : 'dbStatus', defaultContent : ''//数据库状态
				},{
					data : 'dbVersion', defaultContent : ''//数据库版本
				},{
					data : 'dbUptime', defaultContent : ''//数据库运行时间
				},{
					data : 'objectId', defaultContent : ''//id隐藏列
				}],
				'aoColumnDefs' : [{
                    "render": function(data, type, row, meta) {
						if(data){
                    		return '<span style="color: #22ac38"> 正常 </span>';
						}else{
							return '<span style="color: #ff3341"> 故障 </span>';
						}
                    },
                    "targets" : 3
				},{
					'render':function(data,type,row,meta){
						if(data<60){
							return '<span class="alarm">'+data+'</span>'
						}else if(100>data>=60){
							return '<span class="warning">'+data+'</span>'
						}else {
							return '<span class="prmot">'+data+'</span>'
						}
					},
					'targets':2
				},{
                    'visible':false,
                    "targets" : 6
				}]
			});
			
			$('#dataTable tbody', $el).on('click', 'tr', function(){
				var tr = $dataTable.row( this ).data();
				if(tr == undefined){
					return;
				}
				objectId=tr.objectId;
				app.dispatcher.load({
					title: "INFORMIX-" + tr.insName,
					moduleId:"basicMonitor",
					section: ["database","informixSummary","informixDetails"],
					id:"",
					params:{
						'objectId':objectId,
					}
				});
			});
			
			app.common.ajaxWithAfa({
				url  : "InfomixSummaryAction_getInformixSumBase.do",
			}).done(function(data){
				//实例状态、关键KPI
				var base = data.result;
				if(!base && $.isEmptyObject(base)){
					return;
				}
				for(var i in base){
					$('#' + i, $el).text(base[i]);
				}

				//表格
				var mertrics = base.informixInsList;
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
				url		 : 'InfomixSummaryAction_ getEventEachart.do',
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