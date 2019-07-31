#!/bin/sh
echo install zookeeper ......

#echo cp zookeeper ......

#cp /home/renfei/test/shell/zookeeper/zookeeper-3.4.13.tar.gz ./
echo tar zookeeper ......

tar -zxf zookeeper-3.4.13.tar.gz -C ~/
cd ~
echo add profile
sed -i '$a export DATA_DIR=~/data\nexport LOGS_DIR=~/logs\nexport ZOO_LOG_DIR=$LOGS_DIR/zk\nexport ZK_HOME=~/zookeeper-3.4.13' ~/.bash_profile

source ~/.bash_profile

echo mkdir
mkdir -p $DATA_DIR/zk $LOGS_DIR/zk

echo touch myid
#此文件内容根据配置文件 zoo.cfg 中server 编号一致
echo ${serverId} > $DATA_DIR/zk/myid

echo copy zoo.cfg
cp zookeeper/zoo.cfg ~/zookeeper-3.4.13/conf/

echo install end ......
