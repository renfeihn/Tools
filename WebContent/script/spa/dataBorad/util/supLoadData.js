/**
 * 数据加载辅助功能 dom操作层
 */
define([], function () {
	let supLoadData = function (container, opts = {}) {
		this.container = container;
		this.bbox = opts.bbox || {};
		this.opts = opts;
		this.type = opts.currentType;
		this.parent = opts.parent;
		this.$otherContent = $("#otherContent", container);		/* 辅助类容器 */
		this.$fieldList = $("#fieldList", container);		/* kpi数据容器 */
		this.$dashboardChartGroup = $("#dashboardChartGroup", container);    /* 组件类型切换容器 */
		this.$fieldContent = $("#fieldContent", container);	/* 字段拖入容器 */
		this.$componentView = $("#componentView", container);	/* 编辑区域组件容器 */
		this.$cardList = $("#cardList", container);			/* 卡片拖动容器  */
		this.$saveModal = $("#saveModal", container);			/* 卡片拖动容器  */
		this.$biContextmenuPanel = $("#showOperate", container);	/* 卡片删除 */
		this.$fieldContent = $("#fieldContent", container);
		this.$reNameModal = $("#reNameModal", container);
		this.$formateModal = $("#formateModal", container);		/* 数据格式化 */
		this.$textNameModal = $("#textNameModal", container);		/* 数据格式化 */
		this.showOtherContent = ['table','card'];
		this.$styleCard = $("#styleCard", container);
		this.xAxisDragBox = opts.xAxisDragBox || [];
		this.yAxisDragBox = opts.yAxisDragBox || [];
		this.tableDragBox = opts.tableDragBox || [];
		this.tableDatas = opts.tableDatas || [];
		this.varDragBox = opts.varDragBox || [];
		this.dragData = null;
		this._init();
	}
	
	supLoadData.prototype = {
		_init () {
			this._operateDom(this.type);
			this._addEvent();
			this._pushAllFields();
		},
		_operateDom (type) {
			/**
			 * 自己看效果，不做多余解释
			 */
			this.type = type;
			let showContent = this.showOtherContent.includes(this.type);
			showContent ? this.$otherContent.addClass('tab') : this.$otherContent.removeClass('tab');
//			let showCardList = this.type === 'card';
//			showCardList ? this.$cardList.show() : this.$cardList.hide();
			console.log(this.type);
			this.$cardList.hide();
			this.$fieldContent.find('.bi-dark-card[data-type]').addClass('hide')
			this.$fieldContent.find('.bi-dark-card[data-type="'+this.type+'"]').removeClass('hide');
			this.$dashboardChartGroup.find('.dashboard-chart[data-category]').addClass('hide')
			this.$dashboardChartGroup.find('.dashboard-chart[data-category="'+this.type+'"]').removeClass('hide');
			if (this.type === 'card') {
				this.$styleCard.show();
			} else {
				this.$styleCard.hide();
			}
		},
		_setFieldCollect (component) {
			this.xAxisDragBox = component.xAxisDragBox || [];
			this.yAxisDragBox = component.yAxisDragBox || [];
			this.tableDragBox = component.tableDragBox || [];
			this.tableDatas = component.tableDatas || [];
			this.varDragBox = component.varDragBox || [];
			this._pushAllFields();
		},
		_setUrlDataContent (config) {
			var urlData = config.urlData;
			if (!urlData) {
				return;
			}
			$('#searchInput', this.container).text(urlData.search);
			var dateRangeTab = urlData.dateRangeTab;
			var dateRangeFun = urlData.dateRangeFun;
			if (dateRangeTab === 0) {
				$('#quickRange>li[data-func="'+dateRangeFun+'"]', this.container).trigger('click');
			}
			$("#searchBtn", this.container).trigger('click')
		},
		_pushAllFields ()  {
			this.setContent('xAxisDragBox')
			this.isEmpty(this['xAxisDragBox'],'xAxisDragBox');
			this.setContent('yAxisDragBox')
			this.isEmpty(this['yAxisDragBox'],'yAxisDragBox');
			this.setContent('tableDragBox')
			this.isEmpty(this['tableDragBox'],'tableDragBox');
			this.setContent('varDragBox')
			this.isEmpty(this['varDragBox'],'varDragBox');
		},
		_addEvent () {
			let $el = this.container;
			let that = this;
			let $fieldContent = this.$fieldContent;
			/* kpi数据拖拽事件 */
			this.$fieldList.on('dragstart','.dashboard-row-item-layout', function (e) {
				e.stopPropagation();
				that.dragData = this.dataset;
				$("*[data-type='"+that.type+"']", $el).addClass('active');
			}).on('dragover','.dashboard-row-item-layout',function(e){
                e.preventDefault();
                e.stopPropagation();
            }).on('drop','.dashboard-row-item-layout',function(e){
                e.stopPropagation();
                $("*[data-type='"+that.type+"']", $el).removeClass('active');
            })
            /* kpi数据生效 */
            $(".axis-drop-area", $el).on('dragover',function(e){
                e.preventDefault();
                e.stopPropagation();
            }).on('drop' ,function(e){
                e.stopPropagation();
                $fieldContent.find('>div[data-type]').removeClass('active');
                var id = $(this).attr('id');
                /* domstringmap 不能做 window.postMessage请求  */
                var dragData = {};
                Object.keys(that.dragData).forEach(key => {
                	dragData[key] = that.dragData[key];
                })
                that.push(id, dragData);
            })
            /* 组件类型切换 */
            this.$dashboardChartGroup.on('click','div.dashboard-chart',function (e) {
            	var type = this.dataset.chartstype;
            	var category = this.dataset.category;
            	/* 如果是卡片 */
            	if (category === 'card') {
            		type && that.parent.setType(type);
            	} else {
            		type && that.parent.render(type);
            	}
            	
            });
			/* 组件保存 */
			this.$saveModal.on('click', function (e) {
				let option = that.parent.getOption();
				let config = that.parent.getConfig();
				that.parent.saveModal(option, config);
			})
			/* 卡片内容器 */
			this.$cardList.on('dragstart','.card-item', function (e) {
				e.stopPropagation();
				that.dragData = this.dataset;
			}).on('dragover','.dashboard-row-item-layout',function(e){
                e.preventDefault();
                e.stopPropagation();
            }).on('drop','.dashboard-row-item-layout',function(e){
                e.stopPropagation();
            })
            /* 拖动容器 */
            this.$componentView.on('dragover',function(e){
                e.preventDefault();
                e.stopPropagation();
            }).on('drop' ,function(e){
            	if (that.type !== 'card') {
            		return;
            	}
            	let dragType = that.dragData.type;
    			let normal = that.dragData.normal;
    			that.parent.setCardItem({dragType, normal})
            })
            /* 字段弹窗 */
            $fieldContent.on('click','.axis-drop-area>.bi-single-button>i.fa-caret-down',function(e){
				//x、y轴中的字段点击弹窗
				e.stopPropagation();
				let $this = $(this);
				let $p = $this.parent();
				that.operate = $p;
				that.operateKey = $p.parents('.axis-drop-area').attr('id');
				
				let X = $p.offset().left + $p.width();
				let Y = $p.offset().top + 20;
				that.$biContextmenuPanel.show().css({"left": X,"top": Y});
			})
			/* 菜单 */
			this.$biContextmenuPanel.on("click",'div[data-type]',function (e) {
				e.stopPropagation();
				var type = this.dataset.type;
				switch (type) {
					case 'delete':
						that.deleteItem();
						break;
					case 'rename':
						that.reNameItem();
					case 'format':
						that.formatItem();
				}
				that.$biContextmenuPanel.hide();
			})
			this.$reNameModal.on('click', '.confirmBtn' ,function (e) {
				e.stopPropagation();
				var rename = $('#renameItem', that.$reNameModal).val();
				if (rename.trim() !== '') {
					that.reNameItemModal(rename);
				}
			})
			this.container.on('click', function (e) {
				that.$biContextmenuPanel.hide();
			})
			this.$textNameModal.on('click','.confirmBtn', function (e) {
				e.stopPropagation();
				var text =  $("#textItem",that.$textNameModal).val();
				app.selectText.option = text;
			})
		},
		showTextNameModal() {
			this.$textNameModal.modal('show');
			var text = app.selectText.option;
			$("#textItem",this.$textNameModal).val(text);
		},
		/* 数据格式化 */
		formatItem () {
			this.$formateModal.modal('show');
		},
		/* 重命名  */
		reNameItem () {
			this.$reNameModal.modal('show');
			$('#renameItem', this.$reNameModal).val($(this.operate.find('span')).text());
		},
		reNameItemModal (rename) {
			let key = this.operateKey;
			let name = this.operate[0].dataset.name;
			if (this[key] && this[key] instanceof Array) {
				this[key] = this[key].map(item => {
					if (item.name === name) {
						item.rename = rename;
					}
					return item;
				})
				$(this.operate.find('span')).text(rename).attr('data-rename', rename);
				this.isEmpty(this[key], key);
				this.outputData();
			}
		},
		/* 删除元素 */
		deleteItem () {
			try {
				let key = this.operateKey;
				let name = this.operate[0].dataset.name;
				if (this[key] && this[key] instanceof Array) {
					this[key].splice(this[key].findIndex(item => item.name === name), 1);
				} else {
					console.error('not found name,',name);
				}
				this.isEmpty(this[key], key);
				this.operate.remove();
				this.outputData();
			} catch (e) {
			}
		},
		/* 放置数据 */
		push(key, config) {
			if (this[key] && this[key] instanceof Array) {
				if (!this.isHasSame(key, config, 'name')) {
					this[key].push(config);
					var result = this.isEmpty(this[key], key);
					if (result) {
						this.setContent(key);
					}
					this.outputData();
				}
			}
		},
		/* 判断对象数组是否有keyValue健值重复数据 */
		isHasSame (key,config,keyValue) {
			return this[key].some(item => item[keyValue] === config[keyValue]);
		},
		/* 判断容器内是否还有数据 */
		isEmpty (data, key) {
			let $el = this.container;
			if (data.length === 0) {
				$($("#"+key, $el).find('.bi-tips')).removeClass('hide')
				return false;
			}
			$($("#"+key, $el).find('.bi-tips')).addClass('hide')
			return true;
		},
		/* 指标框内放置数据 */
		setContent(key) {
			let $el = this.container;
			var h = this[key].map(item => {
				return `<div class="bi-single-button" data-rename="${item.rename}" data-name="${item.name}" data-uuid="${item.uuid}" data-type="dimension" data-config=${JSON.stringify(item)}>
							<span>${item.rename || item.name}</span>
							<i class="fa fa-caret-down"></i>									
							<i class="fa fa-filter hide"></i>
						</div>`;
			})
			$("#"+key, $el).find('.bi-single-button').remove()
			$("#"+key, $el).append(h);
		},
		/* 放置KPI数据 */
		setKPIList (list) {
			var h = list.map(item => {
				return `<div class="dashboard-row-item-layout" draggable="true" data-name="${item.data}">
							<i class="fa fa-text-width"></i>
							<div class="dashboard-single-button">
								<span>${item.data}</span>
							</div>
						</div>`;
			})
			this.$fieldList.empty().append(h);
		},
		/* 组件存放 返回true则渲染成功 */
		appendComponentContent (dom) {
			let that = this;
			return new Promise(function (resolve, reject) {
				that.$componentView.html('').append(dom);
				if (that.type === 'card') {
					that.$componentView.attr('style', `width: ${that.bbox.width}px;height: ${that.bbox.height}px;background: #FFF;margin-top: 10px;`)
				}
				setTimeout(function () {
					resolve(true);
				}, 0)
			})
		},
		outputData () {
			var xAxisDragBox = this.xAxisDragBox;
			var yAxisDragBox = this.yAxisDragBox;
			var tableDragBox = this.tableDragBox;
			var varDragBox = this.varDragBox;
			var tableDatas = this.tableDatas;
			this.parent.setData(xAxisDragBox, yAxisDragBox, tableDragBox, tableDatas, varDragBox);
		},
	}
	
	return supLoadData;
	
})