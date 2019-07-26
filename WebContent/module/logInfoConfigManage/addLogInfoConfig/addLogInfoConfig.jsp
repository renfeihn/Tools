<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="true"%>
<style>
.structConfig-form .control-label{
	width: 95px;
}
.structKeyModal-form .control-label {
	width: 125px;
}

.structConfig-form .controls{
	margin-left: 105px;
	line-height: 24px;
}
.structKeyModal-form .controls {
	margin-left: 135px;
	line-height: 24px;
}
.structConfig-form .col2{
	width: calc(50% - 2px);
	display: inline-block;
}
.structConfig-form .col4{
	width: calc(25% - 3px);
	display: inline-block;
}

.structConfig-form input, .structConfig-form select {
	width: 100%;
}
.structConfig-form .error pre{
	border-color: #e50413 !important;
	background-color: #fff7f8 !important;
}
.structConfig-logExampleBtn {
	position: absolute;
	top: 30px;
	left: 50px;
	color: var(--color-theme);
	cursor: pointer;
	font-style: italic;
	font-weight: normal;
}
.structConfig-logExampleBtn:hover {
	text-decoration: underline;
}
.structConfig-panel .tab-content>.tab-pane {
	padding: 0;
}
.structConfig-header #addFieldsBtn {
	color: var(--color-theme);
	cursor: pointer;
	position: absolute;
    top: 4px;
    right: 20px;
}
.structConfig-header #addFieldsBtn:before{
	content: '+';
	font-size:18px;
}
.structConfig-tips {
	background-color: #fff9db;
    color: #6a431d;
	font-size: 12px;
	font-weight: normal;
	display: inline-block;
	padding: 0 10px;
	margin-left: 130px;
	margin-bottom: 10px;
}
.structConfig-tips.red{
	background-color: #ffdbdb;
	color: #880000;
}
.structConfig-form .boolean-switch {
	border-radius: 12px;
	float: none;
	margin-bottom: -8px;
}

.structConfig-form .boolean-switch:BEFORE {
	width: 20px;
	border-radius: 10px;
}

.structConfig-form .boolean-switch.true:BEFORE {
	margin-left: 20px;
}

.structConfig-expand>span{
	display: inline-block;
	cursor: pointer;
	width: 32px;
	height: 60px;
	background: url(img/logInfoConfigManage/open.png) center center no-repeat;
}

.structConfig-expand.active>span{
	background: url(img/logInfoConfigManage/close.png) center center no-repeat;
}

.structConfig-structKey {
	margin: 0;
}

.structConfig-structKey .structConfig-header {
	border:none;
	height: 30px;
	line-height: 30px;
	color: #000;
	background-color: #f2f2f2;
}

.structConfig-structKey li {
	display: flex;
	border-top: 1px solid #d9d9db;
	height: 60px;
	line-height: 60px;
}

.structConfig-structKey li>span {
	display: inline-block;
	width: calc(( 100% - 120px)/5);
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding:0 10px;
}
.structConfig-public li>span{
	width: calc(( 100% - 120px)/4);
}

/* .structConfig-structKey li>span:nth-child(1)
{
	width: 40px;
}
 */
.structConfig-structKey>li>span:last-child {
	text-align: center;
	padding-right: 10px;
	width: 80px;
}

.structConfig-structKey li>span.splitType, .structConfig-structKey li>span.structConfig-modify
	{
	cursor: pointer;
}

.structConfig-structKey li>span.splitType img{
	width: 26px;
}

.structConfig-structKey .structConfig-quote:hover,
.structConfig-structKey .structConfig-unSensitivity:hover{
	text-decoration: underline;
	color: var(--color-theme);
	cursor: pointer;
}
.structKeyList {
	border-bottom: 1px solid #d9d9db;
}

.structKeyList li{
	height: 30px;
	line-height: 30px;
}

.structKeyList li>span{
	width: calc(( 100% - 40px)/4);
}

.structKeyList li>span:nth-child(1){
	width: calc(( 100% - 40px)/4);
	padding-left: 10px;
}

.structKeyList li>span:last-child{
	width: 80px;
}

.structKeyList li.active{
	background-color: #f5f6f9;
}

.structKeyList li span.filedCount{
	color: var(--color-theme);
}
.structConfig-detial{
	background-color: #f5f6f9;
	color: #616161;
	margin: 0;
    padding: 0 20px;
    font-style: italic;
}

.structConfig-detial li {
	height: 45px;
	line-height: 45px;
}

.structConfig-detial li i {
	font-size: 12px;
}

.structConfig-detial li.header {
	background-color: inherit;
	color: var(--color-theme);
}
.structConfig-detial li>span{
	width: calc((100% - 40px)/4);
}

.structConfig-detial li img{
	margin-top: -8px;
}

.structConfig-formBtns {
	text-align: right;
	margin-right: 20px;
}

