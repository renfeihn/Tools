<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.app-chain2 .tables-wrap {
	display: flex;
}
.app-chain2 .tables-wrap>div {
	flex: 1;
	position: relative;
}
.app-chain2 .tables-wrap>div:first-child {
	margin-right: 10px;
}
.app-chain2 .tables-wrap>div>table {
	width: 100%;
}
.app-chain2 .form-horizontal.clear-modal .control-label {
	width: 105px;
}
.app-chain2 .form-horizontal.clear-modal .controls {
	margin-left: 125px;
}
.app-chain2 .clear-modal{
	position: absolute;
	right: 0;
	transform: translateX(110%);
	transition: all .3s;    
	width: 450px;
	background: #fafafc;
	padding: 20px;
	border: 1px solid #e9e8ed;
	overflow-y: auto;
	top: 0;
	bottom: 0;
	box-shadow: -4px 0 10px rgba(0,0,0,.4);
	margin: 0;
}
.app-chain2 .clear-modal.show {
	transform: translateX(0%);
}

.app-chain2 .clear-modal.uneditable .uneditable{
	display: none;
}
.app-chain2 .clear-modal .field-item:hover>.delete {
	display: block;
}
.app-chain2 .clear-modal.uneditable .field-item:hover>.delete {
	display: none;
}
.app-chain2 .clear-modal select {
	width: 205px;
}
.app-chain2 .edit-btn {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    color: var(--color-theme);
    margin-right: 5px;
    border-radius: 2px;
    cursor: pointer;
}
.app-chain2 .edit-btn>i {
	margin: 0;
}
.app-chain2 .edit-btn:hover {
    background: var(--color-theme);
    color: #fff;
}
.app-chain2 .field-item {
	position: relative;
    background: #eff1f3;
    border: solid 1px #dee4e8;
    border-radius: 2px;
    padding: 5px 0;
    margin-bottom: 10px;
}
.app-chain2 .field-item .delete {
    position: absolute;
    top: -8px;
    right: -8px;
    display: none;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    background: #2196F3;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
}
.app-chain2 .field-add {
    line-height: 30px;
    text-align: center;
    margin-bottom: 20px;
    color: #2196F3;
    cursor: pointer;
}
</style>

<div class="app-chain2">
	<div class="tables-wrap">
		<div class="apptab-wrap">
			<button type="button" class="addBtn" id="addRelationBtn" style="position: absolute;z-index: 1;">新增</button>
			<table id="app_table" class="display dataTable table"></table>
		</div>
		<!-- <div class="fieldtab-wrap">
			<button type="button" class="addBtn" id="addFieldsBtn" style="position: absolute;z-index: 1;">新增</button>
			<table id="field_table" class="display dataTable table"></table>
		</div> -->
	</div>
	
	<form class="form-horizontal clear-modal uneditable" id="modal">
		
	</form>
</div>

