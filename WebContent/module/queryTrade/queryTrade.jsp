<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
.queryTrade-form input[type="text"] {
	height: 32px;
	font-size: 14px;
	width: -webkit-fill-available;
	margin: 0;
}
.queryTrade-form {
	display: grid;
	padding: 15px;
	margin: 0;
	grid-column-gap: 15px;
	grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr auto;
}
.duration-time-check.checked {
	background-color: var(--color-theme);
	border-color: var(--color-theme);
	color: #FFF;
}
.duration-time-check {
	border: 1px solid #ccc;
	border-radius: 2px;
	display: inline-block;
	padding: 2px 6px;
	color: #666;
	margin-right: 10px;
	cursor: pointer;
	background-color: #FFF;
}
.result-block {
	background-color: #f1f0f5;
	border-radius: 4px;
	padding: 15px;
	margin: 0 15px;
}
.dataTables_scrollBody table thead th {
	height: 0 !important;
}
/*三级分类选择start*/
.logSearchDetail-accessLogContent {
	position: relative;
	color: #5c5a66;
	z-index: 1;
	font-size: 12px;
	background-color: #fff;
	border: 1px solid #c6c7cc;
	border-radius: 2px;
}
.logSearchDetail-accessLogContent>span{
	width: 200px;
	line-height: 30px;
	display: block;
	color: #5c5a66;
	position: relative;
	cursor: pointer;
	padding: 0 60px 0 20px;
}
.logSearchDetail-accessLogContent>span>i{
	height: 100%;
	width: 30px;
	background-color: #f9f9fb;
	line-height: 24px;
	font-size: 20px;
	position: absolute;
	right: 0px;
	text-align: center;
	border-left: 1px solid #c7c6cd;
	color: #c7c6cb;
}
.logSearchDetail-accessLogContent>div,
.logSearchDetail-accessLogContent>ul{
	display: none;
	background-color: #fff;
	border: 1px solid #c7c6cc;
	position: absolute;
}
.logSearchDetail-accessLogContent>ul{
	box-shadow: -1px 1px 2px #c7c6cc;
}
.logSearchDetail-accessLogContent>div {
	padding: 10px;
	width: 600px;
	left: 179px;
	box-shadow: 1px 1px 2px #c7c6cc;
}
.logSearchDetail-accessLogContent>div>div:first-child {
	position: absolute;
	right: 10px;
	bottom: 10px;
	z-index: 2;
}
.logSearchDetail-accessLogContent>div>div:first-child button.light {
	background: #fff;
	border-color: var(--color-theme);
	color: var(--color-theme);
}
.logSearchDetail-accessLogContent>div>div:first-child button.light:hover {
	background: var(--color-theme);
	color: #FFFFFF;
	border-color: var(--color-theme);
}
.logSearchDetail-accessLogContent>div>div:first-child button{
	cursor: pointer;
	width: 70px;
	height: 35px;
	margin-left: 10px !important;
}
.logSearchDetail-accessLogContent>div h5 {
	font-weight: bold;
	cursor: pointer;
	width: auto;
	display: inline-block;
	line-height: 20px;
	padding: 0 5px;
}
.logSearchDetail-accessLogContent>div h5:not(.active):not(.disabled):hover,
.logSearchDetail-accessLogContent>div span:not(.active):not(.disabled):hover {
	text-decoration: underline;
}
.logSearchDetail-accessLogContent>div span.active,
.logSearchDetail-accessLogContent>div h5.active {
	background-color: #e1e2f0;
}
.logSearchDetail-accessLogContent>div div>span {
	color: #5e619f;
	cursor: pointer;
	flex: none;
	position: absolute;
	text-align: right;
	right: 440px;
	overflow: visible;
	white-space: nowrap;
	line-height: 20px;
	padding: 0 5px;
}
.logSearchDetail-accessLogContent>div:nth-child(3) h5.disabled,
.logSearchDetail-accessLogContent>div:nth-child(3) div>span.disabled{
	cursor: default;
}
.logSearchDetail-accessLogList{
	border-bottom: 1px dashed #eee;
	margin-top: 10px !important;
}
.logSearchDetail-accessLogList:after{
	content: '';
	clear: both;
	display: block;
}
.logSearchDetail-accessLogList>div{
	/*margin-left: 150px !important;
    min-height: 30px;
    position: relative;
    top: -20px;*/
    display: inline-block;
    min-height: 30px;
    float: right;
    width: calc(100% - 160px);
  }
  .logSearchDetail-accessLogList>div>p{
  	word-wrap: break-word;
  }

  .logSearchDetail-accessLogContent>div p>span {
  	display: inline-block;
  	cursor: pointer;
  	padding: 0 5px;
  	margin: 0 5px 5px 5px !important;
  	line-height: 20px;
  	word-break: break-all;
  }
  .logSearchDetail-accessLogContent>ul{
  	width: 180px;
  	cursor: pointer;
  	margin: 0;
  }
  .logSearchDetail-accessLogContent>ul>li {
  	padding: 0 5px;
  	height: 50px;
  	line-height: 50px;
  	position: relative;
  }
  .logSearchDetail-accessLogContent>ul>li.choosed:before {
  	content: '* ';
  }
  .logSearchDetail-accessLogContent>ul>li i {
  	position: absolute;
  	right: 5px;
  	top: 10px;
  	transform: translateY(10px);
  }
  .logSearchDetail-accessLogContent>ul>li.active {
  	color: #505394;
  	background: #d7d8f0;
  }
  .logSearchDetail-accessLogContent>ul>li:hover{
  	background: #ebedf4;
  }
  /*三级分类选择end*/
  .result-block table.dataTable tbody tr td {
  	border-top: none;
  }
  .queryTrade-view {
    position: absolute;
    background-color: #FFF;
    width: 60vw;
    right: 0;
    top: 0;
    bottom: 0px;
    z-index: 10;
    box-shadow: -3px 0px 10px rgba(0,0,0,0.4);
    /*padding: 15px;*/
    animation: showView 0.5s;
  }
  .queryTrade-mask {
	position: absolute;
    left: -40vw;
    width: 40vw;
	z-index: 10;
    height: 100%;
    background: rgba(0,0,0,.5);
  }
  @keyframes showView {
  	0%{
  		transform: translateX(100%);
  	}
  	100%{
  		transform: translateX(0%);	
  	}
  }
  .queryTrade-view-close {
  	position: absolute;
    right: 0;
    top: 0;
    color: #808080;
    width: 37px;
    height: 37px;
    background: #eee;
    text-align: center;
    line-height: 37px;
    font-size: 20px;
    cursor: pointer;
  }
  .ofh>div {
  	overflow: hidden;
  }
  .queryTrade-tr-selected tr.selected {
  	background-color: #ebf2fb !important;;
  }
  .page-info .dataTables_info {
    color: rgb(53, 63, 105);
    font-family: 宋体;
    font-size: 12px;
  }
  .page-info .dataTables_length {
    padding: 0;
    display: inline-flex;
    align-items: center;
  }
  .page-info .dataTables_length>label{
  	margin: 0;
  	line-height: 24px;
  }
  .page-info {
  	display: grid;
    float: left;
    grid-template-columns: auto auto;
    grid-column-gap: 20px;
  }
  #searchBtn.searching.confirmBtn {
  	background-color: var(--color-theme);
  	color: #FFF;
  }
  .assist-function {
  	display: flex;
		position: absolute;
		right: 10px;
		top: 7px;
		z-index: 2;
  }
  .toggle-nofull-screen-btn,
  .toggle-full-screen-btn {
		width: 30px;
  	height: 30px;
  	background-size: 24px;
  	background-color: #f2f2f2;
  	background-repeat: no-repeat;
  	background-position: center;
  	border: 1px solid #d8d8d9;
  	cursor: pointer;
  }
  .toggle-nofull-screen-btn {
  	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACY0lEQVR4Xu1ay03DQBCdUSRfSQdAB3QAVAAlhAoglx3lBJyinUvoIHQAJUAFQAWkA+AWKYdBIyXIcQzE6012pYyPyPPx24c9L/MQdvzCHX9+MABiMWA0GnWn02l3MBhMYuWsyzMcDg9i1ojCAO/9OSI+aMMi0ieiu02AwMxjAOgBwCcAnDrnXtvWiQIAMz8BwPEcgAkRHbZtrC6emWXxdxG5JaKbtnWiA6ANOeei5K0+nAFgDLB/AXsH2EtwjoB9BewzaHOADUI2CW5iFJ4Lm8uGM/YRAHQXMVsahSeIuLbyFJFPRLytCqilmV0l7Ww2+2j48Cu3bwOAkB5FZEWoLQGgWrvT6byHJC8NKG9EpIyIfpXFUEhyEfkioh+mao4V1ea9v0LEKwDYb1pERN4QsRdDp/8ih/W3AJXAQb1pLBE9lnNvRLY2BS7l/QZASvRzqG0MyOEUUvZgDEiJfg61jQE5nELKHowBKdHPobYxIIdTSNmDMSAl+jnUNgbkcAopezAGpEQ/h9rGgBxOIWUPxoAq+iUrWujBXDjn7kOD/4rz3t8g4nVo7joL3xIDmFkXGi+hBTSubvvSJl85tu1iRHNVt1Z1ixHdoe21aTrX1RgAPDvnTsrPtgKAskBEzpsAoNug8rZmSwA8i4gaNNe+iqK46/f76jL9uaK8BMtO0Tqard3hPzeaUdKMkmaUNKPk4jVhPkHzCZpP0HyC5hPchE8wZGqzSZBZnVdnczW4FZtcbp9BldGPIqIevF7VihbCqroYZlbRNVY7XlEUJ1VhE1InihgKKZxLjAGQy0mk6mPnGfANBenIUPgFAMsAAAAASUVORK5CYII=');
  }
  .toggle-full-screen-btn {
  	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACa0lEQVR4Xu1bQW5aQQwdC8G2uUFyg/YGbW/QGzQ9QWEzFrtkhcYsSE5QcoIkJ2hygtITlJ6gyRaEXFmCCH4Ajb/7Izrx3yHZ4/HzY/54/hsIr/yBV55/cAC2MYCI3oUQ3mjZsVgsfvf7/anWT2M/GAxOWq3WscZHbHfN7RkDUkrXAPBJG2Blz8w9RLyo67/Pj4i+hRBODWNfxhi76/4bACwr/8MQIDDzT0QUBv3zh4jYOmiMcSPnjR/D4fADM3+3BGHmK0S0VGln+JTSBADeWuanBeCeme9yAwLANMY4zrXX2o1Go6PZbCbgHuX6AoDYP60ZKgCY+RwRz3KDHaIdEUkB36/m5gBo1gBngP8FfA3wRdDfAv4a9H2Ab4QOcYeXOyfVTnDZa/9aG/xLk3v73CQsdkQkrflXGYOZHxFxo4/Ydh4g/bI0EJOmujpLQlpfaaDm8/mYmU9CCGeIeLPzPEA7eAn2fiZYQhUtOTgDLOiV4OsMKKGKlhycARb0SvB1BpRQRUsOzgALeiX4OgNKqKIlB2eABb0SfJ0BJVTRkoMzwIJeCb7OgGoV16Rok3a7/bHX6z38z5VeKt9E+CXfA55959grk2tS8/dSoKaUxgDweRXPNUKuEVIIJV0k5SIpF0m5SMpFUi6ScpGUi6ReatvaRByVSKp6Y4SZp3IJIndizDzpdDrnTTVQy8ZGBE+i98l95PrOkzBK1QvkRqjY3cYYa1+62heTiP5obotsG2svAFtkcmoMDvnSVJZMbl1Xp81eAojEripF046zyz6l1AWAUZ3xZG4A0K3qHv1EqA6aJfk4A0qqZp1c/gLU4A1frpBZdAAAAABJRU5ErkJggg==');
  }
  .toFullScreen {
  	background: #FFF;
  	margin-top: 10px;
  	padding: 10px;
  	position: relative;
  	transition: all 0.5s;
  }
  .toFullScreen.open {
    position: fixed;
    left: 50px;
    top: 50px;
    right: 50px;
    bottom: 50px;
    z-index: 1100;
    box-sizing: border-box;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    margin: 0;
    overflow-y: auto;
  }
  .echarts-tongji-backcolor {
  	background-color: #f7f7fa;
  	display: grid;
  	grid-template-rows: 1fr 1fr;
		grid-row-gap: 15px;
		height: calc(100% - 20px);
  }
  .tongji-layout {
  	display: grid;
  	grid-template-columns: 3fr 2fr;
  	grid-column-gap: 15px;
  	padding: 10px 0 0 10px;
  }
  .tabs-left>.nav-tabs .active>a {
  	background: #FFF !important;
  }
  .status-check>.fa {
  	font-size: 12px;
  }
  .status-check.selected {
		/*border: 1px solid var(--color-theme);*/
		background-color: #FFF;
  }
  .status-check {
  	padding: 0 10px;
  	cursor: pointer;
  	height: 26px;
  	line-height: 26px;
  	border-radius: 4px;
  }
