<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
/* 对象列表 */
.objlist-content {
	height: 100%;
}
.objlist-content ul.appConfiger-appList {
    padding: 10px;
    margin: 0;
    height: 160px;
    overflow: auto;
}
.objlist-content ul.appConfiger-appList:AFTER {
	content:'';
	clear: both;
	display: block;
}
.objlist-content #appConfigInfo>li>img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.objlist-content .appConfiger-configer-top {
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
}
.objlist-content .appConfiger-configer-bottom {
    height: calc(100% - 200px);
    overflow: auto;
}
.objlist-content .appConfigerView-appSearch {
	background: transparent;
    width: 24px;
    height: 24px;
    position: relative;
    right: -160px;
}
.objlist-content #appConfigInfo>li.addone {
    text-align: center;
    line-height: 80px;
}
.objlist-content #appConfigInfo>li.addone>i {
	font-size: 30px;
    color: #617b66;
}
.objlist-content .filter-wrap,.objectList-control {
	margin-left: 50px;
	display: inline-flex;
    align-items: center;
}
@media screen and (max-width: 1366px) {
	.objectList-control {
		margin-left: 5px !important;
	}
	.objectList-control span.tip-span.no-before {
		margin: 0 !important;
		padding: 0px 5px !important;
	}
	.cmdb-configview .data-operates {
		right: 138px !important;
	}
	input.search-query {
		width: 110px !important ;
	}
	.appConfiger-configer-top-p>#appTitle{
		display: inline-block;
	    max-width: 130px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    vertical-align: top;
	}
}
.objlist-content .filter-wrap>span {
	margin: 0 8px;
	cursor: pointer;
	color: #aeb7bb;
	filter: grayscale(0.9);
}
.objlist-content .filter-wrap>span.active {
	color: #454748;
	filter: grayscale(0);
}

