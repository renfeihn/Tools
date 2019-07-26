<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.agent-manage-page {
	height: calc(100vh - 42px);
    margin-bottom: 0;
}
.agent-manage-page.simple {
	height: auto;
	border: none;
}
.agent-manage-page.simple>p.title {
	display: none;
}
.agent-manage-page.simple>div.content {
	padding: 1px!important;
}
.agent-manage .appConfigView-popover {
	margin: 0;
}

.agent-manage .appConfigView-popover>li {
	height: 25px;
	line-height: 25px;
	cursor: pointer;
	font-size: 12px;
}

.agent-manage .appConfigView-popover>li:hover {
	color: var(--color-theme);
	text-decoration: underline;
}

.agent-manage span.fa {
	color: var(--color-theme);
	margin: 0 5px;
	cursor: pointer;
}

.agent-manage span.fa:hover {
	text-decoration: underline;
}

.agent-manage .addtableRowBtn,
.excute-btn {
	padding: 4px 12px;
	background-color: #FFF;
	border: 1px solid var(--color-theme);
	color: var(--color-theme);
	cursor: pointer;
	border-radius: 2px;
	/* position: absolute; */
	z-index: 2;
	margin-left: 10px;
	font-size: 12px;
	font-weight: normal;
}

.agent-manage .addtableRowBtn:hover,
.excute-btn:hover {
	background-color: var(--color-theme);
	color: #fff;
}

/*功能ul*/

.agent-manage #agentTable_filter {
	position: absolute;
	top: -34px;
	right: 0;
}

/*日志信息修改*/
.agentSlider {
	width: 600px;
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

.agentSlider .title {
	background: #fafafc;
	border-bottom: 1px solid #ebebed;
	height: 39px;
	line-height: 40px;
	font-size: 14px;
	padding: 0 20px;
	margin: 0;
}

.agentSlider .close,
.agentSlider .title .close {
	color: #000;
	font-size: 30px !important;
	font-weight: 100;
	float: right;
	margin-top: 7px;
}

.agentSlider .close {
	margin-right: 20px;
}

.agentSlider.active {
	right: 0 !important;
	transition: all .5s;
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

.special.addtableRowBtn {
	background-color: var(--color-theme);
	color: #FFF;
}

.checkedNumber-info {
	position: absolute;
	transform: translateY(-100%);
	color: var(--color-theme);
}

#agentTable {
	table-layout: fixed;
}

#agentTable thead>tr>th:last-child {
	width: 130px!important;
}

#agentTable.dataTable tr.active {
	background-color: #d0e8fb !important;
}

#agentBaseInfo,
#agentHistory,
#agentExcute {
	padding: 0 !important;
}

.agent-shelter {
	position: absolute;
	top: -20px;
	left: -20px;
	right: -20px;
	bottom: -20px;
	display: none;
	background: rgba(0, 0, 0, .7);
}

.agent-shelter.show {
	display: flex;
	justify-content: center;
	align-items: center;
}

.agent-shelter .text-val {
	color: #eff0f1;
	margin-top: 10px;
	font-size: 16px;
}

.agent-shelter .animation-wrap {
	display: flex;
	justify-content: center;
	align-items: center;
}

.agent-shelter .animation-wrap>span {
	width: 10px;
	height: 24px;
	background: #d6dce0;
	transition: all linear;
	animation: run 1s linear infinite;
}

.agent-shelter .animation-wrap>span:nth-child(2) {
	margin: 0 5px;
	animation: run 1s linear infinite .2s;
}

.agent-shelter .animation-wrap>span:nth-child(3) {
	animation: run 1s linear infinite .4s;
}

@keyframes run {
	0% {
		transform: scale(1, 1);
	}

	40% {
		transform: scale(1, 1.5);
	}

	80% {
		transform: scale(1, 1);
	}

	100% {
		transform: scale(1, 1);
	}
}

</style>
<section class="panel agent-manage-page">
	<p class="title">代理监控</p>
	<div class="content">
		<div class="agent-manage" style="position: relative;">
			<div
				style="width: calc(100% - 180px);display: flex;justify-content: space-between;height: 24px;align-items: center;margin-bottom: 10px;">
				<form class="filter-condition">
					代理状态：
					<select id="instal_status" style="width: 120px;margin-right: 20px;">
						<option value="">全部</option>
						<option value="已安装">已安装</option>
						<option value="未安装">未安装</option>
					</select>
					运行状态：
					<select id="agent_status" style="width: 120px;margin-right: 20px;">
						<option value="">全部</option>
						<option value="1">在线</option>
						<option value="0">离线</option>
						<option value="2">挂起</option>
					</select>
					Ping连通性：
					<select id="ping_status" style="width: 120px;">
						<option value="">全部</option>
						<option value="连通">连通</option>
						<option value="中断">中断</option>
					</select>
				</form>
				
				<div>
					<span id="agent_add" class="addtableRowBtn" data-role="AGENT_INSTALL">安装</span>
					<span id="agend_refresh" class="addtableRowBtn" data-role="PING">刷新</span>
					<span id="agent_start" class="addtableRowBtn" data-role="START_AGENT">启动</span>
					<span id="agent_pause" class="addtableRowBtn" data-role="STOP_AGENT">挂起</span>
					<span id="agent_restart" class="addtableRowBtn" data-role="RESTART_AGENT">重启</span>
					<span id="agent_update" class="addtableRowBtn" data-role="UPDATE_AGENT">更新</span>
				</div>
			</div>
			<table id="agentTable" class="display dataTable table">
				<thead>
					<tr>
						<th style="width: 60px;"><input type="checkbox" data-role="checkAllBtn"></th>
						<th>应用系统</th>
						<th>主机名</th>
						<th>操作系统</th>
						<th>IP</th>
						<th>代理状态</th>
						<th>运行状态</th>
						<th>Ping连通性</th>
						<th>代理安装用户</th>
						<th>协议</th>
						<th>端口</th>
						<th>最后刷新时间</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			<div class="checkedNumber-info hide">已选择：<span id="selectedNumber">0</span> 条</div>
		</div>
	</div>
</section>


<div id="agentSlider" class="agentSlider">
	<ul class="nav nav-tabs nav-public">
		<li class="active"><a href="#agentBaseInfo" data-toggle="tab">代理信息</a></li>
		<li><a href="#agentHistory" data-toggle="tab">操作历史</a></li>
		<li><a href="#agentExcute" data-toggle="tab">代理执行</a></li>
		<span class="close">x</span>
	</ul>
	<div class="tab-content" style="padding: 20px;height: calc(100% - 80px);">
		<div id="agentBaseInfo" class="tab-pane active"></div>
		<div id="agentHistory" class="tab-pane"></div>
		<div id="agentExcute" class="tab-pane"></div>
	</div>
</div>