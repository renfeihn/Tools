<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.windowsDetails-eventcount #unclwindowsDetailsedCount,
	.windowsDetails-eventcount #yujing, .windowsDetails-eventcount #gaojing
	{
	cursor: pointer;
}

.windowsDetails-layout {
	display: flex;
}

.windowsDetails-layout .dataTable {
	table-layout: fixed;
}

.windowsDetails-layout+.windowsDetails-layout {
	margin-top: 20px;
}
/*基本信息*/
.windowsDetails-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.windowsDetails-queue>span:nth-child(1):before {
	content: 'windows';
	height: 30px;
}

.windowsDetails-queue>span:nth-child(1) {
	width: 100%;
	color: #2B2933;
	height: 140px;
	line-height: 120px;
	margin-bottom: 10px;
	padding-left: 134px;
	font-size: 20px;
	font-weight: bolder;
	background: #F1F0F5 url(img/baseMonitor/windows.png) no-repeat 20px
		center;
}

.windowsDetails-queue>span:nth-child(2) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.windowsDetails-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.windowsDetails-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
	width:80px;
}

.windowsDetails-queue>span>span:nth-child(1):before {
	content: "节点IP地址 :";
}

.windowsDetails-queue>span>span:nth-child(2):before {
	content: "节点主机名称 :";
}

/*事件*/
.windowsDetails-event {
	float: right;
	width: 180px;
	height: 220px;
}

.windowsDetails-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.windowsDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.windowsDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.windowsDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.windowsDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.windowsDetails-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.windowsDetails-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.windowsDetails-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.windowsDetails-event>span>span {
	flex: auto;
	position: relative;
}

.windowsDetails-event>span+span {
	margin-top: 10px;
}

.windowsDetails-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.windowsDetails-event>span {
	display: flex;
	border-radius: 2px;
	background-color: #f1f0f5;
	text-align: center;
	height: 64px;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	font-weight: normal;
	flex-direction: column;
}

.windowsDetails-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px;
}

.windowsDetails-cpusyl {
	margin: 0 10px 10px 0;
}

.windowsDetails-cpusyl:BEFORE {
	content: 'CPU使用率';
}

.windowsDetails-cpusyl:after, .windowsDetails-ncsyl:after,
	.windowsDetails-cpsyl:after {
	content: '%';
}

.windowsDetails-ncsyl {
	margin: 0 0 10px 0;
}

.windowsDetails-ncsyl:BEFORE {
	content: '内存使用率';
}

.windowsDetails-cpsyl {
	margin-right: 10px;
}

.windowsDetails-cpsyl:BEFORE {
	content: '磁盘使用率';
}

.windowsDetails-wlzyl:BEFORE {
	content: '网络流量(kbps)';
}

