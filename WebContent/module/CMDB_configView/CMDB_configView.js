define(["jquery", ], function ($, viewBuilder, template, diyFormEvents) {
	var cache = {};
	return {
		load: function ($el, scope, handler) {

			let imgs = {}; //模型图标缓存
			let cateTree = null; //分类树
			let appTree = null; //app树
			let detailModel = null; //模型属性表单
			let currentFamily = null; //当前点击分类的上游
			let showOperates = true; //页面传参   是否显示对象列表上的操作按钮
			let treeNodeEname = null;
			let appName = ''; //页面传参  appname
			let modelId = ''; //页面传参
			let treeFlag = ''; //页面传参
			let treeNodeName = ''; //页面传参
			let allCates = null; //页面传参
			let isDelCate = false; //分类是否可以删除
			let delCate = null;

			let appDataMap = {};
			let autoId = 1; //二级分类自定义ID
			let selectedCate = null; //点击app下的分类
			let showAddCategory = false;
			/**
			 * ztree开始
			 * */
			let setting = {
				data: {
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "pid",
						rootPId: -1
					}
				},
				view: {
					showLine: false,
					expandSpeed: "normal"
				},
				callback: {
					onClick: zTreeOnClick,
					beforeExpand: closeOther,
					onExpand: zTreeOnExpand
				}
			};

			function loadCateTree(refresh, name) {
				//分类树
				$('#rightTab_ul .obj-list', $el).addClass('active').siblings().removeClass('active');
				$('#rightTabs2', $el).addClass('active').siblings().removeClass('active');
				$('#rightTab_ul>li:not(.obj-list)', $el).addClass('hide');
				if (!refresh && $('.ztree-cate', $el).children().length > 0) {
					handler.setTimeout(() => {
						$('#cate_tree_1_a', $el).trigger('click');
					}, 200);
					return;
				}
				app.shelter.show('正在加载,请稍后...');
				app.common.ajaxWithAfa({
					url: 'EventListAction_getObjectCategory.do',
					data: {},
				}).then(function (data) {
					app.shelter.hide();
					var cates = data.objectCate;
					if (cates && cates.length) {
						allCates = cates;
						$('#allCategory', $el).text(cates.length);
						/******处理数据 start*******/
						var levelOneNames = []; //一级目录
						for (var i = 0; i < cates.length; i++) {
							levelOneNames.push(cates[i].levelOneName);
						}
						levelOneNames = _.uniq(levelOneNames); //去重

						var treeArr = []; //最终需求的数据结构
						for (var i = 0; i < levelOneNames.length; i++) {
							treeArr.push({
								name: levelOneNames[i]
							});
							for (var j = 0; j < cates.length; j++) {
								if (cates[j].levelOneName == levelOneNames[i]) {
									if (!treeArr[i].children) {
										treeArr[i].children = [{
											name: cates[j].levelTwoName,
											children: []
										}];
									}
									if (treeArr[i].children) {
										var children = treeArr[i].children;
										var ishas = false;
										for (var k = 0; k < children.length; k++) {
											if (children[k].name == cates[j].levelTwoName) {
												children[k].children.push({
													name: cates[j].levelThreeName,
													id: cates[j].categoryId
												});
												ishas = true;
											}
										}
										if (!ishas) {
											children.push({
												name: cates[j].levelTwoName,
												children: [{
													name: cates[j].levelThreeName,
													id: cates[j].categoryId
												}]
											});
											
										}
									}

								}
							}
						}
						/******处理数据 end*******/
						cateTree = $.fn.zTree.init($("#cate_tree", $el), setting, treeArr);
						if (name) {
							var $ztree = $.fn.zTree.getZTreeObj("cate_tree");
							var treeArr = $ztree.getNodesByParamFuzzy("name",name,null);
							if(treeArr.length > 0){
								$ztree.expandAll(false);
								$ztree.expandNode(treeArr[0].getParentNode(),true,false,true);
								$ztree.selectNode(treeArr[0]);
								try {
									var id = treeArr[0].tId;
									$('#'+id+'_a', $el).trigger('click');
								} catch (e) {
									// TODO: handle exception
								}
							}
						} else {
							$('#cate_tree_1_a', $el).trigger('click');
						}
						
					}
				})
			}

			function loadAppTree() {
				//app树
				$('#rightTab_ul .app-overview', $el).addClass('active').siblings().removeClass('active');
				$('#rightTabs1', $el).addClass('active').siblings().removeClass('active');
				$('#rightTab_ul li', $el).removeClass('hide');
				if ($('.ztree-app', $el).children().length > 0) {
					handler.setTimeout(() => {
						$('#app_tree_1_a', $el).trigger('click');
					}, 200);
					return;
				}
				app.common.ajaxWithAfa({
					url: 'AppGroupAction_getAllApp.do',
					data: {},
				}).then(function (data) {
					var ret = data.result;
					let arr = [{
						id: 'all',
						pId: -1,
						name: '全部',
						isParent: false
					}];
					for (let i in ret) {
						arr.push({
							id: i,
							pId: -1,
							name: ret[i],
							isParent: true
						});
					}
					appTree = $.fn.zTree.init($('#app_tree', $el), setting, arr);
					$('#app_tree_1_a', $el).trigger('click');
				});
			}

			function closeOther(id, node) {
				var ztreeId = $('.ztree-wrap.active ul', $el).attr('id');
				var aa = $.fn.zTree.getZTreeObj(ztreeId);
				//是不是根节点
				if (!node.parentTId) {
					aa.expandAll(false);
					return
				}
				//叶子节点
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


			function zTreeOnExpand(event, treeId, treeNode) {
				if ($('.tree-cate', $el).hasClass('active') || treeNode.children) {
					return;
				}
				//app树
				if (treeNode.pId == -1) {

					let treeObj = $.fn.zTree.getZTreeObj('app_tree');
					let thisNode = treeObj.getNodeByParam("id", treeNode.id, null);
					treeObj.removeChildNodes(thisNode);
					getCate3ByApp(treeNode.id).then(ret => {
						if (!$.isEmptyObject(ret)) {

							if (!appDataMap[treeNode.id]) {
								appDataMap[treeNode.id] = {};
							}

							for (let i in ret) {
								let id = 'autoId-' + autoId;
								treeObj.addNodes(thisNode, [{
									id: id,
									pId: appId,
									name: i,
								}]);
								appDataMap[treeNode.id][i] = ret[i];
								let obj = ret[i];
								for (let j in obj) {
									let node = treeObj.getNodeByParam("id", id, null);
									let cateId = obj[j][0]['cate_id'];
									treeObj.addNodes(node, [{
										id: id,
										pId: appId,
										name: j,
									}]);
								}
								autoId++;
							}
						}
						console.log(appDataMap);

					});
				}
			}

			//根据app查询下游分类
			function getCate3ByApp(appId) {
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url: 'CmdbConfigManagerAction_getAppRelaObjects.do',
						data: {
							appId: appId
						},
					}).then(function (content) {
						let ret = content.result;
						resolve(ret);
					})
				})
			}



			//左侧配置总览点击事件
			var tag = false;

			function zTreeOnClick(event, treeId, treeNode, clickFlag) {
				let id = treeNode.id;
				let family = getParents(treeNode, [treeNode]);
				let text = family.reverse().map(item => item.name).join('/');
				currentFamily = getParents(treeNode, [treeNode]);
				if ($('.tree-cate', $el).hasClass('active')) {
					//分类树
					console.log(treeNode)
					if(treeNode.name == '应用软件'){
						showAddCategory = true;
					}else{
						showAddCategory = false;
					}
					
					var pNode = treeNode.getParentNode();
					isDelCate = pNode ? (pNode.name === '应用软件'): false;
					delCate = id;

					treeFlag = 'cateTree';
					modelId = id;
					appId = '';
					if (treeNode.isParent) {
						showOperates = false;
					} else {
						showOperates = true;
					}
					selectedCate = treeNode.level;
					tag = false;
					$('#rightTab_ul>.obj-list', $el).hasClass('active') && renderObjList();
				} else {
					//app树

					showOperates = false;
					treeFlag = 'appTree';
					modelId = '';
					appId = currentFamily[currentFamily.length - 1]['id'];
					treeNodeName = treeNode.name;
					treeNodeEname = treeNode.ename;
					if (treeNode.pId != '-1') {
						//点到app下的分类
						tag = false;
						selectedCate = treeNode.name;
						$('#rightTab_ul .obj-list', $el).removeClass('hide').siblings().addClass('hide');
						$('#rightTab_ul .obj-list>a', $el).trigger('click');
					} else {
						//点到app
						selectedCate = '';
						appName = treeNode.name;
						tag = true;
						$('#rightTab_ul li', $el).removeClass('hide');
						if (id === 'all') {
							$('#rightTab_ul>li:not(.app-overview)', $el).addClass('hide');
							if (!$("#rightTab_ul>li.app-overview", $el).hasClass('active')) {
								$("#rightTab_ul>li", $el).removeClass('active');
								$("#rightTab_ul>li.app-overview>a", $el).trigger('click');
							}
						} else {
							$('#rightTab_ul>li', $el).removeClass('hide');
						}
						$('#rightTab_ul>.app-overview', $el).hasClass('active') && renderAppOverview();
						$('#rightTab_ul>.relation', $el).hasClass('active') && renderTopoRelation();

					}
					$('#rightTab_ul>.obj-list', $el).hasClass('active') && renderObjList();

				}

			}

			function getParents(currentNode, family) {
				let parent = currentNode.getParentNode();
				if (parent) {
					family = [].concat(family);
					family.push(parent);
					return getParents(parent, family);
				} else {
					return family;
				}
			}


			//树切换
			$('#treeCate>li', $el).on('click', function () {
				if ($(this).hasClass('tree-cate')) {
					loadCateTree();
				} else {
					loadAppTree();
				}
			});
			$('#treeCate>li:eq(0)', $el).trigger('click');

			/**
			 * ztree结束
			 * **/


			//对象列表
			function renderObjList() {
				if (cache['objList']) {
					app.dispatcher2.unload('objList')
				}
				cache['objList'] = app.dispatcher2.load({
					"moduleId": "CMDB_configView",
					"section": "objList",
					"frameRenderTo": '#rightTabs2',
					"id": "objList",
					"params": { // 给标签传递参数
						'modelId': modelId,
						'tag': tag,
						'cateTree': cateTree,
						'appId': appId,
						'allCates': allCates,
						'imgs': imgs,
						'currentFamily': currentFamily,
						'treeFlag': treeFlag,
						'treeNodeName': treeNodeName,
						'showOperates': showOperates,
						'treeNodeEname': treeNodeEname,
						'selectedCate': selectedCate,
						'showAddCategory': showAddCategory,
						'isDelCate': isDelCate,
						'delCate': delCate
					},
					"context": $el
				});
			}

			//关系拓扑
			function renderTopoRelation() {
				if (cache['topoRelation']) {
					app.dispatcher2.unload('topoRelation')
				}
				cache['topoRelation'] = app.dispatcher2.load({
					"moduleId": "cmdbConfig",
					"section": "",
					"frameRenderTo": '#rightTabs3',
					"id": "topoRelation",
					"params": { // 给标签传递参数
						'id': appId,
						'hideTitle': true,
					},
					"context": $el
				});
			}

			//应用配置
			function renderAppOverview() {
				if (cache['appOverview']) {
					app.dispatcher2.unload('appOverview')
				}
				cache['appOverview'] = app.dispatcher2.load({
					"moduleId": "CMDB_configView",
					"section": "appOverview",
					"frameRenderTo": '#rightTabs1',
					"id": "appOverview",
					"params": { // 给标签传递参数
						'appId': appId,
					},
					"context": $el
				});
			}


			//日志源管理
			function renderSourcePage() {
				if (cache['sourcePage']) {
					app.dispatcher2.unload('sourcePage')
				}
				cache['sourcePage'] = app.dispatcher2.load({
					"moduleId": "CMDB_configView",
					"section": "dataSource",
					"frameRenderTo": '#rightTabs_source',
					"id": "sourcePage",
					"params": { // 给标签传递参数

					},
					"context": $el
				});
			}

			//代理采集管理
			function renderAgentPage() {
				if (cache['agentPage']) {
					app.dispatcher2.unload('agentPage')
				}
				cache['agentPage'] = app.dispatcher2.load({
					"moduleId": "",
					"section": "",
					"frameRenderTo": '#rightTabs_agent',
					"id": "agentPage",
					"params": { // 给标签传递参数

					},
					"context": $el
				});
			}

			


			$('#rightTab_ul>.app-overview', $el).on('click', function () {
				renderAppOverview();
			});
			$('#rightTab_ul>.obj-list', $el).on('click', function () {
				renderObjList();
			});
			$('#rightTab_ul>.relation', $el).on('click', function () {
				renderTopoRelation();
			});
			$('#rightTab_ul>.source-btn', $el).on('click', function () {
				renderSourcePage();
			});
			$('#rightTab_ul>.agent-btn', $el).on('click', function () {
				renderAgentPage();
			});
			$el.on('click', function () {
				$('#logInfoSlider,#agentSlider,#agentExcute', $el).removeClass('active');
			});
			window.addEventListener('message',function(e){
				if(!!e.data.addSoft){
					loadCateTree(true, e.data.name);
				}
			});
			


		},

		unload: function (handler) {

			for(let i in cache){
				app.dispatcher2.unload(i);
			}
		},

		pause: function ($el, scope, handler) {

		},

		resume: function ($el, scope, handler) {
			var saveAppTopo = app.domain.get('appTopo', 'saveFlag');
			var addObj = app.domain.get('addObj', 'saveFlag');
			if (saveAppTopo || addObj) {
				var ztreeId = $('.ztree-wrap.active ul', $el).attr('id');
				var treeObj = $.fn.zTree.getZTreeObj(ztreeId);
				var selectNode = treeObj.getSelectedNodes()[0];
				$('#' + selectNode.tId + '_a', $el).trigger('click');
			}
		}
	}
});