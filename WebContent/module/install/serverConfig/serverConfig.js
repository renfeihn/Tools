define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			var $serverModal = $('#serverModal',$el);
			var activeTrData;
			//agent采集Table
			var $searchTable = $('#searchTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'id', defaultContent : '-'
				},{
					data : 'ip', defaultContent : '-'
				},{
					data : 'username', defaultContent : '-'
				},{
					data : 'password', defaultContent : '-'
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						return '<span class="link-edit fa fa-edit" title="修改"></span> | <span class="link-delete fa fa-edit" title="删除"></span>';
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
					url:'InstallConfigAction_getFileData.do',
					data: {fileName: "serverConfig"}
				}).done(function (data) {
					$searchTable.clear();

					var result = data.result.list;
					console.log(data);
					if(result && result.length > 0){
						result.forEach(function (item, index) {
							item.index = index+1;
						})
					}
					$searchTable.rows.add(result).draw();
				})
			}
			
			$('#searchTable',$el).on('click', 'tbody span.link-edit', function(event) {//编辑
				var tr = $searchTable.row($(this).parents('tr')).data();
				$serverModal.modal('show');
				activeTrData = tr;
				initserverModal(tr);
			});

			// 预警模态框事件
			$serverModal.on('click', '.confirmBtn', function(event) {
				var id = $serverModal.attr('data-id');
				if ($('#val', $serverModal).val().trim() === "" || $('#val_desc', $serverModal).val().trim() === "") {
					app.alert('请将必输参数填写完整！');
					return;
				}
				app.common.ajaxWithAfa({
					url:'SysVariableAction_updateSysVariable.do',
					data:{
						id:id,
						val:$('#val', $serverModal).val(),
						valDesc:$('#val_desc', $serverModal).val()
					}
				}).done(function (data) {
					if(data.result){
						app.alert('修改成功！');
						loadSearchTableData();
					}else{
						app.alert('修改失败！');
					}
					$serverModal.modal('hide');
				})
			});

			// 初始化模态框
			function initserverModal(tr) {
				$serverModal.attr('data-id', tr.id);
				$serverModal.find('form')[0].reset();

				for (var item in tr) {
					if (tr.hasOwnProperty(item)) {
						$('#'+item, $serverModal).val(tr[item]);
					}
				}
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
