<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="true"%>
<style>
	.btn-group-a{
		position:absolute;
		top:60px;
		left:20px;
		z-index:1;
	}
	#tradediv_tree{
		height: 180px;
	    overflow-y: auto;
	    overflow-x: hidden;
	    display: block;
	    position: absolute;
	    width: 200px;
	    background: #fff;
	    box-shadow: 0 5px 10px rgba(0,0,0,.4);
	    display:none;
	}
</style>

<section class="panel" style="position:relative">
	<p class="title">交易管理</p>
	<div class="content">
	<!-- 按钮组  -->
		<div class="btn-group-a">
			<button id="newBtn" type="button" class="addBtn">新增</button>
			<button id="updateBtn" class="editBtn disabled">修改</button>
			<button id="DelBtn" type="button" class="delBtn disabled">删除</button>
		</div>
		<!-- dataTables -->
		<table id="tradeTable" class="display table dataTable">
			<thead>
				<tr>
					<th>序号</th>
					<th>交易名称</th>
					<th>交易路径</th>
					<th>菜单分类</th>
					<th>交易状态</th>
					<th>添加人</th>
					<th>添加日期</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<!-- 模态框-新增交易-->
		<div tabindex="-1" id="transManage-mol" class="modal fade hide" data-backdrop="false" aria-hidden="true">
			<div class="modal-header">
				<button class="close" type="button" data-dismiss="modal">&times;</button>
				<h3>新增交易</h3>
			</div>
			<div class="modal-body">
				<form class=" form-min form-horizontal">
					<div class="control-group">
						<label for="trade_prename" class="control-label">菜单分类</label>
						<div class="controls">
							<div class="ztree-bgdiv">
								<input class="span9" readonly="readonly" type="text"
									id="trade_prename" placeholder="点击选择分类名称"> <span
									class="help-inline hide"></span>
								<div id="tradediv_tree" class="ztree-div">
									<ul id="trade_tree" class="ztree ztreecombo-ul"></ul>
								</div>
							</div>
						</div>
					</div>
					<div class="control-group">
						<label for="trade_name" class="control-label">交易名称</label>
						<div class="controls">
							<input class="span9" type="text" id="trade_name"
						placeholder=""> <span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="trade_path" class="control-label">交易路径</label>
						<div class="controls">
							<input class="span9" id="trade_path" type="text"
						data-value="" placeholder="" /> <span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="trade_state" class="control-label">交易状态</label>
						<div class="controls">
							<select id="trade_state">
								<option value="1">已启用</option>
								<option value="0">未启用</option>
							</select> <span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="trade_createUser" class="control-label">添加人</label>
						<div class="controls">
							<input class="span9" type="text" id="trade_createUser"
						value="${sessionScope.username}" placeholder=""
						readonly="readonly"> <span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="trade_createTime" class="control-label">添加日期</label>
						<div class="controls">
							<input class="span9" type="text" id="trade_createTime"
						placeholder="" readonly="readonly"> <span
						class="help-inline hide"></span>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button id="buttion_cancel" type='button' class="cancelBtn">取消</button>
				<button id="buttion_add" type='button'  class="confirmBtn">保存</button>
			</div>
		</div>
		<!-- 模态框结束 -->
	</div>
</section>
<!-- 结束 -->


<!-- 
<div class="modal-div div-bg" style="min-height: 430px;">
	<div class="second_title">
		<span class="black-box"></span> <span class="title_content">交易管理</span>
	</div>
	<div style="padding: 10px">
		
		<div class="gutter-bottom"
			style="position: absolute; margin-top: 8px; z-index: 2;">
			<button id="newBtn" type="button" class="flatten-btn">
				<i class="fa fa-plus"></i>&nbsp;新增&nbsp;
			</button>
			<button id="updateBtn" type="button" class="flatten-btn disabled">
				<i class="fa fa-edit"></i>&nbsp;修改&nbsp;
			</button>
			<button id="DelBtn" type="button" class="flatten-btn disabled">
				<i class="fa fa-trash"></i>&nbsp;删除&nbsp;
			</button>
		</div>
		<table id="tradeTable"
			class="display dataTable table table-bordered no-footer"
			style="table-layout: fixed;">
			<thead>
				<tr>
					<th width="5%">序号</th>
					<th width="15%">交易名称</th>
					<th width="25%">交易路径</th>
					<th width="15%">菜单分类</th>
					<th width="12%">交易状态</th>
					<th width="14%">添加人</th>
					<th width="14%">添加日期</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
	<div id="trade_mod" class="hide">
		<form>
			<table class="clear" style="table-layout: fixed; margin-left: 30px">
				<tr>
					<td><label class="control-label" style="text-align: left;">菜单分类</label></td>
				</tr>
				<tr class="table_tr">
					<td>
						<div class="ztree-bgdiv">
							<input class="span9" readonly="readonly" pid="" type="text"
								id="trade_prename" placeholder="点击选择分类名称"> <span
								class="help-inline hide"></span>
							<div id="tradediv_tree" class="ztree-div"
								style="height: 200px; overflow-y: auto;overflow-x: hidden;">
								<ul id="trade_tree" class="ztree ztreecombo-ul"></ul>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td><label class="control-label" for="name"
						style="text-align: left;">交易名称</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="trade_mname"
						placeholder=""> <span class="help-inline hide"></span></td>
				</tr>
				<tr>
					<td><label class="control-label" for="name"
						style="text-align: left;">交易路径</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" id="trade_mpath" type="text"
						data-value="" placeholder="" /> <span class="help-inline hide"></span>
					</td>
				</tr>
				<tr>
					<td><label class="control-label" style="text-align: left;">交易状态</label></td>
				</tr>
				<tr class="table_tr">
					<td><select class="span9" id="trade_mstate">
							<option value="1">已启用</option>
							<option value="0">未启用</option>
					</select> <span class="help-inline hide"></span></td>
				</tr>
				<tr>
					<td><label class="control-label" style="text-align: left;">添加人</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="trade_mcreateUser"
						value="${sessionScope.username}" placeholder=""
						readonly="readonly"> <span class="help-inline hide"></span>
					</td>
				</tr>
				<tr>
					<td><label class="control-label" for="name"
						style="text-align: left;">添加日期</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="trade_mcreateTime"
						placeholder="" readonly="readonly"> <span
						class="help-inline hide"></span></td>
				</tr>
			</table>
		</form>
		<div class="form-actions" style="text-align: center;">
			<button id="buttion_cancel" type="button" class="flatten-btn"
				style="background-color: #E6E6E6; color: #999; width: 80px;">取消</button>
			&nbsp;&nbsp;
			<button id="buttion_add" type="button" class="flatten-btn"
				style="width: 80px;">保存</button>
		</div>
	</div>
</div>

 -->
