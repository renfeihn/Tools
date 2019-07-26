<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
section.dataInsert-title:before{
	content: attr(data-title);
	height: 14px;
	line-height: 14px;
	text-align: left;
	display: block;
	border-left: 5px solid #55a8fd;
	margin: 10px 0 0 120px;
	padding-left: 3px;
	font-size: 14px;
	font-weight: bold;
	margin-bottom: 10px;
}
.dataInsert-logDisting{
	display: flex;
	margin-left: 120px;
}
.dataInsert-logDisting>span{
	padding: 0 15px;
	height: 24px;
	line-height: 24px;
	border-radius: 15px;
	border: 1px solid #55a8fd;;
	background-color: #fff;
	color: #55a8fd;
	text-align: center;
	margin: 0 10px 10px 0;
	font-size: 12px;
	cursor: pointer;
}
.dataInsert-logDisting>span:hover{
	background-color: #55a8fd;
	color: #fff;
}
input.dataInsert-ruleCheckBox{
	margin: 0 5px;
}
input.dataInsert-ruleCheckBox+label {
	display: inline-block;
	margin: 0;
}
.dataInsert-formWrap.form-horizontal .control-label{
	width: 100px;
}
.dataInsert-formWrap.form-horizontal .controls {
    margin-left: 120px;
}
.dataInsert-formWrap.form-horizontal .controls>select {
	width: 206px;
}

.dataInsert-mergerCondition>p{
	margin-left: 120px;
	background: #ddebf7;
	height: 24px;
	line-height: 24px;
}
.dataInsert-mergerCondition>p:before{
	content: '*';
	color: #ff9a22;
    margin: 0 4px;
}
.dataInsert-mergerCondition .controls>*{
	float: left;
}
.dataInsert-mergerCondition .controls>div{
	width: calc(100% - 276px);
}
.dataInsert-mergerCondition .controls>div.dataInsert-keyFlag>input{
	width: 100%;
}
.dataInsert-mergerCondition .controls>div.dataInsert-startEndFlag{
	display: none;
}
.dataInsert-mergerCondition .controls>div.dataInsert-startEndFlag>input{
	width: 50%;
}
.dataInsert-mergerCondition .controls>button.cancelBtn{
	float: right;
	height: 24px;
	line-height: 24px;
}
.dataInsert-XMLRuleWrap,
.dataInsert-stringRuleWrap,
.dataInsert-regRuleWrap{
	background-color: #f2f2f2;
	padding: 10px;
}
.dataInsert-XMLRuleWrap>button,
.dataInsert-stringRuleWrap>button,
.dataInsert-regRuleWrap>div>button{
	width: 80px;
	border-radius: 5px;
	line-height: 14px;
}
.dataInsert-stringRuleWrap>table tbody tr>td:last-child a,
.dataInsert-regRuleWrap>table tbody tr>td:last-child a{
	color: #55a8fd;
	margin-right: 10px;
}
.dataInsert-regRuleWrap>div{
	background-color: #f2f2f2;
	box-sizing: border-box;
	margin-top: 10px;
}
.dataInsert-regRuleWrap>div>p{
	margin: 0;
	font-size: 12px;
	height: 20px;
	line-height: 20px;
	margin-bottom: 5px;
}
.dataInsert-regRuleWrap>div>p:before{
	content: '*';
	color: #ff9a22;
	margin: 0 4px;
}
.dataInsert-regRuleWrap>div>textarea{
	width: 100%;
}
.dataInsert-regRuleWrap>div>a{
	color: #55a8fd;
	text-decoration: underline;
	font-size:12px;
}
.dataInsert-stringRuleWrap select{
	width: 206px;
}
.dataInsert-fieldCtn{
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
	border-top: 1px dashed #86859d;
}
.dataInsert-selectFieldCtn span,
.dataInsert-fieldCtn>span{
	display: flex;
	align-items: center;
}
.dataInsert-selectFieldCtn span>*,
.dataInsert-fieldCtn>span>*{
	margin: 0;
}
.dataInsert-selectFieldCtn span:after,
.dataInsert-fieldCtn>span:after{
	content: attr(data-title);
	font-size: 12px;
	height: 24px;
	line-height: 24px;
	text-align: center;
	background-color: #f2f2f2;
	border: 1px solid #c7c6cc;
	box-sizing: border-box;
	padding: 0 10px;
}
.dataInsert-selectFieldCtn{
	display: flex;
	justify-content: space-between;
}
.dataInsert-selectFieldCtn>div{
	display: none;
	width: calc((100% - 276px)/2 + 276px);
	justify-content: space-between;
}
.dataInsert-selectFieldCtn>div:nth-child(2){
	display: flex;
}
.dataInsert-inputDiv{
    position: absolute;
    display: none;
    flex-wrap: wrap;
    max-height: 150px;
    overflow-y: auto;
    width: 206px;
    top: 24px;
    background-color: #fff;
    border: 1px solid #a9a9a9;
    box-sizing: border-box;
    z-index: 1;
}
.dataInsert-inputDiv>span{
	display: block;
	width: 100%;
	padding-left: 10px;
    box-sizing: border-box;
	border-bottom: 1px solid #a9a9a9;
	color: #5c5a66;
}
.dataInsert-ruleConfirm{
	margin: 0 0 0 120px;
}
.dataInsert-ruleConfirm>div{
	padding: 10px;
	background: #e3eff9;
	margin-bottom: 10px;
}
.dataInsert-ruleConfirm>div p{
	display: flex;
	align-items: center;
	position: relative;
}
.dataInsert-ruleConfirm>div p>i{
	font-size: 20px;
	cursor: pointer;
	color: #666
}
.dataInsert-ruleConfirm>div p>i.fa-times-circle{
	position: absolute;
	right: 20px;
}
.dataInsert-ruleConfirm>div p>span{
	margin: 0 10px;
}
.dataInsert-ruleConfirm>div>table{
	display: none;
}
</style>

