define(['echarts'],function(echarts){
	var echarts1,
	echarts2,
	echarts3,
	echarts4;
	return {
		load : function($el, scope, handler) {
			echarts1 = echarts.init($("#echarts1")[0]);
			echarts3 = echarts.init($("#echarts3")[0]);
			echarts4 = echarts.init($("#echarts4")[0]);
			
			var $seeTable = $('#seeTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index', defaultContent : '',
        			render: function(data,type,row,meta){
        				return (meta.row + 1);
        			}
				},{
					data : 'app_name', defaultContent : ''
				},{
					data : 'hostip', defaultContent : ''
				},{
					data : 'file', defaultContent : ''
				},{
					data : 'operation_time', defaultContent : '',
        			render: function(data,type,row,meta){
        				return data && new Date(data).Format('yyyy-MM-dd hh:mm:ss');
        			}
				},{
					data : 'username', defaultContent : ''
				}]
			});
			
			var $downloadTable = $('#downloadTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: false,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index', defaultContent : '',
        			render: function(data,type,row,meta){
        				return (meta.row + 1);
        			}
				},{
					data : 'app_name', defaultContent : ''
				},{
					data : 'hostip', defaultContent : ''
				},{
					data : 'file', defaultContent : ''
				},{
					data : 'operation_time', defaultContent : '',
        			render: function(data,type,row,meta){
        				return data && new Date(data).Format('yyyy-MM-dd hh:mm:ss');
        			}
				},{
					data : 'username', defaultContent : ''
				}]
			});
			
			$("#ul_nav>li", $el).on('click', function (e) {
				var $index = $(this).index();
				var echarts_app_view = allData.echarts_app_view;
				var echarts_app_download = allData.echarts_app_download;
				if ($index) {
					if (!echarts2) {
						setTimeout(function () {
							echarts2 = echarts.init($("#echarts2")[0]);
							unityData(echarts_app_download, echarts2);
						},0)
					} else {
						unityData(echarts_app_download, echarts2);
					}
				} else {
					if (!echarts1) {
						setTimeout(function () {
							echarts1 = echarts.init($("#echarts2")[0]);
							unityData(echarts_app_view, echarts1);
						},0)
					} else {
						unityData(echarts_app_view, echarts1);
					}
				}
			})
			
			
			query7DayViewDownloadSummary();
			function query7DayViewDownloadSummary () {
				$seeTable.clear().draw();
				$downloadTable.clear().draw();
				app.common.ajaxWithAfa({
					url:'LogOperationAction_query7DayViewDownloadSummary.do',
					data: {}
				}).done(function (data) {
					$seeTable.rows.add(data.result.log_view_7days).draw();
					$downloadTable.rows.add(data.result.log_download_7days).draw();
				})
			}
			
			
			
			$("#daySelect", $el).on('change', function (e) {
				let val = parseInt($(this).val());
				findData(val);
			})
			
			$("#daySelect", $el).trigger('change');
			let allData;
			
			function findData(duration) {
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
					initData()
				})
			}
			
			handler.setInterval(function (){
				findData(parseInt($("#daySelect", $el).val()));
			}, 1000* 10)
			
			function initData () {
				var echarts_user_view = allData.echarts_user_view;
				var echarts_user_download = allData.echarts_user_download;
				unityData(echarts_user_view, echarts3);
				unityData(echarts_user_download, echarts4);
				$("#ul_nav>li.active", $el).trigger('click');
			}
			
			function unityData (data, echartsObj) {
				var xAxis = data.map(item => {
					return item[0]
				})
				var seriseData = data.map(item => {
					return item[1]
				})
				setOption(echartsObj, xAxis, seriseData);
			}
			
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
			
			function setOption ($charts, dataAxis, data) {
				
				var yMax = Math.max(...data) + 10;
				var dataShadow = [];

				for (var i = 0; i < data.length; i++) {
				    dataShadow.push(yMax);
				}

				option = {
				    title: {
				    	show:  false
				    },
				    grid: {
				    	left: 30,
				    	right: 10,
				    	top: 10,
				    	bottom: 20
				    },
				    xAxis: {
				        data: dataAxis,
				        axisTick: {
				            show: true
				        },
				        axisLine: {
				            show: true
				        },
				        z: 10,
				        axisLabel: {
				        	interval: 0
				        }
				    },
				    yAxis: {
				        axisLine: {
				            show: true
				        },
				        axisTick: {
				            show: true
				        },
				        splitLine: {
				        	show:  false
				        },
				        axisLabel: {
				            textStyle: {
				                color: '#999'
				            }
				        }
				    },
				    dataZoom: [
				        {
				            type: 'inside'
				        }
				    ],
				    series: [
				        {
				            type: 'bar',
				            itemStyle: {
				                normal: {color: 'rgba(0,0,0,0.05)'}
				            },
				            barGap:'-100%',
				            barCategoryGap:'40%',
				            data: dataShadow,
				            animation: false
				        },
				        {
				            type: 'bar',
				            itemStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(
				                        0, 0, 0, 1,
				                        [
				                            {offset: 0, color: '#83bff6'},
				                            {offset: 0.5, color: '#188df0'},
				                            {offset: 1, color: '#188df0'}
				                        ]
				                    )
				                },
				                emphasis: {
				                    color: new echarts.graphic.LinearGradient(
				                        0, 0, 0, 1,
				                        [
				                            {offset: 0, color: '#2378f7'},
				                            {offset: 0.7, color: '#2378f7'},
				                            {offset: 1, color: '#83bff6'}
				                        ]
				                    )
				                }
				            },
				            data: data
				        }
				    ]
				};
				
				$charts.setOption(option);

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
