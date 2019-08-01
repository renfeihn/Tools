/**
 * 避免污染全局变量
 */
$(function () {
	"use strict";
	var pwStrength = 0, user;	//密码强度
	var newEventNum = 0;
	var roleId;
	window.ctnList = {};
	window.ztreeIds = {
		id: 1,
		getId: function() {
			return 'ztree' + this.id++;
		}
	}
	//提供唯一id，解决ztree容器id冲突的bug
	window.uidObj = {
		id: 1,
		getUid: function(){//获取唯一id
			return 'ztree' + this.id++;
		}
	}
	
	/*pageflag:
	 * 1-一线监控-应用 2-一线监控-操作 3-一线监控-系统 4-应用总览 5-交易监控 6-应用启停  7-服务器 8-中间件 9-应用
	 * 10-操作系统 11-数据库 801-中间件（MQ）802-中间件（tomcat）… 1101-数据库(ORACLE)
	 * 1102-数据库（DB2）…  12 应用系统*/
	// var objPageflagJson={
	// 		"MQ":"801",
	//         "tomcat":"802",
	//         "CD":"803",
	//         "CiCs":"804",
	//         "Exchange":"805",
	//         "IHS":"806",
	//         "WEBSPHERE":"807",
	//         "WAS":"807",
	//         "其它软件":"808",
	// 		"ORACLE":"1101",
	// 		"DB2":"1102",
	// 		"MYSQL":"1103",
	// 		"SQLSERVER":"1104",
	// 		"SYBASE":"1105"
	// };
	
	//新用户第一次登录需更改密码
	//验证密码
	function validataUserPassword(userPW){
		pwStrength = 0;
		var password = $("#user_password").val(),
		$tips=$("#user_passwordTips");
		if(password==undefined||password==""){
			$tips.closest('.control-group').addClass('error');
			$tips.removeClass('hide').text("密码不能为空！");
			pwStrength = 0;
			return false;
		}else if(password.length<8||password.length>30){
			$tips.closest('.control-group').addClass('error');
			$tips.removeClass('hide').text("密码长度需在8-30之间！");
			pwStrength = 0;
			return false;
		}else if(userPW==password){
			$tips.closest('.control-group').addClass('error');
			$tips.removeClass('hide').text("不能与原密码相同！");
			pwStrength = 0;
			return false;
		}else if(!(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/.test(password))){
			$tips.closest('.control-group').addClass('error');
			$tips.removeClass('hide').text("密码必须由字母、数字组成");
			pwStrength = 0;
			return false;
		}else {
			$tips.closest('.control-group').removeClass('error');
			$("#user_passwordTips").addClass('hide');

			//密码强度
			if(password.match(/[a-z]/g)){pwStrength++;}
			if(password.match(/[0-9]/g)){pwStrength++;}
			if(password.match(/(.[^a-z0-9])/g)){pwStrength++;}
			if(pwStrength > 3){pwStrength=3;}

			return true;
		}
	}
	
	//
	function validataUserOldPassword(userPW){
		var password = $("#user_old_password").val(),
		$tips=$("#user_passwordTips");
		if(password==undefined||password==""){
			$tips.closest('.control-group').addClass('error');
			$tips.removeClass('hide').text("密码不能为空！");
			pwStrength = 0;
			return false;
		}else {
			$tips.closest('.control-group').removeClass('error');
			$("#user_passwordTips").addClass('hide');
			/*//密码强度
			if(password.match(/[a-z]/g)){pwStrength++;}
			if(password.match(/[0-9]/g)){pwStrength++;}
			if(password.match(/(.[^a-z0-9])/g)){pwStrength++;}
			if(pwStrength > 3){pwStrength=3;}*/
			return true;
		}
	}
	
	
	//验证重复密码
	function revalidataUserPassword(){
		if($("#user_repassword").val()!=$("#user_password").val()){
			$("#user_repasswordTips").closest('.control-group').addClass('error');
			$("#user_repasswordTips").removeClass('hide').text("新密码不一致！");
			return false;
		}else{
			$("#user_repasswordTips").closest('.control-group').removeClass('error');
			$("#user_repasswordTips").addClass('hide');
			return true;
		}
	}
	//重置密码修改框内容
	function resetPassword(){
		$("#user_repasswordTips").closest('.control-group').removeClass('error');
		$("#user_repasswordTips").addClass('hide');
		$("#user_passwordTips").closest('.control-group').removeClass('error');
		$("#user_passwordTips").addClass('hide');
		$("#user_oldpasswordTips").closest('.control-group').removeClass('error');
		$("#user_oldpasswordTips").addClass('hide');
		$("#user_old_password").val("");
		$("#user_password").val("");
		$("#user_repassword").val("");
	}
	//验证密码格式
	$("#user_password").blur(function(){
		validataUserPassword(user.password);
	});
	
	//验证密码格式
  $("#user_oldpassword").blur(function(){
		validataUserOldPassword(user.password);
	});
  
	//验证重复密码是否匹配
	$('#user_repassword').blur(function(){
		revalidataUserPassword();
	});

	//绑定重置密码修改框内容
	$("#resetPasswordbtn").click(function() {
		resetPassword();
	});
	//绑定修改密码提交事件
	$("#upPasswordbtn").click(function() {
		if(validataUserPassword(user.password)&&revalidataUserPassword()){
			$.ajax({
				"type": "post",
				"contentType": "application/x-www-form-urlencoded;charset=utf-8",
				"url": "LoginAction_doEditUser.do",
				"dataType": "json",
				shelter:'正在修改用户密码，请稍候…',
				"data": {
					username:user.username,
					password:$("#user_password").val(),
					oldPassword:$("#user_old_password").val()
				},
				success: function (data2) {
					if (data2.status) {
						alert("密码修改成功,请重新登录！");
						app.common.sendlogHistory("修改密码【成功】");
						$("#signOut").click();
					} else {
						app.common.sendlogHistory("修改密码【失败】");
						alert(data2.errorMsg);
					}
				}, error: function (xhr, status, errMsg) {
					app.common.sendlogHistory("修改密码【失败】");
					alert('错误' + status, errMsg, 'msg');
				}
			});
		}
	});

	
	// getUser();
	function getUser () {
		$.ajax({
			"type": "post",
			"contentType": "application/x-www-form-urlencoded;charset=utf-8",
			"url": "LoginAction_loadNowUser4.do",
			"dataType": "json",
			"data": {},
			shelter:'正在加载当前用户数据，请稍侯…',
			success: function (data) {
				if (data.status) {
					app.common.sendlogHistory("登录系统");
					user = data.content.userVO;
					// 利用sessionStorage存储用户信息
					if(sessionStorage){
						sessionStorage.setItem('user', JSON.stringify(user));
					}

					$("#username").append(user.nickname).attr('logintime',user.loginTime);
					if(user.updateTime==undefined||user.updateTime==""){
						//修改初始密码
						$('#upPasswordTemp').removeClass('hide');
						$('#upPasswordTemp').modal({
							"show" : true,
							'keyboard' : false
						});
					}else{
					}
				} else {
					alert(data.errorMsg);
				}
			}, error: function (xhr, status, errMsg) {
				alert(errMsg);
			}
		});
	}
	//-------------------------------------------菜单控制 start-----------------------------------//

	// getMenuList();

	// function getMenuList(){
	// 	$.ajax({
	// 		"async" : false,
	// 		"type": "post",
	// 		"contentType": "application/x-www-form-urlencoded;charset=utf-8",
	// 		"url": "UserAction_getTreeMenuByUsername.do",
	// 		"dataType": "json",
	// 		success: function (data) {
	// 			if(data.status){
	// 				if(!data.content.menu.children[0]){
	// 					return;
	// 				}
	// 				var menuList = data.content.menu.children[0].children,
	// 					$bannerMenu = $('#bannerMenu');
	// 				if(menuList.length > 0){//一级菜单
	// 					getNowLevel($bannerMenu,menuList,1);
	// 				}
	// 			}else{
	// 				app.alert('title',errorMsg,app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
	// 			}
	// 		}
	// 	});
	// }
	
	// function getNowLevel($pul,data,level){
	// 	if(level >= 4) return;
	// 	for(var i = 0; i < data.length; i++){
	// 		var $ul,$li;
	// 		var menuObj = data[i],
	// 			menu = menuObj.target,
	// 			childrens = menuObj.children,
	// 			path = menu.path,
	// 			name = menu.name,
	// 			menuid = menu.mid,
	// 			iconPath = '';
	// 		if(menu.iconPath != ""){
	// 			iconPath = 'url(img//menu//' + menu.iconPath + '-check.png)';
	// 		}
	//
	// 		//每一层级的ul和li元素
	// 		if(level == 1){//一级
	// 			$li = $('<li title="'+name+'" data-id="'+menuid+'"><a class="menu" style="background-image:'+iconPath+'"></a><span>'+name+'</span>'),
	// 			$ul = $('<ul class="menu-secondLevel"></ul>');
	// 		}else{
	// 			/*if(level == 2){	//ul
	// 				$li = $('<li><a>'+name+'<i class="fa menu-angle"></i></a>');
	// 				$ul = $('<ul class="menu-thirdLevel">');
	// 			}else{
	// 				$li = $('<li><a data-href="'+path+'">'+name+'</a></li>');
	// 			}*/
	// 			if(childrens.length > 0 && level == 2){
	// 				$li = $('<li data-id="'+menuid+'"><a>'+name+'<i class="fa menu-angle"></i></a>');
	// 				$ul = $('<ul class="menu-thirdLevel">');
	// 			}else{
	// 				$li = $('<li data-id="'+menuid+'"><a data-href="'+path+'">'+name+'</a></li>');
	// 			}
	// 		}
	// 		//添加当前层级
	// 		if(childrens.length > 0){
	// 			$li.append($ul);
	// 			getNowLevel($ul,childrens,level+1);
	// 		}
	// 		$pul.append($li);
	// 	}
	// }
	//   菜单栏hover事件
	$("a.menu").mouseover(function(){
		if($(this).parent().hasClass("active")) return
		var bg = $(this).css("backgroundImage");
		// $(this).css("backgroundImage",bg.substring(0,bg.length-6) + '-check.png');
	}).mouseout(function(){
		if($(this).parent().hasClass("active")) return
		// $(this).css("backgroundImage",$(this).css("backgroundImage").split('-')[0] + '.png');
	});
	$(".aside-left").mouseleave(function() {
		if($(this).parent().hasClass('lock-Menu'))return
		$('.aweb-navibar-personal').removeClass('open');
	});
	//-------------------------------------------菜单控制 end-----------------------------------//
	/*顶部nav*/
	//帮助文档,消息中心用户显隐藏
	var $banner=$('#leftAside'),
	__bannerCtns={
		'skinChangeShowBtn':'#skinChangeContainer',
		'messageCenterShowBtn':'#messageCenterContainer'
	};
	$('body').click(function(e){
		var $el=$(e.target||window.event.srcElement),
		$link= $el.closest('a')[0],
		$ctn=$el.closest('[id$=Container]')[0],
		//搜索框子菜单隐藏处理
		PseaMainCtn =  $el.parents('#seaMainCtn'),
		$awebmainmenusub = $el.parents('.aweb-main-menu-sub'),
		$awebmainMenu = $el.parents('.aweb-main-menu'),
		elId = $el.attr('id'),
		elClass = $el.attr('class');
		if($awebmainMenu.length===0&&elClass!=='aweb-main-menu aweb-main-menu-bg-click'&&elClass!=='aweb-main-menu'&&elClass!=='aweb-main-menu-logo'&&elClass!=='aweb-main-menu-title'&&elClass!=='aweb-main-menu-sub'&&$awebmainmenusub.length===0){
			if($("#awebMonitorManager").hasClass("aweb-main-menu-bg-click")) {
				$("#awebMonitorManager").children(".aweb-main-menu-sub").hide();
				$("#awebMonitorManager").children(".aweb-main-menu-sub-triangle").hide();
				$("#awebMonitorManager").children(".aweb-main-menu-triangle").show();
			}
			if($("#aweb-monitor-special").hasClass("aweb-main-menu-bg-click")) {
				$("#aweb-monitor-special").children(".aweb-main-menu-sub").hide();
				$("#aweb-monitor-special").children(".aweb-main-menu-sub-triangle").hide();
				$("#aweb-monitor-special").children(".aweb-main-menu-triangle").show();
			}
			if($("#awebLargeScreen").hasClass("aweb-main-menu-bg-click")) {
				$("#awebLargeScreen").children(".aweb-main-menu-sub").hide();
				$("#awebLargeScreen").children(".aweb-main-menu-sub-triangle").hide();
				$("#awebLargeScreen").children(".aweb-main-menu-triangle").show();
			}
		}
		
		if(elId!=='showSearchBtn'&&elId!=='seaMainCtn'&&PseaMainCtn.length===0){
			if($('#showSearchBtn').hasClass('hide')){
				$('#seaCloseBtn').trigger('click');
			}
		}
		
		if($link&&$link.id in __bannerCtns){
			if(!__bannerCtns.currentContainer||(__bannerCtns.currentContainer===$link.id&&$(__bannerCtns[$link.id],$banner).css('display')==='none')){
				$(__bannerCtns.currentContainer=__bannerCtns[$link.id],$banner).slideDown(100);
			}else if(__bannerCtns.currentContainer!==__bannerCtns[$link.id]){
				$(__bannerCtns.currentContainer,$banner).slideUp(100);
				$(__bannerCtns.currentContainer=__bannerCtns[$link.id],$banner).slideDown(100);
			}else{
				$(__bannerCtns.currentContainer,$banner).slideUp(100);
				__bannerCtns.currentContainer=null;
			}
		}else if(!(__bannerCtns.currentContainer&&$ctn&&$ctn.id&&~__bannerCtns.currentContainer.indexOf($ctn.id))){
			//不为被点击的容器id时，收起
			$(__bannerCtns.currentContainer,$banner).slideUp(100);
			__bannerCtns.currentContainer=null;
		}
	});

	$("#usersafebtn",$banner).click(function() {
		resetPassword();
		//修改密码
		$('#upPasswordTemp').modal().find('.close').removeClass('hide');
	});
	
//	$("#userInfo",$banner).click(function() {
//		//基本信息
//		$("#userInfoTemp").modal().find('.close').removeClass('hide');
//	});
	
	//注销
	$("#signOut",$banner).click(function(){
		//记录用户操作历史
		app.common.sendlogHistory("退出登录");
		signOut();
	});
	function signOut() {
		$.ajax({
			"type": "POST",
			"url": "LoginAction_signOut.do",
			shelter:'正在注销，请稍候…',
			"success": function (data) {
				//app.io.disconnect();
				if (data.status)
					$("#redirectForm").submit();
			},
			"error": function (data) {

			}
		});
	}

	/** 左侧菜单树点击事件绑定 */
	function addClickEvent(flag){
		/*事件绑定*/
		var leftAsideClickHandler;
		var scrollId = '';
		var divId = '';
		if(flag=='0'){
			scrollId='#asideMenuList';
			divId='#asideMenuList';
		} 
		if(flag=='1'){
			scrollId='#asideMenuList';
			divId='#searchResult';
		}
		//美化左边菜单栏滚动条
		$(scrollId).slimScroll({
			height : '100%',
			color : '#fff'
		});
		$('a',divId).addClass('no-select').click(function(event) {
			var $this = $(this);
			//双击事件
			if(leftAsideClickHandler){
				window.clearTimeout(leftAsideClickHandler);
				leftAsideClickHandler=null;
				if (!$this.hasClass('accordion-toggle')) {
					// 显示容器
					var title,section,path,objId,objType,appId,serverId,pageflag,devtype;
					if ($this.attr('data-href')) {
						title=$.trim($this.text());
						section=$this.attr('data-href').split('#');
						path=$this.attr("data-path");
						//获取resId（包含sysId、serverId）,例如：1001、1001001
//						resid=$this.attr("data-resid");
						objId=$this.attr("data-objId");
						appId=$this.attr("data-appId");
						serverId=$this.attr("data-serverId");
						objType=$this.attr("data-objType");
						pageflag=$this.attr("data-pageflag");
						devtype = $this.attr("data-type");
						if(path){
							//缓存
							app.domain.exportMenuParam({
								path:path,
								type:$this.attr('data-type')
							});
							//跨页面参数设置格式： app.domain.exports(命名空间,{变量key:变量value});
							app.domain.exports("appAll",{'objId':objId});
							app.domain.exports("appAll",{'appId':appId});
							app.domain.exports("appAll",{title:appId});
							app.domain.exports("appAll",{'serverId':serverId});
							app.domain.exports("appAll",{'devtype':devtype});
							app.domain.exports("appAll",{'objType':objType});
							app.domain.exports("appAll",{'pageflag':pageflag});
							//转跳
							app.dispatcher.load({
								title:title,
								moduleId: section[0],
								section:section.slice(1),
								id:path
							});
						}else {
							app.dispatcher.load.apply(app.dispatcher, [title].concat(section));
						}
					}
				}else{
					// 双击第一层菜单
					var title,section,path;
					var href = $this.attr('href');
					if (href &&(href==='#monitorApp' || href==='#monitorOperation' || href==='#monitorSystem' || href==='#appAll' || href==='#workSpace')) {
						title=$.trim($this.text());
						section=$this.attr('href').split('#');
						section = [section[1]];
						path=$this.attr("data-path");
						if(path){
							//缓存
							app.domain.exportMenuParam({
								path:path,
								type:$this.attr('data-type')
							});
							//转跳
							app.dispatcher.load({
								title:title,
								moduleId: section[0],
								section:section.slice(1),
								id:path
							});
						}else {
							app.dispatcher.load.apply(app.dispatcher, [title].concat(section));
						}
					}

				}
			}else{//单击事件
//				app.alert("点击菜单！");
				leftAsideClickHandler=window.setTimeout(function(){
					leftAsideClickHandler=null;
					var timeout = .35,
					$ul = $this.next('ul');
					if($ul.length){
						$this.toggleClass('collapsed');
						$ul.slideToggle(200);
						$('li', $ul).each(function (index, elem) {
							TweenLite&&TweenLite.fromTo(elem, .5, {
								x: '-10%',
								y: '-15%',
								opacity: 0,
								ease: Quint.easeOut
							}, {
								x: '+=10%',
								y: '+=15%',
								opacity: 1,
								ease: Quint.easeOut,
								delay: timeout
							});
							timeout += .045;
						});
					}
				},250);//单击延时0.25s
			}
		});
	}
	//为开发者菜单添加点击事件，投产时注释掉
//	addClickEvent(0);
	
	/** 加载建议数据 */	
	/*function loadAdvise(){
		window.setTimeout(
		 function() {
			return $("#AdviseTb").dataTable(
				{
					'sAjaxSource' : 'AdviseAction_loadAdvise.do',
					'bDestroy' : true,
					'scrollY' : 300,
					"bPaginate" : true, // 开关，是否显示分页器
					"bSort": false,
					"bInfo" : false, // 开关，是否显示表格的一些信息
					"fnDrawCallback":function(){//在每次table被draw完后调用
						$('#AdviseTb tbody tr td').each( function() {
						//	this.setAttribute( 'title', this.innerHTML );
							this.setAttribute( 'title', "");

						});
						$("a.paginate_button").attr("id","paginate");
					},
					'fnServerData' : function(sSource,aoDataf,fnCallback) {
						$.ajax({
							"type" : "post",
							"contentType" : "application/x-www-form-urlencoded;charset=utf-8",
							"url" : sSource,
							"dataType" : "json",
							"data" : {
									"username" : user.username,
									"roleId"   : roleId
								},
						success : function(data) {
							var dealData = [], i, items, item;
							if (data.status&& data.content) {
								for (items = data.content.aaData,i = items.length; (item = (items[--i]));) {
									dealData.push([
									          item.DATA,
									          item.TITLE,
									          item.CONTENT+  
									          "<div id='adviseHandle' style='text-overflow: ellipsis;white-space: nowrap;overflow: hidden;max-width: 100px;' data-adviseId='"+ item.id
			        							+"' data-adviseUsername='"+ item.USERNAME
			        							+"' data-adviseTime='"+item.DATA
			        							+"' data-adviseTitle='"+ item.TITLE
			        							+"' data-adviseContent='"+item.CONTENT
			        							+"' data-adviseImagePath='"+ item.imagePath
			        							+"'></div>",
									          ]);
											}
								} else {
									app.alert('查询建议记录',data.errorMsg|| '查询建议记录错误',app.alertShowType.ERROR,app.alertMsgType.MESSAGE);
								}

								fnCallback({
									'aaData' : dealData
									});
								},
						error : function(xhr,status,errMsg) {
							fnCallback({
									'aaData' : []
							});
							}
						});
					}
				});
		}, 300);
	}*/

	
	//验证建议表单
	function validataAdvise(username,title,content){
		if (username==undefined||username=="") {
			app.alert("session已失效，请重新登陆！");
				return false;
		}else{
			if (title==undefined||title=="") {
				app.alert("标题不能为空！");
				return false;
			}else{
				if (content==undefined||content=="") {
					app.alert("内容不能为空");
					return false;
				}else{
					return true; 
				}
			}
		}
	}
	
    $("#adv-writeAdv").click(function(){
    	$("#adv-read").hide();
    	$("#adv-write").show();
    });
	
    /*$("#adv-readAdv").click(function(){
    	$("#adv-write").css("display","none");
    	loadAdvise();
    	$("#adv-read").show();
    });*/
    // var imagePath;
    //上传方法
    // var fileUpload = function(){
    // 	var fileUpload;
    // 	//校验
    // 	if(!fileUpload){
    // 	  fileUpload=app.formControl.bootstrapUpload({
		// 		el:$("#imageUploadID"),
	 //    		tips:'只能选择jpg,gif,png,bmp,jpeg文件',
	 //    		canEditName:false
		// 	});
    // 	}else{
    // 		fileUpload.reset();
    // 	}
		// var validateResult = app.validate.validate({
		// 	data: [{
    //             id: 'imageUploadID',
    //             msg:'请上传正确格式的jpg,gif,png,bmp,jpeg文件',
    //             filter: {
    //                 require: true
    //             }
    //         }],
		// 	errorCallback: function ($el, errMsg) {
    //             app.alert('上传图片', errMsg, app.alertShowType.ERROR);
    //         },
    //         correctCallback: function () {}
		// });
		// if(validateResult.bResult){
    //         app.shelter.show('正在上传“'+fileUpload.getName()+'”，请稍候…');
		// 	$.ajaxFileUpload({
		// 		type: "post",
    //             contentType: "application/x-www-form-urlencoded;charset=utf-8",
    //             url: './AdviseAction_uploadImage.do',
    //             fileElementId: 'imageUploadID',
    //             dataType: 'json',
    //             async:false,
    //             data:{
    //             	username : user.username
    //             },
    //             success: function (data) {
    //             	imagePath =JSON.stringify(data.content.filepath);
    //             	//app.alert("上传成功");
    //                 app.shelter.hide();
    //                 fileUpload.reset();
    //
    //             }
		// 	});
		// }
    // }
    	

    /** 建议添加Start* */
	// $("#adviseBtn").click(function() {
	// 	app.confirm({
	// 		title:'提交建议',
	// 		content:'是否确认执行该操作？',
	// 		btnConfirm:'是',
	// 		btnCancel:'否',
	// 		confirmHandler:function(h){
	// 			var advTitle = $("#adv-advTitle").val();
	// 			var advContent = $("#adv-advContent").val();
	// 			var timeStamp = getCurrentTime(new Date(), "-", " ", ":");
	// 			var username = user.username;
	// 			if(validataAdvise(username,advTitle,advContent)){
	// 				if($("input[name=image]").val()!=""){
	// 					fileUpload();
	// 				}else{
	// 					imagePath=null;
	// 				}
	// 				setTimeout(function(){
	// 				$.ajax({
	// 				'type' : 'post',
	// 				'contentType' : 'application/x-www-form-urlencoded;charset=utf-8',
	// 				'url' : "AdviseAction_addAdvise.do",
	// 				'dataType' : 'json',
	// 				"data" : {
	// 					advTitle : advTitle,
	// 					advContent : advContent,
	// 					timeStamp : timeStamp,
	// 					username : username,
	// 					imagePath :imagePath
	// 				},
	// 				success : function(data) {
	// 					if (data.status){
	// 						app.alert('提交成功！');
	// 					}
	// 					$("#adv-advTitle").val("").focus();
	// 					$("#adv-advContent").val("");
	// 					$("input[name=image]").val("");
	// 				},
	// 				error : function(xhr, status, errMsg) {
	// 					app.alert("提交异常！");
	// 				}
	// 			});
	// 				},1000);
	// 			}
	//
	// 		},
	// 		context:$('body')[0],
	// 		args:['是','否']
	// 	});
	//
	// });

	/** 建议添加End* */
	/** 建议框相关处理Start* */
	
	//表格点击事件
	// $("#AdviseTb tbody").click(function(){
	// 	var imgStr="";
	// 	var $td = $(event.target || window.event.srcElement).closest('td');
	// 	var $tr = $td.parent();
	// 	//	var adviseid = $("div",$tr).attr("data-adviseid"),
	// 	//	adviseusername = $("div",$tr).attr("data-adviseusername"),
	// 	var  advisetime = $("div",$tr).attr("data-advisetime"),
	// 	advisetitle = $("div",$tr).attr("data-advisetitle"),
	// 	advisecontent = $("div",$tr).attr("data-advisecontent"),
	// 	adviseimagepath = $("div",$tr).attr("data-adviseimagepath");
	// 	$(".adviseTitle").html(advisetitle);
	// 	$(".adviseTime").html(advisetime);
	// 	$(".adviseContent").html(advisecontent);
	//
	// 	if(adviseimagepath!=""){
	// 		var obj = JSON.parse(adviseimagepath);
	// 		for(var i=0,j=obj.length;i<j;i++){
	// 			imgStr+="<img class='adviseImage' alt='' src='"+obj[i]+"'>";
	// 		}
	// 		$(".adviseimageList").html(imgStr);
	// 	}else{
	// 		$(".adviseimageList").html("");
	// 	}
	// 	$("#adv-read").hide();
	// 	$("#adviseDetail").show();
	// });
	
	// $("#adviseReturn").click(function(){
	// 	$("#adv-read").show();
	// 	$("#adviseDetail").hide();
	// });
	// 关闭事件
	// $('#advCloseBtn,#advCloseBtn1').click(function() {
	// 	TweenLite && TweenLite.fromTo($('#advMainCtn')[0], .35, {
	// 		opacity : .5,
	// 		x : '0',
	// 		y : '0',
	// 		width : '1000',
	// 		ease : Quint.easeInOut
	// 	}, {
	// 		opacity : 0,
	// 		x : $(window).width() * .4,
	// 		y : $(window).height() * -.9,
	// 		width : '400',
	// 		ease : Quint.easeInOut,
	// 		delay : 0,
	// 		onComplete : function() {
	// 			$('#advMainCtn').addClass('hide');
	// 			$('#awebNavibarAdvise').removeClass('hide');
	// 		}
	// 	});
	// });
	/** 建议框相关处理End* */

/**搜索框相关处理Start**/
	//关闭事件
	// $('#seaCloseBtn').click(function(){
	// 	TweenLite&&TweenLite.fromTo($('#seaMainCtn')[0], .35, {
     //        opacity:.5,
     //        x:'0',
     //        y:'0',
     //        width:'1110',
     //        ease: Quint.easeInOut
     //    }, {
     //        opacity: 0,
     //        x: $(window).width() *.4,
     //        y: $(window).height() *-.9,
     //        width:'400',
     //        ease: Quint.easeInOut,
     //        delay:0,
     //        onComplete:function() {
     //        	$('#seaMainCtn').addClass('hide');
     //        	$('#showSearchBtn').removeClass('hide');
     //        }
     //    });
	// });
	jQuery(document).keypress(function(e){
		//Ctrl+Enter(firefox: 13  IE: 10)  搜索框
		if(e.ctrlKey && e.which == 13 || e.ctrlKey && e.which == 10) {
			if($('#seaMainCtn').hasClass('hide')){
				$('#showSearchBtn').trigger('click');
			}else {
				$('#seaCloseBtn').trigger('click');
			}
		}
		//Ctrl+space  最新事件消息框
		if(e.shiftKey && e.which == 13 || e.shiftKey && e.which == 10) {
			if($('#showWangingBtn').hasClass('hide')){
				$('#closeWarning').trigger('click');
			}else {
				$('#showWangingBtn').trigger('click');
			}
		}
	});
	//获得搜索组件模板DIV
	var seaModelJson = {
			seaBodyModel:$('#seaBodyModel'),
			seaBodyObj:$('#seaBodyObj')
	}
	//搜索事件
// 	var seaSearchMain = function (){
// 		var seaAppName = $('#seaAppName').val(),
// 		seaSeverName = $('#seaSeverName').val(),
// 		seaDbName = $('#seaDbName').val(),
// 		seaMidName = $('#seaMidName').val(),
// 		$seaBodyShowCtn = $('#seaBodyShowCtn'),
// 		$seaBodyObj = seaModelJson.seaBodyObj.removeAttr('id');
//
// 		if(seaAppName!==undefined&&seaAppName!==''||seaSeverName!==undefined&&seaSeverName!==''||seaDbName!==undefined&&seaDbName!==''||seaMidName!==undefined&&seaMidName!==''){
// 			$.ajax({
// 				'type': 'post',
// 				'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
// 				'url': "SearchAction_searchMain.do",
// 				'dataType': 'json',
// 				"data": {appName:seaAppName,serverName:seaSeverName,dbName:seaDbName,midName:seaMidName},
// 				shelter:'正在加载数据，请稍候…',
// 				"success": function (data) {
// //					debugger;
// 					var searchData = data.content.searchData,
// 					searchDataUse;
// 					if(!($.isEmptyObject(searchData))){
// 						//只搜索应用系统和服务器
// 						if((seaDbName===undefined || seaDbName==='') && (seaMidName===undefined || seaMidName==='')){
// 							if(seaSeverName===undefined||seaSeverName===''){
// 								searchDataUse = searchData.appinfo;
// 								$seaBodyShowCtn.empty();
// 								var appLen = searchDataUse.app_id.length;
// 								$('#seaMainNum').text(appLen);
// 								for(var i = 0,len = appLen;i<len;i++){
// 									var seaBodyObj = $seaBodyObj.clone(),
// 									$seaBodyObjTitleLogo = $('.sea-body-obj-title-logo',seaBodyObj),
// 									$seaBodyObjTitleTxt = $('.sea-body-obj-title-txt',seaBodyObj);
// 									seaBodyObj.attr('data-appId',searchDataUse.app_id[i]);
// 									seaBodyObj.attr('data-objType',searchDataUse.obj_type[i]);
// 									seaBodyObj.attr('data-role','seaAppDiv');
// 									$seaBodyObjTitleTxt.children('p').text(searchDataUse.c_name[i]);
// 									$seaBodyObjTitleTxt.children('p').attr('title',searchDataUse.c_name[i]);
// 									$seaBodyObjTitleLogo.css('background','url(img/search/app.png) 50% 50% no-repeat');
// 									$seaBodyObjTitleLogo.attr('title', '应用系统');
// 									$seaBodyObjTitleLogo.css('background-position','50%');
// 									$seaBodyObjTitleLogo.css('border-bottom','none');
// 									$('.sea-body-obj-all',seaBodyObj).remove();
// 									seaBodyObj.css('height','60px');
// 									$seaBodyShowCtn.append(seaBodyObj);
// 								}
// 							}else{
// 								searchDataUse = searchData.serverinfo;
// 								$seaBodyShowCtn.empty();
// 								var serverLen = searchDataUse.server_id.length;
// 								$('#seaMainNum').text(serverLen);
// 								for(var i = 0,len = serverLen;i<len;i++){
// 									var seaBodyObj = $seaBodyObj.clone(),
// 									$seaBodyObjTitleTxt = $('.sea-body-obj-title-txt',seaBodyObj);
// 									seaBodyObj.attr('data-serverId',searchDataUse.server_id[i]);
// 									seaBodyObj.attr('data-objType',searchDataUse.obj_type[i]);
// 									$seaBodyObjTitleTxt.find('p').text(searchDataUse.c_name[i]);
// 									$seaBodyObjTitleTxt.find('p').attr('title', searchDataUse.c_name[i]);
// 									seaBodyObj.attr('data-role','seaServerDiv');
// 									var s_app_id = searchDataUse.s_app_id[i],
// 									s_c_name = searchDataUse.s_c_name[i],
// 									obj_type = searchData.appinfo.obj_type[0],
// 									obj_flag = searchDataUse.obj_flag[i],
// 									seaBodyObjTitleLogo = $('.sea-body-obj-title-logo',seaBodyObj);
// 									if(obj_flag==='10'){
// 										seaBodyObjTitleLogo.css('background','url(img/search/db.png) 50% 50% no-repeat');
// 										seaBodyObjTitleLogo.attr('title', '数据库服务器');
// 									}else if(obj_flag==='01'){
// 										seaBodyObjTitleLogo.css('background','url(img/search/mid.png) 50% 50% no-repeat');
// 										seaBodyObjTitleLogo.attr('title', '中间件服务器');
// 									}else if(obj_flag==='11'){
// 										seaBodyObjTitleLogo.css('background','url(img/search/server.png) 50% 50% no-repeat');
// 										seaBodyObjTitleLogo.attr('title', '数据库中间件服务器');
// 									}else{
// 										seaBodyObjTitleLogo.css('background','url(img/search/server.png) 50% 50% no-repeat');
// 										seaBodyObjTitleLogo.attr('title', '服务器');
// 									}
// 									if(s_app_id.indexOf(',')>-1){
// 										var appIdArr = s_app_id.split(',');
// 										var appNameArr = s_c_name.split(',');
// 										for(var j = 0,applen = appIdArr.length;j<applen;j++){
// 											var seaAppCol = seaBodyObj.children('.sea-body-obj-ctn'),
// 											seaBodyObjCtnAppTxt = $('[data-role=seaBodyObjCtnAppTxt]',seaBodyObj);
// 											seaBodyObjCtnAppTxt.append('<span '
// 													+'data-appId="'+appIdArr[j]
// 													+'" title="'+appNameArr[j]
// 													+'" data-objType="'+obj_type+'"'
// 													+'>'+appNameArr[j]+'</span>');
// 										}
// 									}else{
// 										var seaBodyObjCtnAppTxt = $('[data-role=seaBodyObjCtnAppTxt]',seaBodyObj);
// 										seaBodyObjCtnAppTxt.append('<span '
// 												+'data-appId="'+s_app_id
// 												+'" title="'+s_c_name
// 												+'" data-objType="'+obj_type+'"'
// 												+'>'+s_c_name+'</span>');
// 									}
// 									$('.sea-body-obj-ctn-server',seaBodyObj).remove();
// 									$seaBodyShowCtn.append(seaBodyObj);
// 								}
// 							}
// 						} else {
// 							//搜索中间件或者数据库
// 							searchDataUse = searchData.objinfo;
// 							$seaBodyShowCtn.empty();
// 							var objId;
// 							if((seaDbName!=undefined && seaDbName!='')){
// 								objId = searchDataUse.db_id;
// 							} else if(seaMidName!=undefined && seaMidName!=''){
// 								objId = searchDataUse.mw_id;
// 							}
//
// 							if(objId){
// 								var objLen = objId.length;
// 								$('#seaMainNum').text(objLen);
// 								$.each(objId,function(i,id){
// 									var seaBodyObj = $seaBodyObj.clone();
// 									var seaBodyObjTitleLogo = $('.sea-body-obj-title-logo',seaBodyObj);
// 									seaBodyObjTitleLogo.css('background','none');
// 									seaBodyObj.attr('data-role','seaObjDiv');
//
// 									var sServerId = searchDataUse.higher_server_id,
// 									sServerCName = searchDataUse.higher_server_c_name,
// 									higherAppType = searchDataUse.higher_app_type,
// 									sAppId = searchDataUse.higher_app_id,
// 									sAppCName = searchDataUse.higher_app_c_name,
// 									higherServerType = searchDataUse.higher_server_type,
// 									objClass2 = searchDataUse.obj_class_2[i],
// 									objClass3 = searchDataUse.obj_class_3[i],
// 									logo;
// 									//根据三级分类显示对应logo
// 									if(objClass3==='WAS' || objClass3==='WEBSPHERE'){
// 										logo='was';
// 									}else if(objClass3==='tomcat'){
// 										logo='tomcat';
// 									}else if(objClass3==='MQ'){
// 										logo='mq';
// 									}else if(objClass3==='Exchange'){
// 										logo='exchange';
// 									}else if(objClass3==='ORACLE'){
// 										logo='oracle';
// 									}else if(objClass3==='DB2'){
// 										logo='db2';
// 									}else if(objClass3==='MYSQL'){
// 										logo='mysql';
// 									}else if(objClass3==='SQLSERVER'){
// 										logo='sqlserver';
// 									}else{
// 										if((seaDbName!=undefined && seaDbName!='')){
// 											logo='db';
// 										} else if(seaMidName!=undefined && seaMidName!=''){
// 											logo='mid';
// 										}
// 									}
// 									seaBodyObjTitleLogo.css('background','url(img/search/'+logo+'.png) 50% 50% no-repeat');
// 									seaBodyObjTitleLogo.attr('title',logo);
//
// 									//加载obj信息
// 									seaBodyObj.attr('data-objId',id);
// 									seaBodyObj.attr('data-pageFlag',id);
// 									seaBodyObj.attr('data-serverId',sServerId[i]);
// 									seaBodyObj.attr('data-objClass2',objClass2);
// 									seaBodyObj.attr('data-objClass3',objClass3);
// 									seaBodyObj.attr('data-objType',searchDataUse.obj_type[i]);
// 									seaBodyObj.find('p').text(searchDataUse.c_name[i]);
// 									seaBodyObj.attr('title',searchDataUse.c_name[i]);
// 									seaBodyObj.attr('data-role','seaIconObjDiv');
// 									//加载server信息
// 									if(sServerId[i].length>1){
// 										var serverArr = sServerId[i].split(','),
// 										serverNameArr = sServerCName[i].split(',');
// 										higherServerTypeArr = higherServerType[i].split(',');
//
// 										$.each(sServerId,function(j,serverId){
// 											var seaBodyObjCtnServerTxt = $('[data-role=seaBodyObjCtnServerTxt]',seaBodyObj);
// 											seaBodyObjCtnServerTxt.append('<span '
// 													+'data-serverId="'+serverId
// 													+'" title="'+serverNameArr[j]
// 													+'" data-objType="'+higherServerTypeArr[j]
// 													+'">'+serverNameArr[j]+'</span>');
// 										});
// 									}else{
// 										var seaBodyObjCtnServerTxt = $('[data-role=seaBodyObjCtnServerTxt]',seaBodyObj);
// 										seaBodyObjCtnServerTxt.append('<span '
// 												+'data-serverId="'+sServerId[i]
// 												+'" title="'+sServerCName[i]
// 												+'" data-objType="'+higherServerType[i]
// 												+'">'+sServerCName[i]+'</span>');
// 									}
// //									//解析app信息
// 									if(sAppId[i].length>1){
// 										var appIdArr = s_app_id.split(',');
// 										var appNameArr = s_c_name.split(',');
// 										var higherAppTypeArr = higherAppType[i].split(',');
// 										for(var j = 0,applen = appIdArr.length;j<applen;j++){
// 											var seaBodyObjCtnAppTxt = $('[data-role=seaBodyObjCtnAppTxt]',seaBodyObj);
// 											seaBodyObjCtnAppTxt.append('<span '
// 													+'data-appId="'+appIdArr[j]
// 													+'" title="'+appNameArr[j]
// 													+'" data-objType="'+higherAppTypeArr[j]
// 													+'">'+appNameArr[j]+'</span>');
// 										}
// 									}else{
// 										var seaBodyObjCtnAppTxt = $('[data-role=seaBodyObjCtnAppTxt]',seaBodyObj);
// 										seaBodyObjCtnAppTxt.append('<span '
// 												+'data-appId="'+sAppId[i]
// 												+'" title="'+sAppCName[i]
// 												+'" data-objType="'+higherAppType[i]+'"'
// 												+'">'+sAppCName[i]+'</span>');
// 									}
//
// 									//填充html
// 									$seaBodyShowCtn.append(seaBodyObj);
// 								});
// 							}
// 						}
// 					}else{
// 						$seaBodyShowCtn.empty();
// 						app.alert('未找到匹配的项目');
// 					}
// 				}
// 			});
// 		}else{
// 			app.alert("请输入查询条件");
// 		}
// 	}
// 	$('#seaModalBtn').click(seaSearchMain);
	//点击数据库或者中间件其中一个输入框，另外一个不可输入
// 	$('#seaDbName').click(function(){
// 		if($('#seaMidName').val()=="" && $('#seaDbName').val()==""){
// 			$('#seaMidName').attr("readonly","true");
// //			$('#seaMidName').val("不支持同时搜索中间件和数据库，请清除搜索内容！");
// 			$('#seaDbName').removeAttr("readonly");
// 			$('#seaDbName').val("");
// 			$('#seaMidName').css("background-color","#E5E5E5");
// 			$('#seaDbName').css("background-color","#FFF");
// 		}
// 	});
// 	$('#seaMidName').click(function(){
// 		if($('#seaDbName').val()=="" && $('#seaMidName').val()==""){
// 			$('#seaMidName').removeAttr("readonly");
// 			$('#seaMidName').val("");
// 			$('#seaDbName').attr("readonly","true");
// //			$('#seaDbName').val("不支持同时搜索中间件和数据库，请清除搜索内容！");
// 			$('#seaDbName').css("background-color","#E5E5E5");
// 			$('#seaMidName').css("background-color","#FFF");
// 		}
// 	});
// 	//清空搜索条件
// 	$('#clearModalBtn').click(function(){
// 		$('#seaAppName').val('');
// 		$('#seaSeverName').val('');
// 		$('#seaDbName').val('');
// 		$('#seaMidName').val('');
// 		$("#seaBodyShowCtn").empty();
// 		$('#seaMainNum').text("0");
// 	});
// 	$(".awebClearCtnBtn").click(function(){
// 		if($(this).siblings('input').val()){
// 			$(this).siblings('input').val('');
// 		}
// 	});
// 	$('#seaMainCtn input').keydown(function(e){
// 		var curKey = e.which;
// 		if(curKey == 13){
// 			seaSearchMain();
// 		}
// 	});
// 	//搜索结果跳转处理，冒泡
// 	$('#seaBodyShowCtn').click(function(event){
// 		var $div = $(event.target || window.event.srcElement).closest('div');
// 		var $span = $(event.target || window.event.srcElement).closest('span');
// 		var $p = $(event.target || window.event.srcElement).closest('p');
// 		var $target = $div.hasClass('.sea-body-obj')?$div:$div.parents('.sea-body-obj');
// //		debugger;
// 		//下拉列表开关
// 		if($div.hasClass('sea-body-obj-foot')){
// 			var $angle = $div.children('span'),
// 			$objCtn = $div.siblings('.sea-body-obj-ctn'),
// 			$parent = $div.parent();
// 			if($angle.hasClass('fa-angle-down')){
// 				$angle.removeClass('fa-angle-down');
// 				$angle.addClass('fa-angle-up');
// 				$div.css('margin-top','206px');
// 				$objCtn.css('height','206px');
// 				$objCtn.show();
// 				$parent.css('z-index','10');
// 				$parent.animate({height:'226px'},300,function(){
// 					$objCtn.css('overflow-x','hidden');
// 					$objCtn.css('overflow-y','auto');
// 				});
// 			}else {
// 				$angle.removeClass('fa-angle-up');
// 				$angle.addClass('fa-angle-down');
// 				$parent.animate({height:'20px'},300,function(){
// 					$objCtn.css('height','0px');
// 					$div.css('margin-top','0px');
// 					$objCtn.hide();
// 					$parent.css('z-index','0');
// 				});
// 			}
// 		//点击应用按钮
// 		}else if($target.hasClass('sea-body-obj')&&$target.attr('data-role')==='seaAppDiv'){
// 			var titleVal = $target.find('p').text(),
// 			app_id = $target.attr('data-appId'),
// 			objType = $target.attr('data-objType');
// 			app.domain.exports("appAll", {appId:app_id,objType:objType});
// 			app.dispatcher.load(titleVal+"概览","appAll","system");
// 			$('#seaMainCtn').addClass('hide');
// 			$('#showSearchBtn').removeClass('hide');
// 		//点击服务器按钮
// 		}else if($target.hasClass('sea-body-obj')&&$target.attr('data-role')==='seaServerDiv'){
// 			if($div.hasClass('sea-body-obj-ctn-txt')){
// 				var titleVal = $span.text(),
// 				app_id = $span.attr('data-appId'),
// 				objType = $span.attr('data-objType');
// 				app.domain.exports("appAll", {appId:app_id,objType:objType});
// 				app.dispatcher.load(titleVal+"概览","appAll","system");
// 				$('#seaMainCtn').addClass('hide');
// 				$('#showSearchBtn').removeClass('hide');
// 			}else if($p.parent().hasClass('sea-body-obj-title-txt') || $div.hasClass('sea-body-obj-title-logo')){
// 				var serverId = $target.attr('data-serverId'),
// 				serverName = $target.find('p').text(),
// 				$appArr = $('.sea-body-obj-ctn-txt',$target).find('span'),
// 				appIdArr = new Array(),
// 				appNameArr = new Array(),
// 				objType =  $span.attr('data-objType');
//
// 				$appArr.each(function(){
// 					appIdArr.push($(this).attr('data-appId'));
// 					appNameArr.push($(this).text());
//
// 				});
//
// 				app.domain.exports("searchAll", {serverId:serverId,appIdArr:appIdArr,appNameArr:appNameArr,objType:objType,objId:serverId},serverName,serverName);
// 				app.dispatcher.load(serverName+"服务器概览","appAll","system","server");
// 				$('#seaMainCtn').addClass('hide');
// 				$('#showSearchBtn').removeClass('hide');
// 			}
// 		//点击中间件、数据库按钮
// 		}else if($target.hasClass('sea-body-obj')&&$target.attr('data-role')==='seaIconObjDiv'){
// 			if($p.parent().hasClass('sea-body-obj-title-txt') || $div.hasClass('sea-body-obj-title-logo')){
// 				var objId = $target.attr('data-objId'),
// 				serverId = $target.attr('data-serverId'),
// 				objName = $target.find('p').text(),
// 				$appArr = $('[data-role=seaBodyObjCtnAppTxt]',$target).find('span'),
// 				objType = $target.attr('data-objType'),
// 				objClass2 = $target.attr('data-objClass2'),
// 				objClass3 = $target.attr('data-objClass3'),
// 				appIdArr = new Array(),
// 				appNameArr = new Array();
//
// 				if(objClass3=='WAS' || objClass3=='ORACLE' || objClass3=='DB2' || objClass3=='SQLSERVER'){
// 					var pageFlag = objPageflagJson[objClass3];
//
// 					$appArr.each(function(){
// 						appIdArr.push($(this).attr('data-appId'));
// 						appNameArr.push($(this).text());
// 					});
//
// 					app.domain.exports("appAll", {serverId:serverId,appIdArr:appIdArr,appNameArr:appNameArr,objType:objType,objId:objId,pageflag:pageFlag});
// 					app.dispatcher.load(objClass2+"-"+objClass3+"-"+objName,"appAll","system","board");
// 					$('#seaMainCtn').addClass('hide');
// 					$('#showSearchBtn').removeClass('hide');
// 				} else{
// 					app.alert('暂不支持该监控对象！');
// 				}
// 			}else if($div.hasClass('sea-body-obj-ctn-txt')&&$div.attr('data-role')==='seaBodyObjCtnAppTxt'){
// 				var titleVal = $span.text(),
// 				app_id = $span.attr('data-appId'),
// 				objType = $span.attr('data-objType');
// 				app.domain.exports("appAll", {appId:app_id,objType:objType});
// 				app.dispatcher.load(titleVal+"概览","appAll","system");
// 				$('#seaMainCtn').addClass('hide');
// 				$('#showSearchBtn').removeClass('hide');
// 			}else if($div.hasClass('sea-body-obj-ctn-txt')&&$div.attr('data-role')==='seaBodyObjCtnServerTxt'){
// 				var serverId = $span.attr('data-serverId'),
// 				serverName = $span.text(),
// 				$appArr = $('[data-role=seaBodyObjCtnAppTxt]',$target).find('span'),
// 				appIdArr = new Array(),
// 				appNameArr = new Array(),
// 				objType =  $span.attr('data-objType');
//
// 				$appArr.each(function(){
// 					appIdArr.push($(this).attr('data-appId'));
// 					appNameArr.push($(this).text());
//
// 				});
//
// 				app.domain.exports("searchAll", {serverId:serverId,appIdArr:appIdArr,appNameArr:appNameArr,objType:objType,objId:serverId},serverName,serverName);
// 				app.dispatcher.load(serverName+"服务器概览","appAll","system","server");
// 				$('#seaMainCtn').addClass('hide');
// 				$('#showSearchBtn').removeClass('hide');
// 			}
// 		}
// 	});
	
//	$('#seaBodyShowCtn').hover(function(event){
//		var $target = $(event.target || window.event.srcElement).closest('div');
//		if($target.hasClass('sea-app-col')){
//			$target.tooltip();
//		}
//	});
/**搜索框相关处理End**/	
	
	/*当前时间*/
	function getCurrentTime(objD, a, b, c) {
		var str;
		var yy = objD.getYear();
		if (yy < 1900)
			yy = yy + 1900;
		var MM = objD.getMonth() + 1;
		if (MM < 10)
			MM = '0' + MM;
		var dd = objD.getDate();
		if (dd < 10)
			dd = '0' + dd;
		var hh = objD.getHours();
		if (hh < 10)
			hh = '0' + hh;
		var mm = objD.getMinutes();
		if (mm < 10)
			mm = '0' + mm;
		var ss = objD.getSeconds();
		if (ss < 10)
			ss = '0' + ss;
		str = yy + a + MM + a + dd + b + hh + c + mm + c + ss;
		return (str);
	}

/** 根据用户加载菜单Start */
//$.ajax( {   
//	"async": false,
//    "type": "POST",    
//    "url": "MenuDataAction_disposeMenu.do",  
//    'dataType': 'json',
//	'data':{},
//    "success": function(resp) {
//    	if(resp!=null){
//    		if(resp.content!=null){
//    			debugger;
//    			
//    		}
//    	}
//    }
//});
/** 根据用户加载菜单End */
	/*菜单栏目搜索*/
	/*$("#seachMenu").click(function(e){
		e.stopPropagation();
	});
	$("#seachMenu").on('keydown',function(e){
		e = e || window.event;
		var key = e.keycode || e.which;
		var val = $(this).val();
		if(key === 13){
			showSearchMenu(val)
		}
		e.stopPropagation();
	});
	function showSearchMenu (val){
		//bannerMenu
		var bannerText = $("#bannerMenu").text()
		if(!bannerText.indexOf(val)){
			app.alert("未找到相应的选项！")
		}
		var menuInfo = getMenuInfo();
		if(menuInfo.hasOwnProperty(val)){
			$("#bannerMenu>li:nth-child("+menuInfo[val]+")").trigger("click");
		}
		
	}
	//获得所有的菜单栏名称，然后保存
	var getMenuInfo = function(){
	  var arr = {};
	  console.log($("#bannerMenu").text());
	  return arr;
	}*/
/* 主菜单点击事件Start */
	// 离开菜单 收起所有二级菜单
	// $('#leftAside').mouseleave(function(){
	// 	if($('.lock-width>i').hasClass('fa-unlock') && $('.menu-secondLevel.show').length > 0){
	// 		$('.menu-secondLevel.show').removeClass('show');
	// 		// $('#bannerMenu>.active').removeClass('active');
	// 		$(".menu-firstLevel>li").each(function(){
	// 			// $(this).children('a').css('background-image', $(this).children('a').css('background-image').replace('-check.png','.png'));
	// 		})
	// 	}
	// });

	// 一级菜单点击
	$(".menu-firstLevel>li").click(function (e){
		if(!$(this).hasClass('active')){
			$(this).siblings().removeClass('active').find(".menu-secondLevel").removeClass('show');
			$("a.menu").not(this.childNodes[0]).trigger("mouseout");
			var tar = e.target || e.srcElement;
			//点击在span上让图标也变亮
			if(tar == this.childNodes[1]){
				$(this.childNodes[0]).trigger("mouseover");
			}
			$(this).addClass('active');
			
		}
		$(".menu-secondLevel", $(this)).toggleClass('show');
		if($(".menu-firstLevel").hasClass('showMenu')){
			$(".menu-firstLevel").removeClass('showMenu');
		}
		e.stopPropagation();
		//默认第三级菜单全部展开
		$('.menu-secondLevel>li>a').find('i').addClass('fa-rotate-180');
		$('.menu-secondLevel>li>a').next().slideDown('fast');
	});
	// 一级菜单名称展示
	$("#menuBtn").click(function (e){
		$(".menu-firstLevel").toggleClass('showMenu');
		e.stopPropagation();
	});
	// body事件绑定，收起所有菜单
	$("body").click(function (e){
		if(e.target != $("#menuBtn")[0]){
			$(".menu-firstLevel").removeClass('showMenu');
		}
		if($(e.target).closest($('#leftAside')).length != 0){
			$(".menu-secondLevel").removeClass('show');
		}
	});
	// 二级菜单点击展开三级菜单
	/*$('.menu-secondLevel>li>a').click(function(event) {
		event.stopPropagation();
		$(this).find('i').toggleClass('fa-rotate-180');
		$(this).next().slideToggle('fast');
		event.stopPropagation();
	});*/

	// 菜单事件绑定（打开交易功能）
	$('.menu-thirdLevel>li>a, .menu-secondLevel>li>a').click(function(event) {
		event.stopPropagation();
		
		var $this = $(this),
			title,
			section,
			path;
		
		// 收起二级菜单
		// $this.closest(".menu-secondLevel").removeClass('show');
		
		if($this.attr('data-href')){
			title = $.trim($this.text());
			section = $this.attr('data-href').split('#');
			path = $this.attr('data-path');
			
			if(path){
				// 缓存
				app.damain.exportMenuParam({
					path: path,
					type: $this.attr('data-type')
				});
				// 跳转
				app.dispatcher.load({
					title: title,
					moduleId: section[0],
					section: section.slice(1),
					id: path
				});
			} else {
				var serachId = app.common.searchTab.getTabNum();
				if(title == '日志搜索'){
					app.dispatcher.load({
						title: title,
						moduleId: section[0],
						section: section.slice(1),
						id: title+serachId
					});
				} else if(title == '我的仪表盘'){
					let id = $this.parent().attr('data-id');
					app.dispatcher.load({
						title: title,
						moduleId: section[0],
						section: section.slice(1),
						id: title+serachId,
						params: {
							dashboardId: id
						}
					});
				} else if(['Linux监控','MySQl监控','Redis监控','Tomcat监控','ES监控','Kafka监控'].includes(title)){
				     var categoryMap = {
				    	      'Linux监控': 'linux',
				    	      'MySQL监控': 'MySQL',
				    	      'Redis监控': 'redis',
				    	      'Tomcat监控': 'Tomcat',
				    	      'ES监控':'elasticsearch',
				    	      'Kafka监控':'kafka'
				    	     };
				    	     app.dispatcher.load({
				    	      title: title,
				    	      moduleId: section[0],
				    	      section: section.slice(1),
				    	      id: title+serachId,
				    	      params: {
				    	       category: categoryMap[title]
				    	      }
				    	     });
				  }else{
					app.dispatcher.load.apply(app.dispatcher, [title].concat(section));
				}
			}
		}else{
			$(this).find('i').toggleClass('fa-rotate-180');
			$(this).next().slideToggle('fast');
		}
	});
	
	// form中开关的事件 
	$(".main").delegate(".boolean-switch", 'click', function() {
		$(this).toggleClass("true");
	});
	
//$(".aweb-main-menu").click(function(){
//	//切换样式
//	var $this = $(this),title,section,path,$others=$this.siblings(),
//	$thisSubMenu = $this.children(".aweb-main-menu-sub"),
//	$othersSubMenu = $others.children(".aweb-main-menu-sub"),
//	$thisTriangle = $this.children(".aweb-main-menu-triangle"),
//	$othersTriangle = $others.children(".aweb-main-menu-triangle"),
//	$thisSubTriangle = $this.children(".aweb-main-menu-sub-triangle"),
//	$othersSubTriangle = $others.children(".aweb-main-menu-sub-triangle");
//	
//	if(!$thisSubMenu.length > 0){
//		//如果没有子菜单
//		if(!$this.hasClass("aweb-main-menu-bg-click")){
//			$this.addClass("aweb-main-menu-bg-click");
//			$others.removeClass("aweb-main-menu-bg-click");
//			$thisTriangle.show();
//			$othersTriangle.hide();
//			$othersSubMenu.hide();
//			$othersSubTriangle.hide();
//		}
//		//页面跳转
//		var title,section,path;
//		if ($this.attr('data-href')) {
//		    title=$.trim($this.text());
//		    section=$this.attr('data-href').split('#');
//		    path=$this.attr("data-path");
//		    app.dispatcher.load({
//				title:title,
//				moduleId: section[0],
//				section: section.slice(1),
//				id:path,
//			});
//		}
//	} else{
//		//如果有子菜单
//		$othersTriangle.hide();
//		$othersSubTriangle.hide();
//		$othersSubMenu.hide();
//		if(!$this.hasClass("aweb-main-menu-bg-click")){
//			$this.addClass("aweb-main-menu-bg-click");
//			$others.removeClass("aweb-main-menu-bg-click");
//		}
//		if($thisSubMenu.is(":hidden") && !$thisSubMenu.hasClass("aweb-out")){
//			$thisTriangle.hide();
//			$thisSubTriangle.show();
//			$thisSubMenu.show();
//		}else{
//			$thisTriangle.show();
//			$thisSubTriangle.hide();
//			$thisSubMenu.hide();
//			$thisSubMenu.removeClass("aweb-out");
//		}
//	}
//});
//$(".aweb-main-menu-sub>li").click(function(){
//	//子菜单页面跳转
//	var $this = $(this), $children = $this.children("a");
//	$this.addClass("aweb-out");
//	$this.children(".aweb-main-menu-triangle-monitor").hide();
//	$this.parent(".aweb-main-menu").addClass("aweb-main-menu-bg-click");
//	$this.parent(".aweb-main-menu").children(".aweb-main-menu-triangle").show();
//	//页面跳转
//    var title,section,path;
//	if ($children.attr('data-href')) {
//	    title=$.trim($children.text());
//	    section=$children.attr('data-href').split('#');
//	    path=$children.attr("data-path");
//    	app.dispatcher.load({
//			title:title,
//			moduleId: section[0],
//			section: section.slice(1),
//			id:path,
//		});
//	}
//});
/* 主菜单点击事件End */

/* 最新消息查询Start */
	
	//定义变量
	var oTable = {},
	alertEventTable,
	urgeEventTable,
	alertNum = 0,
	copyBtn,
	svBtn,
	delBtn,
	navBtn,
	acceptBtn,
	$eventEl=$("#awebEventDetails"),
	nbsp="&nbsp&nbsp";
	//获取事件详情html
//	$eventEl.eventDetails();
	//最新事件列表表格
	var oTable = {
			"bPaginate": false, //开关，是否显示分页器
			"bInfo": true, //开关，是否显示表格的一些信息
			'bStateSave': false,
			'bFilter' : false, // 过滤功能
			'aaSorting' : [[4,'desc']],
			"oLanguage":{
				"sZeroRecords":"无数据"
			},
			"fnDrawCallback":function(){//在每次table被draw完后调用
				$('tbody tr td',$('#globalAlertEvent')).each( function() {
					this.setAttribute( 'title', '' );
				});
			}
	}
	//督办列表
	var urgeTable = {
			"bPaginate": false, //开关，是否显示分页器
			"bInfo": true, //开关，是否显示表格的一些信息
			'bStateSave': false,
			'bFilter' : false, // 过滤功能
			'aaSorting' : [[4,'desc']],
			"oLanguage":{
				"sZeroRecords":"无数据"
			},
			"fnDrawCallback":function(){//在每次table被draw完后调用
				$('tbody tr td',$('#globalEventUrge')).each( function() {
					this.setAttribute( 'title', '' );
				});
			}
	};
	//最新事件表格
//	alertEventTable = $('#globalAlertEvent').dataTable(oTable);
	//督办事件表格
	urgeEventTable = $('#globalEventUrge').dataTable(urgeTable);
// 	function getNewEvent(){
// 		var timeStamp = getCurrentTime(new Date());
// 		var newEventList = {};
// 		$.ajax( {
// //			"async": false,
// 	        "type": "POST",
// 	        "url": "AlertInformationAction_getNewEvent.do",
// 	        'dataType': 'json',
// 			'data':{"timeStamp":timeStamp},
// 	        "success": function(resp) {
// 	        	if(resp!=null){
// 	        		if(resp.content!=null){
// 	        			newEventList = resp.content.eventArray;
// 	        			newEventNum += newEventList.length;
// 	        			if(newEventNum>0 && !$("#showWangingBtn").is(":hidden")){
// 	        				$(".aweb-navibar-alert-num").show();
// 	        				newEventNum=newEventNum>99?"99+":newEventNum;
// 	        				$(".aweb-navibar-alert-num").text(newEventNum);
// 	        			}
// //		        		app.alert(newEventList[1]["app_c_name"]);
// 		        		var eventLine = [];
// 		        		$.each(newEventList,function(index,event){
// 		        			var eventDate = new String(event["record_datetime"]).substring(0,4)
//         					+"-"+new String(event["record_datetime"]).substring(4,6)
//         					+"-"+new String(event["record_datetime"]).substring(6,8)
//         					+" "+new String(event["record_datetime"]).substring(8,10)
// 		        		    +":"+new String(event["record_datetime"]).substring(10,12)
// 		        			+":"+new String(event["record_datetime"]).substring(12,14),
// 		        			eventType,
// 		        			eventTypeColor,
// 		        			eventStatus;
// 		        			//事件类型
// 		        			if(event["event_type"]=="0") {
// 		        				eventType="通知";
// 		        				eventTypeColor="background-color: #0cbf47";
// 		        			} else if(event["event_type"]=="1"){
// 		        				eventType="预警";
// 		        				eventTypeColor="background-color: #ffa602";
// 		        			} else if(event["event_type"]=="2") {
// 		        				eventType="告警";
// 		        				eventTypeColor="background-color: #f01024";
// 		        			}
// 		        			//是否受理
// 		        			if(event["event_status"]=="0") {
// 		        				acceptBtn = '<a class="aweb-accpetBtn aweb-alert-font">受理</a>';
// 		        			} else if(event["event_status"]=="1"){
// 		        				acceptBtn = '<a class="aweb-accpetBtn aweb-alert-font aweb-done" style="text-decoration: none;cursor: default;color: #CCC;">受理</a>';
// 		        			}
//
// //		        			copyBtn = '<a class="alertEventBtn aweb-alert-font">复制</a>';
// 		        			svBtn = '<a class="aweb-svBtn aweb-alert-font">督办</a>';
// 		        			delBtn = "<a class='aweb-delBtn aweb-alert-font' data-index='"+index+"'>移除</a>";
// 		        			navBtn = '<a class="aweb-navBtn aweb-alert-font">导航</a>';
// 		        			eventLine.push(["<div style='min-width: 60px;'>"+"<div class='aweb-alert-newevent-type' data-eventType='"+ event["event_type"] +"' style='"+ eventTypeColor +"'>"+eventType+"</div>"+"</div>",
// 		        			                event["subcomponent"],
// 		        			                "<div style='text-overflow: ellipsis;white-space: nowrap;overflow: hidden;max-width: 100px;' title='"+event["app_supportgroup"]+"'>"+event["app_supportgroup"] + "</div>",
// 		        			                "<span class='aweb-alertInfo' style='text-overflow: ellipsis;white-space: nowrap;overflow: hidden;max-width: 920px;' title='"+event["event_desc"]+"'>"+event["event_desc"] +"</span>",
// 		        		                    "<div style='text-overflow: ellipsis;white-space: nowrap;overflow: hidden;max-width: 120px;' title='"+eventDate+"'>"+eventDate + "</div>",
// 		        		                    "<div id='eventHandle' data-eventId='"+event["event_id"]
// 		        							+"' data-eventStatus='"+event["event_status"]
// 		        							+"' data-appCName='"+event["app_c_name"]
// 		        							+"' data-pageflag='"+event["pageflag"]
// 		        							+"' data-objId='"+event["obj_id"]
// 		        							+"' data-objType='"+event["obj_type"]
// 						        			+"' data-appId='"+event["app_id"]
// 						        			+"' data-serverId='"+event["device_id"]
// 		        							+"' data-serverName='"+event["device_c_name"]
// 		        							+"' data-appGroup='"+event["app_supportgroup"]
// 		        							+"' data-objAttr1='"+event["obj_attr1"]
// 		        							+"' data-ticketCrt='"+event["ticket_crt"]
// 		        							+"' data-alertexp='"+event["alertexp"]
// 		        							+"' data-channelName='"+event["channel_name"]
// 											+"' data-objCName='"+event["obj_cname"]
// 		        			                +"' data-datetime='"+event["last_occu_datetime"]
// 		        							+"'>"+acceptBtn+nbsp+svBtn+nbsp+navBtn+nbsp+delBtn+"</div>"]);
// 		        		});
// 		        		alertEventTable.fnAddData(eventLine);
// 	        		}
// 	        	}
// 	        }
// 	    });
// 		window.setTimeout(function(){
// 			//getNewEvent();
// 		},10000);
// 	}
	//getNewEvent();
	
	//测试事件数据
//	copyBtn = '<a class="alertEventBtn aweb-alert-font">复制</a>';
//	svBtn = '<a class="aweb-svBtn aweb-alert-font">督办</a>';
//	delBtn = "<a class='aweb-delBtn aweb-alert-font' data-index='"+0+"'>删除</a>";
//	navBtn = '<a class="aweb-navBtn aweb-alert-font">导航</a>';
//	acceptBtn = '<a class="aweb-accpetBtn aweb-alert-font">受理</a>';
//	alertEventTable.fnAddData(["<div class='aweb-alert-newevent-type'>告警</div>","磁盘","状态","外围应用一组","CPU使用率达到90%","20160822",svBtn+nbsp+navBtn+nbsp+delBtn]);
	
	//事件督办
// 	function eventToUrge(eventId,$div) {
// 		if(eventId) {
// 			$.ajax( {
// //				"async": false,
// 		        "type": "POST",
// 		        "url": "AlertInformationAction_eventToUrge.do",
// 		        'dataType': 'json',
// 				'data':{"eventId":eventId},
// 		        "success": function(resp) {
// 		        	if(resp!=null){
// 		        		if(resp.content!=null){
// 		        			if(resp.content.resultFlag) {
// 		        				var index=alertEventTable.fnGetPosition($div.parents('td')[0]);
// 		        				if(resp.content.resultFlag=="1"){
// 		        					app.alert('title','事件督办成功！',app.alertShowType.SUCCESS);
// 		            				if(index){
// 		            					alertEventTable.fnDeleteRow(index);
// 		            				}
// 		        				} else if(resp.content.resultFlag.indexOf("已督办")>-1){
// 		        					app.alert(resp.content.resultFlag);
// 		            				if(index){
// 		            					alertEventTable.fnDeleteRow(index);
// 		            				}
// 		        				} else {
// 		        					app.alert(resp.content.resultFlag);
// 		        				}
// 		        			}
// 		        		}
// 		        	}
// 		        }
// 			});
// 		}
// 	}
	
	//事件操作
// 	function eventHandle (event){
// 		var $a = $(event.target || window.event.srcElement).closest('a');
// 		//复制功能
// //		if ($a.hasClass('alertEventBtn')) {
// //        	clipboard&&clipboard.destroy();
// //        	clipboard = new app.clipboard('.alertEventBtn',{
// //        		text:function(trigger){
// //        			var copyinfo = trigger.parentNode.previousSibling.firstChild.innerHTML;
// //        			return copyinfo;
// //        		}
// //        	});
// //        	clipboard.on('success',function(){
// //        		app.alert("复制事件信息成功！");
// //        	});
// //        }
// 		//1. 督办功能
//         if ($a.hasClass('aweb-svBtn')) {
//         	if($a.parent("div").attr("data-eventType")!='0'){
//         		var eventId = $a.parent("div").attr("data-eventId");
//             	eventToUrge(eventId,$a.parent("div"));
//         	}else {
//         		app.alert("通知事件不可督办");
//         	}
//         }
//         //2. 导航功能
//         if ($a.hasClass('aweb-navBtn')) {
//         	var pageflag = $a.parent().attr("data-pageflag"),
// 			objId = $a.parent().attr("data-objId"),
// 			objType = $a.parent().attr("data-objType"),
// 			appIds = ($a.parent().attr("data-appId")).split('|'),
// 			appId = appIds[0],
// 			appCNames = ($a.parent().attr("data-appCName")).split('|'),
// 			appCName = appCNames[0],
// 			serverId = $a.parent().attr("data-serverId"),
// 			serverName = $a.parent().attr("data-serverName"),
// 			appGroup = $a.parent().attr("data-appGroup"),
// 			objAttr1 = $a.parent().attr("data-objAttr1"),
// 			section = [],
//         	title = appCName+"-"+serverName,
// 			system,flagtype,
// 			$tr = $a.closest('tr'),
//         	$td = $tr.children(),
// 			eventinfo = [{"name":"事件类型：","value":$td.eq(0).text()},{"name":"指标类型：","value":$td.eq(1).text()},
// 			             {"name":"分组：","value":$td.eq(2).text()},{"name":"事件信息：","value":$td.eq(3).text()},
// 			             {"name":"记录时间：","value":$td.eq(4).text()}];
// 	    	if(pageflag=="10" || pageflag.substring(0,2)=="11"){
// 	    		section = ["appAll","system","board"];
// 	    		if(pageflag=="10") {
// 	    			title+="-操作系统";
// 	    		}else{
// 	    			title+="-数据库";
// 	    		}
// 	    	}else if(pageflag == "12"){
// 	    		section = ["appAll","system"];
// 	    		title = appCName[0];
// 	    		if($tr.children().eq(1).text()=="交易量监控"){
// 	    			flagtype = "traceshow";
// 	    		}else{
// 	    			flagtype = "appshow";
// 	    		}
// 	    	}
// 	    	if(objAttr1=="Windows"){
// 				system="Windows";
// 			}else{
// 				system="Unix";
// 			}
// 			if(title==""){
// 				title="未知系统";
// 			}
// 			if(section.length>0 && appId!=""){
// 				var namespace,
// 				page = section[section.length-1];
// 				if(page=="system") {
// 					namespace="appAll";
// 				} else if(page=="board") {
// 					namespace="event";
// 				} else if(page=="sqlserver") {
// 					namespace="SQLSERVER";
// 				}
// 				//跨页面参数设置格式： app.domain.exports(命名空间,{变量key:变量value});
// 				app.domain.exports(namespace,{'objId':objId});
// 				app.domain.exports(namespace,{'appId':appId});
// 				app.domain.exports(namespace,{'objType':objType});
// 				app.domain.exports(namespace,{'pageflag':pageflag});
// 				app.domain.exports(namespace,{'bSystem':title});
// 				app.domain.exports(namespace,{'appGroup':appGroup});
// 				app.domain.exports(namespace,{'system':system});
// 				if(namespace!="appAll"){
// 					app.domain.exports(namespace,{'serverId':serverId});
// 					app.domain.exports(namespace,{'sName':serverName});
// 				}else{
// 					app.domain.exports(namespace,{'flagtype':flagtype});
// 				}
// 				app.domain.exports(namespace,{'eventInfo':eventinfo});
// 				app.dispatcher.load({
// 					title:title,//跳转的节点名
// 					moduleId: section[0],
// 					section: section.slice(1)
// 				});
// 			}else{
// 				if(appId==""){
// 					app.alert("在cmdb中找不到该系统，请联系管理员");
// 				}
// 				if(section.length==0){
// 					app.alert("暂未支持该监控对象！");
// 				}
// 			}
//         }
//         //3. 受理功能
// 	    if ($a.hasClass('aweb-accpetBtn') && !$a.hasClass('aweb-done')) {
// 	    	var status=$a.parent().attr("data-eventStatus"),
// 	    	eventId=$a.parent().attr("data-eventId");
// 	    	if(status=="0"){
// 	    		$.ajax({
// 					"type":"POST",
// 					"url":"./EventAction_EventStatusExchg.do",
// 					"dataType":"json",
// 					"data":{"id":eventId},
// 					"success":function(data){
// 						if(data&&data.status){
// 							app.alert('title','受理成功！',app.alertShowType.SUCCESS);
// 							$a.css("text-decoration","none");
// 							$a.css("cursor","default");
// 							$a.css("color","#CCCCCC");
// 							$a.addClass("aweb-done");
// 						}else{
// 							app.alert("受理失败");
// 						}
// 					},
// 					"error": function (xhr, status, errMsg) {
// 							app.alert('受理交易码错误！' );
// 					}
// 				})
// 	    	}
// 	    }
//         //4. 移除功能
//         if ($a.hasClass('aweb-delBtn')) {
//         	app.confirm({
//     			title:'移除事件',
//     			content:'是否确认执行该操作？',
//     			btnConfirm:'是',
//     			btnCancel:'否',
//     			confirmHandler:function(h){
//     				app.alert('事件移除成功！');
//     				var index=alertEventTable.fnGetPosition($a.parents('td')[0]);
//     				alertEventTable.fnDeleteRow(index);
//     			},
//     			context:$('body')[0],
//     			args:['是','否']
//     		});
//         }
// 	}
	
	/* 督办列表功能Start */
// 	$("#svListTab").click(function(){
// 		$(".warning-content").hide();
// 		$("#clearEvent").hide();
// //		$(".warning-content").fadeOut();
// 		$(".sv-content").fadeIn();
// 		$("#svListTab").addClass("warning-title-tab-active");
// 		$("#svListTab").parent().addClass("underLine");
// 		$("#svListTab").css("color","#222222");
// 		$("#newAlertMsgTab").removeClass("warning-title-tab-active");
// 		$("#newAlertMsgTab").parent().removeClass("underLine");
// 		$("#newAlertMsgTab").css("color","#666666");
// 		var urgeCond = "1";
// 		urgeEventTable.fnClearTable();
// 		//获取督办事件列表
// 		$.ajax( {
// //			"async": false,
// 	        "type": "POST",
// 	        "url": "AlertInformationAction_getEventToUrgeList.do",
// 	        'dataType': 'json',
// 			'data':{"urgeCond":urgeCond},
// 	        "success": function(resp) {
// 	        	if(resp!=null){
// 	        		if(resp.content!=null){
// 	        			var eventToUrgeList = resp.content.eventToUrgeList;
// 	        			if(eventToUrgeList){
// 	        				var eventLine = [];
// 			        		$.each(eventToUrgeList,function(index,event){
// 			        			var eventDate = new String(event["record_datetime"]).substring(0,4)
// 	        					+"-"+new String(event["record_datetime"]).substring(4,6)
// 	        					+"-"+new String(event["record_datetime"]).substring(6,8)
// 	        					+" "+new String(event["record_datetime"]).substring(8,10)
// 			        			+":"+new String(event["record_datetime"]).substring(10,12)
// 			        			+":"+new String(event["record_datetime"]).substring(12,14),
// 			        			eventType,
// 			        			eventTypeColor,
// 			        			eventStatus;
// 			        			//事件类型
// 			        			if(event["event_type"]=="0") {
// 			        				eventType="通知";
// 			        				eventTypeColor="background-color: #0cbf47";
// 			        			} else if(event["event_type"]=="1"){
// 			        				eventType="预警";
// 			        				eventTypeColor="background-color: #ffa602";
// 			        			} else if(event["event_type"]=="2") {
// 			        				eventType="告警";
// 			        				eventTypeColor="background-color: #f01024";
// 			        			}
// //			        			copyBtn = '<a class="alertEventBtn aweb-alert-font">复制</a>';
// 			        			svBtn = '<a class="aweb-svBtn aweb-alert-font">督办</a>';
// 			        			delBtn = "<a class='aweb-delBtn aweb-alert-font' data-index='"+index+"'>移除</a>";
// 			        			navBtn = '<a class="aweb-navBtn aweb-alert-font">导航</a>';
// 			        			eventLine.push(["<div style='min-width: 60px;'>"+"<div class='aweb-alert-newevent-type' data-eventType='"+ event["event_type"] +"' style='"+ eventTypeColor +"'>"+eventType+"</div>"+"<div style='float: left;margin-left: 5px;width: 10px;height: 15px;background: url("+'img/urge.png'+");'></div>"+"</div>",
// 			        			                event["subcomponent"],
// 			        			                "<div style='text-overflow: ellipsis;white-space: nowrap;overflow: hidden;max-width: 100px;' title='"+event["app_supportgroup"]+"'>"+event["app_supportgroup"] + "</div>",
// 			        		                    "<span class='aweb-alertInfo' style='text-overflow: ellipsis;white-space: nowrap;overflow: hidden;max-width: 920px;' title='"+event["event_desc"]+"'>"+event["event_desc"] +"</span>",
// 			        		                    "<div style='text-overflow: ellipsis;white-space: nowrap;overflow: hidden;max-width: 120px;' title='"+eventDate+"'>"+eventDate + "</div>",
// 			        		                    "<div id='eventHandle' data-eventId='"+event["event_id"]
// 			        		                    +"' data-eventStatus='"+event["event_status"]
// 			        							+"' data-appCName='"+event["app_c_name"]
// 			        							+"' data-pageflag='"+event["pageflag"]
// 			        							+"' data-objId='"+event["obj_id"]
// 			        							+"' data-objType='"+event["obj_type"]
// 							        			+"' data-appId='"+event["app_id"]
// 							        			+"' data-serverId='"+event["device_id"]
// 			        							+"' data-serverName='"+event["device_c_name"]
// 			        							+"' data-appGroup='"+event["app_supportgroup"]
// 			        							+"' data-objAttr1='"+event["obj_attr1"]
// 			        							+"' data-ticketCrt='"+event["ticket_crt"]
// 			        							+"' data-alertexp='"+event["alertexp"]
// 			        							+"' data-channelName='"+event["channel_name"]
// 												+"' data-objCName='"+event["obj_cname"]
// 								                +"' data-datetime='"+event["last_occu_datetime"]
// 			        							+"'>"+navBtn+"</div>"]);
// 			        		});
// 			        		urgeEventTable.fnAddData(eventLine);
// 	        			}
// 	        		}
// 	        	}
// 	        }
// 		});
// 	});
// 	$("#newAlertMsgTab").click(function(){
// 		$("#clearEvent").show();
// 		$(".warning-content").fadeIn();
// 		$(".sv-content").hide();
// //		$(".sv-content").fadeOut();
// 		$("#newAlertMsgTab").addClass("warning-title-tab-active");
// 		$("#newAlertMsgTab").parent().addClass("underLine");
// 		$("#newAlertMsgTab").css("color","#222222");
// 		$("#svListTab").removeClass("warning-title-tab-active");
// 		$("#svListTab").parent().removeClass("underLine");
// 		$("#svListTab").css("color","#666666");
// 		urgeEventTable.fnClearTable();
// 	});
	
	// $("#showWangingBtn").click(function(){
	// 	$(".aweb-navibar-alert-num").hide();
	// 	newEventNum=0;
	// 	//查询事件列表
	// 	getEventList();
	// });
	
	// $("#clearEvent").click(function(){
	// 	app.confirm({
	// 		title:'清除',
	// 		content:'是否确认执行该操作？',
	// 		btnConfirm:'是',
	// 		btnCancel:'否',
	// 		confirmHandler:function(h){
	// 			app.alert('列表清空成功！');
	// 			alertEventTable.fnClearTable();
	// 		},
	// 		context:$('body')[0],
	// 		args:['是','否']
	// 	});
	// });
	
	// $("#eventList").click(function(){
	// 	app.dispatcher.load.apply(app.dispatcher, ["事件管理"].concat(['event']));
	// });
	/* 督办列表功能End */
	//最新事件 集中处理    加上  >tbody  ，防止点击标题也能进入事件详情页面
	// $("#globalAlertEvent>tbody,#globalEventUrge>tbody").click(function(event){
	// 	var $td = $(event.target || window.event.srcElement).closest('td'),
	// 		$tr = $td.parent(),
	// 		$div = $tr.children().eq(5).children(),
	// 		eventId = $("#eventHandle",$tr).attr("data-eventid"),
	// 		$eventHandle = $("#eventHandle",$tr);
	// 	//防止没有数据时还能进入事件详情页面
	// 	if ($td.index() != 5 && eventId && eventId!="") {
	// 		$('[data-role="eventDtlTemp"]' , $eventEl).modal('show');
	// 		$('.body-autoHeight').css("overflow-x","hidden");
	// 		$("#tickId",$tr).val($eventHandle.attr("data-ticketcrt"));
	// 		$("#Id",$eventEl).val($eventHandle.attr("data-eventId")
	// 							+","+$eventHandle.attr("data-ticketCrt")
	// 				            +","+$eventHandle.attr("data-appId")
	// 				            +","+$eventHandle.attr("data-serverId")
	// 				            +","+$eventHandle.attr("data-objType")
	// 				            +","+$eventHandle.attr("data-objId")
	// 							+","+$eventHandle.attr("data-alertexp")
	// 							+","+$eventHandle.attr("data-channelName")
	// 							+","+$eventHandle.attr("data-appGroup")
	// 							+","+$eventHandle.attr("data-objCName")
	// 							+","+$eventHandle.attr("data-objAttr1")
	// 							+","+$eventHandle.attr("data-appCName")
	// 							+","+$eventHandle.attr("data-pageflag")
	// 							+",1"
	// 							+","+$eventHandle.attr("data-datetime")
	// 		);
	// 		$eventEl.eventDetails('loadChart',$eventEl);
	// 		$eventEl.eventDetails('relatedSys',$eventEl);
	// 		$eventEl.eventDetails('accpetdiv', $div);
	// 	} else if($td.index() == 5){
	// 		eventHandle(event);
	// 	}
	// });
	//
	// $("#closemodal",$eventEl).click(function(){
	// 	var bodyWidth = document.documentElement.clientWidth;
	// 	if(bodyWidth<1680){
	// 		$('.body-autoHeight').css("overflow-x","visible");
	// 	}
	// });
	/* 最新消息查询End */
	
	//美化左边菜单栏滚动条
//	$('.aside-left').slimScroll({
//		height : '100%',
//		color : '#000'
//	});
	
	//加载页面完成后执行的操作
	$(document).ready(function(){
		//加载完页面后，隐藏最新消息框
		$("#closeWarning").trigger("click");
		var bodyWidth = document.documentElement.clientWidth;
//		if(bodyWidth>=1600){
//			$(".body-autoHeight").css("overflow-x","hidden");
//			$("#tabsContainer").css("width", bodyWidth - 124);
//		} else {
//			$(".body-autoHeight").css("overflow-x","visible");
//			var tabsLength = bodyWidth - 124;
//			$("#tabsContainer").css("width", tabsLength);
//		}
	});
	
	//监听窗口大小
	window.onload=function(){
		changeOverflowStyle();
	}
	window.onresize=function(){
		changeOverflowStyle();
	};
	
	function changeOverflowStyle() {
		var bodyWidth = document.documentElement.clientWidth;
//		if(bodyWidth<1680){
//			$("#tabsContainer").css("overflow","hidden");
//			$(".body-autoHeight").css("overflow-x","visible");
//			var tabsLength = bodyWidth - 124;
//			$("#tabsContainer").css("width", tabsLength);
//		} else{
//			$("#tabsContainer").css("overflow","visible");
//			$(".body-autoHeight").css("overflow-x","hidden");
//			$("#tabsContainer").css("width", bodyWidth - 124);
//		}
	}
	
	// var keepAlive = function(){
	// 	$.ajax({
	// 		'type': 'post',
	// 		'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
	// 		'url': "KeepAliveAction_keepAlive.do",
	// 		'dataType': 'json',
	// 		"data": {},
	// 		shelter:'正在加载数据，请稍候…',
	// 		"success": function (data) {
	// 		}
	// 	});
	// };
	
	//setInterval(keepAlive,1000*60*2);

	//窗口改变大小时弹出框自适应
	function setModalLgSize(){
		var modal = {
				h:'', w:'', l:'', t:''},modalStyle,modalBodyHeight,maxHeight,
				$modalStyle = $('#modalStyles'),
				$body = $('body'),
				$mHeader = $('.modal-header'),
				$mBody = $('.modal-body');
		//定义modal大小
		modal.h = $body.height();
		modal.w = $body.width()*0.8;
		modal.l = -(modal.w*0.5);
		modal.t = -(modal.h*0.5);
		modalStyle = 'width:'+modal.w+'px;'+
		'height:'+modal.h+'px;'+
		'margin-left:'+modal.l+'px;'+
		'margin-top:'+modal.t+'px;'+
		'left:50%;top:'+($(window).height()/2-20)+'px;'+
		'transition:all linear .3s';
		maxHeight = modal.h-$mHeader.outerHeight()-($mBody.outerHeight()-$mBody.height())*2-10;
		modalBodyHeight = 'max-height:'+maxHeight+'px;min-height:'+maxHeight+'px;';
		if($modalStyle.length==0){
			var $style = $('<style id="modalStyles">');
			$style.append('.modal-lg.fade.in{'+modalStyle+'}'+'.modal-lg.fade.in .modal-body{'+modalBodyHeight+'}');
			$('head').append($style);
		}
		else{
			$modalStyle.empty().append('.modal-lg.fade.in{'+modalStyle+'}'+'.modal-lg.fade.in .modal-body{'+modalBodyHeight+'}');
		}
	}
	app.screen.addResizeHandler({
		isGlobal: true,
		callback: setModalLgSize,
		uid:app.global.getUniqueId()
	});
	setModalLgSize();

	$(document).unload(function () {
		signOut();
	});
	
	//----------------------------------预警-----------------------------
// 	var $alertTable = $("#globalAlertEvent").dataTable({
// 		'pageLength': 25,
// 		"bAutoWidth" : true,
// 		'bStateSave' : false,
// 		'searching' : false,
// 		"ordering" : false,
// 		"paging" : false,
// //		"scrollY" : '300px',
// //		"scrollCollapse" : true,
// 		columns : [{//序号
// 			data : 'index',
// 			defaultContent : ''
// 		},{//事件类型
// 			data : 'eventType',
// 			defaultContent : ''
// 		},{//应用名称
// 			data : 'appNames',
// 			defaultContent : ''
// 		},{//对象名称
// 			data : 'objName',
// 			defaultContent : ''
// 		},{//事件摘要
// 			data : 'eventTitle',
// 			defaultContent : ''
// 		},{//事件状态
// 			data : 'eventStatus',
// 			defaultContent : '-'
// 		},{//工单状态
// 			data : 'itilStatus',
// 			defaultContent : '-'
// 		},{//处理状态
// 			data : 'dealStatus',
// 			defaultContent : ''
// 		},{//发生次数
// 			data : 'tally',
// 			defaultContent : ''
// 		},{//首发时间
// 			data : 'eventStart',
// 			defaultContent : ''
// 		},{//最后时间
// 			data : 'eventEnd',
// 			defaultContent : ''
// 		}],
// 		'aoColumnDefs' : [{
// 			"render": function(data, type, row, meta) {
// 				if(data == 0){
// 					return '<span class="event-type error"></span>';//故障
// 				}else if(data == 1){
// 					return '<span class="event-type warning"></span>';//预警
// 				}else if(data == 2){
// 					return '<span class="event-type notice"></span>';//通知
// 				}
// 			},
// 			"targets": 1
// 		},{
// 			"render": function(data, type, row, meta) {
// 				if(data == 0){
// 					return '待处理';
// 				}else if(data == 1){
// 					return '处理中';
// 				}else if(data == 2){
// 					return '已处理';
// 				}
// 			},
// 			"targets": 5
// 		},{
// 			"targets": 2,
// 			"render": function(data, type, row, meta){
// 				if(data){
// 					return data[0];
// 				}else{
// 					return '-';
// 				}
//
// 			}
// 		}]
// 	});
	
// 	function getEventList(){
// 		var urlData = {
// 				pageSize : 25,
// //				cmdbCateIds : ['-1'],
// 				eventType : 'ALARM_WARING',
// 				dealStatus : 'DEALING',
// 				eventStatus : 'NEW',
// 				itilStatus : 'ALL'
// 			};
// 		app.common.ajaxWithAfa({
// 			cache : false, // 禁用缓存
// 			url:'ShowUserPrivilegeAction_getEventsByUserPrivilege.do',
// 			data: urlData
// 		}).done(function(result){
// 			$alertTable.fnClearTable();
// 			result = result.events;
// 			var content = [], elements = 0, pages = 0;
// 			if(result){
// 				content = result.content;
// 				elements = result.totalElements;
// 			}
// 			content.forEach(function(item, index){
// 				item['index'] = ++index;
// 			});
// 			// $('.aweb-alert-msg').children().removeClass('hide');
// 			$alertTable.fnAddData(content);
// 		});
// 	}
// 	//如果弹出框被点击，就让高度等于100%
// 	$("#minmaximize").on("click",function(){
// 		$(".aweb-alert-content").css("height","100%");
// 	});
// 	//modal 弹出的时候 防止按空格 以及回车的时候 出现 多个模态框（while you find better method please fixed me）
// 	$(document).on("click","button",function(e){
// 		$(this).blur();
// 	});
	
	/**
	 * 大神强烈建议添加的快捷键
	 * @param  {[type]} event)
	 * @return {[type]}
	 */
	// $('body').on('keyup', function(event) {
	// 	event.preventDefault();
	// 	if(event.altKey && event.keyCode == 87){
	// 		app.tab.close($('#tabsContainer').find('li.active'));
	// 	}
	// });
    //
	// $('.bank-logo-content').click(function(event) {
	// 	loadPersonalBench();
	// });
	//
	// loadPersonalBench();
	// function loadPersonalBench() {
	// 	app.dispatcher.load({//提前加载应用状态总览
	// 		title: "我的首页",
	// 		moduleId:"personalBench",
	// 		section:""
	// 	});
	// }
	

	// 锁定菜单宽度
	$('.lock-width .fa-unlock, .lock-width .fa-lock').click(function(){
		$(this).toggleClass('fa-unlock fa-lock');
		$("#banner").toggleClass("lock");
		$('body').toggleClass('lock-Menu');
		$(window).resize();// 触发页面resize
	})
	// 日志搜索
	// $('.index-add-flow-btn').click(function () {
	// 	$('#bannerMenu>.active').removeClass('active');
	// 	app.dispatcher.load({//提前加载应用状态总览
	// 		title: "日志搜索",
	// 		moduleId:"logResultCheck",
	// 		section:"logSearchDetail",
	// 		id:'logSearch'+app.global.getUniqueId()
	// 	});
	// })
});
