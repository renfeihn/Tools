<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false"%>
<style type="text/css">
	.link-table * {
		box-sizing: border-box;
	}
	.link-table {
		width: 100%;
		position: relative;
		-webkit-border-vertical-spacing: 6px;
		border-collapse: separate;
	}
	.link-table td:first-child {
		font-weight: bold;
	}
	.link-table th,.link-table td {
		font-size: 12px;
		color: #555;
		padding: 0;
		font-weight: normal;
	}
	#timeLine>div:before {
		content: '';
		position: absolute;
		top: 36px;
		bottom: 0;
		width: 3px;
		background-image: linear-gradient(to bottom, transparent 0px, transparent 19px, #555 19px, #555 22px, transparent 22px, transparent 100%);
		background-repeat: repeat-y;
		background-size: 3px 36px;
		z-index: 2;
		margin-left: -1.5px; 
	}
	#timeLine>div>span {
		position: relative;
		left: -15px;
	}
	#timeLine>div {
		width: 0;
		white-space: nowrap;
	}
	#timeLine {
		height: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-right: 100px;
	}
	#timeLine .starttime {

	}
	#linkList td>div {
		position: relative;
		height: 30px;
		display: flex;
		align-items: center;
		margin-right: 100px;
	}
	.bar-duration {
		/*background-color: #b4d4e9;*/
		height: 100%;
		display: inline-flex;
		align-items: center;
		position: relative;
		z-index: 3;
		padding-left: 4px;
	}
	.look-details {
		border: solid 1px;
		padding: 2px 6px;
		border-radius: 2px;
		color: #488ace;
		cursor: pointer;
	}
	.look-details:hover {
		background: var(--color-theme);
		border-color: var(--color-theme);
		color: #fff;
	}
</style>
<div class="">
	<form class="form-horizontal">
		<label class="radio"><input type="radio" name="linkType" value="b"  checked="checked">精准链路</label>
		<label class="radio"><input type="radio" name="linkType" value="a">智能链路</label>
	</form>
	<table class="link-table">
		<thead>
			<tr>
				<th style="width: 180px;">服务</th>
				<th>
					<div id="timeLine"></div>
				</th>
			</tr>
		</thead>
		<tbody id="linkList">
		</tbody>
	</table>
</div>