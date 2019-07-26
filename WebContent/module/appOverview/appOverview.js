define(["jquery","underscore","handlebars"],function($,_,Handlebars){
	var myMessager = null;
	return {
		
		load:function($el,scope,handler){
			var lastMotion = null;
			var idMap = {
				'综合业务': 'zhyw',
				'支付': 'zf',
				'理财': 'lc',
				'贷款': 'dk',
				'中间业务': 'zjyw',
				'银行卡': 'yhk',
				'外币': 'wb',
				'其他': 'qt'
			};
			//注册模板
			Handlebars.registerHelper('judeg',function(v1,v2,options){
				if(v1 >= v2){
					return options.fn(this);
				}
				return options.inverse(this);
			});
			//时间戳
			var timestamp = new Date().getTime();
			getAllData(true);
			lastMotion = function(){
				$("#totalEvent",$el).addClass("selected");
				$("#focu",$el).addClass("checked").next().removeClass("checked");
				getAllData(true);
				setAttrLiRole();
			}
			myMessager = function(e){
				var message = e.data;
				if(message.source == 'appOverview'){
					lastMotion();
				}
			}
			window.addEventListener('message', myMessager, false);
			//加载全部接口数据
			function getAllData(flag){
				app.common.ajaxWithAfa({
					url:"ShowUserPrivilegeAction_getAppsData.do",
					async:false
				}).done(function(data){
					data = data.appView;
					$("#alertEvent",$el).text(data.alertEventCount);
					$("#errorEvent",$el).text(data.errorEventCount);
					$("#totalEvent",$el).text(data.allAppCounts);
					
					var tpls = $("#tpls",$el).html();
					var template = Handlebars.compile(tpls);
					var sou = data.appList;
					if(flag){
						//按照关注度排序
						sou = _.sortBy(sou,function(num){
							return parseInt(num.attention);
						})
					}
					else{
						//按照健康度排序
						sou = _.sortBy(sou,function(num){
							return parseInt(num.healthDegree);
						})
					}
					var html = template(sou);
					$("#applicationBox",$el).html(html);
					
					var tpls2 = $("#tpls2",$el).html();
					var template = Handlebars.compile(tpls2);
					var list = data.appGroupCount;
					var html = template(list);
					$("#appGroupCount",$el).html(html);
					
					//修改应用分类图片
					$("#appGroupCount li", $el).each(function(index, item){
						changeAppImg($(item));
					})
				})
			}
			
			//修改应用分类图片
			function changeAppImg($target){
				for(var i in idMap){
					if($target.text().indexOf(i) != -1){
						$target.children('span:first').attr('id', idMap[i]);//每个id都有对应的背景图
					}					
				}
			}
			
			//按分类加载接口数据
			function getDataByClass(groupId, flag){
				app.common.ajaxWithAfa({
					url:"ShowUserPrivilegeAction_getAppForGroup.do",
					data:{'objId':groupId},
					async:false
				}).done(function(data){
					var tpls = $("#tpls",$el).html();
					var template = Handlebars.compile(tpls);
					var sou = data.appList;
					
					if(flag){
						//按照关注度排序
						sou = _.sortBy(sou,function(num){
							return parseInt(num.attention);
						})
					}
					else{
						//按照健康度排序
						sou = _.sortBy(sou,function(num){
							return parseInt(num.healthDegree);
						})
					}
					
					var html = template(sou);
					$("#applicationBox",$el).html(html);
				})
			}
			//添加关注接口  未对后台返回的状态进行处理
			function addFocus(objId){
				app.common.ajaxWithAfa({
					url:"AppOverviewAction_addFocus.do",
					data:{'objId':objId},
					async:true
				}).done(function(data){
					//console.log(data)
				})
			}
			//删除关注接口 未对后台返回的状态进行处理
			function removeFocus(objId){
				app.common.ajaxWithAfa({
					url:"AppOverviewAction_removeFocus.do",
					data:{'objId':objId},
					async:true
				}).done(function(data){
					//console.log(data)
				})
			}
//		    var minWidth = 952;
//		    var midWidth = 1112;
//		    var maxWidth = 1438;
		    var width = 120;
		    var num = 8;//间隙
		    var mol = parseInt((screen.width - 488 - 128)/136) + 1;//行个数
//		    var containerWidth = $("#applicationBox").parent().width();
//		    if(minWidth <= containerWidth && containerWidth < midWidth  ){
//		    	num = 8;
//		    	mol =7;
//		    }
//		    else if(midWidth <= containerWidth && containerWidth < maxWidth){
//		    	num = 10;
//		    	mol = 7;
//		    }
//		    else if(maxWidth <= containerWidth){
//		    	num = 12;
//		    	mol = 10;
//		    }

		    if(screen.width < 1440){    	
		    	num = 8;
		    	mol = 7;
		    }else if(screen.width >= 1440 && screen.width < 1600) {
		    	num = 8;
		    	mol = 7;
		    }else if(screen.width >= 1600 && screen.width < 1920){
		    	num = 9;
		    	mol = 8;
		    }else if(screen.width >= 1920){
		    	num = 12;
		    	mol = 10;
		    }
			$(".appOverview-filter>button", $el).click(function(e) {
				if($(this).hasClass("checked")) return
				$(this).addClass('checked').siblings().removeClass('checked');	
				e = e || window.event;
				var target = e.target || e.srcElement;
				if($('#totalEvent', $el).hasClass('selected')){
					if($.trim($(target).text())=="按关注"){
						getAllData(true);
						seachContent($("#searchInput",$el).val());
						setAttrLiRole();
					}
					else{
						getAllData(false);
						seachContent($("#searchInput",$el).val());
						setAttrLiRole();
					}
				}else if($('#appGroupCount li', $el).hasClass('checked')){
					var groupId = $('#appGroupCount li.checked', $el).attr("groupid");
					if($("#focu").hasClass("checked")){
						getDataByClass(groupId, true);
					}else{
						getDataByClass(groupId, false);
					}
					seachContent($("#searchInput",$el).val());
					setAttrLiRole();
				}			
			});
			
			$(".appOverview-appContent", $el).delegate(".appOverview-heart", "click", function(e) {
				var objId = $(this).parent().attr("dataid");
				if($("#focu").hasClass("checked")){
					changeAttrRole($(this));
					setLiPosition();
				}
				if($(this).hasClass("checked")){
					removeFocus(objId)
				}else{
				   addFocus(objId)
				}
				
				$(this).toggleClass('checked');
				e.stopPropagation();
			});

			$("#appGroupCount", $el).delegate("li","click",function() {
				if($(this).hasClass('checked')){return;}
				var groupId = $(this).attr("groupid");
				if($("#focu").hasClass("checked")){
					getDataByClass(groupId, true);
				}else{
					getDataByClass(groupId, false);
				}		
				seachContent($("#searchInput",$el).val());	
				setAttrLiRole();
				//setLiPosition();
				if($("#totalEvent",$el).hasClass("selected")){
				   $("#totalEvent",$el).removeClass("selected");
				}
				$(this).addClass('checked').siblings().removeClass('checked');
			});
			$("#totalEvent",$el).click(function(){
				if($(this).hasClass("selected")) return
				if($(".appOverview-appList>li", $el).hasClass("checked")){
					$(".appOverview-appList>li", $el).removeClass("checked");
				}
				$(this).addClass("selected");
				if($("#focu").hasClass("checked")){
					getAllData(true);
				}
				else{
					getAllData(false);
				}
				seachContent($("#searchInput",$el).val());
				setAttrLiRole();			
			})
			$("#searchInput",$el).on("keydown",function(e){
				 var e = e || window.event;
				 var keycode = e.keycode || e.which;
				 var srcEle = e.target || e.srcElement;
				 if(keycode === 13){
					 seachContent(srcEle.value)
					 setAttrLiRole();
					 //setLiPosition();
				 }
			});
			
			$("#searchInput",$el).on("keyup",function(e){
				 var e = e || window.event;
				 var keycode = e.keycode || e.which;
				 var srcEle = e.target || e.srcElement;
				 if(keycode === 8){
					 seachContent(srcEle.value)
					 setAttrLiRole();
				 }
			})
			
			// 触发鼠标点击事件
			$(".appOverview-searchbox",$el).on("click",function(){
				 var srcEle =$.trim($("#searchInput",$el).val());
					 seachContent(srcEle);
					 setAttrLiRole();
					 //setLiPosition();
			})
			
			$("#applicationBox",$el).delegate("li","click",function(){
				var sysId = $(this).attr("dataId"),
					sysName = $(this).attr('title');
				app.dispatcher.load({
					title: "应用视图-" + sysName,
					moduleId:"appView",
					section:"",
					id:"",
					params:{
						'sysId':sysId,
						'sysName' : sysName,
						'section':'appOverView'
					}
				});
			})
			
			setAttrLiRole();
			//点击关注后的位置切换功能
			function setAttrLiRole(){
			      var oli = getArrLi();
			      var liWidth = parseInt($(oli[0]).css("width"));
				  var liHeight = parseInt($(oli[0]).css("height"));
				  var remainderI,intI;
				  //已经显示的块
				  var notHiddenArr =   _.chain(oli).filter(function(item){
					  return item.style.display !== "none"
				  }).value();
				  if($("#focu").hasClass("checked")){
				  //选中的块
	              var checkedArr = notHiddenArr.filter(function(item){
	            	  return item.childNodes[1].className.indexOf("checked")>0;
	              }) 
	              //未选中的块
	              var uncheckedArr = notHiddenArr.filter(function(item){
	            	  return item.childNodes[1].className.indexOf("checked") == -1;
	              })
				  var hasSortedArr = checkedArr.concat(uncheckedArr);
				  }
				  else{
					  var hasSortedArr = notHiddenArr;  
				  }
	              hasSortedArr.forEach(function(item,index){
	            	   item.setAttribute("role",index);
					   item.style.position = "absolute";
					   remainderI = index % mol;
					   intI = parseInt(index / mol);
					   item.style.left = num + 2 * num * remainderI + liWidth * remainderI +"px";
					   item.style.top = 0 + 2 * num * intI + liHeight * intI + "px";
	             })
			}
			function setLiPosition(){
				 var oli = getArrLi();
				 var role,remainderI,intI;
				 var liWidth = parseInt($(oli[0]).css("width"));
				 var liHeight = parseInt($(oli[0]).css("height"));
				 oli.forEach(function(item,index){
					 role = parseInt(item.getAttribute("role"));
					 remainder = role % mol;
					 intI = parseInt(role / mol);
					 $(item).animate({
						 left:num + 2 * num * remainder + liWidth * remainder +"px",
						 top: 0 + 2 * num  * intI + liHeight * intI + "px"
					 })
				 })
			}
			
			function changeAttrRole(cli){
				  var oli = getArrLi();
				  var role = parseInt(cli.parent().attr("role"));
				  var item;
				 
				  oli = _.chain(oli).filter(function(item){
					   return item.style.display != "none";
				  }).sortBy(function(num){
					   return parseInt(num.getAttribute("role"))  
				  }).value();
				  if(!cli.hasClass("checked")){
					  for(var i=0;i<oli.length;i++){
						  item = oli[i];
						  if(!$(item).children(":first").hasClass("checked")){
							  item.setAttribute("role",role);
							  cli.parent().attr("role",i);
							  break;
						  }	
					  }
				  }
				  else{
					  var index,nRole,checkedLength;
					  var checkedLength = $("span.checked",$el).filter(function(index,item){  
						  return $(item).css("display") !== "none";
					  });
					  if(checkedLength.length >= oli.length){
						    for(var k = role; k<oli.length;k++ ){
						    	 nRole =  parseInt(oli[k].getAttribute("role"));
								 nRole = nRole - 1;
								 oli[k].setAttribute("role",nRole);
						    }
						    cli.parent().attr("role",oli.length-1);
					  }
					  for(var i=0;i<oli.length;i++){
						  item = oli[i];
						  if(!$(item).children(":first").hasClass("checked")){
							  index = i;
							  for(var j= role;j<index;j++){
									 nRole =  parseInt(oli[j].getAttribute("role"));
									 nRole = nRole - 1;
									 oli[j].setAttribute("role",nRole);
								  }
								  cli.parent().attr("role",index-1);
								  break;
						  }
					  }
					  
				  }
			}
			
			function getArrLi(){
				 var applicationViewBox = document.getElementById("applicationBox");
			     var oli = applicationViewBox.getElementsByTagName("li");
			     oli = Array.prototype.slice.call(oli);
			     return oli
			}
			
			//输入框搜索功能   前端处理
			
			function seachContent(val){
				var o = getArrLi();
				var oval;
				o.forEach(function(item,index){
				     oval = $(item).children(":last").text().toLowerCase();
				     if(oval.search($.trim(val).toLowerCase()) == -1){
				    	 item.style.display = "none"
				     }
				     else{
				    	 item.style.display = "block"
				     }
				})
			}
			
			// 告警预警的跳转方式
			$(".appOverview-allAppList span",$el).on("click",function(e){
				var content =$(this).text(),
				id = e.target.id;
				var title,eType;
				
				if(isNaN(content) || parseInt(content) == 0){
					return;
				}
				
				if(id == "alertEvent" || id == "errorEvent"){
					if(id == 'alertEvent'){
						title = "预警";
						eType = "WARING";
					}else if(id == "errorEvent"){
						title = "告警";
						eType = "ALARM";
					}
					
					app.dispatcher.load({
						"title" : "事件列表-应用事件总览" + title,
						"moduleId" : "eventList",
						"section" : "",
						"id" : "",
						"params" : { // 给标签传递参数
							"appId" : "-1",
							"eType" : eType,
						}
					});
				}
			})
			
		},
		
		unload:function(handler){
			window.removeEventListener('message', myMessager , false);
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});