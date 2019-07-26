<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.AMAgentMonitor-count {
		display: flex;
		flex-direction: column;
	}
	.AMAgentMonitor-count>span:nth-child(1) {
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
	.AMAgentMonitor-count>span:nth-child(2) {
		display: flex;
		width: 100%;
		height: 66px;
		background: #5B62F9;
		border-radius: 2px;
		box-sizing: border-box;
		font-size: 18px;
		color: #fff;
	}
	.AMAgentMonitor-count>span:nth-child(2)>span:before {
		display: block;
		text-align: center;
		margin-top: 12px;
		font-weight: 200;

	}
	.AMAgentMonitor-count>span:nth-child(2)>span {
		flex:1;
		text-align: center;
	}

	.AMAgentMonitor-count>span:nth-child(2)>span:nth-child(1):before {
		content: "在线";
	}
	.AMAgentMonitor-count>span:nth-child(2)>span:nth-child(2):before {
		content: "非在线";
		left: 25px;
	}
	.AMAgentMonitor-count>span:nth-child(2)>span:nth-child(2) {
		height: 36px;
		margin-top: 10px;
		border: solid 2px #4D53D9;
		border-color: transparent #4D53D9 transparent #4D53D9;
	}
	.AMAgentMonitor-count>span:nth-child(2)>span:nth-child(2):before {
		margin-top: 0;
	}
	.AMAgentMonitor-KPI {
		height: 217px;
	}
	.AMAgentMonitor-KPI>span {
		width: calc((100% - 20px)/3);
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
	.AMAgentMonitor-KPI>span:nth-child(3n){
		margin-right: 0;
	}
	.AMAgentMonitor-KPI>span:nth-child(n+4){
		margin-bottom: 0;
	}

	.AMAgentMonitor-KPI>span:before {
		display: block;
		text-align: center;
		width: 100%
		color: #5C5A66;
		font-size: 14px;
	}
	.AMAgentMonitor-KPI>span:nth-child(1):before {
		content: "Linux数";
	}
	.AMAgentMonitor-KPI>span:nth-child(2):before {
		content: "AIX数";
	}
	.AMAgentMonitor-KPI>span:nth-child(3):before {
		content: "windws数";
	}
	.AMAgentMonitor-KPI>span:nth-child(4):before {
		content: "Java数";
	}
	.AMAgentMonitor-KPI>span:nth-child(5):before {
		content: "Python数";
	}
	.AMAgentMonitor-KPI>span:nth-child(6):before {
		content: "Zabbix数";
	}
	
	.AMAgentMonitor-echarts {
		width: calc(100% - 201px);
		height: 217px;
		float: left;
		margin-right: 20px;
	}
	
	.AMAgentMonitor-events {
		float: left;
		width: 181px;
		height: 217px;
		margin-top: -5px;
	}
	.AMAgentMonitor-events span:BEFORE {
		font-size: 14px;
		display: block;
		margin-bottom: 4px;
		color: #5c5a66;
	}
	
	.AMAgentMonitor-events>span {
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
	
	.AMAgentMonitor-events>span:nth-child(1) {
		background: #5b62f9;
		color: #fff;
		font-size: 36px;
		font-weight: 400;
		padding-top: 10px;
		height: 70px;
	}
	
	.AMAgentMonitor-events>span:nth-child(1):before {
		content: "未解除事件总数";
		color: #ffffff !important;
	}
	.AMAgentMonitor-events>span:nth-child(3){
		padding-top:10px;
		height: 64px;
	}
	.AMAgentMonitor-events>span:nth-child(3):before {
		content: "当日事件总数";
		color: #5c5a66;
		font-size: 14px;
	}
	
	.AMAgentMonitor-events>span:nth-child(2) {
		background-image: linear-gradient(to bottom, #AEADB3 0%, #AEADB3 100%);
		background-size: 1px 50px;
		background-position: center 10px;
		background-repeat: no-repeat;
		display: flex;
		padding-top:10px;
		height: 64px;
	}
	
	.AMAgentMonitor-events>span>span:AFTER {
		content: "";
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		top: 8px;
		left: 25%;
	}
	.AMAgentMonitor-events>span>span {
		float: left;
		width: 50%;
		position: relative;
	}
	
	.AMAgentMonitor-events>span>span:nth-child(1):before {
		content: "预警";
	}
	
	.AMAgentMonitor-events>span>span:nth-child(2):before {
		content: "告警";
	}
	
	.AMAgentMonitor-events>span>span:nth-child(1):after {
		background: #5e63fd;
	}
	
	.AMAgentMonitor-events>span>span:nth-child(2):after {
		background: #fc862f;
	}
	.AMAgentMonitor-layout2 .redCircle,
	.AMAgentMonitor-layout2 .yellowCircle,
	.AMAgentMonitor-layout2 .greenCircle {
		display: inline-block;
		width: 6px;
		height: 6px;
		margin:0 5px 1px 0;
		border-radius: 50%;
		background: #FF3341;
	}
	.AMAgentMonitor-layout2 .yellowCircle {
		background: #FB8229;
	}
	.AMAgentMonitor-layout2 .greenCircle {
		background: #22AC38;
	}
	.AMAgentMonitor-table #dataTable_filter{
		position: absolute;
		top: -53px;
		right: 0;
	}
</style>
<div>
	<div class="AMAgentMonitor-layout1" style="display: flex;height: 320px;">
		<section class="panel" style="flex: none;width: 284px;margin-right: 20px;">
			<p class="title">代理统计</p>
			<div class="content">
				<div class="AMAgentMonitor-count">
					<span id="totalCount">-</span>
					<span >
						<span id="onLine">-</span>
						<span id="unLine">-</span>
					</span>
				</div>
			</div>
		</section>
		
		<section class="panel" style="flex: none;width: 388px;margin-right: 20px;">
			<p class="title">关键KPI汇总统计</p>
			<div class="content">
				<div class="AMAgentMonitor-KPI">
					<span id="linuxCount">0</span><span id="aixCount">
					-</span><span id="windowsCount">
					0</span><span id="javaCount">
					0</span><span id="pythonCount">
					0</span><span id="zabbixCount">0</span>
				</div>
			</div>
		</section>

		<section class="panel" style="flex: auto;">
			<p class="title">事件总览</p>
			<div class="content">
				<div class="AMAgentMonitor-echarts" id="eEvent" ></div>
				<div class="AMAgentMonitor-events" id="baseContent">
					<span class="single-block" id="unClosed" label-flag="info">0</span>
					<span id="currdata"> 
						<span id="waringCount" label-flag="info">-</span> 
						<span id="alarmCount" label-flag="info">-</span>
					</span> 
					<span class="single-block" id="eventNum" label-flag="info">-</span>
				</div>
			</div>
		</section>
	</div>
	<div class="AMAgentMonitor-layout2" style="margin-bottom: 20px;">
		<section class="panel" style="height: 467px;margin: 0;">
			<p class="title">代理列表</p>
			<div class="content AMAgentMonitor-table">
				<table id="dataTable" class="display dataTable table" style="height: auto;">
					<thead>
						<tr>
							<th>序号</th>
							<th>资源ID</th>
							<th>操作系统类型</th>
							<th>主机IP</th>
							<th>主机名</th>
							<th>代理进程数量</th>
							<th>代理CPU占用(%)</th>
							<th>代理内存占用(%)</th>
							<th>最后采集时间</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</section>
	</div>
</div>