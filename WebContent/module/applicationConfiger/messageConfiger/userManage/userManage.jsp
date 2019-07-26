<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.userManage-select {
	position: absolute;
    width: 206px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    font-size: 12px;
    display: none;
    height: 150px;
    overflow: auto;
}
.userManage-select>span {
	border-bottom: 1px solid #e5e5e5;
    width: 100%;
    display: block;
    padding: 0 10px;
    box-sizing: border-box;
}
.userManage-select>span.active {
	background-color: #b3b7ff;
}
.userManage-buttons{
	margin-bottom: 10px;
	position: absolute;
	z-index: 1;
}
.userManage-buttons>button+button{
	margin-left: 10px;
}
.userManage-modal select{
	width: 206px;
}
.userManage-modal .form-horizontal .control-label{
	width: 7em;
}
</style>

<div class="content">
	<div class="userManage-buttons">
		<button type="button" id="add" class="addBtn">新增</button>
		<button type="button" id="edit" class="editBtn">修改</button>
		<button type="button" id="del" class="delBtn">删除</button>
	</div>
	<table id="dataTable" class="display dataTable table">
		<thead>
			<tr>
				<th><input type="checkbox" id="checkBoxAll"></th>
				<th>用户Id</th>
				<th>用户名</th>
				<th>电话号码</th>
				<th>用户拥有的角色</th>
				<th>所属组</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
</div>

<div id="modal" class="modal hide fade userManage-modal" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">新增用户</h3>
	</div>
	<div class="modal-body" style="overflow:visible">
		<form class="form-horizontal">
			<div class="control-group">
				<label for="username" class="control-label required">用户名</label>
				<div class="controls">
					<input type="text" id="username" placeholder="这里是必输的" data-skip='info'/>
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="telPhone" class="control-label required">电话号码</label>
				<div class="controls">
					<input type="text" id="telPhone" placeholder="这里是必输的" data-skip='info'/>
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="mail" class="control-label">邮箱</label>
				<div class="controls">
					<input type="email" id="mail" placeholder="" data-skip='info'/>
				</div>
			</div>
			<div class="control-group">
				<label for="gid" class="control-label">所属组</label>
				<div class="controls">
					<input type="text" id="gids" placeholder="" data-skip='info' autocomplete = 'off'/>
					<div class="userManage-select" id="userManageSelect"></div>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>