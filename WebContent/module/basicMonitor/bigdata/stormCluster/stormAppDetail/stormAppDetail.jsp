<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.stormDetails-layout1 {
	display: flex;
	height: 320px;
}
</style>


<section class="panel">
	<ul id="loadUl" class="nav nav-tabs nav-public">
		<li class="active"><a href="#tabs1" data-toggle="tab">Spouts列表</a></li>
		<li><a href="#tabs2" data-toggle="tab">bolts列表</a></li>
	</ul>
	<div class="tab-content" style="overflow: visible;">
		<div id="tabs1" class="tab-pane active">
			<table id="spoutsTable" class="display dataTable table">
				<thead>
					<tr>
						<th>Id</th>
						<th>Executors</th>
						<th>Tasks</th>
						<th>Emitted</th>
						<th>Transferred</th>
						<th>Complete latency(ms)</th>
						<th>Acked</th>
						<th>Failed</th>
						<th>Error Host</th>
						<th>Error Port</th>
						<th>Last Error</th>
						<th>Error Time</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<div id="tabs2" class="tab-pane">
			<table id="boltsTable" class="display dataTable table">
				<thead>
					<tr>
						<th>Id</th>
						<th>Executors</th>
						<th>Tasks</th>
						<th>Emitted</th>
						<th>Transferred</th>
						<th>Capacity(10分钟前)</th>
						<th>Execute latency(ms)</th>
						<th>Executed</th>
						<th>Process latency(ms)</th>
						<th>Acked</th>
						<th>Failed</th>
						<th>Error Host</th>
						<th>Error Port</th>
						<th>Last error</th>
						<th>Error Time</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
</section>
<div class="stormDetails-layout1">
	<section class="panel" style="flex: none; width: 100%; margin-right: 20px;overflow: auto">
	<p class="title">Topology 配置列表</p>
		<table id="configTable" class="display dataTable table"
			style="table-layout: fixed;">
			<thead>
				<tr>
					<th>Key</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</section>
</div>
