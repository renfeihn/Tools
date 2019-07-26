<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
#searchTable tbody td:last-child>span{
	color:var(--color-theme);
	cursor: pointer;
	margin: 0 5px;
}
.LWM-container #searchTable_filter{
	position: absolute;
    top: -52px;
    right: 0;
}

.LWM-modal .form-horizontal .control-label{
	width: 7em;
}
.LWM-modal .form-horizontal .controls>select,
.LWM-modal .form-horizontal .controls>input,
.LWM-modal .form-horizontal .controls>textarea {
	width: 100%;
}

.LWM-warningForm div.col-3{
	flex: none;
	width: calc(100% / 2);
}
.LWM-warningForm .unShow{
	display: none;
}
</style>

<section class="panel LWM-container" style="margin: 0;">
	<p class="title">预警规则管理</p>
	<div class="content">
		<table id="searchTable" class="display dataTable table" style="table-layout: fixed;">
			<thead>
				<tr>
					<th style="width: 80px;">序号</th>
					<th style="width: 200px;">预警名称</th>
					<th width="35%">查询条件</th>
					<th style="width: 100px;">触发条件</th>
					<th style="width: 100px;">预警状态</th>
					<th style="width: 100px;">预警类型</th>
					<th style="width: 100px;">报警类型</th>
					<th style="width:145px;">操作</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</section>

