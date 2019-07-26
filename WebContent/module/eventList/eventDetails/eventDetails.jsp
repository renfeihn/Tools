<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.eventDetails-eventPath:BEFORE {
	content: '';
	position: absolute;
	width: 31px;
	height: 31px;
	transform: rotate(45deg);
	background: #22ac38;
	right: -15px;
	top: -15px;
}

.eventDetails-eventPath {
	border: 1px solid #DFDFE6;
	border-radius: 2px;
	padding: 20px;
	position: relative;
	overflow: hidden;
}

.eventDetail-table .dataTables_scrollBody table{
	border-top: none !important;
}

.eventDetails-progress {
	height: 70px;
	background-image: linear-gradient(to right, #AEADB3 0%, #AEADB3 100%);
	background-size: 100% 4px;
	background-position: 0 14px;
	background-repeat: repeat-x;
	margin: 20px 0 0 0;
	display: flex;
}

.eventDetails-progress>li.done:nth-child(1) {
    animation: progress_done linear 1s forwards;
}
.eventDetails-progress>li.done:nth-child(2) {
    animation: progress_done linear 1s 1s forwards;
}
.eventDetails-progress>li.done:nth-child(3) {
    animation: progress_done linear 1s 2s forwards;
}
.eventDetails-progress>li.done:nth-child(4) {
    animation: progress_done linear 1s 3s forwards;
}
.eventDetails-progress>li.done:nth-child(5) {
    animation: progress_done linear 1s 4s forwards;
}

.eventDetails-progress>li.doing:nth-child(1) {
    animation: progress_doing linear 0.5s forwards;
}
.eventDetails-progress>li.doing:nth-child(2) {
    animation: progress_doing linear 0.5s 1s forwards;
}
.eventDetails-progress>li.doing:nth-child(3) {
    animation: progress_doing linear 0.5s 2s forwards;
}
.eventDetails-progress>li.doing:nth-child(4) {
    animation: progress_doing linear 0.5s 3s forwards;
}
.eventDetails-progress>li.doing:nth-child(5) {
    animation: progress_doing linear 0.5s 4s forwards;
}

.eventDetails-progress>li.done:nth-child(1):BEFORE {
    animation: progress_circle_done linear 1s forwards;
}
.eventDetails-progress>li.done:nth-child(2):BEFORE {
    animation: progress_circle_done linear 1s 1s forwards;
}
.eventDetails-progress>li.done:nth-child(3):BEFORE {
    animation: progress_circle_done linear 1s 2s forwards;
}
.eventDetails-progress>li.done:nth-child(4):BEFORE {
    animation: progress_circle_done linear 1s 3s forwards;
}
.eventDetails-progress>li.done:nth-child(5):BEFORE {
    animation: progress_circle_done linear 1s 4s forwards;
}

.eventDetails-progress>li.doing:nth-child(1):BEFORE {
    animation: progress_circle_doing linear 0.5s forwards;
}
.eventDetails-progress>li.doing:nth-child(2):BEFORE {
    animation: progress_circle_doing linear 0.5s 1s forwards;
}
.eventDetails-progress>li.doing:nth-child(3):BEFORE {
    animation: progress_circle_doing linear 0.5s 2s forwards;
}
.eventDetails-progress>li.doing:nth-child(4):BEFORE {
    animation: progress_circle_doing linear 0.5s 3s forwards;
}
.eventDetails-progress>li.doing:nth-child(5):BEFORE {
    animation: progress_circle_doing linear 0.5s 4s forwards;
}

.eventDetails-progress>li:AFTER {
	position: absolute;
	left: 0;
	right: 0;
	margin: auto;
	text-align: center;
	top: 34px;
}
.eventDetails-progress>li:nth-child(1):AFTER {
    content: '已产生';
}
.eventDetails-progress>li:nth-child(2):AFTER {
    content: '待分派';
}
.eventDetails-progress>li:nth-child(3):AFTER {
    content: '已分派';
}
.eventDetails-progress>li:nth-child(4):AFTER {
    content: '处理中';
}
.eventDetails-progress>li:nth-child(5):AFTER {
    content: '已取消';
}
.eventDetails-progress>li {
	flex: auto;
	background-image: linear-gradient(to right, #5b62f9 0%, #5b62f9 100%);
	background-size: 0 4px;
	background-position: left 14px;
	background-repeat: no-repeat;
	position: relative;
	color: #ADADB4;
}

.eventDetails-progress>li:BEFORE {
	content: '';
	border: 4px solid #AEADB3;
	width: 22px;
	height: 22px;
	border-radius: 50%;
	position: absolute;
	box-sizing: border-box;
	background: #FFF;
	left: 0;
	right: 0;
	top: 5px;
	margin: auto;
	box-shadow: 0 0 0 4px #FFF;
}

.eventDetails-echarts+.eventDetails-echarts {
	margin-top: 20px;
}

.eventDetails-layout {
	display: flex;
    align-items: flex-start;
}

/*.eventDetails-echarts.eventDetails-add:HOVER {
	background: #f7f7fa url("img/eventDetails/add-blue.png") center no-repeat;
}*/
.eventDetails-echarts.eventDetails-add {
	cursor: pointer;
	background: #f7f7fa url("img/eventDetails/add.png") center no-repeat;
}
.eventDetails-echarts {
	width: 300px;
	height: 210px;
	border: 1px solid #e4e5e6;
	border-radius: 2px;
}

@keyframes progress_circle_done {
	0% {
		border-color: #AEADB3;
	}
	40% {
		border-color: #AEADB3;
	}
	60% {
		border-color: #5b62f9;
	}
	100% {
		border-color: #5b62f9;
	}
}

@keyframes progress_circle_doing {
	60% {
		border: 4px solid #AEADB3;
		background: #FFF;
		box-shadow: 0 0 0 4px #FFF;
	}
	100% {
		border: 6px solid #fff;
		background: #5b62f9;
		box-shadow: 0 0 0 4px #5b62f9,0 0 0 8px #fff;
	}
}
@keyframes progress_done {
	0% { background-size: 0 4px; }
	40% { color: #ADADB4;}
	60% {color: #2b2933;}
	100% {background-size: 100% 4px;color: #2b2933;}
}
@keyframes progress_doing {
	0% { background-size: 0 4px; }
	70% { color: #ADADB4; font-weight: normal; font-size: 14px; }
	100% { background-size: 50% 4px; color: #5b62f9; font-weight: bold; font-size: 16px; }
}

.tabs-left>.nav.nav-tabs>li.active>.eventDetails-tabs-a {
	background: #fff;
}

.eventDetails-jkyxx>span {
	border-radius: 2px;
    color: #4c4d4e;
    float: left;
    width: 180px;
    height: 77px;
    box-sizing: border-box;
    padding: 20px 0 0 70px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.eventDetails-jkyxx>span:before {
	font-size:12px;
}
.eventDetails-jkyxx>span#objectID:BEFORE {
	content: '对象ID';
}
.eventDetails-jkyxx>span#objectType:BEFORE {
	content: '对象类型';
}
.eventDetails-jkyxx>span#deployIP:BEFORE {
	content: '部署IP';
}
.eventDetails-jkyxx>span#objectName:BEFORE {
	content: '对象名称';
}
.eventDetails-jkyxx>span#objectID {
	margin-right: 10px;
	margin-bottom: 10px;
	background: #f6f7fb url("img/eventDetails/objectID.png") 15px 17px no-repeat;
}
.eventDetails-jkyxx>span#objectType {
	margin-bottom: 10px;
	background: #f6f7fb url("img/eventDetails/objectType.png") 15px 17px no-repeat;
}
.eventDetails-jkyxx>span#deployIP {
	margin-right: 10px;
	background: #f6f7fb url("img/eventDetails/ip.png") 15px 17px no-repeat;
}
.eventDetails-jkyxx>span#objectName {
	background: #f6f7fb url("img/eventDetails/objectName.png") 15px 17px no-repeat;
}
.eventDetails-jkyxx>span:BEFORE {
	display: block;
	color: #a5a6a7;
}

