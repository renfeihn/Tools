<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.objCateConfig-wrap p{
	margin: 0;
}
.objCateConfig-resources-ctn {
	margin: 0;
	overflow: hidden;
	padding-top: 20px;
}
.objCateConfig-resources-ctn li {
	float: left;
	width: 140px;
	height: 140px;
	background-color: #fafafc;
	margin-right: 20px;
	margin-left: 10px;
	margin-bottom: 20px;
	border-radius: 4px;
	background-image: url(img/cmdb_icon/server/server-physics.png);
    background-position: center 0px;
    position: relative;
    background-repeat: no-repeat;
    background-size: 120px 120px;
    box-sizing: border-box;
    padding-top: 96px;
    text-align: center; 
    cursor: pointer;
    word-break: break-all;
}
.objCateConfig-resources-ctn li:hover,
.objCateConfig-resources-type-ctn li.resource-type-temp {
	border: 1px solid #ddd;
}
.objCateConfig-resources-ctn li.active {
	border: 1px solid var(--color-theme);
	cursor: default;
	box-shadow: 0 0 20px #aaa;
}
.objCateConfig-resources-ctn li:hover .resource-type-remove-btn,
.objCateConfig-resources-type-ctn li.resource-type-temp .resource-type-remove-btn {
	display: block;
}
.objCateConfig-resources-type-ctn li .resource-type-ok-btn {
	position: absolute;
    right: 13px;
    top: -6px;
    color: var(--color-theme);
    font-size: 16px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
}
.resource-type-remove-btn {
    position: absolute;
    right: -5px;
    top: -6px;
    color: red;
    font-size: 16px;
    background-color: #fff;
    border-radius: 50%;
    display: none;
    cursor: pointer;
}
.objCateConfig-resources-type-ctn li{
	background-size: 80px 80px;
    background-position: center 28px;
    position: relative;
}
.objCateConfig-modal .form-horizontal .control-label {
	width: 100px;
}
.objCateConfig-modal .form-horizontal .controls {
	margin-left: 115px;
}
/*.objCateConfig-modal .data-required:after {
	content: '*';
	color: red;
}*/
.objCateConfig-relativeObj {
	position: absolute;
	background: #fff;
	width: 110px;
	border: 1px solid #aaa;	
	border-radius: 4px;
	margin: 0;
	top: 24px;
	left: 0;
	max-height: 180px;
	overflow-y: auto;
}
.objCateConfig-relativeObj li {
	color: #5b62f9;
	cursor: pointer;
	padding: 4px 15px;
}
.objCateConfig-relativeObj li:hover {
	text-decoration: underline;
}
.objCateConfig-relativeModal {
	width: 1000px !important;
}
.objCateConfig-relative-ctn {
	margin: 0;
	height: 300px;
	overflow-y: auto;
	background: #eee;
}
.objCateConfig-relative-ctn li {
	padding: 4px 15px;
	cursor:pointer;
}
.objCateConfig-relative-ctn li:hover {
	background: #5b62f9;
	color: #fff;
}
.resource-type-add-btn:hover {
    background: url(img/eventDetails/add-blue.png) center center no-repeat rgb(247, 247, 250);
}
.resource-type-add-btn {
	float: left;
	width: 140px;
	height: 140px;
	margin-right: 20px;
	margin-left: 10px;
	margin-bottom: 20px;
	border-radius: 4px;
	cursor: pointer;
	background: url(img/eventDetails/add.png) center center no-repeat rgb(247, 247, 250);
}
input[type="text"].resource-softwareName {
	width: 100px;
	text-align: center;
	border: none;
	border-bottom: 1px solid #ccc;
	border-radius: 0;
	background-color: transparent;
	color: #333;
	font-size: 14px;
}
</style>

