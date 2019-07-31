#!/bin/sh
echo start hdfs
$HADOOP_HOME/sbin/start-dfs.sh

echo start yran
$HADOOP_HOME/sbin/start-yarn.sh

echo start hbase
$HBASE_HOME/bin/start-hbase.sh