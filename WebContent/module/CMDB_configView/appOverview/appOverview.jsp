<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.appoverview-content {
	height: 100%;
	padding: 10px;
	box-sizing: border-box;
}
.appoverview-content>.layout:nth-child(1) {
	display: flex;
	margin-bottom: 20px;
	height: 260px;
}
.appoverview-content>.layout:nth-child(2) {
	display: flex;
	height: calc(100% - 280px);
}
.appoverview-content>.layout>section {
	margin-right: 20px;
	height: 100%;
}
@media screen and (max-width: 1366px) {
	.appoverview-content>.layout:nth-child(1)>section {
		width: 220px !important;
	}
	.appoverview-content>.layout:nth-child(1)>section>.content {
		padding: 10px !important;
	}
	.appoverview-content>.layout>section{
		margin-right: 10px !important;
	}
}
.appoverview-content>.layout:nth-child(1)>section {
	flex: none;
	width: 300px;
}
.appoverview-content>.layout:nth-child(1)>section:nth-child(4) {
	flex: auto;
	margin-right: 0;
}
.appoverview-content>.layout:nth-child(2)>section {
	flex: 1;
}
.appoverview-content>.layout:nth-child(2)>section:nth-child(1) {
	margin-right: 20px;
}
.appoverview-content>.layout>section>.content {
	height: calc(100% - 80px);
}
.appoverview-content .info-wrap {
	height: 100%;
	display: flex;
	flex-wrap: wrap;
}
.appoverview-content .info-wrap>span {
	width: calc(50% - 10px);
    height: calc(50% - 10px);
    text-align: center;
    background: #F7F7FA;
    line-height: 30px;
    font-size: 28px;
    font-weight: 900;
    border-radius: 4px;
}
.appoverview-content .info-wrap>span:before {
    content: attr(data-title);
    display: block;
    margin-top: 10px;
    font-size: 14px;
    color: #6f7982;
    font-weight: normal;
}
.appoverview-content .info-wrap>span.orange {
	background: #ffb84e;
}
.appoverview-content .info-wrap>span.blue {
	background: #5b62f9;
}
.appoverview-content .info-wrap>span.red {
	background: #fb3728;
}
.appoverview-content .info-wrap>span.special,
.appoverview-content .info-wrap>span.special:before {
	color: #fff;
}
.appoverview-content .info-wrap>span:nth-child(2n) {
	margin-left: 20px;
}
.appoverview-content .info-wrap>span:nth-child(n+3) {
	margin-top: 20px;
}
.appoverview-content .options {
	float: right;
	margin-right: -20px;
}
.appoverview-content .options>span {
    display: inline-block;
    width: 40px;
    text-align: center;
    font-size: 18px;
    color: #9ba8b3;
    box-sizing: border-box;
    cursor: pointer;
}
.appoverview-content .options>span.active {
    background: #eaf1f7;
    color: #2196F3;
}
.appoverview-content .echarts-wrap {
	width: 100%;
	height: 100%;
}
#data_echarts_wrap .tab-content {
	height: calc(100% - 40px);
}
#data_echarts_wrap .tab-content>div {
	height: calc(100% - 20px);
}
.noPadding {
	padding: 10px!important;
}
.appoverview-content span[data-field="max_time"] {
    font-size: 12px;
    white-space: nowrap;	
}
.appoverview-content .dataTable {
	width: 100%;
	height: 100%;
}
.appoverview-content #data_echarts_wrap{
	position: relative;
}
.appoverview-content .router-config{
	position: absolute;
    line-height: 40px;
    padding: 0 10px;
    right: 0;
    font-size: 12px;
}
.appoverview-content .router-config>.current-name{
	color: #5b62f9;
    font-size: 14px;
}
.appoverview-content .router-config>.old-name{
	color: #929099;
}
.appoverview-content .router-config>span{
	cursor: pointer;
}
.appoverview-content .router-config>span:HOVER{
	text-decoration: underline;
}
.statistic-wrap {
    float: right;
    margin: 8px 10px 0 0;	
}
.shuliangtongji {
	color: #808080;
	font-size: 12px;
}
.shuliangtongji>span>span {
	color: #333;
}
</style>

