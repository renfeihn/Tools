<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
section.monitorManage-noMargin {
	background: #FFF;
	border: 1px solid #ebebed;
	border-radius: 4px;
    margin: 0px -20px 0 0 !important;
    margin: -20px -20px 0; 
    position: relative;
}

section.monitorManage-noMargin:after {
	content: '';
	display: block;
	clear: both;
}

/* section#monitorManageSection {
	width: 1556px;
}
 */
section.monitorManage-noMargin>p.title {
	background: #fafafc;
	border-bottom: 1px solid #ebebed;
	height: 39px;
	line-height: 40px;
	font-size: 14px;
	padding: 0 20px;
	margin: 0;
}

section.monitorManage-noMargin>div.content {
	padding: 20px;
}

section.monitorManage-noMargin>div.content section.panel {
	margin-bottom: 0;
	border: 1px solid #e5e5e5;
}

section.monitorManage-noMargin .KPICollect-merUl {
	border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
}

section.monitorManage-noMargin input.search {
    padding: 0 4px;
    top: 6px;
    right: 10px;
    border-color: #e5e5e5;
    height: 20px;
}

.monitorManage-noMargin .nav.nav-tabs.nav-public {
    background: #fafafc;
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid #ebebed;
    height: 38px;
    color: #5c5a66;
}
.monitorManage-noMargin .nav.nav-tabs.nav-public>li>a {
    padding: 0 12px;
    line-height: 39px;
    border-right: 1px solid #ebebed;
    margin: 0;
}
.monitorManage-noMargin .nav.nav-tabs.nav-public>li:FIRST-CHILD>a {
    border-radius: 4px 0 0 0;
}
.monitorManage-noMargin .nav.nav-tabs.nav-public>li:HOVER>a {
	color: #2b2933;
	background: transparent;
}
.monitorManage-noMargin .nav.nav-tabs.nav-public>li.active>a {
    color: #5b62f9;
    background: #FFF;
}
.monitorManage-noMargin .panel .tab-content>.tab-pane {
	padding: 20px;
}
.monitorManage-noMargin .nav.nav-tabs.nav-underLine {
	border-bottom: 1px solid #e0dfe6;
	color: #929099;
	background: #ffffff;
}

.monitorManage-noMargin .nav.nav-tabs.nav-underLine>li>a {
    padding: 0 15px;
    height: 36px;
    line-height: 36px;
    margin: 0 6px;
    position: relative;
    font-size: 12px;
}
.monitorManage-noMargin .nav.nav-tabs.nav-underLine>li>a:HOVER {
	color: #2b2933;
}

.monitorManage-noMargin .nav.nav-tabs.nav-underLine>li.active>a,
.monitorManage-noMargin .nav.nav-tabs.nav-underLine>li.active>a:HOVER {
    background: transparent;
    border-bottom: 2px solid #5b62f9;
    font-weight: bold;
}

.monitorManage-noMargin .nav.nav-tabs.nav-underLine>li.active>a:after {
	content:'';
	width: 0;
	height: 0;
	border: 5px solid transparent;
	position: absolute;
	border-bottom-color: #5b62f9;
	margin: 0 auto;
	left: 0;
	right: 0;
	margin-top: 27px;
}

.monitorManage-noMargin .boolean-switch:BEFORE {
    content: '';
    position: absolute;
    height: 20px;
    width: 20px;
    background: #FFF;
    border-radius: 10px;
    border: 1px solid #c7c6cc;
    transition: all 0.3s;
    top: 1px;
    left: 1px;
}
.monitorManage-noMargin .boolean-switch.readonly {
    cursor: not-allowed;
}
.monitorManage-noMargin .boolean-switch{
    display: inline-block;
    position: relative;
    width: 44px;
    height: 24px;
    cursor: pointer;
    border-radius: 12px;
    transition: all 0.3s;
    background: #c7c6cc;
    float: left;
    clear: right;
}

