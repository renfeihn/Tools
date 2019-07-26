<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.aixDetails-layout {
	display: flex;
}
.aixDetails-layout .dataTable{
	table-layout: fixed;
}
.aixDetails-health {
	width: 240px;
	height: 230px;
	position: relative;
}
.aixDetails-cpusyl {
	margin: 0 10px 10px 0;
}
.aixDetails-cpusyl:BEFORE {
	content:'CPU使用率';
}
.aixDetails-cpusyl:after,.aixDetails-ncsyl:after,.aixDetails-cpsyl:after{
	content:'%';
} 
.aixDetails-ncsyl {
	margin: 0 0 10px 0;
}
.aixDetails-ncsyl:BEFORE {
	content:'内存使用率';
}
.aixDetails-cpsyl {
	margin-right: 10px;
}
.aixDetails-cpsyl:BEFORE {
	content:'磁盘使用率';
}
.aixDetails-wlzyl:BEFORE {
	content:'网络流量(kbps)';
}
.aixDetails-jkdgl>span {
	font-size: 26px;
    padding-top: 22px;
    width: calc(50% - 5px);
    height: 105px;
    box-sizing: border-box;
    float: left;
    background: #f1f0f5;
    border-radius: 2px;
    text-align: center;
}
.aixDetails-jkdgl>span:BEFORE {
	font-size: 12px;
	display: block;
	color: #6D6D6D;
	margin-bottom: 15px;
}

.aixDetails-jkdgl:AFTER {
	content:'';
	display: block;
	clear: both;
}
.aixDetails-event {
	float: right;
	width: 180px;
	height: 220px;
}
.aixDetails-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}
.aixDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
    font-size: 14px;
    color: #666;
}
.aixDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
    font-size: 14px;
    color: #666;
}
.aixDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}
.aixDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}
.aixDetails-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}
.aixDetails-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}
.aixDetails-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
    left: 22px;
    top: 7px;
}
.aixDetails-event>span>span {
	flex: auto;
	position: relative;
}
.aixDetails-event>span+span {
	margin-top: 10px;
}
.aixDetails-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}
.aixDetails-event>span {
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
.aixDetails-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%) no-repeat center center;
	background-size: 1px 50px; 
}
.aixDetails-system:BEFORE,.aixDetails-user:BEFORE,.aixDetails-waiting:BEFORE,
.aixDetails-diskIO:BEFORE,.aixDetails-diskIn:BEFORE,.aixDetails-diskOut:BEFORE,
.aixDetails-wjxtsyl:BEFORE,.aixDetails-inodesyl:BEFORE,.aixDetails-mountzt:BEFORE {
	display: block;
}
.aixDetails-system:AFTER,.aixDetails-user:AFTER,.aixDetails-waiting:AFTER,.aixDetails-diskIO:AFTER,
.aixDetails-jkdgl>span:AFTER,.aixDetails-wjxtsyl:AFTER,.aixDetails-inodesyl:AFTER {
	/*content:'%';*/
}
.aixDetails-diskIn:AFTER,.aixDetails-diskOut:AFTER,.aixDetails-netIn:AFTER,.aixDetails-netOut:AFTER {
	/*content:'kbps/s';*/
}
.aixDetails-system:BEFORE {
	content:'SYSTEM';
}
.aixDetails-user:BEFORE {
	content:'USER';
	color: #5c5a66;
}
.aixDetails-waiting:BEFORE {
	content:'WAITING';
	color: #5c5a66;
}
.aixDetails-diskIO:BEFORE {
	content:'磁盘使用率';
}
.aixDetails-diskIn:BEFORE {
	content:'IN';
	color: #5c5a66;
}
.aixDetails-diskOut:BEFORE {
	content:'OUT';
	color: #5c5a66;
}
.aixDetails-wjxtsyl:BEFORE {
	content:'文件系统使用率';
}
.aixDetails-inodesyl:BEFORE {
	content:'INODE使用率';
	color: #5c5a66;
}
.aixDetails-mountzt:BEFORE {
	content:'MOUNT状态';
	color: #5c5a66;
}

