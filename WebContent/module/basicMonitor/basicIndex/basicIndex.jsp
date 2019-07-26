<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
/* 在模块的页面中，通过style标签定义样式，应该在所起的class命名中加上模块前缀 */
.appConfiger-layout {
    display: flex;
    height: calc(100vh - 42px);
    background: #f1f0f5;
    transition: all 0.3s;
}
.appConfiger-layout>div {
	background: #FFF;
}
.appConfiger-tree {
	width: 200px;
	flex: none;
}
.appConfiger-configer {
	flex: auto;
	margin: 10px 0 10px 10px;
	padding: 20px 0;
	overflow: hidden;
}
.appConfiger-appInfo {
	width: 230px;
	flex: none;
	margin: 10px 10px 10px 0;
	padding: 20px;
	box-sizing: border-box;
}
#sliderBlock {
	width: 10px;
	background: #f1f0f5;
	margin: 10px 0;
    cursor: w-resize;
    flex: none;
}
ul.appConfiger-appList {
    padding: 0 10px;
    margin: 0;
    overflow: auto;
}
ul.appConfiger-appList>li{
	border:1px solid transparent;
	cursor:pointer;
}
ul.appConfiger-appList>li:hover{
	border:1px solid #E1E0E4;
}
ul.appConfiger-appList:AFTER {
	content:'';
	clear: both;
	display: block;
}
.appConfiger-appGreen,
.appConfiger-appYellow,
.appConfiger-appRed {
	margin: 0 10px 20px 10px;
	width: 140px;
	height: 140px;
	background-color: #fafafc;
    background-repeat: no-repeat;
    background-position: center;
	border-radius: 4px;
	float: left;
	overflow: hidden;
	position: relative;
	cursor: pointer;
}
.appConfiger-appGreen.checked,
.appConfiger-appYellow.checked,
.appConfiger-appRed.checked{
	cursor: default;
	border:1px solid #5B62F9 !important; 
}
#appCtn li.checked{
	border:0 !important;
}
div.appConfiger-appGreen,
div.appConfiger-appYellow,
div.appConfiger-appRed {
	margin: 0;
}
.appConfiger-appYellow>span {
    background: #ffd642;
    position: absolute;
    width: 77.8px;
    height: 77.8px;
    transform: rotate(45deg);
    top: -40px;
    left: -40px;
}
.appConfiger-appRed>span {
	position: absolute;
    width: 77.8px;
    height: 77.8px;
    background: #ff3341;
    transform: rotate(45deg);
    top: -40px;
    left: -40px;
}
.appConfiger-appGreen>span {
    position: absolute;
    width: 77.8px;
    height: 77.8px;
    background: #22ac38;
    transform: rotate(45deg);
    top: -40px;
    left: -40px;
}
.appConfiger-appGreen>p,
.appConfiger-appYellow>p,
.appConfiger-appRed>p {
    position: absolute;
    bottom: 10px;
    width: calc(100% - 20px);
    margin: 0 10px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    line-height: 15px;
}
.appConfiger-appGreen>span>i,
.appConfiger-appYellow>span>i,
.appConfiger-appRed>span>i {
    position: absolute;
    right: 4px;
    color: #FFF;
    font-style: normal;
    transform: rotate(-45deg);
    top: 30px;
}
.appConfiger-configer-top {
	overflow: hidden;
}
.appConfiger-configer-bottom {
    height: calc(100% - 205px);
}
.appConfiger-appSearch {
	background: transparent;
    width: 24px;
    height: 24px;
    position: relative;
    right: -160px;
}

