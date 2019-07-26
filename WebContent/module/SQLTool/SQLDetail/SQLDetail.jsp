<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.sql-detail-page input,
.sql-detail-page select,
.sql-detail-page ul,
.sql-detail-page p {
	margin: 0!important;
}
.flex {
	display: flex;
}
.inline-flex {
	display: inline-flex;
}
.jc-sb {
	justify-content: space-between;
}
.jc-c {
	justify-content: center;
}
.ai-c {
	align-items: center;
}
.sql-detail-page {
    height: calc(100vh - 80px);
    background: #F0F2F5;
    padding: 20px;
}
.sql-detail-wrap {
	height: 100%;
    box-sizing: border-box;
}
.sql-detail-wrap>div {
	background: #fff;
   	box-sizing: border-box;
}
.sql-detail-left {
	flex: none;
	width: 61.8%;
    height: 100%;
    margin-right: 20px;
    overflow: hidden auto;
}
.sql-detail-right {
	flex: none;
	width: calc(100% - 61.8% - 20px);
}
.sql-detail-top {
	height: 70px;
	border-bottom: 1px solid rgba(199, 198, 203, 1);
	box-sizing: border-box;
}
.sql-detail-bottom {
	height: calc(100% - 70px);
	background: rgba(236, 235, 239, 1);
}
.sql-detail-top>div,
.sql-detail-bottom>div {
	width: 50%;
	background: #fff;
}
.sql-detail-bottom>div {
	padding: 20px 20px 0;
}
.sql-detail-bottom .sql-detail-bottom-left {
	position: relative;
	margin-right: 20px;
}
.sql-title-wrap {
    padding: 20px 20px 20px 80px;
    background: url(img/sqlTool/sqlTitle.png) no-repeat;
    background-position: 20px 50%;
}
.sql-title-wrap .sql-title-top {
    line-height: 26px;
}
.sql-title-wrap .sql-name {
    font-weight: 600;
    margin-right: 5px;
}
.sql-title-right {
    color: #596080;
}
.sql-title-wrap .sql-score {
	color: #FFA54C;
}
.sql-title-bottom>span {
    padding: 1px 10px;
    background: #F7F8FA;
    border: solid 1px #F0F1F5;
    border-radius: 2px;
    font-size: 12px;
    color: #646888;
    margin-right: 4px;
}
.sql-title-bottom>span .i-delete {
	display: none;
}
/* 左上 */
.sql-detail-top-left {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    color: #222329;
    box-sizing: border-box;
	border-bottom: solid 1px #ECF0F4;
}
.sql-detail-top-left .edit-btn {
	width: 80px;
    height: 32px;
    border-radius: 3px;
    background-color: rgba(249, 249, 251, 1);
    border: 1px solid rgba(199, 198, 203, 1);
}
/* 左上 */

/* 右上 */
.sql-detail-top-right {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    border-bottom: solid 1px #ECF0F4;
}
.sql-detail-top-right .operates {
    height: 100%;
    line-height: 50px;	
}
.sql-detail-top-right .operates>span {
    width: 70px;
    text-align: center;
    font-size: 16px;
    color: #596080;
    cursor: pointer;
}
.sql-detail-top-right .operates>span.active {
    color: rgba(51, 168, 255, 1);
    border-bottom: solid 2px rgba(51, 168, 255, 1);
}
.tool-bar>span {
	width: 30px;
	height: 30px;
    text-align: center;
    cursor: pointer;
    line-height: 30px;
    left: 1391px;
    color: rgb(151, 152, 158);
    font-size: 16px;
}
.tool-bar>span:hover {
	color: rgba(51, 168, 255, 1);
}
/* 右上 */

