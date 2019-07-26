<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
#dataTable,#serviceTable{
	table-layout: fixed;
}
</style>
<div style="display: flex; width:100%;">
	<div style="flex:1">
		<table id="dataTable" class="display dataTable table">
			<thead>
				<th>序号</th>
				<th>集群名称</th>
				<th>服务数量</th>
			</thead>
			<tbody></tbody>
		</table>
	</div>
	<div style="flex:3; margin-left:-1px;">
		<table id="serviceTable" class="display dataTable table">
			<thead>
				<th>序号</th>
				<th>IP</th>
				<th>端口</th>
				<th>模式</th>
				<th>连接数量</th>
				<th>发包数</th>
				<th>收包数</th>
				<th>延时(avg/max/min)</th>
				<th>watch数</th>
				<th>状态</th>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</div>