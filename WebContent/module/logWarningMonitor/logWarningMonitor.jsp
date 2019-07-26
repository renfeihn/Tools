<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.logWarningMonitor-total{
	width: 240px;
	height: 100%;
	flex: none;
	padding: 20px;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    border: 1px solid #ebebed;
}
.logWarningMonitor-total>span{
	display: inline-block;
	height: calc((100% - 10px)/2);
	text-align: center;
	font-size: 16px;
	padding: 15px 10px;
	box-sizing: border-box;
	background-color: #5b62f9;
	color: #FFF;
	width: 100%;
	margin-bottom: 10px;
}
.logWarningMonitor-total>span:nth-child(2),
.logWarningMonitor-total>span:nth-child(3){
	width: calc((100% - 10px)/2);
	margin-bottom: 0;
	margin-right: 10px;
	background-color: #f1f0f5;
	color: #5b5a65;
}
.logWarningMonitor-total>span:nth-child(3){
	margin-right: 0;
}
.logWarningMonitor-total>span:BEFORE{
	content: attr(beforeContent);
	font-size: 14px;
	display: block;
	margin-bottom: 5px;
}

.logWarningMonitor-total>span:AFTER{
	content: attr(afterContent);
}
.logWarningMonitor-totalEcharts{
	height: 100%;
	flex: auto;
	box-sizing: border-box;
	border: 1px solid #ebebed;
	margin-left: 20px;
}
.logWarningMonitor-totalEcharts .span-eWarning-time{
	width: 100%;
    height: 10%;
    margin-top: -57px;
    margin-left: -260px;
    position: absolute;
}
.logWarningMonitor-totalEcharts .span-eWarning-time>span{
	height: 100%;
    width: 50px;
    padding: 6px;
    float: right;
    line-height: 18px;
    text-align: center;
    background: #eee;
    cursor: pointer;
    margin-right: 2px;
    border-radius: 4px;
}
.logWarningMonitor-totalEcharts .span-eWarning-time>span.active{
	border: 1px solid #fff;
	background: #5b62f9;
    color: #FFF;
}

.logWarningMonitor-tableEcharts{
	height: 70px;
	width: 100%;
}

/****************************分割线******************************/
.logWarningMonitor-warningRole{
	font-size: 12px;
	border-top: 1px solid #e2e1e6;
	border-bottom: 1px solid #e2e1e6;
}

.logWarningMonitor-warningRole ul{
	margin: 0;
}
.logWarningMonitor-warningRole ul li>span{
	display: inline-block;
	padding: 0 10px;
	box-sizing: border-box;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.logWarningMonitor-warningRole ul li>span:nth-child(1){
	width: 80px;
}

.logWarningMonitor-warningRole ul li>span:nth-child(2){
	width: 180px;
}
.logWarningMonitor-warningRole ul li>span:nth-child(3){
	width: 100px;
}
.logWarningMonitor-warningRole ul li>span:nth-child(4){
	width: 120px;
}

.logWarningMonitor-warningHeader{
	height: 34px;
	line-height: 34px;
	background-color: #fafafc;
	border-bottom: 1px solid #e2e1e6;
	font-weight: bold;
}
.logWarningMonitor-noData{
	height: 34px;
	line-height: 34px;
	text-align: center;
	display: none;
}
.logWarningMonitor-warningRoleContent{
	display: flex;
}
.logWarningMonitor-warningRoleContent ul li:nth-child(2n){
	background-color: #fafafc;
}
.logWarningMonitor-warningRoleContent ul li{
	height: 70px;
	line-height: 70px;
}
</style>

<section class="panel" style="margin: 0;">
	<p class="title">预警监控</p>
	<div class="content">
		<div style="display: flex; margin-bottom: 20px;height: 200px;position: relative;">
			<div class="logWarningMonitor-total">
				<span id="warningCountTotal" beforeContent="预警总量">-</span>
				<span id="warnRoleCount" beforeContent="预警规则数">-</span>
				<span id="touchRoleCount" beforeContent="触发规则数">-</span>
			</div>
			<div class="logWarningMonitor-totalEcharts">
				<div class="span-eWarning-time">
					<span data-interval="24">24小时</span>
					<span data-interval="12">12小时</span>
					<span data-interval="6">6小时</span>
					<span data-interval="2">2小时</span>
					<span data-interval="1">1小时</span>
				</div>
				<div id="eWarning" style="width: 100%;height: 100%;"></div>
			</div>
		</div>
		<!-- <section class="panel">
			<p class="title">预警规则</p>
			<div class="content">
				<table id="warningTable" class="display dataTable table" style="table-layout: fixed;">
					<thead>
						<tr>
							<th style="width: 80px;">序号</th>
							<th style="width: 200px;">预警名称</th>
							<th>预警指标趋势</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</section> -->
		<section class="panel">
			<p class="title">预警规则</p>
			<div class="content">
				<div class="logWarningMonitor-warningRole">
					<div style="display: flex;">
						<ul>
							<li class="logWarningMonitor-warningHeader"><span>序号</span><span>预警名称</span><span>累计发生次数</span><span>当前事件发生次数</span></li>
						</ul>
						<div style="flex: auto">
							<div class="logWarningMonitor-warningHeader" style="padding: 0 10px;">预警指标趋势</div>
						</div>
					</div>
					<div class="logWarningMonitor-warningRoleContent">
						<ul id="roleList" style="flex: none;">
							<!-- <li><span>1</span><span>3</span><span>4</span><span>7</span></li>
							<li><span>2</span><span>3</span><span>4</span><span>7</span></li>
							<li><span>3</span><span>3</span><span>4</span><span>7</span></li> -->
						</ul>
						<div style="flex: auto">
							<div id="eRoleEcharts" style="padding: 0 10px;width: 100%;height: 100%;box-sizing: border-box;"></div>
						</div>
					</div>
					<div class="logWarningMonitor-noData">无数据</div>
				</div>
			</div>
		</section>
	</div>
</section>
