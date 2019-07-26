define([], function() {
  return {
    load: function($el, scope, handler) {

    	fakeInit();
    	function fakeInit() {
    		for(let i in scope.info){
        		$('div[data-role="'+i+'"]',$el).text(scope.info[i]);
        	}
    		
    		var echarts = app.echarts.init($('#echart1',$el)[0]);
    		var option = {
    			    color: ['#646BFF'],
    			    title: {
    			    	text: '单位: %',
    			    	left: '3%',
    			    	textStyle: {
    			    		fontSize: 12
    			    	}
    			    },
    			    tooltip : {
    			        trigger: 'axis',
    			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    			            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
    			        }
    			    },
    			    grid: {
    			    	top: '12%',
    			        left: '3%',
    			        right: '4%',
    			        bottom: '3%',
    			        containLabel: true
    			    },
    			    xAxis : [
    			        {
    			            type : 'category',
    			            data : ['windows', 'linux', 'mysql', 'oracle'],
    			            axisTick: {
    			                alignWithLabel: true
    			            }
    			        }
    			    ],
    			    yAxis : [
    			        {
    			            type : 'value',
    			            max: '100'
    			        }
    			    ],
    			    series : [
    			        {
    			            name:'数值',
    			            type:'bar',
    			            barWidth: '20%',
    			            data:[93, 96, 89, 92]
    			        }
    			    ]
    			};
    		echarts.setOption(option);
    		
    	}
    	
    	
    	
    	var scope_app_id = scope.app_id;
    	
    	var $objListModal = $("#objListModal", $el),
	    	$strategyModal = $("#strategyModal", $el),
	    	$KPIModal = $("#KPIModal", $el),
	    	objMonitorWhich, // 表示监控对象统计点了哪个打开的modal
	    	strategySum,//'策略总数'
	    	strategyMon ,//'策略已启用'
	    	strategyUnMon,//'策略未启用'
	    	strategyTypeData,//用来存储鼠标点击了策略总数，未启用，已启用的数据，用于弹框中筛选类型个性、标准、全部数据
	    	objSum ,//'监控对象总数'
	    	objMon ,//'监控对象已监控'
	    	objUnMon,//'监控对象未监控'
	    	commandStop,//'未启动'
	        commandStart,//'已启动'
	        KPITypeData;//用来存储鼠标点击了指标采集未启用，已启用的数据，用于弹框中筛选类型个性、标准、全部数据

    	var objListTable = $("#objListTable", $el).DataTable({
            'bPaginate': true, // 开关，是否显示分页器
            'pagingType': 'full_numbers',
            'bStateSave': false,
            'bSort': false, // 排序
            "ordering": false,
            'pageLength': 10,
            "searching": true,
            columns: [{
            	data: 'object_id',defaultContent: '-',
            	render: function(data) {
            		return '<input type="checkbox" id="' + data + '" />'
            	}
            }, {
            	data: 'l1_cate_name',defaultContent: '-',
            }, {
            	data: 'l2_cate_name',defaultContent: '-',
            }, {
            	data: 'l3_cate_name',defaultContent: '-',
            }, {
            	data: 'object_name',defaultContent: '-',
            }, {
            	data: '',defaultContent: '-',//IP地址
            }, {
            	data: '',defaultContent: '-',//所属服务器
            }, {
            	data: 'monitor_status',defaultContent: '-',
            	render: function(data) {
            		return data ? '已监控' : '未监控';
            	}
            }],
          });

    	 // 报警策略统计
        var strategyTable = $("#strategyTable", $el).DataTable({
        	 'bPaginate': true, //开关，是否显示分页器
             'pagingType': 'full_numbers',
             "ordering": false,
             'pageLength': 10,
             "searching": true,
             'columns': [{
             	data: 'gid',
             	render: function(data, type, row, meta) {
             		return '<input type="checkbox" id="' + row.gid + '" data-triggerId="'+row.id+'" />'
             	}
             }, {
             	data: 'object_name',defaultContent: '-',//对象名称
             	render: function(data, type, row, meta) {
             		if(data == '') {
             			return '全部';
             		}
             	}
             }, {
             	data: 'trigger_name',defaultContent: '-'//触发器名称
             }, {
             	data: 'display_name',defaultContent: '-',//指标
             		render: function(data, type, row, meta) {
                 			return row.category_name+'_'+data;
                 	}
             }, {
             	data: 'name',defaultContent: '-'//指标英文名称
             }, {
             	data: 'alarmMeName',defaultContent: '-'//报警策略名称
             }, {
             	data: 'event_type',defaultContent: '-',//事件类型
             	render: function(data, type, row, meta) {
             		if(data == 0) {
             			return '故障';
             		} else if(data == 1) {
             			return '预警';
             		}else{
             			return '信息';
             		}
             	}
             }, {
             	data: 'msgcontent', defaultContent: '-',//消息模板
             }, {
             	data: 'enabled',defaultContent: '-',//是否启动
             	render: function(data) {
             		if(data) {
             			return '已启动';
             		}else{
             			return '未启动';
             		}
             	}
             }]
        });

        // 监控采集项统计
        var KPITable = $("#KPITable", $el).DataTable({
        	'bPaginate': true, // 开关，是否显示分页器
        	'pagingType': 'full_numbers',
        	'bStateSave': false,
        	'bSort': false, // 排序
        	"ordering": false,
        	'searching': true,
        	'pageLength': 10,
        	'columns':[
   				    {data:'cmd_type',defaultContent:''},			//对象类型
   					{data:'execute_id',defaultContent:''},			//采集器
   					{data:'executor_name',defaultContent:''},			//采集器名称
   					{data:'executor_type',defaultContent:''},		//采集方式
   					{data:'execute_interval',defaultContent:''},    //采集频率
   					{data:'execute_obj_id',defaultContent:''},    //类型
   					{data:'enabled',defaultContent:''},		        //运行状态
   				],
   				'aoColumnDefs':[{
   					'render':function(data,type,row,meta){
   							if(data == "0"){
   								return '周期'
   							}else{
   								return '定时'
   							}
   						},
   						'targets':3
   					},{
   					'render':function(data,type,row,meta){
   							if(data == 0){
   								return '标准'
   							}else{
   								return '个性'
   							}
   						},
   						'targets':5
   					},{
   						'render':function(data,type,row,meta){
   							if(data == "0") {
   		        				return '未启动';
   		        			} else {
   		        				return '启动';
   		        			}
   						},
   						'targets':6
   					}],
        });
        
    	// table初始化
        var table1 = $("#table1", $el).DataTable({
      	  paging: false,
      	  searching: false,
      	  ordering: false,
      	  columns: [{
      		  data: 'a',defaultContent: '-',
      	  }, {
      		  data: 'b',defaultContent: '-',
      	  }, {
      		  data: 'c',defaultContent: '-',
      	  }, {
      		  data: 'd',defaultContent: '-',
      	  }, {
      		  data: 'e',defaultContent: '-',
      	  }],
        });

        var table2 = $("#table2", $el).DataTable({
      	  paging: false,
      	  searching: false,
      	  ordering: false,
      	  columns: [{
      		  data: 'a',defaultContent: '-',
      	  }, {
      		  data: 'b',defaultContent: '-',
      	  }, {
      		  data: 'c',defaultContent: '-',
      	  }, {
      		  data: 'd',defaultContent: '-',
      	  }, {
      		  data: 'e',defaultContent: '-',
      	  }],
        });

        var table3 = $("#table3", $el).DataTable({
      	  paging: false,
      	  searching: false,
      	  ordering: false,
      	  columns: [{
      		  data: 'a',defaultContent: '-',
      	  }, {
      		  data: 'b',defaultContent: '-',
      	  }, {
      		  data: 'c',defaultContent: '-',
      	  }, {
      		  data: 'd',defaultContent: '-',
      	  }, {
      		  data: 'e',defaultContent: '-',
      	  }, {
      		  data: 'f',defaultContent: '-',
      	  }],
        });

          var checkboxAll = app.selectComponent({
        	  $context: $el,
        	  btnSelector: '#checkboxAll',
        	  tbodySelector: '#objListTable tbody',
        	  isDataTable: true,
        	  addMethod: function(list, elem) {
        		  var $parent = $(elem).parent();
        		  list[elem.id] = {
        				  checked: elem.checked,
        				  node: $parent[0],
        				  parent: $parent.parent()[0]
        		  };
        	  },
        	  getIDMethod: function(elem) {
        		  return elem.id;
        	  },
        	  getNode: function(list, id) {
        		  return list[id].node;
        	  },
        	  getStatusMethod: function(list) {
        		  return '_default';
        	  }
          });
          
          
      // 左上角三个框的数据
      //getLTData();
      function getLTData() {
        app.common.ajaxWithAfa({
          url: "MonitorCfgManagerAction_queryMonitorInfoByAppId.do",
          data: {
              "app_id": scope_app_id
          }
        }).done(function(data) {
          var result = data.funs,
	          monObjectCount = result.monObjectCount,
	          measureCount = result.measureCount,
          	  commandCount = result.commandCount;
          	  strategySum = JSON.parse(measureCount.measureSumList);//'策略总数'
          	  strategyMon = JSON.parse(measureCount.monMeasureCountList);//'策略已启用'
          	  strategyUnMon = JSON.parse(measureCount.unmonMeasureList);//'策略未启用'
	          objSum = JSON.parse(monObjectCount.monSumList);//'监控对象总数'
	          objMon = JSON.parse(monObjectCount.monObjList);//'监控对象已监控'
	          objUnMon = JSON.parse(monObjectCount.unmonObjList);//'监控对象未监控'
	          commandStop = JSON.parse(commandCount.commandStopList);//'未启动'
	          commandStart = JSON.parse(commandCount.commandStartList);//'已启动'
          $("#ziyuan", $el).html(monObjectCount.monSum);//'监控对象总数'
          $("#monitoring", $el).html(monObjectCount.count);//'监控对象已监控'
          $("#unmonitoring", $el).html(monObjectCount.unmonObjCount);//'监控对象未监控'
          $("#strategy", $el).html(measureCount.monSum);//'策略总数'
          $("#unlaunch2", $el).html(measureCount.unmonMeasureCount);//'策略未启用'
          $("#launch2", $el).html(measureCount.monMeasureCount);//'策略已启用'
          $("#unlaunch", $el).html(commandCount.commandStopCount);//'未启动'
          $("#launch", $el).html(commandCount.commandStartCount);//'已启动'
          
        });
      }
      
//      eEvent = app.showEcharts({
//    	  handler	 : handler,
//    	  context	 : $el,
//    	  selector : '#echart1',
//    	  eType	 : 'bar',
//    	  url		 : 'MonitorCfgManagerAction_queryMonitorInfoByAppId.do',
//    	  unit	 : '%',
//    	  items	 : ['数值'],
//    	  urlParams: {
//    		  "app_id": scope_app_id
//    	  },
//      });
//      eEvent.start();
      
      
      //监控完整度和策略完整度切换（策略完整度暂未实现）
      $("#tab1", $el).click(function() {
    	  $("#echart2Container", $el).hide();
    	  $("#echart1Container", $el).show();
      }).click();
      
      $("#tab2", $el).click(function() {
    	  $("#echart1Container", $el).hide();
    	  $("#echart2Container", $el).show();
      });
      
    //待确认、待补充切换
      $("#tab3", $el).click(function() {
    	  $("#table2Container", $el).hide();
    	  $("#table1Container", $el).show();
      }).click();
      
      $("#tab4", $el).click(function() {
    	  $("#table1Container", $el).hide();
    	  $("#table2Container", $el).show();
      });
      
      // 监控对象、报警策略点击事件
      $("#ziyuan", $el).click(function() {//'监控对象总数'
    	  getObjListTableData(objListTable,objSum);
    	  $objListModal.modal("show");
      });
     
      $("#monitoring", $el).click(function() {//'监控对象已监控'
    	  getObjListTableData(objListTable,objMon);
    	  $objListModal.modal("show");
      });

      $("#unmonitoring", $el).click(function() {//'监控对象未监控'
    	  getObjListTableData(objListTable,objUnMon);
    	  $objListModal.modal("show");
      });

      $("#strategy", $el).click(function() {//'策略总数'
    	  getObjListTableData(strategyTable,strategySum);
    	  strategyTypeData = strategySum;
    	  $("#strategyModal", $el).modal("show");
    	  $("select[name='type']", $strategyModal).val('0');
      });

      $("#launch2", $el).click(function() {//'策略已启用'
    	  getObjListTableData(strategyTable,strategyMon);
    	  strategyTypeData = strategyMon;
    	  $("#strategyModal", $el).modal("show");
    	  $("select[name='type']", $strategyModal).val('0');
      });

      $("#unlaunch2", $el).click(function() {//'策略未启用'
    	  getObjListTableData(strategyTable,strategyUnMon);
    	  strategyTypeData = strategyUnMon;
    	  $("#strategyModal", $el).modal("show");
    	  $("select[name='type']", $strategyModal).val('0');
      });

      $("#unlaunch", $el).click(function() {//'未启动'
    	  getObjListTableData(KPITable,commandStop);
    	  KPITypeData = commandStop;
    	  $("#KPIModal", $el).modal("show");
    	  $("select[name='type']", $KPIModal).val('0');
      });

      $("#launch", $el).click(function() {//'已启动'
    	  getObjListTableData(KPITable,commandStart);
    	  KPITypeData = commandStart;
    	  $("#KPIModal", $el).modal("show");
    	  $("select[name='type']", $KPIModal).val('0');
      });

      objListTable.on("draw", function() {
    	  checkboxAll.clear();
      })
      
      function getObjListTableData(table,result) {
    	  table.clear().draw(true);
    	  if(result && result.length > 0){
    		  table.rows.add(result).draw();
    	  }
      }

      $("#objListTable", $el).on("click", "tbody>tr", function(e) {
    	  if($(this).children('td').hasClass('dataTables_empty')) {
    		  return false;
    	  }

    	  $(this).addClass('selected').siblings().removeClass('selected');

    	  var $check = $(this).find('>:nth-child(1)>input');
    	  if(e.target !== $check[0]) {
    		  $check[0].click();
    	  }
      });

      $("#objListTable", $el).on("click", "tr>:nth-child(1)>input", function(e) {
        /*
         * setTimeout手动把获取数据与处理放到事件列队末尾，滥用setTimeout会导致事件列队混乱，请谨慎使用
         * ————by Vegeta
         */
    	  setTimeout(function() {
    		  var selectedIdsObj = checkboxAll.list(),
    		  selectedRows = objListTable.rows(function(index, data, node) {
    			  return data.obj_id in selectedIdsObj;
    		  }).data();

    		  var startNum = 0,
    		  stopNum = 0;
    		  for(var i = 0; i < selectedRows.length; i++) {
    			  if(selectedRows[i].monitor_flag === 1) {
    				  startNum++;
    			  } else {
    				  stopNum++;
    			  }
    		  }

    		  if(selectedRows.length === 0) {
    			  $("#start", $el).attr("disabled", true);
    			  $("#stop", $el).attr("disabled", true);
    		  } else if(startNum === selectedRows.length) {
    			  $("#start", $el).attr("disabled", true);
    			  $("#stop", $el).attr("disabled", false);
    		  } else if(stopNum === selectedRows.length) {
    			  $("#start", $el).attr("disabled", false);
    			  $("#stop", $el).attr("disabled", true);
    		  } else {
    			  $("#start", $el).attr("disabled", true);
    			  $("#stop", $el).attr("disabled", true);
    		  }
    	  }, 0);
      });

      $objListModal.on('hide.bs.modal', function() {
        $("#start", $el).attr("disabled", true);
        $("#stop", $el).attr("disabled", true);

        // 刷新modal外面的数据
        getLTData();
      });

      //报警策略模态窗
      $("#strategyModal", $el).on('hide.bs.modal', function() {
        $("select[name='type']", $strategyModal).val('1');
        $("select[name='type']", $strategyModal).val('');

        // 刷新modal外面的数据
        getLTData();
      });

      //开始监控
      $("#start", $el).click(function() {
        var selectedIdsObj = checkboxAll.list(),
          promiseNum = 0, // 用来标记发出去的请求是否已经全部相应，为0时表示全部已经相应
          selectedRows = objListTable.rows(function(index, data, node) {
            return data.obj_id in selectedIdsObj;
          }).data();

        for(var i = 0; i < selectedRows.length; i++) {
          promiseNum++;
          var p = {
            "server_id": [selectedRows[i].server_id],
            "obj_list": [selectedRows[i].obj_id],
            "app_id": scope_app_id,
            "obj_class_3": selectedRows[i].obj_class_3,
            "obj_class_1": selectedRows[i].obj_class_1,
            "obj_class_2": selectedRows[i].obj_class_2,
            "obj_type": selectedRows[i].obj_type
          };

          (function(ii) {
            app.common.ajaxWithAfa({
              url: "AFARequestAction_callAfaAppGf.do",
              data: {
                "appType": 'APPCONF',
                "target": 'AddRmvMonitor',
                "args": JSON.stringify(p)
              }
            }).done(function(data) {
              promiseNum--;
              var result = data.result.public_rsp;

              if(result.errorcode === '000000') {
                app.alert(selectedRows[ii].c_name + '启动监控成功');
              } else {
                app.alert('title', selectedRows[ii].c_name + '启动监控失败', app.alertShowType.ERROR);
              }

              if(promiseNum === 0) {
                getObjListTableData(objMonitorWhich);
              }
            });
          }(i));
        }
      })

        //停止监控
      $("#stop", $el).click(function() {
        var selectedIdsObj = checkboxAll.list(),
          promiseNum = 0, // 用来标记发出去的请求是否已经全部相应，为0时表示全部已经相应
          selectedRows = objListTable.rows(function(index, data, node) {
            return data.obj_id in selectedIdsObj;
          }).data();

        for(var i = 0; i < selectedRows.length; i++) {
          promiseNum++;
          var p = {
            "server_id": [selectedRows[i].server_id],
            "obj_list": [selectedRows[i].obj_id],
            "app_id": scope_app_id,
            "obj_class_3": selectedRows[i].obj_class_3,
            "obj_class_1": selectedRows[i].obj_class_1,
            "obj_class_2": selectedRows[i].obj_class_2,
            "obj_type": selectedRows[i].obj_type
          };

          (function(ii) {
            app.common.ajaxWithAfa({
              url: "AFARequestAction_callAfaAppGf.do",
              data: {
                "appType": 'APPCONF',
                "target": 'AddRmvMonitor',
                "args": JSON.stringify(p)
              }
            }).done(function(data) {
              promiseNum--;
              var result = data.result.public_rsp;

              if(result.errorcode === '000000') {
                app.alert(selectedRows[ii].c_name + '停止监控成功');
              } else {
                app.alert('title', selectedRows[ii].c_name + '停止监控失败', app.alertShowType.ERROR);
              }

              if(promiseNum === 0) {
                getObjListTableData(objMonitorWhich);
              }
            });
          })(i);
        }
      });

      //策略模态窗中点击切换类型
      $("select[name='type']", $strategyModal).change(function() {
    	  var val  = $(this).val(),data;
    	  if(val==0){
    		  data = strategyTypeData;
    	  }else if(val ==1){
    		  data = strategyTypeData.filter(function(item,index){return item.app_id==scope.app_id});
    	  }else if(val ==2){
    		  data = strategyTypeData.filter(function(item,index){return item.app_id!=scope.app_id});
    	  }
    	  getObjListTableData(strategyTable,data);
      });
      
      $("select[name='type']", $KPIModal).change(function() {
    	  var val  = $(this).val(),data;
    	  if(val==0){
    		  data = KPITypeData;
    	  }else if(val ==1){
    		  data = KPITypeData.filter(function(item,index){return item.app_id==scope.app_id});
    	  }else if(val ==2){
    		  data = KPITypeData.filter(function(item,index){return item.app_id!=scope.app_id});
    	  }
    	  getObjListTableData(KPITable,data);
      });
      
      
    //策略模态窗中点击refresh
      $("#refresh", $strategyModal).click(function() {
    	  $("select[name='type']", $strategyModal).change();
      });

      
      $("#refresh", $KPIModal).click(function() {
    	  $("select[name='type']", $KPIModal).change();
      });

    },
    unload: function(handler) {},
    pause: function($el, attr, handler) {},
    resume: function($el, attr, handler) {}
  };
});