.monitorManage-noMargin .boolean-switch.true {
	background: #5b62f9;
}
.monitorManage-noMargin .boolean-switch.true:BEFORE {
    margin-left: 20px;
}
.monitorManage-noMargin .range {
    width: 300px;
    border-bottom: 2px solid #e5e5e7;
    position: relative;
    height: 22px;
    cursor: pointer;
}
.monitorManage-noMargin .range>.line {
    border-bottom: 2px solid #5b62f9;
    display: block;
    position: absolute;
    top: 22px;
}
.monitorManage-noMargin .range>.ball {
    width: 10px;
    height: 10px;
    border: 1px solid #c7c6cc;
    display: inline-block;
    border-radius: 6px;
    position: absolute;
    left: 0;
    top: 17px;
    background: #fff;
    cursor: move;
}
.monitorManage-noMargin .range>.ball:AFTER {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    border-top: 4px solid #5b62f9;
    border-bottom: 4px solid transparent;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    top: -6px;
    margin-left: 1px;
}
.monitorManage-noMargin .range>.ball:BEFORE {
    content: attr(data-title);
    position: absolute;
    width: 30px;
    height: 18px;
    line-height: 18px;
    border-radius: 4px;
    background: #5b62f9;
    color: #FFF;
    top: -24px;
    margin-left: -10px;
    text-align: center;
}
.monitorManage-noMargin .range>.ball:HOVER {
	box-shadow: 0 -2px 2px rgba(0,0,0,0.15) inset;
}
.monitorManage-noMargin button.cancelBtn,
.monitorManage-noMargin button.confirmBtn {
	font-size: 14px !important;
}
.monitorManage-noMargin button.cancelBtn {
	padding: 0 18px;
	background: #f9f9fb;
	line-height: 22px;
	height: 32px;
	border-color: #e6e6e6;
}

.monitorManage-noMargin button.cancelBtn:HOVER {
	background: #e6e6e6;
	color: #5c5a66;
}
.monitorManage-noMargin button.confirmBtn {
	padding: 0 18px;
	background: #f2f3ff;
	line-height: 22px;
	height: 32px;
	border-color: #b3b7ff;
	color: #5b62f9;
}

.monitorManage-noMargin button.confirmBtn:HOVER {
	background: #5B62F9;
	color: #FFFFFF;
	border-color: #5B62F9;
}

.monitorManage-noMargin button.addBtn:HOVER,
.monitorManage-noMargin button.editBtn:HOVER,
.monitorManage-noMargin button.delBtn:HOVER,
.monitorManage-noMargin button.detailBtn:HOVER {
	background-color: #F1F0F5;
}

.monitorManage-noMargin button.addBtn {
	padding: 0 10px 0 22px;
	background: #f9f9fb url("../img/button/add-black.png") 8px 6px no-repeat;
	line-height: 22px;
}

.monitorManage-noMargin button.editBtn {
	padding: 0 10px 0 22px;
	background: #f9f9fb url("../img/button/edit-black.png") 8px 6px no-repeat;
	line-height: 22px;
}

.monitorManage-noMargin button.delBtn {
	padding: 0 10px 0 22px;
	background: #f9f9fb url("../img/button/del-black.png") 8px 6px no-repeat;
	line-height: 22px;
}
.monitorManage-noMargin button.detailBtn {
	padding: 0 10px 0 22px;
	background: #f9f9fb url("../img/button/detail-black.png") 8px 6px no-repeat;
	line-height: 22px;
}
/* 增长降低箭头 */
.monitorManage-noMargin .arrows-up {
    display: inline-block;
    width: 4px;
    height: 12px;
    background: #ff3341;
    position: relative;
    margin: 0 6px;
    top: 1px;
}
.monitorManage-noMargin .arrows-up:BEFORE {
	content: '';
    position: absolute;
    border-width: 6px 5px 6px 5px;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: #ff3341;
    left: -3px;
    top: -8px;
}
.monitorManage-noMargin .arrows-down {
	display: inline-block;
    width: 4px;
    height: 12px;
    background: #22ac38;
    position: relative;
    margin: 0 6px;
}
.monitorManage-noMargin .arrows-down:BEFORE {
    content: '';
    position: absolute;
    border-width: 6px 5px 6px 5px;
    border-color: transparent;
    border-style: solid;
    border-top-color: #22ac38;
    left: -3px;
    top: 8px;
}

.monitorManage-noMargin button.disabled:Hover, 
.monitorManage-noMargin button.disabled.addBtn:Hover, 
.monitorManage-noMargin button.disabled.editBtn:hover, 
.monitorManage-noMargin button.disabled.detailBtn:hover, 
.monitorManage-noMargin button.disabled.delBtn:Hover {
    background-color: #F9F9FB;
}

