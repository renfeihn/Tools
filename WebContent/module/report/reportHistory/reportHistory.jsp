<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style id="reportStyle">
.reportHis-info input {
	margin: 0;
	width: 180px;
	margin-right: 20px 
}
.reportHis-info>span>span {
	color: #333;
	font-weight: 500;
}
.reportHis-info>span {
	color: #808080;
	font-weight: normal;
}
.reportHis-info {
	display: flex;
	height: 50px;
	align-items: center;
	justify-content: space-around;
	font-size: 12px;
	box-shadow: 0 2px 4px -10px rgba(204, 204, 204, 0.5);
	border-bottom: 1px solid #ccc;
}
.report-content {
    background-color: #fff;
    border: 1px solid #cccccc;
    box-shadow: 0 4px 12px #cccccc;
    width: 210mm;
    height: 297mm;
    margin: auto;
    overflow: hidden;
    position: relative;
}
.report-chooseDate>ul>li.selected {
	background-color: var(--color-theme);
	color: #fff;
}
.report-chooseDate>ul>li+li {
	border-top: 1px solid #ccc;
}
.report-chooseDate>ul>li {
	cursor: pointer;
	text-align: center;
}
.report-chooseDate>ul+ul {
	border-left: 1px solid #ccc;
}
.report-chooseDate>ul {
	flex: 1;
	margin: 0;
}
.report-chooseDate {
	position: absolute;
    background-color: #fff;
    border-radius: 0 0 4px 4px;
    border: 1px solid #ccc;
    box-shadow: 0 6px 4px -3px rgba(0,0,0,0.2);
    margin: 0;
    left: 7em;
    width: 180px;
    box-sizing: border-box;
    border-top: none;
    display: flex;
}
.report-content>h3{
	font-weight: bold;
	text-align: center;
	margin-top: 30px;
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
.download-report {
    color: var(--color-theme);
    text-decoration: underline;
    cursor: pointer;
    font-size: 12px;
}
#printFrame img {
    padding: 0;
    margin: 0;
    display: block;
}
</style>
<div class="reportHis-info">
	<span>报表名称：<span id="reportName"></span></span>
	<span>执行周期：<span id="frequency"></span></span>
	<span>创建人：<span id="username"></span></span>
	<span>报表数量：<span id="reportHistoryCount"></span></span>
	<div style="flex: none;line-height: 24px;position: relative;">
		选择查看日期：<input id="executeTime" type="text" readonly="readonly">
		<div class="report-chooseDate hide">
			<ul data-list="year">
			</ul>
			<ul data-list="month">
			</ul>
			<ul data-list="day">
			</ul>
		</div>
        <span class="download-report">下载</span>
	</div>
</div>
<div style="padding: 40px 0;background-color: #eff0ee;height: calc(100vh - 91px);overflow-y: auto;box-sizing: border-box;">
	<div class="report-content">
		<h3 id="reportTitle"></h3>
	</div>
</div>

<div id="printFrame"></div>