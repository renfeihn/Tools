define([],function(){
	return {
		load:function($el,scope,handler){
			var appId = scope.appId;
			var appName = scope.appName;
			var topoId = scope.topoId;
			
			let cateModelEname = 'topoModelCate'; //模版分类字典ename
			let cateModelCname = '拓扑模板分类'; //模版分类字典cname
			let topoModuleMap = {}; //拓扑模版信息缓存
			let appTopoMap = {}; //应用拓扑信息缓存
			
			getTopoList(appId);
			bindEvents();
			
			//查询分类
			function getCates(ename) {
				app.common.ajaxWithCmdb({
					data:{
						'servicename':'cn.com.agree.aim.cmdb.service.common._cmdb_dict_manager',
	        			'method':'dict_query',
	        			'requestData': JSON.stringify({dictDefEname:ename})
					}
				}).then(function(data){
					$('.cate-list',$el).html('');
					let ret = data.ret;
					if(ret.length > 0){
						let html = '';
						ret = ret.sort((a,b) => {
							return Number(a['dictValue']) - Number(b['dictValue']);
						});
						ret.forEach(item => {
							html += `<div class="topo-cate-item">${item.dictValueDesc}</div>`;
						});
						$('.topo-cate-wrap',$el).html(html);
						$('.topo-cate-wrap>div:eq(0)',$el).trigger('click');
					}
				})
			}
			
			//获得分类下的拓扑模版
			function getTopoModule(cate) {
				topoModuleMap = {};
				app.shelter.show('正在查询,请稍后...');
				app.common.ajaxWithAfa({
					url:'CMDBCommonAction_commonService.do',
					data:{
						'servicename': 'cn.com.agree.aim.cmdb.service.datamanage._cmdb_app_manager',
						'method': 'getTopoModuleList',
						'requestData': JSON.stringify({'module_cate':cate})
					},
				}).then(function(data){
					app.shelter.hide();
					let ret = data.ret;
					let html = '';
					if(ret.length > 0){
						ret.forEach(item => {
							let nodes = JSON.parse(item.topoContent).nodes;
							nodes = nodes.map(item => {
								return item.id.split('topo_agree_')[1];
							});
							topoModuleMap[item.moduleName] = {
									id: item.id,
									name: item.moduleName,
									nodes: nodes
							};

							html += `<div class="topo-item" data-id="${item.id}">
										<div class="topo-item-img" style="background-image: url(${item.png})"></div><div class="topo-item-name">${item.moduleName}</div>
									</div>`;
						});
					}
					html += `<div class="addone" title="添加模版">
								<div class="topo-item-img"><i class="fa fa-edit"></i></div><div class="topo-item-name">自定义</div>
							</div>`;
					$('.topos-wrap',$el).html(html);
				});
			}
			
			//查询应用拓扑
			function getTopoList(appId) {
				appTopoMap = {};
				appId = appId == 'all' ? null : Number(appId);
				app.shelter.show('正在查询,请稍后...');
				app.common.ajaxWithAfa({
					url:'CMDBCommonAction_commonService.do',
					data:{
						'servicename': 'cn.com.agree.aim.cmdb.service.datamanage._cmdb_app_manager',
						'method': 'getTopoList',
						'requestData': JSON.stringify({'app_id':appId})
					},
				}).then(function(data){
					app.shelter.hide();
					let ret = data.ret;
					let html = appId == null ? '' : '<div class="addone" title="添加拓扑"><i class="fa fa-plus"></i></div>';
					if(ret.length > 0){
						ret.forEach(item => {
							
							let nodes = JSON.parse(item.topoContent).nodes.map(item => item.dmdefid);
							appTopoMap[item.topoName] = {
									id: item.id,
									name: item.topoName,
									nodes: nodes,
									topoTypeId: item.topoTypeId
							};
							
							html += `<div title="${item.topoName}" class="topo-item" data-id="${item.id}" data-topotypeid="${item.topoTypeId}" data-appid="${item.appId}"  data-type="${item.topoType}">
								<p><span class="text-no-wrap" style="display: inline-block;width: 76%;">${item.topoName}</span><span class="operates"><i class="fa fa-edit"></i><i class="fa fa-trash"></i></span></p>
								<div class="topo-img" style="background-image: url(${item.png})"></div>
							</div>`;
						});
					}
					$('#topos_content',$el).html(html);
				});
			}		
			
			//删除应用拓扑
			function deleteTopo(topoId,appId) {
				app.shelter.show('正在删除,请稍后...');
				app.common.ajaxWithAfa({
					url:'CMDBCommonAction_commonService.do',
					data:{
						'servicename': 'cn.com.agree.aim.cmdb.service.datamanage._cmdb_app_manager',
						'method': 'delTopo',
						'requestData': JSON.stringify({id:topoId})
					},
				}).then(function(data){
					app.shelter.hide();
					if(data.ret){
						app.alert('删除成功');
						getTopoList(appId);
					}
				})
			}
			
			//跳转到应用拓扑页面
			function jumpToAppTopoPage() {
				let name = $('.topos-wrap>.active .topo-item-name',$el).text();
				let topoTypeId = $('.topos-wrap>.active',$el).attr('data-id');
				let module = topoModuleMap[name] || {nodes: ""};
				let topoType = $('.topo-cate-wrap>div.active',$el).text() + '-' + name;
				$('#topoModule',$el).modal('hide');
				app.domain.exports('appTopo', {
					'saveFlag': false
				});
				app.dispatcher.load({
					"title": appName + '-' + name,
					"moduleId" : "CMDB_visualApp",
					"section" : "",
					"id" : "CMDB_visualApp",
					"params": {
						appName: appName,
						nodes : module.nodes,
						appId : appId,
						topoType: topoType,
						topoTypeId: topoTypeId,
						flag: 'add'
					}
				});
			}
			
			function updateTopoName(id,name) {
				id = Number(id);
				app.common.ajaxWithAfa({
					url:'CMDBCommonAction_commonService.do',
					data:{
						'servicename': 'cn.com.agree.aim.cmdb.service.datamanage._cmdb_app_manager',
						'method': 'renameTopo',
						'requestData': JSON.stringify({
							id:id,
							topo_name: name
						})
					},
				}).then(function(data){
					app.shelter.hide();
					if(data.ret){
						app.alert('修改成功');
						getTopoList(appId);
					}
				})
			}
			
			
			
			function bindEvents() {
				//修改名称
				$('#topos_content',$el).on('click','.operates>i.fa-edit',function(e){
					let name = $(this).parents('.topo-item').find('p').text();
					let id = $(this).parents('.topo-item').attr('data-id');
					$('#topo_name',$el).val(name).attr('data-id',id);
					$('#updateName',$el).modal('show');
				});
				$('#updateName',$el).on('click','.confirmBtn',function(e){
					let $element = $('#topo_name',$el);
					if(!$element.val()){
						return;
					}
					updateTopoName($element.attr('data-id'),$element.val());
				});
				//删除应用拓扑
				$('#topos_content',$el).on('click','.operates>i.fa-trash',function(e){
					e.stopPropagation();
					let topoId = $(this).parents('.topo-item').attr('data-id');
					let appId = $(this).parents('.topo-item').attr('data-appid');
					$('#delTopoModule',$el).attr('data-topoid',topoId).attr('data-appid',appId);
					$('#delTopoModule',$el).modal('show');
				});
				//删除应用拓扑
				$('#delTopoModule .confirmBtn',$el).on('click',function(){
					let topoId = $('#delTopoModule',$el).attr('data-topoid');
					let appId = $('#delTopoModule',$el).attr('data-appid');
					deleteTopo(Number(topoId),appId);
				});
				
				//新增应用拓扑点击
				$('#topos_content',$el).on('click','.addone',function(){
					getCates(cateModelEname);
					$('.topo-name',$el).addClass('hide');
					$('#topoModule',$el).modal('show');
				});
				
				//选择模版跳转
				$('.topos-wrap',$el).on('dblclick','>div',function(){
					jumpToAppTopoPage();
				});
				$('#topoModule .confirmBtn',$el).on('click',function(){
					jumpToAppTopoPage();
				});
				
				//选择应用拓扑跳转
				$('#topos_content',$el).on('click','.topo-img',function(){
					let topoId = $(this).parent().attr('data-id');
					let topoTypeId = $(this).parent().attr('data-topotypeid');
					let topoType = $(this).parent().attr('data-type');
					let name = $(this).parent().find('p').text();
					let module = appTopoMap[name] || {nodes: ""};
					app.domain.exports('appTopo', {
    					'saveFlag': false
    				});
					app.dispatcher.load({
						"title": name,
						"moduleId" : "CMDB_visualApp",
						"section" : "",
						"id" : "CMDB_visualApp"+topoId,
						"params": {
							appName: appName,
							appTopoName: name,
							nodes : module.nodes,
							topoId: topoId,
							appId : appId,
							topoType: topoType,
							topoTypeId: topoTypeId,
							flag: 'check'
						}
					});
				});
				
				//选择模版分类
				$('.topo-cate-wrap',$el).on('click','>div',function(){
					$(this).addClass('active').siblings().removeClass('active');
					let name = $(this).text();
					getTopoModule(name);
				});
				
				//选择模版
				$('.topos-wrap',$el).on('click','>div',function(){
					$(this).addClass('active').siblings().removeClass('active');
				});
				
				//模版维护
				$('.module-config-btn',$el).on('click',function(){
					$('#topoModule',$el).modal('hide');
					app.dispatcher.load({
						"title": "拓扑模版",
						"moduleId" : "CMDB_topoModuleConfig",
						"section" : "",
						"id" : "CMDB_topoModuleConfig",
						"params": {
						}
					});
				});
				
				
			}
	
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			debugger
		}
		
	}
});