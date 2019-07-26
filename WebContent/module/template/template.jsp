<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
/* 在模块的页面中，通过style标签定义样式，应该在所起的class命名中加上模块前缀 */
.jumpPage {
	position: absolute;
    z-index: 2;
    height: 24px;
    line-height: 24px;
    margin-top: -24px;
    display: flex;
}
.jumpPage>input {
	width: 38px;
    margin: 0 4px;
}

/* 扇形图 */

/* 饼图样式 */
.pie {
	width: 34px;
	height: 34px;
	position: relative;
	background: #ccc9d8;
	border-radius: 50%;
}

.pie>div {
	width: calc(100% / 2);
	height: 100%;
	position: absolute;
	overflow: hidden;
}

.pie>div.left-mask {
	left: 0;
}
.pie>div.right-mask {
	right: 0;
}
.pie .circle {
	width: 0;
	height: 0;
	border: 17px solid #ccc9d8;
	border-radius: 50%;
	position: absolute;
	transform: rotate(-45deg);
}

.pie>.right-mask>.circle {
	right: 0;
	border-top-color: #5b62f9;
	border-left-color: #5b62f9;
	transition: all linear 0.3s 0.5s;
}
.pie>.left-mask>.circle {
	border-bottom-color: #5b62f9;
	border-right-color: #5b62f9;
	transition: all linear 0.3s 0.8s;
}

/*双杆*/
.doubleRange {
    position: relative;
    width: 300px;
    height: 2px;
    background: #ccc;
    top: 13px;
}
.pro-min, .pro-max {
    position: absolute;
    height: 2px;
    left: 0;
    top: 0;
}
.pro-min {
    background: #ccc;
    z-index: 2;
    width: 30%;
}
.pro-max {
    background: #5B62F9;
    z-index: 1;
    width: 80%;
}
.pro-min>span, .pro-max>span {
    position: absolute;
    width: 30px;
    height: 18px;
    border-radius: 2px;
    background: #5B62F9;
    right: -11px;
    top: -27px;
    text-align: center;
    line-height: 18px;
    color: #fff;
}
.pro-min>span:after, .pro-max>span:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top: 5px solid #5B62F9;
    bottom: -10px;
    left: 10px;
}
.doubleRange .left-point, .doubleRange .right-point {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    right: 0;
    top: -3px;
    background: #fff;
    border: 1px solid #ccc;
    cursor: pointer;
}
}    
.doubleRange .right-point {
    background: #5B62F9;
}
</style>


<section class="panel">
	<p class="title">面板</p>
	<div class="content" style="overflow: hidden;">
		<div style="width:450px; height:200px; float: left; margin-bottom: 20px; margin-right:20px;" id="div1" ></div>
		<div style="width:450px; height:200px; float: left; margin-bottom: 20px; margin-right:20px;" id="div2" ></div>
		<!-- <div class="ajax-loading-mask">
			<div class="maskPic" style="white-space: nowrap; line-height: 3em; color: #fff;">加载中</div>
		</div> -->
	</div>
</section>

<section class="panel">
	<p class="title">面板</p>
	<div class="content" id="test">
		<!-- 数据表格Start -->
		<table id="dataTable" class="display dataTable table">
			<thead>
				<tr>
					<th>序号</th>
					<th>项目标题</th>
					<th>项目标题</th>
					<th>项目标题</th>
					<th>项目标题</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
		<!-- 数据表格End -->
		<!-- 跳转到某页Start -->
		<span class="jumpPage">跳转到<input id="toPage" type="text" />页</span>
		<!-- 跳转到某页End -->
	</div>
</section>


<section class="panel">
	<ul class="nav nav-tabs nav-public">
		<li class="active"><a href="#tabs1" data-toggle="tab">标签页1</a></li>
		<li><a href="#tabs2" data-toggle="tab">标签页2</a></li>
		<li><a href="#tabs3" data-toggle="tab">标签页3</a></li>
		<li><a href="#tabs4" data-toggle="tab">标签页4</a></li>
	</ul>
	<div class="tab-content">
		<div id="tabs1" class="tab-pane active">1</div>
		<div id="tabs2" class="tab-pane">2</div>
		<div id="tabs3" class="tab-pane">3</div>
		<div id="tabs4" class="tab-pane">4</div>
	</div>
</section>

<section class="panel">
	<p class="title">第二类标签页 只需引用class<code>.nav-underLine</code></p>
	<div class="content">
		<ul class="nav nav-tabs nav-underLine">
			<li class="active"><a href="#tabs1" data-toggle="tab">标签页1</a></li>
			<li><a href="#tabs2" data-toggle="tab">标签页2</a></li>
			<li><a href="#tabs3" data-toggle="tab">标签页3</a></li>
			<li><a href="#tabs4" data-toggle="tab">标签页4</a></li>
		</ul>
		<div class="tab-content">
			<div id="tabs1" class="tab-pane active">1</div>
			<div id="tabs2" class="tab-pane">2</div>
			<div id="tabs3" class="tab-pane">3</div>
			<div id="tabs4" class="tab-pane">4</div>
		</div>
	</div>
</section>

