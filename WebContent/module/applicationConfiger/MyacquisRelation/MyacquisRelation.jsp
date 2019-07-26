<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
	.MyacquisR {
		height: 815px;
	}
	.MyacquisR-define,
	.MyacquisR-standard {
		position: relative;
		display: flex;
		margin-top: 25px;
		height: auto;
		min-height: 200px;
	}
	
	.MyacquisR-define-right,
	.MyacquisR-standard-right {
		flex: none;
		width: 350px;
	}
	.MyacquisR-define-right>p,
	.MyacquisR-standard-right>p {
		background: #fafafc;
		height: 33px;
		border-top: solid 1px #e2e1e6;
		border-bottom: solid 1px #e2e1e6;
		line-height: 33px;
		font-weight: bold;
		font-size: 12px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 0;
	}
	.MyacquisR-define-right>p>span,
	.MyacquisR-standard-right>p>span {
		text-align: center;
	}
	.MyacquisR-define-right span,
	.MyacquisR-standard-right span {
		width: 100px;
	}
	.MyacquisR-define-right>p>span:nth-child(2),
	.MyacquisR-define-right>ul>li>span:nth-child(2),
	.MyacquisR-standard-right>p>span:nth-child(2),
	.MyacquisR-standard-right>ul>li>span:nth-child(2) {
		width: 150px;
	}
	.MyacquisR-define-right>ul,
	.MyacquisR-standard-right>ul {
		margin: 0;
	}
	.MyacquisR-define-right>ul>li,
	.MyacquisR-standard-right>ul>li {
		display: flex;
		justify-content: space-between;
		background: #F1F0F5;
		height: 32px;
		line-height: 32px;
		border-bottom: solid 1px #E1E0E7;
	}
	.MyacquisR-define-right>ul>li>span,
	.MyacquisR-standard-right>ul>li>span {
		text-align: center;
	}
	.MyacquisR-define-left,
	.MyacquisR-standard-left {
		flex: auto;
	}
	.MyacquisR-jumpPage>input {
		width:35px;
	}
	.MyacquisR-define .dataTables_filter,
	.MyacquisR-standard .dataTables_filter{
		position: absolute;
		top: -33px;
	}
	.MyacquisR-buttons{
		margin:-34px 0 10px 0;
	    z-index: 1;
	    position:absolute;
	}
	.MyacquisR-selectDiv{
		overflow:hidden;
		border:1px solid #ccc;
		position:absolute;
		height:160px;
		overflow-y:auto;
		z-index:99;
		margin-top:-217px;
		background:#fff;
		box-shadow:0px 15px 20px #C9C9C9;
	}
	
	.MyacquisR-InputDiv{
		overflow:hidden;
		border:1px solid #ccc;
		position:absolute;
		height:160px;
		overflow-y:auto;
		z-index:99;
		background:#fff;
		margin-left:94px;	
		box-shadow:0px 15px 20px #C9C9C9;
	}
	
	.MyacquisR-targetDiv{
		margin-top:-179px;
		width:357px;
	}
	
	.MyacquisR-ResourseDiv{
		margin-top:-141px;
		width:353px;
	}
	
	.MyacquisR-criticalDiv{
		margin-top:-73px;
		width:353px;
	}
	
	.MyacquisR-samplfreDiv{
		margin-top:-35px;
		width:353px;
	}
	
	.MyacquisR-samplfreDiv span:hover,.MyacquisR-criticalDiv span:hover,.MyacquisR-ResourseDiv span:hover, .MyacquisR-selectDiv span:hover,.MyacquisR-targetDiv span:hover{
		background-color: #F1F0F5;
	}
	
	.MyacquisR-selectDivFirst{
		width:353px;
		margin-left:94px;
	}
	.MyacquisR-selectDivSecond{
		width:256px;
		margin-left:190px;
	}
	.MyacquisR-selectDivthird{
		width: 136px;
		margin-left:310px;
	}
	
	.MyacquisR-samplfreDiv span,.MyacquisR-criticalDiv span,.MyacquisR-ResourseDiv span,.MyacquisR-targetDiv span,.MyacquisR-selectDiv span{
		display:inline-block;
		width:385px;
		height:30px;
		padding-left:10px;
		text-align:left;
		line-height:30px;
		font-size:14px;
	}
	
	.MyacquisR-selectSpanClick{
		background:#5B62F9 !important;
		color:#fff !important;
	}
	
	.MyacquisR-molDeatil-input>span,.MyacquisR-model-input>span{
		display:inline-block;
		width:80px;
		height:22px;
		text-align:left;
		line-height:22px;
		font-size: 12px;
	}
	.MyacquisR-model-input input{
		cursor:pointer;
		width:78%;
		margin-left:10px;
		background:url(img/app2Repository/objectList/KPICollect/icon-down.png) right center no-repeat;
		margin-top:4px;
		padding-left:10px;
	}
	.MyacquisR-molDeatil-input input{
		cursor:pointer;
		width:78%;
		margin-left:10px;
		margin-top:4px;
		padding-left:10px;
	}
	.MyacquisRelation-Table{
		padding:20px;
		background:#FAFAFC;
	}
	
	.MyacquisRdisplay{
		display:none;
	}
	
	.MyacquisRHidden{
		display:none;
	}
	
	#MyacquisRelation-molDeatil p,#MyacquisRelation-mol p{
		margin:0 0 10px 0;
		font-weight: bold;
	}
	
	#MyacquisR_addTableTr{
		line-height:25px;
		text-align:left;
		padding-left:15px;
		font-size:12px;
		color:#999;
		width:100%;
		height:25px;
		background:url(img/button/add-black.png) left center no-repeat !important;
	}
	
	#MyacquisR_Save,#MyacquisR_Cancel,.KPICollect-opreation i{
		cursor:pointer;
	}
	
	.MyacquisR-pspan{
		display:inline-block;
		width:160px;
		height:2px;
		margin-top:25px;
		background:#5B62F9;
	}
	.MyacquisR-tiaozhuan{
		display:inline-block;
		position:absolute;
		margin-top: -30px;
		margin-left: 380px;
		font-size: 12px;
		text-decoration: underline;
		color: #5B62F9;
		cursor:pointer;
	}
	.MyacquisR-trActive{
		background-color:#F1F0F5 !important;
	}
	.MyacquisR-define-left .dataTables_filter{
		margin-right: -350px;
		right:0px;
	}
