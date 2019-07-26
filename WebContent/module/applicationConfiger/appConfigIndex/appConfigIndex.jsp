<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.appConfigIndex-main-content {
	padding: 20px;
}

#appConfigIndex_layout {
	display: flex;
	padding: 0;
}

.appConfigIndex-left {
	width: 240px;
	flex: none;
	border-right: 1px solid #f1f0f5;
	min-height: calc(100vh - 192px);
}

.appConfigIndex-right {
	flex: auto;
	padding: 20px;
}

.appConfigIndex-ztree {
	flex: none;
}

.appConfigIndex-ztree>li {
	background-color: #fff;
}

.allApp {
	display: inline-block;
	width: 100%;
	height: 50px;
}

span.allApp {
	padding-left: 10px;
	display: inline-block;
	width: 100%;
	border-bottom: 1px solid #e3e3e8;
	height: 30px;
}

.spanTuBiao {
	background-image: url(img/zTreeStandard.png);
	background-position: -109px 2px;
	display: inline-block;
	width: 19px;
	height: 19px;
	cursor: pointer;
	margin-right: 2px;
	margin-top: 6px;
}

.allApp input {
	width: 100%;
	height: 30px;
	padding-left: 25px;
}

.allApp i {
	position: absolute;
	margin-top: 9px;
	margin-left: 10px;
}

.allApp1 {
	padding-left: 0px !important;
}

.appConfigIndex-search>input:FOCUS {
	width: 200px;
}

.appConfigIndex-search>input.long {
	width: 200px;
	border-color: #5b62f9;
}

.appConfigIndex-search>input {
	border-color: transparent;
	width: 50px;
	height: 24px;
	margin: 0;
	transition: all 0.5s;
	position: absolute;
	right: 20px;
	top: 3px;
	z-index: 2;
	background: #fff url("img/ncPoc/search-icon.png") no-repeat right center;
	cursor: pointer;
}

.appConfigIndex-search {
	height: 30px;
	line-height: 30px;
	position: relative;
	padding-left: 20px;
	border-bottom: 1px solid #f1f0f5;
	font-size: 12px;
}

.appConfigIndex-control {
	height: 24px;
	margin-bottom: 20px;
}

.appConfigIndex-control button {
	width: 56px;
}

.appConfigIndex-control button.choosed {
	background-color: #f2f3ff;
	border-color: #8489fb;
	color: #5b62f9;
}

.appConfigIndex-control #btnToList {
	margin-right: -1px;
	border-right-color: #8489fb;
	border-radius: 2px 0 0 2px;
}

.appConfigIndex-control #btnToList+button {
	border-left-color: #8489fb;
	border-radius: 0 2px 2px 0;
}

#currentObject:BEFORE {
	content: attr(data-title);
	color: #666;
}

.appConfigIndex-shape {
	height: calc(100% - 24px);
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
	margin: -10px -10px 0 -10px;
}

.appConfigIndex-shape>div:BEFORE {
	content: '';
	position: absolute;
	right: 0;
	top: 0;
	border: 10px solid #aeadb3;
	border-left-color: transparent;
	border-bottom-color: transparent;
	border-radius: 0 4px 0 0;
}

.appConfigIndex-shape>div.monitor:BEFORE {
	border: 10px solid #5b62f9;
	border-left-color: transparent;
	border-bottom-color: transparent;
}

.appConfigIndex-shape>div:HOVER {
	box-shadow: 0 0 4px rgba(0, 0, 0, .3);
}

.appConfigIndex-shape>div {
	width: 114px;
	height: 114px;
	box-sizing: border-box;
	border-radius: 4px;
	background-color: #fafafc;
	background-position: center 16px;
	background-repeat: no-repeat;
	position: relative;
	overflow: hidden;
	cursor: pointer;
	margin: 10px 0 0 10px;
}

.appConfigIndex-shape>div>span {
	display: block;
	text-align: center;
	position: relative;
	top: 68px;
}

.appConfigIndex-shape>div>span+span {
	font-size: 12px;
	color: #5c5a66;
}

.appConfigIndex-control>span {
	line-height: 24px;
	display: inline-flex;
}