.monitorManage-noMargin button.disabled.addBtn {
    background: #F9F9FB url(../img/button/add-gray.png) 8px 6px no-repeat;
}

.monitorManage-noMargin button.disabled {
    color: #aeadb2;
    border-color: #ebebed;
    cursor: not-allowed;
}

.monitorManage-noMargin button {
    padding: 0 10px 0 10px;
    border: 1px solid #c7c6cc;
    background-color: #f9f9fb;
    color: #5c5a66;
    height: 24px;
    transition: all 0.2s;
    border-radius: 2px;
}

.monitorManage_layout {
	display: flex;
	padding: 0 !important;
}

.monitorManage-left {
	width: 240px;
	flex: none;
	border-right: 1px solid #f1f0f5;
	/* overflow-y:scroll;
	min-height: calc(100vh - 220px);
	height: 838px; */
	position: relative;
}
.monitorManage-right {
	/* width: 1316px; */
	flex: auto;
	box-sizing: border-box;
	padding: 8px 20px 20px 20px;
}
.monitorManage-ztree{
	flex: none;
	overflow-y: auto !important; 
	height: 700px !important;
}
.monitorManage-ztree>li{
	background-color: #fff;
}
section.monitorManage-noMargin input.search:FOCUS {
	width: 160px;
}
.monitorManage-search>a {
  	color: blue;
}
section.monitorManage-noMargin input.search.long {
	width: 200px;
	border-color: #5b62f9;
}
section.monitorManage-noMargin input.search{
	width: 50px;
	height: 20px;
	margin: 0;
	transition: all 0.5s;
	position: absolute;
	right: 10px;
	top: 6px;
	z-index: 2;
	background: #fff url("img/ncPoc/search-icon.png") no-repeat right center;
	cursor:pointer;
}
.monitorManage-search {
	height: 34px;
	line-height: 34px;
	position: relative;
	padding-left: 20px;
	border-bottom: 1px solid #f1f0f5;
	font-size: 12px;
}
.monitorManage-obj-ctn {
	height: 116px;
	overflow-y: auto;
	width: calc(100% + 20px);
	display:flex;
	flex-wrap:wrap;
}
.monitorManage-obj-ctn>.obj {
	float: left;
	width: 196px;
	height: 48px;
	line-height: 16px;
	border: 1px solid #e5e5e5;
	border-radius: 4px;
	margin-right: 20px;
	/* margin-top: 20px; */
	box-sizing: border-box;
	padding: 0 15px 0 48px;
	background: #f7f7f7 url(module/monitorManage/img/server.png) 14px center no-repeat;
	cursor: pointer;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding-top: 7px;
}
/* .monitorManage-obj-ctn>.obj:nth-child(6n) {
	margin-right: 0;
} */
.monitorManage-obj-ctn>.obj.active {
	background: #dff2fb url(module/monitorManage/img/server-active.png) 14px center no-repeat;
	border-color: #29a6e6;
	cursor: default;
}
.monitorManage-kpi-ctn {
	height: 780px;
	border: 1px solid #e5e5e5;
	margin-top: 20px;
	border-radius: 4px;
	display:flex;
}
.monitorManage-kpi {
	height: 740px;
	overflow-y: auto;
}
.monitorManage-noMargin ul {
	margin: 0;
}
.monitorManage-kpi li {
	height: 28px;
	line-height: 28px;
	padding-left: 46px;
	border-bottom: 1px solid #e5e5e5;
	background: url(./module/monitorManage/img/kpi.png) 20px center no-repeat;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	cursor: pointer;
}
.monitorManage-kpi li.active {
	background: #29a6e6 url(./module/monitorManage/img/kpi-active.png) 20px center no-repeat;
	color: #fff;
}
/* .monitorManage-kpi-ctn>div {
	float: left;
} */
.monitorManage-nav a {
	border-bottom-color: #29a6e6 !important;
}
.monitorManage-nav a:after {
	border-bottom-color: #29a6e6 !important;
}
.monitorManage-kpi-data .change-size{
	position: absolute;
	width: 24px;
	height: 24px;
	background: url(./module/monitorManage/img/all-2.png) no-repeat;
	top: 0;
	right: 0;
	cursor: pointer;
}
.monitorManage-kpi-data.large .change-size {
	background: url(./module/monitorManage/img/all-1.png) no-repeat;
}
.monitorManage-kpi-data {
	/* width: 1072px;  */
	height: 540px; 
	background: #fff; 
	box-sizing: border-box; 
	padding: 2px 20px 20px 20px; 
	/* position: absolute; 
	right: 21px; 
	bottom: 21px; */
	border-radius: 4px;
	transition: all 0.3s;
	z-index: 100;
	flex:1;
}
.monitorManage-kpi-data.large {
	right: -1px;
	bottom: -1px;
	width: 1558px;
	height: 778px;
	border: 1px solid #e5e5e5;
}
.monitorManage-echarts-ctn {
	margin-top: 14px;
	margin-bottom: 20px;
	/* width: calc(100% + 40px); */
	height: 690px;
	position: relative;
	display: -webkit-flex;
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
	margin-left: -20px;
	overflow-x: hidden;
	overflow-y: auto;
}
.monitorManage-echarts-ctn:after {
	content: '';
	display: table;
}
.monitorManage-echarts {
	width: 1560px;	
	width: calc(100vw - 560px);
	/* width: 1072px; */
	/* height: 360px; */
	height: 520px;
}
.monitorManage-echarts-ctn.show-list .monitorManage-echarts {
	width: 752px;
}
.monitorManage-kpi-data.large .monitorManage-echarts {
	width: 1556px;
}
.monitorManage-kpi-data.large .monitorManage-echarts-ctn.show-list .monitorManage-echarts {
	width: 1236px;
}
.monitorManage-echarts-ctn input,
.monitorManage-echarts-ctn select {
	margin: 0;
}
.monitorManage-echarts-ctn select {
	width: 124px;
	height: 22px;
	padding: 1px 6px;
	font-size: 12px;
	margin-left: 20px;
}
.monitorManage-echarts-ctn .controller {
	position: absolute;
	right: 18px;
	top: 0;
	z-index: 20;
}
.monitorManage-echarts-ctn.show-list .controller {
	right: 337px;
}
.monitorManage-echarts-ctn .button {
	display: inline-block;
	width: 78px;
	height: 22px;
	line-height: 21px;
	text-align: center;
	background: #29a6e6;
	vertical-align: middle;
	border-radius: 4px;
	color: #fff;
	cursor: pointer;
}
.monitorManage-echarts-ctn .button:hover {
	background: rgba(41, 166, 230, 0.8);
}
.monitorManage-echarts-ctn .button.active {
	background: rgba(41, 166, 230, 0.6);
}
.monitorManage-echarts-ctn .button.cancel {
	color: #666; 
	background: #eee;
}
.monitorManage-echarts-ctn .button.cancel:hover {
	opacity: 0.8;
}
.monitorManage-kpi-panel {
	border-right: 1px solid #e5e5e5; 
	width: 200px;
	position: relative;
}
.monitorManage-button-ctn {
	display: -webkit-flex;
	display: flex;
	/* width: 990px; */
	width: 100%;
	height: 50px;
	/* position: absolute;
	top: 353px;
	left: 62px; */
	justify-content: center;
	align-items: center;
	border: 1px solid #e5e5e5;
	border-top: none;
}	
.monitorManage-button-panel {
	display: -webkit-flex;
	display: flex;
	justify-content: space-between;
}
.monitorManage-button-panel .button {
	width: 120px;
	margin-right: 10px;
	height: 25px;
    line-height: 25px;
}
.monitorManage-button-panel .button:last-child {
	margin-right: 0;
}
.monitorManage-echarts-ctn .list {
	width: 298px; 
	height: 402px; 
	display: none;
	border: 1px solid #e5e5e5; 
	border-radius: 4px;
}
.monitorManage-echarts-ctn.show-list .list {
	display: block;
}
.relation-echarts-ctn {
	display: none;
	width: calc(100% - 25px); 
	margin-left: 20px; 
	min-height: 280px; 
	border: 1px solid #e5e5e5; 
	border-radius: 4px;
	margin-bottom: 20px;
}
.monitorManage-echarts-ctn.show-relation-echarts .relation-echarts-ctn {
	display: block;
}
.monitorManage-amplitude-btn {
	position: relative;
}
.monitorManage-amplitude-panel {
	position: absolute;
	top: 22px;
	right: -1px;
	padding: 15px 15px 10px 15px;
	background: #fff;
	border: 1px solid #e5e5e5;
	border-radius: 4px;
	box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
	color: rgb(51, 51, 51);
	width: 190px;
	display: none;
}
.monitorManage-amplitude-panel label {
	margin: 0;
	margin-right: 10px;
}
.monitorManage-amplitude-panel label.max {
	margin-left: 15px;
}
.monitorManage-amplitude-panel input {
	width: 24px;
    height: 12px;
    margin-right: 4px;
}
.monitorManage-amplitude-panel>div{
	display: -webkit-flex;
	display: flex;
	justify-content: flex-end;
}
.monitorManage-amplitude-panel>div:first-child {
	margin-bottom: 15px;
}
.monitorManage-amplitude-panel .button {
	width: 52px;
	height: 20px;
	line-height: 20px;
}
.monitorManage-amplitude-panel .button:first-child {
	margin-right: 10px;
}
.monitorManage-amplitude-btn.active .monitorManage-amplitude-panel {
	display: block;
}
.monitorManage-list-title {
	font-size: 13px;
	padding: 12px 12px 12px 20px;
}
.monitorManage-list-title>.close {
	float: right;
    font-size: 18px;
    font-weight: 500;
    color: #ccc;
    opacity: 1;
    cursor: pointer;
    margin-top: -5px;
}
.monitorManage-list-title>.close:hover {
	opacity: 0.8;
}
.monitorManage-list-content {
	padding: 0 20px 20px 20px;
	height: 338px;
}
.monitorManage-list-table {
	border:1px solid #d7dcdf;
}
.monitorManage-noMargin .dataTables_paginate {
	margin-top: 12px !important;
	padding: 0 !important;	
	white-space: nowrap;
	margin-right: -8px;
}
.monitorManage-echarts-ctn.show-list .monitorManage-button-ctn{
	width: 670px;
}
.monitorManage-kpi-data.large .monitorManage-button-ctn {
	width: 1474px;
}	
.monitorManage-kpi-data.large .monitorManage-echarts-ctn.show-list .monitorManage-button-ctn {
	width: 1154px;
}
.monitorManage-echarts-ctn.show-relation-echarts .monitorManage-button-ctn {
	width: 973px;
}
.monitorManage-echarts-ctn.show-list.show-relation-echarts .monitorManage-button-ctn {
	width: 670px;
}
.monitorManage-echarts-ctn.show-list.show-relation-echarts .controller {
	right: 320px;
}
.monitorManage-kpi-data.large .monitorManage-echarts-ctn.show-list.show-relation-echarts .controller {
	right: 337px;
}
.monitorManage-kpi-data.large .monitorManage-echarts-ctn.show-list.show-relation-echarts .monitorManage-button-ctn {
	width: 1154px;
}
.monitorManage-kpi-data.large .monitorManage-echarts-ctn.show-relation-echarts .monitorManage-button-ctn {
	width: 1474px;
}
.monitorManage-kpi-data.large .monitorManage-echarts-ctn {
	height: auto;
	background: #fff;
}
.monitorManage-kpi-data.large .monitorManage-echarts-ctn.show-relation-echarts .relation-echarts-ctn {
	width: calc(100% - 40px);
}
.monitorManage-echarts-panel {
	display: -webkit-flex;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
}
.monitorManage-kpi-echarts {
	width: 515px;
	height: 216px;
	margin-bottom: 20px;
}
.monitorManage-kpi-data.large .monitorManage-kpi-echarts {
	width: 505px;
}
.monitorManage-data-panel {
	/* width: calc(100% - 37px); */
	width: 100%;
    height: 142px;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 15px;
    margin-left: 20px;
    border-radius: 4px;
    background: #f1f1f1;
}
.monitorManage-data-panel p {
	margin: 0;
}
.monitorManage-data-panel>div {
	display: -webkit-flex;
	display: flex;
}
.monitorManage-data-panel>div>div {
	height: 110px;
	margin-right: 20px;
	display: -webkit-flex;
	display: flex;
}
.monitorManage-data-panel>div>div:first-child {
	width: calc((100% - 20px) * 0.5);
}
.monitorManage-data-panel>div>div:last-child {
	width: calc((100% - 20px) * 0.5);
	margin-right: 0;
}
.monitorManage-data-panel>div>div>.left {
	width: 100px;
	height: 110px;
	box-sizing: border-box;
	padding-top: 85px;
	background: url(./module/monitorManage/img/cur-num.png) 0 0 no-repeat;
}
.monitorManage-data-panel .monitorManage-forecast-data>.left.innormal {
	background: url(./module/monitorManage/img/innormal.png) 0 0 no-repeat;
}
.monitorManage-data-panel .monitorManage-forecast-data>.left.normal {
	background: url(./module/monitorManage/img/normal.png) 0 0 no-repeat;
}
.monitorManage-data-panel>div>div>.right {
	width: calc(100% - 100px);
	height: 100px;
	overflow-y: auto;
}								
.monitorManage-data-panel>div>div>.right>li {
	display: -webkit-flex;
	display: flex;
	border-bottom: 1px solid #e5e5e5;
	height: 36px;
    line-height: 36px;
}
.monitorManage-data-panel>div>div>.right>li>div {
	text-align: center;
}
.monitorManage-current-data>.right>li>div:first-child {
	width: 180px;
}
.monitorManage-current-data>.right>li>div:last-child {
	width: 110px;
}
.monitorManage-forecast-data>.right>li>div:nth-child(1) {
	width: 180px;
}
.monitorManage-forecast-data>.right>li>div:nth-child(2) {
	width: 110px;
}
.monitorManage-forecast-data>.right>li>div:nth-child(3) {
	width: 195px;
	text-align: left;
}
.monitorManage-forecast-data>.left>span {
	padding: 1px 12px;
	border: 1px solid #a6a6a6;
	border-radius: 4px;	
}
.monitorManage-forecast-data>.right span {
	padding: 1px 14px;
	border-radius: 4px;	
}
.monitorManage-forecast-data>.right .overtop {
	background: #f05050;
	border: 1px solid #f05050;
	color: #fff;
}
.monitorManage-forecast-data>.right .under {
	border: 1px solid #f05050;
	color: #f05050;
}
.monitorManage-mask{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	text-align: center;
	line-height: 780px;
	background-color: rgba(37, 38, 45, 0.4);
	color: #fff;
	cursor: not-allowed;
	z-inde: 666;
}
</style>