.structConfig-tipBox{
	position:absolute;
	/*width: 300px;*/
	width: 150px;
	display: none;
	box-shadow: 0 2px 5px rgba(0,0,0,.4);
	background: #fff;
	text-align: center;
}
.structConfig-tipBox .control-label{
	width: 100px;
}
.structConfig-tipBox .controls{
	margin-left: 100px;
}
.structConfig-tipBox .point{
	display: inline-block;
    border-left: 1px solid #f1f1f1;
    border-top: 1px solid #f1f1f1;
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
    position: relative;
    top: -10px;
    background: #fff;
}
/************************************分割线******************************/
.structConfig-tipBox>ul{
	list-style: none;
	margin: 0;
	position: relative;
	margin-top: -20px;
	cursor: pointer;
}
.structConfig-tipBox>ul>li{
	background-color: #fafafc;
	border-bottom: 1px solid #ebebed;
	height: 30px;
	line-height: 30px;
}
.structConfig-tipBox>ul>li:hover{
	background-color: var(--color-theme);
	color: white;
}
/************************************分割线******************************/
#dataExample{
	-webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
    cursor: text;
    padding: 0 5px;
    box-shadow: none;
    background: none;
    max-height: 200px;
    overflow-y: auto;
    min-height: 75px;
    color: #706f79;
    font-weight: normal;
    font-size: 12px;
    line-height: 1.2;
    background-color: #fafafa;
}
#dataExample span.selected{
	background-color: var(--color-theme);
	color: #fff;
	border-radius: 2px;
}
#dataExample:focus{
	outline:none;
	border:1px solid var(--color-theme);
}
#dataExample::selection{
	background-color: var(--color-theme);
	color: #fff;
	border-radius: 2px;
}

/************************************分割线******************************/
#currentFiled{
	margin-bottom: 20px;
}
#codeModal{
	user-select: text;
    cursor: text;
    padding: 0 5px;
    box-shadow: none;
    background: none;
    max-height: 100px;
    overflow-y: auto;
    min-height: 75px;
    color: #706f79;
    font-weight: normal;
    font-size: 12px;
}
#inParams-list-content .paramVal{
	width: 70px;
}

/************************************分割线******************************/
#structConfig-tab3{
	width: 700px;
	height: calc(100vh - 42px);
    position: fixed;
    top: 40px;
    right: 0;
    background: #fff;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    box-shadow: 0 3px 3px #ccc;
    transform: translateX(730px);
    transition: all .5s;
    font-size: 12px;
    font-weight: normal;
}
#structConfig-tab3.active{
	transform: translateX(0);
}
.structConfig-slideBlockHeader{
	background: #fafafc;
    border-bottom: 1px solid #ebebed;
    height: 39px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 20px;
    margin: 0;
}
.structConfig-slideBlockHeader .structConfig-tab3-closeBtn{
	float: right;
	cursor: pointer;
}
.structConfig-slideBlockBody{
	overflow-y: auto;
	padding: 20px 20px 0px 20px;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
}
.structConfig-slideBlockBody form .control-label{
	width: 57px;
}
.structConfig-slideBlockBody form .controls{
	margin-left: 77px;
}

#structConfig-tab3 .split-fields{
	width: calc(100% - 5px);
}
#split-setting .tree{
	float: left;
    width: calc(40% - 10px);
    margin-right: 10px;
    min-height: 230px;
    background: #fafafc;
}
#split-setting .tree .ztree{
	max-height: 280px;
	overflow-y: auto;
}
#split-setting .tree .ztree li.activeli{
	position: relative;
}
#split-setting .tree .ztree li.activeli:after{
	content: '';
    position: absolute;
    width: 10px;
    height: 20px;
    background-color: #fff;
    clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
    right: 0px;
    top: 6px;
}
#split-setting .setting{
	float: left;
	width: 60%;
}
#split-setting .split-header{
	height: 30px;
    line-height: 30px;
	text-align: center;
    color: #000;
	background-color: #f2f2f2;
	border-bottom: 1px solid #e3e3e8;
}
#split-setting .structConfig-header{
	height: 32px;
	line-height: 32px;	
	border: none;
	background-color: #FAFAFC;
}
#split-setting .structConfig-structKey li>span{
	width: calc(( 100% - 80px)/4);
}
#inParams-list-content li{
	height: 32px;
    line-height: 32px;
}
#inParams-list-content input{
	margin: 0;
}
#script-region{
	font-size: 18px;
	font-weight: normal;
	padding-top: 5px;
	padding-left: 5px;
	user-select: text;
    cursor: text;
    min-height: 130px;
    max-height: 200px;
    overflow-y: scroll;
    border: 1px solid #ebebed;
    border-top: none;
    outline: none;
}
#split-setting:after{
	content: '';
	clear: both;
	display: block;
}

