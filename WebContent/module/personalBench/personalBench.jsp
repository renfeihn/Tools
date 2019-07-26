<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
.personalBench-userInfo .userHead {
	width: 52px;
	height: 52px;
	border-radius: 50%;
	margin-right: 16px;
}
.personalBench-userInfo .userName>span {
	display: inline-block;
}
.personalBench-userInfo .userName {
	display: inline-block;
    vertical-align: middle;
}
.personalBench-userInfo>div>div>span:first-child {
	font-size: 12px;
	color: #5e6d80;
}
.personalBench-userInfo>div>div>span:last-child {
	font-size: 26px;
	font-weight: bold;
	line-height: 34px;
	height: 34px;
}
.personalBench-userInfo>div>div>span {
	display: block;
	text-align: center;
}
.personalBench-userInfo>div>div {
	margin: 0 40px;
	cursor: pointer;
}
.personalBench-userInfo>div {
	position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    height: 93px;
}
.personalBench-userInfo {
	padding: 0 35px;
    display: flex;
    vertical-align: middle;
    height: 93px;
    font-weight: normal;
    background-color: #fff;
    align-items: center;
}
.personalBench-content {
	/*background-color: #ebf0f5;*/
	padding: 20px;
	/*box-sizing: border-box;*/
	/*position: absolute;*/
	/*top: 93px;*/
	/*width: 100%;*/
	/*bottom: 0;*/
}
.personalBench-section>.section-title {
	color: #212933;
	font-size: 16px;
	padding-bottom: 14px;
	border-bottom: 1px solid #e6eef5;
	margin-bottom: 20px;
}
.personalBench-section {
	padding: 16px 20px;
	background-color: #fff;
	border-radius: 4px;
	overflow: hidden;
	box-sizing: border-box;
}
/*标签页*/
.nav.nav-tabs.nav-underLine.nav-personalBench>li.active>a:after {
	content: none;
}
.nav.nav-tabs.nav-underLine.nav-personalBench>li>a {
	line-height: 20px;
	height: auto;
	box-sizing: border-box;
	padding: 0 0 13px 0;
	font-size: 16px;
	margin: 0 30px 0 0;
	font-weight: normal;
	color: #303741;
}
.nav.nav-tabs.nav-underLine.nav-personalBench {
	border-color: #e6eef5;
}
.nav.nav-tabs.nav-underLine.nav-personalBench>li.active>a, .nav.nav-tabs.nav-underLine.nav-personalBench>li.active>a:HOVER {
	border-color: #55a8fd;
	color: #60aefd;
}
/*标签页*/
.checkSearch-item {
	height: 35px;
	background: url(img/personalBench/search.png) no-repeat 2px top;
	padding-left: 30px;
	width: 380px;
	box-sizing: border-box;
}
.checkSearch-item:last-child {
	height: auto;
}
.checkSearch-item .search-link {
	float: right;
	line-height: 16px;
	font-size: 12px;
	color: #738091;
}
.checkSearch-item .item-name {
	display: inline-block;
	width: 320px;
	overflow-x: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	line-height: 16px;
	font-size: 14px;
	color: #212933;
}
.no-default-css {
	-webkit-appearance: none;
	appearance: none;
}
.personalBench-searchBtn {
	position: absolute;
    right: 1px;
    border-left: 1px solid #c7c6cc;
    background-color: #f9f9fb;
    color: #ccc;
    text-align: center;
    width: 23px;
    height: 22px;
    top: 1px;
    cursor: pointer;
    line-height: 22px;
}
.echarts-block .echarts-dom {
	border: 1px solid #b8bbcc;
	margin-left: 100px;
	height: 73px;
}
.echarts-block .big-number {
	font-size: 26px;
    line-height: 32px;
    margin-bottom: 8px;
}
.echarts-block .sys-name{
	font-size: 16px;
	line-height: 20px;
	margin-bottom: 14px;
}
.echarts-block {
	font-weight: normal;
}
@media screen and (max-width: 1680px) {
	.echarts-block:nth-child(3n) {
		margin-right: 0; 
	}
	.echarts-block {
		width: calc((100% - 40px) / 3);
		margin: 10px 20px 0px 0;
		height: 136px;
		background-color: #f5f9fc;
		border-radius: 4px;
		padding: 10px 10px 0;
		box-sizing: border-box;
	}
	.index-instance-item:nth-child(2n) {
		margin-right: 0; 
	}
	.index-instance-item {
		width: calc((100% - 20px) / 2);
		margin: 20px 20px 0px 0;
		height: 226px;
		background-color: #f5f9fc;
	}
}
@media screen and (min-width: 1681px) {
	.echarts-block:nth-child(4n) {
		margin-right: 0; 
	}
	.echarts-block {
		width: calc((100% - 60px) / 4);
		margin: 10px 20px 0px 0;
		height: 136px;
		background-color: #f5f9fc;
		border-radius: 4px;
		padding: 10px 10px 0;
		box-sizing: border-box;
	}
	.index-instance-item:nth-child(3n) {
		margin-right: 0; 
	}
	.index-instance-item {
		width: calc((100% - 40px) / 3);
		margin: 20px 20px 0px 0;
		height: 226px;
		background-color: #f5f9fc;
	}
}

