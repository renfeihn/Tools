#!/bin/sh
$KAFKA_HOME/bin/kafka-topics.sh --create --zookeeper 10.7.1.1:2181/kafka --topic asda --replication-factor 2 --partitions 8