.no-paddingLR {
	padding: 20px 0 !important;
}
.appConfiger-baseInfo,
.appConfiger-monitorEvent {
	display: flex;
}
.appConfiger-baseInfo>div:nth-child(1),
.appConfiger-monitorEvent>div:nth-child(1) {
	padding-right: 20px;
	flex: none;
	
}
.appConfiger-baseInfo>div:nth-child(2),
.appConfiger-monitorEvent>div:nth-child(2) {
	padding-left: 20px;
	border-left: 1px solid #e0dfe6;
	flex: auto;
	height: calc(100vh - 620px);
    overflow: auto;
}
@media (max-width:1441px){
	.appConfiger-baseInfo>div:nth-child(2),
.appConfiger-monitorEvent>div:nth-child(2) {
		height: calc(100vh - 490px);
	}
	.appConfiger-configer{
		overflow:auto;
	}
}
table.appConfiger-baseInfoTable {
	border: 1px solid #e0dfe6;
	border-bottom: none;
	border-right: none;
	width: 100%;
}
table.appConfiger-baseInfoTable td {
	padding: 0px;
	padding-left: 20px;
	border: 1px solid #e0dfe6;
	border-top: none;
	border-left: none;
	height: 32px
}
table.appConfiger-baseInfoTable tr td:nth-child(1) {
	width: 120px;
	color: #5c5a66;
}
.monitorEvent-left{
	width:145px;
	padding-right:20px;
}
.monitorEvent-left:after{
	content:"";
	display:block;
	clear:both;
}
.monitorEvent-left>span{
	float:left;
	position:relative;
	box-sizing: border-box;
	padding:20px 10px;
	background:#f1f0f5;
	text-align:center;
}

.monitorEvent-left>span:nth-child(1){
	width:145px;
	height:77px;
	border-radius:4px;
	background:#f1f0f5 url(img/appConfiger/sjyjpz.png) no-repeat 20px center;
	
}
.monitorEvent-left>span:nth-child(1):before{
	content:"";
	position:absolute;
	height:50px;
	border-right:1px solid #c7c6cc;
	top:14px;
	left:50px;
}
.monitorEvent-left>span:nth-child(1):after{
	content:"事件预警配置";
	color:#383640;
	position:absolute;
	top:15px;
	left:63px;
	font-size:12px;
}
.monitorEvent-left>span>span#sjyj{
	font-size:24px;
	position:absolute;
	left:63px;
	bottom:20px;
}

.monitorEvent-left>span:nth-child(2),.monitorEvent-left>span:nth-child(3){
	width:67px;
	border-radius:4px;
	height:77px;
	margin:10px 0;
}
.monitorEvent-left>span:nth-child(2){
	margin-right:11px;
}
.monitorEvent-left>span:nth-child(2).active,
.monitorEvent-left>span:nth-child(3).active{
	background:#5b62f9;
	color:#fff;
}
.monitorEvent-left>span:nth-child(2)>span,
.monitorEvent-left>span:nth-child(3)>span{
	font-size:24px;
	position:absolute;
	bottom:10px;
	left:17px;
}
.monitorEvent-left>span:nth-child(2)>span.sijian,
.monitorEvent-left>span:nth-child(3)>span.sijian{
	position:absolute;
	line-height:17px;
	top:10px;
	left:14px;
	font-size:12px;
}
.monitorEvent-left>span:nth-child(2).active:after,
.monitorEvent-left>span:nth-child(3).active:after{
	content:"";
	border:6px solid transparent;
	border-top:6px solid #5b62f9;
	position:absolute;
	bottom:-12px;
	left:26px;
}
.monitorEvent-left>span:nth-child(4){
	border:1px solid #5b62f9;
}
.monitorEvent-left>span:nth-child(4):after{
	content:"";
	display:block;
	clear:both;
}
.monitorEvent-left>span:nth-child(4)>span{
	box-sizing:border-box;
	float:left;
	width:61px;
	height:18px;
}
.monitorEvent-left>span:nth-child(4)>span:nth-child(1):after{
	content:"";
	position:absolute;
	height:45px;
	border-left:1px solid #c7c6cc;
	top:6px;
	left:72px;
}
.monitorEvent-left>span:nth-child(4)>span:nth-child(1):before{
	content:"预警";
	position:absolute;
	top:13px;
	left:30px;
}
.monitorEvent-left>span:nth-child(4)>span:nth-child(1)>span{
	line-height:45px;
}
.monitorEvent-left>span:nth-child(4)>span:nth-child(1)>span:before{
	content:"";
	position:absolute;
	width:10px;
	height:10px;
	border-radius:50%;
	background:#5b62f9;
	top:17px;
	left:15px;
}

