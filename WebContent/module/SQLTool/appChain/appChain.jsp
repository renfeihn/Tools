<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.appchain-page {
    height: calc(100vh - 40px);
    margin-bottom: 0!important;
}
.appchain-page .tab-content {
	height: calc(100% - 39px);
    overflow: hidden;
}
.appchain-page .tab-content>div,
.appchain-page .tab-content>div>div,
.appchain-page .tab-content>div>div>div {
	height: 100%;
}
</style>
<section class="panel appchain-page">
	<ul class="nav nav-tabs nav-public" id="ul_nav">
		<li class="active" data-skip="SQLTool#appChain#appChain1"><a href="#tabs1" data-toggle="tab">应用链路</a></li>
		<li data-skip="SQLTool#appChain#appChain2"><a href="#tabs2" data-toggle="tab">关系链路</a></li>
	</ul>
	<div class="tab-content">
		<div id="tabs1" class="tab-pane active"></div>
		<div id="tabs2" class="tab-pane"></div>
	</div>
</section>
