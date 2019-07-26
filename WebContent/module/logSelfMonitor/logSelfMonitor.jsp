<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.logSelfMonitor-allInfoWrap{
	display: flex;
    height: 310px;
    margin-bottom: 20px;
}
.logSelfMonitor-allInfoWrap>section{
	flex: 1;
	height: 100%;
}

.logSelfMonitor-appInfoWrap{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-right: 20px;
}

.logSelfMonitor-appInfoWrap span[data-title="实例数量"]{
	cursor: pointer;
}
.logSelfMonitor-appInfoWrap>div{
	width: calc((100% - 30px)/3);
	height: calc((100% - 15px)/2);
	padding: 0 15px;
	background-color: #F1F0F5;
	box-sizing: border-box;
}
.logSelfMonitor-appInfoWrap>div:nth-child(n+4){
	margin-top: 15px;
}
.logSelfMonitor-appInfoWrap>div>p{
	font-size: 14px;
	border-bottom:1px solid #DADAE1;
	height: 40px;
	line-height: 40px;
	position: relative;
}
.logSelfMonitor-appInfoWrap span.squareBtn{
	width: 8px;
	height: 8px;
	display: inline-block;
	background-color: #CECED6;
	transform: rotate(45deg);
	position: absolute;
	cursor: pointer;
	top: 16px;
}
.logSelfMonitor-appInfoWrap span.squareBtn:nth-child(1){
	right: 15px;
}
.logSelfMonitor-appInfoWrap span.squareBtn:nth-child(2){
	right: 0;
}
.logSelfMonitor-appInfoWrap span.squareBtn.active{
	background-color: var(--color-theme);
}
.logSelfMonitor-appInfoWrap>div>div{
    display: none;
    padding: 15px 0 0 65px;
    background-size: 50px 50px;
    background-repeat: no-repeat;
    height: calc(100% - 50px);
    background-position: left 16px;
}
.logSelfMonitor-appInfoWrap>div>div:nth-child(2){
	display: block;
}
.logSelfMonitor-appInfoWrap>div>div>span{
   	height: 25px;
    display: block;
    line-height: 25px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;	
}
.logSelfMonitor-appInfoWrap>div:first-child{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.logSelfMonitor-appInfoWrap>div:first-child span{
	text-align: left;
	font-size: 20px;
    padding: 15px 0 0 65px;
	height: calc((100% - 15px)/2);
	background-size: 50px 50px;
	background-repeat: no-repeat;
	background-position: left center;
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.logSelfMonitor-appInfoWrap>div:first-child span:before{
	content: attr(data-title);
	display: block;
}
.logSelfMonitor-appInfoWrap>div:first-child span:after{
	content: attr(data-unit)
	font-size: 12px;
}
.logSelfMonitor-appInfoWrap div>span:before{
	content: attr(data-title);
	font-size: 14px;
	color: #5C5A66;
	margin-right: 5px;
}
.logSelfMonitor-appInfoWrap .logSpeed{
	background-image: url(img/logSelfMonitor/logSpeed.png);
}
.logSelfMonitor-appInfoWrap .collectTotal{
	background-image: url(img/logSelfMonitor/collectTotal.png);
}
.logSelfMonitor-appInfoWrap .afa{
	background-image: url(img/logSelfMonitor/afa.png);
}
.logSelfMonitor-appInfoWrap .kafak{
	background-image: url(img/logSelfMonitor/kafak.png);
}
.logSelfMonitor-appInfoWrap .storm{
	background-image: url(img/logSelfMonitor/storm.png);
}
.logSelfMonitor-appInfoWrap .elast{
	background-image: url(img/logSelfMonitor/elast.png);
}
.logSelfMonitor-appInfoWrap .zook{
	background-image: url(img/logSelfMonitor/zook.png);
}


/*拓扑图样式*/
.logSelfMonitor-logTopu{
	display: flex;
    width: 1240px;
    margin: auto;
	height: 100%;
	margin-top: 50px;
}
.logSelfMonitor-logTopu>div{
	position: relative;
	background-repeat: no-repeat;
}
.logSelfMonitor-logTopu>div:nth-child(1){
	width: 480px;
	height: 380px;
	border: 1px dashed #A6A7BE;
    margin-bottom: 40px;
}
.logSelfMonitor-logTopu>div:nth-child(1):after{
	content:'日志接入';
	display: block;
	width: 100%;
	height: 30px;
	line-height: 30px;
	font-size: 14px;
	text-align: center;
	position: absolute;
	bottom: -30px;
}
.logSelfMonitor-logTopu>div:nth-child(1):before{
	content: '';
	width: 1px;
	height: 250px;
    background: linear-gradient(to bottom,#A6A7BE 0px,#A6A7BE 3px,#fff 3px ,#fff 5px);
    background-size: 1px 5px;
    display: inline-block;
    background-repeat: repeat-y;
    position: absolute;
    left: 460px;
    top: 65px;
}
.logSelfMonitor-logTopu span{
	width: 90px;
	height: 100px;
	display: block;
	position: absolute;
	background-repeat: no-repeat;
	background-size: 90px 100px;
}
.logSelfMonitor-logRealConnect{
	flex: auto;
}
.logSelfMonitor-logRealConnect>span{
	cursor: pointer;
}

.logSelfMonitor-logTopu span.lineAll:after{
    content: '';
    height: 10px;
    line-height: 10px;
    background: linear-gradient(to right,#A6A7BE 0px,#A6A7BE 3px,#fff 3px ,#fff 5px),linear-gradient(45deg,#fff 0px,#fff 3px,#A6A7BE 3px, #a6a7be, #a6a7be 4px, #fff 4px, #fff 5px),linear-gradient(-45deg,#fff 0px,#fff 3px,#A6A7BE 3px, #a6a7be, #a6a7be 4px, #fff 4px, #fff 5px);
    background-size: 5px 1px,5px 5px, 5px 5px;
    display: inline-block;
    background-repeat: repeat-x,no-repeat,no-repeat;
    background-position: left center,right top,right bottom;
    position: absolute;
    left: 100%;
    top: 50%;
    animation: runToRight 4s linear infinite;
}
.logSelfMonitor-logTopu span.line:after{
    width: 65px;
}
.logSelfMonitor-logTopu span.line4:after{
    width: 265px;
    left: -265px;

}
.logSelfMonitor-logTopu span.line1:after{
	background: linear-gradient(to right,#A6A7BE 0px,#A6A7BE 3px,#fff 3px ,#fff 5px);
	background-size: 5px 1px;
	background-repeat: repeat-x;
    background-position: left center;
    width: 30px;
}
.logSelfMonitor-logTopu span.line2:after{
	background: linear-gradient(to right,#A6A7BE 0px,#A6A7BE 3px,#fff 3px ,#fff 5px);
	background-size: 5px 1px;
	background-repeat: repeat-x;
    background-position: left center;
    width: 185px;
}
.logSelfMonitor-logTopu span.line3:before{
    width: 110px;
    content: '';
    height: 10px;
    line-height: 10px;
    background: linear-gradient(to right,#A6A7BE 0px,#A6A7BE 3px,#fff 3px ,#fff 5px),linear-gradient(45deg,#fff 0px,#fff 3px,#A6A7BE 3px, #a6a7be, #a6a7be 4px, #fff 4px, #fff 5px),linear-gradient(-45deg,#fff 0px,#fff 3px,#A6A7BE 3px, #a6a7be, #a6a7be 4px, #fff 4px, #fff 5px);
    background-size: 5px 1px,5px 5px, 5px 5px;
    display: inline-block;
    background-repeat: repeat-x,no-repeat,no-repeat;
    background-position: left center,right top,right bottom;
    position: absolute;
    left: 90px;
    top: 50%;
    animation: runToRight 4s linear infinite;
}
@keyframes runToRight{
	0% {
    	background-position: 0% center,right top,right bottom;
	}
	100% {	
    	background-position: 100% center,right top,right bottom;
	}
}
@keyframes runToBottom{
	0% {
    	background-position: center 0%;
	}
	100% {
    	background-position: center 100%;
	}
}

.logSelfMonitor-logTopu span.lineColumn:before{
    content: '';
    width: 1px;
    height: 72px;
    background: linear-gradient(to top,#A6A7BE 0px,#A6A7BE 3px,#fff 3px ,#fff 5px);
    background-size: 1px 5px;
    background-repeat: repeat-y;
    background-position: center bottom;
    position: absolute;
    left: 50%;
    top: -70px;
    animation: runToBottom 4s linear infinite;
}
.logSelfMonitor-logTopu span.textLog{
	background-image: url(img/logSelfMonitor/logText.png);
}
.logSelfMonitor-logTopu span.agent{
	background-image: url(img/logSelfMonitor/agent.png);
}
.logSelfMonitor-logTopu span.appSys{
	background-image: url(img/logSelfMonitor/appSys.png);
}
.logSelfMonitor-logTopu span.sysClient{
	background-image: url(img/logSelfMonitor/sysClient.png);
}
.logSelfMonitor-logTopu span.afaSyslog{
	background-image: url(img/logSelfMonitor/afaSysLog.png);
}
.logSelfMonitor-logTopu span.application{
	background-image: url(img/logSelfMonitor/application.png);
}
.logSelfMonitor-logTopu span.log4JClient{
	background-image: url(img/logSelfMonitor/log4jClient.png);
}
.logSelfMonitor-logTopu span.appender{
	background-image: url(img/logSelfMonitor/appender.png);
}
.logSelfMonitor-logTopu span.zookeeper{
	background-image: url(img/logSelfMonitor/zookeeper.png);
}
.logSelfMonitor-logTopu span.zookeeper.red{
	background-image: url(img/logSelfMonitor/zookeeperRed.png);
}
.logSelfMonitor-logTopu span.zookeeper.yellow{
	background-image: url(img/logSelfMonitor/zookeeperYellow.png);
}
.logSelfMonitor-logTopu span.kafka{
	background-image: url(img/logSelfMonitor/kafka.png);
}
.logSelfMonitor-logTopu span.kafka.red{
	background-image: url(img/logSelfMonitor/kafkaRed.png);
}
.logSelfMonitor-logTopu span.kafka.yellow{
	background-image: url(img/logSelfMonitor/kafkaYellow.png);
}
.logSelfMonitor-logTopu span.storm2{
	background-image: url(img/logSelfMonitor/storm2.png);
}
.logSelfMonitor-logTopu span.storm.red{
	background-image: url(img/logSelfMonitor/stormRed.png);
}
.logSelfMonitor-logTopu span.storm.yellow{
	background-image: url(img/logSelfMonitor/stormYellow.png);
}
.logSelfMonitor-logTopu span.elasticSearch{
	background-image: url(img/logSelfMonitor/elasticSearch.png);
}
.logSelfMonitor-logTopu span.elasticSearch.red{
	background-image: url(img/logSelfMonitor/elasticSearchRed.png);
}
.logSelfMonitor-logTopu span.elasticSearch.yellow{
	background-image: url(img/logSelfMonitor/elasticSearchYellow.png);
}
.logSelfMonitor-logTopu span.afaServe{
	background-image: url(img/logSelfMonitor/afaServe.png);
}
.logSelfMonitor-logTopu span.afaServe.red{
	background-image: url(img/logSelfMonitor/afaServeRed.png);
}
.logSelfMonitor-logTopu span.afaServe.yellow{
	background-image: url(img/logSelfMonitor/afaServeYellow.png);
}
.logSelfMonitor-logTopu span.aweb{
	background-image: url(img/logSelfMonitor/aweb.png);
}
.logSelfMonitor-logTopu span.aweb.red{
	background-image: url(img/logSelfMonitor/awebRed.png);
}
.logSelfMonitor-logTopu span.aweb.yellow{
	background-image: url(img/logSelfMonitor/awebYellow.png);
}
.logSelfMonitor-logTopu span.grayLeft1{
	left: 30px;
}
.logSelfMonitor-logTopu span.grayLeft2{
	left: 185px;
}
.logSelfMonitor-logTopu span.grayLeft3{
	left: 340px;
}
.logSelfMonitor-logTopu span.realLeft1{
	left: 15px;
}
.logSelfMonitor-logTopu span.realLeft2{
	left: 170px;
}
.logSelfMonitor-logTopu span.realLeft3{
	left: 325px;
}
.logSelfMonitor-logTopu span.realLeft4{
	left: 480px;
}
.logSelfMonitor-logTopu span.realLeft5{
	left: 635px;
}
.logSelfMonitor-logTopu span.grayTop1{
	top: 10px;
}
.logSelfMonitor-logTopu span.grayTop2{
	top: 135px;
}
.logSelfMonitor-logTopu span.grayTop3{
	top: 260px;
}

.logSelfMonitor-event {
	float: right;
	width: 180px;
	height: 220px;
}

.logSelfMonitor-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.logSelfMonitor-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
}

.logSelfMonitor-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
}

.logSelfMonitor-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.logSelfMonitor-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.logSelfMonitor-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
}

.logSelfMonitor-event>span:nth-child(1) {
	background-color: var(--color-theme);
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.logSelfMonitor-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 22px;
	top: 7px;
}

.logSelfMonitor-event>span>span {
	flex: auto;
	position: relative;
}

.logSelfMonitor-event>span+span {
	margin-top: 10px;
}

.logSelfMonitor-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.logSelfMonitor-event>span {
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

.logSelfMonitor-event>span:nth-child(2) {
	flex-direction: row;
	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
	no-repeat center center;
	background-size: 1px 50px;
}
.logSelfMonitor-table span.event-type{
	display: inline-block;
	border-radius: 10px;
	width: 50px;
	height: 20px;
	color: #FFF;
	text-align: center;
}
.logSelfMonitor-table span.event-type.notice:BEFORE{
	content:'通知';
}
.logSelfMonitor-table span.event-type.warning:BEFORE{
	content:'预警';
}
.logSelfMonitor-table span.event-type.error:BEFORE{
	content:'告警';
}
.logSelfMonitor-table span.event-type.notice{
	background: #22ac38;
}
.logSelfMonitor-table span.event-type.warning{
	background: #fb8229;
}
.logSelfMonitor-table span.event-type.error{
	background: #FF3341;
}
.logSelfMonitor-table span.lookpath {
	color: var(--color-theme);
	cursor: pointer;
}
.logSelfMonitor-table span.lookpath:BEFORE {
	content: '查看详情';
}
.logSelfMonitor-table{
	position: relative;
}
.logSelfMonitor-table .jumpPage{
	position: absolute;
    bottom: 15px;
}
.logSelfMonitor-table .jumpPage>input {
	width: 38px;
    margin: 0 4px;
}
</style> 
<section class="panel" style="margin: 0;height: calc(100vh - 42px);overflow-y: auto;">
	<ul class="nav nav-tabs nav-public">
		<li class="active"><a href="#tabs1" data-toggle="tab">日志平台自监控</a></li>
		<li><a href="#tabs2" data-toggle="tab">自监控的拓扑图</a></li>
	</ul>
	<div class="tab-content" style="height: calc(100% - 40px);">
		<div id="tabs1" class="tab-pane active">
			<div class="logSelfMonitor-allInfoWrap">
				<section class="logSelfMonitor-appInfoWrap">
					<div>
						<span data-title="日志接入速率" data-unit="kbps/s" class="logSpeed" id="currentLogDataIps">0.00</span>
						<span data-title="日志采集总量" data-unit="GB" class="collectTotal" id="logDataToTalSize">0</span>
					</div>
					<div style="pointer-events: none;">
						<p>AFA运行平台</p>
						<div class="afa">
							<span class="skipPage" data-title="实例数量">3</span>
							<span data-title="集群状态">正常</span>
						</div>
					</div>
					<div id="kafka-cateId">
						<p>KAFKA<span class="squareBtn active"></span><span class="squareBtn"></span></p>
						<div class="kafak">
							<span class="skipPage" data-title="实例数量" id='kafka-count'>-</span>
							<span data-title="集群状态">正常</span>
						</div>
						<div class="kafak">
							<span data-title="流入速度" id="kafka-bytesin">-</span>
							<span data-title="流出速度" id="kafka-bytesout">-</span>
						</div>
					</div>
					<div id="storm-cateId">
						<p>STORM</p>
						<div class="storm">
							<span class="skipPage" data-title="实例数量" id="storm-count">-</span>
							<span data-title="集群状态">正常</span>
						</div>
					</div>
					<div id="es-cateId">
						<p>ELASTICSEARCH<span class="squareBtn active"></span><span class="squareBtn"></span></p>
						<div class="elast">
							<span class="skipPage" data-title="实例数量" id="es-count">-</span>
							<span data-title="集群状态" id="es-clusterStatus">正常</span>
						</div>
						<div class="elast">
							<span data-title="文档数" id="es-esNodes">-</span>
							<span data-title="分片数" id="es-esShards">-</span>
						</div>
					</div>
					<div id="zk-cateId">
						<p>ZOOKEEPER</p>
						<div class="zook">
							<span class="skipPage" data-title="实例数量" id="zk-count">-</span>
							<span data-title="集群状态">正常</span>
						</div>
					</div>
				</section>
				<section class="panel" style="margin:0;">
					<p class="title">事件总览</p>
					<div class="content">
						<div class="logSelfMonitor-event">
							<span id="alarmWaringCount">-</span>
							<span>
								<span id="warningCount">-</span>
								<span id="alarmCount">-</span>
							</span>
							<span id="todayEvent">-</span>
						</div>
						<div style="margin-right: 200px;height: 220px;" id="eEvent"></div>
					</div>
				</section>
			</div>
			<section class="panel">
				<p class="title">事件列表</p>
				<div class="content logSelfMonitor-table" id="test">
					<!-- 数据表格Start -->
					<table id="dataTable" class="display dataTable table" style="table-layout: fixed;">
						<thead>
							<tr>
								<th width="6%">序号</th>
								<th width="6%">事件类型</th>
								<th width="6%">事件来源</th>
								<th width="9%">应用名称</th>
								<!-- <th width="6%">对象类型</th>
								<th width="10">对象ID</th> -->
								<th width="8%">对象名称</th>
								<th width="18%">事件摘要</th>
								<th width="8%">事件状态</th>
								<th width="8%">工单状态</th>
								<th width="6%">处理状态</th>
								<th width="6%">发生次数</th>
								<th width="9%">首次发生时间</th>
								<th width="9%">最后发生时间</th>					
								<th width="6%">事件详情</th>
								<th>对象ID</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
					<!-- 数据表格End -->
					<!-- 跳转到某页Start -->
					<span class="jumpPage">跳转到<input id="toPage" type="text" />页</span>
					<!-- 跳转到某页End -->
				</div>
			</section>
		</div>
		<div id="tabs2" class="tab-pane">
			<div class="logSelfMonitor-logTopu">
					<div class="logSelfMonitor-logVirtualConnect">
						<span class="textLog grayLeft1 grayTop1 lineAll line"></span>
						<span class="agent grayLeft2 grayTop1 lineAll line2"></span>
						<span class="appSys grayLeft1 grayTop2 lineAll line"></span>
						<span class="sysClient grayLeft2 grayTop2 lineAll line"></span>
						<span class="afaSyslog grayLeft3 grayTop2 lineAll line"></span>
						<span class="application grayLeft1 grayTop3 lineAll line"></span>
						<span class="log4JClient grayLeft2 grayTop3 lineAll line"></span>
						<span class="appender grayLeft3 grayTop3 lineAll line1"></span>
					</div>
					<div class="logSelfMonitor-logRealConnect" id="topu">
						<span id="zk-status" class="zookeeper realLeft3 grayTop1 lineAll line3 line4"></span>
						<span id="kafka-status" class="kafka realLeft1 grayTop2 line lineAll lineColumn"></span>
						<span id="storm-status" class="storm2 realLeft2 grayTop2 line lineAll lineColumn"></span>
						<span id="es-status" class="elasticSearch realLeft3 grayTop2 lineAll line"></span>
						<span id="" class="afaServe realLeft4 grayTop2 line lineAll lineColumn"></span>
						<span id="" class="aweb realLeft5 grayTop2"></span>
					</div>
				</div>
		</div>
	</div>
</section>
