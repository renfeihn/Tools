<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.flex {
	display: flex;
}
.inline-flex {
	display: inline-flex;
}
.jc-sb {
	justify-content: space-between;
}
.search-container {
	min-height: 120px;
}
.search-wrap,.info-wrap {
	width: 60%;
	margin: 0 auto;
    flex-wrap: nowrap;
}
.search-wrap {
    height: 50px;
    align-items: center;
    box-sizing: border-box;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 1);
}
.search-wrap>div {
	height: 100%;
}
.search-left {
    position: relative;
    flex: none;
    width: 100px;
    border: 2px solid rgba(206, 205, 209, 1);
    border-radius: 3px 0 0 3px;
    box-sizing: border-box;
}
.sql-cate-btn {
    display: block;
    height: 100%;
    text-align: center;
    line-height: 46px;
	color: rgba(92, 90, 102, 1);
	font-size: 14px;
	font-family: HiraginoSansGB-W6;
	cursor: pointer;
	user-select: none;
}
.sql-cate-btn>i {
	margin-left: 5px;
}
.sql-cate-list {
    position: absolute;
    width: 94px;
    background: #fff;
    border-radius: 0 0 6px 6px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 18px 1px rgba(0, 0, 0, 0.24);
    border: 1px solid rgba(206, 205, 209, 1);
    z-index: 10;
}
.sql-cate-list>li {
    height: 44px;
    line-height: 44px;
    text-align: center;
    cursor: pointer;
}
.sql-cate-list>li {
    border-bottom: solid 1px #cecdd1;
}
.sql-cate-list>li:last-child {
	border-bottom: none;
}
.sql-cate-list>li:hover {
    color: #4393fb;
}
.search-middle {
	position: relative;
	flex: auto;
    border: 2px solid rgba(206, 205, 209, 1);
    border-left: none;
    border-radius: 0 3px 3px 0;
    box-sizing: border-box;
}
.search-middle>.search-type-btns {
    position: absolute;
    top: 12px;
    right: 5px;	
}
.search-middle>.search-type-btns>span {
    position: relative;
    display: inline-block;
    width: 64px;
    line-height: 20px;
    text-align: center;
    background: #4494fd;
    border: solid 1px #2b6ec5;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
    cursor: pointer;
    transition: all .2s linear;
}
.search-middle>.search-type-btns>span:before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 10px;
    height: 18px;
    background: #fff;
    transform: translateX(1px);
    transition: all .2s linear;
}
.search-middle>.search-type-btns>span.username {
    background: #03A9F4;
    border: solid 1px #1f9ad2;
}
.search-middle>.search-type-btns>span.username:before {
	transform: translateX(52px);
}
.search-middle>input {
    width: 100%;
    height: 100%;
    border: none;
    font-size: 16px;
}
.search-right {
    flex: none;
    width: 100px;
    margin-left: 20px;
}
.search-right>button {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background-color: rgba(249, 249, 251, 1);
    border: 2px solid rgba(206, 205, 209, 1);
	color: rgba(92, 90, 102, 1);
	font-size: 14px;
	font-family: HiraginoSansGB-W6;
	transition: all .1s linear;
}
.search-right>button:hover {
    background: #4494fc;
    border-color: #4494fc;
    color: #fff;  
}


.info-wrap {
 	flex-wrap: nowrap;
    box-sizing: border-box;
    justify-content: flex-start;
    padding: 10px 178px 0 0;
}
.info-wrap>span {
    width: auto;
    height: 12px;
    line-height: 12px;
    margin-right: 10px;
    min-width: 30px;
    color: rgba(68, 148, 253, 1);
    font-size: 12px;
    text-align: center;
    font-family: HiraginoSansGB-W3;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}



.sqls-container {
	width: 95%;
	margin: 0 auto;
}
.operate-bar {
    justify-content: space-between;
    border-bottom: 1px solid rgba(199, 198, 203, 1);
    user-select: none;
}
.operate-bar-left {

}
.operate-bar-left>span {
    display: inline-block;
    width: 104px;
    height: 20px;
    color: rgba(126, 130, 160, 1);
    font-size: 14px;
    text-align: center;
    font-family: HiraginoSansGB-W6;
    cursor: pointer;
}
.operate-bar-left>span.active {
	color: rgba(68, 148, 253, 1);
    border-bottom: solid 1px rgba(68, 148, 253, 1);
}
.operate-bar-right {
    width: 230px;
    justify-content: flex-end;
    padding: 0 20px 0 0;
}
.operate-bar-right>span {
	margin-left: 20px;
    color: rgba(126, 130, 160, 1);
    font-size: 12px;
    text-align: center;
    font-family: HiraginoSansGB-W6;
    cursor: pointer;
}
.operate-bar-right>span.active {
	color: #4494fd;
}
.operate-bar-right>span>i {
	margin-left: 4px;
}