<section class="panel">
	<p class="title">数据接入</p>
	<div class="content">
		<form class="form-horizontal dataInsert-formWrap">
			<section class="dataInsert-title" data-title="规则定义">
				<div class="control-group">
					<label for="input1" class="control-label required">规则名称</label>
					<div class="controls">
						<input type="text" id="input1" placeholder="这里是必输的" />
					</div>
				</div>
				<div class="control-group">
					<label for="input1" class="control-label required">规则描述</label>
					<div class="controls">
						<textarea name="" id="" cols="30" rows="5" style="width: 100%"></textarea>
					</div>
				</div>
			</section>
			<section class="dataInsert-title" data-title="日志识别" style="display: flow-root;">
				<div class="dataInsert-logDisting">
					<span>本地选择</span><span>远程选择</span><span>采集选择</span>
				</div>
				<div class="control-group">
					<label for="input1" class="control-label">日志示例</label>
					<div class="controls">
						<textarea name="" id="" cols="30" rows="5" style="width: 100%"></textarea>
					</div>
				</div>
				<div class="control-group" style="width: 50%;float: left;position: relative;">
					<label for="logRowRule" class="control-label required">日志行规则</label>
					<div class="controls">
						<input type="text" id="rowRule" name="logRowRule" placeholder="日志行规则" autocomplete="off" />
						<div class="dataInsert-inputDiv">
							<span>划选辅助</span>
						</div>
					</div>
				</div>
				<div class="control-group" style="width: 50%;float: left;position: relative;">
					<label for="logLevelRule" class="control-label required">日志行级别规则</label>
					<div class="controls">
						<input type="text" id="rowLevelRule" name="logLevelRule" placeholder="日志行级别规则" autocomplete="off"/>
						<div class="dataInsert-inputDiv">
							<span>划选辅助</span>
							<span>无级别</span>
						</div>
					</div>
				</div>
				<div class="control-group" style="width: 50%;float: left;position: relative;">
					<label for="rowDateRule" class="control-label required">日志行日期规则</label>
					<div class="controls">
						<input type="text" id="rowDateRule" name="rowDateRule" placeholder="日志行日期规则"  autocomplete="off"/>
						<div class="dataInsert-inputDiv">
							<span>划选辅助</span>
							<span>使用采集日期</span>
						</div>
					</div>
				</div>
				<div class="control-group" style="width: 50%;float: left;position: relative;">
					<label for="rowTimeRule" class="control-label required">日志行时间规则</label>
					<div class="controls">
						<input type="text" id="rowTimeRule" placeholder="使用采集日期"  autocomplete="off"/>
						<div class="dataInsert-inputDiv">
							<span>划选辅助</span>
							<span>使用采集日期</span>
						</div>
					</div>
				</div>
			</section>
			<section class="dataInsert-title" data-title="字段提取">
				<div class="dataInsert-ruleConfirm" id="ruleConfirm"></div>
				<div class="control-group" style="float: left;">
					<label for="dataSource" class="control-label required">数据来源</label>
					<div class="controls">
						<select name="dataSource" id="dataSource">
							<option value="1" data-type="@日志内容">@日志内容</option>
							<option value="2">@日志目录</option>
							<option value="3">@日志行日期</option>
							<option value="4">@日志行时间</option>
						</select>
					</div>
				</div>
				<div class="control-group" style="float: left;width: calc(100% - 326px);" id="dataFilterDiv">
					<label for="dataFilter" class="control-label required">数据筛选</label>
					<div class="controls">
						<select name="dataFilterSelect" id="dataFilter" style="float: left;">
							<option value="1">包含</option>
							<option value="2">长度大于</option>
							<option value="3">长度小于</option>
							<option value="4">匹配正则表达式</option>
						</select>
						<input type="text" id="dataFilterInput" placeholder="值" autocomplete="off" style="width: calc(100% - 206px);" />
					</div>
				</div>
				<div class="control-group" style="clear: both;">
					<label for="input1" class="control-label required">解析方式</label>
					<div class="controls">
						<select name="" id="analyzeMethod">
							<option value="APACHE">APACHE</option>
							<option value="XML" data-type="XML">XML</option>
							<option value="JSON">JSON</option>
							<option value="分隔符">分隔符</option>
							<option value="定长">定长</option>
							<option value="TAG">TAG</option>
							<option value="ISO8583">ISO8583</option>
							<option value="BITMAP">BITMAP</option>
							<option value="SELF">SELF</option>
							<option value="MAP">MAP</option>
							<option value="CSV">CSV</option>
							<option value="正则表达式" data-type="regExpression">正则表达式</option>
							<option value="字符串函数" data-type="stringFn">字符串函数</option>
						</select>
					</div>
				</div>
				<div class="dataInsert-logDisting" style="margin-top: 10px;">
					<span id="addAnalyzeMethod">添加解析方式</span>
				</div>
			</section>
			<section class="dataInsert-title" data-title="日志合并">
				<div class="dataInsert-logDisting">
					<span id="addMergerType">添加合并方式</span>
				</div>
				<div id="mergerWrap"></div>
			</section>
		</form>
	</div>
