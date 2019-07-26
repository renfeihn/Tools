define(['pagination'],function(pagination){
	return {
		load:function($el,scope,handler){
			let sqls = [];
			let sqlsCopy = [];
			let pageNum = 1;// 分页页码
			let pageSize = 10;// 每页显示条数
			let searchCate = '';
			
			init();
			function init() {
				bindEvents();
				$('#search_circle',$el).trigger('click');
			}
			
			function bindEvents() {
				
				//搜索分类
				$('.sql-cate-btn',$el).on('click',function(e){
					e.stopPropagation();
					$('.logSearchDetail-accessLogContent',$el).toggleClass('hide');
				});
				//选择搜索类型
				$('.search-type-btns>span',$el).on('click',function(){
					if($(this).hasClass('username')){
						$(this).attr('data-type','sqlname').text('搜sql名');
						$(this).removeClass('username');
					}else{
						$(this).attr('data-type','username').text('搜人名');
						$(this).addClass('username');
					}
				});
				
				//点击空白 隐藏弹窗
				$el.on('click',function(e){
					$('.logSearchDetail-accessLogContent',$el).addClass('hide');
				});
				
				//选择热搜
				$('.info-wrap',$el).on('click','>span',function(){
					let text = $(this).text();
					$('#search_input',$el).val(text);
					$('#search_circle',$el).trigger('click');
				});
				
				//搜索
				$('#search_circle',$el).on('click',function(){
					let type = $('.search-type-btns>span',$el).attr('data-type');
					let val = $('#search_input',$el).val() || undefined;
					if(type == 'sqlname'){
						getInterests().then(res => {
							getSqls(res,val,undefined);
						});
					}else{
						getInterests().then(res => {
							getSqls(res,undefined,val);
						});
					}
					getHotWords();
				});
				
				//搜索
				$('#search_input',$el).on('keyup',function(e){
					var keyCode = e.keyCode;
					if(keyCode == 13){
						$('#search_circle',$el).trigger('click');
					}
				});
				
				//关注 取关
				$('.sqls-wrap',$el).on('click','.like',function(){
					let sqlId = $(this).parents('.sql-item').attr('data-id');
					if($(this).hasClass('likeit') || $(this).hasClass('liked')){
						$(this).attr('class','like dislike');
						debounceDislike(sqlId);
					}else{
						$(this).attr('class','like likeit');
						debounceLike(sqlId);
					}
				});
				
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
				
				//跳转详情
				$('.sqls-wrap',$el).on('click','.sql-item',function(){
					let sqlId = $(this).attr('data-id');
					let sqlInfo = sqls.filter(item => item.id == sqlId)[0];
					app.dispatcher.load({
						"title": "SQL详情-" + sqlInfo.sqlName,
						"moduleId" : "SQLTool",
						"section" : "SQLDetail",
						"id" : "SQLDetail",
						 "params" : { // 给标签传递参数
							 mode: 'check',
							 sqlInfo: sqlInfo
						 },
						"context" : $el
					});
				});
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

			
			//查询sql圈子
			function getSqls(interests,sqlName,nickName) {
				let categoryName = searchCate || undefined;
				app.common.ajaxWithAfa({
					url:'SqlMarketAction_getAllCfgView.do',
					data:{
						conditions: JSON.stringify({
							"flag":"1",
							"sqlName": sqlName,
							"nickName": nickName,
							"categoryName": categoryName
						})
					}
				}).done(function (data) {
					let result = data.result;
					result.forEach(item => {
						item.interested = interests.includes(item.id) ? 'liked' : '';
					});
					result = result.sort((a,b) => {
						let a_val = a['interested'] ? 1 : 0;
						let b_val = b['interested'] ? 1 : 0;
						return b_val - a_val;
					});
					sqls = result;
					sqlsCopy = JSON.parse(JSON.stringify(sqls));
					renderSqls(result);
					// 初始化页码
					renderPagination('.paginate-circle',result.length,pageNum,function(api) {
						let sortType = $('.operate-bar-right>span.active',$el).attr('data-sort');// 排序状态
						let index = api.getCurrent();
						pageNum = index;
						renderSqls(sortType ? sqlsCopy : sqls);
					})
				})
			}
			
			function renderSqls(AllList) {
				let result = AllList.filter((item,index)=>{
					if(index >= (pageNum - 1) * pageSize && index < pageNum * pageSize){
						return item;
					}
				})
				if(result){
					let html = '';
					result.forEach(item => {
						let stars = renderStar(item.score);
						let catesHtml = '';
						let cates = item.categoryName.split('#').forEach(item => {
							catesHtml += `<span>${item}</span>`;
						});
						let likeTitle = item.interested == 'liked' ? '取消关注' : '关注';
						html += `<div class="sql-item flex" data-id="${item.id}">
									<div class="sql-cate flex">${catesHtml}</div>
									<div class="sql-content">
										<div class="sql-content-top flex jc-sb">
											<span class="sql-name">${item.sqlName}</span>
											<div class="score-wrap flex hide">${stars}</div>
										</div>
										<div class="sql-content-middle flex jc-sb">
											<span class="sql-detail">${item.sqlContext}</span>
											<div class="ops-wrap hide">
												<span><i class="fa fa-hand-o-right"></i>执行</span><span><i class="fa fa-share-alt"></i>分享</span>
											</div>
											<div class="like-wrap">
												<div class="like ${item.interested}" title="${likeTitle}"></div>
											</div>
										</div>
										<div class="sql-content-bottom flex jc-sb">
											<div class="bottom-left inline-flex">
												<span>创建人:</span><span class="create-value">${item.nickName}</span>
												<span>创建时间:</span><span  class="create-value">${item.publishTime}</span>
												<span>更新时间:</span><span  class="create-value">${item.updateTime}</span>
											</div>
											<div class="bottom-right inline-flex">
												<p><span class="comments-icon" title="评论数"></span><span  class="">${item.commentsCount}</span></p>
												<p><span>执行次数:</span><span  class="">${item.usedTimes}</span></p>
												<p><span>关注次数:</span><span  class="">${item.interestCount}</span></p>
												<p><span>平均得分:</span><span  class="">${item.score}</span></p>
											</div>
										</div>
									</div>
								</div>`;
					});
					$('.sqls-wrap>div:eq(0)',$el).html(html);
				}
			}
			
			function sortList() {
				let field = $('.operate-bar-right>span.active',$el).attr('data-role');
				let sortType = $('.operate-bar-right>span.active',$el).attr('data-sort');
				if(!sortType){
					renderSqls(sqls);
					return;
				}
				
				sqlsCopy = sqlsCopy.sort((a,b) => {
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

				renderSqls(sqlsCopy);
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
			
			//查询已关注
			function getInterests() {
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url:'SqlMarketAction_getInterests.do',
						data:{}
					}).done(function (data) {
						resolve(data.result);
					})
				})
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
						$('#search_circle',$el).trigger('click');
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
						$('#search_circle',$el).trigger('click');
					}
				})
			}
			
			//防抖
			function debounce (fn, delay) {
                return args => {
                    clearTimeout(fn.id)

                    fn.id = setTimeout(() => {
                        fn.call(this, args)
                    }, delay)
                }
            }
			let debounceLike = debounce(likeSql, 100);
			let debounceDislike = debounce(dislikeSql, 100);
			
			
			
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
			
		},
		
		unload:function(handler){
			
		},
		
		pause:function($el,scope,handler){
			
		},
		
		resume:function($el,scope,handler){
			if(app.domain.get('SQLDetail','refresh')){
				$('#search_circle',$el).trigger('click');
			}
		}
		
	}
});