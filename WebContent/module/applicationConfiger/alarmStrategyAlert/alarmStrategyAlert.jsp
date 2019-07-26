<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.appConfigAlarmStrategy-ctn {
    min-height: 700px;
    background: #fff;
    border: 1px solid #e5e5e5;
}

.appConfigAlarmStrategy-ctn>div {
    overflow: hidden;
}

.appConfigAlarmStrategy-ctn-header {
	width: calc(100% - 40px);
    height: 41px;
    line-height: 41px;
    padding: 0 20px;
    font-size: 16px;
    color: #000;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fafafa;
}

.appConfigAlarmStrategy-ctn-body {
    padding: 20px;
    background-color: #fff;
}

/* 基本策略配置Start */
.appConfigAlarmStrategy-base{
	display: flex;
}
.appConfigAlarmStrategy-base>div {
	height: 312px;
	border: 1px solid #e5e5e5;
    border-radius: 4px;
    flex: 1;
}

.appConfigAlarmStrategy-base-left {
	margin-right: 20px;
}

.appConfigAlarmStrategy-base-tit, .appConfigAlarmStrategy-effect-tit {
    background-color: #fafafa;
    padding: 0 20px;
    height: 39px;
    line-height: 39px;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
}

.appConfigAlarmStrategy-base-tit>div:nth-child(1) {
    float: left;
    color: #000;
}

.appConfigAlarmStrategy-base-tit>div:nth-child(2) {
    float: right;
    cursor: not-allowed;
    color: #13baf5;
    opacity: 0.6;
}

.appConfigAlarmStrategy-base-tit>div:nth-child(2)>i {
    width: 14px;
    height: 14px;
    margin-right: 2px;
    margin-top: 13px;
    background: url(img/app2Repository/modal_lib.png) no-repeat;
    float: left;
}

.appConfigAlarmStrategy-eaWarn, 
.appConfigAlarmStrategy-warn, 
.appConfigAlarmStrategy-notice {
	display: none;
    /* min-height: 430px; */
    float: left;
    margin-top: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
}

.appConfigAlarmStrategy-submit,
.appConfigAlarmStrategy-msgConfig {
    float: left;
    margin-top: 20px;
    width: 100%;
}

.appConfigAlarmStrategy-msgConfig {
	border: 1px solid #e5e5e5;
    border-radius: 4px;
}

.appConfigAlarmStrategy-eaWarn-tit, 
.appConfigAlarmStrategy-warn-tit, 
.appConfigAlarmStrategy-notice-tit {
	background-color: #fafafa;
    /* width: 1476px; */
    height: 39px;
    font-size: 14px;
    line-height: 39px;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 20px;
}

.appConfigAlarmStrategy-base-ctn, .appConfigAlarmStrategy-effect-ctn {
	position: relative;
    padding: 20px;
}

.appConfigAlarmStrategy-effect-ctn {
    padding-top: 6px !important;
}

.appConfigAlarmStrategy-base-ctn-items {
    height: 30px;
    line-height: 30px;
    padding-bottom: 12px;
    color: #666;
}

.appConfigAlarmStrategy-base-ctn-items-left {
    float: left;
    margin-right: 20px;
    width: 5em;
    margin-left: 5px;
}

.appConfigAlarmStrategy-base-ctn-items-right {
	display: flex;
    flex-wrap: nowrap;
}
span.appConfigAlarmStrategy-base-ctn-items-req {
    color: #f01024;
    font-weight: bold;
    font-size: 14px;
}

input.appConfigAlarmStrategy-base-ctn-items-input {
	height: 25px;
    width: calc(100% - 8em);
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    padding-left: 12px;
    margin-top: 3px;
}

input.appConfigAlarmStrategy-base-ctn-items-checkbox:nth-child(1) {
    margin-left: 0px;
}

input.appConfigAlarmStrategy-base-ctn-items-checkbox {
    margin: 9px 6px auto 20px;
}

.appConfigAlarmStrategy-base-ctn-items-btn>div:nth-child(1), 
.appConfigAlarmStrategy-base-ctn-items-btn>div:nth-child(2) {
	line-height: 30px;
    height: 30px;
    text-align: center;
    cursor: pointer;
    float: right;
    border-radius: 2px;
}

div#appConfigAlarmStrategyBaseAdd {
    cursor: not-allowed;
    opacity: 0.6;
}

.appConfigAlarmStrategy-base-ctn-items-btn>div:nth-child(1):hover, 
.appConfigAlarmStrategy-base-ctn-items-btn>div:nth-child(2):hover {
	opacity: 0.8;
}

.appConfigAlarmStrategy-base-ctn-items-btn>div:nth-child(1) {
    width: 90px;
    background-color: #5b62f9;
    color: #fff;
}

.appConfigAlarmStrategy-base-ctn-items-btn>div:nth-child(2) {
    width: 70px;
    background-color: #e5e5e5;
    color: #222;
    margin-right: 12px;
}

.appConfigAlarmStrategy-kpi-table .tinyselect .dropdown {
	text-align: left;
}
.appConfigAlarmStrategy-kpi-table table.dataTable.display tbody td{
	overflow: visible;
}
.appConfigAlarmStrategy-kpi-table table.dataTable.display tbody td>select,
.appConfigAlarmStrategy-kpi-table table.dataTable.display tbody td>input{
	margin: 0;
	width: calc(100% - 20px) !important;
}
.appConfigAlarmStrategy-kpi-table table.dataTable.display tbody td>.tinyselect {
	width: calc(100% - 20px) !important;
	vertical-align: middle;
}
.appConfigAlarmStrategy-base-ctn-items-select {
	position: relative;
    width: 60px;
    text-align: center;
    border: 1px solid #e5e5e5;
    margin-right: 12px;
    background-color: #fafafa;
    color: #666;
    cursor: pointer;
    height: 25px;
    line-height: 25px;
}

.appConfigAlarmStrategy-base-ctn-items-select:hover {
    border-color: #5b62f9;
    color: #5b62f9;
    background-color: #eefaff;
}

.appConfigAlarmStrategy-base-ctn-items-select-hover {
    border-color: #5b62f9;
    color: #5b62f9;
    background-color: #eefaff;
}

.appConfigAlarmStrategy-base-ctn-items-select-icon {
	display: none;
    /* background: url(img/app2Repository/alarmStrategy/check.png) no-repeat; */
    position: absolute;
    width: 16px;
    height: 16px;
    top: -2px;
    right: -2px;
}

.appConfigAlarmStrategy-effect-ctn-time {
    background-color: #fafafa;
    width: 100%;
    height: 200px;
    padding: 12px 20px 0px;
    box-sizing: border-box;
}

.appConfigAlarmStrategy-base-ctn-time-items {
    height: 30px;
    line-height: 30px;
    padding-bottom: 12px;
    color: #666;
}

span.appConfigAlarmStrategy-base-ctn-items-right-cycle {
    width: 60px;
    height: 30px;
    float: left;
    text-align: center;
    border: 1px solid #e5e5e5;
    cursor: pointer;
    transition: all linear .2s;
}

span.appConfigAlarmStrategy-base-ctn-items-right-cycle:hover {
    background-color: #5b62f9;
    color: #fff;
}

