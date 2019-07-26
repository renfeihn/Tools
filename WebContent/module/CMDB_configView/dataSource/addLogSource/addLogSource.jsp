<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style type="text/css">
/**************************Step***************************/
.step-progress>.step-ball:before {
	content: counter(sectioncounter);
	counter-increment: sectioncounter;
	width: 35px;
	height: 35px;
	border-radius: 50%;
	border: 1px solid #c0bec3;
	background-color: #FFF;
	display: inline-block;
	vertical-align: middle;
	margin-right: 14px;
	text-align: center;
	font-size: 18px;
	color: #c0bec3;
}
.step-progress>.step-ball.finish:before {
	content: "";
	border: 1px solid var(--color-theme);
	color: #4450e2;
	line-height: 35px;
	background: url(data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADJUlEQVR4Xu2ZT2sTQRjGn3cSFOvBHkSLxV0QPOrBgthLqUmrF5vGioiiUP/gJ6ggghc9iPoRxIpCPUihu3qR0rWgSFEUBEHw2A0W9VJQ0NY2eWU3jWit7m5mN9nNTm4hO39+v3lm5k1CSPmLUs4PJUAlIOUG1BZIeQDUIai2gNoCKTegtkDKA6BugZbcAvnCp60QC2csQ7/mlfCWE3Dg8MctZV6cIdAOMN+aMvXz/5PQUgL+gAfAwKhlaGdTIaAeeEdMSySgXviWECADn3gBsvCJFhAGfGIFhAWfSAFhwidOQNjwiRIQBXxiBEQF71tA7lCpkzKVTZapv/P6chH2584XGxKLzwDsdPpm4LZlaOfCGsezEswV7B4hMMGM7xmxbs/kRMfnsAb36ifKla+N7S2gaB8XwH23AePtfCW77/Wjbd+8Ji/7eSPgfW+BfMG+QgKXXQfMU5apHQSoIgv5r/aNgvctwHmwb9AeA+HEyj68axnacBQC/oJnHrNM/WQUYwUS0NvL2Uy7/ZRA3VUJfMnPLy5BJr42vHYKIA7ST5BnPc+A3zvrLc63Z/H1Ze1EBvjYlKE/CDKg79i7Kx8tfKAE1CaeG5rTqbz8igibGbwEprxlas41VferGSvv+xZYi2p/cbYrw3gOovVg/lLm7N7ph53v6zHQTPi6ElCD7CuUhph4nAjEjA/11AjNhpcS4N4MhdIFCL7hSglYI8QBXlrAyvU4CsJp14HPGiEu8KEIAFjki6XHBPT7qRHiBB+SAKBrYK6tXSzPEGG302mF+eITU7+++lCMG3xoApyO3L+jaOENEXUwg0EYsgzNqEmII3yoAqrnQWkXwDMgbAT4R5lFz7S5/UVc4UMXUE3CbD8JmqzeDDxfZgwIgXvuf3XVgzLS2j5oLRKoFPbbea5oDwvgzurnq/DRl7d+5xlJAn4VSoP2TRBGau/jCB+pAHc7FGfHCXQkrvCRC+g+WtrQtsQjlqFdDRLLRj4byRnQSADZsZQAWYNJb68SkPQVlJ2/SoCswaS3VwlI+grKzl8lQNZg0turBCR9BWXnrxIgazDp7VOfgJ9rBdxQK8bLOwAAAABJRU5ErkJggg==) no-repeat center;
	background-size: 24px;
}
.step-progress>.step-ball.active:before {
	border: 1px solid var(--color-theme);
	background-color: var(--color-theme);
	color: #FFF;
}
.step-progress>li.step-ball {
	color: #555;
	line-height: 35px;
	height: 35px;
	overflow: visible;
	white-space: nowrap;
	background: #FFF;
	position: relative;
	z-index: 2;
	padding: 0 20px;
}
.step-progress:before {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	height: 1px;
	background-color: #bebcc2;
	top: 17px;
	z-index: 1;
}
.step-progress {
	display: flex;
	justify-content: space-between;
	margin: 30px 120px 40px;
	list-style-type:none;
  counter-reset:sectioncounter;
  position: relative;
}
.step-content {
	margin: 0 20px;
}
/**************************Step***************************/
.logSource-type-layout>div[data-value]:hover {
	background-color: #f1f1f3;
}
.logSource-type-layout>div[data-value] {
	cursor: pointer;
}
.logSource-type-layout>div>img {
	margin-bottom: 10px;
}
.logSource-type-layout>div {
	width: 100%;
	height: 180px;
	background-color: #fafafc;
	text-align: center;
	box-sizing: border-box;
	display: inline-flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.logSource-type-layout {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	width: 940px;
	margin: 0 auto;
	border: 1px solid #ebebed;
	background-color: #ebebed;
	grid-gap: 1px;
}
.step-button-content {
	margin: 20px;
	text-align: center;
}
.step-button-content .confirmBtn {
	background-color: var(--color-theme);
	border-color: var(--color-theme);
	color: #FFF;
}
.step-button-content .confirmBtn.disabled {
	opacity: 0.5;
	cursor: default;
}
.step-content .form-horizontal .control-label {
	width: 130px;
	font-size: 14px;
	line-height: 28px;
}
.step-content .form-horizontal .controls input[type="text"],
.step-content .form-horizontal .controls input[type="number"],
.step-content .form-horizontal .controls select {
	width: 640px;
	height: 28px;
	font-size: 14px;
}
.step-content .form-horizontal .controls {
	margin-left: 150px;
}
.step-content .form-horizontal .controls .boolean-switch.true:BEFORE {
	margin-left: 20px;
}
.step-content .form-horizontal .controls .boolean-switch:BEFORE {
	border-radius: 50%;
	width: 20px;
}
.step-content .form-horizontal .controls .boolean-switch {
	border-radius: 20px;
}
pre#dataExample,pre#dataExample1 {
	box-shadow: none;
	border: 1px solid #c6c7cc;
	border-radius: 2px;
	margin: 0;
	min-height: 100px;
	overflow: auto;
	max-height: 205px;
	background-color: #FFF;
}
.addLogPrivate-amlog{
	min-height: 400px;
	position: relative;
}
.structConfig_public {
	margin: 0 0 0 20px;
}
.structConfig_public>li {
	list-style-type: decimal;
	margin-bottom: 10px;
}
.structConfig_public>li>.field-layout {
	display: grid;
	grid-template-columns: repeat(6, 140px);
	grid-column-gap: 10px;
}
.ALIR-dirList{
	position: absolute;
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
.ALIR-dirList{
	width: 500px;
	max-height: 200px;
}
.ALIR-dirList ul{
	margin-left: 20px;
  position: relative;
}
.ALIR-dirList span>i {
	color: var(--color-theme);
}
.ALIR-dirList span{
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
.ALIR-dirList li{
	position: relative;
	margin-left: 20px;
	border-bottom: 1px solid #E3E3E7;
	border-top: none;
}
.ALIR-dirList li.active>span {
    background: rgba(91, 98, 246,.7);
    color: #fff;
}
.ALIR-dirList ul:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: #E3E3E7;
}
#dirBtn {
  position: absolute;
    margin-left: -80px;
    height: 28px;
    width: 80px;
}
.controls-level-list{
	display: flex;
    flex-wrap: wrap;
}