</section>


<!-- 正则表达式 -->
<div id="regExpressionModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 1000px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">正则表达式字段提取</h3>
	</div>
	<div class="modal-body">
		<div class="dataInsert-regRuleWrap">
			<table id="regTable" class="display dataTable table">
				<thead>
					<tr>
						<th>字段名称</th>
						<th>字段描述</th>
						<th>表达式</th>
						<th>类型</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			<div>
				<p>正则表达式</p>
				<textarea id="regExpress" style="resize: none;" rows="4"></textarea>
				<a href="#">划选辅助</a>
				<div class="dataInsert-fieldCtn">
					<span data-title="字段名称">
						<input type="text" name="regName" id="regName" autocomplete="off">
					</span>
					<span data-title="字段描述">
						<input type="text" name="regDesc" id="regDesc" autocomplete="off">
					</span>
					<span data-title="字段类型">
						<select name="" id="regType" style="float: left;">
							<option value="1">包含</option>
							<option value="2">长度大于</option>
							<option value="3">长度小于</option>
							<option value="4">匹配正则表达式</option>
						</select>
					</span>
				</div>
				<button type="button" class="btn confirm">确定</button>
				<button type="button" class="btn cancel">放弃</button>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="confirmBtn">确定规则</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
	</div>
</div>

