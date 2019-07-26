<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="true"%>
<style>
	.btn-group-a{
		position:absolute;
		top:60px;
		left:20px;
		z-index:1;
	}
	
</style>
<section class="panel" style="position:relative">
	<p class="title">用户管理</p>
	<div class="content">
	<!-- 按钮组  -->
		<div class="btn-group-a">
			<button id="newBtn"  type="button" class="addBtn">新增</button>
			<button id="updateBtn" type="button" class="editBtn  disabled">修改</button>
			<button id="DelBtn" type="button" class="delBtn  disabled">删除</button>
		</div>
		<!-- dataTables -->
		<table id="userTable" class="display table dataTable">
			<thead>
				<tr>
					<th>序号</th>
					<th>用户名称</th>
					<th>昵称</th>
					<th>电话</th>
					<th>邮件</th>
					<th>添加人</th>
					<th>添加日期</th>
					<th>重置密码</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<!-- 模态框-新增用户 -->
		<div id="userManage-mol" tabindex="-1" class="modal fade hide" data-backdrop="false" aria-hidden="true">
			<div class="modal-header">
				<button class="close" id="close-modal" type="button" data-dismiss="modal">&times;</button>
				<h3>新增用户</h3>
			</div>
			<div class="modal-body">
				<form class=" form-min form-horizontal">
					<div class="control-group">
						<label for="username" class="control-label required">用户名</label>
						<div class="controls">
							<input id="username" placeholder="请输入用户名" type="text" /><span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group" id="passAre">
						<label for="password" class="control-label">密码</label>
						<div class="controls">
							<input type="password" style="display:none" />
							<input class="disabled" id="password" type="password" style="border-color: #c7c6cc;"/><span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="nickname" class="control-label required">昵称</label>
						<div class="controls">
							<input id="nickname" type="text" /><span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="telephone" class="control-label required">电话</label>
						<div class="controls">
							<input id="telephone" type="text"/><span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="mail" class="control-label required">邮箱</label>
						<div class="controls">
							<input id="mail" type="text"/><span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="createuser" class="control-label">添加人</label>
						<div class="controls">
							<input  value="${sessionScope.username}" placeholder="" readonly="readonly" id="createuser" type="text" /><span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="createTime" class="control-label">添加日期</label>
						<div class="controls">
							<input readonly="readonly" id="createTime" type="text" /><span
						class="help-inline hide"></span>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button id="buttion_cancel" type='button' class="cancelBtn">取消</button>
				<button id="buttion_add" type='button'  class="confirmBtn">保存</button>
			</div>
		</div>
		<!-- 模态框结束 -->
	</div>
</section>
<!-- 结束 -->

<!-- 
<div class="modal-div div-bg" id="view" style="min-height: 430px;">
	<div class="second_title">
		<span class="black-box"></span> <span class="title_content">用户管理</span>
	</div>
	<div style="padding: 10px">
		<div class="gutter-bottom"
			style="position: absolute; margin-top: 8px; z-index: 2;">
			<button id="newBtn" type="button" class="flatten-btn">
				<i class="fa fa-plus"></i>&nbsp;新增
			</button>
			<button id="updateBtn" type="button" class="flatten-btn disabled">
				<i class="fa fa-edit"></i>&nbsp;修改
			</button>
			<button id="DelBtn" type="button" class="flatten-btn disabled">
				<i class="fa fa-trash"></i>&nbsp;删除
			</button>
		</div>
		<table id="userTable"
			class="display dataTable table no-footer"
			style="table-layout: fixed;">
			<thead>
				<tr>
					<th width="5%">序号</th>
					<th width="14%">用户名称</th>
					<th width="14%">昵称</th>
					<th width="15%">电话</th>
					<th width="15%">邮件</th>
					<th width="14%">添加人</th>
					<th width="14%">添加日期</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
	<div id="user_mod" class="hide">

		<table class="clear" style="table-layout: fixed; margin-left: 30px;">
			<tr>
				<td><label class="control-label" for="username"
					style="text-align: left;">用户名</label></td>
			</tr>
			<tr class="table_tr">
				<td><input class="span9" id="username" type="text"
					data-value="" placeholder="" /> <span class="help-inline hide"></span>
				</td>
			</tr>
			<tr>
				<td><label class="control-label" for="password"
					style="text-align: left; width: 200px;">密码（系统默认为888888）</label></td>
			</tr>
			<tr class="table_tr">
				<td><input class="span9" id="password" type="password"
					value="888888" /> <span class="help-inline hide"></span></td>
			</tr>
			<tr>
				<td><label class="control-label" for="nickname"
					style="text-align: left;">昵称</label></td>
			</tr>
			<tr class="table_tr">
				<td><input class="span9" id="nickname" type="text"
					data-value="" placeholder="" /> <span class="help-inline hide"></span>
				</td>
			</tr>
			<tr>
				<td><label class="control-label" for="telephone"
					style="text-align: left;">电话</label></td>
			</tr>
			<tr class="table_tr">
				<td><input class="span9" type="text" id="telephone"
					placeholder=""> <span class="help-inline hide"></span></td>
			</tr>
			<tr>
				<td><label class="control-label" for="mailbox"
					style="text-align: left;">邮箱</label></td>
			</tr>
			<tr class="table_tr">
				<td><input class="span9" type="text" id="mailbox"
					placeholder=""> <span class="help-inline hide"></span></td>
			</tr>
			<tr>
				<td><label class="control-label" style="text-align: left;">添加人</label></td>
			</tr>
			<tr class="table_tr">
				<td><input class="span9" type="text" id="createuser"
					value="${sessionScope.username}" placeholder="" readonly="readonly">
					<span class="help-inline hide"></span></td>
			</tr>
			<tr>
				<td><label class="control-label" for="name"
					style="text-align: left;">添加日期</label></td>
			</tr>
			<tr class="table_tr">
				<td><input class="span9" type="text" id="createtime"
					placeholder="" readonly="readonly"> <span
					class="help-inline hide"></span></td>
			</tr>
		</table>
		<div class="form-actions" style="padding-left: 180px;">
			<button id="buttion_cancel" type="button" class="flatten-btn"
				style="background-color: #E6E6E6; color: #999; width: 80px;">取消</button>
			&nbsp;&nbsp;
			<button id="buttion_add" type="button" class="flatten-btn"
				style="width: 80px;">保存</button>
		</div>
	</div>
</div>
 -->