.appConfigAlarmStrategy-base-ctn-items-right-cycle-hover {
    background-color: #5b62f9;
    color: #fff;
}

span.appConfigAlarmStrategy-base-ctn-items-right-cycle:nth-child(1),
span.appConfigAlarmStrategy-base-ctn-items-right-cycle:nth-child(2),
span.appConfigAlarmStrategy-base-ctn-items-right-cycle:nth-child(3) {
	border-right: none;
}

.appConfigAlarmStrategy-base-ctn-items-other {
    font-size: 14px;
    color: #5b62f9;
    text-decoration: underline;
    margin-left: 12px;
    cursor: pointer;
}

.appConfigAlarmStrategy-base-ctn-items-right-date .xdsoft_datetimepicker {
	width: 243px !important;
	min-width: 100px !important;
}

.appConfigAlarmStrategy-base-ctn-items-right-time .xdsoft_datetimepicker {
	width: 76px !important;
	min-width: 10px !important;
}
.appConfigAlarmStrategy-base-ctn-items-selectNo {
    width: 60px;
    height: 25px;
    line-height: 25px;
    float: left;
    border: 1px solid #e5e5e5;
    margin-right: 12px;
    text-align: center;
    cursor: not-allowed;
    color: #999;
}
.appConfigAlarmStrategy-base-time-panel {
	display: none;
    position: absolute;
    width: 280px;
    height: 230px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    z-index: 2;
    top: 30px;
    padding: 12px;
    padding-right: 0px;
    box-shadow: 0px 1px 5px rgba(0,0,0,0.7);
}

#timeSelectPanelClearBtn {
    position: absolute;
    bottom: 10px;
    right: 60px;
    height: 25px;
    line-height: 25px;
    width: 40px;
    background-color: #e5e5e5;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
}

#timeSelectPanelConfirmBtn {
    position: absolute;
    bottom: 10px;
    right: 10px;
    height: 25px;
    line-height: 25px;
    width: 40px;
    background-color: #5b62f9;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
}

.appConfigAlarmStrategy-base-time-panel>div:hover {
	    opacity: 0.6;
}

.appConfigAlarmStrategy-base-time-panel td {
    min-width: 30px;
    height: 25px;
    line-height: 25px;
    float: left;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    margin: 0 12px 12px 0px;
    text-align: center;
    cursor: pointer;
}
.appConfigAlarmStrategy-base-time-panel td:hover {
    background-color: #5b62f9;
    color: #fff;
}

.appConfigAlarmStrategy-base-time-panel-td-hover {
    background-color: #5b62f9;
    color: #fff;
}
.appConfigAlarmStrategy-time-mask {
    position: absolute;
    width: calc(100% - 40px);
    height: 220px;
    background-color: #ccc;
    border-radius: 4px;
    top: 36px;
    opacity: 0.3;
    cursor: not-allowed;
}
/* 基本策略配置End */

/* 报警策略配置Start */
.appConfigAlarmStrategy-tit-copyBtn {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #5b62f9;
    text-decoration: underline;
    cursor: pointer;
    float: right;
}
.appConfigAlarmStrategy-notice-ctn,
.appConfigAlarmStrategy-eaWarn-ctn,
.appConfigAlarmStrategy-warn-ctn {
	overflow-x: hidden;
    height: 310px;
    padding: 12px 20px;
    overflow-y: hidden;
}
.appConfigAlarmStrategy-notice-ctn>div,
.appConfigAlarmStrategy-eaWarn-ctn>div,
.appConfigAlarmStrategy-warn-ctn>div
 {
    float: left;
    width: 100%;
    margin-bottom: 12px;
}

.appConfigAlarmStrategy-msgConfig-ctn {
    overflow: hidden;
    height: 362px;
    padding: 20px 20px 12px 20px;
    display: flex;
}

.appConfigAlarmStrategy-msgConfig-ctn>div {
	overflow: auto;
}

span.appConfigAlarmStrategy-base-ctn-items-tit {
    color: #666;
}
.appConfigAlarmStrategy-expression-tit {
    width: 70px;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    color: #666;
}
.appConfigAlarmStrategy-expression-radio {
    width: 200px;
    height: 30px;
    line-height: 30px;
    float: left;
    margin-left: 20px;
}

.appConfigAlarmStrategy-expression-radio>input {
    margin-right: 6px;
    margin-top: -2px;
    margin-left: 20px;
}

.appConfigAlarmStrategy-expression-radio>input:nth-child(1) {
    margin-left: 0px;
}
.appConfigAlarmStrategy-stragedy-tit {
    width: 7em;
    height: 30px;
    float: left;
    line-height: 30px;
    margin-left: 5px;
}
.appConfigAlarmStrategy-freq-ctn {
    float: left;
}
.appConfigAlarmStrategy-freq-count-ctn {
    float: left;
}
.appConfigAlarmStrategy-stragedy-obj {
	position: relative;
    width: 90px;
    height: 30px;
    line-height: 30px;
    float: left;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    margin-right: 12px;
    text-align: center;
    cursor: pointer;
    transition: all linear .2s;
}
.appConfigAlarmStrategy-stragedy-obj:nth-child(2):hover {
    color: #5b62f9;
    border-color: #5b62f9;
}
.appConfigAlarmStrategy-stragedy-obj:nth-child(1), 
.appConfigAlarmStrategy-stragedy-obj:nth-child(3) {
	cursor: not-allowed;
	opacity: 0.6;
}
.appConfigAlarmStrategy-stragedy-obj-clicked {
    color: #5b62f9;
    border-color: #5b62f9;
}
.appConfigAlarmStrategy-stragedy-obj>span {
    margin-left: 3px;
}
.appConfigAlarmStrategy-stragedy-ctn {
    float: left;
}
.appConfigAlarmStrategy-freq{
    display: flex;
    justify-content: space-between;
}
.appConfigAlarmStrategy-freq>div{
	width: calc(100% / 3);
}
.appConfigAlarmStrategy-kpi-table {
    border: 1px solid #e5e5e5;
}
td.appConfigAlarmStrategy-addTr {
    cursor: pointer;
    text-align: left;
    padding-left: 45px !important;
	transition: background-color linear .3s, color linear .3s;
}
.appConfigAlarmStrategy-rmTr {
    color: #5b62f9;
    cursor: pointer;
    font-size: 14px;
}
span.appConfigAlarmStrategy-saveTr {
    cursor: pointer;
    color: #5b62f9;
    margin-right: 12px;
}
span.appConfigAlarmStrategy-cancTr {
    cursor: pointer;
}
input.appConfigAlarmStrategy-freq-count-input {
    width: 78px !important;
}

/* .appConfigAlarmStrategy-kpi-addCtn {
	display: none;
} */

.appConfigAlarmStrategy-addTr:hover {
    background-color: #e5e5e5;
    /* color: #fff; */
}

