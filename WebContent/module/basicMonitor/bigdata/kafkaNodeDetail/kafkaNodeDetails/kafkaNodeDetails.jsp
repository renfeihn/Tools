<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.kafkaNodeDetail-layout1, .kafkaNodeDetail-layout2, .kafkaNodeDetail-layout3 {
	display: flex;
	width: 100%;
}

.kafkaNodeDetail-layout1>section {
	height: 310px;
}

.kafkaNodeDetail-layout2>section, .kafkaNodeDetail-layout3>section {
	height: 300px;
}

.kafkaNodeDetail-echarts {
	width: 100%;
	height: 220px;
}
/*基本信息*/
.kafkaNodeDetail-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.kafkaNodeDetail-queue>span:nth-child(1):before {
	content: attr(data-title);
	height: 0px;
	position: absolute;
	top: -15px;
}

/* .kafkaNodeDetail-queue>span:nth-child(1):after {
	content: 'MQ';
	height: 30px;
	position: absolute;
	top: 10px;
	right: 45px;
}
 */
.kafkaNodeDetail-queue>span:nth-child(1) {
	width: 100%;
	color: #2B2933;
	height: 140px;
	line-height: 120px;
	margin-bottom: 10px;
	padding-left: 144px;
	padding-top: 40px;
	font-size: 20px;
	font-weight: bolder;
	background: #F1F0F5 url(img/baseMonitor/kafka.png) no-repeat 20px center;
	position: relative;
}

.kafkaNodeDetail-queue>span:nth-child(2) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.kafkaNodeDetail-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.kafkaNodeDetail-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
}

.kafkaNodeDetail-queue>span>span:nth-child(1):before {
	content: "服务地址 :";
}

.kafkaNodeDetail-queue>span>span:nth-child(2):before {
	content: "服务端口 :";
}

.kafkaNodeDetail-zdzb {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}

