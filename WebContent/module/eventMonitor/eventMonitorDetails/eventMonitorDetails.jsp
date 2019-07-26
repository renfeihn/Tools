<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
	.AMAgentMonitorDetails-echarts {
		height: 300px;
		width: 100%;
		margin-bottom: 5px;
	}
	.AMAgentMonitorDetails-layout2,.AMAgentMonitorDetails-layout3,
	.AMAgentMonitorDetails-layout4 {
		display: flex;
		height: 320px;
	} 
	.AMAgentMonitorDetails-layout3 .dataTable{
		table-layout: fixed;
	}
	.AMAgentMonitorDetails-normal{
		width: 80px;
		height: 80px;
		background: url("img/eventDetails/normal.png");
		position: absolute;
		top: -30px;
		right: -20px;
	}
	.AMAgentMonitorDetails-error{
		width: 80px;
		height: 80px;
		background: url("img/eventDetails/error.png");
		position: absolute;
		top: -30px;
		right: -20px;
	}
	.AMAgentMonitorDetails-warning{
		width: 80px;
		height: 80px;
		background: url("img/eventDetails/warning.png");
		position: absolute;
		top: -30px;
		right: -20px;
	}
	/*基本信息*/
	.AMAgentMonitorDetails-title{
		padding-left: 70px;
		background: url('img/eventDetails/arrow.png') no-repeat;
		height: 48px;
	}
	.AMAgentMonitorDetails-title>span{
		display:block;
	}
	.AMAgentMonitorDetails-title>span:nth-child(1){
		color: var(--color-theme);
		margin-top: 8px;
	}
	.AMAgentMonitorDetails-inforLayout{
		display: flex;
		justify-content:space-between;
		width:100%;
	}
	.AMAgentMonitorDetails-inforLayout>span:nth-child(1),
	.AMAgentMonitorDetails-inforLayout>span:nth-child(2){
		min-width:160px;
	}
	.AMAgentMonitorDetails-inforLayout>span{
		overflow:hidden;
		white-space:nowrap;
		text-overflow:ellipsis;
	}
	.AMAgentMonitorDetails-inforLayout>span:before,
	.AMAgentMonitorDetails-desc:before{
		width:58px;
		display:inline-block;
		font-size:12px;
	    color: #666;
	}
	.AMAgentMonitorDetails-inforLayout:nth-child(2)>span:nth-child(1):before{
		content:'事件ID';
		
	}
	.AMAgentMonitorDetails-inforLayout:nth-child(2)>span:nth-child(2):before{
		content:'持续时间';
	}
	.AMAgentMonitorDetails-inforLayout:nth-child(2)>span:nth-child(3):before{
		width: 84px;
		content:'首次发生时间';
	}
	.AMAgentMonitorDetails-inforLayout:nth-child(3)>span:nth-child(1):before{
		content:'事件级别';
		
	}
	.AMAgentMonitorDetails-inforLayout:nth-child(3)>span:nth-child(2):before{
		content:'发生次数';
	}
	.AMAgentMonitorDetails-inforLayout:nth-child(3)>span:nth-child(3):before{
		width: 84px;
		content:'最后发生时间';
	}
	.AMAgentMonitorDetails-desc:before {	
		content: '事件描述';
	}
	.AMAgentMonitorDetails-desc{
		overflow:hidden;
		text-overflow:ellipsis;
		display:-webkit-box;
		-webkit-line-clamp:3;
		-webkit-box-orient:vertical;
		word-break: break-all;
	}
	.AMAgentMonitorDetails-squal i{
		width: 6px;
		height:12px;
		display:inline-block;
		background-color:#e0dfe6;
		margin-right:2px;
	}

	.AMAgentMonitorDetails-squal .AMAgentMonitorDetails-blue{
		background-color: var(--color-theme);
	}

	.AMAgentMonitorDetails-title span:nth-child(2):before {
		content: attr(data-name);
		margin-right: 10px;
	}

	.AMAgentMonitorDetails-title span:nth-child(2) {
		margin-top: 2px;
	}
	
	.AMAgentMonitorDetails-layout3 p.title>span{
		float: right;
	}
	.AMAgentMonitorDetails-layout3 p.title>span>span{
		margin-left: 20px;
	}
	.AMAgentMonitorDetails-layout3 p.title>span>span:before{
		content: attr(beforeContent);
		margin-right: 10px;
	}
	.AMAgentMonitorDetails-quickRangeSelect{
		margin: 0;
		width: 100%;
	}
	.AMAgentMonitorDetails-quickRangeSelect>li{
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
	}
	.AMAgentMonitorDetails-quickRangeSelect>li.active{
		border:1px solid #5a62f9;
	}
	.AMAgentMonitorDetails-quickRangeSelect>li:nth-child(4n+4){
		margin-right: 0 !important;
	}
	.AMAgentMonitorDetails-dateRangeChoose{
		position: relative;
	    color: #5c5a66;
	    z-index: 1;
	    font-size: 12px;
	    background-color: #fff;
	    width: 420px;
	    border: 1px solid #c7c6ce;
	    display: inline-block;
	}
	.AMAgentMonitorDetails-dateRangeChoose>span{
		width: 340px;
		height: 38px;
		line-height: 38px;
		display: block;
		color: #5c5a66;
		position: relative;
		cursor: pointer;
		padding: 0 60px 0 20px;
		text-align: center;
	}
	.AMAgentMonitorDetails-dateRangeChoose:after{
		content: '';
		height: 100%;
	    width: 40px;
	    position: absolute;
	    right: 0;
	    top: 0;
	    border-left: 1px solid #c7c6cd;
	    background: #f9f9fb url(img/logSearch/time.jpg) no-repeat center center;
	}
	.AMAgentMonitorDetails-dateRangeChooseContent{
		display: none;
		position: absolute;
		width: 616px;
		top: 40px;
		left: 0px;
		background-color: #fff;
		box-shadow: 0px 10px 31px rgba(0,0,0,0.2);
	}
	.AMAgentMonitorDetails-dateRangeChooseContent a{
		box-sizing: content-box;
	}
	.AMAgentMonitorDetails-dateRangeChooseContent li.active>a{
		color: #5a62f9;
	}
	.AMAgentMonitorDetails-dateRangeChooseBtn{
		height: 32px;
		padding: 0 20px;
		margin-bottom: 20px !important;
		display: none;
	}
	.AMAgentMonitorDetails-dateRangeChooseBtn>button{
		float: right;
	}

	.AMAgentMonitorDetails-echartsLable{
		flex: none;
		width: 50px;
		line-height: 100%;
		font-size: 10px;
		font-weight: normal;
		height: 100%;
	}
	.AMAgentMonitorDetails-echartsLable>span{
		display: block;
		height: calc((100%)/2);
		width: 100%;
		cursor: pointer;
		border-bottom: 1px solid #e5e5e9;
		border-right: 1px solid #e5e5e9;
		word-wrap: break-word;
		padding: 38px 15px;
		box-sizing: border-box;
		position: relative;
	}
	.AMAgentMonitorDetails-echartsLable>span:last-child{
		border-bottom: none;
	}
	.AMAgentMonitorDetails-echartsLable>span.active{
		color: var(--color-theme);
		border-right: none;
	}
	.AMAgentMonitorDetails-echartsLable>span:before{
		content: '';
		display: inline-block;
		width: 4px;
		height: 50%;
		margin-right: 10px;
		position: absolute;
		left: 0;
		top: 25%;
	}
	.AMAgentMonitorDetails-echartsLable>span.active:before{
		background-color: var(--color-theme);
	}

	.AMAgentMonitorDetails-remarkList{
		margin: 0;
		margin-bottom: 20px;
		max-height: 300px;
		overflow-y: auto;
	}
	.AMAgentMonitorDetails-remarkList li{
		border-bottom: 1px solid #e5e5e9;
		padding: 10px;
	}

	.AMAgentMonitorDetails-remarkList li>p>span{
		color: var(--color-theme);
		margin-right: 20px;
	}
	.AMAgentMonitorDetails-remarkList li>p>span:nth-child(2){
		color: #c7c6cc;
	}
	.AMAgentMonitorDetails-remarkList li>p>span.fa{
		cursor: pointer;
		font-size: 16px;
	}

	.AMAgentMonitorDetails-datatable #dataTable_filter{
		position: absolute;
		top: -52px;
		right: 0;
	}
