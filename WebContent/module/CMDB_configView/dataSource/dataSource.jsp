<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.data-source .appConfigView-popover{
	margin: 0;
}
.data-source .appConfigView-popover>li{
	height: 25px;
    line-height: 25px;
    cursor: pointer;
    font-size: 12px;
}
.data-source .appConfigView-popover>li:hover{
	color: var(--color-theme);
    text-decoration: underline;
}
.data-source span.fa{
	color: var(--color-theme);
	margin: 0 5px;
	cursor: pointer;
}
.data-source span.fa:hover{
	text-decoration: underline;
}
.data-source .addtableRowBtn{
	padding: 4px 12px;
  background-color: #FFF;
  border: 1px solid var(--color-theme);
  color: var(--color-theme);
  cursor: pointer;
  border-radius: 2px;
  z-index: 2;
  margin-left: 10px;
  font-size: 12px;
  font-weight: normal;
  -webkit-user-select: none;
}
.data-source .addtableRowBtn:hover{
	background-color: var(--color-theme);
	color: #fff;
}
/*功能ul*/

/*日志信息修改*/
.logInfoSlider,
.agentInfoSlider{
	width: 1000px;
    height: calc(100vh - 42px);
    position: fixed;
    top: 40px;
    right: 0;
    box-shadow: -1px 1px 5px rgba(0, 0, 0, .5);
    /* transform: translateX(1020px); */
    right: -100%;
    transition: all .5s;
    background-color: #fff;
    z-index: 2;
}
.agentInfoSlider .title{
	background: #fafafc;
	border-bottom: 1px solid #ebebed;
	height: 39px;
	line-height: 40px;
	font-size: 14px;
	padding: 0 20px;
	margin: 0;
}
.logInfoSlider .close,
.agentInfoSlider .title .close{
    color: #000;
    font-size: 30px !important;
    font-weight: 100;
    float: right;
    margin-top: 7px;
}

.logInfoSlider .close{
	margin-right: 20px;
}

.logInfoSlider.active,
.agentInfoSlider.active{
	/* transform: translateX(-1px); */
	right: 0;
	transition: all .5s;
}

/*代理信息修改*/
.appConfigerView-agentForm .control-label{
	width: 7em;
}
.appConfigerView-agentForm .controls>select,
.appConfigerView-agentForm .controls>input,
.appConfigerView-agentForm .controls>textarea {
	width: 100%;
}
.appConfigerView-agentForm div.col-3{
	flex: none;
	width: calc(100% / 2);
}
.appConfigerView-formBtns{
	text-align: right;
	text-align: right;
    margin-right: 40px;
    padding-top: 10px;
}

.filter-condition * {
	margin: 0;
}
.filter-condition {
	display: inline-flex;
	align-items: center;
	height: 24px;
	font-size: 12px;
	margin: 0;
}
.addtableRowBtn.disabled {
	opacity: 0.5;
	filter: grayscale(1);
	pointer-events: none;
}

.checkedNumber-info {
	position: absolute;
  transform: translateY(-100%);
  color: var(--color-theme);
}

#logInfoTable.dataTable tr.active {
	background-color: #d0e8fb !important;
}

