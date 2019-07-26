<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.dataBoard-event-container{
		position: absolute;
	    height: 100%;
	    width: 400px;
	    background: #FFF;
	    top: 0;
	    z-index: 10000;
	    right: -400px;
	}
	.dataBoard-event-container.active{
	    box-shadow: rgb(204, 204, 204) 4px 4px 5px 6px;
	    right: 0;
	}
	.event-config-item {
		position: relative;
		border: 1px solid #d8d7d7;
    	padding: 10px;
    	box-sizing: border-box;
    	margin-bottom: 10px;
	}
	.event-config-item .delete-event-item{
		position: absolute;
	    right: -7px;
	    top: -7px;
	    background: red;
	    width: 15px;
	    height: 15px;
	    text-align: center;
	    line-height: 15px;
	    font-size: 12px;
	    border-radius: 15px;
	    color: #FFF;
	    cursor: pointer;
	}
	.event-config-item input[type="radio"] {
		margin: 0;
		margin: 0 5px 0 0;
	}
	.event-config-item .controls{
		display: flex;
    	align-items: center;
	}
	.event-config-item .controls.mulit-controls{
		margin-bottom: 10px;
	}
	.event-config-item .controls.mulit-controls .mulit-controls-name{
		margin-right: 10px;
		color: #888;
	}
	.event-config-item .controls input:not([type="radio"]), .event-config-item .controls select {
		width: 75%;
	}
	.event-config-item .control-group.inline-block {
		width: 49%;
		display: inline-block;
	}
	.event-config-item .control-group.inline-block-3 {
		width: 32%;
		display: inline-block;
	}
	.add-list {
		font-size:  12px;
		cursor: pointer;
	}
	/*三级分类选择start*/
	.components-log-container .components-log-accessLogContent {
		position: relative;
	    color: #5c5a66;
	    z-index: 1;
	    font-size: 12px;
	    background-color: #fff;
	}
	.components-log-container .components-log-accessLogContent>span{
	    width: 220px;
	    line-height: 38px;
	    display: block;
	    color: #5c5a66;
	    position: relative;
	    cursor: pointer;
	    padding: 0 60px 0 20px;
	}
	.components-log-container .components-log-accessLogContent>span>i{
		height: 100%;
	    width: 40px;
	    background-color: #f9f9fb;
	    line-height: 30px;
	    font-size: 20px;
	    position: absolute;
	    right: 0px;
	    text-align: center;
	    border-left: 1px solid #c7c6cd;
	    color: #c7c6cb;
	}
	.components-log-container .components-log-accessLogContent>div,
	.components-log-container .components-log-accessLogContent>ul{
		display: none;
		background-color: #fff;
	    border: 1px solid #c7c6cc;
	    position: relative;
	}
	.components-log-container .components-log-accessLogContent>ul{
	    box-shadow: -1px 1px 2px #c7c6cc;
	}
	.components-log-container .components-log-accessLogContent>div {
	    width: 600px;
	    box-shadow: 1px 1px 2px #c7c6cc;
	}
	.components-log-container .components-log-accessLogContent>div>div:first-child {
	    right: 10px;
	    bottom: 10px;
	    z-index: 2;
	    position: absolute;
	}
	.components-log-container .components-log-accessLogContent>div>div:first-child button.light {
	    background: #fff;
	    border-color: var(--color-theme);
	    color: var(--color-theme);
	}
	.components-log-container .components-log-accessLogContent>div>div:first-child button.light:hover {
	    background: var(--color-theme);
	    color: #FFFFFF;
	    border-color: var(--color-theme);
	}
	.components-log-container .components-log-accessLogContent>div>div:first-child button{
		cursor: pointer;
		width: 70px;
		height: 35px;
		margin-left: 10px !important;
	}
	.components-log-container .components-log-accessLogContent>div h5 {
	    font-weight: bold;
	    cursor: pointer;
	    width: auto;
	    display: inline-block;
	    line-height: 20px;
	    padding: 0 5px;
	}
	.components-log-container .components-log-accessLogContent>div h5:not(.active):not(.disabled):hover,
	.components-log-container .components-log-accessLogContent>div span:not(.active):not(.disabled):hover {
		text-decoration: underline;
	}
	.components-log-container .components-log-accessLogContent>div span.active,
	.components-log-container .components-log-accessLogContent>div h5.active {
		background-color: #e1e2f0;
	}
	.components-log-container .components-log-accessLogContent>div div>span {
	    color: #5e619f;
	    cursor: pointer;
	    flex: none;
	    position: absolute;
	    text-align: right;
	    right: 420px;
	    overflow: visible;
	    white-space: nowrap;
	    line-height: 20px;
	    padding: 0 5px;
	}
	.components-log-container .components-log-accessLogContent>div:nth-child(3) h5.disabled,
	.components-log-container .components-log-accessLogContent>div:nth-child(3) div>span.disabled{
		cursor: default;
	}
	.components-log-container .components-log-accessLogList{
		border-bottom: 1px dashed #eee;
		margin-top: 10px !important;
	}
	.components-log-container .components-log-accessLogList:after{
		content: '';
		clear: both;
		display: block;
	}
	.components-log-container .components-log-accessLogList>div{
		/*margin-left: 150px !important;
	    min-height: 30px;
	    position: relative;
	    top: -20px;*/
	    display: inline-block;
	    min-height: 30px;
	    float: right;
	    width: calc(100% - 180px);
	}
	.components-log-container .components-log-accessLogList>div>p{
		word-wrap: break-word;
	}
	
	.components-log-container .components-log-accessLogContent>div p>span {
	    display: inline-block;
	    cursor: pointer;
	    padding: 0 5px;
	    margin: 0 5px 5px 5px !important;
	    line-height: 20px;
	    word-break: break-all;
	}
	.components-log-container .components-log-accessLogContent>ul{
		width: 180px;
	    cursor: pointer;
	}
	.components-log-container .components-log-accessLogContent>ul>li {
		padding: 0 5px;
		height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.components-log-container .components-log-accessLogContent>ul>li.choosed:before {
	    content: '* ';
	}
	.components-log-container .components-log-accessLogContent>ul>li i {
	    position: absolute;
	    right: 5px;
	    top: 10px;
	    transform: translateY(10px);
	}
	.components-log-container .components-log-accessLogContent>ul>li.active {
		color: #505394;
	    background: #d7d8f0;
	}
	.components-log-container .components-log-accessLogContent>ul>li:hover{
		background: #ebedf4;
	}
	/*三级分类选择end*/
	
	/* 工具栏样式开始  */
	.components{
		position: absolute;
	    right: 20px;
	    display: flex;
	    height: 40px;
	    line-height: 49px;
	    display: flex;
	    align-items: center;
	}
	.components>div {
		margin: 0 10px;
		display: flex;
    	align-items: center;
    	cursor: pointer;
	}
	
	.selectCate-menu>div {
		width: 100%;
	    padding: 0 10px;
	    height: 50px;
	    line-height: 50px;
	    position: relative;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    cursor: pointer;
	    transition: all .3s linear;
	    color: #5C5A66;
	    font-size:  12px;
	}
	.selectCate-menu>div:HOVER{
		background: #EBEDF4;
	}
	.selectCate-menu>div>span {
		
	}
	.selectCate-menu>div>i {
		font-size: 12px;
	}
	.selectCate-level2-show{
	    width: 600px;
	    box-shadow: 1px 1px 2px #c7c6cc;
	    background-color: #fff;
	    border: 1px solid #c7c6cc;
	    position: fixed;
	    z-index: 10;
	    box-sizing: border-box;
	}
	.selectCate-level2-show>div {
		width: 100%;
	}
	/* 工具栏样式结束  */
	/*日期选择*/
	.components-times-dateRangeChoose{
		position: relative;
	    color: #5c5a66;
	    z-index: 10;
	    font-size: 12px;
	    background-color: #fff;
	    border-left: none !important;
	    border-right: none !important;
	}
	
	.components-times-dateRangeChoose:after{
		content: '';
		height: 100%;
	    width: 40px;
	    position: absolute;
	    right: 0;
	    top: 0;
	    border-left: 1px solid #c7c6cd;
	    background: #f9f9fb url(img/logSearch/time.jpg) no-repeat center center;
	}
	
	.components-times-dateRangeChooseContent a{
		box-sizing: content-box;
	}
	.components-times-dateRangeChooseBtn{
		height: 32px;
		padding: 0 20px;
		margin-bottom: 20px !important;
		display: none;
	}
	.components-times-dateRangeChooseBtn>button{
		float: right;
	}
	.components-times-quickRangeSelect{
		margin: 0;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
	}
	.components-times-quickRangeSelect>li{
		width: calc((100% - 42px)/4);
	    height: 40px;
	    line-height: 38px;
	    padding: 0 20px;
	    box-sizing: border-box;
	    margin-right: 10px !important;
	    display: inline-block;
	    border: 1px solid #c7c6cb;
	    border-radius: 3px;
	    text-align: center;
	    margin-bottom: 10px !important;
	    cursor: pointer;
	}
	.components-times-quickRangeSelect>li:hover{
		border:1px solid var(--color-theme);
		color: var(--color-theme);
	}
	
	.components-times-quickRangeSelect>li.active{
		border:1px solid var(--color-theme);
	    background: var(--color-theme);
	    color: #fff;
	}
	
	.components-times-quickRangeSelect>li:nth-child(4n+4){
		margin-right: 0 !important;
	}
	/*日期选择end*/
    .db-list{
        width: 260px;
        /*height: 830px;*/  /*暂定*/
        height: calc(100vh - 42px);
        background-color:#3E456E;
        color: #fff;
        position: relative;
        transition: width 0.5s;
    }
    .db-list.pickUp{
        width: 0;
    }
    .db-list.pickUp .db-list-c{
        display:none;
    }
    .db-list-header{
        height: 24px;
        color: #D3D5FF;
        display:flex;
        justify-content: space-between;
        padding: 8px;
        margin: 0 10px;
    }
    .db-list-header span:nth-child(1) {
        font-size:15px;
    }
    .db-list-header a{
        color: #D3D5FF;
        text-decoration: none;
    }
    .db-list-search {
        padding: 0 8px;
        margin: 0 10px;
        position: relative;
    }
    .db-list-search input {
         width: 100%;
         padding-right: 24px;
     }
    .db-list-search i {
        width: 24px;
        height: 22px;
        position: absolute;
        right:8px;
        top:0;
        color: #c9c8ce;
        background-color: #F9F9FB;
        text-align: center;
        line-height: 22px;
        border: 1px solid #C9C8CE;
        cursor: pointer;
    }
    .db-list-items{
        margin: 0;
        padding: 0;
    }
    .db-list-item{
        height:36px;
        line-height: 36px;
        padding: 0 18px;
        font-size:14px;
        cursor: pointer;
        position: relative;
        z-index: 333;
        overflow: hidden;
    }
    .db-list-nodata{
        text-align:center;
    }
    .db-list-edit{
        width:84px;
        background-color: #fff1f0;
        color:#000;
        text-align: center;
        position:absolute;
        right:-21px;
        border-radius: 2px;
        z-index:9999;
        display: none;
    }
    .db-list-edit:before{
        content: "";
        border-color: transparent transparent #fff1f0 transparent;
        border-style: solid;
        border-width: 8px;
        position: absolute;
        left: 50%;
        margin-left: -8px;
        top:-16px;
    }
    .db-list-edit ul{
        margin:0;
    }
    .db-list-edit ul li{
        height:28px;
        line-height:28px;
        cursor: pointer;
    }
    .db-list-edit ul li:hover{
        opacity: .5;
    }
    .db-list-item.selected {
        background-color:#4C5797;
    }
    .db-list-item:hover {
        background-color: #4C5797;
    }
    .db-list-item.selected .item-ellipsis {
        display: inline-block;
        width: 6px;
        text-align: center;
    }
    .db-list-item .item-tooltip{
        width: 270px;
        height: 80px;
        background-color: #3E456E;
        position: absolute;
        top: 0px;
        right: -318px;
        z-index: 999;
        border-radius: 2px;
        padding:20px;
        line-height: 24px;
        display: none;
    }
    .db-list-item:hover .item-tooltip{
        display: block;
    }
    .db-list-item .item-tooltip:before{
        content: "";
        width: 0;
        height: 0;
        border-color: transparent #3E456E transparent transparent;
        border-style: solid;
        border-width: 8px;
        position: absolute;
        left: -16px;
        top: 16px;
    }
    .item-tooltip .item-tooltip-item{
        display:flex;
    }
    .item-tooltip .item-tooltip-item span:nth-child(1){
        margin-right: 15px;
    }
    .item-tooltip .item-tooltip-item span:nth-child(2){
        flex:1;
    }
    .overflowDisplay1{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .overflowDisplay3{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    .item-ellipsis{
        display: none;
        color: #8593E5;
        position: absolute;
        right: 20px;
        top: 11px;
    }
    .item-bars{
        margin-right:10px;
    }
    .db-list-arrow{
        position: absolute;
        right: -12px;
        top: 50%;
        width: 12px;
        height:40px;
        margin-top: -20px;
        background-color: #2E3457;
        clip-path: polygon(0px 0px,12px 7px, 12px 34px, 0px 40px);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 500;
    }
    .db-list-arrow .db-small-arrow{
        width: 0;
        height:0;
        overflow: hidden;
        font-size: 0;
        line-height: 8px;
        border-color: transparent #535D9C transparent transparent;
        border-style: solid;
        border-width: 6px;
        margin-right: 6px;
    }
    .db-content{
        flex:1;
        background-color: #F5F5FA;
    }
    .db-content-header{
        display: flex;
	    justify-content: space-between;
	    line-height: 12px;
	    padding: 10px 0 0;
	    height: 32px;
	    background: #FFF;;
    }
    .db-content-header .db-content-header-title{
       	font-size: 14px;
	    font-weight: 700;
	    color: #383740;
	    padding-left: 20px;
	    line-height: 23px;
    }
    .db-content-header-btn a{
        color:#383740;
        text-decoration: none;
        display: inline-block;
        padding: 5px;
        border: 1px solid #C7C6CC;
        font-weight: normal;
    }
    .db-content-header-btn a.disabled{
        color: #aeadb2;
        border-color: #ebebed;
        cursor: not-allowed;
    }
    .db-content-main{
        position: relative;
	    padding: 10px 0 0 0;
	    height: calc(100vh - 85px);
	    box-sizing: border-box;
	    overflow-y: auto;
    }
    .db-content-footer{
        height:44px;
        background-color: #EBEBF0;
        line-height: 44px;
    }
    .db-content-footer button{
        float: right;
        margin-top: 6px;
        margin-right: 20px;
    }
    .instance-item{
        position: absolute;
        background-color: #fff;
        width:300px; /*暂定*/
        height:300px; /*暂定*/
        min-width: 200px;
        min-height: 200px;
        padding: 25px;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }
    .instance-item-header{
        height:20px;
        line-height:20px;
    }
    .instance-item-header .item-title{
        font-size: 16px;
        font-weight: bold;
        display:inline-block;
    }
    .charts-item{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    .instance-item-header a{
        font-size: 16px;
        text-decoration: none;
        color:#9B9DBA;
        margin: 0 2px;
    }
    .instance-item-footer{
        position: absolute;
        width:100%;
        height: 25px;
        bottom: 0;
        right: 0;
        opacity: 0;
    }
    .instance-item-footer .resize-arrow{
        position: absolute;
        right:5px;
        bottom: 5px;
        display: inline-block;
        width: 10px;
        height: 10px;
        clip-path: polygon(10px 0, 0 10px, 10px 10px);
        background-color: #CACAD2;
        cursor: nw-resize;
    }
    #modal .chartsModal-item .cm-item-header{
        height:24px;
        line-height:38px;
        font-size: 16px;
        font-weight: bolder;
        padding: 5px 5px 25px 5px;
        border-bottom: 1px solid #D8D7DB;
    }
    #modal .chartsModal-item .cm-item-header:before{
        content: "";
        width: 6px;
        height: 18px;
        background-color: #5257b6;
        display: inline-block;
        margin-right: 8px;
        vertical-align: text-bottom;
    }
    #modal .cm-item-l{
        flex: 1;
        border: 1px solid #D8D7DB;
        margin: 10px;
        border-radius: 5px;
        position:relative;
    }
    #modal .cm-item-l.selected{
        border-color:#5265D7;
    }
    #modal .cm-item-l.selected:after{
          content: "√";
          display: inline-block;
          color:#fff;
          position:absolute;
          right:0;
          top:0;
          background-color: #5265D7;
          width: 15px;
          height:15px;
          line-height: 15px;
          text-align: center;
    }
    #modal .cm-item-l.selected i{
       color: #5265D7;
    }
    #modal .cm-item-l.selected span{
        color: #5265D7;
    }
    #modal .cm-item-l i{
        display: block;
        height: 60px;
        text-align:center;
        line-height: 70px;
        font-size:40px;
        color:#8089aa;
    }
    #modal .cm-item-l span{
        display: block;
        text-align: center;
        color: #8089aa;
    }
    #modal .cm-item-block{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #modal .cm-item-block span{
        margin-right: 20px;
        color: #5e6fda;
    }
    #modal .cm-item-ul-box{
        height:250px;
        overflow-y: auto;
        background-color: #F2F2F7;
    }
    #modal .cm-item-ul{
        margin: 0;
    }
    #modal .cm-item-ul li{
        height:31px;
        line-height: 36px;
        padding: 5px 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #modal .cm-item-ul li.disabled{
        color: #999;
        pointer-events: none;
        opacity: 0.5;
    }
    #modal .cm-item-ul li:hover{
        background-color: #0A9EE6;
    }
    /*#modal .cm-item-ul li.disabled:hover{
        background-color: #ccc9d8;
    }*/
    #modal .cm-item-ul li .cm-icon-li-item{
        color:#8089AA;
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 20px;
        text-align: center;
    }
    #modal .cm-radio{
        width: 16px;
        height:16px;
        background-color: #fff;
        border: 1px solid #9DA5C3;
        border-radius: 50%;
        cursor: pointer;
    }
    #modal .cm-radio.selected{
        border-width: 5px;
        border-color: #5265D7;
        width: 8px;
        height:8px;
    }
    #modal .preViewImg{
        position:absolute;
        width:200px;
        height:100px;
        right: -180px;
        background-color:#fff;
        display:none;
        opacity: 0;
        transition: all 0.3s;
    }
    #modal .cm-radio:hover+.preViewImg{
        opacity: 1;
        display: block;
    }
    #modal .cm-radio.disabled{
        cursor: not-allowed;
    }
    #modal2 .modal-item label{
        display: inline-block;
        font-size: 1rem;
    }
    #modal2 .modal-item input{
        width: 248px;
    }
    #modal2 .modal-item textarea{
        width: 604px;
        height: 120px;
        resize: none;
    }
    .edit-group{
      	opacity:0;
        float: right;
        position: relative;
        z-index: 2;
    }
    .instance-item:hover .edit-group, .instance-item:hover .instance-item-footer{
       opacity:1;
    }
    .charts-item img{
    	width:100%;
    	height:100%;
    }
    textarea#annotation {
        width: 84%;
        resize: none;
        height: 140px;
    }
    /* 工具部分 */
    .db-content-tool{
    	position: absolute;
	    display: flex;
	    align-items: center;
	    left: 300px;
	    height: 42px;
	    border: 1px solid #C7C6CD;
	    padding: 0 0 0 10px;
	    border-top: none;
    }
    .db-content-tool .db-content-list{
    	display: flex;
    	align-items: center;
    	height: 100%;
    }
    .db-content-tool .db-content-list .components-times-dateRangeChoose,
    .db-content-tool .db-content-list .components-times-dateRangeChoose>span{
    	height: 100%;
    }
    .db-content-header-btn{
    	padding-right: 10px;
    }
    .db-content-header-btn>button{
    	height: 27px;
	    font-size: 12px !important;
	    padding: 0 14px;
    }
    .db-content-list #selectCate{
    	height: 42px;
	    line-height: 42px;
	    padding-left: 20px;
	    min-width: 100px;
    }
    .db-content-list .selectCate-menu{
		position: fixed;
	    background: #FFF;
	    display: flex;
	    align-items: center;
	    width: 173px;
	    flex-wrap: wrap;
	    z-index: 10;
	    box-shadow: rgb(204, 204, 204) 4px 4px 8px;
	}
	.db-content-list .components-times-dateRangeChoose>span{
		width: 136px;
		height: 38px;
		line-height: 42px;
		display: block;
		color: #5c5a66;
		position: relative;
		cursor: pointer;
		margin: 0 60px 0 20px;
		border-left: 1px solid #c7c6cd;
		text-align: center;
	}
	#bindAppModal .apps-wrap {
    background: #e4e6e8;
    padding: 10px;
}
#bindAppModal .apps-wrap>span {
    display: inline-block;
    background: #eff0f1;
    border: solid 1px #b6b6b7;
    padding: 2px 6px;
    margin: 0 6px 4px 0;
    border-radius: 2px;
    font-size: 12px;
    cursor: pointer;
}
#bindAppModal .apps-wrap>span.active {
    background: var(--color-theme);
    border-color: #34556f;
    color: #fff;
}
.db-content-list>.fa-sort-down{
	margin-left: 10px;
    height: 100%;
    width: 40px;
    background-color: #f9f9fb;
    line-height: 36px;
    font-size: 20px;
    text-align: center;
    border-left: 1px solid #c7c6cd;
    color: #c7c6cb;
    cursor: pointer;
}
.db-content-tool .components-times-dateRangeChooseContent{
	position: absolute;
    width: 616px;
    top: 43px;
    left: 20px;
    background-color: #fff;
    box-shadow: 0px 10px 31px rgba(0,0,0,0.2);
}
</style>
<ul class="topo-menu-ul" id="menuTopo" style="display: none;">
	<li class="topo-menu-li" data-id="0">删除</li>
