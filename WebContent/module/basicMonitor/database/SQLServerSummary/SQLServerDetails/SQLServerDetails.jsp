<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
	.sqlserverDetails-layout {
		display: flex;
		margin-bottom: 20px;
	}
	.sqlserverDetails>.sqlserverDetails-layout:last-child {
		margin-bottom: 0;
	}
	.sqlserverDetails>.sqlserverDetails-layout:nth-child(1)>section {
		height: 310px;
	}
	.sqlserverDetails>.sqlserverDetails-layout:nth-child(n+2)>section {
		height: 300px;
	}
	.sqlserverDetails>.sqlserverDetails-layout:nth-child(1)>section:nth-child(1) {
		flex: none;
		width: 280px;
		margin-right: 20px;
	}
	.sqlserverDetails>.sqlserverDetails-layout:nth-child(1)>section:nth-child(2) {
		flex: none;
		width: 300px;
		margin-right: 20px;
	}
	.sqlserverDetails>.sqlserverDetails-layout:nth-child(1)>section:nth-child(3) {
		flex: none;
		width: 300px;
		margin-right: 20px;
	}
	.sqlserverDetails>.sqlserverDetails-layout:nth-child(1)>section:nth-child(4) {
		flex: auto;
	}
	.sqlserverDetails>.sqlserverDetails-layout:nth-child(2)>section,
	.sqlserverDetails>.sqlserverDetails-layout:nth-child(3)>section {
		width: calc((100% - 20px)/2);
	}
	.sqlserverDetails>.sqlserverDetails-layout:nth-child(2)>section:nth-child(1),
	.sqlserverDetails>.sqlserverDetails-layout:nth-child(3)>section:nth-child(1) {
		margin-right: 20px;
	}
	.sqlserverDetails-instance,.sqlserverDetails-apps {
		display: flex;
		flex-wrap: wrap;
	}
	.sqlserverDetails-instance>span,.sqlserverDetails-apps>span {
		width: calc((100% - 10px)/2);
		height: 106px;
		background: #f1f0f5;
		line-height: 22px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 22px;
		border-radius: 4px;
	}
	.sqlserverDetails-instance>span:before,
	.sqlserverDetails-apps>span:before {
		display: block;
		margin-top: 32px;
		text-align: center;
		font-size: 14px;
		color: #6F6F6F;
	}
	.sqlserverDetails-instance>span:nth-child(1):before {
		content: "端口状态";
	}
	.sqlserverDetails-instance>span:nth-child(2):before {
		content: "当前连接数";
	}
	.sqlserverDetails-instance>span:nth-child(3):before {
		content: "当前阻塞数量";
	}
	.sqlserverDetails-instance>span:nth-child(4):before {
		content: "会话数量";
	}
	.sqlserverDetails-apps>span:nth-child(1):before {
		content: "缓存命中率";
	}
	.sqlserverDetails-apps>span:nth-child(1):after {
		content: "%";
	}
	.sqlserverDetails-apps>span:nth-child(2):before {
		content: "每秒请求数";
	}
	.sqlserverDetails-apps>span:nth-child(3):before {
		content: "等待锁的进程数";
	}
	.sqlserverDetails-apps>span:nth-child(4):before {
		content: "每秒事务数";
	}
	
	.sqlserverDetails-instance>span:nth-child(2n+1),
	.sqlserverDetails-apps>span:nth-child(2n+1) {
		margin-right: 10px;
	}
	.sqlserverDetails-instance>span:nth-child(n+3),
	.sqlserverDetails-apps>span:nth-child(n+3) {
		margin-top: 10px;
	}
	.sqlserverDetails-base tr {
		display: flex;
	}
	.sqlserverDetails-base tr td{
		
		text-align: left;
		text-indent: 4%;
		border-bottom: solid 1px #ddd;
		border-top: none;
	}
	.sqlserverDetails-base tr td:nth-child(1){
		width: 60%;
	}
	.sqlserverDetails-base tr td:nth-child(2){
		width: 40%;
	}
	.sqlserverDetails-base tr:last-child td {
		border-bottom:none;
	}
	.sqlserverDetails-echarts {
		width: 100%;
		height: 220px;
	}
