define(["jquery"], function() {
	
	return {
		
		load : function($el, scope, handler) {
			//日志信息
			var logFlowInfo = scope.logFlowInfo
			console.log(scope)
			appId = logFlowInfo['_head_.appid'],
			start = logFlowInfo['start'] && new Date(logFlowInfo['start']).Format('yyyy-MM-dd hh:mm:ss'),
			stop = logFlowInfo['stop'];
			logsn = logFlowInfo['_head_.logsn'];
			appName = logFlowInfo['_head_.appname'];
			type = logFlowInfo['_head_.type'];
			sourceName = logFlowInfo['_head_.sourcename'];
			category3 = logFlowInfo['_head_.category3'];
			file = logFlowInfo['_head_.file'];
			hostip = logFlowInfo['_head_.hostip'];
//			console.log(appId,start,logsn)
			//let totalTime = 0;//一条流程总时间
			let timeArray = [];//节点耗时
			let dateArray = [];//节点时间
			let dateArrayStart = [];//节点开始时间
			let ajaxUrl = scope.type == 'zn' ? 'LogRelationAction_getLogLinks.do' : 'LogChainAction_getLogChain.do';
			
			//页面渲染
			//日志基本信息
			//时间格式调整
			function splitString(val){
				return val && new Date(val).Format("yyyy-MM-dd hh:mm:ss:S");
			}

			$('#logName',$el).val(file);
			$('#logSys',$el).val(appName);
			$('#logStart',$el).val(splitString(start));
			$('#logCenter',$el).val(hostip);
			$('#logType',$el).val(category3);
			$('#logEnd',$el).val(splitString(stop));
			$('#logSource',$el).val(sourceName);


			//日志链路信息
			var logFlowPointInfo = {}
			//点击的日志链路的下标
			var linkIndex =null;
			getData(appId,start,logsn);
			//初始化页面请求数据
			function getData(appId,start,logsn){
				app.shelter.show();
				$.ajax({
					type:'post',
					datatype:'json',
					//async:false,
					url: ajaxUrl,
					data:{
						params:JSON.stringify({
							appId:appId,
							start:start,
							logsn:logsn,
						})
					},
					success:function(data){
						app.shelter.hide();
//						console.log(data)
						logFlowPointInfo = data.content.result;
						//日志链路
						let templateRow = '';
						let templateHidden = '';
						for(let i=0; i<logFlowPointInfo.length; i++){
							let logFlowPointInfoRow = logFlowPointInfo[i];
							 templateRow = '\
								 <div class="logFlow-flowInfosOne" data-index='+i+'>\
								 	<div class="logFlow-flowInfosShow">\
								 		<p class="logFlow-flowInfos-title">链路'+(i+1)+'</p>\
								 		<div class="logFlow-flowInfos-rote">\
								 			<div class="logFlow-flowInfos-pathAll"></div>\
											 <div class="logFlow-flowInfos-time">\
									 			<h5 class="logFlow-flowInfos-timeInfo"><span class="logFlow-flowInfos-timeShow"></span>ms</h5>\
									 			<p class="logFlow-flowInfos-timeLabel">总耗时</p>\
								 			</div>\
								 		</div>\
								 	</div>\
								 </div>'
							 $('.logFlow-flowInfos',$el).append(templateRow);
							 
							 let $flowInfosOneWrap = $('.logFlow-flowInfosOne[data-index='+i+']',$el); 
							 
							 templateHidden ='\
								<div class="logFlow-flowInfoshidden">\
									<p class="logFlow-flowInfoshidden-title">链路'+(i+1)+'时序图</p>\
									<table class="logFlow-flowInfoshidden-table">\
										<tr class="logFlow-flowInfoshidden-tr1">\
											<td class="logFlow-flowInfoshidden-td">主机IP</td>\
								 			<td class="logFlow-flowInfoshidden-td">应用系统</td>\
											<td class="logFlow-flowInfoshidden-td">日志源名称</td>\
											<td class="logFlow-flowInfoshidden-td">关联字段</td>\
								 			<td class="logFlow-flowInfoshidden-tdTime"></td>\
										</tr>\
									</table>\
								</div>'
								$flowInfosOneWrap.append(templateHidden);
							 
								
							
							//链路内节点
							let templatePoint = '';
							let startPoint = [];
							let totalTime = 0;
							for(var j=0; j<logFlowPointInfoRow.length; j++){
								
								
								let centerIP= logFlowPointInfoRow[j]._source['_head_.hostip']
								let centerSys = logFlowPointInfoRow[j]._source['_head_.appname']
								let sourceName = logFlowPointInfoRow[j]._source['_head_.sourcename']
								let dataTime = logFlowPointInfoRow[j]._source.duration;
								totalTime += dataTime;
								let start = logFlowPointInfoRow[j]._source.start;
								let stop = logFlowPointInfoRow[j]._source.stop;
								let start1 = splitString(start);
								let stop1 = splitString(stop);
								let keywords = logFlowPointInfoRow[j].keywords?logFlowPointInfoRow[j].keywords.join(';'):'';
								
								
								if(logFlowPointInfoRow[j]._source['_head_.logsn'] == logsn){
									startPoint.push(j)
								}
								
								
								
								
								
								//详情信息列表
								let tableTr = '\
									<tr class="logFlow-flowInfoshidden-tr">\
								 		<td class="logFlow-flowInfoshidden-td" id="centerIP">'+centerIP+'</td>\
										<td class="logFlow-flowInfoshidden-td" id="centerSys">'+centerSys+'</td>\
										<td class="logFlow-flowInfoshidden-td" id="sourceName">'+sourceName+'</td>\
										<td class="logFlow-flowInfoshidden-td" id="keywords">'+keywords+'</td>\
										<td class="logFlow-flowInfoshidden-tdTime">\
											<div class="showTime"><p class="timeWidth">\
												<span class="timeWidthDetail">\
													<i class="timeWidthDetail-i">开始时间:'+start1+'</i>\
													<i class="timeWidthDetail-i">结束时间:'+stop1+'</i>\
													<i class="timeWidthDetail-i">耗时:'+dataTime+'ms</i>\
												</span>\
											</p></div>\
										</td>\
									</tr>'
								$('.logFlow-flowInfoshidden-table tbody',$flowInfosOneWrap).append(tableTr);
								
								if(logFlowPointInfoRow.length > 5){
									//日志链路
									if(j==0){
										templatePoint = '\
											<div class="logFlow-flowInfos-path">\
												<div class="logFlow-flowInfos-Icon">\
													<span class="logFlow-flowInfos-IconPoint"></span>\
													<p class="logFlow-flowInfos-pointInfo">'+centerSys+'</p>\
												</div>\
											</div>'
										$('.logFlow-flowInfos-pathAll',$flowInfosOneWrap).append(templatePoint);
									}else{
										templatePoint = '\
											<div class="logFlow-flowInfos-path">\
												<div class="logFlow-flowInfos-line"></div>\
												<div class="logFlow-flowInfos-Icon">\
													<span class="logFlow-flowInfos-IconPoint"></span>\
													<p class="logFlow-flowInfos-pointInfo">'+centerSys+'</p>\
												</div>\
											</div>'
										$('.logFlow-flowInfos-pathAll',$flowInfosOneWrap).append(templatePoint);
									}
								}else{
									//日志链路
									if(j ==0){
										templatePoint = '\
											<div class="logFlow-flowInfos-path">\
												<div class="logFlow-flowInfos-Icon">\
													<span class="logFlow-flowInfos-IconPoint"></span>\
													<p class="logFlow-flowInfos-pointInfo1" title="'+centerSys+'">'+centerSys+'</p>\
												</div>\
											</div>'
										$('.logFlow-flowInfos-pathAll',$flowInfosOneWrap).append(templatePoint);
									}else{
										templatePoint = '\
											<div class="logFlow-flowInfos-path">\
												<div class="logFlow-flowInfos-line"></div>\
												<div class="logFlow-flowInfos-Icon">\
													<span class="logFlow-flowInfos-IconPoint"></span>\
													<p class="logFlow-flowInfos-pointInfo1" title="'+centerSys+'">'+centerSys+'</p>\
												</div>\
											</div>'
										$('.logFlow-flowInfos-pathAll',$flowInfosOneWrap).append(templatePoint);
									}
								}
								
								
								
								
								
								
								
								
								//计算时间比例
								//(dataTime > totalTime) && (totalTime = dataTime);
								timeArray.push(dataTime);
								dateArray.push(start,stop)
								dateArrayStart.push(start)
							}
							for(let s=0; s<startPoint.length; s++){
								$('.logFlow-flowInfos-pathAll .logFlow-flowInfos-path',$flowInfosOneWrap).eq(startPoint[s]).find('.logFlow-flowInfos-Icon')
								.addClass('logFlow-flowInfos-Icon-big')
							}
//							//总耗时
							$('.logFlow-flowInfos-timeShow',$flowInfosOneWrap).html(totalTime);
//							let widthArray = [];
//							//总宽度
							let totalWidth = $('.logFlow-flowInfos',$flowInfosOneWrap).width() - 650;
							let showTime = $('.timeWidth',$flowInfosOneWrap)
//							//计算每条进度占比
//							for(var t=0; t<timeArray.length; t++){
//								let realWidth = null;
//								if(timeArray[t] == 0){
//									realWidth = 0;
//									widthArray.push(realWidth)
//								}else if(timeArray[t] != 0){
//									let rate = timeArray[t]/totalTime;
//									realWidth = totalWidth*rate;
//									widthArray.push(realWidth)
//								}
//							}
//							
//							for(var k=0; k<showTime.length; k++){
//								for(var s=0; s<widthArray.length; s++){
//									if(k==s){
//										let widthArrayMath = parseInt(widthArray[s])
//										showTime[k].style.width = widthArrayMath+'px';
//									}
//								}
//							}
							//时间轴
							
							//时间排序
							/*let dateArrayNum = []
							let dateArrayStartNum = []*/
						    /*//转时间戳
							for(var d=0; d<dateArray.length; d++){ 
								dateArrayNum.push(Date.parse(dateArray[d]))
							}
							for(var d=0; d<dateArrayStart.length; d++){ 
								dateArrayStartNum.push(Date.parse(dateArrayStart[d]))
							}*/
							//时间排序
							/*for(var e=0; e<dateArrayNum.length; e++){
								for(var c=0; c<dateArrayNum.length-e; c++){
									if(dateArrayNum[c]>dateArrayNum[c+1]){
										let middle = dateArrayNum[c];
										dateArrayNum[c] = dateArrayNum[c+1];
										dateArrayNum[c+1] = middle;
									}
								}
							}
							for(var e=0; e<dateArrayStartNum.length; e++){ 
								for(var c=0; c<dateArrayStartNum.length-e; c++){
									if(dateArrayStartNum[c]>dateArrayStartNum[c+1]){
										let middle = dateArrayStartNum[c];
										dateArrayStartNum[c] = dateArrayStartNum[c+1];
										dateArrayStartNum[c+1] = middle;
									}
								}
							}*/
						/*	let dateArrayNew = [];
							let dateArrayStartNew = [];
							function timestampToTime(timestamp) {
						        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
						        Y = date.getFullYear() + '-';
						        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
						        D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate() )+ ' ';
						        h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours() )+ ':';
						        m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes() )+ ':';
						        s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds() );
						        return Y+M+D+h+m+s;
						    }
							for(var f=0; f<dateArrayNum.length; f++){ 
								dateArrayNew.push(timestampToTime(dateArrayNum[f]))
							}
							for(var f=0; f<dateArrayStartNum.length; f++){ 
								dateArrayStartNew.push(timestampToTime(dateArrayStartNum[f]))
							}*/
                            let dateArrayNew = [];
                            let dateArrayStartNew = [];
                            dateArrayNew = dateArray.sort(function(a, b) {
                            	return Date.parse(a) - Date.parse(b);
							});
                            dateArrayStartNew = dateArrayStart.sort(function (a, b) {
								return Date.parse(a) - Date.parse(b);
                            });
							
//							//时间节点在时间轴上的位置
							let leftArray = [];
							let leftStartArray = [];
							let totalTimeCol = Date.parse(dateArrayNew[dateArrayNew.length - 1]) - Date.parse(dateArrayNew[0]);
						/*	for(var a=0; a<dateArrayNum.length; a++){
								let firstTime = dateArrayNum[0];
								let lastTime = dateArrayNum[dateArrayNum.length-1];
								totalTimeCol = lastTime-firstTime;
							}*/
                            let firstTime = Date.parse(dateArrayNew[0]);
							for(var a=0; a<dateArrayNew.length; a++){
								for(var b=0; b<logFlowPointInfoRow.length; b++){ 
									let sourceDate = logFlowPointInfoRow[b]._source.start;
									if(sourceDate == dateArrayNew[a]){
										//let firstTime = dateArrayNew[0];
										//let lastTime = dateArrayStartNum[dateArrayStartNum.length-1];
										let d1 = Date.parse(dateArrayNew[a]);
										let dateVal = d1-firstTime;
										if(dateVal != 0){
											let dateRote = dateVal/totalTimeCol;
											let leftAdd = totalWidth*dateRote;
											if(leftAdd>950){
												leftAdd = 950
											}
											showTime[b].style.marginLeft = leftAdd +'px';
										}else if(dateVal == 0){
											showTime[b].style.marginLeft = 0;
										}
									}
									
								}
							}
							//时间节点占比宽度
							for(var b=0; b<logFlowPointInfoRow.length; b++){ 
								let useTime = Date.parse(logFlowPointInfoRow[b]._source.stop) - Date.parse(logFlowPointInfoRow[b]._source.start)
								let timeRute = useTime/totalTimeCol;
								let nowWidth = timeRute*totalWidth;
								showTime[b].style.width = nowWidth +'px';
							}
							// 鼠标移入节点显示节点详细时间信息
							var templateTime1 = '\
								<span class="timePoint1">|->'+new Date(dateArrayNew[0]).Format("yyyy-MM-dd hh:mm:ss:S")+'</span>'
							var templateTime2 = '\
								<span class="timePoint2">'+new Date(dateArrayNew[dateArrayNew.length-1]).Format("yyyy-MM-dd hh:mm:ss:S")+'->|</span>'
							
							$('.logFlow-flowInfoshidden-tr1 .logFlow-flowInfoshidden-tdTime',$flowInfosOneWrap).append(templateTime1);
							$('.logFlow-flowInfoshidden-tr1 .logFlow-flowInfoshidden-tdTime',$flowInfosOneWrap).append(templateTime2);
							
							
							
							
							
							
						}
						//鼠标进入链路详情节点标记
						/*$('.logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr',$el).on('mouseenter',function(){
							$('.logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr',$el).css({'background':'#fff','color':'#000'})
							.eq($(this).index()-1).css({'background':'rgba(239,239,244,255)','color':'rgba(92,110,217,255)'})
							$('.logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr',$el).find('.timeWidth').css({'background':'rgba(205,205,239,255)'})
							.end().eq($(this).index()-1).find('.timeWidth').css({'background':'rgba(92,110,217,255)'})
							$('.logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr',$el).find('.timeWidthDetail').css('display','none')
							.end().eq($(this).index()-1).find('.timeWidthDetail').css('display','block')
						})
						$('.logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr',$el).on('mouseleave',function(){
							$('.logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr',$el).css({'background':'#fff','color':'#000'})
							$('.logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr',$el).find('.timeWidth').css({'background':'rgba(205,205,239,255)'})
							$('.logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr',$el).find('.timeWidthDetail').css('display','none')
						})*/
						$el.click(function(e){
							if($(e.target).closest($('.rightShow, .logFlow-flowInfosActive', $el)).length == 0){
								$('.logFlow-flowInfos-Icon-Active', $el).click();
							}
						});
						$('.logFlow-flowInfoshidden-table .logFlow-flowInfoshidden-tr',$el).on('click', function(event) {
							event.preventDefault();
							var index = $(this).index();
							$(this).parent().parent().parent().prev().find('.logFlow-flowInfos-Icon').eq(index-1).click();
						});
						//鼠标进入链路节点标记
						$('.logFlow-flowInfos-pathAll .logFlow-flowInfos-path',$el).on('mouseenter','.logFlow-flowInfos-Icon',function(){
							let index = $(this).parent().index()
							$('.logFlow-flowInfos-pathAll .logFlow-flowInfos-path',$el).find('.logFlow-flowInfos-pointInfo').css('display','none')
							$('.logFlow-flowInfos-pathAll .logFlow-flowInfos-path',$el).eq(index).find('.logFlow-flowInfos-pointInfo').css('display','block')
						})
						$('.logFlow-flowInfos-pathAll .logFlow-flowInfos-path',$el).on('mouseleave','.logFlow-flowInfos-Icon',function(){
							$('.logFlow-flowInfos-pathAll .logFlow-flowInfos-path',$el).find('.logFlow-flowInfos-pointInfo').css('display','none')
						})
						
						//右侧信息框滑出
						 $('.logFlow-flowInfos-pathAll .logFlow-flowInfos-path',$el).on('click','.logFlow-flowInfos-Icon',function(event){
							 event.stopPropagation();
							 let index = $(this).parent().index()
							 linkIndex = $(this).parent().parent().parent().parent().parent().index()
							 var $tr = $(this).parent().parent().parent().parent().next().find('.logFlow-flowInfoshidden-tr').eq(index);
							 rightShow(index,linkIndex)
							 if($(this).hasClass('logFlow-flowInfos-Icon-Active')){
								 $(this).removeClass('logFlow-flowInfos-Icon-Active');
								 $('.rightShow',$el).removeClass('rightShowActive');
								 $tr.removeClass('active');
							 }else{
								 $('.logFlow-flowInfos-pathAll .logFlow-flowInfos-path',$el).find('.logFlow-flowInfos-Icon').removeClass('logFlow-flowInfos-Icon-Active')
								 .eq(index).addClass('logFlow-flowInfos-Icon-Active');
								 $tr.addClass('active').siblings('tr').removeClass('active');
								 $tr[0].scrollIntoView({block: "start",behavior: "smooth"});
								 if($('.rightShow',$el).hasClass('rightShowActive')){
								 	$('.rightShow',$el).removeClass('rightShowActive');
								 	handler.setTimeout(function() {
								 		$('.rightShow',$el).addClass('rightShowActive');
								 	},510);
								 }else{
								 	$('.rightShow',$el).addClass('rightShowActive');
								 }
							 }
							 
//							 if($('.rightShow',$el).hasClass('rightShowActive')){
//								 $('.rightShow',$el).removeClass('rightShowActive');
//							 }
							 
							 /*$('.rightShow',$el).toggleClass('rightShowActive');*/
						 })
						 
						 $('.logFlow-close',$el).click(function(){
							 $('.rightShow',$el).removeClass('rightShowActive');
							 $('.logFlow-flowInfos-pathAll .logFlow-flowInfos-path',$el).find('.logFlow-flowInfos-Icon').removeClass('logFlow-flowInfos-Icon-Active');
							 $('.logFlow-flowInfoshidden-tr.active', $el).removeClass('active');
						 })
						
						//点击链路显示链路详情
						$('.logFlow-flowInfos .logFlow-flowInfosOne',$el).click(function(event){
							$('.logFlow-flowInfos .logFlow-flowInfosOne',$el).eq($(this).index()).toggleClass('logFlow-flowInfosActive');
							$('.logFlow-flowInfos .logFlow-flowInfosOne',$el).eq($(this).index()).find('.logFlow-flowInfoshidden').toggleClass('logFlow-flowInfoshiddenActive');
							
							$('.logFlow-flowInfos .logFlow-flowInfosOne',$el).eq($(this).index()).find('.logFlow-flowInfoshidden').click(function(event){
								event.stopPropagation()
								$('.logFlow-flowInfos .logFlow-flowInfosOne',$el).eq($(this).index()).find('.logFlow-flowInfoshidden').css('display','block');
							})


						})
						
						$('.logFlow-flowInfosOne:first', $el).trigger('click');
						//右侧信息框渲染
							
						function rightShow(index,linkIndex){
							 let templateTable = '<table class="logFlow-table"></table>'
							 $('.rightShow .content',$el).append(templateTable);
							 let tableData = logFlowPointInfo[linkIndex]; 
							 /*$('.logFlow-id .logFlow-td2',$el).html(tableData[index]._id)
							 $('.logFlow-index .logFlow-td2',$el).html(tableData[index]._index)
							 $('.logFlow-routing .logFlow-td2',$el).html(tableData[index]._routing)
							 $('.logFlow-score .logFlow-td2',$el).html(tableData[index]._score)*/
							 $('.logFlow-keywords .logFlow-td2',$el).html(tableData[index].keywords && tableData[index].keywords.join(","))
							 $('.logFlow-duration .logFlow-td2',$el).html(tableData[index]._source.duration)
							 $('.logFlow-start .logFlow-td2',$el).html(tableData[index]._source.start)
							 $('.logFlow-stop .logFlow-td2',$el).html(tableData[index]._source.stop)
							 $('.logFlow-sysdate .logFlow-td2',$el).html(tableData[index]._source.sysdate)
							 $('.logFlow-appid .logFlow-td2',$el).html(tableData[index]._source['_head_.appid'])
							 $('.logFlow-appname .logFlow-td2',$el).html(tableData[index]._source['_head_.appname'])
							 $('.logFlow-category1 .logFlow-td2',$el).html(tableData[index]._source['_head_.category1'])
							 $('.logFlow-category2 .logFlow-td2',$el).html(tableData[index]._source['_head_.category2'])
							 $('.logFlow-category3 .logFlow-td2',$el).html(tableData[index]._source['_head_.category3'])
							 $('.logFlow-file .logFlow-td2',$el).html(tableData[index]._source['_head_.file'])
							 $('.logFlow-hostip .logFlow-td2',$el).html(tableData[index]._source['_head_.hostip'])
							 	.attr({
							 		'data-index': tableData[index]._index,
							 		'data-id': tableData[index]._id,
							 	})
							 $('.logFlow-logid .logFlow-td2',$el).html(tableData[index]._source['_head_.logid'])
							 $('.logFlow-logsn .logFlow-td2',$el).html(tableData[index]._source['_head_.logsn'])
							 $('.logFlow-logtime .logFlow-td2',$el).html(tableData[index]._source['_head_.logtime'])
							 $('.logFlow-sourceid .logFlow-td2',$el).html(tableData[index]._source['_head_.sourceid'])
							 $('.logFlow-sourcename .logFlow-td2',$el).html(tableData[index]._source['_head_.sourcename'])
							 $('.logFlow-type .logFlow-td2',$el).html(tableData[index]._source['_head_.type'])
							 logsn = tableData[index]._source['_head_.logsn'];
						 }
						
						
						
						//
						
						$('.logFlow-detail', $el).click(function () {
							// debugger;
							let tableData = logFlowPointInfo[linkIndex]; 
							let logsns = [];
							for(var i =0;i<tableData.length;i++){
								logsns[i] = {
									logsn:tableData[i]._source['_head_.logsn'],
									appname:tableData[i]._source['_head_.appname'],
									keywords:tableData[i].keywords && tableData[i].keywords.join(","),
									_index:tableData[i]._index,
									_routing:tableData[i]._routing,
									id:tableData[i]._id
								}
							}
						 	app.dispatcher.load({
						 		"title": "日志明细-"+logsn.substring(0, 4)+'...'+logsn.substr(-4, 4),
						 		"moduleId": 'logSearch',
						 		"section": 'logDetail',
						 		"id": 'logflow-'+logsn,
						 		"params": {
						 			serialno:logsn,
						 			logsns:logsns,
									'id': $('.logFlow-hostip .logFlow-td2',$el).attr('data-id'),
									'host': $('.logFlow-hostip .logFlow-td2',$el).html(),
									'index': $('.logFlow-hostip .logFlow-td2',$el).attr('data-index'),
									'fileName': $('.logFlow-file .logFlow-td2',$el).html()
						 		}
						 	});
						 })
						
					}
				})
			}
			
			
			
			
			
			
			
		},
		
		unload : function(handler) {
			
		},

		pause : function($el, scope, handler) {
			
		},

		resume : function($el, scope, handler) {

		}
	}
})
