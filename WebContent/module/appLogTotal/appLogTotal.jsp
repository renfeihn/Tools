<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.appLogTotal-count {
		display: flex;
		flex-direction: column;
	}
	.appLogTotal-count>span:nth-child(1) {
		width: 100%;
		height: 141px;
		margin-bottom: 10px;
		background: #F1F0F5;
		border-radius: 2px;
		font-size: 54px;
		font-weight: 700;
		line-height: 141px;
		padding-left: 160px;
		box-sizing: border-box;
		background: url(img/agentManagerNew/agent.jpg) 10px center  no-repeat;
		background-color: #F1F0F5;
	}
	.appLogTotal-count>span:nth-child(2) {
		display: flex;
		width: 100%;
		height: 66px;
		background: #5B62F9;
		border-radius: 2px;
		box-sizing: border-box;
		font-size: 18px;
		color: #fff;
	}
	.appLogTotal-count>span:nth-child(2)>span:before {
		display: block;
		text-align: center;
		margin-top: 12px;
		font-weight: 200;

	}
	.appLogTotal-count>span:nth-child(2)>span {
		flex:1;
		text-align: center;
	}

	.appLogTotal-count>span:nth-child(2)>span:nth-child(1):before {
		content: "在线";
	}
	.appLogTotal-count>span:nth-child(2)>span:nth-child(2):before {
		content: "非在线";
		left: 25px;
	}
	.appLogTotal-count>span:nth-child(2)>span:nth-child(2) {
		height: 36px;
		margin-top: 10px;
		border: solid 2px #4D53D9;
		border-color: transparent #4D53D9 transparent #4D53D9;
	}
	.appLogTotal-count>span:nth-child(2)>span:nth-child(2):before {
		margin-top: 0;
	}
	.appLogTotal-KPI {
		height: 217px;
	}
	.appLogTotal-KPI>span {
		width: calc((100% - 10px)/2);
		height: calc((100% - 10px)/2);
		background: #F1F0F5;
		border-radius: 2px;
		box-sizing: border-box;
		font-size: 20px;
		padding: 30px 10px 10px 10px;
		margin-bottom: 10px;
		margin-right: 10px;
		display: inline-block;
		text-align: center;
	}
	.appLogTotal-KPI>span:nth-child(2n){
		margin-right: 0;
	}
	.appLogTotal-KPI>span:nth-child(n+3){
		margin-bottom: 0;
	}

	.appLogTotal-KPI>span:before {
		display: block;
		text-align: center;
		width: 100%
		color: #5C5A66;
		font-size: 14px;
	}
	.appLogTotal-KPI>span:nth-child(1):before {
		content: "日志对象数";
	}
	.appLogTotal-KPI>span:nth-child(2):before {
		content: "日志源数";
	}
	.appLogTotal-KPI>span:nth-child(3):before {
		content: "日志采集均速率";
	}
	.appLogTotal-KPI>span:nth-child(4):before {
		content: "日志采集总量";
	}
	
	.appLogTotal-echarts {
		width: calc(100% - 201px);
		height: 217px;
		float: left;
		margin-right: 20px;
	}
	
	.appLogTotal-events {
		float: left;
		width: 181px;
		height: 217px;
		margin-top: -5px;
	}
	.appLogTotal-events span:BEFORE {
		font-size: 14px;
		display: block;
		margin-bottom: 4px;
		color: #5c5a66;
	}
	
	.appLogTotal-events>span {
		position: relative;
		float: left;
		width: calc(100% - 10px);
		background: #f1f0f5;
		border-radius: 2px;
		margin: 5px;
		color: #2b2933;
		text-align: center;
		font-size: 24px;
		box-sizing: border-box;
		padding-top: 6px;
	}
	
	.appLogTotal-events>span:nth-child(1) {
		background: #5b62f9;
		color: #fff;
		font-size: 36px;
		font-weight: 400;
		padding-top: 10px;
		height: 70px;
	}
	
	.appLogTotal-events>span:nth-child(1):before {
		content: "未解除事件总数";
		color: #ffffff !important;
	}
	.appLogTotal-events>span:nth-child(3){
		padding-top:10px;
		height: 64px;
	}
	.appLogTotal-events>span:nth-child(3):before {
		content: "当日事件总数";
		color: #5c5a66;
		font-size: 14px;
	}
	
	.appLogTotal-events>span:nth-child(2) {
		background-image: linear-gradient(to bottom, #AEADB3 0%, #AEADB3 100%);
		background-size: 1px 50px;
		background-position: center 10px;
		background-repeat: no-repeat;
		display: flex;
		padding-top:10px;
		height: 64px;
	}
	
	.appLogTotal-events>span>span:AFTER {
		content: "";
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		top: 8px;
		left: 25%;
	}
	.appLogTotal-events>span>span {
		float: left;
		width: 50%;
		position: relative;
	}
	
	.appLogTotal-events>span>span:nth-child(1):before {
		content: "预警";
	}
	
	.appLogTotal-events>span>span:nth-child(2):before {
		content: "告警";
	}
	
	.appLogTotal-events>span>span:nth-child(1):after {
		background: #5e63fd;
	}
	
	.appLogTotal-events>span>span:nth-child(2):after {
		background: #fc862f;
	}
	.appLogTotal-layout2 .redCircle,
	.appLogTotal-layout2 .yellowCircle,
	.appLogTotal-layout2 .greenCircle {
		display: inline-block;
		width: 6px;
		height: 6px;
		margin:0 5px 1px 0;
		border-radius: 50%;
		background: #FF3341;
	}
	.appLogTotal-layout2 .yellowCircle {
		background: #FB8229;
	}
	.appLogTotal-layout2 .greenCircle {
		background: #22AC38;
	}
	.appLogTotal-table{
		overflow-y: auto;
		margin: 20px;
	}
</style>
<div>
	<div class="appLogTotal-layout1" style="display: flex;height: 320px;">
		<section class="panel" style="flex: none;width: 284px;margin-right: 20px;">
			<p class="title">应用日志统计</p>
			<div class="content">
				<div class="appLogTotal-count">
					<span id="totalCount">11</span>
					<span >
						<span id="onLine">1</span>
						<span id="unLine">10</span>
					</span>
				</div>
			</div>
		</section>
		
		<section class="panel" style="flex: none;width: 388px;margin-right: 20px;">
			<p class="title">关键KPI汇总统计</p>
			<div class="content">
				<div class="appLogTotal-KPI">
					<span id="linuxCount">21</span><span id="aixCount">
					11</span><span id="windowsCount">
					2M/S</span><span id="javaCount">
					18.13G</span>
				</div>
			</div>
		</section>

		<section class="panel" style="flex: auto;">
			<p class="title">事件总览</p>
			<div class="content">
				<div class="appLogTotal-echarts" id="eEvent" ></div>
				<div class="appLogTotal-events" id="baseContent">
					<span class="single-block" id="unClosed" label-flag="info">-</span>
					<span id="currdata"> 
						<span id="waringCount" label-flag="info">-</span> 
						<span id="alarmCount" label-flag="info">0</span>
					</span> 
					<span class="single-block" id="eventNum" label-flag="info">-</span>
				</div>
			</div>
		</section>
	</div>
	<div class="appLogTotal-layout2" style="margin-bottom: 20px;">
		<section class="panel" style="margin: 0;">
			<p class="title">应用列表</p>
			<div class="content appLogTotal-table" style="padding: 0;">
				<table id="treeTable" class="dataTable display table" style="margin: 0;">
					<thead>
						<tr>
							<th>应用系统ID</th>
							<th>应用系统名称</th>
							<th>日志源名称</th>
							<th>日志源对象</th>
							<th>采集状态</th>
							<th>采集类型</th>
							<th>当前速度</th>
							<th>采集总量</th>
							<th>交易日志笔数</th>
							<th>成功率</th>
							<th>平均耗时</th>
							<th>启动时间</th>
							<th>最后接入时间</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</section>
	</div>
</div>