</style>

<div class="AMAgentMonitorDetails-layout1" style="height: 320px;display: flex;">
	<section class="panel" style="width: calc((100% - 20px)/2);flex: none;margin-right: 20px;position: relative;">
		<p class="title">事件基本信息</p>
		<div class="content">
			<div style="position: relative;">
				<div id="eventType" class=""></div>
				<div class="AMAgentMonitorDetails-title">
					<span id="eventStatus" style="user-select: text;">-</span>
					<span id="eventSource" data-name="事件来源" style="user-select: text;">-</span>
				</div>
			</div>
			<div class="AMAgentMonitorDetails-inforLayout">
				<span id="eventId" style="user-select: text;">-</span>
				<span id="stayTime" style="user-select: text;">-</span>
				<span id="startDate" style="user-select: text;">-</span>
			</div>
			<div class= "AMAgentMonitorDetails-inforLayout ">
				<span class="AMAgentMonitorDetails-squal">
					<span id="eventLevel" style="display:inline-flex;">
						<i></i>
						<i></i>
						<i></i>
						<i></i>
						<i></i>
					</span>
					<span id="eventLevelNum" style="user-select: text;">-</span></span>
				<span id="ocrTimes" style="user-select: text;">-</span>
				<span id="endDate" style="user-select: text;">-</span>
			</div>
			<div >
				<p id="eventDecribe" class="AMAgentMonitorDetails-desc" style="margin-bottom: 0;user-select: text;">-</p>
			</div>
			<div class="eventDetails-inforLayout">
				<span id="resolveType" data-title="解除方式" style="user-select: text;">-</span>
				<span id="resolvePer" data-title="解除人" style="user-select: text;">-</span>
				<span id="resolveTime" data-title="解除时间" style="user-select: text;">-</span>
			</div>
			<button id="skipToLog" style="position:absolute;bottom:0;right:60px;">查看事件现场</button>
			<button id="dispose" style="position:absolute;bottom:0;right:0;">忽略</button>
		</div>
	</section>
	<section class="panel AMAgentMonitorDetails-datatable" style="width: calc((100% - 20px)/2);">
		<p class="title">事件处理历史</p>
		<div class="content">
			<table id="dataTable" class="display dataTable table">
				<thead>
					<tr>
						<th>序号</th>
						<th>开始时间</th>
						<th>结束时间</th>
						<th>处理类型</th>
						<th>处理状态</th>
						<th>处理人</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</section>
