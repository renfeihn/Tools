<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.flowCM-tianzige {
	display: flex;
    flex-wrap: wrap;
    height: 100px;
    justify-content: space-between;
    align-content: space-between;
    padding: 20px;
    background-origin: content-box;
}
.flowCM-tianzige span:BEFORE {
	content: attr(data-title);
	line-height: 20px;
	display: block;
	color: #888;
	font-size: 14px;
}
.flowCM-tianzige span:NTH-CHILD(1):BEFORE,
.flowCM-tianzige span:NTH-CHILD(1) {
	background-color: var(--color-theme);
	color: #FFF;
}
.flowCM-tianzige span {
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
.flowCM-flowClassifyList {
	padding: 0;
	margin: 0;
	padding: 0 20px; 
	max-height: calc(100% - 222px);
	overflow-y: auto;
}
.flowCM-flowClassifyList>li:HOVER {
	color: var(--color-theme);
	background-color: #f1f0f5;
}
.flowCM-flowClassifyList>li.active:AFTER {
	content: '';
	position: absolute;
	width: 10px;
	height: 20px;
	background-color: #fff;
	clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
    right: -20px;
    top: 6px;
}
.flowCM-flowClassifyList>li.active {
	color: var(--color-theme);
}
.flowCM-flowClassifyList>li {
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
.flowCM-flowClassifyList>li .editClass{
	font-size: 14px;
    float: right;
    margin-top: 5px;
    padding-right: 8px;
    display: none;
}
.flowCM-flowClassifyList>li:hover .editClass{
	display: block;
}
#logSourceTable_filter{
	position: absolute;
    top: 8px;
    right: 20px;
}
#logSourceTable_wrapper{
	position: static;
}
.flowCM-closeBtn{
	cursor: pointer;
    display: inline-block;
    width: 20px;
    height: 40px;
    position: relative;
    top: 10px;
    margin-top: -16px;
}
.flowCM-closeBtn:before{
	content: '';
    display: block;
    position: absolute;
    top: 20px;
    left: 8px;
    opacity: 1;
    background: var(--color-theme) url(img/menu/close.png) center center no-repeat;
    background-size: 12px 12px;
    border-radius: 2px;
    width: 12px;
    height: 12px;
    right: 8px;
}
/*.flowCM-closeBtn:hover{
	color: #5a62f9;
}*/
#logSourceTable tbody td:last-child>span{
	color:var(--color-theme);
	cursor: pointer;
	margin: 0 5px;
}
</style>
<section class="panel flowCM-container" style="margin: 0;">
	<p class="title">解析规则管理</p>
	<div class="content">
		<div style="display: flex;height: calc(100vh - 122px);">
			<div style="width: 300px;background-color: #e3e3e6;flex: none;height: 100%;">
				<div style="height: 40px;border-bottom: 1px solid #c7c6cc;padding-left: 20px;line-height: 40px;">
					<i class="fa fa-gear"></i>解析规则
				</div>
				<div class="flowCM-tianzige">
					<span id="typeCount" data-title="分类总数">-</span>
					<span id="logCount" data-title="日志总数">-</span>
				</div>
				<div style="height: 40px;border-bottom: 1px solid #c7c6cc;padding-left: 20px;line-height: 40px;">
					解析规则分类
					<div class="button-group" style="float: right;margin-right: 20px;">
						<button id="addClassBtn" type="button" class="addBtn">新建分类</button>
					</div>
				</div>
				<ul id="logTypeList" class="flowCM-flowClassifyList">
					<!-- <li logType="Text">软件日志</li>
					<li logType="Syslog">服务器日志</li>
					<li logType="Nginx">网络设备日志</li> -->
				</ul>
			</div>
			<section class="panel" style="flex: auto;margin-left: 20px;position: relative;height: 100%;">
				<ul id="logInfoListUl" class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs1" data-toggle="tab">解析规则列表</a></li>
					<li style="display: none;">
						<a href="#tabs2" data-toggle="tab">
							<span id="title">新增／修改 </span>
							<span class="flowCM-closeBtn" title="关闭"></span>
						</a>
					</li>
				</ul>
				<div class="tab-content" style="height: calc(100% - 40px);">
					<div id="tabs1" class="tab-pane active">
						<div id="tableBtnGroup" style="position: absolute;top: 8px;right: 200px;">
							<button id="addLogSource" type="button" class="addBtn">新增</button>
							<button id="import" type="button">导入</button>
							<button id="export" type="button" class="disabled">导出</button>
							<!-- <button id="structConfig" type="button" class="disabled">结构化配置</button> -->
							<input id="file" type="file" name="file" style="display: none;" accept=".xml">
						</div>
						<table id="logSourceTable" class="display dataTable table">
							<thead>
								<tr>
									<th>序号</th>
									<th>日志描述</th>
									<!-- <th>日志类型</th> -->
									<th>日志字符集</th>
									<th>日志事务模式</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					<div id="tabs2" class="tab-pane"></div>
				</div>
			</section>
		</div>
	</div>
</section>
<div id="addLogClassModal" class="modal hide fade" data-backdrop="false"
	aria-hidden="true">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="addLogClassModalTitle">新增</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal" style="padding-left: 40px;margin: 30px 0;">
			<div class="control-group">
				<label class="control-label required">分类名称</label>
				<div class="controls">
					<input type="text" name="typeName" id="typeName" required>
					<span class="help-inline hide"></span>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button id="logClassDel" type="button" class="cancelBtn">删除</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
		<button id="logClassAdd" type="button" class="confirmBtn">确认</button>
	</div>
</div>
