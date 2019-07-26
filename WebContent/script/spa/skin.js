/**
 * cookie
 * 
 * */
$.extend({
    setCookie: function (name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = name + "=" + escape(value || '') + ';path=/;' +
            (!expiredays ? '' : ';expires=' + exdate.toGMTString()+';max-age='+expiredays*3600*24);
    },
    getCookie: function (name) {
        try {
            return unescape(document.cookie.match(new RegExp(name + '=([^;]+)'))[1]);
        } catch (ex) {
            return null;
        }
    }
});

$(function(){
    /*变量*/
	var $_imgBg=$("#imgBg");
	var $_skinContainer=$("#skinChangeContainer");
	var $_onlinePicList=$("#onlinePicList");
	var $_localPicList=$("#localPicList");
    var bgImg=new Image();
	var defaultPath='img/bg.jpg';
	var fileUpload;


    /*方法*/
    //创建img图片
    function creatImg(){
        var h1='',html='';
        var createLiImg={
            picImg:'<li></li>',
            colorImg:'<li class="li-small"></li>'
        };
        for(var i=1;i<23;i++){
            if(i<11){
                h1+=createLiImg.picImg;
            }
            else{
                html+=createLiImg.colorImg;
            }
        }
        $_onlinePicList.append(h1);
        $_localPicList.append(h1+html);

        //给img的src添上图片的路径
        colorImg();
    }
    //加载可变换网络图片
    function nextPageImg(){
        var onlineIndex=0,
            $onlineImgs=$_onlinePicList.find('li:lt(10)').removeClass('loaded');
        for(var i=0;i<10;i++){
            var  r=Math.round(Math.random()*2000+1),
                	onlineImg=new Image();
            onlineImg.onload=function(){
                $onlineImgs.eq(onlineIndex++).css('background-image',"url('"+this.src+"')").addClass('loaded');
            };
            onlineImg.src='http://img.infinitynewtab.com/wallpaper/{num}.jpg'.replace('{num}', r);
        }
    }
    //加载默认图片和固定的纯颜色
    function colorImg(){
    	var $imgs=$_localPicList.find('li');;
        for(var i=0;i<23;i++){
        	if(i<10){
        		$imgs.eq(i).css('background-image',"url('"+'img/skin/bg_'+(i+1)+'.jpg'+"')").addClass('loaded');
        	}
        	else{
	            $imgs.eq(i).css('background-image',"url('"+'img/skin/bg_'+(i+1)+'.gif'+"')");
        	}
        }
    }

    /*数据加载*/
    //设置body的背景图片
    creatImg();

    /*监听绑定*/
    $_skinContainer.click(function(e){
		var $e = $(e.target || window.event.srcElement);
		//关闭换肤弹出框
		if($e.hasClass('close')){
			$_skinContainer.slideUp(100);
		}
		//换一页图片
		else if($e.hasClass('next-page-btn')){
			nextPageImg();
		}
		//大小图切换
		else if($e.is('li')){
            if($e.css('background-image')&&$e.css('background-image')!=='none'){
                var urlReg=/url\(['"]?([^'"\)]+)['"]?\)/,
                    url=$e.css('background-image').match(urlReg)[1];

                $_imgBg.css('background-image',$e.css('background-image'));
                $.setCookie('imgPath',url,365);
            }

		}else if($e.attr('href')==='#custom'){
			if(!fileUpload){
				setTimeout(function(){
                    var headerHeight= 0,
                        $this=$('#imageUploadID'),
                        $parent=$this.closest('.text-center');
					fileUpload=app.formControl.bootstrapUpload({
						el:$this,
			    		tips:'只能选择jpg,gif,png,bmp,jpeg文件',
			    		canEditName:false
					});
                    $_skinContainer.children(':lt(2)').each(function () {
                        headerHeight += $(this).outerHeight(true);
                    });
                    console.log($parent.outerHeight(true));
                    $parent.css('margin-top',(($_skinContainer.height()-headerHeight-$parent.outerHeight(true))/3)+'px');
				},30);
			}else{
                fileUpload.reset();
            }
		}else if($e.attr('href')==='#onlinePic') {
			//判断网络是否连接，有连接显示图片，没连接提示网络不行。
			$.ajax({
				timeout:2000,//设置请求时间
				type:"GET",
				dataType:"html",
				url:"http://img.infinitynewtab.com/wallpaper/1767.jpg",
				success:function(){
					if(!$_onlinePicList.children().attr('class')){
						$(".noNet").addClass("hide");
		                nextPageImg();
		            }
				},
				error:function(){
					$(".noNet").removeClass("hide");//离线处理
				}
				});
		}
	});
    $("#uploadPicBtn").click(function(){
		//校验
		var validateResult = app.validate.validate({
			data: [{
                id: 'imageUploadID',
                msg:'请上传正确格式的jpg,gif,png,bmp,jpeg文件',
                filter: {
                    require: true
                }
            }],
			errorCallback: function ($el, errMsg) {
                app.alert('上传图片', errMsg, app.alertShowType.ERROR);
            },
            correctCallback: function () {}
		});
		if(validateResult.bResult){
            app.shelter.show('正在上传“'+fileUpload.getName()+'”，请稍候…');
			$.ajaxFileUpload({
				type: "post",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                url: 'UserManagerAction_uploadCustomImage.do',
                fileElementId: 'imageUploadID',
                dataType: 'json',
                data: "",
                success: function (data) {
                    app.shelter.hide();
                    fileUpload.reset();
                    var path = data.content.filepath,
                        filePath = (path.substring(path.indexOf("img"))).replace(/\\/g, "\/");
                    $_imgBg.css('background-image', 'url(' + filePath + ')');
                    $.setCookie('imgPath', filePath, 365);
                },
                error:function(xhr,status,errorMsg) {
                    app.shelter.hide();
                    fileUpload.reset();
                    app.alert('上传图片', '上传图片失败：' + errorMsg, app.alertShowType.ERROR);
                }
			});
		}
	});
});

 