.windowsDetails-jkdgl>span {
	font-size: 26px;
	padding-top: 22px;
	width: calc(50% - 5px);
	height: 105px;
	box-sizing: border-box;
	float: left;
	background: #f1f0f5;
	border-radius: 2px;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.windowsDetails-jkdgl>span:BEFORE {
	font-size: 12px;
	display: block;
	color: #6D6D6D;
	margin-bottom: 15px;
}

.windowsDetails-jkdgl:AFTER {
	content: '';
	display: block;
	clear: both;
}

.windowsDetails-system:BEFORE, .windowsDetails-user:BEFORE,
	.windowsDetails-waiting:BEFORE, .windowsDetails-diskIO:BEFORE,
	.windowsDetails-diskIn:BEFORE, .windowsDetails-diskOut:BEFORE,
	.windowsDetails-wjxtsyl:BEFORE, .windowsDetails-inodesyl:BEFORE,
	.windowsDetails-mountzt:BEFORE {
	display: block;
}

.windowsDetails-system:AFTER, .windowsDetails-user:AFTER,
	.windowsDetails-waiting:AFTER, .windowsDetails-diskIO:AFTER,
	.windowsDetails-jkdgl>span:AFTER, .windowsDetails-wjxtsyl:AFTER,
	.windowsDetails-inodesyl:AFTER {
	/*content:'%';*/
	
}

.windowsDetails-diskIn:AFTER, .windowsDetails-diskOut:AFTER,
	.windowsDetails-netIn:AFTER, .windowsDetails-netOut:AFTER {
	/*content:'kbps/s';*/
	
}

.windowsDetails-system:BEFORE {
	content: 'SYSTEM';
}

.windowsDetails-user:BEFORE {
	content: 'USER';
	color: #5c5a66;
}

.windowsDetails-waiting:BEFORE {
	content: 'WAITING';
	color: #5c5a66;
}

.windowsDetails-diskIO:BEFORE {
	content: '磁盘使用率';
}

.windowsDetails-diskIn:BEFORE {
	content: 'IN';
	color: #5c5a66;
}

.windowsDetails-diskOut:BEFORE {
	content: 'OUT';
	color: #5c5a66;
}

.windowsDetails-wjxtsyl:BEFORE {
	content: '文件系统使用率';
}

.windowsDetails-inodesyl:BEFORE {
	content: 'INODE使用率';
	color: #5c5a66;
}

.windowsDetails-mountzt:BEFORE {
	content: 'MOUNT状态';
	color: #5c5a66;
}

.windowsDetails-system, .windowsDetails-diskIO, .windowsDetails-wjxtsyl
	{
	background: #5b62f9;
	color: #FFF;
	margin-bottom: 10px;
}

.windowsDetails-user, .windowsDetails-diskIn, .windowsDetails-inodesyl {
	background: #f1f0f5;
	margin-bottom: 10px;
}

.windowsDetails-waiting, .windowsDetails-diskOut,
	.windowsDetails-mountzt {
	background: #f1f0f5;
}

.windowsDetails-system, .windowsDetails-user, .windowsDetails-waiting,
	.windowsDetails-diskIO, .windowsDetails-diskIn, .windowsDetails-diskOut,
	.windowsDetails-wjxtsyl, .windowsDetails-inodesyl,
	.windowsDetails-mountzt {
	float: right;
	width: 100%;
	height: 68px;
	border-radius: 2px;
	text-align: center;
	padding: 14px 0;
	box-sizing: border-box;
}

table.windowsDetails-mem-zhanbi {
	table-layout: fixed;
	width: 100%;
}

table.windowsDetails-mem-zhanbi tr>td:nth-child(1) {
	background: #5b62f9;
}

table.windowsDetails-mem-zhanbi tr>td:nth-child(2) {
	background: #90b7ff;
}

table.windowsDetails-mem-zhanbi tr>td:nth-child(3) {
	background: #0ea7f8;
}

table.windowsDetails-mem-zhanbi tr>td:nth-child(4) {
	background: #7ad2ff;
}

table.windowsDetails-mem-zhanbi tr>td:AFTER {
	/*content:'GB';*/
	
}

table.windowsDetails-mem-zhanbi tr>td {
	height: 32px;
	vertical-align: middle;
	text-align: center;
	color: #FFF;
}

.windowsDetails-mem-zhanbi-desc>span:nth-child(1):BEFORE {
	background: #5b62f9;
}

.windowsDetails-mem-zhanbi-desc>span:nth-child(2):BEFORE {
	background: #90b7ff;
}

.windowsDetails-mem-zhanbi-desc>span:nth-child(3):BEFORE {
	background: #0ea7f8;
}

.windowsDetails-mem-zhanbi-desc>span:nth-child(4):BEFORE {
	background: #7ad2ff;
}

.windowsDetails-mem-zhanbi-desc>span:BEFORE {
	content: '';
	display: inline-block;
	width: 12px;
	height: 12px;
	margin-right: 6px;
}

.windowsDetails-mem-zhanbi-desc {
	display: flex;
	width: 100%;
	height: 30px;
	justify-content: space-between;
	align-items: center;
}

.windowsDetails-netIn {
	color: #FFF;
	background: #5b62f9;
	margin-bottom: 10px;
}

.windowsDetails-netOut {
	background: #f1f0f5;
}

.windowsDetails-zombieProgress:BEFORE {
	content: '僵尸进程数';
}

.windowsDetails-zombieProgress {
	margin-right: 20px;
}

.windowsDetails-totalProgress:BEFORE {
	content: '总进程数';
}

.windowsDetails-totalProgress:BEFORE, .windowsDetails-zombieProgress:BEFORE
	{
	color: #999;
	margin-right: 0.5em;
}

#windowsDetailsBaseInfo {
	height: 218px;
	overflow-y: scroll;
	display: flex;
	flex-wrap: wrap;
}

#windowsDetailsBaseInfo p {
	width: 50%;
	line-height: 34px;
}

@media ( max-width :1919px) {
	#windowsDetailsBaseInfo p {
		width: 100%;
	}
	#windowsDetailsBaseInfo p span {
		border: 0;
		border-right: 1px solid #E0DFE6;
	}
	#windowsDetailsBaseInfo p {
		border-top: 0;
		border-left: 1px solid #E0DFE6;
	}
	#windowsDetailsBaseInfo p:nth-child(1) {
		border-top: 1px solid #E0DFE6;
	}
}

