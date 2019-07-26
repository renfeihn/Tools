<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.stormDetails-layout1, .stormDetails-layout2 {
	display: flex;
	width: 100%;
}

.stormDetails-layout1>section {
	height: 310px;
}

.stormDetails-layout2>section, .stormDetails-layout3>section {
	height: 300px;
}

.stormDetails-echarts {
	width: 100%;
	height: 220px;
}
/*基本信息*/
.stormDetails-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.stormDetails-queue>span:nth-child(1):before {
	content:attr(data-title);
	height: 0px;
	position: absolute;
	top: -15px;
}
/* 
.stormDetails-queue>span:nth-child(1):after {
	content: '';
	height: 30px;
	position: absolute;
	top: 10px;
	right: 45px;
} */

.stormDetails-queue>span:nth-child(1) {
	width: 100%;
	color: #2B2933;
	height: 140px;
	line-height: 120px;
	margin-bottom: 10px;
	padding-left: 130px;
	padding-top: 40px;
	font-size: 20px;
	font-weight: bolder;
	background: #F1F0F5 url(img/baseMonitor/storm.png) no-repeat 20px center;
	position: relative;
}

.stormDetails-queue>span:nth-child(2) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.stormDetails-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.stormDetails-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
}

.stormDetails-queue>span>span:nth-child(1):before {
	content: "节点总数 :";
}

.stormDetails-queue>span>span:nth-child(2):before {
	content: "活跃节点数:";
}

.stormDetails-zdzb {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}

.stormDetails-zdzb>span {
	width: calc(( 100% - 10px)/2);
	height: 105px;
	background: #F1F0F5;
	border-radius: 2px;
	font-size: 26px;
	color: #000;
	text-align: center;
	padding-top: 30px;
	box-sizing: border-box;
}

.stormDetails-zdzb>span:nth-child(1), .stormDetails-zdzb>span:nth-child(3)
	{
	margin-bottom: 10px;
}

.stormDetails-zdzb>span:nth-child(2n+1) {
	margin-right: 10px;
}

.stormDetails-zdzb>span:before {
	display: block;
	font-size: 12px;
	font-weight: normal;
	color: #606060;
	margin-bottom: 8px;
}

.stormDetails-zdzb>span:nth-child(1):before {
	content: "slots使用比率";
}

.stormDetails-zdzb>span:nth-child(2):before {
	content: "Topology数量";
}

.stormDetails-zdzb>span:nth-child(3):before {
	content: "Supervisor数量";
}

.stormDetails-zdzb>span:nth-child(4):before {
	content: "任务数";
	left: 21%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.stormDetails-zdzb>span:nth-child(1):after {
	content: "%";
}
.stormDetails-zdzb>span:nth-child(4):after,.stormDetails-zdzb>span:nth-child(3):after,.stormDetails-zdzb>span:nth-child(2):after {
	content: "个";
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
/*事件*/
.stormDetails-event {
	float: right;
	width: 180px;
	height: 220px;
}

.stormDetails-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.stormDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.stormDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.stormDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.stormDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.stormDetails-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.stormDetails-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.stormDetails-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.stormDetails-event>span>span {
	flex: auto;
	position: relative;
}

.stormDetails-event>span+span {
	margin-top: 10px;
}

.stormDetails-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.stormDetails-event>span {
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

.stormDetails-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px;
}

.stormDetails-event>span:nth-child(1), .stormDetails-event>span:nth-child(2)
	{
	cursor: pointer;
}

.stormDetails-event>span:nth-child(1), .stormDetails-event>span:nth-child(2)
	{
	cursor: pointer;
}

#dataTable tbody tr td:FIRST-CHILD {
	color:#5B62FB;
}
#dataTable tbody tr td:FIRST-CHILD:HOVER {
	cursor: pointer;
	color:#5B62FB;
	text-decoration:underline;
}
</style>



<div class="stormDetails-layout1">
	<section class="panel"
		style="flex: none; width: 284px; margin-right: 20px;">
		<p class="title">集群信息</p>
		<div class="content stormDetails-queue">
			<span id="status" data-title="es">-</span>
			<span>
				<span id="nodecount">-</span>
				<span id="activenode">-</span>
			</span>
		</div>
	</section>
	<section class="panel" style="width: 390px;; margin-right: 20px;">
		<p class="title">重点指标</p>
		<div class="content">
			<div class="stormDetails-zdzb">
				<span id="slotsuse">-</span> <span id="topologynum">-</span> <span
					id="supervisornum">-</span> <span id="tasknum">-</span>
			</div>
		</div>
	</section>
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="stormDetails-event">
				<span id="alarmWaring">-</span> <span> <span id="waringCount">-</span>
					<span id="alarmCount">-</span>
				</span> <span id="dayEventCount">-</span>
			</div>
			<div id="eEvent" style="margin-right: 200px; height: 220px;"></div>
		</div>
	</section>
</div>

<div class="stormDetails-layout2">
	<section class="panel" style="flex: none; width: 100%; margin-right: 20px;">
	<p class="title">Topology列表</p>
		<table id="dataTable" class="display dataTable table"
			style="table-layout: fixed;">
			<thead>
				<tr>
					<th>名称</th>
					<th>owner</th>
					<th>状态</th>
					<th>运行时间</th>
					<th>已使用workers数</th>
					<th>任务数</th>
					<th>线程数</th>
					<th>副本数</th>
					<th>分配内存(MB)</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</section>
</div>