.monitorEvent-left>span:nth-child(4)>span:nth-child(2):after{
	content:"";
	position:absolute;
	height:45px;
	border-left:1px solid #c7c6cc;
	top:6px;
	left:72px;
}
.monitorEvent-left>span:nth-child(4)>span:nth-child(2):before{
	content:"告警";
	position:absolute;
	top:13px;
	left:99px;
}
.monitorEvent-left>span:nth-child(4)>span:nth-child(2)>span{
	line-height:45px;
}
.monitorEvent-left>span:nth-child(4)>span:nth-child(2)>span:before{
	content:"";
	position:absolute;
	width:10px;
	height:10px;
	border-radius:50%;
	background:#fb8229;
	top:17px;
	left:85px;
}
.rjbs-left{
	width:145px;
	padding-right:20px;
	float:left;
}
.rjbs-left:after{
	content:"";
	display:block;
	clear:both;
}
.rjbs-left>p:after{
	content:"";
	position:absolute;
	width:40px;
	height:40px;
	background:url(img/appConfiger/lunux.png) no-repeat;
	top:7px;
	left:8px;
}
.rjbs-left>p:nth-child(2):after{
	background:url(img/appConfiger/database.png) no-repeat;
}
.rjbs-left>p:nth-child(3):after{
	background:url(img/appConfiger/zjj.png) no-repeat;
}
.rjbs-left>p:nth-child(4):after{
	background:url(img/appConfiger/yycx.png) no-repeat;
}
.rjbs-left>p{
	float:left;
	width:165px;
	height:53px;
	position:relative;
	margin-bottom:10px;
	background-color:#f1f0f5;
	border-radius:4px;
}
.rjbs-left>p>span:nth-child(1){
	font-size:14px;
	font-weight:500;
	position:absolute;
	top:10px;
	left:60px;
	
}
.rjbs-left>p:nth-child(1)>span:nth-child(1){
	top:18px;
}
.rjbs-left>p:before{
	content:"部署数";
	position:absolute;
	width:40px;
	font-size:12px;
	color:#9f9da5;
	top:27px;
	left:60px;
}
.rjbs-left>p:nth-child(1):before{
	width:0;
	overflow:hidden;
}
.rjbs-left>p>span:nth-child(2){
	font-size:20px;
	position:absolute;
	top:17px;
	right:20px;
}

.rjbs-right{
	width:calc(100% - 206px);
	float:right;
	border-left:1px solid #e0dfe6;
	padding-left:20px;
}
.yyxxCtn ul{
	border:1px solid #e0dfe6;
	border-bottom:0;
	border-right:0;
	margin:0;
	padding:0;
	margin-bottom: 15px;
}
.yyxxCtn ul:after{
	content:"";
	display:block;
	clear:both;
	
}
.yyxxCtn ul>li{
	float:left;
	width:calc(50% - 1px);
	height:35px;
	border-right:1px solid #e0dfe6;
	border-bottom:1px solid #e0dfe6;
	line-height:35px;
}
.yyxxCtn ul>li span:nth-child(2){
	padding-left: 20px;
}
.item1{
	float:left;
	font-size:12px;
	color:#5c5a66;
	width:115px;
	height:35px;
	padding-left:23px;
	border-right:1px solid #e0dfe6;
	background:#fafafc;
}
.item-value{
	padding-left:23px;
	height:35px;
	font-size:12px;
	color:#000;
	width:350px;
}
.appCount_{
	position: absolute;
    right: 200px;
    top: 3px;
}
.appCount_:before{
	content:"共";
	margin-right:2px;
}
.appCount_:after{
	content:"个";
	margin-left:2px;
}
</style>

<section class="panel" style="margin: 0;">
	<div class="content" style="padding: 0;">
		<div class="appConfiger-layout">
			<div class="appConfiger-tree">
				<ul id="app_tree" class="ztree"></ul>
			</div>
			<div class="appConfiger-configer">
				<div class="appConfiger-configer-top">
					<p style="position:relative;margin-bottom: 20px;padding: 0 20px;"><span id="appTitle">PC服务器</span><span class="appCount_">-</span>
						<input id="appSearch" type="text" class="search-query" style="float: right;" /><span class="appConfiger-appSearch pull-right"></span>
					</p>
					<ul id="appConfigInfo" class="appConfiger-appList">
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
