<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%--页面前缀 escluster--%>
<style type="text/css">

	.escluster-main-node-ctn,.escluster-chart-ctn{
		width: 1556px;
	}
	.escluster-node-ctn{
		width: 1554px;
	}
	.escluster-info-12px{
		font-size: 12px;
		color: #4d4d4d;
	}
	.escluster-info-14px{
		font-size: 14px;
		color: #2b2b2b;
	}
	.escluster-info-26px{
		font-size: 26px;
		color: #a6a6a6;
	}
	.escluster-info-30px{
		font-size: 30px;
		color: #000;
	}
	.escluster-info-36px{
		font-size: 36px;
		color: #a6a6a6;
	}
	.fa-color-red {
	    color: #F01024;
	    font-size: 20px;
	}
	.fa-color-orange {
	    color: #FFA602;
	    font-size: 20px;
	}
	.fa-color-normal {
	    color: #CCC4C4;
	    font-size: 20px;
	}
	.health-content-meter{
		cursor: default;
	}

	/*hack*/
	ul{
		margin: 0px;
		padding: 0px;
	}
	p{
		margin:0px;
		padding: 0px;
	}
	.kp-container>.kp-main>.kp-dig-ctn .kp-dig-item-bigval{
		margin-bottom: 10px;
	}
	/*hack*/

/*信息展示start*/

	.escluster-node-ctn{
		margin-bottom: 20px;
		border: 1px solid #E5E5E5;
		height: 1090px;
		background-color: #FFFFFF;
	}
	.escluster-node-body-ctn{
		height: 326px;
		padding:20px;
	}
	.escluster-node-body{
		float:left;
		border:1px solid #E5E5E5;
		border-radius: 5px;
		margin-right: 20px;
		height: 324px;
		margin-bottom: 20px;
	}
	.escluster-info-content{
		height: 242px;
		padding:20px;
	}
	.escluster-info-health{
		width: 280px;
	}
	.escluster-info-warning{
		width: 455px;
		margin:0px;
	}
	.escluster-info-running{
		width: 340px;
	}
	.escluster-info-attribute{
		width: 306px;
	}

	/*中间件报警*/
	.escluster-info-warning-ctn{
		float: left;
		margin-right: 20px;
		width: 173px;
		padding: 12px;
		padding-bottom: 0px;
		border-radius: 5px;
		background-color: #f1f0f6;
	}
	.escluster-info-warning-ctn:last-child{
		margin: 0px;
	}
	.escluster-info-warning-total{
		border-radius: 5px;
		width: 141px;
		height: 80px;
		padding: 10px;
	}
	.escluster-info-warning-total>p:last-child{
		padding-top: 10px;
	}
	.escluster-info-warning-unsolve-total{
		background-color: #13B1F5;
	}
	.escluster-info-warning-solve-total{
		background-color: #ececec;
	}
	.escluster-info-warning-ohter{
		padding-top: 20px;
		padding-bottom: 20px;
		height: 25px;
		line-height: 25px;
	}
	.escluster-info-warning-ohter span{
		padding:0 2px;
	}
	.escluster-info-warning-error{
		border-bottom: 1px dotted #E5E5E5;
	}
	.escluster-info-warning-unsolve-total>p{
		color: #ffffff;
	}

	/*中间件运行概况*/
	.escluster-info-running-status{
		width: 100%;
		height: 100%;
	}
	.escluster-info-running-status>li{
		float: left;
		margin-bottom: 20px;
		width: 120px;
		height: 81px;
		padding: 30px 10px 0 10px;
		display: inline-block;
		text-align: center;
		background-color: #f1f0f6;
		border-radius: 5px;
	}
	.escluster-info-running-status>li:nth-of-type(odd){
		margin-right: 20px;
	}
	.escluster-info-running-status>li:nth-of-type(3),.escluster-info-running-status>li:nth-of-type(4){
		margin-bottom: 0px;
	}
	.escluster-info-running-status>li>p:first-child{
		margin-bottom: 10px;
	}

	/*中间件属性*/
	.escluster-info-attr-ctn{
		float: left;
	}
	.escluster-info-attr-ctn:first-child>li{
		width: 100px;
		color: #a6a6a6;
	}
	.escluster-info-attr-ctn:last-child{
		margin-left: 4px;
	}
	.escluster-info-attr-ctn>li{
		padding:0.8px 0 2px 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin-top: 20px;
		/* overflow: hidden; */
	}
	.escluster-info-status{
		border-radius: 12px;
		padding:0 10px;
		color:#ffffff;
	}
	#esclusterInfoStatus{
		width:160px;
	}
	#esclusterInfoStatus>li{
		height: 20px;
		-webkit-user-select: text;
    	-moz-user-select: text;
    	-ms-user-select: text;
	}
	#esclusterInfoStatus>li li{
		height: 20px;
		-webkit-user-select: text;
    	-moz-user-select: text;
    	-ms-user-select: text;
	}
	.escluster-info-attr-ctn>li:nth-child(2){
		line-height: 30px;
		height: 30px;
	}
	.escluster-info-attr-ctn>li:nth-child(3){
		line-height: 30px;
		height: 30px;
	}
	
	.escluster-info-attr-ctn>li:nth-child(7){
		line-height: 30px;
		height: 30px;
	}
	
	#esclusterInfoStatus>li:nth-child(2){
		height: 30px;
	}
	#esclusterInfoStatus>li:nth-child(3){
		height: 30px;
	}
	#esclusterInfoStatus>li:nth-child(7){
		height: 30px;
	}
	
	.info-split{
		display: flex;
		flex-flow: row;
		border-radius: 5px;
	}
	.info-split>.info-split-box{
		flex: 1;
		text-align: center;
	}
	.info-split>.info-split-box:nth-child(n+2){
		border-left: 1px solid rgba(0,0,0, 0.2);
	}
	
	#esclutterHealthInfo{
		background-color:  #5b62f9;
		color: white;
		padding: 10px 0;
	}
	#esclusterHealthGrap{
		background: url('img/escluster/health.png') no-repeat #f1f0f6;
		background-position: 25% 40px;
		font-size: 50px;
		font-weight: bold;
		padding-left: 50%;
		text-align:center;
	    height: 160px;
	    line-height: 160px;
    	margin-bottom: 20px;
	}
	
	.info-vertical-ctn{
		display: flex;
		flex-flow: column;
		justify-content: space-between;
	    height: 100%;
	}
	
	.info-box{
		background-color: #f1f0f6;
		border-radius: 5px;
		padding: 16px;
		text-align: center;
	}
	
	#escluter-unresolve-ev{
		background-color: #5b62f9;
		color: white;
	}
	
	#escluterAlert .info-split-title::before{
		content: "●";
		margin-left: -14px;
		margin-right: 2px;
	}
	#escluterAlert>.info-split-box:first-child>.info-split-title::before{
		color: #5b62f9;
	}
	#escluterAlert>.info-split-box:last-child>.info-split-title::before{
		color: #fb8229;
	}
	
	.health-content-meter {
	    background-image: url(img/health/healty-green.png;);
	}
