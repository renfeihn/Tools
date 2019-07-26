/**
 * 日志拆分配置工具
 */
(function (undefined) {

	(function (factory) {
		"use strict";

		//amd module
		if (typeof define === "function" && define.amd) {
			define(["jquery", "handlebars", "codemirror/lib/codemirror", "codemirror/mode/python/python", "codemirror/mode/groovy/groovy"], factory);
		}
		//global
		else {
			factory();
		}

	})(function ($, hb, CodeMirror) {

		function SplitConfiger(option) {
			this.$el = option.$el;
			this.type = option.type;
			this.data = option.data
			this.templates = null;
			this.TmpCtn = null;
			this.index = 0;
			this._init(option.config);
		}

		SplitConfiger.prototype = {

			constructor: SplitConfiger,

			CONSTANT: {
				OUTER_FIELD_TYPE: ['String', 'Bytes', 'Integer', 'Long'],
				FIELD_TABLE_COLS: ['funcClass', 'func']
			},

			dispose: function () {
				this.TmpCtn=null;
				this.index = null;
				this.templates = null;
				this.cache = null;
				this.type = null;
				this.data = null;

				this.$el.remove();
				this.$el = null;
				this.scope = null;
				this.handler = null;

			},

			setData: function (option) {
				this.$el = option.$el;
				this.type = option.type;
				this.data = option.data;
				this.TmpCtn =null;
				this.index = 0;
				this.cache = null;
				this._init(option.config);
			},

			packgeData: function () {
				var self = this;
				var resultData = self.data;
				var fileds = [];

				if(self.type != 'afe'){
					self._saveScriptConfigData();//保存当前数据
					self._stitchScript();//拼接脚本

					for (var i in self.cache) {
						if (i != 'treeRoot' && i != 'defaultConfig') {
							fileds.push(self.cache[i].data);
						}
					}
				}else{
					self._saveAfeConfigData();
					// 配置
		
					var cfg = self._packgeConfigData(self.cache.treeRoot, fileds);
					var pageJson = {
						messagemap:{
							caption:'',
							message:cfg
						}
					};
					
				}
				resultData.splitScript = JSON.stringify(pageJson);
				resultData.splitFields = fileds;

				return resultData;
			},

			_packgeConfigData: function(config, fileds) {
				var self = this;
				var tmpData = {};
				var parameter = [];

				var parameters = config.Parameter;
				for (var i = 0; i < parameters.length; i++) {

					parameter.push({
						name: parameters[i].Name,
						value: parameters[i].DefaultValue
					});
				}
				// 报文节点
				if($.isEmptyObject(config.data)){
					tmpData.classname = config.dataClass;
					tmpData.type = config.messageType;
					tmpData.parameter = parameter;
					if(config.childrenId.length > 0){
						tmpData.fields = [];
						for (var i = 0; i < config.childrenId.length; i++) {
							var cfg = self._packgeConfigData(self.cache[config.childrenId[i]], fileds);
							tmpData.fields.push(cfg);
						}	
					}
				}
				// 字段节点
				else{
					fileds.push(config.data);

					tmpData.fielddefaultvalue = config['field-tpl'].outerFieldDefaultValue;
					tmpData.fielddescription = config['field-tpl'].outerFieldDesc;
					tmpData.fieldname = config['field-tpl'].outerFieldName;
					tmpData.fieldtype = config['field-tpl'].outerFieldType;
					tmpData.data = "";

					tmpData.packexpr = [{
						expr:config['field-tpl'].outerFieldValue
					}];
					tmpData.parameter = parameter;

					var method = [];//字段方法
					for (var i = 0; i < config.TableData.length; i++) {
						var cfg =  config.TableData[i].cfg.parameters;

						var tmpPar = [];//字段方法参数
						for (var j = 0; j < cfg.length; j++) {
							tmpPar.push(cfg[j].DefaultValue);
						}

						method.push({
							name: config.TableData[i].funcClass+'.'+config.TableData[i].func,
							parameter: tmpPar.join(',')
						})
					}

					tmpData.method = method;

					if(config.childrenId.length > 0){
						tmpData.message = [];
						for (var i = 0; i < config.childrenId.length; i++) {
							var cfg = self._packgeConfigData(self.cache[config.childrenId[i]], fileds);
							tmpData.message.push(cfg);
						}
					}
				}

				return tmpData;
			},

			_init: function (initConfig) {
				var $el = this.$el,
					messageConfig,
					functionConfig,
					cache = {},
					templates = {},
					OUTER_FIELD_TYPE = ['String', 'Bytes', 'Integer', 'Long'],
					FIELD_TABLE_COLS = ['funcClass', 'func'],
					self = this;
				if(!self.templates){
					hb.registerHelper('if_eq', function (v1, v2, opts) {
						if (v1 == v2)
							return opts.fn(this);
						else
							return opts.inverse(this);
					});

					// 预编译模板
					$('script[type="text/x-handlebars-template"]', $el).each(function (index, element) {
						var $this = $(this);
						templates[$this.attr('id')] = hb.compile($this.html());
					});

					self.templates = templates;
				}

				if (self.type == 'java') {
					self._initJava();
				}else if(self.type == 'python'){
					self._initPython();
				}else if(self.type == 'afe'){
					self._initAfe();
				}else if(self.type == 'regex'){
					self._initRegEx();
				}

				setTimeout(function() {
					$('#treeRoot', $el).click();
				}, 5);
			},

			_initAfe: function () {
				var self = this,
					$el = this.$el;
				$('#modalContent', $el).html(self.templates['modal-tpl']({
					imgName:'agree',
					name:'可视化配置方式',
					treeRootName:'Xml报文',
					rightName:'节点属性',
				}));

				self.cache = self._parseData();

				self._bindCommonEvent();

				self._bindAfeEvent();
			},

			_initJava: function () {
				var self = this,
					$el = this.$el;
				$('#modalContent', $el).html(self.templates['modal-tpl']({
					imgName:'java',
					name:'Java脚本配置方式',
					treeRootName:'Java解析字段'
				}));

				self.cache = self._parseData();

				self._bindCommonEvent();
			},

			_initPython: function () {
				var self = this,
					$el = this.$el;
				$('#modalContent', $el).html(self.templates['modal-tpl']({
					imgName:'python',
					name:'Python脚本配置方式',
					treeRootName:'Python解析字段'
				}));

				self.cache = self._parseData();

				self._bindCommonEvent();
			},

			_initRegEx: function () {
				var self = this,
					$el = this.$el;
				$('#modalContent', $el).html(self.templates['modal-tpl']({
					imgName:'regex',
					name:'RegEx表达式配置方式',
					treeRootName:'解析字段',
				}));

				self.cache = self._parseData();

				self._bindCommonEvent();
			},

			_bindCommonEvent: function () {
				var $el = this.$el,
					self = this;

				// 绑定左侧菜单树的收起、展开
				$('.message-left', $el).on('click', 'i.fa-angle-right', function () {
					var $nextUl = $(this).next().next();
					var $parentLi = $(this).parent('li');
					
					if ($parentLi.attr('data-state') == 'open') {
						$parentLi.attr('data-state', 'close');
						$nextUl.slideUp(200);
					} else if ($parentLi.attr('data-state') == 'close') {
						$parentLi.attr('data-state', 'open');
						$nextUl.slideDown(200);
					}
				});
				// 绑定菜单树上方的快捷按钮
				$('.message-controlsBtn .fa-plus-square-o', $el).click(function () {
					$('.message-left>ul', $el).find('ul').slideDown(200);
					$('.message-left>ul', $el).find('li[data-state]').attr('data-state', 'open');
				});

				$('.message-controlsBtn .fa-minus-square-o', $el).click(function () {
					$('.message-left>ul', $el).find('ul').slideUp(200);
					$('.message-left>ul', $el).find('li[data-state]').attr('data-state', 'close');
				});

				// 右键新增子节点-字段节点
				$('.newField', $el).on('click', function (event) {
					var message = $('a.selected[data-role=message]', $el);
					var pId = message.attr('id');
					if(pId == undefined){
						app.confirmDialog({
							sTitle:"警告",       
			                sType:"warn",
			                sContent:'请先选择报文节点!',
			                sBtnConfirm: '确定'
						})
					}else{
						message.parent().attr('data-state','open');
						var id = self._addTreeNode(message);
						self.cache[id] = $.extend(true, {}, self.cache.defaultConfig);
						if(self.type == 'afe'){
							self.cache[id].parentId = pId;
							self.cache[pId].childrenId.push(id);
						}
						$('#'+id, $el).click();
					}
				})
				// 右键新增报文节点
				$('#newMessage', $el).on('click', function(event) {
					var filed = $('a.selected[data-role=field]', $el);
					var pId = filed.attr('id');
					if(pId == undefined){
						app.confirmDialog({
							sTitle:"警告",       
			                sType:"warn",
			                sContent:'请先选择字段节点!',
			                sBtnConfirm: '确定'
						})
					}else{
						filed.parent().attr('data-state','open');
						var id = self._addMessageNode(filed);
						self.cache[id] = $.extend(true,{}, self.cache.messageDefaultConfig);
						self.cache[id].parentId=pId;

						self.cache[pId].childrenId.push(id);
						$('#'+id, $el).click();
					}
				});

				$('.delete', $el).on('click', function(event) {
					var $target = $('a.selected', $el);
					var id = parseInt($target.attr('id'));

					app.confirmDialog({
						sTitle:"确认",     
		                sType:"normal",
		                sContent:'确定删除该节点？',
		                sBtnConfirm: '确定',
		                sBtnCancel: '取消',
		                fnConfirmHandler: function(){
		                	$target.parent().remove();
		                	if(self.type == 'afe'){
		                		
		                		var pId = self.cache[id].parentId,
		                			pChildren = self.cache[pId].childrenId,
		                			index = pChildren.indexOf(id),
		                			children = self.cache[id].childrenId;

	                			// 移除父节点的绑定
	                			pChildren.splice(index,1);

	                			// 删除元素
	                			delete self.cache[id];

	                			// 删除子元素
	                			if(children && children.length > 0){
	                				deleteData(children);
	                			}
	                			
	                			function deleteData(children){
	                				for (var i = 0; i < children.length; i++) {
	                					var child = self.cache[children[i]].childrenId;
	                					delete self.cache[children[i]];

	                					if(child && child.length>0){
	                						deleteData(child);
	                					}
	                				}
	                			}

		                	}else{
		                		delete self.cache[id];
		                	}
		                	$('#treeRoot', $el).click();
		                },
		                aArgs: []
					})
				});

				$('.message-right',$el) .on('click', '.message-parameter', function () {
					$(this).toggleClass('retract');
					$(this).next().slideToggle(200);
				})

				// 菜单树点击事件
				$('.message-left', $el).on('click', 'a', function () {
					var $this = $(this);

					if ($this.hasClass('selected')) {
						return;
					}

					if(self.type != 'afe'){
						self._saveScriptConfigData();
						self._stitchScript();//拼接脚本

					}else{
						self._saveAfeConfigData();
					}

					$('.message-left', $el).find('a').removeClass('selected');
					$this.addClass('selected');
					var id = $(this).attr('id'),
						cacheConfig = self.cache[id];

					$('.message-group', $el).html('');//清空页面
					$('.parameter-group', $el).remove();
					$('.btnGroup', $el).remove();

					// 选中报文节点
					if ($this.attr('data-role') == 'message') {
						if (self.type == 'java' ) {
							$('.message-group', $el).html(self.templates['script-msg-tpl'](cacheConfig['script-msg-tpl']));
							
							self.TmpCtn = CodeMirror.fromTextArea($('#'+self.type+'TmpCtn textarea', $el)[0], {
								mode:  "groovy",
								readOnly: true,
								lineNumbers:true
							});
							self.TmpCtn.setValue(cacheConfig.data.splitScript||'');
						}else if(self.type == 'python'){
							$('.message-group', $el).html(self.templates['script-msg-tpl'](cacheConfig['script-msg-tpl']));

							self.TmpCtn = CodeMirror.fromTextArea($('#'+self.type+'TmpCtn textarea', $el)[0], {
								mode:  "python",
								readOnly: true,
								lineNumbers:true
							});
							self.TmpCtn.setValue(cacheConfig.data.splitScript||'');
						}else if(self.type == 'regex'){
							$('.message-group', $el).html(self.templates['script-msg-tpl'](cacheConfig['script-msg-tpl']));

							self.TmpCtn = CodeMirror.fromTextArea($('#'+self.type+'TmpCtn textarea', $el)[0], {
								mode:  "python",
								readOnly: true,
								lineNumbers:true
							});
							self.TmpCtn.setValue(cacheConfig.data.splitScript||'');
						}else if (self.type == 'afe') {
							// 报文
							$('.message-group', $el).html(self.templates['msg-tpl'](cacheConfig['msg-tpl']))
													.append(self.templates['msg-param-tpl']);
							$('[data-type=messageSelect]').trigger('change');
						}
					} else { // 选中字段节点

						if(self.type != 'afe'){
							$('.message-group', $el).html(self.templates['field-tpl'](cacheConfig['field-tpl']));
							
							$('#container', $el).append(self.templates['script-field--param-tpl'](cacheConfig['script-field--param-tpl']));

							if (self.type == 'java') {
								self.TmpCtn = CodeMirror.fromTextArea($('#'+self.type+'TmpCtn textarea', $el)[0], {
									mode:  "groovy",
									readOnly: false,
									lineNumbers:true
								});
							}else{
								self.TmpCtn = CodeMirror.fromTextArea($('#'+self.type+'TmpCtn textarea', $el)[0], {
									mode:  "python",
									readOnly: false,
									lineNumbers:true
								});
							}
							
							self.TmpCtn.setValue(cacheConfig.data.fieldScript||'');
						}else{
							// afe类型
							$('.message-group', $el).html(self.templates['field-tpl'](cacheConfig['field-tpl']));
							if(cacheConfig.Parameter && cacheConfig.Parameter.length > 0){
								$('#container', $el).append(self.templates['msg-param-tpl']);
								$('.parameter-div', $el).html(self.templates['param-tpl']({
									maxWidth: 6.4 + 'em',
									compWidth: (6.4 + 2) + 'em',
									Parameter: cacheConfig.Parameter
								}));
							}else{
								var messageType = self.cache[cacheConfig.parentId].messageType;
								var messageConfig = self.messageConfig.fieldDict[messageType];

								cacheConfig.Parameter = $.extend(true, [], messageConfig);

								if (cacheConfig.Parameter.length > 0) {
									$('#container', $el).append(self.templates['msg-param-tpl']);
									$('.parameter-div', $el).html(self.templates['param-tpl']({
										maxWidth: 6.4 + 'em',
										compWidth: (6.4 + 2) + 'em',
										Parameter: cacheConfig.Parameter
									}));
								}
							}
							
							$('#container', $el).append(self.templates['field-param-tpl']);
							if(cacheConfig.TableData){
								$('[data-role=fieldTable]', $el).trigger('addData',{data:cacheConfig.TableData});
							}else{
								cacheConfig.TableData = [];
							}
						}
					}

					// $('#container', $el).append(self.templates['button-tpl'](cacheConfig['button-tpl']));
				});
			},

			_bindAfeEvent: function () {
				var $el = this.$el,
					self = this;
				$('#container', $el)
					// 表格中函数分类下拉菜单选择
					.on('change', '[data-role=funcClass]', function (e, funcClass, func) {
						var funcClass = funcClass ? funcClass : $(this).val(),
							functionTemplateParameter = {
								functionSelect: self.functionConfig.functionDict[funcClass].Function,
								DefaultValue: func ? func : self.functionConfig.functionDict[funcClass].Function[0].FuncName
							},
							$tr = $(this).closest('tr');
						e.stopPropagation();
						if (!e.isTrigger) {
							$tr.trigger('clearConfig');
						}
						$('td:eq(1)', $tr).html(self.templates['table-func-tpl'](functionTemplateParameter));
						$('[data-role=func]', $tr).trigger('change');

					})
					// 表格中函数下拉菜单选择
					.on('change', '[data-role=func]', function (e) {
						var $this = $(this),
							$funcClass = $this.closest('tr').find('[data-role=funcClass]'),
							func = $this.val(),
							funcClass = $funcClass.val(),
							cfg,
							param,
							maxWidth = 0;

						if (e.isTrigger) {
							cfg = $this.closest('tr').data('cfg');
							param = cfg ? cfg.parameters : self.functionConfig.functionParameterDict[funcClass][func];
						} else {
							$this.closest('tr').trigger('clearConfig');
							param = self.functionConfig.functionParameterDict[funcClass][func];
						}

						param.forEach(function (val) {
							if (val.Name.length > maxWidth) {
								maxWidth = val.Name.length;
							}
						});
						$('.message-right .parameter-div:eq(2)').html(self.templates['func-tpl']({
							Parameter: param,
							maxWidth: maxWidth + 'em',
							compWidth: (maxWidth + 2) + 'em'
						}));
					})
					// 点击表格添加按钮
					.on('click', '#add', function () {
						$('[data-role=fieldTable]', $el).trigger('addData');
					})
					// 点击表格插入按钮
					.on('click', '#insert', function () {
						var activeTr = $('[data-role=fieldTable] tr.selected', $el);
						if (activeTr.length === 0) {
							app.alert('请先选择要插入的位置');
							return;
						}
						$('[data-role=fieldTable]', $el).trigger('insertData', [activeTr]);
					})
					// 点击表格删除按钮
					.on('click', '#remove', function () {
						$('[data-role=fieldTable]', $el).trigger('removeData');

						$(this).parent().next().empty();
					})
					// 选中表格一行
					.on('click', '[data-role=fieldTable] tr', function () {
						var $this = $(this),
							preSeleted = $this.parent().children('tr.selected').length;//整个表格行选中个数
							$selected = $this.siblings('tr.selected');

						if ($this.attr('data-state')) {
							return;
						}

						saveActiveRowData($selected);
						$this.addClass('selected');
						$selected.removeClass('selected');

						if ($selected.length !== 0 || !preSeleted) {
							$this.find('[data-role=func]').trigger('change');
						}
					})
					// 清理data数据
					.on('clearConfig', '[data-role=fieldTable] tr', function () {
						$(this).removeData('cfg');
					})
					// 表格新增一行
					.on('addData', '[data-role=fieldTable]', function (e, data) {
						var $table = $(this),
							freeSize = parseInt($table.attr('data-free-size')),
							tableLength = parseInt($table.attr('data-length'));

						if (data) {
							data.data.forEach(function (element, index) {
								tableAddRow($table, freeSize === 0 ? 0 : freeSize--, tableLength++, self.functionConfig.functionClassSelect, element[self.CONSTANT.FIELD_TABLE_COLS[0]], element[self.CONSTANT.FIELD_TABLE_COLS[1]], element.cfg);
							});
						} else {
							tableAddRow($table, freeSize, tableLength, self.functionConfig.functionClassSelect, self.functionConfig.functionClassSelect[0].ClassName);
						}
					})
					// 表格插入一行
					.on('insertData', '[data-role=fieldTable]', function (e, $activeTr) {
						var $table = $(this),
							freeSize = parseInt($table.attr('data-free-size')),
							tableLength = parseInt($table.attr('data-length')),
							$preTr = $activeTr.prev('tr:first'),
							$tr = $(self.templates['table-empty-tr-tpl']()),
							$selected = $table.siblings('tr.selected');

						saveActiveRowData($selected);

						// 表格已放满
						if (freeSize === 0) {
							$table.attr('data-length', ++tableLength);
						} else {
							$table.attr('data-free-size', --freeSize);
						}

						// 插入到第一个节点之前
						if ($preTr.length === 0) {
							$table.find('tbody tr:first').before($tr);
						} else {
							$activeTr.before($tr);
						}

						$('td:eq(0)', $tr).html(self.templates['table-class-tpl']({
							functionClassSelect: self.functionConfig.functionClassSelect,
							DefaultValue: self.functionConfig.functionClassSelect[0].ClassName
						}));

						$('select:first', $tr).trigger('change', [self.functionConfig.functionClassSelect[0].ClassName]);
						$tr.removeAttr('data-state')
							.addClass('selected')
							.siblings('tr.selected').removeClass('selected');

						$table.find('tbody tr[data-state]:last').remove();
					})
					// 表格删除一行
					.on('removeData', '[data-role=fieldTable]', function (e) {
						var $this = $(this),
							freeSize = parseInt($this.attr('data-free-size')),
							tableLength = parseInt($this.attr('data-length')),
							$target = $this.find('tr.selected');

						if ($target.length === 0) {
							return;
						}

						$target.remove();

						if (tableLength === 7) {
							$this.attr('data-free-size', ++freeSize);
							$this.find('tbody').append(self.templates['table-empty-tr-tpl']());
						} else {
							$this.attr('data-length', --tableLength);
						}
					})

					// 报文类型改变
					.on('change', '[data-type=messageSelect]', function(event) {
						var msgType = $(this).val(),
							$this = $(this),
							oldType = $this.attr('data-name');
							$messageObject = $('a.selected[data-role="message"]', self.$el);
							id = $messageObject.attr('id');

						if (self.cache[id].messageType && msgType !== self.cache[id].messageType) {
							app.confirm({
								title: '确认',
								content: '更改报文类型将会丢失当前报文的所持有参数，是否更改？',
								btnConfirm: '是',
								btnCancel: '否',
								confirmHandler: function () {
									$this.attr('data-name', msgType);
									// 更换类型
									var dataClass = $this.find('option:selected').attr('data-class');
									$this.parent().next().children('input').val(dataClass);
									self.cache[id].dataClass = dataClass;
									self.cache[id].messageType = msgType;
									$messageObject.html('<img src="img/logInfoConfigManage/branch.png" alt="">\
										<span>'+msgType+'</span>');

									self.cache[id].Parameter = $.extend(true, [], self.messageConfig.messageParameterDict[msgType]);
									
									$('.parameter-div', $el).html(self.templates['param-tpl']({
										maxWidth: 6.4 + 'em',
										compWidth: (6.4 + 2) + 'em',
										Parameter: self.cache[id].Parameter
									}));
									self.cache[id]['msg-tpl'].DefaultValue = msgType;

									// 清理子字段数据
									var children = self.cache[id].childrenId;
									if(children){
										for (var i = 0; i < children.length; i++) {
											if($('#'+children[i], $('.message-left', self.$el)).attr('data-role') == 'field'){
												self.cache[children[i]].Parameter = [];
												self.cache[children[i]].TableData = [];
											}
										}
									}
								},
								cancelHandler: function () {
									$this.val(oldType);
								},
								context: $el,
							});
						} else {
							$this.attr('data-name', msgType);
							self.cache[id].messageType = msgType;
							// 更换类型
							var dataClass = $this.find('option:selected').attr('data-class');
							$this.parent().next().children('input').val(dataClass);
							self.cache[id].dataClass = dataClass;
							$messageObject.html('<img src="img/logInfoConfigManage/branch.png" alt="">\
										<span>'+msgType+'</span>');

							if(!self.cache[id].Parameter){
								self.cache[id].Parameter = $.extend(true, [], self.messageConfig.messageParameterDict[msgType]);
							}
							
							$('.parameter-div', $el).html(self.templates['param-tpl']({
										maxWidth: 6.4 + 'em',
										compWidth: (6.4 + 2) + 'em',
										Parameter: self.cache[id].Parameter
									}));
							self.cache[id]['msg-tpl'].DefaultValue = msgType;
						}
					});

					/**
					 * 保存选中行的业务数据
					 * @param {string} 当前激活行  
					 */
					function saveActiveRowData($this) {
						if ($this && $this.length > 0) {
							var funcClass = $this.find('select[data-role=funcClass]').val(),
								func = $this.find('select[data-role=func]').val(),
								data = {
									funcClass: funcClass,
									func: func,
									parameters: []
								},
								$context = $('.parameter-div:eq(2)', $el);

							$.extend(true, data.parameters, self.functionConfig.functionParameterDict[funcClass][func]);
							data.parameters.forEach(function (val, index) {
								val.DefaultValue = $('[data-name=' + val.Name + ']', $context).val();
							});
							$this.data('cfg', data);
						}
					}
					
					/**
					 * 表格添加数据
					 * @param {*}  
					 * @param {*} freeSize 
					 * @param {*} tableLength 
					 * @param {*} functionClassSelect 
					 * @param {*} DefaultValue 
					 * @param {*} funcDefaultValue 
					 * @param {*} cfg 
					 */
					function tableAddRow($table, freeSize, tableLength, functionClassSelect, DefaultValue, funcDefaultValue, cfg) {
						var $selected = $table.find('tr.selected');

						saveActiveRowData($selected);

						// 表格已放满
						if (freeSize === 0) {
							$table.find('tbody').append(self.templates['table-empty-tr-tpl']());
							$table.attr('data-length', ++tableLength);
						} else {
							$table.attr('data-free-size', --freeSize);
						}

						var $tr = $('[data-state=empty]:eq(0)', $table);
						$('td:eq(0)', $tr).html(self.templates['table-class-tpl']({
							functionClassSelect: functionClassSelect,
							DefaultValue: DefaultValue
						}));

						$('select:first', $tr).trigger('change', [DefaultValue, funcDefaultValue]);
						$tr.removeAttr('data-state')
							.addClass('selected')
							.siblings('tr.selected').removeClass('selected');

						if (cfg) {
							$tr.data('cfg', cfg);
							$tr.find('[data-role=func]').trigger('change');
						}
					}

			},

			/**
			 * 添加字段节点
			 * @param {jquery对象} $element 父报文节点
			 * @param {String} title    字段节点名称
			 */
			_addTreeNode: function($element,title) {
				if(this.type == 'afe'){
					var $ul = $element.next(),
						uniqueId = this.index++;
					if ($ul.length > 0) {
						$ul.append(this.templates['tree-node-tpl']({
							afe: true,
							id: uniqueId,
							title: title||'字段'
						}));
					} else {
						$element.before('<i class="fa fa-angle-right"></i>');
						$element.after('<ul class="field">' + this.templates['tree-node-tpl']({
							afe: true,
							id: uniqueId,
							title: title||'字段'
						}) + '</ul>');
					}
					
					this._bindSortable();
				}else{
					var $ul = $element.next(),
						uniqueId = this.index++;
					if ($ul.length > 0) {
						$ul.append(this.templates['tree-node-tpl']({
							id: uniqueId,
							title: title||'字段'
						}));
					} else {
						$element.before('<i class="fa fa-angle-right"></i>');
						$element.after('<ul class="field">' + this.templates['tree-node-tpl']({
							id: uniqueId,
							title: title||'字段'
						}) + '</ul>');
					}
				}

				return uniqueId;
			},

			/**
			 * 添加报文节点
			 * @param  {jquery对象} $element 父字段节点
			 * @param {String} title 字段节点名称
			 * @return {int} uniqueId 生成的报文节点id
			 */
			_addMessageNode: function ($element,title) {
				var $ul = $element.next(),
					uniqueId = this.index++;
				if($ul.length > 0){
					$ul.append(this.templates['tree-Message-tpl']({
						id: uniqueId,
						title: title||'定长报文'
					}));
				}else{
					$element.before('<i class="fa fa-angle-right"></i>');
					$element.after('<ul class="message">' + this.templates['tree-Message-tpl']({
						id: uniqueId,
						title: title||'定长报文'
					}) + '</ul>');
				}

				this._bindSortable();
				return uniqueId;
			},

			/**
			 * 菜单拖拽事件
			 * @return {[type]} [description]
			 */
			_bindSortable: function () {
				var self = this;
				$( ".message-left>ul ul.message",this.$el).sortable({
					axis:'y',
					scroll: false,
					opacity: 0.6,
					dropOnEmpty: true,
					cursor: 'move',
					connectWith: '.message',
					placeholder: 'ui-state-highlight',
					/**
					 * 排序
					 */
					stop: function(event, ui){
						self._changeItem(event, ui, $(this));
					}
				});

				$( ".message-left>ul ul.field",this.$el).sortable({
					axis:'y',
					scroll: false,
					opacity: 0.6,
					dropOnEmpty: true,
					cursor: 'move',
					connectWith: '.field',
					placeholder: 'ui-state-highlight',
					stop: function(event, ui){
						self._changeItem(event, ui, $(this));
					}
				});

				$( ".message-left>ul ul",this.$el).disableSelection();
			},

			/**
			 * 改变菜单位置
			 * @param  {[type]} event [description]
			 * @param  {[type]} ui    [description]
			 * @return {[type]}       [description]
			 */
			_changeItem: function (event, ui, element) {
				var self = this,
					newParentId = ui.item.parent().prev().attr('id'),
					index = ui.item.index(),
					currentItemId = parseInt(ui.item.children('a').attr('id')),
					oldParentId = self.cache[currentItemId].parentId;
				// 父节点更改
				if(newParentId != oldParentId){
					var oldMT = self.cache[oldParentId].messageType,
						newMT = self.cache[newParentId].messageType;
					// 父节点messageType不同
					if(oldMT && oldMT != newMT){
						app.confirmDialog({
							sTitle:"确认",    
			                sType:"warn",
			                sContent:'新节点与原节点的报文类型不同，继续移动将更改该字段的报文类型，并丢失该字段所持有的参数，是否继续？',
			                sBtnConfirm: '是',
			                sBtnCancel: '否',
			                fnConfirmHandler: function(){
			                	// 删除旧节点的绑定
			                	var oldChildren = self.cache[oldParentId].childrenId;
			                	var oldIndex = oldChildren.indexOf(currentItemId);
			                	oldChildren.splice(oldIndex,1);

			                	// 增加新节点的绑定
			                	self.cache[currentItemId].parentId = newParentId;
			                	self.cache[newParentId].childrenId.splice(index, 0, currentItemId);

			                	// 清除当前节点参数
			                	self.cache[currentItemId].Parameter = [];
			                	self.cache[currentItemId].TableData = [];
			                },
			                fnCancelHandler: function(){
			                	// 取消节点排序
			                	element.sortable( 'cancel' );
			                },
			                aArgs: []
						})
					}else{

						// 删除旧节点的绑定
						var oldChildren = self.cache[oldParentId].childrenId;
						var oldIndex = oldChildren.indexOf(currentItemId);
						oldChildren.splice(oldIndex,1);

						// 增加新节点的绑定
						self.cache[currentItemId].parentId = newParentId;
						self.cache[newParentId].childrenId.splice(index, 0, currentItemId);
					}
				}
				// 交换节点顺序
				else{
					var newChildArr = self.cache[newParentId].childrenId,
						newChildCount = newChildArr.length,
						oldIndex = newChildArr.indexOf(currentItemId);
					if(oldIndex == index){
						return;
					}

					if(!newChildCount){
						self.cache[newParentId].childrenId.push(currentItemId);
					}else{
						newChildArr.splice(oldIndex, 1);
						newChildArr.splice(index, 0, currentItemId);
					}
				}
			},

			/**
			 * 保存当前脚本配置数据
			 * @return {[type]} [description]
			 */
			_saveScriptConfigData: function () {
				var self = this;
				var $selectObj = $($('.message-left a.selected', self.$el)[0]);
				var id = $selectObj.attr('id');

				if(!id || $selectObj.attr('data-role') == 'message'){
					return;
				}

				var tmpData = {};

				$('.message-group', self.$el).find('select,input').each(function () {
					var $this = $(this);
					tmpData[$this.attr('data-name')] = $this.val();
				});
				tmpData.fieldScript = self.TmpCtn.getValue();

				var text = tmpData.outerFieldName;
				if(tmpData.outerFieldDesc){
					text += ' ( '+tmpData.outerFieldDesc+' )';
				}
				$('#'+id, self.$el).children('span').text(text);

				var resultData = {
					data:{
						fieldScript:tmpData.fieldScript,
						fieldKey:tmpData.outerFieldName,
						fieldType:tmpData.outerFieldType,
						fieldDesc:tmpData.outerFieldDesc,
						defaultKey:tmpData.outerFieldDefaultValue
					},
					'field-tpl': {
						outerFieldName: tmpData.outerFieldName || '',//外部字段名称
						outerFieldType: tmpData.outerFieldType || 'String',//外部字段类型
						outerFieldDefaultValue:tmpData.outerFieldDefaultValue || '',//外部字段缺省值
						outerFieldDesc: tmpData.outerFieldDesc || '',//外部字段说明
						outerFieldTypeArray: self.CONSTANT.OUTER_FIELD_TYPE
					}
				}

				$.extend(self.cache[id], resultData);
			},

			/**
			 * 保存当前afe配置数据
			 * @return {[type]} [description]
			 */
			_saveAfeConfigData: function () {
				var self = this;
				var $selectObj = $($('.message-left a.selected', self.$el)[0]);
				var id = $selectObj.attr('id');

				if(!id){
					return;
				}

				var cacheConfig = self.cache[id];
				var tmpData = {};
				
				//字段
				if($selectObj.attr('data-role') == 'field'){
					//字段域
					$('#container .message-group', self.$el).find('select,input').each(function () {
						var $this = $(this);
						tmpData[$this.attr('data-name')] = $this.val();
					});

					$('#'+id, self.$el).children('span').text(tmpData.outerFieldName);

					cacheConfig.data = {
						// fieldScript:tmpData.fieldScript,
						fieldKey:tmpData.outerFieldName,
						fieldType:tmpData.outerFieldType,
						fieldDesc:tmpData.outerFieldDesc,
						defaultKey:tmpData.outerFieldDefaultValue
					}

					cacheConfig['field-tpl'] = {
						afe: 'true',//是否显示外部字段值
						outerFieldName: tmpData.outerFieldName || '',//外部字段名称
						outerFieldType: tmpData.outerFieldType || 'String',//外部字段类型
						outerFieldValue: tmpData.outerFieldValue || '',//外部字段值
						outerFieldDefaultValue:tmpData.outerFieldDefaultValue || '',//外部字段缺省值
						outerFieldDesc: tmpData.outerFieldDesc || '',//外部字段说明
						outerFieldTypeArray: self.CONSTANT.OUTER_FIELD_TYPE
					}
				}
				
				// 参数域
				cacheConfig.Parameter.forEach(function (val, index) {
					val.DefaultValue = $('[data-name=' + val.Name + ']', self.$el).val();
				});

				// 打包列表
				if(cacheConfig.TableData){
					cacheConfig.TableData = [];
					this._saveActiveRowData($('tr.selected', self.$el));
					$('[data-role=fieldTable] tbody>tr:not([data-state])', self.$el).each(function () {
						var $this = $(this),
							fieldFunc = {};

						$('select', $this).each(function (index, element) {
							fieldFunc[self.CONSTANT.FIELD_TABLE_COLS[index]] = $(element).val();
						});
						fieldFunc.cfg = $this.data('cfg');

						cacheConfig.TableData.push(fieldFunc);
					});
				}
			},

			/**
			 * 打包字段方法列表
			 * @param  {array} $trs 列表
			 * @return {[type]}
			 */
			_saveActiveRowData: function ($trs) {
				if ($trs && $trs.length > 0) {
					var funcClass = $trs.find('select[data-role=funcClass]').val(),
						func = $trs.find('select[data-role=func]').val(),
						data = {
							funcClass: funcClass,
							func: func,
							parameters: []
						},
						$el = this.$el,
						$context = $('.parameter-div:eq(2)', $el);

					$.extend(true, data.parameters, this.functionConfig.functionParameterDict[funcClass][func]);
					data.parameters.forEach(function (val, index) {
						val.DefaultValue = $('[data-name=' + val.Name + ']', $context).val();
					});
					$trs.data('cfg', data);
				}
			},

			/**
			 * 解析初始化参数
			 * @return {[type]}
			 */
			_parseData:function () {
				var configData = {},
					self = this,
					data = self.data;

				if(self.type == "afe"){
					// 远程获取配置
					$.ajax({
							url: "LogCfgAction_getEciCommonConfig.do",
							async: false
					}).done(function (data) {
						if (!data || !data.status) {
							app.alert('获取配置数据失败！');
							return;
						}
						var config = self._parseConfig(data.content.result);
						var messageConfig = self.messageConfig = config.messageConfig;
						var functionConfig = self.functionConfig = config.functionConfig;

						configData.defaultConfig = {
							data:{},
							parentId:'',
							childrenId:[],
							'field-tpl': {
								afe: 'true',//是否显示外部字段值
								outerFieldName:'字段',//外部字段名称
								outerFieldType:'String',//外部字段类型
								outerFieldValue: '',//外部字段值
								outerFieldDefaultValue:'',//外部字段缺省值
								outerFieldDesc:'',//外部字段说明
								outerFieldTypeArray: self.CONSTANT.OUTER_FIELD_TYPE
							},//字段初始化参数

							'button-tpl': {
								id: self.type+'Btn',
								name: '拆分'
							}
						}
						
						configData.messageDefaultConfig = {
							data:{},
							parentId:'',
							childrenId:[],
							'msg-tpl': {
								messageSelect: messageConfig.messageSelect,
								DefaultValue: ''
							},

							'button-tpl': {
								id: self.type+'Btn',
								name: '拆分'
							}
						}

						if(self.data.splitScript && self.data.splitScript != ''){
							var splitScript = JSON.parse(self.data.splitScript);
							// debugger;
							$.extend(true,configData,self._parseAfeData(splitScript.messagemap.message,self.data.splitFields));
						}else{
							configData.treeRoot = {
								data:{},
								childrenId:[],
								'msg-tpl': {
									messageSelect: messageConfig.messageSelect,
									DefaultValue: ''
								},

								'button-tpl': {
									id: self.type+'Btn',
									name: '拆分'
								}
							}
						}	
					});

				}else{
					// 根结点配置
					configData.treeRoot = {
						data:data,
						'script-msg-tpl': {
							name:self.type,
							contentHeight:'450px',
							id: self.type+'TmpCtn'
						},
						'button-tpl': {
							id: self.type+'Btn',
							name: '拆分'
						}
					}
					// 默认配置
					configData.defaultConfig = {
						data:{
							fieldScript:'',//脚本
							statisticsFlag: 0//统计状态
						},
						'field-tpl': {
							outerFieldName:'字段',//外部字段名称
							outerFieldType:'String',//外部字段类型
							outerFieldDefaultValue:'',//外部字段缺省值
							outerFieldDesc:'',//外部字段说明
							outerFieldTypeArray: self.CONSTANT.OUTER_FIELD_TYPE
						},//字段初始化参数

						'script-field--param-tpl': {
							name:self.type,
							contentHeight:'330px',
							id: self.type+'TmpCtn'
						},//脚本初始化

						'button-tpl': {
							id: self.type+'Btn',
							name: '拆分'
						}
					}

					if(!data.splitFields){
						return configData;
					}
					
					var fields = data.splitFields;

					for (var i = 0; i < fields.length; i++) {

						var text = fields[i].fieldKey||'';
						if(fields[i].fieldDesc){
							text += ' ( '+fields[i].fieldDesc+' )';
						}
						var id = self._addTreeNode($('#treeRoot', self.$el),text);

						configData[id] = {
							data: fields[i],
							'field-tpl': {
								outerFieldName: fields[i].fieldKey || '',//外部字段名称
								outerFieldType: fields[i].fieldType || 'String',//外部字段类型
								outerFieldDefaultValue:fields[i].defaultKey || '',//外部字段缺省值
								outerFieldDesc: fields[i].fieldDesc || '',//外部字段说明
								outerFieldTypeArray: self.CONSTANT.OUTER_FIELD_TYPE
							},//字段初始化参数

							'script-field--param-tpl': {
								name:self.type,
								contentHeight:'330px',
								id: self.type+'TmpCtn'
							},//脚本初始化

							'button-tpl': {
								id: self.type+'Btn',
								name: '拆分'
							}
						}
					}

				}

				return configData;
			},

			/**
			 * afe配置数据转换为页面配置
			 * @param  {Object} data afe数据
			 * @return {Object}      页面配置
			 */
			_parseAfeData: function(data,fields){
				var self = this;
				var parameter;

				var paramCfg = self.messageConfig.fieldDict[data.type];
				if(paramCfg){
					parameter = []
					for(var i=0; i<paramCfg.length; i++){
						parameter.push($.extend(true,{}, paramCfg[i], {DefaultValue:data.parameter[i].value}));
					}
				}

				var configData = {};
				configData.treeRoot = {
					data:{},
					childrenId:[],
					'msg-tpl': {
						messageSelect: self.messageConfig.messageSelect,
						DefaultValue: data.type
					},

					'button-tpl': {
						id: self.type+'Btn',
						name: '拆分'
					},
					messageType: data.type,
					Parameter:parameter
				}

				var parentId = 'treeRoot';
				
				paseData(configData,data.fields,fields,parentId);
				 
				function paseData(configData,data,fields,parentId) {
					if(data && data.length > 0){
						
						for (var i = 0; i < data.length; i++) {
							// 字段节点
							if(data[i].method){
								var id = self._addTreeNode($('#'+parentId, self.$el),data[i].fieldname);
								configData[parentId].childrenId.push(id);
								var parameter = [];

								var paramCfg = self.messageConfig.fieldDict[configData[parentId].messageType];
								if(paramCfg){
									for(var j=0; j<paramCfg.length; j++){
										parameter.push($.extend(true,{}, paramCfg[j], {DefaultValue:data[i].parameter[j].value}));
									}
								}
								// 组织tableData数据
								var tableData = [];
								if(data[i].method.length>0){
									for(var j=0; j < data[i].method.length; j++){
										var method = data[i].method[j],
											funcClass = method.name.split('.')[0],
											func = method.name.split('.')[1],
											funParameters = method.parameter.split(','),
											resultPara = [],
											funparamcfg = self.functionConfig.functionParameterDict[funcClass][func];

										if(funparamcfg){
											for (var k = 0; k < funparamcfg.length; k++) {
												resultPara.push($.extend(true,{}, funparamcfg[k], {
													DefaultValue:funParameters.shift()
												}))
											}
										}
										tableData.push({
											funcClass:funcClass,
											func:func,
											cfg:{
												funcClass:funcClass,
												func:func,
												parameters:resultPara
											}
										})
									}
								}

								configData[id] = {
									data:fields.shift(),
									parentId:parentId,
									Parameter:parameter,
									TableData:tableData,
									childrenId:[],
									'button-tpl':{
										id: self.type+'Btn',
										name: '拆分'
									},
									'field-tpl':{
										afe: 'true',//是否显示外部字段值
										outerFieldName:data[i].fieldname||'',//外部字段名称
										outerFieldType:data[i].fieldtype||'String',//外部字段类型
										outerFieldValue: data[i].packexpr[0].expr||'',//外部字段值
										outerFieldDefaultValue: data[i].fielddefaultvalue||'',//外部字段缺省值
										outerFieldDesc:data[i].fielddescription||'',//外部字段说明
										outerFieldTypeArray: self.CONSTANT.OUTER_FIELD_TYPE
									}
								}
								// 处理子节点
								if(data[i].message && data[i].message.length>0){
									paseData(configData,data[i].message,fields,id);
								}

							}
							// 报文节点
							else{
								var id = self._addMessageNode($('#'+parentId, self.$el),data[i].type);
								configData[parentId].childrenId.push(id);
								var parameter = [];

								var paramCfg = self.messageConfig.fieldDict[data[i].type];
								if(paramCfg){
									for(var j=0; j<paramCfg.length; j++){
										parameter.push($.extend(true,{}, paramCfg[j], {DefaultValue:data[i].parameter[j].value}));
									}
								}

								configData[id] = {
									parentId:parentId,
									data:{},
									childrenId:[],
									'msg-tpl': {
										messageSelect: self.messageConfig.messageSelect,
										DefaultValue: data[i].type
									},

									'button-tpl': {
										id: self.type+'Btn',
										name: '拆分'
									},
									messageType: data[i].type,
									Parameter:parameter
								}

								// 处理子节点
								if(data[i].fields && data[i].fields.length>0){
									paseData(configData,data[i].fields,fields,id);
								}

							}
						}
					}
				}

				return configData;
			},

			/**
			 * 拼接脚本
			 * @return
			 */
			_stitchScript: function () {
				var self = this;
				var javaRegExp = /^import.*;/gm;//java脚本拆分
				var headScript = '';
				var script = '';

				for (var item in self.cache) {
					if (self.cache.hasOwnProperty(item)) {
						if ( item != 'treeRoot' && item != 'defaultConfig') {
							var tmpScript = self.cache[item].data.fieldScript;

							if(self.type == 'java' && javaRegExp.test(tmpScript)){
								var tmpMatchArr = tmpScript.match(javaRegExp);

								tmpMatchArr.map(function(elem, index) {
									headScript += elem+'\n';
								})

								tmpScript = tmpScript.replace(javaRegExp,'');
								tmpScript = tmpScript.replace(/\n\n\n/gm,'');
							}

							script += tmpScript+'\n';
						}
					}
				}
				
				if(self.type == 'java'){
					script = headScript + 'public class Test {\n' + script +'}';
				}else if(self.type == 'python'){
					script = '# -*- coding:utf-8 -*-\n\n' + headScript + script;
				}else{
					script = headScript + script;
				}
				
				self.data.splitScript = script;
				self.cache['treeRoot'].data.splitScript = script;
			},
			
			/**
			 * afe配置解析
			 * @param  {[type]}
			 * @return {[type]}
			 */
			_parseConfig: function (data) {
				return {
					// 解析报文部分
					messageConfig: this._parseMessagePart(data.AllMessageMap),
					// 解析函数部分
					functionConfig: this._parseFunctionPart(data.FunctionFormatLib)
				};
			},

			/**
			 * afe解析报文部分参数
			 * @param {object} msgs 
			 */
			_parseMessagePart: function(msgs) {
				var messageSelect = [],
					messageParameterDict = {},
					fieldDict = {};
				msgs.forEach(function (val, index) {
					messageParameterDict[val.FormatName] = val.Parameter;
					messageSelect.push({
						'value': val.FormatName,
						'className': val.ClassName,
						'parameter': val.Parameter
					});
					fieldDict[val.FormatName] = val.Field;
				});
				return {
					messageSelect: messageSelect,
					messageParameterDict: messageParameterDict,
					fieldDict: fieldDict
				}
			},

			/**
			 * afe字段方法 配置解析
			 * @param {object} data 
			 */
			_parseFunctionPart:	function (funcs) {
				var functionClassSelect = funcs,
					functionDict = {},
					functionParameterDict = {};

				funcs.forEach(function (val) {
					functionDict[val.ClassName] = val;
					functionParameterDict[val.ClassName] = {};
					val.Function.forEach(function (func) {
						functionParameterDict[val.ClassName][func.FuncName] = func.Parameter;
					});
				});

				return {
					functionClassSelect: functionClassSelect,
					functionDict: functionDict,
					functionParameterDict: functionParameterDict
				};
			}
		}

		return SplitConfiger;
	});

})();