#split-setting .preview{
	float: right;
	width: 100%;
	margin-top: 20px;
}
#split-setting .preview .split-header{
	border-bottom: 0;
}
#preview-content{
	user-select: text;
    cursor: text;
    padding: 0 5px;
    box-shadow: none;
    background: none;
    max-height: 200px;
    overflow-y: auto;
    min-height: 140px;
    color: #706f79;
    font-weight: normal;
    font-size: 12px;
    line-height: 1.2;
    background-color: #fafafa;
    outline: none;
    border-radius: 0;
}
#preview-content .hightLight{
	background-color: var(--color-theme);
	color: #fff;
}
.PreviewModal-content{
	width: 100%;
	display: flex;
}
.PreviewModal-content .PreviewModal-left{
	width: 450px;
	flex: none;
}
.PreviewModal-right{
	width: 710px;
    flex: none;
    background: #eaeaea;
    padding: 10px 0;
    border-radius: 3px;
}
.PreviewModal-right .PreviewModal-dirList{
	width: 100%;
	height: 530px;
	overflow-y: auto;
	margin: 0;
	cursor: pointer;
}
.PreviewModal-right .PreviewModal-dirList ul{
	margin-left: 20px;
    position: relative;
}
.PreviewModal-right .PreviewModal-dirList span>i {
	color: var(--color-theme);
}
.PreviewModal-right .PreviewModal-dirList span{
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
.PreviewModal-right .PreviewModal-dirList li{
	position: relative;
	margin-left: 20px;
	border-bottom: 1px solid #E3E3E7;
	border-top: none;
}
.PreviewModal-right .PreviewModal-dirList li.active>span {
    background: rgba(91, 98, 246,.7);
    color: #fff;
}
.PreviewModal-right .PreviewModal-dirList ul:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #E3E3E7;
}
</style>
<div>
	<form id="structConfig_form" class="form-horizontal structConfig-form" autocomplete="off">
		<div class="control-group" style="width: 50%;display: inline-block;">
			<label class="control-label required">解析规则名称</label>
			<div class="controls">
				<input type="text" name="logName" id="logName" />
			</div>
		</div>
		<!-- <div class="control-group" style="width: 30%;display: inline-block;">
			<label class="control-label required">日志类型</label>
			<div class="controls">
				<select name="logType" id="logType">
					<option value="Text">文本文件</option>
					<option value="Syslog">Syslog</option>
					<option value="Log4jAppender">Log4jAppender</option>
					<option value="Nginx">Nginx</option>
				</select>
			</div>
		</div> -->
		<div class="control-group" style="width: 30%;display: inline-block;">
			<label class="control-label required">日志字符集</label>
			<div class="controls">
				<select name="logCoding" id="logCoding">
					<option value="UTF-8">UTF-8</option>
					<option value="GBK">GBK</option>
				</select>
			</div>
		</div>
		<div class="control-group" style="width: calc(20% - 8px);display: inline-block;">
			<label class="control-label required">压缩发送</label>
			<div class="controls">
				<span class="boolean-switch" id="compress"></span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label required">日志目录样例</label>
			<div class="controls">
				<input type="text" name="dirExample" id="dirExample">
			</div>
		</div>
		<div id="logExampleDiv" class="control-group" style="position: relative;">
			<label class="control-label required">日志内容样例</label>
			<pre id="dataExample" class="controls" contenteditable="plaintext-only" tabindex="0-1"></pre>
			<div id="logExample_upload" class="structConfig-logExampleBtn">点我上传</div>
			<input type="file" name="file" class="logExample-file" style="display: none !important;">
			<div id="serverLogPreview" class="structConfig-logExampleBtn" style="top: 50px;left: 10px;">服务器日志预览</div>
			<div id="tipBox" class="structConfig-tipBox">
				<span class="point"></span>
				<ul>
					<li>正则表达式</li>
					<li>函数</li>
				</ul>
			</div>
			<!-- 改版之前的弹框 -->
			<!-- <div id="tipBox" class="structConfig-tipBox">
				<span class="point"></span>
				<div class="form-horizontal">
					<div class="control-group">
						<label class="control-label">数据描述</label>
						<div class="controls">
							<input id="lineDesc" type="text" style="width: 170px;">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">示例值</label>
						<div class="controls" id="text"></div>
					</div>
					<div class="control-group">
						<label class="control-label">行匹配RegEx</label>
						<div class="controls"></div>
					</div>
					<div class="control-group">
						<label class="control-label">数据匹配RegEx</label>
						<div class="controls"></div>
					</div>
					<div class="control-group">
						<label class="control-label">拆分方式</label>
						<div class="controls">
							<select id="splitFlag" name="splitFlag" style="width: 170px;">
								<option value="1">可视化拆分</option>
								<option value="2">Java脚本拆分</option>
								<option value="3">Python脚本拆分</option>
							</select>
						</div>
					</div>
					<button id="tipBoxAddBtn" type="button" style="color: #fff; background-color: var(--color-theme);border:1px solid var(--color-theme);float: right;margin-right: 15px;margin-bottom: 15px;">+ 添加</button>
				</div>
			</div> -->
		</div>
		
		<div class="control-group" style="width: 50%;display: inline-block;">
			<label class="control-label">分组开始字符串</label>
			<div class="controls">
				<input type="text" name="groupStart" id="groupStart" placeholder="多个值用\n分割"/>
			</div>
		</div>

		<div class="control-group" style="width: calc(50% - 4px);display: inline-block;">
			<label class="control-label">分组结束字符串</label>
			<div class="controls">
				<input type="text" name="groupEnd" id="groupEnd"/>
			</div>
		</div>
		
		<div class="control-group" style="width: 50%;display: inline-block;">
			<label class="control-label required">日志事件RegEx</label>
			<div class="controls">
				<input type="text" name="logEventRegex" id="logEventRegex">
			</div>
		</div>
		<div class="control-group" style="width: calc(20% - 8px);display: inline-block;">
			<label class="control-label required">单行日志模式</label>
			<div class="controls">
				<span class="boolean-switch" id="lineFlag"></span>
			</div>
		</div>
		<div class="control-group" style="display: inline-block;width: 30%;">
			<label class="control-label required">多行匹配方式</label>
			<div class="controls">
				<select name="mulitiLineType" id="mulitiLineType">
					<option value="0">关键字段/流水标识</option>
					<option value="1">开始结束标识</option>
				</select>
			</div>
		</div>
		<!-- <textarea id="logExample" name="logExample" style="width: 100%; height: 100px;resize: vertical;"></textarea> -->

		<!-- <div class="structConfig-tips red">错误：您输入的【数据起始位置】匹配了样例中的多个位置点，请重新输入</div> -->
		
		<div class="control-group">
			<label class="control-label required">日志标准化配置</label>
			<div class="controls">
				<section class="panel structConfig-panel" style="flex: auto;position: relative;">
					<ul id="structConfig-tab" class="nav nav-tabs nav-public">
						<li class="active"><a href="#structConfig-tab1" data-toggle="tab">公共数据结构化</a></li>
						<li><a href="#structConfig-tab2" data-toggle="tab">个性数据结构化</a></li>
						<!-- <li style="display: none;">
							<a href="#structConfig-tab3" data-toggle="tab">
								<span id="title">新增／修改 </span>
								<span class="flowCM-closeBtn" title="关闭" id="structConfig-tab3-closeBtn">x</span>
							</a>
						</li> -->
					</ul>
					<div class="tab-content" style="height: calc(100% - 40px);">
						<div id="structConfig-tab1" class="tab-pane active">
							<ul class="structConfig-structKey structConfig-public">
								<li class="structConfig-header">
									<span>标准化字段名称</span>
									<span>标准化字段描述</span>
									<span>数据来源</span>
									<span>数据值匹配表达式</span>
									<span>默认值</span>
									<span>格式</span>
									<span>操作</span>
								</li>
								<ul id="structConfig_public" class="structConfig-structKey  structConfig-public structKeyList">
									<!-- <li><span>_date_</span><span>日志日期</span><span>123</span><span>222</span>
										<span class="structConfig-modify" title="编辑"><i class="fa fa-pencil-square-o" style="font-size: 16px; margin-top: 6px;"></i></span></li> -->
								</ul>
							</ul>
						</div>
						<div id="structConfig-tab2" class="tab-pane">
							<ul class="structConfig-structKey">
								<li class="structConfig-header">
									<span>标准化字段名称</span>
									<span>标准化字段描述</span>
									<span>字段类型</span>
									<span>拆分方式</span>
									<span>引用字段预警</span>
									<span>
										操作
										<i id="addFieldsBtn">新增</i>
									</span>
								</li>
								<ul id="structConfig_private" class="structConfig-structKey structKeyList">
									<li><span style="width: 100%;">无数据</span></li>
									<!-- <li>
										<span>fieldKey</span>
										<span>fieldDesc</span>
										<span>fieldType</span>
										<span>是</span>
										<span class="structConfig-modify" title="编辑"><i class="fa fa-pencil-square-o" style="font-size: 16px; margin-top: 6px;"></i></span>
										</li>  -->
								</ul>
							</ul>
						</div>
					</div>
				</section>
			</div>
		</div>
	</form>
	<div class="structConfig-formBtns">
		<button id="cancelLogStruct" type="button" class="cancelBtn">取消</button>
		<button id="addCfgLogStruct" type="button" class="confirmBtn">保存</button>
		<button id="saveAsTemplate" type="button" class="confirmBtn">另存为模版</button>
	</div>
