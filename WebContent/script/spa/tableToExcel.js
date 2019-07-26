/**
 * [公共方法]
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author lijiancheng@cfischina.com
 */
( /*<global>*/ function (undefined) {

    (function (factory) {
        "use strict";

        //amd module
        if(typeof define === "function" && define.amd) {
            define(factory);
        }
        //global
        else{
            factory();
        }

    })(function () {
        "use strict";
        
        var idTmr;
        function  getExplorer() {
            var explorer = window.navigator.userAgent ;
            //ie
            if (explorer.indexOf("MSIE") >= 0) {
                return 'ie';
            }
            //firefox
            else if (explorer.indexOf("Firefox") >= 0) {
                return 'Firefox';
            }
            //Chrome
            else if(explorer.indexOf("Chrome") >= 0){
                return 'Chrome';
            }
            //Opera
            else if(explorer.indexOf("Opera") >= 0){
                return 'Opera';
            }
            //Safari
            else if(explorer.indexOf("Safari") >= 0){
                return 'Safari';
            }
        }
        
        
        /**
         * 参数说明：
         * 	tableId： 要导入table的id，
         * 	btnId： 按钮id，
         * 	content： 当然页面容器
         */
        
        //将table数据导入excel
        var tableToExcel = function(param){
        	var tableId = param.tableId,//表格id  用于后面获取表格内所有内容
        		btnId = param.btnId,
        		content = param.content,
                excelName = param.excelName || '下载',//下载文件名  不传则默认 下载.xls
                tableHtml = param.tableHtml;//指定表格html  用于获取指定表格内的内容(与tableid只需指定一个，两个都有时优先级高于tableid)       	
        	function init(){
        		$("#"+btnId,content).off('click').on("click",function(){
        			if(param.beforeDownload){
        				param.beforeDownload().then(res => {
        					method(tableId,tableHtml);
        				});
        			}else{
        				method(tableId,tableHtml);
        			}
        			
        		});
        	}
        	
        	function method(tableid,tableHtml) {//整个表格拷贝到EXCEL中
                if(getExplorer()=='ie') {
                    var curTbl = document.getElementById(tableid);
                    var oXL = new ActiveXObject("Excel.Application");

                    //创建AX对象excel
                    var oWB = oXL.Workbooks.Add();
                    //获取workbook对象
                    var xlsheet = oWB.Worksheets(1);
                    //激活当前sheet
                    var sel = document.body.createTextRange();
                    sel.moveToElementText(curTbl);
                    //把表格中的内容移到TextRange中
                    sel.select;
                    //全选TextRange中内容
                    sel.execCommand("Copy");
                    //复制TextRange中内容
                    xlsheet.Paste();
                    //粘贴到活动的EXCEL中
                    oXL.Visible = true;
                    //设置excel可见属性

                    try {
                        var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
                    } catch (e) {
                        print("Nested catch caught " + e);
                    } finally {
                        oWB.SaveAs(fname);

                        oWB.Close(savechanges = false);
                        //xls.visible = false;
                        oXL.Quit();
                        oXL = null;
                        //结束excel进程，退出完成
                        //window.setInterval("Cleanup();",1);
                        idTmr = window.setInterval("Cleanup();", 1);
                    }
                } else {
                    tableToExcel(tableid,tableHtml);
                }
            }
            function Cleanup() {
                window.clearInterval(idTmr);
                CollectGarbage();
            }
            
            //注：<meta http-equiv="Content-Type" charset=utf-8"> 避免导出的 中文字符为乱码
            var tableToExcel = (function() {
    	    
    	        return function(table, name) {  
    	        	function saveAs(obj, fileName) {//当然可以自定义简单的下载文件实现方式 
    	                var tmpa = document.createElement("a");
    	                tmpa.download = fileName || "下载";
    	                tmpa.href = URL.createObjectURL(obj); //绑定a标签
    	                tmpa.click(); //模拟点击实现下载
    	                setTimeout(function () { //延时释放
    	                    URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
    	                }, 100);
    	            }
    	        	
                    if(!tableHtml){
        	        	var $th = $('#'+table,content).find('thead tr').children();
        	        	var thLen = $th.length;
        	        	if(thLen == 0){return;}
        	        	var thArr = [];
        	        	$th.each(function(index,item){
        	        		thArr.push($(item).text());
        	        	});
        	        	var $tbody = $('#'+table,content).find('tbody').children(),
        	        		trArr = [];
        	        	if($tbody.length == 0){
        	        		trArr.push(Array(thArr.length).fill(' '));
        	        	}else{
        	        		$tbody.each(function(index,item){
            	        		var tr = [];
            	        		$(item).children().each(function(ind,it){
            	        			tr.push($(it).text());
            	        		})
            	        		trArr.push(tr);
            	        	})
        	        	}
        	        	
        	        	var jsono = [];
        	        	for(var i=0,len=trArr.length;i<len;i++){
        	        		var obj ={};
        	        		for(var j=0,leng=thArr.length;j<leng;j++){
        	        			obj[thArr[j]] = trArr[i][j];
        	        		}
        	        		jsono.push(obj);
        	        	}

        	        	if(jsono.length == 0){return;}
                    }else{
                        var jsono = tableHtml;
                    }
//    	            var jsono = [{ //测试数据
//    	                "保质期临期预警(天)": "adventLifecycle",
//    	                "商品标题": "title",
//    	                "建议零售价": "defaultPrice",
//
//    	            },{ //测试数据
//    	                "保质期临期预警(天)": "adventLifecycle2",
//    	                "商品标题": "title2",
//    	                "建议零售价": "defaultPrice2",
//    	            }];
    	            var wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' };//这里的数据是用来定义导出的格式类型
    	            // const wopts = { bookType: 'csv', bookSST: false, type: 'binary' };//ods格式
    	            // const wopts = { bookType: 'ods', bookSST: false, type: 'binary' };//ods格式
    	            // const wopts = { bookType: 'xlsb', bookSST: false, type: 'binary' };//xlsb格式
    	            // const wopts = { bookType: 'fods', bookSST: false, type: 'binary' };//fods格式
    	            // const wopts = { bookType: 'biff2', bookSST: false, type: 'binary' };//xls格式

    	            function downloadExl(data, type) {
    	                const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
    	                wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data);//通过json_to_sheet转成单页(Sheet)数据
    	                saveAs(new Blob([s2ab(XLSX.write(wb, wopts))], { type: "application/octet-stream" }), excelName + '.' + (wopts.bookType=="biff2"?"xls":wopts.bookType));
    	            }
    	            function s2ab(s) {
    	                if (typeof ArrayBuffer !== 'undefined') {
    	                    var buf = new ArrayBuffer(s.length);
    	                    var view = new Uint8Array(buf);
    	                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    	                    return buf;
    	                } else {
    	                    var buf = new Array(s.length);
    	                    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
    	                    return buf;
    	                }
    	            }
    	            
    	           downloadExl(jsono);
                }
    	    })();
        	
        	return {
        		init: init
        	}
        	
        }
        
        return {
        	tableToExcel: tableToExcel,
        	getExplorer : getExplorer
        }

    });

})();