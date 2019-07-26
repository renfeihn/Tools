<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.eventList-jumpPage {
	position: absolute;
    z-index: 2;
    height: 24px;
    line-height: 24px;
    margin-top: -24px;
    display: flex;
}
.eventList-jumpPage>input {
	width: 38px;
    margin: 0 4px;
}
.eventList-before-div {
	position: absolute;
	z-index: 2;
	height: 24px;
	font-size: 12px;
	align-items: center;
	width: calc(100% - 40px);
}
.eventList-before-div select {
	margin: 0 20px 0 10px;
}
#eventTable span.event-type,
#eventType span.event-type {
	display: inline-block;
	border-radius: 10px;
	width: 50px;
	height: 20px;
	color: #FFF;
	text-align: center;
}
#eventTable span.event-type.notice:BEFORE,
#eventType span.event-type.notice:BEFORE {
	content:'通知';
}
#eventTable span.event-type.warning:BEFORE,
#eventType span.event-type.warning:BEFORE {
	content:'预警';
}
#eventTable span.event-type.error:BEFORE,
#eventType span.event-type.error:BEFORE {
	content:'告警';
}
#eventTable span.event-type.notice,
#eventType span.event-type.notice {
	background: #22ac38;
}
#eventTable span.event-type.warning,
#eventType span.event-type.warning {
	background: #fb8229;
}
#eventTable span.event-type.error,
#eventType span.event-type.error {
	background: #FF3341;
}
#eventTable span.remove {
	color: #0Da8f8;
}
#eventTable span.no-remove {
	color: #e50012;
}
#eventTable span.remove:BEFORE {
	content:'已解除';
}
#eventTable span.no-remove:BEFORE {
	content:'未解除';
}
#eventTable span.lookpath {
	color: #5b62f9;
	cursor: pointer;
}
#eventTable span.lookpath:BEFORE {
	content: '查看详情';
}
.eventList-eventPath:BEFORE {
    content: '';
    position: absolute;
    width: 31px;
    height: 31px;
    transform: rotate(45deg);
    background: #22ac38;
    right: -15px;
    top: -15px;
}
.eventList-eventPath {
	border: 1px solid #DFDFE6;
	border-radius: 2px;
	padding: 20px;
	position: relative;
	overflow: hidden;
}
.eventList-eventPath>span#time {
	font-size: 12px;
	color: #787580;
	position: absolute;
	right: 20px;
}
.eventList-eventPath>p>span:BEFORE {
	color: #5c5a66;
	display: inline-block;
	width: 64px;
}
.eventList-eventPath>p>span {
	width: 120px;
}
.eventList-eventPath>p {
	display: flex;
	margin: 0 auto 6px;
	width: 332px;
	justify-content: space-between;
}
.eventList-eventPath #eventID {
	width: 100%;
}
.eventList-eventPath #eventID:BEFORE {
	content: '事件ID';
}
.eventList-eventPath #czr:BEFORE {
	content: '操作人';
}
.eventList-eventPath #cfcs:BEFORE {
	content: '触发次数';
}
.eventList-eventPath #cfcs:AFTER {
	content: '次';
}
.eventList-eventPath #dqcz:BEFORE {
	content: '当前操作';
}
.eventList-eventPath #dqcz {
	color: #5B62F9;
}
.eventList-eventPath #eventType:BEFORE {
	content: '事件类型';
}