.appConfigAlarmStrategy-kpi-table .fa-trash {
    font-size: 14px;
    color: #5b62f9;
    cursor: pointer;
}
.appConfigAlarmStrategy-kpi-addCtn select {
    margin-bottom: 0px !important;
    width: 200px;
}
.appConfigAlarmStrategy-kpi-addCtn input {
    width: 186px;
    margin: 0;
}
.appConfigAlarmStrategy-kpi-addCtn td {
    line-height: 25px;
}
.appConfigAlarmStrategy-kpi-table-tr select {
	background-color: #fafafa !important;
    width: 150px;
}
.appConfigAlarmStrategy-kpi-table-tr input {
	background-color: #fafafa !important;
    width: 136px;
}
/* 报警策略配置End */

/* 信息配置Start */
.appConfigAlarmStrategy-warn-ctn-msg {
    width: 48% !important;
}

.appConfigAlarmStrategy-warn-ctn-var {
    width: 51% !important;
}

.appConfigAlarmStrategy-msgConfig-items {
	overflow: hidden;
}
.appConfigAlarmStrategy-msgConfig-items-tit{
    width: 7em;
}

.appConfigAlarmStrategy-msgConfig-items>div {
    float: left;
}
.appConfigAlarmStrategy-msgConfig-items-ctn {
   width: calc(100% - 7em);
}
.appConfigAlarmStrategy-msgConfig-textarea {
	width: 100%;
    height: 110px;
    resize: none;
}

.appConfigAlarmStrategy-warn-ctn-var-tit {
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
}

.appConfigAlarmStrategy-warn-ctn-var {
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    margin-left: 12px;
    background: #fafafa;
}
.appConfigAlarmStrategy-msg-userRoleList {
    width: 100%;
    float: left;
    margin-top: 6px;
    margin-bottom: 12px;
    padding-left: 78px;
    position: relative;
}

.appConfigAlarmStrategy-msg-userList {
	display: none;
    width: 110px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    background-color: #5b62f9;
    color: #fff;
    cursor: pointer;
    position: absolute;
}

div#appConfigAlarmStrategyObjMsgUser {
    left: 197px;
}

.appConfigAlarmStrategy-msg-userList:hover {
    opacity: 0.8;
}

.appConfigAlarmStrategy-warn-ctn-var-ctn {
    padding: 20px;
    padding-top: 0;
    overflow: hidden;
    overflow-y: visible;
}
.appConfigAlarmStrategy-common-var{
	padding: 20px;
    overflow: hidden;
    overflow-y: visible;
    border-bottom: 1px solid #eee;
}
.appConfigAlarmStrategy-warn-var {
    /* min-height: 50px; */
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    /* border-radius: 4px; */
    /* background-color: #fff; */
    padding: 20px 0px 12px;
    float: left;
}
.appConfigAlarmStrategy-common-var>span,
.appConfigAlarmStrategy-warn-var>span {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    margin-right: 12px;
    float: left;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 0 12px;
    background-color: #fff;
    margin-bottom: 12px;
}

.appConfigAlarmStrategy-warn-var-item:hover {
    border: 1px solid #5b62f9;
}
/* 信息配置End */

/* 执行取消按钮 Start */
.appConfigAlarmStrategy-submit>div {
    font-size: 14px;
	cursor: pointer;
    float: right;
    margin-left: 12px;
    width: 70px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    text-align: center;
}
.appConfigAlarmStrategy-submit>div:nth-child(2) {
    background: #e5e5e5;
    color: #222;
}
.appConfigAlarmStrategy-submit>div:nth-child(1) {
    background: #5b62f9;
    color: #fff;
}
.appConfigAlarmStrategy-submit>div:hover {
	opacity: 0.8;
}
/* 执行取消按钮 End */
/* 发送用户列表弹窗 Start */
.appConfigAlarmStrategy-modal .modal-header {
    background-color: #fafafa;
    padding: 6px 20px;
}

.appConfigAlarmStrategy-modal{
    padding: 0px;
    width: 800px;
    height: 600px;
}

.appConfigAlarmStrategy-modal .modal-body {
    padding: 20px;
    max-height: 530px;
    overflow-y: hidden;
}
.appConfigAlarmStrategy-modal .main-right>ul>li{
	background-color: #e5e5e5;
	box-shadow: none;
}

.appConfigAlarmStrategy-modal .main-right>ul>li.active{
	background-color: rgba(241, 244, 246, .6);
}

