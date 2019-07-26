<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%-- 页面前缀agm --%>
<style>
.agm-red-icon {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-right: 5px;
    position: relative;
    top: -2px;
    background: #ff3341;
}
.agm-green-icon{
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-right: 5px;
    position: relative;
    top: -2px;
    background: #0Bc048;
}
.agm-yellow-icon {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-right: 5px;
    position: relative;
    top: -2px;
    background: #FEA701;
}
.agm-hand {
    cursor: pointer;
    color: var(--color-theme);
    position: relative;
    left: 5px;
}
.agm-hand:hover {
    color: #b3b7ff;	
}
.agm-ctt>section {
	float: left;
}
.agm-ctt .dataTables_filter {
    position: absolute;
    top: -75px;
    right: -20px;
}
@media only screen and (min-width:1550px){
	top:-35px;
	right: 0;
}
.agm-agent-ctt {
    float: left;
    width: 102px;
    margin: 0 10px 10px 0;
    border: 1px solid var(--color-theme);
    border-radius: 4px;
    padding: 1px 10px;
    color: var(--color-theme);
    position: relative;
    cursor: pointer;
}
.agm-agent-ctt>i {
    position: absolute;
    right: 8px;
    top: 6px;
}
.spinner {
    position: absolute;
    width: 30px;
    height: 20px;
    text-align: center;
    font-size: 10px;
    right: 0;
    top: 2px;
}
 
.spinner > div {
    background-color: var(--color-theme);
    height: 100%;
    width: 3px;
    display: inline-block;
    margin-right: 3px;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
}
 
.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}
 
.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}
 
@-webkit-keyframes stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
  20% { -webkit-transform: scaleY(1.0) }
}
 
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
.spinner.agm-stop>div{
    height: 50%;
    -webkit-animation: none;
    animation: none;
}
.agm-oper-ctt {
    position: absolute;
    top: 10px;
    right: 20px;
}
.agm-oper-ctt>span {
    color: var(--color-theme);
    text-decoration: underline;
    cursor: pointer;
}
.agm-oper-btns {
	position: absolute;
    padding: 10px 0 10px 10px;
    width: 204px;
    height: 135px;
    right: -2px;
    top: 18px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    background: rgba(43, 45, 103, 0.25);
    z-index: 99;
}
.agm-btn {
	float: left;
    position: relative;
    margin: 0 10px 10px 0;
    width: 48px;
    text-align: center;
    font-size: 12px;
    padding: 3px 5px;
    background: var(--color-theme);
    border-radius: 4px;
    color: #FFF;
    cursor: pointer;
}
.agm-btn.agm-disalbe {
	cursor: default;
    background: #AEADB3;
}
span.agm-disable {
	color: #CCC;
	cursor: default;
}
.agm-sels>span {
	display: inline-block;
	margin-bottom: 10px;
	margin-top:5px;
}
.agm-sels>span>select ,.agm-sels>span>input{
    position: relative;
    width: 120px;
    margin: 0 10px 0 8px;
}
.requiredTipRed{
	color:red;
}

.agm-protocol{
	width:206px;
}

.agm-ctt #modalFile input[type=radio]{
	width: 50px;
    margin: 0;
    vertical-align: middle;
    position: relative;
    top: -2px;
}
.agm-tabs{
	display: flex;
	justify-content: space-around;
	align-items: flex-start;
	background: #eee;
    padding: 4px 15px;
}

.agm-tabs>span{
	width: 50%;
	display: inline-block;
}

.agm-tabsContent>div{
	height: 150px;
	overflow: auto;
	padding-top: 10px;
	box-sizing: border-box;
}

.agm-localContent{
	display: block;
}

.agm-serverContent{
	display: none;
}
.agm-fileInfo{
	height: 80px;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
}

.agm-fileInfo>div>span{
	line-height: 24px;
	display: inline-block;
}
.agm-serverContent>div{
   padding: 2px 10px;
   line-height: 26px;
}
.agm-serverContent>div>span{
	display: inline-block;
	text-align: left;
}
.agm-serverContent>div>span:nth-child(1){
    width:80px;
    text-align: center;
}
.agm-serverContent>div>span:nth-child(2){
    width:35%;
}
.agm-serverContent>div>span:nth-child(3){
    width:25%;
}
.agm-serverContent>div>span:nth-child(4){
    width:25%;
}

