<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.acquisRelation-buttons{
	margin-bottom:10px;
    z-index: 1;
}
.acquisRelation-table tbody span.connect{
	border: 1px solid blue;
    padding: 0 5px;
}
.acquisRelation-table tbody>tr.selected:after{
    content: "";
    width: 0;
    height: 0;
    border-width: 10px;
    border-color: transparent #fff transparent transparent;
    border-style: solid;
    position: absolute;
    right: 0;
    transform: translateY(30%);
}
.acquisRelation-jumpPage{
	position: absolute;
	margin-top: -30px;
	line-height: 24px;
	display: flex;
	align-items: center;
}
.acquisRelation-jumpPage>input{
	width: 80px;
	margin: 0 1em;
}
.acquisRelation-merUl{
	width: 350px;
    margin-top: 34px;
    font-size: 12px;
}

.acquisRelation-merUl>ul{
	margin: 0;
    overflow-y: auto;
    max-height: 320px;
    background: #F1F0F5;
}
.acquisRelation-merUl>p{
   	height: 33px;
    line-height: 33px;
    font-weight: bold;
    border-top: 1px solid #e0dfe6;
    background: #FAFAFC;
    border-bottom: 2px solid #E6E5EB;
}
.acquisRelation-merUl>ul>li{
	height: 32px;
    line-height: 32px;
}
.acquisRelation-merUl>p,
.acquisRelation-merUl>ul>li{
	display: flex;
    margin: 0;
}
.acquisRelation-merUl>p>span,
.acquisRelation-merUl>ul>li>span{
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.acquisRelation-merUl>p>span:nth-child(1),
.acquisRelation-merUl>ul>li>span:nth-child(1){
	width: 117px;
	padding-left: 20px;
	box-sizing: border-box;
}
.acquisRelation-merUl>p>span:nth-child(2),
.acquisRelation-merUl>ul>li>span:nth-child(2) {
	width: 154px;
}
.acquisRelation-merUl>p>span:nth-child(3),
.acquisRelation-merUl>ul>li>span:nth-child(3) {
	width: calc(100% - 117px - 154px);
}

.acquisRelation-layout {
	display: flex;
}
.acquisRelation-layout>div:last-child {
	flex: none;
}
.acquisRelation-layout>div:first-child {
	flex: auto;
}

.acquisR-selectDiv{
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

.acquisR-InputDiv{
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

.acquisR-targetDiv{
	margin-top:-179px;
	width:357px;
}

.acquisR-ResourseDiv{
	margin-top:-141px;
	width:353px;
}

.acquisR-criticalDiv{
	margin-top:-73px;
	width:353px;
}

.acquisR-samplfreDiv{
	margin-top:-35px;
	width:353px;
}

.acquisR-samplfreDiv span:hover,.acquisR-criticalDiv span:hover,.acquisR-ResourseDiv span:hover, .acquisR-selectDiv span:hover,.acquisR-targetDiv span:hover{
	background-color: #F1F0F5;
}

.acquisR-selectDivFirst{
	width:357px;
	margin-left:94px;
}
.acquisR-selectDivSecond{
	width:256px;
	margin-left:196px;
}
.acquisR-selectDivthird{
	width: 142px;
	margin-left:310px;
}

.acquisR-samplfreDiv span,.acquisR-criticalDiv span,.acquisR-ResourseDiv span,.acquisR-targetDiv span,.acquisR-selectDiv span{
	display:inline-block;
	width:385px;
	height:30px;
	padding-left:10px;
	text-align:left;
	line-height:30px;
	font-size:14px;
}

.acquisR-selectSpanClick{
	background:#5B62F9 !important;
	color:#fff !important;
}

.acquisR-molDeatil-input>span,.acquisR-model-input>span{
	display:inline-block;
	width:80px;
	height:22px;
	text-align:left;
	line-height:22px;
	font-size: 12px;
}
.acquisR-model-input input{
	cursor:pointer;
	width:78%;
	margin-left:10px;
	background:url(img/app2Repository/objectList/KPICollect/icon-down.png) right center no-repeat;
	margin-top:4px;
	padding-left:10px;
}
.acquisR-molDeatil-input input{
	cursor:pointer;
	width:78%;
	margin-left:10px;
	margin-top:4px;
	padding-left:10px;
}
.acquisRelation-Table{
	padding:20px;
	background:#FAFAFC;
}

.acquisRdisplay{
	display:none;
}

.acquisRHidden{
	display:none;
}

#acquisRelation-molDeatil p,#acquisRelation-mol p{
	margin:0 0 10px 0;
	font-weight: bold;
}

#acquisR_addTableTr{
	line-height:25px;
	text-align:left;
	padding-left:15px;
	font-size:12px;
	color:#999;
	width:100%;
	height:25px;
	background:url(img/button/add-black.png) left center no-repeat !important;
}

#acquisR_Save,#acquisR_Cancel,.KPICollect-opreation i{
	cursor:pointer;
}

