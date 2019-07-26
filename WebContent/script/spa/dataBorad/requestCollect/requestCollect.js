/**
 * 
 */
define(['service','dataRestore'], function (service, dataRestore) {
	let requestCollect = function (opts) {
		this.queue = [];
		this.allQueue = [];
		this.interval = [];
		this.userid = null;
		this.stageType = opts.stageType;
		this.timer = null;
		this.queueLen = 5;			// 队列长度
		this.timeStart = false;
		this._init();
	}
	
	requestCollect.prototype = {
		_init () {
			this.queue = [];
			try {
				this.userid = JSON.parse(localStorage.getItem('visual:data:analysis')).userName;
			} catch (e) {
				this.userid = null;
			}
			this.arrChange();
		},
		arrChange (fn) {
			let len = 0;
			let index = 0;
			let that = this;
			let tt = setInterval(function () {
				if (that.allQueue.length !== 0) {
					if (len !== 0) {
						if (that.allQueue.length === len) {
							if (index === 2) {
								that.slice(0, that.queue.length);
								that.initInterval();
								clearInterval(tt);
							} else {
								index ++;
							}
						}
					}
					len = that.allQueue.length;
				}
			}, 200);
		},
		push (param) {
			this.queue.push(param);
			this.allQueue.push(param);
			if (!this.timeStart && this.queue.length >= this.queueLen) {
				this.slice(0, this.queueLen);
			}
			if (this.timeStart) {
				this.slice(0, this.queue.length);
			}
		},
		
		slice(start, end) {
			let request = this.queue.slice(start, end);
			this.queue = this.queue.slice(end);
			request.length > 0 && this.unity(request);
		},
		unity (queue) {
			let p = [];
			queue.forEach(item => {
				item.param[0].requestid = item.requestid;
				p.push(item.param[0]);
			})
			this.ajax(p, queue);
		},
		ajax (param, queue) {
			let userid = this.userid;
			let that = this;
			service.themeSourceService.queryDmData({
				data: {
					request: JSON.stringify({
						userid: userid,
						paras: param
					}),
				},
				fn: function (data) {
					that.delivery(data, queue);
				}
			})
		},
		initInterval () {
			let that = this;
			this.timeStart = true;
			this.timer && clearInterval(this.timer);
			setTimeout(function () {
				if (that.allQueue.length !== 0 && that.getInterval()) {
					that.setInterval();
				}
			}, 1000);
		},
		getInterval() {
			let that = this;
			that.allQueue.forEach(item => {
				if (item.param[0].refresh && item.param[0].refresh !== "") {
					if (!that.interval.includes(parseInt(item.param[0].refresh))) {
						that.interval.push(parseInt(item.param[0].refresh));
					}
				}
			});
			that.interval = that.interval.map(item => {
				return {
					value: item,
					step: Math.floor(parseInt(item)/60),
					current: 0
				}
			})
			console.log(that.interval);
			if (that.interval.length > 0) {
				return true;
			}
			return false;
		},
		setInterval () {
			let index = 0;
			let that = this;
			this.timer = setInterval(function (){
				index += 1;
				if (index > 60) {
					index = 0;
				}
				let refresh = that.isHasCurrent(index);
				if (refresh.length !== 0) {
					that.findByRefresh(refresh);
				}
			}, 1000);
		},
		findByRefresh (refresh) {
			console.log('refresh, time is ', refresh);
			let refreshP = [];
			this.allQueue.forEach(item => {
				if (item.param[0].refresh && item.param[0].refresh !== "") {
					if (refresh.includes(parseInt(item.param[0].refresh))) {
						refreshP.push(item);
					}
				}
			});
			if (refreshP.length !== 0) {
				this.unity(refreshP);
			}
		},
		isHasCurrent (index) {
			let cur = [];
			this.interval = this.interval.map(item => {
				if ((index + 60 * item.current === item.value) && item.step === item.current) {
					cur.push(item.value);
					item.current = 0;
				} else if (((item.value - index)%60 === 0) && item.step > item.current) {
					item.current += 1;
				}
				return item;
			})
			return cur;
		},
		delivery (data, queue) {
			for(var key in data) {
				let requestid = key;
				let p = this.getQueueById(requestid, queue);
				if (p) {
					let ret = JSON.parse(`{"${key}":${JSON.stringify(data[key])}}`)
					p.dataRes.restore({
						fields: ret,
						config: p.parent.config,
						dataSource: p.parent.dataSource,
						CeilType: p.parent.CeilType
					}).then(res => {
						p.setData(p.parent.CeilType);
					});
					
				}
			}
		},
		getQueueById (requestid, queue) {
			let p = null;
			for(var i = 0 ; i < queue.length ; i ++ ) {
				if (queue[i].requestid === requestid) {
					p = queue[i];
					break;
				}
			}
			return p;
		},
		clearInterval() {
			this.timer && clearInterval(this.timer);
		}
	}
	
	return requestCollect;
	
})