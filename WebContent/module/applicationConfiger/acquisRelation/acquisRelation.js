define([ "jquery" ], function() {

	return {
		load : function($el, scope, handler) {
			
			//获取本地localStroage中的username
			var memory =window.localStorage || (window.UserDataStorage && new UserDataStorage()) || new cookieStroage();
			var userName =memory.getItem("username");
			
			var flag = 0,		//标志  新增保存 1   修改保存 0
				relationId,
				kpiset_def_id,
				app_id,
				obj_id,
				kpiset_id;
			
			var baseTable = {	
				'bAutoWidth' : true,
				'bPaginate' : true,
				'pagingType' : 'full_numbers',
				'bSort' : false,
				'pageLength' : 10,
				'searching' : true,
			}
	
			var $dataTable = $("#dataTable",$el).DataTable($.extend({},baseTable,{
				'columns':[
					{data:'index',defaultContent:''},
					{data:'caidan',defaultContent:''},
					{data:'kpiset_path',defaultContent:''},
					{data:'kpiset_name',defaultContent:''},
					{data:'kpiset_param',defaultContent:''},
					{data:'kpiset_inteval',defaultContent:''},
					{data:'kpiset_datastatus',defaultContent:''},
					{data:'kpiset_relationId'}			//关联id
				],
				'aoColumnDefs':[{
					'render':function(data,type,row,meta){
						if(data == "0"){
							return '<span class="readonly boolean-switch false"></span>';
						}else{
							return '<span class="readonly boolean-switch false true"></span>';
						}
					},
					'targets':6
				},{
					"visible": false,
					'targets': 7
				}]
			}));
			
			getTable();
			function getTable(){
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'CollectInfo',
						'args' : JSON.stringify({
							'obj_id' : 0,		//对象id
							'type': 0,
							'oper' : 'stand',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						})
					}
				}).done(function(data){
					var result = data.result["private"];
					$dataTable.clear();
					if(result && result.length > 0){
						result.forEach(function(item,index){
							item.index = ++ index;
							item.caidan = item.kpiset_path.split(".")[0] + '/' + item.kpiset_path.split(".")[1] + '/' + item.kpiset_path.split(".")[2];
							item.kpiset_name = item.kpiset_path.split(".")[3];
							tableIndex = index;
						});
						$dataTable.rows.add(result).draw();
					}
				});
			}
			
			//删除行
			$(".delBtn",$el).on("click",function(){
				
				if($(this).attr("class").indexOf("disabled") != -1){
					return;
				}
				
				if(userName == "user" && tr.kpiset_type == "标准"){
					app.alert("您没有删除类型为标准的权限");
					return;
				}
				
				app.confirmDialog({//提示框组件
					sTitle:"请选择......",  //确认框标题         
	                sType:"search", 
	                sContent:'是否删除此条消息吗?',  //确认框内容，非必填
	                sBtnConfirm: '确定',  //确认按钮显示内容
	                sBtnCancel: '取消',  //却笑按钮显示内容
	                fnConfirmHandler: ConfirmHandler, 
	                fnCancelHandler: function(){return;},  
	                aArgs: ['提示框']                   
				})
				
				function ConfirmHandler(){
					app.common.ajaxWithAfa({
						url  : "AFARequestAction_callAfaApp.do",
						data : {
							'appType' : 'APP_CONF',
							'target' : 'CollectConf',
							'args' : JSON.stringify({
								'operate': 'DELETE',
								'relationId' : relationId,		//对象id	
								'oper' : 'object',		//用户 user(我的)  标准 stand（全局）
								'userName': userName,
							})
						}
					}).done(function(data){
						var result = data.result.private;
						app.alert(result);
						getDataTable();
					});
				}
				
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'CollectConf',
						'args' : JSON.stringify({
							'operate': 'DELETE',
							'relationId' : relationId,		//对象id	
							'oper' : 'stand',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						})
					}
				}).done(function(data){
					var result = data.result.private;
					app.alert(result);
				});
				getTable();
			})
			
			//修改采集关系
			$(".editBtn",$el).on("click",function(){
				
				if($(this).attr("class").indexOf("disabled") != -1){
					return;
				}
				
				flag == 0;
				//修改表头，并显示参数配置表
				$("#acquisRelation-mol", $el).modal('show');
				$("#molName",$el).html("修改-采集关系");
				$("#table_content",$el).removeClass("acquisRdisplay");
				
				
				//调用明细的接口，首先进行数据查询，依据当前点击行的kpiset_relationId(隐藏行)
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'CollectConf',
						'args' : JSON.stringify({
							'operate': 'GET',
							'relationId' : relationId,		//对象id
							'oper' : 'stand',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						})
					}
				}).done(function(data){
					var result = data.result["private"];
					if(!result){
						return;
					}
					//修改采集关系 首先进行数据的填写（当前行）
					$(".acquisR-model-input .selectBy",$el).val(result.kpiset_path);			//分类
					$(".acquisR-model-input .targetCol",$el).val(result.app_id);				//应用对象
					$(".acquisR-model-input .resourseObject",$el).val(result.obj_id);			//资源对象
					$(".acquisR-model-input .critical",$el).val(result.kpiset_cname);			//关联指标集
					$(".acquisR-model-input .samplfre",$el).val(result.collect_inteval);			//采集
					//启用状态
					if(result.kpiset_status == "0"){
						$(".acquisR-model-input #mol-switch span",$el).attr("class","boolean-switch false");
					}else{
						$(".acquisR-model-input #mol-switch span",$el).attr("class","boolean-switch false true");
					}
					
					//将获取到的三级菜单进行分组拆分，并进行下一次ajax请求，请求到参数配置表的表头
					var levelinput = result.kpiset_path.split("/");
					
					if(levelinput.length != 3){
						return;
					}
					
					level1Input = levelinput[0],
					level2Input = levelinput[1],
					level3input = levelinput[2];

					AJAXGetThreeLevel(2);
					AJAXGetThreeLevel(3);
					
					kpiset_defId = result.kpiset_def_id;
					var itemList = result.itemList;
					//表头数据获取
					$("#table_content",$el).removeClass("acquisRdisplay");
					$("#acqparamSetTable>tbody",$el).html("");
					app.common.ajaxWithAfa({
						url  : "AFARequestAction_callAfaApp.do",
						data : {
							'appType' : 'APP_CONF',
							'target' : 'KpiSetParam',
							'args': JSON.stringify({
								"kpiSetDefId": kpiset_defId,
								'oper' : 'stand',		//用户 user(我的)  标准 stand（全局）
								'userName': userName,
							}),
						}
					}).done(function(data){
						
						var result = data.result.private;
						if(!result && result.length <= 0){
							return;
						}
						//获取到表头数据字段
						var th = '<th>序号</th>';
						var TdNum = 0;
						for( var i = 0 ; i < result.length ; i ++ ){
							th += '<th>'+result[i].c_NAME+'</th>';
							TdNum ++ ;
						}
						th += '<th>操作</th>'
						$("#acqparamSetTable>thead>tr",$el).html("");
						$("#acqparamSetTable>thead>tr",$el).html(th);
						
						var tbody = '';
						var $index = 1;
						if(itemList.length == 0){
							tbody += '<tr><td colspan="'+(TdNum+2)+'"><div id="acquisR_addTableTr">添加</div></td></tr>';
						}else{
							for(var i = 0 ; i < itemList.length ; i = i + TdNum ){
								tbody += '<tr><td>'+($index++)+'</td>';
								for(var j = i ; j < i + TdNum ; j ++ ){
									tbody += '<td>'+itemList[j].param_val+'</td>';
								}
								tbody += '<td><span class="acquisRelation-opreation"><i id="acquisR_editTableTr" class="fa fa-edit"></i>&nbsp;&nbsp;<i id="acquisR_DelTH" class="fa fa-trash-o"></i></span></td></tr>';
							}
							tbody += '<tr><td colspan="'+(TdNum+2)+'"><div id="acquisR_addTableTr">添加</div></td></tr>';
						}
						$("#acqparamSetTable>tbody>tr",$el).html("");
						$("#acqparamSetTable>tbody",$el).html(tbody);
						
					});
				});
			})
			
			$(".detailBtn",$el).on("click",function(){
				
				if($(this).attr("class").indexOf("disabled") != -1){
					return;
				}
				
				$(".acquisR-molDeatil-input .selectBy",$el).val("");			//分类
				$(".acquisR-molDeatil-input .critical",$el).val("");			//关联指标集
				$(".acquisR-molDeatil-input .samplfre",$el).val("");
				$("#table_content",$el).removeClass("acquisRdisplay");
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'CollectConf',
						'args' : JSON.stringify({
							'operate': 'GET',
							'relationId' : relationId,		//对象id
							'oper' : 'stand',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						})
					}
				}).done(function(data){
						
					var result = data.result["private"];
					
					$(".acquisR-molDeatil-input .selectBy",$el).val(result.kpiset_path);			//分类
					$(".acquisR-molDeatil-input .targetCol",$el).val(result.app_id);			//应用对象
					$(".acquisR-molDeatil-input .resourseObject",$el).val(result.obj_id);	//资源对象
					$(".acquisR-molDeatil-input .critical",$el).val(result.kpiset_cname);			//关联指标集
					$(".acquisR-molDeatil-input .samplfre",$el).val(result.collect_inteval);			//采集频率
					
					if(result.kpiset_status == "0"){
						$(".acquisR-molDeatil-input #molDeatil-switch span",$el).attr("class","readonly boolean-switch false");
					}else{
						$(".acquisR-molDeatil-input #molDeatil-switch span",$el).attr("class","readonly boolean-switch false true");
					}
					//参数配置表
					var itemList = result.itemList;
					//表头数据获取
					app.common.ajaxWithAfa({
						url  : "AFARequestAction_callAfaApp.do",
						data : {
							
							'oper' : 'user',		//用户 user(我的)  标准 stand（全局）
							'userName': 'admin',
							'appType' : 'APP_CONF',
							'target' : 'KpiSetParam',
							'args': JSON.stringify({
								"kpiSetDefId":result.kpiset_def_id,
								'oper' : 'stand',		//用户 user(我的)  标准 stand（全局）
								'userName': userName,
							}),
						}
					}).done(function(data){
						
						var result = data.result.private;
						if(!result && result.length <= 0){
							return;
						}
						var th = '<th>序号</th>';
						var thNum = 0;
						for( var i = 0 ; i < result.length ; i ++ ){
							th += '<th>'+result[i].c_NAME+'</th>';
							thNum ++;
						}
						
						$("#acquisR_Details>thead>tr",$el).html("");
						$("#acquisR_Details>thead>tr",$el).html(th);
						
						var $index = 1;
						var tbody = "";
						
						for(var i = 0 ; i < itemList.length ; i = i + thNum ){
							tbody += '<tr><td>'+($index++)+'</td>';
							
							for(var j = i ; j < i + thNum ; j ++ ){
								tbody += '<td>'+ itemList[j].param_val+'</td>';
							}
							tbody += '</tr>';
						}
						$("#acquisR_Details>tbody>tr",$el).html("");
						$("#acquisR_Details>tbody",$el).html(tbody);
						
					});
					
						
						//查看-采集关系-----------------------结束--------------------------------------------------
					
				});
				$("#acquisRelation-molDeatil", $el).modal('show');
			});
			
			
			$('#dataTable',$el).on('click','tbody>tr',function(e){
				
				var tr = $dataTable.row(this).data();
				
				if(tr == undefined){return;}
				relationId = tr.kpiset_relationId;
				kpiset_id = tr.kpiset_id;
				
				$('#dataTable tbody>tr',$el).removeClass("acquisRelation-trActive");
				$(this).addClass("acquisRelation-trActive");
				
				$(".acquisRelation-buttons button:not(:first)",$el).removeClass("disabled");
				
				//指标采集右侧表
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'ItemInfo',
						'args' : JSON.stringify({
							'kpiset_id' : tr.kpiset_id,		//对象id	
							'oper' : 'stand',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						})
					}
				}).done(function(data){
					var result = data.result.private;
					var merUlLi = "";
					for(var i = 0 ; i < result.length ; i ++ ){
						merUlLi += '<li><span>'+ result[i].kpi_cname +'</span><span>'+ result[i].kpi_ename+'</span><span>'+ result[i].kpi_unit+'</span></li>';
					}
					$(".acquisRelation-merUl>ul",$el).html(merUlLi);
				});	
			})
			
			
			$("#toPage",$el).on("keydown",function(e){
				var e = e || window.event;
				var keycode = e.keycode || e.which;
				var leaf = parseInt($(this).val());
				if(keycode === 13){
					$dataTable.api().page(leaf-1).draw("page");
				}
			})
			
			$(".addBtn",$el).on("click",function(){
				flag = 1;
				$(".acquisR-mol-input input",$el).val("");			
				
				$("#acquisRelation-mol .acquisR-InputDiv",$el).addClass("acquisRHidden");	
				$("#acquisRelation-mol .acquisR-selectDiv",$el).addClass("acquisRHidden");	
				$("#table_content",$el).addClass("acquisRdisplay");
				$("#molName",$el).html("增加-采集关系");
				$(".acquisR-model-input input").val("");
				$("#acquisRelation-mol", $el).modal('show');
			})
			
			//弹窗右上方的关闭差号
			$(".close").on("click",function(){
				$("#acquisRelation-molDeatil", $el).modal('hide');
				$("#acquisRelation-mol", $el).modal('hide');
				HiddenDiv();
			});
			
			function HiddenDiv(){
				$("#acquisRelation-mol .acquisR-InputDiv",$el).addClass("acquisRHidden");	
				$("#acquisRelation-mol .acquisR-selectDiv",$el).addClass("acquisRHidden");	
			}
			
			//弹窗的右下方的取消按钮
			$(".cancelBtn",$el).on("click",function(){
				$("#acquisRelation-molDeatil", $el).modal('hide');
				$("#acquisRelation-mol", $el).modal('hide');
				HiddenDiv()
			});
			
			//新增-采集关系-----------------开始------------------------------------------------------------			
			$("#bodyModel").on("click",function(){
				HiddenDiv();
			});
			
			
			//三级菜单获取函数 flag为当前的菜单等级：1，2，3
			AJAXGetThreeLevel(1);
			function AJAXGetThreeLevel(flagLevel){
				var level;
				if(flagLevel == 1){
					level = JSON.stringify({});
				}else if(flagLevel == 2){
					level = JSON.stringify({"obj_class1":level1Input});
				}else if(flagLevel == 3){
					level =  JSON.stringify({"obj_class1":level1Input,"obj_class2":level2Input});
				}
				
				if(level == ""){return;}
				
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'LinkedItem',
						'args' : level
					}
				}).done(function(data){
					var result = data.result["private"];
					if(result && result.length <= 0){
						return;
					}
					spanhtmlFirst = "";
					spanhtmlSecond = "";
					spanhtmlthird = "";
					for(var i = 0 ; i < result.length ; i ++ ){
						if(flagLevel == 1){
							spanhtmlFirst += '<span>'+result[i]+'</span>';
						}else if(flagLevel == 2){
							spanhtmlSecond += '<span>'+result[i]+'</span>';
						}else if(flagLevel == 3){
							spanhtmlthird += '<span>'+result[i]+'</span>';
						}
					}
					if(flagLevel == 1){
						$("#acquisRelation-mol .acquisR-selectDivFirst",$el).append(spanhtmlFirst);
					}else if(flagLevel == 2){
						$("#acquisRelation-mol .acquisR-selectDivSecond",$el).html("");
						$("#acquisRelation-mol .acquisR-selectDivSecond",$el).append(spanhtmlSecond);
					}else if(flagLevel == 3){
						$("#acquisRelation-mol .acquisR-selectDivthird",$el).html("");
						$("#acquisRelation-mol .acquisR-selectDivthird",$el).append(spanhtmlthird);
					}
				});	
			}
			
			
			//找到之前点击的span标签
			function findClickSpan(obj){
				var spanArr = $(obj.find("span"));
				for(var i = 0 ; i < spanArr.length ; i ++ ){
					if($(spanArr[i]).text() == level1Input){
						$(spanArr[i]).addClass("acquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == level2Input){
						$(spanArr[i]).addClass("acquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == level3Input){
						$(spanArr[i]).addClass("acquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == TargetSpan){
						$(spanArr[i]).addClass("acquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == ResourseSpan){
						$(spanArr[i]).addClass("acquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == criticalSpan){
						$(spanArr[i]).addClass("acquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == samplfreSpan){
						$(spanArr[i]).addClass("acquisR-selectSpanClick");
						return;
					}
				}
			}
			
			
			//只打开一个Div下拉框函数
			function OnlyOpenDiv(obj){
				$("#acquisRelation-mol .acquisR-selectDiv",$el).addClass("acquisRHidden");	
				var objCenterClass = obj.attr("class").split(" ")[1];
				var KPIInputDiv = $(".acquisR-InputDiv");
				for(var i = 0 ; i < KPIInputDiv.length ; i ++ ){
					var CenterClass = $(KPIInputDiv[i]).attr("class").split(" ")[1];
					if(objCenterClass == CenterClass){	//说明已经打开了下拉菜单
						continue;
					}
					$(KPIInputDiv[i]).addClass("acquisRHidden");
				}
			}
			
			
			//一级菜单获取
			var inputArr = ["一级分类","二级分类","三级分类"];
			var spanhtmlFirst = '';
			$("#acquisRelation-mol .selectBy",$el).on("click",function(e){
				AJAXGetThreeLevel(1);
				e.stopPropagation();
				$("#acquisRelation-mol .acquisR-InputDiv",$el).addClass("acquisRHidden");	
				//当有下拉框时点击input框，那么就会关闭下拉框
				if($("#acquisRelation-mol .acquisR-selectDivFirst",$el).attr("class").indexOf("acquisRHidden") == -1){
					$("#acquisRelation-mol .acquisR-selectDiv",$el).addClass("acquisRHidden");	
				}else{
					if($(this).val() != ""){
						$("#acquisRelation-mol .acquisR-selectDiv",$el).removeClass("acquisRHidden");	
						findClickSpan($("#acquisRelation-mol .acquisR-selectDivFirst",$el));
						findClickSpan($("#acquisRelation-mol .acquisR-selectDivSecond",$el));
						findClickSpan($("#acquisRelation-mol .acquisR-selectDivthird",$el));
					}
					$("#acquisRelation-mol .acquisR-selectDivFirst",$el).removeClass("acquisRHidden");
					
				}
			});
			
			//二级菜单获取
			var level1Input = "";
			var spanhtmlSecond = '';
			$(".acquisR-selectDivFirst",$el).on("click","span",function(e){
				e.stopPropagation();
				//将原来的二级下拉菜单清空，并将三级菜单隐藏
				$("#acquisRelation-mol .acquisR-selectDivSecond",$el).html("");
				$("#acquisRelation-mol .acquisR-selectDivthird",$el).addClass("acquisRHidden");
				setTimeout(function(){
					AJAXGetThreeLevel(2);
				},200);
				level1Input = $(this).text();
				//点击事件span颜色变换
				$(".acquisR-selectDivFirst span",$el).removeClass("acquisR-selectSpanClick");
				$(this).addClass("acquisR-selectSpanClick");
				
				$("#acquisRelation-mol .selectBy",$el).val(level1Input + "/" + (level2Input || inputArr[1]) +"/"+ (level3Input || inputArr[2]));
				$("#acquisRelation-mol .acquisR-selectDivSecond",$el).removeClass("acquisRHidden");
			});
			
			//三级菜单获取
			var level2Input = "";
			var spanhtmlthird = '';
			$(".acquisR-selectDivSecond",$el).on("click","span",function(e){
				e.stopPropagation();
				level2Input = $(this).text();
				setTimeout(function(){
					AJAXGetThreeLevel(3);
				},200);
				$("#acquisRelation-mol .acquisR-selectDivthird",$el).removeClass("acquisRHidden");
				//点击事件span颜色变换
				$(".acquisR-selectDivSecond span",$el).removeClass("acquisR-selectSpanClick");
				$(this).addClass("acquisR-selectSpanClick");
				
				$("#acquisRelation-mol .selectBy",$el).val(level1Input+"/"+ level2Input+"/" + (level3Input || inputArr[2]));
			});
			
			var level3Input = "";
			$(".acquisR-selectDivthird",$el).on("click","span",function(e){
				e.stopPropagation();
				level3Input = $(this).text();
				//点击事件span颜色变换
				$(".acquisR-selectDivthird span",$el).removeClass("acquisR-selectSpanClick");
				$(this).addClass("acquisR-selectSpanClick");
				
				$("#acquisRelation-mol .selectBy",$el).val(level1Input+"/"+level2Input+"/"+level3Input);
				$(".acquisR-selectDiv",$el).addClass("acquisRHidden");
			})
			
			//应用对象
			var targetColhtml = '';
			$("#acquisRelation-mol .targetCol",$el).on("click",function(e){
				e.stopPropagation();
				//获取ztree的一级目录
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'AppOfUser',
					}
				}).done(function(data){
					var result = data.result["private"];
					targetColhtml = "";
					if(result && result.length >= 0){
						for(var i = 0 ; i < result.length ; i ++ ){
							targetColhtml += '<span data-id="'+result[i].app_id+'">'+result[i].app_name+'</span>';
						}
					}
				});
			
				setTimeout(function(){
					$(".acquisR-targetDiv").html(targetColhtml);
					findClickSpan($("#acquisRelation-mol .acquisR-targetDiv",$el));
				},200);
				e.stopPropagation();
				
				if($("#acquisRelation-mol .acquisR-targetDiv",$el).attr("class").indexOf("acquisRHidden") == -1){
					$(".acquisR-targetDiv").addClass("acquisRHidden");
				}else{
					$(".acquisR-targetDiv").removeClass("acquisRHidden");
					OnlyOpenDiv($("#acquisRelation-mol .acquisR-targetDiv",$el));
				}
			});
			
			var app_id = "";
			var TargetSpan = "";
			$(".acquisR-targetDiv",$el).on("click","span",function(e){
				e.stopPropagation();
				$(".acquisR-targetDiv span").removeClass("acquisR-selectSpanClick");
				$(this).addClass("acquisR-selectSpanClick");
				$(".acquisR-targetDiv").addClass("acquisRHidden");
				
				$(".targetCol").val($(this).text());
				TargetSpan = $(this).text();
				app_id = $(this).attr("data-id");
			});
			
			//资源对象点击事件
			var Resoursehtml = '';
			$("#acquisRelation-mol .resourseObject",$el).on("click",function(e){
				e.stopPropagation();
				
				e.stopPropagation();
				if(app_id == ""){
					app.alert("请先选择应用对象");
					return;
				}
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'ObjList',
						'args' : JSON.stringify({
							'app_id' : parseInt(app_id),		//对象id
						})
					}
				}).done(function(data){
					var result = data.result["private"].obj_detail;
					if( !result && result.length <= 0){
						return;
					}
					Resoursehtml = "";
					for(var i = 0 ; i < result.length; i ++ ){
						Resoursehtml += '<span data-id="'+result[i].obj_id+'">'+result[i].obj_name+'</span>';
					}
				});
				setTimeout(function(){
					$(".acquisR-ResourseDiv").html(Resoursehtml);
					findClickSpan($("#acquisRelation-mol .acquisR-ResourseDiv",$el));
				},300);
				if($("#acquisRelation-mol .acquisR-ResourseDiv",$el).attr("class").indexOf("acquisRHidden") == -1){
					$("#acquisRelation-mol .acquisR-ResourseDiv",$el).html("");
					$(".acquisR-ResourseDiv").addClass("acquisRHidden");
				}else{
					$(".acquisR-ResourseDiv").removeClass("acquisRHidden");
					OnlyOpenDiv($("#acquisRelation-mol .acquisR-ResourseDiv",$el));
				}
			});
			
			var obj_id = "";
			var ResourseSpan = "";
			$(".acquisR-ResourseDiv",$el).on("click","span",function(e){
				e.stopPropagation();
				obj_id = $(this).attr("data-id");
				$(".acquisR-ResourseDiv span").removeClass("acquisR-selectSpanClick");
				$(this).addClass("acquisR-selectSpanClick");
				$(".acquisR-ResourseDiv").addClass("acquisRHidden");

				ResourseSpan = $(this).text();
				$(".resourseObject").val($(this).text());
			});
			
			//关联指标集
			var criticalhtml = '';
			$("#acquisRelation-mol .critical",$el).on("click",function(e){
				e.stopPropagation();
				
				//用三级菜单进行关联指标集的确定，并且获取到表头
				$("#acquisRelation-mol .acquisR-criticalDiv",$el).html("");
				var level3input = $("#acquisRelation-mol .selectBy").val().split("/");
				var levelobj = {
					"obj_class1":level3input[0],
					"obj_class2":level3input[1],
					"obj_class3":level3input[2],
					'oper' : 'stand',		//用户 user(我的)  标准 stand（全局）	object (对象)
					'userName': 'admin',
				}
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'KpiSetList',
						'args': JSON.stringify(levelobj),
					}
				}).done(function(data){
					
					var result = data.result.private;
					if(!result && result.length <= 0){
						return;
					}
					criticalhtml = '';
					//获取到当前的关联指标集的选项
					for(var i = 0 ; i < result.length ; i ++ ){
						criticalhtml += '<span data-id="'+result[i].kPISet_Def_ID+'">'+result[i].c_NAME+'</span>';
					}
				});
				
				//如果当前DIV下拉菜单显示，则清空下拉菜单并隐藏 否则添加选项，并展示
				if($("#acquisRelation-mol .acquisR-criticalDiv",$el).attr("class").indexOf("acquisRHidden") == -1){
					$("#acquisRelation-mol .acquisR-criticalDiv",$el).html("");
					$(".acquisR-criticalDiv").addClass("acquisRHidden");
				}else{
					setTimeout(function(){
						$(".acquisR-criticalDiv").html(criticalhtml);
						findClickSpan($("#acquisRelation-mol .acquisR-criticalDiv",$el));
					},200)
					$(".acquisR-criticalDiv").removeClass("acquisRHidden");
					OnlyOpenDiv($("#acquisRelation-mol .acquisR-criticalDiv",$el));
				}
			});
			
			var criticalSpan = "";
			$(".acquisR-criticalDiv",$el).on("click","span",function(e){
				e.stopPropagation();
				//表头数据获取
				kpiset_def_id = $(this).attr("data-id");
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'KpiSetParam',
						'args': JSON.stringify({
							"kpiSetDefId":parseInt(kpiset_def_id),
							'oper' : 'stand',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						}),
					}
				}).done(function(data){
					
					var result = data.result.private;
					if(!result && result.length <= 0){
						return;
					}
					var th = '<th>序号</th>';
					for(var i = 0 ; i < result.length ; i ++ ){
						th += '<th>'+result[i].c_NAME+'</th>'
					}
					th += '<th>操作</th>';
					$("#acqparamSetTable>thead>tr",$el).html("");
					$("#acqparamSetTable>thead>tr",$el).html(th);
					var len = $("#acqparamSetTable thead tr",$el).find("th").length;
					var tbody = '<tr>'+
						'<td colspan="'+len+'"><div id="acquisR_addTableTr">添加</div></td>'+
						'</tr>';
					$("#acqparamSetTable>tbody",$el).html(tbody);
				});
				criticalSpan = $(this).text();
				$("#table_content",$el).removeClass("acquisRdisplay");
				$(".acquisR-criticalDiv span").removeClass("acquisR-selectSpanClick");
				$(this).addClass("acquisR-selectSpanClick");
				$(".acquisR-criticalDiv").addClass("acquisRHidden");
				$(".critical").val(criticalSpan);
			});
			
