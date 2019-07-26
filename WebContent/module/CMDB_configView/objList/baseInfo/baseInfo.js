define([],function(){
	return {
		load:function($el,scope,handler){
			let objInfo = scope.objInfo;
			let dmDtId = scope.dmDtId;
			let statusMap = {
					0: '已投产',
					1: '已下线',
					2: '待投产',
					3: '投产中'
			};
			
			if($.isEmptyObject(objInfo)){
				clear();
				return;
			}
			
			function renderBase() {
				let html = `<div class="objectList-os" data-mwshowtype="shape" objectid="${dmDtId}" defid="${objInfo.cateId}">
								<p class="objectList-image-ctn green"></p>
								<p class="objectList-info-ctn">
									<span class="selectableText" id="l3_cate_name" title="${objInfo.name}">${objInfo.name}</span>
									<span class="selectableText " id="obj_ip" title="${objInfo.ip}">${objInfo.ip}</span>
									<span class="objectList-little">
										<span title="状态" class="objectList-shape-monitorShow  open"></span>
										<span title="状态"></span>
										<span title="用途" class="objectList-shape-agentShow  online"></span>
										<span title="用途"></span>
									</span>
								</p>
							</div>`;
				$('.baseInfo-left',$el).html(html);
			}
			
			renderBase();
			getBaseInfo();
			
			function isObjectFn (o) {
				return Object.prototype.toString.call(o) === '[object Object]';
			}
			

			function renderTable(content) {
				let obj = content.obj;
				let count = 0;
				let html = ``;
				for(let i in obj){
					if(!isObjectFn(obj[i])){
						let value = obj[i];
						let label = obj['fieldLabels'][i];
						html += `<li><span class="label-text">${label}</span><span class="value-text">${value}</span></li>`;
					}
				}
				$('.baseinfo-ul',$el).html(html);
			}
			
			function clear() {
				$('.baseInfo-left',$el).html('');
				$('.baseinfo-ul',$el).html('');
			}
			
			function getBaseInfo() {
				app.common.ajaxWithAfa({
					url:'AppConfigAction_getObjectDetail.do',
					data:{objId: dmDtId},
				}).then(function(content){
					let ret = content;
					renderTable(ret);
					
				});
			}
			
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});