<!-- 预警模态框 -->
<div id="warningModal" class="modal hide fade LWM-modal" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 800px">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">预警编辑</h3>
	</div>
	<div class="modal-body">
		<form class="form-horizontal LWM-warningForm">
			<div class="control-group">
				<label for="searchName" class="control-label required">预警名称</label>
				<div class="controls">
					<input type="text" id="name" name="name" placeholder="输入名称" disabled />
				</div>
			</div>
			<div class="control-group">
				<label for="searchName" class="control-label required">搜索条件</label>
				<div class="controls">
					<input type="text" name="search" id="search" disabled/>
				</div>
			</div>

			<div class="control-group">
				<label for="input1" class="control-label">触发条件</label>
				<div class="controls">
					<select name="conditions" id="conditions">
						<option value="1">结果数</option>
						<option value="2">主机数</option>
						<option value="3">应用数</option>
						<option value="4">日志源数</option>
						<option value="5" data-type="noSqlSearch">自定义</option>
						<option value="6" data-type="sqlSearch">自定义</option>
					</select>
				</div>
			</div>
			<div id="conditionsNormal" style="display: flex">
				<div class="control-group col-3">
					<div class="controls">
						<select name="compare" id="compare">
							<option value="gt">大于</option>
							<option value="lt">小于</option>
							<option value="eq">小于</option>
							<option value="gte">大于等于</option>
							<option value="lte">小于等于</option>
						</select>
					</div>
				</div>
				<div class="control-group col-3">
					<div class="controls">
						<input type="text" name="result" id="result" placeholder="阈值">
					</div>
				</div>
			</div>

			<div class="control-group unShow" id="conditionsUser">
				<div class="controls">
					<input type="text" id="customize" placeholder="触发条件">
				</div>
			</div>
			
			<div class="control-group col-3">
				<label for="input1" class="control-label">预警范围</label>
				<div class="controls">
					<select name="timeInterval" id="timeInterval">
						<option value="1">当天</option>
						<option value="2">本周</option>
						<option value="3">本月</option>
						<option value="4">本年</option>
						<option value="13">1分钟</option>
						<option value="5">1小时</option>
						<option value="6">12小时</option>
						<option value="7">1天</option>
						<option value="8">1周</option>
						<option value="9">半月</option>
						<option value="10">1月</option>
						<option value="11">3月</option>
						<option value="12">全部时间</option>
					</select>
				</div>
			</div>

			<div style="display: flex">
				<div class="control-group col-3">
					<label for="input1" class="control-label">开启预警</label>
					<div class="controls">
						<span class="boolean-switch false" id="isOpen"></span>
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label">预警类型</label>
					<div class="controls">
						<select name="planType" id="planType">
							<option value="1">计划</option>
							<option value="2">定时</option>
						</select>
					</div>
				</div>
			</div>

			<div id="planCondition">
				<div class="control-group col-3">
					<label for="input1" class="control-label">计划类型</label>
					<div class="controls">
						<select name="scheduleType" id="scheduleType">
							<option value="1">每小时</option>
							<option value="2">每天</option>
							<option value="3">每周</option>
							<option value="4">每月</option>
						</select>
					</div>
				</div>
				<div style="display: flex;">
					<div id="minute" class="control-group col-3">
						<label for="input1" class="control-label">选择分钟</label>
						<div class="controls">
							<select data-type="interval">
								<option value="00">00</option>
								<option value="05">05</option>
								<option value="10">10</option>
								<option value="15">15</option>
								<option value="20">20</option>
								<option value="25">25</option>
								<option value="30">30</option>
								<option value="35">35</option>
								<option value="40">40</option>
								<option value="45">45</option>
								<option value="50">50</option>
								<option value="55">55</option>
								<option value="60">60</option>
							</select>
						</div>
					</div>
					<div id="day" class="control-group col-3 unShow">
						<label for="input1" class="control-label">选择星期</label>
						<div class="controls">
							<select data-type="interval">
								<option value="02">一</option>
								<option value="03">二</option>
								<option value="04">三</option>
								<option value="05">四</option>
								<option value="06">五</option>
								<option value="07">六</option>
								<option value="01">七</option>
							</select>
						</div>
					</div>
					<div id="date" class="control-group col-3 unShow">
						<label for="input1" class="control-label">选择天</label>
						<div class="controls">
							<select data-type="interval">
								<option value="01">1</option>
								<option value="02">2</option>
								<option value="03">3</option>
								<option value="04">4</option>
								<option value="05">5</option>
								<option value="06">6</option>
								<option value="07">7</option>
								<option value="08">8</option>
								<option value="09">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>
							</select>
						</div>
					</div>
					<div id="time" class="control-group col-3 unShow">
						<label for="input1" class="control-label">选择时间</label>
						<div class="controls">
							<select data-type="interval">
								<option value="01">00:00</option>
								<option value="02">01:00</option>
								<option value="03">02:00</option>
								<option value="04">03:00</option>
								<option value="05">04:00</option>
								<option value="06">05:00</option>
								<option value="07">06:00</option>
								<option value="08">07:00</option>
								<option value="09">08:00</option>
								<option value="10">09:00</option>
								<option value="11">10:00</option>
								<option value="12">11:00</option>
								<option value="13">12:00</option>
								<option value="14">13:00</option>
								<option value="15">14:00</option>
								<option value="16">15:00</option>
								<option value="17">16:00</option>
								<option value="18">17:00</option>
								<option value="19">18:00</option>
								<option value="20">19:00</option>
								<option value="21">20:00</option>
								<option value="22">21:00</option>
								<option value="23">22:00</option>
								<option value="24">23:00</option>
							</select>
						</div>
					</div>
				</div>
			</div>
			<div style="display: flex;">
				<div class="control-group col-3">
					<label for="input1" class="control-label">报警类型</label>
					<div class="controls">
						<select name="warnType" id="warnType">
							<option value="1">短信</option>
							<option value="2">邮件</option>
						</select>
					</div>
				</div>
				<div class="control-group col-3">
					<label for="input1" class="control-label">事件等级</label>
					<div class="controls">
						<select name="level">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>
					</div>
				</div>
			</div>
			
			<div style="display: flex;">
				<div class="control-group col-3">
					<label class="control-label">描述模版</label>
					<div class="controls">
						<select id="modelSelect">
							<option value="">自定义</option>
						</select>
					</div>
				</div>
			</div>

			<div class="control-group">
				<label for="input1" class="control-label">模版详情</label>
				<div class="controls">
					<textarea id="eventModel" name="eventModel" style="resize: none; height: 100px;"></textarea>
				</div>
			</div>
		</form>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确认</button>
	</div>
</div>