.carousel-inner.personalBench-carousel-inner>.item {
	height: 310px;
}
.carousel-indicators.personalBench-carousel-indicators {
	left: 50%;
    right: auto;
    transform: translateX(-50%);
    bottom: 0;
    top: auto;
}
.carousel-indicators.personalBench-carousel-indicators .active {
	background-color: #55a8fd;
}
.carousel-indicators.personalBench-carousel-indicators li {
	width: 24px;
	height: 4px;
	background-color: #b8bbcc;
	margin: 0 5px;
	text-indent: 0;
	border-radius: 0;
}
.personalBench-carousel-control.carousel-control.right {
	right: -10px;
	left: auto;
}
.personalBench-carousel-control.carousel-control {
	width: 22px;
    height: 65px;
    line-height: 52px;
    font-size: 50px;
    border-radius: 0;
    opacity: 0.3;
    left: -10px;
    box-sizing: border-box;
    top: 54%;
    transform: translateY(-50%);
    border: none;
}
.personalBench-carousel-control.carousel-control:hover{
	opacity: 0.6;
}
.personalBench-section #checkSearchList {
	overflow-y: hidden;
}
.personalBench-section #checkSearchList:hover {
	overflow-y: auto;
}
.personalBench-section .events-statistical img {
	float: left;
	margin-right: 14px;
}
.personalBench-section .events-statistical {
	height: 48px;
	flex: 1;
	margin-bottom: 20px;
	cursor: pointer;
}
.personalBench-section .events-statistical>div:nth-child(2) {
	font-size: 14px;
	color: #666;
	margin-bottom: 4px;
}
.personalBench-section .events-statistical>div:last-child {
	font-size: 24px;
	color: #212933;
}
.personalBench-section .events-item {
	padding: 14px 0;
	border-top: 1px solid #e6eef5;
	cursor: pointer;
}
.personalBench-section [data-status="普通"]:before {
	background-color: #4de0db;
}
.personalBench-section [data-status="紧急"]:before {
	background-color: #fba463;
}
.personalBench-section [data-status="严重"]:before {
	background-color: #55a8fd;
}
.personalBench-section .events-item-title:before {
	content: attr(data-status);
	color: #fff;
	border-radius: 2px;
	line-height: 16px;
	height: 16px;
	display: inline-block;
	width: 30px;
	text-align: center;
	margin-right: 5px;
	font-size: 12px;
	font-weight: normal;
}
.personalBench-section .events-item-title+span {
	color: #5e6d80;
	font-size: 12px;
	font-weight: normal;
}
.personalBench-section .events-item-body {
	color: #434d59;
	line-height: 16px;
	font-weight: normal;
	font-size: 12px;
}

