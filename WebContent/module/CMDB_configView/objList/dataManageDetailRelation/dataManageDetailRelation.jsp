<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style>
.diagram-ctt {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.modal-manager-topo-relation {
	width: 100%;
    height: 100%;
}
.modal-manager-topo-relation select {
	margin: 0;
}
.modal-manager-topo-relation .operates-wrap {
    position: absolute;
    left: 0;
    right: 160px;
    z-index: 10;
}
.rel-selector {
	float: right;
	margin-right: 20px;
}
#relation_tab .btn-delete {
    color: #2196F3;
    cursor: pointer;	
}
#relation_tab .btn-delete:hover {
	text-decoration: underline;	
}

/* 右侧划窗 */
.modal-manager-topo-relation #addRelation {
	position: fixed;
    top: 40px;
    bottom: 0;
    right: -700px;
    width: 700px;
    z-index: 1050;
    background: #fff;
    transition: all .1s linear;
}
.modal-manager-topo-relation #addRelation #myModalLabel>span {
    display: inline-block;
    padding: 2px 10px;
    cursor: pointer;
}
.modal-manager-topo-relation #addRelation #myModalLabel>span:nth-child(1) {
	border-right: solid 1px #eee;
}
.modal-manager-topo-relation #addRelation #myModalLabel>span.active {
    border-bottom: solid 2px #3198ea;
    background: #e2eaf1;
}
.modal-manager-topo-relation #addRelation.show-modal {
    right: 0;
}
.modal-manager-topo-relation #addRelation>.addRelation-mask {
	display: none;
}
.modal-manager-topo-relation #addRelation.show-modal>.addRelation-mask {
	display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100vw;
    width: 100vw;
    background: rgba(0,0,0,.5);
}
.modal-manager-topo-relation #addRelation .modal-footer {
	text-align: center;
}
.modal-manager-topo-relation #addRelation .more {
    width: 20%;
    text-align: center;
    margin: 4px auto;
    cursor: pointer;
    color: #2196F3;
}
.modal-manager-topo-relation #addRelation .more>i {
    margin-right: 5px;
}
.modal-manager-topo-relation .noshowObj {
	display: none !important;
}
#relation_wrap>div,
#relation_wrap>div>div {
	height: 100%;
}
/* 右侧划窗 完*/

</style>
<div id="modalManageTopo" class="modal-manager-topo-relation" style="width: 100%;height: 100%;">
	<div class="operates-wrap">
		<button type="button" class="editBtn">编辑</button>
		<span class="rel-selector">
			关系方向
			<select name="" id="rel_direction">
				<option value="">全部</option>
				<option value="1">连接我的</option>
				<option value="2">我连接的</option>
			</select>
		</span>
		<span class="rel-selector">
			关系类型
			<select name="" id="rel_type"></select>
		</span>
		
	</div>
	
	<table class="display dataTable table" id="relation_tab"></table>
	
	<div id="addRelation" class="slide-modal" tabindex="-1">
		<div class="addRelation-mask"></div>
		<div class="modal-header" style="padding: 0 20px 0 0;">
			<button class="close" type="button" data-dismiss="modal">×</button>
			<h3 id="myModalLabel">
				<span class="active" data-type="1">上游关系</span><span data-type="2">下游关系</span>
			</h3>
		</div>
		<div class="modal-body" id="relation_wrap" style="max-height: none;height: calc(100% - 80px);">
			
		</div>
		<!-- <div class="modal-footer">
			<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
			<button type="button" data-dismiss="modal" class="confirmBtn" id="addRelation_confirm">保存</button>
		</div> -->
	</div>
	
</div>

