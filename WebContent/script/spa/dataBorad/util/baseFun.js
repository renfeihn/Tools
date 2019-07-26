/**
 * 获取数据基本方法
 */
define(['service'], function (service) {
	return {
		merge: function () {
			
		},
		findDiff: function (arr1, arr2) {
			if (arr1.length === 0) {
				return arr2;
			}
			let len = arr2.length;
			let arr1Tmp = arr1.map(item => {
				if (item.fields) {
					delete item.fields;
				}
				return JSON.stringify(item);
			})
			let diff = [];
			while(len) {
				let a2 = arr2[len - 1];
				if (!arr1Tmp.includes(JSON.stringify(a2))) {
					diff.push(a2);
				}
				len --;
			}
			return diff;
		},
		getComponents: function (stageType, filterUUId, tag) {
			let stage = components.stageCollect.getStage(stageType);
			if (!stage) {
				return [];
			}
			let scene = stage.scene;
			if (scene === null) {
				return [];
			}
			let component = scene.componet;
			if (tag) {
				component = stage.children;
			}
			let com = [];
			component.forEach(item => {
				this.recursion(item, com);
			})
			if (filterUUId) {
				com = com.filter(item => {
					if (item.uuid === filterUUId) {
						return false;
					}
					return true;
				})
			}
			return com;
		},
		recursion (component, com) {
			if (!component) { 
				return com;
			}
			com.push(component)
			if (!component.children || component.children.length === 0) {
				return com;
			}
			component.children.forEach(item => {
				return this.recursion(item, com);
			})
		},
		getDmField (components) {		// 拿到当前配置的模型
			let field = [];
			if (!components || components.length === 0) return field;
			components = components.filter(function (item) {
				if (!item.dataSource) {
					if (item.Content && item.Content.dataSource) {
						return true;
					}
					return false
				}
				return true;
			})
			if (!components || components.length === 0) return field;
			components.forEach(item => {
				if (item.Content) {
					item = item.Content;
				}
				field.push({
					modelName: item.dataSource.modelName,
					modelId: item.dataSource.modelId
				})
			})
			return JSON.parse(JSON.stringify(field));
		},
		serDmField (components, selectField, type) {
			if (!components || components.length === 0 || !selectField) return; 
			components = components.filter(function (item) {
				if (!item.dataSource) {
					if (item.Content && item.Content.dataSource) {
						return true;
					}
					return false
				}
				return true;
			});
			let tmp = {};
			selectField.forEach(item => {
				if (!tmp[item.id.split('$_$')[0]]) {
					tmp[item.id.split('$_$')[0]] = [];
				}
				tmp[item.id.split('$_$')[0]].push(item.value);
			})
			let tmp1 = {};
			for(var key in tmp) {
				if (!tmp1[key.split('.')[0]]) {
					tmp1[key.split('.')[0]] = {};
				}
				tmp1[key.split('.')[0]][key] = tmp[key];
			}
			for(var key in tmp1) {
				let modelId = key;
				let com = this.getComponent(modelId, components);
				if (com && com.length > 0) {
					let item = tmp1[key];
					let outfilter = {};
					for(var ii in item) {
						if (type === 'date') {
							item[ii] = item[ii][0].split('~');
						}
						outfilter[ii] = {
							field: item[ii],
							type: type
						}
					}
					com.forEach(item => {
						let param = item.param;
						if (param[0]['outfilter']) {
							for(var key in param[0]['outfilter']) {
								if (param[0]['outfilter'][key].type === type) {
									delete param[0]['outfilter'][key];
								}
							}
						} else {
							param[0]['outfilter'] = {};
						}
						param[0]['outfilter'] = Object.assign({},param[0]['outfilter'],outfilter);
						item.paramAjax = param;
					})
				} else {
					selectField = selectField.filter(item => {
						if (item.id.split('$_$')[0] === key) {
							return false;
						}
						return true;
					})
				}
			}
		},
		getComponent (modelId, components) {
			let tmp = [];
			components.forEach(item => {
				let ss = item;
				if (item.Content) {
					ss = item.Content;
				}
				if (ss.dataSource.modelId === modelId) {
					tmp.push(ss);
				}
			});
			return tmp;
		},
		unityFieldSelf (newField, oldField) {		// 这里进行合并处理
			// 先处理新数组
			let tmp = {};
			newField.forEach(item => {
				if (!tmp[item.modelId]) {
					tmp[item.modelId] = {};
					tmp[item.modelId] = {
						modelName: item.modelName,
						fields: this.collectFieldAndResult(item.fields, item.resultFilter)
					}
				}
			});
			// 将新老字段合并处理，保证一个模型中的字段不重复
			for(var key in tmp) {
				if (!oldField[key]) {
					oldField[key] = {};
					oldField[key] = tmp[key];
				} else {
					let old = oldField[key].fields;
					let newF = tmp[key].fields;
					newF.forEach(item => {
						let flag = false;
						old.forEach(ff => {
							if (item.ename === ff.ename) {
								flag = true;
							}
						})
						if (!flag) {
							old.push(item);
						}
					})
				}
			}
			return oldField;
 		},
 		collectFieldAndResult (fields, resultFilter) {		// 合并字段和结果过滤器中
 			let tmp = fields || [];
 			let len = resultFilter.length;
 			while (len) {
 				let flag = false;
 				fields.forEach(item => {
 					if (item.ename === resultFilter[len - 1].ename) {
 						flag = true;
 					}
 				})
 				if (!flag) {
 					tmp.push({
 	 					ename: resultFilter[len - 1].ename,
 	 					modelId: resultFilter[len - 1].modelId,
 	 					cname: resultFilter[len - 1].cname
 	 				})
 				}
 				resultFilter = resultFilter.slice(0, len - 1);
 				len --;
 			}
 			return tmp;
 		},
 		getModalData (filter, dom, selectField, stageType) {
 			let filterTmp = JSON.parse(JSON.stringify(filter));
 			let stage = components.stageCollect.getStage(stageType);
 			let params = stage.FilterParams;
 			let param = [];
 			let that = this;
 			for(var key in filterTmp) {
 				let item = filterTmp[key];
 				let fields = item.fields;
 				fields.forEach(tt => {
 					param.push(`${key}.${tt.ename}`);
 				})
 			}
 			service.modalService.queryDmDict({
 				data: {
 					request: JSON.stringify(param)
 				},
 				fn: function (data) {
 					for(var key in data) {
 						let field = key.split('.')[1];
 						let hh = data[key].map(it => {
 							return `<li data-id="${key}$_$${it[field]}" class="text-no-wrap" title="${it[field]}">
 							<i data-type="1" class="fa ${that.isHasFieldValue(selectField, `${key}$_$${it[field]}`)?'fa-check-square':'fa-square-o'}"></i><span>${it[field]}</span></li>`
 						}).join('');
 						dom.querySelector('ul[data-ename="'+key+'"]').innerHTML = hh;
 						if (params) {
 							that.setPageFilter(params, dom.querySelector('ul[data-ename="'+key+'"]'))
 						}
 					}
 				}
 			})
 		},
 		setPageFilter(param, dm) {
 			param.forEach(item => {
 				let id = item.id.split('$_$')[0];
 				let $li = dm.querySelectorAll('li');
 				if ($(dm).attr('data-ename') === id) {
 					Array.prototype.forEach.call($li, function (li) {
 	 					$(li).removeClass('hide');
 	 					if ($(li).attr('title').trim() == item.value) {
 	 						$($(li).find('i')).removeClass('fa-square-o').addClass('fa-check-square');
 	 					} else {
 	 						$(li).addClass('hide');
 	 						$($(li).find('i')).removeClass('fa-check-square').addClass('fa-square-o');
 	 					}
 	 				})
 				}
 			})
 		},
 		isHasFieldValue (selectField, value) {
 			let tmp = selectField.map(item => {
 				return item.id;
 			})
 			return tmp.includes(value);
 		},
 		getSelectLi (dom) {
 			let $li = $(dom).find('li');
 			let arr = [];
 			Array.prototype.forEach.call($li, function (li) {
 				let $i = $($(li).find('i')[0]);
        		let id = $(li).attr('data-id');
        		if ($i.hasClass('fa-check-square')) {
        			arr.push({
        				id,
        				value: $(li).text().trim()
        			})
        		}
			})
			return arr;
 		},
 		getSelectSapn (dom) {
 			let $span = $(dom).find('.operate-filter-field>span');
 			let arr = [];
 			let startTime = $($(dom).find('.operate-filter-timer>input:first-child')).val();
 			let endTime = $($(dom).find('.operate-filter-timer>input:last-child')).val();
 			if (startTime !== "") {
 				startTime = new Date(startTime).getTime()
 			} else  {
 				startTime = 0;
 			}
 			if (endTime !== "") {
 				endTime = new Date(endTime).getTime()
 			} else  {
 				endTime = 0;
 			}
 			Array.prototype.forEach.call($span, function (span) {
        		let id = $(span).attr('data-id');
        		if ($(span).hasClass('active')) {
        			arr.push({
        				id,
        				value: startTime+'~'+endTime
        			})
        		}
			})
			return arr;
 		},
 		getAllDataByDm (dm, components, type) {
 			if (!components || components.length === 0) return; 
			components = components.filter(function (item) {
				if (!item.dataSource) {
					if (item.Content && item.Content.dataSource) {
						return true;
					}
					return false
				}
				return true;
			});
 			dm.forEach(item => {
 				let modelId = item.modelId;
				let com = this.getComponent(modelId, components);
				if (com && com.length > 0) {
					com.forEach(item => {
						let param = item.param;
						param = param.map(item => {
							if (item.outfilter) {
								for(var key in item.outfilter) {
									if (item.outfilter[key].type === type) {
										delete item.outfilter[key];
									}
								}
							}
							return item;
						});
						console.log(param)
						item.paramAjax = param;
					})
				}
 				
 			})
 		}
	}
});