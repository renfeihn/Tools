<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.tomcatDetails-line {
	display: flex;
}
.tomcatDetails-line .dataTable{
	table-layout: fixed;
}
/*基本信息*/
.tomcatDetails-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.tomcatDetails-queue>span:nth-child(1):before {
	content: 'tomcat';
	height: 30px;
}

.tomcatDetails-queue>span:nth-child(1) {
	width: 100%;
	color: #2B2933;
	height: 140px;
	line-height: 120px;
	margin-bottom: 10px;
	padding-left: 144px;
	font-size: 20px;
	font-weight: bolder;
	background: #F1F0F5 url(img/baseMonitor/tomcat.png) no-repeat 20px center;
}

.tomcatDetails-queue>span:nth-child(2) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.tomcatDetails-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.tomcatDetails-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
	width:80px;
}

.tomcatDetails-queue>span>span:nth-child(1):before {
	content: "节点IP地址 :";
}

.tomcatDetails-queue>span>span:nth-child(2):before {
	content: "节点端口 :";
}

.more-info {
	color: #5c5a66;
}

.more-info:LINK {
	color: #5c5a66;
}

.more-info:VISITED {
	color: #5c5a66;
}

.more-info:HOVER {
	color: #5b62f9;
}

.more-info:ACTIVE {
	color: #5b62f9;
}

.tomcatDetails-exampleSummary, .tomcatDetails-appSummary {
	width: 100%;
	height: 220px;
	table-layout: fixed;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.tomcatDetails-exampleSummary>span, .tomcatDetails-appSummary>span {
	width: calc(( 100% - 10px)/2);
	height: 105px;
	background-color: #F1F0F5;
	border-radius: 2px;
	color: #000;
	box-sizing: border-box;
	text-align: center;
	padding: 36px 0;
	font-size: 26px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.tomcatDetails-exampleSummary>span:nth-child(2n+1),
	.tomcatDetails-appSummary>span:nth-child(2n+1) {
	margin-right: 10px;
}

.tomcatDetails-exampleSummary>span:nth-child(n+3),
	.tomcatDetails-appSummary>span:nth-child(n+3) {
	margin-top: 10px;
}

.tomcatDetails-exampleSummary>span:before, .tomcatDetails-appSummary>span:before
	{
	display: block;
	color: #5C5A66;
	font-size: 14px;
	width: 100%;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	position: relative;
	top: -10px;
}

.tomcatDetails-exampleSummary>span:nth-child(1):before {
	content: "服务器状态";
}

.tomcatDetails-exampleSummary>span:nth-child(2):before {
	content: "进程占用cpu";
}

.tomcatDetails-exampleSummary>span:nth-child(3):before {
	content: "java虚拟机运行使用内存";
}

.tomcatDetails-exampleSummary>span:nth-child(4):before {
	content: "部署应用数";
}

.tomcatDetails-appSummary>span:nth-child(1):before {
	content: "当前会话数";
}

.tomcatDetails-appSummary>span:nth-child(2):before {
	content: "Request count";
}

.tomcatDetails-appSummary>span:nth-child(3):before {
	content: "请求响应时间";
}

.tomcatDetails-appSummary>span:nth-child(4):before {
	content: "线程池使用率";
}
/*事件*/
.tomcatDetails-event {
	float: right;
	width: 180px;
	height: 220px;
}

.tomcatDetails-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.tomcatDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.tomcatDetails-event>span>span:nth-child(1),
.tomcatDetails-event>span>span:nth-child(2){
	border-right:1px solid #AEADB3;
}

.tomcatDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.tomcatDetails-event>span:nth-child(2)>span:nth-child(3):BEFORE {
	content: '通知';
	display: block;
	font-size: 14px;
	color: #666;
}

.tomcatDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.tomcatDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.tomcatDetails-event>span:nth-child(2)>span:nth-child(3):AFTER {
	background-color: #22ac38;
}

.tomcatDetails-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.tomcatDetails-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.tomcatDetails-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 6px;
	top: 7px;
}

.tomcatDetails-event>span>span {
	flex: auto;
	position: relative;
}

.tomcatDetails-event>span+span {
	margin-top: 10px;
}

.tomcatDetails-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.tomcatDetails-event>span {
	display: flex;
	border-radius: 2px;
	background-color: #f1f0f5;
	text-align: center;
	height: 64px;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	font-weight: normal;
	flex-direction: column;
}

.tomcatDetails-event>span:nth-child(2) {
	flex-direction: row;
/* 	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px; */
}

.tomcatDetails-echart {
	width: 100%;
	height: 220px;
}

.tomcatDetails-portSpan, .tomcatDetails-threadSpan,
	.tomcatDetails-sessionSpan, .tomcatDetails-processResources,
	.tomcatDetails-JVM, .tomcatDetails-responseSpan {
	display: flex;
	width: 100%;
	height: 44px;
	margin: 0;
}

.tomcatDetails-portSpan>li {
	position: relative;
	width: calc(( 100% - 30px)/4);
	border-radius: 4px;
	background: #F1F0F5;
	margin-right: 10px;
	color: #2B2933;
	text-align: center;
	font-size: 14px;
}
.tomcatDetails-responseSpan>li {
	position: relative;
	width: calc(( 100% - 30px)/2);
	border-radius: 4px;
	background: #F1F0F5;
	margin-right: 10px;
	color: #2B2933;
	text-align: center;
	font-size: 14px;
}
.tomcatDetails-portSpan>li:nth-child(4), .tomcatDetails-responseSpan>li:nth-child(2)
	{
	margin: 0;
}

.tomcatDetails-portSpan>li:nth-child(1), .tomcatDetails-responseSpan>li:nth-child(1)
	{
	background: #5B62F9;
	color: #FFFFFF;
}

.tomcatDetails-portSpan>li:before, .tomcatDetails-responseSpan>li:before
	{
	display: block;
	font-size: 12px;
	color: #5C5A66;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.tomcatDetails-portSpan>li:nth-child(1):before {
	content: "端口状态";
	color: #FFFFFF;
}

.tomcatDetails-portSpan>li:nth-child(2):before {
	content: "ESTABLISHED"
}

.tomcatDetails-portSpan>li:nth-child(3):before {
	content: "CLOSE_WAIT"
}

.tomcatDetails-portSpan>li:nth-child(4):before {
	content: "TIME_WAIT"
}
 
#tomcatDetails-responseSpan-time>li:nth-child(1):before {
	content: "Max processing time";
	color: #FFFFFF;
}

