<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false" %>
<style>

    section.objCateConfig-wrap.panel {
        background: #e9eaf2;
        height: 900px;

    }

    .objCateConfig-wrap {
        background: #e9eaf2 !important;
    }

    .objCateConfig-wrap .content {
        background: #e9eaf2;
        width: 888px;
        margin: 0 auto;
        height: 100%;
    }

    #resourceCateCtn li {
        width: 256px;
        text-align: center;
        height: 256px;
        background: #fff;
        margin-right: 36px;
        border-radius: 5px;
        cursor: pointer;
        float: left;
        padding: 40px 30px;
        box-sizing: border-box;
    }

    #resourceCateCtn li:hover {
        box-shadow: 5px 4px 3px #ccc;
    }

    #resourceCateCtn li > img {
        width: 100px;
        height: 100px;
        margin: 0 auto;
    }

    #resourceCateCtn li p:first-child {
        font-size: 20px;
        font-weight: bold;
        color: #000;
        margin-bottom: 16px;
    }

    #resourceCateCtn li p:last-child {
        text-align: center;
        font-size: 12px;
        color: #252b38;
    }

    #resourceCateCtn li:nth-child(3n+3) {
        margin-right: 0;
    }

    #resourceCateCtn li:nth-child(n+4) {
        margin-top: 20px;
    }

</style>

<section class="panel objCateConfig-wrap" style="margin: 0;border:none;">
    <div class="content" style="overflow:hidden;">
        <ul id="resourceCateCtn" class="objCateConfig-resources-ctn">
            <li id="sqlfileId">
                <img alt="" src="./img/svgobj.png">
                <p>文件传输工具</p>
                <p>文件在线传输，文件格式不限，文件大小100M，传输历史可查</p>
            </li>
            <li id="sqlQueryId">
                <img alt="" src="./img/JDBC.png">
                <p>数据库安全查询工具</p>
                <p>关系型数据库的快捷高效数据查询，数据访问安全控制</p>
            </li>
            <li id="sqlToolId">
                <img alt="" src="./img/sqlli.png">
                <p>SQL圈</p>
                <p>高效的SQL检索能力，社交化的SQL生态圈实现信息共享</p>
            </li>
            <li id="fileEditId" >
                <img alt="" src="./img/svgobj.png">
                <p>文件修改工具</p>
                <p>提供远程配置文件修改、备份，及操作记录追踪</p>
            </li>
        </ul>

    </div>
</section>
