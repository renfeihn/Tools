<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
/*基本信息*/
.redisDetails-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.redisDetails-queue>span:nth-child(1):before {
	content: 'Redis';
	height: 30px;
}

.redisDetails-queue>span:nth-child(1) {
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

.redisDetails-queue>span:nth-child(2) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.redisDetails-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.redisDetails-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
	width:80px;
}

.redisDetails-queue>span>span:nth-child(1):before {
	content: "节点IP地址 :";
}

.redisDetails-queue>span>span:nth-child(2):before {
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
.redisDetails-event {
	float: right;
	width: 180px;
	height: 220px;
}

.redisDetails-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.redisDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.redisDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.redisDetails-event>span:nth-child(2)>span:nth-child(3):BEFORE {
	content: '通知';
	display: block;
	font-size: 14px;
	color: #666;
}

.redisDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.redisDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.redisDetails-event>span:nth-child(2)>span:nth-child(3):AFTER {
	background-color: #22ac38;
}


.redisDetails-event>span>span:nth-child(1),
.redisDetails-event>span>span:nth-child(2){
	border-right:1px solid #AEADB3;
}

.redisDetails-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.redisDetails-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.redisDetails-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 6px;
	top: 7px;
}

.redisDetails-event>span>span {
	flex: auto;
	position: relative;
}

.redisDetails-event>span+span {
	margin-top: 10px;
}

.redisDetails-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.redisDetails-event>span {
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

.redisDetails-event>span:nth-child(2) {
	flex-direction: row;
/* 	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px; */
}
.line .dataTable{
	table-layout: fixed;
}

.redisDetails-echars {
	width: 100%;
	height: 220px;
}

.redisDetails-echars2 {
	width: 100%;
	height: 163px;
}

.redisDetails-appSummary>span:BEFORE{
	font-size: 14px;
    display: block;
    margin-bottom: 6px;
    color: #666;
}
.redisDetails-appSummary>span:nth-child(1):BEFORE {
	content: '角色';
}

.redisDetails-appSummary>span:nth-child(2):BEFORE {
	content: '请求键命中率';
}
.redisDetails-appSummary>span:nth-child(2):after {
	content: '%';
}
.redisDetails-appSummary>span:nth-child(3):BEFORE {
	content: '键个数';
}
.redisDetails-appSummary>span:nth-child(3):after {
	content: '个';
}
.redisDetails-appSummary>span:nth-child(4):BEFORE {
	content: '客户端连接数';
}
.redisDetails-appSummary>span:nth-child(4):after {
	content: '个';
}


.redisDetails-appSummary {
	display: flex;
	flex-wrap: wrap;
}

.redisDetails-appSummary>span {
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
.redisDetails-appSummary>span:nth-child(2n+1) {
    margin-right: 10px;
}
.redisDetails-appSummary>span:nth-child(n+3) {
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

.more-info-content>span:nth-child(n+1) {
	margin-right: 10px;
	padding-left: 10px;
}
</style>

<div id="baseContent" class="content" style="display: flex; height: 320px;">
	<section class="panel" style="flex: none;width:284px;margin-right: 20px;">
		<p class="title">基本信息 <!-- <a id="moreInfo" href="javascript:void(0);" class="pull-right more-info" >更多详情</a> --></p>
		<div class="content redisDetails-queue">
			<span id="version">-</span>
			<span><span id="ip">-</span><span id="port">-</span></span>
		</div>
	</section>
	<!-- 应用汇总 -->
	<section class="panel" style="margin-right: 20px; flex: none; width: 390px;">
		<p class="title">应用汇总</p>
		<div class="content">
			<div class="redisDetails-appSummary">
				<span id="mode" label-flag="info">-</span>
				<span id="keyhit" label-flag="info">-</span>
				<span id="keynum" label-flag="info">-</span>
				<span id="clientnum" label-flag="info">-</span>
			</div>
		</div>
	</section>
	<!-- 事件统计 -->
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="redisDetails-event">
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
	<div class="line" style="display: flex;">
		<section class="panel" style="width:calc((100% - 40px)/3);margin-right:20px;height:300px;">
			<p class="title">CPU耗时</p>
			<div class="content">
				<div id="eCPU" class="redisDetails-echars" style="width: calc(33vw - 105px);"></div>	
			</div>
		</section>
	
		<section class="panel" style="width:calc((100% - 40px)/3);margin-right:20px;height:300px;">
			<p class="title">内存使用率</p>
			<div class="content">
				<div id="eMemory" class="redisDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
	
		<section class="panel" style="width:calc((100% - 40px)/3);height:300px">
			<p class="title">客户端连接数</p>
			<div class="content">
				<div id="eClients" class="redisDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
</div>
	<div class="line" style="display: flex;">
		<section class="panel" style="width:calc((100% - 40px) /3);height:300px;margin-right:20px;;">
			<p class="title">请求键命中率</p>
			<div class="content">
				<div id="eKeyHit" class="redisDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
	
		<section class="panel" style="width:calc((100% - 40px) /3);height:300px;margin-right:20px;">
			<p class="title">键个数</p>
			<div class="content">
				<div id="eKeyCount" class="redisDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
	
		<section class="panel" style="width:calc((100% - 40px)/3);height:300px;">
			<p class="title">处理的命令数</p>
			<div class="content">
				<div id="eCommands" class="redisDetails-echars" style="width: calc(33vw - 105px);"></div>
			</div>
		</section>
	</div>	
	<div class="line" style="display:flex;">
		<section class="panel" style="width:100%;height:300px;">
			<p class="title">复制信息</p>
			<div class="content">
				<table id="copyTable" class="display dataTable table">
					<thead>
						<tr>
							<th>序号</th>
							<th>角色</th>
							<th>连接状态</th>
							<th>连接断开时间</th>
							<th>主库多少秒未发送数据到从库</th>
							<th>从库多少秒未向主库发送REPLCONF命令</th>
							<th>从库是否只读</th>
							<th>主库挂载的从库个数</th>
							<th>积压缓冲区状态</th>
							<th>积压缓冲大小</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</section>
	</div>
	
	<div class="line" style="display:flex;">			
		<section class="panel" style="width:100%;height:300px;">
			<p class="title">持久化</p>
			<div class="content">
				<table id="persistTable" class="display dataTable table">
					<thead>
						<tr>
							<th>序号</th>
							<th>载入持久化文件中</th>
							<th>创建RDB文件</th>
							<th>创建RDB文件结果</th>
							<th>最新RDB文件创建时间</th>
							<th>当前创建 RDB 文件消耗的秒数</th>
							<th>AOF 是否处打开状态</th>
							<th>是否正在创建 AOF 文件</th>
							<th>最近一次创建 AOF 文件的结果</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>	
			</div>
		</section>
		
</div>