</ul>
<section class="panel" style="margin: 0 -1px;">
    <div class="content" style="display: flex; padding: 0;">
        <div class="db-list">
            <div class="db-list-c">
                <div class="db-list-header">
                    <span><i class="fa fa-bars item-bars"></i>仪表盘列表</span>
                    <span>
                    <a href="javascript:void(0)" id="addDashBorad">
                       <i class="fa fa-plus"></i>
                       	 新增
                    </a>
                </span>
                </div>
                <div class="db-list-search">
                    <input type="search"  id="dbSearch"/>
                    <i class="fa fa-search"></i>
                </div>
                <div class="db-list-l">
                    <ul class="db-list-items">
                    </ul>
                    <div class="db-list-nodata" style="display: none;">
                                                          无可用仪表盘列表。
                    </div>
                </div>
            </div>
            <div class="db-list-arrow" id="dbListResize">
                <div class="db-small-arrow"></div>
            </div>
        </div>
        <div class="db-content" style="position: relative;">
	        <div class="db-content-tool">
	        	<div class="db-content-list">
	        		<span>时间筛选</span>
	        		<div id='dateSetectWarp' class="components-times-dateRangeChoose">
						<input type="text" id="dateSetectInput" style="display: none;">
						<span id="dateSetect"></span>
						<div id='dateSetectContent' class="components-times-dateRangeChooseContent" style="display: none">
							<ul id="dateRangeTab" class="nav nav-tabs nav-underLine">
								<li class="active" style="width: 100px;"><a href="#tabsDate1" data-toggle="tab">快速选择</a></li>
								<li><a href="#tabsDate2" data-toggle="tab">自定义</a></li>
							</ul>
							<div class="tab-content">
								<div id="tabsDate1" class="tab-pane active" style="padding-bottom: 0;">
									<ul id="quickRange" class="components-times-quickRangeSelect">
										<li data-func="thisDay">当天</li>
										<li data-func="thisWeek">本周</li>
										<li data-func="thisMonth">本月</li>
										<li data-func="thisYear">今年</li>
										<li data-func="oneHour" data-value="3600">1小时</li>
										<li data-func="twelveHour" data-value="43200">12小时</li>
										<li data-func="oneDay" data-value="86400">1天</li>
										<li data-func="oneWeek" data-value="604800">1周</li>
										<li data-func="halfMonth">半月</li>
										<li data-func="oneMonth">1月</li>
										<li data-func="threeMonth">3月</li>
										<li data-func="allTime">全部时间</li>
									</ul>
								</div>
								<div id="tabsDate2" class="tab-pane" style="height: 355px;padding: 0;">
								</div>
							</div>
							<div class="components-times-dateRangeChooseBtn"><button type="button" id="dataRangeSetectBtn" class="confirmBtn">确定</button></div>
						</div>
					</div>
	        	</div>
	        	<div class="db-content-list">
	        		<div id="selectCate">可访问日志</div>
	        		<div class="selectCate-menu" id="selectCateMenu" style="display: none;">
						<div data-id="appSystem"><i class="fa fa-chevron-left"></i><span>应用对象</span></div>
						<div data-id="assetObject"><i class="fa fa-chevron-left"></i><span>资产对象</span></div>
					</div>
					<i class="fa fa-sort-down" id="selectCateDown"></i>
	        	</div>
	        </div>
            <div class="db-content-header">
                <p class="db-content-header-title" id="dashName"></p>
                <div class="db-content-header-btn">
                	<button type="button" style="display: none;" class="confirmBtn" id="backBtn"><i class="fa fa-backward"></i>&nbsp;&nbsp;返回</button>
                	<button type="button" style="display: none;" class="confirmBtn" id="addItem"><i class="fa fa-plus"></i>&nbsp;&nbsp;添加组件</button>
                	<button type="button" style="display: none;" class="confirmBtn" id="addFirstPage"><i class="fa fa-cloud-upload"></i>&nbsp;&nbsp;发布交易</button>
                	<button type="button" style="display: none;" class="confirmBtn" id="addCharts"><i class="fa fa-save"></i>&nbsp;&nbsp;保存仪表盘</button>
                	<button type="button" style="display: none;" class="confirmBtn" id="exportCharts"><i class="fa fa-edit"></i>&nbsp;&nbsp;编辑仪表盘</button>
                </div>
            </div>
            <div class="db-content-main" id="dataBoard">
            	
            </div>
        </div>
    </div>
