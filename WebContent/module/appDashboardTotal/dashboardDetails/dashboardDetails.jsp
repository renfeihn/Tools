<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.dashboadrd-detail {
	margin-bottom: 0!important;
}
.add-page {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 8px;
    color: #4494fc;
    cursor: pointer;
}
.add-page>i {
	margin-right: 2px;
}
.add-page:hover {
    color: #87afe2;
}
.dashboadrd-detail .panel-wrap {
	min-height: 60vh;
}
</style>
<section class="panel dashboadrd-detail">
	<ul class="nav nav-tabs nav-public" id="ul_nav">
		<li class="active" data-skip="appDashboardTotal#appDashboardHome"><a href="#tabs1" data-toggle="tab">应用分析</a></li>
		<li data-skip="CDMB_AppRel"><a href="#tabs2" data-toggle="tab">应用关系</a></li>
		<li data-skip="CDMB_AppRel#cmdb_appNode"><a href="#tabs3" data-toggle="tab">应用节点</a></li>
		<li data-skip="CDMB_AppEvent"><a href="#tabs4" data-toggle="tab">应用事件</a></li>
		<li data-skip="appDashboardTotal#flowMonitor"><a href="#tabs5" data-toggle="tab">流量监控</a></li>
		<!-- <li data-skip="appDashboardTotal#dataAnalyse"><a href="#tabs2" data-toggle="tab">数据分析</a></li>
		<li data-skip="appDashboardTotal#tradeAnalyse"><a href="#tabs3" data-toggle="tab">交易分析</a></li>
		 -->
		 <span class="add-page hide"><i class="fa fa-plus"></i>新建</span>
	</ul>
	<div class="tab-content">
		<div id="tabs1" class="tab-pane active"></div>
		<div id="tabs2" class="tab-pane"></div>
		<div id="tabs3" class="tab-pane"></div>
		<div id="tabs4" class="tab-pane"></div>
		<div id="tabs5" class="tab-pane"></div>
		<!-- <div id="tabs3" class="tab-pane"></div> -->
	</div>
</section>