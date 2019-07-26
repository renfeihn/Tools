<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<!-- <link rel="stylesheet" type="text/css" href="module/event/event.css" /> -->
<style>
  #truthAlarmStrategyContainer {
    min-height: 710px;
    border: 1px solid #e5e5e5;
    background: #fff;
  }
  
  #truthAlarmStrategyContainer>.title {
    background: #fafafc;
    border-bottom: 1px solid #ebebed;
    height: 39px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 20px;
    margin: 0;
  }
  
  #truthAlarmStrategyContainer>.content {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative;
  }
  
  #truthAlarmStrategyContainer button.disabled {
    color: #aeadb2;
    border-color: #ebebed;
    cursor: not-allowed;
  }
  
  #truthAlarmStrategyContainer .btn-group>button.disabled {
    color: white;
    border-color: #ebebed;
    cursor: not-allowed;
  }
  
  #truthAlarmStrategyContainer .select {
    display: inline-block;
    position: relative;
  }
  
  #truthAlarmStrategyContainer .select>button {
    height: 32px;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: -5px;
  }
  
  #truthAlarmStrategyContainer .input1 {
    margin-bottom: 0;
    width: 100px;
    padding: 0;
  }
  
  .truthAlarmStrategy-table tbody span.alarm:before,
  .truthAlarmStrategy-table tbody span.warning:before,
  .truthAlarmStrategy-table tbody span.prmot:before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
    display: inline-block;
  }
  
  .truthAlarmStrategy-table tbody span.alarm {
    color: #FF3341;
  }
  
  .truthAlarmStrategy-table tbody span.warning {
    color: #F5C000;
  }
  
  .truthAlarmStrategy-table tbody span.prmot {
    color: #22AC38;
  }
  
  .truthAlarmStrategy-table tbody span.alarm:before {
    background-color: #FF3341;
  }
  
  .truthAlarmStrategy-table tbody span.warning:before {
    background-color: #F5C000;
  }
  
  .truthAlarmStrategy-table tbody span.prmot:before {
    background-color: #22AC38;
  }
  
  .truthAlarmStrategy-table tbody span.connect {
    border: 1px solid blue;
    padding: 0 5px;
  }
  
  /* grant-modal ---start*/
  
  .assign-modal {
    width: 800px;
    transition: all 0.3s;
    margin-left: -380px;
    padding: 0px!important;
    border-radius: 6px;
  }
  
  .assign-modal input {
    height: 28px!important;
    line-height: 28px!important;
    padding: 0 0 0 5px;
    margin: 0px;
    width: 150px;
  }
  
  .assign-modal .modal-header {
    padding-bottom: 0px!important;
    margin-top: 3px;
  }
  
  .assign-modal .modal-header button {
    margin-right: 12px;
    margin-top: 10px;
    border: 0px!important;
  }
  
  .assign-modal .modal-header h3 {
    font-size: 14px;
    margin-left: 12px;
    background-color: #fafafa;
    height: 44px;
    line-height: 44px;
  }
  
  .assign-modal .modal-body {
    padding: 20px!important;
    max-height: inherit!important;
    min-height: 150px;
  }
  
  .assign-modal .modal-footer {
    padding: 0px 20px 20px 20px;
    text-align: center;
  }
  
  .assign-modal .modal-footer button {
    width: 120px;
  }
  
  .assign-modal .modal-body>div>.title {
    font-size: 14px;
    font-weight: 600;
  }
  
  .assign-modal .nav.nav-tabs.nav-ul {
    background: #fafafc!important;
    border-radius: 4px 4px 0 0!important;
    border-bottom: 1px solid #ebebed!important;
    height: 38px!important;
    color: #5c5a66!important;
    padding-left: 20px;
  }
  
  .assign-content table thead th {
    font-weight: bold!important;
    background: #fafafc!important;
    color: #2b2933!important;
    border-bottom: 1px solid #e2e1e6!important;
    border-top: 1px solid #e2e1e6!important;
  }
  
  .assign-content table th,
  .assign-content table td {
    height: 32px;
    line-height: 32px;
    padding: 0px!important;
  }
  
  .assign-content table td:nth-child(1) {
    max-width: 30px!important;
    width: 30px!important;
  }
  
  .assign-content .dataTables_scrollHeadInner {
    width: 100%!important;
  }
  /* grant-modal ---end*/
  
  .truthAlarmStrategy-buttons {
    position: absolute;
    z-index: 2;
    display: flex;
    align-items: center;
    height: 32px;
	min-height: auto!important;
  }
  
  .truthAlarmStrategy-buttons>button {
    margin-left: 10px;
  }
  
  .truthAlarmStrategy-buttons>button.addBtn {
    background: #f9f9fb url(img/button/add-black.png) 8px 6px no-repeat;
    line-height: 22px;
  }
  
  .truthAlarmStrategy-buttons>button.delBtn {
    background: #f9f9fb url(img/button/del-black.png) 8px 6px no-repeat;
    line-height: 22px;
  }
  
  .truthAlarmStrategy-buttons>button.editBtn {
    background: #f9f9fb url(img/button/edit-black.png) 8px 6px no-repeat;
    line-height: 22px;
  }
  
  
  #truthAlarmStrategyContainer .searchbox-margin-left {
  	color: #5b62f9;
    margin-left: 10px;
  }
  
  #truthAlarmStrategyContainer .select-margin-bottom-0 {
    margin-bottom: 0;
    width: 100px;
    height: 22px;
    padding: 0;
  }
  
  .appConfigAlarmStrategy-confirm {
    padding: 0;
  }
  
  .appConfigAlarmStrategy-confirm .modal-header {
    background: #fafafa;
    padding: 6px 20px;
  }
  
  .appConfigAlarmStrategy-confirm .modal-header>button {
    border: none;
  }
  
  /* 表格选中样式 Start */
  
  #truthAlarmStrategyContainer table.dataTable.stripe tbody tr.odd.selected,
  #truthAlarmStrategyContainer table.dataTable.display tbody tr.odd.selected {
    background-color: #e5e5e5;
  }
  
  #truthAlarmStrategyContainer table.dataTable.stripe tbody tr.even.selected,
  #truthAlarmStrategyContainer table.dataTable.display tbody tr.even.selected {
    background-color: #e5e5e5;
  }
  
  #truthAlarmStrategyContainer table.dataTable.hover tbody tr:hover,
  #truthAlarmStrategyContainer table.dataTable.display tbody tr:hover {
    background-color: #e5e5e5;
  }
  
  #truthAlarmStrategyContainer table.dataTable.hover tbody tr:hover.selected,
  #truthAlarmStrategyContainer table.dataTable.display tbody tr:hover.selected {
    background-color: #e5e5e5;
  }
  
  #truthAlarmStrategyContainer #dataTable tbody>tr>:nth-child(3),
  #truthAlarmStrategyContainer #dataTable tbody>tr>:nth-child(5) {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  #truthAlarmStrategyContainer #dataTable_length {
    display: block;
    float: right;
    margin-top: -3px;
  }
  /* 表格选中样式 End */
  /* 发送用户列表弹窗 Start */
