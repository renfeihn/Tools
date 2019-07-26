<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>

<style>
.queryTrade-log.logdetail-container {
	display: flex;
	justify-content: space-between;
	margin:0;
}

.queryTrade-log .logdetail-insideleft-section {
	width: 100%;
}

.queryTrade-log .logdetail-insideleft-section>:nth-child(3),
.queryTrade-log .logdetail-insideleft-section>:nth-child(4) {
	width: calc(100% - 80px);
	margin: 20px;
	padding: 20px;
	border: 1px solid rgba(0, 0, 0, .15);
	-webkit-border-radius: 4px;
	-moz-border-radius: 4px;
	border-radius: 4px;
	box-shadow: 1px 1px 7px #CCC;
}

.queryTrade-log .logdetail-insideleft-section>:nth-child(4) {
	height: 100px;
}

.queryTrade-log .logdetail-content {
	border: none;
	box-shadow: none;
	margin: 0;
	padding: 0;
	height: calc(100% - 44px);
	overflow: auto;
	-webkit-user-select: text;
	-moz-user-select: text;
	-ms-user-select: text;
	user-select: text;
	counter-reset: mycounter;
	cursor: auto;
}
.queryTrade-log .logdetail-content p:before {
	content: counter(mycounter);
	counter-increment: mycounter;
	position: absolute;
	left: 4px;
	color: #90908a;
}
.queryTrade-log .logdetail-content p{
	line-height: 1.5em;
	position: relative;
	word-break: break-word;
	margin: 0;
}

.queryTrade-log .logdetail-content.green {
	background: black;
	color: #29fe13;
}
.queryTrade-log .logdetail-content.black {
	background: #fafafa;
	color: #333;
}
.queryTrade-log .logdetail-content.green p.targetSides {
	background-color: rgba(14,32,162,.7);
}
.queryTrade-log .logdetail-content.black p.targetSides {
	background-color: #e8f2fe;
}
.queryTrade-log .logdetail-content.green p.target {
	background-color: rgba(14,32,162,1);
}
.queryTrade-log .logdetail-content.black p.target {
	background-color: #b0d4fd;
}
.queryTrade-log .logdetail-p {
	position: absolute;
	width: 1000px;
	right: 0;
	top: 0;
	height: 40px;
	margin: 0 20px 0 0;
	text-align: right;
}

.queryTrade-log .logdetail-p> :nth-child(1),
.queryTrade-log .logdetail-p> :nth-child(2),
.queryTrade-log .logdetail-p> :nth-child(3),
.queryTrade-log .logdetail-p> :nth-child(4) {
	display: inline-block;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	height: 40px;
	line-height: 40px;
}

.queryTrade-log .logdetail-p> :nth-child(2),
.queryTrade-log .logdetail-p> :nth-child(3),
.queryTrade-log .logdetail-p> :nth-child(4) {
	margin-left: 3%;
}

.queryTrade-log .logdetail-p> :nth-child(1) {
	max-width: 18%;
}

.queryTrade-log .logdetail-p> :nth-child(3),
.queryTrade-log .logdetail-p> :nth-child(4) {
	max-width: 17%;
}

.queryTrade-log .logdetail-p> :nth-child(2) {
	max-width: 37%;
}

.logdtail-key-and-value {
	user-select: text;
	-webkit-user-select: text;
	margin: 10px 0 0 0;
	overflow: auto;
	height: calc(100vh - 94px);
}

.logdtail-key-and-value li {
	user-select: text;
	-webkit-user-select: text;
	border-bottom: 1px gainsboro dashed;
	display: flex;
	align-items: center;
	min-height: 30px;
}

.logdtail-key-and-value li:last-child {
	user-select: text;
	-webkit-user-select: text;
	display: flex;
	align-items: center;
	min-height: 30px;
	border-bottom: 1px gainsboro dashed;
}

.logdtail-key-and-value li>:nth-child(1) {
	user-select: text;
	-webkit-user-select: text;
	width: 98px;
	margin-left: 20px;
	display: inline-block;
	word-wrap: break-word;
	border-right: 1px dashed gainsboro;
}

.logdtail-key-and-value li>:nth-child(2) {
	user-select: text;
	-webkit-user-select: text;
	width: calc(100% - 135px);
	display: inline-block;
	word-wrap: break-word;
	padding-left: 15px;
	border-left: 1px dashed gainsboro;
}

.queryTrade-log .logdetail-up {
	width: 0;
	height: 0;
	border-left: 7px solid transparent;
	border-right: 7px solid transparent;
	border-bottom: 7px solid #787580;
	position: absolute;
	top: 7px;
	left: 4px;
}

.queryTrade-log .logdetail-down {
	width: 0;
	height: 0;
	border-left: 7px solid transparent;
	border-right: 7px solid transparent;
	border-top: 7px solid #787580;
	position: absolute;
	top: 8px;
	left: 4px;
}

.queryTrade-log .logdetail-search {
	margin: 0 0 0 10px;
	text-align: right;
	position: absolute;
	top: 0;
	left: 0;
	height: 36px;
	line-height: 36px;
}

.queryTrade-log .logdetail-search>li {
	display: inline-block;
	height: 24px;
	line-height: 20px;
}
.queryTrade-log .logdetail-search>li #searchString:focus{
	border-color: rgb(199, 198, 204);
}

.queryTrade-log .logdetail-search>:nth-child(2) {
	vertical-align: text-top;
}

