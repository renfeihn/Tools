/**
 * topo图动画
 */
define(['script/spa/createjs/tweenjs.js'], function () {
	let animtion = function () {}
	animtion.prototype = {
		init (opts) {
			this.opts = opts;
			this.config = opts.config;
			this.onChange = opts.onChange;
			this.onComplete = opts.onComplete;
			this.timeScale = opts.timeScale || 1;
			this.bounce = !!opts.bounce;
			this.reversed = !!opts.reversed;
			this.wait = opts.wait || 0;
			this.loop = opts.loop || 0;
			this.ignoreGlobalPause = !!opts.ignoreGlobalPause;
			this.useTicks = !!opts.useTicks;
			this.interTime = opts.interTime || 1000;
			this.target = opts.target;
		},
		CSSPlugin() {
			
		},
		Tween () {
			let opts = {
				timeScale: this.timeScale,
				bounce: this.bounce,
				reversed: this.reversed,
				loop: this.loop,
				ignoreGlobalPause: this.ignoreGlobalPause,
				useTicks: this.useTicks
			}
			if (this.onChange) {
				opts = Object.assign({}, opts, {onChange: this.onChange});
				
			}
			if (this.onComplete) {
				opts = Object.assign({}, opts, {onComplete: this.onComplete});
			}
			var tween = createjs.Tween.get(this.config, opts).wait(this.wait).to(this.target, this.interTime, createjs.Ease.bounceOut);
			if (this.onComplete) {
				tween.call(this.onComplete)
			}
		},
		handleComplete () {
			console.log('tween is complete!');
		}
	}
	
	return animtion;

})