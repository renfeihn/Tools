<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
@charset "UTF-8";
.AppPerforMonit-grid-layout section.panel {
	margin: 0;
}
.AppPerforMonit-grid-layout {
	display: grid;
	grid-template-columns: 3fr 1fr;
	grid-template-rows: 1fr;
	grid-gap: 20px;
	padding: 20px;
	box-sizing: border-box;
}
.AppPerforMonit-applist {
	display: grid;
	width: 100%;
	grid-template-columns: repeat(auto-fit, 140px);
	grid-gap: 20px;
	margin-top: 20px;
}
.AppPerforMonit-app>p {
    position: absolute;
    box-sizing: border-box;
    bottom: 15px;
    margin: 0;
    width: 100%;
    padding: 0 10px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    line-height: 15px;
}
.AppPerforMonit-app.avg:before {
	content: '平均耗时：'attr(data-avg);
}
.AppPerforMonit-app.count:before {
	content: '交易量：'attr(data-count);
}
.AppPerforMonit-app.tps:before {
	content: 'TPS：'attr(data-tps);
}
.AppPerforMonit-app:before {
    display: block;
    text-align: center;
    color: #888;
    font-weight: normal;
    white-space: nowrap;
}
.AppPerforMonit-app:hover {
	border-color: var(--主题色);
}
.AppPerforMonit-app {
	border: 1px solid transparent;
    width: 140px;
    height: 140px;
    background: #f2f2f2;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    font-size: 12px;
   	background-image: url(img/baseMonitor/application/app.png);
    background-position: center 10px;
    background-repeat: no-repeat;
}
</style>

<div class="AppPerforMonit-grid-layout">
	<section class="panel">
		<p class="title">应用列表</p>
		<div class="content">
			<div class="AppPerforMonit-app-filter">
				<div class="capsule-select" style="float: none;margin-top: 0;">
					<a data-value="count" href="javascript:void(0);" class="selected">
						交易量&nbsp;<i class="fa fa-long-arrow-down"></i>
					</a>
					<a data-value="suc" href="javascript:void(0);">
						成功率&nbsp;<i class="fa fa-long-arrow-down"></i>
					</a>
					<a data-value="avg" href="javascript:void(0);">
						平均耗时&nbsp;<i class="fa fa-long-arrow-down"></i>
					</a>
					<a data-value="tps" href="javascript:void(0);">
						TPS&nbsp;<i class="fa fa-long-arrow-down"></i>
					</a>
				</div>
				<div class="search-input pull-right">
					<input id="appNameFilter" type="text" placeholder="应用名称">
					<i class="fa fa-search"></i>
				</div>
			</div>
			<div class="AppPerforMonit-applist">
			</div>
		</div>
	</section>
	<section class="panel">
		<a href="javascript:void(0);" class="pull-right" style="color: var(--主题色);line-height: 40px;margin-right: 20px;">
			<i class="fa fa-refresh"></i>&nbsp;刷新
		</a>
		<p class="title">动态</p>
		<div class="content"></div>
	</section>
</div>