/* 左下 */
.sql-detail-bottom-left {
	height: calc(100% - 50px);
    overflow: hidden auto;
}
.edit-btns {
	position: relative;
	justify-content: flex-end;
}
.edit-btns>button {
	width: 80px;
	height: 32px;
	border-radius: 3px;
	background-color: rgba(249, 249, 251, 1);
	border: 1px solid rgba(199, 198, 203, 1);
}
.form-like.liked {
	color: #e44715;
}
.edit-btns>button.btn-confirm {
	background-color: rgba(255, 255, 255, 1);
	border: 1px solid rgba(85, 168, 253, 1);
	margin: 0 0 0 20px;
}
.edit-btns>span {
    width: 30px;
    line-height: 30px;
    margin-left: 2px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    color: #515e69;
}
.edit-btns>span:hover {
    color: #55a8fd;
    background: #eaf0f5;
}
.edit-btns>span>i {

}
.forms-wrap {
	padding: 0 20px;
}
.forms-wrap .form-item {
    align-items: flex-start;
    padding: 10px 0;
    border-top: solid 1px #ECF0F4;
}
.forms-wrap .form-item .form-item-icon {
	flex: none;
	display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    color: #B2B2B2;
    text-align: center;
    background-repeat: no-repeat;
    background-position: center;
    vertical-align: -9px;
}
.forms-wrap .sql-name .form-item-icon {
	background-image: url(img/sqlTool/sqlname.png);
}
.forms-wrap .sql-cate .form-item-icon {
	background-image: url(img/sqlTool/sqlcate.png);	
}
.forms-wrap .sql-content .form-item-icon {
	background-image: url(img/sqlTool/sqlcontent.png);
}
.forms-wrap .sql-desc .form-item-icon {
	background-image: url(img/sqlTool/sqldesc.png);
}
.forms-wrap .add-file .form-item-icon {
	background-image: url(img/sqlTool/file.png);
}
.forms-wrap .sql-content pre {
	box-shadow: none!important;
}
.forms-wrap .sql-content .CodeMirror {
    border: solid 1px rgba(199, 198, 203, 1);
}
.forms-wrap .form-item .form-item-name {
	flex: none;
	display: inline-block;
    width: 59px;
    height: 30px;
    line-height: 30px;
    color: rgba(178, 178, 178, 1);
    font-size: 14px;
    text-align: left;
    font-family: HiraginoSansGB-W6;
}
/* .forms-wrap .form-item .sql-cate-item-add {
	width: 60px;
} */
.forms-wrap .form-item .form-item-text,
.forms-wrap .form-item .form-item-cates {
	flex: auto;
    line-height: 30px;
    padding-left: 7px;
}
.forms-wrap .form-item .form-item-cates {
    max-height: 150px;
    overflow: hidden auto;
    padding: 5px 0;
    margin-top: -5px!important;
    font-size: 0;
}
.forms-wrap .sql-cate .sql-cate-item {
    position: relative;
    display: inline-block;
    padding: 0 8px;
    line-height: 28px;
    text-align: center;
    background-color: rgb(238, 242, 245);
    border: solid 1px #e2dfdf;
    box-sizing: border-box;
    border-radius: 2px;
    margin: 0 10px 4px 0;
    color: rgba(93, 90, 102, 1);
    font-size: 12px;
    font-family: HiraginoSansGB-W6;
    cursor: default;
}
.forms-wrap .sql-cate .sql-cate-item .i-delete {
    position: absolute;
    right: -6px;
    top: -5px;
    width: 14px;
    height: 14px;
    text-align: center;
    line-height: 13px;
    border-radius: 50%;
    background: #60abe6;
    color: #fff;
    cursor: pointer;
}
/* .forms-wrap .sql-cate .sql-cate-item.editable {
	cursor: pointer;
} */
.forms-wrap .add-btn {
	display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin-right: 5px;
    text-align: center;
    border-radius: 3px;
    box-sizing: border-box;
    vertical-align: -1px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(199, 198, 203, 1);
    color: rgba(94, 90, 103, 1);
    font-size: 14px;
    font-family: HiraginoSansGB-W6;
    cursor: pointer;
}
.forms-wrap .add-btn:hover {
    background: #4494fc;
    border-color: #4494fc;
    color: #fff;	
}
.forms-wrap .sql-cate .sql-cate-item i {
	transform: scale(.8);
}
.forms-wrap .form-item .form-item-value {
    flex: none;
    padding-left: 7px;
}
.forms-wrap .form-item .form-item-value>input,
.forms-wrap .form-item .form-item-value>textarea {
	width: 100%;
    color: rgba(94, 90, 103, 1);
    font-size: 14px;
    text-align: left;
    font-family: HiraginoSansGB-W6;
    border-color: rgba(199, 198, 203, 1);
}
.forms-wrap .form-item .form-item-value>input {
	height: 32px;
}
.forms-wrap .form-item .form-item-value>textarea {
	height: 150px;
	resize: none;
}
.forms-wrap .CodeMirror {
	height: 150px;
}
.forms-wrap .cm-s-default .cm-keyword {
    color: #2196F3;
}
.forms-wrap .form-item .form-item-file-download {
	flex: auto;
	line-height: 30px;
}
.forms-wrap .form-item .form-item-file-download>div {
    width: 100%;
    padding: 4px 10px;
    box-sizing: border-box;
    background: #F7F8FA;
    border: solid 1px #F0F1F5;
    border-radius: 2px;
    margin-bottom: 10px;
}
.forms-wrap .form-item .form-item-file-download a {
	color: #2593FC;
    font-size: 12px;
}
.forms-wrap .form-item .form-item-file {
	position: relative;
	line-height: 30px;
	margin-bottom: 5px;
	cursor: pointer;
}
#upload_input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.publish-btn {
    width: 100%;
    height: 24px;
    line-height: 24px;
    color: rgba(85, 168, 253, 1);
    font-size: 16px;
    text-align: right;
    font-family: HiraginoSansGB-W6;
    cursor: pointer;
}
.publish-btn i {
	margin-left: 5px;
}
/* 左下 */


