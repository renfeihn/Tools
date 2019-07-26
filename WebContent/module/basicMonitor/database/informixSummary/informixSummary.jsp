<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.informixSummary-layout {
	display: flex;
}

.informixSummary-layout>section+section {
	margin-left: 20px;
}

.informixSummary-instanceCount+div {
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
.informixSummary-instanceCount+div>span:nth-child(1):BEFORE {
	content: '非健康实例';
}
.informixSummary-instanceCount+div>span:nth-child(2):BEFORE {
	content: '健康实例';
}
.informixSummary-instanceCount+div>span:BEFORE {
	display: block;
	font-size: 14px;
}
.informixSummary-instanceCount+div>span {
	font-size: 24px;
	color: #FFF;
	text-align: center;
	flex: auto;
}
.informixSummary-instanceCount+div>span:nth-child(1):AFTER,
.informixSummary-instanceCount+div>span:nth-child(2):AFTER {
	content: '台';
}
.informixSummary-instanceCount {
	line-height: 140px;
    font-size: 45px;
    font-weight: bold;
    height: 140px;
    border-radius: 2px;
    background: #f1f0f5 url(img/informixSummary/icon-informix.png) 10px center no-repeat;
    margin-bottom: 10px;
    text-align: right;
    padding-right: 20px;
}

.informixSummary-kpi>span:nth-child(2n) {
	margin-left: 10px;
}
.informixSummary-kpi>span:nth-child(n+3) {
	margin-top: 10px;
}
.informixSummary-kpi>span:BEFORE {
	font-size: 14px;
	display: block;
	margin-bottom: 6px;
	color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.informixSummary-kpi>span:BEFORE {
	content: attr(title);
}
.informixSummary-kpi>span {
    width: calc((100% - 10px) / 2);
    height: 102px;
    border-radius: 2px;
    background-color: #f1f0f5;
    padding-top: 30px;
    box-sizing: border-box;
    font-size: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
}
.informixSummary-kpi {
	display: flex;
	flex-wrap: wrap;
	height: 220px;
}

.informixSummary-event {
	float: right;
	width: 180px;
	height: 220px;
}
.informixSummary-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}
.informixSummary-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
    font-size: 14px;
    color: #666;
}
.informixSummary-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
    font-size: 14px;
    color: #666;
}
.informixSummary-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}
.informixSummary-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}
.informixSummary-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}
.informixSummary-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}
.informixSummary-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
    left: 22px;
    top: 7px;
}
.informixSummary-event>span>span {
	flex: auto;
	position: relative;
}
.informixSummary-event>span+span {
	margin-top: 10px;
}
.informixSummary-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}
.informixSummary-event>span {
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
.informixSummary-event>span:nth-child(2) {
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

.informixSummary-table tbody span.alarm:before,
.informixSummary-table tbody span.warning:before,
.informixSummary-table tbody span.prmot:before{
	content:'';
	width: 6px;
	height: 6px;
	border-radius: 50%;
	margin-right: 6px;	
    display: inline-block;
}
.informixSummary-table tbody span.alarm:before{
	background-color: #FF3341;
}

.informixSummary-table tbody span.warning:before{
	background-color: #F5C000;
}

.informixSummary-table tbody span.prmot:before{
	background-color: #22AC38;
}
</style>

<section class="panel" style="margin: -20px -20px 0;">
	<p class="title">INFORMIX实例汇总</p>
	<div class="content">
		<div class="informixSummary-layout" style="margin-bottom: 20px;">
			<section class="panel" style="width: 284px;">
				<p class="title">实例状态统计</p>
				<div class="content">
					<div id="insCount" class="informixSummary-instanceCount">-</div>
					<div>
						<span id="unHealthIns">-</span>
						<span id="healthIns">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="width: 330px;">
				<p class="title">关键KPI统计</p>
				<div class="content">
					<div class="informixSummary-kpi">
						<span title="锁数量" id="lockCount">-</span>
						<span title="长事务数量" id="longTask">-</span>
						<span title="表空间使用率过高" id="tabExcpt">-</span>
						<span title="会话数量" id="sessionNum">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="flex: auto;">
				<p class="title">事件总览</p>
				<div class="content">
					<div class="informixSummary-event">
						<span id="alarmWaringCount">-</span>
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
		
		<section class="panel">
			<p class="title">INFORMIX实例列表</p>
			<div class="content">
				<table id="dataTable" class="display dataTable table informixSummary-table">
					<thead>
						<tr>
							<th>序号</th>
							<th>实例名称</th>
							<th>健康度</th>
							<th>数据库状态</th>
							<th>数据库版本</th>
							<th>数据库运行时间</th>
							<th>id</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</section>
	</div>
</section>





