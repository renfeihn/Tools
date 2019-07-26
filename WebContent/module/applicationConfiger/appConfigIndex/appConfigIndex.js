define(["jquery"],function($){
	return {
		load:function($el,scope,handler){
			
			var ztreeObj,
				zNodes = [{"id":"front","name":"前台系统","pId":"-1"},{"id":"back","name":"后台系统","pId":"-1"},
				          {"id":"10000","name":"账务系统","pId":"front"},{"id":"10001","name":"非账务系统","pId":"front"},
				          {"id":"10002","name":"账务系统","pId":"back"},{"id":"10003","name":"非账务系统","pId":"back"}],
				settings = {
							view : {
								showLine : false,
							},
							data : {
								simpleData : {
									enable : true,
									idKey : "id",
									pIdKey : "pId",
								},
							},
							callback:{
								onClick:onclick,
							}
						},
				
				//对象二级分类样式映射
				l2_catenameMap={"逻辑服务器":"objectList-os","应用程序":"objectList-app",
					"数据库":"objectList-db","4":"objectList-middleware"};	
			
			initZtree();	
			
			/**
			 * 应用树节点点击事件
			 */
			function onclick(event, treeId, treeNode){
				if(!treeNode.isParent){
					var parentNode=treeNode.getParentNode();
				
					$(".appConfigIndex-path",$el).text(parentNode.name+"/"+treeNode.name);
					queryObjList(treeNode.id);
				}
			}
			
			
			//获取对象信息列表
			function queryObjList(level_id){
				$(".appConfigIndex-shape",$el).empty();//清空对象列表容器
				var argsData={};
				argsData["app_id"] = level_id;
				$.ajax({
					type : "post",
					url : "AFARequestAction_callAfaApp.do",
					data : {"appType":"APP_CONF",
							"target":"LevelAppList",
							"args":JSON.stringify(argsData)},
					dataType : "json",
					success : function(data){
						if(data.status==true){
							var rspData=data.content.result.private;
							$("span[data-title='对象总数']",$el).text(rspData.obj_num);
							$("span[data-title='已监控']",$el).text(rspData.obj_moni_num);
							$("span[data-title='未监控']",$el).text(rspData.obj_unmoni_num);
							
							var objList=rspData.app_detail;
							var appendHTML="";
							for(var i=0;i<objList.length;i++){
								var objHTML="<div data-appId='"+objList[i].app_id+"' class='monitor'>"
									+"<span id='l3_cate_name'>"+objList[i].app_name+"</span>"
									+"<button type='button'><i class='fa fa-pause'></i></button>"
									+"</div>";
								appendHTML=appendHTML+objHTML;
							}
							$(".appConfigIndex-shape",$el).append(appendHTML);//向对象列表容器添加对象列表
							$(".appConfigIndex-shape", $el).children().first().click();//自动触发点击第一个对象信息
							
							appDivClick();// 对象图形点击事件绑定
							
						};
					}
				});
			}
			
			// 对象图形点击事件绑定
			function appDivClick(){
				$(".appConfigIndex-shape", $el).on('click', 'div', function(e){
					
					$(this).addClass("selected").siblings().removeClass("selected");
					
					var appId = $(this).attr("data-appId");
					
					app.dispatcher.load({
						title: "应用配置",
						moduleId:"app2Repository",
						section:"",
						id:"app2Repository",
						params:{
							'appId': appId
						}
					});
				});
			}
			
			/**
			 * 初始化Ztree
			 */
			function initZtree(){
				ztreeObj = $.fn.zTree.init($("#ztreeDemo", $el), settings, zNodes);
				
				var __id = "-1", // 根节点ID
					__num = 0, 
					nodes = ztreeObj.getNodes();
				
				$("#treeAllNum",$el).text(zNodes.length);
				
				FindZtreeName(nodes);
				
				$(".app2Repository-search",$el).on("keyup","input",function(e){
					var keycode=document.all?event.keyCode:e.which;			//浏览器兼容模式
					if(keycode == 13){
						var nodes = ztreeObj.getNodes(),
							__input = $(this).val(),
							__id = "-1";
						
						$(this).val("");
						FindZtreeName(nodes,__id,__input);
					}
				});
			}
			
			function FindZtreeName(node,__id,__input){
				for(var i = 0 ; i < node.length ; i ++ ){
					var nodename = node[i].name;
					if(node[i].name.indexOf("(") != -1){
						nodename = node[i].name.split("(")[0];
					}
					if(__input == nodename){
						//展开当前的符合的树节点
						__id = node[i].id;
						var node = ztreeObj.getNodeByParam("id",__id);
						var pId = node.pId;
						var pIdnode = ztreeObj.getNodeByParam("id",pId);
						ztreeObj.expandAll(false);
						if(node.isParent){
							ztreeObj.expandNode(node, true, true, true);
						}else{
							ztreeObj.expandNode(pIdnode, true, true, true);
						}
					}
					if(!node[i].hasOwnProperty("children")){
						continue;
					}
					FindZtreeName(node[i].children,__id,__input);
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