.special.addtableRowBtn {
	background-color: var(--color-theme);
	color: #FFF;
}
.datasource-page {
	height: calc(100vh - 42px);
    margin-bottom: 0;
}
.datasource-page.simple {
	height: auto;
	border: none;
}
.datasource-page.simple>p.title {
	display: none;
}
.datasource-page.simple>div.content {
	padding: 1px!important;
}
span.auto-width{
    display: inline-block;
    width: 100px;
}
#logInfoSliderContent #addLogInfoResourceNew-btn {
	position: absolute;
}
</style>
<section class="panel datasource-page">
	<p class="title">日志源管理</p>
	<div class="content">
		<div class="data-source" style="position: relative;">
			<div style ="position: absolute;z-index: 2;width: calc(100% - 180px);display: flex;justify-content: space-between;height: 24px;align-items: center;">
				<form class="filter-condition">
					日志来源：
					<select id="sourceType" style="width: 120px;margin-right: 20px;">
						<option value="">全部</option>
						<option value="Agent采集">Agent采集</option>
						<option value="TCP服务">TCP服务</option>
						<option value="HTTP服务">HTTP服务</option>
						<option value="SNMP服务">SNMP服务</option>
						<option value="UDP服务">UDP服务</option>
						<option value="JDBC接入">JDBC接入</option>
						<option value="Kafka接入">Kafka接入</option>
					</select>
					采集状态：
					<select id="runStatus" style="width: 120px;">
						<option value="">全部</option>
						<option value="运行中">运行中</option>
						<option value="已暂停">已暂停</option>
					</select>
				</form>
				
				<div>
					<span id="addLogInfo" class="addtableRowBtn special">新增</span>
					<span id="deleteLogInfo" class="addtableRowBtn">删除</span>
					<span id="stopAll" class="addtableRowBtn">暂停</span>
					<span id="startAll" class="addtableRowBtn">启动</span>
					<span id="refresh" class="addtableRowBtn">刷新</span>
				</div>
			</div>
			<table id="logInfoTable" class="display dataTable table">
				<thead>
					<tr>
						<th style="width: 60px;"><input type="checkbox" data-role="checkAllBtn"></th>
						<th>日志描述</th>
						<th>应用系统</th>
						<th>资产分类</th>
						<th>日志来源</th>
						<th>IP</th>
						<th>采集状态</th>
						<th style="width:120px;">监控查看</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			<div class="checkedNumber-info">已选择：<span id="selectedNumber">0</span> 条</div>
		</div>
	</div>
</section>


<div id="logInfoSlider" class="logInfoSlider">
	<ul class="nav nav-tabs nav-public">
		<li class="active"><a href="#logInfoSliderContent" data-toggle="tab">日志源配置</a></li>
		<li><a href="#selfField" data-toggle="tab">私有化字段</a></li>
		<li><a href="#dataOutputContent" data-toggle="tab">数据输出</a></li>
		<li><a href="#uploadContent" data-toggle="tab">手工上传</a></li>
		<!-- <li><a href="#clearConfigContent" data-toggle="tab">清理备份</a></li> -->
		<span class="close">x</span>
	</ul>
	<div class="tab-content" style="padding: 20px;height: calc(100% - 80px);">
		<div id="logInfoSliderContent" class="tab-pane active"></div>
		<div id="selfField" class="tab-pane"></div>
		<div id="dataOutputContent" class="tab-pane"></div>
		<div id="uploadContent" class="tab-pane"></div>
		<!-- <div id="clearConfigContent" class="tab-pane"></div> -->
	</div>
</div>

<div id="agentInfoSlider" class="agentInfoSlider">
	<div class="title"><span id="agentInfoSliderTitle"></span><span class="close">x</span></div>
	<div id="agentInfoSliderContent" style="padding: 20px;">
		<form class="form-horizontal appConfigerView-agentForm">
			<div class="control-group">
				<label for="searchName" class="control-label required">IP</label>
				<div class="controls">
					<input type="text" required id="ip" name="ip" placeholder="输入IP地址" />
				</div>
			</div>
			<div class="control-group">
				<label for="" class="control-label required">主机名</label>
				<div class="controls">
					<input type="text" required name="host_name" id="host_name" readonly="readonly" placeholder="根据ip回显"/>
				</div>
			</div>
			<div class="control-group">
				<label for="os_type" class="control-label required">操作系统</label>
				<div class="controls">
					<input type="text" required  name="os_type" id="os_type" readonly="readonly" placeholder="根据ip回显"/>
				</div>
			</div>
			<div class="control-group" >
				<label for="install_user" class="control-label required">代理安装用户</label>
				<div class="controls">
					<input type="text" required  name="install_user" id="install_user"/>
				</div>
			</div>
			<div class="control-group" >
				<label for="agent_user_pwd" class="control-label required">用户密码</label>
				<div class="controls">
					<input type="text" required  name="agent_user_pwd" id="agent_user_pwd" autocomplete="off"/>
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
					<input type="text" name="port" id="port" required readonly="readonly"/>
				</div>
			</div>
		</form>
		<div class="appConfigerView-formBtns">
			<button id="cancelBtn" type="button" class="cancelBtn">取消</button>
			<button id="confirmBtn" type="button" class="confirmBtn">保存</button>
		</div>
	</div>
</div>

<!-- 新增日志源 -->
<div id="addLogSource_modal" class="modal hide fade" data-backdrop="false" aria-hidden="true" style="width: 1400px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">新增日志源</h3>
	</div>
	<div id="addLogSourceFrame"></div>
</div>
<!-- 新增日志源 -->