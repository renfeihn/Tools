#!/bin/sh
echo install kafka ......

#echo cp kafka ......
#cp kafka/kafka_2.12-2.0.0.tgz ./
echo tar kafka ......

tar -xf kafka_2.12-2.0.0.tgz -C ~/
cd ~
echo add profile
sed -i '$a export DATA_DIR=~/data\nexport LOGS_DIR=~/logs\nexport LOG_DIR=$LOGS_DIR/kafka\nexport KAFKA_HOME=$HOME/kafka_2.12-2.0.0' ~/.bash_profile

sleep 1s

source ~/.bash_profile

echo KAFKA_HOME=$KAFKA_HOME

echo mkdir
mkdir -p $DATA_DIR/kafka $LOGS_DIR/kafka

echo copy server.properties
cp ./kafka/server.properties $KAFKA_HOME/config/

echo install end ......

echo start kafka
$KAFKA_HOME/bin/kafka-server-start.sh -daemon $KAFKA_HOME/config/server.properties

echo create topics
exec_topics=true

if [ $exec_topics = true ]
then
echo exec_topics
$KAFKA_HOME/bin/kafka-topics.sh --create --zookeeper ${topics_zk}/kafka --topic asda --replication-factor 2 --partitions 8
fi
echo install end