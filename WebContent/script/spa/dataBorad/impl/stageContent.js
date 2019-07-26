/**
 * 公共类 推拽块类
 */

define(['util','echartsXy','tableXy','requestAjax','card','textXy','imgXy','varXy'], 
		function (util, echartsXy, tableXy, RequestAjax, Card, textXy, imgXy, varXy) {
	
	const emptyHTML = `<div class="size-content-div-empty">
							<div class="tip-info">请选择组件类型</div>
							<div class="component-type">
								<i class="fa fa-line-chart" data-type="echarts"></i>
								<i class="fa fa-table" data-type="table"></i>
								<i class="fa fa-font" data-type="card"></i>
							</div>
						</div>`;
	
	let stageContent = function(opts = {}) {
		this.opts = opts;
		this.row = opts.row ? parseInt(opts.row) : 0;	/* 容器占位行 */
		this.col = opts.col ? parseInt(opts.col) : 0;	/* 容器占位列 */
		this.sizex = parseInt(opts.sizex) || 5;			/* 容器占位宽 */
		this.sizey = parseInt(opts.sizey) || 25;		/* 容器占位高 */
		this.uuid = opts.uuid;
		this.params = opts.params;
		this.edit = opts.edit !== undefined ? opts.edit:true;
		this.timer = opts.timer || 0;
		this.type = opts.type || null;
		this.name = opts.name || '未命名组件';
		this.component = null;
	    this.children = [];
	    this.componentInfo = opts.componentInfo || null;
	    this._init();
	}
	
	let fn = stageContent.prototype;
	
	/**
	 * 初始化
	 */
	fn._init = function () {
		this.$el = document.createElement('div');
		this.$el.innerHTML = this.getInitHTML(this.name,!this.edit);
		this.$el.setAttribute('id', this.uuid);
		this.edit && this._addEvent();
		setTimeout(() => {
			if (this.type) {
				this._setType(this.type, this.componentInfo || {})
			} else {
				this._isEmpty();
			}
		},0)
	}
	
	fn.addComponents = function () {
		var content = $($(this.$el).find('.content')[0]);
		if (this.type === "table") {
			content.append(this.component.charts.context[0].nTableWrapper);
		} else {
			content.append(this.component.dom);
		}
		if (this.type === "card") {
			setTimeout(() => {
				this.component.initDrag();
				this.component.setConfig();
			}, 0)
		}
	}
	
	fn.delComponents = function () {
		this.component && this.component.destory();
		this.component = null;
		this.type = null;
	}
	
	fn._addEvent = function () {
		let that = this;
		$(this.$el).on('click', '.component-type>.fa', function (e) {
			e.stopPropagation();
			var type = this.dataset.type;
			var Bbox = that._getBbox($(this).parents('.content')[0]);
			var bbox = {
				width: Bbox.width,
				height: Bbox.height,
			}
			that._setType(type);
			app.selectComponents = that.component;
			that.opts.parent && that.opts.parent.emit.trigger('selectType', {type, uuid: that.uuid,bbox, component: that.component});
		}).on('click', '.fa-ellipsis-v', function (e) {
			e.stopPropagation();
			var id = $($(this).parents('div.grid-stack-item')[0]).attr('id');
			var pageX = e.pageX;
			var pageY = e.pageY;
			that.opts.parent && that.opts.parent.emit.trigger('operateItem', {pageX,pageY,id});
		}).on('blur', 'span.contenteditable', function (e) {
			e.stopPropagation();
			that.name = $(this).text();
		}).on('click', function (e) {
			e.stopPropagation();
			app.selectCardItem = that.component;
			$(".components-active").removeClass('components-active')
			$(this).addClass('components-active');
			window.postMessage({cardSelect: true}, '*');
		})
	}
	
	fn._setType = function (type, opts = {}) {
		opts.parent = this;
		opts = Object.assign({}, opts, {params: this.params}, {parent: this,container: $(this.$el).find('.content')[0]}, {edit: this.edit})
		this.type = type;
		switch (type) {
			case 'echarts':
				this.component = new echartsXy(opts);
				break;
			case 'table':
				this.component = new tableXy(opts);
				break;
			case 'card':
				this.component = new Card(opts);
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
	
	fn._getBbox = function(dom) {
		return dom.getBoundingClientRect();
    }
	
	fn.resizeComponent = function () {
		this.component && this.addComponents();
		setTimeout(() => {
			this.component && this.component.resize();
		}, 1)
	}
	
	fn.addComponents = function () {
		var content = $($(this.$el).find('.content')[0]);
		if (this.type === "table") {
			content.append(this.component.charts.context[0].nTableWrapper);
		} else {
			content.append(this.component.dom);
		}
		if (this.type === "card") {
			setTimeout(() => {
				this.component._initDrag();
			}, 0)
		}
		this._isEmpty();
	} 
	
	fn.delComponents = function() {
		this.component && this.component.destory();
		this.component = null;
		this.type = null;
		this._isEmpty();
	}
	
	fn._isEmpty = function () {
		if (!this.component) {
			$($(this.$el).find('.content')[0]).html(emptyHTML);
		} else {
			$($(this.$el).find('.size-content-div-empty')[0]).remove();
		}
	}
	
	fn.resize = function() {
		this.component && this.component.resize();
	}
	
	fn.getConfig = function () {
		return {
			row: parseInt(this.row),
			x: parseInt(this.row),
			col: parseInt(this.col),
			y: parseInt(this.col),
			sizex: parseInt(this.sizex),
			width: parseInt(this.sizex),
			sizey: parseInt(this.sizey),
			height: parseInt(this.sizex),
			uuid: this.uuid,
			type: this.type,
			name: this.name,
			componentInfo: {
				option: this.component ? this.component.getOption() : {},
				config: this.component ? this.component.getConfig() : {}
			}
		}
	}
	
	
	return stageContent;
	
})
