<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
.AppPerforTab2-grid-layout {
	display: grid;
	grid-template-columns: repeat(3,minmax(400px,1fr));
	grid-gap: 20px;
}
.AppPerforTab2-grid-layout>div {
	border: 1px solid #ccc;
	height: 300px;
	width: 100%;
	position: relative;
}
.AppPerforTab2-buttonBar>i.fa:hover {
	color: var(--主题色);
}
.AppPerforTab2-buttonBar>i.fa {
	cursor: pointer;
	width: 24px;
	height: 24px;
	line-height: 24px;
	text-align: center;
}
.AppPerforTab2-buttonBar {
    position: absolute;
    right: 0;
    top: 0;
    height: 24px;
    display: flex;
    width: 48px;
    align-items: center;
    color: #999;
    z-index: 2;
}
.AppPerforTab2-grid-layout .AppPerforTab2-echarts {
	height: 300px;
	width: 100%;
}
.AppPerforTab2-grid-layout>.addView>i:hover {
	background-color: #999;
}
.AppPerforTab2-grid-layout>.addView>i {
    font-size: 84px;
    margin: auto;
    background-color: #c6c7cc;
    color: #fff;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 130px;
}
.AppPerforTab2-grid-layout>.addView {
	border: 1px dashed #ccc;
	display: inline-flex;
	cursor: pointer;
}
.AppPerforTab2-grid-layout .checkbox.inline, .radio.inline {
	padding-top: 0 !important;
	height: 24px;
	line-height: 24px;
}
.AppPerforTab2-grid-layout .checkbox input[type=checkbox], .radio input[type=radio] {
    float: left;
    margin-left: -18px;
    margin-top: 5px;
}
</style>
<div class="AppPerforTab2-grid-layout">
	<div class="AppPerforTab2-echarts"></div>
	<div class="AppPerforTab2-echarts"></div>
	<!-- <div class="AppPerforTab2-echarts"></div> -->
	<!-- <div class="AppPerforTab2-echarts"></div> -->
	<!-- <div class="AppPerforTab2-echarts"></div> -->
	<!-- <div class="AppPerforTab2-echarts"></div> -->
	<div class="addView">
		<i class="fa fa-plus"></i>
	</div>
</div>

<div id="addViewModal" class="modal hide fade" data-backdrop="false" aria-hidden="true">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">新增仪表盘</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal">
			<div class="control-group">
				<label for="retDesc" class="control-label required">图表标题</label>
				<div class="controls">
					<input type="text" id="retDesc" placeholder="这里是必输的" spellcheck="false"/>
				</div>
			</div>
			<div class="control-group">
				<label for="echarsType" class="control-label">图表类型</label>
				<div class="controls">
					<label class="radio inline"><input type="radio" name="echarsType" value="1" checked="checked">柱状图</label>
					<label class="radio inline"><input type="radio" name="echarsType" value="2">折线图</label>
					<!-- <label class="radio inline"><input type="radio" name="echarsType" value="3">饼图</label> -->
				</div>
			</div>
			<div class="control-group">
				<label for="esSql" class="control-label required">SQL语句</label>
				<div class="controls">
					<textarea name="" id="esSql" style="width: 100%;" rows="5" spellcheck="false"></textarea>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确定</button>
	</div>
</div>
