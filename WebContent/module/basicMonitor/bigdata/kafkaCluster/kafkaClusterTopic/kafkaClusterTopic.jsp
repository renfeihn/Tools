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
		style="flex: none; width: 100%; margin-right: 20px;overflow: auto">
		<table id="topicTable" class="display dataTable table"
			style="table-layout: fixed;margin-top: 0px">
			<thead>
				<tr>
					<th>Topic名称</th>
					<th>分区</th>
					<th>偏移量</th>
					<th>复制中</th>
					<th>日志大小</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</section>
</div>

