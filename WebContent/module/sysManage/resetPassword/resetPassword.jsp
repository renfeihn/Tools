<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="true"%>
<style>
	.btn-group-a{
		position:absolute;
		top:60px;
		left:20px;
		z-index:1;
	}
</style>

<section class="panel" style="position:relative">
	<p class="title">密码重置</p>
	<div class="content">
		<div class="btn-group-a">
			<button id="resetBtn" type="button" disabled class="disabled">重置密码</button>
		</div>
		<!-- dataTables -->
		<table id="resetPassword" class="display table dataTable">
			<thead>
				<tr>
					<th>序号</th>
					<th>用户名称</th>
					<th>昵称</th>
					<th>电话</th>
					<th>邮件</th>
					<th>添加人</th>
					<th>添加日期</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>	
	</div>
</section>








