<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.appMainView-count {
		display: flex;
		flex-direction: column;
	}
	.appMainView-count>span{
		display: flex;
		flex-direction: column;
	    box-sizing: border-box;
	    border-radius: 3px;
	    color: #fff;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.appMainView-count>span:nth-child(1):before{
		content: attr(beforeContent);
		height: 30px;
	}
	.appMainView-count>span:nth-child(1){
	    width: 100%;
	    color: #2B2933;
	    height: 160px;
	    margin-bottom: 10px;
	    padding-left: 100px;
	    font-size: 20px;
	    font-weight: bolder;
	    background: #F1F0F5 url(img/agentManagerNew/agent.jpg) no-repeat 0 center; 
	    white-space: pre-wrap;
        padding-top: 20px;
        padding-right: 5px;
	}
	.appMainView-count>span:nth-child(2){
		width: 100%;
		height: calc(100% - 150px);
		display: flex;
		flex-direction: column;
		padding:15px 20px;
	  	font-weight: normal;
	  	background: #5B62FB;
	}
	.appMainView-count>span>span{
		white-space: nowrap;
	  	overflow: hidden;
	  	text-overflow: ellipsis;
	}
	.appMainView-count>span>span:before{
		display: inline-block;
		margin-right: 10px;
	}
	.appMainView-count>span>span:nth-child(1):before{
		content:"当前日志总量 :";
	}
	
	.appMainView-KPI {
		height: 217px;
	}
	.appMainView-KPI>span {
		width: calc((100% - 10px)/2);
		height: calc((100% - 10px)/2);
		background: #F1F0F5;
		border-radius: 2px;
		box-sizing: border-box;
		font-size: 20px;
		padding: 30px 10px 10px 10px;
		margin-bottom: 10px;
		margin-right: 10px;
		display: inline-block;
		text-align: center;
	}
	.appMainView-KPI>span:nth-child(2n){
		margin-right: 0;
	}
	.appMainView-KPI>span:nth-child(n+3){
		margin-bottom: 0;
	}

	.appMainView-KPI>span:before {
		display: block;
		text-align: center;
		width: 100%
		color: #5C5A66;
		font-size: 14px;
	}
	.appMainView-KPI>span:nth-child(1):before {
		content: "主机数";
	}
	.appMainView-KPI>span:nth-child(2):before {
		content: "日志源数";
	}
	.appMainView-KPI>span:nth-child(3):before {
		content: "流量数";
	}
	.appMainView-KPI>span:nth-child(4):before {
		content: "事件数";
	}
	
	.appMainView-echarts {
		width: calc(100% - 201px);
		height: 217px;
		float: left;
		margin-right: 20px;
	}
	
	.appMainView-events {
		float: left;
		width: 181px;
		height: 217px;
		margin-top: -5px;
	}
	.appMainView-events span:BEFORE {
		font-size: 14px;
		display: block;
		margin-bottom: 4px;
		color: #5c5a66;
	}
	
	.appMainView-events>span {
		position: relative;
		float: left;
		width: calc(100% - 10px);
		background: #f1f0f5;
		border-radius: 2px;
		margin: 5px;
		color: #2b2933;
		text-align: center;
		font-size: 24px;
		box-sizing: border-box;
		padding-top: 6px;
	}
	
	.appMainView-events>span:nth-child(1) {
		background: #5b62f9;
		color: #fff;
		font-size: 36px;
		font-weight: 400;
		padding-top: 10px;
		height: 70px;
	}
	
	.appMainView-events>span:nth-child(1):before {
		content: "未解除事件总数";
		color: #ffffff !important;
	}
	.appMainView-events>span:nth-child(3){
		padding-top:10px;
		height: 64px;
	}
	.appMainView-events>span:nth-child(3):before {
		content: "当日事件总数";
		color: #5c5a66;
		font-size: 14px;
	}
	
	.appMainView-events>span:nth-child(2) {
		background-image: linear-gradient(to bottom, #AEADB3 0%, #AEADB3 100%);
		background-size: 1px 50px;
		background-position: center 10px;
		background-repeat: no-repeat;
		display: flex;
		padding-top:10px;
		height: 64px;
	}
	
	.appMainView-events>span>span:AFTER {
		content: "";
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		top: 8px;
		left: 25%;
	}
	.appMainView-events>span>span {
		float: left;
		width: 50%;
		position: relative;
	}
	
	.appMainView-events>span>span:nth-child(1):before {
		content: "预警";
	}
	
	.appMainView-events>span>span:nth-child(2):before {
		content: "告警";
	}
	
	.appMainView-events>span>span:nth-child(1):after {
		background: #5e63fd;
	}
	
	.appMainView-events>span>span:nth-child(2):after {
		background: #fc862f;
	}
	.filterBtn{
		position: absolute;
		z-index: 3;
	}
	.filterBtn>span{
		padding: 10px 20px;
	    position: relative;
	    display: inline-block;
	    border: 1px solid #ccc;
	    text-align: center;
	    line-height: 2px;
	    box-sizing: border-box;
	    height: 24px;
	    cursor: pointer;
	    margin-bottom: 10px;
	    font-size: 12px;
	    font-weight: normal;
	}
	.filterBtn>span+span{
		margin-left: -1px;
	}
	.filterBtn>span.active{
		color: #5b62f9;
	    z-index: 2;
	    border-color: #5b62f9;
	}
	.button>button{
		padding: 0 10px;
	}
	.button>button.active{
		color: #5b62f9 !important;
		border: 1px solid #b3b7ff;
		background-color: #f2f3ff;
	}
</style>
<div>
	<div class="appMainView-layout1" style="display: flex;height: 320px;">
		<section class="panel" style="flex: none;width: 284px;margin-right: 20px;">
			<p class="title">统计</p>
			<div class="content">
				<div class="appMainView-count">
					<span id="version">日志平台</span>
					<span><span id="ip">18.13GB</span></span>
				</div>
			</div>
		</section>
		
		<section class="panel" style="flex: none;width: 388px;margin-right: 20px;">
			<p class="title">关键KPI汇总统计</p>
			<div class="content">
				<div class="appMainView-KPI">
					<span id="linuxCount">1</span><span id="aixCount">
					1</span><span id="windowsCount">
					4M</span><span id="javaCount">
					2</span>
				</div>
			</div>
		</section>

		<section class="panel" style="flex: auto;">
			<p class="title">指标异常趋势</p>
			<div class="content">
				<div class="appMainView-echarts" id="eEvent" ></div>
				<div class="appMainView-events" id="baseContent">
					<span class="single-block" id="unClosed" label-flag="info">0</span>
					<span id="currdata"> 
						<span id="waringCount" label-flag="info">-</span> 
						<span id="alarmCount" label-flag="info">0</span>
					</span> 
					<span class="single-block" id="eventNum" label-flag="info">-</span>
				</div>
			</div>
		</section>
	</div>
</div>
<div style="display: flex;">
	<section class="panel" style="flex: 1;margin-right: 20px;">
		<p class="title">交易量TPS</p>
		<div class="content">
			<div id="eTps" style="width: 100%;height: 180px;"></div>
		</div>
	</section>
	<section class="panel" style="flex: 1;">
		<p class="title">交易耗时</p>
		<div class="content">
			<div id="eSS" style="width: 100%;height: 180px;"></div>
		</div>
	</section>
</div>		
<section class="panel">
	<p class="title">交易日志列表</p>
	<div class="content">
		<div class="filterBtn"><span class='active'>按IP</span><span>错误码</span><span>交易时长</span></div>
		<table id="dataTable" class="display dataTable table" style="height: auto;">
			<thead>
				<tr>
					<th>序号</th>
					<th>日志流水号</th>
					<th>日志路径</th>
					<th>主机IP</th>
					<th>错误码</th>
					<th>交易时长(ms)</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>c4ebd514-0746-3ca0-bf32-512e43373d8d</td>
					<td>/home/aim/camaApp/log/app/20180525/asda/G1_asda.log</td>
					<td>10.9.3.168</td>
					<td>-</td>
					<td>4872559</td>
				</tr>
				<tr>
					<td>2</td>
					<td>ac47705a-8cf4-3935-a39d-9621e9e6a488</td>
					<td>/home/aim/camaApp/log/app/20180525/server/G1_server.log</td>
					<td>10.9.3.168</td>
					<td>-</td>
					<td>4806526</td>
				</tr>
				<tr>
					<td>3</td>
					<td>c85453fc0-b13c-38d9-a13c-19c7dd166fb1</td>
					<td>/home/aim/camaApp/log/app/20180525/server/M023/G1_server_M023_25.log</td>
					<td>10.9.3.168</td>
					<td>-</td>
					<td>4817307</td>
				</tr>
				<tr>
					<td>4</td>
					<td>233196095859540500000000000000002472</td>
					<td>/home/aim/camaApp/log/app/20180525/server/M023/G1_server_M023_24.log</td>
					<td>10.9.3.168</td>
					<td>-</td>
					<td>43657</td>
				</tr>
				<tr>
					<td>5</td>
					<td>233196095859540500000000000000002471</td>
					<td>/home/aim/camaApp/log/app/20180525/server/M023/G1_server_M023_23.log</td>
					<td>10.9.3.168</td>
					<td>-</td>
					<td>50405</td>
				</tr>
				<tr>
					<td>6</td>
					<td>233196095859540500000000000000002470</td>
					<td>/home/aim/camaApp/log/app/20180525/server/M023/G1_server_M023_22.log</td>
					<td>10.9.3.168</td>
					<td>-</td>
					<td>2251</td>
				</tr>
				<tr>
					<td>7</td>
					<td>233196095859540500000000000000002469</td>
					<td>/home/aim/camaApp/log/app/20180525/server/M023/G1_server_M023_21.log</td>
					<td>10.9.3.168</td>
					<td>-</td>
					<td>2275</td>
				</tr>
				<tr>
					<td>8</td>
					<td>233196095859540500000000000000002468</td>
					<td>/home/aim/camaApp/log/app/20180525/server/M023/G1_server_M023_20.log</td>
					<td>10.9.3.168</td>
					<td>-</td>
					<td>6646</td>
				</tr>
				<tr>
					<td>9</td>
					<td>233196095859540500000000000000002467</td>
					<td>/home/aim/camaApp/log/app/20180525/aweb/C016/G1_aweb_C016_16.log</td>
					<td>10.9.3.168</td>
					<td>-</td>
					<td>23381</td>
				</tr>
				<tr>
					<td>10</td>
					<td>233196095859540500000000000000002466</td>
					<td>/home/aim/camaApp/log/app/20180525/aweb/G1_aweb.log</td>
					<td>10.9.3.168</td>
					<td>-</td>
					<td>41104</td>
				</tr>
			</tbody>
		</table>
		<!-- <div class="button" style="float: right; margin: 10px 0;">
			<button class="disabled">首页</button>
			<button class="disabled">上一页</button>
			<button class="active">1</button>
			<button>2</button>
			<button>3</button>
			<button>4</button>
			<button>5</button>
			...
			<button>180</button>
			<button>下一页</button>
			<button>尾页</button>
		</div> -->
	</div>
</section>