.eventDetails-normal{
	width: 80px;
	height: 80px;
	background: url("img/eventDetails/normal.png");
	position: absolute;
	top: -30px;
	right: -20px;
}
.eventDetails-error{
	width: 80px;
	height: 80px;
	background: url("img/eventDetails/error.png");
	position: absolute;
	top: -30px;
	right: -20px;
}
.eventDetails-warning{
	width: 80px;
	height: 80px;
	background: url("img/eventDetails/warning.png");
	position: absolute;
	top: -30px;
	right: -20px;
}
.eventDetails-title{
	padding-left: 70px;
	background: url('img/eventDetails/arrow.png') no-repeat;
	height: 48px;
}
.eventDetails-title>span{
	display:block;
}
.eventDetails-title>span:nth-child(2){
	color: #5b62f9;
	margin-top: 8px;
}
.eventDetails-inforLayout{
	display: flex;
	justify-content:space-between;
	width:100%;
}
.eventDetails-inforLayout>span:nth-child(1),
.eventDetails-inforLayout>span:nth-child(2){
	min-width:160px;
}
.eventDetails-inforLayout>span{
	overflow:hidden;
	white-space:nowrap;
	text-overflow:ellipsis;
}
.eventDetails-inforLayout>span:before,
.eventDetails-desc:before{
	width:58px;
	display:inline-block;
	font-size:12px;
    color: #666;
}
.eventDetails-inforLayout:nth-child(2)>span:nth-child(1):before{
	content:'事件ID';
	
}
.eventDetails-inforLayout:nth-child(2)>span:nth-child(2):before{
	content:'持续时间';
}
.eventDetails-inforLayout:nth-child(2)>span:nth-child(3):before{
	width: 84px;
	content:'首次发生时间';
}
.eventDetails-inforLayout:nth-child(3)>span:nth-child(1):before{
	content:'事件级别';
	
}
.eventDetails-inforLayout:nth-child(3)>span:nth-child(2):before{
	content:'发生次数';
}
.eventDetails-inforLayout:nth-child(3)>span:nth-child(3):before{
	width: 84px;
	content:'最后发生时间';
}
.eventDetails-desc:before {	
	content: '事件描述';
}
.eventDetails-desc{
	overflow:hidden;
	text-overflow:ellipsis;
	display:-webkit-box;
	-webkit-line-clamp:3;
	-webkit-box-orient:vertical;
	word-break: break-all;
}
.eventDetails-squal i{
	width: 6px;
	height:12px;
	display:inline-block;
	background-color:#e0dfe6;
	margin-right:2px;
}

