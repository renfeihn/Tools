<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.appRelation-ctn ul {
		margin: 0;
	}
	.appRelation-box {
		position: relative;
		width: 340px;
		height: 215px;
		border: 1px solid #ddd;
		border-radius: 4px;
		float: left;
		margin: 0 20px 40px 0;
		background: rgb(247, 247, 250);
		cursor: pointer;
	}
	.appRelation-box .fa-trash {
		position: absolute;
		right: 12px;
		top: 10px;
		font-size: 16px;
		color: #aaa;
	}
	.appRelation-box .fa-trash:hover {
		color: #960100;
	}
	.appRelation-box img{
		width: 100%;
		height: 100%;
		border-radius: 4px;
	}
	.appRelation-box.add {
		background: url("img/eventDetails/add.png") center center no-repeat rgb(247, 247, 250);
	}	
	.appRelation-box.add:hover {
		background: url("img/eventDetails/add-blue.png") center center no-repeat rgb(247, 247, 250);
	}
	.appRelation-box .topo-name {
		position: absolute;
		width: 100%;
		bottom: -38px;
		text-align: center;
		font-size: 18px;
	}
</style>

<section class="panel appRelation-ctn" style="margin: 0;border:none;">
	<div class="content" style="box-sizing: border-box; height: calc(100vh - 132px);">
		<ul id="topoCtn" style="height: 100%; overflow-y: auto; margin-right: -20px;">
			<!-- <li class="appRelation-box chart">
				<i class="fa fa-trash" title="删除"></i>
				<img src="./img/topoTmp/cmdbTopo.png"/>
				<p class="topo-name">拓扑图</p>
			</li>
			<li class="appRelation-box add"></li> -->
		</ul>
	</div>
</section>
