<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.app-detail {
	padding: 20px;
}
.app-detail .layout {
	display: flex;
}
.app-detail .layout>section {
	flex: auto;
	height: 310px;
}
.app-detail .layout .content {
	height: calc(100% - 80px);
}
.app-detail .layout .content>div {
	height: 100%;
}
.app-detail .layout>section.baseinfo {
	flex: none;
	width: 310px;	
	margin-right: 20px;
}
.app-detail .app-name-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px;
    margin: 0 0 10px 0;
    padding: 0px 6px 0 0;
    border-radius: 2px;
    background: var(--color-gray);
    font-weight: 600;
    font-size: 24px;
    color: #5d627d;
    line-height: 28px;
}
.app-detail .app-name-wrap>.app-name {
	min-width: 100px;
}
.page-type {
    display: flex;
    justify-content: space-around;
    line-height: 60px;
    background: var(--color-theme);
    color: #fff;
    border-radius: 3px;
    font-size: 16px;
}
.page-type:before {
	content: attr(data-role);
	display: inline-block;
}

.app-detail .slide-modal {
    position: fixed;
    top: 40px;
    right: 0;
    bottom: 0;
    width: 50vw;
    background: #f2f3f5;
    border-left: solid 1px #eee;
    box-shadow: 0 0 10px 5px #cbccd6;
    z-index: 10;
    transform: translateX(100%);
    transition: all .2s linear;
}
.app-detail .slide-modal.show {
	transform: translateX(0);
}
.app-detail .slide-content {
	padding: 20px;
}
.app-detail table tr>th:nth-child(n+4),
.app-detail table tr>td:nth-child(n+4) {
	text-align: right;
}
.app-detail table tr>th:last-child,
.app-detail table tr>td:last-child {
	text-align: center;
}
.app-detail table tr.active {
	background: #f0f0f5!important;
}
.app-detail .check-item {
    font-size: 14px;
}
.app-detail .check-item.fa-check-square {
    color: var(--color-theme);
}
.app-detail .check-trade {
    color: var(--color-theme);
    cursor: pointer;
}
.app-detail .check-trade:hover {
    text-decoration: underline;	
}
.app-detail table i.red {
	font-style: normal;
	color: red;
}
.app-detail .operate-wrap {
    display: flex;
    justify-content: flex-end;	
}
.app-detail .operate-wrap>* {
    display: flex;
    margin-left: 20px;	
}
.app-detail .operate-wrap label {
    margin: 0 10px 0 0;
}
</style>
<div class="app-detail">
	<div class="layout">
		<section class="panel baseinfo">
			<p class="title">应用信息</p>
			<div class="content">
				<div class="baseinfo-wrap">
					<p class="app-name-wrap">
						<img src="img/baseMonitor/application/app.png" alt="app"/>
						<span class="app-name">日志平田</span>
					</p>
					<p class="page-type" data-role="软件程序">2</p>
				</div>
			</div>
		</section>
		<section class="panel">
			<ul class="nav nav-tabs nav-public" id="trade_ul">
				<li class="active"><a href="#tabs1" data-toggle="tab">交易量TOP</a></li>
				<li><a href="#tabs2" data-toggle="tab">耗时TOP</a></li>
			</ul>
			<div class="tab-content" style="height: calc(100% - 39px);">
				<div id="tabs1" class="tab-pane active" style="height: calc(100% - 40px);">
					<div class="echarts-item" id="echarts_trade"  style="height: 100%;"></div>
				</div>
			</div>
		</section>
	</div>
	<div class="layout">
		<section class="panel" style="height: auto;">
			<p class="title">列表信息</p>
			<div class="content">
				<div>
					<div class="operate-wrap">
						<span>
							<label for="">IP</label><select name="" id="ip_selector"></select>
						</span>
						<span>
							<label for="">软件</label><select name="" id="soft_selector"></select>
						</span>
						<button class="btn-compare disabled hide" type="button">对比</button>
					</div>
					<div class="table-wrap">
						<table class="display dataTable table" id="list_table"></table>
					</div>
				</div>
			</div>
		</section>
	</div>
	
	<div class="slide-modal">
		<div class="slide-container">
			<div class="slide-title"></div>
			<div class="slide-content"></div>
		</div>
	</div>
</div>