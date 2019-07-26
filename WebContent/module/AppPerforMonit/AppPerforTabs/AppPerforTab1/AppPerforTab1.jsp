<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
.AppPerforTab1-grid-layout>section.panel {
	margin: 0;
}
.AppPerforTab1-grid-layout {
	display: grid;
	grid-template-columns: 280px 340px 1fr;
	grid-template-rows: 292px auto;
	grid-gap: 20px;
}
.AppPerforTab1-appName {
	font-size: 24px;
    height: 140px;
    text-align: center;
    background-color: #eee;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 30px;
    padding: 0 20px;
}
.AppPerforTab1-hostNum:before {
	content: '主机个数';
	font-size: 14px;
}
.AppPerforTab1-hostNum {
	font-size: 16px;
    line-height: 60px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    color: #fff;
    background-color: var(--主题色);
    border-radius: 2px;
}
.AppPerforTab1-appPerformance>div>div:first-child {
	color: #666;
	font-weight: normal;
}
.AppPerforTab1-appPerformance>div>div:last-child:after {
	content: attr(data-unit);
	font-size: 12px;
	margin-left: 2px;
}
.AppPerforTab1-appPerformance>div>div:last-child {
	font-size: 20px;
	margin-top: 6px;
}
.AppPerforTab1-appPerformance>div {
	background-color: #eee;
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
}
.AppPerforTab1-appPerformance {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	height: calc(100% - 80px);
	grid-gap: 20px;
}
.AppPerforTab1-fullHeight,.AppPerforTab1-fullHeight>div {
	height: calc(100% - 40px);
}
.echarts-app-kpi {
	height: 100%;
}
.AppPerforTab1-grid-layout table.treetable {
	margin: 0;
}
.AppPerforTab1-grid-layout table.treetable tr.branch td {
	font-weight: 500;
	color: initial;
}
</style>
<div class="AppPerforTab1-grid-layout">
	<section class="panel">
		<p class="title">应用信息</p>
		<div class="content">
			<div class="AppPerforTab1-appName"></div>
			<div class="AppPerforTab1-hostNum">-</div>
		</div>
	</section>
	<section class="panel">
		<p class="title">应用性能</p>
		<div class="content AppPerforTab1-appPerformance">
			<div>
				<div>平均耗时</div>
				<div data-unit="ms" class="AppPerforTab1-avg">-</div>
			</div>
			<div>
				<div>交易量</div>
				<div data-unit="笔" class="AppPerforTab1-count">-</div>
			</div>
			<div>
				<div>TPS</div>
				<div data-unit="笔/s" class="AppPerforTab1-tps">-</div>
			</div>
			<div>
				<div>成功率</div>
				<div data-unit="%">-</div>
			</div>
		</div>
	</section>
	<section class="panel">
		<ul class="nav nav-tabs nav-public">
			<div class="capsule-select">
				<a data-value="60" href="javascript:void(0);" class="selected">
					1小时
				</a>
				<a data-value="360" href="javascript:void(0);" class="">
					6小时
				</a>
				<a data-value="720" href="javascript:void(0);" class="">
					12小时
				</a>
				<a data-value="1440" href="javascript:void(0);" class="">
					24小时
				</a>
			</div>
			<li class="active"><a href="#appKPI1" data-toggle="tab">平均耗时</a></li>
			<li><a href="#appKPI2" data-toggle="tab">交易量</a></li>
			<li><a href="#appKPI3" data-toggle="tab">TPS</a></li>
		</ul>
		<div class="tab-content AppPerforTab1-fullHeight">
			<div id="appKPI1" class="tab-pane active">
				<div class="echarts-app-kpi" id="avg"></div>
			</div>
			<div id="appKPI2" class="tab-pane">
				<div class="echarts-app-kpi" id="count"></div>
			</div>
			<div id="appKPI3" class="tab-pane">
				<div class="echarts-app-kpi" id="tps"></div>
			</div>
		</div>
	</section>
	<section class="panel" style="grid-area: 2/1/3/4;">
		<p class="title">应用主机性能</p>
		<div class="content">
			<table id="treeTable" class="treetable">
				<thead>
					<tr>
						<th>主机</th>
						<th>交易量(笔)</th>
						<th>平均耗时</th>
						<th>成功率</th>
						<th>TPS(笔/s)</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</section>
</div>
