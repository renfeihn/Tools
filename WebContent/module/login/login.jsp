<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
	#login_container{
		position:fixed;
		top:0;
		bottom:0;
		left:0;
		right:0;
		background:#fff;
		z-index:504;
		width:100vw;
		height:100vh;
	}
	
/******* start *******/
.login-header{
	width:83.333%;
	height:6.667%;
	margin:0 auto;
	position:relative;
}
.login_shadowbox{
	width:calc(100% - 10px);
	height:calc(100% - 2px);
	box-shadow:0px 0px 12px #ddd;
	position:absolute;
	left:5px; 
}
.login_logo{
	width:100%;
	height:100%;
	position:absolute;
	left:0;
	background:#fff;
	display:flex;
}
.login_logo>p{
	width:50%;
	height:100%;
	flex:auto;
}
.login_logo>p:nth-child(1){
	background:url(img/login_/logo.png) no-repeat center center;
}
.login_logo>p:nth-child(2){
	background:url(img/login_/slogan.png) no-repeat center center;
}
/* 主体部分  main */
.login-main{
	width:83.333%;
	height:604px;
	margin:0 auto;
	position:relative;
	display:flex;
	flex-wrap:nowrap;
}
.login-main-left{
	width:61%;
	flex:none;
	height:604px;
	position:relative;
	overflow:hidden;
}
.login-main-left>div{
	width:976px;
	height:604px;
	position:absolute;
	right:0;
	top:0;
}
.login-main-right{
	width:39%;
	flex:none;
	height:604px;
	position:relative;
}
.login-main-right .shadow-bg{
	width: 300px;
    height: 360px;
    background: #fff;
    box-shadow: 0px 5px 31px rgba(0,0,0,0.4);
    position: absolute;
    top: 100px;
    left: 14px;
 }
