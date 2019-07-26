<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.LCTMAppTotal-instanceCount+div {
	background-color: var(--color-theme);
	border-radius: 2px;
	background-image: linear-gradient(to bottom, var(--color-split) 0%, var(--color-split) 100%);
	background-size: 2px 38px;
	background-position: center center;
	background-repeat: no-repeat;
	display: flex;
	height: 66px;
	align-items: center;
}
.LCTMAppTotal-instanceCount+div>span:nth-child(1):BEFORE {
	content: '主机';
}
.LCTMAppTotal-instanceCount+div>span:nth-child(2):BEFORE {
	content: '日志源';
}
.LCTMAppTotal-instanceCount+div>span:BEFORE {
	display: block;
	font-size: 14px;
}
.LCTMAppTotal-instanceCount+div>span {
	font-size: 24px;
	color: #FFF;
	text-align: center;
	flex: auto;
	width: 50%;
}
.LCTMAppTotal-instanceCount {
    font-size: 22px;
    font-weight: bold;
    height: 140px;
    border-radius: 2px;
    background: #f1f0f5;
    margin-bottom: 10px;
    text-align: center;
    padding: 40px 10px;
    box-sizing: border-box;
    line-height: 30px;
}

.LCTMAppTotal-kpi{
	height: 255px;
	box-sizing: border-box;
}
.LCTMAppTotal-kpi>div{
	display: flex;
    height: calc((100% - 10px)/2);
}
.LCTMAppTotal-kpi>div:nth-child(1) {
	font-size: 20px;
}
.LCTMAppTotal-kpi>div:nth-child(1)>span {
	background-color: #F1F0F5;
	width: calc((100% - 20px)/3);
    cursor: pointer;
}
.LCTMAppTotal-kpi span{
	display: block;
	text-align: center;
	border-radius: 3px;
}
.LCTMAppTotal-kpi span:before{
	content: attr(title);
	font-size: 12px;
	display: block;
	text-align: center;
	color: #646574;
    margin-top: 28px;
}
.LCTMAppTotal-kpi>div:nth-child(1)>span:first-child,
.LCTMAppTotal-kpi>div:nth-child(1)>span:first-child:before{
	background-color: var(--color-theme);
	color: #fff;
}
.LCTMAppTotal-kpi>div:nth-child(1)>span+span{
	margin-left: 10px;
}
.LCTMAppTotal-kpi>div:nth-child(2){
	font-size: 14px;
	background: linear-gradient(to bottom,#CAC9CF 0%,#CAC9CF 100%);
	background-size: 1px 80%;
	background-repeat: no-repeat;
	background-position: 70% center;
	background-color: #F1F0F5;
	margin-top: 10px;
}
.LCTMAppTotal-kpi>div:nth-child(2)>span{
	display: block;
	font-size: 14px;
    width: calc((100% / 4));
    cursor: pointer;
}
.LCTMAppTotal-event {
	float: right;
	width: 180px;
	height: 220px;
}
.LCTMAppTotal-event>span {
	display: flex;
	border-radius: 2px;
	background-color: #f1f0f5;
	text-align: center;
	height: 104px;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	font-weight: normal;
	flex-direction: column;
}
.LCTMAppTotal-event>span:nth-child(1){
	margin-bottom: 10px;
}
.LCTMAppTotal-event>span:before{
	content: attr(beforeContent);
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}
.LCTMAppTotal-tree{
	width: 300px;
	flex: none;
	margin: 0;
}
.LCTMAppTotal-tree li{
	padding: 0 10px;
	box-sizing: border-box;
}
.LCTMAppTotal-tree li span{
	max-width: 180px;
    width: 180px;
}
.LCTMAppTotal-tree li a{
	display: inline-block;
}
.LCTMAppTotal-echartsWarp{
	flex: auto;
	background: #f1f0f5;
	padding:10px;
}
.LCTMAppTotal-eItem{
	width: 100%;
	height: 280px;
	background-color: #fff;
	padding: 20px;
	box-sizing: border-box;
	margin-bottom: 10px;
}
.LCTMAppTotal-eItem:last-child {
	margin-bottom: 0;
}
.LCTMAppTotal-echarts{
	width: calc(100% - 200px);
	height: 100%;
}
.LCTMAppTotal-echartsInfo{
	width: 180px;
	height: 100%;
	float: right;
}
.LCTMAppTotal-echartsInfo>span{
	display: flex;
	border-radius: 2px;
	background-color: #f1f0f5;
	text-align: center;
	height: calc((100% - 10px)/2);
	align-items: center;
	justify-content: center;
	font-size: 24px;
	font-weight: normal;
	flex-direction: column;
}
.LCTMAppTotal-echartsInfo>span:before{
	content: attr(beforeContent);
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}
.LCTMAppTotal-echartsInfo>span:nth-child(1){
	margin-bottom: 10px;
}
.circle-select {
	float: right;
    display: flex;
    height: 22px;
    line-height: 22px;
    margin: 8px 0 0 0;
}
.circle-select>span {
    width: 50px;
    text-align: center;
    font-size: 12px;
    border: 1px solid #c7c6cc;
    background-color: #f9f9fb;
    cursor: pointer;
}
.circle-select>span.active {
    border: 1px solid #5b62f9;
    background-color: #8086ff;
    color: #FFF;
}
</style>
<div style="margin-bottom: 20px;">
	<div style="display: flex;">
		<section class="panel" style="width: 284px;margin-right: 20px;">
			<p class="title">应用统计</p>
			<div class="content">
				<div id="appName" class="LCTMAppTotal-instanceCount">-</div>
				<div>
					<span id="hostCount">-</span>
					<span id="sourceCount">-</span>
				</div>
			</div>
		</section>
		<section class="panel" style="width: 400px;margin-right: 20px;">
			<p class="title">我的事件统计</p>
			<div class="content LCTMAppTotal-kpi" id="eventKpi">
				<div>
					<span title="未处理" id="dayEventUnhand">-</span>
					<span title="处理中" id="dayEventHanding">-</span>
					<span title="已处理" id="dayEventClosed">-</span>
				</div>
				<div>
					<span title="普通" id="dayWaringUnclosed">-</span>
					<span title="严重" id="dayAlarmUnclosed">-</span>
					<span title="紧急" id="urgencyHand">-</span>
					<span title="长时间未处理" id="longTimeUnHand" style="margin-right: 10px;">-</span>
			</div>
			</div>
		</section>
		<section class="panel" style="flex: auto;">
			<p class="title">应用总览
				<span class="circle-select">
					<span class="active" data-duration="1">日</span><span data-duration="2">周</span><span data-duration="3">月</span><span data-duration="4">季度</span>
				</span>
			</p>
			<div class="content">
				<div class="LCTMAppTotal-event">
					<span beforeContent="采集总量" id="dataSize">-</span>
					<span beforeContent="运行时间" id="dataTime">-</span>
				</div>
				<div id="eEvent" style="height: 220px;width:calc(100% - 200px)"></div>
			</div>
		</section>
	</div>
	<div class="LCTMAppTotal-content" style="display: flex;border:1px solid #ebebed;min-height: 300px;">
		<ul id="ztree" class="ztree LCTMAppTotal-tree">
			
		</ul>
		<div id="echartsList" class="LCTMAppTotal-echartsWarp">
			<!-- <div class="LCTMAppTotal-eItem">
				<div class="LCTMAppTotal-echartsInfo">
					<span beforeContent="采集总量">-</span>
					<span beforeContent="运行时间">-</span>
				</div>
				<div class="LCTMAppTotal-echarts"></div>
			</div> -->
		</div>
	</div>
</div>
