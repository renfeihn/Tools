<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.manual-upload-page form {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.manual-upload-page .control-group{
	width: 340px;
}
.manual-upload-page .control-label{
    width: 90px;
}
.manual-upload-page input {
    width: 240px;
    height: 28px;
}
.manual-upload-page .btns {
	text-align: center;
	margin-top: 20px;
}
.manual-upload-page .controls {
	position: relative;	
}
.manual-upload-page .controls .help-inline {
    position: absolute;
    min-width: 50px;	
}
</style>
<div class="manual-upload-page">
	<!-- 是否批量      ip  端口   用户名   密码   ftp目录/文件名  指定数据源    需要上传的目录 -->
	<form class="form-horizontal" id="upload_form">
		<div class="control-group">
			<label for="ip" class="control-label required">IP</label>
			<div class="controls">
				<input type="text" id="ip" placeholder="" required/>
			</div>
		</div>
		<div class="control-group">
			<label for="port" class="control-label required">端口</label>
			<div class="controls">
				<input type="text" id="port" placeholder="" required/>
			</div>
		</div>
		<div class="control-group">
			<label for="useruser" class="control-label required">用户名</label>
			<div class="controls">
				<input type="text" id="user" placeholder="" required/>
			</div>
		</div>
		<div class="control-group">
			<label for="pass" class="control-label required">密码</label>
			<div class="controls">
				<input type="text" id="pass" placeholder="" required/>
			</div>
		</div>
		<div class="control-group">
			<label for="ftpFile" class="control-label required">FTP文件/目录</label>
			<div class="controls">
				<input type="text" id="ftpFile" placeholder="" required/>
			</div>
		</div>
		<div class="control-group">
			<label for="filePath" class="control-label required">上传目录</label>
			<div class="controls">
				<input type="text" id="filePath" placeholder="" required/>
			</div>
		</div>
		<div class="control-group">
			<label for="input1" class="control-label">批量下载</label>
			<div class="controls">
				<span class="boolean-switch true" id="multiple_download"></span>
			</div>
		</div>
	</form>
	<div class="btns">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" data-dismiss="modal" class="confirmBtn">保存</button>
	</div>
</div>