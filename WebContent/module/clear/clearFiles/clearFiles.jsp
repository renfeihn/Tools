<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
.clear-file-container {
	background-color: #fff;
	list-style-type: none;		
	counter-reset: sectioncounter;
}
.clear-file-container+button {
	height: auto;
	width: 100px;
	border-radius: 2px;
	margin: 10px auto;
	background-image: none;
	border: none;
	box-shadow: none;
}
.clear-file-container .form-horizontal>.tool-Btn>i:HOVER {
	opacity: 1;
	color: #2f96b4;
}
.clear-file-container .form-horizontal>.tool-Btn>i {
	opacity: 0.5;
	cursor: pointer;
}
.clear-file-container .form-horizontal>.tool-Btn {
    position: absolute;
    right: 20px;
    top: 10px;
}
.clear-file-container .form-horizontal:before {
	content: counter(sectioncounter) ". ";
	counter-increment: sectioncounter;
	position: absolute;
	right: 100%;
    top: 0;
    margin-right: 10px;
}
.clear-file-container .form-horizontal {
	display: flex;
	flex-wrap: wrap;
	width: 900px;
	padding: 40px 20px 10px;
	margin: 10px auto;
	border-radius: 4px;
	position: relative;
	background-color: #f5f5f5;
}
.clear-file-container .form-horizontal.editing {
	background-color: #fff;
	border: 1px dashed #d9d9d9;
}
.clear-file-container .form-horizontal>.control-group {
	width: 450px;
	flex: none;
}
.clear-file-container .form-horizontal .control-label {
	width: 120px;
}
.clear-file-container .form-horizontal .controls {
	margin-left: 140px;
}
.clear-file-container .form-horizontal .controls select {
	width: 206px;
}
</style>
<div class="clear-file-container">
	<form id="formTemplate" class="form-horizontal">
		<div class="tool-Btn">
			<i id="save" class="fa fa-check fa-fw" title="完成"></i>
			<i id="edit" class="fa fa-edit fa-fw" title="编辑"></i>
			<i id="delete" class="fa fa-trash fa-fw" title="删除"></i>
		</div>
		<div class="control-group">
			<label class="control-label required">清理策略名称</label>
			<div class="controls">
				<input type="text" id="cleanName" required />
			</div>
		</div>
		<div class="control-group">
			<label class="control-label required">备份方式</label>
			<div class="controls">
				<select id="bakType" class="bakType">
					<option value="2" selected="selected">远程服务器</option>
					<option value="1">本地文件</option>
				</select>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label required">压缩方式</label>
			<div class="controls">
				<select id="packType">
					<option value="0">tar</option>
					<!-- <option value="1">tar.gz</option> -->
				</select>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label required">备份文件目录</label>
			<div class="controls">
				<input type="text" id="bakDir" placeholder="输入或选择目录" required>
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
				<input type="text" id="address" placeholder="10.9.2.3:22" required data-reg="/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/">
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
				<input type="text" id="passwd" required autocomplete="off"/>
			</div>
		</div>
	</form>
</div>
<button id="add_new_item_button" class="btn btn-block btn-info" type="button"><i class="fa fa-plus" style="font-size: 14px;"></i>&nbsp;</button>