</section>
<div class="showModal-editor" id="showEDitor">
	<div class="showModal-close" id="closeContent">x</div>
	<div class="showModal-content" id="showContent"></div>
</div>
<div class="selectCate-level2-show components-log-container" id="selectCateLevel2Show" style="display: none;">
	<div class="components-log-accessLogContent">
		<div id="appSystem"></div>
		<div id="assetObject"></div>
	</div>
</div>
<div id="modal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width:576px;">
    <div class="modal-header">
        <button class="close" type="button" data-dismiss="modal">×</button>
        <h3>添加图表</h3>
    </div>
    <div class="modal-body" style="padding-top: 0; overflow-y: hidden; max-height: none;overflow:visible">
        <div class="chartsModal-item">
           <div class="cm-item-header">选择图表类型</div>
           <div class="cm-item-content" style="display: flex;">
               <div class="cm-item-l" type="1">
                   <i class="fa fa-line-chart"></i>
                   <span>折线图</span>
               </div>
               <div class="cm-item-l" type="2">
                   <i class="fa fa-bar-chart"></i>
                   <span>柱状图</span>
               </div>
               <div class="cm-item-l" type="3">
                   <i class="fa fa-pie-chart"></i>
                   <span>饼状图</span>
               </div>
           </div>
        </div>
        <div class="chartsModal-item">
            <div class="cm-item-header">选择工作表</div>
            <div class="cm-item-content">
                <div class="cm-item-block">
                    <input type="search" placeholder="请输入查询信息" />
                    <span>32个</span>
                </div>
                <div class="cm-item-ul-box">
                    <ul class="cm-item-ul">
                       <%-- <li>
                            <div class="">
                                <i class="fa fa-file-text cm-icon-li-item"></i>
                                <span>总行数据中心员工在线登录数</span>
                            </div>
                            <div class="cm-radio selected"></div>
                            <div class="preViewImg">
                                <img src="" />
                            </div>
                        </li>
                        <li>
                            <div class="">
                                <i class="fa fa-file-text cm-icon-li-item"></i>
                                <span>总行数据中心员工在线登录数</span>
                            </div>
                            <div class="cm-radio"></div>
                        </li>--%>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
        <button type="button" data-dismiss="modal" class="confirmBtn" id="addItemCharts">完成</button>
    </div>
