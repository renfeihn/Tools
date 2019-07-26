<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
.clearApplication-div .form-horizontal .control-label {
	width: 105px;
}
.clearApplication-div .form-horizontal .controls {
	margin-left: 115px;
	line-height: 24px;
}
.clearApplication-div .form-horizontal .controls select {
	font-size: 12px;
	width: 206px;
}
.clearApplication-div span[data-role="boolean-switch"]:BEFORE {
    content: '';
    position: absolute;
	width: 18px;
	height: 18px;
    background: #FFF;
    border-radius: 10px;
    transition: all 0.3s;
    top: 1px;
    left: 1px;
    border-radius: 50%;
	border: none;
}
.clearApplication-div span[data-role="boolean-switch"]{
    display: inline-block;
    position: relative;
    width: 34px;
    height: 20px;
    cursor: pointer;
    transition: all 0.3s;
    background: #c7c6cc;
    float: left;
    clear: right;
    margin: 2px 0 0 0px;
    border-radius: 20px;
}

.clearApplication-div span[data-role="boolean-switch"].true {
	background: var(--color-theme);
}

.clearApplication-div span[data-role="boolean-switch"].true:BEFORE {
	transform: translateX(14px);
	margin-left: 0;
}
.clearApplication-div .edit {
	color: #4494fc;
	cursor: pointer;
	font-size: 12px;
	text-align: right;
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
	width: 240px;
	border: 1px solid #d9d9d9;
}
</style>

<div class="clearApplication-div">
	<form class="form-horizontal">
		<div class="control-group">
			<label class="control-label required">数据清除</label>
			<div class="controls">
				<span></span>
				<span id="dataCleanType" class="hide" data-role="boolean-switch"></span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label required">数据备份策略</label>
			<div class="controls">
				<span></span>
				<select id="dataBakId" class="hide"><option value="">不备份</option></select>
				<span class="plan-detail">详情</span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label required">文件清除</label>
			<div class="controls">
				<span></span>
				<span id="fileCleanType" class="hide" data-role="boolean-switch"></span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label required">文件备份策略</label>
			<div class="controls">
				<span></span>
				<select id="fileBakId" class="hide"><option value="">不备份</option></select>
				<span class="plan-detail">详情</span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label required">备份周期</label>
			<div class="controls">
				<span></span>
				<input id="retentionDays" class="hide" type="number" min="1" required="required" style="width: 103px;">&nbsp;天
			</div>
		</div>
		<div class="control-group">
			<label class="control-label required">计划执行时间</label>
			<div class="controls">
				<span></span>
				<input id="executeTime" class="hide" type="text" required="required">
			</div>
		</div>
		<div class="control-group">
			<div class="controls">
				<button data-role="edit" type="button"><i class="fa fa-edit"></i>&nbsp;编辑</button>
				<button data-role="cancel" class="hide" type="button"><i class="fa fa-times"></i>&nbsp;取消</button>
			</div>
		</div>
	</form>
	
	<div style="margin: 20px;">
		<section class="panel" style="width: 800px;">
			<p class="title">清理历史</p>
			<div class="content">
				<table id="dataTable" class="display dataTable table">
					<thead>
						<tr>
							<th>序号</th>
							<th>清理类型</th>
							<th>清理前大小</th>
							<th>清理后大小</th>
							<th>执行时间</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</section>
	</div>
</div>

