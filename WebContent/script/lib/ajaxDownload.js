/**
 * 通过ajax异步下载文件
 */
;
(function($) {
	$.ajaxDownload = function(url, data) {
		if (!url || !data) {
			console.log("ajaxDownload: 入参为空！！！");
			console.log("ajaxDownload: url:%s, data:%o", url, data);
			return;
		}
		if (!(data instanceof Object)) {
			console.log("ajaxDownload: 数据参数仅支持对象传参！");
			return;
		}
		$form = $('<form action="' + url + '" accept-charset="utf-8" method="POST"></form>');
		$form.appendTo('body');
		for (var i in data) {
			var $input = $('<input/>');
			$input.attr('name', i).attr('value', data[i]);
			$form.append($input);
		}
		$form.submit().remove();
	}
})(jQuery);