</style>
<div>
	<form class="queryTrade-form">
		<input type="text" placeholder="交易时间" id="datetime">
		<!-- <input type="text" name="" placeholder="交易代码"> -->
		<!-- <input type="text" name="" placeholder="交易耗时"> -->
		<div id="logSetting" class="logSearchDetail-accessLogContent">
			<span id="accessLog" data-val="1">可访问日志<i class="fa fa-sort-down"></i></span>
			<ul id="accessLogUl">
				<li>应用系统<i class="fa fa-chevron-right"></i></li>
				<li>资产对象<i class="fa fa-chevron-right"></i></li>
			</ul>
			<div id="appSystem">
			</div>
			<div id="assetObject">
			</div>
		</div>
		<input type="text" name="hostip" placeholder="IP" autocomplete="off">
		<input type="text" name="objectid" placeholder="程序" autocomplete="off">
		<input type="text" name="" placeholder="交易代码" autocomplete="off">
		<input type="text" name="fileName" placeholder="日志文件名" autocomplete="off">
		<div>
			<button type="button" class="confirmBtn" id="searchBtn" style="width: 94px;">查询</button>
			<button type="button" class="cancelBtn" id="resetBtn">重置</button>
		</div>
	</form>
</div>
<div class="result-block">
	<div style="display: flex;align-items: center;justify-content: space-between;">
		<div style="display: flex;align-items: center;">
			耗时：
			<span class="duration-time-check" data-filter="[0,999]">0~999ms</span>
			<span class="duration-time-check" data-filter="[1000,5000]">1~5s</span>
			<span class="duration-time-check" data-filter="[5000,10000]">5~10s</span>
			<span class="duration-time-check" data-filter="[10000,30000]">10~30s</span>
			<span class="duration-time-check" data-filter="[30000,60000]">30~60s</span>
			<span class="duration-time-check" data-filter="[60000]">60s+</span>
		</div>
		
		<div style="display: flex;align-items: center;">
			交易状态：
			<span class="status-check" data-status="1"><i class="fa fa-circle" style="color: #1ec659;"></i>&nbsp;成功</span>
			<span class="status-check" data-status="E"><i class="fa fa-times-circle" style="color: #e83b46;"></i>&nbsp;失败</span>
			<!-- <span class="status-check" data-status="1"><i class="fa fa-warning" style="color: #f4bc2b;"></i>&nbsp;未知</span> -->
		</div>
	</div>
	<div id="echartsDom" style="height: 140px;background-color: #FFF;margin-top: 10px;"></div>
	<div class="toFullScreen">
		<div class="assist-function">
			<span id="toggleScreenBtn" class="toggle-full-screen-btn"></span>
		</div>
		<ul class="nav nav-tabs nav-underLine">
			<li class="active"><a href="#tabs1" data-toggle="tab" id="mingxi">交易明细</a></li>
			<li><a href="#tabs2" data-toggle="tab" id="tongji">交易统计</a></li>
		</ul>
		<div class="tab-content">
			<div id="tabs1" class="tab-pane active">
				<div style="padding-top: 10px;"></div>
				<table id="dataTable" class="dispaly table dataTable queryTrade-tr-selected"></table>	
			</div>
			<div id="tabs2" class="tab-pane tables-container">
				<div class="tabs-left" style="background-color: #FFF;">
					<ul class="nav nav-tabs" style="width: 120px;">
						<li class="active"><a href="#tabsa1" data-toggle="tab">按应用</a></li>
						<li><a href="#tabsa2" data-toggle="tab">按软件</a></li>
						<li><a href="#tabsa3" data-toggle="tab">按IP</a></li>
						<li><a href="#tabsa4" data-toggle="tab">按日志源</a></li>
						<li><a href="#tabsa5" data-toggle="tab">按日志</a></li>
					</ul>
					<div class="tab-content ofh" style="flex: 1;">
						<div id="tabsa1" class="tab-pane active">
							<div class="tongji-layout">
								<div class="echarts-tongji-backcolor">
									<div class="echarts-tongji" style="height: 100%;"></div>
									<div class="echarts-tongji" style="height: 100%;"></div>
								</div>
								<div >
									<table id="table0" class="dataTables dispaly table" data-table-index="0"></table>
								</div>
							</div>
						</div>
						<div id="tabsa2" class="tab-pane">
							<div class="tongji-layout">
								<div class="echarts-tongji-backcolor">
									<div class="echarts-tongji" style="height: 100%;"></div>
									<div class="echarts-tongji" style="height: 100%;"></div>
								</div>
								<div >
									<table id="table1" class="dataTables dispaly table" data-table-index="1"></table>
								</div>
							</div>
						</div>
						<div id="tabsa3" class="tab-pane">
							<div class="tongji-layout">
								<div class="echarts-tongji-backcolor">
									<div class="echarts-tongji" style="height: 100%;"></div>
									<div class="echarts-tongji" style="height: 100%;"></div>
								</div>
								<div >
									<table id="table2" class="dataTables dispaly table" data-table-index="2"></table>
								</div>
							</div>
						</div>
						<div id="tabsa4" class="tab-pane">
							<div class="tongji-layout">
								<div class="echarts-tongji-backcolor">
									<div class="echarts-tongji" style="height: 100%;"></div>
									<div class="echarts-tongji" style="height: 100%;"></div>
								</div>
								<div >
									<table id="table3" class="dataTables dispaly table" data-table-index="3"></table>
								</div>
							</div>
						</div>
						<div id="tabsa5" class="tab-pane">
							<div class="tongji-layout">
								<div class="echarts-tongji-backcolor">
									<div class="echarts-tongji" style="height: 100%;"></div>
									<div class="echarts-tongji" style="height: 100%;"></div>
								</div>
								<div >
									<table id="table4" class="dataTables dispaly table" data-table-index="4"></table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- <div style="display: grid;grid-template-columns: 3fr 2fr;">
					<div class="echarts-tongji" style="height: 200px;"></div>
					<div>
						<table id="table0" class="dataTables dispaly table"></table>
					</div>
					<div class="echarts-tongji" style="height: 200px;"></div>
					<div>
						<table id="table1" class="dataTables dispaly table"></table>
					</div>
					<div class="echarts-tongji" style="height: 200px;"></div>
					<div>
						<table id="table2" class="dataTables dispaly table"></table>
					</div>
					<div class="echarts-tongji" style="height: 200px;"></div>
					<div>
						<table id="table3" class="dataTables dispaly table"></table>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</div>

<div style="padding-bottom: 20px;"></div>

<div class="queryTrade-view hide">
	<div class="queryTrade-mask"></div>
	<i class="fa fa-times queryTrade-view-close"></i>
	<div style="height: 100%;">
		<ul class="nav nav-tabs nav-underLine">
			<li data-path="fields" class="active"><a>结构化字段</a></li>
			<li data-path="link"><a>交易链路</a></li>
			<li data-path="log"><a>日志原文</a></li>
		</ul>
		<div class="tab-content" id="rightDetailsView" style="padding: 15px;height: calc(100% - 68px);"></div>
	</div>
</div>
















