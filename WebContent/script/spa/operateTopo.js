/**
 * [拓扑图展示]
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author fanyongchao
 */
(function (undefined) {

	(function (factory) {
		"use strict";
		//amd module
		if(typeof define === "function" && define.amd) {
			define(["jquery", "vis"], factory);
		}
		//global
		else{
			factory();
		}

	})(function () {
		"use strict";
		
		var baseImg = './img/topoTmp/';		//这里的图片路径是针对于项目的相对路径，并不是该文件的相对路径
		
		let relDefId = null,
			relDefIdName = '',
			TargetDmDefId = [],
			relType = null,
			relTypeName = '',
			relOrder = null;
		
		function saveData(data,callback,param,network) {
			
		    data.id = $($("#topo_name").find("option:selected")).attr("data-id");
		    data.label = $($("#topo_name").find("option:selected")).text();
		    data.image = $($("#topo_name").find("option:selected")).attr("data-icon");
		    data.shape = 'image';
		    data.level = 2;
		    
		    TargetDmDefId = TargetDmDefId.splice(0,0);
		    relDefId = $($("#topo_relation_name").find("option:selected")).attr("data-id");
		    relDefIdName = $($("#topo_relation_name").find("option:selected")).text();
		    relType = $($("#topo_relation_rude").find("option:selected")).attr("data-id");
		    relTypeName = $($("#topo_relation_rude").find("option:selected")).text();
		    TargetDmDefId.push($($("#topo_name").find("option:selected")).attr("data-id"));
		    
		    $('#'+param.modal,param.content).modal('hide');
		    callback(data);
		    network.moveNode(data.id,nodeX+offset,nodeY);
		    network.addEdgeMode();
		}
		
		function deleteData(data,callback,param,network) {
		    $('#'+param.modal,param.content).modal('hide');
		    callback(data);
		    network.moveNode(data.id,nodeX+offset,nodeY);
		    network.deleteSelected();
		}
		
		var nodeX = 100,
			nodeY = 100,
			offset = 20;
		
		var operateTopo = function(param) {
			let direction = param.direction,
				fixed = {x: false,y: true},
				dmDefId = param.dmDefId,
				layout = {layout:{randomSeed:2}},
				topoData = param.data || {},
				operated = param.operated ? param.operated : false,		//是否可操作
				succFn = param.succFn || null,
				tanchuang = param.tanchuang || null,
				needDispather = param.needDispather || false;
			if(direction === 'LR'){
				fixed = {x: true,y: false};
				layout = {
					layout:{
				    	hierarchical:{
				    		direction: direction,
				    		levelSeparation:240,
				    		nodeSpacing:150,
				    	},  //LR 横向排列， UD 纵向排列
				    	randomSeed:2
					}
			    }
			}else if(direction === 'UD') {
				fixed = {x: false,y: true};
				layout = {
					layout:{
				    	hierarchical:{
				    		direction: direction
				    	},  //‘LR’ 横向排列， UD 纵向排列
				    	randomSeed:2
					}
			    }
			}else{
				offset = 200;
			}
			let	options = {
				autoResize: true,
				width: '100%',
				height: '100%',
		        interaction: {
					dragNodes: true,//是否能拖动节点
					dragView: true,//是否能拖动画布
					hideEdgesOnDrag: false,//拖动画布时是否隐藏连接线
					hideNodesOnDrag: false,//拖动画布时是否隐藏节点
					hover: true,//鼠标移过后加粗该节点和连接线
					keyboard:false,//
					multiselect:false, //按 ctrl 多选
					navigationButtons: true, //是否显示控制按钮
					selectable: true, //是否可以点击选择
					selectConnectedEdges: true,//选择节点后是否显示连接线
					hoverConnectedEdges: false,//鼠标滑动节点后是否显示连接线
					tooltipDelay: 200,
					zoomView:true//是否能缩放画布
			    },
			    edges: {
			    	arrows: {to : {enabled: true, scaleFactor:1.2, type:'arrow'} },//箭头指向to节点
			    	arrowStrikethrough: false,
			    	shadow:false,//连接线阴影配置
			    	smooth: {		//节点连线头部 弯曲度
                        type: 'cubicBezier',
                        forceDirection: (direction == "UD" || direction == "DU") ? 'vertical' : 'horizontal',
                        roundness: 0
                    },
                    selfReferenceSize:50,
//                    font:{
//                    	align:'middle'
//                    }
			    },
			    nodes:{		//节点在y轴上不进行扩展，只在x轴上进行扩展
//			    	fixed:fixed,			//节点只能上下或者左右移动,所以 这里注释掉
//			    	font: {
//				    	multi: true,
//				    	color: '#000',
//				    },
				    size: 45,
				    borderWidth: -20,//节点边框的宽度,单位为px
			         borderWidthSelected: 0,//节点被选中时边框的宽度，单位为px
			         color: {
			              border: '#646CB3',//节点边框颜色
			              background: '#646CB3',//节点背景颜色
			              highlight: {//节点选中时状态颜色
			                border: '#646CB3',
			                background: '#646CB3'
			              },
			              hover: {//节点鼠标滑过时状态颜色
			                border: 'red',
			                background: 'blue'
			              }
			            },
		            font: {//字体配置
		                  color: '#343434',//颜色
		                  size: 14, // 大小，单位px
		                  face: 'arial',//字体
		                  background: 'none',//背景
		                  align: 'left',//位置left right center
		                  vadjust:-20,
		              },
			    },
			    physics: false,
			},
			manipulation = {
				addNode: function (data, callback) {
					modalAdd(this,data,callback);
				},
				addEdge: function (data, callback) {
					if (data.from == data.to) {
					  return;
					}
					else {
					  data = topoEdgeAdd(data);
					  callback(data);
					}
				},
				editNode: function (data, callback) {
					return;
				},
				editEdge: function (data, callback) {
					return;
				},
				deleteNode: function (data, callback) {
					if(data.nodes.length == 0 || data.edges.length > 1){
						app.alert('只能删除节点且该节点不能有多层关系');
						return;
					}
					modalDel(this,data,callback);
				},
				deleteEdge: function (data, callback) {
					if(data.nodes.length == 0 || data.edges.length > 1){
						app.alert('只能删除节点且该节点不能有多层关系');
						return;
					}
				},
	        },
			network = null,
			content = param.content,
			nodes = [],
			edges = [],
			container = document.getElementById(param.container);
			//方法 
			function destroy(){
				if (network !== null) {
					network.destroy();
					network = null;
				}
			}
			
			function setData(obj){
				if (network !== null) {
					network.setData(obj);
				}
			}
			
			//modal弹窗
			function modalAdd($this,data,callback){
				$('#'+param.modal,content).modal('show');
				document.getElementById("topo_id").innerHTML = data.id;
				document.getElementById("relation_topo_add_modal").onclick = null;
				document.getElementById("relation_topo_add_modal").onclick = saveData.bind($this,data,callback,param,network);
			}
			
			function modalDel($this,data,callback){
				$('#'+param.delModal,content).attr('data-info',data.edges[0]);
				$('#'+param.delModal,content).modal('show');
				document.getElementById("topo_id").innerHTML = data.id;
				document.getElementById("relation_topo_Del_modal").onclick = null;
				document.getElementById("relation_topo_Del_modal").onclick = deleteData.bind($this,data,callback,param,network);
			}
			
			
			function draw(){
				destroy();
				if(!operated){
					network = new app.vis.Network(container, topoData, $.extend({},options,layout,{'manipulation':manipulation}));
					network.on('doubleClick',function(params){
						if(params.nodes.length === 0){
				        	return;
				        }
						nodeX = parseInt(params.pointer.canvas.x);
						nodeY = parseInt(params.pointer.canvas.y);
						network.addNodeMode();
					});
					network.on('click',function(params){
						if(params.nodes.length === 0){
				        	return;
				        }
						console.log(params);
					});
				
				}else{
					network = new app.vis.Network(container, topoData, $.extend({},options,layout));
					
				}
				
				if(needDispather){
					network = new app.vis.Network(container, topoData, $.extend({},options,layout));
					network.on('click',function(params){
						if(params.nodes.length === 0){
							if($('body').find('.tanchuang-div').length > 0){
								$('body').find('.tanchuang-div').remove();
							}
				        	return;
				        }
						if(tanchuang){
							tanchuang(params);
						}else{
							if(params.nodes[0] == '1'){return;}
							app.dispatcher.load({
								title: "对象明细",
								moduleId:"objDetail",
								section:"",
								params: {
									node:params.nodes[0]
								}
							});
						}
						
					});
				}
				
				
				
				
			}
			
			function topoEdgeAdd(data){
				if(parseInt(data.from) === parseInt(dmDefId)){
					relOrder = 0;
				}else{
					relOrder = 1;
				}
				data.label = relDefIdName +" "+relTypeName;
				data.length = 30;
				addEdgeNode(dmDefId,relDefId,TargetDmDefId,relType,relOrder);
				return data;
			}
			
			function addEdgeNode(dmDefId,relDefId,TargetDmDefId,relType,relOrder){
				app.common.ajaxWithCmdb({
					data:{
						'servicename':'cn.com.agree.aim.cmdb.page.service.mxgl._cmdb_dm_rel_manager',
						'method':'dm_rel_add',
						'requestData':JSON.stringify({
							'dmDefId':dmDefId,
							'relDefId':relDefId,
							'TargetDmDefId':TargetDmDefId,
							'relType':relType,
							'relOrder':relOrder
						})
					}
				}).then(function(data){
					if(data.ret){
						app.alert("保存成功");
						succFn && succFn(true);
					}
				})
			}
			
			function init(){
				draw();
			}
			
			return {
				init: init,
				destroy: destroy,
				setData: setData
			}
		}
		return {
			operateTopo: operateTopo
		};
	});

})();