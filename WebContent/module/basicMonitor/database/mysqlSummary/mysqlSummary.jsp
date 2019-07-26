<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.mysqlSummary-layout1 {
		display: flex;
		height: 300px;
		margin-bottom: 20px;
	}
	.mysqlSummary-layout2 {
		display: flex;
	}
	.mysqlSummary-summary {
		display: flex;
		flex-direction: column;
		height: 218px;
	}
	.mysqlSummary-summary>span:nth-child(1) {
		height: 141px;
		margin-bottom: 10px; 
		background: #F1F0F5;
		border-radius: 3px;
		line-height: 141px;
		font-size: 54px;
		font-weight: 700;
		text-indent: 158px;
		background: url(img/mysql/mysqlSummary.png) 40px center no-repeat #F1F0F5;
	}
	.mysqlSummary-summary>span:nth-child(2) {
		flex: auto;
		border-radius: 3px;
		background-color: #5B62F9;
		background-image: linear-gradient(to bottom,#4D54D9 0%,#4D54D9 100%);
		background-size: 2px 40px;
		background-position: center center;
		background-repeat: no-repeat;
		color: #fff;
		font-size: 24px;
		font-weight: 400;
	}
	.mysqlSummary-summary>span:nth-child(2)>span:nth-child(1) {
		float: left;
		line-height: 20px;
		text-align: center;
		margin-left: 36px;
	}
	.mysqlSummary-summary>span:nth-child(2)>span:nth-child(1):before {
		content: "健康实例";
		font-size: 14px;
		display: block;
		margin-top: 11px;
		text-align: center;
	}
	.mysqlSummary-summary>span:nth-child(2)>span:nth-child(2) {
		float: right;
		line-height: 20px;
		text-align: center;
		margin-right: 22px;
	}
	.mysqlSummary-summary>span:nth-child(2)>span:nth-child(2):before {
		content: "非健康实例";
		font-size: 14px;
		display: block;
		margin-top: 10px;
		text-align: center;
	}
	.mysqlSummary-KPI {
		display: flex;
		flex-wrap: wrap;
		width: 350px;
	}
	.mysqlSummary-KPI>span:before {
		display: block;
		margin-top: 28px;
		font-size: 14px;;
	}
	.mysqlSummary-KPI>span {
		width: 170px;
		height: 104px;
		background: #F1F0F5;
		border-radius: 3px;
		font-size: 24px;
		text-align: center;
		line-height: 25px;
	}
	.mysqlSummary-KPI>span:nth-child(2n+1) {
		margin-right: 10px;
	}
	.mysqlSummary-KPI>span:nth-child(n+3) {
		margin-top: 10px;
	}
	.mysqlSummary-KPI>span:nth-child(1):before {
		content: "死锁数";
	}
	.mysqlSummary-KPI>span:nth-child(2):before {
		content: "当前会话数";
	}
	.mysqlSummary-KPI>span:nth-child(3):before {
		content: "数据库大小";
	}
	
	.mysqlSummary-KPI>span:nth-child(4):before {
		content: "主从延时";
	}
	.mysqlSummary-KPI>span:nth-child(4):after {
		content: "s";
	}
	.mysqlSummary-events {
		width: 181px;
		height: 218px;
		float:right;
		margin-left: 20px;
		margin-top: -6px;
	}
	.mysqlSummary-events span:BEFORE {
		font-size: 14px;
		display: block;
		margin-bottom: 4px;
		color: #5c5a66;
	}
	
	.mysqlSummary-events>span {
		position: relative;
		float: left;
		width: calc(100% - 10px);
		height: 67px;
		background: #f1f0f5;
		border-radius: 2px;
		margin: 5px;
		color: #2b2933;
		text-align: center;
		font-size: 24px;
		box-sizing: border-box;
		padding-top: 6px;
	}
	
	.mysqlSummary-events>span:nth-child(1) {
		background: #5b62f9;
		color: #fff;
		font-size: 36px;
		font-weight: 400;
		padding-top: 10px;
	}
	
	.mysqlSummary-events>span:nth-child(1):before {
		content: "未解除事件总数";
		color: #ffffff !important;
	}
	
	.mysqlSummary-events>span:nth-child(3) {
		padding-top: 10px;
	}
	
	.mysqlSummary-events>span:nth-child(3):before {
		content: "当日事件总数";
		color: #5c5a66;
		font-size: 14px;
	}
	
	.mysqlSummary-events>span:nth-child(2) {
		background-image: linear-gradient(to bottom, #AEADB3 0%, #AEADB3 100%);
		background-size: 2px 50px;
		background-position: center 10px;
		background-repeat: no-repeat;
		display: flex;
		padding-top: 10px;
	}
	
	.mysqlSummary-events>span>span:AFTER {
		content: "";
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		top: 8px;
		left: 23%;
	}
	
	.mysqlSummary-events>span>span {
		float: left;
		width: 50%;
		position: relative;
	}
	
	.mysqlSummary-events>span>span:nth-child(1):before {
		content: "预警";
	}
	
	.mysqlSummary-events>span>span:nth-child(2):before {
		content: "告警";
	}
	
	.mysqlSummary-events>span>span:nth-child(1):after {
		background: #5e63fd;
	}
	
	.mysqlSummary-events>span>span:nth-child(2):after {
		background: #fc862f;
	}
	.redCircle,.yellowCircle,.greenCircle {
		display: inline-block;
		width: 6px;
		height: 6px;
		margin:0 5px 1px 0;
		border-radius: 50%;
		background: #FF3341;
	}
	.yellowCircle {
		background: #FB8229;
	}
	.greenCircle {
		background: #22AC38;
	}
</style>

<section class="panel">
	<p class="title">mysql汇总</p>
	<div class="content">
		<div class="mysqlSummary-layout1">
			<section class="panel" style="flex: none;width: 284px;margin-right: 20px;">
				<p class="title">统计</p>
				<div class="content">
					<div class="mysqlSummary-summary">
						<span id="instanceCount">-</span>
						<span>
							<span id="healthInstances">-</span>
							<span id="unHealthInstances">-</span>
						</span>
					</div>
				</div>
			</section>
			<section class="panel" style="flex: none;width: 388px;margin-right: 20px;">
				<p class="title">关键KPI总统计</p>
				<div class="content">
					<div class="mysqlSummary-KPI">
						<span id="deadLockCount">-</span><span id="curSessionCount">-</span>
						<span id="dbSumSize">-</span><span id="masterSlaveDelay">-</span>
					</div>
				</div>
			</section>
			<section class="panel" style="flex: auto;">
				<p class="title">事件总览</p>
				<div class="content">
					<div class="mysqlSummary-echarts" id="eEvent" style="float: left;height: 220px;width: calc(100% - 201px);"></div>
					<div class="mysqlSummary-events" >
						<span class="single-block" id="undealingCount" label-flag="info">-</span>
						<span> <span id="warningCount" label-flag="info">-</span> <span
							id="alarmCount" label-flag="info">-</span>
						</span> <span class="single-block" id="todayEvent" label-flag="info">-</span>
					</div>
				</div>
			</section>
		</div>
		<div class="mysqlSummary-layout2">
			<section class="panel" style="height: 495px;">
				<p class="title">mysql列表</p>
				<div class="content" >
					<table id="dataTable" class="display dataTable table" >
						<thead>
							<tr>
								<th>数据库实例名</th>
								<th>分类结构</th>
								<th>QPS</th>
								<th>TPS</th>
								<th>连接数</th>
								<th>uptime</th>
								<th>进程占用cpu</th>
								<th>进程占用内存</th>
								<th>所属IP</th>
								<th>所属应用</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
		</div>
	</div>
</section>