<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
    .db-list{
        width: 260px;
        /*height: 830px;*/  /*暂定*/
        height: calc(100vh - 42px);
        background-color:#3E456E;
        color: #fff;
        position: relative;
        transition: width 0.5s;
    }
    .db-list.pickUp{
        width: 0;
    }
    .db-list.pickUp .db-list-c{
        display:none;
    }
    .db-list-header{
        height: 24px;
        color: #D3D5FF;
        display:flex;
        justify-content: space-between;
        padding: 8px;
        margin: 0 10px;
    }
    .db-list-header span:nth-child(1) {
        font-size:15px;
    }
    .db-list-header a{
        color: #D3D5FF;
        text-decoration: none;
    }
    .db-list-search {
        padding: 0 8px;
        margin: 0 10px;
        position: relative;
    }
    .db-list-search input {
         width: 100%;
         padding-right: 24px;
     }
    .db-list-search i {
        width: 24px;
        height: 22px;
        position: absolute;
        right:8px;
        top:0;
        color: #c9c8ce;
        background-color: #F9F9FB;
        text-align: center;
        line-height: 22px;
        border: 1px solid #C9C8CE;
        cursor: pointer;
    }
    .db-list-items{
        margin: 0;
        padding: 0;
    }
    .db-list-item{
        height:36px;
        line-height: 36px;
        padding: 0 18px;
        font-size:14px;
        cursor: pointer;
        position: relative;
        z-index: 333;
    }
    .db-list-nodata{
        text-align:center;
        display:none;
    }
    .db-list-edit{
        width:84px;
        background-color: #fff1f0;
        color:#000;
        text-align: center;
        position:absolute;
        right:-21px;
        border-radius: 2px;
        z-index:9999;
        display: none;
    }
    .db-list-edit:before{
        content: "";
        border-color: transparent transparent #fff1f0 transparent;
        border-style: solid;
        border-width: 8px;
        position: absolute;
        left: 50%;
        margin-left: -8px;
        top:-16px;
    }
    .db-list-edit ul{
        margin:0;
    }
    .db-list-edit ul li{
        height:28px;
        line-height:28px;
        cursor: pointer;
    }
    .db-list-edit ul li:hover{
        opacity: .5;
    }
    .db-list-item.selected {
        background-color:#4C5797;
    }
    .db-list-item:hover {
        background-color: #4C5797;
    }
    .db-list-item.selected .item-ellipsis {
        display: inline-block;
        width: 6px;
        text-align: center;
    }
    .db-list-item .item-tooltip{
        width: 270px;
        height: 80px;
        background-color: #3E456E;
        position: absolute;
        top: 0px;
        right: -318px;
        z-index: 999;
        border-radius: 2px;
        padding:20px;
        line-height: 24px;
        display: none;
    }
    .db-list-item:hover .item-tooltip{
        display: block;
    }
    .db-list-item .item-tooltip:before{
        content: "";
        width: 0;
        height: 0;
        border-color: transparent #3E456E transparent transparent;
        border-style: solid;
        border-width: 8px;
        position: absolute;
        left: -16px;
        top: 16px;
    }
    .item-tooltip .item-tooltip-item{
        display:flex;
    }
    .item-tooltip .item-tooltip-item span:nth-child(1){
        margin-right: 15px;
    }
    .item-tooltip .item-tooltip-item span:nth-child(2){
        flex:1;
    }
    .overflowDisplay1{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .overflowDisplay3{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    .item-ellipsis{
        display: none;
        color: #8593E5;
        position: absolute;
        right: 20px;
        top: 11px;
    }
    .item-bars{
        margin-right:10px;
    }
    .db-list-arrow{
        position: absolute;
        right: -12px;
        top: 50%;
        width: 12px;
        height:40px;
        margin-top: -20px;
        background-color: #2E3457;
        clip-path: polygon(0px 0px,12px 7px, 12px 34px, 0px 40px);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 500;
    }
    .db-list-arrow .db-small-arrow{
        width: 0;
        height:0;
        overflow: hidden;
        font-size: 0;
        line-height: 8px;
        border-color: transparent #535D9C transparent transparent;
        border-style: solid;
        border-width: 6px;
        margin-right: 6px;
    }
    .db-content{
        flex:1;
        background-color: #F5F5FA;
    }
    .db-content-header{
        display: flex;
        justify-content: space-between;
        height: 12px;
        line-height:12px;
        padding: 22px;
    }
    .db-content-header .db-content-header-title{
        font-size:16px;
        font-weight: 500;
        color:#383740;
    }
    .db-content-header-btn a{
        color:#383740;
        text-decoration: none;
        display: inline-block;
        padding: 5px;
        border: 1px solid #C7C6CC;
        font-weight: normal;
    }
    .db-content-header-btn a.disabled{
        color: #aeadb2;
        border-color: #ebebed;
        cursor: not-allowed;
    }
    .db-content-main{
        position:relative;
        padding: 0 22px;
        /*height: 730px;*/ /* 暂定 */
        height: calc(100vh - 142px);
        box-sizing: border-box;
        overflow-y: auto;
    }
    .db-content-footer{
        height:44px;
        background-color: #EBEBF0;
        line-height: 44px;
    }
    .db-content-footer button{
        float: right;
        margin-top: 6px;
        margin-right: 20px;
    }
    .instance-item{
        position: absolute;
        background-color: #fff;
        width:300px; /*暂定*/
        height:300px; /*暂定*/
        min-width: 200px;
        min-height: 200px;
        padding: 25px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
    .instance-item-header{
        height:20px;
        line-height:20px;
    }
    .instance-item-header .item-title{
        font-size: 16px;
        font-weight: bold;
        display:inline-block;
    }
    .charts-item{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .instance-item-header a{
        font-size: 16px;
        text-decoration: none;
        color:#9B9DBA;
        margin: 0 2px;
    }
    .instance-item-footer{
        position: absolute;
        width:100%;
        height: 25px;
        bottom: 0;
        right: 0;
        opacity: 0;
    }
    .instance-item-footer .resize-arrow{
        position: absolute;
        right:5px;
        bottom: 5px;
        display: inline-block;
        width: 10px;
        height: 10px;
        clip-path: polygon(10px 0, 0 10px, 10px 10px);
        background-color: #CACAD2;
        cursor: nw-resize;
    }
    #modal .chartsModal-item .cm-item-header{
        height:24px;
        line-height:38px;
        font-size: 16px;
        font-weight: bolder;
        padding: 5px 5px 25px 5px;
        border-bottom: 1px solid #D8D7DB;
    }
    #modal .chartsModal-item .cm-item-header:before{
        content: "";
        width: 6px;
        height: 18px;
        background-color: #5257b6;
        display: inline-block;
        margin-right: 8px;
        vertical-align: text-bottom;
    }
    #modal .cm-item-l{
        flex: 1;
        border: 1px solid #D8D7DB;
        margin: 10px;
        border-radius: 5px;
        position:relative;
    }
    #modal .cm-item-l.selected{
        border-color:#5265D7;
    }
    #modal .cm-item-l.selected:after{
          content: "√";
          display: inline-block;
          color:#fff;
          position:absolute;
          right:0;
          top:0;
          background-color: #5265D7;
          width: 15px;
          height:15px;
          line-height: 15px;
          text-align: center;
    }
    #modal .cm-item-l.selected i{
       color: #5265D7;
    }
    #modal .cm-item-l.selected span{
        color: #5265D7;
    }
    #modal .cm-item-l i{
        display: block;
        height: 60px;
        text-align:center;
        line-height: 70px;
        font-size:40px;
        color:#8089aa;
    }
    #modal .cm-item-l span{
        display: block;
        text-align: center;
        color: #8089aa;
    }
    #modal .cm-item-block{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #modal .cm-item-block span{
        margin-right: 20px;
        color: #5e6fda;
    }
    #modal .cm-item-ul-box{
        height:250px;
        overflow-y: auto;
        background-color: #F2F2F7;
    }
    #modal .cm-item-ul{
        margin: 0;
    }
    #modal .cm-item-ul li{
        height:31px;
        line-height: 36px;
        padding: 5px 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #modal .cm-item-ul li.disabled{
        color: #999;
        pointer-events: none;
        opacity: 0.5;
    }
    #modal .cm-item-ul li:hover{
        background-color: #0A9EE6;
    }
    /*#modal .cm-item-ul li.disabled:hover{
        background-color: #ccc9d8;
    }*/
    #modal .cm-item-ul li .cm-icon-li-item{
        color:#8089AA;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 20px;
        text-align: center;
    }
    #modal .cm-radio{
        width: 16px;
        height:16px;
        background-color: #fff;
        border: 1px solid #9DA5C3;
        border-radius: 50%;
        cursor: pointer;
    }
    #modal .cm-radio.selected{
        border-width: 5px;
        border-color: #5265D7;
        width: 8px;
        height:8px;
    }
    #modal .preViewImg{
        position:absolute;
        width:200px;
        height:100px;
        right: -180px;
        background-color:#fff;
        display:none;
        opacity: 0;
        transition: all 0.3s;
    }
    #modal .cm-radio:hover+.preViewImg{
        opacity: 1;
        display: block;
    }
    #modal .cm-radio.disabled{
        cursor: not-allowed;
    }
    #modal2 .modal-item label{
        display: inline-block;
        font-size: 1rem;
    }
    #modal2 .modal-item input{
        width: 248px;
    }
    #modal2 .modal-item textarea{
        width: 604px;
        height: 120px;
        resize: none;
    }
    .edit-group{
      	opacity:0;
        float: right;
        position: relative;
        z-index: 2;
    }
    .instance-item:hover .edit-group, .instance-item:hover .instance-item-footer{
       opacity:1;
    }
    .charts-item img{
    	width:100%;
    	height:100%;
    }
    textarea#annotation {
        width: 84%;
        resize: none;
        height: 140px;
    }
