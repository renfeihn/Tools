<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.stormNimbus-layout1 {
	display: flex;
	width: 100%;
	height: 500px;
}

.stormNimbus-layout1 {
	margin-bottom: 20px;
}
</style>



<div class="stormNimbus-layout1">
	<section class="panel"
		style="flex: none; width: 100%; margin-right: 20px;">
		<table id="numbusTable" class="display dataTable table"
			style="table-layout: fixed;">
			<thead>
				<tr>
					<th>主机名</th>
					<th>端口</th>
					<th>状态</th>
					<th>版本</th>
					<th>运行时间</th>
					<th>日志路径</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</section>
</div>