/* 右下 */
.sql-detail-bottom-right {
    height: calc(100% - 90px);
    padding: 20px 20px 0 20px;
}
.trends-wrap {
	height: 100%;
}
.score-box .score-wrap {
    position: absolute;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
    padding: 10px;
    margin-top: 24px;
    background: #fcfeff;
    border: solid 1px rgba(199, 198, 203, 1);
    z-index: 11;
    transform: translatex(-50%);
}
.score-box .score-wrap:before {
    content: '';
    display: block;
    position: absolute;
    top: -6px;
    left: 50%;
    width: 10px;
    height: 10px;
    border: solid 1px rgba(199, 198, 203, 1);
    border-right: none;
    border-bottom: none;
    background: #fcfeff;
    transform: translateX(-50%) rotate(45deg);
}
.score-box .score-wrap button {

}
.trends-wrap .user-info {
    align-items: center;
    height: 70px;
    border-bottom: 1px dashed rgba(199, 198, 203, 1);
    padding: 0 0 20px 0;
}
.trends-wrap .user-info .user-img {
    width: 100px;
    height: 100%;
    font-size: 80px;
    color: #3F51B5;
}
.trends-wrap .user-info .info-text {
	width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 10px;
}
.trends-wrap .user-info .info-text>div {
	width: 100%;
}
.trends-wrap .user-info .info-text>div:nth-child(1) {
    flex: none;
    width: 100%;
    height: 80px;
}
.trends-wrap .user-info .info-text>div:nth-child(1)>div {
	flex-direction: column;
}
.trends-wrap .user-info .info-text-left {
	width: 100px;
}
.trends-wrap .user-info .info-text>p {
    color: rgba(56, 56, 56, 1);
    font-size: 14px;
    text-align: left;
    font-family: HiraginoSansGB-W6;
}
.trends-wrap .user-info .info-text>p:nth-child(1) {
	font-weight: 600;
	font-size: 16px;
}
.trends-wrap .user-info .info-text>p:nth-child(2) {

}
.trends-wrap .user-info .info-text-bottom {
	margin-top: 10px;
}
.score-box .stars-wrap {
    width: 100px;
    justify-content: space-between;
    margin-bottom: 10px;
    color: rgba(247, 181, 0, 1);
    cursor: pointer;
}
.score-box .stars-btns {
	width: 100px;
}
.trends-wrap .all-trends {
    padding: 20px 0;
    height: calc(100% - 131px);
}
.trends-wrap .trends-list {
    height: calc(100% - 30px);
    overflow: hidden auto;	
}
.select-wrap {
    position: relative;
    margin-bottom: 10px;
}
.select-wrap>span {
	user-select: none;
	cursor: pointer;
}
.select-wrap>span i {
	margin-left: 4px;
}
.select-wrap ul {
	position: absolute;
    background: #fff;
    width: 70px;
    border: solid 1px #dcdcdc;
    text-align: center;
    box-shadow: 0 0 33px 2px #f3f3f3;
}
.select-wrap ul>li {
    line-height: 28px;
}
.select-wrap ul>li:hover {
    background: #dbeeff;
    color: #33a8ff;
}
.trends-item {
	margin-bottom: 20px;
	padding: 0 5px 0 0;
}
.trends-title {
    height: 24px;
    line-height: 24px;
    color: rgba(199, 198, 203, 1);
    font-size: 12px;
    text-align: left;
    font-family: HiraginoSansGB-W6;
}
.trends-type {
    width: 24px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50%;
    margin-right: 5px;
}
.trends-type.add {
	background-image: url(img/sqlTool/add.png);
}
.trends-type.change {
	background-image: url(img/sqlTool/change.png);
}
.trends-type.focus {
	background-image: url(img/sqlTool/focus.png);
}
.trends-type.share {
	background-image: url(img/sqlTool/share.png);
}
.trends-type.discuss {
	background-image: url(img/sqlTool/discuss.png);
}
pre.trends-content {
	border: none;
	box-shadow: none;
	background: none;
}
p.trends-content,
pre.trends-content {
	text-indent: 23px;
    line-height: 24px;
    color: rgba(92, 90, 102, 1);
    font-size: 12px;
    text-align: left;
    font-family: HiraginoSansGB-W6;
    border-left: solid 4px rgba(178, 178, 178, 1);
    margin: 0 0 0 30px!important;
}

