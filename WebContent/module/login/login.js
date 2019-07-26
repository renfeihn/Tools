define(["jquery"],function(){
	
	return {
		
		load:function($el,scope,handler){
			$(document).keyup(function(){
				if(event.keyCode==27||event.keyCode==96){
					$("#login_container",$el).fadeOut();
				}
			});
			$('.radio',$el).click(function(){
				$(this).toggleClass('active');
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
			$('.login-main-left',$el).hover(function(e){
				/*$('.login-main-left',$el).addClass('animated bounce');*/
				$('.login-border-bottom',$el).addClass('animated bounce');
				$('.login-border-top',$el).addClass('animated bounce');
				setTimeout(function(){
					$('.squareBig-container',$el).addClass('animated bounce');
				},30);
				setTimeout(function(){
					$('.login_crul_container',$el).addClass('animated bounce');
				},75);
				setTimeout(function(){
					$('.orange',$el).addClass('animated bounce');
					$('.orange-logo',$el).addClass('animated bounce');
				},90);
				setTimeout(function(){
					$('.blue',$el).addClass('animated bounce');
					$('.blue-logo',$el).addClass('animated bounce');
				},120);
				setTimeout(function(){
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
			});
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});