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
		font-size: 30px;
		font-weight: 700;
		line-height: 141px;
		padding-left: 130px;
		box-sizing: border-box;
		background: url(img/agentManagerNew/agent.jpg) 10px center  no-repeat;
		background-color: #F1F0F5;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.AMAgentMonitor-count>span:nth-child(2) {
		display: flex;
		width: 100%;
		height: 66px;
		background: var(--color-theme);
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
		content: "平台";
	}
	.AMAgentMonitor-count>span:nth-child(2)>span:nth-child(2):before {
		content: "自监控";
		left: 25px;
	}
	.AMAgentMonitor-count>span:nth-child(2)>span:nth-child(2) {
	    height: 36px;
	    margin-top: 10px;
	    border-left: solid 2px var(--color-split);
	}
	.AMAgentMonitor-count>span:nth-child(2)>span:nth-child(2):before {
		margin-top: 0;
	}
	.AMAgentMonitor-KPI {
		height: 217px;
	}
	.AMAgentMonitor-KPI>span {
		width: calc((100% - 10px));
		height: calc((100% - 10px)/2);
		background: #F1F0F5;
		border-radius: 2px;
		box-sizing: border-box;
		font-size: 24px;
		padding: 30px 10px 10px 10px;
		margin-bottom: 10px;
		margin-right: 10px;
		display: inline-block;
		text-align: center;
	}
	.AMAgentMonitor-KPI>span:nth-child(2n){
		margin-right: 0;
	}
	.AMAgentMonitor-KPI>span:nth-child(n+3){
		margin-bottom: 0;
	}

	.AMAgentMonitor-KPI>span:before {
		display: block;
		text-align: center;
		width: 100%;
		color: #5C5A66;
		font-size: 14px;
	}
	.AMAgentMonitor-KPI>span:nth-child(1):before {
		content: "已解除事件";
	}
	.AMAgentMonitor-KPI>span:nth-child(2):before {
		content: "长时间未解除";
	}
	.AMAgentMonitor-KPI>span:nth-child(3):before {
		content: "长时间未处理";
	}
	.AMAgentMonitor-KPI>span:nth-child(4):before {
		content: "转工单事件";
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
		background: var(--color-theme);
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
		/* background-image: linear-gradient(to bottom, #AEADB3 0%, #AEADB3 100%); */
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
		width: 100%;
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
	.AMAgentMonitor-filter{
		margin-bottom: 20px;
	}

	.AMAgentMonitor-filter input,
	.AMAgentMonitor-filter select{
		margin: 0;
	}

	.AMAgentMonitor-table #dataTable span.event-type {
		display: inline-block;
		border-radius: 10px;
		width: 50px;
		height: 20px;
		color: #FFF;
		text-align: center;
	}
	.AMAgentMonitor-table #dataTable  span.event-type.notice:BEFORE {
		content:'通知';
	}
	.AMAgentMonitor-table #dataTable  span.event-type.warning:BEFORE{
		content:'预警';
	}
	.AMAgentMonitor-table #dataTable  span.event-type.error:BEFORE{
		content:'告警';
	}
	.AMAgentMonitor-table #dataTable  span.event-type.notice {
		background: #22ac38;
	}
	.AMAgentMonitor-table #dataTable span.event-type.warning{
		background: #fb8229;
	}
	.AMAgentMonitor-table #dataTable span.event-type.error{
		background: #FF3341;
	}

	.AMAgentMonitor-table #dataTable tr td:last-child>span{
		color: var(--color-theme);
		text-decoration: underline;
		cursor: pointer;
	}

	.AMAgentMonitor-table #dataTable tr td:last-child>span.disabled{
		color: #9a9a9a;
		cursor: not-allowed;
	}

	.AMAgentMonitor-userModal .dataTables_scrollHeadInner{
		width: 100%;
	}
	.AMAgentMonitor-userModal .userSelect{
		cursor: pointer;
		font-size: 14px;
	}

	.AMAgentMonitor-userModal .userSelect.selected{
		color: var(--color-theme);
	}
	.searchInput-table input{
		margin: 0;
		margin-right: 10px;
	}
</style>
<div>
	<div class="AMAgentMonitor-layout1" style="display: flex;height: 320px;">
		<section class="panel" style="flex: none;width: 284px;margin-right: 20px;">
			<p class="title">事件统计</p>
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
					<span id="dealt">-</span><span id="dealingLongtime">
					-</span><!-- <span id="dealLongtime">
					-</span><span id="itilEvent">
					-</span> -->
				</div>
			</div>
		</section>

		<section class="panel" style="flex: auto;">
			<p class="title">事件总览</p>
			<div class="content">
				<div class="AMAgentMonitor-echarts" id="eEvent" ></div>
				<div class="AMAgentMonitor-events" id="baseContent">
					<span class="single-block" id="undealingCount" label-flag="info">-</span>
					<span id="currdata"> 
						<span id="warningCount" label-flag="info">-</span> 
					</span> 
					<span class="single-block" id="todayEvent" label-flag="info">-</span>
				</div>
			</div>
		</section>
	</div>
	<div class="AMAgentMonitor-layout2" style="margin-bottom: 20px;">
		<section class="panel" style="margin: 0;">
			<p class="title">事件列表</p>
			<div class="content AMAgentMonitor-table">
				<div class="AMAgentMonitor-filter">
					<!-- 事件类型 -->
					<select name="" id="eventList-eventType" class="hide">
						<option value="ALARM_WARING">全部事件</option>
						<option value="ALARM">告警</option>
						<option value="WARING">预警</option>
						<option value="INFO">通知</option>
					</select>
					处理状态
					<select name="" id="eventList-handleStatus">
						<option value="">全部</option>
						<option value="DEALING">未解除</option>
						<option value="DEALT">已解除</option>				
						<option value="DEALING_LONGTIME">长时间未解除</option>
					</select>
					<div class="eventList-time-ctn" style="display: inline-block; position: relative;">
						开始时间 <input id="eventTime1" type="text" style="width: 148px; height: 24px;"/>
					</div>
					<div class="eventList-time-ctn" style="display: inline-block; position: relative;">
						结束时间 <input id="eventTime2" type="text" style="width: 148px; height: 24px;"/></i>
					</div>
					关键字 <input id="searchInput" type="text" placeholder="请输入搜索条件">
					<button id="eventQueryBtn" type="button">查询</button>
					<button id="ignoreEvent" style="float: right;" type="button">批量忽略</button>
				</div>
				<table id="dataTable" class="display dataTable table searchInput-table" style="table-layout: fixed;">
					<thead>
						<tr>
							<th style="width: 90px;">序号</th>
							<th style="width: 90px;">事件类型</th>
							<th style="width: 90px;">事件来源</th>
							<th>事件摘要</th>
							<th style="width: 160px;">预警规则</th>
							<th style="width: 90px;">发生次数</th>
							<th style="width: 90px;">级别</th>
							<th style="width: 90px;">处理状态</th>
							<th style="width: 160px;">最后发生时间</th>
							<th style="width: 140px;">操作</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</section>
	</div>
</div>

<div id="userModal" class="modal hide fade AMAgentMonitor-userModal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">转工单</h3>
	</div>
	<div class="modal-body">
		<table id="userTable" class="display dataTable table">
			<thead>
				<tr>
					<th><i id="selectAll" class="fa fa-square-o userSelect"></i></th>
					<th>序号</th>
					<th>用户名称</th>
					<th>昵称</th>
					<th>权限</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
		<button type="button" class="confirmBtn">确定</button>
	</div>
</div>