.agm-addFile{
    margin: 0 50px 0 100px;
    width: 100px;
    height: 100px;
    flex: none;
    background: #f9f9fb url(img/eventDetails/add.png) center 70% no-repeat;
    cursor: pointer;
    background-size: 46%;
    border: 1px solid #eee;
    position: relative;
}
.agm-addFile:before{
    content: "点击选择文件";
    position: absolute;
    top: 2px;
    left: auto;
    display: inline-block;
    width: 100%;
    text-align: center;
    color: #adadad;
}
#agmOptionInfo>ul{
	margin: 0;
}

/*#agmOptionInfo>ul:first-child>li:first-child{
	border: 1px solid #e0dfe6;
	border-left: none;
	border-right: none;
}*/

#agmOptionInfo>ul>li{
    line-height: 24px;
	padding: 3px 0;
}
#agmOptionInfo>ul>li>span{
	display: inline-block;
	width:25%;
	padding: 0 5px;
	vertical-align: middle;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
#agmOptionInfo>ul>li>span:last-child>span{
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	white-space:normal;
}

#agmOptionInfo>ul>li>span:nth-child(1){
	width: 25%;
}
#agmOptionInfo>ul>li>span:nth-child(2){
	width: 18%;
}
#agmOptionInfo>ul>li>span:nth-child(3){
	width: 12%;
}
#agmOptionInfo>ul>li>span:nth-child(4){
	width: 35%;
}

#agmTb_filter{
	display: none;
}
#agmOptionInfoList>li>span.age-red{
	color: #ff3341;
}

#agmOptionInfoList>li>span.age-red:before{
	background: #ff3341;
}

#agmOptionInfoList>li>span.age-green:before{
	background: #0Bc048;
}

#agmOptionInfoList>li>span.age-green{
	color: #0Bc048;
}

#agmOptionInfoList>li>span:nth-child(3):before{
	content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-right: 5px;
    position: relative;
    top: -2px;
    
}
#agmOptionInfoList>li>div{
	width: 95%;
	margin: 0 auto;
	margin-bottom: 20px;
	border:1px solid #e3e3e3;
}
#agmOptionInfoList>li>div ul{
	margin: 0;
	padding: 0 10px;
}

.agmOptionInfoList-ul>li:first-child{
	border: 1px solid #e3e3e3;
	border-left: none;
	border-right: none;
}

#agmOptionInfoList>li>div ul>li{
	line-height: 24px;
	padding: 2px 10px;
}
#agmOptionInfoList>li>div li>span{
	display: inline-block;
}

#agmOptionInfoList>li>div li>span{
	display: inline-block;
	width:25%;
	/*padding: 0 5px;*/
	vertical-align: middle;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
#agmOptionInfoList>li>div li>span:last-child>span{
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
	white-space:normal;
}

#agmOptionInfoList>li>div li>span:nth-child(1){
	width: 27%;
}
#agmOptionInfoList>li>div li>span:nth-child(2){
	width: 21%;
}
#agmOptionInfoList>li>div li>span:nth-child(3){
	width: 52%;
}
#agmOptionInfoList>li>div>p{
	 text-align: center;
	 background: #e3e3e3;
	 font-size: 14px;
	 padding: 5px;
}
#agmOptionInfoList>li>div>p>span{
	display: inline-block;
	margin-left: 10px;
	width:210px;
	text-align: left;
}

#agmOptionInfoList>li>div li>span.age-red{
	color: #ff3341;
}

#agmOptionInfoList>li>div li>span.age-red:before{
	background: #ff3341;
}

#agmOptionInfoList>li>div li>span.age-green:before{
	background: #0Bc048;
}

#agmOptionInfoList>li>div li>span.age-green{
	color: #0Bc048;
}