/*信息展示end*/	


/*图表展示start*/
	.escluster-chart-ctn>div{
		margin-bottom: 20px;
	}
	.escluster-pool-ctn{
		position:relative;
		float: left;
		border:1px solid #E5E5E5;
		width: 100%;
		height: 316px;
		background-color: #ffffff;
	}
	.escluster-connect-pool-ctn>.kp-tip{
		height: 43px;
	}
	#elasticsearchList{
		margin-top: 20px;
		height: 380px;
		width: 100%;
	}
	#escluster-search{
		float: right;
		margin-top: 7px;	
	}
	
	.escluster-node-ctn .mq-pool-ctn {
		position: relative;
		float: left;
		border: 1px solid #E5E5E5;
		width: 715px;
		height: 316px;
		background-color: #ffffff;
		margin-right: 20px;
		margin-bottom: 20px;
	}
	
	.escluster-node-ctn .mq-pool-ctn:nth-child(2n+1){
		margin-right: 20px;
	}
	
	.escluster-node-ctn .mq-pool-ctn:nth-child(2n){
		margin-right: 0;
	}

	.mq-pool-ctn>#jvmChartCtn, .mq-pool-ctn>#processChartCtn {
		width: 100%;
		height: 272px;
		box-sizing: border-box;
		padding: 20px;
	}

/*图表展示end*/
.escluster-info-content  #copySelect input{
	width: 140px!important;
}

	.eventTab {
	    border-bottom: 1px solid #e5e5e5;
	    border-radius: 4px 4px 0 0;
	    width: 100%;
	    background-color: #fafafa;
	}
	.eventTab > li {
	    height: 44px;
	    width: 120px;
	    border-right: 1px solid #e5e5e5;
	}
	.eventTab > li > a {
	    cursor: pointer;
	    line-height: 28px;
	    text-align: center;
	}

.jvm-box{
	display: inline-block;
	height: 45px;
	width: 31%;
	text-align: center;
	border-radius: 5px;
	background-color: #f1f0f6;
}
.jvm-box{
	padding-top: 2px;
	margin-left: 10px;
}
.jvm-box:hover{
	color: #fff;
	background-color: #13B1F5;
}
.jvm-box span{
	font-weight: bold;
	font-size: 2em;
}
</style>