.eventList-progress {
	height: 35px;
	background-image: linear-gradient(to right , #AEADB3 0%, #AEADB3 100%);
	background-size: 100% 2px;
	background-position: 0 8px;
	background-repeat: repeat-x;
	margin: 20px 0 0 0;
	display: flex;
}
.eventList-progress>li {
    flex: auto;
    background-image: linear-gradient(to right , #5b62f9 0%, #5b62f9 100%);
    background-size: 112px 2px;
    background-position: -112px 8px;
    background-repeat: no-repeat;
    position: relative;
}
.eventList-progress>li:BEFORE {
	content:'';
	border: 2px solid #AEADB3;
	width: 12px;
	height: 12px;
	border-radius: 6px;
	position: absolute;
	box-sizing: border-box;
	background: #FFF;
	left: 0;
	right: 0;
	top: 3px;
	margin: auto;
    box-shadow: 0 0 0 3px #FFF;
}
.eventList-progress>li.done:BEFORE {
	border: 2px solid #5b62f9;
}
.eventList-progress>li.doing:BEFORE {
	border: 2px solid #5b62f9;
	width: 16px;
	height: 16px;
	box-shadow: 0 0 0 3px #FFF;
}
.eventList-objTypeTree{
	
}
#eventList-objTypeZtree{
	display: none;
	position: absolute;
    width: 210px;
    max-height: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 2;
    box-shadow: 0 6px 10px rgba(0,0,0,.3);
    border-radius: 4px;
    background:#fff;
    top: 24px;
    left: 500px;
}
#eventList-objType, 
.eventList-before-div #eventTime1,
.eventList-before-div #eventTime2{
	padding-left: 10px;
    width: 120px;
    margin: 0 10px;
    height: 20px;
    border: 1px solid #C7C6CC;
    border-radius: 2px;
    color:#5C5A66;
    cursor: pointer;
    margin-right: 20px;
}
#eventList-objType:focus{
	border-color: #5b62f9;
}
#eventTable td .prompt:before,
#eventTable td .promt:before {
	content:'通知';
} 
#eventTable td .error:before {
	content:'告警';
} 
#eventTable td .warning:before {
	content:'预警';
} 
#eventTable td .prompt{
	background:#0Bc048;
	color:#fff;
	border-radius: 12px;
	display:inline-block;
	width:44px;
	font-size:12px;
	text-align: center;
}
#eventTable td .error{
	background:#ff3341;
	color:#fff;
	border-radius: 12px;
	display:inline-block;
	width:44px;
	font-size:12px;
	text-align: center;
}
#eventTable td .warning{
	background:#fb8229;
	color:#fff;	
	text-align: center;
	border-radius: 12px;
	display:inline-block;
	width:44px;
	font-size:12px;
}
.eventList-before-div select{
	width: 120px !important;
}
.eventList-modal {
	left: 50% !important;
}
#eventTable tbody tr td:nth-child(10) {
	cursor: pointer;
	color: #5b62f9;
}
#eventTable span.lookpath:hover,
#eventTable tbody tr td:nth-child(10):hover {
	text-decoration: underline;
}
.eventList-excel-btn {
	float:right; 
	color: #5b62f9;
	cursor: pointer;
}
.eventList-excel-btn:hover	{
	text-decoration: underline;
}
</style>