<section class="panel">
	<p class="title">第三类标签页 只需在父元素引用class<code>.tabs-left</code></p>
	<div class="content">
		<div class="tabs-left">
			<ul class="nav nav-tabs">
				<li class="active"><a href="#tabs1" data-toggle="tab">标签页1</a></li>
				<li><a href="#tabs2" data-toggle="tab">标签页2</a></li>
				<li><a href="#tabs3" data-toggle="tab">标签页3</a></li>
				<li><a href="#tabs4" data-toggle="tab">标签页4</a></li>
			</ul>
			<div class="tab-content">
				<div id="tabs1" class="tab-pane active">我是标签页1</div>
				<div id="tabs2" class="tab-pane">我是标签页2</div>
				<div id="tabs3" class="tab-pane">我是标签页3</div>
				<div id="tabs4" class="tab-pane">我是标签页4</div>
			</div>
		</div>
	</div>
</section>

<section class="panel">
	<p class="title">表单模板</p><!-- 2级面板标题 -->
	<div class="content"><!-- 2级面板内容 -->
		<form class="form-horizontal">
			<div class="control-group">
				<label for="input1" class="control-label required">必输框</label>
				<div class="controls">
					<input type="text" id="input1" placeholder="这里是必输的" />
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label">开关</label>
				<div class="controls">
					<span class="boolean-switch false"></span>
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label">选择框</label>
				<div class="controls">
					<select name="" id="">
						<option value="1">东莞</option>
						<option value="2">深圳</option>
						<option value="3">西安</option>
					</select>
				</div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label">滑动条</label>
				<div class="controls">
					<div class="range">
						<span class="line" style="width: 100px"></span>
						<span class="ball" id="ran" title="33%" style="margin-left: 100px;"></span>
					</div>
				</div>
			</div>
			<div class="control-group">
			    <label for="input1" class="control-label">双滑动条</label>
			    <div class="controls">
			        <div class="doubleRange" id="dr">
			        	<span class="pro-min">
			        	    <span></span>
			        	    <i class="left-point"></i>
			        	</span>
			        	<span class="pro-max">
			        	    <span></span>
			        	    <i class="right-point"></i>
			        	</span>
			        </div>
			    </div>
			</div>
			<div class="control-group">
				<label for="input1" class="control-label">多行文本框</label>
				<div class="controls">
					<textarea name="" id="" cols="30" rows="5"></textarea>
				</div>
			</div>
		</form>
		
		<button type="button" id="showModal">弹出框模板</button>
		<button type="button" id="normal">常规提示框</button>
		<button type="button" id="success">成功提示框</button>
		<button type="button" id="search">询问提示框</button>
		<button type="button" id="Warn">警告提示框</button>
		<button type="button" id="error">错误提示框</button>
	</div>
</section>

<section class="panel">
	<p class="title">按钮模板</p>
	<div class="content">
		<p>小按钮</p>
		<button type="button" class="addBtn">新增</button>
		<button type="button" class="delBtn">删除</button>
		<button type="button" class="editBtn">修改</button>
		
		<p>按钮不可用</p>
		<button type="button" class="addBtn disabled">新增</button>
		<button type="button" class="delBtn disabled">删除</button>
		<button type="button" class="editBtn disabled">修改</button>
		<button type="button" class="disabled">按钮</button>
		
		<p>大按钮</p>
		<button type="button" class="cancelBtn">取消</button>
		<button type="button" class="confirmBtn">确认</button>
		
		<p>箭头</p>
		<span class="arrows-up"></span>
		<span class="arrows-down"></span>
		
	</div>
</section>

<section class="panel">
	<p class="title">ztree树模板</p>
	<div class="content">
		<ul id="ztreeDemo" class="ztree"></ul>
	</div>
</section>

<section class="panel">
	<p class="title">表格树模板</p>
	<div class="content">
		<table id="treeTable" class="dataTable display table">
			<thead>
				<tr>
					<th>标题-1</th>
					<th>标题-2</th>
					<th>标题-3</th>
				</tr>
			</thead>
			<tbody>
				<tr data-tt-id="s1">
					<td>父节点</td>
					<td>aaa</td>
					<td>aaa</td>
				</tr>
				
				<tr data-tt-id="s2" data-tt-parent-id="s1">
					<td>子节点</td>
					<td>bbb</td>
					<td>bbb</td>
				</tr>
				<tr data-tt-id="s3" data-tt-parent-id="s2">
					<td>子节点</td>
					<td>bbb</td>
					<td>bbb</td>
				</tr>
				<tr data-tt-id="s4" data-tt-parent-id="s3">
					<td>子节点</td>
					<td>bbb</td>
					<td>bbb</td>
				</tr>
			</tbody>
		</table>
	</div>
</section>

<section class="panel">
	<p class="title">面板</p>
	<div class="content">
		<div id="view" class="dev-view-ctt">
			<!-- 拓扑容器Start -->
			<div id="tree" class="dev-view-ctt"></div>
			<!-- 拓扑容器End -->
		</div>
	</div>
</section>

<section class="panel">
	<p class="title">扇形图模板</p>
	<div class="content">
		<div class="pie">
			<div class="left-mask">
				<div id="left_circle" class="circle"></div>
			</div>
			<div class="right-mask">
				<div id="right_circle" class="circle"></div>
			</div>
		</div>
	</div>
</section>

<div id="modal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">弹出框模板</h3>
	</div>
	<div class="modal-body">
		<p>一段文字</p>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
	</div>
</div>
