.acquisR-pspan{
	display:inline-block;
	width:160px;
	height:2px;
	margin-top:25px;
	background:#5B62F9;
}
.acquisR-tiaozhuan{
	display:inline-block;
	position:absolute;
	margin-top: -30px;
	margin-left: 380px;
	font-size: 12px;
	text-decoration: underline;
	color: #5B62F9;
	cursor:pointer;
}
.acquisRelation-layout .dataTables_filter{
	position: absolute;
	margin-top: -34px;
	right: -350px;	
}
.acquisRelation-trActive{
	background-color:#F1F0F5 !important;
}
</style> 
<section class="panel" style="margin:-20px -20px 0 -20px">
	<p class="title">全局采集关系</p>
	<div class="content">
		<div class="acquisRelation-layout">
	<div>
		<div class="acquisRelation-buttons">
			<button type="button" class="addBtn">新增</button>
			<button type="button" class="editBtn disabled">修改</button>
			<button type="button" class="delBtn disabled">删除</button>
			<button type="button" class="detailBtn disabled">明细</button>
		</div>
		<table id="dataTable" class="display dataTable table acquisRelation-table">
			<thead>
				<tr>
					<th>序号</th>
					<th style="width:180px;">一级分类/二级分类/三级分类</th>
					<th>指标集路径</th>
					<th>指标集</th>
					<th>采集参数</th>
					<th>采集频率(分钟)</th>
					<th>运行状态</th>
					<th></th><!-- kpiset_relationId -->
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<!-- 数据表格End -->
		<!-- 跳转到某页Start -->
		<span class="acquisRelation-jumpPage">跳转到<input id="toPage" type="text" />页</span>
		<!-- 跳转到某页End -->
	</div>
	
	
	<div class="acquisRelation-merUl">
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
	
</section>

<div id="acquisRelation-mol" tabindex="-1" class="modal fade hide" data-backdrop="false" aria-hidden="true">
	<div class="modal-header">
		<button class="close" id="close-modalAr" type="button" data-dismiss="modal">&times;</button>
		<h3 id="molName">修改-采集关系</h3>
	</div>
	<div id="bodyModel" class="modal-body">
		<p>指标集作用范围</p>
		<div class="acquisR-model-input">
			<span><b style="color:red">*</b>分类</span>
			<input readonly="readonly" class="selectBy" type="text" placeholder="一级分类/二级分类/三级分类" />
		</div>
		<div class="acquisR-model-input">
			<span><b style="color:red">*</b>应用对象</span>
			<input readonly="readonly"  class="targetCol" type="text" placeholder="请选择应用对象" />
		</div>
		<div class="acquisR-model-input">
			<span>&nbsp;资源对象</span>
			<input readonly="readonly" class="resourseObject" type="text" placeholder="请选择资源对象" />
		</div>
		<p>指标集配置</p>
		<div class="acquisR-model-input">
			<span><b style="color:red">*</b>关联指标集</span>
			<input readonly="readonly" class="critical" type="text" placeholder="请选择关联指标集" />
		</div>
		<div class="acquisR-model-input">
			<span><b style="color:red">*</b>采集频率(分钟)</span>
			<input class="samplfre" type="text" placeholder="请选择采集频率" />
		</div>
		<div class="acquisR-model-input">
			<span><b style="color:red">*</b>启用状态</span>
			<div id="mol-switch" style="display:inline-block;margin-left:10px;vertical-align:bottom" class="controls">
				<span class="boolean-switch false"></span>
			</div>
		</div>
		<div class="acquisR-selectDiv acquisR-selectDivFirst acquisRHidden"></div>
		<div class="acquisR-selectDiv acquisR-selectDivSecond acquisRHidden"></div>
		<div class="acquisR-selectDiv acquisR-selectDivthird acquisRHidden"></div>
		<div class="acquisR-InputDiv acquisR-targetDiv acquisRHidden"></div>
		<div class="acquisR-InputDiv acquisR-ResourseDiv acquisRHidden"></div>
		<div class="acquisR-InputDiv acquisR-criticalDiv acquisRHidden"></div>
		<div id="table_content" class="acquisRelation-Table acquisRdisplay">
			<p>参数配置</p>
			<table id="acqparamSetTable" style="table-layout: auto;" class="table dataTable">
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
						<td colspan="4"><div id="acquisR_addTableTr" style="">添加</div></td>
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

<div id="acquisRelation-molDeatil" tabindex="-1" class="modal fade hide" data-backdrop="false" aria-hidden="true">
	<div class="modal-header">
		<button class="close" id="close-modalDeatilAr" type="button" data-dismiss="modal">&times;</button>
		<h3>查看-采集关系</h3>
	</div>
	<div id="bodyModel" class="modal-body">
		<p>指标集作用范围</p>
		<div class="acquisR-molDeatil-input">
			<span>分类</span>
			<input readonly="readonly" class="selectBy" type="text"/>
		</div>
		<div class="acquisR-molDeatil-input">
			<span>应用对象</span>
			<input readonly="readonly"  class="targetCol" type="text"/>
		</div>
		<div class="acquisR-molDeatil-input">
			<span>资源对象</span>
			<input readonly="readonly" class="resourseObject" type="text"/>
		</div>
		<p>指标集配置</p>
		<div class="acquisR-molDeatil-input">
			<span>关联指标集</span>
			<input readonly="readonly" class="critical" type="text"/>
		</div>
		<div class="acquisR-molDeatil-input">
			<span>采集频率(分钟)</span>
			<input readonly="readonly" class="samplfre" type="text"/>
		</div>
		<div class="acquisR-molDeatil-input">
			<span>应用状态</span>
			<div id="molDeatil-switch" style="display:inline-block;margin-left:10px;vertical-align:bottom" class="controls">
				<span class="readonly boolean-switch false true"></span>
			</div>
		</div>
		<div id="table_content" class="acquisRelation-Table">
			<p>参数配置</p>
			<table id="acquisR_Details" style="table-layout: auto;" class="table dataTable">
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