</style>
<section class="panel" style="margin: 0 -1px;">
    <div class="content" style="display: flex; padding: 0;">
        <div class="db-list">
            <div class="db-list-c">
                <div class="db-list-header">
                    <span>仪表盘列表</span>
                    <span>
                    <a href="javascript:void(0)" id="addDashBorad">
                       <i class="fa fa-plus"></i>
                        新增
                    </a>
                </span>
                </div>
                <div class="db-list-search">
                    <input type="search"  id="dbSearch"/>
                    <i class="fa fa-search"></i>
                </div>
                <div class="db-list-l">
                    <ul class="db-list-items">
                    </ul>
                    <div class="db-list-nodata">
                        无可用仪表盘列表。
                    </div>
                    <div class="db-list-edit">
                        <ul>
                            <li type="edit">编辑</li>
                            <li type="remove">删除</li>
                            <li type="copy">复制</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="db-list-arrow" id="dbListResize">
                <div class="db-small-arrow"></div>
            </div>
        </div>
        <div class="db-content">
            <div class="db-content-header">
                <p class="db-content-header-title">各支行网点登录统计</p>
                <div class="db-content-header-btn">
                    <a href="javascript:void(0)" id="addFirstPage">
                        <i class="fa fa-plus"></i>
                        保存到首页
                    </a>
                    <a href="javascript:void(0)" id="addCharts">
                        <i class="fa fa-plus"></i>
                        添加图表
                    </a>
                    <a href="javascript:void(0)" id="exportCharts">
                        <i class="fa fa-download"></i>
                        导出图表
                    </a>
                </div>
            </div>
            <div class="db-content-main">
               <%-- <div class="instance-item">
                    <div class="instance-item-header">
                        <p class="item-title">未命名数据图表</p>
                        <div class="edit-group">
                            <a href="javascript:void(0)">
                                <i class="fa fa-edit"></i>
                            </a>
                            <a href="javascript:void(0)">
                                <i class="fa fa-trash"></i>
                            </a>
                            <a href="javascript:void(0)">
                                <i class="fa fa-expand"></i>
                            </a>
                            <a href="javascript:void(0)" class="download">
                                <i class="fa fa-download"></i>
                            </a>
                        </div>
                    </div>
                    <div class="charts-item" id="charts-instance"></div>
                    <div class="instance-item-footer">
                       <span class="resize-arrow"></span>
                    </div>
                </div>--%>
            </div>
            <div class="db-content-footer">
                <button type="button" class="confirmBtn" id="saveBtn">保存</button>
                <button type="button" class="cancelBtn" id="canelBtn">取消</button>
            </div>
        </div>
    </div>
