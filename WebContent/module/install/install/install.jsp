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
            <li id="installId">
                <img alt="" src="./img/svgobj.png">
                <p>安装</p>
                <p>生成安装文件、配置文件，请将生成文件按服务器IP上传。安装时阅读readme.txt </p>
            </li>

        </ul>

    </div>
</section>
