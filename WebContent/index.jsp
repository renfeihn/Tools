<!DOCTYPE html>
<%@ page isErrorPage="true" language="java" import="java.util.*"
	pageEncoding="UTF-8"%>
<%@ page import="cn.com.agree.aweb.Constants"%>
<%@ page session="false"%>
<%
//	HttpSession session = request.getSession(false);
	//获取权限信息集合
//	Object accessList = session
//			.getAttribute(Constants.SESSION_USER_ACCESS_LIST_MENU);
%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta name="msapplication-tap-highlight" content="no"/>
    <meta content="minimal-ui" name="viewport"/>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            name="viewport"/>
    <meta content="yes" name="apple-mobile-web-app-capable"/>
    <title>日志分析平台</title>
    <style id="#bgStyle"></style>
    <link href="img/bank/jxyh_favicon.ico" rel="shortcut icon" type="image/x-icon">
    <!-- <link href="img/favicon.ico" rel="shortcut icon" type="image/x-icon"> -->
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap-responsive.min.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap-switch.css"/>
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
    <link rel="stylesheet" type="text/css" href="./css/jquery.jOrgChart.css"/>
    <link rel="stylesheet" type="text/css" href="./css/jquery-ui.css"/> 
    <link rel="stylesheet" type="text/css" href="./css/tinyselect.css"/> 
    <link rel="stylesheet" type="text/css" href="./css/multi-select.css"/>
    <link rel="stylesheet" type="text/css" href="css/zTreeStyle/zTreeStyle.css">
    <link rel="stylesheet" type="text/css" href="css/base.css"/>
    <link rel="stylesheet" type="text/css" href="css/common.css"/>
    <link rel="stylesheet" type="text/css" href="css/log-main.css"/>
	<link rel="stylesheet" type="text/css" href="css/keyPanel.css"/>
	<link rel="stylesheet" type="text/css" href="css/search.css"/>
	<link rel="stylesheet" type="text/css" href="css/fineDegree.css"/> 
	<link rel="stylesheet" type="text/css" href="css/kpiChangeBtn.css"/>
	<link rel="stylesheet" type="text/css" href="css/eventDetails.css"/>
	<link rel="stylesheet" type="text/css" href="css/nodata.css"/>
	<link rel="stylesheet" type="text/css" href="css/modal.css"/>
	<link rel="stylesheet" type="text/css" href="css/advise.css"/>
	<link rel="stylesheet" type="text/css" href="css/select2.css"/>
	<link rel="stylesheet" type="text/css" href="css/multipleSelect/multiple-select.css"/>
	<link rel="stylesheet" type="text/css" href="css/selectChoose.css"/>
	<link rel="stylesheet" type="text/css" href="css/eventInfo.css"/>
	<link rel="stylesheet" type="text/css" href="css/card.css"/>
	<link rel="stylesheet" type="text/css" href="css/treeTableStyle/jquery.treetable.css" />
	<link rel="stylesheet" type="text/css" href="css/treeTableStyle/jquery.treetable.theme.default.css" />
	<link rel="stylesheet" type="text/css" href="css/treeTableStyle/screen.css" />
	<link rel="stylesheet" type="text/css" href="css/animate.min.css"/>
	<link rel="stylesheet" type="text/css" href="css/diffview.css"/>
	<link rel="stylesheet" type="text/css" href="css/appOnOff.css"/>
	<link rel="stylesheet" type="text/css" href="css/globalCSS.css"/>
	<link rel="stylesheet" type="text/css" href="css/kpiLable.css"/>
	<link rel="stylesheet" type="text/css" href="css/operation.css"/>
	<link rel="stylesheet" type="text/css" href="css/clockpicker.css">
	<link rel="stylesheet" type="text/css" href="css/jquery.orgchart.css">
	<link rel="stylesheet" type="text/css" href="script/lib/codemirror/lib/codemirror.css">
	<link rel="stylesheet" type="text/css" href="script/lib/codemirror/addon/hint/show-hint.css">
	<link rel="stylesheet" type="text/css" href="css/appConfigCommon.css">
	<link rel="stylesheet" type="text/css" href="css/daterangepicker.css">
	<link rel="stylesheet" type="text/css" href="css/vis.css">
	<link rel="stylesheet" type="text/css" href="css/variable.css">
	<link rel="stylesheet" type="text/css" href="script/spa/dataBorad/gridstack/gridstack.min.css">
	<link rel="stylesheet" type="text/css" href="css/pagination.css">
	<script type="text/javascript" src="script/lib/polyfill.js"></script>
