<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
	.parseRuleManage-addBtn,.parseRuleManage-addBtn:hover {
		color: #FFF;
		background-color: var(--color-theme);
		border: 1px solid var(--color-theme);
		height: 26px;
		padding: 0 10px;
	}
	.parseRuleManage-addBtn:hover {
		opacity: 0.7;
	}
	#addRuleModal .form-horizontal .control-label {
		width: 120px;
	}
	#addRuleModal .form-horizontal .controls {
		margin-left: 130px;
	}
	.text-button {
		color: var(--color-theme);
		cursor: pointer;
	}
	pre#dataExample {
		box-shadow: none;
		border: 1px solid #c6c7cc;
		border-radius: 2px;
		margin: 0;
		min-height: 100px;
		overflow: auto;
	}
	#addRuleModal .form-horizontal .controls .boolean-switch.true:BEFORE {
		margin-left: 20px;
	}
	#addRuleModal .form-horizontal .controls .boolean-switch:BEFORE {
		border-radius: 50%;
		width: 20px;
	}
	#addRuleModal .form-horizontal .controls .boolean-switch {
		border-radius: 20px;
	}
	#addRuleModal .form-horizontal .controls input[type="text"] {
		width: -webkit-fill-available;
	}
</style>
<div style="padding: 20px;">
	<div style="position: absolute;z-index: 1;">
		<button type="button" id="addRuleBtn" class="parseRuleManage-addBtn">新增解析规则</button>
	</div>
	<span style="position: absolute;right: 200px;z-index: 2;">所属资源 <select name="" id="soft_select" style="margin: 0 0 0 4px;"></select></span>
	<table id="logSourceTable" class="display dataTable table"></table>
</div>

<div id="addRuleModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" style="width: 1300px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="addLogClassModalTitle">新增</h3>
	</div>
	<div class="modal-body" style="max-height: calc(100vh - 100px);">
		
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
		<button id="logClassAdd" type="button" class="confirmBtn">保存</button>
	</div>
</div>