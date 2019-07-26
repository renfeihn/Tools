<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
#searchTable tbody td:last-child>span{
	color:#5a62f9;
	cursor: pointer;
	margin: 0 5px;
}
/*.LFTM-container #searchTable_filter{
	position: absolute;
    top: -52px;
    right: 0;
}*/
.LFTM-btns{
	position: absolute;
	top: 55px;
	left: 20px;
	z-index: 2;
}
.LFTM-modal .form-horizontal .control-label{
	width: 7em;
}
.LFTM-modal .form-horizontal .controls>select,
.LFTM-modal .form-horizontal .controls>input,
.LFTM-modal .form-horizontal .controls>textarea {
	width: 100%;
}
.LFTM-warningForm div.col-3{
	flex: none;
	width: calc(100% / 2);
}

.LFTM--warningForm *[readonly=readonly]{
	cursor: not-allowed;
	background-color: #eee;
}
.LFTM--warningForm *[readonly=readonly]:focus{
	border: 1px solid #c7c6cd;
}


.reStructDataModal-tableContent{
	display: flex;
	position: relative;
}
.reStructDataModal-tableContent>div{
	flex: none;
	width: 100%;
	max-height: 300px;
	overflow: auto;
}
.reStructDataModal-tableContent .selectRole{
	color: #5b62f9;
	cursor: pointer;
	text-decoration: underline;
}

.reStructDataModal-tableContent i{
	cursor: pointer;
}
.reStructDataModal-tableContent i.selected{
	color: #5B62F9;
}
table.reStructDataModal-table{
	width: 100% !important;
	flex: none;
	position: relative;
}
.LRTM-process{
	position: relative;
	border: 1px solid #e2e1e6;
	background-color: #fafafc;
	border-radius: 2px;
	height: 20px;
}

.LRTM-process>div{
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 2px;
	background:#76c375;
}
.LRTM-process>span{
	position: absolute;
	top: 0px;
	left: 50%;
	z-index: 2;
}
.LRTM-process.active div{
	background: linear-gradient(45deg, #5bc0de 25%, #76cae3 0, #76cae3 50%, #5bc0de 0, #5bc0de 75%, #76cae3 0);
	background-size: 10px 10px;
	animation: backmove .4s infinite linear;
}

@keyframes backmove{
  0%{background-position:0px 0px;}
  100%{background-position:10px 0px;}
}
</style>

<section class="panel LFTM-container" style="margin: 0;">
	<p class="title">数据转发任务管理</p>
	<div class="content">
		<div class="LFTM-btns">
			<button class="confirmBtn"><i class="fa fa-refresh" style="font-size: 16px;"></i>&nbsp;&nbsp;刷新任务</button>
		</div>
		<table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<th style="width: 80px;">序号</th>
					<th>任务描述</th>
					<th>检索条件</th>
					<th>起始时间</th>
					<th>截止时间</th>
					<th>任务处理状态</th>
					<th>转发方式</th>
					<th>日志大小</th>
					<!-- <th>解析规则分类</th>
					<th>解析规则名称</th> -->
					<th>转发地址</th>
					<!-- <th style="width: 110px;">操作</th> -->
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>

<div id="dataServiceModal" class="modal hide fade LFTM-modal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 1000px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>日志数据转发定义</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal LFTM-warningForm">
			<div class="control-group">
				<label class="control-label required">数据描述</label>
				<div class="controls">
					<input name="dataDesc" id="ds_dataDesc" type="text">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">数据检索条件</label>
				<div class="controls">
					<input name="search" type="text" readonly="readonly">
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label required">数据时间范围</label>
					<div class="controls">
						<select name="timeType">
							<option value="0">所有时间</option>
							<option value="1">条件选定时间</option>
							<option value="2">条件选定起始时间</option>
							<option value="3">条件选定截止时间</option>
						</select>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label required">结构化数据选择</label>
				<div class="controls reStructDataModal-tableContent">
					<table id="dataService_logSourceTable" class="display dataTable table reStructDataModal-table" style="table-layout: fixed;">
						<thead>
							<th style="width: 41px;"><i id="selectAll" class="fa fa-square-o"></i></th>
							<th style="width: 60px;">数据源ID</th>
							<th style="width: 80px;">数据源名称</th>
							<th style="width: 80px;">应用系统名称</th>
							<th style="width: 80px;">三级分类</th>
							<th style="width: 60px;">日志大小</th>
						</thead>
					</table>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label required">待转发数据总量</label>
					<div class="controls">
						<input name="forwardSize" type="text" readonly="readonly">
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label required">是否包含结构化</label>
					<div class="controls">
						<input name="includeStruct" type="radio" value="0" style="width: auto;margin: 0 10px;" checked>是
						<input name="includeStruct" type="radio" value="1" style="width: auto;margin: 0 10px;">否
					</div>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label required">转发方式</label>
					<div class="controls">
						<select name="forwardType">
							<option value="1">kafka消息队列</option>
						</select>
					</div>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label required">消息队列名称</label>
					<div class="controls">
						<input type="text" name="topicName" id="ds_topicName">
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label required">数据存留周期</label>
					<div class="controls">
						<input type="number" name="retentionDays" id="ds_retentionDays" min="0" max="7" placeholder="天：最长7天">
					</div>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label required">kafka对接地址</label>
					<div class="controls">
						<input type="text" name="address" id="ds_address">
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label required">kafka对接端口</label>
					<div class="controls">
						<input type="text" name="port" id="ds_port">
					</div>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" class="cancelBtn taskBtn">任务管理</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">退出</button>
		<button type="button" class="confirmBtn">提交</button>
	</div>
</div>
