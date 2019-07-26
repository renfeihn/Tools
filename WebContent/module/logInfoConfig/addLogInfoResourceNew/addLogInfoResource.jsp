<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="true"%>
<style>
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
	.addLogInfoResourceNew-btn{
		position: fixed;
	    bottom: 16px;
	    right: 20px;
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
</style>
<div class="step-content" style="position: relative;">
	<form id="step2form" class="form-horizontal" style="width: 910px;margin: 0 auto;">
		<div class="control-group">
			<label for="logName" class="control-label required">日志源名称</label>
			<div class="controls">
				<input type="text" disabled name="logName" id="logName" autocomplete="off" placeholder="日志源名称不可重复" />
			</div>
		</div>

		<div class="control-group">
			<label class="control-label required">所属应用系统</label>
			<div class="controls">
				<select name="app" disabled id="app" class="select-css" style="width: 180px;" ></select>
			</div>
		</div>

		<div class="control-group">
			<label for="category" class="control-label required">所属资源分类</label>
			<div class="controls">
				<div style="position: relative;">
					<input type="text" disabled id="category" class="select-css" placeholder="" data-toggle="dropdown" style="cursor: pointer;" />
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

		<div class="control-group">
			<label class="control-label required">压缩发送</label>
			<div class="controls">
				<span class="boolean-switch" id="compress"></span>
			</div>
		</div>

		<div data-type="1">
			<div class="control-group">
				<label class="control-label required">来源IP对象</label>
				<div class="controls" id="ipConfigList">
					
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">日志文件目录</label>
				<div class="controls">
					<input type="text" autocomplete="off" id="logdir">
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
					<input type="number" min="0" id="fileSize" name="fileSize" value="256" autocomplete="off" style="width: 180px;">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">刷新时间(秒)</label>
				<div class="controls">
					<input type="number" min="-1" id="flushLastSecd" name="flushLastSecd" value="-1" autocomplete="off" style="width: 180px;">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">过期时间(小时)</label>
				<div class="controls">
					<input type="number" min="-1" id="filterFileHours" name="filterFileHours" value="24" autocomplete="off" style="width: 180px;">
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
				<label class="control-label required">接受级别</label>
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
						<input type="radio" name="version" value="V1"><span style="font-size: 14px;">V1</span>
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
					<select class="select-css" style="width: 180px;"  data-role="jdbcType">
						<option value="Oracle">Oracle</option>
						<option value="Mysql">Mysql</option>
						<option value="SQLServer">SQLServer</option>
					</select>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">IP端口</label>
				<div class="controls">
					<div class="controls" id="ipConfigList_jdbc" style="margin-left: -20px;">
								
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
						<input type="radio" id="a" value="0" name="mowei"  data-role="orderType"><span style="font-size: 14px;">asc</span>
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
	<div class="addLogInfoResourceNew-btn">
		<button id="saveBtn" class="confirmBtn">保存</button>
	</div>
</div>

