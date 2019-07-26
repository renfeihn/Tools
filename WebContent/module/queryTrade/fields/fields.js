define([ "upload" ], function(Upload) {
	return {
		load : function($el, scope, handler) {
			var rowData = app.domain.get('queryTrade', 'rowData');

			function syntaxHighlight(json) {
				if (typeof json != 'string') {
					json = JSON.stringify(json, undefined, 4);
				}
				json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
				return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
					function(match) {
						var cls = 'number';
						if (/^"/.test(match)) {
							if (/:$/.test(match)) {
								cls = 'key';
							} else {
								cls = 'string';
							}
						} else if (/true|false/.test(match)) {
							cls = 'boolean';
						} else if (/null/.test(match)) {
							cls = 'null';
						}
						return '<span class="' + cls + '">' + match + '</span>';
					}
					);
			}
			var obj = {};
			for(let key in rowData['_source']){
				if(!key.includes('_head_') && !key.includes('_struct_')){
					obj[key] = rowData['_source'][key];
				}
			}
			for(let key in rowData['_source']){
				if(key.includes('_head_')){
					obj[key] = rowData['_source'][key];
				}
			}
			for(let key in rowData['_source']){
				if(key.includes('_struct_')){
					obj[key] = rowData['_source'][key];
				}
			}
			$('#info').html(syntaxHighlight(obj));
		},
		unload : function(handler) {
		},
		pause : function($el, attr, handler) {
		},
		resume : function($el, attr, handler) {
		}
	};
});