#agmOptionInfoList>li>div li>span:nth-child(2):before{
	content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-right: 5px;
    position: relative;
    top: -2px;
}
#agmTb.dataTable thead th, #agmTb.dataTable thead td{
	padding-right: 15px;
}
#modalForm.form-horizontal .control-label {
	width: 100px;
}
#modalForm.form-horizontal .controls {
	margin-left: 120px;
}
.modal-info {
    position: absolute;
    top: 8px;
    left: 107px;
    display: flex;
    height: 22px;
    font-size: 12px;
}
.modal-info>p {
	margin: 0 20px 0 0;
}
.modal-info>p>span:nth-child(1) {
	margin: 0 5px 0 0;
}
.modal-btns {
	margin: 10px 0;
}
.modal-title {
	margin-top: -10px;
}
</style>
<div class="agm-ctt content" style="display: flex;"><!-- height: 700px; -->
	<section class="panel" style="width:calc(100% - 474px);margin-right: 20px; overflow: auto;">
		<p class="title">代理列表</p>
		<div class="content">
			<div class="agm-sels">
				<span>系统类型：<select data-name="os_type"></select></span>
				<span>代理状态：<select data-name="agent_status"><option value="all">全部</option><option value="1">已启动</option><option value="0">未启动</option><option value="2">挂起</option></select></span>
				<span>ping连通性：<select data-name="ping_status"><option value="all">全部</option><option value="1">TRUE</option><option value="0">FALSE</option></select></span>
				<!--<span>telnet连通性：<select data-name="telnet_status"><option value="all">全部</option><option value="1">TRUE</option><option value="0">FALSE</option></select></span>-->
				<!--<span>代理用户状态：<select data-name="agent_user_status"><option value="all">全部</option><option value="1">TRUE</option><option value="0">FALSE</option></select></span>-->
			    <span>IP：<input type="text" data-name='agent-searchIp'/></span>
				<span>
					<button data-name="addNewAgent" type="button">新增</button>
				    <button id="editBtn" class="disabled" data-name="editAgent" type="button">修改</button>
				    <button id="delBtn" class="disabled" data-name="deleteAgent" type="button">删除</button>
				    <button id="watchBtn" class="disabled" data-name="monitorAgent" type="button">监控</button>
				    <button id="alertBtn" class="disabled" data-name="" type="button">采集告警</button>
				</span>
			    <!--<span><button id="uploadFile" data-name="uploadFile" type="button" >上传文件</button></span>-->
			</div>
			<table id="agmTb" class="display dataTable table">
				<thead>
					<tr>
						<th width="3%"><input id="agmSelAll" type="checkbox"/></th>
						<th width="20%">主机名</th>
						<th width="12%">操作系统</th>
						<th width="10%">IP</th>
						<th width="8%">代理状态</th>
						<th width="5%">ping连通性</th>
						<!--<th width="3%">telnet连通性</th>
						<th width="3%">代理用户检测</th>-->
						<th width="10%">代理安装用户</th>
						<th width="5%">协议</th>
						<th width="3%">端口</th>
						<th>最后更新文件名</th>
						<th>最后更新文件大小</th>
						<th>最后更新文件编号</th>
						<th>最后更新时间</th>
					</tr>
				</thead>
				<tbody id="agmTbody"></tbody>
			</table>
		</div>
	</section>
	<div>
		<section class="panel" style="width: 450px;position: relative; margin-bottom: 20px;">
			<p class="title">代理检测</p>
			<div class="agm-oper-ctt"><span id="agmClear" style="margin-right: 10px">重置操作</span><span id="agmOp">操作</span>
				<div class="agm-oper-btns hide">
					<div id="agmPing" class="agm-btn">PING</div>
					<!--<div id="agmTel" class="agm-btn">Telnet</div>-->
					<!--<div id="agmUser" class="agm-btn">用户检测</div>-->
					<div id="agmIns" class="agm-btn">代理安装</div>
					<div id="agmStatus" class="agm-btn">状态检测</div>
					<div id="agmSta" class="agm-btn">唤醒代理</div>
					<div id="agmStop" class="agm-btn">挂起代理</div>
					<div id="agmShutdown" class="agm-btn">代理停止</div>
					<div id="agmUpdt" class="agm-btn">代理更新</div>
					<div id="agmRestart" class="agm-btn">重启代理</div>
				</div>
			</div>
			<div id="agmAgentCtt" class="content" style="height: 175px;overflow: auto">
			</div>
		</section>
		
		<section class="panel" style="width: 450px;position: relative;">
			<p class="title">代理操作信息</p>
			<div id="agmOptionInfo" class="content" style="height: 370px;overflow: hidden">
				<!--<ul>
					<li><span>Ip</span><span>操作</span><span>状态</span><span>返回信息</span></li>
				</ul>-->
				<ul style="height: 320px;overflow: auto" id="agmOptionInfoList" >
					<!--<li>
						<div>
							<p>操作:<span>状态检测</span></p>
							<ul class="agmOptionInfoList-ul">
								<li ><span>Ip</span><span>状态</span><span>返回信息</span></li>
							</ul>
							<ul>
				                <li><span>10.8.220.203</span><span>成功</span><span>挂起代理成功</span></li>
				                <li><span>10.8.220.203</span><span>成功</span><span>挂起代理成功</span></li>
				                <li><span>10.8.220.203</span><span>成功</span><span>挂起代理成功</span></li>
				                <li><span>10.8.220.203</span><span>成功</span><span>挂起代理成功</span></li>
				                <li><span>10.8.220.203</span><span>成功</span><span>挂起代理成功</span></li>
				                <li><span>10.8.220.203</span><span>成功</span><span>挂起代理成功</span></li>
				                <li><span>10.8.220.203</span><span>成功</span><span>挂起代理成功</span></li>
							</ul>
						</div>
					</li>-->
					
				    <!--<li><span>10.8.220.203</span><span>状态检测</span><span>成功</span><span>挂起代理成功</span></li>
				    <li><span>10.8.220.203</span><span>状态检测</span><span>成功</span><span>挂起代理成功</span></li>
				    <li><span>10.8.220.203</span><span>状态检测</span><span>成功</span><span>挂起代理成功</span></li>
				    <li><span>10.8.220.203</span><span>状态检测</span><span>成功</span><span>挂起代理成功</span></li>
				    <li><span>10.8.220.203</span><span>状态检测</span><span>成功</span><span>挂起代理成功</span></li>-->
				</ul>
			</div>
		</section>
	</div>
