define(["codemirror/lib/codemirror", "codemirror/mode/sql/sql", "codemirror/addon/hint/show-hint", "codemirror/addon/hint/sql-hint"],function(CodeMirror){
	return {
		load:function($el,scope,handler){
			var minHeight = 100;
			var maxHeight = 500;
			var offsetPos = 0;
			var currentPos = {};
			var newPos = {};
			var isDrag = false;
			
			app.domain.exports('SQLDetail', {
        		'refresh': false
        	});
			
			console.log(scope);
			let $formCopy = $('.forms-wrap',$el).html();
			let $modalFllow = $("#modalFllow", $el);		// 分享弹窗
			let cateUpdateFlag = '';  //选择分类标志
			let mode = scope.mode;  //创建=create 查看=check
			let sqlId = scope.sqlInfo && scope.sqlInfo.id;
			
			
			let sqlContent = CodeMirror.fromTextArea($('.sql-content textarea', $el)[0], {
				mode:  "text/x-sql",
                readOnly: false,
                styleActiveLine: true,
                lineNumbers:true,
                extraKeys: getExtraKeys(),
			});

			init();
			function init() {
				bindEvents();
				getObjectCategory();
				mode == 'create' ? initCreate() : initCheck();
			}
			
			function initCreate() {
				$('.forms-wrap .form-item-text',$el).text('');
				$('.forms-wrap .sql-cate-item',$el).remove();
				$('.user-info',$el).html('');
				$('.trends-list',$el).html('');
				$('.part-people-wrap',$el).html('');
				//$('.edit-btn',$el).trigger('click');	
				renderEditBtns();
				$('.action-title',$el).text('创建SQL');
				$('.form-edit',$el).trigger('click');
				$('.form-cancel',$el).addClass('hide');
				$('.form-item-file-download',$el).addClass('hide');
				$('.form-item-files-wrap',$el).removeClass('hide');
				//隐藏动态和评论
				$('.sql-detail-middle,.sql-detail-right',$el).addClass('hide');
				
			}
			
			function initCheck() {
				$('.form-item-file-download',$el).removeClass('hide');
				$('.form-item-files-wrap',$el).addClass('hide');
				$('.action-title',$el).text('查看SQL');
				$('.sql-detail-middle,.sql-detail-right',$el).removeClass('hide');
				
				if(scope.sqlInfo && scope.sqlInfo.attachmentPath){
					let fileName = '';
					let html = '';
					let files = scope.sqlInfo.attachmentPath.split('#');
					files.forEach(item => {
						let sp = item.split('/');
						fileName = sp[sp.length - 1];
						html += `<div class="flex jc-sb"><span>${fileName}</span><a href='${item}' download='${fileName}' target="_blank">下载文件</a></div>`;
					});
					$('.form-item-file-download',$el).html(html);
					
				}
				
				let nickName = JSON.parse(window.sessionStorage.getItem('user')).nickname;
				if(nickName == scope.sqlInfo.nickName){
					renderEditBtns();
				}else{
					renderCheckBtns();
				}
				renderSqlTitle();
				renderForm();
				getMember(sqlId);
				getDiscuss(sqlId);
				getAllStates(sqlId,0);
				getUserInfo(sqlId);
			}
			
			function renderSqlTitle() {
				let sqlInfo = scope.sqlInfo;
				$('.sql-title-wrap .sql-name',$el).text(sqlInfo.sqlName);
				$('.sql-title-wrap .sql-score',$el).text('(评价'+sqlInfo.score+'分)');
				$('.sql-title-wrap .sql-publish-time',$el).text(sqlInfo.publishTime+'发布');
				$('.sql-title-wrap .sql-update-time',$el).text(sqlInfo.updateTime+'最后更新');
			}
			
			function renderEditBtns() {
				let html = `<span class="form-edit" title="编辑"><i class="fa fa-edit"></i></span><span class="form-cancel hide" title="取消"><i class="fa fa-reply"></i></span><span class="form-save" title="保存"><i class="fa fa-save"></i></span>
							<span class="form-publish" title="发布"><i class="fa fa-paper-plane"></i></span><span class="form-share" title="分享"><i class="fa fa-share-alt"></i></span>`;
				$('.edit-btns',$el).html(html);
			}
			
			function renderCheckBtns() {
				let interested = scope.sqlInfo.interested;
				let interestTitle = interested == 'liked' ? '取消关注' : '关注';
				let html = `<span class="form-like ${interested}" title="${interestTitle}"><i class="fa fa-heart"></i></span><span class="form-share" title="分享"><i class="fa fa-share-alt"></i></span>`;
				$('.edit-btns',$el).html(html);
			}
			
			function renderForm() {
				let sqlInfo = scope.sqlInfo;
				$('p[data-field="sqlName"]',$el).text(sqlInfo.sqlName);
				$('p[data-field="sqlContext"]',$el).text(sqlInfo.sqlContext);
				$('p[data-field="sqlDesc"]',$el).text(sqlInfo.sqlDesc);
				let catesName = sqlInfo.categoryName.split('#');
				let catesId = sqlInfo.categoryId.split('#');
				let html = '';
				catesName.forEach((item,index) => {
					let id = catesId[index];
					html += `<span class="sql-cate-item" data-id="${id}"><span>${item}</span><span class="i-delete hide"><i class="fa fa-times"></i></span></span>`;
				});
				$('.sql-title-bottom',$el).html(html);
				html += `<span class="sql-cate-item-add add-btn hide"><i class="fa fa-plus"></i></span>`;
				$('p[data-field="sqlCate"]',$el).html(html);
				
				$('.form-item.sql-name,.form-item.sql-cate',$el).addClass('hide');
				
			}
			
			function bindEvents() {
				//激活编辑
				$('.edit-btns',$el).on('click','.form-edit',function(){
					$(this).addClass('hide');
					$('.form-publish,.form-share', $el).addClass('hide');
					$('.form-cancel,.form-item-files-wrap,.form-item.sql-name,.form-item.sql-cate',$el).removeClass('hide');
					$('.form-item-file-download',$el).addClass('hide');
					//$('.sql-cate-item',$el).addClass('editable');
					$('.forms-wrap>.form-item',$el).each((index,item) => {
						if($(item).hasClass('sql-cate')){
							$('.i-delete,.sql-cate-item-add',$('.forms-wrap',$el)).removeClass('hide');
						}else{
							let textEle = $(item).find('.form-item-text');
							let valueEle = $(item).find('.form-item-value');
							let inputEle = $(item).find('.form-item-value>*')[0];
							let text = textEle.text();
							$(inputEle).val(text);
							$(valueEle).removeClass('hide');
							$(textEle).addClass('hide');
							if($(item).hasClass('sql-content')){
								if(scope.sqlContext){
									text = scope.sqlContext.split('|')[1];
								}
								sqlContent.getDoc().setValue(text);
								sqlContent.refresh();
							}
						}
					});
				});
				//取消编辑
				$('.edit-btns',$el).on('click','.form-cancel',function(){
					$(this).addClass('hide');
					$('.form-publish,.form-share', $el).removeClass('hide');
					$('.form-item-files-wrap,.form-item.sql-name,.form-item.sql-cate',$el).addClass('hide');
					$('.form-edit,.form-item-file-download',$el).removeClass('hide');
					//$('.sql-cate-item',$el).removeClass('editable');
					$('.i-delete,.sql-cate-item-add',$('.forms-wrap',$el)).addClass('hide');
					
					let catesName = scope.sqlInfo.categoryName;
					let catesId = scope.sqlInfo.categoryId;
					let html = '';
					catesName.split('#').forEach((item,index) => {
						let id = catesId.split('#')[index];
						html += `<span class="sql-cate-item" data-id="${id}"><span>${item}</span><span class="i-delete hide"><i class="fa fa-times"></i></span></span>`;
					});
					html += `<span class="sql-cate-item-add add-btn hide"><i class="fa fa-plus"></i></span>`;
					$('.form-item-cates',$el).html(html);
					
					
					$('.forms-wrap>.form-item',$el).each((index,item) => {
						let textEle = $(item).find('.form-item-text');
						let valueEle = $(item).find('.form-item-value');
						valueEle.addClass('hide');
						textEle.removeClass('hide');
					});
				});

				// 发布
				$('.edit-btns',$el).on('click', '.form-publish', function(){
					app.common.ajaxWithAfa({
						url:'SqlMarketAction_updateCfgByFlag.do',
						data:{
							updateFlag: 3,
							sqlMarketCfgBean: JSON.stringify({
								'id': sqlId,
								'publishFlag': 1,
								'publishTime': new Date().Format('yyyy-MM-dd hh:mm:ss.S'),
								'createUser': scope.sqlInfo.createUser,
								'usedTimes': scope.sqlInfo.usedTimes
							})
						}
					}).done(function (data) {
						if(data.result){
							app.alert('发布成功');
							app.domain.exports('SQLDetail', {
				        		'refresh': true
				        	});
							app.tab.close("SQLTool-SQLDetail");
						}
					})
				})
				
				//添加分类
				$('.forms-wrap',$el).on('click','.sql-cate-item-add',function(){
					cateUpdateFlag = 'add';
					$('.cate-modal',$el).toggleClass('hide-cate-modal').attr('data-id','');
					renderActiveCates();
				});

				$('.cate-modal .close,.cate-modal-mask',$el).on('click',function(){
					$('.cate-modal',$el).addClass('hide-cate-modal');
				});
				
				//删除分类
				$('.forms-wrap',$el).on('click','.sql-cate-item .i-delete',function(e){
					e.stopPropagation();
					$(this).parents('.sql-cate-item').remove();
				});
				
				//选择讨论类型
				$('.select-wrap>span',$el).on('click',function(e){
					e.stopPropagation();
					$(this).next('ul').toggleClass('hide');
				});
				
				//点击隐藏弹窗
				$el.on('click',function(){
					$('.select-wrap ul',$el).addClass('hide')
				});
				
				//选择讨论类型
				$('.select-wrap ul>li',$el).on('click',function(e){
					e.stopPropagation();
					let text = $(this).text();
					let type = $(this).index();
					$(this).parents('.select-wrap').find('span>span').text(text);
					$(this).parent().addClass('hide');
					getAllStates(sqlId,type);
				});
				
				//上传附件
				$('.forms-wrap',$el).on('change','#upload_input',function(e){
					let thisDom = $(this)[0];
					let $p = $(this).parent();
					let file = thisDom.files[0];
					$('.filename',$p).text(file.name);
					renderFileUpload();
				});
				
				//保存
				$('.edit-btns',$el).on('click','.form-save',function(){
					if(!$('#sql_name',$el).val()){
						app.alert('title', '请输入sql名称', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
						return;
					}
					let cates = Array.from($('.form-item-cates>.sql-cate-item',$el)).map(item => {
						return {
							id: $(item).attr('data-id'),
							names: $(item).find('span').text()
						}
					});
					if(cates.length == 0){
						app.alert('title', '请选择分类', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
						return;
					}
					if(sqlContent.getDoc().getValue() == ''){
						app.alert('title', '请输入sql内容', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
						return;
					}
					sqlId ? updateSql() : addSql();
				});
				
				//动态 讨论
				$('.operates>span',$el).on('click',function(){
					$(this).addClass('active').siblings().removeClass('active');
					let index = $(this).index();
					$('.sql-detail-bottom-right>div:eq('+index+')',$el).removeClass('hide').siblings().addClass('hide');
				});
				
				//评分
				$('#triggerStars>span',$el).on('mouseenter',function(){
					$('.score-wrap',$el).removeClass('hide');
				});
				$('.score-box',$el).on('mouseleave',function(){
					$('.score-wrap',$el).addClass('hide');
				});
				
				$('.stars-wrap>i[data-role="star"]', $el).on('mouseenter', function(){
					let index = $(this).index();
					$('.stars-wrap>i[data-role="star"]:lt('+(index+1)+')',$el).attr('class','fa fa-star');
					$('.stars-wrap>i[data-role="star"]:gt('+index+')',$el).attr('class','fa fa-star-o');
					$('.score-add-num',$el).text(index+1);
				});
				$('.score-wrap .score-confirm',$el).on('click',function(){
					let score = $('.score-add-num',$el).text();
					addScore(sqlId,score);
				});
				$('.score-wrap .score-cancel',$el).on('click',function(){
					$('.score-wrap',$el).addClass('hide');
				});
				
				//拖拽
				$('.resize-bar',$el).on('mousedown',function(){
					let $this = $(this);
					var e = e || window.event;
					currentPos.y = e.pageY;
					isDrag = true;
					$(document).on("mousemove",function(e){
						if(!isDrag) return
						var e = e || window.event;
						newPos.y = e.pageY;
						offsetPos = currentPos.y - newPos.y;
						var nHei = parseInt($this.next().css("height"));
						if(nHei + offsetPos > minHeight && nHei + offsetPos < maxHeight){
							$this.next().css("height",nHei + offsetPos + "px");
						}
						currentPos.y = newPos.y;
					});
					$(document).on("mouseup",function(e){
						isDrag = false;
						$(document).off("mousemove").off("mouseup");
					})
				});
				
				//发表评论
				$('#comments',$el).on('keydown',function(e) {
					let str = $('#comments',$el).val();
					if(e.ctrlKey && e.keyCode == 13){
						$('#comments',$el).val(str + '\n');
					}else if(e.keyCode == 13){
						e.preventDefault();
						addDiscuss(sqlId,str);
					}
				});
				$('.discuss-publish',$el).on('click',function(){
					let str = $('#comments',$el).val();
					addDiscuss(sqlId,str);
				});
				
				//关注 取关
				$(".edit-btns",$el).on("click", '.form-like', function (e) {
					if($(this).hasClass('liked')){
						dislikeSql(sqlId);
					}else{
						likeSql(sqlId);
					}
					app.domain.exports('SQLDetail', {
		        		'refresh': true
		        	});
				});
				
				/*分享*/
				$(".edit-btns",$el).on("click", '.form-share', function (e) {
					$modalFllow.modal('show');
					$modalFllow.attr('data-id', sqlId);
				})
				
				$("#isAddSql", $modalFllow).on("click", function () {
					var tag = $(this).hasClass('true');
					if (!!tag) {
						$("#isAddPersonDiv", $modalFllow).show();
					} else {
						$("#isAddPersonDiv", $modalFllow).hide();
						if ($("#isAddPerson", $modalFllow).hasClass('true')) {
							$("#isAddPerson", $modalFllow).trigger('click')
						}
					}
				})
				
				$("#isAddPerson", $modalFllow).on("click", function () {
					if($(this).hasClass('true')) {
						$("#presonList", $modalFllow).hide();
					} else {
						$("#presonList", $modalFllow).show();
						if ($("#presonList>.person-list", $modalFllow).length === 0) {
							var id = $modalFllow.attr('attr-id');
							getMemeber(id);
						}else{
							$("#presonList>.person-list", $modalFllow).removeClass('select');
						}
					}
				})
				
				$(".confirmBtn", $modalFllow).on("click", async function () {
					var id = $modalFllow.attr('data-id');
					var url = 'SqlMarketAction_updateCfgByFlag.do';
					var flag = !$("#isAddSql", $modalFllow).hasClass('true') ? 0 : 1;
					var userIds = [];
					$.each($("#presonList>.person-list.select", $modalFllow), function () {
						userIds.push(this.dataset.id);
					})
					var data = {
						updateFlag: 2,
						sqlMarketCfgBean: JSON.stringify({
							id,
							flag,
						})
					};
					if (!flag) {
						data = Object.assign({}, data, {userIds: userIds})
					}
					var ret = await ajaxWithAfa(url, data);
					if (ret.result) {
						app.alert('分享成功！');
					}
				})
				
				$("#presonList", $modalFllow).on("click",'.person-list',function () {
					if ($(this).hasClass('select')) {
						$(this).removeClass('select')
					} else {
						$(this).addClass('select')
					}
				})
				/*分享*/
				
			}
			
			function renderStar(num) {
				num = Number(num).toFixed(1);
				let full = Math.floor(num);
				let half = num == full ? 0 : 1;
				let empty = 5 - full - half;
				let stars = '';
				full && new Array(full).fill('').map(item => stars += '<i class="fa fa-star"></i>');
				half && new Array(half).fill('').map(item => stars += '<i class="fa fa-star-half-full"></i>');
				empty && new Array(empty).fill('').map(item => stars += '<i class="fa fa-star-o"></i>');
				stars += `<i class="fa">${num}</i>`;
				return stars;
			}
			
			//添加多个附件
			function renderFileUpload() {
				let totalLength = $('.form-item-files-wrap>.form-item-file',$el).length;
				let fileLength = Array.from($('.form-item-files-wrap>.form-item-file',$el)).filter(item => {
					let thisDom = ($(item).find('input[type="file"]'))[0];
					if(thisDom.files.length > 0){
						return true;
					}
				}).length;
				if(totalLength > fileLength){
					return;
				}
				let html = `<div class="form-item-file form-item-file-add">
								<span class="add-btn"><i class="fa fa-plus"></i></span><span class="filename">上传附件</span>
								<input type="file" id="upload_input"/>
							</div>`;
				$('.form-item-files-wrap',$el).append(html);
			}
			
			/* 公共ajax请求  */
			function ajaxWithAfa (url, data) {
				return new Promise( (resolve, reject) => {
					app.common.ajaxWithAfa({
						url:url,
						data:data
					}).then(function(data){
						resolve(data);
						app.shelter.hide();
					})
				})
			}
			
			//获取用户列表
			async function getMemeber(sqlId) {
				var url = 'UserAction_getAllUsers.do';
				var data = {};
				var ret = await ajaxWithAfa(url, data);
				var h = ret.users.map(item => {
					return `<div class="person-list" data-id="${item.id}">
								<span class="fa"></span>
								<span class="person-name">${item.nickname}</span>
							</div>`
				}).join('');
				$("#presonList", $modalFllow).html(h);
			}
			
			//关注
			function likeSql(sqlId) {
				app.common.ajaxWithAfa({
					url:'SqlMarketAction_addInterest.do',
					data:{
						sqlMarketCfgBean: JSON.stringify({
							"sqlId": sqlId,
							"interestType":"2"
						})
					}
				}).done(function (data) {
					if(data.result){
						app.alert('关注成功');
						$('.form-like',$el).addClass('liked').attr('title','取消关注');
					}
				})
			}
			
			//取关
			function dislikeSql(sqlId) {
				app.common.ajaxWithAfa({
					url:'SqlMarketAction_delByUserId.do',
					data:{
						sqlId: sqlId
					}
				}).done(function (data) {
					if(data.result){
						app.alert('取消关注');
						$('.form-like',$el).removeClass('liked').attr('title','关注');
					}
				})
			}
			
			 function UploadFile(info,flag) {
				var form = new FormData(); // FormData 对象
	            var fileObj = [];
	            $('.form-item-files-wrap>.form-item-file',$el).each((index,item) => {
	            	let thisDom = ($(item).find('input[type="file"]'))[0];
	            	if(thisDom.files.length > 0){
	            		let file = thisDom.files[0];
	            		form.append("upfile", file, file.name);
	            	}
	            });
	            
	            var url =  flag == 'add' ? "SqlMarketAction_addCfg.do" : 'SqlMarketAction_updateCfgByFlag.do';// 接收上传文件的后台地址
	           
	            if(flag == 'update'){
	            	form.append("updateFlag", 3);
	            }
//		            if(fileObj){
//		            	form.append("upfile", fileObj); // 文件对象
//		            }
	            form.append('sqlMarketCfgBean',JSON.stringify(info));
	            xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
	            xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
	            xhr.onreadystatechange = function() {
	                if (xhr.readyState === 4 && xhr.status === 200) {
	                	uploadComplete();
	                }else{
	                	//app.alert('title', '保存失败', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
	                }
	            }

	            xhr.send(form); //开始上传，发送form数据
		      }
			 
			 
			//上传成功响应
	        function uploadComplete() {
	        	app.alert('保存成功');
	        	app.domain.exports('SQLDetail', {
	        		'refresh': true
	        	});
	        	app.tab.close("SQLTool-SQLDetail");
	        }

	        
		    //保存数据整理
		    function dataFormat() {
		    	let attachmentPath = [];
		    	 $('.form-item-files-wrap>.form-item-file',$el).each((index,item) => {
	            	let thisDom = ($(item).find('input[type="file"]'))[0];
	            	if(thisDom.files.length > 0){
	            		attachmentPath.push(thisDom.files[0].name); // js 获取文件对象
	            	}
	            });
		    	let cates = Array.from($('.form-item-cates>.sql-cate-item',$el)).map(item => {
					return {
						id: $(item).attr('data-id'),
						names: $(item).find('span').text()
					}
				});
		    	let attachmentPathStr = attachmentPath.join('#');
				let info = {
						sqlName: $('#sql_name',$el).val(),
						sqlContext: sqlContent.getDoc().getValue(),
						sqlDesc: $('#sql_desc',$el).val(),
						flag: 1,
						publishFlag: 1,
						categoryName: cates.map(item => item.names).join('#'),
						categoryId: cates.map(item => item.id).join('#'),
						attachmentPath: attachmentPathStr,	
				};
				return info;
		    }
			
			//保存sql
			function addSql() {
				let info = dataFormat();
				UploadFile(info,'add');
			}
			
			//修改sql
			function updateSql() {
				let info = dataFormat();
				info.id = sqlId;
				info.createUser = scope.sqlInfo.createUser;
				info.usedTimes = scope.sqlInfo.usedTimes;
				if(scope.sqlInfo.attachmentPath){
					//之前有附件  粗略判断是否修改了附件
					let files = scope.sqlInfo.attachmentPath.split('#');
					let fileNames = files.map(item => {
						let sp = item.split('/');
						return sp[sp.length - 1];
					});
					let nowFiles = Array.from($('.form-item-file',$el)).map(item => {
						return $(item).find('.filename').text();
					});
					if(nowFiles.every(item => fileNames.includes(item))) {
						updateSqlWithNoFile(info);
					}else{
						UploadFile(info,'update');
					}
				}else{
					//之前没附件
					if($('.filename',$el).text() == '上传附件') {
						updateSqlWithNoFile(info);
					}else{
						UploadFile(info,'update');
					}
				}
			}
			
			//更新sql
			function updateSqlWithNoFile(params) {
				app.common.ajaxWithAfa({
					url:'SqlMarketAction_updateCfgByFlag.do',
					data:{
						updateFlag: 3,
						sqlMarketCfgBean: JSON.stringify(params)
					}
				}).done(function (data) {
					if(data.result){
						app.alert('修改成功');
						app.domain.exports('SQLDetail', {
			        		'refresh': true
			        	});
						app.tab.close("SQLTool-SQLDetail");
					}
				})
			}
			
			//评分
			function addScore(id,score) {
				app.common.ajaxWithAfa({
					url:'SqlMarketAction_addScore.do',
					data:{
						sqlMarketInterestBean: JSON.stringify({
							"sqlId": id,
							"score": score
						})
					}
				}).done(function (data) {
					if(data.result){
						app.alert('评分成功');
						app.domain.exports('SQLDetail', {
			        		'refresh': true
			        	});
						$('.score-num',$el).text(score.toFixed(1));
						$('.score-wrap',$el).addClass('hide');
						//getUserInfo(id);
					}
				})
			}
			
			//查看user信息
			function getUserInfo(id){
				id = Number(id);
				$('.user-publish-time',$el).text('发布时间： '+ scope.sqlInfo.publishTime);
				$('.user-update-time',$el).text('最后更新时间： '+ scope.sqlInfo.updateTime);
				$('.rate-people',$el).text('评价: '+ scope.sqlInfo.scoreCount + ' 人');
				$('.score-num',$el).text((scope.sqlInfo.score).toFixed(1));
			}
			
			//查看组员
			function getMember(id) {
				id = Number(id);
				app.common.ajaxWithAfa({
					url:'SqlMarketGroupAction_getAllGroupMember.do',
					data:{
						sqlId : id,
					}
				}).done(function (data) {
					let result = data.result;
					if(result.length > 0){
						let html = '';
						result.forEach(item => {
							html += `<div class="part-people-item">${item.useranme}</div>`;
						});
						$('.part-people-wrap',$el).html(html);
					}
				})
			}
			
			//查看讨论
			function getDiscuss(id) {
				id = Number(id);
				app.common.ajaxWithAfa({
					url:'SqlMarketGroupAction_getAllComments.do',
					data:{
						sqlId : id,
					}
				}).done(function (data) {
					let result = data.result;
					if(result.length > 0){
						let typeMap = {1:'add',2:'change',3:'focus',4:'share',5:'discuss'};
						let html = '';
						result.forEach(item => {
							let time = new Date(item.createTime).Format('yyyy-MM-dd hh:mm:ss');
							html += `<li class="trends-item">
										<p class="trends-title flex jc-sb">
										<span class="inline-flex">
											<span class="trends-name">${item.username}发表评论</span>
										</span>
										<span  class="inline-flex">
											<span class="trends-time">${time}</span>
										</span>
									</p>
									<pre class="trends-content">${item.comments}</pre>
								</li>`;
							$('#discuss_list',$el).html(html);
						})
					}
				})
			}
			
			//添加讨论
			function addDiscuss(id,comments) {
				if(comments.trim() == ''){
					app.alert('title', '请输入评论内容', app.alertShowType.ERROR, app.alertMsgType.MESSAGE);
					return;
				}
				id = Number(id);
				app.common.ajaxWithAfa({
					url:'SqlMarketGroupAction_addComments.do',
					data:{
						sqlId : id,
						comments : comments 
					}
				}).done(function (data) {
					if(data.result == 'OK'){
						app.alert('发送成功');
						$('#comments',$el).val('');
						getDiscuss(id);
						getMember(id);
					}
				})
			}
			
			//查看动态
			function getAllStates(id,type) {
				id = Number(id);
				app.common.ajaxWithAfa({
					url:'SqlMarketDynamicStateAction_getAllStates.do',
					data:{
						sqlId : id,
						type : type
					}
				}).done(function (data) {
					let result = data.result;
					if(result){
						let typeMap = {1:'add',2:'change',3:'focus',4:'share',5:'discuss'};
						let html = '';
						result.forEach(item => {
							let time = new Date(item.create_time).Format('yyyy-MM-dd hh:mm:ss');
							html += `<li class="trends-item">
										<p class="trends-title flex jc-sb">
										<span class="inline-flex">
											<span class="trends-type ${typeMap[item.type]}"></span>
											<span class="trends-name">${item.title}</span>
										</span>
										<span  class="inline-flex">
											<span class="trends-time">${time}</span>
										</span>
									</p>
									<p class="trends-content">${item.context}</p>
								</li>`;
						})
						$('#state_list',$el).html(html);
					}
				});
			}
			
			
			function getExtraKeys() {
                return {
                    "'a'":completeAfter,
                    "'A'":completeAfter,
                    "'b'":completeAfter,
                    "'B'":completeAfter,
                    "'c'":completeAfter,
                    "'C'":completeAfter,
                    "'d'":completeAfter,
                    "'D'":completeAfter,
                    "'e'":completeAfter,
                    "'E'":completeAfter,
                    "'f'":completeAfter,
                    "'F'":completeAfter,
                    "'g'":completeAfter,
                    "'G'":completeAfter,
                    "'h'":completeAfter,
                    "'H'":completeAfter,
                    "'i'":completeAfter,
                    "'I'":completeAfter,
                    "'g'":completeAfter,
                    "'G'":completeAfter,
                    "'k'":completeAfter,
                    "'K'":completeAfter,
                    "'l'":completeAfter,
                    "'L'":completeAfter,
                    "'m'":completeAfter,
                    "'M'":completeAfter,
                    "'n'":completeAfter,
                    "'N'":completeAfter,
                    "'o'":completeAfter,
                    "'O'":completeAfter,
                    "'p'":completeAfter,
                    "'P'":completeAfter,
                    "'q'":completeAfter,
                    "'Q'":completeAfter,
                    "'r'":completeAfter,
                    "'R'":completeAfter,
                    "'s'":completeAfter,
                    "'S'":completeAfter,
                    "'t'":completeAfter,
                    "'T'":completeAfter,
                    "'u'":completeAfter,
                    "'U'":completeAfter,
                    "'v'":completeAfter,
                    "'V'":completeAfter,
                    "'w'":completeAfter,
                    "'W'":completeAfter,
                    "'x'":completeAfter,
                    "'X'":completeAfter,
                    "'y'":completeAfter,
                    "'Y":completeAfter,
                    "'z'":completeAfter,
                    "'Z'":completeAfter,
                    "'.'":completeAfter,
                    "'_'":completeAfter,
                    "'-'":completeAfter,
                    "' '":completeAfter,
                    // "Ctrl": "autocomplete",
                    // "Cmd": "autocomplete"
                };
            }
			
			function completeAfter(cm, pred) {
                var cur = cm.getCursor();
                if (!pred || pred()) setTimeout(function() {
                    if (!cm.state.completionActive){
                        cm.showHint({
                            completeSingle: false,
                            tables: {}
                        });
                    }
                }, 100);
                return CodeMirror.Pass;
            }
			
			/*获取三级分类*/
			function getObjectCategory(){
				return app.common.ajaxWithAfa({
					url: "ESSearchAction_getObjectCategory.do",
				}).done(function(data) {
					var data = data.result,
						appSystemData = data.app,
						assetObjectData = data.sys;
					putObjectData(appSystemData,'appSystem',true);
					putObjectData(assetObjectData,'assetObject');
					return $.Deferred().resolve();
				});
			}
			
			function putObjectData(appSystemData,id,tag){
				appSystemHtml = '<div>\
					<button type="button" class="resetCategory">重置</button>\
					<button type="button" class="closeCategory">关闭</button>\
					<button type="button" class="light confirmCategory">确定</button>\
				</div><div style="height: calc(100% - 85px);overflow-y: auto; position: relative;margin-bottom:40px !important;">';
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
			}
			
			//可访问日志相关点击事件
			$('.logSearchDetail-accessLogContent',$el).on('click',function(e){
				$('#dateSetectContent', $el).addClass('hide');
				e.stopPropagation();
			}).on('click','#accessLog',function(){//可访问日志点击显示列表选项
				//$('#accessLogUl',$el).toggle().find('li.active').removeClass('active');
				$('#accessLogUl',$el).trigger('logChange');
				$('#assetObject',$el).addClass('hide');
				$('#appSystem',$el).addClass('hide');
			}).on('click','#accessLogUl>li',function(){//点击显示隐藏右侧三级分类块
				var index = $(this).index();
				$(this).addClass('active').siblings().removeClass('active');
				if(index == 0){
					$('#appSystem',$el).removeClass('hide')
					$('#assetObject',$el).addClass('hide');
				}else{
					$('#appSystem',$el).addClass('hide')
					$('#assetObject',$el).removeClass('hide');
				}
			}).on('click','span,h5',function(){//选中三级分类
				if($(this).hasClass('disabled')){
					return;
				}
				$(this).toggleClass('active');
				saveCategory($(this));
			}).on('click','.closeCategory',function(){//关闭
				$('.cate-modal',$el).addClass('hide-cate-modal');
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
				updateCate();
				$('.cate-modal',$el).addClass('hide-cate-modal');
			}).on('logChange', '#accessLogUl', function(event) {
				var $obj = $(this).parent();
				if($obj.find('.active[data-role]').length >0){
					var length = $('.active[data-role=cate3]', $obj).length;
					$('#accessLog',$el).attr('data-val','0').html('有条件的日志（'+length+'）<i class="fa fa-sort-down"></i>');
				}else{
					$('#accessLog',$el).attr('data-val','1').html('可访问日志<i class="fa fa-sort-down"></i>');
				}
			});
			function saveCate($this) {
				let $root = $this.parents('.cate-list-wrap');
				let $parent = $this.parent();
				let dataRole = $this.attr('data-role');
				let active = $this.hasClass('active');
				$root.find('[data-role]').removeClass('active');
				$this.addClass('active');
				parentActive($this);
			}
			
			function parentActive($active) {
				let $root = $active.parents('.cate-list-wrap');
				let role = $active.attr('data-role');
				if(role == 'cate3'){
					var cate2 = $active.parent().prev();
					cate2.addClass('active');
					cate2.parent().siblings('h5').addClass('active');
				}else if(role == 'cate2'){
					var parent = $active.parent().parent();
					parent.find('[data-role=cate1]').addClass('active');
				}
			}
			
			function renderActiveCates() {
				$('.logSearchDetail-accessLogContent .cate-list-wrap',$el).find('.active').removeClass('active');
				if($('.form-item-cates>.sql-cate-item',$el).length > 0){
					
					let ids = Array.from($('.form-item-cates>.sql-cate-item',$el)).map(item => $(item).attr('data-id'));
					ids.forEach(item => {
						let cate = $('.logSearchDetail-accessLogContent',$el).find('[data-id='+item+']');
						let role = cate.attr('data-role');
						cate.addClass('active');
						if(role == 'cate3'){
							let cate2 = cate.parent().prev();
							let cate1 = cate2.parent().parent().find('[data-role=cate1]');
							cate2.addClass('active');
							cate1.addClass('active');
						}else if(role == 'cate2'){
							let cate1 = cate.parent().parent().find('[data-role=cate1]');
							cate1.addClass('active');
						}else{
							
						}
					});
				}
			}
			
			function getAllActiveCates() {
				let arr = [];
				$('.logSearchDetail-accessLogContent',$el).find('[data-role="cate1"].active').each((index1,item1) => {
					let cate1name = $(item1).attr('data-name');
					let cate1id = $(item1).attr('data-id');
					let cate2s = $(item1).nextAll().find('[data-role="cate2"].active');
					if(cate2s.length > 0){
						cate2s.each((index2,item2) => {
							let cate2name = $(item2).attr('data-name');
							let cate2id = $(item2).attr('data-id');
							let cate3s = $(item2).next().find('[data-role="cate3"].active');
							if(cate3s.length > 0){
								cate3s.each((index3,item3) => {
									let cate3name = $(item3).attr('data-name');
									let cate3id = $(item3).attr('data-id');
									arr.push({
										name: cate1name + '/' + cate2name + '/' + cate3name,
										id: cate3id
									});
								});
							}else{
								arr.push({
									name: cate1name + '/' + cate2name,
									id: cate2id
								});
							}
						});
					}else{
						arr.push({
							name: cate1name,
							id: cate1id
						});
					}
				});
				return arr;
			}
			
			function updateCate() {
				let cates = getAllActiveCates();
				let html = '';
				cates.forEach(item => {
					html += `<span class="sql-cate-item editable" data-id="${item.id}"><span>${item.name}</span><span class="i-delete"><i class="fa fa-times"></i></span></span>`;
				});
				$('.sql-title-bottom',$el).html(html);
				html += `<span class="sql-cate-item-add add-btn"><i class="fa fa-plus"></i></span>`;
				$('.form-item-cates',$el).html(html);
			}
			
			function saveCategory($this){ 
				var $parent = $this.parent();
				var dataRole = $this.attr('data-role');
				var active = $this.hasClass('active');
				if(dataRole == 'cate1'){
					if(active){
						//$('[data-role=cate2],[data-role=cate3]', $parent).addClass('active');
					}else{
						$('[data-role=cate2],[data-role=cate3]', $parent).removeClass('active');
					}
				}else if(dataRole == 'cate2'){
					var parent = $this.parent().parent();
					if(active){
						//$('[data-role=cate3]', $parent).addClass('active');
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
			/*获取三级分类*/
			
			
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			
		}
		
	}
});