#tomcatDetails-responseSpan-time>li:nth-child(2):before {
	content: "processing time"
}

#tomcatDetails-responseSpan-count>li:nth-child(1):before {
	content: "Request count";
	color: #FFFFFF;
}

#tomcatDetails-responseSpan-count>li:nth-child(2):before {
	content: "Error count"
} 

.tomcatDetails-processResources>li, .tomcatDetails-JVM>li,
	.tomcatDetails-threadSpan>li, .tomcatDetails-sessionSpan>li {
	width: calc(( 100% - 20px)/3);
	border-radius: 4px;
	background: #F1F0F5;
	margin-right: 10px;
	color: #2B2933;
	font-size: 14px;
	display: flex;
	justify-content: space-around;
	line-height: 44px;
}

.tomcatDetails-processResources>li:nth-child(1), .tomcatDetails-JVM>li:nth-child(1),
	.tomcatDetails-threadSpan>li:nth-child(1), .tomcatDetails-sessionSpan>li:nth-child(1)
	{
	background: #5B62F9;
	color: #FFFFFF;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.tomcatDetails-processResources>li:nth-child(3), .tomcatDetails-JVM>li:nth-child(3),
	.tomcatDetails-threadSpan>li:nth-child(3), .tomcatDetails-sessionSpan>li:nth-child(3)
	{
	margin-right: 0;
}

.tomcatDetails-processResources>li:before, .tomcatDetails-JVM>li:before,
	.tomcatDetails-threadSpan>li:before, .tomcatDetails-sessionSpan>li:before
	{
	font-size: 12px;
	color: #5C5A66;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.tomcatDetails-processResources>li:nth-child(1):before {
	content: "当前进程总数";
	color: #FFFFFF;
}

.tomcatDetails-processResources>li:nth-child(2):before {
	content: "CPU";
}

.tomcatDetails-processResources>li:nth-child(3):before {
	content: "内存";
}

.tomcatDetails-JVM>li:nth-child(1):before {
	content: "运行时间";
	color: #FFFFFF;
}

.tomcatDetails-JVM>li:nth-child(2):before {
	content: "总内存";
}

.tomcatDetails-JVM>li:nth-child(3):before {
	content: "已使用";
}

.tomcatDetails-threadSpan>li:nth-child(1):before {
	content: "当前线程数";
	color: #FFFFFF;
}

.tomcatDetails-threadSpan>li:nth-child(2):before {
	content: "活动线程数"
}

.tomcatDetails-threadSpan>li:nth-child(3):before {
	content: "最大线程数"
}

.tomcatDetails-sessionSpan>li:nth-child(1):before {
	content: "活动会话数";
	color: #FFFFFF;
}

.tomcatDetails-sessionSpan>li:nth-child(2):before {
	content: "会话数"
}

.tomcatDetails-sessionSpan>li:nth-child(3):before {
	content: "最大会话数"
}

.tomcatDetails-jumpPage {
	position: absolute;
	z-index: 2;
	height: 24px;
	line-height: 24px;
	margin-top: -24px;
	display: flex;
}

.tomcatDetails-jumpPage>input {
	width: 38px;
	margin: 0 4px;
}
#tomcatDetails-trafficStatistics>li:nth-child(1):before{
	content: '发送字节数';
	color: #EEEEFE;
}
#tomcatDetails-trafficStatistics>li:nth-child(2):before{
	content: '接受字节数';
}
.tomcatDetails-appList>li {
	height: 34px;
	line-height: 34px;
}

