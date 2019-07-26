define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			var $dataTable = $("#dataTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'columns':[{
					data:'index',defaultContent:''
				},{
					data:'appId',defaultContent:''
				},{
					data:'hostIp',defaultContent:''
				},{
					data:'logFile',defaultContent:''
				},{
					data:'source',defaultContent:''
				},{
					data:'tranKeys',defaultContent:''
				},{
					data:'tranDesc',defaultContent:''
				},{
					data:'',defaultContent:''//操作
				},{
					data:'id',defaultContent:''
				}],
				'aoColumnDefs':[{
					'render':function(data,type,row,meta){
						if(data== 0){
							return '配置'
						}else if(data == 1){
							return '智能分析'
						}
					},
					'targets':4
				},{
					'render':function(data,type,row,meta){
						return '<i title="修改" class="fa fa-edit" style="cursor: pointer;color:var(--color-theme);"></i>&nbsp;&nbsp;&nbsp;<i style="cursor: pointer;color:var(--color-theme);" title="删除" class="fa fa-trash"></i>'
					},
					'targets':7
				},{
					'render':function(data,type,row,meta){
						return appNameById(data);
					},
					'targets':1
				},{ "visible": false, "targets":8 }],
			});

			// map用于校验“文件”的名称在新增时 不能与现有的重复
			var testUniquenessName;

			
			function loadTable(){
				$dataTable.clear().draw();
				app.common.ajaxWithAfa({
					url: "LogTranKeysAction_getAll.do",
					data: {},
				}).done(function(content) {
					if(content.result && content.result.length > 0){
						content.result = content.result.map(function(item,index){
							item.index=index+1;
							return item;
						})
						$dataTable.rows.add(content.result).draw();
					}
				})
			}
			
			var addOrEditFlag;
			$('#addBtn', $el).click(function(e){
				e.stopPropagation();
				$('#modal',$el).css('transform', 'translateX(0)');
				$('#modal',$el).attr("data-id",'');
				$('#modal',$el)[0].reset();
				$('#cleanName', $el).removeAttr('disabled');
				$('#bakType', $el).trigger('change');
				$('.help-inline', $('#modal',$el)).remove();
				addOrEditFlag = "add";
				$('input,select,textarea',$('#modal',$el)).removeAttr('disabled');
			});

			$el.click(function(){
				$('#modal button.cancelBtn',$el).trigger('click');
			});

			$('#modal',$el).on('click',function(e){
				e.stopPropagation();
			}).on('change', '#bakType', function(){//备份方式
				if(this.value == "1"){
					$('#modal',$el).find("#transType").closest(".control-group").addClass('hide');
					$('#modal',$el).find("#address").closest(".control-group").addClass('hide');
					$('#modal',$el).find("#userName").closest(".control-group").addClass('hide');
					$('#modal',$el).find("#passwd").closest(".control-group").addClass('hide');
				}else{
					$('#modal',$el).find("#transType").closest(".control-group").removeClass('hide');
					$('#modal',$el).find("#address").closest(".control-group").removeClass('hide');
					$('#modal',$el).find("#userName").closest(".control-group").removeClass('hide');
					$('#modal',$el).find("#passwd").closest(".control-group").removeClass('hide');
				}
			}).on('click', 'button.cancelBtn', function(){//取消
				$('#modal',$el).removeAttr('style');
			}).on('change', '#dataType', function(){
				if(this.value == "2" && $("#cleanName", $el).val() !='' && testUniqueness($("#cleanName", $el).val())){
					if(!$("#cleanName", $el).next().hasClass('help-inline')){
						$("#cleanName", $el).after(`<span class="help-inline">该策略名称，已存在。</span>`)
					}
				}else if($("#cleanName", $el).val() != ''){
					if($("#cleanName", $el).next().hasClass("help-inline")){
						$("#cleanName", $el).next().remove();
					}
				}

			}).on('blur', '#cleanName', function(){
				if(this.value != "" && $('#dataType', $el).val() == "2" && testUniqueness(this.value)){
					if(!$(this).next().hasClass('help-inline')){
						$(this).after(`<span class="help-inline">该策略名称，已存在。</span>`)
					}
				}else if(this.value == ""){
					if($(this).next().hasClass("help-inline")){
						$(this).next().html("不能为空");
					}else{
						$(this).after('<span class="help-inline">不能为空</span>')
					}
				}else{
					if($(this).next().hasClass("help-inline")){
						$(this).next().remove();
					}
				}
			})/*.on('blur', '#hostIp', function(){
				if(this.value){
					if(!test_IP_Port(this.value)){
						if($(this).next().hasClass("help-inline")){
							$(this).next().html("格式不正确");
						}else{
							$(this).after('<span class="help-inline">格式不正确</span>')
						}
					}else{
						if($(this).next().hasClass("help-inline")){
							$(this).next().remove();
						}
					}
				}else{
					if($(this).next().hasClass("help-inline")){
						$(this).next().html("不能为空");
					}else{
						$(this).after('<span class="help-inline">不能为空</span>')
					}
				}
			})*//*.on('blur', 'input[required]:not(#address,#cleanName)', function(){
				if(this.value == ''){
					if($(this).next().hasClass("help-inline")){
						$(this).next().html("不能为空");
					}else{
						$(this).after('<span class="help-inline">不能为空</span>')
					}
				}else {
					if($(this).next().hasClass("help-inline")){
						$(this).next().remove();
					}
				}
			})*/.on('click', '.confirmBtn', function(){
				var $thisForm = $(this).closest("form");
				var id = $thisForm.attr("data-id");
				var sendData = {
				};
				var url = '';
				if(id){
					url = 'LogTranKeysAction_updateOne.do';
					sendData['id'] = id;
				}else{
					url = 'LogTranKeysAction_addOne.do'
				}

				if(validate($thisForm)){
					var inputs = $thisForm.find('.control-group:not(.hide)').find('select,input,textarea');
					
					inputs.each(function(){
						if ($(this).attr('id') === 'source') {
							sendData[$(this).attr('id')] = parseInt($(this).val());
						} else {
							sendData[$(this).attr('id')] = $(this).val() || '';
						}
					})
					app.common.ajaxWithAfa({
						url: url,
						data: sendData,
					}).done(function(content) {
						if(content.result){
							app.alert("保存成功");
							loadTable();
							$('#modal',$el).removeAttr('style');
						}else{
							app.alert("保存失败");
						}
					});
				}
			});
			
			var Edit_cleanName;
			$("#dataTable",$el).on('click','tbody tr',function(e){
				e.stopPropagation();
				var newForm = $('#modal',$el);
				if(e.target.className == 'fa fa-edit'){
					addOrEditFlag = "edit";
					newForm.removeClass('uneditable');
					$('input,select,textarea',newForm).removeAttr('disabled');
				}else{
					addOrEditFlag = "check";
					newForm.addClass('uneditable');
					$('input,select,textarea',newForm).attr('disabled',true);
				}
				newForm.css('transform', 'translateX(0)');
				var item = $dataTable.row(this).data();
				newForm.attr('data-id',item.id);
				Object.keys(item).forEach(key => {
					if (key === 'index' || key === 'id') {
						
					} else {
						$('#'+key, newForm).val(item[key])
					}
				})
				$('.help-inline', $('#modal',$el)).remove();
				
				Edit_cleanName = item.cleanName;
			})
			.on('click', 'i.fa-trash', function(e){
				e.stopPropagation();
				var item = $dataTable.row($(this).closest('tr')).data();
				app.confirmDialog({//提示框组件
					sTitle:"请确认",  //确认框标题         
	                sType:"search",  //模块类型，有normal，success，search，warn，error,默认为normal常规
	                sContent:'您确定要删除该记录吗？',  //确认框内容，非必填
	                sBtnConfirm: '确定',  //确认按钮显示内容
	                sBtnCancel: '取消',  //却笑按钮显示内容
	                fnConfirmHandler: function(){
	                	app.common.ajaxWithAfa({
							url: "LogTranKeysAction_deleteOne.do",
							data: {
								"id": item.id
							},
						}).done(function(content) {
							if(content.result){
								app.alert("删除成功");
								loadTable();
							}else{
								app.alert("删除失败");
							}
						});
	                }
				})
			})

			function test_IP_Port(ipPort){
		        var pattIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		        return pattIp.test(ipPort);
		    }

			function validate($newForm){
				var inputs = $newForm.find('.control-group:not(.hide)').find('input[required]').trigger('blur');
				if($newForm.find('.help-inline').length > 0){
					return false
				}
				return true;
				// for(let i=0; i<inputs.length; i++){
				// 	if($(inputs[i]).val() == ''){
				// 		flag = false;
				// 		if(!$(inputs[i]).next().hasClass('help-inline')){
				// 			$(inputs[i]).after('<span class="help-inline">不能为空</span>')
				// 		}
				// 	}else if($(inputs[i]).val() != '' && inputs[i].id != "address" && inputs[i].id != "cleanName"){
				// 		if($(inputs[i]).next().hasClass('help-inline')){
				// 			$(inputs[i]).next().remove();
				// 		}
				// 	}
				// }
				// return flag;
			}

			// 唯一检测
			function testUniqueness(cleanName){
				if(addOrEditFlag == "edit" && Edit_cleanName == cleanName){
					return false;
				}
				if(null == testUniquenessName || testUniquenessName.length<=0){
					return false;
				}
				if(cleanName in testUniquenessName){
					return true;
				}
				return false;
			}
			
			getAllApp();
			var allApp = [];
			function getAllApp () {
				app.common.ajaxWithAfa({
					url: 'ESSearchAction_getObjectCategory.do',
					data: {},
				}).done(function(content) {
					var appCate = content.result.app;
					allApp = getCateApp(appCate);
					var h = allApp.map(item => {
						return `<option value="${item.cateId}">${item.cateId}-${item.cateName}</option>`
					})
					h.unshift('<option value=""></option>')
					$("#appId", $el).html(h);
					loadTable()
				});
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
				console.log(app)
				return app;
			}
			
			function appNameById (id) {
				var a = allApp.filter(item =>  {
					if (parseInt(item.cateId) === parseInt(id)) {
						return true;
					}
					return false;
				})
				if (a.length === 0) {
					return '无应用系统'
				} else {
					return a[0].cateName
				}
			}

		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});
