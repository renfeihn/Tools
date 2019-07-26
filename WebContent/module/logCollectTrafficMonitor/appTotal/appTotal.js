define(["jquery"],function(){
    var echartsObj = {
       'eEvent': null
    }
	return {
		load: function($el, scope, handler) {
            var statisticstype = scope.statisticstype;
            var keyName = scope.keyId;
            
            var ztreeObj = null;
            var settings = {
                view : {
                    showLine : false,
                    selectedMulti : true,
                    showIcon: false
                },
                data : {
                    simpleData : {
                        enable : true,
                        idKey : "id",
                        pIdKey : "pId",
                    },
                },
                check: {  
                    enable: true,  
                    chkStyle: "checkbox",  
                    chkboxType: { "Y": "", "N": "" } 
                },
                callback:{
                    onCheck: onZtreeCheck
                }
            };

            function onZtreeCheck(event, treeId, treeNode) {
                 var id = treeNode.id;
                if(treeNode.checked == true){
                    var html = '<div id="LCTMAppTotal-eItem'+id+'" class="LCTMAppTotal-eItem">\
                                <div class="LCTMAppTotal-echartsInfo">\
                                    <span beforeContent="采集总量" data-role="dataSize">-</span>\
                                    <span beforeContent="运行时间" data-role="dataTime">-</span>\
                                </div>\
                                <div class="LCTMAppTotal-echarts" data-role="echarts"></div>\
                            </div>';
                    $('#echartsList', $el).append(html);
                    getEchartsData("LCTMAppTotal-eItem"+id, treeNode.name);
                }else{
                    var tmpId = "LCTMAppTotal-eItem"+id;
                    echartsObj[tmpId] && echartsObj[tmpId].dispose();

                    $('#'+tmpId, $el).remove();
                    delete echartsObj[tmpId];
                }  
            }

            function getEchartsData(contentId,keyName) {
                var $pObj = $('#'+contentId, $el)
                app.common.ajaxWithAfa({
                    url:"LogStaticsAction_getMonInputECharts.do",
                    data:{
                        statisticstype: 1, 
                        keyName:keyName,
                        duration: $('.circle-select>span.active',$el).attr('data-duration')
                    }
                }).done(function(data){
                    if(data.result && !$.isEmptyObject(data.result)){
                        $('[data-role="dataSize"]', $pObj).text(data.result.dataSize || '-kb');
                        $('[data-role="dataTime"]', $pObj).text(data.result.duration || '-kb');
                        var option = getEcharsOption(data.result.echarts, keyName);
                        var $echartsObj = app.echarts.init($('[data-role="echarts"]', $pObj)[0]);
                        $echartsObj.setOption(option);
                        echartsObj[contentId] = $echartsObj;
                    }
                })
            }

			init()
			function init(){
				getEventKpi();
                getIpTree();
                getAppStaticsSummary();
			}
            
			$('.circle-select>span',$el).on('click',function(){
				$(this).addClass('active').siblings().removeClass('active');
				getAppStaticsSummary();
				let checked = ztreeObj.getCheckedNodes();
				if(checked && checked.length > 0){
					checked.forEach(item => {
						getEchartsData("LCTMAppTotal-eItem"+item.id, item.name);
					});
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

            //获得事件指标值
            function getEventKpi(){
            	app.common.ajaxWithAfa({
					url:"ShowUserPrivilegeAction_dayEventBaseInfo.do",
				}).done(function(data){
					var result = data.result;
					$('#eventKpi',$el).find('span').each((index,item)=>{
						var id = $(item).attr('id');
						$('#'+id,$('#eventKpi',$el)).text(result[id]== undefined?'-':result[id]);
					});
				});
            }

            function getAppStaticsSummary() {
                app.common.ajaxWithAfa({
                    url:"LogStaticsAction_getAppStaticsSummary.do",
                    data:{
                        statisticstype: statisticstype, 
                        keyName:keyName,
                        duration: $('.circle-select>span.active',$el).attr('data-duration')
                    }
                }).done(function(data){
                    if(data.result && !$.isEmptyObject(data.result)){
                        for(var item in data.result){
                            $('#'+item, $el).text(data.result[item] || '-');
                        }
                        $('#appName', $el).attr('title', data.result.appName || '-');
                        if(data.result.appECharts && !$.isEmptyObject(data.result.appECharts)){
                            var echartsData = data.result.appECharts
                            $('#dataSize',$el).text(echartsData.dataSize || '-');
                            $('#dataTime',$el).text(echartsData.duration || '-');
                            var option = getEcharsOption(echartsData.echarts,data.result.appName);
                            var eEvent = app.echarts.init($('#eEvent', $el)[0]);
                            eEvent.setOption(option);
                            echartsObj.eEvent = eEvent;
                        }
                    }
                })
            }

            // 获得树
            function getIpTree() {
                app.common.ajaxWithAfa({
                    url:"LogStaticsAction_getMonInPutStatics.do",
                    data:{
                        statisticstype: statisticstype, 
                        keyName:keyName
                    }
                }).done(function(data){
                    var treeArr = forMatTreedata(data);
                    ztreeObj = $.fn.zTree.init($("#ztree", $el), settings, treeArr);
                    if(statisticstype == 2){
                        var tmptreeArr = ztreeObj.getNodeByParam("id",1,null);
                        ztreeObj.selectNode(tmptreeArr[0]);
                        ztreeObj.checkNode(tmptreeArr, true, true);
                    }else{
                        var tmptreeArr = ztreeObj.getNodeByParam("name",keyName,null);
                        ztreeObj.selectNode(tmptreeArr[0]);
                        ztreeObj.checkNode(tmptreeArr, true, true);
                    }
                    onZtreeCheck({},{},tmptreeArr);
                })
            }

            function forMatTreedata(data) {
                var id = 1;
                var treeArr = [];
                if(data.result && data.result.length > 0){
                    data.result.forEach(function (item, index) {
                         var pId = id;
                         if(typeof item == 'string'){
                            treeArr.push({
                                id:id++,
                                name: item,
                                pId: 0
                            }); 
                         }else{
                            var key = Object.keys(item)[0]; 
                            treeArr.push({
                             id:id++,
                             name: key,
                             pId: 0
                            });
                            item[key].forEach(function (i) {
                                treeArr.push({
                                    id:id++,
                                    name:i,
                                    pId: pId
                                });
                            })
                         }
                         
                            
                    })
                }
                return treeArr;
            }

            function getEcharsOption(data,name) {
                var xLine = [];
                var series = [];
                var line1 = [];
                if(data && data.length > 0){
                    data.forEach(function(item) {
                       xLine.push(item[1]);
                       line1.push(item[0]);
                    })
                }
                var option = {
                    color: ['#5b62f9', '#fb8229', '#fa594d', '#0bbf46', '#3e7ad6'],
                    title: {
                        show: true,
                        text: '单位: M',
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
                        data:[name]
                    },
                    grid: {
                        borderWidth: 0,
                        x: 40,
                           y: 25,
                           x2: 30,       
                           y2: 20
                    },
                    tooltip: {
                        trigger: 'axis',
                        confine:true
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
                                    color: '#5c5a66'
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
                            data: xLine
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
                                show: true
                            }
                        }
                    ],
                    series: [{
                        name: name,
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        data: line1      
                    }]
                }

                return option;
            }
		},

		unload: function(handler) {
            for (var item in echartsObj) {
                if (echartsObj.hasOwnProperty(item)) {
                    echartsObj[item] && echartsObj[item].dispose();
                }
            }
		},

		pause: function($el, scope, handler) {

		},

		resume: function($el, scope, handler) {

		}

	}
});
