<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="true"%>
<style>
.logSSSV-sqlSearch{
	display: flex;
	width: 100%;
	height: 100%;
}
.logSSSV-sqlSearchLeft{
	width: 45px;
	height: 100%;
	flex: none;
	background-color: #ebedf5;
	border-right: 1px solid #e1e3eb;
	height: 100%;
}
.logSSSV-sqlSearchRight{
	background-color: #fafafc;
	height: 100%;
	flex: auto;
	overflow-y: auto;
	display: flex;
	padding:0 10px;
}
.logSSSV-sqlSearchLeft>span{
	width: 100%;
	height: calc(100%/8);
	display: block;
	cursor: pointer;
}

.logSSSV-sqlSearchLeft>span.charTable{
	background: url(img/logSSSV/table.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charTable.active,
.logSSSV-sqlSearchLeft>span.charTable:hover{
	background: #fff url(img/logSSSV/tableblue.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.chartsLoad{
	background: url(img/logSSSV/line.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.chartsLoad.active,
.logSSSV-sqlSearchLeft>span.chartsLoad:hover{
	background: #fff url(img/logSSSV/lineblue.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charLine{
	background: url(img/logSSSV/line.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charLine.active,
.logSSSV-sqlSearchLeft>span.charLine:hover{
	background: #fff url(img/logSSSV/lineblue.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charPie{
	background: url(img/logSSSV/pie.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charPie.active,
.logSSSV-sqlSearchLeft>span.charPie:hover{
	background: #fff url(img/logSSSV/pieblue.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charLinepool{
	background: url(img/logSSSV/linepool.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charLinepool.active,
.logSSSV-sqlSearchLeft>span.charLinepool:hover{
	background: #fff url(img/logSSSV/linepoolblue.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charBar{
	background: url(img/logSSSV/bar.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charBar.active,
.logSSSV-sqlSearchLeft>span.charBar:hover{
	background: #fff url(img/logSSSV/barblue.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charBar2{
	background: url(img/logSSSV/bar2.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charBar2.active,
.logSSSV-sqlSearchLeft>span.charBar2:hover{
	background: #fff url(img/logSSSV/bar2blue.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charScatter{
	background: url(img/logSSSV/scatter.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charScatter.active,
.logSSSV-sqlSearchLeft>span.charScatter:hover{
	background: #fff url(img/logSSSV/scatterblue.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charScatter2{
	background: url(img/logSSSV/scatter2.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charScatter2.active,
.logSSSV-sqlSearchLeft>span.charScatter2:hover{
	background: #fff url(img/logSSSV/scatter2blue.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charNum{
	background: url(img/logSSSV/num.png) no-repeat center center;
}
.logSSSV-sqlSearchLeft>span.charNum.active,
.logSSSV-sqlSearchLeft>span.charNum:hover{
	background: #fff url(img/logSSSV/numblue.png) no-repeat center center;
}
.logSSSV-sqlSearchRight>div{
	height: calc(100% - 2px);
}
.logSSSV-settingContent{
	width: 200px;
	flex: none;
	border-right: 1px solid #ebebed;
}

.logSSSV-settingContent p {
	margin: 0;
}
.logSSSV-settingContent select,
.logSSSV-settingContent input{
	width: 100%;
	margin: 0;
}
.logSSSV-settingContent input[type=checkBox]{
	width: auto;
}

.logSSSV-settingContent>p{
	height: 34px;
	line-height: 34px;
	background-color: #fafafc;
	border-bottom: 1px solid #ebebed;
	border-right: 1px solid #ebebed;
	padding:0 10px;
}

.logSSSV-settingContent>div{
	padding:0 5px;
}

.logSSSV-run{
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
/*
.logSSSV-typeSelect{
	border-bottom: 1px solid #ebebed;
}*/
.logSSSV-settingBlock{
	padding-top: 10px;
	padding-bottom: 5px;
	font-size: 12px;
}
.logSSSV-settingBlock>p{
	padding: 0 5px;
	font-weight: normal;
}
.logSSSV-panelP:before{
	content: '';
    width: 5px;
    height: 20px;
    display: inline-block;
    margin-right: 10px;
    background-color: #5266d7;
    margin-bottom: -3px;
}

.logSSSVtmp-field{
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

.logSSSVtmp-field:hover .logSSSVtmp-removeField{
	display: inline-block;
}

.logSSSVtmp-field>span:nth-child(1){
	display: inline-block;
	width: calc(100% - 15px);
	text-overflow : ellipsis; 
	white-space : nowrap; 
	overflow : hidden; 
}

.logSSSVtmp-removeField{
	display: none;
}

.logSSSVtmp-addBtn{
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
.logSSSVtmp-addBtn:hover{
	color: white;
	background-color: var(--color-theme);
}
.logSSSVtmp-fieldFilterSetting{
	height: 22px;
    border: 1px solid #c7c6cd;
    padding: 0 5px;
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: normal;
}

.logSSSVtmp-fieldFilterSetting input{
	margin: 0;
}


.logSSSVtmp-SegmentContent{
	display: flex;
	font-size: 12px;
	font-weight: normal;
	border: 1px solid #c7c6cd;
	margin-bottom: 5px;
}
.logSSSVtmp-SegmentContent>div{
	width: 20px;
	flex: none;
}
.logSSSVtmp-SegmentContent>div:nth-child(2){
	flex: auto;
}
.logSSSVtmp-SegmentContent>div>span{
	display: block;
	text-align: center;
	height: 50%;
	line-height: 22px;
	border-right: 1px solid #c7c6cd;
}
.logSSSVtmp-SegmentContent>div>input{
	width: 100%;
	margin: 0;
	border: none;
	border-radius: 0;
}

.logSSSVtmp-SegmentContent>div>span:nth-child(1),
.logSSSVtmp-SegmentContent>div>input:nth-child(1){
	border-bottom: 1px solid #c7c6cd;
}
.logSSSVtmp-SegmentRemove{
	text-align: center;
	border-left: 1px solid #c7c6cd;
	line-height: 48px;
	cursor: pointer;
}

.logSSSVtmp-timeInterval{
	display: flex; 
	border: 1px solid #c7c6cd;
}
.logSSSVtmp-timeInterval>input{
	border: none; 
	border-right: 1px solid #c7c6cd;
	border-radius: 0;
	margin:0;
}
.logSSSVtmp-timeInterval>input:focus{
	border-right: 1px solid #c7c6cd;
}
.logSSSVtmp-timeInterval>select{
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
}
.echartsButtons i{
	cursor: pointer;
	color: #c7c6cd;
	font-size: 14px;
}
.echartsButtons i:hover{
	color: var(--color-theme);
}
.logSSSV-echarts{
	width: calc(100vw - 547px);
	height: 100%;
}
.logSSSVtmp-tableFields{
	margin: 0;
	margin-top: 10px;
}
.logSSSVtmp-tableFields>li{
	height: 30px;
	line-height: 30px;
	padding:0 10px;
	box-sizing: border-box;
	display: flex;
	font-weight: normal;
}
.logSSSVtmp-tableFields>li>span{
	flex: auto;
	text-overflow : ellipsis; 
	white-space : nowrap; 
	overflow : hidden; 
}
.logSSSVtmp-tableFields>li>span:nth-child(2){
	color: var(--color-theme);
	display: none;
	flex: none;
}
.logSSSVtmp-tableFields>li:hover{
	background-color: #ebedf5;
}
.logSSSVtmp-tableFields>li:hover>span:nth-child(2){
	display: inline-block;
}
.logSSSVtmp-tableFields>li>span>i{
	width: 20px;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    margin-top: 6px;
}
.sqlSearchStatisticsView-new{
	width: 100%;
    height: 100%;
    background: #FFF;
    padding: 10px;
}
.sqlSearchStatisticsView-new-group{
	width: 100%;
	margin-bottom: 10px;
}
.sqlSearchStatisticsView-new-group>button{
	line-height: 16px;
}
.sqlSearchStatisticsView-new-group>button.active{
	box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
}
.drag-content-content{
	background: #fff;
    position: relative;
    margin-top: 20px;
    width: 45%;
    padding: 3px;
    height: 150px;
    border: 1px solid #CCC;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.drag-content-content:BEFORE{
	content: attr(data-before);
    display: block;
    position: absolute;
    top: -20px;
    line-height: 16px;
    left: -1px;
    padding: 2px 5px;
    background: #906EBD;
    color: #FFF;
    border-radius: 4px;
}
.drag-content-content:first-child {
	margin-right: 10%;
}
.drag-content{
	display: flex;
    justify-content: center
}
.field-content{
	border-bottom: 1px solid #EEEEEE;
    margin-bottom: 10px;
    padding-bottom: 10px;
    font-size: 12px;
}
.field-content-item{
	display: inline-block;
    padding: 0px 8px;
    background: #EFEFEF;
    line-height: 22px;
    border-radius: 2px;
    color: #333333;
    cursor: move;
    margin-right: 10px;
    margin-bottom: 10px;
}
.select-field-item{
	display: inline-block;
    padding: 2px 8px;
    font-size: 12px;
    background: #387BD3;
    color: #FFF;
    border-radius: 2px;
    margin: 0 10px 10px 0;
}
.field-content-item.active{
	color: #FFF;
    background: #4494FC;
}
.select-field-item>span.fa{
	margin-left: 10px;
	cursor: pointer;
}
.sqlSearchStatisticsView-new-echarts{
	width: 100%;
	height: 300px;
}
</style>
<div class="logSSSV-sqlSearch">
	<div id="sqlSearchList" class="logSSSV-sqlSearchLeft">
		<span char-type="table" class="charTable"></span>
		<span char-type="charts" class="chartsLoad"></span>
		<!-- <span char-type="line" class="charLine"></span>
		<span char-type="pie" class="charPie"></span>
		<span char-type="linepool" class="charLinepool"></span>
		<span char-type="bar" class="charBar"></span>
		<span char-type="bar2" class="charBar2"></span>
		<span char-type="scatter" class="charScatter"></span>
		<span char-type="scatter2" class="charScatter2"></span>
		<span char-type="num" class="charNum"></span> -->
	</div>
	<div id="sqlSearchStatisticsView" class="logSSSV-sqlSearchRight">
		<div id="settingContent" class="logSSSV-settingContent">
			<p>统计面板 <span id="drawEcharts" class="logSSSV-run" title="运行"></span></p>
			<div style="height: calc(100% - 34px);overflow-y: auto;">
				<!-- <div id="typeSelect" class="logSSSV-typeSelect">
					
				</div> -->
				<div id="typeContent" class="logSSSV-typeContent">
					
				</div>
			</div>
		</div>
		<div class="echartsButtons"><i id="download" class="fa fa-download" title="下载"></i><i id="saveEcharts" class="fa fa-dashboard" title="保存图表到仪表盘" style="margin-left: 10px;"></i></div>
		<!-- <div class="echartsButtons"><i id="saveEcharts" class="fa fa-download" title="保存图表到仪表盘"></i></div> -->
		<div style="flex: auto;padding: 20px; padding-right:10px; box-sizing: border-box;height: 100%;">
			<div id="echarts" class="logSSSV-echarts"></div>
			<div id="sqlSearchTable">
				<table id="statisticalTable" style="width: 100%;">
					
				</table>
			</div>
		</div>
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
					<input type="text" id="interval" value="1" style="width: 80%" />分钟
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label required">时间筛选</label>
				<div class="controls">
					<label class="radio inline"><input type="radio" name="timeType" value="0" checked>自动匹配</label>
					<label  class="radio inline"><input type="radio" name="timeType" value="1">固定值</label>
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

<script id="logEcharts-panel" type="text/x-handlebars-template">
		<div class="sqlSearchStatisticsView-new">
			<div class="btn-group sqlSearchStatisticsView-new-group">
				<button class="btn btn-default btn-sm ng-binding ng-scope active" data-type="1" title="折线图">
					<i class="fa fa-line-chart"></i>
				</button>
				<button class="btn btn-default btn-sm ng-binding ng-scope" data-type="2" title="柱状图">
					<i class="fa fa-bar-chart"></i>
				</button>
				<button class="btn btn-default btn-sm ng-binding ng-scope" data-type="3" title="饼状图">
					<i class="fa fa-pie-chart"></i>
				</button>
				<button class="btn btn-default btn-sm ng-binding ng-scope" data-type="5" title="面积图">
					<i class="fa fa-area-chart"></i>
				</button>
				<button class="btn btn-default btn-sm ng-binding ng-scope" data-type="4" title="散点图">
					<i class="fa fa-line-chart"></i>
				</button>
				<div class="echartsButtons"><i id="download" class="fa fa-download" title="下载"></i><i id="saveEcharts" class="fa fa-dashboard" title="保存图表到仪表盘" style="margin-left: 10px;"></i></div>
			</div>
			<div class="sqlSearchStatisticsView-new-content">
				<section class="panel">
					<p class="title">配置项</p>
					<div class="content">
						<div class="field-content" id="fieldContent">
							{{#each colDataGloabel}}
								<span class="field-content-item" draggable="true" title="{{this.name}}">{{this.data}}</span>
							{{/each}}
						</div>
						<div class="drag-content" id="selectField">
							<div class="drag-content-content" data-before="指标" data-type="1"></div>
							<div class="drag-content-content" data-before="维度" data-type="0"></div>
						</div>
					</div>
					<div class="sqlSearchStatisticsView-new-echarts" id="newEchartsLog"></div>
				</section>
			</div>
		</div>
</script>

<script id="logSSSVtmp-panel" type="text/x-handlebars-template">
	<div class="logSSSV-settingBlock" style="border-bottom: 1px solid #ebebed;">
		<p class="logSSSV-panelP">{{title}}</p>
		<div content-role="{{role}}">
			
		</div>
	</div>
</script>

<script id="logSSSVtmp-select" type="text/x-handlebars-template">
	<div class="logSSSV-settingBlock">
		<p>{{title}}</p>
		<select data-role="{{role}}">
			{{#if defaultNotSelect}}
				<option>请选择</option>
			{{/if}}

			{{#each typeSelset}}
				{{#if_eq this.value ../defaultValue}}
					<option value="{{this.value}}" selected>{{this.name}}</option>
				{{else}}
					<option value="{{this.value}}">{{this.name}}</option>
				{{/if_eq}}
			{{/each}}
		</select>
	</div>
</script>

<script id="logSSSVtmp-input" type="text/x-handlebars-template">
	<div class="logSSSV-settingBlock">
		<p>{{title}}</p>
		{{#if defaultValue}}
			<input type="{{inputType}}" data-role="{{role}}" value="{{defaultValue}}">
		{{else}}
			<input type="{{inputType}}" data-role="{{role}}">
		{{/if}}
	</div>
</script>

<script id="logSSSVtmp-add" type="text/x-handlebars-template">
	<div class="logSSSV-settingBlock">
		<p>{{title}}</p>
		<div>
			<span btn-role="{{role}}" class="logSSSVtmp-addBtn">+</span>
			{{#if filterSetting}}
				{{#each filterSetting}}
					<div class="logSSSVtmp-fieldFilterSetting">
						<input data-role={{this.role}} type="checkBox" data="{{this.text}}"> {{this.text}}
					</div>
				{{/each}}
			{{/if}}
		</div>
	</div>
</script>

<script id="logSSSVtmp-onlySelect" type="text/x-handlebars-template">
	<select data-role="{{role}}">
		{{#if defaultNotSelect}}
			<option>请选择</option>
		{{/if}}

		{{#each typeSelset}}
			{{#if_eq this.value ../defaultValue}}
				<option value="{{this.value}}" selected>{{this.name}}</option>
			{{else}}
				<option value="{{this.value}}">{{this.name}}</option>
			{{/if_eq}}
		{{/each}}
	</select>
</script>

<script id="logSSSVtmp-fields" type="text/x-handlebars-template">
	<div class="logSSSVtmp-field"><span data-role="field">{{fields}}</span><span class="logSSSVtmp-removeField">x</span></div>
</script>

<script id="logSSSVtmp-Segment" type="text/x-handlebars-template">
	<div class="logSSSVtmp-SegmentContent">
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
		<div title="移除" class="logSSSVtmp-SegmentRemove">
			X
		</div>
	</div>	
</script>

<script id="logSSSVtmp-timeInterval" type="text/x-handlebars-template">
	<div class="logSSSV-settingBlock">
		<p>{{title}}</p>
		<div class="logSSSVtmp-timeInterval">
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
						<option value="{{this.value}}" selected>{{this.name}}</option>
					{{else}}
						<option value="{{this.value}}">{{this.name}}</option>
					{{/if_eq}}
				{{/each}}
			</select>
		</div>
	</div>
</script>
<script id="logSSSVtmp-tableFields" type="text/x-handlebars-template">
	<div class="logSSSV-settingBlock">
		<p>{{title}}</p>
		<ul role="{{role}}" class="logSSSVtmp-tableFields">
			{{#each fields}}
				<li title="{{this.title}}"><span>{{this.name}}</span><span><i class="fa fa-arrow-circle-up"></i></span></li>
			{{/each}}
		</ul>
	</div>
</script>
<script id="logSSSVtmp-tableFields-new" type="text/x-handlebars-template">
	<div class="logSSSV-settingBlock">
		<p>{{title}}</p>
		<ul role="{{role}}" class="logSSSVtmp-tableFields">
			{{#each fields}}
				<li title="{{this.desc}}"><span>{{this.name}}</span><span><i class="fa fa-arrow-circle-up"></i></span></li>
			{{/each}}
		</ul>
	</div>
</script>

