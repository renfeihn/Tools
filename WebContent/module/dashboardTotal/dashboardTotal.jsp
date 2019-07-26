<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.dashboard-total-page {
    display: flex;
    padding: 20px;
    height: calc(100vh - 82px);
    background: #F0F2F5;
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
.dashboard-total-page .type-wrap {
	display: inline-flex;
}
.dashboard-total-page .type-wrap>span {
	flex: 1;
    padding: 0 8px;
    border: solid 1px #d0d3d6;
    background: #dfe5ea;
    font-size: 12px;
    cursor: pointer;
}
.dashboard-total-page .type-wrap>span.active {
    background: #2196F3;
    border-color: #03A9F4;
    color: #fff;	
}
.dashboard-total-page .search-wrap {
	position: relative;
}
.dashboard-total-page .search-wrap>i {
    position: absolute;
    top: 4px;
    left: 8px;
}
.dashboard-total-page .search-wrap>input {
	text-indent: 18px;
}
.dashboard-total-page .objects-content {
	height: calc(100% - 34px);
    overflow: hidden auto;
}
.dashboard-total-page .cate1-wrap {
    
}
.dashboard-total-page .cate1-item {
	margin-bottom: 5px;
}
.dashboard-total-page .cate1-name {
    padding: 4px 0 4px 4px;
    display: block;
    background: #eef0f3;
    font-size: 15px;
    font-weight: 600;
    color: #3d4852;
    cursor: pointer;
    user-select: none;
    margin-bottom: 10px;
}
.dashboard-total-page .cate1-name>i {
	display: none;
	margin-left: 5px;
}
.dashboard-total-page .cate1-name:hover>i {
	display: inline-block;
}
.dashboard-total-page .cate2-wrap {
    margin-top: 5px!important;
}
.dashboard-total-page .cate2-item {
    display: flex;
    margin-bottom: 10px;
}
.dashboard-total-page .cate2-name {
    position: relative;
    flex: none;
    width: 130px;
    height: 130px;
    text-align: center;
    background: #0f2354bd;
    border: solid 1px #f4f5f5;
    border-radius: 2px;
    color: #fff;
    margin-right: 10px;
    box-sizing: border-box;
    background-image: url(img/baseMonitor/application/app.png);
    background-repeat: no-repeat;
    background-position: 50% 35%;
    background-size: 90%;
}
.dashboard-total-page .cate2-text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 14px;
    text-align: center;
    font-size: 12px;
    box-sizing: border-box;
    padding: 0 8px;
}
.dashboard-total-page .cate3-wrap {
    display: flex;
    flex-wrap: wrap;
}
.dashboard-total-page .cate3-item {
    position: relative;
    width: 150px;
    height: 150px;
    text-align: center;
    background: #f4f5f5;
    border: solid 1px #eee;
    margin: 0 8px 8px 0;
    box-sizing: border-box;
    transition: all .1s linear;
    cursor: pointer;
    background-image: url(img/baseMonitor/storage/storage.png);
    background-repeat: no-repeat;
    background-position: 50% 30%;
    background-size: 90%;
}
.dashboard-total-page .objs-wrap .cate2-name,
.dashboard-total-page .objs-wrap .cate3-item {
	width: 100px;
	height: 100px;
    background-position: 50% -50%;
}
.dashboard-total-page .cate3-item:hover {
	box-shadow: 5px 6px 5px 0px #c3c4c7;
    transform: translateY(-5px);
}
.cate3-name {

}
.dashboard-total-page .cate3-text {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    line-height: 14px;
    text-align: center;
    font-size: 12px;
    box-sizing: border-box;
    padding: 0 8px;
}
.dashboard-total-page .collect-info {
	position: absolute;
    top: 3px;
    left: 0;
    right: 0;
    font-size: 12px;
    display: flex;
    justify-content: space-around;
    padding: 0 5px;
    box-sizing: border-box;
}
.dashboard-total-page .collect-info>span:before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #009688;
    border-radius: 50%;
    vertical-align: 2px;
    margin-right: 2px;
}
.dashboard-total-page .apps-wrap {
	padding: 10px 0 0 0;
}
</style>
<div class="dashboard-total-page">
	<section class="panel objects-wrap">
		<p class="title">资源总览</p>
		<div class="content">
			<div class="operates-wrap">
				<div class="type-wrap">
					<span class="active">应用系统</span><span>资产对象</span>
				</div>
				<div class="search-wrap">
					<i class="fa fa-search"></i><input type="text" id="search_text" placeholder="输入关键字搜索"/>
				</div>
			</div>
			<div class="objects-content">
				<div class="apps-wrap ul-wrap">
					<ul class="cate3-wrap app"></ul>
				</div>
				<div class="objs-wrap ul-warp hide">
					<ul class="cate1-wrap sys"></ul>
				</div>
			</div>
		</div>
	</section>
	<section class="panel info-wrap">
		<p class="title">采集信息</p>
		<div class="content">
		
		</div>
	</section>
</div>