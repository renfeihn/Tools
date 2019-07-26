<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.add-strategy {
    display: flex;
    overflow: hidden;
}
.strategy-nav {
    flex: none;
    width: 200px;
    margin: 0;
    border-right: solid 1px #dcdcdc;
    box-shadow: 1px 0 10px 2px #dbe0e4;
}
.strategy-nav>li {
    height: 40px;
    line-height: 40px;
    text-indent: 70px;
    cursor: pointer;
}
.strategy-nav>li [data-href] {
    color: #838588;
    text-decoration: none;
}
.strategy-nav>li.active {
    background: #e8e8ec;
}
.strategy-nav>li.active [data-href] {
    color: #5b62f9;
}
.strategy-content {
    flex: auto;
    height: calc(100vh - 80px);
    overflow: hidden auto;
    padding: 20px;
}
.strategy-item {
    min-height: 100px;
}
.strategy-content>.strategy-item:last-child {
    margin-bottom: 0;
}
.add-strategy .select-btns {
    display: flex;  
}
.add-strategy .select-btns>span {
    padding: 0 10px 0 10px;
    border: 1px solid #c7c6cc;
    background-color: #f9f9fb;
    color: #5c5a66;
    height: 24px;
    line-height: 22px;
    transition: all 0.2s;
    box-sizing: border-box;
    cursor: pointer;
}
.add-strategy .select-btns>span.active {
    border: 1px solid #5b62f9;
    background-color: #8086ff;
    color: #FFF;
}
.add-strategy .control-label {
    width: 100px;
}
.add-strategy .controls {
    margin-left: 110px;
}
.add-strategy .strategy-content input[type="text"],
.add-strategy .strategy-content select {
    width: 50%;
    height: 30px;
}
/* 日期选择
 */
.date-select {
    display: flex;
}
.date-select>span {
    padding: 0px 6px;
    background: #f5f6f7;
    border: solid 1px #ced0d2;
    margin-right: 10px;
    font-size: 12px;
    cursor: pointer;
}
.date-select>span.active {
    border: 1px solid #5b62f9;
    background-color: #8086ff;
    color: #FFF;
}
/* 日期选择
 */

