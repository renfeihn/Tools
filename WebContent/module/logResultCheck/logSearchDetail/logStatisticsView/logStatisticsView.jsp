<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="true"%>
<style>
.logSV-settingContent{
	width: 200px;
	flex: none;
	border-right: 1px solid #ebebed;
	height: 100%;
}

.logSV-settingContent p {
	margin: 0;
}
.logSV-settingContent select,
.logSV-settingContent input{
	width: 100%;
	margin: 0;
}
.logSV-settingContent input[type=checkBox]{
	width: auto;
}

.logSV-settingContent>p{
	height: 34px;
	line-height: 34px;
	background-color: #fafafc;
	border-bottom: 1px solid #ebebed;
	padding:0 10px;
}

.logSV-settingContent>div{
	padding:0 5px;
}

.logSV-run{
	display: inline-block;
	width: 0;
	height: 0;
	border-left: 14px solid #00b050;
	border-top: 7px solid transparent;
	border-bottom: 7px solid transparent;
	float: right;
	margin-top: 10px;
	cursor: pointer;
}

.logSV-typeSelect{
	border-bottom: 1px solid #ebebed;
}
.logSV-settingBlock{
	padding-top: 10px;
	padding-bottom: 5px;
	font-size: 12px;
}
.logSV-settingBlock>p{
	padding: 0 5px;
}


.logSVtmp-field{
	height: 30px;
    line-height: 30px;
    border: 1px solid var(--color-theme);
    padding: 0 5px;
    margin-bottom: 5px;
    cursor: pointer;
    font-size: 12px;
    font-weight: normal;
    display: flex;
    background: #fff;
    color: var(--color-theme);
}

.logSVtmp-field:hover .logSVtmp-removeField{
	display: inline-block;
}

.logSVtmp-field>span:nth-child(1){
	display: inline-block;
	width: calc(100% - 15px);
}

.logSVtmp-removeField{
	display: none;
}

.logSVtmp-addBtn{
	border: 1px solid var(--color-theme);
	color: var(--color-theme);
	display: block;
	width: 60px;
	height: 25px;
	line-height: 17px;
	text-align: center;
	cursor: pointer;
	font-size: 25px;
	border-radius: 5px;
	margin:10px 0;
}
.logSVtmp-addBtn:hover{
	color: white;
	background-color: var(--color-theme);
}
.logSVtmp-fieldFilterSetting{
	height: 22px;
    border: 1px solid #c7c6cd;
    padding: 0 5px;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: normal;
}

.logSVtmp-fieldFilterSetting input{
	margin: 0;
}


.logSVtmp-SegmentContent{
	display: flex;
	font-size: 12px;
	font-weight: normal;
	border: 1px solid #c7c6cd;
	margin-bottom: 5px;
}
.logSVtmp-SegmentContent>div{
	width: 20px;
	flex: none;
}
.logSVtmp-SegmentContent>div:nth-child(2){
	flex: auto;
}
.logSVtmp-SegmentContent>div>span{
	display: block;
	text-align: center;
	height: 50%;
	line-height: 22px;
	border-right: 1px solid #c7c6cd;
}
.logSVtmp-SegmentContent>div>input{
	width: 100%;
	margin: 0;
	border: none;
	border-radius: 0;
}

.logSVtmp-SegmentContent>div>span:nth-child(1),
.logSVtmp-SegmentContent>div>input:nth-child(1){
	border-bottom: 1px solid #c7c6cd;
}
.logSVtmp-SegmentRemove{
	text-align: center;
	border-left: 1px solid #c7c6cd;
	line-height: 48px;
	cursor: pointer;
}

.logSVtmp-timeInterval{
	display: flex; 
	border: 1px solid #c7c6cd;
}
.logSVtmp-timeInterval>input{
	border: none; 
	border-right: 1px solid #c7c6cd;
	border-radius: 0;
	margin:0;
}
.logSVtmp-timeInterval>input:focus{
	border-right: 1px solid #c7c6cd;
}
.logSVtmp-timeInterval>select{
	width: 50px;
	flex: none;
	border: none;
	margin:0;
}

.echartsButtons{
	position: absolute;
	top: 10px;
	right: 35px;
	z-index: 5;
	font-size: 16px;
}
.echartsButtons i{
	cursor: pointer;
	color: #c7c6cd;
}
.echartsButtons i:hover{
	color: var(--color-theme);
}
.logSV-echarts{
	width: 100%;
	height: 100%;
}
</style>
<div style="width: 100%;height: 100%;display: flex;">
	<div id="settingContent" class="logSV-settingContent">
		<p>统计面板 <span id="drawEcharts" class="logSV-run" title="运行"></span></p>
		<div style="height: calc(100% - 34px);overflow-y: auto;">
			<div id="typeSelect" class="logSV-typeSelect">
				
			</div>
			<div id="typeContent" class="logSV-typeContent">
				
			</div>
		</div>
	</div>
	<div class="echartsButtons"><i id="download" class="fa fa-download" title="下载"></i><i id="saveEcharts" class="fa fa-dashboard" title="保存图表到仪表盘" style="margin-left: 10px;"></i></div>
	<div style="flex: auto;padding: 20px; padding-right: 10px; box-sizing: border-box;height: 100%;">
		<div id="echarts" class="logSV-echarts"></div>
	</div>
