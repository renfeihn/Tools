<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.evRl-list-ctn{
	height: 278px;
}
.evRl-reason-ctn{
	/*height: 150px;*/
}
.evRl-restore-ctn{
	/*height: 280px;*/
}
#eventModal .dataTables_scrollHeadInner,
.evRl-list-ctn .dataTables_scrollHeadInner{
	padding: 0px !important;
}
#eventModal .dataTables_scrollBody,
.evRl-list-ctn .dataTables_scrollBody{
	border-bottom: 1px solid #e0dfe6;
}
#eventModal .dataTables_scrollBody table,
.evRl-list-ctn .dataTables_scrollBody table{
	border-top: none !important;
}
.tabs-left>.nav.nav-tabs>li.active>.eventDetails-tabs-a {
	background: #fff;
}
.eventDetails-layout {
	display: flex;
    align-items: flex-start;
}
.evRl-pre{
	margin: 0;
	padding: 0;
	background-color: #fff;
	box-shadow: none;
	-webkit-box-shadow: none;
	border: none;
}
#eventRelTable span.event-type,
#appTable span.event-type {
	display: inline-block;
	border-radius: 10px;
	width: 50px;
	height: 20px;
	color: #FFF;
	text-align: center;
}
#eventRelTable span.event-type.notice:BEFORE,
#appTable span.event-type.notice:BEFORE {
	content:'通知';
}
#eventRelTable span.event-type.warning:BEFORE,
#appTable span.event-type.warning:BEFORE {
	content:'预警';
}
#eventRelTable span.event-type.error:BEFORE,
#appTable span.event-type.error:BEFORE {
	content:'告警';
}
#eventRelTable span.event-type.notice,
#appTable span.event-type.notice {
	background: #22ac38;
}
#eventRelTable span.event-type.warning,
#appTable span.event-type.warning {
	background: #fb8229;
}
#eventRelTable span.event-type.error,
#appTable span.event-type.error {
	background: #FF3341;
}
.eventDetails-echarts.eventDetails-add {
	cursor: pointer;
	background: #f7f7fa url("img/eventDetails/add.png") center no-repeat;
}
.eventDetails-echarts.eventDetails-add:HOVER {
	background: #f7f7fa url("img/eventDetails/add-blue.png") center no-repeat;
}
.eventDetails-echarts.eventDetails-add {
	cursor: pointer;
	background: #f7f7fa url("img/eventDetails/add.png") center no-repeat;
}
.eventDetails-echarts.eventDetails-add:HOVER {
	background: #f7f7fa url("img/eventDetails/add-blue.png") center no-repeat;
}
.eventDetails-inforLayout:nth-child(1)>span:nth-child(1):before{
	content:'事件ID';
	
}
.eventDetails-inforLayout:nth-child(1)>span:nth-child(2):before{
	content:'告警级别';
}
.eventDetails-inforLayout:nth-child(2)>span:nth-child(1):before{
	content:'持续时间';
}
.eventDetails-inforLayout:nth-child(2)>span:nth-child(2):before{
	content:'发生次数';
	
}
.eventDetails-inforLayout:nth-child(3)>span:nth-child(1):before{
	content:'首次发生时间';
}
.eventDetails-inforLayout:nth-child(3)>span:nth-child(2):before{
	content:'最后发生时间';
}
.eventDetails-inforLayout{
	display: flex;
	justify-content:space-between;
	width:100%;
}
.eventDetails-inforLayout>span:nth-child(1){
	width:220px;
}
.eventDetails-inforLayout>span:nth-child(2){
	width:220px;
}
.eventDetails-inforLayout>span{
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
.eventDetails-inforLayout>span:before, .eventDetails-desc:before {
    width: 80px;
    display: inline-block;
    font-size: 12px;
    color: #666;
}
.eventDetails-desc:before {
	content: "事件描述"
}
.eventDetails-squal i{
	width: 6px;
	height:12px;
	display:inline-block;
	background-color:#e0dfe6;
	margin-right:2px;
}


.eventDetails-squal .eventDetails-blue{
	background-color: var(--color-theme);
}
</style>

<section class="panel evRl-list-ctn">
	<p class="title">关联事件列表</p>
	<div class="content">
		<div style="width: 100%;">
			<table id="appTable" style="table-layout: fixed;" class="display dataTable table no-footer">
				<thead>
					<tr>
						<th width="5%">序号</th>
						<th width="6%">事件类型</th>
						<th width="10%">应用名称</th>
						<th width="8%">对象名称</th>
						<th width="21%">事件摘要</th>
						<th width="6%">事件状态</th>
						<th width="6%">工单状态</th>
						<th width="6%">处理状态</th>
						<th width="6%">发生次数</th>
						<th width="12%">首次发生时间</th>
						<th width="12%">最后发生时间</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
</section>

<div style="display:flex;justify-content:space-between;">
<section class="panel" style="width: 40%;">
	<p class="title">事件基本信息</p>
	<div class="content">
		<div class="eventDetails-inforLayout">
			<span id="eventId">-</span>
			<span class="eventDetails-squal">
				<span id="eventLevel" style="display:inline-flex;">
					<i></i>
					<i></i>
					<i></i>
					<i></i>
					<i></i>
				</span>
				<span id="eventLevelNum">-</span></span>
		</div>
		<div class="eventDetails-inforLayout">
			<span id="stayTime">-</span>
			<span id="ocrTimes">-</span>
		</div>
		<div class="eventDetails-inforLayout">
			<span id="startDate">-</span>
			<span id="endDate">-</span>
		</div>
		<div >
			<p id="eventDecribe" class="eventDetails-desc">-
				
			</p>
		</div>
	</div>
</section>
<section class="panel evRl-reason-ctn" style="width: calc(60% - 20px);">
	<p class="title">推论结果</p>
	<div class="content">
		<pre id="reason" class="evRl-pre"></pre>
	</div>
</section>
</div>

<section class="panel evRl-restore-ctn">
	<p class="title">事件现场还原</p>
	<div class="content" style="padding: 0;">
		<div class="tabs-left" style="background: #FFF;">
			<ul id="eventTabs" class="nav nav-tabs" style="display: none">
				<!-- <li class="active"><a data-toggle="tab" class="eventDetails-tabs-a">响应时间</a></li>
				<li><a data-toggle="tab" class="eventDetails-tabs-a">TPS</a></li> -->
			</ul>
			<div class="tab-content" style="flex: auto;">
				<div id="tabs1" class="tab-pane active eventDetail-table">
					<div class="eventDetails-layout" style="">
						<div id="allEventEchart" style="height: 230px;flex:auto; margin-right: 15px"></div>
						<div class="eventDetails-echarts eventDetails-add" style="width:30%;height:230px; margin-right: 15px;">
							<div class="echartCtn" style="display: none">
								<p style="margin: 0; height: 30px; font-size: 18px; text-align: center; line-height: 40px; font-weight: normal; position: relative;">
									<span class="eTitle"></span><i class="close closeEchart" style="position: absolute; font-size: 31px; right: 7px; top: 5px;">&times;</i>
								</p>
								<div id="addEcharts1" class="itemEchart" style="width: 100%; height: 200px;"></div>
							</div>
						</div>
						<div class="eventDetails-echarts eventDetails-add" style="width:30%;height:230px; margin-top: 0;">
							<div class="echartCtn" style="display: none">
								<p style="margin: 0; height: 30px; font-size: 18px; text-align: center; line-height: 40px; font-weight: normal; position: relative;">
									<span class="eTitle"></span><i class="close closeEchart" style="position: absolute; font-size: 31px; right: 7px; top: 5px;">&times;</i>
								</p>
								<div id="addEcharts2" class="itemEchart" style="width: 100%; height: 200px;"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<div id="eventModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 900px;">
	<div class="modal-header confirm-header">
		<h4 style="margin: 5px 0; line-height: 26px;">请选择关联事件<i class="close confirm-close" style="margin-top: 5px">&times;</i></h4>
	</div>	
	<div class="modal-body">
		<div style="width: 100%;">
			<table id="eventRelTable" style="table-layout: fixed" class="display dataTable table no-footer">
				<thead>
					<tr>
						<th width="10%">序号</th>
						<th width="15%">事件类型</th>
						<th width="15%">应用名称</th>
						<th width="15%">对象名称</th>
						<th width="29%">事件摘要</th>
						<!-- <th width="6%">事件状态</th>
						<th width="6%">工单状态</th>
						<th width="6%">处理状态</th>
						<th width="6%">发生次数</th> -->
						<th width="16%">首次发生时间</th>
						<!-- <th width="12%">最后发S生时间</th> -->
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>	
		</div>					
	</div>
	<div class="modal-footer">
		<button type="button" data-role="cancel" class="cancelBtn">取消</button>
		<button type="button" data-role="confirm" class="confirmBtn">确定</button>
	</div>
</div>
