<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
	.useroperation-search-select {
		vertical-align: bottom;
		margin: 0 20px 0 10px;
	}
	
	.useroperation-icon {
		margin-left: 10px;
		vertical-align: middle;
		color: #5b62f9;
		font-size: 28px;
		line-height: 25px;
		cursor: pointer;
	}
	
	.useroperation-modal-text {
		width: 200px;
	}
	
	.useroperation-table>tbody>tr {
		cursor: pointer;
	}
	/* 	.tip-fixed {
		position: fixed;
	} */
	
	.controls>.logkeyword-modal-radio {
		margin: 0;
	}
	
	.logkeyword-modal-radio-text {
		vertical-align: middle;
	}
	
	.content label {
		display: inline-block;
	}
	
	.useroperation .control-group {
		display: inline-block;
	}
	
	.manageInputText {
		width: 100px;
	}
	
	.manageBtnBox {
		padding: 8px;
	}
	
	.manageBtnBox button {
		margin-left: 10px;
	}
	
	.useroperation_query {
		padding-left: 18px;
		min-height: 200px;
		max-height: 250px;
		overflow-y: auto;
	}
	
	.useroperation_query input[type=text] {
		width: 80px;
	}
	
	.useroperation_query input[type=checkbox] {
		margin: 0 5px
	}
	
	.useroperation_query .table tr {
		position: relative;
	}
	
	.useroperation_query .table td {
		text-align: left;
		vertical-align: middle;
		width: 130px;
		position: relative;
	}
	
	.useroperation_query .table td:nth-child(1) {
		width: 105px;
	}
	
	.useroperation_query .table td:nth-child(2) {
		width: 460px;
	}
	
	.useroperation_query .table th {
		width: 130px;
	}
	
	.useroperation_query .table th:nth-child(1) {
		width: 105px;
	}
	
	.useroperation_query .table th:nth-child(2) {
		width: 460px;
	}
	
	.useroperation_content {
		width: 70%;
		float: left;
	}
	
	
	#AppObjectSearchSelect_getobject {
		display: none;
		position: absolute;
		width: 200px;
		height: 195px;
		overflow-x: hidden;
		overflow-y: auto;
		z-index: 1;
		box-shadow: 0 6px 10px rgba(0, 0, 0, .3);
		border-radius: 4px;
		left: 550px;
		background-color: #fff;
		box-sizing: border-box;
	}
	
	#AppObjectSearchSelect_getobject>li {
		padding: 5px 0px 5px 25px;
		course: pointer;
	}
	
	#AppObjectSearchSelect_getobject>li:hover {
		background-color: #F1F0F5;
	}
	
	#useroperation_severId {
		width: 40px;
		display: inline-block;
	}
	
	.useroperation_query .table>thead>tr>th {
		text-align: left;
	}
	
	.useroperation label{
	  margin-left:20px;
	  display: inline-block;
	  margin-right:5px;
	}
	.useroperation_box input,.useroperation_box select{
		
		margin:0px 5px 5px 5px;
		
	}
</style>

<section class="panel">
	<p class="title">用户操作历史</p>
	<div id="useroperation" class="content useroperation" style="overflow: hidden;">
		<div class="useroperation_box" style="margin-bottom:20px;">
			<label for="startdate">开始日期</label>
			<input id="startdate" type="text" placeholder="开始日期">
			<label for="enddate">结束日期</label>
			<input id="enddate" type="text" placeholder="结束日期">
			<label for="userSearchSelect">操作用户</label>
			<select id="userSearchSelect" class="">
				<option value="" selected="selected">全部</option>
			</select>
			<button id="searchBtn" style="margin-bottom: 5px;margin-left:20px">查询</button>
		</div>
		<div class="content">
			<table id="table" class="display dataTable table " style="table-layout: fixed;">
				<thead>
					<tr>
						<th>序号</th>
						<th>交易</th>
						<th>操作内容</th>
						<th>操作用户</th>
						<th>操作时间</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</section>