/* 
通知 */
.notice-wrap {

}
.notice-item {
    display: flex;
    margin-bottom: 10px;
}
.notice-item>span {
    border: solid 1px #cccdce;
    background: #f3f4f5;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}
.notice-item>span.active {
    color: #5b62f9;
    border-color: #5b62f9;
}
.notice-item>span>i {
    margin-right: 6px;    
    color: #435a6f;
}
.notice-item>span.active>i {
    color: #5b62f9;
}

.notice-item>p {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
}
.notice-item>p>span {
    border: solid 1px #c5c5c5;
    background: #f4f5f7;
    line-height: 30px;
    margin: 0 5px 5px;
    padding: 0 6px;
}
.notice-item>p>span.addone {
    cursor: pointer;
}
.notice-item>p>span.user-item {
    position: relative;
}
.notice-item>p>span.user-item i.fa{
    margin-left: 4px;
}
/* 
通知 */

</style>

<div class="add-strategy">
    <ul class="strategy-nav">
        <li class="active"><span data-href="strategy_define">策略定义</span></li>
        <li><span data-href="strategy_trigger">策略触发</span></li>
        <li><span data-href="strategy_alarm">策略报警</span></li>
        <li><span data-href="strategy_upgrade">策略升级</span></li>
        <li><span data-href="strategy_excute">策略执行</span></li>
        <li><span data-href="strategy_silent">策略静默期</span></li>
        <li><span data-href="strategy_remove">策略解除</span></li>
        <li><span data-href="strategy_notice">策略通知</span></li>
        <li><span data-href="strategy_model">通知模版</span></li>
    </ul>
    <div class="strategy-content">
        <section class="panel strategy-item" id="strategy_define">
            <p class="title">策略定义</p>
            <div class="content" style="overflow: hidden;">
                <form class="form-horizontal">
                    <div class="control-group">
                        <label for="input1" class="control-label required">策略名称</label>
                        <div class="controls">
                            <input type="text" id="input1" placeholder="" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="input1" class="control-label required">报警方式</label>
                        <div class="controls">
                            <span class="select-btns">
                                <span class="active">通知</span><span>预警</span><span>告警</span>
                            </span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="input1" class="control-label required">策略状态</label>
                        <div class="controls">
                            <span class="boolean-switch false"></span>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <section class="panel strategy-item" id="strategy_trigger">
            <p class="title">策略触发</p>
            <div class="content" style="overflow: hidden;">
                <form class="form-horizontal">
                    <div class="control-group">
                        <label for="input1" class="control-label required">策略类型</label>
                        <div class="controls">
                            <span class="select-btns">
                                <span class="active">日志预警</span><span>关键字预警</span><span>自监控预警</span>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <section class="panel strategy-item" id="strategy_alarm">
            <p class="title">策略报警</p>
            <div class="content" style="overflow: hidden;">
                <form class="form-horizontal">
                    <div class="control-group">
                        <label for="input1" class="control-label required">报警类型</label>
                        <div class="controls">
                            <span class="select-btns" data-role="strategy_alarm">
                                <span class="active" data-id="none">无</span><span data-id="time">持续时间</span><span data-id="times">持续次数</span><span data-id="once">一次触发</span>
                            </span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="input1" class="control-label required" id="continue_text">连续触发时间</label>
                        <div class="controls">
                            <span class="select-btns">
                                <input type="text" id="continue_time">
                            </span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="input1" class="control-label required">报警级别</label>
                        <div class="controls">
                            <span class="select-btns" data-role="alert_level">
                                <span class="active">1级</span><span>2级</span><span>3级</span><span>4级</span><span>5级</span>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <section class="panel strategy-item" id="strategy_upgrade">
            <p class="title">策略升级</p>
            <div class="content" style="overflow: hidden;">
                <form class="form-horizontal">
                    <div class="control-group">
                        <label for="input1" class="control-label required">升级方式</label>
                        <div class="controls">
                            <span class="select-btns">
                                <span class="active">无</span><span>按次数升级</span><span>按时间升级</span>
                            </span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="input1" class="control-label required">升级后级别</label>
                        <div class="controls">
                            <span class="select-btns">
                                <span class="active">2级</span><span>3级</span><span>4级</span><span>5级</span>
                            </span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="input1" class="control-label required">升级后通知</label>
                        <div class="controls">
                            
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <section class="panel strategy-item" id="strategy_excute">
            <p class="title">策略执行</p>
            <div class="content" style="overflow: hidden;">
                <form class="form-horizontal">
                    <div class="control-group">
                        <label for="input1" class="control-label">计划周期</label>
                        <div class="controls">
                            <span class="select-btns" data-role="plan_circle">
                                <span class="active" data-id="minute">每分钟</span><span data-id="hour">每小时</span><span data-id="day">每天</span><span data-id="week">每周</span><span data-id="month">每月</span>
                            </span>
                        </div>
                    </div>
                    <div class="circle-wrap">

                    </div>
                </form>
            </div>
        </section>
        <section class="panel strategy-item" id="strategy_silent">
            <p class="title">策略静默期</p>
            <div class="content" style="overflow: hidden;">
                <form class="form-horizontal">
                    <div class="control-group">
                        <label for="input1" class="control-label required">时间类型</label>
                        <div class="controls">
                            <span class="select-btns" data-role="strategy_silent">
                                <span class="active" data-id="self_define">自定义时间</span><span data-id="plan_circle">计划周期</span>
                            </span>
                        </div>
                    </div>
                    <div class="time-select-wrap">

                    </div>
                    <div class="circle-wrap">

                    </div>
                </form>
            </div>
        </section>
        <section class="panel strategy-item" id="strategy_remove">
            <p class="title">策略解除</p>
            <div class="content" style="overflow: hidden;">
                <form class="form-horizontal">
                    <div class="control-group">
                        <label for="input1" class="control-label required">是否自动恢复</label>
                        <div class="controls">
                            <span class="boolean-switch false"></span>
                        </div>
                    </div>
                    <div class="control-group">
                        <label for="input1" class="control-label required">发送恢复通知</label>
                        <div class="controls">
                            <span class="boolean-switch false"></span>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <section class="panel strategy-item" id="strategy_notice">
            <p class="title">策略通知</p>
            <div class="content" style="overflow: hidden;">
                <form class="form-horizontal">
                    <div class="control-group">
                        <label for="input1" class="control-label required">通知方式</label>
                        <div class="controls" data-role="strategy_notice">

                        </div>
                    </div>
                </form>
            </div>
        </section>
        <section class="panel strategy-item" id="strategy_model">
            <p class="title">通知模版</p>
            <div class="content" style="overflow: hidden;">

            </div>
        </section>
    </div>
</div>