define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			var activeTrData;
			var fieldDescription = [];
			var dataLen;
			var userRole,
				userRoleMap;
			//agent采集Table
			var $searchTable = $('#searchTable',$el).DataTable({
				'paging': false,
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					// data : 'index',
				// },{
					data : 'description', defaultContent : ''
				},{
					data : 'regex', defaultContent : ''
				},{
					data : 'replaced', defaultContent : ''
				},{
					data : 'rids', defaultContent : ''
				},{
					data : '', defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						return formatRidToName(data);
                    },
                    "targets" : 3
				},{
					"render": function(data, type, row, meta) {
						return '<span class="link-edit fa fa-edit" title="编辑"></span><span class="link-del fa fa-trash-o" title="删除"></span>';
                    },
                    "targets" : 4
				}]
			});

			function formatRidToName(data) {
				var result = [];
				if(data){
					var arr = data.split(',');
					if(arr && arr.length > 0){
						arr.forEach(function (item) {
							if(userRoleMap[item]){
								result.push(userRoleMap[item].name);
							}
						})
					}
				}

				return result.join(',');
			}

			getRole().then(function (data) {
				loadSearchTableData();
			})
			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			function loadSearchTableData() {
				app.common.ajaxWithAfa({
					url:'UnSensitivityAction_getAll.do'
				}).done(function (data) {
					$searchTable.clear();
					var result = data.result;
					dataLen = result.length;
					fieldDescription = [];
					if(result && dataLen > 0){
						result.forEach(function (item, index) {
							item.index = index+1;
							fieldDescription.push(item.description);
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
	                sContent:'确定删除该条记录？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	app.common.ajaxWithAfa({
	                		url:'UnSensitivityAction_delById.do',
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
				loadSearchTableData();
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
				dataArr[3] = $(inputArr[3]).attr('data-rid');
				var thisField = tr && tr.description;
				if(isDescriptionRepeat(dataArr[0], thisField)){
					app.alert('规则名称重复');
					return;
				}
				if(tr){
					savefield('修改',{
						id:tr.id,
						description:dataArr[0],
						regex:dataArr[1],
						replaced:dataArr[2],
						rids:dataArr[3].split(',')
					})
				}else{
					savefield('新增',{
						description:dataArr[0],
						regex:dataArr[1],
						replaced:dataArr[2],
						rids:dataArr[3].split(',')
					})
				}
			})

			$('.DConfig-btnGroup', $el).on('click', '.addBtn', function(event) {
				if(!$(this).hasClass("disabled")){
					event.preventDefault();
					initLine(dataLen);
					dataLen++;
					$(this).addClass("disabled");
					$('.link-del,.link-edit', $el).addClass('disabled');
				}
			});

			function initLine(lineIndex, rowData) {
				lineIndex = lineIndex||0;
				var htmlString= //'<td>'+(lineIndex+1)+'</td>'+
								'<td><input type="text" /></td>' +
								'<td><input type="text" /></td>' +
								'<td>'+
									'<input type="text" />'+
								'</td>' +
								'<td><input type="text" class="roles" readonly/></td>'+
								'<td><span class="link-save fa fa-save" title="保存"></span><span class="link-cancel fa fa-reply" title="取消"></span></td>';
				if(rowData){
					var $obj = $('#searchTable tbody>tr:eq('+lineIndex+')', $el);
					$obj.html(htmlString);
					var inputArr = $obj.find('input,select');
					$(inputArr[0]).val(rowData.description);
					$(inputArr[1]).val(rowData.regex);
					$(inputArr[2]).val(rowData.replaced);
					$(inputArr[3]).val(formatRidToName(rowData.rids));
					$(inputArr[3]).attr('data-rid', rowData.rids);
				}else{
					htmlString = '<tr role="row" >'+htmlString+'</tr>';

					var $obj = $(htmlString);
					$('#searchTable tbody', $el).prepend($obj);
					var inputArr = $obj.find('input,select');
					$(inputArr[2]).val('********');
				}
			}

			function savefield(title, data) {
				if(title == '修改'){
					var url = 'UnSensitivityAction_update.do';
				}else if(title == '新增'){
					var url = 'UnSensitivityAction_add.do';
				}
				app.common.ajaxWithAfa({
					url:url,
					data:data
				}).done(function (data) {
					if(data.result){
						app.alert(title+'成功');
						loadSearchTableData();
						$(".addBtn", $el).removeClass("disabled");
					}
				})
			}

			$('#searchTable', $el).on('click', '.roles', function(event) {
				var data = $searchTable.row($(this).parents('tr')).data();
				if(data){
					showModal($.trim(data.rids));
				}else{
					showModal();
				}
			});
			
			function getRole() {
				return app.common.ajaxWithAfa({
					url:'RoleManageAction_getAllRole.do'
				}).done(function (data) {
					if(data.list && data.list.length > 0){
						userRole = data.list;
						userRoleMap = {};
						userRole.forEach(function (item) {
							userRoleMap[item.rid] = item;
						})
						return $.Deferred().resolve(data.list);
					}
				})
			}

			function showModal(data) {
				var ids = [];
				if(data){
					ids = data.split(',');
				}
				$('#roleList', $el).html(formatRoleListHtml(userRole,ids));

				$('#modal', $el).modal('show');
			}

			function formatRoleListHtml(data, ids) {
				var html = '';
				if(data && data.length > 0){
					data.forEach(function (item) {
						if(item.rid && ids.indexOf(item.rid+'')>=0){
							html +='<li data-rid="'+item.rid+'" class="active">\
								<div class="role">'+item.name+'</div>\
								<div class="dec">'+item.descp+'</div>\
							</li>';
						}else{
							html +='<li data-rid="'+item.rid+'">\
								<div class="role">'+item.name+'</div>\
								<div class="dec">'+item.descp+'</div>\
							</li>';
						}
						
					})
				}
				return html;
			}

			$('#modal', $el).on('click', 'li', function(event) {
				$(this).toggleClass('active');
			}).on('click', '.confirmBtn', function(event) {
				var $lis = $('#roleList li.active', $el);
				var val = [];
				var name = [];
				if($lis.length > 0){
					 $lis.each(function(index, el) {
					 	name.push($(this).find('.role').text().trim());
					 	val.push($(this).attr('data-rid'));
					 });
				}

				$('#searchTable input.roles', $el).val(name.join(','));
				$('#searchTable input.roles', $el).attr('data-rid',val.join(','));
				
				$('#modal', $el).modal('hide');
			});

			function isDescriptionRepeat(field, activeName) {
				var index = fieldDescription.indexOf(field);
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
