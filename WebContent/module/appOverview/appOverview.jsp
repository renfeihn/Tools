<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
/* 本页预警 告警 圆点 */
.yuJing-smallPoint:AFTER,
.gaoJing-smallPoint:AFTER {
    content: '';
    position: absolute;
    border-radius: 3px;
    width: 6px;
    height: 6px;
    left: 0px;
    top: 17px;
}
.yuJing-smallPoint:AFTER {
	background: #5b62f9;
}
.gaoJing-smallPoint:AFTER {
	background: #fb8229;
}

/* 在模块的页面中，通过style标签定义样式，应该在所起的class命名中加上模块前缀 */
.appOverview-layout {
	display: flex;
	height: calc(100% - 50px);
}

.appOverview-layout>div:nth-child(1) {
    flex: auto;
    margin-right: 10px;
    margin-left: -10px;
    overflow-y: auto;
    height: 100%;
}

.appOverview-filter {
	padding: 0 10px 20px;
    font-size: 12px;
}

.appOverview-filter>button:nth-child(1) {
	border-radius: 2px 0 0 2px;
	border-right: 1px solid #b3b7ff !important;
	margin-left: 1em;
}

.appOverview-filter>button:nth-child(2) {
	border-radius: 0 2px 2px 0;
	border-left: none;
}

.appOverview-searchbox {
	background: transparent;
    width: 24px;
    height: 24px;
    position: relative;
    right: -160px;
}

.appOverview-allAppList {
	width: 340px;
	flex: none;
}

.appOverview-allAppList>div:nth-child(1) {
    background: #f1f0f5;
    border: 1px solid #ebebed;
    border-radius: 4px 4px 0 0;
    display: flex;
    height: 115px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 10px;
}

.appOverview-allAppCount.selected {
	background: #5b62f9;
	cursor: default;
}
.appOverview-allAppCount {
	font-size: 36px;
    background: #c6c6cd;
    display: block;
    height: 73px;
    padding: 10px;
    width: 130px;
    box-sizing: border-box;
    border-radius: 4px;
    color: #FFF;
    font-weight: 400;
    margin-left: 15px;
    flex: none;
    cursor: pointer;
}

.appOverview-allAppCount:BEFORE {
    content: '全部应用';
    display: block;
    font-size: 14px;
    margin-bottom: 8px;
}
.appOverview-warningCount {
	border-right: 1px solid #C7c6cc;
}
.appOverview-warningCount, .appOverview-errorCount {
    font-size: 36px;
    color: #5c5a66;
    padding: 10px;
    font-weight: 400;
    width: 60px;
    position: relative;
    cursor: pointer;
}

.appOverview-warningCount:BEFORE, .appOverview-errorCount:BEFORE {
	font-size: 14px;
	color: #5c5a66;
	display: block;
	margin-bottom: 8px;
}

.appOverview-warningCount:BEFORE {
	content: '预警';
}

.appOverview-errorCount:BEFORE {
/* 	content: '故障'; */
	content: '告警';
}

.appOverview-appContent {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	margin: 0;
	height: calc(100% - 49px);
    overflow: auto;
    position: relative;
}

.appOverview-app {
	width: 120px;
	height: 120px;
	background-color: #f6f7fb;
	position: relative;
	overflow: hidden;
	background-image: url("img/appOverview/app.png");
	background-position: center;
	background-repeat: no-repeat;
    border-radius: 4px;
	/* margin: 0 8px 16px 8px; */
	cursor:pointer;
}
.appOverview-heart.checked {
	background: url("img/appOverview/heart2.png");
}
.appOverview-heart {
	position: absolute;
	width: 13px;
	height: 12px;
	background: url("img/appOverview/heart1.png");
	right: 10px;
	top: 10px;
	cursor: pointer;
}
.appOverview-appHealth.yellow {
	background-color: #FEA701;
}

.appOverview-appHealth.red {
	background-color: #ff3341;
}

.appOverview-appHealth.green {
	background-color: #0Bc048;
}

.appOverview-appHealth>i {
    position: absolute;
    right: 1px;
    top: 16px;
    transform: rotate(-45deg);
    color: #FFF;
    font-style: normal;
}

.appOverview-appHealth {
	width: 56px;
	height: 56px;
	position: absolute;
	transform: rotate(45deg);
	left: -28px;
	top: -28px;
	background: #C7C6CC;
}

.appOverview-appName {
	position: absolute;
	bottom: 16px;
	text-align: center;
	width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.appOverview-appList {
    margin: 0;
    background: #f1f0f5;
    padding: 0 10px 20px;
    height: calc(100% - 140px);
    overflow: auto;
    overflow-x: hidden;
}

.appOverview-appList>li {
    height: 55px;
    border: 1px solid #f1f0f5;
    color: #787580;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px 0 76px;
    position: relative;
    transition: all 0.3s;
    background: #FFF;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
}

.appOverview-appList>li:HOVER {
    border: 1px solid #dadff6;
}
.appOverview-appList>li.checked {
    color: #5b62f9;
    border: 1px solid;
    cursor: default;
}

.appOverview-appList>li.checked>span:nth-child(1) {
	background-color: #5b62f9;
}

.appOverview-appList>li>span.count {
	font-weight: 400;
	font-size: 20px;
}

.appOverview-appList>li>span:nth-child(1) {
	width: 36px;
	height: 36px;
	background-color: #929099;
	background-position: center;
	background-repeat: no-repeat;
    position: absolute;
    left: 20px;
}

#zhyw {
	background-image: url("img/appOverview/zhyw.png");
}

