<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.informixDetails-layout {
	display: flex;
	height: 310px;
}
.informixDetails-layout+div {
	margin-top: 20px;
	height: 300px;
}
.informixDetails-layout:FIRST-CHILD>section:FIRST-CHILD {
	width: 280px;
	flex: none;
}

.informixDetails-layout:FIRST-CHILD>section:LAST-CHILD {
	flex: auto;
}
.informixDetails-layout>section+section{
	margin-left: 20px;
}
.informixDetails-instanceTotal {
	width: 420px;
	flex: none;
}

.informixDetails-instanceTotal div p {
	height: 50px;
	line-height: 50px;
	padding: 0 20px;
	text-align: right;
	background-color: #f1f0f5;
	margin: 0;
}
.informixDetails-instanceTotal div p+p{
	margin-top: 10px;
}
.informixDetails-instanceTotal div p:BEFORE {
	content: attr(data-title);
	float: left;
	color: #5c5a66;
}

.informixDetails-event {
	float: right;
	width: 200px;
	height: 250px;
}

.informixDetails-event>span:nth-child(2)>span:BEFORE,
.informixDetails-event>span:nth-child(3):BEFORE {
    color: #666;
}
.informixDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}
.informixDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}
.informixDetails-event>span:nth-child(3):BEFORE {
	margin-bottom: 6px;
}
.informixDetails-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 74px;
}
.informixDetails-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
    left: 22px;
    top: 7px;
}
.informixDetails-event>span>span {
	flex: auto;
	position: relative;
}
.informixDetails-event>span+span {
	margin-top: 10px;
}
.informixDetails-event span:BEFORE {
	content: attr(data-title);
	display: block;
	font-size: 14px;
}
.informixDetails-event>span {
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
.informixDetails-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%) no-repeat center center;
	background-size: 1px 50px; 
}

.informixDetails-layout:nth-child(2)>section {
	flex: 1;
}
.informixDetails-layout .top3-charts {
	height: 175px;
}
.informixDetails-layout .top3-charts + div {
	display: flex;
	justify-content: space-between;
	height: 45px;
}

.informixDetails-layout .top3-charts + div span:FIRST-CHILD {
	background-color: #5b62f9;
	color: #FFF;
}

.informixDetails-layout .top3-charts + div span {
	flex: 1;
	background-color: #f1f0f5;
	border-radius: 2px;
	line-height: 45px;
	text-align: right;
	padding: 0 20px;
	display: flex;
	justify-content: space-between;
}

.informixDetails-layout .top3-charts + div span+span {
	margin-left: 10px;
}

.informixDetails-layout .top3-charts + div span:BEFORE {
	color: #5c5a66;
	content:attr(data-title);
}

.informixDetails-layout .top3-charts + div span:FIRST-CHILD:before {
	color: #FFF;
}

.informixDetails-layout:nth-child(3)>section:FIRST-CHILD {
	width: calc((100% - 40px) * 2/3 + 20px);
	flex: none;
}
.informixDetails-layout:nth-child(3)>section:LAST-CHILD {
	flex: auto;
}
.informixDetails-echarts{
	width: 100%;
	height: 220px;
}
</style>

<section class="panel" style="margin: -20px -20px 0;">
	<p class="title">INFORMIX详情</p>
	<div class="content">
		<div class="informixDetails-layout">
			<section class="panel">
				<p class="title">实例健康度</p>
				<div class="content">
					<canvas id="health">对不起，您的浏览器版本过低，无法显示</canvas>
				</div>
			</section>
			<section class="panel informixDetails-instanceTotal">
				<p class="title">实例汇总</p>
				<div class="content">
					<p data-title="数据库运行时间" id="sqlRunTime">-</p>
					<p data-title="数据库状态" id="sqlState">-</p>
					<p data-title="数据库版本" id="sqlVersion">-</p>
					<p data-title="共享内存大小" id="shareMer">-</p>
				</div>
			</section>
			<section class="panel">
				<p class="title">事件总览</p>
				<div class="content">
					<div class="informixDetails-event">
						<span data-title="未解决事件总数" id="undealingCount">-</span>
						<span>
							<span data-title="预警" id="warningCount">-</span>
							<span data-title="告警" id="alarmCount">-</span>
						</span>
						<span data-title="当日事件总数" id="dayEventCount">-</span>
					</div>
					<div id="eEvent" style="margin-right: 220px;height: 220px;"></div>
				</div>
			</section>
		</div>
		<div class="informixDetails-layout">
			<section class="panel">
				<ul id="mytab" class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs1" data-toggle="tab">表大小TOP3</a></li>
					<li><a href="#tabs2" data-toggle="tab">锁数量TOP3</a></li>
					<li><a href="#tabs3" data-toggle="tab">表空间使用率TOP3</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabs1" class="tab-pane active">
						<div id="e_sum_size" class="top3-charts"></div>
						<div>
							<span data-title="top1">-</span>
							<span data-title="top2">-</span>
							<span data-title="top3">-</span>
						</div>
					</div>
					<div id="tabs2" class="tab-pane">
						<div id="e_lock_count" class="top3-charts"></div>
						<div>
							<span data-title="top1">-</span>
							<span data-title="top2">-</span>
							<span data-title="top3">-</span>
						</div>
					</div>
					<div id="tabs3" class="tab-pane">
						<div id="e_db_space" class="top3-charts"></div>
						<div>
							<span data-title="top1">-</span>
							<span data-title="top2">-</span>
							<span data-title="top3">-</span>
						</div>
					</div>
				</div>
			</section>
			<section class="panel">
				<p class="title">锁信息</p>
				<div class="content">
					<table id="lockInfoTable" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>数据库名</th>
								<th>表名</th>
								<th>锁个数</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
			<section class="panel">
				<p class="title">关键表信息</p>
				<div class="content">
					<table id="keyTableTable" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>表名</th>
								<th>表大小</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
		</div>
		<div class="informixDetails-layout">
			<section class="panel">
				<p class="title">会话性能统计</p>
				<div class="content">
					<table id="callPerformTable" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>SID</th>
								<th>用户名</th>
								<th>主机名</th>
								<th>权限</th>
								<th>锁保持</th>
								<th>顺序扫描</th>
								<th>总排序</th>
								<th>磁盘排序</th>
								<th>内存排序</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
			<section class="panel">
				<p class="title">表空间使用信息</p>
				<div class="content">
					<table id="spaceUseTable" class="display dataTable table">
						<thead>
							<tr>
								<th>表空间</th>
								<th>分配大小</th>
								<th>空闲大小</th>
								<th>使用率（%）</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
		</div>
	</div>
</section>