/* 讨论 */
.discuss-wrap {
	height: 100%;
	flex-direction: column;
}
.discuss-wrap .part-people {
    flex: auto;
    max-height: 200px;
}
.discuss-wrap .part-people>p {
    height: 44px;
    line-height: 40px;
    color: rgba(92, 90, 102, 1);
    text-align: left;
    font-family: HiraginoSansGB-W6;
    font-weight: 600;
}
.discuss-wrap .part-people-wrap {
    flex-wrap: wrap;
    max-height: calc(100% - 44px);
    overflow: hidden auto;
}
.discuss-wrap .part-people-wrap>div {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    text-align: center;
    line-height: 60px;
    background: rgba(247, 181, 0, 1);
    border: 1px solid rgba(247, 181, 0, 1);
    margin: 0 10px 10px 0;
    color: #fff;
}
.discuss-wrap .part-people-wrap>div.add-people {
    background: transparent;
    border: 2px solid rgba(85, 168, 253, 1);
    color: rgba(85, 168, 253, 1);
    cursor: pointer;
}
.discuss-wrap .chats-wrap {
	position: relative;
    flex: auto;
    border-top: dashed 1px rgba(199, 198, 203, 1);
    padding: 10px 0;
	overflow: hidden auto;
}
.discuss-wrap .chats-wrap .discuss-tip {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #c6c9cc;
}
.discuss-wrap .dialog-wrap {
    flex: none;
    height: 200px;
}
.discuss-wrap .resize-bar {
	flex: none;
	height: 19px;
	border-top: dashed 1px rgba(199, 198, 203, 1);
    cursor: n-resize;
}
.discuss-wrap .dialog-wrap textarea {
    width: 100%;
    height: calc(100% - 30px);
    margin: 0;
    resize:none;
} 
.discuss-wrap .dialog-wrap .discuss-publish {
    width: 32px;
    height: 24px;
    line-height: 24px;
    color: rgba(85, 168, 253, 1);
    font-size: 16px;
    text-align: left;
    font-family: HiraginoSansGB-W6;
    cursor: pointer;
}
.discuss-wrap .dialog-wrap .btns {
	height: 30px;
}
/* 讨论 */
/* 右下 */