#zf {
	background-image: url("img/appOverview/zf.png");
}

#lc {
	background-image: url("img/appOverview/lc.png");
}

#dk {
	background-image: url("img/appOverview/dk.png");
}

#zjyw {
	background-image: url("img/appOverview/zjyw.png");
}

#yhk {
	background-image: url("img/appOverview/yhk.png");
}

#wb {
	background-image: url("img/appOverview/wb.png");
}

#qt {
	background-image: url("img/appOverview/qt.png");
}
.zhyw {
	background-image: url("img/appOverview/zhyw.png");
}
.appOver-lighthight{
	-webkit-animation-duration: 1s;
	animation-duration: 1s;
	-webkit-animation-fille-mode: both;
	animation-fill-mode: both;
	-webkit-animation-iteration-count: infinite;
	animation-iteration-count: infinite;
	-webkit-animation-name: lighthight;
	animation-name: lighthight;
}
@-webkit-keyframes lighthight{
	from{
		opacity: 1;
	}
	50%{
		opacity: 0.5;
	}
	to{
		opacity: 1;
	}
}
@keyframes lighthight{
	from{
		opacity: 1;
	}
	50%{
		opacity: 0.5;
	}
	to{
		opacity: 1;
	}
}
</style>

<section class="panel" style="margin: 0;height: -webkit-calc(100vh - 42px);">
	<div class="content appOverview-layout">
		<div>
			<div class="appOverview-filter">
				排序方式
				<button type="button" class="checked" id="focu">按关注
				<button type="button" id="heal">按健康度</button>
				<input type="text" id="searchInput" class="search-query pull-right" />
				<div class="appOverview-searchbox pull-right"></div>
			</div>
			<ul class="appOverview-appContent" id="applicationBox">
				<!--<%for(int i=0; i < 10; i++ ){ %>
				<li class="appOverview-app animated bounceInUp">
					<span class="appOverview-heart"></span> 
					<span class="appOverview-appHealth green"><i>100</i></span> 
					<span class="appOverview-appName">个人网银</span>
				</li>
				<%} %>
				<%for(int i=0; i < 8; i++ ){ %>
				<li class="appOverview-app animated bounceInUp">
					<span class="appOverview-heart"></span> 
					<span class="appOverview-appHealth green"><i>100</i></span> 
					<span class="appOverview-appName">集合网银</span>
				</li>
				<%} %>-->
			</ul>
		</div>
		<div class="appOverview-allAppList">
			<div>
				<span class="appOverview-warningCount yuJing-smallPoint" id="alertEvent">0</span>
				<span class="appOverview-errorCount gaoJing-smallPoint" id="errorEvent">0</span>
				<span class="appOverview-allAppCount selected" id="totalEvent">0</span>
			</div>
			<ul class="appOverview-appList" id="appGroupCount">
				<!-- <li class="checked"><span id="zhyw"></span> 综合业务 <span id="count">12</span></li> -->
				<!-- <li><span id="zhyw"></span> 综合业务 <span class="count">12</span></li>
				<li><span id="zf"></span> 支付 <span class="count">12</span></li>
				<li><span id="lc"></span> 理财 <span class="count">12</span></li>
				<li><span id="dk"></span> 贷款 <span class="count">12</span></li>
				<li><span id="zjyw"></span> 中间业务 <span class="count">12</span></li>
				<li><span id="yhk"></span> 银行卡 <span class="count">12</span></li>
				<li><span id="wb"></span> 外币 <span class="count">12</span></li>
				<li><span id="qt"></span> 其他 <span class="count">12</span></li> -->
			</ul>
		</div>
	</div>
</section>

<!-- 模板 -->
<script type="text/x-handlebars-template" id="tpls">
  {{#each this}}
  <li class="appOverview-app animated bounceInUp" title={{this.appSummary.appName}} dataId={{this.appSummary.objectId}}>
  {{#if this.attention}} 
        <span class="appOverview-heart checked"></span>
  {{else}}
         <span class="appOverview-heart"></span> 
  {{/if}} 
  {{#judeg this.healthDegree 71}}
   	<span class="appOverview-appHealth green"><i>{{this.healthDegree}}</i></span>
  {{else}}
     {{#judeg this.healthDegree 31}}
   	<span class="appOverview-appHealth yellow appOver-lighthight"><i>{{this.healthDegree}}</i></span>
      {{else}}
     	<span class="appOverview-appHealth red appOver-lighthight"><i>{{this.healthDegree}}</i></span>
     {{/judeg}}
  {{/judeg}}
  
		<span class="appOverview-appName">{{this.appSummary.appName}}</span>
   </li>
  {{/each}}
 
</script>
<script type="text/x-handlebars-template" id="tpls2">
  {{#each this}}
       <li groupId={{this.groupId}}><span class="zhyw"></span>{{this.groupName}}<span class="count">{{this.count}}</span></li>
  {{/each}}
 
</script>