.eventDetails-squal .eventDetails-blue{
	background-color: #5b62f9;
}

.eventDetails-progressDesc{
	padding:16px 50px 0 80px ;
	height:74px;
	position: relative;
	margin-left:37px;
    box-sizing: border-box;
    background: #f7f7fa;
}
.eventDetails-progressDesc:before{
	content: url("img/eventDetails/arrow.png");
	width:74px;
	height:74px;
	border-radius: 50%;
	border:1px solid #e5e5e5;
	position: absolute;
	left:-37px;
	top:0;
	background:#f7f7fa;
	padding: 12px 0 0 12px;
	box-sizing: border-box;
}
.eventDetails-progressDesc:after{
	content:'第12步';
	width:50px;
	height:20px;
	background:#5b62f9;
	color:white;
	display:block;
	position:absolute;
	top:0;
	right:0;
	text-align:center;
	border-radius:0 3px 0 3px;
}
.eventDetails-progressDesc span{
	display: inline-block;
	font-size:14px;
	width:144px;
}

.eventDetails-progressDesc span:before{
	display:inline-block;
	width:50px;
	color: #666;
}
.eventDetails-progressDesc span:nth-child(1):before{
	content:'操作人';
}
.eventDetails-progressDesc span:nth-child(2):before{
	content:'接收人';
}
.eventDetails-progressDesc p:before{
	content:'操作说明';
	display:inline-block;
	width:64px;
	color: #666;
}
.eventDetails-progressDesc p{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
    width: calc(100vw - 750px);
}
#sameTimeTabs table td .prompt:before,
#sameEventTabs table td .promt:before {
	content:'通知';
} 
#sameTimeTabs table td .error:before,
#sameEventTabs table td .error:before {
	content:'告警';
} 
#sameTimeTabs table td .warning:before,
#sameEventTabs table td .warning:before {
	content:'预警';
} 
#sameTimeTabs table td .prompt,
#sameEventTabs table td .prompt{
	background:#0Bc048;
	color:#fff;
	border-radius: 12px;
	display:inline-block;
	width:44px;
	font-size:12px;
	text-align: center;
}
#sameTimeTabs table td .error,
#sameEventTabs table td .error{
	background:#ff3341;
	color:#fff;
	border-radius: 12px;
	display:inline-block;
	width:44px;
	font-size:12px;
	text-align: center;
}
#sameTimeTabs table td .warning,
#sameEventTabs table td .warning{
	background:#fb8229;
	color:#fff;	
	text-align: center;
	border-radius: 12px;
	display:inline-block;
	width:44px;
	font-size:12px;
}
#sameTimeTabs table td:nth-child(4) .weishouli,
#sameEventTabs table td:nth-child(4) .weishouli {
	color:#ff3341;
}
.eventDetail-table .dataTables_scrollHeadInner{
	padding: 0px !important;
}
.eventDetail-table .dataTables_scrollBody{
	border-bottom: 1px solid #e0dfe6;
}
.eventDetails-echarts .eTitle{
	display: inline-block;
	width: 80%;
	font-size: 15px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>

<section class="panel" style="margin: -20px -20px 0 -20px;">
	<p class="title">事件详情</p>
	<div class="content">
		<div class="eventDetails-layout">
			<div style="flex: auto;">
				<div style="display: flex;height: 260px;margin-bottom: 20px;">
					<section class="panel" style="width: 390px;flex: auto;">
						<p class="title">事件基本信息</p>
						<div class="content">
							<div style="position: relative;">
								<div id="eventType" class=""></div>
								<div class="eventDetails-title">
									<span id="eventName">-</span> 
									<span id="eventStatus">-</span> </div>
							</div>
							<div class="eventDetails-inforLayout">
								<span id="eventId">-</span>
								<span id="stayTime">-</span>
								<span id="startDate">-</span>
							</div>
							<div class= "eventDetails-inforLayout ">
								<span class="eventDetails-squal">
									<span id="eventLevel" style="display:inline-flex;">
										<i></i>
										<i></i>
										<i></i>
										<i></i>
										<i></i>
									</span>
									<span id="eventLevelNum">-</span></span>
								<span id="ocrTimes">-</span>
								<span id="endDate">-</span>
							</div>
							<div >
								<p id="eventDecribe" class="eventDetails-desc">-
									
								</p>
							</div>
						</div>
					</section>
					<section class="panel" style="margin-left: 20px;width: 410px;flex: none;">
						<p class="title">监控源信息</p>
						<div class="content eventDetails-jkyxx">
							<span id="objectID">-</span>
							<span id="objectType">-</span>
							<span id="deployIP">-</span>
							<span id="objectName">-</span>
						</div>
					</section>
				</div>
				<section class="panel" style="margin-bottom: 20px">
					<p class="title">事件现场还原</p>
					<div class="content" style="padding: 0;">
						<div class="tabs-left" style="background: #FFF;">
							<ul id="eventTabs" class="nav nav-tabs">
								<!-- <li class="active"><a data-toggle="tab" class="eventDetails-tabs-a">响应时间</a></li>
								<li><a data-toggle="tab" class="eventDetails-tabs-a">TPS</a></li> -->
							</ul>
							<div class="tab-content" style="flex: auto;">
								<div id="tabs1" class="tab-pane active eventDetail-table">
									<div class="eventDetails-layout" style="">
										<div id="allEventEchart" style="height: 230px;flex:auto; margin-right: 15px"></div>
										<table id="gatherTable" class="display dataTable table" 
											style="width: 274px;flex:none;">
											<thead>
												<tr>
													<th>序号</th>
													<th>采集值</th>
													<th>采集时间</th>
												</tr>
											</thead>
											<tbody></tbody>
										</table>
									</div>
								</div>
								<!-- <div id="tabs2" class="tab-pane">
									<div class="eventDetails-layout">
										<div id="tpsCharts" style="height: 230px;flex:auto"></div>
										<table id="tpsTable" class="display dataTable table" 
											style="margin-left: 20px;width: 274px;flex:none">
											<thead>
												<tr>
													<th>序号</th>
													<th>采集值</th>
													<th>采集时间</th>
												</tr>
											</thead>
											<tbody></tbody>
										</table>
									</div>
								</div> -->
							</div>
						</div>
					</div>
				</section>
				<section class="panel" style="display: none">
					<p class="title">事件路径</p>
					<div class="content">
						<div class="eventDetails-eventPath">
							<ul class="eventDetails-progress">
								<li class="done"></li>	<!-- 已产生 -->
								<li class="done"></li>	<!-- 待分派 -->
								<li class="doing"></li>	<!-- 已分派 -->
								<li class=""></li>		<!-- 处理中 -->
								<li class=""></li>		<!-- 已取消 -->
							</ul>
							<div class="eventDetails-progressDesc">
								<span>李秋水</span> <span>海大富</span>
								<p>请在你好好你好模拟哈请在你好好你好模拟哈请在你好好你好模拟哈请在你好好你好模拟哈请在你好好你好模拟哈</p>								
							</div>
						</div>
					</div>
				</section>
				<section class="panel" style="height:397px;margin-top:20px;">
					<ul class="nav nav-tabs nav-public">
						<li class="active"><a href="#sameTimeTabs" data-toggle="tab">同期事件</a></li>
						<li><a href="#sameEventTabs" data-toggle="tab">同类事件历史</a></li>
					</ul>
					<div class="tab-content">
						<div id="sameTimeTabs" class="tab-pane active" style="padding:0">
							<ul class="nav nav-tabs nav-underLine">
								<li class="active"><a href="#sameObject" data-toggle="tab">同对象</a></li>
								<li><a href="#sameServer" data-toggle="tab">同服务器</a></li>
								<li><a href="#sameApp" data-toggle="tab">同应用</a></li>
								<li><a href="#importApp" data-toggle="tab">接入应用系统</a></li>
							</ul>
							<div class="tab-content">
								<div id="sameObject" class="tab-pane active" >
									<table id="dataTable1" class="display dataTable table">
										<thead>
											<tr>
												<th>序号</th>
												<th>事件Id</th>
												<th>事件类型</th>
												<th>事件状态</th>
												<th>事件级别</th>
												<th>发生次数</th>
												<th>首次发生时间</th>
												<th>最后发生事件</th>
												<th>持续时间</th>
												<th>处理人</th>
												<th>处理时间</th>
											</tr>
										</thead>
										<tbody>
											<!-- <tr>
												<td>1</td>
												<td>2</td>
												<td><span class="warning"></span></td>
												<td><span class="weishouli">未受理</span></td>
												<td>5</td>
												<td>6</td>
												<td>7</td>
												<td>8</td>
												<td>9</td>
												<td>10</td>
												<td>11</td>
											</tr>
											<tr>
												<td>1</td>
												<td>2</td>
												<td><span class="error"></span></td>
												<td>4</td>
												<td>5</td>
												<td>6</td>
												<td>7</td>
												<td>8</td>
												<td>9</td>
												<td>10</td>
												<td>11</td>
											</tr>
											<tr>
												<td>1</td>
												<td>2</td>
												<td><span class="prompt"></span></td>
												<td>4</td>
												<td>5</td>
												<td>6</td>
												<td>7</td>
												<td>8</td>
												<td>9</td>
												<td>10</td>
												<td>11</td>
											</tr> -->
										</tbody>
									</table>
								</div>
								<div id="sameServer" class="tab-pane">
									<table id="dataTable2" class="display dataTable table">
										<thead>
											<tr>
												<th>序号</th>
												<th>事件Id</th>
												<th>事件类型</th>
												<th>事件状态</th>
												<th>事件级别</th>
												<th>发生次数</th>
												<th>首次发生时间</th>
												<th>最后发生事件</th>
												<th>持续时间</th>
												<th>处理人</th>
												<th>处理时间</th>
											</tr>
										</thead>
										<tbody></tbody>
									</table>
								</div>
								<div id="sameApp" class="tab-pane">
									<table id="dataTable3" class="display dataTable table">
										<thead>
											<tr>
												<th>序号</th>
												<th>事件Id</th>
												<th>事件类型</th>
												<th>事件状态</th>
												<th>事件级别</th>
												<th>发生次数</th>
												<th>首次发生时间</th>
												<th>最后发生事件</th>
												<th>持续时间</th>
												<th>处理人</th>
												<th>处理时间</th>
											</tr>
										</thead>
										<tbody></tbody>
									</table>
								</div>
								<div id="importApp" class="tab-pane">
									<table id="dataTable4" class="display dataTable table">
										<thead>
											<tr>
												<th>序号</th>
												<th>事件Id</th>
												<th>事件类型</th>
												<th>事件状态</th>
												<th>事件级别</th>
												<th>发生次数</th>
												<th>首次发生时间</th>
												<th>最后发生事件</th>
												<th>持续时间</th>
												<th>处理人</th>
												<th>处理时间</th>
											</tr>
										</thead>
										<tbody></tbody>
									</table>
								</div>
							</div>
						</div>
						<div id="sameEventTabs" class="tab-pane">
							<table id="dataTable5" class="display dataTable table">
								<thead>
									<tr>
										<th>序号</th>
										<th>事件Id</th>
										<th>事件类型</th>
										<th>事件状态</th>
										<th>事件级别</th>
										<th>发生次数</th>
										<th>首次发生时间</th>
										<th>最后发生事件</th>
										<th>持续时间</th>
										<th>处理人</th>
										<th>处理时间</th>
									</tr>
								</thead>
								<tbody>
									
								</tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
			<section class="panel" style="flex: none;margin-left: 20px; overflow: visible;">
				<p class="title">事件指标丰富</p>
				<div id="echartCtn" class="content">
					<div class="eventDetails-echarts eventDetails-add">
						<div class="echartCtn" style="display: none">
							<p style="margin: 0; height: 30px; font-size: 18px; text-align: center; line-height: 40px; font-weight: normal; position: relative;">
								<span class="eTitle"></span><i class="close closeEchart" style="position: absolute; font-size: 31px; right: 7px; top: 5px;">&times;</i>
							</p>
							<div class="itemEchart" style="width: 280px; height: 150px; margin: 10px;"></div>
						</div>
					</div>
					<div class="eventDetails-echarts eventDetails-add">
						<div class="echartCtn" style="display: none">
							<p style="margin: 0; height: 30px; font-size: 18px; text-align: center; line-height: 40px; font-weight: normal; position: relative;">
								<span class="eTitle"></span><i class="close closeEchart" style="position: absolute; font-size: 31px; right: 7px; top: 5px;">&times;</i>
							</p>
							<div class="itemEchart" style="width: 280px; height: 150px; margin: 10px;"></div>
						</div>						
					</div>
					<div class="eventDetails-echarts eventDetails-add">
						<div class="echartCtn" style="display: none">
							<p style="margin: 0; height: 30px; font-size: 18x; text-align: center; line-height: 40px; font-weight: normal; position: relative;">
								<span class="eTitle"></span><i class="close closeEchart" style="position: absolute; font-size: 31px; right: 7px; top: 5px;">&times;</i>
							</p>
							<div class="itemEchart" style="width: 280px; height: 150px; margin: 10px;"></div>
						</div>
					</div>
					<div class="eventDetails-echarts eventDetails-add">
						<div class="echartCtn" style="display: none">
							<p style="margin: 0; height: 30px; font-size: 18px; text-align: center; line-height: 40px; font-weight: normal; position: relative;">
								<span class="eTitle"></span><i class="close closeEchart" style="position: absolute; font-size: 31px; right: 7px; top: 5px;">&times;</i>
							</p>
							<div class="itemEchart" style="width: 280px; height: 150px; margin: 10px;"></div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</section>
 
<div id="itemModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header confirm-header">
		<h4 style="margin: 5px 0; line-height: 26px;">请选择IP和指标<i class="close confirm-close" style="margin-top: 5px">&times;</i></h4>
	</div>	
	<div class="modal-body">
		<div>
			<div style="margin-bottom: -12px;">
				<span style="display: inline-block; margin-left: 103px; position: relative; top: 7px; margin-right: 16px">IP：  </span>
				<select id="ipSelt" style="margin-top: 20px;">
			
				</select>
			</div>
			<div>
				<span style="display: inline-block; margin-left: 103px; position: relative; top: 7px;">指标：  </span>
				<select id="itemSelt" style="margin-top: 20px;">
			
				</select>
			</div>			
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-role="cancel" class="cancelBtn">取消</button>
		<button type="button" data-role="confirm" class="confirmBtn">确定</button>
	</div>
</div>
