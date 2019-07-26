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
<!-- 更新部分 -->


<section class="panel" style="position:relative">
	<p class="title">角色管理</p>
	<div class="content">
		<div class="btn-group-a">
			<button id="newBtn" type="button" class="addBtn">新增</button>
			<button id="updateBtn" class="editBtn disabled">修改</button>
			<button id="DelBtn" type="button" class="delBtn disabled">删除</button>
			<button id="PrivBtn" type="button" class="quanxianweihu disabled">菜单权限维护</button>
			<button id="SysBtn" type="button" class="quanxianweihu disabled">数据权限维护</button>			
		</div>
		<!-- dataTables -->
		<table id="roleTable" class="display table dataTable">
			<thead>
				<tr>
					<th>序号</th>
					<th>角色编号</th>
					<th>角色名称</th>
					<th>角色描述</th>
					<th>角色状态</th>
					<th>权限状态</th>
					<th>添加人</th>
					<th>添加日期</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<!-- 模态框-角色管理-->
		<div id="roleManage-mol" class="modal fade hide" data-backdrop="false" aria-hidden="true">
			<div class="modal-header">
				<button class="close" id="close-modal" type="button" data-dismiss="modal">&times;</button>
				<h3>新增角色</h3>
			</div>
			<div class="modal-body">
				<form class=" form-min form-horizontal">
					<div class="control-group hide">
						<label for="rid" class="control-label">角色编号</label>
						<div class="controls">
							<input id="rid"  readonly="readonly"  placeholder="由系统自动生成" type="text" /><span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="name" class="control-label">角色名称</label>
						<div class="controls">
							<input id="name" type="text" /><span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="descp" class="control-label">角色描述</label>
						<div class="controls">
							<textarea name="" id="descp" cols="30" rows="5"></textarea><span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="state" class="control-label">角色状态</label>
						<div class="controls">
							<select name="" id="state">
								<option value="0">未启用</option>
								<option value="1">已启用</option>
							</select>
						</div>
					</div>
					<div class="control-group">
						<label for="createUser" class="control-label">添加人</label>
						<div class="controls">
							<input id="createUser" value="${sessionScope.username}"  readonly="readonly" type="text"/><span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="createTime" class="control-label">添加日期</label>
						<div class="controls">
							<input   readonly="readonly"  id="createTime" type="text"/><span
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
		<!-- 模态框-权限维护 -->
		<div id="addPrviModal" class="modal hide fade" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
		style="width: 960px;" data-backdrop="static">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-hidden="true">&times;</button>
				<h3>权限维护</h3>
			</div>
			<div class="modal-body" style="min-height: 350px;">
				<!-- <div><span style="float: left;width: 48.7%;margin-left: 21px;">所有权限</span><span>已添加权限</span></div> -->
				
				<div id="div1" style="width: 48%;float: left;overflow-y: auto;height: 98%;">
					<span>所有权限</span>
					<table id="treeTable" class="clear" style="table-layout: fixed;">
						<thead>
							<tr>
								<th width="60%">名称</th>
								<th width="15%">类型</th>
								<th style="text-align: center;"><span
									id="selectAll" style="color: #5AB1EF; cursor: pointer;">全选</span></th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
					<div id="div2" style="float: right; width: 49%;overflow-y: auto;height: 98%;">
					<span>已添加权限</span>
					<ul id="selectedColumnUl" style="margin: 10px 0 0;"></ul>
					</div>
				</div>
				<div class="modal-footer">
					<button id="cancelBtn" type="button" class="cancelBtn">取消</button>
					<button id="saveBtn" type="button" class="confirmBtn">保存</button>
				</div>
		</div>
		<!-- 模态框结束 -->
	</div>
</section>


<!-- 更新部分结束 -->