.index-instance-item{
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
}
.index-instance-item-header{
    height: 20px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.index-instance-item-header .item-title{
    font-size: 16px;
    font-weight: bold;
    display:inline-block;
}
.index-charts-item{
    flex: 1;
    height: calc(100% - 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.index-instance-item-header a{
    font-size: 16px;
    text-decoration: none;
    color:#9B9DBA;
    margin: 0 2px;
}
.index-instance-item-footer .resize-arrow{
    position: absolute;
    right:5px;
    bottom: 5px;
    display: inline-block;
    width: 10px;
    height: 10px;
    clip-path: polygon(10px 0, 0 10px, 10px 10px);
    background-color: #CACAD2;
    cursor: nw-resize;
}
.index-instance-item i.fa-reply{
  	opacity:0;
    float: right;
    cursor: pointer;
}
.index-instance-item:hover i.fa-reply{
   opacity:1;
}
</style>
<div class="personalBench-userInfo">
	<img class="userHead" src="img/personalBench/user.jpg">
	<span class="userName">
		<span style="font-weight: bold;font-size: 16px;" id="name"></span>
		<br>
		<span style="color: #5e6d80;">上次登录时间：<span id="lastLoginTime"></span></span>
	</span>
	<div>
		<div data-href="appConfigerView" data-title="配置总览">
			<span>设备数量</span>
			<span id="ipNum">-</span>
		</div>
		<div data-href="appConfigerView" data-title="配置总览">
			<span>日志源数量</span>
			<span id="runSource" style="color: #00be00">-/-</span>
		</div>
		<div data-href="logCollectTrafficMonitor" data-title="采集流量监控">
			<span>已采集数据量</span>
			<span id="logDataToTalSize">-<span style="font-size: 12px;">GB</span></span>
		</div>
		<div data-href="logCollectTrafficMonitor" data-title="采集流量监控">
			<span>当前采集速度</span>
			<span style="color: #ffc000;" id="currentLogDataIps">-</span>
		</div>
	</div>
</div>
<div class="personalBench-content">
	<!-- 右侧布局容器 -->
	<div style="width: 430px;float: right;">
		<section class="personalBench-section" style="height: 358px;">
			<div class="section-title">快速检索</div>
			<div id="checkSearchList" style="height: 270px;">
				<!-- <div class="checkSearch-item">
					<span class="item-name">密钥管理系统/第三方支付系统/信用卡系统</span>
					<a href="javascript:void(0);" class="delete-link">删除</a>
				</div>
				<div class="checkSearch-item">
					<span class="item-name">密钥管理系统/第三方支付系统/信用卡系统</span>
					<a href="javascript:void(0);" class="delete-link">删除</a>
				</div>
				<div class="checkSearch-item">
					<span class="item-name">密钥管理系统/第三方支付系统/信用卡系统</span>
					<a href="javascript:void(0);" class="delete-link">删除</a>
				</div> -->
			</div>
		</section>

		<section class="personalBench-section" style="margin-top: 20px;">
			<div class="section-title">事件列表</div>
			<div style="display: flex">
				<div class="events-statistical" data-href="eventMonitor" data-title="预警事件统计">
					<img src="img/personalBench/eventLevel2.png" alt="严重">
					<div>严重</div>
					<div id="dayAlarmUnclosed">-</div>
				</div>
				<div class="events-statistical" data-href="eventMonitor" data-title="预警事件统计">
					<img src="img/personalBench/eventLevel3.png" alt="紧急">
					<div>紧急</div>
					<div id="urgencyHand">-</div>
				</div>
				<div class="events-statistical" data-href="eventMonitor" data-title="预警事件统计">
					<img src="img/personalBench/eventLevel1.png" alt="普通">
					<div>普通</div>
					<div id="dayWaringUnclosed">-</div>
				</div>
			</div>
			<div id="eventCtn" style="height: calc(740px - 88px);overflow-y: auto;">
				<!-- <div class="events-item">
					<div>
						<span data-status="紧急" class="events-item-title">TXQ357-08</span>
						<span class="pull-right">2018-08-04 14:50:37</span>
					</div>
					<div class="events-item-body">
						SQL Server事件通知有什么用呢？如果你想监控SQL Server的DDL操作，你可以通过DDL触发器。
					</div>
				</div>
				<div class="events-item">
					<div>
						<span data-status="普通" class="events-item-title">TXQ357-08</span>
						<span class="pull-right">2018-08-04 14:50:37</span>
					</div>
					<div class="events-item-body">
						SQL Server事件通知有什么用呢？如果你想监控SQL Server的DDL操作，你可以通过DDL触发器。
					</div>
				</div>
				<div class="events-item">
					<div>
						<span data-status="严重" class="events-item-title">TXQ357-08</span>
						<span class="pull-right">2018-08-04 14:50:37</span>
					</div>
					<div class="events-item-body">
						SQL Server事件通知有什么用呢？如果你想监控SQL Server的DDL操作，你可以通过DDL触发器。
					</div>
				</div> -->
			</div>
		</section>
	</div>
	<!-- 右侧布局容器 -->
		
	<!-- 左侧布局容器 -->
	<div style="margin-right: 450px;">
		<section class="personalBench-section" style="height: 358px;">
			<div class="section-title" style="display: flex;justify-content: space-between;margin-bottom: 0;">
				采集监控TOP统计
				<div style="display: flex;position: relative;width: calc(100% - 150px);">
					<!-- <input type="text" name=""  style="width: 300px;font-size: 12px;text-align: center;"> -->
					<!-- <select name="" id="" class="no-default-css" style="width: 20%;border-radius: 2px 0 0 2px;border-right: none;margin: 0px;">
						<option value="15">15分钟内</option>
					</select>
					<div style="position: relative;flex: auto;">
						<input type="text" name="" value="" placeholder="Exception" style="width: 100%;border-radius: 0 2px 2px 0;margin: 0px;">
						<i class="fa fa-search personalBench-searchBtn"></i>
					</div> -->
					<div style="display: flex;width: 100px;justify-content: space-between;">
						<label class="radio" for="equipRadio">
							<input type="radio" name="type" id="equipRadio" value="1" checked="checked">
							主机
						</label>
						<label class="radio" for="hardRadio">
							<input type="radio" name="type" id="hardRadio" value="2">
							应用
						</label>
					</div>
					<div style="display: flex;width: 150px;justify-content: space-between;margin-left: 50px">
						<label class="radio" for="datasize">
							<input type="radio" name="orderField" id="datasize" value="datasize" checked="checked">采集流量
						</label>
						<label class="radio" for="dataips">
							<input type="radio" name="orderField" id="dataips" value="dataips">
							采集速率
						</label>
					</div>
					<span id="carouselSize" style="position: absolute;right: 100px;color: #5c6594">-</span>
					<span id="more" style="position: absolute;right: 20px;color: #5c6594;cursor: pointer;" title="查看更多">更多>></span>
				</div>
			</div>
			<div style="display: flex;flex-wrap: wrap;" id="carouselCtn"></div>
		</section>

		<section class="personalBench-section" style="margin-top: 20px;">
			<ul class="nav nav-tabs nav-underLine nav-personalBench">
				<li class="active"><a href="#tabs1" data-toggle="tab">仪表盘图表</a></li>
				<li><a href="#tabs2" data-toggle="tab">仪表盘列表</a></li>
			</ul>
			<div class="tab-content">
				<div id="tabs1" class="tab-pane active">
					<div class="index-content-main" style="display: flex;flex-wrap: wrap;overflow-y:auto;height: 740px;align-content: flex-start;">
					   <%-- <div class="index-instance-item">
					        <div class="index-instance-item-header">
					            <p class="item-title">未命名数据图表</p>
					            <div class="edit-group">
					                <a href="javascript:void(0)">
					                    <i class="fa fa-edit"></i>
					                </a>
					                <a href="javascript:void(0)">
					                    <i class="fa fa-trash"></i>
					                </a>
					                <a href="javascript:void(0)">
					                    <i class="fa fa-expand"></i>
					                </a>
					                <a href="javascript:void(0)" class="download">
					                    <i class="fa fa-download"></i>
					                </a>
					            </div>
					        </div>
					        <div class="charts-item" id="charts-instance"></div>
					        <div class="index-instance-item-footer">
					           <span class="resize-arrow"></span>
					        </div>
					    </div>--%>
					</div>
				</div>
				<div id="tabs2" class="tab-pane">
					<table id="searchTable" class="display dataTable table" style="table-layout: fixed;    margin-top: 20px;">
						<thead>
							<tr>
								<th>序号</th>
								<th>名称</th>
								<th>说明</th>
								<th>组建个数</th>
								<th>是否是首页</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</div>
		</section>
	</div>
	<!-- 左侧布局容器 -->
</div>


<script type="text/template" id="dashBoradItem">
    {{#each this}}
    <div class="index-instance-item" boardId="{{this.relation.boardId}}">
        <div class="index-instance-item-header">
            <p class="item-title">{{this.title}}</p>
            <i class="fa fa-reply"></i>
        </div>
        <div class="index-charts-item">
        	<i class="fa fa-spin fa-spinner"></i>
		</div>
    </div>
    {{/each}}
</script>




























