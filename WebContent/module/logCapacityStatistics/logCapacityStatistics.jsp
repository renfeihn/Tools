<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
.logCapa-info {
    padding: 0 35px;
    display: flex;
    vertical-align: middle;
    height: 93px;
    font-weight: normal;
    background-color: #fff;
    align-items: center;
}
.logCapa-info .userHead {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    margin-right: 16px;
}
.logCapa-info .userName {
    display: inline-block;
    vertical-align: middle;
}
.logCapa-info .userName>span {
    display: inline-block;
}
.logCapa-info>div {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    height: 93px;
}
.logCapa-info>div>div {
    padding: 0 40px;
}
.logCapa-info>div>div>span {
    display: block;
    text-align: center;
}
.logCapa-info>div>div>span:first-child {
    font-size: 12px;
    color: #5e6d80;
}
.logCapa-info>div>div>span:last-child {
    font-size: 26px;
    font-weight: bold;
    line-height: 34px;
    height: 34px;
}
.logCapa-body>div {
	background-color: #fff;
}	
.logCapa-body {
	height: calc(100vh - 150px);
	border: 1px solid #ebf0f5;
	display: grid;
	grid-template-columns: 280px 1fr;
	grid-template-rows: 1fr;
}
.radio-label input {
	margin: 0;
	position: relative;
	top: -1px;
}
.radio-label {
	display: inline-flex;
	margin: 0;
	align-items: center;
	width: 30%;
	position: relative;
    top: 2px;
}
.logCapa-tree .search-query {
    background-color: #fff;
    width: 100%;
    /*transition: all .5s;*/
}
.ztree li span {
	vertical-align: middle;
}
.logCapa-body-top {
	border: 1px solid #fff;
	overflow: auto;
}
.logCapa-body-top table {
	table-layout: fixed;
	width: calc(100% - 60px);
	margin: 20px 30px;
}
.logCapa-body-top table th {
	border: 1px solid #c6c7cc;
	background-color: #fafafc;
	height: 32px;
	vertical-align: middle;
}
.logCapa-body-top table tr>td:nth-child(1) {
	color: #808080;
	text-align: center;
}
.logCapa-body-top table tr>td:nth-child(2) {
	text-align: right;
}
.logCapa-body-top table td {
	height: 32px;
	vertical-align: middle;
	border: 1px solid #c6c7cc;
	font-size: 12px;
	padding: 0 20px;
	font-weight: normal;
}
</style>
<div class="logCapa-info">
	<img class="userHead" src="img/personalBench/user.jpg">
	<span class="userName">
		<span style="font-weight: bold;font-size: 16px;" id="name">admin</span>
		<br>
		<span style="color: #5e6d80;">上次登录时间：<span id="lastLoginTime"></span></span>
	</span>
	<div>
		<!-- <div>
			<span>设备数量</span>
			<span id="ipNum">8</span>
		</div>
		<div>
			<span>日志源数量</span>
			<span id="runSource" style="color: #00be00">13<span style="font-size: 12px;color: initial;">/15</span></span>
		</div> -->
		<div>
			<span id="logName">当日日志量</span>
			<span><b id="logDataToTalSize">-</b><span style="font-size: 12px;">GB</span></span>
		</div>
		<!-- <div>
			<span>当前采集速度</span>
			<span style="color: #ffc000;" id="currentLogDataIps">0.00<span style="font-size: 12px;">kb/s</span></span>
		</div> -->
	</div>
</div>
<div class="logCapa-body">
	<div class="logCapa-tree">
		<div style="padding: 10px 20px 0;">
			<div style="border-bottom: 1px solid #f5f5f5;padding-bottom: 10px;">
				范围：
				<label for="today" class="radio-label">
					<input type="radio" name="LogSize" id="today" checked="checked">&nbsp;&nbsp;当日
				</label>
				<label for="all" class="radio-label">
					<input type="radio" name="LogSize" id="all" >&nbsp;&nbsp;所有
				</label>
			</div>
		</div>
		<!-- <p class="title">全部对象（<span id="allCategory">-</span>） -->
		<!-- <div style="position: relative;">
			<input id="categorySearch" type="text" class="search-query" placeholder="搜索" /><span class="SearchBtn"></span>
		</div> -->
		<!-- </p> -->
		<ul class="ztree" id="tree"></ul>
	</div>
	<div style="padding: 14px 15px 15px;background-color: #f1f0f5;">
		<div style="height: calc(100vh - 180px);background-color: #fff;display: grid;grid-template-rows: 1fr 1fr;grid-gap: 20px;">
			<div class="logCapa-body-top">
				<table>
					<thead>
						<tr>
							<th>统计对象</th>
							<th>日志大小</th>
						</tr>
					</thead>
					<tbody></tbody>	
				</table>
			</div>
			<div>
				<div style="height: 100%;" id="echarts">
					
				</div>
			</div>
		</div>
	</div>
</div>