</div>
<div id="modal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 900px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">保存到仪表盘</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal">
			<div class="control-group">
				<label for="input1" class="control-label required">图表名称</label>
				<div class="controls">
					<input type="text" id="name" style="width: 90%" />
				</div>
			</div>
			<div class="control-group">
				<label for="interval" class="control-label required">数据更新周期</label>
				<div class="controls">
					<input type="number" id="interval" value="1" style="width: 80%" />分钟
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label required">时间筛选</label>
				<div class="controls">
					<label class="radio inline"><input type="radio" name="timeType" value="0" checked>自动匹配</label>
					<label  class="radio inline"><input type="radio" name="timeType" value="1">固定值</label>
					<label  class="radio inline"><input type="radio" name="timeType" value="2">当天</label>
					<label  class="radio inline"><input type="radio" name="timeType" value="3">本周</label>
					<label  class="radio inline"><input type="radio" name="timeType" value="4">本月</label>
					<label  class="radio inline"><input type="radio" name="timeType" value="5">本年</label>
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label">预览</label>
				<div class="controls">
					<img id="echartsP" src="" alt="" style="width: 90%; height: 200px;">
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确定</button>
	</div>
</div>


<script id="logSVtmp-select" type="text/x-handlebars-template">
	<div class="logSV-settingBlock">
		<p>{{title}}</p>
		<select data-role="{{role}}">
			{{#if defaultNotSelect}}
				<option>请选择</option>
			{{/if}}

			{{#each typeSelset}}
				{{#if_eq this.value ../defaultValue}}
					<option title="{{this.desc}}" value="{{this.value}}" selected>{{this.name}}</option>
				{{else}}
					<option title="{{this.desc}}" value="{{this.value}}">{{this.name}}</option>
				{{/if_eq}}
			{{/each}}
		</select>
	</div>
</script>

<script id="logSVtmp-input" type="text/x-handlebars-template">
	<div class="logSV-settingBlock">
		<p>{{title}}</p>
		{{#if defaultValue}}
			<input type="{{inputType}}" data-role="{{role}}" value="{{defaultValue}}">
		{{else}}
			<input type="{{inputType}}" data-role="{{role}}">
		{{/if}}
	</div>
</script>

<script id="logSVtmp-add" type="text/x-handlebars-template">
	<div class="logSV-settingBlock">
		<p>{{title}}</p>
		<div>
			<span btn-role="{{role}}" class="logSVtmp-addBtn">+</span>
			{{#if filterSetting}}
				{{#each filterSetting}}
					<div class="logSVtmp-fieldFilterSetting">
						<input data-role={{this.role}} type="checkBox" data="{{this.text}}"> {{this.text}}
					</div>
				{{/each}}
			{{/if}}
		</div>
	</div>
</script>

<script id="logSVtmp-onlySelect" type="text/x-handlebars-template">
	<select data-role="{{role}}">
		{{#if defaultNotSelect}}
			<option>请选择</option>
		{{/if}}

		{{#each typeSelset}}
			{{#if_eq this.value ../defaultValue}}
				<option value="{{this.value}}" title="{{this.desc}}" selected>{{this.name}}</option>
			{{else}}
				<option value="{{this.value}}" title="{{this.desc}}">{{this.name}}</option>
			{{/if_eq}}
		{{/each}}
	</select>
</script>

<script id="logSVtmp-fields" type="text/x-handlebars-template">
	<div class="logSVtmp-field"><span data-role="field">{{fields}}</span><span class="logSVtmp-removeField">x</span></div>
</script>

<script id="logSVtmp-Segment" type="text/x-handlebars-template">
	<div class="logSVtmp-SegmentContent">
		<div>
			<span>从</span>
			<span>到</span>
		</div>
		<div>
			{{#if readonly}}
				<input data-role="{{role}}" type="{{inputType}}" readonly>
				<input data-role="{{role}}" type="{{inputType}}" readonly>
			{{else}}
				<input data-role="{{role}}" type="{{inputType}}">
				<input data-role="{{role}}" type="{{inputType}}">
			{{/if}}
		</div>
		<div title="移除" class="logSVtmp-SegmentRemove">
			X
		</div>
	</div>	
</script>

<script id="logSVtmp-timeInterval" type="text/x-handlebars-template">
	<div class="logSV-settingBlock">
		<p>{{title}}</p>
		<div class="logSVtmp-timeInterval">
			{{#if defaultValue}}
				<input data-role="{{role}}" value="{{defaultValue}}" type="text">
			{{else}}
				<input data-role="{{role}}" type="text">
			{{/if}}
			<select data-role="{{select.role}}">
				{{#if select.defaultNotSelect}}
					<option>请选择</option>
				{{/if}}

				{{#each select.typeSelset}}
					{{#if_eq this.value ../select.defaultValue}}
						<option title="{{this.desc}}" value="{{this.value}}" selected>{{this.name}}</option>
					{{else}}
						<option title="{{this.desc}}" value="{{this.value}}">{{this.name}}</option>
					{{/if_eq}}
				{{/each}}
			</select>
		</div>
	</div>
</script>

