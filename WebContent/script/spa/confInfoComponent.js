/**
 * Created by lijiancheng@cfischina.com on 2015/10/27 0027.
 * 将处理每个设备服务的公共配置信息js抽出来弄成一个公共类
 */
( /* <global> */function (undefined) {
	(function (factory) {
		"use strict";

		// amd module
		if (typeof define === "function" && define.amd) {
			define(["jquery"], factory);
		}
		// global
		else {
			factory();
		}

	})
	(function ($) {
		"use strict";

		/*配置信息-参数*/
		var CONF_INFO_PARAMS= {
			"baseDiv": "<div><h5><strong>基本配置信息</strong></h5></div>",
			"coreDiv": "<div><h5><strong>核心配置信息</strong></h5></div>",
			"table": "<table class='table table-hover table-condensed'></table>",
			"groupDiv": function (desp) {
				return "<div><h5><strong>" + desp + "</strong><div class='btn-group pull-right'></div></h5></div>";
			},
            "tempDiv": function (desp) {
                return "<div><h5><strong>" + desp + "</strong><div class='btn-group pull-right'></div></h5></div>";
            },
            'maxOccurs': function (desp) {
                return '添加' + desp + '不能多于最大限制';
            },
            'minOccurs': function (desp) {
                return '删除' + desp + '不能少于最小限制';
            },

            'getValidateNameArray': function () {/*返回需要校验的节点名称数组*/
            	return [];
            },
            
			"validateInputs": [],
			"stopPlatformConfirmMsg": "您修改了运维管理端口需要重启实例后生效，是否确定修改并停止该_name_？",
			"restartConfirmMsg": "您所修改的某些配置需要重启设备后生效，是否确定修改并重启该_name_？",
			"normalConfirmMsg": "是否确定修改该_name_的配置？",
			"stopPlatform": false,
			"restart": false,
			"commConfig": false,
			"cluster": false
		};

		/*配置信息-展示方法*/
		var CONF_INFO_SHOW_METHODS = {
			_createBaseDiv: function ($el, baseJson, settings) {
				var $baseDiv = $(settings.baseDiv),
					$table = $(settings.table);

				for (var name in baseJson) {
					var $tr = this._handleItemJson(baseJson[name], settings);
					$table.append($tr);
				}

				$baseDiv.append($table);
				$el.append($baseDiv);
			},
			_createCoreDiv: function ($el, coreJson, settings) {
				var $coreDiv = $(settings.coreDiv),
					$table = $(settings.table);

				for (var name in coreJson) {
					var $tr = this._handleItemJson(coreJson[name], settings);
					$table.append($tr);
				}

				$coreDiv.append($table);
				$el.append($coreDiv);
			},
			_handleItemJson: function (itemJson, settings, anotherItemJson) {
				return this._allocateText(itemJson, settings, anotherItemJson);
			},
			_allocateText: function (itemJson, settings, anotherItemJson) {
				var value = itemJson.value,
					enums = itemJson.enums,
					desp = itemJson.desp ? itemJson.desp : itemJson.name,
					tempStr = "", $anotherTr, $tr;
				if (enums.length > 0 && itemJson.type.length == 0) {
					$.each(enums, function(index, enumObj) {
						if (value === enumObj.value) {
							value = enumObj.documentation;
							return true;
						}
					});
				}

				if (this._isCustomizable(itemJson, settings)) {
					tempStr = "<i class='fa fa-circle privateConfig'></i><span class='privateConfig'>私有配置</span>";
				}
				
				$tr = $("<tr><td title='" + desp + "'>" + desp + tempStr + "</td>" +
						"<td title='" + value + "'>" + value + "</td></tr>");

				if (anotherItemJson) {
					$anotherTr = this._allocateText(anotherItemJson, settings);
					$tr.append($anotherTr.children());
				}
				
				return $tr;
			},
			_isCustomizable: function (itemJson, settings) {//是否为私有配置
				return (settings.cluster && itemJson.customizable);
			}
		};


		/*配置信息-编辑方法*/
		var CONF_INFO_EDIT_METHODS= {
            _createBaseDiv: function ($el, baseJson, settings) {
                var $baseDiv = $(settings.baseDiv),
                    $table = $(settings.table);

                for (var name in baseJson) {
                    var $tr;
                    if ($.inArray(name, settings.textArray) != -1) {
                        $tr = this._handleTextJson(baseJson[name], settings);
                    } else {
                        $tr = this._handleItemJson(baseJson[name], settings);
                    }
                    $table.append($tr);
                }
                
                $baseDiv.append($table);
                $baseDiv.find('[data-inner-switcher]').bootstrapSwitch();
                $el.append($baseDiv);
            },
            _createCoreDiv: function ($el, coreJson, settings) {
                var $coreDiv = $(settings.coreDiv),
                    $table = $(settings.table);

                for (var name in coreJson) {
                    var $tr = this._handleItemJson(coreJson[name], settings);
                    $table.append($tr);
                }

                $coreDiv.append($table);
	            $coreDiv.find('[data-inner-switcher]').bootstrapSwitch();
                $el.append($coreDiv);
            },
            _handleItemJson: function (itemJson, settings) {
            	var type = itemJson.type ? itemJson.type : (itemJson.enums.length > 0 ? "xs:select" : "");

	            if (this._isText(type)) {
	                return this._allocateItem(itemJson, settings);
	            } else if (this._isRadio(type)) {
	                return this._allocateRadio(itemJson, settings);
	            } else if (this._isSelect(type)) {
	                return this._allocateSelect(itemJson, settings);
	            } else {
	            	return this._allocateItem(itemJson, settings);
	            }
            },
            _handleTextJson: function (itemJson, settings) {
                return this._allocateText(itemJson, settings);
            },
            _isText: function (type) {
                return type == "xs:string" || type == "xs:integer";
            },
            _isRadio: function (type) {
                return type == "xs:boolean";
            },
            _isSelect: function (type) {
                return type == "xs:select";
            },
            _isInteger: function (type) {
            	return type == "xs:integer";
            },
            _allocateItem: function (itemJson, settings) {
//            	if (this._beAdd2Validate(itemJson, settings))
//            		this._setValidateData(itemJson, settings);
            	
                return $("<tr><td>" + (itemJson.desp ? itemJson.desp : itemJson.name) + "</td><td class='control-group'>" +
                    "<input type='text'" +
                    "value='" + (itemJson.value ? itemJson.value : (itemJson.def ? itemJson.def : "")) + "' " +
                    "id='" + itemJson.uniqueId + "' " +
                    "uniqueId='" + itemJson.uniqueId + "' " +
                    "dataType='" + itemJson.type + "' " +
                    "use='" + itemJson.use + "' " +
                    "autoApply='" + itemJson.autoApply + "' " +
                    (this._modifyDisabled(itemJson, settings) ? "disabled" : "") + " " +
                    "xPath='" + itemJson.xPath + "' " +
                    " /><span class='help-inline hide'></span></td></tr>");
            },
            _allocateRadio: function (itemJson, settings) {
                var $tr = $('<tr></tr>'),
                    $inputer;

                $tr.append('<td>' + (itemJson.desp ? itemJson.desp : itemJson.name) + '</td>');
                $inputer = $('<input type="checkbox"/>')
                    .attr({
                        'data-inner-switcher': 'true',
                        'uniqueId': itemJson.uniqueId,
                        'dataType': itemJson.type,
                        'xPath': itemJson.xPath
                    });
                itemJson.value == "true" && $inputer.attr('checked', 'checked');
                this._modifyDisabled(itemJson, settings) && $inputer.attr('disabled', 'disabled');

                return $tr.append($('<td></td>').append($inputer));
            },
            _allocateSelect: function (itemJson, settings) {
                var value = itemJson.value,
                    $tr = $("<tr><td>" + (itemJson.desp ? itemJson.desp : itemJson.name) + "</td></tr>"),
                    $td = $("<td></td>"),
                    $select = $("<select dataType='xs:select' uniqueId='" + itemJson.uniqueId + "' " +
                        (this._modifyDisabled(itemJson, settings) ? "disabled" : "") + " " +
                        "xPath='" + itemJson.xPath + "'></select>");

                for (var i in itemJson.enums) {
                    var val = itemJson.enums[i].value,
                        text = itemJson.enums[i].documentation,
                        state = value == val ? "selected" : "";
                    $select.append($("<option value='" + val + "' " + state + ">" + text + "</option>"));
                }
                $td.append($select);

                return $tr.append($td);
            },
            _allocateScriptPath: function (itemJson, settings) {
                var $tr = $("<tr><td>" + (itemJson.desp ? itemJson.desp : (itemJson.name === 'description' ? '名称' : itemJson.name)) + "</td></tr>"),
                    $td = $("<td><input type='text'" +
                        "value='" + (itemJson.value ? itemJson.value : (itemJson.def ? itemJson.def : "")) + "' " +
                        "uniqueId='" + itemJson.uniqueId + "' " +
                        "srcId='" + itemJson.srcId + "' " +
                        "dataType='" + itemJson.type + "' " +
                        "use='" + itemJson.use + "' " +
                        "autoApply='" + itemJson.autoApply + "' " +
                        (this._modifyDisabled(itemJson, settings) ? "disabled" : "") + " " +
                        "xPath='" + itemJson.xPath + "' " +
                        " />" +
                        (this._modifyDisabled(itemJson, settings) ? "" : "<small><i class='fa  fa-plus-circle Running'></i>" +
                        "<i class='fa  fa-minus-circle buildingColor'></i></small>") +
                        "</td>"),
                    $addScript = $(".fa-plus-circle", $td),
                    $delScript = $(".fa-minus-circle", $td);

                $addScript.click({json: itemJson, settings: settings}, this._addScript);
                $delScript.click({json: itemJson, that: this}, this._delScript);

                $tr.append($td);
                return $tr;
            },
			_allocateText: function (itemJson, settings) {
				var value = itemJson.value,
					enums = itemJson.enums,
					desp = itemJson.desp ? itemJson.desp : itemJson.name;
				if (enums.length > 0 && itemJson.type.length == 0) {
					$.each(enums, function(index, enumObj) {
						if (value === enumObj.value) {
							value = enumObj.documentation;
							return true;
						}
					});
				}
				
            	return $("<tr><td>" + desp + "</td><td><span>" + value + "</span></td></tr>");
			},
            _modifyDisabled: function (itemJson, settings) {//当前配置节点是否禁止编辑
            	if (settings.commConfig)
            		return itemJson.customizable;
            	if (settings.cluster)
            		return !itemJson.customizable;
            	return false;
            },
            _beAdd2Validate: function (itemJson, settings) {//是否添加到验证数组中
//            	if (this._modifyDisabled(itemJson, settings) || !itemJson.use)
            	if (this._modifyDisabled(itemJson, settings))
            		return false;
            	return true;
            },
			_setValidateData: function (itemJson, settings) {
			    var inputs = settings.validateInputs,
			    	i = inputs.length,
			    	id = itemJson.uniqueId,
			    	filter = {
			    		filter: {require: true}
			    	};
			    filter.id = id;
			    filter.preMsg = itemJson.desp;
			    if ($.inArray(itemJson.name, settings.portArray) != -1) {
			    	filter.filter.type = "port";
			    } else if ($.inArray(itemJson.name, settings.hostArray) != -1) {
			    	filter.filter.type = "host";
			    } else if (this._isInteger(itemJson.type)) {
			    	filter.filter.type = "integer";
			    	if ($.inArray(itemJson.name, settings.nonNegativeIntegerArray) != -1) {
			    		filter.filter.type = "nonNegativeInteger";
			    	} else if ($.inArray(itemJson.name, settings.nonPositiveIntegerArray) != -1) {
			    		filter.filter.type = "nonPositiveInteger";
			    	}
			    } else if ($.inArray(itemJson.name, settings.fileSizeArray) != -1){
			    	filter.filter.type = "unit";
			    }
			    for (; --i >= 0;) {
			        if (inputs[i].id === id) {
			            break;
			        }
			    }
			    if (inputs[i] && inputs[i].id === id) {
			        inputs[i] = filter;
			    } else {
			        inputs.push(filter);
			    }
			},
            _findJsonByUniqueId: function (scope, uniqueId) {
                if ($.type(scope) == "object") {
                    if (scope.uniqueId === uniqueId)
                        return scope;

                    for (var name in scope) {
                        var result = undefined;
                        if ($.type(scope[name]) == "object" || $.type(scope[name]) == "array")
                            result = this._findJsonByUniqueId(scope[name], uniqueId);
                        if (result)
                            return result;
                    }

                } else if ($.type(scope) == "array") {
                    for (var i in scope) {
                        var result = this._findJsonByUniqueId(scope[i], uniqueId);
                        if (result)
                            return result;
                    }
                }
                return undefined;
            },
            _findArrayByXPath: function (scope, xPath) {
                if ($.type(scope) == "object") {
                    if (scope.xPath === xPath)
                        return scope;

                    for (var name in scope) {
                        var result = undefined;
                        if ($.type(scope[name]) == "object" || $.type(scope[name]) == "array")
                            result = this._findArrayByXPath(scope[name], xPath);
                        if (result)
                            return result;
                    }

                } else if ($.type(scope) == "array") {
                    for (var i in scope) {
                        if (scope[i].xPath === xPath)
                            return scope[i];
                    }
                }
                return undefined;
            },
            _indexOf: function (array, uniqueId) {
                for (var i in array) {
                    var obj = array[i];
                    if (obj.uniqueId === uniqueId)
                        return i;
                }

                return -1;
            },
            _deepClone: function (obj) {
                var newObj, that = this;
                if (typeof obj === 'string') {
                    //字符串
                    newObj = '' + obj;
                } else if ($.isArray(obj)) {
                    //数组
                    newObj = $.map(obj, function (elem, name) {
                        return that._deepClone.call(that, elem);
                    });
                } else if (typeof obj === 'object') {
                    //对象
                    newObj = {};
                    for (var name in obj) {
                        if (obj[name] instanceof Function) {
                            newObj[name] = obj[name].toString().replace(/[\n\r\t]/g, '').replace(/(\s)+/g, ' ').replace(/\+/g, '##plus##');
                        } else {
                            newObj[name] = this._deepClone(obj[name]);
                        }
                    }
                } else {
                    newObj = obj;
                }

                return newObj;
            },
            //id复用	页面层
            _multiplexId: function(arr) {
            	if ($.type(arr) === 'array') {
            		if (arr.length === 0)
            			return '1';
            		
            		arr.sort(function (a, b) {
            			return parseInt(a) > parseInt(b) ? 1 : -1;
            		});
            		
            		if (arr[0] != '1')
            			return '1';
            		
            		var result = undefined,
            			temp;
            		for (var i=-1, curr; curr=arr[++i];) {
            			temp = arr[i+1];
            			if (!temp)
            				break;
            			
            			if (parseInt(temp) - parseInt(curr) === 1) {
            				continue;
            			} else {
            				result = parseInt(curr) + 1;
            				break;
            			}
            		}
            		if (!result)
            			result = parseInt(arr[arr.length - 1]) + 1;
            		return result + '';
            	}
            	
            	return '';
            },
            _generateUniqueId: function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
        };

        /*公共配置-基本对象-对象*/
        var ConfInfoObject = function ($selector, pageJson, settings) {
            this.defaultSettings = $.extend({}, app.confInfo.params, settings);
            this.$selector = $selector;
            this.pageJson = pageJson;
        };

        ConfInfoObject.prototype = {
            constructor: ConfInfoObject,
            isStopPlatform: function () {
            	return this.defaultSettings.stopPlatform;
            },
            isRestart: function () {
            	return this.defaultSettings.restart;
            },
            confirmMsg: function () {
            	if (this.defaultSettings.stopPlatform)
            		return this.defaultSettings.stopPlatformConfirmMsg;
            	else
            		return this.defaultSettings.restart
            				? this.defaultSettings.restartConfirmMsg
            				: this.defaultSettings.normalConfirmMsg;
            },
            resume: function () {
            	this.defaultSettings.stopPlatform = false;
            	this.defaultSettings.restart = false;
            },
            validateInputs: function () {
            	return this.defaultSettings.validateInputs;
            },
            isCommConfig: function () {
            	return this.defaultSettings.commConfig;
            },
            show: function(){},
            edit: function(){},
            result: function () {}
        };
        ConfInfoObject.show = function ($selector, pageJson, settings) {
            var p = new ConfInfoObject($selector, pageJson, settings);
            p.show($selector, pageJson);

            return p;
        };
        ConfInfoObject.edit = function ($selector, pageJson, settings) {
            var p = new ConfInfoObject($selector, pageJson, settings);
            p.edit($selector, pageJson);
            return p;
        };

        $.extend(ConfInfoObject.show, CONF_INFO_SHOW_METHODS);
        $.extend(ConfInfoObject.edit, CONF_INFO_EDIT_METHODS);

		return {
			params: CONF_INFO_PARAMS,
			showBase: CONF_INFO_SHOW_METHODS,
			editBase: CONF_INFO_EDIT_METHODS,
            objectBase: ConfInfoObject
		};
	});
})();