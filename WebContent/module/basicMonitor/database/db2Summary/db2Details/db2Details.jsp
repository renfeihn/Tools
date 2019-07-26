<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.db2Details-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.db2Details-queue>span:nth-child(1):before {
	content: 'DB2';
	height: 30px;
}

.db2Details-queue>span:nth-child(1) {
	width: 100%;
	color: #2B2933;
	height: 140px;
	line-height: 120px;
	margin-bottom: 10px;
	padding-left: 144px;
	font-size: 20px;
	font-weight: bolder;
	background: #F1F0F5 url(img/baseMonitor/sign-server.png) no-repeat 20px
		center;
}

.db2Details-queue>span:nth-child(2) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.db2Details-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.db2Details-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
	width:80px;
}

.db2Details-queue>span>span:nth-child(1):before {
	content: "节点IP地址 :";
}

.db2Details-queue>span>span:nth-child(2):before {
	content: "节点端口:";
}

.db2Details-xn {
	table-layout: fixed;
	height: 240px;
}

.db2Details-xn>span {
	cursor: pointer;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.db2Details-xn>span:BEFORE {
	font-size: 12px;
	display: block;
	color: #5C5A67;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-top: 14px;
}

.db2Details-xn {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.db2Details-xn>span {
	width: calc((100% - 10px) / 2);
	border-radius: 3px;
	background-color: #f1f0f5;
	font-size: 20px;
	height: 70px;
	box-sizing: border-box;
	text-align: center;
	line-height: 25px;
	font-weight: 400;
}

.db2Details-instSum>span:nth-child(1):BEFORE {
	content: '端口状态';
}

.db2Details-instSum>span:nth-child(2):BEFORE {
	content: '连接数';
}

.db2Details-instSum>span:nth-child(3):BEFORE {
	content: '表空间使用率';
}

.db2Details-instSum>span:nth-child(4):BEFORE {
	content: '日志空间使用率';
}

.db2Details-instSum>span:nth-child(5):BEFORE {
	content: '长时间锁等待数';
}

.db2Details-instSum>span:nth-child(6):BEFORE {
	content: 'packagecache命中率';
}

.db2Details-instSum>span:nth-child(3):after,
.db2Details-instSum>span:nth-child(4):after,
.db2Details-instSum>span:nth-child(6):after
{
	content: "%";
}

/*事件*/
.db2Details-event {
	float: right;
	width: 180px;
	height: 220px;
}

.db2Details-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.db2Details-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.db2Details-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.db2Details-event>span:nth-child(2)>span:nth-child(3):BEFORE {
	content: '通知';
	display: block;
	font-size: 14px;
	color: #666;
}

.db2Details-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.db2Details-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.db2Details-event>span:nth-child(2)>span:nth-child(3):AFTER {
	background-color: #22ac38;
}

.db2Details-event>span>span:nth-child(1),
.db2Details-event>span>span:nth-child(2){
	border-right:1px solid #AEADB3;
}

.db2Details-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.db2Details-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.db2Details-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 6px;
	top: 7px;
}

.db2Details-event>span>span {
	flex: auto;
	position: relative;
}

.db2Details-event>span+span {
	margin-top: 10px;
}

.db2Details-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.db2Details-event>span {
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

.db2Details-event>span:nth-child(2) {
	flex-direction: row;
/* 	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px; */
}

.db2Details-line {
	display: flex;
}

.db2Details-line .dataTable{
	table-layout: fixed;
}

.db2Details-echart {
	width: 100%;
	height: 220px;
}

.db2Details-portSpan, .db2Details-threadSpan,
	.db2Details-sessionSpan, .db2Details-processResources,
	.db2Details-JVM, .db2Details-responseSpan {
	display: flex;
	width: 100%;
	height: 44px;
	margin: 0;
}

.db2Details-portSpan>li {
	position: relative;
	width: calc(( 100% - 30px)/4);
	border-radius: 4px;
	background: #F1F0F5;
	margin-right: 10px;
	color: #2B2933;
	text-align: center;
	font-size: 14px;
}
.db2Details-responseSpan>li {
	position: relative;
	width: calc(( 100% - 30px)/2);
	border-radius: 4px;
	background: #F1F0F5;
	margin-right: 10px;
	color: #2B2933;
	text-align: center;
	font-size: 14px;
}
.db2Details-portSpan>li:nth-child(4), .db2Details-responseSpan>li:nth-child(2)
	{
	margin: 0;
}

.db2Details-portSpan>li:nth-child(1), .db2Details-responseSpan>li:nth-child(1)
	{
	background: #5B62F9;
	color: #FFFFFF;
}

.db2Details-portSpan>li:before, .db2Details-responseSpan>li:before
	{
	display: block;
	font-size: 12px;
	color: #5C5A66;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.db2Details-portSpan>li:nth-child(1):before {
	content: "端口状态";
	color: #FFFFFF;
}

.db2Details-portSpan>li:nth-child(2):before {
	content: "ESTABLISHED"
}

.db2Details-portSpan>li:nth-child(3):before {
	content: "CLOSE_WAIT"
}

.db2Details-portSpan>li:nth-child(4):before {
	content: "TIME_WAIT"
}

.db2Details-processResources>li {
	width: calc(( 100% - 20px)/3);
	border-radius: 4px;
	background: #F1F0F5;
	margin-right: 10px;
	color: #2B2933;
	font-size: 14px;
	display: flex;
	justify-content: space-around;
	line-height: 44px;
}

.db2Details-processResources>li:nth-child(1)
{
	background: #5B62F9;
	color: #FFFFFF;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.db2Details-processResources>li:nth-child(3)
{
	margin-right: 0;
}

.db2Details-processResources>li:before
{
	font-size: 12px;
	color: #5C5A66;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.db2Details-processResources>li:nth-child(1):before {
	content: "当前进程总数";
	color: #FFFFFF;
}

.db2Details-processResources>li:nth-child(2):before {
	content: "CPU";
}

.db2Details-processResources>li:nth-child(3):before {
	content: "内存";
}

.db2Details-layout {
	height: 250px;
	margin-top: 20px;
}

.db2Details-echars2 {
	height: 250px;
}

table.dataTable.db2Details-spaceTable tbody tr td:nth-child(9)>span {
	width: 6px;
	height: 6px;
	border-radius: 50%;
	display: inline-block;
	margin-right: 5px;
	margin-bottom: 2px;
}

table.dataTable.db2Details-spaceTable tbody tr td:nth-child(9)>span.green {
	background-color: #22AC38;
}

table.dataTable.db2Details-spaceTable tbody tr td:nth-child(9)>span.red {
	background-color: #FF5660;
}
</style>
<div id="baseContent" class="content" style="display: flex; height: 330px;">
	<section class="panel" style="flex: none; width:284px; margin-right: 20px;">
		<p class="title">基本信息 </p>
		<div class="content db2Details-queue">
			<span id="version">-</span>
			<span><span id="ip">-</span><span id="port">-</span></span>
		</div>
	</section>
	
	<section id="performance" class="panel" style="flex: none; width: 440px; margin-right: 20px;">
		<p class="title">实例汇总</p>
		<div class="content">
			<div class="db2Details-xn db2Details-instSum">
				<span id="portStatus" skip-data="skip">-</span><span id="connetCount" skip-data="skip">-</span>
				<span id="tableUsed" skip-data="skip">-</span><span id="dailyUsed" skip-data="skip">-</span>
				<span id="lockCount" skip-data="skip">-</span><span id="hitRate" skip-data="skip">-</span>
			</div>
		</div>
	</section>
	
	<!-- 事件统计 -->
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="db2Details-event">
				<span id="alarmWaring">-</span>
				<span>
					<span id="waringCount">-</span>
					<span id="alarmCount">-</span>
					<span id="infoCount">-</span>
				</span>
				<span id="dayEventCount">-</span>
			</div>
			<div id="eEvent" style="margin-right: 200px;height: 220px;"></div>
		</div>
	</section>	
</div>

<ul class="nav nav-tabs nav-underLine" id="mainUl">
	<li class="active"><a href="#tabs1" data-toggle="tab">实例运行</a></li>
	<li><a href="#tabs2" data-toggle="tab">应用状态</a></li>
</ul>
<div class="tab-content">
	<div id="tabs1" class="tab-pane active">
		<div class="db2Details-line" style="height: 300px;margin-bottom: 20px;">
			<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px; height: 100%;">
				<p class="title">端口</p>
				<div class="content">
					<div id="echart-port" class="db2Details-echart" style="height:173px;margin-bottom:5px;"></div>
					<ul id="db2Details-portSpan" class="db2Details-portSpan">
						<li>-</li>
						<li>-</li>
						<li>-</li>
						<li>-</li>
					</ul>
				</div>
			</section>
			
			<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px; height: 100%;">
				<p class="title">进程资源</p>
				<div class="content">
					<div id="echart-processResources" class="db2Details-echart" style="height:173px;margin-bottom:5px;"></div>
					<ul id="db2Details-processResources" class="db2Details-processResources">
						<li title="当前进程总数">-</li>
						<li>-</li>
						<li>-</li>
					</ul>
				</div>
			</section>
			
			<section class="panel" style="width: calc((100% - 40px)/3); height: 100%;">
				<p class="title">命中率</p>
				<div class="content">
					<div id="hitRateEchart" class="db2Details-echart" style="height: 220px;"></div>
				</div>
			</section>
		</div>
		
		<section class="panel">
			<p class="title">表空间信息</p>
			<div class="content">
				<table id="spaceTable" class="display dataTable table db2Details-spaceTable">
					<thead>
						<tr>
							<th>序号</th>
							<th>数据库分区号</th>
							<th>表空间ID</th>
							<th>表空间名称</th>
							<th>页大小(KB)</th>
							<th>总页数</th>
							<th>已用大小MB/百分比</th>
							<th>空闲大小MB</th>
							<th>表空间状态</th>
							<th>使用自动存储</th>
						</tr>
					</thead>
				</table>
			</div>
		</section>
	</div>
	<div id="tabs2" class="tab-pane" style="padding-bottom: 0;">
		<section class="panel">
			<ul class="nav nav-tabs nav-public" id="longRunUl">
				<li class="active"><a href="#tabs111" data-toggle="tab">超长执行语句sql信息</a></li>
				<!-- <li><a href="#tabs222" data-toggle="tab">超长执行语句数量走势</a></li> -->
			</ul>
			<div class="tab-content">
				<div id="tabs111" class="tab-pane active db2Details-layout" style="margin-top: 0;">
					<table id="longSqlTable" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>应用程序id</th>
								<th>执行的SQL</th>
								<th>日志使用量</th>
								<th>行读取记录数</th>
								<th>行写记录数</th>
								<th>活动开始时间</th>
								<th>获取该sql记录时间</th>
								<th>活动的类型</th>
								<th>活动操作类型</th>
								<th>创建者</th>
								<th>包名</th>
								<th>执行段</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
				<div id="tabs222" class="tab-pane">
					<div class="db2Details-echars2" id='eLongStateNum' style="width: calc(100vw - 210px)"></div>
				</div>
			</div>
		</section>
		
		<div style="display: flex; height: 331px;" class="db2Details-layout">
			<section class="panel" style="flex:none;width: calc((100% - 40px)/3); margin-right: 20px; margin-bottom: 0;">
				<p class="title">数据库各内存集使用率监控</p>
				<div class="content">
					<table id="workTable" class="display dataTable table">
					<thead>
						<tr>
							<th>序号</th>
							<th>数据库名称</th>
							<th>内存配置大小</th>
							<th>内存使用大小</th>
							<th>内存使用率</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
				</div>
			</section>
		
			<section class="panel" style="flex:auto; margin-bottom: 0;">
				<p class="title">表记录最多TOP5</p>
				<div class="content">
					<table id="top5Table" class="display dataTable table">
					<thead>
						<tr>
							<th>序号</th>
							<th>表模式</th>
							<th>表名</th>
							<th>表状态</th>
							<th>是否压缩</th>
							<th>收集统计时间</th>
							<th>记录数</th>
							<th>表空间</th>
							<th>表大小</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
				</div>
			</section>
		</div>
		
		<section class="panel db2Details-layout" style="height: 331px;">
			<ul class="nav nav-tabs nav-public" id="lockWaitUl">
				<li class="active"><a href="#tabs01" data-toggle="tab">平均锁等待时间</a></li>
				<li><a href="#tabs02" data-toggle="tab">死锁回滚数量</a></li>
				<li><a href="#tabs03" data-toggle="tab">应用锁等待百分比</a></li>
				<li><a href="#tabs04" data-toggle="tab">应用锁超时数量</a></li>
				<li><a href="#tabs05" data-toggle="tab">锁升级</a></li>
				<li><a href="#tabs06" data-toggle="tab">堆与锁信息</a></li>
				<li><a href="#tabs07" data-toggle="tab">超长时间锁表监控</a></li>
			</ul>
			<div class="tab-content">
				<div id="tabs01" class="tab-pane active">
					<div class="db2Details-echars2" id="eAverWaitTime"  style="width: calc(100vw - 210px)"></div>
				</div>
				<div id="tabs02" class="tab-pane">
					<div class="db2Details-echars2" id="eLockNum"  style="width: calc(100vw - 210px)"></div>
				</div>
				<div id="tabs03" class="tab-pane">
					<div class="db2Details-echars2" id="eAppLockWait"  style="width: calc(100vw - 210px)"></div>
				</div>
				<div id="tabs04" class="tab-pane">
					<div class="db2Details-echars2" id="eLockUpTime"  style="width: calc(100vw - 210px)"></div>
				</div>
				<div id="tabs05" class="tab-pane">
					<div class="db2Details-echars2" id="eLockUpgrade"  style="width: calc(100vw - 210px)"></div>
				</div>
				<div id="tabs06" class="tab-pane">
					<!-- 数据表格Start -->
					<table id="heapLockTable" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>数据库名</th>
								<th>死锁</th>
								<th>锁定升级数</th>
								<th>排序堆溢出数</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
					<!-- 数据表格End -->
				</div>
				<div id="tabs07" class="tab-pane">
					<!-- 数据表格Start -->
					<table id="longLockTable" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>应用程序id</th>
								<th>应用程序状态</th>
								<th>起始时间</th>
								<th>应用程序名称</th>
								<th>表名</th>
								<th>锁对象类型</th>
								<th>锁模</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
					<!-- 数据表格End -->
				</div>
			</div>
		</section>
	</div>
</div>
