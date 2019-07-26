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
#bindAppModal .apps-wrap {
    background: #e4e6e8;
    padding: 10px;
}
#bindAppModal .apps-wrap>span {
    display: inline-block;
    background: #eff0f1;
    border: solid 1px #b6b6b7;
    padding: 2px 6px;
    margin: 0 6px 4px 0;
    border-radius: 2px;
    font-size: 12px;
    cursor: pointer;
}
#bindAppModal .apps-wrap>span.active {
    background: var(--color-theme);
    border-color: #34556f;
    color: #fff;
}
</style>

<section class="panel LQSM-container" style="margin: 0;">
	<p class="title">仪表盘组件管理</p>
	<div class="content">
		<div class="btn-group-a" style="margin-bottom: 10px;">
			<button id="newBtn" type="button" class="addBtn">新增</button>
		</div>
		<table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<th>序号</th>
					<th>仪表盘名称</th>
					<th>创建人</th>
					<th>创建时间</th>
					<th>修改时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>

<div id="modal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">仪表盘编辑</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal">
			<div class="control-group">
				<label for="input1" class="control-label required">仪表盘名称</label>
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

<div id="bindAppModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 600px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">仪表盘关联应用系统</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal">
			<div class="control-group">
				<label for="input1" class="control-label required">应用系统</label>
				<div class="controls">
					<div class="apps-wrap">
					</div>
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label required">显示名称</label>
				<div class="controls">
					<input type="text" name="name" id="panel_name" style="width: 100%" />
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确定</button>
	</div>
</div>

