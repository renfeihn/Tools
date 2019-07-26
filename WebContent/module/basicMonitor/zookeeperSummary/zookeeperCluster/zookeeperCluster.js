define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			var $dataTable = $("#dataTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'columns':[{
					data:'index',defaultContent:''
				},{
					data:'clustername',defaultContent:''
				},{
					data:'servercount',defaultContent:''
				}]
			});
			var $serviceTable = $("#serviceTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'searching': false,
				'bSort': false,//排序
				'columns':[{
					data:'index',defaultContent:''
				},{
					data:'server_ip',defaultContent:''
				},{
					data:'server_port',defaultContent:''
				},{
					data:'state',defaultContent:''
				},{
					data:'connections',defaultContent:''
				},{
					data:'sent',defaultContent:''
				},{
					data:'received',defaultContent:''
				},{
					data:'latency',defaultContent:''
				},{
					data:'watch_count',defaultContent:''
				},{
					data:'status',defaultContent:''
				}],
				'aoColumnDefs' : [{
                    "render": function(data, type, row, meta) {
                    	if(data!=undefined){
                    		return '<span style="color: #51D148">正常</span>';
                    	}else{
                    		return '<span style="color: #FF3341">异常</span>';
                    	}
                    },
                    "targets" : 9
				}]
			});
			
			$("#dataTable", $el).on('click','tr',function () {
				var tr = $dataTable.row( this ).data();
				if(tr == undefined){
					return;
				}
				$(this).addClass('selected').siblings().removeClass('selected');
				LoadServiceData(tr.mobj_id);
			});
			$("#serviceTable",$el).on('click','tr',function(){
				var tr = $serviceTable.row( this ).data();
				if(tr == undefined){
					return;
				}
				
				app.dispatcher.load({
					title: "zookeeper详情-"+tr.server_ip,
					moduleId: "basicMonitor",
					section: ["zookeeperSummary","zookeeperTabs"],
					id:'',
					params:{
						objectId:tr.mobj_id,
						category:'zookeeper'
					}
				});
			})
			//集群信息
			LoadClusterData();
			function LoadClusterData(){
				app.common.ajaxWithAfa({
					url:"ZookeeperMonitorAction_getClusterFormInfo.do",
				}).done(function(data){
					addData(data.clusterDataInfo,$dataTable);
					
					$("#dataTable tbody>tr:first",$el).trigger('click').addClass('selected');
				});
			}
			//服务信息
			function LoadServiceData(objectId){
				app.common.ajaxWithAfa({
					url:"ZookeeperMonitorAction_getServerDetailInfo.do",
					data:{
						objectId:objectId,
					}
				}).done(function(data){
					addData(data.appDataInfo,$serviceTable);
				});
			}
			function addData(data, $table){
				var result = data;
				$table.clear();
				if(result && result.length > 0){
					result.forEach(function(item, index){
						item.index = ++index;
					});
					$table.rows.add(result).draw();
				}
			}
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});