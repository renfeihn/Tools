define(["jquery", "handlebars","module/logResultCheck/logSearchDetail/logStatisticsView/pageTool","module/logResultCheck/logSearchDetail/logStatisticsView/statisticsEchartsTool"], function($, hb,pageTool,StatisticsEchartsTool) {
	var echartsObj = null;
	var $parentEl;
		return {
			load : function($el, scope, handler) {
				/*if ($('#leftHide', $parentEl).hasClass('fa-chevron-right')) {
					$('#echarts', $el).css('width', 'calc(100vw - 352px)');
				}else{
					$('#echarts', $el).css('width', 'calc(100vw - 522px)');
				}*/
				echartsObj = app.echarts.init($('#echarts', $el)[0]);
				var $modal = $('#modal', $el),
				Fields = scope.Fields,
				urlData = scope.urlData,
				logStatisticsViewConfig = scope.logStatisticsViewConfig,
				PAGECONFIG = pageTool.getConfig(Fields),//页面配置
				templates={},//模板
				param={},//
				paramData={},//echarts配置数据
				urlParam;//echarts请求参数
				$parentEl = scope.$parentEl;
				var echartsReturnData;
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
					console.log($("#dateSetectInput", $parentEl).val());
					
					$(this).addClass('disabled');
					paramData = {
						typeValue: param.typeValue
					};
					paramData.fields=[];
					paramData.echartsType = $('[data-role="echartsTypeSelect"]', $el).val();

					switch(param.typeValue) {
						case '事件趋势统计':
							if(setEventCountParam()){
								app.shelter.show('加载中。。。');
								drawEcharts(paramData);
							}else{
								$(this).removeClass('disabled');
								return;
							}
							break;
						case '时间分区统计':
							if(setTimeSegmentParam()){
								app.shelter.show('加载中。。。');
								drawEcharts(paramData);
							}else{
								$(this).removeClass('disabled');
								return;
							}
							break;
						case '时间间隔统计':
							if(setTimeIntervalParam()){
								app.shelter.show('加载中。。。');
								drawEcharts(paramData);
							}else{
								$(this).removeClass('disabled');
								return;
							}
							break;
						case '数值区间统计':
							if(setNumSegmentParam()){
								app.shelter.show('加载中。。。');
								drawEcharts(paramData);
							}else{
								$(this).removeClass('disabled');
								return;
							}
							break;
						case '数值间隔统计':
							// 结构化字段
							paramData.fields.push($('[data-role="fields"]', $el).val());
							// 统计方式
							paramData.statisticalMethods = $('[data-role="statisticalMethods"]', $el).val();
							//时间间隔 
							paramData.timeInterval = $('[data-role="timeInterval"]', $el).val();
							paramData.interval = $('[data-role="intervalSelect"]', $el).val();
							drawEcharts(paramData);
							break;
						case '数值分类统计':
							if(setNumCategoryParam()){
								app.shelter.show('加载中。。。');
								drawEcharts(paramData);
							}else{
								$(this).removeClass('disabled');
								return;
							}
							break;
						case '数值百分比统计':
							if(setPercentParam()){
								app.shelter.show('加载中。。。');
								drawEcharts(paramData);
							}else{
								$(this).removeClass('disabled');
								return;
							}
							break;
						case '地理分布统计':
							if(setGeoParam()){
								app.shelter.show('加载中。。。');
								drawEcharts(paramData);
							}else{
								$(this).removeClass('disabled');
								return;
							}
							break;
					}
				})
				// 统计类型变化
				.on('change', '[data-role=typeSelset]', function(event) {
					$('#typeContent', $el).empty();

					var typeValue = $(this).val();
					param.typeValue = typeValue;
					var config = PAGECONFIG.detailConfig[typeValue];
					if(config){
						var tmpConfig = $.extend(true, {}, config);//复制配置，修改配置时不影响初始化配置
						if(logStatisticsViewConfig){
							tmpConfig.echartsType.defaultValue = logStatisticsViewConfig.paramData.echartsType;
						}
						$('#typeContent', $el).append(templates['logSVtmp-select'](tmpConfig.echartsType));
						switch(typeValue) {
							case '事件趋势统计':
									// 重置字段选项
									config.fields.select.typeSelset = [].concat(Fields.D || [],Fields.S || [],Fields.N || []);
									$('#typeContent', $el).append(templates['logSVtmp-add'](config.fields));
									if(logStatisticsViewConfig){
										initFields(logStatisticsViewConfig,config);
									}
								break;
							case '时间分区统计':
									if(logStatisticsViewConfig){
										tmpConfig.fields.defaultValue = logStatisticsViewConfig.paramData.fields[0];
									}
									$('#typeContent', $el).append(templates['logSVtmp-select'](tmpConfig.fields));
									$('#typeContent', $el).append(templates['logSVtmp-add'](config.timeSegment));
									if(logStatisticsViewConfig){
										initSegment(logStatisticsViewConfig, config,'time');
									}
								break;
							case '时间间隔统计':
									// 重置字段选项
									config.fields.select.typeSelset = [].concat(Fields.D || [],Fields.S || [],Fields.N || []);
									if(logStatisticsViewConfig){
										// 时间间隔回显设置
										tmpConfig.timeInterval.defaultValue = logStatisticsViewConfig.paramData.timeInterval;
										tmpConfig.timeInterval.select.defaultValue = logStatisticsViewConfig.paramData.interval;
									}
									$('#typeContent', $el).append(templates['logSVtmp-timeInterval'](tmpConfig.timeInterval));
									$('#typeContent', $el).append(templates['logSVtmp-add'](config.fields));

									if(logStatisticsViewConfig){
										console.log('restore')
										initFields(logStatisticsViewConfig,config);
									}
								break;
							case '数值区间统计':
									if(logStatisticsViewConfig){
										tmpConfig.fields.defaultValue = logStatisticsViewConfig.paramData.fields[0];
										tmpConfig.statisticalMethods.defaultValue = logStatisticsViewConfig.paramData.statisticalMethods
									}
									$('#typeContent', $el).append(templates['logSVtmp-select'](tmpConfig.fields));
									$('#typeContent', $el).append(templates['logSVtmp-select'](tmpConfig.statisticalMethods));
									$('#typeContent', $el).append(templates['logSVtmp-add'](config.numSegment));
									if(logStatisticsViewConfig){
										initSegment(logStatisticsViewConfig, config,'number');
									}
								break;
							case '数值间隔统计':
									$('#typeContent', $el).append(templates['logSVtmp-select'](config.fields));
									$('#typeContent', $el).append(templates['logSVtmp-select'](config.statisticalMethods));
									$('#typeContent', $el).append(templates['logSVtmp-timeInterval'](config.timeInterval));
									logStatisticsViewConfig = undefined;
								break;
							case '数值分类统计':
									if(logStatisticsViewConfig){
										tmpConfig.topSetting.defaultValue = logStatisticsViewConfig.paramData.top;
										tmpConfig.fields.defaultValue = logStatisticsViewConfig.paramData.fields[0];
									}
									$('#typeContent', $el).append(templates['logSVtmp-select'](tmpConfig.fields));
									$('#typeContent', $el).append(templates['logSVtmp-input'](tmpConfig.topSetting));
								break;
							case '数值百分比统计':
									if(logStatisticsViewConfig){
										tmpConfig.fields.defaultValue = logStatisticsViewConfig.paramData.fields[0];
									}
									$('#typeContent', $el).append(templates['logSVtmp-select'](tmpConfig.fields));
								break;
							case '地理分布统计':
									if(logStatisticsViewConfig){
										tmpConfig.fields.defaultValue = logStatisticsViewConfig.paramData.fields[0];
									}
									$('#typeContent', $el).append(templates['logSVtmp-select'](tmpConfig.fields));
								break;
						}
						
					}
				})
				// 结构化字段-添加字段
				.on('click', '[btn-role=addFields]', function(event) {
					var config = PAGECONFIG.detailConfig[param.typeValue];
					var len = $(this).siblings('select').length;
					if(len){
						if($(this).siblings('select').val() == '请选择'){
							app.alert('请选择字段');
							return;
						}else{
							$(this).siblings('select').trigger('blur');
						}
					}
					if(config && config.fields.select.typeSelset.length > 0){
						$(this).before(templates['logSVtmp-onlySelect'](config.fields.select));
					}else{
						app.alert('无可添加字段');
					}
				})
				// 结构化字段-保存字段
				.on('blur', '[data-role=fields]', function(event) {
					if(param.typeValue == '事件趋势统计' || param.typeValue == '时间间隔统计'){
						var fields = $(this).val();
						if(fields == '请选择'){
							app.alert('请选择字段');
							return;
						}

						$(this).before(templates['logSVtmp-fields']({'fields':fields}));
						$(this).remove();
						var config = PAGECONFIG.detailConfig[param.typeValue].fields.select.typeSelset;
						var fieldIndex;
						for (var i = 0; i < config.length; i++) {
							if(config[i].name == fields){
								fieldIndex = i;
								break;
							}
						}
						config.splice(fieldIndex,1);
					}
				})
				// 结构化字段-删除已选字段
				.on('click', '.logSVtmp-removeField', function(event) {
					var select = $(this).parent().siblings('select');
					var field = $(this).prev().html();
					var config = PAGECONFIG.detailConfig[param.typeValue].fields.select.typeSelset;
					config.push({name:field,value:field});
					select.append('<option value="'+field+'">'+field+'</option>');

					$(this).parent().remove();
				})
				// 时间分段-添加时间分段
				.on('click', '[btn-role=addTimeSegment]', function(event) {
					// 判断空值
					var inputObj = $(this).prev().find('input');
					if(!testSegment(inputObj)){
						return;
					}

					var config = PAGECONFIG.detailConfig[param.typeValue];
					if(config){
						$(this).before(templates['logSVtmp-Segment'](config.timeSegment.segmentConfig));
						// 初始化时间插件
						$('[data-role=timeSegment]', $el).each(function () {
							$(this).datetimepicker({
								format: 'yyyy-mm-dd hh:ii:ss',
								minView: 'hour',
								autoclose: 1,
								endDate:new Date()
							});
						})
					}

				})
				// 时间分段-删除分段
				.on('click', '.logSVtmp-SegmentRemove', function(event) {
					$(this).parent().remove();
				})
				// 时间分段-添加数值分段
				.on('click', '[btn-role=addNumSegment]', function(event) {
					// 判断空值
					var inputObj = $(this).prev().find('input');
					if(!testSegment(inputObj)){
						return;
					}

					var config = PAGECONFIG.detailConfig[param.typeValue];
					if(config){
						$(this).before(templates['logSVtmp-Segment'](config.numSegment.segmentConfig));
					}
				});
				
				// 初始化页面
				if(logStatisticsViewConfig && !$.isEmptyObject(logStatisticsViewConfig)){
					paramData = logStatisticsViewConfig.paramData;
					if(logStatisticsViewConfig.urlParam){
						app.shelter.show('加载中。。。');
						urlParam = $.extend(true, {}, logStatisticsViewConfig.urlParam,urlData);
						// 获取echarts数据
						getEchartsData(urlParam,logStatisticsViewConfig.paramData);
					}
					// 设置配置信息
					var config = $.extend(true, {}, PAGECONFIG.typeConfig);
					config.defaultValue = logStatisticsViewConfig.paramData.typeValue;
					$('#typeSelect', $el).html(templates['logSVtmp-select'](config));
					$('[data-role=typeSelset]', $el).trigger('change');
					if(!logStatisticsViewConfig.urlParam){
						$('#drawEcharts', $el).click();
					}
					logStatisticsViewConfig = undefined;
				}else{
					$('#typeSelect', $el).html(templates['logSVtmp-select'](PAGECONFIG.typeConfig));
					$('[data-role=typeSelset]', $el).trigger('change');
				}

				/**
				 * 回显时初始化字段(多字段选择类)
				 * @param  {[type]} logStatisticsViewConfig 配置参数
				 * @param  {[type]} config 该分类配置参数
				 * @return {[type]}                         
				 */
				function initFields(logStatisticsViewConfig,config) {
					var fields = logStatisticsViewConfig.paramData.fields;
					fields.forEach(function (item) {
						$('[btn-role=addFields]', $el).before(templates['logSVtmp-fields']({'fields':item}));

						var fieldConfig = config.fields.select.typeSelset;
						var fieldIndex;
						for (var i = 0; i < fieldConfig.length; i++) {
							if(fieldConfig[i].name == fields){
								fieldIndex = i;
								break;
							}
						}
						fieldConfig.splice(fieldIndex,1);
					})
					if(logStatisticsViewConfig.paramData.isFilterNull){
						$('[data = "过滤空项"]', $el).attr('checked','true');
					}
				}

				/**
				 * 回显时初始化分段
				 * @param  {[type]} logStatisticsViewConfig 配置参数
				 * @param  {[type]} config 该分类配置参数
				 * @param  {[type]} type 类型（'time'，'number'等）
				 * @return {[type]}                         [description]
				 */
				function initSegment(logStatisticsViewConfig, config, type) {
					var segment = logStatisticsViewConfig.paramData.segments;
					segment.forEach(function (item) {
						if(type == 'time'){
							var $btn = $('[btn-role=addTimeSegment]', $el);
							$btn.before(templates['logSVtmp-Segment'](config.timeSegment.segmentConfig));
							
							var inputs = $('[data-role=timeSegment]', $btn.prev());
							$(inputs[0]).val(item.start);
							$(inputs[1]).val(item.end);
						}else{
							var $btn = $('[btn-role=addNumSegment]', $el);
							$btn.before(templates['logSVtmp-Segment'](config.numSegment.segmentConfig));

							var inputs = $('[data-role="numSegment"]', $btn.prev());
							$(inputs[0]).val(item.start);
							$(inputs[1]).val(item.end);
						}
					})

					if(type == 'time'){
						$('[data-role=timeSegment]', $el).each(function () {
							$(this).datetimepicker({
								format: 'yyyy-mm-dd hh:ii:ss',
								minView: 'hour',
								autoclose: 1,
								endDate:new Date()
							});
						})
					}
				}

				/**
				 * 事件趋势统计配置参数设置
				 * @return {Boolean} true/false
				 */
				function setEventCountParam() {
					var fieldsObj = $('[data-role="field"]', $el);
					var fieldSelect = $('[data-role="fields"]', $el);
					if(fieldsObj.length <= 0 && fieldSelect.length <= 0){
						app.alert("请添加结构化字段。");
						return false;
					}

					if(fieldSelect.length > 0){
						if($(fieldSelect[0]).val() == "请选择"){
							fieldSelect.trigger('blur');
							return false;
						}else{
							fieldSelect.trigger('blur');
						}
					}
					$('[data-role="field"]', $el).each(function() {
						paramData.fields.push($(this).text());
					});
					// 字段过滤
					var fieldsFilterObjs = $('input:checked[data-role="fieldsFilter"]', $el);
					if(fieldsFilterObjs.length>0){
						fieldsFilterObjs.each(function () {
							if($(this).attr('data') == "过滤空项"){
								paramData.isFilterNull = true;
							}
						})
					}
					// 统计间隔
					var interval = getInterval(urlData.startTime,urlData.endTime);
					if(interval){
						paramData.interval = interval;
					}

					return true;
				}

				/**
				 * 时间分区统计配置参数设置
				 * @return {Boolean} true/false
				 */
				function setTimeSegmentParam() {
					paramData.fields.push($('[data-role="fields"]', $el).val());
					// 时间分段
					paramData.segments = [];
					var segments = $('.logSVtmp-SegmentContent', $el);
					if(segments.length <= 0){
						app.alert('请添加时间分段。');
						return false;
					}
					var testflag = true;
					segments.each(function (argument) {
						var segment = $('[data-role="timeSegment"]', $(this));
						if(!testSegment(segment)){
							testflag = false;
						}
						if(testflag){
							paramData.segments.push({
								start: $(segment[0]).val(),
								end: $(segment[1]).val()
							})
						}
					})
					if(!testflag){
						return false;
					}
					return true;
				}

				/**
				 * 时间间隔统计配置参数设置
				 * @return {Boolean} true/false
				 */
				function setTimeIntervalParam() {
					var fieldsObj = $('[data-role="field"]', $el);
					var fieldSelect = $('[data-role="fields"]', $el);
					if(fieldsObj.length <= 0 && fieldSelect.length <= 0){
						app.alert("请添加结构化字段。");
						return false;
					}

					if(fieldSelect.length > 0){
						if($(fieldSelect[0]).val() == "请选择"){
							fieldSelect.trigger('blur');
							return false;
						}else{
							fieldSelect.trigger('blur');
						}
					}
					$('[data-role="field"]', $el).each(function() {
						paramData.fields.push($(this).text());
					});
					// 字段过滤
					var fieldsFilterObjs = $('input:checked[data-role="fieldsFilter"]', $el);
					if(fieldsFilterObjs.length>0){
						fieldsFilterObjs.each(function () {
							if($(this).attr('data') == "过滤空项"){
								paramData.isFilterNull = true;
							}
						})
					}
					// 时间间隔
					paramData.timeInterval = $('[data-role="timeInterval"]', $el).val();
					if(paramData.timeInterval == ''){
						app.alert('请输入时间间隔');
						return false;
					}
					if(!/^\d+$/.test(paramData.timeInterval)){
						app.alert('时间间隔应为整数数字');
						return false;
					}
					paramData.interval = $('[data-role="intervalSelect"]', $el).val();
					return true;
				}

				/**
				 * 数值区间统计配置参数设置
				 * @return {Boolean} true/false
				 */
				function setNumSegmentParam() {
					// 结构化字段
					paramData.fields.push($('[data-role="fields"]', $el).val());
					// 统计方式
					paramData.statisticalMethods = $('[data-role="statisticalMethods"]', $el).val();
					// 数值分段
					paramData.segments = [];
					var segments = $('.logSVtmp-SegmentContent', $el);
					if(segments.length <= 0){
						app.alert('请添加数值分段。');
						return false;
					}
					
					for (var i = 0; i < segments.length; i++) {
						var segment = $('[data-role="numSegment"]', $(segments[i]));
						if(testSegment(segment)){
							paramData.segments.push({
								start: $(segment[0]).val(),
								end: $(segment[1]).val()
							})
						}else{
							return false;
						}
					}

					return true;
				}

				/**
				 * 数值分类统计配置参数设置
				 * @return {Boolean} true/false
				 */
				function setNumCategoryParam() {
					// 结构化字段
					paramData.fields.push($('[data-role="fields"]', $el).val());
					// TOP设定
					paramData.top = $('[data-role="topSetting"]', $el).val();

					return true;
				}

				/**
				 * 数值百分比统计配置参数设置
				 * @return {Boolean} true/false
				 */
				function setPercentParam() {
					// 结构化字段
					paramData.fields.push($('[data-role="fields"]', $el).val());
					return true;
				}
				/**
				 * 地理分布统计配置参数设置
				 * @return {Boolean} true/false
				 */
				function setGeoParam() {
					// 结构化字段
					paramData.fields.push($('[data-role="fields"]', $el).val());
					return true;
				}

				/**
				 * 验证分段输入的合理性
				 * @param  {[type]} inputObjs input对象
				 * @return {[type]}           [description]
				 */
				function testSegment(inputObjs) {
					var startInputVal = $(inputObjs[0]).val();
					var endInputVal = $(inputObjs[1]).val();

					if(startInputVal !='' && endInputVal != ''){
						if(param.typeValue == '时间分区统计'){
							var startTime = new Date(startInputVal).getTime();
							var endTime = new Date(endInputVal).getTime();

							if(startTime > endTime){
								app.alert('开始时间必须小于结束时间');
								return false;
							}
						}else if(param.typeValue == '数值区间统计'){
							if(parseInt(startInputVal) > parseInt(endInputVal)){
								app.alert('开始数值必须小于结束数值');
								return false;
							}
						}
					}else{
						if(param.typeValue == '时间分区统计'){
							app.alert('请填写时间分段');
						}else if(param.typeValue == '数值区间统计'){
							app.alert('请填写数值分段');
						}
						return false;
					}
					
					return true;
				}

				/**
				 *	绘制echarts
				 * @param  {[type]} paramData [description]
				 * @return {[type]}           [description]
				 */
				function drawEcharts(paramData) {
					var sql = getInputSql(paramData);
					urlParam = $.extend({}, urlData, {sql:sql});
					let val = $("#dateSetectInput", $parentEl).val();
					let startTime = val.split('~')[0];
					let endTime = val.split('~')[1];
					urlParam.startTime = startTime;
					urlParam.endTime = endTime;
					getEchartsData(urlParam,paramData);
				}

				/**
				 * 获取echarts数据
				 * @param  {[type]} param [description]
				 * @return {[type]}       [description]
				 */
				function getEchartsData(urlParam,paramData) {
					echartsReturnData = undefined;
					app.common.ajaxWithAfa({
						url:'ESSearchAction_sqlStatistics.do',
						data:urlParam
					}).done(function (data) {
						if(data.result && data.result != ''){
							echartsReturnData = data.result;
							var option = StatisticsEchartsTool.getOption(data.result,paramData);

							echartsObj && echartsObj.clear();//清空echarts数据
							if(option){
								echartsObj.setOption(option);
							}else{
								app.alert('无数据')
							}
							
						}
						app.shelter.hide();
						$('#drawEcharts', $el).removeClass('disabled');
					})
				}

				/**
				 * 组织查询sql
				 * @param  {[type]} param [description]
				 * @return {String}       查询sql
				 */
				function getInputSql(paramData) {
					var SQL = '';
					switch(param.typeValue) {
						case '事件趋势统计':
							var fields = paramData.fields;
							var len = fields.length;
							var filterStr = '';
							if(fields && len>0){
								SQL +='select ';
								fields.forEach(function (item, index) {
									var tmp = item;
									if (item.indexOf('_struct_') > -1 || item == '_head_.file') {
										tmp = item+'.keyword';
									}

									if(index >= len - 1){
										SQL +='count('+tmp+') as '+item+' ';
									}else{
										SQL +='count('+tmp+') as '+item+',';
									}

									if(paramData.isFilterNull){
										filterStr = 'and '+tmp+' is not null ';
									}
								})
								
								SQL +="from applog-* where 1=1 "+filterStr+"GROUP BY date_histogram(field='start','interval'='"+paramData.interval+"')";
							}

							return SQL;
						case '时间分区统计':
							var fields = paramData.fields;
							var len = fields.length;
							var timeSegment = '';
							if(fields && len>0){
								SQL +='select ';
								fields.forEach(function (item, index) {
									var tmp = item;
									if (item.indexOf('_struct_') > -1 || item == '_head_.file') {
										tmp = item+'.keyword';
									}
									SQL +=tmp+' as '+item+' ';
								})
								paramData.segments.forEach(function (item) {
									timeSegment += ",'"+item.start+"','"+item.end+"'";
								})
								SQL +="from applog-* where 1=1 GROUP BY date_range(field='start','format'='yyyy-MM-dd HH:mm:ss'"+timeSegment+")";
							}
							
							return SQL;
						case '时间间隔统计':
							var fields = paramData.fields;
							var len = fields.length;
							var filterStr = '';
							if(fields && len>0){
								SQL +='select ';
								fields.forEach(function (item, index) {
									var tmp = item;
									if (item.indexOf('_struct_') > -1 || item == '_head_.file') {
										tmp = item+'.keyword';
									}

									if(index >= len - 1){
										SQL +='count('+tmp+') as '+item+' ';
									}else{
										SQL +='count('+tmp+') as '+item+',';
									}

									if(paramData.isFilterNull){
										filterStr = 'and '+tmp+' is not null ';
									}
								})
								
								SQL +="from applog-* where 1=1 "+filterStr+"GROUP BY date_histogram(field='start','interval'='"+paramData.timeInterval+paramData.interval+"')";
							}

							return SQL;
						case '数值区间统计':
							var fields = paramData.fields;
							var len = fields.length;
							var gb = '';
							var numSegment = '';
							if(fields && len>0){
								SQL +='select ';
								fields.forEach(function (item, index) {
									var tmp = item;
									if (item.indexOf('_struct_') > -1 || item == '_head_.file') {
										tmp = item+'.keyword';
									}

									SQL += paramData.statisticalMethods+'('+ tmp+') as '+paramData.statisticalMethods+' ';
									gb += tmp+' ';
								})
								paramData.segments.forEach(function (item) {
									numSegment += ","+item.start+","+item.end;
								})
								SQL +="from applog-* where 1=1 GROUP BY range("+gb+numSegment+")";
							}

							return SQL;
						case '数值分类统计':
							var fields = paramData.fields;
							var len = fields.length;
							var gb = '';
							if(fields && len>0){
								SQL +='select ';
								fields.forEach(function (item, index) {
									var tmp = item;
									if (item.indexOf('_struct_') > -1 || item == '_head_.file') {
										tmp = item+'.keyword';
									}

									SQL +=tmp+' as '+item+' ';
									gb +=tmp+' ';
								})
								SQL +="from applog-* where 1=1 group by "+gb+"limit "+(paramData.top||10);
							}

							return SQL;
						case '数值百分比统计':
							var fields = paramData.fields;
							var len = fields.length;
							if(fields && len>0){
								SQL +='select percentiles(';
								fields.forEach(function (item, index) {
									var tmp = item;
									if (item.indexOf('_struct_') > -1 || item == '_head_.file') {
										tmp = item+'.keyword';
									}
									
									SQL +=tmp+') ';
								})
								SQL +="from applog-* where 1=1 ";
							}

							return SQL;
						case '地理分布统计':
							SQL = 'select count(_head_.hostip) as _head_.hostip from applog-* where 1=1 GROUP BY _head_.hostip';
							return SQL;
					}
				}

				/**
				 * 获取间隔
				 * @param  {[type]} timeStart [description]
				 * @param  {[type]} timeEnd   [description]
				 * @return {[type]}           [description]
				 */
				function getInterval(timeStart,timeEnd) {
					var timeRange = (new Date(timeEnd) - new Date(timeStart))/1000;
					var interval;

					if(timeRange > 3600*24*366){
						interval = 'year';
					}else if(timeRange >= 3600*24*32){
						interval = 'month';
					}else if(timeRange >= 3600*24){
						interval = 'day';
					}else if(timeRange >= 3600){
						interval = 'hour';
					}else if(timeRange >= 60){
						interval = 'minute';
					}else if(timeRange >= 1){
						interval = 'second';
					}

					return interval;
				}

				// echarts容器大小变化
				$('#echartsHide, #quickSearchHide', $parentEl).on('echartsResize', function(e){
					handler.setTimeout(function(){
						echartsObj && echartsObj.resize();
					},300);
				});
				
				$('.logSearchDetail-logInfo', $parentEl).on('echartsResize', 'ul>li>a', function (e) {
					if($(this).parent().index() == 1){
						handler.setTimeout(function(){ 
							echartsObj && echartsObj.resize();
						},10);
					}
				})

				// 保存到仪表盘
				$('#saveEcharts', $el).on('click', function(event) {
					if(!urlParam){
						app.alert('还未生成图表。');
						return;
					}
					$modal.find('form')[0].reset();
					$modal.modal('show');
					$('#echartsP' ,$el).attr('src',echartsObj.getDataURL());
				});
				// 下载
				$('#download', $el).on('click', function(event) {
					if(!urlParam){
						app.alert('还未生成图表。');
						return;
					}
					$.ajaxDownload('ESSearchAction_esportSQLStatistics.do',{
							aggs:JSON.stringify(echartsReturnData.aggs),
							staticsType:toNumber(paramData.typeValue),
							fieldName:paramData.fields.join(','),
						});
				});
				// 模态框确认事件
				$modal.on('click', '.confirmBtn', function(event) {
					var name = $('#name', $modal).val();
					if(name == ''){
						app.alert('请输入图表名称！');
						return;
					}
					addDashBoard(getDashBoardParamData(name));
				});
				
				function toNumber(value) {
					switch(value) {
						case '事件趋势统计':
							return 0;
						case '时间分区统计':
							return 1;
						case '时间间隔统计':
							return 2;
						case '数值区间统计':
							return 3;
						case '数值分类统计':
							return 4;
						case '数值百分比统计':
							return 5;
						case '地理分布统计':
							return 6;
					}
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
				
				let mapSelect = {
					'当天': '2',
					'本周': '3',
					'本月': '4',
					'今年': '5'
				}
				
				function getDashBoardParamData(name) {
					var intervalTime;
					var timeType = $('input[name=timeType]:checked', $modal).val();
					var interval = $("#interval", $el).val();
					if (!interval.trim()) {
						interval = 1;
					}
					if(timeType == '0'){
						let val = $("#dateSetectInput", $parentEl).val();
						let currentTime = $("#quickRange>li.active",$parentEl).text();
						if (mapSelect[currentTime]) {
							timeType = mapSelect[currentTime];
						} else {
							let startTime = val.split('~')[0];
							let endTime = val.split('~')[1];
							urlParam.startTime = startTime;
							urlParam.endTime = endTime;
							intervalTime = new Date(urlParam.endTime).getTime() - new Date(urlParam.startTime).getTime();
						}
					}

					var tmpUrlParam = $.extend(true, urlParam, {
						statistics: JSON.stringify({
							urlParam:$.extend(true, {}, urlParam,{image:undefined}),
							paramData:paramData,
							interval: interval
						}),
						sqlPhrases: urlParam.sql,
						echartsType:getEchartsTypeNumber(paramData.echartsType),
						intervalTime:intervalTime,
						image: echartsObj.getDataURL({pixelRatio:0.5}),
						name:name,
						timeType:timeType,
						mustValue:urlParam.cate
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
			},

			unload : function(handler) {
				echartsObj && echartsObj.dispose();
				$parentEl && $('#echartsHide, #quickSearchHide', $parentEl).off('echartsResize');
				$parentEl && $('.logSearchDetail-logInfo', $parentEl).off('echartsResize');
			},

			pause : function($el, scope, handler) {
			},

			resume : function($el, scope, handler) {
			}
		};
	});