.login_main_content{
	width: 320px;
    height: 380px;
    background: #fff;
    position: absolute;
    left: -9px;
    top: -12px;
    border:1px solid #F9F9F9;
}
.login_main_content .login_form_title{
	font-size:20px;
	font-weight:600;
	color:#2b2933;
	margin-top:48px;
	margin-bottom:37px;
	text-align:center;
}
.login_main_content form{
	position:relative;
}
.login_main_content form input{
	width:260px;
	height:42px;
	border-radius:2px;
	padding-left:16px;
	padding-right:40px;
	margin-left:30px;
}
.login_main_content form input:nth-child(1){
	color:#2b2933;
	font-size:16px;
	background:url(img/login_/hui-ren1.png) no-repeat 220px center;
	margin-bottom:20px;
}
.login_main_content form input:nth-child(1).active{
	background:url(img/login_/hui-ren.png) no-repeat 220px center;
}
.login_main_content form input:nth-child(2){
	color:#929099;
	font-size:14px;
	background:url(img/login_/iconfont-mimahong1.png) no-repeat 220px center;
	margin-bottom:12px;
}
.login_main_content form input:nth-child(2).active{
	background:url(img/login_/iconfont-mimahong.png) no-repeat 220px center;
}
.radio{
	margin-bottom:30px;
	width:95px;
}
.radio span:nth-child(1){
	display:inline-block;
	width:16px;
	height:16px;
	border:1px solid #D5D5D5;
	border-radius:0;
	margin:0 7px 0 10px;
	corsor:pointer;
	position:relative;
}
.radio.active span:nth-child(1):after{
	content: "";
    position: absolute;
    width: 10px;
    height: 6px;
    border: 2px solid #2B2933;
    border-left: 0;
    border-bottom: 0;
    transform: rotate(125deg);
    left: 2px;
    top: 2px;
}
.radio span:nth-child(2){
	color:#5b62f9;
	font-size:12px;
	position:relative;
	top:-4px;
}
#loginBtn{
	margin-left:30px;
	width:260px;
	height:44px;
	color:#5b62f9;
	/* background:#F5F6FF; */
	font-size:20px;
	border:1px solid #955FEA;
	border-radius:2px;
	text-align:center;
	line-height:44px;
	letter-spacing: 5px;
	cursor:pointer;
	position:absolute;
	z-index:2;
}
.loginBtnBg{
	position: absolute;
    width: 262px;
    height: 44px;
    left: 30px;
    bottom: -75px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F5F6FF;
    overflow: hidden;
    z-index:1;
}
.loginBtnBg>div.active{
	border-radius:50%;
	width:0px;
	height:0px;
	background:#5B62F9;
	animation:enlarge .3s linear forwards; 
}
@keyframes enlarge{
	from{
		width:70px;
		height:70px;
	}to{
		width:300px;
		height:300px;
	}
}
.login-main-left .squareBig{
	position: absolute;
    left: 395px;
    top: 138px;
}
.login_crul{
	width: 122px;
    height: 67px;
    position: absolute;
   /*  bottom: 326px;
    left: 545px; */
    left:0;
    bottom:0;
    transform: rotate(-31deg);
}
.login_crul_container{
	position: absolute;
    width: 122px;
    height: 67px;
    bottom: 326px;
    left: 545px;
}
.login_crul>div{
	height: 67px;
    background: url(img/login_/111111111111111111.png)no-repeat 0 0;
    animation:crul-enlarge .5s linear forwards; 
}
@keyframes crul-enlarge{
	from{
		width:0px;
	}to{
		width:122px;
	}
}
.login_progress{
	position: absolute;
    width: 228px;
    height: 8px;
    background: #D1DCFF;
    top: 135px;
    left: 366px;
    transform: rotate(-30deg);
}
.login_progress:after{
	content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 41%;
    height: 9px;
    background: #5B62F9;
}
.login_progress span{
	position: absolute;
    top: -23px;
    color: #5A5FEB;
}
.orange{
	position: absolute;
    top: 268px;
    left: 709px;
}
.orange-logo{
	position: absolute;
    top: 307px;
    left: 785px;
}
.blue{
	position: absolute;
    top: 320px;
    left: 339px;
}
.blue-logo{
	position: absolute;
    top: 370px;
    left: 435px;
}
.login-border-bottom{
	position: absolute;
    right: 44px;
    bottom: 156px;
    width: 162px;
    height: 271px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
}
.login-border-bottom div{
	height: 272px;
    background:url(img/login_/login-border-bottom.png) no-repeat right bottom;
    animation:border-bottom-enlarge .5s linear forwards; 
}
@keyframes border-bottom-enlarge{
	from{
		width:0px;
	}to{
		width:162px;
	}
}
.login-border-top{
	position: absolute;
    left: 298px;
    top: 86px;
    width: 92px;
    height: 190px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
}
.login-border-top div{
	height: 190px;
    background:url(img/login_/login-border-top.png) no-repeat left top;
    animation:border-top-enlarge .5s linear forwards; 
}
@keyframes border-top-enlarge{
	from{
		width:0px;
	}to{
		width:92px;
	}
}
.login-footer{
	text-align:center;
	position:absolute;
	bottom:30px;
	left:0;
	width:100%;
}
.login-footer span{
	font-size:14px;
	color:#5c5a66;
}
.login-footer span:nth-child(1){
	margin-right:50px;
}

     /***  end  ***/
</style>



<div id="login_container">
<!-- start -->
	<header class="login-header">
		<div class="login_shadowbox"></div>
		<div class="login_logo">
			<p></p>
			<p></p>
		</div>
	</header>
	<div class="login-main">
		<div class="login-main-left">
			<div>
				<div class="squareBig-container">
					<img class="squareBig" src="img/login_/squareBig.png"/>
				</div>
				<div class="login_crul_container">
					<div class="login_crul">
						<div></div>
					</div>
				</div>
				<div class="login_progress-container">
					<div class="login_progress">
						<span>完成进度  41 % </span>
					</div>
				</div>
				<img class="orange" src="img/login_/orange.png"/>
				<img class="orange-logo" src="img/login_/orange-logo.png"/>
				<img class="blue" src="img/login_/blue.png"/>
				<img class="blue-logo" src="img/login_/blue-logo.png"/>
				<div class="login-border-bottom">
					<div></div>
				</div>
				<div class="login-border-top">
					<div></div>
				</div>
			</div>
		</div>
		<div class="login-main-right">
			<div class="shadow-bg animated bounceInRight">
				<div class="login_main_content">
					<p class="login_form_title">
						系统登录
					</p>
					<form>
						<input placeholder="请输入用户名" type="text" />
						<input placeholder="请输入密码" type="text" />
						<br />
						<p class="radio">
							<span></span> <span>记住密码?</span>
						</p>
						<div id="loginBtn">
							登录
						</div>
						<div class="loginBtnBg">
							<div></div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<footer class="login-footer">
		<span>赞同科技版权所有</span>
		<span>ICP许可证  : 粤ICP备10010688</span>
	</footer>
<!-- end -->
</div>

