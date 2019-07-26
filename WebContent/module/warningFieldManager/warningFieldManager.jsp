<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.WFM-container #searchTable tbody td:last-child>span.disabled {
	cursor: not-allowed;
	color: #ccc;
}
.WFM-container #searchTable tbody td:last-child>span{
	color: var(--color-theme);
	cursor: pointer;
	margin: 0 5px;
}
.WFM-btnGroup{
	position: absolute;
	z-index: 1;
}
.WFM-container tbody input,
.WFM-container tbody select,
.WFM-container tbody textarea{
	margin: 0;
}

.WFM-container tbody textarea{
	width: 100%;
	height: 200px;
	resize: none;
}
.WFM-container tbody div{
	width: 100%;
    height: 100px;
    word-break: break-all;
    overflow: auto;
    word-wrap: break-word;
    white-space: pre-wrap;
}
</style>
<section class="panel WFM-container" style="margin: 0;">
	<p class="title">预警字段管理</p>
	<div class="content">
		<div class="WFM-btnGroup">
			<button type="button" class="addBtn">新增</button>
		</div>
		<table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<th style="width: 300px;">预警名称</th>
					<th>字段值</th>
					<th style="width: 110px;">操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>
