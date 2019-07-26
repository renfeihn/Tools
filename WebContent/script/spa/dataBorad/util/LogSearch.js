/**
 * 
 */

define(['chartsOption','tableOption','varOption','card'], function (ChartsOption, TableOption, VarOption, Card) {
	let LogSearch = function (opts = {}) {
		this.urlData = {};
		this.$el = opts.$el;
		this.opts = opts;
		this.chartsOption = new ChartsOption();
		this.tableOption = new TableOption();
		this.varOption = new VarOption();
		this.dataCollect = opts.dataCollect;
		this.colDataGloabel = [];
		this.colDataGloabelData = [];
		this.$fieldList = $("#fieldList", this.$el);
		this.$echartsView = $("#echartsView", this.$el);
		this.$tablesView = $("#tablesView", this.$el);
		this.$previewDatatable = $("#preview_datatable", this.$el);
		this.$varView = $("#varView", this.$el);
		this.$varItem = $("#varXy", this.$el);
		this.$cardView = $("#cardView", this.$el);
		this.$cardXy = $("#cardXy", this.$el);
		this.xAxisDragBox = [];
		this.yAxisDragBox = [];
		this.tableDragBox = [];
		this.varDragBox = [];
		this.tableDatas = [];
		this.varConfig = {};
		this.viewArray = [this.$echartsView, this.$tablesView, this.$varView, this.$cardView]
		this.echartsOption = this.chartsOption.echartsOption;
		this.tablesData = this.tableOption.table;
		this.cardOption = opts.cardOption || {};
		this.dragData = null;
		this.echartsObj = null;
		this.urlData = null;
		this.currentType = '1';
		this.init();
	}
	LogSearch.prototype = {
		init () {
			if (this.opts.type === 'tableXy') {
				this.hideOther(this.$tablesView)
				$("#otherContent", this.$el).addClass('tab')
				this.echartsObj = this.tableOption.init(this.$previewDatatable[0]);
			} else if (this.opts.type === 'card') {
				this.hideOther(this.$cardView);
				$("#otherContent", this.$el).addClass('tab');
				this.initCard(this.cardOption);
			} else {
				this.hideOther(this.$echartsView)
				$("#otherContent", this.$el).removeClass('tab')
				this.echartsObj = this.chartsOption.init(this.$echartsView[0]);
			}
		},
		resetType(type) {
			this.oldType = this.opts.type;
			this.opts.type = type;
			if (this.opts.type === 'tableXy') {
				$("#otherContent", this.$el).addClass('tab')
			} else if (this.opts.type === 'card') {
				$("#otherContent", this.$el).addClass('tab');
			} else {
				$("#otherContent", this.$el).removeClass('tab')
			}
		},
		initCard (cardOption) {
			this.$cardXy.attr('style', `width: ${this.opts.bbox.width}px;height: ${this.opts.bbox.height}px;margin-top: 20px;`)
			this.card = new Card({
				container: this.$cardXy[0],
				cardOption,
				parent: this
			})
			this.card.initDrag();
		},
		setSelectCardItem (id) {
			
		},
		hideOther (self) {
			this.viewArray.forEach(item => {
				if (item !== self) {
					item.hide();
				}
			})
			self.show();
		},
		setUrlData (urlData) {
			this.urlData = urlData;
		},
		getOption() {
			console.log(this.oldType)
			if (this.oldType === 'card') {
				return this.card.getList();
			} else if (this.opts.type === 'tableXy') {
				return this.tablesData;
			} else if (this.opts.type === 'card') {
				return this.card.getList();
			}
			return this.echartsOption;
		},
		getConfig () {
			return {
				urlData: this.urlData,
				xAxisDragBox: this.xAxisDragBox,
				yAxisDragBox: this.yAxisDragBox,
				tableDragBox: this.tableDragBox,
				currentType: this.currentType,
				varDragBox: this.varDragBox
			}
		},
		setField (sqlSearchData) {
			if (sqlSearchData.fieldName === 'agg') {
				this.sqlUnity(sqlSearchData);
			}
			var h = this.colDataGloabel.map(item => {
				return `<div class="dashboard-row-item-layout" draggable="true" data-name="${item.data}">
							<i class="fa fa-text-width"></i>
							<div class="dashboard-single-button">
								<span>${item.data}</span>
							</div>
						</div>`;
			})
			this.$fieldList.empty().append(h);
		},
		sqlUnity (sqlSearchData) {
			var cols = [{data:'index',"title":"序号"}];
			var colData = [];
			var data = sqlSearchData[sqlSearchData.fieldName];
			if (data && data.length > 0) {
				var tmp = Object.keys(data[0]).map(item => {
					return {
						data: item.replace(/\./g,'-'),
						title: item.replace(/\./g,'-'),
					}
				})
				colData = data;
				colData = colData.map((item, index) => {
					item.index = index+1;
					for(var key in item) {
						item[key.replace(/\./g,'-')] = item[key];
						if (item[key].name) {
							item[key] = item[key].name;
						}
					}
					return item;
				})
				cols.push(...tmp);
				colData = data;
				colData = colData.map((item, index) => {
					item.index = index+1;
					for(var key in item) {
						item[key] = item[key];
						if (item[key].name) {
							item[key] = item[key].name;
						}
					}
					return item;
				})
				this.colDataGloabel = cols;
				this.colDataGloabel = this.colDataGloabel.slice(1);
				this.colDataGloabelData = colData;
				this.colDataAll = colData;
			}
		},
		pushAllData (xAxisDragBox, yAxisDragBox, tableDragBox, varDragBox) {
			this.xAxisDragBox = xAxisDragBox || [];
			this.yAxisDragBox = yAxisDragBox || [];
			this.tableDragBox = tableDragBox || [];
			this.varDragBox = varDragBox || [];
//			if (this.xAxisDragBox.length) {
				this.setContent('xAxisDragBox')
				this.isEmpty(this['xAxisDragBox'],'xAxisDragBox');
//			}
//			if (this.yAxisDragBox.length) {
				this.setContent('yAxisDragBox')
				this.isEmpty(this['yAxisDragBox'],'yAxisDragBox');
//			}
//			if (this.tableDragBox.length) {
				this.setContent('tableDragBox')
				this.isEmpty(this['tableDragBox'],'tableDragBox');
//			}
//			if (this.varDragBox.length) {
				this.setContent('varDragBox')
				this.isEmpty(this['varDragBox'],'varDragBox');
//			}
			this.restore = true;
		},
		set colDataAll (data) {
			if (this.restore && this.opts.type === 'tableXy') {
				this.setTablesData();
			} else if (this.restore && this.opts.type === 'echartsXy'){
				this.setEchartsData();
			} else if (this.restore && this.opts.type === 'card'){
				this.setCardData();
			}
		},
		push(key, config) {
			if (this[key] && this[key] instanceof Array) {
				if (!this.isHasSame(key, config, 'name')) {
					this[key].push(config);
					var result = this.isEmpty(this[key], key);
					if (result) {
						this.setContent(key);
					}
					if (this.opts.type === 'tableXy') {
						this.setTablesData();
					} else if (this.opts.type === 'echartsXy') {
						this.setEchartsData();
					} else if (this.opts.type === 'card') {
						this.setCardData();
					}
				}
			}
		},
		remove (key, name) {
			if (this[key] && this[key] instanceof Array) {
				this[key].splice(this[key].findIndex(item => item.name === name), 1);
				this.setContent(key);
				if (this.opts.type === 'tableXy') {
					this.setTablesData();
				} else if (this.opts.type === 'echartsXy') {
					this.setEchartsData();
				} else if (this.opts.type === 'card') {
					this.setCardData();
				}
				
				this.isEmpty(this[key], key);
			} else {
				console.error('not found name,',name);
			}
		},
		isHasSame (key,config,keyValue) {
			return this[key].some(item => item[keyValue] === config[keyValue]);
		},
		isEmpty (data, key) {
			if (data.length === 0) {
				$($("#"+key, this.$el).find('.bi-tips')).removeClass('hide')
				return false;
			}
			$($("#"+key, this.$el).find('.bi-tips')).addClass('hide')
			return true;
		},
		setContent(key) {
			var h = this[key].map(item => {
				return `<div class="bi-single-button" data-name="${item.name}" data-uuid="${item.uuid}" data-type="dimension" data-config=${JSON.stringify(item)}>
							<span>${item.name}</span>
							<i class="fa fa-caret-down"></i>									
							<i class="fa fa-filter hide"></i>
						</div>`;
			})
			$("#"+key, this.$el).find('.bi-single-button').remove()
			$("#"+key, this.$el).append(h);
		},
		render (renderType) {
			this.currentType = renderType;
			if (this.chartsOption) {
				this.echartsOption = this.chartsOption.draw(renderType);
				this.echartsObj && this.echartsObj.clear()
				this.echartsObj.setOption(this.echartsOption);
				if (this.card) {
					this.card.setRenderType(renderType, this.echartsOption);
				}
			}
		},
		setEchartsData () {
			var xAxis = this.findDataByField(this.xAxisDragBox);
			var serise = this.findDataByField(this.yAxisDragBox);
			this.dataCollect.setXAxisData(xAxis, this.echartsOption);
			this.dataCollect.setSerise(serise, this.echartsOption);
			this.render(this.currentType);
			if (this.card) {
				this.card.addCharts(this.xAxisDragBox, this.yAxisDragBox);
			}
		},
		setCardData () {
			var cardData = this.findDataByField(this.varDragBox);
			this.card.setData(cardData, this.varDragBox);
		},
		setVarData () {
			var varText = this.findDataByField(this.varDragBox);
			this.varConfig = this.dataCollect.setVarData(varText, this.varConfig);
			this.varOption.setText(this.varConfig);
			this.renderVar(this.currentType);
		},
		renderVar (renderType) {
			this.currentType = renderType;
			this.varConfig = Object.assign({}, this.varConfig, this.varOption.draw(renderType));
		},
		setTablesData () {
			var tableTable = this.findDataByField(this.tableDragBox);
			this.dataCollect.setTableData(tableTable, this.tablesData);
			if (this.card) {
				this.card.addTables(this.tablesData, this.tableDragBox);
			}
			this.echartsObj && this.echartsObj.destroy();
			delete this.tablesData.aoColumns;
			this.$previewDatatable.html('');
			this.echartsObj = this.$previewDatatable.DataTable(this.tablesData);
			var columns = Object.keys(tableTable);
			var datas = [];
			this.colDataGloabelData.forEach(item => {
				var obj = {}
				columns.forEach(keys => {
					var tmp = JSON.parse('{"'+keys+'":""}');
					tmp[keys] = item[keys] || '';
					obj = Object.assign({}, obj, tmp)
				})
				datas.push(obj);
			})
			this.tableDatas = datas;
			this.echartsObj.rows.add(datas).draw();
		},
		findDataByField (fields) {
			var fieldMap = {};
			fields.forEach(item => {
				fieldMap[item.name] = [];
			})
			this.colDataGloabelData.forEach(items => {
				Object.keys(items).forEach(keys => {
					if (fieldMap[keys]) {
						fieldMap[keys].push(items[keys]);
					}
				})
			})
			return fieldMap;
		},
		renderType (type) {
			if (this.opts.type === 'echartsXy') {
				this.render(type);
			} else if (this.opts.type === 'varXy') {
				this.renderVar(type);
			}
		},
		dropCard (){
			let dragType = this.dragType;
			let normal = this.normal;
			let cardItem = null;
			if (dragType) {
				this.card && this.card.setCardItem({dragType, normal})
			}
		}
	}
	
	return LogSearch;
	
})