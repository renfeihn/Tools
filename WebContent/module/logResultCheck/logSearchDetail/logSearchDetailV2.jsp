<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
.logSearchDetail-container {
	width: 100%;
	display: flex;
	height: calc(100vh - 42px);
}
.logSearchDetail-container *{
    box-sizing: border-box;
}
.logSearchDetail-left {
	width: 200px;
	flex: none;
    border-right: 1px solid #ebebed;
    transition: all ease .2s;
    height: 100%;
    overflow: auto;
    overflow-x: hidden;
}
.logSearchDetail-left.move {
	margin-left: -200px;
}
.logSearchDetail-left.move>.logSearchDetail-title {
    background: initial;
}
.logSearchDetail-left>.logSearchDetail-title i{
	color: var(--color-theme);
	cursor: pointer;
	position: absolute;
	left: 180px;
	padding: 10px;
}
.logSearchDetail-left.move>.logSearchDetail-title i{
	left: -5px;
}

.logSearchDetail-left p {
	margin: initial;
}
.logSearchDetail-left>.logSearchDetail-title {
    padding: 0 20px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
}
.logSearchDetail-quickSearchContent {
	max-height: 280px;
}
.logSearchDetail-quickSearchContent>a{
    height: 30px;
    line-height: 30px;
    display: block;
    padding-left: 30px;
    font-size: 12px;
    color: var(--color-theme);
    text-decoration: underline;
}
.logSearchDetail-quickSearchContent>div {
    padding: 5px 20px 5px 20px;
}
.logSearchDetail-quickSearchContent>div>div:nth-child(1) {
	display: flex;
	flex-direction: column;
}
.logSearchDetail-quickSearchContent>div>div:nth-child(1) span{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #636363;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
    height: 25px;
    line-height: 25px;
}
.logSearchDetail-quickSearchContent>div>div:nth-child(1) span.active {
    color: var(--color-theme);
}
.logSearchDetail-quickSearchContent>div>div:nth-child(1) span>i{
	color: #D4D3D9;
	margin-right: 3px;
}
.logSearchDetail-quickSearchContent>div>div:nth-child(2) {
	display: flex;
	justify-content: space-between;
}
.logSearchDetail-quickSearchContent>div>div:nth-child(2) a {
	display: flex;
	justify-content: space-around;
	color: var(--color-theme);
    font-size: 12px;
    font-style: italic;
}
.logSearchDetail-quickSearchContent>div>div:nth-child(2) a.disabled {
    color: #ccc;
    cursor: not-allowed;
}
.logSearchDetail-quickChooseContent {
    padding: 10px 10px 10px 15px;
}
.logSearchDetail-quickChooseContent>div{
    font-size: 12px;
}
.logSearchDetail-quickChooseContent>div>p {
	font-weight: normal;
	margin-bottom: 5px;
}
.logSearchDetail-quickChooseContent>div>p>i {
	color: #D4D3D9;
	margin-right: 3px;
}
.logSearchDetail-quickChooseContent>div>div {
	display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    padding-left: 15px;
    font-weight: normal;
    color: #636363;
}
.logSearchDetail-quickChooseContent>div>div>span{
	height: 25px;
	line-height: 25px;
	text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
}
.logSearchDetail-quickChooseContent>div>div>span.active{
	color: var(--color-theme);
}
.logSearchDetail-right {
	flex: auto;
    width: calc(100% - 200px);
    height: 100%;
}
.logSearchDetail-top{
	padding: 10px 10px 10px 20px;
	background-color: #ebedf5;
}
.logSearchDetail-searchGroup{
    display: flex;
    align-items: center;
    height: 40px;
    position: relative;
}
.logSearchDetail-searchGroup>input {
	flex: auto;
    height: 100%;
}
.logSearchDetail-searchGroup * {
	margin: initial !important;
}
.logSearchDetail-searchGroup>*{
	height: 100%;
}

.logSearchDetail-searchGroup>button {
	line-height: 35px;
    height: 35px;
    width: 100px;
    margin-left: 10px !important;
}
.logSearchDetail-searchGroup>div {
	border: 1px solid #c7c6cc;
	background-color: #fff;
}
.logSearchDetail-searchGroup>div>input {
    outline: none;
    border: none;
    width: 122px;
    height: 100%;
    border-radius: 0;
}
.logSearchDetail-saveGroup {
	display: flex;
	justify-content: space-between;
	padding-top:10px;
	position: relative;
	font-size: 12px;
}
.logSearchDetail-saveGroup>* {
	color: var(--color-theme);
}
.logSearchDetail-saveGroup>span:before {
	content: attr(data-before);
    color: #878899;
    margin-right: 5px;
}
.logSearchDetail-saveGroup>span:after {
	content: attr(data-after);
    color: #878899;
    margin-left: 5px;
}
.logSearchDetail-saveGroup>div>span{
	border-right: 1px solid #bab9c0;
	margin-left: 10px;
	padding-right: 10px;
	font-weight: normal;
	cursor: pointer;
}
.logSearchDetail-saveGroup>div>span#createSQL {
    display: inline-block;
    width: 106px;
    height: 21px;
    text-align: center;
    border-radius: 3px;
    padding: 0;
/* 	border: 1px solid rgba(85, 168, 253, 1); */
}
.logSearchDetail-saveGroup>div>span:last-child {
	border: none;
}
.logSearchDetail-viewChange, .fileViewType{
	display: inline-block;
	cursor: pointer;
	margin-left: 10px;
}
.logSearchDetail-viewChange i,
.fileViewType i{
	font-size: 14px;
	color: #c7c6cc;
	border: 1px solid #c7c6cc;
	padding: 2px 15px;
}
.logSearchDetail-viewChange i.active,
.fileViewType i.active{
	color: var(--color-theme);
	border: 1px solid var(--color-theme);
}
.logSearchDetail-viewChange i+i,
.fileViewType i+i{
	margin-left: -1px;
    border-left: 1px solid var(--color-theme);
}

.logSearchDetail-echartsContent{
	display: flex; 
	height: 0;
	border-top: 1px solid #e0dfe6;
	border-bottom: 1px solid #e0dfe6;
	transition: all ease .2s;
	overflow: hidden;
}
.logSearchDetail-echartsContent.move{
	margin-top: -99px;
}

