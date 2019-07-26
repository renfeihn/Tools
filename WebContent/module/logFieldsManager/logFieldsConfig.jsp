<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.LFC-container #searchTable tbody td:last-child>span.disabled{
	cursor: not-allowed;
	color: #ccc;
}
.LFC-container #searchTable tbody td:last-child>span{
	color:var(--color-theme);
	cursor: pointer;
	margin: 0 5px;
}
.LFC-btnGroup{
	position: absolute;
	z-index: 1;
}
.LFC-container tbody input,
.LFC-container tbody select{
	margin: 0;
}
</style>
<section class="panel LFC-container" style="margin: 0;">
	<p class="title">拆分字段管理</p>
	<div class="content">
		<div class="LFC-btnGroup">
			<button type="button" class="addBtn">新增</button>
		</div>
		<table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<!-- <th style="width: 80px;">序号</th> -->
					<th>字段名称</th>
					<th>字段描述</th>
					<th>字段类型</th>
					<th style="width: 110px;">操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>
