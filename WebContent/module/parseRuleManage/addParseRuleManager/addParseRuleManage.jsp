<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
.parseRuleManage-addBtn,.parseRuleManage-addBtn:hover {
	color: #FFF;
	background-color: var(--color-theme);
	border: 1px solid var(--color-theme);
	height: 26px;
	padding: 0 10px;
}
.parseRuleManage-addBtn:hover {
	opacity: 0.7;
}
#addParseRule .form-horizontal .control-label {
	width: 120px;
}
#addParseRule .form-horizontal .controls {
	margin-left: 140px;
}
.text-button {
	color: var(--color-theme);
	cursor: pointer;
}
pre#dataExample {
	width: calc(100% - 320px);
	box-shadow: none;
	border: 1px solid #c6c7cc;
	border-radius: 2px;
	margin: 0;
	min-height: 100px;
	overflow: auto;
	max-height: 205px;
}
#addParseRule .form-horizontal .controls .boolean-switch.true:BEFORE {
	margin-left: 20px;
}
#addParseRule .form-horizontal .controls .boolean-switch:BEFORE {
	border-radius: 50%;
	width: 20px;
}
#addParseRule .form-horizontal .controls .boolean-switch {
	border-radius: 20px;
}
#addParseRule .form-horizontal .controls>input[type="text"],
#addParseRule .form-horizontal .controls>select {
	width: calc(100% - 300px);
}
#addParseRule {
	padding: 10px 20px;
}
#addParseRule .ztree li a {
	padding-right: 60px !important;
	white-space: nowrap;
}
.field-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 400px 1fr 1fr;
  grid-column-gap: 10px;
 }
#structConfig_public>li {
  list-style-type: decimal;
  margin-bottom: 10px;
}
#structConfig_public {
	margin: 0 0 0 14px;
	width: calc(100% - 315px);
}
/*************************************************/
.structConfig-tipBox{
	position:absolute;
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
/*************************************************/
.field-layout input,.field-layout select {
	width: 100% !important;
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
/* 服务器目录预览弹窗 */
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
#previewModalTable tbody tr.selected {
	background-color: #F1F0F5!important;
}
/* 服务器目录预览弹窗 */
</style>
<div id="addParseRule">
	<h4>新增解析规则</h4>
	<form class="form-horizontal" id="structConfig_form">
		<div class="control-group">
			<label for="logName" class="control-label required">解析规则名称</label>
			<div class="controls">
				<input type="text" name="logName" id="logName" />
			</div>
		</div>

		<div class="control-group">
			<label for="category" class="control-label required">所属资源</label>
			<div class="controls">
				<div style="position: relative;">
					<input type="text" id="category" placeholder="所属资源" data-toggle="dropdown" />
					<input type="text" name="objectid" id="objectid" class="hide">
					<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel" style="width: fit-content;overflow: hidden;">
						<input type="text" id="nodeSearch" autocomplete="false" style="margin: 6px 10px;">
						<div style="max-height: 400px;overflow-y: auto;">
							<ul class="ztree" id="classZtree"></ul>
						</div>
				  </ul>
				</div>
			</div>
		</div>

		<div class="control-group">
			<label for="dataExample" class="control-label required">样例日志内容</label>
			<div class="controls" style="position: relative;">
				<pre id="dataExample" contenteditable="plaintext-only" tabindex="-1" spellcheck="false" style="outline: none;"></pre>
				<div id="logExampleDiv">
					<span class="text-button" id="logExample_upload">上传日志</span>
					<input type="file" name="file" class="logExample-file" style="display: none !important;">
					<span id="serverLogPreview" class="text-button" style="margin-left: 10px;">服务器日志预览</span>
				</div>
				<div id="tipBox" class="structConfig-tipBox">
					<span class="point"></span>
					<ul>
						<li>正则表达式</li>
						<li>函数</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="control-group">
			<label for="groupStart" class="control-label">分组开始字符串</label>
			<div class="controls">
				<input type="text" name="groupStart" id="groupStart" placeholder="多个值用\n分割"/>
			</div>
		</div>

		<div class="control-group">
			<label for="groupEnd" class="control-label">分组结束字符串</label>
			<div class="controls">
				<input type="text" name="groupEnd" id="groupEnd"/>
			</div>
		</div>

		<div class="control-group">
			<label for="input1" class="control-label required">日志事件RegEx</label>
			<div class="controls">
				<input type="text" name="logEventRegex" id="logEventRegex">
			</div>
		</div>

		<div class="control-group">
			<label for="input1" class="control-label">单行日志模式</label>
			<div class="controls">
				<span class="boolean-switch" id="lineFlag"></span>
			</div>
		</div>

		<div class="control-group">
			<label for="input1" class="control-label required">多行匹配方式</label>
			<div class="controls">
				<select name="mulitiLineType" id="mulitiLineType" class="select-css" style="width: 160px;">
					<option value="0">关键字段/流水标识</option>
					<option value="1">开始结束标识</option>
				</select>
			</div>
		</div>

		<div class="control-group">
			<label for="input1" class="control-label required">公共数据结构化</label>
			<div class="controls">
				<ul id="structConfig_public">
					
				</ul>
			</div>
		</div>
	</form>
	<div style="display: flex;justify-content: center;">
		<button class="confirmBtn" id="saveData" style="width: 100px;">保存</button>&nbsp;&nbsp;&nbsp;<button class="cancelBtn" id="cancelBtn" style="width: 100px;">取消</button>
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

<div id="structConfig-tab3">
	<div class="structConfig-slideBlockHeader">
		<span class="structConfig-slideBlockTitle">解析</span>
		<span class="structConfig-tab3-closeBtn">x</span>
	</div>
	<div class="structConfig-slideBlockBody">
		<form class="form-horizontal structConfig-form hide" autocomplete="off">
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
	<div class="structConfig-formBtns" style="margin-bottom: 10px;margin-top: 20px;text-align: right;">
			<button id="delete-fields" type="button" class="cancelBtn hide">删除</button>
			<button id="pre-analyze" type="button" class="" style="background: #fff;border-color: var(--color-theme);color: var(--color-theme);padding: 15px;line-height: 0px;margin-right: 20px;">预解析</button>
			<button id="inParams-save" type="button" class="confirmBtn hide">确定</button>
	</div>
</div>

