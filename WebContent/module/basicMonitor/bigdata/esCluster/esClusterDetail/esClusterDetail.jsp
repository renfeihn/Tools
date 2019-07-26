<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.esClusterDetails-layout1, .esClusterDetails-layout2 {
	display: flex;
	width: 100%;
}

.esClusterDetails-layout1>section {
	height: 310px;
}

.esClusterDetails-layout2>section, .esClusterDetails-layout3>section {
	height: 300px;
}

.esClusterDetails-echarts {
	width: 100%;
	height: 220px;
}
/*基本信息*/
.esClusterDetails-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.esClusterDetails-queue>span:nth-child(1):before {
	content:attr(data-title);
	height: 0px;
	position: absolute;
	top: -15px;
}
/* 
.esClusterDetails-queue>span:nth-child(1):after {
	content: '';
	height: 30px;
	position: absolute;
	top: 10px;
	right: 45px;
} */

.esClusterDetails-queue>span:nth-child(1) {
	width: 100%;
	color: #2B2933;
	height: 140px;
	line-height: 120px;
	margin-bottom: 10px;
	padding-left: 130px;
	padding-top: 40px;
	font-size: 20px;
	font-weight: bolder;
	background: #F1F0F5 url(img/baseMonitor/elasticsearch.png) no-repeat 20px center;
	position: relative;
}

.esClusterDetails-queue>span:nth-child(2) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.esClusterDetails-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.esClusterDetails-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
}

.esClusterDetails-queue>span>span:nth-child(1):before {
	content: "节点总数 :";
}

.esClusterDetails-queue>span>span:nth-child(2):before {
	content: "活跃节点数:";
}

.esClusterDetails-zdzb {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}

.esClusterDetails-zdzb>span {
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

.esClusterDetails-zdzb>span:nth-child(1), .esClusterDetails-zdzb>span:nth-child(3)
	{
	margin-bottom: 10px;
}

.esClusterDetails-zdzb>span:nth-child(2n+1) {
	margin-right: 10px;
}

.esClusterDetails-zdzb>span:before {
	display: block;
	font-size: 12px;
	font-weight: normal;
	color: #606060;
	margin-bottom: 8px;
}

.esClusterDetails-zdzb>span:nth-child(1):before {
	content: "分片数";
}

.esClusterDetails-zdzb>span:nth-child(2):before {
	content: "索引数";
}

.esClusterDetails-zdzb>span:nth-child(3):before {
	content: "文档数";
}

.esClusterDetails-zdzb>span:nth-child(4):before {
	content: "消耗物理内存";
	left: 21%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.esClusterDetails-zdzb>span:nth-child(4):after {
	content: "MB";
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
/*事件*/
.esClusterDetails-event {
	float: right;
	width: 180px;
	height: 220px;
}

.esClusterDetails-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.esClusterDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.esClusterDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.esClusterDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.esClusterDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.esClusterDetails-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.esClusterDetails-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.esClusterDetails-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.esClusterDetails-event>span>span {
	flex: auto;
	position: relative;
}

.esClusterDetails-event>span+span {
	margin-top: 10px;
}

.esClusterDetails-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.esClusterDetails-event>span {
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

.esClusterDetails-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px;
}

.esClusterDetails-linkStatus-bottom {
	display: flex;
	width: 100%;
	height: 45px;
}

.esClusterDetails-linkStatus-bottom>span {
	display: inline-block;
	width: calc(( 100% - 30px)/3);
	border-radius: 2px;
	margin-top: 5px;
	text-align: center;
	color: #000;
}

.esClusterDetails-linkStatus-bottom>span:nth-child(1) {
	background: #5B62F9;
	color: #fff;
}

.esClusterDetails-linkStatus-bottom>span:nth-child(2),
	.esClusterDetails-linkStatus-bottom>span:nth-child(3),
	.esClusterDetails-linkStatus-bottom>span:nth-child(4) {
	margin-left: 10px;
	background: #F1F0F5;
}

.esClusterDetails-linkStatus-bottom>span:before {
	display: block;
	text-align: center;
	font-weight: 400;
}

.esClusterDetails-linkStatus-bottom>span:nth-child(1):before {
	content: "ESTABLISHED";
	color: #fff;
}

.esClusterDetails-linkStatus-bottom>span:nth-child(2):before {
	content: "CLOSE_WAIT";
	color: #333;
}

.esClusterDetails-linkStatus-bottom>span:nth-child(3):before {
	content: "TIME_WAIT";
	color: #333;
}

.esClusterDetails-event>span:nth-child(1), .esClusterDetails-event>span:nth-child(2)
	{
	cursor: pointer;
}

.esClusterDetails-event>span:nth-child(1), .esClusterDetails-event>span:nth-child(2)
	{
	cursor: pointer;
}

.esClusterDetails-tab-ctn .multiple-checkbox {
	width: 233px;
	top: -54px;
}

.esClusterDetails-tab-ctn .multiple-checkbox .item-container {
	max-height: 249px;
}
</style>



<div class="esClusterDetails-layout1">
	<section class="panel"
		style="flex: none; width: 284px; margin-right: 20px;">
		<p class="title">集群信息</p>
		<div class="content esClusterDetails-queue">
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
			<div class="esClusterDetails-zdzb">
				<span id="shardnum">-</span> <span id="indexnum">-</span> <span
					id="docnum">-</span> <span id="memsize">-</span>
			</div>
		</div>
	</section>
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="esClusterDetails-event">
				<span id="alarmWaring">-</span> <span> <span id="waringCount">-</span>
					<span id="alarmCount">-</span>
				</span> <span id="dayEventCount">-</span>
			</div>
			<div id="eEvent" style="margin-right: 200px; height: 220px;"></div>
		</div>
	</section>
</div>

<div class="esClusterDetails-layout2">
	<section class="panel"
		style="width: calc(( 100% - 20px)/2); margin-right: 20px;">
		<p class="title">查询速度</p>
		<div class="content" style="display: flex;">
			<div id="searchRate" class="esClusterDetails-echarts"
				style="width: calc(50vw - 116px);"></div>
		</div>
	</section>
	<section class="panel" style="width: calc(( 100% - 20px)/2);">
		<p class="title">索引速度</p>
		<div class="content" style="display: flex;">
			<div id="indexRate" class="esClusterDetails-echarts"
				style="width: calc(50vw - 116px);"></div>
		</div>
	</section>
</div>
