<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.groupManage-select {
	position: absolute;
    width: 206px;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    font-size: 12px;
    display: none;
    max-height: 80px;
    overflow: auto;
}
.groupManage-select>span {
	border-bottom: 1px solid #e5e5e5;
    width: 100%;
    display: block;
    padding: 0 10px;
    box-sizing: border-box;
}
.groupManage-select>span.active {
	background-color: #b3b7ff;
}
.groupManage-buttons{
	margin-bottom: 10px;
}
.groupManage-buttons>button+button{
	margin-left: 10px;
}
.groupManage-modal select{
	width: 206px;
}

.groupManage-sysmodal .qv_greyBG {
	background-color: #FFF!important;
	padding: 10px;
	border: 1px solid #EBEBEB;
}

.groupManage-sysmodal .yixuanze {
	padding: 6px 9px 6px 0px;
	background: url("img/workList/yixuanzeBG.png") right center no-repeat;
	font-size: 12px;
	font-family: '宋体';
	display: inline-block;
	height: 24px;
	box-sizing: border-box;
	margin-right: 10px;
}

.groupManage-sysmodal .yixuanze>span {
	background-color: #CAE7FB;
	padding: 6px;
	position: relative;
	top: -4px;
	padding-right: 5px;
}

.groupManage-sysmodal .daixuanze>span {
	background-color: #F0F0F0;
	padding: 6px;
	position: relative;
	top: -4px;
}

.groupManage-sysmodal .daixuanze {
	padding: 6px 9px 6px 0px;
	background: url("img/workList/daixuanzeBG.png") right center no-repeat;
	font-size: 12px;
	font-family: '宋体';
	display: inline-block;
	height: 24px;
	box-sizing: border-box;
	margin-right: 10px;
}


.groupManage-sysmodal .lis {
	display: inline-block;
	margin-bottom: 5px;
}

.groupManage-sysmodal .jia {
	height: 8px;
	width: 8px;
	cursor: pointer;
	margin-right: 5px;
}

.groupManage-sysmodal .jian {
	height: 8px;
	width: 8px;
	cursor: pointer;
	margin-left: 5px;
}
.groupManage-messGroupBtn{
	position: absolute;
	z-index: 2;
}
.groupManage-messGroupBtn>span:before{
	content:attr(data-title);
	color: #a9a9a9;
	margin-right: 8px;
}
.groupManage-messGroupBtn>span+span{
	margin-left: 20px;
}
.dataTable tr.selected {
	background-color: #f0f0f5!important;
}
</style>

<div class="content">
	<div class="groupManage-buttons">
		<button type="button" id="add" class="addBtn">新增</button>
		<button type="button" id="edit" class="editBtn">修改</button>
		<button type="button" id="del" class="delBtn">删除</button>
		<button type="button" id="confirm" class="addBtn">资源组短信配置</button>
	</div>
	<table id="dataTable" class="display dataTable table">
		<thead>
			<tr>
				<th>分组名</th>
                <th>分组ID</th>
                <th>短信启停</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
	<div style="margin: 10px 0">
		<button type="button" id="systemBtn" class="addBtn disabled">应用短信配置</button>
	</div>
	<table id="roleTable" class="display dataTable table" style="width: 100%; table-layout: fixed;">
		<thead>
			<tr>
				<!-- <th><input id="roleSelAllBtn" type="checkbox" /></th> -->
				<th>用户ID</th>
				<th>用户名</th>
				<th>用户拥有的角色</th>
				<th>所属组</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
</div>


<!-- 新增组模态窗 -->
<div id="modal" class="modal hide fade groupManage-modal" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">新增分组</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal">
			<div class="control-group">
				<label for="gname" class="control-label required">分组名</label>
				<div class="controls">
					<input type="text" id="gname" placeholder="这里是必输的" data-skip='info'/>
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="gid" class="control-label required">分组ID</label>
				<div class="controls">
					<input type="text" id="gid" placeholder="这里是必输的" data-skip='info'/>
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="platform" class="control-label">事件来源</label>
				<div class="controls">
					<select name="" id="platform" data-skip='info'>
						<option value="-1">全部</option>
						<option value="00">00-aim</option>
						<option value="01">01-mocha</option>
						<option value="02">02-天旦</option>
						<option value="03">03-虚拟化</option>
						<option value="04">04-存储</option>
						<option value="05">05-网络</option>
						<option value="06">06-OEM</option>
						<option value="07">07-动环</option>
						<option value="08">08-华为云平台</option>
					</select>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>

<!-- 维护组人员 -->
<div id="userTableModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">资源组短信配置</h3>
	</div>
	<div class="modal-body" style="max-height: 450px">
		<div class="groupManage-messGroupBtn">
			<span data-title="总短信人数:" id="allMessPerson"></span>
			<span data-title="短信配置人数:" id="messPerson"></span>
		</div>
		<table id="userTable" class="display dataTable table">
		<thead>
			<tr>
				<th><input type="checkbox" id="userSelAllBtn"></th>
				<th>用户Id</th>
				<th>用户名</th>
				<th>用户拥有的角色</th>
				<th>所属组</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>

<!-- 维护组系统 -->
<div id="sysTableModal" class="modal hide fade groupManage-sysmodal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">应用短信配置</h3>
	</div>
	<div class="modal-body" style="height: 400px">
		<div class="qv_greyBG" style="height: 100px; border-bottom: none; overflow: auto;">
			<div style="margin-bottom: 5px;">已分配系统：</div>
			<div id="selected_div"></div>
		</div>
		<div class="qv_greyBG" style="height: 260px; overflow: auto;">
			<div style="margin-bottom: 5px;">未分配系统：<input type="text" id="search" class="pull-right search-query input-small" placeholder="请输入查询信息"></div>
			<div id="selecting_div"></div>
		</div>
		<!-- <select id="multSelect" multiple="multiple"></select> -->
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>




