define(['diyFormEvents','viewBuilder'],function(diyFormEvents,viewBuilder){
	let AddObjModal = function(opts){
		this.constructor = AddObjModal;
		this.opts = opts;
		this.cates = this.opts.allCates || null;
		this.detailModel = this.opts.detailModel || null;
		this._init();
	};
	
	AddObjModal.prototype = {
			_init() {
				this._getAllCates().then(res => {
					this._renderHtml();
				});
			},
			_getAllCates() {
				let that = this;
				return new Promise(resolve => {
					if(that.cates){
						resolve(that.cates);
					}else{
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
					}
					
				});
			},
			getModelInfo(id){
				let that = this;
				return new Promise(resolve => {
					if(that.detailModel){
						resolve(that.detailModel);
					}else{
						app.common.ajaxWithAfa({
							url:'CMDBCommonAction_commonService.do',
							data:{
								'servicename':'cn.com.agree.aim.cmdb.service.modelmanage._cmdb_model_define_manager',
								'method':'cate_view_query',
								'requestData':JSON.stringify({
									'cateDefId': id
								})
							},
						}).then(function(data){
							if(data.ret && !$.isEmptyObject(data.ret)){
								that.detailModel = JSON.stringify(data.ret);
								resolve(that.detailModel);
							}
						})
					}
					
				});
				
			},
			_renderHtml() {
				let models = this._findChildren([this.opts.cateId],this.cates,[],true);
				let $options = ''; //<option value="">请选择</option>
				if(models.length > 0){
					models.forEach(item => {
						if(models.length == 1){
							$options = `<option value="${item.def_id}">${item.def_name}</option>`;
						}else{
							$options += `<option value="${item.def_id}">${item.def_name}</option>`;
						}
					});
				}
				this._renderForm($options,this.opts.onlySelector);
			},
			_renderForm(options,onlySelector) {
				let that = this;
				let formHtml = `<div class="addobj-wrap">
								<form class="diy-form">
									<fieldset id="cate_group" name="公共属性" class="">
									    <legend>所属模型</legend>
										<div class="">
											<select name="" id="cates_selector">${options}</select>
										</div>
									  </fieldset>
								</form>`;
							
					if(!onlySelector){
						this.getModelInfo(this.opts.cateId).then(res => {
							let fields = JSON.parse(that.detailModel).fields.filter(item => {
								return item.id == 'default_group' || item.pid == 'default_group';
							});
							viewBuilder.build({
								formDef: fields,
								formLayout: ''
							}).done(function(html){
								html = formHtml + html + '<div class="more" data-role="show"><i class="fa fa-link"></i>更多</div>';
								that.opts.container.html(html);
								that.opts.container.find('.disabled').removeClass('disabled');
								fields.forEach((item,index) => {
									diyFormEvents.BindEvents(item,that.opts.container.find('.addobj-wrap form'),that.opts.container);
								});
							});
						});
								
					}else{
						formHtml += `</div>`;
						this.opts.container.html(formHtml);
					}
					
					if(this.opts.modelId){
						this.setSelectedModel(this.opts.modelId);
					}
					this._bindEvents();
					
			},
			_findChildren(pids,allCates,arr,firstFind) {
				//如果刚进来选中的就是模型
				let firstFindNode = firstFind && allCates.filter(item => {
					return item.def_id == pids[0];
				});
				if(firstFindNode && firstFindNode.length == 1 && !firstFindNode[0].hasChild){
					return firstFindNode;
				}
				
				//刚进来选中的是分类
				arr = [].concat(arr);
				let newPids = [];
				let restCates = allCates.filter(item => {
					if(pids.includes(item.def_p_id)){
						if(!item.hasChild){
							arr.push(item);
						}else{
							newPids.push(item.def_id);
						}
					}else{
						return item;
					}
				});
				
				if(restCates.length == 0 || newPids.length == 0){
					return arr;
				}else{
					return this._findChildren(newPids,restCates,arr);
				}
				
			},
			getSelectedModel() {
				return this.opts.container.find('#cates_selector').val();
			},
			setSelectedModel(id) {
				this.opts.container.find('#cates_selector').val(id);
			},
			_bindEvents() {
				this._gotoMorePage();
			},
			_gotoMorePage() {
				let that = this;
				this.opts.container.on('click','.more',function(){
					let cateId = that.opts.cateId;
					let modelId = that.getSelectedModel();
					let ename = that.opts.container.find('#dmDtEname').val();
					let cname = that.opts.container.find('#dmDtName').val();
					let dmDtStatus = that.opts.container.find('#dmDtStatus').val();
					let dmDtPurpose = that.opts.container.find('#dmDtPurpose').val();
					
					app.dispatcher.load({
						"title": "新增对象",
						"moduleId" : "CMDB_totalProperty",
						"section" : "",
						"id" : "CMDB_totalProperty",
						"params": {
							"cateId": cateId,
						 	"dmDefId": modelId,
						 	"ename": ename,
						 	"cname": cname,
						 	"dmDtStatus": dmDtStatus,
						 	"dmDtPurpose": dmDtPurpose
						}
					});
					that.opts.afterDispatcher && that.opts.afterDispatcher();
					
				});
			},
	};
	
	return AddObjModal;
	
});