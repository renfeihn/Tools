<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
@import url(css/pagination.css); 
.sql-tool-page {
    height: calc(100vh - 42px);
    margin-bottom: 0!important;
    overflow: hidden;
}
.sql-tool-page input,
.sql-tool-page select,
.sql-tool-page ul {
	margin: 0!important;
}
.sql-tool-page .tab-content {
	height: calc(100% - 40px);
}
.sql-tool-page .tab-content>#tabs1 {
    height: calc(100% - 40px);
    overflow: hidden;
}
.sql-tool-page .sql-tool-content,
.sql-tool-page .sql-tool-content>div,
.sql-tool-page .sql-tool-content>div>div {
	height: 100%;
}
/* SQL分类 */
/*三级分类选择start*/
.sql-tool-page .logSearchDetail-accessLogContent * {
    margin: initial !important;
    box-sizing: border-box;
}
.sql-tool-page .logSearchDetail-accessLogContent {
    position: absolute;
    top: 54px;
    left: 20%;
    height: 600px;
    color: #5c5a66;
    z-index: 1;
    font-size: 12px;
    background-color: #fff;
}
.sql-tool-page .logSearchDetail-accessLogContent>span{
    width: 220px;
    line-height: 38px;
    display: block;
    color: #5c5a66;
    position: relative;
    cursor: pointer;
    padding: 0 60px 0 20px;
}
.sql-tool-page .logSearchDetail-accessLogContent>span>i{
	height: 100%;
    width: 40px;
    background-color: #f9f9fb;
    line-height: 30px;
    font-size: 20px;
    position: absolute;
    right: 0px;
    text-align: center;
    border-left: 1px solid #c7c6cd;
    color: #c7c6cb;
}
.sql-tool-page .logSearchDetail-accessLogContent>div,
.sql-tool-page .logSearchDetail-accessLogContent>ul{
	background-color: #fff;
    border: 1px solid #c7c6cc;
    position: absolute;
}
.sql-tool-page .logSearchDetail-accessLogContent>ul{
    box-shadow: -1px 1px 2px #c7c6cc;
}
.sql-tool-page .logSearchDetail-accessLogContent>div {
    width: 584px;
    left: 179px;
    box-shadow: 1px 1px 2px #c7c6cc;
}
.sql-tool-page .logSearchDetail-accessLogContent>div>div:first-child {
	position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 2;
}
.sql-tool-page .logSearchDetail-accessLogContent>div>div:first-child button.light {
    background: #fff;
    border-color: var(--color-theme);
    color: var(--color-theme);
}
.sql-tool-page .logSearchDetail-accessLogContent>div>div:first-child button.light:hover {
    background: var(--color-theme);
    color: #FFFFFF;
    border-color: var(--color-theme);
}
.sql-tool-page .logSearchDetail-accessLogContent>div>div:first-child button{
	cursor: pointer;
	width: 70px;
	height: 35px;
	margin-left: 10px !important;
}
.sql-tool-page .logSearchDetail-accessLogContent>div h5 {
    font-weight: bold;
    cursor: pointer;
    width: auto;
    display: inline-block;
    line-height: 20px;
    padding: 0 5px;
}
.sql-tool-page .logSearchDetail-accessLogContent>div h5:not(.active):not(.disabled):hover,
.sql-tool-page .logSearchDetail-accessLogContent>div span:not(.active):not(.disabled):hover {
	text-decoration: underline;
}
.sql-tool-page .logSearchDetail-accessLogContent>div span.active,
.sql-tool-page .logSearchDetail-accessLogContent>div h5.active {
	background-color: #e1e2f0;
}
.sql-tool-page .logSearchDetail-accessLogContent>div div>span {
    color: #5e619f;
    cursor: pointer;
    flex: none;
    position: absolute;
    text-align: right;
    right: 420px;
    overflow: visible;
    white-space: nowrap;
    line-height: 20px;
    padding: 0 5px;
}
.sql-tool-page .logSearchDetail-accessLogContent>div:nth-child(3) h5.disabled,
.sql-tool-page .logSearchDetail-accessLogContent>div:nth-child(3) div>span.disabled{
	cursor: default;
}
.sql-tool-page .logSearchDetail-accessLogList{
	border-bottom: 1px dashed #eee;
	margin-top: 10px !important;
}
.sql-tool-page .logSearchDetail-accessLogList:after{
	content: '';
	clear: both;
	display: block;
}
.sql-tool-page .logSearchDetail-accessLogList>div{
	/*margin-left: 150px !important;
    min-height: 30px;
    position: relative;
    top: -20px;*/
    display: inline-block;
    min-height: 30px;
    float: right;
    width: calc(100% - 160px);
}
.sql-tool-page .logSearchDetail-accessLogList>div>p{
	word-wrap: break-word;
}

.sql-tool-page .logSearchDetail-accessLogContent>div p>span {
    display: inline-block;
    cursor: pointer;
    padding: 0 5px;
    margin: 0 5px 5px 5px !important;
    line-height: 20px;
    word-break: break-all;
}
.sql-tool-page .logSearchDetail-accessLogContent>ul{
	width: 180px;
    cursor: pointer;
}
.sql-tool-page .logSearchDetail-accessLogContent>ul>li {
	padding: 0 5px;
	height: 50px;
    line-height: 50px;
    position: relative;
}
.sql-tool-page .logSearchDetail-accessLogContent>ul>li.choosed:before {
    content: '* ';
}
.sql-tool-page .logSearchDetail-accessLogContent>ul>li i {
    position: absolute;
    right: 5px;
    top: 10px;
    transform: translateY(10px);
}
.sql-tool-page .logSearchDetail-accessLogContent>ul>li.active {
	color: #505394;
    background: #d7d8f0;
}
.sql-tool-page .logSearchDetail-accessLogContent>ul>li:hover{
	background: #ebedf4;
}
/*三级分类选择end*/
/* SQL分类 */
</style>
<section class="panel sql-tool-page">
	<ul class="nav nav-tabs nav-public" id="page_ul">
		<li class="active" data-skip="dataQueryTool#dataQueryWrite"><a href="#tabs3" data-toggle="tab">数据查询</a></li>
		<li  data-skip="dataQueryTool#sysParamConfig"><a href="#tabs1" data-toggle="tab">系统参数配置</a></li>
		<li  data-skip="dataQueryTool#auditQuery"><a href="#tabs2" data-toggle="tab">审计查询</a></li>
		<li  data-skip="dataQueryTool#approveList"><a href="#tabs4" data-toggle="tab">审批列表</a></li>
		<li  data-skip="dataQueryTool#poolConfig"><a href="#tabs5" data-toggle="tab">数据源管理</a></li>
		
	</ul>
	<div class="tab-content">
		<div id="tabs1" class="tab-pane active">
			<div class="sql-tool-content"  id="sqlToolContent"></div>
		</div>
	</div>
</section>