<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
.YWRZGL-grid>div {
	overflow: auto;
	position: relative;
}
.YWRZGL-grid {
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

.clearApplication-grid input+i {
	position: absolute;
    margin: 2px 0 0 -20px;
    color: #999;
    font-style: normal;
    font-weight: normal;
}
.clearApplication-grid input,
.clearApplication-grid select {
	margin: 0;
	width: 200px;
}
.clearApplication-grid>div {
	/*text-align: center;*/
}
.clearApplication-grid label.control-label {
	margin-right: 12px;
	width: 150px;
}
.clearApplication-grid {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: repeat(7, 34px);
	font-size: 12px;
	padding: 10px;
    align-items: center;
}
.YWRZGL-grid form button[data-role*="saveBtn"]:hover {
	background-color: var(--color-theme);
	color: #fff;
}
.YWRZGL-grid form button[data-role*="saveBtn"] {
    color: var(--color-theme);
    border-color: var(--color-theme);
}
.YWRZGL-grid form button[data-role] {
    /*font-size: 14px;*/
    /*height: 28px;*/
    padding: 0 16px;
}
.ztree li span {
	vertical-align: middle;
}
.YWRZGL-grid .dataTable tr input[type="checkbox"] {
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
.clearApplication-div .popover {
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
	min-width: 260px;
	border: 1px solid #d9d9d9;
}
#strategyDetails {
	color: var(--color-theme);
	font-size: 12px;
}
.layout-log-container{
	display: flex;
}
.YWRZGL-grid #dataTable tbody>tr.selected {
	background: #EAEAEA!important;
}
</style>
<div class="YWRZGL-grid">
	<div>
		<div class="search-input" style="margin: 10px 20px;">
			<input id="categorySearch" type="text" placeholder="搜索"><i class="fa fa-search"></i>
		</div>
		<ul class="ztree" id="ztree2">
			
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
		<div class="layout-log-container">
			<section class="panel" style="margin: 0 20px 20px;width: 100%;">
				<p class="title">归档策略执行<span id="objectId"></span></p>
				<form class="clearApplication-grid form-horizontal">
					<div>
						<label class="control-label required">保留周期</label>
						<input type="text" required="required" id="retention" name="day" value="1" style="text-align: right;padding-right: 20px;"><i>天</i>
					</div>
					<div>
						<label class="control-label required">归档策略</label>
						<select name="" id="strategy">
						</select>
						<a href="javascript:void(0);" id="strategyDetails" class="hide">详情</a>
					</div>
					<div>
						<label class="control-label required">执行时间</label>
						<select name="" id="execTime">
						</select>
						<!-- <input type="text" required="required" id="execTime" name="" data-role="executeTime" readonly="readonly"> -->
					</div>
					<div>
						<label class="control-label required">日志源文件路径</label>
						<input type="text" required="required" id="filePath" style="width: 400px;">
					</div>
					<div>
						<label class="control-label required">日志文件后缀类型</label>
						<input type="text" required="required" id="fileSuffix">
					</div>
					<div>
						<label class="control-label required">递归深度</label>
						<input type="number" min="0" required="required" id="fileDepth">
					</div>
					<div>
						<label class="control-label required">是否清理原日志</label>
						<select name="" id="isClear">
							<option value="0">清理</option>
							<option value="1">不清理</option>
						</select>
					</div>
					<div>
						<label class="control-label required">备份文件前缀</label>
						<input type="text" id="backFilePrefix">
					</div>
					<div>
						<label class="control-label required">备份路径</label>
						<input type="text" required="required" id="bakDir">
					</div>
					<div style="margin-top: 7px;">
						<button type="button" data-role="saveBtn" style="margin-left: 162px;">保存</button>&nbsp;
						<button type="button" data-role="resetBtn">重置</button>&nbsp;
						<button type="button" class="hide" data-role="deleteConfig">删除</button>
					</div>
				</form>
			</section>

			<section class="panel hide" style="margin: 0 20px 20px 0;width: calc(50% - 20px);">
				<p class="title">日志源日志清理<span id="objectId"></span></p>
				<form class="clearApplication-grid form-horizontal">
					<div>
						<label class="control-label required">清理周期</label>
						<input type="number" required="required" id="retention1" name="day" value="1" style="text-align: right;padding-right: 20px;"><i>天</i>
					</div>
					<div>
						<button type="button" data-role="saveBtn1" style="margin-left: 162px;">保存</button>&nbsp;
						<button type="button" data-role="resetBtn1">重置</button>&nbsp;
					</div>
				</form>
			</section>
		</div>

		<div class="layout-log-container">
			<section class="panel" style="margin: 0 20px 20px;width: calc(50% - 20px);">
				<p class="title">清理历史</p>
				<div class="content">
					<table id="historyTable" class="display dataTable table">
						<thead>
							<tr>
								<th style="width: 80px;">序号</th>
								<th>执行结果</th>
								<th>执行耗时</th>
								<th>执行时间</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
			<section class="panel" style="margin: 0 20px 20px 0;width: calc(50% - 20px);">
				<p class="title">日志源主机清理历史</p>
				<div class="content">
					<table id="historyTable1" class="display dataTable table">
						<thead>
							<tr>
								<th style="width: 80px;">序号</th>
								<th>执行主机</th>
								<th>执行结果</th>
								<th>执行耗时</th>
								<th>执行开始时间</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
		</div>
	</div>	
</div>