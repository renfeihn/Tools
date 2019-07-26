<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="true"%>
<style>
.addLogInfoResource-form .control-label{
	width: 105px;
}
.addLogInfoResource-form .controls{
	margin-left: 115px;
	line-height: 24px;
}

.addLogInfoResource-form input, .addLogInfoResource-form select {
	width: 100%;
}

.addLogInfoResource-form .addLogInfoResource-addBtn{
	color: var(--color-theme);
	background-color: #fff;
	border: 1px solid var(--color-theme);
}
.addLogInfoResource-form .addLogInfoResource-addBtn:hover{
	color: #fff;
	background-color: var(--color-theme);
	border: 1px solid var(--color-theme);
}

.addLogInfoResource-tips {
	background-color: #fff9db;
    color: #6a431d;
	font-size: 12px;
	font-weight: normal;
	display: inline-block;
	padding: 0 10px;
	margin-left: 130px;
	margin-bottom: 10px;
}
.addLogInfoResource-tips.red{
	background-color: #ffdbdb;
	color: #880000;
}

.addLogInfoResource-formBtns {
	text-align: right;
	margin-right: 40px;
	padding-top: 10px;
}

.addLogInfoResource-public .addLogInfoResource-header {
	border:none;
	height: 30px;
	line-height: 30px;
	color: #000;
	background-color: #f2f2f2;
	align-items: center;
}
.addLogInfoResource-public .addLogInfoResource-header>* {
	flex: 1;
	padding: 0 5px;
}

.addLogInfoResource-public {
	border-bottom: 1px solid #d9d9db;
	margin: 0;
}
.addLogInfoResource-public li{
	height: 30px;
	line-height: 30px;
	display: flex;
	border-top: 1px solid #d9d9db;
}
.addLogInfoResource-public li.active{
	background-color: #f5f6f9;
}

.addLogInfoResource-public li>span{
	flex: 1;
	overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
	padding: 0 5px;
}
.addLogInfoResource-public li span.filedCount{
	color: var(--color-theme);
}
.addLogInfoResource-public li>span:nth-child(1){
	padding-left: 10px;
}
.addLogInfoResource-public li>span:last-child {
	padding-right: 10px;
	cursor: pointer;
	text-align: center;
}

.addLogInfoResource-rule {
    display: flex;
    flex-wrap: wrap;
}
.addLogInfoResource-rule>span {
	height: 24px;
	border: 1px solid #c7c6cc;
	text-align: center;
	padding: 0 10px;
	cursor: pointer;
	width: 150px;
	height: 24px;
	line-height: 24px;
	border-radius: 3px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 12px;
	margin: 0 10px 10px 0;
	box-sizing: border-box;
}
.addLogInfoResource-rule>span:hover {
	background-color: var(--color-theme);
	color: #fff;
}
.addLogInfoResource-rule>span[disabled].active{
    background-color: #E3E3E6;
    color: initial;
}
.addLogInfoResource-rule>span[disabled]:not(.active):hover {
    background-color: initial;
    color: initial;
}
.addLogInfoResource-source>span+span{
	margin-left: 10px;
}
.addLogInfoResource-rule>span.active {
	background-color: var(--color-theme);
	color: #fff;
}
.addLogInfoResource-source{
    display: flex;
    flex-wrap: wrap;
}
.addLogInfoResource-source>span{
	margin-bottom: 10px;
	height: 24px;
    display: inline-block;
    border: 1px solid #c7c6cc;
    text-align: center;
    padding: 0 10px;
    cursor: pointer;
}
.addLogInfoResource-source>span:last-child {
	background-color: #fff;
	font-size: 16px;
	font-weight: bolder;
	color: var(--color-theme);
	border: 1px solid var(--color-theme);
    border-radius: 2px;
}
.addLogInfoResource-source>span:last-child:hover{
	background-color: var(--color-theme);
	color: #fff;
}
.addLogInfoResource-source>span>i{
	margin-left: 10px;
	color: var(--color-theme);
}
.addLogInfoResource-source>input{
    height: 26px;
    width: 206px;
    margin: 0 10px;
}
.addLogInfoResource-pathUl,
.addLogInfoResource-pathUl ul{
	margin-left: 10px;
	position: relative;
}
.addLogInfoResource-pathUl {
    margin-left: -20px;
}
.addLogInfoResource-pathUl span>i {
	color: var(--color-theme);
}
.addLogInfoResource-pathUl span{
    width: 100%;
    display: block;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 27px;
    line-height: 27px;
}
.addLogInfoResource-pathUl li{
	position: relative;
	margin-left: 20px;
	border-bottom: 1px solid #E3E3E7;
}
.addLogInfoResource-pathUl li.active>span {
    background: rgba(91, 98, 246,.7);
    color: #fff;
}
.addLogInfoResource-pathUl ul:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #E3E3E7;
}
.addLogInfoResource-hostIp>ul>li>span:nth-child(2){
	width: 25%;
	flex: none;
}
.addLogInfoResource-hostIp>ul>li>span:nth-child(4){
	width: 50px;
	flex: none;
}
.addLogInfoResource-hostIp>ul>li>span:nth-child(5){
	width: 50px;
	flex: none;
}
.addLogInfoResource-hostIp>ul>li>span:nth-child(8){
	width: 50px;
	flex: none;
}

