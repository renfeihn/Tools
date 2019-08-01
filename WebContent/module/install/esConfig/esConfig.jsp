<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false" %>
<style type="text/css">

    .search-input input {
        width: 100%;
        margin: 0;

    }

    .search-input i:active {
        background-color: #ebecee;
    }

    .search-input i {
        position: absolute;
        right: 1px;
        top: 1px;
        width: 22px;
        height: 22px;
        background-color: #f9f9fb;
        border-left: 1px solid #c7c6cc;
        text-align: center;
        color: #c7c6cc;
        line-height: 22px;
        font-weight: normal;
        cursor: pointer;
    }

    .logStorage-grid input + i {
        position: absolute;
        margin: 2px 0 0 -20px;
        color: #999;
        font-style: normal;
        font-weight: normal;
    }

    .logStorage-grid input,
    .logStorage-grid select {
        margin: 0;
        width: 200px;
    }

    .logStorage-grid > div {
        /* float: left;
        width: 46%;
        margin-bottom: 10px; */
    }

    .logStorage-grid label.control-label {
        margin-right: 12px;
        width: 150px;
    }

    .logStorage-grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, 34px);
        font-size: 12px;
        padding: 10px;
        align-items: center;
    }

    .logStorage-div .popover {
        max-width: none;
    }

    .plan-detail-table tr td:first-child {
        background-color: #fafafa;
        width: 40%;
    }

    .plan-detail-table tr td:last-child {
        color: #333;
    }

    .plan-detail-table td {
        height: 22px;
        line-height: 22px;
        vertical-align: middle;
        padding: 0 10px;
        color: #999;
        font-size: 10px;
        box-sizing: border-box;
        border: 1px solid #d9d9d9;
    }

    .logStorage-grid .boolean-switch {
        border-radius: 12px;
        float: none;
        margin-bottom: -8px;
    }

    .logStorage-grid .boolean-switch:BEFORE {
        width: 20px;
        border-radius: 10px;
    }

    .logStorage-grid .boolean-switch.true:BEFORE {
        margin-left: 20px;
    }


</style>

<div >
    <section class="panel" style="margin: 20px 20px 20px;">
        <p class="title">服务器列表</p>
        <table id="dataTable" class="display dataTable table">
            <thead>
            <tr>
                <th style="width: 0px;">server_id</th>
                <th style="width: 80px;">选中安装</th>
                <th style="width: 0px;">mysql_id</th>
                <th>服务器IP</th>
                <th>用户</th>
                <th>密码</th>
            </tr>
            </thead>
            <tbody></tbody>
        </table>
    </section>
    <section class="panel" style="margin: 0 20px 20px;">
        <p class="title">配置详情<span id="appId"></span></p>
        <form class="logStorage-grid form-horizontal">

            <div>
                <label class="control-label required">簇名称</label>
                <input type="text" value="" id="cluster_name" />
                推荐：asda
            </div>

            <div>
                <label class="control-label required">http端口</label>
                <input type="text" value="" id="http_port" />
                推荐：9200
            </div>

            <div>
                <label class="control-label required">tcp端口</label>
                <input type="text" value="" id="transport_tcp_port" />
                推荐：9300
            </div>

        </form>
    </section>

    <div style="text-align: center">
        <button type="button" data-role="saveBtn">保存</button>
        <%--&nbsp;--%>
        <%--<button type="button" data-role="resetBtn">重置</button>--%>
    </div>

</div>