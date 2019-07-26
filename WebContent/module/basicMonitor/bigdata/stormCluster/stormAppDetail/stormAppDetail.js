define([ "jquery" ], function() {

	return {
		load : function($el, scope, handler) {
			
			var objectId = 600232||scope.objectId;
			var appname = scope.id;
			var $spoutsTable = $("#spoutsTable", $el).DataTable({
				'bStateSave': false,
				"bAutoWidth": false,//自动宽度
				"ordering": false,
				'searching' : false,
				"bPaginate":true,
				'columns' 	: [{
					data : 'spoutId', defaultContent : ''
				},{
					data : 'executors', defaultContent : ''
				},{
					data : 'tasks', defaultContent : ''
				},{
					data : 'emitted', defaultContent : ''
				},{
					data : 'transferred', defaultContent : ''
				},{
					data : 'completeLatency', defaultContent : ''
				},{
					data : 'acked', defaultContent : ''
				},{
					data : 'failed', defaultContent : ''
				},{
					data : 'errorHost', defaultContent : ''
				},{
					data : 'errorPort', defaultContent : ''
				},{
					data : 'lastError', defaultContent : ''
				},{
					data : 'errorTime', defaultContent : ''
				}],
			});
			var $boltsTable = $("#boltsTable", $el).DataTable({
				'bStateSave': false,
				"bAutoWidth": false,//自动宽度
				"ordering": false,
				'searching' : false,
				"bPaginate":true,
				'columns' 	: [{
					data : 'boltId', defaultContent : ''
				},{
					data : 'executors', defaultContent : ''
				},{
					data : 'tasks', defaultContent : ''
				},{
					data : 'emitted', defaultContent : ''
				},{
					data : 'transferred', defaultContent : ''
				},{
					data : 'capacity', defaultContent : ''
				},{
					data : 'executeLatency', defaultContent : ''
				},{
					data : 'executed', defaultContent : ''
				},{
					data : 'processLatency', defaultContent : ''
				},{
					data : 'acked', defaultContent : ''
				},{
					data : 'failed', defaultContent : ''
				},{
					data : 'errorHost', defaultContent : ''
				},{
					data : 'errorPort', defaultContent : ''
				},{
					data : 'lastError', defaultContent : ''
				},{
					data : 'errorTime', defaultContent : ''
				}],
			});
			var $configTable = $("#configTable", $el).DataTable({
				'bStateSave': false,
				"bAutoWidth": false,//自动宽度
				"ordering": false,
				'searching' : false,
				"bPaginate":true,
				"pageLength":5,
				'columns' 	: [{
					data : 'key', defaultContent : ''
				},{
					data : 'value', defaultContent : ''
				}],
			});
			fnInit();
			function fnInit(){
				app.common.ajaxWithAfa({
					url  : "StormMonitorAction_getAppDetail.do",
					data:{
						"path":'http://10.9.3.168:8078/api/v1/topology/'+appname,
					}
				}).done(function (data) {
					if(!$.isEmptyObject(data.result)){
						addData(data.result.bolts, $boltsTable);
						addData(data.result.spouts, $spoutsTable);
						addData2(data.result.configuration, $configTable);
					}
				});
			}
			
			/*组织表格数据*/
			function addData(data, $table){
				$table.clear();
				if(data && data.length > 0){
					$table.rows.add(data).draw();
				}
			}			
			/*组织表格数据*/
			function addData2(data, $table){
				$table.clear();
				var tmpData = [];
				for(var i in data){
					var tmp = {};
					tmp.key = i;
					if(data[i]=='[object Object]'){
						var html = "";
						for(var j in data[i]){
							html+="<span>"+j+":"+data[i][j]+"</span></br>"
						}
						tmp.value = html;
					}else{
						tmp.value = data[i]
					}
					tmpData.push(tmp);
				}
				if(tmpData && tmpData.length > 0){
					$table.rows.add(tmpData).draw();
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