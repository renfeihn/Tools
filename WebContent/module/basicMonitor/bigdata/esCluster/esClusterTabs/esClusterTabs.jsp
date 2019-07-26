<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<section class="panel" style="margin: -20px -20px 0;">
	<ul class="nav nav-tabs nav-public" id="tabApp">
		<li data-address="basicMonitor#bigdata#esCluster#esClusterDetail"><a data-toggle="tab">集群详情</a></li>
		<li data-address="basicMonitor#bigdata#esCluster#esClusterNode"><a data-toggle="tab">节点详情</a></li>
		<li data-address="basicMonitor#bigdata#esCluster#esClusterIndex"><a data-toggle="tab">索引详情</a></li>
	</ul>
	<div class="tab-content" id="view" style="padding: 20px 20px 0;"></div>
</section>