<!-- 字符串函数 -->
<div id="stringFnModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 1000px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">字符串函数字段提取</h3>
	</div>
	<div class="modal-body">
		<div class="dataInsert-stringRuleWrap"> 
			<table id="stringRuleTable" class="display dataTable table">
				<thead>
					<tr>
						<th>字段名称</th>
						<th>字段描述</th>
						<th>拆分描述</th>
						<th>类型</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			<div class="dataInsert-selectFieldCtn" style="margin: 10px 0">
				<span data-title="截取函数">
					<select name="" id="cutString">
						<option value="字符串函数" data-type="stringCutFn">字符串函数</option>
						<option value="开始字符串函数" data-type="startCutFn">开始字符串函数</option>
						<option value="结束字符串函数" data-type="endCutFn">结束字符串函数</option>
						<option value="位置函数" data-type="posCutFn">位置函数</option>
						<option value="位置长度函数" data-type="posLenCutFn">位置长度函数</option>
					</select>
				</span>
				<div id="stringCutFn">
					<span data-title="开始串(正则)">
						<input type="text" name="" autocomplete="off">
					</span>
					<span data-title="截取长度">
						<input type="text" name="" autocomplete="off">
					</span>
				</div>
				<div id="startCutFn">
					<span data-title="结束串(正则)">
						<input type="text" name="" autocomplete="off">
					</span>
					<span data-title="截取长度">
						<input type="text" name="" autocomplete="off">
					</span>
				</div>
				<div id="endCutFn">
					<span data-title="结束串(正则)">
						<input type="text" name="" autocomplete="off">
					</span>
					<span data-title="结束串(正则)">
						<input type="text" name="" autocomplete="off">
					</span>
				</div>
				<div id="posCutFn">
					<span data-title="开始位置">
						<input type="text" name="" autocomplete="off">
					</span>
					<span data-title="结束位置">
						<input type="text" name="" autocomplete="off">
					</span>
				</div>
				<div id="posLenCutFn">
					<span data-title="开始位置">
						<input type="text" name="" autocomplete="off">
					</span>
					<span data-title="截取长度">
						<input type="text" name="" autocomplete="off">
					</span>
				</div>
				
			</div>
			<div class="dataInsert-fieldCtn">
				<span data-title="字段名称">
					<input type="text" name="stringName" id="stringName" autocomplete="off">
				</span>
				<span data-title="字段描述">
					<input type="text" name="stringDesc" id="stringDesc" autocomplete="off">
				</span>
				<span data-title="字段类型">
					<select name="" id="stringType">
						<option value="1">包含</option>
						<option value="2">长度大于</option>
						<option value="3">长度小于</option>
						<option value="4">匹配正则表达式</option>
					</select>
				</span>
			</div>
			<button type="button" class="btn confirm">确定</button>
			<button type="button" class="btn cancel">放弃</button>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="confirmBtn">确定规则</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
	</div>
</div>

<!-- XML -->
<div id="XMLModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 1000px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">XML字段提取</h3>
	</div>
	<div class="modal-body">
		<div class="dataInsert-XMLRuleWrap" id="XMLMethod"> 
			<div class="dataInsert-selectFieldCtn">
				<span data-title="数据截取方式">
					<select name="" id="dataCutType">
						<option value="正则匹配" data-type="regCutType">正则匹配</option>
						<option value="字符串匹配" data-type="stringCutType">字符串匹配</option>
						<option value="开始字符串函数" data-type="startCutType">开始字符串函数</option>
						<option value="结束字符串函数" data-type="endCutType">结束字符串函数</option>
						<option value="位置匹配" data-type="posCutType">位置匹配</option>
						<option value="位置长度匹配" data-type="posLenCutType">位置长度匹配</option>
					</select>
				</span>
				<div id="regCutType">
					<span data-title="正则表达式" style="width: 100%">
						<input type="text" name="" style="width: calc(100% - 82px)" autocomplete="off">
					</span>
				</div>
				<div id="stringCutType">
					<span data-title="开始串(正则)">
						<input type="text" name="" autocomplete="off">
					</span>
					<span data-title="截取长度">
						<input type="text" name="" autocomplete="off">
					</span>
				</div>
				<div id="startCutType">
					<span data-title="结束串(正则)">
						<input type="text" name="" autocomplete="off">
					</span>
					<span data-title="截取长度">
						<input type="text" name="" autocomplete="off">
					</span>
				</div>
				<div id="endCutType">
					<span data-title="结束串(正则)" autocomplete="off">
						<input type="text" name="" autocomplete="off">
					</span>
					<span data-title="结束串(正则)" autocomplete="off">
						<input type="text" name="" autocomplete="off">
					</span>
				</div>
				<div id="posCutType">
					<span data-title="开始位置">
						<input type="text" name="" autocomplete="off">
					</span>
					<span data-title="结束位置">
						<input type="text" name="" autocomplete="off">
					</span>
				</div>
				<div id="posLenCutType">
					<span data-title="开始位置">
						<input type="text" name="" autocomplete="off">
					</span>
					<span data-title="截取长度">
						<input type="text" name="" autocomplete="off">
					</span>
				</div>
				
			</div>
			<table id="XMLRuleTable" class="display dataTable table" style="margin: 10px 0">
				<thead>
					<tr>
						<th>字段路径</th>
						<th>字段名称</th>
						<th>字段描述</th>
						<th>字段类型</th>
						<th>选定</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
			<button type="button" class="btn confirm">确定</button>
			<button type="button" class="btn cancel">放弃</button>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="confirmBtn">确定规则</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
	</div>
</div>
