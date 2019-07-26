<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.SQLexecute-runSql td>i{
		cursor: pointer;
		color: var(--color-theme);
	}

	.SQLexecute-sqlList{
		margin: 0;
		font-size: 12px;
		font-weight: normal;
	}
	.SQLexecute-sqlList li{
		height: 40px;
		line-height: 40px;
		display: flex;
		border-bottom: 1px dashed #eee;
	}
	.SQLexecute-sqlList.listContent li:hover{
		background-color: #f6f9fc;
		cursor: pointer;
	}
	.SQLexecute-sqlList li>span{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 0 10px;
		display: inline-block;
		flex: 1;
	}
	.SQLexecute-sqlList li>span:nth-child(2){
		flex: none;
		width: 100px;
	}
	.SQLexecute-sqlList li>span:nth-child(3){
		flex: none;
		width: 200px;
	}
	.SQLexecute-sqlList li>span:last-child{
		flex: none;
		width: 80px;
	}
	.SQLexecute-sqlList li>span .fa{
		color: var(--color-error);
		cursor: pointer;
		padding: 5px;
		margin-right: 5px;
	}
	.SQLexecute-linkDatabaseBtn .fa:nth-child(1){
		display: inline-block;
		margin: 0;
	}

	.SQLexecute-linkDatabaseBtn .fa{
		margin-left: 10px;
		display: none;
	}
	.SQLexecute-linkDatabaseBtn.linking .fa-spinner{
		display: inline-block;
	}
	.SQLexecute-linkDatabaseBtn.linked .fa-check-circle-o{
		display: inline-block;
	}
	.SQLexecute-editSQL pre{
		box-shadow: none;
	}
	.SQLexecute-editSQL .CodeMirror{
		border: 1px solid #eee;
		height: 20vh;
	}
	.SQLexecute-defaultRsNum{
		font-size: 12px;
	}
	.SQLexecute-defaultRsNum>span {
		display: inline-block;
    	line-height: 24px;
	}
	.SQLexecute-defaultRsNum>input {
		margin: 0;
	    margin-left: 10px;
	    width: 60px;
	}
	.SQLexecute-defaultRsNum-container{
		position: absolute;
	    left: 0;
	    bottom: 0;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    width: 310px;
	}
