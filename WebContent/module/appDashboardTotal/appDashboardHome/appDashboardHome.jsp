<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.appoverview-page>.layout {
	display: flex;
	margin-bottom: 20px;
}
.appoverview-page>.layout:last-child {
	margin-bottom: 0;
}
.appoverview-page>.layout>section,
.appoverview-page>.layout>div,
.appoverview-page>.layout>div>section {
	margin: 0 20px 0 0;
	flex: 1;
    height: 310px;
}
.appoverview-page>.layout>div {
	display: flex;
}
.appoverview-page>.layout .content {
	height: calc(100% - 80px);
}
.appoverview-page .panel .tab-content {
	height: calc(100% - 39px);
    overflow: hidden;
    position: relative;
}
.appoverview-page .panel .tab-content>div {
	height: calc(100% - 40px);
}
.kpi-content {
	display: flex;
	flex-wrap: wrap;
	height: 100%;
}
.kpi-content>span {
	width: calc(50% - 10px);
    height: calc(50% - 10px);
    text-align: center;
    line-height: 28px;
    font-size: 18px;
    background: var(--color-gray);
    border-radius: 3px;
}
.kpi-content>span:before {
    content: attr(data-title);
    display: block;
    margin-top: 24px;
    font-size: 14px;
    color: #5d627d;
}
.kpi-content>span:nth-child(2n+1) {
	margin-right: 20px;
}
.kpi-content>span:nth-child(n+3) {
	margin-top: 20px;
}
.appoverview-page>.layout>section .content>div,
.appoverview-page .app-echarts {
	flex: auto;
	height: 100%;
} 
.appoverview-page>.layout>section:last-child,
.appoverview-page>.layout>div>section:last-child {
	margin-right: 0;
}
.appoverview-page>.layout>section.app-base-info,
.appoverview-page>.layout>section.kpi-wrap {
	flex: none;
	width: 420px;
}
.appoverview-page .info-content {
	display: flex;
	height: 100%;
}
.trade-nav .tab-content>.tab-pane {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1;
    background: #fff;
}
.trade-nav .tab-content>.tab-pane.active {
	display: block;
	position: absolute;
	z-index: 2;
}
.appoverview-page .app-name-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px;
    margin: 0 0 10px 0;
    padding: 0px 6px 0 0;
    background: var(--color-gray);
    font-weight: 600;
    font-size: 24px;
    color: #5d627d;
    line-height: 28px;
}
.appoverview-page .app-name-wrap>.app-name {
	min-width: 100px;
}
.appoverview-page .echarts-wrap {
    height: calc(100% - 46px);
    border: solid 1px rgba(184, 187, 204, 0.32);
    border-top: none;
    box-sizing: border-box;
}
.info-echarts-wrap {
	flex: auto;
}
.trade-content {
	position: relative;
}
.trade-content>div {
	flex: none!important;
    height: calc(100% - 40px)!important;
	position: absolute;
	top: 20px;
	left: 20px;
	right: 20px;
	bottom: 20px;
	background: #fff;
	z-index: 1;
}
.trade-content>div.show {
	z-index: 2;
}
.trade-content  table {
	table-layout: fixed!important;
}
.trade-content  table tr>th:nth-child(n+3),
.trade-content  table tr>td:nth-child(n+3) {
	text-align: right;
}
.trade-content  table tr>th:nth-child(2) {
	width: 40%;
}
.trade-content  table i.red {
	font-style: normal;
	color: red;
}
.info-box {
    flex: none;
    width: 140px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
}
.info-box>* {
    background: var(--color-gray);
    color: #2b2933;
    flex: 1;
    border-radius: 3px;
    text-align: center;
    line-height: 26px;
    font-size: 20px;
}
.info-box>p {
    display: flex;
    margin: 10px 0;
    background-image: linear-gradient(to bottom,#ccc,#ccc);
    background-repeat: no-repeat;
    background-size: 1px 60%;
    background-position: 50% 50%;
}
.info-box>p>span {
	flex: 1;
}
.appoverview-page span.theme-color {
	background: var(--color-theme);
    color: #fff;
}
.info-box>span:nth-child(2) {
	margin: 10px 0;
}
.event-info-box>span:first-child {
	margin-bottom: 0;
}
.event-info-box span {
	line-height: 22px;
}
.event-info-box span[data-role]:before {
	margin-top: 14px!important;
}
.appoverview-page span[data-role]:before {
    content: attr(data-role);
    display: block;
    font-size: 12px;
    margin-top: 8px;
    color: #5c5a66;
}
.appoverview-page span.theme-color:before {
	color: #fff;
}
.appoverview-page .collect-info {
    display: flex;
    margin: 0;
    background: var(--color-theme);
    color: #fff;
    background-image: linear-gradient(to bottom,#ccc,#ccc);
    background-repeat: no-repeat;
    background-size: 1px 60%;
    background-position: 50% 50%;
    border-radius: 3px;
}
.appoverview-page .collect-info>span {
    flex: 1;
    height: 60px;
    line-height: 22px;
    text-align: center;
    border-radius: 2px;
    font-size: 16px;
}
.appoverview-page .collect-info>span:first-child {
	margin-right: 10px;
}
.appoverview-page .collect-info>span:before {
    display: block;
    margin: 7px 0 0 0;
    font-size: 12px;
    color: #fff;
}
.appoverview-page .addone {
    border: solid 1px #eee;
    border-radius: 4px;
    box-sizing: border-box;
    text-align: center;
    line-height: 300px;
    font-size: 60px;
    color: #babbc3;
    cursor: pointer;
}
.appoverview-page .addone:hover {
    color: #5b62f9;
    background: #f1f0f5;
}
.appoverview-page .gridster {
	height: 100%;
}
.appoverview-page .gridster ul {
	margin: 0 !important;
}
.appoverview-page .gridster ul .panel{
	height: 100%;
}
.appoverview-page .xy-echarts{
	height: 100%;
}

.app-info {
    height: 100%;
    font-size: 0;
}
.app-info>span {
    display: inline-block;
    width: calc((100% - 10px)/2);
    height: calc((100% - 10px)/2);
    background: #f1f0f5;
    text-align: center;
    font-size: 28px;
    line-height: 30px;
    border-radius: 3px;
    color: #2b2933;
}
.app-info>span:nth-child(2n) {
	margin-left: 10px;
}
.app-info>span:nth-child(n+3) {
	margin-top: 10px;
}
.app-info>span:before {
    content: attr(data-title);
    display: block;
    font-size: 12px;
    margin-top: 22px;
    color: #5a5c66;
}
.title-operate {
	float: right;
    display: flex;
    margin: 0 -20px 0 0;
}
.title-operate>span {
	width: 40px;
    height: 39px;
    text-align: center;
    border-left: solid 1px #ebebed;
    cursor: pointer;
}
.title-operate>span[data-type="table"]{
	background-image: url(img/appDashboard/th-gray.png);
	background-repeat: no-repeat;
	background-position: center center;
}
.title-operate>span[data-type="chart"]{
	background: url(img/appDashboard/k-gray.png);
	background-repeat: no-repeat;
	background-position: center center;
}
.title-operate>span[data-type="table"]:hover,
.title-operate>span[data-type="table"].active {
	background-color: #f7f7f7;
	background-image: url(img/appDashboard/th-active.png);
}
.title-operate>span[data-type="chart"]:hover,
.title-operate>span[data-type="chart"].active {
	background-color: #f7f7f7;
	background-image: url(img/appDashboard/k-active.png);
}
.btn-detail {
    float: right;
    display: inline-block;
    height: 100%;
    line-height: 39px;
    margin-right: 20px;
    color: #5b62f9;
    cursor: pointer;
}
.compare-count .up,
.compare-count .down,
.compare-time .up,
.compare-time .down {
    display: inline-block;
    width: 14px;
    height: 22px;
    vertical-align: -3px;
    background-image: url(img/appDashboard/up.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
}
.compare-count .down,
.compare-time .down  {
	background-image: url(img/appDashboard/down.png);
}
.data-total {
	display: block;
	height: 72px;
}
.top-charts {
	width: 100%;
	height: 100%;
}
.time-circle {
	float: right;
    margin: 10px 20px 0 0;
}
.time-circle>span {
    padding: 0 10px 0 10px;
    border: 1px solid #c7c6cc;
    background-color: #f9f9fb;
    color: #5c5a66;
    height: 24px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
}
.time-circle>span.active {
    border: 1px solid var(--color-theme);
    background-color: var(--color-theme);
    color: #FFF;
}
.appoverview-page .slide-modal {
    position: fixed;
    top: 40px;
    right: 0;
    bottom: 0;
    width: 50vw;
    background: #f9f9f9;
    border-left: solid 1px #eee;
    box-shadow: 0 0 10px 5px #cbccd6;
    z-index: 10;
    transform: translateX(100%);
    transition: all .2s linear;
}
.appoverview-page .slide-modal.show {
	transform: translateX(0);
}
.appoverview-page .slide-content {
	padding: 20px;
}
</style>
<div class="appoverview-page"> 
	<div class="layout">
		<div style="flex: none;">
			<section class="panel app-base-info" style="flex: none;width: 310px;">
				<p class="title">应用系统</p>
				<div class="content">
					<div class="app-info-wrap">
						<p class="app-name-wrap">
							<img src="img/baseMonitor/application/app.png" alt="app"/>
							<span class="app-name"></span>
						</p>
						<p class="collect-info">
							<span class="data-size" data-role="采集总量">-MB</span>
							<span class="data-speed" data-role="实时速度">-KB/S</span>
						</p>
					</div>
				</div>
			</section>
			<section class="panel health-wrap" style="flex: none;width: 310px;">
				<p class="title">已监控对象</p>
				<div class="content">
					<div class="app-info">
						<span class="objNum" data-title="软件程序">-</span>
						<span class="ipNum" data-title="IP对象">-</span>
						<span class="sourceNum" data-title="日志采集源">-</span>
						<span class="fileNum" data-title="日志文件数">-</span>
					</div>
				</div>
			</section>
		</div>
		<section class="panel trade-nav">
			<ul class="nav nav-tabs nav-public">
				<li class="active"><a href="#tabs_count" data-toggle="tab">交易量统计</a></li>
				<li><a href="#tabs_avg" data-toggle="tab">交易耗时统计</a></li>
				<span class="time-circle">
					<span class="active" data-time="10800000" data-interval="1">3小时</span><span data-time="21600000" data-interval="2">6小时</span><span data-time="43200000" data-interval="4">12小时</span><span data-time="86400000" data-interval="8">24小时</span>
				</span>
				<span class="btn-detail trade-compare hide">详情</span>
			</ul>
			<div class="tab-content">
				<div id="tabs_count" class="tab-pane active">
					<div class="info-content">
						<div class="info-echarts-wrap">
							<div class="app-echarts" id="echarts_count"></div>
						</div>
						<div class="info-box">
							<span class="data-total theme-color" data-role="当日总交易量">-</span>
							<span class="compare-count"  data-role="昨日同比"></span>
							<span data-role="实时交易量">-</span>
						</div>
					</div>
				</div>
				<div id="tabs_avg" class="tab-pane">
					<div class="info-content">
						<div class="info-echarts-wrap">
							<div class="app-echarts" id="echarts_time"></div>
						</div>
						<div class="info-box">
							<span class="data-total theme-color" data-role="当日平均耗时"></span>
							<span class="compare-time"  data-role="昨日同比"><i class="down"></i></span>
							<span data-role="1分钟平均耗时">-</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
	<div class="layout">
		<section class="panel">
			<p class="title">软件程序性能
				<span class="title-operate">
					<span class="active" title="列表" data-type="table"></span>
					<span title="图表" data-type="chart"></span>
				</span>
				<span class="btn-detail" data-type="软件程序-objNum" data-ename="soft">详情</span>
			</p>
			<div class="content trade-content">
				<div class="data-table show" data-type="table">
					<table class="display dataTable table" id="app_table"></table>
				</div>
				<div class="data-chart" data-type="chart">
					<div class="top-charts" id="echarts_app"></div>
				</div>
			</div>
		</section>
		<section class="panel">
			<p class="title">IP对象性能
				<span class="title-operate">
					<span class="active" title="列表" data-type="table"></span>
					<span title="图表" data-type="chart"></span>
				</span>
				<span class="btn-detail" data-type="IP对象-ipNum" data-ename="ip">详情</span>
			</p>
			<div class="content trade-content">
				<div class="data-table show" data-type="table">
					<table class="display dataTable table" id="ip_table"></table>
				</div>
				<div class="data-chart" data-type="chart">
					<div class="top-charts" id="echarts_ip"></div>
				</div>
			</div>
		</section>
	</div>
	<div class="layout">
		<section class="panel">
			<p class="title">日志采集源性能
				<span class="title-operate">
					<span class="active" title="列表" data-type="table"></span>
					<span title="图表" data-type="chart"></span>
				</span>
				<span class="btn-detail" data-type="日志源-sourceNum" data-ename="source">详情</span>
			</p>
			<div class="content trade-content">
				<div class="data-table show" data-type="table">
					<table class="display dataTable table" id="source_table"></table>
				</div>
				<div class="data-chart" data-type="chart">
					<div class="top-charts" id="echarts_source"></div>
				</div>
			</div>
		</section>
		<section class="panel">
			<p class="title">交易日志性能
				<span class="title-operate">
					<span class="active" title="列表" data-type="table"></span>
					<span title="图表" data-type="chart"></span>
				</span>
				<span class="btn-detail" data-type="日志文件-fileNum" data-ename="file">详情</span>
			</p>
			<div class="content trade-content">
				<div class="data-table show" data-type="table">
					<table class="display dataTable table" id="file_table"></table>
				</div>
				<div class="data-chart" data-type="chart">
					<div class="top-charts" id="echarts_file"></div>
				</div>
			</div>
		</section>
	</div>
	
	<div class="slide-modal">
		<div class="slide-container">
			<div class="slide-title"></div>
			<div class="slide-content"></div>
		</div>
	</div>
	
</div>