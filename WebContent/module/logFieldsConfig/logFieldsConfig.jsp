<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<style>
  	.CodeMirror { height: auto; border: 1px solid #ddd; font-size: 14px;}
  	.CodeMirror pre { padding-left: 7px; line-height: 1.25; box-shadow: none;}
  	.logFieldsConfig-config-ctn .log-form .control-label{
		  width: 75px;
      text-align: left;
  	}
  	.logFieldsConfig-config-ctn .log-form .controls{
  		margin-left: 90px;
      margin-right: 10px;
  	}
    .log-form .control-group:nth-child(2n){
      padding-left: 10px;
      box-sizing: border-box;
    }
    .log-form .control-group:nth-child(2n) .controls{
      margin-right: 0;
    }
  	.logFieldsConfig-config-ctn .log-form input[type=text]{
  		width: 100%;
  		padding: 0 10px;
	  }
 	  .logFieldsConfig-config-ctn .log-form input[type=radio]{
		margin-top: 0;
		margin-right: 5px;
  	}
  	.logFieldsConfig-config-ctn .log-form input[type=radio]:nth-child(n+2){
		margin-left: 50px;
  	}
  	.logFieldsConfig-config-ctn {
  		padding: 20px;
  	}
  	.logFieldsConfig-config-ctn .log-form {
  		position: relative;
  	}
  	/*.logFieldsConfig-config-ctn .log-form:after {
  		content: '';
  		display: block;
  		position: absolute;
  		bottom: -20px;
  		left: 0;
  		width: 100%;
  		height: 1px;
  		background: #ddd;
  	}*/
  	.logFieldsConfig-detail-ctn,
  	.logFieldsConfig-config-ctn {
  		display: none;
  	}
  	.logFieldsConfig-config-ctn>.save-btn {
  		width: 80px;
  		height: 34px;
  		background: #5b62f9;
  		color: white;
	  	border: 1px solid #5b62f9; 
	  	position: absolute;
  		right: 20px;
  		top: 138px;
	}
  	.logFieldsConfig-head {
  		width: 100%;
  		height: 70px;
  		box-sizing: border-box;
  		padding: 15px 20px;
  		background: #FAFAFC;
  		line-height: 40px;
  	}
  	.logFieldsConfig-head>h3,
  	.logFieldsConfig-head>p {
  		margin: 0;
  		float: left;
  	}
  	.logFieldsConfig-head>h3 {
  		font-size: 30px;
    	font-weight: bold;
  	}
  	.logFieldsConfig-head>p {
		margin-left: 10px;
		line-height: 47px;
  	}
  	.logFieldsConfig-btn-ctn {
  		float: right;
  		/*margin-right: -20px;*/
      line-height: 37px;
  	}
  	.logFieldsConfig-btn-ctn>div {
  		display: inline-block;
  		margin-right: 20px;
  		font-size: 16px;
  	}
  	.logFieldsConfig-btn-ctn>p {
  		display: inline-block;
  		/* width: 80px; */
  		height: 30px;
  		line-height: 30px;
  		padding: 0 10px;
  		/* background: #5A5EB5;
  		color: #fff; */
   		cursor: pointer;
   		margin-right: 20px;
   		border-radius: 4px;
   		font-size: 12px;
   		border: 1px solid #c7c6cc;
      margin-bottom: 0;
  	}
  	/*.logFieldsConfig-btn-ctn>p>span {
  		float: right;
  	}*/
  	.logFieldsConfig-nav {
  		height: 39px;
  		/*background: #EBEBFA;*/
      background: #fafafc;
  		margin: 0;
  		padding: 0;
  		/*border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;*/
      border-bottom: 1px solid #ebebed;
  		border-top: 1px solid #ebebed;
  	}
  	.logFieldsConfig-nav>li {
  		float: left;
  		line-height: 40px;
  		padding: 0 20px;
  		box-sizing: border-box;
  		position: relative;
  		cursor: pointer;
  	}
  	.logFieldsConfig-nav>li.active {
  		color: #5B62F9;
  		cursor: default;
  	}
  	.logFieldsConfig-nav>li:hover {
  		color: #5B62F9;
  	}
  	.logFieldsConfig-nav>li.active:after {
  		content: '';
  		display: block;
  		position: absolute;
  		width: 100%;
  		height: 2px;
  		background: #5B62F9;
  		left: 0;
  		bottom: 0;
  	}
  	.logFieldsConfig-body {
  		width: 100%;
  		height: calc(100vh - 261px);
  		background: #fff;
  	}
  	.logFieldsConfig-field-ctn {
  		float: left;
  		width: 350px;
  		box-sizing: border-box;
    	height: calc(100vh - 261px);
		overflow: hidden;
		background: #FAFAFC;
  	}
  	.logFieldsConfig-configs-ctn {
  		width: 100%;
  		box-sizing: border-box;
  		padding-left: 350px;
  		height: calc(100vh - 261px);
  	}
  	.logFieldsConfig-field-ctn .addBtn {
  		width: 310px;
  		box-sizing: border-box;
  		border: 1px solid #ddd;
  		height: 35px;
  		line-height: 35px;
  		text-align: center;
  		border-radius: 4px;
  		margin: auto;
  		color: #5B62F9;
  		background: #fff;
  		cursor: pointer;
  		margin-bottom: 5px;
  		margin-top: 15px;
  	}
  	.logFieldsConfig-field-ctn ul {
  		margin: 0;
  		height: calc(100vh - 311px);
  		overflow-y: auto;
  	}
  	.logFieldsConfig-field-ctn ul li {
  		box-sizing: border-box;
  		padding: 10px 20px;
  		white-space: nowrap;
  		cursor: pointer;
  	}
  	.logFieldsConfig-field-ctn ul li.active {
  		color: #5B62F9;
  		background: #E6E6F2;
  		cursor: default;
  	}
  	.logFieldsConfig-field-ctn ul li:hover {
  		color: #5B62F9;
  	}
  	.logFieldsConfig-field-ctn ul li:hover span:nth-child(1) {
  		background: #5B62F9;
  	}
  	.logFieldsConfig-field-ctn ul li.active span:nth-child(1) {
  		background: #5B62F9;
  	}
  	.logFieldsConfig-field-ctn ul li span {
  		display: inline-block;
  	}
  	.logFieldsConfig-field-ctn ul li span:nth-child(1) {
  		width: 20px;
  		height: 20px;
  		border-radius: 4px;
  		line-height: 20px;
  		text-align: center;
  		background: #929099;
  		color: #fff;
  		margin-right: 10px;
  	}
  	.logFieldsConfig-field-ctn ul li span:nth-child(2),
  	.logFieldsConfig-field-ctn ul li span:nth-child(3) {
  		margin-right: 10px;
  		width: 125px;
  		overflow: hidden;
  		white-space: nowrap;
  		text-overflow: ellipsis;
  		vertical-align: middle;
  		text-align: center;
  	}
  	.logFieldsConfig-field-ctn ul li span:nth-child(4) {
  		width: 10px;
  	}
  	.logFieldsConfig-config-ctn .control-group {
  		height: 25px;
      display: inline-block;
      width:calc(50% - 2px);
  	}
  	.logFieldsConfig-config-ctn .useTemplate {
  	    position: relative;
	    left: 50px;
	    text-decoration: underline;
	    color: #5B62F9;
  	}
  	.logFieldsConfig-config-ctn .baseInfo-head {
  		height: 40px;
  	}
  	.logFieldsConfig-configs-ctn .afe-ctn,
  	.logFieldsConfig-configs-ctn .python-ctn,
  	.logFieldsConfig-configs-ctn .groovy-ctn {
  		display: none; 
  		height: 500px;
  		height: calc(100vh - 580px);
  		overflow-y: auto;
  	}
  	.logFieldsConfig-detail-ctn {
  		height: calc(100vh - 261px);
  		box-sizing: border-box;
  		padding: 20px;
 	}
  	.logFieldsConfig-detail-ctn .detail-ctn {
  		display: none; 
  		height: calc(100vh - 301px);
  		overflow-y: auto;
  	}
  	.logFieldsConfig-selectTmp {
  		width: 1000px !important;
  		left: 50% !important;
  		margin-left: -500px;
  	}
  	.logFieldsConfig-search-box {
  		text-align: center;
  		position: relative;
  	}
  	.logFieldsConfig-search-box input {
  		width: 500px;
	    height: 36px;
	    box-sizing: border-box;
	    padding: 0 35px 0 90px;
  	}
  	.logFieldsConfig-search-box select {
  		position: absolute;
	    top: 6px;
	    left: 236px;
	    width: 80px;
	    background: #ddd;
  	}
  	.logFieldsConfig-search-box i {
  		position: absolute;
	    top: 9px;
	    font-size: 18px;
	    left: 703px;
	    cursor: pointer;
  	}
  	.logFieldsConfig-search-ctn {
  		border: 1px solid #ddd;
  		border-radius: 4px;
  	}
  	.logFieldsConfig-modal-field-ctn {
  		display: block;
	    height: 300px;	    
	    border-radius: 4px;
	    float: left;
  	}
  	.logFieldsConfig-modal-field-ctn ul {
  		margin: 0;
  		width: 250px;
  		background: #FAFAFC;
  		height: 300px;
  		overflow-y: auto;	
  	}
  	.logFieldsConfig-modal-field-ctn ul li {
	    box-sizing: border-box;
	    padding: 6px 20px;
	    white-space: nowrap;
	    cursor: pointer;
	}
	.logFieldsConfig-modal-field-ctn ul li span {
		display: inline-block;
	}
	.logFieldsConfig-modal-field-ctn ul li span:nth-child(1),
	.logFieldsConfig-modal-field-ctn ul li span:nth-child(2) {
		width: 90px;
		margin-right: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: middle;		
	}
	.logFieldsConfig-modal-field-ctn ul li span:nth-child(3) {
		width: 10px;
	}
	.logFieldsConfig-modal-field-ctn ul li.active {
		color: #5B62F9;
    	background: #E6E6F2;
    	cursor: default;
	}
	.logFieldsConfig-modal-field-ctn ul li:hover {
		color: #5B62F9;
	}
	.logFieldsConfig-modal-field-config-ctn {
		margin-left: 250px;
		height: 300px;
	}
	.logFieldsConfig-modal-field-config-ctn .tmp-ctn {
		height: 300px;
		display: none;
		overflow-y: auto;
	}
	.logFieldsConfig-config-ctn .CodeMirror-scroll {
		height: calc(100vh - 512px);
	}
	.logFieldsConfig-detail-ctn .CodeMirror-scroll {
		height: calc(100vh - 303px);
	}
	.logFieldsConfig-modal-field-config-ctn .CodeMirror-scroll {
		height: 298px;
	}
</style>

<div style="margin: 0;">
	<div class="logFieldsConfig-head">
    <i class="fa fa-cogs" style="float: left;font-size: 40px;margin-right: 20px;color: #595faf;"></i>
		<h3 id='category3'></h3>
		<p id="objectName"></p>
		<!-- <div class="logFieldsConfig-btn-ctn">
			<div>已配置:</div>
			<p id="afeDetailBtn">AFE<span id="afeCount">0</span></p>
			<p id="pythonDetailBtn">PYTHON<span id="pythonCount">0</span></p>
			<p id="groovyDetailBtn">GROOVY<span id="groovyCount">0</span></p>
		</div> -->
	</div>
	<!-- <ul id="fieldNav" class="logFieldsConfig-nav">
		<li class="active">公有字段</li>
		<li>私有字段</li>
    <div class="logFieldsConfig-btn-ctn">
      <p id="afeDetailBtn">AFE (<span id="afeCount">0</span>)</p>
      <p id="pythonDetailBtn">PYTHON (<span id="pythonCount">0</span>)</p>
      <p id="groovyDetailBtn">GROOVY (<span id="groovyCount">0</span>)</p>
    </div>
	</ul> -->
  <ul id="fieldNav" class="nav nav-tabs nav-underLine">
    <li class="active"><a href="#tabs1" data-toggle="tab">公有字段</a></li>
    <li><a href="#tabs1" data-toggle="tab">私有字段</a></li>
    <div class="logFieldsConfig-btn-ctn">
      <p id="afeDetailBtn">AFE (<span id="afeCount">0</span>)</p>
      <p id="pythonDetailBtn">PYTHON (<span id="pythonCount">0</span>)</p>
      <p id="groovyDetailBtn">GROOVY (<span id="groovyCount">0</span>)</p>
    </div>
  </ul>
	<section class="logFieldsConfig-body">
		<div id="publicFieldCtn" class="logFieldsConfig-field-ctn" style="display: block;">
			<ul>
				<!-- <li><span>S</span><span>fieldName</span><span>特殊公有字段</span><span>p</span></li>
				<li><span>I</span><span>fieldName</span><span>特殊公有字段</span><span>p</span></li>
				<li class="active"><span>S</span><span>fieldName</span><span>特殊公有字段</span><span>p</span></li> -->
			</ul>
		</div>
		<div id="privateFieldCtn" class="logFieldsConfig-field-ctn" style="display: none;">
			<div id="addBtn" class="addBtn"><span style="font-size: 25px; vertical-align: middle; position: relative; top: -5px;'">+</span> 新增节点</div>
			<ul>
				<!-- <li><span>S</span><span>fieldName</span><span>特殊字段</span><span>p</span></li>
				<li class="active"><span>I</span><span>fieldName</span><span>特殊字段</span><span>p</span></li>
				<li><span>S</span><span>fieldName</span><span>特殊字段</span><span>p</span></li> -->
			</ul>
		</div>		
		<div class="logFieldsConfig-configs-ctn">
			<!-- 配置容器 -->
			<div id="configCtn" class="logFieldsConfig-config-ctn" style="position: relative; height: calc(100vh - 301px);">				
				<div class="baseInfo-ctn">
          <section class="panel">
            <p class="title">基本信息
              <button id="delBtn" type="button" style="float: right;margin-top: 7px;" class="delBtn">删除</button>
              <button id="editBtn" type="button" style="float: right; margin-right: 15px;margin-top: 7px;" class="editBtn">编辑</button>
            </p>
            <div class="content">
              <form class="form-horizontal log-form" style="margin: 0;padding-left: 30px;">
                <div class="control-group">
                  <label class="control-label">字段名称</label>
                  <div class="controls">
                    <input class="input-box text-box" type="text" id="fieldName" autocomplete="off" disabled oninput="value=value.replace(/[\W]/g,'')"/>
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label">字段描述</label>
                  <div class="controls">
                    <input class="input-box text-box" type="text" id="fieldDescript" autocomplete="off" disabled/>
                  </div>
                </div>
                <div class="control-group" style="margin: 0;">
                  <label class="control-label">字段类型</label>
                  <div class="controls">
                    <select id="fieldType" class="input-box text-box" style="width: 100%;" disabled>
                      <option value="String">String</option>
                      <option value="Bytes">Bytes</option>
                      <option value="Integer">Integer</option>
                      <option value="Long">Long</option>
                        </select>
                  </div>
                </div>
                <div class="control-group">
                  <label class="control-label">匹配规则</label>
                  <div class="controls">
                    <input class="input-box text-box" type="text" id="logregex" autocomplete="off" disabled/>
                  </div>
                </div>
                <div class="control-group" style="margin: 0;">
                  <label class="control-label">分类拆分方式</label>
                  <div class="controls type-devide">
                    <input id="afeRadio" class="input-box" type="radio" id="visualConfiger" name="classType" data-way="0" disabled/>可视化配置
                    <input id="pythonRadio" class="input-box" type="radio" id="pythonConfiger" name="classType" data-way="1" disabled/>python脚本
                    <input id="groovyRadio" class="input-box" type="radio" id="groovyConfiger" name="classType" data-way="2" disabled/>groovy脚本
                    <!-- <a class="useTemplate" style="display: none;">引用字段</a> -->
                  </div>
                </div>
              </form>
            </div>
          </section>
					<!-- <div class="baseInfo-head">
						<span style="font-size: 18px;">基本信息</span>
						<button id="delBtn" type="button" style="float: right;" class="delBtn">删除</button>
						<button id="editBtn" type="button" style="float: right; margin-right: 15px;;" class="editBtn">编辑</button>		
					</div>
					<form class="form-horizontal log-form">
						<div class="control-group">
							<label class="control-label">字段名称</label>
							<div class="controls">
								<input class="input-box text-box" type="text" id="fieldName" autocomplete="off" disabled/>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">字段描述</label>
							<div class="controls">
								<input class="input-box text-box" type="text" id="fieldDescript" autocomplete="off" disabled/>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">字段类型</label>
							<div class="controls">
								<select id="fieldType" class="input-box text-box" style="width: 600px;" disabled>
									<option value="string">String</option>
									<option value="bytes">Bytes</option>
									<option value="integer">Integer</option>
									<option value="long">Long</option>
					       		</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label">分类拆分方式</label>
							<div class="controls type-devide">
								<input id="afeRadio" class="input-box" type="radio" id="visualConfiger" name="classType" data-way="0" disabled/>可视化配置
								<input id="pythonRadio" class="input-box" type="radio" id="pythonConfiger" name="classType" data-way="1" disabled/>python脚本
								<input id="groovyRadio" class="input-box" type="radio" id="groovyConfiger" name="classType" data-way="2" disabled/>groovy脚本
								<a class="useTemplate" style="display: none;">引用字段</a>
							</div>
						</div>
					</form> -->
          <section class="panel">
            <p class="title">脚本信息</p>
            <div class="content" style="padding: 0;">
              <div class="afe-ctn" id="afeConfigCtn" style="box-sizing: border-box; overflow-y: auto">
              </div>
              <div class="python-ctn" id="pythonConfigCtn">
                    <textarea></textarea> 
              </div>
              <div class="groovy-ctn" id="groovyConfigCtn">
                    <textarea></textarea>
              </div> 
            </div>
          </section>  

				</div>
				<div id="btnCtn" style="position: absolute; bottom: 14px; right: 20px;">
	        		<button id="returnBtn" type="button" class="cancelBtn disabled" style="width: 80px; margin-right: 20px;">重置</button>
	        		<button id="saveBtn" type="button" class="confirmBtn disabled" style="width: 80px;">保存</button>
	        	</div>
			</div>					
			
			<!-- 详情容器 -->
			<div id="detailCtn" class="logFieldsConfig-detail-ctn">
				<div class="detail-ctn" id="pythonDetailCtn">
	        		<textarea></textarea> 
	        	</div>
	        	<div class="detail-ctn" id="groovyDetailCtn">
	        		<textarea></textarea>
	        	</div>        	
	        	<div class="detail-ctn" id="afeDetailCtn" style="border: 1px solid #ddd;"></div>
			</div>
		</div>
	</section>
</div>

<!-- 模板模态框 -->
<div id="selectTmp" class="modal hide fade logFieldsConfig-selectTmp" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">搜索模板</h3>
	</div>
	<div class="modal-body">
		<div class="logFieldsConfig-search-box">
			<select>
				<option value="ALl">全部</option>
				<option value="AFE">AFE</option>
				<option value="PYTHON">PYTHON</option>
				<option value="GROOVY">GROOVY</option>
			</select>
			<input type="text"/>
			<i class="fa fa-search"></i>
		</div>
		<div class="logFieldsConfig-search-ctn">
			<div id="tmpFieldCtn" class="logFieldsConfig-modal-field-ctn">
				<ul>
					<li><span>fieldName</span><span>特殊公有字段</span><span>p</span></li>
					<li class="active"><span>fieldName</span><span>特殊公有字段</span><span>p</span></li>
					<li><span>fieldName</span><span>特殊公有字段</span><span>p</span></li>
				</ul>
			</div>
			<div class="logFieldsConfig-modal-field-config-ctn">
				<div class="tmp-ctn" id="pythonTmpCtn">
	        		<textarea></textarea> 
	        	</div>
	        	<div class="tmp-ctn" id="groovyTmpCtn">
	        		<textarea></textarea>
	        	</div>        	
	        	<div class="tmp-ctn" id="afeTmpCtn"></div>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button id="cancelBtn" type="button" class="cancelBtn">取消</button>
		<button id="allAddBtn" type="button" class="confirmBtn">选择</button>
	</div>
</div>
