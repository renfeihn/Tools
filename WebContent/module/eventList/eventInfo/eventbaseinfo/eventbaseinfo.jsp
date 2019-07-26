<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
@import "css/jquery.range.css";
.poc_relationAnalysis{
	padding: 20px;
    box-sizing: border-box;
}
.poc_relationAnalysis .vis-item.vis-selected {
	color: #FFF !important;
}

.vis-item.vis-current-event{
	background-color: #da3e3d !important;
	color: #FFF !important;
}
.clear-fix:after {
	content: '';
	display: block;
	clear: both;
}
#appTable span.event-type {
	display: inline-block;
	border-radius: 10px;
	width: 50px;
	height: 20px;
	color: #FFF;
	text-align: center;
}
#appTable span.event-type.notice:BEFORE {
	content:'通知';
}
#appTable span.event-type.warning:BEFORE {
	content:'预警';
}
#appTable span.event-type.error:BEFORE {
	content:'告警';
}
#appTable span.event-type.notice {
	background: #22ac38;
}
#appTable span.event-type.warning {
	background: #fb8229;
}
#appTable span.event-type.error {
	background: #FF3341;
}
.radio-group span:first-child {
	border-radius: 2px 0 0 2px;
}
.radio-group span:last-child {
	border-radius: 0 2px 2px 0;
}
.radio-group span.selected {
	color: #5b62f9;
	border-color: #8489fb;
	position: relative;
	z-index: 1;
}
.radio-group span+span {
	margin-left: -1px;
}
.radio-group span {
	position: relative;
	z-index: 0;
	width: 76px;
	height: 22px;
	font-size: 12px;
	text-align: center;
	line-height: 22px;
	color: #929099;
	border: 1px solid #c7c6cc;
	cursor: pointer;
	-webkit-user-select: none;
	user-select: none;
}
.radio-group {
	display: flex;
}
.poc_relationAnalysis .tab-content{
	padding: 20px;
	box-sizing: border-box;
}
.event-rel-red{
	background: #22ac38;
	color: #FFF;
}
.event-rel-yellow{
	background: #FB8229;
	color: #FFF;
}
.event-rel-green{
	background: #FF3341;
	color: #FFF;
}
</style>
<div class="poc_relationAnalysis">
	<div style="display: flex;height: 40px;align-items: center;margin-bottom: 20px;">
		<div style="flex: auto;">
			<input class="range-slider" type="hidden" value="0,24"/>
		</div>
	</div>

	<!-- <div style="font-size: 12px;display: inline-flex;align-items: center;margin-bottom: 20px;">
		<button type="button"></button>
		<button type="button"></button>
		<button type="button"></button>
		<button type="button"></button>
		<button type="button"></button>
	</div> -->
	<div style="margin: 0 -20px;">
		<ul class="nav nav-tabs nav-underLine">
			<li class="active"><a href="#relationTable" data-toggle="tab">关联事件</a></li>
			<li><a href="#relationTimeLine" data-toggle="tab">事件时序图</a></li>
		</ul>
		<div class="tab-content">
			<div id="relationTable" class="tab-pane active clear-fix">
				<div style="display: flex;">
					<section style="width: 100%;flex: none" class="pull-left panel">
						<p class="title">关联事件列表 (共<span id="totalrows"></span>条记录)</p>
						<div class="content">
							<table id="appTable" style="table-layout: fixed;" class="display dataTable table no-footer">
								<thead>
									<tr>
										<th width="6%">序号</th>
										<th>事件类型</th>
										<th>应用名称</th>
										<th>对象名称</th>
										<th width="18%">事件摘要</th>
										<th>事件状态</th>
										<th>发生次数</th>
										<th>首次发生时间</th>
										<th>最后发生时间</th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</section>
				</div>
			</div>
			<div id="relationTimeLine" class="tab-pane">
				<div id="evenRelTiemLine1"></div>
			</div>
		</div>
	</div>
</div>