#windowsDetailsBaseInfo p span:first-child {
	width: 40%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	/* text-align: right; */
	padding-left: 30px;
}

#windowsDetailsBaseInfo p span:last-child {
	width: 60%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.windowsDetails-netIn, .windowsDetails-netOut {
	display: block;
	width: 102px;
	height: 100px;
	border-radius: 4px;
	background: #5B62F9;
	text-align: center;
	color: #fff;
	box-sizing: border-box;
	padding-top: 30px;
}

.windowsDetails-netIn:before, .windowsDetails-netOut:before {
	display: block;
	text-align: center;
	color: #fff;
}

.windowsDetails-netOut {
	margin-top: 10px;
	background: #F1F0F5;
	color: #5c5a66;
}

.windowsDetails-netIn:before {
	content: 'IN';
}

.windowsDetails-netOut:before {
	content: 'OUT';
	color: #5c5a66;
}

.more-info {
	color: #5c5a66;
}

.more-info:LINK {
	color: #5c5a66;
}

.more-info:VISITED {
	color: #5c5a66;
}

.more-info:HOVER {
	color: #5b62f9;
}

.more-info:ACTIVE {
	color: #5b62f9;
}

.more-info-content {
	font-size: 12px;
	width: 240px;
	height: 30px;
	line-height: 30px;
	display: flex;
	border-bottom: 1px solid #EBEBED;
}

.more-info-content:last-child {
	border: none;
}

