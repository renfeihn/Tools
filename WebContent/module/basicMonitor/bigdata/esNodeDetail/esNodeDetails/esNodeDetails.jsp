<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.esNodeDetail-layout1, .esNodeDetail-layout2, .esNodeDetail-layout3 {
	display: flex;
	width: 100%;
}

.esNodeDetail-layout1>section {
	height: 310px;
}

.esNodeDetail-layout2>section, .esNodeDetail-layout3>section {
	height: 300px;
}

.esNodeDetail-echarts {
	width: 100%;
	height: 220px;
}
/*基本信息*/
.esNodeDetail-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.esNodeDetail-queue>span:nth-child(1):before {
	content: attr(data-title);
	height: 0px;
	position: absolute;
	top: -15px;
}

/* .esNodeDetail-queue>span:nth-child(1):after {
	content: 'MQ';
	height: 30px;
	position: absolute;
	top: 10px;
	right: 45px;
}
 */
.esNodeDetail-queue>span:nth-child(1) {
	width: 100%;
	color: #2B2933;
	height: 140px;
	line-height: 120px;
	margin-bottom: 10px;
	padding-left: 144px;
	padding-top: 40px;
	font-size: 20px;
	font-weight: bolder;
	background: #F1F0F5 url(img/baseMonitor/elasticsearch.png) no-repeat 20px center;
	position: relative;
}

.esNodeDetail-queue>span:nth-child(2) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.esNodeDetail-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.esNodeDetail-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
}

.esNodeDetail-queue>span>span:nth-child(1):before {
	content: "服务地址 :";
}

.esNodeDetail-queue>span>span:nth-child(2):before {
	content: "服务端口 :";
}

.esNodeDetail-zdzb {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}

