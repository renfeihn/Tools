<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.truthAlarmStrategy-main-content {
	padding: 20px 20px 0;
}
</style>
<!-- ABS实例首页 主框架页面Start -->
<section class="panel" style="margin: -20px -20px 0 -20px;">
	<ul class="nav nav-tabs nav-public" id="tabApp">
		<li id="myAlarmStrategy" skip-address="applicationConfiger#myAlarmMethod#myAlarmStrategy"><a href="#app1" data-toggle="tab">我定义的报警策略</a></li>
		<li id="truthAlarmStrategy" skip-address="applicationConfiger#myAlarmMethod#truthAlarmStrategy"><a href="#app2" data-toggle="tab">标准报警策略</a></li>
	</ul>
	<div class="tab-content truthAlarmStrategy-main-content" id="truthAlarmStrategy-box" style="padding: 20px"></div>
</section>
<!-- ABS实例首页 主框架页面End -->