</div>
<div class="AMAgentMonitorDetails-layout2" style="">
	<section class="panel" style="width: calc((100% - 20px)/2);margin-right: 20px;">
		<p class="title">事件统计</p>
		<div class="content" style="display: flex;padding: 0;height: 260px;">
			<div id="eventStatistics" class="AMAgentMonitorDetails-echartsLable">
				<span class="active" data="_head_.hostip">主机分布</span>
				<span data="_head_.appname">应用分布</span>
			</div>
			<div style="flex: auto;padding: 20px;height: 100%;box-sizing: border-box;">
				<div id="eStatistics" style="height: 100%; width: 100%;"></div>
			</div>
		</div>
	</section>
	<section class="panel" style="width: calc((100% - 20px)/2);">
		<p class="title">事件趋势</p>
		<div class="content">
			<div id="eEvent" style="height: 220px;"></div>
		</div>
	</section>
</div>

<section class="panel">
	<p class="title">备注信息</p>
	<div class="content">
		<ul id="remarkList" class="AMAgentMonitorDetails-remarkList">
			<!-- <li>
				<p>
					<span>admin</span>
					<span>2018-05-10 15:30:00</span>
					<span class="fa fa-trash-o" title="删除"></span>
				</p>
				<div>
					处理处理处理。。。。
				</div>
			</li> -->
		</ul>
		<textarea id="remarkDetail" style="resize: none;height: 100px;width: 100%;display: block;" placeholder="备注内容"></textarea>
		<button id="addRemark">添加备注</button>
	</div>
</section>

<div id="disposeModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">解除原因</h3>
	</div>
	<div class="modal-body">
		<p>请填写事件解除原因：</p>
		<textarea rows="" cols="" style="width: 100%; resize: none;height: 100px;" autofocus></textarea>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn" id="confirmBtn">确定</button>
	</div>
</div>
