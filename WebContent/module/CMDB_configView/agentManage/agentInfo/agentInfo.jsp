<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.agent-baseinfo .form-horizontal .control-label {
    width: 100px;
    line-height: 30px;
}
.agent-baseinfo .form-horizontal .controls {
    margin-left: 120px;
}
.agent-baseinfo .form-horizontal input,
.agent-baseinfo .form-horizontal select {
	width: 100%;
	height: 30px;
}
.agent-baseinfo .operate-wrap {
    text-align: right;
    margin-bottom: 10px;
}
.agent-baseinfo .btn-wrap {
	text-align: center;
}
</style>
<div class="agent-baseinfo">
	<div class="operate-wrap">
		<button type="button" class="editBtn">修改</button>
	</div>
	<div class="form-content">
		<form class="form-min form-horizontal" id="modalForm" >
			<div class="control-group" >
				<label for="ip" class="control-label required" autocomplete="off">IP</label>
				<div class="controls">
					<input type="text" required name="ip" id="ip"/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="" class="control-label required">主机名</label>
				<div class="controls">
					<input type="text" required name="host_name" id="host_name" readonly="readonly" placeholder="根据ip回显"/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide help-tip-urlConfig"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="os_type" class="control-label required">操作系统</label>
				<div class="controls">
					<input type="text"  required name="os_type" id="os_type" readonly="readonly" placeholder="根据ip回显"/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide help-tip-urlConfig"></span>
				</div>
			</div>
			
			<div class="control-group" >
				<label for="install_user" class="control-label required">代理安装用户</label>
				<div class="controls">
					<input type="text"  required name="install_user" id="install_user" autocomplete="off" placeholder=""/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group" >
				<label for="agent_user_pwd" class="control-label required">用户密码</label>
				<div class="controls">
					<input type="text"  required name="agent_user_pwd" id="agent_user_pwd" autocomplete="off" placeholder=""/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group" >
				<label for="protocol" class="control-label required">协议</label>
				<div class="controls">
					<select class="agm-protocol" name="protocol" id="protocol">
						<option value="ssh">ssh</option>
						<option value="telnet">telnet</option>
					</select>
				</div>
			</div>
			
			<div class="control-group">
				<label for="port" class="control-label required">端口</label>
				<div class="controls">
					<input type="text" required name="port" id="port" autocomplete="off"/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide"></span>
				</div>
			</div>
		</form>
	</div>
	<div class="btn-wrap">
		<button type="button" class="confirmBtn">确认</button>
		<button type="button" class="cancelBtn">取消</button>
	</div>
</div>