.more-info-content>span {
	width: 50%;
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>

<div class="windowsDetails-layout">
	<section class="panel" style="flex: none;width:284px;">
		<p class="title">windows基本信息<a id="moreInfo" href="javascript:void(0);" class="pull-right more-info" >更多详情</a></p>
		<div class="content windowsDetails-queue">
			<span id="version">-</span>
			<span><span id="ip">-</span><span id="port">-</span></span>
		</div>
	</section>
	<section class="panel" style="flex: none;width: 390px;margin-left: 20px;">
		<p class="title">监控点概览</p>
		<div class="content windowsDetails-jkdgl">
			<span id="cpu" class="windowsDetails-cpusyl">-</span>
			<span id="nc" class="windowsDetails-ncsyl">-</span>
			<span id="disk" class="windowsDetails-cpsyl">-</span>
			<span id="net" class="windowsDetails-wlzyl">-</span>
		</div>
	</section>
	<section class="panel" style="flex: auto;margin-left: 20px;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="windowsDetails-event">
				<span id="undealingCount">-</span>
				<span>
					<span id="warningCount">-</span>
					<span id="alarmCount">-</span>
				</span>
				<span id="todayEvent">-</span>
			</div>
			<div id="eEvent" style="margin-right: 200px;height: 220px;"></div>
		</div>
	</section>
</div>
<div class="windowsDetails-layout">
	<section class="panel" style="flex: auto;width: 50%;">
		<p class="title">CPU使用率</p>
		<div class="content" style="display: flex;">
			<div id="cpuEchart" style="height: 224px;width: calc(100% - 122px)"></div>
			<div style="width: 102px;margin-left: 20px;flex: none">
				<span id="system" class="windowsDetails-system">-%</span>
				<span id="user" class="windowsDetails-user">-%</span>
				<span id="waiting" class="windowsDetails-waiting">-%</span>
			</div>
		</div>
	</section>
	<section class="panel"  style="flex: auto;margin-left: 20px;width: 50%;">
		<ul class="nav nav-tabs nav-public">
			<li class="active"><a href="#tabs1" data-toggle="tab">内存使用率</a></li>
			<li><a href="#tabs2" data-toggle="tab">交换区</a></li>
		</ul>
		<div class="tab-content">
			<div id="tabs1" class="tab-pane active">
				<div id="neicunEchart" style="width: 100%;height: 160px;"></div>
				<table class="windowsDetails-mem-zhanbi">
					<tbody>
						<tr>
							<td id="memUsed" style="width: 0%">-</td>
							<td id="memFree" style="width: 0%">-</td>
							<td id="xnmemUsed" style="width: 0%">-</td>
							<td id="xnmemFree" style="width: 0%">-</td>
						</tr>
					</tbody>
				</table>
				<div class="windowsDetails-mem-zhanbi-desc">
					<span>已使用物理内存(GB)</span>
					<span>未使用物理内存(GB)</span>
					<span>已使用虚拟内存(GB)</span>
					<span>未使用虚拟内存(GB)</span>
				</div>
			</div>
			<div id="tabs2" class="tab-pane" >
				<div id="pagingEchart" style="width: 100%; height: 224px;"></div>
			</div>
		</div>
	</section>
</div>
<div class="windowsDetails-layout">
	<section class="panel" style="flex: auto;width: 50%; overflow: visible">
		<!-- <p class="title">磁盘IO</p>
		<div class="content" style="display: flex;">
			<div id="diskEchart" style="height: 224px;width: calc(100% - 122px)"></div>
			<div style="width: 102px;margin-left: 20px;flex: none">
				<span class="windowsDetails-diskIO">-</span>
				<span class="windowsDetails-diskIn">-</span>
				<span class="windowsDetails-diskOut">-</span>
			</div>
		</div> -->
		<ul id="diskTab" class="nav nav-tabs nav-public">

		</ul>
		<div id="diskContainer" class="tab-content">
			
		</div>
	</section>
	<section class="panel"  style="flex: auto;margin-left: 20px;width: 50%;">
		<ul id="tab" class="nav nav-tabs nav-public">
			<!-- <li class="active"><a href="#tabs1" data-toggle="tab">网卡一</a></li>
			<li><a href="#tabs2" data-toggle="tab">网卡二</a></li>
			<li><a href="#tabs3" data-toggle="tab">网卡三</a></li> -->
		</ul>
		<div id="container" class="tab-content" style="height: 260px;">
			<!-- <div id="tabs1" class="tab-pane active">
				<div class="windowsDetails-layout">
					<div style="width: calc(100% - 122px);height: 224px;"></div>
					<div style="width: 102px;margin-left: 20px;flex: none">
						<span class="windowsDetails-netIn">1993</span>
						<span class="windowsDetails-netOut">1993</span>
					</div>
				</div>
			</div>
			<div id="tabs2" class="tab-pane">
				<div class="windowsDetails-layout">
					<div style="width: calc(100% - 122px);height: 224px;"></div>
					<div style="width: 102px;margin-left: 20px;flex: none">
						<span class="windowsDetails-netIn">2016</span>
						<span class="windowsDetails-netOut">2016</span>
					</div>
				</div>
			</div>
			<div id="tabs3" class="tab-pane">
				<div class="windowsDetails-layout">
					<div style="width: calc(100% - 122px);height: 224px;"></div>
					<div style="width: 102px;margin-left: 20px;flex: none">
						<span class="windowsDetails-netIn">2020</span>
						<span class="windowsDetails-netOut">2020</span>
					</div>
				</div>
			</div> -->
		</div>
	</section>
</div>
<div class="windowsDetails-layout" style="height: 300px;">
	<section class="panel" style="flex: auto;width: 50%;">
		<p class="title">进程TOP5
			<span style="float: right;">
				<span class="windowsDetails-zombieProgress">-</span>
				<span class="windowsDetails-totalProgress">-</span>
			</span>
		</p>
		<div class="content">
			<table id="progressTable" class="display dataTable table">
				<thead>
					<tr>
						<th>序号</th>
						<th>进程ID</th>
						<th>用户</th>
						<th>进程状态</th>
						<th>占用CPU</th>
						<th>占用内存</th>
						<th>命令行</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</section>
	<section class="panel"  style="flex: auto;margin-left: 20px;width: 50%;">
		<p class="title">文件系统列表</p>
		<div class="content" style="display: flex;">
			<div id="fileEchart" style="height: 204px;width: 100%"></div>
			<!-- <div style="width: 106px;margin-left: 20px;flex: none">
				<span class="windowsDetails-wjxtsyl">65.26</span>
				<span class="windowsDetails-inodesyl">16.98</span>
				<span class="windowsDetails-mountzt">活动</span>
			</div> -->
		</div>
	</section>
</div>
<div class="windowsDetails-layout hide">
	<section class="panel" style="height: 306px;margin-right: 20px;width: 50%;">
		<p class="title">服务信息</p>
		<div class="content">
			<table id="serviceTable" class="display dataTable table">
				<thead>
					<tr>
						<th>序号</th>
						<th>服务名称</th>
						<th>运行状态</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</section>
	<section class="panel" style="height: 306px;width: 50%;">
		<p class="title">补丁信息</p>
		<div class="content">
			<table id="patchTable" class="display dataTable table">
				<thead>
					<tr>
						<th>序号</th>
						<th>已安装的补丁</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</section>
</div>
