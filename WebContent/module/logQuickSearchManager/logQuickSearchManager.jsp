<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
#searchTable tbody td:last-child>span{
	color: var(--color-theme);
	cursor: pointer;
	margin: 0 5px;
}
.LQSM-container #searchTable_filter{
	position: absolute;
    top: -52px;
    right: 0;
}
</style>

<section class="panel LQSM-container" style="margin: 0;">
	<p class="title">快速查询管理</p>
	<div class="content">
		<table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<th style="width: 80px;">序号</th>
					<th>快速查询名称</th>
					<th width="35%">查询条件</th>
					<th style="width: 100px;">时间类型</th>
					<th style="width: 100px;">使用次数</th>
					<th>上次使用时间</th>
					<th>创建时间</th>
					<th style="width:105px;">操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>
