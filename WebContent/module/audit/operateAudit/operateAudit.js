define(["jquery"],function(){
	
	return {
		
		load:function($el,scope,handler){
			const nameMap = {
				title: '标题',
				action: '操作动作',
				host_ip: '日志服务IP',
				req_log: '日志名',
				interface_method: '接口方法',
				type: '参数类型',
				content: '请求参数',
				operuser: '操作人',
				opertime: '操作时间',
				duration_time: '耗时',
				id: 'ID',
				category: '分类'
			};
			const PAGE_SIZE = 15;

			$('#start_time',$el).datetimepicker({
				autoclose: true,
				format: 'yyyy-mm-dd hh:ii:ss'
			}).val(new Date().Format('yyyy-MM-dd 00:00:00'));
			$('#end_time',$el).datetimepicker({
				autoclose: true,
				format: 'yyyy-mm-dd hh:ii:ss'
			}).val(new Date().Format('yyyy-MM-dd hh:mm:ss'));

			let urlData = {
				
			};
			let operate_tab = $('#operate_tab',$el).DataTable({
				"paging": true,
        		'sort': false,
				'searching'	: true,
				'pageLength': 15,
				"serverSide": true,
				"ajax": function(data, callback, settings) {
					urlData.type = '',
					urlData.startTime = $('#start_time',$el).val(),
					urlData.endTime = $('#end_time',$el).val();
					let page = data.length == 0 ? 0 : data.start / data.length;
					urlData.whereEx = JSON.stringify({
						page: page,
						size: PAGE_SIZE,
						title: $('#title_input',$el).val().trim() || '',
						action: $('#action_input',$el).val().trim() || '',
						operuser: $('#content_input',$el).val().trim() || '',
						content: $('#operuser',$el).val().trim() || '',
					});
					app.common.ajaxWithAfa({
						cache: false, // 禁用缓存
						url: 'LogOperationAction_getCommonOperationList.do',
						data: urlData
					}).done(function(result) {
						app.shelter.hide();
						result = result.result;
						var content = [],
							elements = 0,
							pages = 0;
						if(result) {
							content = result.list;
							elements = result.total;
						}
						for(var i in content) {
							content[i]['index'] = (data.start++) + 1;
						}
						callback({
							data: content,
							recordsFiltered: elements
						});
					});
				},
        		'columns': [{
        			data: 'index',defaultContent: '',title: '序号'
        		},{
					data: 'category',defaultContent: '',title: '模块'
				},{
					data: 'title',defaultContent: '',title: '标题'
				},{
					data: 'action',defaultContent: '',title: '操作动作'
				},{
					data: 'host_ip',defaultContent: '',title: '日志服务IP'
				},{
					data: 'req_log',defaultContent: '',title: '日志名'
				},{
					data: 'interface_method',defaultContent: '',title: '接口方法'
				},{
					data: 'type',defaultContent: '',title: '参数类型'
				},{
					data: 'content',defaultContent: '',title: '请求参数'
				},{
					data: 'operuser',defaultContent: '',title: '操作人'
				},{
					data: 'opertime',defaultContent: '',title: '操作时间',
        			render: function(data,type,row,meta){
        				return data && new Date(data).Format('yyyy-MM-dd hh:mm:ss');
        			}
				},{
					data: 'duration_time',defaultContent: '',title: '耗时'
				}]
			});


			function renderForm(data) {
				$('#operate_form',$el).empty();
				
				for(let i in data) {
					if(i == 'index'){
						continue;
					}
					let element = ['type','content'].includes(i) ? `<textarea data-role="${i}" name="" id="" cols="" rows="" disabled></textarea>` 
												: `<input type="text" id="input1" data-role="${i}" disabled/>`;
					let html = `<div class="control-group">
									<label for="input1" class="control-label">${nameMap[i]}</label>
									<div class="controls">
										${element}
									</div>
								</div>`;
					$('#operate_form',$el).append(html);
					$('#operate_form',$el).find(`[data-role="${i}"]`).val(data[i]);
				}

				let json = syntaxHighlight(JSON.parse(data['content']));
				$('#json_wrap',$el).html(json);
			
			}

			$('.query-btn',$el).on('click',function(e){
				e.stopPropagation();
				operate_tab.draw();
			});

			$('#operate_tab',$el).on('click','tbody>tr',function(e){
				e.stopPropagation();
				if($(this).hasClass('active')){
					return;
				}
				$('.operate-slider',$el).removeClass('show');
				handler.setTimeout(() => {
					$('.operate-slider',$el).addClass('show');
				},300);
				let data = operate_tab.row($(this)).data();
				renderForm(data);
			});

			$('.operate-slider i.fa-times',$el).on('click',function(e){
				e.stopPropagation();
				$('.operate-slider',$el).removeClass('show');
			});

			$el.on('click',function(){
				$('.operate-slider',$el).removeClass('show');
			});

			$('.operate-slider',$el).on('click',function(e){
				e.stopPropagation();
			});

			$('.operate-slider .nav>li',$el).on('click',function(e){
				e.stopPropagation();
				$(this).addClass('active').siblings().removeClass('active');
				let index = $(this).index();
				let $content = $(this).parent().next();
				$content.find('>div:eq('+index+')').addClass('active').siblings().removeClass('active');
			});

			function syntaxHighlight(json) {
				if (typeof json != 'string') {
					json = JSON.stringify(json, undefined, 4);
				}
				json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
				return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
				function(match) {
					var cls = 'number';
					if (/^"/.test(match)) {
						if (/:$/.test(match)) {
							cls = 'key';
						} else {
							cls = 'string';
						}
					} else if (/true|false/.test(match)) {
						cls = 'boolean';
					} else if (/null/.test(match)) {
						cls = 'null';
					}
					return '<span class="' + cls + '">' + match + '</span>';
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
