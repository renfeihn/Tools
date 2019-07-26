define(["jquery"],function(){
	// 公共变量，用于保存生成的handler的cacheId
	return {
		load:function($el,scope,handler){
			var objId= scope.objId
			var $nodesTable = $("#nodesTable", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 10,
				'aoColumnDefs':[{bSortable:false,aTargets:[0]}],
				'columns' 	: [{
					data : 'io_ratio', defaultContent : ''
				},{
					data : 'io-wait-ratio', defaultContent : ''
				},{
					data : 'network-io-rate', defaultContent : ''
				},{
					data : 'connection-count', defaultContent : ''
				},{
					data : 'request-size-avg', defaultContent : ''
				},{
					data : 'io-wait-time-ns-avg', defaultContent : ''
				},{
					data : 'connection-close-rate', defaultContent : ''
				},{
					data : 'connection-creation-rate', defaultContent : ''
				}],
			});
			fninitTable();
			function fninitTable(){
				app.common.ajaxWithAfa({
					url  : "KafkaMonitorAction_getNodeList.do",
					data : {objId : 0}
				}).done(function(data){
					addData(data, $nodesTable);
				});
			}
			/*组织表格数据*/
			function addData(data, $table){
				var result = data.result;
				$table.clear();
				if(result && result.length > 0){
					$table.rows.add(result).draw();
				}
			}
			$nodesTable.on('click','tbody>tr',function(e){
				var tr = $nodesTable.row(this).data();
				if(tr == undefined){return;}
				var name = ($(this).children("td").eq(1).text());
				console.log(tr)
				app.dispatcher.load({
					title: "节点详情-"+tr.serverid,
					moduleId: 'basicMonitor',
					section: ['bigdata','kafkaNodeDetail','kafkaNodeTabs'],
					id:"",
					params:{
						key: tr.key,
						type:tr.role,
						ip:tr.ip,
						name:tr.serverid,
						version:tr.version,
						objectId:tr.object_id,
						category:"kafka"
					}
				});
			});
		},
		
		unload:function(handler){
		},
		
		pause:function($el,scope,handler){
		},
		
		resume:function($el,scope,handler){
		}
		
	}
});