</div>

<div id="modal2" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 700px;">
    <div class="modal-header">
        <button class="close" type="button" data-dismiss="modal">×</button>
        <h3>新建仪表盘</h3>
    </div>
    <div class="modal-body">
        <form class="form-horizontal">
            <div class="control-group">
                <label for="sname" class="control-label required">名称</label>
                <div class="controls">
                    <input type="text" id="sname" placeholder="请输入名称" />
                    <span class="help-inline hide"></span>
                </div>
            </div>
           <!--  <div class="control-group">
                <label for="annotation" class="control-label">注释</label>
                <div class="controls">
                    <textarea id="annotation" placeholder=""></textarea>
                </div>
            </div> -->
        </form>
    </div>
    <div class="modal-footer">
        <button type="button" data-dismiss="modal" class="cancelBtn">取消</button>
        <button type="button" class="confirmBtn" id="addNewGroup">完成</button>
    </div>
</div>

<div id="bindAppModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="width: 600px;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">仪表盘关联应用系统</h3>
	</div>
	<div class="modal-body">
		<ul id="tabsUrl" class="nav nav-tabs nav-underLine">
			<li class="active"><a href="#tabsMdaol1" data-toggle="tab">发布交易（私有）</a></li>
			<li><a href="#tabsMdaol2" data-toggle="tab">关联应用（公有）</a></li>
		</ul>
		<div class="tab-content">
			<div id="tabsMdaol1" class="tab-pane active" style="padding:  20px;">
				发布的交易请在    <我的视图>       中查看
			</div>
			<div id="tabsMdaol2" class="tab-pane" style="padding: 20px;">
				<form class="form-horizontal">
					<div class="control-group">
						<label for="input1" class="control-label required">应用系统</label>
						<div class="controls">
							<div class="apps-wrap">
							</div>
						</div>
					</div>
					<div class="control-group hide">
						<label for="input1" class="control-label required">显示名称</label>
						<div class="controls">
							<input type="text" name="name" id="panel_name" style="width: 100%" />
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" class="confirmBtn">确定</button>
	</div>