</div>

<div id="structConfig-tab3">
	<div class="structConfig-slideBlockHeader">
		<span class="structConfig-slideBlockTitle">新增</span>
		<span class="structConfig-tab3-closeBtn">x</span>
	</div>
	<div class="structConfig-slideBlockBody">
		<form class="form-horizontal structConfig-form" autocomplete="off">
			<div class="split-fields">
				<div class="control-group" style="width: 32%;float: right;">
					<label class="control-label required">字段类型</label>
					<div class="controls">
						<select name="logType" id="fieldType">
							<option selected="selected" disabled="disabled" style="display: none" value=""></option> 
							<option value="Date">Date</option>
							<option value="Number">Number</option>
							<option value="Integer">Integer</option>
							<option value="Long">Long</option>
							<option value="String">String</option>
						</select>
					</div>
				</div>
				<div class="control-group" style="width: 33.33%;display: inline-block;">
					<label class="control-label required">字段名称</label>
					<div class="controls">
						<input type="text" id="fieldKey">
					</div>
				</div>
				<div class="control-group" style="width: 33.33%;display: inline-block;">
					<label class="control-label required">字段描述</label>
					<div class="controls">
						<input type="text" id="fieldDesc">
					</div>
				</div>
			</div>
		</form>
		<div id="split-setting">
			<div class="tree">
				<div class="split-header">拆分方式</div>
				<ul id="structKeyTree" class="ztree"></ul>
			</div>
			<div class="setting" id="inParams-list">
				<div class="split-header">拆分设置（脚本）</div>
				<ul class="structConfig-structKey">
					<li class="structConfig-header">
						<span>入参字段名</span>
						<span>入参字段描述</span>
						<span>入参类型</span>
						<span>输入参数值</span>
					</li>
					<ul id="inParams-list-content" class="structConfig-structKey">
						<!-- <li>
							<span>_date_</span>
							<span>日志日期</span>
							<span>123</span>
							<span><input type="text"></span>
						</li> -->
					</ul>
					<div>
						<div class="split-header">执行脚本</div>
						<div id="script-region" contenteditable="plaintext-only" tabindex="0-1"></div>
					</div>
				</ul>
			</div>
			<div class="preview">
				<div class="split-header">拆分结果（示例预览）</div>
				<pre id="preview-content" contenteditable="plaintext-only" tabindex="0-1"><!-- 预览内容 --></pre>
			</div>
		</div>
	</div>
	<div class="structConfig-formBtns" style="margin-bottom: 10px;margin-top: 20px;">
			<button id="delete-fields" type="button" class="cancelBtn">删除</button>
			<button id="pre-analyze" type="button" class="cancelBtn">预解析</button>
			<button id="inParams-save" type="button" class="confirmBtn">确定</button>
	</div>
