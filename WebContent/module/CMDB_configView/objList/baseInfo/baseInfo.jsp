<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.baseInfo-content {
	display: flex;
}
.baseInfo-left {
	flex: none;
	width: 180px;
	margin-right: 20px;
}
.baseInfo-right {
	flex: auto;
}
.baseInfo-content .objectList-os {
    width: 180px;
    height: 120px;
    box-sizing: border-box;
    background-color: #f1f1f7;
    background-position: center 16px;
    background-repeat: no-repeat;
    position: relative;
    overflow: hidden;
}
.baseInfo-content .objectList-os .objectList-image-ctn {
    width: 30%;
    height: 100%;
    background-repeat: no-repeat;
    float: left;
    background-position: center;
    border-radius: 2px;
}
.baseInfo-content .objectList-os>.objectList-image-ctn {
    background-image: url(img/cmdb_icon/server/server-physics.png);
}
.baseInfo-content .objectList-os>.objectList-image-ctn.green {
    background-image: url(img/cmdb_icon/server/server-physics-checked-new.png);
}
.baseInfo-content .objectList-info-ctn {
    width: 70%;
    height: 100%;
    float: left;
}
.baseInfo-content .objectList-info-ctn>#l3_cate_name {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    font-weight: bold;
    padding-left: 10px;
    height: 33%;
    line-height: 38px;
}
.baseInfo-content .objectList-info-ctn>#obj_ip {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 10px;
    font-size: 12px;
    height: 33%;
    line-height: 38px;
}
.baseInfo-content .objectList-info-ctn>.objectList-little {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    padding-left: 5px;
    font-size: 12px;
    height: 34%;
    line-height: 38px;
}
.baseInfo-content .objectList-info-ctn>.objectList-little>span:nth-child(2n+1) {
	display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 12px;
    width: 20px;
    height: 100%;
    float: left;
}
.baseInfo-content .objectList-info-ctn>.objectList-little>.objectList-shape-monitorShow.open {
    background-image: url(img/cmdb_icon/objectstate/object-online.png);
    background-repeat: no-repeat;
    background-position: center;
}
.baseInfo-content .objectList-info-ctn>.objectList-little>span:nth-child(2n) {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    font-size: 12px;
    width: 38px;
    height: 100%;
    float: left;
}
.baseInfo-content .objectList-info-ctn>.objectList-little>.objectList-shape-agentShow.online {
    background-image: url(img/cmdb_icon/objectstate/agent-online.png);
    background-repeat: no-repeat;
    background-position: center;
}
.baseInfo-content .objectList-info-ctn>.objectList-little>.objectList-shape-monitorShow.closed {
    background-image: url(img/cmdb_icon/objectstate/object-offline.png);
    background-repeat: no-repeat;
    background-position: center;
}
.baseInfo-content .objectList-info-ctn>.objectList-little>.objectList-shape-agentShow.offline {
    background-image: url(img/cmdb_icon/objectstate/agent-offline.png);
    background-repeat: no-repeat;
    background-position: center;
}
.baseInfo-content .objectList-info-ctn {
    width: 70%;
    height: 100%;
    float: left;
}
.baseinfo-ul {
	margin: 0;
	display: flex;
	flex-wrap: wrap;
}
.baseinfo-ul>li {
    width: 50%;
    height: 36px;
    line-height: 36px;
    border: solid 1px #bfbaba;
    border-top: none;
    box-sizing: border-box;
}
.baseinfo-ul>li:nth-child(1),
.baseinfo-ul>li:nth-child(2) {
	border-top: solid 1px #bfbaba;
}
.baseinfo-ul>li:nth-child(2n) {
	border-left: none;
}
.baseinfo-ul .label-text {
    display: inline-block;
    width: 30%;
    height: 100%;
    background: #fafafc;
    border-right: solid 1px #bfbaba;
    text-indent: 10px;
    box-sizing: border-box;
    overflow: hidden;
}
.baseinfo-ul .value-text {
	display: inline-block;
    width: 70%;
    height: 100%;
    text-indent: 10px; 
    overflow: hidden;  
}
</style>
<div class="baseInfo-content">
	<div class="baseInfo-left">
		
	</div>
	<div class="baseInfo-right">
		<ul class="baseinfo-ul">
			<li><span class="label-text">中文名</span><span class="value-text">asdd</span></li>
			<li><span class="label-text">中文名</span><span class="value-text">asdd</span></li>
			<li><span class="label-text">中文名</span><span class="value-text">asdd</span></li>
			<li><span class="label-text">中文名</span><span class="value-text">asdd</span></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</div>