.queryTrade-log .logdetail-search>:nth-child(5),
.queryTrade-log .logdetail-search>:nth-child(6) {
	position: relative;
	top: -2px;
	width: 22px;
	height: 22px;
	vertical-align: text-top;
	cursor: pointer;
	border: 1px solid #c7c6cc;
	background-color: white;
}

.queryTrade-log .logdetail-page>li {
	line-height: 24px;
}
.queryTrade-log .logdetail-page {
	margin: 10px 0 0;
	height: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 4px;
	font-size: 12px;
	color: #666;
	font-weight: normal;
}

.queryTrade-log .logdetail-page .queryTrade-log .logdetail-page-input {
	vertical-align: baseline;
	margin: 0;
	padding: 0;
	width: 30px;
	text-align: center;
}
#fontBtn .font-green{
	background-color: black;
	color: #29fe13;
}
p .keywords.selected {
	background-color: red;
}
p .keywords {
	border: 1px solid red;
}
.queryTrade-log .logdetail-fitlerBtn.active{
	background-color: #f2f3ff;
	color: #5b63f9;
	border: 1px solid #b3b7ff;
}
.queryTrade-log .logdetail-fitlerBtn+.queryTrade-log .logdetail-fitlerBtn{
	margin-left: 5px;
}
.queryTrade-log .logdetail-keyword{
	background-color: #ffed87;
}
input.curpage {
	width: 60px !important;
	height: 24px !important;
	line-height: 24px !important;
	padding: 0px !important;
	background-color: #fff !important;
	text-align: center !important;
	color: rgb(43, 41, 51) !important;
	margin: 0 3px 0 0 !important;
	vertical-align: middle;
	font-size: 14px !important;
	font-weight: 500 !important;
}
.curpage + .totalPage {
	line-height: 22px;
	border: 1px solid #fff;
	display: inline-block;
	height: 22px;
	overflow: hidden;
	vertical-align: middle;
}
</style>

<div style="margin-bottom: 10px;">
	<button type="button" id="downloadLogFile">日志文件下载</button>
	<button type="button" id="downloadTradeLog">交易日志下载</button>
</div>
<section class="logdetail-container queryTrade-log" style="margin-bottom:0;">
	<section class="panel logdetail-insideleft-section" style="position: relative;	margin: 0;">
		<p id="logDetailTitleInfo" class="title"></p>
		<ul class="logdetail-search">
			<div id="fontBtn" style="display: inline-block;">
				<button title="字体缩小" class="font-small">A -</button>
				<button title="字体放大" class="font-bigger">A +</button>
				<button id="colorConfig" class="font-green">黑底绿字</button>
			</div>
			<li>第<span id="now" style="color: red;">0</span>个结果，共检索到<span id="total" style="color: red;">0</span>个结果</li>
			<li><input id="searchString" style="margin: 0; padding: 0 40px 0 5px;" type="text" placeholder="查找字符串" /></li>
			<li title="查找" style="margin-left: -39px;"><button id="searchBtn" class="fa fa-search"></button></li>
			<li title="上一匹配项" id="lastSearchWord">
				<div class="logdetail-up"></div>
			</li>
			<li title="下一匹配项" id="nextSearchWord">
				<div class="logdetail-down"></div>
			</li>
			<li id="fitlerBtn"><!-- <button class="logdetail-fitlerBtn" data="ERROR">error</button><button class="logdetail-fitlerBtn" data="WARNING">warning</button> --></li>
			<li><button id="toFlow" style="display:none;" title="日志链路分析"><i class="fa fa-bar-chart"></i></button></li>
			<li ><select id="nodeSelect" style="display:none;margin: 0;width: 200px;"></select></li>

		</ul>
		<div style="height: calc(100vh - 382px);position: relative;    border: none;
    box-shadow: none;
    padding: 0;
    width: auto;
    margin: 0 0 20px 0;">
			<pre id="logdetailContent" class="logdetail-content black" data-target="#message-menu" data-toggle="context"></pre>
			<ul class="logdetail-page">
				<li>共有<span id="logAmounts"></span>条数据</li><!-- <input type="text" id="skip" class="logdetail-page-input" /> -->
				<li data-role="日志分页">
					<button type="button" id="firstButton">首页</button>&nbsp;&nbsp;&nbsp;
					<button type="button" id="prevButton">上一页</button>
					&nbsp;&nbsp;&nbsp;<input type="number" id="curPage" class="curpage" value="1" disabled>
					<span class="totalPage">/&nbsp;<span id="totalPage"></span></span>&nbsp;&nbsp;&nbsp;
					<button type="button" id="nextButton">下一页</button>&nbsp;&nbsp;&nbsp;
					<button type="button" id="lastButton">尾页</button>
				</li>
				<li>每页显示&nbsp;<select id="pageSize" style="margin: 0;width: 63px;font-size: 12px;color: #333;">
					<option value="10">10</option>
					<option value="100">100</option>
					<option value="500">500</option>
					<option value="1000">1000</option>
				</select><!-- <input type="number" class="curpage" min="1" max="1000" id="pageSize" value="100"> -->&nbsp;条</li>
			</ul>

		</div>
		<div style="height: 120px;
    width: auto;
    margin: 0;
    border: none;
    box-shadow: none;
    border-top: 1px solid #e5e5e5;
    border-radius: 0;">
			<div id="logDetailEcharts" style="width:100%;height:100%"></div>
		</div>
	</section>
</section>

<div id="message-menu">
	<ul class="dropdown-menu" role="menu">
		<li>
			<a tabindex="-1" href="#" id="logSearch">搜索</a>
		</li>
	</ul>
</div>
