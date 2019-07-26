<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.operate-audit {
    height: calc(100vh - 40px);
    margin-bottom: 0!important;
    overflow: auto;
}
.operate-main {
    position: relative;
}
.operate-main .operate-wrap {
    position: absolute;
    width: calc(100% - 160px);
    display: flex;
    z-index: 2;
}
.operate-main .operate-wrap label {
    display: inline-block;
}
.operate-main .operate-wrap input {
    margin: 0 10px 0 8px;
    width: 160px;
}
.operate-main .operate-wrap .query-btn {
    padding: 4px 12px;
    line-height: 12px;
    background-color: #FFF;
    border: 1px solid var(--color-theme);
    color: var(--color-theme);
    cursor: pointer;
    border-radius: 2px;
    z-index: 2;
    margin-left: 10px;
    font-size: 12px;
    font-weight: normal;
}
.operate-main .operate-wrap .query-btn:hover {
    background-color: var(--color-theme);
    color: #fff;
}
.operate-main #operate_tab {
    width: 100%!important;
    table-layout: fixed;
}
.operate-slider {
    position: fixed;
    top: 40px;
    right: -600px;
    bottom: 0;
    z-index: 10;
    width: 600px;
    background: #fff;
    box-shadow: 0 0 10px 2px #aaacad;
    transition: all .2s linear;
}
.operate-slider.show {
    right: 0;
}
.operate-slider section {
    border: none!important;
    height: 100%;
}
.operate-slider section .tab-content {
    height: calc(100% - 39px);
}
.operate-slider section .tab-content>div {
    height: calc(100% - 40px);  
}
.operate-slider i.fa-times {
    float: right;
    color: #808080;
    width: 37px;
    height: 37px;
    background: #eee;
    text-align: center;
    line-height: 37px;
    font-size: 20px;
    cursor: pointer;
}
.operate-slider .operate-content {
    padding: 10px;
}
.operate-slider form input,
.operate-slider form textarea {
    width: 100%;
    min-height: 30px;
}
.operate-slider form textarea:last-child {
    min-height: 120px;
}
.operate-slider .pre-wrap {
    height: 100%;
    overflow: hidden auto; 
}
.operate-slider #json_wrap {
    padding: 0px;
    background-color: #FFF;
    border: none;
    box-shadow: none;
}
.operate-slider #json_wrap .key {
    color: #871d8f;
    font-weight: bold;
}
.operate-slider #json_wrap .number {
    color: #1e1bcb;
}
.operate-slider #json_wrap .string {
    color: #c01d1f;
}
#operate_tab thead>tr>th:nth-child(1) {
	width: 5%!important;
}
#operate_tab thead>tr>th:nth-child(2),
#operate_tab thead>tr>th:nth-child(3),
#operate_tab thead>tr>th:nth-child(4),
#operate_tab thead>tr>th:nth-child(5) {
	width: 8%!important;
}
#operate_tab thead>tr>th:nth-child(6) {
    width: 12%!important;
}
#operate_tab thead>tr>th:nth-child(7),
#operate_tab thead>tr>th:nth-child(8),
#operate_tab thead>tr>th:nth-child(9) {
    width: 10%!important;
}
#operate_tab thead>tr>th:nth-child(10),
#operate_tab thead>tr>th:nth-child(11),
#operate_tab thead>tr>th:nth-child(12) {
    width: 8%!important;
}
</style>

<div class="operate-audit">
    <section class="panel">
        <p class="title">用户操作配置审计</p>
        <div class="content">
            <div class="operate-main">
                <div class="operate-wrap">
                    <span>
                        <label for="start_time">开始时间</label><input type="text" id="start_time">
                    </span>
                    <span>
                        <label for="end_time">结束时间</label><input type="text" id="end_time">
                    </span>
                    <span>
                        <label for="title_input">标题</label><input type="text" id="title_input">
                    </span>
                    <span>
                        <label for="action_input">操作动作</label><input type="text" id="action_input">
                    </span>
                    <span>
                        <label for="content_input">请求参数</label><input type="text" id="content_input">
                    </span>
                    <span>
                        <label for="operuser">操作人</label><input type="text" id="operuser">
                    </span>
                    <button class="query-btn" type="button">查询</button>
                </div>
                <div class="table-wrap">
                    <table class="display dataTable table" id="operate_tab"></table>
                </div>
            </div>
        </div>
    </section>
</div>

<div class="operate-slider">
    <section class="panel">
        <ul class="nav nav-tabs nav-public">
            <li class="active"><a href="#tabs1" data-toggle="tab">操作详情</a></li>
            <li><a href="#tabs2" data-toggle="tab">请求信息</a></li>
            <i class="fa fa-times"></i>
        </ul>
        <div class="tab-content">
            <div id="tabs1" class="tab-pane active">
                <div class="operate-content">
                    <form class="form-horizontal" id="operate_form">
                            
                    </form>
                </div>
            </div>
            <div id="tabs2" class="tab-pane">
                <div class="pre-wrap">
                    <pre id="json_wrap"></pre>
                </div>
            </div>
        </div>
    </section>
</div>