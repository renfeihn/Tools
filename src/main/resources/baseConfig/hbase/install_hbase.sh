#!/bin/sh
echo install hadoop hbase ......


echo tar kafka ......

tar -xf hadoop-2.7.7.tar.gz -C ~/
tar -xf hbase-1.4.8-bin.tar.gz -C ~/
tar -xf apache-phoenix-4.14.0-HBase-1.4-bin.tar.gz -C ~/

cd ~
echo add profile
sed -i '$a export DATA_DIR=$HOME/data\nexport LOGS_DIR=$HOME/logs\nexport HADOOP_LOG_DIR=$LOGS_DIR/hadoop\nexport YARN_LOG_DIR=$LOGS_DIR/hadoop\nexport HBASE_LOG_DIR=$LOGS_DIR/hbase\nexport HADOOP_HOME=$HOME/hadoop-2.7.7\nexport HADOOP_PREFIX=$HADOOP_HOME\nexport HBASE_HOME=$HOME/hbase-1.4.8\nexport HBASE_MANAGES_ZK=false\nexport PHOENIX_HOME=$HOME/apache-phoenix-4.14.0-HBase-1.4-bin' ~/.bash_profile

source ~/.bash_profile


echo copy hadoop conf
cp hbase/hadoop_conf/* $HADOOP_PREFIX/etc/hadoop/


## hadoop sh文件追加
echo 'source $HOME/.bash_profile' >> $HADOOP_PREFIX/etc/hadoop/hadoop-env.sh
echo 'source $HOME/.bash_profile' >> $HADOOP_PREFIX/etc/hadoop/mapred-env.sh
echo 'source $HOME/.bash_profile' >> $HADOOP_PREFIX/etc/hadoop/yarn-env.sh


echo copy hbase conf
cp hbase/hbase_conf/* $HBASE_HOME/conf/

## hbase-env.sh 文件追加环境变量文件
echo 'source $HOME/.bash_profile' >> $HBASE_HOME/conf/hbase-env.sh

echo install hadoop hbase end ......

echo install phoenix start ......

cp $PHOENIX_HOME/phoenix-*-server.jar $HBASE_HOME/lib
cp $HBASE_HOME/conf/hbase-site.xml $PHOENIX_HOME/bin/
cp $HADOOP_PREFIX/etc/hadoop/core-site.xml $PHOENIX_HOME/bin/
cp $HADOOP_PREFIX/etc/hadoop/hdfs-site.xml $PHOENIX_HOME/bin/


## master节点
mkdir -p $DATA_DIR/tmp/hadoop
mkdir -p $DATA_DIR/journal
mkdir -p $DATA_DIR/namenode
mkdir -p $DATA_DIR/datanode
mkdir -p $DATA_DIR/tmp/hbase

echo install phoenix end ......

