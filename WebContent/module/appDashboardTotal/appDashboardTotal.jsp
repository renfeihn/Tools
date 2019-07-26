<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.dashboard-total-page {
	display: flex;
	height: calc(100vh - 82px);
	background: #ebf0f5;
	padding: 20px 0;
}
.dashboard-total-page>section {
	margin-bottom: 0;	
}
.dashboard-total-page>section>.content {
	height: calc(100% - 80px);
}
.dashboard-total-page input,
.dashboard-total-page ul {
	margin: 0;
}
.dashboard-total-page .filter-wrap {
	display: inline-flex;
}
.dashboard-total-page .filter-wrap>span {
	flex: 1;
	width: 76px;
	height: 20px;
	text-align: center;
    /* border: solid 1px #d0d3d6;
    background: #dfe5ea; */
    font-size: 12px;
    /* cursor: pointer; */
  }
  .dashboard-total-page .filter-wrap>span>i {
  	margin-right: 4px;
  	color: #55a8fd;
  }
  .dashboard-total-page .filter-wrap>span.active {
    /* background: #2196F3;
    border-color: #03A9F4;
    color: #fff;	 */
  }
  .dashboard-total-page .objects-wrap {
  	flex: auto;
  }
  .dashboard-total-page .info-wrap {
  	flex: none;
  	width: 340px;
  	margin-left: 20px;
  }
  .dashboard-total-page .operates-wrap {
  	display: flex;
  	justify-content: space-between;
  	margin-bottom: 10px;
  }
  .dashboard-total-page .search-wrap {
  	position: relative;
  }
  .dashboard-total-page .search-wrap>i {
  	position: absolute;
  	top: 4px;
  	left: 8px;
  	color: #2196F3;
  }
  .dashboard-total-page .search-wrap>input {
  	text-indent: 18px;
  }
  .dashboard-total-page .objects-content {
  	height: calc(100% - 40px);
  	margin-top: 20px;
  	overflow: hidden auto;
  }
  .dashboard-total-page .apps-wrap {
  	padding: 10px 0 0 0;
  }
  .dashboard-total-page #app_ul {
  	display: flex;
  	flex-wrap: wrap;
  }
  .dashboard-total-page #app_ul>li {
  	position: relative;
  	width: 120px;
  	height: 120px;
  	text-align: center;
  	background: #f6f7fb;
  	border: solid 1px #eaecec;
  	margin: 0 10px 10px 0;
  	box-sizing: border-box;
  	border-radius: 4px;
  	transition: all .1s linear;
  	cursor: pointer;
  }
  .dashboard-total-page #app_ul>li:hover {
  	background: #f9f9f9;
  	box-shadow: 5px 6px 5px 0px #c3c4c7;
  	transform: translateY(-5px);
  }
  .dashboard-total-page #app_ul .cate3-name {
  	display: flex;
  	justify-content: center;
  	align-items: center;
  	height: 90px;
  	color: #5b5f71;
  	text-align: center;
  }
  .dashboard-total-page #app_ul .cate3-text {
  	white-space: nowrap;
  	text-overflow: ellipsis;
  	overflow: hidden;
  } 
  .dashboard-total-page #app_ul .echarts-wrap {
  	display: block;
  	height: 30px;
  }
  .dashboard-total-page #app_ul .collect-echarts {
  	display: block;
  	height: 100%;
  }
  .jihe-danxuan>span+span {
  	margin-left: -1px;
  }
  .jihe-danxuan>span:first-child {
		border-radius: 2px 0 0 2px;
  }
  .jihe-danxuan>span:last-child {
		border-radius: 0 2px 2px 0;
  }
  .jihe-danxuan>span.selected {
  	position: relative;
  	z-index: 2;
  	border-color: #1e88fb;
  	background-color: #b8dbfd;
  	color: #1e88fb;
  	cursor: default;
  }
  .jihe-danxuan>span {
  	border: 1px solid #b8bbcb;
  	background-color: #FFF;
  	width: 50px;
  	text-align: center;
  	line-height: 22px;
  	position: relative;
  	z-index: 1;
  	cursor: pointer;
  }
  .jihe-danxuan {
  	display: inline-flex;
  	height: 24px;
  	font-size: 12px;
  }
  .app-layout>div {
  	background-color: #FFF;
  	width: 100%;
  	height: 180px;
  	overflow: hidden;
  	border-radius: 4px;
  	padding: 15px;
  	box-sizing: border-box;
  }
  .app-layout .echarts-dom {
  	height: 75px;
  	margin-bottom: 12px;
  }
  .app-layout .app-name {
  	font-size: 16px;
  	padding: 5px 0 15px 0;
  }
  .app-layout .app-kpi>span:before {
  	content: attr(data-title);
  	color: #999;
  	font-size: 12px;
  	margin-right: 8px;
  }
  .app-layout .app-kpi>span {
  	flex: 1;
  	font-size: 14px;
  	color: #666;
  }
  .app-layout .app-kpi>i {
  	width: 1px;
  	height: 22px;
  	background-color: #cccfd3;
  	margin: 0 10px;
  }
  .app-layout .app-kpi {
  	display: flex;
  }
  .app-layout {
  	display: grid;
  	grid-template-columns: repeat(auto-fill, 206px);
  	grid-gap: 20px;
  	padding: 0 14px 20px 20px;
  }
</style>
<div class="dashboard-total-page">
	<div class="objects-wrap">
		<div style="height: 24px;margin: 0 20px;">
			<span style="font-size: 16px;">应用墙</span>
			<span style="font-size: 12px;">（耗时单位：ms）</span>
			<div class="pull-right" style="display: flex;align-items: center;">
				<span style="font-size: 12px;margin-right: 10px;">排序</span>
				<select style="margin: 0;width: 120px;" class="select-css">
					<option value="">按耗时最高</option>
					<option value="">按TPS最高</option>
				</select>
				<span style="font-size: 12px;margin-right: 10px;margin-left: 30px;">刷新时间</span>
				<div class="jihe-danxuan">
					<span data-value="5">5s</span>
					<span data-value="10">10s</span>
					<span data-value="30">30s</span>
					<span data-value="60" class="selected">60s</span>
				</div>
			</div>
		</div>
		<div class="objects-content">
			<div class="app-layout" id="app_list">
			</div>
		</div>
	</div>
</div>



















