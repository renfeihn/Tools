define(["jquery", "jqueryUi"], function() {

	return {

		load: function($el, scope, handler) {
			var today = new Date();
			var todayChange = today.getFullYear()+"-"+
			((today.getMonth()+1)<10?"0"+(today.getMonth()+1):(today.getMonth()+1))
			+"-"+(today.getDate()<10?"0"+today.getDate():today.getDate());
			$('#startdate', $el).datetimepicker({
				format: 'yyyy-mm-dd hh:ii:ss',
//				minView: 'month',
				keyboardNavigation: false,
				autoclose: 1,
				endDate:new Date()
			});
			$('#startdate', $el).val(todayChange+" 00:00:00");
			$('#enddate', $el).datetimepicker({
				format: 'yyyy-mm-dd hh:ii:ss',
//				minView: 'month',
				keyboardNavigation: false,
				autoclose: 1,
				endDate:todayChange+" 23:59:59"
			}).on("click",function(){
				$('#enddate', $el).datetimepicker("setStartDate",$('#startdate', $el).val())
				
			});
			$('#enddate', $el).val(todayChange+" 23:59:59");
			
			var ajaxdata={};
			var $table = $("#table", $el);
			var tableRow;
			queryTableData();
			var table = $("#table", $el).DataTable({
				"bAutoWidth": false, // 自动宽度
				'bStateSave': false,
				'searching': false,
				"ordering": false,
				"pagingType": "full_numbers",
				"serverSide": true,
				'pageLength': 15,
				"ajax": function(data, callback, settings) {
					ajaxdata.page = data.length == 0 ? 0 : data.start / data.length;
					ajaxdata.size = 15;
					app.common.ajaxWithAfa({
						aimshelter: '正在加载，请稍后。。。',
						cache: false, // 禁用缓存
						url: 'UserOperationAction_queryAwebUserOperationByPage.do', //获取页面信息的接口
						data: ajaxdata
					}).done(function(result) {
						var list = [],
							elements = 0;
						if(result.awebUserOperations) {
							list = result.awebUserOperations.content;
							elements = result.awebUserOperations.total;
							if(list.length > 0) {
								for(let i = 0, length = list.length; i < length; i++) {
									list[i]["index"] = i + 1 + data.start;
									/*if(!list[i]["trade"]&&list[i]["operation"]=="登录系统"){
										list[i]["trade"]="登录系统";
									}
									if(list[i]["operation"]=="退出登录"){
										list[i]["trade"]="退出登录";
									}*/
								}
							}
						}
						callback({
							data: list,
							recordsFiltered: elements //总数
						});
					});
				},

				"columns": getTableColumns(),
				"columnDefs": [
					{ "width": "5%", "targets": 0 },
					{ "width": "20%", "targets": 1 },
					{ "width": "28%", "targets": 2 },
					{ "width": "10%", "targets": 3 },
					{ "width": "15%", "targets": 4 },
					
				],
				/*"drawCallback": function() {
					$("#table tbody tr:first", $el).trigger("click");
				}*/
			});

			function getTableColumns() {
				return [{
					"data": "index",
					"defaultContent": "-"
				}, {
					"data": "trade",
					"defaultContent": "-"
				}, {
					"data": "operation",
					"defaultContent": "-"
				}, {
					"data": "username",
					"defaultContent": "-"
				}, {
					"data": "time",
					"defaultContent": "-"
				}];
			};
             	//查询按钮添加点击事件
			$('#searchBtn', $el).click(function() {
				queryTableData();
				table.draw();
			});
			
			function queryTableData() {
				var startDate_timeline=new Date($('#startdate', $el).val());
				var endDate_timeline=new Date($('#enddate', $el).val());      
				var username=$("#userSearchSelect").val();
				var RegExp_time = new RegExp("^((([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))\\s+([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$");

				var startDate = $.trim($('#startdate', $el).val().replace(/-/g, ""));
				var endDate = $.trim($('#enddate', $el).val().replace(/-/g, ""));
				if(RegExp_time.test($('#startdate', $el).val())==false || RegExp_time.test($('#enddate', $el).val())==false){
					app.alert("时间格式不对");
					return;
				};
				if(startDate_timeline.getTime()> endDate_timeline.getTime()){
					app.alert("选择的开始时间不能在结束时间之后");
					return;
				};
			    ajaxdata = {
					startTime: $('#startdate', $el).val(),
					endTime: $('#enddate', $el).val()
				}
               if(username){
                	ajaxdata["username"]=username;
               }
				
				
			};
			getuser() ;
			//获取用户名，设置下拉列表
			function getuser() {
				app.common.ajaxWithAfa({
					url: "UserAction_getAllUsers.do",
				}).done(function(data) {
					var data = data.users;
					$("#userSearchSelect", $el).html("");
					for(let i = 0; i < data.length; i++) {
							var userlist = data[i];
							var $node = $("<option>");
							$node.attr("value", userlist.username).text(userlist.username)
							$("#userSearchSelect", $el).append($node);
					}
					$("#userSearchSelect", $el).prepend($('<option value="" selected="selected">全部</option>'));
				})

			}
			
			// 表格点击事件
			$("#table tbody", $el).on("click", "tr", function(e) {
								e.stopPropagation();
			/*	if(!$(this).children("td").eq(0).hasClass("dataTables_empty")) {
					$(this).siblings().removeClass("selected");
					$(this).toggleClass("selected");
					if($(this).hasClass("selected")) {
						tableRow = table.row(this).data();
						//获取指标的信息
						getObjzhibaio_info(tableRow);
						$("#editBtn", $el).removeClass("disabled");
						$("#delBtn", $el).removeClass("disabled");
					} else {
						$('#ESBAppTriggerRule-righttable tbody', $el).empty();
						$("#editBtn", $el).addClass("disabled");
						$("#delBtn", $el).addClass("disabled");
					}
				}*/
			});
		},

		unload: function(handler) {
			console.log("unload");
		},

		pause: function($el, scope, handler) {
			console.log("pause");
		},

		resume: function($el, scope, handler) {
			console.log("resume");
		}
	};
});