</div>
<div id="modal" tabindex="-1" class="modal fade hide" data-backdrop="false" aria-hidden="true" style="width:550px;">
	<div class="modal-header">
		<button class="close" id="close-modal" type="button" data-dismiss="modal">&times;</button>
		<h3>新增</h3>
	</div>
	<div class="modal-body" style="max-height:550px">
		<form class="form-min form-horizontal" id="modalForm" >
			<div class="control-group" >
				<label for="ip" class="control-label required" autocomplete="off">IP</label>
				<div class="controls">
					<input type="text" required name="ip" id="ip"/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="" class="control-label required">主机名</label>
				<div class="controls">
					<input type="text" required name="host_name" id="host_name" readonly="readonly" placeholder="根据ip回显"/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide help-tip-urlConfig"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="os_type" class="control-label required">操作系统</label>
				<div class="controls">
					<input type="text"  required name="os_type" id="os_type" readonly="readonly" placeholder="根据ip回显"/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide help-tip-urlConfig"></span>
				</div>
			</div>
			
			<div class="control-group" >
				<label for="install_user" class="control-label required">代理安装用户</label>
				<div class="controls">
					<input type="text"  required name="install_user" id="install_user" autocomplete="off" placeholder=""/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group" >
				<label for="agent_user_pwd" class="control-label required">用户密码</label>
				<div class="controls">
					<input type="text"  required name="agent_user_pwd" id="agent_user_pwd" autocomplete="off" placeholder=""/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide"></span>
				</div>
			</div>
			<div class="control-group" >
				<label for="protocol" class="control-label required">协议</label>
				<div class="controls">
					<select class="agm-protocol" name="protocol" id="protocol">
						<option value="ssh">ssh</option>
						<option value="telnet">telnet</option>
					</select>
				</div>
			</div>
			
			<div class="control-group">
				<label for="port" class="control-label required">端口</label>
				<div class="controls">
					<input type="text" required name="port" id="port" autocomplete="off"/>
					<!-- <span class="requiredTipRed">*</span> -->
					<span class="help-inline hide"></span>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button id="cancel" type='button' class="cancelBtn">取消</button>
		<button id="save" type='button' class="confirmBtn">保存</button>
	</div>
