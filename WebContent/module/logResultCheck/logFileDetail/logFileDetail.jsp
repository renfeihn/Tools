<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.logFileDetail-logContent{
	max-height: calc(100vh - 100px);
	overflow: auto;
	margin: 0;
	border: none;
	box-shadow: none;
	-webkit-user-select: text;
	-moz-user-select: text;
	-ms-user-select: text;
	user-select: text;
	border: none;
	border-radius: 0;
	font-size: 12px;
    font-weight: normal;
	position: relative;
}
.logFileDetail-logContent.green{
	background-color: black;
    color: #29fe13;
}

.logFileDetail-logContent p{
  	line-height: 1.5em;
  	position: relative;
  	word-break: break-word;
  	margin: 0;
  	padding-left: 30px;
}
.logFileDetail-logContent p.search{
  	background-color: #f6f9fc;
}
.logFileDetail-logContent p:before {
	content: attr(beforecontent);
	position: absolute;
	left: 4px;
	color: #90908a;
}
.logFileDetail-settings{
	margin-left: 20px;
}
.logFileDetail-settings .font-color.green{
	background-color: black;
    color: #29fe13;
    border: 1px solid black;
}
.logFileDetail-settings .search-query{
	width: 260px;
}
.logFileDetail-settings .logSearchBtn{
	position: absolute;
	width: 22px;
	height: 22px;
	top: -1px;
	right: 1px;
}
.logFileDetail-pages{
	font-size: 12px;
	font-weight: normal;
	display: inline-block;
}
.logFileDetail-pages select{
	margin: 0 10px;
	width: 60px;
}
.logFileDetail-pages span{
	color: var(--color-theme);
	text-decoration: underline;
	cursor: pointer;
	margin-left: 10px;
}
.logFileDetail-pages span.disabled{
	text-decoration: none;
	cursor: not-allowed;
	color: #aeadb2;
}
.can-select {
	-webkit-user-select: all;
	user-select: all;
}
.load-more:hover,
.load-less:hover {
	color: #4494fc;
}
.load-more.loading,
.load-less.loading {
	cursor: default;
}
.load-more,.load-less {
	text-align: center;
	cursor: pointer;
	color: var(--color-theme);
	font-weight: bold;
}
.load-more:hover .fa-angle-double-down {
	animation: loadMore 0.8s linear infinite;
}

@keyframes loadMore {
	0% {
		transform: translateY(-30%);
	}
	100% {
		transform: translateY(30%);
	}
}
.load-less:hover .fa-angle-double-down {
	animation: loadLess 0.8s linear infinite;
}

@keyframes loadLess {
	0% {
		transform: translateY(30%);
	}
	100% {
		transform: translateY(-30%);
	}
}
p .keywords.selected {
	background-color: red;
}
p .keywords {
	border: 1px solid red;
}
</style>
<section class="panel" style="margin:0;border: none;">
	<p class="title">文件名称: <span id="fileName" class="can-select">1234567.log</span> 
		<span class="logFileDetail-settings">
			<button title="字体缩小" class="font-small">A -</button>
			<button title="字体放大" class="font-bigger">A +</button>
			<button title="黑底绿字" class="font-color green">A</button>
			<span style="position: relative; margin-left: 10px;">
				<input id="logSearch" type="text" class="search-query" placeholder="搜索"><span class="logSearchBtn"></span>
			</span>
			<span class="pull-right" style="font-size: 12px;">
				<span id="pageInfo">
					<!-- 第 <i class="currentPage"><input type="number" min="1" step="1" style="width: 60px;margin: 0 2px;font-size: 12px;"></i> 页&nbsp;&nbsp; -->
					第 <i class="currentPage"></i> 页&nbsp;&nbsp;
					共 <i class="totalPage"></i> 页&nbsp;&nbsp;
					已采集 <i class="size"></i>
				</span>
			</span>
		</span>
	</p>
	<div class="content" style="padding: 0;">
		<pre class="logFileDetail-logContent" id="logFileDetailContent"></pre>
	</div>
</section>
