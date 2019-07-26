define(["jquery"],function($){
	return {
		load:function($el,scope,handler){
			var ruleTemplate = '<div class="control-group dataInsert-mergerCondition">\
						<p>合并条件1</p>\
						<label for="" class="control-label required">合并方式</label>\
						<div class="controls">\
							<select name="mergerFlag" id="">\
								<option value="1">日志行关键字标志</option>\
								<option value="2">日志开始结束标志</option>\
							</select>\
							<div class="dataInsert-keyFlag">\
								<input type="text" id="" placeholder="规则" autocomplete="off" />\
							</div>\
							<div class="dataInsert-startEndFlag">\
								<input type="text" id="" placeholder="开始" autocomplete="off" />\
								<input type="text" id="" placeholder="结束" autocomplete="off" />\
							</div>\
							<button type="button" class="cancelBtn">取消</button>\
						</div>\
					</div>';

			//切换合并方式
			$('#mergerWrap',$el).on('change','[name="mergerFlag"]',function(){
				var val = $(this).val();
				var $ele = $(this).closest('.dataInsert-mergerCondition');
				if(val == '1'){
					$('.dataInsert-keyFlag',$ele).show();
					$('.dataInsert-startEndFlag',$ele).hide();
				}else{
					
					$('.dataInsert-keyFlag',$ele).hide();
					$('.dataInsert-startEndFlag',$ele).css('display','flex');
				}
			}).on('click','.cancelBtn',function(){
				$(this).closest('.dataInsert-mergerCondition').remove();
				$('#mergerWrap>div',$el).each(function(index,item){
					$(item).find('p').text('合并条件'+(index+1));
				})
			});
			//点击添加规则
			$("#addMergerType",$el).click(function(){
				$('#mergerWrap',$el).append(ruleTemplate);
				$('#mergerWrap>div:last-child>p',$el).text('合并条件'+$('#mergerWrap>div',$el).length);
			});
			$('.dataInsert-ruleCheckBox',$el).change(function(){
				if($(this).attr('checked')=='checked'){
					$(this).prev().attr('disabled','disabled').val('');
				}else{
					$(this).prev().removeAttr('disabled');
				}
			});

			$('#rowRule,#rowLevelRule,#rowDateRule,#rowTimeRule',$el).on('click',function(e){
				e.stopPropagation();
				$('.dataInsert-inputDiv',$el).hide();
				$(this).next('div').css('display','flex');
			});
			$('.dataInsert-inputDiv',$el).on('click','span',function(e){
				e.stopPropagation();
				$(this).parent().prev().val($(this).text());
				$(this).parent().hide();
			});
			$el.click(function(){
				$('.dataInsert-inputDiv',$el).hide();
			});

			//切换解析方式
			$("#analyzeMethod",$el).change(function(){
				var val = $(this).find('option:selected').attr('data-Type');
			});
			//添加解析方式
			$("#addAnalyzeMethod",$el).click(function(){
				var val =$("#analyzeMethod",$el).find('option:selected').attr('data-Type');
				$('#'+val+'Modal').modal('show');
			});


			//切换截取函数/数据截取方式
			$("#cutString,#dataCutType",$el).change(function(){
				var val = $(this).find('option:selected').attr('data-Type');
				$('#'+val,$el).css('display','flex').siblings('div').hide();
			});
			//切换数据来源
			$("#dataSource",$el).change(function(){
				var dataType = $(this).find('option:selected').attr('data-Type');
				if(dataType=='@日志内容'){
					$("#dataFilterDiv",$el).show();
					$("#dataFilterSelect,#dataFilterInput",$el).val('');
				}else{
					$("#dataFilterDiv",$el).hide();
				}
			});

			//XML  点击确定 保存字段
			$("#XMLModal",$el).on('click','.confirm',function(){
				var regExpress = $("#regExpress",$el).val();
				var regName = $("#regName",$el).val();
				var regDesc = $("#regDesc",$el).val();
				var regType = $("#regType",$el).find('option:selected').text();
				var regTypeVal = $("#regType",$el).val();
				if($(this).attr('data-flag')=='edit'){
					$("#regTable>tbody>tr",$el).eq($(this).attr('data-editRow')).replaceWith('<tr><td>'+regName+'</td><td>'+regDesc+'</td><td>'+regExpress+'</td><td data-regType="'+regTypeVal+'">'+regType+'</td><td><a href="#" class="edit">编辑</a><a href="#" class="delete">删除</a></td></tr>')
				}else{
					$("#regTable>tbody",$el).append('<tr><td>'+regName+'</td><td>'+regDesc+'</td><td>'+regExpress+'</td><td data-regType="'+regTypeVal+'">'+regType+'</td><td><a href="#" class="edit">编辑</a><a href="#" class="delete">删除</a></td></tr>')
				}
				$('.cancel',$("#regExpressionModal",$el)).click();
			}).on('click','.delete',function(){
				$(this).closest('tr').remove();
				$('.cancel',$("#regExpressionModal",$el)).click();
			}).on('click','.edit',function(){
				$('.cancel',$("#regExpressionModal",$el)).click();
				$('.confirm',$("#regExpressionModal",$el)).attr('data-flag','edit').attr('data-editRow',$(this).closest('tr').index());
				var tds = $(this).closest('tr').find('td');
				var regName = $(tds[0]).text();
				var regDesc = $(tds[1]).text();
				var regExpress = $(tds[2]).text();
				var regType = $(tds[3]).attr('data-regType');
				$('#regExpress',$("#regExpressionModal",$el)).val(regExpress);
				$('#regName',$("#regExpressionModal",$el)).val(regName);
				$('#regDesc',$("#regExpressionModal",$el)).val(regDesc);
				$('#regType',$("#regExpressionModal",$el)).val(regType);
			}).on('click','.cancel',function(){
				$(this).prev().removeAttr('data-flag').removeAttr('data-editRow');
				$("#regExpressionModal",$el).find('input,select,textarea').val('');
			});
			
			//正则表达式  点击确定 保存字段
			$("#regExpressionModal",$el).on('click','.confirm',function(){
				var regExpress = $("#regExpress",$el).val();
				var regName = $("#regName",$el).val();
				var regDesc = $("#regDesc",$el).val();
				var regType = $("#regType",$el).find('option:selected').text();
				var regTypeVal = $("#regType",$el).val();
				if($(this).attr('data-flag')=='edit'){
					$("#regTable>tbody>tr",$el).eq($(this).attr('data-editRow')).replaceWith('<tr><td>'+regName+'</td><td>'+regDesc+'</td><td>'+regExpress+'</td><td data-regType="'+regTypeVal+'">'+regType+'</td><td><a href="#" class="edit">编辑</a><a href="#" class="delete">删除</a></td></tr>')
				}else{
					$("#regTable>tbody",$el).append('<tr><td>'+regName+'</td><td>'+regDesc+'</td><td>'+regExpress+'</td><td data-regType="'+regTypeVal+'">'+regType+'</td><td><a href="#" class="edit">编辑</a><a href="#" class="delete">删除</a></td></tr>')
				}
				$('.cancel',$("#regExpressionModal",$el)).click();
			}).on('click','.delete',function(){
				$(this).closest('tr').remove();
				$('.cancel',$("#regExpressionModal",$el)).click();
			}).on('click','.edit',function(){
				$('.cancel',$("#regExpressionModal",$el)).click();
				$('.confirm',$("#regExpressionModal",$el)).attr('data-flag','edit').attr('data-editRow',$(this).closest('tr').index());
				var tds = $(this).closest('tr').find('td');
				var regName = $(tds[0]).text();
				var regDesc = $(tds[1]).text();
				var regExpress = $(tds[2]).text();
				var regType = $(tds[3]).attr('data-regType');
				$('#regExpress',$("#regExpressionModal",$el)).val(regExpress);
				$('#regName',$("#regExpressionModal",$el)).val(regName);
				$('#regDesc',$("#regExpressionModal",$el)).val(regDesc);
				$('#regType',$("#regExpressionModal",$el)).val(regType);
			}).on('click','.cancel',function(){
				$(this).prev().removeAttr('data-flag').removeAttr('data-editRow');
				$("#regExpressionModal",$el).find('input,select,textarea').val('');
			}).on('click','.confirmBtn',function(){
				var index = $('#ruleConfirm>div',$el).length+1;
				var $temp = $('<div>\
						<p>\
							<i class="fa fa-caret-right"></i>\
							<span>'+index+'</span>\
							<span>【正则表达式解析方式】</span>\
							<i class="fa fa-times-circle" aria-hidden="true"></i>\
						</p>\
					</div>');
				var $table = $('#regTable',$("#regExpressionModal",$el)).clone('true');
				$table.removeAttr('id').find('tr>*:last-child').hide();
				$temp.append($table.prop("outerHTML"));
				$('#ruleConfirm',$el).append($temp);
				$("#regExpressionModal",$el).modal('hide');
			});;
			
			//字符串函数  点击确定 保存字段
			$("#stringFnModal",$el).on('click','.confirm',function(){
				var cutFnVal = $("#cutString",$el).val();//保存截取函数类型
				var cutText1,cutText2;//保存截取函数的值
				var descText = '截取函数: '+$("#cutString",$el).find('option:selected').text();
				$("#cutString",$el).parent().siblings('div').each(function(index,item){
					if($(item).css('display')!='none'){
						var span1 = $(item).find('span:eq(0)');
						var span2 = $(item).find('span:eq(1)');
						cutText1 = span1.find('input').val();
						cutText2 = span2.find('input').val();
						descText += span1.attr('data-title')+':'+span1.find('input').val();
						descText += span2.attr('data-title')+':'+span2.find('input').val();
						span1.find('input').val('');
						span2.find('input').val('');
					}
				});
				var stringName = $("#stringName",$el).val();
				var stringDesc = $("#stringDesc",$el).val();
				var stringType = $("#stringType",$el).find('option:selected').text();
				var stringTypeVal = $("#stringType",$el).val();
				if($(this).attr('data-flag')=='edit'){
					$("#stringRuleTable>tbody>tr",$el).eq($(this).attr('data-editRow')).replaceWith('<tr><td>'+stringName+'</td><td>'+stringDesc+'</td><td data-cutParams="'+cutFnVal+','+cutText1+','+cutText2+'">'+descText+'</td><td data-stringType="'+stringTypeVal+'">'+stringType+'</td><td><a href="#" class="edit">编辑</a><a href="#" class="delete">删除</a></td></tr>');
				}else{
					$("#stringRuleTable>tbody",$el).append('<tr><td>'+stringName+'</td><td>'+stringDesc+'</td><td data-cutParams="'+cutFnVal+','+cutText1+','+cutText2+'">'+descText+'</td><td data-stringType="'+stringTypeVal+'">'+stringType+'</td><td><a href="#" class="edit">编辑</a><a href="#" class="delete">删除</a></td></tr>');
				}
				$('.cancel',$("#stringFnModal",$el)).click();
			}).on('click','.delete',function(){
				$(this).closest('tr').remove();
				$('.cancel',$("#stringFnModal",$el)).click();
			}).on('click','.edit',function(){
				$('.cancel',$("#stringFnModal",$el)).click();
				$('.confirm',$("#stringFnModal",$el)).attr('data-flag','edit').attr('data-editRow',$(this).closest('tr').index());
				var tds = $(this).closest('tr').find('td');
				var stringName = $(tds[0]).text();
				var stringDesc = $(tds[1]).text();
				var stringExpressArr = $(tds[2]).attr('data-cutParams').split(',');
				var stringType = $(tds[3]).attr('data-stringType');
				$('#stringName',$("#stringFnModal",$el)).val(stringName);
				$('#stringDesc',$("#stringFnModal",$el)).val(stringDesc);
				$('#stringType',$("#stringFnModal",$el)).val(stringType);
				$('#cutString',$("#stringFnModal",$el)).val(stringExpressArr[0]).trigger('change');
				$("#cutString",$el).parent().siblings('div').each(function(index,item){
					if($(item).css('display')!='none'){
						var span1 = $(item).find('span:eq(0)');
						var span2 = $(item).find('span:eq(1)');
						span1.find('input').val(stringExpressArr[1]);
						span2.find('input').val(stringExpressArr[2]);
					}
				});
			}).on('click','.cancel',function(){
				$(this).prev().removeAttr('data-flag').removeAttr('data-editRow');
				$("#stringFnModal",$el).find('input,select').val('');
				$('#cutString',$("#stringFnModal",$el)).trigger('change');
			}).on('click','.confirmBtn',function(){
				var index = $('#ruleConfirm>div',$el).length+1;
				var $temp = $('<div>\
						<p>\
							<i class="fa fa-caret-right"></i>\
							<span>'+index+'</span>\
							<span>【字符串函数解析方式】</span>\
							<i class="fa fa-times-circle" aria-hidden="true"></i>\
						</p>\
					</div>');

				var $table = $('#stringRuleTable',$("#stringFnModal",$el)).clone('true');
				$table.removeAttr('id').find('tr>*:last-child').hide();
				$temp.append($table.prop("outerHTML"));
				$('#ruleConfirm',$el).append($temp);
				$("#stringFnModal",$el).modal('hide');
			});

			$("#ruleConfirm",$el).on('click','i.fa-caret-right',function(){//展开
				$(this).toggleClass('fa-caret-right fa-caret-down');
				$(this).parent().next().show();
			}).on('click','i.fa-caret-down',function(){//展开
				$(this).toggleClass('fa-caret-right fa-caret-down');
				$(this).parent().next().hide();
			}).on('click','i.fa-times-circle',function(){//删除
				$(this).closest('div').remove();
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