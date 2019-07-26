<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
#dataTable {
	table-layout: fixed;
}
#dataTable .event-type {
    display: inline-block;
    padding: 0 8px;
    background: #FF9800;
    color: #fff;
    border-radius: 16px;
}
#dataTable .event-type.level1 {
	background: #2196f3;
}
#dataTable .event-type.level2 {
	background: #FF9800;
}
#dataTable .event-type.level3 {
	background: #f01024;
}
#dataTable .unhandle {
	color: #FF0701;
}
#dataTable .handled {
	color: #15b979;
}
.eventlist-content .operates {
	display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.eventlist-content #dataTable_filter {
    position: absolute;
    right: 0;
    top: -40px;
}
.eventlist-content .operates input {
	margin: 0;
}
.eventlist-content .operates>div {
    margin-right: 50px;
}
.eventlist-content .operate-name {
	margin-right: 5px;
}
.eventlist-content .operate-wrap {

}
.eventlist-content .event-type>span,
.eventlist-content .event-time>span {
    display: inline-block;
    width: 64px;
    height: 22px;
    line-height: 20px;
    text-align: center;
    border: solid 1px #c7c6cc;
    font-size: 12px;
    background: #f9f9fb;
    box-sizing: border-box;
    cursor: pointer;
}
.eventlist-content .event-type>span.active,
.eventlist-content .event-time>span.active {
    background: #5b62f9;
    border-color: #5b62f9;
    color: #fff;
}
</style>
<div class="eventlist-content">
	<div class="operates">
		<div>
			<span class="operate-name">事件类型:</span>
			<span class="operate-wrap event-type">
				<span class="active" data-type=cmdb>cmdb事件</span><span data-type="object">应用事件</span><span data-type="other">其他事件</span>
			</span>
		</div>
		<div>
			<span class="operate-name">发生时间:</span>
			<span class="operate-wrap event-time" >
				<span class="active" data-time="1">当天</span><span data-time="7">过去一周</span><span data-time="30">过去一月</span>
			</span>
		</div>
	</div>
	<table id="dataTable" class="display dataTable table">
		<thead>
			<tr>
				<th width="5%">序号</th>
				<th width="5%">事件类型</th>
				<th width="5%">事件渠道</th>
				<th width="8%">指标类型</th>
				<th width="8%">系统名称</th>
				<th width="25%">事件摘要</th>
				<th width="10%">发生时间</th>
				<th width="10%">发生次数</th>
				<!-- <th width="10%">操作</th> -->
			</tr>
		</thead>
		<tbody></tbody>
	</table>
</div>