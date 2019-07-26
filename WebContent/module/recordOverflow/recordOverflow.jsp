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
		<ul class="nav nav-tabs nav-public" id="ul_nav">
			<li class="active"><a href="#tabs1" data-toggle="tab">应用访问TOP10</a></li>
			<li><a href="#tabs2" data-toggle="tab">应用下载TOP10</a></li>
		</ul>
		<div class="tab-content">
			<div id="tabs1" class="tab-pane active">
				<div class="recordOverflow-echarts" id="echarts1"></div>
			</div>
			<div id="tabs2" class="tab-pane">
				<div class="recordOverflow-echarts" id="echarts2"></div>
			</div>
		</div>
	</section>
	<section class="panel" style="height: 300px;width: calc(50% - 10px);">
		<p class="title">用户查看日志TOP10</p>
		<div class="content">
			<div class="recordOverflow-echarts" id="echarts3"></div>
		</div>
	</section>
	<section class="panel" style="height: 300px;width: calc(50% - 14px);margin-left: 20px;">
		<p class="title">用户下载日志TOP10</p>
		<div class="content">
			<div class="recordOverflow-echarts" id="echarts4"></div>
		</div>
	</section>
	<section class="panel" style="min-height: 300px;width: 100%;">
		<ul class="nav nav-tabs nav-public" id="ul_nav">
			<li class="active"><a href="#tabs3" data-toggle="tab">近7天日志访问明细</a></li>
			<li><a href="#tabs4" data-toggle="tab">近7天日志下载明细</a></li>
		</ul>
		<div class="tab-content">
			<div id="tabs3" class="tab-pane active">
				<table id="seeTable" class="display dataTable table" style="table-layout: fixed;    margin-top: 20px;">
					<thead>
						<tr>
							<th>序号</th>
							<th>应用系统</th>
							<th>IP</th>
							<th>日志文件</th>
							<th>操作时间</th>
							<th>操作人</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
			<div id="tabs4" class="tab-pane">
				<table id="downloadTable" class="display dataTable table" style="table-layout: fixed;    margin-top: 20px;">
					<thead>
						<tr>
							<th>序号</th>
							<th>应用系统</th>
							<th>IP</th>
							<th>日志文件</th>
							<th>操作时间</th>
							<th>操作人</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
	</section>

</div>