<section class="panel" style="overflow: visible;">
	<p class="title">事件列表	<span id="excelBtn" class="eventList-excel-btn">导出Excel</span></p>
	<div class="content" style="position: relative; overflow: visible;">
		<div class="eventList-before-div">
			事件来源<select name="" id="eventSource">
					<option value="-1">全部</option>
					<option value="00">00-aim</option>
					<option value="01">01-mocha</option>
					<option value="02">02-天旦</option>
					<option value="03">03-虚拟化</option>
					<option value="04">04-备份系统</option>
					<option value="05">05-网络</option>
					<option value="06">06-OEM</option>
				</select>
			应用名称<select name="" id="eventList-appName" style="width: 160px; margin: 0 20px 0 10px; display: inline-block; font-family: 'microsoft yahei';">
					<option value="-1">全部应用</option>
				</select>
			对象类型<input name="" id="eventList-objType" readonly value="全部对象">
			<ul id="eventList-objTypeZtree" class="ztree"> </ul>
			事件类型<select name="" id="eventList-eventType">
				<option value="ALARM_WARING">全部事件</option>
				<option value="ALARM">告警</option>
				<option value="WARING">预警</option>
				<option value="INFO">通知</option>
			</select>
			<!-- 事件状态<select name="" id="eventStatus">
				<option value="NEW">待处理</option>
				<option value="DEAL">处理中</option>				
				<option value="CLOSED">已处理</option>
			</select> -->
			处理状态<select name="" id="eventList-handleStatus">
				<option value="">全部</option>
				<option value="DEALING">未解除</option>
				<option value="DEALT">已解除</option>				
				<option value="DEALING_LONGTIME">长时间未解除</option>
				<option value="DEAL_LONGTIME">长时间未处理 </option>
			</select>
			<div class="eventList-time-ctn" style="display: inline-block; position: relative;">
				开始时间<input id="eventTime1" type="text" style="width: 148px; height: 24px;"/>
				<i id="clearTime1" title="清除" class="fa fa-close" style="position: absolute; font-size: 18px; right: 25px; top: 3px; color: #ccc; cursor: pointer;"></i>
			</div>
			<div class="eventList-time-ctn" style="display: inline-block; position: relative;">
				结束时间<input id="eventTime2" type="text" style="width: 148px; height: 24px;"/>
				<i id="clearTime2" title="清除" class="fa fa-close" style="position: absolute; font-size: 18px; right: 25px; top: 3px; color: #ccc; cursor: pointer;"></i>
			</div>
			<button id="eventQueryBtn" type="button">查询</button>
			<input type="text" id="searchInput" class="search-query pull-right eventList-search-query" style="float: right;">
		</div>
		<div style="width: 100%;">
			<table style="margin-top:50px; table-layout: fixed;" id="eventTable" class="display dataTable table no-footer eventList-datatable">
				<thead>
					<tr>
						<th width="4%">序号</th>
						<th width="5%">事件类型</th>
						<th width="5%">事件来源</th>
						<th width="9%">应用名称</th>
						<!-- <th width="6%">对象类型</th>
						<th width="10">对象ID</th> -->
						<th width="8%">对象名称</th>
						<th width="21%">事件摘要</th>
						<th width="5%">事件状态</th>
						<th width="5%">工单状态</th>
						<th width="6%">处理状态</th>
						<th width="6%">发生次数</th>
						<th width="9%">首次发生时间</th>
						<th width="9%">最后发生时间</th>					
						<th width="6%">事件详情</th>
						<th>对象ID</th>
					</tr>
				</thead>
				<tbody>
					<!-- <tr>
						<td>1</td>
						<td><span class="error"></span></td>
						<td>柜面系统</td>
						<td>规划类</td>
						<td>2321</td>
						<td>软件</td>
						<td>内存</td>
						<td>...</td>
						<td><span style="color: #0Bc048">已解决</span></td>
						<td>11</td>
						<td>2016-12-16 12:12:00</td>
						<td>2016-12-16 12:12:56</td>
						<td><span class="lookpath"></span></td>
					</tr> -->
				</tbody>
			</table>
			<span class="eventList-jumpPage">跳转到<input id="toPage" type="text" />页</span>
		</div>
		
	</div>
</section>

<div id="eventModal" class="modal hide fade eventList-modal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="-webkit-transform: translateX(-50%); transform: translateX(-50%); width: 1000px;">
	<div class="modal-header confirm-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h4 style="margin: 5px 0; line-height: 26px;">事件明细</h4>
	</div>	
	<div class="modal-body">
		<div>
			<table id="eventType" class="display dataTable table no-footer" style="table-layout: fixed;">
				<thead>
					<tr>
						<th width="5%">序号</th>
						<th width="8%">事件类型</th>
						<th width="8%">事件来源</th>
						<th width="12%">应用名称</th>
						<th width="12%">对象名称</th>
						<th width="40%">事件摘要</th>
						<th width="15%">发生时间</th>
					</tr>
				</thead>
				<tbody>
					<!-- <tr>
						<td>1</td>
						<td><span class="event-type error"></span></td>
						<td>aim</td>
						<td>柜面系统</td>
						<td>网上银行</td>
						<td>。。。。。。。。</td>
						<td>2016-12-16 12:12:00</td>
					</tr> -->
				</tbody>
			</table>			
		</div>
	</div>
</div>


