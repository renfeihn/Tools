<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.cmdbConfig-topoCtn .vis-edit-mode .vis-label {
	width: 30px;
}
.cmdbConfig-treeCtn {
	min-height: 250px;
	max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    display: block;
    position: absolute;
    width: 200px;
    background: #fff;
    box-shadow: 0 5px 10px rgba(0,0,0,.4);
}
</style>

<section class="panel" style="margin: 0;">
	<p class="title page-title">cmdb拓扑配置</p>
	<div class="content" style="padding: 0; position: relative;">
		<div id="topoCtn" class="cmdbConfig-topoCtn" style="width: 100%; height: calc(100vh - 132px);">
			
		</div>
		<button id="btn" class="confirmBtn" type="button" style="position: absolute; bottom: 20px; right: 20px;">保存</button>
	</div>
</section>

<!-- 模态框-新增交易-->
<div id="nodeModal" class="modal fade hide" data-backdrop="false" aria-hidden="true" style="width: 800px;">
	<div class="modal-header">
		<button id="closeBtn" class="close" type="button" data-dismiss="modal">&times;</button>
		<h3 id="nodeTitle">新增节点</h3>
	</div>
	<div class="modal-body" style="overflow: visible;">
		<div style="border: 1px solid #ddd; overflow: hidden;">
			<div style="float: left; width: 210px; height: 330px; overflow-y: auto;">
				<ul class="ztree"></ul>
			</div>
			<div style="float: left; height: 330px; width: 548px; box-sizing: border-box; padding: 10px; background: #f1f0f5;">
				<div style="width: 528px; height: 310px; background: #fff; box-sizing: border-box; padding: 10px;">
					<table id="objTable" class="dataTable">
						<thead>
							<tr>
								<th width="15%"><input id="checkboxAll" type="checkbox"/></th>
								<th>对象ID</th>
								<th>对象名</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button id="cancelBtn" type='button' class="cancelBtn" data-dismiss="modal">取消</button>
		<button id="saveBtn" type='button'  class="confirmBtn" data-dismiss="modal">确认</button>
	</div>
</div>
<!-- 模态框结束 -->

<!-- 模态框-->
<div id="topoModal" class="modal fade hide" data-backdrop="false" aria-hidden="true">
	<div class="modal-header">
		<button id="closeBtn" class="close" type="button" data-dismiss="modal">&times;</button>
		<h3>保存配置</h3>
	</div>
	<div class="modal-body" style="overflow: visible;">
		<form class="form-min form-horizontal" style="margin-left: 50px;">
			<div class="control-group">
				<label for="toponame" class="control-label">拓扑名称</label>
				<div class="controls">
					<input class="span9" id="toponame" name="toponame" type="text"
				data-value="" placeholder="" /> <span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="limit" class="control-label">权限设置</label>
				<div class="controls">
					<select id="limit" name="limit" style="width: 205px;">
						<option value="1">私有</option>
						<option value="0">公有</option>
					</select> <span class="help-inline hide"></span>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type='button' class="cancelBtn" data-dismiss="modal">取消</button>
		<button id="confirmBtn" type='button'  class="confirmBtn">确认</button>
	</div>
</div>
<!-- 模态框结束 -->
