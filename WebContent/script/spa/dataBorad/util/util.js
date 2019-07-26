define([], function(){
	
	return {
		showOrHideEdit (content, className, config) {
			$(content).toggleClass(className);
			if ($(content).hasClass(className)) {
				window.postMessage(Object.assign({}, {showmodal: true}, config), '*')
			}
		},
		inherits: function(clazz, baseClazz){
			var clazzPrototype = clazz.prototype;
			function F() {}
			F.prototype = baseClazz.prototype;
			clazz.prototype = new F();

			for (var prop in clazzPrototype) {
				clazz.prototype[prop] = clazzPrototype[prop];
			}
			clazz.prototype.constructor = clazz;
			clazz.superClass = baseClazz;
		},
        genearteUUid: function () {
            var charts = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = new Array(36);
            var rnd = 0, r;
            return function generateUUID() {
                for (var i = 0; i < 36; i++) {
                    if (i === 8 || i === 13 || i === 18 || i === 23) {
                        uuid[i] = '-';
                    } else if (i === 14) {
                        uuid[i] = '4';
                    } else {
                        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random() * 0x1000000) | 0;
                        r = rnd & 0xf;
                        rnd = rnd >> 4;
                        uuid[i] = charts[( i === 19 ) ? ( r & 0x3 ) | 0x8 : r];
                    }
                }
                return uuid.join('');
            };
        }(),
        removeClass: function(el, className) {
		    var arr = el.className.split(" ");
		    var index = arr.indexOf(className);
		    if (index != -1) {
		        arr.splice(index, 1);
                el.className = arr.join(" ").trim();
            }
        },
        addClass: function(el, className) {
            var arr = el.className.split(" ");
            var index = arr.indexOf(className);
            if (index == -1) {
                arr.push(className);
                el.className = arr.join(" ").trim();
            }
        },
        serialize: function (obj, name) {
            // 将实例序列化
            var result;
        },
        debounce: function (func, wait, immediate) {
            var timeout, args, context, timestamp, result;

            var later = function() {
              var last = Date.now() - timestamp;

              if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
              } else {
                timeout = null;
                if (!immediate) {
                  result = func.apply(context, args);
                  if (!timeout) context = args = null;
                }
              }
            };

            return function() {
              context = this;
              args = arguments;
              timestamp = Date.now();
              var callNow = immediate && !timeout;
              if (!timeout) timeout = setTimeout(later, wait);
              if (callNow) {
                result = func.apply(context, args);
                context = args = null;
              }

              return result;
            };
        }
	}
});