<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
#dataTable .cfm,
#dataTable .cel {
    color: #2196F3;
    text-decoration: underline;
    margin-right: 5px;
    cursor: pointer;	
}
#dataTable .cfm:hover,
#dataTable .cel:hover {
	color: #3f51b5;
}
</style>
<div class="selffind-content">
	<table id="dataTable" class="display dataTable table">
		<thead>
			<tr>
				<th>序号</th>
				<th>属性名称</th>
				<th>当前值</th>
				<th>自发现值</th>
				<th>发现时间</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
</div>