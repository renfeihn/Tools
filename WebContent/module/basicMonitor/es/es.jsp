<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.es-base-monitor{
		height: 95vh;
		margin-top: -72px;
	}
	.es-base-monitor>iframe{
		height: 100%;
    	width: 100%;
		border: none;
	}
</style>

<section class="panel">
	<ul class="nav nav-tabs nav-public">
		<li class="active"><a href="#tabs1" data-toggle="tab">es信息</a></li>
		<li><a href="#tabs2" data-toggle="tab">es详情</a></li>
	</ul>
	<div class="tab-content">
		<div id="tabs1" class="tab-pane active">
			<div id="iframeContainer" class="es-base-monitor">
	
			</div>
		</div>
		<div id="tabs2" class="tab-pane es-dispather-container">
			
		</div>
	</div>
</section>