.truthAlarmStrategy-modal{
    padding: 0px;
    width: 800px;
    height: 600px;
}

.truthAlarmStrategy-modal .modal-body {
    padding: 20px;
    max-height: 530px;
    overflow-y: hidden;
}
.truthAlarmStrategy-modal .main-right>ul>li{
	background-color: #e5e5e5;
	box-shadow: none;
}

.truthAlarmStrategy-modal .main-right>ul>li.active{
	background-color: rgba(241, 244, 246, .6);
}

.truthAlarmStrategy-modal .dataTables_filter {
    margin-bottom: 0px !important;
}
.truthAlarmStrategy-modal .dataTables_scrollHeadInner .dataTable.no-footer{
	width: 718px !important;
}
/* 发送用户列表弹窗 End */

.startOrStopDetail {
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap:wrap;
	box-sizing: border-box;
}
.startOrStopDetail>span {
	width: calc((100% - 20px)/3);
	flex: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.startOrStopDetail>span:before {
	content: attr(data-title);
	display: inline-block;
	width: 7em;
	color: #5c5a66;
}
.startOrStopConfiger {
	display: flex;
	justify-content: space-between;
}
.startOrStopConfiger>div+div {
	margin-left: 20px;
}
.startOrStopConfiger>div:nth-child(1) {
	flex: 2;
}
.startOrStopConfiger>div:nth-child(2) {
	flex: 1;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid #EBEBEB;
}
.startOrStopConfiger>div:nth-child(2)>div {
	display: flex;
    align-items: center;
}
.startOrStopConfiger>div:nth-child(2) input {
	width: 80px;
	margin: 8px;
}
.startOrStop-modal{
	width: 1200px;
}
.startOrStop-modal .qv_greyBG {
	border: 1px solid #EBEBEB;
	padding: 5px;
	box-sizing: border-box;
	height: 90px; 
	overflow: auto;
}

.startOrStop-modal .yixuanze {
	padding: 6px 9px 6px 0px;
	background: url("img/workList/yixuanzeBG.png") right center no-repeat;
	font-size: 12px;
	font-family: '宋体';
	display: inline-block;
	height: 24px;
	box-sizing: border-box;
	margin-right: 10px;
}

.startOrStop-modal .yixuanze>span {
	background-color: #CAE7FB;
	padding: 6px;
	position: relative;
	top: -4px;
	padding-right: 5px;
}

.startOrStop-modal .daixuanze>span {
	background-color: #F0F0F0;
	padding: 6px;
	position: relative;
	top: -4px;
}

.startOrStop-modal .daixuanze {
	padding: 6px 9px 6px 0px;
	background: url("img/workList/daixuanzeBG.png") right center no-repeat;
	font-size: 12px;
	font-family: '宋体';
	display: inline-block;
	height: 24px;
	box-sizing: border-box;
	margin-right: 10px;
}


.startOrStop-modal .lis {
	display: inline-block;
	margin-bottom: 5px;
}

.startOrStop-modal .jia {
	height: 8px;
	width: 8px;
	cursor: pointer;
	margin-right: 5px;
}

.startOrStop-modal .jian {
	height: 8px;
	width: 8px;
	cursor: pointer;
	margin-left: 5px;
}
.startOrStop-modal .dataTables_scrollHeadInner table{
	width: 1111px !important;
}
.startOrStop-modal #startOrStopTable_filter{
    position: absolute;
    right: 0;
    top: -52px;
    z-index: 1;
}
.thruthAlarmStrategy-startOrStop-modal {
	top: 40px !important;
}
</style>
<section id="truthAlarmStrategyContainer" class="app2Repository-noMargin" style="margin: 0;">
	<p id='test' class="title">标准策略管理</p>
	<div class="content">
		<div class="truthAlarmStrategy-buttons">
			<div class="select btn-group event">
				<button class="btn dropdown-toggle disabled" data-toggle="dropdown" id="assign">策略启停<span class="caret"></span></button>
				<ul class="dropdown-menu">
					<li><a id="assignObject" class="disabled" href="javascript:"><i class="fa fa-file-text"></i>启动</a></li>
					<li><a id="assignAll" class="disabled" href="javascript:"><i class="fa fa-file-text"></i>停止</a></li>
				</ul>
			</div>
			<button type="button" id="add" class="addBtn btn">新增</button>
			<button type="button" id="edit" class="editBtn btn">修改</button>
			<button type="button" id="del" class="delBtn btn">删除</button>
			<i class="searchbox-margin-left fa fa-refresh" id="refresh"></i>
			<button type="button" id="startOrStop" class="btn" style="line-height: 15px; padding-left: 22px; position: relative; display: flex; align-items: center;">
				<i class="fa fa-cog" style="position: absolute;left: 8px;"></i>短信启停</button>
		</div>
		<div id="noDataContainer">
			<table id="dataTable" class="display dataTable table truthAlarmStrategy-table" style="table-layout: fixed;">
				<thead>
					<tr>
						<th style="width: 60px;"><input id="checkboxAll" type="checkbox" /></th>
						<th>指标来源</th>
						<th>触发器名称</th>
						<th>指标</th>
						<th>指标英文名</th>
						<th>报警策略名称</th>
						<th>事件类型</th>
						<th width="300px">消息模板</th>
						<th>是否启动</th>
						<th>是否发送短信</th>
						<th>用户操作</th>
					</tr>
				</thead>
			</table>
		</div>
		<!-- 数据表格End -->
	</div>

