<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.linuxDetails-indicatorDetails-tree {
	width: 240px;
	/* max-height: calc(100vh - 232px); */
	height: 840px;
	overflow: auto;
	background-color: #FFF;
	border: 1px solid #f1f0f5;
	flex: none;
}

.linuxDetails-indicatorDetails-table {
	width: 100%;
	table-layout: fixed;
}

.linuxDetails-indicatorDetails-table tr {
	height: 30px;
}

.linuxDetails-indicatorDetails-table tr td {
	padding-left: 10px;
	vertical-align: top;
	font-size: 14px;
}

.linuxDetails-indicatorDetails-table tr td:nth-child(1) {
	width: 8em;
	color: #888;
}

.linuxDetails-indicatorDetails-table tr td:nth-child(2) {
	overflow: hidden;
	white-space: normal;
	word-break:break-all;
}

.linuxDetails-indicatorDetails-echarts {
	height: 300px;
}

.linuxDetails-indicatorDetails-echartsButtons {
	display: none;
	text-align: right;
	margin-bottom: 10px;
}

.linuxDetails-indicatorDetails-echartsButtons button:hover,
	.linuxDetails-indicatorDetails-echartsButtons .active {
	background-color: #5B62F9;
	border-color: #5B62F9;
	color: #fff;
}

.ztree .bottom_close {
	background-position: -74px -16px;
}

.ztree .bottom_open {
	background-position: -92px -16px;
}

.linux-rightArea {
	flex: auto;
	margin: 10px;
	background-color: #FFF;
	padding: 10px;
	width: calc(100% - 300px);
}
.linuxDetails-indicatorDetails-echarts .multiple-checkbox {
	top: -36px;
    right: 183px;
}
.KPIDetails-echarts-ctn>div:not(:nth-child(3n + 3)) {
	margin-right: 20px;
}
.KPIDetails-echarts-ctn>div {
	float: left; 
	width: calc((100% - 40px) / 3);
	height: 220px;
	margin-bottom: 20px;
	box-sizing: border-box;
}
.KPIDetails-echarts-ctn>div>p {
	text-align: center;
	font-size: 16px;
}
.KPIDetails-echarts-ctn>div>div {
	width: 100%;
	height: calc(100% - 30px);
	box-sizing: border-box;
	padding: 10px;
}
</style>
<div style="display: flex; background-color: #f1f0f5; margin-bottom: 20px;">
	<div class="linuxDetails-indicatorDetails-tree">
		<ul class="ztree"></ul>
	</div>
	<div id="metricInfo" class="linux-rightArea">
		<section id="detaisView" class="panel">
			<div id="tableCtn" class="content" style="height: 266px;">
				<table id="itemTable" class="display dataTable table">
					<thead>
						<tr>
							<th>KEY</th>
							<th>值</th>
						</tr>
					</thead>
				</table>
			</div>
		</section>
		<div>
			<div id="eButtons" class="linuxDetails-indicatorDetails-echartsButtons">
				<button type="button" class="active" value="30">30分钟</button>
				<button type="button" value="60">1小时</button>
				<button type="button" value="119">2小时</button>
			</div>
			<div class="pull-left" style="width: 400px;background-color: #f1f0f5;padding: 20px;">
				<table class="linuxDetails-indicatorDetails-table">
					<tr>
						<td>指标描述</td>
						<td id="metricDesc">-</td>
					</tr>
					<tr>
						<td>当前值(均值)</td>
						<td id="value">-</td>
					</tr>
					<tr>
						<td>最近采集时间</td>
						<td id="time">-</td>
					</tr>

				</table>
			</div>
			<div id="eEcharts" class="linuxDetails-indicatorDetails-echarts" style="margin-left: 440px;"></div>
		</div>
	</div>
	<div id="metricCurrInfo" class="linux-rightArea" style="display: none; height: 800px;">
		<div class="content" style="height: 100%;">
			<section class="panel" style="margin-bottom: 0; height: 100%; overflow-y: auto;">
				<div id="tableCtn" class="content" style="/*height: calc(100vh - 312px);*/ overflow-y: scroll;">
					<table id="itemsTable" class="display dataTable table">
						<thead>
							<tr>
								<!-- <th>序号</th>
								<th>CPU名称</th>
								<th>CPU利用率</th>
								<th>CPU型号</th>
								<th>CPU频率</th>
								<th>备注</th> -->
							</tr>
						</thead>
					</table>
				</div>
				<div id="echartsCtn" class="KPIDetails-echarts-ctn">
					<!-- <div>
						<p>标题aaaa</p>
						<div style="background: #ddd;"></div>
					</div> -->
				</div>
			</section>
		</div>
	</div>
</div>