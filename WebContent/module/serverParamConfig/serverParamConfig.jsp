<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.SPC-container #searchTable tbody td:last-child>span{
	color:var(--color-theme);
	cursor: pointer;
	margin: 0 5px;
}
.SPC-container #searchTable_filter{
	position: absolute;
    top: -52px;
    right: 0;
}

.SPC-modal .form-horizontal .control-label{
	width: 7em;
}
.SPC-modal .form-horizontal .controls>select,
.SPC-modal .form-horizontal .controls>input,
.SPC-modal .form-horizontal .controls>textarea {
	width: 100%;
}

.SPC-warningForm div.col-3{
	flex: none;
	width: calc(100% / 2);
}
.SPC-warningForm .unShow{
	display: none;
}
</style>

<section class="panel SPC-container" style="margin: 0;">
	<p class="title">服务器参数</p>
	<div class="content">
		<table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<th style="width: 80px;">序号</th>
					<th>分类</th>
					<th>参数</th>
					<th>值</th>
					<th>参数说明</th>
					<th style="width: 80px;">操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>

<!-- 预警模态框 -->
<div id="serverModal" class="modal hide fade SPC-modal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">参数修改</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal SPC-warningForm">
			<div class="control-group">
				<label for="searchName" class="control-label required">参数分类</label>
				<div class="controls">
					<input type="text" id="category" name="category" disabled/>
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label required">参数名</label>
				<div class="controls">
					<input type="text" id="name" name="name" placeholder="输入名称" disabled />
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label required">参数说明</label>
				<div class="controls">
					<input type="text" id="val_desc" name="val_desc" placeholder="输入名称" />
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label required">参数值</label>
				<div class="controls">
					<textarea name="val" id="val" style="height: 150px; resize: none;"></textarea>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>