.logSearchDetail-echarts {
	height: 100%;
	width: 100%;
}
.logSearchDetail-echartsLable{
	visibility: hidden;
	flex: none;
	width: 100px;
	line-height: 32px;
	font-size: 10px;
    font-weight: normal;
    height: 100%;
}
.logSearchDetail-echartsLable>span{
	display: block;
	height: calc((100%)/3);
	width: 100%;
	cursor: pointer;
	border-bottom: 1px solid #e5e5e9;
	border-right: 1px solid #e5e5e9;
}
.logSearchDetail-echartsLable>span:last-child{
	border-bottom: none;
}
.logSearchDetail-echartsLable>span.active{
	color: var(--color-theme);
	border-right: none;
}
.logSearchDetail-echartsLable>span:before{
	content: '';
	display: inline-block;
	width: 4px;
	height: 50%;
	margin-right: 10px;
	margin-bottom: -4px;
}
.logSearchDetail-echartsLable>span.active:before{
	content: '';
	display: inline-block;
	width: 4px;
	height: 50%;
	background-color: var(--color-theme);
	margin-right: 10px;
	margin-bottom: -4px;
}
/*搜索结果展示*/
.logSearchDetail-logInfo {
    height: 100%;
    width: 100%;
    transition: all ease .2s;
}
.logSearchDetail-logInfo ul.nav>li{
	width: 100px;
	text-align: center;
	font-weight: bold;
}
.logSearchDetail-logInfo.move{
	height: calc(100% - 3px);
}
.logSearchDetail-logInfo ul{
	background-color: #fff !important;
}
.logSearchDetail-logInfo ul li.active>a{
	background-color: #fafafc !important;
}
.logSearchDetail-logInfo .tab-content {
	height: calc(100% - 40px);
}
.logSearchDetail-logInfo.noData {
    align-items: center;
    justify-content: center;
    background-color: #eee;
    position: relative;
}
.logSearchDetail-logInfo.noData:before {
	content: '暂无数据';
    font-size: 30px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 180px;
}
.logSearchDetail-logInfo.noData>* {
	display: none;
}
.logSearchDetail-echartsHide{
	float: right;
	margin-top: 10px;
	margin-right: 10px;
	color: var(--color-theme);
	cursor: pointer;
}
.logSearchDetail-logContent {
	display: flex !important;
	padding: 0 !important;
	height: 100%;
	overflow: hidden;
}
.logSearchDetail-logContent>div:nth-child(1)>div>*{
	background-color: #fafafc;
}
.logSearchDetail-logContent>div:nth-child(1)>div>p{
	margin: 0;
	background: #fafafc;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    height: 34px;
}
.logSearchDetail-logContent>div:nth-child(1)>div>p:before{
	content: '';
	width: 5px;
	height: 50%;
	display: inline-block;
	margin-right: 10px;
	background-color: var(--color-theme);
	margin-bottom: -3px;
}
.logSearchDetail-logContent>div:nth-child(1) {
	width: 200px;
	flex: none;
	border-right: 1px solid #ebebed;
	transition: all ease .2s;
}
.logSearchDetail-logContent>div:nth-child(1).move {
	margin-left: -200px;
}
.logSearchDetail-logContent>div:nth-child(2) {
	flex: auto;
}
/*结构化字段*/
.logSearchDetail-logField{
	height: calc(100% - 2px); 
	overflow-y: hidden;
	background: #fafafc;
}
.logSearchDetail-logField:hover{
	overflow-y: auto;
}
.logSearchDetail-logUsed,
.logSearchDetail-logChoosed {
	display: flex;
	flex-direction: column;
	font-weight: normal;
}
.logSearchDetail-logUsed>span {
	cursor: pointer;
}
.logSearchDetail-logUsed>span,
.logSearchDetail-logChoosed>span {
	display: flex;
    color: #636363;
    font-size: 12px;
	padding: 0 0 0 20px;
	height: 30px;
	line-height: 30px;
}
.logSearchDetail-logUsed>span>span,
.logSearchDetail-logChoosed>span>span {
	flex: none;
	text-align: left;
}
.logSearchDetail-logChoosed>span>span:nth-child(1),
.logSearchDetail-logUsed>span>span:nth-child(1) {
	width: 10%;
}
.logSearchDetail-logChoosed>span>span:nth-child(2) {
	width: 70%;
	text-overflow : ellipsis; 
	white-space : nowrap; 
	overflow : hidden; 
}
.logSearchDetail-logUsed>span>span:nth-child(2) {
	width: 75%;
	text-overflow : ellipsis; 
	white-space : nowrap; 
	overflow : hidden; 
}
.logSearchDetail-logChoosed>span>span:nth-child(3) {
	text-align: right;
	width: 15%;
	cursor: pointer;
}
.logSearchDetail-logUsed>span>span:nth-child(3){
	display:none;
	width: 15%;
	color:var(--color-theme); 
	font-size:20px;
	text-align: center;
    line-height: 28px;
}
.logSearchDetail-logUsed>span.active,
.logSearchDetail-logUsed>span:hover{
	background-color: #ebedf5;
}
.logSearchDetail-logUsed>span:hover>span:nth-child(3),
.logSearchDetail-logUsed>span.active>span:nth-child(3){
	display: inline-block;
}

