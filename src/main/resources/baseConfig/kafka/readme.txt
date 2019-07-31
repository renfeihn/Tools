创建topic，执行命令（只需在一个节点上执行一次即可）：
$KAFKA_HOME/bin/kafka-topics.sh --create --zookeeper host:2181/kafka --topic asda --replication-factor 2 --partitions 8
