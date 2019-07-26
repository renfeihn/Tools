<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
/* 在模块的页面中，通过style标签定义样式，应该在所起的class命名中加上模块前缀 */
.appConfiger-layout {
    display: flex;
    height: calc(100vh - 42px);
    background: #f1f0f5;
    transition: all 0.3s;
}
.appConfiger-layout>div {
	background: #FFF;
}
.appConfigView-popover{
	margin: 0;
}
.appConfigView-popover>li{
	height: 25px;
    line-height: 25px;
    cursor: pointer;
    font-size: 12px;
}
.appConfigView-popover>li:hover{
	color: var(--color-theme);
    text-decoration: underline;
}
.appConfiger-tree {
	width: 220px;
	flex: none;
	box-sizing: border-box;
	padding: 10px;
}
.appConfiger-tree>.title{
	margin: 0;
	position:relative;
	height: 30px;
	line-height: 30px;
    font-weight: bolder;
    margin-bottom: 5px;
}
.appConfiger-tree>.title>.search-query{
	width: 80px;
	position: absolute;
	top: 3px;
	right: 0;
	background-color: #fff;
	transition: all .5s;
}
.appConfiger-tree>.title>.search-query:focus{
	width: 200px;
	transition: all .5s;
}
.appConfiger-tree>.title>.pull-right{
	position: absolute;
	background: transparent;
    width: 24px;
    height: 24px;
    top: 3px;
    right: 0;
    cursor: pointer;
}
.appConfiger-configer {
	flex: auto;
	margin: 10px 0 10px 10px;
	padding: 20px 0;
	overflow-y: auto;
}
.appConfiger-appInfo {
	width: 230px;
	flex: none;
	margin: 10px 10px 10px 0;
	padding: 10px;
	box-sizing: border-box;
}
#sliderBlock {
	width: 10px;
	background: #f1f0f5;
	margin: 10px 0;
    cursor: w-resize;
    flex: none;
}
ul.appConfiger-appList {
    padding: 0 10px;
    margin: 0;
    height: 250px;
    overflow: auto;
}
ul.appConfiger-appList>li{
	border:1px solid transparent;
	cursor:pointer;
}
ul.appConfiger-appList>li:hover{
	border:1px solid #E1E0E4;
}
ul.appConfiger-appList:AFTER {
	content:'';
	clear: both;
	display: block;
}
.appConfiger-appGreen,
.appConfiger-appYellow,
.appConfiger-appRed {
	margin: 0 10px 20px 10px;
	width: 100px;
	height: 100px;
	background: #fafafc;
	border-radius: 4px;
	float: left;
	overflow: hidden;
	position: relative;
	cursor: pointer;
	font-size: 12px;
}
.appConfiger-appGreen.checked,
.appConfiger-appYellow.checked,
.appConfiger-appRed.checked{
	cursor: default;
	border:1px solid var(--color-theme) !important; 
}
#appCtn li.checked{
	border:0 !important;
}
div.appConfiger-appGreen,
div.appConfiger-appYellow,
div.appConfiger-appRed {
	margin: 0;
}
.appConfiger-appYellow>span {
    background: #ffd642;
    position: absolute;
    transform: rotate(45deg);
    width: 65px;
    height: 65px;
    top: -33px;
    left: -33px;
}
.appConfiger-appRed>span {
	position: absolute;
    background: #ff3341;
    transform: rotate(45deg);
    width: 65px;
    height: 65px;
    top: -33px;
    left: -33px;
}
.appConfiger-appGreen>span {
    position: absolute;
    background: #22ac38;
    transform: rotate(45deg);
    width: 65px;
    height: 65px;
    top: -33px;
    left: -33px;
}
.appConfiger-appGreen>p,
.appConfiger-appYellow>p,
.appConfiger-appRed>p {
    position: absolute;
    bottom: 10px;
    width: calc(100% - 20px);
    margin: 0 10px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
    line-height: 15px;
}
.appConfiger-appGreen>span>i,
.appConfiger-appYellow>span>i,
.appConfiger-appRed>span>i {
    position: absolute;
    right: 3px;
    color: #FFF;
    font-style: normal;
    transform: rotate(-45deg);
    top: 25px;
}
.appConfiger-configer-top {
	overflow: hidden;
}
.appConfiger-configer-bottom {
    height: calc(100% - 200px);
}
.appConfigerView-appSearch {
	background: transparent;
    width: 24px;
    height: 24px;
    position: relative;
    right: -160px;
    cursor: pointer;
}
.appCount_{
	position: absolute;
    right: 200px;
    top: 3px;
}
.appCount_:before{
	content:"共";
	margin-right:2px;
}
.appCount_:after{
	content:"个";
	margin-left:2px;
}
/*功能ul*/
.no-paddingLR {
	padding: 10px !important;
}
.appConfiger-configer-bottom span.fa{
	color: var(--color-theme);
	margin: 0 5px;
	cursor: pointer;
}
.appConfiger-configer-bottom span.fa:hover{
	text-decoration: underline;
}
.appConfiger-configer-bottom .addtableRowBtn{
	padding: 2px 10px;
    background-color: #FFF;
    border: 1px solid var(--color-theme);
    color: var(--color-theme);
    cursor: pointer;
    border-radius: 2px;
    /* position: absolute; */
    z-index: 2;
    margin-left: 10px;
    font-size: 12px;
    font-weight: normal;
}
.appConfiger-configer-bottom .addtableRowBtn:hover{
	background-color: var(--color-theme);
	color: #fff;
}
/*功能ul*/

