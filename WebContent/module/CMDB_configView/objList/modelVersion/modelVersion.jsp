<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
#dataTable .detail {
    color: #2196F3;
    text-decoration: underline;
    margin-right: 5px;
    cursor: pointer;	
}
#dataTable .detail:hover {
	color: #3f51b5;
}
</style>
<div class="version-content">
	<table id="dataTable" class="display dataTable table">
		<thead>
			<tr>
				<th>序号</th>
				<th>版本号</th>
				<th>修改内容</th>
				<th>更新时间</th>
				<th>创建人</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
</div>