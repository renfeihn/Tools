<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
select.qv_select {
	border-radius: 2px;
	height: 34px;
	box-sizing: border-box;
	margin-bottom: 0;
	width: 100%;
	padding: 3px 20px 4px 20px;
}

.qv_greyBG {
	background-color: #FFF!important;
	padding: 10px;
	border: 1px solid #EBEBEB;
}

.qv_btn {
	background-color: #FAFAFA;
	padding: 10px;
	border: 1px solid #EBEBEB;
	border-top: 0px;
}

.yixuanze {
	padding: 6px 9px 6px 0px;
	background: url("img/workList/yixuanzeBG.png") right center no-repeat;
	font-size: 12px;
	font-family: '宋体';
	display: inline-block;
	height: 24px;
	box-sizing: border-box;
	margin-right: 10px;
}

.yixuanze>span {
	background-color: #CAE7FB;
	padding: 6px;
	position: relative;
	top: -4px;
	padding-right: 5px;
}

.daixuanze>span {
	background-color: #F0F0F0;
	padding: 6px;
	position: relative;
	top: -4px;
}

.daixuanze {
	padding: 6px 9px 6px 0px;
	background: url("img/workList/daixuanzeBG.png") right center no-repeat;
	font-size: 12px;
	font-family: '宋体';
	display: inline-block;
	height: 24px;
	box-sizing: border-box;
	margin-right: 10px;
}

.jia {
	height: 8px;
	width: 8px;
	cursor: pointer;
	margin-right: 5px;
}

.jian {
	height: 8px;
	width: 8px;
	cursor: pointer;
	margin-left: 5px;
}

.qv_echartsTitle {
	background-color: #F9F9F9;
	border: 1px solid #F6F6F6;
	padding: 6px 10px;
	font-size: 14px;
	font-family: '宋体';
}

.clear.echarts td {
	padding: 10px;
}

.blank_background {
	background-color: #F9F9F9;
	font-size: 14px;
	text-align: center;
	padding: 108px;
	font-family: '宋体';
	color: #CCC;
}

.role_div {
	font-size: 14px;
	padding-top: 7px;
	padding-left: 20px;
	background-color: #FAFAFC;
	height: 34px;
	border: 1px solid #ebebeb;
	box-sizing: border-box;
	color: #999;
}

.lis {
	display: inline-block;
	margin-bottom: 5px;
}

#userRoleTable_filter {
	position: absolute;
	margin-top: -52px;
	right: calc(-100% - 19px);
}
.content.menu{
	display:flex;
	justify-content:space-between;
}
.content.menu>div{
	width:calc((100% - 20px)/2);
}
</style>

<!-- 更新部分 -->
<section class="panel">
	<p class="title">用户角色分配</p>
	<div class="content menu">
		<div class="content-left">
			<table id="userRoleTable"
							class="display dataTable table no-footer"
							style="table-layout: auto;">
							<thead>
								<tr>
									<th>序号</th>
									<th>用户名</th>
									<th>昵称</th>
									<!-- <th>邮箱</th> -->
									<th>分配状态</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
		</div>
		<div class="content-right">
			<div class="role_div"
							style="border-bottom: none;">角色分配</div>
						<div>
							<div class="qv_greyBG"
								style="height: 100px; border-bottom: none; overflow: auto;">
								<div style="margin-bottom: 5px;">已分配角色：</div>
								<div id="selected_div"></div>
							</div>
							<div class="qv_greyBG"
								style="height: 227px; border-bottom: none;  overflow: auto;">
								<div style="margin-bottom: 5px;">未分配角色：</div>	
								<div id="selecting_div"></div>
							</div>
							<div class="qv_greyBG"
								style="text-align: right; background: #FAFAFA;">
								<button id="buttion_add" class="confirmBtn disabled"
									style="width: 80px;">保存</button>
							</div>
						</div>
		</div>
	</div>
</section>
<!-- 更新部分结束 -->

<!-- 
<div class="modal-div div-bg" style="margin-bottom: 0;">
	<div class="second_title">
		<span class="black-box"></span> <span class="title_content">用户角色分配</span>
	</div>
	<div style="padding: 10px">
		<table class="clear" style="table-layout: fixed;margin-top: 10px;">
			<tbody>
				<tr>
					<td style="padding-right: 10px;">
						<table id="userRoleTable"
							class="display dataTable table table-bordered no-footer"
							style="table-layout: auto; border: 1px solid #ebebeb; border-top: none; border-radius: 0;">
							<thead>
								<tr>
									<th>序号</th>
									<th>用户名</th>
									<th>昵称</th>
									<th>邮箱</th>
									<th>分配状态</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</td>
					<td style="padding-left: 10px;">
						<div class="role_div"
							style="border-bottom: none;">角色分配</div>
						<div>
							<div class="qv_greyBG"
								style="height: 100px; border-bottom: none; overflow: auto;">
								<div style="margin-bottom: 5px;">已分配角色：</div>
								<div id="selected_div"></div>
							</div>
							<div class="qv_greyBG"
								style="height: 227px; border-bottom: none;  overflow: auto;">
								<div style="margin-bottom: 5px;">未分配角色：</div>	
								<div id="selecting_div"></div>
							</div>
							<div class="qv_greyBG"
								style="text-align: right; background: #FAFAFA;">
								<button id="buttion_add" class="flatten-btn disabled"
									style="width: 80px;">保存</button>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

-->