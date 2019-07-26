define(["jquery"],function(){
	var setting;
	var treeData;
	return {
		
		load:function($el,scope,handler){
			//$('#appConfigInfo', $el).empty();
			setting = {
				view: {
					showLine : false,
					expandSpeed:"normal"
				},
				callback : {
					onClick : zTreeOnClick,
					beforeExpand:closeOther
				}
			};
			function closeOther(id,node){
            	 var aa = $.fn.zTree.getZTreeObj("app_tree");
 				 //是不是根节点
 				 if(!node.parentTId){
 					 aa.expandAll(false);
 					 return
 				 }
 				 //叶子节点
 				 var parentNode = aa.getNodeByTId(node.parentTId);
 				 var findNode = aa.getNodesByFilter(filter,false,parentNode);
 				 for(var i=0;i<findNode.length;i++){
 					 if(findNode[i].level == node.level){
 						 aa.expandNode(findNode[i],false)
 					 }
 				 }
            	 function filter(n){
 					 return n.open == true
 				 }
             }
			//初始化左侧总分类数据
			initAllCategories();			
			
			//应用点击事件，显示对应的详细信息
			$('#appConfigInfo', $el).delegate('li', 'click', function(){
				var cateid = parseInt(String($(this).attr("cateid")).substring(0,6)),name=$(this).find("p").text();
				var data={}
				data.category=name;
				if(cateid>300005&&cateid<400000){
					data.flag="cluster"
				}
				app.dispatcher.load({
					title: name+"监控",
					moduleId: "basicMonitor",
					section: "AFASumInstance",
					params:data
				});
			});

			//左侧配置总览点击事件
			function zTreeOnClick(event,treeId,treeNode,clickFlag){
				$('#appConfigInfo', $el).empty();//清空之前所有应用信息
				$('#appTitle', $el).text(treeNode.name);
				if(treeNode.level == 0){//点击第一级
					var data = {levelOneName : treeNode.name}
					switch(treeNode.name){
						case "应用群组":
						case "网络":
						case "存储":
						case "环境动力":
						case "安全":
							$('#appInfo', $el).hide();
							break;
						default:
							$('#appInfo', $el).show();
					}
				}else if(treeNode.level == 1){//点击第二级
					$('#appTitle', $el).text($('#' + treeNode.parentTId + '_span', $el).text() + "/" + treeNode.name);
					var data = {
						l1CateName : $('#' + treeNode.parentTId + '_span', $el).text(),
						l2CateName : treeNode.name,
						cateId:treeNode.cateid
					}
					
					switch($('#' + treeNode.parentTId + '_span', $el).text()){
						case "应用群组":
						case "网络":
						case "存储":
						case "环境动力":
						case "安全":
							$('#appInfo', $el).hide();
							break;
						default:
							$('#appInfo', $el).show();
					}
					
					$.ajax({
						type : "post",
						url : "CommonMonitorAction_getSoftSumInfo.do",
						data : data,
						dataType : "json",
						success : function(data){
							if(data.status){
								showAppInfo(data.content.result);
							}
						}
					});
				}
			}

			//显示应用信息
			function showAppInfo(data){
				if(data!="{}"){
					var liTemp = "",num=0;
					//var data = data.sort(function(a, b){return a.healthDegree - b.healthDegree});//以健康度排序
					for(tmp in data){
						var temp = data[tmp],
							cateid = tmp;
							count = temp.count,
							name = temp.name;
						liTemp += '<li style="background-image:url(img/baseMonitor/'+ name +'.png); background-position:center; background-repeat:no-repeat;" class="appConfiger-appGreen" cateid="'+ cateid +'"><span><i>' + count + '</i></span><p title="'+ name +'">' + name + '</p></li>';
						num=num+1;
					}

					$('.appCount_',$el).text(num);
					$('#appConfigInfo', $el).append(liTemp);
				}				
			}
			
			//初始化左侧总分类数据
			function initAllCategories(){
				$.ajax({
					type : "post",
					url : "AppConfigAction_getAllCategories.do",
					dataType : "json",
					success : function(data){
						if(data.status){
							var cates = data.content.cates;
							/******处理数据 start*******/
							var levelOneNames = [];//一级目录
							for(var i = 0; i < cates.length; i++){
								levelOneNames.push(cates[i].levelOneName);
							}
							levelOneNames = _.uniq(levelOneNames); //去重

							var treeArr = [];//最终需求的数据结构
							for(var i = 0; i < levelOneNames.length; i++){
								treeArr.push({name : levelOneNames[i]});
								for(var j = 0; j < cates.length; j++){
									if(cates[j].levelOneName == levelOneNames[i]){
										if(!treeArr[i].children){
											treeArr[i].children = [
												{
													name : cates[j].levelTwoName,
													cateid:String(cates[j].categoryId).substring(0,6)
													//children : []
												}
											];
										}
										if(treeArr[i].children){
											var children = treeArr[i].children;
											var flag = false;
											for(var index=0;index<children.length;index++){
												if(children[index].name==cates[j].levelTwoName){
													flag=true;
													break;
												}
											}
											if(!flag){
												treeArr[i].children.push({
													name : cates[j].levelTwoName,
													cateid:String(cates[j].categoryId).substring(0,6)
													//children : [{name : cates[j].levelThreeName}]
												});
											}
											
										}
									}
								}
							}
							/******处理数据 end*******/
							var treeObj = $.fn.zTree.init($('#app_tree', $el), setting, treeArr);
							treeData = treeArr;
							$('#app_tree_1_a', $el).trigger('click');
						}
					}
				});
			}
			
			this.delegateEvents({
				"keydown #appSearch" : function(e){//搜索功能
					var e = e || window.event,
						keycode = e.which;
					
					if(keycode == 13){//回车键事件
						var	searchValue = $.trim($(this).val()).toLowerCase();//搜索框内容
						$('li', $('#appConfigInfo', $el)).each(function(index,li){
							if($(li).find('p').text().toLowerCase().indexOf(searchValue) != -1){
								$(li).css('display', 'block');
							}else{
								$(li).css('display', 'none');
							}
							
						})
					}
				},
				
				"input #appSearch" : function(){
					if($.trim($(this).val()) == ""){//实现清空时，所有应用显示
						$('li', $('#appConfigInfo', $el)).each(function(index,li){
							$(li).css('display', 'block');							
						})
					}
				},
				
			});
			
			// 点击搜索
			$(".appConfiger-appSearch",$el).on("click",function(){
				var	searchValue = $.trim($("#appSearch",$el).val()).toLowerCase();//搜索框内容
				$('li', $('#appConfigInfo', $el)).each(function(index,li){
					if($(li).find('p').text().toLowerCase().indexOf(searchValue) != -1){
						$(li).css('display', 'block');
					}else{
						$(li).css('display', 'none');
					}
				})
			})
						
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			//$.fn.zTree.destroy($('#app_tree', $el));
		},
		
		resume:function($el,scope,handler){
			/*$.fn.zTree.init($('#app_tree', $el), setting, treeData);
			$('#app_tree_1_a', $el).trigger('click');*/
		}
		
	}
});