.tabs-left>.nav-tabs>li>a {
	height: 34px;
	line-height: 34px;
}
.more-info {
	color: #5c5a66;
}

.more-info:LINK {
	color: #5c5a66;
}

.more-info:VISITED {
	color: #5c5a66;
}

.more-info:HOVER {
	color: #5b62f9;
}

.more-info:ACTIVE {
	color: #5b62f9;
}

.more-info-content {
	font-size: 12px;
	width: 240px;
	height: 30px;
	line-height: 30px;
	display: flex;
	border-bottom: 1px solid #EBEBED;
}

.more-info-content:last-child {
	border: none;
}

.more-info-content>span {
	width: 50%;
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.more-info-content>span:nth-child(n+1) {
	margin-right: 10px;
	padding-left: 10px;
}
</style>
<div style="overflow: hidden;">
	<div class="tomcatDetails-line" style="height: 320px;">
		<section class="panel" style="flex: none;width:284px;margin-right: 20px;">
			<p class="title">基本信息<!--  <a id="moreInfo" href="javascript:void(0);" class="pull-right more-info" >更多详情</a> --></p>
			<div class="content tomcatDetails-queue">
				<span id="version">-</span>
				<span><span id="ip">-</span><span id="port">-</span></span>
			</div>
		</section>
		<section class="panel" style="margin-right: 20px; flex: none; width: 390px;">
			<p class="title">应用汇总</p>
			<div class="content">
				<div id="tomcatDetails-appSummary" class="tomcatDetails-appSummary">
					<span>-</span>
					<span>-</span>
					<span>-</span>
					<span>-</span>
				</div>
			</div>
		</section>
		<section class="panel" style="flex: auto;">
			<p class="title">事件总览</p>
			<div class="content">
				<div class="tomcatDetails-event">
					<span id="alarmWaring">-</span>
					<span>
						<span id="waringCount">-</span>
						<span id="alarmCount">-</span>
						<span id="infoCount">-</span>
					</span>
					<span id="dayEventCount">-</span>
				</div>
				<div id="eEvent" style="margin-right: 200px;height: 220px;"></div>
			</div>
		</section>
		</div>
	<div class="tomcatDetails-line" style="height: 300px;margin-bottom: 20px;">
		<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px; height: 100%;">
			<p class="title">端口</p>
			<div class="content">
				<div id="echart-port" class="tomcatDetails-echart" style="height:173px;margin-bottom:5px;"></div>
				<ul id="tomcatDetails-portSpan" class="tomcatDetails-portSpan">
					<li>-</li>
					<li>-</li>
					<li>-</li>
					<li>-</li>
				</ul>
			</div>
		</section>
		<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px; height: 100%;">
			<p class="title">进程资源</p>
			<div class="content">
				<div id="echart-processResources" class="tomcatDetails-echart" style="height:173px;margin-bottom:5px;"></div>
				<ul id="tomcatDetails-processResources" class="tomcatDetails-processResources">
					<li title="当前进程总数">-</li>
					<li>-</li>
					<li>-</li>
				</ul>
			</div>
		</section>
		<section class="panel" style="width: calc((100% - 40px)/3); height: 100%;">
			<ul class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs111" data-toggle="tab">JVM内存</a></li>
					<li><a href="#tabs112" data-toggle="tab">CPU使用率</a></li>
					<li><a href="#tabs113" data-toggle="tab">GC耗时</a></li>
			</ul>
			<div class="tab-content">
				<div id="tabs111" class="tab-pane active">
					<div id="echart-jvm" class="tomcatDetails-echart" style="height:173px;margin-bottom:5px;"></div>
					<ul id="tomcatDetails-JVM" class="tomcatDetails-JVM">
					<li title="运行时间">-</li>
					<li>-</li>
					<li>-</li>
				</ul>
				</div>
				<div id="tabs112" class="tab-pane">
					<div id="echart-cpu" class="tomcatDetails-echart" style="width:calc(33vw - 100px);"></div>
				</div>
				<div id="tabs113" class="tab-pane">
					<div id="echart-GC" class="tomcatDetails-echart" style="width:calc(33vw - 100px);"></div>
				</div>
			</div>
		</section>
	</div>
	<div class="tomcatDetails-line" style="height: 300px;margin-bottom: 20px;">
		<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px; height: 100%;">
			<p class="title">线程池</p>
			<div class="content">
				<div id="echart-thread" class="tomcatDetails-echart" style="height:173px;margin-bottom:5px;"></div>
				<ul id="tomcatDetails-threadSpan" class="tomcatDetails-threadSpan">
					<li>-</li>
					<li>-</li>
					<li>-</li>
				</ul>
			</div>
		</section>
		<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px; height: 100%;">
			<ul class="nav nav-tabs nav-public">
				<li class="active"><a href="#tabs_request_time" data-toggle="tab">请求响应时间</a></li>
				<li><a href="#tabs_request_count" data-toggle="tab">请求响应数量</a></li>
			</ul>
			<div class="tab-content">
				<div id="tabs_request_time" class="tab-pane active">
					<div id="echart-response-time" class="tomcatDetails-echart" style="height:173px;margin-bottom:5px;"></div>
					<ul id="tomcatDetails-responseSpan-time" class="tomcatDetails-responseSpan">
					<li title="Max processing time">-</li>
					<li title="processing time">-</li>
				</ul>
				</div>
				<div id="tabs_request_count" class="tab-pane">
					<div id="echart-response-count" class="tomcatDetails-echart" style="height:173px;width:calc(33vw - 100px);margin-bottom:5px;"></div>
					<ul id="tomcatDetails-responseSpan-count" class="tomcatDetails-responseSpan">
					<li title="Request count">-</li>
					<li title="Error count">-</li>
				</ul>
				</div>
			</div>
			
			
			<!-- <p class="title">请求响应</p>
			<div class="content">
				<div id="echart-response" class="tomcatDetails-echart" style="height:173px;margin-bottom:5px;"></div>
				<ul id="tomcatDetails-responseSpan" class="tomcatDetails-responseSpan">
					<li title="Max processing time">-</li>
					<li title="processing time">-</li>
					<li>-</li>
					<li>-</li>
				</ul>
			</div> -->
		</section> 
		<section class="panel" style="width: calc((100% - 40px)/3);height: 100%;">
			<ul class="nav nav-tabs nav-public">
				<li class="active"><a href="#tabs_session" data-toggle="tab">会话统计</a></li>
				<li><a href="#tabs_ll" data-toggle="tab">流量统计</a></li>
			</ul>
			<div class="tab-content">
				<div id="tabs_session" class="tab-pane active">
					<div id="echart-session" class="tomcatDetails-echart" style="height:173px;margin-bottom:5px;"></div>
					<ul id="tomcatDetails-sessionSpan" class="tomcatDetails-sessionSpan">
						<li>-</li>
						<li>-</li>
						<li>-</li>
					</ul>
				</div>
				<div id="tabs_ll" class="tab-pane">
					<div id="echart-trafficStatistics" class="tomcatDetails-echart" style="height:173px;margin-bottom:5px;width:calc(33vw - 100px);">
					</div>
					<ul id="tomcatDetails-trafficStatistics" class="tomcatDetails-responseSpan">
						<li>-</li>
						<li>-</li>
					</ul>
				</div>
			</div>
			<!-- <p class="title">会话统计</p>
			<div class="content">
				<div id="echart-session" class="tomcatDetails-echart" style="height:173px;margin-bottom:5px;"></div>
				<ul id="tomcatDetails-sessionSpan" class="tomcatDetails-sessionSpan">
					<li>-</li>
					<li>-</li>
					<li>-</li>
				</ul>
			</div> -->
		</section>
	</div>
	<div class="tomcatDetails-line" style="height: 355px;">
		<section class="panel" style="width: 100%;">
			<p class="title">应用列表</p>
			<div class="content" style="padding:0;">
				<div class="tabs-left">
					<ul id="tomcatDetails-appList" class="nav nav-tabs tomcatDetails-appList" style="background-color: #FFFFFF">
						<!-- <li class="active"><a href="#tabs311" data-toggle="tab">DRCBank</a></li>
						<li><a href="#tabs312" data-toggle="tab">AimWeb</a></li>
						<li><a href="#tabs313" data-toggle="tab">localhost</a></li>
						<li><a href="#tabs314" data-toggle="tab">docs</a></li>
						<li><a href="#tabs315" data-toggle="tab">examples</a></li>
						<li><a href="#tabs316" data-toggle="tab">host-manager</a></li>
						<li><a href="#tabs317" data-toggle="tab">ideweb</a></li>
						<li><a href="#tabs318" data-toggle="tab">manager</a></li> -->
					</ul>
					<div class="tab-content" style="width: 100%; background-color: #FFFFFF">
						<div id="tabs311" class="tab-pane active" style="padding:0;">
							<ul class="nav nav-tabs nav-underLine">
								<li class="active"><a href="#tabs321" data-toggle="tab">会话信息</a></li>
								<li><a href="#tabs322" data-toggle="tab">jsp加载信息</a></li>
								<li><a href="#tabs323" data-toggle="tab">url访问信息</a></li>
							</ul>
							<div class="tab-content">
								<div id="tabs321" class="tab-pane active">
									<div class="tomcatDetails-echart">
										<table id="dataTable-sessionInfo" class="display dataTable table">
											<thead>
												<tr>
													<th>序号</th>
													<th>活动会话数</th>
													<th>会话总数</th>
													<th>最大活动会话数</th>
													<th>拒绝会话</th>
													<th>响应时间( ms )</th>
													<th>过期会话</th>
													<th>最长会话时间</th>
													<th>平均会话时间</th>
												</tr>
											</thead>
											<tbody></tbody>
										</table>
										<!-- 跳转到某页Start -->
										<span class="tomcatDetails-jumpPage">跳转到<input id="ToPage-sessionInfo" type="text" />页</span>
										<!-- 跳转到某页End -->
									</div>
								</div>
								<div id="tabs322" class="tab-pane">
									<div class="tomcatDetails-echart">
										<table id="dataTable-jspInfo" class="display dataTable table">
											<thead>
												<tr>
													<th>序号</th>
													<th>JSPs loaded</th>
													<th>JSPs reloaded</th>
												</tr>
											</thead>
											<tbody></tbody>
										</table>
										<!-- 跳转到某页Start -->
										<span class="tomcatDetails-jumpPage">跳转到<input id="ToPage-jspInfo" type="text" />页</span>
										<!-- 跳转到某页End -->
									</div>
								</div>
								<div id="tabs323" class="tab-pane">
									<div class="tomcatDetails-echart">
										<table id="dataTable-urlInfo" class="display dataTable table">
											<thead>
												<tr>
													<th>序号</th>
													<th>URL名称</th>
													<th>Processing time</th>
													<th>Max time</th>
													<th>Request count</th>
													<th>Error count</th>
													<th>Load time</th>
													<th>Classloading time</th>
												</tr>
											</thead>
											<tbody></tbody>
										</table>
										<!-- 跳转到某页Start -->
										<span class="tomcatDetails-jumpPage">跳转到<input id="ToPage-urlInfo" type="text" />页</span>
										<!-- 跳转到某页End -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
	<!-- <div class="tomcatDetails-line" style="height: 300px;">
		<section class="panel" style="width: calc((100% - 10px)/2);margin-right: 20px; height: 100%;">
			<p class="title">流量统计</p>
			<div class="content">
				<div id="tomcatDetails-trafficStatistics" class="tomcatDetails-trafficStatistics">
					<span>-</span>
					<span>-</span>
				</div>
				<div id="echart-trafficStatistics" class="tomcatDetails-echart" style="width: calc(100% - 140px); margin-right: 140px;">
				</div>
			</div>
		</section>
		<section class="panel" style="width: calc((100% - 20px)/2);height: 100%;">
			<p class="title">系统日志（暂不做）</p>
			<div class="content">
			</div>
		</section>	
	</div> -->
</div>

