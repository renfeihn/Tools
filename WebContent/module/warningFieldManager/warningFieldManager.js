define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			var activeTrData;
			var dataLen;
			var fieldNames;

			var $searchTable = $('#searchTable',$el).DataTable({
				'paging': false,
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					// data : 'index',
				// },{
					data : 'name', defaultContent : ''
				},{
					data : 'warnValue', defaultContent : ''
				},{
					data : '', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						return '<div>'+data+'</div>';
                    },
                    "targets" : 1
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-edit fa fa-edit" title="编辑"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
                    },
                    "targets" : 2
				}],
				"fnDrawCallback": function(s) {
					$("#searchTable", $el).find('tr').removeAttr('title');
				}
			});
			
			loadSearchTableData();
			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			function loadSearchTableData() {
				app.common.ajaxWithAfa({
					url:'LogWarningFieldAction_getAllWarningFields.do'
				}).done(function (data) {
					$searchTable.clear();
					var result = data.result;
					dataLen = result.length;
					fieldNames = [];
					if(result && dataLen > 0){
						result.forEach(function (item, index) {
							item.index = index+1;
							fieldNames.push(item.name);
						})
					}
					$searchTable.rows.add(result).draw();
				})
			}
			
			$('#searchTable',$el).on('click', 'tbody span.link-del', function(event) {//删除
				if($(this).hasClass("disabled")){
					return;
				}
				var tr = $searchTable.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定删除预警名称为“'+ tr.name +'”的数据吗？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'LogWarningFieldAction_delWarningField.do',
	                		data:{
	                			id: tr.id
	                		}
	                	}).done(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert('删除成功！');
	                			loadSearchTableData();
	                			$('.WFM-btnGroup .addBtn', $el).removeClass('disabled');
	                		}else{
	                			app.alert('删除记录失败！');
	                		}
	                	})
	                },
	                aArgs: [tr]
				});
			}).on('click', 'tbody span.link-edit', function(event) {//编辑
				var tr = $searchTable.row($(this).parents('tr')).data();
				var index = $(this).parents('tr').index();
				initLine(index, tr);
				$(".addBtn", $el).addClass("disabled");
				$('.link-del,.link-edit', $el).addClass('disabled');
			}).on('click', 'tbody span.link-cancel', function(event) {
				event.preventDefault();
				var tr = $searchTable.row($(this).parents('tr')).data();
				if(tr){
					loadSearchTableData();
				}else{
					$(this).parents('tr').remove();
					dataLen--;
				}
				$(".addBtn", $el).removeClass("disabled");
				$('.link-del,.link-edit', $el).removeClass('disabled');
			}).on('click', 'tbody span.link-save', function(event) {
				event.preventDefault();
				var $obj = $(this).parents('tr');
				var tr = $searchTable.row($obj).data();
				var inputArr = $obj.find('input,select,textarea');
				var dataArr = [];
				for (var i = 0; i < inputArr.length; i++) {
					var tmp = $(inputArr[i]).val().trim();
					if(tmp){
						var temp = tmp.replace(/；/g,';');
						dataArr.push(temp);
					}else{
						app.alert('请填写输入项');
						return;
					}
				}
				var thisField = tr && tr.name;
				if(isFieldRepeat(dataArr[0], thisField)){
					app.alert('预警名称重复');
					return;
				}
				if(tr){
					savefield('修改',{
						id:tr.id,
						name:dataArr[0],
						warnValue:dataArr[1]
					})
				}else{
					savefield('新增',{
						name:dataArr[0],
						warnValue:dataArr[1]
					})
				}
			})

			$('.WFM-btnGroup', $el).on('click', '.addBtn', function(event) {
				if(!$(this).hasClass("disabled")){
					event.preventDefault();
					initLine(dataLen);
					dataLen++;
					$(this).addClass("disabled");
					$('.link-del,.link-edit', $el).addClass('disabled');
				}
			});

			function initLine(lineIndex, rowData) {
				var htmlString= //'<td>'+(lineIndex+1)+'</td>'+
								'<td><input type="text" placeholder="预警名称"/></td>' +
								'<td><textarea placeholder="字段值。多个值用‘;’分隔, 例如: 10000;10001;"></textarea></td>' +
								'<td><span class="link-save fa fa-save" title="保存"></span><span class="link-cancel fa fa-reply" title="取消"></span></td>';
				if(rowData){
					var $obj = $('#searchTable tbody>tr:eq('+lineIndex+')', $el);
					$obj.html(htmlString);
					var inputArr = $obj.find('input,select,textarea');
					$(inputArr[0]).val(rowData.name);
					$(inputArr[1]).val(rowData.warnValue);
				}else{
					htmlString = '<tr role="row" >'+htmlString+'</tr>';
					$('#searchTable tbody', $el).prepend(htmlString);
				}
			}

			function savefield(title, data) {
				if(title == '修改'){
					var url = 'LogWarningFieldAction_updateWarningField.do';
				}else if(title == '新增'){
					var url = 'LogWarningFieldAction_addWarningField.do';
				}
				app.common.ajaxWithAfa({
					url:url,
					data:data
				}).done(function (data) {
					if(data.result){
						app.alert(title+'成功');
						loadSearchTableData();
						$('.WFM-btnGroup .addBtn', $el).removeClass('disabled');
					}else{
						app.alert('title', title+'失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
					}
				})
			}

			function isFieldRepeat(field, name) {
				return name && name == field?false: fieldNames.includes(field);
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
