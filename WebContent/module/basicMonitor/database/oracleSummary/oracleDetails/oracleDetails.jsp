<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>

.oracleDetails-link, .oracleDetails-linkState{
	display:flex;
	width:100%;
	height:44px;
}
.oracleDetails-link>span {
	position:relative;
	display:block;
	width:calc((100% -20px)/3);
	border-radius:2px;
	font-size:14px;
	line-height:44px;
	padding-left:20%;
}
.oracleDetails-link>span:nth-child(1) {
	background:#5B62F9;
	margin-right:10px;
	color:#fff;
}
.oracleDetails-link>span:nth-child(1):before {
	content:"总数";
	display:inline-block;
	position:absolute;
	left:16%;
	color:#fff;
}
.oracleDetails-link>span:nth-child(2) {
	background:#F1F0F5;
	margin-right:10px;
	color:#000;
}
.oracleDetails-link>span:nth-child(2):before {
	content:"本地";
	display:inline-block;
	position:absolute;
	left:16%;
	color:#333;
	
}
.oracleDetails-link>span:nth-child(3) {
	background:#F1F0F5;
	color:#000;
}
.oracleDetails-link>span:nth-child(3):before {
	content:"远程";
	display:inline-block;
	position:absolute;
	left:16%;
	color:#333;
}

