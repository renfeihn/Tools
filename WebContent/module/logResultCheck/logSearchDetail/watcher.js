/**
 * 
 */

define([], function () {
	var GetNum = 0;

	let keyWacth = '';

	function observer(value, cb){

		Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))

	}

	function watch(vm, exp, cb){

		Dep.target = cb;

		return exp();

	}


	const deepClone=(obj)=>{

	   var proto=Object.getPrototypeOf(obj);

	   return Object.assign({},Object.create(proto),obj);

	}

	class Watcher {

	  constructor(options) {

	    this.$options = options;

	    this._data = options.data;

	    Object.keys(options.data).forEach(key => this._proxy(key));   //将data中的每个属性都赋予get和set方法

	    observer(options.data);

	    watch(this, this._render.bind(this), this._update.bind(this));

	  }

	  _proxy(key) {

	    const self = this;

	    Object.defineProperty(self, key, {

	      configurable: true,

	      enumerable: true,

	      get: function proxyGetter () {

	        return self._data[key]
	      
	      },

	      set: function proxySetter (val) {

	        self._data[key] = val;
	        
	      }

	    })

	  }

	  _update() {

	    this._render.call(this);

	  }

	  _render() {

	  	var self = this,
	  		keys = '',
	  		text = keyWacth,
	  		data = self._data;

	  	Object.keys(data).forEach( key => {

	  		if(data[key] === text){

	  			keys = key;

	  		}
	  	})

	  	if(keys !== ''){
	  		
	  		keyWacth = '';
			
			return this.$options.watch[keys].call(this)

	  	}

	  }
	  
	}

	function defineReactive(obj, key, val, cb) {

	  const dep = new Dep();

	  Object.defineProperty(obj, key, {

	    enumerable: true,

	    configurable: true,

	    get: () => {
	    	
			if(Dep.target){

				dep.add(Dep.target)

			}

			return val

	    },

	    set: newVal => {

	      if(newVal === val) return

	      keyWacth = newVal;

	      val = newVal

	      dep.notify()

	    }

	  })

	}

	
	


	class Dep {

	  constructor() {

	    this.subs = []

	  }

	  add(cb) {

	    this.subs.push(cb)

	  }

	  notify() {

	    this.subs.forEach((cb) => cb())

	  }

	}

	Dep.target = null;
	
	return Watcher;
	
	
})