.appConfiger-appInfo section+section{
	margin-top: 10px;
	font-weight: normal;
}
.appConfiger-appInfo div.content{
	padding: 10px !important;
}
.appConfiger-appInfo div.content span{
	display: block;
    width: 100%;
    height: 60px;
    text-align: center;
    font-size: 20px;
    background: #f1f0f5;
    font-weight: bold;
    box-sizing: border-box;
    border-radius: 2px;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.appConfiger-appInfo div.content>span.flex{
	display: flex;
	background-color: #fff;
}
.appConfiger-appInfo div.content>span+span{
	margin-top: 10px;
}
.appConfiger-appInfo div.content span:before{
	content: attr(beforeContent);
	display: block;
	padding-top: 5px;
	font-size: 14px;
	font-weight: normal;
	color: #5b5a66;
}
.appConfiger-appInfo div.content span.blue{
	background-color: var(--color-theme);
	color: #fff;
}
.appConfiger-appInfo div.content span.yellow{
	background-color: #f5c000;
	color: #fff;
}
.appConfiger-appInfo div.content span.blue:before,
.appConfiger-appInfo div.content span.yellow:before{
	color: #fff;
}

.appConfiger-appInfo div.content>span>span{
	flex: 1;
}
.appConfiger-appInfo div.content>span>span+span{
	margin-left: 10px;
}

/*日志信息修改*/
.logInfoSlider,
.agentInfoSlider{
	width: 1000px;
    height: calc(100vh - 42px);
    position: fixed;
    top: 40px;
    right: 0;
    box-shadow: -1px 1px 5px rgba(0, 0, 0, .5);
    /* transform: translateX(1020px); */
    right: -100%;
    transition: all .5s;
    background-color: #fff;
    z-index: 2;
}
.agentInfoSlider .title{
	background: #fafafc;
	border-bottom: 1px solid #ebebed;
	height: 39px;
	line-height: 40px;
	font-size: 14px;
	padding: 0 20px;
	margin: 0;
}
.logInfoSlider .close,
.agentInfoSlider .title .close{
    color: #000;
    font-size: 30px !important;
    font-weight: 100;
    float: right;
    margin-top: 7px;
}

.logInfoSlider .close{
	margin-right: 20px;
}

.logInfoSlider.active,
.agentInfoSlider.active{
	/* transform: translateX(-1px); */
	right: 0;
	transition: all .5s;
}

/*代理信息修改*/
.appConfigerView-agentForm .control-label{
	width: 7em;
}
.appConfigerView-agentForm .controls>select,
.appConfigerView-agentForm .controls>input,
.appConfigerView-agentForm .controls>textarea {
	width: 100%;
}
.appConfigerView-agentForm div.col-3{
	flex: none;
	width: calc(100% / 2);
}
.appConfigerView-formBtns{
	text-align: right;
	text-align: right;
    margin-right: 40px;
    padding-top: 10px;
}
</style>

<section class="panel" style="margin: 0;">
	<p id="title" class="title" style="display: none;">应用配置总览</p>
	<div class="content" style="padding: 0;">
		<div class="appConfiger-layout">
			<div class="appConfiger-tree">
				<p class="title">全部对象（<span id="allCategory">1000</span>）
					<input id="categorySearch" type="text" class="search-query" placeholder="搜索" /><span class="categorySearchBtn pull-right"></span>
				</p>
				<ul id="app_tree" class="ztree" style="border: 1px solid #f1f0f5;"></ul>
			</div>
			<div class="appConfiger-configer">
				<div class="appConfiger-configer-top">
					<p style="position:relative;margin-bottom: 20px;padding: 0 20px;"><span id="appTitle">PC服务器</span><span class="appCount_">-</span>
						<input id="appSearch" type="text" class="search-query" style="float: right;" /><span class="appConfigerView-appSearch pull-right"></span>
					</p>
					<ul id="appConfigInfo" class="appConfiger-appList">
						<!-- <li class="appConfiger-appGreen"><span><i>100</i></span><p>系统管理应用</p></li>-->
					</ul>
				</div>
				<div class="appConfiger-configer-bottom">
					<ul class="nav nav-tabs nav-underLine" style="cursor: n-resize;" id="resizeHeight">
						<li class="active"><a href="#tabs1" data-toggle="tab">日志源信息</a></li>
						<!-- <li><a href="#tabs2" data-toggle="tab">代理信息</a></li> -->
					</ul>
					<div class="tab-content" style="height: calc(100% - 20px);overflow: visible;position: relative;">
						<div id="tabs1" class="tab-pane no-paddingLR active">
							<div style ="position: absolute;  z-index: 2;">
							<span id="addLogInfo" class="addtableRowBtn">新增</span>
							<span id="refresh" class="addtableRowBtn">刷新</span>
							<span id="stopAll" class="addtableRowBtn">暂停</span>
							<span id="startAll" class="addtableRowBtn">启动</span>
							</div>
							<table id="logInfoTable" class="display dataTable table" style="table-layout: fixed;">
								<thead>
									<tr>
										<th style="width: 60px;">序号</th>
										<th>日志描述</th>
										<th>应用系统</th>
										<th>资产分类</th>
										<th>日志来源</th>
										<!-- <th style="width:90px;">解析规则</th> -->
										<th>IP</th>
										<!-- <th style="width:90px;">已采集日志量(MB)</th> -->
										<th style="width:100px;">采集状态</th>
										<th style="width:100px;">操作</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<!-- <div id="tabs2" class="tab-pane no-paddingLR">
							<span id="addAgentInfo" class="addtableRowBtn">+ 新增</span>
							<table id="agentTable" class="display dataTable table" style="table-layout: fixed;">
								<thead>
									<tr>
										<th style="width: 60px;">序号</th>
										<th width="120%">主机名</th>
										<th width="120%">操作系统</th>
										<th width="120%">IP</th>
										<th width="120%">代理状态</th>
										<th width="120%">代理安装用户</th>
										<th style="width: 110px;">操作</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div> -->
					</div>
				</div>
			</div>
			<div id="sliderBlock"></div>
			<div class="appConfiger-appInfo hide">
				<p>统计信息</p>
				<section class="panel">
					<p class="title">配置对象统计</p>
					<div class="content">
						<span beforeContent="配置对象总数">0</span>
						<span class="flex"><span beforeContent="已接入日志" class="blue">0</span><span beforeContent="未接入日志">0</span></span>
					</div>
				</section>
				<section class="panel">
					<p class="title">配置采集统计</p>
					<div class="content">
						<span beforeContent="未启动采集">3</span>
						<span beforeContent="已启动采集" class="blue">6</span>
					</div>
				</section>
				<section class="panel">
					<p class="title">代理信息统计</p>
					<div class="content">
						<span beforeContent="代理安装总数">4</span>
						<span class="flex">
							<span beforeContent="运行中" class="blue">1</span><span beforeContent="未运行">3</span>
						</span>
					</div>
				</section>
			</div>
		</div>
	</div>
</section>
<div id="logInfoSlider" class="logInfoSlider">
	<ul class="nav nav-tabs nav-public">
		<li class="active"><a href="#logInfoSliderContent" data-toggle="tab">日志源配置</a></li>
		<li><a href="#selfField" data-toggle="tab">私有化字段</a></li>
		<li><a href="#dataOutputContent" data-toggle="tab">数据输出</a></li>
		<li><a href="#uploadContent" data-toggle="tab">手工上传</a></li>
		<!-- <li><a href="#clearConfigContent" data-toggle="tab">清理备份</a></li> -->
		<span class="close">x</span>
	</ul>
	<div class="tab-content" style="padding: 20px;height: calc(100% - 80px);">
		<div id="logInfoSliderContent" class="tab-pane active"></div>
		<div id="selfField" class="tab-pane"></div>
		<div id="dataOutputContent" class="tab-pane"></div>
		<div id="uploadContent" class="tab-pane"></div>
		<!-- <div id="clearConfigContent" class="tab-pane"></div> -->
	</div>
</div>

<div id="agentInfoSlider" class="agentInfoSlider">
	<div class="title"><span id="agentInfoSliderTitle"></span><span class="close">x</span></div>
	<div id="agentInfoSliderContent" style="padding: 20px;">
		<form class="form-horizontal appConfigerView-agentForm">
			<div class="control-group">
				<label for="searchName" class="control-label required">IP</label>
				<div class="controls">
					<input type="text" required id="ip" name="ip" placeholder="输入IP地址" />
				</div>
			</div>
			<div class="control-group">
				<label for="" class="control-label required">主机名</label>
				<div class="controls">
					<input type="text" required name="host_name" id="host_name" readonly="readonly" placeholder="根据ip回显"/>
				</div>
			</div>
			<div class="control-group">
				<label for="os_type" class="control-label required">操作系统</label>
				<div class="controls">
					<input type="text" required  name="os_type" id="os_type" readonly="readonly" placeholder="根据ip回显"/>
				</div>
			</div>
			<div class="control-group" >
				<label for="install_user" class="control-label required">代理安装用户</label>
				<div class="controls">
					<input type="text" required  name="install_user" id="install_user"/>
				</div>
			</div>
			<div class="control-group" >
				<label for="agent_user_pwd" class="control-label required">用户密码</label>
				<div class="controls">
					<input type="text" required  name="agent_user_pwd" id="agent_user_pwd" autocomplete="off"/>
				</div>
			</div>
			<div class="control-group" >
				<label for="protocol" class="control-label required">协议</label>
				<div class="controls">
					<select class="agm-protocol" name="protocol" id="protocol">
						<option value="ssh">ssh</option>
						<option value="telnet">telnet</option>
					</select>
				</div>
			</div>
			<div class="control-group">
				<label for="port" class="control-label required">端口</label>
				<div class="controls">
					<input type="text" name="port" id="port" required readonly="readonly"/>
				</div>
			</div>
		</form>
		<div class="appConfigerView-formBtns">
			<button id="cancelBtn" type="button" class="cancelBtn">取消</button>
			<button id="confirmBtn" type="button" class="confirmBtn">保存</button>
		</div>
	</div>
</div>
