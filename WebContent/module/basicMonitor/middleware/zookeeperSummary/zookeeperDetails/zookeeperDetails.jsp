<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
/*基本信息*/
.selected_SanJiao {
	position: absolute;
	margin-left: -9px;
	margin-top: 27px;
	display: none;
	width: 9px;
	height: 16px;
	border: none;
	background-image: url('img/configManage/selected.png');
}
.sessionPath {
	table-layout: auto;
}

.sessionPath>tbody>tr>td {
	height: 26px;
	font-family: '宋体';
	vertical-align: middle;
	text-align: center;
}

.sessionPath>tbody>tr>td:nth-child(1) {
	width: 31%;
}
.zookeeperDetails-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.zookeeperDetails-queue>span:nth-child(1):before {
	content: 'zookeeper';
	height: 30px;
}

.zookeeperDetails-queue>span:nth-child(1) {
	width: 100%;
	color: #2B2933;
	height: 140px;
	line-height: 120px;
	margin-bottom: 10px;
	padding-left: 144px;
	font-size: 20px;
	font-weight: bolder;
	background: #F1F0F5 url(img/baseMonitor/zookeeper.png) no-repeat 20px
		center;
}

.zookeeperDetails-queue>span:nth-child(2) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.zookeeperDetails-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.zookeeperDetails-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
	width:80px;
}

.zookeeperDetails-queue>span>span:nth-child(1):before {
	content: "节点IP地址 :";
}

.zookeeperDetails-queue>span>span:nth-child(2):before {
	content: "节点端口:";
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
/*事件*/
.zookeeperDetails-event {
	float: right;
	width: 180px;
	height: 220px;
}

.zookeeperDetails-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.zookeeperDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.zookeeperDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.zookeeperDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.zookeeperDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.zookeeperDetails-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.zookeeperDetails-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.zookeeperDetails-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.zookeeperDetails-event>span>span {
	flex: auto;
	position: relative;
}

.zookeeperDetails-event>span+span {
	margin-top: 10px;
}

.zookeeperDetails-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.zookeeperDetails-event>span {
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

.zookeeperDetails-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px;
}
.line .dataTable{
	table-layout: fixed;
}

.zookeeperDetails-echars {
	width: 100%;
	height: 220px;
}

.zookeeperDetails-echars2 {
	width: 100%;
	height: 163px;
}

.zookeeperDetails-appSummary>span:BEFORE{
	font-size: 14px;
    display: block;
    margin-bottom: 6px;
    color: #666;
}
.zookeeperDetails-appSummary>span:nth-child(1):BEFORE {
	content: '角色';
}

.zookeeperDetails-appSummary>span:nth-child(2):BEFORE {
	content: '连接数';
}
.zookeeperDetails-appSummary>span:nth-child(2):after {
	content: '个';
}
.zookeeperDetails-appSummary>span:nth-child(3):BEFORE {
	content: 'follower数';
}
.zookeeperDetails-appSummary>span:nth-child(3):after {
	content: '个';
}
.zookeeperDetails-appSummary>span:nth-child(4):BEFORE {
	content: '节点个数';
}
.zookeeperDetails-appSummary>span:nth-child(4):after {
	content: '个';
}


.zookeeperDetails-appSummary {
	display: flex;
	flex-wrap: wrap;
}

.zookeeperDetails-appSummary>span {
	width: calc((100% - 10px)/2);
	height: 105px;
	border-radius: 4px;
	background: #F1F0F5;
	text-align: center;
	font-size: 26px;
	padding: 20px 5px;
	box-sizing: border-box;
	line-height: 23px;
}
.zookeeperDetails-appSummary>span:nth-child(2n+1) {
    margin-right: 10px;
}
.zookeeperDetails-appSummary>span:nth-child(n+3) {
		margin-top: 10px;
	}
table.dataTable#spaceTable tbody tr td:nth-child(7) {
	display: flex;
	justify-content: space-between;
	position: relative;
	height: 26px;
	padding-top: 3px;
}

