define(['jquery'], function ($) {
	
	let CateSelector = function(opts){
		this.constructor = CateSelector;
		this.opts = opts;
		this.rootId = -1;
		this.cates = null;
		this.loop = 0;
		this.tree = {};
		this.maxLevel = 3;
		this._init();
	};
	
	CateSelector.prototype = {
			_init() {
				let that = this;
				that.tree = {};
				that._bindEvents();
				if(this.opts.allCates){
					that.cates = this.opts.allCates;
					that._cateFormat();
				}else{
					that._getAllCates().then(res => {
						that._cateFormat();
					});
				}
			},
			_getAllCates() {
				let that = this;
				return new Promise(resolve => {
					app.common.ajaxWithAfa({
						url:'CMDBCommonAction_commonService.do',
						data:{
							'servicename':'cn.com.agree.aim.cmdb.service.modelmanage._cmdb_model_define_manager',
							'method':'cate_model_query',
							'requestData': ''
						},
					}).then(function(data){
						let ret = data.ret;
						that.cates = ret;
						resolve(ret);
					});
				});
			},
			_getHtmlTemplate(ename,cname,id) {
				let html = `<div class="control-group">
							    <label for="${id}" class="control-label">${cname}</label>
							    <div class="controls">
							        <select id="${id}" class="cate-select" data-control-ename="${ename}"><option value="">请选择</option></select>
							    </div>
						    </div>`;
				return html;
			},
			_cateFormat() {
				this.loop = 1;
				this.tree = this._dataFormat(this.cates,[this.rootId],{});
				this._renderSelectHtml();
			},
			_dataFormat(allCates,pids,tree) {
				let that = this;
				if(allCates.length == 0){
					return tree;
				}else{
					let newPids = [];
					let restCates = allCates.filter(item => {
						if(pids.includes(item.def_p_id)){
							let key = 'cate' + that.loop;
							if(!tree[key]){
								tree[key] = {
										'objs': [],
										'ids':  []
								};
							}
							tree[key]['ids'].push(item.def_id);
							tree[key]['objs'].push(item);
							newPids.push(item.def_id);
						}else{
							return item;
						}
					});
					this.loop++;
					return that._dataFormat(restCates,newPids,tree);
				}	
			},
			_renderSelectHtml() {
				let that = this;
				let keys = Object.keys(this.tree).sort((a,b) => {
					return Number(a.split('cate')[1]) - Number(b.split('cate')[1]);
				});
				let chinese = ['一','二','三','四','五','六','七','八','九','十'];
				let html = '';
				keys.forEach((item,index) => {
					let cname = chinese[index] + '级分类';
					html += that._getHtmlTemplate(item,cname,item);
				});
				that.opts.container.html(html);
				let maxLevel = that.maxLevel - 1;
				that.opts.container.find('.control-group:gt('+maxLevel+')').addClass('hide');
				if(that.opts.hasSelected){
					that.opts.hasSelected.forEach((item,index) => {
						if(item.id){
							that.renderOptions((index+1),item.id,item.pid);
						}
					});
				}else{
					that.renderOptions(1);
				}
				
				
			},
			renderOptions(index,id,pid) {
				let that = this;
				let elementId = 'cate' + index;
				if(!this.tree[elementId]){
					return;
				}
				let ids = this.tree[elementId]['objs'];
				let options = '<option value="">请选择</option>';
				if(pid){
					ids = ids.filter(item => {
						return item.def_p_id == pid;
					});
				}
				if(ids.length > 0){
					ids.forEach(item => {
						options += `<option value="${item.def_id}" data-pid="${item.def_p_id}">${item.def_name}</option>`;
					});
				}
				$('#'+elementId,that.opts.container).html(options);
				if(id){
					$('#'+elementId,that.opts.container).val(id).trigger('change');
				}
			},
			_bindEvents() {
				let that = this;
				that.opts.container.on('change','.cate-select',function(){
					let thisGroup = $(this).parents('.control-group');
					let index = Number($(this).attr('id').split('cate')[1]);
					let val = $(this).val();
					thisGroup.nextAll().find('select').html('<option value="">请选择<option>');
					that.renderOptions(index+1,'',val);

					if(that.opts.container.find('.control-group').length > that.maxLevel){
						//不止三级分类时
						if(index >= that.maxLevel){
							//当点击三级分类时  若有四级分类且有可选则展开
							if(thisGroup.next().length > 0 && thisGroup.next().hasClass('hide') && thisGroup.next().find('select').children().length > 1){
								thisGroup.next().removeClass('hide');
							}else{
								thisGroup.next().addClass('hide');
							}
						}
						else if(index <= that.maxLevel - 1){
							//点击二级分类时，收起四级以下分类
							that.opts.container.find('.control-group:gt('+(that.maxLevel - 1)+')').addClass('hide');
						}
					}
					
				});
			},
			_isBeyondMaxLevel() {
				let lens = Object.keys(this.tree).length;
				return lens > this.maxLevel;
			},
			getSelectedCate() {
				let that = this;
				let selectors = Array.from(that.opts.container.find('.control-group:not(.hide)').find('select')).map(item => {
					return {
						name: $(item).find('option:selected').text(),
						id: $(item).val()
					}
				});
				return selectors;
			},
			getDmDefid() {
				let family = this.getSelectedCate().map(item => {
					if(item.id){
						return item.id
					}
				});
				let dmdefid = family.filter(item => !!item).reverse()[0];
				return dmdefid;
			}
			
			
	};
	
	return CateSelector;
})