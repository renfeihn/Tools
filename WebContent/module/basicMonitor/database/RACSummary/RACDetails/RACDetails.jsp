<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.RACDetails-layout{
	display: flex;
	width: 100%;
}
.RACDetails-layout .dataTable{
	table-layout: fixed;
}

.RACDetails-echarts {
	width: calc((100vw - 167px) / 3 - 40px);
	height: 220px;
}
/*基本信息*/
.RACDetails-queue{
	position: relative;
}
.RACDetails-queue>span {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border-radius: 3px;
	color: #fff;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.RACDetails-queue>span:nth-child(1){
    position: absolute;
    top: 32px;
    right: 37px;
    color: #2B2936;
    font-size: 40px;
    font-weight: bolder;
    text-align: center;
    z-index: 2;
    height: 100px;
    line-height: 100px;
 }
.RACDetails-queue>span:nth-child(2) {
	width: 100%;
	color: #2B2933;
	height: 140px;
	line-height: 74px;
	margin-bottom: 10px;
	padding-left: 144px;
	padding-top: 59px;
	font-size: 20px;
	font-weight: bolder;
	background: #F1F0F5 url(img/baseMonitor/OracleRAC.png) no-repeat 20px center;
	position: relative;
	text-align: center;
    padding-right: 18px;
}

.RACDetails-queue>span:nth-child(3) {
	width: 100%;
	height: calc(100% - 150px);
	display: flex;
	flex-direction: column;
	padding: 15px 20px;
	font-weight: normal;
	background: #5B62FB;
}