.objlist-content .type-filter {
    /* position: absolute;
    right: 200px; */
    margin-left: 20px;
}
.objlist-content .type-filter>span {
	display: inline-block;
    width: 55px;
    height: 24px;
    line-height: 22px;
    text-align: center;
    border: solid 1px #c7c6cc;
    font-size: 12px;
    background: #f9f9fb;
    box-sizing: border-box;
    cursor: pointer;
}
.objlist-content .type-filter>span.active {
    background: #5b62f9;
    border-color: #5b62f9;
    color: #fff;
}
.objlist-content .objectList-control span.tip-span {
	line-height: 24px;
    display: inline-flex;
    cursor: pointer;
    padding: 0px 5px;
}
.objlist-content .objectList-control span.tip-span:BEFORE {
	content: attr(data-title);
    color: #5c5a66;
    padding: 0 .5em 0 30px;
    background-repeat: no-repeat;
}
.objlist-content .objectList-control span.tip-span.no-before:BEFORE {
	content: attr(data-title);
	padding: 0 5px !important;
}
/* .objectList-control>span:nth-child(2) {
	margin: 0 30px;
} */
.objlist-content .objectList-control span.tip-span.all:BEFORE {
    background-image: url(img/app2Repository/icon-totalMonitor.png);
}
.objlist-content .objectList-control span.tip-span.monitor:BEFORE {
    background-image: url(img/app2Repository/icon-monitor.png);
}
.objlist-content .objectList-control span.tip-span.unmonitor:BEFORE {
    background-image: url(img/app2Repository/icon-noMonitor.png);
}
/* .objlist-content .objectList-control span.tip-span:hover {
    box-shadow: 0 0 4px rgba(0, 0, 0, .3) !important;
} */
.objlist-content .objectList-control-selected {
	box-shadow: 0 0 4px rgba(0, 0, 0, .3) !important;	
}
.objlist-content li.offline img {
    filter: grayscale(1);	
}
.objlist-content .monitor {
    background: url(img/menu/icon_normal_jiankongguanli.png) no-repeat;
    background-position: 50%;
}
.objlist-content #appConfigInfo>li {
	float: left;
    width: 240px;
    height: 80px;
    box-sizing: border-box;
    border: 2px solid #fff;
    border-radius: 4px;
    background-color: #fafafc;
    background-position: center 16px;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
    margin: 10px 0 0 10px;
    transition: border-color linear .3s;
    padding: 6px;
    cursor: pointer;
}
.objlist-content #appConfigInfo>li:hover {
	border:1px solid #E1E0E4;
    box-shadow: 0 0 4px rgba(0, 0, 0, .3);
}
.objlist-content #appConfigInfo>li.checked {
    border: 2px solid #5b62f9;
    box-shadow: 1px 2px 20px 1px rgba(0, 0, 0, .3);
}
.objlist-content #appConfigInfo>li .obj-operate-btns {
	display: none;
    position: absolute;
    width: 40px;
    top: 0;
    right: 0;
    text-align: right;
}
.objlist-content #appConfigInfo>li:hover .obj-operate-btns {
	display: block;
}
.objlist-content #appConfigInfo>li .obj-operate-btns>i {
	margin: 0 2px;
}
.objlist-content #appConfigInfo>li .obj-operate-btns>i:hover {
    transform: scale(1.2);
}
.objlist-content .objectList-shape .objectList-image-ctn {
    width: 30%;
    height: 100%;
    background-repeat: no-repeat;
    float: left;
    background-position: center;
    background-color: #EDEDF0;
    border-radius: 2px;
}
.objlist-content .objectList-os>.objectList-image-ctn {
    background-image: url(img/cmdb_icon/server/server-physics.png);
}
.objlist-content .objectList-os>.objectList-image-ctn.green {
    background-image: url(img/cmdb_icon/server/server-physics-checked-new.png);
}
.objlist-content .objectList-info-ctn {
    width: 70%;
    height: 100%;
    float: left;
}
.objlist-content .objectList-info-ctn>#l3_cate_name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-weight: bold;
    padding-left: 10px;
    height: 33%;
}
.objlist-content .objectList-info-ctn>#obj_ip {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 10px;
    font-size: 12px;
    height: 33%;
}
.objlist-content .objectList-info-ctn>.objectList-little {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    padding-left: 5px;
    font-size: 12px;
    height: 34%;
}
.objlist-content .objectList-info-ctn>.objectList-little>span:nth-child(2n+1) {
	display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 12px;
    width: 20px;
    height: 100%;
    float: left;
}
.objlist-content .objectList-info-ctn>.objectList-little>.objectList-shape-monitorShow.open {
    background-image: url(img/cmdb_icon/objectstate/object-online.png);
    background-repeat: no-repeat;
    background-position: center;
}
.objlist-content .objectList-info-ctn>.objectList-little>span:nth-child(2n) {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 12px;
    width: 50px;
    height: 100%;
    float: left;
}
.objlist-content .objectList-info-ctn>.objectList-little>.objectList-shape-agentShow.online {
    background-image: url(img/cmdb_icon/objectstate/agent-online.png);
    background-repeat: no-repeat;
    background-position: center;
}
.objlist-content .objectList-info-ctn>.objectList-little>.objectList-shape-monitorShow.closed {
    background-image: url(img/cmdb_icon/objectstate/object-offline.png);
    background-repeat: no-repeat;
    background-position: center;
}
.objlist-content .objectList-info-ctn>.objectList-little>.objectList-shape-agentShow.offline {
    background-image: url(img/cmdb_icon/objectstate/agent-offline.png);
    background-repeat: no-repeat;
    background-position: center;
}
.objlist-content #objectShapeMonitorBtn {
    position: absolute;
    right: 200px;
}

