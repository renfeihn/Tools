define(["jquery"],function(){
	
	return {
		
		load:function($el,scope,handler){
			//loading遮罩层
			$('#test', $el).loading('show');
			
			handler.setTimeout(function() {
				$('#test', $el).loading('hide');
			}, 6000);
			
			// datatable初始化
			var $dataTable = $("#dataTable", $el).dataTable({
				'bPaginate': true, //开关，是否显示分页器
				'pagingType': 'full_numbers',
				'bStateSave': false,
				'bSort': false,//排序
			});
			$dataTable.api().page.len(15).draw();// 设置表格分页长度
			$("#toPage",$el).on("keydown",function(e){
				var e = e || window.event;
				var keycode = e.keycode || e.which;
				var leaf = parseInt($(this).val());
				if(keycode === 13){
					$dataTable.api().page(leaf-1).draw("page");
				}
			})
			var data = new Array();
			for (var int = 0; int < 80; int++) {
				var arr = [ int+1, '内容内容内容', '内容内容内容内容', '内容内容内容内容', '内容内容内容内容内容内容'];
				data.push(arr);
			}
			$dataTable.fnAddData(data);			
			
			$("#showModal", $el).click(function(){
				$("#modal", $el).modal('show');
			});
			$("#ran", $el).range();
			$("#dr", $el).doubleRange(100, 21, 88, function (min, max){});
			
			this.delegateEvents({
				'click #normal' : function(){
					app.confirmDialog({//提示框组件
						sTitle:"常规提示模块",  //确认框标题         
		                sType:"normal",  //模块类型，有normal，success，search，warn，error,默认为normal常规
		                sContent:'这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息',  //确认框内容，非必填
		                sBtnConfirm: '确定',  //确认按钮显示内容
		                sBtnCancel: '取消',  //却笑按钮显示内容
		                fnConfirmHandler: function(){app.alert("确定" + arguments[0])},  //点击确认按钮触发的回调函数，参数以数组形式写在args那里
		                fnCancelHandler: function(){app.alert("取消" + arguments[0])},  //点击取消按钮触发回调函数，参数写在args那里
		                aArgs: ['提示框']                     //确认、取消触发函数的参数，以数组形式书写
					})
				},
				'click #success' : function(){
					app.confirmDialog({//提示框组件
						sTitle:"成功提示模块",  //确认框标题         
		                sType:"success",  //模块类型，有normal，success，search，warn，error,默认为normal常规
		                sContent:'这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息',  //确认框内容，非必填
		                sBtnConfirm: '确定',  //确认按钮显示内容
		                sBtnCancel: '取消',  //却笑按钮显示内容
		                fnConfirmHandler: function(){app.alert("确定" + arguments[0])},  //点击确认按钮触发的回调函数，参数以数组形式写在args那里
		                fnCancelHandler: function(){app.alert("取消" + arguments[0])},  //点击取消按钮触发回调函数，参数写在args那里
		                aArgs: ['提示框']                     //确认、取消触发函数的参数，以数组形式书写
					})
				},
				'click #search' : function(){
					app.confirmDialog({//提示框组件
						sTitle:"询问提示模块",  //确认框标题         
		                sType:"search",  //模块类型，有normal，success，search，warn，error,默认为normal常规
		                sContent:'这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息',  //确认框内容，非必填
		                sBtnConfirm: '确定',  //确认按钮显示内容
		                sBtnCancel: '取消',  //却笑按钮显示内容
		                fnConfirmHandler: function(){app.alert("确定" + arguments[0])},  //点击确认按钮触发的回调函数，参数以数组形式写在args那里
		                fnCancelHandler: function(){app.alert("取消" + arguments[0])},  //点击取消按钮触发回调函数，参数写在args那里
		                aArgs: ['提示框']                     //确认、取消触发函数的参数，以数组形式书写
					})
				},
				'click #Warn' : function(){
					app.confirmDialog({//提示框组件
						sTitle:"预警提示模块",  //确认框标题         
		                sType:"warn",  //模块类型，有normal，success，search，warn，error,默认为normal常规
		                sContent:'这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息',  //确认框内容，非必填
		                sBtnConfirm: '确定',  //确认按钮显示内容
		                sBtnCancel: '取消',  //却笑按钮显示内容
		                fnConfirmHandler: function(){app.alert("确定" + arguments[0])},  //点击确认按钮触发的回调函数，参数以数组形式写在args那里
		                fnCancelHandler: function(){app.alert("取消" + arguments[0])},  //点击取消按钮触发回调函数，参数写在args那里
		                aArgs: ['提示框']                     //确认、取消触发函数的参数，以数组形式书写
					})
				},
				'click #error' : function(){
					app.confirmDialog({//提示框组件
						sTitle:"错误提示模块",  //确认框标题         
		                sType:"error",  //模块类型，有normal，success，search，warn，error,默认为normal常规
		                sContent:'这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息这里是弹窗的提示信息',  //确认框内容，非必填
		                sBtnConfirm: '确定',  //确认按钮显示内容
		                sBtnCancel: '取消',  //却笑按钮显示内容
		                fnConfirmHandler: function(){app.alert("确定" + arguments[0])},  //点击确认按钮触发的回调函数，参数以数组形式写在args那里
		                fnCancelHandler: function(){app.alert("取消" + arguments[0])},  //点击取消按钮触发回调函数，参数写在args那里
		                aArgs: ['提示框']                     //确认、取消触发函数的参数，以数组形式书写
					})
				},
			});
			
			var zNodes = [
				{ 
					id : 1,
					name: '节点1', 
					pId : 0,
				},{
					id : 2,
					name: '节点2', 
					pId : 0
				},{
					id : 3,
					name: '节点1-1', 
					pId : 1
				},{
					id : 4,
					name: '节点1-2', 
					pId : 1
				},{
					id : 5,
					name: '节点2-1', 
					pId : 2
				},{
					id : 6,
					name: '节点2-2', 
					pId : 2
				}
				,{
					id : 7,
					name: '节点3', 
					pId : 0
				}
			];
			var zTree,settings = {
					view : {
						showLine : false,
					},
					data : {
						simpleData : {
							enable : true,
							idKey : "id",
							pIdKey : "pId",
						},
					},
				};
			/*var setting = {
				view: {
					showLine : false,
				}
			};*/
			
			ztreeObj = $.fn.zTree.init($("#ztreeDemo", $el), settings, zNodes);
			
			// treeTable
			$("#treeTable", $el).treetable({ expandable: true });
			
			var aaData = [{
				name:'网上支付跨行应用系统',
				desp: '描述',
		        path: 'root', 
		        type: '0',
			},{
				name:'应用系统2',
				desp: '描述',
		        path: 'root/a',
		        parentPath:'root',
	        	type: '1',
			},{
				name:'应用系统3',
				desp: '描述',
				path: 'root/b',
				parentPath:'root',
				type: '2',
			},{
				name:'应用系统4',
				desp: '描述',
				path: 'root/c',
				type: '3',
				parentPath:'root/b',
			}];
			
			
			
			// 拓扑图
			var devViewTree = app.deviceTree({
		        $context: $el,                                  //上下文
		        $container: $("#tree", $el),   //拓扑图容器
		        editable: 'cud',// 'cud',                       //是否可编辑   增删改 cud，改删'ud'，增删'cd'，不可编辑false,
		        data: aaData,                      //拓扑图数据
		                                                        
		        //details有两种写法，第一种为map形式的键值对，
		         details: {
		         name: '名称',
		         desp: '描述',
		         path: '路径'
		         },
		        //第二种形式，就是函数的形式，返回一个键值对的二维数组，用于不是直接生成的描述信息
		        details: function (node) {
		            //node是某个节点
		            var lines = [];//待返回的行。

		            lines.push(['名称', node.name]);
		            lines.push(['描述', node.desp]);
		            lines.push(['路径', node.path]);
		            lines.push(['类型', node.type]);

		            return lines;
		        },
		        selector: 'path',                           //自己的路径，子节点的父路径
		        parentSelector: 'parentPath',               //父路径
		        root: aaData[0].path,          //根路径，开始搜索的路径
		        rootDeletable:false,                        //根节点是否可以删除
		        pathDivider: '/',                           //路径的分割线
		        draggable: true,                            //是否可以拖拽
		        cloneable:true                              //是否可以克隆
		    });
			
			
			// 扇形图的js控制
			function setPie(value, left_circle, right_circle) {
				if(value <= 0.5){
					right_circle.style.transform = 'rotate('+ (value*360-45) +'deg)';
					left_circle.style.transform = 'rotate(-45deg)';
				} else {
					right_circle.style.transform = 'rotate(135deg)';
					left_circle.style.transform = 'rotate('+ ((value-0.5)*360-45) +'deg)';
				}
			}
			
			setPie(0.64, $("#left_circle", $el)[0], $("#right_circle", $el)[0]);
			
			app.commonEcharts({
				$el: $el,
				handler: handler,
				pagePath: "template",
				selectorObj: {
					div1: null,
					div2: null
				},
				urlParams: [
				    {
				    	time: 120,
				    	interval: 1,
				    	objectId: [75373],
				    	rotate: -30,
				    	barWidth: 20,
				    	formatData: true
				    },
				    {
				    	time: 120,
				    	interval: 1,
				    	objectId: [75373]
				    }
				]
			}).then(function(handler){
							
			});
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});