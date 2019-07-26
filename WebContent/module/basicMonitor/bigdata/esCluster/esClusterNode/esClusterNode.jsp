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
					<th>节点名称</th>
					<th>ip地址</th>
					<th>版本号</th>
					<th>角色</th>
					<th>CPU使用率(%)</th>
					<th>MEM使用率(%)</th>
					<th>JVM使用率(%)</th>
					<th>查询速度(/ms)</th>
					<th>索引速度(/ms)</th>
					<th>文档数</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</section>
</div>

