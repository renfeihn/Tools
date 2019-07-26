<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.panel{
	position:relative;
}

.logFlow－title{
	font-size:16px;
	color:rgba(92,90,102,255);
	font-weight:600;
}
.logFlow-logInfos{
	overflow:hidden;
}
.logFlow-logInfos .logFlow-logInfos-show{
   	float: left;
    width: 30%;
}
.logFlow-logInfos .logFlow-logInfos-show .logFlow-logInfos-label{
	width: 100px;
	font-size: 12px;
	float: left;
	text-align: right;
	color: rgba(114,112,122,255);
}
.logFlow-logInfos .logFlow-logInfos-show .logFlow-logInfos-Val{
	float: left;
    width: calc(100% - 120px);
    margin-left: 20px;
    background: rgba(249,249,251,255);
    border-color: rgba(229,229,229,255);
}
.logFlow-logInfos .logFlow-logInfos-name{
    width: 60%;
}
.logFlow-logInfos .logFlow-logInfos-sys{
    width: 35%;
}

.logFlow-flowInfos{
	width:100%;
}
.logFlow-flowInfosOne{
	border:1px solid rgba(235,235,237,255);
	border-radius:3px;
	padding: 20px 18px 0;
	margin-bottom:18px;
}
.logFlow-flowInfos .logFlow-flowInfosShow{
	width:100%;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-title{
	width:100%;
	font-weight:100;
	color:rgba(103,101,112,255);
}
.logFlow-flowInfos-rote{
	width:100%;
	display:flex;
}
.logFlow-flowInfos-rote .logFlow-flowInfos-time{
	text-align:center;
	width:10%;
}
.logFlow-flowInfos-rote .logFlow-flowInfos-pathAll{
	flex:1;
	display:flex;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path{
	display: flex;
	justify-content:space-between;
    height: 30px;
    margin-bottom: 25px;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path:not(:nth-of-type(1)) {
	flex:1;
}
.logFlow-flowInfos-pathAll .logFlow-flowInfos-path:nth-of-type(1){
    margin-left: 30px;
    width:40px;
}
.logFlow-flowInfos-pathAll .logFlow-flowInfos-path:last-of-type{
    margin-right: 30px;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon{
	width:20px;
	height:20px;
	border-radius:50%;
	border:2px solid rgba(171,176,204,255);
	margin:0 5px;
	position:relative;
	box-sizing:border-box;
	cursor: pointer;
}


.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon .logFlow-flowInfos-IconPoint{
	width:10px;
	height:10px;
	border-radius:50%;
	background:rgba(171,176,204,255);
	position:absolute;
	left:0;
	top:0;
	right:0;
	bottom:0;
	margin:auto;
}

.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon .logFlow-flowInfos-pointInfo{
    font-size: 12px;
    line-height: 20px;
    overflow: hidden;
    position: absolute;
    width: 100px;
    top: 25px;
    left: 14px;
    transform: translateX(-50%);
    text-align: center;
    display: none;
    border: 1px solid #eee;
    color:rgba(92,110,217,255);
    background: #fff;
    z-index: 10;
    padding:10px;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon .logFlow-flowInfos-pointInfo1{
    font-size: 12px;
    line-height: 20px;
    height:20px;
    overflow: hidden;
    position: absolute;
    width: 120px;
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
	text-overflow: ellipsis;
    white-space: nowrap;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-line{
	flex:1;
	height:0;
	border:1px solid rgba(171,176,204,255);
	margin-top:8px;
}

.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-time .logFlow-flowInfos-timeInfo{
	font-size:12px;
	margin:0;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-time .logFlow-flowInfos-timeInfo .logFlow-flowInfos-timeShow{
	font-size:24px;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-time .logFlow-flowInfos-timeLabel{
	font-size:12px;
	position:relative;
}
.logFlow-flowInfosActive{
	background:rgba(245,245,250,255);
}
.logFlow-flowInfosActive .logFlow-flowInfosShow .logFlow-flowInfos-title{
	color:rgba(82,101,215,255);
}



.logFlow-flowInfosActive .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon{
	border-color:rgba(82,101,215,255);
}
.logFlow-flowInfosActive .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon .logFlow-flowInfos-IconPoint{
	background:rgba(82,101,215,255);
}
.logFlow-flowInfosActive .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-line{
	border-color:rgba(82,101,215,255);
}


.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon-Active{
	border:2px solid #DE4444;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon-Active .logFlow-flowInfos-IconPoint{
	background:#DE4444;
}

.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon-big {
	width:30px;
	height:30px;
	border:3px solid rgba(171,176,204,255);
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon-big .logFlow-flowInfos-IconPoint{
	width:20px;
	height:20px;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon-big .logFlow-flowInfos-pointInfo1{
	top:29px;
}
.logFlow-flowInfos .logFlow-flowInfosShow .logFlow-flowInfos-path .logFlow-flowInfos-Icon-big .logFlow-flowInfos-line{
	margin-top: 12px;
}

.logFlow-flowInfos .logFlow-flowInfoshidden{
	display:none; 
	background:#fff;
	padding:20px;
	border:1px solid rgba(235,235,237,255);
	border-radius:5px;
	margin-bottom:20px;
	max-height: 40vh;
	overflow: hidden;
	overflow-y: auto;
}
.logFlow-flowInfos .logFlow-flowInfoshiddenActive{
	display:block;
}
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-title{
	font-size:14px;
	color:rgba(92,90,102,255);
}
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table{
	width:100%;
	border:1px solid #eee;
	table-layout: fixed;
}
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr1{
	font-size:12px;
	font-weight:600;
	display:flex;
	text-align:center;
}
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr{
	font-size:12px;
	font-weight:600;
	height:30px;
	display:flex;
	text-align:center;
}
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr1 .logFlow-flowInfoshidden-td{
	width:140px;
	border-bottom:1px solid #eee;
	border-right:1px solid #eee;
	box-sizing:border-box;
}
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr1 .logFlow-flowInfoshidden-tdTime{
	/*width:970px;*/
	width: calc(100% - 560px);
	position:relative;
	border-bottom:1px solid #eee;
	display: flex;
    justify-content: space-between;
}
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr .logFlow-flowInfoshidden-td{
	width:140px;
	border-right:1px solid #eee;
	overflow:hidden;
	height:30px;
	line-height:30px;
	padding:0 10px;
	box-sizing:border-box;
}
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr .logFlow-flowInfoshidden-tdTime{
	/*width:970px;*/
	width: calc(100% - 560px);
	padding:5px 0;
}
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr.active,
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr:hover{
	background:rgba(239,239,244,255);
	color:rgba(92,110,217,255);
	cursor: pointer;
}

.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr.active .timeWidth,
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr:hover .timeWidth{
	background:rgba(92,110,217,255);
}

.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr.active .timeWidthDetail,
.logFlow-flowInfos .logFlow-flowInfoshidden .logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr:hover .timeWidthDetail{
	display:block;
}

.logFlow-flowInfoshidden-detailOption{
	line-height:30px;
	width:100%;
	overflow:hidden;
	height:30px;
	padding-right:20px;
	box-sizing:border-box;
}
#logFlowEcharts{
	width:100%;
	height:100%;
	min-height:300px;
}

.rightShow{
	position:fixed;
	top: 40px;
    right: 0;
    width: 670px;
    height: calc(100vh - 42px);
	background:#fff;
	display:flex;
	flex-direction:column;
	border:1px solid #ccc;
	box-shadow:0 3px 3px #ccc;
	/* display:none; */
	transform:translateX(700px);
	transition:all .5s;
}
.rightShowActive{
	transform:translateX(0);
	transition:all .5s;
}
.rightShow .title{
	background: #fafafc;
    border-bottom: 1px solid #ebebed;
    height: 39px;
    line-height: 40px;
    font-size: 14px;
    padding: 0 20px;
    margin: 0;
}
.rightShow .content{
	flex:1;
	overflow-y:auto;
	padding:20px;
}
.rightShow .content .logFlow-table{
	width:100%;
	border:1px solid rgba(224,223,228,255);
}
.rightShow .content .logFlow-table .logFlow-tr{
	width:100%;
	height:33px;
	line-height:33px;
	border-bottom:1px solid rgba(224,223,228,255);
}
.rightShow .content .logFlow-table .logFlow-tr td{
	word-break: break-word;
}
.rightShow .content .logFlow-table .logFlow-tr .logFlow-td1{
	width:28%;
	height:33px;
	box-sizeing:border-box;
	padding-left:10px;
	background:rgba(250,250,252,255);
	border-right:1px solid rgba(224,223,228,255);
}
.rightShow .content .logFlow-table .logFlow-tr .logFlow-td2{
	width:72%;
	height:33px;
	box-sizeing:border-box;
	padding-left:10px;
	-webkit-user-select: text;
	-moz-user-select: text;
	-ms-user-select: text;
	user-select: text;
}
.rightShow .footer{
	width:100%;
	height:74px;
	border-top:1px solid #ccc;
	position:relative;
}
.rightShow .footer .logFlow-close{
	height:30px;
	line-height:30px;
	padding:0 20px;
	border:1px solid #ccc;
	position:absolute;
	right:150px;
	top:20px;
	color:#666;
}
.rightShow .footer .logFlow-detail{
	height:30px;
	line-height:30px;
	padding:0 20px;
	border:1px solid rgba(92,110,217,255);
	position:absolute;
	right:30px;
	top:20px;
	color:rgba(92,110,217,255);
	background:rgba(205,205,239,255)
}
.showTime{
	width:100%;
	height:100%;
	text-align:left;
	position:relative;
}
.timeWidth{
	text-align:right;
	display:inline-block;
	height:20px;
	border:1px solid rgba(92,110,217,255);
	background:rgba(205,205,239,255);
}
.timePoint1,.timePoint2{
	width:170px;
	text-align:left;
}
.timePoint2{
	text-align:right;
}
.timeWidthDetail{
	position:absolute;
	display:none;
	left:40%;
	bottom:-70px;
	border:1px solid #eee;
	background:#fff;
	border-radius:5px;
}
.timeWidthDetail-i{
	display:block;
	text-align:left;
	padding-left:5px;
}
.timeWidthDetail:last-child{
	bottom:25px;
}



</style>

<section class="panel" style="margin:0;min-height: calc(100vh - 42px);">
	<p class="title">日志链路</p>
	<div class="content">
		<section class="logFlow－section" style="width: 100%;">
			<h4 class="logFlow－title">日志基本信息</h4>
			<div class="logFlow-logInfos">
				<div class="logFlow-logInfos-show  logFlow-logInfos-name">
					<label class="logFlow-logInfos-label">日志文件名称</label><input type="text" disabled class="logFlow-logInfos-Val" id="logName"/>
				</div>
				<div class="logFlow-logInfos-show logFlow-logInfos-sys">
					<label class="logFlow-logInfos-label">日志应用系统</label><input type="text" disabled class="logFlow-logInfos-Val" id="logSys"/>
				</div>
				<div class="logFlow-logInfos-show">
					<label class="logFlow-logInfos-label">日志主机</label><input type="text" disabled class="logFlow-logInfos-Val" id="logCenter"/>
				</div>
				<div class="logFlow-logInfos-show">
					<label class="logFlow-logInfos-label">日志开始时间</label><input type="text" disabled class="logFlow-logInfos-Val" id="logStart"/>
				</div>
				<div class="logFlow-logInfos-show" style="width: 35%;">
					<label class="logFlow-logInfos-label">日志结束时间</label><input type="text" disabled class="logFlow-logInfos-Val" id="logEnd"/>
				</div>
			</div>
		</section>
		<section class="logFlow－section" style="width: 100%;">
			<h4 class="logFlow－title">日志链路</h4>
			<div class="logFlow-flowInfos">
			</div>
		</section>
	</div>
	<div class="rightShow panel">
		<p class="title">结构化字段</p>
		<div class="content">
			<table class="logFlow-table">
				<!-- <tr class="logFlow-tr logFlow-id">
					<td class="logFlow-td1">_id</td>
					<td class="logFlow-td2"></td>
				</tr>
				<tr class="logFlow-tr logFlow-index">
					<td class="logFlow-td1">_index</td>
					<td class="logFlow-td2"></td>
				</tr>
				<tr class="logFlow-tr logFlow-routing">
					<td class="logFlow-td1">_routing</td>
					<td class="logFlow-td2"></td>
				</tr>
				<tr class="logFlow-tr logFlow-score">
					<td class="logFlow-td1">_score</td>
					<td class="logFlow-td2"></td>
				</tr> -->
                <tr class="logFlow-tr logFlow-sysdate">
                  <td class="logFlow-td1">接入时间</td>
                  <td class="logFlow-td2"></td>
                </tr>
				<tr class="logFlow-tr logFlow-keywords">
					<td class="logFlow-td1">关联字段</td>
					<td class="logFlow-td2"></td>
				</tr>
				<tr class="logFlow-tr logFlow-duration">
					<td class="logFlow-td1">交易耗时</td>
					<td class="logFlow-td2"></td>
				</tr>
				<tr class="logFlow-tr logFlow-start">
					<td class="logFlow-td1">开始时间</td>
					<td class="logFlow-td2"></td>
				</tr>
				<tr class="logFlow-tr logFlow-stop">
					<td class="logFlow-td1">结束时间</td>
					<td class="logFlow-td2"></td>
				</tr>
				<!-- <tr class="logFlow-tr logFlow-appid">
					<td class="logFlow-td1">应用ID</td>
					<td class="logFlow-td2"></td>
				</tr> -->
				<tr class="logFlow-tr logFlow-appname">
					<td class="logFlow-td1">应用名称</td>
					<td class="logFlow-td2"></td>
				</tr>
				<!-- <tr class="logFlow-tr logFlow-category1">
					<td class="logFlow-td1">_head_.category1</td>
					<td class="logFlow-td2"></td>
				</tr>
				<tr class="logFlow-tr logFlow-category2">
					<td class="logFlow-td1">_head_.category2</td>
					<td class="logFlow-td2"></td>
				</tr> -->
				<tr class="logFlow-tr logFlow-category3">
					<td class="logFlow-td1">应用分类</td>
					<td class="logFlow-td2"></td>
				</tr>
				<tr class="logFlow-tr logFlow-file">
					<td class="logFlow-td1">日志文件</td>
					<td class="logFlow-td2"></td>
				</tr>
				<tr class="logFlow-tr logFlow-hostip">
					<td class="logFlow-td1">主机IP</td>
					<td class="logFlow-td2"></td>
				</tr>
				<!-- <tr class="logFlow-tr logFlow-logid">
					<td class="logFlow-td1">_head_.logid</td>
					<td class="logFlow-td2"></td>
				</tr> -->
				<tr class="logFlow-tr logFlow-logsn">
					<td class="logFlow-td1">日志ID</td>
					<td class="logFlow-td2"></td>
				</tr>
				<!-- <tr class="logFlow-tr logFlow-logtime">
					<td class="logFlow-td1">_head_.logtime</td>
					<td class="logFlow-td2"></td>
				</tr> -->
				<!-- <tr class="logFlow-tr logFlow-sourceid">
					<td class="logFlow-td1">_head_.sourceid</td>
					<td class="logFlow-td2"></td>
				</tr> -->
				<tr class="logFlow-tr logFlow-sourcename">
					<td class="logFlow-td1">日志源名称</td>
					<td class="logFlow-td2"></td>
				</tr>
				<!-- <tr class="logFlow-tr logFlow-type">
					<td class="logFlow-td1">_head_.type</td>
					<td class="logFlow-td2"></td>
				</tr> -->
			</table>
		</div>
		<div class="footer">
			<span class="logFlow-close">关闭</span>
			<span class="logFlow-detail">查看详情</span>
		</div>
	</div>
</section>


