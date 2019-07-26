<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
	.tradeAnalyse-list-item {
		display: grid;
		grid-template-columns: 1fr 200px 150px 150px 150px 75px;
		align-items: center;
		font-size: 12px;
		height: 36px;
	}
	.tradeAnalyse-list-item.item-head {
		height: 40px;
		font-weight: bold;
		background-color: #eeeef1;
	}
	.tradeAnalyse-list-item>div {
		text-indent: 1em;
	}
	.tradeAnalyse-style.boolean-switch.true:before {
    margin-left: 20px;
	}
	.tradeAnalyse-style.boolean-switch:before {
    height: 20px;
    width: 20px;
    border-radius: 22px;
	}
	.tradeAnalyse-style.boolean-switch {
    border-radius: 44px;
	}
	#tradeAnalyseList .tradeAnalyse-list-item:nth-child(2n+1) {
		background-color: #FFF;
	}
	#tradeAnalyseList {
    display: flex;
    max-height: calc(15 * 36px);
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
	}
	#tradeAnalyseList .tradeAnalyse-list-item:nth-child(2n) {
		background-color: #f2f2f5;
	}
	.tradeAnalyse-list-item .link {
		color: var(--color-theme);
		cursor: pointer;
	}
</style>
<div style="height: 30px;display: flex;align-items: center;margin-bottom: 10px;">
	实时刷新：<span class="tradeAnalyse-style boolean-switch true" style="float: none;" id="refreshFlag"></span>
	<div style="flex: auto;display: flex;align-items: center;justify-content: flex-end;">
		关键字：<input type="text" style="margin: 0 20px 0 0;width: 160px;" id="keywords">
		耗时：<select style="margin: 0;" id="duration">
			<option value="0" selected="select">无限制</option>
			<option value="5-30">5ms-30ms</option>
			<option value="30">30ms以上</option>
		</select>
	</div>
</div>
<div class="tradeAnalyse-list-item item-head">
	<div>交易名</div>
	<div>应用系统ID</div>
	<div>开始时间</div>
	<div>结束时间</div>
	<div>IP</div>
	<div>耗时</div>
</div>
<div id="tradeAnalyseList">
</div>














