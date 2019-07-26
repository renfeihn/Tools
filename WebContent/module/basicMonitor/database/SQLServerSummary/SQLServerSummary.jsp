<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.SQLServerSummary-layout {
	display: flex;
}

.SQLServerSummary-layout>section+section {
	margin-left: 20px;
}

.SQLServerSummary-instanceCount+div {
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
.SQLServerSummary-instanceCount+div>span:nth-child(1):BEFORE {
	content: '非健康实例';
}
.SQLServerSummary-instanceCount+div>span:nth-child(2):BEFORE {
	content: '健康实例';
}
.SQLServerSummary-instanceCount+div>span:BEFORE {
	display: block;
	font-size: 14px;
}
.SQLServerSummary-instanceCount+div>span {
	font-size: 24px;
	color: #FFF;
	text-align: center;
	flex: auto;
}
.SQLServerSummary-instanceCount {
	line-height: 140px;
	font-size: 54px;
	font-weight: bold;
	height: 140px;
	border-radius: 2px;
	background: #f1f0f5 url("img/SQLServerSummary/sqlserver.png") 20px center no-repeat;
	margin-bottom: 10px;
	text-align: right;
	padding-right: 20px;
}

.SQLServerSummary-kpi>span:nth-child(2n) {
	margin-left: 10px;
}
.SQLServerSummary-kpi>span:nth-child(n+3) {
	margin-top: 10px;
}
.SQLServerSummary-kpi>span:BEFORE {
	font-size: 14px;
	display: block;
	margin-bottom: 6px;
	color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.SQLServerSummary-kpi>span:nth-child(1):BEFORE {
	content: '死锁数';
}
.SQLServerSummary-kpi>span:nth-child(2):BEFORE {
	content: '阻塞数量';
}
.SQLServerSummary-kpi>span:nth-child(3):BEFORE {
	content: '临时表';
}
.SQLServerSummary-kpi>span:nth-child(4):BEFORE {
	content: '会话数量';
}
.SQLServerSummary-kpi>span:nth-child(1) {
	background-image: url("img/SQLServerSummary/kpi-1.png");
}
.SQLServerSummary-kpi>span:nth-child(2) {
	background-image: url("img/SQLServerSummary/kpi-2.png");
}
.SQLServerSummary-kpi>span:nth-child(3) {
	background-image: url("img/SQLServerSummary/kpi-3.png");
}
.SQLServerSummary-kpi>span:nth-child(4) {
	background-image: url("img/SQLServerSummary/kpi-4.png");
}
.SQLServerSummary-kpi>span {
    width: calc((100% - 10px) / 2);
	height: 104px;
	border-radius: 2px;
	background-color: #f1f0f5;
	background-position: 12px center;
	background-repeat: no-repeat;
	padding-left: 25%;
	padding-top: 30px;
	box-sizing: border-box;
	font-size: 24px;
	overflow: hidden;
	text-overflow: ellipsis;
    white-space: nowrap;
}
.SQLServerSummary-kpi {
	display: flex;
	flex-wrap: wrap;
	height: 220px;
}

.SQLServerSummary-event {
	float: right;
	width: 180px;
	height: 220px;
}
.SQLServerSummary-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}
.SQLServerSummary-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
    font-size: 14px;
    color: #666;
}
.SQLServerSummary-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
    font-size: 14px;
    color: #666;
}
.SQLServerSummary-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}
.SQLServerSummary-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}
.SQLServerSummary-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}
.SQLServerSummary-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}
.SQLServerSummary-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
    left: 22px;
    top: 7px;
}
.SQLServerSummary-event>span>span {
	flex: auto;
	position: relative;
}
.SQLServerSummary-event>span+span {
	margin-top: 10px;
}
.SQLServerSummary-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}
.SQLServerSummary-event>span {
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
.SQLServerSummary-event>span:nth-child(2) {
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

<section class="panel">
	<p class="title">SQL Server汇总</p>
	<div class="content">
		<div class="SQLServerSummary-layout" style="margin-bottom: 20px;">
			<section class="panel" style="width: 284px;">
				<p class="title">实例状态统计</p>
				<div class="content">
					<div id="instanceCount" class="SQLServerSummary-instanceCount" style="line-height: 140px;font-size: 54px;">-</div>
					<div>
						<span id="unHealthInstances">-</span>
						<span id="healthInstances">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="width: 330px;">
				<p class="title">关键KPI统计</p>
				<div class="content">
					<div class="SQLServerSummary-kpi">
						<span title="死锁数" id="deadlocksSec">-</span>
						<span title="阻塞数量" id="procBlocked">-</span>
						<span title="临时表" id="tempTables">-</span>
						<span title="会话数量" id="sessionNum">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="flex: auto;">
				<p class="title">事件总览</p>
				<div class="content">
					<div class="SQLServerSummary-event">
						<span id="undealingCount">-</span>
						<span>
							<span id="warningCount">-</span>
							<span id="alarmCount">-</span>
						</span>
						<span id="todayEvent">-</span>
					</div>
					<div id="eEvent" style="margin-right: 200px;height: 220px;"></div>
				</div>
			</section>
			
		</div>
		
		<button type="button" class="pull-left comparison disabled" style="position: absolute;z-index: 1;margin-bottom:10px;">比对</button>
		<table id="dataTable" class="display dataTable table">
			<thead>
				<tr>
					<th width="40"><input type="checkbox" /></th>
					<th width="70">序号</th>
					<th>数据库名</th>
					<th>ip</th>
					<th>健康度</th>
					<th>等待锁的进程数</th>
					<th>每秒事务数</th>
					<th>每秒的请求</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>





