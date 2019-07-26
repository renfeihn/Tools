<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
#searchTable tbody td:last-child>span{
	color:var(--color-theme);
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
	<p class="title">仪表盘组件管理</p>
	<div class="content">
		<table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<th style="width: 80px;">序号</th>
					<th style="width: 200px;">组件名称</th>
					<th style="width: 62px;">图表类型</th>
					<th width="35%">查询条件</th>
					<th style="width: 100px;">时间类型</th>
					<th style="width:80px;">操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>

<div id="modal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">仪表盘组件编辑</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal">
			<div class="control-group">
				<label for="input1" class="control-label required">组件名称</label>
				<div class="controls">
					<input type="text" name="name" id="name" style="width: 90%" />
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确定</button>
	</div>
</div>
