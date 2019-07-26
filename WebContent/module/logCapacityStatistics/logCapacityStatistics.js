define([ "jquery","echarts4" ], function($, echarts) {
	return {
		load : function($el, scope, handler) {
			$el.css({
				'height': '100%',
				'background-color': '#ebf0f5',
			})
			var echartsObj = echarts.init($('#echarts', $el)[0]);
			var url_today = "ESSearchAction_statisTodayLogSize.do";
			var url_all = "ESSearchAction_statisAllLogSize.do";
			var setting = {
				view: {
					showLine : false,
				},
				callback : {
					onClick : zTreeOnClick,
					beforeExpand: closeOther
				},
				data: {
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "pId",
						rootPId: 0
					}
				}
			};
			var treeObj = null;
			//查询最近的登录时间
			getPreLoginTime();
			function getPreLoginTime() {
				var user = JSON.parse(sessionStorage.getItem('user'));
				var username = user.nickname + " - "+ user.username;
				$('#name',$el).text(username||'-');
				app.common.ajaxWithAfa({
					url:'LoginAction_loadNowUser.do'
				}).done(function (data) {
					if(data.userVO && !$.isEmptyObject(data.userVO)){
						$('#lastLoginTime', $el).text(data.userVO.loginTime||'-');
					}
				})
			}
			// type : 查询的范围
			function searchLogSize(type) {
				app.shelter.show();
				app.common.ajaxWithAfa({
					url: (type == 'today'?url_today:url_all),
				}).done(function(data){
					app.shelter.hide();
					if(!$.isEmptyObject(data.result)){
						var treeArr = [];
						treeArr.push({
							"id": 1,
							"pId": 0,
							"name": "应用群组",
						});
						var total = 0;
						data.result.forEach((item, index) => {
							treeArr.push({
								"id": 10+ index,
								"pId": 1,
								"name": item.name,
								"value": item.dataSize,
								"childs": JSON.stringify(item.childs)
							});
							total += item.dataSize;
						})
						$('#logName', $el).text("日志总量");
						$('#logDataToTalSize', $el).text(transforNumber(total).split(' ')[0]);
						$('#logDataToTalSize', $el).next().text(transforNumber(total).split(' ')[1]);
						if(treeObj){
							treeObj.destroy();
						}
						treeObj = $.fn.zTree.init($('#tree', $el), setting, treeArr);
						treeObj.expandAll(true);
						setTimeout(() => {
						  $('#tree_1_a', $el).trigger('click');
						}, 500);
					}
				});
			}
			
			//左侧配置总览点击事件
			function zTreeOnClick(event,treeId,treeNode,clickFlag){
				$('.logCapa-body-top tbody', $el).empty();
				var dataAxis = [];
				var data = [];
				if(treeNode.isParent){
					treeNode.children.forEach((item) => {
						dataAxis.push(item.name);
						data.push((item.value/1024/1024).toFixed(2))
						$('.logCapa-body-top tbody', $el).append(`<tr><td>${item.name}</td><td>${transforNumber(item.value)}</td></tr>`)
					})
				}else{
					JSON.parse(treeNode.childs).forEach((item) => {
						dataAxis.push(item.name);
						data.push((item.dataSize/1024/1024).toFixed(2))
						$('.logCapa-body-top tbody', $el).append(`<tr><td>${item.name}</td><td>${transforNumber(item.dataSize)}</td></tr>`)
					}) 
				}

				var option = {
					grid: {
						left: 30,
						bottom: 30,
						right: 40,
						top: 30,
						containLabel: true
					},
					tooltip: {
						show: true,
						trigger: 'axis'
					},
				    xAxis: {
				        data: dataAxis,
				        axisLabel: {
				        	interval: '0',	
				            textStyle: {
				            }
				        },
				        axisTick: {
				            show: false
				        },
				        axisLine: {
				            show: false
				        },
				        z: 10
				    },
				    yAxis: {
				    	name: '单位：GB',
				        axisLine: {
				            show: false
				        },
				        axisTick: {
				            show: false
				        },
				        axisLabel: {
				            textStyle: {
				                color: '#999'
				            }
				        }
				    },
				    series: [
				        {
				            type: 'bar',
				            itemStyle: {
				                normal: {
				                    color: '#55a8fd',
				                },
				            },
				            barWidth: 80,
				            data: data
				        }
				    ]
				};

				echartsObj.setOption(option);
			}

			function closeOther(id,node){
 				 //是不是根节点
 				 if(!node.parentTId){
 					 treeObj.expandAll(false);
 					 return
 				 }
 				 //叶子节点
 				 var parentNode = treeObj.getNodeByTId(node.parentTId);
 				 var findNode = treeObj.getNodesByFilter(filter,false,parentNode);
 				 for(var i=0;i<findNode.length;i++){
 					 if(findNode[i].level == node.level){
 						 treeObj.expandNode(findNode[i],false)
 					 }
 				 }
            	 function filter(n){
 					 return n.open == true
 				 }
            }

            // 切换范围事件
            $('input[name="LogSize"]', $el).on('change', function(){
            		searchLogSize($('input[name="LogSize"]:checked', $el).attr('id'));
            })

            searchLogSize("today");

            function transforNumber(number) {
            	var GB = 1024*1024*1024;
            	var MB = 1024*1024;
            	var KB = 1024;
            	if(number > GB) {
            		return (number/GB).toFixed(2) + ' TB';
            	}else if(number > MB) {
            		return (number/MB).toFixed(2) + ' GB';
            	}else if(number > KB) {
            		return (number/KB).toFixed(2) + ' MB';
            	}else{
            		return number + 'KB';
            	}
            }
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});