/*top5 start*/
.quickSearch-popularTop5{
	padding: 10px 20px 10px 30px;
	background-color: #fff;
	text-align: center;
}
.quickSearch-popularTop5>*{
	text-align: left;
}
.quickSearch-popularTop5>p{
	font-size: 12px;
	color: #7378fa;
	margin-bottom: 10px;
}
.quickSearch-popularTop5>p>span{
	float: right;
}
.quickSearch-popularTop5>p>span>i{
	width: 20px;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    color: #989898;
}
.quickSearch-popularTop5>p>span>i:nth-child(2){
	font-size: 20px;
}
.quickSearch-popularTop5>p>span>i:nth-child(2):before{
	position: relative;
    top: 4px;
}
.quickSearch-popularTop5>p>span>i:hover{
	color: #7378fa;
}
.quickSearch-popularTop5List{
	margin: 0;
	font-size: 12px;
}
.quickSearch-popularTop5List>li{
	height: 40px;
	margin-bottom: 5px;
}
.quickSearch-popularTop5List>li .count{
	color: #585761;
	height: 20px;
	text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.quickSearch-popularTop5List>li .line{
	background-color: #dee0fd;
	width: 100%;
	height: 20px;
}
.quickSearch-popularTop5List>li .blue{
	background-color: #5364d7;
	height: 20px;
	display: inline-block;
	position: relative;
}
.quickSearch-popularTop5List>li .quickSearch-icon{
	color: #ececed;
	background-color: #45424d;
	padding: 0 3px;
	border-radius: 2px;
    position: absolute;
    font-size: 12px;
    display: inline-block;
    height: 16px;
    line-height: 16px;
    margin: 2px 0;
    width: max-content;
}
/*top5 end*/
/*模态框*/
.quickSearch-modal .form-horizontal .control-label{
	width: 8em;
}
.quickSearch-modal .form-horizontal .controls>select,
.quickSearch-modal .form-horizontal .controls>input,
.quickSearch-modal .form-horizontal .controls>textarea {
	width: 100%;
}
/*模态框*/
/*搜索结果表格*/
.logSearchDetail-miniModal{
	background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 12px;
    min-width: 190px;
    max-height: 200px;
    max-width: 500px;
    border: 1px solid #eee;
    /*box-shadow: 0 0 5px rgba(0, 0, 0, .5);*/
}
.logSearchDetail-miniModal .modalContent{
	line-height: 35px;
	padding: 0 10px;
	/*background: #f0f5f8;*/
	background: #fafafc;
}
.logSearchDetail-miniModal .modalFooter>span{
	line-height: 35px;
	cursor: pointer;
	display: block;
	padding: 0 10px;
	font-weight: normal;
}
.logSearchDetail-miniModal .modalFooter>span:hover{
	background: #f7fcff;
	color: var(--color-theme);
}
.logSearchDetail-logTable tbody tr td {
    vertical-align: top;
    max-height: 330px;
    overflow: hidden;
}
/*.logSearchDetail-logTable tbody tr:hover{
	background-color: #f0f5ff !important;
}*/
.logSearchDetail-logTable tbody tr.selected{
	/*background-color: #ebedf5 !important;*/
	background-image: linear-gradient(to bottom, var(--color-theme) 0%, var(--color-theme) 100%) !important;
	background-repeat: no-repeat !important;
	background-position: 0px 0px !important;
	background-size: 2px 100% !important;
}

.logSearchDetail-logTable tbody tr .log-Share{
	position: absolute;
	left: 28px;
    border: 1px solid #fafafc;
    padding: 10px;
    box-shadow: 1px 1px 5px rgba(0,0,0,.3);
    border-radius: 5px;
    background: #fff;
    display: none;
    justify-content: space-around;
    overflow: visible;
    margin-top: 5px;
    width: 120px;
}

.logSearchDetail-logTable tbody tr .log-Share.active{
	display: flex;
}
.logSearchDetail-logTable tbody tr .log-Share:before{
	content: '';
    width: 10px;
    display: block;
    height: 10px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    transform: rotate(45deg);
    position: absolute;
    top: -7px;
    background: #fff;
}
.logSearchDetail-logTable tbody tr .log-Share .fa{
	font-size: 20px;
	cursor: pointer;
	color: #c7c6cb;
}
.logSearchDetail-logTable tbody tr .log-Share .fa:hover{
	color: var(--color-theme);
}
.logSearchDetail-logTable tbody tr .log-Share .fa-weixin:hover{
	color: #95e75d;
}
.logSearchDetail-logTable tbody tr .log-Down{
	position: absolute;
    border: 1px solid #fafafc;
    padding: 10px;
    box-shadow: 1px 1px 5px rgba(0,0,0,.3);
    border-radius: 5px;
    background: #fff;
   	display: none; 
    justify-content: space-around;
    overflow: visible;
    margin-top: 5px;
    width: 62px;
    margin-left: 10px;
}
.logSearchDetail-logTable tbody tr .log-Down.active{
	display: flex;
}
.logSearchDetail-logTable tbody tr .log-Down:before{
	content: '';
    width: 10px;
    display: block;
    height: 10px;
    border-top: 1px solid #dddddd;
    border-left: 1px solid #dddddd;
    transform: rotate(45deg);
    position: absolute;
    top: -7px;
    background: #fff;
}
.logSearchDetail-logTable tbody tr .log-Down .fa{
	font-size: 20px;
	cursor: pointer;
	color: #c7c6cb;
}
.logSearchDetail-logTable tbody tr .log-Down .fa:hover{
	color: var(--color-theme);
}
.logSearchDetail-logTable tbody tr td:nth-child(3){
	white-space: inherit;
}
.logSearchDetail-logTable tbody tr td:nth-child(4){
	padding: 0;
}
.logSearchDetail-logTable tbody tr td:nth-child(4)>*{
	padding: 0 20px;
}

.logSearchDetail-logTable tbody tr td p {
    vertical-align: top;
    overflow: hidden;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
}
.logSearchDetail-logTable tbody tr td>div.opeate {
    display: block;
    background: inherit;
    position: relative;
}
.logSearchDetail-logTable tbody tr td>div.opeate>a{
	text-decoration: underline;
	color: var(--color-theme);
	margin-right: 20px;
}
.logSearchDetail-logTable tbody td>p:nth-child(1) {
	display: flex;
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 5px;
    flex-wrap: wrap;
    line-height: 16px;
    font-weight: normal;
    color: #AAA9A8;
}
.logSearchDetail-logTable tbody td div>p{
	margin: 0;
    line-height: 18px;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-weight: normal;
}
.logSearchDetail-logTable tbody td div {
	max-height: 195px;
	overflow: hidden;
}
.logSearchDetail-logTable tbody td div.change {
    max-height: initial;
}
.logSearchDetail-logTable tbody td div>p{
	position: relative;
	overflow: visible;
}
.logSearchDetail-logTable tbody td div>p .showContext{
	position: absolute;
	width: 18px;
	height: 18px;
	background: url(img/logSearch/showContext1.png) no-repeat 0 5px;
	background-size: 10px 10px;
	display: none;
	left: -18px;
	top: 0px;
	cursor: pointer;
}
.logSearchDetail-logTable tbody td div>p:hover .showContext{
	display: inline-block;
	height: 100%;
}
.logSearchDetail-logTable tbody td div>p:hover .showContext:hover{
	background: url(img/logSearch/showContext2.png) no-repeat 0 5px;
	background-size: 10px 10px;
}

.logSearchDetail-logTable tbody p:nth-child(1)>i {
	position: absolute;
	font-size: 18px;
	transform: translate(-260%,3px);
    color: #AAA9A8;
    transition: all .25s linear;
}
.logSearchDetail-logTable tbody td>p:nth-child(1).change>i{
	transform:translate(-260%,3px) rotate(90deg);
}  
.logSearchDetail-logTable tbody p:nth-child(1)>span {
	margin-right: 10px;
}
.logSearchDetail-logTable tbody td>p:nth-child(1)>span>span:last-child {
	color: var(--color-theme);
}
.logSearchDetail-logTable tbody td>p:nth-child(1)+p{
	display: none;
}
.logSearchDetail-logTable tbody td>p:nth-child(1)+p>span{
	display: flex;
	color: #AAA9A8;
}
.logSearchDetail-logTable tbody td>p:nth-child(1)+p>span>span:nth-child(1){
	flex: none;
	width: 20%;
	min-width: 150px;
	cursor: pointer;
}
.logSearchDetail-logTable tbody td>p:nth-child(1)+p>span>span:last-child{
	color: var(--color-theme);
	flex: 1;
}

.logSearchDetail-logTable tbody td>p:nth-child(1).change+p{
	display: block;
}

.logSearchDetail-logTable td>i{
	cursor: pointer;
}
.logSearchDetail-logTable td>i:hover{
	color: var(--color-theme);
}
.logSearchDetail-logTable p span.field.h/*,
.logSearchDetail-logTable p span.field.a*/{
	background-color: #fef5c8;
}
.logSearchDetail-logTable p span.field>a{
	float: right;
	margin-right: 10px;
	display: none;
}
.logSearchDetail-logTable p span.field.h>a{
	display: block;
}
.logSearchDetail-logTable p span.field.h>a:hover{
	color: var(--color-theme);
}

.logSearchDetail-logTable .logContext p span.h,
.logSearchDetail-logTable .logContext p span.a{
	background-color: #fef5c8;
	cursor: pointer;
}
/*三级分类选择start*/
.logSearchDetail-container .logSearchDetail-accessLogContent {
	position: relative;
    color: #5c5a66;
    z-index: 1;
    font-size: 12px;
    background-color: #fff;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>span{
    width: 220px;
    line-height: 38px;
    display: block;
    color: #5c5a66;
    position: relative;
    cursor: pointer;
    padding: 0 60px 0 20px;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>span>i{
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
.logSearchDetail-container .logSearchDetail-accessLogContent>div,
.logSearchDetail-container .logSearchDetail-accessLogContent>ul{
	display: none;
	background-color: #fff;
    border: 1px solid #c7c6cc;
    position: absolute;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>ul{
    box-shadow: -1px 1px 2px #c7c6cc;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>div {
	padding: 10px;
    width: 600px;
    left: 179px;
    box-shadow: 1px 1px 2px #c7c6cc;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>div>div:first-child {
	position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 2;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>div>div:first-child button.light {
    background: #fff;
    border-color: var(--color-theme);
    color: var(--color-theme);
}
.logSearchDetail-container .logSearchDetail-accessLogContent>div>div:first-child button.light:hover {
    background: var(--color-theme);
    color: #FFFFFF;
    border-color: var(--color-theme);
}
.logSearchDetail-container .logSearchDetail-accessLogContent>div>div:first-child button{
	cursor: pointer;
	width: 70px;
	height: 35px;
	margin-left: 10px !important;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>div h5 {
    font-weight: bold;
    cursor: pointer;
    width: auto;
    display: inline-block;
    line-height: 20px;
    padding: 0 5px;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>div h5:not(.active):not(.disabled):hover,
.logSearchDetail-container .logSearchDetail-accessLogContent>div span:not(.active):not(.disabled):hover {
	text-decoration: underline;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>div span.active,
.logSearchDetail-container .logSearchDetail-accessLogContent>div h5.active {
	background-color: #e1e2f0;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>div div>span {
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
.logSearchDetail-container .logSearchDetail-accessLogContent>div:nth-child(3) h5.disabled,
.logSearchDetail-container .logSearchDetail-accessLogContent>div:nth-child(3) div>span.disabled{
	cursor: default;
}
.logSearchDetail-container .logSearchDetail-accessLogList{
	border-bottom: 1px dashed #eee;
	margin-top: 10px !important;
}
.logSearchDetail-container .logSearchDetail-accessLogList:after{
	content: '';
	clear: both;
	display: block;
}
.logSearchDetail-container .logSearchDetail-accessLogList>div{
	/*margin-left: 150px !important;
    min-height: 30px;
    position: relative;
    top: -20px;*/
    display: inline-block;
    min-height: 30px;
    float: right;
    width: calc(100% - 160px);
}
.logSearchDetail-container .logSearchDetail-accessLogList>div>p{
	word-wrap: break-word;
}

.logSearchDetail-container .logSearchDetail-accessLogContent>div p>span {
    display: inline-block;
    cursor: pointer;
    padding: 0 5px;
    margin: 0 5px 5px 5px !important;
    line-height: 20px;
    word-break: break-all;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>ul{
	width: 180px;
    cursor: pointer;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>ul>li {
	padding: 0 5px;
	height: 50px;
    line-height: 50px;
    position: relative;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>ul>li.choosed:before {
    content: '* ';
}
.logSearchDetail-container .logSearchDetail-accessLogContent>ul>li i {
    position: absolute;
    right: 5px;
    top: 10px;
    transform: translateY(10px);
}
.logSearchDetail-container .logSearchDetail-accessLogContent>ul>li.active {
	color: #505394;
    background: #d7d8f0;
}
.logSearchDetail-container .logSearchDetail-accessLogContent>ul>li:hover{
	background: #ebedf4;
}
/*三级分类选择end*/
/*日期选择*/
.logSearchDetail-dateRangeChoose{
	position: relative;
    color: #5c5a66;
    z-index: 1;
    font-size: 12px;
    background-color: #fff;
    border-left: none !important;
    border-right: none !important;
}
.logSearchDetail-dateRangeChoose>span{
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
.logSearchDetail-dateRangeChoose:after{
	content: '';
	height: 100%;
    width: 40px;
    position: absolute;
    right: 0;
    top: 0;
    border-left: 1px solid #c7c6cd;
    background: #f9f9fb url(img/logSearch/time.jpg) no-repeat center center;
}
.logSearchDetail-dateRangeChooseContent{
	display: none;
	position: absolute;
	width: 616px;
	top: 40px;
	left: 0px;
	background-color: #fff;
	box-shadow: 0px 10px 31px rgba(0,0,0,0.2);
}
.logSearchDetail-dateRangeChooseContent a{
	box-sizing: content-box;
}
.logSearchDetail-dateRangeChooseBtn{
	height: 32px;
	padding: 0 20px;
	margin-bottom: 20px !important;
	display: none;
}
.logSearchDetail-dateRangeChooseBtn>button{
	float: right;
}
.logSearchDetail-quickRangeSelect{
	margin: 0;
	width: 100%;
	padding: 20px;
}
.logSearchDetail-quickRangeSelect>li{
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
.logSearchDetail-quickRangeSelect>li:hover{
	border:1px solid var(--color-theme);
	color: var(--color-theme);
}

.logSearchDetail-quickRangeSelect>li.active{
	border:1px solid var(--color-theme);
    background: var(--color-theme);
    color: #fff;
}

.logSearchDetail-quickRangeSelect>li:nth-child(4n+4){
	margin-right: 0 !important;
}
/*日期选择end*/
/*搜索输入*/
.logSearchDetail-searchBtn{
	height: 38px;
    width: 120px;
    text-align: center;
    line-height: 40px;
    position: absolute;
    top: 1px;
    right: 1px;
    font-size: 18px;
    font-weight: normal;
    background: var(--color-theme);
    color: #fff;
    cursor: pointer;
}
.logSearchDetail-searchBtn.searchBtn-first {
	right: 0;
}
.logSearchDetail-searchBtn:hover{
	/*background-color: #5266d7;*/
	background-color: #0070c0;
	color: #fff;
}
.logSearchDetail-searchInput{
	width: calc(100% - 119px);
	line-height: 38px;
	padding: 0 10px;
	font-size: 12px;
	font-weight: normal;
	height: 38px;
    overflow-y: auto;
    background-color: #fff;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    position: relative;
    z-index: 2;
    border-left:1px solid #c7c6cb;
    border-right:1px solid #c7c6cb;
}
.logSearchDetail-searchInput:focus{
	outline:none;
	height:auto;
	max-height: 200px;
	border-bottom:1px solid #c7c6cb;
}
.logSearchDetail-searchGroup #createSQL {
    position: absolute;
    top: 10px;
    right: 130px;
    z-index: 3;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #eaebec;
    text-align: center;
	cursor: pointer;
}
.logSearchDetail-searchGroup #createSQL:hover {
	background: #cbd0d6;
}
/*搜索输入end*/
/*搜索帮助*/
.logSearchDetail-searchTips{
	font-size: 12px;
    font-weight: normal;
	width:calc(100% - 119px);
	position:absolute;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.3);
	background-color:#fff;
	height: auto;
	z-index: 5;
}
.logSearchDetail-searchTips:focus{
	outline:none;
}
/*搜索历史*/
.logSearchDetail-suggestion{
	width:100%;
	display:none;
}
.logSearchDetail-suggestion .sug-history{
	height:28px;
	line-height:28px;
	border-top:1px solid #f3f3f3;
	display:flex;
	justify-content:space-between;
	color:#e4e4e4;
}
.logSearchDetail-suggestion .sug-history a{
	color:#000;
	padding:0 20px;
}
.logSearchDetail-searchHistory{
	cursor: pointer;
	background-color: #fff;
	margin:0;
}
.logSearchDetail-searchHistory li{
	padding: 0 20px;
	height:30px;
	line-height:30px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.logSearchDetail-searchHistory li:hover{
	background-color: #eaeaea;
	border:1px solid #e2e2e4;
}
/*命令提示*/
.logSearchDetail-commandTip{
	width:100%;
	display:none;
	height: 330px;
}
.logSearchDetail-commandTip:focus{
	outline:none;
}
.logSearchDetail-commandTipList{
	margin: 0;
	height: 100%;
	overflow-y: auto;
}
.logSearchDetail-commandTipList li{
	padding: 0 20px;
	height:30px;
	line-height:30px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
.logSearchDetail-commandTipList li.active,
.logSearchDetail-commandTipList li:hover{
	background-color: #eaeaea;
	border:1px solid #e2e2e4;
}
.logSearchDetail-commandTip .commandExplanation{
	flex: none;
	width: 160px;
	padding: 10px;
	word-break: break-all;
	border-left: 1px solid #eee;
	display: none;
}
.logSearchDetail-commandTip .commandExplanation .lable{
	font-weight: bold;
}
.logSearchDetail-commandTip .commandExplanation .context{
	color: #878897;
	-webkit-user-select: text;
	-moz-user-select: text;
	-ms-user-select: text;
	-o-user-select: text;
	user-select: text;
}
/*预警模态框*/
.quickSearch-warningForm div.col-3{
	flex: none;
	width: calc(100% / 2);
}
.quickSearch-warningForm .unShow{
	display: none;
}
.quickSearch-warningForm *[readonly=readonly]{
	cursor: not-allowed;
	background-color: #eee;
}
.quickSearch-warningForm *[readonly=readonly]:focus{
	border: 1px solid #c7c6cd;
}
.range_inputs{
	text-align: right;
}

/*文件试图*/
.logSearchDetail-fileView .dataTables_filter{
	position: absolute;
    right: 130px;
    top: -51px;
}

.logSearchDetail-fileViewNav{
	padding: 0 20px;
    font-size: 12px;
    font-weight: normal;
    line-height: 36px;
    background-color: #fafafc;
    color: #636363;
    position: absolute;
    top: 2px;
    left: 80px;
	/*border-bottom: 1px solid #e0dfe6;*/
}
.logSearchDetail-fileViewNav span{
	cursor: pointer;
}
.logSearchDetail-fileViewNav span:hover{
	text-decoration: underline;
	color: var(--color-theme);
}
.logSearchDetail-fileViewNav span.active{
	cursor: default;
	color: #000;
}
.logSearchDetail-fileViewNav span.active:hover{
	color: #000;
	text-decoration: none;
}
.logSearchDetail-fileViewNav span+span:before{
	display: inline-block;
	content: '';
	width: 6px;
	height: 6px;
	border-top: 1px solid #636363;
	border-right: 1px solid #636363;
	-webkit-transform: rotate(45deg);
	   -moz-transform: rotate(45deg);
	    -ms-transform: rotate(45deg);
	     -o-transform: rotate(45deg);
	        transform: rotate(45deg);
	margin-right: 5px;
	margin-bottom: 1px;
}

.logSearchDetail-fileViewList{
	margin: 0;
	padding: 10px;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	overflow-y: auto;
}
.logSearchDetail-fileViewList>li.fileViewItem{
	display: inline-block;
	border: 1px solid transparent;
	height: 90px;
	width: 90px;
	margin: 5px;
	border-radius: 3px;
	color: #636363;
	padding: 10px 5px;
	cursor: pointer;
	font-size: 12px;
	font-weight: normal;
	text-align: center;
	overflow: hidden;
	position: relative;
}
.logSearchDetail-fileViewList>li.fileViewItem:not(.active):before{
	content: '';
	width: 0;
	height: 0;
	top: 0;
	left: -1px;
	display: block;
	border-top: 1px solid var(--color-theme);
	border-right: 1px solid var(--color-theme);
	position: absolute;
	z-index: 1;
}
.logSearchDetail-fileViewList>li.fileViewItem:not(.active):hover:before{
	content: '';
	width: 100%;
	height: 100%;
	border-radius: 3px;
	animation: border .15s linear 1;
}
.logSearchDetail-fileViewList>li.fileViewItem:not(.active):after{
	content: '';
    width: 0;
    height: 0;
    bottom: 0;
    right: -1px;
    display: block;
    position: absolute;
    z-index: 1;
    border-bottom: 1px solid var(--color-theme);
    border-left: 1px solid var(--color-theme);
}
.logSearchDetail-fileViewList>li.fileViewItem:not(.active):hover:after{
	content: '';
	width: 100%;
	height: 100%;
	border-radius: 3px;
	animation: border2 .3s linear 1;
}
@keyframes border{
	0%{
		width: 0;
		height: 0;
	}
	50%{
		width: 100%;
		height: 0;
	}
	100%{
		width: 100%;
		height: 100%;
	}

}
@keyframes border2{
	0%{
		width: 0;
		height: 0;
	}
	50%{
		width: 0;
		height: 0;
	}
	75%{
		width: 100%;
		height: 0;
	}
	100%{
		width: 100%;
		height: 100%;
	}
}

.logSearchDetail-fileViewList>li.fileViewItem.active{
	background: #e7f2fe;
	border: 1px solid transparent !important;
}

.logSearchDetail-fileViewList>li.fileViewItem.active .fileViewItemImg{
	color: #5c5a65;
}
.fileViewItem .fileViewItemImg{
	font-size: 50px;
    font-weight: normal;
    color: #e0dfe6;
}
.fileViewItem .fileViewItemName{
	white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/*日志上下文查看*/
.logContextDetail{
	width: 50vw;
	height: calc(100vh - 42px);
	position: fixed;
	top: 40px;
	right: 0;
	z-index: 2;
    background-color: #fff;
    box-shadow: -1px 1px 10px rgba(0,0,0,.3);
    transform: translateX(51vw);
	transition: all .5s;
	font-size: 12px;
	color: #636363;
}
.logContextDetail.active{
	transform: translateX(0);
	transition: all .5s;
}
.logContextDetail .title{
	margin: 0;
	height: 39px;
	line-height: 40px;
	font-size: 14px;
	font-weight: 700;
	background-color: #fafafc;
	border-bottom: 1px solid #ebebed;
	padding-left: 20px;
	color: #636363;
}
.logContextDetail-close{
	color: #bfbec5;
	font-size: 20px !important;
	font-weight: 200;
	float: right;
	margin-right: 20px;
	display: inline-block;
	width: 20px;
	height: 20px;
	line-height: 17px;
	border-radius: 5px;
	margin-top: 10px;
	text-align: center;
	cursor: pointer;
}
/*.logContextDetail-close:hover{
	background-color: #4494fd;
	color: #fff;
}*/
.logContextDetail .content{
	height: calc(100% - 40px);
	width: 100%;
}
.logContextDetail .content .logname{
	background: #ebedf5;
    height: 35px;
    line-height: 35px;
    padding: 0 10px;
    box-sizing: border-box;
}
.logContextDetail-list{
	margin: 0;
	max-height: calc(100% - 100px);
    overflow: auto;
}
.logContextDetail-list li{
	min-height: 30px;
	display: flex;
}
.logContextDetail-list li>span{
	display: inline-block;
	flex: 1;
	padding: 5px 10px;
	box-sizing: border-box;
}
.logContextDetail-list li>span:nth-child(1){
	flex: none;
	width: 80px;
}
.logContextDetail-list li>span:nth-child(2){
	flex: none;
	width: 40px;
}
.logContextDetail-list li>span:nth-child(3){
	flex: none;
	width: 200px;
}
.logContextDetail-list li>span:nth-child(4){
	word-break: break-all;
}
.logContextDetail-list li:nth-child(2n){
	background-color: #fafafc;
}
.logContextDetail-list li.active{
	background-color: #e7f1fd;
}
.loadUp,.loadDown{
	height: 30px;
	line-height: 30px;
	text-align: center;
	cursor: pointer;
	color: var(--color-theme);
}
.loadUp:hover,
.loadDown:hover{
	text-decoration: underline;
}
.loadUp.disabled,.loadDown.disabled{
	color: #eee;
	cursor: not-allowed;
	text-decoration: none;
}

.loadUp{
	border-bottom: 1px solid #ebebed;
}
.loadDown{
	border-top: 1px solid #ebebed;
}
.reStructDataModal-tableContent{
	display: flex;
	position: relative;
}
.reStructDataModal-tableContent>div{
	flex: none;
	width: 100%;
	max-height: 300px;
	overflow: auto;
}
.reStructDataModal-tableContent .selectRole{
	color: var(--color-theme);
	cursor: pointer;
	text-decoration: underline;
}

.reStructDataModal-tableContent i{
	cursor: pointer;
}
.reStructDataModal-tableContent i.selected{
	color: var(--color-theme);
}
table.reStructDataModal-table{
	width: 100% !important;
	flex: none;
	position: relative;
}

/*解析规则选择*/
.reStructDataModal-roleSelectContent{
	margin: 0;
	display: none;
	position: absolute;
    background: #fff;
    width: 400px;
    box-shadow: -2px 1px 10px rgba(0,0,0,.3);
    padding: 10px;
    right: 155px;
    top: 100px;
    margin-bottom: 5px;
}
.reStructDataModal-roleSelectContent:before{
	content: '';
	display: block;
	position: absolute;
	background-color: #fff;
	top: 50%;
	right: -6px;
	width: 10px;
	height: 10px;
	transform: rotate(45deg);
	border-right: 1px solid #e9e9e9;
	border-top: 1px solid #e9e9e9;
}
.reStructDataModal-roleSelectContent .roleSelectContent-close{
	opacity: 1;
	color: #bfbec5;
	font-size: 22px !important;
	font-weight: 100;
	text-shadow: none;
	position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
}
.reStructDataModal-roleSelectContent .roleSelectContent-close:hover{
	color: #000;
}
.reStructDataModal-roleSelectContent li>p{
	font-size: 14px;
	color: #5e619f;
}
.reStructDataModal-roleSelectContent .roleSelectItems{
	width: 100%;
	padding-left: 30px;
	word-wrap: break-word;
	color: #5c5a66;
	box-sizing: border-box;
}
.reStructDataModal-roleSelectContent .role{
	padding: 5px;
	line-height: 30px;
	cursor: pointer;
}

.reStructDataModal-roleSelectContent .role.active{
	background-color: #e1e2f0;
}
/*发送邮件*/
.quickSearch-sendEmailModal .form-horizontal .control-label{
	width: 4em;
}
.quickSearch-sendEmailModal .form-horizontal .controls{
	margin-left: 70px;
}
.quickSearch-sendEmailModal .showList{
	position: absolute;
	top: 0;
	right: 0;
	padding: 6px;
	color: #c7c6cd;
	cursor: pointer;
}
.quickSearch-sendEmailModal .userList.active{
	display: block;
}

.quickSearch-sendEmailModal .userList{
	position: absolute;
	margin: 0;
	width: 100%;
	box-sizing: border-box;
	background: #fff;
	box-shadow: 0px 4px 10px rgba(0,0,0,.3);
	padding: 10px;
	border-radius: 0 0 5px 5px;
	display: none;
	z-index: 1;
	max-height: 200px;
	overflow: auto;
}

.quickSearch-sendEmailModal .userList>li{
	display: flex;
	cursor: pointer;
	height: 32px;
	line-height: 32px;
	border-bottom: 1px dashed #eee;
}
.quickSearch-sendEmailModal .userList>li.selected{
	background-color: #ebedf5;
}
.quickSearch-sendEmailModal .userList>li>span{
	flex: 1;
	padding: 0 10px;
	box-sizing: border-box;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
/*兼容性问题*/
.logSearchDetail-container #normalSearch>div,
.logSearchDetail-container #sqlSearch>div{
	height: 100%;
	width: 100%;
}

.logSearchDetail-searchBtn.disabled {
    opacity: .3;
}

#logTable_paginate>span{
	display: none !important; 
}

.logSearchDetail-logInfo #modalShow {
    float: right;
    margin-top: 10px;
    margin-right: 10px;
    color: var(--color-theme);
    cursor: pointer;
    width: 16px;
    text-align: center;
    border: solid 1px var(--color-theme);
}

/* 右侧划窗 */
.queryTrade-view {
    position: absolute;
    background-color: #FFF;
    width: 60vw;
    right: 0;
    top: 0;
    bottom: 0px;
    z-index: 10;
    box-shadow: -3px 0px 10px rgba(0,0,0,0.4);
    /*padding: 15px;*/
    animation: showView 0.5s;
  }
  .queryTrade-mask {
	position: absolute;
    left: -40vw;
    width: 40vw;
	z-index: 10;
    height: 100%;
    background: rgba(0,0,0,.5);
  }
  @keyframes showView {
  	0%{
  		transform: translateX(100%);
  	}
  	100%{
  		transform: translateX(0%);	
  	}
  }
  .queryTrade-view-close {
  	position: absolute;
    right: 0;
    top: 0;
    color: #808080;
    width: 37px;
    height: 37px;
    background: #eee;
    text-align: center;
    line-height: 37px;
    font-size: 20px;
    cursor: pointer;
  }
  /* 右侧划窗 end
   */
</style>
<div class="logSearchDetail-container">
	<div class="logSearchDetail-left move">
		<!-- <p>快捷检索<i class="fa fa-chevron-right" id="leftHide"></i></p> -->
		<p class="logSearchDetail-title">快速查询<i id="quickSearchHide" class="fa fa-chevron-right" title="展开"></i></p>
		<div class="logSearchDetail-quickSearchContent">
			<a href="#" id="addQuickSearch" style="display: none">无快速查询，新建一个？</a>
			<div style="display: none">
				<div id="quickSearchs">
					<!-- <span><i class="fa fa-search"></i>统一支付对账日志查询</span> -->
				</div>
				<div>
					<a href="#" id="upQuickPage" data-val="1" class="disabled">< 上一批</a>
					<a href="#" id="downQuickPage" data-val="2">下一批 ></a>
				</div>
			</div>
		</div>
		<p class="logSearchDetail-title">快速筛选</p>
		<div id="quickChooseContent" class="logSearchDetail-quickChooseContent">
			<!-- <div>
				<p><i class="fa fa-chevron-down"></i>所属应用</p>
				<div>
					<span>统一支付平台</span>
					<span>统一支付平台</span>
					<span>统一支付平台</span>
				</div>
			</div>
			<div>
				<p><i class="fa fa-chevron-down"></i>所属应用</p>
				<div>
					<span>统一支付平台</span>
					<span>统一支付平台</span>
					<span>统一支付平台</span>
					<span>统一支付平台</span>
				</div>
			</div>
			<div>
				<p><i class="fa fa-chevron-down"></i>所属应用</p>
				<div>
					<span>统一支付平台</span>
				</div>
			</div> -->
		</div>
	</div>
	<div class="logSearchDetail-right">
		<div class="logSearchDetail-top">
			<div class="logSearchDetail-searchGroup">
				<div id="logSetting" class="logSearchDetail-accessLogContent">
					<span id="accessLog" data-val="1">可访问日志<i class="fa fa-sort-down"></i></span>
					<ul id="accessLogUl">
						<li>应用系统<i class="fa fa-chevron-right"></i></li>
						<li>资产对象<i class="fa fa-chevron-right"></i></li>
					</ul>
					<div id="appSystem">
					</div>
					<div id="assetObject">
					</div>
				</div>
				<div id='dateSetectWarp' class="logSearchDetail-dateRangeChoose">
					<input type="text" id="dateSetectInput" style="display: none;">
					<span id="dateSetect"></span>
					<div id='dateSetectContent' class="logSearchDetail-dateRangeChooseContent">
						<ul id="dateRangeTab" class="nav nav-tabs nav-underLine">
							<li class="active" style="width: 88px;"><a href="#tabsDate1" data-toggle="tab">快速选择</a></li>
							<li><a href="#tabsDate2" data-toggle="tab">自定义</a></li>
						</ul>
						<div class="tab-content">
							<div id="tabsDate1" class="tab-pane active" style="padding-bottom: 0;">
								<ul id="quickRange" class="logSearchDetail-quickRangeSelect">
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
						<div class="logSearchDetail-dateRangeChooseBtn"><button type="button" id="dataRangeSetectBtn" class="confirmBtn">确定</button></div>
					</div>
				</div>
				<div style="flex: auto;position: relative;border-left: none;">
					<div id="searchInput" contenteditable="plaintext-only" style="" class="logSearchDetail-searchInput" tabindex="1-1">*</div>
					<span id="createSQL" title="收藏"><i class="fa fa-star-o"></i></span>
					<div class="logSearchDetail-searchTips" tabindex="-3">
						<div class="logSearchDetail-suggestion">
							<ul id="logSearch_searchHistory" class="logSearchDetail-searchHistory">
							</ul>
							<div class="sug-history">
								<a href="javascript:void(0)" id="clear-history">清空历史</a>
								<a href="javascript:void(0)" id="close-history">关闭</a>
							</div>
						</div>
						<div class="logSearchDetail-commandTip" tabindex="-4">
							<div style="display: flex;height: 100%;width: 100%;">
								<div style="flex: 1;">
									<ul id="commandTipList" class="logSearchDetail-commandTipList">
									</ul>
								</div>
								<div class="commandExplanation">
									<!-- <p class="lable">avg</p>
									<p class="context">avg(x):返回字段X的平均值</p>
									<p class="lable">示例</p>
									<p class="context">以下示例返回交易平均耗时：* | chart avg(duration)</p> -->
								</div>
							</div>
						</div>
					</div>
				</div>
				<span class="logSearchDetail-searchBtn searchBtn-first" id="searchBtn"><span>搜索</span></span>
			</div>
			<div class="logSearchDetail-saveGroup">
				<span data-before="共找到" data-after="个日志事件" id="logCount">-</span>
				<div>
					<!-- <span id="dataService">数据转发</span>-->
					<span id="saveAsWarn">另存为预警</span>
					<div class="logSearchDetail-viewChange">
						<i class="fa fa-reorder active"></i><i class="fa fa-file-o"></i>
					</div>
				</div>
			</div>
		</div>
		
		<div style="height: calc(100% - 89px); overflow: hidden;">
			<div class="logSearchDetail-echartsContent">
				<div id="logEchartsLable" class="logSearchDetail-echartsLable">
					<span class="active" data="start">时间分布</span>
					<span data="_head_.hostip">主机分布</span>
					<span data="_head_.appid">应用分布</span>
				</div>
				<div style="flex: auto;padding:10px 10px 10px 0;height: 100%;">
					<div class="logSearchDetail-echarts" id="logEcharts"></div>
				</div>
			</div>
			<div class="logSearchDetail-logInfo noData" style="position: relative;">
				<div view-role="tableView" style="height: 100%;">
					<ul class="nav nav-tabs nav-public">
						<li class="active"><a href="#tabs11" data-toggle="tab">日志</a></li>
						<li data-id="sourceNoKeyWord"><a href="#tabs22" data-toggle="tab">统计</a></li>
						<i class="fa fa-chevron-up logSearchDetail-echartsHide" id="echartsHide"></i>
						<i class="fa fa-expand" id="modalShow" data-id="0" title="切换至普通模式"></i>
					</ul>
					<div class="tab-content" style="overflow-y: hidden;">
						<div id="tabs11" class="tab-pane active" style="padding: 0;height: 100%">
							<div class="logSearchDetail-logContent">
								<div style="height: 100%;" id="fieldContentFyc" class="move">
									<div class="logSearchDetail-logField">
										<p>已选字段</p>
										<div class="logSearchDetail-logChoosed" id="logChoosed">
											<span><span>D</span><span>_head_.logtime</span></span>
											<!-- <span><span>G</span><span>_时间  _logtime</span><span class="close">&times;</span></span>
											<span><span>G</span><span>_时间  _logtime</span><span class="close">&times;</span></span> -->
										</div>
										<p>可用字段</p>
										<div class="logSearchDetail-logUsed" id="logUsed"></div>
									</div>
								</div>
								<div id="logTableWarp" style="flex: 1;overflow: auto;height: 100%;">
									<table id="logTable" style="table-layout: fixed;width: 100%;height:100%;position: relative;" class="logSearchDetail-logTable">
										<thead>
											<tr>
												<th style="min-width: 80px"><i id="logTabHide" class="fa fa-chevron-left hide" style="color: var(--color-theme);margin: 7px 10px 0 -8px;cursor: pointer;"></i>序号</th>
												<th  style="min-width: 120px"></th>
												<th style="min-width: 90px">时间</th>
												<th style="min-width: 600px">内容</th>
											</tr>
										</thead>
										<tbody></tbody>
									</table>
									<!-- <span class="jumpPage" style="font-size: 12px;position: absolute;bottom: 5px;margin-left: 10px;">跳转到 <input id="toPage" type="text" style="margin: 0;width: 50px;" /> 页</span> -->
									<!-- <div class="searchTool"></div> -->
									<div id="content-menu">
									  <ul class="dropdown-menu" role="menu">
									    <li>
									      <a tabindex="-1" href="#" id="runSql">SQL执行</a>
									     <!--  <a tabindex="-1" href="#" id="copySelect">复制到剪贴板</a> -->
									    </li>
									  </ul>
									</div>
								</div>
							</div>
						</div>
						<div id="tabs22" class="tab-pane"  style="padding: 0; height: 100%; overflow: auto;">
							<div id="sqlSearch" style="display: none;height: 100%;">
							</div>
							<div id="normalSearch" style="display: none;height: 100%;display: flex;width: 100%;">
							</div>
						</div>
					</div>
				</div>
				<div view-role="fileView" style="height: 100%;display: none;">
					<!-- 文件视图  -->
					<section class="panel logSearchDetail-fileView" style="border: none;height: 100%;">
						<p class="title">文件列表 
							<span class="fileViewType pull-right">
								<i class="fa fa-list active" title="列表"></i><i class="fa fa-th-large" title="图标"></i>
							</span></p>
						<div class="content" style="height: calc(100% - 37px);">
							<div class="fileTableView">
								<table id="fileTable" class="display dataTable table" style="table-layout: fixed;">
									<thead>
										<th style="width: 61px;">序号</th>
										<th style="width: 120px;">主机</th>
										<th style="width: 120px;">时间</th>
										<th>文件路径</th>
										<th style="width: 120px;">文件大小</th>
										<th style="width: 160px;">最后修改时间</th>
									</thead>
								</table>
							</div>
							<div class="filePictureView" style="display: none;height: 100%;">
								<div id="fileViewNav" class="logSearchDetail-fileViewNav">
									<span>全部</span><span class="active">文件</span>
								</div>
								<ul id="fileViewList" class="logSearchDetail-fileViewList">
									<!-- <li class="fileViewItem" title="10.9.2.3">
										<div class="fileViewItemImg"><i class="fa fa-folder-open-o"></i></div>
										<div class="fileViewItemName">10.9.2.3</div>
									</li>
									<li class="fileViewItem" title="home">
										<div class="fileViewItemImg"><i class="fa fa-folder-open-o"></i></div>
										<div class="fileViewItemName">home</div>
									</li>
									<li class="fileViewItem" title="cmdb">
										<div class="fa fa-television fileViewItemImg"><i class="fa fa-folder-o"></i></div>
										<div class="fileViewItemName">cmdb</div>
									</li> -->
								</ul>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 快速检索模态框 -->
<div id="quickSearchModal" class="modal hide fade quickSearch-modal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px;">
	<div class="modal-header" style="">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">新增快速搜索</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal">
			<div class="control-group">
				<label for="input1" class="control-label">操作类型</label>
				<div class="controls">
					<select name="" id="addOrCover">
						<option value="1">新建快速搜索</option>
						<option value="2">覆盖原有快速查询</option>
					</select>
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label required">快速搜索名称</label>
				<div class="controls">
					<input type="text" id="searchName" placeholder="输入名称" />
				</div>
			</div>
			<div class="control-group hide">
				<label for="input1" class="control-label">快速搜索名称</label>
				<div class="controls">
					<select name="" id="searchNameList"></select>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">快速搜索条件</label>
				<div class="controls">
					<textarea name="" id="searchArea" cols="30" rows="5" disabled></textarea>
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label">时间筛选</label>
				<div class="controls">
					<label for="timeTypeAuto" class="radio inline"><input type="radio" name="timeType" value="0" id='timeTypeAuto'/>自动匹配</label>
					<label for="timeTypeFixed" class="radio inline"><input type="radio" name="timeType" value="1" id='timeTypeFixed'/>固定值</label>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>

<!-- 预警模态框 -->
<div id="warningModal" class="modal hide fade quickSearch-modal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>预警</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal quickSearch-warningForm">
			<div class="control-group">
				<label for="searchName" class="control-label required">预警名称</label>
				<div class="controls">
					<input type="text" name="name" placeholder="输入名称" />
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label required">搜索条件</label>
				<div class="controls">
					<input type="text" name="search" id="search" disabled/>
				</div>
			</div>

			<div class="control-group">
				<label for="input1" class="control-label">触发条件</label>
				<div class="controls">
					<select name="conditions">
						<option value="1">结果数</option>
						<option value="2">主机数</option>
						<option value="3">应用数</option>
						<option value="4">日志源数</option>
						<option value="5" data-type="noSqlSearch">自定义</option>
						<option value="6" data-type="sqlSearch">自定义</option>
					</select>
				</div>
			</div>
			<div id="conditionsNormal" style="display: flex">
				<div class="control-group col-3">
					<div class="controls">
						<select name="compare">
							<option value="gt">大于</option>
							<option value="lt">小于</option>
							<option value="eq">小于</option>
							<option value="gte">大于等于</option>
							<option value="lte">小于等于</option>
						</select>
					</div>
				</div>
				<div class="control-group col-3">
					<div class="controls">
						<input type="text" name="result" placeholder="阈值">
					</div>
				</div>
			</div>

			<div class="control-group unShow" id="conditionsUser">
				<div class="controls">
					<input type="text" placeholder="触发条件, 例：count(*) > 100">
				</div>
			</div>

			
			<div class="control-group col-3">
				<label for="input1" class="control-label">预警范围</label>
				<div class="controls">
					<select name="timeInterval">
						<option value="1">当天</option>
						<option value="2">本周</option>
						<option value="3">本月</option>
						<option value="4">本年</option>
						<option value="13">1分钟</option>
						<option value="5">1小时</option>
						<option value="6">12小时</option>
						<option value="7">1天</option>
						<option value="8">1周</option>
						<option value="9">半月</option>
						<option value="10">1月</option>
						<option value="11">3月</option>
						<option value="12">全部时间</option>
					</select>
				</div>
			</div>
			<div style="display: flex">
				<div class="control-group col-3">
					<label for="input1" class="control-label">开启预警</label>
					<div class="controls">
						<span class="boolean-switch false" id="isOpen"></span>
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label">预警类型</label>
					<div class="controls">
						<select name="planType">
							<option value="1">计划</option>
							<option value="2">定时</option>
						</select>
					</div>
				</div>
			</div>
			<div id="planCondition">
				<div style="display: flex;">
					<div class="control-group col-3">
						<label for="input1" class="control-label">计划类型</label>
						<div class="controls">
							<select name="scheduleType">
								<option value="1">每小时</option>
								<option value="2">每天</option>
								<option value="3">每周</option>
								<option value="4">每月</option>
							</select>
						</div>
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
					<div id="day" class="control-group col-3 unShow">
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
					<div id="date" class="control-group col-3 unShow">
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
					<div id="time" class="control-group col-3 unShow">
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
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label">报警类型</label>
					<div class="controls">
						<select name="warnType">
							<option value="1">短信</option>
							<option value="2">邮件</option>
						</select>
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label">事件等级</label>
					<div class="controls">
						<select name="level">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>
					</div>
				</div>
			</div>
			
			<div style="display: flex;">
				<div class="control-group col-3">
					<label class="control-label">描述模版</label>
					<div class="controls">
						<select id="modelSelect">
							<option value="">自定义</option>
						</select>
					</div>
				</div>
			</div>

			<div class="control-group">
				<label for="input1" class="control-label">模版详情</label>
				<div class="controls">
					<textarea name="eventModel" style="resize: none; height: 100px;"></textarea>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>
<!-- 日志上下文 -->
<div id="showLogContext" class="logContextDetail">
	<p class="title">日志上下文 <span class="logContextDetail-close">x</span></p>
	<div class="content other-content">
		<div class="logname" style="height: auto;"><span>日志文件名称: </span><span id="logPath"></span></div>
		<div class="loadUp">加载前20行日志信息 <i class='fa fa-angle-double-up'></i></div>
		<ul id="logContextDetailList" class="logContextDetail-list">
			<!-- <li><span>-1</span><span><i class="fa fa-circle" style="color:gray;"></i></span><span>2018.06.22</span><span>wewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadaswewqwqqewqqdsdsdaaadas</span></li>
			<li><span>0</span><span><i class="fa fa-star" style="color:red;"></i></span><span>2018.06.22</span><span>wewqwqqewqqdsdsdaaadas</span></li>
			<li class="active"><span>1</span><span><i class="fa fa-circle" style="color:green;"></i></span><span>2018.06.22</span><span>wewqwqqewqqdsdsdaaadas</span></li> -->
		</ul>
		<div class="loadDown">加载后20行日志信息 <i class='fa fa-angle-double-down'></i></div>
	</div>
</div>
<!-- 二次结构化 -->
<div id="reStructDataModal" class="modal hide fade quickSearch-modal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 1000px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>日志数据重新格式化</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal quickSearch-warningForm">
			<div class="control-group">
				<label class="control-label">数据描述</label>
				<div class="controls">
					<input name="taskDesc" type="text">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">数据检索条件</label>
				<div class="controls">
					<input name="taskCond" id="reStruct-search" type="text" disabled>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label">起始时间</label>
					<div class="controls">
						<input name="startTime" id="reStruct-startTime" type="text" disabled>
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label">截止时间</label>
					<div class="controls">
						<input name="endTime" id="reStruct-endTime" type="text" disabled>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label">结构化数据选择</label>
				<div class="controls reStructDataModal-tableContent">
					<table id="logSourceTable" class="display dataTable table reStructDataModal-table" style="table-layout: fixed;">
						<thead>
							<th style="width: 41px;"><i id="selectAll" class="fa fa-square-o"></i></th>
							<th style="width: 60px;">数据源ID</th>
							<th style="width: 80px;">数据源名称</th>
							<th style="width: 80px;">应用系统名称</th>
							<th style="width: 80px;">三级分类</th>
							<th style="width: 60px;">日志大小</th>
							<th style="width: 80px;">解析规则设置</th>
						</thead>
					</table>
					<ul class="reStructDataModal-roleSelectContent"> 
					<div id="roleSelectContent" style="max-height: 260px;overflow: auto;" >
						<li>
							<p>广发银行</p>
							<div class="roleSelectItems">
								<span class="role">lyyceshi</span><span class="role">陕西信合AFA4J日志采集</span>
							</div>
						</li>
					</div>
					</ul>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label">待解析日志总量</label>
					<div class="controls">
						<input name="dataSize" type="text" disabled>
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label">预计排队</label>
					<div class="controls">
						<input id="taskNo" type="text" disabled>
					</div>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" class="cancelBtn taskBtn">任务管理</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">退出</button>
		<button type="button" class="confirmBtn">提交</button>
	</div>
</div>
<!-- 数据转发 -->
<div id="dataServiceModal" class="modal hide fade quickSearch-modal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 1000px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>日志数据转发定义</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal quickSearch-warningForm">
			<div class="control-group">
				<label class="control-label required">数据描述</label>
				<div class="controls">
					<input name="dataDesc" id="ds_dataDesc" type="text">
				</div>
			</div>
			<div class="control-group">
				<label class="control-label required">数据检索条件</label>
				<div class="controls">
					<input name="search" type="text" readonly="readonly">
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label required">数据时间范围</label>
					<div class="controls">
						<select name="timeType">
							<option value="0">所有时间</option>
							<option value="1">条件选定时间</option>
							<option value="2">条件选定起始时间</option>
							<option value="3">条件选定截止时间</option>
						</select>
					</div>
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label required">结构化数据选择</label>
				<div class="controls reStructDataModal-tableContent">
					<table id="dataService_logSourceTable" class="display dataTable table reStructDataModal-table" style="table-layout: fixed;">
						<thead>
							<th style="width: 41px;"><i id="selectAll" class="fa fa-square-o"></i></th>
							<th style="width: 60px;">数据源ID</th>
							<th style="width: 80px;">数据源名称</th>
							<th style="width: 80px;">应用系统名称</th>
							<th style="width: 80px;">三级分类</th>
							<th style="width: 60px;">日志大小</th>
						</thead>
					</table>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label required">待转发数据总量</label>
					<div class="controls">
						<input name="forwardSize" type="text" readonly="readonly">
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label required">是否包含结构化</label>
					<div class="controls">
						<input data-name="includeStruct" type="checkbox" value="1" style="width: auto;margin: 0 10px;" checked>源文件
						<input data-name="includeStruct" type="checkbox" value="2" style="width: auto;margin: 0 10px;" checked>结构化
					</div>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label required">转发方式</label>
					<div class="controls">
						<select name="forwardType">
							<option value="1">kafka消息队列</option>
						</select>
					</div>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label required">消息队列名称</label>
					<div class="controls">
						<input type="text" name="topicName" id="ds_topicName">
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label required">数据存留周期</label>
					<div class="controls">
						<input type="number" name="retentionDays" id="ds_retentionDays" min="0" max="7" placeholder="天：最长7天">
					</div>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label required">kafka对接地址</label>
					<div class="controls">
						<input type="text" name="address" id="ds_address">
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label required">kafka对接端口</label>
					<div class="controls">
						<input type="text" name="port" id="ds_port">
					</div>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" class="cancelBtn taskBtn">任务管理</button>
		<button type="button" data-dismiss="modal" class="cancelBtn">退出</button>
		<button type="button" class="confirmBtn">提交</button>
	</div>
</div>

<!-- 发送邮件 -->
<!-- 快速检索模态框 -->
<div id="sendEmailModal" class="modal hide fade quickSearch-modal quickSearch-sendEmailModal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>邮件</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal">
			<div class="control-group">
				<label for="input1" class="control-label required">收件人</label>
				<div class="controls" style="position: relative;">
					<input type="text" name="receive" placeholder="多个用户;分隔" autocomplete="off" />
					<i class="fa fa-chevron-down showList"></i>
					<ul class="userList"></ul>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">抄送人</label>
				<div class="controls" style="position: relative;">
					<input type="text" name="cc" placeholder="多个用户;分隔" autocomplete="off"/>
					<i class="fa fa-chevron-down showList"></i>
					<ul class="userList"></ul>
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">主题</label>
				<div class="controls">
					<input type="text" placeholder="" name="subject" />
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">附件</label>
				<div class="controls">
					<input type="checkbox" name="attach" style="width: auto; margin: 0;margin-right: 10px;" value="true" />日志原文
				</div>
			</div>
			<div class="control-group">
				<label class="control-label">正文</label>
				<div class="controls">
					<textarea name="content" style="resize: none; height: 200px;"></textarea>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">发送</button>
	</div>
</div>

<div class="queryTrade-view hide">
	<div class="queryTrade-mask"></div>
	<i class="fa fa-times queryTrade-view-close"></i>
	<div style="height: 100%;">
		<ul class="nav nav-tabs nav-underLine">
			<li data-path="log"  class="active"><a>日志原文</a></li>
			<li data-path="fields"><a>结构化字段</a></li>
			<li data-path="link"><a>交易链路</a></li>
		</ul>
		<div class="tab-content" id="rightDetailsView" style="padding: 15px;height: calc(100% - 68px);"></div>
	</div>
</div>