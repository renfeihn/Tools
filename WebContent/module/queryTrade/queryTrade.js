define([ "./echarts.js" ], function(echarts) {
	var lastID = "";
	var stopAjaxGetEchartsData = null;
	return {
		load : function($el, scope, handler) {
			console.log(scope);
			var maxNum = 100000000;// 最大查询结果数
			var perReqSize = 10000;// 每次请求数量
			lastID = $el.attr('id');
			$('.duration-time-check', $el).on('click', function(){
				$(this).toggleClass('checked').siblings().removeClass('checked');
			})
			$('.status-check', $el).on('click', function(){
				$(this).toggleClass('selected').siblings().removeClass('selected');
			})
			var ContinueFlag = true;
			var startTime = new Date().Format('yyyy-MM-dd 00:00:00.000'),
					endTime = new Date().Format('yyyy-MM-dd 23:59:59.000'),
					forTableTime = {}
					queryParam = {};
			var timeInterval = null; //传参用

			// 精确日期选择
			$('#datetime', $el).daterangepicker({
				timePicker: true, //显示时间
				timePicker24Hour: true, //时间制
				timePickerSeconds: true, //时间显示到秒
				// startDate: new Date().Format('yyyy-MM-dd 00:00:00'),
				// endDate: new Date().Format('yyyy-MM-dd 23:59:59'),
				applyClass: "confirmBtn",
				"parentEl": $el,
				locale:{
					format: 'YYYY-MM-DD HH:mm:ss.000',
					applyLabel: '确认',
					cancelLabel: '取消',
					fromLabel: '从',
					toLabel: '到',
					weekLabel: 'W',
					daysOfWeek:["日","一","二","三","四","五","六"],
					monthNames: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
				}
			}, function(start, end, label) {
				var startFormat = new Date(start).Format('yyyy-MM-dd hh:mm:ss.S');
				var endFormat = new Date(end).Format('yyyy-MM-dd hh:mm:ss.S');
				startTime = startFormat;
				endTime = endFormat;
				forTableTime = {
					startTime,
					endTime
				};
				$('#datetime', $el).data('start', startFormat).data('end', endFormat).val(startFormat +' - '+ endFormat);
			});

			$el.find('.daterangepicker').css({
				'margin': '-36px 0 0 87px',
				'box-shadow': '0 5px 10px rgba(0, 0, 0, .2)'
			})

			
			function init() {
				//跳转进来初始化筛选条件
				if(!$.isEmptyObject(scope)) {
					scope.ip && $('[name="hostip"]',$el).val(scope.ip);
					scope.objectid && $('[name="objectid"]',$el).val(scope.ip);
					scope.file && $('[name="fileName"]',$el).val(scope.file);
					if(scope.time){
						startTime = new Date(scope.time[0]).Format('yyyy-MM-dd hh:mm:ss.S');
						endTime = new Date(scope.time[1]).Format('yyyy-MM-dd hh:mm:ss.S');
						$('#datetime', $el).data('start', startTime).data('end', endTime).val(startTime +' - '+ endTime);
						forTableTime = {
							startTime,
							endTime
						};
					}
					$('#searchBtn',$el).trigger('click');
				}
			}

			stopAjaxGetEchartsData = function (){
				$('#searchBtn', $el).html('查询').removeClass('searching');
				ContinueFlag = false;
			}
			var lastPageSort = {};
			var lastPageLength = 10;
			var $dataTable = $('#dataTable', $el).DataTable({
				searching: false,
				autoWidth: false,
				order: [],
				info: true,
				dom: 't<"page-info" li>p',
				scrollY: (document.documentElement.clientHeight - 486)+'px',
				processing: true,
				lengthChange: true,
				pagingType: 'simple',
				pageLength: 10,
				lengthMenu: [10, 15, 50, 100],
				columns: [
				{ data: '_source', title: '应用系统', defaultContent: '-', orderable: false},
				{ data: '', title: '交易代码', defaultContent: '-', orderable: false},
				{ data: '_source.start', title: '交易时间', defaultContent: '-', orderable: true},
				{ data: '_source.duration', title: '交易耗时', defaultContent: '-', width: '100px', orderable: true},
				{ data: '_source', title: '交易状态码', defaultContent: '-', orderable: false},
				{ data: '_source', title: 'IP对象', defaultContent: '-', orderable: false},
				{ data: '_source', title: '程序对象', defaultContent: '-', orderable: false},
				{ data: '_source', title: '日志文件名称', defaultContent: '-', orderable: false},
				],
				columnDefs: [{
					targets: [0],
					render: function (data, type, row, meta){
						return data['_head_.appname'];
					}
				},{
					targets: [2],
					render: function (data, type, row, meta){
						return new Date(data).Format('yyyy-M-d hh:mm:ss.S');
					}
				},{
					targets: [3],
					render: function (data, type, row, meta){
						return `<div class="text-right" ${parseInt(data)>=60000?`style="color: red;"`:``}>${TimeFormat(parseInt(data))}</div>`;
					}
				},{
					targets: [4],
					render: function (data, type, row, meta){
						let style = "";
						if(data['_struct_.status'] == 'E'){
							style = "color: red;";
						}
						return `<span style="${style}">${data['_struct_.status']?data['_struct_.status']:'-'}</span>`
					}
				},{
					targets: [5],
					render: function (data, type, row, meta){
						return data['_head_.hostip'];
					}
				},{
					targets: [6],
					render: function (data, type, row, meta){
						return data['_head_.objectid'];
					}
				},{
					targets: [7],
					render: function (data, type, row, meta){
						return data['_struct_.logName'];
					}
				}],
				'serverSide': true,
				'ajax': function(data, callback, settings) {
					if(!$.isEmptyObject(queryParam)){
						var pageNum = data.start / data.length;
						if(data.length != lastPageLength){
							$dataTable.page(0);
							pageNum = 0;
							lastPageLength = data.length;
							lastPageSort = {};
						}
						var lastPage = {};
						if(pageNum != 0){
							if(!lastPageSort[pageNum-1]){
								$dataTable.page(pageNum-1);
								return;
							}
							lastPage = {
								'start': lastPageSort[pageNum-1][0],
								'_id': lastPageSort[pageNum-1][1],
							}
						}
						var sort = {};
						if(data.order.length > 0){
							sort['sortOrder'] = data.order[0].dir;
							sort['sortField'] = data.columns[data.order[0].column].data.split('.')[1];
						}
						app.shelter.show();
						app.common.ajaxWithAfa({
							url: 'ESSearchAction_searchApplog.do',
							data: {
								'param': JSON.stringify({
									...queryParam,
									...forTableTime,// 覆盖默认时间范围
									fields: '*',
									size: data.length,
									...lastPage,
									...sort
								})
							},
						}).done(function(content){

							lastPageSort[pageNum] = content.result.sort;
							callback({
								'data': content.result.agg,
								'recordsFiltered': content.result.total,
								'recordsTotal': content.result.total
							});
							app.shelter.hide();
						})
					}else{
						callback({
							data: [],
							recordsFiltered: 0,
							recordsTotal: 0
						});
					}
				}
			});

			$('.tables-container',$el).on('click','input[type="checkbox"]',function(e){
				e.stopPropagation();
			});
			$('.tables-container',$el).on('click','tbody>tr',function(){
				let $tab = $(this).parents('table');
				let index = $tab.attr('data-table-index');
				let data = dataTableObj[index].row($(this)).data();
				let obj = {};
				switch(index) {
					case '0':
						obj['name'] = $(this).find('td:eq(1)').text();
						obj['appId'] = data['_head_.appid'];
						break;
					case '1':
						obj['name'] = $(this).find('td:eq(1)').text();
						obj['objectid'] = data['_head_.objectid'];
						break;
					case '2':
						obj['name'] = $(this).find('td:eq(1)').text();
						obj['ip'] = data['_head_.hostip'];
						break;
					case '4':
						let file = data['_head_.file.keyword'].includes('/') ? data['_head_.file.keyword'].split('/')[data['_head_.file.keyword'].split('/').length - 1] : data['_head_.file.keyword']
						obj['name'] = file;
						obj['file'] = file;
						break;
				}
				dispatherPage(obj);
			});

			function dispatherPage(obj) {
				app.dispatcher.load({
					title: '交易检索-' + obj.name,
					moduleId: 'queryTrade',
					section: '',
					id: 'queryTrade' + new Date().getTime(),
					params: {
						appId: obj.appId,
						objectid: obj.objectid,
						ip: obj.ip,
						file: obj.file,
						time: timeInterval
					},
					context: $el
				 });
			}

			var $echarts = echarts.init($('#echartsDom', $el)[0]);
			$echarts.on('brushselected', function(params){
				if(params.batch[0].areas.length > 0){
					var coordRange = params.batch[0].areas[0].coordRange;
					timeInterval = coordRange;
					forTableTime = {
						'startTime': new Date(coordRange[0]).Format('yyyy-MM-dd hh:mm:ss.S'),
						'endTime': new Date(coordRange[1]).Format('yyyy-MM-dd hh:mm:ss.S'),
					}
					$dataTable.ajax.reload();
					StatisticalInformationQuery();
				}else if(!$.isEmptyObject(forTableTime)){
					forTableTime = {};
					$dataTable.ajax.reload();
					StatisticalInformationQuery();
				}
			});
			function drawTimeLine (data){

				var result = data.map((item,index)=>{
					return [
						new Date(item.start),
						item.duration
					];
				});
				// if(filter){
				// 	result = result.filter((item,index)=>{
				// 		if(filter.length == 2){
				// 			return item[1] >= filter[0] && item[1] <= filter[1];
				// 		}else{
				// 			return item[1] >= filter[0];
				// 		}
				// 	});
				// }
				
				var option = {
					color: ['#55a8fd'],
					backgroundColor: 'rgba(0,0,0,0.03)',
					grid: {
						left: 10,
						right: 40,
						top: 0,
						bottom: 10,
						containLabel: true,
					},
					xAxis: {
						type: 'time',
						position: 'top',
						axisLabel: {
							color: '#666',
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						splitNumber: 20,
						splitLine: {
							show: true,
							lineStyle: {
								color: '#eee'
							}
						},
					},
					yAxis: {
						type: 'value',
						splitLine: {
							show: false
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							color: '#666',
						},
					},
					toolbox: {
						feature: {
							brush: {
								type: ['lineX', 'clear']
							}
						},
						top: 20,
						right: 10,
						orient: 'vertical'
					},
					brush: {
						outOfBrush: {
							colorAlpha: 0.1
						},
						xAxisIndex: 0,
						throttleType: 'debounce',
						throttleDelay: 300,
						brushStyle: {
							borderWidth: 1,
							color: 'rgba(255,255,255,0.2)',
						},
						outOfBrush: {
							colorAlpha: 0.01
						}
					},
					dataZoom: [
					{
						type: 'inside',
						xAxisIndex: 0,
					}
					],
					series: [
					{
						name: '平均耗时',
						type: 'scatter',
						data: result,
						symbolSize: 5
					}
					]
				};
				$echarts.setOption(option);
				// 每次新查询完就删除已选区域
				$echarts.dispatchAction({
					type: 'brush',
					areas: [],
				})
			}

			function appendTimeLineData(data){
				var result = data.map((item,index)=>{
					return [
						new Date(item.start),
						item.duration
					];
				});
				$echarts.appendData({
					seriesIndex: 0,
					data: result
				});
			}

			var allData = [];
			$('#searchBtn', $el).on('click', function(){
				if($(this).html() == '查询'){
					$(this).html('停止查询').addClass('searching');
					ContinueFlag = true;
					var formData = app.common.serializeObject($('.queryTrade-form'));
					var filterExe = $('.duration-time-check.checked', $el).data('filter');
					var durationGte,durationLte;
					if(filterExe){
						durationGte = filterExe[0];
						if(filterExe.length == 2){
							durationLte = filterExe[1];
						}
					}
					var hostip = formData['hostip'] || "";
					var objectid = formData['objectid'] || "";
					var fileName = formData['fileName'] || "";
					var appid = (JSON.parse(getAccessLogSetting()).app.cate3.map(item=>{
						return item.cateId;
					},'')).join(',');
					var status = $('.status-check.selected', $el).data('status');

					queryParam = {
						'maxNum': maxNum,
						'startTime': startTime,
						'endTime': endTime,
						'durationGte': durationGte,
						'durationLte': durationLte,
						'hostip': hostip,
						'objectid': objectid,
						'appid': appid,
						'fileName': fileName,
						'_struct_.status': status
					};
					allData = [];
					StatisticalInformationQuery();// 做统计
					ajaxGetEchartsData(queryParam);// 做echarts
					ajaxGetTableData();// 做表格
				}else{
					stopAjaxGetEchartsData();
				}
				
			})

			function ajaxGetTableData(){
				// $dataTable.clear();
				$dataTable.ajax.reload();
			}

			function ajaxGetEchartsData(param, notFirst){
				app.common.ajaxWithAfa({
					url: 'ESSearchAction_searchApplog.do',
					data: {
						'param': JSON.stringify({
							...param,
							fields: 'duration,start',
							size: perReqSize
						})
					},
				}).done(function(content){
					if(content.result.isBeyond){
						app.alert('查询结果超过 '+maxNum+' 条，请缩小时间范围');
						stopAjaxGetEchartsData();
						return;
					}
					let data = content.result.agg;
					
					allData = allData.concat(data);// 叠加本次查询结果
					drawTimeLine(allData);
					if(data.length == perReqSize && ContinueFlag){
						// 继续查询
						let nextparam = {
							...param,
							start: content.result.sort[0],
							_id: content.result.sort[1],
						}
						ajaxGetEchartsData(nextparam);
					}else{
						stopAjaxGetEchartsData();
					}
				})	
			}


			$('#resetBtn', $el).on('click', function(){
				$('.queryTrade-form [name="hostip"]', $el).val('');
				$('.queryTrade-form [name="objectid"]', $el).val('');
				$('.queryTrade-form [name="fileName"]', $el).val('');
				$('.resetCategory', $el).trigger('click');
				startTime = new Date().Format('yyyy-MM-dd 00:00:00.000');
				endTime = new Date().Format('yyyy-MM-dd 23:59:59.000');
				forTableTime = {
					startTime,
					endTime
				};
				$('#datetime', $el).data('start', startTime).data('end', endTime).val(startTime +' - '+ endTime);
				$('.duration-time-check', $el).removeClass('checked');
				$('.status-check', $el).removeClass('selected');
			})


			$(document).on('click', function(e){
				if($(e.target).closest('.logSearchDetail-accessLogContent').length == 0){
					$('#accessLogUl',$el).hide().find('li.active').removeClass('active');
					$('#accessLogUl',$el).trigger('logChange');
					$('#assetObject',$el).hide();
					$('#appSystem',$el).hide();
				}
			})
			$('.logSearchDetail-accessLogContent', $el).on('click','#accessLog',function(){
				$('#accessLogUl',$el).toggle().find('li.active').removeClass('active');
				$('#accessLogUl',$el).trigger('logChange');
				$('#assetObject',$el).hide();
				$('#appSystem',$el).hide();
			}).on('click','#accessLogUl>li',function(){
				var index = $(this).index();
				$(this).siblings().removeClass('active');
				$(this).toggleClass('active');
				if(index == 0){
					if($(this).hasClass('active')){
						$('#appSystem',$el).toggle();
					}else{
						$('#appSystem',$el).hide();
					}
					$('#assetObject',$el).hide();
				}else if(index == 1){
					if($(this).hasClass('active')){
						$('#assetObject',$el).toggle();
					}else{
						$('#assetObject',$el).hide();
					}
					$('#appSystem',$el).hide();
				}
			}).on('click','span,h5',function(){
				if($(this).hasClass('disabled')){
					return;
				}
				$(this).toggleClass('active');
				saveCategory($(this));
			}).on('click','.closeCategory',function(){
				$(this).parent().parent().hide();
			}).on('click','.resetCategory',function(){
				$(this).parent().parent().find('h5.active,span.active').removeClass('active');

				if($('#appSystem',$el).find('span.active,h5.active').length){
					$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
				}else{
					$('#accessLogUl>li:eq(0)',$el).removeClass('choosed');
				}

				if($('#assetObject',$el).find('span.active,h5.active').length){
					$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
				}else{
					$('#accessLogUl>li:eq(1)',$el).removeClass('choosed');
				}
			}).on('click','.confirmCategory',function(){
				$(this).parent().parent().hide();
			}).on('logChange', '#accessLogUl', function(event) {
				var $obj = $(this).parent();
				if($obj.find('.active[data-role]').length > 0){
					var length = $('.active[data-role=cate3]', $obj).length;
					$('#accessLog',$el).attr('data-val','0').html('有条件的日志（'+length+'）<i class="fa fa-sort-down"></i>');
				}else{
					$('#accessLog',$el).attr('data-val','1').html('可访问日志<i class="fa fa-sort-down"></i>');
				}
			});

			getObjectCategory();

			//获取三级分类
			function getObjectCategory(){
				return app.common.ajaxWithAfa({
					url: "ESSearchAction_getObjectCategory.do",
				}).done(function(data) {
					var data = data.result,
					appSystemData = data.app,
					assetObjectData = data.sys;
					if (!isHasCate3App(appSystemData)) {
						$("#searchBtn", $el).addClass('disabled');
						$("#searchKeyWord", $el).addClass('disabled');
					}
					putObjectData(appSystemData,'appSystem',true);
					putObjectData(assetObjectData,'assetObject');
					return $.Deferred().resolve();
				});
			}

			function isHasCate3App (appSystemData) {
				try {
					var cate2 = appSystemData[0].childs;
					if (!cate2 || cate2.length === 0) {
						return false;
					}
					var child = [];
					cate2.forEach(item => {
						child = child.concat(item.childs);
					})
					if (child.length === 0) {
						return false;
					}
					return true;
				} catch (e) {
					return false
				}
			}

			function putObjectData(appSystemData,id,tag){
				appSystemHtml = '<div>\
				<button type="button" class="resetCategory">重置</button>\
				<button type="button" class="closeCategory">关闭</button>\
				<button type="button" class="light confirmCategory">确定</button>\
				</div><div style="max-height: 63vh;overflow-y: auto; position: relative;margin-bottom:40px !important;">';
				if(appSystemData.length>0){
					appSystemData.forEach(function(first,index){
						appSystemHtml += "<div class='logSearchDetail-accessLogList'><h5 data-role='cate1' data-id='"+first.cateId+"' data-name='"+first.cateName+"'>"+ first.cateName+'</h5>';
						if(first.childs.length>0){
							first.childs.forEach(function(second,twoIndex){
								appSystemHtml += '<div><span data-role="cate2" data-id="'+second.cateId+'" data-name="'+second.cateName+'">'+second.cateName+'</span>';
								if(second.childs.length>0){
									appSystemHtml += '<p>';
									second.childs.forEach(function(third,twoIndex){
										appSystemHtml += '<span data-role="cate3" data-id="'+third.cateId+'" data-name="'+third.cateName+'">'+third.cateName+'</span>';
									})
									appSystemHtml += '</p>';
								}
								appSystemHtml += '</div>';
							})
						}
						appSystemHtml += "</div>";
					})
				}
				appSystemHtml += "</div>";
				$('#'+id,$el).html(appSystemHtml);
				if(scope.appId && $('#'+id,$el).find('[data-id="'+scope.appId+'"]').length > 0){
					$('#'+id,$el).find('[data-id="'+scope.appId+'"]').trigger('click');
					$('#accessLog',$el).text('有条件的日志（1）');
				}
				init();
			}

			function setAccessLogSetting(category) {
				var appSystem = $('#appSystem',$el);
				var assetObject = $('#assetObject',$el);
				category.app.cate1.forEach(function (item) {
					$('[data-id='+item.cateId+']',appSystem).addClass('active');
				})
				category.app.cate2.forEach(function (item) {
					$('[data-id='+item.cateId+']',appSystem).addClass('active');
				})
				category.app.cate3.forEach(function (item) {
					$('[data-id='+item.cateId+']',appSystem).addClass('active');
				})

				category.category.cate1.forEach(function (item) {
					$('[data-id='+item.cateId+']',assetObject).addClass('active');
				})
				category.category.cate2.forEach(function (item) {
					$('[data-id='+item.cateId+']',assetObject).addClass('active');
				})
				category.category.cate3.forEach(function (item) {
					$('[data-id='+item.cateId+']',assetObject).addClass('active');
				})

			if(appSystem.find('span.active,h5.active').length){//应用系统
				$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
			}
			if(assetObject.find('span.active,h5.active').length){//资产对象
				$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
			}
		}

		function getAccessLogSetting() {
			var cate1App = [],cate2App = [],cate3App = [],
			cate1AppTmp = [],cate2AppTmp = [],cate3AppTmp = [],
			cate1 = [],cate2 = [],cate3 = [],
			appId = [];
			$('#appSystem .active[data-role=cate1]', $el).each(function () {
				cate1App.push({cateId:$(this).attr('data-id')});
			})
			$('#appSystem .active[data-role=cate2]', $el).each(function () {
				cate2App.push({cateId:$(this).attr('data-id')});
			})
			$('#appSystem .active[data-role=cate3]', $el).each(function () {
				cate3App.push({cateId:$(this).attr('data-id')});
			})
			
			$('#assetObject .active[data-role=cate1]', $el).each(function () {
				cate1.push({cateId:$(this).attr('data-id'),cateName: $(this).attr('data-name')});
			})
			$('#assetObject .active[data-role=cate2]', $el).each(function () {
				cate2.push({cateId:$(this).attr('data-id'),cateName: $(this).attr('data-name')});
			})
			$('#assetObject .active[data-role=cate3]', $el).each(function () {
				cate3.push({cateId:$(this).attr('data-id'),cateName: $(this).attr('data-name')});
			})

			$('#appSystem *[data-role=cate1]', $el).each(function () {
				cate1AppTmp.push({cateId:$(this).attr('data-id')});
			})
			$('#appSystem *[data-role=cate2]', $el).each(function () {
				cate2AppTmp.push({cateId:$(this).attr('data-id')});
			})
			$('#appSystem *[data-role=cate3]', $el).each(function () {
				cate3AppTmp.push({cateId:$(this).attr('data-id')});
			})
			if (cate3App.length === 0 ) {
				cate1App = cate1AppTmp;
				cate2App = cate2AppTmp;
				cate3App = cate3AppTmp;
			}

			return JSON.stringify({
				category:{cate1:cate1,cate2:cate2,cate3:cate3},
				app:{cate1:cate1App,cate2:cate2App,cate3:cate3App}
			});
		}

		function getAppId() {
			appId = [];
			$('#appSystem .active[data-role=cate3]', $el).each(function () {
				appId.push($(this).attr('data-id'));
			})
			return appId;
		}

		function saveCategory($this){ 
			var $parent = $this.parent();
			var dataRole = $this.attr('data-role');
			var active = $this.hasClass('active');
			if(dataRole == 'cate1'){
				if(active){
					$('[data-role=cate2],[data-role=cate3]', $parent).addClass('active');
				}else{
					$('[data-role=cate2],[data-role=cate3]', $parent).removeClass('active');
				}
			}else if(dataRole == 'cate2'){
				var parent = $this.parent().parent();
				if(active){
					$('[data-role=cate3]', $parent).addClass('active');
					parent.find('[data-role=cate1]').addClass('active');
				}else{
					 $('[data-role=cate3]', $parent).removeClass('active');
					 if(!parent.find('.active[data-role=cate2]').length){
						parent.find('[data-role=cate1]').removeClass('active');
					 }
				}
			}else if(dataRole == 'cate3'){
				var cate2 = $this.parent().prev();
				if(active){
					cate2.addClass('active');
					cate2.parent().siblings('h5').addClass('active');
				}else{
					if(!$this.siblings('.active[data-role=cate3]').length){
						cate2.removeClass('active');
					}

					if(!cate2.parent().parent().find('.active[data-role=cate3]').length){
						cate2.parent().siblings('h5').removeClass('active');
					}
				}
			}

			if($('#appSystem',$el).find('span.active,h5.active').length){//应用系统
				$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
			}else{
				$('#accessLogUl>li:eq(0)',$el).removeClass('choosed');
			}

			if($('#assetObject',$el).find('span.active,h5.active').length){//资产对象
				$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
			}else{
				$('#accessLogUl>li:eq(1)',$el).removeClass('choosed');
			}
		}


		$('#dataTable', $el).on('click', 'tr', function(){
			var rowData = $dataTable.row(this).data();
			if(rowData){
				$(this).addClass('selected').siblings().removeClass('selected');
				$('.queryTrade-view', $el).removeClass('hide');
				app.domain.exports('queryTrade', {rowData});
				// 打开第一个页签
				// app.tab.closeNewWindow(lastID);
				openTabs($('[data-path].active', $el).data('path') || 'fields');
			}
		})

		$('.queryTrade-view-close,.queryTrade-mask', $el).on('click', function(){
			$('.queryTrade-view', $el).addClass('hide');
		})

		$('[data-path]', $el).on('click', function(){
			if(!$(this).hasClass('active')){
				$(this).addClass('active').siblings().removeClass('active');
				// app.tab.closeNewWindow(lastID);
				openTabs($(this).data('path'));
			}
		})

		$(document).on('click.hideRightView', function(e){
			if($(e.target).closest('tr').length == 0 && $(e.target).closest('.queryTrade-view').length == 0){
				$('.queryTrade-view', $el).addClass('hide');
			}
		})

		function openTabs(tabName){
			$('[data-name="'+ tabName +'"]', $el).addClass('active').siblings().removeClass('active');
			app.tab.openNewWindow({
				title: tabName,
				moduleId: 'queryTrade',
				section: [tabName],
				id: app.global.getUniqueId(),
				frameRenderTo: $('#rightDetailsView', $el)
			});
		}

		function sqlSearch(data){
			return new Promise((resolve,reject)=>{
				app.common.ajaxWithAfa({
					url: 'ESSearchAction_sqlSearchWithAggregationsParse.do',
					data: data
				}).done(function(content) {
					resolve(content);
				})
			});
		}

		var tableColumns = {
			'0': {
				columns: [
				{ data: null, title: '展示趋势', defaultContent: '<input type="checkbox" />', orderable: false},
				{ data: ['_head_.appid'], title: '应用', defaultContent: '-'},
				{ data: 'avgTime', title: '平均交易耗时', defaultContent: '-'},
				{ data: 'maxTime', title: '最大交易耗时', defaultContent: '-'},
				{ data: 'count', title: '交易量', defaultContent: '-'}
				],
			},
			'1': {
				columns: [
				{ data: null, title: '展示趋势', defaultContent: '<input type="checkbox" />', orderable: false},
				{ data: ['_head_.objectid'], title: '软件', defaultContent: '-'},
				{ data: 'avgTime', title: '平均交易耗时', defaultContent: '-'},
				{ data: 'maxTime', title: '最大交易耗时', defaultContent: '-'},
				{ data: 'count', title: '交易量', defaultContent: '-'}
				],
			},
			'2': {
				columns: [
				{ data: null, title: '展示趋势', defaultContent: '<input type="checkbox" />', orderable: false},
				{ data: ['_head_.hostip'], title: '主机IP', defaultContent: '-'},
				{ data: 'avgTime', title: '平均交易耗时', defaultContent: '-'},
				{ data: 'maxTime', title: '最大交易耗时', defaultContent: '-'},
				{ data: 'count', title: '交易量', defaultContent: '-'}
				],
			},
			'3': {
				columns: [
				{ data: null, title: '展示趋势', defaultContent: '<input type="checkbox" />', orderable: false},
				{ data: ['_head_.sourceid'], title: '日志源', defaultContent: '-'},
				{ data: 'avgTime', title: '平均交易耗时', defaultContent: '-'},
				{ data: 'maxTime', title: '最大交易耗时', defaultContent: '-'},
				{ data: 'count', title: '交易量', defaultContent: '-'}
				],
			},
			'4': {
				columns: [
				{ data: null, title: '展示趋势', defaultContent: '<input type="checkbox" />', orderable: false},
				{ data: ['_head_.file.keyword'], title: '日志文件', defaultContent: '-'},
				{ data: 'avgTime', title: '平均交易耗时', defaultContent: '-'},
				{ data: 'maxTime', title: '最大交易耗时', defaultContent: '-'},
				{ data: 'count', title: '交易量', defaultContent: '-'}
				],
			},
		}

		var echartsObj = {};
		$('.echarts-tongji', $el).each(function(index){
			echartsObj[index] = echarts.init(this);
		})
		var dataTableObj = {};
		$('.tabs-left table').each(function(index){
			dataTableObj[index] = $('#table'+index ,$el).DataTable({
				...tableColumns[index],
				columnDefs: [{
					targets: [1],
					render: function (data, type, row, meta){
						let d = (index != 3?dict:dictLogSource);
						return data in d?d[data]:data;
					}
				},{
					targets: [2,3],
					type: 'time',
					render: function (data, type, row, meta){
						return TimeFormat(Number(data).toFixed(1));
					}
				},{
					targets: [4],
					render: function (data, type, row, meta){
						return parseInt(data);
					}
				}],
				searching: false,
				autoWidth: false,
				order: [],
				paging: 'simple',
				pageLength: 10,
				scrollY: '390px',
			});
		})

		var tabData = {
			'0': {
				'tableData': [],
				'echartsData': {
					'legend': {},
					'seriesData_top': {},
					'seriesData_bottom': {},
				}
			},
			'1': {
				'tableData': [],
				'echartsData': {
					'legend': {},
					'seriesData_top': {},
					'seriesData_bottom': {},
				}
			},
			'2': {
				'tableData': [],
				'echartsData': {
					'legend': {},
					'seriesData_top': {},
					'seriesData_bottom': {},
				}
			},
			'3': {
				'tableData': [],
				'echartsData': {
					'legend': {},
					'seriesData_top': {},
					'seriesData_bottom': {},
				}
			},
			'4': {
				'tableData': [],
				'echartsData': {
					'legend': {},
					'seriesData_top': {},
					'seriesData_bottom': {},
				}
			},
		};
		
		
		

		$('#table0,#table1,#table2,#table3,#table4', $el).on('change', 'input[type="checkbox"]', async function(){
			var keysArray = ['_head_.appid','_head_.objectid', '_head_.hostip', '_head_.sourceid', '_head_.file.keyword'];
			var tableIndex = $(this).closest('table').attr('data-table-index');
			var rowData = dataTableObj[tableIndex].row($(this).closest('tr')).data();
			// 统计勾选个数
			var checkedLength = dataTableObj[tableIndex].rows($('input[type="checkbox"]:checked', $('#table'+tableIndex, $el)).closest('tr')).data().toArray().length;
			if(checkedLength > 5){
				$(this).removeAttr('checked');
				return;
			}
			var thisValue = rowData[keysArray[tableIndex]];
			var isChecked = $(this).is(':checked');
			if(!isChecked){
				// 删除echarts本行的数据
				delete tabData[tableIndex]['echartsData']['legend'][thisValue];
				delete tabData[tableIndex]['echartsData']['seriesData_top'][thisValue];
				delete tabData[tableIndex]['echartsData']['seriesData_bottom'][thisValue];

				var legend = Object.values(tabData[tableIndex]['echartsData']['legend']);
				var seriesData_top = Object.values(tabData[tableIndex]['echartsData']['seriesData_top']);
				var seriesData_bottom = Object.values(tabData[tableIndex]['echartsData']['seriesData_bottom']);

				drawEcharts(legend,seriesData_top,tableIndex*2);
				drawEcharts(legend,seriesData_bottom,tableIndex*2+1);
				return;
			}

			var userDuration = 1;
			if($.isEmptyObject(forTableTime)){
				userDuration = (new Date(endTime.split('.')[0].replace(/-/g,'/')).getTime() - new Date(startTime.split('.')[0].replace(/-/g,'/')).getTime())/50000;
				userDuration = userDuration < 1 ? 1 : userDuration;
			}else{
				userDuration = (new Date(forTableTime.endTime.split('.')[0].replace(/-/g,'/')).getTime() - new Date(forTableTime.startTime.split('.')[0].replace(/-/g,'/')).getTime())/50000;
				userDuration = userDuration < 1 ? 1 : userDuration;
			}
			var sql_durationGte = '';
			if(queryParam['durationGte']){
				sql_durationGte = ` and duration >= ${queryParam['durationGte']} `;
			}
			var sql_durationLte = '';
			if(queryParam['durationLte']){
				sql_durationLte = ` and duration <= ${queryParam['durationLte']} `;
			}
			var sql_status = '';
			if(queryParam['_struct_.status']){
				sql_status = ` and _struct_.status.keyword = '${queryParam['_struct_.status']}' `;
			}

			var key_conditions = `and ${keysArray[tableIndex]} = '${thisValue}'`;

			var sql_for_echarts = [
			`*|select count(*) as count, avg(duration) as avgTime from applog-20190621 where 1=1 ${key_conditions} ${sql_durationGte?sql_durationGte:''} ${sql_durationLte?sql_durationLte:''} group by _head_.appid, date_histogram(field='start','interval'='${Math.floor(userDuration)}s','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5`,
			`*|select count(*) as count, avg(duration) as avgTime from applog-20190621 where 1=1 ${key_conditions} ${sql_durationGte?sql_durationGte:''} ${sql_durationLte?sql_durationLte:''} group by _head_.objectid, date_histogram(field='start','interval'='${Math.floor(userDuration)}s','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5`,
			`*|select count(*) as count, avg(duration) as avgTime from applog-20190621 where 1=1 ${key_conditions} ${sql_durationGte?sql_durationGte:''} ${sql_durationLte?sql_durationLte:''} group by _head_.hostip, date_histogram(field='start','interval'='${Math.floor(userDuration)}s','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5`,
			`*|select count(*) as count, avg(duration) as avgTime from applog-20190621 where 1=1 ${key_conditions} ${sql_durationGte?sql_durationGte:''} ${sql_durationLte?sql_durationLte:''} group by _head_.sourceid, date_histogram(field='start','interval'='${Math.floor(userDuration)}s','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00') limit 5`,
			`*|select count(*) as count, avg(duration) as avgTime from applog-20190621 where 1=1 ${key_conditions} ${sql_durationGte?sql_durationGte:''} ${sql_durationLte?sql_durationLte:''} group by _head_.file.keyword, date_histogram(field='start','interval'='${Math.floor(userDuration)}s','format'='yyyy-MM-dd HH:mm:ss','alias'='time','time_zone'='+08:00')`
			];
			let p = {
				'search': sql_for_echarts[tableIndex],
				'startTime': startTime,
				'endTime': endTime,
				...forTableTime,
				'cate': getAccessLogSetting(),
				'logType': 1,
			};
			var result = await sqlSearch(p);
			
			let d = (tableIndex != 3?dict:dictLogSource);

			tabData[tableIndex]['echartsData']['legend'][thisValue] = {
				'name': (thisValue in d?d[thisValue]:thisValue),
				'icon': 'roundRect'
			};
			tabData[tableIndex]['echartsData']['seriesData_top'][thisValue] = {
				name: (thisValue in d?d[thisValue]:thisValue),
				type: 'line',
				showSymbol: false,
				data: result.result.agg.map(item=>{
					return [new Date(item.time.replace(/-/g,'/')), Number(item.avgTime).toFixed(2)];
				})
			};
			tabData[tableIndex]['echartsData']['seriesData_bottom'][thisValue] = {
				name: (thisValue in d?d[thisValue]:thisValue),
				type: 'line',
				showSymbol: false,
				data: result.result.agg.map(item=>{
					return [new Date(item.time.replace(/-/g,'/')), Number(item.count).toFixed(2)];
				})
			};

			var legend = Object.values(tabData[tableIndex]['echartsData']['legend']);
			var seriesData_top = Object.values(tabData[tableIndex]['echartsData']['seriesData_top']);
			var seriesData_bottom = Object.values(tabData[tableIndex]['echartsData']['seriesData_bottom']);

			drawEcharts(legend,seriesData_top,tableIndex*2);
			drawEcharts(legend,seriesData_bottom,tableIndex*2+1);
		})

		async function StatisticalInformationQuery() {
			var tasks = [];
			var tabsKeyType = [
				{
					'aggField': '_head_.appid',
					'limit': 1000
				},
				{
					'aggField': '_head_.objectid',
					'limit': 1000
				},
				{
					'aggField': '_head_.hostip',
					'limit': 1000
				},
				{
					'aggField': '_head_.sourceid',
					'limit': 1000
				},
				{
					'aggField': '_head_.file.keyword',
					'limit': 10000
				}
			];
			var sql_durationGte = '';
			if(queryParam['durationGte']){
				var sql_durationGte = ` and duration >= ${queryParam['durationGte']} `;
			}
			var sql_durationLte = '';
			if(queryParam['durationLte']){
				var sql_durationLte = ` and duration <= ${queryParam['durationLte']} `;
			}
			var sql_hostip = '';
			if(queryParam['hostip']){
				var sql_hostip = ` and _head_.hostip = '${queryParam['hostip']}' `;
			}
			var sql_objectid = '';
			if(queryParam['objectid']){
				var sql_objectid = ` and _head_.objectid = '${queryParam['objectid']}' `;
			}
			var sql_fileName = '';
			if(queryParam['fileName']){
				var sql_fileName = ` and _head_.file.keyword like "%${queryParam['fileName']}%" `;
			}
			tabsKeyType.forEach((item) => {
				let p = {
					'search': `*|select count(*) as count, avg(duration) as avgTime, max(duration) as maxTime from applog-20190621 where 1=1 ${sql_durationGte?sql_durationGte:''} ${sql_durationLte?sql_durationLte:''} ${sql_hostip?sql_hostip:''} ${sql_objectid?sql_objectid:''} ${sql_fileName?sql_fileName:''} group by ${item.aggField} limit ${item.limit}`,
					'startTime': startTime,
					'endTime': endTime,
					...forTableTime,
					'cate': getAccessLogSetting(),
					'logType': 1,
				};
				tasks.push(sqlSearch(p))
			})
			var allResult = await Promise.all(tasks);
			// 填充表格数据
			for(let index in tabData){
				dataTableObj[index].clear().draw();
				tabData[index]['tableData'] = allResult[index].result.agg;
				dataTableObj[index].rows.add(tabData[index]['tableData']).draw();
			}
			// 清除echarts
			tabData = {
				'0': {
					'tableData': [],
					'echartsData': {
						'legend': {},
						'seriesData_top': {},
						'seriesData_bottom': {},
					}
				},
				'1': {
					'tableData': [],
					'echartsData': {
						'legend': {},
						'seriesData_top': {},
						'seriesData_bottom': {},
					}
				},
				'2': {
					'tableData': [],
					'echartsData': {
						'legend': {},
						'seriesData_top': {},
						'seriesData_bottom': {},
					}
				},
				'3': {
					'tableData': [],
					'echartsData': {
						'legend': {},
						'seriesData_top': {},
						'seriesData_bottom': {},
					}
				},
				'4': {
					'tableData': [],
					'echartsData': {
						'legend': {},
						'seriesData_top': {},
						'seriesData_bottom': {},
					}
				},
			};
			for(let index in echartsObj){
				echartsObj[index].clear();
			}
			// 默认渲染表格第1条数据
			if($.isEmptyObject(tabData['0']['echartsData']['legend'])){
				$('#table0 input[type="checkbox"]:eq(0),#table1 input[type="checkbox"]:eq(0),#table2 input[type="checkbox"]:eq(0),#table3 input[type="checkbox"]:eq(0),#table4 input[type="checkbox"]:eq(0)', $el).trigger('click');
			}
		}

		function drawEcharts(legend, seriesData, index){
			echartsObj[index].clear();
			let option = {
				color: ['#3398DB'],
				legend: {
					top: 8,
					right: 10,
					itemWidth: 14,
					data: legend
				},
				title: {
					text: (index%2==0?'平均耗时':'交易量'),
					left: 15,
					top: 8,
					textStyle: {
						fontSize: 14,
						color: '#555'
					}
				},
				tooltip : {
					trigger: 'axis',
					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
					},
				},
				grid: {
						left: '15',
						right: '15',
						bottom: '15',
						top: '45',
						containLabel: true
				},
				xAxis : [
					{
						type : 'time',
						axisTick: {
							show: false
						},
						splitLine: {
							show: false
						},
						axisLabel: {
						}
					}
				],
				yAxis : [
					{
						type : 'value',
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
					}
				],
				series : seriesData
			};
			echartsObj[index].setOption(option);
		}

		$('#mingxi[data-toggle="tab"]', $el).on('shown', function (e) {
			$dataTable.columns.adjust();
			// 展示筛选控件
		})

		$('#tongji,.tabs-left [data-toggle="tab"]', $el).on('shown', function (e) {
			for(let i in echartsObj){
				echartsObj[i].resize();
			}
			for(let i in dataTableObj){
				dataTableObj[i].columns.adjust();
			}
		})

		$('.ofh>div>div', $el).css('height', (document.documentElement.clientHeight - 406)+'px');

		// 全屏控制
		$el.on('click', '#toggleScreenBtn', function(){
			$(this).toggleClass('toggle-full-screen-btn toggle-nofull-screen-btn');
			$('.toFullScreen', $el).toggleClass('open');
			if($(this).hasClass('toggle-nofull-screen-btn')){
				$('#mask').addClass('mask').css('z-index', '1049');
				$('#dataTable_wrapper .dataTables_scrollBody', $el).css('height', (document.documentElement.clientHeight - 261)+'px');
				$('.ofh>div>div,.ofh>div>div>div', $el).css('height', (document.documentElement.clientHeight - 200)+'px');
			}else{
				$('#mask').removeClass('mask').css('z-index', 'auto');
				$('#dataTable_wrapper .dataTables_scrollBody', $el).css('height', (document.documentElement.clientHeight - 486)+'px');
				$('.ofh>div>div,.ofh>div>div>div', $el).css('height', (document.documentElement.clientHeight - 406)+'px');
			}
			$dataTable.columns.adjust();
			for(let i in dataTableObj){
				dataTableObj[i].columns.adjust();
			}
			for(let i in echartsObj){
				echartsObj[i].resize();
			}
		})

		function TimeFormat(time){
			if(time < 1000){
				return `<span data-time="${time}">${time + 'ms'}</span>`;
			}else if(time < 60000){
				return `<span data-time="${time}">${(time/1000).toFixed(1) + 's'}</span>`;
			} else {
				return `<span data-time="${time}">${(time/60000).toFixed(1) + 'min'}</span>`;
			}
		}

		var dict = {};
		var dictLogSource = {};

		app.common.ajaxWithAfa({
			url: 'LogStaticsAction_getAppIdMapping.do',
		}).done(function(content) {
			dict = content.result;
		})

		app.common.ajaxWithAfa({
			url: 'LogCfgSourceAction_getAllSourceIdSourceName.do',
		}).done(function(content) {
			dictLogSource = content.result;
		})
		

	},
	unload : function(handler) {
		app.tab.closeNewWindow(lastID);
		stopAjaxGetEchartsData();
	},
	pause : function($el, attr, handler) {
	},
	resume : function($el, attr, handler) {
	}
};
});