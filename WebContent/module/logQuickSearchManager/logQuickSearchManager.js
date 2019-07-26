define(["jquery"],function(){
	var $searchTable;
	return {
		load:function($el,scope,handler){
			//agent采集Table
			$searchTable = $('#searchTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'searchName', defaultContent : ''
				},{
					data : 'searchCondition', defaultContent : ''
				},{
					data : 'timeType', defaultContent : ''
				},{
					data : 'usedTimes', defaultContent : ''
				},{
					data : 'lastUsedTime', defaultContent : ''
				},{
					data : 'createTime', defaultContent : ''
				},{
					data : '', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					//0:自动匹配 1:固定值 2:当天 3:本周 4:本月 5:今年
					"render": function(data, type, row, meta) {
						if(data == '0'){
							return '自动匹配';
						}else if( data == '1'){
							return '固定值';
						}else if( data == '2'){
							return '当天';
						}else if( data == '3'){
							return '本周';
						}else if( data == '4'){
							return '本月';
						}else if( data == '5'){
							return '今年';
						}
                    },
                    "targets" : 3
				},{
					"render": function(data, type, row, meta) {
						if(data != undefined){
							return new Date(data).Format('yyyy/MM/dd hh:mm:ss');
						}
                    },
                    "targets" : [5,6]
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-search fa fa-search" title="搜索"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
                    },
                    "targets" : 7
				}]
			});
			
			loadSearchTableData();
			handler.loadSearchTableData = loadSearchTableData;
			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			function loadSearchTableData() {
				app.common.ajaxWithAfa({
					url:'ESSearchAction_getQuickSearchs.do'
				}).done(function (data) {
					$searchTable.clear();

					var result = data.result;
					if(result && result.length > 0){
						result.forEach(function (item, index) {
							item.index = index+1;
						})
					}
					$searchTable.rows.add(result).draw(false);
				})
			}
			
			$('#searchTable',$el).on('click', 'tbody span.link-del', function(event) {//删除
				var id = $(this).parents('table').attr('id');
				var tr = $searchTable.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定删除该条记录？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'ESSearchAction_delQuickSearch.do',
	                		data:{
	                			quickSearchId: tr.id
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
				var id = $(this).parents('table').attr('id');
				var tr = $searchTable.row($(this).parents('tr')).data();

				loadSearchPage(tr);
			});

			/**
			 * 加载日志搜索页面
			 * @param  {object} tr 表格中某条记录数据
			 * @return {undefined}
			 */
			function loadSearchPage(tr) {
				app.dispatcher.load({
					title: "日志搜索",
					moduleId:"logResultCheck",
					section:'logSearchDetail',
					id: tr.id,
					params:{
						param:{
							quickSearchId:tr.id
						}
					},
					context: $el
				});
			}
		},
		
		unload:function(handler){
			handler.loadSearchTableData = null;
			$searchTable = null;
		},
		
		pause:function($el,scope,handler){

		},
		
		resume:function($el,scope,handler){
			handler.loadSearchTableData && handler.loadSearchTableData();
		}
		
	}
});
