<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.databaseAddressConfig-container #searchTable tbody td:last-child>span.disabled {
	color: #ccc;
	cursor: not-allowed;
}
.databaseAddressConfig-container #searchTable tbody td:last-child>span{
	color: var(--color-theme);
	cursor: pointer;
	margin: 0 5px;
}
.databaseAddressConfig-modal .form-horizontal .control-label{
	width: 7em;
}
.databaseAddressConfig-modal .form-horizontal .controls>select,
.databaseAddressConfig-modal .form-horizontal .controls>input,
.databaseAddressConfig-modal .form-horizontal .controls>textarea {
	width: 240px;
}

.databaseAddressConfig-warningForm div.col-3{
	flex: none;
	width: calc(100% / 2);
}
.databaseAddressConfig-warningForm .unShow{
	display: none;
}
.databaseAddressConfig-btnGroup{
	position: absolute;
	z-index: 1;
}
.share-select>div.checked>i.fa.fa-check-circle {
	color: var(--color-theme);
}
.share-select>div>i.fa.fa-check-circle {
	color: #ccc;
	position: absolute;
	background-color: #fff;
	border-radius: 50%;
	left: 30px;
	top: 1px;
}
.share-select>div {
	height: 40px;
    background: url(img/defaultHead.png) no-repeat top left;
    background-size: 40px 40px;
    font-size: 14px;
    line-height: 40px;
    padding-left: 45px;
    position: relative;
    cursor: pointer;
}
.share-select {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    justify-content: space-between;
    grid-row-gap: 15px;
}
</style>

<section class="panel databaseAddressConfig-container" style="margin: 0;">
	<p class="title">数据源配置</p>
	<div class="content">
		<div class="databaseAddressConfig-btnGroup">
			<button type="button" class="addBtn">新增数据源</button>
		</div>
		<table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<th style="width: 80px;">序号</th>
					<th>系统名</th>
					<th>数据库名</th>
					<th>类型</th>
					<th style="width: 300px;">URL</th>
					<th>用户名</th>
					<th>创建人</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>

<!-- 预警模态框 -->
<div id="serverModal" class="modal hide fade databaseAddressConfig-modal" data-backdrop="false" aria-hidden="true" style="width: 500px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">数据源</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal databaseAddressConfig-warningForm">
			<div class="control-group">
				<label for="searchName" class="control-label required">系统名</label>
				<div class="controls">
					<input type="text" name="project" required/>
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label required">数据库名</label>
				<div class="controls">
					<input type="text" name="dbName" required/>
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label required">数据库类型</label>
				<div class="controls" >
					<select name="dbType">
						<option value="DB2">DB2</option>
						<option value="Oracle">Oracle</option>
						<option value="Mysql">Mysql</option>
					</select>
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label required">URL</label>
				<div class="controls">
					<input type="text" name="url" autocomplete="off" required/>
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label required">用户名</label>
				<div class="controls">
					<input type="text" name="user" required/>
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label">密码</label>
				<div class="controls">
					<input type="password" name="password" autocomplete="off"/>
					<span class="help-inline hide"></span>
				</div>
			</div>
			<!-- <div class="control-group">
				<label for="searchName" class="control-label">最大结果数</label>
				<div class="controls">
					<input type="password" name="password" autocomplete="off"/>
					<span class="help-inline hide"></span>
				</div>
			</div> -->
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" class="cancelBtn linktest pull-left">测试连接</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>

<!-- 分享 -->
<div id="shareModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" style="width: 600px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>分享数据源</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal">
			<div class="control-group">
				<label for="searchName" class="control-label required">分享给</label>
				<div class="controls">
					<div id="shareSelect" class="share-select">
						<!-- <div><i class="fa fa-check-circle"></i>test</div> -->
					</div>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
		<button type="button" id="acceptShare" class="confirmBtn">确认</button>
	</div>
</div>