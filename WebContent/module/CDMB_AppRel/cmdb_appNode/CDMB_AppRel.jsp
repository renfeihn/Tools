<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page session="false" pageEncoding="utf-8"%>
<style>
.appnode-page {
    position: relative;
	height: calc(100vh - 123px);
}
.svg-wrap {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.size-zoom-topo {
    position: absolute;
    bottom: 40px;
    right: 40px;
    width: 35px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #FEFEFC;
    text-align: center;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
    color: #A4ABB5;
}
.size-zoom-topo>i {
    cursor: pointer;
    height: 35px;
    line-height: 35px;
    border: 1px solid #E5E5E5;
    width: 100%;
}


.dash {
    stroke-dasharray: 5;
    stroke-dashoffset: 1000;
}
.slow{
    stroke-dasharray: 5;
    stroke-dashoffset: 1000;
}
.edge path{
    stroke: royalblue;
}
.edge polygon{
    stroke: royalblue;
    fill: royalblue;
}
.pulse{
    animation: pulse 2s linear infinite;
    -ms-transform-origin:50% 50%;
}
@keyframes pulse
{
    /*0% {
        -ms-transform: scale(1, 1);
    }
    50% {
        -ms-transform: scale(1.2, 1.2);
    }*/
    100% {
        opacity: 0;
       /* -ms-transform: scale(1.5, 1.5);*/
    }
}
.btn-refresh {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}
</style>
<div class="appnode-page">
    <button class="btn-refresh">刷新</button>
	<div class="svg-wrap"></div>
	<div class="size-zoom-topo">
		<i class="fa fa-refresh" title="刷新" data-id="12"></i>
		<i class="fa fa-plus" title="放大" data-id="3"></i>
		<i class="fa fa-minus" title="放大" data-id="4"></i>
	</div>
</div>