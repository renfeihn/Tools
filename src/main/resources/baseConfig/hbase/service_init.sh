#!/bin/sh
#���������ڵ㣩��������ִ��
#����journalnode
$HADOOP_HOME/sbin/hadoop-daemon.sh start journalnode

#�������ڵ㣩��������ִ��
#����journalnode
$HADOOP_HOME/sbin/hadoop-daemon.sh start journalnode

#���������ڵ㣩��������ִ��
#��ʽ��ZKFC
$HADOOP_HOME/bin/hdfs zkfc -formatZK
#��ʽ��namenode
$HADOOP_HOME/bin/hdfs namenode -format -clusterid asda

#����namenode
$HADOOP_HOME/bin/hdfs namenode

#�������ڵ㣩��������ִ��
#ͬ��namenode
$HADOOP_HOME/bin/hdfs namenode -bootstrapStandby
#ֹͣjournalnode
$HADOOP_HOME/sbin/hadoop-daemon.sh stop journalnode

#���������ڵ㣩��������ִ��
ctrl + c �˳�namenode
#ֹͣjournalnode
$HADOOP_HOME/sbin/hadoop-daemon.sh stop journalnode

