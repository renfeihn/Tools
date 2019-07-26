define([ "jquery" ], function() {
	var e_sum_size,e_lock_count,e_db_space,eEvent;
	var echartsArr = [e_sum_size,e_lock_count,e_db_space,eEvent];
	var echartsObj = {
		'e_sum_size': e_sum_size,
		'e_lock_count': e_lock_count,
		'e_db_space': e_db_space
	};
	return {
		load : function($el, scope, handler) {
			
			var objectId = scope.objectId||'66666';
			
			
			//echarts、表格公共配置
			var basicEcharts = {
				handler	: handler,
				context	: $el,
				eType	: 'line',
			},
			urlParams = {
				objectId : objectId,
				interval : 1,
				time 	 : 60
			}
			
			//锁信息
			var $lockInfoTable = $("#lockInfoTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'searching':false,
				'pageLength':5,
				'columns':[
				{
					data:'index',
				},{
					data:'dbsname',defaultContent:''
				},{
					data:'tabname',defaultContent:''
				},{
					data:'lockcount',defaultContent:''
				}],
			});

			//关键表信息
			var $keyTableTable = $("#keyTableTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'searching':false,
				'pageLength':5,
				'columns':[
				           {
				        	   data:'index',
				           },{
				        	   data:'tabname',defaultContent:''
				           },{
				        	   data:'sum_size',defaultContent:''
				           }],
				});
			
			//会话性能统计
			var $callPerformTable = $("#callPerformTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'searching':false,
				'pageLength':5,
				'columns':[{
				        	   data:'index',
				           },{
				        	   data:'sid',defaultContent:''
				           },{
				        	   data:'username',defaultContent:''
				           },{
				        	   data:'hostname',defaultContent:''
				           },{
				        	   data:'accessable',defaultContent:''
				           },{
				        	   data:'locksheld',defaultContent:''
				           },{
				        	   data:'seqscans',defaultContent:''
				           },{
				        	   data:'total_sorts',defaultContent:''
				           },{
				        	   data:'dsksorts',defaultContent:''
				           },{
				        	   data:'memsorts',defaultContent:''
				           }],
			});
			
			//表空间使用信息
			var $spaceUseTable = $("#spaceUseTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'searching':false,
				'pageLength':5,
				'columns':[{
				        	   data:'dbspace',defaultContent:''
				           },{
				        	   data:'allocated',defaultContent:''
				           },{
				        	   data:'free',defaultContent:''
				           },{
				        	   data:'',defaultContent:''
				           }],
				           'aoColumnDefs':[{
								'render':function(data,type,row,meta){
										return (row.pcused/row.allocated).toFixed(2);
								},
								'targets':3
							}]
				});
			
			getBaseInfo();
			//实例健康度
			function getBaseInfo(){
				app.common.ajaxWithAfa({
					url  : "InformixDetailAction_getBaseInfo.do",
					data : {objectId : objectId}
				}).done(function(data){
					var data = data.result;
					if(!data || $.isEmptyObject(data)){
						return;
					}
					//健康度
					new HealthCon({
						id 		  : "health",
						stopPoint : data.healthValue,
						context   : $el
					});
					$('#undealingCount',$el).text(parseInt(data.unClosedCount));
					$('#warningCount',$el).text(data.warningCount);
					$('#alarmCount',$el).text(data.alertCount);
					
					$('#dayEventCount',$el).text(data.dayEventCount);//当日事件总数
					$('#sqlRunTime',$el).text(data.runningTime);//数据库运行时间	
					
					$('#sqlVersion',$el).text(data.version);//数据库版本
					$('#shareMer',$el).text(data.shareMem);//共享内存大小
					if(data.status){
						$('#sqlState',$el).text('正常');//数据库状态
					}else{
						$('#sqlState',$el).text('异常');//数据库状态
					}
				});
			}
			
			
			//事件总览
			eEvent = app.drawEcharts($.extend({}, basicEcharts, {
					selector : '#eEvent',
					unit	 : '%',
					url: 'InformixDetailAction_getEventViewEcharts.do',
					urlParams: $.extend({}, urlParams),
					items	 : ['告警', '预警'],
				}));
			eEvent.start();
			
			function addData(data, $table){
				var result = data.result;
				$table.clear();
				if(result && result.length > 0){
					result.forEach(function(item, index){
						item.index = ++index;
					});
					$table.rows.add(result).draw();
				}
			}
			
			getLockinfoList();
			//锁信息
			function getLockinfoList(){
				app.common.ajaxWithAfa({
					url  : "InformixDetailAction_getLockinfoList.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $lockInfoTable);
				});
			}
			
			getPrimarytableList();
			//关键表信息
			function getPrimarytableList(){
				app.common.ajaxWithAfa({
					url  : "InformixDetailAction_getPrimarytableList.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $keyTableTable);
				});
			}
			
			getSessioninfoList();
			//会话性能统计
			function getSessioninfoList(){
				app.common.ajaxWithAfa({
					url  : "InformixDetailAction_getSessioninfoList.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $callPerformTable);
				});
			}
			
			
			getSpaceList();
			//表空间使用信息
			function getSpaceList(){
				app.common.ajaxWithAfa({
					url  : "InformixDetailAction_getSpaceList.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $spaceUseTable);
				});
			}
			
			
			//表大小TOP3、锁数量TOP3、表空间使用率TOP3 echarts图
			drawEcharts('e_sum_size',"InformixDetailAction_getTableTop3.do");
			
			function drawEcharts(id,url){
				echartsObj[id] = app.drawEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#' + id,
					eType	 : 'line',
					url		 : url,
					unit	 : '个',
					items	 : ['Top1', 'Top2', 'Top3'],
					urlParams: $.extend({}, urlParams),
					succfn	 : function(data){
						$('[data-title=top1]',$el).text(data.content.currData.line1);
						$('[data-title=top2]',$el).text(data.content.currData.line2);
						$('[data-title=top3]',$el).text(data.content.currData.line3);
					}
				});
				echartsObj[id].start();
			}
			
			//  标签页tabs事件绑定
			$('a[data-toggle="tab"]', $el).on('shown', function (e) {
				var cur_eDom_Id = $($(e.target).attr("href")+' .top3-charts', $el).attr("id");
				if(cur_eDom_Id == 'e_sum_size'){
					url="InformixDetailAction_getTableTop3.do";
				}else if(cur_eDom_Id == 'e_lock_count'){
					url="InformixDetailAction_getLockTop3.do";
				}else if(cur_eDom_Id == 'e_db_space'){
					url="InformixDetailAction_getTableSpaceUsedTop3.do";
				}
				if(echartsObj[cur_eDom_Id] == null){
					drawEcharts(cur_eDom_Id,url);
				}
			})
			
		},
		unload : function(handler) {
			echartsArr.forEach(function(item){
				item && item.dispose();
			})
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});