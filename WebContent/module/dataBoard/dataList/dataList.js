define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			let $editModal = $('#modal',$el);
			let $appModal = $('#bindAppModal',$el);
			let appName = {};
			
			$("#newBtn", $el).on('click', function (e) {
				$editModal.modal('show');
			})
			
			$editModal.on('click', '.confirmBtn', function (e) {
				var name = $("#name", $el).val();
				if (name.trim() !== '') {
					savePanel(name);
				}
			})
			
			async function savePanel(name) {
				var url = 'PanelAction_add.do';
				var panelBean = JSON.stringify({
					name: name,
					objectId: '100071',
					status: '1',
				});
				var ret = await ajaxWithAfa(url, {panelBean});
				if (ret.result) {
					app.alert('保存成功！');
					$editModal.modal('hide');
					loadSearchTableData();
				}
			}
			
			//agent采集Table
			var $searchTable = $('#searchTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'name', defaultContent : ''
				},{
					data : 'userId', defaultContent : ''
				},{
					data : 'createTime', defaultContent : ''
				},{
					data : 'modifyTime', defaultContent : ''
				},{
					data : '', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						return '<span class="link-search fa fa-file-text-o" title="查看详情"></span>\
								<span class="link-add fa fa-link" title="关联应用"></span>\
								<span class="fa fa-cloud-upload" title="发布到首页"></span>\
								<span class="fa fa-eye" title="报表查看"></span>\
								<span class="link-del fa fa-trash-o" title="删除"></span>';
                    },
                    "targets" : 5
				}]
			});
			
			
			getAllApp();
			function getAllApp () {
				return app.common.ajaxWithAfa({
					url: 'ESSearchAction_getObjectCategory.do',
					data: {},
				}).done(function(content) {
					var appCate = content.result.app;
					let allApp = getCateApp(appCate);
					let html = `<span class="check-all">全选</span>`;
					allApp.forEach(item => {
						appName[item.cateId] = item.cateName;
						html += `<span data-id="${item.cateId}">${item.cateName}</span>`;
					});
					$('.apps-wrap',$el).html(html);
					return $.Deferred().resolve(content);
				});
			}
			
			function uploadPage (tr) {
				app.dispatcher.load({
					title: "我发布的仪表盘",
					moduleId:"dataBoard",
					section:'dashBoardPage',
					id: tr.id + 'page',
					params:{
						dashboardId:tr.id,
						name: tr.name
					},
					context: $el
				});
//				let params = {
//					id: tr.id,
//					name: tr.name,
//					path: 'dataBoard#dashBoardPage'
//				}
//				app.common.ajaxWithAfa({
//					url:'PanelAction_uploadPage.do',
//					data: params
//				}).done(function (data) {
//					if(data.result){
//						app.alert('发布成功，请刷新菜单');
//					}
//				})
			}
			
			function getCateApp (appCate) {
				var app = [];
				appCate.forEach(item => {
					if (item.childs && item.childs.length > 0) {
						app = app.concat(getCateApp(item.childs))
					} else {
						app.push(item);
					}
				})
				return app;
			}
			
			function bindApp(params) {
				app.common.ajaxWithAfa({
					url:'PanelAction_addRelation.do',
					data: params
				}).done(function (data) {
					if(data.result){
						app.alert('保存成功');
						$appModal.modal('hide');
						loadSearchTableData();
					}
				})
			}
			
			$('.apps-wrap',$el).on('click','>span',function(){
				$(this).toggleClass('active');
				if($(this).hasClass('check-all')){
					if($(this).text() == '全选'){
						$(this).text('全不选');
						$('.apps-wrap>span',$el).addClass('active');
					}else{
						$(this).text('全选');
						$('.apps-wrap>span',$el).removeClass('active');
					}
				}
			});
			
			$('.confirmBtn',$appModal).on('click',function(){
				if($('.apps-wrap>span.active',$el).length == 0){
					app.alert('请选择需要绑定的应用系统');
					return;
				}
				let panelId = Number($appModal.attr('data-panel-id'));
				let relationList = Array.from($('.apps-wrap>span:not(.check-all).active',$el)).map(item => {
					return{
						sourceId: Number($(item).attr('data-id')),
						panelId: panelId,
						appBoradName: $('#panel_name',$appModal).val()
					}
				});
				let params = {
						relations: JSON.stringify(relationList),
						panelId: panelId
				};
				
				bindApp(params);
			});
			
			
			loadSearchTableData();
			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			function loadSearchTableData() {
				app.common.ajaxWithAfa({
					url:'PanelAction_getAll.do'
				}).done(function (data) {
					$searchTable.clear();

					var result = data.result;
					if(result && result.length > 0){
						result.forEach(function (item, index) {
							item.index = index+1;
						})
					}
					$searchTable.rows.add(result).draw();
				})
			}
			
			$('#searchTable',$el).on('click', 'tbody span.link-del', function(event) {//删除
				var tr = $searchTable.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定删除该条记录？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'PanelAction_delById.do',
	                		data:{
	                			id: tr.id
	                		}
	                	}).done(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert('删除成功！');
	                			loadSearchTableData();
	                		}else{
	                			app.alert('删除记录失败！');
	                		}
	                	})
	                },
	                aArgs: [tr]
				});
			}).on('click', 'tbody span.link-search', function(event) {// 修改
				var tr = $searchTable.row($(this).parents('tr')).data();
				loadSearchPage(tr);
			}).on('click','tbody span.link-add',function(){
				let tr = $searchTable.row($(this).parents('tr')).data();
				let sources = tr.sourceIds;
				$('.apps-wrap>span',$el).removeClass('active');
				sources.split(',').forEach(item => $('.apps-wrap>span[data-id="'+item+'"]',$el).addClass('active'));
				$('#panel_name',$el).val(tr.name);
				$appModal.attr('data-panel-id',tr.id);
				$appModal.modal('show');
			}).on('click','tbody span.fa-cloud-upload',function(){
				/* 发布到首页 */
				let tr = $searchTable.row($(this).parents('tr')).data();
				uploadPage(tr);
			}).on('click','tbody span.fa-eye',function(){
				/* 发布到首页 */
				let tr = $searchTable.row($(this).parents('tr')).data();
				loadSeePage(tr);
			});

			function loadSearchPage(tr) {
				app.dispatcher.load({
					title: "仪表盘管理-"+tr.name,
					moduleId:"dataBoard",
					section:'',
					id: tr.id,
					params:{
						dashboardId:tr.id,
						name: tr.name
					},
					context: $el
				});
			}
			
			function loadSeePage(tr) {
				app.dispatcher.load({
					title: "",
					moduleId:"dataBoard",
					section:'dataBoardSee',
					id: tr.id + 'see',
					params:{
						dashboardId:tr.id,
						name: tr.name
					},
					context: $el
				});
			}
			
			function ajaxWithAfa(url, data){
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: url,
						data: data
					}).done(function(content) {
						resolve(content);
					})
				});
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
