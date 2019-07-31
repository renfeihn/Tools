#!/bin/sh
echo install storm ......

project_path=$(cd `dirname $0`; pwd)

#echo cp storm ......
#cp storm/apache-storm-1.2.2.tar.gz ./
echo tar storm ......

tar -zxf apache-storm-1.2.2.tar.gz -C ~/
cd ~

echo add profile
sed -i '$a export DATA_DIR=~/data\nexport LOGS_DIR=~/logs\nexport STORM_HOME=$HOME/apache-storm-1.2.2' ~/.bash_profile

source ~/.bash_profile

echo mkdir
mkdir -p $DATA_DIR/storm $LOGS_DIR/storm

echo copy storm.yaml
cp storm/storm.yaml ~/apache-storm-1.2.2/conf/

echo install end ......

echo install apache-storm-asda

##如果条件为 true 这个节点需要安装拓扑
exec_asda = ${exec_asda}

if [exec_asda]
then
cd $project_path
tar -xf apache-storm-asda-1.0.tar.bz2 -C ~/

echo cp apache-storm-asda
cp ~/storm/asda.json ~/asda/conf/

fi
# 启动服务

