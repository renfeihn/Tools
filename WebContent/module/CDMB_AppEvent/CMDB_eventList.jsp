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
.event-list #dataTable  span.event-type.type0 {
	background: #FF3341;
}
.event-list #dataTable span.event-type.type1{
	background: #FB8229;
}
.event-list #dataTable span.event-type.type2{
	background: #22AC38;
}
.event-list #dataTable thead>tr>th:nth-child(1) {
	width: 80px;
}
.event-list #dataTable thead>tr>th:nth-child(2) {
	width: 100px;
}
.event-list #dataTable thead>tr>th:nth-child(3) {
	width: 150px;
}
.event-list #dataTable thead>tr>th:nth-child(4) {
	width: 600px!important;
}
</style>

		<div class="eventlist-content event-list">
			<table id="dataTable" class="display dataTable table">
				<!-- <thead>
					<tr>
						<th width="5%">序号</th>
						<th width="5%">事件类型</th>
						<th width="5%">事件渠道</th>
						<th width="8%">指标类型</th>
						<th width="8%">系统名称</th>
						<th width="25%">事件摘要</th>
						<th width="10%">发生时间</th>
						<th width="10%">发生次数</th>
						<th width="10%">操作</th>
					</tr>
				</thead>
				<tbody></tbody> -->
			</table>
		</div>
