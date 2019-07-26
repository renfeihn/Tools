<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false" %>
<style>
    .Tack-container #searchTable tbody td:last-child > span.disabled {
        cursor: not-allowed;
        color: #ccc;
    }

    .Tack-container #searchTable tbody td:last-child > span {
        color: var(--color-theme);
        cursor: pointer;
        margin: 0 5px;
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
        width: 100% !important;
        table-layout: fixed;
    }

    .Tack-container tbody input,
    .Tack-container tbody select {
        margin: 0;
    }
    .status-tack{
    	display: inline-block;
	    padding: 1px 5px;
	    background: #15B979;
	    font-size: 12px;
	    border-radius: 4px;
	    color: #FFF;
    }
    .status-tack.status-init{
    	background: #000;
    }
    .status-tack.status-running{
    	background: #5b62f9;
    }
    .status-tack.status-success{
    	background: #15B979;
    }
    .status-tack.status-skipped{
    	background: #ccc;
    }
    .status-tack.status-error{
    	background: red;
    }
</style>
<section class="panel Tack-container" style="margin: 0;">
    <p class="title">任务记录</p>
    <div class="content">
        <div class="operate-main">
            <div class="operate-wrap">
                <!-- <span>
                    <label for="start_time">开始时间</label><input type="text" id="start_time">
                </span>
                <span>
                    <label for="end_time">结束时间</label><input type="text" id="end_time">
                </span> -->
                <span>
                    <label for="back_state">任务状态</label>
                    <select id="back_state" style="margin: 0;">
                        <option value="">--全部--</option>
                        <option value="init">初始</option>
                        <option value="success">成功</option>
                        <option value="error">失败</option>
                        <option value="skipped">忽略</option>
                        <option value="running">运行</option>
                    </select>
                </span>
                <!-- <span>
                    <label for="clean_state">清理状态</label>
                    <select id="clean_state">
                        <option value="">--全部--</option>
                        <option value="1">成功</option>
                        <option value="0">失败</option>
                    </select>
                </span> -->
               <!--  <button class="query-btn" type="button">查询</button> -->
            </div>
        </div>
        <table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
            <thead>
            <tr>
                <th style="width: 80px;">序号</th>
                <th>任务名称</th>
                <th>任务描述</th>
                <th>执行参数</th>
                <th>处理状态</th>
                <th>异常信息</th>
                <th>任务开始时间</th>
                <th>任务结束时间</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</section>
