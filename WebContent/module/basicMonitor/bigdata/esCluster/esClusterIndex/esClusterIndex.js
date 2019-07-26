define(["jquery"],function(){

	return {
		
		load:function($el,scope,handler){
			
			var $indexTable = $("#indexTable", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: true,
				'pageLength' : 10,
				'aaSorting':[[3,'desc']],
				'aoColumnDefs':[{bSortable:false,aTargets:[0]}],
				'columns' 	: [{
					data : 'name', defaultContent : ''
				},{
					data : 'docs', defaultContent : ''
				},{
					data : 'current', defaultContent : ''
				},{
					data : 'searchrate', defaultContent : ''
				},{
					data : 'indexrate', defaultContent : ''
				},{
					data : 'refreshrate', defaultContent : ''
				},],
			});
			fninitTable();
			function fninitTable(){
				app.common.ajaxWithAfa({
					url  : "ESMonitorAction_getIndexList.do",
					data : {objId : 0}
				}).done(function(data){
					addData(data, $indexTable);
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
			
		},
		
		unload:function(handler){
		},
		
		pause:function($el,scope,handler){
		},
		
		resume:function($el,scope,handler){
		}
		
	}
});