.aixDetails-system,.aixDetails-diskIO,.aixDetails-wjxtsyl {
	background: #5b62f9;
	color: #FFF;
	margin-bottom: 10px;
}
.aixDetails-user,.aixDetails-diskIn,.aixDetails-inodesyl {
	background: #f1f0f5;
	margin-bottom: 10px;
}
.aixDetails-waiting,.aixDetails-diskOut,.aixDetails-mountzt {
	background: #f1f0f5;
}
.aixDetails-system,.aixDetails-user,.aixDetails-waiting,
.aixDetails-diskIO,.aixDetails-diskIn,.aixDetails-diskOut,
.aixDetails-wjxtsyl,.aixDetails-inodesyl,.aixDetails-mountzt {
	float: right;
	width: 100%;
	height: 68px;
	border-radius: 2px;
	text-align: center;
	padding: 14px 0;
	box-sizing: border-box;
}
table.aixDetails-mem-zhanbi {
	table-layout: fixed;
	width: 100%;
}
table.aixDetails-mem-zhanbi tr>td:nth-child(1) {
	background: #5b62f9;
}
table.aixDetails-mem-zhanbi tr>td:nth-child(2) {
	background: #90b7ff;
}
table.aixDetails-mem-zhanbi tr>td:nth-child(3) {
	background: #0ea7f8;
}
table.aixDetails-mem-zhanbi tr>td:nth-child(4) {
	background: #7ad2ff;
}
table.aixDetails-mem-zhanbi tr>td:AFTER {
	/*content:'GB';*/
}
table.aixDetails-mem-zhanbi tr>td {
	height: 32px;
	vertical-align: middle;
	text-align: center;
	color: #FFF;
}
.aixDetails-mem-zhanbi-desc>span:nth-child(1):BEFORE {
	background: #5b62f9;
}
.aixDetails-mem-zhanbi-desc>span:nth-child(2):BEFORE {
	background: #90b7ff;
}
.aixDetails-mem-zhanbi-desc>span:nth-child(3):BEFORE {
	background: #0ea7f8;
}
.aixDetails-mem-zhanbi-desc>span:nth-child(4):BEFORE {
	background: #7ad2ff;
}
.aixDetails-mem-zhanbi-desc>span:BEFORE {
	content:'';
	display: inline-block;
	width: 12px;
	height: 12px;
	margin-right: 6px;
}
.aixDetails-mem-zhanbi-desc {
	display: flex;
	width: 100%;
	height: 30px;
	justify-content: space-between;
	align-items: center;
}
.aixDetails-netIn:BEFORE {
	content:'IN';
	display: block;
}
.aixDetails-netOut:BEFORE {
	content:'OUT';
	display: block;
}
.aixDetails-netIn {
	color: #FFF;
	background: #5b62f9;
	margin-bottom: 10px;
}
.aixDetails-netOut {
	background: #f1f0f5;
}
.aixDetails-netIn,.aixDetails-netOut {
	width: 100%;
	height: 107px;
	border-radius: 2px;
	text-align: center;
	float: right;
	box-sizing: border-box;
	padding-top: 30px;
}
.aixDetails-zombieProgress:BEFORE {
	content:'僵尸进程数';
}
.aixDetails-zombieProgress {
	margin-right: 20px;
}
.aixDetails-totalProgress:BEFORE {
	content:'总进程数';
}
.aixDetails-totalProgress:BEFORE,.aixDetails-zombieProgress:BEFORE {
	color: #999;
	margin-right: 0.5em;
}
#aixDetailsBaseInfo{
	height: 218px;
	overflow-y: scroll;
	display: flex;
    flex-wrap: wrap;
}
#aixDetailsBaseInfo p{
	width: 50%;
	line-height: 34px;
}
@media (max-width:1919px){
	#aixDetailsBaseInfo p{
		width:100%;
	}
	#aixDetailsBaseInfo p span{
		border:0;
		border-right:1px solid #E0DFE6;
	}
	#aixDetailsBaseInfo p{
		border-top:0;
		border-left:1px solid #E0DFE6;
	}
	#aixDetailsBaseInfo p:nth-child(1){
		border-top:1px solid #E0DFE6;
	}
}
#aixDetailsBaseInfo p span:first-child{
	width: 40%;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    /* text-align: right; */
    padding-left: 30px;
}
#aixDetailsBaseInfo p span:last-child{
	width: 60%;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.aixDetails-queue>span{
	display: flex;
	flex-direction: column;
    box-sizing: border-box;
    border-radius: 3px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.aixDetails-queue>span:nth-child(1):before{
	content: 'aix';
	height: 30px;
}
.aixDetails-queue>span:nth-child(1){
    width: 100%;
    color: #2B2933;
    height: 140px;
    line-height: 120px;
    margin-bottom: 10px;
    padding-left: 144px;
    font-size: 20px;
    font-weight: bolder;
   	background: #F1F0F5 url(img/baseMonitor/aix.png) no-repeat 20px center; 
}
.aixDetails-queue>span:nth-child(2){
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding:15px 20px;
  font-weight: normal;
  background: #5B62FB;
}
.aixDetails-queue>span>span{
	white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.aixDetails-queue>span>span:before{
	display: inline-block;
	margin-right: 10px;
}
.aixDetails-queue>span>span:nth-child(1):before{
	content:"节点IP地址 :";
}
.aixDetails-queue>span>span:nth-child(2):before{
	content:"节点主机名称 :";
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

<div class="aixDetails-layout">
	<section class="panel" style="flex: none;width:284px;">
		<p class="title">aix基本信息 <!-- <a id="moreInfo" href="javascript:void(0);" class="pull-right more-info" >更多详情</a> --></p>
		<div class="content aixDetails-queue">
			<span id="version">-</span>
			<span><span id="ip">-</span><span id="port">-</span></span>
		</div>
	</section>
	<section class="panel" style="flex: none;width: 390px;margin-left: 20px;">
		<p class="title">监控点概览</p>
		<div class="content aixDetails-jkdgl">
			<span id="cpu" class="aixDetails-cpusyl">-</span>
			<span id="nc" class="aixDetails-ncsyl">-</span>
			<span id="disk" class="aixDetails-cpsyl">-</span>
			<span id="net" class="aixDetails-wlzyl">-</span>
		</div>
	</section>
	<section class="panel" style="flex: auto;margin-left: 20px;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="aixDetails-event">
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
<div class="aixDetails-layout">
	<section class="panel" style="flex: auto;width: 50%;">
		<p class="title">CPU使用率</p>
		<div class="content" style="display: flex;">
			<div id="cpuEchart" style="height: 224px;width: calc(100% - 122px)"></div>
			<div style="width: 102px;margin-left: 20px;flex: none">
				<span id="system" class="aixDetails-system">-%</span>
				<span id="user" class="aixDetails-user">-%</span>
				<span id="waiting" class="aixDetails-waiting">-%</span>
			</div>
		</div>
	</section>
	<section class="panel"  style="flex: auto;margin-left: 20px;width: 50%;">
		<ul class="nav nav-tabs nav-public">
			<li class="active"><a href="#tabs1" data-toggle="tab">内存使用率</a></li>
			<li><a href="#tabs2" data-toggle="tab">PAGING</a></li>
		</ul>
		<div class="tab-content">
			<div id="tabs1" class="tab-pane active">
				<div id="neicunEchart" style="width: 100%;height: 160px;"></div>
				<table class="aixDetails-mem-zhanbi">
					<tbody>
						<tr>
							<td id="memUsed" style="width: 0%">-</td>
							<td id="memFree" style="width: 0%">-</td>
							<td id="xnmemUsed" style="width: 0%">-</td>
							<td id="xnmemFree" style="width: 0%">-</td>
						</tr>
					</tbody>
				</table>
				<div class="aixDetails-mem-zhanbi-desc">
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
<div class="aixDetails-layout">
	<section class="panel" style="flex: auto;width: 50%; overflow: visible">
		<!-- <p class="title">磁盘IO</p>
		<div class="content" style="display: flex;">
			<div id="diskEchart" style="height: 224px;width: calc(100% - 122px)"></div>
			<div style="width: 102px;margin-left: 20px;flex: none">
				<span class="aixDetails-diskIO">-</span>
				<span class="aixDetails-diskIn">-</span>
				<span class="aixDetails-diskOut">-</span>
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
			<li><a href="#tabs3" data-toggle="tab">网卡三</a></li>  -->
		</ul>
		<div id="container" class="tab-content">
			<!-- <div id="tabs1" class="tab-pane active">
				<div class="aixDetails-layout">
					<div style="width: calc(100% - 122px);height: 224px;"></div>
					<div style="width: 102px;margin-left: 20px;flex: none">
						<span class="aixDetails-netIn">1993</span>
						<span class="aixDetails-netOut">1993</span>
					</div>
				</div>
			</div>
			<div id="tabs2" class="tab-pane">
				<div class="aixDetails-layout">
					<div style="width: calc(100% - 122px);height: 224px;"></div>
					<div style="width: 102px;margin-left: 20px;flex: none">
						<span class="aixDetails-netIn">2016</span>
						<span class="aixDetails-netOut">2016</span>
					</div>
				</div>
			</div>
			<div id="tabs3" class="tab-pane">
				<div class="aixDetails-layout">
					<div style="width: calc(100% - 122px);height: 224px;"></div>
					<div style="width: 102px;margin-left: 20px;flex: none">
						<span class="aixDetails-netIn">2020</span>
						<span class="aixDetails-netOut">2020</span>
					</div>
				</div>
			</div> -->
		</div>
	</section>
</div>
<div class="aixDetails-layout" style="height: 300px;">
	<section class="panel" style="flex: auto;width: 50%;">
		<p class="title">进程TOP5
			<span style="float: right;">
				<span class="aixDetails-zombieProgress">-</span>
				<span class="aixDetails-totalProgress">-</span>
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
			<div id="fileEchart" style="height: 215px;width: 100%"></div>
			<!-- <div style="width: 106px;margin-left: 20px;flex: none">
				<span class="aixDetails-wjxtsyl">65.26</span>
				<span class="aixDetails-inodesyl">16.98</span>
				<span class="aixDetails-mountzt">活动</span>
			</div> -->
		</div>
	</section>
</div>