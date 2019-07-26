define(["jquery", "module/logSourceConfig/AFEMessageHandler/AFEMessageHandler", "module/logSourceConfig/AFEnodeConfiger/AFEnodeConfiger", "codemirror/lib/codemirror", "codemirror/mode/python/python", "codemirror/mode/groovy/groovy"], function($, AFEMessageHandler, AFEnodeConfiger, CodeMirror){
	var afeDetail;
	var pythonDetail;
	var groovyDetail;
	
	var afeConfig;
	var pythonConfig;
	var groovyConfig;
  return {

    load: function($el, scope, handler) {    	
    	var messageType;
    	
    	$('#category3', $el).text(scope.category3);
    	$('#objectName', $el).text(scope.objectName);
    	
    	var objectId = scope.objectId;
    	var logId = scope.logId;
    	var applicationId= scope.categoryId;
    	
//    	var afeTmp;
//    	var pythonTmp;
//    	var groovyTmp;    	
    	
    	var publicList = [];
    	var privateList = [];    	
    	
//    	var tmpList = [{
//    		filefield: 'filename1',
//    		filedesc: '私有字段',
//    		splitType: '1'
//    	},{
//    		filefield: 'filename2',
//    		filedesc: '公有字段',
//    		splitType: '2'
//    	},{
//    		filefield: 'filename3',
//    		filedesc: '私有字段',
//    		splitType: '3'
//    	}];
//    	
//    	app.common.ajaxWithAfa({
//    		url: 'LogSourceAction_getSplitElements.do',
//    		data: {
//    			elename: '字段',
//    			splittype: '3'
//    		}
//    	}).then(function(data) {
//    		console.log(data);
//    	});
//    	
//    	$('#selectTmp', $el).modal('show');
//    	
//    	showTmpList(tmpList);
//    	
//    	function showTmpList(data) {
//    		var li = '';
//    		data.forEach(function(item, i) {
//    			var splitType = '';
//    			switch(item.splitType) {
//    				case '1': 
//    					splitType = 'a';
//    					break;
//    				case '2':
//    					splitType = 'p';
//    					break;
//    				case '3':
//    					splitType = 'g';
//    			}
//    			li += '<li><span>'+ item.filefield +'</span><span>'+ (item.filedesc ? item.filedesc : '') +'</span><span>'+ splitType +'</span></li>'
//    		});
//    		
//    		$('#tmpFieldCtn ul', $el).html(li);
//    		handler.setTimeout(function(){
//    			$('#tmpFieldCtn ul li:nth-child(1)', $el).click();
//    		}, 300);  			
//    	}
    	
    	//模板字段事件
    	$('#tmpFieldCtn', $el).on('click', 'li', function(e) {
    		if($(this).hasClass('active')) return;
    		$(this).siblings('li').removeClass('active');
    		$(this).addClass('active');
    		var data = tmpList[$(this).index()];
    		showTmpInfo(data);
    	});
    	
    	function showTmpInfo(data) {
    		switch(data.splitType) {
				case '1': 
					$('#pythonTmpCtn', $el).hide();
					$('#groovyTmpCtn', $el).hide();
					$('#afeTmpCtn', $el).show();
					if(!afeTmp) {
						afeTmp = new AFEnodeConfiger({$el: $('#afeTmpCtn', $el)});
					}					
					break;
				case '2':
					$('#pythonTmpCtn', $el).show();
					$('#groovyTmpCtn', $el).hide();
					$('#afeTmpCtn', $el).hide();

					if(!pythonTmp) {
						pythonTmp = CodeMirror.fromTextArea($('#pythonTmpCtn textarea', $el)[0], {
							mode:  "python",
							lineNumbers: true,
							readOnly: true,
							content: 'python'
						});
					}
					break;
				case '3':
					$('#pythonTmpCtn', $el).hide();
					$('#groovyTmpCtn', $el).show();
					$('#afeTmpCtn', $el).hide();
					if(!groovyTmp) {
						groovyTmp = CodeMirror.fromTextArea($('#groovyTmpCtn textarea', $el)[0], {
							mode:  "groovy",
							lineNumbers: true,
							readOnly: true,
							content: 'groovy'
						});
					}
			}
	    }
    	
    	$('#fieldNav', $el).on('click', 'li', function(e) {
    		if($(this).hasClass('active')) return;
    		$(this).addClass('active');
    		$(this).siblings('li').removeClass('active');
    		var index = $(this).index();
    		if(index == 0) {
    			$('#privateFieldCtn', $el).hide();
    			$('#publicFieldCtn', $el).show();
    		} else {
    			$('#publicFieldCtn', $el).hide();
    			$('#privateFieldCtn', $el).show();    			
    		}
    	});
    	
    	getPageData();
		
    	function getPageData() {
    		publicList = [];
			privateList = [];
    		$('#detailCtn', $el).hide();
	    	$('#configCtn', $el).hide();
    		app.common.ajaxWithAfa({
    			url: 'LogSourceAction_getSplits.do',
    			data: {
    				applicationId:applicationId,
    				objectId: objectId,
    				logId: logId
    			}
    		}).then(function(data) {
    			data = data.result;
    			if(data && data.length) {
    				var typeName = data[0].splitVO.funcdesc;
    				$('#tab', $el).text(typeName);
    				
    				for(var i = 0; i < data.length; i++) {
    					data[i].dictVOList.forEach(function(item) {
    						if(item.systype == "1") {
    							if(data[i].splitVO.scripttype == '1') {
    								var field = JSON.parse(item.scriptcontext);
	    							var message = JSON.parse(data[i].splitVO.scriptcontext).treeRoot;
	    							messageType = message.DefaultValue;
	    							item.scriptcontext = {field: field, message: message};
    							}
    							item['logregex'] = data[i].splitVO.logregex;    							
    							publicList.push(item);
    						} else {
    							if(data[i].splitVO.scripttype == '1') {
									var field = JSON.parse(item.scriptcontext);
	    							var message = JSON.parse(data[i].splitVO.scriptcontext).treeRoot;
	    							messageType = message.DefaultValue;
	    							item.scriptcontext = {field: field, message: message};
								}
								item['logregex'] = data[i].splitVO.logregex;
    							privateList.push(item);
    						}
    					});    					
    					
    					switch(data[i].splitVO.scripttype) {
    						case '1':
    							$('#afeCount', $el).text(data[i].dictVOList.length);
    							break;
    						case '2':
    							$('#pythonCount', $el).text(data[i].dictVOList.length);
    							break;
    						case '3':    							
    							$('#groovyCount', $el).text(data[i].dictVOList.length);
    					}
    				}
    				
    				showFieldListData(publicList, privateList);
    			}
    		});
    	}
    	
    	function showFieldListData(publicList, privateList) {
    		var publicLi = '';
    		var privateLi = '';
    		privateList.forEach(function(item, i) {
    			var splitType = getSplitType(item.splitType);
    			privateLi += '<li data-type="private"><span>'+ item.filetype.charAt(0).toUpperCase() +'</span><span>'+ item.filefield +'</span><span>'+ (item.filedesc ? item.filedesc : '') +'</span><span>'+ splitType +'</span></li>';
    		});
    		
    		publicList.forEach(function(item, i) {
    			var splitType = getSplitType(item.splitType);
    			publicLi += '<li data-type="public"><span>'+ item.filetype.charAt(0).toUpperCase() +'</span><span>'+ item.filefield +'</span><span>'+ (item.filedesc ? item.filedesc : '') +'</span><span>'+ splitType +'</span></li>';
    		});
    		
    		$('#privateFieldCtn ul', $el).html(privateLi);
    		$('#publicFieldCtn ul', $el).html(publicLi);
    	}
    	
    	function getSplitType(data) {
    		switch(data) {
				case '1': 
					return 'a';
				case '2':
					return 'p';
				case '3':
					return 'g';
			}
    		return '';
    	}
    	
    	$('#privateFieldCtn ul, #publicFieldCtn ul', $el).on('click', 'li', function(e) {
    		if($(this).hasClass('active')) return;
    		$('.logFieldsConfig-btn-ctn p', $el).removeClass('active');
    		$('.input-box', $el).prop('disabled', true);

    		$('#saveBtn', $el).addClass('disabled');
	    	$('#returnBtn', $el).addClass('disabled');
    		afeConfig && afeConfig.setDisabled(true);
    		pythonConfig && pythonConfig.setOption('readOnly', true);
	    	groovyConfig && groovyConfig.setOption('readOnly', true);
	    	
	    	$('#privateFieldCtn ul, #publicFieldCtn ul', $el).find('li.active').removeClass('active');
    		$(this).addClass('active');
    		
    		var type = $(this).data('type');
    		var data;
    		if(type == 'public') {
    			data = publicList[$(this).index()];
    			$('#delBtn', $el).addClass('disabled').data('type', 'public');
    		} else {
    			data = privateList[$(this).index()];
    			$('#delBtn', $el).removeClass('disabled');
    		}

    		afeConfig && afeConfig.addData();
    		pythonConfig && pythonConfig.setValue('');
	    	groovyConfig && groovyConfig.setValue('');
			
			showConfigData(data);
    	});
	    
	    //删除字段
	    $('#fieldTable tbody', $el).on('click', 'button.remove-btn', function(e) {
	    	e.stopPropagation();
	    	var $tr = $(this).parents('tr');	    	
	    	app.confirmDialog({
				sTitle:"确认",     
                sType:"normal", 
                sContent:'确定要删除该字段？', 
                sBtnConfirm: '确定', 
                sBtnCancel: '取消', 
                fnConfirmHandler: function(){
                	if($tr.hasClass('selected')) {
                		$('#configCtn', $el).hide();
                	}
                	$fieldTable.row($tr).remove().draw();	                	
                }
			});		    	
	    });

	    function showConfigData(data) {
	    	$('#detailCtn', $el).hide();
	    	$('#configCtn', $el).show();
	    	
	    	$('#fieldName', $el).val(data.filefield);
	    	$('#fieldDescript', $el).val(data.filedesc);
	    	$('#fieldType', $el).val(data.filetype);
	    	$('#logregex',$el).val(data.logregex);
	    	
	    	
	    	switch(data.splitType) {
				case '1': 
					showAfeConfig(data.scriptcontext);
	    			break;
				case '2':
					showPythonConfig(data.scriptcontext);	    		
					break;;
				case '3':
					showGroovyConfig(data.scriptcontext);
	    	}
	    }

	    /*$('.log-form',$el).on('input', '.text-box', function(event) {
	    	var ways = $('input[name="classType"]:checked').attr('data-way'); 
	    	if(ways == undefined){
	    		return;
	    	}

	    	if(ways == 1) {//python脚本
	    		pythonConfig && pythonConfig.setValue('');
				showPythonConfig(pythonConfig && pythonConfig.getValue(), true);
			} else if(ways == 2) {//groovy脚本
				showGroovyConfig(groovyConfig && groovyConfig.getValue(), true);
			}
	    });*/

	    $('.type-devide [type="radio"]', $el).change(function(e){
	    	var $target = $(e.target);
	    	if ($('#fieldName', $el).val() == '') {
	    		app.alert('请填写字段名称');
	    		$target.attr('checked',false);
	    		return;
	    	}

	    	if($('#logregex', $el).val().trim() == ''){
	    		app.alert('请填写匹配规则');
	    		$target.attr('checked',false);
	    		return;
	    	}
			
			var ways = $target.data('way');
			if(ways == 0) {//可视化配置
				showAfeConfig(afeConfig && afeConfig.getConfig(), true);
			} else if(ways == 1) {//python脚本
				showPythonConfig(pythonConfig && pythonConfig.getValue(), true);
			} else if(ways == 2) {//groovy脚本
				showGroovyConfig(groovyConfig && groovyConfig.getValue(), true);
			}
	    });
	    
	    function showAfeConfig(value, flag) {
	    	$('.type-devide [type="radio"]', $el).attr('checked', false);
			$('#afeRadio', $el).attr('checked', true);
			$('#pythonConfigCtn', $el).hide();
			$('#groovyConfigCtn', $el).hide();
			$('#afeConfigCtn', $el).show();
			if(!afeConfig) {
				if(value) {
					afeConfig = new AFEnodeConfiger({$el: $('#afeConfigCtn', $el), config: value});
				} else {
					afeConfig = new AFEnodeConfiger({$el: $('#afeConfigCtn', $el)});
				}				
			}
			
			if(value) {
				afeConfig.addData(value);
				afeConfig.setDisabled(true);
			} else {
				afeConfig.addData();
			}
			
			if(flag) {
				afeConfig.setDisabled(false);
			}
	    }
	    
	    function showPythonConfig(value, flag)	{
	    	$('.type-devide [type="radio"]', $el).attr('checked', false);
			$('#pythonRadio', $el).attr('checked', true);
			$('#afeConfigCtn', $el).hide();
			$('#groovyConfigCtn', $el).hide();
			$('#pythonConfigCtn', $el).show();
			if(!pythonConfig) {
				pythonConfig = CodeMirror.fromTextArea($('#pythonConfigCtn textarea', $el)[0], {
					mode:  "python",
					lineNumbers: true,
					readOnly: true
				});				
			}
			
			if(flag) {
				pythonConfig.setOption('readOnly', false);
			}
			
			if(value) {
				pythonConfig.setValue(value);
			} else {
				var valueStr = '';
				var tmpData = {};
				tmpData['filefield'] = $('#fieldName', $el).val().trim();
	    		tmpData['filedesc'] = $('#fieldDescript', $el).val().trim();
	    		tmpData['filetype']= $('#fieldType', $el).val().trim();
	    		if (tmpData.filefield) {
	    			valueStr += 'def '+tmpData.filefield+'(logfile, logData):\n\n	"""\n';
	    		}
	    		valueStr += '	@doc 拆分'+(tmpData.filedesc||'')+'，如果无'+(tmpData.filedesc||'')+'返回 None\n\
	@param logfile 字符串 日志文件名称，如: /home/agree/log/all.log\n\
	@param logData 字符串 日志内容, 如: 2017-01-01 01:01:01.111 00845685 test\n';

	    		if(tmpData.filetype){
	    			valueStr += '	@return '+tmpData.filetype+' '+tmpData.filedesc+'\n	"""\n\n';
	    		}

	    		valueStr += '	return None';
 
				pythonConfig.setValue(valueStr);
			}			
	    }
	    
	    function showGroovyConfig(value, flag) {
	    	$('.type-devide [type="radio"]', $el).attr('checked', false);
			$('#groovyRadio', $el).attr('checked', true);
			$('#afeConfigCtn', $el).hide();
			$('#pythonConfigCtn', $el).hide();
			$('#groovyConfigCtn', $el).show();
			if(!groovyConfig) {
				groovyConfig = CodeMirror.fromTextArea($('#groovyConfigCtn textarea', $el)[0], {
					mode:  "groovy",
					lineNumbers: true,
					readOnly: true
				});				
			}
			
			if(flag) {
				groovyConfig.setOption('readOnly', false);
			}
			
			if(value) {
				groovyConfig.setValue(value);
			} else {
				var tmpData = {};
				tmpData['filefield'] = $('#fieldName', $el).val().trim();
	    		tmpData['filedesc'] = $('#fieldDescript', $el).val().trim();
	    		tmpData['filetype']= $('#fieldType', $el).val().trim();

				var valueStr = 'import java.util.Map;\n\n\
import cn.com.agree.log.asda.parser.line.LineParser;\n\
import cn.com.agree.log.asda.parser.logevent.LogEventParser;\n\
import cn.com.agree.log.asda.parser.ParserUtils;\n\n\
public class 应用程序 implements LogEventParser, LineParser {\n\n\n';
				if(tmpData.filefield){
					valueStr += '	/**\n';
					if(tmpData.filedesc){
						valueStr +=' 	 * '+tmpData.filedesc+'\n 	 * \n';
					}
	 				valueStr += '	 * @param logfile 日志文件名称, 如: /home/agree/log/all.log\n\
	 * @param logData 日志内容, 如: 2017-01-01 01:01:01.111 00845685 test\n\
	 * @return '+(tmpData.filedesc||'')+'\n\
	 * @throws Exception\n\
	 */\n\
	public '+tmpData.filetype+' '+tmpData.filefield+'(String logfile, String logData) throws Exception {\n\
		return null;\n\
	}\n';
				}
				valueStr +='}';
				groovyConfig.setValue(valueStr);
			}			
	    }
	    
	    $('#editBtn', $el).click(function(e) {
	    	$('.input-box', $el).prop('disabled', false);
	    	if($('#delBtn', $el).hasClass('disabled') && $('#delBtn', $el).data('type') == 'public') {//公有字段
	    		$('.text-box', $el).prop('disabled', true);
	    	}	    	
	    	$('#saveBtn', $el).removeClass('disabled');
	    	$('#returnBtn', $el).removeClass('disabled');

	    	afeConfig && afeConfig.setDisabled(false);
	    	pythonConfig && pythonConfig.setOption('readOnly', false);
	    	groovyConfig && groovyConfig.setOption('readOnly', false);
	    });
	    
	    $('#delBtn', $el).click(function(e) {
	    	if($(this).hasClass('disabled')) return;
	    	
	    	var $li = $('#privateFieldCtn ul, #publicFieldCtn ul', $el).find('li.active');
	    	
    		var type = $li.data('type');
    		switch(type) {
    			case 'public':
    				publicList.splice($li.index(), 1);
    			case 'private':
    				privateList.splice($li.index(), 1);	   
    		}

    		savePageData($li, $(this));
	    });
	    
	    $('#returnBtn', $el).click(function(e) {
	    	var $li = $('#privateFieldCtn ul, #publicFieldCtn ul', $el).find('li.active');
	    	var data;
	    	if($li.length == 1) {//修改的重置
	    		var type = $li.data('type');
	    		if(type == 'public') {
	    			data = publicList[$li.index()];
	    		} else {
	    			data = privateList[$li.index()];
	    		}
	    		
	    		afeConfig && afeConfig.addData();
	    		pythonConfig && pythonConfig.setValue('');
		    	groovyConfig && groovyConfig.setValue('');
		    	
	    		showConfigData(data);
	    	} else {//新增的重置
	    		$('#fieldName', $el).val('');
		    	$('#fieldDescript', $el).val('');
		    	$('#fieldType', $el).val('string');
		    	$('#logregex',$el).val('');
		    	$('.type-devide [type="radio"]', $el).prop('checked', false);
		    	$('#afeConfigCtn', $el).hide();
				$('#pythonConfigCtn', $el).hide();
				$('#groovyConfigCtn', $el).hide();
		    	
		    	pythonConfig && pythonConfig.setValue('');
		    	groovyConfig && groovyConfig.setValue('');
	    	}
	    });
	    
	    //新增字段按钮
	    $('#addBtn', $el).click(function(e) {
	    	$('#saveBtn', $el).removeClass('disabled');
	    	$('#returnBtn', $el).removeClass('disabled');
	    	pythonConfig && pythonConfig.setValue('');
	    	groovyConfig && groovyConfig.setValue('');
	    	showConfigData({});
	    	$('.logFieldsConfig-btn-ctn p', $el).removeClass('active');
	    	$('#delBtn', $el).addClass('disabled').data('type', 'add');
	    	$('.input-box', $el).prop('disabled', false);
	    	
	    	if(messageType) {
				afeConfig = new AFEnodeConfiger({$el: $('#afeConfigCtn', $el), config: {message: {DefaultValue: messageType}}});
	    	}
	    	
	    	pythonConfig && pythonConfig.setOption('readOnly', false);
	    	groovyConfig && groovyConfig.setOption('readOnly', false);
	    	
	    	$('#privateFieldCtn ul, #publicFieldCtn ul', $el).find('li.active').removeClass('active');	    	
	    	$('.type-devide [type="radio"]', $el).attr('checked', false);
			$('#pythonConfigCtn', $el).hide();
			$('#groovyConfigCtn', $el).hide();
			$('#afeConfigCtn', $el).hide();
	    });
	    
	    $('#afeDetailBtn', $el).click(function(e) {
	    	if($(this).hasClass('active')) return;
	    	changeStyle($(this));
	    	
	    	$('#pythonDetailCtn', $el).hide();
			$('#groovyDetailCtn', $el).hide();
			$('#afeDetailCtn', $el).show();
			
			var config = getAfeConfigData();
			if(!config.message) return;	

			if(!afeDetail) {
				afeDetail = new AFEMessageHandler({$el: $('#afeDetailCtn', $el), config: config});
			} else {
				afeDetail.setTree(config);
			}
	    });
	    
	    function getAfeConfigData() {
	    	var data = {fields: []};
	    	publicList.forEach(function(item, i) {
	    		if(item.splitType == '1') {
	    			data.fields.push(item.scriptcontext.field);
	    			data.message = item.scriptcontext.message;
	    		}
	    	});
	    	privateList.forEach(function(item, i) {
	    		if(item.splitType == '1') {
	    			data.fields.push(item.scriptcontext.field);
	    			data.message = item.scriptcontext.message;
	    		}
	    	});
	    	
	    	return data;
	    }
	    
	    $('#pythonDetailBtn', $el).click(function(e) {
	    	if($(this).hasClass('active')) return;
	    	changeStyle($(this));
	    	
	    	$('#afeDetailCtn', $el).hide();
			$('#groovyDetailCtn', $el).hide();
			$('#pythonDetailCtn', $el).show();
			if(!pythonDetail) {
				pythonDetail = CodeMirror.fromTextArea($('#pythonDetailCtn textarea', $el)[0], {
					mode:  "python",
					lineNumbers: true,
					readOnly: true
				});				
			}
			
			var value = getPythonDetailContent();
			
			if(value) {
				pythonDetail.setValue("# -*- coding:utf-8 -*-\n\n"+value);
			} else {
				pythonDetail.setValue('');
			}
	    });
	    
	    function getPythonDetailContent() {
	    	var value;
	    	publicList.forEach(function(item, i) {
	    		if(item.splitType == '2') {
	    			if(value) {
	    				value += '\n\n' + item.scriptcontext;
	    			} else {
	    				value = item.scriptcontext;
	    			}
	    		}
	    	});
	    	privateList.forEach(function(item, i) {
	    		if(item.splitType == '2') {
	    			if(value) {
	    				value += '\n\n' + item.scriptcontext;
	    			} else {
	    				value = item.scriptcontext;
	    			}
	    		}
	    	});
	    	
	    	return value;
	    }
	    
	    $('#groovyDetailBtn', $el).click(function(e) {
	    	if($(this).hasClass('active')) return;
	    	changeStyle($(this));
	    	
	    	$('#afeDetailCtn', $el).hide();
			$('#pythonDetailCtn', $el).hide();
			$('#groovyDetailCtn', $el).show();
			if(!groovyDetail) {
				groovyDetail = CodeMirror.fromTextArea($('#groovyDetailCtn textarea', $el)[0], {
					mode:  "groovy",
					lineNumbers: true,
					readOnly: true
				});
			}
			
			var value = getGroovyDetailContent();
			
			if(value) {
				groovyDetail.setValue(value);
			} else {
				groovyDetail.setValue('');
			}
	    });
	    
	    function getGroovyDetailContent() {
	    	var value;
	    	publicList.forEach(function(item, i) {
	    		if(item.splitType == '3') {
	    			if(value) {
	    				value += '\n\n' + item.scriptcontext;
	    			} else {
	    				value = item.scriptcontext;
	    			}
	    		}
	    	});
	    	privateList.forEach(function(item, i) {
	    		if(item.splitType == '3') {
	    			if(value) {
	    				value += '\n\n' + item.scriptcontext;
	    			} else {
	    				value = item.scriptcontext;
	    			}
	    		}
	    	});
	    	
	    	return value;
	    }
	    
	    function changeStyle($this) {	
	    	$this.siblings('p').removeClass('active');
	    	$this.addClass('active');
	    	$('#privateFieldCtn ul, #publicFieldCtn ul', $el).find('li.active').removeClass('active');
	    	$('#configCtn', $el).hide();
	    	$('#detailCtn', $el).show();
	    }
	    
	    //保存字段配置信息
	    $('#saveBtn', $el).click(function(e) {
	    	if($(this).hasClass('disabled')) return;
	    	var data = {};
	    	data.filefield = $('#fieldName', $el).val().trim();
	    	data.filedesc = $('#fieldDescript', $el).val().trim();
	    	data.filetype = $('#fieldType', $el).val().trim();
	    	data.logregex = $('#logregex', $el).val().trim();	 
	    	var type = $('#privateFieldCtn ul, #publicFieldCtn ul', $el).find('li.active').data('type');    	
	    	if(type == 'public') {
	    		data.systype = '1';
	    	} else {
	    		data.systype = '2';
	    	}	  
	    	
	    	if(!validateFieldName(data.filefield)) return;
	    	if(data.logregex == ''){
	    		app.alert('请填写匹配规则');
	    		return;
	    	}
	    	//是否配置拆分方式
	    	var isConfigSeperateWay = false;
	    	$('.type-devide [type="radio"]', $el).each(function(i, item) {
	    		if($(item).prop('checked')) {
	    			isConfigSeperateWay = true;
	    		}
	    	});	    	
	    	if(!isConfigSeperateWay) {
	    		app.alert('请配置拆分方式!', '', app.alertShowType.ERROR);
	    		return;
	    	}
	    	
	    	switch($('.type-devide [type="radio"]:checked', $el).data('way')) {
	    		case 0:
	    			data.splitType = '1';
	    			data.scriptcontext = afeConfig.getConfig({
	    				outerFieldName: data.filefield,
	    				outerFieldType: data.filetype,
	    				outerFieldDesc: data.filedesc
	    			});
	    			break;
	    		case 1:
	    			data.splitType = '2';
	    			data.scriptcontext = pythonConfig.getValue();
	    			break;
	    		case 2:
	    			data.splitType = '3';
	    			data.scriptcontext = groovyConfig.getValue();	    			
	    	}
	    	
	    	var rowData = getCurRowData();
	    	if(rowData) {
	    		$.extend(rowData, data);
	    	} else {
	    		privateList.push(data);
	    	}	    	
	    	$(this).addClass('disabled');
	    	savePageData(null, null, data);
	    });
	    
	    function validateFieldName(filefield) {
	    	if(!filefield) {
	    		app.alert('字段名不能为空!', '', app.alertShowType.ERROR);
	    		return false;
	    	}
	    	
	    	var rowData = getCurRowData();
	    	
	    	for(var i = 0; i < publicList.length; i++) {
	    		//修改数据时，不同跟当前行的名字做对比
	    		if(rowData && rowData.filefield == publicList[i].filefield) continue;
	    		
	    		if(publicList[i].filefield == filefield) {
	    			app.alert('字段名不可重复!', '', app.alertShowType.ERROR);
	    			return false;
	    		}
	    	}	 
	    	
	    	for(var i = 0; i < privateList.length; i++) {
	    		//修改数据时，不同跟当前行的名字做对比
	    		if(rowData && rowData.filefield == privateList[i].filefield) continue;
	    		
	    		if(privateList[i].filefield == filefield) {
	    			app.alert('字段名不可重复!', '', app.alertShowType.ERROR);
	    			return false;
	    		}
	    	}
	    	
	    	return true;
	    }
	    
	    function getCurRowData() {
	    	var $li = $('#privateFieldCtn ul, #publicFieldCtn ul', $el).find('li.active');
	    	if($li.length > 0) {
	    		var type = $li.data('type');
	    		switch(type) {
	    			case 'public':
	    				return publicList[$li.index()];
	    			case 'private':
	    				return privateList[$li.index()];	   
	    		}
	    	}
	    	return null;
	    }
	    
	    function savePageData($lis, $del, data) {
			var json = [];
			
			var afe = {
				funcdesc: '默认类',
				functype: '默认类',
				logregex: '未知',
				scripttype: '1',
				dictId:undefined,
				elements: [],
				dictVOList: []
			};
			var python = {
				funcdesc: '默认类',
				functype: '默认类',
				logregex: '未知',
				scripttype: '2',
				dictId:undefined,
				elements: [],
				dictVOList: []
			};
			var groovy = {
				funcdesc: '默认类',
				functype: '默认类',
				logregex: '未知',
				scripttype: '3',
				dictId:undefined,
				elements: [],
				dictVOList: []
			};
			
			getConfigData(publicList, afe, python, groovy);
			
			getConfigData(privateList, afe, python, groovy);
			
			if(afe.elements.length) {
				afe.scriptcontext = JSON.stringify(getNewAfeConfigData());
				json.push(afe);
			}
			
			if(python.elements.length) {
				python.scriptcontext = getPythonDetailContent();
				json.push(python);
			}
			
			if(groovy.elements.length) {
				groovy.scriptcontext = getGroovyDetailContent();
				json.push(groovy);
			}
			
	    	app.common.ajaxWithAfa({
	    		url: 'LogSourceAction_saveSplit.do',
	    		data: {
	    			objectId: objectId,
	    			logId: logId,
	    			applicationId:applicationId,
	    			category1: scope.category1,
	    			category2: scope.category2,
	    			category3: scope.category3,
	    			configInfoTabs: JSON.stringify(json)
	    		}
	    	}).then(function(datas) {
	    		if(datas.result == "OK") {	    			
	    			if($del) {
	    				$('#configCtn', $el).hide();
	    				$lis.remove();
		    			$del.addClass('disabled');
	    				app.alert('删除成功');
	    			} else {
	    				app.alert('保存成功');
	    				/*var rowData = getCurRowData();
	    		    	if(rowData) {//修改
	    		    		var $li = $('#privateFieldCtn ul, #publicFieldCtn ul', $el).find('li.active');
	    		    		$li.find('span').eq(0).text(rowData.filetype.charAt(0).toUpperCase());
	    		    		$li.find('span').eq(1).text(rowData.filefield);
	    		    		$li.find('span').eq(2).text(rowData.filedesc ? rowData.filedesc : '');
	    		    		$li.find('span').eq(3).text(getSplitType(rowData.splitType));	 
	    		    	} else {//新增
	    		    		$('#privateFieldCtn ul', $el).append('<li class="active" data-type="private"><span>'+ data.filetype.charAt(0).toUpperCase() +'</span><span>'+ data.filefield +'</span><span>'+ (data.filedesc ? data.filedesc : '') +'</span><span>'+ getSplitType(data.splitType) +'</span></li>');
	    		    	}*/
	    			}
	    			getPageData();
	    			// changeDetailData();
	    		} else {
	    			if($del) {
	    				app.alert('删除失败', '', app.alertShowType.ERROR);
	    			} else {
	    				app.alert('保存失败', '', app.alertShowType.ERROR);
	    			}	    			
	    		}	
	    		
	    		$('#saveBtn', $el).removeClass('disabled');
	    	});
	    }
		
		var configIds = {
			id: 1,
			getId: function() {
				return '' + this.id++;
			}
		}
		
		function getNewAfeConfigData() {
	    	var data = {};
	    	publicList.forEach(function(item, i) {
	    		if(item.splitType == '1') {
	    			data[configIds.getId()] = item.scriptcontext.field;
	    			data.messageType = item.scriptcontext.message.DefaultValue;
	    			data.treeRoot = item.scriptcontext.message;
	    		}
	    	});
	    	privateList.forEach(function(item, i) {
	    		if(item.splitType == '1') {
	    			data[configIds.getId()] = item.scriptcontext.field;
	    			data.messageType = item.scriptcontext.message.DefaultValue;
	    			data.treeRoot = item.scriptcontext.message;
	    		}
	    	});
	    	
	    	return data;
	    }
		
		function getConfigData(list, afe, python, groovy) {
			list.forEach(function(item, i) {
				if(item.splitType == '1') {
					afe.dictId = item.dictid;
					afe.logregex = item.logregex;
					afe.elements.push({
						elementname: item.filefield,
						systype: item.systype,
						scriptcontext: JSON.stringify(item.scriptcontext),
						classsname: item.scriptcontext.message.DefaultValue
					});
					afe.dictVOList.push({
						dictdesc: undefined,
						filedesc: item.filedesc,
						filefield: item.filefield,
						filetype: item.filetype
					});
				} else if(item.splitType == '2') {
					python.dictId = item.dictid;
					python.logregex = item.logregex;
					python.elements.push({
						elementname: item.filefield,
						systype: item.systype,
						scriptcontext: item.scriptcontext
					});
					python.dictVOList.push({
						dictdesc: undefined,
						filedesc: item.filedesc,
						filefield: item.filefield,
						filetype: item.filetype
					});
				} else if(item.splitType == '3') {
					groovy.dictId = item.dictid;
					groovy.logregex = item.logregex;
					groovy.elements.push({
						elementname: item.filefield,
						systype: item.systype,
						scriptcontext: item.scriptcontext
					});
					groovy.dictVOList.push({
						dictdesc: undefined,
						filedesc: item.filedesc,
						filefield: item.filefield,
						filetype: item.filetype
					});
				}
			});
		}
		
		function changeDetailData() {
			var afeCount = 0;
			var pythonCount = 0;
			var groovyCount = 0;
			publicList.forEach(function(item, i) {
				if(item.splitType == '1') {
					afeCount++;
		    	} else if(item.splitType == '2') {
		    		pythonCount++;
		    	} else if(item.splitType == '3') {
		    		groovyCount++;
		    	}
			});
			privateList.forEach(function(item, i) {
				if(item.splitType == '1') {
					afeCount++;
		    	} else if(item.splitType == '2') {
		    		pythonCount++;
		    	} else if(item.splitType == '3') {
		    		groovyCount++;
		    	}
			});
			$('#afeCount', $el).text(afeCount);
			$('#pythonCount', $el).text(pythonCount);
			$('#groovyCount', $el).text(groovyCount);
		}
    },

    unload: function(handler) {
    	var data = [afeDetail, pythonDetail, groovyDetail, afeConfig, pythonConfig, groovyConfig];
    	
    	data.forEach(function(item, i) {
    		item && item.dispose();
    	});
    },

    pause: function($el, scope, handler) {
      
    },

    resume: function($el, scope, handler) {
      
    }
  };
});