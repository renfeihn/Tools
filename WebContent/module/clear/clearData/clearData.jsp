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
	z-index:3;
}

</style>
<section class="panel" style="height: calc(100vh - 42px);margin: 0;">
	<p class="title">归档策略</p>
	<div class="content">
		<button type="button" class="addBtn" id="addBtn" style="position: absolute;z-index: 1;">新增</button>
		<div class="controls" style = "position: absolute;right:200px;z-index: 1;";>
			<select id="ratioCheck">
				<option value="" selected="selected">全部</option>
				<option value="存储归档">存储归档</option>
				<option value="文件归档">文件归档</option>
			</select>
		</div>
		<table id="dataTable" class="display dataTable table">
			<thead>
				<tr>
					<th>序号</th>
					<th>策略类型</th>
					<th>策略名称</th>
					<th>备份方式</th>
					<th>归档周期</th>
					<th>是否清理</th>
					<th>是否启用</th>
					<th>引用次数</th>
					<th>创建时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>

<form class="form-horizontal clear-modal" id="modal">
	<div class="control-group">
		<label class="control-label required">策略名称</label>
		<div class="controls">
			<input type="text" id="cleanName" required />
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">策略类型</label>
		<div class="controls">
			<select id="dataType">
				<option value="1" selected="selected">存储归档</option>
				<option value="2">文件归档</option>
			</select>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">备份方式</label>
		<div class="controls">
			<select id="bakType">
				<option value="2" selected="selected">远程服务器</option>
				<option value="1">本地文件</option>
			</select>
		</div>
	</div>
	
	<div class="control-group">
		<label class="control-label required">日志源目录</label>
		<div class="controls">
			<input type="text" id="logSourcePath" required autocomplete="off"/>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">日志后缀</label>
		<div class="controls">
			<input type="text" id="logFileSuffix" required autocomplete="off" placeholder="*或者*.后缀名"/>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">归档周期</label>
		<div class="controls">
			<input type="text" id="achiveDayNum" required autocomplete="off"/>
		</div>
	</div>
	<!-- <div class="control-group">
		<label class="control-label required">引用次数</label>
		<div class="controls">
			<input type="text" id="" placeholder="引用次数" required>
		</div>
	</div> -->
	<!-- <div class="control-group">
		<label class="control-label required">创建时间</label>
		<div class="controls">
			<input type="text" id="" placeholder="创建时间" required>
		</div>
	</div> -->
	<div class="control-group">
		<label class="control-label">压缩方式</label>
		<div class="controls">
			<select id="packType">
				<option value="0">tar</option>
				<option value="1">tar.gz</option>
			</select>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">归档目录</label>
		<div class="controls">
			<input type="text" id="bakDir" placeholder="输入目录" required>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">归档文件前缀</label>
		<div class="controls">
			<input type="text" id="achiveFilePrefix" placeholder="英文命名，防止乱码" required>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">文件传输方式</label>
		<div class="controls">
			<select id="transType">
				<option value="1">ftp</option>
				<option value="2">sftp</option>
				<option value="3">scp</option>
			</select>
		</div>
	</div>
	<div class="control-group">
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
	</div>
	<div class="control-group">
		<label class="control-label required">是否启用</label>
		<div class="controls">
			<select id="isEnable">
					<option value="0" selected="selected">启用</option>
					<option value="1">不启用</option> 
			</select>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">执行时间</label>
		<div class="controls">
			<select name="" id="execTime">
			</select>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">是否清理</label>
		<div class="controls">
			<select id="isClear">
				<option value="0" selected="selected">是</option>
				<option value="1">否</option> 
			</select>
		</div>
	</div>
	<div class="control-group">
		<label class="control-label required">递归深度</label>
		<div class="controls">
			<input type="text" id="recursiveDeep" required autocomplete="off" placeholder="从源目录开始的文件夹深度"/>
		</div>
	</div>
	<div class="control-group">
		<div class="controls">
			<button type="button" class="cancelBtn">取消</button>
			<button type="button" class="confirmBtn">确认</button>
		</div>
	</div>
</form>
