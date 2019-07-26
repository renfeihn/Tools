<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%--页面前缀 escluster--%>
<style type="text/css">


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

	.escluster-info-ctn{
		margin-bottom: 20px;
		border: 1px solid #E5E5E5;
		height: 816px;
		background-color: #FFFFFF;
	}
	.escluster-info-body-ctn{
		height: 326px;
		padding:20px;
	}
	.escluster-info-body{
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
		width: 420px;
		margin:0px;
	}
	.escluster-info-running{
		width: 340px;
	}
	.escluster-info-attribute{
		width: calc(100% - 282px - 342px - 422px - 62px);
	}
	.escluster-info-list{
		width: 100%;
	}

	/*中间件报警*/
	.escluster-info-warning-ctn{
		float: left;
		margin-right: 20px;
		width: 155px;
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
		width: 135px;
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
	
	.escluster-main-ctn .mq-pool-ctn {
		position: relative;
		float: left;
		border: 1px solid #E5E5E5;
		width: calc(50% - 12px);
		height: 316px;
		margin-right: 20px;
		background-color: #ffffff;
		margin-bottom: 20px;
	}
	
	.mq-pool-ctn:nth-child(2n+1){
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




</style>

<div class="escluster-main-ctn">

	<div class="escluster-info-body-ctn">
			<div class="escluster-info-body escluster-info-health">
				<div class="divTitle">健康度</div>
				<div class="escluster-info-content">
					<canvas width="240" height="230" id="health">对不起，您的浏览器版本过低，无法显示</canvas>
					<!-- <div data-role="finehealthimg" class="health-content-meter" >
						<div id="esclusterPieActive" class="bar60">
							<div  id="esclusterPieActive1" class="bar2"></div>
						</div> 
						<div class="app-base-health-txt">
							<div class="health-content-meter-number">
								<span data-role="esclusterHealthNum" class="health-content-meter-number-text">0</span>
							</div>
							<div class="health-content-meter-discrib">
								<span data-role="esclusterHealthStatus" class="health-content-meter-discrib-text">健康度</span>
							</div>
						</div>
					</div> -->
				</div>
			</div>
			<div class="escluster-info-body escluster-info-attribute">
				<div class="divTitle">集群基本属性</div>
				<div class="escluster-info-content">
					<ul class="escluster-info-attr-ctn">
						<li class="escluster-info-14px escluster-base-li1-title ms-hover" data-category="serviceName">集群名称：asda</li>
						<li class="escluster-info-14px escluster-base-li1-title ms-hover" data-category="appName">所属系统应用：本地日志平台</li>
						<li class="escluster-info-14px escluster-base-li1-title" data-category="serverName">版本号：7.1</li>
						<li class="escluster-info-14px">监控状态：已监控</li>
						<li class="escluster-info-14px">集群状态：正常</li>
					</ul>
					<ul id="esclusterInfoStatus" class="escluster-info-attr-ctn">
						<li data-role="cluster_name" class="escluster-info-14px selectableText"></li>
						<li data-role="app_name" class="escluster-info-14px selectableText ms-hover"></li>
						<li data-role="version" class="escluster-info-14px selectableText ms-hover"></li>
						<li class="escluster-info-14px">
							<span data-role="monitor_status" class="escluster-info-status"></span>
						</li>
						<li class="escluster-info-14px">
							<span data-role="esclusterStatus" class="escluster-info-status"></span>
						</li>
					</ul>
				</div>
			</div>
		<div class="escluster-info-body escluster-info-running">
			<div class="divTitle">关键KPI统计</div>
			<div class="escluster-info-content">
				<ul class="escluster-info-running-status">
					<li>
						<p class="escluster-info-12px">分片数</p>
						<p data-role="segments_count" class="escluster-info-30px">20</p>
					</li>
					<li>
						<p class="escluster-info-12px">索引数</p>
						<p data-role="indices_count" class="escluster-info-30px">0</p>
					</li>
					<li>
						<p class="escluster-info-12px">文档数</p>
						<p data-role="docs_count" class="escluster-info-30px">51232</p>
					</li>
					<li>
						<p class="escluster-info-12px">消耗物理内存</p>
						<p data-role="store_count" class="escluster-info-30px">0</p>
					</li>
				</ul>
			</div>
		</div>
		<div class="escluster-info-body escluster-info-warning">
				<div class="divTitle">中间件报警</div>
				<div class="escluster-info-content">
					<div class="escluster-info-warning-ctn">
						<div class="escluster-info-warning-unsolve-total escluster-info-warning-total" align="center">
							<p class="escluster-info-12px">未解决</p>
							<p data-role="totalNum" class="escluster-info-36px">0</p>
						</div>
						<div class="escluster-info-warning-error escluster-info-warning-ohter"
							id="escluster-click-warnon">
							<p>
								<i class="fa fa-exclamation-circle fa-color-red"> </i> <span
									class="escluster-info-14px">告警未解决</span> <span data-role="warnNoHand"
									class="escluster-info-26px">0</span>
							</p>
						</div>
						<div
							class="escluster-info-warning-unsolve-warning escluster-info-warning-ohter">
							<p>
								<i class="fa fa-exclamation-circle fa-color-orange"> </i> <span
									class="escluster-info-14px">预警未解决</span> <span data-role="preNoHand"
									class="escluster-info-26px">0</span>
							</p>
						</div>
					</div>
					<div class="escluster-info-warning-ctn">
						<div class="escluster-info-warning-solve-total escluster-info-warning-total" align="center">
							<p class="escluster-info-12px">已解决</p>
							<p data-role="dayHand" class="escluster-info-36px">0</p>
						</div>
						<div class="escluster-info-warning-error escluster-info-warning-ohter"
							id="escluster-click-warnhandle">
							<p>
								<i class="fa fa-exclamation-circle fa-color-normal"> </i> <span
									class="escluster-info-14px">告警已解决</span> <span data-role="warnHand"
									class="escluster-info-26px">0</span>
							</p>
						</div>
						<div class="escluster-info-warning-solve-warning escluster-info-warning-ohter">
							<p>
								<i class="fa fa-exclamation-circle fa-color-normal"> </i> <span
									class="escluster-info-14px">预警已解决</span> <span data-role="preHand"
									class="escluster-info-26px">0</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="escluster-info-body escluster-info-list">
				<div class="divTitle">集群信息</div>
				<div class="kpiCollect-table-ctn">
					<table id="dataTable" class="display dataTable table KPICollect-table">
						<thead>
							<tr>
								<th>集群名称</th>
								<th>集群状态</th>
								<th>节点数</th>
								<th>数据节点数</th>
								<th>活跃分片数</th>
								<th>活跃主分片数</th>
								<th>未分配分片数</th>
								<th>活动分片百分比(%)</th>
								<th>任务等待数</th>
								<th>文档数</th>
								<th>消耗物理内存(MB)</th>
								<th>查询效率(MB)</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					<!-- 数据表格End -->
					<!-- 跳转到某页Start -->
					<span class="KPICollect-jumpPage">跳转到<input id="toPage" type="text" />页</span>
					<!-- 跳转到某页End -->
				</div>
			</div>
		<div class="mq-pool-ctn">
			<div class="kp-tip">
				<span>查询速度</span>
			</div>
			<div id="searchRateChart" style="height:260px;margin-bottom:40px;"></div>
		</div>
		<div class="mq-pool-ctn">
			<div class="kp-tip">
				<span>索引速度</span>
			</div>
			<div id="indexRateChart" style="width:100%;height:260px;margin-bottom:40px;"></div>
		</div>
	</div>
		
</div>