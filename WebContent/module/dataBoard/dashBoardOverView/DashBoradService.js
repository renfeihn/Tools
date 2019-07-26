define(['jquery',"../../logResultCheck/logSearchDetail/logStatisticsView/statisticsEchartsTool"], function($, staticEchartsTool) {
    var BaseAction = "DashBoardAction_";
    return {
        /**
         * 查询全部的仪表盘信息
         * @return deferred
         */
        getAllDashBoard: function(echartsType) {
            return app.common.ajaxWithAfa({
                url: BaseAction + 'getAllDashBoard.do',
                data: {
                    echartsType: echartsType
                }
            }).then(function(data) {
                return $.Deferred().resolve(data.result);
            })
        },
        /**
         * 根据主键ID查询仪表盘信息
         * @param {Int} id
         * @return deferred
         */
        getDashBoardById: function (id) {
            return app.common.ajaxWithAfa({
                url: BaseAction + 'getDashBoardById.do',
                data:{
                    id: id
                }
            }).then(function (data) {
                return $.Deferred().resolve(data);
            })
        },
        /**
         * 根据主键ID删除仪表盘信息
         * @param {Int} id
         * @return deferred
         */
        delDashBoardById: function (id) {
            return app.common.ajaxWithAfa({
                url: BaseAction + '',
                data:{
                    id: id
                }
            }).then(function(data) {
                return $.Deferred().resolve(data);
            })
        },
        /**
         * 添加仪表盘信息
         * @return deferred
         */
        addDashBoard: function() {
            return app.common.ajaxWithAfa({
                url: BaseAction + ''
            }).then(function (data) {
                return $.Deferred().resolve(data);
            })
        },
        /**
         * 获取单个仪表盘统计数据
         * @return
         */
        getDashBoardData: function(ids) {
            return app.common.ajaxWithAfa({
                url: BaseAction + 'getDashBoardData.do',
                data: {
                    ids: ids
                }
            }).then(function(data) {
                return $.Deferred().resolve(data.result);
            })
        },
        /**
         * 修改仪表盘信息
         * @return
         */
        updateDashBoard: function(){
            return app.common.ajaxWithAfa({
                url: BaseAction + ''
            }).then(function (data) {
                return $.Deferred().resolve(data);
            })
        },
        /**
         * 添加仪表盘信息
         * @param {String} groupName 分组名称
         * @param {Strung} remark 注释
         * @return
         */
        addDashBoardGroup: function (groupName, remark) {
            return app.common.ajaxWithAfa({
                url: BaseAction + 'addDashBoardGroup.do',
                data:{
                    groupName: groupName,
                    remark: remark
                }
            }).then(function(data){
                return $.Deferred().resolve(data.result);
            })
        },
        /**
         * 获取仪表盘列表
         * @return
         */
        getDashBoardGroups: function() {
            return app.common.ajaxWithAfa({
                url: BaseAction + 'getDashBoardGroups.do'
            }).then(function (data) {
                return $.Deferred().resolve(data.result);
            })
        },
        /**
         * 修改仪表盘分组信息
         * @param {int} groupId
         * @param {String} groupName
         * @param {Sstring} remark
         * @return
         */
        updateGroupName: function(groupId, groupName, remark) {
            return app.common.ajaxWithAfa({
                url: BaseAction + 'updateGroupName.do',
                data: {
                    groupId: groupId,
                    groupName: groupName,
                    remark: remark
                }
            }).then(function(data) {
                return $.Deferred().resolve(data.result);
            })
        },

        /**
         * 复制仪表盘分组
         * @param  {Long} groupId  源仪表盘分组ID
         * @param  {String} groupName 新仪表盘名称
         * @param  {String} remark    新仪表盘注释
         * @return {Deferred}
         */
        copyDashBoardGroup: function (groupId,groupName, remark) {
            return app.common.ajaxWithAfa({
                url: BaseAction + 'copyDashBoardGroup.do',
                data: {
                    groupId: groupId,
                    groupName: groupName,
                    remark: remark
                }
            }).then(function(data) {
                return $.Deferred().resolve(data.result);
            })
        },
        /**
         * 删除仪表盘分组名称
         * @param {int} groupId
         * @return
         */
        delGroupById: function(groupId) {
            return app.common.ajaxWithAfa({
                url: BaseAction + 'delGroupById.do',
                data: {
                    groupId:groupId
                }
            }).then(function(data) {
                return $.Deferred().resolve(data.result);
            })
        },
        /**
         * 保存仪表盘
         * @return
         */
        addDashBoardRelation: function(groupId, relations){
            return app.common.ajaxWithAfa({
                url: BaseAction + 'addDashBoardRelation.do',
                data: {
                    groupId: groupId,
                    relations: relations
                }
            }).then(function(data){
                return $.Deferred().resolve(data.result);
            })
        },
        /**
         * 根据groupId查询仪表盘内容
         * @param {int} groupId
         * @return
         */
        getDashBoardByGroupId: function (groupId) {
            return app.common.ajaxWithAfa({
                url:BaseAction + 'getDashBoardByGroupId.do',
                data:{
                    groupId: groupId
                }
            }).then(function(data){
                return $.Deferred().resolve(data.result);
            })
        },
        /**
         * 根据参数生成 echarts options
         */
        getEchartsOptionByParams: function(aggs, paramData) {
            var options = staticEchartsTool.getOption(aggs, paramData);
            return options;
        },
        addFirstPage:function (groupId) {
            return app.common.ajaxWithAfa({
                url:BaseAction + 'setIndexDashBoardGroup.do',
                data:{
                    groupId: groupId
                }
            }).then(function(data){
                return $.Deferred().resolve(data.result);
            })
        }
    }
});
