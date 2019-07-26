<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.ant-modal-body{
	    font-size: 12px;
	    line-height: 1.5;
	    min-height: 270px;
    	position: relative;
    	overflow: hidden;
   	    height: calc(100% - 80px);
	}
	.ant-modal-body.bottom #wrap2 {
		display: none;
	}
	.ant-modal-body.bottom{
		padding-top: 80px;
	}
	.ant-modal-body.top {
		padding-top: 80px;
	}
	.ant-modal-body.top #wrap1 {
		display: none;
	}
	.selected-nodes-wrap:hover{
		background: #d9e7ff !important;
	}
	.ant-modal-body .select-wrap{
		margin: 20px auto;
	    width: 100%;
	    position: relative;
	    display: flex;
	    justify-content: center;
	}
	.ant-modal-body .select-wrap .ant-input-wrapper{
		box-sizing: border-box;
	}
	.ant-input-wrapper input {
		border: 1px solid #d5ddeb;
	    border-radius: 0;
	    background: #fff;
	    color: #4c5159;
	}
	.ant-modal-body .selected-nodes-wrap{
		width: 100%;
	    height: 100px;
	    border: 1px dashed #e4e7eb;
	    background: #f2f7ff;
	    position: relative;
	    overflow: auto;
	    cursor: pointer;
	}
	.ant-modal-body .selected-nodes-wrap .notice {
		width: 100%;
	    height: 100%;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    justify-content: center;
	}
	.ant-modal-footer{
	    text-align: center;
	    border-radius: 0;
	    position: absolute;
	    height: 50px;
	    width: 100%;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	    bottom: 0;
	}
	.ant-modal-footer .ant-btn-primary{
		background-color: #4082e6;
	    border-color: #4082e6;
	    color: #fff;
	}
	.ant-btn[disabled]{
		opacity: .5;
	}
	.ant-btn[disabled]>* {
		pointer-events: none;
		box-sizing: border-box;
	}
	.ant-btn {
		height: 28px;
	    border-radius: 2px;
	    display: inline-block;
	    margin-bottom: 0;
	    font-weight: 500;
	    text-align: center;
	    vertical-align: middle;
	    -ms-touch-action: manipulation;
	    touch-action: manipulation;
	    cursor: pointer;
	    background-image: none;
	    border: 1px solid transparent;
	    white-space: nowrap;
	    line-height: 21px;
	    margin: 0 10px;
	    padding: 4px 15px;
	    outline: 0;
	    font-size: 12px;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    -webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
	    transition: all .3s cubic-bezier(.645,.045,.355,1);
	    -webkit-transform: translateZ(0);
	    transform: translateZ(0);
	    color: #666;
	    background-color: #f7f7f7;
	    border-color: #d9d9d9;
	}
	.ant-modal-footer .ant-btn-ghost{
		background-color: transparent;
	    border-color: #4082e6;
	    color: #4082e6;
	}
	.ant-btn-primary:hover, .ant-btn-primary:visited {
		background-color: #669beb;
	    border-color: #669beb;
	    color: #fff;
	}
	.ant-btn-ghost:hover{
		background-color: hsla(0,0%,100%,.2);
	    border-color: #669beb;
	    color: #4082e6;
	}
	.ant-btn:not([disabled]):hover{
		text-decoration: none;
	}
	.svg-pointer{
		height: 150px;
	    position: absolute;
	    left: 18%;
    	width: 64%;
	}
	.ant-modal-body.top .svg-pointer,
	.ant-modal-body.bottom .svg-pointer{
		top: 0;
	}
	.ant-popover{
		position: fixed;
	    top: 0;
	    left: 0;
	    z-index: 1030;
	    cursor: auto;
	    -webkit-user-select: text;
	    -moz-user-select: text;
	    -ms-user-select: text;
	    user-select: text;
	    white-space: normal;
	    font-size: 12px;
	    line-height: 1.5;
	    font-weight: 400;
	    text-align: left;	
	    padding-top: 4px;
	    box-shadow: 0 8px 8px rgba(0, 0, 0, .35);
	}
	.ant-popover-placement-bottom .ant-popover-arrow{
		left: 50%;
	    margin-left: -7px;
	    border-top-width: 0;
	    border-bottom-color: #e4e7eb;
	    top: 0;
	    border-width: 5px;
	    position: absolute;
	    display: block;
	    width: 0;
	    height: 0;
	    border-color: transparent;
	    border-style: solid;
	}
	.ant-popover-placement-bottom .ant-popover-arrow:AFTER{
		margin-left: -4px;
	    border-width: 4px;
	    content: "";
	    border-top-width: 0;
	    border-width: 4px;
	    position: absolute;
	    display: block;
	    width: 0;
	    height: 0;
	    border-color: transparent;
	    border-style: solid;
	    content: "";
	    top: -12px;
	    border-bottom-color: #FFF;
	    border-width: 6px;
	}
	.ant-popover-inner {
		min-width: 177px;
	    background-color: #fff;
	    background-clip: padding-box;
	    border: 1px solid #e4e7eb;
	    border-radius: 0;
	    box-shadow: none;
	}
	.ant-popover-inner-content{
		padding: 8px 16px;
	    color: #6c7480;
	    word-wrap: break-word;
	}
	.select-container{
	}
	.select-container .title{
		height: 38px;
		margin-bottom: 10px;
    	border-bottom: 2px solid #4082e6;
	}
	.select-container .title h2.active{
		color: #4082e6;
    	border-bottom: 2px solid #4082e6;
    	font-weight: 700;
	}
	.search-warp{
		position: relative;
		float: right!important;
	}
	.search-warp:BEFORE{
		content: "\E62D";
	    position: absolute;
	    left: 6px;
	    top: 6px;
	    padding: 0 1px;
	    z-index: 10;
	    display: inline-block;
	    font-family: iconfont!important;
	    font-size: inherit;
	    text-rendering: auto;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	    font-size: 14px;
	    color: #ced2db;
	}
	.select-container .title h2{
		font-size: 14px;
	    margin: 0;
	    line-height: 38px;
	    margin-right: 10px;
	    cursor: pointer;
	}
	.select-container .title .search-input{
		width: 170px;
		padding-left: 25px;
    	border: 1px solid #d5ddeb;
	    border-radius: 0;
	    padding: 6px 7px;
    	height: 32px;
	    background: #fff;
	    position: relative;
    	display: inline-block;
    	vertical-align: middle;
	    color: #4c5159;
	    cursor: text;
    	font-size: 12px;
    	margin: 0;
    	line-height: 1.5;
	}
	.select-container .content{
		height: 208px;
    	overflow: auto;
	}
	.select-container .content ul li{
		float: left;
	    width: 76px;
	    height: 24px;
	    line-height: 24px;
	    text-align: center;
	    background: #f3f3f3;
	    border: 1px solid #e4e7eb;
	    margin: 10px 10px 0 0;
	    border-radius: 2px;
	    cursor: pointer;
	    position: relative;
	    padding: 0;
	    margin: 0 10px 10px 0;
	    transition: all .3s linear;
	}
	.select-container .content ul li>div {
		width: 100%;
	}
	.select-container .content ul li.active{
		background: #4082e6;
    	color: #fff;
	}
	.select-container .content ul li.disabled{
		opacity: .5;
    	cursor: not-allowed;
	}
	.select-container .content ul li.rela-add{
		background-color: hsla(0,0%,100%,.2);
	    border-color: #669beb;
	    color: #4082e6;
	}
	.select-container .content ul{
		margin: 0;
	}
	.select-container .content ul li p{
		width: inherit;
    	padding: 0 2px;
    	display: block;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    position: relative;
	    box-sizing: border-box;
	}
	.select-restriction-container .content .prompt{
		margin-top: 4px;
	}
	.select-restriction-container .content .prompt .triangle-up {
		width: 0;
	    height: 0;
	    border-left: 8px solid transparent;
	    border-right: 8px solid transparent;
	    border-bottom: 8px solid #4082e6;
	    position: fixed;
	}
	.select-restriction-container .content .prompt .triangle-up:after{
		content: "";
	    width: 0;
	    height: 0;
	    border-left: 7px solid transparent;
	    border-right: 7px solid transparent;
	    border-bottom: 7px solid #fff;
	    position: absolute;
	    right: -7px;
	    top: 2px;
	}
	.select-restriction-container .content .prompt p{
		line-height: 30px;
	    color: #4082e6;
	    border-top: 1px solid #4082e6;
	    padding-top: 2px;
	}
	.selected-nodes-item{
		background-repeat: no-repeat;
	    background-size: 45px 45px;
	    background-position: center 10px;
	    position: relative;
	    cursor: pointer;
	    background-image: url(img/cmdbTopo/template.png);
	    width: 80px;
	    height: 80px;
	    text-align: center;
	    margin: 0 10px 10px 0;
	}
	.selected-nodes-content{
		height: 100%;
	    overflow-y: auto;
	    display: flex;
	    flex-wrap: wrap;
	    padding: 10px;
	    box-sizing: border-box;
	}
	.selected-nodes-content>div {
		width: 76px;
		height: 24px;
	    background: #4082e6;
	    color: #fff;
	    line-height: 24px;
	    text-align: center;
	    border: 1px solid #e4e7eb;
	    margin: 10px 10px 0 0;
	    border-radius: 2px;
	    cursor: pointer;
	    position: relative;
	    padding: 0;
	    margin: 0 10px 10px 0;
	}
	.selected-nodes-item>span {
	    display: inline-block;
	    width: 80%;
	    height: 100%;
	    position: absolute;
	    bottom: 0;
	    left: 10%;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.selected-nodes-content>div i.fa-times {
	    position: absolute;
	    right: -6px;
	    top: -6px;
	    width: 14px;
	    height: 14px;
	    line-height: 14px;
	    text-align: center;
	    background: #d65932;
	    border-radius: 50%;
	    font-size: 12px;
	    cursor: pointer;
	    display: none;
	}
	.selected-nodes-content>div:hover i.fa-times {
		display: inline-block;
	}
	.add-item-input{
		position: relative;
	}
	.add-item-input input{
		position: absolute;
	    margin: 0;
	    top: 0;
	    left: 0;
	    width: 76px;
	    border: none;
	    text-align: center;
	}
	.select-container li[data-relFlag="0"] i {
		display: none;
	}
	.select-container li[data-relFlag="1"] i {
		display: none;
	}
	.select-container li[data-relFlag="0"]:HOVER i {
		display: inline-block;
	    position: absolute;
	    right: 2px;
	    top: 6px;
	}
	.select-container li[data-relFlag="1"]:HOVER i {
		display: none;
	}
	.close-show-detail{
		display: inline-block;
	    width: 20px;
	    height: 20px;
	    line-height: 20px;
	    text-align: center;
	    transition: all .3s linear;
	    cursor: pointer;
	    font-weight: 700;
	    background: #ccc;
	}
	.close-show-detail:HOVER{
		background: red;
		color: #FFF;
	}
	.add-item-opearte{
		position: absolute;
	    top: 0;
	    left: 65px;
	}
	/* 
	日志平台新增 start*/
	#containerRelaEdit .selected-wrap {
		position: relative;
	    margin-top: 20px;
    	border: solid 1px #eee;
	}
	#containerRelaEdit .selected-title {
	    border-bottom: solid 1px #eee;
	    line-height: 30px;
	    text-indent: 10px;
	    background: #f2f7ff;
	}
	#containerRelaEdit .selected-content {
	    padding: 10px 20px;
	    min-height: 340px;
	    max-height: 340px;
	    overflow: hidden auto;
	}
	#containerRelaEdit .selected-operate {
	    position: absolute;
	    top: 3px;
	    right: 20px;
	}
	#containerRelaEdit .search-wrap {
		position: relative;
	}
	#containerRelaEdit .search-wrap>i {
	    position: absolute;
	    left: 5px;
	    top: 0px;
	}
	#containerRelaEdit .search-wrap>input {
		width: 160px;
	    text-indent: 15px;
	}
	.selected-head {
	    font-size: 0;
	}
	.selected-head>span {
	   background: #f5f6fa;
	}
	.selected-head>span,
	.selected-list>li>span {
		display: inline-block;
	    height: 30px;
	    line-height: 30px;
	    text-align: center;
		width: 20%;
		font-size: 12px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.selected-head>span:nth-child(1),
	.selected-head>span:nth-child(4),
	.selected-list>li>span:nth-child(1),
	.selected-list>li>span:nth-child(4) {
		width: 10%;
	}
	.selected-list>li>span:nth-child(1) {
	    text-align: left;
    	text-indent: 5px;
	}
	.selected-list>li>span i.fa{
	    color: #4082e6;
	}
	.selected-head>span:nth-child(2),
	.selected-list>li>span:nth-child(2) {
		width: 30%;
	}
	.selected-head>span:nth-child(3),
	.selected-list>li>span:nth-child(3) {
		width: 50%;
	}
	.selected-list {
		margin: 0;
	}
	.selected-list>li {
	    font-size: 0;
    	height: 30px;
	}
	.selected-list>li:nth-child(2n) {
	    background: #f5f6fa;
	}
	.selected-list>li.active {
	    background: #c2d0dc;
	}
	.selected-list>li span.obj-name {
	    color: #2196F3;
	    text-decoration: underline;
	    cursor: pointer;
	}
	.selected-list>li>span:nth-child(2) {
	    position: relative;
	    overflow: visible;
	    vertical-align: 10px;
	}
	.selected-list .baseinfo-wrap {
        position: absolute;
	    top: 23px;
	    left: 0;
	    width: 550px;
	    display: flex;
	    flex-wrap: wrap;
	    background: #e0e6ea;
	    /* border: solid 1px #bbb; */
	    /* transform: translateX(-50%); */
	    z-index: 2;
	    margin: 0;
	    padding: 5px 8px;
	}
	.selected-list .baseinfo-wrap>li {
		width: 50%;
	}
	.selected-list .baseinfo-wrap>li {
	    width: 50%;
	    height: 36px;
	    line-height: 36px;
	    border: solid 1px #bfbaba;
	    border-top: none;
	    box-sizing: border-box;
	}
	.selected-list .baseinfo-wrap>li:nth-child(1),
	.selected-list .baseinfo-wrap>li:nth-child(2) {
		border-top: solid 1px #bfbaba;
	}
	.selected-list .baseinfo-wrap>li:nth-child(2n) {
		border-left: none;
	}
	.selected-list .baseinfo-wrap .label-text {
	    display: inline-block;
	    width: 40%;
	    height: 100%;
	    background: #fafafc;
	    border-right: solid 1px #bfbaba;
	    text-indent: 10px;
	    box-sizing: border-box;
	}
	.selected-list .baseinfo-wrap .value-text {
		display: inline-block;
	    width: 60%;
	    height: 100%;
	    text-indent: 10px;   
	}
	/* 
	日志平台新增 end*/
</style>
<div id="containerRelaEdit">
	<div class="ant-modal-body top">
		<div class="svg-pointer" id="svgPointer">
			
		</div>
		<div class="container-rela" style="margin: 65px auto 0;">
			<div>
				<div class="selected-nodes-wrap" id="wrap1">
					<div class="notice">
						<p>请选择<span class="current-modal-text">模板</span></p>
					</div>
					<div class="selected-nodes-content" style="display: none;">
						<div class="selected-nodes-item"><span class="text-no-wrap">名称</span></div>
						<div class="selected-nodes-item"><span class="text-no-wrap">名称</span></div>
					</div>
				</div>
				<div>
					<!-- <div class="select-wrap">
						<span class="ant-input-wrapper no-delete-input">
							<input type="text" id="typeRela" class="ant-input text-center no-delete-input" placeholder="请选择关系类型" style="width: 140px;">
						</span>
					</div>
					<div class="select-wrap">
						<span class="ant-input-wrapper no-delete-input">
							<input type="text" id="typeRelaRule" class="ant-input text-center no-delete-input" placeholder="请选择限制条件" style="width: 140px;">
						</span>
					</div> -->
				</div>
				<div class="selected-nodes-wrap" id="wrap2">
					<div class="notice">
						<p>请选择<span class="current-modal-text">模板</span></p>
					</div>
					<div class="selected-nodes-content" style="display: none;">
						<div class="selected-nodes-item"><span class="text-no-wrap">名称</span></div>
						<div class="selected-nodes-item"><span class="text-no-wrap">名称</span></div>
					</div>
				</div>
			</div>
		</div>
		<div class="selected-wrap">
			<p class="selected-title">对象列表
				<span>
					已选: <span class="selected-num">0</span>
					可选: <span class="total-num">0</span>
				</span>
			</p>
			<div class="selected-content">
				<div class="selected-operate">
					<span class="search-wrap"><i class="fa fa-search"></i><input type="text" id="obj_search"/></span>
				</div>
				<div class="selected-head">
					<span style="width: 10%;"><i class="fa fa-square-o" id="select_all" style="margin-right: 5px;"></i>全选</span>
					<span style="width: 30%;">对象名称</span>
					<span style="width: 50%;">所属分类</span>
					<span style="width: 10%;">关系类型</span>
				</div>
				<ul class="selected-list">

				</ul>
			</div>
			
		</div>
		<div class="ant-modal-footer">
			<button type="button" class="ant-btn ant-btn-primary" id="add_confrim" disabled>
				<span>确 定</span>
			</button>
			<button type="button" class="ant-btn ant-btn-ghost" id="cancel_btn" style="right: 34%;">
				<span>取 消</span>
			</button>
		</div>
	</div>
	
	<div style="position: absolute; top: 0px; left: 0px; width: 100%;">
		<div data-reactroot="">
			<div id="showDetail" class="ant-popover ant-popover-placement-bottom" style="display: none;">
				<div class="ant-popover-content">
					<div class="ant-popover-arrow"></div>
					<div class="ant-popover-inner">
						<div>
							<div class="ant-popover-inner-content">
								<div class="select-container">
									<div class="title">
										<h2 class="pull-left active"><span class="current-modal-text">模板</span></h2>
										<div class="pull-right search-warp">
											<span class="ant-input-wrapper">
												<input type="text" placeholder="请输入要查询的关键字" class="ant-input ant-input-lg search-input">
											</span>
											<span class="close-show-detail">x</span>
										</div>
									</div>
									<div class="content">
										<ul>
											<li title="123131313" class="" style="margin-right: 10px;">
												<div>
													<p class="trancate">123131313</p>
													<span class="unchecked">
														<i class="iconfont icon-checked"> </i>
													</span>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div style="position: absolute; top: 0px; left: 0px; width: 100%;">
		<div data-reactroot="">
			<div id="showRelaType" class="ant-popover ant-popover-placement-bottom" style="display: none;">
				<div class="ant-popover-content">
					<div class="ant-popover-arrow"></div>
					<div class="ant-popover-inner">
						<div>
							<div class="ant-popover-inner-content">
								<div class="select-container">
									<div class="title" id="relaType">
										<h2 class="pull-left" data-type="1">系统关系类型</h2>
										<h2 class="pull-left" data-type="0">自定义关系类型</h2>
										<div class="pull-right search-warp">
											<span class="ant-input-wrapper">
												<input type="text" placeholder="请输入要查询的关键字" class="ant-input ant-input-lg search-input">
											</span>
										</div>
									</div>
									<div class="content" id="content1" style="display: none;">
										<ul>
											<li title="123131313" class="" style="margin-right: 10px;">
												<div>
													<p class="trancate">123131313</p>
													<span class="unchecked">
														<i class="iconfont icon-checked"> </i>
													</span>
												</div>
											</li>
										</ul>
									</div>
									<div class="content" id="content2" style="display: none;">
										<ul>
											<li title="新增" class="rela-add" style="margin-right: 10px;">
												<div class="rela-add">
													<p class="trancate"><i class="fa fa-plus"></i>&nbsp;&nbsp;新增</p>
												</div>
											</li>
											<li title="123131313" class="" style="margin-right: 10px;">
												<div>
													<p class="trancate">123131313</p>
													<span class="unchecked">
														<i class="iconfont icon-checked"> </i>
													</span>
												</div>
											</li>
											<li title="add-item" class="rela-add" style="margin-right: 10px;">
												<div class="add-item-input">
													<p class="trancate">新增关系</p>
													<input type="text" value="关系新增"  onfocus="this.select()"/>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	
	<div style="position: absolute; top: 0px; left: 0px; width: 100%;">
		<div data-reactroot="">
			<div id="showRelaTypeRule" class="ant-popover ant-popover-placement-bottom select-restriction-container" style="display: none;">
				<div class="ant-popover-content">
					<div class="ant-popover-arrow"></div>
					<div class="ant-popover-inner">
						<div>
							<div class="ant-popover-inner-content">
								<div class="select-container">
									<div class="content">
										<ul class="clearfix">
											<li data-id="0" title="1 : 1" class="selected" style="margin-right: 10px;">
												<div>
													<p class="trancate">1 : 1</p>
													<span class="checked">
														<i class="iconfont icon-checked"> </i>
													</span>
												</div>
												<span class="hide">应用该模板的类型下的1个配置与应用其他模板下的类型的1个配置建立关系</span>
											</li>
											<li data-id="1" title="1 : N" class="selected" style="margin-right: 10px;">
												<div>
													<p class="trancate">1 : N</p>
													<span class="checked">
														<i class="iconfont icon-checked"> </i>
													</span>
												</div>
												<span class="hide">应用该模板的类型下的1个配置与应用其他模板下的类型的N个配置建立关系</span>
											</li>
											<li data-id="2" title="N : 1" class="selected" style="margin-right: 10px;">
												<div>
													<p class="trancate">N : 1</p>
													<span class="checked">
														<i class="iconfont icon-checked"> </i>
													</span>
												</div>
												<span class="hide">应用该模板的类型下的N个配置与应用其他模板下的类型的1个配置建立关系</span>
											</li>
											<li data-id="3" title="N : N" class="selected" style="margin-right: 10px;">
												<div>
													<p class="trancate">N : N</p>
													<span class="checked">
														<i class="iconfont icon-checked"> </i>
													</span>
												</div>
												<span class="hide">应用该模板的类型下的N个配置与应用其他模板下的类型的N个配置建立关系</span>
											</li>
										</ul>
										<div class="prompt" style="display: none;">
											<div class="triangle-up" id="triangleUp"> </div>
											<p id="infoNNN">应用该模板的类型下的1个配置与应用其他模板下的类型的1个配置建立关系</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
