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

/* .appConfigAlarmStrategy-base-left {
	margin-right: 20px;
} */

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
    color: #666;
	margin-bottom: 10px;
}

.appConfigAlarmStrategy-base-ctn-items-left {
    float: left;
    margin-right: 10px;
    width: 95px;
    text-align: right;
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

/* .appConfigAlarmStrategy-msgConfig-ctn>div {
	overflow: auto;
} */

span.appConfigAlarmStrategy-base-ctn-items-tit {
    color: #666;
}
.appConfigAlarmStrategy-expression-tit {
    width: 95px;
    text-align: right;
    height: 30px;
    line-height: 30px;
    float: left;
    color: #666;
}
.appConfigAlarmStrategy-expression-radio {
    width: 320px;
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
    width: 95px;
    height: 30px;
    float: left;
    text-align: right;
    line-height: 30px;
    margin: 0 10px 0 0;
}
.appConfigAlarmStrategy-freq-ctn {
    float: left;
	width: calc(100% - 110px);
}
.appConfigAlarmStrategy-freq-count-ctn {
    float: left;
	width: calc(100% - 110px);
}
.appConfigAlarmStrategy-stragedy-obj {
    position: relative;
    width: 90px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #b3b3b3;
    border-radius: 2px;
    margin-bottom: 12px;
    text-align: center;
    cursor: pointer;
    transition: all linear .2s;
}
.appConfigAlarmStrategy-stragedy-obj:nth-child(2):hover {
    color: #5b62f9;
    border-color: #5b62f9;
}
.appConfigAlarmStrategy-stragedy-obj .disabled {
    cursor: not-allowed;
    border-color: #dadee2;
    background: #f3f3f3;
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
}
.appConfigAlarmStrategy-freq>div{
	width: 300px;
	margin-right: 10px;
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
    height: 200px;
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
	overflow: auto;
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
	top: -90px;
    left: 200px;
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

/* 
201907改版 */
.kpi-selector,
.expression-wrap,
.kpi-selector>div,
.expression-wrap>div {
	display: flex;
	align-items: center;
}
.kpi-selector-item,
.expression-item {
    width: 300px;
	margin-right: 10px;
}
.kpi-selector-item>span,
.expression-item>span {
    min-width: 95px;
    text-align: right;
    margin-right: 10px;
}
.kpi-selector-item input,
.kpi-selector-item select,
.expression-item input,
.expression-item select {
    margin: 0;
    width: calc(100% - 110px);
    height: 30px;
}
.kpi-selector-item .tinyselect,
.expression-item .tinyselect {
    min-width: auto;
    width: calc(100% - 110px)!important;
}
.appConfigAlarmStrategy-freq-ctn select,
.appConfigAlarmStrategy-freq-count-ctn input {
	width: 100%;
	height: 30px;
	margin: 0;
}
.appConfigAlarmStrategy-upgrade-radio>span {
    margin: 0 10px 0 0px;
}
.appConfigAlarmStrategy-upgrade-radio>span>input {
	vertical-align: -2px;
    margin: 4px 5px 0 0;
}
.appConfigAlarmStrategy-upgrade-radio>input {
	width: 100%;
	height: 30px;
	margin: 0;
}
.config-item {
	display: flex;
    flex-direction: column;
}
.config-item>div {
	margin-bottom: 10px;
}
.config-item>div:last-child {
	margin-bottom: 0;
}
.message-send-wrap>div {
    display: flex;
    flex-wrap: wrap;
}
.message-send-wrap .selected-user-list {
    display: flex;
    flex-wrap: wrap;
    margin-left: 10px;
}
.message-send-wrap .selected-user-list>span {
	position: relative;
    height: 32px;
    min-width: 50px;
    background: #f1f2f3;
    border: solid 1px #e1e2e2;
    box-sizing: border-box;
    text-align: center;
    line-height: 32px;
    margin: 0 4px 4px 0;	
}
.message-send-wrap .selected-user-list>span:hover>i {
	display: inline-block;
}
.message-send-wrap .selected-user-list>span>i {
	display: none;
	margin-left: 4px;
    font-size: 12px;
    color: #797a7b;
    vertical-align: 1px;
    line-height: 28px;
	cursor: pointer;
}
.message-send-wrap .disabled {
	opacity: .6;
	cursor: not-allowed;
}
.excute-wrap .control-group {
	display: flex;
	align-items: center;
	width: 300px;
}
.excute-wrap .controls {
	width: calc(100% - 110px);
}
.excute-wrap label {
    width: 95px;
    text-align: right;
    margin-right: 10px;	
}
.excute-wrap input[type="text"],
.excute-wrap select {
    width: 100%;
    height: 30px;
    margin: 0;
}
.excute-wrap textarea {
	width: 810px;
	min-height: 100px;
}
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
			<div class="appConfigAlarmStrategy-base-right hide">
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
		<div class="appConfigAlarmStrategy-notice appConfigAlarmStrategy-item">
			<div class="appConfigAlarmStrategy-notice-tit">通知配置<div class="appConfigAlarmStrategy-tit-copyBtn hide" id="appConfigAlarmStrategyNoticeCopyBtn" data-role="configCopyBtn">复制预警配置信息</div></div>
			<div class="appConfigAlarmStrategy-notice-ctn">
				<!-- <div class="appConfigAlarmStrategy-expression">
					<div class="appConfigAlarmStrategy-expression-tit">表达式类型</div>
					<div class="appConfigAlarmStrategy-expression-radio">
						<input type="radio" name="noticeExpress" data-role="expression" checked="checked">条件表达式
						<input type="radio" name="noticeExpress" data-role="expression" disabled="disabled">动态报警
					</div>
				</div> -->
				<div class="config-item">
					<div class="appConfigAlarmStrategy-expression">
						<div class="appConfigAlarmStrategy-expression-tit">指标来源</div>
						<div class="appConfigAlarmStrategy-expression-radio" data-role="item_source">
							<input type="radio" name="noticeExpress1" data-role="kpiSource" checked="checked" data-id="1">业务预警
							<input type="radio" name="noticeExpress1" data-role="kpiSource" data-id="2">关键字预警
							<input type="radio" name="noticeExpress1" data-role="kpiSource" data-id="3">自监控预警
						</div>
					</div>
					<div class="kpi-selector-wrap">
						<div class="kpi-selector kpi-selector-log">
							<div class="kpi-selector-item">
								<span>应用系统</span>
								<select data-role="app_log"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>统计维度</span>
								<select data-role="busi_field"><option value="1">交易码</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>指标列表</span>
								<select data-role="busi_item">
									<option value="avgtime" data-id="2756">平均耗时</option>
									<option value="success_rate" data-id="2757">成功率</option>
									<option value="fail_rate" data-id="2758">失败率</option>
									<option value="num" data-id="2759">交易量</option>
									<option value="success_num" data-id="2760">成功交易量</option>
									<option value="fail" data-id="2761">失败交易量</option>
									<option value="trans_code" data-id="2762">trans_code</option>
								</select>
							</div>
						</div>
						<div class="kpi-selector kpi-selector-source hide">
							<div class="kpi-selector-item">
								<span>应用系统</span>
								<select data-role="app_source"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>数据源</span>
								<select data-role="source_select"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>字段</span>
								<select name="" id="" data-role="field"></select>
							</div>
						</div>
						<div class="kpi-selector kpi-selector-self hide">
							<div class="kpi-selector-item">
								<span>监控指标</span>
								<select data-role="monitorKpi"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>指标列表</span>
								<select data-role="kpiSub"><option>--请选择--</option></select>
							</div>
						</div>
					</div>
					
					<div class="expression-wrap">
						<div class="expression-item">
							<span>条件表达式</span>
							<select data-role="condition"><option>--请选择--</option></select>
						</div>
						<div class="expression-item">
							<span>条件阀值</span>
							<input type="text" data-role="threshold" placeholder="请输入阀值">
							<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
						</div>
						<div class="expression-item">
							<span>自动恢复表达式</span>
							<select data-role="rmeid"><option>--请选择--</option></select>
						</div>
						<div class="expression-item">
							<span>恢复阀值</span>
							<input type="text" data-role="recoverValue" placeholder="请输入阀值">
							<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
						</div>
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
					<div class="appConfigAlarmStrategy-base-ctn-items-right" style="float: left;">
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level1" data-role="alertLevel" checked>1级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level1" data-role="alertLevel">2级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level1" data-role="alertLevel">3级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level1" data-role="alertLevel">4级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level1" data-role="alertLevel">5级
					</div>
					<div class="upgrade-wrap" style="display: flex;">
						<div class="upgrade-item" style="display: flex;align-items: center;">
							<div class="appConfigAlarmStrategy-upgrade-tit" style="width: 95px;text-align: right;">升级策略</div>
							<div class="appConfigAlarmStrategy-upgrade-radio" style="display: flex;margin-left: 10px;">
								<span><input type="radio" name="upgrade" data-role="upgrade" checked="checked" data-id="0">不升级</span>	
								<span><input type="radio" name="upgrade" data-role="upgrade" data-id="1">按发生次数升级</span>
								<span><input type="radio" name="upgrade" data-role="upgrade" data-id="2">按持续时间升级</span>
							</div>
						</div>
						<div class="upgrade-kpi hide" style="display: flex;align-items: center;width: 300px;">
							<div class="appConfigAlarmStrategy-upgrade-tit upgrade-kpi-label" style="width: 95px;text-align: right;">发生次数</div>
							<div class="appConfigAlarmStrategy-upgrade-radio" style="display: flex;margin-left: 10px;width: calc(100% - 110px);">
								<input type="text" data-role="upgrade_range">
							</div>
						</div>
					</div>
				</div>
				
				<div class="excute-wrap">
					<div class="control-group" style="width: auto;align-items: flex-start;">
						<label for="searchName" class="control-label required">搜索条件</label>
						<div class="controls">
							<textarea  name="search" id="sql_search" disabled></textarea>
						</div>
					</div>
					<div class="control-group col-3">
						<label for="input1" class="control-label">预警类型</label>
						<div class="controls">
							<select name="planType" id="planType">
								<option value="1">计划</option>
								<option value="2">实时</option>
							</select>
						</div>
					</div>
					<div id="planCondition" style="display: flex;">
							<div class="control-group col-3">
								<label for="input1" class="control-label">计划类型</label>
								<div class="controls">
									<select name="scheduleType" id="scheduleType">
										<option value="1">每小时</option>
										<option value="2">每天</option>
										<option value="3">每周</option>
										<option value="4">每月</option>
									</select>
								</div>
							</div>
							<div style="display: flex;">
								<div id="minute" class="control-group col-3">
									<label for="input1" class="control-label">选择分钟</label>
									<div class="controls">
										<select data-type="interval">
											<option value="00">00</option>
											<option value="05">05</option>
											<option value="10">10</option>
											<option value="15">15</option>
											<option value="20">20</option>
											<option value="25">25</option>
											<option value="30">30</option>
											<option value="35">35</option>
											<option value="40">40</option>
											<option value="45">45</option>
											<option value="50">50</option>
											<option value="55">55</option>
											<option value="60">60</option>
										</select>
									</div>
								</div>
								<div id="day" class="control-group col-3 unShow hide">
									<label for="input1" class="control-label">选择星期</label>
									<div class="controls">
										<select data-type="interval">
											<option value="02">一</option>
											<option value="03">二</option>
											<option value="04">三</option>
											<option value="05">四</option>
											<option value="06">五</option>
											<option value="07">六</option>
											<option value="01">七</option>
										</select>
									</div>
								</div>
								<div id="date" class="control-group col-3 unShow hide">
									<label for="input1" class="control-label">选择天</label>
									<div class="controls">
										<select data-type="interval">
											<option value="01">1</option>
											<option value="02">2</option>
											<option value="03">3</option>
											<option value="04">4</option>
											<option value="05">5</option>
											<option value="06">6</option>
											<option value="07">7</option>
											<option value="08">8</option>
											<option value="09">9</option>
											<option value="10">10</option>
											<option value="11">11</option>
											<option value="12">12</option>
											<option value="13">13</option>
											<option value="14">14</option>
											<option value="15">15</option>
											<option value="16">16</option>
											<option value="17">17</option>
											<option value="18">18</option>
											<option value="19">19</option>
											<option value="20">20</option>
											<option value="21">21</option>
											<option value="22">22</option>
											<option value="23">23</option>
											<option value="24">24</option>
											<option value="25">25</option>
											<option value="26">26</option>
											<option value="27">27</option>
											<option value="28">28</option>
											<option value="29">29</option>
											<option value="30">30</option>
										</select>
									</div>
								</div>
								<div id="time" class="control-group col-3 unShow hide">
									<label for="input1" class="control-label">选择时间</label>
									<div class="controls">
										<select data-type="interval">
											<option value="01">00:00</option>
											<option value="02">01:00</option>
											<option value="03">02:00</option>
											<option value="04">03:00</option>
											<option value="05">04:00</option>
											<option value="06">05:00</option>
											<option value="07">06:00</option>
											<option value="08">07:00</option>
											<option value="09">08:00</option>
											<option value="10">09:00</option>
											<option value="11">10:00</option>
											<option value="12">11:00</option>
											<option value="13">12:00</option>
											<option value="14">13:00</option>
											<option value="15">14:00</option>
											<option value="16">15:00</option>
											<option value="17">16:00</option>
											<option value="18">17:00</option>
											<option value="19">18:00</option>
											<option value="20">19:00</option>
											<option value="21">20:00</option>
											<option value="22">21:00</option>
											<option value="23">22:00</option>
											<option value="24">23:00</option>
										</select>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>
		<div class="appConfigAlarmStrategy-eaWarn appConfigAlarmStrategy-item">
			<div class="appConfigAlarmStrategy-eaWarn-tit">预警配置<div class="appConfigAlarmStrategy-tit-copyBtn hide" id="appConfigAlarmStrategyEaWarnCopyBtn" data-role="configCopyBtn">复制告警配置信息</div></div>
			<div class="appConfigAlarmStrategy-eaWarn-ctn">
				<!-- <div class="appConfigAlarmStrategy-expression">
					<div class="appConfigAlarmStrategy-expression-tit">表达式类型</div>
					<div class="appConfigAlarmStrategy-expression-radio">
						<input type="radio" name="noticeExpress" data-role="expression" checked="checked">条件表达式
						<input type="radio" name="noticeExpress" data-role="expression" disabled="disabled">动态报警
					</div>
				</div> -->
				<div class="config-item">
					<div class="appConfigAlarmStrategy-expression">
						<div class="appConfigAlarmStrategy-expression-tit">指标来源</div>
						<div class="appConfigAlarmStrategy-expression-radio" data-role="item_source">
							<input type="radio" name="noticeExpress2" data-role="kpiSource" checked="checked" data-id="1">业务预警
							<input type="radio" name="noticeExpress2" data-role="kpiSource" data-id="2">关键字预警
							<input type="radio" name="noticeExpress2" data-role="kpiSource" data-id="3">自监控预警
						</div>
					</div>
					<div class="kpi-selector-wrap">
						<div class="kpi-selector kpi-selector-log">
							<div class="kpi-selector-item">
								<span>应用系统</span>
								<select data-role="app_log"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>统计维度</span>
								<select data-role="busi_field"><option value="1">交易码</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>指标列表</span>
								<select data-role="busi_item">
									<option value="avgtime">平均耗时</option>
									<option value="success_rate">成功率</option>
									<option value="fail_rate">失败率</option>
									<option value="num">交易量</option>
									<option value="success_num">成功交易量</option>
									<option value="fail">失败交易量</option>
								</select>
							</div>
						</div>
						<div class="kpi-selector kpi-selector-source hide">
							<div class="kpi-selector-item">
								<span>应用系统</span>
								<select data-role="app_source"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>数据源</span>
								<select data-role="source_select"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>字段</span>
								<select name="" id="" data-role="field"></select>
							</div>
						</div>
						<div class="kpi-selector kpi-selector-self hide">
							<div class="kpi-selector-item">
								<span>监控指标</span>
								<select data-role="monitorKpi"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>指标列表</span>
								<select data-role="kpiSub"><option>--请选择--</option></select>
							</div>
						</div>
					</div>
					
					<div class="expression-wrap">
						<div class="expression-item">
							<span>条件表达式</span>
							<select data-role="condition"><option>--请选择--</option></select>
						</div>
						<div class="expression-item">
							<span>条件阀值</span>
							<input type="text" data-role="threshold" placeholder="请输入阀值">
							<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
						</div>
						<div class="expression-item">
							<span>自动恢复表达式</span>
							<select data-role="rmeid"><option>--请选择--</option></select>
						</div>
						<div class="expression-item">
							<span>恢复阀值</span>
							<input type="text" data-role="recoverValue" placeholder="请输入阀值">
							<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
						</div>
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
					<div class="appConfigAlarmStrategy-base-ctn-items-right" style="float: left;">
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level2" data-role="alertLevel" checked>1级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level2" data-role="alertLevel">2级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level2" data-role="alertLevel">3级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level2" data-role="alertLevel">4级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level2" data-role="alertLevel">5级
					</div>
					<div class="upgrade-wrap" style="display: flex;">
						<div class="upgrade-item" style="display: flex;align-items: center;">
							<div class="appConfigAlarmStrategy-upgrade-tit" style="width: 95px;text-align: right;">升级策略</div>
							<div class="appConfigAlarmStrategy-upgrade-radio" style="display: flex;margin-left: 10px;">
								<span><input type="radio" name="upgrade" data-role="upgrade" checked="checked" data-id="0">不升级</span>	
								<span><input type="radio" name="upgrade" data-role="upgrade" data-id="1">按发生次数升级</span>
								<span><input type="radio" name="upgrade" data-role="upgrade" data-id="2">按持续时间升级</span>
							</div>
						</div>
						<div class="upgrade-kpi hide" style="display: flex;align-items: center;width: 300px;">
							<div class="appConfigAlarmStrategy-upgrade-tit upgrade-kpi-label" style="width: 95px;text-align: right;">发生次数</div>
							<div class="appConfigAlarmStrategy-upgrade-radio" style="display: flex;margin-left: 10px;width: calc(100% - 110px);">
								<input type="text" data-role="upgrade_range">
							</div>
						</div>
					</div>
				</div>
				
				<div class="excute-wrap">
					<div class="control-group" style="width: auto;align-items: flex-start;">
						<label for="searchName" class="control-label required">搜索条件</label>
						<div class="controls">
							<textarea  name="search" id="sql_search" disabled></textarea>
						</div>
					</div>
					<div class="control-group col-3">
						<label for="input1" class="control-label">预警类型</label>
						<div class="controls">
							<select name="planType" id="planType">
								<option value="1">计划</option>
								<option value="2">实时</option>
							</select>
						</div>
					</div>
					<div id="planCondition" style="display: flex;">
							<div class="control-group col-3">
								<label for="input1" class="control-label">计划类型</label>
								<div class="controls">
									<select name="scheduleType" id="scheduleType">
										<option value="1">每小时</option>
										<option value="2">每天</option>
										<option value="3">每周</option>
										<option value="4">每月</option>
									</select>
								</div>
							</div>
							<div style="display: flex;">
								<div id="minute" class="control-group col-3">
									<label for="input1" class="control-label">选择分钟</label>
									<div class="controls">
										<select data-type="interval">
											<option value="00">00</option>
											<option value="05">05</option>
											<option value="10">10</option>
											<option value="15">15</option>
											<option value="20">20</option>
											<option value="25">25</option>
											<option value="30">30</option>
											<option value="35">35</option>
											<option value="40">40</option>
											<option value="45">45</option>
											<option value="50">50</option>
											<option value="55">55</option>
											<option value="60">60</option>
										</select>
									</div>
								</div>
								<div id="day" class="control-group col-3 unShow hide">
									<label for="input1" class="control-label">选择星期</label>
									<div class="controls">
										<select data-type="interval">
											<option value="02">一</option>
											<option value="03">二</option>
											<option value="04">三</option>
											<option value="05">四</option>
											<option value="06">五</option>
											<option value="07">六</option>
											<option value="01">七</option>
										</select>
									</div>
								</div>
								<div id="date" class="control-group col-3 unShow hide">
									<label for="input1" class="control-label">选择天</label>
									<div class="controls">
										<select data-type="interval">
											<option value="01">1</option>
											<option value="02">2</option>
											<option value="03">3</option>
											<option value="04">4</option>
											<option value="05">5</option>
											<option value="06">6</option>
											<option value="07">7</option>
											<option value="08">8</option>
											<option value="09">9</option>
											<option value="10">10</option>
											<option value="11">11</option>
											<option value="12">12</option>
											<option value="13">13</option>
											<option value="14">14</option>
											<option value="15">15</option>
											<option value="16">16</option>
											<option value="17">17</option>
											<option value="18">18</option>
											<option value="19">19</option>
											<option value="20">20</option>
											<option value="21">21</option>
											<option value="22">22</option>
											<option value="23">23</option>
											<option value="24">24</option>
											<option value="25">25</option>
											<option value="26">26</option>
											<option value="27">27</option>
											<option value="28">28</option>
											<option value="29">29</option>
											<option value="30">30</option>
										</select>
									</div>
								</div>
								<div id="time" class="control-group col-3 unShow hide">
									<label for="input1" class="control-label">选择时间</label>
									<div class="controls">
										<select data-type="interval">
											<option value="01">00:00</option>
											<option value="02">01:00</option>
											<option value="03">02:00</option>
											<option value="04">03:00</option>
											<option value="05">04:00</option>
											<option value="06">05:00</option>
											<option value="07">06:00</option>
											<option value="08">07:00</option>
											<option value="09">08:00</option>
											<option value="10">09:00</option>
											<option value="11">10:00</option>
											<option value="12">11:00</option>
											<option value="13">12:00</option>
											<option value="14">13:00</option>
											<option value="15">14:00</option>
											<option value="16">15:00</option>
											<option value="17">16:00</option>
											<option value="18">17:00</option>
											<option value="19">18:00</option>
											<option value="20">19:00</option>
											<option value="21">20:00</option>
											<option value="22">21:00</option>
											<option value="23">22:00</option>
											<option value="24">23:00</option>
										</select>
									</div>
								</div>
							</div>
						</div>
				</div>
			</div>
		</div>
		<div class="appConfigAlarmStrategy-warn appConfigAlarmStrategy-item">
			<div class="appConfigAlarmStrategy-warn-tit">告警配置<div class="appConfigAlarmStrategy-tit-copyBtn hide" id="appConfigAlarmStrategyWarnCopyBtn" data-role="configCopyBtn">复制预警配置信息</div></div>
			<div class="appConfigAlarmStrategy-warn-ctn">
				<!-- <div class="appConfigAlarmStrategy-expression">
					<div class="appConfigAlarmStrategy-expression-tit">表达式类型</div>
					<div class="appConfigAlarmStrategy-expression-radio">
						<input type="radio" name="noticeExpress" data-role="expression" checked="checked">条件表达式
						<input type="radio" name="noticeExpress" data-role="expression" disabled="disabled">动态报警
					</div>
				</div> -->
				<div class="config-item">
					<div class="appConfigAlarmStrategy-expression">
						<div class="appConfigAlarmStrategy-expression-tit">指标来源</div>
						<div class="appConfigAlarmStrategy-expression-radio" data-role="item_source">
							<input type="radio" name="noticeExpress3" data-role="kpiSource" checked="checked" data-id="1">业务预警
							<input type="radio" name="noticeExpress3" data-role="kpiSource" data-id="2">关键字预警
							<input type="radio" name="noticeExpress3" data-role="kpiSource" data-id="3">自监控预警
						</div>
					</div>
					<div class="kpi-selector-wrap">
						<div class="kpi-selector kpi-selector-log">
							<div class="kpi-selector-item">
								<span>应用系统</span>
								<select data-role="app_log"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>统计维度</span>
								<select data-role="busi_field"><option value="1">交易码</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>指标列表</span>
								<select data-role="busi_item">
									<option value="avgtime">平均耗时</option>
									<option value="success_rate">成功率</option>
									<option value="fail_rate">失败率</option>
									<option value="num">交易量</option>
									<option value="success_num">成功交易量</option>
									<option value="fail">失败交易量</option>
								</select>
							</div>
						</div>
						<div class="kpi-selector kpi-selector-source hide">
							<div class="kpi-selector-item">
								<span>应用系统</span>
								<select data-role="app_source"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>数据源</span>
								<select data-role="source_select"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>字段</span>
								<select name="" id="" data-role="field"></select>
							</div>
						</div>
						<div class="kpi-selector kpi-selector-self hide">
							<div class="kpi-selector-item">
								<span>监控指标</span>
								<select data-role="monitorKpi"><option>--请选择--</option></select>
							</div>
							<div class="kpi-selector-item">
								<span>指标列表</span>
								<select data-role="kpiSub"><option>--请选择--</option></select>
							</div>
						</div>
					</div>
					
					<div class="expression-wrap">
						<div class="expression-item">
							<span>条件表达式</span>
							<select data-role="condition"><option>--请选择--</option></select>
						</div>
						<div class="expression-item">
							<span>条件阀值</span>
							<input type="text" data-role="threshold" placeholder="请输入阀值">
							<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
						</div>
						<div class="expression-item">
							<span>自动恢复表达式</span>
							<select data-role="rmeid"><option>--请选择--</option></select>
						</div>
						<div class="expression-item">
							<span>恢复阀值</span>
							<input type="text" data-role="recoverValue" placeholder="请输入阀值">
							<span class="help-inline error" style="display: none;position: absolute;left: 30px;top: 38px;">阈值格式错误，请重新输入！</span>
						</div>
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
					<div class="appConfigAlarmStrategy-base-ctn-items-right" style="float: left;">
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level3" data-role="alertLevel" checked>1级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level3" data-role="alertLevel">2级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level3" data-role="alertLevel">3级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level3" data-role="alertLevel">4级
						<input class="appConfigAlarmStrategy-base-ctn-items-checkbox" type="radio" name="level3" data-role="alertLevel">5级
					</div>
					<div class="upgrade-wrap" style="display: flex;">
						<div class="upgrade-item" style="display: flex;align-items: center;">
							<div class="appConfigAlarmStrategy-upgrade-tit" style="width: 95px;text-align: right;">升级策略</div>
							<div class="appConfigAlarmStrategy-upgrade-radio" style="display: flex;margin-left: 10px;">
								<span><input type="radio" name="upgrade" data-role="upgrade" checked="checked" data-id="0">不升级</span>	
								<span><input type="radio" name="upgrade" data-role="upgrade" data-id="1">按发生次数升级</span>
								<span><input type="radio" name="upgrade" data-role="upgrade" data-id="2">按持续时间升级</span>
							</div>
						</div>
						<div class="upgrade-kpi hide" style="display: flex;align-items: center;width: 300px;">
							<div class="appConfigAlarmStrategy-upgrade-tit upgrade-kpi-label" style="width: 95px;text-align: right;">发生次数</div>
							<div class="appConfigAlarmStrategy-upgrade-radio" style="display: flex;margin-left: 10px;width: calc(100% - 110px);">
								<input type="text" data-role="upgrade_range">
							</div>
						</div>
					</div>
				</div>
				
				<div class="excute-wrap">
					<div class="control-group" style="width: auto;align-items: flex-start;">
						<label for="searchName" class="control-label required">搜索条件</label>
						<div class="controls">
							<textarea  name="search" id="sql_search" disabled></textarea>
						</div>
					</div>
					<div class="control-group col-3">
						<label for="input1" class="control-label">预警类型</label>
						<div class="controls">
							<select name="planType" id="planType">
								<option value="1">计划</option>
								<option value="2">实时</option>
							</select>
						</div>
					</div>
					<div id="planCondition" style="display: flex;">
							<div class="control-group col-3">
								<label for="input1" class="control-label">计划类型</label>
								<div class="controls">
									<select name="scheduleType" id="scheduleType">
										<option value="1">每小时</option>
										<option value="2">每天</option>
										<option value="3">每周</option>
										<option value="4">每月</option>
									</select>
								</div>
							</div>
							<div style="display: flex;">
								<div id="minute" class="control-group col-3">
									<label for="input1" class="control-label">选择分钟</label>
									<div class="controls">
										<select data-type="interval">
											<option value="00">00</option>
											<option value="05">05</option>
											<option value="10">10</option>
											<option value="15">15</option>
											<option value="20">20</option>
											<option value="25">25</option>
											<option value="30">30</option>
											<option value="35">35</option>
											<option value="40">40</option>
											<option value="45">45</option>
											<option value="50">50</option>
											<option value="55">55</option>
											<option value="60">60</option>
										</select>
									</div>
								</div>
								<div id="day" class="control-group col-3 unShow hide">
									<label for="input1" class="control-label">选择星期</label>
									<div class="controls">
										<select data-type="interval">
											<option value="02">一</option>
											<option value="03">二</option>
											<option value="04">三</option>
											<option value="05">四</option>
											<option value="06">五</option>
											<option value="07">六</option>
											<option value="01">七</option>
										</select>
									</div>
								</div>
								<div id="date" class="control-group col-3 unShow hide">
									<label for="input1" class="control-label">选择天</label>
									<div class="controls">
										<select data-type="interval">
											<option value="01">1</option>
											<option value="02">2</option>
											<option value="03">3</option>
											<option value="04">4</option>
											<option value="05">5</option>
											<option value="06">6</option>
											<option value="07">7</option>
											<option value="08">8</option>
											<option value="09">9</option>
											<option value="10">10</option>
											<option value="11">11</option>
											<option value="12">12</option>
											<option value="13">13</option>
											<option value="14">14</option>
											<option value="15">15</option>
											<option value="16">16</option>
											<option value="17">17</option>
											<option value="18">18</option>
											<option value="19">19</option>
											<option value="20">20</option>
											<option value="21">21</option>
											<option value="22">22</option>
											<option value="23">23</option>
											<option value="24">24</option>
											<option value="25">25</option>
											<option value="26">26</option>
											<option value="27">27</option>
											<option value="28">28</option>
											<option value="29">29</option>
											<option value="30">30</option>
										</select>
									</div>
								</div>
								<div id="time" class="control-group col-3 unShow hide">
									<label for="input1" class="control-label">选择时间</label>
									<div class="controls">
										<select data-type="interval">
											<option value="01">00:00</option>
											<option value="02">01:00</option>
											<option value="03">02:00</option>
											<option value="04">03:00</option>
											<option value="05">04:00</option>
											<option value="06">05:00</option>
											<option value="07">06:00</option>
											<option value="08">07:00</option>
											<option value="09">08:00</option>
											<option value="10">09:00</option>
											<option value="11">10:00</option>
											<option value="12">11:00</option>
											<option value="13">12:00</option>
											<option value="14">13:00</option>
											<option value="15">14:00</option>
											<option value="16">15:00</option>
											<option value="17">16:00</option>
											<option value="18">17:00</option>
											<option value="19">18:00</option>
											<option value="20">19:00</option>
											<option value="21">20:00</option>
											<option value="22">21:00</option>
											<option value="23">22:00</option>
											<option value="24">23:00</option>
										</select>
									</div>
								</div>
							</div>
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
		<div class="appConfigAlarmStrategy-msgConfig" id="message-wrap" style="border: none;">
			<section class="panel">
				<ul class="nav nav-tabs nav-public">
					<li class="active"><a href="#tabs1" data-toggle="tab">报警信息</a></li>
					<li><a href="#tabs2" data-toggle="tab">升级信息</a></li>
					<li><a href="#tabs3" data-toggle="tab">恢复信息</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabs1" class="tab-pane active">
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
								<div class="appConfigAlarmStrategy-msg">
										<div class="appConfigAlarmStrategy-msg-obj">
											<div class="appConfigAlarmStrategy-stragedy-tit">
												<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
												<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送对象</span>
											</div>
											<div class="appConfigAlarmStrategy-stragedy-ctn message-send-wrap" data-role="bj">
												<div>
													<div class="appConfigAlarmStrategy-stragedy-obj disabled" data-role="sendObj">
														<i class="fa fa-envelope"></i>
														<span>邮件</span>
													</div>
													<div class="selected-user-list" data-id="0"></div>
												</div>
												<div>
													<div class="appConfigAlarmStrategy-stragedy-obj" data-role="sendObj">
														<i class="fa fa-mobile" style="font-size: 24px;margin-top: 3px;margin-right: 36px;"></i>
														<span style="position: absolute;margin-left: -28px;">短信</span>
													</div>
													<div class="selected-user-list" data-id="1">
													</div>
												</div>
												<div>
													<div class="appConfigAlarmStrategy-stragedy-obj disabled" data-role="sendObj">
														<i class="fa fa-wechat"></i>
														<span>微信</span>
													</div>
													<div class="selected-user-list" data-id="2"></div>
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
							<div class="appConfigAlarmStrategy-warn-ctn-var">
								<div class="appConfigAlarmStrategy-warn-ctn-var-tit">公共变量</div>
								<div class="appConfigAlarmStrategy-common-var">
									
								</div>
								<div class="appConfigAlarmStrategy-warn-ctn-var-tit">替换变量</div>
								<div class="appConfigAlarmStrategy-warn-ctn-var-ctn">
									<div class="appConfigAlarmStrategy-common-var">
										<span class="appConfigAlarmStrategy-warn-var-item" title="统计维度">$ {统计维度}</span>
										<span class="appConfigAlarmStrategy-warn-var-item" title="指标">$ {指标}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="tabs2" class="tab-pane">
						<div class="appConfigAlarmStrategy-msgConfig-ctn">
							<div class="appConfigAlarmStrategy-warn-ctn-msg">
								<div class="appConfigAlarmStrategy-msgConfig-items">
									<div class="appConfigAlarmStrategy-msgConfig-items-tit">
										<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
										<span class="appConfigAlarmStrategy-base-ctn-items-tit">升级信息</span>
									</div>
									<div class="appConfigAlarmStrategy-msgConfig-items-ctn">
										<textarea rows="" cols=""  class="appConfigAlarmStrategy-msgConfig-textarea" id="appConfigAlarmStrategyAdvice"></textarea>
									</div>
								</div>
								<div class="appConfigAlarmStrategy-msg">
										<div class="appConfigAlarmStrategy-msg-obj">
											<div class="appConfigAlarmStrategy-stragedy-tit">
												<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
												<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送对象</span>
											</div>
											<div class="appConfigAlarmStrategy-stragedy-ctn message-send-wrap" data-role="sj">
												<div>
													<div class="appConfigAlarmStrategy-stragedy-obj disabled" data-role="sendObj">
														<i class="fa fa-envelope"></i>
														<span>邮件</span>
													</div>
													<div class="selected-user-list" data-id="0"></div>
												</div>
												<div>
													<div class="appConfigAlarmStrategy-stragedy-obj" data-role="sendObj">
														<i class="fa fa-mobile" style="font-size: 24px;margin-top: 3px;margin-right: 36px;"></i>
														<span style="position: absolute;margin-left: -28px;">短信</span>
													</div>
													<div class="selected-user-list" data-id="1">
													</div>
												</div>
												<div>
													<div class="appConfigAlarmStrategy-stragedy-obj disabled" data-role="sendObj">
														<i class="fa fa-wechat"></i>
														<span>微信</span>
													</div>
													<div class="selected-user-list" data-id="2"></div>
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
							<div class="appConfigAlarmStrategy-warn-ctn-var">
								<div class="appConfigAlarmStrategy-warn-ctn-var-tit">公共变量</div>
								<div class="appConfigAlarmStrategy-common-var"></div>
								<div class="appConfigAlarmStrategy-warn-ctn-var-tit">替换变量</div>
								<div class="appConfigAlarmStrategy-warn-ctn-var-ctn">
									<div class="appConfigAlarmStrategy-common-var">
										<span class="appConfigAlarmStrategy-warn-var-item" title="统计维度">$ {统计维度}</span>
										<span class="appConfigAlarmStrategy-warn-var-item" title="指标">$ {指标}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="tabs3" class="tab-pane">
						<div class="appConfigAlarmStrategy-msgConfig-ctn">
							<div class="appConfigAlarmStrategy-warn-ctn-msg">
								<div class="appConfigAlarmStrategy-msgConfig-items">
									<div class="appConfigAlarmStrategy-msgConfig-items-tit">
										<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
										<span class="appConfigAlarmStrategy-base-ctn-items-tit">恢复信息</span>
									</div>
									<div class="appConfigAlarmStrategy-msgConfig-items-ctn">
										<textarea rows="" cols=""  class="appConfigAlarmStrategy-msgConfig-textarea" id="appConfigAlarmStrategyRecMsg"></textarea>
									</div>
								</div>
								<div class="appConfigAlarmStrategy-msg">
										<div class="appConfigAlarmStrategy-msg-obj">
											<div class="appConfigAlarmStrategy-stragedy-tit">
												<span class="appConfigAlarmStrategy-base-ctn-items-req">*</span>
												<span class="appConfigAlarmStrategy-base-ctn-items-tit">发送对象</span>
											</div>
											<div class="appConfigAlarmStrategy-stragedy-ctn message-send-wrap" data-role="hf">
												<div>
													<div class="appConfigAlarmStrategy-stragedy-obj disabled" data-role="sendObj">
														<i class="fa fa-envelope"></i>
														<span>邮件</span>
													</div>
													<div class="selected-user-list" data-id="0"></div>
												</div>
												<div>
													<div class="appConfigAlarmStrategy-stragedy-obj" data-role="sendObj">
														<i class="fa fa-mobile" style="font-size: 24px;margin-top: 3px;margin-right: 36px;"></i>
														<span style="position: absolute;margin-left: -28px;">短信</span>
													</div>
													<div class="selected-user-list" data-id="1">
													</div>
												</div>
												<div>
													<div class="appConfigAlarmStrategy-stragedy-obj disabled" data-role="sendObj">
														<i class="fa fa-wechat"></i>
														<span>微信</span>
													</div>
													<div class="selected-user-list" data-id="2"></div>
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
							<div class="appConfigAlarmStrategy-warn-ctn-var">
								<div class="appConfigAlarmStrategy-warn-ctn-var-tit">公共变量</div>
								<div class="appConfigAlarmStrategy-common-var"></div>
								<div class="appConfigAlarmStrategy-warn-ctn-var-tit">替换变量</div>
								<div class="appConfigAlarmStrategy-warn-ctn-var-ctn">
									<div class="appConfigAlarmStrategy-common-var">
										<span class="appConfigAlarmStrategy-warn-var-item" title="统计维度">$ {统计维度}</span>
										<span class="appConfigAlarmStrategy-warn-var-item" title="指标">$ {指标}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				</section>	
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
