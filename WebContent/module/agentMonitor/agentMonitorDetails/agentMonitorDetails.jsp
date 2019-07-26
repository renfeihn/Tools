<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
	.AMAgentMonitorDetails-echarts {
		height: 300px;
		width: 100%;
		margin-bottom: 5px;
	}
	.AMAgentMonitorDetails-layout2,.AMAgentMonitorDetails-layout3,
	.AMAgentMonitorDetails-layout4 {
		display: flex;
		height: 320px;
	} 
	.AMAgentMonitorDetails-layout3 .dataTable{
		table-layout: fixed;
	}
	/*基本信息*/
	.AMAgentMonitorDetails-queue>span{
		display: flex;
		flex-direction: column;
    box-sizing: border-box;
    border-radius: 3px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	}
	.AMAgentMonitorDetails-queue>span:nth-child(1):before{
		content: attr(beforeContent);
		height: 30px;
	}
	.AMAgentMonitorDetails-queue>span:nth-child(1){
    width: 100%;
    color: #2B2933;
    height: 140px;
    line-height: 120px;
    margin-bottom: 10px;
    padding-left: 144px;
    font-size: 20px;
    font-weight: bolder;
   	background: #F1F0F5 url(img/agentManagerNew/agent.jpg) no-repeat 20px center; 
	}
	.AMAgentMonitorDetails-queue>span:nth-child(2){
		width: 100%;
		height: calc(100% - 150px);
		display: flex;
		flex-direction: column;
		padding:15px 20px;
	  font-weight: normal;
	  background: #5B62FB;
	}
	.AMAgentMonitorDetails-queue>span>span{
		white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}
	.AMAgentMonitorDetails-queue>span>span:before{
		display: inline-block;
		margin-right: 10px;
	}
	.AMAgentMonitorDetails-queue>span>span:nth-child(1):before{
		content:"代理IP地址 :";
	}
	.AMAgentMonitorDetails-queue>span>span:nth-child(2):before{
		content:"代理名称 :";
	}

	.AMAgentMonitorDetails-app {
		height: 225px;
		display: flex;
		flex-wrap: wrap;
	}
	.AMAgentMonitorDetails-app>span:before {
		display: block;
		font-size: 14px;
		margin-top: 11px;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #72717D;
	}
	.AMAgentMonitorDetails-app>span:nth-child(1):before {
		content: "CPU占用";
	}
	.AMAgentMonitorDetails-app>span:nth-child(2):before {
		content: "内存占用";
	}
	.AMAgentMonitorDetails-app>span:nth-child(3):before {
		content: "进程数量";
	}
	.AMAgentMonitorDetails-app>span:nth-child(4):before {
		content: "最后采集时间";
	}
	.AMAgentMonitorDetails-app>span {
		width: calc((100% - 10px)/2);
		height: 100px;
		background: #F1F0F5;
		border-radius: 2px;
		font-size: 20px;
		font-weight: 400;
		line-height: 22px;
		text-align: center;
		padding: 20px 0;
		box-sizing: border-box;
	}
	.AMAgentMonitorDetails-app>span:nth-child(2n+1) {
		margin-right: 10px;
	}
	.AMAgentMonitorDetails-app>span:nth-child(n+3) {
		margin-top: 10px;
	}
	/*事件*/
	.AMAgentMonitorDetails-event {
		float: right;
		width: 180px;
		height: 220px;
	}
	.AMAgentMonitorDetails-event>span:nth-child(1):BEFORE {
		content: '未解决事件总数';
	}
	.AMAgentMonitorDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
		content: '预警';
		display: block;
	  font-size: 14px;
	  color: #666;
	}
	.AMAgentMonitorDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
		content: '告警';
		display: block;
	  font-size: 14px;
	  color: #666;
	}
	.AMAgentMonitorDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
		background-color: #5b62f9;
	}
	.AMAgentMonitorDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
		background-color: #fb8229;
	}
	.AMAgentMonitorDetails-event>span:nth-child(3):BEFORE {
		content: '当日事件总数';
		color: #666;
	}
	.AMAgentMonitorDetails-event>span:nth-child(1) {
		background-color: #5b62f9;
		color: #FFF;
		font-size: 36px;
		height: 70px;
	}
	.AMAgentMonitorDetails-event>span>span:AFTER {
		content: '';
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
	  left: 22px;
	  top: 7px;
	}
	.AMAgentMonitorDetails-event>span>span {
		flex: auto;
		position: relative;
	}
	.AMAgentMonitorDetails-event>span+span {
		margin-top: 10px;
	}
	.AMAgentMonitorDetails-event>span:BEFORE {
		display: block;
		margin-bottom: 6px;
		font-size: 14px;
	}
	.AMAgentMonitorDetails-event>span {
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
	.AMAgentMonitorDetails-event>span:nth-child(2) {
		flex-direction: row;
		background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%) no-repeat center center;
		background-size: 1px 50px; 
	}
	
	.AMAgentMonitorDetails-event>span:nth-child(1),
	.AMAgentMonitorDetails-event>span:nth-child(2){
		cursor: pointer;
	}
	.AMAgentMonitorDetails-layout3 p.title>span{
		float: right;
	}
	.AMAgentMonitorDetails-layout3 p.title>span>span{
		margin-left: 20px;
	}
	.AMAgentMonitorDetails-layout3 p.title>span>span:before{
		content: attr(beforeContent);
		margin-right: 10px;
	}
	.AMAgentMonitorDetails-quickRangeSelect{
		margin: 0;
		width: 100%;
	}
	.AMAgentMonitorDetails-quickRangeSelect>li{
		width: calc((100% - 42px)/4);
	    height: 40px;
	    line-height: 38px;
	    padding: 0 20px;
	    box-sizing: border-box;
	    margin-right: 10px !important;
	    display: inline-block;
	    border: 1px solid #c7c6cb;
	    border-radius: 3px;
	    text-align: center;
	    margin-bottom: 10px !important;
	}
	.AMAgentMonitorDetails-quickRangeSelect>li.active{
		border:1px solid #5a62f9;
	}
	.AMAgentMonitorDetails-quickRangeSelect>li:nth-child(4n+4){
		margin-right: 0 !important;
	}
	.AMAgentMonitorDetails-dateRangeChoose{
		position: relative;
	    color: #5c5a66;
	    z-index: 1;
	    font-size: 12px;
	    background-color: #fff;
	    width: 420px;
	    border: 1px solid #c7c6ce;
	    display: inline-block;
	}
	.AMAgentMonitorDetails-dateRangeChoose>span{
		width: 340px;
		height: 38px;
		line-height: 38px;
		display: block;
		color: #5c5a66;
		position: relative;
		cursor: pointer;
		padding: 0 60px 0 20px;
		text-align: center;
	}
	.AMAgentMonitorDetails-dateRangeChoose:after{
		content: '';
		height: 100%;
	    width: 40px;
	    position: absolute;
	    right: 0;
	    top: 0;
	    border-left: 1px solid #c7c6cd;
	    background: #f9f9fb url(img/logSearch/time.jpg) no-repeat center center;
	}
	.AMAgentMonitorDetails-dateRangeChooseContent{
		display: none;
		position: absolute;
		width: 616px;
		top: 40px;
		left: 0px;
		background-color: #fff;
		box-shadow: 0px 10px 31px rgba(0,0,0,0.2);
	}
	.AMAgentMonitorDetails-dateRangeChooseContent a{
		box-sizing: content-box;
	}
	.AMAgentMonitorDetails-dateRangeChooseContent li.active>a{
		color: #5a62f9;
	}
	.AMAgentMonitorDetails-dateRangeChooseBtn{
		height: 32px;
		padding: 0 20px;
		margin-bottom: 20px !important;
		display: none;
	}
	.AMAgentMonitorDetails-dateRangeChooseBtn>button{
		float: right;
	}
