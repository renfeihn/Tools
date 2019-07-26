define([], function() {
	return {
		load: function($el, scope, handler) {
			console.log(scope);
			$('#upload_form',$el).on('click',function(e){
				e.stopPropagation();
			});
			
			$('#multiple_download',$el).on('click',function(e){
				$(this).toggleClass('true false');
			});
			
			$('.cancelBtn',$el).on('click',function(){
				$('#logInfoSlider>ul>.close').trigger('click');
			});
			
			$('#upload_form input',$el).on('change',function(e){
				validate($('#upload_form',$el));
			});
			
			
			$('.confirmBtn',$el).on('click',function(){
				var flag = validate($('#upload_form',$el));
				console.log(flag);
				if(!validate){
					return;
				}
				let params = {};
				$('#upload_form input',$el).each((index,item) => {
					let key = $(item).attr('id');
					let v = $(item).val();
					params[key] = v;
				});
				params['judgeBatch'] = $('#multiple_download',$el).hasClass('true') ? true : false;
				params['agent'] = '';

				getSource().done(function(data) {
					let result = data.result;
					if($.isEmptyObject(result)){
						app.alert('请先配置日志源');
						return;
					}
					let p = ['appId','appName','category1','category2','category3','cateoryId',
					         'depth','fileName','fileType','filterFileHours','flushLastSecd','hostIp',
					         'logDirRegex','logId','logname','objectId','skipToEnd','sourceId','sourceName','sourceType'];
					let agent = {};
					p.forEach(item => {
						agent[item] = result[item]
					});
					let newParams = {...params,'source': JSON.stringify({...agent})};
					console.log(newParams);
					submit(newParams);
				});
			});
			
			// 表单数据验证
			function validate($content) {
				$('[required]', $content).each(function(){
					if($(this).val().trim() == '' && !$(this).next().hasClass("help-inline")){
						$(this).after('<span class="help-inline">不能为空</span>');
					}else if($(this).val().trim() != '' && $(this).next().hasClass("help-inline")){
						$(this).next().remove();
					}
				})
				if($('.help-inline', $content).length > 0){
					return false;
				}else{
					var validateResult = app.validate.validate({
					 	$context: $('#agentInfoSlider', $el),
					 	data: [{
					 		"id": "ip",
					 		"filter": {
					 			"require": true,
					 			"type": "host"
					 		},
					 	}, {
					 		"id": "port",
					 		"filter": {
					 			"require": true,
					 			"type": "port"
					 		},
					 	}],
					 	correctCallback: function($ele, correctMsg) {
					 		$ele.next().next().addClass('hide');
					 	},
					 	errorCallback: function($ele, errMsg) {
					 		$ele.next().next().removeClass('hide').text(errMsg);
					 	}
					 });
					 return validateResult.bResult;
				}
				 
			}
			
			function submit(params) {
				app.common.ajaxWithAfa({
            		url:'LogCfgSourceAction_addAutoCfgLogSource.do',
            		data: params
            	}).done(function (data) {
            		if(data.result){
            			app.alert('保存成功');
            			$('.cancelBtn',$el).trigger('click');
            		}
            	})
			}
			
			function getSource() {
				return app.common.ajaxWithAfa({
            		url:'LogCfgSourceAction_getSource.do',
            		data:{
            			sourceType: scope.sourceType,
            			sourceId: scope.sourceId
            		}
            	}).done(function (data) {
            		return $.Deferred().resolve(data);
            	})
			}
			
		},
		unload: function(handler) {},
		pause: function($el, attr, handler) {},
		resume: function($el, attr, handler) {}
	};
});
