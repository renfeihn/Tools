/**
 * 卡片
 */
define(['util','sonItem','stageContent','echartsXy','tableXy','textXy','imgXy','varXy'], 
		function (util, SonItem ,StageContent, echartsXy,tableXy, textXy, imgXy, varXy) {
	
	if (!window.variable) {
		window.variable = 0;
	}
	window.variable ++;

	let CardContent = function (opts = {}) {
		StageContent.call(this, opts);
		this.sizey = parseInt(opts.sizey) || 10;			/* 容器占位高 */
		this.sizex = parseInt(opts.sizex) || 10;			/* 容器占位宽 */
		this.name = opts.name || '未命名组件';
	}
	 
	let fn = CardContent.prototype;
	
	fn.getInitHTML = function (name, disable) {
		return `<section class="panel no-title grid-stack-item-content ${disable ? 'noborder': ''}  noback-noborder">
			        <p class="no-title">
			            <span class="fa fa-ellipsis-v ${disable ? 'hide': ''}" title="操作"></span></span>
			        </p>
			        <div class="content">
			        </div>
			   </section>`;
	}
	
	fn._setType = function (type, opts = {}) {
		opts.parent = this;
		opts = Object.assign({params: this.params}, opts, {stageType: this.opts.stageType, parent: this, container: $(this.$el).find('.content')[0]}, {edit: this.edit})
		this.type = type;
		switch (type) {
			case 'echarts':
				this.component = new echartsXy(opts);
				break;
			case 'table':
				this.component = new tableXy(opts);
				break;
			case 'card':
				this.component = new SonItem(opts);
				break;
			case 'text':
				this.component = new textXy(opts);
				break;
			case 'img':
				this.component = new imgXy(opts);
				break;
			case 'var':
				this.component = new varXy(opts);
				break;
		}
		this.resizeComponent();
	}
	
	util.inherits(CardContent, StageContent);
	
	return CardContent;
	
})