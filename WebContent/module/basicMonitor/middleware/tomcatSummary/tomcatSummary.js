define([ "jquery" ], function() {
	//echarts对象
	var eEvent;//事件总览
	return {
		load : function($el, scope, handler) {
			//echarts公共配置
			var basicEcharts = {
				handler	: handler,
				context	: $el,
				eType	: 'line',
			},
			urlParams = {
				interval : 1,
				time 	 : 60,
			};
			var tomcatList;
			//基础数据
			app.common.ajaxWithAfa({
				url  : "TomcatSecondarySumAction_getTomcatBaseInfo.do"
			}).done(function(data){
				var base = data.result;
				if(!base || $.isEmptyObject(base)){
					return;
				}
				//统计
				$('#tomcatSummary-instanceCount [label-flag=info]', $el).each(function(){
					var $t  = $(this),
						val = base[$t.attr('id')];
					if(typeof val != 'number'){
						val = val || '-';
					}
					$t.text(val);
				});
				// 关键kpi统计
				$('#tomcatSummary-event [label-flag=info]', $el).each(function(){
					var $t  = $(this),
						val = base[$t.attr('id')];
					if(typeof val != 'number'){
						val = val || '-';
					}
					$t.text(val);
				});
				//事件总览
				showItems('tomcatSummary-kpi',[base.reqRespTimeHigh,base.threadBusyHigh,base.sessionHigh,base.jvmMemUseHigh]);
			
				tomcatList = base.tomcatList;
				addData(tomcatList,$dataTable);
			});
			
			function showItems(id,data) {
				var ele = $('#'+id,$el).children();
				for (var i = 0; i < ele.length; i++) {
					if (typeof data[i] != 'number') {
						ele[i].innerHTML= typeof data[i] == 'undefined'? '-' :data[i].split('.')[0];
					}else {
						ele[i].innerHTML= typeof data[i] == 'undefined'? '-' :parseInt(data[i]);
					}
				}
			}

			function fnEEvent(){
				eEvent = app.drawEcharts($.extend({}, basicEcharts, {
					selector: '#echart-event',
					unit	: '个',
					items	: ['预警','告警'],
					url		: 'TomcatSecondarySumAction_getEventEcharts.do',
					urlParams: $.extend({}, urlParams, {
					})
				}));
				eEvent.start();
			}
			fnEEvent();

			var $dataTable = $("#dataTable", $el).DataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
				'columns':[{
					data:'index',defaultContent:''
				},{
					data:'ip',defaultContent:''
				},{
					data:'status',defaultContent:''
				},{
					data:'healthValue',defaultContent:''
				},{
					data:'deployApplicationCount',defaultContent:''
				},{
					data:'currSessionCount',defaultContent:''
				},{
					data:'avgReqRespTime',defaultContent:''
				},{
					data:'threadBusy',defaultContent:''
				},{
					data:'jvmMemUsageRate',defaultContent:''
				}],
				'aoColumnDefs':[{
					'render':function(data,type,row,meta){
						if(data<60){
							return '<span class="red">'+data+'</span>'
						}else if(data<80){
							return '<span class="yellow">'+data+'</span>'
						}else{
								return '<span class="green">'+data+'</span>'
						}
					},
					'targets':3
				},{
					'render':function(data,type,row,meta){
							if (data) {
								return "正常";
							}else {
								return "异常";
							}
					},
					'targets':2
				}],
				"createdRow": function ( row, data, index ) {
          if (data == "正常") {
						$('td', row).eq(2).css("color","#22AC38");
					}else{
						$('td', row).eq(2).css("color","#FF3341");
					}
				}
			});
			function addData(data, $table){
				var result = data;
				$table.clear();
				if(result && result.length > 0){
					result.forEach(function(item, index){
						item.index = ++index;
					});
					$table.rows.add(result).draw();
				}
			}

			$("#tomcatSummary-ToPage",$el).on("keydown",function(e){
					var e = e || window.event;
					var keycode = e.keycode || e.which;
					var leaf = parseInt($(this).val());
					if(keycode === 13){
						$dataTable.api().page(leaf-1).draw("page");
					}
				});

			$("#dataTable", $el).delegate('tr','click',function () {
				/*var objectId = $dataTable.row(this).data().objectId;*/
				app.dispatcher.load({
					title: "TOMCAT-"/*+ objectId*/,
					moduleId:"basicMonitor",
					section:["middleware","tomcatSummary","tomcatTabs"],
					id:"",
					params:{/*
						'objectId':objectId,*/
						'section':''
					}
				});
			});
		},
		unload : function(handler) {
			var echartsArr = [
			  eEvent
			];
			echartsArr.forEach(function(item){
				item && item.dispose();
			});
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});