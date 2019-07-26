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
					data:'dataType',defaultContent:''//策略类型
				},{
					data:'cleanName',defaultContent:''//策略名称
				},{
					data:'bakType',defaultContent:''//备份方式
				},{
					data:'achiveDayNum',defaultContent:''//引用次数
				},{
					data:'isClear',defaultContent:''//引用次数
				},{
					data:'isEnable',defaultContent:''//引用次数
				},{
					data:'referenceTimes',defaultContent:''//引用次数
				},{
					data:'createTime',defaultContent:''//创建时间
				},{
					data:'',defaultContent:''//操作
				}],
				'aoColumnDefs':[{
					'render':function(data,type,row,meta){
						if(data== '1'){
							return '存储归档'
						}else if(data == '2'){
							return '文件归档'
						}
					},
					'targets':1
				},{
					'render':function(data,type,row,meta){
						if(data== '1'){
							return '本地文件'
						}else if(data == '2'){
							return '远程服务器'
						}
					},
					'targets':3
				},{
					'render':function(data,type,row,meta){
						return data + "天";
					},
					'targets':4
				},{
					'render':function(data,type,row,meta){
						if(data== '0'){
							return '是'
						}else if(data == '1'){
							return '否'
						}
					},
					'targets':5
				},{
					'render':function(data,type,row,meta){
						if(data== '0'){
							return '启用'
						}else if(data == '1'){
							return '不启用'
						}
					},
					'targets':6
				},{
					'render':function(data,type,row,meta){
						return '<i title="修改" class="fa fa-edit" style="cursor: pointer;color:var(--color-theme);"></i>&nbsp;&nbsp;&nbsp;<i style="cursor: pointer;color:var(--color-theme);" title="删除" class="fa fa-trash"></i>'
					},
					'targets':9
				}]
			});

			// map用于校验“文件”的名称在新增时 不能与现有的重复
			var testUniquenessName;

			loadTable()
			function loadTable(){
				$dataTable.clear().draw();
				app.common.ajaxWithAfa({
					url: "DataCleanAction_getDataCleanByDataType.do",
					data: {
						"dataType": 0
					},
				}).done(function(content) {
					if(content.result && content.result.length > 0){
						testUniquenessName = {};
						content.result.forEach(function(item,index){
							if(item.dataType == "2"){
								testUniquenessName[item.cleanName] = item.cleanName;
							}
							item.index=index+1;
						})
						$dataTable.rows.add(content.result).draw();
					};	
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
			});

			
			var execTimeOption = '';
			for(let i=0; i<24; i++){
				execTimeOption += '<option value="'+ (i<10?'0'+i:i) +':00">'+ (i<10?'0'+i:i) +':00</option>';
			}
			$('#execTime', $el).html(execTimeOption);
			
			$el.click(function(){
				$('#modal button.cancelBtn',$el).trigger('click');
			});
			
			
			$("#ratioCheck",$el).on('change',function(){
				$dataTable.column(1).search($('#ratioCheck', $el).val());
				 $dataTable.draw();
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
			}).on('blur', '#address', function(){
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
			}).on('blur', 'input[required]:not(#address,#cleanName)', function(){
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
			}).on('click', '.confirmBtn', function(){
				var $thisForm = $(this).closest("form");
				var id = $thisForm.attr("data-id");
				var sendData = {
				};
				var url = '';
				if(id){
					url = 'DataCleanAction_updataDataClean.do';
					sendData['id'] = id;
				}else{
					url = 'DataCleanAction_addDataClean.do'
				}

				if(validate($thisForm)){
					var inputs = $thisForm.find('.control-group:not(.hide)').find('select,input');
					
					inputs.each(function(){
						sendData[$(this).attr('id')] = $(this).val();
					})
					app.common.ajaxWithAfa({
						url: url,
						data: {
							"dataCleanStr": JSON.stringify(sendData)
						},
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
				newForm[0].reset();
				newForm.css('transform', 'translateX(0)');
				var item = $dataTable.row(this).data();
				
				Object.keys(item).forEach(k => {
					$('#'+k,newForm).val(item[k]);
				});
				newForm.attr('data-id',item.id);
				$('#bakType', $el).trigger('change');
				$('#cleanName', newForm).attr('disabled','disabled');
				/*$('#dataType', newForm).val(item.dataType);
				$('#bakType', newForm).val(item.bakType).trigger("change");
				$('#packType', newForm).val(item.packType);
				$('#bakDir', newForm).val(item.bakDir);
				$('#transType', newForm).val(item.transType);
				$('#address', newForm).val(item.address);
				$('#userName', newForm).val(item.userName);
				$('#passwd', newForm).val(item.passwd);*/
				$('.help-inline', $('#modal',$el)).remove();
				addOrEditFlag = "edit";
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
							url: "DataCleanAction_delDataClean.do",
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
			}).on('click', '.fa-edit', function(e){
				// 改用行点击事件
				// e.stopPropagation();
				// var $thisForm = $(this).closest("form");
				// var id = $thisForm.attr("data-id");
				// if(!id){
				// 	return;
				// }
				// $thisForm.addClass("editing");
				// $thisForm.find("#edit").addClass("hide");
				// $thisForm.find("#save").removeClass("hide");
			});

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

		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});
