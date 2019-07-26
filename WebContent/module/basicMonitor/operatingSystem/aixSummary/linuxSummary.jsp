<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.aixSummary-layout {
	display: flex;
}

.aixSummary-layout>section+section {
	margin-left: 20px;
}

.aixSummary-instanceCount+div {
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
.aixSummary-instanceCount+div>span:nth-child(1):BEFORE {
	content: '非健康实例';
}
.aixSummary-instanceCount+div>span:nth-child(2):BEFORE {
	content: '健康实例';
}
.aixSummary-instanceCount+div>span:BEFORE {
	display: block;
	font-size: 14px;
}
.aixSummary-instanceCount+div>span {
	font-size: 24px;
	color: #FFF;
	text-align: center;
	flex: auto;
}
.aixSummary-instanceCount {
	line-height: 140px;
	font-size: 54px;
	font-weight: bold;
	height: 140px;
	border-radius: 2px;
	background: #f1f0f5 url("img/baseMonitor/AIX.png") 20px center no-repeat;
	margin-bottom: 10px;
	text-align: right;
	padding-right: 20px;
}

.aixSummary-kpi>span:nth-child(2n) {
	margin-left: 10px;
}
.aixSummary-kpi>span:nth-child(n+3) {
	margin-top: 10px;
}
.aixSummary-kpi>span:BEFORE {
	font-size: 14px;
	display: block;
	margin-bottom: 6px;
	color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.aixSummary-kpi>span:nth-child(1):BEFORE {
	content: 'CPU>60%';
}
.aixSummary-kpi>span:nth-child(2):BEFORE {
	content: 'MEM>60%';
}
.aixSummary-kpi>span:nth-child(3):BEFORE {
	content: '磁盘>60%';
}
.aixSummary-kpi>span:nth-child(4):BEFORE {
	content: '网络>2kbps';
}
.aixSummary-kpi>span:nth-child(1) {
	background-image: url("img/aixSummary/cpu.png");
}
.aixSummary-kpi>span:nth-child(2) {
	background-image: url("img/aixSummary/mem.png");
}
.aixSummary-kpi>span:nth-child(3) {
	background-image: url("img/aixSummary/cp.png");
}
.aixSummary-kpi>span:nth-child(4) {
	background-image: url("img/aixSummary/net.png");
}
.aixSummary-kpi>span {
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
.aixSummary-kpi {
	display: flex;
	flex-wrap: wrap;
	height: 220px;
}

.aixSummary-event {
	float: right;
	width: 180px;
	height: 220px;
}
.aixSummary-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}
.aixSummary-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
    font-size: 14px;
    color: #666;
}
.aixSummary-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
    font-size: 14px;
    color: #666;
}
.aixSummary-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}
.aixSummary-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}
.aixSummary-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}
.aixSummary-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}
.aixSummary-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
    left: 22px;
    top: 7px;
}
.aixSummary-event>span>span {
	flex: auto;
	position: relative;
}
.aixSummary-event>span+span {
	margin-top: 10px;
}
.aixSummary-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}
.aixSummary-event>span {
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
.aixSummary-event>span:nth-child(2) {
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
	<p class="title">AIX总览</p>
	<div class="content">
		<div class="aixSummary-layout" style="margin-bottom: 20px;">
			<section class="panel" style="width: 284px;">
				<p class="title">实例状态统计</p>
				<div class="content">
					<div id="instanceCount" class="aixSummary-instanceCount" style="line-height: 140px;font-size: 54px;">-</div>
					<div>
						<span id="unHealthInstances">-</span>
						<span id="healthInstances">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="width: 330px;">
				<p class="title">关键KPI统计</p>
				<div class="content">
					<div class="aixSummary-kpi">
						<span title="CPU>60%" id="cpuCount">-</span>
						<span title="MEM>60%" id="memCount">-</span>
						<span title="磁盘>60%" id="diskCount">-</span>
						<span title="网络>2kbps" id="netCount">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="flex: auto;">
				<p class="title">事件总览</p>
				<div class="content">
					<div class="aixSummary-event">
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
					<th><input type="checkbox" /></th>
					<th>序号</th>
					<th>操作系统名称</th>
					<th>版本号</th>
					<th>健康度</th>
					<th>SWAP使用率(%)</th>
					<th>CPU使用率(%)</th>
					<th>内存使用率(%)</th>
					<th>磁盘IO(kbps)</th>
					<th>网络IO(kbps)</th>
					<th>所属IP</th>
					<th>所属应用</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>





