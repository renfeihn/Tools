<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.afaInstance-layout {
	display: flex;
}

.afaInstance-layout>section+section {
	margin-left: 20px;
}

.afaInstance-instanceCount+div {
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

.afaInstance-instanceCount+div>span:nth-child(1):BEFORE {
	content: '健康实例';
}
.afaInstance-instanceCount+div>span:nth-child(1):AFTER {
	content: '个';
}

.afaInstance-instanceCount+div>span:nth-child(2):BEFORE {
	content: '非健康实例';
}
.afaInstance-instanceCount+div>span:nth-child(2):AFTER {
	content: '个';
}

.afaInstance-instanceCount+div>span:after {
	font-size: 12px;
}
.afaInstance-instanceCount+div>span:BEFORE {
	display: block;
	font-size: 14px;
}

.afaInstance-instanceCount+div>span {
	font-size: 24px;
	color: #FFF;
	text-align: center;
	width: calc(100% / 2);
}

.afaInstance-instanceCount {
	font-size: 54px;
	font-weight: bold;
	height: 140px;
	border-radius: 2px;
	background: #f1f0f5 url("") 20px center no-repeat;
	margin-bottom: 10px;
	text-align: right;
	padding-right: 10px;
	position: relative;
	padding-top: 20%;
	box-sizing: border-box;
	
}
.afaInstance-instanceCount>span:before {
   	display: block;
	font-size: 14px;
}
/* .afaInstance-instanceCount>span:after {
	content: "台";
    font-size: 12px;
    position: absolute;
    bottom: 20px;
} */
.afaInstance-instanceCount>span{
    width: 120px;
    height: 60px;
    text-align: center;
    display: block;
    float: right;
    position: relative;
    top: 10px;
}

.afaInstance-add>span:nth-child(n+3) {
	margin-top: 10px;
}

.afaInstance-add>span:BEFORE {
	font-size: 14px;
	display: block;
	margin-bottom: 6px;
	color: #666;
	content: attr(beforeContext);
}

.afaInstance-add>span:after {
	content: attr(afterContext);
}

.afaInstance-add>span {
	width: calc((100% - 10px)/2);
	height: calc((100% - 10px)/2);
	border-radius: 2px;
	background-color: #f1f0f5;
	background-position: 12px center;
	background-repeat: no-repeat;
	padding-top: 30px;
	box-sizing: border-box;
	font-size: 24px;
	text-align: center;
}

.afaInstance-add {
	display: flex;
	flex-wrap: wrap;
	height: 220px;
	justify-content: space-between;
}
.afaInstance-event {
	float: right;
	width: 180px;
	height: 220px;
}

.afaInstance-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.afaInstance-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
}

.afaInstance-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
}

.afaInstance-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.afaInstance-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.afaInstance-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
}

.afaInstance-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.afaInstance-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.afaInstance-event>span>span {
	flex: auto;
	position: relative;
}

.afaInstance-event>span+span {
	margin-top: 10px;
}

.afaInstance-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.afaInstance-event>span {
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

.afaInstance-event>span:nth-child(2) {
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
.afaInstance-table tbody>tr:HOVER{
	cursor: pointer;
}
.afaInstance-table #dataTable_filter{
    position: absolute;
    top: -52px;
    right: 0px;
}
.afaInstance-table #TabDataTable_filter{
    position: absolute;
    top: -52px;
    right: 0px;
}
.afaInstance-event>span:nth-child(1),
.afaInstance-event>span:nth-child(2){
	cursor: pointer;
}
</style>

<section class="panel">
	<p class="title" id="totalInfo">多实例总览</p>
	<div class="content">
		<div class="afaInstance-layout" style="margin-bottom: 20px;">
			<section class="panel" style="width: 284px;flex: none;">
				<p class="title" >实例状态统计</p>
				<div class="content">
					<div id="afaInstance-instanceCount" class="afaInstance-instanceCount">
						<span id="insCount">-</span>
					</div>
					<div>
						<span id="healthIns">-</span>
						<span id="unHealthIns">-</span>
					</div>
				</div>
			</section>
			
		<section class="panel" style="width: 390px;">
				<p class="title">多实例统计</p>
				<div class="content">
					<div id="afaInstance-kpi" class="afaInstance-add">
						<span id="allTrade">-</span>
						<span id="averTrade">-</span>
						<span id="errNum">-</span>
						<span id="succNum">-</span>
					</div>
				</div>
			</section>
			
			<section class="panel" style="flex: auto;">
				<p class="title">事件总览</p>
				<div class="content">
					<div class="afaInstance-event">
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
		<section id="appListSec" class="panel">
			<p class="title">实例列表</p>
			<div class="content afaInstance-table">
				<table id="dataTable" class="display dataTable table">
					<thead>
						<tr>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</section>
		<section id="appTabSec" class="panel">
			<ul id="appTab" class="nav nav-tabs nav-public">
				<!-- <li class="active"><a href="#tabs1">548785</a></li> -->
			</ul>
			<div id="appTabContainer" class="tab-content" style="overflow: initial;">
				<!-- <div id="tabs1" class="tab-pane active">
					<table id="TabDataTable" class="display dataTable table">
						<thead>
							<tr>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div> -->
			</div>
		</section>
	</div>
</section>





