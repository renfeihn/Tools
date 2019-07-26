define(["jquery", "underscore","../DashBorad/DashBoradService","handlebars"],function($, _, api,Handlebars){
	return {
		load: function($el, scope, handler) {
			var CacheStatic = {};

			init()
			function init(){
				getEcharts();
				getEventKpi();
				getEventList();
			}

			//获取echarts基础数据
			function getEcharts(){
				app.common.ajaxWithAfa({
					url:"DashBoardAction_getIndexDashBoard.do",
				}).done(function(data){
					var result = data.result,
						boradIdArr = [];
	                var finalData = EtlData(result),
	                	boradIdArr = finalData[1];
	                generatorDashBoard(finalData[0]);
					generatorCharts(boradIdArr);
				});
			}
			/**
            *  生成echarts图表
            */
            var generatorCharts = function (boradIdArr) {
                if (!boradIdArr || !boradIdArr.length) return;
                if (Object.prototype.toString.call(boradIdArr) != "[object Array]"){
                    boradIdArr = [boradIdArr];
                }

                api.getDashBoardData(boradIdArr).then(function(data){
                   	var keys = Object.keys(data);
                   	var aggs = null, paramData = null, options = null, borderEle = null;
                    for (var i = 0; i< keys.length; i++){
                        aggs = data[keys[i]];
                        paramData = JSON.parse(CacheStatic[keys[i]]).paramData;
                        options = api.getEchartsOptionByParams(aggs, paramData);
                        borderEle = $('[boardid = '+keys[i]+']', $el).find(".index-charts-item");
                        if(options){
                           app.echarts.init(borderEle[0]).setOption(options); 
                        }else{
                            borderEle.html('<span style="color:#999;font-size:12px;font-weight:normal;">暂无数据～</span>');
                        }
                    }
				});
				
            }

			/**
             * 切片数据 生成所需要的数据 返回
             */
            var EtlData = function(data){
                var finalData = [], htmlData = [], boradIdData = [];
                for (var i = 0; i < data.length; i++) {
                    htmlData.push({
                        relation: data[i].relation,
                        title: data[i].dashBoard.name,
                    });
                    boradIdData.push(data[i].relation.boardId);
                    CacheStatic[data[i].relation.boardId] = data[i].dashBoard.statistics;
                }
                Object.keys(CacheStatic).forEach(function(item){
                    item = item - 0;
                    if (!boradIdData.includes(item)){
                         delete CacheStatic[item];
                    }
                });
                finalData = [htmlData, boradIdData];
                return finalData;
            }

             /**
             * 生成 仪表盘对应的图表容器
             */
            var generatorDashBoard = function(data){
                var temp = $("#dashBoradItem", $el).html();
                var template = Handlebars.compile(temp);
                var html = template(data);
                $(".index-content-main", $el).html(html);
                var height = $('.index-content-main',$el).outerHeight();
                $('#eventContent',$el).css('max-height',(height-340)+'px');
            }

            //点击按钮跳转日志搜索
            $(".index-content-main",$el).on("click","i.fa-reply", function(e){
                e = e || window.event;
                e.stopPropagation();
                e.preventDefault();
                var ele = $(this).closest(".index-instance-item");
                var boradId = ele.attr("boardid");
                app.dispatcher.load({
                   title: '日志搜索',
                   moduleId: 'logResultCheck',
                   section: '',
                   id: boradId,
                   params: {
                       dashboardId: boradId
                   },
                   context: $el
                });
            });
            
            //搜索
            $("#search",$el).on("keydown", function(e){
            	var val = $("#search",$el).val().trim();
             	if(e.keyCode == 13){
             		app.dispatcher.load({
	                	title: '日志搜索',
	                	moduleId: 'logResultCheck',
	                	section: '',
	                	params: {
	                	    searchText: val
	                	},
	                	context: $el
               		});
             	}
            });
            //事件列表展开收起
            $('#eventContent',$el).on('click','p',function(){
            	var $i = $(this).find('i');
            	$i.toggleClass('fa-minus-square-o fa-plus-square-o');
            	if($i.hasClass('fa-minus-square-o')){
            		$(this).next().show();
            	}else{
            		$(this).next().hide();
            	}
            });

            $('#eventKpi',$el).on('click','span',function(){
            	if($(this).text()==0||$(this).text()=='-'||$(this).text()==undefined||$(this).text()==null){
            		return;
            	}
            	var title = $(this).attr('title'),obj={};
            	if(title=='未处理'){
            		obj.dStatus = 'DEALING';
            	}else if(title=='处理中'){
            		obj.dStatus = 'DEALING';
            	}else if(title=='已处理'){
            		obj.dStatus = 'DEALT';
            	}else if(title=='普通'){
					obj.eType = 'INFO';
            	}else if(title=='严重'){
            		obj.eType = 'WARING';
            	}else if(title=='紧急'){
					obj.eType = 'ALARM';
            	}else if(title=='长时间未处理'){
					obj.dStatus = 'DEAL_LONGTIME';
            	}
            	obj.appId = -1;
            	app.dispatcher.load({
                	title: title+'事件列表',
                	moduleId: 'eventList',
                	section: '',
                	params: obj,
                	context: $el
                });
            });

 			$('#eventContent',$el).on('click','.eventDetail',function(){
            	var id = $(this).prev().text();
            	app.common.ajaxWithAfa({
					url: "EventDetailAction_getEventDetailsByEventId.do",
					data : {
						'eventId':id
					},
				}).done(function(data) {
					if(!$.isEmptyObject(data.eventInfoDsp)){
						var data = data.eventInfoDsp;
                        if(data.eventSource == '07'){
                            app.dispatcher.load({
                                title: "事件详情 - "+data.eventId,
                                moduleId:"eventMonitor",
                                section:["eventMonitorDetails"],
                                id:data.eventId,
                                params:{
                                    data:data
                                }
                            });
                        }else{
                            app.dispatcher.load({ //跳转到事件详情页
                                title: '事件详情 - ' + id,
                                moduleId: 'eventList',
                                section: 'eventInfo',
                                params: {
                                    eventId: data.eventId,
                                    objId: data.objId,
                                    appIds: data.appIds,
                                    serverId: data.serverId,
                                    appName: data.appName,
                                    eventType: data.eventType,
                                    objName: data.objName
                                }
                            });
                        }
					}
					
				});
            });

            //获得事件指标值
            function getEventKpi(){
            	app.common.ajaxWithAfa({
					url:"ShowUserPrivilegeAction_dayEventBaseInfo.do",
				}).done(function(data){
					var result = data.result;
					$('#eventKpi',$el).find('span').each((index,item)=>{
						var id = $(item).attr('id');
						$('#'+id,$('#eventKpi',$el)).text(result[id]);
					});
				});
            }

             //获得事件列表
            function getEventList(){
            	app.common.ajaxWithAfa({
					url:"ShowUserPrivilegeAction_latestEvent.do",
				}).done(function(data){
					var result = data.result;
					var unDealHtml = result.unHand.map((item,index)=>{
						return `<li>
						<span class="red">${item.id}</span>
						<span class="eventDetail" title="${item.recordTime}">${item.recordTime}</span>
						<span title="${item.summary}">${item.summary}</span>
						</li>`;
					}).join('');

					var dealingHtml = result.handing.map((item,index)=>{
						return `<li>
						<span class="yellow">${item.id}</span>
						<span class="eventDetail" title="${item.recordTime}">${item.recordTime}</span>
						<span title="${item.summary}">${item.summary}</span>
						</li>`;
					}).join('');

					var dealHtml = result.handed.map((item,index)=>{
						return `<li>
						<span class="green">${item.id}</span>
						<span class="eventDetail" title="${item.recordTime}">${item.recordTime}</span>
						<span title="${item.summary}">${item.summary}</span>
						</li>`;
					}).join('');

					$('#unDeal',$el).empty().append(unDealHtml);
					$('#unDealNum',$el).text(result.unHand.length)
					$('#dealing',$el).empty().append(dealingHtml);
					$('#dealingNum',$el).text(result.handing.length);
					$('#deal',$el).empty().append(dealHtml);
					$('#dealNum',$el).text(result.handed.length);
				
					$('#eventContent',$el).find('p').each((index,item)=>{//收起
						if($(item).find('i').hasClass('fa-minus-square-o')){
							$(item)[0].click();
						}
					});
					$('#eventContent',$el).find('ul').get().some((item,index)=>{//展开第一个有数据的
						if($(item).find('li').length){
							$(item).prev().click();
							return true;
						}
					});
				});
            }

            handler.setInterval(function(){
            	init();
            },60000);
		},

		unload: function(handler) {
			
		},

		pause: function($el, scope, handler) {

		},

		resume: function($el, scope, handler) {

		}

	}
});
