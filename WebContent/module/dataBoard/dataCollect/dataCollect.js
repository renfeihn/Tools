define(["jquery"],function(){
	var resumeModal = false;
	return {

		load:function($el,scope,handler){
			
			var $wsSelArea = $('#wsMainCtn',$el);
			
			loadList()
			async function loadList() {
				var url = 'PanelAction_getDashBoardPannelList.do';
				var ret = await ajaxWithAfa(url);
				if (ret.result) {
					setList(ret.result)
				}
			}
			
			function setList(shareList) {
				$wsSelArea.empty();
				for(var i = 0,len = shareList.length ; i < len ; i++){
					var temp=$("#wsItemTemp").html(),item = shareList[i];
					temp=temp.replace(/__itemName__/,item.name);
					temp=temp.replace(/__id__/,item.id);
					temp=temp.replace(/__shareGrp__/,'');
					$temp=$(temp);
        			$wsSelArea.append($temp);
        		}
			}
			
			
			function deleteItem(itemId,$ctt){
				app.confirm({
					title:'确认',
					content:'确认删除项目吗?',
					btnConfirm:'是',
					btnCancel:'否',
					confirmHandler:function(){
						delDashBoard(itemId);
					},
					cancelHandler:function(h,g){
					},
				});
			}
			
			
			async function delDashBoard(id) {
				var url = 'PanelAction_delDashBoardPannel.do';
				var ret = await ajaxWithAfa(url, {id});
				if (ret.result) {
					app.alert('删除成功！');
					loadList();
				}
			}
			
			
			
			
			function ajaxWithAfa(url, data = {}){
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: url,
						data: data
					}).done(function(content) {
						resolve(content);
					})
				});
			}
			
			$("#wsMainCtn", $el).on('click', '>div', function () {
				var id = $(this).attr('id');
				var name = $($(this).find('.ws-item-title')[0]).text();
				app.dispatcher.load({
                   title: '我的视图-' + name,
                   moduleId: 'dataBoard',
                   section: 'dashBoardPage',
                   id: id,
                   params: {
                	   dashboardId:id,
                	   name: name
                   },
                   context: $el
	            });
			}).on('click', '*[data-role="wsfTipDel"]', function (e) {
				e.stopPropagation();
				var id = $(this).parents('.ws-item-ctn').attr('id');
				deleteItem(id);
			}).on('click', '*[data-role="wsTipEdit"]', function (e) {
				e.stopPropagation();
				var id = $(this).parents('.ws-item-ctn').attr('id');
				app.dispatcher.load({
                   title: '数据视图管理',
                   moduleId: 'dataBoard',
                   section: 'dashBoardOverView',
                   id: id,
                   params: {
                	   dashboardId:id
                   },
                   context: $el
	            });
			})
			
			
			$('#wsSelArea',$el).slimScroll({
				height : '508px',
				color : '#fff'
			});
			$('.ws-seled-ctn',$el).slimScroll({
				height : '480px',
				color : '#F7F6FB'
			});
			this.delegateEvents({
				'mouseenter #wsMainCtn':function(e){
					$('[data-role="wsTip"]',$el).hide();
					var $elem=$(e.target||window.event.srcElement),
					$wsItemBox=$elem.closest('[data-role="wsItem"]'),		
					$wsTip=$('[data-role="wsTip"]',$wsItemBox);
					$wsTip.stop().slideDown();
				},
				'mouseleave #wsMainCtn':function(e){									//悬浮项目菜单
					var $elem=$(e.target||window.event.srcElement),
						$wsItemBox=$elem.closest('[data-role="wsItem"]'),		
						$wsTip=$('[data-role="wsTip"]',$wsItemBox);
					
						$wsTip.stop().slideUp();
				}
			})
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			if(resumeModal){
				$('#addShareModal',$el).modal('show');
				resumeModal = false;
			}
		}
		
	}
});