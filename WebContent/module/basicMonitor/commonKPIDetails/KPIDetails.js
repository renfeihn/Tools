define([ "jquery" ], function() {
	var eEcharts;
	var echartsArr = [];
	return {
		load : function($el, scope, handler) {
			var objectId = scope.objectId;
			var category = scope.category;
			
			
			//oracle的实例名
			var instanceName = scope.instanceName;
			
			if(category == '采集器'){
				category = 'collecter';
			}else if(category == '加密机'){
				category = 'encry_probe';
			}else if(category == '签名服务器'){
				category = 'sign_server';
			}
			
			var activeTreeNode = null;//当前树节点
			
			var $table = null;//表格对象
			
			var filterFlag;
			//MQ的队列明细专用SYSTEM过滤按钮
			$('#filter', $el).click(function(e) {
				$(this).toggleClass('checked');
				if(!filterFlag) {
					filterFlag = true;
				} else {
					filterFlag = false;
				}
				if(tableData) {
					var data = filterData(tableData);
					data.forEach(function (item,index) {
						item.index = index+1;
					});
					$table.clear();
					$table.rows.add(data).draw();
				}
			});
			
			//解决ztree bug
			var ztreeId = 'ztree_kpi_cate';
			
			$('.ztree', $el).attr('id', ztreeId);
			
			var treeArr = [], setting = {
				data : {
					simpleData : {
						enable : true,
						idKey : "id",
						pIdKey : "pId",
					},
				},
				view : {
					showLine : true,
					expandSpeed : "normal"
				},
				callback : {
					onClick : zTreeOnClick,
					beforeExpand : closeOther
				}
			};
			function closeOther(id, node) {
				var aa = $.fn.zTree.getZTreeObj(ztreeId);
				// 是不是根节点
				if (!node.parentTId) {
					aa.expandAll(false);
					return
				}
				// 叶子节点
				var parentNode = aa.getNodeByTId(node.parentTId);
				var findNode = aa.getNodesByFilter(filter, false, parentNode);
				for (var i = 0; i < findNode.length; i++) {
					if (findNode[i].level == node.level) {
						aa.expandNode(findNode[i], false)
					}
				}
				function filter(n) {
					return n.open == true
				}
			}
			/*加载菜单树*/
			function getTreeList(treeData) {
				app.common.ajaxWithAfa({
					url : "CommonMonitorAction_getMetricExpand.do",
					data : {
						'categoryKind': category
					}
				}).done(function(data) {
					var data = data.result;
					if(data && data.length == 0){
						return;
					}
					var oneLevelName;// 一级菜单名称
					var oneLevelId;// 一级菜单对应ID
					var tmpId = treeData.length + 1;// 每个菜单id
					var resultData = [];
					for (var i = 0;i < data.length; i++) {	
						treeData.forEach(function(item){
							if(item.metricSet == data[i].category){
								var tmp = {};
								tmp.pId = item.id;
								tmp.id = tmpId++;
								tmp.name = data[i].display_name;
								tmp.item = data[i].item;
								tmp.displayName = item.displayName;
								tmp.items = item.items;
								tmp.category = data[i].category;
								if(tmp.category == "os_swap" && category == "hpux"){
									if(tmp.item =="total" || tmp.item =="used" || tmp.item =="free" ){
										tmp.unit ="GB";
									}else{
										tmp.unit = data[i].unit;
									}
								}
								tmp.echarts_flag = data[i].echarts_flag;
								tmp.metricName = data[i].name;
								tmp.metricSet = data[i].category;
								tmp.lengendColumns = data[i].display_name;
								resultData.push(tmp);
							}
						});
					}

					resultData = treeData.concat(resultData);
					var ztree = $.fn.zTree.init($('#' + ztreeId, $el), setting, resultData);
					
					//触发id为1的节点点击事件
					var node = ztree.getNodeByParam('id', 1);
					ztree.selectNode(node);
					ztree.setting.callback.onClick(null, ztree.setting.treeId, node);
				});
			}
			
			/* 树菜单点击事件 */
			function zTreeOnClick(event, treeId, treeNode, clickFlag) {
				if(treeNode.metricSet == "mq_queuedetailinfo") {//MQ的队列明细
					$('#filter', $el).removeClass('hide');
				} else {
					$('#filter', $el).addClass('hide');
				}
				if (treeNode.level) {
					activeTreeNode = treeNode;//更新当前树节点
					$('#metricDesc', $el).text(treeNode.name);
					$('#metricInfo', $el).show();
					$('#metricCurrInfo', $el).hide();
					getBaseInfo(treeNode.metricSet, treeNode.metricName, treeNode.unit);
					
					if(echartsArr.length) {
						echartsArr.forEach(function(item, i) {
							item && item.dispose();
						});
						echartsArr.length = 0;
						$('#echartsCtn', $el).empty();
					}

					$("#eButtons button:first",$el).addClass('active').siblings().removeClass('active');
					getEcharts(treeNode, 30);

					showTable(treeNode, 'detaisView');
				}else{
					eEcharts && eEcharts.dispose();
					
					showTable(treeNode, 'metricCurrInfo');
					
					showEcharts(treeNode.children);
				}
			}
			
			/* 获取基本信息表格 */
			function getBaseInfo(metricSet, metricName, unit) {
				//先清除
				$('#value', $el).text('-');
				$('#time', $el).text('-');
				
				app.common.ajaxWithAfa({
					url : "CommonMonitorAction_getMetricInfo.do",
					data : {
						'objectId' : objectId,
						'metricName' : metricName
					}
				}).done(function(data) {
					var base = data.result[metricName];
					if(!base || $.isEmptyObject(base)){
						return;
					}
					for(var i in base){
						if (i == 'value') {
							var value = base[i];
							//aix的aix_errpt指标集的某些指标值做数据转换
							if(metricSet == "aix_errpt" && (metricName == "aix.errpt.class" || metricName == "aix.errpt.type")) {
								if(metricName == "aix.errpt.class") {
									switch(base[i]) {
										case 'S':
											value = 'S-软件';
											break;
										case 'H':
											value = 'H-硬件';
											break;
										case 'I':
											value = 'I-信息';
											break;
										case 'U': 
											value = 'U-未定的';
											break;
									}
								} else if(metricName == "aix.errpt.type") {
									switch(base[i]) {
										case 'P':
											value = 'P-PERM 硬件设备或软件模块损坏';
											break;
										case 'T':
											value = 'T-TEMP 临时性错误，经过重试后已经恢复正常';
											break;
										case 'I':
											value = 'I-INFO 一般信息，不是错误';
											break;
										case 'U': 
											value = 'U-UNKN 不能确定错误的严重性';
											break;
									}
								}
							}
							$('#' + i, $el).text(value).attr('title', value + (unit == undefined? '' : unit));
							$('#' + i, $el).append(unit == undefined?'':'&nbsp;&nbsp;'+unit);
						}else{
							$('#' + i, $el).text(base[i]);
						}
					}
				})
			}
			
			/*绘制Echarts(line/bar),饼图未处理*/
			function getEcharts(paramData, time) {
				if (!paramData) {
					$("#eButtons",$el).css({display: 'none'});
					return;
				}
				console.log(paramData.echarts_flag)
				if(paramData.echarts_flag == 0){
					$('#eEcharts', $el).hide();
					return;
				}else{
					$('#eEcharts', $el).show();
				}						

				if (paramData.echarts_flag == 1) {
					$("#eButtons",$el).css({display: 'block'});
				}else{
					$("#eButtons",$el).css({display: 'none'});
				}

				var type = "line";
				if(paramData.echarts_flag == 3){
					type = "bar";
				}
				eEcharts && eEcharts.dispose();
				eEcharts = app.showEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#eEcharts',
					eType	 : type,
					url		 : 'CommonMonitorAction_getMetricEcharts.do',
					unit: paramData.unit || '',
					urlParams: {
						interval : 1,
						time 	 : time,
						'objectId' : objectId,
						'metricName' : paramData.metricName,
						'echarts_type':paramData.echarts_flag			
					},
					showCheckbox: true,
					beforefn:function (data) {
						if (paramData.echarts_flag == 1) {
							data = formatLineData(data);
						}else if(paramData.echarts_flag == 2){
							data = formatBarData(data);
						}
					}
				});
				eEcharts.start();
			}
			
			//展示指标集下所有指标的折线图
			function showEcharts(data) {
				if(echartsArr.length) {
					echartsArr.forEach(function(item, i) {
						item && item.dispose();
					});
					echartsArr.length = 0;
					$('#echartsCtn', $el).empty();
				}
				
				if(!data) return;
				
				for(var i = 0; i < data.length; i++) {
					if(data[i].echarts_flag != 1) {
						data.splice(i, 1);
						i--;
					}
				}
				
				data.forEach(function(item, i) {
					drawEchart(item, i);
				});
				
				echartsArr.forEach(function(item, i) {
					item.getEchartsObj().group = 'group';
				});
				app.echarts.connect('group');
			}
			
			function drawEchart(data, i) {
				var tmp = '<div>\
							   <p>'+ data.name +'</p>\
							   <div id="echarts'+ data.id +'"></div>\
						   </div>';
				$('#echartsCtn', $el).append(tmp);
				
				echartsArr[i] = app.showEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#echarts' + data.id,
					eType	 : 'line',
					url		 : 'CommonMonitorAction_getMetricEcharts.do',
					unit: data.unit || '',
					urlParams: {
						interval : 1,
						time 	 : 60,
						'objectId' : objectId,
						'metricName' : data.metricName,
						'echarts_type': data.echarts_flag			
					},
					showCheckbox: true,
					beforefn: (function(i){
						return function (data) {
							formatData(data, i);
						}
					})(i)
				});
				echartsArr[i].start();
			}
			
			function formatData(data, index) {
				var echartsData = {};
				var tmpData = data.content.result.line;
				var datas = tmpData.datas;
				var alias = tmpData.alias;
				var times = tmpData.times;
				var items =[];
				//排序
				var newDatas = [];
				var aliaCPDatas={};
				for(var i = 0;i<alias.length;i++){
				   aliaCPDatas[alias[i]]=datas[i];
				}
				alias.sort();
				console.log(alias);
				for(var i=0;i<alias.length;i++){
			        newDatas[i]=aliaCPDatas[alias[i]]
			     }
				 tmpData.datas=newDatas;
				 tmpData.alias=alias;
				 
				/*处理时间*/
				times.forEach(function (item,index) {
					var tmpDate = new Date(item);
					var hours = tmpDate.getHours() > 9 ?tmpDate.getHours():'0'+tmpDate.getHours();
					var minutes = tmpDate.getMinutes() > 9 ?tmpDate.getMinutes():'0'+tmpDate.getMinutes();
					times[index] = hours+":"+minutes;
				});
				for (var i = 0; i < tmpData.datas.length; i++) {
					echartsData['line'+(i+1)] = tmpData.datas[i];
				}
				echartsData.time = times;
				data.content.echartsData = echartsData;
			
				echartsArr[index].changeItems(tmpData.alias);
				
				return data;
			}
			
			/*组织折线图数据*/
			function formatLineData(data) {
				var echartsData = {};
				var currData ={}; 
				var tmpData = data.content.result.line;
				var datas = tmpData.datas;
				var alias = tmpData.alias;
				var times = tmpData.times;
				var items =[];
				//排序
				var newDatas = [];
				var aliaCPDatas={};
				for(var i = 0;i<alias.length;i++){
				   aliaCPDatas[alias[i]]=datas[i];
				}
				alias.sort();
				for(var i=0;i<alias.length;i++){
			        newDatas[i]=aliaCPDatas[alias[i]]
			     }

				 tmpData.datas=newDatas;
				 tmpData.alias=alias;
				 
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
				eEcharts.changeItems(tmpData.alias);	
				return data;
			}
			
			
			
			
			/*组织柱状图数据*/
			function formatBarData(data) {
				var echartsData = {};
				var currData ={}; 
				var time = [];
				var tmpData = data.content.result.line;
				var datas = tmpData.datas;
				var alias = tmpData.alias;

				//排序
				var newDatas = [];
				var aliaCPDatas={};
				for(var i = 0;i<alias.length;i++){
				   aliaCPDatas[alias[i]]=datas[i];
				}
				alias.sort();
				
				for(var i=0;i<alias.length;i++){
			        newDatas[i]=aliaCPDatas[alias[i]]
			     }
				 console.log(newDatas);
				 console.log(aliaCPDatas);
				 tmpData.datas=newDatas;
				 tmpData.alias=alias;
				 
				echartsData.line1 = tmpData.datas;
				currData.line1 = echartsData.line1[echartsData.line1.length - 1];

				echartsData.time = time;
				data.content.echartsData = echartsData;
				data.content.currData = currData;
				
				eEcharts.changeItems(tmpData.alias);
				
				return data;
			}
			
			/*echarts按钮点击事件*/
			$("#eButtons button",$el).click(function(event) {
				if(this.className == 'active'){
					return;
				}
				$(this).addClass('active').siblings().removeClass('active');
				var tmie = this.value;
				getEcharts(activeTreeNode, tmie);
			});

			/*加载导航栏及表格基础信息*/
			app.common.ajaxWithAfa({
				url  : "CommonMonitorAction_getColums.do",
				data:{
					"objectId": objectId,
					'categoryKind': category
				}
			}).done(function (data) {
				if (!data.result) {
					return;
				}
				
				var treeData = getTreeData(data.result);
				getTreeList(treeData);
			});
			
			//获取符合ztree的数据结构
			function getTreeData(data){
				var arr = [];
				var nodeName;//节点名称
				var tmp;
				var id = 1;
				
				//oracleRAC在树状列表前加实例名
				if(category == 'OracleRAC') {
					arr.push({
						id: id++,
						pId: 0,
						name: 'alert日志关键字',
						isParent: true
					});
				}
				
				data.forEach(function(item, index){
					if(nodeName != item.CATEGORY_SHORT){
						nodeName = item.CATEGORY_SHORT;
						if(tmp){arr.push(tmp)}
						
						tmp = {};
						tmp.id = id++;
						tmp.pId = 0;
						tmp.name = item.CATEGORY_SHORT;
						tmp.metricSet = item.CATEGORY;
						tmp.isParent = true;
						tmp.items = [item.ITEM];
						if(item.UNIT){
								tmp.displayName = [item.DISPLAY_NAME + "(" + item.UNIT + ")"];
						}else{
							tmp.displayName = [item.DISPLAY_NAME];
						}
					}else{
						tmp.items.push(item.ITEM);
						if(item.UNIT){
							tmp.displayName.push(item.DISPLAY_NAME + "(" + item.UNIT + ")");
						}else{
							tmp.displayName.push(item.DISPLAY_NAME);
						}
					}				
				});
				
				arr.push(tmp);
				
				return arr;
			}
			
			//展示表格
			function showTable(data, wrapperId){
				//oracleRAC的首行实例名做特殊处理
				if(category == 'OracleRAC' && !data.metricSet) {
					showOracleInsnameTable(wrapperId);
				} else {
					showNormalTable(data, wrapperId);
				}				
			}
			
			var tableData;//MQ队列明细过滤时所用的数据
			//填充表格数据
			function getTableData($table,resultSet) {
				app.common.ajaxWithAfa({
					url  : "CommonMonitorAction_getKeyMetric.do",
					data:{
						"objectId":objectId,
						'resultSet':resultSet
					}
				}).done(function (data) {
					var result = data.result;
					tableData = result;
					if(result && result.length > 0){
						result = filterData(result);
						result.forEach(function (item,index) {
							item.index = index+1;
							if(category == "hpux" && resultSet == "os_swap"){
								item.free = item.free * 1000;
								item.used = item.used * 1000;
								item.total = item.total * 1000;
							}
						});
						
						$table.rows.add(result).draw();
					}
				});
			}
			
			function filterData(data) {
				var result = [];
				if(filterFlag) {
					data.forEach(function(item, i) {
						if(item.qname.indexOf('SYSTEM') == -1) {
							result.push(item);
						}
					});
				} else {
					result = tableData;
				}
				
				return result;
			}
			
			//展示oracleRAC实例名表格
			function showOracleInsnameTable(wrapperId){
				var columns = [
				    {data: 'index'},
				    {data: 'logfile', defaultContent: ''},
				    {data: 'keyword', defaultContent: ''},
				    {data: 'body', defaultContent: ''},
				    {data: 'times', defaultContent: ''},
				    {
				    	data: 'sample_time', 
				    	defaultContent: '',
				    	render: function(data) {
				    		return new Date(data).Format('yyyy-MM-dd hh:mm:ss');
				    	}
				    }
				];
				var thString = '<th>序号</th><th>日志文件</th><th>关键字</th><th>关键字采样</th><th>出现次数</th><th>采集时间</th>';
				
				if (wrapperId == 'metricCurrInfo') {
					$('#metricInfo', $el).hide();
					$('#metricCurrInfo', $el).show();
				}
				$('#tableCtn', $('#' + wrapperId, $el)).html('<table id="itemTable" class="display dataTable table"><thead><tr>'+ thString +'</tr></thead></table>');
				if($table){
					$table.clear();
					$table.destroy();					
				}
				$table = $("#itemTable", $('#'+wrapperId, $el)).DataTable({
					'pagingType': 'full_numbers',
					'searching'	: true,
					'bSort'	: false,
					'lengthChange': (function() {
						if(wrapperId == 'metricCurrInfo') {
							return true;
						}else{
							return false;
						}
					})(),
					'lengthMenu': [5, 15, 25, 50, 100],
					'pageLength': (function() {
						if(wrapperId == 'metricCurrInfo') {
							return 5;
						}else{
							return 5;
						}
					})(),
					'columns' : columns,
					'scrollX': true
				});
				
				//填充表格数据
				app.shelter.show('数据加载中，请稍后...');
				app.common.ajaxWithAfa({
					url: 'CommonMonitorAction_queryErrLogKeysOracle.do',
					data: {oraInsname: instanceName}
				}).then(function(data){
					app.shelter.hide();
					var data = data.result;
					data.forEach(function(item, i){
						item.index = ++i;
					});
					$table.rows.add(data).draw();
				});
			}
			
			function showNormalTable(data, wrapperId){
				console.log(data);
				var columns = [{data:'index'}];//dataTable的columns属性值
				var thString = '<th>序号</th>';//表头结构
				
				for (var i = 0; i < data.displayName.length; i++) {					
					//aix的aix_errpt指标集的某些指标值做数据转换
					if(data.metricSet == "aix_errpt" && (data.items[i].toLowerCase() == "class" || data.items[i].toLowerCase() == "type" || data.items[i].toLowerCase() == "timestamp" || data.items[i].toLowerCase() == "record_time")) {
						if(data.items[i].toLowerCase() == "class") {
							columns.push({
								data: data.items[i].toLowerCase(),
								defaultContent: '',
								render: function(data) {
									switch(data) {
										case 'S':
											return 'S-软件';
											break;
										case 'H':
											return 'H-硬件';
											break;
										case 'I':
											return 'I-信息';
											break;
										case 'U': 
											return 'U-未定的';
											break;
										default:
											return data;
									}
								}
							});
						} else if(data.items[i].toLowerCase() == "type") {
							columns.push({
								data: data.items[i].toLowerCase(),
								defaultContent: '',
								render: function(data) {
									switch(data) {
										case 'P':
											return 'P-PERM 硬件设备或软件模块损坏';
											break;
										case 'T':
											return 'T-TEMP 临时性错误，经过重试后已经恢复正常';
											break;
										case 'I':
											return 'I-INFO 一般信息，不是错误';
											break;
										case 'U': 
											return 'U-UNKN 不能确定错误的严重性';
											break;
										default:
											return data;
									}
								}
							});
						} else if(data.items[i].toLowerCase() == "timestamp") {
							columns.push({
								data: data.items[i].toLowerCase(),
								defaultContent: '',
								render: function(data) {
									return data && data.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2 $3:$4:$5');
								}
							});
						} else if(data.items[i].toLowerCase() == "record_time") {
							columns.push({
								data: data.items[i].toLowerCase(),
								defaultContent: '',
								render: function(data) {
									if(!data) return;
									if(new Date().getTime() - data > 180000) {
										return new Date(data).Format('yyyy-MM-dd hh:mm:ss');
									} else {
										return '未处理';
									}
								}
							});
						}
						
					} else {
						columns.push({data: data.items[i].toLowerCase(), defaultContent : ''});
					}
					
					thString += '<th>' + data.displayName[i] + '</th>';
				}	
				
				if (wrapperId == 'metricCurrInfo') {
					$('#metricInfo', $el).hide();
					$('#metricCurrInfo', $el).show();
				}
				$('#tableCtn', $('#' + wrapperId, $el)).html('<table id="itemTable" class="display dataTable table"><thead><tr>'+ thString +'</tr></thead></table>');
				if($table){
					$table.clear();
					$table.destroy();					
				}
				$table = $("#itemTable", $('#'+wrapperId, $el)).DataTable({
					'pagingType': 'full_numbers',
					'searching'	: true,
					'bSort'	: false,
					'bLengthChange': (function() {
						if(wrapperId == 'metricCurrInfo') {
							return true;
						}else{
							return false;
						}
					})(),
					'aLengthMenu': (function() {
						if(data.metricSet == "os_netstatus"){
							return [50, 5, 15, 25, 100];
						}else{
							return [5, 15, 25, 50, 100];
						}
					})(),
					'pageLength': (function() {
						if(wrapperId == 'metricCurrInfo') {
							if(data.metricSet == "os_netstatus"){
								return 50;
							}else{
								return 5;
							}
						}else{
							return 5;
						}
					})(),
					'columns' : columns,
					'scrollX': true
				});
				/*填充数据*/
				getTableData($table, data.metricSet);
			}
		},
		unload : function(handler) {
			eEcharts && eEcharts.dispose();
			echartsArr.forEach(function(item, i) {
				item && item.dispose();
			});
			echartsArr = null;
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});