</div>
<div id="modalFile" tabindex="-1" class="modal fade hide" data-backdrop="false" aria-hidden="true" style="width:650px;">
	<div class="modal-header">
		<button class="close" id="close-modal" type="button" data-dismiss="modal">&times;</button>
		<h3>代理更新</h3>
	</div>
	<div class="modal-body" style="max-height:550px">
			<form class="form-min form-horizontal">
				<section class="panel">
				<p class="title">请选择更新文件</p>
				<div class="content agm-fileModal" style="padding-top: 10px;">
					<div class="agm-tabs">
						<span>
							<input type="radio" name="whichType" value="local"/>本地文件
						</span>
						<span>
							<input type="radio" name="whichType" value="server"/>服务端文件
						</span>
					</div>
					
					<div class="agm-tabsContent">
						<div class="agm-localContent" style="padding-top: 15px;">
							<div style="display: flex;justify-content: center; align-items: center;">
							   <div class="agm-addFile" >
									<input type="file" id="agenfile" name="upfile" style="opacity: 0; width: 100%; height: 100%;cursor: pointer;"/>
								   	
							   </div>
							   <div class="agm-fileInfo">
							   	  <div><span>文件名：</span><span class="agm-fileName">尚未选择文件</span></div>
							   	  <div><span>文件大小：</span><span class="agm-fileSize">尚未选择文件</span></div>
							   	 <!-- <div><span>上传时间：</span><span class="agm-fileTime"></span></div>-->
							   </div>
							</div>
							<div style="text-align: right;margin-right: 8px;">
								<button id="agm-uploadFile" class="cancelBtn" type="button" style=" height: 30px;display: inline-block;">上传</button>
							</div>
						</div>
						
						<div class="agm-serverContent">
							<div><span>操作</span><span>文件名</span><span>文件大小</span><span>更新时间</span></div>
							
						</div>
						
					</div>
					
					
					
					<!--<div class="control-group agm-localfile" >
						<div class="controls" style="margin-left: 53px;">
							<input type="file" id="agenfile" name="upfile"/>
							<button type="button">上传</button>
						</div>
					</div>-->
				</div>
				</section>
			</form>
	</div>
	<div class="modal-footer">
		<button id="cancel" type='button' class="cancelBtn">取消</button>
		<button id="save" type='button' class="confirmBtn">确定更新</button>
	</div>
</div>

<div id="alertModal" tabindex="-1" class="modal fade hide" data-backdrop="false" aria-hidden="true" style="width:650px;">
	<div class="modal-header">
		<button class="close" id="close-modal" type="button" data-dismiss="modal">&times;</button>
		<h3>采集告警</h3>
		<div class="modal-info">
			<p><span>代理名:</span><span class="modal-info-name"></span></p>
			<p><span>主机:</span><span class="modal-info-ip"></span></p>
		</div>
	</div>
	<div class="modal-body" style="max-height:550px">
		<div class="modal-title">告警规则</div>
		<div class="modal-btns">
			<button id="" class="" data-name="editAgent" type="button">新增</button>
			<button id="" class="disabled" data-name="editAgent" type="button">修改</button>
			<button id="" class="disabled" data-name="editAgent" type="button">删除</button>
		</div>
		<table id="alertRuleTab" class="display dataTable table">
			<thead>
				<tr>
					<th>序号</th>
					<th>描述</th>
					<th>时间方式</th>
					<th>时间持续</th>
					<th>规则</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	
	</div>
	<div class="modal-footer hide">
		<button id="cancel" type='button' class="cancelBtn">取消</button>
		<button id="save" type='button' class="confirmBtn">确定</button>
	</div>
</div>	
