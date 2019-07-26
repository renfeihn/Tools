<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>


<style>
  #configView {
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  #configView>.layout {
  	display: flex;
  }
  #configView>.layout:nth-child(1) {
  	height: 240px;
  	margin-bottom: 20px;
  }
  #configView>.layout:nth-child(1)>div {
  	flex: 1;
  	display: flex;
  }
  #configView>.layout:nth-child(2) {
  	height: calc(100% - 260px);
  }
  #configView>.layout:nth-child(1)>div:nth-child(1),
  #configView>.layout:nth-child(2)>section:nth-child(1) {
  	margin-right: 20px;
  }
  #configView>.layout:nth-child(2)>section {
  	flex: 1;
    border: 1px solid #e5e5e5;
  }
  #configView button.rmdf {
    border: none;
    background-color: transparent;
  }
  
  #configView #start,
  #configView #stop {
    color: white;
  }
  
  #configView #start>i,
  #configView #stop>i {
    font-size: 1rem;
  }
  
  #configView .modal {
    width: 900px;
  }
  
  #configView .modal>.modal-body .dataTables_length {
    display: block;
    float: right;
    margin-top: -3px;
  }
  
  #configView .modal>.modal-body .searchbox {
    margin-bottom: 5px;
    z-index: 2;
    position: absolute;
  }
  
  #configView .layout-left>section {
  	flex: 1;
    border: 1px solid #e5e5e5;
    height: 100%;
  }
  #configView .layout-left>section:nth-child(2) {
   	margin: 0 10px;
  }
  #configView .layout-right>section {
    flex: 1;
    height: 100%;
    border: 1px solid #e5e5e5;
  }
  
  #configView>.layout:nth-child(1)>section:nth-child(2),
  #configView>.layout:nth-child(1)>section:nth-child(3),
  #configView>.layout:nth-child(1)>section:nth-child(4) {
    margin-left: 10px;
  }
  
  #configView .small>.title,
  #configView>.layout:nth-child(2)>section:nth-child(2)>.title {
    height: 38px;
    padding-left: 15px;
    line-height: 38px;
    background: #fafafa;
    border-bottom: 1px solid #e5e5e5;
  }
  
  #configView .small>.container {
    width: 100%;
    height: calc(100% - 39px);
    display: flex;
    flex-wrap: wrap;
  }
  
  #configView .small>.container>div:hover {
    cursor: pointer;
  }
  
  #configView #ziyuan,
  #configView #strategy {
    height: 45%;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    font-size: 34px;
    font-weight: 900;
    background: #F7F7FA;
    border-radius: 4px;
    margin: 6px 12px 0;
  }
  
  #configView #ziyuan:before,
  #configView #strategy:before {
    content: '监控对象总数';
    display: block;
    margin: 16px 0;
    font-size: 14px;
    font-weight: 100;
  }
  
  #configView #strategy:before {
    content: '策略总数';
  }
  
  #configView #monitoring,
  #configView #unmonitoring,
  #configView #unlaunch2,
  #configView #launch2 {
    height: 40%;
    width: calc(50% - 16px);
    text-align: center;
    font-size: 32px;
    font-weight: 900;
    border-radius: 4px;
    background-color: #5b62f9;
  }
  
  #configView #monitoring,
  #configView #launch2 {
    border-right: 1px solid #e5e5e5;
    margin: 2px 2.5px 0 13px;
    color: white;
    margin-bottom: 10px;
  }
  
  #configView #unmonitoring,
  #configView #unlaunch2 {
    background: #FA594D;
    color: white;
    margin: 2px 5px 0 2.5px;
  }
  
  #configView #monitoring:before,
  #configView #unmonitoring:before,
  #configView #unlaunch2:before,
  #configView #launch2:before {
    content: '已监控';
    display: block;
    margin: 12px 0;
    font-size: 14px;
    font-weight: 100;
  }
  
  #configView #unmonitoring:before {
    content: '未监控';
  }
  
  #configView #unlaunch2:before {
    content: '未启用';
  }
  
  #configView #launch2:before {
    content: '已启用';
  }
  
  #configView #unlaunch {
    height: 45%;
    width: 100%;
    text-align: center;
    font-size: 14px;
    border-radius: 4px;
    margin: 10px 12px 0;
    font-size: 34px;
  }
  
  #configView #launch {
    height: 40%;
    width: 100%;
    text-align: center;
    font-size: 14px;
    border-radius: 4px;
    margin: 3px 12px 0;
    font-size: 34px;
  }
  
  #configView #launch,
  #configView #unlaunch {
    color: #FFF;
    font-weight: 900;
    border-bottom: 1px solid #e5e5e5;
    background: #5b62f9;
  }
  
  #configView #unlaunch,
  #configView #unnormal {
    background: #FA594D;
    color: white;
    border-right: 1px solid #e5e5e5;
  }
  
  #configView #unlaunch:before {
    content: '未启动';
  }
  
  #configView #launch:before {
    content: '已启动';
  }
  
  #configView #unnormal:before {
    content: '采集异常';
  }
  
  #configView #normal:before {
    content: '正常';
  }
  
  #configView #unlaunch:before,
  #configView #launch:before,
  #configView #unnormal:before,
  #configView #normal:before {
    margin-right: 5px;
    font-size: 14px;
    font-weight: 100;
    display: block;
    margin: 12px 0;
  }
  
  #configView #echart1Container,
  #configView #echart2Container {
    height: 200px;
  }
  
  #configView #echart1,
  #configView #echart2 {
    height: 100%;
  }
  
  #configView #table1,
  #configView #table2,
  #configView #table3 {
    border-top: none;
  }
  
  #configView #table1 th,
  #configView #table2 th,
  #configView #table3 th {
    text-align: center;
  }
  
  #configView>section:nth-child(6) {
    width: calc(55% - 38px);
    margin: 10px 0 0 10px;
    border: 1px solid #e5e5e5;
  }
  
  #configView .search-margin-bottom-0 {
    margin: 0 10px 0 0;
    padding: 0;
    height: 22px;
    width: 100px;
  }
  
  #configView .input-margin-bottom-0 {
    margin: 0 10px 0 0;
    width: 100px;
  }