<section class="panel objCateConfig-wrap" style="margin: 0;border:none;">
	<div class="content">
		<div>
			<p>资源分类</p>
			<ul id="resourceCateCtn" class="objCateConfig-resources-ctn">
				<!-- <li class="active">服务器</li>
				<li style="background-image: url(img/cmdb_icon/software/software-db.png)">数据库</li>
				<li style="background-image: url(img/cmdb_icon/software/software-middleware.png)">中间件</li> -->
			</ul>
		</div>
		<div>
			<p>资源类型</p>
			<ul id="resourceTypeCtn" class="objCateConfig-resources-ctn objCateConfig-resources-type-ctn">
				<!-- <li class="active" style="background-image: url(img/baseMonitor/linux.png)">Linux</li>
				<li style="background-image: url(img/baseMonitor/aix.png)">Aix</li>
				<li style="background-image: url(img/baseMonitor/hpux.png)">Hpux</li>
				<li style="background-image: url(img/baseMonitor/windows.png)">Windows</li> -->
			</ul>
		</div>
		<div style="position: relative; border: 1px solid #ddd; padding: 20px; border-radius: 4px; height: 266px;">
			<div style="position: absolute; top: 20px; left: 20px; z-index: 10;">
				<button id="newBtn" type="button" class="addBtn">新增</button>
				<button id="updateBtn" class="editBtn disabled">修改</button>
				<button id="delBtn" type="button" class="delBtn disabled">删除</button>
				<!-- <div style="display: inline-block; position: relative;">
					<button id="relativeBtn" type="button" class="disabled">关联</button>
					<ul id="relativeCates" class="objCateConfig-relativeObj hide">
						<li>服务器</li>
						<li>数据库</li>
						<li>中间件</li>
						<li>网络</li>
						<li>操作系统</li>
					</ul>
				</div>
				<button id="discoverBtn" type="button" class="disabled">发现</button> -->
			</div>
			<form action="./CmdbConfigManagerAction_importCmdbData.do" method="post" enctype="multipart/form-data" target="_blank"  style="position: absolute; right: 200px; top: 17px; z-index: 5;">
				<input id="file" name="fileName" type="file" style="width: 160px; position: relative; top: 4px;"/>
				<button id="inputBtn" type="button" style="margin-right: 15px;">导入excel</button>
				<button id="outputExcelBtn" style="margin-right: 15px;" type="button">导出excel</button>
				<button id="outputTmpBtn" type="button">下载模板</button>
			</form>
			<table id="dataTable" class="dataTable" style="table-layout: fixed;">
				<thead>
					<tr>
						<th>标题1</th>
						<th>标题2</th>
						<th>标题3</th>
						<th>标题4</th>
						<th>标题5</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</section>

<!-- 新增modal start -->
<div id="configModal" class="modal fade hide objCateConfig-modal" data-backdrop="false" aria-hidden="true">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="modalTile" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">新增</h3>
	</div>
	<div class="modal-body">
		<form class="form-min form-horizontal" style="margin-left: 18px;">
			<!-- <div class="control-group">
				<label for="username" class="control-label">用户名</label>
				<div class="controls data-required">
					<input class="span9" type="text" id="username" name="username" placeholder=""> <span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="version" class="control-label">版本</label>
				<div class="controls">
					<select id="version" name="version" style="width: 204px;">
						<option value="v2">v2</option>
						<option value="v3">v3</option>
					</select> <span class="help-inline hide"></span>
				</div>
			</div> -->
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" class="cancelBtn"  data-dismiss="modal">取消</button>
		<button type="button" class="confirmBtn">保存</button>
	</div>
</div>
<!-- 新增modal end -->

<!-- 关联modal start -->
<div id="relativeModal" class="modal fade hide objCateConfig-relativeModal" data-backdrop="false" aria-hidden="true">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">关联信息</h3>
	</div>
	<div class="modal-body">
		<div style="width: 370px; float: left;">
			<p>源对象</p>
			<table id="objTable" class="dataTable">
				<thead>
					<tr>
						<th>对象ID</th>
						<th>对象名称</th>
					</tr>
				</thead>
			</table>
		</div>
		<div style="margin-left: 400px; position: relative;">
			<div style="width: 220px; float: left;">
				<p>已选关联对象</p>
				<div style="border: 1px solid #ddd; border-radius: 4px;">
					<input id="relativeSearch" placeholder="搜索" type="text" style="margin: 5px; width: calc(100% - 10px)"/>
					<ul id="relativeCtn" class="objCateConfig-relative-ctn">
						
					</ul>
				</div>
			</div>
			
			<div style="position: absolute; font-size: 30px; top: 140px; left: 270px; color: #aaa;">--&gt;</div>
			<div style="position: absolute; font-size: 30px; top: 200px; left: 270px; color: #aaa;">&lt;--</div>
			
			<div style="margin-left: 360px;">
				<p>待选关联对象</p>
				<div style="border: 1px solid #ddd; border-radius: 4px;">
					<input id="unrelativeSearch" placeholder="搜索" type="text" style="margin: 5px; width: calc(100% - 10px)"/>
					<ul id="unrelativeCtn" class="objCateConfig-relative-ctn">
						
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="cancelBtn"  data-dismiss="modal">取消</button>
		<button type="button" class="confirmBtn" data-dismiss="modal">保存</button>
	</div>
</div>
<!-- 关联modal end -->