</div>
<div id="eventModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="min-width: 40vw;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">事件配置</h3>
	</div>
	<div class="modal-body" id="eventList">
		<div class="add-list" id="addEventList"><i class="fa fa-plus"></i>&nbsp;&nbsp;添加事件</div>
		<div class="form-list event-config-item copy hide" id="copyItem">
			<div class="delete-event-item" title="删除事件配置">x</div>
			<form class="form-horizontal">
				<div class="control-group inline-block-3">
					<label class="control-label">事件触发方式</label>
					<div class="controls">
						<input type="radio" data-clicktype="0" name="eventType" checked />刷新&nbsp;&nbsp;&nbsp;&nbsp;
						<input type="radio" data-clicktype="1" name="eventType" />跳转
					</div>
				</div>
				<div class="control-group inline-block-3">
					<label class="control-label">事件源组件</label>
					<div class="controls">
						<select name="eventSourceComponent">
							<option></option>
						</select>
					</div>
				</div>
				<div class="control-group inline-block-3">
					<label class="control-label">事件触发动作</label>
					<div class="controls">
						<select name="eventAction">
							<option></option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label">事件源参数</label>
					<div class="controls">
						<select name="eventField">
							<option></option>
						</select>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label">事件目标参数</label>
					<div class="controls mulit-controls">
						<span class="mulit-controls-name">跳转交易</span>
						<select name="panelList">
							<option></option>
						</select>
					</div>
					<div class="controls mulit-controls">
						<span class="mulit-controls-name">影响组件</span>
						<select name="eventComponents">
							<option></option>
						</select>
					</div>
					<div class="controls mulit-controls">
						<span class="mulit-controls-name">组件字段</span>
						<select name="componentsField">
							<option></option>
						</select>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" data-dismiss="modal" class="confirmBtn">确认</button>
	</div>
</div>
<div id="intervalModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="min-width: 40vw;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">刷新频率配置</h3>
	</div>
	<div class="modal-body">
		<div class="form-list">
			<form class="form-horizontal">
				<div class="control-group inline-block">
					<label class="control-label">刷新频率（s）</label>
					<div class="controls">
						<input type="number" min="0" step="5" id="componentTimer" />
					</div>
				</div>
			</form>
		</div>
	</div>
	<div class="modal-footer">
		<button type="button" data-dismiss="modal" class="cancelBtn">关闭</button>
		<button type="button" data-dismiss="modal" class="confirmBtn">确认</button>
	</div>
</div>









