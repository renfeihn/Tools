
/*
*   container status Manager
* */
define([], function(){
    /*
       应该要读取配置
     */
    function StatusManager(opts) {
        this._hasSelected = false;
        this.currentEnv = opts.env; // 编辑环境  生产环境
        this.selectedContainer = null;
    }

    StatusManager.prototype = {
        setContainerStatus: function (ele, status) {
            this._hasSelected = status;
            this.selectedContainer = ele;
        },
        getContainerSelected: function () {
        	return this._hasSelected ? this.selectedContainer : null;
        },
        setCurrentEnv: function (env) {
        	this.currentEnv = env;
        },
        getCurrentEnv: function() {
        	return this.currentEnv;
        }
    }

    return StatusManager;

});