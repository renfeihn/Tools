/*
 * @Author: Chen Liang
 * @Date: 2018-01-25 09:56:41
 * @Last Modified by: Chen Liang
 * @Last Modified time: 2018-02-09 16:00:32
 */
/* global undefined, define, $ */
;(function () {
  (function (factory) {
    'use strict'

    // amd module
    if (typeof define === 'function' && define.amd) {
      define(['template', 'underscore', 'script/lib/text!script/lib/customForm/views/template.html'], factory)
    } else {
      factory()
    }
  })(function (template, _, view) {
    'use strict'

    var fullDict

    var dictManager = (function () {
      var globalDtd

      /**
       * 初始化数据字典
       */
      var initDict = function () {
    	  var dtd = $.Deferred()
    	  $.ajax({
    		  url:'CMDBCommonAction_commonService.do',
    		  data:{
    			  'servicename':'cn.com.agree.aim.cmdb.service.common._cmdb_dict_manager',
    			  'method':'allnosys_dict_query',
    		  },
    		  type: 'POST',
    		  success: function (data) {
    			  var dicts = data.content.ret || []
    			  fullDict = convertToMap(dicts)
    			  dtd.resolve()
    		  }
    	  })
    	  return dtd.promise()
      }

      var getDict = function () {
        if (!globalDtd || globalDtd.state() === 'rejected') {
          globalDtd = $.Deferred()
          initDict()
            .done(function () {
              globalDtd.resolve()
            })
            .fail(function () {
              globalDtd.reject()
            })
        } else if (globalDtd.state() === 'resolved') {
          globalDtd.resolve()
        }
        return globalDtd.promise()
      }

      return {
        initDict: getDict
      }
    })()

    /**
     * 数据字段转换为map类型
     * @param {Array} data 数据字典原始数据
     * @private
     */
    var convertToMap = function (data) {
      var dicts = {}
      _.each(data, function (item) {
        if (!dicts[item.dictDefEname]) {
          dicts[item.dictDefEname] = [item]
        } else {
          dicts[item.dictDefEname].push(item)
        }
      })
      return dicts
    }

    // 初始化模板
    var $view = $('<div/>').html(view)
    var templates = {}
    $view.find('script').each(function () {
      var $this = $(this)
      templates[$this.attr('name')] = template.compile($this.html())
    })

    /**
     * 获取元素属性
     */
    template.defaults.imports.getProperty = function (props) {
      var propertyString = ''
      var property = _.omit(props, 'hide')
      for (var key in property) {
        if (['readonly', 'required'].indexOf(key) > 0) {
          if (key === 'readonly' && property['readonly'] === '是') {
        	  propertyString += key + ' '
          }
          if (key === 'required' && property['required'] === '是') {
        	  propertyString += key + ' '
          }
        } else {
          propertyString += key + '="' + props[key] + '" '
        }
      }
      return propertyString
    }

    /**
     * URLencode
     */
    template.defaults.imports.encode = function (value) {
      return encodeURI(value)
    }

    /**
     * 获取外层元素属性
     */
    template.defaults.imports.getOutterProperty = function (props) {
      var propertyString = ' '

      _.each(['readonly', 'hide', 'required'], function (key) {
        if (_.has(props, key)) {
          if (props[key] === '是') {
        	  propertyString += key + ' '
          }
        }
      })
      _.each(['isNew'], function (key) {
        if (_.has(props, key)) {
          if (props[key] === true) {
        	  propertyString += 'isNew' + ' '
          }
        }
      })
      return propertyString
    }

    /**
     * 获取数据字典转义值
     */
    template.defaults.imports.escape = function (option, value) {
      var dict = fullDict[option]
      for (var i = 0; i < dict.length; i++) {
        if (dict[i].dictvalue === value) return dict[i].dictvaluedesc
      }
      return undefined
    }

    /**
     * checkbox是否选中
     */
    template.defaults.imports.ifChecked = function (vals, value) {
      if (!(vals instanceof Array)) {
        return false
      }
      return vals.indexOf(value) > -1
    }

    /**
     * 参数校验
     * @param {object} config 配置参数
     * @param {object} data 表单数据
     * @private
     */
    var validate = function (config, data) {
      if (!config.formDef) {
        $.error('formDef is undefined')
      }
      if (!_.isArray(config.formDef)) {
        $.error('formDef is not array')
      }
      if (data && !_.isObject(data)) {
        $.error('data is not object')
      }
    }

    /**
     * 确保props转换为object类型
     * @param {string/object} props 属性参数
     * @private
     */
    var verifyProps = function (props) {
      if (_.isString(props)) {
        return props === '' ? {} : JSON.parse(props)
      } else {
        return props
      }
    }

    /**
     * 构建单个组件
     * @param {object} config 配置数据
     * @private
     */
    var buildSingle = function (config) {
      var buildConfig = $.extend({}, config)
      
      buildConfig.props = verifyProps(config.props)
      if (!buildConfig.props) {
    	  return '';
      }
      buildConfig.dicts = buildConfig.props['option'] ? fullDict[buildConfig.props['option']] : (buildConfig.props.groups && buildConfig.props.groups['firstLevelOption'] ? fullDict[buildConfig.props.groups['firstLevelOption']] : [{dictvalue: '', dictvaluedesc: ''}])
      if (!templates[config.type]) {
        console.error('templates of [%s] not exist', config.type)
      }
      if(config.type === '标签页'){
        config.props.forms.forEach(function(tab_form, index_form){
          buildConfig.props.forms[index_form].tabForm = buildTree($.extend(true, {}, tab_form), config.props.value, true);
        });
      }
      if (buildConfig.props.attrStatus === -1) {
    	  return '';
      }
      return templates[config.type] ? templates[config.type](buildConfig) : ''
    }

    /**
     * 重构表单配置数据，生成树形结构
     * @param {object} config 表单配置
     * @private
     */
    var makeTree = function (config) {
      var tree = {
        seq: []
      }
      _.each(config, function (single) {
        // 子节点
        if (_.has(single, 'pid')) {
          _.defaults(tree[single.pid], {
            root: null,
            children: []
          })
          if (!tree[single.pid].children) {
            tree[single.pid].children = [single]
          } else {
            tree[single.pid].children.push(single)
          }
        } else {
          if (!tree[single.id]) {
            tree[single.id] = {
              root: single,
              children: []
            }
          } else if (!tree[single.id].root) {
            tree[single.id].root = single
          }
          tree.seq.push(single.id)
        }
      })
      return tree
    }

    /**
     * 融合表单数据及组件配置
     * @param {object} config 组件配置数据
     * @param {object} data 表单数据
     */
    var patchValue = function (config, data) {
      if (!data) {
        return
      }
      // 补充数值
      if(config.type === '标签页'){
        config.props.value = data || ''
      }else if(config.type === '级联选择' || config.type === '多选'){
        try {
        	config.props.value = JSON.parse(data[config.ename])
		} catch (e) {
			config.props.value = "";
		}
      }else{
        config.props.value = data[config.ename] !== null && data[config.ename] !== undefined ?data[config.ename]: '';
      }
      // 补充标志位
      config.hasData = true
    }

    /**
     * 构建fieldset
     * @param {object} root fieldset
     * @param {objet} children 子元素
     * @param {object} data 表单数据
     */
    var buildFieldSet = function (root, children, data) {
      var body = ''
      
      _.each(children, function (config) {
        patchValue(config, data)
        body += buildSingle(config)
      })
      return buildSingle(_.extend(root, {body: body}))
    }

    /**
    * 构建组件
    * @param {object} config 配置数据
    * @param {object} data 表单数据
    * @private
    */
    var buildTree = function (config, data, sign) {
      var body = ''
      var tree = makeTree(config.formDef, data)
      _.each(tree.seq, function (id) {
        body += buildFieldSet(tree[id].root, tree[id].children, data)
      })
      
      if(sign === true){
        body = '<div class="diy-form {{layout}} {{history}}" >' + body + '</div>'
      } else {
        body = '<form class="diy-form {{layout}} {{history}}" >' + body + '</form>'
      }

      return body
        .replace(/{{layout}}/, config.formLayout ? 'row-layout' : '')
        .replace(/{{history}}/, data ? 'history-form' : '')
    }

    /**
     * 构建页面
     * @param {object} config 配置数据
     * @param {object} data 表单数据
     * @public
     * @example
     */
    function build (config, data) {
      var dtd = $.Deferred()
      validate(config, data)
      dictManager.initDict().done(function () {
        try {
          dtd.resolve(buildTree($.extend(true, {}, config), data))
        } catch (error) {
          console.error(error)
          dtd.reject(error)
        }
      })
      return dtd.promise()
    }

    return {
      build: build
    }
  })
})()
