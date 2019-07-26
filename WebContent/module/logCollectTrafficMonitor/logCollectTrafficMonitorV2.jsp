<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.logCollectTM-total{
		width: 240px;
		height: 100%;
		flex: none;
		padding: 20px;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	    justify-content: space-between;
	    align-content: space-between;
	    border: 1px solid #ebebed;
	}
	.logCollectTM-total>span{
		display: inline-block;
		height: calc((100% - 20px)/3);
		text-align: center;
		font-size: 16px;
		padding: 3px;
		box-sizing: border-box;
		background-color: var(--color-theme);
		color: #FFF;
		width: 100%;
		margin-top: 10px;
	}
	.logCollectTM-total>span:nth-child(1),
	.logCollectTM-total>span:nth-child(2){
		width: calc((100% - 10px)/2);
		margin-top: 0;
		margin-right: 10px;
		background-color: #f1f0f5;
		color: #5b5a65;
	}
	.logCollectTM-total>span:nth-child(2){
		margin-right: 0;
	}
	.logCollectTM-total>span:BEFORE{
		content: attr(beforeContent);
		font-size: 14px;
		display: block;
	}
	
	.logCollectTM-total>span:AFTER{
		content: attr(afterContent);
	}
	.logCollectTM-totalEcharts{
		height: 100%;
		flex: auto;
		box-sizing: border-box;
	/* 	border: 1px solid #ebebed; */
		margin: 0 20px;
	}
	.logCollectTM-operate>span{
		margin-right: 20px;
	}
	.logCollectTM-operate input,
	.logCollectTM-operate select
	{
		margin: 0;
		margin-left: 5px;
	}
	.logCollectTM-btns i{
		font-size: 16px;
		cursor: pointer;
		margin-right: 5px;
	}

	.logCollectTM-ul{
		margin: 0;
		font-size: 12px;
	}

	.logCollectTM-ul li{
		height: 22px;
		line-height: 22px;
		display: flex;
		padding: 2px 10px;
		box-sizing: border-box;
		font-weight: normal;
	}
	.logCollectTM-ul li:nth-child(2n){
		background-color: #fafafc;
	}
	.logCollectTM-ul li span{
		display: inline-block;
		line-height: 20px;
		
	}
	.logCollectTM-ul li input{
		margin: -4px 0 0 0;
	}
	.logCollectTM-performDetial{
		height:20px;
		width:100%;
		display:none;
	}
	.logCollectTM-left{
		width: 220px;
		flex: none;
		border-top: 1px solid #ebebed;
		border-bottom: 1px solid #ebebed;
	}
	.logCollectTM-center{
		flex: auto;
		border-top: 1px solid #ebebed;
		border-bottom: 1px solid #ebebed;
		overflow-x: auto;
		overflow-y: hidden;
	}
	.logCollectTM-right{
		width: 300px;
		flex: none;
		border-top: 1px solid #ebebed;
		border-bottom: 1px solid #ebebed;
	}
	.logCollectTM-left ul:nth-child(1) li,
	.logCollectTM-center ul:nth-child(1) li,
	.logCollectTM-right ul:nth-child(1) li{
		border-bottom: 1px solid #ebebed;
		font-weight: bold;
	}

	.logCollectTM-left li>span:nth-child(1){
		width: 20px;
		flex: none;
	}

	.logCollectTM-right li>span{
		flex: 1;
	}

	.logCollectTM-center .logCollectTM-ul li>span{
		height: 100%;
		width: 20px;
	}
	.logCollectTM-center .logCollectTM-ul li{
		padding: 2px 0;
		width: fit-content;
		min-width: 100%;
	}
	.logCollectTM-timeline{
		overflow: hidden;
	}
	.logCollectTM-timeline .logCollectTM-time{
		position: relative;
	}
	.logCollectTM-timeline .logCollectTM-time:BEFORE{
		content: attr(beforeContent);
		position: absolute;
		font-weight: normal;
		left: calc(50% - 23px);
		line-height: 20px;
	}
	.logCollectTM-timeline .logCollectTM-time:AFTER{
		content: '';
		display: block;
		width: 0;
		height: 6px;
		border-left: 1px solid #c7c6cc;
		position: absolute;
		bottom: -5px;
		left: 50%;
	}
	/*分割线*/
	.logCollectTM-perform{
		margin: 0;
		display: flex;
		background:linear-gradient( #fff 50%, #fafafc 50%);
		background-size: 100% 44px;
	}
	.logCollectTM-perform li{
		display: inline-block;
		background:linear-gradient( #fff 50%, #fafafc 50%);
		background-size: 100% 44px;
	}
	.logCollectTM-perform li>span{
		display: block;
		width: 20px;
		height: 18px;
		margin-top: 4px;
	}

	.logCollectTM-perform li>span:nth-child(1){
		margin-top: 2px;
	}
	.logCollectTM-perform li>span:last-child{
		margin-bottom: 2px;
	}
	.logCollectTM-perform li>span.green{
		background:#a9d18e;
	}
	.logCollectTM-perform li>span.yellow{
		background:#ffc002;
	}
	.logCollectTM-perform li>span.level0{
		background: #EEEEEE;
	}
	.logCollectTM-perform li>span.level100{
		background: #E2EFDA;
	}
	.logCollectTM-perform li>span.level500{
		background: #C6E0B4;
	}
	.logCollectTM-perform li>span.level2000{
		background: #A9D08E;
	}
	.logCollectTM-perform li>span.level10000{
		background: #548235;
	}
	.logCollectTM-perform li>span.level10000-1{
		background: #3b7b0f;
	}
	.logCollectTM-perform li>span.levelhigh{
		background: #375623;
	}
	.span-ePerform-time{
		width: 100%;
	    height: 10%;
	    margin-top: -57px;
	    margin-left: -512px;
	    position: absolute;
	}
	.span-ePerform-time>span{
		height: 100%;
	    width: 50px;
	    /* border: 1px solid #000; */
	    padding: 6px;
	    float: right;
	    line-height: 18px;
	    text-align: center;
	    background: #eee;
	    cursor: pointer;
	    margin-right: 2px;
	    border-radius: 4px;
	}
	.span-ePerform-time>span.active{
		border: 1px solid #fff;
		background: var(--color-theme);
	    color: #FFF;
	}
	.logCollectTM-left #performName li{
		cursor: pointer;
	}
	.logCollectTM-left #performName li span{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.logCollectTM-tableChildContentClose{
	   text-align: center;
       position: absolute;
       top: 0;
       right: 0;
       cursor: pointer;
       font-weight: normal;
       color: #5b63f9;
       padding: 0 4px;
	}
	.logCollectTM-tableChildContentWapper{
		width: 100%;
		background-color: #ffffff;
		position: absolute;
		left: 0;
		flex: none;
		display: none;
	}
	.logCollectTM-tableChildContent{
		box-sizing: border-box;
		display: flex;
		align-items: flex-start;
		width: 100%;
		background-color: #fff;
		/*border-left: 1px solid #ebebed;*/
		/*border-right: 1px solid #ebebed;*/
	}
	.logCollectTM-tableChildContent .logCollectTM-left li {
		padding-left: 30px;
		box-sizing: border-box;
	}
	#tableContent .logCollectTM-perform{
		cursor: pointer;
	}
	.logCollectTrafficMonitor-radio>span+span {
		margin-left: -1px;
	}
	.logCollectTrafficMonitor-radio>span:first-child {
		border-radius: 2px 0 0 2px;
	}
	.logCollectTrafficMonitor-radio>span:last-child {
		border-radius: 0 2px 2px 0;
	}
	.logCollectTrafficMonitor-radio>span.active {
		color: var(--color-theme);
		z-index: 2;
		border-color: var(--color-theme);
	}
	.logCollectTrafficMonitor-radio>span {
		position: relative;
		width: 6em;
		display: inline-block;
		border: 1px solid #ccc;
		text-align: center;
		line-height: 22px;
		box-sizing: border-box;
		height: 24px;
		cursor: pointer;
	}
	.logCollectTrafficMonitor-radio {
		display: inline-flex;
	}
	.index-sjzl-left {
	    width: 100%;
	    height: 200px;
	    padding: 20px;
	    box-sizing: border-box;
	    border: solid 1px #eee;
	}

