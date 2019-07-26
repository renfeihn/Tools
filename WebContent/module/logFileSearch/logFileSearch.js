define([ "jquery" ,"upload"], function($, Upload) {
	return {
		load : function($el, scope, handler) {
			$el.css('min-height', '100%');
			$el.children('div').css('min-height', '100%');
			var esFileQueryString = {
				'size': 15,
				'sortedFields': {},
				'reserves': {}
			};

			var fileTime = {
				'fileStartTime': "",
				'fileEndTime': ""
			}
			getObjectCategory();

			$('#fileTime', $el).daterangepicker({
			    "timePicker": true,
			    "timePicker24Hour": true,
			    "timePickerSeconds": true,
			    "autoApply": true,
			    "parentEl": $el,
			    "locale": {
			        "direction": "ltr",
			        "format": "YYYY-MM-DD HH:mm:ss",
			        "separator": " ~ ",
			        "applyLabel": "确定",
			        "cancelLabel": "取消",
			        "fromLabel": "起始时间",
			        "toLabel": "结束时间",
			        // "customRangeLabel": "自定义",
			        "daysOfWeek": ["日","一","二","三","四","五","六"],
			        "monthNames": ['一月', '二月', '三月', '四月', '五月', '六月',
	                  '七月', '八月', '九月', '十月', '十一月', '十二月'],
			        "firstDay": 1
			    },
			    "applyClass": "confirmBtn pull-right",
			    "cancelClass": "btn-default hide"
			}).on('show.daterangepicker', function(){
				$('.daterangepicker', $el).css({
				    "margin-top": "-42px",
    				"border": "1px solid #ccc",
    				"margin-left": "87px",
    				"box-shadow": "0 5px 10px 0px rgba(0,0,0,0.3)"
				})
			}).on('apply.daterangepicker', function(ev, picker) {
				// fileTime.fileStartTime = $(this).val().split(" ~ ")[0];
				// fileTime.fileEndTime = $(this).val().split(" ~ ")[1];
			});

			var $dataTable = $('#dataTable', $el).DataTable({
				"pagingType": "full_numbers",
				'pageLength': 15,
				"bAutoWidth": true, // 自动宽度
				'bStateSave': false,
				'searching': false,
				'aoColumnDefs': [{
					"render": function(data, type, row, meta) {
						return data.substring(data.lastIndexOf('/')+1);
					},
					"targets": 1
				},{
					"render": function(data, type, row, meta) {
						return transforNumber(data);
					},
					"targets": 2
				},{
					"render": function(data, type, row, meta) {
						return `<a href="javascript:void(0);" class="logfilesearch-download" data-role="download"><i class="fa fa-download"></i>&nbsp;下载</a>`;
					},
					"targets": 6
				}],
				"orderMulti": true,
				"order": [[ 3, 'desc' ]],
				"serverSide": true,
				"ajax": function(data, callback, settings) {

					esFileQueryString.page = data.length == 0 ? 0 : data.start / data.length;
					var sortedFields = {};
					data.order.forEach(function(item){
						var columnName = data.columns[item.column].data[0];
						sortedFields[columnName] = item.dir;
					})
					esFileQueryString.sortedFields = sortedFields;
					var fileTime = $('#fileTime', $el).val();
					var fileStartTime = fileTime.split(" ~ ")[0];
					var fileEndTime = fileTime.split(" ~ ")[1];
					esFileQueryString['fileStartTime'] = fileStartTime;
					esFileQueryString['fileEndTime'] = fileEndTime;
					app.shelter.show();

					app.common.ajaxWithAfa({
						cache: false, // 禁用缓存
						url: 'ESSearchAction_listESFiles.do',
						data: {
							'esFileQueryString': JSON.stringify(esFileQueryString)
						}
					}).done(function(content) {
						app.shelter.hide();
						
						var result = content.result;
						
						result.files.forEach(function(item,index){
							item.index = data.start + 1 + index;
						})
						callback({
							data: result.files,
							recordsFiltered: result.totalRecords
						});
					});
				},
				columns: [{
						"data": ['index'],
						"orderable": false,
						"defaultContent": '-'
					}, {
						"data": ['_head_.file'],
						"defaultContent": '-'
					}, {
						"data": ['_head_.filesize'],
						"defaultContent": '-'
					}, {
						"data": ['_head_.filetime'],
						"defaultContent": '-'
					}, { 
						"data": ['_head_.hostip'],
						"defaultContent": '-'
					}, {
						"data": ['_head_.file'],
						"defaultContent": '-'
					}, {
						"data": null,
						"orderable": false,
						"defaultContent": '-'
					}
				]
			});
			
			function downLoadBigFile (urlData) {
				!app.Upload && (app.Upload = new Upload({defaultUrl: 'ESSearchAction_logFileDownLoad.do',checkDownLoadFinish: 'ESSearchAction_checkFileDownLoadIsFinish.do'}));
				app.Upload.push(urlData);
			}

			$('#dataTable tbody', $el).on('click', '[data-role="download"]', function(e){
				e.stopPropagation();
				var rowData = $dataTable.row($(this).closest("tr")).data();
				logOperationBean({
					urlData: {
						"host": rowData['_head_.hostip'],
						"index": rowData['_index'],
						"fileName": rowData['_head_.file'],
						"currentPath": rowData['_head_.file']
					}
				}, rowData, 14);
				downLoadBigFile({
					routing: rowData['_routing'],
					index: rowData['_index'],
					serialNo: rowData['_head_.logsn'],
					host: rowData['_head_.hostip'],
					fileName: rowData['_head_.file']
				})
//				$.ajaxDownload(
////					'ESSearchAction_downLogDoc.do',
//					'ESSearchAction_downloadLogOriginal.do',
//					{
//						// parent:tr._id,
//						routing: rowData['_routing'],
//						index: rowData['_index'],
//						serialNo: rowData['_head_.logsn'],
//						host: rowData['_head_.hostip'],
//						fileName: rowData['_head_.file'],
//					}
//				);

			}).on('dblclick', 'tr', function(e){
				e.stopPropagation();
				var rowData = $dataTable.row(this).data();
				logOperationBean({
					urlData: {
						"host": rowData['_head_.hostip'],
						"index": rowData['_index'],
						"fileName": rowData['_head_.file'],
						"currentPath": rowData['_head_.file']
					}
				}, rowData, 13);
				if(rowData){
					app.dispatcher.load({
						"title" : "文件查看",
						"moduleId" : 'logResultCheck',
						"section" : 'logFileDetail',
						"id" : 'logFileDetail'+app.global.getUniqueId(),
						"params" : { // 给标签传递参数
							"urlData": {
								"host": rowData['_head_.hostip'],
								"index": rowData['_index'],
								"fileName": rowData['_head_.file'],
								"currentPath": rowData['_head_.file']
							}
						}
					});
				}
			});
			
			function logOperationBean(params, rowData, type) {
	    		var param = {
	    			type: type,
	    			hostip: rowData['_head_.hostip'],
	    			file: rowData['_head_.file'],
	    			appids: rowData['_head_.appid'],
	    			param: params
	    		}
	    		app.common.recordLogOperete({logOperationBean: JSON.stringify(param)});
	    	}

			//可访问日志相关点击事件
			$('.logSearchDetail-accessLogContent',$el).on('click',function(e){
				$('#dateSetectContent', $el).hide();
				e.stopPropagation();
			}).on('click','#accessLog',function(){//可访问日志点击显示列表选项
				$('#accessLogUl',$el).toggle().find('li.active').removeClass('active');
				$('#accessLogUl',$el).trigger('logChange');
				$('#assetObject',$el).hide();
				$('#appSystem',$el).hide();
			}).on('click','#accessLogUl>li',function(){//点击显示隐藏右侧三级分类块
				var index = $(this).index();
				$(this).siblings().removeClass('active');
				$(this).toggleClass('active');
				/*if(index == 0){
					$('#accessLogUl',$el).hide();
					$('#accessLogUl',$el).trigger('logChange');
					$('#accessLog',$el).attr('data-val','1').html('可访问日志<i class="fa fa-sort-down"></i>');
					$('#assetObject',$el).hide();
					$('#appSystem',$el).hide();
					$('#assetObject, #appSystem', $el).find('h5.active,span.active').removeClass('active');
				}else*/ 
				if(index == 0){
					if($(this).hasClass('active')){
						$('#appSystem',$el).toggle();
					}else{
						$('#appSystem',$el).hide();
					}
					$('#assetObject',$el).hide();
				}else if(index == 1){
					if($(this).hasClass('active')){
						$('#assetObject',$el).toggle();
					}else{
						$('#assetObject',$el).hide();
					}
					$('#appSystem',$el).hide();
				}
			}).on('click','span,h5',function(){//选中三级分类
				if($(this).hasClass('disabled')){
					return;
				}
				$(this).toggleClass('active');
				saveCategory($(this));
			}).on('click','.closeCategory',function(){//关闭
				$(this).parent().parent().hide();
			}).on('click','.resetCategory',function(){//重置
				$(this).parent().parent().find('h5.active,span.active').removeClass('active');

				if($('#appSystem',$el).find('span.active,h5.active').length){//应用系统
					$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
				}else{
					$('#accessLogUl>li:eq(0)',$el).removeClass('choosed');
				}

				if($('#assetObject',$el).find('span.active,h5.active').length){//资产对象
					$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
				}else{
					$('#accessLogUl>li:eq(1)',$el).removeClass('choosed');
				}
			}).on('click','.confirmCategory',function(){//确定
				$(this).parent().parent().hide();
			}).on('logChange', '#accessLogUl', function(event) {
				var $obj = $(this).parent();
				if($obj.find('.active[data-role]').length >0){
					var length = $('.active[data-role=cate3]', $obj).length;
					$('#accessLog',$el).attr('data-val','0').html('有条件的日志（'+length+'）<i class="fa fa-sort-down"></i>');
				}else{
					$('#accessLog',$el).attr('data-val','1').html('可访问日志<i class="fa fa-sort-down"></i>');
				}
			});

			//点击空白使弹框隐藏
			$el.click(function(e){
				$('#accessLogUl',$el).hide();//隐藏可访问日志
				$('#accessLogUl',$el).trigger('logChange');
				$('#assetObject',$el).hide();
				$('#appSystem',$el).hide();
			});

			$('.logFileSearch-button', $el).on('click', function(){
				if ($(this).hasClass('disabled')) {
	    			app.alert('当前用户没有查询权限，请联系管理员！')
	    			return;
	    		}
				var filename = $('#filename', $el).val();
				var hostip = ($('#hostip', $el).val())?($('#hostip', $el).val()).split(','):[];
				if(hostip.length > 0) {
					esFileQueryString['reserves']['_head_.hostip'] = hostip;
				}else{
					delete esFileQueryString['reserves']['_head_.hostip'];
				}
				var accessLogSetting = JSON.parse(getAccessLogSetting());
				
				var apps = accessLogSetting.app.cate3;
				apps = apps.map(function(item){
					return item.cateName;
				})
				var cate1 = accessLogSetting.category.cate1;
				cate1 = cate1.map(function(item){
					return item.cateName;
				})
				var cate2 = accessLogSetting.category.cate2;
				cate2 = cate2.map(function(item){
					return item.cateName;
				})
				var cate3 = accessLogSetting.category.cate3;
				cate3 = cate3.map(function(item){
					return item.cateName;
				})
				
				if(apps.length > 0) {
					esFileQueryString['reserves']['_head_.appname'] = apps;
				}else{
					delete esFileQueryString['reserves']['_head_.appname'];
				}
				if(cate1.length > 0) {
					esFileQueryString['reserves']['_head_.category1'] = cate1;
				}else{
					delete esFileQueryString['reserves']['_head_.category1'];
				}
				if(cate2.length > 0) {
					esFileQueryString['reserves']['_head_.category2'] = cate2;
				}else{
					delete esFileQueryString['reserves']['_head_.category2'];
				}
				if(cate3.length > 0) {
					esFileQueryString['reserves']['_head_.category3'] = cate3;
				}else{
					delete esFileQueryString['reserves']['_head_.category3'];
				}
				
				if(filename) {
					esFileQueryString['filename'] = filename;	
				}else{
					delete esFileQueryString['filename'];
				}
				$dataTable.ajax.reload();
			})

			function transforNumber(number) {
				var GB = 1024*1024*1024;
				var MB = 1024*1024;
				var KB = 1024;
				if(number > GB) {
					return (number/GB).toFixed(2) + ' GB';
				}else if(number > MB) {
					return (number/MB).toFixed(2) + ' MB';
				}else if(number > KB) {
					return (number/KB).toFixed(2) + ' KB';
				}else{
					return number + 'B';
				}
			}

			function isValidIP(ip) {   
			    var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/   
			    return reg.test(ip);   
			}

			//获取三级分类
			function getObjectCategory(){
				return app.common.ajaxWithAfa({
					url: "ESSearchAction_getObjectCategory.do",
				}).done(function(data) {
					var data = data.result,
						appSystemData = data.app,
						assetObjectData = data.sys;
					if (!isHasCate3App(appSystemData)) {
						$(".logFileSearch-button", $el).addClass('disabled');
					}
					putObjectData(appSystemData,'appSystem', true);
					putObjectData(assetObjectData,'assetObject');
					return $.Deferred().resolve();
				});
			}
			
			function isHasCate3App (appSystemData) {
				try {
					var cate2 = appSystemData[0].childs;
					if (!cate2 || cate2.length === 0) {
						return false;
					}
					var child = [];
					cate2.forEach(item => {
						child = child.concat(item.childs);
					})
					if (child.length === 0) {
						return false;
					}
					return true;
				} catch (e) {
					return false
				}
			}
			
			function putObjectData(appSystemData,id, tag){
				appSystemHtml = '<div>\
					<button type="button" class="resetCategory">重置</button>\
					<button type="button" class="closeCategory">关闭</button>\
					<button type="button" class="light confirmCategory">确定</button>\
				</div><div style="max-height: 63vh;overflow-y: auto; position: relative;margin-bottom:40px !important;">';
				if(appSystemData.length>0){
					appSystemData.forEach(function(first,index){
						appSystemHtml += "<div class='logSearchDetail-accessLogList'><h5 data-role='cate1' data-id='"+first.cateId+"' data-name='"+first.cateName+"'>"+ first.cateName+'</h5>';
						if(first.childs.length>0){
							first.childs.forEach(function(second,twoIndex){
								appSystemHtml += '<div><span data-role="cate2" data-id="'+second.cateId+'" data-name="'+second.cateName+'">'+second.cateName+'</span>';
								if(second.childs.length>0){
									appSystemHtml += '<p>';
									second.childs.forEach(function(third,twoIndex){
										appSystemHtml += '<span data-role="cate3" data-id="'+third.cateId+'" data-name="'+third.cateName+'">'+third.cateName+'</span>';
									})
									appSystemHtml += '</p>';
								}
								appSystemHtml += '</div>';
							})
						}
						appSystemHtml += "</div>";
					})
				}
				appSystemHtml += "</div>";
				$('#'+id,$el).html(appSystemHtml);
//				if (tag) {
//					$('#'+id+' h5',$el).trigger('click');
//					$('#'+id+' button.confirmCategory', $el).trigger('click');
//					$el.trigger('click');
//				}
			}

			function setAccessLogSetting(category) {
				var appSystem = $('#appSystem',$el);
				var assetObject = $('#assetObject',$el);
				category.app.cate1.forEach(function (item) {
					$('[data-id='+item.cateId+']',appSystem).addClass('active');
				})
				category.app.cate2.forEach(function (item) {
					$('[data-id='+item.cateId+']',appSystem).addClass('active');
				})
				category.app.cate3.forEach(function (item) {
					$('[data-id='+item.cateId+']',appSystem).addClass('active');
				})

				category.category.cate1.forEach(function (item) {
					$('[data-id='+item.cateId+']',assetObject).addClass('active');
				})
				category.category.cate2.forEach(function (item) {
					$('[data-id='+item.cateId+']',assetObject).addClass('active');
				})
				category.category.cate3.forEach(function (item) {
					$('[data-id='+item.cateId+']',assetObject).addClass('active');
				})

				if(appSystem.find('span.active,h5.active').length){//应用系统
					$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
				}
				if(assetObject.find('span.active,h5.active').length){//资产对象
					$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
				}
			}

			function getAccessLogSetting() {
				var cate1App = [],
					cate2App = [],
					cate3App = [],
					cate1AppTmp = [],
					cate2AppTmp = [],
					cate3AppTmp = [],
					cate1 = [],
					cate2 = [],
					cate3 = [],
					appId = [];
				$('#appSystem .active[data-role=cate1]', $el).each(function () {
					cate1App.push({cateName:$(this).text(),cateId:$(this).attr('data-id')});
				})
				$('#appSystem .active[data-role=cate2]', $el).each(function () {
					cate2App.push({cateName:$(this).text(),cateId:$(this).attr('data-id')});
				})
				$('#appSystem .active[data-role=cate3]', $el).each(function () {
					cate3App.push({cateName:$(this).text(),cateId:$(this).attr('data-id')});
				})

				$('#assetObject .active[data-role=cate1]', $el).each(function () {
					cate1.push({cateName:$(this).text(),cateId:$(this).attr('data-id')});
				})
				$('#assetObject .active[data-role=cate2]', $el).each(function () {
					cate2.push({cateName:$(this).text(),cateId:$(this).attr('data-id')});
				})
				$('#assetObject .active[data-role=cate3]', $el).each(function () {
					cate3.push({cateName:$(this).text(),cateId:$(this).attr('data-id')});
				})
				
				/**
				 * 如果当前用户没有选择应用系统，那就默认上送全部的应用系统
				 * 江西银行需求 2019-03-06
				 * 修改人：范永超
				 */
				$('#appSystem *[data-role=cate1]', $el).each(function () {
					cate1AppTmp.push({cateName:$(this).text(),cateId:$(this).attr('data-id')});
				})
				$('#appSystem *[data-role=cate2]', $el).each(function () {
					cate2AppTmp.push({cateName:$(this).text(),cateId:$(this).attr('data-id')});
				})
				$('#appSystem *[data-role=cate3]', $el).each(function () {
					cate3AppTmp.push({cateName:$(this).text(),cateId:$(this).attr('data-id')});
				})
				if (cate3App.length === 0 ) {
					cate1App = cate1AppTmp;
					cate2App = cate2AppTmp;
					cate3App = cate3AppTmp;
				}
				
				return JSON.stringify({
					category:{cate1:cate1,cate2:cate2,cate3:cate3},
					app:{cate1:cate1App,cate2:cate2App,cate3:cate3App}
				});
			}
			
			function getAppIdsRecord() {
				appId = [];
				$('#appSystem .active[data-role=cate3]', $el).each(function () {
					appId.push($(this).attr('data-id'));
				})
				if (!appId.length) {
					$('#appSystem *[data-role=cate3]', $el).each(function () {
						appId.push($(this).attr('data-id'));
					})
				}
				return appId;
			}

			function saveCategory($this){ 
				var $parent = $this.parent();
				var dataRole = $this.attr('data-role');
				var active = $this.hasClass('active');
				if(dataRole == 'cate1'){
					if(active){
						$('[data-role=cate2],[data-role=cate3]', $parent).addClass('active');
					}else{
						$('[data-role=cate2],[data-role=cate3]', $parent).removeClass('active');
					}
				}else if(dataRole == 'cate2'){
					var parent = $this.parent().parent();
					if(active){
						$('[data-role=cate3]', $parent).addClass('active');
						parent.find('[data-role=cate1]').addClass('active');
					}else{
						 $('[data-role=cate3]', $parent).removeClass('active');
						 if(!parent.find('.active[data-role=cate2]').length){
						 	parent.find('[data-role=cate1]').removeClass('active');
						 }
					}
				}else if(dataRole == 'cate3'){
					var cate2 = $this.parent().prev();
					if(active){
						cate2.addClass('active');
						cate2.parent().siblings('h5').addClass('active');
					}else{
						if(!$this.siblings('.active[data-role=cate3]').length){
							cate2.removeClass('active');
						}

						if(!cate2.parent().parent().find('.active[data-role=cate3]').length){
							cate2.parent().siblings('h5').removeClass('active');
						}
					}
				}

				if($('#appSystem',$el).find('span.active,h5.active').length){//应用系统
					$('#accessLogUl>li:eq(0)',$el).addClass('choosed');
				}else{
					$('#accessLogUl>li:eq(0)',$el).removeClass('choosed');
				}

				if($('#assetObject',$el).find('span.active,h5.active').length){//资产对象
					$('#accessLogUl>li:eq(1)',$el).addClass('choosed');
				}else{
					$('#accessLogUl>li:eq(1)',$el).removeClass('choosed');
				}
			}
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});