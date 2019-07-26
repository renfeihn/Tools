<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%--页面前缀 escluster--%>
<style type="text/css">

	.escluster-main-ctn,.escluster-chart-ctn{
		padding: 20px;
	}
	.escluster-info-ctn{
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
	}
	.escluster-info-content{
		height: 242px;
		padding:20px;
	}
	.escluster-info-health{
		width: 426px;
	}
	.escluster-info-warning{
		width: 500px;
		margin:0px;
	}
	.escluster-info-running{
		width: 540px;
	}
	.escluster-info-attribute{
		width: 306px;
	}

	/*中间件报警*/
	.escluster-info-warning-ctn{
		float: left;
		margin-right: 20px;
		width: 161px;
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
		width: 220px;
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
		padding: 10px;
		text-align: left;
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

/*图表展示end*/
.escluster-info-content  #copySelect input{
	width: 140px!important;
}


</style>

<div class="escluster-main-ctn">

	<div class="kpiCollect-table-ctn">
		<table id="dataTable" class="display dataTable table KPICollect-table">
			<thead>
				<tr>
					<th>节点名称</th>
					<th>状态</th>
					<th>ip地址</th>
					<th>版本号</th>
					<th>角色</th>
					<th>CPU使用率(%)</th>
					<th>MEM使用率(%)</th>
					<th>JVM使用率(%)</th>
					<th>查询速度(/ms)</th>
					<th>索引速度(/ms)</th>
					<th>文档数</th>
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