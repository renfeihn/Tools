<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.agent-history .operate-wrap {
	position: absolute;
	z-index: 10;
}
.agent-history .operate-wrap select {
    margin: 0 10px 0 4px;
    width: 100px;
}
</style>

<div class="agent-history">
	<div class="operate-wrap">
		操作类型
		<select name="" id="oper_type">
			<option value="">全部</option>
			<option value="PING">PING</option>
			<option value="代理启动">代理启动</option>
			<option value="代理重启">代理重启</option>
			<option value="代理挂起">代理挂起</option>
			<option value="代理更新">代理更新</option>
		</select>
		执行结果
		<select name="" id="oper_result">
			<option value="">全部</option>
			<option value="成功">成功</option>
			<option value="失败">失败</option>
		</select>
	</div>
	<div class="table-wrap">
		<table id="his_table" class="display dataTable table"></table>
	</div>
</div>