</div>
<div id="structKeyModal" class="modal hide fade" data-backdrop="false"
	aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">个性数据结构化</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal structKeyModal-form"
			style="margin:0 40px;">
			<div class="control-group">
				<label class="control-label required">拆分描述</label>
				<div class="controls">
					<input type="text" name="structDes" id="lineDescModal">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">拆分行匹配规则</label>
				<div class="controls">
					<input type="text" name="lineRegex" id="lineRegex">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">数据位置匹配</label>
				<div class="controls">
					<input type="text" name="dataRegex" id="dataRegex">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">拆分方式</label>
				<div class="controls">
					<select name="splitFlag" style="width: 206px;">
						<option value="1">可视化拆分</option>
						<option value="3">Java脚本拆分</option>
						<option value="2">Python脚本拆分</option>
						<option value="0">正则表达式拆分</option>
					</select>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button id="structKeyModalDel" type="button" data-dismiss="modal" class="cancelBtn">删除</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
		<button id="structKeyModalAdd" type="button" class="confirmBtn">确认</button>
	</div>
</div>

<div id="serverLogPreviewModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 1200px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">服务器日志预览</h3>
	</div>
	<div class="modal-body" style="max-height: 550px;">
		<div class="PreviewModal-content">
			<div class="PreviewModal-left">
				<table id="previewModalTable" class="display dataTable table">
					<thead>
						<tr>
							<th>序号</th>
							<th>主机名</th>
							<th>主机IP</th>
							<th>代理状态</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
			<div class="PreviewModal-right"></div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
		<button id="logAdd" type="button" class="confirmBtn">确认</button>
	</div>
</div>

<div id="saveAsTemplateModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>另存为模版</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal structKeyModal-form"
			style="margin-right: 40px;height: 300px;">
			<div class="control-group">
				<label class="control-label required">解析规则名称</label>
				<div class="controls">
					<input id="templateLogName" type="text" placeholder="另存为解析规则名称" style="width: 100%;">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">日志对象资产分类</label>
				<div class="controls" style="position: relative;">
					<input id="category" type="text" name="category" readonly style="width: 100%;" />
					<div id="categoryContent" style="position:absolute;max-height:260px;overflow-y:auto;overflow-x:hidden;display:none; width: 100%;z-index: 50;    box-shadow: 0px 5px 31px rgba(0,0,0,0.4);">
						<div>
							<input id="nodeSearch" type="text" placeholder="搜索" autocomplete="off" style="width: 100%;"/>
						</div>
						<ul id="classZtree" class="ztree">
						</ul>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">解析规则分类</label>
				<div class="controls">
					<input id="saveAsTemplateType" type="text" readonly="readonly" disabled style="width: 100%;">
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>

<div id="warningModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">引用字段预警</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal structKeyModal-form"
			style="margin-right: 40px;">
			<div style="display: flex;">
				<div class="control-group">
					<label class="control-label required">校验类型</label>
					<div class="controls">
						<select id="fieldCheck" style="width: 206px;">
							<option value="1">包含校验</option>
							<option value="3">不包含校验</option>
							<option value="2">比较校验</option>
							<option value="4">模糊包含校验</option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label required">预警范围</label>
					<div class="controls">
						<select id="timeInterval" style="width: 206px;">
							<option value="1">小时</option>
							<option value="2">天</option>
							<option value="3">周</option>
						</select>
					</div>
				</div>
			</div>
			<div>
				<div class="control-group">
					<label class="control-label required">预警字段规则</label>
					<div class="controls">
						<select id="waningFieldList" style="width: 206px;">
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label required">字段值</label>
					<div class="controls">
						<textarea id="checkValue" style="width: 100%;height: 200px;resize: none;"></textarea>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">预警表达式</label>
				<div class="controls">
					<textarea id="checkExpress" style="width: 100%;height: 200px;resize: none;" placeholder="请填写预警表达。 例如: >=300;<=600"></textarea>
				</div>
			</div>
			
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
		<button type="button" class="cancelBtn delbtn">解除预警</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>

<div id="unSensitivityModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>字段脱敏配置</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal structKeyModal-form"
			style="margin-right: 40px;height: 100px;">
			<div class="control-group">
				<label class="control-label required">脱敏替换字符</label>
				<div class="controls">
					<input name="character" type="text" placeholder="请输入替换字符" style="width: 100%;">
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
		<button type="button" class="cancelBtn delbtn">解除脱敏</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>

