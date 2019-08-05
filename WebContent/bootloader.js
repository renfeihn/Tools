/*!
 * Javascript library v3.0
 *
 * Date: 2015.02.17
 */

/**
 * [引导模块]
 *
 * 定初始化js路径，并定义模块间依赖关系
 * 初始化app基础功能，如路由、日志等
 * 初始化首页
 *
 * @param  [window] 执行上下文
 * @author lihao01@cfischina.com
 */
(function (scope) {
    "use strict";
    /*****js配置路径 start******/
    var pathData = {
            //此处为开发外部库文件
            jquery: "script/lib/jquery-1.9.1",
            jqueryUi:"script/lib/jquery-ui-1.11.4",
            zTree: "script/lib/ztree/jquery.ztree.all-3.5", 
            underscore: "script/lib/underscore-1.8.2.min",
            backbone: "script/lib/backbone-1.1.2",
            bootstrap: "script/lib/bootstrap-2.3.2",
            slimscroll:"script/lib/jquery.slimscroll.min",
            json2: "script/lib/json2",
            echarts: "script/lib/echarts",
            echarts_event: "script/lib/echarts/config",
            datatables:"script/lib/jquery.dataTables",
            clipboard:"script/lib/clipboard",
            datetimepicker:"script/lib/bootstrap-datetimepicker",
            contextmenu:"script/lib/bootstrap-contextmenu",
            taffy:"script/lib/jquery.jOrgChart-taffy",
            jOrgChart:"script/lib/jquery.jOrgChart",
            swithcer:"script/lib/bootstrap-switch",
            ajaxUpload:"script/lib/jQuery.ajaxfileupload",
            gsap:"script/lib/TweenLite.min",
          	//socketio
			//socketio: "script/lib/socket.io",
			moment: "script/lib/moment.min",
			daterangepicker: "script/lib/daterangepicker",
			//页面滚动插件
            scrollable: "script/lib/scrollable/scrollable",
            //快速搜索插件
            quicksearch: "script/lib/jquery.quicksearch",
            //spa
            common: "script/spa/common",
            global: "script/spa/global",
            dispatcher: "script/spa/dispatcher",
            dispatcher2: "script/spa/dispatcher2",
            dispatcher3: "script/spa/dispatcher3",
            handler: "script/spa/handler",
            handler2: "script/spa/handler2",
            handler3: "script/spa/handler3",
            v: "script/spa/v",
            vm: "script/spa/vm",
            tab: "script/spa/tab",
            console: "script/spa/console",
            component: "script/spa/component",
            skin: "script/spa/skin",
            validate: "script/spa/validate",
            domain: "script/spa/domain",
            grid: "script/spa/grid",
            confInfo: "script/spa/confInfoComponent",
            showEcharts: "script/spa/showEcharts",
            drawEcharts: "script/spa/drawEcharts",
            commonEcharts: "script/spa/commonEcharts",
           // showDataBigScreen: "script/spa/showDataBigScreen",
           // kpisShow: "script/spa/kpisShow",
           // kpisShowBigScreen: "script/spa/kpisShowBigScreen",
           //healtyShow: "script/spa/healtyShow",
           // eventFloatTip: "script/spa/eventFloatTip",
           // dataStatistics: "script/spa/dataStatistics",
            //联动路径
            selectChoose: "script/spa/selectChoose",
            selectChoose2: "script/spa/selectChoose2",
            multiselect:"script/lib/jquery.multi-select",
            nodata: "script/spa/nodata",
           // kpiEvent:"script/spa/kpiEvent",
            tinyselect:"script/spa/tinyselect",
            select2:"script/spa/select2.full.min",
            //首页入口
            index: "index",
            //G2:"script/lib/g2",
            keyPanel: "script/spa/keyPanel",
        	//事件详情插件
            eventDetails: "script/spa/eventDetails",
            multipleSelect: "script/lib/multipleSelect/multiple-select",
            countUp:'script/lib/countUp',
            
            //自定义插件
            plugs:'script/spa/agree_plugs',
            treeTable : "script/lib/jquery.treetable",
            
            //echars 图的公共集
            aechars:'script/spa/agree_echars',
            //模板引擎 handlerbar
            handlebars:'script/lib/handlebars-v4.0.5',
            deviceTree:'script/spa/deviceTree',
            //文件比对
            difflib : "script/lib/difflib",
            diffview : "script/lib/diffview",
            ajaxDownload:"script/lib/ajaxDownload",
            clockpicker:"script/lib/clockpicker",
            fixedColumns:"script/lib/dataTables.fixedColumns",
            statistics: "script/lib/jquery.dataStatistics",
            orgchart:"script/lib/jquery.orgchart",
            jquerynew:"script/lib/jquery.min",
            	d3:"script/lib/d3",
            angular:"script/lib/angular",
            jquerySelect: "script/lib/jquery.combo.select",
            echartsWordcloud:'script/lib/echarts/chart/echarts-wordcloud.min',
//            echarts4: 'script/lib/echarts4.min',
            vis:"script/lib/vis/vis.min",
            visNetWork: "script/lib/vis/vis-network.min",
          //拓扑图插件
            operateTopo: 'script/spa/operateTopo',
//            vis: './script/lib/vis'
			html2canvas:'script/lib/html2canvas.min',
			
			/**
			 * echarts 处理函数
			 */
			loadChartsIndex: 'script/spa/loadCharts/index',
			dataPool: 'script/spa/loadCharts/dataPool',
			unityData: 'script/spa/loadCharts/unityData',
			publicChartsOption: 'script/spa/loadCharts/publicChartsOption',
			chartsOption: 'script/spa/loadCharts/chartsOption',
			tableOption: 'script/spa/loadCharts/tableOption',
			varOption: 'script/spa/loadCharts/varOption',
			
			
			echarts4: 'script/spa/loadCharts/echarts.min',
			
			
			upload: 'script/spa/upload',
			
			pagination: 'script/lib/jquery.pagination',
			
			/**
			 * 仪表盘组件加载
			 */
			stage: 'script/spa/dataBorad/board/stage',
			dashItem: 'script/spa/dataBorad/board/dashItem',
			EventEmitter: 'script/spa/dataBorad/board/EventEmitter',
			requestAjax: 'script/spa/dataBorad/board/requestAjax',
			Menu: 'script/spa/dataBorad/board/menu',
			EventMiddle: 'script/spa/dataBorad/board/EventMiddle',
			tool: 'script/spa/dataBorad/board/tool',
			buss: 'script/spa/dataBorad/board/buss',
			componentTimer: 'script/spa/dataBorad/board/componentTimer',
			
//			scene: 'script/spa/dataBorad/container/scene',
//			
//			container: 'script/spa/dataBorad/container/container',
//			row: 'script/spa/dataBorad/container/row/row',
//			defaultBox: 'script/spa/dataBorad/container/defaultBox/defaultBox',
//			
			echartsXy: 'script/spa/dataBorad/xyLayout/echartsXy/echartsXy',
			tableXy: 'script/spa/dataBorad/xyLayout/tableXy/tableXy',
			varXy: 'script/spa/dataBorad/xyLayout/varXy/varXy',
			imgXy: 'script/spa/dataBorad/xyLayout/imgXy/imgXy',
			textXy: 'script/spa/dataBorad/xyLayout/textXy/textXy',
			cardItem: 'script/spa/dataBorad/xyLayout/cardItem/cardItem',
			sonItem: 'script/spa/dataBorad/xyLayout/cardItem/sonItem',
			sonContent: 'script/spa/dataBorad/xyLayout/cardItem/sonContent',
			themeCard: 'script/spa/dataBorad/xyLayout/cardItem/themeCard',
			NormalCard: 'script/spa/dataBorad/xyLayout/cardItem/NormalCard',
			card: 'script/spa/dataBorad/xyLayout/card/card',
			cardContent: 'script/spa/dataBorad/xyLayout/card/cardContent',
			
			
			
			lineCharts: 'script/spa/dataBorad/config/lineCharts',
			dataTables: 'script/spa/dataBorad/config/dataTables',
//			
			util: 'script/spa/dataBorad/util/util',
			
//			setSize: 'script/spa/dataBorad/util/setSize',
//			stageCollect: 'script/spa/dataBorad/container/stageCollect',
//			sceneCollect: 'script/spa/dataBorad/container/sceneCollect',
//			Menu: 'script/spa/dataBorad/container/menu/menu',
//			requestData: 'script/spa/dataBorad/util/requestData',
			
			/**
			 * 仪表盘操作
			 */
			LogSearch: 'script/spa/dataBorad/util/LogSearch',
			DataCollect: 'script/spa/dataBorad/util/DataCollect',
			loadData: 'script/spa/dataBorad/util/loadData',
			supLoadData: 'script/spa/dataBorad/util/supLoadData',
			
			
			gridster: 'script/lib/jquery.gridster',
			/**
			 * dashBoard插件
			 */
			lodash: 'script/spa/dataBorad/gridstack/loadsh',
		    gridstack: 'script/spa/dataBorad/gridstack/gridstack',
		    // jqueryUi: 'script/spa/dataBorad/gridstack/jquery-ui',
		    GridStackUI: 'script/spa/dataBorad/gridstack/gridstack.jQueryUI',
		    sham: 'script/spa/dataBorad/gridstack/es6-sham.min',
		    
		    /**
		     * dashboard 插件公共处理函数
		     */
		    stageContainer: 'script/spa/dataBorad/impl/stageContainer',
		    stageContent: 'script/spa/dataBorad/impl/stageContent',
		    itemComponent: 'script/spa/dataBorad/impl/itemComponent',
			/*
			CMDB相关*/
			viewBuilder: 'script/lib/customForm/script/viewBuilder',
			template: 'script/lib/template-web',
			diyFormEvents: "script/spa/diyFormEvents",
			CateSelector: 'script/spa/CateSelector',
			AddObjModal: 'script/spa/CMDB_AddObjModal',
			XLSX:'script/spa/xlsx.full.min',
			tableToExcel: 'script/spa/tableToExcel',
			simtopo: 'script/spa/topo/simtopo',
			agreeColorPicker: 'script/lib/agreeColorPicker',
			
/*			数据库安全查询工具相关*/
			 ace:'script/lib/ace/ace',

			//  事件相关
			range: 'script/lib/jquery.range',

			
        }
    /*****js配置路径 end******/
    
    function ajax(options){
    	options = options || {};
    	options.type = (options.type || "POST").toUpperCase();
    	options.dataType = options.dataType || "json";
    	var params = formatParams(options.data);
    	
    	if(window.XMLHttpRequest){
    		var xhr = new XMLHttpRequest();
    	}else{
    		var xhr = new ActiveXObject('Microsoft.XMLHttp');
    	}
    	
    	xhr.onreadystatechange = function(){
    		if(xhr.readyState == 4){
    			var status = xhr.status;
    			if(status >= 200 && status < 300){
    				options.success && options.success(xhr.responseText, xhr.responseXML);
    			}else{
    				options.fail && options.fail(status);
    			}
    		}
    	}
    	
    	if(options.type == "GET"){
    		xhr.open("GET", options.url + "?" + params, true);
    		xhr.send(null);
    	}else if(options.type == "POST"){
    		xhr.open("POST", options.url, true);
    		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    		xhr.send(params);
    	}
    }
    function formatParams(data){
    	var arr = [];
    	for(var name in data){
    		arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    	}
    	arr.push(("v=" + Math.random()).replace(".", ""));
    	return arr.join("&");
    }
    
    /******获取js文件的最后修改时间 start********/
    ajax({
    	type: 'post',
    	url: 'LoginAction_getModifyTime.do',
    	data: {jsonPath: JSON.stringify(pathData)},
        dataType: 'json',
        success: function(data){
        	var data = JSON.parse(data);
        	if(data.status){
        		requireConf(data.content)
        	}
        },
        error: function(msg){
        	requireConf({});
        }
    });
    /******获取js文件的最后修改时间 end********/
    function requireConf(data){   	
	    require.config({
	    	urlArgs: "lastTime="+data.lastTime,
	        //依赖定义
	        shim: {
	            jquery: {
	                exports: "$"
	            },
	            jqueryUi:{
	            	deps:["jquery"]
	            },
	            bootstrap: {
	                exports: "Bootstrap",
	                deps: ["jquery","gsap"]
	            },
	            component:{
	                deps: ["jquery"]
	            },
	            zTree: {
	                deps: ["jquery"]
	            },
	            slimscroll: {
	                deps: ["jquery"]
	            },
	            underscore: {
	                exports: "_"
	            },
	            backbone: {
	                exports: "Backbone",
	                deps: ["underscore", "jquery"]
	            },
	            echarts_event: {
	                exports: "echarts_event",
	                deps: ["jquery"]
	            },
	            echarts: {
	                exports: "echarts",  
	                deps: ["jquery"]
	            },
	            echartsWordcloud:{
	            	deps:["jquery","echarts"]
	            },
	            grid: {
	            	deps: ["jquery"]
	            },
	            datatables: {
	                deps: ["jquery"]
	            },
	            taffy:{
	                deps: ["jquery"]
	            },
	            datetimepicker:{
	                deps: ["jquery","bootstrap"]
	            },
	            daterangepicker:{
	            	deps: ["jquery","bootstrap","moment"]
	            },
	            contextmenu:{
	            	deps: ["jquery","bootstrap"]
	            },
	            dispatcher: {
	                deps: ["jquery", "underscore", "backbone"]
	            },
	            dispatcher2: {
	                deps: ["jquery", "underscore", "backbone"]
	            },
	            dispatcher3: {
	                deps: ["jquery", "underscore", "backbone"]
	            },
	            global: {
	                deps: ["jquery", "underscore", "backbone"]
	            },
	            jOrgChart:{
	                deps: ["jquery","taffy","global"]
	            },
	            handler: {
	                deps: ["jquery", "underscore", "backbone", "json2"]
	            },
	            handler2: {
	                deps: ["jquery", "underscore", "backbone", "json2"]
	            },
	            handler3: {
	                deps: ["jquery", "underscore", "backbone", "json2"]
	            },
	            v: {
	                deps: ["jquery", "underscore", "backbone"]
	            },
	            vis:{
	            	exports: "vis",
	            },
	            visNetWork:{
	            	exports: 'visNetwork'
	            },
	            html2canvas:{
	            	exports: 'html2canvas'
	            },
	            operateTopo:{
	            	deps: ["vis","visNetWork"]
	            },
	            vm: {
	                deps: ["jquery", "underscore", "backbone"]
	            },
	            tab: {
	                deps: ["jquery"]
	            },
	            swithcer:{
	                deps:["jquery","bootstrap"]
	            },
	            ajaxUpload:{
	                deps:["jquery"]
	            },
	            gsap:{
	                deps:[]
	            },
	            common:{
	                deps: ["jquery"]
	            },
	            confInfo:{
	                deps:["jquery","global"]
	            },
	            skin:{
	                deps:["jquery"]
	            },
	            showEcharts:{
	                exports: "showEcharts",
	                deps:["jquery"]
	            },
	            drawEcharts:{
	                exports: "drawEcharts",
	                deps:["jquery"]
	            },
	            commonEcharts:{
	            	exports: "commonEcharts",
	            	deps:["jquery"]
	            },
	           /* showDataBigScreen:{
	                exports: "showDataBigScreen",
	                desp:["jquery"]
	            },*/
	           /* healtyShow:{
	            	exports: "healtyShow",  
	            	desp:["jquery"]
	            	
	            },*/
	          /*  eventFloatTip:{
	            	exports: "eventFloatTip",  
	            	desp:["jquery"]
	            	
	            },*/
	           /* dataStatistics:{
	            	exports: "dataStatistics",
	            	desp:["jquery"]
	            },*/
	           /* kpisShow:{
	                exports: "kpisShow",
	                desp:["jquery"]
	            },*/
	           /* kpisShowBigScreen:{
	                exports: "kpisShowBigScreen",
	                desp:["jquery"]
	            },*/
	            //定义联动模块
	            selectChoose:{
	                exports: "selectChoose",
	                deps:["jquery"]
	            },
	            selectChoose2:{
	                exports: "selectChoose2",
	                deps:["jquery"]
	            },
	            nodata:{
	                exports: "nodata",
	                deps:["jquery"]
	            },
	           /* kpiEvent:{
	                exports: "kpiEvent",
	                desp:["jquery"]
	            },*/
	          //搜索下拉框
	            tinyselect:{
	                exports: "tinyselect",
	                deps:["jquery"]
	            },
	            select2:{
	                exports: "select2",
	                deps:["jquery"]
	            },
	            multiselect:{
	                exports: "multiselect",
	                deps:["jquery"]
	            },
	            index: {
	                deps: ["jquery","component"]
	            },
	           /* G2:{
	            	exports:"G2",
	            	deps:["jquery"]
	            },*/
	            keyPanel: {
	            	deps: ["jquery","echarts"]
	            },
	            //页面滚动插件
	            scrollable: {
	            	deps: ["jquery"]
	            },
	            //快速搜索插件
	            quicksearch: {
	            	deps: ["jquery"]
	            },
	            //事件详情插件
	           /* eventDetails: {
	            	deps: ["jquery","echarts"]
	            },*/
	            multipleSelect: {
	            	deps: ["jquery"]
	            },
	            countUp: {
	            	/*deps: ["jquery"]*/
	            },
	            plugs :{
	            	deps:["jquery"]
	            },
	            treeTable : {
	            	deps : ["jquery"]
	            },
	            aechars:{
	            	deps:["jquery","echarts"]
	            },
	            deviceTree:{
	                deps: ["jquery","jOrgChart"]
	            },
	            ajaxDownload:{
	                deps:["jquery"]
	            },
	            clockpicker: {
	                deps: ["jquery"]
	            },
	            fixedColumns: {
	            	deps: ["jquery","datatables"]
	            },
	            angular:{
	            	exports:"angular"
	            },
	            pagination: {
	            	deps: ["jquery"],
	            	exports: "pagination"
	            },
	            viewBuilder: {
	                deps: ['jquery']
	            },
	            diyFormEvents:{
	            	deps:["jquery"]
	            },
	            CateSelector: {
	            	deps: ['jquery'],
	            	exports: "CateSelector",
	            },
	            AddObjModal: {
	            	deps: ['diyFormEvents'],
	            	exports: "AddObjModal",
	            },
	            XLSX:{
	            	deps: ['jquery']
	            },
	            tableToExcel: {
	            	exports: "tableToExcel",
	            	deps: ['jquery','XLSX']
	            },
	             ace:{
	            	exports:"ace"
	            },
	        },
	
	        //文件路径定义
	        //script/lib文件夹中部分库包含注释版本及压缩版，此处为提高加载速度统一使用压缩版
	        //如特殊情况需断点调试，请暂时指向注释版本并在完成调试后更改回压缩版
	        paths: pathData,
	        packages: [{
	        		name: "codemirror",
	            location: "script/lib/codemirror",
	            main: "lib/codemirror"
	        }],
	        map: {
	        	  '*': {
	        	    'css': 'script/lib/css'
	        	  }
	        }
	    });
	
	    require(['bootstrap',"component"], function (bootstrap,component) {
	        var app = scope.app = {};
			var components = scope.components = {};
			
			 //二三级模块加载时使用
			 app.ctnList = {};
			 
	        //遮罩
	        app.shelter=component.shelter;
	       // app.shelter.show('正在加载页面，请稍候…',true);
	
	        //消息中心
	        app.alert = component.alert;
	        app.alertShowType=component.showType;
	        app.alertMsgType=component.msgType;
	
	        //确定框
	        app.confirm=component.confirm;
	        //新的确认框
	        app.confirmDialog = component.confirmDialog;
	        
	        app.warning=component.warning;
	
	        //右侧边栏输入
	        app.formControl=component.formControl;
	
	        //屏幕
	        app.screen=component.screen;
	
	        //顶部导航栏banner
	        app.banner=component.banner;
	
	        //滚动到底部
	        app.scrollTop=component.scrollTop;
	
	        //多选
	        app.selectComponent=component.selectComponent;
	        
	        app.multiSelect = component.multiSelect;
	        //列可拖动表格
	        app.colResizeTable=component.colResizeTable;
	        
	        //主内容容器resize
	        app.contentCtnResize=component.contentCtnResize;
	        
	        //hsla颜色
	        app.hsla=component.hsla;
	
	        /**
	         * [初始化app基础功能]
	         * @param  {[object]} Global   [app全局变量]
	         * @param  {[object]} Dispatcher
	         * @param  {[object]} Console  [日志记录]
	         * @param  {[object]} dev      [设备类型]  
	         * @param  {[object]} shelter  [遮罩]
	         */
	           
	        require(["handler","global", "dispatcher","dispatcher2", "dispatcher3", "console", "domain",'clipboard', "slimscroll", "skin", "validate", "tab", 'tableToExcel', 'vis','html2canvas','operateTopo', 'taffy', 'common','confInfo','grid','selectChoose','selectChoose2','nodata','echarts',"deviceTree",'showEcharts', 'drawEcharts', "commonEcharts",'echarts4', 'ace','datatables', 'jOrgChart', 'zTree', 'swithcer', 'json2', 'ajaxUpload','gsap',"datetimepicker","daterangepicker","jqueryUi","tinyselect","select2","multiselect","echarts_event","keyPanel","scrollable","quicksearch","eventDetails","multipleSelect","countUp","plugs","treeTable","aechars","difflib","diffview","ajaxDownload","clockpicker","fixedColumns","contextmenu","XLSX","diyFormEvents"],
	            function (handler,Global, Dispatcher, Dispatcher2, Dispatcher3, Console, domain,clipboard,slimscroll, skin, validate, Tab, tableToExcel, vis, html2canvas, operateTopo, taffy, common,confInfo,Grid,selectChoose,selectChoose2,nodata,echarts,deviceTree,showEcharts,drawEcharts, commonEcharts,echarts4,ace) {
	        		
	        		
	        		/*require(["G2"],function(G2){
	        			scope.G2 = G2;
	        		});  */
	        	
	        		//前端参数关联至全局对象
	        		app.handler = handler;
	                app.global = new Global();
	                app.showEcharts = showEcharts.showEcharts;
	                app.drawEcharts = drawEcharts.drawEcharts;
	                app.commonEcharts = commonEcharts.commonEcharts;
	
	                app.Grid = Grid;
	
	                //校验
	                app.validate = validate;
	                
	                app.clipboard = clipboard;
	                //此处初始化空对象，用于后续存储session数据以及页面间数据传递
	                app.domain = domain;
	                app.domain.getSessionId();
	
	                //公共配置树状结构函数
	                app.taffy=taffy.taffy;
	
	                //公共方法
	                app.common=common;
	                
	                //导出为excel
	                app.tableToExcel = tableToExcel.tableToExcel;
	                
	                //公共组件、设备的配置信息参数、方法集
	                app.confInfo=confInfo;
	                //指标图表
	               /* app.showData = showData;
	                app.showDataBigScreen = showDataBigScreen;*/
	                //多指标插件
	               /* app.kpisShow = kpisShow;
	                app.kpisShowBigScreen = kpisShowBigScreen;*/
	                //健康度显示卡
	               /* app.healtyShow = healtyShow;
	                app.eventFloatTip = eventFloatTip;*/
	                //联动插件
	                app.selectChoose = selectChoose;
	                app.selectChoose2 = selectChoose2;
	                app.nodata = nodata;
	                app.deviceTree = deviceTree;
	               /* app.kpiEvent = kpiEvent;*/
	                //echarts 图的公共集合
	                app.echarts = echarts;
	                app.echarts4 = echarts4;
	                app.ace = ace;
	                app.vis = vis;
	                app.html2canvas = html2canvas;
	              //拓扑图
	                app.operateTopo = operateTopo.operateTopo;
	                // 初始化控制台输出(web控制台及android logcat)
	                app.log = new Console(app.global.get("debug")).log;
	                // app.log("***********Here's some basic information*************");
	                // app.log("Current Version: " + app.global.get("version"));
	                // app.log("OS: " + navigator.platform);
	                // app.log("UserAgent: " + navigator.userAgent);
	                // app.log("CookieEnabled: " + navigator.cookieEnabled);
	                // app.log("OnLine: " + navigator.onLine);
	                // app.log("*****************************************************");
	                // app.log("");
	                app.shelter.hide();
	                app.shelter.lowerZIndex();
	
	                app.dispatcher = new Dispatcher();
	                app.dispatcher2 = new Dispatcher2();
	                app.dispatcher3 = new Dispatcher3();
	                app.tab = new Tab();
	
	                rewriteAjax();
	                require(["index"]);
	        });
	        
	        
	      //ajax方法再封装
	        function rewriteAjax2()
	        {
	        	var fnAjax = $.ajax;
	
	        	$.ajax = function (oOpt) 
	        	{
	        		oOpt.shelter = oOpt.shelter||false;
	        		var status_continue = oOpt.status_continue||false;
	        		var peel_data = oOpt.peel_data||false;
	        		
	              //默认参数
	        		var defaults = {
	        			async : true,
	        			type : "POST",
	        			contentType : "application/x-www-form-urlencoded;charset=utf-8",
	        			url  : '',
	        			dataType : "json",
	        			data : '',
	        			timeout : 10000,
	        		};
	        		
	        		//定义默认error、success的处理函数，如果有自定义的的处理函数，则重写
	        		var jFn = $.extend({
	        				error : function (XMLHttpRequest, textStatus, errorThrown)
	        				{
	        					if(textStatus == "timeout")
	        					{
	        						app.alert("请求超时，请稍后再试");
	        					}
	        				},
	        				success : function (data)
	        				{	
	        					var dataObj = data.content;
	        					if(status_continue == true)
	        					{
	        						if(oOpt.success)
	        						{
	        							oOpt.success(dataObj,data.status);
	        						}
	        						else
	        						{
	        							return;
	        						}
	        					}
	        					else
	        					{
	        						if(data.status == undefined){
	        							oOpt.success(data);
	        						}else{
	        							if(data.status)
	            						{
	            							if(oOpt.success)
	            							{//通信成功且重写success方法
	            								if(peel_data == true)
	            								{//如果需要剥离data.content数据层
	            									oOpt.success(dataObj);//返回剥离后的数据
	            								}
	            								else
	            								{//否则返回未玻璃的data数据
	            									oOpt.success(data);
	            								}
	            							}
	            							else
	            							{
	            								return;
	            							}
	            						}
	            						else
	            						{
	            							app.alert(data.errorMsg);
	            						}
	        						}
	        					}
	        				}
	        			}, {
	        			error: oOpt.error
	        			//success: oOpt.success,
	        		});
	        		
	        		//参数合并
	        		var _oOpt = $.extend(defaults, oOpt, {
	        			success : function (data) {
	        				if (oOpt.shelter)
	        					app.shelter.hide();
	        				jFn.success(data);
	        			},
	        			error : function (XMLHttpRequest, textStatus, errorThrown) {
	        				if (oOpt.shelter)
	        					app.shelter.hide();
	        				try
	        				{
	        	        		var oErr = eval("(" + (XMLHttpRequest.response ? XMLHttpRequest.response : XMLHttpRequest.responseText) + ")");
	        	        		!oOpt.preventError && app.alert('错误信息', oErr.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
	        	        	}
	        	        	catch(e)
	        	        	{
	
	        	        	}
	        				jFn.error(XMLHttpRequest, textStatus, errorThrown);
	        			}
	        		});
	
	        		if (oOpt.shelter)
	        			app.shelter.show(typeof(oOpt.shelter)==="boolean"?null:oOpt.shelter);
	
	        		fnAjax(_oOpt);
	        	};
	        }
	
	        //加载过jq后，扩展ajax方法
	        function rewriteAjax() {
	        	var fnAjax = $.ajax;
	
	    		$.ajax = function (oOpt) {
	    			oOpt.aimshelter = oOpt.aimshelter||false;
	                //oOpt.timeout=oOpt.timeout||1000000;
	    			var jFn = $.extend({
	    				complete: function (XMLHttpRequest, textStatus) {
	    				},
	    				error: function (XMLHttpRequest, textStatus, errorThrown) {
	    				}
	    			}, {
	    				complete: oOpt.complete,
	    				error: oOpt.error
	    			});
	
	    			var _oOpt = $.extend(oOpt, {
	    				complete: function (XMLHttpRequest, textStatus, errorThrown) {
	    					if (oOpt.aimshelter)
	    						app.shelter.hide();
	    					jFn.complete(XMLHttpRequest, textStatus, errorThrown);
	    				},
	    				error: function (XMLHttpRequest, textStatus, errorThrown) {
	    					if (oOpt.aimshelter)
	    						app.shelter.hide();
	
	    					try{
	    		        		var oErr = eval("(" + (XMLHttpRequest.response ?
	    		        				XMLHttpRequest.response : XMLHttpRequest.responseText) + ")");
	    		        		!oOpt.preventError && app.alert('错误信息', oErr.errorMsg, app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
	    		        	}catch(e) {
	
	    		        	}
	
	    					jFn.error(XMLHttpRequest, textStatus, errorThrown);
	    				}
	    			});   
	
	    			if (oOpt.aimshelter)
	    				app.shelter.show(typeof(oOpt.aimshelter)==="boolean"?null:oOpt.aimshelter);
					return fnAjax(_oOpt);
	    		};
	        }
	    });
    }
})(this);