<div class="escluster-main-node-ctn">

<!-- 信息start -->
	<div class="escluster-node-ctn">

		<div class="divTitle">elasticsearch节点详情</div>
		<div class="escluster-node-body-ctn">
			<div class="escluster-node-body escluster-info-health">
				<div class="divTitle">健康度</div>
				<div class="escluster-info-content">
					<div data-role="finehealthimg" class="health-content-meter" >
						<div id="esclusterPieActive" class="bar60">
							<div  id="esclusterPieActive1" class="bar2"></div>
						</div> 
						<div class="app-base-health-txt">
							<div class="health-content-meter-number">
								<span data-role="esclusterHealthNum" class="health-content-meter-number-text">NA</span>
							</div>
							<div class="health-content-meter-discrib">
								<span data-role="esclusterHealthStatus" class="health-content-meter-discrib-text">健康度</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="escluster-node-body jiqun-info-attribute">
				<div class="divTitle">节点基本属性</div>
				<div class="escluster-info-content">
					<ul class="escluster-info-attr-ctn">
						<li class="escluster-info-14px escluster-base-li1-title ms-hover" data-category="serviceName">节点名称：</li>
						<li class="escluster-info-14px escluster-base-li1-title ms-hover" data-category="appName">所属系统应用：</li>
						<li class="escluster-info-14px escluster-base-li1-title" data-category="serverName">版本号：</li>
						<li class="escluster-info-14px">节点ip：</li>
						<li class="escluster-info-14px">监控状态：</li>
					</ul>
					<ul id="esclusterInfoStatus" class="escluster-info-attr-ctn">
						<li data-role="name" class="escluster-info-14px selectableText" title="tips1"></li>
						<li data-role="appName" class="escluster-info-14px selectableText ms-hover"></li>
						<li data-role="version" class="escluster-info-14px selectableText ms-hover"></li>
						<!-- <li data-role="objClass" class="escluster-info-14px ms-hover" title="WAS 6.1.0.29">WAS 6.1.0.29</li>
						<li data-role="manageIp" class="was-info-14px" title="21.4.33.175">21.4.33.175</li>
						<li data-role="managePort" class="was-info-14px" title="未知">未知</li>
						<li class="was-info-14px"><div id="copySelect"><input type="text" value="未知"><i class="fa fa-chevron-down"></i><ul><li>未知</li></ul></div></li>
						<li data-role="nodeName" class="was-info-14px" title="appNode01">appNode01</li> -->
						<li data-role="nodeIp" class="escluster-info-14px">是</li>
						<li class="escluster-info-14px">
							<span data-role="esclusterStatus" class="base-bggreen escluster-info-status"></span>
						</li>
					</ul>
				</div>
			</div>
			<div class="escluster-node-body escluster-info-running">
				<div class="divTitle">重点指标</div>
				<div class="escluster-info-content">
					<ul class="escluster-info-running-status">
						<li>
							<p class="escluster-info-12px">CPU使用率</p>
							<p data-role="cpu" class="escluster-info-30px">NA%</p>
							
						</li>
						<li>
							<p class="escluster-info-12px">内存使用率</p>
							<p data-role="mem" class="escluster-info-30px">NA%</p>
						</li>
						<li>
							<p class="escluster-info-12px">文件数</p>
							<p data-role="docs" class="escluster-info-30px">NA</p>
						</li>
						<li>
							<p class="escluster-info-12px">节点类型</p>
							<p data-role="nodeType" class="escluster-info-30px" style="font-size: 24px">NA</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="escluster-node-body escluster-info-warning">
				<div class="divTitle">中间件报警</div>
				<div class="escluster-info-content">
					<div class="escluster-info-warning-ctn">
						<div class="escluster-info-warning-unsolve-total escluster-info-warning-total" align="center">
							<p class="escluster-info-12px">未解决</p>
							<p data-role="totalNum" class="escluster-info-36px">NA</p>
						</div>
						<div class="escluster-info-warning-error escluster-info-warning-ohter"
							id="escluster-click-warnon">
							<p>
								<i class="fa fa-exclamation-circle fa-color-red"> </i> <span
									class="escluster-info-14px">告警未解决</span> <span data-role="warnNoHand"
									class="escluster-info-26px">NA</span>
							</p>
						</div>
						<div
							class="escluster-info-warning-unsolve-warning escluster-info-warning-ohter">
							<p>
								<i class="fa fa-exclamation-circle fa-color-orange"> </i> <span
									class="escluster-info-14px">预警未解决</span> <span data-role="preNoHand"
									class="escluster-info-26px">NA</span>
							</p>
						</div>
					</div>
					<div class="escluster-info-warning-ctn">
						<div class="escluster-info-warning-solve-total escluster-info-warning-total" align="center">
							<p class="escluster-info-12px">已解决</p>
							<p data-role="dayHand" class="escluster-info-36px">NA</p>
						</div>
						<div class="escluster-info-warning-error escluster-info-warning-ohter"
							id="escluster-click-warnhandle">
							<p>
								<i class="fa fa-exclamation-circle fa-color-normal"> </i> <span
									class="escluster-info-14px">告警已解决</span> <span data-role="warnHand"
									class="escluster-info-26px">NA</span>
							</p>
						</div>
						<div class="escluster-info-warning-solve-warning escluster-info-warning-ohter">
							<p>
								<i class="fa fa-exclamation-circle fa-color-normal"> </i> <span
									class="escluster-info-14px">预警已解决</span> <span data-role="preHand"
									class="escluster-info-26px">NA</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			
			<div class="mq-pool-ctn">
				<ul class="eventTab nav nav-tabs">
		           	<li class="active underLine" data-role="eventlist">
		  	           <a href="#cpuuse" data-toggle="tab">cpu使用率</a>
		           	</li>
		           	<li class="sysstart-module-list" data-role="eventlist">
		  	           <a href="#memuse" data-toggle="tab">内存使用率</a>
		           	</li>
		         </ul>
		         
		         <div class="tab-content">
		         	<div id="cpuuse" class="tab-pane active">
		         		<div id="cpuuseChart" style="width:100%;height:260px;margin-bottom:40px;"></div>
		         	</div>
		         	<div id="memuse" class="tab-pane active">
		         		<div id="memuseChart" style="width:100%;height:260px;margin-bottom:40px;"></div>
		         	</div>
		         </div>
			</div>
			
			<div class="mq-pool-ctn">
				<div class="kp-tip">
					<span>JVM堆使用大小</span>
				</div>
				<div id="jvmSizeChart" style="width:100%;height:200px;margin-left:20px;margin-bottom:20px;"></div>
				<div>
					<span class="jvm-box">JVM堆使用率<br/><span id="jvmUsage"></span><span>%</span></span>
					<span class="jvm-box">JVM堆最大使用大小<br/><span id="jvmMax"></span><span>MB</span></span>
					<span class="jvm-box">JVM堆当前使用大小<br/><span id="jvmCurrent"></span><span>MB</span></span>
				</div>
			</div>
			
			<div class="mq-pool-ctn">
				<ul class="eventTab nav nav-tabs">
		           	<li class="active underLine" data-role="eventlist">
		  	           <a href="#thread" data-toggle="tab">线程数</a>
		           	</li>
		           	<li class="sysstart-module-list" data-role="eventlist">
		  	           <a href="#linethread" data-toggle="tab">排队线程数</a>
		           	</li>
		           	<li class="sysstart-module-list" data-role="eventlist">
		  	           <a href="#refusethread" data-toggle="tab">拒绝线程数</a>
		           	</li>
		         </ul>
		         
		         <div class="tab-content">
		         	<div id="thread" class="tab-pane active">
		         		<div id="threadChart" style="width:100%;height:260px;margin-bottom:40px;"></div>
		         	</div>
		         	<div id="linethread" class="tab-pane active">
		         		<div id="linethreadChart" style="width:100%;height:260px;margin-bottom:40px;"></div>
		         	</div>
		         	<div id="refusethread" class="tab-pane active">
		         		<div id="refusethreadChart" style="width:100%;height:260px;margin-bottom:40px;"></div>
		         	</div>
		         </div>
			</div>
			
			<div class="mq-pool-ctn">
				<ul class="eventTab nav nav-tabs">
		           	<li class="active underLine" data-role="eventlist">
		  	           <a href="#balance" data-toggle="tab">平均负载</a>
		           	</li>
		           	<li class="sysstart-module-list" data-role="eventlist">
		  	           <a href="#segment" data-toggle="tab">片段数</a>
		           	</li>
		         </ul>
		         
		         <div class="tab-content">
		         	<div id="balance" class="tab-pane active">
		         		<div id="balanceChart" style="width:100%;height:260px;margin-bottom:40px;"></div>
		         	</div>
		         	<div id="segment" class="tab-pane active">
		         		<div id="segmentChart" style="width:100%;height:260px;margin-bottom:40px;"></div>
		         	</div>
		         </div>
			</div>
			
	         
	         
		</div>
	</div>
<!-- 信息end -->



</div>