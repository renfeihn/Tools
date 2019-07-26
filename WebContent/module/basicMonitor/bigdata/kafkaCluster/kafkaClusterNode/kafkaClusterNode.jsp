<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.esClusterNodes-layout1 {
	display: flex;
	width: 100%;
	height: 500px;
}

.esClusterNodes-layout1 {
	margin-bottom: 20px;
}
</style>



<div class="esClusterNodes-layout1">
	<section class="panel"
		style="flex: none; width: 100%; margin-right: 20px;">
		<table id="nodesTable" class="display dataTable table"
			style="table-layout: fixed;">
			<thead>
				<tr>
					<th>io-ratio</th>
					<th>io-wait-ratio</th>
					<th>network-io-rate</th>
					<th>connection-count</th>
					<th>request-size-avg</th>
					<th>io-wait-time-ns-avg</th>
					<th>connection-close-rate</th>
					<th>connection-creation-rate</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</section>
</div>