/*.addLogInfoResource-hostIp>ul>li>span:last-child,
.addLogInfoResource-JDBCInport>ul>li>span:last-child,
.addLogInfoResource-kafkaInport>ul>li>span:last-child{
	flex: none;
	width: 65px;
}*/

#moreConfig{
	margin-left: 115px;
	margin-bottom: 10px;
	display: inline-block;
	font-size: 12px;
	font-weight: normal;
}
#moreConfig:after{
	content: '';
	display:inline-block;
	width: 0;
	height: 0;
	border-top: 5px solid #2b2a33;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	transition: all .3s;
	margin-bottom: 2px;
}
#moreConfig.open:after{
	transform: rotate(-180deg);
}

#appReleConfig .addLogInfoResource-public li>span,
#warningConfig .addLogInfoResource-public li>span,
#desensitizationConfig .addLogInfoResource-public li>span{
	padding-right: 10px;
}

#appReleConfig .addLogInfoResource-public li>span:last-child,
#warningConfig .addLogInfoResource-public li>span:last-child,
#desensitizationConfig .addLogInfoResource-public li>span:last-child{
	width: 100px;
	flex: none;
}
#appReleConfig .keyExpressionWarp,
#ipContent .ALIR-ipWapper,
#ipContent .ALIR-dirWapper{
	position: relative;
	overflow: visible;
}
#appReleConfig .keyFieldList,
#ipContent .ALIR-ipList,
#ipContent .ALIR-dirList{
	position: absolute;
	width: 96%;
	max-height: 150px;
	margin: 0;
	background-color: #fff;
	box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 31px;
	overflow-y: auto;
	top: 30px;
	left: 0;
	margin-bottom: 20px;
	outline: none;
	z-index: 2;
}
#ipContent .ALIR-ipList{
	left: 10px;
}
#ipContent .ALIR-dirList{
	width: 500px;
	max-height: 200px;
}

#appReleConfig .keyFieldList li{
	padding: 0 20px;
	box-sizing: border-box;
	cursor: pointer;
}
#ipContent .ALIR-ipList li{
	padding: 0 10px;
	box-sizing: border-box;
	cursor: pointer;
}
#appReleConfig .keyFieldList li:hover,
#ipContent .ALIR-ipList li:hover{
	background-color: #f2f2f2;
}

#appReleConfig .keyFieldList li.active,
#ipContent .ALIR-ipList li.active{
	background-color: #5965f0;
	color: #fff;
}


#ipContent .ALIR-dirBtn{
	position: absolute;
    top: 6px;
    right: 5px;
    height: 21px;
}

