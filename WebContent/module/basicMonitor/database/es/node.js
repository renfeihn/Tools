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
					data: 'status',defaultContent: ''
				},{
					data: 'ip',defaultContent: ''
				},{
					data: 'version',defaultContent: ''
				},{
					data: 'role',defaultContent: ''
				},{
					data: 'cpu',defaultContent: ''
				},{
					data: 'mem',defaultContent: ''
				},{
					data: 'jvm',defaultContent: ''
				},{
					data: 'query',defaultContent: ''
				},{
					data: 'index',defaultContent: ''
				},{
					data: 'file',defaultContent: ''
				}]
			});
			let fakeData = [{"name": "node-3","status":"正常","ip":'10.9.3.132',"version":"v1.2.1","role":"数据节点","cpu":"32%","mem":"56%","jvm":"43%","query":"121","index":"69","file":"35"}];
			dataTable.rows.add(fakeData).draw();
			return;


			var clusterId = scope.midData.Cluster_ID;
			var objId = scope.midData.objId;
		    var appId = scope.midData.appId;
		    var serverId = scope.midData.serverId;
			var nodeList;
		
		    $('table tbody', $el).delegate('tr', 'click', function(){
		    	var $this = $(this);
		    	app.domain.exports("appAll", {
		    		'objId':nodeList[$this.index()].obj_id,
		    		'appId':nodeList[$this.index()].appId,
		    		'serverId':nodeList[$this.index()].server_id,
		    		'objType': "5",
		    		'pageflag': '813',
		    		'partion_id':nodeList[$this.index()].partion_id,
		    		'Cluster_Or_Not': "否",
		    		'Obj_Class_3': 'es',
				});
		    	app.dispatcher.load({
		    		title: 'ES节点详情-'+nodeList[$this.index()].name,
		    		moduleId:'appAll', 
		    		section: ['system','board'],
		    		params: {
			            'objId': nodeList[$this.index()].obj_id,
			            'serverId':serverId,
			            'appId':appId,
			            'appName': scope.midData.appName,
			            'nodeInfo': nodeList[$this.index()]
			          }
		    	});
		    });
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
	            	var tableKeys = ["name","ip","version",
	            	   	          'role','cpuuse', 'memuse',
	            	   	          'jvmuse', 'searchrate', 'indexrate',
	            	   	          'docs']
    	   			var otherKeys = [];
	            	app.common.ajaxWithAfa({
	            		url: 'AFARequestAction_callAfaAppGfPub.do',
	    				data:{
	    					"appType": "VISUAL",
	                    	"target": "QryEsNodeInfo",
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
						var dealData = [];
						if(data != null){
							var list = data.info;
							nodeList = $.extend(true, {}, list);
							var totalNum = list.length;
	                        		for(var i=0; i<totalNum;i++) {
		                                dealData.push([
		                                    '<tr role="row">'+
		                                    '<td>' + list[i].name + '</td>',
		                                    '<td>' + list[i].status +'</td>',
		                                    '<td>' + list[i].ip + ':' + list[i].port +'</td>',
		                                    '<td>' + list[i].version +'</td>',
		                                    '<td>' + list[i].role +'</td>',
		                                    '<td>' + list[i].cpuuse + '</td>',
		                                    '<td>' + list[i].memuse + '</td>',
		                                    '<td>' + list[i].jvmuse + '</td>',
		                                    '<td>' + list[i].searchrate + '</td>',
		                                    '<td>' + list[i].indexrate + '</td>',
		                                    '<td>' + list[i].docs + '</td>' +'</tr>',
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