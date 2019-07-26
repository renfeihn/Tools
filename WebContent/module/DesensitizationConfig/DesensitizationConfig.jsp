<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.DConfig-container #searchTable tbody td:last-child>span.disabled{
	cursor: not-allowed;
	color: #ccc;
}
.DConfig-container #searchTable tbody td:last-child>span{
	color:var(--color-theme);
	cursor: pointer;
	margin: 0 5px;
}
.DConfig-btnGroup{
	position: absolute;
	z-index: 1;
}
.DConfig-container tbody input,
.DConfig-container tbody select{
	margin: 0;
}
.DConfig-roleList{
	margin:0;
}
.DConfig-roleList li{
	display: inline-block;
    border: 1px solid #ebebed;
    padding: 5px 10px;
    border-radius: 5px;
    width: 140px;
    text-align: center;
    margin: 5px;
    cursor: pointer;
}

.DConfig-roleList li:hover{
	box-shadow: 0px 5px 15px rgba(0,0,0,.1);
	transition: all .25s ease;
}

.DConfig-roleList li.active{
	border: 1px solid var(--color-theme);
	background: #dff2fb;
}

.DConfig-roleList li .role{
	height: 25px;
	line-height: 25px;
	font-weight: bold;
}

.DConfig-roleList li .dec{
	font-size: 12px;
    font-weight: normal;
    color: #999;
    height: 12px;
    line-height: 12px;
}

</style>
<section class="panel DConfig-container" style="margin: 0;">
	<p class="title">脱敏规则管理</p>
	<div class="content">
		<div class="DConfig-btnGroup">
			<button type="button" class="addBtn">新增</button>
		</div>
		<table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<!-- <th style="width: 80px;">序号</th> -->
					<th>规则名称</th>
					<th>脱敏字符正则表达式</th>
					<th>替换字符</th>
					<th>限制使用角色</th>
					<th style="width: 110px;">操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>
<div id="modal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 730px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>规则权限</h3>
	</div>
	<div class="modal-body">
		<ul id="roleList" class="DConfig-roleList">
			<!-- <li>
				<div class="role">管理员</div>
				<div class="dec">管理员</div>
			</li> -->
		</ul>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确定</button>
	</div>
</div>
