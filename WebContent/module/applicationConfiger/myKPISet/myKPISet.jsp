<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
section.myKPISet-margin {
	margin: -20px -20px 0;
}
.myKPISet-absolute {
	position: absolute;
	z-index: 1;
}
.myKPISet-stepBar {
	height: 70px;
	background-image: linear-gradient(to right, #AEADB3 0%, #AEADB3 100%);
	background-size: 100% 2px;
	background-position: 0 14px;
	background-repeat: repeat-x;
	margin: 20px 0 0 0;
	display: flex;
}

.myKPISet-stepBar>li.done {
	animation: step_done linear 1s forwards;
}

.myKPISet-stepBar>li.done:BEFORE {
	animation: step_circle_done linear 1s forwards;
}

.myKPISet-stepBar>li:AFTER {
	position: absolute;
	left: 0;
	right: 0;
	margin: auto;
	text-align: center;
	top: 34px;
}

.myKPISet-stepBar>li:AFTER {
	content: attr(data-title);
}

.myKPISet-stepBar>li {
	flex: auto;
	background-image: linear-gradient(to right, #5b62f9 0%, #5b62f9 100%);
	background-size: 0 4px;
	background-position: left 14px;
	background-repeat: no-repeat;
	position: relative;
	color: #ADADB4;
}

.myKPISet-stepBar>li:BEFORE {
	content: attr(data-step);
	width: 20px;
	height: 20px;
	border-radius: 50%;
	position: absolute;
	box-sizing: border-box;
	background-color: #dfdfe6;
	left: 0;
	right: 0;
	top: 5px;
	margin: auto;
	box-shadow: 0 0 0 4px #FFF;
	text-align: center;
	color: #FFF;
}

@keyframes step_circle_done {
	0% { background-color: #dfdfe6; }
	40% { background-color: #dfdfe6; }
	60% { background-color: #5b62f9; }
	100% { background-color: #5b62f9; }
}

@keyframes step_done {
	0% { background-size: 0 2px; }
	40% { color: #ADADB4;}
	60% {color: #5b62f9;}
	100% {background-size: 100% 2px;color: #5b62f9;}
}

.myKPISet-stepContent form select,
.myKPISet-stepContent form input {
	width: 100%;
	height: 30px;
}
.myKPISet-stepContent td select,
.myKPISet-stepContent td input {
	width: 90%;
	margin: 0;
}
.myKPISet-stepContent .form-horizontal .control-group label {
	line-height: 30px;
}
.myKPISet-layout {
	display: flex;
}
.myKPISet-layout>div:nth-child(1) {
	flex: 3
}
.myKPISet-layout>div:nth-child(2) {
	flex: 1;
	padding-top: 34px;
}
.myKPISet-kpi-head {
	height: 33px;
    display: flex;
    align-items: center;
    background-color: #fafafc;
    border-top: 1px solid #e2e1e6;
    border-bottom: 1px solid #e2e1e6;
}
.myKPISet-kpi-head>span {
	flex: 1;
	text-align: center;
}
.myKPISet-kpi-body {
	overflow: auto;
	margin: 0;
	max-height: 480px;
}
.myKPISet-kpi-body>li {
    display: flex;
    height: 32px;
    align-items: center;
    background: #f1f0f5;
    border-bottom: 1px solid #e0dfe6;
    box-sizing: border-box;
}
.myKPISet-kpi-body>li>span {
    flex: 1;
    text-align: center;
}
.myKPISet-stepContent #rowEdit {
	margin-right: 20px;
}
.myKPISet-stepContent #rowEdit,.myKPISet-stepContent #rowDelete {
	cursor: pointer;
}
.myKPISet-stepContent #rowEdit:HOVER,.myKPISet-stepContent #rowDelete:HOVER {
	color: #5b62f9;
}
.myKPISet-choosePanel {
	position: absolute;
    width: 560px;
    display: flex;
    max-height: 300px;
    background: #FFF;
    box-shadow: 0 10px 10px rgba(0,0,0,.3);
    border-bottom: 1px solid #c5c4ca;
    border-left: 1px solid #c5c4ca;
    border-right: 1px solid #c5c4ca;
    z-index: 1;
}
.myKPISet-choosePanel>ul {
	flex: 1;
	margin: 0;
	overflow-y: auto;
}
.myKPISet-choosePanel>ul>li {
	height: 34px;
	line-height: 34px;
	padding-left: 20px;
	cursor: pointer;
}
.myKPISet-choosePanel>ul>li:HOVER {
	background-color: #f1f0f5;
}
.myKPISet-choosePanel>ul>li.checked,
.myKPISet-choosePanel>ul>li.checked:HOVER {
	background-color: #5b62f9;
	color: #FFF;
}
</style>

<section class="panel myKPISet-margin">
	<p class="title">我定义的指标集</p>
	<div class="content">
		<div class="myKPISet-absolute">
			<button type="button" class="addBtn" id="addBtn">新增</button>
			<button type="button" class="editBtn disabled" id="editBtn">修改</button>
			<button type="button" class="delBtn disabled" id="delBtn">删除</button>
			<button type="button" class="detailBtn disabled" id="detailBtn">明细</button>
		</div>
		<div class="myKPISet-layout">
			<div>
				<table id="dataTable" class="display dataTable table">
					<thead>
						<tr>
							<th style="width: 100px;">序号</th>
							<th style="width: 220px;">一级分类/二级分类/三级分类</th>
							<th>中文名称</th>
							<th>英文名称</th>
							<!-- <th>指标集描述</th> -->
							<th style="width: 90px;">采集类型</th>
							<th style="width: 90px;">采集频率</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
			<div>
				<div class="myKPISet-kpi-head">
					<span>指标项</span>
					<span>指标名称</span>
					<span>单位</span>
				</div>
				<ul class="myKPISet-kpi-body">
					<!-- <li>
						<span>user</span>
						<span>CPU使用率</span>
						<span>%</span>
					</li> -->
				</ul>
			</div>
		</div>
	</div>
</section>

<div id="addModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1"
	style="width: 700px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">新增指标集</h3>
	</div>
	<div class="modal-body">
		<ul class="myKPISet-stepBar">
			<li data-title="基本信息" data-step="1" class="done"></li>
			<li data-title="数据库信息" data-step="2" class=""></li>
			<li data-title="定义指标项" data-step="3" class=""></li>
		</ul>
		<div class="myKPISet-stepContent">
			<div id="step_1">
				<form class="form-horizontal">
					<div class="control-group">
						<label for="input1" class="control-label required">采集类型</label>
						<div class="controls">
							<select name="" id="collect_type"></select>
							<span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="input1" class="control-label required">所属分类</label>
						<div class="controls">
							<input type="text" id="classify" placeholder="一级分类/二级分类/三级分类" />
							<span class="help-inline hide"></span>
							<div class="myKPISet-choosePanel hide">
								<ul id="classify_1"></ul>
								<ul id="classify_2"></ul>
								<ul id="classify_3"></ul>
							</div>
						</div>
					</div>
					<div class="control-group">
						<label for="input1" class="control-label required">中文名称</label>
						<div class="controls">
							<input type="text" id="name" placeholder="" />
							<span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="input1" class="control-label required">英文名称</label>
						<div class="controls">
							<input type="text" id="ename" placeholder="" />
							<span class="help-inline hide"></span>
						</div>
					</div>	
					<div class="control-group">
						<label for="input1" class="control-label required">采集频率</label>
						<div class="controls">
							<input type="text" id="collect_rate"/>
							<span class="help-inline hide"></span>
						</div>
					</div>
				</form>
			</div>
			<div id="step_2" class="hide">
				<form class="form-horizontal">
					<div class="control-group">
						<label for="input1" class="control-label required">数据库类型</label>
						<div class="controls">
							<select name="" id="d_type"></select>
							<span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="input1" class="control-label required">访问地址</label>
						<div class="controls">
							<input type="text" id="visit_address" placeholder="" />
							<span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="input1" class="control-label required">用户名</label>
						<div class="controls">
							<input type="text" id="username" placeholder="" />
							<span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="input1" class="control-label required">密码</label>
						<div class="controls">
							<input type="text" id="password" placeholder="" />
							<span class="help-inline hide"></span>
						</div>
					</div>	
					<div class="control-group">
						<label for="input1" class="control-label required">SQL语句</label>
						<div class="controls">
							<textarea name="" id="sql" rows="3" style="width: 100%"></textarea>
							<span class="help-inline hide"></span>
						</div>
					</div>
				</form>
			</div>
			<div id="step_3" class="hide">
				<table class="display dataTable table">
					<thead>
						<tr>
							<th style="width: 70px;">序号</th>
							<th style="width: 200px;">指标项中文名称</th>
							<th style="width: 200px;">指标项英文名称</th>
							<th style="width: 70px;">单位</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<!-- <tr>
							<td>1</td>
							<td></td>
							<td></td>
							<td></td>
							<td>
								<i id="rowEdit" class="fa fa-edit"></i>
								<i id="rowDelete" class="fa fa-trash"></i>
							</td>
						</tr>
						<tr>
							<td>2</td>
							<td><input type="text" /></td>
							<td><input type="text" /></td>
							<td><select id="unit"></select></td>
							<td>
								<button id="rowSave" type="button">保存</button>
								<button id="rowCancel" type="button">取消</button>
							</td>
						</tr> -->
						<tr>
							<td></td>
							<td><button type="button" class="addBtn">添加</button></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="cancelBtn hide" id="prevStepBtn">上一步</button>
		<button type="button" class="confirmBtn" id="nextStepBtn">下一步</button>
	</div>
</div>