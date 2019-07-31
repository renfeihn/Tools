#!/bin/sh
#（管理主节点）服务器上执行
#启动journalnode
$HADOOP_HOME/sbin/hadoop-daemon.sh start journalnode

#（管理备节点）服务器上执行
#启动journalnode
$HADOOP_HOME/sbin/hadoop-daemon.sh start journalnode

#（管理主节点）服务器上执行
#格式化ZKFC
$HADOOP_HOME/bin/hdfs zkfc -formatZK
#格式化namenode
$HADOOP_HOME/bin/hdfs namenode -format -clusterid asda

#启动namenode
$HADOOP_HOME/bin/hdfs namenode

#（管理备节点）服务器上执行
#同步namenode
$HADOOP_HOME/bin/hdfs namenode -bootstrapStandby
#停止journalnode
$HADOOP_HOME/sbin/hadoop-daemon.sh stop journalnode

#（管理主节点）服务器上执行
ctrl + c 退出namenode
#停止journalnode
$HADOOP_HOME/sbin/hadoop-daemon.sh stop journalnode

