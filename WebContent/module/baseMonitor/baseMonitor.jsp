<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ page session="false"%>
<style>
.base-monitor {
	height: calc(100vh - 80px);
    padding: 20px;
    background: #EBF0F5;	
}
.moniotr-wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 20px auto;
    width: 860px;
}
.moniotr-wrap>.monitor-item {
	position: relative;
    width: 200px;
    height: 200px;
    margin: 0 20px 20px 0;
    background-color: #fff;
    border-radius: 4px;
	background-image: url(img/baseMonitor/aix.png);
	background-repeat: no-repeat;
	background-position: center 30%;
	color: #020A16;
	cursor: pointer;
	transition: .1s linear all;
}
.moniotr-wrap>.monitor-item.linux {
	background-image: url(img/selfMonitor/linux.png);
}
.moniotr-wrap>.monitor-item.linux:hover {
	background-image: url(img/selfMonitor/linux-active.png);
}
.moniotr-wrap>.monitor-item.MySQL {
	background-image: url(img/selfMonitor/mysql.png);
}
.moniotr-wrap>.monitor-item.MySQL:hover {
	background-image: url(img/selfMonitor/mysql-active.png);
}
.moniotr-wrap>.monitor-item.aix {
	background-image: url(img/selfMonitor/aix.png);
}
.moniotr-wrap>.monitor-item.aix:hover {
	background-image: url(img/selfMonitor/aix-active.png);
}
.moniotr-wrap>.monitor-item.Tomcat {
	background-image: url(img/selfMonitor/tomcat.png);
}
.moniotr-wrap>.monitor-item.Tomcat:hover {
	background-image: url(img/selfMonitor/tomcat-active.png);
}
.moniotr-wrap>.monitor-item.redis {
	background-image: url(img/selfMonitor/redis.png);
}
.moniotr-wrap>.monitor-item.redis:hover {
	background-image: url(img/selfMonitor/redis-active.png);
}
.moniotr-wrap>.monitor-item.agent {
	background-image: url(img/selfMonitor/agent.png);
}
.moniotr-wrap>.monitor-item.agent:hover {
	background-image: url(img/selfMonitor/agent-active.png);
}
.moniotr-wrap>.monitor-item.elasticsearch {
	background-image: url(img/selfMonitor/elasticsearch.png);
}
.moniotr-wrap>.monitor-item.elasticsearch:hover {
	background-image: url(img/selfMonitor/elasticsearch-active.png);
}
.moniotr-wrap>.monitor-item.kafka {
	background-image: url(img/selfMonitor/kafka.png);
}
.moniotr-wrap>.monitor-item.kafka:hover {
	background-image: url(img/selfMonitor/kafka-active.png);
}
.moniotr-wrap>.monitor-item.Hbase {
	background-image: url(img/selfMonitor/hbase.png);
}
.moniotr-wrap>.monitor-item.Hbase:hover {
	background-image: url(img/selfMonitor/hbase-active.png);
}
.moniotr-wrap>.monitor-item.Storm {
	background-image: url(img/selfMonitor/storm.png);
}
.moniotr-wrap>.monitor-item.Storm:hover {
	background-image: url(img/selfMonitor/storm-active.png);
}
.moniotr-wrap>.monitor-item.afa {
	background-image: url(img/selfMonitor/afa.png);
}
.moniotr-wrap>.monitor-item.afa:hover {
	background-image: url(img/selfMonitor/afa-active.png);
}
.moniotr-wrap>.monitor-item.ZooKeeper {
	background-image: url(img/selfMonitor/ZooKeeper.png);
}
.moniotr-wrap>.monitor-item.ZooKeeper:hover {
	background-image: url(img/selfMonitor/ZooKeeper-active.png);
}
.moniotr-wrap>.monitor-item:nth-child(4n) {
	margin-right: 0;
}
.monitor-item .event-num {
	position: absolute;
    top: 10px;
    right: 10px;
    background: #ED1111;
    color: #fff;
    border-radius: 18px;
    font-size: 12px;
    min-width: 14px;
    height: 18px;
    padding: 0 2px;
    line-height: 18px;
    text-align: center;
}
.monitor-item .monitor-name-wrap {
    display: block;
    text-align: center;
    margin-top: 130px;
}
.monitor-item .monitor-name-wrap i {
	color: #00BC96;
	font-size: 16px;
}
.moniotr-wrap>.monitor-item:hover {
    background-color: #45A1FF;
    color: #fff;
    box-shadow: 0 0px 10px 2px #ced3d6;
    transform: scale(1.02) translate(0,-2px);
}
.moniotr-wrap>.monitor-item:hover .monitor-name-wrap:after {
	content: '';
    position: absolute;
    bottom: -3px;
    left: 10px;
    width: 90%;
    height: 0px;
    box-shadow: 0 0 8px 4px #768da6;
}
.moniotr-wrap>.monitor-item:hover i {
	color: #fff;
}
.moniotr-wrap .monitor-name>i {
	font-style: normal;
	color: #020A16;
}
</style>

<div class="base-monitor">
	<div class="moniotr-wrap">
		<div class="monitor-item linux" data-href="basicMonitor#AFASumInstance" data-id="linux">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog fa-spin"></i>
				<span class="monitor-name">Linux ( <i>0</i> )</span>
			</span>
		</div>
		<div class="monitor-item MySQL" data-href="basicMonitor#AFASumInstance" data-id="mysql">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog fa-spin"></i>
				<span class="monitor-name">MySQL ( <i>0</i> )</span>
			</span>
		</div>
		<div class="monitor-item Tomcat" data-href="basicMonitor#AFASumInstance" data-id="tomcat">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog fa-spin"></i>
				<span class="monitor-name">Tomcat ( <i>0</i> )</span>
			</span>
		</div>
		<div class="monitor-item redis" data-href="basicMonitor#AFASumInstance" data-id="redis">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog fa-spin"></i>
				<span class="monitor-name">Redis ( <i>0</i> )</span>
			</span>
		</div>	
		<div class="monitor-item agent" data-href="CMDB_configView#agentManage" data-id="agent">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog fa-spin"></i>
				<span class="monitor-name">agent ( <i>0</i> )</span>
			</span>
		</div>		
		<div class="monitor-item elasticsearch" data-href="basicMonitor#es" data-id="elasticsearch">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog fa-spin"></i>
				<span class="monitor-name">elasticsearch ( <i>0</i> )</span>
			</span>
		</div>
		<div class="monitor-item kafka" data-href="basicMonitor#kafka" data-id="kafka">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog"></i>
				<span class="monitor-name">kafka ( <i>0</i> )</span>
			</span>
		</div>
		<div class="monitor-item Hbase" data-href="basicMonitor#Hbase" data-id="Hbase">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog"></i>
				<span class="monitor-name">HBase ( <i>0</i> )</span>
			</span>
		</div>
		<div class="monitor-item Storm" data-href="basicMonitor#storm" data-id="storm">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog"></i>
				<span class="monitor-name">Storm ( <i>0</i> )</span>
			</span>
		</div>
		<div class="monitor-item aix">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog"></i>
				<span class="monitor-name">Aix ( <i>0</i> )</span>
			</span>
		</div>
		<div class="monitor-item afa">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog"></i>
				<span class="monitor-name">AFA ( <i>0</i> )</span>
			</span>
		</div>
		<div class="monitor-item ZooKeeper">
			<span class="event-num">0</span>
			<span class="monitor-name-wrap">
				<i class="fa fa-cog"></i>
				<span class="monitor-name">ZooKeeper ( <i>0</i> )</span>
			</span>
		</div>
	</div>
</div>