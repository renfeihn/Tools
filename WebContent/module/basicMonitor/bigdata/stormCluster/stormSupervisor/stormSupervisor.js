define(["jquery"],function(){
	// 公共变量，用于保存生成的handler的cacheId
	return {
		load:function($el,scope,handler){
			var objId= 0||scope.objId
			var $dataTable = $("#dataTable", $el).DataTable({
				'bStateSave': false,
				"bAutoWidth": true,//自动宽度
				"ordering": false,
				'searching' : false,
				"bPaginate":true,
				'columns' 	: [{
					data : 'host', defaultContent : ''
				},{
					data : 'uptime', defaultContent : ''
				},{
					data : 'version', defaultContent : ''
				},{
					data : 'usedMem', defaultContent : ''
				},{
					data : 'totalMem', defaultContent : ''
				},{
					data : 'slotsUsed', defaultContent : ''
				},{
					data : 'slotsTotal', defaultContent : ''
				},{
					data : 'logLink', defaultContent : ''
				}],
			});
			fninitTable();
			function fninitTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetrics.do",
					data:{
						"objectId":600232,
						'metricNames':['storm.supervisor."supervisors"']
					}
				}).done(function(data){
					addData(data, $dataTable);
				});
			}
			/*组织表格数据*/
			function addData(data, $table){
				var result = JSON.parse(data.result['storm.supervisor."supervisors"'].value);
				$table.clear();
				if(result && result.length > 0){
					$table.rows.add(result).draw();
				}
			}
			$dataTable.on('click','tbody>tr',function(e){
				var tr = $nodesTable.row(this).data();
				if(tr == undefined){return;}
				var name = ($(this).children("td").eq(1).text());
				console.log(tr)
				app.dispatcher.load({
					title: "节点详情-"+tr.name,
					moduleId: 'basicMonitor',
					section: ['bigdata','esNodeDetail','esNodeTabs'],
					id:"",
					params:{
						key: tr.key,
						type:tr.role,
						ip:tr.ip,
						name:tr.name,
						version:tr.version,
						key:tr.key,
						objectId:tr.object_id,
						category:'elasticsearch'
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