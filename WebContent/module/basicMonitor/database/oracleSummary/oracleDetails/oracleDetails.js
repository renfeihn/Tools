define([ "jquery" ,'underscore'], function($,_) {

	//echarts对象
	var eProUsed, eProSource, eConnCls, eConnStatus, eSgaFree, eHitRate,
		eSpaceRate, eConvUsed, eWaitLock, eLogSize, eASMSize, eUselessObj, 
		eLockCount, ePerRollback, eWorkNum, eCursorNum, eCursorUsed;
	
	return {
		load : function($el, scope, handler) {
			var isFirstClick = true;
            var tab1Aysn = [],tab2Aysn = [];
            //记录tab1 当前的定时器
            handler.currentAysn1 =  function(){
            	var currentAysn = this.intervals;
            	tab1Aysn = _.difference(currentAysn, tab2Aysn);
            }
            //记录tab2 当前的定时器
            handler.currentAysn2 = function(){
            	var currentAysn = this.intervals;
            	//和tab1中的定时器比较 取出不相同的
            	tab2Aysn = _.difference(currentAysn, tab1Aysn);
            }
		   //当前hander添加停止定时器
			handler.stopTapAysn1 = function(){
				if(tab1Aysn){
					for(var i in tab1Aysn){
						window.clearInterval(tab1Aysn[i].windowId);
					}
				}
			}
			handler.stopTapAysn2 = function(){
				if(tab2Aysn){
					for(var i in tab2Aysn){
						window.clearInterval(tab2Aysn[i].windowId);
					}
				}
			}
			handler.startTapAysn1 = function(){
				if(tab1Aysn)
				for (var i in tab1Aysn) {
					window.clearInterval(tab1Aysn[i].windowId);
					var event = tab1Aysn[i];
					event.windowId = window.setInterval(event.func, event.time);
				}
			}
			handler.startTapAysn2 = function(){
				if(tab2Aysn)
				for (var i in tab2Aysn) {
					window.clearInterval(tab2Aysn[i].windowId);
					var event = tab2Aysn[i];
					event.windowId = window.setInterval(event.func, event.time);
				}
			}
			
			
			var objectId = 75373;
			
			
			//echarts、表格公共配置
			var basicEcharts = {
				handler	: handler,
				context	: $el,
				eType	: 'line',
				url		: 'GSOracleAction_getEcharts.do'
			},
			urlParams = {
				objectId : objectId,
				interval : 1,
				time 	 : 60
			},
			pageTable = {
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength': 5,
			},
			nonePageTable = {
				"paging"	: false,
				'searching'	: false,
				'bSort'		: false,
			};
			
			//表空间信息
			var $spaceTable = $("#spaceTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'name', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'type', defaultContent : ''
				},{
					data : 'extent_management', defaultContent : ''
				},{
					data : 'freemb', defaultContent : ''
				},{
					data : 'usedmb', defaultContent : ''
				},{
					data : 'sizemb', defaultContent : ''
				},{
					data : 'extendsizemb', defaultContent : ''
				}],
				/*'aoColumnDefs' : [{
                    "render": function(data, type, row, meta) {
                        if(data > 1){
                        	return '<span style="color:#0CBF47">' + data + '</span>';
                        }else{
                        	return '<span style="color:#0CBF47">' + data + '</span>';
                        }
                    },
                    "targets" : 6
				}]*/
			}));

			//Dataguard状态
			var $deadLock = $("#guardTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'dest_id', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				}]
			}));
			
			//备份信息
			var $bakTable = $("#bakTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'input_type', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'start_time', defaultContent : ''
				},{
					data : 'end_time', defaultContent : ''
				},{
					data : 'elapsed_seconds', defaultContent : ''
				}]
			}));
			
			//归档日志空间信息
			var $logSpaceTable = $("#logSpaceTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'group', defaultContent : ''
				},{
					data : 'thread', defaultContent : ''
				},{
					data : 'bytes', defaultContent : ''
				},{
					data : 'members', defaultContent : ''
				},{
					data : 'archived', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'first_change', defaultContent : ''
				},{
					data : 'first_time', defaultContent : ''
				}]
			}));
			
			//失效对象
			var $invalidTable = $("#invalidTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'object_type', defaultContent : ''
				},{
					data : 'owner', defaultContent : ''
				},{
					data : 'object_name', defaultContent : ''
				}]
			}));
			
			//执行时间最长的sql
			var $sqlTimeTable = $("#sqlTimeTable", $el).DataTable($.extend({}, nonePageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sql_text', defaultContent : ''
				},{
					data : 'elapsed_time', defaultContent : ''
				}]
			}));
			
			//执行次数最多的sql
			var $sqlCountTable = $("#sqlCountTable", $el).DataTable($.extend({}, nonePageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sql_text', defaultContent : ''
				},{
					data : 'executions', defaultContent : ''
				}]
			}));
			
			//读取磁盘最多的sql
			var $sqlDiskTable = $("#sqlDiskTable", $el).DataTable($.extend({}, nonePageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sql_text', defaultContent : ''
				},{
					data : 'disk_reads', defaultContent : ''
				}]
			}));
			
			//表记录最多Top5
			var $topRecordTable = $("#topRecordTable", $el).DataTable($.extend({}, nonePageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'owner', defaultContent : ''
				},{
					data : 'table_name', defaultContent : ''
				},{
					data : 'tablespace_name', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'compression', defaultContent : ''
				},{
					data : 'last_analyzed', defaultContent : ''
				},{
					data : 'num_rows', defaultContent : ''
				},{
					data : 'use_mb', defaultContent : ''
				}]
			}));
			
			//长时间锁等待信息
			var $longLockTable = $("#longLockTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sid', defaultContent : ''
				},{
					data : 'serial', defaultContent : ''
				},{
					data : 'username', defaultContent : ''
				},{
					data : 'event', defaultContent : ''
				},{
					data : 'sql_id', defaultContent : ''
				},{
					data : 'times', defaultContent : ''
				},{
					data : 'program', defaultContent : ''
				}]
			}));
			
			//死锁信息
			var $deadLockTable = $("#deadLockTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'agent_name', defaultContent : ''
				},{
					data : 'in_channel', defaultContent : ''
				},{
					data : 'sample_time', defaultContent : ''
				},{
					data : 'app_id', defaultContent : ''
				},{
					data : 'server_id', defaultContent : ''
				},{
					data : 'service_id', defaultContent : ''
				},{
					data : 'mobj_id', defaultContent : ''
				},{
					data : 'ls_count', defaultContent : ''
				}]
			}));
			
			//Seq信息
			var $seqTable = $("#seqTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sequence_owner', defaultContent : ''
				},{
					data : 'sequence_name', defaultContent : ''
				},{
					data : 'min_value', defaultContent : ''
				},{
					data : 'max_value', defaultContent : ''
				},{
					data : 'last_number', defaultContent : ''
				},{
					data : 'seq_used', defaultContent : ''
				}]
			}));
				
			//超长事务
			var $longTransTable = $("#longTransTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sid', defaultContent : ''
				},{
					data : 'username', defaultContent : ''
				},{
					data : 'machine', defaultContent : ''
				},{
					data : 'program', defaultContent : ''
				},{
					data : 'sql_text', defaultContent : ''
				}]
			}));
				
			//大事务
			var $bigTransTable = $("#bigTransTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sid', defaultContent : ''
				},{
					data : 'username', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'osuser', defaultContent : ''
				},{
					data : 'program', defaultContent : ''
				},{
					data : 'USED_UBLK', defaultContent : ''
				},{
					data : 'sql_text', defaultContent : ''
				}]
			}));
			
			//超长时间作业
			var $workTable = $("#workTable", $el).DataTable($.extend({}, pageTable, {
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sid', defaultContent : ''
				},{
					data : 'elapsed_seconds', defaultContent : ''
				},{
					data : 'opname', defaultContent : ''
				},{
					data : 'sql_text', defaultContent : ''
				}]
			}));
			
			//数据加载------------------------------------开始-------------------------------------
			//图
			fnProUsed();
			fnConnCls();
			fnSgaFree();
			fnConvUsed();
			fnLogSize();
			fnASMSize();
			//表格
			fnSpaceTable();
			fnDeadLock();
			fnLogSpaceTable();
			fnTopRecordTable();
			fnSeqTable();
			fnSqlTimeTable();
			fnLongLockTable();
			fnWorkTable();
			fnInvalidTable();
			//数据加载------------------------------------结束-------------------------------------
			
			
			//表格数据---------------------------------开始-----------------------------------
			//表空间
			function fnSpaceTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getTablespace.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $spaceTable);
				});
			}
			//DATAGUARD状态
			function fnDeadLock(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getDataGuardStatus.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $deadLock);
				});
			}
			//备份信息
			function fnBakTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getBackup.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $bakTable);
				});
			}
			
			function fnLogSpaceTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getTarLogSpace.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $logSpaceTable);
				});
			}
			//失效对象
			function fnInvalidTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getLoseEfficacyObject.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $invalidTable);
				});
			}
			//最长sql
			function fnSqlTimeTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getSqlTimeLong.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $sqlTimeTable);
				});
			}
			//次数最多sql
			function fnSqlCountTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getSqlExecutenum.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $sqlCountTable);
				});
			}
			//读取最多sql
			function fnSqlDiskTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getSqlDiskRead.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $sqlDiskTable);
				});
			}
			//记录top5
			function fnTopRecordTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getAllBigtblRecords.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $topRecordTable);
				});
			}
			//长时间等待
			function fnLongLockTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getLongTimeWaitLock.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $longLockTable);
				});
			}
			//死锁信息
			function fnDeadLockTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getLockInfo.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $deadLockTable);
				});
			}
			//seq
			function fnSeqTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getSequence.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $seqTable);
				});
			}
			//超长事务
			function fnLongTransTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getLongTask.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $longTransTable);
				});
			}
			//大事务
			function fnBigTransTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getLargeTask.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $bigTransTable);
				});
			}
			//超时作业
			function fnWorkTable(){
				app.common.ajaxWithAfa({
					url  : "GSOracleAction_getLongTimeWorkNum.do",
					data : {objectId : objectId}
				}).done(function(data){
					addData(data, $workTable);
				});
			}
			
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
			//表格数据---------------------------------开始-----------------------------------
			
			//页签切换时加载与清除echarts---------------------开始--------------------------------------
			$('#mainUl li', $el).click(function(){
				if($(this).hasClass("active")){
					return
				}
				var index = $('#mainUl li').index(this);
				if(index == 1){
					 handler.currentAysn1();
					 handler.stopTapAysn1();
					 handler.startTapAysn2();
					 if(isFirstClick){
						 fnCursorNum();
						 isFirstClick = false;
					 }
					
				}
				else{
					 handler.currentAysn2();
					 handler.stopTapAysn2();
					 handler.startTapAysn1();
				}
				/*if(this.className == 'active'){
					return;
				}
				
				var index = $('#mainUl li').index(this);
				var insArr = [
		            eProUsed, eProSource, eConnCls, eConnStatus, eSgaFree, eHitRate,
		            eSpaceRate, eConvUsed, eWaitLock, eLogSize, eASMSize, eUselessObj],
				appArr = [eLockCount, ePerRollback, eWorkNum, eCursorNum, eCursorUsed];
				if(index == 0){
					appArr.forEach(function(item){
						item && item.dispose();
					});
					fnProUsed();
					fnConnCls();
					fnSgaFree();
					fnConvUsed();
					fnLogSize();
					fnUselessObj();
					fnASMSize();
				}else{
					insArr.forEach(function(item){
						item && item.dispose();
					});
					fnCursorNum();
					fnSqlTimeTable();
					fnLongLockTable();
					fnWorkTable();
				}*/
			});
			$('#processUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#processUl li').index(this);
				if(index == 0){
					eProSource 	&& eProSource.dispose();
					fnProUsed();
				}else{
					eProUsed && eProUsed.dispose();
					fnProSource();
				}
			});
			$('#connUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#connUl li').index(this);
				
				if(index == 0){
					eConnStatus && eConnStatus.dispose();
					fnConnCls();
				}else{
					eConnCls && eConnCls.dispose();
					fnConnStatus();
				}
			});
			$('#sgaUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#sgaUl li').index(this);
				if(index == 0){
					eHitRate && eHitRate.dispose();
					fnSgaFree();
				}else{
					eSgaFree && eSgaFree.dispose();
					fnHitRate();
				}
			});
			$('#tableUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#tableUl li').index(this);
				if(index == 0){
					fnSpaceTable();
					eSpaceRate 	&& eSpaceRate.dispose();
				}else{
					fnSpaceRate();
				}
			});
			$('#convUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#convUl li').index(this);
				if(index == 0){
					fnConvUsed();
					eWaitLock && eWaitLock.dispose();
				}else{
					fnWaitLock();
					eConvUsed && eConvUsed.dispose();
				}
			});
			$('#guardUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#guardUl li').index(this);
				if(index == 0){
					fnDeadLock();
				}else{
					fnBakTable();
				}
			});
			$('#racUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#racUl li').index(this);
				if(index == 0){
					fnASMSize();
//					eLogSize && eLogSize.dispose();
				}else{
//					fnLogSize();
					eASMSize && eASMSize.dispose();
				}
			});
			/*$('#objUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#objUl li').index(this);
				if(index == 0){
					fnUselessObj();
				}else{
//					fnLogSpaceTable();
					fnInvalidTable();
					eUselessObj && eUselessObj.dispose();
				}
			});*/
			
			
			
			$('#sqlUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#sqlUl li').index(this);
				if(index == 0){
					fnSqlTimeTable();
				}else if(index == 1){
					fnSqlCountTable();
				}else{
					fnSqlDiskTable();
				}
			});
			$('#lockUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#lockUl li').index(this);
				if(index == 0){
					fnLongLockTable();
					eLockCount && eLockCount.dispose();
				}else if(index == 1){
					fnLockCount();
				}else{
					fnDeadLockTable();
					eLockCount && eLockCount.dispose();
				}
			});
			$('#rollbackUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#rollbackUl li').index(this);
				if(index == 0){
					fnLongTransTable();
					ePerRollback && ePerRollback.dispose();
				}else if(index == 1){
					fnBigTransTable();
					ePerRollback && ePerRollback.dispose();
				}else{
					fnPerRollback();
				}
			});
			$('#workUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#workUl li').index(this);
				if(index == 0){
					fnWorkTable();
					eWorkNum && eWorkNum.dispose();
				}else{
					fnWorkNum();
				}
			});
			$('#cursorUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				
				var index = $('#cursorUl li').index(this);
				if(index == 0){
					fnCursorNum();
					eCursorUsed && eCursorUsed.dispose();
				}else{
					fnCursorUsed();
					eCursorNum && eCursorNum.dispose();
				}
			});
			
			//页签切换时加载与清除echarts---------------------结束--------------------------------------
			
			
			//基础数据
			app.common.ajaxWithAfa({
				url  : "GSOracleAction_getOrcaleBase.do",
				data : {objectId : objectId}
			}).done(function(data){
				var base = data.oracleBase;
				if(!base || $.isEmptyObject(base)){
					return;
				}
				//健康度
				new HealthCon({
					id 		  : "health",
					stopPoint : base.healthValue,
					context   : $el
				});
				//监控点概览、事件统计
				$('#baseContent [label-flag=info]', $el).each(function(){
					var $t  = $(this),
						val = base[$t.attr('id')];
					if(typeof val != 'number'){
						val = val || '-';
					}
					$t.text(val);
				});
				$('#seqUseRate', $el).text(parseFloat(base.seqUseRate) + '%');
				//基础配置
				/*$('#runInfo td:odd', $el).each(function(){
					var $t = $(this),
						id = $t.attr('id'),
						val = base.object[id];
					if((id == 'isCluster' || id == 'isRac') && val != undefined){
						val = val ? '是' : '否';
					}
					if(typeof val != 'number'){
						val = val || '';
					}
					$t.text(val);
				});*/
			});
			
			
			
			//PROCESS使用率
			function fnProUsed(){
				eProUsed = app.drawEcharts($.extend({}, basicEcharts, {
					selector : '#eProUsed',
					unit	 : '%',
					items	 : ['PROCESS使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.process_pct']
					}),
				}));
				eProUsed.start();
			}
			
			//进程资源
			function fnProSource(){
				eProSource = app.drawEcharts($.extend({}, basicEcharts, {
					selector : '#eProSource',
					unit	 : '%',
					items	 : ['占用CPU使用率', '占用内存使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.resource_cpu', 'db.oracle.resource_memory']
					}),
				}));
				eProSource.start();
			}
			
			//连接分类
			function fnConnCls(){
				eConnCls = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eConnCls',
					unit	: '个',
					items	: ['总连接数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.portnum_ESTABLISHED']
					}),
				}));
				eConnCls.start();
			}
			
			//连接状态
			function fnConnStatus(){
				eConnStatus = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eConnStatus',
					unit	: '%',
					items	: ['ESTABLISHED', 'CLOSE_WAIT', 'TIME_WAIT', 'LISTENING'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ["db.oracle.portnum_ESTABLISHED","db.oracle.portnum_TIME_WAIT",
						               "db.oracle.portnum_LISTEN","db.oracle.portnum_CLOSE_WAIT"]
					}),
				}));
				eConnStatus.start();
			}
			
			//SGA空闲百分比
			function fnSgaFree(){
				eSgaFree = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eSgaFree',
					unit	: '%',
					items	: ['SGA空闲'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.sgaidlespaceused_free_percent']
					}),
				}));
				eSgaFree.start();
			}
			
			//命中率统计
			function fnHitRate(){
				eHitRate = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eHitRate',
					unit	: '%',
					items	: ['SGA数据字典缓冲池', '高速缓冲区', '库缓冲区', '重做日志缓冲区'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ["db_oracle_pub.dict_shoot", "db_oracle_pub.buffer_cache_shoot",
										"db_oracle_pub.dt_cache_shoot", "db_oracle_pub.rp_cache_shoot"]
					})
				}));
				eHitRate.start();
			}
			
			//表空间空闲比率
			function fnSpaceRate(){
				eSpaceRate = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eSpaceRate',
					unit	: '%',
					items	: ['表空间已用比率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.tablespace_USED']
					})
				}));
				eSpaceRate.start();
			}
			
			
			//当前会话数使用率
			function fnConvUsed(){
				eConvUsed = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eConvUsed',
					unit	: '%',
					items	: ['当前会话数使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.session_pct']
					})
				}));
				eConvUsed.start();
			}
			
			//等待锁的会话数
			function fnWaitLock(){
				eWaitLock = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eWaitLock',
					unit	: '个',
					items	: ['等待会话数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.waitlocksession_LS_COUNT']
					})
				}));
				eWaitLock.start();
			}
			
			//占用的磁盘空间大小
			function fnLogSize(){
				eLogSize = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eLogSize',
					unit	: 'GB',
					items	: ['空间大小'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.tarlogspace_arch_size_gb']
					})
				}));
				eLogSize.start();
			}
			
			//RAC节点ASM文件系统使用空间
			function fnASMSize(){
				eASMSize = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eASMSize',
					unit	: '%',
					items	: ['RAC节点ASM文件系统使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.racnodeusespace_ASM_USED']
					}),
					succfn	 : function(data){
						var result = data.content.echartsData;
						if(result){
							var line1 = result.line1,
								line2 = result.line2;
							if(line1 && line1.length > 0){
								var len1 = line1.length,
									len2 = line2.length;
								$('#ra1cNodeNum', $el).text(line1[len1 - 1]);
								$('#racAsmNum', $el).text(line2[len2 - 1]);
							}
						}
					}
				}));
				eASMSize.start();
			}
			
			//总失效对象数
			//TODO 删掉
			function fnUselessObj(){
				eUselessObj = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eUselessObj',
					unit	: '个',
					items	: ['总失效对象数', '失效对象数'],
					urlParams: $.extend(urlParams, {metric : 'xxxx'}),
					succfn	 : function(data){
						eUselessObj.getEchartsObj().setOption({yAxis: [{max: 100}]});
						$('#missTotal', $el).text("111");
						$('#missNum', $el).text("111");
					}
				}));
				eUselessObj.start();
			}
			
			//长时间锁等待个数
			function fnLockCount(){
				eLockCount = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eLockCount',
					unit	: '个',
					items	: ['长时间锁等待个数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.waitlocksession_LS_COUNT']
					})
				}));
				eLockCount.start();
			}
			
			//回滚段百分比
			function fnPerRollback(){
				ePerRollback = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#ePerRollback',
					unit	: '%',
					items	: ['回滚段百分比'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.waitrollpercen_WR_PERCENT']
					})
				}));
				ePerRollback.start();
			}
			
			//作业数
			function fnWorkNum(){
				eWorkNum = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eWorkNum',
					unit	: '个',
					items	: ['BROKEN作业数', '失败的作业数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.broken_BROKEN', 'db.oracle.failuses_FAILURE']
					}),
					succfn	 : function(data){
						$('#brokenNum', $el).text("111");
						$('#failNum', $el).text("111");
					}
				}));
				eWorkNum.start();
			}
			
			//CURSOR_COUNT游标数
			function fnCursorNum(){
				eCursorNum = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eCursorNum',
					unit	: '个',
					items	: ['CURSOR_COUNT游标数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.cursor_count']
					})
				}));
				eCursorNum.start();
			}
			
			//Cursors使用率
			function fnCursorUsed(){
				eCursorUsed = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#eCursorUsed',
					unit	: '%',
					items	: ['Cursors使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['db.oracle.cursors_pct']
					})
				}));
				eCursorUsed.start();
			}
			
			
		},
		unload : function(handler) {
			var echartsArr = [
			    eProUsed, eProSource, eConnCls, eConnStatus, eSgaFree, eHitRate,
				eSpaceRate, eConvUsed, eWaitLock, eLogSize, eASMSize, eUselessObj, 
				eLockCount, ePerRollback, eWorkNum, eCursorNum, eCursorUsed
			];
			echartsArr.forEach(function(item){
				item && item.dispose();
			});
		},
		pause : function($el, attr, handler) {
			
		},
		resume : function($el, attr, handler) {
			
		}
	};
});