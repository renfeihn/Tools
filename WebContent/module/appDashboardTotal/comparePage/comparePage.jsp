<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.compare-page .charts-wrap {
	margin-bottom: 20px;
}
.compare-page .charts-item {
	width: 100%;
	height: 220px;
    margin-bottom: 10px;
}
.compare-page table tr>th:nth-child(n+5),
.compare-page table tr>td:nth-child(n+5) {
	text-align: right;
}
.compare-page table tr.active {
	background: #f0f0f5!important;
}
.compare-page .check-item {
    font-size: 14px;
}
.compare-page .check-item.fa-check-square {
    color: var(--color-theme);
}
.compare-page  table i.red {
	font-style: normal;
	color: red;
}
</style>

<div class="compare-page">
	<div class="charts-wrap">
		<div class="charts-item" id="echarts_trade"></div>
		<div class="charts-item" id="echarts_time"></div>
	</div>
	<div class="table-wrap">
		<table class="display dataTable table" id="days_table"></table>
	</div>
</div>