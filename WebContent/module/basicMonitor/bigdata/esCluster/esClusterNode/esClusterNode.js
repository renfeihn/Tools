define(["jquery"],function(){
	// 公共变量，用于保存生成的handler的cacheId
	return {
		load:function($el,scope,handler){
			var objId= 0||scope.objId
			var $nodesTable = $("#nodesTable", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: true,
				'pageLength' : 10,
				'aaSorting':[[3,'desc']],
				'aoColumnDefs':[{bSortable:false,aTargets:[0]}],
				'columns' 	: [{
					data : 'name', defaultContent : ''
				},{
					data : 'ip', defaultContent : ''
				},{
					data : 'version', defaultContent : ''
				},{
					data : 'role', defaultContent : ''
				},{
					data : 'cpuuse', defaultContent : ''
				},{
					data : 'memuse', defaultContent : ''
				},{
					data : 'jvmuse', defaultContent : ''
				},{
					data : 'searchrate', defaultContent : ''
				},{
					data : 'indexrate', defaultContent : ''
				},{
					data : 'docs', defaultContent : ''
				}],
			});
			fninitTable();
			function fninitTable(){
				app.common.ajaxWithAfa({
					url  : "ESMonitorAction_getNodeList.do",
					data : {0 : 0}
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