<style type="text/css">
/*
.body-autoHeight * {
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
}
*/
@import 'css/dashboard/jquery.gridster.css';
@import 'css/dashboard/dashboard.css';
.coverGuide {
	display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 0 solid #000;
    opacity: 0.7;
    z-index: 2000;
    font-size: 24px;
    color: #FFF;
    transition: all 0.7s;
}
.coverGuide:BEFORE {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 400px solid #000;
    position: absolute;
    left: -400px;
    top: -400px;
    box-shadow: inset 0 0 40px 1px rgba(0,0,0,.75);
}

/* banner按钮样式Start */
.aweb-navibar-logo {
	background: url(img/bank/agree-logo.png) no-repeat;
    width: 300px;
    height: 70px;
    float: left;
    margin-right: 12px;
    margin-left: 16px;
    margin-top: 14px;	
}

.aweb-navibar-menu {
	height: 69px;
	float: right;
	margin: 0;
}
.aweb-navibar-alert-num {
	position: absolute;
    background: red;
    color: #FFF;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    text-align: center;
    line-height: 12px;
    font-weight: bold;
    margin-top: 16px;
    margin-left: 20px;
    display: none;
}
.aweb-navibar-menu > li > a {
    border: none;
    float: none;
    height: 24px;
    display: block;
    /*margin: 20px 0 0 0;*/
    margin: 15px 0 0 0;
}

.aweb-navibar-menu > li {
    width: 40px;
    height: 100%;
    float: left;
}

#awebNavibarConfig {
    margin: 18px 0 18px -18px;
    background: url(img/banner/icon_normal_Setting.png) no-repeat;
}

#awebNavibarSystem {
    margin: 18px 0 18px -27px;
    background: url(img/banner/icon_normal_help.png) no-repeat;
}

#showWangingBtn {
    background: url(img/menu/event.png) center no-repeat;
}

.aweb-navibar-personal {
	/*background: url(img/menu/userInfo.png) center 20px no-repeat;*/
	background: url(img/menu/userInfo.png) center 15px no-repeat;
}

a#awebNavibarSystem:hover {
	background: url(img/banner/icon_Press_Help.png) no-repeat;
}

a#awebNavibarConfig:hover {
	background: url(img/banner/icon_Press_Setting.png) no-repeat;
}

a#showWangingBtn:hover {
	background: url(img/menu/event-hover.png) center no-repeat;
}

a#showSearchBtn:hover {
	background: url(img/banner/icon_Press_search.png) no-repeat;
}

li.aweb-navibar-personal > a:hover {
	background: url(img/menu/userInfo-hover.png) center no-repeat;
}
/* banner按钮样式End */



/* 临时菜单图标End */
#seachMenu::-webkit-input-placeholder{
	color:#fff;
}

/* 预警样式  开始*/
#globalAlertEvent span.event-type {
	display: inline-block;
	border-radius: 10px;
	width: 50px;
	height: 20px;
	color: #FFF;
	text-align: center;
}
#globalAlertEvent span.event-type.notice:BEFORE {
	content:'通知';
}
#globalAlertEvent span.event-type.warning:BEFORE {
	content:'预警';
}
#globalAlertEvent span.event-type.error:BEFORE {
	content:'告警';
}
#globalAlertEvent span.event-type.notice {
	background: #5B62F9;
}
#globalAlertEvent span.event-type.warning{
	background: #fb8229;
}
#globalAlertEvent span.event-type.error{
	background: #FF3341;
}

