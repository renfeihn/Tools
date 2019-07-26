<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.stormSupervisor-layout1 {
	display: flex;
	width: 100%;
	height: 500px;
}

.stormSupervisor-layout1 {
	margin-bottom: 20px;
}
</style>



<div class="stormSupervisor-layout1">
	<section class="panel"
		style="flex: none; width: 100%; margin-right: 20px;">
		<table id="dataTable" class="display dataTable table"
			style="table-layout: fixed;">
			<thead>
				<tr>
					<th>主机</th>
					<th>运行时间</th>
					<th>版本</th>
					<th>Men已使用(MB)</th>
					<th>Mem大小(MB)</th>
					<th>已使用worker数量</th>
					<th>worker总数</th>
					<th>日志路径</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</section>
</div>

