define(['echarts'],function(echarts){
	var echarts_trend,
		echarts_sqltop,
		echarts_logtop;
	return {
		load : function($el, scope, handler) {

			echarts_trend = app.echarts4.init($('#echarts_trend',$el)[0]);
			echarts_sqltop = app.echarts4.init($('#echarts_sqltop',$el)[0]);
			echarts_logtop = app.echarts4.init($('#echarts_logtop',$el)[0]);
			
			let duration;

			let logview_tab = $('#logview_tab',$el).DataTable({
				"paging": false,
        		'sort': false,
				'searching'	: true,
				'pageLength': 5,
				'scrollY': true,
				'columns': [{
					data: 'appids',defaultContent: ''
				},{
					data: 'app_name',defaultContent: ''
				},{
					data: 'num',defaultContent: ''
				},{
					data: 'username',defaultContent: ''
				},{
					data: 'usernum',defaultContent: ''
				}],
				"drawCallback": function (settings) {
					var api = this.api();
					var rows = api.rows({page: 'current'}).nodes();
	
					hideTr(api,rows,2);
					hideTr(api,rows,1);
					hideTr(api,rows,0);
					
				}
			});
			let logdownload_tab = $('#logdownload_tab',$el).DataTable({
				"paging": false,
        		'sort': false,
				'searching'	: true,
				'pageLength': 5,
				'scrollY': true,
				'columns': [{
					data: 'appids',defaultContent: ''
				},{
					data: 'app_name',defaultContent: ''
				},{
					data: 'num',defaultContent: ''
				},{
					data: 'username',defaultContent: ''
				},{
					data: 'usernum',defaultContent: ''
				}],
				"drawCallback": function (settings) {
					var api = this.api();
					var rows = api.rows({page: 'current'}).nodes();
	
					hideTr(api,rows,2);
					hideTr(api,rows,1);
					hideTr(api,rows,0);
					
				}
			});
			
			function hideTr(api,rows,idx) {
				var last = null;
				var tr = null;
				var ltd = null;
				api.column(idx, {page: 'current'}).data().each(function (group, i) {
					tr = $(rows[i]);
					var td = $("td:eq(" + idx + ")", tr);
					if (last !== group) {
						td.attr("rowspan", 1);
						td.text(group);
						ltd = td;
						last = group;
						td.css("vertical-align", "middle");
					} else {
						ltd.attr("rowspan", parseInt(ltd.attr("rowspan")) + 1);
						td.remove();
					}
				});
			}

			$('#echarts_btn_trend>li',$el).on('click',function(){
				let index = $(this).index();
				index == 0 ? getLogAccessEcharts() : getLogSqlSearchEcharts();
			});

			$('#echarts_btn_logtop>li',$el).on('click',function(){
				let index = $(this).index();
				index == 0 ? getLogViewTop10() : getLogDownloadTop10();
			});

			$("#daySelect", $el).on('change', function (e) {
				let val = parseInt($(this).val());
				duration = parseInt(val);
				init();
			})
			
			$("#daySelect", $el).trigger('change');

			function init() {
				findData();
				$('#echarts_btn_trend>li.active',$el).trigger('click');
				$('#echarts_btn_logtop>li.active',$el).trigger('click');
				getSqlStatisTop10();
				getAppLogView();
				getAppLogDownLoad();
			}

			
			function findData() {
				app.common.ajaxWithAfa({
					url:'LogOperationAction_queryViewDownloadSummary.do',
					data: {
						duration
					}
				}).done(function (data) {
					data = data.result;
					var total_view_num = data.total_view_num;
					var total_download_num = data.total_download_num;
					allData = data;
					number1.setContent(total_view_num);
					number2.setContent(total_download_num);
				})
			}

			function getAjax(url) {
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url: url,
						data: {
							duration
						}
					}).done(function (content) {
						resolve(content);
					});
				})
			}

			//日志访问趋势
			function getLogAccessEcharts() {
				getAjax('LogOperationAction_getLogAccessEcharts.do').then(res => {
					let xData = res.result.time.map(item => item.replace(' ','\n'));
					let yData = [{
						type: 'bar',
						name: '',
						width: '20%',
						data: res.result.val
					}]
					drawBaseEcharts(echarts_trend,'次',[],xData,yData);
				});
			}

			//sql查询趋势
			function getLogSqlSearchEcharts() {
				getAjax('LogOperationAction_getLogSqlSearchEcharts.do').then(res => {
					let xData = res.result.time;
					let yData = [{
						type: 'bar',
						name: '',
						width: '20%',
						data: res.result.val
					}]
					drawBaseEcharts(echarts_trend,'次',[],xData,yData);
				});
			}

			//sql top10
			function getSqlStatisTop10() {
				getAjax('LogOperationAction_getSqlStatisTop10.do').then(res => {
					let xData = res.result.map(item => item.search_text);
					let yData = [{
						type: 'bar',
						name: '',
						width: '20%',
						data: res.result.map(item => item.num)
					}]
					drawBaseEcharts(echarts_sqltop,'次',[],xData,yData);
				});
			}


			//日志查看top
			function getLogViewTop10() {
				getAjax('LogOperationAction_getLogViewTop10.do').then(res => {
					let xData = res.result.map(item => item.file);
					let yData = [{
						type: 'bar',
						name: '',
						width: '20%',
						data: res.result.map(item => item.num)
					}]
					drawBaseEcharts(echarts_logtop,'次',[],xData,yData);
				});
			}

			//日志下载top
			function getLogDownloadTop10() {
				getAjax('LogOperationAction_getLogDownloadTop10.do').then(res => {
					let xData = res.result.map(item => item.file);
					let yData = [{
						type: 'bar',
						name: '',
						width: '20%',
						data: res.result.map(item => item.num)
					}]
					drawBaseEcharts(echarts_logtop,'次',[],xData,yData);
				});
			}

			//人员访问
			function getAppLogView() {
				getAjax('LogOperationAction_getAppLogView.do').then(res => {
					let arr = [];
					res.result.forEach(item => {
						item.userList.forEach(it => {
							arr.push({
								app_name: item.app_name,
								appids: item.appids,
								num: item.num,
								username: it.username,
								usernum: it.num
							});
						});
					});
					logview_tab.rows.add(arr).draw();
				});
			}

			//人员下载
			function getAppLogDownLoad() {
				getAjax('LogOperationAction_getLogAccessEcharts.do').then(res => {

				});
			}

			
			handler.setInterval(function (){
				findData();
			}, 1000* 10)

			
			let timeMap = {
				'2': '万笔',
				'3': '亿笔',
				'4': '兆笔'
			}
			
			let Number = function (container, opts = {}) {
				this.maxNumber = opts.maxNumber || 9;
				this.container = container;
				this.children = [];
				this._init();
			}
			Number.prototype = {
				_init () {
					this._setInner();
				},
				_setInner () {
					let maxNumber = this.maxNumber;
					while(maxNumber--) {
						let item = $(getTemplate());
						this.children.push(item);
					}
					this.container.append(this.children);
				},
				setContent (number) {
					var num = this.setNumber(number, '笔', 1)
					this.getChildren();
					var children = this.children.reverse();
					for(var i = num.length - 1 ; i >= 0 ; i --) {
						var $ul = $(children[num.length - 1 - i]).find('ul')[0]
						var index = this.findUlIndex($ul, num[i]);
						if (isNaN(num[i])) {
							$($ul).attr('style',`top: -${index * 55}px;font-size: 26px;`);
						} else {
							$($ul).attr('style',`top: -${index * 55}px`);
						}
					}
					if (num.length !== this.children.length) {
						this.children.forEach((item, index) => {
							if (index >= num.length) {
								var $ul = $(item).find('ul')[0]
								$($ul).attr('style',`top: 0px`);
							}
						})
					}
				},
				getChildren () {
					let that = this;
					this.children = [];
					var $div = $(this.container).find('div.numbers-content');
					$.each($div, function (){
						that.children.push($(this));
					})
				},
				findUlIndex ($ul, str) {
					var $li = $($ul).find('li');
					var index = -1;
					$.each($li, function () {
						if ($(this).text().trim() === str) {
							index = $(this).index();
						}
					})
					return index;
				},
				setNumber (number, unit, times) {
					let newStr = this.setCommon(number);
					if (newStr.length > (this.maxNumber - unit.length)) {
						times ++;
						number = parseInt(parseInt(number) / Math.pow(1000, times));
						unit = timeMap[times+''];
						return this.setNumber(number, unit, times);
					} else {
						return newStr + unit;
					}
				},
				setCommon (number) {
					number += '';
					var str = [];
					for(var i = 0 ; i < number.length ; i ++ ) {
						str.unshift(number[number.length - i - 1])
						if (i % 3 === 2) {
							str.unshift(',');
						}
					}
					return str.join('');
				}
			}
			
			let number1 = new Number($("#number1", $el));
			let number2 = new Number($("#number2", $el));
			
			
			function getTemplate() {
				return `<div class="numbers-content">
							<span class="numbers-span"></span>
							<ul class="numbers-ul">
								<li>0</li>
								<li>1</li>
								<li>2</li>
								<li>3</li>
								<li>4</li>
								<li>5</li>
								<li>6</li>
								<li>7</li>
								<li>8</li>
								<li>9</li>
								<li>万</li>
								<li>笔</li>
								<li>,</li>
							</ul>
						</div>`;
			}

			function drawBaseEcharts($echarts,unit,legend,xData,series) {
				let option = {
						color: ['#5b62f9', '#fb8229', '#fa594d', '#0bbf46', '#3e7ad6'],//#55a8fd
						legend: {
							show: true,
							right: 0,
							width: '90%',
							type: 'scroll',
							data: legend
						},
						title: {
							text: '单位: '+unit,
							textStyle: {
								fontweight: 'normal',
								fontSize: '12px'
							}
						},
						tooltip: {
							show: true,
							trigger: 'axis'
						},
					    xAxis: {
					        type: 'category',	
					        boundaryGap: true,
					        axisLabel: {
					        	color: '#5c5a66'
					        },
					        axisLine: {
					        	lineStyle: {
					        		color: '#5c5a66',
					        		width: 2
					        	}
					        },
					        data: xData
					    },
					    yAxis: {
					        type: 'value',
					        splitLine: {
					        	show: true,
					        	lineStyle: {
					        		color: '#ccc',
					        		type: 'solid'
					        	}
					        },
					        axisLine: {
					        	show: false,
					        },
					        axisTick: {
					        	show: false
					        },
					        axisLabel: {
					        	color: '#5c5a66'
					        },
					    },
					    grid: {
					    	top:30,
					    	right: 0,
					    	bottom: 0,
					    	left: 0,
					    	containLabel: true
					    },
					    series: series
					};
				$echarts.clear();
				$echarts.setOption(option);
			}

		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});