<!--  
<div class="modal-div div-bg" id="view" style="min-height: 430px;">
	<div class="second_title">
		<span class="black-box"></span> <span class="title_content">角色管理</span>
	</div>
	<div style="padding: 10px">
		
		<div class="gutter-bottom"
			style="position: absolute; margin-top: 8px; z-index: 2;">
			<button id="newBtn" type="button" class="flatten-btn"><i class="fa fa-plus"></i>&nbsp;新增</button>
			<button id="updateBtn" type="button" class="flatten-btn disabled"><i class="fa fa-edit"></i>&nbsp;修改</button>
			<button id="DelBtn" type="button" class="flatten-btn disabled"><i class="fa fa-trash"></i>&nbsp;删除</button>
			<button id="PrivBtn" type="button" class="flatten-btn disabled"><i class="fa"></i>&nbsp;权限维护</button>
		</div>
		<table id="roleTable"
			class="display dataTable table table-bordered no-footer"
			style="table-layout: auto;">
			<thead>
				<tr>
					<th>序号</th>
					<th>角色编号</th>
					<th>角色名称</th>
					<th>角色描述</th>
					<th>角色状态</th>
					<th>权限状态</th>
					<th>添加人</th>
					<th>添加日期</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>

	<div id="div_mod" class="hide">
		<form>
			<table class="clear" style="table-layout: fixed; margin-left: 30px">
				<tr>
					<td><label class="control-label" style="text-align: left;">角色编号</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" id="regid" type="text" data-value=""
						placeholder="由系统自动生成" readonly="readonly" /> <span
						class="help-inline hide"></span></td>
				<tr>
					<td><label class="control-label" for="rname"
						style="text-align: left;">角色名称</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="rname" placeholder="">
						<span class="help-inline hide"></span></td>
				</tr>
				<tr>
					<td><label class="control-label" for="rdescp"
						style="text-align: left;">角色描述</label></td>
				</tr>
				<tr class="table_tr">
					<td><textarea class="span9" rows="5" id="rdescp" data-value=""
							placeholder=""></textarea> <span class="help-inline hide"></span>
					</td>
				</tr>
				<tr>
					<td><label class="control-label" for="rstate"
						style="text-align: left;">角色状态</label></td>
				</tr>
				<tr class="table_tr">
					<td><select class="span9" id="rstate">
							<option value="0">未启用</option>
							<option value="1">已启用</option>
					</select> <span class="help-inline hide"></span></td>
				</tr>
				<tr>
					<td><label class="control-label" style="text-align: left;">添加人</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="rcreatUser"
						value="${sessionScope.username}" placeholder=""
						readonly="readonly"> <span class="help-inline hide"></span>
					</td>
				</tr>
				<tr>
					<td><label class="control-label" for="rcreatTime"
						style="text-align: left;">添加日期</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="rcreatTime"
						placeholder="" readonly="readonly"> <span
						class="help-inline hide"></span></td>
				</tr>
			</table>
		</form>

		<div class="form-actions">
			<button id="buttion_cancel" type="button" class="flatten-btn"
				style="background-color: #E6E6E6; color: #999; width: 80px;">取消</button>
			&nbsp;&nbsp;
			<button id="buttion_add" type="button" class="flatten-btn"
				style="width: 80px;">保存</button>
		</div>
	</div>
</div>

<div id="addPrviModal" class="modal hide fade" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"
	style="width: 960px;" data-backdrop="static">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">&times;</button>
		<div id="myModalLabel">权限维护</div>
	</div>
	<div class="modal-body" style="height: 350px;">
		<!-- <div><span style="float: left;width: 48.7%;margin-left: 21px;">所有权限</span><span>已添加权限</span></div> 
		
		<div id="div1" style="width: 48%; display: inline-block;padding-left: 21px;overflow-y: scroll;height: 98%;">
			<span>所有权限</span>
			<table id="treeTable" class="clear" style="table-layout: fixed;">
				<thead>
					<tr>
						<th width="60%">名称</th>
						<th width="15%">类型</th>
						<th style="text-align: center;"><span
							id="selectAll" style="color: #5AB1EF; cursor: pointer;">全选</span></th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<div id="div2" style="float: right; width: 49%;overflow-y: scroll;height: 98%;">
			<span>已添加权限</span>
			<ul id="selectedColumnUl" style="margin-top: 7px;"></ul>
		</div>
	</div>
	<div class="modal-footer">
		<button id="cancelBtn" type="button" class="flatten-btn"
			style="background-color: #E6E6E6; color: #999; width: 80px;">取消</button>
		&nbsp;&nbsp;
		<button id="saveBtn" type="button" class="flatten-btn"
			style="width: 80px;">保存</button>
	</div>
</div>

-->



