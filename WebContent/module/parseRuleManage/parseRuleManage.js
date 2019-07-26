define([ "jquery" ], function() {
	return {
		getLogByType: null,
		load : function($el, scope, handler) {

			var activeRowData = undefined;
			let allDatas = null;
			let allCates = {};

			var $logSourceTable = $('#logSourceTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index', title: '序号',
					"render": function(data, type, row, meta) {
						return (meta.row + 1);
		          	}
				},{
					data: 'objectid',title: '所属资源',defaultContent : '-',
					"render": function(data, type, row, meta) {
						return allCates[data] || '-';
		          	}
				},{
					data : 'logName', title: '规则名称', defaultContent : '-'
				},{
					data : 'lineFlag', title: '日志模式', defaultContent : '-',
					"render": function(data, type, row, meta) {
						return data == '0' ? '多行模式' : '单行模式';
		          	}
				},{
					data : 'groupStart', title: '分组开始字符串', defaultContent : '-'
				},{
					data : 'groupEnd', title: '分组结束字符串', defaultContent : '-'
				},{
					data : null, title: '操作',
					"render": function(data, type, row, meta) {
						return '<span class="text-button fa fa-edit" title="修改"></span>&nbsp;&nbsp;&nbsp;<span class="text-button fa fa-trash-o" title="删除"></span>';
		  			}
				}]
			});

			getCates().then(res => {
				getLogByType();
			});

			function getCates() {
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url:"EventListAction_getObjectCategory.do",
						data:{}
					}).done(function (data) {
						let html = '<option value="">全部</option>';
						data.objectCate.forEach(item => {
							allCates[item.categoryId] = item.levelOneName + '>' + item.levelOneName + '>' + item.levelThreeName;
							html += `<option value="${item.categoryId}">${item.levelThreeName}</option>`;
						});
						$('#soft_select',$el).html(html);
						resolve(data);
					})
				});
				
			}

			// 获取某个分类下的日志源信息
			
			let getLogByType = function() {
				// $('#tableBtnGroup button:last-child',$el).addClass('disabled');
				app.common.ajaxWithAfa({
					url:"LogCfgAction_getCfgLogInfoNewById.do",
					data:{
						// 'typeId': '110009'// TODO 后期没有参数
					}
				}).done(function (data) {
					$logSourceTable.clear();
					var result = data.result;
					allDatas = result;
					$logSourceTable.rows.add(result).draw();
					activeRowData = undefined;
				})
			}
			this.getLogByType = getLogByType;

			$('#soft_select',$el).on('change',function(){
				let id = $(this).val();
				if(!id){
					$logSourceTable.clear();
					$logSourceTable.rows.add(allDatas).draw();
					return;
				}
				let arr = JSON.parse(JSON.stringify(allDatas)).filter(item => item.objectid == id);
				$logSourceTable.clear();
				$logSourceTable.rows.add(arr).draw();
			});

			$('#addRuleBtn', $el).on('click', function(){
				var id = 'addParseRuleManager';
				app.dispatcher.load({//提前加载应用状态总览
					title: "解析规则新增",
					moduleId:"parseRuleManage",
					section:"addParseRuleManager",
					id:'addParseRuleManager',
					params: {
						data: {
							id
						}
					}
				});
			})

			$('#logSourceTable', $el).on('click', '.fa-edit', function(){
				var data = $logSourceTable.row($(this).closest('tr')).data();
				var id = 'addParseRuleManager'+data.logName;
				data = Object.assign({}, data, {id});
				app.dispatcher.load({//提前加载应用状态总览
					title: "解析规则编辑"+data.logName,
					moduleId:"parseRuleManage",
					section:"addParseRuleManager",
					id:id,
					params: {
						data
					}
				});
			}).on('click', '.fa-trash-o', function(){
				var tr = $logSourceTable.row($(this).closest('tr')).data();
				app.confirmDialog({
				  sTitle:"确认",       
				  sType:"search",
				  sContent:'确定删除该条日志源信息？',
				  sBtnConfirm: '确定',
				  sBtnCancel: '取消',
				  fnConfirmHandler: function(tr){
				  	app.common.ajaxWithAfa({
				  		url:'LogCfgAction_delCfgLogInfoNew.do',
					data:{
						logId:tr.logId
					}
				  }).done(function (data) {
					if(data.result && data.result != ""){
				  			app.alert(data.result);
				  			getLogByType();
				  		}
				  	})
				  },
				  aArgs: [tr]
				})
			});

		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
			this.getLogByType && this.getLogByType();
		}
	};
});