</section>

<div id="modal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width:576px;">
    <div class="modal-header">
        <button class="close" type="button" data-dismiss="modal">×</button>
        <h3>添加图表</h3>
    </div>
    <div class="modal-body" style="padding-top: 0; overflow-y: hidden; max-height: none;overflow:visible">
        <div class="chartsModal-item">
           <div class="cm-item-header">选择图表类型</div>
           <div class="cm-item-content" style="display: flex;">
               <div class="cm-item-l" type="1">
                   <i class="fa fa-line-chart"></i>
                   <span>折线图</span>
               </div>
               <div class="cm-item-l" type="2">
                   <i class="fa fa-bar-chart"></i>
                   <span>柱状图</span>
               </div>
               <div class="cm-item-l" type="3">
                   <i class="fa fa-pie-chart"></i>
                   <span>饼状图</span>
               </div>
           </div>
        </div>
        <div class="chartsModal-item">
            <div class="cm-item-header">选择工作表</div>
            <div class="cm-item-content">
                <div class="cm-item-block">
                    <input type="search" placeholder="请输入查询信息" />
                    <span>32个</span>
                </div>
                <div class="cm-item-ul-box">
                    <ul class="cm-item-ul">
                       <%-- <li>
                            <div class="">
                                <i class="fa fa-file-text cm-icon-li-item"></i>
                                <span>总行数据中心员工在线登录数</span>
                            </div>
                            <div class="cm-radio selected"></div>
                            <div class="preViewImg">
                                <img src="" />
                            </div>
                        </li>
                        <li>
                            <div class="">
                                <i class="fa fa-file-text cm-icon-li-item"></i>
                                <span>总行数据中心员工在线登录数</span>
                            </div>
                            <div class="cm-radio"></div>
                        </li>--%>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
        <button type="button" data-dismiss="modal" class="confirmBtn" id="addItemCharts">完成</button>
    </div>
