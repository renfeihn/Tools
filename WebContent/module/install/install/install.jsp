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

<div>
    <%--<section class="panel" style="margin: 20px 20px 20px;">--%>
    <%--<p class="title">选择生成安装文件</p>--%>
    <%--<table id="dataTable" class="display dataTable table">--%>
    <%--<thead>--%>
    <%--<tr>--%>
    <%--<th style="width: 80px;">选择</th>--%>
    <%--<th>JAVA</th>--%>
    <%--<th>Zookeeper</th>--%>
    <%--<th>MySQL</th>--%>
    <%--<th>ES</th>--%>
    <%--<th>Kafka</th>--%>
    <%--<th>Hadoop HBase</th>--%>
    <%--<th>Storm</th>--%>
    <%--</tr>--%>
    <%--</thead>--%>
    <%--<tbody>--%>
    <%--<tr>--%>
    <%--<th style="width: 80px;"><input type="checkbox" name="all"/></th>--%>
    <%--<th><input type="checkbox" name="java"/></th>--%>
    <%--<th><input type="checkbox" name="zookeeper"/></th>--%>
    <%--<th><input type="checkbox" name="mysql"/></th>--%>
    <%--<th><input type="checkbox" name="es"/></th>--%>
    <%--<th><input type="checkbox" name="kafka"/></th>--%>
    <%--<th><input type="checkbox" name="hbase"/></th>--%>
    <%--<th><input type="checkbox" name="storm"/></th>--%>
    <%--</tr>--%>

    <%--</tbody>--%>
    <%--</table>--%>
    <%--</section>--%>

    <section class="panel" style="margin: 20px 20px 20px;">
        <p class="title">选择需要安装的软件<span id="appId"></span></p>
        <form class="logStorage-grid form-horizontal">

            <div>
                <%--<label class="control-label">软件</label>--%>
                <input type="checkbox" value="java"/>java
                <input type="checkbox" value="zookeeper"/>zookeeper
                <input type="checkbox" value="mysql"/>mysql
                <input type="checkbox" value="es"/>es
                <input type="checkbox" value="kafka"/>kafka
                <input type="checkbox" value="hbase"/>hadoop hbase phoenix
                <input type="checkbox" value="storm"/>storm
            </div>

        </form>
    </section>

    <div style="margin: 20px 20px 20px;">
        <label class="control-label">生成文件路径（注意：工具部署的服务器上）</label>
        <input style="width: 300px;" id="outFilePath" type="input"/>
        <span style="margin-left: 10px;">默认路径：工具部署目录/WEB-INF/classes/outConfig/</span>
    </div>

    <div style="text-align: center">
        <button type="button" data-role="checkBtn">全选</button>
        &nbsp;
        <button type="button" data-role="saveBtn">生成</button>
    </div>


    <div style="width: 100%;margin: 20px">
        <label class="control-label">执行日志：</label>
        <textarea style="padding: 5px; width: 900px; min-height: 400px;" id="logId"> </textarea>
    </div>

</div>