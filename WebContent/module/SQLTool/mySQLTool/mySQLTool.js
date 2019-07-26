define(['pagination'],function(pagination){
	return {
		load:function($el,scope,handler){
			
			let myPublished = [];	//我发布的
			let myInterested = [];	//我关注的
			let myPublishedCopy = [];
			let myInterestedCopy = [];
			let $modalFllow = $("#modalFllow", $el);		// 分享弹窗
			let searchCate = '';
			

			let myPublished_pageNum = 1;// 分页页码
			let myInterested_pageNum = 1;// 分页页码
			let pageSize = 10;// 每页显示条数

			init();
			function init() {
				bindEvents();
				$('#search_published',$el).trigger('click');
			}
			
			function bindEvents() {
				//显示选择分类
				$('.sql-cate-btn',$el).on('click',function(e){
					e.stopPropagation();
					$('.logSearchDetail-accessLogContent',$el).toggleClass('hide');
				});
				
				//点击空白 隐藏弹窗
				$el.on('click',function(e){
					$('.logSearchDetail-accessLogContent',$el).addClass('hide');
				});
				$('.logSearchDetail-accessLogContent',$el).on('click',' *',function(e){
					e.stopPropagation();
				});
				
				//选择热搜
				$('.info-wrap',$el).on('click','>span',function(){
					let text = $(this).text();
					$('#sqlname_search',$el).val(text);
					$('#search_published',$el).trigger('click');
				});
				
				//搜索
				$('#sqlname_search',$el).on('keyup',function(e){
					var keyCode = e.keyCode;
					if(keyCode == 13){
						$('#search_published',$el).trigger('click');
					}
				});
				
				//搜索
				$('#search_published', $el).on('click',function(){
					getPublished();
					getInterested();
					getHotWords();
				});
				
				//执行
				$('.sqls-wrap',$el).on('click','span[data-operate="excute"]',function(e){
					e.stopPropagation();
					let $sqlItem = $(this).closest('.sql-item');
					let sqlId = $sqlItem.attr('data-id');
					let zhixingcishu = parseInt($sqlItem.find('[data-role="zhixingcishu"]').html());
					excute(sqlId, function(){
						$sqlItem.find('[data-role="zhixingcishu"]').html(zhixingcishu+1);
					});
					let sqlContext = $.trim($sqlItem.find('.sql-detail').html());
					app.dispatcher.load({
						"title": "日志搜索",
						"moduleId" : "logResultCheck",
						"section" : "logSearchDetail",
						"id" : "logSearchDetail",
						 "params" : { // 给标签传递参数
							 param: {
								 searchText: '* |' + sqlContext
							 } 
						 },
						"context" : $el
					});
				});
				
				//取消关注
				$('.sqls-wrap',$el).on('click','.liked',function(){
					let $sqlItem = $(this).closest('.sql-item');
					let sqlId = $sqlItem.attr('data-id');
					dislikeSql(sqlId);
				});
				
				/*分享*/
				$("#myToolContainer", $el).on("click", 'span[data-operate="share"]', function (e) {
					var id = $(this).parents('.sql-item').attr('data-id');
					$modalFllow.find('.boolean-switch').attr('class','boolean-switch');
					$modalFllow.find('.selected').removeClass('selected');
					$("#presonList", $modalFllow).hide();
					$modalFllow.modal('show');
					$modalFllow.attr('data-id', id);
				});
				
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
					var tag = $(this).hasClass('true');
					if(!!tag) {
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
					$("#presonList>.person-list.select", $modalFllow).each(function(){
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
						data = {
							...data,
							userIds
						}
					}
					var ret = await ajaxWithAfa(url, data);
					if (ret.result) {
						app.alert('分享成功！');
						$modalFllow.modal('hide');
					}
				})
				
				$("#presonList", $modalFllow).on("click",'.person-list',function () {
					$(this).toggleClass('select');
				})
				/*分享*/
				
				
				//排序
				$('.operate-bar-right>span',$el).on('click',function(){
					let $this = $(this);
					let $siblings = $this.siblings();
					$this.addClass('active').siblings().removeClass('active')
					$siblings.attr('data-sort','').find('i').attr('class','fa fa-sort');
					let sort = $this.attr('data-sort');
					if(!sort){
						$this.attr('data-sort','asc');
						$this.find('i').attr('class','fa fa-sort-asc');
					}else if(sort == 'asc'){
						$this.attr('data-sort','desc');
						$this.find('i').attr('class','fa fa-sort-desc');
					}else if(sort == 'desc'){
						$this.attr('data-sort','');
						$this.find('i').attr('class','fa fa-sort');
					}
					sortList();
				});
				
				//我的发布 我的关注跳转详情
				$('.sqls-wrap',$el).on('click','.sql-item',function(){
					let sqlId = $(this).attr('data-id');
					let sqlInfo;
					if(!$('.sqls-publish-wrap',$el).hasClass('hide')){
						//我发布的
						sqlInfo = myPublished.filter(item => item.id == sqlId)[0];
					}else{
						sqlInfo = myInterested.filter(item => item.id == sqlId)[0];
					}
					app.dispatcher.load({
						"title": "SQL详情-" + sqlInfo.sqlName,
						"moduleId" : "SQLTool",
						"section" : "SQLDetail",
						"id" : "SQLDetail" + sqlId,
						 "params" : { // 给标签传递参数
							 mode: 'check',
							 sqlInfo: sqlInfo
						 },
						"context" : $el
					});
				});
				
				//快速创建跳转
				$('.quick-create',$el).on('click',function(){
					app.dispatcher.load({
						"title": "创建SQL",
						"moduleId" : "SQLTool",
						"section" : "SQLDetail",
						"id" : "SQLDetail" + new Date().getTime(),
						 "params" : { // 给标签传递参数
							 mode: 'create',
						 },
						"context" : $el
					});
				});
				
				//选择我的发布 我的关注页签
				$('#myToolContainer .operate-bar-left>span',$el).on('click',function(){
					$(this).addClass('active').siblings().removeClass('active');
					let index = $(this).index();
					$('#myToolContainer .sqls-wrap>div:eq('+index+')').removeClass('hide').siblings().addClass('hide');
					index == 0 ? $('.ops-wrap',$el).addClass('align-right') : $('.ops-wrap',$el).removeClass('align-right');
				});
				
			}
			
			function renderStar(num) {
				num = Number(num).toFixed(1);
				let full = Math.floor(num);
				let half = num == full ? 0 : 1;
				let empty = 5 - full - half;
				let stars = '';
				full && new Array(full).fill('').map(item => stars += '<i class="fa fa-star"></i>');
				half && new Array(half).fill('').map(item => stars += '<i class="fa fa-star-half-full"></i>');
				empty && new Array(empty).fill('').map(item => stars += '<i class="fa fa-star" style="color: #d9d9db;"></i>');
				stars += `<i class="fa">${num}</i>`;
				return stars;
			}
			
			function sortList() {
				let field = $('.operate-bar-right>span.active',$el).attr('data-role');
				let sortType = $('.operate-bar-right>span.active',$el).attr('data-sort');
				if(!sortType){
					renderPublished(myPublished);
					renderInterested(myInterested);
					return;					
				}
				
				myPublishedCopy = myPublishedCopy.sort((a,b) => {
					let a_val = a[field];
					let b_val = b[field];
					if(field == 'publishTime'){
						a_val = new Date(a_val).getTime();
						b_val = new Date(b_val).getTime();
					}else{
						a_val = Number(a_val);
						b_val = Number(b_val);
					}
					return sortType == 'asc' ? a_val - b_val : b_val - a_val;
				});
				myInterestedCopy = myInterestedCopy.sort((a,b) => {
					let a_val = a[field];
					let b_val = b[field];
					if(field == 'publishTime'){
						a_val = new Date(a_val).getTime();
						b_val = new Date(b_val).getTime();
					}else{
						a_val = Number(a_val);
						b_val = Number(b_val);
					}
					return sortType == 'asc' ? a_val - b_val : b_val - a_val;
				});
				
				renderPublished(myPublishedCopy);
				renderInterested(myInterestedCopy);
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
			
			//分页器
			function renderPagination(element,totalSize,current,fn) {
				$(element,$el).pagination({
					totalData: totalSize,
					current: current,
					showData: pageSize,
					mode: 'fixed',
					coping: true,
					isHide: true,
					prevContent: '上一页',
					nextContent: '下一页',
					homePage: '首页',
					endPage: '尾页',
					keepShowPN: true,
					callback: function(api){
						fn && fn(api);
					}
				});
			}
			
			//查询热词
			function getHotWords() {
				app.common.ajaxWithAfa({
					url:'SqlMarketHotWordsAction_getHotWords.do',
					data:{
						"size": 10
					}
				}).done(function (data) {
					let result = data.result;
					if(result.length > 0){
						let html = '';
						result.forEach(item => {
							html += `<span title="${item.word}">${item.word}</span>`;
						});
						$('.info-wrap',$el).html(html);
					}
				})
			}
			
			//执行
			function excute(id,callback) {
				app.common.ajaxWithAfa({
					url:'SqlMarketAction_updateCfgByFlag.do',
					data:{
						"updateFlag": 1,
						"sqlMarketCfgBean" : JSON.stringify({
							"id" : id
						})
					}
				}).done(function (content) {
					if(content.result){
						callback();
					}
				})
			}

			
			//查询我发布的
			function getPublished() {
				let categoryName = searchCate || undefined,
					sqlName = $('#sqlname_search',$el).val() || undefined;
				app.common.ajaxWithAfa({
					url:'SqlMarketAction_getAllCfgView.do',
					data:{
						conditions: JSON.stringify({
							"owner": "1",
							"categoryName": categoryName,
							"sqlName": sqlName,
						})
					}
				}).done(function (data) {
					let result = data.result;
					result = result.sort((a,b) => {
						let a_val = new Date(a['publishTime']).getTime();
						let b_val = new Date(b['publishTime']).getTime();
						return b_val - a_val;
					});
					myPublished = result;
					myPublishedCopy = JSON.parse(JSON.stringify(myPublished));
					renderPublished(result);
					// 初始化页码
					renderPagination('.paginate-publish',result.length,myPublished_pageNum,function(api) {
						let sortType = $('.operate-bar-right>span.active',$el).attr('data-sort');// 排序状态
						let index = api.getCurrent();
						myPublished_pageNum = index;
						renderPublished(sortType ? myPublishedCopy : myPublished);
					});
				})
			}
			
			function renderPublished(AllList){
				let result = AllList.filter((item,index)=>{
					if(index >= (myPublished_pageNum - 1) * pageSize && index < myPublished_pageNum * pageSize){
						return item;
					}
				})
				if(result){
					$('.publish-num',$el).text(AllList.length);
					let html = '';
					result.forEach(item => {
						let stars = renderStar(item.score);
						let catesHtml = '';
						let cates = item.categoryName.split('#').forEach(item => {
							catesHtml += `<span>${item}</span>`;
						});
						html += `<div class="sql-item flex" data-id="${item.id}">
									<div class="sql-cate flex">${catesHtml}</div>
									<div class="sql-content">
										<div class="sql-content-top flex jc-sb">
											<span class="sql-name">${item.sqlName}</span>
											<div class="score-wrap flex hide">${stars}</div>
										</div>
										<div class="sql-content-middle flex jc-sb">
											<span class="sql-detail">${item.sqlContext}</span>
											<div class="ops-wrap align-right">
												<span data-operate="excute"><i class="fa fa-hand-o-right"></i>执行</span>
												<span data-operate="share"><i class="fa fa-share-alt"></i>分享</span>
											</div>
										</div>
										<div class="sql-content-bottom flex jc-sb">
											<div class="bottom-left inline-flex">
												<span>创建人:</span><span class="create-value">${item.nickName}</span>
												<span>创建时间:</span><span  class="create-value">${item.createTime}</span>
												<span>发布时间:</span><span  class="create-value">${item.publishTime}</span>
											</div>
											<div class="bottom-right inline-flex">
												<p><span class="comments-icon" title="评论数"></span><span  class="">${item.commentsCount}</span></p>
												<p><span>执行次数:</span><span  class="" data-role="zhixingcishu">${item.usedTimes}</span></p>
												<p><span>关注次数:</span><span  class="">${item.interestCount}</span></p>
												<p><span>平均得分:</span><span  class="">${item.score}</span></p>
											</div>
										</div>
									</div>
								</div>`;
					});
					$('.sqls-wrap .sqls-publish-wrap>div:eq(0)',$el).html(html);
				}
			} 
			
			
			//查询我关注的
			function getInterested() {
				let categoryName = searchCate || undefined,
					sqlName = $('#sqlname_search',$el).val() || undefined;
				app.common.ajaxWithAfa({
					url:'SqlMarketAction_getAllCfgViewByUserId.do',
					data:{
						conditions: JSON.stringify({
							categoryName: categoryName,
							sqlName: sqlName,
						})
					}
				}).done(function (data) {
					let result = data.result;
					myInterested = result;
					myInterestedCopy = JSON.parse(JSON.stringify(myInterested));
					renderInterested(result);
					// 初始化页码
					renderPagination('.paginate-interested',result.length,myPublished_pageNum,function(api) {
						let sortType = $('.operate-bar-right>span.active',$el).attr('data-sort');// 排序状态
						let index = api.getCurrent();
						myInterested_pageNum = index;
						renderInterested(sortType ? myInterestedCopy : myInterested);
					});
				})
			}
			
			function renderInterested(AllList) {
				let result = AllList.filter((item,index)=>{
					if(index >= (myInterested_pageNum - 1) * pageSize && index < myInterested_pageNum * pageSize){
						return item;
					}
				})
				if(result){
					$('.like-num',$el).text(AllList.length);
					let html = '';
					result.forEach(item => {
						let stars = renderStar(item.score);
						let catesHtml = '';
						let cates = item.categoryName.split('#').forEach(item => {
							catesHtml += `<span>${item}</span>`;
						});
						html += `<div class="sql-item flex" data-id="${item.id}">
									<div class="sql-cate flex">${catesHtml}</div>
									<div class="sql-content">
										<div class="sql-content-top flex jc-sb">
											<span class="sql-name">${item.sqlName}</span>
											<div class="score-wrap flex hide">${stars}</div>
										</div>
										<div class="sql-content-middle flex jc-sb">
											<span class="sql-detail">${item.sqlContext}</span>
											<div class="ops-wrap">
												<span data-operate="excute"><i class="fa fa-hand-o-right"></i>执行</span>
												<span data-operate="share"><i class="fa fa-share-alt"></i>分享</span>
											</div>
											<div class="like-wrap">
												<div class="like liked" title="取消关注"></div>
											</div>
										</div>
										<div class="sql-content-bottom flex jc-sb">
											<div class="bottom-left inline-flex">
												<span>创建人:</span><span class="create-value">${item.nickName}</span>
												<span>创建时间:</span><span  class="create-value">${item.createTime}</span>
												<span>发布时间:</span><span  class="create-value">${item.publishTime}</span>
											</div>
											<div class="bottom-right inline-flex">
												<p><span class="comments-icon" title="评论数"></span><span  class="">${item.commentsCount}</span></p>
												<p><span>执行次数:</span><span  class="" data-role="zhixingcishu">${item.usedTimes}</span></p>
												<p><span>关注次数:</span><span  class="">${item.interestCount}</span></p>
												<p><span>平均得分:</span><span  class="">${item.score}</span></p>
											</div>
										</div>
									</div>
								</div>`;
					});
					$('.sqls-wrap .sqls-like-wrap>div:eq(0)',$el).html(html);
				}
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
						getInterested();
					}
				})
			}
			
			/*获取三级分类*/
			getObjectCategory();
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
				$('.logSearchDetail-accessLogContent',$el).addClass('hide');
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
				searchCate = '';
			}).on('click','.confirmCategory',function(){//确定
				getAllActiveCates();
				$('.logSearchDetail-accessLogContent',$el).addClass('hide');
			}).on('logChange', '#accessLogUl', function(event) {
				var $obj = $(this).parent();
				if($obj.find('.active[data-role]').length >0){
					var length = $('.active[data-role=cate3]', $obj).length;
					$('#accessLog',$el).attr('data-val','0').html('有条件的日志（'+length+'）<i class="fa fa-sort-down"></i>');
				}else{
					$('#accessLog',$el).attr('data-val','1').html('可访问日志<i class="fa fa-sort-down"></i>');
				}
			});

			function getAllActiveCates() {
				//searchCate
				let arr = [];
				$('.logSearchDetail-accessLogContent',$el).find('[data-role="cate1"].active').each((index1,item1) => {
					let cate1name = $(item1).attr('data-name');
					let cate2s = $(item1).nextAll().find('[data-role="cate2"].active');
					if(cate2s.length > 0){
						cate2s.each((index2,item2) => {
							let cate2name = $(item2).attr('data-name');
							let cate3s = $(item2).next().find('[data-role="cate3"].active');
							if(cate3s.length > 0){
								cate3s.each((index3,item3) => {
									let cate3name = $(item3).attr('data-name');
									arr.push(cate1name + '/' + cate2name + '/' + cate3name);
								});
							}else{
								arr.push(cate1name + '/' + cate2name);
							}
						});
					}else{
						arr.push($(item1).attr('data-name'));
					}
				});
				if(arr.length > 0){
					searchCate = arr.join('#');
				}
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
			
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			// 是否刷新
			if(app.domain.get('SQLDetail','refresh')){
				$('#search_published', $el).trigger('click');
			}
			
		}
		
	}
});