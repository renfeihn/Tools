$.fn.fishBone2 = function(data) {
    var colors = ['#43A6DA', '#F9BF3B'];

    /**入口*/
    //1.创建dom
    $(this).children().remove();
    $(this).append(creataFishBone(data));

    
    /**li左边框线颜色 border-left-color 动态获取*/
    function getColor(i) {
        var length = colors.length;
        var color = 'gray';
        if (i <= length - 1) {
            color = colors[i];
        } else {
            color = colors[i % length];
        }
        return color;
    };
    /**轴线上圆点位置纵坐标，见图片line-point.png*/
    function getLinePointY(i) {
        var length = colors.length;
        var y = 0;
        if (i <= length - 1) {
            y = -i * 20;
        } else {
            y = -(i % length) * 20;
        }
        return y + "px";
    };
    /**第一行日期圆点位置纵坐标，图片line-first.png*/
    function getLineFirstY(i) {
        var length = colors.length;
        var y = 0;
        if (i <= length - 1) {
            y = -i * 60;
        } else {
            y = -(i % length) * 60;
        }
        return y + "px";
    };
    /** .title-left背景纵坐标，0px开始，见图片title.png*/
    function getTitleLeftY(i) {
        var length = colors.length;
        var y = 0;//图片位置
        if (i <= length - 1) {
            y += -i * 60;
        } else {
            y += -(i % length) * 60;
        }
        return y + "px";
    };
    /** .title-center背景纵坐标，600px开始，见图片title.png*/
    function getTitleCenterY(i) {
        var length = colors.length;
        var y = -117;//图片位置
        if (i <= length - 1) {
            y += -i * 60;
        } else {
            y += -(i % length) * 60;
        }
        return y + "px";
    };
    /**.title-right背景纵坐标，1200px开始，见图片title.png*/
    function getTitleRightY(i) {
        var length = colors.length;
        var y = -240;//图片位置
        if (i <= length - 1) {
            y += -i * 60;
        } else {
            y += -(i % length) * 60;
        }
        return y + "px";
    };
    /**创建dom结构*/
    function creataFishBone(data) {
        var fishBone = $("<div class='fishBone'/>");
        var wrapper = $("<div class='wrapper'></div>");
        var bd = $("<div class='bd'></div>");
        var ul_item = $("<ul/>");
        //遍历数据
        $(data).each(function(index) {
        	//修改top/bottom添加方式，根据给定的条件去添加top或者bottom
        	//var class_flag = $(data)[index].flag;
            var itemclass=itemClass(index);//显示在轴上方或下方标识 top/bottom
            var ul = $("<ul></ul>");
            //遍历封装属性
            //封装时间和通讯渠道
            if(itemclass=='top'){
                var li_deploy_time = $("<li class='line-first'>" + this['服务代码'] + "</li>");
                var li_version_number = $("<li class='title'></li>");
                var titleLeft =  $("<span class='title-left'>&nbsp;</span>");
                var titleCenter =  $("<span class='title-center'>"+this['通讯结果']+"</span>");
                var titleRight =  $("<span class='title-right'>&nbsp;</span>");
                if(this['通讯结果'] == '成功'){
                	li_deploy_time.css('background-position-y', "9px");//9是原计算结果的偏移量，显示位置正合适
                	titleLeft.css('background-position-y','0px');
                	titleCenter.css('background-position-y','-117px');
                	titleRight.css('background-position-y','-240px');
                }else{
                	li_deploy_time.css('background-position-y', "-113px");//9是原计算结果的偏移量，显示位置正合适
                	titleLeft.css('background-position-y','-60px');
                	titleCenter.css('background-position-y','-177px');
                	titleRight.css('background-position-y','-300px');
                }
                li_version_number.append(titleLeft).append(titleCenter).append(titleRight);
                li_deploy_time.appendTo(ul);
                li_version_number.appendTo(ul);
            }
            //封装其他属性
            var _data = this;
            $.each(this, function(name, value) {
            	var li = $("<li>" + name + "：" + value + "</li>");
                if (name != '通讯结果' && name != '服务代码') {
                	if(_data['通讯结果'] == '成功'){
                		li.css("border-left","1px solid "+colors[0]);
                	}else{
                		li.css("border-left","1px solid "+colors[1]);
                	}
                    li.appendTo(ul);
                }
            });
          //封装时间和通讯渠道
            if(itemclass=="bottom"){
            	var titleLeft =  $("<span class='title-left'>&nbsp;</span>");
            	var titleCenter =  $("<span class='title-center'>"+this['通讯结果']+"</span>");
            	var titleRight =  $("<span class='title-right'>&nbsp;</span>");
            	var li_deploy_time = $("<li class='line-first'>" + this['服务代码'] + "</li>");
                var li_version_number = $("<li class='title'></li>");
                if(this['通讯结果'] == '成功'){
                	li_deploy_time.css('background-position-y', "-215px");//9是原计算结果的偏移量，显示位置正合适
                	titleLeft.css('background-position-y','0px');
                	titleCenter.css('background-position-y','-117px');
                	titleRight.css('background-position-y','-240px');
                }else{
                	li_deploy_time.css('background-position-y', "-93px");//9是原计算结果的偏移量，显示位置正合适
                	titleLeft.css('background-position-y','-60px');
                	titleCenter.css('background-position-y','-177px');
                	titleRight.css('background-position-y','-300px');
                }
                li_version_number.append(titleLeft).append(titleCenter).append(titleRight);
                li_version_number.appendTo(ul);
                li_deploy_time.appendTo(ul);
            }
            //封装轴线上的圆点
            var point = $("<li class='line-last line-point'></li>");
            if(this['通讯结果'] == '成功'){
            	point.css('background-position', '0px ' + '0px');
            }else{
            	point.css('background-position', '0px ' + '-20px');
            }
            point.appendTo(ul);
            
            //生成一个item（一个完整的案件）
            var li_item = $("<li class='item'></li>");
            var content = $("<div class='content'></div>");
            ul.appendTo(content);
            content.appendTo(li_item);
            li_item.addClass(itemClass(index)).appendTo(ul_item);
        });
        ul_item.appendTo(bd);
        bd.appendTo(wrapper);

        var prev = $("<a class='prev'></a>");
        var next = $("<a class='next'></a>");
        var line = $("<div class='line'/>");

        fishBone.append(wrapper).append(prev).append(next).append(line);
        return fishBone;
    };
    /**item添加样式，显示在上方或下方*/
    function itemClass(index) {
        index += 1;
        if (index % 2 == 0) {
            //偶数显示到下方
            return "bottom";
        } else {
            //奇数显示到上方
            return "top";
        }
    }
};