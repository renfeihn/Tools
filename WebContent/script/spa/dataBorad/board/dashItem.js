/**
 * 
 */

define(['util','stageContent'], function (util, StageContent) {
	
	let DashItem = function (opts = {}, params = {}) {
		StageContent.call(this, opts);
		this.id = 'dash-item' + new Date().getTime();
		this.config = opts.config || null;
		this.name = opts.name || '未命名组件';
		this._eventRecursion()
	}
	
	let fn = DashItem.prototype;
	
	fn.getInitHTML = function (name, disable) {
		return `<section class="panel grid-stack-item-content">
			        <p class="title">
			            <span class="contenteditable" contenteditable="true">${name}</span>
			            <span><button class="add-components ${disable ? 'hide': ''}"><i class="fa fa-plus"></i>&nbsp;&nbsp;添加</button>&nbsp;&nbsp;
			            <span class="fa fa-ellipsis-v ${disable ? 'hide': ''}" title="操作"></span>
			        </p>
			        <div class="content">
			        </div>
			   </section>`;
	}
	
	fn._eventRecursion = function () {
		let that = this;
		$(this.$el).on('click','.add-components', function (e) {
			e.stopPropagation();
			that.addChild()
		})
	}
	
	fn.addChild = function () {
		/* 判断是否拥有 component 若没有 直接添加 若有提示是否清理 */
		if (!this.component) {
			this._setType('card', {})
			setTimeout( () => {
				this.component.setCardItem({});
			}, 10)
		} else if (this.type !== 'card'){
			var result = window.confirm('添加子组件后，原先的组件将被销毁')
			result && this.delComponents()
			result && this._setType('card', {})
		} else {
			this.component.setCardItem({});
		}
	}
	
	util.inherits(DashItem, StageContent);
	
	return DashItem;
})