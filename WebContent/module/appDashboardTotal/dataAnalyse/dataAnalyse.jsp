<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>

<section class="">
	<div class="content">
		<ul class="nav nav-tabs nav-underLine">
			<li class="active"><a href="#tabs_trade" data-toggle="tab">交易</a></li>
			<li><a href="#tabs_ip" data-toggle="tab">IP</a></li>
			<li><a href="#tabs_soft" data-toggle="tab">软件</a></li>
		</ul>
		<div class="tab-content">
			<div id="tabs_trade" class="tab-pane active">
				<div class="table-wrap">
					<table class="display dataTable table" id="trade_tab"></table>
				</div>
			</div>
			<div id="tabs_ip" class="tab-pane">
				<div class="table-wrap">
					<table class="display dataTable table" id="ip_tab"></table>
				</div>
			</div>
			<div id="tabs_soft" class="tab-pane">
				<div class="table-wrap">
					<table class="display dataTable table" id="soft_tab"></table>
				</div>
			</div>
		</div>
	</div>
</section>