<div class="appoverview-content">
	<div class="layout">
		<section class="panel resource">
			<p class="title">资源统计</p>
			<div class="content">
				<div class="info-wrap">  <!-- 完整度颜色根据百分比变 -->
					<span class="special blue" data-title="应用资产数" data-field="appcount">0</span>
					<span data-title="已投产" data-field="commcount">0</span>
					<span data-title="数据完整度" data-field="">0%</span>
					<span data-title="自发现占比" data-field="">0%</span>
				</div>
			</div>
		</section>
		<section class="panel selffind">
			<p class="title">自发现统计
				<span class="options">
					<span class="active" data-role="text"><i class="fa fa-th-large"></i></span><span data-role="pie"><i class="fa fa-pie-chart"></i></span>
				</span>
			</p>
			<div class="content">
				<div class="info-wrap">
					<span class="special orange" data-title="待审计" data-color="orange" data-field="wait_num">0</span>
					<span class="special blue" data-title="审计中" data-color="blue" data-field="review_num">0</span>
					<span data-title="已确认" data-field="end_num">0</span>
					<span data-title="最后确认日期" data-field="max_time">0</span>
				</div>
				<div class="echarts-wrap hide" id="selffind_echarts"></div>
			</div>
		</section>
		<section class="panel events">
			<p class="title">事件统计</p>
			<div class="content">
				<div class="info-wrap">
					<span class="special orange" data-title="待受理" data-color="orange" data-field="wait_event">0</span>
					<span class="special blue" data-title="受理中" data-color="blue" data-field="undo_event">0</span>
					<span class="special red" data-title="长时间未解除" data-color="red" data-field="longtime_event">0</span>
					<span data-title="已解除" data-field="closed_event">0</span>
				</div>
			</div>
		</section>
		<section class="panel"  id="data_echarts_wrap">
			<div class="router-config" id="routerConfig">
				<span class="current-name">应用</span>
			</div>
			<ul class="nav nav-tabs nav-public">
				<li class="active"><a href="#tabs1" data-toggle="tab">数据完整度</a></li>
				<li><a href="#tabs2" data-toggle="tab">数据更新趋势</a></li>
			</ul>
			<div class="tab-content">
				<div id="tabs1" class="tab-pane active noPadding">
					<div class="echarts-wrap" id="data_complete_echarts"></div>
				</div>
				<div id="tabs2" class="tab-pane noPadding">
					<div class="echarts-wrap" id="data_trend_echarts"></div>
				</div>
			</div>
		</section>
	</div>
	<div class="layout">
		<section class="panel"  id="manage_page">
			<ul class="nav nav-tabs nav-public">
				<li class="active"><a href="#table_selffind" data-toggle="tab">日志源管理</a></li>
				<li><a href="#table_event" data-toggle="tab">代理管理</a></li>
				<span class="statistic-wrap">
					<div class="shuliangtongji datasource-st">
						<span style="margin-right: 20px;">日志源总数：<span id="logSourceTotalNum">-</span></span>
						<span style="margin-right: 20px;">运行中：<span id="runningNumber">-</span></span>
						<span style="margin-right: 20px;">已暂停：<span id="stopNumbber">-</span></span>
					</div>
					<div class="shuliangtongji agent-st hide">
						<span style="margin-right: 20px;">代理总数：<span id="agent_total">-</span></span>
						<span style="margin-right: 20px;">已启动：<span id="agent_running">-</span></span>
						<span style="margin-right: 20px;">未启动：<span id="agent_stopped">-</span></span>
						<span style="margin-right: 20px;">挂起：<span id="agent_paused">-</span></span>
					</div>
				</span>
			</ul>
			<div class="tab-content" style="height: calc(100% - 39px);">
				<div id="source_page" class="tab-pane active">
					
				</div>
				<div id="agent_page" class="tab-pane">
					
				</div>
			</div>
		</section>
	</div>
</div>