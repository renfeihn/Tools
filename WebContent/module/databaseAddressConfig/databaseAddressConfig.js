define(["jquery"],function(){
	
	return {
		load:function($el,scope,handler){
			var $serverModal = $('#serverModal',$el);
			var noRepeat_project = new Set();
			var activeTrData;

			var shareUserList = [];
			// 获取当前用户Id
			var me_id;
			if(sessionStorage){
				me_id = JSON.parse(sessionStorage.getItem('user')).id;
				loadSearchTableData();
			}else{
				app.common.ajaxWithAfa({
					url: "LoginAction_loadNowUser.do"
				}).done(function(content){
					me_id = content.userVO.id;
					loadSearchTableData();
				})
			}

			var tipMap ={
				DB2: "jdbc:db2://127.0.0.1:6789/dbName",
				Mysql: "jdbc:mysql://127.0.0.1:3306/dbName",
				Oracle: "jdbc:oracle:thin:@127.0.0.1:1521:ORCL"
			}
			//agent采集Table
			var $searchTable = $('#searchTable',$el).DataTable({
				"pagingType": 'full_numbers',
				'searching'	: true,
				'bSort'		: false,
				'columns' 	: [{
					data : 'index',
				},{
					data : 'project', defaultContent : ''
				},{
					data : 'dbName', defaultContent : ''
				},{
					data : 'dbType', defaultContent : ''
				},{
					data : 'url', defaultContent : ''
				},{
					data : 'user', defaultContent : ''
				},{
					data : 'create', defaultContent : ''
				},{
					data : null, defaultContent : ''
				}],
				'aoColumnDefs' : [{
					"render": function(data, type, row, meta) {
						return `<span class="link-edit fa fa-edit" title="编辑"></span>
						<span class="link-del fa fa-trash-o" title="删除"></span>
						<span class="link-share fa fa-share ${row.createdUser != me_id?'disabled':''}" title="分享"></span>`;
                    },
                    "targets" : 7
				}]
			});
			
			/**
			 * 加载table数据
			 * @return {undefined}
			 */
			function loadSearchTableData() {
				app.common.ajaxWithAfa({
					url:'DbManagerAction_getManagers.do'
				}).done(function (data) {
					$searchTable.clear();
					noRepeat_project = new Set();
					var result = data.result;
					if(result && result.length > 0){
						result.forEach(function (item, index) {
							item.index = index+1;
							noRepeat_project.add(item.project);
						})
					}
					$searchTable.rows.add(result).draw();
				})
			}

			$('.databaseAddressConfig-btnGroup', $el).on('click', '.addBtn', function(event) {
				event.preventDefault();
				$serverModal.modal('show');
				initserverModal();

			});

			$('#searchTable tbody',$el).on('click', 'span.link-edit', function(event) {//编辑
				var tr = $searchTable.row($(this).parents('tr')).data();
				$serverModal.modal('show');
				activeTrData = tr;
				initserverModal(tr);
			}).on('click', 'span.link-del', function(event) {//删除
				var tr = $searchTable.row($(this).parents('tr')).data();
				app.confirmDialog({
					sTitle:"确认",       
	                sType:"search",
	                sContent:'确定删除该条记录？',
	                sBtnConfirm: '确定',
	                sBtnCancel: '取消',
	                fnConfirmHandler: function(tr){
	                	del(tr.id).then(function (data) {
	                		if(data.result && data.result != ""){
	                			app.alert('删除成功！');
	                			loadSearchTableData();
	                		}else{
	                			app.alert('删除记录失败！');
	                		}
	                	})
	                },
	                aArgs: [tr]
				});
			}).on('click', 'span.link-share', function(){//分享
				var tr = $searchTable.row($(this).parents('tr')).data();
				// 只允许创建人分享
				if(me_id != tr.createdUser){
					return;
				}
				app.shelter.show();
				var sharedUsers = tr.sharedUsers?tr.sharedUsers.split(','):null;
				getAllUser(function(userList){
					app.shelter.hide();
					var shareSelectHtml = userList.reduce(function(sum,item,index){
						return sum +=  item.id != tr.createdUser?`<div data-userid="${item.id}" class="${sharedUsers && sharedUsers.includes(item.id+'')?'checked':''}">
											<i class="fa fa-check-circle"></i>
											<span>${item.nickname}</span>
										</div>`:'';
					},'');
					$('#shareSelect', $el).html(shareSelectHtml).attr("data-id", tr.id);
					$('#shareModal', $el).modal('show');
				});
			});



			function getAllUser(fn){
				return app.common.ajaxWithAfa({
					url: "UserAction_getAllUsers.do"
				}).done(function(content){
					var userList = content.users;
					fn(userList);
				})
			}

			$('#shareSelect', $el).on('click', 'div', function(){
				$(this).toggleClass("checked");
			});

			$('#acceptShare', $el).click(function(){
				app.shelter.show();
				var sharedUserIds = [];
				var id = $('#shareSelect', $el).attr("data-id");
				$('#shareSelect>div.checked', $el).each(function(index, item){
					sharedUserIds.push(Number($(this).attr('data-userid')));
				})
				app.common.ajaxWithAfa({
					url: "DbManagerAction_share.do",
					data: {
						'id': id,
						'sharedUserIds': sharedUserIds
					}
				}).done(function(content){
					app.shelter.hide();
					if(content.result){
						app.alert('分享成功');
						$('#shareModal', $el).modal('hide');
						loadSearchTableData();
					}else{
						app.alert('分享失败');
					}
				})

			});

			// 预警模态框事件
			$serverModal.on('click', '.confirmBtn', function(event) {
				var id = $serverModal.attr('data-id');
				if(!validation()){
					return;
				}
				var formData = app.common.serializeObject($serverModal.find('form'));
				if(id){
					formData.id = id;
					modify(formData).then(function (data) {
						if(data.result){
							app.alert('修改成功！');
							loadSearchTableData();
						}else{
							app.alert('修改失败！');
						}
						$serverModal.modal('hide');	
					})
				}else{
					add(formData).then(function (data) {
						if(data.result){
							app.alert('新增成功！');
							loadSearchTableData();
						}else{
							app.alert('新增失败！');
						}
						$serverModal.modal('hide');	
					})
				}
			}).on('change', '[name="dbType"]', function(event) {
				event.preventDefault();
				var val = $(this).val();
				$('[name="url"]', $serverModal).val(tipMap[val]);
			}).on('click', '.linktest', function(event) {
				event.preventDefault();
				if(!validation()){
					return;
				}
				var formData = app.common.serializeObject($serverModal.find('form'));
				if(!formData.password){
					$('[name="password"]', $el).next().text('请填写密码').removeClass('hide');
					return;
				}else{
					$('[name="password"]', $el).next().addClass('hide');
				}
				test(formData).then(function (data) {
					if(data.result){
						app.alert('连接成功！');
					}else{
						app.alert('连接失败！');
					}
				})
			}).on('blur input change', '[name="project"]', function(){
				if(this.value && editFlag && this.value != activeTrData.project && noRepeat_project.has(this.value) || this.value && !editFlag && noRepeat_project.has(this.value)) {
					$(this).next().removeClass('hide').text('已存在的系统名');
				}else if(!this.value){
					$(this).next().removeClass('hide').text('不能为空');
				}else{
					$(this).next().addClass('hide');
				}
			});

			var editFlag;
			// 初始化模态框
			function initserverModal(tr) {
				$serverModal.find('form')[0].reset();
				$('.help-inline', $el).addClass('hide');
				$('[name="dbType"]', $serverModal).trigger('change');
				if(tr){
					editFlag = true;
					$('#myModalLabel', $el).text("修改数据源");
					$serverModal.attr('data-id', tr.id);
					for (var item in tr) {
						if (tr.hasOwnProperty(item)) {
							$('[name="'+item+'"]', $serverModal).val(tr[item]);
						}
					}
				}else{
					editFlag = false;
					$('#myModalLabel', $el).text("新增数据源");
					$serverModal.removeAttr('data-id');
				}
			}

			function modify(urlParam) {
				return app.common.ajaxWithAfa({
					url:'DbManagerAction_update.do',
					data:{
						manager: JSON.stringify(urlParam)
					}
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			function add(urlParam) {
				return app.common.ajaxWithAfa({
					url:'DbManagerAction_add.do',
					data:{
						manager: JSON.stringify(urlParam)
					}
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			function del(id) {
				return app.common.ajaxWithAfa({
					url:'DbManagerAction_del.do',
					data:{
						id:id
					}
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			function test(urlParam) {
				return app.common.ajaxWithAfa({
					url:'DbManagerAction_testConnection.do',
					data:{
						manager: JSON.stringify(urlParam),
						passwd: urlParam.password
					}
				}).done(function (data) {
					return $.Deferred().resolve(data);
				})
			}

			function validation(){
				$('[required]', $el).each(function(){
					if($(this).val().trim() == ''){
						$(this).next().text('不能为空').removeClass('hide');
					}else if($(this).val().trim() != ''){
						$(this).next().addClass('hide');
					}
				})

				var $project = $('[name="project"]', $el);
				var project = $('[name="project"]', $el).val();
				if(!project){
					$project.next().removeClass('hide').text('不能为空');
				}else if(editFlag && project != activeTrData.project && noRepeat_project.has(project) || !editFlag && noRepeat_project.has(project)) {
					$project.next().removeClass('hide').text('已存在的系统名');
				}else{
					$project.next().addClass('hide');
				}

				if($('.help-inline', $el).not('.hide').length > 0){
					return false;
				}else{
					return true;
				}
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
