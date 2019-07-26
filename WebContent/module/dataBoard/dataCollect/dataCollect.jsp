<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>



<style>
.onoff-ctn.ws-ctn{
	width: 100%;
}
.ws-left-title{
	float: left;
}
.ws-right-title{
	float: right;
}
.ws-title-btn{
	display: inline-block;
    padding: 10px;
    height: 10px;
    margin-right: 15px;
    background: #13B1F5;
    line-height: 10px;
    color: #FFF;
    font-size: 14px;
    cursor: pointer;
}
.ws-title-btn:hover{
	background: #3BC3FF;
}
.ws-show-ul{
	display: inline-block;
    margin: 0 26px 0 5px;
    border-top: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
}
.ws-show-li{
    float: left;
    padding: 3px 10px;
    border-left: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
}
.ws-show-li:hover{
	color: #13b1f5;
}
.ws-show-li.ws-sel-li{
	background: #13b1f5;
	color: #fff;
	cursor: default;
}
.ws-mid-span{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
}
.ws-btns-ctn{
	margin-bottom: 20px;
	overflow: hidden;
}
.ws-item-ctn{
	position: relative;
	float: left;
	box-sizing: border-box;
	padding: 10px;
	width: 170px;
	height: 140px;
	border: 1px solid #e5e5e5;
	border-radius: 4px;
	background: #FAFAFA;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
}
.ws-main-ctn>.ws-item-ctn{
	width: 206px;
    height: 170px;
}
.ws-item-title{
	font-size: 14px;
    font-weight: 700;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
}
.ws-inner-ctn{
    background: url(img/echarts/workitem.png) center center no-repeat;
    width: 100%;
    height: 105px;
    background-size: contain;
}
.ws-self-share{
    position: absolute;
    right: 0;
    bottom: 0;
}
.ws-other-share{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 26px;
    background: rgba(0,0,0,0.4);
    color: #fff;
    line-height: 26px;
    font-size: 12px;
    text-align: center;
}
.ws-other-share img {
    position: relative;
    left: -9px;
    top: -2px;
}
input.ws-search-input{
	border-color: #e5e5e5;
    text-shadow: none;
    border: none;
    border-radius: 0;
    height: 20px;
    box-shadow: none;
    margin-bottom: 0px;
    margin-left: 6px;
    font-size: 14px;
    width: 950px;
    outline: none;
}
input.ws-search-input:focus{
	border: none;
    box-shadow: none;
}
.ws-search-ctn{
	border: 1px solid #e5e5e5;
	margin-bottom: 10px;
}
.ws-search-i{
	color: #999;
    font-size: 16px;
    margin-top: 5px;
    margin-left: 20px;
    float: left;
}
.ws-add-left{
	float: left;
    height: 528px;
    width: 773px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
}
.ws-add-right{
	float: right;
	padding: 10px 15px;
    width: 203px;
    height: 508px;
    background: #F7F6FB;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    overflow: hidden;
}
.ws-search-ctn.ws-focus{
	border-color: rgba(82, 168, 236, .8);
	outline: 0;
	-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px
		rgba(82, 168, 236, .6);
	-moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px
		rgba(82, 168, 236, .6);
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px
		rgba(82, 168, 236, .6)
}
.ws-add-modal{
    width: 1075px;
    max-height: none;
    margin-left: -550px;
    padding-bottom: 0;
}
.ws-add-share{
	max-height: none;
	overflow: hidden;
}
.ws-grps-ul{
	float: left;
	height: 100%;
    width: 180px;
    margin: 0;
    border-right: 1px solid #e5e5e5;
}
.ws-grps-ul>li{
    padding: 0 20px;
    height: 36px;
    line-height: 36px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 12px;
    cursor: pointer;
}
.ws-grps-ul>li:hover{
	color: #13b1f5;
}
li.ws-grp-cur{
	background: #13b1f5;
	color: #fff;
}
li.ws-grp-cur:hover{
	color: #fff;
	cursor: default;
}
.ws-sel-area{
    float: left;
    padding: 20px 0 20px 20px;
    height: calc(100% - 40px);
    width: calc(100% - 221px);
    overflow: hidden;
}
.ws-item-ctn.ws-sel-item{
	margin-right: 20px;
}
.ws-add-btn{
	display: inline-block;
	float: right;
    width: 36px;
    height: 20px;
    background: #13b1f5;
    color: #fff;
    text-align: center;
    border-radius: 1px;
    cursor: pointer;
}
.ws-add-btn:hover{
	background: #3BC3FF;
}
.ws-add-right-title{
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
}
.ws-seled-ctn{
    padding-top: 10px;
    overflow: auto;
    height: calc(100% - 52px);
}
.ws-seled-item>div{
	float: left;
}
.ws-item-img{
    width: 36px;
    height: 36px;
    background: url(img/echarts/workitem.png) center center no-repeat;
    background-size: contain;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    margin-right: 10px;
}
.ws-item-title-font{
	font-weight: 700;
    width: 100px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.ws-item-from-font{
	color: #a6a6a6;
}
.ws-seled-item{
    overflow: hidden;
    margin-bottom: 10px;
}
.ws-item-ctn>img{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.ws-item-jian{
	position: relative;
    width: 30px;
    height: 30px;	
}
.ws-item-jian>img{
    position: absolute;
    left: 32px;
    top: 8px;
    cursor: pointer;
}
.ws-tip{
    position: absolute;
    display: inline-block;
    left: 0;
    padding: 0 5px;
    width: 60px;
    height: 26px;
    line-height: 26px;
    background-color: rgba(0,0,0,0.4);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#4C000000,endColorstr=#4C000000);
    letter-spacing: 5px;
    color: #fff;
    font-size: 16px;
}
.ws-main-ctn>div{
	cursor: pointer;
}
.ws-tip-icon{
    font-size: 16px;
    width: 21px;
}
.ws-tip-icon:first-child{
	margin-left: 7px;
}
.ws-tip-icon:hover{
	font-size: 18px;
}
.onoff-body.ws-body{
	padding-right: 0;
}
input.ws-add-input{
    border-radius: 0;
    width: 445px;
}
textarea.ws-add-texta{
    width: 445px;
    height: 60px;
    resize: none;
    border-radius: 0;
}

.ws-title-h3{
	display: inline;
}
.ws-sel-ctn{
    position: relative;
    width: 700px;
    height: auto;
    padding: 10px;
    min-height: 160px;
    overflow: auto;
    background: #F7F6FB;
}
.ws-grp-ctn.sel-kpi-ctn{
	margin: 0px 14px 15px 0;
}
.ws-grps-ctn{
	height: auto;
    min-height: 150PX;
    margin-bottom: 20px;
}
.ws-sel-btn{
	display: inline-block;
    width: 48PX;
    height: 18px;
    line-height: 18px;
    margin-left: 10px;
    background: #FFFFFF;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    color: #DADADA;
    cursor: pointer;
}
.ws-sel-title{
	margin-bottom: 10px;
	color: #ccc;
}
.ws-sel-all.ws-sel-btn{
	border: 1px solid #14B1F4;
    color: #14B1F4;
    background-image: url(./img/kpisel/cur-kpi.png);
    background-repeat: no-repeat;
    background-position: top right;
}
.ws-color-blue{
	color:#14B1F4;
}
.ws-sel-ctn .ws-grp-ctn{
	cursor: default;
}
.ws-hide{
	display: none;
}
.ws-clear{
    position: absolute;
    padding: 0 5px;
    right: 30px;
    top: 25px;
    background: #13b1f5;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
}
.ws-clear:hover{
	background: #3BC3FF;
}

div#defModalBody>span {
    float: left;
}
.sel-modal{
	left:  20% !important;
}
</style>

<div class="onoff-ctn ws-ctn">
	<div class="onoff-title">数据可视化看板</div>
	<div class="onoff-body ws-body">
		<div class="ws-btns-ctn">
			<!-- <div class="ws-left-title">
				<span id="wsAddItem" class="ws-title-btn">+&nbsp;新建看板</span>
				<span id="wsAddShare" class="ws-title-btn">+&nbsp;添加分享</span>
			</div> -->
			<div class="ws-right-title">
				<span class="ws-mid-span">筛选方式:</span>
				<ul class="ws-show-ul">
					<li class="ws-show-li ws-sel-li" id="wsShowAll">按全部</li>
					<li class="ws-show-li" id="wsShowSelf">按自建</li>
					<li class="ws-show-li" id="wsShowSelfShare">自分享</li>
					<li class="ws-show-li" id="wsShowShare">被分享</li>
				</ul>
			</div>
		</div>
		<div id="wsMainCtn" class="ws-main-ctn">
			
		</div>
		<div class="clearfix"></div>
	</div>
</div>

<!-- 添加方向模态框开始  -->
<div id="addShareModal" class="modal hide fade ws-add-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">×</button>
		<h3 class="ws-title-h3">选择需要展示的被分享项目</h3>
	</div>
	<div class="modal-body ws-add-share">
		<div class="ws-search-ctn" id="wsSearchCtn">
			<i class="fa fa-search ws-search-i"></i>
			<input type="text" class="ws-search-input" id="wsSearchInp" placeholder="请输入关键字进行搜索">
			<span id="wsClearSea" class="ws-clear">清空搜索</span>
		</div>
		<div class="clearfix"></div>
		<div class="ws-add-left">
			<ul class="ws-grps-ul" id="wsGrpsUl">
				<li class="ws-grp-cur">所有分享项目</li>
			</ul>
			<div class="ws-sel-area" id="wsSelArea">

			</div>
		</div>
		<div class="ws-add-right">
			<div class="ws-add-right-title">
				<span>已选被分享项目(<span id="wsSeledNum">0</span>)</span>
				<span id="wsAddBtn" class="ws-add-btn">确定</span>
			</div>
			<div id="wsSeledCtn" class="ws-seled-ctn">

			</div>
		</div>
	</div>
</div>
<!-- 添加分享模态框结束  -->

<!-- 添加项目模态框开始  -->
<div id="wsAddItemModal" class="modal fade hide">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
		<h4>项目信息</h4>
	</div>
	<div id="defModalBody" class="modal-body row-fluid">
		<span>项目名称：</span><input id="wsItemNameV" class="ws-add-input" type="text" placeholder="此处输入项目名称">
		<span>项目描述：</span><textarea id="wsItemDescV" class="ws-add-texta" placeholder="此处输入项目描述，200字以内"></textarea>
	</div>
	<div class="modal-footer">
		<button class="modal-btn gray" data-dismiss="modal">取消</button>
		<button id="additemSubmit" class="modal-btn blue  marginL15">完成</button>
	</div>
</div>
<!-- 添加项目模态框结束  -->

<!-- 项目Ctn模板开始 -->
<div id="wsItemTemp" class="hide">
	<div id="__id__" data-role="wsItem" class="ws-item-ctn">
		<div class="ws-item-title">__itemName__</div>
		<div class="ws-inner-ctn">
			<div data-role="wsTip" class="ws-tip " >
				<span data-role="wsTipEdit" data-toggle="modal" class="ws-tip-icon fa fa-pencil-square-o" data-toggle="tooltip" title="点击编辑项目"></span>
			 	<span data-role="wsTipShare" data-toggle="modal" class="ws-tip-icon fa fa-share-alt hide" data-toggle="tooltip" title="点击共享项目"></span>
				<span data-role="wsfTipDel" class="ws-tip-icon fa fa-trash" data-toggle="tooltip" title="点击删除项目"></span>			
			</div>
		</div>
		<div data-role="wsShareGrps" class="hide">__shareGrp__</div>
	</div>
</div>
<!-- 项目Ctn模板结束 -->

<!-- 待选择项目ctn模板开始  -->
<div id="wsItemTempSel" class="hide">
	<div id="__id__" data-role="wsItem" user-grp="__usergrp__" class="ws-item-ctn ws-sel-item" title="点击进入项目">
		<div class="ws-item-title">__itemName__</div>
		<div class="ws-inner-ctn"></div>
		<div class="ws-other-share"><img src="./img/workspace/ws-other-share.png">分享者：__username__</div>
		<div data-role="wsShareGrps" class="hide">__shareGrp__</div>
	</div>
</div>
<!-- 待选择项目ctn模板 结束   -->

<!-- 已选项目CTN模板开始 -->
<div id="wsSeledItem" class="hide">
	<div  id="__id__" class="ws-seled-item"  user-grp="__usergrp__">
		<div class="ws-item-img"></div>
		<div>
			<div class="ws-item-title-font">__itemName__</div>
			<div class="ws-item-from-font">分享者：__username__</div>
		</div>
		<div class="ws-item-jian"><img data-role="wsSelPic" src="./img/workspace/jian.png"></div>
		<div data-role="wsShareGrps" class="hide">__shareGrp__</div>
	</div>
</div>
<!-- 已选项目CTN模板结束 -->

<!-- 他人分享模板开始 -->
<div id="wsOtherShareTemp" class="hide">
	<div class="ws-other-share"><img src="./img/workspace/ws-other-share.png">分享者：__username__</div>
</div>
<!-- 他人分享模板结束 -->

<!-- 自分享模板开始 -->
<div id="wsSelfShareTemp" class="hide">
	<div class="ws-self-share"><img src="./img/workspace/ws-self-share.png"></div>
</div>
<!-- 自分享模板结束 -->


<div id="shareModal" class="modal hide fade sel-modal " tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header" id="selModalHeader">
		<button id="clo_btn" type="button" class="close" data-dismiss="modal"
			aria-hidden="true">×</button>
		<h3 id="myModalLabel" class="ws-title-h3">分享设置</h3>
		<span class="ws-sel-btn" id="wsSelAll">全选</span>
	</div>
	<div class="modal-body" id="selModalBody" style="max-height: 800px;overflow: visible;">
		<div class="ws-grps-ctn" id="wsGrpsCtn">
		</div>
		<div class="ws-sel-ctn" id="wsSeled">
			<div class="ws-sel-title" id="wsSelTitle">已选分组：<span id="wsSeledCount">0</span></div>
		</div>
	</div>
	<div class="modal-footer" id="selModalFooter">
		<button class="modal-btn gray free-cancel" id="cancel" data-dismiss="modal" aria-hidden="true">取消</button>
		<button class="modal-btn blue fre-save  marginL15" data-role="wsSaveBtn">确认分享</button>
	</div>
</div>
<div class="sel-kpi-ctn ws-grp-ctn hide" data-role="grpCtn">分组名</div>