</section>

<div id="delModal" class="modal fade hide truthAlarmStrategy-confirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>确认删除</h3>
	</div>
	<div class="modal-body">
		<h4 style="text-align: center;">确定删除？</h4>
	</div>
	<div class="modal-footer">
		<button id="confirm" class="confirmBtn">确定</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
	</div>
</div>

<!-- 短信启停模态窗 -->
<div id="startOrStopModal" class="modal hide startOrStop-modal thruthAlarmStrategy-startOrStop-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h3>短信启停配置</h3>
	</div>
	<div class="modal-body" style="height: 740px !important;max-height: none; overflow-y: hidden;">
		<section class="panel">
			<p class="title">当前策略详情</p>
			<div class="content startOrStopDetail">
				<span data-title="触发器名称：" id="trigger_name"></span>
				<span data-title="指标：" id="display_name"></span>
				<span data-title="报警策略名称：" id="alarmMeName"></span>
				<span data-title="事件类型：" id="event_type"></span>
				<span data-title="是否启动：" id="enabled"></span>
				<span data-title="是否发送短信：" id="messStatus"></span>
			</div>
		</section>
		<section class="panel" style="overflow: visible;">
			<p class="title">配置操作<span style="float: right;">是否发送短信:<span id="sendMessage" class="boolean-switch true" style="float: none;margin-left: 8px; position: relative; top: 7px;"></span></span></p>
			<div class="content startOrStopConfiger">
				<div>
					<div style="display: flex;">选择应用:<select id="startOrStopChooseApp" style="flex: auto; max-width: none; margin-left: 10px;"></select></div>
					<div class="qv_greyBG" style="margin-bottom: 10px;">
						<div style="margin-bottom: 5px;">
							未分配对象：<input type="text" id="search" class="pull-right search-query input-small" placeholder="请输入查询信息">
						</div>
						<div id="selecting_div"></div>
					</div>
					<div class="qv_greyBG">
						<div style="margin-bottom: 5px;">已分配对象：</div>
						<div id="selected_div"></div>
					</div>
				</div>
				<div>
					<div>过滤时间段1:<input data-time type="text" placeholder="起始时间" id="startTime1" readonly>--<input data-time type="text" placeholder="结束时间" id="endTime1" readonly></div>
					<div>过滤时间段2:<input data-time type="text" placeholder="起始时间" id="startTime2" readonly>--<input data-time type="text" placeholder="结束时间" id="endTime2" readonly></div>
					<div>过滤时间段3:<input data-time type="text" placeholder="起始时间" id="startTime3" readonly>--<input data-time type="text" placeholder="结束时间" id="endTime3" readonly></div>
					<div style="margin-top: 10px;">
						<button id="saveTr" class="addBtn">更新</button>
						<button id="reset" class="btn" style="line-height: 15px; margin-left: 20px;width: 60px;position: relative; display: flex; padding-left: 20px; align-items: center;">
							<i class="fa fa-refresh" style="position: absolute;left: 8px;"></i>重置</button>
					</div>
				</div>
			</div>
		</section>
		<section class="panel">
			<p class="title">已配置短信信息</p>
			<div class="content">
				<table id="startOrStopTable" class="display dataTable table" style="table-layout:fixed;">
					<thead>
						<tr>
							<th style="width: 20%;">状态</th>
							<th style="width: 40%;">应用名称</th>
							<th style="width: 40%;">对象</th>
							<th style="width: 40%;">不发送短信时间</th>
							<th style="width: 20%;">操作</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</section>
	</div>
	<div class="modal-footer">
		<button id="confirm" class="confirmBtn">保存</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
	</div>
