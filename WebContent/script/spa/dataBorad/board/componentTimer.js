/**
 * 组件刷新频率配置
 */
define([], function () {
	let componentTimer = function (opts = {}) {
		this.opts = opts;
		this.timer = null;
		this.timerList = [];
		this._init();
	}
	componentTimer.prototype = {
		_init () {
			this._setInterval();
		},
		_setInterval() {
			this.timer = setInterval( () => {
				this._setUpdate();
			}, 5000)
		},
		_setUpdate() {
			this.timerList = this.timerList.map(item => {
				item.cal -= 5;
				if (item.cal <= 0) {
					console.log('refresh id, '+ item.id);
					this.opts.parent.setRefresh(item.id);;
					item.cal = item.timer;
				}
				return item;
			})
		},
		push (item) {
			this.timerList = this.timerList.filter(timer => {
				if (timer.id === item.id) {
					return  false;
				}
				return true;
			})
			this.timerList.push(item);
			console.log(this.timerList);
		}
		
	}
	return componentTimer;
})