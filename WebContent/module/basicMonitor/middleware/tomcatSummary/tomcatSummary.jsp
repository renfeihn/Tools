<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.tomcatSummary-layout {
	display: flex;
}

.tomcatSummary-layout>section+section {
	margin-left: 20px;
}

.tomcatSummary-instanceCount+div {
	background-color: #5b62f9;
	border-radius: 2px;
	background-image: linear-gradient(to bottom, #4d53d9 0%, #4d53d9 100%);
	background-size: 2px 38px;
	background-position: center center;
	background-repeat: no-repeat;
	display: flex;
	height: 66px;
	align-items: center;
}

.tomcatSummary-instanceCount+div>span:nth-child(1):BEFORE {
	content: 'runing数';
}

.tomcatSummary-instanceCount+div>span:nth-child(2):BEFORE {
	content: 'stop数';
}

.tomcatSummary-instanceCount+div>span:BEFORE {
	display: block;
	font-size: 14px;
}

.tomcatSummary-instanceCount+div>span {
	font-size: 24px;
	color: #FFF;
	text-align: center;
	flex: auto;
}

.tomcatSummary-instanceCount {
	line-height: 140px;
	font-size: 54px;
	font-weight: bold;
	height: 140px;
	border-radius: 2px;
	background: #f1f0f5 url("img/tomcatSummary/cat.png") 20px center
		no-repeat;
	margin-bottom: 10px;
	text-align: right;
	padding-right: 30px;
}

.tomcatSummary-kpi>span:nth-child(2n) {
	margin-left: 10px;
}

.tomcatSummary-kpi>span:nth-child(n+3) {
	margin-top: 10px;
}

.tomcatSummary-kpi>span:BEFORE {
	font-size: 14px;
	display: block;
	margin-bottom: 6px;
	color: #666;
}

.tomcatSummary-kpi>span:nth-child(1):BEFORE {
	content: '请求响应时间过高数';
}

.tomcatSummary-kpi>span:nth-child(2):BEFORE {
	content: '线程繁忙程度过高数';
}

.tomcatSummary-kpi>span:nth-child(3):BEFORE {
	content: '会话数过高数';
}

.tomcatSummary-kpi>span:nth-child(4):BEFORE {
	content: 'JVM内存使用率过高数';
}

.tomcatSummary-kpi>span {
	width: calc((100% - 10px)/2);
	height: 100px;
	border-radius: 2px;
	background-color: #f1f0f5;
	background-position: 12px center;
	background-repeat: no-repeat;
	padding-top: 30px;
	box-sizing: border-box;
	font-size: 24px;
	text-align: center;
}

.tomcatSummary-kpi {
	display: flex;
	flex-wrap: wrap;
	height: 220px;
}

.tomcatSummary-event {
	float: right;
	width: 180px;
	height: 220px;
}

.tomcatSummary-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.tomcatSummary-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
}

.tomcatSummary-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
}

.tomcatSummary-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.tomcatSummary-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.tomcatSummary-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
}

.tomcatSummary-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.tomcatSummary-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.tomcatSummary-event>span>span {
	flex: auto;
	position: relative;
}

.tomcatSummary-event>span+span {
	margin-top: 10px;
}

.tomcatSummary-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.tomcatSummary-event>span {
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

.tomcatSummary-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px;
}
.tomcatSummary-jumpPage {
	position: absolute;
  z-index: 2;
  height: 24px;
  line-height: 24px;
  margin-top: -24px;
  display: flex;
}
.tomcatSummary-jumpPage>input {
	width: 38px;
  margin: 0 4px;
}
button.comparison {
	background-position: 7px center;
	background-repeat: no-repeat;
	padding: 0 10px 0 22px;
	line-height: 22px;
}

button.comparison {
	background-image: url("img/baseMonitor/comparison-black.png");
}

button.comparison:HOVER {
	background-image: url("img/baseMonitor/comparison-blue.png");
	color: #5b62f9;
}

button.comparison.disabled {
	background-image: url("img/baseMonitor/comparison-gray.png");
	color: #aeadb2;
	border-color: #ebebed;
	cursor: not-allowed;
}

table.dataTable tbody tr td:nth-child(4)>span:before {
	content: "";
	width: 6px;
	height: 6px;
	border-radius: 50%;
	margin-right: 5px;
	display: inline-block;
}

table.dataTable tbody tr td:nth-child(4)>span.red:before {
	background-color: #FF3341;
}

table.dataTable tbody tr td:nth-child(4)>span.green:before {
	background-color: #22AC38;
}

table.dataTable tbody tr td:nth-child(4)>span.yellow:before {
	background-color: #FB8229;
}
</style>

<section class="panel" style="margin: -20px -20px 0;">
	<p class="title">Tomcat汇总</p>
	<div class="content">
		<div class="tomcatSummary-layout" style="margin-bottom: 20px;">
			<section class="panel" style="width: 284px;">
				<p class="title">统计</p>
				<div id="tomcatSummary-instanceCount" class="content">
					<div id="instanceCount" class="tomcatSummary-instanceCount" style="line-height: 140px;font-size: 54px;" label-flag="info">48</div>
					<div>
						<span id="runningCount" label-flag="info">20</span>
						<span id="stopCount" label-flag="info">13</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="width: 390px;">
				<p class="title">关键KPI统计</p>
				<div class="content">
					<div id="tomcatSummary-kpi" class="tomcatSummary-kpi">
						<span>19</span>
						<span>9</span>
						<span>32</span>
						<span>2</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="flex: auto;">
				<p class="title">事件总览</p>
				<div class="content">
					<div id="tomcatSummary-event" class="tomcatSummary-event">
						<span id="undealingCount" label-flag="info">134</span>
						<span>
							<span id="warningCount" label-flag="info">71</span>
							<span id="alarmCount" label-flag="info">63</span>
						</span>
						<span id="todayEvent" label-flag="info">269</span>
					</div>
					<div id="echart-event" style="margin-right: 200px;height: 220px;"></div>
				</div>
			</section>
			
		</div>
		<section class="panel" style="height:510px;">
			<p class="title">Tomcat列表</p>
			<div class="content">
				<table id="dataTable" class="display dataTable table">
					<thead>
						<tr>
							<th>序号</th>
							<th>主机名/ip</th>
							<th>状态</th>
							<th>健康度</th>
							<!-- <span class="red">12</span>  div.red    div.yellow   div.green -->
							<th>部署应用系统总数</th>
							<th>当前会话数</th>
							<th>平均请求响应时间</th>
							<th>线程繁忙程度</th>
							<th>JVM内存使用率</th>
						</tr>
					</thead>
					<!-- <tbody>
						<tr>
							<td>1</td>
							<td>1</td>
							<td>1</td>
							<td><span class="red">12</span></td>
							<td>1</td>
							<td>1</td>
							<td>1</td>
							<td>1</td>
							<td>1</td>
						</tr>
					</tbody> -->
				</table>
				<!-- 跳转到某页Start -->
				<span class="tomcatSummary-jumpPage">跳转到<input id="tomcatSummary-ToPage" type="text" />页</span>
				<!-- 跳转到某页End -->
			</div>
		</section>
	</div>
</section>
		
		