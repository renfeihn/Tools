<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<%--页面前缀 escluster--%>
<style type="text/css">
	.escluster-tab-ctn{
	    border: 1px solid #e5e5e5;
	    background-color: #fff;
	    border-radius: 4px;
	    min-height: 930px;
	}
	.escluster-module-name{
		border-bottom: 1px solid #e5e5e5;
	    border-radius: 4px 4px 0 0;
	    width: 100%;
	    background-color: #fafafa;
	}
	#eventTab > li {
	    height: 44px;
	    width: 120px;
	    border-right: 1px solid #e5e5e5;
	}
	#eventTab > li > a {
	    cursor: pointer;
	    line-height: 28px;
	    text-align: center;
	}
</style>

<div class="escluster-tab-ctn">

	<div class="escluster-module-name">
        <ul id="eventTab" class="nav nav-tabs">
           <li class="active underLine" id="appshow" data-role="eventlist">
  	           <a href="#cluster" data-toggle="tab">集群详情</a>
           </li>
           <li class="sysstart-module-list" id="traceshow" data-role="eventlist">
  	           <a href="#node" data-toggle="tab">节点详情</a>
           </li>
           <li class="sysstart-module-list" id="toposhow" data-role="eventlist">
  	           <a href="#index" data-toggle="tab">索引详情</a> 
           </li> 
         </ul>
    </div>
    
    <div id="escluster-module-content"></div>
</div>