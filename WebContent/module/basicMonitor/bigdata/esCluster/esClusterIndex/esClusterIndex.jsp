<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.esClusterIndex-layout1 {
	display: flex;
	width: 100%;
	height: 500px;
}

.esClusterIndex-layout1 {
	margin-bottom: 20px;
}
</style>



<div class="esClusterIndex-layout1">
	<section class="panel"
		style="flex: none; width: 100%; margin-right: 20px;">
		<table id="indexTable" class="display dataTable table"
			style="table-layout: fixed;">
			<thead>
				<tr>
					<th>索引名称</th>
					<th>文档数</th>
					<th>正在查询数量</th>
					<th>查询速度(/ms)</th>
					<th>索引速度(/ms)</th>
					<th>索引刷新速度(/ms)</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</section>
</div>

