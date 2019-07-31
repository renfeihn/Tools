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
#���ļ����ݸ��������ļ� zoo.cfg ��server ���һ��
echo ${serverId} > $DATA_DIR/zk/myid

echo copy zoo.cfg
cp zookeeper/zoo.cfg ~/zookeeper-3.4.13/conf/

echo install end ......
