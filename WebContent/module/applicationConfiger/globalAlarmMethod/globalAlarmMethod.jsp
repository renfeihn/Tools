<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.globalAlarmMethod-buttons{
	position: absolute;
	z-index: 1;
}

.globalAlarmMethod-table tbody span.alarm:before,
.globalAlarmMethod-table tbody span.warning:before,
.globalAlarmMethod-table tbody span.prmot:before{
	content:'';
	width: 6px;
	height: 6px;
	border-radius: 50%;
	margin-right: 6px;	
    display: inline-block;
}

.globalAlarmMethod-table tbody span.alarm{
	color: #FF3341;
}

.globalAlarmMethod-table tbody span.warning{
	color: #F5C000;
}

.globalAlarmMethod-table tbody span.prmot{
	color: #22AC38;
}

.globalAlarmMethod-table tbody span.alarm:before{
	background-color: #FF3341;
}

.globalAlarmMethod-table tbody span.warning:before{
	background-color: #F5C000;
}

.globalAlarmMethod-table tbody span.prmot:before{
	background-color: #22AC38;
}

.globalAlarmMethod-table tbody span.connect{
	border: 1px solid blue;
    padding: 0 5px;
}
.globalAlarmMethod-jumpPage{
	position: absolute;
	margin-top: -24px;
	line-height: 24px;
}
.globalAlarmMethod-jumpPage>input{
	width: 80px;
	margin: 0 1em;
}

</style>
<section class="panel" style="margin: -20px -20px 0 -20px">
	<p class="title">全局报警策略</p>
	<div class="content">
		<div class="globalAlarmMethod-buttons">
			<button type="button" class="addBtn">新增</button>
			<button type="button" class="delBtn">删除</button>
			<button type="button" class="editBtn">修改</button>
			<button type="button" class="detailBtn">明细</button>
		</div>
		<table id="dataTable" class="display dataTable table globalAlarmMethod-table">
					<thead>
						<tr>
							<th width=80>序号</th>
							<th>策略名称</th>
							<th>报警类型</th>
							<th>报警级别</th>
							<th>连续时间(s)</th>
							<th>连续次数</th>
							<th>策略类型</th>
							<th>状态</th>
							<th>id</th>
						</tr>
					</thead>
					<tbody>
						<!-- <tr>
							<td>23</td>
							<td><span class="alarm">告警</span></td>   通知prmot   预警warning
							<td>213</td>
							<td>213</td>
							<td>213</td>
							<td>213</td>
							<td><span class="connect">联合</span></td>
							<td><span class="boolean-switch false"></span></td>
						</tr> -->
					</tbody>
				</table>
		<!-- 数据表格End -->
		<!-- 跳转到某页Start -->
		<span class="globalAlarmMethod-jumpPage">跳转到<input id="toPage" type="text" />页</span>
		<!-- 跳转到某页End -->
	</div>
</section>