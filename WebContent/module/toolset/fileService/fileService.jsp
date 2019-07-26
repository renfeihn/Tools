<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.fileServicePanel{
	margin-top:20px;
	overflow:hidden;
}
.fileServicePanel .configTop{
	display:grid;
	grid-template-columns: 49% 49%;
	column-gap:2%;
}
.fl{
	float:left;
}
.fr{
	float:right;
}
.fileServicePanel .flieLeft{
	margin-left:20px;
	
}
.fileServicePanel .flieRight{
	margin-right:20px;
}
.fileServicePanel .fa-circle.greenDot{
	color:green;
}
.fileServicePanel .fa-circle.redDot{
	color:red;
}

.fileServicePanel .fa-cog.fa-spin{
	color:green;
}
.fileServicePanel .sureBtn{
	width: 66px;
	height: 32px;
	line-height: 32px;
	text-align: center;
	background-color: #60c33f;
	color:#fff;
	font-size: 14px;
}
.fileServicePanel .sureBtn:hover{
	
	background-color: #008000;
}
.fileServicePanel .PreviewModal-dirList{
	width: 100%;
	-moz-user-select:none;/*火狐*/
    -webkit-user-select:none;/*webkit浏览器*/
    -ms-user-select:none;/*IE10*/
    -khtml-user-select:none;/*早期浏览器*/
      user-select:none;
/* 	overflow-y: auto; */
	margin: 0;
	cursor: pointer;
}
.fileServicePanel #tabs1{
	overflow:hidden;
}
.fileServicePanel .resourceList,
.fileServicePanel .aimList{
	overflow-y: auto;
	overflow-x:hidden;
}
.fileServicePanel .aimList,
.fileServicePanel .resourceList{
	height: 340px;
}
.fileServicePanel  ul.PreviewModal-dirList{
	margin-left: 20px;
    position: relative;
}
.fileServicePanel .PreviewModal-dirList span>i {
	color: var(--color-theme);
}
.fileServicePanel .PreviewModal-dirList span{
    width: 100%;
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 27px;
    line-height: 27px;
    text-align: left;
    padding: 0;
}
.fileServicePanel .PreviewModal-dirList li{
	position: relative;
	margin-left: 20px;
	border-bottom: 1px solid #E3E3E7;
	border-top: none;
	overflow-x:hidden;
}
.fileServicePanel .PreviewModal-dirList li.active>span {
    background: rgba(91, 98, 246,.7);
    color: #fff;
}
.fileServicePanel .PreviewModal-dirList li.clickActive>span {
    border:1px dashed #ccc;
    
}
.fileServicePanel .PreviewModal-dirList li.active i{
	color: blue;
} 
.fileServicePanel .PreviewModal-dirList ul:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #E3E3E7;
}
.fileServicePanel .linkSource,
.fileServicePanel .chooseConfig,
.fileServicePanel .linkAim,
.fileServicePanel .chooseConfigAim{
	float:right;
	margin-right:20px;
	padding:0 12px;
	text-align:center;
	height:36px;
	line-height:36px;
	background:#55a8fd;
	border:none;
	color:#fff;
	border-radius:5px;
}
.fileServicePanel .nav.nav-tabs.nav-public>li>a{
	border-top:1px solid #ebebed;
	border-left:1px solid #ebebed;
}
.fileServicePanel .nav.nav-tabs.nav-public>li.active>a{
	
	color:#55a8fd;
	
}
.fileServicePanel .nav.nav-tabs.nav-public{
	background:#fff;
}
.fileServicePanel  .modal{
	width:1000px;
	top:100px;
	
}
.fileServicePanel .modal-body{
	max-height:600px;
}
.fileServicePanel .uploadBtn,
.fileServicePanel .selectfileBtn{
	position:absolute;
	
	width:100px;
	text-align:center;
	height:36px;
	line-height:36px;
	background:#55a8fd;
	border:none;
	color:#fff;
	border-radius:5px;
	
}
.fileServicePanel .flieLeft #tabs2{
	height:500px;
}
.fileServicePanel .uploadBtn{
	top:350px;
	left:50%;
	margin-left:-50px;
	cursor:not-allowed;
}
.fileServicePanel .selectfileBtn{
	left:63px;
}
 .fileServicePanel .selectfile {
            position: relative;
            display: inline-block;
            background: #55a8fd;
            border-radius: 5px;
            text-align:center;
            overflow: hidden;
            color: #fff;
            text-decoration: none;
            text-indent: 0;
            line-height: 36px;
            width:100px;
            height:36px;
            left:63px;
        }

       .fileServicePanel .selectfile input {
            position: absolute;
            font-size: 100px;
            right: 0;
            top: 0;
            opacity: 0;
        }

       .fileServicePanel .selectfile:hover {
            background: #AADFFD;
            color: #fff;
            text-decoration: none;
        }
         .fileServicePanel .uploadBox{
         	position:absolute;
         	left:50%;
         	margin-left:-100px;
         	top:100px;
         	border:2px dashed #ccc;
         	height:200px;
         	width:200px;
         	text-align:center;
         	line-height:244px;
         	cursor:pointer;
         	
         }
          .fileServicePanel .sourceInfoBox,
          .fileServicePanel .aimInfoBox{
          	height:22px;
          	line-height:22px;
          	padding:0 10px;
          	position:relative;
          	
          }
          .fileServicePanel .sourceInfoBox.active,
          .fileServicePanel .aimInfoBox.active{
          	background:#999;
          	color:#fff;
          	border-radius:5px;
          }
          .fileServicePanel .fa-times{
          	position:absolute;
          	right:-5px;
          	top:-5px;
          	color:#000;
          	display:none;
          }
          .fileServicePanel .fa-times.active{
          	position:absolute;
          	right:-5px;
          	top:-5px;
          	color:#000;
          	display:block;
          }
          .fileServicePanel .configBottom{
          	height:200px;
          	max-height:200px;
          	margin: 0 20px;
          	border-radius:5px;
          	border:1px solid #ebebed;
          }
         /*  #infoTable th{
          	text-align:center;
          }  */
          .fileServicePanel .flieLeft .content,
          .fileServicePanel .flieRight .content,
          .fileServicePanel #tabs1{
          	padding-bottom:0 !important;
          }
          .fileServicePanel #tabs1 {
          	
          }
          
