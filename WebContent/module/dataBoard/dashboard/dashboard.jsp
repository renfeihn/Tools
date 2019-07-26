<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
	.components-active{
		border: 1px solid #5b62f9;
	}
	.logSearchDetail-components-searchGroup{
	    display: flex;
	    align-items: center;
	    height: 40px;
	    position: relative;
	}
	.logSearchDetail-components-searchGroup>input {
		flex: auto;
	    height: 100%;
	}
	.logSearchDetail-components-searchGroup * {
		margin: initial !important;
	}
	.logSearchDetail-components-searchGroup>*{
		height: 100%;
	}
	
	.logSearchDetail-components-searchGroup>button {
		line-height: 35px;
	    height: 35px;
	    width: 100px;
	    margin-left: 10px !important;
	}
	.logSearchDetail-components-searchGroup>div {
		border: 1px solid #c7c6cc;
		background-color: #fff;
	}
	.logSearchDetail-components-searchGroup>div>input {
	    outline: none;
	    border: none;
	    width: 122px;
	    height: 100%;
	    border-radius: 0;
	}
	/*三级分类选择start*/
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent {
		position: relative;
	    color: #5c5a66;
	    z-index: 1;
	    font-size: 12px;
	    background-color: #fff;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>span{
	    width: 220px;
	    line-height: 38px;
	    display: block;
	    color: #5c5a66;
	    position: relative;
	    cursor: pointer;
	    padding: 0 60px 0 20px;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>span>i{
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
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div,
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>ul{
		display: none;
		background-color: #fff;
	    border: 1px solid #c7c6cc;
	    position: absolute;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>ul{
	    box-shadow: -1px 1px 2px #c7c6cc;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div {
		padding: 10px;
	    width: 600px;
	    left: 179px;
	    box-shadow: 1px 1px 2px #c7c6cc;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div>div:first-child {
		position: absolute;
	    right: 10px;
	    bottom: 10px;
	    z-index: 2;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div>div:first-child button.light {
	    background: #fff;
	    border-color: var(--color-theme);
	    color: var(--color-theme);
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div>div:first-child button.light:hover {
	    background: var(--color-theme);
	    color: #FFFFFF;
	    border-color: var(--color-theme);
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div>div:first-child button{
		cursor: pointer;
		width: 70px;
		height: 35px;
		margin-left: 10px !important;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div h5 {
	    font-weight: bold;
	    cursor: pointer;
	    width: auto;
	    display: inline-block;
	    line-height: 20px;
	    padding: 0 5px;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div h5:not(.active):not(.disabled):hover,
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div span:not(.active):not(.disabled):hover {
		text-decoration: underline;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div span.active,
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div h5.active {
		background-color: #e1e2f0;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div div>span {
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
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div:nth-child(3) h5.disabled,
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div:nth-child(3) div>span.disabled{
		cursor: default;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogList{
		border-bottom: 1px dashed #eee;
		margin-top: 10px !important;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogList:after{
		content: '';
		clear: both;
		display: block;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogList>div{
		/*margin-left: 150px !important;
	    min-height: 30px;
	    position: relative;
	    top: -20px;*/
	    display: inline-block;
	    min-height: 30px;
	    float: right;
	    width: calc(100% - 160px);
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogList>div>p{
		word-wrap: break-word;
	}
	
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>div p>span {
	    display: inline-block;
	    cursor: pointer;
	    padding: 0 5px;
	    margin: 0 5px 5px 5px !important;
	    line-height: 20px;
	    word-break: break-all;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>ul{
		width: 180px;
	    cursor: pointer;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>ul>li {
		padding: 0 5px;
		height: 50px;
	    line-height: 50px;
	    position: relative;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>ul>li.choosed:before {
	    content: '* ';
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>ul>li i {
	    position: absolute;
	    right: 5px;
	    top: 10px;
	    transform: translateY(10px);
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>ul>li.active {
		color: #505394;
	    background: #d7d8f0;
	}
	.logSearchDetail-components-container .logSearchDetail-components-accessLogContent>ul>li:hover{
		background: #ebedf4;
	}
	/*三级分类选择end*/
	/*日期选择*/
	.logSearchDetail-components-dateRangeChoose{
		position: relative;
	    color: #5c5a66;
	    z-index: 1;
	    font-size: 12px;
	    background-color: #fff;
	    border-left: none !important;
	    border-right: none !important;
	}
	.logSearchDetail-components-dateRangeChoose>span{
		width: 320px;
		height: 38px;
		line-height: 38px;
		display: block;
		color: #5c5a66;
		position: relative;
		cursor: pointer;
		padding: 0 60px 0 20px;
		text-align: center;
	}
	.logSearchDetail-components-dateRangeChoose:after{
		content: '';
		height: 100%;
	    width: 40px;
	    position: absolute;
	    right: 0;
	    top: 0;
	    border-left: 1px solid #c7c6cd;
	    background: #f9f9fb url(img/logSearch/time.jpg) no-repeat center center;
	}
	.logSearchDetail-components-dateRangeChooseContent{
		position: absolute;
		width: 616px;
		top: 40px;
		left: 0px;
		background-color: #fff;
		box-shadow: 0px 10px 31px rgba(0,0,0,0.2);
	}
	.logSearchDetail-components-dateRangeChooseContent a{
		box-sizing: content-box;
	}
	.logSearchDetail-components-dateRangeChooseBtn{
		height: 32px;
		padding: 0 20px;
		margin-bottom: 20px !important;
		display: none;
	}
	.logSearchDetail-components-dateRangeChooseBtn>button{
		float: right;
	}
	.logSearchDetail-components-quickRangeSelect{
		margin: 0;
		width: 100%;
		padding: 20px;
	}
	.logSearchDetail-components-quickRangeSelect>li{
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
	.logSearchDetail-components-quickRangeSelect>li:hover{
		border:1px solid var(--color-theme);
		color: var(--color-theme);
	}
	
	.logSearchDetail-components-quickRangeSelect>li.active{
		border:1px solid var(--color-theme);
	    background: var(--color-theme);
	    color: #fff;
	}
	
	.logSearchDetail-components-quickRangeSelect>li:nth-child(4n+4){
		margin-right: 0 !important;
	}
	/*日期选择end*/
	/*搜索输入*/
	.logSearchDetail-components-searchBtn{
		height: 38px;
	    width: 120px;
	    text-align: center;
	    line-height: 40px;
	    position: absolute;
	    top: 1px;
	    right: 1px;
	    font-size: 18px;
	    font-weight: normal;
	    background: var(--color-theme);
	    color: #fff;
	    cursor: pointer;
	}
	.logSearchDetail-components-searchBtn.searchBtn-first {
		right: 0;
	}
	.logSearchDetail-components-searchBtn:hover{
		/*background-color: #5266d7;*/
		background-color: #0070c0;
		color: #fff;
	}
	.logSearchDetail-components-searchInput{
		width: calc(100% - 141px);
		line-height: 38px;
		padding: 0 10px;
		font-size: 12px;
		font-weight: normal;
		height: 38px;
	    overflow-y: auto;
	    background-color: #fff;
	    word-break: break-all;
	    word-wrap: break-word;
	    white-space: pre-wrap;
	    position: relative;
	    z-index: 2;
	    border-left:1px solid #c7c6cb;
	    border-right:1px solid #c7c6cb;
	}
	.logSearchDetail-components-searchInput:focus{
		outline:none;
		height:auto;
		max-height: 200px;
		border-bottom:1px solid #c7c6cb;
	}
	/*搜索输入end*/
	/* 编辑器start */
	.dashboard-container{
		/* background-color: #191b2b;
    	color: #D5DFDB; */
    	height: 100%;
    	animation: zoomShow 0.5s 0.2s forwards;
	}
	@keyframes zoomShow {
		0% {
			transform: scale(0.9);
			opacity: 0;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
	.dashboard-container-bottom{
		height: calc(100% - 40px);
		display:  flex;
		flex-wrap: nowrap;
	}
	.dashboard-container-bottom>.dashboard-container-bottom-left{
		width: 180px;
		border-right: 1px solid #F1F0F5;
		flex: none;
	}
	.dashboard-container-bottom>.dashboard-container-bottom-center{
		width: 220px;
		border-right: 1px solid #F1F0F5;
		flex: none;
	}
	.dashboard-container-bottom>.dashboard-container-bottom-right{
		flex: auto;
		padding: 10px 15px;
		box-sizing: border-box;
	}
	.dashboard-title{
		height: 40px;
	    line-height: 40px;
	    margin: 0 15px;
	    font-weight: bold;
	}
	.dashboard-wrap{
		height: calc(100% - 40px);
	    margin: 0 15px;
	    border-bottom: 1px solid var(--borderColor);
	    overflow-y: auto;
	    user-select: none;
	}
	.dashboard-row-item-layout {
	    display: flex;
	    height: 24px;
	    align-items: center;
	}
	.dashboard-row-item-layout>i.fa {
		width: 16px;
	    flex: none;
	    line-height: 24px;
	    font-size: 14px;
	    text-align: center;
	    color: #688FD8;
	}
	.dashboard-single-button {
	    height: 20px;
	    line-height: 20px;
	    padding-left: 6px;
	    padding-right: 6px;
	    flex: 1;
	    cursor: pointer;
	}
	.dashboard-single-button:HOVER{
		background: #55A8FD;
		color:  #FFF;
	}
	.dashboard-single-button>span{
		position: relative;
	    display: inline-block;
	    width: 90px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.dashboard-chart-group {
	    height: 145px;
	    overflow: hidden auto;
	    margin-left: 5px;
	}
	.dashboard-chart-desc {
	    color: #d6e0dc;
	    height: 45px;
	    display: flex;
	    padding: 0 15px;
	    border-bottom: 1px solid #F1F0F5;
	}
	.dashboard-chart-group>.dashboard-chart {
	    width: 30px;
	    height: 30px;
	    text-align: center;
	    line-height: 1;
	    position: relative;
	    float: left;
	    margin-left: 10px;
	    margin-bottom: 8px;
	    border: 1px solid transparent;
	    box-sizing: border-box;
	    display: flex;
	}
	.dashboard-chart-icon {
	    margin: auto;
	    width: 24px;
	    height: 24px;
	}
	.dashboard-chart-group>.dashboard-chart:hover, .dashboard-chart-group>.dashboard-chart.active {
	    background: var(--borderColor);
	    border-radius: 2px;
	    border-color: #03A9F4;
	    box-shadow: 0 0 2px 1px #03A9F4;
	}
	.dashboard-chart-icon[data-type="detail_table"] {
	    display: block;
	    background: url(img/finebi/charttype/detail_table.png) center center no-repeat;
	    background-size: contain;
	}
	.dashboard-chart-icon[data-type="cross_table"] {
		display: block;
		background: url(img/finebi/charttype/cross_table.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="detail_table"] {
		display: block;
		background: url(img/finebi/charttype/detail_table.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="group_table"] {
		display: block;
		background: url(img/finebi/charttype/group_table.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="area_map_chart"] {
		display: block;
		background: url(img/finebi/charttype/area_map_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="bubble_chart"] {
		display: block;
		background: url(img/finebi/charttype/bubble_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="color_table_chart"] {
		display: block;
		background: url(img/finebi/charttype/color_table_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="combination_chart"] {
		display: block;
		background: url(img/finebi/charttype/combination_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="compare_column_chart"] {
		display: block;
		background: url(img/finebi/charttype/compare_column_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="funnel_chart"] {
		display: block;
		background: url(img/finebi/charttype/funnel_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="gauge_chart"] {
		display: block;
		background: url(img/finebi/charttype/gauge_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="heat_area_chart"] {
		display: block;
		background: url(img/finebi/charttype/heat_area_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="heat_map_chart"] {
		display: block;
		background: url(img/finebi/charttype/heat_map_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="kpi_card_chart"] {
		display: block;
		background: url(img/finebi/charttype/kpi_card_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="line_map_chart"] {
		display: block;
		background: url(img/finebi/charttype/line_map_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="mini_chart"] {
		display: block;
		background: url(img/finebi/charttype/mini_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="pie_chart"] {
		display: block;
		background: url(img/finebi/charttype/pie_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="point_chart"] {
		display: block;
		background: url(img/finebi/charttype/point_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="point_map_chart"] {
		display: block;
		background: url(img/finebi/charttype/point_map_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="radar_chart"] {
		display: block;
		background: url(img/finebi/charttype/radar_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="range_area_chart"] {
		display: block;
		background: url(img/finebi/charttype/range_area_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="rect_tree_chart"] {
		display: block;
		background: url(img/finebi/charttype/rect_tree_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="rose_chart"] {
		display: block;
		background: url(img/finebi/charttype/rose_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="series_column_chart"] {
		display: block;
		background: url(img/finebi/charttype/series_column_chart.png) center center no-repeat;
		background-size: contain;
	}
	
	.dashboard-chart-icon[data-type="series_line_chart"] {
		display: block;
		background: url(img/finebi/charttype/series_line_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="slice_column_chart"] {
		display: block;
		background: url(img/finebi/charttype/slice_column_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="slice_line_chart"] {
		display: block;
		background: url(img/finebi/charttype/slice_line_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="stack_column_chart"] {
		display: block;
		background: url(img/finebi/charttype/stack_column_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="water_fall_chart"] {
		display: block;
		background: url(img/finebi/charttype/water_fall_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="word_cloud_chart"] {
		display: block;
		background: url(img/finebi/charttype/word_cloud_chart.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="var"] {
		display: block;
		background: url(img/finebi/charttype/var.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="img"] {
		display: block;
		background: url(img/finebi/charttype/img.png) center center no-repeat;
		background-size: contain;
	}
	.dashboard-chart-icon[data-type="text"] {
		display: block;
		background: url(img/finebi/charttype/text.png) center center no-repeat;
		background-size: contain;
	}
	.style-contaienr{
		height: calc(100% - 230px);
	    color: #888;
	    text-align: center;
	    line-height: 110px;
	    font-size: 12px;
	    font-style: italic;
	    background: #F5F7FA;
	}
	.finebi-layout.tab {
    	grid-template-rows: minmax(38px, auto) 1fr;
	}
	.finebi-design>div {
	    position: absolute;
	}
	.finebi-layout {
	    left: 400px;
	    top: 0;
	    bottom: 0;
	    right: 0;
	    padding: 10px 15px;
	    display: grid;
	    grid-template-columns: 1fr 44px;
	    grid-template-rows: minmax(86px, auto) 1fr;
	    grid-gap: 10px;
	}
	.finebi-layout div.bi-dark-card {
	    background-color: var(--boxbg);
	    color: var(--fontColorNormal);
	    border: 1px solid transparent;
	    position: relative;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    flex-direction: column;
	}
	.axis-left {
	    display: inline-flex;
	    width: 60px;
	    max-width: 94px;
	    align-items: center;
	    height: 100%;
	    position: absolute;
	    top: 0;
	    bottom: 0;
	    left: 0;
	    background: linear-gradient(to bottom,#b5b0b0,#b5b0b0) no-repeat;
	    background-size: 1px 50%;
	    background-position: 100% 50%;
	}
	.axis-left>span {
	    margin-left: 10px;
	}
	.axis-drop-area {
	    display: flex;
	    flex-wrap: wrap;
	    align-items: center;
	    overflow: hidden auto;
	    position: absolute;
	    left: 60px;
	    top: 0;
	    bottom: 0;
	    right: 0;
	}
	.axis-drop-area .bi-tips {
	    height: 20px;
	    line-height: 20px;
	    padding-left: 10px;
	    margin-left: 15px;
	    white-space: nowrap;
	    overflow: hidden;
	    position: relative;
	    float: left;
	    margin-top: 2px;
	    margin-bottom: 2px;
	}
	.dashboard-container * {
		box-sizing: border-box;
	}
	.bi-dark-card.active{
		border: 1px solid #3684F1 !important;
	}
	.axis-drop-area>div.bi-single-button[data-type="dimension"] {
	    flex: 0 0 auto;
	    background-color: var(--fontbg1);
	    color: var(--fontColor1);
	}
	.axis-drop-area>div.bi-single-button[data-type="dimension"] {
    	flex: 0 0 auto;
    	background: rgba(104,143,216,.4);
	}
	.axis-drop-area>div.bi-single-button {
	    flex: none;
	    margin: 0 7px 2px;
	}
	.bi-single-button {
	    height: 20px;
	    line-height: 20px;
	    padding-left: 6px;
	    padding-right: 6px;
	    flex: 1;
	    cursor: pointer;
	}
	.bi-single-button>span {
	    position: relative;
	    display: inline-block;
	    width: 90px;
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	}
	.bi-single-button>i.fa {
	    float: right;
	    height: 20px;
	    line-height: 20px;
	    width: 20px;
	    cursor: pointer;
	    text-align: center;
	    opacity: 0;
	    font-size: 14px;
	}
	.bi-single-button:HOVER>i.fa{
		opacity: 1;
	}
	/* 操作菜单开始 */
	.bi-contextmenu-panel {
		position: fixed;
		padding: 5px 0;
		box-shadow: 0 1px 5px 0 rgba(25,27,43,.8);
	    background-color: var(--boxbg2);
	    color: var(--fontColorNormal);
	    border-radius: 2px;
	    z-index: 100000;
	}
	.bi-contextmenu-panel-level2{
	    position: absolute;
	    left: 130px;
	    top: 0;
	    box-shadow: 0 1px 5px 0 rgba(25,27,43,.8);
	    background-color: var(--boxbg2);
	    color: var(--fontColorNormal);
	    border-radius: 2px;
	    z-index: 100000;
	}
	.bi-contextmenu-panel-level2>.menu-item>.menu-icon {
		opacity: 0;
	}
	.bi-contextmenu-panel-level2>.menu-item.checked {
		color: #2196F3;
	}
	.bi-contextmenu-panel-level2>.menu-item.checked>.menu-icon {
		opacity: 1;
	    font-size: 12px;
	}
	.menu-item:hover {
		color: var(--hoverColor);
	    background-color: var(--hoverbg);
	}
	.menu-item {
		height: 24px;
		line-height: 24px;
		position: relative;
		cursor: pointer;
	    min-width: 130px;
	}
	
	.menu-item.checked>.menu-icon {
		color: #2196F3;
	}
	.menu-icon {
		text-align: center;
		display: inline-flex;
		float: left;
		width: 36px;
		height: 24px;
		align-items: center;
		justify-content: center;
		font-size: 14px;
	}
	.menu-text {
		height: 24px;
	    display: flex;
	    margin: 0 24px 0 36px;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	.menu-second-arrow {
		text-align: center;
		display: inline-flex;
		float: right;
		width: 24px;
		height: 24px;
		align-items: center;
		justify-content: center;
		font-size: 16px;
	}
	.menu-item:hover .bi-contextmenu-panel,
	.bi-contextmenu-panel .bi-contextmenu-panel:hover {
		display: block;
	}
	/* 操作菜单结束 */
	.table-preview>.var-style{
		width: 58%;
    	height: 58%;
   		margin: auto;
	}
	.table-preview>div{
		height: 100%;
	}
	.table-preview>.card-style{
		height: 100%;
		width:  100%;
		margin: auto;
    	background: #FFF;
	}
	/* 卡片推拽开始 */
	.card-list{
		margin: 0;
	    display: flex;
	    flex-wrap: wrap;
	    padding: 10px;
	}
	.card-list .card-item{
		width: 50px;
	    height: 50px;
	    line-height: 50px;
	    text-align: center;
	    margin: 0 10px 10px 0;
	    font-size: 12px;
	    border-radius: 2px;
	}
	.card-list .card-item[data-type='themeCard'] {
		background: var(--color_主题);
    	color: #FFF;
	}
	.card-list .card-item[data-type='normalCard'] {
		background: var(--color_非主题);
    	color: #000;
	}
	/* 卡片推拽结束 */
	.active-select{
		border: 2px solid #863314;
	}
	.bi-tabs {
	height: 40px;
	display: flex;
}
.bi-tabs-button.active {
	cursor: default;
    color: #3685f2;
    background: transparent;
}
.bi-tabs-button {
	height: 40px;
	line-height: 40px;
	text-align: center;
	cursor: pointer;
	color: var(--fontColorNormal);
	background: none;
	width: 50%;
	font-weight: bold;
}
.bi-tabs-content>div {
	display: none;
}
.bi-tabs-content {
	height: calc(100% - 40px);
    border-top: 1px solid transparent;
    overflow: hidden auto;
}
.bi-tabs-content>div.active {
	display: block;
}
.bi-fake-select:hover {
	border-color: #3685f2;
}
.bi-fake-select {
	border: 1px solid #3a3c53;
	position: relative;
	border-radius: 2px;
	height: 24px;
	margin: 8px auto 0px;
	width: 190px;
	box-sizing: border-box;
}
.bi-select-value>div {
	flex: 1;
	height: 22px;
	line-height: 22px;
}
.bi-select-value>.fa:first-child {
	width: 34px;
}
.bi-select-value>.fa {
	width: 22px;
	height: 22px;
	text-align: center;
	line-height: 22px;
	font-size: 14px;
}
.bi-select-value {
	height: 22px;
	display: flex;
	align-items: center;
	cursor: pointer;
}
.bi-fake-options {
    overflow: hidden auto;
    min-height: 24px;
    position: absolute;
    max-height: 298px;
    box-shadow: 0 1px 5px 0 rgba(25,27,43,.8);
    background-color: #242640;
    border-radius: 2px;
    padding: 5px 0;
    width: 190px;
    left: -1px;
    top: 26px;
    z-index: 10;
}
.bi-select-option>.fa {
	width: 34px;
	height: 24px;
	text-align: center;
	line-height: 24px;
	font-size: 14px;
}
.bi-select-option>div {
	flex: 1;
}
.bi-select-option:hover {
	color: #fff;
    background-color: rgba(255,255,255,.05);
}
.bi-select-option:active,
.bi-select-option.active {
	color: #3685f2;
    background-color: rgba(255,255,255,.05);
}
.bi-select-option {
	display: flex;
	height: 24px;
	line-height: 24px;
	cursor: pointer;
}
.bi-combo:hover {
	border-color: #3685f2;
}
.bi-combo {
	height: 34px;
	position: relative;
	width: 190px;
	margin: 8px auto;
    background-color: var(--boxbg);
    color: var(--fontColorNormal);
    border: 1px solid transparent;
    cursor: pointer;
}
.bi-combo-title {
	width: 40px;
    max-width: 40px;
	height: 20px;
    line-height: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0 auto 10px;
    white-space: nowrap;
    overflow: hidden;
}
.bi-combo-drop-group {
	position: absolute;
	height: 100%;
	left: 50px;
	right: 0;
}
.bi-combo-drop-group>.bi-single-button {
	width: 130px;
    margin: 6px 0 0 2px;
}
.bi-combo-drop-group>.bi-single-button[data-type="dimension"] {
	background-color: var(--fontbg1);
}
.bi-combo-drop-group>.bi-single-button[data-type="index"] {
	background-color: var(--fontbg2);
}
.bi-property-item {
	position: relative;
}
.componet-property .fa.fa-check-square {
	color: #3685f2;
    background-image: linear-gradient(to bottom, #fff 0%, #fff 100%);
    background-size: 12px 12px;
    background-repeat: no-repeat;
    background-position: center;
}
.componet-property .fa.fa-square-o {
	color: #9ea6b2;
	background: none;
}
.bi-show-setting>.fa {
	margin-left: 5px;
}
.bi-expander>.fa,
.bi-show-setting>.fa {
	width: 16px;
	height: 16px;
	text-align: center;
	line-height: 16px;
	font-size: 16px;
	cursor: pointer;
	color: #d5d6e0;
}
.bi-expander>.fa {
	font-size: 19px;
	margin-right: 5px;
}
.bi-show-setting {
	float: right;
}
.bi-expander,
.bi-show-setting {
	line-height: 30px;
	height: 30px;
	display: flex;
	align-items: center;
}
.bi-property-item:not(:last-child):after {
	content: '';
	height: 1px;
	background-color: var(--borderColor);
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 0;
}
.bi-expander-popup {
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
}
.bi-expander-popup-item {
    position: relative;
    margin: 10px 15px;
    display: flex;
    align-items: flex-start;
}
.bi-popup-label {
	width: 40px;
	line-height: 17px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.bi-popup-control>textarea {
	height: 65px;
	resize: none;
	width: 100%;
	border: 1px solid var(--borderColor);
    background: none!important;
    color: var(--fontColorNormal)!important;
    padding: 2px 10px;
    display: block;
}
.bi-expander-bar {
	padding: 0 15px;
	cursor: pointer;
}

.finebi-layout div.bi-dark-card {
	background-color: var(--boxbg);
    color: var(--fontColorNormal);
    border: 1px solid transparent;
    position: relative;
}
#dataSave {
	cursor: pointer;
}
#dataSave:hover {
	background: #3685f2;
    color: #FFF;
}
.axis-left>span {
	margin-left: 10px;
}
.axis-left {
	display: inline-flex;
    width: 60px;
    max-width: 94px;
    align-items: center;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
	left: 0;
	background: linear-gradient(to bottom,#b5b0b0,#b5b0b0) no-repeat;
    background-size: 1px 50%;
    background-position: 100% 50%;
}
.axis-drop-area .bi-tips {
	height: 20px;
    line-height: 20px;
    padding-left: 10px;
    margin-left: 15px;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    float: left;
    margin-top: 2px;
    margin-bottom: 2px;
}
.axis-drop-area {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	overflow: hidden auto;
	position: absolute;
    left: 60px;
    top: 0;
    bottom: 0;
    right: 0;
}
.axis-drop-area>div.bi-single-button {
	flex: none;
	margin: 0 7px 2px;
}
.axis-drop-area>div.bi-single-button[data-type="index"] {
    flex: 0 0 auto;
	background-color: var(--fontbg2);
	color: var(--fontColor2);
}
.axis-drop-area>div.bi-single-button[data-type="dimension"] {
    flex: 0 0 auto;
	background-color: var(--fontbg1);
	color: var(--fontColor1);
}
.finebi-close-btn {
	position: absolute;
    z-index: 10;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    width: 40px;
    height: 40px;
    left: 100%;
    text-align: center;
    line-height: 37px;
	background-color: var(--modelbg);
    color: var(--fontColorNormal);
}
.finebi-close-btn:hover {
	color: var(--hoverColor);
	background: var(--hoverbg);
}
.drag-tooltip,.drag-tip {
	display: inline-block;
	width: 85%;
	height: 95%;
	vertical-align: middle;
}
.componet-property input[type="text"],
.componet-property input[type="number"],
.componet-property select {
	float: right;
	width: 120px;
    height: 24px;
    border: solid 1px var(--borderColor);
    border-radius: 2px;
    background: transparent;
    outline: none!important;
	margin-left: 4px;	
	text-align: right;
}
input[type="range"] {
	display: inline-block;
    margin-top: 9px;
    background-color: #eee;
    border-radius: 15px;
    background: -webkit-linear-gradient(#3685f2, #3685f2) no-repeat, #ddd;  
    background-size: 0% 100%;
    width: 400px;
    -webkit-appearance: none;
    height: 2px;
}
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    cursor: default;
    top: -5px;
    height: 15px;
    width: 15px;
    background: none repeat scroll 0 0 #fff;
    border-radius: 50%;
    box-shadow: 0 -1px 1px black inset;
}
.bi-expander-popup-item>div {
	width: 100%;
}
#dataSave {
    display: flex;
    flex-direction: column;
    justify-content: center;	
}
.modal-wrap {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 410;
	background: rgba(25,27,43,.8);
}
.modal-position {
	bottom: 0;
    position: absolute !important;
    top: auto;
    left: auto;
    width: 100%;
    height: 50px;
    background: transparent;
}
.modal-wrap>div {
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 103;
	width: 900px;
	height: 500px;
    background-color: var(--boxbg);
    color: var(--fontColorNormal);
	transform: translate(-50%,-50%);
    padding: 20px;
    box-sizing: border-box;
    font-size: 12px;
}
/* colorpicker */
.color-picker-container {
  display: inline-block;
  background: #5d5f60 none repeat scroll 0% 0%;
  border-radius: 4px;
  border: 2px solid #f8fafb;
}
.color-picker-container .picker-container .canvas-container {
  margin: 20px;
  position: relative;
  float: left;
  width: 200px;
  display: inline-block;
  background: #5D5F60;
}
.color-picker-container .picker-container .canvas-container.active {
  display: block;
}
.color-picker-container .picker-container .canvas-container canvas {
  cursor: crosshair;
  border-radius: 50%;
  box-shadow: 0 0 0 4px #E8E8E8;
  background: #E6D3D3;
}
.color-picker-container .picker-container .canvas-container .pointer {
  width: 15px;
  height: 15px;
  border: 2px solid #fff;
  border-radius: 50%;
  position: absolute;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.1);
}
.color-picker-container .picker-container .canvas-container input {
  margin-top: 10px;
  width: 100%;
  height: 30px;
  text-align: center;
  background: #353738;
  border: 0;
  color: #fff;
}
.color-picker-container .picker-container .slider-container {
  width: 15px;
  float: right;
  position: relative;
  margin: 15px;
}
.color-picker-container .picker-container .slider-container .slider {
  width: 15px;
  height: 249px;
  background: #000;
}
.color-picker-container .picker-container .slider-container .pointer {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 10px;
  border-color: transparent transparent transparent #007bff;
  position: absolute;
  left: -8px;
}
.color-picker-container .palletes-container {
  width: 275px;
}
.color-picker-container .palletes-container .palette {
  width: 35px;
  height: 35px;
  display: inline-block;
  border-radius: 4px;
  margin: 5px;
  box-shadow: inset 0px 2px 1px rgba(0, 0, 0, 0.28);
  cursor: pointer;
}
.color-picker-container .palletes-container .palette.active {
  box-shadow: 0 0 0 3px #3F3F40;
}
.color-picker-container .palletes-container .palette.add {
  border: 2px dashed #bababa;
  box-shadow: inherit;
  position: relative;
}
.color-picker-container .palletes-container .palette.add:after {
  content: '+';
  font-size: 24px;
  color: #bababa;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  text-align: center;
  line-height: 30px;
}
.colorpicker-btns-wrap {
  text-align: right;
  padding: 10px 15px;
}
.colorpicker-btns-wrap>div{
    display: inline-block;
    width: 60px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    background: #40436d;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
    margin-left: 15px;
    cursor:  pointer;
}
#agreeColorPicker {
	z-index: 100000;
}
/* colorpicker */
</style>
<!-- 文本弹窗 -->
<div id="textNameModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="min-width: 40vw;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">文字信息</h3>
	</div>
	<div class="modal-body">
		<div class="form-list">
			<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label">字段名称</label>
					<div class="controls">
						<input type="text" id="textItem" />
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
<!-- 重命名弹窗 -->
<div id="reNameModal" class="modal hide fade" data-backdrop="false" aria-hidden="true" tabindex="-1" style="min-width: 40vw;">
	<div class="modal-header">
		<button class="close" type="button" data-dismiss="modal">×</button>
		<h3 id="myModalLabel">字段重命名</h3>
	</div>
	<div class="modal-body">
		<div class="form-list">
			<form class="form-horizontal">
				<div class="control-group">
					<label class="control-label">字段名称</label>
					<div class="controls">
						<input type="text" id="renameItem" />
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
<!-- 重命名弹窗 -->
<!-- 弹窗 之 三角弹窗 -->
<div class="bi-contextmenu-panel" id="showOperate" style="display: none;">
	<div class="menu-item" data-type="rename">
		<div class="menu-icon"><i class="fa fa-edit"></i></div>
		<div class="menu-second-arrow fa fa-angle-right hide"></div><!-- 二级菜单 -->
		<div class="menu-text">重命名</div>
	</div>
	<!-- <div class="menu-item" data-type="format">
		<div class="menu-icon"><i class="fa fa-cogs"></i></div>
		<div class="menu-second-arrow fa fa-angle-right hide"></div>二级菜单
		<div class="menu-text">数据格式化</div>
	</div> -->
	<div class="menu-item" data-type="delete">
		<div class="menu-icon"><i class="fa fa-trash-o"></i></div>
		<div class="menu-second-arrow fa fa-angle-right hide"></div><!-- 二级菜单 -->
		<div class="menu-text">删除</div>
	</div>
</div>
<!-- 弹窗 之 三角弹窗 -->
<!-- 弹窗相关 -->
<div class="dashboard-container logSearchDetail-components-container">
	<div class="logSearchDetail-components-searchGroup">
		<div id='dateSetectWarp' class="logSearchDetail-components-dateRangeChoose">
			<input type="text" id="dateSetectInput" style="display: none;">
			<span id="dateSetect"></span>
			<div id='dateSetectContent' class="logSearchDetail-components-dateRangeChooseContent" style="display: none">
				<ul id="dateRangeTab" class="nav nav-tabs nav-underLine">
					<li class="active" style="width: 88px;"><a href="#tabsDate11" data-toggle="tab">快速选择</a></li>
					<li><a href="#tabsDate22" data-toggle="tab">自定义</a></li>
				</ul>
				<div class="tab-content">
					<div id="tabsDate11" class="tab-pane active" style="padding-bottom: 0;">
						<ul id="quickRange" class="logSearchDetail-components-quickRangeSelect">
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
					<div id="tabsDate22" class="tab-pane" style="height: 355px;">
					</div>
				</div>
				<div class="logSearchDetail-components-dateRangeChooseBtn"><button type="button" id="dataRangeSetectBtn" class="confirmBtn">确定</button></div>
			</div>
		</div>
		<div style="flex: auto;position: relative;border-left: none;">
			<div id="searchInput" contenteditable="plaintext-only" style="" class="logSearchDetail-components-searchInput" tabindex="1-1">* | select * from applog-* limit 10</div>
		</div>
		<span class="logSearchDetail-components-searchBtn searchBtn-first" id="searchBtn"><span>运行</span></span>
	</div>
	<div class="dashboard-container-bottom">
		<div class="dashboard-container-bottom-left">
			<div class="dashboard-title">KPI数据</div>
			<div class="dashboard-wrap" id="fieldList">
				<!-- <div class="dashboard-row-item-layout">
					<i class="fa fa-text-width"></i>
					<div class="dashboard-single-button">
						<span>描述</span>
					</div>
				</div>
				<div class="dashboard-row-item-layout">
					<i class="fa fa-text-width"></i>
					<div class="dashboard-single-button">
						<span>描述</span>
					</div>
				</div>
				<div class="dashboard-row-item-layout">
					<i class="fa fa-text-width"></i>
					<div class="dashboard-single-button">
						<span>描述</span>
					</div>
				</div>
				<div class="dashboard-row-item-layout">
					<i class="fa fa-text-width"></i>
					<div class="dashboard-single-button">
						<span>描述</span>
					</div>
				</div> -->
			</div>
		</div>
		<div class="dashboard-container-bottom-center">
			<div style="height: 230px;">
				<div class="dashboard-title">图表类型</div>
				<div class="dashboard-chart-group" id="dashboardChartGroup">
					<div class="dashboard-chart hide" data-chartstype="1" data-category="table" data-type="detailTab" title="明细表" data-need="1,1+" data-desc="需要至少1个字段"><i class="dashboard-chart-icon" data-type="detail_table"></i></div>
					<div class="dashboard-chart" data-chartstype="6" data-category="echarts" data-type="combination" title="组合图" data-need="1,2+" data-desc="需要1个维度,至少2个指标"><i class="dashboard-chart-icon" data-type="combination_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="3" data-category="echarts" data-type="pie" title="饼图" data-need="1,1" data-desc="需要1个维度,1个指标"><i class="dashboard-chart-icon" data-type="pie_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="4" data-category="echarts" data-type="scatter" title="散点图" data-need="1,1+" data-desc="需要1个维度,至少1个指标"><i class="dashboard-chart-icon" data-type="point_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="8" data-category="echarts" data-type="radar" title="雷达图" data-need="1,1+" data-desc="需要1个维度,至少1个指标"><i class="dashboard-chart-icon" data-type="radar_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="5" data-category="echarts" data-type="line-area" title="面积图" data-need="1,1+" data-desc="需要1个维度,至少1个指标"><i class="dashboard-chart-icon" data-type="range_area_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="9" data-category="echarts" data-type="seriesBarHtl" title="横向柱状图" data-need="1,1+" data-desc="需要1个维度,至少1个指标"><i style="transform: rotate(90deg);" class="dashboard-chart-icon" data-type="series_column_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="10" data-category="echarts" data-type="rose" title="玫瑰图" data-need="1,1" data-desc="需要1个维度,1个指标"><i class="dashboard-chart-icon" data-type="rose_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="2" data-category="echarts" data-type="seriesBar" title="多系列柱状图" data-need="1,2+" data-desc="需要1个维度,至少2个指标"><i class="dashboard-chart-icon" data-type="series_column_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="1" data-category="echarts" data-type="seriesLine" title="多系列折线图" data-need="1,2+" data-desc="需要1个维度,至少2个指标"><i class="dashboard-chart-icon" data-type="series_line_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="11" data-category="echarts" data-type="pileBar" title="堆叠柱状图" data-need="1,2+" data-desc="需要1个维度,至少2个指标"><i class="dashboard-chart-icon" data-type="stack_column_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="12" data-category="echarts" data-type="funnel" title="漏斗图" data-need="1,1" data-desc="需要1个维度,1个指标"><i class="dashboard-chart-icon" data-type="funnel_chart"></i></div>
					<div class="dashboard-chart" data-chartstype="img" data-category="card" data-type="pileBar" title="图片" data-need="1,2+" data-desc="需要1个字段"><i class="dashboard-chart-icon" data-type="img"></i></div>
					<div class="dashboard-chart" data-chartstype="var" data-category="card" data-type="pileBar" title="变量" data-need="1,2+" data-desc="需要1个字段"><i class="dashboard-chart-icon" data-type="var"></i></div>
					<div class="dashboard-chart" data-chartstype="text" data-category="card" data-type="pileBar" title="文字" data-need="1,2+" data-desc="需要1个字段"><i class="dashboard-chart-icon" data-type="text"></i></div>
				</div>
				<div class="dashboard-chart-desc">
					<span class="default-tips">智能推荐,需要至少1个字段</span>
					<span class="specific-tips hide"></span>
				</div>
			</div>
			<div style="height: calc(100% - 230px);" id="styleCard">
				<div class="bi-tabs">
					<div class="bi-tabs-button active property-chart">图形样式</div>
				</div>
				<div class="bi-tabs-content">
					<div id="tabs1" class="componet-property active">
						<div class="bi-property-item">
							<div class="bi-expander-bar">
								<div class="bi-expander">
									<i class="fa fa-angle-right"></i>
									<span>字体</span>
								</div>
							</div>
							<div class="bi-expander-popup hide">
								<div class="bi-expander-popup-item">
									<div class="bi-popup-label" style="width:85px;">内容</div>
									<div class="bi-popup-control">
										<textarea data-name="InnerText" data-category="text" data-trigger="keyup">未命名</textarea>
									</div>
								</div>
								<div class="bi-expander-popup-item">
									<div>大小
										<input type="number" value="14" step="2" min="14" max="80" data-name="fontSize" data-trigger="change" class="range-btn"  data-category="text" />
										<span class="range-val"></span>
										<div></div>
									</div>
								</div>
								<div class="bi-expander-popup-item">
									<div>颜色
										<input type="text" class="colorPicker textColor" data-name="color" data-trigger="change"  data-category="text">
										<div></div>
									</div>
								</div>
								<div class="bi-expander-popup-item">
									<div>排版方式
										<select class="bi-expander-select" data-name="writingMode" data-trigger="change" data-category="text">
											<option value="horizontal-tb">横排</option>
											<option value="vertical-rl">竖排</option>
										</select>
									</div>
								</div>
							</div>
						</div>
						<div class="bi-property-item">
							<div class="bi-expander-bar">
								<div class="bi-expander">
									<i class="fa fa-angle-right"></i>
									<span>背景</span>
								</div>
							</div>
							<div class="bi-expander-popup hide">
								<div class="bi-expander-popup-item">
									<div>颜色
										<input type="text" class="colorPicker backColor" data-trigger="change" data-name="backgroundColor"  data-category="text">
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="dashboard-container-bottom-right finebi-layout" id="otherContent">
			<div style="grid-area: 1 / 1 / 2 / 2;display: flex;flex-direction: column;justify-content: space-between;" id="fieldContent">
				<div class="bi-dark-card bi-card-x" style="min-height: 38px;max-height: 84px;" data-type="echarts">
					<div class="axis-left">
						<span>维度</span>
					</div>
					<div class="axis-drop-area xAxis" id="xAxisDragBox">
						<div class="bi-tips xAxis">请拖入左侧字段</div>
					</div>
				</div>
				<div class="bi-dark-card bi-card-y" style="min-height: 38px;max-height: 84px;" data-type="echarts">
					<div class="axis-left">
						<span>指标</span>
					</div>
					<div class="axis-drop-area yAxis" id="yAxisDragBox">
						<div class="bi-tips yAxis">请拖入左侧字段</div>
					</div>
				</div>
				<div class="bi-dark-card bi-card-table" style="min-height: 50px;max-height: 84px;"  data-type="table">
					<div class="axis-left">
						<span>指标</span>
					</div>
					<div class="axis-drop-area yAxis" id="tableDragBox">
						<div class="bi-tips table">请拖入左侧字段</div>
					</div>
				</div>
				<div class="bi-dark-card bi-card-table" style="min-height: 50px;max-height: 84px;"  data-type="card">
					<div class="axis-left">
						<span>指标</span>
					</div>
					<div class="axis-drop-area yAxis" id="varDragBox">
						<div class="bi-tips table">请拖入左侧字段</div>
					</div>
				</div>
			</div>
			<div class="bi-dark-card" style="grid-area: 1 / 2 / 2 / 3;" id="saveModal">
				<div class="text-center" style="margin-bottom: 5px;">
					<i class="fa fa-save" style="font-size: 14px;"></i>
				</div>
				<div style="width: 2em;margin: 0 auto;">保存</div>
			</div>
			<div class="bi-dark-card preview-wrap" style="grid-area: 2 / 1 / 3 / 3;">
				<div class="echarts-preview" id="echartsView" style="width: 100%;height: 100%;display: none;"></div>
				<div class="table-preview" id="tablesView" style="width: 100%;height: 100%;display: none;">
					<table class="display dataTable table no-footer" id="preview_datatable">
					</table>
				</div>
				<div class="table-preview" id="cardView" style="width: 100%;height: 100%;display: none;">
					<div class="card-style" id="cardXy"></div>
				</div>
				<div class="table-preview" id="componentView" style="width: 100%;height: 100%;"></div>
			</div>
		</div>
	</div>
</div>
