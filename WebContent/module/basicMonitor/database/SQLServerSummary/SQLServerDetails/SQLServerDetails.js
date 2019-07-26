define([ "jquery" ], function() {
	
	var eReqandwait,eComCounts,edbInfo,eCacheInfo;
	
	return {
		load : function($el, scope, handler) {
			var objectId = scope.objectId;
			var $conversationTab = $("#conversationTab",$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'sessionId', defaultContent : ''
				},{
					data : 'loginName', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'cpuTime', defaultContent : ''
				},{
					data : 'memoryUsage', defaultContent : ''
				},{
					data : 'totalScheduledTime', defaultContent : ''
				},{
					data : 'totalElapsedTime', defaultContent : ''
				},{
					data : 'lastRequestStartTime', defaultContent : ''
				},{
					data : 'lastRequestEndTime', defaultContent : ''
				},{
					data : 'reads', defaultContent : ''
				},{
					data : 'writes', defaultContent : ''
				},{
					data : 'logicalReads', defaultContent : ''
				}]
			});
			var $workTab = $("#workTab",$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'jobId', defaultContent : ''
				},{
					data : 'jobName', defaultContent : ''
				},{
					data : 'lastTime', defaultContent : ''
				},{
					data : 'lastStat', defaultContent : ''
				},{
					data : 'lastRunTime', defaultContent : ''
				},{
					data : 'lastRunStat', defaultContent : ''
				},{
					data : 'nextTime', defaultContent : ''
				}]
			});
			
			app.common.ajaxWithAfa({
				url  : "SqlServerInstanceAction_getSqlServerInstanceBaseInfo.do",
				data : {
					objectId : objectId
				}
			}).done(function(data){
				//基本信息
				var base = data.sqlServerInstanceBaseInfo;
				if(!base && $.isEmptyObject(base)){
					return;
				}
				for(var i in base){
					$('#' + i, $el).text(base[i]);
				}
				//健康度
				new HealthCon({
					id 		  : "health",
					stopPoint : base.healthValue,
				});
				//表格
				var sessionInformation = base.sessionInformation;
				var jobInformation = base.jobInformation;
				if(sessionInformation && sessionInformation.length > 0){
					sessionInformation.forEach(function(item, index){
						item.index = ++index;
					});
					$conversationTab.rows.add(sessionInformation).draw();
				}
				if(jobInformation && jobInformation.length > 0){
					jobInformation.forEach(function(item, index){
						item.index = ++index;
					});
					$workTab.rows.add(jobInformation).draw();
				}
			});
			
			//请求与等待统计	
			eReqandwait = app.drawEcharts({
				handler	 : handler,
				context	 : $el,
				selector : '#reqandwait',
				eType	 : 'line',
				url		 : 'SqlServerInstanceAction_getEcharts.do',
				unit	 : '个',
				items	 : ['每秒的请求', '每秒的编译','等待锁的进程数','等待写入日志缓存的进程数','页 I/O 闩锁等待','页闩锁等待'],
				urlParams: {
					objectId : objectId,
					interval : 1,
					time 	 : 60,
					metricNames : ['db.sqlserver_req_statistic_reqs_ps','db.sqlserver_req_statistic_compiles_ps',
					               'db.sqlserver_req_statistic_lock_wait_procs','db.sqlserver_req_statistic_logca_write_waits',
					               'db.sqlserver_req_statistic_page_io_latch_waits','db.sqlserver_req_statistic_page_latch_waits']
				}
			});
			eReqandwait.start();
			//常规统计	
			eComCounts = app.drawEcharts({
				handler	 : handler,
				context	 : $el,
				selector : '#comCounts',
				eType	 : 'line',
				url		 : 'SqlServerInstanceAction_getEcharts.do',
				unit	 : '个',
				items	 : ['连接数', '每秒登录','每秒登出','当前阻塞数量','无用的临时表'],
				urlParams: {
					objectId : objectId,
					interval : 1,
					time 	 : 60,
					metricNames : ['db.sqlserver_req_statistic_user_connections','db.sqlserver_req_statistic_logins_sec',
					               'db.sqlserver_req_statistic_logouts_sec','db.sqlserver_req_statistic_proc_blocked',
					               'db.sqlserver_req_statistic_temp_tables']
				}
			});
			eComCounts.start();
			//数据库信息	
			edbInfo = app.drawEcharts({
				handler	 : handler,
				context	 : $el,
				selector : '#dbInfo',
				eType	 : 'line',
				url		 : 'SqlServerInstanceAction_getEcharts.do',
				unit	 : '个',
				items	 : ['日志刷新等待', '日志刷新频率','事务数','锁请求频率','锁超时频率','每秒导致死锁的锁请求数'],
				urlParams: {
					objectId : objectId,
					interval : 1,
					time 	 : 60,
					metricNames : ['db.sqlserver_statistic_log_flush_wait_time','db.sqlserver_statistic_log_flushes_sec',
					               'db.sqlserver_statistic_transactions_sec','db.sqlserver_statistic_lock_reqs_sec',
					               'db.sqlserver_statistic_lock_timeouts_sec','db.sqlserver_statistic_deadlocks_sec']
				}
			});
			edbInfo.start();
			//缓存信息
			function cacheEcharts(unit,items,metricNames){
				eCacheInfo = app.drawEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#cacheInfo',
					eType	 : 'line',
					url		 : 'SqlServerInstanceAction_getEcharts.do',
					unit	 : unit,
					items	 : items,
					urlParams: {
						objectId : objectId,
						interval : 1,
						time 	 : 60,
						metricNames : metricNames
					}
				});
				eCacheInfo.start();
			}
			$('#cacheUl li',$el).click(function(){
				var index = $(this).index();
				var unitArr = ['%','页','ms','页/秒','次/秒']
				var itemsArr = [['缓冲区命中率'],['缓冲池页数'],['没有引用的页存留时间'],['checkpoint执行频率'],['懒写入频率']];
				var metricNamesArr = [['db.sqlserver_base_statistic_buf_cache_hit_ratio'],['db.sqlserver_base_statistic_database_pages'],
				                      ['db.sqlserver_base_statistic_page_life_expectancy'],['db.sqlserver_base_statistic_checkpoint__sec'],
				                      ['db.sqlserver_base_statistic_lazy_writes_sec']]
				cacheEcharts(unitArr[index],itemsArr[index],metricNamesArr[index]);
			});
			$('#cacheUl li:first-child',$el).trigger('click');
		},
		unload : function(handler) {
			eReqandwait && eReqandwait.dispose();
			eComCounts && eComCounts.dispose();
			edbInfo && edbInfo.dispose();
			eCacheInfo && eCacheInfo.dispose();
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});