.objlist-content #objectShapeMonitorBtn button {
	width: 100px;
	color: #353535;
	line-height: 16px;
}
.objlist-content #objectShapeMonitorBtn button[disabled] {
	opacity: .6;
	cursor: not-allowed;
}
.objlist-content .data-operates {
	position: absolute;
	right: 280px;
}
.objlist-content .data-operates>span {
    margin: 0 0 0 10px;
    font-size: 12px;
    cursor: pointer;
    color: #8086FF;
}
.objlist-content .dataManageDetail-content>div {
	height: 100%;
}
/* 对象列表完 */
/* 右侧划窗 */
.objlist-content #addobj {
	position: fixed;
    top: 40px;
    bottom: 0;
    right: -700px;
    width: 700px;
    z-index: 1050;
    background: #fff;
    transition: all .1s linear;
}
.objlist-content #addobj.show-modal {
    right: 0;
}
.objlist-content #addobj>.addobj-mask {
	display: none;
}
.objlist-content #addobj.show-modal>.addobj-mask {
	display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100vw;
    width: 100vw;
    background: rgba(0,0,0,.5);
}
.objlist-content #addobj .modal-footer {
	text-align: center;
}
.objlist-content #addobj .more {
    width: 20%;
    text-align: center;
    margin: 4px auto;
    cursor: pointer;
    color: #2196F3;
}
.objlist-content #addobj .more>i {
    margin-right: 5px;
}
.objlist-content .noshowObj {
	display: none !important;
}
.objlist-content #addobj select,
.objlist-content #addobj input {
    width: 100%!important;
    height: 30px;
}
.objlist-content .add-category, .objlist-content .del-category {
    float: right;
    background: var(--color-theme);
    color: #fff;
    padding: 2px 6px;
    border-radius: 2px;
    font-size: 12px;
    cursor: pointer;	
}
/* 右侧划窗 完*/
</style>
<div class="objlist-content">
	<div class="appConfiger-configer-top">
		<p style="position:relative;padding: 2px 20px;" class="appConfiger-configer-top-p">
			<span id="appTitle">PC服务器</span>
			<span class="type-filter hide">
				<span data-type="dm_dt_status">按状态</span><span data-type="dm_dt_purpose">按用途</span>
			</span>
			<span class="filter-wrap hide">
				<span class="filter-item-complete active" data-role="complete"><span><i class="symbol"></i>完整度 </span><span>-</span></span>
				<span class="filter-item-online active" data-role="online"><span><i class="symbol fa fa-circle"></i>在线 </span><span>-</span></span>
				<span class="filter-item-offline active" data-role="offline"><span><i class="symbol fa fa-times-circle"></i>离线 </span><span>-</span></span>
				<span class="filter-item-selffind active" data-role="selffind"><span><i class="symbol fa fa-info"></i>自发现 </span><span>-</span></span>
				<span class="filter-item-event active" data-role="event"><span><i class="symbol">n</i>事件 </span><span>-</span></span>
				<span class="filter-item-monitor active" data-role="monitor"><span><i class="symbol fa fa-play"></i>监控中 </span><span>-</span></span>
				<span class="filter-item-unmonitor active" data-role="unmonitor"><span><i class="symbol fa fa-pause"></i>未监控 </span><span>-</span></span>
			</span>
			<span class="objectList-control">
				<span data-title="对象总数" class="appCount_ tip-span all" data-role="all">-</span>
				<span class="hide">
					<span class="status-wrap dm_dt_status">
						<span data-title="已投产" class=" tip-span no-before" data-kpi="data-status" data-role="0">-</span>
						<span data-title="已下线" class=" tip-span no-before" data-kpi="data-status" data-role="1">-</span>
						<span data-title="待投产" class=" tip-span no-before" data-kpi="data-status" data-role="2">-</span>
						<span data-title="投产中" class=" tip-span no-before" data-kpi="data-status" data-role="3">-</span>
					</span>
					<span class="purpose-wrap dm_dt_purpose">
						<span data-title="开发" class=" tip-span no-before" data-kpi="data-dmdtpurpose" data-role="开发">-</span>
						<span data-title="测试" class=" tip-span no-before" data-kpi="data-dmdtpurpose" data-role="测试">-</span>
						<span data-title="生产" class=" tip-span no-before" data-kpi="data-dmdtpurpose" data-role="生产">-</span>
					</span>
				</span>
				
				<!-- <span data-title="已监控" class="monitor tip-span">-</span>
				<span data-title="未监控" class="unmonitor tip-span">-</span> -->
			</span>
			<span class="data-operates">
				<span id="tableModelExcelBtn" title="模板导出"><i class="fa fa-upload"></i>模板导出</span>
				<span id="excel2table" title="数据导入"><i class="fa fa-download"></i>数据导入<input type="file" id="file_upload" class="hide"></span>
				<span id="tableDataModelExcelBtn" title="数据导出"><i class="fa fa-upload"></i>数据导出</span>
			</span>
			<!-- <span class="gutter-bottom" id="objectShapeMonitorBtn">
				<button id="objectListStartBtn" type="button" disabled="disabled">
					<i class="fa fa-play"></i>&nbsp;开始监控
				</button>
				<button id="objectListStopBtn" type="button" disabled="disabled">
					<i class="fa fa-stop"></i>&nbsp;停止监控
				</button>
			</span> -->
			
			<!-- <span class="appCount_">-</span> -->
			
			<input id="appSearch" type="text" class="search-query" style="float: right;" /><span class="appConfigerView-appSearch pull-right"></span>
			<span class="add-category">新增分类</span>
			<span class="del-category" style="display: none;">删除分类</span>
		</p>
		<ul id="appConfigInfo" class="appConfiger-appList objectList-shape">
		</ul>
	</div>
	<div class="appConfiger-configer-bottom">
		<ul class="nav nav-tabs nav-underLine" style="cursor: n-resize;" id="resizeHeight">
			<li class="active" skip-add="CMDB_configView#objList#baseInfo"><a href="#tabs1" data-toggle="tab">CI信息</a></li>
			<!-- <li skip-add="CMDB_configView#objList#dataManageDetailProperty"><a href="#tabs1" data-toggle="tab">CI属性</a></li> -->
			<li data-page="relation" skip-add="CMDB_configView#objList#dataManageDetailRelation"><a href="#tabs1" data-toggle="tab">CI关系</a></li>
			<!-- <li skip-add="CMDB_configView#objList#modelVersion"><a href="#tabs1" data-toggle="tab">模型版本</a></li>
			<li skip-add="CMDB_configView#objList#dataVersion"><a href="#tabs1" data-toggle="tab">数据版本</a></li>
			<li skip-add="CMDB_configView#objList#selffind"><a href="#tabs1" data-toggle="tab">自发现</a></li>
			<li skip-add="CMDB_configView#objList#eventList"><a href="#tabs1" data-toggle="tab">对象事件</a></li> -->
		</ul>
		<div class="tab-content" style="height: calc(100% - 40px); padding: 0 20px;">
			<div id="tabs1" class="tab-pane no-paddingLR  active" style="height: calc(100% - 40px);position: relative;">
				<div class="dataManageDetail-content" style="height: 100%;"></div>
			</div>
		</div>
	</div>
	
	<div id="addobj" class="slide-modal" tabindex="-1">
		<div class="addobj-mask"></div>
		<div class="modal-header">
			<button class="close" type="button" data-dismiss="modal">×</button>
			<h3 id="myModalLabel">创建对象</h3>
		</div>
		<div class="modal-body" id="add_form" style="max-height: none;height: calc(100% - 140px);">
			<form class="form-min form-horizontal form-category-select">
				<div class="control-group">
					<label for="input1" class="control-label">一级分类</label>
					<div class="controls">
						<select name="" id="cate1_selector"></select>
					</div>
				</div>
				<div class="control-group">
					<label for="input1" class="control-label">二级分类</label>
					<div class="controls">
						<select name="" id="cate2_selector"></select>
					</div>
				</div>
				<div class="control-group">
					<label for="input1" class="control-label">三级分类</label>
					<div class="controls">
						<select name="" id="cate3_selector"></select>
					</div>
				</div>
			</form>
			<form class="form-min form-horizontal" id="auto_form"></form>
		</div>
		<div class="modal-footer">
			<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
			<button type="button" data-dismiss="modal" class="confirmBtn" id="addObj_confirm">保存</button>
		</div>
	</div>
	<div id="excelInModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 600px;">
		<div class="modal-header">
			<button class="close" type="button" data-dismiss="modal">×</button>
			<h3>导入excel</h3>
		</div>
		<div class="modal-body" id="dataMergeModalBody" style="max-height: 600px;">
			<input type="file" id="excelInput"/>
		</div>
		<div class="modal-footer">
			<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
			<button type="button" class="confirmBtn" id="addExcel">确定</button>
		</div>
	</div>
	<script id="modalExcelContent" type="text/html">
	<table class="display dataTable table modalTable" id="modalExcelContentTable">
		<thead>
			<tr>
				{{each tHeadHTML as valueTitle index}} 
					<th>{{valueTitle}}</th>
				{{/each}}
			</tr>
		</thead>
		<tbody>
			{{each tBodyHTML as value index}} 
			  <tr>
				{{each value as contentValue index}} 
					<td>{{contentValue}}</td>
				{{/each}}
			  </tr>
			{{/each}}
		</tbody>
	</table>
	</script>
	<div class="hide" id="hideTable_excel">
		
	</div>
	<div class="hide" id="hideModel_excel">
		
	</div>
</div>
<div id="addNewModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">新增应用程序</h3>
	</div>
	<div class="modal-body">
		<div class="control-group"  style="display: flex;justify-content: center;">
			<label for="soft_name" class="control-label required" style="margin-right: 10px;">名称</label>
			<div class="controls">
				<input type="text" id="soft_name" />
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="confirmBtn">保存</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
	</div>
</div>

<div id="delNewModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">删除分类</h3>
	</div>
	<div class="modal-body">
		确认删除该分类嘛？
	</div>
	<div class="modal-footer">
		<button type="button" class="confirmBtn">删除</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
	</div>
</div>