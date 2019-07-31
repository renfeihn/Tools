/**
 * [公共方法]
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author lijiancheng@cfischina.com
 */
( /*<global>*/ function (undefined) {

    (function (factory) {
        "use strict";

        //amd module
        if (typeof define === "function" && define.amd) {
            define(factory);
        }
        //global
        else {
            factory();
        }

    })(function () {
        "use strict";

        Array.prototype.sortChinese = function (key) {
            return this.sort(function compareFunction(param1, param2) {
                if (key) {
                    return getParam(param1, key).localeCompare(getParam(param2, key), "zh");
                }
                return param1.localeCompare(param2, "zh");
            });
        }

        function getParam(param, keys) {
            keys = keys.split('.');
            keys.forEach(key => {
                param = param[key];
            })
            return param;
        }

        //控制按钮是否可执行  根据原来的版本的修订   修改后觉得适用场景仍然不强 
        /*@param ids 可以传入单个id,也可以传入id的数组形式  id 或[id1,id2,id3]
         * @param _$context 非必须，当前环境的上下文环境      一般情况下都是 $el 所以无需传入。如果当前环境的上下文不是$el，则必须传入，
         */
        var toggleDisabled = function (ids) {
            if (!ids) return;
            var type = typeof ids === "string" ? "id" : "array";
            var _$context = arguments[1] ? "$el" : arguments[1];
            if (type === "id") {
                var $obj = $("#" + ids, _$context);
                if ($obj.hasClass("disabled")) {
                    $obj.removeClass("disabled");
                }
                else {
                    $obj.addClass("disabled");
                }
            }
            else {
                ids.forEach(function (item) {
                    var $obj = $("#" + item, _$context);
                    if ($obj.hasClss("disabled")) {
                        $obj.removeClass("disabled");
                    }
                    else {
                        $obj.addClass("disabled");
                    }
                });
            }
        }


        /**
         * ajax promise通讯
         * @param param参数配置
         */
        var ajaxWithAfa = function (param) {
            var dtd = $.Deferred();
            var options = $.extend({
                url: '',
                dataType: "json",
                type: "POST",
                data: '',
                timeout: 2 * 60 * 1000,
                success: function (data) {
                    if (data.status) {
                        dtd.resolve(data.content);
                    } else {
                        app.alert('title', data.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
                        app.shelter.hide();
                        dtd.reject(data.errorMsg);
                    }
                }
            }, param);

            $.ajax(options);

            return dtd

            /*.done(function(data){   在ES6中说明promise对象，一旦从pending状态发生改变，在后续的状态就不会改变。
             if(isEmpty(data)){
             dtd.reject("");
             }
             });*/
        };

        /**
         * treeTable数据
         */
        var getTreeData = function (param) {
            //选择需要的数据格式，1：树状结构数据，2：树形顺序的数据（例：treeTable使用），
            var data = param.data,
                id = param.idName,
                pid = param.pidName,
                pidVal = param.pidVal;
            var list = [];

            function getOrderData() {
                for (var i in data) {
                    var sData = data[i];
                    if (sData[pid] == pidVal) {
                        list.push(sData);
                        findChild(sData);
                        break;
                    }
                }
            }

            function findChild(pdata) {
                for (var i in data) {
                    var temp = data[i];
                    if (temp[pid] == pdata[id]) {
                        list.push(temp);
                        findChild(temp);
                    }
                }
            }

            getOrderData();
            return list;
        }
        /*
         * 将表单数据封装成对象
         * */
        var serializeObject = function (form) {
            var obj = {};
            var formArr = form.serializeArray();
            formArr.forEach(function (item) {
                if (obj[item['name']]) {
                    obj[item['name']] = obj[item['name']] + ',' + obj['value'].trim();
                }
                else {
                    obj[item['name']] = item['value'].trim();
                }
            })
            return obj;
        }
        /* 获得指定容器下的表单值
         * @param box 指定表单的jquery对象
         * */
        var getFormValue = function (box) {
            var formValue = {};
            var type = box[0].nodeName === "FORM" ? "form" : "other";
            if (type === "form") {
                formValue = serializeObject(box);
                return formValue;
            }
            else {
                var oInput = $("input", box);
                var oSelect = $("select", box);
                var oTextAre = $("oTextAre", box);
                if (oInput) {
                    _setForm(oInput);
                }
                if (oSelect) {
                    _setForm(oSelect);
                }
                if (oTextAre) {
                    _setForm(oTextAre);
                }
                return formValue;
            }

            function _setForm(coll) {
                var collToArray = Array.prototype.slice.call(coll);
                collToArray.forEach(function (item) {
                    formValue[item['name']] = item['value'].trim();
                });
            }
        }

        Date.prototype.Format = function (fmt) { //时间格式化处理
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        Date.prototype.FormatUTC = function (fmt) { //时间格式化处理
            var o = {
                "M+": this.getUTCMonth() + 1, //月份
                "d+": this.getUTCDate(), //日
                "h+": this.getUTCHours(), //小时
                "m+": this.getUTCMinutes(), //分
                "s+": this.getUTCSeconds(), //秒
                "q+": Math.floor((this.getUTCMonth() + 3) / 3), //季度
                "S": this.getUTCMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
        function isEmpty(data) {
            for (var key in data) {
                return false
            }
            return true
        }

        //记录用户操作历史,主要记录用户进入哪个交易页面
        var loghistory_trade;

        function logHistory(status, pageMessage) {
            var obStatus = ["load", "unload", "resume"];
            var optionMessage = "";
            if (!pageMessage || obStatus.indexOf(status) < 0) {
                return;
            }
            var messageLength = pageMessage.split("-").length;
            if (status == "load" || status == "resume") {
                loghistory_trade = pageMessage;
            }
            if (status == "load" && pageMessage) {
                loghistory_trade = pageMessage;
                optionMessage = "查看：【" + pageMessage + "】";
                sendlogHistory(optionMessage);
            }
            /*if(status=="unload"&&messageLength<3){
             optionMessage="关闭"+pageMessage+"页面";
             }*/
        }

        //发送用户操作历史记录,在各个需要收集用户行为的地方埋点记录，参数就是用户的操作行为,请直接输入用户的行为：如：登录系统；
        function sendlogHistory(optionMessage, callback) {
            var now = new Date();
            now = now.Format("yyyy-MM-dd hh:mm:ss");
            if (optionMessage == "登录系统") {
                loghistory_trade = "登录系统";
            }
            if (optionMessage == "退出登录") {
                loghistory_trade = "退出登录";
            }
            // ajaxWithAfa({
            //     url: "UserOperationAction_save.do",
            //     data: {
            //         dateTime: now,
            //         operation: optionMessage,
            //         trade: loghistory_trade
            //
            //     }
            // }).done(function (data) {
            //     callback && callback();
            // })
        }

        //容器的加载遮罩层
        $.fn.loading = function (msg) {
            if ($(this).css('position') == 'static') {
                $(this).css('position', 'relative');
            }

            if (msg == "show") {
                $(this).append('<div class="ajax-loading-mask"><div class="maskPic" style="white-space: nowrap; line-height: 3em; color: #000;">加载中</div></div>');
            } else if (msg == "hide") {
                $(this).find('.ajax-loading-mask').remove();
            }
        }

        //日志搜索页面最多打开十个页签
        var searchTab = {
            tabNum: 0,
            addTabNum: function () {
                if (this.tabNum == 9) {
                    app.alert("已经到达最大窗口打开数！")
                    return;
                }
                this.tabNum++;
            },
            removeTabNum: function () {
                if (this.tabNum == 0) {
                    return;
                }
                this.tabNum--;
            },
            getTabNum: function () {
                return this.tabNum;
            }
        }

        var recordLogOperete = function (param) {
            ajaxWithAfa({
                url: "LogOperationAction_add.do",
                data: param
            }).done(function (data) {
                console.log(data);
            })
        }

        return {
            toggleDisabled: toggleDisabled,
            recordLogOperete: recordLogOperete,
            ajaxWithAfa: ajaxWithAfa,
            getTreeData: getTreeData,
            serializeObject: serializeObject,
            getFormValue: getFormValue,
            isEmpty: isEmpty,
            logHistory: logHistory,
            sendlogHistory: sendlogHistory,
            searchTab: searchTab
        }

    });

})();