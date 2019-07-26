define(["jquery",'echarts4'], function($, echarts) {
	return {
		load : function($el, scope, handler) {
			var appName = app.domain.get('AppPerforMonit', 'appName');
			var echartsObj = {};
			var $addViewModal = $('#addViewModal', $el);
			
			function ajaxWithAfa(url,data){
				return new Promise((resolve,reject)=>{
					app.common.ajaxWithAfa({
						url: url,
						data: data
					}).done(function(content){
						resolve(content.result);
					})
				});
			}

			function transArrMap2MapArr(arr){
				var map = {
					'time': [],
					'value': []
				};
				arr.forEach((item) => {
					map['time'].push(new Date(item['key']).Format('hh:mm'));
					for(let key in item){
						if(key != 'doc_count' && key != 'key' && key != 'key_as_string'){
							map['value'].push(item[key].value);
						}
					}
				})
				return map;
			}

			$('.AppPerforTab2-echarts', $el).each(function(index){
				this.id = app.global.getUniqueId();
				echartsObj[this.id] = echarts.init(this);
			});

			async function getByObjName() {
				let objName = appName,
					type = 1;
				// 查询用户创建的图表
				var result = await ajaxWithAfa('AppStatisticAction_getByObjName.do', {objName,type});

				for(let i=0; i<result.length; i++){
					let item = result[i];
					let $userEcharts = $(`
						<div data-type="user" 
							id="${item.id}" 
							data-es-sql="${item.esSql}" 
							data-echars-type="${item.echarsType}" 
							data-ret-desc="${item.retDesc}">
							<div class="AppPerforTab2-buttonBar">
								<i class="fa fa-edit"></i>
								<i class="fa fa-trash"></i>
							</div>
							<div class="AppPerforTab2-echarts"></div>
						</div>`);
					// 添加用户创建的echarts
					$('.addView', $el).before($userEcharts);
					echartsObj[item.id] = echarts.init($('.AppPerforTab2-echarts', $userEcharts)[0]);
					
					// 处理图表数据
					var buckets = transArrMap2MapArr(item.statis.aggs.buckets);
					
					// 渲染echarts
					drawEcharts(item.id, {
						title: item.retDesc,
						time: buckets.time,
						value: buckets.value,
						type: getEchartsType(item.echarsType),
					});
				}
			}

			function getEchartsType(type){
				var EchartsType = 'line';
				switch(type){
					case 1: EchartsType = 'bar';break;
					case 2: EchartsType = 'line';break;
					case 3: EchartsType = 'pie';break;
				}
				return EchartsType;
			}

			async function statisEchars() {
				var time = await ajaxWithAfa(`ESSearchAction_getNowTime.do`);
				var cate = JSON.stringify({"app":{"cate3":[{"cateName":appName}]}});
				var startTime = new Date(time).Format('yyyy-MM-dd 00:00:00');
				var endTime = new Date(time).Format('yyyy-MM-dd hh:mm:ss');

				$.when(
					app.common.ajaxWithAfa({url: `AppStatisticAction_statisEchars.do`, data: {'field': 'avg(duration)','cate': cate,'startTime': startTime,'endTime': endTime}}),
					app.common.ajaxWithAfa({url: `AppStatisticAction_statisEchars.do`, data: {'field': 'count(*)','cate': cate,'startTime': startTime,'endTime': endTime}}),
				).done(function(content_avg,content_count){
					var buckets_avg = content_avg.result.aggs.buckets;
					var buckets_count = content_count.result.aggs.buckets;

					var datetime_avg = buckets_avg.map(function(item,index){
						return new Date(item.key).Format('hh:mm');
					})
					var value_avg = buckets_avg.map(function(item,index){
						return parseInt(item['AVG(duration)'].value);
					})
						
					var datetime_count = buckets_count.map(function(item,index){
						return new Date(item.key).Format('hh:mm');
					})
					var value_count = buckets_count.map(function(item,index){
						return item['COUNT(*)'].value;
					})

					drawEcharts($('.AppPerforTab2-echarts:eq(0)', $el).attr('id'), {
						title: '当日交易平均耗时',
						time: datetime_avg,
						value: value_avg,
						type: 'line',
						unit: '毫秒'
					});
					drawEcharts($('.AppPerforTab2-echarts:eq(1)', $el).attr('id'), {
						title: '当日交易量',
						time: datetime_count,
						value: value_count,
						type: 'line',
						unit: '笔'
					});
				})
			}

			$('.addView', $el).on('click', function(){
				$('#myModalLabel', $el).html('新增仪表盘');
				$('form', $addViewModal)[0].reset();
				$addViewModal.modal('show');
			});

			$('.AppPerforTab2-grid-layout', $el).on('click', '.fa-edit', function() {
				var $userEcharts = $(this).closest('[data-type="user"]');
				$('#myModalLabel', $el).html('修改仪表盘');
				$('form', $addViewModal)[0].reset();
				$('form', $addViewModal)[0].id = $userEcharts[0].id;
				$('#esSql', $el).val($userEcharts[0].dataset.esSql);
				$(`[name="echarsType"][value="${$userEcharts[0].dataset.echarsType}"]`, $el).trigger('click');
				$('#retDesc', $el).val($userEcharts[0].dataset.retDesc);
				$addViewModal.modal('show');
			})

			$('.AppPerforTab2-grid-layout', $el).on('click', '.fa-trash', function() {
				var id = $(this).closest('[data-type="user"]').attr('id');
				app.confirmDialog({//提示框组件
					sTitle:"请确认",  //确认框标题         
	                sType:"search",  //模块类型，有normal，success，search，warn，error,默认为normal常规
	                sContent:'确定要删除此图表吗？',  //确认框内容，非必填
	                sBtnConfirm: '确定',  //确认按钮显示内容
	                sBtnCancel: '取消',  //却笑按钮显示内容
	                fnConfirmHandler: async function(){
	                	var result = await ajaxWithAfa(`AppStatisticAction_del.do`, {id});
	                	if(result){
	                		app.alert("删除成功");
	                		echartsObj[id].dispose();
	                		$(`#${id}`, $el).remove();
	                	}
	                },  
				})
			})


			$('.confirmBtn', $el).on('click', async function(){
				let esSql = $('#esSql', $el).val(),
					objName = appName,
					echarsType = $('[name="echarsType"]:checked', $el).val(),
					retDesc = $('#retDesc', $el).val(),
					type = 1;
				var echartsData,
					echartsId;
				if($('#myModalLabel', $el).html() != '修改仪表盘'){
					let result = await ajaxWithAfa('AppStatisticAction_add.do', {esSql,objName,retDesc,echarsType,type});
					if(result){
						app.alert("新增成功");
						let $userEcharts = $(`
							<div data-type="user" 
								id="${result}" 
								data-es-sql="${esSql}" 
								data-echars-type="${echarsType}" 
								data-ret-desc="${retDesc}">
								<div class="AppPerforTab2-buttonBar">
									<i class="fa fa-edit"></i>
									<i class="fa fa-trash"></i>
								</div>
								<div class="AppPerforTab2-echarts"></div>
							</div>`);
						$('.addView', $el).before($userEcharts);
						echartsObj[result] = echarts.init($('.AppPerforTab2-echarts', $userEcharts)[0]);
						echartsId = result;
					}
				}else{
					let id = $('form', $addViewModal)[0].id;
					let result = await ajaxWithAfa('AppStatisticAction_update.do', {esSql,objName,retDesc,echarsType,id});
					if(result){
						app.alert("修改成功");
						$('#'+id, $el)[0].dataset.esSql = esSql;
						$('#'+id, $el)[0].dataset.retDesc = retDesc;
						$('#'+id, $el)[0].dataset.echarsType = echarsType;
						$addViewModal.modal('hide');
					}
					echartsId = id;
				}
				if(echartsId){
					// 查询用户创建的图表
					var AllUserCreate = await ajaxWithAfa('AppStatisticAction_getByObjName.do', {objName,type});
					AllUserCreate.some((item) => {
						if(item.id == echartsId){
							echartsData = item;
							return true;
						}else{
							return false;
						}
					})
					// 处理图表数据
					var buckets = transArrMap2MapArr(echartsData.statis.aggs.buckets);
					// 渲染echarts
					drawEcharts(echartsId, {
						title: echartsData.retDesc,
						time: buckets.time,
						value: buckets.value,
						type: getEchartsType(echartsData.echarsType),
					});
				}
			})

			function drawEcharts(id, data){
				var option = {
					grid: {
						left: 20,
						bottom: 20,
						right: 20,
						top: 70,
						containLabel: true
					},
					title: {
						left: 'center',
						top: 10,
						text: data.title,
					},
					tooltip: {
						show: true,
						trigger: 'axis'
					},
				    xAxis: {
				        data: data.time,
				        axisLabel: {
				            textStyle: {
				            }
				        },
				        axisTick: {
				            show: false
				        },
				        axisLine: {
				            show: false
				        },
				        z: 10
				    },
				    yAxis: {
				    	name: data.unit?data.unit:'',
				        axisLine: {
				            show: false
				        },
				        axisTick: {
				            show: false
				        },
				        axisLabel: {
				            textStyle: {
				                color: '#999'
				            }
				        }
				    },
				    series: [
				        {
				            type: data.type,
				            itemStyle: {
				                normal: {
				                    color: '#55a8fd',
				                },
				            },
				            data: data.value
				        }
				    ]
				}
				echartsObj[id].setOption(option);
			}

			statisEchars();
			getByObjName();
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});