.RACDetails-queue>span>span {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.RACDetails-queue>span>span:before {
	display: inline-block;
	margin-right: 10px;
}

.RACDetails-queue>span>span:nth-child(1):before {
	content: "服务地址 :";
}

.RACDetails-queue>span>span:nth-child(2):before {
	content: "服务端口 :";
}

.RACDetails-zdzb {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 220px;
}

.RACDetails-zdzb>span {
	width: calc(( 100% - 10px)/2);
	height: calc((100% - 20px)/3);
	background: #F1F0F5;
	border-radius: 2px;
	font-size: 16px;
	color: #000;
	text-align: center;
	padding-top: 15px;
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.RACDetails-zdzb>span:nth-child(1), .RACDetails-zdzb>span:nth-child(3) {
	margin-bottom: 10px;
}

.RACDetails-zdzb>span:nth-child(2n+1) {
	margin-right: 10px;
}

.RACDetails-zdzb>span:before {
	display: block;
	font-size: 12px;
	font-weight: normal;
	color: #606060;
	content: attr(title);
}
.RACDetails-zdzb>span:after {
	content: attr(afterText);
}
/*事件*/
.RACDetails-event {
	float: right;
	width: 180px;
	height: 220px;
}

.RACDetails-event>span:nth-child(1):BEFORE {
	content: '未解决事件总数';
}

.RACDetails-event>span:nth-child(2)>span:nth-child(1):BEFORE {
	content: '预警';
	display: block;
	font-size: 14px;
	color: #666;
}

.RACDetails-event>span:nth-child(2)>span:nth-child(2):BEFORE {
	content: '告警';
	display: block;
	font-size: 14px;
	color: #666;
}

.RACDetails-event>span:nth-child(2)>span:nth-child(3):BEFORE {
	content: '通知';
	display: block;
	font-size: 14px;
	color: #666;
}

.RACDetails-event>span:nth-child(2)>span:nth-child(1):AFTER {
	background-color: #5b62f9;
}

.RACDetails-event>span:nth-child(2)>span:nth-child(2):AFTER {
	background-color: #fb8229;
}

.RACDetails-event>span:nth-child(2)>span:nth-child(3):AFTER {
	background-color: #22ac38;
}

.RACDetails-event>span:nth-child(3):BEFORE {
	content: '当日事件总数';
	color: #666;
}

.RACDetails-event>span:nth-child(1) {
	background-color: #5b62f9;
	color: #FFF;
	font-size: 36px;
	height: 70px;
}

.RACDetails-event>span>span:AFTER {
	content: '';
	position: absolute;
	width: 6px;
	height: 6px;
	border-radius: 50%;
	left: 6px;
	top: 7px;
}

.RACDetails-event>span>span {
	flex: auto;
	position: relative;
}

.RACDetails-event>span+span {
	margin-top: 10px;
}

.RACDetails-event>span:BEFORE {
	display: block;
	margin-bottom: 6px;
	font-size: 14px;
}

.RACDetails-event>span {
	display: flex;
	border-radius: 2px;
	background-color: #f1f0f5;
	text-align: center;
	height: 64px;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	font-weight: normal;
	flex-direction: column;
}

.RACDetails-event>span:nth-child(2) {
	flex-direction: row;
/* 	background: #f1f0f5 linear-gradient(to bottom, #c7c6cc 0%, #c7c6cc 100%)
		no-repeat center center;
	background-size: 1px 50px; */
}
.RACDetails-event>span:nth-child(1),
.RACDetails-event>span:nth-child(2),
.RACDetails-event>span:nth-child(3){
	cursor: pointer;
}
.RACDetails-event>span>span:nth-child(1),
.RACDetails-event>span>span:nth-child(2){
	border-right:1px solid #AEADB3;
}
</style>
<div class="RACDetails-layout" style="height: 320px;">
	<section class="panel" style="flex: none;width:284px; margin-right: 20px;">
		<p class="title">基本信息</p>
		<div class="content RACDetails-queue">
			<span>RAC</span>
			<span id="version">-</span>
			<span><span id="ip">-</span><span id="port">-</span></span>
		</div>
	</section>
	<section class="panel" style="width:390px;;margin-right:20px;">
		<p class="title">重点指标</p>
		<div class="content">
			<div class="RACDetails-zdzb">
				<span title="并发数" id="session_curs" afterText="个">-</span><span title="会话数" id="session_count" afterText="个">-</span> 
				<span title="进程使用率" id="processesuse" afterText="个">-</span><span title="大事务数" id="largTaskNum" afterText="个">-</span> 
				<span title="打开游标数" id="cursor_used" afterText="个">-</span> <span title="游标使用率" id="cursor_pct" afterText="%">-</span>
			</div>
		</div>
	</section>
	<section class="panel" style="flex: auto;">
		<p class="title">事件总览</p>
		<div class="content">
			<div class="RACDetails-event">
				<span id="alarmWaring">-</span>
				<span>
					<span id="waringCount">-</span>
					<span id="alarmCount">-</span>
					<span id="infoCount">-</span>
				</span>
				<span id="dayEventCount">-</span>
			</div>
			<div id="eEvent" style="margin-right: 200px;height: 220px;"></div>
		</div>
	</section>
</div>
<ul id="tabsUl" class="nav nav-tabs nav-underLine">
	<li class="active"><a href="#tabs1" data-toggle="tab">实例运行</a></li>
	<li><a href="#tabs2" data-toggle="tab">应用运行</a></li>
</ul>
<div class="tab-content">
	<div id="tabs1" class="tab-pane active" style="padding: 20px 0 0 0;">
		<div class="RACDetails-layout" style="height: 320px;">
			<section class="panel" style="width:calc((100% - 40px)/3); margin-right: 20px;">
				<p class="title">集群实例信息</p>
				<div class="content">
					<table id="clusrerTable" class="dataTable display table">
						<thead>
							<tr>
								<th>序号</th>
								<th>实例ID</th>
								<th>实例名称</th>
								<th>实例版本</th>
								<th>实例状态</th>
								<th>启动时间</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
			<section class="panel" style="width:calc((100% - 40px)/3);margin-right: 20px;">
				<p class="title">进程使用率</p>
				<div class="content">
					<div id="eProcess" class="RACDetails-echarts"></div>
				</div>
			</section>
			<section class="panel" style="width:calc((100% - 40px)/3);">
				<p class="title">ASM使用率</p>
				<div class="content">
					<div id="eASM" class="RACDetails-echarts"></div>
				</div>
			</section>
		</div>
		<div class="RACDetails-layout" style="height: 320px;">
			<section class="panel" style="width:calc((100% - 40px)*2/3 + 20px); margin-right: 20px;">
				<ul id="tableSpaceUl" class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs11" data-toggle="tab">表空间信息</a></li>
					<li><a href="#tabs12" data-toggle="tab">表空间空闲比</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabs11" class="tab-pane active">
						<table id="tableSpaceTable" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>名称</th>
									<th>空间大小(MB)</th>
									<th>状态</th>
									<th>类型</th>
									<th>已用百分比</th>
									<th>已用大小(MB)</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div id="tabs12" class="tab-pane">
						<div id="eTableSpace" class="RACDetails-echarts" style="width: calc((100vw - 147px) * 2 / 3 - 40px)"></div>
					</div>
				</div>
			</section>
			<section class="panel" style="width:calc((100% - 40px)/3);">
				<p class="title">会话使用率</p>
				<div class="content">
					<div id="eSession" class="RACDetails-echarts"></div>
				</div>
			</section>
		</div>
		<div class="RACDetails-layout" style="height: 320px;">
			<section class="panel" style="width:calc((100% - 40px)*2/3 + 20px); margin-right: 20px;">
				<p class="title">归档日志空间信息</p>
				<div class="content">
					<table id="logSpaceTable" class="dataTable display table">
						<thead>
							<tr>
								<th>序号</th>
								<th>archived</th>
								<th>bytes</th>
								<th>first_change</th>
								<th>first_time</th>
								<th>grp</th>
								<th>members</th>
								<th>sequence</th>
								<th>status</th>
								<th>thread</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
			<section class="panel" style="width:calc((100% - 40px)/3);">
				<ul id="cursorUl" class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs13" data-toggle="tab">游标数量</a></li>
					<li><a href="#tabs14" data-toggle="tab">游标使用率</a></li>
				</ul>
				<div class="content">
					<div id="eCursor" class="RACDetails-echarts"></div>
				</div>
			</section>
		</div>
		<div class="RACDetails-layout" style="height: 320px;">
			<section class="panel" style="width:calc((100% - 40px)*2/3 + 20px); margin-right: 20px;">
				<p class="title">错误信息</p>
				<div class="content">
					<table id="errorTable" class="dataTable display table">
						<thead>
							<tr>
								<th>序号</th>
								<th>creation_time</th>
								<th>message_type</th>
								<th>metric_value</th>
								<th>reason</th>
								<th>suggested_action</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
			</section>
			<section class="panel" style="width:calc((100% - 40px)/3)">
				<ul id="readTimsUl" class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs15" data-toggle="tab">逻辑读次数</a></li>
					<li><a href="#tabs16" data-toggle="tab">物理读次数</a></li>
					<li><a href="#tabs17" data-toggle="tab">物理写次数</a></li>
				</ul>
				<div class="content">
					<div id="eReadTimes" class="RACDetails-echarts"></div>
				</div>
			</section>
		</div>
	</div>
	<div id="tabs2" class="tab-pane" style="padding: 20px 0 0 0;">
		<div class="RACDetails-layout" style="height: 320px;">
			<section class="panel" style="width: 100%;">
				<ul id="sqlUl" class="nav nav-tabs nav-public" >
					<li class="active"><a href="#tabs21" data-toggle="tab">较耗CPU处理sql</a></li>
					<li><a href="#tabs22" data-toggle="tab">执行时间较长sql</a></li>
					<li><a href="#tabs23" data-toggle="tab">执行次数较多sql</a></li>
					<li><a href="#tabs24" data-toggle="tab">读磁盘次数较多sql</a></li>
					<li><a href="#tabs25" data-toggle="tab">排序次数较多sql</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabs21" class="tab-pane active">
						<table id="cpusql_table" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>sql语句</th>
									<th>耗cpu时间</th>
									<th>数据库模式</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div id="tabs22" class="tab-pane">
						<table id="elatimesql_table" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>sql语句</th>
									<th>累计耗时</th>
									<th>数据库模式</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div id="tabs23" class="tab-pane">
						<table id="exesql_table" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>sql语句</th>
									<th>执行次数</th>
									<th>数据库模式</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div id="tabs24" class="tab-pane">
						<table id="diskreadsql_table" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>sql语句</th>
									<th>读磁盘次数</th>
									<th>数据库模式</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div id="tabs25" class="tab-pane">
						<table  id="sortsql_table" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>sql语句</th>
									<th>排序次数</th>
									<th>数据库模式</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
			</section>
		</div>
		<div class="RACDetails-layout" style="height: 320px;">
			<section class="panel" style="flex: 1;margin-right: 20px;">
				<ul id="taskUL" class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs26" data-toggle="tab">超长事物信息</a></li>
					<li><a href="#tabs27" data-toggle="tab">大事物信息</a></li>
					<li><a href="#tabs28" data-toggle="tab">回退段信息</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabs26" class="tab-pane active">
						<table id="ltruntask_table" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>机器名</th>
									<th>程序名</th>
									<th>会话id</th>
									<th>sql语句</th>
									<th>用户名</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div id="tabs27" class="tab-pane">
						<table id="largetask_table" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>用户名</th>
									<th>程序名</th>
									<th>会话id</th>
									<th>sql语句</th>
									<th>会话状态</th>
									<th>已使用块</th>
									<th>用户名</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div id="tabs28" class="tab-pane">
						<table id="seginfo_table" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>表空间名</th>
									<th>状态</th>
									<th>回退段名</th>
									<th>初始扩展段</th>
									<th>最大扩展段</th>
									<th>最小扩展段</th>
									<th>下一扩展段</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
			</section>
			<section class="panel" style="flex: 1;margin-right: 20px;">
				<ul id="tableUl" class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs29" data-toggle="tab">表记录数TOP5</a></li>
					<li><a href="#tabs210" data-toggle="tab">表占用空间大小TOP5</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabs29" class="tab-pane active">
						<table id="rcdmsg_table" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>表名</th>
									<th>表大小(MB)</th>
									<th>表状态</th>
									<th>表记录数</th>
									<th>表空间名称</th>
									<th>所有者</th>
									<th>是否开启压缩</th>
									<th>最后一次信息统计搜集时间</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div id="tabs210" class="tab-pane">
						<table id="spaceuse_table" class="dataTable display table">
							<thead>
								<tr>
									<th>序号</th>
									<th>名称</th>
									<th>类型</th>
									<th>空间大小(MB)</th>
									<th>已用大小(MB)</th>
									<th>空闲大小(MB)</th>
									<th>已用百分比(%)</th>
									<th>可扩展大小(MB)</th>
									<th>扩展管理</th>
									<th>状态</th>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
