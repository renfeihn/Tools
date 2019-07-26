define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			var $editModal = $('#modal',$el);
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
					data : 'echartsType', defaultContent : ''
				},{
					data : 'search', defaultContent : ''
				},{
					data : 'timeType', defaultContent : ''
				},{
					data : '', defaultContent : ''
				}],
				'aoColumnDefs' : [{
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
                    "targets" : 4
				},{
					"render": function(data, type, row, meta) {
						if(data == '1'){
							return '<span style="display:inline-block; width:100%; text-align:center;"><i class="fa fa-line-chart" title="折线图" style="color:#53a949;"></i></span>';
						}else if( data == '2'){
							return '<span style="display:inline-block; width:100%; text-align:center;"><i class="fa fa-bar-chart" title="柱状图" style="color:#53a949;"></i></span>';
						}else if( data == '3'){
							return '<span style="display:inline-block; width:100%; text-align:center;"><i class="fa fa-pie-chart" title="饼图" style="color:#53a949;"></i></span>';
						}
                    },
                    "targets" : 2
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-search fa fa-file-text-o" title="查看详情"></span><span class="link-edit fa fa-edit" title="编辑"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
                    },
                    "targets" : 5
				}]
			});
			
			loadSearchTableData();
			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			function loadSearchTableData() {
				app.common.ajaxWithAfa({
					url:'DashBoardAction_getAllDashBoard.do'
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
	                		url:'DashBoardAction_delDashBoardById.do',
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
			}).on('click', 'tbody span.link-edit', function(event) {//编辑
				var tr = $searchTable.row($(this).parents('tr')).data();
				$editModal.modal('show');
				$editModal.attr('data-id', tr.id);
				$('#name', $editModal).val(tr.name);
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
							dashboardId:tr.id
						}
					},
					context: $el
				});
			}

			$editModal.on('click', '.confirmBtn', function(event) {
				var id = $editModal.attr('data-id');
				app.common.ajaxWithAfa({
					url:'DashBoardAction_updateDashBoard.do',
					data:{
						id: id,
						name: $('#name', $editModal).val()
					}
				}).done(function (data) {
					if(data.result && data.result != ""){
						app.alert('修改成功！');
						loadSearchTableData();
					}else{
						app.alert('修改失败！');
					}
					$editModal.modal('hide');
				})
			});
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){

		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});
