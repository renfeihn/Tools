<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.db2Summary-layout {
	display: flex;
}

.db2Summary-layout>section+section {
	margin-left: 20px;
}

.db2Summary-instanceCount+div {
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

.db2Summary-instanceCount+div>span:nth-child(1):BEFORE {
	content: '非健康实例';
}

.db2Summary-instanceCount+div>span:nth-child(2):BEFORE {
	content: '健康实例';
}

.db2Summary-instanceCount+div>span:BEFORE {
	display: block;
	font-size: 14px;
}

.db2Summary-instanceCount+div>span {
	font-size: 24px;
	color: #FFF;
	text-align: center;
	width: calc(100% / 2);
}

.db2Summary-instanceCount {
	line-height: 140px;
	font-size: 54px;
	font-weight: bold;
	height: 140px;
	border-radius: 2px;
	background: #f1f0f5 url("img/basicMonitor/IBMdb2.png") 20px center
		no-repeat;
	margin-bottom: 10px;
	text-align: right;
	padding-right: 30px;
}

.db2Summary-kpi>span:nth-child(2n) {
	margin-left: 10px;
}

.db2Summary-kpi>span:nth-child(n+3) {
	margin-top: 10px;
}

.db2Summary-kpi>span:BEFORE {
	font-size: 14px;
	display: block;
	margin-bottom: 6px;
	color: #666;
}

.db2Summary-kpi>span:nth-child(1):BEFORE {
	content: '死锁数';
}

.db2Summary-kpi>span:nth-child(2):BEFORE {
	content: '表状态异常';
}

.db2Summary-kpi>span:nth-child(3):BEFORE {
	content: '超长语句';
}

.db2Summary-kpi>span:nth-child(4):BEFORE {
	content: '超长事务';
}

.db2Summary-kpi>span:nth-child(1) {
	background-image: url("img/basicMonitor/kpi-1.png");
}

.db2Summary-kpi>span:nth-child(2) {
	background-image: url("img/basicMonitor/kpi-2.png");
}

.db2Summary-kpi>span:nth-child(3) {
	background-image: url("img/basicMonitor/kpi-3.png");
}

.db2Summary-kpi>span:nth-child(4) {
	background-image: url("img/basicMonitor/kpi-4.png");
}

.db2Summary-kpi>span {
	width: calc(( 100% - 10px)/2);
	height: 104px;
	border-radius: 2px;
	background-color: #f1f0f5;
	background-position: 12px center;
	background-repeat: no-repeat;
	padding-left: 66px;
	padding-top: 30px;
	box-sizing: border-box;
	font-size: 24px;
}

.db2Summary-kpi {
	display: flex;
	flex-wrap: wrap;
	height: 220px;
}

.db2Summary-event {
	float: right;
	width: 180px;
	height: 220px;
}

.db2Summary-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.db2Summary-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
}

.db2Summary-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
}

.db2Summary-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.db2Summary-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.db2Summary-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
}

.db2Summary-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.db2Summary-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.db2Summary-event>span>span {
	flex: auto;
	position: relative;
}

.db2Summary-event>span+span {
	margin-top: 10px;
}

.db2Summary-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.db2Summary-event>span {
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

.db2Summary-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px;
}

button.comparison {
	background-position: 7px center;
	background-repeat: no-repeat;
	padding: 0 10px 0 22px;
	line-height: 22px;
}

button.comparison {
	background-image: url("img/basicMonitor/comparison-black.png");
}

button.comparison:HOVER {
	background-image: url("img/basicMonitor/comparison-blue.png");
	color: #5b62f9;
}

button.comparison.disabled {
	background-image: url("img/basicMonitor/comparison-gray.png");
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

table.dataTable tbody tr td:nth-child(11), table.dataTable tbody tr td:nth-child(12){
	position: relative;
}

table.dataTable tbody tr td:nth-child(12)>span, table.dataTable tbody tr td:nth-child(11)>span
	{
	position: absolute;
	left: 10px;
	bottom: 4px;
	width: 100px;
	height: 3px;
	background-color: #D0D2FF;
	background-image: linear-gradient(to right, #5B62F9 0%, #5B62F9 100%);
	background-repeat: no-repeat;
	background-size: 0px 2px;
}
</style>

<section class="panel" style="margin: -20px -20px 0; height: 825px;">
	<p class="title">DB2总览</p>
	<div class="content">
		<div class="db2Summary-layout" style="margin-bottom: 20px;">
			<section class="panel" style="width: 284px;">
				<p class="title">实例状态统计</p>
				<div class="content">
					<div class="db2Summary-instanceCount" style="line-height: 140px;font-size: 54px;" id="insCount">-</div>
					<div>
						<span id="unHealthIns">-</span>
						<span id="healthIns">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="width: 330px;">
				<p class="title">关键KPI统计</p>
				<div class="content">
					<div class="db2Summary-kpi">
						<span id="lockCount">-</span>
						<span id="tabExcpt">-</span>
						<span id="longSql">-</span>
						<span id="longTask">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="flex: auto;">
				<p class="title">事件总览</p>
				<div class="content">
					<div class="db2Summary-event">
						<span id="alarmWaringCount">-</span>
						<span>
							<span id="warningCount">-</span>
							<span id="alarmCount">-</span>
						</span>
						<span id="todayEvent">-</span>
					</div>
					<div style="margin-right: 200px;height: 220px;" id="echarts"></div>
				</div>
			</section>
			
		</div>
		
		<button type="button" class="pull-left comparison disabled" style="position: absolute;z-index: 1;">比对</button>
		<table id="dataTable" class="display dataTable table">
			<thead>
				<tr>
					<th width="50"><input type="checkbox" /></th>
					<th>序号</th>
					<th>数据库实例名称</th>
					<th>健康度</th><!-- <span class="red">12</span>  div.red    div.yellow   div.green -->
					<th>死锁数</th>
					<th>表状态异常数</th>
					<th>超长语句</th>
					<th>超长事务</th>
					<th>包缓存命中率</th>
					<th>连接数</th>
					<th>CPU使用率（%）</th><!-- return 69% + ‘<span style="background-size: 69px 2px"></span>’ -->
					<th>内存使用率（%）</th><!-- return 69% + ‘<span style="background-size: 69px 2px"></span>’ -->
					<th>磁盘活动比（%）</th>
					<th>所属IP</th>
					<th>所属应用</th>
				</tr>
			</thead>
			<tbody>
				<!-- <tr>
					<td></td>
					<td>1</td>
					<td>1</td>
					<td><span class="red">12</span></td>
					<td>1</td>
					<td>1</td>
					<td>1</td>
					<td>1</td>
					<td>1</td>
					<td>1</td>
					<td>1<span></span></td>
					<td>1</td>
					<td>1</td>
					<td>1</td>
					<td>1</td>
				</tr> -->
			</tbody>
		</table>
	</div>
</section>





