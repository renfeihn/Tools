<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
	.mysqlDetails-echarts {
		height: 169px;
		width: calc(33vw - 100px);
		margin-bottom: 5px;
	}
	.mysqlDetails-layout2,.mysqlDetails-layout3,
	.mysqlDetails-layout4 {
		display: flex;
		height: 320px;
	} 
	.mysqlDetails-layout1 .dataTable,
	.mysqlDetails-layout2 .dataTable,
	.mysqlDetails-layout3 .dataTable,
	.mysqlDetails-layout4 .dataTable{
		table-layout: fixed;
	}
	/*基本信息*/
	.mysqlDetails-queue>span{
		display: flex;
		flex-direction: column;
    box-sizing: border-box;
    border-radius: 3px;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	}
	.mysqlDetails-queue>span:nth-child(1):before{
		content: 'mysql';
		height: 30px;
	}
	.mysqlDetails-queue>span:nth-child(1){
    width: 100%;
    color: #2B2933;
    height: 140px;
    line-height: 120px;
    margin-bottom: 10px;
    padding-left: 144px;
    font-size: 20px;
    font-weight: bolder;
   	background: #F1F0F5 url(img/baseMonitor/mysql.png) no-repeat 20px center; 
	}
	.mysqlDetails-queue>span:nth-child(2){
		width: 100%;
		height: calc(100% - 150px);
		display: flex;
		flex-direction: column;
		padding:15px 20px;
	  font-weight: normal;
	  background: #5B62FB;
	}
	.mysqlDetails-queue>span>span{
		white-space: nowrap;
	  overflow: hidden;
	  text-overflow: ellipsis;
	}
	.mysqlDetails-queue>span>span:before{
		display: inline-block;
		margin-right: 10px;
	}
	.mysqlDetails-queue>span>span:nth-child(1):before{
		content:"节点IP地址 :";
	}
	.mysqlDetails-queue>span>span:nth-child(2):before{
		content:"节点端口 :";
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
	.mysqlDetails-app {
		height: 225px;
		display: flex;
		flex-wrap: wrap;
	}
	.mysqlDetails-app>span:before {
		display: block;
		font-size: 14px;
		margin-top: 11px;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #72717D;
	}
	.mysqlDetails-app>span:nth-child(1):before {
		content: "QPS（每秒Query量）";
	}
	.mysqlDetails-app>span:nth-child(2):before {
		content: "TPS（每秒事务量）";
	}
	.mysqlDetails-app>span:nth-child(3):before {
		content: "Key Buffer 命中率";
	}
	.mysqlDetails-app>span:nth-child(4):before {
		content: "Query Cache 命中率";
	}
	.mysqlDetails-app>span:nth-child(3):after,
	.mysqlDetails-app>span:nth-child(4):after,
	.mysqlDetails-app>span:nth-child(6):after {
		content: "%";
	}
	.mysqlDetails-app>span:nth-child(5):before {
		content: "当前活动线程数";
	}
	.mysqlDetails-app>span:nth-child(6):before {
		content: "全表扫描比例";
	}
	.mysqlDetails-app>span {
		width: calc((100% - 10px)/2);
		height: 68px;
		background: #F1F0F5;
		border-radius: 2px;
		font-size: 20px;
		font-weight: 400;
		line-height: 22px;
		text-align: center;
	}
	.mysqlDetails-app>span:nth-child(2n+1) {
		margin-right: 10px;
	}
	.mysqlDetails-app>span:nth-child(n+3) {
		margin-top: 10px;
	}
	/*事件*/
	.mysqlDetails-event {
		float: right;
		width: 180px;
		height: 220px;
	}
	.mysqlDetails-event>span:nth-child(1):BEFORE {
		content: '未解决事件总数';
	}
	.mysqlDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
		content: '预警';
		display: block;
	  font-size: 14px;
	  color: #666;
	}
	.mysqlDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
		content: '告警';
		display: block;
	  font-size: 14px;
	  color: #666;
	}
	.mysqlDetails-event>span:nth-child(2)>span:nth-child(3):BEFORE {
		content: '通知';
		display: block;
	  font-size: 14px;
	  color: #666;
	}
	.mysqlDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
		background-color: #5b62f9;
	}
	.mysqlDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
		background-color: #fb8229;
	}
	.mysqlDetails-event>span:nth-child(2)>span:nth-child(3):AFTER {
		background-color: #22ac38;
	}
	.mysqlDetails-event>span:nth-child(3):BEFORE {
		content: '当日事件总数';
		color: #666;
	}
	.mysqlDetails-event>span:nth-child(1) {
		background-color: #5b62f9;
		color: #FFF;
		font-size: 36px;
		height: 70px;
	}
	.mysqlDetails-event>span>span:AFTER {
		content: '';
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
	  left: 6px;
	  top: 7px;
	}
	.mysqlDetails-event>span>span {
		flex: auto;
		position: relative;
	}
	.mysqlDetails-event>span+span {
		margin-top: 10px;
	}
	.mysqlDetails-event>span:BEFORE {
		display: block;
		margin-bottom: 6px;
		font-size: 14px;
	}
	.mysqlDetails-event>span {
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
	.mysqlDetails-event>span:nth-child(2) {
		flex-direction: row;
/* 		background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%) no-repeat center center;
		background-size: 1px 50px;  */
	}
	.mysqlDetails-port,.mysqlDetails-sqlnum,.mysqlDetails-dbHit {
		display: flex;
		height: 45px;
	}
	.mysqlDetails-port>span,
	.mysqlDetails-sqlnum>span,
	.mysqlDetails-dbHit>span {
		width: calc((100% - 30px)/4);
		background: #5B62F9;
		color: #fff;
		border-radius: 3px;
		text-align: center;
		line-height: 18px;
		box-sizing: border-box;
	}
	.mysqlDetails-port>span:nth-child(n+2),
	.mysqlDetails-sqlnum>span:nth-child(n+2),
	.mysqlDetails-dbHit>span:nth-child(n+2) {
		width: calc((100% - 30px)/4);
		background: #F1F0F5;
		color: #000;
		margin-left: 10px;
	}
	.mysqlDetails-port>span:before,
	.mysqlDetails-sqlnum>span:before,
	.mysqlDetails-dbHit>span:before {
		display: block;
		margin-top: 4px;
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.mysqlDetails-port>span:nth-child(1):before {
		content: "端口状态";
		color: #FBFFFE;
	}
	.mysqlDetails-port>span:nth-child(2):before {
		content: "ESTABLISHED";
		color: #5B5964;
	}
	.mysqlDetails-port>span:nth-child(3):before {
		content: "CLOSE_WAIT";
		color: #5B5964;
	}
	.mysqlDetails-port>span:nth-child(4):before {
		content: "TIME_WAIT";
		color: #5B5964;
	}
	.mysqlDetails-sqlnum>span:nth-child(1):before {
		content: "SELECT次数";
		color: #FBFFFE;
	}
	.mysqlDetails-sqlnum>span:nth-child(2):before {
		content: "UPDATE次数";
		color: #5B5964;
	}
	.mysqlDetails-sqlnum>span:nth-child(3):before {
		content: "INSERT次数";
		color: #5B5964;
	}
	.mysqlDetails-sqlnum>span:nth-child(4):before {
		content: "DELETE次数";
		color: #5B5964;
	}
	.mysqlDetails-dbHit>span:nth-child(1):before {
		content: "KEY BUFFER";
		color: #FBFFFE;
	}
	.mysqlDetails-dbHit>span:nth-child(2):before {
		content: "INNODB BUFFER";
		color: #5B5964;
	}
	.mysqlDetails-dbHit>span:nth-child(3):before {
		content: "QUERY CACHE";
		color: #5B5964;
	}
	.mysqlDetails-dbHit>span:nth-child(4):before {
		content: "THREAD CACHE";
		color: #5B5964;
	}
	.mysqlDetails-process,.mysqlDetails-dbProperty,.mysqlDetails-cursor {
		height: 45px;
		display: flex;
	}
	.mysqlDetails-process>span,.mysqlDetails-cursor>span {
		box-sizing: border-box;
		width: calc((100% - 20px)/3);
		background: #5C61F9;
		border-radius: 3px;
		padding:0 2%;
		line-height: 45px;
		font-size: 14px;
		color: #fff;
		text-align: right;
		display: flex;
		justify-content: space-between;
	}
	.mysqlDetails-process>span:nth-child(n+2),
	.mysqlDetails-dbProperty>span:nth-child(n+2),
	.mysqlDetails-cursor>span:nth-child(n+2) {
		background: #F1F0F5;
		margin-left: 10px;
		color: #000;
	}
	.mysqlDetails-process>span:before,
	.mysqlDetails-dbProperty>span:before,
	.mysqlDetails-cursor>span:before {
		display: inline-block;
		font-size: 12px;
		color: #5C5A67;
	}
	.mysqlDetails-process>span:nth-child(1):before {
		content: "当前进程总数";
		color: #fff;
	}
	.mysqlDetails-process>span:nth-child(2):before {
		content: "CPU";
	}
	.mysqlDetails-process>span:nth-child(3):before {
		content: "内存";
	}
	.mysqlDetails-currLinks>span:nth-child(1):before {
		content: "当前总线程数";
		color: #fff;
	}
	.mysqlDetails-currLinks>span:nth-child(2):before {
		content: "活动线程数";
	}
	.mysqlDetails-dbProperty>span:nth-child(1):before {
		content: "QPS";
		color: #fff;
	}
	.mysqlDetails-dbProperty>span:nth-child(2):before {
		content: "TPS";
	}
	.mysqlDetails-cursor>span:nth-child(1):before {
		content: "临时表";
		color: #fff;
	}
	.mysqlDetails-cursor>span:nth-child(2):before {
		content: "临时文件";
	}
	.mysqlDetails-cursor>span:nth-child(3):before {
		content: "磁盘上临时表";
	}
	.mysqlDetails-flow,.mysqlDetails-binlog,
	.mysqlDetails-logwait,.mysqlDetails-currLinks {
		display: flex;
		height: 45px;
	}
	.mysqlDetails-dbProperty>span,
	.mysqlDetails-flow>span,
	.mysqlDetails-binlog>span,
	.mysqlDetails-logwait>span,
	.mysqlDetails-currLinks>span {
		display: flex;
		width: calc((100% - 10px)/2);
		justify-content: space-between;
		border-radius: 3px;
		line-height: 45px;
		font-size: 14px;
		padding: 0 5%;
		box-sizing: border-box;
		color: #000;
	}
	.mysqlDetails-binlog>span,
	.mysqlDetails-logwait>span {
		padding: 0 2%;
	}
	.mysqlDetails-flow>span:nth-child(1):before,
	.mysqlDetails-binlog>span:nth-child(1):before,
	.mysqlDetails-logwait>span:nth-child(1):before,
	.mysqlDetails-currLinks>span:nth-child(1):before {
		font-size: 12px;
		color: #fff;
	}
	.mysqlDetails-flow>span:nth-child(1):before {
		content: "读字节";
	}
	.mysqlDetails-flow>span:nth-child(2):before {
		content: "写字节";
		color: #76757D;
	}
	.mysqlDetails-binlog>span:nth-child(1):before {
		content: "BINLOG_CACHE_DISK_USE";
	}
	.mysqlDetails-currLinks>span:nth-child(2):before {
		color: #76757D;
	}
	.mysqlDetails-binlog>span:nth-child(2):before {
		content: "BINLOG_CACHE_USE";
		color: #76757D;
	}
	.mysqlDetails-logwait>span:nth-child(2):before {
		color: #76757D;
	}
	.mysqlDetails-dbProperty>span:nth-child(1),
	.mysqlDetails-flow>span:nth-child(1),
	.mysqlDetails-binlog>span:nth-child(1),
	.mysqlDetails-logwait>span:nth-child(1),
	.mysqlDetails-currLinks>span:nth-child(1) {
		background: #5B62F9;
		margin-right: 10px;
		color: #fff;
	}
	.mysqlDetails-flow>span:nth-child(2),
	.mysqlDetails-binlog>span:nth-child(2),
	.mysqlDetails-logwait>span:nth-child(2),
	.mysqlDetails-currLinks>span:nth-child(2) {
		background: #F1F0F5;
	}
	.mysqlDetails-event>span:nth-child(1),
	.mysqlDetails-event>span:nth-child(2),
	.mysqlDetails-event>span:nth-child(3){
		cursor: pointer;
	}
	.mysqlDetails-event>span>span:nth-child(1),
	.mysqlDetails-event>span>span:nth-child(2){
		border-right:1px solid #AEADB3;
	}
</style>

<div class="mysqlDetails-layout1" style="height: 320px;display: flex;">
	<section class="panel" style="flex: none;width:284px;margin-right: 20px;">
		<p class="title">基本信息 <a id="moreInfo" href="javascript:void(0);" class="pull-right more-info" >更多详情</a></p>
		<div class="content mysqlDetails-queue">
			<span id="version">-</span>
			<span><span id="ip">-</span><span id="port">-</span></span>
		</div>
	</section>
	<section class="panel" style="width: 390px;margin-right: 20px;">
		<p class="title">应用汇总</p>
		<div class="content">
			<div class="mysqlDetails-app">
				<span id="qps">-</span><span id="tps">-</span>
				<span id="keyBufferRate">-</span><span id="queryCacheRate">-</span>
				<span id="curActThreadCount">-</span><span id="allTableScanRate">-</span>
			</div>
		</div>
	</section>
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="mysqlDetails-event">
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
	<li class="active"><a href="#tabs1" data-toggle="tab">实例信息</a></li>
	<li><a href="#tabs2" data-toggle="tab">应用运行</a></li>
</ul>
<div class="tab-content" >
	<div id="tabs1" class="tab-pane active" style="padding: 0;">
		<div class="mysqlDetails-layout2" style="margin-top: 20px;">
			<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px;">
				<p class="title">端口</p>
				<div class="content">
					<div class="mysqlDetails-echarts" id="ePort"></div>
					<div class="mysqlDetails-port">
						<span id="portStatus">-</span><span id="pEstablished">-</span>
						<span id="pClose">-</span><span id="pTime">-</span>
					</div>
				</div>
			</section>
			<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px;">
				<ul class="nav nav-tabs nav-public" id="Cpu_Mem">
					<li class="active"><a href="#tabsCPU" data-toggle="tab">cpu使用率</a></li>
					<li><a href="#tabsMEM" data-toggle="tab">内存使用率</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabsCPU" class="tab-pane active">
						<div class="mysqlDetails-echarts" id="eCPUUsed"
							style="width: calc(33vw - 105px); height: 200px;"></div>
					</div>
					<div id="tabsMEM" class="tab-pane">
						<div class="mysqlDetails-echarts" id="eMemoryUsed"
							style="width: calc(33vw - 105px); height: 200px;"></div>
					</div>
				</div>
			</section>
			<section class="panel" style="width: calc((100% - 40px)/3);">
				<p class="title">当前连接数</p>
				<div class="content">
					<div class="mysqlDetails-echarts" id="eCurrLinks"></div>
					<div class="mysqlDetails-currLinks">
						<span id="curThreads">-</span>
						<span id="freeLinks">-</span>
						<!-- <span id="curLinks">-</span> -->
					</div>
				</div>
			</section>
		</div>
		<div class="mysqlDetails-layout3">
			<section class="panel" style="flex: none;width: calc((100% - 40px)/3);margin-right: 20px;">
				<ul class="nav nav-tabs nav-public" id="lockUl">
					<li class="active"><a href="#tabsi1" data-toggle="tab">锁时间</a></li>
					<li><a href="#tabsi2" data-toggle="tab">锁等待数量</a></li>
					<li><a href="#tabsi3" data-toggle="tab">锁信息</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabsi1" class="tab-pane active">
						<div class="mysqlDetails-echarts" id="eLockTime" style="height: 220px;width: calc(33vw - 100px);"></div>
					</div>
					<div id="tabsi2" class="tab-pane">
						<div class="mysqlDetails-echarts" id="eLockWaits" style="height: 220px;width: calc(33vw - 100px);"></div>
					</div>
					<div id="tabsi3" class="tab-pane">
						<table id="lockInfoTable" class="display dataTable table">
							<thead>
								<tr>
									<th>序号</th>
									<th>锁类型</th>
									<th>值</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
			</section>
			<section class="panel" style="flex: auto;">
				<p class="title">用户权限信息</p>
				<div class="content">
					<table id="userTable" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>用户</th>
								<th>select限制</th>
								<th>insert权限</th>
								<th>update权限</th>
								<th>delete权限</th>
								<th>create权限</th>
								<th>drop权限</th>
								<th>index权限</th>
								<th>alter权限</th>
								<th>replslave权限</th>
								<th>replclient权限</th>
								<th>createview权限</th>
								<th>showview权限</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
		</div>
	</div>
		<!-- <div class="mysqlDetails-layout4"> 
		<section class="panel">
			<ul class="nav nav-tabs nav-public">
				<li class="active"><a href="#tabsi4" data-toggle="tab" >用户权限信息1</a></li>
				<li><a href="#tabsi5" data-toggle="tab">用户权限信息2</a></li>
			</ul>
			<div class="tab-content">
				<div id="tabsi4" class="tab-pane active">
					<table id="user1" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>用户</th>
								<th>登陆限制</th>
								<th>查询权限</th>
								<th>插入权限</th>
								<th>更新权限</th>
								<th>删除权限</th>
								<th>建表权限</th>
								<th>删表权限</th>
								<th>Reload_priv</th>
								<th>Shutdown_priv</th>
								<th>Process_priv</th>
								<th>File_priv</th>
								<th>Grant_priv</th>
								<th>References_priv</th>
								<th>Index_priv</th>
								<th>Alert_priv</th>
								<th>Show_db_priv</th>
								<th>Super_priv</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
				<div id="tabsi5" class="tab-pane">
					<table id="user2" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>user</th>
								<th>Create_tmp_table_priv</th>
								<th>Lock_tables_priv</th>
								<th>Execute_priv</th>
								<th>Repl_slave_priv</th>
								<th>Repl_client_priv</th>
								<th>Create_view_priv</th>
								<th>Show_view_priv</th>
								<th>Create_routine_priv</th>
								<th>Alter_routine_priv</th>
								<th>Create_user_priv</th>
								<th>ssl_type</th>
								<th>ssl_cipher</th>
								<th>x509_issuer</th>
								<th>x509_subject</th>
								<th>max_questions</th>
								<th>max_updates</th>
								<th>max_connections</th>
								<th>max_user_connections</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div> 
			</div>
		</section>
		</div>-->
	<div id="tabs2" class="tab-pane" style="padding: 0;">
		<div class="mysqlDetails-layout2" style="margin-top: 20px;">
			<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px;">
				<p class="title">数据库性能信息</p>
				<div class="content">
					<div class="mysqlDetails-echarts" id="edbProperty"></div>
					<div class="mysqlDetails-dbProperty">
						<span id="dbQPS">-</span>
						<span id="dbTPS">-</span>
					</div>
				</div>
			</section>
			<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px;">
				<p class="title">流量</p>
				<div class="content">
					<div class="mysqlDetails-echarts" id="eFlow"></div>
					<div class="mysqlDetails-flow">
						<span id="read">-</span>
						<span id="write">-</span>
					</div>
				</div>
			</section>
			<section class="panel" style="width: calc((100% - 40px)/3);">
				<p class="title">SQL次数</p>
				<div class="content">
					<div class="mysqlDetails-echarts" id="eSQLNum"></div>
					<div class="mysqlDetails-sqlnum">
						<span id="selects">-</span>
						<span id="updates">-</span>
						<span id="inserts">-</span>
						<span id="deletes">-</span>
					</div>
				</div>
			</section>
		</div>
		<div class="mysqlDetails-layout3">
			<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px;">
				<p class="title">数据库命中率</p>
				<div class="content">
					<div class="mysqlDetails-echarts" id="edbHit"></div>
					<div class="mysqlDetails-dbHit">
						<span id="keyBuffer">-</span>
						<span id="innodbBuffer">-</span>
						<span id="queryCache">-</span>
						<span id="threadCache">-</span>
					</div>
				</div>
			</section>
			<section class="panel" style="width: calc((100% - 40px)/3);margin-right: 20px;">
				<p class="title">临时表</p>
				<div class="content">
					<div class="mysqlDetails-echarts" id="eCursor"></div>
					<div class="mysqlDetails-cursor">
						<span id="temTable">-</span>
						<span id="temFile">-</span>
						<span id="temDisk">-</span>
					</div>
				</div>
			</section>
			<section class="panel" style="width: calc((100% - 40px)/3);">
				<ul class="nav nav-tabs nav-public" id="binlogUl">
					<li class="active"><a href="#tabsa1" data-toggle="tab">Binlog Cache 使用状况</a></li>
					<li><a href="#tabsa2" data-toggle="tab">日志等待次数</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabsa1" class="tab-pane active">
						<div class="mysqlDetails-echarts" id="eBinlog"></div>
						<div class="mysqlDetails-binlog">
							<span id="binlogDisk">-</span>
							<span id="binlog">-</span>
						</div>
					</div>
					<div id="tabsa2" class="tab-pane">
						<div class="mysqlDetails-echarts" id="eLogWait" style="height: 220px;"></div>
					</div>
				</div>
			</section>
		</div>
		<div class="mysqlDetails-layout4">
			<section class="panel" style="flex: none;width: calc((100% - 40px)/3);margin-right: 20px;">
				<ul id="databaseUl" class="nav nav-tabs nav-public" id="binlogUl">
					<li class="active"><a href="#tabs41" data-toggle="tab">数据库的大小TOP5</a></li>
					<li><a href="#tabs42" data-toggle="tab">表大小TOP5</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabs41" class="tab-pane active">
						<table id="database" class="display dataTable table">
							<thead>
								<tr>
									<th>序号</th>
									<th>数据库名</th>
									<th>大小(MB)</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div id="tabs42" class="tab-pane">
						<table id="database_table" class="display dataTable table">
							<thead>
								<tr>
									<th>序号</th>
									<th>所属数据库</th>
									<th>表名</th>
									<th>大小(MB)</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
			</section>
			<section class="panel" style="flex: auto;">
				<p class="title">会话明细</p>
				<div class="content">
					<table id="converTable" class="display dataTable table">
						<thead>
							<tr>
								<th>序号</th>
								<th>线程id</th>
								<th>用户</th>
								<th>主机</th>
								<th>数据库名</th>
								<th>命令类型</th>
								<th>耗时（ms）</th>
								<th>状态</th>
								<th>执行命令</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
		</div>
	</div>
</div>