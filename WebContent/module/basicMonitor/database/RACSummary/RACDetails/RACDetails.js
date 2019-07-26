define([ "jquery" ], function() {

	//echarts对象
	var eProcess, eASM, eTableSpace, eSession,eCursor,eReadTimes;
	
	//清除echarts
	function clearEcharts(){
		eProcess && eProcess.dispose();
		eASM && eASM.dispose();
		eTableSpace && eTableSpace.dispose();
		eSession && eSession.dispose();
		eCursor && eCursor.dispose();
		eReadTimes && eReadTimes.dispose();
	}
	
	return {
		load : function($el, scope, handler) {
			
			var objectId = scope.objectId;
			var ipadd = scope.ipadd;
			console.log(scope)
			var hostname = scope.instanceName;
			$('#ip', $el).text(ipadd);
			$('#port', $el).text(hostname);
			$('#version', $el).text(scope.version);
			
			//事件总览
			eventEchart = app.showEcharts({
				handler: handler,
				context: $el,
				selector: '#eEvent',
				eType: 'line',
				url: 'CommonMonitorAction_getEventCount.do',
				unit: '个',
				urlParams: {
					objectId: objectId,
					time: 120,
					interval: 1
				},
				items: ['告警', '预警'],
				beforefn: function(data){
					for(var key in data.content.result){
						$('#' + key, $el).text(data.content.result[key]);
					}
					var event = data.content.result;
					$('#infoCount', $el).text(event.alarmWaring-event.alarmCount-event.waringCount);
					formatEventData(data);
				}
			});
			eventEchart.start();
			
			//格式化事件echarts数据
			function formatEventData(data){
				var eData = {};
				
				eData.time = data.content.result.echarts.times;
				eData.time.forEach(function(item, i){
					eData.time[i] = new Date(item).Format('hh:mm:ss');
				});
				
				data.content.result.echarts.datas.forEach(function(item, i){
					eData['line' + (i + 1)] = item;
				});
				
				data.content = {echartsData: eData};
			}
			
			var basicEcharts = {
					handler	: handler,
					context	: $el,
					eType	: 'line',
					url		: 'CommonMonitorAction_getEachart.do'
				},
				urlParams = {
					objectId : objectId,
					interval : 1,
					time 	 : 60
				},
				baseTable = {	
					'bAutoWidth' : true,
					'bPaginate' : true,
					'pagingType' : 'full_numbers',
					'searching' : false,
					'bSort' : false,
					'pageLength' :5,
				}
			//集群实例信息
			var $clusrerTable = $("#clusrerTable", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'inst_id', defaultContent : ''
				},{
					data : 'inst_name', defaultContent : ''
				},{
					data : 'version', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'startup_time', defaultContent : ''
				}],
			});
			// 表空间信息
			var $tableSpaceTable = $('#tableSpaceTable',$el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'name', defaultContent : ''
				},{
					data : 'sizemb', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'type', defaultContent : ''
				},{
					data : 'used', defaultContent : ''
				},{
					data : 'usedmb', defaultContent : ''
				}],
			});
			// 日志空间信息
			var $logSpaceTable = $('#logSpaceTable',$el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'archived', defaultContent : ''
				},{
					data : 'bytes', defaultContent : ''
				},{
					data : 'first_change', defaultContent : ''
				},{
					data : 'first_time', defaultContent : ''
				},{
					data : 'grp', defaultContent : ''
				},{
					data : 'members', defaultContent : ''
				},{
					data : 'sequence', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'thread', defaultContent : ''
				}],
			});
			// 错误信息
			var $errorTable = $('#errorTable',$el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'creation_time', defaultContent : ''
				},{
					data : 'message_type', defaultContent : ''
				},{
					data : 'metric_value', defaultContent : ''
				},{
					data : 'reason', defaultContent : ''
				},{
					data : 'suggested_action', defaultContent : ''
				}],
			});
			//耗CPU的sql
			var $cpusqlTable = $("#cpusql_table", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'sql_text', defaultContent : ''
				},{
					data : 'cpu_time', defaultContent : ''
				},{
					data : 'schema_name', defaultContent : ''
				}],
			});
			//执行时间长的sql
			var $elatimesqlTable = $("#elatimesql_table", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'sql_text', defaultContent : ''
				},{
					data : 'elapsed_time', defaultContent : ''
				},{
					data : 'schema_name', defaultContent : ''
				}],
			});
			//执行次数多的sql
			var $exesqlTable = $("#exesql_table", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'sql_text', defaultContent : ''
				},{
					data : 'executions', defaultContent : ''
				},{
					data : 'schema_name', defaultContent : ''
				}],
			});
			//读磁盘次数多的sql
			var $diskreadsqlTable = $("#diskreadsql_table", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'sql_text', defaultContent : ''
				},{
					data : 'disk_reads', defaultContent : ''
				},{
					data : 'schema_name', defaultContent : ''
				}],
			});
			//排序次数多的sql
			var $sortsqlTable = $("#sortsql_table", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'sql_text', defaultContent : ''
				},{
					data : 'sorts', defaultContent : ''
				},{
					data : 'schema_name', defaultContent : ''
				}],
			});
			
			//大事务信息
			var $largetaskTable = $("#largetask_table", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'osuser', defaultContent : ''
				},{
					data : 'program', defaultContent : ''
				},{
					data : 'sid', defaultContent : ''
				},{
					data : 'sql_text', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'used_ublk', defaultContent : ''
				},{
					data : 'username', defaultContent : ''
				}],
			});
			//超长事务信息
			var $ltruntaskTable = $("#ltruntask_table", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'machine', defaultContent : ''
				},{
					data : 'program', defaultContent : ''
				},{
					data : 'sid', defaultContent : ''
				},{
					data : 'sql_text', defaultContent : ''
				},{
					data : 'username', defaultContent : ''
				}],
			});
			//回退段信息
			var $seginfoTable = $("#seginfo_table", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'tablespace_name', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'segment_name', defaultContent : ''
				},{
					data : 'initial_extent', defaultContent : ''
				},{
					data : 'max_extents', defaultContent : ''
				},{
					data : 'min_extents', defaultContent : ''
				},{
					data : 'next_extent', defaultContent : ''
				}],
			});
			//表记录数多TOP5
			var $rcdmsgTable = $("#rcdmsg_table", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'table_name', defaultContent : ''
				},{
					data : 'use_mb', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				},{
					data : 'num_rows', defaultContent : ''
				},{
					data : 'tablespace_name', defaultContent : ''
				},{
					data : 'owner', defaultContent : ''
				},{
					data : 'compression', defaultContent : ''
				},{
					data : 'last_analyzed', defaultContent : ''
				}],
			});
			
			//表占用空间TOP5
			var $spaceuseTable = $("#spaceuse_table", $el).DataTable({
				'pagingType': 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'pageLength' : 5,
				'columns' 	: [{
					data : 'index', defaultContent : ''
				},{
					data : 'name', defaultContent : ''
				},{
					data : 'type', defaultContent : ''
				},{
					data : 'sizemb', defaultContent : ''
				},{
					data : 'usedmb', defaultContent : ''
				},{
					data : 'freemb', defaultContent : ''
				},{
					data : 'used', defaultContent : ''
				},{
					data : 'extsizemb', defaultContent : ''
				},{
					data : 'ext_mana', defaultContent : ''
				},{
					data : 'status', defaultContent : ''
				}],
			});
			//耗cpusql
			function fncpusqlTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_cpu_sql'}
				}).done(function(data){
					addData(data, $cpusqlTable);
				});
			}
			//执行时间长sql
			function fnelatimesqlTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_elatime_sql'}
				}).done(function(data){
					addData(data, $elatimesqlTable);
				});
			}
			//执行次数多sql
			function fnexesqlTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_exe_sql'}
				}).done(function(data){
					addData(data, $exesqlTable);
				});
			}
			//读磁盘次数多sql
			function fndiskreadsqlTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_diskread_sql'}
				}).done(function(data){
					addData(data, $diskreadsqlTable);
				});
			}
			//排序多sql
			function fnsortsqlTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_sort_sql'}
				}).done(function(data){
					addData(data, $sortsqlTable);
				});
			}
			//大事务信息
			function fnlargetaskTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_largetask'}
				}).done(function(data){
					addData(data, $largetaskTable);
				});
			}
			//超长事务信息
			function fnltruntaskTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_ltruntask'}
				}).done(function(data){
					addData(data, $ltruntaskTable);
				});
			}
			//回退段信息
			function fnseginfoTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_seginfo'}
				}).done(function(data){
					addData(data, $seginfoTable);
				});
			}
			//表记录数多TOP5
			function fnrcdmsgTable(){
				app.common.ajaxWithAfa({
					url:"CommonMonitorAction_getKeyMetric2.do",
					data:{objectId:objectId,
						metricName:'ora_rcdmsg',
						'whereEx':'{"num_rows":"desc"}',
						top:5}
				}).done(function(data){
					addData(data, $rcdmsgTable);
				});
			}
			//表占用空间TOP5
			function fnspaceuseTable(){
				app.common.ajaxWithAfa({
					url:"CommonMonitorAction_getKeyMetric2.do",
					data:{objectId:objectId,
						metricName:'ora_spaceuse',
						'whereEx':'{"sizemb":"desc"}',
						top:5}
				}).done(function(data){
					addData(data, $spaceuseTable);
				});
			}
			//指标-基本信息
			app.common.ajaxWithAfa({
				url  : "OracleRacMonitorAction_getBaseInfo.do",
				data:{
					"objectId":objectId,
					}
			}).done(function (data) {
				if(!$.isEmptyObject(data.result)){
					for(var i in data.result){
						if (i == 'cursoruseratio') {
							$('#' + i, $el).text($.trim(data.result[i]));
						}
						$('#' + i, $el).text(data.result[i]);
					}
				}
			});	
			// 应用/实例
			$('#tabsUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				var index = $('#tabsUl li', $el).index(this);
				if(index == 0){
					fnProcess();
					fnASM();
					fnSession();
					fnCursorCount();
					fnLogicalRead();
					fnClusrerTable();
					fnTableSpaceTable();
					fnLogSpaceTable();
					fnErrorTable();
				}else if(index == 1){
					clearEcharts();
					//初始化获取表格数据
					fncpusqlTable();
					fnlargetaskTable();
					fnrcdmsgTable();
				}
			});

			$('#sqlUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				var index = $('#sqlUl li', $el).index(this);
				if(index == 0){
					fncpusqlTable();
				}else if(index == 1){
					fnelatimesqlTable();
				}else if(index == 2){
					fnexesqlTable();
				}else if(index == 3){
					fndiskreadsqlTable();
				}else if(index == 4){
					fnsortsqlTable();
				}
			});
			$('#taskUL li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				var index = $('#taskUL li', $el).index(this);
				if(index == 0){
					fnlargetaskTable();
				}else if(index == 1){
					fnltruntaskTable();
				}else{
					fnseginfoTable();
				}
			});
			
			$('#tableUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				var index = $('#tableUl li', $el).index(this);
				if(index == 0){
					fnrcdmsgTable();
				}else if(index == 1){
					fnspaceuseTable();
				}
			});
			// 表空间ul
			$('#tableSpaceUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				var index = $('#tableSpaceUl li', $el).index(this);
				if(index == 0){
					fnTableSpaceTable();
					eTableSpace && eTableSpace.dispose();
				}else{
					fnTableSpace();
				}
			});
			//集群实例信息
			fnClusrerTable();
			function fnClusrerTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_dbinfo'}
				}).done(function(data){
					addData(data, $clusrerTable);
				});
			}
			//表空间信息
			fnTableSpaceTable();
			function fnTableSpaceTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_spaceuse'}
				}).done(function(data){
					addData(data, $tableSpaceTable);
				});
			}
			//日志空间信息
			fnLogSpaceTable();
			function fnLogSpaceTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_log_space'}
				}).done(function(data){
					addData(data, $logSpaceTable);
				});
			}
			//错误信息
			fnErrorTable();
			function fnErrorTable(){
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data : {objectId : objectId,
						resultSet:'ora_errorinfo'}
				}).done(function(data){
					addData(data, $errorTable);
				});
			}
			
			/*组织表格数据*/
			function addData(data, $table){
				var result = data.result;
				$table.clear();
				if(result && result.length > 0){
					result.forEach(function(item,index){
						item.index = ++index;
					})
					$table.rows.add(result).draw();
				}
			}
			/*组织折线图数据*/
			function formatLineData(data) {
				var echartsData = {};
				var currData ={}; 
				var tmpData = data.content.result.echartsData;
				var times = tmpData.times;
				/*处理时间*/
				times.forEach(function (item,index) {
					var tmpDate = new Date(item);
					var hours = tmpDate.getHours() > 9 ?tmpDate.getHours():'0'+tmpDate.getHours();
					var minutes = tmpDate.getMinutes() > 9 ?tmpDate.getMinutes():'0'+tmpDate.getMinutes();
					times[index] = hours+":"+minutes;
				});
				for (var i = 0; i < tmpData.datas.length; i++) {
					echartsData['line'+(i+1)] = tmpData.datas[i];
					currData['line'+(i+1)] = tmpData.datas[i][tmpData.datas[i].length - 1];
				}
				echartsData.time = times;
				data.content.echartsData = echartsData;
				data.content.currData = currData;

				return data;
			}

			fnProcess();
			// 进程使用率
			function fnProcess(){
				eProcess = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eProcess',
					unit	: '%',
					items:['进程使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['ora_pub.processesuse']
					}),
					beforefn:function (data) {
						eProcess.changeItems(data.content.result.echartsData.alias);
						data = formatLineData(data);
					}
				}));	
				eProcess.start();
			}

			// ASM使用率
			fnASM();
			function fnASM(){
				eASM = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eASM',
					unit	: '%',
					items:['ASM使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['ora_asm.asm_pct']
					}),
					beforefn:function (data) {
						eASM.changeItems(data.content.result.echartsData.alias);
						data = formatLineData(data);
					}
				}));	
				eASM.start();
			}
			// 表空间空闲比
			function fnTableSpace(){
				eTableSpace = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eTableSpace',
					unit	: '%',
					items:['表空间空闲比'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['ora_spaceuse.used']
					}),
					beforefn:function (data) {
						eTableSpace.changeItems(data.content.result.echartsData.alias);
						data = formatLineData(data);
					}
				}));	
				eTableSpace.start();
			}
			// 会话使用率
			fnSession();
			function fnSession(){
				eSession = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eSession',
					unit	: '%',
					items:['会话使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['ora_pub.sesspct']
					}),
					beforefn:function (data) {
						eSession.changeItems(data.content.result.echartsData.alias);
						data = formatLineData(data);
					}
				}));	
				eSession.start();
			}
			// 游标ul
			$('#cursorUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				var index = $('#cursorUl li', $el).index(this);
				if(index == 0){
					fnCursorCount();
				}else{
					fnCursorUse();
				}
			});
			// 游标数量
			fnCursorCount();
			function fnCursorCount(){
				eCursor && eCursor.dispose();
				eCursor = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eCursor',
					unit	: '个',
					items:['游标数量'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['ora_cursorsuse.cursor_used']
					}),
					beforefn:function (data) {
						eCursor.changeItems(data.content.result.echartsData.alias);
						data = formatLineData(data);
					}
				}));	
				eCursor.start();
			}
			// 游标使用率
			function fnCursorUse(){
				eCursor && eCursor.dispose();
				eCursor = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eCursor',
					unit	: '%',
					items:['游标使用率'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['ora_cursorsuse.cursor_pct']
					}),
					beforefn:function (data) {
						eCursor.changeItems(data.content.result.echartsData.alias);
						data = formatLineData(data);
					}
				}));	
				eCursor.start();
			}
			// 读次数ul
			$('#readTimsUl li', $el).click(function(){
				if(this.className == 'active'){
					return;
				}
				var index = $('#readTimsUl li', $el).index(this);
				if(index == 0){
					fnLogicalRead();
				}else if(index == 1){
					fnPhyRead();
				}else{
					fnPhyWrite();
				}
			});
			// 逻辑读次数
			fnLogicalRead();
			function fnLogicalRead(){
				eReadTimes && eReadTimes.dispose(); 
				eReadTimes = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eReadTimes',
					unit	: '次',
					items:['逻辑读次数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['ora_logicreads.logical_reads'],
						interval: 5
					}),
					beforefn:function (data) {
						eReadTimes.changeItems(data.content.result.echartsData.alias);
						data = formatLineData(data);
					}
				}));	
				eReadTimes.start();
			}
			// 物理读次数
			function fnPhyRead(){
				eReadTimes && eReadTimes.dispose();
				eReadTimes = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eReadTimes',
					unit	: '次',
					items:['物理读次数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['ora_phyreads.phy_reads'],
						interval: 5
					}),
					beforefn:function (data) {
						eReadTimes.changeItems(data.content.result.echartsData.alias);
						data = formatLineData(data);
					}
				}));	
				eReadTimes.start();
			}
			// 物理写次数
			function fnPhyWrite(){
				eReadTimes && eReadTimes.dispose();
				eReadTimes = app.showEcharts($.extend({}, basicEcharts, {
					selector: '#eReadTimes',
					unit	: '次',
					items:['物理写次数'],
					urlParams: $.extend({}, urlParams, {
						metricNames : ['ora_phywrites.phy_writes'],
						interval: 5
					}),
					beforefn:function (data) {
						eReadTimes.changeItems(data.content.result.echartsData.alias);
						data = formatLineData(data);
					}
				}));	
				eReadTimes.start();
			}
			
			//各类事件数模块点击跳转
			$('.RACDetails-event span', $el).on('click', function(e){
				var title, eType;
				var content = $(this).text();
				var	id = e.target.id;
				
				if(isNaN(content) || parseInt(content) == 0){
					return;
				}
				if(id == 'alarmWaring' || id == 'waringCount' || id == 'alarmCount' || id == 'infoCount'){
					if(id == 'alarmWaring'){
						title = "未解决";
					}else if(id == 'waringCount'){
						title = "预警";
						eType = "WARING";
					}else if(id == 'infoCount'){
						title = "通知";
						eType = "INFO";
					}else{
						title = "告警";
						eType = "ALARM";
					}
					
					app.dispatcher.load({
						"title" : "事件列表-" + objectId + title,
						"moduleId" : "eventList",
						"section" : "",
						"id" : "",
						"params" : { // 给标签传递参数
							"objId" : objectId,
							"eType" : eType,
							"eventClosed": 'FALSE'
						}
					});
				}
			});
		},
		unload : function(handler) {
			clearEcharts();
		},
		pause : function($el, attr, handler) {
			
		},
		resume : function($el, attr, handler) {
			
		}
	};
});