.controls-level-list>.controls-level-item {
	width: 25%;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.controls-level-list>.controls-level-item.active{
	color: #55A8FD;
}

.controls-level-list>.controls-level-item> i:BEFORE {
	content: "\f096";
	margin-top: 4px;
    display: inline-block;
}

.controls-level-list>.controls-level-item.active> i:BEFORE {
	content: "\f14a";
	margin-top: 4px;
    display: inline-block;
}
#ipConfigList input[type="checkbox"] {
	margin: 0;
}
#ipConfigList label {
	padding: 0;
}
.oid-wrap>.oid-item>div {
	display: inline-block;
}
.oid-wrap>.oid-item>div input {
	width: 243px!important;
}
.oid-wrap>.oid-item i.fa-trash {
	margin-left: 10px;
	cursor: pointer;
}
.oid-wrap .add-item {
	padding: 2px 4px;
	margin-left: 75px;
    border: solid 1px #d0cdcd;
    background: #eaeaea;
    font-size: 12px;
    cursor: pointer;
    border-radius: 2px;
}
.oid-wrap .add-item>i {
    margin-right: 2px;
}
#step2form .tinyselect.disabled {
    pointer-events: none;
    background: #cfd2d4;
    cursor: not-allowed;	
}
</style>
<div>
	<div id="step" style="padding-bottom: 40px;">
		<ul class="step-progress">
			<li class="step-ball active">选择日志来源</li>
			<li class="step-ball">日志源定义</li>
			<li class="step-ball">选择日志解析规则</li>
			<li class="step-ball">私有字段拆分</li>
			<li class="step-ball">完成</li>
		</ul>
		<div class="step-content">
			<!-- 第一步 -->
			<div class="">
				<div class="logSource-type-layout">
					<div data-value="Agent采集" data-form-type="1">Agent采集</div>
					<div data-value="TCP接入"  data-form-type="2">TCP接入</div>
					<div data-value="HTTP接入"  data-form-type="2">HTTP接入</div>
					<div data-value="SNMP服务"  data-form-type="5">SNMP服务</div>
					<div data-value="Syslog接入"  data-form-type="2">Syslog接入</div>
					<div data-value="JDBC接入" data-form-type="3">JDBC接入</div>
					<div data-value="Kafka接入" data-form-type="4">Kafka接入</div>
					<div data-value="Trap接入"  data-form-type="5">Trap接入</div>
				</div>
			</div>
			<!-- 第二步 -->
			<div class="hide">
				<form id="step2form" class="form-horizontal" style="width: 910px;margin: 0 auto;">
					<div class="control-group">
						<label for="logName" class="control-label required">日志源名称</label>
						<div class="controls">
							<input type="text" name="logName" id="logName" autocomplete="off" placeholder="日志源名称不可重复" />
						</div>
					</div>

					<div class="control-group">
						<label class="control-label required">所属应用系统</label>
						<div class="controls">
							<select name="app" id="app" class="select-css" style="width: 180px;" ></select>
						</div>
					</div>

					<div class="control-group">
						<label for="category" class="control-label required">所属资源分类</label>
						<div class="controls">
							<div style="position: relative;">
								<input type="text" id="category" class="select-css" placeholder="" data-toggle="dropdown" style="cursor: pointer;" />
								<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel" style="width: fit-content;overflow: hidden;min-width: 300px;">
									<input type="text" id="nodeSearch" autocomplete="false" style="margin: 6px 10px;width: -webkit-fill-available;">
									<div style="max-height: 400px;overflow-y: auto;">
										<ul class="ztree" id="classZtree"></ul>
									</div>
							  </ul>
							</div>
						</div>
					</div>

					<div class="control-group">
						<label class="control-label required">日志字符集</label>
						<div class="controls">
							<select name="logCoding" id="logCoding" class="select-css" style="width: 180px;">
								<option value="UTF-8">UTF-8</option>
								<option value="GBK">GBK</option>
							</select>
						</div>
					</div>

					<div data-type="1">
						<div class="control-group">
							<label class="control-label required">压缩发送</label>
							<div class="controls">
								<span class="boolean-switch" id="compress"></span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">来源IP对象</label>
							<div class="controls" id="ipConfigList">
								
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">日志文件目录</label>
							<div class="controls">
								<input type="text" autocomplete="off" id="logdir">
								<button type="button" id="dirBtn" class="hide">浏览目录</button>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">文件匹配格式</label>
							<div class="controls">
								<input type="text" autocomplete="off" id="format">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">末尾扫描</label>
							<div class="controls">
								<span class="boolean-switch true" id="skipTo"></span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">扫描深度</label>
							<div class="controls">
								<label for="a" class="radio inline">
									<input type="radio" id="a" value="0" checked="" name="deep"><span style="font-size: 14px;">不限制</span>
								</label>&nbsp;&nbsp;&nbsp;
								<label for="b" class="radio inline">
									<input type="radio" id="b" value="1" name="deep"><span style="font-size: 14px;">当前路径</span>
								</label>
							</div>
						</div>
						<div class="control-group">
							<label for="fileType" class="control-label required">日志文件类型</label>
							<div class="controls">
								<select name="fileType" id="fileType" class="select-css" style="width: 180px;">
									<option value="TEXT">文本文件</option>
									<option value="BIN">二进制文件</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">重要</label>
							<div class="controls">
								<span class="boolean-switch" id="isImportant"></span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">读取文件数(个)</label>
							<div class="controls">
								<input type="number" min="0" name="fileSize" value="256" autocomplete="off" style="width: 180px;">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">刷新时间(秒)</label>
							<div class="controls">
								<input type="number" min="-1" name="flushLastSecd" value="-1" autocomplete="off" style="width: 180px;">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">过期时间(小时)</label>
							<div class="controls">
								<input type="number" min="-1" name="filterFileHours" value="24" autocomplete="off" style="width: 180px;">
							</div>
						</div>
					</div>
					
					<div data-type="2">
						<div class="control-group">
							<label class="control-label required">源地址白名单</label>
							<div class="controls checkbox" id="ipsList">
								
							</div>
						</div>
						<div class="control-group access-level">
							<label class="control-label required">接收级别</label>
							<div class="controls">
								<div class="controls-level-list" id="levels">
									<div class="controls-level-item" title="调试"><i class="fa"></i>&nbsp;&nbsp;debug</div>
									<div class="controls-level-item" title="消息"><i class="fa"></i>&nbsp;&nbsp;info</div>
									<div class="controls-level-item" title="通知"><i class="fa"></i>&nbsp;&nbsp;notice</div>
									<div class="controls-level-item" title="警告"><i class="fa"></i>&nbsp;&nbsp;warning</div>
									<div class="controls-level-item" title="错误"><i class="fa"></i>&nbsp;&nbsp;err</div>
									<div class="controls-level-item" title="严重"><i class="fa"></i>&nbsp;&nbsp;crit</div>
									<div class="controls-level-item" title="故障"><i class="fa"></i>&nbsp;&nbsp;alert</div>
									<div class="controls-level-item" title="致命"><i class="fa"></i>&nbsp;&nbsp;emerg</div>
								</div>
							</div>
						</div>
					</div>
					
					<div data-type="5">
						<div class="control-group">
							<label class="control-label required">源地址白名单</label>
							<div class="controls checkbox" id="ipsListType5">
								
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">选择版本</label>
							<div class="controls">
								<label class="radio inline">
									<input type="radio" name="version" value="V1" checked><span style="font-size: 14px;">V1</span>
								</label>
								<label class="radio inline">
									<input type="radio" name="version" value="V2"><span style="font-size: 14px;">V2</span>
								</label>
								<label class="radio inline">
									<input type="radio" name="version" value="V3"><span style="font-size: 14px;">V3</span>
								</label>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">团体名</label>
							<div class="controls">
								<input type="text" name="community" id="community">
							</div>
						</div>
						<div class="control-group" data-show="version" style="display: none;">
							<label class="control-label required">用户</label>
							<div class="controls">
								<input type="text" id="authUser" />
							</div>
						</div>
						<div class="control-group" data-show="version" style="display: none;">
							<label class="control-label required">密码</label>
							<div class="controls">
								<input type="text" id="authPasswd" />
							</div>
						</div>
						<div class="control-group" data-show="version" style="display: none;">
							<label class="control-label required">认证协议</label>
							<div class="controls">
								<select id="authProto">
									<option value="SHA">SHA</option>
									<option value="AES">AES</option>
									<option value="MD5">MD5</option>
									<option value="DES">DES</option>
								</select>
							</div>
						</div>
						<div class="control-group" data-show="version" style="display: none;">
							<label class="control-label required">解密协议</label>
							<div class="controls">
								<select id="decProto">
									<option value="SHA">SHA</option>
									<option value="AES">AES</option>
									<option value="MD5">MD5</option>
									<option value="DES">DES</option>
								</select>
							</div>
						</div>
						<div class="control-group" data-show="version" style="display: none;">
							<label class="control-label required">加密字符串</label>
							<div class="controls">
								<input type="text" id="decKey"/>
							</div>
						</div>
						<div class="oid-wrap">
							<div class="oid-item">
								<div class="control-group">
									<label class="control-label required">OID描述</label>
									<div class="controls">
										<input type="text" data-role="oid-desc"/>
									</div>
								</div>
								<div class="control-group">
									<label class="control-label required">OID值</label>
									<div class="controls">
										<input type="text" data-role="oid-val"/>
									</div>
								</div>
								<i class="fa fa-trash"></i>
							</div>
							<span class="add-item"><i class="fa fa-plus"></i>新增OID</span>
						</div>
					</div>

					<div data-type="3">
						<div class="control-group">
							<label class="control-label required">数据库类型</label>
							<div class="controls">
								<select class="select-css" style="width: 180px;" data-role="jdbcType">
									<option value="Oracle">Oracle</option>
									<option value="Mysql">Mysql</option>
									<option value="SQLServer">SQLServer</option>
								</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">主机地址</label>
							<div class="controls">
								<div class="controls" id="ipConfigList_jdbc" style="margin-left: 0;">
								
								</div>
								<!-- <input type="text" placeholder="ip:端口" data-role="host"> -->
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">用户名</label>
							<div class="controls">
								<input type="text" data-role="userName">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">密码</label>
							<div class="controls">
								<input type="text" data-role="passwd">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">数据库名</label>
							<div class="controls">
								<input type="text" data-role="dbName">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">表名</label>
							<div class="controls">
								<input type="text" data-role="tableName">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">排序字段名称</label>
							<div class="controls">
								<input type="text" data-role="orderKey">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">排序方式</label>
							<div class="controls">
								<label for="a" class="radio inline">
									<input type="radio" id="a" value="0" name="mowei"  data-role="orderType" checked><span style="font-size: 14px;">asc</span>
								</label>&nbsp;&nbsp;&nbsp;
								<label for="b" class="radio inline">
									<input type="radio" id="b" value="1" name="mowei"  data-role="orderType"><span style="font-size: 14px;">desc</span>
								</label>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">每批读取大小</label>
							<div class="controls">
								<input type="number" min="0" max="500"  data-role="batchSize">
							</div>
						</div>
					</div>
					
					<div data-type="4">
						<div class="control-group">
							<label class="control-label required">服务地址</label>
							<div class="controls">
								<div class="controls" id="ipConfigList_kafka" style="margin-left: 0;">
									
								</div>
								<!-- <input type="text" autocomplete="off" data-role="host"> -->
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">消费者组名</label>
							<div class="controls">
								<input type="text" autocomplete="off" data-role="groupId">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">主题</label>
							<div class="controls">
								<input type="text" autocomplete="off" data-role="topic">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label required">每批读取大小</label>
							<div class="controls">
								<input type="number" autocomplete="off" data-role="batchSize">
							</div>
						</div>
					</div>

				</form>
			</div>
			<!-- 第三步 -->
			<div class="hide">
				<form id="step3form" class="form-horizontal" style="width: 910px;margin: 0 auto;">
					<div class="control-group">
						<label class="control-label required">所属资源对象</label>
						<div class="controls">
							<input type="text" id="tmplateApp" disabled>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label required">选择解析规则</label>
						<div class="controls">
							<select class="select-css" style="width: 180px;" id="analyRule"></select>
						</div>
					</div>
				</form>
				<form class="form-horizontal" style="width: 910px;margin: 0 auto;">
					<p><i>解析规则详情</i></p>
					<div style="background-color: #f2f2f2;border: 1px solid #ccc;border-radius: 4px;padding: 15px;width: 110%;">
						<div class="control-group">
							<label class="control-label">样例日志内容</label>
							<div class="controls">
								<pre id="dataExample1" ></pre>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">公共数据结构化</label>
							<div class="controls">
								<ul class="structConfig_public" id="structConfig_public1">
								</ul>
							</div>
						</div>
					</div>
				</form>
			</div>

			<!-- 第四步 -->
			<div class="hide">
				<div class="addLogPrivate-amlog" id="addLogPrivate">
					
				</div>
			</div>

			<!-- 第五步 -->
			<div class="hide">
				<div class="text-center">
					<i class="fa fa-check-circle" style="font-size: 144px;color: #52c22b;margin: 30px;"></i>
					<p style="font-size: 18px;">保存成功</p>
				</div>
			</div>
		</div>
		<div class="step-button-content">
			<button type="button" class="cancelBtn" id="prevStep">取消</button>
			<button type="button" class="confirmBtn disabled" id="nextStep">下一步</button>
		</div>
	</div>
</div>


























