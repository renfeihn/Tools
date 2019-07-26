/**
 *
 */

define(['echartsXy','tableXy'], function (echartsXy, tableXy) {
	
	const innerHTML = `<div class="size-content-div-operate hide">
							<div class="div-editable">
								<div class="title-edit" contenteditable="true">新建组件</div>
								<div class="title-opreate"></div>
							</div>
							<div class="operate-content">
								
							</div>
						</div>`;
	const emptyHTML = `<div class="size-content-div-empty">
							<div class="tip-info">请选择组件类型</div>
							<div class="component-type">
								<i class="fa fa-line-chart" data-type="echartsXy"></i>
								<i class="fa fa-table" data-type="tableXy"></i>
							</div>
						</div>`;
	
	let SizeContent = function (opts = {}) {
		this.opts = opts;
		this.stageType = this.opts.stageType;
		this.env = this.opts.env;
		this.children = [];
		this.init();
	}
	
	SizeContent.prototype = {
		init () {
			this.$el = document.createElement('div');
			this.$el.className = 'size-content-div';
			this.addEvent();
		},
		_addPanel (item) {
			this.children.push(item);
			this.$el.append(item);
		},
		setSize (width) {
			this.$el.setAttribute('style', `width: ${width}`);
			this.$el.innerHTML += innerHTML + emptyHTML;
			this.emptyContainer = $(".size-content-div-empty", $(this.$el));
			this.hasContainer = $(".size-content-div-operate", $(this.$el));
		},
		addEvent() {
			let that = this;
			$(this.$el).on("click", '.component-type>.fa' ,function (e) {
				var type = this.dataset.type;
				that.addComponentsByType(type);
			})
		},
		addComponentsByType (type) {
			this.emptyContainer.addClass('hide');
			this.hasContainer.removeClass('hide');
			let restore = false;
			if (this.env === "edit") {
				restore = true;
			}
			var outer = $(this.hasContainer.find('.operate-content')[0]);
			switch(type) {
				case 'echartsXy':
					obj = new echartsXy({$el: outer, renderType: 1, stageType: this.stageType, restore: restore, env: this.env});
					break;
				case 'tableXy':
					obj = new tableXy({$el: outer, renderType: 1, stageType: this.stageType, restore: restore, env: this.env});
					break;
			}
			if (type === "tableXy") {
				outer.append(obj.charts.context[0].nTableWrapper);
			} else {
				outer.append(obj.dom);
			}
			setTimeout( ()=> {
				obj.resize && obj.resize();
			},10)
		}
	}
	
	return SizeContent;
	
})