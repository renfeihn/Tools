<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.logfilesearch-condition span {
	padding-left: 2em;
	line-height: 24px;
	font-size: 12px;
}
.logfilesearch-condition input {
	margin: 0 0 0 4px;
	width: auto;
}
.logfilesearch-condition>div {
	height: 24px;
	line-height: 24px;
    margin-bottom: 10px;
}
.logfilesearch-condition {
    display: flex;
    flex-wrap: wrap;
}
.dataTable-tips {
	position: absolute;
	color: #808080;
	font-size: 12px;
	margin-top: -20px;
}
table.dataTable.display tbody tr.odd > .sorting_1,
table.dataTable.order-column.stripe tbody tr.odd > .sorting_1 {
	background-color: transparent;
}
.logfilesearch-download,
.logfilesearch-download:hover {
	color: var(--color-theme);
}
.logFileSearch-button {
	display: block;
	margin: 0 auto;
}

/*三级分类选择start*/
.logfilesearch-condition .logSearchDetail-accessLogContent {
	position: relative;
    color: #5c5a66;
    z-index: 1;
    font-size: 12px;
    background-color: #fff;
    border: 1px solid #c6c7cc;
    display: inline-block;
    margin-left: 4px;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>span{
    width: 150px;
    line-height: 24px;
    display: block;
    color: #5c5a66;
    position: relative;
    cursor: pointer;
    padding: 0 30px 0 6px;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>span>i{
	height: 24px;
    width: 24px;
    background-color: #f9f9fb;
    line-height: 20px;
    font-size: 14px;
    position: absolute;
    right: 0px;
    text-align: center;
    border-left: 1px solid #c7c6cd;
    color: #c7c6cb;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div,
.logfilesearch-condition .logSearchDetail-accessLogContent>ul{
	display: none;
	background-color: #fff;
    border: 1px solid #c7c6cc;
    position: absolute;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>ul{
    box-shadow: 0px 4px 10px -4px #c7c6cc;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div {
	padding: 10px;
    width: 600px;
    left: 187px;
    box-shadow: 0px 4px 10px -4px #c7c6cc;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div>div:first-child {
	position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 2;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div>div:first-child button.light {
    background: #fff;
    border-color: var(--color-theme);
    color: var(--color-theme);
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div>div:first-child button.light:hover {
    background: var(--color-theme);
    color: #FFFFFF;
    border-color: var(--color-theme);
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div>div:first-child button{
	cursor: pointer;
	width: 70px;
	height: 35px;
	margin-left: 10px !important;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div h5 {
    font-weight: bold;
    cursor: pointer;
    width: auto;
    display: inline-block;
    line-height: 20px;
    padding: 0 5px;
    margin: 0;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div h5:not(.active):not(.disabled):hover,
.logfilesearch-condition .logSearchDetail-accessLogContent>div span:not(.active):not(.disabled):hover {
	text-decoration: underline;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div span.active,
.logfilesearch-condition .logSearchDetail-accessLogContent>div h5.active {
	background-color: #e1e2f0;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div div>span {
    color: #5e619f;
    cursor: pointer;
    flex: none;
    position: absolute;
    text-align: right;
    right: 420px;
    overflow: visible;
    white-space: nowrap;
    line-height: 24px;
    padding: 0 5px;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>div:nth-child(3) h5.disabled,
.logfilesearch-condition .logSearchDetail-accessLogContent>div:nth-child(3) div>span.disabled{
	cursor: default;
}
.logfilesearch-condition .logSearchDetail-accessLogList{
	border-bottom: 1px dashed #eee;
	margin-top: 10px !important;
}
.logfilesearch-condition .logSearchDetail-accessLogList:after{
	content: '';
	clear: both;
	display: block;
}
.logfilesearch-condition .logSearchDetail-accessLogList>div{
	/*margin-left: 150px !important;
    min-height: 30px;
    position: relative;
    top: -20px;*/
    display: inline-block;
    min-height: 30px;
    float: right;
    width: calc(100% - 180px);
}
.logfilesearch-condition .logSearchDetail-accessLogList>div>p{
	word-wrap: break-word;
}

.logfilesearch-condition .logSearchDetail-accessLogContent>div p>span {
    display: inline-block;
    cursor: pointer;
    padding: 0 5px;
    line-height: 20px;
    word-break: break-all;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>ul{
	width: 186px;
    cursor: pointer;
    margin: 0;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>ul>li {
	padding: 0 5px;
	height: 30px;
    line-height: 30px;
    position: relative;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>ul>li.choosed:before {
    content: '* ';
}
.logfilesearch-condition .logSearchDetail-accessLogContent>ul>li i {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    height: 16px;
    font-size: 16px;
    transform: none;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>ul>li.active {
	color: #505394;
    background: #d7d8f0;
}
.logfilesearch-condition .logSearchDetail-accessLogContent>ul>li:hover{
	background: #ebedf4;
}
/*三级分类选择end*/
</style>
<div style="padding: 15px;min-height: 100%;">
	<div class="logfilesearch-condition">
		<div>
			<span>文件范围</span>
			<div id="logSetting" class="logSearchDetail-accessLogContent">
				<span id="accessLog" data-val="1">可访问日志<i class="fa fa-sort-down"></i></span>
				<ul id="accessLogUl">
					<li>应用系统<i class="fa fa-angle-right"></i></li>
					<li>资产对象<i class="fa fa-angle-right"></i></li>
				</ul>
				<div id="appSystem">
				</div>
				<div id="assetObject">
				</div>
			</div>
		</div>
		<div>
			<span>文件起始结束时间</span>
			<input type="text" id="fileTime" style="width: 256px;">
			<!-- <input type="text" id="fileEndTime"> -->
		</div>
		<div>
			<span>主机IP</span>
			<input type="text" id="hostip" style="width: 180px;">
		</div>
		<div>
			<span>文件名称</span>
			<input type="text" id="filename" style="width: 220px">
		</div>
		<div style="padding: 0 30px;">
			<button type="button" class="logFileSearch-button">查询</button>
		</div>
	</div>
	<table id="dataTable" class="display dataTable table" style="user-select: text; cursor: text">
		<thead>
			<tr>
				<th>序号</th>
				<th>文件名称</th>
				<th>源文件大小</th>
				<th>修改时间</th>
				<th>主机IP</th>
				<th>文件路径</th>
				<th>操作</th>
			</tr>
		</thead>
		<tbody></tbody>
	</table>
	<i class="dataTable-tips">提示：按住<code>shift</code>点击表头，可多列排序。</i>
</div>
