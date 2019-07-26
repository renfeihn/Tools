<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style type="text/css">
.logStorageManage-grid>div {
	overflow: auto;
	position: relative;
}
.logStorageManage-grid {
	display: grid;
	grid-template-columns: 240px 1fr;
	grid-template-rows: 100%;
	height: calc(100vh - 40px);
}
.search-input {
	position: relative;
	display: flex;
}
.search-input input {
	width: 100%;
	margin: 0;

}
.search-input i:active {
	background-color: #ebecee;
}
.search-input i {
	position: absolute;
	right: 1px;
	top: 1px;
	width: 22px;
	height: 22px;
	background-color: #f9f9fb;
	border-left: 1px solid #c7c6cc;
	text-align: center;
	color: #c7c6cc;
	line-height: 22px;
	font-weight: normal;
	cursor: pointer;
}

.logStorage-grid input+i {
	position: absolute;
    margin: 2px 0 0 -20px;
    color: #999;
    font-style: normal;
    font-weight: normal;
}
.logStorage-grid input,
.logStorage-grid select {
	margin: 0;
	width: 200px;
}
.logStorage-grid>div {
	/* float: left;
    width: 46%;
    margin-bottom: 10px; */
}
.logStorage-grid label.control-label {
	margin-right: 12px;
	width: 150px;
}
.logStorage-grid {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(4, 34px);
	font-size: 12px;
	padding: 10px;
    align-items: center;
}
.logStorageManage-grid form button[data-role="saveBtn"]:hover {
	background-color: var(--color-theme);
	color: #fff;
}
.logStorageManage-grid form button[data-role="saveBtn"] {
    color: var(--color-theme);
    border-color: var(--color-theme);
}
.logStorageManage-grid form button[data-role] {
    /*font-size: 14px;*/
    /*height: 28px;*/
    padding: 0 16px;
}
.ztree li span {
	vertical-align: middle;
}
.logStorageManage-grid .dataTable tr input[type="checkbox"] {
	margin: -2px 0 0 5px;
    vertical-align: middle;
}
.config-YEWRZ {
	color: #fff;
    display: inline-block;
    font-size: 12px;
    font-style: normal;
    border-radius: 2px;
    background-color: #4494fc;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    padding: 0px 4px;
    margin-left: 8px;
}
.no-config-YEWRZ {
	color: #fff;
    display: inline-block;
    font-size: 12px;
    font-style: normal;
    border-radius: 2px;
    background-color: #aaa;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
    padding: 0px 4px;
    margin-left: 8px;
}
.logStorage-div .popover {
	max-width: none;
}
.plan-detail {
	color: var(--color-theme);
	border-bottom: 1px solid var(--color-theme);
	cursor: pointer;
	margin-left: 20px;
	font-size: 10px;
}
.plan-detail-table tr td:first-child {
	background-color: #fafafa;
	width: 40%;
}
.plan-detail-table tr td:last-child {
	color: #333;
}
.plan-detail-table td {
	height: 22px;
	line-height: 22px;
	vertical-align: middle;
	padding: 0 10px;
	color: #999;
	font-size: 10px;
	box-sizing: border-box;
	border: 1px solid #d9d9d9;
}
.plan-detail-table {
	table-layout: fixed;
	min-width: 250px;
	border: 1px solid #d9d9d9;
}
#strategyDetails {
	color: var(--color-theme);
	font-size: 12px;
}
.logStorage-grid .boolean-switch {
	border-radius: 12px;
	float: none;
	margin-bottom: -8px;
}

.logStorage-grid .boolean-switch:BEFORE {
	width: 20px;
	border-radius: 10px;
}

.logStorage-grid .boolean-switch.true:BEFORE {
	margin-left: 20px;
}
.logStorageManage-grid span.status {
	padding: 2px 10px;
    border: 1px solid #FFF;
    color: #FFF;
    border-radius: 4px;
    font-size: 12px;
}
.logStorageManage-grid span.status.status-succ {
	background-color: #00E9BB
}
.logStorageManage-grid span.status.status-fail {
	background-color: #FB7852
}
.logStorageManage-grid span.status.status-doing {
	background-color: #669FFF
}
.logStorageManage-grid span.status.status-undo {
	background-color: #DCDFE2
}
</style>
<div class="logStorageManage-grid">
	<div>
		<div class="search-input" style="margin: 10px 20px;">
			<input id="categorySearch" type="text" placeholder="搜索"><i class="fa fa-search"></i>
		</div>
		<ul class="ztree" id="ztree1">
			
		</ul>
	</div>	
	<div style="background-color: #fff;border: 15px solid #f1f0f5;">
		<div style="padding: 20px;overflow: auto;">
			<table id="dataTable" class="display dataTable table">
				<thead>
					<tr>
						<th style="width: 80px;">序号</th>
						<!-- <th style="width: 80px;">选择</th> -->
						<th>对象ID</th>
						<th>对象名称</th>
						<th>分类ID</th>
						<th>分类</th>
						<th>监控状态</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<section class="panel" style="margin: 0 20px 20px;">
			<p class="title">归档策略执行<span id="appId"></span></p>
			<form class="logStorage-grid form-horizontal">
				<div>
					<label class="control-label required">保留周期</label>
					<input type="text" required="required" id="retention" name="day" value="1" style="text-align: right;padding-right: 20px;"><i>天</i>
				</div>
				<div id = "bakStrategy">
					<label class="control-label required">归档策略</label>
					<select name="" id="strategy">
					</select>
					<a href="javascript:void(0);" id="strategyDetails" class="hide">详情</a>
				</div>
				<div>
					<label class="control-label">执行时间</label>
					<select id="execTime"></select>
				</div>
				<div>
					<label class="control-label required">备份文件前缀</label>
					<input type="text" id="backFilePrefix">
				</div>
				<div>
					<label class="control-label required">备份路径</label>
					<input type="text" required="required" id="bakDir">
				</div>
				<%--<div>--%>
					<%--<label class="control-label required">是否清理</label>--%>
					<%--<div class="controls">--%>
						<%--<span class="boolean-switch" id="bakFlag"></span>--%>
					<%--</div>--%>
				<%--</div>--%>
				<div>
					<label class="control-label required">是否清理原日志</label>
					<select name="" id="isClear">
						<option value="0">清理</option>
						<option value="1">不清理</option>
					</select>
				</div>
				<div style ="margin-top: 10px;">
					<button type="button" data-role="saveBtn" style="margin-left: 162px;">保存</button>&nbsp;
					<button type="button" data-role="resetBtn">重置</button>&nbsp;
					<button type="button" class="hide" data-role="deleteConfig">删除</button>
				</div>
			</form>
		</section>

		<section class="panel" style="margin: 0 20px 20px;">
			<p class="title">清理历史</p>
			<div class="content">
				<table id="historyTable" class="display dataTable table">
					<thead>
						<tr>
							<th style="width: 80px;">序号</th>
							<th>清理大小</th>
							<th>清理时间</th>
							<th>归档状态</th>
							<th>归档耗时</th>
							<th>清理状态</th>
							<th>清理耗时</th>
							<th style="width: 60px;">操作</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</section>
	</div>	
</div>