/**
 * 单个指标回显
 */
define(['EventEmitter','dashItem','util','componentTimer', 'gridster'], function (EventEmitter, DashItem, util, ComponentTimer) {
	var buss = function (container, opts = {}) {
		this.container = container;
		this.opts = opts;
		this.id = 'buss' + new Date().getTime();
		this.emit = new EventEmitter();
		this.children = [];
		this.componentTimer = new ComponentTimer({parent: this});
		this.gridster = null;
		this._init();
	}
	buss.prototype = {
		_init () {
			this.$el = document.createElement('div');
			this.$el.className = 'gridster ' + this.id;
			this.$el.setAttribute('id', this.id);
			this.$el.innerHTML = `<ul></ul>`;
			this.container.appendChild(this.$el);
			this._initDrag();
		},
		_initDrag () {
			let that = this;
			this.gridster = $("#"+this.id+" ul", $(this.container)).gridster({
				namespace: '.'+this.id,
				widget_base_dimensions:[20,20],
				widget_margins:[0,0],
				draggable:{
					handle:'p.title',
				},
				resize:{
					enabled:false,
				}
			}).data('gridster');
			this.gridster.disable();
		},
		addItem (opts = {}) {
			this.MaxCols = this.gridster.cols;
			this.MaxRow = this.gridster.rows;
			var config = JSON.parse(JSON.stringify(opts));
			let uuid = opts.uuid || util.genearteUUid();
			config = Object.assign({}, config, {parent: this,uuid});
			config.disable = true;
			var item = new DashItem(config);
			this.children.push(item);
			this.gridster.add_widget(item.$el, this.MaxCols, this.MaxRow);
		}
	}
	
	return buss;
})