.appConfigAlarmStrategy-modal .dataTables_filter {
    margin-bottom: 0px !important;
}
.appConfigAlarmStrategy-modal .dataTables_scrollHeadInner .dataTable.no-footer{
	width: 718px !important;
}
.appConfigAlarmStrategy-kpi-table table.dataTable tbody>tr {
	height: 45px;
}
.appConfigAlarmStrategy-base-ctn-items-right .group-ctn {
	position: absolute;
	top: 28px;
	left: 0;
	width: 100%;
	box-sizing: border-box;
	border: 1px solid #ddd;
	margin: 0;
	width: 344px;
	background: #fff;
	max-height: 200px;
	z-index: 50;
	overflow-y: auto;
}
.appConfigAlarmStrategy-base-ctn-items-right .group-ctn li {
	padding: 2px 10px;
    box-sizing: border-box;
    border-bottom: 1px #e3e3e3 solid;
    word-break: break-all;
    cursor: pointer;
}
.appConfigAlarmStrategy-base-ctn-items-right .group-ctn li.selected{
	background: #1E90FF;
    color: #fff;
}
/* 发送用户列表弹窗 End */
</style>
<!-- 策略配置弹窗 Start -->
<div class="appConfigAlarmStrategy-ctn" style="margin:0;">
	<div class="appConfigAlarmStrategy-ctn-header">策略配置</div>
	<div class="appConfigAlarmStrategy-ctn-body">
		<div class="appConfigAlarmStrategy-base">
			<div class="appConfigAlarmStrategy-base-left">
				<div class="appConfigAlarmStrategy-base-tit">
					<div>基本策略配置</div>
					<!-- <div><i></i><span>模板库</span></div> -->
				</div>
				<div class="appConfigAlarmStrategy-base-ctn">
					<div class="appConfigAlarmStrategy-base-ctn-items">
						<div class="appConfigAlarmStrategy-base-ctn-items-left">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">策略名称</span>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-items-right">
							<input type="text" class="appConfigAlarmStrategy-base-ctn-items-input" data-role="strategyName" placeholder="请输入策略名称">
						</div>
					</div>
					<div class="appConfigAlarmStrategy-base-ctn-items">
						<div class="appConfigAlarmStrategy-base-ctn-items-left">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">提示音</span>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-items-right">
							<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="voice" data-role="noticeVoice" checked="checked">提示音1
							<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="voice" data-role="noticeVoice">提示音2
							<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="voice" data-role="noticeVoice">提示音3
							<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="voice" data-role="noticeVoice">提示音4
						</div>
					</div>
					<!-- <div class="appConfigAlarmStrategy-base-ctn-items">
						<div class="appConfigAlarmStrategy-base-ctn-items-left">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">报警级别</span>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-items-right">
							<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level" data-role="alertLevel">1级
							<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level" data-role="alertLevel">2级
							<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level" data-role="alertLevel">3级
							<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level" data-role="alertLevel" checked="checked">4级
						</div>
					</div> -->
					<div class="appConfigAlarmStrategy-base-ctn-items">
						<div class="appConfigAlarmStrategy-base-ctn-items-left">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">报警方式</span>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-items-right">
							<div class="appConfigAlarmStrategy-base-ctn-items-select" id="alarmStrategyNotice" data-role="alertMethod">
								<span>通知</span>
								<div class="appConfigAlarmStrategy-base-ctn-items-select-icon"></div>
							</div>
							<div class="appConfigAlarmStrategy-base-ctn-items-select" id="alarmStrategyEaWarn" data-role="alertMethod">
								<span>预警</span>
								<div class="appConfigAlarmStrategy-base-ctn-items-select-icon"></div>
							</div>
							<div class="appConfigAlarmStrategy-base-ctn-items-select" id="alarmStrategyWarn" data-role="alertMethod">
								<span>告警</span>
								<div class="appConfigAlarmStrategy-base-ctn-items-select-icon"></div>
							</div>
						</div>
					</div>
					<div class="appConfigAlarmStrategy-base-ctn-items">
						<div class="appConfigAlarmStrategy-base-ctn-items-left">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">策略状态</span>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-items-right">
							<input id="editstate" name="state" type="checkbox" data-role="editstate">
						</div>
					</div>
					<div class="appConfigAlarmStrategy-base-ctn-items">
						<div class="appConfigAlarmStrategy-base-ctn-items-left">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">策略分组</span>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-items-right" style="position: relative;">
							<input id="groupInput" type="text" class="appConfigAlarmStrategy-base-ctn-items-input" placeholder="点击选择分组" style="cursor: pointer; width: 344px;">
							<ul id="groupCtn" class="group-ctn hide">

							</ul>
						</div>
					</div>
					<div class="appConfigAlarmStrategy-base-ctn-items">
						<div class="appConfigAlarmStrategy-base-ctn-items-btn">
							<!-- <div id="appConfigAlarmStrategyBaseAdd">加入模板</div>
							<div id="appConfigAlarmStrategyBaseReset">重置</div> -->
						</div>
					</div>
				</div>
			</div>
			<div class="appConfigAlarmStrategy-base-right">
				<div class="appConfigAlarmStrategy-effect-tit">生效时段</div>
				<div class="appConfigAlarmStrategy-effect-ctn">
					<div class="appConfigAlarmStrategy-base-ctn-items" style="padding-bottom: 0px;">
						<div class="appConfigAlarmStrategy-base-ctn-items-left">
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">按时段报警</span>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-items-right">
							<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="effect" data-role="timeAlert" disabled>是
							<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="effect" data-role="timeAlert" checked="checked">否
						</div>
					</div>
					<div class="appConfigAlarmStrategy-effect-ctn-time">
						<div class="appConfigAlarmStrategy-base-ctn-time-items">
							<div class="appConfigAlarmStrategy-base-ctn-items-left">
								<span class="appConfigAlarmStrategy-base-ctn-items-tit">生效日期</span>
							</div>
							<div class="appConfigAlarmStrategy-base-ctn-items-right">
								<div class="appConfigAlarmStrategy-base-ctn-items-right-date">
									<input type="text" id="startDate" class="form_datetime1-input span6" placeholder="开始日期">&nbsp&nbsp——&nbsp&nbsp
									<input type="text" id="endDate" class="form_datetime1-input span6" placeholder="结束日期">
								</div>
							</div>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-time-items">
							<div class="appConfigAlarmStrategy-base-ctn-items-left">
								<span class="appConfigAlarmStrategy-base-ctn-items-tit">预警周期</span>
							</div>
							<div class="appConfigAlarmStrategy-base-ctn-items-right">
								<span class="appConfigAlarmStrategy-base-ctn-items-right-cycle appConfigAlarmStrategy-base-ctn-items-right-cycle-hover">星期</span>
								<span class="appConfigAlarmStrategy-base-ctn-items-right-cycle">月份</span>
								<span class="appConfigAlarmStrategy-base-ctn-items-right-cycle">日期</span>
								<span class="appConfigAlarmStrategy-base-ctn-items-right-cycle">工作日</span>
								<span class="appConfigAlarmStrategy-base-ctn-items-right-cycle">节假日</span>
							</div>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-time-items">
							<div class="appConfigAlarmStrategy-base-ctn-items-left">
								<span class="appConfigAlarmStrategy-base-ctn-items-tit">按星期</span>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-right">
									<div class="appConfigAlarmStrategy-base-ctn-items-select" data-role="weekSelect">
									<span>星期一</span>
									<div class="appConfigAlarmStrategy-base-ctn-items-select-icon"></div>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-select" data-role="weekSelect">
									<span>星期二</span>
									<div class="appConfigAlarmStrategy-base-ctn-items-select-icon"></div>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-select" data-role="weekSelect">
									<span>星期三</span>
									<div class="appConfigAlarmStrategy-base-ctn-items-select-icon"></div>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-select" data-role="weekSelect">
									<span>星期四</span>
									<div class="appConfigAlarmStrategy-base-ctn-items-select-icon"></div>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-select" data-role="weekSelect">
									<span>星期五</span>
									<div class="appConfigAlarmStrategy-base-ctn-items-select-icon"></div>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-select" data-role="weekSelect">
									<span>星期六</span>
									<div class="appConfigAlarmStrategy-base-ctn-items-select-icon"></div>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-select" data-role="weekSelect">
									<span>星期日</span>
									<div class="appConfigAlarmStrategy-base-ctn-items-select-icon"></div>
								</div>
							</div>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-time-items" style="display: none">
							<div class="appConfigAlarmStrategy-base-ctn-items-left">
								<span class="appConfigAlarmStrategy-base-ctn-items-tit">日期</span>
							</div>
							<div class="appConfigAlarmStrategy-base-ctn-items-right">
								<div class="appConfigAlarmStrategy-base-ctn-items-right-time" style="position: relative;width: 100%">
									<input type="text" id="timeSelect" data-role="daySelect" placeholder="日期范围：1-31；使用例子：L,1,3,5  (代表每个月的第1、3、5天, L表示最后一天，可不选)" title="日期范围：1-31；使用例子：L,1,3,5  (代表每个月的第1、3、5天, L表示最后一天，可不选)" style="width: 100%">
									<div id="timeSelectPanel" class="appConfigAlarmStrategy-base-time-panel">
										<table>
											<tr><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr>
											<tr><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td></tr>
											<tr><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td></tr>
											<tr><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td></tr>
											<tr><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td></tr>
											<tr><td>31</td><td>最后一天</td></tr>
										</table>
										<div id="timeSelectPanelClearBtn">重置</div>
										<div id="timeSelectPanelConfirmBtn">确定</div>
									</div>
								</div>
							</div>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-time-items" style="display: none">
							<div class="appConfigAlarmStrategy-base-ctn-items-left">
								<span class="appConfigAlarmStrategy-base-ctn-items-tit">按星期</span>
							</div>
							<div class="appConfigAlarmStrategy-base-ctn-items-right">
								<div class="appConfigAlarmStrategy-base-ctn-items-selectNo">
									<span>星期一</span>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-selectNo">
									<span>星期二</span>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-selectNo">
									<span>星期三</span>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-selectNo">
									<span>星期四</span>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-selectNo">
									<span>星期五</span>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-selectNo">
									<span>星期六</span>
								</div>
								<div class="appConfigAlarmStrategy-base-ctn-items-selectNo">
									<span>星期日</span>
								</div>
							</div>
						</div>
						<div class="appConfigAlarmStrategy-base-ctn-time-items">
							<div class="appConfigAlarmStrategy-base-ctn-items-left">
								<span class="appConfigAlarmStrategy-base-ctn-items-tit">生效时间</span>
							</div>
							<div class="appConfigAlarmStrategy-base-ctn-items-right">
								<div class="appConfigAlarmStrategy-base-ctn-items-right-time">
									<input type="text" id="startTime" class="form_datetime1-input span6" placeholder="开始时间">&nbsp&nbsp——&nbsp&nbsp
									<input type="text" id="endTime" class="form_datetime1-input span6" placeholder="结束时间">
								</div>
							</div>
						</div>
						<!-- <div class="appConfigAlarmStrategy-base-ctn-time-items">
							<div class="appConfigAlarmStrategy-base-ctn-items-left">
								<span class="appConfigAlarmStrategy-base-ctn-items-tit">开始时间</span>
							</div>
							<div class="appConfigAlarmStrategy-base-ctn-items-right">
								<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="across" checked="checked">跨天有效
								<span class="appConfigAlarmStrategy-base-ctn-items-other">其他时间段设置</span>
							</div>
						</div> -->
					</div>
					<div class="appConfigAlarmStrategy-time-mask"></div>
				</div>
			</div>
			
		</div>
		<div class="appConfigAlarmStrategy-notice">
			<div class="appConfigAlarmStrategy-notice-tit">通知配置<div class="appConfigAlarmStrategy-tit-copyBtn" id="appConfigAlarmStrategyNoticeCopyBtn" data-role="configCopyBtn">复制预警配置信息</div></div>
			<div class="appConfigAlarmStrategy-notice-ctn">
				<div class="appConfigAlarmStrategy-expression">
					<div class="appConfigAlarmStrategy-expression-tit">表达式类型</div>
					<div class="appConfigAlarmStrategy-expression-radio">
						<input type="radio" name="noticeExpress" data-role="expression" checked="checked">条件表达式
						<input type="radio" name="noticeExpress" data-role="expression" disabled="disabled">动态报警
					</div>
				</div>
				<div class="appConfigAlarmStrategy-kpi">
					<div class="appConfigAlarmStrategy-kpi-table">
						<table class="display dataTable table" style="width:100%;">
							<colgroup>
								<col width="6%"/>
								<col width="15%"/>
								<col width="15%"/>
								<col width="11%"/>
								<col width="11%"/>
								<col width="11%"/>
								<col width="11%"/>
								<col width="10%"/>
								<col width="10%"/>
							</colgroup>
							<thead>
								<tr>
									<th>序号</th>
									<th>监控指标</th>
									<th>指标列表</th>
									<th>条件表达式</th>
									<th>条件阀值</th>
									<th>自动恢复表达式</th>
									<th>恢复阀值</th>
									<th>与或</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<!-- <tr class="" id="appConfigAlarmStrategyAddTrCtn">
									<td id="appConfigAlarmStrategyAddTr">1</td>
									<td id="appConfigAlarmStrategyAddTr">磁盘空间</td>
									<td id="appConfigAlarmStrategyAddTr">文件系统目录</td>
									<td id="appConfigAlarmStrategyAddTr">NOTLIKE</td>
									<td id="appConfigAlarmStrategyAddTr">TEMP</td>
									<td id="appConfigAlarmStrategyAddTr">AND</td>
									<td id="appConfigAlarmStrategyAddTr"><i class="fa fa-trash appConfigAlarmStrategy-rmTr" data-role="appConfigAlarmStrategyRmTr"></i></td>
								</tr> -->
								<tr class="appConfigAlarmStrategy-kpi-addCtn" id="appConfigAlarmStrategyKpiAddTrCtn">
									<td>0</td>
									<td><select data-role="monitorKpi"><option>--请选择--</option></select></td>
									<td><select data-role="kpiSub"><option>--请选择--</option></select></td>
									<td><select data-role="condition"><option>--请选择--</option></select></td>
									<td style="position: relative;"><input type="text" data-role="threshold" placeholder="请输入阀值">
										<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
									</td>
									<td><select data-role="rmeid"><option>--请选择--</option></select></td>
									<td style="position: relative;"><input type="text" data-role="recoverValue" placeholder="请输入阀值">
										<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
									</td>
									<td>
										<select data-role="andOr" disabled>
											<option>--请选择--</option>
											<option value="and">AND</option>
											<option value="or">OR</option>
										</select>
									</td>
									<td><span class="appConfigAlarmStrategy-saveTr" data-role="appConfigAlarmStrategySaveTr">保存</span><span class="appConfigAlarmStrategy-cancTr" data-role="appConfigAlarmStrategyCancTr">取消</span></td>
								</tr>
								<tr style="display: none">
									<td class="appConfigAlarmStrategy-addTr" colspan="7"><i class="fa fa-plus"></i>添加</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="appConfigAlarmStrategy-freq">
					<div class="appConfigAlarmStrategy-freq-type">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">报警类型</span>
						</div>
						<div class="appConfigAlarmStrategy-freq-ctn">
							<select data-role="alertType" style="margin-top: 3px;">
								<option>--请选择--</option>
								<option value="duration_time">持续时间</option>
								<option value="duration_times">持续次数</option>
								<option value="oneTime">一次触发</option>
								<option value="oneDay">每天只报警一次</option>
							</select>
						</div>
					</div>
					<div class="appConfigAlarmStrategy-freq-count">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">连续触发次数</span>
						</div>
						<div class="appConfigAlarmStrategy-freq-count-ctn">
							<input type="text" data-role="contintCount" class="appConfigAlarmStrategy-freq-count-input"  style="margin-top: 3px;">
						</div>
					</div>
					<!-- <div class="appConfigAlarmStrategy-freq-continue">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">持续报警</span>
						</div>
						<div class="appConfigAlarmStrategy-freq-continue-ctn">
							<input id="noticeContinueAlert" data-role="isContinueAlarm" name="state" type="checkbox">
						</div>
					</div> -->
					<!-- 临时放在这里，持续报警展示后删除 -->
					<div class="appConfigAlarmStrategy-msg-recover">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">是否自动恢复</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<input data-role="isRecoverable" name="isRecoverable" type="checkbox">
						</div>
					</div>
					<div class="appConfigAlarmStrategy-msg-recover">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送恢复信息</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<input id="noticeRecoverMsg" data-role="isSendRecMsg" name="state" type="checkbox">
						</div>
					</div>
				</div>
				<div class="appConfigAlarmStrategy-base-ctn-items">
					<div class="appConfigAlarmStrategy-base-ctn-items-left">
						<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
						<span class="appConfigAlarmStrategy-base-ctn-items-tit">报警级别</span>
					</div>
					<div class="appConfigAlarmStrategy-base-ctn-items-right">
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level1" data-role="alertLevel">1级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level1" data-role="alertLevel">2级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level1" data-role="alertLevel">3级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level1" data-role="alertLevel">4级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level1" data-role="alertLevel">5级
					</div>
				</div>
				<div class="appConfigAlarmStrategy-msg">
					<div class="appConfigAlarmStrategy-msg-obj">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送对象</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<div class="appConfigAlarmStrategy-stragedy-obj" data-role="sendObj">
								<i class="fa fa-envelope"></i>
								<span>邮件</span>
							</div>
							<div class="appConfigAlarmStrategy-stragedy-obj" data-role="sendObj">
								<i class="fa fa-mobile" style="font-size: 24px;margin-top: 3px;margin-right: 36px;"></i>
								<span style="position: absolute;margin-left: -28px;">短信</span>
							</div>
							<div class="appConfigAlarmStrategy-stragedy-obj" data-role="sendObj">
								<i class="fa fa-wechat"></i>
								<span>微信</span>
							</div>
						</div>
					</div>
					<!-- <div class="appConfigAlarmStrategy-msg-recover">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送恢复信息</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<input id="noticeRecoverMsg" data-role="isSendRecMsg" name="state" type="checkbox">
						</div>
					</div> -->
					<div class="appConfigAlarmStrategy-msg-userRoleList">
						<div class="appConfigAlarmStrategy-msg-userList" id="appConfigAlarmStrategyObjEmailUser" data-role="noticeAccount">选择邮件发送用户</div>
						<div class="appConfigAlarmStrategy-msg-userList" id="appConfigAlarmStrategyObjMsgUser" data-role="noticeAccount">选择短信发送用户</div>
					</div>
				</div>
			</div>
		</div>
		<div class="appConfigAlarmStrategy-eaWarn">
			<div class="appConfigAlarmStrategy-eaWarn-tit">预警配置<div class="appConfigAlarmStrategy-tit-copyBtn" id="appConfigAlarmStrategyEaWarnCopyBtn" data-role="configCopyBtn">复制告警配置信息</div></div>
			<div class="appConfigAlarmStrategy-eaWarn-ctn">
				<div class="appConfigAlarmStrategy-expression">
					<div class="appConfigAlarmStrategy-expression-tit">表达式类型</div>
					<div class="appConfigAlarmStrategy-expression-radio">
						<input type="radio" name="express" data-role="expression" checked="checked">条件表达式
						<input type="radio" name="express" data-role="expression" disabled="disabled">动态报警
					</div>
				</div>
				<div class="appConfigAlarmStrategy-kpi">
					<div class="appConfigAlarmStrategy-kpi-table">
						<table class="display dataTable table" style="width:100%;">
							<colgroup>
								<col width="6%"/>
								<col width="15%"/>
								<col width="15%"/>
								<col width="11%"/>
								<col width="11%"/>
								<col width="11%"/>
								<col width="11%"/>
								<col width="10%"/>
								<col width="10%"/>
							</colgroup>
							<thead>
								<tr>
									<th>序号</th>
									<th>监控指标</th>
									<th>指标列表</th>
									<th>条件表达式</th>
									<th>条件阀值</th>
									<th>自动恢复表达式</th>
									<th>恢复阀值</th>
									<th>与或</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<!-- <tr class="" id="appConfigAlarmStrategyAddTrCtn">
									<td id="appConfigAlarmStrategyAddTr">1</td>
									<td id="appConfigAlarmStrategyAddTr">磁盘空间</td>
									<td id="appConfigAlarmStrategyAddTr">文件系统目录</td>
									<td id="appConfigAlarmStrategyAddTr">NOTLIKE</td>
									<td id="appConfigAlarmStrategyAddTr">TEMP</td>
									<td id="appConfigAlarmStrategyAddTr">AND</td>
									<td id="appConfigAlarmStrategyAddTr"><i class="fa fa-trash appConfigAlarmStrategy-rmTr" data-role="appConfigAlarmStrategyRmTr"></i></td>
								</tr> -->
								<tr class="appConfigAlarmStrategy-kpi-addCtn" id="appConfigAlarmStrategyKpiAddTrCtn">
									<td>0</td>
									<td><select data-role="monitorKpi"><option>--请选择--</option></select></td>
									<td><select data-role="kpiSub"><option>--请选择--</option></select></td>
									<td><select data-role="condition"><option>--请选择--</option></select></td>
									<td style="position: relative;"><input type="text" data-role="threshold" placeholder="请输入阀值">
										<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
									</td>
									<td><select data-role="rmeid"><option>--请选择--</option></select></td>
									<td style="position: relative;"><input type="text" data-role="recoverValue" placeholder="请输入阀值">
										<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
									</td>
									<td>
										<select data-role="andOr" disabled>
											<option>--请选择--</option>
											<option value="and">AND</option>
											<option value="or">OR</option>
										</select>
									</td>
									<td><span class="appConfigAlarmStrategy-saveTr" data-role="appConfigAlarmStrategySaveTr">保存</span><span class="appConfigAlarmStrategy-cancTr" data-role="appConfigAlarmStrategyCancTr">取消</span></td>
								</tr>
								<tr style="display: none">
									<td class="appConfigAlarmStrategy-addTr" colspan="7"><i class="fa fa-plus"></i>添加</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="appConfigAlarmStrategy-freq">
					<div class="appConfigAlarmStrategy-freq-type">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">报警类型</span>
						</div>
						<div class="appConfigAlarmStrategy-freq-ctn">
							<select data-role="alertType"  style="margin-top: 3px;">
								<option>--请选择--</option>
								<option value="duration_time">持续时间</option>
								<option value="duration_times">持续次数</option>
								<option value="oneTime">一次触发</option>
								<option value="oneDay">每天只报警一次</option>
							</select>
						</div>
					</div>
					<div class="appConfigAlarmStrategy-freq-count">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">连续触发次数</span>
						</div>
						<div class="appConfigAlarmStrategy-freq-count-ctn">
							<input type="text" data-role="contintCount" class="appConfigAlarmStrategy-freq-count-input"  style="margin-top: 3px;">
						</div>
					</div>
					<!-- <div class="appConfigAlarmStrategy-freq-continue">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">持续报警</span>
						</div>
						<div class="appConfigAlarmStrategy-freq-continue-ctn">
							<input id="eaWarnContinueAlert" data-role="isContinueAlarm" name="state" type="checkbox">
						</div>
					</div> -->
					<!-- 临时放在这里，持续报警展示后删除 -->
					<div class="appConfigAlarmStrategy-msg-recover">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">是否自动恢复</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<input data-role="isRecoverable" name="isRecoverable" type="checkbox">
						</div>
					</div>
					<div class="appConfigAlarmStrategy-msg-recover">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送恢复信息</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<input id="noticeRecoverMsg" data-role="isSendRecMsg" name="state" type="checkbox">
						</div>
					</div>
				</div>
				<div class="appConfigAlarmStrategy-base-ctn-items">
					<div class="appConfigAlarmStrategy-base-ctn-items-left">
						<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
						<span class="appConfigAlarmStrategy-base-ctn-items-tit">报警级别</span>
					</div>
					<div class="appConfigAlarmStrategy-base-ctn-items-right">
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level2" data-role="alertLevel">1级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level2" data-role="alertLevel">2级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level2" data-role="alertLevel">3级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level2" data-role="alertLevel">4级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level2" data-role="alertLevel">5级
					</div>
				</div>
				<div class="appConfigAlarmStrategy-msg">
					<div class="appConfigAlarmStrategy-msg-obj">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送对象</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<div class="appConfigAlarmStrategy-stragedy-obj"  data-role="sendObj">
								<i class="fa fa-envelope"></i>
								<span>邮件</span>
							</div>
							<div class="appConfigAlarmStrategy-stragedy-obj"  data-role="sendObj">
								<i class="fa fa-mobile" style="font-size: 24px;margin-top: 3px;margin-right: 36px;"></i>
								<span style="position: absolute;margin-left: -28px;">短信</span>
							</div>
							<div class="appConfigAlarmStrategy-stragedy-obj"  data-role="sendObj">
								<i class="fa fa-wechat"></i>
								<span>微信</span>
							</div>
						</div>
					</div>
					<!-- <div class="appConfigAlarmStrategy-msg-recover">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送恢复信息</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<input id="eaWarnRecoverMsg" data-role="isSendRecMsg" name="state" type="checkbox">
						</div>
					</div> -->
					<div class="appConfigAlarmStrategy-msg-userRoleList">
						<div class="appConfigAlarmStrategy-msg-userList" id="appConfigAlarmStrategyObjEmailUser" data-role="eaWarnAccount">选择邮件发送用户</div>
						<div class="appConfigAlarmStrategy-msg-userList" id="appConfigAlarmStrategyObjMsgUser" data-role="eaWarnAccount">选择短信发送用户</div>
					</div>
				</div>
			</div>
		</div>
		<div class="appConfigAlarmStrategy-warn">
			<div class="appConfigAlarmStrategy-warn-tit">告警配置<div class="appConfigAlarmStrategy-tit-copyBtn" id="appConfigAlarmStrategyWarnCopyBtn" data-role="configCopyBtn">复制预警配置信息</div></div>
			<div class="appConfigAlarmStrategy-warn-ctn">
				<div class="appConfigAlarmStrategy-expression">
					<div class="appConfigAlarmStrategy-expression-tit">表达式类型</div>
					<div class="appConfigAlarmStrategy-expression-radio">
						<input type="radio" name="warnExpress" data-role="expression" checked="checked">条件表达式
						<input type="radio" name="warnExpress" data-role="expression" disabled="disabled">动态报警
					</div>
				</div>
				<div class="appConfigAlarmStrategy-kpi">
					<div class="appConfigAlarmStrategy-kpi-table">
						<table class="display dataTable table" style="width:100%;">
							<colgroup>
								<col width="6%"/>
								<col width="15%"/>
								<col width="15%"/>
								<col width="11%"/>
								<col width="11%"/>
								<col width="11%"/>
								<col width="11%"/>
								<col width="10%"/>
								<col width="10%"/>
							</colgroup>
							<thead>
								<tr>
									<th>序号</th>
									<th>监控指标</th>
									<th>指标列表</th>
									<th>条件表达式</th>
									<th>条件阀值</th>
									<th>自动恢复表达式</th>
									<th>恢复阀值</th>
									<th>与或</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<!-- <tr class="" id="appConfigAlarmStrategyAddTrCtn">
									<td id="appConfigAlarmStrategyAddTr">1</td>
									<td id="appConfigAlarmStrategyAddTr">磁盘空间</td>
									<td id="appConfigAlarmStrategyAddTr">文件系统目录</td>
									<td id="appConfigAlarmStrategyAddTr">NOTLIKE</td>
									<td id="appConfigAlarmStrategyAddTr">TEMP</td>
									<td id="appConfigAlarmStrategyAddTr">AND</td>
									<td id="appConfigAlarmStrategyAddTr"><i class="fa fa-trash appConfigAlarmStrategy-rmTr" data-role="appConfigAlarmStrategyRmTr"></i></td>
								</tr> -->
								<tr class="appConfigAlarmStrategy-kpi-addCtn" id="appConfigAlarmStrategyKpiAddTrCtn">
									<td>0</td>
									<td><select data-role="monitorKpi"><option>--请选择--</option></select></td>
									<td><select data-role="kpiSub"><option>--请选择--</option></select></td>
									<td><select data-role="condition"><option>--请选择--</option></select></td>
									<td style="position: relative;"><input type="text" data-role="threshold" placeholder="请输入阀值">
										<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
									</td>
									<td><select data-role="rmeid"><option>--请选择--</option></select></td>
									<td style="position: relative;"><input type="text" data-role="recoverValue" placeholder="请输入阀值">
										<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
									</td>
									<td>
										<select data-role="andOr" disabled>
											<option>--请选择--</option>
											<option value="and">AND</option>
											<option value="or">OR</option>
										</select>
									</td>
									<td><span class="appConfigAlarmStrategy-saveTr" data-role="appConfigAlarmStrategySaveTr">保存</span><span class="appConfigAlarmStrategy-cancTr" data-role="appConfigAlarmStrategyCancTr">取消</span></td>
								</tr>
								<tr style="display: none">
									<td class="appConfigAlarmStrategy-addTr" colspan="7"><i class="fa fa-plus"></i>添加</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="appConfigAlarmStrategy-freq">
					<div class="appConfigAlarmStrategy-freq-type">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">报警类型</span>
						</div>
						<div class="appConfigAlarmStrategy-freq-ctn">
							<select data-role="alertType"  style="margin-top: 3px;">
								<option>--请选择--</option>
								<option value="duration_time">持续时间</option>
								<option value="duration_times">持续次数</option>
								<option value="oneTime">一次触发</option>
								<option value="oneDay">每天只报警一次</option>
							</select>
						</div>
					</div>
					<div class="appConfigAlarmStrategy-freq-count">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">连续触发次数</span>
						</div>
						<div class="appConfigAlarmStrategy-freq-count-ctn">
							<input type="text" data-role="contintCount" class="appConfigAlarmStrategy-freq-count-input" style="margin-top: 3px;">
						</div>
					</div>
					<!-- <div class="appConfigAlarmStrategy-freq-continue">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">持续报警</span>
						</div>
						<div class="appConfigAlarmStrategy-freq-continue-ctn">
							<input id="warnContinueAlert" data-role="isContinueAlarm" name="state" type="checkbox">
						</div>
					</div> -->
					<!-- 临时放在这里，持续报警展示后删除 -->
					<div class="appConfigAlarmStrategy-msg-recover">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">是否自动恢复</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<input data-role="isRecoverable" name="isRecoverable" type="checkbox">
						</div>
					</div>
					<div class="appConfigAlarmStrategy-msg-recover">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送恢复信息</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<input id="noticeRecoverMsg" data-role="isSendRecMsg" name="state" type="checkbox">
						</div>
					</div>
				</div>
				<div class="appConfigAlarmStrategy-base-ctn-items">
					<div class="appConfigAlarmStrategy-base-ctn-items-left">
						<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
						<span class="appConfigAlarmStrategy-base-ctn-items-tit">报警级别</span>
					</div>
					<div class="appConfigAlarmStrategy-base-ctn-items-right">
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level3" data-role="alertLevel">1级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level3" data-role="alertLevel">2级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level3" data-role="alertLevel">3级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level3" data-role="alertLevel">4级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level3" data-role="alertLevel">5级
					</div>
				</div>
				<div class="appConfigAlarmStrategy-msg">
					<div class="appConfigAlarmStrategy-msg-obj">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送对象</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<div class="appConfigAlarmStrategy-stragedy-obj"  data-role="sendObj">
								<i class="fa fa-envelope"></i>
								<span>邮件</span>
							</div>
							<div class="appConfigAlarmStrategy-stragedy-obj"  data-role="sendObj">
								<i class="fa fa-mobile" style="font-size: 24px;margin-top: 3px;margin-right: 36px;"></i>
								<span style="position: absolute;margin-left: -28px;">短信</span>
							</div>
							<div class="appConfigAlarmStrategy-stragedy-obj"  data-role="sendObj">
								<i class="fa fa-wechat"></i>
								<span>微信</span>
							</div>
						</div>
					</div>
					<!-- <div class="appConfigAlarmStrategy-msg-recover">
						<div class="appConfigAlarmStrategy-stragedy-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送恢复信息</span>
						</div>
						<div class="appConfigAlarmStrategy-stragedy-ctn">
							<input id="warnRecoverMsg" data-role="isSendRecMsg" name="state" type="checkbox">
						</div>
					</div> -->
					<div class="appConfigAlarmStrategy-msg-userRoleList">
						<div class="appConfigAlarmStrategy-msg-userList" id="appConfigAlarmStrategyObjEmailUser" data-role="warnAccount">选择邮件发送用户</div>
						<div class="appConfigAlarmStrategy-msg-userList" id="appConfigAlarmStrategyObjMsgUser" data-role="warnAccount">选择短信发送用户</div>
					</div>
				</div>
			</div>
		</div>
		<div class="appConfigAlarmStrategy-msgConfig">
			<div class="appConfigAlarmStrategy-warn-tit">标签过滤</div>
			<div class="appConfigAlarmStrategy-msgConfig-ctn" style="height: auto; padding-bottom: 20px;">
				标签列: <input id="tagkvs" type="text" style="width: calc(100% - 70px); margin-left: 20px; margin-bottom: 0;" placeholder="例如: {mounted: {nin:[“/proc”,“/mnt”,“/mnt/cdrom”,“/aha”]}}"/>
			</div>
		</div>
		<div class="appConfigAlarmStrategy-msgConfig">
			<div class="appConfigAlarmStrategy-warn-tit">信息配置</div>
			<div class="appConfigAlarmStrategy-msgConfig-ctn">
				<div class="appConfigAlarmStrategy-warn-ctn-msg">
					<div class="appConfigAlarmStrategy-msgConfig-items">
						<div class="appConfigAlarmStrategy-msgConfig-items-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">报警信息</span>
						</div>
						<div class="appConfigAlarmStrategy-msgConfig-items-ctn">
							<textarea rows="" cols=""  class="appConfigAlarmStrategy-msgConfig-textarea" id="appConfigAlarmStrategyWarnMsg"></textarea>
						</div>
					</div>
					<div class="appConfigAlarmStrategy-msgConfig-items">
						<div class="appConfigAlarmStrategy-msgConfig-items-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-req hide">*</span>
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">恢复信息</span>
						</div>
						<div class="appConfigAlarmStrategy-msgConfig-items-ctn">
							<textarea rows="" cols=""  class="appConfigAlarmStrategy-msgConfig-textarea" id="appConfigAlarmStrategyRecMsg"></textarea>
						</div>
					</div>
					<div class="appConfigAlarmStrategy-msgConfig-items">
					<div class="appConfigAlarmStrategy-msgConfig-items-tit">
							<span class="appConfigAlarmStrategy-base-ctn-items-tit">故障处理建议</span>
						</div>
						<div class="appConfigAlarmStrategy-msgConfig-items-ctn">
							<textarea rows="" cols=""  class="appConfigAlarmStrategy-msgConfig-textarea" id="appConfigAlarmStrategyAdvice"></textarea>
						</div>
					</div>
				</div>
				<div class="appConfigAlarmStrategy-warn-ctn-var">
					<div class="appConfigAlarmStrategy-warn-ctn-var-tit">公共变量</div>
					<div class="appConfigAlarmStrategy-common-var"></div>
					<div class="appConfigAlarmStrategy-warn-ctn-var-tit">替换变量</div>
					<div class="appConfigAlarmStrategy-warn-ctn-var-ctn"></div>
				</div>
			</div>
		</div>
		<div class="appConfigAlarmStrategy-submit">
			<div id="appConfigAlarmStrategyConfirm">确定</div>
			<div id="appConfigAlarmStrategyCanc">取消</div>
		</div>
	</div>
