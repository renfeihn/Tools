define(["jquery",'echarts'], function() {
	var echartsLine; //echarts图表实例
	var workerId = null;
	return {

		load: function($el, scope, handler) {
			var ACQTIME = scope.ACQTIME;
			var searchInput = scope.searchInput || '';
			var logDetailData;//日志数据
			var activeLogDetailData;
			var lastTotleFirst = {};
			var lenNum;
			var oldPage = 1;
			var logInfo = {};
			var echartsData = {
				line1:[],
				time:[]
			},
			hideData = ['__context__','__struct__','logjoin'],
			$oldhtml_p,
			preSearchVal;
			var activeLogKeyword;
			var logsns = scope.logsns;
			var id = scope.id;
			var nodeSelectHtml = '',
			nodeMapping,
			structFieldNameMap={
				'应用ID':'_head_.appid',
				'开始时间':'start',
				'结束时间':'stop',
				'日志流水':'_head_.logsn',
				'应用名称':'_head_.appname',
				'日志类别':'_head_.type',
				'日志源名称':'_head_.sourcename',
				'三级分类':'_head_.category3',
				'日志文件':'_head_.file',
				'主机IP':'_head_.hostip',
			},
			structField = scope.data,
			loadFilterBtns = true;
			if (searchInput.indexOf('*') !== -1 
					|| searchInput.indexOf('|') !== -1) {
				searchInput = null;
			}
			
			if (!!searchInput) {
				$("#searchString", $el).val(searchInput);
			}
			
			
			// 分页信息 默认值
			var pageInfo = {
				"page": 1,
				"pageSize": 10
			}


			$('#nodeSelect', $el).on('change', async function(event) {
				event.preventDefault();
				var serialno = $(this).val();
				var keywords = $.trim(nodeMapping[serialno].keyword);
				activeLogKeyword = [];
				if(keywords != ''){
					activeLogKeyword = keywords.split(',');
				}else{
					activeLogKeyword = undefined;
				}
				loadFilterBtns = true;
				lastTotleFirst = {};
				pageInfo.lastAcqTime = undefined;
				
				var searchString = $("#searchString", $el).val();
				await loadFormatDetail(serialno, nodeMapping[serialno]._routing, nodeMapping[serialno]._index);
				logInfo['id'] = serialno;
				logInfo['index'] = nodeMapping[serialno]._index;
				searchLog(lastTotleFirst.firstLineNum, lastTotleFirst.total, 1, searchString);
			});

			if(null!= logsns && logsns.length>0){

				nodeMapping = {};
				for (var i = 0; i < logsns.length; i++) {
					nodeSelectHtml +='<option value="'+logsns[i].id+'"> 节点'+(i+1)+'--'+logsns[i].appname+'--'+(logsns[i].keywords||'')+'</option>';
					nodeMapping[logsns[i].id] = logsns[i];
				}
				$('#nodeSelect', $el).html(nodeSelectHtml).val(scope.id).trigger('change').show();
			}else{
				$('#toFlow', $el).show();
				if(structField){
					var _routing = structField._routing;
					var _index = structField._index;
				}
				(async function() {
					// 加载日志结构化信息
					await loadFormatDetail(scope.serialno, _routing,_index);
					// 加载日志
					searchString = $("#searchString", $el).val();
					logInfo['id'] = _routing;
					logInfo['index'] = _index;
					searchLog(undefined, undefined, 1, searchString);
				})()
				
//				loadOriginalDetail(scope.serialno, _routing, _index, id, pageInfo);
				
			}
			
			// 格式化echarts数据
			function formatEchartsData(logDetailData) {
                echartsData = {line1:[], time:[]};
                var timeStart;
                var timeEnd;
				for (var i = 0; i < logDetailData.length - 1; i++) {
					echartsData.time.push(i+1);

					if(logDetailData[i]['LOGTIME']){
						timeEnd = new Date(logDetailData[i]['LOGTIME']).getTime();

						var time = 0;
						if(timeStart && timeEnd){
							time = timeEnd - timeStart;
						}

						echartsData.line1.push(time);
						timeStart = timeEnd;
					}else{
						echartsData.line1.push(0);
					}
				}
			}
			// echarts图
			function drawecharts() {
				if(echartsLine){
					echartsLine.clear();
				}else{
					echartsLine = app.echarts.init($('#logDetailEcharts', $el)[0]);
				}
				var option = {
					color: ['#5b62f9', 'rgba(235, 51, 36, 1.000)', '#fa594d', '#0bbf46', '#3e7ad6'],
					title: {
						show: true,
						text: '单位: ' + 'ms',
						left: 34,
						top: '-2',
						textStyle: {
							fontSize: 12,
							color: '#a3a2a7',
							fontFamily: '微软雅黑',
							fontWeight: 'normal'
						}
					},
					legend: {
						show: true,
						orient: 'horizontal',
						right: 8,
						top: '-2',
						data:[/*{
							name: '严重',
							textStyle: {
								fontSize: 12,
								color: '#fff',
								fontFamily: '微软雅黑'
							},
							icon: 'none'
						},*/{
							name: '耗时',
							textStyle: {
								fontSize: 12,
								color: '#2b2933',
								fontFamily: '微软雅黑'
							},
							icon: 'line'
						}]
					},
					grid: {
						borderWidth: 0,
						x: 40,
                        y: 25,
                        x2: 10,       
                        y2: 20
					},
					tooltip: {
						trigger: 'axis',
						formatter: '第{b0}行<br/> {a}: {c0}'
					},
					xAxis: [
						{
							show: true,
							type: 'category',
							boundaryGap: false,
							axisLabel: {
								show: true,
								margin: 6,
								textStyle: {
									color: '#5c5a66',
								}
							},
							splitLine: {show: false},
							axisLine: {
								show: true,
								lineStyle: {
									color: '#929099',//横坐标轴颜色
									width: 2,
									type: 'solid'
								}
							},
							axisTick: {
								show: true,
								inside: true,
								lineStyle: {
									color: '#929099',//横坐标点颜色
									width: 2,
									type: 'solid'
								}
							},
							data: echartsData.time
						}
					],
					yAxis: [
						{
							type: 'value',
							axisLabel: {
								show: true,
								textStyle:{
									color: '#5c5a66',
									align: 'left',
								},
								margin: 32
							},
							axisLine: {
								show: false
							},
							axisTick: {
								show: false
							},
							splitLine: {
								show: true,
							},
							splitNumber:2
						}
					],
					series: [
						{
						 	name: '耗时',
							type: 'line',
							smooth: true,
							symbol: "circle",
							symbolSize: 10,
							data: echartsData.line1
						},
						/*{
					        name: '严重',
					        type: 'effectScatter',
					        label: {
					            emphasis: {
					                show: false,
					                position: 'left',
					                textStyle: {
					                    color: 'blue',
					                    fontSize: 14
					                }
					            }
					        },
					        rippleEffect:{
					        		scale:5
					        },
					        symbolSize: function (val) {
					                return 10;
					            },
					        data: [[1, 4],[20, 5]]
					    }*/
					]
				}
				echartsLine.setOption(option);
				echartsLine.on("click", function(params) {
					var i = params.name;
					$("#logDetailP" + i, $el).siblings().removeClass('targetSides target');
					if($("#logDetailP" + i, $el).prev().length > 0){
						$("#logDetailP" + i, $el).prev()[0].scrollIntoView({block: "start",behavior: "smooth"});
						$("#logDetailP" + i, $el).prev().addClass('targetSides');
					}else{
						$("#logDetailP" + i, $el)[0].scrollIntoView({block: "start",behavior: "smooth"});
					}
					$("#logDetailP" + i, $el).addClass('target');
					$("#logDetailP" + i, $el).next().addClass('targetSides');
				});
			}

			function HTMLEncode(html){
				var temp = document.createElement("div");
				(temp.textContent != null)?(temp.textContent = html):(temp.innerText = html);
				var output = temp.innerHTML;
				temp = null;
				return output;
			}

			// 日志详情
			function setLogDetailData(logDetailData, tag) {
				// 先清空
				$("#logdetailContent", $el).html("");
				var contentData = logDetailData;
				var worker = new Worker("./module/logSearch/logDetail/worker.js");
				worker.postMessage({contentData:contentData,lenNum:lenNum});
				workerId = function(ev){
					if(ev.data.end){
						worker.terminate();
						return;
					}
					var tmpHtml = ev.data.html;
					if(activeLogKeyword && activeLogKeyword.length > 0){
						activeLogKeyword.forEach(function (item) {
							var regEx = new RegExp(item, 'gi');
							tmpHtml = tmpHtml/*.replace(regEx, '<span class="logdetail-keyword">'+item+'</span>');*/
						})
					}
					$("#logdetailContent", $el).html(tmpHtml);
					preSearchVal = undefined;
					$oldhtml_p = undefined;
					// 返回顶部
					$("#logDetailP1", $el)[0].scrollIntoView({block: "start",behavior: "smooth"});
					
					if(loadFilterBtns){
						var logTypes = ev.data.logTypes,
						fitlerBtnHtml ='';
						if(logTypes && !$.isEmptyObject(logTypes)){
							for (var tmp in logTypes) {
								fitlerBtnHtml += '<button title="'+tmp+'类型日志" class="logdetail-fitlerBtn" data="'+tmp+'">'+tmp+'</button>';
							}
						}
						$('#fitlerBtn', $el).html(fitlerBtnHtml);
						loadFilterBtns = false;
					}
					
					if (tag) {
						total = highlightString(1);
						
						$("#total", $el).text(total);
						if(total > 0) {
							now = 1;
							$("#now", $el).text(now);
						} else {
							$("#now", $el).text("0");
						}
						$("span[data-index='" + now + "']", $el)[0] && $("span[data-index='" + now + "']", $el)[0].scrollIntoView({block: "start",behavior: "smooth"});
					}
					
				}
				worker.addEventListener("message",workerId,true);

			}
			

			function getNumLength(n) {
				return n.toString().length;
			}

			//添加高亮样式
			function highlightString(n) {
				// 先清空
//				if(typeof(oldhtml) == 'undefined'){
//					oldhtml = $("#logdetailContent", $el).html();
//				}
//				var newhtml = oldhtml.replace(new RegExp(searchString,'g'), '<span class="keywords">'+ searchString +'</span>');
//				$("#logdetailContent", $el).html(newhtml);
//				var total = $("#logdetailContent", $el).find('.keywords').length;
//				$("#logdetailContent", $el).find('.keywords').each(function(index, element){
//					$(element).attr('data-index', index+1);
//					if(index == 0){
//						$(element).addClass('selected');
//					}
//				});
//				return total;
				if(typeof($oldhtml_p) == 'undefined'){
					$oldhtml_p = $("#logdetailContent>p", $el);
				}
				$oldhtml_p.each(function(){
					var this_html = $(this).html();
					if(preSearchVal && preSearchVal != ''){
						this_html = this_html.replace(/<span class="keywords[^>]*?>[^(\/<>)]*?(<\/span>)/g, preSearchVal);
					}
					var newhtml = this_html;
					var searchString = $("#searchString", $el).val();
					if (searchString !== '') {
						newhtml = searchByGI(this_html, searchString);
					}
					$(this).html(newhtml);
//					if(this_html.includes(searchString)){
//						var newhtml = searchByGI(this_html, searchString);
////						var newhtml = this_html.replace(new RegExp(searchString,'gi'), '<span class="keywords">'+ searchString +'</span>');
//						$(this).html(newhtml);
//					}else{
//						$(this).html(this_html);
//					}
				})
				preSearchVal = searchString;
				var total = $("#logdetailContent", $el).find('.keywords').length;
				$("#logdetailContent", $el).find('.keywords').each(function(index, element){
					$(element).attr('data-index', index+1);
					if(index == 0){
						$(element).addClass('selected');
					}
				});
				return total;
			};
			
			function searchByGI(oldHtml, inpVal) {
				inpVal = inpVal.replace(/"|'|“|”|’|‘/g,'');
				let allVal = oldHtml.match(new RegExp(inpVal, 'ig'));
				let texts = oldHtml;
				let uuid = app.global.getUniqueId();
				texts = texts.replace(new RegExp(inpVal, 'ig'), uuid);
	            if (allVal) {
	                for (let j = 0; j < allVal.length; j ++) {
	                    texts = texts.replace(uuid, '[*' + j + '*]');
	                    // console.log(allVal[j],'[*' + j + '*]',texts)
	                }
	                for (let i = 0; i < allVal.length; i ++ ) {
	                    texts = texts.replace('[*' + i + '*]', '<span class="keywords">' + allVal[i] + '</span>');
	                }
	            }
	            return texts;
			}
			

			/*
			 * 搜索日志的一系列操作
			 */
			$("#searchString", $el).on("keyup", function(e) {
				if(e.keyCode === 13) {
					$("#searchBtn", $el).click();
				}
			});

			$("#searchBtn", $el).on("click", function() {
				pageInfo.isFirst = false;
				pageInfo.isLast = false;
				pageInfo.page = 1;
				pageInfo.aimPage = 1;
				pageInfo.lastAcqTime = undefined;
				
				searchString = $("#searchString", $el).val();
				searchLog(undefined, undefined, 1, searchString);
				
//				if($("#searchString", $el).val().length > 0) {
//					//更新要搜索的字符串
//					searchString = $("#searchString", $el).val();
//					searchLog(undefined, undefined, 1, searchString);
//				} else {
//					loadOriginalDetail(scope.serialno, _routing, _index, id, pageInfo);
//				}
			});
			
			
			
			function searchLog(firstLineNum, total, page, search){
				app.shelter.show('努力加载中...');
				var lastAcqTime = pageInfo.lastAcqTime;
				if (lastAcqTime) {
					if (parseInt(pageInfo.aimPage || pageInfo.page) - parseInt(oldPage) === -1) {
						lastAcqTime = pageInfo.firstAcqTime;
					}
				} else {
					oldPage = 0;
					aimPage = 1;
				}
				var aimPage = pageInfo.aimPage || pageInfo.page;
				if (pageInfo.isFirst || pageInfo.changePageSize) {
					if (pageInfo.isFirst) {
						lastAcqTime = 1;
					} else {
						lastAcqTime = undefined;
					}
					total = undefined;
					oldPage = 0;
					aimPage = 1;
				} else if (pageInfo.isLast){
					oldPage = -1;
					aimPage = -1;
				}
				app.common.ajaxWithAfa({
					url : 'ESSearchAction_getOriginalDetailWithHeightLight.do',
					data: {
						'id': logInfo.id || scope.id,
						'pageSize': pageInfo.pageSize,
						'curPage': oldPage,
						'aimPage': aimPage,
						'lastAcqTime': ACQTIME || lastAcqTime,
						'index': logInfo.index,
						'fileName': logInfo['_head_.file'],
						'host': logInfo['_head_.hostip'],
						'total': total,
						'search': search,
					}
				}).done(function (data){
					ACQTIME = null;
					if (data.result) {
						app.shelter.hide();
						logDetailData = data.result.listData;
						if(logDetailData.length == 0){
							return;
						}
						activeLogDetailData = logDetailData.map(function(item,index){
							item.LOG = HTMLEncode(item.LOG);
							return item;
						});
						oldPage = data.result.page;
						
						pageInfo.totalPage = data.result.totalPage;
						pageInfo.lastAcqTime = logDetailData[logDetailData.length - 1].ACQTIME;
						pageInfo.firstAcqTime = logDetailData[0].ACQTIME;
						var total = data.result.total;
						lastTotleFirst['total'] = total;
						lastTotleFirst['firstLineNum'] = data.result.firstLineNum;
						// 总页数
						$('#totalPage', $el).text(pageInfo.totalPage || (total % pageInfo.pageSize==0?total / pageInfo.pageSize:parseInt(total / pageInfo.pageSize)+1));
						// 页码
						pageInfo.page = oldPage;
						$('#curPage', $el).val(oldPage);
						// 总条数
						$("#logAmounts", $el).text(total);
						// 每页的条数
						$("#pageSize", $el).val(pageInfo.pageSize);
						// 序号顺序
						$('.logdetail-content', $el).css("counter-reset", "mycounter " + ((pageInfo.page - 1)*pageInfo.pageSize) );

						if(logDetailData && logDetailData.length !== 0) {
							// 计算悬挂的数字突出的长度
							lenNum = getNumLength(pageInfo.page*pageInfo.pageSize);
							lenNum = Math.floor(lenNum / 2) + 1.5;

							 // 填写日志详情数据
							setLogDetailData(activeLogDetailData, true);
							formatEchartsData(activeLogDetailData);
							drawecharts();
						}
						
						if (data.result.firstLineNum == -1) {
							app.alert('关键字未搜索，请重新输入搜索！');
						}
					}
				})
			}

			function clearHighlight() {
				now = 0;
				$("#now", $el).text(now);
				$("#total", $el).text("0");

				// 调用这个方法渲染初始数据，就是没有加高亮样式的
				setLogDetailData(activeLogDetailData);
			}

			$("#lastSearchWord", $el).on("click", function() {
				if(now > 1) {
					now -= 1;
					$("#now", $el).text(now);
//					highlightString(now);
					$("span[data-index]", $el).removeClass('selected');
					$("span[data-index='" + now + "']", $el).addClass('selected');
					$("span[data-index='" + now + "']", $el)[0].scrollIntoView({block: "start",behavior: "smooth"});
				}
			});

			$("#nextSearchWord", $el).on("click", function() {
				if(now !== 0 && now < total) {
					now += 1;
					$("#now", $el).text(now);
//					highlightString(now);
					$("span[data-index]", $el).removeClass('selected');
					$("span[data-index='" + now + "']", $el).addClass('selected');
					$("span[data-index='" + now + "']", $el)[0].scrollIntoView({block: "start",behavior: "smooth"});
				}
			});

			$("#skip", $el).on("keyup", function(e) {
				if(e.keyCode >= 48 && e.keyCode <= 57 || (e.keyCode>=96 && e.keyCode<=105)  || e.keyCode === 8 || e.keyCode === 46) {
					var n = $(this).val() * 1;
					var $logDetailP = $("#logDetailP" + n, $el);
					if($logDetailP.length > 0) {
						$logDetailP[0].scrollIntoView({block: "start",behavior: "smooth"});
					} else {
						$("#logDetailP1", $el)[0].scrollIntoView({block: "start",behavior: "smooth"});
					}
				}
			});

			$("#fontBtn", $el).on('click', '.font-small', function(event) {
				event.preventDefault();
				if($(this).hasClass('disabled')){
					return;
				}

				var currentSize = parseInt($("#logdetailContent", $el).css('font-size'));
				if(currentSize <= 14){
					$(this).addClass('disabled');
				}

				$("#fontBtn .font-bigger", $el).removeClass('disabled');

				$("#logdetailContent", $el).css({
					'font-size': (currentSize-2)+'px',
				});
			}).on('click', '.font-bigger', function(event) {
				event.preventDefault();
				if($(this).hasClass('disabled')){
					return;
				}

				var currentSize = parseInt($("#logdetailContent", $el).css('font-size'));
				if(currentSize >= 100){
					$(this).addClass('disabled');
				}

				$("#fontBtn .font-small", $el).removeClass('disabled');

				$("#logdetailContent", $el).css({
					'font-size': (currentSize+2)+'px',
				});

			}).on('click', '#colorConfig', function(event) {
				event.preventDefault();
				$(this).toggleClass('font-green');
				$("#logdetailContent", $el).toggleClass('black green');

				if($(this).hasClass('font-green')){
					$(this).text('黑底绿字');
				}else{
					$(this).text('白底黑字');
				}
			});

			$('#fitlerBtn', $el).on('click', '.logdetail-fitlerBtn', function(event) {
				$(this).toggleClass('active');
				var fitler = [];
				$('.logdetail-fitlerBtn.active', $el).each(function () {
					fitler.push($(this).attr('data'));
				})
				activeLogDetailData = [];
				if(fitler.length > 0){
					logDetailData.forEach(function (item) {
						if(fitler.indexOf(item['LEVEL']) > -1){
							activeLogDetailData.push(item);
						}
					})
				}else{
					activeLogDetailData = logDetailData;
				}
				
				echartsData = {
								line1:[],
								time:[]
							};
				setLogDetailData(activeLogDetailData);
				formatEchartsData(activeLogDetailData);
				drawecharts();
			});

			// 加载日志
			function loadOriginalDetail(serialno,routing,index,id,pageInfo){
				app.shelter.show('努力加载中...');
				console.log('loadOriginalDetail')
				app.common.ajaxWithAfa({
					url : 'ESSearchAction_getOriginalDetailWithHeightLight.do',
					data: {
						'id':scope.id,
						'pageSize': pageInfo.pageSize,
						'curPage': oldPage,
						'aimPage': pageInfo.aimPage || pageInfo.page,
						'lastAcqTime': lastAcqTime,
						'index': scope.index,
						'fileName': scope.fileName,
						'host': scope.host,
						'total': total,
						'search': ''
					}
				}).done(function (data){
					app.shelter.hide();
					logDetailData = data.result.listData;
					activeLogDetailData = logDetailData.map(function(item,index){
						item.LOG = HTMLEncode(item.LOG);
						return item;
					});;
					var total = data.result.total;
					// 总页数
					$('#totalPage', $el).text(total % pageInfo.pageSize==0?total / pageInfo.pageSize:parseInt(total / pageInfo.pageSize)+1);
					// 页码
					$('#curPage', $el).val(pageInfo.page);
					// 总条数
					$("#logAmounts", $el).text(total);
					// 每页的条数
					$("#pageSize", $el).val(pageInfo.pageSize);
					// 序号顺序
					$('.logdetail-content', $el).css("counter-reset", "mycounter " + ((pageInfo.page - 1)*pageInfo.pageSize) );

					if(logDetailData && logDetailData.length !== 0) {
						// 计算悬挂的数字突出的长度
						lenNum = getNumLength(pageInfo.page*pageInfo.pageSize);
						lenNum = Math.floor(lenNum / 2) + 1.5;

						 // 填写日志详情数据
						setLogDetailData(activeLogDetailData);
						formatEchartsData(activeLogDetailData);
						drawecharts();
					}
				});
			}
			// 加载日志结构化信息
			async function loadFormatDetail(serialno,routing,index){
				logInfo = {};
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url : 'ESSearchAction_getFormatDetail.do',
						data:{
	//							'serialNo':serialno,
								routing: serialno,
								index: index
							}
					}).done(function (data){
	
						if(data.result.public && data.result.public.length > 0){
	
							var info = data.result.public;
							var resultData = {};
							var resultStr = '';
							var isinitStructField = !structField;
							structField = structField || {};
							for (i in info) {
								if (info.hasOwnProperty(i) && hideData.indexOf(info[i].fieldName) < 0) {
									resultData[info[i].fieldName] = info[i].fieldValue;
									resultStr += "<li><span>" + info[i].fieldName + "</span><span>" + info[i].fieldValue + "</span></li>";
									var name = structFieldNameMap[info[i].fieldName];
									if(isinitStructField && name){
										structField[name] = info[i].fieldValue;
									}
									logInfo[name] = info[i].fieldValue;
								}
							}
							
							/*$("#logDetailTitleInfo_time",$el).text(resultData['_head_.logtime'] || resultData['开始时间']);
							$("#logDetailTitleInfo_sys",$el).text(resultData['_head_.appname'] || resultData['应用名称']);
							$("#logDetailTitleInfo_no",$el).text(serialno);
							var timeUsed = resultData['duration'] || resultData['交易耗时'];
							$("#logDetailTitleInfo_usetime",$el).text(timeUsed+'ms');*/
	
							$("#logdetailKAV", $el).html(resultStr);
							resolve(data);
						}

					});
				});
				
			}

			$('#logSearch', $el).on('click', function(event) {
				event.preventDefault();
				var text;
				if(document.selection) {
				        text = document.selection.createRange();
				    } else {
				        text = document.getSelection();
				}
				if(text.toString() == ''){
					return;
				}
				
				app.dispatcher.load({
					title: "日志搜索",
					moduleId:"logResultCheck",
					section:"",
					id:'logResultCheck'+app.global.getUniqueId(),
					params:{searchInput:text.toString()}
				});
			});

			$('#toFlow', $el).on('click', function(event) {
				event.preventDefault();
				var no = scope.serialno;
				app.dispatcher.load({
					"title": "日志链路 - "+no.substring(0, 4)+'...'+no.substr(-4, 4),
					"moduleId": 'logFlow',
					"section": '',
					"id": 'flow-'+no,
					"params": {
						'logFlowInfo':structField
					}
				});
			});

			$('#curPage', $el).on('blur', function(){
				if(this.value != pageInfo.page){
					var totalPage = parseInt($('#totalPage', $el).text());
					var thisvalue = this.value;
					if(thisvalue < 1){
						thisvalue = 1;
					}else if(thisvalue > totalPage){
						thisvalue = totalPage;
					}
					$(this).val(thisvalue);
					pageInfo.page = thisvalue;
					pageInfo.aimPage = thisvalue;
					var searchString = $("#searchString", $el).val();
					searchLog(lastTotleFirst.firstLineNum, lastTotleFirst.total, 1, searchString);
//					if (searchString.trim() !== '') {
//						searchLog(lastTotleFirst.firstLineNum, lastTotleFirst.total, 1, searchString);
//					} else {
//						loadOriginalDetail(scope.serialno, structField._routing, structField._index, id, pageInfo);
//					}
				}
			}).on('keyup', function(e){
				if(e.keyCode == 13 && this.value != pageInfo.page){
					e.stopPropagation();
					var totalPage = parseInt($('#totalPage', $el).text());
					var thisvalue = this.value;
					$(this).blur();
					if(thisvalue < 1){
						thisvalue = 1;
					}else if(thisvalue > totalPage){
						thisvalue = totalPage;
					}
					$(this).val(thisvalue);
					pageInfo.page = thisvalue;
					pageInfo.aimPage = thisvalue;
					var searchString = $("#searchString", $el).val();
					searchLog(lastTotleFirst.firstLineNum, lastTotleFirst.total, 1, searchString);
//					if (searchString.trim() !== '') {
//						searchLog(lastTotleFirst.firstLineNum, lastTotleFirst.total, 1, searchString);
//					} else {
//						loadOriginalDetail(scope.serialno, structField._routing, structField._index, id, pageInfo);
//					}
				}
			})

			$("#pageSize", $el).on('change', function(){
				pageInfo.pageSize = this.value;
				pageInfo.page = 1;
				pageInfo.changePageSize = true;
				pageInfo.lastAcqTime = undefined;
				var searchString = $("#searchString", $el).val();
				searchLog(undefined, undefined, 1, searchString);
				pageInfo.changePageSize = false;
//				if (searchString.trim() !== '') {
//					searchLog(undefined, undefined, 1, searchString);
//				} else {
//					loadOriginalDetail(scope.serialno, structField._routing, structField._index, id, pageInfo);
//				}
			})

			$('[data-role="日志分页"]', $el).on('click', 'button', function(){
				var curPage = pageInfo.page;
				var searchString = $("#searchString", $el).val();
				pageInfo.isFirst = false;
				pageInfo.isLast = false;
				if(this.id == 'prevButton'){
					if(curPage > 1){
						pageInfo.page--;
						pageInfo.aimPage = pageInfo.page;
						// 加载日志
						searchLog(lastTotleFirst.firstLineNum, lastTotleFirst.total, 1, searchString);
//						if (searchString.trim() !== '' && lastTotleFirst.total) {
//							searchLog(lastTotleFirst.firstLineNum, lastTotleFirst.total, 1, searchString);
//						} else {
//							loadOriginalDetail(scope.serialno, structField._routing, structField._index, id, pageInfo);
//						}
					}
				}else if(this.id == 'nextButton'){
					var totalPage = parseInt($('#totalPage', $el).text());
					if(curPage < totalPage){
						pageInfo.page++;
						pageInfo.aimPage = pageInfo.page;
						// 加载日志
						searchLog(lastTotleFirst.firstLineNum, lastTotleFirst.total, 1, searchString);
//						if (searchString.trim() !== '' && lastTotleFirst.total) {
//							searchLog(lastTotleFirst.firstLineNum, lastTotleFirst.total, 1, searchString);
//						} else {
//							loadOriginalDetail(scope.serialno, structField._routing, structField._index, id, pageInfo);
//						}
					}
				}else if(this.id == 'firstButton'){
					var totalPage = parseInt($('#totalPage', $el).text());
					if(curPage !== 1){
						pageInfo.page = 1;
						pageInfo.aimPage = 1;
						pageInfo.isFirst = true;
						// 加载日志
						searchLog(lastTotleFirst.firstLineNum, lastTotleFirst.total, 1, searchString);
					}
				}else if(this.id == 'lastButton'){
					var totalPage = parseInt($('#totalPage', $el).text());
					if(curPage !== totalPage){
						pageInfo.page = totalPage;
						pageInfo.aimPage = pageInfo.page;
						pageInfo.isLast = true;
						// 加载日志
						searchLog(-1, lastTotleFirst.total, 1, searchString);
					}
				}
			})
		},

		unload: function(handler) {
			echartsLine && echartsLine.dispose();
		},

		pause: function($el, scope, handler) {
		},

		resume: function($el, scope, handler) {
		}
	};
});