#ipContent .ALIR-dirList ul{
	margin-left: 20px;
    position: relative;
}
#ipContent .ALIR-dirList span>i {
	color: var(--color-theme);
}
#ipContent .ALIR-dirList span{
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
#ipContent .ALIR-dirList li{
	position: relative;
	margin-left: 20px;
	border-bottom: 1px solid #E3E3E7;
	border-top: none;
}
#ipContent .ALIR-dirList li.active>span {
    background: rgba(91, 98, 246,.7);
    color: #fff;
}
#ipContent .ALIR-dirList ul:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #E3E3E7;
}
/*数据清理start*/
.addLogInfoResource-clear{
	height: 30px;
	line-height: 20px;
	box-sizing: border-box;
	background-image: linear-gradient(#5a62f9 5px, #5a62f9 5px);
	background-repeat: no-repeat;
	background-position: 0px, 0px;
	background-size: 5px 20px;
	padding: 5px 15px;
	margin-left: 115px;
	margin-bottom: 10px;
	border-bottom: 1px solid #5a62f9;
	font-size: 12px;
}
.addLogInfoResource-clear>span{
	float: right;
	font-style: italic;
	color: #5a62f9;
	cursor: pointer;
}
.clear-context .fa{
	cursor: pointer;
	font-size: 14px;
	color: #c7c6cc;
	margin: 0 5px;
}
.clear-context .fa.checked{
	color: #5399f5;
}
.clear-context,
.copyclear-context,
.copyclear-context .serverType{
	display: none;
}
/*数据清理end*/
</style>
<div>
	<form id="addLogInfoResource_form" class="form-horizontal addLogInfoResource-form" style="height: calc(100vh - 212px);overflow: auto;padding-right: 5px;">
		<div class="control-group">
			<label class="control-label required">日志源名称</label>
			<div class="controls">
				<input type="text" name="logName" id="logName" placeholder="请输入日志名称，日志名称不可重复" autocomplete="off" />
				<span class="help-inline hide">日志名称重复</span>
			</div>
		</div>
		<div class="control-group" style="width: 40%;">
			<label class="control-label">所属应用系统</label>
			<div class="controls">
				<select name="logType" id="app"></select>
			</div>
		</div>
		<div class="control-group" style="width: 40%;">
			<label class="control-label required">所属资产分类</label>
			<div class="controls" style="position: relative;">
				<input id="category" type="text" name="category" readonly/>
				<div id="categoryContent" style="position:absolute;max-height:260px;overflow-y:auto;overflow-x:hidden;display:none; width: 170%;z-index: 50;    box-shadow: 0px 5px 31px rgba(0,0,0,0.4);">
					<div>
						<input id="nodeSearch" type="text" placeholder="搜索" autocomplete="off" />
					</div>
					<ul id="classZtree" class="ztree">
					</ul>
				</div>
			</div>
		</div>
		<!-- <div class="control-group" style="width: 40%;">
			<label class="control-label required">解析规则标志</label>
			<div class="controls">
				<span class="boolean-switch false true" id="analyFlag"></span>
			</div>
		</div> -->
		<div class="control-group" style="width: 40%;">
			<label class="control-label required">解析规则分类</label>
			<div class="controls">
				<select name="logType" id="analyClass"></select>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label required">解析规则</label>
			<div class="controls addLogInfoResource-rule" id="analyRule">
				<!-- <span class="active">赞同AFA日志</span> -->
			</div>
		</div>
		<div class="control-group hide">
			<label class="control-label required">来源对象</label>
			<div class="controls addLogInfoResource-hostIp">
				<ul class=" addLogInfoResource-public">
					<li class="addLogInfoResource-header">
						<span>对象</span>
						<span>目录</span>
						<span>文件匹配</span>
						<span>末尾扫描</span>
						<span>扫描深度</span>
						<span>文件类型</span>
						<span title="是否重要">是否重要</span>
						<span title="读取文件个数">读取文件个数</span>
						<span title="文件刷新时间(秒)">刷新时间(秒)</span>
						<span>过期时间</span>
						<span>操作</span>
					</li>
				</ul>
				<ul class="addLogInfoResource-public" id="ipContent">
				<!-- <li><span>10.2.3.210</span><span>/home/test</span><span class="removeIp">&times;</span></li> -->
				</ul>
				<button id="addIp" type="button" class="addLogInfoResource-addBtn" style=" padding: 0 10px;font-size: 16px;font-weight: bold;" title="添加">+</button>
			</div>
		</div>
		<div class="control-group hide">
			<label class="control-label required">数据库表配置</label>
			<div class="controls addLogInfoResource-JDBCInport">
				<ul class=" addLogInfoResource-public">
					<li class="addLogInfoResource-header">
						<span>类型</span><span>主机</span><span>用户名</span><span>密码</span><span>数据库名</span><span>表名</span><span>排序键名</span><span>排序方式</span><span>批读取大小</span><span>操作</span>
					</li>
				</ul>
				<ul class="addLogInfoResource-public" id="JDBCContent">
					<!-- <li>
						<span><select>
							<option value="Oracle">Oracle</option>
							<option value="Mysql">Mysql</option>
							<option value="SQLServer">SQLServer</option>
						</select></span>
						<span><input type="text" placeholder="10.9.2.3:3306"></span>
						<span><input type="text"></span>
						<span><input type="text"></span>
						<span><input type="text"></span>
						<span><input type="text"></span>
						<span><select>
							<option value="desc">desc</option>
							<option value="aes">aes</option>
						</select></span>
						<span><input type="number"></span>
						<span>
							<button type="button" class="saveIp fa fa-save" title="保存"></button>
							<button type="button" class="removeIp fa fa-times" title="取消"></button>
						</span>
					</li> -->
				</ul>
				<button id="addJDBC" type="button" class="addLogInfoResource-addBtn" style=" padding: 0 10px;font-size: 16px;font-weight: bold;" title="添加">+</button>
			</div>
		</div>
		
		<div class="control-group hide">
			<label class="control-label required">kafka接入</label>
			<div class="controls addLogInfoResource-kafkaInport">
				<ul class=" addLogInfoResource-public">
					<li class="addLogInfoResource-header">
						<span>服务地址</span><span>消费者组名</span><span>主题</span><span>每批读取大小</span><span>操作</span>
					</li>
				</ul>
				<ul class="addLogInfoResource-public" id="kafkaContent">
				</ul>
				<button id="addKafka" type="button" class="addLogInfoResource-addBtn" style=" padding: 0 10px;font-size: 16px;font-weight: bold;" title="添加">+</button>
			</div>
		</div>

		<div class="control-group hide" style="width: 40%;">
			<label class="control-label required">日志接入地址</label>
			<div class="controls">
				<select name="logType" id="logAddr"></select>
			</div>
		</div>
		<div class="control-group hide">
			<label class="control-label required">源地址白名单</label>
			<div class="controls addLogInfoResource-source" id="sourceAddrList">
				<!-- <span>10.2.3.2<i class="deleteSource">&times;</i></span> --><span id="addSource">+</span>
			</div>
		</div>
		<div class="control-group hide">
			<label class="control-label required">日志文件选择</label>
			<div class="controls" style="position: relative">
				<input type="text" id="fileInput" readonly="readonly"/>
				<button type='button' id="scan" style="position: absolute;top: 2px;right: -50px;">浏览</button>
				<input type="file" style="display: none" id="file" name="file"/>
				<p style="color: #BF8F00;">注意：文件可选择压缩与非压缩文件，系统会自动校验格式，单个文件最大不能超过20M。</p>
			</div>
		</div>
		<div class="control-group hide">
			<label class="control-label required">日志文件选择</label>
			<div class="controls" id="sourceAddrList" style="position: relative">
				<input type="text" id="pathInput" readonly="readonly" value="/" style="padding-right: 50px;"/>
				<button type='button' style="position: absolute;top: 1px;right: 0;" id="pathScan">浏览</button>
			</div>
		</div>
		<div id="moreConfig" style="display: none;">
			高级配置
		</div>
		<div id="moreConfigContent" style="display: none;">
			<!-- <div class="control-group">
				<label class="control-label required">日志权限</label>
				<div id="logPermission" class="controls addLogInfoResource-rule">
					<span>超级管理员</span>
				</div>
			</div> -->
			<div class="control-group">
				<label class="control-label required">日志权限</label>
				<div class="controls addLogInfoResource-source" id="logPermission">
					<span id="addPermission">+</span>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">关键字定义</label>
				<div class="controls" id="appReleConfig">
					<ul class="addLogInfoResource-public">
						<li class="addLogInfoResource-header">
							<span>关键字描述</span><span>关键字表达式</span><span><button id="addAppRConfig" type="button" class="addLogInfoResource-addBtn">+添加</button></span>
						</li>
					</ul>
					<ul class="addLogInfoResource-public" id="appReleConfigList">
						<!-- <li><span>统一支付平台</span><span>lll</span><span>全局流水</span><span>$translation;</span><span>&times;</span></li> -->
					</ul>
				</div>
			</div>
			<!-- <div class="control-group">
				<label class="control-label">预警配置</label>
				<div class="controls" id="warningConfig">
					<ul class="addLogInfoResource-public">
						<li class="addLogInfoResource-header">
							<span>预警关键字</span><span>预警级别</span><span><button id="addWarning" type="button" class="addLogInfoResource-addBtn">+添加</button></span>
						</li>
					</ul>
					<ul class="addLogInfoResource-public" id="warningList">
						<li><span>统一支付平台</span><span>lll</span><span>&times;</span></li>
					</ul>
				</div>
			</div> -->
			<div class="control-group">
				<label class="control-label">脱敏规则配置</label>
				<div class="controls" id="desensitizationConfig">
					<ul class="addLogInfoResource-public">
						<li class="addLogInfoResource-header">
							<span>脱敏规则名称</span><span>脱敏规则表达式</span><span><button id="addDesensitization" type="button" class="addLogInfoResource-addBtn">+添加</button></span>
						</li>
					</ul>
					<ul class="addLogInfoResource-public" id="desensitizationList">
						<!-- <li><span>统一支付平台</span><span>lll</span><span>&times;</span></li> -->
					</ul>
				</div>
			</div>
		</div>
	</form>
	<div class="addLogInfoResource-formBtns">
		<button id="cancelBtn" type="button" class="cancelBtn">取消</button>
		<button id="confirmBtn" type="button" class="confirmBtn">保存</button>
	</div>
</div>

<div id="modal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">选择日志目录或文件:<span style="margin-left: 10px;font-style: italic;"></span></h3>
	</div>
	<div class="modal-body">
		<ul id="pathList" class="addLogInfoResource-pathUl"></ul>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" data-dismiss="modal" class="confirmBtn">保存</button>
	</div>
</div>

