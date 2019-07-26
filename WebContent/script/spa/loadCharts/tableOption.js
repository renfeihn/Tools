/**
 * 
 */
define(['dataTables'], function (dataTables) {
	var tableOption = function () {
		this.table = JSON.parse(dataTables);
	}
	tableOption.prototype = {
		init (ele) {
			var chartsObj = $(ele).DataTable(this.table)
			return chartsObj;
		}
	}
	return tableOption;
})