</div>

<div id="modal2" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 700px;">
    <div class="modal-header">
        <button class="close" type="button" data-dismiss="modal">×</button>
        <h3>新建仪表盘</h3>
    </div>
    <div class="modal-body">
        <form class="form-horizontal">
            <div class="control-group">
                <label for="sname" class="control-label required">名称</label>
                <div class="controls">
                    <input type="text" id="sname" placeholder="请输入名称" />
                    <span class="help-inline hide"></span>
                </div>
            </div>
            <div class="control-group">
                <label for="annotation" class="control-label">注释</label>
                <div class="controls">
                    <textarea id="annotation" placeholder=""></textarea>
                </div>
            </div>
        </form>
        <!-- <div class="modal-item">
            <i style="color: #ff3341">*</i>
            <label for="sname" style="display: inline-block">名称:</label>
            <input type="text" class="form-control" id="sname" placeholder="请输入名称">
        </div>
        <div class="modal-item">
            <label for="annotation" style="float: left; margin-right: 5px;margin-left: 9px;">注释:</label>
            <textarea id="annotation"></textarea>
        </div> -->
    </div>
    <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
        <button type="button" class="confirmBtn" id="addNewGroup">完成</button>
    </div>
</div>


<script type="text/template" id="db-list-tpl">
    {{#each this}}
        {{#if this.Selected}}
        <li class="db-list-item selected" isIndex={{this.isIndex}} groupId={{this.groupId}}>
        {{else}}
        <li class="db-list-item" isIndex={{this.isIndex}} groupId={{this.groupId}}>
        {{/if}}
            <i class="fa fa-bars item-bars"></i>
            <span>{{this.groupName}}</span>
            <i class="fa fa-ellipsis-v item-ellipsis"></i>
            <div class="item-tooltip">
                <div class="item-tooltip-item">
                    <span>名称:</span>
                    <span class="overflowDisplay1">{{this.groupName}}</span>
                </div>
                <div class="item-tooltip-item">
                    <span>注释:</span>
                    <span class="overflowDisplay3">{{this.remark}}</span>
                </div>
            </div>
        </li>
    {{/each}}
</script>


<script type="text/template" id="dashBoradItem">
    {{#each this}}
    <div class="instance-item" boardId="{{this.relation.boardId}}" style="width:{{this.relation.width}}px;height:{{this.relation.height}}px;top:{{this.relation.y}}px; left:{{this.relation.x}}px;">
        <div class="instance-item-header">
            <p class="item-title">{{this.title}}</p>
            <div class="edit-group">
                <a href="javascript:void(0)">
                    <i class="fa fa-reply"></i>
                </a>
                <a href="javascript:void(0)">
                    <i class="fa fa-trash"></i>
                </a>
                <a href="javascript:void(0)" class="download">
                    <i class="fa fa-download"></i>
                </a>
            </div>
        </div>
        <div class="charts-item">
			<img src="{{this.image}}" />
		</div>
        <div class="instance-item-footer">
            <span class="resize-arrow"></span>
        </div>
    </div>
    {{/each}}
</script>


<script type="text/template" id="preViewChart">
    {{#each this}}
    {{#if this.disabled}}
    <li boradId="{{this.id}}" class="disabled">
    {{else}}
    <li boradId="{{this.id}}">
    {{/if}}
        <div class="">
            <i class="fa fa-file-text cm-icon-li-item"></i>
            <span>{{this.name}}</span>
        </div>
        {{#if this.disabled}}
        <div class="cm-radio disabled"></div>
        {{else}}
        <div class="cm-radio"></div>
        {{/if}}
        <div class="preViewImg">
            <img src="{{this.image}}" />
        </div>
    </li>
    {{/each}}
</script>










