define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			// 全局变量	
			var activeClassData = {};//当前分类数据

			var $addLogSourceModal = $('#addLogSourceModal',$el);
			var $addLogSourceForm = $('form',$addLogSourceModal)[0];

			//agent采集Table
			var $agentTable = $('#agentTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sourceName', defaultContent : ''//日志信息名称
				},{
					data : 'appName', defaultContent : ''//应用系统
				},{
					data : 'category1', defaultContent : ''//三级分类
				},{
					data : 'runStatus', defaultContent : ''//采集状态
				},{
					data : 'logName', defaultContent : ''//解析规则
				},{
					data : 'hostIp', defaultContent : ''//主机列表
				},{
					data : 'collectionCumulant', defaultContent : ''//采集日志量(MB)
				},{
					data : 'lastCollectionTime', defaultContent : ''//最后采集时间
				},{
					data : '', defaultContent : ''//操作
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						var category ='';
						if(row.category1){
							category += row.category1;
						}

						if(row.category2){
							category += '>'+row.category2;
						}

						if(row.category3){
							category += '>'+row.category3;
						}
						return category;
					},
					"targets" : 3
				},{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<p style="width: 55px;margin: 0;float: left;"><i class="fa fa-cog fa-spin" style="color: #22AC38"></i>采集中</p>|<span class="link-stop fa fa-pause-circle-o" style="font-size:14px;" title="暂停"></span>';
						}else{
							return '<p style="width: 55px;margin: 0;float: left;"><i class="fa fa-cog"></i>暂停</p>|<span class="link-stop fa fa-play-circle-o" style="font-size:14px;" title="启动"></span>';
						}
						
					},
					"targets" : 4
				},{
					"render": function(data, type, row, meta) {
						if(data != undefined){
							return (data/1024).toFixed(2);
						}else{
							return '-';
						}
                    },
                    "targets" : 7
				},{
					"render": function(data, type, row, meta) {
						if(data){
							return new Date(data).Format('yyyy-MM-dd hh:mm:ss');
						}else{
							return '-';
						}
                    },
                    "targets" : 8
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-modify fa fa-edit" title="修改"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
                    },
                    "targets" : 9
				}]
			});
			
			//localSubmit采集Table
			var $localSubmitTable = $('#localSubmitTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sourceName', defaultContent : ''//日志信息名称
				},{
					data : 'appName', defaultContent : ''//应用系统
				},{
					data : 'category1', defaultContent : ''//三级分类
				},{
					data : 'runStatus', defaultContent : ''//监听状态
				},{
					data : 'location', defaultContent : ''//监听目录
				},{
					data : 'logName', defaultContent : ''//日志解析规则
				},{
					data : 'collectionCumulant', defaultContent : ''//已上传流量(MB)、、、
				},{
					data : 'lastCollectionTime', defaultContent : ''//最后上传时间
				},{
					data : '', defaultContent : ''//操作
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						var category ='';
						if(row.category1){
							category += row.category1;
						}

						if(row.category2){
							category += '>'+row.category2;
						}

						if(row.category3){
							category += '>'+row.category3;
						}
						return category;
					},
					"targets" : 3
				},{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<p style="width: 55px;margin: 0;float: left;"><i class="fa fa-cog fa-spin" style="color: #22AC38"></i>监听中</p>|<span class="link-stop fa fa-pause-circle-o" style="font-size:14px;" title="暂停"></span>';
						}else{
							return '<p style="width: 55px;margin: 0;float: left;"><i class="fa fa-cog"></i>暂停</p>|<span class="link-stop fa fa-play-circle-o" style="font-size:14px;" title="启动"></span>';
						}
						
					},
					"targets" : 4
				},{
					"render": function(data, type, row, meta) {
						if(data != undefined){
							return (data/1024).toFixed(2);
						}else{
							return '-';
						}
                    },
                    "targets" : 7
				},{
					"render": function(data, type, row, meta) {
						if(data){
							return new Date(data).Format('yyyy-MM-dd hh:mm:ss');
						}else{
							return '-';
						}
                    },
                    "targets" : 8
				},{
					"render": function(data, type, row, meta) {
						if(activeClassData["typeName"] == '服务端上传'){
							return '<span class="link-modify fa fa-edit" title="修改"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
						}else{
							return '<span class="link-start fa fa-upload" title="继续上传"></span><span class="link-modify fa fa-edit" title="修改"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
						}
						
					},
					"targets" : 9
				}]
			});
			//UDP采集Table
			var $UDPTable = $('#UDPTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index'
				},{
					data : 'sourceName', defaultContent : ''//日志信息名称
				},{
					data : 'appName', defaultContent : ''//应用系统
				},{
					data : 'category1', defaultContent : ''//三级分类
				},{
					data : 'runStatus', defaultContent : ''//接入状态
				},{
					data : 'logName', defaultContent : ''//解析规则
				},{
					data : 'serviceInAddress', defaultContent : '-'//服务接入端口
				},{
					data : 'serviceAddress', defaultContent : ''//服务链接
				},{
					data : 'collectionCumulant', defaultContent : ''//接入日志量(MB)、、、
				},{
					data : 'lastCollectionTime', defaultContent : ''//最后接入时间
				},{
					data : '', defaultContent : ''//操作
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						var category ='';
						if(row.category1){
							category += row.category1;
						}

						if(row.category2){
							category += '>'+row.category2;
						}

						if(row.category3){
							category += '>'+row.category3;
						}
						return category;
					},
					"targets" : 3
				},{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<p style="width: 55px;margin: 0;float: left;"><i class="fa fa-cog fa-spin" style="color: #22AC38"></i>运行中</p>|<span class="link-stop fa fa-pause-circle-o" style="font-size:14px;" title="暂停"></span>';
						}else{
							return '<p style="width: 55px;margin: 0;float: left;"><i class="fa fa-cog"></i>暂停</p>|<span class="link-stop fa fa-play-circle-o" style="font-size:14px;" title="启动"></span>';
						}
						
					},
					"targets" : 4
				},{
					"render": function(data, type, row, meta) {
						if(data != undefined){
							return (data/1024).toFixed(2);
						}else{
							return '-';
						}
                    },
                    "targets" : 8
				},{
					"render": function(data, type, row, meta) {
						if(data){
							return new Date(data).Format('yyyy-MM-dd hh:mm:ss');
						}else{
							return '-';
						}
                    },
                    "targets" : 9
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-modify fa fa-edit" title="修改"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
					},
					"targets" : 10
				}]
			});

			// 事件——agent采集table
			$('#agentTable,#localSubmitTable,#UDPTable',$el).on('click', 'tbody span.link-del', function(event) {//删除
				var id = $(this).parents('table').attr('id'),$table=null;
				if(id=='agentTable'){
					$table = $agentTable;
				}else if(id == 'localSubmitTable'){
					$table = $localSubmitTable;
				}else if(id == 'UDPTable'){
					$table = $UDPTable;
				}
				var tr = $table.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定删除该条日志源信息？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgSourceAction_delCfgLogSource.do',
	                		data:{
	                			sourceId:tr.sourceId
	                		}
	                	}).done(function (data) {
                			app.alert(data.result);
                			getStatistics();
	                	});
	                },
	                aArgs: [tr]
				});
			}).on('click', 'tbody span.link-modify', function(event) {// 修改
				var id = $(this).parents('table').attr('id'),$table=null;
				if(id=='agentTable'){
					$table = $agentTable;
				}else if(id == 'localSubmitTable'){
					$table = $localSubmitTable;
				}else if(id == 'UDPTable'){
					$table = $UDPTable;
				}
				var tr = $table.row($(this).parents('tr')).data();
				var sourceType = $('#logTypeList', $el).find('li.active').attr('data-name');
				$('#title',$el).text('日志源-'+sourceType+'-修改');
				showLogInfoConfig('修改',tr.sourceId);
			}).on('click', 'tbody span.link-stop', function(event) {// 暂停
				var id = $(this).parents('table').attr('id'),$table=null;
				if(id=='agentTable'){
					$table = $agentTable;
				}else if(id == 'localSubmitTable'){
					$table = $localSubmitTable;
				}else if(id == 'UDPTable'){
					$table = $UDPTable;
				}
				var tr = $table.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定'+(tr.runStatus=="0"?'启动':'暂停')+'该条日志源信息？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'LogCfgSourceAction_updateRunStatus.do',
	                		data:{
	                			sourceId:tr.sourceId,
	                			runStatus:tr.runStatus=="0"?'1':'0'
	                		}
	                	}).done(function (data) {
                			app.alert(data.result);
                			getStatistics();
	                	});
	                },
	                aArgs: [tr]
				});
			});

			//继续上传
			$('#localSubmitTable',$el).on('click', 'tbody span.link-start', function(e) {
				var tr = $localSubmitTable.row($(this).parents('tr')).data();
				$('#title',$el).text(tr.sourceName+'-继续上传');
				showLogInfoConfig('继续上传',tr.sourceId);
			});
			// 分类列表点击事件
			$('#logTypeList', $el).on('click', 'li', function(event){
				if($(this).hasClass('active')){
					return;
				}
				var thisObj = $(this);
				thisObj.addClass('active').siblings().removeClass('active');
				activeClassData = {};

				activeClassData["typeName"] = thisObj.attr('data-name');

				$('#title_class',$el).text(activeClassData.typeName);
				getLogByType(activeClassData.typeName);
				if($('#logInfoListUl>li:last', $el).attr('display')!='none'){//删除新增页签
					$('.logInfoConfig-closeBtn').click();
				}
			});

			// 获取统计数据
			getStatistics();
			function getStatistics() {
				var index = $('#logTypeList>li.active', $el).index();
				app.common.ajaxWithAfa({
					url:"LogCfgSourceAction_getLogSourceStatistics.do"
				}).done(function (data) {
					var result = data.result,html='';
					if(result && !$.isEmptyObject(result)){
						$("#typeCount",$el).text(result.souurceTypeCount == undefined?'-':result.souurceTypeCount);//源分类数
						$("#logCount",$el).text(result.logCount == undefined?'-':result.logCount);//日志数
						$("#logRunCount",$el).text(result.serverCount == undefined?'-':result.serverCount);//服务器数
						$("#logStopCount",$el).text(result.applicationCount == undefined?'-':result.applicationCount);//应用系统数
						for(var key in result.sources){
							html += '<li data-name="'+key+'">'+key+'('+result.sources[key]+')</li>';
						}
						$('#logTypeList',$el).empty().html(html);
						
						if(index == -1){
							index = 0;
						}
						$('#logTypeList>li:eq('+index+')', $el).trigger('click');
					}
				})
			}
			
			// 获取某个分类下的日志源信息
			function getLogByType(typeName) {
				var $table='';
				if(typeName == "Agent采集"){
					$table = $agentTable;
					$('#agentTableDiv',$el).show();
					$('#localSubmitTableDiv',$el).hide();
					$('#UDPTableDiv',$el).hide();
				}else if(typeName == "本地上传" || typeName == "服务端上传"){
					$table = $localSubmitTable;
					$('#agentTableDiv',$el).hide();
					$('#localSubmitTableDiv',$el).show();
					$('#UDPTableDiv',$el).hide();
					if(typeName == "本地上传"){
						$table.column(4).visible( false );
						$table.column(5).visible( false );
						$('#localSubmitTable').removeClass('serverSide').addClass('localside');
					}else{
						$table.column(4).visible( true );
						$table.column(5).visible( true );
						$('#localSubmitTable').addClass('serverSide').removeClass('localside');
					}
				}else if(typeName == "UDP服务" || typeName == "TCP服务" || typeName == "HTTP服务" || typeName == "SNMP服务"){
					$table = $UDPTable;
					$('#agentTableDiv',$el).hide();
					$('#localSubmitTableDiv',$el).hide();
					$('#UDPTableDiv',$el).show();
				}
				
				app.common.ajaxWithAfa({
					url:"LogCfgSourceAction_getLogSources.do",
					data:{
						'sourceType':typeName
					}
				}).done(function (data) {
					$table.clear();
					var result = data.result;
					result.forEach(function(item, index){
						item['index'] = ++index;
					})

					$table.rows.add(result).draw();
					$table.columns.adjust();
				})
			}

			// 新增采集日志源按钮
			$('#addLogSource',$el).on('click', function(event) {
				event.preventDefault();
				var sourceType = $('#logTypeList', $el).find('li.active').attr('data-name');
				$('#title',$el).text('日志源-'+sourceType+'-新增');
				showLogInfoConfig('新增');
			});

			function showLogInfoConfig(type,sourceId) {
				var $li = $('#logInfoListUl>li:last', $el);
				app.dispatcher2.load({
					title: "",
					moduleId:"logInfoConfig",
					section:'addLogInfoResource',
					frameRenderTo:'#tabs2',
					id: '',
					params:{
						sourceType: $('#logTypeList', $el).find('li.active').attr('data-name'),
						sourceId:sourceId,
						operType:type,
						parentPageContext:$el
					},
					context: $el
				});

				$li.show();
				$li.find('a').click();
			}

			// 页签关闭按钮
			$('.logInfoConfig-closeBtn').on('click', function(event) {
				event.preventDefault();
				var $li = $('#logInfoListUl>li:first>a', $el);
				$li.click();

				$(this).parent().parent().hide();

				event.stopPropagation();
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