</style>
<div id="configView">
	<div class="layout">
		<div class="layout-left">
			<section class="small">
			    <div class="title">监控对象统计</div>
			    <div class="container">
			      <div id="ziyuan" data-role="total"></div>
			      <div id="monitoring" data-role="open"></div>
			      <div id="unmonitoring" data-role="closed"></div>
			    </div>
			  </section>
			  <section class="small">
			    <div class="title">监控采集项统计</div>
			    <div class="container">
			      <div id="unlaunch" data-role="online"></div>
			      <div id="launch" style="margin-bottom: 10px;" data-role="offline"></div>
			    </div>
			  </section>
			  <section class="small">
			    <div class="title">报警策略统计</div>
			    <div class="container">
			      <div id="strategy" data-role="">0</div>
			      <div id="launch2" data-role="">0</div>
			      <div id="unlaunch2" data-role="">0</div>
			    </div>
		  </section>
		</div>
		<div class="layout-right">
			<section>
			    <ul class="nav nav-tabs nav-public">
			      <li>
			        <a id="tab1" href="#app1" data-toggle="tab">监控完整度</a>
			      </li>
			    </ul>
			    <div id="echart1Container">
			      <div id="echart1"></div>
			    </div>
			  </section>
		</div>
	</div>
	<div class="layout">
		<section>
		    <ul class="nav nav-tabs nav-public">
		      <li>
		        <a id="tab3" href="#app1" data-toggle="tab">待确认</a>
		      </li>
		      <li>
		        <a id="tab4" href="#app2" data-toggle="tab">待补充</a>
		      </li>
		    </ul>
		    <div id="table1Container">
		      <table id="table1" class="display dataTable table">
		        <thead>
		          <tr>
		            <th>对象类型</th>
		            <th>对象名称</th>
		            <th>确认项</th>
		            <th>数据来源</th>
		            <th>操作</th>
		          </tr>
		        </thead>
		      </table>
		    </div>
		    <div id="table2Container">
		      <table id="table2" class="display dataTable table">
		        <thead>
		          <tr>
		            <th>对象类型</th>
		            <th>对象名称</th>
		            <th>补充项</th>
		            <th>状态</th>
		            <th>操作</th>
		          </tr>
		        </thead>
		      </table>
		    </div>
		  </section>
		  <section>
		    <div class="title">最新动态</div>
		    <div>
		      <table id="table3" class="display dataTable table">
		        <thead>
		          <tr>
		            <th>日期</th>
		            <th>时间</th>
		            <th>操作人</th>
		            <th>操作对象</th>
		            <th>动作</th>
		            <th>查看</th>
		          </tr>
		        </thead>
		      </table>
		    </div>
		  </section>
	</div>


  
  <div class="modal fade hide" id="objListModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close rmdf" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h3>监控对象统计</h3>
    </div>
    <div class="modal-body">
			<div class="searchbox">
				<button id="start" type="button" disabled="disabled" class="btn btn-inverse hvr-radial-out">
					<i class="fa fa-play"></i>&nbsp;开始监控
				</button>
				<button id="stop" type="button" disabled="disabled" class="btn btn-inverse hvr-radial-out">
					<i class="fa fa-stop"></i>&nbsp;停止监控
				</button>
			</div>
			<table id="objListTable" class="display dataTable table" style="width: 100%;">
				<thead>
					<tr>
						<th><input id="checkboxAll" type="checkbox" /></th>
						<th>一级分类</th>
						<th>二级分类</th>
						<th>三级分类</th>
						<th>对象名称</th>
						<th>IP地址</th>
						<th>所属服务器</th>
						<th>监控状态</th>
					</tr>
				</thead>
			</table>
		</div>
    <div class="modal-footer">
      <button type="button" class="cancelBtn" data-dismiss="modal">关闭</button>
    </div>
  </div>
  <div class="modal fade hide" id="strategyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close rmdf" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h3>报警策略统计</h3>
    </div>
    <div class="modal-body">
      <div class="searchbox">
        <span>类型：</span>
        <select name="type" class="search-margin-bottom-0">
          <option value="0">全部</option>
          <option value="1">个性</option>
          <option value="2">标准</option>
        </select>
        <i class="fa fa-refresh" id="refresh" style="cursor: pointer;"></i>
      </div>
      <table id="strategyTable" class="display dataTable table" style="width:100%;table-layout: fixed;">
        <thead>
          <tr>
           	<th><input id="checkboxAll" type="checkbox" /></th>
            <th>对象名称</th>
            <th>触发器名称</th>
            <th>指标</th>
            <th>指标英文名</th>
            <th>报警策略名称</th>
            <th>事件类型</th>
            <th>消息模板</th>
            <th>是否启动 </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="modal-footer">
      <button type="button" class="cancelBtn" data-dismiss="modal">关闭</button>
    </div>
  </div>
  <div class="modal fade hide" id="KPIModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close rmdf" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h3>监控采集项统计</h3>
    </div>
    <div class="modal-body">
      <div class="searchbox">
        <span>类型：</span>
        <select name="type" class="search-margin-bottom-0">
          <option value="0">全部</option>
          <option value="1">个性</option>
          <option value="2">标准</option>
        </select>
        <i class="fa fa-refresh" id="refresh" style="cursor: pointer;"></i>
      </div>
      <table id="KPITable" class="display dataTable table" style="width:100%;table-layout: fixed;">
        <thead>
          <tr>
            <th>对象类型</th>
            <th>采集器(ID)</th>
            <th>采集器名称</th>
            <th>采集方式</th>
            <th>采集频率(秒)</th>
            <th>类型</th>
            <th>启动状态</th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="modal-footer">
      <button type="button" class="cancelBtn" data-dismiss="modal">关闭</button>
    </div>
  </div>
</div>