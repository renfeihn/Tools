define(["jquery"],function($){
	return {
		load:function($el,scope,handler){
			scope.hideTitle && $('.page-title,#btn',$el).addClass('hide');
			var id = scope.id;
			var topoType = scope.topoType;//0表示应用，
			var topoName = scope.topoName;
			var limit = scope.limit;//权限，0表示公有，1表示私有
			
			var nodes = new app.vis.DataSet([
  			   //{id: 1, label: 'AIX', title: 'AIX', shape: 'image', image: 'img/baseMonitor/aix.png', size: 40},
  			   //{id: 2, label: 'AMQ', title: 'AMQ', shape: 'image', image: 'img/baseMonitor/amq.png', size: 40}
  			]);
  			
  			var edges = new app.vis.DataSet([
  				//{from: 1, to: 2, arrows: 'to'}
  			]);
			
			var isAdd = !id ? true : false;//是新增还是修改
			
			var relations;//关联数据
		
			getRelationDatas();//获取关联关系数据
			function getRelationDatas() {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_updateTopoCate.do',
					async: false,
					data: {
						flag: 0
					}
				}).then(function(data) {
					relations = data.funs;
				});
			}
			
			function getRelationInfo(sourceId, targetId) {
				for(var i = 0; i < relations.length; i++) {
					if(relations[i].source_cate_id == sourceId && relations[i].target_cate_id == targetId) {
						return {
							id: relations[i].id,
							name: relations[i].relation_name_zh,
							relation_name_en: relations[i].relation_name_en
						}
					}
				}
			}
			
			function checkArray(arr, id) {
				for(var i = 0; i < arr.length; i++) {
					if(arr[i].id == id) {
						return true;
					}
				}
				
				return false;
			}
			
			function getConfigData(id) {//修改时，先获取原本配置好的数据
				let url = scope.hideTitle ? 'CmdbConfigManagerAction_getAppTopo.do' 
											: 'CmdbConfigManagerAction_updateTopoContent.do';
				let item = scope.hideTitle ? 'result' : 'funs';
				let params = scope.hideTitle ? {appId: id} : {flag: 5,topoId: id};
				app.common.ajaxWithAfa({
					url: url,//,
					async: false,
					data: params
				}).then(function(data) {
					data = data[item];
					if(data) {
						var nodesArray = [];
						var edgesArray = [];
						data.forEach(function(item, i) {
							var node;
							if(!checkArray(nodesArray, item.source_obj_id)) {//避免重复添加		
								node = {};
								node.id = item.source_obj_id;
								node.label = item.source_obj_name;
								node.title = item.source_obj_name;
								node.size = 40;
								node.cateId = item.source_obj_cateId;
								if(item.source_logo_path) {
									node.shape = 'image';
									node.image = item.source_logo_path;
								}
								
								nodesArray.push(node);
							}
							
							if(!checkArray(nodesArray, item.target_obj_id)) {//避免重复添加		
								node = {};
								node.id = item.target_obj_id;
								node.label = item.target_obj_name;
								node.title = item.target_obj_name;
								node.size = 40;
								node.cateId = item.target_obj_cateId;
								if(item.target_logo_path) {
									node.shape = 'image';
									node.image = item.target_logo_path;
								}
								
								nodesArray.push(node);
							}
							
							edgesArray.push({
								from: item.source_obj_id,
								to: item.target_obj_id,
								arrows: 'to',
								label: item.relation_name_zh,
								title: item.relation_name_zh, 
								relationId: item.topo_relation_id,
								relation_name_en: item.relation_name_en
							});
						});
						
						nodes = new app.vis.DataSet(nodesArray);
						edges = new app.vis.DataSet(edgesArray);
					}
				});
			}
			
			if(!isAdd) {//修改
				getConfigData(id);
			}
			
			var $objTable = $("#objTable", $el).DataTable({
		        'bPaginate': true, //开关，是否显示分页器
		        //'pagingType': 'full_numbers',
		        "ordering": false,
		        'pageLength': 5,
		        "searching": true,
		        "stateSave": false,
		        'columns': [{
		        	data: '',
		        	render: function(data, type, row, meta) {
		        		return '<input type="checkbox"/>'
		        	}
		        },{
		        	data: 'object_id',
		        	defaultContent: ''
		        },{
		        	data: 'object_name', 
		        	defaultContent: ''
		        }]
			});
			
			var selectObj = app.multiSelect({
				dataTable: $objTable,
				tableSelector: '#objTable',
				checkAllSelector: '#checkboxAll',
				context: $el
			});
			
			var data = {
				nodes: nodes,
				edges: edges
			}
			
			var locales = {
				en: {
					edit: '编辑',
					del: '删除',
					back: '返回',
					addNode: '添加节点',
					addEdge: '添加关系',
					editNode: '编辑节点',
					editEdge: '编辑线条',
					addDescription: '点击页面空白处添加新节点',
					edgeDescription: '点击节点，然后按住左键，拖动到要连接的节点',
					editEdgeDescription: '点击控制点，并将它拖到一个节点',
					createEdgeError: '不能连接到集群',
					deleteClusterError: '不能删除集群',
					editClusterError: '不可编辑集群'
				}
			}
			
			var options = {
				locale: 'en',
				locales: locales,
				layout: {
					hierarchical: {
						nodeSpacing: 160,
						levelSeparation: 200,
						direction: 'UD',
						sortMethod: 'directed'
					}
				},
//				interaction: {
//					navigationButtons: true,
//					keyboard: true
//				},
				edges: {
					smooth: {
						type: 'cubicBezier',
						forceDirection: 'vertical',
						roundness: 0.4
					}
				},
				physics: false,
				manipulation: {
					addNode: function(data, callback) {
						clearNodeModal();

						$('#nodeModal', $el).modal('show');

						//模态框保存按钮
						$('#saveBtn', $el).off().click(addNode.bind(null, data, callback));
					},
					addEdge: function(data, callback) {
						if(!checkData(data, callback)) {
							callback(null);
							return;
						}
						var sourceNode = nodes._data[data.from];
						var targetNode = nodes._data[data.to];
						var info = getRelationInfo(sourceNode.cateId, targetNode.cateId);
						data.arrows = 'to';
						
						if(info) {
							data.label = info.name;
							data.title = info.name;
							data.relationId = info.id;
							data.relation_name_en = info.relation_name_en;
						} else {
							data.relationId = 0;
						}
						callback(data);
					},
					editEdge: false
				}
			}
			
			var network = new app.vis.Network($('#topoCtn', $el)[0], data, options);
			
			scope.hideTitle && $('.vis-edit-mode',$el).css('display','none');
			
			function checkData(data) {
				if(data.from == data.to) {
					app.alert('不可自关联');
					return false;
				}
				
				var edgesData = edges._data;
				for(var i in edgesData) {
					if(edgesData[i].to == data.from && edgesData[i].from == data.to) {
						app.alert('已有关系，不可再添加关系');
						return false;
					}
				}
				
				return true;
			}
			
			function addNode(data, callback) {
				var datas = selectObj.getSelectedDatas();
				if(!datas) {
					callback(null);
					return;
				}
				
				var nodes = [];
				datas.forEach(function(item, i) {
					var obj = {};
					obj.label = item.object_name;
					obj.id = item.object_id;
					obj.size = 40;
					obj.title = item.object_name;
					obj.cateId = newNode.cmdb_cate_id;
					if(newNode.logo_path) {
						obj.shape = 'image';
						obj.image = newNode.logo_path;
					}
					
					nodes.push(obj);
				});
			
				
				callback(nodes);
			}
			
			function clearNodeModal() {
				var ztreeObj = $.fn.zTree.getZTreeObj(ztreeId);
				ztreeObj.expandAll(false);//关闭已展开的节点
				ztreeObj.cancelSelectedNode();
				$objTable.clear().draw();
				//去除搜索条件
				$('.search-query', $el).val('');
				selectObj.clear();
			}
			
			
			//分类树ztree
			var ztreeId = uidObj.getUid();
			
			$('.ztree', $el).attr('id', ztreeId);
			
			var setting = {
				view : {
					showLine : true,
					showIcon : false,
					dblClickExpand : false
				},
				data : {
					simpleData : {
						enable : true,
						idKey : "id",
						pIdKey : "pid",
						rootPId : "0"
					},
					key: {
						name: 'cate_name'
					}
				},
				callback : {
					onClick : zTreeOnClick,
					beforeExpand: closeOther
				}
			};
			
			var newNode;
			function zTreeOnClick(event,treeId,treeNode,clickFlag){
				if(treeNode.level == 1) {
					newNode = treeNode;
					getObjList(treeNode.cmdb_cate_id);
				} else {//父节点
					$.fn.zTree.getZTreeObj(ztreeId).expandNode(treeNode);
				}
			}
			
			//获取某个三级分类下的对象
			function getObjList(cateId) {				
				$objTable.clear();
				selectObj.clear();
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_queryObjSummaryByCateId.do',
					data: {
						cateId: cateId
					}
				}).then(function(data) {
					data = data.funs;
					filterObj(data);//过滤掉已选添加的对象
					$objTable.rows.add(data).draw();
					//去除搜索条件
					$('.search-query', $el).val('').trigger('input');
				});
			}
			
			function filterObj(data) {
				for(var i = data.length - 1; i >= 0; i--) {
					for(var id in nodes._data) {
						if(data[i].object_id == id) {
							data.splice(i, 1);
							break;
						}
					}
				}
			}
			
			
			function closeOther(id,node){
				var aa = $.fn.zTree.getZTreeObj(ztreeId);
				//是不是根节点
				if(!node.parentTId){
					aa.expandAll(false);
					return
				}
				//叶子节点
				var parentNode = aa.getNodeByTId(node.parentTId);
				var findNode = aa.getNodesByFilter(filter,false,parentNode);
				for(var i=0;i<findNode.length;i++){
					if(findNode[i].level == node.level){
						aa.expandNode(findNode[i],false)
					}
				}
	        	function filter(n){
	        		return n.open == true
	        	}
	        }
			
			getCateData();
			
			//节点对象下拉框数据
			function getCateData() {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_queryAlllevelCmdbConfig.do',
					data: {
						pid: '-1'
					}
				}).then(function(data) {
					data = data.funs;
					$.fn.zTree.init($('#' + ztreeId, $el), setting, data);
				});
			}
			
			var url;
			//总的保存按钮
			$('#btn', $el).click(function(e) {				
				clearTopoModal();
				
				if(!checkNodes()) {//存在未连线的节点
					app.alert('有节点未配关联关系，不可保存！');
					return;
				}
				
				if(!isAdd) {
					$('#toponame', $el).val(topoName);
					$('#limit', $el).val(limit);
					if(limit == 0) {//公有权限的不让修改
						$('#limit', $el).attr('disabled', true);
					}
				}
				
				app.html2canvas($('#topoCtn canvas', $el)[0]).then(function(canvas) {
					url = canvas.toDataURL();
					$('#topoModal', $el).modal('show');
				});
			});
			
			//检查是否有节点未连线
			function checkNodes() {
				var nodesData = nodes._data;
				var edgesData = edges._data;
				
				var data = [];
				for(var key in edgesData) {
					data.push(Number(edgesData[key].from));
					data.push(Number(edgesData[key].to));
				}
				
				data = _.uniq(data);
				
				for(var key in nodesData) {
					if(data.indexOf(Number(key)) == -1) {
						return false;
					}
				}
				
				return true;
			}
			
			//保存模态框的确认按钮
			$('#confirmBtn', $el).click(function(e) {
				if(validateData($('#topoModal form'))) {
					var toponame = $('#toponame', $el).val();
					var limit = $('#limit', $el).val();
					
					savePageData(toponame, limit);
					$('#topoModal', $el).modal('hide');
				}
			});
			
			function savePageData(toponame, limit) {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_updateTopoContent.do',
					data: {
						toponame: toponame,
						limit: limit,
						flag: (function() {
							if(isAdd) {//新增
								return 1;
							} else {//修改
								return 2;
							}
						})(),
						topoContent: url,
						topoType: topoType,
						topoItems: JSON.stringify(getTopoItems()),
						topoId: (function() {
							if(!isAdd) {
								return id;
							}
						})()
					}
				}).then(function(data) {
					if(data.funs == 1) {
						app.tab.close(true);
						app.alert('保存成功');
					} else {
						app.alert('保存失败');
					}
				});
			}
			
			function getTopoItems() {
				var items = edges._data;
				var data = [];
				for(var key in items) {
					data.push({
						source_obj_id: items[key].from,
						target_obj_id: items[key].to,
						topo_relation_id: items[key].relationId,
						relation_name_en:items[key].relation_name_en
					});
				}
				
				return data;
			}
			
			function clearTopoModal() {
				$('.help-inline', $el).addClass('hide');
				$('#toponame', $el).val('');
				$('#limit', $el).val('1');
			}
			
			//数据验证
			function validateData(context){
				var validateResult = app.validate.validate({
					$context : context,
					data:  [{
						"id": "toponame",
						"filter": {
							"require": true,
						},
					}],
					correctCallback: function ($ele, correctMsg) {
						$ele.next().addClass('hide');
					},
					errorCallback : function ($ele, errMsg) {
						$ele.next().removeClass('hide').text(errMsg);
					}
				});
				return validateResult.bResult;
			}
		},
		
		unload:function(handler){

		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});