<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.oracleSummary-layout {
	display: flex;
}

.oracleSummary-layout>section+section {
	margin-left: 20px;
}

.oracleSummary-instanceCount+div {
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
.oracleSummary-instanceCount+div>span:nth-child(1):BEFORE {
	content: '非健康实例';
}
.oracleSummary-instanceCount+div>span:nth-child(2):BEFORE {
	content: '健康实例';
}
.oracleSummary-instanceCount+div>span:BEFORE {
	display: block;
	font-size: 14px;
}
.oracleSummary-instanceCount+div>span {
	font-size: 24px;
	color: #FFF;
	text-align: center;
	flex: auto;
	width: 50%;
}
.oracleSummary-instanceCount {
	line-height: 140px;
	font-size: 54px;
	font-weight: bold;
	height: 140px;
	border-radius: 2px;
	background: #f1f0f5 url("img/baseMonitor/ORACLE.png") 20px center no-repeat;
	margin-bottom: 10px;
	text-align: right;
	padding-right: 30px;
}

.oracleSummary-kpi>span:nth-child(2n) {
	margin-left: 10px;
}
.oracleSummary-kpi>span:nth-child(n+3) {
	margin-top: 10px;
}
.oracleSummary-kpi>span:BEFORE {
	font-size: 14px;
	display: block;
	margin-bottom: 6px;
	color: #666;
}
.oracleSummary-kpi>span:nth-child(1):BEFORE {
	content: '死锁数';
}
.oracleSummary-kpi>span:nth-child(2):BEFORE {
	content: '失效对象';
}
.oracleSummary-kpi>span:nth-child(3):BEFORE {
	content: '超长语句';
}
.oracleSummary-kpi>span:nth-child(4):BEFORE {
	content: '超长事务';
}
.oracleSummary-kpi>span:nth-child(1) {
	background-image: url("img/baseMonitor/kpi-1.png");
}
.oracleSummary-kpi>span:nth-child(2) {
	background-image: url("img/baseMonitor/kpi-2.png");
}
.oracleSummary-kpi>span:nth-child(3) {
	background-image: url("img/baseMonitor/kpi-3.png");
}
.oracleSummary-kpi>span:nth-child(4) {
	background-image: url("img/baseMonitor/kpi-4.png");
}
.oracleSummary-kpi>span:before {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.oracleSummary-kpi>span {
    width: calc((100% - 10px)/2);	
    height: 104px;
	border-radius: 2px;
	background-color: #f1f0f5;
	background-position: 12px center;
	background-repeat: no-repeat;
    padding-left: 25%;	
    padding-top: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	box-sizing: border-box;
	font-size: 24px;
}
.oracleSummary-kpi {
	display: flex;
	flex-wrap: wrap;
	height: 220px;
}

.oracleSummary-event {
	float: right;
	width: 180px;
	height: 220px;
}
.oracleSummary-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}
.oracleSummary-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
    font-size: 14px;
}
.oracleSummary-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
    font-size: 14px;
}
.oracleSummary-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}
.oracleSummary-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}
.oracleSummary-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
}
.oracleSummary-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}
.oracleSummary-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
    left: 22px;
    top: 7px;
}
.oracleSummary-event>span>span {
	flex: auto;
	position: relative;
}
.oracleSummary-event>span+span {
	margin-top: 10px;
}
.oracleSummary-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}
.oracleSummary-event>span {
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
.oracleSummary-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%) no-repeat center center;
	background-size: 1px 50px; 
}

button.comparison {
	background-position: 7px center;
	background-repeat: no-repeat;
	padding: 0 10px 0 22px;
	line-height: 22px;
}
button.comparison {
	background-image: url("img/button/comparison-black.png");
}
button.comparison:HOVER {
	background-image: url("img/button/comparison-blue.png");
	color: #5b62f9;
}
button.comparison.disabled {
	background-image: url("img/button/comparison-gray.png");
	color: #aeadb2;
    border-color: #ebebed;
    cursor: not-allowed;
}
</style>

<section class="panel" style="margin: -20px -20px 0;">
	<p class="title">ORACLE总览</p>
	<div class="content">
		<div class="oracleSummary-layout" style="margin-bottom: 20px;">
			<section class="panel" style="width: 284px;">
				<p class="title">实例状态统计</p>
				<div class="content">
					<div id="instanceCount" class="oracleSummary-instanceCount" 
						style="line-height: 140px;font-size: 54px;">-</div>
					<div>
						<span id="unHealthInstances">-</span>
						<span id="healthInstances">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="width: 330px;">
				<p class="title">关键KPI统计</p>
				<div class="content">
					<div class="oracleSummary-kpi">
						<span id="deadLockCount">-</span>
						<span id="failureObject">-</span>
						<span id="longSentence">-</span>
						<span id="longWork">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="flex: auto;">
				<p class="title">事件总览</p>
				<div class="content">
					<div class="oracleSummary-event">
						<span id="undealingCount">-</span>
						<span>
							<span id="warningCount">-</span>
							<span id="alarmCount">-</span>
						</span>
						<span id="todayEvent">-</span>
					</div>
					<div id="eEvent" style="height: 220px;width:calc(100% - 200px)"></div>
				</div>
			</section>
			
		</div>
		
		<button type="button" class="pull-left comparison disabled" style="position: absolute;z-index: 1;margin-bottom:10px;">比对</button>
		<table id="dataTable" class="display dataTable table">
			<thead>
				<tr>
					<th width="40"><input type="checkbox" /></th>
					<th  width="70">序号</th>
					<th width="130">数据库实例名称</th>
					<th width="80">健康度</th>
					<th width="80">死锁数</th>
					<th width="100">失效对象</th>
					<th width="90">超长语句</th>
					<th width="100">超长事务</th>
					<th width="110">SGA命中率</th>
					<th width="80">连接数</th>
					<th width="130">CPU使用率（%）</th>
					<th width="130">内存使用率（%）</th>
					<!-- <th width="130">磁盘活动比（%）</th> -->
					<th width="100">所属IP</th>
					<th width="130">所属应用</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>





