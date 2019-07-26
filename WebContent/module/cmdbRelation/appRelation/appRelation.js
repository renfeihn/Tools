define(["jquery"],function($){
	var getPageData;
	return {
		load:function($el,scope,handler){			
			getPageData = function() {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_updateTopoContent.do',
					data: {
						topoType: 0,//应用
						flag: 0//查询
					}
				}).then(function(data) {
					data = data.funs.topoContent;
					if(data) {
						var liTmp = '';
						data.forEach(function(item, i) {
							liTmp += '<li data-id="'+ item.id +'" data-limit="'+ item.limiter +'" class="appRelation-box chart">\
										  <i class="fa fa-trash" title="删除"></i>\
										  <p class="topo-name">'+ item.topo_name +'</p>\
									  </li>';
						});
						liTmp += '<li class="appRelation-box add"></li>';
						
						$('#topoCtn', $el).html(liTmp);
						
						//异步加载每个缩列图
						data.forEach(function(item, i) {
							getTopoChart(item.id);
						});
					}
				})
			}

			function getTopoChart(id) {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_updateTopoContent.do',
					data: {
						flag: 4,//查询topo图片数据
						topoId: id
					}
				}).then(function(data) {
					$('#topoCtn [data-id="'+ id +'"] .topo-name', $el).before('<img src="'+ data.funs.topo_content +'"/>');
				});
			}
			
			getPageData();
			
			//topo缩列图跳转到编辑交易
			$('#topoCtn', $el).on('click', 'li.chart', function(e) {
				var id = $(this).attr('data-id');
				var limit = $(this).attr('data-limit');//权限
				var topoName = $(this).find('.topo-name').text();
				app.dispatcher.load({//提前加载应用状态总览
					title: topoName,
					moduleId:"cmdbConfig",
					section:"",
					id: id,
					params: {
						id: id,
						limit: limit,
						topoType: 0,
						topoName: topoName
					}
				});
			});
			
			//删除
			$('#topoCtn', $el).on('click', '.fa-trash', function(e) {
				e.stopPropagation();
				var id = $(this).parent().data('id');
				deleteTopoConfig(id, $(this).parent());
			});
			
			//新增
			$('#topoCtn', $el).on('click', 'li.add', function(e) {
				app.dispatcher.load({
					title: '新增应用CMDB关系',
					moduleId:"cmdbConfig",
					section:"",
					params: {
						topoType: 0
					}
				});
			});
			
			//删除topo
			function deleteTopoConfig(id, $li) {
				app.common.ajaxWithAfa({
					url: 'CmdbConfigManagerAction_updateTopoContent.do',
					data: {
						flag: 3,//删除
						topoId: id
					}
				}).then(function(data) {
					if(data.funs == 1) {
						app.alert('删除成功');
						$li.remove();
					} else {
						app.alert('删除失败');
					}
				});
			}
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			getPageData();
		}
		
	}
});