<section id="monitorManageSection" class="panel monitorManage-noMargin">
	<!-- <p class="title">AI模型管理</p> -->
	<div class="content monitorManage_layout">
		<div class="monitorManage-left appConfig">
			<div class="monitorManage-search">
				全部应用(<span id="appNum"></span>)
				<input id="searchApp" class="search" type="text" placeholder="搜索"/>
			</div>
			<ul class="ztree monitorManage-ztree"></ul>
		</div>
		<div class="monitorManage-right">
			<!-- 对象 -->
			<div>
				<p>
					对象(<span id="objNum"></span>)
					<input id="searchObj" class="search" type="text" style="float: right; position: static;" placeholder="搜索"/>
				</p>
				<div id="objCtn" class="monitorManage-obj-ctn">
					
				</div>
			</div>
			
			<!-- 指标 -->
			<div class="monitorManage-kpi-ctn">
				<div id="kpiPanel" class="monitorManage-kpi-panel">
					<div class="monitorManage-search">
						全部指标(<span id="kpiNum"></span>)
						<input id="searchKpi" class="search" type="text" placeholder="搜索"/>
					</div>
					<ul id="kpiCtn" class="monitorManage-kpi">
						<!-- <li>AIX CPU使用率</li>
						<li class="active">AIX CPU使用率</li> -->
					</ul>
					
					<div class="monitorManage-mask" id="monitor-mask">请先选择三级分类和具体对象</div>
				</div>
				
				<div id="kpiData" class="monitorManage-kpi-data">
					<!-- <i id="changeSize" class="change-size"></i> -->
					<ul class="nav nav-tabs nav-underLine monitorManage-nav">
						<li class="active"><a href="#tabs1" data-toggle="tab">实时</a></li>
						<li><a href="#tabs2" data-toggle="tab">训练预览</a></li>
					</ul>
					<div class="tab-content" style="overflow: visible;">
						<!-- 实时 -->
						<div id="tabs1" class="tab-pane active">
							<div class="monitorManage-echarts-ctn">
								<div class="controller">
									<input type="checkbox"/><span style="position: relative; left: 6px; top: 2px;">显示模型对比</span>
									<select id="timeRange">
										<option value="month" selected>最近一个月</option>
										<option value="week">最近一个星期</option>
										<option value="day">最近一天</option>
									</select>
								</div>
								
								<div id="eCurTime" class="monitorManage-echarts">
								
								</div>
								
								<div class="monitorManage-data-panel">
									<div>
										<div class="monitorManage-current-data">
											<div class="left">
												
											</div>
											<ul class="right">
												<li>
													<div>当前时间</div><div>值</div>
												</li>
												<li >
													<div id="curTime">-</div><div id="curValue">-</div>
												</li>
											</ul>
										</div>
										<div class="monitorManage-forecast-data">
											<div id="icon" class="left normal">
												<span>2小时以内</span>
											</div>
											<ul id="forecastCtn" class="right">
												<li>
													<div>预测时间</div><div>值</div>
												</li>
												<!-- <li><div style="width: 290px; box-sizing: border-box; padding-left: 40px">无风险点</div></li> -->
												<!-- <li>
													<div>2018/05/28 13:02:22</div><div>349</div><div><span class="overtop">高于上限</span></div>
												</li>
												<li>
													<div>2018/05/28 13:02:22</div><div>349</div><div><span class="under">低于下限</span></div>
												</li> -->
											</ul>
										</div>
									</div>
									<!-- <p>距下次刷新剩余( <span id="residueTime">6min 0s</span> )</p> -->
								</div>
							</div>
						</div>
						
						<!-- 训练预览 -->
						<div id="tabs2" class="tab-pane">
							<div id="echartsCtn" class="monitorManage-echarts-ctn">
								<div class="controller">
									<div id="amplitudeBtn" class="button monitorManage-amplitude-btn">
										设置振幅
										<div class="monitorManage-amplitude-panel">
											<div>
												<label for="min">下限</label><input id="min" type="text"/> %
												<label for="max" class="max">上限</label><input id="max" type="text"/> %
											</div>
											<div>
												<div id="amplitudeConfirm" class="button">确认</div>
												<div id="amplitudeCancel" class="button cancel">取消</div>
											</div>
										</div>
									</div>
									<select>
										<option>最近一个月</option>
									</select>
								</div>
								<div id="eTrain" class="monitorManage-echarts" style="margin-bottom: 60px;">
									<!-- <div id="range" class="range">
										<span id="line" class="line" style="width: 0px;"></span>
										<span id="ball" class="ball" data-title="0%" style="margin-left: 0px;"></span>
									</div> -->
								</div>
								<div class="monitorManage-button-ctn">
									<div class="monitorManage-button-panel selected-area-btn hide">
										<div id="listBtn" class="button">展示区间列表</div>
										<div id="toInnormalBtn" class="button">将该区域标为异常</div>
										<div id="toNormalBtn" class="button">将该区域标为正常</div>
										<div id="relationBtn" class="button">关联分析</div>
									</div>
									<div class="monitorManage-button-panel init-btn">
										<div id="testBtn" class="button">测试</div>
										<div id="trainBtn" class="button">训练</div>
									</div>
								</div>
								
								<div class="list">
									<div class="monitorManage-list-title">
										区间列表
										<span id="closeList" class="close">X</span>
									</div>
									<div class="monitorManage-list-content">
										<table id="listTable" class="display dataTable table monitorManage-list-table">
											<thead>
												<th>时间</th>
												<th>值</th>
											</thead>
										</table>
									</div>
								</div>
								
								<div class="relation-echarts-ctn">
									<div class="monitorManage-list-title">
										关联分析
										<span id="closeRelation" class="close">X</span>
									</div>
									<div id="relactionEchartsCtn" class="monitorManage-echarts-panel">
										<!-- <div id="echarts0" class="monitorManage-kpi-echarts">
											
										</div>
										<div id="echarts1" class="monitorManage-kpi-echarts">
											
										</div> -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