.appConfigIndex-control>span+span {
	margin-left: 30px;
}

.appConfigIndex-control>span:nth-child(1):BEFORE, .appConfigIndex-control>span:nth-child(2):BEFORE,
	.appConfigIndex-control>span:nth-child(3):BEFORE {
	content: attr(data-title);
	color: #5c5a66;
	padding: 0 .5em 0 30px;
	background-repeat: no-repeat;
}

.appConfigIndex-control>span:nth-child(1):BEFORE {
	background-image: url(img/app2Repository/icon-totalMonitor.png);
}

.appConfigIndex-control>span:nth-child(2):BEFORE {
	background-image: url(img/app2Repository/icon-monitor.png);
}

.appConfigIndex-control>span:nth-child(3):BEFORE {
	background-image: url(img/app2Repository/icon-noMonitor.png);
}

.appConfigIndex-os.monitor {
	background-image: url(img/cmdb_icon/server/server-physics-checked.png);
}

.appConfigIndex-os {
	background-image: url(img/cmdb_icon/server/server-physics.png);
}

.appConfigIndex-app.monitor {
	background-image: url(img/cmdb_icon/software/software-app-checked.png);
}

.appConfigIndex-app {
	background-image: url(img/cmdb_icon/software/software-app.png);
}

.appConfigIndex-db.monitor {
	background-image: url(img/cmdb_icon/software/software-db-checked.png);
}

.appConfigIndex-db {
	background-image: url(img/cmdb_icon/software/software-db.png);
}

.appConfigIndex-middleware.monitor {
	background-image:
		url(img/app2Repository/objectList/icon-middleWare-blue.png);
}

.appConfigIndex-middleware {
	background-image: url(img/app2Repository/objectList/icon-middleWare.png);
}

.appConfigIndex-shape>div:HOVER button {
	background-color: #5b62f9;
	color: #FFF;
}

.appConfigIndex-shape>div button {
    position: absolute;
    top: 20px;
    left: 50%;
    margin-left: -20px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-position: center;
    background-repeat: no-repeat;
    transition: all .3s;
    width: 40px;
}

@media screen and (max-width: 1599px) {
    .appConfigIndex-shape>div:nth-child(8n+1) {
        margin-top: 10px;
        margin-right: 0;
        margin-bottom: 0;
        margin-left: 10px !important;
    }
    .appConfigIndex-shape>div {
        margin-left: calc(12.5% - 114px);
    }
}
@media screen and (min-width: 1600px) {
    .appConfigIndex-shape>div:nth-child(10n+1) {
        margin-top: 10px;
        margin-right: 0;
        margin-bottom: 0;
        margin-left: 10px !important;
    }
    .appConfigIndex-shape>div {
        margin-left: calc(10% - 115px);
    }
}
.appConfigIndex-path {
    font-size: 12px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    margin: -20px -20px 20px -20px;
    padding-left: 40px;
    color: #666;
}
</style>

<section class="panel appConfigIndex-noMargin" style="margin: -20px -20px 0;">
	<p class="title">应用配置管理</p>
	<div id="appConfigIndex_layout" class="content">
		<div class="appConfigIndex-left">
			<div class="appConfigIndex-search">
				全部应用(
				<span id="treeAllNum"></span>
				) <input id="serch" type="text" placeholder="搜索" />
			</div>
			<ul id="ztreeDemo" class="ztree appConfigIndex-ztree"></ul>
		</div>
		<div class="appConfigIndex-right">
			<p class="appConfigIndex-path"></p>
			<div class="appConfigIndex-control">
				<span data-title="对象总数">0</span>
				<span data-title="已监控">0</span>
				<span data-title="未监控">0</span>
				<span class="pull-right">
					<button id="btnToList" type="button">列表</button>
					<button id="btnToShape" type="button" class="choosed">图形</button>
				</span>
			</div>
			<!-- 列表形式 start -->
			<div class="appConfigIndex-table hide"></div>
			<!-- 列表形式 end -->
			<!-- 图形形式 start -->
			<div class="appConfigIndex-shape"></div>
			<!-- 图形形式 end -->
		</div>
	</div>
</section>
