/**
 * 发布订阅者模式
 */

define([], function () {
	let EventEmitter = function () {
		this.handler = {}
	}

	EventEmitter.prototype = {
		listen (key, fn) {
			if (!this.handler[key]) {
				this.handler[key] = []
			}
			this.handler[key].push(fn)
		},
		on () {
			this.listen(...arguments)
		},
		trigger () {
			let key = Array.prototype.shift.call(arguments);
			let fns = this.handler[key]
			if (!fns || fns.length === 0) {
				return false
			}
			for(var i = 0 ; i < fns.length ; i ++ ) {
				fns[i].apply(this, arguments)
			}
		},
		off () {
			let key = Array.prototype.splice.call(arguments, 0, 1);
			let fns = this.handler[key]
			if (!fns || fns.length === 0) {
				return false
			}
			if (arguments.length === 0) {
				fns && (fns = [])
			}
			for(let i = 0 ; i < fns.length; i ++ ) {
				let _fn = fns[i];
				if (_fn === arguments[0]) {
					fns.splice(i, 1)
				}
			}
		}
	}
	
	return EventEmitter;
})