<div id="AFE" class="modal" draggable="false" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 1200px;">
	<div id="AFEBody" class="modal-body" style="padding: 0; max-height: 600px; margin-bottom: 5px;">
		<style>
			.message-left {
				width: 25%;
				float: left;
				height: 590px;
				overflow-y: auto;
			}

			.message-right {
				width: 75%;
				margin-left: 25%;
				height: 590px;
				overflow-y: auto;
			}

			.message-controlsBtn {
				height: 24px;
				line-height: 34px;
				height: 34px;
				text-align: right;
				color: #999;
				padding-right: 10px;
				border-bottom: 1px solid #e5e5e5;
				border-right: 1px solid #e5e5e5;
				background-image: linear-gradient(to bottom, #e0e8f1 0%, #ffffff 70%);
				background-size: 100% 100%;
			}

			.message-controlsBtn i:HOVER {
				color: #333;
			}

			.message-controlsBtn i {
				cursor: pointer;
			}

			.message-left a.selected {
				background-image: linear-gradient(to top, #cfe6ff 0%, #f2f8ff 100%);
				background-size: 100% 100%;
				box-shadow: 0 0 0 1px #83addd;
				border-radius: 2px;
			}
			.message-left .ui-state-highlight{
				height: 20px;
				border: 1px dashed #83addd;
				background-color: #edf5ff;
			}
			.message-left a {
				color: #000;
				margin-left: 1.5em;
				padding: 2px 5px;
			}

			.message-left a i {
				margin-right: .5em;
				color: #999;
			}

			.message-left ul>li>i {
				position: absolute;
				line-height: 20px;
				width: 15px;
				text-align: center;
				transition: all linear .2s;
				cursor: pointer;
			}

			.message-left>ul {
				margin: 0;
				padding: 10px 0 0 10px;
				font-size: 12px;
				font-weight: normal;
				position: relative;
				height: calc(100% - 45px);
				border-right: 1px solid #828790;
			}

			.message-left>ul ul {
				margin: 0 0 0 16px;
				padding-bottom: 10px;
			}

			.message-left ul img {
				width: 15px;
				height: 12px;
				margin-right: 10px;
			}

			li[data-state="open"]>i {
				transform: rotate(90deg);
			}

			.message-right>p {
				color: #1e75cd;
				padding-left: 10px;
				height: 34px;
				line-height: 34px;
				font-size: 16px;
				background-image: linear-gradient(to bottom, #e0e8f1 0%, #ffffff 70%);
				background-size: 100% 100%;
				border-bottom: 1px solid #e5e5e5;
				margin: 0;
			}

			.message-right .message-group>h3 {
				color: #1494ff;
				font-size: 16px;
				padding: 0;
				line-height: 18px;
			}

			.message-right .message-group>div>span {
				display: inline-block;
				font-weight: normal;
				color: #555;
				margin-right: .5em;
			}

			.message-right .message-group {
				margin-left: 10px;
			}

			.message-right .message-group>div>select, .message-right .message-group>div>input
				{
				margin: 0;
			}

			.message-right .message-group>div {
				margin: 3px 0;
				font-size: 12px;
			}

			.parameter-group {
				font-size: 12px;
				margin-top: 20px;
			}

			a.message-parameter.retract>i {
				transform: rotate(-90deg);
			}

			a.message-parameter {
				font-size: 12px;
				color: #000;
				margin-left: 10px;
			}

			a.message-parameter>i {
				transition: all linear .2s;
			}

			.message-right .parameter-div {
				margin: 10px 0px 20px 30px;
			}

			.parameter-div>div {
				margin: 8px 0;
			}

			.parameter-div span {
				font-weight: normal;
				color: #555;
				display: inline-block;
				margin-right: .5em;
			}

			.parameter-div select, .parameter-div input {
				margin: 0;
			}

			.message-right table th {
				border-bottom: 1px solid #d5d5d5;
				border-left: 1px solid #f0f0f0;
				border-right: 1px solid #f0f0f0;
				background-image: linear-gradient(to bottom, #ffffff 50%, #f1f2f4 50%);
				background-size: 100%;
				text-align: center;
				vertical-align: middle;
				height: 24px;
			}

			.message-right table tr.selected {
				background-image: linear-gradient(to bottom, #f2f8ff 0%, #cfe6ff 100%);
				background-size: 100%;
			}

			.message-right table td {
				border: 1px solid #f0f0f0;
				height: 24px;
			}

			.message-right table {
				table-layout: fixed;
				width: 100%;
				height: 200px;
				overflow: auto;
			}

			#modalContent pre {
				box-shadow: none;
			}

			#modalContent .CodeMirror{
				height: 100%;
			}
		</style>
		<div id="modalContent" style="border-bottom: 1px solid #828790;">
		</div>

		<!-- html 模板 -->
		<script id="modal-tpl" type="text/x-handlebars-template">
			<div class="message-left">
				<div class="message-controlsBtn">
					<span style="float: left;margin-left: 10px;color: #1e75cd;font-size: 16px;"><img src="img/logInfoConfigManage/{{this.imgName}}.png" style="width: 30px;height: 30px;margin-top: -3px;">{{this.name}}</span>
					<i title="展开所有" class="fa fa-plus-square-o"></i>&nbsp; <i title="收起所有" class="fa fa-minus-square-o"></i>
				</div>
				<ul>
					<li data-state="open">
							<!-- <i class="fa fa-angle-right"></i> -->

						<a data-toggle="context" data-target="#treeRoot-menu" data-role="message" id="treeRoot">
							<img src="img/logInfoConfigManage/branch.png" alt="">
							<span>{{this.treeRootName}}</span>
						</a>
					</li>
				</ul>
			</div>
			<div class="message-right" data-selected="" data-active-role="">
				<p>{{this.rightName}}</p>
				<div id="container" style="height: 550px;overflow-y: auto;">
					<!-- 报文start -->
					<div class="message-group">
						<!-- <h3>报文</h3>
						<div>
							<span style="width: 4em;">报文类型</span>
							<select style="width: calc(100% - 6em);" id="messageType">
								<option value="定长报文">定长报文</option>
								<option value="分隔符报文">分隔符报文</option>
								<option value="复合报文">复合报文</option>
								<option value="NATP报文">NATP报文</option>
								<option value="NATP分隔符报文">NATP分隔符报文</option>
								<option value="Xml报文">Xml报文</option>
								<option value="JSON报文">JSON报文</option>
								<option value="SOAP报文">SOAP报文</option>
								<option value="TuxedoFml报文">TuxedoFml报文</option>
								<option value="ISO8583报文">ISO8583报文</option>
								<option value="HTTP参数报文">HTTP参数报文</option>
							</select>
						</div>
						<div>
							<span style="width: 4em;">类名</span>
							<input style="width: calc(100% - 6em);" id="ClassName" type="text" disabled value="FixAnalyzer" />
						</div> -->
					</div>
					<!-- 报文end -->
					
					<!-- 参数start -->
					{{#if this.show}}
					<div class="parameter-group">
						<a class="message-parameter"><i class="fa fa-fw fa-caret-down"></i>参数</a>
						<div class="parameter-div">
							<!-- <div>
								<span>报文总长度</span>
								<input type="text" value="-1" style="width: calc(100% - 7em);" />
							</div> -->
						</div>
					</div>
					{{/if}}
					<!-- 参数end -->
				</div>
			</div>
			<div id="treeRoot-menu">
				<ul class="dropdown-menu" role="menu">
					<li><a tabindex="-1" href="#" class="newField" id="newField">新建字段结点</a>
					</li>
				</ul>
			</div>
			<div id="context-menu">
				<ul class="dropdown-menu" role="menu">
					<li>
						<a tabindex="-1" href="#" class="newField" id="newField">新建字段结点</a>
						<a tabindex="-1" href="#" class="delete" id="delete">删除</a>
					</li>
				</ul>
			</div>
			<div id="message-menu">
				<ul class="dropdown-menu" role="menu">
					<li>
						<a tabindex="-1" href="#" id="newMessage">新建报文结点</a>
						<a tabindex="-1" href="#" class="delete" id="delete">删除</a>
					</li>
				</ul>
			</div>
			<div id="script-menu">
				<ul class="dropdown-menu" role="menu">
					<li>
						<a tabindex="-1" href="#" class="delete" id="delete">删除</a>
					</li>
				</ul>
			</div>
		</script>
		<script id="msg-tpl" type="text/x-handlebars-template">
			<h3>报文</h3>
			<div>
				<span style="width: 4em;">报文类型</span>
				<select style="width: calc(100% - 6em);" data-type="messageSelect" data-name="" data-class="">
					{{#each messageSelect}}
						{{#if_eq this.value ../DefaultValue}}
							<option value="{{this.value}}" data-class="{{this.className}}" selected>{{this.value}}</option>
						{{else}}
							<option value="{{this.value}}" data-class="{{this.className}}">{{this.value}}</option>
						{{/if_eq}}
					{{/each}}
				</select>
			</div>
			<div>
				<span style="width: 4em;">类名</span>
				<input style="width: calc(100% - 6em);" type="text" disabled value="" data-role="msgCls"/>
			</div>
		</script>

		<script id="param-tpl" type="text/x-handlebars-template">
			{{#if this.Parameter}} 
				{{#each this.Parameter}}
					<div>
						<span style="width:{{../maxWidth}}">{{this.Name}}</span>
						{{#if this.Enumeration}}
							<select style="width: calc(100% - {{../compWidth}});" title="{{this.Description}}" data-name="{{this.Name}}">
								{{#each this.Enumeration}}
									{{#if_eq this ../DefaultValue}}
										<option value="{{this}}" selected>{{this}}</option>
									{{else}}
										<option value="{{this}}">{{this}}</option>
									{{/if_eq}}
								{{/each}}
							</select>
						{{else}}
							<input type="text" value="{{this.DefaultValue}}" style="width: calc(100% - {{../compWidth}});" title="{{this.Description}}" data-name="{{this.Name}}"/> 
						{{/if}}
					</div>
				{{/each}} 
			{{/if}}
		</script>

		<script id="field-tpl" type="text/x-handlebars-template">
			<h3>字段</h3>
		    <div>
		        <span style="width: 8em;">外部字段名称</span>
		        <input style="width: calc(100% - 10em);" data-name="outerFieldName" type="text" value="{{outerFieldName}}"/>
		    </div>
		    <div>
		        <span style="width: 8em;">外部字段类型</span>
		        <select style="width: calc(100% - 10em);" id="FieldType" data-name="outerFieldType">
					{{#each this.outerFieldTypeArray}}
					{{#if_eq this ../outerFieldType}}
						<option value="{{this}}" selected>{{this}}</option>
					{{else}}
						<option value="{{this}}">{{this}}</option>
					{{/if_eq}}
				{{/each}}
		        </select>
		    </div>
		    {{#if this.afe}}
		    <div>
		        <span style="width: 8em;">外部字段值</span>
		        <input style="width: calc(100% - 10em);" id="FieldValue" type="text" data-name="outerFieldValue" value="{{outerFieldValue}}"/>
		    </div>
		    {{/if}}
		    <div>
		        <span style="width: 8em;">外部字段缺省值</span>
		        <input style="width: calc(100% - 10em);" id="FieldDefaultValue" type="text" data-name="outerFieldDefaultValue" value="{{outerFieldDefaultValue}}"/>
		    </div>
		    <div>
		        <span style="width: 8em;">外部字段说明</span>
		        <input style="width: calc(100% - 10em);" id="FieldDesc" type="text" data-name="outerFieldDesc" value="{{outerFieldDesc}}"/>
		    </div>
		</script>

		<script id="field-param-tpl" type="text/x-handlebars-template">
			<div class="parameter-group">
				<a class="message-parameter">
					<i class="fa fa-fw fa-caret-down"></i>字段方法</a>
				<div class="parameter-div">
					<button type="button" id="add">新增</button>
					<button type="button" id="insert">插入</button>
					<button type="button" id="remove">删除</button>
					<div style="border: 1px solid #828790;margin-top: 12px;width: calc(100% - 1.2em);">
						<table data-role="fieldTable" data-free-size="7" data-length="7">
							<thead>
								<tr>
									<th style="width: 30%;">类</th>
									<th style="width: 30%;">函数</th>
									<th style="width: 40%;"></th>
								</tr>
							</thead>
							<tbody>
								<tr data-state="empty">
									<td data-target="class"></td>
									<td></td>
									<td></td>
								</tr>
								<tr data-state="empty">
									<td data-target="class"></td>
									<td></td>
									<td></td>
								</tr>
								<tr data-state="empty">
									<td data-target="class"></td>
									<td></td>
									<td></td>
								</tr>
								<tr data-state="empty">
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr data-state="empty">
									<td data-target="class"></td>
									<td></td>
									<td></td>
								</tr>
								<tr data-state="empty">
									<td data-target="class"></td>
									<td></td>
									<td></td>
								</tr>
								<tr data-state="empty">
									<td data-target="class"></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="parameter-div"></div>
			</div>
		</script>
		<script id="script-msg-tpl" type="text/x-handlebars-template">
			<h3>脚本</h3>
			<div>
				<div class="parameter-group">
					<a class="message-parameter">
						<i class="fa fa-fw fa-caret-down"></i>{{this.name}}脚本</a>
					<div class="parameter-div">
						<div id="{{this.id}}" style="border:1px solid #818790;margin-right: 20px;height: {{this.contentHeight}}">
							<textarea></textarea>
						</div>
					</div>
					<div class="parameter-div"></div>
				</div>
			</div>
		</script>
		<script id="msg-param-tpl" type="text/x-handlebars-template">
			<div class="parameter-group">
				<a class="message-parameter">
					<i class="fa fa-fw fa-caret-down"></i>参数</a>
				<div class="parameter-div"></div>
			</div>
		</script>
		<script id="script-field--param-tpl" type="text/x-handlebars-template">
			<div class="parameter-group">
				<a class="message-parameter">
					<i class="fa fa-fw fa-caret-down"></i>{{this.name}}脚本</a>
				<div class="parameter-div">
					<div id="{{this.id}}" style="border:1px solid #818790;margin-right: 20px;height: {{this.contentHeight}}">
						<textarea></textarea>
					</div>
				</div>
				<div class="parameter-div"></div>
			</div>
		</script>

		<script id="tree-node-tpl" type="text/x-handlebars-template">
			<li data-state="open">
				{{#if afe}}
					<a data-role="field" id="{{id}}" data-target="#message-menu" data-toggle="context">
						<img src="img/logInfoConfigManage/leaf.png" alt="">
						<span>{{title}}</span>
					</a>
				{{else}}
					<a data-role="field" data-target="#script-menu" id="{{id}}">
						<img src="img/logInfoConfigManage/leaf.png" alt="">
						<span>{{title}}</span>
					</a>
				{{/if}}
			</li>
		</script>

		<script id="tree-Message-tpl" type="text/x-handlebars-template">
			<li data-state="open">
				<a data-role="message" id="{{id}}" data-target="#context-menu" data-toggle="context">
					<img src="img/logInfoConfigManage/branch.png" alt="">
					<span>{{title}}</span>
				</a>
			</li>
		</script>

		<script id="table-class-tpl" type="text/x-handlebars-template">
			<select data-role="funcClass">
				{{#each functionClassSelect}}
					{{#if_eq this.ClassName ../DefaultValue}}
						<option value="{{this.ClassName}}" selected>{{this.Name}}</option>
					{{else}}
						<option value="{{this.ClassName}}">{{this.Name}}</option>
					{{/if_eq}}
				{{/each}}
			</select>
		</script>

		<script id="table-func-tpl" type="text/x-handlebars-template">
			<select data-role="func">
				{{#each functionSelect}}
					{{#if_eq this.FuncName ../DefaultValue}}
						<option value="{{this.FuncName}}" selected>{{this.Name}}</option>
					{{else}}
						<option value="{{this.FuncName}}">{{this.Name}}</option>
					{{/if_eq}}
				{{/each}}
			</select>
		</script>

		<script id="table-empty-tr-tpl" type="text/x-handlebars-template">
			<tr data-state="empty">
				<td data-target="class"></td>
				<td></td>
				<td></td>
			</tr>
		</script>

		<script id="func-tpl" type="text/x-handlebars-template">
			{{#if this.Parameter}} {{#each this.Parameter}}
			<div>
				<span style="width:{{../maxWidth}}">{{this.Name}}</span>
				{{#if this.Enumeration}}
				<select style="width: calc(100% - {{../compWidth}});" title="{{this.Description}}" data-name="{{this.Name}}">
					{{#each this.Enumeration}} {{#if_eq this ../DefaultValue}}
					<option value="{{this}}" selected>{{this}}</option>
					{{else}}
					<option value="{{this}}">{{this}}</option>
					{{/if_eq}} {{/each}}
				</select>
				{{else}}
				<input type="text" value="{{this.DefaultValue}}" style="width: calc(100% - {{../compWidth}});" title="{{this.Description}}"
					data-name="{{this.Name}}" /> 
				{{/if}}
			</div>
			{{/each}} {{/if}}
		</script>

		<script id="button-tpl" type="text/x-handlebars-template">
			<div class="btnGroup" style="text-align: right;padding: 0 20px;">
				<button id="{{this.id}}" class="confirmBtn">{{this.name}}</button>
			</div>
		</script>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" data-dismiss="modal" class="confirmBtn">确认</button>
	</div>
</div>
