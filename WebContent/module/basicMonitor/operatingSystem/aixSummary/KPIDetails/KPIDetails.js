define([ "jquery" ], function() {
	var eEcharts;
	return {
		load : function($el, scope, handler) {
			var objectId = scope.objectId;
			var category = scope.category;
			var activeTreeNode = null;//当前树节点
			
			var $table = null;//表格对象
			
			//解决ztree bug
			//var ztreeId = ztreeObj.getUid();
			var ztreeId = 'ztree';
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
					var oneLevelName;// 一级菜单名称
					var oneLevelId;// 一级菜单对应ID
					var tmpId = treeData.length + 1;// 每个菜单id
					var resultData = [];
					for (var i = 0; data && i < data.length; i++) {	
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
								tmp.unit = data[i].unit;//基本信息单位
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
				if (treeNode.level) {
					activeTreeNode = treeNode;//更新当前树节点
					$('#metricDesc', $el).text(treeNode.name);
					$('#metricInfo', $el).show();
					$('#metricCurrInfo', $el).hide();
					getBaseInfo(treeNode.metricSet, treeNode.metricName, treeNode.unit);
					showTable(treeNode,'detaisView');
					if(treeNode.unit == undefined){
						eEcharts && eEcharts.dispose();
						return;
					}
					$("#eButtons button:first",$el).addClass('active').siblings().removeClass('active');
					getEcharts(treeNode,60);
				}else{
					showTable(treeNode,'metricCurrInfo');
				}
			}
			
			/* 获取基本信息表格 */
			function getBaseInfo(metricSet, metricName, unit) {
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
							$('#' + i, $el).text(base[i]).attr('title', base[i] + (unit == undefined?'':'&nbsp;&nbsp;'+unit));
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
				
				if(paramData.echarts_flag == 0){
					$('#echartCtn', $el).hide();
					return;
				}else{
					$('#echartCtn', $el).show();
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
				eEcharts = app.drawEcharts({
					handler	 : handler,
					context	 : $el,
					selector : '#eEcharts',
					eType	 : type,
					url		 : 'CommonMonitorAction_getMetricEcharts.do',
					unit: paramData.unit,
					urlParams: {
						interval : 1,
						time 	 : time,
						'objectId' : objectId,
						'metricName' : paramData.metricName,
						'echarts_type':paramData.echarts_flag			
					},
					beforefn:function (data) {
						if(data.content.result.line.alias.length == 0){
							eEcharts && eEcharts.dispose();
							$("#eButtons",$el).css({display: 'none'});
						}
						if (paramData.echarts_flag == 1) {
							data = formatLineData(data);
						}else if(paramData.echarts_flag == 2){
							data = formatBarData(data);
						}
					}
				});
				eEcharts.start();
			}
			/*组织折线图数据*/
			function formatLineData(data) {
				var echartsData = {};
				var currData ={}; 
				var tmpData = data.content.result.line;
				var times = tmpData.times;
				var items =[];
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
				tmpData.alias.forEach(function(item,index){
					if (item.split(',').length > 1) {
						items.push(item.split(',')[1]);
					}else{
						items.push(item);
					}
				})
				eEcharts.changeItems(items);

				return data;
			}
			/*组织柱状图数据*/
			function formatBarData(data) {
				var echartsData = {};
				var currData ={}; 
				var time = [];
				var tmpData = data.content.result.line;
				echartsData.line1 = tmpData.datas;
				currData.line1 = echartsData.line1[echartsData.line1.length - 1];
				tmpData.alias.forEach(function(item,index){
					time.push(item.split(',')[1]);
				})
				echartsData.time = time;
				data.content.echartsData = echartsData;
				data.content.currData = currData;
				
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
			function showTable(data,wrapperId){
				var columns = [{data:'index'}];//dataTable的columns属性值
				var thString = '<th>序号</th>';//表头结构
				for (var i = 0; i < data.displayName.length; i++) {
					columns.push({data: data.items[i], defaultContent : ''});
					thString += '<th>' + data.displayName[i] + '</th>';
				}	
				if (wrapperId == 'metricCurrInfo') {
					$('#metricInfo', $el).hide();
					$('#metricCurrInfo', $el).show();
				}
				$('#tableCtn', $('#'+wrapperId, $el)).html('<table id="itemTable" class="display dataTable table"><thead><tr>'+ thString +'</tr></thead></table>');
				if($table){
					$table.clear();
					$table.destroy();					
				}
				$table = $("#itemTable",$('#'+wrapperId, $el)).DataTable({
					'pagingType': 'full_numbers',
					'searching'	: false,
					'bSort'	: false,
					'pageLength': 15,
					'columns' : columns,
					'scrollX': true
				})
				/*填充数据*/
				getTableData($table, data.metricSet);
			}
			
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
					if(result && result.length > 0){
						result.forEach(function (item,index) {
							item.index = index+1;
						});
						
						$table.rows.add(result).draw();
					}
				});
			}
			
		},
		unload : function(handler) {
			eEcharts && eEcharts.dispose();
		},
		pause : function($el, attr, handler) {
			app.dispatcher2.pause();
		},
		resume : function($el, attr, handler) {
		}
	};
});