.index-sjzl-left span:BEFORE {
	font-size: 14px;
	display: block;
	margin-bottom: 1px;
	color: #5c5a66;
}
.index-sjzl-left>span+span {
	margin-top: 10px;
}
.index-sjzl-left>span {
	position: relative;
	float: left;
	width: 100%;
	height: 48px;
	background: #f1f0f5;
	border-radius: 4px;
	color: #2b2933;
	text-align: center;
	font-size: 24px;
	box-sizing: border-box;
	padding-top: 1px;
}

.index-sjzl-left>span:nth-child(1) {
    background: var(--color-theme);;
    color: #fff;
    font-size: 28px;
    font-weight: 400;
    height: 50px;
    padding-top: 1px;
}

.index-sjzl-left>span:nth-child(1):before {
	content: "未解除事件总数";
	color: #ffffff !important;
}

.index-sjzl-left>span:nth-child(3):before {
	content: "当日事件总数";
	color: #5c5a66;
	font-size: 14px;
}

.index-sjzl-left>span:nth-child(2) {
	background-image: linear-gradient(to bottom, #AEADB3 0%, #AEADB3 100%);
	background-size: 1px 40px;
	background-position: center 10px;
	background-repeat: no-repeat;
	display: flex;
}

.index-sjzl-left>span>span:AFTER {
	content: "";
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	top: 6px;
	left: 28%;
}
.index-sjzl-left>span>span {
	float: left;
	width: 50%;
	position: relative;
}

.index-sjzl-left>span>span:nth-child(1):before {
	content: "预警";
}

.index-sjzl-left>span>span:nth-child(2):before {
	content: "告警";
}

.index-sjzl-left>span>span:nth-child(1):after {
	background: #5e63fd;
}

.index-sjzl-left>span>span:nth-child(2):after {
	background: #fc862f;
}
.tabright-wrap>span {
	overflow: hidden;
}
.operate-item {
	display: flex;
	margin-bottom: 20px;
}
.operate-time-btns {
	display: flex;
	margin-left: 20px;
}
.operate-time-btns>span {
    font-size: 12px;
    width: 60px;
    text-align: center;
    border: solid 1px #dcdcdc;
    cursor: pointer;
}
.operate-time-btns>span.active {
    background: #55a8fd;
    color: #fff;
    border-color: #55a8fd;	
}
.eventBall {
    position: relative;
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #F44336;
    margin-top: 2px;
    cursor: pointer;	
}
.eventBall-info {
	position: fixed;
    left: -103px;
    top: 25px;
    background: #2196F3;
    width: 220px;
    border-radius: 4px;
    color: #fff;
}
.eventBall-info:before {
    content: '';
    display: block;
    position: absolute;
    top: -20px;
    left: 50%;
    width: 0;
    height: 0;
    border: solid 10px transparent;
    border-bottom-color: #2196F3;
    transform: translateX(-50%);
}
.eventBall-info-item {
    display: flex;
    justify-content: space-around;
    padding: 0 20px;	
    height: 30px;
    line-height: 30px;
}
.eventBall-info-item>span {
	flex: 1;
}
.baseinfo {
	flex:none;
	width:240px;
	height: 100%;
	border: solid 1px #eee;
	padding: 20px;
	box-sizing: border-box;
	margin-right: 20px;
}
.baseinfo>div:nth-child(1) {
    height: 100px;
    background: #f1f0f5;
    text-align: center;
    color: #6d6a6a;
    font-size: 64px;
    line-height: 100px;
    font-weight: 600;
}
.baseinfo>div:nth-child(2) {
	display: flex;
	margin-top: 10px;
    height: 50px;
    background-color: var(--color-theme);
}
.baseinfo>div:nth-child(2)>span {
    flex: 1;
    text-align: center;
    line-height: 50px;
    color: #fff;
}
</style>

<section class="panel" style="margin: 0;">
	<p class="title">网络日志视图</p>
	<div class="content">
		<div style="display: flex; margin-bottom: 20px;height: 200px;position: relative;">
			<div class="baseinfo" style="">
				<div>NET</div>
				<div><span>实例</span><span>17个</span></div>
			</div>
			<div class="logCollectTM-total">
				<span id="appNum" beforeContent="应用系统数">-</span>
				<span id="ipNum" beforeContent="抓取主机数">-</span>
				<span id="logDataToTalSize" beforeContent="采集总量" afterContent="KB">-</span>
				<span id="currentLogDataIps" beforeContent="实时速度" afterContent="kb/s">-</span>
			</div>
			<div class="logCollectTM-totalEcharts">
				<div class="span-ePerform-time">
					<!-- <span data-id="8">24小时</span> -->
					<span data-id="7">12小时</span>
					<span data-id="6">6小时</span>
					<span data-id="4">1小时</span>
					<span data-id="3">30分钟</span>
					<span data-id="1">10分钟</span>
				</div>
				<section class="panel" style="height: 200px;">
					<div class="content" style="padding: 0;">
						<ul class="nav nav-tabs nav-public" id="flow_event_change">
							<li class="active"><a href="#tabs1" data-toggle="tab">流量</a></li>
							<li><a href="#tabs2" data-toggle="tab">事件</a></li>
						</ul>
						<div class="tab-content" style="height: 158px;">
							<div id="tabs1" class="tab-pane active" style="height:100%;padding: 0;">
								<div id="ePerform" style="width: 100%;height: 145px;"></div>
							</div>
							<div id="tabs2" class="tab-pane" style="height:100%;padding: 0;">
								<div id="eventEcharts"  style="width: 54vw;height: 145px;"></div>
							</div>
						</div>
					</div>
				</section>
			</div>
			<div class="event-wrap" style="flex:none;width:240px;height: 100%;">
				<div class="index-sjzl-left">
					<span class="single-block" data-before="未解除事件总数">20</span> 
					<span>
						<span id="" data-before="预警">16</span>
						<span id="" data-before="告警">4</span>
					</span>
					<span class="single-block" data-before="当日事件总数">32</span>
				</div>
			</div>
		</div>
		<section class="panel" style="min-height: 300px;">
			<p class="title">采集明细单元</p>
			<div class="content" style="position: relative;">
				<!-- <div class="logCollectTM-operate" style="font-size: 12px;margin-bottom: 10px;">
					<span>视图：<span class="logCollectTrafficMonitor-radio">
								<span value="1" class="active">主机</span>
								<span value="2">应用</span>
							</span><select id="statisticstype">
						<option value="1">主机</option>
						<option value="2">应用</option>
						<option value="3">数据源</option>
					</select></span>
					<span>筛选：<input type="text" id="keyName" placeholder="请输入名称筛选"></span>
					<span>排序：<select id="sort">
						<option value=""></option>
						<option value="dataips">采集速度Top10</option>
						<option value="datasize">采集量Top10</option>
						<option value="3">数据源</option>
					</select></span>
				</div> -->
				<div class="operate-wrap">
					<div class="operate-item">
						<span>采集周期</span>
						<div class="operate-time-btns">
							<span class="active">一小时</span>
							<span>三小时</span>
							<span>六小时</span>
						</div>
					</div>
				</div>
				<div id="tableContent" style="margin: 0 -20px; display: flex;">
					<div class="logCollectTM-left">
						<ul class="logCollectTM-ul">
							<li style="border-right: 1px solid #ebebed;position: relative;">
								<span></span>
								<span>网络设备</span>
							</li>
						</ul>
						<ul id="performName" class="logCollectTM-ul">
							<!-- <li item="统一支付">
								<span><input type="checkbox"></span>
								<span>统一支付</span>
							</li> -->
						</ul>
					</div>
					<div class="logCollectTM-center">
						<ul class="logCollectTM-ul">
							<li id="timeline" class="logCollectTM-timeline" style="position: relative;">
							</li>
						</ul>
					</div>
					<div class="logCollectTM-right">
						<ul class="logCollectTM-ul">
							<li style="border-left: 1px solid #ebebed;position: relative;" class="tabright-wrap">
								<span>采集速度(KB/S)</span>
								<span>采集量(MB)</span>
								<span title="错误"><i class="fa fa-times" style="color: #F44336;"></i></span>
								<span title="警告"><i class="fa fa-bell" style="color: #FF9800;"></i></span>
								<span title="失败"><i class="fa fa-flash" style="color: #F44336;"></i></span>
							</li>
						</ul>
					</div>
				</div>
				<div id="tableChildContentWapper" class="logCollectTM-tableChildContentWapper">
					<div id="tableChildContent" class="logCollectTM-tableChildContent">
						<!-- <div class="logCollectTM-tableChildContentClose" title="关闭">关闭</div> -->
						<div class="logCollectTM-left" style="border: none;">
							<ul class="logCollectTM-ul" style="display: none;">
								<li style="border-right: 1px solid #ebebed;position: relative;">
									<span></span>
									<span>名称</span>
								</li>
							</ul>
							<ul id="performName" class="logCollectTM-ul">
							</ul>
						</div>
						<div class="logCollectTM-center" style="border: none;">
							<ul class="logCollectTM-ul" style="display: none;">
								<li id="timeline" class="logCollectTM-timeline" style="position: relative;">
									
								</li>
							</ul>
						</div>
						<div class="logCollectTM-right" style="border: none;">
							<ul class="logCollectTM-ul" style="display: none;">
								<li style="border-left: 1px solid #ebebed;position: relative;" class="tabright-wrap">
									<span>采集速度(KB/S)</span>
									<span>采集量(MB)</span>
									<span>错误</span>
									<span>警告</span>
									<span>失败</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
	
	<div class="eventBall-info hide">
		<div class="eventBall-info-item">
			<span>应用名称</span><span>日志分析平台</span>
		</div>
		<div class="eventBall-info-item">
			<span>对象名称</span><span>amlog-01</span>
		</div>
		<div class="eventBall-info-item">
			<span>事件级别</span><span>1级</span>
		</div>
	</div>
	
	
</section>
