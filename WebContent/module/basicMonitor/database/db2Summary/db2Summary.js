define([ "jquery" ], function() {
	var db2Echart;
	return {
		load : function($el, scope, handler) {
			var $dataTable = $("#dataTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'columns':[{
					data:null,
				},{
					data:'index',defaultContent:''
				},{
					data:'insName',defaultContent:''
				},{
					data:'healthValue',defaultContent:''
				},{
					data:'lockNum',defaultContent:''
				},{
					data:'tabExcpt',defaultContent:''
				},{
					data:'longSql',defaultContent:''
				},{
					data:'longTask',defaultContent:''
				},{
					data:'dictShoot',defaultContent:''
				},{
					data:'sessionCount',defaultContent:''
				},{
					data:'cpuUsed',defaultContent:''
				},{
					data:'memUsed',defaultContent:''
				},{
					data:'diskActive',defaultContent:''
				},{
					data:'ip',defaultContent:''
				},{
					data:'appName',defaultContent:''
				}],
				'aoColumnDefs':[{
                    "render": function(data, type, row, meta) {
                    	return '<input type="checkbox" />'
                    },
                    "targets" : 0
				},{
					'render':function(data,type,row,meta){
						if(data<60){
							return '<span class="red">'+data+'</span>'
						}else if(data<80){
							return '<span class="yellow">'+data+'</span>'
						}else{
							return '<span class="green">'+data+'</span>'
						}
					},
					'targets':3
				},{
					'render':function(data,type,row,meta){
						return data+'<span style="background-size:'+data+'px 2px"></span>'
					},
					'targets':10
				},{
					'render':function(data,type,row,meta){
						return data+'<span style="background-size:'+data+'px 2px"></span>'
					},
					'targets':11
				}]
			});
			app.common.ajaxWithAfa({
				url:'DB2SummaryAction_getDB2SumBase.do'
			}).done(function(data){
				var baseData = data.db2Base;
				for(var i in baseData){
					$('#'+i,$el).text(baseData[i]);
				}
				var tableData = baseData.db2Instance;
				$dataTable.clear();
				if(tableData && tableData.length>0){
					tableData.forEach(function(item,index){
						item.index = ++index;
					});
					$dataTable.rows.add(tableData).draw();
				}
				
			});
			$('#dataTable',$el).on('click','tbody>tr',function(e){
				var tr = $dataTable.row(this).data();
				if(tr == undefined){return;}
				app.dispatcher.load({
					title: "DB2详情",
					moduleId:"basicMonitor",
					section:["database","db2Summary","db2details"],
					id:tr.objectId,
					params:{
						'sysId':tr.objectId,
					}
				});
			})
			
			db2Echart = app.drawEcharts({
				handler: handler,
				context: $el,
				selector: '#echarts',
				eType: 'line',
				url: 'DB2SummaryAction_getEventEchart.do',
				unit: '个',
				urlParams: {
					timeBlock: 30,
					interval: 1,
					time:60,
				},
				items: ['预警','告警'],
			});
			db2Echart.start();
			
		},
		unload : function(handler) {
			db2Echart && db2Echart.dispose();
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});