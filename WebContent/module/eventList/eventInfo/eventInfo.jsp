<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.appView-main-content {
	padding: 20px 20px 0;
}
</style>
<section class="panel" style="margin: 0;">
	<ul class="nav nav-tabs nav-public" id="tabs2">
		<li data-href="eventList#eventInfo#eventDetails"><a data-toggle="tab">事件详情</a></li>
		<li data-href="eventList#eventInfo#eventRelative"><a data-toggle="tab">事件关联</a></li>
		<li data-href="eventList#eventInfo#eventbaseinfo"><a data-toggle="tab">事件信息</a></li>
	</ul>
	<div class="tab-content appView-main-content" id="tabs2-ctn"></div>
</section>
