<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false" %>
<style>
    .configManges .fz14 {
        font-size: 14px;
    }

    .configManges .fz16 {
        font-size: 16px;
    }

    .configManges .fl {
        float: left;
    }

    .configManges .fr {
        float: right;
    }

    .configManges .ml0 {
        margin-left: 0;
    }

    .configManges .m0 {
        margin: 0;
    }

    .configManges .mr10 {
        margin-right: 10px;
    }

    .configManges .ml10 {
        margin-left: 10px;
    }

    .configManges .ml20 {
        margin-left: 20px;
    }

    .configManges .ml80 {
        margin-left: 80px;
    }

    .modalCont .mt5 {
        margin-top: 5px;
    }

    .configManges .mb0 {
        margin-bottom: 0;
    }

    .configManges .mt20 {
        margin-top: 20px;
    }

    .configManges .p10 {
        padding: 10px;
    }

    .configManges .pl20 {
        padding-left: 20px;
    }

    .configManges .p0 {
        padding: 0;
    }

    .configManges .p1 {
        padding: 1px;
    }

    .configManges .pl0 {
        padding-left: 0;
    }

    .configManges .pr20 {
        padding-right: 20px;
    }

    .configManges .ofh {
        overflow: hidden;
    }

    .configManges .w56 {
        width: 65px;
    }

    .configManges .w250 {
        width: 250px;
    }

    .modalCont .w720 {
        width: 720px !important;
    }

    .configManges .bnone {
        border: none;
    }

    .configManges .tal {
        text-align: left;
    }

    .configManges .fwb {
        font-weight: bold;
    }

    .configManges .fc {
        color: #c9c8cc;
    }

    .configManges .fcblue {
        color: #9297fb;
    }

    .configManges .pb0 {
        padding-bottom: 0;
    }

    .configManges .borderC {
        border: 1px solid #7278fa;
    }

    .configManges .pa {
        postion: absolute;
    }

    .configManges .pr {
        postion: relative;
    }

    .configManges .mb20 {
        margin-bottom: 20px;
    }

    .configManges .cp {
        cursor: pointer;
    }

    .configManges .dn {
        display: none;
    }

    .configManges .db {
        display: block;
    }

    .configManges input[type="radio"] {
        width: 15px;
        height: 15px;
    }

    .configManges .software-type {
        border-right: 1px solid #ebebed;
    }

    .configManges .log-content {
        height: 520px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .configManges .log-content p {
        font-size: 16px;
    }

    .configManges .FileConfig-tree {
        flex: none;
        width: 330px;
        border-right: 1px solid #ebebed;
        position: relative;
        height: 560px;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .configManges .FileConfig-tree:before {
        content: '';
        display: inline-block;
        border: 15px solid transparent;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -30px;
        border-left: 15px solid #e9eaf2;
    }

    .singleAbc-codeButton {
        position: absolute;
        right: 20px;
        bottom: 10px;
    }

    .configManges .save-btn1 {
        color: black;
        padding-right: 15px;
        margin-top: 10px;
        margin-left: 10px;
    }

    .configManges .save-btn2 {
        border-right: 1px solid #ccc;
        padding-right: 20px;
        margin-top: 10px;
        color: black;
    }

    .configManges .plproded {
        border-right: 1px solid #b2b4c2;
    }

    .content .currently {
        display: inline-block;
        width: 15px;
        height: 15px;
        border: 1px solid #b2b4c2;
        color: white;
        border-radius: 2px;
        margin-right: 10px;
        vertical-align: bottom;
    }

    .content .fa-check {
        background: #646af9;
        border: 1px solid #646af9;
    }

    .configManges .jumpPage {
        position: absolute;
        z-index: 1;
        right: 15px;
        bottom: 20px;
    }

    .configManges .jumpPage input, .modalCont .jumpPage input {
        width: 40px;
        margin: 0 1em;
    }

    .configManges .round {
        position: relative;
        font-style: normal;
        padding: 5px;
    }

    .configManges .round:before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        left: -9px;
        top: 12px;
    }

    .configManges .sucessLogo:before {
        background: green;
    }

    .configManges .failseLogo {
        color: red;
    }

    .configManges .failseLogo:before {
        background: red;
    }

    .configManges #dataTable_data > tbody td:nth-child(4) {
        cursor: pointer;
    }

    .configManges #dataTable_data > tbody td:nth-child(4):hover {
        text-decoration: underline;
    }

    .configManges .dataTables_paginate {
        margin-right: 150px;
    }

    .configManges .totalNum {
        position: absolute;
        z-index: 1;
        left: 15px;
        bottom: 20px;
        color: #393741;
    }

    .modalCont .jumpPage {
        position: absolute;
        z-index: 1;
        right: 15px;
        bottom: 20px;
    }

    .modalCont .dataTables_paginate {
        margin-right: 150px;
    }

    .modalCont .totalNum {
        position: absolute;
        z-index: 1;
        left: 20px;
        bottom: 33px;
        color: #393741;
    }

    .textBox {
        width: 100%;
        height: 470px;
        font-size: 14px;
        box-sizing: border-box;
        overflow: auto;
        word-break: break-all;
        word-wrap: break-word;
        white-space: pre-wrap;
    }

    .textareaCon {
        resize: none;
        height: 100%;
        width: 100%;
        border: none;
        font-size: 16px;
        margin-bottom: 0;
    }

    .configManges-content {
        position: relative;
        width: calc(100% - 330px);
    }

    section.panel > div.configManges-file {
        display: flex;
        padding: 0;
        height: 560px;
    }

    .configManges #editBtn {
        color: blue;
        cursor: pointer;
        font-size: 16px;
    }

    .configManges #editBtn:hover {
        text-decoration: underline;
    }

    .configManges .instBox {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        float: left;
        width: 100%;
        height: 30px;
        margin-top: 12px;
        line-height: 30px;

    }

    .configManges .instBox #editBtn {
        position: absolute;
        right: 20px;
        display: inline-block;
        width: 50px;

    }

    .configManges .slideBox {
        position: relative;
        display: flex;
        width: calc(100% - 370px);
        height: 26px;
        border-radius: 3px;
        overflow: hidden;
        box-sizing: border-box;
        margin-left: 5px;
    }

    .configManges .checkedBox {
        margin: 0 0 0 0px;
        display: flex;
        padding: 0 5px;
    }

    .configManges .checkedIns {
        display: flex;
        height: 26px;
        border-radius: 10px;
        background: #dedede;
        cursor: pointer;
        margin-right: 8px;
        line-height: 26px;
        box-sizing: border-box;
        padding: 0 8px;
    }

    .configManges .checkedIns > i {
        line-height: 26px;
        margin-left: 5px;
    }

    .configManges .checkedIns > i:hover {
        font-size: 16px;
    }

    .configManges .checkedIns:hover {
        background: var(--color_主题);
        color: #fff;
    }

    .configManges .checkedBox .checkedIns.on {
        background: var(--color_主题);
        color: #fff;
    }

    .configManges .instBox #showModal,
    .configManges .instBox #op_type {
        position: relative;
        flex: none;
        min-width: 88px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        background: var(--color_主题);
        border-radius: 3px;
        color: #fff;
        margin-right: 15px;
        cursor: pointer;
        font-size: 12px;
    }

    .configManges .instBox #showModal:hover,
    .configManges .instBox #op_type:hover,
    #op_type > span:hover {
        background: #60a0ff;
    }

    #op_type > span {
        position: absolute;
        top: 26px;
        left: 0;
        width: 88px;
        height: 26px;
        line-height: 26px;
        background: var(--color_主题);
        color: #fff;
        cursor: pointer;
    }

    #op_type > span:last-child {
        top: 52px;
    }

    .configManges #slideToLeft,
    .configManges #slideToRight {
        width: 26px;
        height: 26px;
        background: #eee;
        line-height: 26px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 5px 0 0 5px;
        margin-left: 25px;
        color: #666;
    }

    .configManges #slideToRight {
        margin-left: 10px;
        border-radius: 0 5px 5px 0;
    }

    .configManges #slideToLeft:hover,
    .configManges #slideToRight:hover {
        background: var(--color_主题);
        color: #fff;
    }

    .instBox .btn-tip {
        animation: btntip 1.5s linear infinite;
    }

    @keyframes btntip {
        0% {
            transform: rotate(0);
        }
        79% {
            transform: rotate(0);
        }
        80% {
            transform: rotate(5deg);
        }
        82% {
            transform: rotate(0deg);
        }
        84% {
            transform: rotate(-5deg);
        }
        86% {
            transform: rotate(5deg);
        }
        88% {
            transform: rotate(0deg);
        }
        90% {
            transform: rotate(-5deg);
        }
        100% {
            transform: rotate(0);
        }
    }

    .modal-body .fa-cog.fa-fw.fa-spin {
        color: green;
    }
