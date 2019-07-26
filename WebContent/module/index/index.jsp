<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.index-content{
	display: flex;
    background-color: #F5F5FA;
}
.index-content-main{
    position:relative;
    box-sizing: border-box;
    width: calc(100% - 370px);
    margin-right: 20px;
}
.index-event-main{
	width: 350px;
	flex: none;
	box-sizing: border-box;
}
.index-instance-item{
    background-color: #fff;
    width: calc((100% - 24px)/2);
    height: 300px;
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    /* position: relative; */
    /*display: inline-block;*/
    float: left;
}
.index-instance-item:nth-child(n+3){
	margin-top: 20px;
}
.index-instance-item:nth-child(2n+2){
	margin-left: 20px;
}
.index-instance-item-header{
    height: 20px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}
.index-instance-item-header .item-title{
    font-size: 16px;
    font-weight: bold;
    display:inline-block;
}
.index-charts-item{
    flex: 1;
    height: calc(100% - 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.index-instance-item-header a{
    font-size: 16px;
    text-decoration: none;
    color:#9B9DBA;
    margin: 0 2px;
}
.index-instance-item-footer .resize-arrow{
    position: absolute;
    right:5px;
    bottom: 5px;
    display: inline-block;
    width: 10px;
    height: 10px;
    clip-path: polygon(10px 0, 0 10px, 10px 10px);
    background-color: #CACAD2;
    cursor: nw-resize;
}
.index-kpi{
	height: 200px;
	box-sizing: border-box;
}
.index-kpi>div{
	display: flex;
    height: calc((100% - 10px)/2);
}
.index-kpi>div:nth-child(1) {
	font-size: 20px;
}
.index-kpi>div:nth-child(1)>span {
	background-color: #F1F0F5;
	width: calc((100% - 20px)/3);
    cursor: pointer;
}
.index-kpi span{
	display: block;
	text-align: center;
	border-radius: 3px;
}
.index-kpi span:before{
	content: attr(title);
	font-size: 12px;
	display: block;
	text-align: center;
	color: #646574;
    margin-top: 15px;
}
.index-kpi>div:nth-child(1)>span:first-child,
.index-kpi>div:nth-child(1)>span:first-child:before{
	background-color: #5B62F9;
	color: #fff;
}
.index-kpi>div:nth-child(1)>span+span{
	margin-left: 10px;
}
.index-kpi>div:nth-child(2){
	font-size: 14px;
	background: linear-gradient(to bottom,#CAC9CF 0%,#CAC9CF 100%);
	background-size: 1px 80%;
	background-repeat: no-repeat;
	background-position: 70% center;
	background-color: #F1F0F5;
	margin-top: 10px;
}
.index-kpi>div:nth-child(2)>span{
	display: block;
	font-size: 14px;
    width: calc((100% / 4));
    cursor: pointer;
}
.index-event{
    overflow-y: auto;
}
.index-event>p{
	margin: 0;
	background-color: #F1F0F5;
	font-size: 12px;
    padding: 0 40px 0 10px;
    position: relative;
    cursor: pointer;
}
.index-event>p:not(:first-child){
	margin-top: 10px;
}
.index-event>p>i{
	margin: 5px 0 5px;
    position: absolute;
    right: 20px;
}
.index-event>ul,
.index-event li{
	margin: 0;
}
.index-event>ul{
	display: none;
}
.index-event li{
	border-bottom: 1px solid #F2F2F3;
	font-size: 12px;
	height: 40px;
	line-height: 40px;
	padding: 0 10px;
	display: flex;
    width: 100%;
    box-sizing: border-box;
    justify-content: space-between;
}
.index-event li>span{
	flex:none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.index-event li>span:nth-child(1){
	width: 70px;
}
.index-event li>span:nth-child(2),
.index-event li>span:nth-child(3){
	width: 100px;
}
.index-event li>span:nth-child(2){
	color: #5B62F9;
	cursor: pointer;
}
.index-event li>span:nth-child(1):before{
    content: '';
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 50%;
    margin-right: 5px;
}
.index-event li>span.red:before{
    background-color: #FA7F25;
}
.index-event li>span.green:before{
    background-color: green;
}
.index-event li>span.yellow:before{
    background-color: yellow;
}
.index-search {
	cursor: pointer;
	margin-top:8px;
}
.index-instance-item i.fa-reply{
  	opacity:0;
    float: right;
}
.index-instance-item:hover i.fa-reply{
   opacity:1;
}
</style>
<section class="panel" style="margin:0;">
	<p class="title">我的首页
		<input type="search" class="search-query input-big span10 pull-right index-search" placeholder="请输入搜索信息" id="search">
	</p>
	<div class="content index-content">
	    <div class="index-content-main">
	       <%-- <div class="index-instance-item">
	            <div class="index-instance-item-header">
	                <p class="item-title">未命名数据图表</p>
	                <div class="edit-group">
	                    <a href="javascript:void(0)">
	                        <i class="fa fa-edit"></i>
	                    </a>
	                    <a href="javascript:void(0)">
	                        <i class="fa fa-trash"></i>
	                    </a>
	                    <a href="javascript:void(0)">
	                        <i class="fa fa-expand"></i>
	                    </a>
	                    <a href="javascript:void(0)" class="download">
	                        <i class="fa fa-download"></i>
	                    </a>
	                </div>
	            </div>
	            <div class="charts-item" id="charts-instance"></div>
	            <div class="index-instance-item-footer">
	               <span class="resize-arrow"></span>
	            </div>
	        </div>--%>
	    </div>
        <div class="index-event-main">
        	<section class="panel">
				<p class="title">我的事件统计</p>
				<div class="content index-kpi" id="eventKpi">
					<div>
						<span title="未处理" id="dayEventUnhand">-</span>
						<span title="处理中" id="dayEventHanding">-</span>
						<span title="已处理" id="dayEventClosed">-</span>
					</div>
					<div>
						<span title="普通" id="dayWaringUnclosed">-</span>
						<span title="严重" id="dayAlarmUnclosed">-</span>
						<span title="紧急" id="urgencyHand">-</span>
						<span title="长时间未处理" id="longTimeUnHand" style="margin-right: 10px;">-</span>
				</div>
				</div>
			</section>
			<section class="panel" style="margin-top: 20px;">
				<p class="title">事件列表</p>
				<div class="content index-event" id="eventContent">
					<p>未处理<i class="fa fa-plus-square-o"></i><span class="pull-right" id="unDealNum">-</span></p>
					<ul id="unDeal"></ul>
					<p>处理中<i class="fa fa-plus-square-o"></i><span class="pull-right" id="DealingNum">-</span></p>
					<ul id="dealing"></ul>
					<p>已处理<i class="fa fa-plus-square-o"></i><span class="pull-right" id="dealNum">-</span></p>
					<ul id="deal"></ul>
				</div>
			</section>

        </div>
	</div>
</section>

<script type="text/template" id="dashBoradItem">
    {{#each this}}
    <div class="index-instance-item" boardId="{{this.relation.boardId}}">
        <div class="index-instance-item-header">
            <p class="item-title">{{this.title}}</p>
            <i class="fa fa-reply"></i>
        </div>
        <div class="index-charts-item">
        	<i class="fa fa-spin fa-spinner"></i>
		</div>
    </div>
    {{/each}}
</script>