<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.report-flex {
	height: calc(100vh - 40px);
	overflow: hidden;
	position: relative;
	background-color: #eff0ee;
}
.my-report {
	width: 450px;
	height: calc(100% - 71px);
	float: left
}
.design-report {
	height: calc(100% - 71px);
	overflow: auto;
	margin-left: 450px;
}
.report-content {
	background-color: #fff;
	border: 1px solid #cccccc;
	box-shadow: 0 4px 12px #cccccc;
	width: 210mm;
	height: 297mm;
	margin: 40px auto;
	overflow: hidden;
	position: relative;
}
.report-toolbar>span:hover {
	border: 1px solid #7b7b7b;
	background-image: linear-gradient(to bottom,#f2f2f2 0%,#dedede 100%);
}
.report-toolbar>span>i {
	font-size: 22px;
	color: #808080;
	display: block;
	margin: 5px auto;
}
.report-toolbar>span>span {
	font-size: 12px;
	display: block;
	font-weight: normal;
}
.report-toolbar>span {
	border: 1px solid transparent;
	height: 50px;
	min-width: 40px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 12px;
	text-align: center;
	margin-left: 10px;
}
.report-toolbar {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 70px;
	padding-right: 20px;
	background-color: #f6f6f6;
	border-bottom: 1px solid #ccc;
	box-shadow: 0 1px 4px #ccc;
}
.column-rule {
	border-left: 1px solid #c3c3c3;
	border-right: 1px solid #fff;
	height: 40px;
	width: 0px;
	margin-left: 10px; 
}
#addReportModal .checkbox.inline,
#addReportModal .radio.inline {
	padding-top: 2px !important;
	padding-bottom: 2px;
}
#addReportModal input[type=radio],
#addReportModal input[type=checkbox] {
	margin-top: 3px;
}
#addReportModal input[type="text"],
#addReportModal textarea {
	width: 260px;
}
.report-charts-list {
	height: 180px;
	overflow-y: auto;
	margin: 0;
	border: 1px solid #ccc;
}
.search-input {
    position: relative;
    display: flex;
}
.search-input input {
    width: 100%;
    margin: 0;
}
.search-input i {
    position: absolute;
    right: 1px;
    top: 1px;
    width: 22px;
    height: 22px;
    background-color: #f9f9fb;
    border-left: 1px solid #c7c6cc;
    text-align: center;
    color: #c7c6cc;
    line-height: 22px;
    font-weight: normal;
    cursor: pointer;
}
.my-report table tbody td i.fa:hover {
	opacity: 1;
}
.my-report table tbody td i.fa {
	cursor: pointer;
	color: var(--color-theme);
	opacity: 0.7;
}
.report-charts-list>li:nth-child(2n) {
	background-color: #f2f2f2;
}
.report-charts-list>li:nth-child(2n+1) {
	background-color: #fff;
}
.report-charts-list>li:hover {
	background-color: #e3e3e3;
}
.report-charts-list>li.disabled {
	color: #999;
    pointer-events: none;
}
.report-charts-list>li.selected>i {
	display: block;
}
.report-charts-list>li>i {
	float: right;
	display: none;
    position: relative;
    font-size: 18px;
    line-height: 30px;
    right: 20px;
    color: #2196f3;
}
.report-charts-list>li {
	height: 30px;
    line-height: 30px;
    font-size: 12px;
    font-weight: normal;
    text-indent: 2em;
}
.instance-item{
    position: absolute;
    background-color: #fff;
    width:300px; /*暂定*/
    height:300px; /*暂定*/
    min-width: 200px;
    min-height: 200px;
    padding: 15px;
    border-radius: 4px;
    display: flex;
    border: 1px solid #ccc;
    flex-direction: column;
    box-sizing: border-box;
}
.instance-item-header{
    height:20px;
    line-height:20px;
}
.instance-item-header .item-title{
    font-size: 16px;
    font-weight: bold;
    display:inline-block;
}
.charts-item{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.instance-item-header a{
    font-size: 16px;
    text-decoration: none;
    color:#9B9DBA;
    margin: 0 2px;
}
.instance-item-footer{
    position: absolute;
    width:100%;
    height: 25px;
    bottom: 0;
    right: 0;
    opacity: 0;
}
.instance-item-footer .resize-arrow{
    position: absolute;
    right:5px;
    bottom: 5px;
    display: inline-block;
    width: 10px;
    height: 10px;
    clip-path: polygon(10px 0, 0 10px, 10px 10px);
    background-color: #CACAD2;
    cursor: nw-resize;
}
.report-content>h3{
	font-weight: bold;
	text-align: center;
	margin-top: 30px;
}
.edit-group {
    opacity: 0;
    float: right;
    position: relative;
    z-index: 2;
}
.instance-item:hover .edit-group, .instance-item:hover .instance-item-footer {
    opacity: 1;
}
.report-toolbar .cannotUse {
	opacity: 0.5;
	pointer-events: none;
}
.report-StatisticCount>div>span>span {
	border-radius: 20px;
	line-height: 16px;
	background-color: #55a8fd;
	color: #fff;
	border-radius: 50px;
	display: inline-block;
	padding: 0 5px;
}
.report-StatisticCount>div>span:hover,
.report-StatisticCount>div>span.selected {
    color: #333;
    font-weight: bold;
}
.report-StatisticCount>div>span {
	display: inline-block;
	width: 80px;
	color: #666;
    font-weight: normal;
    cursor: pointer;
}
.report-StatisticCount {
	position: absolute;
	font-size: 12px;
    left: 20px;
    top: 25px;
    line-height: 20px;
}
</style>
<div class="report-flex">
	<div class="report-StatisticCount">
		<!-- <div>报表统计</div> -->
		<div>
			报表统计&nbsp;&nbsp;
			<span data-match="天">日报：<span id="dayCount"></span></span>
			<span data-match="周">周报：<span id="weekCount"></span></span>
			<span data-match="月">月报：<span id="monthCount"></span></span>
			<span data-match="年">年报：<span id="yearCount"></span></span>
		</div>
	</div>
	<div class="report-toolbar">
		<!-- <span class="cannotUse" title="即将开放">
			<i class="fa fa-font"></i>
			<span>文本</span>
		</span>
		<span class="cannotUse" title="即将开放">
			<i class="fa fa-list-alt"></i>
			<span>表格</span>
		</span> -->
		<span class="cannotUse" type="1">
			<i class="fa fa-line-chart"></i>
			<span>折线图</span>
		</span>
		<span class="cannotUse" type="2">
			<i class="fa fa-bar-chart"></i>
			<span>柱状图</span>
		</span>
		<span class="cannotUse" type="3">
			<i class="fa fa-pie-chart"></i>
			<span>饼状图</span>
		</span>
		<i class="column-rule"></i>
		<span class="cannotUse" data-role="save">
			<i class="fa fa-save"></i>
			<span>保存</span>
		</span>
	</div>
	<section class="panel my-report">

		<p class="title">报表列表</p>
		<div class="content">
			<div style="position: absolute;z-index: 2;">
				<button type="button" class="addBtn">新增</button>
			</div>
			<table id="dataTable" class="display dataTable table" style="table-layout:fixed">
				<thead>
					<tr>
						<th width="100px">报表名称</th>
						<th>周期</th>
						<th>历史报表</th>
						<th>创建人</th>
						<th width="90px">操作</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</section>
	<div class="design-report">
		<!-- 大小是绝对单位 A4纸大小-->
		<div class="report-content">
			<h3 id="reportTitle"></h3>
		</div>
		<!-- 大小是绝对单位 A4纸大小-->
	</div>
</div>
<div id="addReportModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" style="width: 600px;">
    <div class="modal-header">
        <button class="close" type="button" data-dismiss="modal">×</button>
        <h3>新增报表</h3>
    </div>
    <div class="modal-body">
    	<form id="form" class="form-horizontal">
			<div class="control-group">
				<label for="reportName" class="control-label required">名称</label>
				<div class="controls">
					<input type="text" id="reportName" required="required" placeholder="报表名称" />
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="remark" class="control-label">备注</label>
				<div class="controls">
					<textarea id="remark" rows="5"></textarea>
				</div>
			</div>
			<div class="control-group">
				<label for="frequency" class="control-label">执行周期</label>
				<div class="controls">
					<label class="radio inline" for="day"><input type="radio" checked="checked" name="frequency" value="day" id="day" >按天</label>
					<label class="radio inline" for="week"><input type="radio" name="frequency" value="week" id="week" >按周</label>
					<label class="radio inline" for="month"><input type="radio" name="frequency" value="month" id="month" >按月</label>
					<label class="radio inline" for="year"><input type="radio" name="frequency" value="year" id="year" >按年</label>
				</div>
			</div>
		</form>
    </div>
    <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
        <button type="button" class="confirmBtn" id="saveReport">完成</button>
    </div>
</div>

<div id="addChartsModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width:576px;">
    <div class="modal-header">
        <button class="close" type="button" data-dismiss="modal">×</button>
        <h3>选择图表</h3>
    </div>
    <div class="modal-body" >
    	<div style="height: 170px;">
    		<img id="previewImg" src="./img/echarts/workitem.png" alt="暂无预览" style="margin: 0 auto;max-height: 100%;display: block;">
    	</div>
    	<div style="display: flow-root;">
	    	<div class="search-input pull-right" style="margin: 10px 0px;width: 200px;">
				<input id="" type="text" placeholder="搜索"><i class="fa fa-search"></i>
			</div>
    	</div>
    	<ul class="report-charts-list">
    		
    	</ul>
    </div>
    <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
        <button type="button" class="confirmBtn" id="addItemCharts">完成</button>
    </div>
</div>