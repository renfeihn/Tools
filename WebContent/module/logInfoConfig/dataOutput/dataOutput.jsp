<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.data-output-page input,
.data-output-page p,
.data-output-page ul {
	margin: 0;
}
.flex-column {
	flex-direction: column;
}
.operate-wrap {
	position: absolute;
	z-index: 99;
}
.check-result {
    color: #55a8fd;
    cursor: pointer;	
}
.check-result:hover {
    text-decoration: underline;
}
/* 弹框 */
.config-modal {
	position: fixed;
	top: 0;
	right:0 ;
	bottom: 0;
	left: 0;
    z-index: 1050;
    display: none;
}
.config-modal.show {
	display: block;
}
.config-modal .modal-mask {
	height: 100%;
	background: rgba(0,0,0,.5);
}
.config-modal .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 800px;
    height: 800px;
    background: #fff;
}
.config-modal .modal-body {
	max-height: none;
    height: calc(100% - 110px);
    overflow: hidden auto;
}
.config-modal input[type="radio"] {
    margin: 0 0 0 5px;	
}
.config-modal input[type="text"],
.config-modal input[type="password"] {
    height: 28px;
    width: 100%;
}
.config-modal .control-item {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
}
.config-modal .modal-close {
    float: right;
    border: none;
    font-size: 24px;
    margin: -1px 0 0 0;
    background: none;
}
.config-modal .modal-footer {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    padding: 0;
}
.step-tip {
    font-size: 22px;
    color: #8a8a8a;
    margin: 20px 0;
}
/* 数据源 */
.config-modal .modal-content label {
	display: inline-block;
}
.config-modal .control-label {
    width: 80px;
    text-align: right;
    margin-right: 10px;
}
.config-modal .steps-wrap {
	width: 80%;
	margin: 0 auto;
}
.config-modal .step-items-wrap>div {
	width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.config-modal .control-box {
    display: flex;
    width: 240px;
    justify-content: space-between;	
}
.config-modal .control-box>* {

}
.config-modal .connect-test {
    color: #2196F3;
    margin: 10px 0;
    text-align: center;
}
.config-modal .connect-test>* {
	cursor: pointer;
}
.index-wrap {
	position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 45px;
}
.index-wrap>span.index-item {
    position: relative;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    background: var(--color-theme);
    color: #fff;
    font-size: 12px;
    overflow: visible;
    cursor: pointer;
}
.index-wrap>span.index-item:before {
    content: attr(data-title);
    position: absolute;
    top: 24px;
    left: 50%;
    width: 100px;
    transform: translateX(-50%);
    color: var(--color-theme);
}
.index-wrap>span.index-item.active:after {
    content: '';
    position: absolute;
    left: -4px;
    top: -4px;
    width: 20px;
    height: 20px;
    border: solid 2px #5b62f9;
    border-radius: 50%;
}
.index-wrap>span.index-item.active:before {

}
.index-wrap>span.index-line {
    position: absolute;
    top: calc(50% - 2px);
    width: 100%;
    height: 2px;
    background: #eaebec;
}
.index-wrap .index-process {
	position: absolute;
    top: 1px;
    left: 0;
    height: 2px;
    width: 0%;
    background: #5b62f9;
    transition: all .2s linear;
}
.step-btns {
    display: flex;
    justify-content: center;
    margin-top: 50px;
}
.step-btns>button {
	margin-right: 20px;
}
/* 数据源 */

/* 匹配 */
.filter-functions {
    padding: 10px 10px 0;
}
.filter-functions>span {
    position: relative;
    display: inline-block;
    width: 30%;
    text-align: center;
    background: #5b62f9;
    color: #fff;
    margin: 0 2px 10px 0;
    cursor: pointer;
}
.filter-functions>span.active {
    background: #2196F3;
}
.filter-functions>span.disabled {
    cursor: not-allowed;
    color: #c7cacc;
}
.filter-functions>span.active:before {
	 content: '✔';
    position: absolute;
    top: -5px;
    right: 0;
    width: 10px;
    height: 10px;
    color: #fff;
    font-size: 12px;
}
.filter-tips {
    padding: 0 10px;
    font-size: 12px;
    color: #404244;
}
.filter-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.filter-wrap>div {
	width: 30%;
    border: solid 1px #ebebed;
}
.filter-wrap>div:nth-child(2) {
	margin: 0 10px;
}
.filter-wrap>div>p {
    text-align: center;
    margin: 0;
    line-height: 30px;
    background: #e8edf1;
    border-bottom: solid 1px #ebebed;
}
.filter-wrap>div>ul {
	max-height: 250px;
	overflow: hidden auto;
}
.filter-wrap>div>ul>li {
    line-height: 30px;
    text-indent: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    border-bottom: solid 1px #eee;
}
.filter-wrap>div>ul>li.active {
    background: #dfe7ec;
}
.filter-table {
	width: 100%;
}
.table-head,
.body-item {
	position: relative;
	display: flex;
    justify-content: space-between;
}
.table-head>span,
.body-item>span {
    flex: none;
    width: calc(100% / 3);
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-right: solid 1px #fbf3f3;
}
.body-item>span>span {
	display: inline-block;
	width: 100%;
	white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 1em;
    box-sizing: border-box;
}
.table-head {
	background: #f0f1f3;
}
.body-item {
    background: #e4e7ec;
}
.body-item i.item-delete {
    position: absolute;
    right: -20px;
    top: 8px;
    color: #5b62f9;
    cursor: pointer;	
}
.body-item>span {
	position: relative;
	cursor: pointer;
}
.body-item>span>i {
    position: absolute;
    top: 10px;
    right: 5px;
    display: none;
}
.body-item>span:hover>i {
	display: inline-block;
}
.filter-table .addone {
    color: #5b62f9;
    margin-top: 10px;
    width: 60px;
    cursor: pointer;
}
.filter-table .addone:hover {
	text-decoration: underline;	
}
.field-select {
	position: absolute;
	top: 30px;
    left: 0;
    right: 0;
    background: #f0f1f3;
    z-index: 11;
    border: solid 1px #cdd5dc;
}
.field-select>p {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: solid 1px #c5c4c4;
    padding: 4px 0;
}
.field-select>p>i {
	width: 20px;
	height: 20px;
    color: #5b62f9;
	line-height: 20px;
	cursor: pointer;
}
.field-select>p>input {
    width: 80%;
    height: 24px;
}
.field-select>ul {

}
.field-select>ul>li {
    line-height: 26px;
    text-align: left;
    text-indent: 10px;
    cursor: pointer;
}
.field-select>ul>li:hover,
.field-select>ul>li.active {
    background: #2196F3;
    color: #fff;
}
/* 匹配 */

.excute-circle {
	display: flex;
}
.excute-circle>span {
    width: 50px;
    text-align: center;
    font-size: 12px;
    border: 1px solid #c7c6cc;
    background-color: #f9f9fb;
    cursor: pointer;
}
.excute-circle>span.active {
    border: 1px solid #5b62f9;
    background-color: #8086ff;
    color: #FFF;
}

/* 弹框 */
</style>
<div class="data-output-page">
	<div class="content">
		<div class="operate-wrap">
			<button id="add_btn" type="button" class="addBtn">新增</button>
		</div>
		<div class="table-wrap">
			<table class="display dataTable table" id="output_table"></table>
		</div>
	</div>
	
	<div id="modal" class="config-modal" tabindex="-1">
		<div class="modal-mask"></div>
		<div class="modal-content">
			<div class="modal-header">
				<button class="modal-close" type="button">×</button>
				<h3 id="myModalLabel">新建</h3>
			</div>
			<div class="modal-body">
				<div class="steps-wrap">
					<div class="index-wrap">
						<span class="index-line">
							<span class="index-process"></span>
						</span>
						<span class="index-item" data-title="选择数据源" data-role="datasource">1</span>
						<span class="index-item" data-title="字段筛选" data-role="filter">2</span>
						<!-- <span class="index-item" data-title="字段加工" data-role="produce">3</span> -->
						<span class="index-item" data-title="任务信息" data-role="excute">3</span>
						<span class="index-item" data-title="完成" data-role="complete">4</span>
					</div>
					<div class="step-items-wrap">
						<div class="step-item flex-column" data-role="datasource">
							<div class="control-item">
								<label class="control-label">数据源类型</label>
								<div class="control-box">
									<span>
										<label for="check_mysql">mysql</label><input type="radio" name="datasource" id="check_mysql" data-type="1" checked/>
									</span>
									<span>
										<label for="check_oracle">oracle</label><input type="radio" name="datasource" id="check_oracle" data-type="2"/>
									</span>
									<span>
										<label for="check_kafka">kafka</label><input type="radio" name="datasource" id="check_kafka" data-type="3"/>
									</span>
								</div>
							</div>
							<div class="form-wrap">
								<div class="control-item">
									<label class="control-label">连接名</label>
									<div class="control-box">
										<input type="text" data-field="dbName"/>
									</div>
								</div>
								<div class="control-item">
									<label class="control-label">url</label>
									<div class="control-box">
										<input type="text" data-field="dbConnectUrl" placeholder="10.1.1.1:3306"/>
									</div>
								</div>
								<div class="control-item">
									<label class="control-label database-name">数据库名或SID</label>
									<div class="control-box">
										<input type="text" data-field="dbDatabase"/>
									</div>
								</div>
								<div class="control-item">
									<label class="control-label">用户名</label>
									<div class="control-box">
										<input type="text" data-field="dbUser"/>
									</div>
								</div>
								<div class="control-item">
									<label class="control-label">密码</label>
									<div class="control-box">
										<input type="password" data-field="dbPswd" autocomplete="new-password"/>
									</div>
								</div>
								<div class="control-item tablename-item">
									<label class="control-label">表名</label>
									<div class="control-box">
										<input type="text" data-field="dbTableName"/>
									</div>
								</div>
							</div>
							<div class="connect-test">
								<i class="fa fa-link"></i><span>链接测试</span>
							</div>
						</div>
						<div class="step-item flex-column" data-role="filter" style="user-select: none;">
							<!-- <div class="filter-wrap">
								<div class="log-data-wrap">
									<p>日志源数据字段</p>
									<ul class="source-fields">
										<li>aaaa</li>
										<li>bbbbb</li>
										<li>ccccccc</li>
										<li>ddddddddd</li>
									</ul>
								</div>
								<div class="filter-operates">
									<p>功能</p>
									<div class="filter-functions">
										<span class="disabled" data-tips="说明: 源字段直接输出到目标字段,1对1" data-need="1">匹配</span>
										<span class="disabled" data-tips="说明: 将多个源字段通过拼接输出到目标字段,默认按选择字段的顺序拼接,多对1" data-need="1+">合并</span>
										<span class="disabled" data-tips="说明: 将源字段经过转化后输出到目标字段,1对1" data-need="1">转化</span>
									</div>
									<div class="filter-tips" data-tips="说明: 分别将日志源字段、功能、数据源字段拖入相应位置">说明: 分别将日志源字段、功能、数据源字段拖入相应位置</div>
								</div>
								<div class="datasource-data-wrap">
									<p>数据源数据字段</p>
									<ul class="target-fields">
										<li>aaaa2</li>
										<li>bbbbb2</li>
										<li>ccccccc2</li>
										<li>ddddddddd2</li>
									</ul>
								</div>
							</div> -->
							<div class="filter-table">
								<div class="table-head">
									<span>日志源数据字段</span><span>字段类型</span><span>数据源数据字段</span>
								</div>
								<div class="table-body"></div>
								<div class="addone">新增一条</div>
							</div>
						</div>
						<div class="step-item" data-role="produce">加工</div>
						<div class="step-item flex-column" data-role="excute">
							<div class="control-item">
								<label class="control-label">任务名称</label>
								<div class="control-box">
									<input type="text" data-field="taskName" style="width: 208px;"/>
								</div>
							</div>
							<div class="control-item">
								<label class="control-label">执行周期</label>
								<div class="control-box">
									<div class="excute-circle">
										<span class="active" data-circle="1">一分钟</span>
										<span class="" data-circle="5">五分钟</span>
										<span class="" data-circle="60">一小时</span>
										<span class="" data-circle="1140">一天</span>
									</div>
								</div>
							</div>
						</div>
						<div class="step-item" data-role="complete">
							<p class="step-tip">请确定所填信息全部正确后再点击保存按钮</p>
						</div>
					</div>
					<div class="step-btns">
						<button class="btn-prev">上一步</button><button class="btn-next">下一步</button>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
				<button type="button" data-dismiss="modal" class="confirmBtn">保存</button>
			</div>
		</div>
		
	</div>	
</div>