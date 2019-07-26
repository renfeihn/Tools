define(["jquery", "handlebars","module/logResultCheck/logSearchDetail/logStatisticsView/statisticsEchartsTool","loadChartsIndex","upload"], 
		function($, hb,StatisticsEchartsTool, loadChartsIndex, Upload) {
	var echartsObj = null;
	var $parentEl = null;
	var timer = null;
		return {
			load : function($el, scope, handler) {
				
				echartsObj = app.echarts.init($('#echarts', $el)[0]);
				var $modal = $('#modal', $el),
				sqlSearchData = scope.sqlSearchData,
				searchType = scope.searchType,// sql or spl
				urlData = scope.urlData,
				logStatisticsViewConfig = scope.logStatisticsViewConfig,
				sourceIds = scope.sourceIds,
				PAGECONFIGCOPY,
				PAGECONFIG,
				sqlSearchFields,
				templates={},//模板
				paramData={},//echarts配置数据
				colDataGloabel = [],
				dashboardId = scope.dashboardId,
				colDataGloabelData = [],
				$statisticalTable = null,
				logIndexConfig = new loadChartsIndex(),
				urlParam= scope.urlData,//echarts请求参数
				fieldName = scope.fieldName,
				dataBordName = scope.dataBordName,
				echartsType1 = scope.echartsType,
				formatSqlSearchData;
				
//				app.Upload = new Upload();

				var excel = JSON.parse(JSON.stringify(sqlSearchData));
				
				$parentEl = scope.$parentEl;
				if ($('#quickSearchHide', $parentEl).hasClass('fa-chevron-right')) {
					$('#echarts', $el).css('width', 'calc(100vw - 345px)');
				}else{
					$('#echarts', $el).css('width', 'calc(100vw - 545px)');
				}
				hb.registerHelper('if_eq', function (v1, v2, opts) {
					if (v1 == v2)
						return opts.fn(this);
					else
						return opts.inverse(this);
				});
				// 预编译模板
				$('script[type="text/x-handlebars-template"]', $el).each(function (index, element) {
					var $this = $(this);
					templates[$this.attr('id')] = hb.compile($this.html());
				});
				
				/**
				 * 统计面板事件绑定
				 */
				$('#settingContent', $el).on('click', '#drawEcharts', function(event) {
					if($(this).hasClass('disabled')){
						return;
					}
					$(this).addClass('disabled');
					paramData.fields=['统计结果'];
					paramData.notRequireFormat = true;
					var fields = []
					var data = $.extend(true, [], formatSqlSearchData);
					$('[data-role="fields"]', $el).blur();
					
					$('[data-role="field"]', $el).each(function() {
						fields.push($(this).text());
					});
					if(fields.length <= 0){
						app.alert('请选择字段');
						return;
					}
					paramData.selectFields = fields
					drawEcharts(data,paramData);
					/*echartsData = forMatEchartsData(data);
					if(echartsData){
						drawEcharts(echartsData,paramData);
					}else{
						app.alert('不支持该类型统计');
					}*/
					
				}).on('click', '[role=tableFields] .fa-arrow-circle-up', function(event) {
					var index = $(this).parent().parent().index();
					var len = $(this).parent().parent().parent().children().length;
					if(index == 0){
						app.alert('已为最前列');
					}else{
//						var tmp = PAGECONFIG.table.fields[index];
//						PAGECONFIG.table.fields[index] = PAGECONFIG.table.fields[index-1];
//						PAGECONFIG.table.fields[index-1] = tmp;
//						$('#typeContent', $el).html(templates['logSSSVtmp-tableFields'](PAGECONFIG.table));
						var tmp = colDataGloabel[index];
						colDataGloabel[index] = colDataGloabel[index-1];
						colDataGloabel[index-1] = tmp;
						setTempData();
						var tmp = JSON.parse(JSON.stringify(colDataGloabel));
						tmp.unshift({
							data: 'index',
							title: '序号'
						});
						initDataTable(tmp, colDataGloabelData);
//						index++;
//						var thLen = $('#statisticalTable th', $el).length;
//						if(len+1 < thLen){
//							index++;
//						}
//						
//						$('#statisticalTable th:eq('+index+'), #statisticalTable td:eq('+index+')', $el).each(function () {
//							var tmpEle = $(this).clone();
//							$(this).prev().before(tmpEle);
//							$(this).remove();
//						})
					}
				})
				// 结构化字段-添加字段
				.on('click', '[btn-role=addFields]', function(event) {
					var role = $(this).parents('[content-role]').attr('content-role');
					role = role || 'yline';
					// var config = PAGECONFIG[paramData.echartsType][role].fields;
					var config = PAGECONFIG.line[role].fields;
					var len = $(this).siblings('select').length;
					if(len){
						if($(this).siblings('select').val() == '请选择'){
							app.alert('请选择字段');
							return;
						}else{
							$(this).siblings('select').trigger('blur');
						}
					}
					if(config && config.select.typeSelset.length > 0){
						$(this).before(templates['logSSSVtmp-onlySelect'](config.select));
					}else{
						app.alert('无可添加字段');
					}
				})
				// 结构化字段-保存字段
				.on('blur', '[data-role=fields]', function(event) {
					var fields = $(this).val();
					if(fields == '请选择'){
						app.alert('请选择字段');
						return;
					}
					var role = $(this).parents('[content-role]').attr('content-role');
					role = role || 'yline';
					$(this).before(templates['logSSSVtmp-fields']({'fields':fields}));
					$(this).remove();
					// var config = PAGECONFIG[paramData.echartsType][role].fields.select.typeSelset;
					var config = PAGECONFIG.line[role].fields.select.typeSelset;
					var fieldIndex;
					for (var i = 0; i < config.length; i++) {
						if(config[i].name == fields){
							fieldIndex = i;
							break;
						}
					}
					config.splice(fieldIndex,1);
				})
				// 结构化字段-删除已选字段
				.on('click', '.logSSSVtmp-removeField', function(event) {
					var role = $(this).parents('[content-role]').attr('content-role');
					role = role || 'yline';
					var select = $(this).parent().siblings('select');
					var field = $(this).prev().html();
					// var config = PAGECONFIG[paramData.echartsType][role].fields.select.typeSelset;
					var config = PAGECONFIG.line[role].fields.select.typeSelset;
					config.push({name:field,value:field});
					select.append('<option value="'+field+'">'+field+'</option>');

					$(this).parent().remove();
				});

				/**
				 * 回显时初始化字段(多字段选择类)
				 * @param  {[type]} logStatisticsViewConfig 配置参数
				 * @param  {[type]} config 该分类配置参数
				 * @return {[type]}                         
				 */
				function initFields(fields) {
					fields.forEach(function (item) {
						if(paramData.selectFields){
							if(paramData.selectFields.indexOf(item.name) > -1){
								$('[btn-role=addFields]', $el).before(templates['logSSSVtmp-fields']({'fields':item.name}));
							}else{
								PAGECONFIG.line.yline.fields.select.typeSelset.push(item);
							}
						}else{
							$('[btn-role=addFields]', $el).before(templates['logSSSVtmp-fields']({'fields':item.name}));
						}
						var fieldIndex;
					})
					/*if(logStatisticsViewConfig.paramData.isFilterNull){
						$('[data = "过滤空项"]', $el).attr('checked','true');
					}*/
				}

				/**
				 *	绘制echarts
				 * @param  {[type]} paramData [description]
				 * @return {[type]}           [description]
				 */
				function drawEcharts(echartsData,paramData) {
					var option = StatisticsEchartsTool.getOption(echartsData,paramData);
					echartsObj && echartsObj.clear();//清空echarts数据
					if(option){
						echartsObj.setOption(option);
						echartsObj.resize();
					}else{
						app.alert('无数据')
					}
					app.shelter.hide();
					$('#drawEcharts', $el).removeClass('disabled');
				}

				// echarts容器大小变化
				$('#echartsHide', $parentEl).on('echartsResize', function(e){
					handler.setTimeout(function(){
						echartsObj && echartsObj.resize();
					},300);
				})
				$('#leftHide', $parentEl).on('echartsResize', function(e){
					handler.setTimeout(function(){ 
						echartsObj && echartsObj.resize();
					},300);
				});
				
				function setTempData () {
					var data = {
						title: "结构化字段",
						role: "tableFields",
						fields: colDataGloabel.map(item => {
							item.name = item.title;
							item.value = item.data;
							return item;
						})
					}
					$('#typeContent', $el).html(templates['logSSSVtmp-tableFields'](data));
				}

				// 图表类型切换
				$('#sqlSearchList', $el).on('click', '>span', function(event) {
					if($(this).hasClass('active')){
						return;
					}
					$(this).addClass('active').siblings().removeClass('active');
					echartsType = $(this).attr('char-type');
					paramData.echartsType = echartsType;
					$('#typeContent', $el).empty();
					PAGECONFIG = $.extend(true,{}, PAGECONFIGCOPY);
					if ($(".sqlSearchStatisticsView-new", $el).length !== 0) {
						$(".sqlSearchStatisticsView-new", $el).hide();
					}
					$('#sqlSearchStatisticsView', $el).children().show();
					if(echartsType == 'table'){
						$('#saveEcharts', $el).hide();
						$('#drawEcharts', $el).hide();
						
						$('#sqlSearchTable', $el).show().siblings().hide();
						setTempData()
						$(".sqlSearchStatisticsView-new", $el).hide();
						console.log('hide')
//						$('#typeContent', $el).html(templates['logSSSVtmp-tableFields'](PAGECONFIG.table));
					} else if (echartsType == 'charts') {
						$('#echarts', $el).show().siblings().hide();
						$('#saveEcharts', $el).show();
						$('#drawEcharts', $el).show();
						$('#sqlSearchStatisticsView', $el).children().hide();
						if ($(".sqlSearchStatisticsView-new", $el).length !== 0) {
							$(".sqlSearchStatisticsView-new", $el).show();
						} else {
							$('#sqlSearchStatisticsView', $el).append(templates['logEcharts-panel']({colDataGloabel: colDataGloabel}));
							initEventDrag();
						}
					} else {
						$('#saveEcharts', $el).show();
						$('#drawEcharts', $el).show();
						$('#echarts', $el).show().siblings().hide();
						/*if(PAGECONFIG[echartsType]){*/
							/*$('#typeContent', $el).append(templates['logSSSVtmp-panel'](PAGECONFIG[echartsType].xline));
							$('[content-role=xline]', $el).append(templates['logSSSVtmp-select'](PAGECONFIG[echartsType].xline.fields));
							$('#typeContent', $el).append(templates['logSSSVtmp-panel'](PAGECONFIG[echartsType].yline));
							$('[content-role=yline]', $el).append(templates['logSSSVtmp-add'](PAGECONFIG[echartsType].yline.fields));*/
							$('#typeContent', $el).append(templates['logSSSVtmp-add'](PAGECONFIG.line.yline.fields));
						/*}else{
							app.alert('图表未配置');
							return false;
						}*/
						initFields(sqlSearchFields);
						$('#drawEcharts', $el).click();
					}
				});
				
				/**
				 * 2019-03-08 新增需求，若当前SQL查询为聚合SQL查询时，ESSearchAction_sqlSearch返回参数不同
				 */
				function sqlUnity(sqlSearchData) {
					var cols = [{data:'index',"title":"序号"}];
					var colData = [];
					var data = sqlSearchData[sqlSearchData.fieldName];
					if (data && data.length > 0) {
						var tmp = Object.keys(data[0]).map(item => {
							return {
								data: item.replace(/\./g,'-'),
								title: item.replace(/\./g,'-'),
							}
						})
						colData = data;
						colData = colData.map((item, index) => {
							item.index = index+1;
							for(var key in item) {
								item[key.replace(/\./g,'-')] = item[key];
								if (item[key].name) {
									item[key] = item[key].name;
								}
							}
							return item;
						})
						cols.push(...tmp);
						colDataGloabel = cols;
						colDataGloabel = colDataGloabel.slice(1);
						colDataGloabelData = colData;
					}
					initDataTable(cols, colData)
					$('#sqlSearchList>span:first', $el).trigger('click').addClass('active');
				}
				
				initPage();

				function initPage() {
					
					var coloums = [{data:'index'}];
					aoColumnDefs =[];
					sqlSearchFields = [];
					if (sqlSearchData.fieldName === 'agg') {
						sqlUnity(sqlSearchData);
						app.shelter.hide();
						return false;
					}
					formatSqlSearchData= StatisticsEchartsTool.formatTableData(sqlSearchData);
					var htmlString = '<th>序号</th>';
					var index = 1;
					for (var item in formatSqlSearchData[0]) {
						if(item != 'xlineName'){
							coloums.push({
								data:item,
								defaultContent:''
							});
							if(item != formatSqlSearchData[0].xlineName){
								sqlSearchFields.push({name:item,value:item});
							}
							(function(item){
								aoColumnDefs.push({
									'render':function(data,type,row,meta){
										return row[item] == undefined?'-':row[item];
									},
									'targets': index++
								});
							})(item);
							
							htmlString += '<th>'+item+'</th>';
						}
					}
					let cols = [];
					let colData = [];
					let hasAggregations = false;
					formatSqlSearchData.forEach(item => {
						if (item.aggregations) {
							hasAggregations = true;
							try {
								let data = item.aggregations.time.buckets;
								let tmp = data[0];
								let flag = false;
								for(var key in tmp) {
									if (tmp['key_as_string'] && tmp['key']) {
										flag = true;
									}
									if (key !== "doc_count") {
										cols.push({
											data: key,
											title: key
										})
									}
									
								}
								flag && (cols = cols.filter(item => {
									if (item.data == 'key') {
										return false;
									}
									return true;
								}))
								cols.unshift({
									data: 'index',
									title: '序号',
								})
								colData = data;
								colData = colData.map((item, index) => {
									item.index = index+1;
									for(var key in item) {
										if (item[key].value) {
											item[key] = item[key].value;
										} else if (item[key].name) {
											item[key] = item[key].name;
										}
									}
									return item;
								})
							} catch (e) {
								console.log(e);
							}
						}
					})
					if (!hasAggregations) {
						formatSqlSearchData.forEach(item => {
							if (item.hits && Array.isArray(item.hits)) {
								try {
									let data = item.hits;
									let tmp = data[0]._source;
									let flag = false;
									for(var key in tmp) {
										cols.push({
											data: key.replace(/\./g,'-'),
											title: key.replace(/\./g,'-'),
										})
									}
									cols.unshift({
										data: 'index',
										title: '序号',
									})
									colData = data.map(item => {
										return item._source;
									});
									colData = colData.map((item, index) => {
										item.index = index+1;
										for(var key in item) {
											item[key.replace(/\./g,'-')] = item[key];
											if (item[key].name !== null && item[key].name !== undefined) {
												item[key] = item[key].name;
											}
										}
										return item;
									})
								} catch (e) {
									console.log(e);
								}
							}
						})
					}
					if(searchType == 'spl'){
						formatSqlSearchData.forEach((item) => {
							for(let key in item){
								cols.push({
									data: key,
									title: key,
								})
							}
							cols.unshift({
								data: 'index',
								title: '序号',
							})
							colData[0] = item;
							colData[0]['index'] = 1;
						})
					}
					
					colData = colData.map(data => {
						cols.forEach(item => {
							if (item.data !== 'index' && (data[item.data] === null || data[item.data] === undefined)) {
								data[item.data] = "";
							}
						})
						return data;
					})
					
					colDataGloabel = cols;
					colDataGloabel = colDataGloabel.slice(1);
					colDataGloabelData = colData;
					if (cols.length === 0 || colData.length === 0) {
						app.shelter.hide();
						return;
					}
					formatSqlSearchData.forEach(function (item, index) {
						item.index = ++index;
					});
					app.shelter.hide();
					initDataTable(cols, colData)
					initConfig(sqlSearchFields);
					$('#sqlSearchList>span:first', $el).trigger('click').addClass('active');
					if(logStatisticsViewConfig){
						paramData = logStatisticsViewConfig.paramData;
						$('#sqlSearchList>span[char-type='+paramData.echartsType+']', $el).trigger('click').addClass('active');
					}
				}
				
				function initDataTable (cols, data) {
					$statisticalTable && $statisticalTable.clear();
					$statisticalTable && $statisticalTable.destroy();
					var colsTmp = cols.map(item => {
						return item.data;
					})
					colsTmp = colsTmp.filter(function (item) {
						if (item.indexOf('.') === -1) {
							return true;
						}
						return false;
					})
					data = data.map((item, index) => {
						var keys = Object.keys(item);
						keys = keys.filter(function (item) {
							if (item.indexOf('.') === -1) {
								return true;
							}
							return false;
						})
//						keys.forEach(key => {
//							if(item[key] && isTime(item[key]) && key !== 'index'){
//								if (item[key].indexOf('T') !== -1) {
//									item[key] = new Date(item[key]).Format('yyyy-MM-dd hh:mm:ss');
//								} else {
//									item[key] = new Date(new Date(item[key]).getTime() + 28800000).Format('yyyy-MM-dd hh:mm:ss');
//								}
//							}
//							if (item[key] && isNumber(item[key]) && key !== 'index') {
//								item[key] = Number(item[key]).toFixed(2);
//							}
//						})
						for(i = 0 ; i < colsTmp.length ; i ++ ) {
							if (!keys.includes(colsTmp[i])) {
								item[colsTmp[i]] = '';
							}
						}
						return item;
					})
					$statisticalTable = $('#statisticalTable', $el).DataTable({
						"stateSave": false,
						"autoWidth": true,
						"ordering": true,
						"searching" : true,
						"paging": true, //翻页功能
						"destroy": true,
						"bInfo":true,
						"pageLength": 10,
						"bLengthChange": true,
						"lengthMenu": [5,10,15,20,25,50,100],
						"columns": cols,
						
					})
					$statisticalTable.rows.add(data).draw();
				}
				
				function isNumber (data) {
					if (typeof(data) === 'number' && (data + '').indexOf('.') !== -1) {
						return true;
					} else if (!isNaN(data) && (data + '').indexOf('.') !== -1) {
						return true;
					}
					return false;
				}
				
				function isTime (data) {
					data += '';
					return !isNaN(new Date(data).getTime()) && data.indexOf(':') !== -1;
				}
				

				function isObject(obj) {
					if(Object.prototype.toString.call(obj) == '[object Object]'){
						return true;
					}else{
						return false;
					}
				}
				function initConfig(sqlSearchFields) {
					PAGECONFIGCOPY ={
						line:{
							xline:{
								title:'X轴',
								role:'xline',
								fields:{
									title:'结构化字段',
									role:'fieldsOne',
									typeSelset:[].concat(sqlSearchFields)
								}
							},
							yline:{
								title:'Y轴',
								role:'yline',
								fields:{
									title:'结构化字段',
									role:'addFields',
									select:{
										role:'fields',
										typeSelset:[]
									}
								}
							}
						},
						table:{
							title:'结构化字段',
							role:'tableFields',
							fields:sqlSearchFields
						}
					}
					PAGECONFIG = $.extend(true,{}, PAGECONFIGCOPY);
				}

				// 保存到仪表盘
				$('#saveEcharts', $el).on('click', function(event) {
					$modal.modal('show');
					if (dataBordName) {
						$('#name', $modal).val(dataBordName);
					} else {
						$modal.find('form')[0].reset();
					}
					$('#echartsP' ,$el).attr('src',echartsObj.getDataURL());
				});

				// 下载
				$('#download', $el).on('click', function(event) {
					if (colDataGloabelData.length === 0) {
						app.alert('无数据！');
						return;
					}
					logOperationBean({})
					if (urlData.search.indexOf(' group by ') === -1) {
						downLoadBigFile(urlData)
					} else {
						$.ajaxDownload('ESSearchAction_esportSQLStatistics.do',{
							aggs:JSON.stringify(excel),
							staticsType: -1,
						});
					}
				});
				
				function logOperationBean(params) {
		    		var param = {
		    			type: 13,
		    			appids: scope.appids,
		    			param: params
		    		}
		    		app.common.recordLogOperete({logOperationBean: JSON.stringify(param)});
		    	}
				
				function downLoadBigFile (urlData) {
					!app.Upload && (app.Upload = new Upload());
					app.Upload.push(urlData);
				}
				
				// 模态框确认事件
				$modal.on('click', '.confirmBtn', function(event) {
					var name = $('#name', $modal).val();
					if(name == ''){
						app.alert('请输入图表名称！');
						return;
					}
					if (dashboardId) {
						updateDashBoard(getDashBoardParamData(name))
					} else {
						addDashBoard(getDashBoardParamData(name));
					}
				});
				
				/**
				 * 修改到仪表盘
				 * @param {[type]} urlData 参数
				 */
				function updateDashBoard(urlData) {
					app.common.ajaxWithAfa({
						url:'DashBoardAction_updateDashBoard.do',
						data:urlData
					}).done(function (data) {
						if(data.result){
							app.alert('修改成功');
						}else{
							app.alert('修改失败');
						}
						$modal.modal('hide');
					})
				}

				/**
				 * 添加到仪表盘
				 * @param {[type]} urlData 参数
				 */
				function addDashBoard(urlData) {
					app.common.ajaxWithAfa({
						url:'DashBoardAction_addDashBoard.do',
						data:urlData
					}).done(function (data) {
						if(data.result){
							app.alert('保存成功');
						}else{
							app.alert('保存失败');
						}
						$modal.modal('hide');
					})
				}

				/**
				 * 组织“添加到仪表盘”的请求参数
				 * @param {[type]} name 仪表盘名称
				 * @return {[type]} tmpUrlParam 请求参数
				 */
				function getDashBoardParamData(name) {
					var intervalTime;
					var timeType = $('input[name=timeType]:checked', $modal).val();
					if(timeType == '0'){
						intervalTime = new Date(urlParam.endTime).getTime() - new Date(urlParam.startTime).getTime();
					}
					var interval = $("#interval", $el).val();
					if (!interval.trim()) {
						interval = 1;
					}
					if (/select/gi.test(urlParam.search)) {
						var search = urlParam.search.toLowerCase();
						var indexOf = search.indexOf('select');
						if (indexOf !== -1) {
							urlParam.sqlPhrases = search.substring(indexOf);
						}
					}
					var tmpUrlParam = $.extend(true, urlParam, {
						statistics: JSON.stringify({
							urlParam:$.extend(true, {}, urlParam,{image:undefined}),
							paramData:paramData,
							interval: interval
						}),
						id: dashboardId,
						echartsType: logIndexConfig.type,
						intervalTime: intervalTime,
						image: logIndexConfig.charts.getDataURL({pixelRatio:0.5}),
						name: name,
						timeType:timeType,
						mustValue: urlParam.cate,
						statisticsType: 3,
						fieldName: JSON.stringify(logIndexConfig.dataPool.dataMap)
					});

					return tmpUrlParam;
				}

				/**
				 * 保存仪表盘时获取echarts类型
				 * @param  {[type]} paramData 配置参数
				 * @return {[Number]}  echartsType 1-折线图 2-柱状图 3-饼图
				 */
				function getEchartsTypeNumber(data) {
					var echartsType;
					if(data == 'line'){
						echartsType = 1;
					}else if(data == 'bar'){
						echartsType = 2;
					}else if(data == 'pie'){
						echartsType = 3;
					}
					return echartsType;
				}
				
				
				var dragObj = null;
				function initEventDrag () {
					
					logIndexConfig.init($("#newEchartsLog", $el)[0],colDataGloabelData);
					
					reStoreConfig(fieldName);
					
					$("#fieldContent", $el).off('dragstart, dragover, drop');
					$("#fieldContent", $el).on("dragstart","span.field-content-item", function (e) {
						e.stopPropagation();
						dragObj = $(this);
					}).on("dragover","span.field-content-item", function (e) {
						e.preventDefault();
					}).on("drop","span.field-content-item", function (e) {
						e.stopPropagation();
					})
					
					$("#selectField", $el).off('.dragover, drop');
					$("#selectField", $el).on("dragover","div.drag-content-content", function (e) {
						e.preventDefault();
					}).on("drop","div.drag-content-content", function (e) {
						e.stopPropagation();
						var name = dragObj.attr('title');
						var value = dragObj.text().trim();
						var type = this.dataset.type;
						$(this).append(`<span class="select-field-item" title="${name}">
											<span class="name-select-field">${value}</span>
											<span class="fa fa-close" data-type="${type}"></span>
										</span>`);
						logIndexConfig.pushData({
							name,
							value,
							type
						})
						dragObj.addClass('active');
					})
					
					$(".sqlSearchStatisticsView-new-group>button", $el).off('click');
					$(".sqlSearchStatisticsView-new-group>button", $el).on("click", function () {
						var type = this.dataset.type;
						if ($(this).hasClass('active')) {
							return;
						}
						$(this).addClass('active').siblings().removeClass('active');
						logIndexConfig.changeType(type);
					})
					
					$(".sqlSearchStatisticsView-new", $el).off('click');
					$(".sqlSearchStatisticsView-new",$el).delegate(".select-field-item>span.fa-close", "click", function (e) {
						e.stopPropagation();
						var name = $(this).parent().attr('title');
						var value = $(this).parent().text().trim();
						var type = this.dataset.type;
						logIndexConfig.removeData({
							name,
							value,
							type
						})
						$(this).parent().remove();
						isHasUse(value);
					})
					
					$("#saveEcharts", $(".sqlSearchStatisticsView-new", $el)).on("click", function () {
						$modal.modal('show');
						if (dataBordName) {
							$('#name', $modal).val(dataBordName);
						} else {
							$modal.find('form')[0].reset();
						}
						$('#echartsP' ,$el).attr('src',logIndexConfig.charts && logIndexConfig.charts.getDataURL());
					});
					
					$('#download', $(".sqlSearchStatisticsView-new", $el)).on('click', function(event) {
						$.ajaxDownload('ESSearchAction_esportSQLStatistics.do',{
							aggs:JSON.stringify(excel),
							staticsType: -1,
						});
					});
					
				}
				
				function reStoreConfig(fieldName) {
					if (fieldName && fieldName.length !== 0) {
						logIndexConfig.pushAllData(fieldName);
					}
					if (echartsType1) {
						logIndexConfig.changeType(echartsType1+'');
						$(".sqlSearchStatisticsView-new-group>button[data-type='"+echartsType1+"']", $el).addClass('active').siblings().removeClass('active');
					}
					fieldName && fieldName.forEach(item => {
						var type = item.type;
						var name = item.name;
						var value = item.value;
						var $content = $("#selectField>div.drag-content-content[data-type='"+type+"']");
						$content.append(`<span class="select-field-item" title="${name}">
											<span class="name-select-field">${value}</span>
											<span class="fa fa-close" data-type="${type}"></span>
										</span>`)
						var selectField = $("#fieldContent>span.field-content-item", $el);
						$.each(selectField, function () {
							if ($(this).text().trim() === value) {
								$(this).addClass('active');
							}
						})
					})
				}
				
				function isHasUse (value) {
					var $content = $(".drag-content-content>span.select-field-item", $el);
					var $active = $("#fieldContent>.field-content-item.active", $el);
					$.each($active, function () {
						var that = this;
						var tag = false;
						$.each($content, function () {
							if ($(this).text().trim() === $(that).text().trim()) {
								tag = true;
							}
						})
						if (!tag) {
							$(that).removeClass('active');
						}
					})
				}
			},

			unload : function(handler) {
				echartsObj && echartsObj.dispose();
				$parentEl && $('#echartsHide', $parentEl).off('echartsResize');
				$parentEl && $('#leftHide', $parentEl).off('echartsResize');
				timer && handler.clearInterval(timer);
			},

			pause : function($el, scope, handler) {
			},

			resume : function($el, scope, handler) {
			}
		};
	});
