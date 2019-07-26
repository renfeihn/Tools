define([ "jquery" ], function() {
	return {
		load : function($el, scope, handler) {
			
			//获取本地localStroage中的username
			var memory =window.localStorage || (window.UserDataStorage && new UserDataStorage()) || new cookieStroage();
			var userName =memory.getItem("username");
			
			var obj_id_scope = scope.obj_id;
			
			var flag = 1,		//标志  新增保存 1   修改保存 0
				relationId,
				kpiset_defId,
				app_id,
				obj_id;
			
			showMyDefine();
			$("#MyacquisRUl li",$el).on("click",function(){
				var $index = $(this).index();
				if($index == 0){
					showMyDefine();
				}else if($index == 1){
					showStandDefine();
				}
			});
			
			var $defineTab = $("#defineTab", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'pageLength':15,
				'columns':[
				{
					data:'index',defaultContent:''
				},{
					data:'caidan',defaultContent:''
				},{
					data:'app_obj',defaultContent:''
				},{
					data:'source_obj',defaultContent:''
				},{
					data:'kpiset_path',defaultContent:''
				},{
					data:'kpiset_name',defaultContent:''
				},{
					data:'kpiset_param',defaultContent:''
				},{
					data:'kpiset_inteval',defaultContent:''
				},{
					data:'kpiset_status',defaultContent:''
				},{
					data:'kpiset_relationId',
				}],
				'aoColumnDefs':[{
					"visible": false,
					'targets': 9
				},{
					'render':function(data,type,row,meta){
						if(data == 0){
							return '<span class="readonly boolean-switch false"></span>';
						}else{
							return '<span class="readonly boolean-switch false true"></span>';
						}
					},
					'targets':8
				}]
			});
			
			var $standardTab = $("#standardTab", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'pageLength':15,
				'columns':[
					{data:'index',defaultContent:''},
					{data:'caidan',defaultContent:''},
					{data:'app_obj',defaultContent:''},	//应用对象
					{data:'kpiset_path',defaultContent:''},
					{data:'kpiset_name',defaultContent:''},
					{data:'kpiset_inteval',defaultContent:''},
					{data:'kpiset_datastatus',defaultContent:''},
					{data:'kpiset_status',defaultContent:''},
					{data:'kpiset_relationId'}			//关联id
				],
				'aoColumnDefs':[{
					'render':function(data,type,row,meta){
							if(data == "异常"){
								return '<span style="color:red;display:inline-block;width:40px;height:20px;border:1px solid red;text-align:center;line-height:20px;">异常<span>'
							}else{
								return '<span style="padding-left:8px;">正常</span>'
							}
						},
						'targets':6
				},{
					'render':function(data,type,row,meta){
						if(data == 0){
							return '<span class="readonly boolean-switch false"></span>';
						}else{
							return '<span class="readonly boolean-switch false true"></span>';
						}
					},
					'targets':7
				},{
					"visible": false,
					'targets': 8
				}]
			});
			
			function showMyDefine(){
				//我定义的采集关系
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'CollectInfo',
						'args' : JSON.stringify({
							'obj_id' : 0,		//对象id  需要从上级页面中获取
							'type': 0,	
							'oper' : 'user',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						})
					}
				}).done(function(data){
					var result = data.result["private"];
					$defineTab.clear().draw();
					if(result && result.length > 0){
						result.forEach(function(item,index){
							item.index = ++ index;
							item.caidan = item.kpiset_path.split(".")[0] + '/' + item.kpiset_path.split(".")[1] + '/' + item.kpiset_path.split(".")[2];
							item.kpiset_name = item.kpiset_path.split(".")[3];
							tableIndex = index;
						});
						$defineTab.rows.add(result).draw();
					}
				});
			}
			
			function showStandDefine(){
				//标准采集关系
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'CollectInfo',
						'args' : JSON.stringify({
							'obj_id' : 0,			//对象id  需要从上级页面中获取
							'type': 0,	
							'oper' : 'stand',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						})
					}
				}).done(function(data){
					var result = data.result["private"];
					$standardTab.clear().draw();
					if(result && result.length > 0){
						result.forEach(function(item,index){
							item.index = ++ index;
							item.caidan = item.kpiset_path.split(".")[0] + '/' + item.kpiset_path.split(".")[1] + '/' + item.kpiset_path.split(".")[2];
							item.kpiset_name = item.kpiset_path.split(".")[3]
							tableIndex = index;
						});
						$standardTab.rows.add(result).draw();
					}
				});
			}
			
			
			//删除table表数据
			$("#delBtnMy",$el).on("click",function(){
				
				if($(this).attr("class").indexOf("disabled") != -1){
					return;
				}
				if(userName == "user" && tr.kpiset_type == "标准"){
					app.alert("您没有删除类型为标准的权限");
					return;
				}
				app.confirmDialog({//提示框组件
					sTitle:"请选择.....",  //确认框标题         
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
								'oper' : 'user',		//用户 user(我的)  标准 stand（全局）
								'userName': userName,
							})
						}
					}).done(function(data){
						var result = data.result.private;
						app.alert(result);
						showMyDefine();
					});
				}
				
			});
			
			//修改采集关系
			$("#editBtnMy",$el).on("click",function(){
				
				if($(this).attr("class").indexOf("disabled") != -1){
					return;
				}
				
				
				flag = 0;
				
				//修改表头，并显示参数配置表
				$("#table_content",$el).removeClass("MyacquisRdisplay");
				$("#MyacquisRelation-mol",$el).modal('show');
				$("#molName",$el).html("修改-采集关系");
				
				//调用明细的接口，首先进行数据查询，依据当前点击行的kpiset_relationId(隐藏行)
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'CollectConf',
						'args' : JSON.stringify({
							'operate': 'GET',
							'relationId' : relationId,		//对象id
							'oper' : 'user',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						})
					}
				}).done(function(data){
					
					var result = data.result["private"];
					if(!result){
						return;
					}
					
					app_id = result.app_id;
					obj_id = result.obj_id;
					
					$(".MyacquisR-model-input .selectBy",$el).val(result.kpiset_path);			//分类
					$(".MyacquisR-model-input .targetCol",$el).val(result.app_id);			//应用对象
					$(".MyacquisR-model-input .resourseObject",$el).val(result.obj_id);	//资源对象
					$(".MyacquisR-model-input .critical",$el).val(result.kpiset_cname);			//关联指标集
					$(".MyacquisR-model-input .samplfre",$el).val(result.collect_inteval);			//采集频率
					
					if(result.status == 0){
						$(".MyacquisR-model-input #mol-switch span",$el).attr("class","boolean-switch false");
					}else{
						$(".MyacquisR-model-input #mol-switch span",$el).attr("class","boolean-switch false true");
					}
					
					//将获取到的数据进行分组拆分，并进行下一次ajax请求，请求到参数配置表的表头
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
					$("#MyparamSetTable>tbody>tr",$el).html("");
					app.common.ajaxWithAfa({
						url  : "AFARequestAction_callAfaApp.do",
						data : {
							'appType' : 'APP_CONF',
							'target' : 'KpiSetParam',
							'args': JSON.stringify({
								"kpiSetDefId": kpiset_defId,
								'oper' : 'object',		//用户 user(我的)  标准 stand（全局）
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
						var thNum = 0;
						for( var i = 0 ; i < result.length ; i ++ ){
							th += '<th>'+result[i].c_NAME+'</th>';
							thNum++;
						}
						th += '<th>操作</th>';
						$("#MyparamSetTable>thead>tr",$el).html("");
						$("#MyparamSetTable>thead>tr",$el).html(th);
						
						var $index = 1;
						//得到表头的行
						var len = $("#MyparamSetTable>thead>tr",$el).find("th").length;
						var tbody = "";
						
						if(itemList.length == 0){
							tbody += '<tr><td colspan="'+len+'"><div id="MyacquisR_addTableTr">添加</div></td></tr>';
						}else{
							for(var i = 0 ; i < itemList.length ; i = i + (len-2) ){
								tbody += '<tr><td>'+($index++)+'</td>';
								for(var j = i ; j < i + (len-2) ; j ++ ){
									tbody += '<td>'+ itemList[j].param_val+'</td>';
								}
								tbody += '<td><span class="MyacquisRelation-opreation"><i id="MyacquisR_editTableTr" class="fa fa-edit"></i>&nbsp;&nbsp;<i id="MyacquisR_DelTh" class="fa fa-trash-o"></i></span></td></tr>';
							}
							tbody += '<tr><td colspan="'+len+'"><div id="MyacquisR_addTableTr">添加</div></td></tr>';
						}
						$("#MyparamSetTable>tbody>tr",$el).html("");
						$("#MyparamSetTable>tbody",$el).html(tbody);
						
					});
					
					//将调用明细接口时请求的参数配置信息写入表中
					setTimeout(function(){
						var tbody = '<tr>';
						
					},200);	
				});
			})
			
			$(".detailBtn",$el).on("click",function(){
				//明细弹窗
				if($(this).attr("class").indexOf("disabled") != -1){
					return;
				}
				if($(this).attr("class").indexOf("disabled") != -1){
					return;
				}
				
				$(".MyacquisR-molDeatil-input .selectBy",$el).val("");			//分类
				$(".MyacquisR-molDeatil-input .critical",$el).val("");			//关联指标集
				$(".MyacquisR-molDeatil-input .samplfre",$el).val("");
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'CollectConf',
						'args' : JSON.stringify({
							'operate': 'GET',
							'relationId' : relationId,		//对象id
							'oper' : 'user',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						})
					}
				}).done(function(data){
					
					var result = data.result["private"];
					var itemList = result.itemList;
					
					app_id = result.app_id;
					obj_id = result.obj_id;
					
					$(".MyacquisR-molDeatil-input .selectBy",$el).val(result.kpiset_path);			//分类
					$(".MyacquisR-molDeatil-input .targetCol",$el).val(result.app_id);			//应用对象
					$(".MyacquisR-molDeatil-input .resourseObject",$el).val(result.obj_id);	//资源对象
					$(".MyacquisR-molDeatil-input .critical",$el).val(result.kpiset_cname);			//关联指标集
					$(".MyacquisR-molDeatil-input .samplfre",$el).val(result.collect_inteval);			//采集频率
					
					if(result.status == 0){
						$(".MyacquisR-molDeatil-input #molDeatil-switch span",$el).attr("class","readonly boolean-switch false");
					}else{
						$(".MyacquisR-molDeatil-input #molDeatil-switch span",$el).attr("class","readonly boolean-switch false true");
					}
					//参数配置表
					var levelinput = result.kpiset_path.split("/");
					var levelobj = {
						"obj_class_1":levelinput[0],
						"obj_class_2":levelinput[1],
						"obj_class_3":levelinput[2],
					}
					//表头数据获取
					$("#table_content",$el).removeClass("MyacquisRdisplay");
					app.common.ajaxWithAfa({
						url  : "AFARequestAction_callAfaApp.do",
						data : {
							'appType' : 'APP_CONF',
							'target' : 'KpiSetParam',
							'args': JSON.stringify({							
								'oper' : 'user',		//用户 user(我的)  标准 stand（全局）
								'userName': userName,
								"kpiSetDefId": result.kpiset_def_id,
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
							thNum ++ ;
						}
						
						$("#MyacquisR_Details>thead>tr",$el).html("");
						$("#MyacquisR_Details>thead>tr",$el).html(th);
						
						
						var $index = 1;

						var tbody = "";
						for(var i = 0 ; i < itemList.length ; i = i + thNum ){
							tbody += '<tr><td>'+($index++)+'</td>';
							
							for(var j = i ; j < i + thNum ; j ++ ){
								tbody += '<td>'+ itemList[j].param_val+'</td>';
							}
							tbody += '</tr>';
						}
						$("#MyacquisR_Details>tbody>tr",$el).html("");
						$("#MyacquisR_Details>tbody",$el).html(tbody);
						
						
					});
					
					//查看-采集关系-----------------------结束--------------------------------------------------
				});
				$("#MyacquisRelation-molDeatil", $el).modal('show');
			});
				
			
			
			$('#defineTab',$el).on('click','tbody>tr',function(e){
				
				$(".MyacquisR-define-right>ul",$el).html("");
				
				$(".MyacquisR-buttons button:not(:first)",$el).removeClass("disabled");
				
				var tr = $defineTab.row(this).data();
				if(!tr){return;}
				
				relationId = tr.kpiset_relationId;
				
				$('#defineTab tbody>tr',$el).removeClass("MyacquisR-trActive");
				$(this).addClass("MyacquisR-trActive");
				
				//指标采集右侧表
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'ItemInfo',
						'args' : JSON.stringify({
							'kpiset_id' : tr.kpiset_id,		//对象id	
//							'kpiset_id' : 502,		//对象id	
							'oper' : 'user',		//用户 user(我的)  标准 stand（全局）
							'userName': userName,
						})
					}
				}).done(function(data){
					var result = data.result.private;
					var merUlLi = "";
					for(var i = 0 ; i < result.length ; i ++ ){
						merUlLi += '<li><span>'+ result[i].kpi_cname +'</span><span>'+ result[i].kpi_ename+'</span><span>'+ result[i].kpi_unit+'</span></li>';
					}
					$(".MyacquisR-define-right>ul",$el).html(merUlLi);
				});

			})

			
			
			

			$('#standardTab',$el).on('click','tbody>tr',function(e){
				$(".MyacquisR-standard-right>ul",$el).html("");
				var tr = $standardTab.row(this).data();
				//点击事件选中该行
				$('#standardTab tbody>tr',$el).removeClass("MyacquisR-trActive");
				$(this).addClass("MyacquisR-trActive");
				
				if(!tr){return;}
				//指标采集右侧表
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'ItemInfo',
						'args' : JSON.stringify({
							'kpiset_id' : tr.kpiset_id,		//对象id	
//							'kpiset_id' : 502
						})
					}
				}).done(function(data){
					var result = data.result.private;
					var merUlLi = "";
					for(var i = 0 ; i < result.length ; i ++ ){
						merUlLi += '<li><span>'+ result[i].kpi_cname +'</span><span>'+ result[i].kpi_ename+'</span><span>'+ result[i].kpi_unit+'</span></li>';
					}
					$(".MyacquisR-standard-right>ul",$el).html(merUlLi);
				});
			});
			
			
			$(".close").on("click",function(){
				$("#MyacquisRelation-molDeatil", $el).modal('hide');
				$("#MyacquisRelation-mol", $el).modal('hide');
				HiddenDiv()
			});
			
			$(".cancelBtn",$el).on("click",function(){
				$("#MyacquisRelation-molDeatil", $el).modal('hide');
				$("#MyacquisRelation-mol", $el).modal('hide');
				HiddenDiv();
			});
			
			function HiddenDiv(){
				$("#MyacquisRelation-mol .MyacquisR-selectDiv",$el).addClass("MyacquisRHidden");	
				$("#MyacquisRelation-mol .MyacquisR-InputDiv",$el).addClass("MyacquisRHidden");
			}
			
			$(".addBtn",$el).on("click",function(){
				flag = 1;
				HiddenDiv();
				$(".MyacquisR-model-input input",$el).val("");
				$("#MyacquisRelation-mol", $el).modal('show');
				$("#molName",$el).html("增加-采集关系");
			})
			
			
			//新增-我的采集关系------------开始------------------------------------------------------------			
			$("#bodyModel",$el).on("click",function(){
				$("#MyacquisRelation-mol .MyacquisR-selectDiv",$el).addClass("MyacquisRHidden");	
				$("#MyacquisRelation-mol .MyacquisR-InputDiv",$el).addClass("MyacquisRHidden");
			});
			
			//找到之前点击的span标签
			function findClickSpan(obj){
				var spanArr = $(obj.find("span"));
				for(var i = 0 ; i < spanArr.length ; i ++ ){
					if($(spanArr[i]).text() == level1Input){
						$(spanArr[i]).addClass("MyacquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == level2Input){
						$(spanArr[i]).addClass("MyacquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == level3Input){
						$(spanArr[i]).addClass("MyacquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == TargetSpan){
						$(spanArr[i]).addClass("MyacquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == ResourseSpan){
						$(spanArr[i]).addClass("MyacquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == criticalSpan){
						$(spanArr[i]).addClass("MyacquisR-selectSpanClick");
						return;
					}else if($(spanArr[i]).text() == samplfreSpan){
						$(spanArr[i]).addClass("MyacquisR-selectSpanClick");
						return;
					}
				}
			}
			
			function OnlyOpenDiv(obj){
				$("#MyacquisRelation-mol .MyacquisR-selectDiv",$el).addClass("MyacquisRHidden");	
				var objCenterClass = obj.attr("class").split(" ")[1];
				var KPIInputDiv = $(".MyacquisR-InputDiv",$el);
				for(var i = 0 ; i < KPIInputDiv.length ; i ++ ){
					var CenterClass = $(KPIInputDiv[i]).attr("class").split(" ")[1];
					if(objCenterClass == CenterClass){	//说明已经打开了下拉菜单
						continue;
					}
					$(KPIInputDiv[i]).addClass("MyacquisRHidden");
				}
			}
			
			
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
					//将之前的选项清空，并将请求到的新数据写入
					if(flagLevel == 1){
						$("#MyacquisRelation-mol .MyacquisR-selectDivFirst",$el).append(spanhtmlFirst);
					}else if(flagLevel == 2){
						$("#MyacquisRelation-mol .MyacquisR-selectDivSecond",$el).html("");
						$("#MyacquisRelation-mol .MyacquisR-selectDivSecond",$el).append(spanhtmlSecond);
					}else if(flagLevel == 3){
						$("#MyacquisRelation-mol .MyacquisR-selectDivthird",$el).html("");
						$("#MyacquisRelation-mol .MyacquisR-selectDivthird",$el).append(spanhtmlthird);
					}
				});	
			}
			//一级菜单获取
			var inputArr = ["一级分类","二级分类","三级分类"];
			
			var spanhtmlFirst = '';
			$("#MyacquisRelation-mol .selectBy",$el).on("click",function(e){
				$(".MyacquisR-InputDiv").addClass("MyacquisRHidden");
				e.stopPropagation();

				//当有下拉框时点击input框，那么就会关闭下拉框
				if($("#MyacquisRelation-mol .MyacquisR-selectDivFirst",$el).attr("class").indexOf("MyacquisRHidden") == -1){
					$("#MyacquisRelation-mol .MyacquisR-selectDiv",$el).addClass("MyacquisRHidden");	
				}else{
					if($(this).val() != ""){
						$("#MyacquisRelation-mol .MyacquisR-selectDiv",$el).removeClass("MyacquisRHidden");
						findClickSpan($("#MyacquisRelation-mol .MyacquisR-selectDivFirst",$el));
						findClickSpan($("#MyacquisRelation-mol .MyacquisR-selectDivSecond",$el));
						findClickSpan($("#MyacquisRelation-mol .MyacquisR-selectDivthird",$el));
					}
					$("#MyacquisRelation-mol .MyacquisR-selectDivFirst",$el).removeClass("MyacquisRHidden");
				}
			});
			
			//二级菜单获取
			var level1Input = "";
			var spanhtmlSecond = '';
			$(".MyacquisR-selectDivFirst",$el).on("click","span",function(e){
				e.stopPropagation();
				$("#MyacquisRelation-mol .MyacquisR-selectDivthird",$el).addClass("MyacquisRHidden");
				level1Input = $(this).text();
				setTimeout(function(){
					AJAXGetThreeLevel(2);
				},200);
				//点击事件span颜色变换
				$(".MyacquisR-selectDivFirst span",$el).removeClass("MyacquisR-selectSpanClick");
				$(this).addClass("MyacquisR-selectSpanClick");
				
				$("#MyacquisRelation-mol .selectBy",$el).val(level1Input + "/" + (level2Input || inputArr[1]) +"/"+ (level3Input || inputArr[2]));
				$("#MyacquisRelation-mol .MyacquisR-selectDivSecond",$el).removeClass("MyacquisRHidden");
			});
			
			//三级菜单获取
			var level2Input = "";
			var spanhtmlthird = '';
			$(".MyacquisR-selectDivSecond",$el).on("click","span",function(e){
				e.stopPropagation();
				level2Input = $(this).text();
				
				setTimeout(function(){
					AJAXGetThreeLevel(3);
				},200);
				
				//点击事件span颜色变换
				$(".MyacquisR-selectDivSecond span",$el).removeClass("MyacquisR-selectSpanClick");
				$(this).addClass("MyacquisR-selectSpanClick");
				//变换输入框中的值
				$("#MyacquisRelation-mol .selectBy",$el).val(level1Input+"/"+ level2Input+"/" + (level3Input || inputArr[2]));
				$("#MyacquisRelation-mol .MyacquisR-selectDivthird",$el).removeClass("MyacquisRHidden");
				
			});
			
			var level3Input = "";
			$(".MyacquisR-selectDivthird",$el).on("click","span",function(e){
				e.stopPropagation();
				level3Input = $(this).text();
				//点击事件span颜色变换
				$(".MyacquisR-selectDivthird span",$el).removeClass("MyacquisR-selectSpanClick");
				$(this).addClass("MyacquisR-selectSpanClick");
				
				$("#MyacquisRelation-mol .selectBy",$el).val(level1Input+"/"+level2Input+"/"+level3Input);
				$(".MyacquisR-selectDiv",$el).addClass("MyacquisRHidden");
				//清除关联指标集输入框
				$("#MyacquisRelation-mol .critical").val("");
			})
			
			//应用对象
			var targetColhtml = '';
			$("#MyacquisRelation-mol .targetCol",$el).on("click",function(e){
				OnlyOpenDiv($("#MyacquisRelation-mol .MyacquisR-targetDiv",$el));
				
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
				e.stopPropagation();
				setTimeout(function(){
					$(".MyacquisR-targetDiv").html(targetColhtml);
					findClickSpan($("#MyacquisRelation-mol .MyacquisR-targetDiv",$el));
				},200);
				
				if($("#MyacquisRelation-mol .MyacquisR-targetDiv",$el).attr("class").indexOf("MyacquisRHidden") == -1){
					$("#MyacquisRelation-mol .MyacquisR-targetDiv",$el).html("");
					$(".MyacquisR-targetDiv").addClass("MyacquisRHidden");
				}else{
					$(".MyacquisR-targetDiv").removeClass("MyacquisRHidden");
					OnlyOpenDiv($("#MyacquisRelation-mol .MyacquisR-targetDiv",$el));
				}
			});
			
			var app_id = "";
			var TargetSpan = "";
			$(".MyacquisR-targetDiv",$el).on("click","span",function(e){
				e.stopPropagation();
				$(".MyacquisR-targetDiv span").removeClass("MyacquisR-selectSpanClick");
				$(this).addClass("MyacquisR-selectSpanClick");
				$(".MyacquisR-targetDiv").addClass("MyacquisRHidden");;
				
				$(".targetCol").val($(this).text());
				app_id = $(this).attr("data-id");

				TargetSpan = $(this).text();
			});
			
			//资源对象获取和点击事件
			var Resoursehtml = '';
			$("#MyacquisRelation-mol .resourseObject",$el).on("click",function(e){
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
					$(".MyacquisR-ResourseDiv").html(Resoursehtml);
					findClickSpan($("#MyacquisRelation-mol .MyacquisR-ResourseDiv",$el));
				},500);
				e.stopPropagation();
				if($("#MyacquisRelation-mol .MyacquisR-ResourseDiv",$el).attr("class").indexOf("MyacquisRHidden") == -1){
					$(".MyacquisR-ResourseDiv").addClass("MyacquisRHidden");
				}else{
					$(".MyacquisR-ResourseDiv").removeClass("MyacquisRHidden");
					OnlyOpenDiv($("#MyacquisRelation-mol .MyacquisR-ResourseDiv",$el));
				}
			});
			
			var obj_id = "";
			var ResourseSpan = "";
			$(".MyacquisR-ResourseDiv",$el).on("click","span",function(e){
				e.stopPropagation();
				obj_id = $(this).attr("data-id");
				$(".MyacquisR-ResourseDiv span").removeClass("MyacquisR-selectSpanClick");
				$(this).addClass("MyacquisR-selectSpanClick");
				$(".MyacquisR-ResourseDiv").addClass("MyacquisRHidden");
				$(".resourseObject").val($(this).text());
				ResourseSpan = $(this).text();
			});
			
			//关联指标集获取和点击事件
			var criticalhtml = '';
			$("#MyacquisRelation-mol .critical",$el).on("click",function(e){
				var criticalhtml = '';
				e.stopPropagation();
				$("#MyacquisRelation-mol .MyacquisR-criticalDiv",$el).html("");
				var levelinput = $("#MyacquisRelation-mol .selectBy").val().split("/");
				var levelobj = {
					"obj_class1":levelinput[0],
					"obj_class2":levelinput[1],
					"obj_class3":levelinput[2],
					'oper' : 'user',		//用户 user(我的)  标准 stand（全局）
					'userName': userName,
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
					for(var i = 0 ; i < result.length ; i ++ ){
						criticalhtml += '<span data-id="'+result[i].kPISet_Def_ID+'">'+result[i].c_NAME+'</span>';
					}
				});
				
				if($("#MyacquisRelation-mol .MyacquisR-criticalDiv",$el).attr("class").indexOf("MyacquisRHidden") == -1){
					$(".MyacquisR-criticalDiv",$el).addClass("MyacquisRHidden");
				}else{
					setTimeout(function(){
						$("#MyacquisRelation-mol .MyacquisR-criticalDiv",$el).html(criticalhtml);
						findClickSpan($("#MyacquisRelation-mol .MyacquisR-criticalDiv",$el));
					},200)
					$(".MyacquisR-criticalDiv",$el).removeClass("MyacquisRHidden");
					OnlyOpenDiv($("#MyacquisRelation-mol .MyacquisR-criticalDiv",$el));
				}
			});
			
			var criticalSpan = "";
			$(".MyacquisR-criticalDiv",$el).on("click","span",function(e){
				e.stopPropagation();
				kpiset_defId = $(this).attr("data-id");
				//表头数据获取
				$("#table_content",$el).removeClass("MyacquisRdisplay");
				app.common.ajaxWithAfa({
					url  : "AFARequestAction_callAfaApp.do",
					data : {
						'appType' : 'APP_CONF',
						'target' : 'KpiSetParam',
						'args': JSON.stringify({
							"kpiSetDefId": parseInt(kpiset_defId),
							'oper' : 'object',		//用户 user(我的)  标准 stand（全局）
							'userName': 'user',
						}),
					}
				}).done(function(data){
					
					var result = data.result.private;
					if(!result && result.length <= 0){
						return;
					}
					var th = '<th>序号</th>';
					for(var i = 0 ; i < result.length ; i ++ ){
						th += '<th>'+ result[i].c_NAME +'</th>';
					}
					th += '<th>操作</th>';
					$("#MyparamSetTable>thead>tr",$el).html("");
					$("#MyparamSetTable>thead>tr",$el).html(th);
					var len = $("#MyparamSetTable thead tr",$el).find("th").length;
					var tbody = '<tr>'+
						'<td colspan="'+len+'"><div id="MyacquisR_addTableTr" style="">添加</div></td>'+
						'</tr>';
					$("#MyparamSetTable>tbody",$el).html(tbody);
					
				});
				
				criticalSpan = $(this).text();//获取到当前的输入框中的值
				//下拉框选中
				$(".MyacquisR-criticalDiv span").removeClass("MyacquisR-selectSpanClick");
				$(this).addClass("MyacquisR-selectSpanClick");
				$(".MyacquisR-criticalDiv").addClass("MyacquisRHidden");
				$("#MyacquisRelation-mol .MyacquisR-criticalDiv",$el).html("");
				$(".critical").val(criticalSpan);
			});
			
			
			//table表排序事件
			function TableSort(){
				
				var trArr = $("#MyparamSetTable tbody tr");
				
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
	            
				$("#MyparamSetTable tbody").html(trArr);
				TableIndex = trArr.length;
			}
			
			//tr编号
			var TableIndex = 1;
			//添加按钮事件
			$("#MyparamSetTable",$el).on("click","#MyacquisR_addTableTr",function(){
				editflag = 0;
				TableSort();
				if($("#MyparamSetTable tbody tr",$el).length == 1){
					TableIndex = 1;
				}
				//依据表头进行数据的填写和修改
				var theadTH = $("#MyparamSetTable thead tr",$el).find("th");
				
				var tableInnerHtml = '<tr>'+
						'<td><span id="MyacquisRelation_index">'+TableIndex+'</span></td>';
				for(var i = 1 ; i < theadTH.length - 1 ; i ++ ){
					tableInnerHtml += '<td><input id="MyacquisRelation_Data'+(i)+'" style="width:80%;margin:0" type="text" /></td>'
				}
				tableInnerHtml += '<td><span class="MyacquisRelation-opreation"><span id="MyacquisR_Save">保存</span>&nbsp;&nbsp;<span id="MyacquisR_Cancel">取消</span></span></td>'+
							'</tr>';

				$("#MyparamSetTable tbody>tr:last-child",$el).before($(tableInnerHtml));
				TableIndex++;
			});
			
			
			
			//保存按钮事件
			$("#MyparamSetTable",$el).on("click","#MyacquisR_Save",function(){
				var ind = $($(this).parent().parent().parent().find("td:nth-child(1)").find("span")).text();
				var tableDataArr = [];
				var theadTH = $("#MyparamSetTable thead tr",$el).find("th");
				for(var i = 1 ; i < theadTH.length - 1 ; i ++ ){
					tableDataArr.push($(this).parent().parent().parent().find("#MyacquisRelation_Data"+i).val())
				}

				var tableInnerHtml = '<tr><td>'+ind+'</td>';
				for(var i = 0 ; i < tableDataArr.length ; i ++ ){
					tableInnerHtml += '<td>'+tableDataArr[i]+'</td>';
				}
				tableInnerHtml += '<td><span class="MyacquisRelation-opreation"><i id="MyacquisR_editTableTr" class="fa fa-edit"></i>&nbsp;&nbsp;<i id="MyacquisR_DelTh" class="fa fa-trash-o"></i></span></td>'+
							'</tr>';
				$(this).parent().parent().parent().remove();
				$("#MyparamSetTable tbody>tr:last-child",$el).before(tableInnerHtml);
				TableSort();
				
			});
			
			//删除按钮事件
			$("#MyparamSetTable",$el).on("click","#MyacquisR_DelTh",function(){
				$(this).parent().parent().parent().remove();
				TableSort();
			});
			
			//取消按钮事件
			$("#MyparamSetTable",$el).on("click","#MyacquisR_Cancel",function(){
				editTrObj = '<tr>'+editTrObj+'</tr>';
				if(editflag == 1){
					$(this).parent().parent().parent().remove();
					$("#MyparamSetTable tbody>tr:last-child",$el).before(editTrObj);
				}
				$(this).parent().parent().parent().remove();
				TableSort();
			});
			
			//编辑按钮事件
			var editflag = 0;
			var editTrObj = null;
			$("#MyparamSetTable",$el).on("click","#MyacquisR_editTableTr",function(){
				editflag = 1;
				editTrObj = $($(this).parent().parent().parent()).html();
				
				var ind = $($(this).parent().parent().parent().find("td:nth-child(1)")).text();
				var tableDataArr = [];
				var theadTH = $("#MyparamSetTable thead tr",$el).find("th");
				for(var i = 1 ; i < theadTH.length - 1 ; i ++ ){
					tableDataArr.push($($(this).parent().parent().parent().find("td:nth-child("+(i+1)+")")).text());
				}
		
				var trArr = $("#MyparamSetTable tbody tr",$el);
				var tableInnerHtml = '<td><span id="MyacquisRelation_index">'+ind+'</span></td>';
				for(var i = 0 ; i < tableDataArr.length ; i ++ ){
					tableInnerHtml += '<td><input id="MyacquisRelation_Data'+(i+1)+'" style="width:80%;margin:0" type="text" value="'+tableDataArr[i]+'" /></td>';
				}
				tableInnerHtml += '<td><span class="MyacquisRelation-opreation"><span id="MyacquisR_Save">保存</span>&nbsp;&nbsp;<span id="MyacquisR_Cancel">取消</span></td>';
				
				for(var i = 0 ; i < trArr.length - 1 ; i ++ ){		
					console.log(parseInt($($(trArr[i]).find("td:nth-child(1)")).text()));
					console.log(ind);
					if(parseInt($($(trArr[i]).find("td:nth-child(1)")).text()) == ind){
						$(trArr[i]).html("");
						$(trArr[i]).append($(tableInnerHtml));
						break;
					}
				}
			});
			
			//新增-采集关系 ----------------------------结束-----------------------------------------------
			
			
			$("#buttion_add",$el).on("click",function(){
				//获取开关状态
				var KPIswitch = "";
				if($("#MyacquisRelation-mol #mol-switch>span",$el).attr("class").indexOf("true") != -1){	//开关开
					KPIswitch = "1";
				}else{
					KPIswitch = "0";
				}
				var selectBy = $(".MyacquisR-model-input .selectBy",$el).val();	//分类
				var targetCol = $(".MyacquisR-model-input .targetCol",$el).val();	
				var resourseObject = $(".MyacquisR-model-input .resourseObject",$el).val();	
				var critical = $(".MyacquisR-model-input .critical",$el).val();	
				var samplfre = $(".MyacquisR-model-input .samplfre",$el).val();	
				
				if(selectBy.indexOf("分类") != -1){
					app.alert("三级菜单必须选择完全");
					return;
				}
				
				if(critical == "" || targetCol == "" || samplfre == ""){
					app.alert("数据必须完整");
					return;
				}
				
				
				var itemList = [];
				
				//获取到表头的长度
				var len = $("#MyparamSetTable thead tr",$el).find("th").length;
				//获取到tbody下tr的长度
				var tbodyTrLen = $("#MyparamSetTable tbody",$el).find("tr").length;
				
				for(var i = 0 ; i < tbodyTrLen - 1 ; i ++ ){
					var trObj = $("#MyparamSetTable tbody",$el).find("tr:nth-child("+(i+1)+")");
					for(var j = 0 ; j < len - 2 ; j ++ ){
						var trtext = trObj.find("td:nth-child("+(j+2)+")").text();
						var obj = {
							"relation_id":relationId,
							"param_index": (i+1),		//行号
							"param_seq": (j+1),			//列号
							"param_val": trtext,
							'obj_id':parseInt(obj_id),
						}
						itemList.push(obj);
					}
				}
				var levelinput = selectBy.split("/");
				var params = {
					'kpiset_def_id':kpiset_defId,
					"obj_class_1":levelinput[0],
					"obj_class_2":levelinput[1],
					"obj_class_3":levelinput[2],
					'collect_inteval':parseInt(samplfre),
					'status':parseInt(KPIswitch),
					'itemList':itemList
				}
				if(flag == 0){		//修改弹窗
					
					if(userName == "admin"){
						params = $.extend({},params,{
							'app_id':parseInt(app_id),
							'obj_id':parseInt(obj_id),
						})
					}else{
						if(obj_id == ""){
							params = $.extend({},params,{
								'app_id':parseInt(app_id),
							})
						}else{
							params = $.extend({},params,{
								'app_id':parseInt(app_id),
								'obj_id':parseInt(obj_id),
							})
						}
					}
					
					app.common.ajaxWithAfa({
						url  : "AFARequestAction_callAfaApp.do",
						data : {
							'appType' : 'APP_CONF',
							'target' : 'CollectConf',
							'args' : JSON.stringify({
								'operate': 'UPDATE',
								'oper':'user',
								'userName': userName,
								'relationId' : relationId,		//对象id	
								'params':params,
							})
						}
					}).done(function(data){
						var result = data.result.private;
						app.alert(result);
						showMyDefine();
					});
				}else if(flag == 1){		//增加弹窗
					
					if(userName == "admin"){
						params = $.extend({},params,{
							'app_id':parseInt(app_id),
							'obj_id':parseInt(obj_id),
						})
					}else{
						if(obj_id == ""){
							params = $.extend({},params,{
								'app_id':parseInt(app_id),
							})
						}else{
							params = $.extend({},params,{
								'app_id':parseInt(app_id),
								'obj_id':parseInt(obj_id),
							})
						}
					}
					
					app.common.ajaxWithAfa({
						url  : "AFARequestAction_callAfaApp.do",
						data : {
							'appType' : 'APP_CONF',
							'target' : 'CollectConf',
							'args' : JSON.stringify({
								'operate': 'ADD',
								'oper':'user',
								'userName': userName,
								'relationId' : relationId,		//对象id	
								'params':params,
							})
						}
					}).done(function(data){
						var result = data.result.private;
						app.alert(result);
						showMyDefine();
					});
				}
				$("#MyacquisRelation-mol",$el).modal("hide");
				
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