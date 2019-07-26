<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.logInfoConfig-tianzige {
	display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
    background-origin: content-box;
}
.logInfoConfig-tianzige span:BEFORE {
	content: attr(data-title);
	line-height: 20px;
	display: block;
	color: #888;
	font-size: 14px;
}
.logInfoConfig-tianzige span:NTH-CHILD(1):BEFORE,
.logInfoConfig-tianzige span:NTH-CHILD(1) {
	background-color: #5b62f9;
	color: #FFF;
}
.logInfoConfig-tianzige span:nth-child(n+3){
	margin-top: 10px;
}
.logInfoConfig-tianzige span {
	width: calc(50% - 5px);
	height: 100%;
	border-radius: 2px;
	padding: 20px;
	font-size: 36px;
	line-height: 36px;
	box-sizing: border-box;
	background-color: #FFF;
	text-align: center;
}
.logInfoConfig-flowClassifyList {
	padding: 0;
	margin: 0;
	padding: 0 20px; 
	max-height: calc(100% - 324px);
	overflow-y: auto;
}
.logInfoConfig-flowClassifyList>li:HOVER {
	color: #5b62f9;
	background-color: #f1f0f5;
}
.logInfoConfig-flowClassifyList>li.active:AFTER {
	content: '';
	position: absolute;
	width: 10px;
	height: 20px;
	background-color: #fff;
	clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
    right: -20px;
    top: 6px;
}
.logInfoConfig-flowClassifyList>li.active {
	color: #5b62f9;
}
.logInfoConfig-flowClassifyList>li {
	height: 34px;
	line-height: 34px;
	border-bottom: 1px solid #c7c6cc;
	padding-left: 20px;
	color: #555;
	font-weight: normal;
	cursor: pointer;
	font-size: 12px;
	position: relative;
}
.logInfoConfig-container .dataTables_wrapper  .dataTables_filter{
	position: absolute;
    top: -51px;
    right: 10px;
}
#logSourceTable_wrapper{
	position: static;
}
.logInfoConfig-closeBtn{
	cursor: pointer;
    display: inline-block;
    width: 20px;
    height: 40px;
    position: relative;
    top: 10px;
    margin-top: -16px;
}
.logInfoConfig-closeBtn:before{
	content: '';
    display: block;
    position: absolute;
    top: 20px;
    left: 8px;
    opacity: 1;
    background: #5a62f9 url(img/menu/close.png) center center no-repeat;
    background-size: 12px 12px;
    border-radius: 2px;
    width: 12px;
    height: 12px;
    right: 8px;
}
/*.logInfoConfig-closeBtn:hover{
	color: #5a62f9;
}*/
/*新增日志采集源*/
.logInfoConfig-form .control-label{
	width: 120px;
}
.logInfoConfig-form .controls{
	margin-left: 130px;
	line-height: 24px;
}
.logInfoConfig-form input,
.logInfoConfig-form select{
	width: 100%;
}
.logInfoConfig-form .col2{
	width: calc(50% - 2px);
	display: inline-block;
}
.logInfoConfig-form .col4{
	width: calc(25% - 3px);
	display: inline-block;
}
.logInfoConfig-tips{
	background-color: #fff9db;
	color: #6a431d;
	font-size: 12px;
	font-weight: normal;
	display: inline-block;
	padding: 0 10px;
}
.logInfoConfig-tips span.red{
	color: #ff0200;
}

.logInfoConfig-expand{
	color: #5a62f9;
	cursor: pointer;
}
.logInfoConfig-expand.active span:last-child{
	transform: rotate(90deg);
}
.logInfoConfig-expand span:last-child{
	transition: all 0.2s;
	display: inline-block;
	margin-left: 5px;
	background-color:#fafafc;
	font-size: 16px;
	color:#2b2933;
}
.logInfoConfig-form td{
	position: relative;
}
.logInfoConfig-form td:last-child{
	text-align: right;
}
.logInfoConfig-form td span.require{
    color: #ff9a22;
    position: absolute;
    top: 8px;
    right: 0;
}
.logInfoConfig-addBtn{
	color: #fff;
	background-color: #5a62f9;
	cursor: pointer;
	display: inline-block;
	height: 27px;
	line-height: 27px;
	border-radius: 2px;
	padding: 0 5px;
	width: 90px;
    text-align: center;
}
.logInfoConfig-form .boolean-switch{
	border-radius: 12px;
}
.logInfoConfig-form .boolean-switch:BEFORE{
	width: 20px;
	border-radius: 10px;
}
.logInfoConfig-form .boolean-switch.true:BEFORE{
	margin-left: 20px;
}

