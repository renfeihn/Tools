define([],function(){
	return {
		load:function($el,scope,handler){
			console.log(scope);
			
			let type = scope.opType;
			let ips = scope.ips;
			
			const opTypeMap = {
					AGENT_INSTALL: '代理安装',
					PING: '代理刷新',
					START_AGENT: '代理启动',
					STOP_AGENT: '代理挂起',
					RESTART_AGENT: '代理重启',
					UPDATE_AGENT: '代理更新'
			};
			
			let shelter = {
				init($ele) {
					let html = `<div class="agent-shelter">
									<div class="agent-shelter-text">
										<div class="animation-wrap"><span></span><span></span><span></span></div>
										<div class="text-val"></div>
									</div>
								</div>`;
					$ele.append(html);
				},
				show(info) {
					$('.agent-shelter .text-val', $el).text(info);
					$('.agent-shelter', $el).addClass('show');
				},
				hide() {
					$('.agent-shelter', $el).removeClass('show');
				}
			};
			shelter.init($('.agent-excute',$el));


			init();
			function init() {
				if(type == 'UPDATE_AGENT'){
					//代理更新
					$('.file-wrap',$el).removeClass('hide');
					$('.upload-confirm',$el).addClass('disabled');
					getFileList();
				}
				renderList();
				bindEvents();
			}
			
			
			function bindEvents() {
				$('.file-list',$el).on('click','>li',function(){
					if($(this).hasClass('active')){
						return;
					}
					$('.excute-btn',$el).removeClass('disabled');
					$('.file-list input',$el).prop('checked',false);
					$(this).addClass('active').siblings().removeClass('active');
					$(this).find('input').prop('checked',true);
				});
				
				$('.excute-btn',$el).on('click',function(){
					if($(this).hasClass('disabled')){
						return;
					}
					$(this).addClass('disabled');
					let filename;
					if(type == 'UPDATE_AGENT'){
						filename = $('.file-list>li.active',$el).find('span:eq(0)').text();
					}
					excuteShell(ips,type,filename);
					$('.table-list i.fa',$el).addClass('fa-spin');
					//animations(0,ips.length);
				});
				
				$('#file_val',$el).on('change',function(){
					let files = document.getElementById('file_val').files;
					console.log(files);
					if(files.length <= 0) {
						app.alert("请先选择要上传的文件");
						return;
					}
					let acceptFileTypes = /(\.|\/)(tar|jar|zip|aar)$/i;
					if(!acceptFileTypes.test(files[0].name)) {
						app.alert("请上传tar/jar/zip/aar格式的压缩文件");
						return;
					}
					$('.file-name',$el).text(files[0].name);
					$('.upload-confirm',$el).removeClass('disabled');
					
				});
				
				$('.upload-confirm',$el).on('click',function(){
					if($(this).hasClass('disabled')){
						return;
					}
					uploadFile();
				});
				
				$('.upload-file',$el).on('click',function(){
					$('#file_val',$el).trigger('click');
				});
				
			}
			
			
			function uploadFile() {
				//上传文件到服务器
				$.ajaxFileUpload({
					url: "AgentManagerAction_uploadAgentFile.do", //处理文件脚本
					secureuri: false,
					fileElementId: 'file_val', //file控件id
					dataType: 'json',
					timeout: 30000,
					data: {
						timeout: 2000
					},
					async: false,
					success: function(data) {

						if(!data.status) {
							app.alert("文件上传失败，请联系管理员！");
							return;
						}

					},
					error: function(request, status, err) {

						if(status == "timeout") {
							app.alert("请求超时，请稍后再试！");

						}
					}
				});
			}
			
			function renderList() {
				let html = '';
				ips.forEach(item => {
					html += `<li data-ip="${item}">
								<span>${item}</span>
								<span>${opTypeMap[type]}</span>
								<span>待执行</span>
								<span><i class="fa fa-refresh" style="color: #22AC38"></i></span>
							</li>`;
				});
				$('.table-list',$el).html(html);
			}
			
			
			
			function getFileList() {
				app.common.ajaxWithAfa({
					url: 'AgentManagerAction_getAgentTarList.do',
					data: {}
				}).done(data => {
					if(data.agentTarList.length == 0){
						app.alert('服务端无代理文件,请联系管理员上传');
						$('.excute-btn',$el).addClass('disabled');
						return;
					}
					renderFileList(data.agentTarList);
				});
			}
			
			function renderFileList(arr) {
				let html = '';
				arr = arr.sort((a,b) => {
					return new Date(b.time).getTime() - new Date(a.time).getTime();
				});
				arr.forEach(item => {
					html += `<li>
								<span><input type="checkbox" />${item.fileName}</span>
								<span>${item.fileSize}</span>
								<span>${item.time}</span>
							</li>`;
				});
				$('.file-list',$el).html(html);
				$('.file-list>li:eq(0)',$el).trigger('click');
			}
			
			function renderResultList(obj) {
				for(let i in obj){
					let arr = obj[i];
					arr.forEach(item => {
						let ip = item.ip;
						let resultFlag = item.flag ? 'success' : 'fail';
						let result = item.flag ? '成功' : '失败';
						let desc = item.msg;
						let $li = $('.table-list>li[data-ip="'+ip+'"]',$el);
						$li.find('span:eq(2)').html(`<i class="fa fa-circle ${resultFlag}"></i> ${result}`);
						$li.find('span:eq(3)').text(desc);
					});
				}
			}	
			
			function animations(index,max) {
				if(index > max){
					$('.table-list>li',$el).removeClass('quick-running');
					return;
				}
				return new Promise(resolve => {
					$('.table-list>li:eq('+index+')',$el).addClass('quick-running');
					setTimeout(() => {
						resolve();
						animations(index+1);
					},1000);
				});
			}
			
			
			function excuteShell(ips,opType,filename) {
				//shelter.show('正在执行,请稍后...');
				$.ajax({
					type: "post",
					url: "AgentManageAction_shellCall.do",
					data: { 
						ip: ips, 
						opType: opType,
						filename: filename
					},
					dataType: "json",
					success: function(data) {
						//shelter.hide();
						if(data.status) {
							var content = data.content;
							if(content.status == 'T') {
								app.alert('提示', opType + '操作成功！', app.alertShowType.SUCCESS);
							} else {
								app.alert('提示', content.msg, app.alertShowType.ERROR);
							}
							renderResultList(content.opStats);
						}
					},
					error: function(data) {
						//shelter.hide();
						app.alert('提示', content.msg, app.alertShowType.ERROR);
					}
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