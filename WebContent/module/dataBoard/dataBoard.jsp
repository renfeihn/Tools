<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	@import 'css/dashboard/jquery.gridster.css';
	@import 'css/dashboard/dashboard.css';
	.gridster {
		min-height: 100%;
		width: 100%;
	}
	.dataBoard-section{
		height: calc(100vh - 42px);
	}
	.dataBoard-section-content{
		height: 95%;
	    box-sizing: border-box;
	    padding: 0 !important;
	    background: #E8EBED;
	    overflow: auto;
	}
	.dataBoard-container{
		min-height: 100%;
		background: #E8EBED;
	}
	.stage .highLight {
    	border: 5px solid #0A9EE6 !important;
	}
	
	
	/*三级分类选择start*/
	.components-log-container .components-log-accessLogContent {
		position: relative;
	    color: #5c5a66;
	    z-index: 1;
	    font-size: 12px;
	    background-color: #fff;
	}
	.components-log-container .components-log-accessLogContent>span{
	    width: 220px;
	    line-height: 38px;
	    display: block;
	    color: #5c5a66;
	    position: relative;
	    cursor: pointer;
	    padding: 0 60px 0 20px;
	}
	.components-log-container .components-log-accessLogContent>span>i{
		height: 100%;
	    width: 40px;
	    background-color: #f9f9fb;
	    line-height: 30px;
	    font-size: 20px;
	    position: absolute;
	    right: 0px;
	    text-align: center;
	    border-left: 1px solid #c7c6cd;
	    color: #c7c6cb;
	}
	.components-log-container .components-log-accessLogContent>div,
	.components-log-container .components-log-accessLogContent>ul{
		display: none;
		background-color: #fff;
	    border: 1px solid #c7c6cc;
	    position: relative;
	}
	.components-log-container .components-log-accessLogContent>ul{
	    box-shadow: -1px 1px 2px #c7c6cc;
	}
	.components-log-container .components-log-accessLogContent>div {
	    width: 600px;
	    box-shadow: 1px 1px 2px #c7c6cc;
	}
	.components-log-container .components-log-accessLogContent>div>div:first-child {
	    right: 10px;
	    bottom: 10px;
	    z-index: 2;
	    position: absolute;
	}
	.components-log-container .components-log-accessLogContent>div>div:first-child button.light {
	    background: #fff;
	    border-color: var(--color-theme);
	    color: var(--color-theme);
	}
	.components-log-container .components-log-accessLogContent>div>div:first-child button.light:hover {
	    background: var(--color-theme);
	    color: #FFFFFF;
	    border-color: var(--color-theme);
	}
	.components-log-container .components-log-accessLogContent>div>div:first-child button{
		cursor: pointer;
		width: 70px;
		height: 35px;
		margin-left: 10px !important;
	}
	.components-log-container .components-log-accessLogContent>div h5 {
	    font-weight: bold;
	    cursor: pointer;
	    width: auto;
	    display: inline-block;
	    line-height: 20px;
	    padding: 0 5px;
	}
	.components-log-container .components-log-accessLogContent>div h5:not(.active):not(.disabled):hover,
	.components-log-container .components-log-accessLogContent>div span:not(.active):not(.disabled):hover {
		text-decoration: underline;
	}
	.components-log-container .components-log-accessLogContent>div span.active,
	.components-log-container .components-log-accessLogContent>div h5.active {
		background-color: #e1e2f0;
	}
	.components-log-container .components-log-accessLogContent>div div>span {
	    color: #5e619f;
	    cursor: pointer;
	    flex: none;
	    position: absolute;
	    text-align: right;
	    right: 420px;
	    overflow: visible;
	    white-space: nowrap;
	    line-height: 20px;
	    padding: 0 5px;
	}
	.components-log-container .components-log-accessLogContent>div:nth-child(3) h5.disabled,
	.components-log-container .components-log-accessLogContent>div:nth-child(3) div>span.disabled{
		cursor: default;
	}
	.components-log-container .components-log-accessLogList{
		border-bottom: 1px dashed #eee;
		margin-top: 10px !important;
	}
	.components-log-container .components-log-accessLogList:after{
		content: '';
		clear: both;
		display: block;
	}
	.components-log-container .components-log-accessLogList>div{
		/*margin-left: 150px !important;
	    min-height: 30px;
	    position: relative;
	    top: -20px;*/
	    display: inline-block;
	    min-height: 30px;
	    float: right;
	    width: calc(100% - 180px);
	}
	.components-log-container .components-log-accessLogList>div>p{
		word-wrap: break-word;
	}
	
	.components-log-container .components-log-accessLogContent>div p>span {
	    display: inline-block;
	    cursor: pointer;
	    padding: 0 5px;
	    margin: 0 5px 5px 5px !important;
	    line-height: 20px;
	    word-break: break-all;
	}
	.components-log-container .components-log-accessLogContent>ul{
		width: 180px;
	    cursor: pointer;
	}
	.components-log-container .components-log-accessLogContent>ul>li {
		padding: 0 5px;
		height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.components-log-container .components-log-accessLogContent>ul>li.choosed:before {
	    content: '* ';
	}
	.components-log-container .components-log-accessLogContent>ul>li i {
	    position: absolute;
	    right: 5px;
	    top: 10px;
	    transform: translateY(10px);
	}
	.components-log-container .components-log-accessLogContent>ul>li.active {
		color: #505394;
	    background: #d7d8f0;
	}
	.components-log-container .components-log-accessLogContent>ul>li:hover{
		background: #ebedf4;
	}
	/*三级分类选择end*/
	
	/* 工具栏样式开始  */
	.components{
		position: absolute;
	    right: 20px;
	    display: flex;
	    height: 40px;
	    line-height: 49px;
	    display: flex;
	    align-items: center;
	}
	.components>div {
		margin: 0 10px;
		display: flex;
    	align-items: center;
    	cursor: pointer;
	}
	.selectCate-menu{
		position: fixed;
	    background: #FFF;
	    display: flex;
	    align-items: center;
	    width: 100px;
	    flex-wrap: wrap;
	    z-index: 10;
	    box-shadow: rgb(204, 204, 204) 4px 4px 8px;
	}
	.selectCate-menu>div {
		width: 100%;
	    padding: 0 10px;
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    cursor: pointer;
	    transition: all .3s linear;
	    color: #5C5A66;
	    font-size:  12px;
	}
	.selectCate-menu>div:HOVER{
		background: #EBEDF4;
	}
	.selectCate-menu>div>span {
		
	}
	.selectCate-menu>div>i {
		font-size: 12px;
	}
	.selectCate-level2-show{
	    width: 600px;
	    box-shadow: 1px 1px 2px #c7c6cc;
	    background-color: #fff;
	    border: 1px solid #c7c6cc;
	    position: fixed;
	    z-index: 10;
	    box-sizing: border-box;
	}
	.selectCate-level2-show>div {
		width: 100%;
	}
	/* 工具栏样式结束  */
	/*日期选择*/
	.components-times-dateRangeChoose{
		position: relative;
	    color: #5c5a66;
	    z-index: 10;
	    font-size: 12px;
	    background-color: #fff;
	    border-left: none !important;
	    border-right: none !important;
	}
	.components-times-dateRangeChoose>span{
		width: 320px;
		height: 38px;
		line-height: 38px;
		display: block;
		color: #5c5a66;
		position: relative;
		cursor: pointer;
		padding: 0 60px 0 20px;
		text-align: center;
	}
	.components-times-dateRangeChoose:after{
		content: '';
		height: 100%;
	    width: 40px;
	    position: absolute;
	    right: 0;
	    top: 0;
	    border-left: 1px solid #c7c6cd;
	    background: #f9f9fb url(img/logSearch/time.jpg) no-repeat center center;
	}
	.components-times-dateRangeChooseContent{
		position: absolute;
		width: 616px;
		top: 40px;
		left: 0px;
		background-color: #fff;
		box-shadow: 0px 10px 31px rgba(0,0,0,0.2);
	}
	.components-times-dateRangeChooseContent a{
		box-sizing: content-box;
	}
	.components-times-dateRangeChooseBtn{
		height: 32px;
		padding: 0 20px;
		margin-bottom: 20px !important;
		display: none;
	}
	.components-times-dateRangeChooseBtn>button{
		float: right;
	}
	.components-times-quickRangeSelect{
		margin: 0;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
	}
	.components-times-quickRangeSelect>li{
		width: calc((100% - 42px)/4);
	    height: 40px;
	    line-height: 38px;
	    padding: 0 20px;
	    box-sizing: border-box;
	    margin-right: 10px !important;
	    display: inline-block;
	    border: 1px solid #c7c6cb;
	    border-radius: 3px;
	    text-align: center;
	    margin-bottom: 10px !important;
	    cursor: pointer;
	}
	.components-times-quickRangeSelect>li:hover{
		border:1px solid var(--color-theme);
		color: var(--color-theme);
	}
	
	.components-times-quickRangeSelect>li.active{
		border:1px solid var(--color-theme);
	    background: var(--color-theme);
	    color: #fff;
	}
	
	.components-times-quickRangeSelect>li:nth-child(4n+4){
		margin-right: 0 !important;
	}
	/*日期选择end*/
</style>
<div class="components">
	<div id='dateSetectWarp' class="components-times-dateRangeChoose">
		<input type="text" id="dateSetectInput" style="display: none;">
		<span id="dateSetect"></span>
		<div id='dateSetectContent' class="components-times-dateRangeChooseContent" style="display: none">
			<ul id="dateRangeTab" class="nav nav-tabs nav-underLine">
				<li class="active" style="width: 100px;"><a href="#tabsDate1" data-toggle="tab">快速选择</a></li>
				<li><a href="#tabsDate2" data-toggle="tab">自定义</a></li>
			</ul>
			<div class="tab-content">
				<div id="tabsDate1" class="tab-pane active" style="padding-bottom: 0;">
					<ul id="quickRange" class="components-times-quickRangeSelect">
						<li data-func="thisDay">当天</li>
						<li data-func="thisWeek">本周</li>
						<li data-func="thisMonth">本月</li>
						<li data-func="thisYear">今年</li>
						<li data-func="oneHour" data-value="3600">1小时</li>
						<li data-func="twelveHour" data-value="43200">12小时</li>
						<li data-func="oneDay" data-value="86400">1天</li>
						<li data-func="oneWeek" data-value="604800">1周</li>
						<li data-func="halfMonth">半月</li>
						<li data-func="oneMonth">1月</li>
						<li data-func="threeMonth">3月</li>
						<li data-func="allTime">全部时间</li>
					</ul>
				</div>
				<div id="tabsDate2" class="tab-pane" style="height: 355px;">
				</div>
			</div>
			<div class="components-times-dateRangeChooseBtn"><button type="button" id="dataRangeSetectBtn" class="confirmBtn">确定</button></div>
		</div>
	</div>
	<div id="selectCate"><i class="fa fa-cube"></i>&nbsp;&nbsp;可访问日志</div>
	<button id="addComponents"><i class="fa fa-plus"></i>&nbsp;&nbsp;添加</button>&nbsp;&nbsp;
	<button id="saveComponents"><i class="fa fa-save"></i>&nbsp;&nbsp;保存</button>
</div>

<div class="selectCate-menu" id="selectCateMenu" style="display: none;">
	<div data-id="appSystem"><i class="fa fa-chevron-left"></i><span>应用对象</span></div>
	<div data-id="assetObject"><i class="fa fa-chevron-left"></i><span>资产对象</span></div>
</div>
<div class="selectCate-level2-show components-log-container" id="selectCateLevel2Show" style="display: none;">
	<div class="components-log-accessLogContent">
		<div id="appSystem"></div>
		<div id="assetObject"></div>
	</div>
</div>
<section class="panel dataBoard-section" style="margin: 0;">
	<p class="title">仪表盘配置</p>
	<div class="content dataBoard-section-content">
		<div id="dataBoard" class="dataBoard-container">
		</div>
	</div>
</section>
<div id="eventModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="min-width: 40vw;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">事件配置</h3>
	</div>
	<div class="modal-body" id="eventList">
		<div class="add-list" id="addEventList"><i class="fa fa-plus"></i>&nbsp;&nbsp;添加事件</div>
		<div class="form-list event-config-item copy hide" id="copyItem">
			<div class="delete-event-item" title="删除事件配置">x</div>
			<form class="form-horizontal">
				<div class="control-group inline-block">
					<label class="control-label">事件触发方式</label>
					<div class="controls">
						<input type="radio" data-clicktype="0" name="eventType" checked />刷新&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="radio" data-clicktype="1" name="eventType" />跳转
					</div>
				</div>
				<div class="control-group inline-block">
					<label class="control-label">事件触发动作</label>
					<div class="controls">
						<select name="eventAction">
							<option></option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label">事件源参数</label>
					<div class="controls">
						<select name="eventField">
							<option></option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label">事件目标参数</label>
					<div class="controls mulit-controls">
						<span class="mulit-controls-name">跳转交易</span>
						<select name="panelList">
							<option></option>
						</select>
					</div>
					<div class="controls mulit-controls">
						<span class="mulit-controls-name">影响组件</span>
						<select name="eventComponents">
							<option></option>
						</select>
					</div>
					<div class="controls mulit-controls">
						<span class="mulit-controls-name">组件字段</span>
						<select name="componentsField">
							<option></option>
						</select>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" data-dismiss="modal" class="confirmBtn">确认</button>
	</div>
</div>
<div id="intervalModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="min-width: 40vw;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">刷新频率配置</h3>
	</div>
	<div class="modal-body">
		<div class="form-list">
			<form class="form-horizontal">
				<div class="control-group inline-block">
					<label class="control-label">刷新频率（s）</label>
					<div class="controls">
						<input type="number" min="0" step="5" id="componentTimer" />
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" data-dismiss="modal" class="confirmBtn">确认</button>
	</div>
</div>
<div class="showModal-editor" id="showEDitor">
	<div class="showModal-close" id="closeContent">x</div>
	<div class="showModal-content" id="showContent"></div>
</div>
<div id="saveDashModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="min-width: 40vw;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">仪表盘保存</h3>
	</div>
	<div class="modal-body">
		<div class="form-list">
			<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label">仪表盘名称</label>
					<div class="controls">
						<input type="text" id="name" />
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" data-dismiss="modal" class="confirmBtn">确认</button>
	</div>
</div>