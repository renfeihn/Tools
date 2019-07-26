	
	/*
	* 双滑杆
	* dom结构没有在组件内增加
	*/
	;(function(){
		$.fn.doubleRange = function(value, min, max, fn){
			if(min >= max){throw new Error('参数错误，第二参数必须小于第三参数')}
			var $self = $(this);
			var lineWidth = $self.width();//线的长度
			var lineValue = value;//线总长对应的值
			var isMoveL = false;//左边点是否可以移动
			var isMoveR = false;//右边点是否可以移动
			var startPointL;//鼠标的开始位置 
			var startPointR;
			var endPoint;//鼠标的结束位置
			

			$self.find('.pro-min span').text(min);
			$self.find('.pro-max span').text(max);
			$self.find('.pro-min').width(min/value*100 + '%');
			$self.find('.pro-max').width(max/value*100 + '%');

			var leftWidth  = $self.find('.pro-min').width();
			var leftValue = min;
			var rightWidth = $self.find('.pro-max').width();
			var rightValue = max;

			$self.find('.left-point').on('mousedown', function(e){
				isMoveL = true;
				startPointL = $('.left-point', $self).offset().left;
				leftWidth = $self.find('.pro-min').width();
			});

			$self.find('.right-point').on('mousedown', function(e){
				isMoveR = true;
				startPointR = $('.right-point', $self).offset().left;
				rightWidth = $self.find('.pro-max').width();
			});

			$(document).on('mousemove', function(e){
				if(!isMoveL && !isMoveR){return}
				$(document.body).css('cursor', 'pointer');
				var e = e || window.event;
				e.preventDefault();
				//e.stopPropagation();				
				if(isMoveL){		
					$self.find('.pro-max').css('z-index', '1');
					var width = leftWidth + e.pageX - startPointL;
					if(width <= 0){
						$self.find('.pro-min').width(0);
					}else if(width >= rightWidth){
						$self.find('.pro-min').width(rightWidth);
					}else{
						$self.find('.pro-min').width(width);	
					}
					$self.find('.pro-min span').text(parseInt($self.find('.pro-min').width()/lineWidth*lineValue));	//最小值數字
				}
				if(isMoveR){
					var width = rightWidth + e.pageX - startPointR;
					if(width <= leftWidth){
						$self.find('.pro-max').width(leftWidth);
					}else if(width >= lineWidth){
						$self.find('.pro-max').width(lineWidth);
					}else{
						$self.find('.pro-max').width(width);	
					}
					$self.find('.pro-max span').text(parseInt($self.find('.pro-max').width()/lineWidth*lineValue));	//最大值數字
				}
					
			});

			$(document).on('mouseup', function(e){
				if(isMoveR || isMoveL){
					fn && fn($self.find('.pro-min span').text(),$self.find('.pro-max span').text());
				}
				isMoveL = false;
				isMoveR = false;
				$(document.body).css('cursor', 'default');
				leftWidth = $self.find('.pro-min').width();
				rightWidth = $self.find('.pro-max').width();
				if(leftWidth == 0){
					$self.find('.pro-max').css('z-index', '3');
				}	
			});


		}
	})();


	/*@date 2016-11-15
	 * 滑杆组件 
	 * 使用方法 $().range(callback)
	 * callback 滑杆移动时候的回调函数
	 * */
	;(function(){
		//是否可以移动
		var isMove = false;
		var currentPosition = null;
		var newPosition = null;
		var titlePent = "0%";
		$.fn.range = function(){
			var _self = this;
			var pWidth = parseInt(this.parent().css("width"))
			var minX = this.parent().offset().left;
			var maxX = minX + pWidth;
			//滑杆移动中的回调函数
			var callback = arguments[0] ? arguments[0] : null;
			this.on("mousedown",function(e){
				var e = e || window.event;
				isMove = true;
				//记录当前鼠标按下的位置x
				//currentPosition.x = e.pageX - selfOffsetLeft;
			});
			
			$(document).on("mousemove",function(e){
				if(!isMove) return;
				var e = e || window.event;
				e.preventDefault();
				//获得新的位置
				newPosition = e.pageX - minX;
				 if(e.pageX < minX ){
					 _self.css("marginLeft", 0+ "px");
					 _self.prev("span").css("width",0 + 'px' );
					 _self.attr("title","0%");
					 return
				 }
				 if(e.pageX > maxX){
					 _self.css("marginLeft", pWidth+ "px");
					 _self.prev("span").css("width",pWidth + 'px' );
					 _self.attr("title","100%");
					 return
				 }
				_self.css("marginLeft",newPosition + "px");
				_self.prev("span").css("width",newPosition + 'px' );
				_self.attr("title",Math.floor((newPosition/pWidth)*100)+ "%");
				
				if(callback && typeof callback === "function"){
					callback();
				}
			});
			$(document).on("mouseup",function(e){
				isMove = false;
				//$(document).off("mousemove").off("mouseup");
			});
			
			//鼠标点击滑杆移动导相因的位置
			_self.parent().on("click",function(e){
				 var e = e || window.event;
				 e.preventDefault();
				// e.stopPropagation();
				 newPosition = e.pageX - minX;
				 if(e.pageX < minX || e.pageX > maxX){
					return
				 }
				_self.animate({"marginLeft":newPosition + "px"});
				_self.prev("span").animate({"width":newPosition + 'px'} );
				_self.attr("title",Math.floor((newPosition/pWidth)*100)+ "%");
				if(callback && typeof callback === "function"){
					callback();
				}
			})
			
		    return _self;
		}})(window,document,window.JQuery)
	 /*拖动功能。
	  * 先暂时这样，（待完善）由于后面的一个功能与这个非常的相似，代码也非常的相似，后期考虑合并到一起。
	  * 
	  * */
	;(function(){
		var minWidth = 230;
		var maxWidth = 500;
		var isDrag = false;
		var offsetPos = 0;
		var currentPos = {};
		var newPos = {};
		
		$.fn.dragWidth = function(){
			var _self = this;
			this.on("mousedown",function(e){
				var e = e || window.event;
				currentPos.x = e.pageX;
				currentPos.y = e.pageY;
				isDrag = true;
				$(document).on("mousemove",function(e){
					if(!isDrag) return
					var e = e || window.event;
					newPos.x = e.pageX;
					newPos.y = e.pageY;
					offsetPos = newPos.x - currentPos.x;
					var nWidth = parseInt(_self.next().css("width"));
					
					/*if(nWidth < minWidth){
						_self.next().css("width",minWidth+"px");
						return
					}
					if(nWidth > maxWidth){
						_self.next().css("width",maxWidth+"px");
						return
					}*/
					if(nWidth - offsetPos > minWidth && nWidth - offsetPos < maxWidth){
						_self.next().css("width",nWidth - offsetPos+"px");
					}
					currentPos.x = newPos.x;
					
				});
				$(document).on("mouseup",function(e){
					isDrag = false;
					$(document).off("mousemove").off("mouseup");
				})
				
			});
			return _self;
		}
	})(window,document,window.JQuery)
		

	;(function(){
		var minHeight = 120;
		var maxHeight = 565;
		var offsetPos = 0;
		var currentPos = {};
		var newPos = {};
		var isDrag = false;
		$.fn.dragHeight = function(options){
			var _self = this;
			this.on("mousedown",function(e){
				var e = e || window.event;
				currentPos.y = e.pageY;
				isDrag = true;
				$(document).on("mousemove",function(e){
					if(!isDrag) return
					var e = e || window.event;
					newPos.y = e.pageY;
					offsetPos = newPos.y - currentPos.y;
					var nHei = parseInt(_self.parent().prev().find("ul").css("height"));
					/*if(nHei < minHeight){
						_self.parent().prev().find("ul").css("height",minHeight + "px");
						return
					}
					if(nHei > maxHeight){
						_self.parent().prev().find("ul").css("height",maxHeight + "px");
						return
					}*/
					if(nHei + offsetPos > minHeight && nHei + offsetPos < maxHeight){
					_self.parent().prev().find("ul").css("height",nHei + offsetPos + "px");
					}
					currentPos.y = newPos.y;
					
				});
				
				$(document).on("mouseup",function(e){
					isDrag = false;
					$(document).off("mousemove").off("mouseup");
				})
			});
			
			return _self;
		}
	})(window,document,window.JQuery)

	/*@date 2016-11-21
	 * 子滚动条不影响父滚动条 
	 * 使用方法 $().scrollUnique();
	 * */
	;(function(){
		$.fn.scrollUnique = function() {
			return $(this).each(function() {
				var eventType = 'mousewheel';
				if(document.mozHidden !== undefined) {
					eventType = 'DOMMouseScroll';
				}
				$(this).on(eventType, function(event) {
					// 一些数据
					var scrollTop = this.crollTop,
						scrollHeight = this.scrollHeight,
						height = this.clientHeight;
					
					var delta = (event.originalEvent.wheelDelta)? event.originalEvent.wheelDelta:-(event.originalEvent.detail || 0);
					if((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)){
						// IE浏览器下滚动会跨边界直接影响父级滚动，因此，临界时候手动边界滚动定位
						this.scrollTop = delta > 0?0:scrollHeight;
						// 向上滚 || 向下滚
						event.preventDefault();
					}
				});
			});
		};
	})(document,window.JQuery)


	/*
	 * canvas 健康度组件
	 * */
	function HealthCon(options) {
		this.isBig = options.isBig;
		options = $.extend(HealthCon.DefaultValue, options);
		this._o = options;
		this._u = HealthCon.themeCol.t1.fine;
		this.id = this._o.id;
		this.context = this._o.context;
		this.stopPoint = this._o.stopPoint;
		this.stopPosition = this._o.stopPosition;
		this.startDeg = this._o.startDeg;
		this.canvas = $("#"+this.id,this.context)[0];
		this.ctx = this.canvas.getContext('2d');
		this.healthy = 0;
		this.director = 1;
		this.re = null;
		this.lineWidth={s:-96,e:-80,s2:-93,e2:-82};
		this.cycleRadius = 110;
		this.cycleX = -106;
		this._init();
		this.text = "告警";
	}
	HealthCon.prototype = {
		_init: function() {
			if(!this.isBig){
				this.canvas.width = this._o.CanvasWidth;
				this.canvas.height = this._o.CanvasHeight;
				this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
				this.cycleX = -95;
			    this._drawBigCycle();
				this._drawSmallCycle();
				
			}
			else{
				this.canvas.width = this._o.CanvasBWidth;
				this.canvas.height = this._o.CanvasBHeight;
				this.ctx.translate(this.canvas.width/2, this.canvas.height/2);
			}
			this._drawText();
			this._drawHealthyText();
			this._drawWhiteLine();
			this._strokeCycle();
			this._drawLittleCycle();
			this._drawSolidWhiteCycle();
			this._drawSolidCycle();
			this.animate();
		},
		_drawBigCycle: function() {
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.shadowOffsetX = 0;
			this.ctx.shadowOffsetY = 0;
			this.ctx.shadowBlur = 10;
			this.ctx.shadowColor = this._u.rgba;
			var linear = this.ctx.createLinearGradient(0, -100, 0, 100);
			linear.addColorStop(0, this._u.start);
			linear.addColorStop(1, this._u.stop);
			this.ctx.fillStyle = linear;
			this.ctx.arc(0, 0, 100, 0, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.closePath();
			this.ctx.restore();
		},
		_drawSmallCycle: function() {
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.fillStyle = '#FFFFFF';
			this.ctx.arc(0, 0, 75, 0, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.closePath();
			this.ctx.restore();
		},
		_drawHealthyText: function() {
			this.ctx.save();
			if(!this.isBig){
				this.ctx.font = 'bold 80px Arial';
			}
			else{
				this.ctx.font = '80px 悦黑';
			}
			var linear = this.ctx.createLinearGradient(0, -50, 0, 0);
			linear.addColorStop('0', this._u.start);
			linear.addColorStop('1', this._u.stop);
			this.ctx.fillStyle = linear;
			this.ctx.textAlign = 'center';
			this.ctx.fillText(this.healthy, 0, 20);
			this.ctx.restore();
		},
		_drawWhiteLine: function() {
			this.ctx.save();
			if(this.isBig){
				this.lineWidth={s:-110,e:-87,s2:-107,e2:-90};
			}
			for (var i = -18; i <= 18; i++) {
				var x, y, x2, y2;
				if ((i * 7.5) % 90 == 0) {
					x = this.lineWidth.s * Math.sin(i * Math.PI / 24);
					y = this.lineWidth.s * Math.cos(i * Math.PI / 24);

					x2 = this.lineWidth.e * Math.sin(i * Math.PI / 24);
					y2 = this.lineWidth.e * Math.cos(i * Math.PI / 24);
				} else {
					x = this.lineWidth.s2 * Math.sin(i * Math.PI / 24);
					y = this.lineWidth.s2 * Math.cos(i * Math.PI / 24);

					x2 = this.lineWidth.e2 * Math.sin(i * Math.PI / 24);
					y2 = this.lineWidth.e2 * Math.cos(i * Math.PI / 24);
				}

				this.ctx.beginPath();
				this.ctx.lineWidth = 1;
				this.ctx.strokeStyle = "#FFF";
				this.ctx.moveTo(x, y);
				this.ctx.lineTo(x2, y2);
				this.ctx.stroke();
			}
			this.ctx.restore();

		},
		_strokeCycle: function() {
			this.ctx.save();
			if(this.isBig){
				this.cycleRadius = 120;
			}
			this.ctx.beginPath();
			var linear = this.ctx.createLinearGradient(0, -50, 0, 0);
			linear.addColorStop('0', this._u.start);
			linear.addColorStop('1', this._u.stop);
			this.ctx.strokeStyle = linear;
			this.ctx.arc(0, 0, this.cycleRadius, -1.25 * Math.PI, this.stopPosition * Math.PI);
			this.ctx.stroke();
			this.ctx.closePath();
			this.ctx.restore();
		},
		_drawText: function() {
			this.ctx.save();
			if(this.isBig){
				this.ctx.fillStyle = "#FFF";
			}else{
				this.ctx.fillStyle = "#2b2933";
			}
			this.ctx.font = "16px 悦黑";
			this.ctx.textAglin = "center";
			this.ctx.fillText(this.text, -16, 47);
			this.ctx.restore();
		},
		_drawLittleCycle: function() {
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.strokeStyle = this._u.stop;
			this.ctx.rotate(this.startDeg * Math.PI / 180);
			this.ctx.arc(this.cycleX, 55, 5, 0, 2 * Math.PI);
			this.ctx.stroke();
			this.ctx.closePath();
			this.ctx.restore();
		},
		_drawSolidWhiteCycle: function() {
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.fillStyle = "#fff";
			this.ctx.rotate(this.startDeg * Math.PI / 180);
			this.ctx.arc(this.cycleX, 55, 3.5, 0, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.closePath();
			this.ctx.restore();
		},
		_drawSolidCycle: function() {
			this.ctx.save();
			this.ctx.beginPath();
			this.ctx.fillStyle = this._u.stop;
			this.ctx.rotate(this.startDeg * Math.PI / 180);
			this.ctx.arc(this.cycleX, 55, 1.5, 0, 2 * Math.PI);
			this.ctx.fill();
			this.ctx.closePath();
			this.ctx.restore();
		},
		setHealthValue:function(val){
			this.stopPoint = val;
			this.animate();
		},
		animate: function() {
			var _self = this;
			if (_self.stopPoint == this.healthy) {
				return
			}
			_self.ctx.clearRect(-(this.canvas.width/2), -(this.canvas.width/2), this.canvas.width, this.canvas.height);
			if(this.healthy > this.stopPoint){
				this.director = -2;
			}
			else{
				this.director = 2
			}
			this.healthy = this.healthy + this.director;
			this.stopPosition = this.stopPosition + 0.015 * this.director;
			this.startDeg = this.startDeg + 2.7 * this.director;
			if (this.healthy >= 80) {
				_self._u = HealthCon.themeCol.t1.fine;
				this.text = "正常";
			} else if (this.healthy >= 60) {
				_self._u = HealthCon.themeCol.t1.moderate;
				this.text = "预警";
			} else {
				_self._u = HealthCon.themeCol.t1.warn;
				this.text = "告警";
			}
			if(!this.isBig){
				_self._drawBigCycle();
				_self._drawSmallCycle();	
			}
			_self._drawHealthyText();
			_self._strokeCycle();
			_self._drawWhiteLine();
			_self._drawText();
			_self._drawLittleCycle();
			this._drawSolidWhiteCycle();
			this._drawSolidCycle();
			this.re = requestAnimationFrame(_self.animate.bind(_self));
			//this.re = setInterval(_self.animate.bind(_self), 150);
			if (this.healthy == _self.stopPoint) {
				this.healthy = this.stopPoint;
				cancelAnimationFrame(this.re);
				//clearInterval(this.re);
			}

		}

	};

	HealthCon.DefaultValue = {
		CanvasWidth: 240,
		CanvasHeight: 230,
		CanvasBWidth: 340,
		CanvasBHeight: 286,
		startHealthPoint: 100,
		startDeg: -15,
		stopPoint: 0,
		theme: 't1.fine',
		stopPosition: -1.25,
		id: null
	};
	HealthCon.themeCol = {
		t1: {
			fine: {
				start: '#5EE895',
				stop: '#34C493',
				rgba: 'rgba(52, 196, 147, 0.8)'
			},
			moderate: {
				start: '#B3BCFF',
				stop: '#04BCE4',
				rgba: 'rgba(4, 188, 228, 0.8)'
			},
			warn: {
				start: '#FF905E',
				stop: '#FF2741',
				rgba: 'rgba(255, 39, 65, 0.8)'
			}
		}
	};

	/*
	 * canvas 健康度组件结束
	 * */

/*
 * 放大 拖放 
 * */

    function scaleEl(el,options){
       this.params = $.extend({},scaleEl.DEFAULT,options);
       this.el = el;
       this.scale =  this.params.defaultMultiple;
       this.transX = this.params.initPosition.x;
       this.transY = this.params.initPosition.y;
       this.speedMu = this.params.speedMu;
       this.init();
    }
    //初始化函数
    scaleEl.prototype.init = function(){
    	this.el.css("transform",'scale('+this.params.defaultMultiple+')' + 
								'translateX('+ this.params.initPosition.x +'px)'+  
								'translateY('+ this.params.initPosition.y +'px)');
    }
    //缩放  放大
    scaleEl.prototype.largen = function(){
    	this.scale +=  this.params.defaultScale;
    	if(this.scale >=3){
    		this.scale = 3;
    	}
    	this.el.css("transform",'scale('+this.scale+')' + 
								'translateX('+ (-this.transX)/(this.scale * this.speedMu) +'px)'+  
								'translateY('+(-this.transY)/(this.scale * this.speedMu) +'px)');
    	this.drag();
    }
    //缩放 缩小
    scaleEl.prototype.lessen = function(){
    	this.scale -=  this.params.defaultScale;
    	if(this.scale <= 0.5){
    		this.scale = 0.5
    	}
    	this.el.css("transform",'scale('+this.scale+')' + 
								'translateX('+ (-this.transX)/(this.scale * this.speedMu) +'px)'+  
								'translateY('+(-this.transY)/(this.scale * this.speedMu) +'px)');
    	this.drag();
    }
    //缩放 恢复
    scaleEl.prototype.resume = function(){
    	this.scale =  this.params.defaultMultiple;
    	this.transX = this.params.initPosition.x;
    	this.transY = this.params.initPosition.y;
    	this.init();
    }
    
    //拖动功能
    scaleEl.prototype.drag = function(){
    	 var that = this;
    	//当scale大于默认的时候才能够发生拖动
    	/*if(this.scale < this.params.defaultMultiple){
    		return
    	}*/
    	//监听鼠标事件
    	this.el.on("mousedown",function(e){
    		e.preventDefault();
    		e.stopPropagation();
    		if(e.target.nodeName == "BUTTON" || e.target.nodeName == "DIV"){
    			return
    		}
    		$(this).css("cursor","-webkit-grab");
    		//记录当前鼠标点下的位置
    		var curPoint = {},
    		    newPoint = {},
    		    direX = 1;
    		    direY = 1;
    		curPoint.x = e.pageX;
    		curPoint.y = e.pageY;
    		$(this).on("mousemove",function(e){
    			newPoint.x = e.pageX;
    			newPoint.y = e.pageY;
    			
    			//判断是哪个方向
    			direX = newPoint.x - curPoint.x;
    			direY = newPoint.y - curPoint.y;
    			
    			
    			//改变元素的translate
    			that.transX = that.transX - direX;
    			that.transY = that.transY - direY;
    			$(this).css("transform",'scale('+that.scale+')' + 
    									'translateX('+ (-that.transX)/(that.scale * that.speedMu)+'px)'+  
    									'translateY('+(-that.transY)/(that.scale * that.speedMu) +'px)');
    			
    			//更新当前位置
    			curPoint.x = newPoint.x;
    			curPoint.y = newPoint.y;
    		});
    		
    		$(document).on("mouseup",function(e){
    			that.el.css("cursor","default");
    			that.el.off("mousemove").off("mouseup");
    		});
    	})
    	
    }
    
    scaleEl.DEFAULT = {
    	defaultMultiple:1,  //默认缩放比例
    	defaultScale:0.2,     //默认缩放比例
    	defaultSpeed:10,      //默认拖放速度
    	initPosition:{x:0,y:0},
        speedMu : 5
    }
    
  /* $.fn.scaleEl = function(opts){
    	return this.each(function(){
    		new scaleEl(this,opts);
    	})
    } */
    ///window.scaleEl = scaleEl;






