.kafkaNodeDetail-zdzb>span {
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

.kafkaNodeDetail-zdzb>span:nth-child(1), .kafkaNodeDetail-zdzb>span:nth-child(3)
	{
	margin-bottom: 10px;
}

.kafkaNodeDetail-zdzb>span:nth-child(2n+1) {
	margin-right: 10px;
}

.kafkaNodeDetail-zdzb>span:before {
	display: block;
	font-size: 12px;
	font-weight: normal;
	color: #606060;
	margin-bottom: 8px;
}

.kafkaNodeDetail-zdzb>span:nth-child(1):before {
	content: "连接数";
}

.kafkaNodeDetail-zdzb>span:nth-child(2):before {
	content: "IO使用率";
}

.kafkaNodeDetail-zdzb>span:nth-child(3):before {
	content: "IO等待率";
}

.kafkaNodeDetail-zdzb>span:nth-child(4):before {
	content: "网络使用率";
	left: 21%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
/*事件*/
.kafkaNodeDetail-event {
	float: right;
	width: 180px;
	height: 220px;
}

.kafkaNodeDetail-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.kafkaNodeDetail-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.kafkaNodeDetail-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.kafkaNodeDetail-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.kafkaNodeDetail-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.kafkaNodeDetail-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.kafkaNodeDetail-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.kafkaNodeDetail-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.kafkaNodeDetail-event>span>span {
	flex: auto;
	position: relative;
}

.kafkaNodeDetail-event>span+span {
	margin-top: 10px;
}

.kafkaNodeDetail-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.kafkaNodeDetail-event>span {
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

.kafkaNodeDetail-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px;
}

.kafkaNodeDetail-linkStatus-bottom {
	display: flex;
	width: 100%;
	height: 45px;
}

.kafkaNodeDetail-linkStatus-bottom>span {
	display: inline-block;
	width: calc(( 100% - 30px)/3);
	border-radius: 2px;
	margin-top: 5px;
	text-align: center;
	color: #000;
}

.kafkaNodeDetail-linkStatus-bottom>span:nth-child(1) {
	background: #5B62F9;
	color: #fff;
}

.kafkaNodeDetail-linkStatus-bottom>span:nth-child(2),
	.kafkaNodeDetail-linkStatus-bottom>span:nth-child(3),
	.kafkaNodeDetail-linkStatus-bottom>span:nth-child(4) {
	margin-left: 10px;
	background: #F1F0F5;
}

.kafkaNodeDetail-linkStatus-bottom>span:before {
	display: block;
	text-align: center;
	font-weight: 400;
}

.kafkaNodeDetail-linkStatus-bottom>span:nth-child(1):before {
	content: "JVM堆使用率";
	color: #fff;
}

.kafkaNodeDetail-linkStatus-bottom>span:nth-child(2):before {
	content: "JVM堆最大使用大小";
	color: #333;
}

.kafkaNodeDetail-linkStatus-bottom>span:nth-child(3):before {
	content: "JVM堆当前使用大小";
	color: #333;
}

.kafkaNodeDetail-event>span:nth-child(1), .kafkaNodeDetail-event>span:nth-child(2)
	{
	cursor: pointer;
}

.kafkaNodeDetail-event>span:nth-child(1), .kafkaNodeDetail-event>span:nth-child(2)
	{
	cursor: pointer;
}

.kafkaNodeDetail-tab-ctn .multiple-checkbox {
	width: 233px;
	top: -54px;
}

.kafkaNodeDetail-tab-ctn .multiple-checkbox .item-container {
	max-height: 249px;
}
</style>



<div class="kafkaNodeDetail-layout1">
	<section class="panel"
		style="flex: none; width: 284px; margin-right: 20px;">
		<p class="title">基本信息</p>
		<div class="content kafkaNodeDetail-queue">
			<span id="version" data-title="kafka">-</span> 
			<span>
				<span id="ip">-</span>
				<span id="port">-</span>
			</span>
		</div>
	</section>
	<section class="panel" style="width: 390px;; margin-right: 20px;">
		<p class="title">重点指标</p>
		<div class="content">
			<div class="kafkaNodeDetail-zdzb">
				<span id="ccount">-</span> 
				<span id="io-ratio">-</span> 
				<span id="io-wait-ratio">-</span> 
				<span id="network-io-rate">-</span>
			</div>
		</div>
	</section>
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="kafkaNodeDetail-event">
				<span id="alarmWaring">-</span> <span> <span id="waringCount">-</span>
					<span id="alarmCount">-</span>
				</span> <span id="dayEventCount">-</span>
			</div>
			<div id="eEvent" style="margin-right: 200px; height: 220px;"></div>
		</div>
	</section>
</div>

<div class="kafkaNodeDetail-layout2">
	<section class="panel" style="width: calc(( 100% - 20px)/2); margin-right: 20px">
		<p class="title">连接数</p>
		<div class="content">
			<div id="eConnection" class="kafkaNodeDetail-echarts" style="height: 220px; width: calc(50vw - 116px);"></div>
		</div>
	</section>
	<section class="panel" style="width: calc(( 100% - 20px)/2);">
		<p class="title">IO使用率</p>
		<div class="content">
			<div id="eIORatio" class="kafkaNodeDetail-echarts" style="height: 220px; width: calc(50vw - 116px);"></div>
		</div>
	</section>
</div>
<div class="kafkaNodeDetail-layout3">
	<section class="panel" style="width: calc(( 100% - 20px)/2); margin-right: 20px">
		<p class="title">IO等待率</p>
		<div class="content">
			<div id="eIOWait" class="kafkaNodeDetail-echarts" style="height: 220px; width: calc(50vw - 116px);"></div>
		</div>
	</section>
	<section class="panel" style="width: calc(( 100% - 20px)/2); ">
		<ul id="ul" class="nav nav-tabs nav-public">
			<li class="active"><a href="#tabs1" data-toggle="tab">连接创建率</a></li>
			<li><a href="#tabs2" data-toggle="tab">连接失败率</a></li>
		</ul>
		<div class="tab-content esNodeDetail-tab-ctn" style="overflow: visible;">
			<div id="tabs1" class="tab-pane active">
				<div id="eCreation" class="kafkaNodeDetail-echarts"
					style="height: 220px; width: calc(50vw - 116px);"></div>
			</div>
			<div id="tabs2" class="tab-pane active">
				<div id="eClose" class="kafkaNodeDetail-echarts"
					style="height: 220px; width: calc(50vw - 116px);"></div>
			</div>
		</div>
	</section>
</div>

