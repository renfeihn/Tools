/**
 * 
 */
define(['html2canvas'], function (html2canvas) {
	let HTMLToCanvas = function (opts) {
		
	}
	HTMLToCanvas.prototype = {
		image (target, opts) {
			opts = !opts ? {} : opts;
			var width = target.getBoundingClientRect().width;
			var height = target.getBoundingClientRect().height;
			var opts = Object.assign({},{
	          useCORS: true,
	          logging: false,
	          width,
	          height
	        }, opts);
			if(opts.base64){
				return html2canvas(target, opts).then(canvas => {
					return canvas.toDataURL('image/png');
				});
			}else{
				html2canvas(target, opts).then(canvas => {
					this.downloadPicture(target, null, canvas.toDataURL('image/png'));
				});
			}
			
			
		},
		downloadPicture (selector, name, url) {
			
			var img = new Image();
			img.onload = function () {
				var canvas = document.createElement('canvas');  //准备空画布
			    canvas.width = img.width;
			    canvas.height = img.height;
			    var context = canvas.getContext('2d');  //取得画布的2d绘图上下文
			    context.drawImage(img, 0, 0);
			    var imgData = canvas.toDataURL('image/png');
			    let a = document.createElement('a')
			    // 创建一个单击事件
			    let event = new MouseEvent('click')
			    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
			    a.download = name || '下载图片名称.png'
			    // 将生成的URL设置为a.href属性
			    a.href = imgData
			    // 触发a的单击事件
			    a.dispatchEvent(event)
			}
			img.src = url;
		},
	}
	
	return new HTMLToCanvas();
})