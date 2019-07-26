<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.logSearch-search{
	height: 60px;
	line-height: 60px;
	width: 100%;
	position: relative;
	font-size: 12px;
	margin-top: 32vh;
}
.logSearch-classSelect{
	position: absolute;
	background-color: #e6e6ed;
	border-radius: 2px;
	/* width: 95px; */
	height: 27px;
	line-height: 27px;
	top: 12px;
    left: calc(50% - 250px);
    cursor: pointer;
    padding-right: 6px;
}
.logSearch-iconDown{
	width: 0;
	height: 0;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-top: 7px solid #5d5a66;
}
.logSearch-iconUp{
	width: 0;
	height: 0;
	border-left: 6px solid transparent;
	border-right: 6px solid transparent;
	border-bottom: 7px solid #5d5a66;
}
.logSearch-searchBtn{
	color: #fff;
	position: relative;
    left: -108px;
    top: -5px;
    width: 104px;
    height: 35px;
    font-size: 16px;
    padding-left: 8px;
    background-color: #5b62f9;
    border: 1px solid #5b62f9;
}
.logSearch-searchBtn:hover{
	color: #fff;
	background-color: #5b62f9;
	border: 1px solid #5b62f9;
}

.logSearch-classTree{
	/* display: none; */
	max-height: 400px;
	min-height:200px;
	/* position: absolute; */
	z-index: 3;
	/* top: 45px;
	left: calc(50% - 303px); */
	width: 500px;
	overflow-y: auto;
	box-shadow: 0px 5px 31px rgba(0,0,0,0.4);
	outline: none;
}
.suggestion{
	width:510px;
	position:absolute;
	top:50px;
	left:calc(50% - 251px);
	box-shadow:0px 5px 31px rgba(0,0,0,0.4);
	margin:-4px;
	background-color:#fff;
	display:none;
}
.suggestion .sug-history{
	height:28px;
	line-height:28px;
	border-top:1px solid #f3f3f3;
	display:flex;
	justify-content:space-between;
	color:#e4e4e4;
}
.suggestion .sug-history a{
	color:#000;
	padding:0 20px;
}
.logSearch-searchHistory{
	cursor: pointer;
	background-color: #fff;
	margin:0;
}
.logSearch-searchHistory li{
	padding: 0 20px;
	height:30px;
	line-height:30px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.logSearch-searchHistory li:hover{
	background-color: #eaeaea;
	border:1px solid #e2e2e4;
}
</style>
<section class="panel" style="margin: 0;">
	<a name="logSearch_top"></a>
	<div class="content" style="padding: 0;height: calc(70vh - 107px);">
		<img id="img1" src="img/logSearch/logSearch-logo1.jpg" alt="" style="width: 180px;height: 40px;margin:0 auto; position: absolute;top: 22vh;left: calc(50% - 117px);">
		<div id="logSearchArea" class="logSearch-search">
			<input id="searchInpt" type="text" style="height: 35px;width: 510px;margin-left: calc(50% - 255px);" value="*">
			<div class="suggestion">
				<ul id="logSearch_searchHistory" class="logSearch-searchHistory">
				</ul>
				<div class="sug-history">
					<a href="javascript:void(0)" id="clear-history">清空历史</a>
					<a href="javascript:void(0)" id="close-history">关闭</a>
				</div>
			</div>
			<button id="searchBtn" class="logSearch-searchBtn">日智云搜</button>
			<a id="moreSearch" href="javaScript:0;" style="color: #7c81fa;text-decoration: underline; margin-right: 30px;">高级搜索</a>
		</div>
	</div>
</section>
