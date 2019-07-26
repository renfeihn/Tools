<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	/*.dataManagerDetail-container .diy-form input, .dataManagerDetail-container .diy-form .controls>label, .dataManagerDetail-container .diy-form select, .dataManagerDetail-container .diy-form button, .dataManagerDetail-container .diy-form textarea{
		 pointer-events: none;
	}*/
	.main>div {
    background: #FFF;
    padding: 20px 20px 0;
    border-radius: 4px;
    overflow:auto;
    box-sizing: border-box;
}
.detail-wrap {
	height: 100%;
}
.detail-wrap .btns-wrap {
	display: flex;
	justify-content: space-between;
    margin-bottom: 10px;
}
.detail-wrap .viewtype-wrap>span {
    display: inline-block;
    padding: 0px 15px;
    border: solid 1px #d4cfcf;
    background: #f1f1f1;
    font-size: 12px;
    cursor: pointer;
}
.detail-wrap .viewtype-wrap>span.active {
    background: #2196F3;
    color: #fff;
    border-color: #2196F3;
}
.detail-wrap .edit-wrap>span {
    border: solid 1px #b5aeae;
    border-radius: 2px;
    padding: 2px 8px;
    background: #fafafc;
    cursor: pointer;
}
.detail-wrap .edit-wrap>span>i {
	margin-right: 4px;
}
.detail-wrap .edit-wrap>span:hover {
    background: #2196f3;
    color: #fff;
    border-color: #2196f3;
}
.detail-wrap form {
	padding: 0;
}
.detail-wrap .dataManagerDetail-list {
	position: relative;
}
.detail-wrap .dataManagerDetail-list #dataTable_filter {
   float: left;
}
.form-wrap>form {
    pointer-events: auto!important;
}
#updateForm .diy-form .control-group,
.detail-wrap .diy-form .control-group {
	width: auto;
}
#updateForm .diy-form *.disabled,
.detail-wrap .diy-form *.disabled {
    opacity: 1;
}

</style>
<div class="detail-wrap">
	<div class="btns-wrap">
		<div class="viewtype-wrap">
			<span class="active">视图</span><span>列表</span>
		</div>
		<div class="edit-wrap">
			<span class="edit-btn"><i class="fa fa-edit"></i>编辑</span>
		</div>
	</div>
	<div class="detail-content">
		<div class="dataManagerDetail-container"></div>
		<div class="dataManagerDetail-list hide">
			<table id="dataTable" class="display dataTable shanxi_datatable table">
				<thead>
					<tr>
						<th>序号</th>
						<th>属性中文名</th>
						<th>属性英文名</th>
						<th>类型</th>
						<th>长度</th>
						<th>是否自发现</th>
						<th>枚举id</th>
						<th>字段单位</th>
						<th>组件类型</th>
						<th>是否必输</th>
						<th>是否主键</th>
						<th>是否启用</th>
						<th>值</th>
						<th>更新时间</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
</div>
<div id="updateForm" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 80%;left: 10%;height: 80%!important;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">属性编辑</h3>
	</div>
	<div class="modal-body" style="max-height: 64vh;">
		<div class="form-wrap"></div>
	</div>
	<div class="modal-footer" style="text-align: center;">
		<button type="button" data-dismiss="modal" class="confirmBtn">保存</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
	</div>
</div>