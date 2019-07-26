define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			var curStep = 1, 	// 公共变量 第几步
				collect_type_Dict={"0":"交易采集","1":"命令采集","2":"SQL采集"},
				unitHTML="<option>%</option><option>个</option><option>条</option>"
				+"<option>Byte</option><option>Kb</option><option>Mb</option><option>Gb</option>"
				+"<option>次</option>"
				+"<option>毫秒</option><option>秒</option><option>分</option><option>小时</option>" 
				+"<option>天</option><option>周</option><option>月</option><option>年</option>";
			
			var $dataTable = $('#dataTable',$el).DataTable({
				'bStateSave': false,
				"bAutoWidth": false,// 自动宽度
				"ordering": true,
				'searching' : true,
				"bPaginate": true,
				'pageLength': 15,
				'pagingType': 'full_numbers',
				'columns':[{
					data:'index',defaultContent:''
				},{
					data:'kpiset_class_1',defaultContent:''
				},{
					data:'c_name',defaultContent:''
				},{
					data:'e_name',defaultContent:''
				},
//				{
//					data:'kpiset_desc',defaultContent:''
//				},
				{
					data:'collect_type',defaultContent:''
				},{
					data:'collect_inteval',defaultContent:''
				}],
				'aoColumnDefs' : [
					{
	                    "render": function(data, type, row, meta) {
	                       return row.kpiset_class_1+"/"+row.kpiset_class_2+"/"+row.kpiset_class_3;
	                    },
	                    "targets": 1
					},{
	                    "render": function(data, type, row, meta) {
		                       return collect_type_Dict[data];
		                    },
		                    "targets": 4
						}
				],
			});
			
			// 克隆Step3初始化行元素
			var basicStep3HTML="<tr>"
							+"<td>1</td>"
							+"<td><input id='c_name' type='text' /><span class='help-inline hide'></span></td>"
							+"<td><input id='e_name' type='text' /><span class='help-inline hide'></span></td>"
							+"<td><select id='unit'></select><span class='help-inline hide'></span></td>"
							+"<td>"
							+"	<button id='rowSave' type='button'>保存</button>"
							+"	<button id='rowCancel' type='button'>取消</button>"
							+"</td>"
							+"</tr>";
			var doneStep3HTML="<tr>"
							+"<td></td>"
							+"<td></td>"
							+"<td></td>"
							+"<td></td>"
							+"<td>"
							+"	<i id='rowEdit' class='fa fa-edit'></i>"
							+"	<i id='rowDelete' class='fa fa-trash'></i>"
							+"</td>"
							+"</tr>";
			
			$("#step_3 #unit",$el).append($(unitHTML));
			
			$("#step_1 #collect_type",$el).append("<option></option>"
					+"<option value='0'>交易采集</option>"
					+"<option value='1'>命令采集</option>"
					+"<option value='2'>SQL易采集</option>");
			
			$("#step_2 #d_type",$el).append("<option></option>"
					+"<option>ORACLE</option>"
					+"<option>DB2</option>"
					+"<option>MYSQL</option>");
			
			queryKPISet();
			
			// 查询自定义指标集
			function queryKPISet(){
				var argsData={"username":"admin"};
				app.shelter.show();
				app.common.ajaxWithAfa({
					url:'AFARequestAction_callAfaApp.do',
					data:{"appType":"APP_CONF",
						"target":"MyKpiSetInfo",
						"args":JSON.stringify(argsData)}
				}).done(function(data){
					app.shelter.hide();
					$dataTable.clear();
					var rspData=data.result.private;
					$("#editBtn,#delBtn,#detailBtn",$el).addClass("disabled").attr("disabled",true);
					if(rspData && rspData.length>0){
						rspData.forEach(function(row,index){
							row.index = ++index;
						});
						$dataTable.rows.add(rspData).draw();
						rowClick();
						$('#dataTable tbody tr:first-child',$el).click();
					}
				});
			}
			
			function rowClick(){
				$('#dataTable',$el).on('click','tbody>tr',function(e){
					$('#dataTable tbody tr',$el).removeClass("selected");
					$(this).addClass("selected");
					$("#editBtn,#delBtn,#detailBtn",$el).removeClass("disabled").removeAttr("disabled");
					
					var tr = $dataTable.row(this).data();
					if(tr == undefined){return;}
					var argsData={"kpiset_id":tr.kpiset_id};
					app.common.ajaxWithAfa({
						url:'AFARequestAction_callAfaApp.do',
						data:{"appType":"APP_CONF",
							"target":"ItemInfo",
							"args":JSON.stringify(argsData)}
					}).done(function(data){
						$(".myKPISet-kpi-body",$el).empty();
						var rspData=data.result.private;
						if(rspData && rspData.length>0){
							var appendHTML="";
							rspData.forEach(function(row,index){
								appendHTML+="<li><span>"+row.kpi_ename+"</span><span>"
								+row.kpi_cname+"</span><span>"+row.kpi_unit+"</span></li>";
							});
							$(".myKPISet-kpi-body",$el).append($(appendHTML));
						}
					});
					
				});
			}
			
			// 新增
			$(".myKPISet-absolute #addBtn", $el).on('click', function(){
				$("#myModalLabel",$el).text("新增指标集");
				$(".myKPISet-stepBar",$el).removeClass("hide");
				$(".myKPISet-stepBar>li:eq(1)", $el).removeClass("done");
				$(".myKPISet-stepBar>li:eq(2)", $el).removeClass("done");
				$("#nextStepBtn", $el).text("下一步");
				$("#prevStepBtn", $el).addClass('hide');
				curStep = 1;	// 初始化所有数据
				$("#step_"+curStep, $el).removeClass("hide").siblings().addClass("hide");
				$("form input,select,textarea",$el).removeAttr("disabled");
				clearModalData();
//				$("#step_3 tbody .addBtn",$el).attr("disabled",false).removeClass("disabled");
				$("#step_3 tbody .addBtn",$el).closest("tr").removeClass("hide");
				$("#step_1 #collect_type",$el).val('2').attr("disabled",true);
				addRowClick();
				$("#addModal", $el).modal('show');	// 显示模态框
				
			});
			
			// 修改
			$(".myKPISet-absolute #editBtn",$el).on('click',function(){
				
				$("#myModalLabel",$el).text("修改指标集");
				$("#prevStepBtn", $el).removeClass('hide');
				$("#nextStepBtn", $el).text("保存");
				$("#prevStepBtn", $el).text("取消");
				initEditModal();
				clearModalData();
				$("form input,select,textarea",$el).removeAttr("disabled");
				$("#step_1 #collect_type",$el).val('2').attr("disabled",true);
//				$("#step_3 tbody .addBtn",$el).attr("disabled",false).removeClass("disabled");
				$("#step_3 tbody .addBtn",$el).closest("tr").removeClass("hide");
				$("#addModal", $el).modal('show');	// 显示模态框
				
				// 回显信息
				queryKPISetDetail();
				addRowClick();
				
			});
			
			// 明细
			$(".myKPISet-absolute #detailBtn",$el).on('click',function(){
				$("#myModalLabel",$el).text("查看指标集");
				$("#nextStepBtn", $el).text("关闭");
				$("#prevStepBtn", $el).addClass('hide');
				initEditModal();
				clearModalData();
				$("form input,select,textarea",$el).attr("disabled",true);
				$("#addModal", $el).modal('show');	// 显示模态框
				
				// 回显信息
				queryKPISetDetail();
			});
			
			// 删除
			$(".myKPISet-absolute #delBtn",$el).on('click',function(){
				app.confirmDialog({
					sTitle:"询问提示",  //确认框标题         
	                sType:"search",  
	                sContent:'确定要删除选中数据吗？',  //确认框内容，非必填
	                sBtnConfirm: '确定',  
	                sBtnCancel: '取消',  
	                fnConfirmHandler: function(){
	                	var row = $dataTable.row($('#dataTable tbody tr.selected')).data();
	    				if(row == undefined){return;}
	    				var argsData={};
	    				argsData['kpisetid']=row.kpiset_id+"";
	    				app.common.ajaxWithAfa({
	    					url:'AFARequestAction_callAfaApp.do',
	    					data:{"appType":"APP_CONF",
	    						"target":"CollectDelete",
	    						"args":JSON.stringify(argsData)}
	    				}).done(function(data){
	    					var rspData=data.result.public;
	    					if(rspData.errorcode=="000000"){
	    						app.alert("删除成功");
	    						queryKPISet();
	    					}
	    				});
	                }, 
	                fnCancelHandler: function(){
	                	return;
	                },  
	                aArgs: ['提示框']                     //确认、取消触发函数的参数，以数组形式书写
				})
			});
			
			
			function initEditModal(){
				$(".myKPISet-stepBar",$el).addClass("hide");
				$(".myKPISet-stepContent div",$el).removeClass("hide");
				$("#step_1", $el).prepend($("<p>基本信息</p>"));
				$("#step_2", $el).prepend($("<p>数据库信息</p>"));
				$("#step_3", $el).prepend($("<p>定义指标项</p>"));
			}
			
			// 清空Modal数据
			function clearModalData(){
				$("form", $el)[0].reset();
				$("form", $el)[1].reset();
				$("#classify_2",$el).empty();
				$("#classify_3",$el).empty();
				$("#classify_1 li",$el).removeClass("checked");
				$("#step_3 tbody tr :last",$el).prevAll().remove();// 清空所添加的行元素
				$("#step_1>p", $el).remove();
				$("#step_2>p", $el).remove();
				$("#step_3>p", $el).remove();
				$(".myKPISet-choosePanel",$el).addClass("hide");
				validateData(1,true);
				validateData(2,true);
			}
			
			// 查询指标集明细数据
			function queryKPISetDetail(){
				var row = $dataTable.row($('#dataTable tbody tr.selected')).data(),
					argsData={};
				
				if(row == undefined){
					return;
				}
				
				argsData['kpisetid']=row.kpiset_id+"";
				app.shelter.show();
				app.common.ajaxWithAfa({
					url:'AFARequestAction_callAfaApp.do',
					data:{"appType":"APP_CONF",
						"target":"CollectConDetail",
						"args":JSON.stringify(argsData)}
				}).done(function(data){
					app.shelter.hide();
					var rspData=data.result.private;
					if(rspData){
						$("#step_1 #collect_type",$el).val(rspData.main.ctype);
						$("#step_1 #classify",$el).val(rspData.main.class1+"/"+rspData.main.class2+"/"+rspData.main.class3);
						$("#step_1 #name",$el).val(rspData.main.cname);
						$("#step_1 #ename",$el).val(rspData.main.ename);
						$("#step_1 #collect_rate",$el).val(rspData.main.cinterval);
						$("#step_2 #d_type",$el).val(rspData.main.dtype);
						$("#step_2 #visit_address",$el).val(rspData.main.url);
						$("#step_2 #username",$el).val(rspData.main.name);
						$("#step_2 #password",$el).val(rspData.main.passwd);
						$("#step_2 #sql",$el).val(rspData.main.ssql);

						// 获取指标信息数据
						var appendHTML="";
						rspData.items.forEach(function(row,index){
							appendHTML+="<tr>"
									   +"	<td>"+(index+1)+"</td>"
									   +"	<td>"+row.ccname+"</td>"
									   +"	<td>"+row.cename+"</td>"
									   +"	<td>"+row.unit+"</td>"
									   +"	<td><i id='rowEdit' class='fa fa-edit'></i>" 
									   +"		<i id='rowDelete' class='fa fa-trash'></i>" 
									   +"	</td>"
									   +"</tr>";
						});
						$("#step_3 tbody",$el).prepend($(appendHTML));
						if($("#myModalLabel",$el).text()=='查看指标集'){
//							$("#step_3 tbody .addBtn",$el).attr("disabled",true).addClass("disabled");
							$("#step_3 tbody .addBtn",$el).closest("tr").addClass("hide");
							$("#step_3 tbody i",$el).addClass('hide');
						}else{
							rowEditClick();
							rowDeleteClick();
						}
					}
				});
			}
			
			
			
			// 上一步/取消
			$("#prevStepBtn", $el).on('click', function(){
				if($(this).text()=="取消"){
					$("#addModal", $el).modal('hide');
					return;
				}
				if(curStep > 1){
					$(".myKPISet-stepBar", $el).find('li[data-step="'+ curStep +'"]').removeClass("done");
					$("#nextStepBtn", $el).text("下一步");
					curStep--;
					$("#step_"+curStep, $el).removeClass("hide").siblings().addClass("hide");
					if(curStep == 1){
						$("#prevStepBtn", $el).addClass('hide');
					}
				}else{
					
				}
			});
			// 下一步/保存/关闭
			$("#nextStepBtn", $el).on('click', function(){
				
				if($(this).text()=="关闭" ){
					$("#addModal", $el).modal('hide');
					return;
				}
				if($(this).text()== '下一步'){
					// 检查表单必输元素
					if(!validateData(curStep,false)){
	    				return;
	    			}
					curStep++;
					$(".myKPISet-stepBar", $el).find('li[data-step="'+ curStep +'"]').addClass("done");
					$("#step_"+curStep, $el).removeClass("hide").siblings().addClass("hide");
					$("#prevStepBtn", $el).removeClass('hide');
					if(curStep == 3){
						$("#nextStepBtn", $el).text("完成");
					}
				}else{
					// 完成新增/保存修改指标集
					var target="CollectSave",
						kpiset_id="";
					
					// 1.组织通讯包数据
					var argsData={},
						main={},
						define={},
						types={},
						items=[];
					
					if($(this).text()=="保存" ){
						target="CollectModify";
						kpiset_id=$dataTable.row().data().kpiset_id;
						// 检查元素
						if(!validateData(1,false) && !validateData(2,false)){
		    				return;
		    			}
					}
					if($("#step_3 tbody #rowSave").length>0){
						app.alert("存在未保存行，请先保存");
						return;
					}
					
					var classAll=$("#step_1 #classify",$el).val(),
						classAry=classAll.split("/");
					
					define['KPISet_Class_1'] = classAry[0];
					define['KPISet_Class_2'] = classAry[1];
					define['KPISet_Class_3'] = classAry[2];
					define['C_NAME']=$("#step_1 #name",$el).val();
					define['E_NAME']=$("#step_1 #ename",$el).val();
					define['Collect_inteval']=parseInt($("#step_1 #collect_rate",$el).val());
					define['Collect_Type']=$("#step_1 #collect_type",$el).val();
					types['Db_Type']=$("#step_2 #d_type",$el).val();
					types['URL']=$("#step_2 #visit_address",$el).val();
					types['Db_UserName']=$("#step_2 #username",$el).val();
					types['Db_Passwd']=$("#step_2 #password",$el).val();
					types['DB_SQL']=$("#step_2 #sql",$el).val();
					
					main['define']=define;
					main['types']=types;
					
					for(var i=0; i<$("#step_3 tbody tr").length-1; i++){
						var $tmpRowData=$("#step_3 tbody tr").eq(i);
						var objTmp={};
						objTmp['C_Name']=$tmpRowData.children(":eq(1)").text();
						objTmp['E_Name']=$tmpRowData.children(":eq(2)").text();
						objTmp['KPI_Store_unit']=$tmpRowData.children(":eq(3)").text();
						items.push(objTmp);
					}
					
					argsData['main']=main;
					argsData['items']=items;
					argsData['kpisetid']=kpiset_id+"";
					
					app.shelter.show();

					// 2.通讯
					app.common.ajaxWithAfa({
						url:'AFARequestAction_callAfaApp.do',
						shelter: '正在保存数据，请稍候…',
						data:{"appType":"APP_CONF",
							"target":target,
							"args":JSON.stringify(argsData)}
					}).done(function(data){
						app.shelter.hide();
						var rspData=data.result.private;
						app.alert("保存成功");
//						// 3.刷新列表
						$("#addModal", $el).modal('hide');
						queryKPISet();
						
					});
				}
			});
			
			// 初始化 一级分类
			initClassify_1();
			function initClassify_1(){
				var paramData={};
				querySort(paramData);
			}
			
			// 所属分类点击事件
			function classify_1_Click(){
				$("#classify_1 li").on('click',function(){
					$(this).parent().nextAll().empty();// 清空后续分类
					$("#classify_1 li",$el).removeClass("checked");
					$(this).addClass("checked");
					var paramData={};
					paramData['sort1']=$(this).text();
					querySort(paramData);// 查询二级分类
					
				});
			}
			
			function classify_2_Click(){
				$("#classify_2 li",$el).on('click',function(){
					$(this).parent().nextAll().empty();// 清空后续分类
					$("#classify_2 li",$el).removeClass("checked");
					$(this).addClass("checked");
					var paramData={};
					paramData['sort1']=$("#classify_1 li.checked",$el).text();
					paramData['sort2']=$(this).text();
					querySort(paramData);// 查询三级分类
				});
			}
			function classify_3_Click(){
				$("#classify_3 li").on('click',function(){
					$("#classify_3 li",$el).removeClass("checked");
					$(this).addClass("checked");
					$("#step_1 #classify",$el).val($("#classify_1 li.checked",$el).text()
							+"/"+$("#classify_2 li.checked",$el).text()
							+"/"+$(this).text());
					$(".myKPISet-choosePanel",$el).addClass("hide");
				});
			}
			
			$("#step_1 #classify",$el).focus(function(){
				$(".myKPISet-choosePanel",$el).removeClass("hide");
			});
			
			// 查询所属分类
			function querySort(param){
				var argsData={};
				var type="1";
				if(param.sort1 != undefined && param.sort2 != undefined){// 查询三级分类
					argsData['obj_class1']=param.sort1;
					argsData['obj_class2']=param.sort2;
					type="3";
				}else if(param.sort1!=undefined&&param.sort2==undefined){// 查询二级分类
					argsData['obj_class1']=param.sort1;
					type="2";
				}
				app.common.ajaxWithAfa({
					url:'AFARequestAction_callAfaApp.do',
					data:{"appType":"APP_CONF",
						"target":"LinkedItem",
						"args":JSON.stringify(argsData)}
				}).done(function(data){
					var rspData=data.result.private;
					
					if(rspData && rspData.length>0){
						var appendHTML="";
						rspData.forEach(function(row,index){
							appendHTML+="<li>"+row+"</li>";
						});
						$("#classify_"+type,$el).html(appendHTML);
						if(type=="1"){
							classify_1_Click();// 绑定一级分类点击事件
//							$("#classify_1 li:first-child",$el).click();//默认查询二级分类
						}else if(type=="2"){
							classify_2_Click();// 绑定二级分类点击事件
//							$(".myKPISet-choosePanel #classify_2 li:first-child",$el).click();//默认查询三级分类
						}else if(type=="3"){
							classify_3_Click();// 绑定二级分类点击事件
						}
					}
				});
			}
			
			// 表单检查
			function validateData(curStep_tmp,flag){
				var step1_check=[
								{
								   "id": "collect_type",
								   "msg":"采集类型不能为空",
								   "filter": {"require": true}
								},{
								   "id": "classify",
								   "msg":"所属分类不能为空",
								   "filter": {"require": true}
								},{
								   "id": "name",
								   "msg":"中文名称不能为空",
								   "filter": {"require": true}
								},{"id": "ename",
								   "msg":"英文名称不能为空",
								   "filter": {"require": true}
								}
								,{
								   "id": "collect_rate",
								   "msg":"采集频率输入不合法",
								   "filter": {
									   "require" : true,
									   "type" : "number"
									   }
								}
								];
								
				var step2_check=[
								{  "id": "d_type",
								   "msg":"数据库类型不能为空",
								   "filter": {"require": true}
								},
								{"id": "visit_address",
								   "msg":"访问地址不能为空",
								   "filter": {"require": true}
								},{"id": "username",
								   "msg":"用户名不能为空",
								   "filter": {"require": true}
								},{"id": "password",
								   "msg":"密码不能为空",
								   "filter": {"require": true}
								},{"id": "sql",
								   "msg":"SQL语句不能为空",
								   "filter": {"require": true}
								}];
				var validateResult = app.validate.validate({
				    "$context": $("#step_"+curStep_tmp+" form", $el),
				    "data": curStep_tmp==1?step1_check:step2_check,
				    "correctCallback": function ($ele, correctMsg) {
				    	$ele.next().addClass('hide');
				    },
				    "errorCallback": function ($ele, errMsg) {
				    	if(flag && flag==true){
				    		$ele.next().addClass('hide');
				    	}else{
				    		$ele.next().removeClass('hide').text(errMsg);
				    	}
				    }
				});
				return validateResult.bResult;
			}
			
			// Step3 添加行元素
			function addRowClick(){
				$("#step_3 tbody .addBtn",$el).off('click');
				$("#step_3 tbody .addBtn",$el).on('click',function(){
					// 检查行编辑事件
					if($("#step_3 tbody #rowSave",$el).length>0){
						app.alert("存在未保存行，请先保存");
						return;
					}
					$editRow = undefined;
					// 添加默认行
					var $basicStep3=$(basicStep3HTML);
					$basicStep3.children(":first").text($("#step_3 tbody tr").length);// 设置序号
					$basicStep3.find("select").append($(unitHTML));// 初始化下拉框
					$(this).closest("tr").before($basicStep3);
					rowSaveClick();
					rowCancelClick();
				});
			}
			
			var $editRow;
			
			function rowEditClick(){// 编辑行
				$("#step_3 tbody .fa-edit").on('click',function(){
					if($("#step_3 tbody #rowSave",$el).length>0){
						app.alert("存在未保存行，请先保存");
						return;
					}
					$editRow=$(this).closest("tr").clone();
					var $basicRow=$(basicStep3HTML);
					$basicRow.find("#unit").append($(unitHTML));
					$basicRow.children(":first").text($editRow.children(":first").text());
					$basicRow.find("#c_name").val($editRow.children(":eq(1)").text());
					$basicRow.find("#e_name").val($editRow.children(":eq(2)").text());
					$basicRow.find("#unit").val($editRow.children(":eq(3)").text());
					$(this).closest("tr").before($basicRow);
					$(this).closest("tr").remove();
					
					rowSaveClick();
					rowCancelClick();
					
				});
			}
			
			function rowDeleteClick(){// 删除行
				$("#step_3 tbody .fa-trash").on('click',function(){
					var col_num=$(this).closest("tr").children(":first").text();// 获取序号
					var $nextAll=$(this).closest("tr").nextAll();
					console.log($nextAll);
					for(var i=0;i<$nextAll.length-1;i++){
						$nextAll.eq(i).children(":first").text(col_num);
						col_num++;
					}
					$(this).closest("tr").remove();
				});
			}
			
			function rowSaveClick(){// 保存编辑行
				$("#step_3 tbody #rowSave").on('click',function(){
					
					// 检查行元素
					if(!editRowValidate($(this).closest("tr"))){
						return;
					};
					// 行编辑结束
					$tmpRow=$(this).closest("tr");
					if($editRow == undefined){
						$editRow=$(doneStep3HTML); 
					}
					$editRow.children(":first").text($tmpRow.children(":first").text());
					$editRow.children(":eq(1)").text($tmpRow.find("#c_name").val());
					$editRow.children(":eq(2)").text($tmpRow.find("#e_name").val());
					$editRow.children(":eq(3)").text($tmpRow.find("#unit").val());
					$(this).closest("tr").before($editRow);
					$(this).closest("tr").remove();
					rowEditClick();
					rowDeleteClick();
				});
			}
			
			function rowCancelClick(){// 取消编辑行
				$("#step_3 tbody #rowCancel").on('click',function(){// 取消编辑行
					if($editRow!=undefined){// 检查行元素
						$(this).closest("tr").before($editRow);
					}
					$(this).closest("tr").remove();
					rowEditClick();
					rowDeleteClick();
				});
			}
			
			function editRowValidate($element){
				var validateResult=app.validate.validate({
				    "$context": $element,
				    "data": [
				        {
				            "id": "c_name",
				            "msg":"指标项中文名称不能为空",
				            "filter": {
				                "require": true
				            }
				        },{
				            "id": "e_name",
				            "msg":"指标项英文名称不能为空",
				            "filter": {
				                "require": true
				            }
				        },{
				            "id": "unit",
				            "msg":"单位不能为空",
				            "filter": {
				                "require": true
				            }
				        }
				    ],
				    "correctCallback": function ($ele, correctMsg) {
				    	$ele.next().addClass('hide');
				    },
				    "errorCallback": function ($ele, errMsg) {
				    	app.alert(errMsg);
				    }
				});
				return validateResult.bResult;;
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