</style>
<section class="panel SQLexecute-runSql" style="margin:0;padding: 20px 20px 0 20px;">
	<div style="position: relative;padding-bottom: 30px;">
		<p class="title" style="position: absolute; margin: 0; height: 25px;line-height: 25px; padding-left: 10px;">数据库选择</p>
		<table id="databaseTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<th style="width: 80px;"></th>
					<th style="width: 200px;">项目名</th>
					<th style="width: 200px;">数据库名</th>
					<th style="width: 200px;">类型</th>
					<th>URL</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<div class="SQLexecute-defaultRsNum-container" style="position: absolute; left: 0;bottom: 0;">
			<button id="linkDatabase" class="SQLexecute-linkDatabaseBtn"><i class="fa fa-chain-broken"></i><span class="linkText">连接数据库</span><i class="fa fa-spinner fa-spin"></i><i class="fa fa-check-circle-o" style="color: #22AC38;"></i></button>
			<div class="SQLexecute-defaultRsNum">
				<span>最大结果数</span>
				<input type="number" id="defaultRsNum" value="20" />
				<span>&nbsp;&nbsp;条</span>
			</div>
		</div>
	</div>
	<ul id="SQLTab" class="nav nav-tabs nav-underLine">
		<li class="active"><a href="#editSQL" data-toggle="tab">SQL编辑</a></li>
		<li ><a href="#SQLBook" data-toggle="tab">SQL书签</a></li>
		<li><a href="#SQLHistory" data-toggle="tab">SQL历史</a></li>
	</ul>
	<div class="tab-content" style="overflow: visible;position: relative;">
		<div id="editSQL" class="tab-pane active SQLexecute-editSQL">
			<button id="saveSqlBtn" class="confirmBtn" style="position: absolute;top: -30px;height: 28px;right: 192px;font-size: 12px;padding: 0 10px 0 13px;">保存</button>
			<button id="saveAsBtn" class="confirmBtn" style="position: absolute;top: -30px;height: 28px;right: 120px;font-size: 12px;padding: 0 10px 0 13px;">另存为</button>
			<button id="runSqlBtn" class="confirmBtn" style="position: absolute;top: -30px;height: 28px;right: 0px;font-size: 12px;padding: 0 10px 0 13px;"><i class="fa fa-play"></i>&nbsp;运行(Ctrl+R)</button>
			<textarea id="sqlText" style="margin: 0px;margin-top: 5px;resize:none;width: 100%;height: 100px; background-color: #fafafc;"></textarea>
			<div id="runSqlResult" style="display: none;margin-top: 10px;">
				<section class="panel">
					<ul id="runSqlResultUl" class="nav nav-tabs nav-public">
						<!-- <li><a href="#tabs1" data-toggle="tab">标签页1</a></li> -->
					</ul>
					<div id="runSqlResultTab" class="tab-content">
						<!-- <div id="tabs1" class="tab-pane active">1</div> -->
					</div>
				</section>
				<!-- <p class="title" style="position: absolute; margin: 0; height: 25px;line-height: 25px; padding-left: 10px;width: calc(100% - 40px);box-sizing: border-box;">SQL执行结果 
					<span style="    font-size: 12px;font-weight: normal;margin-left: 20px;">共匹配到 <i id="total" ></i> 条记录，耗时 <i id="duration"></i></span>
					<button id="exportExecuteData" type="button" class="confirmBtn pull-right" style="line-height: 25px;height: 25px;margin-top: 5px;">导出</button>
				</p>
				<div style="width: 100%; overflow: auto;">
					<table id="sqlResultTable" class="display dataTable table" style="margin-top: 30px;">
						<thead>
							<tr></tr>
						</thead>
						<tbody></tbody>
					</table>
				</div> -->

			</div>
		</div>
		<div id="SQLBook" class="tab-pane">
			<table id="sqlBookDataTable" class="display dataTable table">
				<thead>
					<tr>
						<th>书签名</th>
						<th width="80%">SQL语句</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
		<div id="SQLHistory" class="tab-pane">
			<button id="SQLHisAllCleanBtn" style="position: absolute;height: 24px;font-size: 12px;z-index:2"><i class="fa fa-trash"></i>&nbsp;清空SQL历史</button>
			<table id="sqlHisDataTable" class="display dataTable table">
				<thead>
					<tr>
						<th width="60%">SQL语句</th>
						<th>执行次数</th>
						<th>最后执行时间</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody style ="user-select: text; cursor: text"></tbody>
			</table>
		</div>
	</div>
</section>
<div id="passwordmodal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>连接数据库</h3>
	</div>
	<div class="modal-body">
		<div class="control-group" style="display: flex;">
			<label for="input1" class="control-label required" style="flex:none;width: 7em;">数据库连接密码</label>
			<div class="controls" style="flex:1;margin-left: 20px;">
				<input type="password" id="passwordSQL" autocomplete="off" style="width: 100%;">
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确定</button>
	</div>
</div>
<div id="dbBookModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3>SQL标签</h3>
	</div>
	<div class="modal-body">
		<div class="control-group" style="display: flex;">
			<label for="input1" class="control-label required">标签名</label>
			<div class="controls" style="flex:1;margin-left: 20px;">
				<input type="text" id="title" autocomplete="off" style="width: 100%;">
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确定</button>
	</div>
</div>
<div id="addToEditmodal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3><i class="fa fa-question-circle" style="color:var(--color-theme);font-size:26px;position:relative;top:2px;"></i>添加SQL到编辑区</h3>
	</div>
	<div class="modal-body">
		<div>覆盖编辑区原有SQL？</div>
	</div>
	<div class="modal-footer">
		<button type="button" class="cancelBtn cancel">否</button>
		<button type="button" class="confirmBtn">是</button>
	</div>
</div>