//			//采集频率
//			var samplfrehtml = '<span>1分钟</span><span>2分钟</span><span>3分钟</span><span>4分钟</span>';
//			$("#acquisRelation-mol .samplfre",$el).on("click",function(e){
//				e.stopPropagation();
//				if($("#acquisRelation-mol .acquisR-samplfreDiv",$el).attr("class").indexOf("acquisRHidden") == -1){
//					$("#acquisRelation-mol .acquisR-samplfreDiv",$el).html("");
//					$(".acquisR-samplfreDiv").addClass("acquisRHidden");
//				}else{
//					$(".acquisR-samplfreDiv").append(samplfrehtml);
//					$(".acquisR-samplfreDiv").removeClass("acquisRHidden");
//					findClickSpan($("#acquisRelation-mol .acquisR-samplfreDiv",$el));
//					OnlyOpenDiv($("#acquisRelation-mol .acquisR-samplfreDiv",$el));
//				}
//			});
//			
//			var samplfreSpan = "";
//			$(".acquisR-samplfreDiv",$el).on("click","span",function(e){
//				e.stopPropagation();
//				samplfreSpan = $(this).text();
//				$(".acquisR-samplfreDiv span",$el).removeClass("acquisR-selectSpanClick");
//				$(this).addClass("acquisR-selectSpanClick");
//				$(".acquisR-samplfreDiv",$el).addClass("acquisRHidden");
//
//				$(".samplfre",$el).val(samplfreSpan);
//			});
//			
			
			//参数配置表排序事件
			function TableSort(){
				
				var trArr = $("#acqparamSetTable tbody tr");
				var len=trArr.length - 1,j;
	            var temp;
	            while(len>0){
	                for(j=0;j<len-1;j++){
	                	var before = parseInt($($(trArr[j]).find("td:nth-child(1)")).text());
						var after = parseInt($($(trArr[j+1]).find("td:nth-child(1)")).text());
	                    if(before>after){
	                        temp=trArr[j];
	                        trArr[j]=trArr[j+1];
	                        trArr[j+1]=temp;
	                    }
	                }
	                len--;
	            }
				
	            for(var i = 0 ; i < trArr.length - 1 ; i ++ ){
	            	$($(trArr[i]).find("td:nth-child(1)")).text(i+1);
				}
	            
				$("#acqparamSetTable tbody").html(trArr);
				TableIndex = trArr.length;
			}
			
			//tr编号
			var TableIndex = 1;
			//添加按钮事件
			$("#acqparamSetTable",$el).on("click","#acquisR_addTableTr",function(){
				TableSort();
				editflag = 0;
				if($("#acqparamSetTable tbody tr",$el).length == 1){
					TableIndex = 1;
				}
				//依据表头进行数据的填写和修改
				var theadTH = $("#acqparamSetTable thead tr",$el).find("th");
				var tableInnerHtml = '<tr>'+
						'<td><span id="acquisRelation_index">'+TableIndex+'</span></td>';
				for(var i = 1 ; i < theadTH.length - 1 ; i ++ ){
					tableInnerHtml += '<td><input id="acquisRelation_Data'+(i)+'" style="width:80%;margin:0" type="text" /></td>'
				}
				tableInnerHtml += '<td><span class="acquisRelation-opreation"><span id="acquisR_Save">保存</span>&nbsp;&nbsp;<span id="acquisR_Cancel">取消</span></span></td>'+
							'</tr>';
				$("#acqparamSetTable tbody>tr:last-child",$el).before($(tableInnerHtml));
				TableIndex++;
			});
			
			
			
			//保存按钮事件
			$("#acqparamSetTable",$el).on("click","#acquisR_Save",function(){
				var ind = $($(this).parent().parent().parent().find("td:nth-child(1)").find("span")).text();
				var tableDataArr = [];
				var theadTH = $("#acqparamSetTable thead tr",$el).find("th");
				for(var i = 1 ; i < theadTH.length - 1 ; i ++ ){
					tableDataArr.push($(this).parent().parent().parent().find("#acquisRelation_Data"+i).val())
				}

				var tableInnerHtml = '<tr><td>'+ind+'</td>';
				for(var i = 0 ; i < tableDataArr.length ; i ++ ){
					tableInnerHtml += '<td>'+tableDataArr[i]+'</td>';
				}
				tableInnerHtml += '<td><span class="acquisRelation-opreation"><i id="acquisR_editTableTr" class="fa fa-edit"></i>&nbsp;&nbsp;<i id="acquisR_DelTH" class="fa fa-trash-o"></i></span></td>'+
							'</tr>';
				$(this).parent().parent().parent().remove();
				$("#acqparamSetTable tbody>tr:last-child",$el).before(tableInnerHtml);
				TableSort();
			});
			
			//删除按钮事件
			$("#acqparamSetTable",$el).on("click","#acquisR_DelTH",function(){
				$(this).parent().parent().parent().remove();
				TableSort();
			});
			
			//取消按钮事件
			$("#acqparamSetTable",$el).on("click","#acquisR_Cancel",function(){
				editTrObj = '<tr>'+editTrObj+'</tr>';
				if(editflag == 1){
					$(this).parent().parent().parent().remove();
					$("#acqparamSetTable tbody>tr:last-child",$el).before(editTrObj);
				}
				$(this).parent().parent().parent().remove();
				TableSort();
			});
			
			//编辑按钮事件
			var editflag = 0;
			var editTrObj = null;
			$("#acqparamSetTable",$el).on("click","#acquisR_editTableTr",function(){
				editflag = 1;
				editTrObj = $($(this).parent().parent().parent()).html();
				var ind = $($(this).parent().parent().parent().find("td:nth-child(1)")).text();
				var tableDataArr = [];
				var theadTH = $("#acqparamSetTable thead tr",$el).find("th");
				for(var i = 1 ; i < theadTH.length - 1 ; i ++ ){
					tableDataArr.push($($(this).parent().parent().parent().find("td:nth-child("+(i+1)+")")).text());
				}
		
				var trArr = $("#acqparamSetTable tbody tr",$el);
				var tableInnerHtml = '<td><span id="acquisRelation_index">'+ind+'</span></td>';
				for(var i = 0 ; i < tableDataArr.length ; i ++ ){
					tableInnerHtml += '<td><input id="acquisRelation_Data'+(i+1)+'" style="width:80%;margin:0" type="text" value="'+tableDataArr[i]+'" /></td>';
				}
				tableInnerHtml += '<td><span class="acquisRelation-opreation"><span id="acquisR_Save">保存</span>&nbsp;&nbsp;<span id="acquisR_Cancel">取消</span></td>';
				
				for(var i = 0 ; i < trArr.length - 1 ; i ++ ){		
					if(parseInt($($(trArr[i]).find("td:nth-child(1)")).text()) == ind){
						$(trArr[i]).html("");
						$(trArr[i]).append($(tableInnerHtml));
						break;
					}
				}
			});
			
			//修改-采集关系 ----------------------------结束-----------------------------------------------
			
			//模态窗保存按钮点击事件
			$("#buttion_add",$el).on("click",function(){
				//获取开关状态
				var KPIswitch = "";
				if($("#acquisRelation-mol #mol-switch>span",$el).attr("class").indexOf("true") != -1){	//开关开
					KPIswitch = "1";
				}else{
					KPIswitch = "0";
				}
				var selectBy = $(".acquisR-model-input .selectBy",$el).val();	//分类
				var targetCol = $(".acquisR-model-input .targetCol",$el).val();	
				var resourseObject = $(".acquisR-model-input .resourseObject",$el).val();	
				var critical = $(".acquisR-model-input .critical",$el).val();	
				var samplfre = $(".acquisR-model-input .samplfre",$el).val();	
				
				var level3input = selectBy.split("/");
				var itemList = [];
				
				if(selectBy.indexOf("分类") != -1){
					app.alert("三级菜单必须选择完全");
					return;
				}
				console.log(critical +"a" +targetCol+"b"+samplfre);
				if(critical == "" || targetCol == "" || samplfre == ""){
					app.alert("数据必须完整");
					return;
				}
				
				//获取到表头的长度
				var len = $("#acqparamSetTable thead tr",$el).find("th").length;
				//获取到tbody下tr的长度
				var tbodyTrLen = $("#acqparamSetTable tbody",$el).find("tr").length;
				
				for(var i = 0 ; i < tbodyTrLen - 1 ; i ++ ){
					var trObj = $("#acqparamSetTable tbody",$el).find("tr:nth-child("+(i+1)+")");
					for(var j = 0 ; j < len - 2 ; j ++ ){
						var trtext = trObj.find("td:nth-child("+(j+2)+")").text();
						var obj = {
							"relation_id":relationId,
							"param_index": (i+1),		//行号
							"param_seq": (j+1),			//列号
							"param_val": trtext,
							'obj_id':10,
						}
						itemList.push(obj);
					}
				}
				var params = {
					'kpiset_def_id': parseInt(kpiset_def_id),
					"obj_class_1":level3input[0],
					"obj_class_2":level3input[1],
					"obj_class_3":level3input[2],
					'app_id':0,
					'obj_id':0,
					'collect_inteval':parseInt(samplfre),
					'status':parseInt(KPIswitch),
					'itemList':itemList
				}
				if(flag == 0){		//修改弹窗
					app.common.ajaxWithAfa({
						url  : "AFARequestAction_callAfaApp.do",
						data : {
							'appType' : 'APP_CONF',
							'target' : 'CollectConf',
							'args' : JSON.stringify({
								'operate': 'UPDATE',
								'oper':'stand',
								'userName': userName,
								'relationId' : relationId,		//对象id	
								'params':params,
							})
						}
					}).done(function(data){
						var result = data.result.private;
						
						app.alert(result);
						getTable();
					});
					$("#acquisRelation-mol",$el).modal("hide");
				}else if(flag == 1){		//增加弹窗
				
					app.common.ajaxWithAfa({
						url  : "AFARequestAction_callAfaApp.do",
						data : {
							'appType' : 'APP_CONF',
							'target' : 'CollectConf',
							'args' : JSON.stringify({
								'operate': 'ADD',
								'oper':'object',
								'userName': userName,
								'relationId' : relationId,		//对象id	
								'params':params,
							})
						}
					}).done(function(data){
						var result = data.result.private;
						app.alert("增加成功");
						getTable();
					});
					$("#acquisRelation-mol",$el).modal("hide");
				}
				
			});
		},
		unload : function(handler) {
			
		},
		pause : function($el, attr, handler) {
			
		},
		resume : function($el, attr, handler) {
			
		}
	};
});