table.dataTable#spaceTable tbody tr td:nth-child(7)>span:nth-child(3) {
	position: absolute;
	left: 0;
	bottom: 4px;
	width: 100%;
	height: 2px;
	border-radius: 1px;
	background-color: #e5e5e5;
	background-image: linear-gradient(to right, red 0%, red 100%);
	background-size: 30px 2px;
	background-repeat: repeat;
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

<div id="baseContent" class="content" style="display: flex; height: 320px;">
	<section class="panel" style="flex: none;width:284px;margin-right: 20px;">
		<p class="title">基本信息 <a id="moreInfo" href="javascript:void(0);" class="pull-right more-info" >更多详情</a></p>
		<div class="content zookeeperDetails-queue">
			<span id="version">-</span>
			<span><span id="ip">-</span><span id="port">-</span></span>
		</div>
	</section>
	<!-- 应用汇总 -->
	<section class="panel" style="margin-right: 20px; flex: none; width: 390px;">
		<p class="title">应用汇总</p>
		<div class="content">
			<div class="zookeeperDetails-appSummary">
				<span id="role" label-flag="info">-</span>
				<span id="connections" label-flag="info">-</span>
				<span id="followers" label-flag="info">-</span>
				<span id="znodes" label-flag="info">-</span>
			</div>
		</div>
	</section>
	<!-- 事件统计 -->
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="zookeeperDetails-event">
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
	<div class="line" style="display: flex;">
		<section class="panel" style="width:calc((100% - 40px)/3);height:300px;margin-right: 20px">
			<p class="title">CPU使用率</p>
			<div class="content">
				<div id="eCPU" class="zookeeperDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
		<section class="panel" style="width:calc((100% - 40px)/3);height:300px;margin-right: 20px">
			<p class="title">内存使用率</p>
			<div class="content">
				<div id="eMemory" class="zookeeperDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
		<section class="panel" style="width:calc((100% - 40px)/3);height:300px">
			<p class="title">收包/发包数量</p>
			<div class="content">
				<div id="ePacket" class="zookeeperDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
	</div>
	<div class="line" style="display: flex;">
		<section class="panel" style="width:calc((100% - 40px)/3);height:300px;margin-right: 20px">
			<p class="title">watch path的连接数</p>
			<div class="content">
				<div id="eConnections" class="zookeeperDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
		<section class="panel" style="width:calc((100% - 40px)/3);height:300px;margin-right: 20px">
			<p class="title">watch的path数量</p>
			<div class="content">
				<div id="eWatch_path" class="zookeeperDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
		<section class="panel" style="width:calc((100% - 40px)/3);height:300px">
			<p class="title">watch数量</p>
			<div class="content">
				<div id="eWatch" class="zookeeperDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
	</div>
	<div class="line" style="display:flex;">
		<section class="panel" style="width:calc(100% -40px);height:300px;">
			<p class="title">连接信息</p>
			<div class="content">
				<table style="width: 100%; table-layout: fixed;margin-bottom: 45px;">
			<tbody>
				<tr>
					<td style="vertical-align:top;">
						<table id="connectTable" class="display dataTable table" style="table-layout: auto;">
							<thead>
								<tr>
									<th>序号</th>
									<th>连接IP</th>
									<th>连接端口</th>
									<th>等待数</th>
									<th>收包数</th>
									<th>发包数</th>
									<th>会话ID</th>
									<th>连接时间</th>
									<th>响应时间</th>
								</tr>
							</thead>
						<tbody></tbody>
						</table>
					</td>
					<td style="border:1px solid #E7EAEE;width:270px;vertical-align:top;">
						<div class="selected_SanJiao"></div>
						<table style="width: 100%;table-layout: auto;">
							<tbody>
								<tr>
									<td style="vertical-align: middle; text-align: center; height: 35px; width: 30%;">序号</td>
									<td style="vertical-align: middle; text-align: center; width: 50%;">节点路径</td>
								</tr>
							</tbody>
						</table>
						<div style="height: 260px; overflow-y: auto; overflow-x: hidden;">
							<table class="sessionPath" style="width: 100%;">
								<tbody id="path"></tbody>
							</table>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
				
			</div>
		</section>
	</div>