</style>

<section class="panel MyacquisR">
	<ul class="nav nav-tabs nav-public" id="MyacquisRUl">
		<li class="active"><a href="#tabs1" data-toggle="tab">我定义的采集关系</a></li>
		<li><a href="#tabs2" data-toggle="tab">标准采集关系</a></li>
	</ul>
	<div class="tab-content">
		<div id="tabs1" class="tab-pane active">
			<div class="MyacquisR-define">
				<div class="MyacquisR-buttons">
					<button type="button" class="addBtn">新增</button>
					<button type="button" id="editBtnMy" class="editBtn disabled">修改</button>
					<button type="button" id="delBtnMy" class="delBtn disabled">删除</button>
					<button type="button" id="detailBtnMy" class="detailBtn disabled">明细</button>
				</div>
				<div class="MyacquisR-define-left">
					<table id="defineTab" class="display dataTable table">
						<thead>
							<tr>
								<th style="width:10%">序号</th>
								<th style="width:20%">一级分类/二级分类/三级分类</th>
								<th style="width:10%">应用对象</th>
								<th style="width:10%">采集对象</th>
								<th style="width:10%">指标集路径</th>
								<th style="width:10%">指标集</th>
								<th style="width:10%">采集参数</th>
								<th style="width:10%">采集频率(分钟)</th>
								<th style="width:10%">运行状态</th>
								<th></th><!-- kpiset_relationId -->
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
					
				</div>
				<div class="MyacquisR-define-right">
					<p>
						<span>指标项</span>
						<span>指标项名称</span>
						<span>单位</span>
					</p>
					<ul>
						<!-- <li>
							<span>-</span>
							<span>-</span>
							<span>-</span>
						</li> -->
					</ul>
				</div>
			</div>
		</div>
		<div id="tabs2" class="tab-pane">
			<div class="MyacquisR-standard">
				<div class="MyacquisR-standard-left">
					<table id="standardTab" class="display dataTable table">
						<thead>
							<tr>
								<th style="width:5%">序号</th>
								<th style="width:35%">一级分类/二级分类/三级分类</th>
								<th style="width:10%">应用对象</th>
								<th style="width:15%">指标集路径</th>
								<th style="width:10%">指标集</th>
								<th style="width:10%">采集参数</th>
								<th style="width:10%">采集频率</th>
								<th style="width:15%">运行状态</th>
								<th></th><!-- kpiset_relationId -->
							</tr>
						</thead>
						<tbody></tbody>
					</table>
					
				</div>
				<div class="MyacquisR-standard-right">
					<p>
						<span>指标项</span>
						<span>指标项名称</span>
						<span>单位</span>
					</p>
					<ul>
						<!-- <li>
							<span>-</span>
							<span>-</span>
							<span>-</span>
						</li> -->
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<div id="MyacquisRelation-mol" tabindex="-1" class="modal fade hide" data-backdrop="false" aria-hidden="true">
	<div class="modal-header">
		<button class="close" id="close-modalMyAc" type="button" data-dismiss="modal">&times;</button>
		<h3 id="molName">修改-采集关系</h3>
	</div>
	<div id="bodyModel" class="modal-body">
		<p>指标集作用范围</p>
		<div class="MyacquisR-model-input">
			<span><b style="color:red">*</b>分类</span>
			<input readonly="readonly" class="selectBy" type="text" placeholder="一级分类/二级分类/三级分类" />
		</div>
		<div class="MyacquisR-model-input">
			<span><b style="color:red">*</b>应用对象</span>
			<input readonly="readonly"  class="targetCol" type="text" placeholder="请选择应用对象" />
		</div>
		<div class="MyacquisR-model-input">
			<span>&nbsp;资源对象</span>
			<input readonly="readonly" class="resourseObject" type="text" placeholder="请选择资源对象" />
		</div>
		<p>指标集配置</p>
		<div class="MyacquisR-model-input">
			<span><b style="color:red">*</b>关联指标集</span>
			<input readonly="readonly" class="critical" type="text" placeholder="请选择关联指标集" />
		</div>
		<div class="MyacquisR-model-input">
			<span><b style="color:red">*</b>采集频率(分钟)</span>
			<input class="samplfre" type="text" placeholder="请选择采集频率" />
		</div>
		<div class="MyacquisR-model-input">
			<span><b style="color:red">*</b>启用状态</span>
			<div id="mol-switch" style="display:inline-block;margin-left:10px;vertical-align:bottom" class="controls">
				<span class="boolean-switch false"></span>
			</div>
		</div>
		<div class="MyacquisR-selectDiv MyacquisR-selectDivFirst MyacquisRHidden"></div>
		<div class="MyacquisR-selectDiv MyacquisR-selectDivSecond MyacquisRHidden"></div>
		<div class="MyacquisR-selectDiv MyacquisR-selectDivthird MyacquisRHidden"></div>
		<div class="MyacquisR-InputDiv MyacquisR-targetDiv MyacquisRHidden"></div>
		<div class="MyacquisR-InputDiv MyacquisR-ResourseDiv MyacquisRHidden"></div>
		<div class="MyacquisR-InputDiv MyacquisR-criticalDiv MyacquisRHidden"></div>
		<div id="table_content" class="MyacquisRelation-Table MyacquisRdisplay">
			<p>参数配置</p>
			<table id="MyparamSetTable" style="table-layout: auto;" class="table dataTable">
				<thead>
					<tr>
						<th>序号</th>
						<th>日志文件</th>
						<th>关键</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan="4"><div id="MyacquisR_addTableTr" style="">添加</div></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="modal-footer">
		<button id="buttion_cancel" type='button' class="cancelBtn">取消</button>
		<button id="buttion_add" type='button'  class="confirmBtn">保存</button>
	</div>
