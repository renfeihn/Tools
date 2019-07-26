define([ "jquery" ], function() {
	var eEcharts;
	var echartsArr = [];
	return {
		load : function($el, scope, handler) {
			var objectId = scope.objectId;
			
			var category = scope.category;
			
			var nodename =  scope.key//集群的需要传递该参数--节点key
			
			var time='';//时间
			//解决ztree bug
			var ztreeId = uidObj.getUid();
			
			$('.ztree', $el).attr('id', ztreeId);
			var basicEcharts = {
					handler	: handler,
					context	: $el,
					eType	: 'line',
				},
				urlParams = {
					interval : 1,
					time 	 : 60,
					objectId:objectId
				};
			var ztree;
			var $itemTable = $('#itemTable',$el).DataTable({
				'bStateSave': false,
				"bAutoWidth": false,//自动宽度
				"ordering": false,
				'searching' : false,
				"bPaginate":true,
				'columns' 	: [{
					data : 'keyname', defaultContent : ''
				},{
					data : 'keyvalue', defaultContent : ''
				}]
			});
			var treeArr = [], setting = {
				data : {
					simpleData : {
						enable : true,
						idKey : "id",
						pIdKey : "pid",
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
			var id=0,arr=[],index=0;
			/*加载导航栏及表格基础信息*/
			app.common.ajaxWithAfa({
				url  : "CommonMonitorAction_getDataMetrics.do",
				data:{
					"objectId": objectId,
					'category': category,
					"nodeName":nodename
				}
			}).done(function (data) {
				if (!data.result) {
					return;
				}
				var datas = data.result
				for(var i=0;i<datas.length;i++){
					time = datas[i].sample_time
					var tmp={}
					tmp.name = datas[i].cate;
					tmp.pid=0;
					tmp.id=++id;
					arr.push(tmp);
					var value = {};
					if(nodename){
						if(category=="elasticsearch"){
							var tmp = JSON.parse(datas[i].value);
							var nodes = {}
							nodes[nodename] = tmp
							value["nodes"] = nodes;
						}else if(category=="kafka"){
							value[nodename] = JSON.parse(datas[i].value)
						}
					}else{
						value = JSON.parse(datas[i].value)
					}
					getTreeData(value,id,datas[i].cate+'.',datas[i].cate,datas[i].cate+'.')
				}
				ztree = $.fn.zTree.init($('#' + ztreeId, $el), setting, arr);
				//触发id为1的节点点击事件
				var node = ztree.getNodeByParam('name', datas[0].cate);
				ztree.selectNode(node);
				ztree.setting.callback.onClick(null, ztree.setting.treeId, node);
			});
			
			//获取符合ztree的数据结构 nowid--id,key--路径，type--所属根节点，keytmp--路径，为了查询echarts用
			function getTreeData(data,nowid,key,type,keytmp){
				if(data instanceof Object){
					for(var i in data){
						var tmp={}
						tmp.name = i;
						tmp.pid=nowid;
						tmp.id=++id;
						tmp.key = key;
						tmp.keytmp = keytmp;
						tmp.type = type;
						arr.push(tmp);
						getTreeData(data[i],id,key+i+'.',type,keytmp+'"'+i+'"'+'.')
					}
				}else{
					var tmp = arr[arr.length-1];
					tmp.value = data
				}
			}
			/* 树菜单点击事件 */
			function zTreeOnClick(event, treeId, treeNode, clickFlag) {
				if (treeNode.level==0) {
					var nodes = ztree.getNodesByParam( "type", treeNode.name, null);
					var tableData=[]
					$itemTable.clear();
					if(nodes.length>0){
						for(var i=0;i<nodes.length;i++){
							if(nodes[i].value!=undefined){
								var tempLine= {};
								tempLine.keyname = nodes[i].key+nodes[i].name;
								tempLine.keyvalue = nodes[i].value;
								tempLine.keytmp = nodes[i].keytmp+'"'+nodes[i].name+'"';
								tableData.push(tempLine);
							}
						}
						$itemTable.rows.add(tableData).draw();
					}
					getTreeTable();
				}else{
					if(!treeNode.isParent){//叶子结点
						$("#metricDesc",$el).text(treeNode.key+treeNode.name);
						$("#value",$el).text(treeNode.value);
						$("#time",$el).text(formatTime(time));
						drawEcharts(treeNode.keytmp+'"'+treeNode.name+'"');
						
					}
				}
			}
			
			function getTreeTable(){
				$("#itemTable tbody").unbind('click');
				$itemTable.on("click", "tbody>tr", function() {
					$(".selected").not(this).removeClass("selected");
					$(this).addClass("selected");
					var tr = $itemTable.row(this).data();
					$("#metricDesc",$el).text(tr.keyname);
					$("#value",$el).text(tr.keyvalue);
					$("#time",$el).text(formatTime(time));
					drawEcharts(tr.keytmp);
				});
				
			}
			
			function drawEcharts(metricname){
				if(isNaN(Number($("#value",$el).text()))){
					eEcharts && eEcharts.dispose();
					$("#eEcharts",$el).html("");
				}else{
					eEcharts && eEcharts.dispose();
					eEcharts = app.drawEcharts($.extend({}, basicEcharts, {
						selector: '#eEcharts',
						unit	: '-',
						url:'CommonMonitorAction_getMetricEchart.do',
						items:['Value'],
						urlParams: $.extend({}, urlParams, {
							metricNames : [metricname]
						}),
						isRefresh:false,
						beforefn:function (data) {
							data = formatLineData(data);
						}
					}))
					eEcharts.start();
				}
				
			}
			function formatTime(time){
				var tmpDate = new Date(time);
				var hours = tmpDate.getHours() > 9 ?tmpDate.getHours():'0'+tmpDate.getHours();
				var minutes = tmpDate.getMinutes() > 9 ?tmpDate.getMinutes():'0'+tmpDate.getMinutes();
				return  hours+":"+minutes;
			}
			
			/*组织折线图数据*/
			function formatLineData(data) {
				var echartsData = {};
				var tmpData = data.content.result.echartsData;
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
				}
				echartsData.time = times;
				data.content.echartsData = echartsData;
				eEcharts.changeItems(tmpData.alias);
				return data;
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