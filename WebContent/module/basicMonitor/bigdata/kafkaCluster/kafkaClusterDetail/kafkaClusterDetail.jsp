<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.kafkaClusterDetails-layout1, .kafkaClusterDetails-layout2 {
	display: flex;
	width: 100%;
}

.kafkaClusterDetails-layout1>section {
	height: 310px;
}

.kafkaClusterDetails-layout2>section, .kafkaClusterDetails-layout3>section {
	height: 300px;
}

.kafkaClusterDetails-echarts {
	width: 100%;
	height: 220px;
}
/*基本信息*/
.kafkaClusterDetails-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.kafkaClusterDetails-queue>span:nth-child(1):before {
	content:attr(data-title);
	height: 0px;
	position: absolute;
	top: -15px;
}
/* 
.kafkaClusterDetails-queue>span:nth-child(1):after {
	content: '';
	height: 30px;
	position: absolute;
	top: 10px;
	right: 45px;
} */

.kafkaClusterDetails-queue>span:nth-child(1) {
	width: 100%;
	color: #2B2933;
	height: 140px;
	line-height: 120px;
	margin-bottom: 10px;
	padding-left: 125px;
	padding-top: 40px;
	font-size: 20px;
	font-weight: bolder;
	background: #F1F0F5 url(img/baseMonitor/kafka.png) no-repeat 20px center;
	position: relative;
}

.kafkaClusterDetails-queue>span:nth-child(2) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.kafkaClusterDetails-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.kafkaClusterDetails-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
}

.kafkaClusterDetails-queue>span>span:nth-child(1):before {
	content: "节点总数 :";
}

.kafkaClusterDetails-queue>span>span:nth-child(2):before {
	content: "活跃节点数:";
}

.kafkaClusterDetails-zdzb {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}

.kafkaClusterDetails-zdzb>span {
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

.kafkaClusterDetails-zdzb>span:nth-child(1), .kafkaClusterDetails-zdzb>span:nth-child(3)
	{
	margin-bottom: 10px;
}

.kafkaClusterDetails-zdzb>span:nth-child(2n+1) {
	margin-right: 10px;
}

.kafkaClusterDetails-zdzb>span:before {
	display: block;
	font-size: 12px;
	font-weight: normal;
	color: #606060;
	margin-bottom: 8px;
}

.kafkaClusterDetails-zdzb>span:nth-child(1):before {
	content: "Consumer数";
}

.kafkaClusterDetails-zdzb>span:nth-child(2):before {
	content: "Producer数";
}

.kafkaClusterDetails-zdzb>span:nth-child(3):before {
	content: "Topic数";
}

.kafkaClusterDetails-zdzb>span:nth-child(4):before {
	content: "Controller在线数";
	left: 21%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* .kafkaClusterDetails-zdzb>span:nth-child(4):after {
	content: "MB";
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
} */
/*事件*/
.kafkaClusterDetails-event {
	float: right;
	width: 180px;
	height: 220px;
}

.kafkaClusterDetails-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.kafkaClusterDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.kafkaClusterDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.kafkaClusterDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.kafkaClusterDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.kafkaClusterDetails-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.kafkaClusterDetails-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.kafkaClusterDetails-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.kafkaClusterDetails-event>span>span {
	flex: auto;
	position: relative;
}

.kafkaClusterDetails-event>span+span {
	margin-top: 10px;
}

.kafkaClusterDetails-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.kafkaClusterDetails-event>span {
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

.kafkaClusterDetails-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px;
}

.kafkaClusterDetails-linkStatus-bottom {
	display: flex;
	width: 100%;
	height: 45px;
}

.kafkaClusterDetails-linkStatus-bottom>span {
	display: inline-block;
	width: calc(( 100% - 30px)/3);
	border-radius: 2px;
	margin-top: 5px;
	text-align: center;
	color: #000;
}

.kafkaClusterDetails-linkStatus-bottom>span:nth-child(1) {
	background: #5B62F9;
	color: #fff;
}

.kafkaClusterDetails-linkStatus-bottom>span:nth-child(2),
	.kafkaClusterDetails-linkStatus-bottom>span:nth-child(3),
	.kafkaClusterDetails-linkStatus-bottom>span:nth-child(4) {
	margin-left: 10px;
	background: #F1F0F5;
}

.kafkaClusterDetails-linkStatus-bottom>span:before {
	display: block;
	text-align: center;
	font-weight: 400;
}

.kafkaClusterDetails-linkStatus-bottom>span:nth-child(1):before {
	content: "ESTABLISHED";
	color: #fff;
}

.kafkaClusterDetails-linkStatus-bottom>span:nth-child(2):before {
	content: "CLOSE_WAIT";
	color: #333;
}

.kafkaClusterDetails-linkStatus-bottom>span:nth-child(3):before {
	content: "TIME_WAIT";
	color: #333;
}

.kafkaClusterDetails-event>span:nth-child(1), .kafkaClusterDetails-event>span:nth-child(2)
	{
	cursor: pointer;
}

.kafkaClusterDetails-event>span:nth-child(1), .kafkaClusterDetails-event>span:nth-child(2)
	{
	cursor: pointer;
}

.kafkaClusterDetails-tab-ctn .multiple-checkbox {
	width: 233px;
	top: -54px;
}

.kafkaClusterDetails-tab-ctn .multiple-checkbox .item-container {
	max-height: 249px;
}
</style>



<div class="kafkaClusterDetails-layout1">
	<section class="panel"
		style="flex: none; width: 284px; margin-right: 20px;">
		<p class="title">集群信息</p>
		<div class="content kafkaClusterDetails-queue">
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
			<div class="kafkaClusterDetails-zdzb">
				<span id="consumernum">-</span> 
				<span id="producernum">-</span> 
				<span id="topicnum">-</span>
				<span id="controllernum">-</span>
			</div>
		</div>
	</section>
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="kafkaClusterDetails-event">
				<span id="alarmWaring">-</span>
				<span> 
					<span id="waringCount">-</span>
					<span id="alarmCount">-</span>
				</span> 
				<span id="dayEventCount">-</span>
			</div>
			<div id="eEvent" style="margin-right: 200px; height: 220px;"></div>
		</div>
	</section>
</div>

<div class="kafkaClusterDetails-layout2">
	<section class="panel"
		style="width: calc(( 100% - 20px)/2); margin-right: 20px;">
		<p class="title">消息流入速率</p>
		<div class="content" style="display: flex;">
			<div id="messageInRate" class="kafkaClusterDetails-echarts"
				style="width: calc(50vw - 116px);"></div>
		</div>
	</section>
	<section class="panel" style="width: calc(( 100% - 20px)/2);">
		<p class="title">字节流入流出速率</p>
		<div class="content" style="display: flex;">
			<div id="BytesRate" class="kafkaClusterDetails-echarts"
				style="width: calc(50vw - 116px);"></div>
		</div>
	</section>
</div>