</div>

<div id="MyacquisRelation-molDeatil" tabindex="-1" class="modal fade hide" data-backdrop="false" aria-hidden="true">
	<div class="modal-header">
		<button class="close" id="close-modalDetailMyAc" type="button" data-dismiss="modal">&times;</button>
		<h3>查看-采集关系</h3>
	</div>
	<div id="bodyModel" class="modal-body">
		<p>指标集作用范围</p>
		<div class="MyacquisR-molDeatil-input">
			<span>分类</span>
			<input readonly="readonly" class="selectBy" type="text"/>
		</div>
		<div class="MyacquisR-molDeatil-input">
			<span>应用对象</span>
			<input readonly="readonly"  class="targetCol" type="text"/>
		</div>
		<div class="MyacquisR-molDeatil-input">
			<span>资源对象</span>
			<input readonly="readonly" class="resourseObject" type="text"/>
		</div>
		<p>指标集配置</p>
		<div class="MyacquisR-molDeatil-input">
			<span>关联指标集</span>
			<input readonly="readonly" class="critical" type="text"/>
		</div>
		<div class="MyacquisR-molDeatil-input">
			<span>采集频率(分钟)</span>
			<input readonly="readonly" class="samplfre" type="text"/>
		</div>
		<div class="MyacquisR-molDeatil-input">
			<span>应用状态</span>
			<div id="molDeatil-switch" style="display:inline-block;margin-left:10px;vertical-align:bottom" class="controls">
				<span class="boolean-switch false"></span>
			</div>
		</div>
		<div id="table_content" class="MyacquisRelation-Table">
			<p>参数配置</p>
			<table id="MyacquisR_Details" style="table-layout: auto;" class="table dataTable">
				<thead>
					<tr>
						<th>序号</th>
						<th>日志文件</th>
						<th>关键</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
		</div>
	</div>
	<div class="modal-footer"></div>
</div>