.cate-modal {
    position: fixed;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    z-index: 999;
    transform: translateX(0);
    transition: all .2s linear;
}
.cate-modal.hide-cate-modal {
    transform: translateX(100%);
}
.cate-modal .cate-modal-mask {
   	flex: auto;
   	height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1;	
    opacity: 1;
    transition: all .2s linear;
}
.cate-modal.hide-cate-modal .cate-modal-mask {
	opacity: 0;
}
.cate-modal .cate-modal-content {
	flex: none;
   	width: 38.2%;
   	height: 100%;
   	box-shadow: 0px 2px 7px 4px rgba(0, 0, 0, 0.16);
}
.cate-modal .cate-modal-title {
    position: relative;
    height: 40px;
    line-height: 40px;
    border-bottom: solid 1px #ededed;
    padding: 0 10px;
    z-index: 2;
    background: #fff;
}
.cate-modal .cate-modal-title .close {
    float: right;
    margin: 13px 0 0 0;
    opacity: .8;
    cursor: pointer;
}
/*三级分类选择start*/
.cate-modal .logSearchDetail-accessLogContent * {
    margin: initial !important;
    box-sizing: border-box;
}
.cate-modal .logSearchDetail-accessLogContent {
	position: relative;
	width: 100%;
    height: calc(100% - 41px);
    color: #5c5a66;
    z-index: 1;
    font-size: 12px;
    background-color: #fff;
}
.cate-modal .logSearchDetail-accessLogContent>span{
    width: 220px;
    line-height: 38px;
    display: block;
    color: #5c5a66;
    position: relative;
    cursor: pointer;
    padding: 0 60px 0 20px;
}
.cate-modal .logSearchDetail-accessLogContent>span>i{
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
.cate-modal .logSearchDetail-accessLogContent>div,
.cate-modal .logSearchDetail-accessLogContent>ul{
	background-color: #fff;
    position: absolute;
}

.cate-modal .logSearchDetail-accessLogContent>div {
    width: 100%;
    height: calc(100% - 51px);
    left: 0;
    top: 51px;
}
.cate-modal .logSearchDetail-accessLogContent>div>div:first-child {
	position: absolute;
    right: 10px;
    bottom: 10px;
    z-index: 2;
}
.cate-modal .logSearchDetail-accessLogContent>div>div:first-child button.light {
    background: #fff;
    border-color: var(--color-theme);
    color: var(--color-theme);
}
.cate-modal .logSearchDetail-accessLogContent>div>div:first-child button.light:hover {
    background: var(--color-theme);
    color: #FFFFFF;
    border-color: var(--color-theme);
}
.cate-modal .logSearchDetail-accessLogContent>div>div:first-child button{
	cursor: pointer;
	width: 70px;
	height: 35px;
	margin-left: 10px !important;
}
.cate-modal .logSearchDetail-accessLogContent>div h5 {
    font-weight: bold;
    cursor: pointer;
    width: auto;
    display: inline-block;
    line-height: 20px;
    padding: 0 5px;
}
.cate-modal .logSearchDetail-accessLogContent>div h5:not(.active):not(.disabled):hover,
.cate-modal .logSearchDetail-accessLogContent>div span:not(.active):not(.disabled):hover {
	text-decoration: underline;
}
.cate-modal .logSearchDetail-accessLogContent>div span.active,
.cate-modal .logSearchDetail-accessLogContent>div h5.active {
	background-color: #e1e2f0;
}
.cate-modal .logSearchDetail-accessLogContent>div div>span {
    color: #5e619f;
    cursor: pointer;
    flex: none;
    position: absolute;
    text-align: right;
    left: 70px;
    overflow: visible;
    white-space: nowrap;
    line-height: 20px;
    padding: 0 5px;
}
.cate-modal .logSearchDetail-accessLogContent>div:nth-child(3) h5.disabled,
.cate-modal .logSearchDetail-accessLogContent>div:nth-child(3) div>span.disabled{
	cursor: default;
}
.cate-modal .logSearchDetail-accessLogList{
	border-bottom: 1px dashed #eee;
	margin-top: 10px !important;
}
.cate-modal .logSearchDetail-accessLogList:after{
	content: '';
	clear: both;
	display: block;
}
.cate-modal .logSearchDetail-accessLogList>div{
	/*margin-left: 150px !important;
    min-height: 30px;
    position: relative;
    top: -20px;*/
    display: inline-block;
    min-height: 30px;
    float: right;
    width: calc(100% - 160px);
}
.cate-modal .logSearchDetail-accessLogList>div>p{
	word-wrap: break-word;
}

.cate-modal .logSearchDetail-accessLogContent>div p>span {
    display: inline-block;
    cursor: pointer;
    padding: 0 5px;
    margin: 0 5px 5px 5px !important;
    line-height: 20px;
    word-break: break-all;
}
.cate-modal .logSearchDetail-accessLogContent>ul{
	display: flex;
	justify-content: center;
	width: 100%;
    border-bottom: dashed 1px #eceaea;
}
.cate-modal .logSearchDetail-accessLogContent>ul>li {
	width: 120px;
	height: 50px;
    line-height: 50px;
    position: relative;
    text-align: center;
    cursor: pointer;
}
.cate-modal .logSearchDetail-accessLogContent>ul>li:nth-child(1) {
	margin-right: 10px!important;
}
.cate-modal .logSearchDetail-accessLogContent>ul>li.choosed:before {
    content: '* ';
}
.cate-modal .logSearchDetail-accessLogContent>ul>li i {
    position: absolute;
    right: 5px;
    top: 10px;
    transform: translateY(10px);
}
.cate-modal .logSearchDetail-accessLogContent>ul>li.active {
    border-bottom: solid 2px #8fb0fe;
    color: #8fb0fe;
}
.cate-modal .logSearchDetail-accessLogContent>ul>li:hover{
    border-bottom: solid 2px #8fb0fe;
    color: #8fb0fe;
}
/*三级分类选择end*/
/* 分享 */
.select-type .boolean-switch{
	float: none !important;
	height: 22px;
	margin-left: 10px;
}
.select-type .boolean-switch:BEFORE{
	content: "";
	height: 18px !important;
}
.fllow-collect{
	display: flex;
    align-items: center;
    padding-bottom: 20px;
}
.fllow-collect .select-type{
	display: flex;
    align-items: center;
    min-width: 170px;
    justify-content: center;
}
.fllow-person{
	padding-top: 20px;
    border-top: 1px dashed rgba(199, 198, 203, 1);
    display: flex;
    flex-wrap: wrap;
    max-height: 400px;
    overflow-y: auto;
}
.fllow-person>.person-list{
	min-width: 50px;
	cursor: pointer;
    margin: 0 10px 10px;
}
.fllow-person>.person-list>.fa{
	
}
.fllow-person>.person-list>.fa:BEFORE{
	content: "\f096";
	
}
.fllow-person>.person-list.select{
	color: #4695FD;
}
.fllow-person>.person-list.select>.fa:BEFORE{
	content: "\f14a";
}
/* 分享 */
</style>
<div class="sql-detail-page">
	<div class="sql-detail-wrap flex">
		<div class="sql-detail-left">
			<div class="sql-detail-top-left inline-flex jc-sb ai-c">
				<span class="action-title">查看SQL</span>
				<div class="edit-btns flex"></div>
			</div>
			<div class="sql-detail-bottom-left">
				<div class="sql-title-wrap">
					<div class="sql-title-top flex jc-sb">
						<div class="sql-title-left">
							<span class="sql-name">检查类SQL</span>
							<div class="inline-flex score-box" style="position: relative;">
                                <div id="triggerStars" style="font-size: 12px;color: #5E6D80;width: 100%;text-align: center;">
                               		<span style="color: rgba(247, 181, 0, 1);">( 评价<span class="score-num">-</span>分 )</span>
                                </div>
                                <div class="score-wrap hide">
                                    <span class="stars-wrap stars-score inline-flex">
                                        <i class="fa fa-star-o" data-role="star"></i>
                                        <i class="fa fa-star-o" data-role="star"></i>
                                        <i class="fa fa-star-o" data-role="star"></i>
                                        <i class="fa fa-star-o" data-role="star"></i>
                                        <i class="fa fa-star-o" data-role="star"></i>
                                        <i class="fa score-add-num"></i>
                                    </span>
                                    <span class="stars-btns flex jc-sb">
                                        <button class="score-confirm">打分</button><button class="score-cancel">取消</button>
                                    </span>
                                </div>
                            </div>
							<!-- <span class="sql-score"></span> -->
						</div>
						<div class="sql-title-right">
							<span class="sql-publish-time"></span> /
							<span class="sql-update-time"></span>
						</div>
					</div>
					<div class="sql-title-bottom">
						<span>检查类</span><span>Linux</span>
					</div>
				</div>
				<div class="forms-wrap">
					<div class="form-item sql-name">
						<span class="form-item-icon"></span>
						<span class="form-item-name">SQL名称</span>
						<p class="form-item-text" data-field="sqlName">-</p>
						<div class="form-item-value hide">
							<input type="text" id="sql_name"/>
						</div>
					</div>
					<div class="form-item sql-cate">
						<span class="form-item-icon"></span>
						<span class="form-item-name">SQL分类</span>
						<p class="form-item-cates"  data-field="sqlCate">
							<span class="sql-cate-item-add add-btn hide"><i class="fa fa-plus"></i></span>
						</p>
					</div>
					<div class="form-item sql-content">
						<span class="form-item-icon"></span>
						<span class="form-item-name">SQL内容</span>
						<p class="form-item-text" data-field="sqlContext">-</p>
						<div class="form-item-value hide">
							<textarea name="" id="sql_content"></textarea>
						</div>
					</div>
					<div class="form-item sql-desc">
						<span class="form-item-icon"></span> 
						<span class="form-item-name">SQL描述</span>
						<p class="form-item-text" data-field="sqlDesc">-</p>
						<div class="form-item-value hide">
							<textarea name="" cols="30" rows="3" id="sql_desc"></textarea>
						</div>
					</div>
					<div class="form-item add-file">
						<span class="form-item-icon"></span> 
						<span class="form-item-name">附件</span>
						<div class="form-item-file-download hide">
							<!-- <span><a id="file_download" target="_blank">无</a></span>
							<span class="file-name"></span> -->
						</div>
						<div class="form-item-files-wrap">
							<div class="form-item-file">
								<span class="add-btn"><i class="fa fa-plus"></i></span><span class="filename">上传附件</span>
								<input type="file" id="upload_input"/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="sql-detail-right">
			<div class="sql-detail-top-right inline-flex jc-sb ai-c">
				<div class="operates inline-flex">
					<span class="active">动态</span>
					<span>讨论</span>
				</div>
			</div>
			<div class="sql-detail-bottom-right">
				<div class="trends-wrap">
					<div class="user-info flex">
						<div class="user-img inline-flex jc-c ai-c"><i class="fa fa-user-circle"></i></div>
	                    <div>
	                        <div class="user-name" style="font-size: 16px;color: #333;">管理员</div>
	                        <div class="user-department" style="font-size: 14px;color: #5E6D80;margin-top: 4px;">产品研发部</div>
	                        <div class="flex" style="position: relative;">
	                            <div class="rate-people" style="font-size: 12px;color: #5E6D80;">评价: -</div>
	                        </div>
	                    </div>
					</div>
					<div class="all-trends">
						<div class="select-wrap">
							<span><span>所有动态</span><i class="fa fa-caret-down"></i></span>
							<ul class="hide">
								<li>所有动态</li><li>创建</li><li>更新</li><li>关注</li><li>分享</li><li>评论</li>
							</ul>
						</div>
						<ul class="trends-list" id="state_list">
	
						</ul>
					</div>
				</div>
				<div class="discuss-wrap flex hide">
					<div class="part-people">
						<p>参与者</p>
						<div class="part-people-wrap flex">
						</div>	
					</div>
					<div class="chats-wrap">
						<div class="select-wrap hide">
							<span><span>所有讨论</span><i class="fa fa-caret-down"></i></span>
							<ul class="hide">
								<li>所有动态</li><li>创建</li><li>更新</li><li>关注</li><li>分享</li><li>评论</li>
							</ul>
						</div>
						<ul class="trends-list" id="discuss_list">
							<div class="discuss-tip">还没有人发表评论</div>
						</ul>
					</div>
					<div class="resize-bar"></div>
					<div class="dialog-wrap">
						<textarea name="" id="comments" wrap="hard" placeholder="按CTRL+Enter键换行，按Enter键快速发布"></textarea>
						<div class="btns flex jc-sb">
							<div class="btns-left"></div>
							<div class="btns-right">
								<span class="discuss-publish">发布</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="cate-modal hide-cate-modal">
		<div class="cate-modal-mask"></div>
		<div class="cate-modal-content">
			<p class="cate-modal-title">SQL分类 <i class="close fa fa-times"></i></p>
			<div class="logSearchDetail-accessLogContent">
				<ul id="accessLogUl">
					<li class="active">应用系统</li>
					<li>资产对象</li>
				</ul>
				<div id="appSystem" class="cate-list-wrap">
				</div>
				<div id="assetObject" class="cate-list-wrap hide">
				</div>
			</div>
		</div>
	</div>
	
	<div id="modalFllow" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
		<div class="modal-header">
			<button class="close" type="button" data-dismiss="modal">×</button>
			<h3 id="myModalLabel">分享</h3>
		</div>
		<div class="modal-body">
			<div class="fllow-collect">
				<div class="select-type">
					<span class="">是否加入SQL圈</span>
					<span class="boolean-switch" id="isAddSql"></span>
				</div>
				<div class="select-type" id="isAddPersonDiv">
					<span class="">是否制定可见人</span>
					<span class="boolean-switch" id="isAddPerson"></span>
				</div>
			</div>
			<div class="fllow-person" id="presonList" style="display: none;">
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
			<button type="button" data-dismiss="modal" class="confirmBtn">确认</button>
		</div>
	</div>
	
</div>

