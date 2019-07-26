<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<div class="pull-right" style="position: relative; top: 30px; left: -40px; z-index: 1;color: #555;font-weight: 400;font-size: 12px;">
关联事件范围：<select name="" id="interval"  style="margin: 0;font-size: 12px;">
	<option value="1">本事件前后1分钟</option>
	<option value="5">本事件前后5分钟</option>
	<option value="10">本事件前后10分钟</option>
	<option value="30">本事件前后30分钟</option>
</select>
</div>
<div id="eventChart" style="width: 100%; height: 560px;"></div>