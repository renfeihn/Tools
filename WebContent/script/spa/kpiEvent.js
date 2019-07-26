/*!
 * Javascript library v3.0
 *
 */

/**
 * 指标事件处理
 * @param  {[undefined]} undefined [确保undefined未被重定义]
 * @author 
 */
( /*<global>*/ function (undefined) {

	(function (factory) {
		"use strict";
		//amd module
		if(typeof define === "function" && define.amd) {
			define(["jquery"], factory);
		}
		//global
		else{
			factory();
		}

	})(function () {
		"use strict";
		

    	var showWarning = function($ctn,___urlParams,eventmod){
    		if(eventmod){
				$.ajax({
					'type': 'post',
					'contentType': 'application/x-www-form-urlencoded;charset=utf-8',
					'url': './KpiEventAction_getKpiEventNum.do',
					'dataType': 'json',
					'data': {"reqParams":JSON.stringify(___urlParams)},
					'success': function (data) {
						if (data && data.status) {
							var kpiEventNum = data.content.kpiEventNum,
							$appendCtn,
							$nameCtn,
							cssStr='';
							//kpiEventNum = Math.round(Math.random());
							//kpiEventNum = 2;
							if(eventmod=='free'){
								$appendCtn = $ctn.parent().find('[data-role="freeTip"]');
								$nameCtn = $ctn.parent().find('.free-keyname');
							}else if(eventmod=='keypanel'){
								$appendCtn = $ctn.parent().parent().parent().find('.kp-tip');
								$nameCtn = $appendCtn.find('[data-role="mainTitle"]');
								cssStr = 'style="top: 0;"';
							}else if(eventmod=='oswin'){
								$appendCtn = $ctn.parent().find('.windows-title');
								$nameCtn = $appendCtn.find('span');
								cssStr = 'style="top: 0;margin-right: 8px;"';
							}else if(eventmod=='osunix'){
								$appendCtn = $ctn.parent().find('.unix-title');
								$nameCtn = $appendCtn.find('span');
								cssStr = 'style="top: 0;margin-right: 8px;"';
							}else if(eventmod=='db2'){
								$appendCtn = $ctn.parent().find('.divTitle');
								$nameCtn = $appendCtn.find('span');
								cssStr = 'style="top: 0;margin-right: 8px;"';
							}else if(eventmod=='db2-2'){
								$appendCtn = $ctn.parent().parent().find('.divTitle');
								$nameCtn = $appendCtn.find('span');
								cssStr = 'style="top: 0;margin-right: 8px;"';
							}else if(eventmod=='was'){
								$appendCtn = $ctn.parent().find('.kp-tip');
								$nameCtn = $appendCtn.find('span');
								cssStr = 'style="top: 0;margin-right: 8px;"';
							}else if(eventmod=='sqlserver'){
								$appendCtn = $ctn.parent().find('.divTitle');
								$nameCtn = $appendCtn.find('span');
								cssStr = 'style="top: 0;margin-right: 8px;"';
							}else if(eventmod=='oracle'){
								$appendCtn = $ctn.parent().find('.divTitle');
								$nameCtn = $appendCtn.find('span');
								cssStr = 'style="top: 0;margin-right: 8px;"';
							}else if(eventmod=='oracle-2'){
								$appendCtn = $ctn.parent().parent().find('.divTitle');
								$nameCtn = $appendCtn.find('span');
								cssStr = 'style="top: 0;margin-right: 8px;"';
							}
							if($appendCtn){
								$('.kpi-event-ctn',$appendCtn).off('click').remove();
								$nameCtn.css('color','');
								if(kpiEventNum>0){
						    		var html = '<div class="kpi-event-ctn" title="指标报警数:_kpiEventNum_"'+cssStr+'><img src="./img/free/waring.png">_kpiEventNum_</div>';
									html = html.replace(/_kpiEventNum_/g,kpiEventNum);
						    		$appendCtn.prepend(html);
						    		eventblind($('.kpi-event-ctn',$appendCtn),___urlParams,eventmod,$nameCtn.html());
						    		$nameCtn.css('color','#fa594d');
						    		$ctn.trigger('addKipEventEnd');  //change by cailiangmu
								}
							}
						}else{
							app.alert('提示', data.errorMsg || '获取指标事件数失败', app.alertShowType.ERROR);
						}
					}
				});
    		}
    		
    		function eventblind($btn,urlParams,eventmod,ctntitle){
    			var exportEventData = {"event_status":["0","1"],"notequ_field_list":["event_type"],"event_type":['0']},
    			title;
				exportEventData['obj_id'] = urlParams.obj_id;
				exportEventData['device_id'] = urlParams.server_id;
				exportEventData['kpi_id'] = urlParams.kpi_def_id;
    			if(eventmod=='free'){
    				exportEventData['app_id'] = urlParams.app_idr;
    				title=urlParams.kpiname||'';
    				title+='-'+(urlParams.appandservername||'多应用多服务器');
    			}else{
    				exportEventData['app_id'] = urlParams.app_id;
    				title = ctntitle+"-"+urlParams.eventtile;
    			}
    			$btn.click(function(){
					app.domain.exports('kpEvent',{'exportEventData':exportEventData});
					app.dispatcher.load({ 
						title:title+'-未解决事件', //attention     
	            		moduleId:"event"	    
					});
	    		});
    		}
    	}
		
		return {
			showWarning: showWarning
		}
	});

})();