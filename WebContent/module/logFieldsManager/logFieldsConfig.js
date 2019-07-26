define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			var activeTrData;
			var dataLen;
			var fieldNames;
			//agent采集Table
			var $searchTable = $('#searchTable',$el).DataTable({
				'paging': false,
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					// data : 'index',
				// },{
					data : 'fieldName', defaultContent : ''
				},{
					data : 'fieldDesc', defaultContent : ''
				},{
					data : 'fieldType', defaultContent : ''
				},{
					data : '', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						return '<span class="link-edit fa fa-edit" title="编辑"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
                    },
                    "targets" : 3
				}]
			});
			
			loadSearchTableData();
			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			function loadSearchTableData() {
				app.common.ajaxWithAfa({
					url:'FieldDictionaryAction_getAll.do'
				}).done(function (data) {
					$searchTable.clear();
					var result = data.result;
					dataLen = result.length;
					fieldNames = [];
					if(result && dataLen > 0){
						result.forEach(function (item, index) {
							item.index = index+1;
							fieldNames.push(item.fieldName);
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
	                sContent:'确定删除字段名称“'+ tr.fieldName +'”？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'FieldDictionaryAction_delField.do',
	                		data:{
	                			id: tr.id
	                		}
	                	}).done(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert('删除成功！');
	                			loadSearchTableData();
	                			$(".addBtn", $el).removeClass("disabled");
	                		}else{
	                			app.alert('删除记录失败！');
	                		}
	                	})
	                },
	                aArgs: [tr]
				});
			}).on('click', 'tbody span.link-edit', function(event) {//编辑
				if($(this).hasClass("disabled")){
					return;
				}
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
				var inputArr = $obj.find('input,select');
				var dataArr = [];
				for (var i = 0; i < inputArr.length; i++) {
					var tmp = $(inputArr[i]).val();
					if(tmp){
						dataArr.push(tmp);
					}else{
						app.alert('请填写输入项');
						return;
					}
				}
				var thisField = tr && tr.fieldName
				if(isFieldRepeat(dataArr[0], thisField)){
					app.alert('字段名称重复');
					return;
				}
				if(tr){
					savefield('修改',{
						id:tr.id,
						fieldName:dataArr[0],
						fieldDesc:dataArr[1],
						fieldType:dataArr[2]
					})
				}else{
					savefield('新增',{
						fieldName:dataArr[0],
						fieldDesc:dataArr[1],
						fieldType:dataArr[2]
					})
				}
			})

			$('.LFC-btnGroup', $el).on('click', '.addBtn', function(event) {
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
								'<td><input type="text" /></td>' +
								'<td><input type="text" /></td>' +
								'<td>'+
									'<select>'+
										'<option value="String">String</option>'+
										'<option value="Date">Date</option>'+
										'<option value="Number">Number</option>'+
										'<option value="Integer">Integer</option>'+
										'<option value="Long">Long</option>'+
									'</select>'+
								'</td>' +
								'<td><span class="link-save fa fa-save" title="保存"></span><span class="link-cancel fa fa-reply" title="取消"></span></td>';
				if(rowData){
					var $obj = $('#searchTable tbody>tr:eq('+lineIndex+')', $el);
					$obj.html(htmlString);
					var inputArr = $obj.find('input,select');
					$(inputArr[0]).val(rowData.fieldName);
					$(inputArr[1]).val(rowData.fieldDesc);
					$(inputArr[2]).val(rowData.fieldType);
				}else{
					htmlString = '<tr role="row">'+htmlString+'</tr>';
					$('#searchTable tbody', $el).prepend(htmlString);
				}
			}

			function savefield(title, data) {
				if(title == '修改'){
					var url = 'FieldDictionaryAction_updateField.do';
				}else if(title == '新增'){
					var url = 'FieldDictionaryAction_addField.do';
				}
				app.common.ajaxWithAfa({
					url:url,
					data:data
				}).done(function (data) {
					if(data.result){
						app.alert(title+'成功');
						loadSearchTableData();
						$(".addBtn", $el).removeClass("disabled");
					}else{
						app.alert(title+'失败');
					}
				})
			}

			function isFieldRepeat(field, activeName) {
				var index = fieldNames.indexOf(field);
				if(activeName && activeName == field){
					return false;
				}else if(index >= 0){
					return true;
				}else{
					return false;
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
