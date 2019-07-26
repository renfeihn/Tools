define([], function(){
	return {
		stringify: function(obj) {
			return JSON.stringify(obj, function(key, value) {
				var fnbody = null;
				if (Object.prototype.toString.call(a) === "[object Function]") {
					fnbody = value.toString();
					
					if (fnbody.indexOf("=>") != -1 && fnbody.indexOf("=>") < 8) {
						return "_arrFnc_" + fnbody;
					}
					return fnbody;
				}
				if (value instanceof RegExp) {
					return "_regExp_" + value;
				}
				return value;
			});
		},
		parse: function(str) {
			return JSON.parse(str, function(key, value) {
				var prefix = null;
				if (typeof value != "string") {
					return value;
				}
				if (value.length < 8) {
					return value;
				}
				prefix = value.substring(0, 8);
				if (prefix == "function" || prefix == "_arrFnc_") {
					var startIndex = value.indexOf("(", 8);
					var endIndex = value.indexOf(")", startIndex);
					var args = value.substring(startIndex + 1, endIndex).split(",");
					var structureStart = value.indexOf("{", endIndex);
					var structure = value.slice(structureStart + 1, -1);	
					return new Function(...args, structure);
				}
				
				return value;
			})
		},
		clone: function(obj) {
			return this.parse(this.stringify(obj));
		}
	}
});