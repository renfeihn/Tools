<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
#searchTable tbody td:last-child>span{
	color: var(--color-theme);
	cursor: pointer;
	margin: 0 5px;
}
/*.LRFTM-container #searchTable_filter{
	position: absolute;
    top: -52px;
    right: 0;
}*/
.LRFTM-btns{
	position: absolute;
	top: 55px;
	left: 20px;
	z-index: 2;
}
.LRFTM-modal .form-horizontal .control-label{
	width: 7em;
}
.LRFTM-modal .form-horizontal .controls>select,
.LRFTM-modal .form-horizontal .controls>input,
.LRFTM-modal .form-horizontal .controls>textarea {
	width: 100%;
}
.LRFTM-warningForm div.col-3{
	flex: none;
	width: calc(100% / 2);
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
	color: var(--color-theme);
	cursor: pointer;
	text-decoration: underline;
}

.reStructDataModal-tableContent i{
	cursor: pointer;
}
.reStructDataModal-tableContent i.selected{
	color: var(--color-theme);
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
/*解析规则选择*/
.reStructDataModal-roleSelectContent{
	margin: 0;
	display: none;
	position: absolute;
    background: #fff;
    width: 400px;
    box-shadow: -2px 1px 10px rgba(0,0,0,.3);
    padding: 10px;
    right: 155px;
    top: 100px;
    margin-bottom: 5px;
}
.reStructDataModal-roleSelectContent:before{
	content: '';
	display: block;
	position: absolute;
	background-color: #fff;
	top: 50%;
	right: -6px;
	width: 10px;
	height: 10px;
	transform: rotate(45deg);
	border-right: 1px solid #e9e9e9;
	border-top: 1px solid #e9e9e9;
}
.reStructDataModal-roleSelectContent .roleSelectContent-close{
	opacity: 1;
	color: #bfbec5;
	font-size: 22px !important;
	font-weight: 100;
	text-shadow: none;
	position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
}
.reStructDataModal-roleSelectContent .roleSelectContent-close:hover{
	color: #000;
}
.reStructDataModal-roleSelectContent>li>p{
	font-size: 14px;
	color: #5e619f;
}
.reStructDataModal-roleSelectContent .roleSelectItems{
	width: 100%;
	padding-left: 30px;
	word-wrap: break-word;
	color: #5c5a66;
	box-sizing: border-box;
}
.reStructDataModal-roleSelectContent .role{
	padding: 5px;
	line-height: 30px;
	cursor: pointer;
}

.reStructDataModal-roleSelectContent .role.active{
	background-color: #e1e2f0;
}
</style>

<section class="panel LRFTM-container" style="margin: 0;">
	<p class="title">二次格式化任务管理</p>
	<div class="content">
		<div class="LRFTM-btns">
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
					<th>数据处理百分比</th>
					<th>日志大小</th>
					<!-- <th>解析规则分类</th>
					<th>解析规则名称</th> -->
					<th>排队序号</th>
					<th style="width: 110px;">操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>

<div id="reStructDataModal" class="modal hide fade LRFTM-modal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 1000px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">日志数据重新格式化</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal LRFTM-warningForm">
			<div class="control-group">
				<label class="control-label">数据描述</label>
				<div class="controls">
					<input name="taskDesc" type="text">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">数据检索条件</label>
				<div class="controls">
					<input name="taskCond" id="reStruct-search" type="text" disabled>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label">起始时间</label>
					<div class="controls">
						<input name="startTime" id="reStruct-startTime" type="text" disabled>
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label">截止时间</label>
					<div class="controls">
						<input name="endTime" id="reStruct-endTime" type="text" disabled>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label">结构化数据选择</label>
				<div class="controls reStructDataModal-tableContent">
					<table id="logSourceTable" class="display dataTable table reStructDataModal-table" style="table-layout: fixed;">
						<thead>
							<th style="width: 41px;"><i id="selectAll" class="fa fa-square-o"></i></th>
							<th style="width: 60px;">数据源ID</th>
							<th style="width: 80px;">数据源名称</th>
							<th style="width: 80px;">应用系统名称</th>
							<th style="width: 80px;">三级分类</th>
							<th style="width: 60px;">日志大小</th>
							<th style="width: 80px;">解析规则设置</th>
						</thead>
					</table>
					<ul id="roleSelectContent" class="reStructDataModal-roleSelectContent">
						<li>
							<p>广发银行</p>
							<div class="roleSelectItems">
								<span class="role">lyyceshi</span><span class="role">陕西信合AFA4J日志采集</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label">待解析日志总量</label>
					<div class="controls">
						<input name="dataSize" type="text" disabled>
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label">预计排队</label>
					<div class="controls">
						<input id="taskNo" name="taskSeq" type="text" disabled>
					</div>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<div id="viBtn">
			<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		</div>
		<div id="editBtn">
			<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
			<button type="button" class="confirmBtn">提交</button>
		</div>
	</div>
</div>
