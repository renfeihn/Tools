define(["jquery"],function(){

	return {
		
		load:function($el,scope,handler){
			var tableData = [],list=[]//表格数据
			objId = scope.objectId,
			$table = $('#topicTable',$el),
			$tableBody = $('#topicTable>tbody',$el)
			ajaxTreeTable();
			function ajaxTreeTable(){
				$.ajax({
					"type" : "post",
					"url" : "KafkaMonitorAction_getTopicList.do",
					"dataType" : "json",
					"data":{objId:0},
					"success" : function (data){
						if(data.status){
							tableData = data.content.result;
							getOrderData(tableData);
							getTreeTable();
						}else{
							showError(data.errorMsg);
						}
					}
				});
			} 
			function getOrderData(data){
        		for(var i in data){
        			var sData = data[i];
        			if(sData.pid == "0"){
        				list.push(sData);
        				for(var i in tableData){
    	        			var temp = tableData[i];
    	        			if(temp.pid == sData.mid){
    	        				list.push(temp);
    	        			}
    	        		}
        			}
        		}
        	}
			function getTreeTable(){
				if(list.length > 0){
					for(var i = 0; i < list.length; i++){
						var row = list[i];
						console.log(row.UnderReplicated)
						var offset = row.LogStartOffset!=undefined?(row.LogEndOffset-row.LogStartOffset):"";
						var tbody = '<tr index-val="'+i+'" data-tt-id="'+row.mid+'" data-tt-parent-id="'+row.pid+'">'+
										'<td>' + (row.topicname||'') + '</td>' +
										'<td>' + (row.partition==undefined?"":row.partition) + '</td>' +
										'<td>' + offset + '</td>' +
										'<td>' + (row.UnderReplicated==undefined?"":row.UnderReplicated) + '</td>' +
										'<td>' + (row.Size==undefined?"":row.Size) + '</td>' +
									'</tr>';
						$tableBody.append(tbody);
					}
				}
				$table.treetable({ expandable: true });
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