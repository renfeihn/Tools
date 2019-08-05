#!/bin/sh
echo install storm ......

project_path=$(cd `dirname $0`; pwd)

echo project_path = $project_path

#echo cp storm ......
#cp storm/apache-storm-1.2.2.tar.gz ./
echo tar storm ......

tar -zxf apache-storm-1.2.2.tar.gz -C ~/
cd ~

echo add profile
sed -i '$a export DATA_DIR=~/data\nexport LOGS_DIR=~/logs\nexport STORM_HOME=$HOME/apache-storm-1.2.2\nexport PATH=$PATH:$STORM_HOME/bin' ~/.bash_profile

source ~/.bash_profile

echo STORM_HOME=$STORM_HOME

echo mkdir
mkdir -p $DATA_DIR/storm $LOGS_DIR/storm

echo copy storm.yaml
cp storm/storm.yaml ~/apache-storm-1.2.2/conf/

echo install strom end ......

echo install asda

##如果条件为 true 这个节点需要安装拓扑
exec_asda=${exec_asda}

if [ $exec_asda = true ]
then
cd $project_path
tar -zxf asda.tar.gz -C ~/

echo cp apache-storm-asda
cp ~/storm/asda.json ~/asda/conf/

fi
echo install asda end
# 启动服务