.logInfoConfig-form table.dataTable thead th{
	background-color: #e8f2fe;
}
#logSourceTable tbody td:last-child>span{
	color:#5a62f9;
	/*text-decoration: underline;*/
	cursor: pointer;
	margin: 0 5px;
}
.logInfoConfig-table tbody>tr td>span{
    color: #5a62f9;
    /*text-decoration: underline;*/
    cursor: pointer;
    margin: 0 5px;
}
.logInfoConfig-table table{
	table-layout: fixed;
}
#localSubmitTable.localside th:nth-child(8){
	width: 60px !important;
}
#localSubmitTable.serverSide th:nth-child(10){
	width: 45px !important;
}
</style>
<section class="panel logInfoConfig-container" style="margin:0;">
	<p class="title">日志接入管理</p>
	<div class="content">
		<div style="display: flex;height: calc(100vh - 172px);">
			<div style="width: 300px;background-color: #e3e3e6;flex: none;">
				<div style="height: 40px;border-bottom: 1px solid #c7c6cc;padding-left: 20px;line-height: 40px;">
					<i class="fa fa-gear"></i> 日志来源
				</div>
				<div class="logInfoConfig-tianzige">
					<span id="typeCount" data-title="源分类数">-</span>
					<span id="logCount" data-title="日志数">-</span>
					<span id="logRunCount" data-title="服务器数">-</span>
					<span id="logStopCount" data-title="应用系统数">-</span>
				</div>
				<div style="height: 40px;border-bottom: 1px solid #c7c6cc;padding-left: 20px;line-height: 40px;">
					日志来源分类
				</div>
				<ul id="logTypeList" class="logInfoConfig-flowClassifyList"></ul>
			</div>
			<section class="panel" style="flex: auto;margin-left: 20px;position: relative;">
				<ul id="logInfoListUl" class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs1" data-toggle="tab">日志接入列表</a></li>
					<li style="display: none;">
						<a href="#tabs2" data-toggle="tab">
							<span id="title"></span>
							<span class="logInfoConfig-closeBtn" title="关闭"></span>
						</a>
					</li>
				</ul>
				<div class="tab-content" style="height: calc(100% - 40px);overflow: visible;">
					<div id="tabs1" class="tab-pane active logInfoConfig-table">
						<div id="tableBtnGroup" style="position: absolute;top: 8px;right: 200px;">
							<button id="addLogSource" type="button" class="addBtn">新增</button>
						</div>
						<div id="agentTableDiv" style="display: none">
							<table id="agentTable" class="display dataTable table">
								<thead>
									<tr>
										<th style="width: 60px;">序号</th>
										<th>日志信息名称</th>
										<th>应用系统</th>
										<th>三级分类</th>
										<th style="width:120px;">采集状态</th>
										<th>解析规则</th>
										<th>源主机列表</th>
										<th>日志量(MB)</th>
										<th>最后采集时间</th>
										<th style="width: 70px;">操作</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<div id="localSubmitTableDiv" style="display: none">
							<table id="localSubmitTable" class="display dataTable table">
								<thead>
									<tr>
										<th style="width: 60px;">序号</th>
										<th>日志源名称</th>
										<th>应用系统</th>
										<th>三级分类</th>
										<th style="width:120px;">监听状态</th>
										<th>监听目录</th>
										<th>日志解析规则</th>
										<th>已上传流量(MB)</th>
										<th>最后采集时间</th>
										<th>操作</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<div id="UDPTableDiv" style="display: none">
							<table id="UDPTable" class="display dataTable table">
								<thead>
									<tr>
										<th style="width: 60px;">序号</th>
										<th>日志源名称</th>
										<th>应用系统</th>
										<th>三级分类</th>
										<th style="width:120px;">服务状态</th>
										<th>日志解析规则</th>
										<th>服务接入端口</th>
										<th>服务接入地址</th>
										<th>采集流量(MB)</th>
										<th>最后接入时间</th>
										<th style="width: 70px;">操作</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<div id="tabs2" class="tab-pane" style="overflow-y: auto;height: 100%;box-sizing: border-box;"></div>
				</div>
			</section>
		</div>
	</div>
</section>