</style>

<div class="AMAgentMonitorDetails-layout1" style="height: 320px;display: flex;">
	<section class="panel" style="flex: none;width:284px;margin-right: 20px;">
		<p class="title">基本信息</p>
		<div class="content AMAgentMonitorDetails-queue">
			<span id="version" beforeContent="Linux">-</span>
			<span><span id="ip">-</span><span id="agentName">-</span></span>
		</div>
	</section>
	<section class="panel" style="width: 390px;margin-right: 20px;">
		<p class="title">应用汇总</p>
		<div class="content">
			<div class="AMAgentMonitorDetails-app">
				<span id="cpu">-</span><span id="mem">-</span>
				<span id="keyBufferRate">-</span><span id="queryCacheRate">-</span>
			</div>
		</div>
	</section>
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="AMAgentMonitorDetails-event">
				<span id="alarmWaring">0</span>
				<span>
					<span id="waringCount">-</span>
					<span id="alarmCount">-</span>
				</span>
				<span id="dayEventCount">-</span>
			</div>
			<div id="eEvent" style="margin-right: 200px;height: 220px;"></div>
		</div>
	</section>
</div>
<div style="display:  flex; padding: 0 20px;">
	<span style="line-height: 38px;">时间选择：</span>
	<div id='dateSetectWarp' class="AMAgentMonitorDetails-dateRangeChoose">
		<input type="text" id="dateSetectInput" style="display: none;">
		<span id="dateSetect"></span>
		<div id='dateSetectContent' class="AMAgentMonitorDetails-dateRangeChooseContent">
			<ul id="dateRangeTab" class="nav nav-tabs nav-underLine">
				<li class="active" style="width: 98px;"><a href="#tabsDate1" data-toggle="tab">快速选择</a></li>
				<li><a href="#tabsDate2" data-toggle="tab">自定义</a></li>
			</ul>
			<div class="tab-content">
				<div id="tabsDate1" class="tab-pane active" style="padding: 10px 10px 0 10px;">
					<ul id="quickRange" class="AMAgentMonitorDetails-quickRangeSelect">
						<li data-func="oneMinute" data-value="60">1分钟</li>
						<li data-func="fiveMinute" data-value="300">5分钟</li>
						<li data-func="fifteenMinute" data-value="900">15分钟</li>
						<li data-func="oneHour" data-value="3600">1小时</li>
						<li data-func="fourHour" data-value="14400">4小时</li>
						<li data-func="twelveHour" data-value="43200">12小时</li>
						<li data-func="oneDay" data-value="86400">1天</li>
						<li data-func="oneWeek" data-value="604800">1周</li>
					</ul>
				</div>
				<div id="tabsDate2" class="tab-pane" style="height: 360px;">
				</div>
			</div>
			<div class="AMAgentMonitorDetails-dateRangeChooseBtn"><button type="button" id="dataRangeSetectBtn" class="confirmBtn">确定</button></div>
		</div>
	</div>
</div>

<div class="AMAgentMonitorDetails-layout2" style="margin-top: 20px;height: 400px;">
	<section class="panel" style="width: calc((100% - 20px)/2);margin-right: 20px;">
		<p class="title">cpu</p>
		<div class="content">
			<div class="AMAgentMonitorDetails-echarts" id="eCpu"></div>
		</div>
	</section>
	<section class="panel" style="width: calc((100% - 20px)/2);">
		<p class="title">内存</p>
		<div class="content">
			<div class="AMAgentMonitorDetails-echarts" id="eMem"></div>
		</div>
	</section>
</div>