</style>
<section class="panel">
	<p class="title">SQL Server明细</p>
	<div class="content sqlserverDetails">
		<div class="sqlserverDetails-layout">
			<section class="panel">
				<p class="title">健康度</p>
				<div class="content" style="padding:0;">
					<canvas id="health" style="width: 280px;">对不起，您的浏览器版本过低，无法显示</canvas>
				</div>
			</section>
			<section class="panel">
				<p class="title">实例汇总</p>
				<div class="content">
					<div class="sqlserverDetails-instance">
						<span id="portStatus">-</span>
						<span id="curConCount">-</span>
						<span id="curBlockCount">-</span>
						<span id="liveCount">-</span>
					</div>
				</div>
			</section>
			<section class="panel">
				<p class="title">应用汇总</p>
				<div class="content">
					<div class="sqlserverDetails-apps">
						<span id="cacheBuffer">-</span>
						<span id="reqCount">-</span>
						<span id="waitCount">-</span>
						<span id="transactionCount">-</span>
					</div>
				</div>
			</section>
			<section class="panel">
				<p class="title">数据库基本配置</p>
				<div class="content">
					<div class="sqlserverDetails-base">
						<table class="table">
							<tr>
								<td>是否可执行扩展存储过程</td><td id="xpCmdshell">-</td>
							</tr>
							<tr>
								<td>包大小</td><td id="networkPacketSize">-</td>
							</tr>
							<tr>
								<td>最大内存</td><td id="maxServerMemory">-</td>
							</tr>
							<tr>
								<td>最小内存</td><td id="minServerMemory">-</td>
							</tr>
							<tr>
								<td>恢复模式</td><td id="recovery">-</td>
							</tr>
							<tr>
								<td>端口号</td><td id="port">-</td>
							</tr>
						</table>
					</div>
				</div>
			</section>
		</div>
		<div class="sqlserverDetails-layout">
			<section class="panel">
				<p class="title">请求与等待统计</p>
				<div class="content">
					<div class="sqlserverDetails-echarts" id="reqandwait"></div>
				</div>
			</section>
			<section class="panel">
				<p class="title">常规统计</p>
				<div class="content">
					<div class="sqlserverDetails-echarts" id="comCounts"></div>
				</div>
			</section>
		</div>
		<div class="sqlserverDetails-layout">
			<section class="panel">
				<p class="title">数据库信息</p>
				<div class="content">
					<div class="sqlserverDetails-echarts" id="dbInfo"></div>
				</div>
			</section>
			<section class="panel">
				<ul class="nav nav-tabs nav-public" id="cacheUl">
					<li class="active"><a href="#tabs1" data-toggle="tab">缓冲区命中率</a></li>
					<li><a href="#tabs2" data-toggle="tab">缓冲池页数</a></li>
					<li><a href="#tabs3" data-toggle="tab">没有引用的页存留时间</a></li>
					<li><a href="#tabs4" data-toggle="tab">checkpoint执行频率</a></li>
					<li><a href="#tabs4" data-toggle="tab">懒写入频率</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabs1" class="tab-pane active">
						<div class="sqlserverDetails-echarts" id="cacheInfo"></div>
					</div>
				</div>
			</section>
		</div>
		<div class="sqlserverDetails-layout">
			<section class="panel">
				<p class="title">会话信息</p>
				<div class="content">
					<table id="conversationTab" class="display dataTable table">
						<thead>
							<tr>
								<th width="60">序号</th>
								<th width="70">会话id</th>
								<th width="70">登录名</th>
								<th width="60">状态</th>
								<th>cpu时间（毫秒）</th>
								<th>内存占用（8KB页数）</th>
								<th>执行总时间（毫秒）</th>
								<th>建立时间（毫秒）</th>
								<th>最近请求开始时间</th>
								<th>最近请求完成时间</th>
								<th>读次数</th>
								<th>写次数</th>
								<th>逻辑读取次数</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
		</div>
		<div class="sqlserverDetails-layout">
			<section class="panel">
				<p class="title">作业信息</p>
				<div class="content">
					<table id="workTab" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>作业id</th>
								<th>作业名</th>
								<th>最近执行时间</th>
								<th>最近执行状态</th>
								<th>最近执行时长</th>
								<th>最近运行状态信息</th>
								<th>下次运行时间</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
		</div>
</div>
</section>