.esNodeDetail-zdzb>span {
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

.esNodeDetail-zdzb>span:nth-child(1), .esNodeDetail-zdzb>span:nth-child(3)
	{
	margin-bottom: 10px;
}

.esNodeDetail-zdzb>span:nth-child(2n+1) {
	margin-right: 10px;
}

.esNodeDetail-zdzb>span:before {
	display: block;
	font-size: 12px;
	font-weight: normal;
	color: #606060;
	margin-bottom: 8px;
}

.esNodeDetail-zdzb>span:nth-child(1):before {
	content: "cpu使用率";
}

.esNodeDetail-zdzb>span:nth-child(1):after {
	content: "%";
}

.esNodeDetail-zdzb>span:nth-child(2):before {
	content: "内存使用率";
}

.esNodeDetail-zdzb>span:nth-child(2):after {
	content: "%";
}

.esNodeDetail-zdzb>span:nth-child(3):before {
	content: "文件数";
}

.esNodeDetail-zdzb>span:nth-child(4):before {
	content: "节点类型";
	left: 21%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
/*事件*/
.esNodeDetail-event {
	float: right;
	width: 180px;
	height: 220px;
}

.esNodeDetail-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.esNodeDetail-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.esNodeDetail-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.esNodeDetail-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.esNodeDetail-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.esNodeDetail-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.esNodeDetail-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.esNodeDetail-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.esNodeDetail-event>span>span {
	flex: auto;
	position: relative;
}

.esNodeDetail-event>span+span {
	margin-top: 10px;
}

.esNodeDetail-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.esNodeDetail-event>span {
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

.esNodeDetail-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px;
}

.esNodeDetail-linkStatus-bottom {
	display: flex;
	width: 100%;
	height: 45px;
}

.esNodeDetail-linkStatus-bottom>span {
	display: inline-block;
	width: calc(( 100% - 30px)/3);
	border-radius: 2px;
	margin-top: 5px;
	text-align: center;
	color: #000;
}

.esNodeDetail-linkStatus-bottom>span:nth-child(1) {
	background: #5B62F9;
	color: #fff;
}

.esNodeDetail-linkStatus-bottom>span:nth-child(2),
	.esNodeDetail-linkStatus-bottom>span:nth-child(3),
	.esNodeDetail-linkStatus-bottom>span:nth-child(4) {
	margin-left: 10px;
	background: #F1F0F5;
}

.esNodeDetail-linkStatus-bottom>span:before {
	display: block;
	text-align: center;
	font-weight: 400;
}

.esNodeDetail-linkStatus-bottom>span:nth-child(1):before {
	content: "JVM堆使用率";
	color: #fff;
}

.esNodeDetail-linkStatus-bottom>span:nth-child(2):before {
	content: "JVM堆最大使用大小";
	color: #333;
}

.esNodeDetail-linkStatus-bottom>span:nth-child(3):before {
	content: "JVM堆当前使用大小";
	color: #333;
}

.esNodeDetail-event>span:nth-child(1), .esNodeDetail-event>span:nth-child(2)
	{
	cursor: pointer;
}

.esNodeDetail-event>span:nth-child(1), .esNodeDetail-event>span:nth-child(2)
	{
	cursor: pointer;
}

.esNodeDetail-tab-ctn .multiple-checkbox {
	width: 233px;
	top: -54px;
}

.esNodeDetail-tab-ctn .multiple-checkbox .item-container {
	max-height: 249px;
}
</style>



<div class="esNodeDetail-layout1">
	<section class="panel"
		style="flex: none; width: 284px; margin-right: 20px;">
		<p class="title">基本信息</p>
		<div class="content esNodeDetail-queue">
			<span id="version" data-title="">-</span> 
			<span>
				<span id="ip">-</span>
				<span id="port">-</span>
			</span>
		</div>
	</section>
	<section class="panel" style="width: 390px;; margin-right: 20px;">
		<p class="title">重点指标</p>
		<div class="content">
			<div class="esNodeDetail-zdzb">
				<span id="cpuuse">-</span> <span id="memuse">-</span> <span
					id="docs">-</span> <span id="type">-</span>
			</div>
		</div>
	</section>
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="esNodeDetail-event">
				<span id="alarmWaring">-</span> <span> <span id="waringCount">-</span>
					<span id="alarmCount">-</span>
				</span> <span id="dayEventCount">-</span>
			</div>
			<div id="eEvent" style="margin-right: 200px; height: 220px;"></div>
		</div>
	</section>
</div>

<div class="esNodeDetail-layout2">
	<section class="panel"
		style="width: calc(( 100% - 20px)/2); margin-right: 20px">
		<ul id="processUl" class="nav nav-tabs nav-public">
			<li class="active"><a href="#tabs1" data-toggle="tab">cpu使用率</a></li>
			<li><a href="#tabs2" data-toggle="tab">内存使用率</a></li>
		</ul>
		<div class="tab-content esNodeDetail-tab-ctn"
			style="overflow: visible;">
			<div id="tabs1" class="tab-pane active">
				<div id="eCpu" class="esNodeDetail-echarts"
					style="height: 220px; width: calc(50vw - 116px);"></div>
			</div>
			<div id="tabs2" class="tab-pane active">
				<div id="eMemory" class="esNodeDetail-echarts"
					style="height: 220px; width: calc(50vw - 116px);"></div>
			</div>
		</div>
	</section>
	<section class="panel" style="width: calc(( 100% - 20px)/2);">
		<p class="title">jvm堆使用大小</p>
		<div class="content">
			<div id="eJVM" class="esNodeDetail-echarts" style="height: 175px;"></div>
			<div class="esNodeDetail-linkStatus-bottom">
				<span id="jvmpercent">-</span> <span id="maxuse">-</span> <span
					id="currentuse">-</span>
			</div>
		</div>
	</section>
</div>
<div class="esNodeDetail-layout3">
	<section class="panel" style="width: calc(( 100% - 20px)/2);">
		<ul id="threadUL" class="nav nav-tabs nav-public">
			<li class="active"><a href="#tabs11" data-toggle="tab">线程数</a></li>
			<li><a href="#tabs21" data-toggle="tab">排队线程数</a></li>
			<li><a href="#tabs31" data-toggle="tab">拒绝线程数</a></li>
		</ul>
		<div class="tab-content esNodeDetail-tab-ctn"
			style="overflow: visible;">
			<div id="tabs11" class="tab-pane active">
				<div id="eThread" class="esNodeDetail-echarts"
					style="height: 220px; width: calc(50vw - 116px);"></div>
			</div>
			<div id="tabs21" class="tab-pane active">
				<div id="eQueue" class="esNodeDetail-echarts"
					style="height: 220px; width: calc(50vw - 116px);"></div>
			</div>
			<div id="tabs31" class="tab-pane active">
				<div id="eRejected" class="esNodeDetail-echarts"
					style="height: 220px; width: calc(50vw - 116px);"></div>
			</div>
		</div>
	</section>
	<section class="panel"
		style="width: calc(( 100% - 20px)/2); margin-left: 20px">
		<ul id="loadUl" class="nav nav-tabs nav-public">
			<li class="active"><a href="#tabs1" data-toggle="tab">平均负载</a></li>
			<li><a href="#tabs2" data-toggle="tab">片段数</a></li>
		</ul>
		<div class="tab-content esNodeDetail-tab-ctn"
			style="overflow: visible;">
			<div id="tabs1" class="tab-pane active">
				<div id="eLoad" class="esNodeDetail-echarts"
					style="height: 220px; width: calc(50vw - 116px);"></div>
			</div>
			<div id="tabs2" class="tab-pane active">
				<div id="eSegment" class="esNodeDetail-echarts"
					style="height: 220px; width: calc(50vw - 116px);"></div>
			</div>
		</div>
	</section>
</div>

