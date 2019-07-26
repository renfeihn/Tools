<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.agent-excute {
	padding: 0;
	position: relative;
}
.agent-excute .excute-btn,
.agent-excute .upload-btn {
	padding: 4px 12px;
    background-color: #FFF;
    border: 1px solid var(--color-theme);
    color: var(--color-theme);
    cursor: pointer;
    border-radius: 2px;
   	line-height: 12px;
    margin-left: 10px;
    font-size: 12px;
    font-weight: normal;
    float: right;
}
.agent-excute .excute-btn:hover,
.agent-excute .upload-btn:hover {
	background-color: var(--color-theme);
	color: #fff;
}
.agent-excute .excute-btn.disabled,
.agent-excute .upload-btn.disabled {
	opacity: 0.5;
	filter: grayscale(1);
	pointer-events: none;
}
.agent-excute .table-wrap,
.agent-excute .file-wrap {
    font-size: 12px;
}

.agent-excute .file-wrap {
	margin-bottom: 20px;
	padding-bottom: 20px;
    border-bottom: solid 1px #aaafb3;
}
.table-title,
.table-list>li,
.file-title,
.file-list>li {
	display: flex;
	min-height: 40px;
	align-items: center;
}
.table-title,
.file-title {
    background: #f5f6fa;
}
.table-list>li,
.file-list>li {
	box-sizing: border-box;
    border-bottom: 1px solid #e9eaf2;
}
.table-list,
.file-list {
	margin: 0;
}
.file-list>li {
	cursor: pointer;
}
.table-title>span:nth-child(1),
.table-list>li>span:nth-child(1) {
	flex: none;
	width: 130px;
    text-indent: 4px;
}
.table-title>span:nth-child(2),
.table-list>li>span:nth-child(2)  {
	flex: none;
	width: 110px;
    text-indent: 4px;
}
.table-title>span:nth-child(3),
.table-list>li>span:nth-child(3)  {
	flex: none;
	width: 120px;
    text-indent: 4px;	
}
.table-title>span:nth-child(4),
.table-list>li>span:nth-child(4)  {
	flex: auto;
    text-indent: 4px;
}
.file-title>span:nth-child(1),
.file-list>li>span:nth-child(1) {
	flex: auto;
	text-indent: 4px;
}
.file-title>span:nth-child(2),
.file-list>li>span:nth-child(2) {
	flex: none;
	width: 100px;
	text-indent: 4px;
}
.file-title>span:nth-child(3),
.file-list>li>span:nth-child(3) {
	flex: none;
	width: 140px;
	text-indent: 4px;
}
.file-list>li>span:nth-child(1) input{
	vertical-align: -2px;
    margin-right: 2px;
}
.file-list>li.active {
	background: #e3ebf3;
}
.table-list>li>span:nth-child(3) i {
    transform: scale(.6);
}
.table-list>li>span:nth-child(3) i.success {
	color: #4fbd54;
}
.table-list>li>span:nth-child(3) i.fail {
	color: #F44336;
}

.table-list>li.running {
    background: linear-gradient(to right,#2094f338,#2094f338) no-repeat;
    background-size: 0% 100%;
    background-position: 0% 0%;
    animation: excuting 10s linear 1;
}
.table-list>li.quick-running {
    background: linear-gradient(to right,#2094f338,#2094f338) no-repeat;
    background-size: 0% 100%;
    background-position: 0% 0%;
    animation: excuting 1s linear 1;
}
@keyframes excuting {
	from{
		background-size: 0% 100%;
	}
	to{
		background-size: 100% 100%;
	}
}

</style>
<div class="agent-excute">
	<div class="file-wrap hide">
		<p class="wrap-title" style="font-weight: 600;color: #35383a;">文件列表
			<span class="upload-wrap" style="float: right">
				<input type="file" id="file_val" style="display: none"/>
				<span class="file-name"></span>
				<button class="upload-btn upload-confirm">确定</button>
				<button class="upload-btn upload-file">本地上传</button>
			</span>
		</p>
		<div class="file-title">
			<span>文件名</span><span>文件大小</span><span>更新时间</span>
		</div>
		<ul class="file-list">
		</ul>
	</div>
	<div class="table-wrap">
		<p class="wrap-title" style="font-weight: 600;color: #35383a;">执行列表 <button class="excute-btn">执行</button></p>
		<div class="table-title">
			<span>ip</span><span>操作类型</span><span>执行结果</span><span>执行信息</span>
		</div>
		<ul class="table-list">
			<li>
				<span>1.1.1.1</span>
				<span>PING</span>
				<span>成功</span>
				<span>ping 1.1.1.1 成功</span>
			</li>
			<li>
				<span>1.1.1.1</span>
				<span>PING</span>
				<span>成功</span>
				<span>ping 1.1.1.1 成功</span>
			</li>
			<li>
				<span>1.1.1.1</span>
				<span>PING</span>
				<span>成功</span>
				<span>ping 1.1.1.1 成功</span>
			</li>
		</ul>
	</div>
</div>