</div>
<!-- 策略配置弹窗 End -->

<!-- 角色用户列表弹出 Start -->
	<div id="appConfigAlarmStrategyUserRoleListTemp" class="modal fade hide appConfigAlarmStrategy-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" style="overflow:auto">
		<div class="modal-header">
			<button class="close" type="button" data-dismiss="modal">×</button>
			<h3></h3>
		</div>
		<div class="modal-body" style="max-height: 550px;">
			<section class="panel">
				<ul id="userTabs" class="nav nav-tabs nav-public">
					<li class="active">
				        <a href="#tab1" data-toggle="tab">分组列表</a>
				    </li>
					<li>
				        <a href="#tab2" data-toggle="tab">用户列表</a>
				    </li>
				</ul>
				<div class="tab-content" style="height: 509px;">
					<div class="tab-pane active" id="tab1">
						<table id="groupRole" class="display dataTable table" style="width:100%;">
				            <thead>
					            <tr>
					                <th>分组名</th>
					                <th>分组ID</th>
					            </tr>
				            </thead>
				            <tbody></tbody>
				        </table>
				        <div style="margin-top:20px"></div>
				    	<table id="appConfigAlarmStrategyRoleTb" class="display dataTable table" style="width:100%; table-layout: fixed">
				            <thead>
					            <tr>
					                <th width="8%"><input id="appConfigAlarmStrategyRoleSelAllBtn" type="checkbox"/></th>
					                <th width="18%">用户ID</th>
					                <th width="18%">用户名</th>
					                <th width="28%">用户拥有的角色</th>
					                <th width="28%">所属组</th>
					            </tr>
				            </thead>
				            <tbody></tbody>
				        </table>
				    </div>
					<div class="tab-pane" id="tab2">
						<table id="appConfigAlarmStrategyUserTb" class="display dataTable table" style="width:100%;table-layout: fixed;">
				            <thead>
					            <tr>
					                <th width="8%"><input id="appConfigAlarmStrategyUserSelAllBtn" type="checkbox"/></th>
					                <th width="18%">用户ID</th>
					                <th width="18%">用户名</th>
					                <th width="28%">用户拥有的角色</th>
					                <th width="28%">所属组</th>
					            </tr>
				            </thead>
				            <tbody></tbody>
				        </table>
				    </div>
				</div>
			 </section>
		</div>
		<div class="modal-footer">
			<button type="button" data-dismiss="modal" class="cancelBtn" id="appConfigAlarmStrategyUserCanc">取消</button>
			<button id="appConfigAlarmStrategyUserConfirm" class="confirmBtn" type="button">保存</button>
		</div>
	</div>
<!-- 角色用户列表弹出 End -->
