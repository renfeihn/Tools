#!/bin/sh
echo install kafka ......

#echo cp kafka ......
#cp kafka/kafka_2.12-2.0.0.tgz ./
echo tar kafka ......

tar -xf kafka_2.12-2.0.0.tgz -C ~/
cd ~
echo add profile
sed -i '$a export DATA_DIR=~/data\nexport LOGS_DIR=~/logs\nexport LOG_DIR=$LOGS_DIR/kafka\nexport KAFKA_HOME=$HOME/kafka_2.12-2.0.0' ~/.bash_profile

source ~/.bash_profile

echo mkdir
mkdir -p $DATA_DIR/kafka $LOGS_DIR/kafka

echo copy storm.yaml
cp storm/storm.yaml ~/apache-storm-1.2.2/conf/

echo install end ......

echo start kafka
$KAFKA_HOME/bin/kafka-server-start.sh -daemon $KAFKA_HOME/config/server.properties
