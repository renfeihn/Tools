define([ "jquery" ], function() {
	var globalEcharts = {};
	var refreshClock;
	
	return {
		load : function($el, scope, handler,options) {

			let dataTable = $('#dataTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching': true,
				'bSort': false,
				'pageLength': 10,
				'columns': [{
					data: 'name',defaultContent: ''
				},{
					data: 'file',defaultContent: ''
				},{
					data: 'querying',defaultContent: ''
				},{
					data: 'querySpeed',defaultContent: ''
				},{
					data: 'indexSpeed',defaultContent: ''
				},{
					data: 'refreshSpeed',defaultContent: ''
				}]
			});
			let fakeData = [{"name": "index-3","file":"15","querying":'78',"querySpeed":"43","indexSpeed":"26","refreshSpeed":"44"}];
			dataTable.rows.add(fakeData).draw();
			return;


			var clusterId = scope.midData.Cluster_ID;
			var objId = scope.midData.objId;
		    var appId = scope.midData.appId;
		    var serverId = scope.midData.serverId;
			
			
			
//		       表格数据的获取
			var $TableBody;
	    	$TableBody = $('#dataTable',$el);		    	
	    	comTaskTable = $TableBody.dataTable({
	    		'bFilter':false,//搜索框
				"bProcession":true, //载入数据时，是否显示‘进度’提示  add by chenweikang 20170314
				"bInfo": true, //开关，是否显示表格的一些信息
				'bSort': false,//排序
				"bPaginate": true, //开关，是否显示分页器
				'bAutoWidth':false,//是否自动计算表格各列宽度，默认true
				'bServerSide': true,
				'bDestroy': true,//用于当要在同一个元素上执行新的dataTable绑定时，将之前的那个数据对象清除掉，换以新的对象设置，默认false
				'iDisplayLength':5,//用于指定一屏显示的条数，需开启分页器，默认为10
                'iDisplayStart': 0,
                'aLengthMenu':[10, 20, 50],
                'aoColumnDefs': [
                                 //多选框禁用排序unlockuserBtn
                                 {"bSortable": false, "aTargets": [0]}
                             ],
//                'bProcessing':true,
//                'aaSorting':aaSorting,
				"oLanguage":{
					"sZeroRecords":"无数据"
				},
//				"aoColumns":aoColumns,
				 "sDom":'t<"bottom"ilp><"clear">',
	            //使用post方式传递数据
	            'fnServerData': function (sSource, aoData, fnCallback) {
	            	var start = aoData[3].value,
	            	limit = aoData[4].value;
	            	var tableKeys = ["name","docs","current",
	            	   	          'searchrate','indexrate', 'refreshrate']
    	   			var otherKeys = [];
	            	app.common.ajaxWithAfa({
	            		url: 'AFARequestAction_callAfaAppGfPub.do',
	    				data:{
	    					"appType": "VISUAL",
	                    	"target": "QryEsIndexInfo",
	                    	"args": JSON.stringify({
	                    		'public': {
	                    			"_opertype_": "1",
	                    			"iDisplayStart":String(start),
	                    			"iDisplayLength":String(limit)
	                    		},
	                    		'private': {
	                    			"cluster_id": String(clusterId)
	                    		}
	                    	})
	    				}	
				}).done(function(data){
						var dealData = [],
                        i,items,item;
						if(data != null){
							var list = data.info;
							var totalNum = list.length;
	                        		for(var i=0; i<totalNum;i++) {
		                                dealData.push([
		                                    '<tr role="row">'+
		                                    '<td>' + list[i].name + '</td>',
		                                    '<td>' + list[i].docs +'</td>',
		                                    '<td>' + list[i].current +'</td>',
		                                    '<td>' + list[i].searchrate +'</td>',
		                                    '<td>' + list[i].indexrate + '</td>',
		                                    '<td>' + list[i].refreshrate + '</td>' +'</tr>',
		                                ]);
		                            }
	                        }else {
	                            app.alert('任务信息', data.errorMsg || '加载任务信息错误', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
	                        }

							fnCallback({'aaData': dealData ,'iTotalRecords': totalNum,'iTotalDisplayRecords': totalNum});
					})
	            }
	        });
		},
		unload : function(handler) {
			
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});