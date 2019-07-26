/**
 * Created by lijiancheng@cfischina.com on 2015/10/29 0029.
 *
 * [aim_device tree AIM设备树组件]
 */



( /*<global>*/ function (undefined) {

    (function (factory) {
        "use strict";
        //amd module
        if (typeof define === "function" && define.amd) {
            define(["jquery"], factory);
        }
        //global
        else {
            factory();
        }
    })(function ($) {
        /*设备参数*/
        var DEVICE_PARAMS = {
            //银行 总行
            '0': {
                icon: '',                 //图标
                next: ['1', '2', '3', '4', '5'],//子集
                type: '0',                       //类型
                chineseName: '总行',           //中文名
                action: '',                      //后台操作类型
                page: {                          //前端转跳属性
                    moduleId: '',
                    section: ''
                }
            },
            //分行
            '1': {
                icon: 'building',                 //图标
                next: ['2', '3', '4', '5'],          //子集
                type: '1',                       //类型
                chineseName: '分行',           //中文名
                action: '',                      //后台操作类型
                page: {                          //前端转跳属性
                    moduleId: '',
                    section: ''
                }
            },
            //类
            '2': {
                icon: 'cogs',                 //图标
                next: ['3', '4', '5'],               //子集
                type: '2',                       //类型
                chineseName: '类',               //中文名
                action: '',                      //后台操作类型
                page: {                          //前端转跳属性
                    moduleId: '',
                    section: ''
                }
            },
            //应用
            '3': {
                icon: 'adn',                 //图标
                next: ['4', '5'],                      //子集
                type: '3',                       //类型
                chineseName: '应用',            //中文名
                action: '',                      //后台操作类型
                page: {                          //前端转跳属性
                    moduleId: '',
                    section: ''
                }
            },
            //备用
            '4': {
                icon: 'bitbucket',                 //图标
                next: ['5'],                      //子集
                type: '4',                       //类型
                chineseName: '备用',            //中文名
                action: '',                      //后台操作类型
                page: {                          //前端转跳属性
                    moduleId: '',
                    section: ''
                }
            },
            //系统
            '5': {
                icon: 'windows',                 //图标
                next: ['6'],                      //子集
                type: '5',                       //类型
                chineseName: '系统',            //中文名
                action: '',                      //后台操作类型
                page: {                          //前端转跳属性
                    moduleId: '',
                    section: ''
                }
            },
            //主机
            '6': {
                icon: 'desktop',                 //图标
                next: ['7'],                      //子集
                type: '6',                       //类型
                chineseName: '主机',            //中文名
                action: '',                      //后台操作类型
                page: {                          //前端转跳属性
                    moduleId: '',
                    section: ''
                }
            },
            //代理
            '7': {
                icon: 'crosshairs',                 //图标
                next: ['8'],                      //子集
                type: '7',                       //类型
                chineseName: '代理',            //中文名
                action: '',                      //后台操作类型
                page: {                          //前端转跳属性
                    moduleId: '',
                    section: ''
                }
            },
            //监控项
            '8': {
                icon: 'pie-chart',                 //图标
                next: [],                           //子集
                type: '8',                       //类型
                chineseName: '监控项',            //中文名
                action: '',                      //后台操作类型
                page: {                          //前端转跳属性
                    moduleId: '',
                    section: ''
                }
            },
            state: {
                Running: 'Running',
                Stopped: 'Stopped',
                Stopping: 'Stopping'
            },
            status: {
                Running: '<i class="fa fa-gear fa-spin Running"></i>运行中',
                Stopped: '<i class="fa fa-circle Stopped"></i>未启动',
                Stopping: '<i class="fa fa-gear fa-circle Stopping"></i>正在停止',
                Connecting: '<i class="fa fa-gear fa-circle Stopping"></i>连接中',
                RunningIcon: '<i class="fa fa-gear fa-spin Running"></i>',
                StoppedIcon: '<i class="fa fa-circle Stopped"></i>',
                StoppingIcon: '<i class="fa fa-circle fa-spin Stopping"></i>',
                RunningText: '运行中',
                StoppedText: '未启动',
                StoppingText: '正在停止'
            },
            action: {
                'dvcStartBtn': 'start',
                'dvcConnectBtn': 'connect',
                'dvcStopBtn': 'stop',
                'dvcDelBtn': 'remove',
                'dvcNoOpr': 'no-opr',
                'dvcStartBtnText': '启动',
                'dvcConnectBtnText': '连接',
                'dvcStopBtnText': '停止',
                'dvcDelBtnText': '删除'
            },
            editableAction: {
                'UPDATE': 'upd',
                'REMOVE': 'remove',
                'CREATE': 'cre'
            }
        };

        /*运行参数*/
        var defaultOptions = {
            $container: '',
            editable: 'cud',
            data: [],
            details: {},
            selector: 'path',
            parentSelector: 'parentPath',
            root: '/',
            rootDeletable: false,
            pathDivider: '/',
            draggable: false,
            cloneable: false
        };

        /*建树
         * $container 显示树的容器
         * options:{
         *   editable:   布尔型，是否可以编辑，必需
         *   data:       树结构信息的一维数组，必需
         *   details     需要显示节点的信息的数据  键值对 或函数 function(node){ return [String,String];}
         * }
         * */
        var buildTree = function (options) {
            options = $.extend({}, defaultOptions, options);

            /*变量定义*/
            var ___$context = options.$context,
                ___$list = options.$list || $('<ul></ul>'),
                ___$tree = options.$container,
                ___data = $.isArray(options.data) ? options.data : defaultOptions.data,
                ___editable = options.editable,
                ___details = options.details,
                ___selector = options.selector,
                ___parentSelector = options.parentSelector,
                ___root = options.root,
                ___rootDeletable = options.rootDeletable,
                ___pathDivider = options.pathDivider,
                ___draggable = options.draggable,
                ___cloneable = options.cloneable,
                ___taffyData;

            //节点模板
            var ___nodeTemp = '<li class="_isRoot_"><div class="label-node" data-id="_id_"><i class="fa fa-_icon_"></i><h5 class="title" title="_title_">_title_</h5></div><div class="details">_details_</div>';


            /*函数定义*/
            //添加节点
            //node 对象 单个节点的信息或多个节点信息的数组
            function _add(node) {
                var pathSelector = {},insertCount=0;
                if(!$.isArray(node)) {
                    node = [node];
                }

                for(var i=-1,n;n=node[++i];) {
                    pathSelector[___selector] = n[___selector];
                    if (!___taffyData(pathSelector).count()) {
                        insertCount++;
                    }
                }

                _tree();
                return insertCount;
            }

            //移除节点
            //移除的id String 或 object对象
            function _remove(id) {
                if (typeof id === 'object') {
                    id = $(id).closest('.node').children('.label-node').attr('data-id');
                }

                var node = ___taffyData({___id: id}),
                    children, childrenSelector = {};

                if (node.count()) {
                    node = node.first();
                    childrenSelector[___parentSelector] = node[___selector];
                    children = ___taffyData(childrenSelector);

                    if (children.count()) {
                        children.each(function (childNode) {
                            _remove(childNode.___id);
                        });
                    }
                    ___taffyData({___id: id}).remove();
                } else {
                    return false;
                }
                return node&&node[___selector];
            }

            //改 改动节点信息
            function _update(selectPath,info){
                var updateCount= 0,sPath={};
                if(!$.isArray(selectPath)) {
                    selectPath = [selectPath];
                }

                if(!$.isArray(info)) {
                    info = [info];
                }

                for(var i=-1,sID,sInfo,node;sID=selectPath[++i];) {
                    sInfo=info[i]||info[0];
                    sPath[___selector] = sID;
                    node = ___taffyData(sPath);

                    if (node.count()) {
                        node.update(sInfo);
                        updateCount++;
                    }
                }

                _tree();
                return updateCount;
            }

            //清空树结构
            function _clear() {
                ___data.splice(0, ___data.length);
                _init();
            }

            //重新刷新数据
            //如果data为空，则重建树
            function _refresh(data) {
                if (data === false) {
                    //仅仅是刷新树结构
                    _tree();
                } else {
                    if ($.isArray(data)) {
                        ___data.splice(0, ___data.length);
                        ___data = null;
                        ___data = data;
                    }
                    _init();
                }
            }

            //更换父节点
            function _changeParent(id, ParentId) {
                var newNode = ___taffyData({'___id': id}), newParentPath,
                    parentNode = ___taffyData({'___id': ParentId}),
                    childrenNode, childrenSelector = {},
                    legal = true;

                function updateRelationship(node, parentNode, isClone) {
                    var oldParentSelector = {};

                    if (isClone) {
                        node = $.extend(true, {}, node);
                        delete node.___id;

                        node[___parentSelector] = parentNode[___selector];
                        node[___selector] = parentNode[___selector] + ___pathDivider + node.name;
                        ___taffyData.insert(node);
                    } else {
                        oldParentSelector[___parentSelector] = node[___selector];
                        node[___parentSelector] = parentNode[___selector];
                        node[___selector] = parentNode[___selector] + ___pathDivider + node.name;

                        ___taffyData({___id: node.___id}).remove();
                        delete node.___id;
                        ___taffyData.insert(node);

                        ___taffyData(oldParentSelector).each(function (node) {
                            return function (childNode) {
                                updateRelationship(childNode, node);
                            }
                        }(node));
                    }
                }

                if (newNode.count() && parentNode.count()) {
                    newNode = newNode.first();
                    parentNode = parentNode.first();

                    //先判断 新父节点是否有相同的子节点
                    childrenSelector[___parentSelector] = parentNode[___selector];
                    childrenNode = ___taffyData(childrenSelector);

                    if (childrenNode.count()) {
                        childrenNode = childrenNode.get();
                        newParentPath = parentNode[___selector] + ___pathDivider + newNode.name;
                        for (var i = -1, childNode; childNode = childrenNode[++i];) {
                            //如果路径相同，则不能移动
                            if (childNode[___selector] === newParentPath) {
                                legal = false;
                                if (newNode !== childNode) {
                                    app.alert('错误提示', '(' + parentNode.name + ')已有相同路径的子节点(' + childNode.name + ')', app.alertShowType.WARNING);
                                }
                                break;
                            }
                        }
                    }


                    var parentParams = DEVICE_PARAMS[parentNode.type],
                        next;

                    //如果原本移动的节点就是 新父节点的子节点 则没有必要移动
                    if (newNode[___parentSelector] === parentNode[___selector]) {
                        legal = false;
                    } else if (!parentParams || !(next = parentParams.next) || $.inArray('' + newNode.type, next) < 0) {
                        legal = false;//如果没有子层、且移动的节点不为 新父节点的子类型时，取消移动
                        app.alert('错误提示',
                            (parentParams ? parentParams.chineseName : '设备') + '的子层不能为' + (DEVICE_PARAMS[newNode.type] ? DEVICE_PARAMS[newNode.type].chineseName : '未知'),
                            app.alertShowType.WARNING);
                    }

                    if (legal) {
                        if (___draggable && ___cloneable) {
                            app.confirm({
                                title: '操作类型选择',
                                content: '请选择拖拽节点或复制节点',
                                btnConfirm: '拖拽',
                                btnCancel: '复制',
                                confirmHandler: function (updateRelationship, newNode, parentNode, _tree) {
                                    updateRelationship(newNode, parentNode, false);
                                    //重新构建树
                                    _tree();
                                },
                                cancelHandler: function (updateRelationship, newNode, parentNode, _tree) {
                                    updateRelationship(newNode, parentNode, true);
                                    //重新构建树
                                    _tree();
                                },
                                context: ___$context[0],
                                args: [updateRelationship, newNode, parentNode, _tree]
                            });
                        } else if (___draggable) {
                            updateRelationship(newNode, parentNode, false);
                        } else if (___cloneable) {
                            updateRelationship(newNode, parentNode, true);
                        }
                    }
                }

                if(!legal||!(___draggable && ___cloneable)){
                    //重新构建树
                    _tree();
                }
            }

            //获取数据
            function _getSingleNode(id) {
                if (typeof id === 'object') {
                    id = $(id).closest('.node').children('.label-node').attr('data-id');
                }

                var node = ___taffyData({___id: id});

                return node.count() ? node.first() : {};
            }
            function _getJSONString() {
                return JSON.stringify(___taffyData().get());
            }

            //初始化数据库数据
            function _init() {
                ___taffyData = app.taffy(___data);
                _tree();
            }

            //建树
            function _tree() {
                /*常量定义*/
                var items = [], selector = {},
                    editLevel;

                /*函数定义*/
                function loops(item) {
                    var isRoot = item[___selector] === ___root ? 'root' : 'child',
                        lines = ___details(item),
                        parentSelector = {},
                        details = '<table class="table-details"><tbody>';
                    if (!___rootDeletable && isRoot === 'root') {
                        isRoot += ' ' + editLevel.replace(/d/, '');
                    } else if(item.editLevel){
                    	isRoot = ' '+item.editLevel;
                    }else if (editLevel) {
                        isRoot += ' ' + editLevel;
                    }


                    //悬停信息
                    for (var i = -1, line; line = lines[++i];) {
                        details += '<tr title="' + line[1] + '"><td>' + line[0] + '</td><td>' + line[1] + '</td></tr>';
                    }
                    details += '</tbody></table>';

                    //节点信息
                    items.push(___nodeTemp.replace(/_isRoot_/, isRoot)
                        .replace(/_id_/, item.___id)
                        .replace(/_icon_/, DEVICE_PARAMS[item.type].icon)
                        .replace(/_title_/g, item.name)
                        .replace(/_details_/, details));

                    //选择子节点
                    parentSelector[___parentSelector] = item[___selector];

                    var children = ___taffyData(parentSelector);
                    //假如存在子节点
                    if (children.count()) {
                        items.push('<ul>');
                        children.each(loops);
                        items.push('</ul></li>');
                    } else {
                        items.push('</li>');
                    }
                }


                /*数据加载*/
                editLevel = ___editable ? ___editable : '';

                selector[___selector] = ___root;
                ___taffyData(selector).each(loops);

                ___$list.html(items.join(''));

                ___$list.jOrgChart({
                    chartElement: ___$tree,  //父容器
                    dragAndDrop: (___draggable || ___cloneable),     //设置是否可拖动
                    expand: true,                   //是否可扩展
                    control: !!___editable,            //加入 增删改
                    $context: ___$context,
                    dropHandler: function (event, ui) {//只要___draggable或___cloneable为true都需要写这个函数
                        var $target = $(ui.helper).children('.label-node'),
                            $newParentNode = $(event.target || event.srcElement).children('.label-node');

                        _changeParent($target.attr('data-id'), $newParentNode.attr('data-id'));
                    }
                });
            }

            //获取描述函数
            function _details() {
                var details;
                if (!$.isFunction(___details)) {
                    details = $.isPlainObject(___details) ? ___details : defaultOptions.details;

                    ___details = function (details) {
                        return function (node) {
                            var lines = [];
                            for (var p in details) {
                                lines.push([details[p], node[p]]);
                            }
                            return lines;
                        }
                    }(details);
                }
            }


            /*数据加载*/
            _details();//将details转成函数
            _init();


            return {
                get:_getSingleNode,
                add: _add,
                update:_update,
                remove: _remove,
                clear: _clear,
                refresh: _refresh,
                getJSONString: _getJSONString
            };
        };

        buildTree.DEVICE_PARAMS = DEVICE_PARAMS;

        return buildTree;
    });
})();