</div>
  
<!-- 角色用户列表弹出 Start -->
<div id="userRoleListTemp" class="modal fade hide truthAlarmStrategy-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" style="overflow:auto">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>选择短信发送用户</h3>
	</div>
	<div class="modal-body" style="max-height: 550px;">
		<section class="panel">
			<ul id="userTabs" class="nav nav-tabs nav-public">
				<li>
			        <a href="#tab1" data-toggle="tab">分组列表</a>
			    </li>
				<li>
			        <a href="#tab2" data-toggle="tab">用户列表</a>
			    </li>
			</ul>
			<div class="tab-content" style="height: 509px;">
				<div class="tab-pane" id="tab1">
					<table id="groupRole" class="display dataTable table" style="width:100%;">
			            <thead>
				            <tr>
				                <th>分组名</th>
				                <th>分组ID</th>
				            </tr>
			            </thead>
			            <tbody></tbody>
			        </table>
			        <div style="margin-top:20px"></div>
			    	<table id="appConfigAlarmStrategyRoleTb" class="display dataTable table" style="width:100%; table-layout: fixed;">
			            <thead>
				            <tr>
				                <th width="8%"><input id="appConfigAlarmStrategyRoleSelAllBtn" type="checkbox"/></th>
				                <th width="18%">用户ID</th>
				                <th width="18%">用户名</th>
				                <th width="28%">用户拥有的角色</th>
				                <th width="28%">所属组</th>
				            </tr>
			            </thead>
			            <tbody></tbody>
			        </table>
			    </div>
				<div class="tab-pane" id="tab2">
					<table id="appConfigAlarmStrategyUserTb" class="display dataTable table" style="width:100%;table-layout: fixed">
			            <thead>
				            <tr>
			                	<th width="8%"><input id="appConfigAlarmStrategyUserSelAllBtn" type="checkbox"/></th>
				                <th width="18%">用户ID</th>
				                <th width="18%">用户名</th>
				                <th width="28%">用户拥有的角色</th>
				                <th width="28%">所属组</th>
				            </tr>
			            </thead>
			            <tbody></tbody>
			        </table>
			    </div>
			</div>
		 </section>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn" id="appConfigAlarmStrategyUserCanc">取消</button>
		<button id="confirm" class="confirmBtn" type="button">保存</button>
	</div>
</div>
<!-- 角色用户列表弹出 End -->
