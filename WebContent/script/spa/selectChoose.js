/*!
 * Javascript library v3.0
 *
 */

/**
 * [指标数据图表展示]
 * 
 * @param {[undefined]}
 *            undefined [确保undefined未被重定义]
 * @author
 */
( /* <global> */function(undefined) {

	(function(factory) {
		"use strict";
		// amd module
		if (typeof define === "function" && define.amd) {
			define([ "jquery" ], factory);
		}
		// global
		else {
			factory();
		}
	})
			(function() {
				"use strict";
				var table=null;
				var selectArr;
				var modalBodyhtml='<h3>应用与服务器选择</h3>'
					+'<table style="margin-left: 30px;" id="appSer">'
					+'<tr>'
						+'<td>应&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用</td>'
						+'<td id="app_td">'
						   +'<select data-role="app_Sel">'
						         +'<option value="">--请选择--</option>'  
						  + '</select>' 
						 +'</td>'
						 +'<td>&nbsp;服&nbsp;务&nbsp;器&nbsp;</td>'  
						+'<td id="server_td" style="position:relative;">'
						  +' <input data-role="server_Sel" placeholder="--请选择--" style="width: 216px; height: 32px; border-radius: 4px; border: 1px #CCCCCC solid;"></input>'
						  +'<select style="position:absolute;top:60px;display:none;" id="multiServer" multiple></select>'
						+'</td>'  
					+'</tr>'
			+'</table>'
			+'<h3>指标分类选择</h3>'       
			+'<table style="margin-left: 30px;">'
				+'<tr>'
					+'<td>监控对象</td>'
					+'<td>'
					  +'<select data-role="class_2_Sel">'
					         +'<option value="">--请选择--</option>'
					   +'</select>'
					 +'</td>'
					+'<td>对象类型</td>'
					+'<td>'
						+' <select data-role="class_3_Sel">'
						    +   '<option value="">--请选择--</option>'
						+' </select>'
					+'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>指标分类</td>'
				+'<td>'
				  +'<select data-role="class_4_Sel">'
				         +'<option value="">--请选择--</option>'
				   +'</select>'
				 +'</td>'
				+'<td>&nbsp;指&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;标</td>'
				+'<td>'
					+' <select data-role="propertySel">'
					    + '<option value="">--请选择--</option>'
					+' </select>'
				+'</td>'
			+'</tr>'
			+'</table>'
			+'<table id="radioTb" style="" class=" table table-striped table-bordered table-hover">'
				+'<thead>'
					+'<tr>'
						+'<th style="width:10%">编号</th>'
						+'<th>指标</th>'
						+'<th>展示类型</th>'
						+'<th>状态</th>'
						+'<th>名称</th>'
					+'</tr>'
				+'</thead>'
				+'<tbody>'
				+'</tbody>'
			+'</table>';
				var initModalBody= function (selector,$el,context, scope, handler,flag){
					//定义点击事件，使multiSelect能够隐藏
					/*context.delegateEvents({
						'click #app_td' : function(event) {}
					});*/
					$(selector,$el).off('mousedown').on('mousedown',function(event){  
						var $server_td = $(event.target|| window.event.srcElement).closest('#server_td');
						if($server_td.length==0){
							$('#multiServer',$el).multiSelect&&$('#multiServer',$el).multiSelect('destroy');
						}
					});    
					$(selector+">.modal-body",$el).empty().append($(modalBodyhtml));
	        		initAppAndServer($el, scope, handler);
					initAllSel($el, scope, handler);
	        		addSelectListener(selector,context,$el, scope, handler,flag);
	        		appChange(selector,context,$el, scope, handler);
	        		//attention 注意$el;
			        }
				
				//点击保存按钮，提交信息之前验证
				//attention
				function validate($el){
					var appSelVal=$('#app_td>.tinyselect .item',$el).filter('.selected').data('value')||$('[data-role=app_Sel]',$el).val();
					var serverSelVal=$('[data-role=server_Sel]', $el).data('server_Sel');
					var Class2Val=$('[data-role=class_2_Sel]', $el).val();
					var Class3Val=$('[data-role=class_3_Sel]', $el).val();
					var Class4Val=$('[data-role=class_4_Sel]', $el).val();
					var proSelVal= $('[data-role=propertySel]', $el).val();
					var showSelVal =$('[data-role=showtypeSel]', $el).val();
					var staSelVal = $('[data-role=stateSel]', $el).val();
					var radioVal=$('#radioTb>tbody>tr>td>input:checked',$el).val();
					if(!appSelVal){
						app.alert('请选择应用！');
						return false;
					};     
					if(!serverSelVal&&Class2Val!='数据库'&&Class2Val!='中间件'&&Class2Val!='交易监控'){ 
						app.alert('请选择服务器！');
						return false;   
					};
					if(!Class2Val){
						app.alert('请选择监控对象！');
						return false;
					};
					if(!Class3Val){
						app.alert('请选择对象类型！');
						return false;
					};  
					if(!Class4Val){
						app.alert('请选择指标分类！');
						return false;
					};
					if(!proSelVal){  
						app.alert('请选择指标！');
						return false;
					};    
					if(!radioVal){  
						app.alert('请点击单选按钮，选择一项图表详情！');
						return false;
					};
					return true;
			        }
				     
				function getTbStr(showType, state) {
					var TbStr;
					var showTypeStr;
					var stateStr;
					if (showType === "line") {
						showTypeStr = "折线图/柱状图";
						if (state === "01") {
							stateStr = "固定图例";
						} else if (state === "02") {
							stateStr = "固定图例动态打点";
						} else if (state === "11") {
							stateStr = "动态图例";
						} else {
							stateStr = "动态图例动态打点";
						}
					} else if (showType === "pie") {
						showTypeStr = "饼状图/漏斗图";
						if (state === "0") {
							stateStr = "固定图例";
						} else {
							stateStr = "动态图例";
						}
					} else {
						showTypeStr = "表格";
						if (state === "0") {
							stateStr = "前端分页";
						} else {
							stateStr = "服务端分页";
						}
					}
					TbStr = [ showTypeStr, stateStr ];

					return TbStr;
				}
				
				
				// 插入表格标签
				function CreTb(configData, $el, flag) {
					var flag1 = flag || 1;
					function CreTb1(configData, $el) {
						var temp;
						for (var j = 0, len = configData.length; j < len; j++) {
							if (configData[j].showType !== "table") {
								var value = configData[j].kpi_Def_ID + ","
										+ configData[j].showType + ","
										+ configData[j].state + ","
										+ configData[j].radioDisplay+","
										+ configData[j].showId,
								propertyVal = $('[data-role=propertySel]',$el).val(),
								propertyName = $('[data-role=propertySel] [value='+ propertyVal + ']',$el).text(),
								strs = getTbStr(configData[j].showType,configData[j].state);
								$('#radioTb>tbody', $el).append(
										'<tr><td><input type="radio" name="classify" value="'
												+ value + '">' + (j + 1)
												+ '</td></tr>');
								$("#radioTb>tbody tr:last", $el).append('<td>' + propertyName + '</td>');
								$("#radioTb>tbody tr:last", $el).append('<td>' + strs[0] + '</td>');
								$("#radioTb>tbody tr:last", $el).append('<td>' + strs[1] + '</td>');
								//$("#radioTb>tbody tr:last", $el).append('<td>' + configData[j].kpishowname+ '</td>');
								$("#radioTb>tbody tr:last", $el).append('<td>' + configData[j].kpishowname+'<input type="hidden" data-role="kpishowname" value='+configData[j].kpishowname+' />'+ '</td>');
							}
						}
						$("#radioTb>tbody [type=radio]:first", $el).attr("checked", "true");
					};
					function CreTb2(configData, $el) {
						var temp;
						for (var j = 0, len = configData.length; j < len; j++) {
							var value = configData[j].kpi_Def_ID + ","
									+ configData[j].showType + ","
									+ configData[j].state + ","
									+ configData[j].radioDisplay+","
									+ configData[j].showId,
							propertyVal = $('[data-role=propertySel]',$el).val(),
							propertyName = $('[data-role=propertySel] [value='+ propertyVal + ']',$el).text(),
							strs = getTbStr(configData[j].showType,configData[j].state);
							$('#radioTb>tbody', $el).append('<tr><td><input type="radio" name="classify" value="'+ value + '">' + (j + 1)+ '</td></tr>');
							$("#radioTb>tbody tr:last", $el).append('<td>' + propertyName + '</td>');
							$("#radioTb>tbody tr:last", $el).append('<td>' + strs[0] + '</td>');
							$("#radioTb>tbody tr:last", $el).append('<td>' + strs[1] + '</td>');
							$("#radioTb>tbody tr:last", $el).append('<td>' + configData[j].kpishowname+'<input type="hidden" data-role="kpishowname" value='+configData[j].kpishowname+' />'+ '</td>');
						}
						$("#radioTb [type=radio]:first", $el).attr("checked","true");
					};
					if (flag1 === 1) {
						CreTb1(configData, $el);
					} else if (flag1 === 2) {
						CreTb2(configData, $el);
					}
					if(table&&table.fnDestroy){
						table.fnDestroy();
					}
						table=initUserTb($el);
				}
				
				// 初始化datatable表格
				function initUserTb($el) {
					return $('#radioTb', $el).dataTable({
						"pageLength" : 5,
						"iDisplayLength" : 5, 
						'bDestroy' : true,
						'bStateSave' : true,
						'bFilter' : false, // 过滤功能，默认true
						'bInfo': false,//开关，是否显示表格的一些信息
						'bLengthChange':false,//开关，是否显示一个每页长度的选择条（需要分页器支持），默认true
						'bPaginate':false,//开关，是否显示（使用）分页器，默认true
						"aaSorting" : [ [ 1, 'desc' ] ],
						"columnDefs" : [ {
							width : '20%',
							targets : 0
						} ]
					});
				}
                var dispose=function(){
                	if(table&&table.fnDestroy){
                		table.fnDestroy();
                	}else{
                	}
                	
                }
				var initAllSel = function($el, scope, handler) {
					
					$('[data-role=class_2_Sel]', $el).empty();
					$('[data-role=class_3_Sel]', $el).empty();
					$('[data-role=class_4_Sel]', $el).empty();
					$('[data-role=propertySel]', $el).empty();
					$('[data-role=showtypeSel]', $el).empty();
					$('[data-role=stateSel]', $el).empty();
					$('#radioTb>tbody', $el).empty();
					
					/*pageflag:
						 * 1-一线监控-应用 2-一线监控-操作 3-一线监控-系统 4-应用总览 5-交易监控 6-应用启停  7-服务器 8-中间件 9-应用
						 * 10-操作系统 11-数据库 801-中间件（MQ）802-中间件（tomcat）… 1101-数据库(ORACLE)
						 * 1102-数据库（DB2）…  12 应用系统*/
					  
					var pageflagJson={
							"1":["一线监控-应用"],  
							"2":["一线监控-操作"], 
							"3":["一线监控-系统"], 
							"4":["应用总览"], 
							"5":["交易监控"],  
							"6":["应用启停"], 
							"7":["服务器"],   
							"8":["中间件"], 
							"801":["中间件","MQ"],
	    		            "802":["中间件","tomcat"],
	    		            "803":["中间件","CD"],
	    		            "804":["中间件","CiCs"],
	    		            "805":["中间件","Exchange"],
	    		            "806":["中间件","IHS"],
	    		            "807":["中间件","WEBSPHERE"],
	    		            "808":["中间件","其它软件"],
							"9":["应用监控"], 
							"10":["操作系统"], 
							"11":["数据库"], 
							"1101":["数据库","ORACLE"], 
							"1102":["数据库","DB2"], 
							"1103":["数据库","MYSQL"],
							"1104":["数据库","SQLSERVER"],  
							"1105":["数据库","SYBASE"],  
							"12":["应用系统"]
					};  

					var $Class2=$('[data-role=class_2_Sel]', $el),
					$Class3=$('[data-role=class_3_Sel]', $el),
					$Class4=$('[data-role=class_4_Sel]', $el),
					$proSel= $('[data-role=propertySel]', $el),
					$showSel =$('[data-role=showtypeSel]', $el),
					$staSel = $('[data-role=stateSel]', $el);
					
					var selArray = [$Class2,$Class3,$Class4,$proSel,$showSel,$staSel];
					var funArray = [setClass2,setClass3,setClass4];
					
					//var pageflag =app.domain.get("appAll","pageflag")||"0";
					var pageflag =$('[name=pageFlag]',$el).val()||"0",

					pageSel = pageflagJson[pageflag],
					len = selArray.length;
					
					if(pageflag==="0"){
						
						for(var i = 0;i< len; i ++){
							selArray[i].append('<option value="">--请选择--</option>');
						}
						// 加载配置
						setClass2($el);
					}else if(pageSel!==undefined){
						
						var pageSelLen = pageSel.length;
						
						for(var i=0;i<len;i++){
							if(i<pageSelLen){
								selArray[i].append('<option value="'+pageSel[i]+'" >'+pageSel[i]+'</option>');
							}else if(i<pageSelLen+1){
								
							}else{
								selArray[i].append('<option value="">--请选择--</option>')
							}
						}
						funArray[pageSelLen]($el);
					}
				}

				var initAppAndServer = function($el, scope, handler) {
					var appId = $('[name=appId]',$el).val(),
					serverId = $('[name=serverId]',$el).val();
					if(appId===undefined){
						$('.tinyselect', $el).remove();
						$('[data-role=app_Sel]', $el).empty();
						$('[data-role=server_Sel]', $el).val('').removeData();
						$('#multiServer',$el).empty().multiSelect&&$('#multiServer',$el).multiSelect('destroy');
						$('[data-role=app_Sel]', $el).append('<option value="">--请选择--</option>');
						$.ajax({
							"type" : "POST",
							"url" : "AppAndServerAction_setAppByUser.do",
							"data" : {},
							shelter : '正在加载数据，请稍候…',
							"success" : function(data) {
								if (data.status) {
									var appList = data.content.appList,
									obj_id = appList.obj_id,
									c_name = appList.c_name;
									for (var i = 0, len = c_name.length; i < len; i++) {
										$('[data-role=app_Sel]', $el).append('<option value="'+ obj_id[i]+ '">'+ c_name[i]+ '</option>');
									}
									$('[data-role=app_Sel]', $el).tinyselect();
								}
							}
						});
						
					}else if(appId!==undefined&&serverId===undefined){
						
						$('.tinyselect', $el).remove();
						$('[data-role=app_Sel]', $el).empty();
						$.ajax({
	    					"type": "POST",
	    					"url": "AppAndServerAction_setAppById.do",
	    					"data": {appId:appId},
	    				    shelter:'正在加载数据，请稍候…',
	    					"success": function (data) {
	    						var appId=data.content.appData.app_id,
	    						appName=data.content.appData.c_name;
	    						$('[data-role=app_Sel]', $el).append('<option value="'+appId+'">'+appName+'</option>').attr("disabled",true);
	    					}
	    				});
						
						setServer($el,appId);
						
					}else if(appId!==undefined&&serverId!==undefined){
						$('.tinyselect', $el).remove();
						$('[data-role=app_Sel]', $el).empty();
						$('[data-role=server_Sel]', $el).val('').removeData();;
						$.ajax({
	    					"type": "POST",
	    					"url": "AppAndServerAction_setServerById.do",
	    					"data": {appId:appId,serverId:serverId},
	    				    shelter:'正在加载数据，请稍候…',    
	    					"success": function (data) {  
	    						var appId=data.content.appData.app_id,
	    						appName=data.content.appData.c_name,
	    						serverId=data.content.serverData.server_id,
	    						serverName=data.content.serverData.c_name,
	    						osType=data.content.serverData.os_item+'',
	    						tets=$('[data-role=app_Sel]', $el);
	    						$('[data-role=app_Sel]', $el).append('<option value="'+appId+'">'+appName+'</option>').attr("disabled",true).attr("style",'display:inline-block');
	    						//$('[data-role=server_Sel]', $el).append('<option value="'+serverId+','+osType+'">'+serverName+'</option>').attr("disabled",true);
	    						$('[data-role=server_Sel]', $el).val(serverName).data({'server_Sel':serverId,'osType':osType}).attr("disabled",true);
	    					}
	    				});
					}
				}

				var appChange = function(selector,context, $el, scope, handler) {
					context.delegateEvents({
						'click #app_td' : function(event) {
							var $li = $(event.target|| window.event.srcElement).closest('li');
							if ($li.hasClass('item')&&$li.hasClass('selected')) { 
								console.info("enter 2");
								var appId = $(event.target).attr('data-value');
								$('#multiServer', $el).empty();
								$('[data-role=server_Sel]',$el).val("").removeData("server_Sel");
					        	$('#multiServer',$el).multiSelect&&$('#multiServer',$el).multiSelect('destroy');
								setServer($el,appId);
								//attention1 这里需要注意一下
								if(($("[data-role=class_2_Sel]",$el).val())==="操作系统"){
									console.info("enter 3");   
									setClass2($el);
								}
							}
						},
						'click [data-role=server_Sel]':function(){
							   //判断appid是否选择
							    var appSel = $('#app_td>.tinyselect .item',$el).filter('.selected').data('value');
							    if(appSel==undefined||appSel==''){
							    	app.warning({
										title:'警告',
										content:'请先选择应用',
										btnConfirm:'确定',
									});
							    	return;
							    }  
							    $('#multiServer',$el).multiSelect({
							    	//keepOrder:true,  
							    	selectableHeader:'<div class="">可选择服务器</div>',
							    	selectionHeader:'<div class="">已选择服务器</div>',
							    	afterSelect:function(value){
							    	var ms=$('#multiServer',$el);
							        $('#multiServer>option[value="'+value+'"]',$el).attr('selected',true);
							    	var values = ms.val(); 
						        	var texts = '';
						        	$('option:selected',ms).each(function(index,element){
						        		
						        		if(index==$('option:selected',ms).length-1){
						        			texts = texts +$(this).text()+''
						        		}else{
						        			texts = texts + $(this).text()+','
						        		}
						        	});  
						        	$('[data-role=server_Sel]',$el).val(texts).data("server_Sel",values);//必须注意$el
						        	//添加osType
						        	var  firstStr = $('option:selected',ms).first().val();
						        	if(firstStr){
						        	var  firstArr = firstStr.split(",");
						        	var  osType = firstArr[1]==undefined?'':firstArr[1]+'';
						        	$('[data-role=server_Sel]',$el).data("osType", osType);//必须注意$el
						        	}else{
						        	$('[data-role=server_Sel]',$el).data("osType", '');	
						        	}
						        	//setClass3  
						        	if ($('[data-role=server_Sel]',$el).val()) {
										 
										if(($("[data-role=class_2_Sel]",$el).val())==="操作系统"){
											setClass3($el);
										}  
									};
							    	},
							    	afterDeselect:function(value){
							    		var ms=$('#multiServer',$el);
								        $('#multiServer>option[value="'+value+'"]',$el).attr('selected',false);
								    	var values = ms.val(); 
							        	var texts = '';
							        	$('option:selected',ms).each(function(index,element){
							        		
							        		if(index==$('option:selected',ms).length-1){
							        			texts = texts +$(this).text()+''
							        		}else{
							        			texts = texts + $(this).text()+','
							        		}   
							        	});           
							        	$('[data-role=server_Sel]',$el).val(texts);
							        	$('[data-role=server_Sel]',$el).data("server_Sel",values);//必须注意$el
							        	//添加osType
							        	var  firstStr = $('option:selected',ms).first().val();
							        	if(firstStr){  
							        		var  firstArr = firstStr.split(",");
							        		var  osType = firstArr[1]==undefined?'':firstArr[1]+'';
							        	$('[data-role=server_Sel]',$el).data("osType", osType);//必须注意$el
							        	}else{
							        	$('[data-role=server_Sel]',$el).data("osType", '');	     
							        	}  
							        	if ($('[data-role=server_Sel]',$el).val()) {
											 
											if(($("[data-role=class_2_Sel]",$el).val())==="操作系统"){
												setClass3($el);
											}  
										}else if(!$('[data-role=server_Sel]',$el).val()&&($("[data-role=class_2_Sel]",$el).val())==="操作系统"){
											setClass2($el);    
										};   
							    	}
							    });   
						},    
					});
				}
				// //定义监听start
				var addSelectListener = function(selector,context, $el, scope, handler,
						flag) {  
					context.delegateEvents({
								'change [data-role=class_2_Sel]' : function() {
									setClass3($el);
								},
								'change [data-role=class_3_Sel]' : function() {
									setClass4($el);
								},
								'change [data-role=class_4_Sel]' : function() {
									setProperty($el,flag);
								},
								'change [data-role=propertySel]' : function() {
									setShowtype($el,flag);
								},

								'change [data-role="showtypeSel"]' : function() {
									setState($el,flag);
								}
							});
				}
				
				
				function setClass2($el) {
					dispose();
					//
					// 加载配置
							$.ajax({
								"type" : "POST",
								"url" : "GangedAction_setObj_Class_2.do",
								"data" : {
								},
								shelter : '正在加载数据，请稍候…',
								"success" : function(data) {
									if (data.status) {
										var obj_Class_2 = data.content.obj_Class_2;
										clearSelect(5,$el);
										for (var i = 0, len = obj_Class_2.length; i < len; i++) {
											$('[data-role=class_2_Sel]',$el).append('<option value="'+ obj_Class_2[i]+ '">'+ obj_Class_2[i]+ '</option>');
										}

									}
								}
							});
				}
				
				function setClass3($el){
					dispose();
					var obj_Class_2 = $('[data-role=class_2_Sel]',$el).val();
					var serverVal;   
					
					//attention2    
					if(obj_Class_2==="操作系统"){
						serverVal =$('[data-role=server_Sel]',$el).data("osType");  
					//	serverVal= $('[data-role=server_Sel]',$el).data('server_Sel')&&$('[data-role=server_Sel]',$el).data('server_Sel')[0];
						if((serverVal===undefined||serverVal==='')&&$('[name=osType]',$el).val()===undefined){
							app.warning({
								title:'警告',  
								content:'请选择服务器',  
								btnConfirm:'确定'
							});
							return ;  //8月4日  修改
						}else{
							var strs = new Array();    
							var osType;
							//attention3
							if(serverVal!==undefined){
								serverVal = serverVal + '';    
								strs = serverVal.split(",");  
								osType=$('[name=osType]',$el).val()|| $('[data-role=server_Sel]',$el).data('osType')+'';
							}else{   
								osType=$('[name=osType]',$el).val();
							}
							$('[data-role=class_3_Sel]',$el).empty();
							$('[data-role=class_4_Sel]',$el).empty();
							$('[data-role=propertySel]',$el).empty();
							$('[data-role=showtypeSel]',$el).empty();
							$('[data-role=stateSel]',$el).empty();
							$('#radioTb>tbody', $el).empty();
							$('[data-role=class_4_Sel]',$el).append('<option value="">--请选择--</option>');   
							$('[data-role=propertySel]',$el).append('<option value="">--请选择--</option>');
							$('[data-role=showtypeSel]',$el).append('<option value="">--请选择--</option>');
							$('[data-role=stateSel]',$el).append('<option value="">--请选择--</option>');
							 if(osType==="Windows"){
								$('[data-role=class_3_Sel]',$el).append('<option value="'+osType+'">'+osType+'</option>');
							}else{
								$('[data-role=class_3_Sel]',$el).append('<option value="UNIX">UNIX</option>');
							}
							
							setClass4($el);
						}
					}else{
						// 加载配置
						$.ajax({
							"type" : "POST",
							"url" : "GangedAction_setObj_Class_3.do",
							"data" : {
								obj_Class_2 : obj_Class_2
							},
							shelter : '正在加载数据，请稍候…',
							"success" : function(data) {
								if (data.status) {
									var obj_Class_3 = data.content.obj_Class_3;
									clearSelect(4,$el);
									for (var i = 0, len = obj_Class_3.length; i < len; i++) {
										$('[data-role=class_3_Sel]',$el).append('<option value="'+ obj_Class_3[i]+ '">'+ obj_Class_3[i]+ '</option>');
									}

								}
							}
						});
					}
				
				}
				
				function setClass4($el){
					dispose();
					var obj_Class_3 = $('[data-role=class_3_Sel]',$el).val(),
					obj_Class_2 = $('[data-role=class_2_Sel]', $el).val(),
					serverVal= $('[data-role=server_Sel]',$el).data('server_Sel')&&$('[data-role=server_Sel]',$el).data('server_Sel')[0],
					strs = new Array(),
					osType;   
					if(serverVal!==undefined){
						serverVal = serverVal + '';    
						strs = serverVal.split(",");  
						osType=$('[name=osType]',$el).val()||$('[data-role=server_Sel]',$el).data('osType')+'';
					}else{
						osType=$('[name=osType]',$el).val()||$('[data-role=server_Sel]',$el).data('osType')+'';
					}   
					// 加载配置     
					$.ajax({
						"type" : "POST",
						"url" : "GangedAction_setKPI_Class_4.do",
						"data" : { obj_Class_2 : obj_Class_2,obj_Class_3 : obj_Class_3,serverType:osType},
						shelter : '正在加载数据，请稍候…',
						"success" : function(data) {
							if (data.status) {
								var KPI_Class_4 = data.content.KPI_Class_4;
								clearSelect(3,$el);
								for (var i = 0, len = KPI_Class_4.length; i < len; i++) {
									$('[data-role=class_4_Sel]',$el).append('<option value="'+ KPI_Class_4[i]+ '">'+ KPI_Class_4[i]+ '</option>');
								}

							}
						}
					});
				
				}
				
				function setProperty($el,flag){

					dispose();
					var KPI_Class_4 = $('[data-role=class_4_Sel]', $el).val(),
					obj_Class_3 = $('[data-role=class_3_Sel]', $el).val(),
					obj_Class_2 = $('[data-role=class_2_Sel]', $el).val();
					
					// 加载配置
					$.ajax({
								"type" : "POST",
								"url" : "GangedAction_setKPI_Class_5.do",
								"data" : {
									obj_Class_2 : obj_Class_2,
									obj_Class_3 : obj_Class_3,
									KPI_Class_4 : KPI_Class_4
								},
								shelter : '正在加载数据，请稍候…',
								"success" : function(data) {
									if (data.status) {
										var KPI_Class_5 = data.content.KPI_Class_5;
										clearSelect(2,$el);
										for (var i = 0, len = KPI_Class_5.length; i < len; i++) {

											$('[data-role=propertySel]',$el)
													.append('<option value="'+ KPI_Class_5[i][0]+ '">'+ KPI_Class_5[i][1]+ '</option>');
										}

									}
								}
							});
				
				}
				
				function setShowtype($el,flag){

					dispose();
					var kpi_Def_ID = $('[data-role=propertySel]',$el).val();

					// 加载配置
					$.ajax({
							"type" : "POST",
							"url" : "GangedAction_setShowtype.do",
							"data" : {kpi_Def_ID : kpi_Def_ID},
							shelter : '正在加载数据，请稍候…',
							"success" : function(data) {
								if (data.status) {
									var showtype = data.content.showtype;
									var configData = data.content.configData;
									clearSelect(1,$el);
									$('#radioTb>tbody', $el).empty();
									for (var i = 0, len = showtype.length; i < len; i++) {
										if (showtype[i] === "line") {
											$('[data-role=showtypeSel]',$el).append('<option value="'+ showtype[i]+ '">折线图/柱状图</option>');
											} else if (showtype[i] === "pie") {
												$('[data-role=showtypeSel]',$el).append('<option value="'+ showtype[i]+ '">饼状图/漏斗图</option>');
											} else {
												 $('[data-role=showtypeSel]',$el).append('<option value="'+showtype[i]+'">表格</option>');
												 
											}
										}
										CreTb(configData, $el,flag);

									}
								}
							});
				
				}
				
				function setState($el,flag){
					dispose();
					var kpi_Def_ID = $('[data-role=propertySel]', $el).val(),
					showtype = $('[data-role=showtypeSel]',$el).val();
					$('[data-role=stateSel]', $el).empty();
					$('[data-role=stateSel]', $el).append('<option value="">--请选择--</option>');
					$('#radioTb>tbody', $el).empty();
					// 加载配置
					$.ajax({
						"type" : "POST",
						"url" : "GangedAction_setState.do",
						"data" : {kpi_Def_ID : kpi_Def_ID,showtype : showtype},
						shelter : '正在加载数据，请稍候…',
						"success" : function(data) {
							if (data.status) {
								var configData = data.content.configData;
								CreTb(configData, $el,flag);
							}
						}
					});
				
				}
				
				function setServer($el,appId){
					$.ajax({
						"type" : "POST",
						"url" : "AppAndServerAction_setServerByApp.do",
						"data" : {appId : appId},
						shelter : '正在加载数据，请稍候…',
						"success" : function(data) {
							if (data.status) {
								var serverList = data.content.serverList,
								obj_id = serverList.obj_id,
								c_name = serverList.c_name,
								os_item= serverList.os_item;
								for (var i = 0, len = c_name.length; i < len; i++) {
									$('#multiServer',$el).append('<option value="'+ obj_id[i]+ ','+ os_item[i]+ '">'+ c_name[i]+ '</option>');
								}
							}
						}
					});
				}
				
				function clearSelect(clearNum,$el){
					selectArr=[$('[data-role=showtypeSel]', $el),$('[data-role=propertySel]', $el),$('[data-role=class_4_Sel]', $el),$('[data-role=class_3_Sel]', $el),$('[data-role=class_2_Sel]', $el),$('#radioTb>tbody', $el)];
					var endNum = clearNum -1;
					for(var i = 0;i<clearNum;i++){
						if(i===endNum){
							selectArr[i].empty();
							selectArr[5].empty();
							selectArr[i].append('<option value="">--请选择--</option>');
						}else{
							selectArr[i].empty();
							selectArr[i].append('<option value="">--请选择--</option>');
						}
					}    
				};
				// 定义监听end
				return {
					initModalBody:initModalBody,
					validate:validate
				}

			});

})();