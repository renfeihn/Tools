<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
.form-horizontal.clear-modal .control-label {
	width: 105px;
}
.form-horizontal.clear-modal .controls {
	margin-left: 125px;
}
.clear-modal{
	position: absolute;
	right: 0;
	transform: translateX(100%);
	transition: all .3s;    
	width: 450px;
	background: #fafafc;
	padding: 20px;
	border: 1px solid #e9e8ed;
	overflow-y: auto;
	top: 0;
	bottom: 0;
	box-shadow: -4px 0 10px rgba(0,0,0,.4);
}
.clear-modal select {
	width: 205px;
}

.clear-modal.uneditable .uneditable {
	display: none;
}
</style>
<!-- <section class="panel" style="height: calc(100vh - 42px);margin: 0;">
	<p class="title">应用链路</p> -->
	<div class="content">
		<button type="button" class="addBtn" id="addBtn" style="position: absolute;z-index: 1;">新增</button>
		<table id="dataTable" class="display dataTable table">
			<thead>
				<tr>
					<th>序号</th>
					<th>应用系统</th>
					<th>主机IP</th>
					<th>文件名</th>
					<th>来源</th>
					<th>业务标识</th>
					<th>说明</th>
					<th>操作</th>
					<th></th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
<!-- </section> -->

<form class="form-horizontal clear-modal" id="modal">
	<div class="control-group">
		<label class="control-label">应用系统</label>
		<div class="controls">
			<!-- <input type="text" id="appId" /> -->
			<select id="appId">
				
			</select>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label">主机IP</label>
		<div class="controls">
			<input type="text" id="hostIp"/>
			<!-- <select id="hostIp">
				<option value="1" selected="selected">数据</option>
				<option value="2">文件</option>
			</select> -->
		</div>
	</div>
	<div class="control-group">
		<label class="control-label">文件名</label>
		<div class="controls">
			<input type="text" id="logFile"/>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label">来源</label>
		<div class="controls">
			<select id="source">
				<option value="0">配置</option>
				<option value="1">智能分析</option>
			</select>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">业务标识</label>
		<div class="controls">
			<textarea rows="4" id="tranKeys" placeholder="" required></textarea>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">说明</label>
		<div class="controls">
			<input type="text" id="tranDesc" placeholder="" required>
		</div>
	</div>
	<!-- <div class="control-group">
		<label class="control-label required">服务器地址</label>
		<div class="controls">
			<input type="text" id="address" placeholder="IP地址:端口" required >
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">用户名</label>
		<div class="controls">
			<input type="text" id="userName" required/>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">密码</label>
		<div class="controls">
			<input type="password" id="passwd" required autocomplete="off"/>
		</div>
	</div> -->
	<div class="control-group uneditable">
		<div class="controls" style="margin-left: 0;text-align: center;">
			<button type="button" class="cancelBtn">取消</button>
			<button type="button" class="confirmBtn">确认</button>
		</div>
	</div>
</form>
