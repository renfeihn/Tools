define([ "jquery" ], function() {

	return {
		load : function($el, scope, handler) {

			const week_num = ['一','二','三','四','五','六','天'];

			function fixed2(num) {
				return ( '0000' + num ).substr(-2);
			}

			bindEvents();
			function bindEvents(){
				//导航
				$('.strategy-nav',$el).on('click','>li',function(e){
					let href = $(this).find('[data-href]').attr('data-href');
					app.scrollTop($('.strategy-content',$el), $('#'+href,$el), 500, 20);
					$(this).addClass('active').siblings().removeClass('active');
				});
				$('.strategy-item',$el).on('click','.select-btns>span',function(){
					$(this).addClass('active').siblings().removeClass('active');
				});
				$('.strategy-item',$el).on('click','.date-select>span',function(){
					$(this).toggleClass('active');
				});
			}

			//策略触发
			let strategyTrigger = {
				init() {

				},
				renderLog() {

				},
				renderKeywords() {

				},
				renderMonitor() {

				},
			};

			//策略报警
			let strategyAlarm = {
				init() {
					this.bindEvents();
					$('[data-role="strategy_alarm"]>span.active',$el).trigger('click');
				},
				bindEvents() {
					let _this = this;
					$('[data-role="strategy_alarm"]',$el).on('click','>span',function(){
						let id = $(this).attr('data-id');
						_this.render(id);
					});
				},
				render(type) {
					switch(type){
						case 'none':
							this.renderNone();
							break;
						case 'time':
							this.renderTime();
							break;
						case 'times':
							this.renderTimes();
							break;
						case 'once':
							this.renderOnce();
							break;
					}
				},
				renderNone() {
					$('#continue_time',$el).attr('disabled',true);
				},
				renderTime() {
					$('#continue_text',$el).text('连续触发时间');
					$('#continue_time',$el).removeAttr('disabled');
				},
				renderTimes() {
					$('#continue_text',$el).text('连续触发次数');
					$('#continue_time',$el).removeAttr('disabled');
				},
				renderOnce() {
					$('#continue_time',$el).attr('disabled',true);
				},
			};
			strategyAlarm.init();
			
			//策略执行
			let strategyExcute = {
				init() {
					this.bindEvents();
				},
				bindEvents() {
					let _this = this;
					$('.strategy-item',$el).on('click','[data-role="plan_circle"]>span',function(){
						let id = $(this).attr('data-id');
						let $form = $(this).closest('form');
						_this.render(id,$form.find('.circle-wrap'));
					});
				},
				render(type,$ele) {
					let html = '';
					switch(type){
						case 'minute':
							html = '';
							break;
						case 'hour':
							html = this.renderMinutes();
							break;
						case 'day':
							html = this.renderHours();
							break;
						case 'week':
							html = this.renderWeeks() + this.renderHours();
							break;
						case 'month':
							html = this.renderDays() + this.renderHours();
							break;
					}
					$ele.html(html);
				},
				renderMinutes() {
					let minutes = new Array(12).fill('').map((item,index) => {
						return `<span>${fixed2(index*5)}</span>`;
					}).join('');
					let html = `<div class="control-group">
									<label for="input1" class="control-label">选择分钟</label>
									<div class="controls">
										<span class="date-select" id="minutes_wrap">
											${minutes}
										</span>
									</div>
								</div>`;
					return html;
				},
				renderHours() {
					let hours = new Array(24).fill('').map((item,index) => {
						return `<span>${fixed2(index)}:00</span>`;
					}).join('');
					let html = `<div class="control-group">
									<label for="input1" class="control-label">选择时间</label>
									<div class="controls">
										<span class="date-select" id="hours_wrap">
											${hours}
										</span>
									</div>
								</div>`;
					return html;
				},
				renderWeeks() {
					let weeks = new Array(7).fill('').map((item,index) => {
						return `<span>${week_num[index]}</span>`;
					}).join('');
					let html = `<div class="control-group">
									<label for="input1" class="control-label">选择星期</label>
									<div class="controls">
										<span class="date-select" id="weeks_wrap">
											${weeks}
										</span>
									</div>
								</div>`;
					return html;
				},
				renderDays() {
					let days = new Array(31).fill('').map((item,index) => {
						return `<span>${index+1}</span>`;
					}).join('');
					let html = `<div class="control-group">
									<label for="input1" class="control-label">选择日期</label>
									<div class="controls">
										<span class="date-select" id="days_wrap">
											${days}
										</span>
									</div>
								</div>`;
					return html;
				},
			};
			strategyExcute.init();


			//静默期
			let strateSilent = {
				init() {
					this.bindEvents();
					$('[data-role="strategy_silent"]>span.active',$el).trigger('click');
				},
				bindEvents() {
					let _this = this;
					$('[data-role="strategy_silent"]',$el).on('click','>span',function(){
						let id = $(this).attr('data-id');
						let $form = $(this).closest('form');
						_this.render(id,$form.find('.time-select-wrap'));
					});
				},
				render(type,$ele) {
					switch(type) {
						case 'self_define':
							this.renderSelfDefine();
							break;
						case 'plan_circle':
							this.renderPlanCircle();
							break;
					}
				},
				renderSelfDefine() {
					let html =  `<div class="control-group">
									<label for="input1" class="control-label">时间区间</label>
									<div class="controls">
										<input type="text" />
									</div>
								</div>`;
					$('.time-select-wrap',$el).html(html);
				},
				renderPlanCircle() {
					let html =  `<div class="control-group">
									<label for="input1" class="control-label">计划周期</label>
									<div class="controls">
										<span class="select-btns" data-role="plan_circle">
											<span class="active" data-id="minute">每分钟</span><span data-id="hour">每小时</span><span data-id="day">每天</span><span data-id="week">每周</span><span data-id="month">每月</span>
										</span>
									</div>
								</div>`;
					$('.time-select-wrap',$el).html(html);
				},

			};
			strateSilent.init();


			//通知
			let Notice = function(opts) {
				this.constructor = Notice;
				this.opts = opts;
				this._init();
			};

			Notice.prototype = {
				_init() {
					this._bindEvents();
					this._render(this.opts.container);
				},
				_bindEvents() {
					this.opts.container.on('click','.notice-item>span',function(){
						$(this).toggleClass('active');
					});
				},
				_render($ele) {
					let html = `<div class="notice-wrap">
									<div class="notice-item">
										<span class="active"><i class="fa fa-envelope"></i>邮件</span>
										<p class="mail-list">
											<span class="addone"><i class="fa fa-plus" style="margin-right: 4px;color: #626567;"></i>添加</span>
											<span class="user-item"><span class="user-name">张三</span><i class="fa fa-times"></i></span>
											<span class="user-item"><span class="user-name">李四</span><i class="fa fa-times"></i></span>
										</p>
									</div>
									<div class="notice-item">
										<span><i class="fa fa-mobile" style="font-size: 20px;vertical-align: -2px;"></i>短信</span>
										<p class="message-list"></p>
									</div>
									<div class="notice-item">
										<span><i class="fa fa-wechat"></i>微信</span>
										<p class="wechat-list"></p>
									</div>
								</div>`;
					$ele.html(html);
				},
			};


			let strategy_notice = new Notice({
				container: $('[data-role="strategy_notice"]',$el)
			});

		},
		unload : function(handler) {
			
		},
		pause : function($el, attr, handler) {
			
		},
		resume : function($el, attr, handler) {
			
		}
	};
});