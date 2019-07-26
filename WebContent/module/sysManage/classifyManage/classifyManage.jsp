<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="true"%>
<style>
	.btn-group-a{
		position:absolute;
		top:60px;
		left:20px;
		z-index:1;
	}
	#treeTable{
		margin-top:30px;
	}
	#menudiv_tree{
		height: 200px;
	    overflow: auto;
	    display: block;
	    position: absolute;
	    width: 280px;
	    background: #fff;
	    box-shadow: 0 5px 10px rgba(0,0,0,.4);
	    display:none;
	}
	
	form.classifyM.form-horizontal .control-label{
		width: 100px;
	}
	form.classifyM.form-horizontal .controls{
		margin-left: 120px;
	}
	 
</style>

<section class="panel" style="position:relative">
	<p class="title">分类管理</p>
	<div class="content">
	<!-- 按钮组  -->
		<div class="btn-group-a">
			<button id="newBtn" type="button" class="addBtn">新增</button>
			<button id="updateBtn"  type="button" class="editBtn disabled">修改</button>
			<button id="DelBtn" type="button" class="delBtn disabled">删除</button>
		</div>
		<!-- treeTable -->
		<table id="treeTable" class="treetable">
			<thead>
				<tr>
					<th>分类名称</th>
					<th>分类编号</th>
					<th>分类顺序</th>
					<th>上级分类编号</th>
					<th>添加人</th>
					<th>添加日期</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<!-- 模态框-新增分类-->
		<div id="classifyManage-mol"  class="modal fade hide" data-backdrop="false" aria-hidden="true">
			<div class="modal-header">
				<button class="close" id="close-modal" type="button" data-dismiss="modal">&times;</button>
				<h3>新增分类</h3>
			</div>
			<div class="modal-body">
				<form class=" form-min form-horizontal classifyM">
					<div class="control-group">
						<label for="menu_pname" class="control-label required">上级分类名称</label>
						<div class="controls">
							<input class="span9" readonly="readonly" type="text" required
								id="menu_pname" placeholder="点击选择分类名称"> <span
								class="help-inline hide"></span>
							<div hidden id="menudiv_tree" class="ztree-div"
								style="height: 200px; overflow: auto;">
								<ul id="menu_parent_tree" class="ztree ztreecombo-ul"></ul>
							</div>
						</div>
					</div>
					<div class="control-group hide">
						<label for="menu_pregid" class="control-label">上级分类编号</label>
						<div class="controls">
							<input class="span9" type="text" id="menu_pregid"
						placeholder="选择分类名称后回显" disabled="disabled">
						<span
						class="help-inline hide"></span> 
						</div>
					</div>
					<div class="control-group hide">
						<label for="menu_mid" class="control-label">分类编号</label>
						<div class="controls">
							<input class="span9" id="menu_mid" type="text"
						data-value="" placeholder="由系统自动生成" disabled="disabled" />
						<span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="menu_name" class="control-label required">分类名称</label>
						<div class="controls">
							<input class="span9" type="text" id="menu_name" required placeholder="">
							<span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="menu_seq" class="control-label required">分类顺序</label>
						<div class="controls">
							<input class="span9" type="text" id="menu_seq" required
						placeholder=""> 
						<span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="menu_menuLevel" class="control-label">分类所属</label>
						<div class="controls">
							<select id="menu_menuLevel">
							<option value="1">主菜单</option>
							<option value="2">左侧菜单</option>
							</select>
						</div>
					</div>
					<div class="control-group hide">
						<label for="menu_path" class="control-label">分类路径</label>
						<div class="controls">
							<input class="span9" type="text" id="menu_path"
						placeholder="">
						<span
						class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="menu_createUser" class="control-label">添加人</label>
						<div class="controls">
							<input class="span9" type="text" id="menu_createUser"
						value="${sessionScope.username}" placeholder=""
						disabled="disabled"> <span class="help-inline hide"></span>
						</div>
					</div>
					<div class="control-group">
						<label for="menu_createtime" class="control-label">添加日期</label>
						<div class="controls">
							<input class="span9" type="text" id="menu_createTime"
						placeholder="" disabled="disabled"> <span
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
<div class="modal-div div-bg" id="view" style="min-height: 430px;">
	<div class="second_title">
		<span class="black-box"></span> <span class="title_content">分类管理</span>
	</div>
	<div style="padding: 10px">
		
		<div>
			<button id="newBtn" type="button" class="flatten-btn"><i class="fa fa-plus"></i>&nbsp;新增&nbsp;</button>
			<button id="updateBtn" type="button" class="flatten-btn disabled"><i class="fa fa-edit"></i>&nbsp;修改&nbsp;</button>
			<button id="DelBtn" type="button" class="flatten-btn disabled"><i class="fa fa-trash"></i>&nbsp;删除&nbsp;</button>
		</div>
		
		
		
		<table id="treeTable" class="clear" style="table-layout: fixed;">
			<thead>
				<tr>
					<th>分类名称</th>
					<th>分类编号</th>
					<th>分类顺序</th>
					<th>上级分类编号</th>
					<th>添加人</th>
					<th>添加日期</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
	<div id="div_mod" class="hide">
		<form>
			<table class="clear" style="table-layout: fixed; margin-left: 30px">
				<tr>
					<td><label class="control-label" style="text-align: left;">上级分类编号</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="menu_pregid"
						placeholder="选择分类名称后回显" disabled="disabled"> <span
						class="help-inline hide"></span></td>
				</tr>
				<tr>
					<td><label class="control-label" for="name"
						style="text-align: left;">上级分类名称</label></td>
				</tr>
				<tr class="table_tr">
					<td>
						<div class="ztree-bgdiv">
							<input class="span9" readonly="readonly" type="text"
								id="menu_pname" placeholder="点击选择分类名称"> <span
								class="help-inline hide"></span>
							<div id="menudiv_tree" class="ztree-div"
								style="height: 200px; overflow: auto;">
								<ul id="menu_parent_tree" class="ztree ztreecombo-ul"></ul>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td><label class="control-label" for="name"
						style="text-align: left;">分类编号</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" id="menu_mid" type="text"
						data-value="" placeholder="由系统自动生成" disabled="disabled" /> <span
						class="help-inline hide"></span></td>
				</tr>
				<tr>
					<td><label class="control-label" style="text-align: left;">分类名称</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="menu_name"
						placeholder=""> <span class="help-inline hide"></span></td>
				</tr>
				<tr>
					<td><label class="control-label"
						style="text-align: left; width: 100px">当前层级分类顺序</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="menu_seq"
						placeholder=""> <span class="help-inline hide"></span></td>
				</tr>
				<tr>
					<td><label class="control-label"
						style="text-align: left; width: 200px">分类所属</label></td>
				</tr>
				<tr class="table_tr">
					<td><select class="span9" id="menu_menulevel">
							<option value="1">主菜单</option>
							<option value="2">左侧菜单</option></td>
				</tr>
				<tr>
					<td><label class="control-label"
						style="text-align: left; width: 200px">分类路径</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="menu_path"
						placeholder=""> <span class="help-inline hide"></span></td>
				</tr>
				<tr>
					<td><label class="control-label" style="text-align: left;">添加人</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="menu_createuser"
						value="${sessionScope.username}" placeholder=""
						disabled="disabled"> <span class="help-inline hide"></span>
					</td>
				</tr>
				<tr>
					<td><label class="control-label" for="name"
						style="text-align: left;">添加日期</label></td>
				</tr>
				<tr class="table_tr">
					<td><input class="span9" type="text" id="menu_createtime"
						placeholder="" disabled="disabled"> <span
						class="help-inline hide"></span></td>
				</tr>
			</table>
		</form>
		<div class="form-actions" style="padding-left: 180px;">
			<button id="buttion_cancel" type="button" class="flatten-btn"
				style="background-color: #E6E6E6; color: #999; width: 80px;">取消</button>
			&nbsp;&nbsp;
			<button id="buttion_add" type="button" class="flatten-btn"
				style="width: 80px;">保存</button>
		</div>
	</div>
</div>

 -->



