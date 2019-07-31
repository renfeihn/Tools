define([ "jquery","echarts" ], function($,echarts) {

	
	return {
		load : function($el, scope, handler) {
			// 操作历史dataTable配置
			var PATH='';
			var $dataTable = $("#dataTable_data", $el).DataTable({
				'bPaginate': true, // 开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,// 排序
				'searching': false,  // 搜索框是否显示
				'pageLength': 10,// 设置表格分页长度
				'columns':[{
					data:'index',// 序号
				},{
					data:'time',defaultContent:''
				},{
					data:'people',defaultContent:''
				},{
					data:'ip',defaultContent:''
				},{
					data:'inst_no',defaultContent:''
				},{
					data:'inst_name',defaultContent:''
				},{
					data:'execute_action',defaultContent:''
				},{
					data:'execute_result',defaultContent:''
				}],
				
				'aoColumnDefs':[
					{
						'render':function(data,type,row,meta){
							if(data=="1"){
								return '<span class="AFAInfoDetails-succ" ><i class="fa fa-circle"  style="color:#22AC38;font-size: 12px;"></i>成功</span>';// 成功
							}else{
								return '<span class="AFAInfoDetails-succ" ><i class="fa fa-circle"  style="color:#FF3341;font-size: 12px;"></i>失败</span>';// 失败
							}
						},
						'targets':7
					},
					{
						'render':function(data,type,row,meta){
							// 1-配置文件修改 2-服务重启 3-物理机重启
						  var res= data.split("-");
							if(res[1]=="1"){
								if(res[0] == '00'){
									res[0] = 'ABS';
								}else if(res[0] == '01'){
									res[0] = 'AFA';
								}
								return res[0]+"配置文件修改";
							}
							
						},
						'targets':6
					}	
				]
			
			});
			// 实例的基础配置信息表格
			var $dataTableBase= $("#dataTable_base", $el).DataTable({
				'bPaginate': false, // 开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,// 排序
				'searching': false,  // 搜索框是否显示
				'pageLength': 20,// 设置表格分页长度
				'columns':[{
					data:'index',// 序号
				},{
					data:'inst_no',defaultContent:''
				},{
					data:'inst_name',defaultContent:''
				},{
					data:'inst_type',defaultContent:''
				},{
					data:'ip',defaultContent:''
				}]
			
			});
			
			// 获取配置列表 生成树
			getFilePath();
			// 插入表格数据
			loadTableData("history");
			
			// 选择ABS列表或者选择AFA列表
			$('input[type="radio"]',$el).on('change',function(e){
				var val=$('input[type="radio"]:checked',$el).val();
				if(val=='ABS'){
					$('#fileUl',$el).removeClass('hide').siblings('ul').addClass('hide');
					$('#title',$el).text("ABS文件管理");
				}else if(val=="AFA"){
					$('#fileUl',$el).addClass('hide').siblings('ul').removeClass('hide');
					$('#title',$el).text("AFA文件管理");
				}
				//去掉已选实例
				$('.checkedBox',$el).find('li').each(function(){
					if($(this).text().indexOf(val) == -1){
						$('.checkedBox',$el).empty();
						$('#showModal>span',$el).text('('+$('.checkedBox>li',$el).length+')');
					}
				});
				$('.textContainer',$el).empty();
				getFilePath();
				
			});

			//操作方式选择
			var opType = '';
			$('#op_type',$el).click(function(){
				$(this).find('span').toggleClass('hide');
			});
			$('#op_type',$el).mouseleave(function(){
				$(this).find('span').addClass('hide');
			});
			$('#op_type>span',$el).click(function(){
				var text = $(this).text();
				$('#op_type',$el).removeClass('btn-tip');
				$('#operts',$el).text(text);
				if(text == '单独操作'){
					opType = 'singleOP';
				}else if(text == '批量操作'){
					opType = 'totalOP';
				}
			});

			//打开实例窗口
     	 	$("#showModal", $el).click(function(){
     	 		var treeType = $('.ztree:not(.hide)',$el).attr('data-type');
     	 		$('#myModalLabel').text(treeType+'实例列表');
     	 		if(opType == 'totalOP'){
					$('#isChangeAll',$el).css('visibility','visible');
				}else if(opType == 'singleOP'){
					$('#isChangeAll',$el).css('visibility','hidden');
				}else{
					app.alert('请选择操作方式');
					return;
				}
     	 		
				$("#modal", $el).modal('show');

				var $isChangeAll=$("#isChangeAll", $el);
				var val=$('input[type="radio"]:checked',$el).val();
				if(val.indexOf('ABS')>=0){
					var options={
							'appType':'APP_AB3',
							'target':'ABS_ServInstList',
							'args' : JSON.stringify({
								'platform_name' : 'ABS'
							})
					}
					loadTableData("baseConfig",options);
				}else if(val.indexOf('AFA')>=0){
					var options={
							'appType':'APP_AB3',
							'target':'ABS_ServInstList',
							'args' : JSON.stringify({
								'platform_name' : 'AFA'
							})
					}
					loadTableData("baseConfig",options);
				}
				if($isChangeAll.hasClass("fa-check")){
					$isChangeAll.removeClass('fa-check');
				};

			});
			
			

			//表格实例选择
			$('#dataTable_base tbody',$el).on('click','i',function(e){
				var $that=$(this,$el);
				if(opType == 'totalOP'){
					if ($that.hasClass("fa-check")){
						$that.removeClass("fa-check");
						canUse();
					}else{
						$that.addClass("fa-check");
						canUse();
					};
					isAll();
				}else if(opType == 'singleOP'){
					if ($that.hasClass("fa-check")){
						$that.removeClass("fa-check");
						canUse();
					}else{
						$('#dataTable_base tbody i').removeClass("fa-check");
						$that.addClass("fa-check");
						canUse();
					};
				}
			});

			// 选择实例弹窗
			$("#confmBtn",$el).on("click",function(){
				var selected=$("#dataTable_base tbody .fa-check",$el),
				    ParentSelect=selected.parent().parent(),
				    instance_arr=[],
				    instance_name=[];
				ParentSelect.each(function(){
					var $t = $(this,$el); 
					var tr = $dataTableBase.row($t).data();
					instance_name.push(tr.inst_name);
					instance_arr.push(tr);
				});
				if(instance_arr.length>0){
					$('#showModal',$el).removeClass('btn-tip');
				}

				//选中实例标签
				var checkedIns= ''
				for(var i=0,length=instance_arr.length;i<length;i++){
					checkedIns+= '<li class="checkedIns">'+instance_arr[i].inst_name+'<i class="fa fa-remove removeIns"></i></li>'
				}
				$('#showModal>span',$el).text('('+instance_arr.length+')');
				$('#slides',$el).removeClass('hide').find('.checkedBox').html(checkedIns);

				//控制分页按钮显隐
				var ulWidth = parseInt($('.checkedBox',$el).css('width')),
					boxWidth = parseInt($('.slideBox',$el).css('width'));
				if(ulWidth > boxWidth){
					$('#slideToLeft,#slideToRight',$el).removeClass('hide');
				}

				var val=$("input[type='radio']:checked",$el).val();
				
				$("#showModal",$el).data('instance',instance_arr);
				$("#showModal",$el).data('instname',instance_name);
				if(val=="ABS"){
					var treeObj = $.fn.zTree.getZTreeObj("fileUl");
				}else {
					var treeObj = $.fn.zTree.getZTreeObj("fileAFA");
				}
				var sNodes = treeObj.getSelectedNodes();
				/*if (sNodes.length > 0) {
					$('a.curSelectedNode',$el).trigger('click');
				}*/

				$('.slideBox .checkedBox>li:first-child',$el).trigger('click');
				
			});

			

			// 批量管理按钮置
			canUse();
			function canUse(){
				var len=$('#dataTable_base tbody i.fa-check',$el).length,
				    $confmBtn=$("#confmBtn",$el);
				if(len>0){
					// 将批量关系按钮置为可用
					 $confmBtn.attr("data-dismiss","modal");
					 $confmBtn.removeClass("disabled");
					 $confmBtn.addClass("confmBtn");
				}else{
					// 将批量关系按钮置为不可用
					 $confmBtn.attr("data-dismiss","no");
					 $confmBtn.addClass("disabled");
					 $confmBtn.removeClass("confmBtn");
				}
					
			}
			// 弹框中的取消
			$('.cancelBtn',$el).on('click',function(e){
				var $confmBtn=$("#confmBtn[data-dismiss=modal]",$el),
				   	leng=$confmBtn.length;
				if(leng){
					 $confmBtn.attr("data-dismiss","no");
					 $confmBtn.addClass("disabled");
					 $confmBtn.removeClass("confmBtn");
				}
			})

			// 全选按钮是否选中
			function isAll(){
				var len=$('#dataTable_base tbody i:not(".fa-check")',$el).length;
				if(len>0){
					$('.all-select',$el).removeClass('fa-check');
				}else{
					$('.all-select',$el).addClass('fa-check');
				}
			}

			//已选实例窗口操作
			//左滑
			$('#slideToLeft',$el).on('click',function(){
				var ulOffset = $('.checkedBox',$el).offset().left,
					boxOffset = $('.slideBox',$el).offset().left;
				if((ulOffset-boxOffset) != 0){
					$('.checkedBox',$el).offset({
						left:ulOffset+500
					});
				}
			})

			//右滑
			$('#slideToRight',$el).on('click',function(){
				var ulOffset = $('.checkedBox',$el).offset().left,
					boxOffset = $('.slideBox',$el).offset().left;
					$('.checkedBox',$el).offset({
						left:ulOffset-500
					});

			})

			// 实例全部选择或者全部不选
			$('#dataTable_base',$el).on('click','.all-select',function(e){
				var $that=$(this,$el);
				if ($that.hasClass("fa-check")){
					$that.removeClass("fa-check");
					$('#dataTable_base tbody',$el).find("i").removeClass("fa-check");
					canUse();
				}else{
					$that.addClass("fa-check");
					$('#dataTable_base tbody',$el).find("i").addClass("fa-check");
					canUse();
				};
						
			});

			//选择实例打开配置文件
			$('.slideBox',$el).on('click','.checkedBox>li',function(){
				var textId = $(this).text(),
					$this = $(this);
				$(this).addClass('on').siblings().removeClass('on');
				
				if($('.textContainer',$el).find('#fileInfos_all').length>0){
					return;
				}

				if($('.textContainer',$el).find('#log_'+textId).length == 0 && $('.textContainer',$el).find('#fileInfos_'+textId).length == 0 || treeClick == 'yes'){
						readFile();
				}else if($('.textContainer',$el).find('#log_'+textId).length > 0){
					$('#log_'+textId).removeClass('hide').siblings().addClass('hide');
				}else if($('.textContainer',$el).find('#fileInfos_'+textId).length > 0){
					$('#fileInfos_'+textId).removeClass('hide').siblings().addClass('hide');
				}
				//单独修改，批量修改控制
				if(opType == 'singleOP'){
					$('#fileInfos_'+textId).removeClass('hide').siblings().addClass('hide');
				}else if(opType == 'totalOP'){
					$('#fileInfos_'+textId).removeClass('hide').siblings().remove();
				}
			});

			//移除已选实例
			$('.slideBox',$el).on('click','.removeIns',function(){
				var index = $(this).parent('li').index(),
					textId = $(this).parent('li').text(),
					num = $('.checkedBox>li',$el).length;
				$('#log_'+textId,$el).remove();
				$('#fileInfos_'+textId,$el).remove();
				$(this).parent('li').remove();
				$('#showModal>span',$el).text('('+$('.checkedBox>li',$el).length+')');
				if(num > 1){
					if($(this).parent('li').prev()){
						$('.slideBox .checkedBox>li:eq('+(index-1)+')',$el).trigger('click');
					}else if(!$(this).parent('li').prev() && $(this).parent('li').next()){
						$('.slideBox .checkedBox>li:eq('+(index+1)+')',$el).trigger('click');
					}
				}
				
				if(num == 1){
					$('#showModal',$el).addClass('btn-tip');
				}
				return false;
			});
			
			//点击编辑
			var saveLog;
			$("#editBtn", $el).click(function (){
				
				if($('.checkedBox li',$el).length == 0){
					app.alert('当前无可编辑的文件');
					return;
				}

				var logId = $('.checkedIns.on',$el).text(),
					logContent = $('#log_'+logId,$el).text();
					
					//操作方式控制
					if(opType == 'singleOP'){
						$('#log_'+logId,$el).replaceWith('<textarea class="textBox" id="fileInfos_'+logId+'">'+logContent+'</textarea>');
					}else if(opType == 'totalOP'){
						
						$('.textContainer textarea,.textContainer div',$el).remove();
						$('.textContainer',$el).append('<textarea class="textBox" id="fileInfos_all">'+logContent+'</textarea>');
					}
				

				if(window.localSession){
					window.localSession.setItem('info',logContent);
				}else{
					saveLog = logContent;
				}

				if(!logContent || logContent == ''){
					app.alert('当前无可编辑的文件');
				}

				$('.singleAbc-codeButton',$el).removeClass('hide');
				
			});



			//取消编辑
			$('#cancelBtn',$el).click(function(){
				var instance = $('.checkedIns.on',$el).text();
				if(window.localSession){
					var file_info=window.localSession.getItem('info');
				}else{
					var file_info = saveLog;
				}
				if(file_info && file_info != ''){
					if(opType == 'singleOP'){
						$('textarea#fileInfos_'+instance,$el).replaceWith('<div class="textBox" id="log_'+instance+'">'+file_info+'</div>');
					}else if(opType == 'totalOP'){
						$('textarea#fileInfos_all',$el).replaceWith('<div class="textBox" id="log_'+instance+'">'+file_info+'</div>');
					}
					
				}
				
				$('.singleAbc-codeButton',$el).addClass('hide');
			});	

			// 文件修改保存
			$('#save',$el).on('click', function (e) {
				var fileContent  =  [],

					inst_name = [],
					path = '',
					$insts = $('.checkedBox li',$el),
					instance = $('.checkedBox li.on',$el).text();

					if(opType == 'totalOP'){
						for(var i=0;i<$insts.length;i++){
							fileContent[i] = $('#fileInfos_all',$el).val();
							var ins = $insts[i].innerText+'',
								sc = ins.indexOf('\n'),
								ins = ins.substring(0,sc);
							inst_name.push(ins);
						}
						
					}else if(opType == 'singleOP'){
						fileContent.push($('#fileInfos_'+instance+'',$el).val());
						inst_name.push($('.checkedBox li.on',$el).text());
					}


					var val = $('input[type="radio"]:checked',$el).val().trim();
					if(val == 'AFA'){
						val = '01';
					}else if(val == 'ABS'){
						val = '00';
					}

				if(inst_name && inst_name.length>0 && fileContent && fileContent.length>0){
					var $curr_tree = $('.ztree:not(.hide)',$el),
						curr_file  = $('a.curSelectedNode',$curr_tree).attr('title');
						curr_sFile = $('a.curSelectedNode',$curr_tree).parent().parent().prev('a').attr('title');

					var path =	curr_file;
					
					$.ajax({
						async : true, 
						type : "POST",
						url : 'AFAReqAction_callAfaApp.do',
						dataType : "json",
						shelter: '正在登录服务器，请稍候…',
						data: {
							'appType': 'APP_AB3',// 应用
							'target': 'LinuxFileWrite',// 服务
							'args': JSON.stringify({
								  "num":inst_name.length,// 操作数量 读操作时只能一个，写操作可多个，与下面的devTar，jsonStr数组个数相同
								  "insType": val,
								  "ins_name":inst_name,// 目标设备
								  "jsonStr":{
										"public_req":{
												"filecontent":fileContent,// 文件内容
												'object_type':val,// 类型（AFA ABC ABS AFE）
												"filename":path.toString()// 文件路径和名字
										}
									}
							})
						},
						success:function(data){
							var datas=data.content.result.private;
								if(datas && datas != ''){
									result = JSON.parse(datas);
									if(!$.isEmptyObject(datas) && !$.isEmptyObject(result)){
												if(result.public.opResult == '1'){
													succInit(inst_name,fileContent);	
												}
								 }else{
									 app.alert('稍后再试')
								 }
							}		
						}
					
					});
				
				}else{
					app.alert('请选择实例和操作方式');
				}
			
			});
			
			
			//修改成功
			function succInit(inst_name,fileContent){
				app.alert('修改成功');
				$('.singleAbc-codeButton',$el).addClass('hide');
				if(opType == 'singleOP'){
					$('.textContainer',$el).find('#fileInfos_'+inst_name[0]).remove();
					$('.textContainer',$el).append('<div class="textBox" id="log_'+inst_name[0]+'">'+fileContent[0]+'</div>');
				}else if(opType == 'totalOP'){
					$('.textContainer',$el).find('#fileInfos_all').remove();
					$('.textContainer',$el).append('<div class="textBox" id="log_'+inst_name[0]+'">'+fileContent[0]+'</div>');
				}
			}

			
			
				
			// 配置文件接口
			var zTree,settings = {
					view : {
						showLine : false,
						expandSpeed:"normal"
					},
					data : {
						simpleData : {
							enable : true,
							idKey  : "id",
							pIdKey : "pId",
						},
					},
					callback : {
						onClick : zTreeOnClick
						
					}
				};
			
			// 获取配置列表 生成树
			function getFilePath(){
				var val=$('input[type="radio"]:checked',$el).val().trim();
				if(val=="ABS"){
					getLogTreeData('00');
				}else if(val=="AFA"){
					getLogTreeData('01')
				}
			}
			
			
			var fileObj = {
					"ABS" : {},
					"AFA" : {}
			};
			// 配置文件点击事件
			var treeClick = '';
			function zTreeOnClick(event,treeId,treeNode,clickFlag){
				if(!treeNode.pId){
					return;
				}
				var path  	= treeNode.path;// curSelectedNode
				var name 	= treeNode.name_all;
				var size  	= treeNode.size;
				var val   	= $("input[type='radio']:checked",$el).val();
				var logObj 	= fileObj[val];
				var $tree_ul = $('[data-type="'+val+'"]',$el);

				$tree_ul.removeClass('active');	
				readFile();
				treeClick = 'yes';

			}	

			//获取配置文件
			function readFile(){
				var inst_name = $('.checkedBox .checkedIns.on',$el).text(),
					object_type =  $('input[type="radio"]:checked',$el).val(),
					path =	$('#showModal',$el).data('path');
					
					if(object_type == 'AFA'){
						object_type = '01';
					}else if(object_type == 'ABS'){
						object_type = '00';
					}
				var $curr_tree = $('.ztree:not(.hide)',$el),
					curr_file  = $('a.curSelectedNode',$curr_tree).attr('title'),
					curr_sFile = $('a.curSelectedNode',$curr_tree).parent().parent().prev('a').attr('title');

				if(inst_name && curr_file && opType != ''){
					getFile(object_type,inst_name,curr_file);									
				}else if(curr_file && (!inst_name || !opType)){
					app.alert('请选择实例和操作方式');
				}
			}

			//获取配置文件
			function getFile(object_type,inst_name,path){
				app.shelter.show('正在加载配置文件，请稍等...')
				app.common.ajaxWithAfa({
					url:'AFAReqAction_callAfaApp.do',
					data: {
						'appType': 'APP_AB3',// 应用
						'target': 'LinuxFileRead',// 服务
						'args': JSON.stringify({
								"charSet" : 'utf-8',
							    "num":1,// 操作数量 读操作时只能一个，写操作可多个
							    "insType" : object_type,     //00-AFA,01-ABS
								"devTar": inst_name,// 目标设备
								"jsonStr":{
									"public_req":{
											"filename":path,// 文件路径和名字
										}}
							})	
					}
				}).done(function(data){
					app.shelter.hide();
					var file_content=data.result.ContentObj;
					if(file_content && file_content != ''){
						//logObj[name] =  file_content;

						if($('.textContainer',$el).find('#log_'+inst_name).length < 1){
							$('.textContainer',$el).append('<div class="textBox" id="log_'+inst_name+'"></div>');
							$('#log_'+inst_name,$el).html('').text(file_content);
						}else{
							$('#log_'+inst_name,$el).html('').text(file_content);
						}
						$('#log_'+inst_name,$el).removeClass('hide').siblings().addClass('hide');
						//$('#fileInfo',$el).text(file_content);
					}else{
						app.alert('目前没有内容可以显示');
						$('.textContainer',$el).find('#log_'+inst_name).remove();
						$('.textContainer',$el).append('<div class="textBox" id="log_'+inst_name+'"></div>');
						$('#log_'+inst_name,$el).html('').text('');
						$('#log_'+inst_name,$el).removeClass('hide').siblings().addClass('hide');
					}				
				})	
			}

			//表格插入数据
			function loadTableData(whichTable,options){
				
				
				var $option=$.extend({
						'appType':'APP_AB3',
						'target':'ABS_ServHistList',
						'args' : JSON.stringify({
							'type' : '1'
						})
				},options);
				app.common.ajaxWithAfa({
					url:'AFAReqAction_callAfaApp.do',
					data:$option
				}).done(function(data){
					if(whichTable=="history"){
						$dataTable.clear().draw();
						var tableData = data.result.private;
						
						var len=tableData.length;
						if(tableData && len>0){

							tableData.forEach(function(item,index){
								item.index = index+1;
							});
							$dataTable.rows.add(tableData).draw();
						}
					}else if(whichTable=="baseConfig"){
						$dataTableBase.clear().draw();
						var tableData = data.result.private;
						var len=tableData.length;
						if(tableData && len>0){
							
							$('#showModal',$el).data('path',tableData[0].path)


							tableData.forEach(function(item,index){
								item.index = '<i class="fa currently" aria-hidden="true"></i> '+(index+1);
							});
							$dataTableBase.rows.add(tableData).draw();
						}
					}
				});
			};



			//生成配置文件树
			function getLogTreeData(str){
				app.common.ajaxWithAfa({
					url:'AFAReqAction_callAfaApp.do',
					data:{
						'appType':'APP_AB3',
						'target':'Conf_TreeList',
						'args' : JSON.stringify({
							'node_attr' : str
						})
					}
				}).done(function(data){
					var data = data.result.private;
					var zNodes = [];
					var id=1;

					for(var i in data){
						zNodes.push({
							id : id,
							name: i, 
							pId : 0,
							path: i,
							size:0,
							name_all:""
						})
						var pId = id;
						data[i].forEach(function(item,index){
							var name_size = item.split('|');
							id++;
							zNodes.push({
								id : id,
								name: name_size[0], 
								pId : pId,
								path:i,
								size:name_size[1],
								name_all:name_size[0]
							});
						});
						id++;
					}
					var val=$('input[type="radio"]:checked',$el).val();
					var $tree_ul=$('[data-type="'+val+'"]',$el);
					ztreeObj = $.fn.zTree.init($tree_ul, settings, zNodes);
					$tree_ul.show();
					if(val=='ABS'){
						$('[data-type="AFA"]',$el).hide();
						var treeObj = $.fn.zTree.getZTreeObj("fileUl");
					}else if(val=='AFA'){
						$('[data-type="ABS"]',$el).hide();
						var treeObj = $.fn.zTree.getZTreeObj("fileAFA");
					}
					 var nodes = treeObj.getNodes();
					 if (nodes.length>0) {
					     treeObj.expandNode(nodes[0], true, false, false);  
					 }
				})
			}
			
			// 输入数字，跳转到对应的某一个dataTable表
			function toJumpPage(inputId,$dataTable){
				$(inputId,$el).on("keydown",function(e){
					var e = e || window.event;
					var keycode = e.keycode || e.which;
					var leaf = parseInt($(this).val());
					if(keycode === 13){
						$dataTable.page(leaf-1).draw("page");
					}
				});
			};
			toJumpPage("#HistoPage",$dataTable);
			toJumpPage("#BasetoPage",$dataTableBase);
		},
		unload : function(handler) {
			
		},
		pause : function($el, attr, handler) {
			$.fn.zTree.destroy($('#fileUl', $el));	
		},
		resume : function($el, attr, handler) {
			// $.fn.zTree.init($('#fileUl', $el), setting, treeData);
		}
	};
});