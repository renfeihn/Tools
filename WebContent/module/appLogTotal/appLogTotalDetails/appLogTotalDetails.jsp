<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
	.appLogTotalDetails-echarts {
		height: 300px;
		width: 100%;
		margin-bottom: 5px;
	}
	.appLogTotalDetails-layout2{
		display: flex;
		height: 320px;
	} 

	/*基本信息*/
	.appLogTotalDetails-queue>span{
		display: flex;
		flex-direction: column;
	    box-sizing: border-box;
	    border-radius: 3px;
	    color: #fff;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.appLogTotalDetails-queue>span:nth-child(1):before{
		content: attr(beforeContent);
		height: 30px;
	}
	.appLogTotalDetails-queue>span:nth-child(1){
	    width: 100%;
	    color: #2B2933;
	    height: 160px;
	    line-height: 140px;
	    margin-bottom: 10px;
	    padding-left: 144px;
	    font-size: 20px;
	    font-weight: bolder;
	   	background: #F1F0F5 url(img/agentManagerNew/agent.jpg) no-repeat 20px center; 
	}
	.appLogTotalDetails-queue>span:nth-child(2){
		width: 100%;
		height: calc(100% - 150px);
		display: flex;
		flex-direction: column;
		padding:15px 20px;
	  	font-weight: normal;
	  	background: #5B62FB;
	}
	.appLogTotalDetails-queue>span>span{
		white-space: nowrap;
	  	overflow: hidden;
	  	text-overflow: ellipsis;
	}
	.appLogTotalDetails-queue>span>span:before{
		display: inline-block;
		margin-right: 10px;
	}
	.appLogTotalDetails-queue>span>span:nth-child(1):before{
		content:"采集类型 :";
	}

	.appLogTotalDetails-app {
		height: 225px;
		display: flex;
		flex-wrap: wrap;
	}
	.appLogTotalDetails-app>span:before {
		display: block;
		font-size: 14px;
		margin-top: 11px;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #72717D;
	}
	.appLogTotalDetails-app>span:nth-child(1):before {
		content: "采集速度";
	}
	.appLogTotalDetails-app>span:nth-child(2):before {
		content: "采集总量";
	}
	.appLogTotalDetails-app>span:nth-child(3):before {
		content: "交易量";
	}
	.appLogTotalDetails-app>span:nth-child(4):before {
		content: "平均耗时";
	}
	.appLogTotalDetails-app>span {
		width: calc((100% - 10px)/2);
		height: 100px;
		background: #F1F0F5;
		border-radius: 2px;
		font-size: 20px;
		font-weight: 400;
		line-height: 22px;
		text-align: center;
		padding: 20px 0;
		box-sizing: border-box;
	}
	.appLogTotalDetails-app>span:nth-child(2n+1) {
		margin-right: 10px;
	}
	.appLogTotalDetails-app>span:nth-child(n+3) {
		margin-top: 10px;
	}
	/*事件*/
	.appLogTotalDetails-event {
		float: right;
		width: 180px;
		height: 220px;
	}
	.appLogTotalDetails-event>span:nth-child(1):BEFORE {
		content: '未解决事件总数';
	}
	.appLogTotalDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
		content: '预警';
		display: block;
		font-size: 14px;
		color: #666;
	}
	.appLogTotalDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
		content: '告警';
		display: block;
		font-size: 14px;
		color: #666;
	}
	.appLogTotalDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
		background-color: #5b62f9;
	}
	.appLogTotalDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
		background-color: #fb8229;
	}
	.appLogTotalDetails-event>span:nth-child(3):BEFORE {
		content: '当日事件总数';
		color: #666;
	}
	.appLogTotalDetails-event>span:nth-child(1) {
		background-color: #5b62f9;
		color: #FFF;
		font-size: 36px;
		height: 70px;
	}
	.appLogTotalDetails-event>span>span:AFTER {
		content: '';
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		left: 22px;
		top: 7px;
	}
	.appLogTotalDetails-event>span>span {
		flex: auto;
		position: relative;
	}
	.appLogTotalDetails-event>span+span {
		margin-top: 10px;
	}
	.appLogTotalDetails-event>span:BEFORE {
		display: block;
		margin-bottom: 6px;
		font-size: 14px;
	}
	.appLogTotalDetails-event>span {
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
	.appLogTotalDetails-event>span:nth-child(2) {
		flex-direction: row;
		background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%) no-repeat center center;
		background-size: 1px 50px; 
	}
	
	.appLogTotalDetails-event>span:nth-child(1),
	.appLogTotalDetails-event>span:nth-child(2){
		cursor: pointer;
	}

	/*文件视图*/
	.appLogTotalDetails-fileView{
		flex: 2;
		padding: 10px;
		border-right: 1px solid #ebebed;
	}
	.appLogTotalDetails-fileViewNav{
		padding: 0 20px;
	    font-size: 12px;
	    font-weight: normal;
	    line-height: 40px;
	    background-color: #fafafc;
	    color: #636363;
		/*border-bottom: 1px solid #e0dfe6;*/
	}
	.appLogTotalDetails-fileViewNav span{
		cursor: pointer;
	}
	.appLogTotalDetails-fileViewNav span:hover{
		text-decoration: underline;
		color: #5965f0;
	}
	.appLogTotalDetails-fileViewNav span.active{
		cursor: default;
		color: #000;
		font-weight: bold;
	}
	.appLogTotalDetails-fileViewNav span.active:hover{
		color: #000;
		text-decoration: none;
	}
	.appLogTotalDetails-fileViewNav span+span:before{
		display: inline-block;
		content: '';
		width: 6px;
		height: 6px;
		border-top: 1px solid #636363;
		border-right: 1px solid #636363;
		-webkit-transform: rotate(45deg);
		   -moz-transform: rotate(45deg);
		    -ms-transform: rotate(45deg);
		     -o-transform: rotate(45deg);
		        transform: rotate(45deg);
		margin-right: 5px;
		margin-bottom: 1px;
	}

	.appLogTotalDetails-fileViewList{
		margin: 0;
		padding: 10px;
		box-sizing: border-box;
		width: 100%;
		height: calc(100% - 240px);
		overflow-y: auto;
	}
	.appLogTotalDetails-fileViewList>li.fileViewItem{
		display: inline-block;
		border: 1px solid transparent;
		height: 90px;
		width: 90px;
		margin: 5px;
		border-radius: 3px;
		color: #636363;
		padding: 10px 5px;
		cursor: pointer;
		font-size: 12px;
		font-weight: normal;
		text-align: center;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
	}
	/*.appLogTotalDetails-fileViewList>li.fileViewItem:hover{
		border: 1px solid #5965f0;
	}*/
	.appLogTotalDetails-fileViewList>li.fileViewItem:not(.active):before{
		content: '';
		width: 0;
		height: 0;
		top: 0;
		left: -1px;
		display: block;
		border-top: 1px solid #5965f0;
		border-right: 1px solid #5965f0;
		position: absolute;
		z-index: 1;
	}
	.appLogTotalDetails-fileViewList>li.fileViewItem:not(.active):hover:before{
		content: '';
		width: 100%;
		height: 100%;
		border-radius: 3px;
		animation: border .15s linear 1;
	}
	.appLogTotalDetails-fileViewList>li.fileViewItem:not(.active):after{
		content: '';
	    width: 0;
	    height: 0;
	    bottom: 0;
	    right: -1px;
	    display: block;
	    position: absolute;
	    z-index: 1;
	    border-bottom: 1px solid #5965f0;
	    border-left: 1px solid #5965f0;
	}
	.appLogTotalDetails-fileViewList>li.fileViewItem:not(.active):hover:after{
		content: '';
		width: 100%;
		height: 100%;
		border-radius: 3px;
		animation: border2 .3s linear 1;
	}
	@keyframes border{
		0%{
			width: 0;
			height: 0;
		}
		50%{
			width: 100%;
			height: 0;
		}
		100%{
			width: 100%;
			height: 100%;
		}

	}
	@keyframes border2{
		0%{
			width: 0;
			height: 0;
		}
		50%{
			width: 0;
			height: 0;
		}
		75%{
			width: 100%;
			height: 0;
		}
		100%{
			width: 100%;
			height: 100%;
		}
	}
	.appLogTotalDetails-fileViewList>li.fileViewItem.active{
		background: #e7f2fe;
		border: 1px solid transparent !important;
	}

	.appLogTotalDetails-fileViewList>li.fileViewItem.active .fileViewItemImg{
		color: #5c5a65;
	}
	.fileViewItem .fileViewItemImg{
		font-size: 50px;
	    font-weight: normal;
	    color: #e0dfe6;
	}
	.fileViewItem .fileViewItemName{
		white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.appLogTotalDetails-fileNoList{
		width: 100%;
		height: 200px;
		border-top: 1px solid #ebebed;
		font-size: 12px;
		font-weight: normal;
	}
	.appLogTotalDetails-fileNoList ul{
		margin: 0;
	}
	.appLogTotalDetails-fileNoList ul>li{
		box-sizing: border-box;
		padding: 10px;
		margin: 0 20px;
	}
	.appLogTotalDetails-fileNoList ul>li:nth-child(2n){
		background-color: #fafafc;
	}

	.appLogTotalDetails-echartsArea{
		flex: 1;
		padding: 10px;
		font-size: 12px;
	}
	.appLogTotalDetails-echartsArea>div{
		margin-top: 10px;
		width: 100%;
		height: 100px;
	}
	.appLogTotalDetails-echartsArea>div:first-child{
		margin: 0;
	}
</style>

<div class="appLogTotalDetails-layout1" style="height: 320px;display: flex;">
	<section class="panel" style="flex: none;width:284px;margin-right: 20px;">
		<p class="title">基本信息</p>
		<div class="content appLogTotalDetails-queue">
			<span id="version" beforeContent="Linux">-</span>
			<span><span id="ip">-</span></span>
		</div>
	</section>
	<section class="panel" style="width: 390px;margin-right: 20px;">
		<p class="title">应用汇总</p>
		<div class="content">
			<div class="appLogTotalDetails-app">
				<span id="cpu">-</span><span id="mem">-</span>
				<span id="keyBufferRate">-</span><span id="queryCacheRate">-</span>
			</div>
		</div>
	</section>
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="appLogTotalDetails-event">
				<span id="alarmWaring">0</span>
				<span>
					<span id="waringCount">-</span>
					<span id="alarmCount">-</span>
				</span>
				<span id="dayEventCount">-</span>
			</div>
			<div id="eEvent" style="margin-right: 200px;height: 220px;"></div>
		</div>
	</section>
</div>
<section class="panel">
	<p class="title">日志信息</p>
	<div class="content" style="display: flex;padding: 0;height: 560px;">
		<div class="appLogTotalDetails-fileView"> 
			<input type="text" placeholder="文件搜索" class="search-query pull-right" style="margin-top: 7px;margin-right: 10px;">
			<div id="fileViewNav" class="appLogTotalDetails-fileViewNav">
				<!-- <span>全部</span><span class="active">文件</span> -->
			</div>
			<ul id="fileViewList" class="appLogTotalDetails-fileViewList">
				<!-- <li class="fileViewItem" title="10.9.2.3">
					<div class="fileViewItemImg"><i class="fa fa-folder-open-o"></i></div>
					<div class="fileViewItemName">10.9.2.3</div>
				</li>
				<li class="fileViewItem" title="home">
					<div class="fileViewItemImg"><i class="fa fa-folder-open-o"></i></div>
					<div class="fileViewItemName">home</div>
				</li>
				<li class="fileViewItem" title="cmdb">
					<div class="fa fa-television fileViewItemImg"><i class="fa fa-folder-o"></i></div>
					<div class="fileViewItemName">cmdb</div>
				</li> -->
			</ul>
			<div class="appLogTotalDetails-fileNoList">
				<!-- <p>日志流水</p> -->
				<ul>
					<li>日志流水测试</li>
					<li>日志流水测试</li>
					<li>日志流水测试</li>
				</ul>	
			</div>
		</div>
		<div class="appLogTotalDetails-echartsArea">
			<div>
				<p>采集速度</p>
				<div></div>
			</div>
			<div>
				<p>交易笔数／失败／成功笔数</p>
				<div></div>
			</div>
			<div>
				<p>交易耗时</p>
				<div></div>
			</div>
			<div>
				<p>失败原因</p>
				<div></div>
			</div>
			<div>
				<p>交易TOP</p>
				<div></div>
			</div>
		</div>
	</div>
</section>