/* 预警样式  结束*/
/* 文件下载 */
.upload-file-container {
	height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #FFF;
    border-top: 1px solid #B6B4B6;
    box-sizing: border-box;
    z-index: 10000;
    display: grid;
    grid-template-columns: 91% 9%;
    top: 100vh;
    transition: all .3s linear;
}
.upload-file-container.active{
	top: calc(100vh - 50px);
}
.upload-file-content{
	display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
}
.upload-file-round {
	position: absolute;
    height: 100%;
    width: 20px;
    text-align: center;
    line-height: 49px;
    box-shadow: rgb(204, 204, 204) 4px 4px 8px;
    color: #888;
    font-size: 16px;
    background: rgba(255,255,255,1);
   	cursor: pointer;
   	user-select: none;
   	z-index: 10;
}
.upload-file-container-1{
	position: absolute;
    height: 100%;
    transition: all .3s linear;
}
.upload-file-round.upload-file-left{
	left: 0;
}
.upload-file-round.upload-file-right{
	right: 170px;
}
.upload-file-list{
	height: 100%;
    width: 231px;
    background-image: linear-gradient(to bottom, #CED0D1 0%, #CED0D1 100%);
    background-size: 1px 40px;
    background-position: right 5px;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
}
.upload-file-list.fail {
	background-color: #FBA463;
    color: #FFF;
}
.upload-file-list.succ {
	background-color: #4DE0DB;
    color: #FFF;
}
.upload-file-list. {
	background-color: red;
    color: #FFF;
}
.upload-file-list:HOVER{
	background-color: #EDEDEE;
}
.file-name{
	width: 44%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.file-zip{
	width: 16px;
    height: 16px;
    margin-right: 10px;
    background: url('img/zip.png') no-repeat;
    border-radius: 2px;
}
.file-process{
	width: 18%;
    text-align: right;
}
.upload-close{
	display: flex;
    align-items: center;
    background: #FFF;
    z-index: 10;
    justify-content: center;
}
.upload-close>button{
	height: 27px;
    background: #FFF;
    margin: 0 10px;
}
/* 文件下载 结束  */
</style>
    <!--[if lt IE 10]>
    <link rel="stylesheet" type="text/css" href="css/compatibleIE.css"/>
    <![endif]-->
</head>
<body class="body-autoHeight lock-Menu">
	<%--左侧边栏 Start--%>
	<div data-role="leftAside" id="leftAside" class="aside aside-left">
		<!-- logo -->
		<div class="bank-logo-content" style="cursor: pointer;">
			<!-- <img src="img/bank/logo-dgns.png" > -->
			<div></div>
		</div>
		<!-- logo -->
		
		<!-- 创建工单 -->
		<%--<button type="button" class="index-add-flow-btn"><i class="fa fa-search"></i>&nbsp;日志搜索</button>--%>
		<!-- 创建工单 -->

		<!-- 主菜单按钮 -->
		<ul class="menu-firstLevel" id="bannerMenu">


			<li title="个人中心" data-id="104"><a class="menu" style="background-image:url(img//menu//menu6-check.png)"></a><span>个人中心</span>
				<ul class="menu-secondLevel">
					<li data-id="1"><a data-href="install#serverConfig">服务器配置</a></li>
					<li data-id="2"><a data-href="install#javaConfig">java配置</a></li>
					<li data-id="3"><a data-href="#">Zookeeper配置</a></li>
					<li data-id="4"><a data-href="#">storm配置</a></li>
					<li data-id="5"><a data-href="#">mysql配置</a></li>
					<li data-id="6"><a data-href="#">es配置</a></li>
					<li data-id="7"><a data-href="#">kafka配置</a></li>
					<li data-id="8"><a data-href="#">hbase配置</a></li>
					<li data-id="26354636"><a data-href="toolset">工具集</a></li>
				</ul></li>

		</ul>

		<!-- 锁定宽度 -->
		<div class="text-center lock-width">
            <li class="aweb-navibar-personal dropdown" >
            	<a data-toggle="dropdown" class="fa fa-reorder"  title="用户管理" style="color: #fff !important;text-decoration: none !important;"></a>
                <ul class="dropdown-menu"
					style="top: -70px;left: 0px;min-width: 100px;">
					<!-- <li><a id="username" style="cursor: default;"><i
							class="fa fa-home"></i>&nbsp;&nbsp;</a></li>
					<li><a id="userInfo"><i
                            class="fa fa-newspaper-o"></i>&nbsp;基本信息</a></li> -->
					<li><a id="usersafebtn" href="javascript:">&nbsp;<i
							class="fa fa-unlock-alt"></i>&nbsp;&nbsp;修改密码
					</a></li>
					<li><a id="signOut" href="javascript:" title="退出登录">&nbsp;<i
							class="fa fa-sign-out"></i>&nbsp;退出登录
					</a></li>
				</ul>
			</li>
			<li class="aweb-navibar-alert"><label class="aweb-navibar-alert-num"></label><i id="showWangingBtn" href="javascript:" class="fa fa-bell" title="最新消息 [快捷键Shift+Enter]"></i></li><!-- 
			<i id="showWangingBtn" class="fa fa-bell" title="最新消息 [快捷键Shift+Enter]"></i> -->
			<i class="fa fa-lock" title="锁定宽度"></i>
		</div>
	</div>
	<%--左侧边栏 End--%>
	<%--右侧边栏 Start--%>
	<div data-role="rightAside" id="rightAside" class="aside-right collapsed">
		<div class="page-header">
			<h2>
				<span id="rightAsideTitle">创建实例</span> <a id="rightAsideCloseBtn"
					title="关闭" class="close">&times;</a>
			</h2>
		</div>
		<form class="form-horizontal"></form>
	</div>
	<%--右侧边栏 End--%>

	<%--导航栏 End--%>
	<!-- 个人信息 Start -->
	<div id="userInfoTemp" class="modal fade hide" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-header">
			<button type="button" class="close hide" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<h3>基本信息</h3>
		</div>
		<div class="modal-body">
		</div>
	</div>
	<!-- 个人信息 End -->
	<!-- 修改密码 Temp Start -->
	<div id="upPasswordTemp" class="modal fade hide" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-header">
			<button type="button" class="close hide" data-dismiss="modal"
				aria-hidden="true">&times;</button>
			<h3>修改密码</h3>
		</div>
		<div class="modal-body">
			<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label" for="user_old_password">旧密码：</label>
					<div class="controls">
						<input id="user_old_password" name="password" type="password"
							placeholder="旧密码" class="span8"> <span
							id="user_oldpasswordTips" class="help-inline hide"></span>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="user_password">新密码：</label>
					<div class="controls">
						<input id="user_password" name="password" type="password"
							placeholder="新密码" class="span8"> <span
							id="user_passwordTips" class="help-inline hide"></span>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label" for="user_repassword">重复新密码：</label>

					<div class="controls">
						<input id="user_repassword" name="repassword" type="password"
							placeholder="重复新密码" class="span8"> <span
							id="user_repasswordTips" class="help-inline hide"></span>
					</div>
				</div>
			</form>
		</div>
		<div class="modal-footer">
			<a id="upPasswordbtn" href="javascript:"
				class="btn btn-inverse hvr-radial-out">修改</a> <a
				id="resetPasswordbtn" href="javascript:" class="btn hvr-radial-out">清空</a>
		</div>
	</div>
	<!--修改密码 Temp End-->
	<%--消息弹出 Start--%>
	<ul id="alertList" data-role="alertList" class="alert-list unstyled"></ul>
	<%--消息弹出 End--%>
	<%--内容 Start--%>
	<div data-role="container" class="content-container">
		<%--选项卡 Start--%>
            <%--右键按钮 Start--%>
            <ul id="tabsContextMenu" class="tab-content-menu hide"></ul>
            <%--右键按钮 End--%>
		<div id="tabsContainer" class="tabs-container">
			<div class="tabs-left-group">
				<button id="tabsLeft" type="button" title="左移标签" class="btn tabs-left "></button>
			</div>
			<ul id="tabs" data-role="tab" class="nav nav-tabs tabs">
			</ul>
			<div class="tabs-right-group">
				<button id="tabsRight" type="button" title="右移标签" class="btn tabs-right "></button>
				<button id="tabsFull" type="button" title="全屏" data-retract-title="还原" data-full-title="全屏" class="btn tabs-full">
				</button>
			</div>
		</div>
		<%--选项卡 End--%>
		<%--显示内容 Start--%>
		<div id="awebPageFrame" class="main" data-role="content"></div>
		<%--显示内容 End--%>
	</div>
	<%--内容 End--%>

	<%--遮罩 Start--%>
	<div id="mask" class="mask" style="z-index: 4"></div>
	<%--遮罩 End--%>
	<%--模板 Start--%>
	<%--标签tab模板、信息alert模板 Start--%>
	<ul id="tabsTemp" class="hide">
		<li class="active" data-tab-id="{tabId}" data-href="{href}"
			<%--data-index="{index}" --%>title="{title}"><a>{title}</a>
			<button type="button" class="close"></button></li>
		<li class="alert-showType">
			<div class="alert-container">
				<%--<h4>{title}</h4>--%>
				<div class="alert-content" title="{content}">{content}</div>
			</div>
			<button type="button" class="close alert-close">&times;</button>
		</li>
		<li title="{msg}">
			<h4>
				{title}<small class="pull-right">{time}</small>
			</h4>
			<div>{msg}</div>
			<button type="button" class="close">×</button>
		</li>
	</ul>
	<%--标签tab模板、信息alert模板 End--%>
	<%--模板 End--%>
		
	<%--搜索框模板Start --%>
	<div class="sea-main hide" id="seaMainCtn">
		<div class="sea-main-title">
			<span class="sea-title-font">搜索</span>
			<!-- <span class="sea-title-close" id="seaCloseBtn"><img src="./img/search/icon_normal_delete_shijianliebiao.png"></span> -->
		</div>
		<div class="sea-main-body">
			<div class="sea-body-sea">
				<div class="sea-body-app">
					<span class="sea-body-sea-font">系统名称：</span>
					<input type="text" class="sea-body-sea-input" id="seaAppName">
					<i  class="fa fa-times-circle awebClearCtnBtn"></i>
				</div>
				<div class="sea-body-ser">
					<span class="sea-body-sea-font">设备名/IP：</span>
					<input type="text" class="sea-body-sea-input" id="seaSeverName">
					<i class="fa fa-times-circle awebClearCtnBtn"></i>
				</div>
				 
				<div class="sea-body-db">
					<span class="sea-body-sea-font">数据库名称/管理IP：</span>
					<input type="text" class="sea-body-sea-input" id="seaDbName">
					<i  class="fa fa-times-circle awebClearCtnBtn"></i>
				</div>
				<div class="sea-body-mid">
					<span class="sea-body-sea-font">中间件名称/管理IP：</span>
					<input type="text" class="sea-body-sea-input" id="seaMidName">
					<i class="fa fa-times-circle awebClearCtnBtn"></i>
				</div>
				
				<a title="搜索" id="seaModalBtn"></a>
				<a title="重置" class="fa fa-refresh" id="clearModalBtn"></a>
			</div>
			<div class="sea-body-show" id = "seaBodyShowCtn"></div>
			<div class="sea-main-sum">
				总数：<span id="seaMainNum">0</span>
			</div>
		</div>
	</div>
	<div class = "hide">
		<div class="sea-body-model" id = "seaBodyModel"></div>
		<div class="sea-model-obj" id = "seaModelObj"></div>
		
		<!-- 搜索obj模型Start -->
		<div class="sea-body-obj" id="seaBodyObj">
			<div class="sea-body-obj-title">
				<div class="sea-body-obj-title-logo">
				</div>
				<div class="sea-body-obj-title-txt">
				<p class="selectableText"></p>
				</div>
			</div>
			<div class="sea-body-obj-all">
				<div class="sea-body-obj-ctn">
					<div class="sea-body-obj-ctn-server">
						<div class="sea-body-obj-ctn-title">所属服务器：</div>
						<div class="sea-body-obj-ctn-txt selectableText" data-role="seaBodyObjCtnServerTxt"></div>
					</div>
					<div  class="sea-body-obj-ctn-app">
						<div class="sea-body-obj-ctn-title">所属应用：</div>
						<div class="sea-body-obj-ctn-txt selectableText" data-role="seaBodyObjCtnAppTxt"></div>
					</div>
				</div>
				<div class="sea-body-obj-foot">
					<span class="fa fa-angle-down"></span>
				</div>
			</div>
		</div>
		<!-- 搜索obj模型End -->
	</div>
	<%--搜索框模板End --%>

	<div class="coverGuide"></div>
	<!--事件詳情模板Start -->
	<div id="awebEventDetails"></div>
	<div id="awebEventDetailsModule"></div>
	<!--事件詳情模板End -->
	
	<%--引入脚本 Start--%>
	<script type="text/javascript" src="script/lib/browser.min.js"></script>
	<script type="text/javascript" src="script/lib/require.js" data-main="bootloader"></script>
	<%--引入脚本 End--%>
	<%--登出跳转到登陆页面 Start--%>
	<form id="redirectForm" action="LoginAction_redirect.do" method="POST"></form>
	<%--登出跳转到登陆页面 End--%>

	<a id="configUpdateA"></a>
</body>
</html>
