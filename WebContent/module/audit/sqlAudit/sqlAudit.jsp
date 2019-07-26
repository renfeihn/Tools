<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
	.recordOverflow-page{
		display: flex;
		flex-wrap: wrap;
		padding:  20px;
		box-sizing: border-box;
	}
	.recordOverflow-page .content {
		box-sizing: border-box;
    	height: calc(100% - 40px);
	}
	.recordOverflow-page .tab-pane {
		box-sizing: border-box;
    	height: 100%;
	}
	.recordOverflow-page .tab-content {
		height: calc(100% - 40px);
	}
	.recordOverflow-page .number-list {
		height: 50%;
	}
	.recordOverflow-page .number-list .number-list-title{
		line-height: 30px;
		margin: 0;
	}
	.recordOverflow-page .number-list .number-list-content{
		height: calc(100% - 30px);
		display: flex;
    	align-items: center;
	}
	.recordOverflow-page .number-list-content .numbers-content{
		width: 46px;
	    height: 55px;
	    font-size: 47px;
	    position: relative;
	    overflow: hidden;
	    margin-left: 10px;
	    background-image: url(img/number.png);
	    background-size: 100% 100%;
	    color: #FFF;
	}
	.recordOverflow-page .number-list-content .numbers-span{
		display: inline-block;
	    width: 100%;
	    height: 100%;
	    margin: 0;
	}
	.recordOverflow-page .number-list-content .numbers-ul{
		position: absolute;
	    left: 0;
	    margin: 0;
	   	transition: all .3s linear;
	   	width: 100%;
    	text-align: center;
	}
	.recordOverflow-page .number-list-content .numbers-ul>li {
		line-height: 55px;
	}
	.recordOverflow-echarts{
		height: 100%;
		width: 100%;
	}
	.recordOverflow-day-select{
		position: absolute;
	    margin: 0;
	    right: 0px;
	    border: none;
	    background: transparent;
	    height: 39px;
	    line-height: 39px;
	    text-align: center;
	}
	.echarts-container {
		height: 100%;
	}
</style>
<div class="recordOverflow-page">
	<section class="panel" style="height: 300px;width: 30%;margin-right: 20px;">
		<p class="title" style="position: relative;">指标统计
			<select class="recordOverflow-day-select" id="daySelect">
				<option value="1">当天</option>
				<option value="2">本周</option>
				<option value="3">本月</option>
				<option value="4">本季度</option>
				<option value="5">本年</option>
			</select>
		</p>
		<div class="content">
			<div class="number-list">
				<p class="number-list-title">日志总访问量</p>
				<div class="number-list-content" id="number1">
				</div>
			</div>
			<div class="number-list">
				<p class="number-list-title">日志总下载量</p>
				<div class="number-list-content" id="number2"></div>
			</div>
		</div>
	</section>
	<section class="panel" style="height: 300px;width: calc(70% - 24px);">
		<ul class="nav nav-tabs nav-public" id="echarts_btn_trend">
			<li class="active"><a href="#tabs1" data-toggle="tab">日志访问趋势</a></li>
			<li><a href="#tabs2" data-toggle="tab">SQL查询趋势</a></li>
		</ul>
		<div class="tab-content">
			<div id="tabs1" class="tab-pane active">
				<div class="echarts-container" id="echarts_trend"></div>
			</div>
		</div>
	</section>
	<section class="panel" style="height: 300px;width: calc(50% - 12px);margin-right: 20px;">
		<p class="title">TOP10 SQL统计</p>
		<div class="content" style="overflow: hidden;">
			<div class="echarts-container" id="echarts_sqltop"></div>
		</div>
	</section>
	<section class="panel" style="height: 300px;width: calc(50% - 12px);">
		<ul class="nav nav-tabs nav-public" id="echarts_btn_logtop">
			<li class="active"><a href="#tabs1" data-toggle="tab">日志查看TOP10</a></li>
			<li><a href="#tabs2" data-toggle="tab">日志下载TOP10</a></li>
		</ul>
		<div class="tab-content">
			<div id="tabs1" class="tab-pane active">
				<div class="echarts-container" id="echarts_logtop"></div>
			</div>
		</div>
	</section>
	<section class="panel" style="height: 420px;width: calc(50% - 12px);margin-right: 20px;">
		<p class="title">应用日志访问分布</p>
		<div class="content" style="overflow: auto;">
			<table class="display dataTable table" id="logview_tab">
				<thead>
					<tr>
						<th rowspan="2">应用ID</th>
						<th rowspan="2">应用名称</th>
						<th rowspan="2">数量</th>
						<th colspan="2" style="text-align: center;">分布情况</th>
					</tr>
					<tr>
						<th style="text-align: center;">人员</th>
						<th style="text-align: center;">数量</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</section>
	<section class="panel" style="height: 420px;width: calc(50% - 12px);">
		<p class="title">应用日志下载分布</p>
		<div class="content" style="overflow: auto;">
			<table  class="display dataTable table" id="logdownload_tab">
				<thead>
					<tr>
						<th rowspan="2">应用ID</th>
						<th rowspan="2">应用名称</th>
						<th rowspan="2">数量</th>
						<th colspan="2" style="text-align: center;">分布情况</th>
					</tr>
					<tr>
						<th style="text-align: center;">人员</th>
						<th style="text-align: center;">数量</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</section>
</div>