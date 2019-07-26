<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.linuxDetails-indicatorDetails-tree {
	width: 240px;
	height: calc(100vh - 232px);
	overflow-y: scroll;
	background-color: #FFF;
	border: 1px solid #f1f0f5;
	flex:none;
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
	flex: none;
	margin: 10px;
	background-color: #FFF;
	padding: 10px;
	width:calc(100% - 260px);
}
</style>
<div style="display: flex; background-color: #f1f0f5; margin-bottom: 20px;">
	<div class="linuxDetails-indicatorDetails-tree">
		<ul class="ztree"></ul>
	</div>
	<div id="metricInfo" class="linux-rightArea">
		<section id="detaisView" class="panel">
			<div id="tableCtn" class="content" style="height: 181px; overflow-y: scroll;">
				<table id="itemTable" class="display dataTable table">
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
		</section>
		<div>
			<div id="eButtons" class="linuxDetails-indicatorDetails-echartsButtons">
				<button type="button" class="active" value="60">1小时</button>
				<button type="button" value="180">3小时</button>
				<button type="button" value="360">6小时</button>
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
	<div id="metricCurrInfo" class="linux-rightArea" style="display: none;">
		<div class="content">
			<section class="panel" style="margin-bottom: 0">
				<div id="tableCtn" class="content" style="height: calc(100vh - 277px); overflow-y: scroll;">
					<table id="itemTable" class="display dataTable table">
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
			</section>
		</div>
	</div>
</div>