/*
 *  
 *  2016/8/30 10:09 made by chenweikang 	kvikon@gmail.com
 */

!function($) {

	"use strict";
	var EventDetails = function(element, options) {
		this.options = options;
		this.$element = $(element);
	};

	EventDetails.prototype = {
		constructor : EventDetails,
		init : function() {
			var that = this,
			$elem = this.$element,
			eventDetailobj;
			/* 加载事件详情html Start */
			if (!$elem.children().length) {
				$.ajax({
					url:'./module/plugin/eventDetails.html',
					contentType:"application/x-www-form-urlencoded;charset=utf-8;",
					type:"POST",
					async:false,
					dataType:"html",
					success:function(data){
						 that.element = data;
						 $elem.append(data);
					}
				});
			}
			/* 加载事件详情html End */
			
			/* 加载事件详情数据 Start */
		    //echarts图初始化
		    that.option0 = {
		    		tooltip : {
						trigger: 'axis',
						axisPointer:{
						    type: 'line',
						    lineStyle: {
						        color: '#666',  
						        width: 1,
						        type: 'solid'
						    },
						    crossStyle: {
						        color: '#000',
						        width: 0.5, 
						        type: 'dashed'
						    },
						    shadowStyle: {
						        color: '000',
						        width: 'auto',
						        type: 'default'
						    }
						} ,
						padding:0,
						backgroundColor:'rgba(255,255,255,0)',  
						formatter:function(params,ticket,callback){
							  
							var len =params.length,
							liStr = '';
							for(var i=0;i<len;i++){
								var data = params[i].data,
								seriesName = params[i].seriesName,
								color = '#13b1f5';
								liStr = liStr+'<li class="tooltip-li">'+
								            	'<span class="tooltip-img" style="background-color:'+color+'"></span>'+
								            	'<span class="tooltip-name">'+seriesName+'</span>'+
								            	'<span class="tooltip-value">'+data+'</span>'+
							                '</li>';
							}
							return   '<div class="tooltipCtn">'+
							         '<div class="tooltip-title">'+params[0].name+'</div>'+
							         	'<ul class="tooltip-ul">'+liStr+'</ul>'+
							         '</div>'; }
					},
		    	    grid: { // 控制图的大小，
						x: '10%',
						y: '10%',
						x2:'8%',
						y2:'20%',
						borderWidth:0
					},
		    	    xAxis : [
		    	             {
		    	                 type : 'category',
		    	                 boundaryGap : true,
		    	                 axisLine:{
		    	                	 show:true,
		    	                	 lineStyle:{
						        		    color: '#dadada',
						        		    width: 1,
						        		    type: 'solid'}  
		    	                 },
		    	                 axisTick :{show:false},
		    	                 axisLabel:{
		    	                	 show:true,
		    	                 },
		    	                 splitLine:{
		    	                	 show:false,
					        		 lineStyle:{
					        			    color: ['#dadada'],
					        			    width: 1,
					        			    type: 'solid'
					        			}
		    	                 },
		    	             }
		    	         ],
		    	    yAxis : [
		    	             {
		    	                 type : 'value',
		    	                 axisLine:{
		    	                	 show:true,
		    	                	 lineStyle:{
						        		    color: '#dadada',
						        		    width: 1,
						        		    type: 'solid'}
		    	                 },
		    	                 axisLabel:{
		    	                	 lineStyle:{
		 			        		    color: '#dadada',
		 			        		    width:1,
		 			        		    type: 'solid'}
		    	                 },
		    	                 splitLine:{
		    	                	 show:false
		    	                 }
		    	             }
		    	         ],
		    };
			/* 加载事件详情数据 End*/
		    
			/* 绑定事件Start */
		    //双击标题关闭事件详情页面
			$elem.on('dblclick',"#modelheader",function(){
				$('[data-role="eventDtlTemp"]' , $elem).modal('hide');
				$(".nav.nav-tabs",$elem).children().eq(0).removeClass('hide');
				var bodyWidth = document.documentElement.clientWidth;
				if(bodyWidth<1680){
					$('.body-autoHeight').css("overflow-x","visible");
				}
				$('#tabLeft,#tabRight',$elem).addClass('hide');
			});
			
			//关闭事件详情页面显示主页面滚动条
			$elem.on('click',"#closemodal",function(){
				var bodyWidth = document.documentElement.clientWidth;
				$(".nav.nav-tabs",$elem).children().eq(0).removeClass('hide');
				if(bodyWidth<1680){
					$('.body-autoHeight').css("overflow-x","visible");
				}
				$('#tabLeft,#tabRight',$elem).addClass('hide');
			});
		    
		    //当服务ip>1个时，显示所有ip
		    $elem.on('mouseover',"[data-role=ipadd]",function(){
		    	var items = $('[data-role=ipadd]',$elem).data('items');
				if(items>1){
						$(this).find("#ipadd0").css({'height':'28px','line-height':'28px'});
						$(this).css({"background-color":"#f7f7fa","border":"1px solid #e5e5e5","box-shadow":"1px 1px 4px #e5e5e5"});
						$('#ipaddmoreflag',$(this)).addClass("hide");
						$(this).find('[data-role=moreip]').css("display","block");
					}
				});
		    $elem.on('mouseout',"[data-role=ipadd]",function(){
		    	var items = $('[data-role=ipadd]',$elem).data('items');
		    	if(items>1){
		    		$('#ipaddmoreflag',$(this)).removeClass("hide");
		    		$(this).find('[data-role=moreip]').css("display","none");
				    $(this).css({"border":"none","box-shadow":"none"});
		    	}
		    });
		    
		    //应用系统切换
			$elem.on('change',"#span0",function(){
				var opti_app = $(this).val(),
				$div = $(this).closest('.modal-event-detail'),
				eve_name = $('[data-role=eve_name]',$div).data("eve_name"),
				eve_namei = eve_name[opti_app],
				app_name = eve_namei.split(",");
				var phonenum = $("#phonenum",$div).data("phonenum"),
				phonenumi = phonenum[opti_app],
				phoneno = phonenumi.split(",");
				var app_id = $("#hide_app_id",$div).data("app_id");
				$("#hide_app_id",$div).text('');
				$("#hide_app_id",$div).text(app_id[opti_app]);
				$('[data-role=eve_name]',$div).empty();
				$("#phonenum",$div).text('');
				for(var j =0;j<app_name.length;j++){
					$('[data-role=eve_name]',$div).append('<option value='+j+'>'+app_name[j]+'</option>');
				}
				$("#phonenum",$div).text(phoneno[0]);
				$("#phonenum",$div).removeData("pnum");
				$("#phonenum",$div).data("pnum",phoneno);
			}),
			//联系人切换
			$elem.on('change',"#eve_name",function(){
				var $div = $(this).closest('.tab-pane'),
				$span = $(this).parent().next().find("#phonenum"),
				pnum = $("#phonenum",$div).data("pnum"),
				opti_val=$(this).val();
				$span.text(pnum[parseInt(opti_val)]);
			});
			
			//显示或隐藏echarts图
			$elem.on('click',".modal-event-echart-piece-show",function(){
				if($(this).children().hasClass("fa-chevron-down")){
					$(this).prev().removeClass("hide");
					$(this).children().removeClass("fa-chevron-down");
					$(this).children().addClass("fa-chevron-up");
				}else{
					$(this).prev().addClass("hide");
					$(this).children().removeClass("fa-chevron-up");
					$(this).children().addClass("fa-chevron-down");
				}
			});
			//切换报警
			$elem.on('click',"#eventBtnWarn",function(){
				var $div = $(this).closest('.tab-pane');
				eventDetailobj&&eventDetailobj.dispose();
				$('#PortCtn',$div).empty();
				if(app.domain.get("event_detail", "showType")==="line"){
					eventDetailobj = new app.showData.chartsCollection({
						$context: $div,
						handler: new app.handler(),
						selector: "#PortCtn",//图表外部容器
						url:"./EventDetailAction_mainHandler.do",
						initDynamicUrl:"./EventDetailAction_mainHandler.do",
						urlParams:{"id":app.domain.get("event_detail",'eventid'),"showType":app.domain.get("event_detail", "showType"),"state":app.domain.get("event_detail", "state")},
						updateTime: 1000*60*60*12
					});
				}else{
					eventDetailobj = new app.showData.tableCollection({
						$context: $div,
						handler: new app.handler(),
						selector:"#PortCtn",//图表外部容器
						url:"./EventDetailAction_mainHandler.do",
						initDynamicUrl:"./EventDetailAction_mainHandler.do",
						urlParams:{"id":app.domain.get("event_detail",'eventid'),"showType":app.domain.get("event_detail", "showType"),"state":app.domain.get("event_detail", "state")},
						sDomFlag:"1",
						bInfo:true,
						bLengthChange:false,
						iDisplayLength:4
					});
				}
				eventDetailobj.start();
				$('#eventBtnNow',$div).removeClass('blue');
				$('#eventBtnWarn',$div).addClass('blue');
				
			});
			//切换实时
			$elem.on('click',"#eventBtnNow",function(){
				var $div = $(this).closest('.tab-pane');
				eventDetailobj&&eventDetailobj.dispose();
				$('#PortCtn',$div).empty();
				if(app.domain.get("event_detail", "showType")==="line"){
					eventDetailobj = new app.showData.chartsCollection({
						$context: $div,
						handler: new app.handler(),
						selector: "#PortCtn",//图表外部容器
						urlParams:{"app_id":app.domain.get("event_detail",'app_id'),"kpi_def_id":app.domain.get("event_detail", 'kpi_def_id'),
							"server_id":app.domain.get("event_detail", 'server_id'),"showType":app.domain.get("event_detail", "showType"),
							"state":app.domain.get("event_detail", "state"),"showId":app.domain.get("event_detail", "showId")},
						updateTime: 1000*60*60*12
					});
				}else{
					eventDetailobj = new app.showData.tableCollection({
						$context: $div,
						handler: new app.handler(),
						selector:"#PortCtn",//图表外部容器
						urlParams:{"app_id":app.domain.get("event_detail",'app_id'),"kpi_def_id":app.domain.get("event_detail", 'kpi_def_id'),
							"server_id":app.domain.get("event_detail", 'server_id'),"showType":app.domain.get("event_detail", "showType"),
							"state":app.domain.get("event_detail", "state"),"showId":app.domain.get("event_detail", "showId")},
						sDomFlag:"1",
						bInfo:true,
						bLengthChange:false,
						iDisplayLength:4
					});
				}
				eventDetailobj.start();
				$('#eventBtnWarn',$div).removeClass('blue');
				$('#eventBtnNow',$div).addClass('blue');
			});
			
			//导航
			$elem.on('click',"#turnto",function(){
				var idall = $("#Id",$elem).val(),
				idStr = idall.split(","),
				objId = idStr[5],
				objType = idStr[4],
				app_Ids = (idStr[2]).split("|"),
				appId = app_Ids[0],
				serverId = idStr[3],
				pageflag = idStr[12],
		    	tableflag = idStr[13],
				obj_attr1 = idStr[10],
				appCName = (idStr[11]).split("|"),
			    section = [],
	        	title = appCName[0]+"-"+obj_attr1,
	        	eventinfo,
	        	$modaldiv,flagtype,
	        	$newdiv = that.div;
				if(tableflag=='0'){
					$modaldiv = $("#awebEventDetailsModule");
					eventinfo = [{"name":"事件类型：","value":$('#span4',$elem).text()},{"name":"事件渠道：","value":idStr[7]},
		        	             {"name":'指标类型：',"value":$('#span1',$elem).text()},{"name":"系统名称：","value":idStr[11]},
		        	             {"name":"事件摘要：","value":$('#span9',$elem).text()},{"name":"最后发生时间：","value":$('#span3',$elem).text()},
		        	             {"name":"次数：","value":$('#span10',$elem).text()},{"name":"事件状态：","value":$('#span6',$elem).text()}];
				}else if(tableflag=='01'){
					$modaldiv = $("#awebEventDetailsModule");
					var time = ($('#towaittime',$elem).text()).split(','),
					towaittime = that.changedatetime(time[0],time[1]);
					eventinfo = [{"name":"事件类型：","value":$('#span4',$elem).text()},{"name":"事件渠道：","value":idStr[7]},
		        	             {"name":'指标类型：',"value":$('#span1',$elem).text()},{"name":"系统名称：","value":idStr[11]},
		        	             {"name":"事件摘要：","value":$('#span9',$elem).text()},{"name":"最后发生时间：","value":$('#span3',$elem).text()},
		        	             {"name":"转待办时间：","value":towaittime},{"name":"次数：","value":$('#span10',$elem).text()},
		        	             {"name":"事件状态：","value":$('#span6',$elem).text()}];
				}else{
					$modaldiv = $("#awebEventDetails");
					var recordTime = $newdiv.closest('tr').children().eq(4).text();
					eventinfo = [{"name":"事件类型：","value":$('#span4',$elem).text()},{"name":"指标类型：","value":$('#span1',$elem).text()},
					             {"name":"分组：","value":idStr[8]},{"name":"事件信息：","value":$('#span9',$elem).text()},
					             {"name":"记录时间：","value":recordTime}];
				}
		    	if(pageflag=="10" || pageflag.substring(0,2)=="11"){
		    		section = ["appAll","system","board"];
		    		if(pageflag=="10") {
		    			title+="-操作系统";
		    		}else if(pageflag.substring(0,2)=="11"){
		    			title+="-数据库";
		    		}
		    	}else if(pageflag == "12"){
		    		section = ["appAll","system"];
		    		title = appCName[0];
		    		if($('#span1',$elem).text()=="交易量监控"){
		    			flagtype = "traceshow";
		    		}else{
		    			flagtype = "appshow";
		    		}
		    	}
				var system;
				if(obj_attr1=="Windows"){
					system="Windows";
				}else{
					system="Unix";
				}
				if(section.length>0 && appId!=""){
					var namespace,
					page = section[section.length-1];
					if(page=="system") {
						namespace="appAll";
					} else if(page=="board") {
						namespace="event";
					} else if(page=="sqlserver") {
						namespace="SQLSERVER";
					}
					//跨页面参数设置格式： app.domain.exports(命名空间,{变量key:变量value});
					app.domain.exports(namespace,{'objId':objId});
					app.domain.exports(namespace,{'appId':appId});
					app.domain.exports(namespace,{'objType':objType});
					app.domain.exports(namespace,{'pageflag':pageflag});
					app.domain.exports(namespace,{'bSystem':title});
					app.domain.exports(namespace,{'sName':idStr[9]});
					app.domain.exports(namespace,{'appGroup':idStr[8]});
					app.domain.exports(namespace,{'system':system});
					 if(namespace!="appAll"){
							app.domain.exports(namespace,{'serverId':serverId});
					}else{
						app.domain.exports(namespace,{'flagtype':flagtype});
					}
					 app.domain.exports(namespace,{'eventInfo':eventinfo});
					 app.domain.exports(namespace,{'modaldiv':$modaldiv});
					$("#closemodal",$elem).trigger("click");
					app.dispatcher.load({
						title:title,//跳转的节点名
						moduleId: section[0],
						section: section.slice(1),
					});	
				}else{
					if(appId==""){
						app.alert("在cmdb中找不到该系统，请联系管理员");
					}
					if(section.length==0){
						app.alert("暂未支持该监控对象！");
					}
				}
			});
			
			
			//根据app_id获取事件列表
			$elem.on('click',"[data-role=applist]",function(event){
				var idall = $("#Id",$elem).val(),
				idStr = idall.split(","),
				id = idStr[0],
				tableflag = idStr[13],
				date0 = idStr[14],
				$div =$(this),
				$related = $div.parent(),
				$span = $div.find("span"),
				app_id_0 = $("input:hidden",$related).val();
				if(app_id_0!=""&&app_id_0!=null&&typeof(app_id_0)!='undefined'){
					$.ajax({
						"type":"POST",
						"url":"./EventAction_AppEventlist.do",
						"dataType":"json",
						"data":{
							"appId0":app_id_0,
							"date0":date0,
							"id":id
						},
					    "success":function(data){
					    	$('[data-role=eventli]',$related).empty();
					    	if(data&&data.status){
					    		//事件列表
//							    	var event_list = data.content.event_list;
					    		var jsonob = data.content.jsonob2,
					    		subcomponent = jsonob.subcomponent,
					    		event_type = jsonob.event_type,
					    		event_list = jsonob.event_desc,
					    		event_id = jsonob.event_id,
					    		server_id = jsonob.device_id,
					    		alertexp = jsonob.alertexp,
					    		in_channel = jsonob.in_channel,
					    		ticket_crt = jsonob.ticket_crt,
					    		app_id = jsonob.app_id,
					    		device_id = jsonob.device_id,
					    		obj_type = jsonob.obj_type,
					    		obj_id = jsonob.obj_id,
					    		app_supportgroup = jsonob.app_supportgroup,
								obj_attr1 = jsonob.device_item,
								obj_cname = jsonob.obj_cname,
								app_c_name = jsonob.app_c_name,
					    		liid = $(".tab-pane:last",$elem).attr("id"),
					    		leng = subcomponent.length;
								if(leng>0){
										$("[data-role=eventli]",$related).attr("data-num",leng);
										for(var i=0;i<leng;i++){
											if(subcomponent[i]!=""){
					    						var alerte = (alertexp[i]).replace(/\"/g,"'"),
					    						texts = event_id[i]+','+ticket_crt[i]+','+app_id[i]+','+device_id[i]+','+obj_type[i]+','+obj_id[i]+','+alerte+','+in_channel[i]+','+app_supportgroup[i]+','+obj_cname[i]+','+obj_attr1[i]+','+app_c_name[i]+',';
					    						if(tableflag == '0'){
					    							texts=texts+',0'
					    						}else if(tableflag == '01'){
					    							texts=texts+',01'
					    						}else{
					    							texts=texts+',1'
					    						}
					    						if(event_type[i]!="0"){
					    							if(event_type[i]=="2"){
						    							$("[data-role=eventli]",$related).append('<div style="margin-bottom:20px;height:auto;"><div data-role="namelist" style="height:20px;cursor:pointer;" title="'+event_list[i]+'"><div style="float:left;width:28px;margin-top:5px">'
						    									 +'<div style="height:10px;width:10px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;background-color:#fa594d"></div></div>'
												                 +'<span style="float:left;font-size:14px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;max-width:200px;color:#4d4d4d" data-role="sp1">'+subcomponent[i]+'</span><span class="texts hide" data-role="'+event_id[i]+'">'+texts+'</span></div></div>');
						    						}else if(event_type[i]=="1"){
						    							$("[data-role=eventli]",$related).append('<div style="margin-bottom:20px;height:auto;"><div data-role="namelist" style="height:20px;cursor:pointer;" title="'+event_list[i]+'"><div style="float:left;width:28px;margin-top:5px">'
						    									 +'<div style="height:10px;width:10px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;background-color:#ffa602"></div></div>'
												                 +'<span style="float:left;font-size:14px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;max-width:200px;color:#4d4d4d" data-role="sp1">'+subcomponent[i]+'</span><span class="texts hide" data-role="'+event_id[i]+'">'+texts+'</span></div></div>');
						    						}else{
						    							$("[data-role=eventli]",$related).append('<div style="margin-bottom:20px;height:auto;"><div data-role="namelist" style="height:20px;cursor:pointer;" title="'+event_list[i]+'"><div style="float:left;width:28px;margin-top:5px">'
						    									 +'<div style="height:10px;width:10px;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;background-color:white"></div></div>'
												                 +'<span style="float:left;font-size:14px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;max-width:200px;color:#4d4d4d" data-role="sp1">'+subcomponent[i]+'</span><span class="texts hide" data-role="'+event_id[i]+'">'+texts+'</span></div></div>');
						    						}
					    						}
					    					}
					    		        }
					    		}
								if($("#allrelatedevent",$elem).height()>360){
				    				//同期报警滚动条	
				    				$("#allrelatedevent",$elem).slimScroll({
				    					height:"360px",
				    					color:'#ccc'
				    				});
//					    				$("#allrelatedevent1",$elem).slimScroll({
//					    					height:"100%",
//					    					color:'#ccc'
//					    				});
				    			}
			    				var heights = (920-$('.related-event-info.b',$elem).height())+"px";
				    			$('.related-event-info.a',$elem).css('height',heights);
					    	}
					    },  
					    "error": function (xhr, status, errMsg) {
							app.alert(data.errorMsg);
						}
					})
		    		if($div.next("[data-role=eventli]:visible").length){
		    			$("[data-role=eventli]",$elem).css("display","none");
		    			$div.css("background-color","#fff");
		    			$('[data-role=relateddetail0]',$elem).find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
		    		}else{
		    			$div.siblings().css("background-color","#fff");
						$div.css("background-color","#fafaf7");
						$related.find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
				    	$related.siblings().find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
				    	$("[data-role=eventli]",$related).css("display","block");
				    	$("[data-role=eventli]",$related.siblings()).css("display","none");
			    		$('[data-role=eventli]',$related).children().eq(0).find('span').css("color","#2b2b2b");
		    		}
			    }
			});
			
			//点击报警事件显示该事件的详情
			$elem.on('click',"[data-role=namelist]",function(event){
				var subcomponent = $(this).find('[data-role=sp1]').text(),
				texts = $(this).find(".hide").text(),
				i = (texts.split(","))[0],
				server_id = (texts.split(","))[3],
			    app_id_0 = $(this).parent().parent().siblings().find("input").val(),
				$tabs = $(".nav.nav-tabs",$elem),
				$lis = $('li', $tabs),
				len = $lis.length,
				$contents = $(".tab-contents",$elem),
				flag0 = 1,
				flag1 = 1,
				htmls = $("#eventDetailsLeft",$elem).children().html();
				for(var k = 0;k<len;k++){
					if($lis.eq(k).attr('title')==i){
						flag0 = 0;
						break;
					}
				}
				for(var t = 0;t<7;t++){
					if($('li:visible',$tabs).eq(t).attr('title')==i){
						flag1 = 0;
						break;
					}
				}
                if(flag0==0){
                	var $spans = $('li',$tabs).find('[data-role="'+i+'"]');
					if(flag1==0){
						if($tabs.find('.active').find('span').text()!=i){
							$lis.removeClass("active");
							$spans.parent().addClass('active');
							$contents.children().addClass('hide');
							$contents.find('[data-role="'+i+'"]').removeClass('hide').addClass('active');
							that.loadDetails($contents.find('.active'),i,app_id_0,server_id);
						}
					}else{
						var $lispan = $spans.parent(),
						index = $lispan.index(),
						$livi = $('li:visible',$tabs).eq(0),
						viindex = $livi.index();
						$lis.removeClass("active").addClass('hide');
						$lispan.removeClass('hide').addClass('active');
						if(index<viindex){
							for(var m=index;m<index+7;m++){
								$lis.eq(m).removeClass('hide');
							}
						}else if(index>viindex+7){
							if(len-index<8){
								for(var n=len;n>len-7;n--){
									$lis.eq(len).removeClass('hide');
								}
							}else{
								for(var m=index;m<index+7;m++){
									$lis.eq(m).removeClass('hide');
								}
							}
						}
						$contents.children().addClass('hide');
						$contents.find('[data-role="'+i+'"]').removeClass('hide').addClass('active');
						that.loadDetails($contents.find('.active'),i,app_id_0,server_id);
					}
				}else{
					$lis.removeClass("active");
					$tabs.append('<li class="active" title="'+i+'"><a data-toggle="tab">'+subcomponent+'</a>'+'<span class="hide" data-role="'+i+'">'+i+'</span>'
							+'<button type="button" data-role="closeelse" class="close" style="margin-top: -33px;margin-right: 5px;color:#222">×</button></li>');
					$(".tab-pane",$elem).removeClass("active").addClass("hide");
					$('.modal-event-detail-info-desc-cont',$(".tab-contents",$elem)).empty();
					$contents.append('<div class="tab-pane active" data-role="'+i+'">'+htmls+'</div>');
					var moveBtns='#tabLeft,#tabRight',
					totallength = $('li', $tabs).length,
					tabsOffsetLeft = 180;
					$(moveBtns,$elem).addClass('hide');
	                if(totallength>=8){
	                	$('#tabLeft',$elem).removeClass('hide');
	                    $('#tabRight',$elem).removeClass('hide');
	                    for(var j = 0;j<totallength-7;j++){
	                    	$tabs.children().eq(j).addClass('hide');
	                    }
	                }
					that.loadDetails($contents.find('.active'),i,app_id_0,server_id);
				}
			});
			
			//tab页左右切换
			$elem.on('click','#tabLeft,#tabRight',function(){
				var $tabs = $(".nav.nav-tabs",$elem),
				$list = $('li', $tabs),
				totallength = $list.length,
				$li = $tabs.find('li:visible'),
				idall;
				if(totallength>7){
					if($(this).attr('id')=='tabLeft' && $list.eq(0).hasClass('hide')){
						$li.eq(6).removeClass('hide').addClass('hide');
						$li.eq(0).prev().removeClass('hide');
					}else if($(this).attr('id')=='tabRight' && $list.eq(totallength-1).hasClass('hide')){
						$li.eq(0).removeClass('hide').addClass('hide');
						$li.eq(6).next().removeClass('hide');
					}
				}
			});
			
			//切换tab页
			$elem.on('click',"li a",function(){
				var hrefs = $(this).attr("href"),
				i = $(this).closest('li').attr('title'),
				$divs = $("[data-role=namelist]",$elem).has("[data-role="+i+"]");
				if(hrefs != '#tab1'){
					$divs.trigger("click");
				}else{
					if($("#tab1",$elem).hasClass('hide')){
						$(".nav.nav-tabs",$elem).children().removeClass("active");
						$(".nav.nav-tabs",$elem).children().eq(0).addClass("active");
						$(".tab-pane",$elem).removeClass("active").addClass("hide");
						$("#tab1",$elem).removeClass("hide").addClass("active");
						var idall = $("#Id",$elem).val(),
						idStr = idall.split(","),
				    	id = idStr[0],
				    	app_ids=(idStr[2]).split('|'),
				    	app_id = app_ids[0],
						server_id=idStr[3];
						that.loadDetails($("#tab1",$elem),id,app_id,server_id);
					}
				}
			});
			
			//关闭报警事件详情页面
			$elem.on('click',"[data-role=closeelse]",function(){
				var $li = $(this).parent(),
				$pan = $(".tab-pane",$elem).find(".active"),
				$liacti = $(".nav.nav-tabs",$elem).find('.active'),
				idall,
				visiindex = ($('li:visible',$elem).eq(0)).index(),
				len0 = $('li',$elem).length;
				if($li.hasClass('active')){//点击的li即当前显示的
					if(visiindex==0){
						if(len0>7){
							$('li',$elem).eq(7).removeClass('hide');
						}
					}else{
						($('li:visible',$elem).eq(0)).prev().removeClass('hide');
						$('li',$elem).eq($liacti.index()-1).removeClass('hide');
					}
					$li.removeClass('active');
					$li.prev().addClass("active");
					$pan.removeClass('active').addClass('hide');
					$pan.prev().removeClass("hide").addClass("active");
				}else{//点击的li不是当前显示的
					var actiindex = $liacti.index();
					if($liacti.hasClass('hide')){//当前显示的时隐藏的
						$liacti.removeClass('hide');
						$('li',$elem).addClass('hide');
						if(($('li',$elem).eq(0)).hasClass('hide') && actiindex<visiindex && actiindex<7){
							for(var t=0;t<7;t++){
								$('li',$elem).eq(t).removeClass('hide');
							}
						}else{
							for(var t = actiindex;t>actiindex-8;t--){
								$('li',$elem).eq(t).removeClass('hide');
							}
						}
					}else{//当前显示的是不隐藏的
						if(!($('li',$elem).eq(0)).hasClass('hide')){//第一个事件详情页不是隐藏的
							$('li',$elem).eq(7).removeClass('hide');
						}else{//第一个事件详情页是隐藏的
							$('li',$elem).eq(visiindex).prev().removeClass('hide');
						}
					}
				}
				$li.remove();
				$pan.remove();
				if($('li',$elem).length<8){
					$('#tabLeft',$elem).addClass('hide');
                    $('#tabRight',$elem).addClass('hide');
				}
				if($('li',$elem).eq(0).hasClass('active')){
					idall = $("#Id",$elem).val();
				}else{
					var i = $('li.active',$elem).attr('title'),
					$span = $('[data-role=eventli]',$elem).find('[data-role="'+i+'"]');
					idall = $span.text();
				}
				var idStr = idall.split(","),
		    	id = idStr[0],
		    	app_ids=(idStr[2]).split('|'),
		    	app_id = app_ids[0],
				server_id=idStr[3];
				that.loadDetails($(".tab-contents",$elem).find(".active"),id,app_id,server_id);
			});
			//双击关闭报警事件详情页面
			$elem.on('dblclick',"li",function(){
				var $li = $(this),
				ahref = $li.find('a').attr('href');
				if(ahref!='#tab1'){
					$("[data-role=closeelse]",$li).trigger("click");
				}
			});
			
		    //转代办的确定按钮
			$elem.on('click',"#dtlCreSmtBtn",function(){
		    	var $div = $('.tab-pane.active',$elem),
		    	time = $('#time', $elem).val(),
		    	warn = $('#warn', $elem).val(),
		    	eventTable = that.table,
		    	$newdiv = that.div,
		    	idall = $("#towaitId",$elem).text(),
		    	idStr = idall.split(","),
		    	id0 = idStr[0],
		    	tableflag = idStr[13],
		    	expression0 = $("#expression0",$elem).val(),
	    	    indexstart = expression0.indexOf("'"),
	    	    oldval = expression0.substring(indexstart+1,expression0.length-1);
		    	if(parseInt(warn)<parseInt(oldval)){
		    		alert("新阈值须大于原阈值"+oldval);
		    	}else{
		    		var newalertexp = expression0.substring(0,indexstart-1)+'>"'+warn+'"',
		    		dindex = $("#dindex",$elem).text();
			    	if(newalertexp!='' && time!=''){
			    			$.ajax({
								"type":"POST",
								"url":"./EventAction_changeTowait.do",
								"dataType":"json",
								"data":{"id":id0,
								        "time":time,
								        "alert_exp":newalertexp
								},
								"success":function(data){
									if(data&&data.status){
										$("#span6",$div).text(that.stateCss1($div,"3"));
										$("#dealBtn",$div).addClass("disabled");
						    			$("#toWaitBtn",$div).addClass("disabled");
						    			if(tableflag == "0"){
						    				if($(this).closest('.tab-pane').attr('id')=="tab1"){
						    					eventTable.fnDeleteRow(dindex);
						    				}else{
						    					that.refreshtb();
						    				}
						    			}else if(tableflag == "1"){
											$newdiv.find('.aweb-accpetBtn').css({'text-decoration': 'none','cursor': 'default','color': '#CCC'});
										}
										app.alert('title','转待办成功！',app.alertShowType.SUCCESS);
									}else{
										app.alert("转待办失败");
									}
								},
								"error": function (xhr, status, errMsg) {
									app.alert(data.errorMsg);
								}
							});
				    	$('[data-role="agentDtlTemp"]' , $elem ).modal('hide');
				    	$("#towaitId",$elem).text('');
				    	$("#time",$elem).val('');
						$("#warn",$elem).val('');
						$("#expression0",$elem).val('');
			    	}else{
						alert("请输入时间和阈值！");
			    	}
		    	}
		    });
		    
		    //重置按钮
		    $elem.on('click',"#reset0",function(){
		    	$("#time",$elem).val('');
				$("#warn",$elem).val('');
		    });
		    
		    //受理
		    $elem.on('click',"#dealBtn",function(){
		    	var $div = $(this).closest('.tab-pane'),
		    	eventTable = that.table,
		    	$newdiv = that.div,
		    	idall;
		    	if($div.attr('id')=="tab1"){
		    		idall = $("#Id",$elem).val();
		    	}else{
		    		var i = $('li.active',$elem).attr('title'),
					$span = $('[data-role=eventli]',$elem).find('[data-role="'+i+'"]');
					idall = $span.text();
		    	}
				var idStr = idall.split(","),
		    	id0 = idStr[0],
		    	in_channel = idStr[7],
		    	ticketcrt = idStr[1],
		    	tableflag = idStr[13],
		    	eventstatus = $('#eventstatus',$div).val(),
		    	events = eventstatus.split(","),
				states = eventstatus[0],
				dindex;
		    	if(states=="0"){
					$.ajax({
						"type":"POST",
						"url":"./EventAction_EventStatusExchg.do",
						"dataType":"json",
						"data":{"id":id0},
						"success":function(data){
							if(data&&data.status){
								$("#span6",$div).text(that.stateCss1($div,"1"));
								$("#dealBtn",$div).addClass("disabled");
								if(tableflag=='0'){
									if($div.attr('id')=="tab1"){
										eventTable.fnUpdate(that.stateCss("1"),parseInt(dindex),7,false,false);
										if(in_channel=="cama"){
											if(ticketcrt=="0"){//可以转工单
												if(events[2].indexOf("使用率")>=0){//可以转待办
													eventTable.fnUpdate(that.listcontent(idall,1),parseInt(dindex),8,false,false);
												}else{
													eventTable.fnUpdate(that.listcontent(idall,3),parseInt(dindex),8,false,false);
												}
											}else{//不可以转工单
												if(events[2].indexOf("使用率")>=0){//可以转待办
													eventTable.fnUpdate(that.listcontent(idall,5),parseInt(dindex),8,false,false);
												}else{
													eventTable.fnUpdate(that.listcontent(idall,7),parseInt(dindex),8,false,false);
												}
											}
										}else{
											eventTable.fnUpdate(that.listcontent(idall,7),parseInt(dindex),8,false,false);
										}
									}else{
										that.refreshtb();
									}
								}else if(tableflag == "1"){
									if($div.attr('id')=="tab1"){
										$newdiv.find('.aweb-accpetBtn').css({'text-decoration': 'none','cursor': 'default','color': '#CCC'});
									}
								}
								app.alert('title','受理成功！',app.alertShowType.SUCCESS);
							}else{
								app.alert("受理失败");
							}
						},
						"error": function (xhr, status, errMsg) {
								app.alert(data.errorMsg);
						}
					})
		    	}
		    });
			
		    //解除
		    $elem.on('click',"#releaseBtn",function(){
				var $div = $(this).closest('.tab-pane'),
				eventTable = that.table,
				$newdiv = that.div,
				idall ;
				if($div.attr('id')=="tab1"){
		    		idall = $("#Id",$elem).val();
		    	}else{
		    		var i = $('li.active',$elem).attr('title'),
					$span = $('[data-role=eventli]',$elem).find('[data-role="'+i+'"]');
					idall = $span.text();
		    	}
				var idStr = idall.split(","),
		    	id0 = idStr[0],
		    	tableflag = idStr[13],
				eventstatus = $('#eventstatus',$div).val(),
				events = eventstatus.split(","),
				states = eventstatus[0],
				dindex;
				if(states!="2"){
			    	app.confirm({
			    		title:'确认',
						content:'是否执行解除？',
						btnConfirm:'确定',
						btnCancel:'取消',
						confirmHandler:function(){
							$.ajax({
								"type":"POST",
								"url":"./EventAction_EventStatusExchg0.do",
								"dataType":"json",
								"data":{"id":id0},
								"success":function(data){
									if(data&&data.status){
										$("#span6",$div).text(that.stateCss1($div,"2"));
										$("#dealBtn",$div).addClass("disabled");
						    			$("#toWaitBtn",$div).addClass("disabled");
						    			$("#releaseBtn",$div).addClass("disabled");
						    			if(tableflag != "1"){
						    				if($div.attr('id')=="tab1"){
						    					dindex = $("#dindex",$elem).text();
						    					eventTable.fnDeleteRow(parseInt(dindex));
						    				}else{
						    					that.refreshtb();
						    				}
						    			}else{
						    				if($div.attr('id')=="tab1"){
						    					$newdiv.find('.aweb-accpetBtn').css({'text-decoration': 'none','cursor': 'default','color': '#CCC'});
						    				}
										}
							    		app.alert('title','解除成功！',app.alertShowType.SUCCESS);
									}else{
										app.alert('解除失败!');
									}
								},
								"error": function (xhr, status, errMsg) {
										app.alert(data.errorMsg);
								}
							})
						},
						args:['确定','取消']
					})
				}
			});
			
			//转待办时间控件
			$('[data-role="form_datetimee"]', $elem).datetimepicker({
				CustomFormat:"yyyy-mm-dd hh:mm",
				ShowUpDown:true,
				autoclose: true,
				todayBtn: true,
				hourStep: 1,
				pickerPosition: "bottom-left"
			}).on('click',function(ev){
				$('[data-role="form_datetimee"]', $elem).datetimepicker('setStartDate',new Date());
			})
			
		    //转代办
			$elem.on('click',"#toWaitBtn",function(){
				var $div = $(this).closest('.tab-pane'),
				eventstatus = $('#eventstatus',$div).val(),
				events = eventstatus.split(","),
				idall;
				if($div.attr('id')=="tab1"){
		    		idall = $("#Id",$elem).val();
		    	}else{
		    		var i = $('li.active',$elem).attr('title'),
					$span = $('[data-role=eventli]',$elem).find('[data-role="'+i+'"]');
					idall = $span.text();
		    	}
				var idStr = idall.split(",");
				if((events[0]=="0" || events[0]=="1") && (events[1]=="cama" && events[2].indexOf("使用率")>=0)){
					var alertexp = idStr[6];
					if(alertexp.indexOf("&&")>=0 || alertexp.indexOf("||")>=0){
						app.alert("暂不支持该事件转待办！！！");
					}else{
						$('[data-role="agentDtlTemp"]',$elem ).modal('show');
						$("#expression0",$elem).val(alertexp);
						$("#towaitId",$elem).text(idall);
						$("#time",$elem).val('');
						$("#warn",$elem).val('');
					}
				}
			});
			
		    //转工单
			$elem.on('click',"#toIncidentBtn",function(){
				var $div = $(this).closest('.tab-pane'),
				eventTable = that.table,
				$newdiv = that.div,
				idall;
				if($div.attr('id')=="tab1"){
		    		idall = $("#Id",$elem).val();
		    	}else{
		    		var i = $('li.active',$elem).attr('title'),
					$span = $('[data-role=eventli]',$elem).find('[data-role="'+i+'"]');
					idall = $span.text();
		    	}
				var idStr = idall.split(","),
		    	id0 = idStr[0],
		    	in_channel = idStr[7],
		    	ticketcrt = idStr[1],
		    	tableflag = idStr[13],
		    	eventstatus = $('#eventstatus',$div).val(),
				events = eventstatus.split(","),
				dindex = $("#dindex",$elem).text();
				if(ticketcrt=="0" && in_channel=="cama"){
				app.confirm({
					title:'确认',
					content:'是否执行转工单？',
					btnConfirm:'确定',
					btnCancel:'取消',
					confirmHandler:function(){
						$.ajax({
							"type":"POST",
							"url":"./EventAction_eventToIncident.do",
							"dataType":"json",
							"data":{"id":id0},
							"success":function(data){
								if(data&&data.status){
									if(tableflag=='0'){
										if($("#span6",$div).text()=='未处理'){
											$("#span6",$div).text(that.stateCss1($div,"1"));
											if($div.attr('id')=="tab1"){
												eventTable.fnUpdate(that.stateCss("1"),parseInt(dindex),7,false,false);
												if(events[2].indexOf("使用率")>=0){//可以转待办
													eventTable.fnUpdate(that.listcontent(idall,5),parseInt(dindex),8,false,false);
												}else{
													eventTable.fnUpdate(that.listcontent(idall,7),parseInt(dindex),8,false,false);
												}
											}else{
												that.refreshtb();
											}
										}
									}else if(tableflag=='01'){
										if($div.attr('id')=="tab1"){
											eventTable.fnUpdate(that.listcontent(idall,9),parseInt(dindex),9,false,false);
										}else{
											that.refreshtb();
										}
									}else if(tableflag == "1"){
										$newdiv.find('.aweb-accpetBtn').css({'text-decoration': 'none','cursor': 'default','color': '#CCC'});
									}
									$("#span8",$div).text("已转工单");
									$("#dealBtn",$div).addClass("disabled");
					    			$("#toIncidentBtn",$div).addClass("disabled");
					    			app.alert('title','转工单成功！',app.alertShowType.SUCCESS);
								}else{
									app.alert(data.errorMsg);
								}
							},
							"error": function (xhr, status, errMsg) {
									app.alert(data.errorMsg);
							}
						})
					},
					args:['确定','取消']
				})	}
			});
			//复制按钮
			$elem.on('click','#copydesc',function(){
				
				var $div = $(this).closest('.tab-pane'),clipboard;
				clipboard&&clipboard.destroy();
				clipboard = new app.clipboard('#copydesc');
	        	clipboard.on('success',function(e){
	        		app.alert("复制事件概况成功！");
	        		console.log(e.text);
	        		clipboard&&clipboard.destroy();
	        	});
	        	clipboard.on('error',function(e){
	        		console.log(e);
	        		clipboard&&clipboard.destroy();
	        	});
			});
			$elem.on('mouseout','#copydesc',function(){
				var $div = $(this).closest('.tab-pane');
				 $('#copydesc',$div).unbind('click');
			})
			
			//图表跳转
			$elem.on('click','#tosystem',function(){
				var $div = $(this).closest('.tab-pane'),
				app_id = $("#hide_app_id",$div).text(),
				app_cname = $("#span0",$div).text(),
				section = ["appAll","system"];
				if(app_id!=''){
					$("#closemodal",$elem).trigger("click");
					app.domain.exports("appAll",{'appId':app_id});
					app.domain.exports("appAll",{'objType':'0'});
					app.dispatcher.load({
						title:app_cname,
						moduleId: section[0],
						section: section.slice(1)
					});	
				}else{
					app.alert("不支持该跳转！");
				}
			});
		    /* 绑定事件End */
		},
	
		//接收参数
		accpetTable : function(table){
			var that = this;
			that.table = table;
		},
		accpetdiv : function(div){
			var that = this;
			that.div = div;
		},
		accpetFunc : function(func){
			var that = this;
			that.stateCss = func[0];
			that.listcontent = func[1];
			that.refreshtb = func[2];
			that.changedatetime = func[3];
		},
		//操作数据转换
		stateCss1 : function($elem,states){
			var state,
			that = this;
	    	if(states=="0"){
	    		state = "未处理";
	    		$("#span6",$elem).css("color","#f01024");
	    	}else if(states == "1"){
	    		state = "已受理";
	    		$("#span6",$elem).css("color","#ffa602");
	    	}else if(states == "2"){
	    		state = "关闭";
	    	}else if(states == "3"){
	    		state = "待办";
	    	}else{
	    		state = "";
	    	}
	    	return state;
		},
		//事件类型转换
		formateDate : function(date1){
			var date = new Date(),
	    	date0_1=new String(date1),
	        i = date0_1.length,
	        date0 = '';
			for(var j = 0;j<14-i;j++){
				date0 = '0'+date0;
			}
			date0_1 = date0+date0_1;
	        var y = date0_1.substring(0,4), 
	        m = date0_1.substring(4,6),  
	        d = date0_1.substring(6,8),
	        h = date0_1.substring(8,10),
	        minute = date0_1.substring(10,12), 
	        second = date0_1.substring(12,14);
	        date = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
	        return date;
		},
		setoptions : function(title,datax,datax_name,datay,datay_name,type,smooth){
			var option1;
	    	if(smooth==0){
	    		option1={
			    	    xAxis:[{
							data:datax,
							nameTextStyle:{
								color:'#ccc'
							}
						}],
						yAxis:[{
							name:datay_name,
							nameTextStyle:{
								color:'#ccc'
							}
						}],
			    	    series : [
			    	              {
			    	            	  name:title,
			    	                  type:type,
			    	                  symbol:'none',
			    	                  smooth:true,
			    	                  itemStyle: {
			    	                	  normal: {lineStyle : {
												width : 1,  
												color:'rgba(19,177,245,0.6)'
											},
											areaStyle : {
												type : 'default',
												color : 'rgba(19,177,245,0.6)' 
											}}},
			    	                  data:datay
			    	              }]
	    		}
	    	}else{
	    		option1={
			    	    xAxis:[{
							data:datax,
							nameTextStyle:{
								color:'#ccc'
							}
						}],
						yAxis:[{
							name:datay_name,
							nameTextStyle:{
								color:'#ccc'
							}
						}],
			    	    series : [
			    	              {
			    	            	  name:title,
			    	                  type:type,
			    	                  symbol:'none',
			    	                  itemStyle: {
			    	                	  normal: {color:'rgb(19,177,245)',lineStyle:{width:1}},barBorderRadius:0},
			    	                  data:datay
			    	              }]
	    		}
	    	}
	    	return option1;
		},
		//根据id加载事件详情
		loadDetails:function($elem,id,app_id,server_id){
			var that = this,
			option0 = that.option0,
	    	$CPUCtn = $('[data-role = CPUCtn]', $elem),
			CPUCtnEcharts = echarts.init($CPUCtn[0]),
			$CPU1Ctn = $('[data-role = CPU1Ctn]', $elem),
			CPU1CtnEcharts = echarts.init($CPU1Ctn[0]),
			$SWAPCtn = $('[data-role = SWAPCtn]', $elem),
			SWAPCtnEcharts = echarts.init($SWAPCtn[0]),
			$PortCtn = $('[data-role = PortCtn]', $elem),
			$SuccessPctCtn = $('[data-role = SuccessPctCtn]',$elem),
			SuccessPctCtnEcharts = echarts.init($SuccessPctCtn[0]),
			$TPSCtn = $('[data-role = TPSCtn]',$elem),
			TPSCtnEcharts = echarts.init($TPSCtn[0]),
			$TimeCtn = $('[data-role = TimeCtn]',$elem),
			TimeCtnEcharts = echarts.init($TimeCtn[0]),
			$echarts0Ctn = $('[data-role = echarts0]', $elem),
			$echarts1Ctn = $('[data-role = echarts1]', $elem),
			$echarts2Ctn = $('[data-role = echarts2]', $elem);			
	    	$("#self_name",$elem).text("");
	    	app.nodata.hideLoading($CPUCtn);
	    	app.nodata.hideLoading($CPU1Ctn);
	    	app.nodata.hideLoading($SWAPCtn);
			CPUCtnEcharts.clear().setOption(option0);   
			SWAPCtnEcharts.clear().setOption(option0);
			CPU1CtnEcharts.clear().setOption(option0);
		    app.nodata.hideLoading($SuccessPctCtn);
	    	app.nodata.hideLoading($TPSCtn);
	    	app.nodata.hideLoading($TimeCtn);
		    SuccessPctCtnEcharts.clear().setOption(option0);
		    TPSCtnEcharts.clear().setOption(option0);
		    TimeCtnEcharts.clear().setOption(option0);
		    app.nodata.showLoading($echarts0Ctn);
		    app.nodata.showLoading($echarts1Ctn);
		    app.nodata.showLoading($echarts2Ctn);
		    $("#PortCtn",$elem).empty();
		    $('#eventBtnGroup',$elem).addClass("hide");
		    $('[data-role=modal-event-echart-self]' , $elem).addClass("hide");
			$('#up-and-down-port',$elem).removeClass("fa-chevron-up").addClass("fa-chevron-down");
			$('[data-role=modal-event-echart-sys]' , $elem).addClass("hide");
			$('#up-and-down-sys',$elem).removeClass("fa-chevron-up").addClass("fa-chevron-down");
			$('[data-role=modal-event-echart-app]' , $elem).addClass("hide");
			$('#up-and-down-app',$elem).removeClass("fa-chevron-up").addClass("fa-chevron-down");
			$('[data-role=modal-event-echart-mo]' , $elem).addClass("hide");
			$('#up-and-down-mo',$elem).removeClass("fa-chevron-up").addClass("fa-chevron-down");
			$('.modal-event-detail-info-desc-cont',$elem).append('<span id="span9" class="selectableText"></span>');
			$.ajax({
	    		"type":"POST",
	    		"url":"./EventAction_loadChart.do",
	    		"dataType":"json",
	    		async:false,
	    		"data":{
	    			"id":id
	    		},
	    		"success":function(resp){
	    			if(resp&&resp.status){
	    				if(resp.content.jsonob){
	    					var jsonob = resp.content.jsonob,
	    					app_c_name = jsonob.app_c_name,
	    					app_cname = app_c_name[0],
	    					appname = app_cname.split("|"),
	    					app_Id=(jsonob.app_id)[0],
	    			    	app_id = app_Id.split("|");
	    					//基本信息
			    			$('#span1',$elem).text(jsonob.subcomponent);
			    			$('#span2',$elem).text(that.formateDate(jsonob.first_occu_datetime));
			    			$('#span3',$elem).text(that.formateDate(jsonob.last_occu_datetime));
			    			var type = jsonob.event_type;
			    			if(type=="0"){
			    				$('#span4',$elem).text("通知");
					    	}else if(type == "1"){
					    		$('#span4',$elem).text("预警").css("color","#ffa602");
					    	}else if(type == "2"){
					    		$('#span4',$elem).text("告警").css("color","#f01024");
					    	}else{
					    		$('#span4',$elem).text("");
					    	}
			    			$('#span9',$elem).text(jsonob.event_desc);
			    			$('#copydesc',$elem).attr('data-clipboard-target','#span9');
				    		$('#span5',$elem).text(jsonob.device_ip_manage);
			    			$('#span6',$elem).text(that.stateCss1($elem,jsonob.event_status));
			    			$('#span7',$elem).text(jsonob.cabinet_no);
			    		    $('#towaittime',$elem).text(jsonob.state_change_date+","+jsonob.state_change_time);
			    			var tick = jsonob.ticket_crt;
			    			if(tick=="0"){
					    		$('#span8',$elem).text("未转工单").css("color","#f01024");
					    	}else if(tick=="1"){
					    		$('#span8',$elem).text("已转工单");
					    	}else{
					    		$('#span8',$elem).text("");
					    	}
			    			$('#span10',$elem).text(jsonob.tally);
			    			$('#ser_name',$elem).text(jsonob.device_c_name);
			    			$('#event_os',$elem).text(jsonob.device_item);
			    			var device_ip = jsonob.device_ip,
			    			ipadd = device_ip[0],
			    			ipadd0 = ipadd.split(",");
			    			$('[data-role=ipadd]',$elem).empty();
			    			$('[data-role=ipadd]',$elem).data('items',ipadd0.length);
			    			$('#ipadd',$elem).append('<div id="ipadd0">'+ipadd0[0]+'</div><div data-role="moreip" style="display:none"></div>');
			    			if(ipadd0.length>1){
			    				$('#ipadd0',$('#ipadd',$elem)).append('<i id="ipaddmoreflag" class="fa fa-chevron-down" style="float:right;font-size:12px;line-height:27px;"></i>');
			    				for(var i = 1;i<ipadd0.length;i++){
			    					$('[data-role="moreip"]',$('#ipadd',$elem)).append('<div style="line-height:27px;border-top:1px dashed #e5e5e5">'+ipadd0[i]+'</div>');
			    				}
			    			}
			    			var app_mgr_name = jsonob.app_mgr_name,
			    			app_mgr_phone = jsonob.app_mgr_phone;
			    			var mgr_name=app_mgr_name[0],
			    			mgr_phone=app_mgr_phone[0];
			    			var eve_name=mgr_name.split("|"),
			    			phonenum=mgr_phone.split("|");
			    			$('[data-role=eve_name]',$elem).empty();
			    			$('#span0',$elem).empty();
			    			$("#phonenum",$elem).text('');
			    			$("#hide_app_id",$elem).text('');
			    			$('[data-role=eve_name]',$elem).data("eve_name",eve_name);
							$("#phonenum",$elem).data("phonenum",phonenum);
			    			for(var i = 0;i<appname.length;i++){
	    						$('#span0',$elem).append('<option value='+appname[i]+'>'+appname[i]+'</option>');
	    					}
			    			$("#hide_app_id",$elem).text(app_id[0]);
			    			var eve_namei = eve_name[0],
							phonenums = phonenum[0];
							var app_name = eve_namei.split(","),
							phoneno = phonenums.split(",");
							for(var j =0;j<app_name.length;j++){
	    						$('[data-role=eve_name]',$elem).append('<option value='+j+'>'+app_name[j]+'</option>');
	    					}
							$("#hide_app_id",$elem).data("app_id",app_id);
							$("#phonenum",$elem).removeData("pnum");
							$("#phonenum",$elem).data("pnum",phoneno);
			    			$("#phonenum",$elem).text(phoneno[0]);
			    			

			    			//判断按钮是否可以
			    			var status = jsonob.event_status,
			    			in_channel = jsonob.in_channel,
			    			event_desc = jsonob.event_desc.toString();
			    			$('#eventstatus',$elem).val(status+","+in_channel+","+event_desc);
			    			$("#dealBtn",$elem).removeClass("disabled");
			    			$("#toWaitBtn",$elem).removeClass("disabled");
			    			$("#releaseBtn",$elem).removeClass("disabled");
			    			$("#toIncidentBtn",$elem).removeClass("disabled");
			    			if(status=="1"){//已受理
			    				$("#dealBtn",$elem).addClass("disabled");
			    				if(in_channel!="cama" || event_desc.indexOf("使用率")<0){//可以转代办
			    					$("#toWaitBtn",$elem).addClass("disabled");
			    				}
			    			}else if(status=="2"){//关闭
			    				$("#toWaitBtn",$elem).addClass("disabled");
			    				$("#dealBtn",$elem).addClass("disabled");
			    				$("#releaseBtn",$elem).addClass("disabled");
			    			}else if(status=="0"){
			    				if(in_channel!="cama" || event_desc.indexOf("使用率")<0){//可以转代办
			    					$("#toWaitBtn",$elem).addClass("disabled");
			    				}
			    			}else{
			    				$("#dealBtn",$elem).addClass("disabled");
			    				$("#toWaitBtn",$elem).addClass("disabled");
			    			}
							
			    			var ticket_crt = jsonob.ticket_crt;
			    			if(ticket_crt!='0' || in_channel!='cama'){//能转工单
			    				$("#toIncidentBtn",$elem).addClass("disabled");
			    			}
	    				}
		    			
		    			//echarts图
						if((resp.content.cpux && resp.content.cpux!=null)||(resp.content.cpu_topx && resp.content.cpu_topx!=null)||(resp.content.memoryx && resp.content.memoryx!=null)||(resp.content.swapx && resp.content.swapx!=null)){
							$('[data-role=modal-event-echart-sys]' , $elem).removeClass("hide");
		    				$('#up-and-down-sys',$elem).removeClass("fa-chevron-down");
							$('#up-and-down-sys',$elem).addClass("fa-chevron-up");
						}
						if(resp.content.cpux!=null && resp.content.cpux){
		    					var option1 = that.setoptions('cpu信息',resp.content.cpux,"时间",resp.content.cpuy,'使用率(%)','line',1);
		    					CPUCtnEcharts.setOption(option1);
		    					CPUCtnEcharts.setOption({yAxis : [{max:100}]});
		    			}else{
		    				app.nodata.showLoading($CPUCtn);
		    			}
		    			
		    			var obj_attr1 = jsonob.device_item;
		    			$("#echarts-grid-name",$elem).text("");
		    			$("#echarts-grid-cpu",$elem).text("");
		    			if(obj_attr1=="Windows"){
		    				$("#echarts-grid-name",$elem).text("内存");
		    				if(resp.content.memoryx!=null && resp.content.memoryx){
			    					var option1 = that.setoptions('内存信息',resp.content.memoryx,"时间",resp.content.memoryy,'使用率(%)','line',0);
			    					SWAPCtnEcharts.setOption(option1);
			    					SWAPCtnEcharts.setOption({yAxis : [{max:100}]});
			    			}else{
			    				app.nodata.showLoading($SWAPCtn);
			    			}
		    				$("#echarts-grid-cpu",$elem).text("磁盘信息");
		    				if(resp.content.diskx!=null && resp.content.disky){
		    					var option1 = that.setoptions('磁盘信息',resp.content.diskx,"disk",resp.content.disky,'使用率(%)','bar',1);
		    					CPU1CtnEcharts.setOption(option1);
		    					CPU1CtnEcharts.setOption({yAxis : [{max:100}],series : [{itemStyle: {normal: {color:'rgba(19,177,245,0.6)'}},barWidth:'30'}]});
		    			    }else{
		    				    app.nodata.showLoading($CPU1Ctn);
		    			    }
		    			}else{
		    				$("#echarts-grid-name",$elem).text("SWAP");
		    				if(resp.content.swapx!=null && resp.content.swapx){
			    					var option1 = that.setoptions('交换空间信息',resp.content.swapx,"时间",resp.content.swapy,'使用率(%)','line',0);
			    					SWAPCtnEcharts.setOption(option1);
			    					SWAPCtnEcharts.setOption({yAxis : [{max:100}]});
			    			}else{
			    				app.nodata.showLoading($SWAPCtn);
			    			}
		    				$("#echarts-grid-cpu",$elem).text("CPU(TOP5)");
		    				if(resp.content.cpu_topx!=null && resp.content.cpu_topx){
		    					var option1 = that.setoptions('Cpu top5进程信息',resp.content.cpu_topx,"进程",resp.content.cpu_topy,'使用率(%)','bar',1);
		    					CPU1CtnEcharts.setOption(option1);
		    					CPU1CtnEcharts.setOption({yAxis : [{max:100}],series : [{itemStyle: {normal: {color:'rgba(19,177,245,0.6)'}}}]});
		    			    }else{
		    				    app.nodata.showLoading($CPU1Ctn);
		    			    }
		    			}
		    			
		    			if(resp.content.time && resp.content.time!=null){
		    				$('[data-role=modal-event-echart-app]' , $elem).removeClass("hide");
		    				$('#up-and-down-app',$elem).removeClass("fa-chevron-down");
							$('#up-and-down-app',$elem).addClass("fa-chevron-up");
		    			}
		    			if(resp.content.succper!=null && resp.content.succper){
		    					var option1 = that.setoptions('成功率',resp.content.time,"时间",resp.content.succper,'成功率(%)','line',1);
		    					SuccessPctCtnEcharts.setOption(option1);
		    					SuccessPctCtnEcharts.setOption({yAxis : [{max:100}]});
		    			}else{
		    				app.nodata.showLoading($SuccessPctCtn);
		    			}
		    			if(resp.content.tps!=null && resp.content.tps){
		    					var option1 = that.setoptions('TPS',resp.content.time,"时间",resp.content.tps,'交易量','line',1);
		    					TPSCtnEcharts.setOption(option1);
		    			}else{
		    				app.nodata.showLoading($TPSCtn);
		    			}
		    			if(resp.content.usedtime!=null && resp.content.usedtime){
		    					var option1 = that.setoptions('耗时',resp.content.time,"时间",resp.content.usedtime,'耗时','line',1);
		    					TimeCtnEcharts.setOption(option1);
		    			}else{
		    				app.nodata.showLoading($TimeCtn);
		    			}
		    			
		    			if(resp.content.KPI_DEF_ID_self && resp.content.KPI_DEF_ID_self!=null){
		    				$('[data-role=modal-event-echart-self]' , $elem).removeClass("hide");
		    				$('#up-and-down-port',$elem).removeClass("fa-chevron-down");
							$('#up-and-down-port',$elem).addClass("fa-chevron-up");
	    					var KPI_DEF_ID = resp.content.KPI_DEF_ID_self,
							SHOWTYPE= resp.content.SHOWTYPE_self,
							STATE= resp.content.STATE_self,
							SHOWID= resp.content.SHOWID_self,
	    					title=resp.content.title_self,
	    					end_time=resp.content.end_time,
	    					eventDetailobj;
	    					app.domain.exports('event_detail', {"eventid":id,"app_id":app_id,"kpi_def_id":KPI_DEF_ID,"server_id":server_id,"showType":SHOWTYPE,"state":STATE,"showId":SHOWID});
	    					$("#self_name",$elem).text(title);
	    					var start_time;
	    					if(STATE=="02"){
	    						start_time=resp.content.starttime;
	    					}else{
	    						start_time=resp.content.start_time;
	    					}
	    			    	if(SHOWTYPE=='table'){
	    			    		$('#eventBtnWarn',$elem).addClass('blue');
	    			    		$('#eventBtnNow',$elem).removeClass('blue');
	    			    		$('#eventBtnGroup',$elem).removeClass('hide');
    							setTimeout(function(){
    								eventDetailobj = new app.showData.tableCollection({
	    		    					$context: $elem,
	    		    					handler: new app.handler(),
	    		    					selector:"#PortCtn",//图表外部容器
	    		    					url:"./EventDetailAction_mainHandler.do",
	    		    					initDynamicUrl:"./EventDetailAction_mainHandler.do",
	    		    					urlParams:{"id":id,"showType":SHOWTYPE,"state":STATE},
	    		    					sDomFlag:"1",
	    		    					bInfo:true,
	    		    					bLengthChange:false,
	    		    					iDisplayLength:4
	    		    				});
    								eventDetailobj.start();
    							},"200");
	    					}else{
	    			    		$('#eventBtnWarn',$elem).addClass('blue');
	    			    		$('#eventBtnNow',$elem).removeClass('blue');
	    						$('#eventBtnGroup',$elem).removeClass('hide');
	    						setTimeout(function(){
	    							eventDetailobj = new app.showData.chartsCollection({
	    		    					$context: $elem,
	    		    					handler: new app.handler(),
	    		    					selector: "#PortCtn",//图表外部容器
	    		    					url:"./EventDetailAction_mainHandler.do",
	    		    					initDynamicUrl:"./EventDetailAction_mainHandler.do",
	    		    					urlParams:{"id":id,"showType":SHOWTYPE,"state":STATE},
	    		    					updateTime: 1000*60*60*12
	    		    				});
	    							eventDetailobj.start();
	    						},"500");
	    					}
		    			}else{
		    				app.nodata.showLoading($PortCtn);
		    			}
	    			}else{
	    				app.alert(data.errorMsg);
	    			}			
	    		},
	    		"error": function (xhr, status, errMsg) {
					app.alert(data.errorMsg);
				}
	    	})
		},
		
		//加载echarts图
		loadChart : function($elem){
			var that = this;
			var htmls = $("#eventDetailsLeft",$elem).children().html();
			$('.nav.nav-tabs li:first',$('[data-role="eventDtlTemp"]' , $elem)).siblings().remove();
			$('.nav.nav-tabs li:first',$('[data-role="eventDtlTemp"]' , $elem)).addClass('active');
			$('#tab1',$elem).siblings().remove();
			$('#tab1',$elem).addClass('active').removeClass('hide').empty().append(htmls);
			var idall = $("#Id",$elem).val(),
			idStr = idall.split(","),
	    	id = idStr[0],
	    	app_ids=(idStr[2]).split('|'),
	    	app_id = app_ids[0],
			server_id=idStr[3];
			$('.nav.nav-tabs li:first',$('[data-role="eventDtlTemp"]' , $elem)).attr('title',id);
	    	this.loadDetails($("#tab1",$elem),id,app_id,server_id);
		},
		relatedSys : function($elem){
			var that = this;
			var idall = $("#Id",$elem).val(),
			idStr = idall.split(","),
			date0 = idStr[14],
			id = idStr[0],
			tableflag = idStr[13];
			$.ajax({
				"type":"POST",
				"url":"./EventAction_relatedSys.do",
				"dataType":"json",
				async:false,
				"data":{
					"date0":date0,
					"id":id
				},
			    "success":function(resp){
			    	$('[data-role=relateddetail0]',$elem).empty();
			    	$("#allrelatedevent",$elem).slimScroll({
    					destroy:true
    				});
			    	$('.slimScrollRail,.slimScrollBar',$('.related-event-info.b',$elem)).remove();
			    	$('[data-role=relateddetail0]',$elem).css('height','auto');
			    	var heights = (920-$('.related-event-info.b',$elem).height())+"px";
		    		$('.related-event-info.a',$elem).css('height',heights);
			    	if(resp&&resp.status){
			    		//相关系统
		    			var jsonob1 = resp.content.jsonob1,
		    			system_app_name = jsonob1.app_c_name,
		    			app_id_0 = jsonob1.app_id;
		    			if(system_app_name.length>=1){
		    			   for(var i=0;i<system_app_name.length;i++){
		    			      if(system_app_name[i]!=""){
		    					  $('[data-role=relateddetail0]',$elem).append('<div data-role="relateddetail-de" style="width:100%;">'
					   		                 +'<div data-role="applist" style="border-bottom:1px solid #e5e5e5;line-height:61px;height:61px;cursor:pointer;"  title="'+system_app_name[i]+'"><div style="margin-left:20px;float:left;width:44px"><img src="img/event_relate.png" style="height:90%"/></div>'
					   		                 +'<span style="display:inline-block;font-size:14px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;max-width:200px;" id="releventname0">'+system_app_name[i]+'</span>'
					   		                 +'<input type="hidden" value="'+app_id_0[i]+'"><i class="fa fa-chevron-down" style="float:right;margin-right:20px;color:#ccc;font-size:14px;line-height:59px"></i></div>'
					   		                 + '<div data-role="eventli" data-num=0 style="overflow:hidden;width:100%;padding:20px 36px 0px 36px;border-bottom: 1px solid #e5e5e5;display:none"></div></div>');
		    					  if(i==system_app_name.length-1){
		    						  $(".related-event-info.b",$elem).css('border-bottom','none');
		    					  }
		    				  }
		    			   }
		    			}else{
				    		$('[data-role=relateddetail0]',$elem).append('<div style="height:60px;width:100%;line-height:60px"><span style="margin-left:20px;font-size:14px">无数据</span></div>');
		    			}
		    			if(system_app_name.length>7){
		    				//同期报警滚动条	
		    				$("#allrelatedevent",$elem).slimScroll({
		    					height:"360px",
		    					color:'#ccc'
		    				});
		    				$('.related-event-info.a',$elem).css('height','500px');
		    			}else{
		    				var heights = (920-$('.related-event-info.b',$elem).height())+"px";
			    			$('.related-event-info.a',$elem).css('height',heights);
		    			}
//		    			$("#allrelatedevent1",that.$elem).slimScroll({
		    				//	    					height:"100%",
		    				//	    					color:'#ccc'
		    				//	    				});
			    	}else{
			    		$('[data-role=relateddetail0]',that.$elem).append('<div style="height:60px;width:100%;line-height:60px"><span style="margin-left:20px;font-size:14px">无数据</span></div>');
	    			}
			    },
			    "error": function (xhr, status, errMsg) {
					app.alert(data.errorMsg);
				}
			})
		},
		refresh : function() {
			this.destroy();
			this.$element.eventDetails(this.options);
		},
		//销毁插件
		destroy : function() {
			this.$element.empty();
			this.$element.removeData('eventDetails');
		},
	};

	$.fn.eventDetails = function() {
		var option = arguments[0], args = arguments;
		return this.each(function() {
			var $this = $(this), 
			data = $this.data('eventDetails'), 
			options = $.extend(true, {}, $.fn.eventDetails.defaults, $this.data(),typeof option === 'object' && option);
			if (!data) {
				$this.data('eventDetails', (data = new EventDetails(this, options)));
			}
			if (typeof option === 'string') {
				data[option](args[1]);
			} else {
				data.init();
			}
		});
	};

	$.fn.eventDetails.defaults = {
			
	};

	$.fn.eventDetails.Constructor = EventDetails;

}(window.jQuery);
