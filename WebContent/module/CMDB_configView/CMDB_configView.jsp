<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
/* 在模块的页面中，通过style标签定义样式，应该在所起的class命名中加上模块前缀 */
body.body-autoHeight.full.aside-left-out .appConfiger-layout {
	height: calc(100vh - 162px);
}
.appConfiger-layout {
    display: flex;
    height: calc(100vh - 80px);
    background: #f1f0f5;
    transition: all 0.3s;
}
.appConfiger-layout>div {
	background: #FFF;
}
.appConfiger-tree {
	width: 200px;
	flex: none;
}
.appConfiger-configer {
    flex: auto;
    margin: 10px;
    overflow: hidden;
    height: calc(100% - 20px);
}
.no-paddingLR {
	padding: 20px 0 !important;
}
.cmdb-configview .ztree li a {
    white-space: nowrap;
    text-overflow: ellipsis;
}
.cmdb-configview #page_content>div {
	height: 100%;
	padding: 0!important;
}
.cmdb-configview #page_content>div>div {
	height: 100%;
}
.cmdb-configview #treeCate>li {
	width: 50%;
	text-align: center;
}
.cmdb-configview .ztree-wrap {
	padding: 0!important;
}
.ztree li span.button.addNewSoft_ico_docu {
	background: url(img/button/add-black.png) center center no-repeat;
}
</style>

<section class="panel cmdb-configview">
	<div class="content" style="padding: 0;">
		<div class="appConfiger-layout">
			<div class="appConfiger-tree">
				<div style="height: 100%;">
					<ul class="nav nav-tabs nav-underLine" style="cursor: n-resize;" id="treeCate">
						<li class="active tree-cate" ><a href="#tabsCateTree" data-toggle="tab">按分类</a></li>
						<li class="tree-app"><a href="#tabsAppTree" data-toggle="tab">按应用</a></li>
					</ul>
					<div class="tab-content" style="height: calc(100% - 40px);">
						<div id="tabsCateTree" class="tab-pane active ztree-wrap">
							<ul class="ztree ztree-cate" id="cate_tree"></ul>
						</div>
						<div id="tabsAppTree" class="tab-pane ztree-wrap">
							<ul class="ztree ztree-app" id="app_tree"></ul>
						</div>
					</div>
				</div>
			</div>
			<div class="appConfiger-configer">
				<div class="" style="height: 100%;">
					<ul class="nav nav-tabs nav-public" id="rightTab_ul">
						<li class="active app-overview"><a href="#rightTabs1" data-toggle="tab">应用配置</a></li>
						<li class="obj-list"><a href="#rightTabs2" data-toggle="tab">对象列表</a></li>
						<li class="relation"><a href="#rightTabs3" data-toggle="tab">关系拓扑</a></li>
						
					</ul>
					<div class="tab-content" id="page_content" style="height: calc(100% - 40px);overflow: hidden;">
						<div id="rightTabs1" class="tab-pane no-paddingLR  active"></div>
						<div id="rightTabs2" class="tab-pane no-paddingLR"></div>
						<div id="rightTabs3" class="tab-pane no-paddingLR"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