</style>
<div class="fileServicePanel">
	<!-- 弹窗 -->
	<div id="configListModal" class="modal hide" data-backdrop="false" aria-hidden="true" tabindex="-1">
		<div class="modal-header">
			<button class="close closeListModal" type="button" >×</button>
			<h3 id="myModalLabel">配置信息</h3>
		</div>
		<div class="modal-body">
			<table id="agmTb" class="display dataTable table">
				<thead>
					<tr>
						<th width="5%"></th>
						<th width="15%">主机名</th>
						<th width="10%">操作系统</th>
						<th width="10%">IP</th>
						<th width="10%">代理状态</th>
						<th width="10%">ping连通性</th>
						<th width="10%">代理安装用户</th>
						<th width="10%">协议</th>
						<th width="10%">端口</th>
					</tr>
				</thead>
				<tbody id="agmTbody"></tbody>
			</table>
		</div>
		<div class="modal-footer">
			<button type="button"  class="cancelBtn closeListModal">关闭</button>
			<button type="button"  class="sureBtn">确认</button>
		</div>
	</div>
	<div class="configTop">
		<!-- 源服务器 -->
		<section class="panel flieLeft">
			<p class="title">源服务器信息</p>
			<div class="content">
				<ul class="nav nav-tabs nav-public">
					<li id="li1" class="active"><a href="#tabs1" data-toggle="tab">源服务器</a></li>
					<li id="li2"><a href="#tabs2" data-toggle="tab">本地文件</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabs1" class="tab-pane active">
						<div style="padding-bottom:20px;border-bottom:1px dashed #ccc;height:34px;">
							<span class='fl'>配置信息：</span>
							<p class="sourceInfoBox fl"><span class="sourceInfoName">--</span><i class="fa fa-times" aria-hidden="true" ></i></p>
							<!-- 连接按钮勿删 -->
							<button type="button" class='linkSource' style="opacity:0;width:0;margin:0;padding:0;">连接</button>
							<button class="chooseConfig" type="button">选择源服务器</button>
						</div>
						<div style="padding:20px 0;">
							<p class="pList">目录列表 <i class="fa fa-list" aria-hidden="true"></i><span style="margin-left:20px;" class="sourcePath"></span></p>
							<div class="resourceList">
								<!-- 目录列表 -->
							</div>
						</div>
					</div>
					<div id="tabs2" class="tab-pane">
	
						<form action="" id="uploadform" style="position:relative;">
							
							
						    <input type="file" name="file" id="file" style="display:none;" class="sourceUpload fl">
						   
						   	<p class="filename" style="width:100%;text-align:center;position:absolute;left:0;top:310px;">请选择</p>
							<div class="uploadBox" style="">
								<i class="fa fa-plus-circle" aria-hidden="true" style="font-size:80px;color:#ccc;"></i>
							</div>
							<button type="button" class="uploadBtn fl" disabled="disabled">上传</span>
	
						</form>
	
					</div>
					
				</div>
			</div>
		</section>
		
		<!-- 目标服务器 -->
		<section class="panel flieRight">
			<p class="title"><span class="fl">目标服务器信息</span></p>
			<div class="content">
				<ul class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs1" data-toggle="tab">目标服务器</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabs1" class="tab-pane active">
						<div style="padding:0 20px 20px 20px;border-bottom:1px dashed #ccc;height:34px;">
							<span class="fl">配置信息：</span>
							<p class="aimInfoBox fl"><span class="aimInfoName">--</span><i class="fa fa-times" aria-hidden="true" ></i></p>
							<!-- 连接按钮勿删 -->
							<button type="button" class='linkAim' style="opacity:0;width:0;margin:0;padding:0;">连接</button>
							<button class="chooseConfigAim" type="button">选择目标服务器</button>
						</div>
						<div style="padding:20px;">
							<p class="pList">目录列表 <i class="fa fa-list" aria-hidden="true"></i><span style="margin-left:20px;" class="aimPath"></span>
							</p>
							<div class="aimList"></div>
						</div>
					</div>
				</div>
				
			</div>
		</section>
	</div>
	<div class="configBottom" style="overflow:auto;">
		<table id="infoTable" class="display dataTable table">
				<thead>
					<tr>
						<th width="10%"></th>
						<th width="10%">文件名</th>
						<th width="20%">源路径</th>
						<th width="20%">目标路径</th>
						<th width="15%">上传时间(s)</th>
						<th width="10%">状态</th>
						<th width="15%">耗时(s)</th>
					</tr>
				</thead>
				
				<tbody id="infoTbody" style="overflow:auto;height:160px;"></tbody>
			</table>
	</div>
</div>