.oracleDetails-linkState>span+span{
	margin-left: 5px;
}
.oracleDetails-linkState>span{
	width: calc((100% - 15px) / 4);
	border-radius:2px;
	font-size:12px;
	line-height:44px;
	background:#F1F0F5;
	color:#000;
	display: flex;
	justify-content: space-between;
	padding: 0 5px;
	overflow: hidden;
}
.oracleDetails-linkState>span:before{
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.oracleDetails-linkState>span:nth-child(n+2):before{
	color: #333;
}
.oracleDetails-linkState>span:nth-child(1){
	background:#5B62F9;
	color:#fff;
}
.oracleDetails-linkState>span:nth-child(1):before{
	content:"ESTABLISHED";
}
.oracleDetails-linkState>span:nth-child(2):before{
	content:"CLOSE_WAIT";
}
.oracleDetails-linkState>span:nth-child(3):before{
	content:"TIME_WAIT";
}
.oracleDetails-linkState>span:nth-child(4):before{
	content:"LISTENING";
}
.oracleDetails-object,.oracleDetails-RAC { 
	display:flex;
	width:100%;
	height:44px;
}
.oracleDetails-object>span,.oracleDetails-RAC>span {
	width:calc((100% -10px)/2);
	border-radius:4px;
	font-size:14px;
	line-height:44px;
	background:#F1F0F5;
	color:#000;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.oracleDetails-object>span:before,.oracleDetails-RAC>span:before {
	color:#63616D;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.oracleDetails-object>span:nth-child(1),.oracleDetails-RAC>span:nth-child(1) {
	background:#5B62F9;
	margin-right: 10px;
	color:#fff;
}
.oracleDetails-object>span:nth-child(1):before {
	content:"总失效对象数";
	color:#fff;
}
.oracleDetails-object>span:nth-child(2):before {
	content:"失效对象数";
}
.oracleDetails-RAC>span:nth-child(1):before{
	content:"RAC节点运行状态 ";
	color:#fff;
}
.oracleDetails-RAC>span:nth-child(2):before{
	content:"RAC节点ASM文件系统使用空间";
}
.oracleDetails-left {
	width: 100%;
	height: 220px;
	margin-right: 20px;
	margin-top:-10px;
}
.oracleDetails-left span:BEFORE {
	font-size: 14px;
	display: block;
	margin-bottom: 4px;
	color: #5c5a66;
}

.oracleDetails-left>span {
	margin: 5px;
	position: relative;
	float: left;
	width: calc(100% - 10px);
	height: 70px;
	background: #f1f0f5;
	border-radius: 4px;
	color: #2b2933;
	text-align: center;
	font-size: 24px;
	box-sizing: border-box;
	padding-top: 6px;
}

.oracleDetails-left>span:nth-child(1) {
	background: #5b62f9;
	color: #fff;
	font-size: 36px;
	font-weight: 400;
	padding-top: 10px;
}

.oracleDetails-left>span:nth-child(1):before {
	content: "未解除事件总数";
	color: #ffffff !important;
}
.oracleDetails-left>span:nth-child(3){
	padding-top:10px;
}
.oracleDetails-left>span:nth-child(3):before {
	content: "当日事件总数";
	color: #5c5a66;
	font-size: 14px;
}

.oracleDetails-left>span:nth-child(2) {
	background-image: linear-gradient(to bottom, #AEADB3 0%, #AEADB3 100%);
	background-size: 1px 50px;
	background-position: center 10px;
	background-repeat: no-repeat;
	display: flex;
	padding-top:10px;
}

.oracleDetails-left>span>span:AFTER {
	content: "";
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	top: 8px;
	left: 25%;
}
.oracleDetails-left>span>span {
	width: 50%;
	position: relative;
}

.oracleDetails-left>span>span:nth-child(1):before {
	content: "预警";
}

.oracleDetails-left>span>span:nth-child(2):before {
	content: "告警";
}

.oracleDetails-left>span>span:nth-child(1):after {
	background: #5e63fd;
}

.oracleDetails-left>span>span:nth-child(2):after {
	background: #fc862f;
}
.oracleDetails-layout, .oracleDetails-layout2, .oracleDetails-layout3{
	display: flex;	
}
.oracleDetails-layout>section, .oracleDetails-layout2>section, .oracleDetails-layout3>section{
	height: 300px;
}
.oracleDetails-layout3>section{
	width: calc((100% - 40px) / 3);
}
.oracleDetails-layout3>section+section{
	margin-left: 20px;
}
.oracleDetails-layout>section:nth-child(1){
	margin-right: 20px;
	width:calc((100% - 40px)/3);
}
.oracleDetails-layout>section:nth-child(1) li{
	width: calc(100% / 3);
    overflow: hidden;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.oracleDetails-layout>section:nth-child(2){
	width:calc((100% -20px)*(2/3));
}
.oracleDetails-layout2>section:nth-child(1){
	width:calc((100% -20px)*(2/3));
	margin-right: 20px;
}
.oracleDetails-layout2>section:nth-child(2){
	width:calc((100% - 40px)/3)
}

.oracleDetails-echars{
	width: 100%;
	height: 220px;
}
.oracleDetails-echars2{
	width: 100%;
	height: 163px;
}
.oracleDetails-echarsBottom{
	width: 100%;
	height: 57px;
	padding-top: 10px;
	display: flex;
	flex-wrap: nowrap;
}

.oracleDetails-echarsBottom>span{
	width: calc(100% / 2);
	height: 47px;
	line-height: 47px;
	font-size: 12px;
	padding:0 20px;
	border-radius: 3px;
	display: flex;
    justify-content: space-between;
}
.oracleDetails-echarsBottom>span:nth-child(1){
	color: #fff;
	background-color: #5b62f9;
}
.oracleDetails-echarsBottom>span:nth-child(1):before{
	content:"BROKEN作业数";
}
.oracleDetails-echarsBottom>span:nth-child(2){
	margin-left: 20px;
	color: #2b2933;
	background-color: #f1f0f5;
}
.oracleDetails-echarsBottom>span:nth-child(2):before{
	content:"失败的作业数";
	color: #5c5a66;
}

.oracleDetails-instanceSummary,.oracleDetails-appSummary {
	table-layout: fixed;
	height: 240px;
}
.oracleDetails-instanceSummary>span:nth-child(2n),.oracleDetails-appSummary>span:nth-child(2n) {
	margin-left: 10px;
}
.oracleDetails-instanceSummary>span:nth-child(n+3),.oracleDetails-appSummary>span:nth-child(n+3) {
	margin-top: 10px;
}
.oracleDetails-instanceSummary>span:nth-child(1):BEFORE {
	content: '端口状态';
}
.oracleDetails-instanceSummary>span:nth-child(2):BEFORE {
	content: '当前进程总数';
}
.oracleDetails-instanceSummary>span:nth-child(3):BEFORE {
	content: 'RAC节点状态';
}
.oracleDetails-instanceSummary>span:nth-child(4):BEFORE {
	content: '表空间空间比率';
}
.oracleDetails-instanceSummary>span:nth-child(5):BEFORE {
	content: 'SGA空闲百分比';
}
.oracleDetails-instanceSummary>span:nth-child(6):BEFORE {
	content: '日志占用磁盘';
}

.oracleDetails-appSummary>span:nth-child(1):BEFORE {
	content: '超长sql数';
}
.oracleDetails-appSummary>span:nth-child(2):BEFORE {
	content: '超长事务数';
}
.oracleDetails-appSummary>span:nth-child(3):BEFORE {
	content: '长时间锁等待数';
}
.oracleDetails-appSummary>span:nth-child(4):BEFORE {
	content: '长时间作业数';
}
.oracleDetails-appSummary>span:nth-child(5):BEFORE {
	content: 'Cursors使用率';
}
.oracleDetails-appSummary>span:nth-child(6):BEFORE {
	content: 'SEQ使用率';
}

.oracleDetails-instanceSummary>span:BEFORE,.oracleDetails-appSummary>span:before {
	font-size: 12px;
	display: block;
	color: #333;
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.oracleDetails-instanceSummary,.oracleDetails-appSummary {
	width: 100%;
	height: 230px;
	display: flex;
	flex-wrap: wrap;
	margin-top:0;
}
.oracleDetails-instanceSummary>span:nth-child(1){
	background:url("img/dbnew/db20.png") no-repeat 10% 50%  #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-instanceSummary>span:nth-child(2){
	background:url("img/dbnew/db78.png") no-repeat 10% 50% #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-instanceSummary>span:nth-child(3){
	background:url("img/dbnew/db771.png") no-repeat 10% 50% #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-instanceSummary>span:nth-child(4){
	background:url("img/dbnew/db790.png") no-repeat 10% 50% #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-instanceSummary>span:nth-child(5){
	background:url("img/dbnew/SGA.png") no-repeat 10% 50% #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-instanceSummary>span:nth-child(6){
	background:url("img/dbnew/db784.png") no-repeat 10% 50% #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-appSummary>span:nth-child(1){
	background:url("img/dbnew/db691.png") no-repeat 10% 50%  #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-appSummary>span:nth-child(2){
	background:url("img/dbnew/db5.png") no-repeat 10% 50% #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-appSummary>span:nth-child(3){
	background:url("img/dbnew/db4.png") no-repeat 10% 50% #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-appSummary>span:nth-child(4){
	background:url("img/dbnew/db3.png") no-repeat 10% 50% #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-appSummary>span:nth-child(5){
	background:url("img/dbnew/db772.png") no-repeat 10% 50% #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-appSummary>span:nth-child(6){
	background:url("img/dbnew/db770.png") no-repeat 10% 50% #f6f7fb;
	background-size:40px 40px;
}
.oracleDetails-instanceSummary>span,.oracleDetails-appSummary>span{
	width: calc((100% - 10px) / 2);
	color: #000;
	border-radius: 2px;
	background-color: #f1f0f5;
	font-size: 16px;
	height: 68px;
	box-sizing: border-box;
    padding: 14px 0 0 20%;
}
 table.dataTable#spaceTable tbody tr td:nth-child(7){
	display: flex;
    justify-content: space-between;
	position: relative;
	height: 26px;
    padding-top: 3px;
}
 table.dataTable#spaceTable tbody tr td:nth-child(7)>span:nth-child(3){
	position: absolute;
	left: 0;
	bottom: 4px;
	width:100%;
	height: 2px;
	border-radius: 1px;
	background-color: #e5e5e5;
    background-image: linear-gradient(to right, red 0%, red 100%);
    background-size: 30px 2px;
    background-repeat: repeat;
}
</style>

<section class="panel">
	<p class="title">ORACLE详情</p>
	<div id="baseContent" class="content" style="display: flex; height: 310px;">
		<!-- 健康度 -->
		<section class="panel"
			style="margin-right: 20px; flex: none; width: 280px;">
			<p class="title">ORACLE健康度</p>
			<div class="content" style="padding: 0;">
				<canvas id="health" style="width: 280px;">对不起，您的浏览器版本过低，无法显示</canvas>
			</div>
		</section>

		<!-- 实例汇总 -->
		<section class="panel" style="margin-right: 20px; flex: auto">
			<p class="title">实例汇总</p>
			<div class="content">
				<div class="oracleDetails-instanceSummary">
					<span id="protStatus" label-flag="info">-</span>
					<span id="processCount" label-flag="info">-</span>
					<span id="racStatus" label-flag="info">-</span>
					<span id="tableSpaceFreeRate" label-flag="info">-</span>
					<span id="sgaFreeRate" label-flag="info">-</span>
					<span id="logUseDiskRate" label-flag="info">-</span>
				</div>
			</div>
		</section>
		<!-- 应用汇总 -->
		<section class="panel" style="margin-right: 20px; flex: auto;">
			<p class="title">应用汇总</p>
			<div class="content">
				<div class="oracleDetails-appSummary">
					<span id="longSqlCount" label-flag="info">-</span>
					<span id="longTransCount" label-flag="info">-</span>
					<span id="longTimeWaitCount" label-flag="info">-</span>
					<span id="longTimeRunCount" label-flag="info">-</span>
					<span id="cursorsUseRate" label-flag="info">-</span>
					<span id="seqUseRate" label-flag="info">-</span>
				</div>
			</div>
		</section>
		<!-- 事件统计 -->
		<section class="panel" style="flex: none; width: 292px;">
			<p class="title">事件统计</p>
			<div class="content">
				<div class="oracleDetails-left">
					<span class="single-block" id="unClosedCount" label-flag="info">-</span>
					<span> <span id="warningCount" label-flag="info">-</span> 
					<span id="alertCount" label-flag="info">-</span>
					</span> <span class="single-block" id="dayEventCount" label-flag="info">-</span>
				</div>
			</div>
		</section>
	</div>
	<ul id="mainUl" class="nav nav-tabs nav-underLine">
		<li class="active"><a href="#tabs1" data-toggle="tab">实例运行</a></li>
		<li><a href="#tabs2" data-toggle="tab">应用运行</a></li>
	</ul>
	<div class="tab-content">
		<div id="tabs1" class="tab-pane active" >
			<div class="line-1" style="display: flex;">
					<section class="panel" style="width:calc((100% - 40px)/3);margin-right:20px;height:300px;">
						<ul id="processUl" class="nav nav-tabs nav-public">
							<li class="active"><a href="#tabs11" data-toggle="tab">Processes使用率</a></li>
							<li><a href="#tabs22" data-toggle="tab">进程资源</a></li>
						</ul>
						<div class="tab-content">
							<div id="tabs11" class="tab-pane active">
								<div id="eProUsed" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>	
							</div>
							<div id="tabs22" class="tab-pane">
								<div id="eProSource" class="oracleDetails-echars" style="width: calc(33vw - 105px);height: 220px;"></div>
							</div>
						</div>
					</section>
				
					<section class="panel" style="width:calc((100% - 40px)/3);margin-right:20px;height:300px;">
						<ul id="connUl" class="nav nav-tabs nav-public">
							<li class="active"><a href="#tabs111" data-toggle="tab">连接分类</a></li>
							<li><a href="#tabs222" data-toggle="tab">连接状态</a></li>
						</ul>
						<div class="tab-content">
							<div id="tabs111" class="tab-pane active">
								<div id="eConnCls" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>
								<!-- <div class="oracleDetails-link" >
									<span id="connTotal">-</span>
									<span id="connLocal">-</span>
									<span id="connRemote">-</span>
								</div> -->
						
							</div>
							<div id="tabs222" class="tab-pane">
								<div id="eConnStatus" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>
								<!-- <div class="oracleDetails-linkState" >
									<span>542</span>
									<span>312</span>
									<span>230</span>
									<span>230</span>
								</div> -->
							</div>
						</div>
					</section>
				
					<section class="panel" style="width:calc((100% - 40px)/3);height:300px;">
						<ul id="sgaUl" class="nav nav-tabs nav-public">
							<li class="active"><a href="#tabs1111" data-toggle="tab">SGA空闲百分比</a></li>
							<li><a href="#tabs2222" data-toggle="tab">命中率统计</a></li>
						</ul>
						<div class="tab-content">
							<div id="tabs1111" class="tab-pane active">
								<div id="eSgaFree" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>
							</div>
							<div id="tabs2222" class="tab-pane">
								<div id="eHitRate" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>
							</div>
						</div>
					</section>
				</div>
				
				<div class="line-2" style="display:flex;">
					<section class="panel" style="width:calc((100% -40px)*(2/3) + 20px);margin-right:20px;height:300px;">
						<ul id="tableUl" class="nav nav-tabs nav-public">
							<li class="active"><a href="#tabs11111" data-toggle="tab">表空间信息</a></li>
							<li><a href="#tabs22222" data-toggle="tab">表空间空闲比率</a></li>
						</ul>
						<div class="tab-content">
							<div id="tabs11111" class="tab-pane active">
								<table id="spaceTable" class="display dataTable table">
									<thead>
										<tr>
											<th width="70">序号</th>
											<th>表名称</th>
											<th width="70">状态</th>
											<th>类型</th>
											<th>扩展管理</th>
											<th>空间大小MB</th>
											<th width="150">已用大小MB/百分比</th>
											<th>空闲大小MB</th>
											<th>可扩展大小MB</th>
										</tr>
									</thead>
									<tbody>
										<!-- <tr>
											<td>序号</td>
											<td>表名称</td>
											<td>状态</td>
											<td>类型</td>
											<td>扩展管理</td>
											<td>空间大小MB</td>
											<td width="100"><span>473</span><span>71.82</span><span></span></td>
											<td>空闲大小MB</td>
											<td>可扩展大小MB</td>
										</tr> -->
									</tbody>
								</table>
							</div>
							<div id="tabs22222" class="tab-pane">
								<div id="eSpaceRate" class="oracleDetails-echars" style="width: calc(66vw - 160px);"></div>
							</div>
						</div>
					</section>
				
					<section class="panel" style="width:calc((100% -40px) /3);height:300px;">
						<ul id="convUl" class="nav nav-tabs nav-public">
							<li class="active"><a href="#tabs111111" data-toggle="tab">当前会话数使用率</a></li>
							<li><a href="#tabs222222" data-toggle="tab">等待锁的会话数</a></li>
						</ul>
						<div class="tab-content">
							<div id="tabs111111" class="tab-pane active">
								<div id="eConvUsed" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>
							</div>
							<div id="tabs222222" class="tab-pane">
								<div id="eWaitLock" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>
							</div>
						</div>
					</section>
				</div>
				
				<div class="line-3" style="display:flex;">
					<section class="panel" style="width:calc((100% -40px) /3);margin-right:20px;height:300px;">
						<ul id="guardUl" class="nav nav-tabs nav-public">
							<li class="active"><a href="#tabs1111111" data-toggle="tab">DATAGUARD状态</a></li>
							<li><a href="#tabs2222222" data-toggle="tab">备份信息</a></li>
						</ul>
						<div class="tab-content">
							<div id="tabs1111111" class="tab-pane active">
								<table id="guardTable" class="display dataTable table">
									<thead>
										<tr>
											<th width="80">序号</th>
											<th>归档路径ID</th>
											<th>归档路径状态</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
							<div id="tabs2222222" class="tab-pane">
								<table id="bakTable" class="display dataTable table">
									<thead>
										<tr>
											<th>序号</th>
											<th>备份类型</th>
											<th>备份状态</th>
											<th>备份起始时间</th>
											<th>备份结束时间</th>
											<th>备份耗用时间(小时)</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
						</div>
					</section>
				
					<section class="panel" style="width:calc((100% -40px)*(2/3) + 20px);height:300px;">
						<p class="title">归档日志空间信息</p>
						<div class="content">
							<table id="logSpaceTable" class="display dataTable table">
								<thead>
									<tr>
										<th width="60px">序号</th>
										<th width="80px">GROUP</th>
										<th>THREAD</th>
										<th>BYTES</th>
										<th>MEMBERS</th>
										<th>ARCHIVED</th>
										<th>STATUS</th>
										<th>FIRST_CHANGE</th>
										<th>FIRST_TIME</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
							
						</div>
					</section>
				</div>
				
				<div class="line-4" style="display:flex;">
					<section class="panel" style="width:calc((100% -40px) /3);margin-right:20px;height:300px;">
						<p class="title">占用的磁盘空间大小GB</p>
						<div class="content">
							<div id="eLogSize" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>
						</div>
					</section>
					
					<section class="panel" style="width:calc((100% -40px) /3);margin-right:20px;height:300px;">
						<p class="title">RAC节点ASM文件系统使用空间</p>
						<div class="content">
							<div id="eASMSize" class="oracleDetails-echars" style="width: calc(33vw - 105px);height:170px;margin-bottom:5px;"></div>
							<div class="oracleDetails-RAC">
								<span id="racNodeNum">-</span>
								<span id="racAsmNum">-</span>
							</div>
						</div>
					</section>
					
					<section class="panel" style="width:calc((100% -40px) /3);height:300px;">
						<p class="title">失效对象</p>
						<div class="content">
							<table id="invalidTable" class="display dataTable table">
								<thead>
									<tr>
										<th width="60px">序号</th>
										<th>对象类型</th>
										<th>所属用户</th>
										<th>对象名称</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<!-- <ul id="objUl" class="nav nav-tabs nav-public">
							<li class="active"><a href="#tabs33" data-toggle="tab">总失效对象数</a></li>
							<li><a href="#tabs44" data-toggle="tab">失效对象</a></li>
						</ul>
						<div class="tab-content">
							<div id="tabs33" class="tab-pane active">
								<div id="eUselessObj" style="width: calc(33vw - 105px);height:170px;margin-bottom:5px;"></div>
								<div class="oracleDetails-object">
									<span id="missTotal">-</span>
									<span id="missNum">-</span>
								</div>
							</div>
							<div id="tabs44" class="tab-pane">
									<table id="invalidTable" class="display dataTable table">
										<thead>
											<tr>
												<th>序号</th>
												<th>对象类型</th>
												<th>所属用户</th>
												<th>对象名称</th>
											</tr>
										</thead>
										<tbody></tbody>
									</table>
							</div>
						</div> -->
					</section>		
				</div>			
		</div>
		<div id="tabs2" class="tab-pane">
			<div class="oracleDetails-layout">
				<section class="panel" style="height: auto">
					<ul id="sqlUl" class="nav nav-tabs nav-public">
						<li class="active"><a href="#tabs333" data-toggle="tab">执行时间最长的sql语句</a></li>
						<li><a href="#tabs444" data-toggle="tab">执行次数最多的sql语句</a></li>
						<li><a href="#tabs555" data-toggle="tab">读磁盘最多的sql语句</a></li>
					</ul>
					<div class="tab-content">
						<div id="tabs333" class="tab-pane active">
							<table id="sqlTimeTable" class="display dataTable table">
								<thead>
									<tr>
										<th>序号</th>
										<th>sql_text</th>
										<th>elapsed_time</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<div id="tabs444" class="tab-pane">
							<table id="sqlCountTable" class="display dataTable table">
								<thead>
									<tr>
										<th>序号</th>
										<th>sql_text</th>
										<th>executions</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<div id="tabs555" class="tab-pane">
							<table id="sqlDiskTable" class="display dataTable table">
								<thead>
									<tr>
										<th>序号</th>
										<th>sql_text</th>
										<th>disk_reads</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</section>
				<section class="panel" style="height: auto">
					<p class="title">表记录最多TOP5</p>
					<div class="content">
						<!-- 数据表格Start -->
						<table id="topRecordTable" class="display dataTable table">
							<thead>
								<tr>
									<th width="50px">序号</th>
									<th width="50px">所有者</th>
									<th width="50px">表名</th>
									<th width="60px">表空间名称</th>
									<th width="50px">表状态</th>
									<th width="60px">是否开启压缩</th>
									<th width="90px">最后一次信息统计搜集时间</th>
									<th width="60px">表记录数</th>
									<th width="50px">表大小</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
						<!-- 数据表格End -->
					</div>
				</section>
			</div>
			<div class="oracleDetails-layout2">
				<section class="panel">
					<ul id="lockUl" class="nav nav-tabs nav-public">
						<li class="active"><a href="#tabs3333" data-toggle="tab">长时间锁等待信息</a></li>
						<li><a href="#tabs4444" data-toggle="tab">长时间锁等待个数</a></li>
						<li><a href="#tabs5555" data-toggle="tab">死锁信息</a></li>
					</ul>
					<div class="tab-content">
						<div id="tabs3333" class="tab-pane active">
							<table id="longLockTable" class="display dataTable table">
								<thead>
									<tr>
										<th>序号</th>
										<th>会话ID</th>
										<th>会话序列号</th>
										<th>用户名</th>
										<th>等待事件</th>
										<th>sqlID</th>
										<th>等待时间</th>
										<th>连接的应用程序</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
						<div id="tabs4444" class="tab-pane">
							<div id="eLockCount" class="oracleDetails-echars" style="width: calc(66vw - 160px);"></div>
						</div>
						<div id="tabs5555" class="tab-pane">
							<table id="deadLockTable" class="display dataTable table">
								<thead>
									<tr>
										<th>序号</th>
										<th>代理名称</th>
										<th>汇报渠道</th>
										<th>采集时间</th>
										<th>应用系统ID</th>
										<th>服务器ID</th>
										<th>服务ID</th>
										<th>对象ID</th>
										<th>数量</th>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</section>
				<section class="panel">
					<p class="title">seq信息</p>
					<div class="content">
						<!-- 数据表格Start -->
						<table id="seqTable" class="display dataTable table">
							<thead>
								<tr>
									<th width="30px">序号</th>
									<th width="40px">SEQ拥有者</th>
									<th width="40px">SEQ名称</th>
									<th width="21px">最小值</th>
									<th width="21px">最大值</th>
									<th width="21px">当前值</th>
									<th width="40px">SEQ使用率</th>
								</tr>
							</thead>
							<tbody>
									<tr><td>1</td><td>abc</td><td>socon </td><td>2</td><td>10</td><td>6</td><td>25%</td></tr>
									<tr><td>2</td><td>abc</td><td>socon </td><td>2</td><td>10</td><td>6</td><td>25%</td></tr>
									<tr><td>3</td><td>abc</td><td>socon </td><td>2</td><td>10</td><td>6</td><td>25%</td></tr>
									<tr><td>4</td><td>abc</td><td>socon </td><td>2</td><td>10</td><td>6</td><td>25%</td></tr>
									<tr><td>5</td><td>abc</td><td>socon </td><td>2</td><td>10</td><td>6</td><td>25%</td></tr>									
							</tbody>
						</table>
						<!-- 数据表格End -->
					</div>
				</section>
			</div>
			<div class="oracleDetails-layout3">
				<section class="panel">
					<ul id="rollbackUl" class="nav nav-tabs nav-public">
						<li class="active"><a href="#tabs33333" data-toggle="tab">超长事务</a></li>
						<li><a href="#tabs44444" data-toggle="tab">大事务</a></li>
						<li><a href="#tabs55555" data-toggle="tab">回滚段百分比</a></li>
					</ul>
					<div class="tab-content">
						<div id="tabs33333" class="tab-pane active">
								<!-- 数据表格Start -->
								<table id="longTransTable" class="display dataTable table">
									<thead>
										<tr>
											<th width="30px">序号</th>
											<th width="30px">sid</th>
											<th width="50px">username</th>
											<th width="50px">machine</th>
											<th width="50px">program</th>
											<th width="50px">sql_text</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
								<!-- 数据表格End -->
						</div>
						<div id="tabs44444" class="tab-pane">
							<!-- 数据表格Start -->
								<table id="bigTransTable" class="display dataTable table">
									<thead>
										<tr>
											<th width="30px">序号</th>
											<th width="30px">sid</th>
											<th width="40px">username</th>
											<th width="30px">status</th>
											<th width="30px">osuser</th>
											<th width="30px">program</th>
											<th width="40px">USED_UBLK</th>
											<th width="30px">sql_text</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
								<!-- 数据表格End -->
						</div>
						<div id="tabs55555" class="tab-pane">
							<div id="ePerRollback" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>
						</div>
					</div>
				</section>
				<section class="panel">
					<ul id="workUl" class="nav nav-tabs nav-public">
						<li class="active"><a href="#tabs6" data-toggle="tab">超长时间作业</a></li>
						<li><a href="#tabs7" data-toggle="tab">作业数</a></li>
					</ul>
					<div class="tab-content">
						<div id="tabs6" class="tab-pane active">
							<!-- 数据表格Start -->
								<table id="workTable" class="display dataTable table">
									<thead>
										<tr>
											<th width="30px">序号</th>
											<th width="55px" >长事务会话ID</th>
											<th width="55px">事务执行时间</th>
											<th width="30px">进程名</th>
											<th width="35px">sql文本</th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
								<!-- 数据表格End -->
						</div>
						<div id="tabs7" class="tab-pane">
							<div id="eWorkNum" class="oracleDetails-echars2" style="width: calc(33vw - 105px);"></div>
							<div class="oracleDetails-echarsBottom">
								<span id="brokenNum">-</span>
								<span id="failNum">-</span>
							</div>
						</div>
					</div>
				</section>
				<section class="panel">
					<ul id="cursorUl" class="nav nav-tabs nav-public">
						<li class="active"><a href="#tabs66" data-toggle="tab">CURSOR_COUNT游标数</a></li>
						<li><a href="#tabs77" data-toggle="tab">Cursors使用率</a></li>
					</ul>
					<div class="tab-content">
						<div id="tabs66" class="tab-pane active">
							<div id="eCursorNum" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>
						</div>
						<div id="tabs77" class="tab-pane">
							<div id="eCursorUsed" class="oracleDetails-echars" style="width: calc(33vw - 105px);"></div>
						</div>
					</div>
				</section>
			</div>

		</div>
	</div>
</section>


