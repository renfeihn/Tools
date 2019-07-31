$(function () {
	onload = function (data) {
		// if(!isChrome()){
		// 	var r = confirm('为了更好的网站体验，建议您使用谷歌浏览器。\n当前浏览器非谷歌。\n\n点击 “确定” 前往下载谷歌浏览器；\n点击 “取消” 继续使用当前浏览器。');
		//
		// 	if(r){
		// 		// open('./navigatorDownload.html');
		// 		location.href = './navigatorDownload.html';
		// 	}
		// }else{
		// 	if(chromeVersionIsLow()){
		// 		var r = confirm('为了更好的网站体验，建议您使用新版谷歌浏览器。\n当前浏览器Chrome内核版本较低。\n\n点击 “确定” 前往下载新版谷歌浏览器；\n点击 “取消” 继续使用当前浏览器。');
		//
		// 		if(r){
		// 			// open('./navigatorDownload.html');
		// 			location.href = './navigatorDownload.html';
		// 		}
		// 	}
		// }
	}

	var CODE_ENTER = 13,
    FIELD_USERNAME = "usernameField",
    FIELD_PASSWORD = "passwordField",
    BUTTON_SUBMIT = "loginBtn";
	//////////////////////////////////////
	$el = $('body');
	/*$(document).keyup(function(){
		if(event.keyCode==27||event.keyCode==96){
			$("#login_container",$el).fadeOut();
		}
	});*/
	$('.radio',$el).click(function(){
		$(this).toggleClass('active');
		if($(this).hasClass('active')){
			
		}else{
		
		}
	});
	$('#loginBtn').click(function(e){
		e.stopPropagation();
	});
	$('.login_main_content').click(function(){
		$('#tips').html('');
	});
	$('.login_main_content form input',$el).on('focus',function(){
		$(this).addClass('active');
	});
	$('.login_main_content form input',$el).on('blur',function(){
		$(this).removeClass('active');
	});
	$('#loginBtn',$el).hover(function(){
		$('.loginBtnBg>div',$el).addClass('active');
		$(this).css('color','#fff').css('background','transparent');
	},function(){
		$('.loginBtnBg>div',$el).removeClass('active');
		$(this).css('color','#5b62f9').css('background','#F5F6FF');
	});
	var timer1,timer2,timer3,timer4,timer5;
	$('.login-main-left',$el).hover(function(e){
		/*$('.login-main-left',$el).addClass('animated bounce');*/
		$('.login-border-bottom',$el).addClass('animated bounce');
		$('.login-border-top',$el).addClass('animated bounce');
		timer1 = setTimeout(function(){
			$('.squareBig-container',$el).addClass('animated bounce');
		},30);
		timer2 = setTimeout(function(){
			$('.login_crul_container',$el).addClass('animated bounce');
		},75);
		timer3 = setTimeout(function(){
			$('.orange',$el).addClass('animated bounce');
			$('.orange-logo',$el).addClass('animated bounce');
		},90);
		timer4 = setTimeout(function(){
			$('.blue',$el).addClass('animated bounce');
			$('.blue-logo',$el).addClass('animated bounce');
		},120);
		timer5 = setTimeout(function(){
			$('.login_progress-container',$el).addClass('animated bounce');
		},60);
		/*$('.squareBig-container',$el).addClass('animated bounce');
		$('.login_crul_container',$el).addClass('animated bounce');
		$('.login_progress-container',$el).addClass('animated bounce');
		$('.orange',$el).addClass('animated bounce');
		$('.orange-logo',$el).addClass('animated bounce');
		$('.blue',$el).addClass('animated bounce');
		$('.blue-logo',$el).addClass('animated bounce');
		$('.login-border-bottom',$el).addClass('animated bounce');
		$('.login-border-top',$el).addClass('animated bounce');*/
	},function(e){
		/*$('.login-main-left',$el).removeClass('animated bounce');*/
		$('.squareBig-container',$el).removeClass('animated bounce');
		$('.login_progress-container',$el).removeClass('animated bounce');
		$('.login_crul_container',$el).removeClass('animated bounce');
		$('.login_progress-container',$el).removeClass('animated bounce');
		$('.orange',$el).removeClass('animated bounce');
		$('.orange-logo',$el).removeClass('animated bounce');
		$('.blue',$el).removeClass('animated bounce');
		$('.blue-logo',$el).removeClass('animated bounce');
		$('.login-border-bottom',$el).removeClass('animated bounce');
		$('.login-border-top',$el).removeClass('animated bounce');
		clearTimeout(timer1);
		clearTimeout(timer2);
		clearTimeout(timer3);
		clearTimeout(timer4);
		clearTimeout(timer5);
	});
	//////////////////////////////
    

    errornum = 0;
    errortime = "";
    function login() {
        var usernameValue = $("#" + FIELD_USERNAME).val(),
            passwordValue = $("#" + FIELD_PASSWORD).val();

        if (!usernameValueCheck(usernameValue))
            return;

        if (!passwordValueCheck(passwordValue))
            return;

        $.ajax({
            "type": "POST",
            "url": "LoginAction_signIn.do",
            "data": {
                username: usernameValue,
                password: passwordValue
            },
            shelter:'正在登录，请稍候…',
            "success": function (data) {
                if (data.status) {
                    $("#redirectForm").submit();
                    $.setCookie("username",usernameValue);
                    if($('.radio').hasClass('active')){
                    	 $.setCookie("password",passwordValue);
                    }else{
                    	 $.setCookie("password",'',-1);
                    }
                } else {
                    $("#tips").html(data.errorMsg);
                    if(data.errorMsg.indexOf("用户名不存在")>-1){
                    	$("#usernameField").focus();
                    }
                }
            },
            "error": function (data) {

            }
        });
    }

    function usernameValueCheck(usernameValue) {
        if (!usernameValue){
            $("#tips").html("用户名不能为空");
            $("#"+FIELD_USERNAME).focus();
        }

        return !!usernameValue;
    }

    function passwordValueCheck(passwordValue) {
        if (!passwordValue){
            $("#tips").html("密码不能为空");
            $("#"+FIELD_PASSWORD).focus();
        }

        return !!passwordValue;
    }
    
    //从cookie中获取用户名
    $(document).ready(function(){
    	var username = $.getCookie('username');
    	if(username) {
    		$("#" + FIELD_USERNAME).val(username);
    		$("#" + FIELD_USERNAME).focus();
    	}
    	var password = $.getCookie('password');
    	if(password) {
    		 $("#"+FIELD_PASSWORD).val(password);
    		 $('.radio').addClass('active');
    		//$("#" + FIELD_USERNAME).focus();
    	}else{
    		$('.radio').removeClass('active');
    	}
    });
    
//    $('#loginVideo').on('canplay',function(){
//        $(this).fadeIn();
//        $('.login-container').css({
//            'background-image': 'none',
//            'background-color': 'rgba(255, 255, 255, 0.6)'
//        })
//    });
    //登陆处理
    $("#" + BUTTON_SUBMIT).click(login);

    //焦点切换
    var $tab=$('[data-tab="tab-focus"]');
    $tab.eq(0).focus();
    $tab.each(function(index,elem){
        $(this).on('keydown',{index:index},function(e){
            var key = e.which || window.event.keyCode;

            if (9===key) { //tab
                $tab.eq((e.data.index+1+$tab.length)%$tab.length).focus();
                return false;
            }
        });
    });

	//页面监听回车事件
	$(document).keydown(function (event) {
		var keyCode = event.which,
			target = event.target;

		if (keyCode == CODE_ENTER) {
			if (target.id === FIELD_USERNAME)
				$("#" + FIELD_PASSWORD).focus();
			else if (target.id === FIELD_PASSWORD)
				login();
		}
	});
    $(document).on('unload',function(){
        $(this).fadeOut();
    });

    function isChrome() {
    	var userAgent = navigator.userAgent;
    	var str = userAgent.match(/Chrome\/\d+/);
    	if(str && chrome){
    		return true;
    	}
    }
    
    function chromeVersionIsLow() {
    	var appVersion = navigator.appVersion;
    	var chrome = appVersion.split(' ').filter(item => item.includes('Chrome'));
    	var version = 0;
    	try{
    		version = chrome[0].split('/')[1].split('.')[0]
    	}catch(e) {
    		console.log(e);
    	}
    	return version < 69;
    	
    }
    
});


