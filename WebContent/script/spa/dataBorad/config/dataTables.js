/**
 * 表格
 */

define([], function() {
	"use strict";
	
	var columns = [
		{"data": "example", "title": '示例', defaultContent: ''}
    ];

	var options = {
		"stateSave": false,
		"autoWidth": true,
		"ordering": true,
		"searching" : true,
		"paging": true, //翻页功能
		"destroy": true,
		"bInfo":true,
		"pageLength": 5,
		"bLengthChange": true,
		"lengthMenu": [5,10,15,20,25,50,100],
		"columns": columns
	};
	return JSON.stringify(options);
});