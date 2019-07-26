/**
 * 
 */

/**
 * 日志文件下载
 */
define([], function () {
	
	const h = $(`<div class="upload-file-container">
					<div class="upload-file-round upload-file-left" id="fileLeftBtn"><</div>
					<div class="upload-file-content" id="fileListContent">
						<div class="upload-file-container-1" id="uploadFileContent"></div>
					</div>
					<div class="upload-file-round upload-file-right" id="fileRightBtn">></div>
					<div class="upload-close">
						<button type="button" data-type="1">关闭</button>
					</div>
				</div>`)[0]
	
	var upload = function (opts =  {}) {
		this.file = [];
		this.downloadButton = $("#configUpdateA")[0];
		this.defaultUrl = opts.defaultUrl || 'ESSearchAction_sqlSearchDownLoad.do';
		this.checkDownLoadFinish  = opts.checkDownLoadFinish || 'ESSearchAction_checkSqlSearchDownLoadIsFinish.do';
		this.init();
	}
	upload.prototype = {
		init () {
			this.file = [];
			if (!document.querySelector('.upload-file-container')) {
				document.querySelector('body').appendChild(h);
				this.initEvent();
			}
		},
		initEvent() {
			let that = this;
			$("body").delegate('.upload-file-container>.upload-close>button','click', function (e) {
				e.stopPropagation()
				var type = parseInt(this.dataset.type);
				switch (type) {
					case 0:
						break;
					case 1:
						$("body>.upload-file-container").removeClass('active');
						break;
				}
			}).delegate('#uploadFileContent>.upload-file-list',"click" ,function (e) {
				e.stopPropagation()
				var file = this.dataset.file;
				if (file) {
					if (that.file.length <= 1) {
						$("body>.upload-file-container").removeClass('active');
					}
					that.download(file);
				}
			}).delegate('#fileLeftBtn',"click" ,function (e) {
				e.stopPropagation()
				if (!that.isHasMove() || that.isRound(0)) {
					return false;
				}
				var currentLeft = $("#uploadFileContent")[0].getBoundingClientRect().left;
				var step = that.getStep();
				$("#uploadFileContent").attr('style', `left: ${currentLeft + step}px;`)
			}).delegate('#fileRightBtn',"click" ,function (e) {
				e.stopPropagation()
				if (!that.isHasMove() || that.isRound(1)) {
					return false;
				}
				var currentLeft = $("#uploadFileContent")[0].getBoundingClientRect().left;
				var step = that.getStep();
				$("#uploadFileContent").attr('style', `left: ${currentLeft - step}px;`)
			})
		},
		getStep () {
			return $(".upload-file-list", $(".upload-file-container"))[0].getBoundingClientRect().width;
		},
		isRound (type) {
			var maxLeft = 0;
			var itemWidth = $(".upload-file-list", $(".upload-file-container"))[0].getBoundingClientRect().width;
			var len = this.file.length;
			var minLen = parseInt($("#fileListContent")[0].getBoundingClientRect().width / itemWidth);
			var minLeft =  - itemWidth * (len - minLen);
			var currentLeft = $("#uploadFileContent")[0].getBoundingClientRect().left;
			if (type === 0 && currentLeft <= maxLeft) {
				return false;
			}
			if (type === 1 && currentLeft >= minLeft) {
				return false;
			}
			return true;
		},
		isHasMove() {
			var allWidth = $("#fileListContent", $(".upload-file-container"))[0].getBoundingClientRect().width;
			var itemWidth = $(".upload-file-list", $(".upload-file-container"))[0].getBoundingClientRect().width;
			var len = this.file.length;
			if (itemWidth * len > allWidth) {
				return true;
			}
			return false;
		},
		download (url) {
			var clickEvent;
			clickEvent = document.createEvent("MouseEvent");
			clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			this.downloadButton.href = url;
			this.downloadButton.dispatchEvent(clickEvent);
		},
		getProcessList(id) {
			return $(`<div class="upload-file-list" data-id="${id}">
						<span class="file-zip"></span>
						<span class="file-name">正在生成文件</span>
						<span class="file-process">0%</span>
					</div>`)[0]
		},
		push (urlData) {
			if (this.findSame(urlData)) {
				app.alert('当前文件已经下载，请勿重读下载');
				$("body>.upload-file-container").addClass('active');
			} else {
				this.downLoadBigFile(urlData);
			}
		},
		findSame (urlData) {
			return this.file.some(item => {
				return JSON.stringify(item.urlData) === JSON.stringify(urlData);
			})
		},
		downLoadBigFile (urlData) {
			let that = this;
			app.common.ajaxWithAfa({
				url: that.defaultUrl,
				data: urlData
			}).done(function (data) {
				try {
					that.createTimer(data.id, urlData);
				} catch (e) {
					console.log(e);
					app.alert('下载失败！');
				}
			})
		},
		createTimer(id, urlData) {
			this.getDownloadFile(id);
			var timer = setInterval(() => {
				this.getDownloadFile(id);
			}, 10 * 1000)
			this.file.push({
				id, urlData, timer
			})
			var tmp = this.getProcessList(id);
			document.querySelector("#uploadFileContent").appendChild(tmp);
			$("body>.upload-file-container").addClass('active');
		},
		getDownloadFile (id) {
			let that = this;
			app.common.ajaxWithAfa({
				url: that.checkDownLoadFinish,
				data:{
					id
				}
			}).done(function (data) {
				if (data.result) {
					that.updateStatus(id, data.result)
				}
			}).fail(function (e) {
				$(".upload-file-list[data-id='"+id+"']").addClass('fail');
			})
		},
		updateStatus (id, result) {
			$(".upload-file-list[data-id='"+id+"']>.file-process").text(result.percentage)
			if (parseInt(result.percentage) === 100) {
				$(".upload-file-list[data-id='"+id+"']").addClass('succ');
				$(".upload-file-list[data-id='"+id+"']").attr('data-file',result.fileUrl);
				$(".upload-file-list[data-id='"+id+"']>.file-process").text('点击下载')
				var filename = result.fileUrl.substring(result.fileUrl.lastIndexOf('/')+1, result.fileUrl.length);
				$(".upload-file-list[data-id='"+id+"']>.file-name").text(filename);
				this.file = this.file.map(item => {
					if (item.id === id) {
						item.status = 1;
						item.timer && clearInterval(item.timer);
						item.timer = null;
					}
					return item;
				})
			}
			this.checkbox();
		},
		checkbox () {
			var result = this.file.every(function (item) {
				return item.status && (item.status === 1);
			})
			if (!result) {
				window.onbeforeunload = function () {
					var warning = '确认退出?';
					return warning;
				}
			} else {
				window.onbeforeunload = null
			}
		},
		destory () {
			this.file.forEach(item => {
				item.timer && clearInterval(item.timer);
			})
			this.file.splice(0, this.file.length);
		}
	}
	return upload;
})