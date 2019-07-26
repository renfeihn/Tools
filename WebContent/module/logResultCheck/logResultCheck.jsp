<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.logResultCheck-container>li i {
    position: absolute;
    right: 8px;
    top: 14px;
    cursor: pointer;
    font-size: 12px;
}
.logResultCheck-container>li>a {
	overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.logResultCheck-container>li:last-child {
    padding: 0 12px;
    height: 39px;
    line-height: 36px;
    margin: 0;
    font-size: 14px;
    width: auto;
    cursor: pointer;
    float: right;
    color: #7378fa;
}
.logResultCheck-container>li:last-child:before{
    content: '+';
    font-size: 26px;
    font-weight: normal;
    margin-right: 5px;
    height: 100%;
    display: inline-block;
    line-height: 33px;
}
.logResultCheck-Content{
    width: 100%;
}
.logResultCheck-Content>div {
	padding: 0 !important;
}
.logResultCheck-container>li {
    width: 150px;
    overflow: hidden;
    position: relative;
}
</style>
<section class="panel" style="margin:0;">
	<ul class="nav nav-tabs nav-public logResultCheck-container" id="searchTabs">
		<li class="active"><a href="#tabs1" data-toggle="tab">新增日志搜索页<i class="fa fa-close"></i></a></li>
		<li id="addTab">新增搜索</li>
	</ul>
	<div class="tab-content logResultCheck-Content" id="searchContents">
		<div id="tabs1" class="tab-pane active"></div>
	</div>
</section>