</style>

<script type="text/javascript" src="script/lib/compareTxt.js"></script>

<section class="panel configManges" style="margin: -20px -20px 0;">
    <p class="title">配置文件管理</p>
    <div class="content">
        <section class="panel" style="height: 600px;">
            <p class="title" id="title">文件管理</p>
            <div class="content configManges-file">
                <div class="software-type">
                    软件类型<br/>
                    一级分类：
                    <select id="cate1_selector"></select><br/>
                    二级分类：
                    <select id="cate2_selector"></select><br/>
                    三级分类：
                    <select id="cate3_selector"></select><br/>

                    实例：
                    <ul id="instanceUlId">


                    </ul>

                </div>
                <div class="FileConfig-tree" id="treeSwitch">
                    <form class="form-horizontal p10 ofh mb0">
                        <div class="control-group fl mb0">
                            <div class="controls ml20 mb0">

                                <%--<label for="radio-abs" class="control-label fz16 fr w100 m0 " style="width: 100px;">--%>
                                <%--<input type="radio" id="radio-abs" name="list" class="ml10"--%>
                                <%--value="ABS" checked="checked" class="configManges-radio"--%>
                                <%--style="vertical-align: -3px;">--%>
                                <%--AIM列表</label>--%>
                                文件列表：
                            </div>
                        </div>
                        <%--<div class="control-group fl ml50 mb0" style="margin-left: 35px;">--%>
                        <%--<div class="controls  ml20">--%>
                        <%--<label for="radio-afa" class="control-label fz16 fr w100 " style="width: 100px;">--%>
                        <%--<input type="radio" id="radio-afa" name="list" class="ml10 m0"--%>
                        <%--value="AFA" disabled="disabled" class="configManges-radio">--%>
                        <%--AFA列表</label>--%>
                        <%--</div>--%>
                        <%--</div>--%>
                    </form>
                    <!--ABS树结构  -->
                    <ul id="fileUl" class="ztree" style="height: 30px;">
                    </ul>
                    <%--<ul id="fileAFA" class="ztree hide" style="height: 30px;" data-type="AFA">--%>
                    <%--</ul>--%>
                </div>
                <div class="panel  bnone configManges-content"
                     style="flex: auto;">
                    <div class="content ">
                        <div class="log-content">
                            <div class="instBox">
								<%--<span id="op_type" class="btn-tip"><i class="fa fa-chevron-down"--%>
                                                                      <%--style="margin-right: 4px;"></i>--%>
									<%--<i style="font-style: normal;" id="operts">操作方式</i>--%>
									<%--<span class="hide" id="single_op">单独操作</span>--%>
									<%--<span class="hide" id="total_op">批量操作</span>--%>
								<%--</span>--%>
                                <%--<span id="showModal" class="btn-tip"> <i class="fa fa-plus"--%>
                                                                         <%--style="margin-right: 4px;"></i>选择实例 <span>(0)</span></span>--%>
                                <div id="slides" class="hide" style="display: flex;width: 80%;margin-left:15px;">
                                    <span id="slideToLeft" class="hide"><i class="fa fa-angle-left"
                                                                           style="margin:5px 0 0 10px;"></i></span>
                                    <div class="slideBox">
                                        <ul class="checkedBox">

                                        </ul>
                                    </div>
                                    <span id="slideToRight" class="hide"><i class="fa fa-angle-right"
                                                                            style="margin:5px 0 0 10px;"></i></span>
                                </div>
                                <span id="editBtn">编辑</span>
                            </div>
                            <div class="textContainer">
                            </div>
                        </div>
                        <div class="singleAbc-codeButton hide">
                            <button type="button" class="btn confirmBtn" id="cancelBtn">取消</button>
                            <button type="button" id="save" class="btn confirmBtn">上传并备份</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="panel mt20">
            <p class="title">操作历史</p>
            <input type="button" id="compareId" value="比较" />
            <div class="content" style="position: relative; overflow: hidden;">
                <!-- 数据表格Start -->
                <table id="dataTable_data" class="display dataTable table">
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>软件类型</th>
                        <th>实例</th>
                        <th>文件路径</th>
                        <th>文件名</th>
                        <th>操作人</th>
                        <th>描述</th>
                        <th>操作时间</th>
                        <th>操作结果</th>
                        <th>当前版本内容</th>
                        <th>上一版本内容</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                <!-- 数据表格End -->
                <!-- 跳转到某页Start -->
                <span class="jumpPage" style="">跳转到<input id="HistoPage" type="text"/>页
				</span>
            </div>
        </section>
    </div>
</section>


<div id="modal" class="modal hide fade w720 modalCont" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 900px;height: 600px;">
    <div class="modal-header">
        <button class="close" type="button" data-dismiss="modal">×</button>
        <h3 id="myModalLabel">文本对比</h3>
    </div>
    <div style="display: flex;overflow: scroll; height: 600px">
        <div id="leftId"></div>
        <div id="rightId"></div>
    </div>

</div>