.sql-item {
	height: 100px;
    border-bottom: 1px dashed rgba(235, 235, 237, 1);
    align-items: center;
    cursor: pointer;
    overflow: hidden;
}
.sql-item:hover {
    background: #f1f7fd;
}
.sql-item .sql-cate {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 240px;
    height: 60%;
    border-right: 1px solid rgba(206, 205, 209, 1);
    color: rgba(92, 90, 102, 1);
    font-weight: 600;
}
.sql-item .sql-content {
    flex: auto;
    height: 100%;
    padding: 10px 20px 10px 30px;
    box-sizing: border-box;
}
.sql-item .sql-content-top {
	height: 25%;
}
.sql-item .sql-content-top .sql-name {
	color: rgba(92, 90, 102, 1);
    font-size: 16px;
    text-align: left;
    font-family: HiraginoSansGB-W6;
    font-weight: 600;
    cursor: pointer;
}
.sql-item .sql-content-top .score-wrap {
    width: 120px;
    justify-content: space-between;
    color: rgba(247, 181, 0, 1);	
}
.sql-item .sql-content-top .score-wrap>i {
	margin: 0 2px;
}
.sql-item .sql-content-middle {
	height: 50%;
}
.sql-item .sql-content-middle .sql-detail{
	flex: none;
	width: 80%;
	color: rgba(92, 90, 102, 1);
	font-size: 12px;
	text-align: left;
	font-family: HiraginoSansGB-W6;
	/* display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; */
    overflow: hidden;
    display: inline-flex;
    align-items: center;
}
.sql-item .sql-content-middle .ops-wrap {

}
.sql-item .sql-content-middle .ops-wrap>span {
    width: 42px;
    height: 24px;
    line-height: 24px;
    color: rgba(92, 90, 102, 1);
    font-size: 16px;
    text-align: left;
    font-family: HiraginoSansGB-W6;
    margin-left: 30px;
    cursor: pointer;
}
.sql-item .sql-content-middle .ops-wrap>span:hover {
	color: rgba(68, 148, 253, 1);
}
.sql-item .sql-content-middle .ops-wrap i {
    color: rgba(68, 148, 253, 1);
    margin-right: 10px;
}
.sql-item .sql-content-middle .like-wrap {
	width: 100px;
}
.sql-item .sql-content-middle .like {
    height: 40px;
    background: url(img/sqlTool/like.png);
    transform: translateX(40px) scale(0.8);
    background-position: 0%;
    cursor: pointer;
}
.sql-item .sql-content-middle .liked {
	background-position: 100%;
}
.likeit {
	animation: play 1s steps(28) 1 forwards;
}
.dislike {
	animation: play-reverse 0s linear  1 forwards;
}
@keyframes play {
	0%{
		background-position: 0%;
	}
	100%{
		background-position: 100%;
	}
}
@keyframes play-reverse {
	0%{
		background-position: 100%;
	}
	100%{
		background-position: 0%;
	}
}
.sql-item .sql-content-bottom {
	height: 25%;
}
.sql-item .sql-content-bottom .bottom-left>span {
	line-height: 23px;
	color: rgba(126, 130, 160, 1);
	font-size: 12px;
	text-align: left;
	font-family: HiraginoSansGB-W6;
}
.sql-item .sql-content-bottom .bottom-right {
	justify-content: flex-end;
}
.sql-item .sql-content-bottom .bottom-right>p {
	text-align: right;
    color: rgba(126, 130, 160, 1);
    margin-left: 20px;
}
.sql-item .sql-content-bottom .bottom-right>p>span:nth-child(2) {
    display: inline-block;
    width: 20px;
}
.create-value {
    margin: 0 50px 0 4px;
}
.sql-item .sql-content-bottom .comments-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(img/sqlTool/chat.png) no-repeat;
    background-position: center;
    vertical-align: -6px;
}
.page-control.dataTables_wrapper * {
    -webkit-user-select: none;
}


.my-tool-container .logSearchDetail-accessLogContent {
	left: 0;
}
.paginate-circle {
	margin-top: 10px;
}
</style>
<div class="my-tool-container">
	<div class="search-container">
		<div class="search-wrap flex">
			<div class="search-left">
				<span class="sql-cate-btn"><span class="search-type">SQL分类</span><i class="fa fa-caret-down"></i></span>
				<!-- <ul class="sql-cate-list hide">
					<li data-type="nickname">人名搜索</li><li data-type="sqlname">关键字搜索</li><li data-type="categoryName">分类搜索</li>
				</ul> -->
				<div class="logSearchDetail-accessLogContent hide">
					<ul id="accessLogUl">
						<li class="active">应用系统<i class="fa fa-chevron-right"></i></li>
						<li>资产对象<i class="fa fa-chevron-right"></i></li>
					</ul>
					<div id="appSystem">
					</div>
					<div id="assetObject" class="hide">
					</div>
				</div>
			</div>
			<div class="search-middle">
				<span class="search-type-btns">
					<span data-type="sqlname">sql名</span>
					<!-- <span class="hide" data-type="nickname">创建人</span> -->
				</span>
				<input id="search_input" type="text" placeholder="请输入关键词"/>
			</div>
			<div class="search-right">
				<button id="search_circle">查询</button>
			</div>
		</div>
		<div class="info-wrap flex">
			<!-- <span>软件</span><span>操作系统</span><span>数据库</span> -->
		</div>
	</div>
	<div class="sqls-container">
		<div class="operate-bar flex">
			<div class="operate-bar-left">
				<!-- <span class="active">我发布的(<span class="publish-num">22</span>)</span>
				<span>我关注的(<span class="like-num">12</span>)</span> -->
			</div>
			<div class="operate-bar-right flex">
				<span data-role="usedTimes">执行次数<i class="fa fa-sort"></i></span>
				<span data-role="publishTime">发布时间<i class="fa fa-sort"></i></span>
				<span data-role="score">评分<i class="fa fa-sort"></i></span>
			</div>
		</div>
		<div class="sqls-wrap">
			<div></div>
			<div class="paginate-wrap paginate-circle"></div>
		</div>
	</div>
</div>